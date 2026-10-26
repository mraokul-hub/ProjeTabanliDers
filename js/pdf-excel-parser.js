// ============================================================
// pdf-excel-parser.js
// Evrensel PDF & Excel Deneme Sınavı Ayrıştırıcı (Universal Exam Parser Engine)
// Desteklenenler: XLSX, XLS, CSV ve tüm kurumsal deneme PDF'leri (Özdebir, Töder, SDS, Okulistik vb.)
// ============================================================

(function () {
    // PDF.js Worker Kurulumu
    if (typeof pdfjsLib !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }

    // İsim normalizasyon yardımcısı (Türkçe karakter ve boşluk toleransı)
    function normName(str) {
        if (!str) return '';
        return String(str)
            .trim()
            .replace(/İ/g, 'i').replace(/I/g, 'ı')
            .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
            .replace(/Ü/g, 'u').replace(/ü/g, 'u')
            .replace(/Ş/g, 's').replace(/ş/g, 's')
            .replace(/Ö/g, 'o').replace(/ö/g, 'o')
            .replace(/Ç/g, 'c').replace(/ç/g, 'c')
            .toLowerCase()
            .replace(/\s+/g, ' ');
    }

    // ============================================================
    // 1. EXCEL / CSV AYRIŞTIRICI (SheetJS tabanlı akıllı header tespiti)
    // ============================================================
    async function parseExcelFile(file) {
        if (typeof XLSX === 'undefined') {
            throw new Error("SheetJS (XLSX) kütüphanesi yüklenemedi.");
        }
        const data = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(data, { type: 'array' });

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error("Excel dosyasında geçerli sayfa (sheet) bulunamadı.");
        }

        // En çok veri içeren sayfayı seç
        let bestSheetName = workbook.SheetNames[0];
        let maxRowCount = 0;
        workbook.SheetNames.forEach(sName => {
            const sheet = workbook.Sheets[sName];
            if (!sheet || !sheet['!ref']) return;
            const range = XLSX.utils.decode_range(sheet['!ref']);
            const count = range.e.r - range.s.r;
            if (count > maxRowCount) {
                maxRowCount = count;
                bestSheetName = sName;
            }
        });

        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[bestSheetName], { header: 1, defval: "" });
        if (!rows || rows.length < 2) {
            throw new Error("Excel dosyasında yeterli satır verisi bulunamadı.");
        }

        // İlk 15 satırı tara ve en çok anahtar kelime eşleşen satırı 'Başlık Satırı' seç
        const headerKeywords = [
            'ad', 'soyad', 'isim', 'no', 'numara', 'sınıf', 'sinif', 'şube', 'sube',
            'türkçe', 'turkce', 'matematik', 'mat', 'fen', 'sosyal', 'sos', 'inkılap', 'inkilap',
            'din', 'ingilizce', 'ing', 'net', 'doğru', 'dogru', 'yanlış', 'yanlis', 'toplam', 'puan', 'derece', 'sıra'
        ];

        let headerIndex = 0;
        let maxScore = -1;

        for (let i = 0; i < Math.min(rows.length, 15); i++) {
            const row = rows[i];
            if (!Array.isArray(row)) continue;
            const nonEmpties = row.filter(c => c !== "" && c !== null && c !== undefined);
            if (nonEmpties.length < 2) continue;

            let score = nonEmpties.length;
            row.forEach(cell => {
                const str = String(cell || '').toLocaleLowerCase('tr-TR');
                if (headerKeywords.some(k => str.includes(k))) score += 4;
            });

            if (score > maxScore) {
                maxScore = score;
                headerIndex = i;
            }
        }

        const rawHeaders = rows[headerIndex].map((h, idx) => {
            const clean = String(h || '').trim();
            return clean || `Sütun_${idx + 1}`;
        });

        const dataRows = rows.slice(headerIndex + 1).filter(row => {
            if (!Array.isArray(row)) return false;
            return row.some(c => c !== "" && c !== null && c !== undefined);
        });

        return {
            headers: rawHeaders,
            rows: dataRows,
            sheetNames: workbook.SheetNames,
            activeSheet: bestSheetName,
            fileName: file.name,
            fileType: 'excel'
        };
    }

    // ============================================================
    // 2. EVRENSEL PDF AYRIŞTIRICI (Koordinat & Tablo Tabanlı)
    // ============================================================
    async function parsePDFFile(file) {
        if (typeof pdfjsLib === 'undefined') {
            throw new Error("PDF.js kütüphanesi yüklenemedi.");
        }

        const typedarray = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument(typedarray).promise;

        let allVisualLines = [];
        let rawFullText = "";

        // Sayfa sayfa metin nesnelerini Y koordinatlarına göre grupla
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();

            const pageLines = [];
            const Y_TOLERANCE = 3.5; // Dikey tolerans (aynı satır kabul eşiği)

            textContent.items.forEach(item => {
                const str = (item.str || '').trim();
                if (!str) return;
                const x = item.transform[4];
                const y = item.transform[5];
                const width = item.width || 0;

                let line = pageLines.find(l => Math.abs(l.y - y) <= Y_TOLERANCE);
                if (!line) {
                    line = { y: y, items: [] };
                    pageLines.push(line);
                }
                line.items.push({ x, str, width });
            });

            // Satırları yukarıdan aşağıya (Y azalan) sırala
            pageLines.sort((a, b) => b.y - a.y);

            pageLines.forEach(line => {
                // Satır içi elemanları soldan sağa (X artan) sırala
                line.items.sort((a, b) => a.x - b.x);

                // Yatay mesafesi yakın olanları kelime/hücre olarak birleştir
                const cells = [];
                let currentCell = "";
                let lastXEnd = -999;

                line.items.forEach(it => {
                    if (lastXEnd > -900 && (it.x - lastXEnd) < 14) {
                        currentCell += " " + it.str;
                    } else {
                        if (currentCell) cells.push(currentCell.trim());
                        currentCell = it.str;
                    }
                    lastXEnd = it.x + it.width;
                });
                if (currentCell) cells.push(currentCell.trim());

                if (cells.length > 0) {
                    allVisualLines.push({
                        pageNum,
                        y: line.y,
                        cells,
                        lineText: cells.join(" ")
                    });
                    rawFullText += cells.join(" ") + "\n";
                }
            });
        }

        // 1. Önce Klasik SDS / Kurumsal Regex Şablonunu dene (Hızlı & Kesin Yol)
        const sdsRegex = /(?:^|\s)(\d+)\s+(\d+)\s+([A-ZÇĞİÖŞÜa-zçğıöşü\s]+?)\s*(\d+[A-Za-z\-/]+)\s+(\d+)\s+(\d+)\s+[\d,.]+\s+(\d+)\s+(\d+)\s+[\d,.]+\s+(\d+)\s+(\d+)\s+[\d,.]+\s+(\d+)\s+(\d+)\s+[\d,.]+\s+(\d+)\s+(\d+)\s+[\d,.]+\s+(\d+)\s+(\d+)/g;
        let sdsMatches = [];
        let m;
        while ((m = sdsRegex.exec(rawFullText)) !== null) {
            sdsMatches.push([
                m[1], m[2], m[3].trim(), m[4],
                m[5], m[6], m[7], m[8], m[9], m[10],
                m[11], m[12], m[13], m[14], m[15], m[16]
            ]);
        }

        if (sdsMatches.length > 0) {
            const sdsHeaders = [
                'Sıra', 'Öğrenci No', 'Ad Soyad', 'Sınıf',
                'Türkçe D', 'Türkçe Y', 'Sosyal D', 'Sosyal Y', 'Din D', 'Din Y',
                'İngilizce D', 'İngilizce Y', 'Matematik D', 'Matematik Y', 'Fen D', 'Fen Y'
            ];
            return {
                headers: sdsHeaders,
                rows: sdsMatches,
                fileName: file.name,
                fileType: 'pdf',
                mode: 'sds_regex'
            };
        }

        // 2. Genel Tablo Ayrıştırıcı (Özdebir, Töder, Okulistik, vb. Serbest Tablolar)
        // Başlık satırını bulmaya çalış
        const headerKeywords = ['tür', 'mat', 'fen', 'sos', 'din', 'ing', 'türkçe', 'matematik', 'net', 'd', 'y', 'ad', 'soyad'];
        let detectedHeaderIdx = -1;

        for (let i = 0; i < Math.min(allVisualLines.length, 30); i++) {
            const text = allVisualLines[i].lineText.toLocaleLowerCase('tr-TR');
            const hitCount = headerKeywords.filter(k => text.includes(k)).length;
            if (hitCount >= 3) {
                detectedHeaderIdx = i;
                break;
            }
        }

        let headers = [];
        let dataRows = [];

        if (detectedHeaderIdx !== -1) {
            headers = allVisualLines[detectedHeaderIdx].cells.map((c, idx) => c || `Sütun_${idx + 1}`);
            // Başlık altındaki öğrenci satırlarını filtrele
            for (let i = detectedHeaderIdx + 1; i < allVisualLines.length; i++) {
                const line = allVisualLines[i];
                // Öğrenci satırı kriteri: En az bir isim parçası ve en az 2 sayı içermeli
                const numCount = line.cells.filter(c => /^[\d,.-]+$/.test(c.trim())).length;
                const hasLetters = /[A-ZÇĞİÖŞÜa-zçğıöşü]{2,}/.test(line.lineText);

                if (hasLetters && numCount >= 2 && line.cells.length >= 3) {
                    dataRows.push(line.cells);
                }
            }
        } else {
            // Başlık tespit edilemediyse tüm veri satırlarını yakala
            for (let line of allVisualLines) {
                const numCount = line.cells.filter(c => /^[\d,.-]+$/.test(c.trim())).length;
                const hasLetters = /[A-ZÇĞİÖŞÜa-zçğıöşü]{2,}/.test(line.lineText);
                if (hasLetters && numCount >= 3 && line.cells.length >= 4) {
                    dataRows.push(line.cells);
                }
            }
            const maxCols = dataRows.reduce((max, r) => Math.max(max, r.length), 0);
            for (let c = 1; c <= maxCols; c++) {
                headers.push(`Sütun_${c}`);
            }
        }

        if (dataRows.length === 0) {
            throw new Error("PDF dosyasından öğrenci sınav sonuçları ayıklanamadı. Lütfen metin içeren bir kurumsal deneme PDF'si veya Excel yükleyiniz.");
        }

        // Satır genişliklerini header genişliğine göre tamamla
        const targetLen = Math.max(headers.length, ...dataRows.map(r => r.length));
        while (headers.length < targetLen) {
            headers.push(`Sütun_${headers.length + 1}`);
        }
        dataRows = dataRows.map(r => {
            const rowArr = [...r];
            while (rowArr.length < targetLen) rowArr.push("");
            return rowArr;
        });

        return {
            headers: headers,
            rows: dataRows,
            fileName: file.name,
            fileType: 'pdf',
            mode: 'table_coords'
        };
    }

    // ============================================================
    // 3. AKILLI SÜTUN EŞLEŞTİRME HARİTASI ÜRETECİ (Auto-Mapper)
    // ============================================================
    function autoDetectExamColumns(headers) {
        const mapping = {
            studentNo: '',
            studentName: '',
            studentClass: '',
            totalNet: '',
            rank: '',
            puan: '',
            // Dersler:
            turkce_net: '', turkce_d: '', turkce_y: '',
            mat_net: '', mat_d: '', mat_y: '',
            fen_net: '', fen_d: '', fen_y: '',
            sosyal_net: '', sosyal_d: '', sosyal_y: '',
            din_net: '', din_d: '', din_y: '',
            ing_net: '', ing_d: '', ing_y: ''
        };

        headers.forEach((h, idx) => {
            const clean = String(h || '').trim().toLocaleLowerCase('tr-TR');
            const strIdx = String(idx);

            // 1. Öğrenci Kimliği
            if (!mapping.studentNo && /\b(okul no|öğrenci no|ogrenci no|karneno|no|numara)\b/.test(clean)) {
                mapping.studentNo = strIdx;
            } else if (!mapping.studentName && /\b(ad soyad|ad[ıi] soyad[ıi]|öğrenci ad[ıi]|ogrenci adi|isim soyisim|ad|isim)\b/.test(clean)) {
                mapping.studentName = strIdx;
            } else if (!mapping.studentClass && /\b(sınıf|sinif|şube|sube|seviye)\b/.test(clean)) {
                mapping.studentClass = strIdx;
            } else if (!mapping.totalNet && /\b(toplam net|top\.?\s*net|genel net|net toplam[ıi]|t\.net)\b/.test(clean)) {
                mapping.totalNet = strIdx;
            } else if (!mapping.rank && /\b(sıra|sira|derece|genel sıra|şube sıra)\b/.test(clean)) {
                mapping.rank = strIdx;
            } else if (!mapping.puan && /\b(puan|lgs puan[ıi]|tyt puan[ıi]|toplam puan)\b/.test(clean)) {
                mapping.puan = strIdx;
            }

            // Metrik tipi belirleyiciler
            const isD = /\b(d|doğru|dogru)\b/.test(clean) || clean.endsWith(' d') || clean.endsWith('-d');
            const isY = /\b(y|yanlış|yanlis)\b/.test(clean) || clean.endsWith(' y') || clean.endsWith('-y');
            const isN = /\b(n|net)\b/.test(clean) || clean.endsWith(' n') || clean.endsWith('-n');

            // 2. Dersler
            // Türkçe
            if (clean.includes('tür') || clean.includes('turk') || clean.includes('tr')) {
                if (isN && !mapping.turkce_net) mapping.turkce_net = strIdx;
                else if (isD && !mapping.turkce_d) mapping.turkce_d = strIdx;
                else if (isY && !mapping.turkce_y) mapping.turkce_y = strIdx;
                else if (!mapping.turkce_net && !isD && !isY) mapping.turkce_net = strIdx;
            }
            // Matematik
            else if (clean.includes('mat')) {
                if (isN && !mapping.mat_net) mapping.mat_net = strIdx;
                else if (isD && !mapping.mat_d) mapping.mat_d = strIdx;
                else if (isY && !mapping.mat_y) mapping.mat_y = strIdx;
                else if (!mapping.mat_net && !isD && !isY) mapping.mat_net = strIdx;
            }
            // Fen Bilimleri
            else if (clean.includes('fen')) {
                if (isN && !mapping.fen_net) mapping.fen_net = strIdx;
                else if (isD && !mapping.fen_d) mapping.fen_d = strIdx;
                else if (isY && !mapping.fen_y) mapping.fen_y = strIdx;
                else if (!mapping.fen_net && !isD && !isY) mapping.fen_net = strIdx;
            }
            // Sosyal / İnkılap
            else if (clean.includes('sos') || clean.includes('ink') || clean.includes('tarih')) {
                if (isN && !mapping.sosyal_net) mapping.sosyal_net = strIdx;
                else if (isD && !mapping.sosyal_d) mapping.sosyal_d = strIdx;
                else if (isY && !mapping.sosyal_y) mapping.sosyal_y = strIdx;
                else if (!mapping.sosyal_net && !isD && !isY) mapping.sosyal_net = strIdx;
            }
            // Din Kültürü
            else if (clean.includes('din')) {
                if (isN && !mapping.din_net) mapping.din_net = strIdx;
                else if (isD && !mapping.din_d) mapping.din_d = strIdx;
                else if (isY && !mapping.din_y) mapping.din_y = strIdx;
                else if (!mapping.din_net && !isD && !isY) mapping.din_net = strIdx;
            }
            // İngilizce / Yabancı Dil
            else if (clean.includes('ing') || clean.includes('dil') || clean.includes('eng')) {
                if (isN && !mapping.ing_net) mapping.ing_net = strIdx;
                else if (isD && !mapping.ing_d) mapping.ing_d = strIdx;
                else if (isY && !mapping.ing_y) mapping.ing_y = strIdx;
                else if (!mapping.ing_net && !isD && !isY) mapping.ing_net = strIdx;
            }
        });

        // İsim sütunu hala bulunamadıysa metin içeren ilk sütunu seç
        if (!mapping.studentName && headers.length > 0) {
            mapping.studentName = "0";
        }

        return mapping;
    }

    // ============================================================
    // 4. SATIR METRİK VE NET HESAPLAYICI (Formül Toleransı)
    // ============================================================
    function computeRowMetrics(row, mapping, formulaType) {
        formulaType = formulaType || '3y1d'; // '3y1d' | '4y1d' | 'direct'

        const parseNum = (val) => {
            if (val === null || val === undefined || val === '') return 0;
            const s = String(val).replace(',', '.').replace(/[^0-9.-]/g, '');
            const n = parseFloat(s);
            return isNaN(n) ? 0 : n;
        };

        const calcSubjNet = (netKey, dKey, yKey) => {
            const hasNet = mapping[netKey] !== "" && mapping[netKey] !== undefined;
            const hasD = mapping[dKey] !== "" && mapping[dKey] !== undefined;
            const hasY = mapping[yKey] !== "" && mapping[yKey] !== undefined;

            if (hasNet) {
                return Math.max(0, +parseNum(row[mapping[netKey]]).toFixed(2));
            }

            if (hasD) {
                const d = parseNum(row[mapping[dKey]]);
                const y = hasY ? parseNum(row[mapping[yKey]]) : 0;
                let net = d;
                if (formulaType === '3y1d') net = d - (y / 3);
                else if (formulaType === '4y1d') net = d - (y / 4);
                return Math.max(0, +net.toFixed(2));
            }

            return 0;
        };

        const turkce = calcSubjNet('turkce_net', 'turkce_d', 'turkce_y');
        const matematik = calcSubjNet('mat_net', 'mat_d', 'mat_y');
        const fen = calcSubjNet('fen_net', 'fen_d', 'fen_y');
        const sosyal = calcSubjNet('sosyal_net', 'sosyal_d', 'sosyal_y');
        const din = calcSubjNet('din_net', 'din_d', 'din_y');
        const ingilizce = calcSubjNet('ing_net', 'ing_d', 'ing_y');

        const sumNet = +(turkce + matematik + fen + sosyal + din + ingilizce).toFixed(2);
        let totalNet = sumNet;

        if (mapping.totalNet !== "" && mapping.totalNet !== undefined) {
            const parsedTot = parseNum(row[mapping.totalNet]);
            if (parsedTot > 0) totalNet = +parsedTot.toFixed(2);
        }

        const rawName = mapping.studentName !== "" ? String(row[mapping.studentName] || '').trim() : "";
        const rawNo = mapping.studentNo !== "" ? String(row[mapping.studentNo] || '').trim() : "";
        const rawClass = mapping.studentClass !== "" ? String(row[mapping.studentClass] || '').trim() : "";
        const rank = mapping.rank !== "" ? String(row[mapping.rank] || '-').trim() : "-";

        // Öğrenci eşleştirme
        const students = Array.isArray(window.studentData) ? window.studentData : [];
        let matchedStudent = null;

        if (rawNo) {
            matchedStudent = students.find(s => String(s.no) === rawNo);
        }

        if (!matchedStudent && rawName) {
            const normRaw = normName(rawName);
            matchedStudent = students.find(s => normName(s.adSoyad) === normRaw);

            // Ters isim dene (Örn: "YILMAZ AHMET" -> "AHMET YILMAZ")
            if (!matchedStudent) {
                const parts = normRaw.split(' ');
                if (parts.length >= 2) {
                    const rev = [parts[parts.length - 1], ...parts.slice(0, parts.length - 1)].join(' ');
                    matchedStudent = students.find(s => normName(s.adSoyad) === rev);
                }
            }
        }

        return {
            name: matchedStudent ? matchedStudent.adSoyad : rawName,
            no: matchedStudent ? matchedStudent.no : rawNo,
            sinif: matchedStudent ? matchedStudent.sinif : rawClass,
            isRegistered: !!matchedStudent,
            matchedStudent: matchedStudent,
            Turkce: turkce,
            Matematik: matematik,
            Fen: fen,
            Sosyal: sosyal,
            DinKulturu: din,
            Ingilizce: ingilizce,
            totalNet: totalNet,
            rank: rank || "-"
        };
    }

    // Dışarıya temiz API sun
    window.ExamDataParser = {
        parseExcelFile,
        parsePDFFile,
        autoDetectExamColumns,
        computeRowMetrics,
        normName
    };

    // Geriye dönük uyumluluk: eski fonksiyon çağrılarını yönlendir
    window.handleExamFileSelect = function (event) {
        const file = event && event.target && event.target.files ? event.target.files[0] : null;
        if (!file) return;
        if (typeof window.openExamImportWizard === 'function') {
            window.openExamImportWizard(file);
        } else {
            console.warn("openExamImportWizard fonksiyonu henüz yüklenmedi.");
        }
    };

})();


// ============================================================================
// ⛺ KÜME YÖNETİMİ & KÜME OLUŞTURMA - EXCEL ŞABLONU VE VERİ YÜKLEME MODÜLÜ
// ============================================================================

const KUME_EXCEL_TEMPLATE_BASE64 = "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";

let kumeExcelParsedClusters = [];

// 1. Excel Şablonunu İndir (.xlsx)
function downloadKumeExcelTemplate() {
    try {
        const byteCharacters = atob(KUME_EXCEL_TEMPLATE_BASE64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 300);
        if (typeof showStatus === 'function') {
            showStatus('📥 Küme Excel Şablonu indirildi.', false);
        }
    } catch (e) {
        console.error('Şablon indirme hatası:', e);
        const a = document.createElement('a');
        a.href = 'Kume_Yukleme_Sablonu.xlsx';
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// 2. Excel Yükleme Tetikleyici
function triggerKumeExcelImport() {
    const input = document.getElementById('kume-excel-file-input');
    if (input) {
        input.value = '';
        input.click();
    }
}

// 3. Dosya Seçildiğinde Çalışan Ana İşleyici
async function handleKumeExcelUpload(input) {
    const file = input?.files?.[0];
    if (!file) return;

    if (typeof showStatus === 'function') {
        showStatus('⏳ Excel dosyası okunuyor ve kümeler çözümleniyor...', false);
    }

    try {
        const result = await parseUniversalKumeExcel(file);
        if (!result || !result.clusters || result.clusters.length === 0) {
            alert('Excel dosyasında geçerli küme veya öğrenci verisi bulunamadı.\nLütfen dosyanın "Küme.xlsx" veya "Excel Şablonu İndir" formatına uygun olduğundan emin olun.');
            return;
        }
        openKumeExcelModal(result);
    } catch (err) {
        console.error('Excel çözümleme hatası:', err);
        alert('Excel dosyası işlenirken bir hata oluştu:\n' + (err.message || err));
    } finally {
        if (input) input.value = '';
    }
}

// Türkçe Karakter Normalizasyonu
function normKumeText(str) {
    if (!str) return '';
    return String(str).trim()
        .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
        .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
        .replace(/Ü/g, 'u').replace(/ü/g, 'u')
        .replace(/Ş/g, 's').replace(/ş/g, 's')
        .replace(/Ö/g, 'o').replace(/ö/g, 'o')
        .replace(/Ç/g, 'c').replace(/ç/g, 'c')
        .toLowerCase();
}

// Rol Normalizasyonu
function normalizeKumeRole(str) {
    if (!str) return 'Üye';
    const s = String(str).trim().toUpperCase();
    if (s === 'PK' || s.includes('KOORD') || s.includes('YÖNETİCİ')) return 'Proje Koordinatörü';
    if (s === 'VA' || s.includes('ANALİST') || s.includes('YAZICI')) return 'Veri Analisti';
    if (s === 'AR' || s.includes('AR-GE') || s.includes('MALZEME')) return 'Ar-Ge Sorumlusu';
    if (s === 'HI' || s.includes('İLİŞK') || s.includes('SÖZCÜ')) return 'Halkla İlişkiler';
    if (s === 'Ü' || s === 'U' || s.includes('ÜYE')) return 'Üye';
    return 'Üye';
}

// Küme Başlığı Temizleme
function cleanKumeTitle(rawTitle, defaultIdx) {
    if (!rawTitle) return `${defaultIdx}. Küme`;
    let t = String(rawTitle).trim();
    t = t.replace(/^\s*KÜME\s+ADI:\s*/i, '');
    t = t.replace(/^\s*K-[0-9]+\s*/i, '');
    t = t.replace(/^\s*KÜME\s+[0-9]+[:\s-]*/i, '');
    return t.trim() || `${defaultIdx}. Küme`;
}

// 4. Evrensel Excel Ayrıştırıcı (Universal Kume Parser)
async function parseUniversalKumeExcel(file) {
    const arrayBuffer = await file.arrayBuffer();

    // A. ÖNCELİK: Yüksek Doğruluklu XML & Stil Ayrıştırıcı (Küme.xlsx / Renkli Optik Şablon)
    if (typeof DecompressionStream !== 'undefined' && file.name.endsWith('.xlsx')) {
        try {
            const xmlResult = await parseKumeFromXmlZip(new Uint8Array(arrayBuffer));
            if (xmlResult && xmlResult.clusters && xmlResult.clusters.length > 0) {
                return xmlResult;
            }
        } catch (xmlErr) {
            console.warn('XML doğrudan açma uyarısı, SheetJS moduna geçiliyor:', xmlErr);
        }
    }

    // B. YEDEK & DÜZ TABLO: SheetJS Kütüphanesi ile Ayrıştırma
    if (typeof XLSX === 'undefined') {
        throw new Error('SheetJS (XLSX) kütüphanesi yüklü değil.');
    }

    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error('Excel dosyasında çalışma sayfası bulunamadı.');
    }

    // İlk veya ilgili sayfayı kontrol et
    for (const sName of workbook.SheetNames) {
        const ws = workbook.Sheets[sName];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (!rows || rows.length === 0) continue;

        // 1. Form Düzeni mi? (K-01, KÜME 1, KÜME ADI içeriyor mu?)
        const isForm = rows.slice(0, 10).some(r => Array.isArray(r) && r.some(c => String(c).includes('KÜME') || String(c).includes('K-01')));
        if (isForm) {
            const res = parseKumeSheetJsForm(rows, sName);
            if (res && res.clusters.length > 0) return res;
        }

        // 2. Düz Liste Düzeni mi? (Sınıf, Küme No, Okul No, Ad Soyad...)
        const flatRes = parseKumeSheetJsFlat(rows, sName);
        if (flatRes && flatRes.clusters.length > 0) return flatRes;
    }

    throw new Error('Excel dosyasında tanınabilir küme düzeni bulunamadı.');
}

// Native Zip Decompression & XML Parser (Stilleri ve Renkleri Tam Destekler)
async function parseKumeFromXmlZip(buffer) {
    const files = {};
    let offset = 0;
    while (offset < buffer.length - 4) {
        const sig = buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24);
        if (sig === 0x04034b50) {
            const compMethod = buffer[offset + 8] | (buffer[offset + 9] << 8);
            const compSize = (buffer[offset + 18]) | (buffer[offset + 19] << 8) | (buffer[offset + 20] << 16) | (buffer[offset + 21] << 24);
            const nameLen = buffer[offset + 26] | (buffer[offset + 27] << 8);
            const extraLen = buffer[offset + 28] | (buffer[offset + 29] << 8);
            
            const nameBytes = buffer.subarray(offset + 30, offset + 30 + nameLen);
            const name = new TextDecoder('utf-8').decode(nameBytes);
            const dataOffset = offset + 30 + nameLen + extraLen;
            const compData = buffer.subarray(dataOffset, dataOffset + compSize);

            if (compMethod === 8) {
                const ds = new DecompressionStream('deflate-raw');
                const writer = ds.writable.getWriter();
                writer.write(compData);
                writer.close();
                const reader = ds.readable.getReader();
                const chunks = [];
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }
                const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
                const fullBuf = new Uint8Array(totalLen);
                let p = 0;
                for (const c of chunks) {
                    fullBuf.set(c, p);
                    p += c.length;
                }
                files[name] = new TextDecoder('utf-8').decode(fullBuf);
            } else if (compMethod === 0) {
                files[name] = new TextDecoder('utf-8').decode(compData);
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }

    if (!files['xl/worksheets/sheet1.xml']) return null;

    // 1. Shared Strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
        const matches = files['xl/sharedStrings.xml'].match(/<si>[\s\S]*?<\/si>/g) || [];
        matches.forEach(si => {
            const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        });
    }

    // 2. Fills & Styles
    const fills = [];
    if (files['xl/styles.xml']) {
        const fillMatches = files['xl/styles.xml'].match(/<fill>[\s\S]*?<\/fill>/g) || [];
        fillMatches.forEach(f => {
            const rgbMatch = f.match(/rgb="([A-Fa-f0-9]{8})"/);
            fills.push(rgbMatch ? rgbMatch[1].toUpperCase() : null);
        });
    }
    const xfFills = [];
    if (files['xl/styles.xml']) {
        const xfsMatch = files['xl/styles.xml'].match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/);
        if (xfsMatch) {
            const xfMatches = xfsMatch[1].match(/<xf[^>]*>/g) || [];
            xfMatches.forEach(xf => {
                const fillIdMatch = xf.match(/fillId="(\d+)"/);
                const fid = fillIdMatch ? parseInt(fillIdMatch[1]) : 0;
                xfFills.push(fills[fid] || null);
            });
        }
    }

    // 3. Sheet Name & Class
    let sheetNames = [];
    if (files['xl/workbook.xml']) {
        const sMatches = files['xl/workbook.xml'].match(/<sheet[^>]+name="([^"]+)"/g) || [];
        sheetNames = sMatches.map(m => m.match(/name="([^"]+)"/)[1]);
    }

    const sheetXml = files['xl/worksheets/sheet1.xml'];
    const cellMap = {};
    const rowMatches = sheetXml.match(/<row[^>]*>[\s\S]*?<\/row>/g) || [];
    rowMatches.forEach(rowStr => {
        const cMatches = rowStr.match(/<c[^>]*>[\s\S]*?<\/c>|<c[^>]*\/>/g) || [];
        cMatches.forEach(cStr => {
            const rMatch = cStr.match(/r="([A-Z0-9]+)"/);
            if (!rMatch) return;
            const ref = rMatch[1];
            const tMatch = cStr.match(/t="([a-z]+)"/);
            const sMatch = cStr.match(/s="(\d+)"/);
            const vMatch = cStr.match(/<v>([\s\S]*?)<\/v>/);

            let val = vMatch ? vMatch[1] : '';
            if (tMatch && tMatch[1] === 's' && val !== '') {
                val = sharedStrings[parseInt(val)] || '';
            }
            const sIdx = sMatch ? parseInt(sMatch[1]) : 0;
            const fill = xfFills[sIdx] || null;
            cellMap[ref] = { val: String(val).trim(), fill };
        });
    });

    const allVals = Object.values(cellMap).map(c => c.val);
    const isForm = allVals.some(v => v.includes('KÜME') && (v.includes('YÖNETİMİ') || v.includes('K-01') || v.includes('KÜME 1')));
    if (!isForm) return null;

    // Sınıfı Bul
    let detectedClass = '';
    for (const [ref, c] of Object.entries(cellMap)) {
        if (c.val.toUpperCase().includes('SINIF') || c.val.toUpperCase().includes('ŞUBE')) {
            const m = c.val.match(/SINIF\s*(?:\/|\&)?\s*ŞUBE\s*:\s*([^\n\r]+)/i) || c.val.match(/SINIF\s*:\s*([^\n\r]+)/i);
            if (m) {
                detectedClass = m[1].trim();
                break;
            }
        }
    }
    if (!detectedClass && sheetNames.length > 0) {
        const m = sheetNames[0].match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const clusterPairs = [
        { left: { titleCell: 'C5', rows: [7,8,9,10,11,12], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A13' },
          right: { titleCell: 'M5', rows: [7,8,9,10,11,12], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K13' } },
        { left: { titleCell: 'C16', rows: [18,19,20,21,22,23], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A24' },
          right: { titleCell: 'M16', rows: [18,19,20,21,22,23], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K24' } },
        { left: { titleCell: 'C27', rows: [29,30,31,32,33,34], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A35' },
          right: { titleCell: 'M27', rows: [29,30,31,32,33,34], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K35' } }
    ];

    const clusters = [];
    let clusterCounter = 1;
    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];

    clusterPairs.forEach(pair => {
        [pair.left, pair.right].forEach(side => {
            const title = cleanKumeTitle(cellMap[side.titleCell]?.val, clusterCounter);
            const students = [];

            side.rows.forEach((r, rIdx) => {
                const no = (cellMap[`${side.colNo}${r}`]?.val || '').trim();
                const name = (cellMap[`${side.colName}${r}`]?.val || '').trim();
                if (name) {
                    let role = '';
                    // 1. Renk dolgusu kontrolü (PK=Mavi, VA=Yeşil, AR=Turuncu, HI=Mor, Ü=Koyu)
                    for (const rc of side.roleCols) {
                        const cData = cellMap[`${rc.c}${r}`];
                        if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {
                            role = rc.r;
                            break;
                        }
                    }
                    // 2. Metin işareti kontrolü ('X', '1', '+', 'V')
                    if (!role) {
                        for (const rc of side.roleCols) {
                            const val = (cellMap[`${rc.c}${r}`]?.val || '').toUpperCase();
                            if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                                role = rc.r;
                                break;
                            }
                        }
                    }
                    // 3. Varsayılan rol döngüsü
                    if (!role) {
                        role = defaultRoles[rIdx] || 'Üye';
                    }
                    students.push({ no, name, role });
                }
            });

            clusters.push({
                title,
                students,
                observation: cellMap[side.obsCell]?.val || ''
            });
            clusterCounter++;
        });
    });

    return { detectedClass, clusters };
}

// SheetJS Form Düzeni Ayrıştırıcı
function parseKumeSheetJsForm(rows, sheetName) {
    let detectedClass = '';
    // Sınıf satırını tara
    for (let i = 0; i < Math.min(6, rows.length); i++) {
        const r = rows[i];
        if (!Array.isArray(r)) continue;
        for (const cell of r) {
            const str = String(cell);
            if (str.toUpperCase().includes('SINIF') || str.toUpperCase().includes('ŞUBE')) {
                const m = str.match(/SINIF\s*(?:\/|\&)?\s*ŞUBE\s*:\s*([^\n\r]+)/i) || str.match(/SINIF\s*:\s*([^\n\r]+)/i);
                if (m) { detectedClass = m[1].trim(); break; }
            }
        }
        if (detectedClass) break;
    }
    if (!detectedClass && sheetName) {
        const m = sheetName.match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];
    const clusterPairs = [
        { left: { titleRow: 4, titleCol: 2, startRow: 6, endRow: 11, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 4, titleCol: 12, startRow: 6, endRow: 11, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } },
        { left: { titleRow: 15, titleCol: 2, startRow: 17, endRow: 22, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 15, titleCol: 12, startRow: 17, endRow: 22, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } },
        { left: { titleRow: 26, titleCol: 2, startRow: 28, endRow: 33, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 26, titleCol: 12, startRow: 28, endRow: 33, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } }
    ];

    const clusters = [];
    let clusterCounter = 1;
    const roleMapping = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];

    clusterPairs.forEach(pair => {
        [pair.left, pair.right].forEach(side => {
            const rawTitle = (rows[side.titleRow] && rows[side.titleRow][side.titleCol]) ? rows[side.titleRow][side.titleCol] : '';
            const title = cleanKumeTitle(rawTitle, clusterCounter);
            const students = [];

            for (let r = side.startRow; r <= side.endRow; r++) {
                const row = rows[r];
                if (!row) continue;
                const no = String(row[side.colNo] || '').trim();
                const name = String(row[side.colName] || '').trim();
                if (name) {
                    let role = '';
                    side.roleCols.forEach((colIdx, i) => {
                        const val = String(row[colIdx] || '').trim().toUpperCase();
                        if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                            role = roleMapping[i];
                        }
                    });
                    if (!role) {
                        const rOffset = r - side.startRow;
                        role = defaultRoles[rOffset] || 'Üye';
                    }
                    students.push({ no, name, role });
                }
            }

            clusters.push({ title, students });
            clusterCounter++;
        });
    });

    return { detectedClass, clusters };
}

// SheetJS Düz Liste Ayrıştırıcı (Sınıf | Küme | No | Ad Soyad | Rol)
function parseKumeSheetJsFlat(rows, sheetName) {
    let headerRowIdx = -1;
    let colMap = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (!row || !Array.isArray(row)) continue;
        let matchCount = 0;
        const tempCols = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

        row.forEach((cell, idx) => {
            const clean = normKumeText(cell).replace(/[^a-z0-9]/g, '');
            if (['kume', 'kumeno', 'grup', 'grupno', 'takim'].includes(clean)) {
                tempCols.kumeNo = idx;
                matchCount++;
            } else if (['kumeadi', 'kumead', 'grupadi', 'grupad', 'takimadi'].includes(clean)) {
                tempCols.kumeAdi = idx;
                matchCount++;
            } else if (['okulno', 'ogrencino', 'no', 'numara'].includes(clean)) {
                tempCols.no = idx;
                matchCount++;
            } else if (['ogrenciadsoyad', 'ogrenciadisoyadi', 'adsoyad', 'adisoyadi', 'isim', 'ogrenci'].includes(clean)) {
                tempCols.adSoyad = idx;
                matchCount++;
            } else if (['gorev', 'rol', 'gorevrol', 'gorevi', 'rolu'].includes(clean)) {
                tempCols.rol = idx;
                matchCount++;
            } else if (['sinif', 'sube', 'sinifsube'].includes(clean)) {
                tempCols.sinif = idx;
                matchCount++;
            } else if (['not', 'gozlem', 'gozlemnot', 'aciklama'].includes(clean)) {
                tempCols.not = idx;
            }
        });

        if (matchCount >= 2 && (tempCols.adSoyad !== -1 || tempCols.no !== -1)) {
            headerRowIdx = r;
            colMap = tempCols;
            break;
        }
    }

    if (headerRowIdx === -1) return null;

    const clusterMap = {};
    let detectedClass = '';

    for (let r = headerRowIdx + 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0 || row.every(c => c === '')) continue;

        const sSinif = colMap.sinif !== -1 ? String(row[colMap.sinif] || '').trim() : '';
        if (sSinif && !detectedClass) detectedClass = sSinif;

        const kNo = colMap.kumeNo !== -1 ? String(row[colMap.kumeNo] || '').trim() : '';
        const kName = colMap.kumeAdi !== -1 ? String(row[colMap.kumeAdi] || '').trim() : '';
        const sNo = colMap.no !== -1 ? String(row[colMap.no] || '').trim() : '';
        const sAd = colMap.adSoyad !== -1 ? String(row[colMap.adSoyad] || '').trim() : '';
        const sRol = colMap.rol !== -1 ? normalizeKumeRole(row[colMap.rol]) : 'Üye';

        if (!sAd && !sNo) continue;

        const clusterKey = kNo || kName || '1';
        if (!clusterMap[clusterKey]) {
            let title = kName || (kNo ? `${kNo}. Küme` : '1. Küme');
            clusterMap[clusterKey] = { title, students: [] };
        }

        clusterMap[clusterKey].students.push({
            no: sNo,
            name: sAd,
            role: sRol
        });
    }

    if (!detectedClass && sheetName) {
        const m = sheetName.match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const clusters = Object.values(clusterMap);
    return { detectedClass, clusters };
}

// 5. Excel İnceleme Modalı Açma
function openKumeExcelModal(parsedResult) {
    kumeExcelParsedClusters = parsedResult.clusters || [];
    const detectedClass = parsedResult.detectedClass || '';

    const modal = document.getElementById('kume-excel-modal');
    const classSelect = document.getElementById('kume-excel-target-class');
    const grid = document.getElementById('kume-excel-cards-grid');

    if (!modal || !classSelect || !grid) return;

    // Hedef Sınıf Seçeneğini Ayarla
    const existingClasses = [...new Set((typeof studentData !== 'undefined' ? studentData : []).map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();
    if (detectedClass && !existingClasses.includes(detectedClass)) {
        existingClasses.unshift(detectedClass);
    }

    const currentClassFilter = document.getElementById('class-filter')?.value || '';
    const initialSelectedClass = detectedClass || currentClassFilter || existingClasses[0] || '7/A';

    classSelect.innerHTML = existingClasses.map(c => 
        `<option value="${escapeHtml(c)}" ${c === initialSelectedClass ? 'selected' : ''}>${escapeHtml(c)}</option>`
    ).join('');
    if (!existingClasses.includes(initialSelectedClass)) {
        const opt = document.createElement('option');
        opt.value = initialSelectedClass;
        opt.textContent = initialSelectedClass;
        opt.selected = true;
        classSelect.appendChild(opt);
    }

    // Kartları Çiz
    renderKumeExcelCards();

    modal.style.display = 'flex';
}

// 6. Excel İnceleme Modalı Kapatma
function closeKumeExcelModal() {
    const modal = document.getElementById('kume-excel-modal');
    if (modal) modal.style.display = 'none';
}

// 7. Modaldaki Küme Kartlarını Oluşturma
function renderKumeExcelCards() {
    const grid = document.getElementById('kume-excel-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    kumeExcelParsedClusters.forEach((cluster, cIdx) => {
        const card = document.createElement('div');
        card.className = 'excel-cluster-card';
        card.setAttribute('data-cluster-idx', cIdx);
        card.style.cssText = `
            background: var(--card-bg, #ffffff);
            border: 2px solid var(--border, #e2e8f0);
            border-radius: 12px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        `;

        const students = cluster.students || [];

        let rowsHtml = '';
        students.forEach((stu, sIdx) => {
            rowsHtml += createExcelStudentRowHtml(stu.no, stu.name, stu.role);
        });

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border, #e2e8f0); padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex:1;">
                    <span style="background:#107c41; color:#fff; font-size:11px; font-weight:800; padding:3px 8px; border-radius:6px;">K-${String(cIdx + 1).padStart(2, '0')}</span>
                    <input type="text" class="excel-cluster-title" value="${escapeHtml(cluster.title || `${cIdx + 1}. Küme`)}" placeholder="Küme Adı" style="font-weight:700; font-size:13.5px; border:1px solid var(--border, #cbd5e1); border-radius:6px; padding:4px 8px; flex:1; background:var(--tab-bg, #f8fafc); color:var(--text-main, #0f172a);">
                </div>
                <span class="excel-card-count-badge" style="font-size:11px; font-weight:700; color:var(--text-muted, #64748b); background:#f1f5f9; padding:2px 8px; border-radius:10px; margin-left:6px;">
                    ${students.length} Öğrenci
                </span>
            </div>
            <div class="excel-students-rows-wrap" style="display:flex; flex-direction:column; gap:5px; max-height:220px; overflow-y:auto;">
                ${rowsHtml}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                <button type="button" onclick="addExcelStudentRow(${cIdx})" style="background:none; border:1px dashed #94a3b8; border-radius:6px; padding:4px 10px; font-size:11.5px; color:#107c41; cursor:pointer; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fas fa-plus"></i> Öğrenci Ekle
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    updateExcelStatsBadge();
}

// Öğrenci Satırı HTML Üretici
function createExcelStudentRowHtml(no, name, role) {
    const safeNo = escapeHtml(no || '');
    const safeName = escapeHtml(name || '');
    const safeRole = role || 'Üye';

    return `
        <div class="excel-student-row" style="display:flex; align-items:center; gap:6px; padding:3px 0; border-bottom:1px solid #f1f5f9;">
            <input type="text" class="excel-student-no" value="${safeNo}" placeholder="No" style="width:58px; font-size:11.5px; font-family:monospace; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a; text-align:center;">
            <input type="text" class="excel-student-name" value="${safeName}" placeholder="Adı Soyadı" style="flex:1; font-size:12px; font-weight:600; padding:4px 8px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a;">
            <select class="excel-student-role" style="font-size:11px; font-weight:700; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#1e293b; width:115px;">
                <option value="Proje Koordinatörü" ${safeRole === 'Proje Koordinatörü' ? 'selected' : ''}>Proje Koord.</option>
                <option value="Veri Analisti" ${safeRole === 'Veri Analisti' ? 'selected' : ''}>Veri Analisti</option>
                <option value="Ar-Ge Sorumlusu" ${safeRole === 'Ar-Ge Sorumlusu' ? 'selected' : ''}>Ar-Ge Sor.</option>
                <option value="Halkla İlişkiler" ${safeRole === 'Halkla İlişkiler' ? 'selected' : ''}>Halkla İliş.</option>
                <option value="Üye" ${safeRole === 'Üye' ? 'selected' : ''}>Üye</option>
            </select>
            <button type="button" onclick="this.closest('.excel-student-row').remove(); updateExcelStatsBadge();" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding:2px 4px; line-height:1;" title="Öğrenciyi Sil">&times;</button>
        </div>
    `;
}

// 8. Modala Öğrenci Satırı Ekle
function addExcelStudentRow(cIdx) {
    const card = document.querySelector(`.excel-cluster-card[data-cluster-idx="${cIdx}"]`);
    if (!card) return;
    const wrap = card.querySelector('.excel-students-rows-wrap');
    if (!wrap) return;

    const div = document.createElement('div');
    div.innerHTML = createExcelStudentRowHtml('', '', 'Üye');
    wrap.appendChild(div.firstElementChild);
    updateExcelStatsBadge();
}

// 9. İstatistik Rozetini Güncelleme
function updateExcelStatsBadge() {
    const cards = document.querySelectorAll('.excel-cluster-card');
    let totalStudents = 0;
    cards.forEach(card => {
        const count = card.querySelectorAll('.excel-student-row').length;
        const b = card.querySelector('.excel-card-count-badge');
        if (b) b.textContent = `${count} Öğrenci`;
        totalStudents += count;
    });

    const badge = document.getElementById('kume-excel-stats-badge');
    if (badge) {
        badge.innerHTML = `<i class="fas fa-check-circle"></i> ${cards.length} Küme · ${totalStudents} Öğrenci`;
    }
}

// 10. Kümeleri Sisteme Aktar ve Kaydet
function applyKumeExcelToSystem() {
    const targetClass = document.getElementById('kume-excel-target-class')?.value?.trim();
    if (!targetClass) {
        alert('Lütfen geçerli bir hedef sınıf seçiniz!');
        return;
    }

    const cards = document.querySelectorAll('.excel-cluster-card');
    if (cards.length === 0) {
        alert('Aktarılacak küme kartı bulunamadı.');
        return;
    }

    const finalGroups = [];
    const collectedStudents = [];
    let totalStudents = 0;

    cards.forEach((card, idx) => {
        const titleInput = card.querySelector('.excel-cluster-title');
        const title = titleInput ? titleInput.value.trim() : `${idx + 1}. Küme`;
        const students = [];

        card.querySelectorAll('.excel-student-row').forEach(row => {
            const noInput = row.querySelector('.excel-student-no');
            const nameInput = row.querySelector('.excel-student-name');
            const roleSelect = row.querySelector('.excel-student-role');

            const no = noInput ? noInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'Üye';

            if (name) {
                students.push({ no, name, role });
                collectedStudents.push({ no, name, role, sinif: targetClass });
                totalStudents++;
            }
        });

        finalGroups.push({ title, students });
    });

    if (totalStudents === 0) {
        if (!confirm('Kümelerde hiç öğrenci adı bulunamadı. Boş kümeleri kaydetmek istiyor musunuz?')) {
            return;
        }
    }

    // Yeni Öğrencileri 'studentData' Listesine de Ekle
    const syncCheckbox = document.getElementById('kume-excel-sync-students');
    if (syncCheckbox && syncCheckbox.checked && typeof studentData !== 'undefined') {
        let addedCount = 0;
        collectedStudents.forEach(stu => {
            const exists = studentData.some(s => 
                (s.sinif === targetClass) && 
                ((stu.no && String(s.no).trim() === String(stu.no).trim()) || 
                 (s.adSoyad && s.adSoyad.trim().toLowerCase() === stu.name.trim().toLowerCase()))
            );
            if (!exists) {
                studentData.push({
                    sira: studentData.length + 1,
                    no: stu.no || '',
                    adSoyad: stu.name,
                    sinif: targetClass
                });
                addedCount++;
            }
        });

        if (addedCount > 0) {
            if (typeof renderStudentTable === 'function') renderStudentTable();
            if (typeof updateClassDropdown === 'function') updateClassDropdown();
            if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
            if (typeof renderTrackingList === 'function') renderTrackingList();
            if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();
            if (typeof renderChecklistList === 'function') renderChecklistList();
        }
    }

    // groupData Nesnesini Güncelle
    const safeClass = targetClass.replace(/\//g, '_');
    if (typeof groupData !== 'object' || groupData === null) groupData = {};
    groupData[safeClass] = finalGroups;
    groupData[targetClass] = finalGroups;

    // Sınıf Filtresini Güncelle ve Kümeleri Çiz
    const classFilter = document.getElementById('class-filter');
    if (classFilter) {
        let found = false;
        for (let i = 0; i < classFilter.options.length; i++) {
            if (classFilter.options[i].value === targetClass) {
                classFilter.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            const opt = document.createElement('option');
            opt.value = targetClass;
            opt.textContent = targetClass;
            opt.selected = true;
            classFilter.appendChild(opt);
        }
    }

    if (typeof loadClassGroups === 'function') {
        loadClassGroups(targetClass);
    }
    if (typeof updateStudentPickers === 'function') {
        updateStudentPickers();
    }

    // Kalıcı Olarak Kaydet (Session, LocalStorage & Firebase)
    try {
        sessionStorage.setItem('kume_form_sinif', targetClass);
        sessionStorage.setItem('kume_form_groups', JSON.stringify(groupData));
        localStorage.setItem('kume_form_sinif', targetClass);
        localStorage.setItem('kume_form_groups', JSON.stringify(groupData));
    } catch (e) {}

    if (typeof saveDataLocal === 'function') saveDataLocal();
    else if (typeof saveData === 'function') saveData();

    // Modalı Kapat & Bildir
    closeKumeExcelModal();

    if (typeof showStatus === 'function') {
        showStatus(`🎉 ${targetClass} sınıfına ${finalGroups.length} küme ve ${totalStudents} öğrenci Excel'den aktarıldı!`, false);
    } else {
        alert(`✅ Başarılı!\n\n${targetClass} sınıfı için ${finalGroups.length} küme ve toplam ${totalStudents} öğrenci başarıyla Excel dosyasından aktarıldı ve sisteme kaydedildi.`);
    }
}

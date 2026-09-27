// ============================================================
// pdf-excel-parser.js
// PDF ve Excel dosya ayrıştırma
// ============================================================

        // PDF.js Worker Kurulumu
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        let parsedPDFStudents = []; // PDF'den ayıklanan geçici öğrenci listesi

        function handleExamFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
                document.getElementById('mapping-container').style.display = 'none'; // Excel eşleştirmeyi gizle
                processPDFExamFile(file);
            } else {
                document.getElementById('pdf-student-selection-area').style.display = 'none'; // PDF menüsünü gizle
                if (typeof handleExamExcelData === "function") {
                    handleExamExcelData(event.target);
                }
            }
        }

        async function processPDFExamFile(file) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const typedarray = new Uint8Array(e.target.result);
                try {
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let fullText = "";

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");
                        fullText += pageText + "\n";
                    }
                    parsePDFContent(fullText);
                } catch (error) {
                    console.error("PDF okuma hatası:", error);
                    alert("PDF dosyası işlenirken bir hata oluştu.");
                }
            };
            reader.readAsArrayBuffer(file);
        }

        function parsePDFContent(text) {
            parsedPDFStudents = [];

            // Akıllı Regex Şablonu: Öğrenci No, İsim, Sınıf ve 6 dersin Doğru/Yanlış değerlerini yakalar
            const regex = /(?:^|\s)(\d+)\s+(\d+)\s+([A-ZÇĞİÖŞÜa-zçğıöşü\s]+?)\s*(\d+[A-Za-z\-/]+)\s+(\d+)\s+(\d+)\s+[\d,]+\s+(\d+)\s+(\d+)\s+[\d,]+\s+(\d+)\s+(\d+)\s+[\d,]+\s+(\d+)\s+(\d+)\s+[\d,]+\s+(\d+)\s+(\d+)\s+[\d,]+\s+(\d+)\s+(\d+)/g;

            let match;
            while ((match = regex.exec(text)) !== null) {
                let studentObj = {
                    id: "pdf_" + Date.now() + "_" + match[1],
                    name: match[3].trim(),
                    className: match[4],
                    studentNo: match[2],
                    scores: {
                        turkce: { d: parseInt(match[5]), y: parseInt(match[6]) },
                        sosyal: { d: parseInt(match[7]), y: parseInt(match[8]) },
                        din: { d: parseInt(match[9]), y: parseInt(match[10]) },
                        ingilizce: { d: parseInt(match[11]), y: parseInt(match[12]) },
                        matematik: { d: parseInt(match[13]), y: parseInt(match[14]) },
                        fen: { d: parseInt(match[15]), y: parseInt(match[16]) }
                    }
                };
                parsedPDFStudents.push(studentObj);
            }

            if (parsedPDFStudents.length === 0) {
                alert("Uyarı: PDF dosyası okundu fakat beklenen sınav sonucu şablonu (Sıra No İsim Sınıf TÜR SOS DİN İNG MAT FEN) bulunamadı. Lütfen SDS/Kurumsal Deneme PDF'si yüklediğinizden emin olun.");
            }

            renderPDFStudentList();
        }

        function renderPDFStudentList() {
            const tbody = document.getElementById("pdf-student-list-body");
            tbody.innerHTML = "";

            parsedPDFStudents.forEach(st => {
                let isRegistered = studentData.some(s => (s.no && s.no.toString() === st.studentNo) || (s.adSoyad && s.adSoyad.toLowerCase() === st.name.toLowerCase()));
                let bgColor = isRegistered ? "rgba(34, 197, 94, 0.08)" : "transparent";
                let nameIcon = isRegistered ? '<i class="fas fa-check-circle" style="color:var(--secondary); margin-right:5px;" title="Sistemde Kayıtlı Öğrenci"></i>' : '<i class="fas fa-question-circle" style="color:var(--text-muted); margin-right:5px;" title="Sistemde Bulunamayan/Yeni Öğrenci"></i>';

                const tr = document.createElement("tr");
                tr.style.borderBottom = "1px solid var(--border)";
                tr.style.backgroundColor = bgColor;
                tr.innerHTML = `
                <td style="padding: 8px;"><input type="checkbox" class="pdf-student-checkbox" value="${st.id}" checked></td>
                <td style="padding: 8px; font-weight: 600;">${nameIcon}${st.name}</td>
                <td style="padding: 8px;">${st.className} / No: ${st.studentNo}</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.turkce.d}D / ${st.scores.turkce.y}Y</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.matematik.d}D / ${st.scores.matematik.y}Y</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.fen.d}D / ${st.scores.fen.y}Y</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.sosyal.d}D / ${st.scores.sosyal.y}Y</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.din.d}D / ${st.scores.din.y}Y</td>
                <td style="padding: 8px; text-align: center; color: var(--teal);">${st.scores.ingilizce.d}D / ${st.scores.ingilizce.y}Y</td>
            `;
                tbody.appendChild(tr);
            });

            document.getElementById("pdf-student-selection-area").style.display = "block";
        }

        function toggleSelectAllPDFStudents(master) {
            document.querySelectorAll(".pdf-student-checkbox").forEach(cb => cb.checked = master.checked);
        }

        function importSelectedPDFStudents() {
            const checkboxes = document.querySelectorAll(".pdf-student-checkbox:checked");
            if (checkboxes.length === 0) return alert("Lütfen aktarmak için en az bir öğrenci seçin.");

            const activeExamId = document.getElementById('active-exam-upload-select').value;
            if (!activeExamId) return alert('Lütfen önce sınav seçiniz!');
            const exam = examData.find(e => e.id.toString() === activeExamId.toString());
            if (!exam) return alert("Sınav bulunamadı.");

            let importCount = 0;
            checkboxes.forEach(cb => {
                const studentId = cb.value;
                const pdfStudent = parsedPDFStudents.find(x => x.id === studentId);
                if (pdfStudent) {
                    // PDF'den gelen veriyi sistemin exam.results yapısına uyduruyoruz
                    let tNet = pdfStudent.scores.turkce.d - (pdfStudent.scores.turkce.y / 3);
                    let mNet = pdfStudent.scores.matematik.d - (pdfStudent.scores.matematik.y / 3);
                    let fNet = pdfStudent.scores.fen.d - (pdfStudent.scores.fen.y / 3);
                    let sNet = pdfStudent.scores.sosyal.d - (pdfStudent.scores.sosyal.y / 3);
                    let dNet = pdfStudent.scores.din.d - (pdfStudent.scores.din.y / 3);
                    let iNet = pdfStudent.scores.ingilizce.d - (pdfStudent.scores.ingilizce.y / 3);

                    // Öğrenciyi global studentData dizisinden bulup class/id bilgilerini senkronize edelim
                    let matchedStd = studentData.find(s => s.no && s.no.toString() === pdfStudent.studentNo) ||
                        studentData.find(s => s.adSoyad && s.adSoyad.toLowerCase() === pdfStudent.name.toLowerCase()) ||
                        null;

                    const studentKey = matchedStd ? matchedStd.adSoyad : pdfStudent.name;
                    const finalClass = matchedStd ? matchedStd.sinif : pdfStudent.className;
                    const totalNet = Math.max(0, parseFloat(tNet.toFixed(2))) + Math.max(0, parseFloat(mNet.toFixed(2))) + Math.max(0, parseFloat(fNet.toFixed(2))) + Math.max(0, parseFloat(sNet.toFixed(2))) + Math.max(0, parseFloat(dNet.toFixed(2))) + Math.max(0, parseFloat(iNet.toFixed(2)));

                    if (!exam.results) exam.results = {}; // Firebase boş objeleri sildiği için güvenlik kontrolü

                    exam.results[studentKey] = {
                        no: matchedStd ? matchedStd.no : pdfStudent.studentNo,
                        sinif: finalClass,
                        Turkce: Math.max(0, parseFloat(tNet.toFixed(2))),
                        Matematik: Math.max(0, parseFloat(mNet.toFixed(2))),
                        Fen: Math.max(0, parseFloat(fNet.toFixed(2))),
                        Sosyal: Math.max(0, parseFloat(sNet.toFixed(2))),
                        DinKulturu: Math.max(0, parseFloat(dNet.toFixed(2))),
                        Ingilizce: Math.max(0, parseFloat(iNet.toFixed(2))),
                        totalNet: parseFloat(totalNet.toFixed(2)),
                        rank: "-"
                    };
                    importCount++;
                }
            });

            saveData();
            if (typeof renderExams === "function") renderExams();

            alert(`${importCount} öğrencinin sınav sonuçları başarıyla veritabanına aktarıldı ve grafiğe yansıtıldı.`);
            document.getElementById("pdf-student-selection-area").style.display = "none";
            document.getElementById("exam-import-file").value = "";
        }

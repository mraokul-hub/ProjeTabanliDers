// ============================================================
// ui-exams.js
// Deneme sınavı yönetimi ve analizi
// ============================================================

        function addExam() {
            const title = document.getElementById('exam-title').value; const date = document.getElementById('exam-date').value;
            const selectedClasses = Array.from(document.querySelectorAll('.exam-class-checkbox:checked')).map(cb => cb.value);
            if (!title || !date || selectedClasses.length === 0) return alert("Lütfen tüm alanları doldurun ve en az bir sınıf seçin!");

            examData.push({ id: Date.now(), title, date, classes: selectedClasses, results: {} });
            saveData(); renderExams(); updateExamUploadDropdowns();
            syncAllExamsToKocluk(true);
            document.getElementById('exam-title').value = ''; document.getElementById('exam-date').value = '';
            document.querySelectorAll('.exam-class-checkbox').forEach(cb => cb.checked = false);
        }

        function updateExamUploadDropdowns() {
            const select = document.getElementById('active-exam-upload-select'); if (!select) return;
            const currentVal = select.value; select.innerHTML = '<option value="">-- Sınav Seçiniz --</option>';
            examData.forEach(e => {
                const classStr = e.classes ? e.classes.join(', ') : (e.sinif || 'Belirsiz');
                select.innerHTML += `<option value="${e.id}">${e.title} (${classStr})</option>`;
            });
            select.value = currentVal;
            updateExamUploadClassesInfo();
        }

        function updateExamUploadClassesInfo() {
            const select = document.getElementById('active-exam-upload-select'); const infoDiv = document.getElementById('exam-target-classes-info');
            if (!select || !infoDiv) return;
            if (!select.value) { infoDiv.textContent = ''; return; }
            const exam = examData.find(e => e.id === parseInt(select.value));
            if (exam && exam.classes) infoDiv.textContent = `🎯 Hedef Veritabanı Sınıfları: ${exam.classes.join(', ')}`;
        }

        function renderExams() {
            const list = document.getElementById('exam-list'); if (!list) return; list.innerHTML = '';
            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
            
            if (!Array.isArray(examData) || examData.length === 0) {
                list.innerHTML = `
                    <div style="text-align:center; padding:32px 20px; color:var(--text-muted); background:var(--card-bg); border-radius:10px; border:1px dashed var(--border);">
                        <i class="fas fa-file-excel fa-2x" style="opacity:0.4; margin-bottom:10px; color:var(--teal);"></i>
                        <p style="font-size:13px; font-weight:700; margin:0; color:var(--text-main);">Henüz Tanımlı Bir Deneme Sınavı Bulunmuyor</p>
                        <p style="font-size:11.5px; margin:6px 0 0 0; color:var(--text-muted);">Soldaki <strong>Akıllı Sınav İçe Aktarma</strong> alanından Excel veya PDF yükleyerek hemen sınav ekleyebilirsiniz.</p>
                    </div>`;
                return;
            }

            examData.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(exam => {
                const classStr = exam.classes ? exam.classes.join(', ') : (exam.sinif || 'Belirsiz');
                const resultCount = exam.results ? Object.keys(exam.results).length : 0;
                const dateStr = exam.date ? new Date(exam.date).toLocaleDateString('tr-TR') : 'Tarih Belirtilmedi';
                const card = document.createElement('div');
                card.className = 'form-box';
                card.style = "margin-bottom:15px; border-left: 5px solid var(--teal); background:var(--card-bg);";
                card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <h4 style="margin:0; color:var(--teal); font-size:15px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-file-alt"></i> ${escapeFn(exam.title)}
                    </h4>
                    <p style="font-size:12px; margin:4px 0; color:var(--text-muted);">
                        <i class="fas fa-calendar-alt me-1"></i> ${dateStr} | Sınıflar: <strong>${escapeFn(classStr)}</strong>
                    </p>
                    <p style="font-size:12px; font-weight:700; color:var(--secondary); margin:0;">
                        <i class="fas fa-user-check me-1"></i> Veritabanı Toplam Kayıt: ${resultCount} Öğrenci
                    </p>
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button class="btn" style="padding:6px 14px; font-size:11.5px; font-weight:700; background:var(--teal); color:#fff; border-radius:6px; display:inline-flex; align-items:center; gap:5px;" onclick="openExamEvaluation('${exam.id}')">
                        <i class="fas fa-edit"></i> Detaylar / Düzenle
                    </button>
                    <button class="action-btn btn-delete" style="padding:6px 10px; border-radius:6px; font-size:13px;" onclick="deleteExam('${exam.id}', event)" title="Sınavı Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div></div>`;
                list.appendChild(card);
            });
        }

        async function deleteExam(id, ev) {
            if (ev) {
                if (typeof ev.stopPropagation === 'function') ev.stopPropagation();
                if (typeof ev.preventDefault === 'function') ev.preventDefault();
            }
            const examToDelete = (examData || []).find(e => String(e.id) === String(id));
            const examTitle = examToDelete ? examToDelete.title : 'Bu sınavı';
            if (!confirm(`"${examTitle}" sınavını ve kayıtlı tüm öğrenci sonuçlarını silmek istediğinize emin misiniz?`)) return;

            // 1. Yerel listeden kaldır
            examData = (examData || []).filter(e => String(e.id) !== String(id));
            window.examData = examData;
            
            // 2. Koçluk bölümündeki bu sınava ait denemeleri de temizle
            if (Array.isArray(window.koclukData)) {
                window.koclukData.forEach(k => {
                    if (Array.isArray(k.denemeler)) {
                        k.denemeler = k.denemeler.filter(d => String(d.examId) !== String(id) && d.id !== 'den_exam_' + id);
                    }
                });
            }
            if (Array.isArray(window.yksKoclukData)) {
                window.yksKoclukData.forEach(k => {
                    if (Array.isArray(k.denemeler)) {
                        k.denemeler = k.denemeler.filter(d => String(d.examId) !== String(id) && d.id !== 'den_exam_' + id);
                    }
                });
            }

            // 3. Doğrudan Firebase'den kalıcı sil
            const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
            const uid = currentUser ? currentUser.uid : (window.currentUser ? window.currentUser.uid : null);
            if (uid && window.db) {
                const safeId = String(id).replace(/[\/\.\#\$\/\[\]]/g, '_');
                try {
                    window.db.ref(`app_data/${uid}/exams/${safeId}`).remove().catch(e => console.warn(e));
                    window.db.ref(`app_data/${uid}/main_data/exams/${safeId}`).remove().catch(e => console.warn(e));
                } catch (e) {
                    console.warn("[deleteExam] Firebase silme:", e);
                }
                if (window._lastSavedRefs && window._lastSavedRefs.exams) {
                    delete window._lastSavedRefs.exams[safeId];
                    delete window._lastSavedRefs.exams[id];
                }
            }

            // 4. Veritabanını hemen eşitle ve arayüzü güncelle
            if (typeof saveLocalData === 'function') saveLocalData();
            if (typeof saveData === 'function') saveData(true);
            renderExams();
            updateExamUploadDropdowns();
            if (typeof window.renderKoclukModule === 'function') window.renderKoclukModule();
            if (typeof window.renderYksKoclukModule === 'function') window.renderYksKoclukModule();

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`"${examTitle}" başarıyla silindi.`, 'success');
            }
        }
        window.deleteExam = deleteExam;


        // ============================================================
        // 8. SINAV ANALİZ -> 13. LGS & 14. YKS KOÇLUK SENKRONİZASYON MOTORU
        // ============================================================
        
        /**
         * Öğrenci eşleştirici: No, İsim ve Sınıf kombinasyonunu normalize ederek eşleştirir
         */
        function matchStudentIdentity(coachStudent, studentKey, examResult) {
            if (!coachStudent) return false;
            
            const cNo = String(coachStudent.studentNo || coachStudent.no || '').trim();
            const rNo = String(examResult?.no || examResult?.studentNo || '').trim();
            if (cNo && rNo && cNo === rNo) return true;

            const normalize = (str) => {
                return String(str || '')
                    .toLocaleLowerCase('tr-TR')
                    .replace(/[\s\.\-_]+/g, ' ')
                    .trim();
            };

            const cName = normalize(coachStudent.adSoyad || coachStudent.name);
            const rName = normalize(examResult?.adSoyad || examResult?.name || studentKey);

            if (cName && rName && cName === rName) return true;

            // İlk isim ve son isim eşleşmesi (ikinci ad yazılmamışsa veya kısaltılmışsa)
            if (cName && rName) {
                const cParts = cName.split(' ').filter(Boolean);
                const rParts = rName.split(' ').filter(Boolean);
                if (cParts.length >= 2 && rParts.length >= 2) {
                    if (cParts[0] === rParts[0] && cParts[cParts.length - 1] === rParts[rParts.length - 1]) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Tek bir öğrencinin sınav sonucunu Koçluk (LGS veya YKS) havuzuna aktarır/günceller
         */
        function syncSingleStudentExamToKocluk(exam, studentKey, res) {
            if (!exam || !res) return;

            const tr = parseFloat(res.Turkce) || 0;
            const mat = parseFloat(res.Matematik) || 0;
            const fen = parseFloat(res.Fen) || 0;
            const sos = parseFloat(res.Sosyal) || 0;
            const din = parseFloat(res.DinKulturu) || 0;
            const ing = parseFloat(res.Ingilizce) || 0;
            const sozel = parseFloat((tr + sos + din + ing).toFixed(2));
            const topNet = (res.totalNet !== undefined && res.totalNet !== null && res.totalNet !== '')
                ? parseFloat(res.totalNet)
                : parseFloat((sozel + mat + fen).toFixed(2));
            const examDateStr = exam.date ? new Date(exam.date).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR');
            const isAyt = String(exam.title || '').toUpperCase().includes('AYT');

            // DYB Çözümleme
            const resolveFn = (typeof window.resolveDybFromNet === 'function') ? window.resolveDybFromNet : function (netVal, maxQuestions = 20, penalty = 3) {
                if (netVal === null || netVal === undefined || netVal === '' || isNaN(Number(netVal))) return { d: 0, y: 0, b: maxQuestions };
                const net = Math.max(0, Math.round(Number(netVal) * 100) / 100);
                if (net === 0) return { d: 0, y: 0, b: maxQuestions };
                let best = null, minDiff = Infinity;
                for (let y = 0; y <= maxQuestions; y++) {
                    const d = Math.round(net + (y / penalty));
                    if (d >= 0 && (d + y) <= maxQuestions) {
                        const calcNet = Math.round((d - (y / penalty)) * 100) / 100;
                        const diff = Math.abs(calcNet - net);
                        if (diff < 0.02) { best = { d, y, b: Math.max(0, maxQuestions - d - y) }; break; }
                        if (diff < minDiff) { minDiff = diff; best = { d, y, b: Math.max(0, maxQuestions - d - y) }; }
                    }
                }
                if (!best) {
                    const fallbackD = Math.min(maxQuestions, Math.max(0, Math.round(net)));
                    best = { d: fallbackD, y: 0, b: Math.max(0, maxQuestions - fallbackD) };
                }
                return best;
            };

            const trDyb = resolveFn(tr, 20, 3);
            const matDyb = resolveFn(mat, 20, 3);
            const fenDyb = resolveFn(fen, 20, 3);
            const inkDyb = resolveFn(sos, 10, 3);
            const dinDyb = resolveFn(din, 10, 3);
            const ingDyb = resolveFn(ing, 10, 3);

            const sozelD = trDyb.d + inkDyb.d + dinDyb.d + ingDyb.d;
            const sozelY = trDyb.y + inkDyb.y + dinDyb.y + ingDyb.y;
            const sozelB = trDyb.b + inkDyb.b + dinDyb.b + ingDyb.b;

            const sayD = matDyb.d + fenDyb.d;
            const sayY = matDyb.y + fenDyb.y;
            const sayB = matDyb.b + fenDyb.b;
            const sayNet = parseFloat((mat + fen).toFixed(2));

            const topD = sozelD + sayD;
            const topY = sozelY + sayY;
            const topB = sozelB + sayB;

            // 1. LGS Bilişsel Koçluk (koclukData) Eşleştirme
            if (Array.isArray(window.koclukData)) {
                window.koclukData.forEach(kocItem => {
                    if (matchStudentIdentity(kocItem, studentKey, res)) {
                        if (!Array.isArray(kocItem.denemeler)) kocItem.denemeler = [];
                        
                        let existing = kocItem.denemeler.find(d => 
                            String(d.examId) === String(exam.id) || 
                            d.id === 'den_exam_' + exam.id || 
                            (d.ad === exam.title && (d.tarih === examDateStr || d.tarih === exam.date))
                        );

                        if (existing) {
                            existing.ad = exam.title;
                            existing.tarih = examDateStr;
                            existing.turkce = tr;
                            existing.turkceD = trDyb.d;
                            existing.turkceY = trDyb.y;
                            existing.turkceB = trDyb.b;
                            existing.matematik = mat;
                            existing.matNet = mat;
                            existing.matD = matDyb.d;
                            existing.matY = matDyb.y;
                            existing.matB = matDyb.b;
                            existing.fen = fen;
                            existing.fenNet = fen;
                            existing.fenD = fenDyb.d;
                            existing.fenY = fenDyb.y;
                            existing.fenB = fenDyb.b;
                            existing.inkilap = sos;
                            existing.inkNet = sos;
                            existing.inkilapD = inkDyb.d;
                            existing.inkilapY = inkDyb.y;
                            existing.inkilapB = inkDyb.b;
                            existing.din = din;
                            existing.dinNet = din;
                            existing.dinD = dinDyb.d;
                            existing.dinY = dinDyb.y;
                            existing.dinB = dinDyb.b;
                            existing.ingilizce = ing;
                            existing.ingNet = ing;
                            existing.ingilizceD = ingDyb.d;
                            existing.ingilizceY = ingDyb.y;
                            existing.ingilizceB = ingDyb.b;
                            existing.sozelNet = sozel;
                            existing.sozelD = sozelD;
                            existing.sozelY = sozelY;
                            existing.sozelB = sozelB;
                            existing.sayisalNet = sayNet;
                            existing.sayisalD = sayD;
                            existing.sayisalY = sayY;
                            existing.sayisalB = sayB;
                            existing.toplamNet = topNet;
                            existing.toplamD = topD;
                            existing.toplamY = topY;
                            existing.toplamB = topB;
                            existing.rank = res.rank || '-';
                            existing.source = 'exam_module';
                            existing.examId = String(exam.id);
                            if (typeof window.calculateTDE === 'function') {
                                existing.tdePuan = window.calculateTDE(existing).tdePuan;
                            }
                        } else {
                            const newDeneme = {
                                id: 'den_exam_' + exam.id,
                                examId: String(exam.id),
                                source: 'exam_module',
                                ad: exam.title,
                                tarih: examDateStr,
                                sozelNet: sozel,
                                sozelD: sozelD,
                                sozelY: sozelY,
                                sozelB: sozelB,
                                matNet: mat,
                                matematik: mat,
                                matD: matDyb.d,
                                matY: matDyb.y,
                                matB: matDyb.b,
                                fenNet: fen,
                                fen: fen,
                                fenD: fenDyb.d,
                                fenY: fenDyb.y,
                                fenB: fenDyb.b,
                                sayisalNet: sayNet,
                                sayisalD: sayD,
                                sayisalY: sayY,
                                sayisalB: sayB,
                                toplamNet: topNet,
                                toplamD: topD,
                                toplamY: topY,
                                toplamB: topB,
                                turkce: tr,
                                turkceD: trDyb.d,
                                turkceY: trDyb.y,
                                turkceB: trDyb.b,
                                inkilap: sos,
                                inkNet: sos,
                                inkilapD: inkDyb.d,
                                inkilapY: inkDyb.y,
                                inkilapB: inkDyb.b,
                                din: din,
                                dinNet: din,
                                dinD: dinDyb.d,
                                dinY: dinDyb.y,
                                dinB: dinDyb.b,
                                ingilizce: ing,
                                ingNet: ing,
                                ingilizceD: ingDyb.d,
                                ingilizceY: ingDyb.y,
                                ingilizceB: ingDyb.b,
                                rank: res.rank || '-',
                                cozumSirasi: 'Fen-Mat',
                                fen1TurSure: 32,
                                mat1TurSure: 30,
                                inatlasmaSayisi: 0,
                                fen2TurKazanc: 2,
                                mat2TurKazanc: 2,
                                optikKontrol: true,
                                tdePuan: 75
                            };
                            if (typeof window.calculateTDE === 'function') {
                                newDeneme.tdePuan = window.calculateTDE(newDeneme).tdePuan;
                            }
                            kocItem.denemeler.push(newDeneme);
                        }

                        // Tarihe göre sırala
                        kocItem.denemeler.sort((a, b) => {
                            const parseD = str => {
                                if (!str) return 0;
                                const parts = String(str).split('.');
                                if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
                                return new Date(str).getTime() || 0;
                            };
                            return parseD(a.tarih) - parseD(b.tarih);
                        });
                    }
                });
            }

            // 2. YKS Bilişsel Koçluk (yksKoclukData) Eşleştirme
            if (Array.isArray(window.yksKoclukData)) {
                window.yksKoclukData.forEach(yksItem => {
                    if (matchStudentIdentity(yksItem, studentKey, res)) {
                        if (!Array.isArray(yksItem.denemeler)) yksItem.denemeler = [];

                        let existing = yksItem.denemeler.find(d => 
                            String(d.examId) === String(exam.id) || 
                            d.id === 'den_exam_' + exam.id || 
                            (d.yayin === exam.title && (d.tarih === examDateStr || d.tarih === exam.date))
                        );

                        if (existing) {
                            existing.yayin = exam.title;
                            existing.tarih = exam.date || examDateStr;
                            existing.tur = isAyt ? 'AYT' : 'TYT';
                            existing.source = 'exam_module';
                            existing.examId = String(exam.id);
                            if (!existing.netler) existing.netler = {};
                            existing.netler.toplam = topNet;
                            existing.netler.turkce = tr;
                            existing.netler.matematik = mat;
                            existing.netler.fen = fen;
                            existing.netler.sosyal = sos;
                            existing.netler.din = din;
                            existing.netler.ingilizce = ing;
                        } else {
                            const newYksDen = {
                                id: 'den_exam_' + exam.id,
                                examId: String(exam.id),
                                source: 'exam_module',
                                tarih: exam.date || new Date().toISOString().split('T')[0],
                                tur: isAyt ? 'AYT' : 'TYT',
                                yayin: exam.title,
                                netler: {
                                    toplam: topNet,
                                    turkce: tr,
                                    matematik: mat,
                                    fen: fen,
                                    sosyal: sos,
                                    din: din,
                                    ingilizce: ing
                                },
                                sureAnalizi: isAyt ? {
                                    dikkatHatasiSayisi: 1,
                                    kokOkumaHatasiSayisi: 0,
                                    kumarSoruSayisi: 0,
                                    optikKontrol: true
                                } : {
                                    turkce1Tur: 42,
                                    mat1Tur: 45,
                                    fenSos1Tur: 30,
                                    inatlasmaSayisi: 0,
                                    tur2NetKazanc: 4,
                                    optikKontrol: true
                                }
                            };
                            yksItem.denemeler.push(newYksDen);
                        }

                        // Tarihe göre sırala
                        yksItem.denemeler.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());
                    }
                });
            }
        }

        /**
         * 8. Sınav Analiz veritabanındaki TÜM sınavları Koçluk öğrencileriyle eşler
         */
        function syncAllExamsToKocluk(quiet = false) {
            if (!Array.isArray(examData) || examData.length === 0) {
                if (!quiet && typeof showGlobalToast === 'function') {
                    showGlobalToast('Sınav Analiz bölümünde henüz deneme sınavı bulunmuyor.', 'info');
                }
                return;
            }

            let lgsMatched = 0;
            let yksMatched = 0;

            examData.forEach(exam => {
                if (!exam.results || typeof exam.results !== 'object') return;
                Object.entries(exam.results).forEach(([studentKey, res]) => {
                    syncSingleStudentExamToKocluk(exam, studentKey, res);
                });
            });

            // Sayımları topla
            if (Array.isArray(window.koclukData)) {
                window.koclukData.forEach(k => {
                    const cnt = (k.denemeler || []).filter(d => d.source === 'exam_module').length;
                    lgsMatched += cnt;
                });
            }
            if (Array.isArray(window.yksKoclukData)) {
                window.yksKoclukData.forEach(k => {
                    const cnt = (k.denemeler || []).filter(d => d.source === 'exam_module').length;
                    yksMatched += cnt;
                });
            }

            if (typeof saveData === 'function') saveData();

            // Eğer koçluk modülü arayüzü açıksa anında yeniden çiz
            if (typeof window.renderKoclukModule === 'function') window.renderKoclukModule();
            if (typeof window.renderYksKoclukModule === 'function') window.renderYksKoclukModule();

            if (!quiet) {
                const totalSynced = lgsMatched + yksMatched;
                const msg = `✅ 8. Sınav Analiz verileri başarıyla koçluk öğrencileriyle eşleştirildi!\n` +
                    `• LGS Koçluk: ${lgsMatched} deneme sonucu senkronize edildi\n` +
                    `• YKS Koçluk: ${yksMatched} deneme sonucu senkronize edildi`;
                if (typeof showGlobalToast === 'function') {
                    showGlobalToast(msg, 'success');
                } else {
                    alert(msg);
                }
            }
        }
        window.syncAllExamsToKocluk = syncAllExamsToKocluk;
        window.syncSingleStudentExamToKocluk = syncSingleStudentExamToKocluk;
        window.deleteExam = deleteExam;

        // ============================================================
        // EVRENSEL AKILLI SINAV İÇE AKTARMA SİHİRBAZI (EXCEL & PDF WIZARD)
        // ============================================================
        window._examWizardState = null;

        function handleExamFileDrop(event) {
            event.preventDefault();
            const dropZone = document.getElementById('exam-drop-zone');
            if (dropZone) {
                dropZone.style.borderColor = 'var(--border)';
                dropZone.style.background = 'var(--input-bg)';
            }
            if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                openExamImportWizard(event.dataTransfer.files[0]);
            }
        }
        window.handleExamFileDrop = handleExamFileDrop;

        function handleExamFileSelect(event) {
            const input = event.target;
            if (input && input.files && input.files.length > 0) {
                openExamImportWizard(input.files[0]);
            }
        }
        window.handleExamFileSelect = handleExamFileSelect;


        async function openExamImportWizard(file) {
            if (!file) return;
            const validExts = ['.xlsx', '.xls', '.csv', '.pdf'];
            const fileNameLower = file.name.toLowerCase();
            const isValid = validExts.some(ext => fileNameLower.endsWith(ext));
            if (!isValid) {
                return alert("Lütfen geçerli bir Excel (.xlsx, .xls, .csv) veya Kurumsal Deneme PDF'si (.pdf) seçiniz.");
            }

            const loadingEl = document.getElementById('exam-import-loading-indicator');
            const loadingText = document.getElementById('exam-import-loading-text');
            if (loadingEl) {
                loadingEl.style.display = 'block';
                if (loadingText) loadingText.textContent = `"${file.name}" taranıyor, tablolar ve veriler ayıklanıyor...`;
            }

            try {
                let parsed = null;
                if (fileNameLower.endsWith('.pdf')) {
                    if (!window.ExamDataParser || typeof window.ExamDataParser.parsePDFFile !== 'function') {
                        throw new Error("PDF ayrıştırıcı motoru yüklenemedi.");
                    }
                    parsed = await window.ExamDataParser.parsePDFFile(file);
                } else {
                    if (!window.ExamDataParser || typeof window.ExamDataParser.parseExcelFile !== 'function') {
                        throw new Error("Excel ayrıştırıcı motoru yüklenemedi.");
                    }
                    parsed = await window.ExamDataParser.parseExcelFile(file);
                }

                if (!parsed || !parsed.rows || parsed.rows.length === 0) {
                    throw new Error("Dosyada geçerli öğrenci veya sınav sonucu satırı bulunamadı.");
                }

                const initialMapping = window.ExamDataParser.autoDetectExamColumns(parsed.headers);
                const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim();

                window._examWizardState = {
                    file: file,
                    fileName: file.name,
                    fileType: fileNameLower.endsWith('.pdf') ? 'pdf' : 'excel',
                    headers: parsed.headers,
                    rows: parsed.rows,
                    mapping: initialMapping,
                    formulaType: '3y1d', // '3y1d' | '4y1d' | 'direct'
                    targetExamId: 'NEW',
                    manualOverrides: {},
                    newExamTitle: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
                    newExamDate: new Date().toISOString().split('T')[0],
                    selectedIndices: new Set(parsed.rows.map((_, i) => i))
                };

                // Modalı body'ye taşı (Z-index stacking context için)
                const modal = document.getElementById('exam-import-wizard-modal');
                if (modal && modal.parentElement !== document.body) {
                    document.body.appendChild(modal);
                }

                initWizardModalUI();
                if (modal) modal.style.display = 'block';

            } catch (err) {
                console.error("Sınav dosyası ayrıştırma hatası:", err);
                alert("Dosya yüklenirken bir sorun oluştu:\n" + (err.message || err));
            } finally {
                if (loadingEl) loadingEl.style.display = 'none';
            }
        }

        function initWizardModalUI() {
            const state = window._examWizardState;
            if (!state) return;

            // Dosya Başlığı & Rozet
            const fileBadge = document.getElementById('wizard-file-badge');
            if (fileBadge) {
                const icon = state.fileType === 'pdf' ? '<i class="fas fa-file-pdf me-1" style="color:#ef4444;"></i>' : '<i class="fas fa-file-excel me-1" style="color:#10b981;"></i>';
                fileBadge.innerHTML = `${icon} <strong>${escapeHtml(state.fileName)}</strong> · <span style="color:var(--secondary); font-weight:700;">${state.rows.length} Satır</span> tespit edildi`;
            }

            // Hedef Sınav Seçici Dropdown
            const targetSelect = document.getElementById('wizard-target-exam-select');
            if (targetSelect) {
                let opts = `<option value="NEW">✨ Dosyadan Yeni Sınav Tanımla</option>`;
                if (Array.isArray(examData) && examData.length > 0) {
                    examData.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(e => {
                        const classStr = e.classes ? e.classes.join(', ') : (e.sinif || '-');
                        opts += `<option value="${e.id}">Mevcut: ${escapeHtml(e.title)} (${classStr})</option>`;
                    });
                }
                targetSelect.innerHTML = opts;
                targetSelect.value = state.targetExamId;
            }

            const newFieldsWrap = document.getElementById('wizard-new-exam-fields');
            if (newFieldsWrap) newFieldsWrap.style.display = state.targetExamId === 'NEW' ? 'grid' : 'none';

            const titleInput = document.getElementById('wizard-new-exam-title');
            if (titleInput) titleInput.value = state.newExamTitle;

            const dateInput = document.getElementById('wizard-new-exam-date');
            if (dateInput) dateInput.value = state.newExamDate;

            const formulaSelect = document.getElementById('wizard-formula-select');
            if (formulaSelect) formulaSelect.value = state.formulaType;

            const autoAddCheck = document.getElementById('wizard-auto-add-students');
            if (autoAddCheck) autoAddCheck.checked = false;

            // Sütun Eşleştirme Alanlarını Doldur
            renderWizardMappingFields();

            // Canlı Önizleme Tablosunu Çiz
            renderWizardPreviewTable();
        }

        function closeExamImportWizard() {
            const modal = document.getElementById('exam-import-wizard-modal');
            if (modal) modal.style.display = 'none';
            const unmatchedModal = document.getElementById('exam-unmatched-modal');
            if (unmatchedModal) unmatchedModal.style.display = 'none';
            const fileInput = document.getElementById('exam-import-file');
            if (fileInput) fileInput.value = '';
            window._examWizardState = null;
        }

        function onWizardTargetExamChange(val) {
            if (!window._examWizardState) return;
            window._examWizardState.targetExamId = val;
            const newFieldsWrap = document.getElementById('wizard-new-exam-fields');
            if (newFieldsWrap) newFieldsWrap.style.display = val === 'NEW' ? 'grid' : 'none';
        }

        function onWizardFormulaChange(val) {
            if (!window._examWizardState) return;
            window._examWizardState.formulaType = val;
            renderWizardPreviewTable();
        }

        function onWizardMappingChange(key, val) {
            if (!window._examWizardState) return;
            window._examWizardState.mapping[key] = val;
            renderWizardPreviewTable();
        }

        function onWizardAutoAddChange(checked) {
            if (!window._examWizardState) return;
            window._examWizardState.autoAddMissingStudents = checked;
            renderWizardPreviewTable();
        }

        function renderWizardMappingFields() {
            const state = window._examWizardState;
            if (!state) return;

            const headers = state.headers;
            const mapping = state.mapping;
            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

            function buildSelectHtml(fieldKey, currentVal) {
                let html = `<option value="">-- Yok / Otomatik --</option>`;
                headers.forEach((h, idx) => {
                    const strIdx = String(idx);
                    const selected = (String(currentVal) === strIdx) ? 'selected' : '';
                    html += `<option value="${strIdx}" ${selected}>[${idx + 1}] ${escapeFn(h)}</option>`;
                });
                return `<select class="wizard-map-select" onchange="onWizardMappingChange('${fieldKey}', this.value)" style="width:100%; padding:5px 7px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); color:var(--text-main); font-size:11.5px;">${html}</select>`;
            }

            const container = document.getElementById('wizard-mapping-grid');
            if (!container) return;

            container.innerHTML = `
                <!-- 1. Öğrenci Kimliği -->
                <div style="background:var(--tab-bg); padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <div style="font-size:12px; font-weight:800; color:var(--secondary); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-id-card"></i> 1. Öğrenci Bilgileri
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">Ad Soyad Sütunu <span style="color:#ef4444;">*</span></label>
                            ${buildSelectHtml('studentName', mapping.studentName)}
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:2px;">Öğrenci No</label>
                            ${buildSelectHtml('studentNo', mapping.studentNo)}
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:2px;">Sınıf / Şube</label>
                            ${buildSelectHtml('studentClass', mapping.studentClass)}
                        </div>
                    </div>
                </div>

                <!-- 2. Genel Metrikler -->
                <div style="background:var(--tab-bg); padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <div style="font-size:12px; font-weight:800; color:var(--accent); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-chart-pie"></i> 2. Toplam Net &amp; Sıra
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div>
                            <label style="font-size:11px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:2px;">Toplam Net (Boşsa derslerden toplanır)</label>
                            ${buildSelectHtml('totalNet', mapping.totalNet)}
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:2px;">Sıra / Derece</label>
                            ${buildSelectHtml('rank', mapping.rank)}
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:600; color:var(--text-muted); display:block; margin-bottom:2px;">Puan (Opsiyonel)</label>
                            ${buildSelectHtml('puan', mapping.puan)}
                        </div>
                    </div>
                </div>

                <!-- 3. Türkçe & Matematik -->
                <div style="background:var(--tab-bg); padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <div style="font-size:12px; font-weight:800; color:#3b82f6; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-book-open"></i> 3. Türkçe &amp; Matematik
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">🇹🇷 Türkçe (Net Sütunu)</label>
                            ${buildSelectHtml('turkce_net', mapping.turkce_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya TR Doğru</label>${buildSelectHtml('turkce_d', mapping.turkce_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">TR Yanlış</label>${buildSelectHtml('turkce_y', mapping.turkce_y)}</div>
                        </div>
                        <div style="margin-top:4px;">
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">🧮 Matematik (Net Sütunu)</label>
                            ${buildSelectHtml('mat_net', mapping.mat_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya MAT Doğru</label>${buildSelectHtml('mat_d', mapping.mat_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">MAT Yanlış</label>${buildSelectHtml('mat_y', mapping.mat_y)}</div>
                        </div>
                    </div>
                </div>

                <!-- 4. Fen & Sosyal -->
                <div style="background:var(--tab-bg); padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <div style="font-size:12px; font-weight:800; color:#10b981; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-flask"></i> 4. Fen Bilimleri &amp; Sosyal
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">🔬 Fen Bilimleri (Net Sütunu)</label>
                            ${buildSelectHtml('fen_net', mapping.fen_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya FEN Doğru</label>${buildSelectHtml('fen_d', mapping.fen_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">FEN Yanlış</label>${buildSelectHtml('fen_y', mapping.fen_y)}</div>
                        </div>
                        <div style="margin-top:4px;">
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">🌍 Sosyal / İnkılap (Net Sütunu)</label>
                            ${buildSelectHtml('sosyal_net', mapping.sosyal_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya SOS Doğru</label>${buildSelectHtml('sosyal_d', mapping.sosyal_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">SOS Yanlış</label>${buildSelectHtml('sosyal_y', mapping.sosyal_y)}</div>
                        </div>
                    </div>
                </div>

                <!-- 5. Din & İngilizce -->
                <div style="background:var(--tab-bg); padding:10px; border-radius:8px; border:1px solid var(--border);">
                    <div style="font-size:12px; font-weight:800; color:#8b5cf6; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-language"></i> 5. Din Kültürü &amp; İngilizce
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">☪️ Din Kültürü (Net Sütunu)</label>
                            ${buildSelectHtml('din_net', mapping.din_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya DİN Doğru</label>${buildSelectHtml('din_d', mapping.din_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">DİN Yanlış</label>${buildSelectHtml('din_y', mapping.din_y)}</div>
                        </div>
                        <div style="margin-top:4px;">
                            <label style="font-size:11px; font-weight:700; color:var(--text-main); display:block; margin-bottom:2px;">🇬🇧 İngilizce / Dil (Net Sütunu)</label>
                            ${buildSelectHtml('ing_net', mapping.ing_net)}
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px;">
                            <div><label style="font-size:10px; color:var(--text-muted);">veya İNG Doğru</label>${buildSelectHtml('ing_d', mapping.ing_d)}</div>
                            <div><label style="font-size:10px; color:var(--text-muted);">İNG Yanlış</label>${buildSelectHtml('ing_y', mapping.ing_y)}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        function getRowVerifiedMetrics(row, idx) {
            const state = window._examWizardState;
            if (!state) return null;
            if (!state.manualOverrides) state.manualOverrides = {};

            const m = window.ExamDataParser.computeRowMetrics(row, state.mapping, state.formulaType);
            m.isManualMatched = false;
            m.isIgnored = false;

            const override = state.manualOverrides[idx];
            if (override) {
                if (override.status === 'matched' && override.student) {
                    m.isRegistered = true;
                    m.isManualMatched = true;
                    m.matchedStudent = override.student;
                    m.name = override.student.adSoyad;
                    m.no = override.student.no;
                    m.sinif = override.student.sinif || m.sinif;
                    m.isIgnored = false;
                } else if (override.status === 'ignored') {
                    m.isIgnored = true;
                    m.isRegistered = false;
                }
            }
            return m;
        }

        function renderWizardPreviewTable() {
            const state = window._examWizardState;
            if (!state) return;

            const tbody = document.getElementById('wizard-preview-tbody');
            if (!tbody) return;

            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
            if (!state.selectedIndices) {
                state.selectedIndices = new Set(state.rows.map((_, i) => i));
            }

            let matchedCount = 0;
            let unmatchedCount = 0;
            let ignoredCount = 0;
            let coachCount = 0;
            let rowsHtml = '';

            state.rows.forEach((row, idx) => {
                const m = getRowVerifiedMetrics(row, idx);

                let statusBadge = '';
                if (m.isIgnored) {
                    ignoredCount++;
                    statusBadge = `<span style="background:rgba(100,116,139,0.15); color:#64748b; font-weight:700; padding:2px 6px; border-radius:10px; font-size:10px;" title="Bu kayıt sınava aktarılmayacak"><i class="fas fa-ban me-1"></i>Yoksayıldı</span>`;
                } else if (m.isManualMatched) {
                    matchedCount++;
                    statusBadge = `<span style="background:rgba(16,185,129,0.15); color:#059669; font-weight:700; padding:2px 6px; border-radius:10px; font-size:10px;" title="Veritabanı ile eşleştirildi: ${escapeFn(m.name)} (${escapeFn(m.no)})"><i class="fas fa-link me-1"></i>Manuel Eşleşti</span>`;
                } else if (m.isRegistered) {
                    matchedCount++;
                    statusBadge = `<span style="background:rgba(34,197,94,0.15); color:#16a34a; font-weight:700; padding:2px 6px; border-radius:10px; font-size:10px;"><i class="fas fa-check-circle me-1"></i>Kayıtlı</span>`;
                } else {
                    unmatchedCount++;
                    statusBadge = `<button type="button" class="btn" onclick="openUnmatchedStudentsModal(${idx})" style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); font-weight:700; padding:2px 6px; border-radius:10px; font-size:10px; cursor:pointer;" title="Öğrenciyi veritabanıyla eşleştirmek için tıklayın"><i class="fas fa-exclamation-triangle me-1"></i>Eşleşmedi</button>`;
                }

                let coachBadge = '';
                const isLgsKoc = (window.koclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                const isYksKoc = (window.yksKoclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                if (isLgsKoc) {
                    coachBadge = `<span style="background:rgba(99,102,241,0.15); color:#6366f1; font-weight:800; padding:2px 6px; border-radius:10px; font-size:10px; margin-left:3px;"><i class="fas fa-brain me-1"></i>LGS Koçluk</span>`;
                    coachCount++;
                } else if (isYksKoc) {
                    coachBadge = `<span style="background:rgba(2,132,199,0.15); color:#0284c7; font-weight:800; padding:2px 6px; border-radius:10px; font-size:10px; margin-left:3px;"><i class="fas fa-graduation-cap me-1"></i>YKS Koçluk</span>`;
                    coachCount++;
                }

                const isSelected = state.selectedIndices.has(idx);
                const rowBg = m.isIgnored ? 'rgba(0,0,0,0.05)' : (isSelected ? 'transparent' : 'rgba(0,0,0,0.03)');
                const textOpacity = m.isIgnored ? '0.5' : (isSelected ? '1' : '0.45');
                const displayName = m.isIgnored ? `<del style="color:var(--text-muted);">${escapeFn(m.name || 'İsimsiz')}</del>` : escapeFn(m.name || 'İsimsiz');

                rowsHtml += `
                    <tr style="border-bottom:1px solid var(--border); font-size:11.5px; background:${rowBg}; opacity:${textOpacity};" id="wizard-row-${idx}">
                        <td style="padding:6px 8px; text-align:center;">
                            <input type="checkbox" class="wizard-row-cb" data-idx="${idx}" ${isSelected ? 'checked' : ''} onchange="toggleWizardRow(${idx}, this.checked)" style="cursor:pointer; width:15px; height:15px;">
                        </td>
                        <td style="padding:6px 8px; text-align:center; color:var(--text-muted);">${idx + 1}</td>
                        <td style="padding:6px 8px; font-weight:700;">${displayName}</td>
                        <td style="padding:6px 8px; text-align:center;">${escapeFn(m.no || '-')}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:var(--secondary);">${escapeFn(m.sinif || '-')}</td>
                        <td style="padding:6px 8px; text-align:center;">${statusBadge}${coachBadge}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#3b82f6;">${m.Turkce}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#3b82f6;">${m.Matematik}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#10b981;">${m.Fen}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#10b981;">${m.Sosyal}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#8b5cf6;">${m.DinKulturu}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:600; color:#8b5cf6;">${m.Ingilizce}</td>
                        <td style="padding:6px 8px; text-align:center; font-weight:800; background:rgba(59,130,246,0.08); color:var(--primary);">${m.totalNet}</td>
                        <td style="padding:6px 8px; text-align:center; color:var(--text-muted);">${escapeFn(m.rank)}</td>
                    </tr>
                `;
            });

            tbody.innerHTML = rowsHtml;
            updateWizardStatsAndButtons(matchedCount, unmatchedCount, ignoredCount, coachCount);
        }

        function updateWizardStatsAndButtons(matchedCount, unmatchedCount, ignoredCount, coachCount) {
            const state = window._examWizardState;
            if (!state) return;
            const total = state.rows.length;
            const selectedCount = state.selectedIndices ? state.selectedIndices.size : 0;

            const selectAllCb = document.getElementById('wizard-select-all');
            if (selectAllCb) {
                selectAllCb.checked = (selectedCount === total && total > 0);
                selectAllCb.indeterminate = (selectedCount > 0 && selectedCount < total);
            }

            const statsDiv = document.getElementById('wizard-preview-stats');
            if (statsDiv) {
                const unmatchedWarningBtn = unmatchedCount > 0 ? `
                    <button type="button" id="btn-open-unmatched-modal" class="btn" onclick="openUnmatchedStudentsModal()" 
                        style="background:#ef4444; color:white; font-size:11px; font-weight:700; padding:4px 10px; border-radius:6px; display:inline-flex; align-items:center; gap:5px; border:none; cursor:pointer; box-shadow:0 2px 6px rgba(239,68,68,0.35);">
                        <i class="fas fa-user-shield"></i> Eşleşmeyenleri Düzenle (${unmatchedCount})
                    </button>
                ` : `
                    <span style="background:rgba(34,197,94,0.15); color:#16a34a; font-weight:700; padding:3px 8px; border-radius:12px; font-size:11px; display:inline-flex; align-items:center; gap:4px;">
                        <i class="fas fa-shield-alt"></i> Tüm Kayıtlar Doğrulandı
                    </span>
                `;

                statsDiv.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <span style="font-size:12px; font-weight:700; color:var(--text-main);">
                                🔍 Tüm Öğrenciler: <strong>${total}</strong> | Seçili: <strong style="color:var(--accent); font-size:13px;">${selectedCount}</strong>
                            </span>
                            <div style="display:inline-flex; gap:4px;">
                                <button type="button" class="btn" style="font-size:10.5px; padding:3px 8px; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-weight:600;" onclick="selectAllWizardRows(true)">Tümünü Seç</button>
                                <button type="button" class="btn" style="font-size:10.5px; padding:3px 8px; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-weight:600;" onclick="selectAllWizardRows(false)">Temizle</button>
                                <button type="button" class="btn" style="font-size:10.5px; padding:3px 8px; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-weight:600;" onclick="selectWizardRowsByFilter('registered')">Kayıtlılar</button>
                                <button type="button" class="btn" style="font-size:10.5px; padding:3px 8px; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-weight:600;" onclick="selectWizardRowsByFilter('unmatched')">Eşleşmeyenler</button>
                                <button type="button" class="btn" style="font-size:10.5px; padding:3px 8px; background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-weight:600;" onclick="selectWizardRowsByFilter('coaching')">Koçluk</button>
                            </div>
                        </div>
                        <div style="display:flex; gap:6px; font-size:11.5px; align-items:center; flex-wrap:wrap;">
                            <span style="background:rgba(34,197,94,0.15); color:#16a34a; font-weight:700; padding:2px 8px; border-radius:12px;">✅ Kayıtlı: ${matchedCount}</span>
                            ${unmatchedCount > 0 ? `<span style="background:rgba(239,68,68,0.15); color:#ef4444; font-weight:700; padding:2px 8px; border-radius:12px;">❌ Eşleşmeyen: ${unmatchedCount}</span>` : ''}
                            ${ignoredCount > 0 ? `<span style="background:rgba(100,116,139,0.15); color:#64748b; font-weight:700; padding:2px 8px; border-radius:12px;">🚫 Yoksayılan: ${ignoredCount}</span>` : ''}
                            ${coachCount > 0 ? `<span style="background:rgba(99,102,241,0.15); color:#6366f1; font-weight:700; padding:2px 8px; border-radius:12px;">Koçluk: ${coachCount}</span>` : ''}
                            ${unmatchedWarningBtn}
                        </div>
                    </div>
                `;
            }

            const importBtn = document.getElementById('wizard-execute-btn');
            if (importBtn) {
                if (selectedCount > 0) {
                    if (unmatchedCount > 0) {
                        importBtn.innerHTML = `<i class="fas fa-user-shield me-1"></i> Eşleşmeyen Kayıtları İncele &amp; Aktar (${selectedCount})`;
                        importBtn.style.background = '#f59e0b';
                    } else {
                        importBtn.innerHTML = `<i class="fas fa-file-import me-1"></i> Doğrulanmış <strong>${selectedCount}</strong> Öğrenciyi Sınava Aktar`;
                        importBtn.style.background = 'var(--accent)';
                    }
                    importBtn.disabled = false;
                    importBtn.style.opacity = '1';
                    importBtn.style.cursor = 'pointer';
                } else {
                    importBtn.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i> Lütfen En Az 1 Öğrenci Seçin`;
                    importBtn.disabled = true;
                    importBtn.style.opacity = '0.5';
                    importBtn.style.cursor = 'not-allowed';
                }
            }
        }

        function toggleWizardSelectAll(checked) {
            const state = window._examWizardState;
            if (!state) return;
            selectAllWizardRows(checked);
        }
        window.toggleWizardSelectAll = toggleWizardSelectAll;

        function toggleWizardRow(idx, checked) {
            const state = window._examWizardState;
            if (!state || !state.selectedIndices) return;
            if (checked) {
                state.selectedIndices.add(idx);
            } else {
                state.selectedIndices.delete(idx);
            }
            const tr = document.getElementById(`wizard-row-${idx}`);
            if (tr) {
                tr.style.background = checked ? 'transparent' : 'rgba(0,0,0,0.03)';
                tr.style.opacity = checked ? '1' : '0.45';
            }
            updateWizardStatsAndButtonsFromDom();
        }
        window.toggleWizardRow = toggleWizardRow;

        function selectAllWizardRows(select) {
            const state = window._examWizardState;
            if (!state) return;
            if (select) {
                state.selectedIndices = new Set(state.rows.map((_, i) => i));
            } else {
                state.selectedIndices = new Set();
            }
            document.querySelectorAll('.wizard-row-cb').forEach(cb => {
                cb.checked = select;
                const idx = parseInt(cb.getAttribute('data-idx'));
                const tr = document.getElementById(`wizard-row-${idx}`);
                if (tr) {
                    tr.style.background = select ? 'transparent' : 'rgba(0,0,0,0.03)';
                    tr.style.opacity = select ? '1' : '0.45';
                }
            });
            updateWizardStatsAndButtonsFromDom();
        }
        window.selectAllWizardRows = selectAllWizardRows;

        function selectWizardRowsByFilter(filterType) {
            const state = window._examWizardState;
            if (!state) return;
            state.selectedIndices = new Set();
            state.rows.forEach((row, idx) => {
                const m = getRowVerifiedMetrics(row, idx);
                let matches = false;
                if (filterType === 'registered' && m.isRegistered && !m.isIgnored) matches = true;
                if (filterType === 'unmatched' && !m.isRegistered && !m.isIgnored) matches = true;
                if (filterType === 'coaching') {
                    const isLgsKoc = (window.koclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                    const isYksKoc = (window.yksKoclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                    if (isLgsKoc || isYksKoc) matches = true;
                }
                if (matches) state.selectedIndices.add(idx);
            });
            document.querySelectorAll('.wizard-row-cb').forEach(cb => {
                const idx = parseInt(cb.getAttribute('data-idx'));
                const isChecked = state.selectedIndices.has(idx);
                cb.checked = isChecked;
                const tr = document.getElementById(`wizard-row-${idx}`);
                if (tr) {
                    tr.style.background = isChecked ? 'transparent' : 'rgba(0,0,0,0.03)';
                    tr.style.opacity = isChecked ? '1' : '0.45';
                }
            });
            updateWizardStatsAndButtonsFromDom();
        }
        window.selectWizardRowsByFilter = selectWizardRowsByFilter;

        function updateWizardStatsAndButtonsFromDom() {
            const state = window._examWizardState;
            if (!state) return;
            let matchedCount = 0;
            let unmatchedCount = 0;
            let ignoredCount = 0;
            let coachCount = 0;

            state.rows.forEach((row, idx) => {
                const m = getRowVerifiedMetrics(row, idx);
                if (m.isIgnored) {
                    ignoredCount++;
                } else if (m.isRegistered) {
                    matchedCount++;
                } else {
                    unmatchedCount++;
                }
                const isLgsKoc = (window.koclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                const isYksKoc = (window.yksKoclukData || []).some(k => (m.no && String(k.studentNo) === String(m.no)) || (m.name && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === m.name.toLocaleLowerCase('tr-TR').trim()));
                if (isLgsKoc || isYksKoc) coachCount++;
            });
            updateWizardStatsAndButtons(matchedCount, unmatchedCount, ignoredCount, coachCount);
        }

        function populateExamStudentsDatalist() {
            const datalist = document.getElementById('exam-students-datalist');
            if (!datalist) return;
            const students = Array.isArray(window.studentData) ? window.studentData.slice() : [];
            students.sort((a, b) => {
                const sDiff = String(a.sinif || '').localeCompare(String(b.sinif || ''), 'tr-TR');
                if (sDiff !== 0) return sDiff;
                return (parseInt(a.no) || 0) - (parseInt(b.no) || 0);
            });
            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
            let opts = '';
            students.forEach(s => {
                opts += `<option value="${escapeFn(s.no)} - ${escapeFn(s.adSoyad)}">[${escapeFn(s.sinif || '-')}] No: ${escapeFn(s.no)} - ${escapeFn(s.adSoyad)}</option>`;
            });
            datalist.innerHTML = opts;
        }

        function openUnmatchedStudentsModal(focusIdx) {
            const modal = document.getElementById('exam-unmatched-modal');
            if (!modal) return;
            if (modal.parentElement !== document.body) {
                document.body.appendChild(modal);
            }
            populateExamStudentsDatalist();
            renderUnmatchedModalTable();
            modal.style.display = 'block';

            if (focusIdx !== undefined && focusIdx !== null) {
                setTimeout(() => {
                    const rowEl = document.getElementById(`unmatched-row-${focusIdx}`);
                    if (rowEl) rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const inputEl = document.getElementById(`unmatched-input-${focusIdx}`);
                    if (inputEl) inputEl.focus();
                }, 100);
            }
        }

        function closeUnmatchedStudentsModal() {
            const modal = document.getElementById('exam-unmatched-modal');
            if (modal) modal.style.display = 'none';
        }

        function renderUnmatchedModalTable() {
            const state = window._examWizardState;
            if (!state) return;
            const tbody = document.getElementById('exam-unmatched-tbody');
            if (!tbody) return;

            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

            let totalUnmatched = 0;
            let matchedCount = 0;
            let ignoredCount = 0;
            let rowsHtml = '';

            state.rows.forEach((row, idx) => {
                // Sihirbazda seçili olmayanları bu modala dahil etme
                if (state.selectedIndices && !state.selectedIndices.has(idx)) return;

                const m = getRowVerifiedMetrics(row, idx);
                const origM = window.ExamDataParser.computeRowMetrics(row, state.mapping, state.formulaType);
                if (origM.isRegistered) return; // Dosyadan otomatik tanınanları gösterme

                totalUnmatched++;
                if (m.isManualMatched) matchedCount++;
                if (m.isIgnored) ignoredCount++;

                const rawName = state.mapping.studentName ? String(row[state.mapping.studentName] || '').trim() : 'İsimsiz';
                const rawNo = state.mapping.studentNo ? String(row[state.mapping.studentNo] || '').trim() : '-';
                const rawClass = state.mapping.studentClass ? String(row[state.mapping.studentClass] || '').trim() : '-';

                let matchColHtml = '';
                let actionColHtml = '';
                let rowBg = 'transparent';

                if (m.isManualMatched && m.matchedStudent) {
                    rowBg = 'rgba(16,185,129,0.06)';
                    matchColHtml = `
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; background:rgba(16,185,129,0.12); padding:5px 8px; border-radius:6px; border:1px solid rgba(16,185,129,0.25);">
                            <span style="color:#059669; font-weight:700; font-size:12px;">
                                <i class="fas fa-check-circle me-1"></i>${escapeFn(m.matchedStudent.adSoyad)} <span style="font-weight:400; font-size:11px; color:var(--text-muted);">(No: ${escapeFn(m.matchedStudent.no)}, Sınıf: ${escapeFn(m.matchedStudent.sinif || '-')})</span>
                            </span>
                            <button type="button" class="btn" onclick="resetUnmatchedRow(${idx})" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:11px; padding:2px 4px;" title="Eşleştirmeyi İptal Et / Değiştir">
                                <i class="fas fa-times-circle"></i> Değiştir
                            </button>
                        </div>
                    `;
                    actionColHtml = `
                        <span style="background:rgba(16,185,129,0.15); color:#059669; font-weight:700; padding:3px 8px; border-radius:12px; font-size:11px; display:inline-block;">
                            <i class="fas fa-check me-1"></i>Eşleşti
                        </span>
                    `;
                } else if (m.isIgnored) {
                    rowBg = 'rgba(100,116,139,0.06)';
                    matchColHtml = `
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; background:rgba(100,116,139,0.1); padding:5px 8px; border-radius:6px; border:1px solid rgba(100,116,139,0.2);">
                            <span style="color:#64748b; font-style:italic; font-size:11.5px;">
                                <i class="fas fa-ban me-1"></i>Bu öğrenci kaydı sınava aktarılmayacak (Yoksayıldı)
                            </span>
                            <button type="button" class="btn" onclick="resetUnmatchedRow(${idx})" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:11px; padding:2px 4px;" title="Geri Al">
                                <i class="fas fa-undo"></i> Geri Al
                            </button>
                        </div>
                    `;
                    actionColHtml = `
                        <span style="background:rgba(100,116,139,0.15); color:#64748b; font-weight:700; padding:3px 8px; border-radius:12px; font-size:11px; display:inline-block;">
                            <i class="fas fa-ban me-1"></i>Atlandı
                        </span>
                    `;
                } else {
                    matchColHtml = `
                        <div style="display:flex; gap:6px; align-items:center;">
                            <input type="text" id="unmatched-input-${idx}" list="exam-students-datalist" placeholder="No veya İsim yazıp seçin..." 
                                onkeydown="if(event.key==='Enter'){event.preventDefault(); matchUnmatchedRow(${idx});}"
                                style="flex:1; padding:5px 8px; font-size:11.5px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); color:var(--text-main);">
                            <button type="button" class="btn" onclick="matchUnmatchedRow(${idx})" 
                                style="background:var(--accent); color:white; font-size:11px; font-weight:700; padding:5px 10px; border-radius:6px; border:none; cursor:pointer; white-space:nowrap;">
                                <i class="fas fa-link me-1"></i>Eşleştir
                            </button>
                        </div>
                    `;
                    actionColHtml = `
                        <button type="button" class="btn" onclick="ignoreUnmatchedRow(${idx})" 
                            style="background:rgba(239,68,68,0.1); color:#ef4444; border:1px solid rgba(239,68,68,0.25); font-size:11px; font-weight:600; padding:4px 8px; border-radius:6px; cursor:pointer;" title="Bu kaydı içe aktarma">
                            <i class="fas fa-ban me-1"></i>Yoksay
                        </button>
                    `;
                }

                rowsHtml += `
                    <tr style="border-bottom:1px solid var(--border); background:${rowBg}; font-size:11.5px;" id="unmatched-row-${idx}" data-search="${escapeFn(rawName + ' ' + rawNo + ' ' + rawClass).toLowerCase()}">
                        <td style="padding:7px 8px; text-align:center; color:var(--text-muted);">${idx + 1}</td>
                        <td style="padding:7px 8px; font-weight:700;">${escapeFn(rawName)}</td>
                        <td style="padding:7px 8px; text-align:center;"><span style="background:var(--tab-bg); padding:2px 6px; border-radius:4px; font-weight:600;">${escapeFn(rawNo)}</span></td>
                        <td style="padding:7px 8px; text-align:center; color:var(--secondary); font-weight:600;">${escapeFn(rawClass)}</td>
                        <td style="padding:7px 8px; text-align:center; font-weight:700;">${m.totalNet} <span style="font-weight:400; color:var(--text-muted); font-size:10px;">(#${escapeFn(m.rank)})</span></td>
                        <td style="padding:7px 8px;">${matchColHtml}</td>
                        <td style="padding:7px 8px; text-align:center;">${actionColHtml}</td>
                    </tr>
                `;
            });

            tbody.innerHTML = rowsHtml || `<tr><td colspan="7" style="padding:24px; text-align:center; color:var(--text-muted);"><i class="fas fa-check-circle" style="color:#10b981; font-size:24px; margin-bottom:8px; display:block;"></i>Tüm öğrenciler veritabanı ile eşleştirildi veya yoksayıldı.</td></tr>`;

            const totalEl = document.getElementById('unmatched-modal-total-count');
            const matchedEl = document.getElementById('unmatched-modal-matched-count');
            const ignoredEl = document.getElementById('unmatched-modal-ignored-count');
            if (totalEl) totalEl.textContent = totalUnmatched;
            if (matchedEl) matchedEl.textContent = matchedCount;
            if (ignoredEl) ignoredEl.textContent = ignoredCount;
        }

        function matchUnmatchedRow(idx) {
            const state = window._examWizardState;
            if (!state) return;
            const inputEl = document.getElementById(`unmatched-input-${idx}`);
            if (!inputEl) return;
            const rawVal = inputEl.value.trim();
            if (!rawVal) {
                alert("Lütfen eşleştirmek istediğiniz öğrencinin numarasını veya adını giriniz / seçiniz.");
                inputEl.focus();
                return;
            }

            const students = Array.isArray(window.studentData) ? window.studentData : [];
            let matched = null;

            // 1. Öğrenci No tam eşleşme (örn: "123")
            matched = students.find(s => String(s.no).trim() === rawVal);

            // 2. Datalist formatı: "123 - Ad Soyad"
            if (!matched && rawVal.includes('-')) {
                const possibleNo = rawVal.split('-')[0].trim();
                matched = students.find(s => String(s.no).trim() === possibleNo);
            }

            // 3. Ad Soyad tam eşleşme (Türkçe karakter duyarsız)
            if (!matched) {
                const cleanInput = rawVal.toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşıöç]/gi, '').trim();
                matched = students.find(s => {
                    const cleanName = (s.adSoyad || '').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9ğüşıöç]/gi, '').trim();
                    return cleanName === cleanInput;
                });
            }

            // 4. İsim / No içeren tekil aday araması
            if (!matched) {
                const searchLower = rawVal.toLocaleLowerCase('tr-TR').trim();
                const candidates = students.filter(s => {
                    const sName = (s.adSoyad || '').toLocaleLowerCase('tr-TR');
                    const sNo = String(s.no || '');
                    return sName.includes(searchLower) || sNo === searchLower;
                });
                if (candidates.length === 1) {
                    matched = candidates[0];
                }
            }

            if (!matched) {
                alert(`❌ "${rawVal}" bilgisi ile sistemde kayıtlı bir öğrenci bulunamadı!\n\nLütfen mevcut öğrenci veritabanından geçerli bir öğrenci numarası veya ismi seçiniz.`);
                inputEl.focus();
                return;
            }

            if (!state.manualOverrides) state.manualOverrides = {};
            state.manualOverrides[idx] = {
                status: 'matched',
                student: matched
            };

            renderUnmatchedModalTable();
            renderWizardPreviewTable();

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`✅ <strong>${matched.adSoyad}</strong> (No: ${matched.no}) ile başarıyla eşleştirildi.`, 'success');
            }
        }

        function ignoreUnmatchedRow(idx) {
            const state = window._examWizardState;
            if (!state) return;
            if (!state.manualOverrides) state.manualOverrides = {};
            state.manualOverrides[idx] = { status: 'ignored' };
            renderUnmatchedModalTable();
            renderWizardPreviewTable();
        }

        function resetUnmatchedRow(idx) {
            const state = window._examWizardState;
            if (!state) return;
            if (state.manualOverrides) {
                delete state.manualOverrides[idx];
            }
            renderUnmatchedModalTable();
            renderWizardPreviewTable();
        }

        function ignoreAllRemainingUnmatched() {
            const state = window._examWizardState;
            if (!state) return;
            if (!state.manualOverrides) state.manualOverrides = {};

            let count = 0;
            state.rows.forEach((row, idx) => {
                const origM = window.ExamDataParser.computeRowMetrics(row, state.mapping, state.formulaType);
                if (!origM.isRegistered) {
                    if (!state.manualOverrides[idx] || state.manualOverrides[idx].status !== 'matched') {
                        state.manualOverrides[idx] = { status: 'ignored' };
                        count++;
                    }
                }
            });

            renderUnmatchedModalTable();
            renderWizardPreviewTable();

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`Kalan <strong>${count}</strong> adet eşleşmeyen kayıt yoksayıldı.`, 'info');
            }
        }

        function filterUnmatchedModalTable() {
            const input = document.getElementById('unmatched-modal-search');
            if (!input) return;
            const q = input.value.toLocaleLowerCase('tr-TR').trim();
            const rows = document.querySelectorAll('#exam-unmatched-tbody tr[data-search]');
            rows.forEach(tr => {
                const searchData = tr.getAttribute('data-search') || '';
                tr.style.display = (!q || searchData.includes(q)) ? '' : 'none';
            });
        }

        function commitVerifiedExamImport() {
            const state = window._examWizardState;
            if (!state) return;

            // Kontrol: Hala bekleyen (ne eşleşmiş ne yoksayılmış) kayıt var mı?
            const pendingIndices = [];
            state.rows.forEach((row, idx) => {
                if (state.selectedIndices && !state.selectedIndices.has(idx)) return;
                const m = getRowVerifiedMetrics(row, idx);
                if (!m.isRegistered && !m.isIgnored) {
                    pendingIndices.push(idx);
                }
            });

            if (pendingIndices.length > 0) {
                const ok = confirm(
                    `Hala eşleştirilmemiş ${pendingIndices.length} adet öğrenci kaydı bulunmaktadır.\n\n` +
                    `Bu kayıtlar sınav sonuçlarına DAHİL EDİLMEYECEK ve veri tabanına yazılmayacaktır.\n\n` +
                    `Kalanları atlayarak sadece doğrulanmış öğrencileri aktarmak istiyor musunuz?`
                );
                if (!ok) return;

                pendingIndices.forEach(idx => {
                    state.manualOverrides[idx] = { status: 'ignored' };
                });
            }

            closeUnmatchedStudentsModal();
            executeExamImport();
        }

        function executeExamImport() {
            const state = window._examWizardState;
            if (!state) return;

            if (!state.mapping.studentName || state.mapping.studentName === "") {
                return alert("Lütfen en azından 'Ad Soyad' sütununu seçiniz!");
            }
            if (!state.selectedIndices || state.selectedIndices.size === 0) {
                return alert("Lütfen sınava aktarmak için en az bir öğrenci seçiniz!");
            }

            // 1. DOĞRULAMA & AYRIŞTIRMA (Pre-validation Partition)
            const validMatches = [];
            const unmatchedRecords = [];
            let ignoredCount = 0;

            state.rows.forEach((row, idx) => {
                if (!state.selectedIndices.has(idx)) return;
                const m = getRowVerifiedMetrics(row, idx);
                if (m.isIgnored) {
                    ignoredCount++;
                    return;
                }
                if (m.isRegistered && m.matchedStudent) {
                    validMatches.push({
                        rowIdx: idx,
                        metrics: m,
                        matchedStudent: m.matchedStudent
                    });
                } else {
                    unmatchedRecords.push({
                        rowIdx: idx,
                        metrics: m,
                        rawRow: row
                    });
                }
            });

            // 2. KATI DOĞRULAMA KONTROLÜ
            // Eşleşmeyen kayıt varsa ASLA otomatik kaydetme! İşlemi durdur ve modalı aç.
            if (unmatchedRecords.length > 0) {
                alert(
                    `⚠️ DİKKAT: Veritabanında karşılığı bulunamayan ${unmatchedRecords.length} adet öğrenci kaydı var!\n\n` +
                    `Güvenlik kuralı: Sistemde kayıtlı olmayan hiçbir öğrenci veritabanına doğrudan yazılamaz.\n` +
                    `Lütfen açılan pencereden bu öğrencileri eşleştiriniz veya "Yoksay" seçeneğiyle eleyiniz.`
                );
                openUnmatchedStudentsModal();
                return;
            }

            if (validMatches.length === 0) {
                return alert("Aktarılacak geçerli/doğrulanmış öğrenci kaydı bulunamadı.");
            }

            // 3. VERİTABANI KAYIT AŞAMASI (Commit Phase)
            commitExamImport(validMatches, ignoredCount);
        }

        function commitExamImport(validMatches, skippedCount) {
            const state = window._examWizardState;
            if (!state) return;

            let targetExam = null;
            const detectedClassesSet = new Set();

            if (state.targetExamId === 'NEW') {
                const titleInput = document.getElementById('wizard-new-exam-title');
                const dateInput = document.getElementById('wizard-new-exam-date');
                const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : state.newExamTitle;
                const date = (dateInput && dateInput.value) ? dateInput.value : state.newExamDate;

                if (!title) return alert("Lütfen yeni sınav için bir başlık giriniz.");

                targetExam = {
                    id: Date.now(),
                    title: title,
                    date: date,
                    classes: [],
                    results: {}
                };
                examData.push(targetExam);
                window.examData = examData;
            } else {
                targetExam = examData.find(e => String(e.id) === String(state.targetExamId));
                if (!targetExam) return alert("Hedef sınav bulunamadı.");
                if (!targetExam.results) targetExam.results = {};
            }

            let importedCount = 0;

            validMatches.forEach(item => {
                const m = item.metrics;
                const student = item.matchedStudent;
                const studentKey = student.adSoyad; // Doğrulanmış öğrenci anahtarı
                const studentSinif = student.sinif || m.sinif || "";

                if (studentSinif && studentSinif.trim() !== '') {
                    detectedClassesSet.add(studentSinif.trim());
                }

                targetExam.results[studentKey] = {
                    no: student.no || m.no || "",
                    sinif: studentSinif,
                    Turkce: m.Turkce,
                    Matematik: m.Matematik,
                    Sosyal: m.Sosyal,
                    Fen: m.Fen,
                    DinKulturu: m.DinKulturu,
                    Ingilizce: m.Ingilizce,
                    totalNet: m.totalNet,
                    rank: m.rank || "-"
                };
                importedCount++;
            });

            // Yeni sınav oluşturulduysa tespit edilen sınıfları ekle
            if (state.targetExamId === 'NEW') {
                const detectedArr = Array.from(detectedClassesSet);
                targetExam.classes = detectedArr.length > 0 ? detectedArr : ['Tüm Sınıflar'];
            }

            // Veritabanına ve yerel depolamaya anında kaydet
            if (typeof saveLocalData === 'function') saveLocalData();
            if (typeof saveData === 'function') saveData(true);

            // Koçluk bölümüne otomatik aktar
            syncAllExamsToKocluk(true);

            closeExamImportWizard();
            renderExams();
            updateExamUploadDropdowns();

            // Özet bildirim raporu
            const reportMsg = skippedCount > 0
                ? `🎯 <strong>${importedCount}</strong> adet kayıt başarıyla işlendi, <strong>${skippedCount}</strong> adet eşleşmeyen kayıt atlandı.`
                : `🎯 <strong>${importedCount}</strong> adet kayıt başarıyla işlendi.`;

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(reportMsg, 'success');
            } else {
                alert(reportMsg.replace(/<[^>]+>/g, ''));
            }

            // Değerlendirme modalını aç
            openExamEvaluation(targetExam.id);
        }

        // Geriye dönük uyumluluk wrapper fonksiyonları
        function handleExamExcelData(input) {
            const file = input && input.files ? input.files[0] : null;
            if (file) openExamImportWizard(file);
        }
        function buildMappingInterface() { }
        function processMappedExcel() { }

        function updateExamMeta(id, field, value) {
            const exam = (examData || []).find(e => String(e.id) === String(id));
            if (!exam) return;
            const val = String(value || '').trim();
            if (field === 'title' && val) {
                exam.title = val;
                const titleDisp = document.getElementById('eval-title-display');
                if (titleDisp) titleDisp.innerHTML = `<i class="fas fa-edit me-1" style="color:var(--teal);"></i> ${val} - Ortak Sınav Sonuç Tablosu`;
            } else if (field === 'date' && val) {
                exam.date = val;
            }
            updateExamTitleInCoaching(id, exam.title, exam.date);
            saveData();
            renderExams();
        }
        window.updateExamMeta = updateExamMeta;

        function saveExamMeta(id) {
            const titleInput = document.getElementById('eval-exam-title-input');
            const dateInput = document.getElementById('eval-exam-date-input');
            const exam = (examData || []).find(e => String(e.id) === String(id));
            if (!exam) return;
            if (titleInput && titleInput.value.trim()) exam.title = titleInput.value.trim();
            if (dateInput && dateInput.value) exam.date = dateInput.value;

            updateExamTitleInCoaching(id, exam.title, exam.date);
            if (typeof saveLocalData === 'function') saveLocalData();
            if (typeof saveData === 'function') saveData(true);
            renderExams();
            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`"${exam.title}" sınav adı ve tarihi başarıyla kaydedildi.`, 'success');
            }
        }
        window.saveExamMeta = saveExamMeta;

        function updateExamTitleInCoaching(examId, newTitle, newDate) {
            if (Array.isArray(window.koclukData)) {
                window.koclukData.forEach(k => {
                    if (Array.isArray(k.denemeler)) {
                        k.denemeler.forEach(d => {
                            if (String(d.examId) === String(examId) || d.id === 'den_exam_' + examId) {
                                if (newTitle) d.ad = newTitle;
                                if (newDate) d.tarih = newDate;
                            }
                        });
                    }
                });
            }
            if (Array.isArray(window.yksKoclukData)) {
                window.yksKoclukData.forEach(k => {
                    if (Array.isArray(k.denemeler)) {
                        k.denemeler.forEach(d => {
                            if (String(d.examId) === String(examId) || d.id === 'den_exam_' + examId) {
                                if (newTitle) d.ad = newTitle;
                                if (newDate) d.tarih = newDate;
                            }
                        });
                    }
                });
            }
        }
        window.updateExamTitleInCoaching = updateExamTitleInCoaching;

        let currentExamSort = {
            field: 'sinif',
            direction: 'asc'
        };

        function getExamSortIcon(field) {
            if (currentExamSort.field === field) {
                return currentExamSort.direction === 'asc'
                    ? `<i class="fas fa-sort-up ms-1" style="color:var(--secondary); font-size:12px;"></i>`
                    : `<i class="fas fa-sort-down ms-1" style="color:var(--secondary); font-size:12px;"></i>`;
            }
            return `<i class="fas fa-sort ms-1" style="opacity:0.3; font-size:10px;"></i>`;
        }

        function sortExamEvaluationTable(field) {
            if (currentExamSort.field === field) {
                currentExamSort.direction = (currentExamSort.direction === 'asc' ? 'desc' : 'asc');
            } else {
                currentExamSort.field = field;
                currentExamSort.direction = (['Turkce', 'Matematik', 'Sosyal', 'Fen', 'DinKulturu', 'Ingilizce', 'totalNet'].includes(field) ? 'desc' : 'asc');
            }
            openExamEvaluation(activeExamId);
        }
        window.sortExamEvaluationTable = sortExamEvaluationTable;

        function editExamColumnHeader(field) {
            const exam = (examData || []).find(e => String(e.id) === String(activeExamId));
            if (!exam) return;
            exam.columnLabels = exam.columnLabels || {
                Turkce: 'TR', Matematik: 'MAT', Sosyal: 'SOS', Fen: 'FEN', DinKulturu: 'DİN', Ingilizce: 'İNG'
            };
            const cur = exam.columnLabels[field] || field;
            const newVal = prompt(`"${cur}" sütunu için yeni başlık giriniz (Örn: EDEBİYAT, FİZİK, TARİH vb.):`, cur);
            if (newVal !== null && newVal.trim() !== '') {
                exam.columnLabels[field] = newVal.trim().toUpperCase();
                if (typeof saveData === 'function') saveData(true);
                openExamEvaluation(activeExamId);
            }
        }
        window.editExamColumnHeader = editExamColumnHeader;

        function autoAssignExamRanks(examId) {
            const exam = (examData || []).find(e => String(e.id) === String(examId || activeExamId));
            if (!exam || !exam.results) return;
            const sorted = Object.keys(exam.results).map(name => ({
                name,
                net: parseFloat(exam.results[name].totalNet) || 0
            })).sort((a, b) => b.net - a.net);

            let currentRank = 1;
            sorted.forEach((item, index) => {
                if (index > 0 && item.net < sorted[index - 1].net) {
                    currentRank = index + 1;
                }
                exam.results[item.name].rank = currentRank;
            });

            if (typeof saveData === 'function') saveData(true);
            if (typeof showGlobalToast === 'function') {
                showGlobalToast('🏆 Tüm öğrencilerin sıraları (dereceleri) toplam netlerine göre otomatik hesaplandı.', 'success');
            }
            openExamEvaluation(exam.id);
        }
        window.autoAssignExamRanks = autoAssignExamRanks;

        function openEditExamHeadersModal(examId) {
            const exam = (examData || []).find(e => String(e.id) === String(examId || activeExamId));
            if (!exam) return;
            exam.columnLabels = exam.columnLabels || {
                Turkce: 'TR', Matematik: 'MAT', Sosyal: 'SOS', Fen: 'FEN', DinKulturu: 'DİN', Ingilizce: 'İNG'
            };
            const currentStr = `${exam.columnLabels.Turkce},${exam.columnLabels.Matematik},${exam.columnLabels.Sosyal},${exam.columnLabels.Fen},${exam.columnLabels.DinKulturu},${exam.columnLabels.Ingilizce}`;
            const res = prompt(
                "Ders sütun başlıklarını virgülle ayırarak güncelleyebilirsiniz:\n(Sıra: Türkçe, Matematik, Sosyal, Fen, Din, İngilizce)\nÖrn YKS için: EDEBİYAT, MAT, TARİH, FİZİK, FELSEFE, DİL",
                currentStr
            );
            if (res !== null && res.trim() !== '') {
                const parts = res.split(',').map(p => p.trim());
                if (parts[0]) exam.columnLabels.Turkce = parts[0].toUpperCase();
                if (parts[1]) exam.columnLabels.Matematik = parts[1].toUpperCase();
                if (parts[2]) exam.columnLabels.Sosyal = parts[2].toUpperCase();
                if (parts[3]) exam.columnLabels.Fen = parts[3].toUpperCase();
                if (parts[4]) exam.columnLabels.DinKulturu = parts[4].toUpperCase();
                if (parts[5]) exam.columnLabels.Ingilizce = parts[5].toUpperCase();
                if (typeof saveData === 'function') saveData(true);
                openExamEvaluation(activeExamId);
            }
        }
        window.openEditExamHeadersModal = openEditExamHeadersModal;

        function closeEvaluation() {
            const modal = document.getElementById('evaluation-modal');
            if (modal) modal.style.display = 'none';
            activeTrackingId = null;
            activeExamId = null;
            const finishBtn = document.getElementById('finish-evaluation-btn');
            if (finishBtn) finishBtn.style.display = 'inline-block';
            if (typeof saveData === 'function') saveData(true);
        }
        window.closeEvaluation = closeEvaluation;

        function openExamEvaluation(id) {
            activeExamId = id; activeTrackingId = null; 
            const exam = (examData || []).find(e => String(e.id) === String(id));
            if (!exam) return;

            // 1. Görseldeki 'Değerlendirmeyi Bitir (Ödevi Eski Ödevlere Al)' butonunu sınav ekranında gizle
            const finishBtn = document.getElementById('finish-evaluation-btn');
            if (finishBtn) finishBtn.style.display = 'none';

            // Öğrenci ana listesi (1. Öğrenci Listesi havuzu)
            const masterList = Array.isArray(window.studentData) ? window.studentData : [];
            const studentMap = new Map();

            // Sınav sonuçlarındaki tüm öğrencileri topla ve studentData ile eşleştir
            if (exam.results && typeof exam.results === 'object') {
                Object.keys(exam.results).forEach(sName => {
                    const r = exam.results[sName];
                    const rawNo = String(r.no || '').trim();
                    const cleanName = String(sName || '').trim().toLocaleLowerCase('tr-TR');

                    // 1. Numara doğruysa masterList'ten eşleştir
                    let matchedSt = null;
                    if (rawNo && rawNo !== '0' && rawNo !== '-') {
                        matchedSt = masterList.find(st => String(st.no || '').trim() === rawNo);
                    }
                    // 2. Numara ile bulunamadıysa isim ile eşleştir
                    if (!matchedSt && cleanName) {
                        matchedSt = masterList.find(st => String(st.adSoyad || '').trim().toLocaleLowerCase('tr-TR') === cleanName);
                    }

                    // Numara doğruysa sınıfı otomatik getir, yoksa mevcut sınıfı koru
                    let resolvedSinif = r.sinif || '';
                    let resolvedNo = r.no || '';
                    if (matchedSt) {
                        if (matchedSt.sinif) resolvedSinif = matchedSt.sinif;
                        if (matchedSt.no) resolvedNo = matchedSt.no;
                        // Sınav kaydını da kalıcı olarak düzeltilmiş sınıf ve numarayla güncelle
                        r.sinif = resolvedSinif;
                        r.no = resolvedNo;
                    }

                    studentMap.set(sName, {
                        no: resolvedNo,
                        adSoyad: sName,
                        sinif: resolvedSinif || 'Genel',
                        isMatched: !!matchedSt
                    });
                });
            }

            // Sınavın dahil sınıflarındaki henüz sonuç girilmemiş öğrencileri de ekle
            const examClasses = exam.classes || (exam.sinif ? [exam.sinif] : []);
            const excludedList = Array.isArray(exam.excludedStudents) ? exam.excludedStudents : [];
            masterList.filter(s => examClasses.includes(s.sinif)).forEach(s => {
                if (!studentMap.has(s.adSoyad) && !excludedList.includes(s.adSoyad)) {
                    studentMap.set(s.adSoyad, {
                        no: s.no || '',
                        adSoyad: s.adSoyad,
                        sinif: s.sinif || 'Genel',
                        isMatched: true
                    });
                }
            });

            // Sınavdan daha önce silinmiş (hariç tutulmuş) öğrencileri temizle
            excludedList.forEach(exName => {
                studentMap.delete(exName);
            });

            const allStudents = Array.from(studentMap.values()).filter(s => !excludedList.includes(s.adSoyad));

            // Dahil sınıfları gerçek öğrenci sınıflarına göre güncelle
            const actualClasses = Array.from(new Set(allStudents.map(s => s.sinif).filter(c => c && c !== 'Genel'))).sort();
            if (actualClasses.length > 0) {
                exam.classes = actualClasses;
            }

            const escapeFn = window.escapeHTML || function (s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
            const formattedDate = exam.date ? exam.date.split('T')[0] : '';

            // Sütun başlıkları
            exam.columnLabels = exam.columnLabels || {
                Turkce: 'TR', Matematik: 'MAT', Sosyal: 'SOS', Fen: 'FEN', DinKulturu: 'DİN', Ingilizce: 'İNG'
            };
            const colL = exam.columnLabels;

            document.getElementById('eval-title').innerHTML = `
                <span id="eval-title-display"><i class="fas fa-edit me-1" style="color:var(--teal);"></i> ${escapeFn(exam.title)} - Ortak Sınav Sonuç Tablosu</span>
            `;
            document.getElementById('eval-info').innerHTML = `
                <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:10px; padding:12px 14px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:8px;">
                        <div style="display:flex; gap:12px; align-items:center; flex:1; min-width:280px; flex-wrap:wrap;">
                            <div style="flex:2; min-width:180px;">
                                <label style="font-size:11px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:3px;">Sınav Adı / Başlık:</label>
                                <input type="text" id="eval-exam-title-input" value="${escapeFn(exam.title)}" 
                                    onchange="updateExamMeta('${exam.id}', 'title', this.value)"
                                    style="width:100%; padding:6px 10px; border-radius:6px; border:1px solid var(--border); font-size:13px; font-weight:700; color:var(--text-main); background:var(--card-bg);">
                            </div>
                            <div style="flex:1; min-width:130px;">
                                <label style="font-size:11px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:3px;">Sınav Tarihi:</label>
                                <input type="date" id="eval-exam-date-input" value="${formattedDate}" 
                                    onchange="updateExamMeta('${exam.id}', 'date', this.value)"
                                    style="width:100%; padding:6px 8px; border-radius:6px; border:1px solid var(--border); font-size:12px; font-weight:600; color:var(--text-main); background:var(--card-bg);">
                            </div>
                        </div>
                        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                            <button class="btn btn-danger" id="btn-delete-selected-exam-students" onclick="deleteSelectedStudentsFromExam('${exam.id}')" style="background:#ef4444; color:#fff; font-size:11px; padding:7px 12px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; gap:5px; opacity:0.65; cursor:pointer;" title="İşaretlenen öğrencileri bu sınavdan siler">
                                <i class="fas fa-trash-alt"></i> Seçilenleri Sil (<span id="exam-selected-count">0</span>)
                            </button>
                            <button class="btn" onclick="saveExamMeta('${exam.id}')" style="background:var(--teal); color:#fff; font-size:11px; padding:7px 12px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; gap:5px;">
                                <i class="fas fa-save"></i> Başlık &amp; Tarihi Kaydet
                            </button>
                            <button class="btn" onclick="openEditExamHeadersModal('${exam.id}')" style="background:rgba(99,102,241,0.12); color:#4f46e5; border:1px solid rgba(99,102,241,0.3); font-size:11px; padding:7px 12px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; gap:5px;" title="Ders sütun başlıklarını (TR, MAT, SOS vb.) değiştir">
                                <i class="fas fa-columns"></i> Sütun Başlıklarını Düzenle
                            </button>
                            <button class="btn" onclick="autoAssignExamRanks('${exam.id}')" style="background:rgba(16,185,129,0.15); color:#059669; border:1px solid rgba(16,185,129,0.3); font-size:11px; padding:7px 12px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; gap:5px;" title="Öğrenci sıralarını nete göre otomatik ata">
                                <i class="fas fa-sort-numeric-down"></i> Sıraları Otomatik Hesapla
                            </button>
                            <button class="btn" onclick="syncAllExamsToKocluk(false)" style="background:var(--secondary); color:#fff; font-size:11px; padding:7px 12px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; gap:5px;" title="8. Sınav Analiz verilerini LGS ve YKS Koçluk bölümlerine aktarır">
                                <i class="fas fa-sync-alt"></i> Koçluk Verilerini Eşitle
                            </button>
                        </div>
                    </div>
                    <div style="font-size:11.5px; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-top:1px dashed var(--border); padding-top:6px; margin-top:4px;">
                        <span>Dahil Sınıflar: <strong>${escapeFn(exam.classes.join(', ') || 'Tümü')}</strong> | Toplam Öğrenci: <strong>${allStudents.length}</strong></span>
                        <span style="color:var(--secondary); font-weight:600;"><i class="fas fa-info-circle me-1"></i>Sütun başlıklarına tıklayarak sıralayabilir, öğrenci seçip toplu veya tekil silebilirsiniz.</span>
                    </div>
                </div>
            `;

            // Tablo Başlıkları (Sıralanabilir ve Değiştirilebilir)
            document.querySelector('#evaluation-modal thead tr').innerHTML = `
                <th style="width:36px; text-align:center; padding:8px;">
                    <input type="checkbox" id="exam-select-all" onclick="toggleAllExamStudentCheckboxes(this)" title="Tümünü Seç / Seçimi Kaldır" style="cursor:pointer; transform:scale(1.15);">
                </th>
                <th style="cursor:pointer; user-select:none; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('ogrenci')" title="Öğrenciye göre sıralamak için tıklayın">
                    ÖĞRENCİ &amp; EŞLEŞME ${getExamSortIcon('ogrenci')}
                </th>
                <th style="cursor:pointer; user-select:none; width:75px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('sinif')" title="Sınıfa göre sıralamak için tıklayın">
                    SINIF ${getExamSortIcon('sinif')}
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('Turkce')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.Turkce)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('Turkce');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('Turkce')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('Matematik')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.Matematik)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('Matematik');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('Matematik')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('Sosyal')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.Sosyal)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('Sosyal');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('Sosyal')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('Fen')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.Fen)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('Fen');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('Fen')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('DinKulturu')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.DinKulturu)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('DinKulturu');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('DinKulturu')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:62px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('Ingilizce')" title="Sıralamak için tıklayın, başlığı değiştirmek için kaleme tıklayın">
                    <div style="display:flex; align-items:center; justify-content:center; gap:2px;">
                        <span>${escapeFn(colL.Ingilizce)}</span>
                        <span onclick="event.stopPropagation(); editExamColumnHeader('Ingilizce');" title="Başlığı Değiştir" style="font-size:9.5px; opacity:0.55; padding:1px 2px;"><i class="fas fa-pen"></i></span>
                        ${getExamSortIcon('Ingilizce')}
                    </div>
                </th>
                <th style="cursor:pointer; user-select:none; width:75px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('totalNet')" title="Toplam Nete göre sıralamak için tıklayın">
                    TOP.NET ${getExamSortIcon('totalNet')}
                </th>
                <th style="cursor:pointer; user-select:none; width:55px; text-align:center; white-space:nowrap; padding:8px;" onclick="sortExamEvaluationTable('rank')" title="Derece / Sıraya göre sıralamak için tıklayın">
                    SIRA ${getExamSortIcon('rank')}
                </th>
                <th style="width:115px; text-align:center; padding:8px;">İŞLEM</th>
            `;

            // Datalist oluştur: Sistemdeki tüm kayıtlı sınıflar
            const classOptionsHtml = Array.from(new Set(masterList.map(st => st.sinif).filter(Boolean))).sort().map(c => `<option value="${escapeFn(c)}">`).join('');
            let datalistEl = document.getElementById('exam-class-options');
            if (!datalistEl) {
                datalistEl = document.createElement('datalist');
                datalistEl.id = 'exam-class-options';
                document.body.appendChild(datalistEl);
            }
            datalistEl.innerHTML = classOptionsHtml;

            // Sıralama motoru
            const getSortVal = (s, fld) => {
                const r = (exam.results && exam.results[s.adSoyad]) || {};
                if (fld === 'ogrenci') {
                    const noNum = parseInt(s.no) || 0;
                    return noNum > 0 ? noNum : (s.adSoyad || '');
                }
                if (fld === 'sinif') {
                    return (s.sinif || r.sinif || '').toUpperCase();
                }
                if (fld === 'rank') {
                    const val = parseInt(r.rank);
                    return isNaN(val) ? 999999 : val;
                }
                if (fld === 'totalNet') {
                    const val = parseFloat(r.totalNet);
                    return isNaN(val) ? -9999 : val;
                }
                if (['Turkce', 'Matematik', 'Sosyal', 'Fen', 'DinKulturu', 'Ingilizce'].includes(fld)) {
                    const val = parseFloat(r[fld]);
                    return isNaN(val) ? -9999 : val;
                }
                return 0;
            };

            allStudents.sort((a, b) => {
                const valA = getSortVal(a, currentExamSort.field);
                const valB = getSortVal(b, currentExamSort.field);
                let comp = 0;
                if (typeof valA === 'string' || typeof valB === 'string') {
                    comp = String(valA).localeCompare(String(valB), 'tr', { numeric: true, sensitivity: 'base' });
                } else {
                    comp = valA - valB;
                }
                return currentExamSort.direction === 'asc' ? comp : -comp;
            });

            const body = document.getElementById('eval-body'); 
            body.innerHTML = '';

            allStudents.forEach(s => {
                const res = exam.results[s.adSoyad] || { Turkce: '', Matematik: '', Sosyal: '', Fen: '', DinKulturu: '', Ingilizce: '', totalNet: '', rank: '' };
                const safeName = escapeFn(s.adSoyad);
                const safeNo = s.no ? escapeFn(s.no) : '';
                const safeSinif = escapeFn(s.sinif || '-');
                const attrSafeName = (s.adSoyad || '').replace(/"/g, '&quot;');
                const jsSafeName = (s.adSoyad || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                const safeTotalId = 'total-' + encodeURIComponent(s.adSoyad || '').replace(/%/g, '_');

                // Koçluk durumu rozeti
                let koclukBadge = '';
                const isLgsKoc = (window.koclukData || []).some(k => String(k.studentNo) === String(s.no) || (s.adSoyad && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === s.adSoyad.toLocaleLowerCase('tr-TR').trim()));
                const isYksKoc = (window.yksKoclukData || []).some(k => String(k.studentNo) === String(s.no) || (s.adSoyad && k.adSoyad.toLocaleLowerCase('tr-TR').trim() === s.adSoyad.toLocaleLowerCase('tr-TR').trim()));
                if (isLgsKoc) {
                    koclukBadge = `<span style="background:rgba(99,102,241,0.12); color:#6366f1; border:1px solid rgba(99,102,241,0.3); font-size:10px; font-weight:800; padding:1px 5px; border-radius:4px; margin-left:6px;" title="13. LGS Bilişsel Koçluk Takibinde (Girişler koçluğa anında yansır)"><i class="fas fa-brain me-1"></i>LGS Koçluk</span>`;
                } else if (isYksKoc) {
                    koclukBadge = `<span style="background:rgba(2,132,199,0.12); color:#0284c7; border:1px solid rgba(2,132,199,0.3); font-size:10px; font-weight:800; padding:1px 5px; border-radius:4px; margin-left:6px;" title="14. YKS Bilişsel Koçluk Takibinde (Girişler koçluğa anında yansır)"><i class="fas fa-graduation-cap me-1"></i>YKS Koçluk</span>`;
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="text-align:center; padding:6px 4px;">
                        <input type="checkbox" class="exam-student-checkbox" value="${attrSafeName}" onchange="updateExamSelectedCount()" style="cursor:pointer; transform:scale(1.15);">
                    </td>
                    <td style="font-weight:600; font-size:13px; white-space:nowrap;">
                        <input type="text" class="exam-input" data-name="${attrSafeName}" data-field="no" value="${safeNo}" placeholder="No" style="width:48px; text-align:center; padding:3px 5px; font-weight:700; font-size:12px; border:1px solid var(--border); border-radius:4px; margin-right:6px;" onfocus="this.select()" onchange="updateManualExamCell(this)" title="Öğrenci Numarası (Değiştirilirse sınıf otomatik eşleşir)">
                        ${safeName}${koclukBadge}
                    </td>
                    <td style="text-align:center; padding:4px;">
                        <input type="text" class="exam-input exam-sinif-input" data-name="${attrSafeName}" data-field="sinif" value="${safeSinif}" list="exam-class-options" style="width:58px; text-align:center; padding:4px; font-weight:700; color:var(--secondary); border:1px solid var(--border); border-radius:4px; background:var(--card-bg);" onfocus="this.select()" onchange="updateManualExamCell(this)" title="Sınıfı düzenleyebilirsiniz">
                    </td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="Turkce" value="${res.Turkce}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="Matematik" value="${res.Matematik}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="Sosyal" value="${res.Sosyal}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="Fen" value="${res.Fen}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="DinKulturu" value="${res.DinKulturu || ''}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" class="exam-input" data-name="${attrSafeName}" data-field="Ingilizce" value="${res.Ingilizce || ''}" style="width:44px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);" onfocus="this.select()" onchange="updateManualExamCell(this)"></td>
                    <td><input type="number" step="0.01" id="${safeTotalId}" class="exam-input" data-name="${attrSafeName}" data-field="totalNet" value="${res.totalNet}" style="width:58px; padding:4px; font-weight:800; color:var(--primary); text-align:center; border:1px solid var(--border); border-radius:4px; background:var(--tab-bg);" onfocus="this.select()" onchange="updateManualExamCell(this)" title="Toplam Net (Değiştirebilirsiniz veya ders netlerinden otomatik hesaplanır)"></td>
                    <td><input type="text" class="exam-input" data-name="${attrSafeName}" data-field="rank" value="${res.rank}" style="width:42px; padding:4px; text-align:center; font-weight:700; border:1px solid var(--border); border-radius:4px;" onfocus="this.select()" onchange="updateManualExamCell(this)" title="Sınav Sırası (Değiştirebilirsiniz)"></td>
                    <td style="text-align:center; white-space:nowrap; padding:4px;">
                        <button class="btn" style="padding:4px 7px; font-size:10px; background:var(--secondary); margin-right:3px;" onclick="renderProgressChart('${jsSafeName}')" title="Gelişim Grafiği"><i class="fas fa-chart-line"></i> Grafik</button>
                        <button class="btn" style="padding:4px 7px; font-size:10px; background:#ef4444; color:#fff; border-radius:4px;" onclick="deleteStudentFromExam('${exam.id}', '${jsSafeName}')" title="Bu öğrenciyi sınavdan sil"><i class="fas fa-trash-alt"></i></button>
                    </td>
                `;
                body.appendChild(tr);
            });
            updateExamSelectedCount();
            document.getElementById('evaluation-modal').style.display = 'block';
        }

        function toggleAllExamStudentCheckboxes(masterCb) {
            const checkboxes = document.querySelectorAll('.exam-student-checkbox');
            checkboxes.forEach(cb => {
                cb.checked = masterCb.checked;
            });
            updateExamSelectedCount();
        }
        window.toggleAllExamStudentCheckboxes = toggleAllExamStudentCheckboxes;

        function updateExamSelectedCount() {
            const checkboxes = document.querySelectorAll('.exam-student-checkbox');
            const checkedBoxes = document.querySelectorAll('.exam-student-checkbox:checked');
            const countEl = document.getElementById('exam-selected-count');
            if (countEl) countEl.textContent = checkedBoxes.length;

            const masterCb = document.getElementById('exam-select-all');
            if (masterCb) {
                masterCb.checked = checkboxes.length > 0 && checkedBoxes.length === checkboxes.length;
                masterCb.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length;
            }

            const deleteBtn = document.getElementById('btn-delete-selected-exam-students');
            if (deleteBtn) {
                if (checkedBoxes.length > 0) {
                    deleteBtn.style.opacity = '1';
                    deleteBtn.style.pointerEvents = 'auto';
                } else {
                    deleteBtn.style.opacity = '0.65';
                }
            }
        }
        window.updateExamSelectedCount = updateExamSelectedCount;

        function deleteStudentFromExam(examId, studentName) {
            const exam = (examData || []).find(e => String(e.id) === String(examId));
            if (!exam) return;

            if (!confirm(`"${studentName}" isimli öğrenciyi bu sınavdan silmek istediğinize emin misiniz?`)) {
                return;
            }

            if (!Array.isArray(exam.excludedStudents)) exam.excludedStudents = [];
            if (!exam.excludedStudents.includes(studentName)) {
                exam.excludedStudents.push(studentName);
            }
            if (exam.results && exam.results[studentName]) {
                delete exam.results[studentName];
            }

            // Değişiklikleri veritabanına ve önbelleğe kalıcı kaydet
            if (typeof saveData === 'function') saveData(true);
            if (typeof renderExams === 'function') renderExams();
            openExamEvaluation(examId);

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`<i class="fas fa-check-circle"></i> "${studentName}" sınavdan silindi.`, 'success');
            }
        }
        window.deleteStudentFromExam = deleteStudentFromExam;

        function deleteSelectedStudentsFromExam(examId) {
            const exam = (examData || []).find(e => String(e.id) === String(examId));
            if (!exam) return;

            const checkedBoxes = Array.from(document.querySelectorAll('.exam-student-checkbox:checked'));
            if (checkedBoxes.length === 0) {
                alert('Lütfen silmek istediğiniz öğrencileri sol taraftaki kutucukları işaretleyerek seçiniz.');
                return;
            }

            const count = checkedBoxes.length;
            if (!confirm(`Seçilen ${count} öğrenci bu sınavdan silinecek.\n\nOnaylıyor musunuz?`)) {
                return;
            }

            if (!Array.isArray(exam.excludedStudents)) exam.excludedStudents = [];

            checkedBoxes.forEach(cb => {
                const sName = cb.value;
                if (exam.results && exam.results[sName]) {
                    delete exam.results[sName];
                }
                if (!exam.excludedStudents.includes(sName)) {
                    exam.excludedStudents.push(sName);
                }
            });

            // Değişiklikleri kaydet ve arayüzü yenile
            if (typeof saveData === 'function') saveData(true);
            if (typeof renderExams === 'function') renderExams();
            openExamEvaluation(examId);

            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`<i class="fas fa-check-circle"></i> Seçilen ${count} öğrenci sınavdan silindi.`, 'success');
            }
        }
        window.deleteSelectedStudentsFromExam = deleteSelectedStudentsFromExam;

        function updateManualExamCell(input) {
            const name = input.getAttribute('data-name'); 
            const field = input.getAttribute('data-field'); 
            const exam = (examData || []).find(e => String(e.id) === String(activeExamId));
            if (!exam) return;
            if (!exam.results[name]) { 
                exam.results[name] = { no: "", sinif: "", Turkce: 0, Matematik: 0, Sosyal: 0, Fen: 0, DinKulturu: 0, Ingilizce: 0, totalNet: 0, rank: "-" }; 
                const s = studentData.find(st => st.adSoyad === name); 
                if (s) { exam.results[name].no = s.no; exam.results[name].sinif = s.sinif; } 
            }

            if (field === 'sinif') {
                const newSinif = input.value.trim().toUpperCase();
                exam.results[name].sinif = newSinif;
                if (!Array.isArray(exam.classes)) exam.classes = [];
                if (newSinif && !exam.classes.includes(newSinif)) {
                    exam.classes.push(newSinif);
                }
                const sObj = (window.studentData || []).find(st => st.adSoyad === name || (exam.results[name].no && String(st.no).trim() === String(exam.results[name].no).trim()));
                if (sObj && (!sObj.sinif || sObj.sinif.length <= 1)) {
                    sObj.sinif = newSinif;
                }
            } else if (field === 'no') {
                const newNo = input.value.trim();
                exam.results[name].no = newNo;
                // Yeni numara studentData'daki bir öğrenciyle eşleşirse sınıfı otomatik getir
                const masterSt = (studentData || []).find(st => String(st.no || '').trim() === newNo);
                if (masterSt && masterSt.sinif) {
                    exam.results[name].sinif = masterSt.sinif;
                    const sinifInput = document.querySelector(`.exam-sinif-input[data-name="${input.getAttribute('data-name')}"]`);
                    if (sinifInput) sinifInput.value = masterSt.sinif;
                    if (!exam.classes.includes(masterSt.sinif)) exam.classes.push(masterSt.sinif);
                }
            } else if (field === 'rank') {
                exam.results[name].rank = input.value.trim();
            } else if (field === 'totalNet') {
                exam.results[name].totalNet = parseFloat(input.value) || 0;
            } else {
                exam.results[name][field] = parseFloat(input.value) || 0;
                // Ders netleri değiştiğinde Toplam Neti otomatik topla
                exam.results[name].totalNet = parseFloat((
                    (parseFloat(exam.results[name].Turkce) || 0) + 
                    (parseFloat(exam.results[name].Matematik) || 0) + 
                    (parseFloat(exam.results[name].Sosyal) || 0) + 
                    (parseFloat(exam.results[name].Fen) || 0) + 
                    (parseFloat(exam.results[name].DinKulturu) || 0) + 
                    (parseFloat(exam.results[name].Ingilizce) || 0)
                ).toFixed(2));
                
                const safeTotalId = 'total-' + encodeURIComponent(name || '').replace(/%/g, '_');
                const targetF = document.getElementById(safeTotalId) || document.getElementById(`total-${name.replace(/\s+/g, '')}`); 
                if (targetF) targetF.value = exam.results[name].totalNet;
            }
            
            // Koçluk modülüne canlı anında senkronize et
            syncSingleStudentExamToKocluk(exam, name, exam.results[name]);
            
            saveData();
        }

        // ── İLERİ ÇALIŞMA GRUPLARI SİSTEMİ (Tab 8) ──

        function ileriSinifDoldur() {
            const sel = document.getElementById('ileri-sinif');
            if (!sel) return;
            const allStudents = window.studentData || (typeof studentData !== 'undefined' ? studentData : []);
            const siniflar = [...new Set(allStudents.map(s => s && s.sinif).filter(Boolean))].sort();
            const cur = sel.value;
            sel.innerHTML = '<option value="">Tüm Sınıflar</option>' + siniflar.map(s => `<option value="${s}">${s}</option>`).join('');
            if (cur && siniflar.includes(cur)) sel.value = cur;

            // Eğer daha önce analiz edilmiş gruplar varsa ve sonuç paneli boşsa, mevcut grupları çiz
            ileriGrupRenderExisting();
        }

        function _getNormAdvData() {
            const raw = window.advancedGroupData || (typeof advancedGroupData !== 'undefined' ? advancedGroupData : []);
            if (!raw) return [];
            const list = Array.isArray(raw) ? raw : Object.values(raw);
            return list.map(g => {
                if (Array.isArray(g)) return g;
                if (g && Array.isArray(g.ogrenciler)) return g.ogrenciler;
                if (g && Array.isArray(g.members)) return g.members;
                if (g && typeof g === 'object') return Object.values(g).filter(x => x && typeof x === 'object');
                return [];
            }).filter(g => g.length > 0);
        }

        function ileriGrupRenderExisting() {
            const advData = _getNormAdvData();
            if (!advData || advData.length === 0) return;
            const resPanel = document.getElementById('ileri-result-panel');
            if (!resPanel) return;

            // Eğer panel henüz analiz edilmemiş durumdaysa var olan veriyi göster
            if (resPanel.innerHTML.includes('Analiz başlatılmadı') || resPanel.innerHTML.trim() === '') {
                ileriGrupRenderSonuclar(advData, [], '', 30);
            }
        }

        function ileriGrupAnalizEt() {
            const sinifEl = document.getElementById('ileri-sinif');
            const sinifFiltre = sinifEl ? sinifEl.value : '';
            const grupBoyutInput = document.querySelector('input[name="ileri-grup-boyut"]:checked');
            const grupBoyut = parseInt(grupBoyutInput ? grupBoyutInput.value : 4) || 4;
            const esikEl = document.getElementById('ileri-esik');
            const esik = parseInt(esikEl ? esikEl.value : 30) || 30;
            const kritXP = document.getElementById('krit-xp') ? document.getElementById('krit-xp').checked : true;
            const kritOdev = document.getElementById('krit-odev') ? document.getElementById('krit-odev').checked : true;
            const kritSinav = document.getElementById('krit-sinav') ? document.getElementById('krit-sinav').checked : true;
            const kritKatilim = document.getElementById('krit-katilim') ? document.getElementById('krit-katilim').checked : false;

            const allStudents = window.studentData || (typeof studentData !== 'undefined' ? studentData : []);
            const allTracking = window.trackingData || (typeof trackingData !== 'undefined' ? trackingData : []);
            const allExams = window.examData || (typeof examData !== 'undefined' ? examData : []);

            const hedefOgrenciler = allStudents.filter(s => {
                if (!s || !s.adSoyad) return false;
                return sinifFiltre ? (s.sinif === sinifFiltre || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(sinifFiltre))) : true;
            });

            if (hedefOgrenciler.length < 2) {
                const resPanel = document.getElementById('ileri-result-panel');
                if (resPanel) resPanel.innerHTML = '<div style="padding:30px;text-align:center;color:var(--text-muted);"><i class="fas fa-exclamation-circle fa-2x mb-2" style="opacity:0.5;"></i><p>Bu sınıfta veya sistemde yeterli öğrenci bulunamadı (En az 2 öğrenci gerekli).</p></div>';
                return;
            }

            // Normalizasyon için ön hesaplamalar (Döngü dışında tek sefer)
            let minXP = 0, maxXP = 1, rangeXP = 1;
            if (kritXP) {
                const allXP = hedefOgrenciler.map(x => Number(x.xp) || 0);
                minXP = Math.min(...allXP);
                maxXP = Math.max(...allXP);
                rangeXP = (maxXP - minXP) || 1;
            }

            let maxNet = 1;
            if (kritSinav) {
                const allNets = allExams.flatMap(e => Object.values((e && e.results) || {}).map(r => parseFloat(r && r.totalNet) || 0));
                maxNet = allNets.length ? Math.max(...allNets, 1) : 1;
            }

            // Her öğrenciye skor hesapla
            const skorlar = hedefOgrenciler.map(s => {
                let toplam = 0; let agirlik = 0;

                // XP skoru — min-max normalizasyonu
                if (kritXP) {
                    const stXP = Number(s.xp) || 0;
                    const xpNorm = rangeXP > 0 ? ((stXP - minXP) / rangeXP) * 100 : 50;
                    toplam += Math.max(0, Math.min(100, xpNorm)) * 0.30;
                    agirlik += 0.30;
                }

                // Ödev teslim oranı
                if (kritOdev) {
                    const odevler = allTracking.filter(t => t && (t.sinif === s.sinif || !t.sinif));
                    const teslimSayisi = odevler.filter(t => t && t.submissions && t.submissions[s.adSoyad] && t.submissions[s.adSoyad].done).length;
                    const odevOran = odevler.length > 0 ? (teslimSayisi / odevler.length) * 100 : 50;
                    toplam += odevOran * 0.30;
                    agirlik += 0.30;
                }

                // Sınav net ortalaması
                if (kritSinav) {
                    const sinav = allExams.filter(e => e && e.results && e.results[s.adSoyad]);
                    const netleri = sinav.map(e => parseFloat(e.results[s.adSoyad].totalNet) || 0);
                    const sinav_ort = netleri.length ? (netleri.reduce((a, b) => a + b, 0) / netleri.length) : 0;
                    const sinavNorm = (allExams.length > 0 && sinav.length > 0) ? (sinav_ort / maxNet) * 100 : 50;
                    toplam += Math.max(0, Math.min(100, sinavNorm)) * 0.30;
                    agirlik += 0.30;
                }

                // Form katılımı
                if (kritKatilim) {
                    const katilimSkor = Math.min(((Number(s.xp) || 0) > 10 ? 70 : 40) + 20, 100);
                    toplam += katilimSkor * 0.10;
                    agirlik += 0.10;
                }

                const normalSkor = agirlik > 0 ? (toplam / agirlik) : 50;
                return { ...s, _skor: +normalSkor.toFixed(2) };
            });

            // Sırala
            skorlar.sort((a, b) => b._skor - a._skor);

            // Eşik: üst %X ileri grupta
            const ileriSayisi = Math.max(Math.round(skorlar.length * esik / 100), Math.min(grupBoyut, skorlar.length));
            const ileriOgrenciler = skorlar.slice(0, ileriSayisi);
            const normalOgrenciler = skorlar.slice(ileriSayisi);

            // Grupları oluştur
            const gruplar = [];
            for (let i = 0; i < ileriOgrenciler.length; i += grupBoyut) {
                gruplar.push(ileriOgrenciler.slice(i, i + grupBoyut));
            }

            if (typeof advancedGroupData !== 'undefined') advancedGroupData = gruplar;
            window.advancedGroupData = gruplar;

            ileriGrupRenderSonuclar(gruplar, normalOgrenciler, sinifFiltre, esik);

            // Verileri kalıcı kaydet
            if (typeof saveData === 'function') saveData(true);
        }

        function ileriGrupRenderSonuclar(gruplar, normalOgrenciler, sinifFiltre, esik) {
            // Grupları dizi formatına normalize et (Firebase RTDB objeleri dahil)
            gruplar = (gruplar || []).map(g => {
                if (Array.isArray(g)) return g;
                if (g && Array.isArray(g.members)) return g.members;
                if (g && typeof g === 'object') return Object.values(g).filter(x => x && typeof x === 'object');
                return [];
            }).filter(g => g.length > 0);

            normalOgrenciler = normalOgrenciler || [];
            esik = esik || 30;

            const toplamIleri = gruplar.reduce((acc, g) => acc + g.length, 0);

            // Özet paneli
            const ozetPanel = document.getElementById('ileri-ozet-panel');
            const ozetContent = document.getElementById('ileri-ozet-content');
            if (ozetPanel && ozetContent) {
                ozetPanel.style.display = 'block';
                ozetContent.innerHTML = `
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;">
                    <div style="background:var(--input-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                        <div style="font-size:22px;font-weight:700;color:var(--secondary);">${toplamIleri}</div>
                        <div style="font-size:11px;color:var(--text-muted);">🚀 İleri Grup</div>
                    </div>
                    <div style="background:var(--input-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                        <div style="font-size:22px;font-weight:700;color:var(--accent);">${gruplar.length}</div>
                        <div style="font-size:11px;color:var(--text-muted);">📦 Oluşan Grup</div>
                    </div>
                    <div style="background:var(--input-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                        <div style="font-size:22px;font-weight:700;color:var(--yellow);">${normalOgrenciler.length}</div>
                        <div style="font-size:11px;color:var(--text-muted);">📚 Normal Akış</div>
                    </div>
                </div>
                <div style="margin-top:12px;font-size:12px;color:var(--text-muted);background:var(--input-bg);padding:10px;border-radius:8px;">
                    <i class="fas fa-info-circle" style="color:var(--secondary);"></i>
                    Eşik: üst <strong>%${esik}</strong> — Başarılı öğrenciler otomatik kümelere ve proje gruplarına hazırlandı.
                </div>`;
            }

            const esc = window.escapeHTML || window.escapeHtml || function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };

            // Sonuç paneli
            let resultHtml = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;flex-wrap:wrap;gap:8px;">
                <h4 style="margin:0;color:var(--secondary);"><i class="fas fa-layer-group me-2"></i>İleri Çalışma Grupları (${gruplar.length} Grup)</h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                    <button class="btn" style="font-size:11px;padding:6px 12px;background:#8b5cf6;" onclick="ileriGrupProjeAktar()" title="Grupları 11. Proje Grupları sekmesine aktarır"><i class="fas fa-project-diagram me-1"></i>Proje Gruplarına Aktar</button>
                    <button class="btn" style="font-size:11px;padding:6px 12px;background:var(--secondary);" onclick="ileriGrupKaydet()" title="Grupları 2. Sınıf Yönetimi kümelerine aktarır"><i class="fas fa-campground me-1"></i>Sınıf Kümelerine Aktar</button>
                    <button class="btn" style="font-size:11px;padding:6px 12px;background:#25D366;" onclick="ileriGrupWhatsapp()"><i class="fab fa-whatsapp me-1"></i>Velilere WA</button>
                    <button class="btn" style="font-size:11px;padding:6px 12px;background:#00B2FF;" onclick="ileriGrupBip()"><i class="fas fa-comment-dots me-1"></i>Velilere BiP</button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:15px;">`;

            const rollerler = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];
            const renkler = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#7f8c8d'];

            gruplar.forEach((grup, gi) => {
                const grupSinif = grup[0]?.sinif || sinifFiltre || 'Karma Sınıf';
                resultHtml += `
                <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);">
                    <div style="background:linear-gradient(135deg,var(--secondary),#8b5cf6);padding:12px 15px;color:white;">
                        <div style="font-weight:700;font-size:14px;"><i class="fas fa-rocket me-2"></i>İleri Grup ${gi + 1}</div>
                        <div style="font-size:11px;opacity:0.85;">${grup.length} öğrenci · ${esc(grupSinif)}</div>
                    </div>
                    <div style="padding:12px;">`;
                grup.forEach((ogr, oi) => {
                    const rol = rollerler[Math.min(oi, rollerler.length - 1)];
                    const renk = renkler[Math.min(oi, rollerler.length - 1)];
                    const skorBar = Math.max(0, Math.min(100, Math.round(ogr._skor || 50)));
                    resultHtml += `
                        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
                            <div style="flex:1;">
                                <div style="font-weight:600;font-size:13px;">${ogr.no ? (esc(String(ogr.no)) + ' - ') : ''}${esc(ogr.adSoyad)}</div>
                                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
                                    <div style="flex:1;background:var(--input-bg);border-radius:20px;height:6px;overflow:hidden;">
                                        <div style="width:${skorBar}%;height:100%;background:linear-gradient(90deg,var(--secondary),var(--accent));border-radius:20px;"></div>
                                    </div>
                                    <span style="font-size:10px;color:var(--text-muted);min-width:28px;">${skorBar}p</span>
                                </div>
                            </div>
                            <span style="background:${renk};color:${oi === 2 ? '#000' : '#fff'};padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;">${rol}</span>
                        </div>`;
                });
                resultHtml += `</div></div>`;
            });

            resultHtml += '</div>';

            // Normal akış öğrencileri
            if (normalOgrenciler.length > 0) {
                resultHtml += `
                <div style="margin-top:20px;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;overflow:hidden;">
                    <div style="background:var(--tab-bg);padding:12px 15px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border);">
                        <i class="fas fa-book" style="color:var(--text-muted);"></i>
                        <strong style="font-size:13px;">Normal Ders Akışı Öğrencileri (${normalOgrenciler.length} kişi)</strong>
                    </div>
                    <div style="padding:12px;display:flex;flex-wrap:wrap;gap:8px;">`;
                normalOgrenciler.forEach(o => {
                    resultHtml += `<span style="background:var(--input-bg);border:1px solid var(--border);border-radius:20px;padding:4px 10px;font-size:12px;">${esc(o.adSoyad)} <span style="color:var(--text-muted);">${o._skor || 0}p</span></span>`;
                });
                resultHtml += '</div></div>';
            }

            const resPanel = document.getElementById('ileri-result-panel');
            if (resPanel) resPanel.innerHTML = resultHtml;
        }

        function ileriGrupKaydet() {
            const advData = _getNormAdvData();
            if (!advData || advData.length === 0) return alert('Önce analiz yapın!');
            const container = document.getElementById('groups-container');
            if (!container) return alert('Sınıf Yönetimi sekmesindeki grup konteynerine erişilemiyor.');

            const rollerler = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];

            // Analiz edilen sınıf filtresini belirle
            const sinifEl = document.getElementById('ileri-sinif');
            let hedefSinif = sinifEl ? sinifEl.value : '';
            if (!hedefSinif && advData[0] && advData[0][0]) {
                const allStudents = window.studentData || (typeof studentData !== 'undefined' ? studentData : []);
                const sObj = allStudents.find(s => s.adSoyad === advData[0][0].adSoyad);
                if (sObj) hedefSinif = sObj.sinif;
            }

            const classFilter = document.getElementById('class-filter');
            if (classFilter && hedefSinif) {
                classFilter.value = hedefSinif;
                if (typeof loadClassGroups === 'function') loadClassGroups(hedefSinif);
            }

            advData.forEach((grup, gi) => {
                // İleri grup aktarılırken öğrencileri numaraya göre sırala
                grup.sort((a, b) => {
                    const aNo = parseInt(a.no) || 0; const bNo = parseInt(b.no) || 0;
                    if (aNo !== bNo) return aNo - bNo;
                    return (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
                });

                // HATA ÇÖZÜMÜ: Öğrenciyi eski normal kümesinden sil (Klonlanmayı Engelle)
                grup.forEach(ogr => {
                    document.querySelectorAll('.group-card li').forEach(li => {
                        const nameSpan = li.querySelector('.student-name-text');
                        if (nameSpan && nameSpan.getAttribute('data-name') === ogr.adSoyad) {
                            li.remove(); // Normal listeden uçur
                        }
                    });
                });

                const card = document.createElement('div'); card.className = 'group-card';
                let liHtml = '';
                grup.forEach((ogr, oi) => {
                    const rol = rollerler[Math.min(oi, rollerler.length - 1)];
                    const safeJsAd = (ogr.adSoyad || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                    const escapedName = (typeof window.escapeHTML === 'function') ? window.escapeHTML(ogr.adSoyad) : (ogr.adSoyad || '').replace(/"/g, '&quot;');
                    liHtml += `<li style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);padding-bottom:10px;">
                    <div style="display:flex;flex-direction:column;gap:2px;">
                        <span class="student-name-text" data-name="${escapedName}" style="font-weight:600;font-size:14px;">${ogr.no ? (ogr.no + ' - ') : ''}${escapedName}</span>
                        <div style="display:flex;align-items:center;gap:5px;">
                            <span class="xp-badge" style="font-size:10px;padding:1px 5px;">${ogr.xp || 0} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${safeJsAd}',1)">+</button>
                            <button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${safeJsAd}',-1)">-</button>
                        </div>
                    </div>
                    <div style="display:flex;gap:8px;align-items:center;">
                        <select class="role-select" onchange="updateRoleColor(this)">
                            <option value="">Görev...</option>
                            <option value="Proje Koordinatörü" ${rol === 'Proje Koordinatörü' ? 'selected' : ''}>Proje Koordinatörü</option>
                            <option value="Veri Analisti" ${rol === 'Veri Analisti' ? 'selected' : ''}>Veri Analisti</option>
                            <option value="Ar-Ge Sorumlusu" ${rol === 'Ar-Ge Sorumlusu' ? 'selected' : ''}>Ar-Ge Sorumlusu</option>
                            <option value="Halkla İlişkiler" ${rol === 'Halkla İlişkiler' ? 'selected' : ''}>Halkla İlişkiler</option>
                            <option value="Üye" ${rol === 'Üye' ? 'selected' : ''}>Üye</option>
                        </select>
                        <button class="btn-remove-student" onclick="if(confirm('Öğrenciyi kümeden silmek istiyor musunuz?')){this.closest('li').remove();updateStudentPickers();saveData();}"><i class="fas fa-user-minus"></i></button>
                    </div></li>`;
                });
                card.innerHTML = `<h3><input type="text" class="group-title-input" value="🚀 İleri Grup ${gi + 1}" oninput="saveData()">
                <button class="action-btn btn-delete" onclick="if(confirm('Kümeyi sil?')){this.closest('.group-card').remove();updateStudentPickers();saveData();}" title="Sil"><i class="fas fa-times"></i></button></h3>
                <ul style="padding:0;list-style:none;">${liHtml}</ul>
                <div class="group-footer"><button class="btn btn-purple" style="font-size:11px;padding:8px;" onclick="addXPToGroup(this)"><i class="fas fa-users-cog"></i> Kümeye Toplu Puan Ver</button>
                <div style="display:flex;gap:5px;"><select class="student-picker" style="flex:1;padding:8px;border-radius:8px;font-size:12px;border:1px solid var(--border);background:var(--input-bg);color:var(--text-main);"><option value="">Öğrenci Seç...</option></select>
                <button class="btn" onclick="addStudentToGroupUI(this)" style="padding:8px 15px;font-size:12px;">Ekle</button></div></div>`;
                container.appendChild(card);
            });

            document.querySelectorAll('.role-select').forEach(sel => {
                if (typeof updateRoleColor === 'function') updateRoleColor(sel);
            });
            if (typeof updateStudentPickers === 'function') updateStudentPickers();
            if (typeof saveData === 'function') saveData(true);
            alert(`✅ ${advData.length} İleri çalışma grubu "Sınıf Yönetimi" sekmesine aktarıldı ve öğrenciler eski kümelerinden çıkarıldı!`);
            openTab('tab2');
        }

        function ileriGrupWhatsapp() {
            const advData = _getNormAdvData();
            if (!advData || advData.length === 0) return alert('Önce analiz yapın!');
            let mesaj = '🚀 *İLERİ ÇALIŞMA GRUPLARI*\n\n';
            advData.forEach((grup, gi) => {
                mesaj += `📦 *İleri Grup ${gi + 1}:*\n`;
                grup.forEach((o, oi) => { mesaj += `   ${oi + 1}. ${o.adSoyad} (${o._skor || 0}p)\n`; });
                mesaj += '\n';
            });
            mesaj += '_Proje Tabanlı Ders İşleme Sistemi tarafından oluşturulmuştur._';
            window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(mesaj), '_blank');
        }

        function ileriGrupBip() {
            const advData = _getNormAdvData();
            if (!advData || advData.length === 0) return alert('Önce analiz yapın!');
            let mesaj = '🚀 *İLERİ ÇALIŞMA GRUPLARI*\n\n';
            advData.forEach((grup, gi) => {
                mesaj += `📦 *İleri Grup ${gi + 1}:*\n`;
                grup.forEach((o, oi) => { mesaj += `   ${oi + 1}. ${o.adSoyad} (${o._skor || 0}p)\n`; });
                mesaj += '\n';
            });
            mesaj += '_Proje Tabanlı Ders İşleme Sistemi tarafından oluşturulmuştur._';
            if (typeof window.shareViaBip === 'function') {
                window.shareViaBip(mesaj, 'İleri Çalışma Grupları');
            } else {
                window.open('https://web.bip.com/', '_blank');
            }
        }

        function ileriGrupProjeAktar() {
            const advData = _getNormAdvData();
            if (!advData || advData.length === 0) return alert('Önce analiz yapın!');

            let actCount = 0;
            const defaultAsamalar = [
                '1. Problem Tespiti',
                '2. Araştırma & Kaynak',
                '3. Tasarım & Plan',
                '4. Uygulama & Prototip',
                '5. Test & Revizyon',
                '6. Sunum & Rapor'
            ];
            const asamalarList = (window.PG_ASAMALAR || (typeof PG_ASAMALAR !== 'undefined' ? PG_ASAMALAR : defaultAsamalar));
            const allStudents = window.studentData || (typeof studentData !== 'undefined' ? studentData : []);
            
            if (!Array.isArray(window.projeGruplariData)) {
                if (typeof window.pgLoad === 'function') window.pgLoad();
            }
            const targetData = window.projeGruplariData || (typeof projeGruplariData !== 'undefined' ? projeGruplariData : []);

            const sinifEl = document.getElementById('ileri-sinif');
            const seciliSinif = sinifEl ? sinifEl.value : '';

            advData.forEach((grup, gi) => {
                if (!grup || grup.length < 1) return;
                let sinif = seciliSinif || '';
                if (!sinif) {
                    const testSt = allStudents.find(s => s && s.adSoyad === grup[0].adSoyad);
                    if (testSt && testSt.sinif) sinif = testSt.sinif;
                }

                const members = grup.map(ogr => {
                    const s = allStudents.find(st => st && st.adSoyad === ogr.adSoyad) || {};
                    return {
                        name: ogr.adSoyad,
                        no: ogr.no || s.no || '',
                        score: Math.round(ogr._skor || 50),
                        aktif: true,
                        katilimSayisi: 0,
                        sonIslem: new Date().toLocaleDateString('tr-TR')
                    };
                });

                const pGrup = {
                    id: Date.now() + gi,
                    title: '🚀 İleri Proje Grubu ' + (targetData.length + 1),
                    ders: 'İleri Çalışma',
                    type: 'teori', // Varsayılan: Teori
                    sinif: sinif || 'Tüm Sınıflar',
                    desc: 'Yapay Zeka kural motoru analizi sonucu üst düzey performanstan dolayı otomatik oluşturulmuştur.',
                    odevLinks: [],
                    members: members,
                    asamalar: asamalarList.map((label, i) => ({
                        label,
                        durum: i === 0 ? 'active' : 'pending',
                        not: '',
                        tarih: i === 0 ? new Date().toLocaleDateString('tr-TR') : null
                    })),
                    mesajlar: [],
                    olusturma: new Date().toLocaleDateString('tr-TR')
                };

                targetData.push(pGrup);
                actCount++;
            });

            if (actCount > 0) {
                window.projeGruplariData = targetData;
                if (typeof projeGruplariData !== 'undefined') projeGruplariData = targetData;

                if (typeof window.pgSave === 'function') window.pgSave();
                else if (typeof pgSave === 'function') pgSave();
                else if (typeof saveData === 'function') saveData(true);

                if (typeof window.pgRenderList === 'function') window.pgRenderList();
                else if (typeof pgRenderList === 'function') pgRenderList();

                if (typeof window.pgUpdateTypeCounts === 'function') window.pgUpdateTypeCounts();
                else if (typeof pgUpdateTypeCounts === 'function') pgUpdateTypeCounts();

                alert(`✅ ${actCount} adet ileri düzey çalışma grubu, "11. Proje Grupları" sekmesine başarıyla eklendi! Sekmeye yönlendiriliyorsunuz.`);
                if (typeof openTab === 'function') openTab('tab9');
            }
        }

        // ── GRAFİK SİSTEMİ ──
        let chartMode = 'single'; // 'single' | 'class' | 'radar'

        function setChartMode(mode) {
            chartMode = mode;
            ['single', 'class', 'radar', 'compare'].forEach(m => {
                const btn = document.getElementById('chart-mode-' + m);
                if (!btn) return;
                if (m === mode) { btn.style.background = 'var(--secondary)'; btn.style.color = 'white'; btn.style.border = 'none'; }
                else { btn.style.background = 'var(--input-bg)'; btn.style.color = 'var(--text-main)'; btn.style.border = '1px solid var(--border)'; }
            });
            const classWrap = document.getElementById('chart-class-filter-wrap');
            if (classWrap) classWrap.style.display = (mode === 'class') ? 'block' : 'none';
            updateChartMetric();
        }

        function renderProgressChart(studentName) {
            activeChartStudentName = studentName;
            chartMode = 'single';

            // Sınıf filtresini doldur
            const classFilter = document.getElementById('chart-class-filter');
            if (classFilter) {
                const classes = [...new Set(studentData.map(s => s.sinif).filter(Boolean))].sort();
                classFilter.innerHTML = '<option value="">Tümü</option>' + classes.map(c => `<option value="${c}">${c}</option>`).join('');
            }

            const modal = document.getElementById('chart-modal');
            if (modal) {
                // Modalın z-index kısıtlamasına (stacking context) takılmaması için doğrudan body'e taşıyoruz
                if (modal.parentElement !== document.body) {
                    document.body.appendChild(modal);
                }
                modal.style.display = 'block';
            }

            // Alan görünür hale geldikten (reflow) sonra grafiği çizdir (çizim boyut hatalarını önler)
            setTimeout(() => {
                setChartMode('single');
            }, 50);
        }

        function updateChartMetric() {
            const metric = document.getElementById('chart-metric-select').value;
            if (chartMode === 'single') drawSingleStudentChart(activeChartStudentName, metric);
            else if (chartMode === 'class') {
                if (metric === 'vak') drawVakChart();
                else drawClassChart(metric);
            }
            else if (chartMode === 'radar') drawRadarChart(activeChartStudentName);
            else if (chartMode === 'compare') drawClassComparisonChart(metric);
        }

        function drawVakChart() {
            const classFilter = document.getElementById('chart-class-filter') ? document.getElementById('chart-class-filter').value : '';
            const nameEl = document.getElementById('chart-student-name');
            if (nameEl) nameEl.textContent = (classFilter || 'Tüm Sınıflar') + ' — Öğrenme Stilleri Analizi';

            let filteredStudents = studentData.filter(s => classFilter ? (s.sinif === classFilter || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(classFilter))) : true);
            if (filteredStudents.length === 0) { renderEmptyChart('Öğrenci bulunamadı.'); return; }

            let vCount = 0, aCount = 0, kCount = 0, uCount = 0;
            filteredStudents.forEach(s => {
                if (s.vak === 'Görsel') vCount++;
                else if (s.vak === 'İşitsel') aCount++;
                else if (s.vak === 'Kinestetik') kCount++;
                else uCount++;
            });

            if (vCount === 0 && aCount === 0 && kCount === 0) { renderEmptyChart('Bu sınıf için henüz Öğrenme Stilleri teşhisi konulmamış.'); return; }

            const datasets = [{
                data: [vCount, aCount, kCount, uCount],
                backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#94a3b8'],
                borderWidth: 1
            }];

            const statsEl = document.getElementById('chart-stats');
            if (statsEl) statsEl.innerHTML = `
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">👁️ Görsel: <span style="color:#3b82f6">${vCount}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">🎧 İşitsel: <span style="color:#f59e0b">${aCount}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">✋ Kinestetik: <span style="color:#10b981">${kCount}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">❔ Teşhis Konulmamış: <span style="color:#94a3b8">${uCount}</span></span>
        `;

            renderChart('pie', ['Görsel', 'İşitsel', 'Kinestetik', 'Belirtilmedi'], datasets);
        }

        // Tek öğrenci: sınavlar arası gelişim çizgi grafiği
        function drawSingleStudentChart(studentName, metric) {
            const nameEl = document.getElementById('chart-student-name');
            if (nameEl) nameEl.textContent = studentName + ' — Gelişim Grafiği';

            const sortedExams = [...examData].filter(e => e.results && e.results[studentName])
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            if (metric === 'vak') {
                const stu = studentData.find(s => s.adSoyad === studentName);
                const styleName = stu && stu.vak ? stu.vak : 'Belirtilmedi';
                renderEmptyChart(`Öğrenme Stilleri zamanla değişen bir sınav verisi değildir.<br><br><span style="font-size:16px; color:var(--text-main);">Öğrencinin Baskın Öğrenme Stili: <strong style="color:var(--secondary);">${styleName}</strong></span>`);
                return;
            }

            const labels = sortedExams.map(e => e.title + (e.date ? ' (' + new Date(e.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }) + ')' : ''));

            let datasets = [];
            const metricLabels = { totalNet: 'Toplam Net', Turkce: 'Türkçe', Matematik: 'Matematik', Sosyal: 'Sosyal', Fen: 'Fen', DinKulturu: 'Din Kültürü', Ingilizce: 'İngilizce', vak: 'Öğrenme Stilleri' };
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

            if (metric === 'all') {
                const fields = ['Turkce', 'Matematik', 'Sosyal', 'Fen', 'DinKulturu', 'Ingilizce'];
                datasets = fields.map((f, i) => ({
                    label: metricLabels[f] || f,
                    data: sortedExams.map(e => e.results[studentName] ? (parseFloat(e.results[studentName][f]) || 0) : null),
                    borderColor: colors[i], backgroundColor: colors[i] + '22',
                    tension: 0.4, fill: false, pointRadius: 5, pointHoverRadius: 8
                }));
            } else {
                datasets = [{
                    label: metricLabels[metric] || metric,
                    data: sortedExams.map(e => e.results[studentName] ? (parseFloat(e.results[studentName][metric]) || 0) : null),
                    borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)',
                    tension: 0.4, fill: true, pointRadius: 6, pointHoverRadius: 10,
                    pointBackgroundColor: '#3b82f6', borderWidth: 3
                }];
            }

            // İstatistikler
            const values = datasets[0].data.filter(v => v !== null);
            const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : '-';
            const max = values.length ? Math.max(...values).toFixed(2) : '-';
            const min = values.length ? Math.min(...values).toFixed(2) : '-';
            const trend = values.length >= 2 ? (values[values.length - 1] - values[0]).toFixed(2) : '-';
            const trendColor = trend > 0 ? '#10b981' : (trend < 0 ? '#ef4444' : '#94a3b8');
            const statsEl = document.getElementById('chart-stats');
            if (statsEl) statsEl.innerHTML = `
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">📊 Ort: <span style="color:var(--secondary)">${avg}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">🔼 En Yüksek: <span style="color:#10b981">${max}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">🔽 En Düşük: <span style="color:#ef4444">${min}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">📈 Trend: <span style="color:${trendColor}">${trend > 0 ? '+' : ''}${trend}</span></span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">📝 Sınav: ${sortedExams.length}</span>`;

            if (sortedExams.length === 0) {
                renderEmptyChart('Bu öğrenci için henüz sınav verisi yok.');
                return;
            }
            renderChart('line', labels, datasets);
        }

        // Sınıf geneli: tüm öğrencilerin son sınav ortalaması çubuk grafik
        function drawClassChart(metric) {
            const classFilter = document.getElementById('chart-class-filter') ? document.getElementById('chart-class-filter').value : '';
            const nameEl = document.getElementById('chart-student-name');
            const metricLabels = { totalNet: 'Toplam Net', Turkce: 'Türkçe', Matematik: 'Matematik', Sosyal: 'Sosyal', Fen: 'Fen', DinKulturu: 'Din Kültürü', Ingilizce: 'İngilizce', all: 'Tüm Dersler' };
            if (nameEl) nameEl.textContent = (classFilter || 'Tüm Sınıflar') + ' — Sınıf Başarı Grafiği (' + (metricLabels[metric] || metric) + ')';

            if (examData.length === 0) { renderEmptyChart('Henüz sınav verisi yok.'); return; }

            // Son sınavı baz al
            const lastExam = [...examData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            if (!lastExam || !lastExam.results) { renderEmptyChart('Sınav sonucu bulunamadı.'); return; }

            let filteredStudents = studentData.filter(s => classFilter ? (s.sinif === classFilter || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(classFilter))) : true);

            const labels = [];
            const data = [];
            const bgColors = [];
            const colors6 = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

            if (metric === 'all') {
                // Her ders ayrı dataset
                const fields = ['Turkce', 'Matematik', 'Sosyal', 'Fen', 'DinKulturu', 'Ingilizce'];
                const studentLabels = filteredStudents.filter(s => lastExam.results[s.adSoyad]).map(s => s.adSoyad.split(' ')[0]);
                const datasets = fields.map((f, i) => ({
                    label: metricLabels[f],
                    data: filteredStudents.filter(s => lastExam.results[s.adSoyad]).map(s => parseFloat(lastExam.results[s.adSoyad][f]) || 0),
                    backgroundColor: colors6[i] + 'bb', borderColor: colors6[i], borderWidth: 1
                }));
                if (studentLabels.length === 0) { renderEmptyChart('Seçili sınav için öğrenci verisi yok.'); return; }
                const statsEl = document.getElementById('chart-stats');
                if (statsEl) statsEl.innerHTML = `<span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;">📋 ${lastExam.title} sınavı — ${studentLabels.length} öğrenci</span>`;
                renderChart('bar', studentLabels, datasets);
                return;
            }

            filteredStudents.filter(s => lastExam.results[s.adSoyad]).forEach((s, i) => {
                const val = parseFloat(lastExam.results[s.adSoyad][metric]) || 0;
                labels.push(s.adSoyad.split(' ')[0]);
                data.push(val);
                bgColors.push(colors6[i % colors6.length] + 'cc');
            });

            if (labels.length === 0) { renderEmptyChart('Seçili sınav için öğrenci verisi yok.'); return; }

            const avg = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
            const statsEl = document.getElementById('chart-stats');
            if (statsEl) statsEl.innerHTML = `
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">📋 ${lastExam.title}</span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">👥 ${labels.length} öğrenci</span>
            <span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">📊 Sınıf Ort: <span style="color:var(--secondary)">${avg}</span></span>`;

            renderChart('bar', labels, [{
                label: metricLabels[metric] || metric,
                data, backgroundColor: bgColors, borderColor: bgColors.map(c => c.replace('cc', 'ff')), borderWidth: 1, borderRadius: 6
            }]);
        }

        // Radar: tek öğrencinin tüm dersler anlık profil karşılaştırması
        function drawRadarChart(studentName) {
            const nameEl = document.getElementById('chart-student-name');
            if (nameEl) nameEl.textContent = studentName + ' — Ders Profil Analizi (Radar)';

            const sortedExams = [...examData].filter(e => e.results && e.results[studentName])
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            if (sortedExams.length === 0) { renderEmptyChart('Radar için sınav verisi bulunamadı.'); return; }

            const fields = ['Turkce', 'Matematik', 'Sosyal', 'Fen', 'DinKulturu', 'Ingilizce'];
            const fLabels = ['Türkçe', 'Matematik', 'Sosyal', 'Fen', 'Din Kültürü', 'İngilizce'];
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

            const datasets = sortedExams.slice(-4).map((e, i) => ({
                label: e.title,
                data: fields.map(f => parseFloat(e.results[studentName][f]) || 0),
                borderColor: colors[i % colors.length],
                backgroundColor: colors[i % colors.length] + '22',
                pointBackgroundColor: colors[i % colors.length], borderWidth: 2, pointRadius: 4
            }));

            const statsEl = document.getElementById('chart-stats');
            if (statsEl) statsEl.innerHTML = `<span style="background:var(--card-bg);border:1px solid var(--border);border-radius:8px;padding:6px 12px;font-size:11px;">Son ${datasets.length} sınav karşılaştırılıyor</span>`;

            renderChart('radar', fLabels, datasets);
        }

        function renderChart(type, labels, datasets) {
            const ctx = document.getElementById('progressChart');
            if (!ctx) return;
            if (myChart) { myChart.destroy(); myChart = null; }
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
            const textColor = isDark ? '#94a3b8' : '#64748b';

            myChart = new Chart(ctx, {
                type,
                data: { labels, datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { labels: { color: textColor, font: { size: 11 }, boxWidth: 12 } },
                        tooltip: {
                            mode: 'index', intersect: false, callbacks: {
                                label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y !== undefined ? ctx.parsed.y : ctx.parsed.r}`
                            }
                        }
                    },
                    scales: type !== 'radar' ? {
                        x: { ticks: { color: textColor, maxRotation: 35, font: { size: 10 } }, grid: { color: gridColor } },
                        y: { beginAtZero: true, ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } }
                    } : {
                        r: { ticks: { color: textColor, backdropColor: 'transparent', font: { size: 9 } }, grid: { color: gridColor }, pointLabels: { color: textColor, font: { size: 11 } } }
                    }
                }
            });
        }

        // Şubeler arası ders ortalamalarını karşılaştıran grafik
        function drawClassComparisonChart(metric) {
            const nameEl = document.getElementById('chart-student-name');
            const metricLabels = { totalNet: 'Toplam Net', Turkce: 'Türkçe', Matematik: 'Matematik', Sosyal: 'Sosyal', Fen: 'Fen', DinKulturu: 'Din Kültürü', Ingilizce: 'İngilizce', all: 'Tüm Dersler', vak: 'Öğrenme Stilleri' };
            const lastExam = [...examData].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            if (!lastExam || !lastExam.results) { renderEmptyChart('Kıyaslama için sınav sonucu bulunamadı.'); return; }
            if (nameEl) nameEl.textContent = lastExam.title + ' — Şubeler Arası Kıyaslama';
            const classes = [...new Set(Object.values(lastExam.results).map(r => r.sinif).filter(c => c))].sort();
            if (classes.length === 0) { renderEmptyChart('Sınıf bilgisi bulunamadı. Öğrencilere sınıf tanımlandığından emin olun.'); return; }
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];
            const datasets = [];
            if (metric === 'all') {
                ['Turkce', 'Matematik', 'Sosyal', 'Fen'].forEach((field, i) => {
                    datasets.push({
                        label: metricLabels[field],
                        data: classes.map(cls => {
                            const s = Object.values(lastExam.results).filter(r => r.sinif === cls);
                            if (!s.length) return 0;
                            return +(s.reduce((sum, r) => sum + (parseFloat(r[field]) || 0), 0) / s.length).toFixed(2);
                        }),
                        backgroundColor: colors[i] + 'bb', borderColor: colors[i], borderWidth: 1, borderRadius: 4
                    });
                });
            } else {
                datasets.push({
                    label: metricLabels[metric] || metric,
                    data: classes.map(cls => {
                        const s = Object.values(lastExam.results).filter(r => r.sinif === cls);
                        if (!s.length) return 0;
                        return +(s.reduce((sum, r) => sum + (parseFloat(r[metric]) || 0), 0) / s.length).toFixed(2);
                    }),
                    backgroundColor: classes.map((_, i) => colors[i % colors.length] + 'bb'),
                    borderColor: classes.map((_, i) => colors[i % colors.length]),
                    borderWidth: 1, borderRadius: 6
                });
            }
            const statsEl = document.getElementById('chart-stats');
            const classAvgs = classes.map(cls => {
                const s = Object.values(lastExam.results).filter(r => r.sinif === cls);
                if (!s.length) return { cls, avg: 0, count: 0 };
                return { cls, avg: +(s.reduce((sum, r) => sum + (parseFloat(r[metric === 'all' ? 'totalNet' : metric]) || 0), 0) / s.length).toFixed(2), count: s.length };
            });
            const best = classAvgs.reduce((a, b) => a.avg > b.avg ? a : b);
            if (statsEl) statsEl.innerHTML = classAvgs.map(c =>
                `<span style="background:var(--card-bg);border:1px solid ${c.cls === best.cls ? 'var(--secondary)' : 'var(--border)'};border-radius:8px;padding:6px 12px;font-size:11px;font-weight:700;">${c.cls}: <span style="color:var(--secondary)">${c.avg}</span> (${c.count} öğ.)${c.cls === best.cls ? ' 🏆' : ''}</span>`
            ).join('');
            renderChart('bar', classes, datasets);
        }

        // WhatsApp Veli Karne Gönderimi
        function sendExamResultToWhatsApp() {
            if (!activeChartStudentName) {
                alert("Lütfen önce bir öğrencinin 'Tekli' gelişim grafiğini açın.");
                return;
            }
            const student = studentData.find(s => s.adSoyad === activeChartStudentName);
            const sortedExams = [...examData].filter(e => e.results && e.results[activeChartStudentName])
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            if (sortedExams.length === 0) return alert("Bu öğrencinin gönderilecek sınav verisi yok.");

            const lastExam = sortedExams[sortedExams.length - 1];
            const r = lastExam.results[activeChartStudentName];

            // Trend analizi
            let trendText = "";
            if (sortedExams.length > 1) {
                const prev = sortedExams[sortedExams.length - 2].results[activeChartStudentName];
                const diff = +((r.totalNet || 0) - (prev.totalNet || 0)).toFixed(2);
                if (diff > 0) trendText = `📈 Bir önceki sınava göre *+${diff} net* artış. Tebrikler!`;
                else if (diff < 0) trendText = `📉 Bir önceki sınava göre *${diff} net* düşüş. Eksik konular tekrar edilmeli.`;
                else trendText = `➖ Bir önceki sınavla aynı net.`;
            }

            // Akıllı yorum üret
            const dersler = [
                { ad: 'Türkçe', val: parseFloat(r.Turkce) || 0 },
                { ad: 'Matematik', val: parseFloat(r.Matematik) || 0 },
                { ad: 'Fen', val: parseFloat(r.Fen) || 0 },
                { ad: 'Sosyal', val: parseFloat(r.Sosyal) || 0 },
            ];
            const enDusuk = dersler.reduce((a, b) => a.val < b.val ? a : b);
            const enYuksek = dersler.reduce((a, b) => a.val > b.val ? a : b);
            const yorum = `💡 *Analiz:* ${enYuksek.ad} alanında güçlü performans. ${enDusuk.ad} alanına odaklanılması önerilir.`;

            // Sınıf ortalaması (son sınav)
            let sinifOrtaText = '';
            if (student && student.sinif) {
                const sinifSonuclar = Object.values(lastExam.results).filter(x => x.sinif === student.sinif);
                if (sinifSonuclar.length > 1) {
                    const sinifOrt = (sinifSonuclar.reduce((s, x) => s + (parseFloat(x.totalNet) || 0), 0) / sinifSonuclar.length).toFixed(2);
                    sinifOrtaText = `📊 *Sınıf (${student.sinif}) Ortalaması:* ${sinifOrt}\n`;
                }
            }

            const mesaj = `🎓 *DENEME SINAVI SONUCU*
👤 *Öğrenci:* ${student ? student.no + ' - ' + student.adSoyad : activeChartStudentName}
🏫 *Sınıf:* ${student ? student.sinif : '-'}
📋 *Sınav:* ${lastExam.title}${lastExam.date ? ' (' + new Date(lastExam.date).toLocaleDateString('tr-TR') + ')' : ''}

📝 *DERS BAZLI NETLER:*
🇹🇷 Türkçe: *${r.Turkce || 0}*
🧮 Matematik: *${r.Matematik || 0}*
🔬 Fen: *${r.Fen || 0}*
🌍 Sosyal: *${r.Sosyal || 0}*
☪️ Din Kültürü: *${r.DinKulturu || 0}*
🇬🇧 İngilizce: *${r.Ingilizce || 0}*

🎯 *TOPLAM NET:* *${r.totalNet || 0}*  |  Sıra: *${r.rank || '-'}*
${sinifOrtaText}${trendText}

${yorum}

_Proje Tabanlı Ders İşleme Sistemi — otomatik oluşturulmuştur._`;

            window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(mesaj), '_blank');
        }
        function sendExamResultToBip() {
            let targetStudent = null;
            let lastExam = null;
            let r = null;
            let studentName = '';

            if (activeChartStudentName) {
                studentName = activeChartStudentName;
                targetStudent = studentData.find(s => s.adSoyad === activeChartStudentName);
                const sortedExams = [...examData].filter(e => e.results && e.results[activeChartStudentName])
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
                if (sortedExams.length === 0) return alert("Bu öğrencinin gönderilecek sınav verisi yok.");
                lastExam = sortedExams[sortedExams.length - 1];
                r = lastExam.results[activeChartStudentName];
            } else {
                const select = document.getElementById('exam-share-student-select');
                const examId = document.getElementById('exam-share-exam-select')?.value;
                if (!select || !select.value || !examId) return alert('Lütfen önce bir öğrencinin gelişim grafiğini açınız veya sınav ve öğrenci seçiniz.');
                studentName = select.value;
                targetStudent = studentData.find(s => s.adSoyad === studentName);
                lastExam = examData.find(e => String(e.id) === String(examId));
                if (!lastExam) return alert('Hedef sınav bulunamadı.');
                r = lastExam.results?.[studentName];
            }

            if (!r) return alert('Bu öğrenci için sınav sonucu bulunamadı.');

            // Sınıf ortalaması
            let sinifOrtaText = '';
            if (targetStudent && targetStudent.sinif && lastExam.results) {
                const sinifSonuclar = Object.values(lastExam.results).filter(x => x.sinif === targetStudent.sinif);
                if (sinifSonuclar.length > 1) {
                    const sinifOrt = (sinifSonuclar.reduce((s, x) => s + (parseFloat(x.totalNet) || 0), 0) / sinifSonuclar.length).toFixed(2);
                    sinifOrtaText = `\n📊 *Sınıf (${targetStudent.sinif}) Ortalaması:* ${sinifOrt}`;
                }
            }

            // Trend & Yorum
            let trendText = '';
            const sortedExams = [...examData].filter(e => e.results && e.results[studentName])
                .sort((a, b) => new Date(a.date) - new Date(b.date));
            if (sortedExams.length > 1) {
                const prev = sortedExams[sortedExams.length - 2].results[studentName];
                const diff = +((r.totalNet || 0) - (prev.totalNet || 0)).toFixed(2);
                if (diff > 0) trendText = `\n📈 Bir önceki sınava göre *+${diff} net* artış. Tebrikler!`;
                else if (diff < 0) trendText = `\n📉 Bir önceki sınava göre *${diff} net* düşüş. Eksik konular tekrar edilmeli.`;
                else trendText = `\n➖ Bir önceki sınavla aynı net.`;
            }

            let yorum = (r.totalNet || 0) >= 80 ? '🌟 Harika bir performans!' : (r.totalNet || 0) >= 60 ? '👍 İyi gidiyorsun!' : (r.totalNet || 0) >= 40 ? '⚠️ Biraz daha çalışman gerekiyor.' : '🔴 Ciddi çalışma gerekiyor!';

            const mesaj = `📊 *DENEME SINAVI SONUCU (BiP)*\n👤 *Öğrenci:* ${targetStudent ? targetStudent.no + ' - ' + targetStudent.adSoyad : studentName}\n🏫 *Sınıf:* ${targetStudent ? targetStudent.sinif : '-'}\n📋 *Sınav:* ${lastExam.title}${lastExam.date ? ' (' + new Date(lastExam.date).toLocaleDateString('tr-TR') + ')' : ''}\n\n📝 *DERS BAZLI NETLER:*\n🇹🇷 Türkçe: *${r.Turkce || 0}*\n🧮 Matematik: *${r.Matematik || 0}*\n🔬 Fen: *${r.Fen || 0}*\n🌍 Sosyal: *${r.Sosyal || 0}*\n☪️ Din Kültürü: *${r.DinKulturu || 0}*\n🇬🇧 İngilizce: *${r.Ingilizce || 0}*\n\n🎯 *TOPLAM NET:* *${r.totalNet || 0}*  |  Sıra: *${r.rank || '-'}*${sinifOrtaText}${trendText}\n\n💡 ${yorum}\n\n_Proje Tabanlı Ders İşleme Sistemi — otomatik oluşturulmuştur._`;

            if (typeof window.shareViaBip === 'function') {
                window.shareViaBip(mesaj, `${studentName} - Sınav Sonucu`);
            } else {
                if (typeof window.copyTextToClipboard === 'function') window.copyTextToClipboard(mesaj);
                window.open('https://web.bip.com/', '_blank');
            }
        }

        function renderEmptyChart(msg) {
            const ctx = document.getElementById('progressChart');
            if (!ctx) return;
            if (myChart) { myChart.destroy(); myChart = null; }
            const statsEl = document.getElementById('chart-stats');
            if (statsEl) statsEl.innerHTML = `<span style="color:var(--text-muted);font-size:13px;padding:10px;">${msg}</span>`;
        }

        let lastNotified = "";
        setInterval(() => {
            const now = new Date(); const daysArr = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
            const currentDay = daysArr[now.getDay()]; const currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
            const currentLesson = scheduleData.find(s => s.day === currentDay && s.time === currentTime);
            if (currentLesson && lastNotified !== (currentDay + currentTime)) {
                lastNotified = currentDay + currentTime;
                if (window.Notification && Notification.permission === "granted") {
                    new Notification("Ders Saati!", { body: `${currentLesson.lesson} başlıyor.` });
                }
                try {
                    if (window.Audio) new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
                } catch (e) { }
            }
        }, 30000);

        function updateEvalClassDropdown() {
            const select = document.getElementById('eval-class-select');
            if (!select) return;
            const currentVal = select.value;
            const classes = [...new Set(studentData.map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();

            select.innerHTML = '<option value="">-- Sınıf Seçiniz --</option>';
            classes.forEach(c => select.innerHTML += `<option value="${c}">${c}</option>`);
            if (classes.includes(currentVal)) select.value = currentVal;
        }

        function generateStudentQRs() {
            const sinif = document.getElementById('eval-class-select').value;
            const container = document.getElementById('qr-list-container');
            container.innerHTML = '';

            if (!sinif) {
                container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <i class="fas fa-qrcode fa-3x" style="margin-bottom: 15px; opacity: 0.5;"></i>
                    <p style="font-weight: 700;">QR Kodlar İçin Sınıf Seçiniz</p>
                </div>`;
                return;
            }

            const studentsInClass = studentData.filter(s => s.sinif === sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(sinif))).sort((a, b) => a.no - b.no);

            if (studentsInClass.length === 0) {
                container.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Bu sınıfta öğrenci bulunamadı.</p>';
                return;
            }

            const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

            studentsInClass.forEach(s => {
                const formALink = `${baseUrl}/dersten_once_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formVakLink = `${baseUrl}/vak_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formDELink = `${baseUrl}/dersten_sonra_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;

                const qrAUrl = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(formALink)}&color=f59e0b`;
                const qrVakUrl = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(formVakLink)}&color=0284c7`;
                const qrDEUrl = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(formDELink)}&color=8b5cf6`;

                const escapeFn = window.escapeHTML || function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); };
                const safeName = escapeFn(s.adSoyad || '-');
                const safeNo = escapeFn(s.no || '-');

                const card = document.createElement('div');
                card.style = "background: var(--card-bg); padding: 15px; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; gap:12px;";

                card.innerHTML = `
                <div style="border-bottom: 1px solid var(--border); padding-bottom: 8px;">
                    <h5 style="margin: 0; color: var(--primary); font-size: 15px;"><i class="fas fa-user-graduate me-2"></i> ${safeNo} - ${safeName}</h5>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(245, 158, 11, 0.05); padding: 8px; border-radius: 8px; border: 1px dashed var(--yellow);">
                        <div style="background: white; padding: 3px; border-radius: 4px; border: 1px solid #ddd;">
                            <img src="${qrAUrl}" alt="A Form QR" style="width: 65px; height: 65px; display: block;">
                        </div>
                        <div style="flex: 1;">
                            <span style="font-size: 10.5px; font-weight: 800; color: var(--yellow); text-transform: uppercase;">1. Aşama (Önce)</span>
                            <div style="display:flex; gap:4px; margin-top:4px;">
                                <a href="${formALink}" target="_blank" class="btn" style="padding: 3px 6px; font-size: 9.5px; background: var(--yellow); color: black; text-decoration: none; flex:1; text-align:center;">Aç</a>
                                <button class="btn" style="padding: 3px 6px; font-size: 9.5px; background: var(--text-muted); flex:1;" onclick="copyToClipboard('${formALink}')">Kopyala</button>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(139, 92, 246, 0.05); padding: 8px; border-radius: 8px; border: 1px dashed #8b5cf6;">
                        <div style="background: white; padding: 3px; border-radius: 4px; border: 1px solid #ddd;">
                            <img src="${qrDEUrl}" alt="D-E Form QR" style="width: 65px; height: 65px; display: block;">
                        </div>
                        <div style="flex: 1;">
                            <span style="font-size: 10.5px; font-weight: 800; color: #8b5cf6; text-transform: uppercase;">3. Aşama (Sonra)</span>
                            <div style="display:flex; gap:4px; margin-top:4px;">
                                <a href="${formDELink}" target="_blank" class="btn" style="padding: 3px 6px; font-size: 9.5px; background: #8b5cf6; text-decoration: none; flex:1; text-align:center;">Aç</a>
                                <button class="btn" style="padding: 3px 6px; font-size: 9.5px; background: var(--text-muted); flex:1;" onclick="copyToClipboard('${formDELink}')">Kopyala</button>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(2, 132, 199, 0.05); padding: 8px; border-radius: 8px; border: 1px dashed #0284c7;">
                        <div style="background: white; padding: 3px; border-radius: 4px; border: 1px solid #ddd;">
                            <img src="${qrVakUrl}" alt="VAK Form QR" style="width: 65px; height: 65px; display: block;">
                        </div>
                        <div style="flex: 1;">
                            <span style="font-size: 10.5px; font-weight: 800; color: #0284c7; text-transform: uppercase;">Bilişsel Stil (VAK)</span>
                            <div style="display:flex; gap:4px; margin-top:4px;">
                                <a href="${formVakLink}" target="_blank" class="btn" style="padding: 3px 6px; font-size: 9.5px; background: #0284c7; color: white; text-decoration: none; flex:1; text-align:center;">Aç</a>
                                <button class="btn" style="padding: 3px 6px; font-size: 9.5px; background: var(--text-muted); flex:1;" onclick="copyToClipboard('${formVakLink}')">Kopyala</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                container.appendChild(card);
            });
        }

        function printQRCodes() {
            const sinif = document.getElementById('eval-class-select').value;
            if (!sinif) return alert('Lütfen önce PDF olarak indirmek/yazdırmak istediğiniz sınıfı seçin.');

            const studentsInClass = studentData.filter(s => s.sinif === sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(sinif))).sort((a, b) => a.no - b.no);
            if (studentsInClass.length === 0) return alert('Bu sınıfta yazdırılacak öğrenci bulunamadı.');

            const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            const printWindow = window.open('', '_blank');

            const escapeFn = window.escapeHTML || function(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); };
            const safeSinifTitle = escapeFn(sinif);

            let html = `<!DOCTYPE html>
        <html>
        <head>
            <title>${safeSinifTitle} Sınıfı - Öğrenci QR Kodları</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #1e293b; margin-bottom: 25px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
                .student-card { border: 2px dashed #cbd5e1; padding: 12px; border-radius: 12px; break-inside: avoid; page-break-inside: avoid; }
                .student-name { font-size: 15px; font-weight: bold; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-bottom: 10px; color: #0f172a; }
                .qr-container { display: flex; justify-content: space-around; gap: 8px; }
                .qr-box { text-align: center; }
                .qr-box img { width: 85px; height: 85px; margin-bottom: 4px; }
                .qr-title { font-size: 11px; font-weight: bold; }
                .color-1 { color: #d97706; }
                .color-2 { color: #0284c7; }
                .color-3 { color: #6d28d9; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h1>${safeSinifTitle} Sınıfı - Öğrenci QR Kodları</h1>
            <div class="grid">`;

            studentsInClass.forEach(s => {
                const safeName = escapeFn(s.adSoyad || '');
                const safeNo = escapeFn(s.no || '');
                const formALink = `${baseUrl}/dersten_once_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formVakLink = `${baseUrl}/vak_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formDELink = `${baseUrl}/dersten_sonra_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;

                // Higher resolution for printing
                const qrAUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formALink)}&color=f59e0b`;
                const qrVakUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formVakLink)}&color=0284c7`;
                const qrDEUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formDELink)}&color=8b5cf6`;

                html += `
                <div class="student-card">
                    <div class="student-name">${safeNo} - ${safeName}</div>
                    <div class="qr-container">
                        <div class="qr-box">
                            <img src="${qrAUrl}" alt="QR">
                            <div class="qr-title color-1">1. AŞAMA</div>
                            <div style="font-size:9.5px; color:#64748b;">(Dersten Önce)</div>
                        </div>
                        <div class="qr-box">
                            <img src="${qrDEUrl}" alt="QR">
                            <div class="qr-title color-3">3. AŞAMA</div>
                            <div style="font-size:9.5px; color:#64748b;">(Dersten Sonra)</div>
                        </div>
                        <div class="qr-box">
                            <img src="${qrVakUrl}" alt="QR">
                            <div class="qr-title color-2">BİLİŞSEL STİL</div>
                            <div style="font-size:9.5px; color:#64748b;">(VAK Envanteri)</div>
                        </div>
                    </div>
                </div>`;
            });

            html += `
            </div>
            <script>
                window.onload = () => {
                    setTimeout(() => { window.print(); }, 1000);
                }
            <\/script>
        </body>
        </html>`;

            printWindow.document.write(html);
            printWindow.document.close();
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert("Link kopyalandı!");
            }).catch(err => {
                console.error('Kopyalama başarısız', err);
            });
        }

        // Global window dışa aktarımları
        window.renderExams = renderExams;
        window.deleteExam = deleteExam;
        window.openExamEvaluation = openExamEvaluation;
        window.deleteStudentFromExam = deleteStudentFromExam;
        window.deleteSelectedStudentsFromExam = deleteSelectedStudentsFromExam;
        window.toggleAllExamStudentCheckboxes = toggleAllExamStudentCheckboxes;
        window.updateExamSelectedCount = updateExamSelectedCount;
        window.updateManualExamCell = updateManualExamCell;
        window.updateExamMeta = updateExamMeta;
        window.saveExamMeta = saveExamMeta;
        window.openExamImportWizard = openExamImportWizard;
        window.closeExamImportWizard = closeExamImportWizard;
        window.executeExamImport = executeExamImport;
        window.openUnmatchedStudentsModal = openUnmatchedStudentsModal;
        window.closeUnmatchedStudentsModal = closeUnmatchedStudentsModal;
        window.matchUnmatchedRow = matchUnmatchedRow;
        window.ignoreUnmatchedRow = ignoreUnmatchedRow;
        window.resetUnmatchedRow = resetUnmatchedRow;
        window.ignoreAllRemainingUnmatched = ignoreAllRemainingUnmatched;
        window.filterUnmatchedModalTable = filterUnmatchedModalTable;
        window.commitVerifiedExamImport = commitVerifiedExamImport;
        window.toggleWizardSelectAll = toggleWizardSelectAll;
        window.toggleWizardRow = toggleWizardRow;
        window.selectAllWizardRows = selectAllWizardRows;
        window.selectWizardRowsByFilter = selectWizardRowsByFilter;
        window.handleExamFileDrop = handleExamFileDrop;
        window.handleExamFileSelect = handleExamFileSelect;
        window.syncAllExamsToKocluk = syncAllExamsToKocluk;
        window.syncSingleStudentExamToKocluk = syncSingleStudentExamToKocluk;
        window.sortExamEvaluationTable = sortExamEvaluationTable;
        window.editExamColumnHeader = editExamColumnHeader;
        window.openEditExamHeadersModal = openEditExamHeadersModal;
        window.autoAssignExamRanks = autoAssignExamRanks;
        window.closeEvaluation = closeEvaluation;
        window.ileriSinifDoldur = ileriSinifDoldur;
        window.ileriGrupAnalizEt = ileriGrupAnalizEt;
        window.ileriGrupKaydet = ileriGrupKaydet;
        window.ileriGrupProjeAktar = ileriGrupProjeAktar;
        window.ileriGrupWhatsapp = ileriGrupWhatsapp;
        window.ileriGrupPaylas = ileriGrupWhatsapp;
        window.ileriGrupBip = ileriGrupBip;
        window.ileriGrupBipPaylas = ileriGrupBip;
        window.ileriGrupRenderExisting = ileriGrupRenderExisting;
        window.ileriGrupRenderSonuclar = ileriGrupRenderSonuclar;

        // ══════════════════════════════════════════════
        // TAB 9 — PROJE GRUPLARI SİSTEMİ
        // ══════════════════════════════════════════════
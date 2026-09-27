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
            examData.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(exam => {
                const classStr = exam.classes ? exam.classes.join(', ') : (exam.sinif || 'Belirsiz');
                const resultCount = exam.results ? Object.keys(exam.results).length : 0; // Firebase boş objeleri sildiği için güvenlik kontrolü
                const card = document.createElement('div'); card.className = 'form-box'; card.style = "margin-bottom:15px; border-left: 5px solid var(--teal);";
                card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;">
                <div><h4 style="margin:0; color:var(--teal);">${exam.title}</h4><p style="font-size:12px; margin:4px 0; color:var(--text-muted);"><i class="fas fa-calendar-alt"></i> ${new Date(exam.date).toLocaleDateString('tr-TR')} | Sınıflar: ${classStr}</p><p style="font-size:12px; font-weight:600; color:var(--secondary); margin:0;">Veritabanı Toplam Kayıt: ${resultCount}</p></div>
                <div style="display:flex; gap:8px;"><button class="btn" style="padding:5px 12px; font-size:11px; background:var(--teal);" onclick="openExamEvaluation('${exam.id}')"><i class="fas fa-edit"></i> Detaylar / Düzenle</button>
                <button class="action-btn btn-delete" onclick="deleteExam('${exam.id}')"><i class="fas fa-trash"></i></button></div></div>`;
                list.appendChild(card);
            });
        }

        function deleteExam(id) { if (confirm('Bu sınavı silmek istiyor musunuz?')) { examData = examData.filter(e => String(e.id) !== String(id)); saveData(); renderExams(); updateExamUploadDropdowns(); } }

        function handleExamExcelData(input) {
            const file = input.files[0]; if (!file) return;
            const activeExamIdStr = document.getElementById('active-exam-upload-select').value;
            if (!activeExamIdStr) { alert("Lütfen hedef deneme sınavını seçin!"); input.value = ''; return; }
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result); const workbook = XLSX.read(data, { type: 'array' });
                const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, defval: "" });
                if (rows.length < 2) return alert("Excel geçersiz başlık yapısı içeriyor.");
                let headerIndex = 0;
                for (let i = 0; i < rows.length; i++) { if (rows[i].filter(c => c !== "").length > 2) { headerIndex = i; break; } }
                tempExcelHeaders = rows[headerIndex].map(h => h.toString().trim());
                tempExcelRows = rows.slice(headerIndex + 1);
                buildMappingInterface();
            }; reader.readAsArrayBuffer(file);
        }

        function buildMappingInterface() {
            const container = document.getElementById('mapping-container'); const fieldsDiv = document.getElementById('mapping-fields');
            container.style.display = 'block'; fieldsDiv.innerHTML = '';
            const coreFields = [
                { id: 'studentNo', label: 'Öğrenci No Sütunu' }, { id: 'studentName', label: 'Ad Soyad Sütunu' },
                { id: 'studentClass', label: 'Sınıf Sütunu (Opsiyonel)' },
                { id: 'turkceNet', label: 'Türkçe Net' }, { id: 'matNet', label: 'Matematik Net' },
                { id: 'sosyalNet', label: 'Sosyal Bilgiler Net' }, { id: 'fenNet', label: 'Fen Bilimleri Net' },
                { id: 'dinNet', label: 'Din Kültürü Net' }, { id: 'ingNet', label: 'İngilizce Net' },
                { id: 'totalNet', label: 'Toplam Net' }, { id: 'rank', label: 'Sıra/Derece (Opsiyonel)' }
            ];
            coreFields.forEach(field => {
                let optionsHtml = `<option value="">-- Sıfır/Otomatik --</option>`;
                tempExcelHeaders.forEach((header, index) => {
                    let selected = ""; let cleanH = header.toLocaleLowerCase('tr-TR');
                    if (field.id === 'studentNo' && /\b(no|numara)\b/.test(cleanH)) selected = "selected";
                    else if (field.id === 'studentName' && /\b(ad|soyad|isim)\b/.test(cleanH)) selected = "selected";
                    else if (field.id === 'studentClass' && /\b(sınıf|sinif|şube|sube)\b/.test(cleanH)) selected = "selected";
                    else if (field.id === 'turkceNet' && cleanH.includes('tür') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'matNet' && cleanH.includes('mat') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'sosyalNet' && cleanH.includes('sos') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'fenNet' && cleanH.includes('fen') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'dinNet' && cleanH.includes('din') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'ingNet' && cleanH.includes('ing') && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'totalNet' && (cleanH.includes('top') || cleanH.includes('genel')) && cleanH.includes('net')) selected = "selected";
                    else if (field.id === 'rank' && /\b(sıra|sira|derece)\b/.test(cleanH)) selected = "selected";
                    optionsHtml += `<option value="${index}" ${selected}>${header}</option>`;
                });
                fieldsDiv.innerHTML += `<div style="display:flex; flex-direction:column;"><label style="font-size:11px; font-weight:600;">${field.label}:</label><select id="map-${field.id}" style="padding:6px; font-size:12px; border-radius:6px; border:1px solid var(--border); background:var(--card-bg); color:var(--text-main);">${optionsHtml}</select></div>`;
            });
        }

        function processMappedExcel() {
            const examId = parseInt(document.getElementById('active-exam-upload-select').value); const exam = examData.find(e => e.id === examId);
            if (!exam) return alert("Hedef sınav bulunamadı.");
            const examClasses = exam.classes || (exam.sinif ? [exam.sinif] : []);
            const maps = { studentNo: document.getElementById('map-studentNo').value, studentName: document.getElementById('map-studentName').value, studentClass: document.getElementById('map-studentClass').value, turkceNet: document.getElementById('map-turkceNet').value, matNet: document.getElementById('map-matNet').value, sosyalNet: document.getElementById('map-sosyalNet').value, fenNet: document.getElementById('map-fenNet').value, dinNet: document.getElementById('map-dinNet').value, ingNet: document.getElementById('map-ingNet').value, totalNet: document.getElementById('map-totalNet').value, rank: document.getElementById('map-rank').value };
            if (maps.studentName === "") return alert("En azından 'Ad Soyad' sütununu seçmelisiniz.");

            let count = 0;
            tempExcelRows.forEach(row => {
                if (!row || row.length === 0 || row[maps.studentName] === "") return;
                let name = row[maps.studentName].toString().trim(); let no = maps.studentNo !== "" ? row[maps.studentNo].toString().trim() : "";
                let rowClass = maps.studentClass !== "" ? row[maps.studentClass].toString().trim().toUpperCase() : "";
                let student = studentData.find(s => (s.adSoyad.toLocaleLowerCase('tr-TR') === name.toLocaleLowerCase('tr-TR') || (no !== "" && s.no.toString() === no.toString())) && examClasses.includes(s.sinif));
                if (!student && rowClass !== "" && !examClasses.includes(rowClass)) return;
                const studentKey = student ? student.adSoyad : name; const finalClass = student ? student.sinif : rowClass;

                exam.results[studentKey] = {
                    no: student ? student.no : no, sinif: finalClass,
                    Turkce: parseFloat(row[maps.turkceNet]) || 0, Matematik: parseFloat(row[maps.matNet]) || 0,
                    Sosyal: parseFloat(row[maps.sosyalNet]) || 0, Fen: parseFloat(row[maps.fenNet]) || 0,
                    DinKulturu: parseFloat(row[maps.dinNet]) || 0, Ingilizce: parseFloat(row[maps.ingNet]) || 0,
                    totalNet: maps.totalNet !== "" ? (parseFloat(row[maps.totalNet]) || 0) : null, rank: maps.rank !== "" ? row[maps.rank].toString() : "-"
                };
                if (exam.results[studentKey].totalNet === null) {
                    exam.results[studentKey].totalNet = exam.results[studentKey].Turkce + exam.results[studentKey].Matematik + exam.results[studentKey].Sosyal + exam.results[studentKey].Fen + exam.results[studentKey].DinKulturu + exam.results[studentKey].Ingilizce;
                }
                count++;
            });
            saveData(); renderExams(); document.getElementById('mapping-container').style.display = 'none'; document.getElementById('exam-import-file').value = ''; alert(`Başarıyla ${count} öğrenciye ait deneme verisi veritabanına aktarıldı.`);
        }

        function openExamEvaluation(id) {
            activeExamId = id; activeTrackingId = null; const exam = examData.find(e => String(e.id) === String(id));
            if (!exam) return;
            const examClasses = exam.classes || (exam.sinif ? [exam.sinif] : []);
            const students = studentData.filter(s => examClasses.includes(s.sinif));

            document.getElementById('eval-title').textContent = `${exam.title} - Ortak Sınav Sonuç Tablosu`;
            document.getElementById('eval-info').textContent = `Dahil Sınıflar: ${examClasses.join(', ')} | Toplam: ${students.length} Öğrenci`;
            document.querySelector('#evaluation-modal thead tr').innerHTML = `<th>Öğrenci</th><th>Sınıf</th><th style="width:55px;">TR</th><th style="width:55px;">MAT</th><th style="width:55px;">SOS</th><th style="width:55px;">FEN</th><th style="width:55px;">DİN</th><th style="width:55px;">İNG</th><th style="width:70px;">Top.Net</th><th style="width:50px;">Sıra</th><th>İşlem</th>`;

            const body = document.getElementById('eval-body'); body.innerHTML = '';
            students.sort((a, b) => a.sinif.localeCompare(b.sinif) || a.no - b.no).forEach(s => {
                const res = exam.results[s.adSoyad] || { Turkce: '', Matematik: '', Sosyal: '', Fen: '', DinKulturu: '', Ingilizce: '', totalNet: '', rank: '' };
                const tr = document.createElement('tr');
                tr.innerHTML = `<td style="font-weight:600; font-size:13px;">${s.no} - ${s.adSoyad}</td>
                <td style="font-weight:700; color:var(--secondary); font-size:12px;">${s.sinif}</td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="Turkce" value="${res.Turkce}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="Matematik" value="${res.Matematik}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="Sosyal" value="${res.Sosyal}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="Fen" value="${res.Fen}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="DinKulturu" value="${res.DinKulturu || ''}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" class="exam-input" data-name="${s.adSoyad}" data-field="Ingilizce" value="${res.Ingilizce || ''}" style="width:42px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><input type="number" step="0.01" id="total-${s.adSoyad.replace(/\s+/g, '')}" value="${res.totalNet}" style="width:55px; padding:4px; font-weight:700; background:var(--tab-bg);" readonly></td>
                <td><input type="text" class="exam-input" data-name="${s.adSoyad}" data-field="rank" value="${res.rank}" style="width:38px; padding:4px;" onchange="updateManualExamCell(this)"></td>
                <td><button class="btn" style="padding:4px 8px; font-size:10px; background:var(--secondary);" onclick="renderProgressChart('${s.adSoyad}')"><i class="fas fa-chart-line"></i> Grafik</button></td>`;
                body.appendChild(tr);
            });
            document.getElementById('evaluation-modal').style.display = 'block';
        }

        function updateManualExamCell(input) {
            const name = input.getAttribute('data-name'); const field = input.getAttribute('data-field'); const exam = examData.find(e => e.id === activeExamId);
            if (!exam.results[name]) { exam.results[name] = { no: "", sinif: "", Turkce: 0, Matematik: 0, Sosyal: 0, Fen: 0, DinKulturu: 0, Ingilizce: 0, totalNet: 0, rank: "-" }; const s = studentData.find(st => st.adSoyad === name); if (s) { exam.results[name].no = s.no; exam.results[name].sinif = s.sinif; } }
            if (field === 'rank') exam.results[name].rank = input.value; else exam.results[name][field] = parseFloat(input.value) || 0;
            exam.results[name].totalNet = exam.results[name].Turkce + exam.results[name].Matematik + exam.results[name].Sosyal + exam.results[name].Fen + (exam.results[name].DinKulturu || 0) + (exam.results[name].Ingilizce || 0);
            const targetF = document.getElementById(`total-${name.replace(/\s+/g, '')}`); if (targetF) targetF.value = exam.results[name].totalNet;
            saveData();
        }

        // ── İLERİ ÇALIŞMA GRUPLARI SİSTEMİ ──

        let advancedGroupData = []; // Oluşturulan ileri grup verileri

        function ileriSinifDoldur() {
            const sel = document.getElementById('ileri-sinif');
            if (!sel) return;
            const siniflar = [...new Set(studentData.map(s => s.sinif).filter(Boolean))].sort();
            sel.innerHTML = '<option value="">Tüm Sınıflar</option>' + siniflar.map(s => `<option value="${s}">${s}</option>`).join('');
        }

        function ileriGrupAnalizEt() {
            const sinifFiltre = document.getElementById('ileri-sinif').value;
            const grupBoyut = parseInt(document.querySelector('input[name="ileri-grup-boyut"]:checked').value) || 4;
            const esik = parseInt(document.getElementById('ileri-esik').value) || 30;
            const kritXP = document.getElementById('krit-xp').checked;
            const kritOdev = document.getElementById('krit-odev').checked;
            const kritSinav = document.getElementById('krit-sinav').checked;
            const kritKatilim = document.getElementById('krit-katilim').checked;

            const hedefOgrenciler = studentData.filter(s => sinifFiltre ? s.sinif === sinifFiltre : true);
            if (hedefOgrenciler.length < 2) {
                document.getElementById('ileri-result-panel').innerHTML = '<div style="padding:30px;text-align:center;color:var(--text-muted);">Bu sınıfta yeterli öğrenci bulunamadı.</div>';
                return;
            }

            // Her öğrenciye skor hesapla
            const skorlar = hedefOgrenciler.map(s => {
                let toplam = 0; let agirlik = 0;

                // XP skoru — min-max normalizasyonu (negatif XP değerlerine karşı güvenli)
                if (kritXP) {
                    const allXP = hedefOgrenciler.map(x => x.xp || 0);
                    const minXP = Math.min(...allXP);
                    const maxXP = Math.max(...allXP);
                    const range = maxXP - minXP;
                    const xpNorm = range > 0 ? (((s.xp || 0) - minXP) / range) * 100 : 50;
                    toplam += xpNorm * 0.30; agirlik += 0.30;
                }

                // Ödev teslim oranı
                if (kritOdev) {
                    const odevler = trackingData.filter(t => t.sinif === s.sinif || !t.sinif);
                    const teslimSayisi = odevler.filter(t => t.submissions && t.submissions[s.adSoyad] && t.submissions[s.adSoyad].done).length;
                    const odevOran = odevler.length > 0 ? (teslimSayisi / odevler.length) * 100 : 50;
                    toplam += odevOran * 0.30; agirlik += 0.30;
                }

                // Sınav net ortalaması
                if (kritSinav) {
                    const sinav = examData.filter(e => e.results && e.results[s.adSoyad]);
                    const netleri = sinav.map(e => parseFloat(e.results[s.adSoyad].totalNet) || 0);
                    const maxNet = Math.max(...examData.flatMap(e => Object.values(e.results || {}).map(r => parseFloat(r.totalNet) || 0)), 1);
                    const sinav_ort = netleri.length ? (netleri.reduce((a, b) => a + b, 0) / netleri.length) : 0;
                    const sinavNorm = (sinav_ort / maxNet) * 100;
                    toplam += sinavNorm * 0.30; agirlik += 0.30;
                }

                // Form katılımı (sabit puan — veri yoksa orta değer ver)
                if (kritKatilim) {
                    // Form verisi yerel formlardan gelir; şimdilik XP'ye bağlı tahmin
                    const katilimSkor = Math.min(((s.xp || 0) > 10 ? 70 : 40) + Math.random() * 20, 100);
                    toplam += katilimSkor * 0.10; agirlik += 0.10;
                }

                const normalSkor = agirlik > 0 ? toplam / agirlik : 0;
                return { ...s, _skor: +normalSkor.toFixed(2) };
            });

            // Sırala
            skorlar.sort((a, b) => b._skor - a._skor);

            // Eşik: üst %X ileri grupta
            const ileriSayisi = Math.max(Math.round(skorlar.length * esik / 100), grupBoyut);
            const ileriOgrenciler = skorlar.slice(0, ileriSayisi);
            const normalOgrenciler = skorlar.slice(ileriSayisi);

            // Grupları oluştur
            const gruplar = [];
            for (let i = 0; i < ileriOgrenciler.length; i += grupBoyut) {
                gruplar.push(ileriOgrenciler.slice(i, i + grupBoyut));
            }

            advancedGroupData = gruplar;

            // Özet paneli
            const ozetPanel = document.getElementById('ileri-ozet-panel');
            const ozetContent = document.getElementById('ileri-ozet-content');
            ozetPanel.style.display = 'block';
            ozetContent.innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;">
                <div style="background:var(--input-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                    <div style="font-size:22px;font-weight:700;color:var(--secondary);">${ileriOgrenciler.length}</div>
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
                Eşik: üst <strong>%${esik}</strong> — Aktif kriterler: 
                ${[kritXP ? 'XP' : null, kritOdev ? 'Ödev' : null, kritSinav ? 'Sınav' : null, kritKatilim ? 'Form' : null].filter(Boolean).join(', ')}
            </div>`;

            // Sonuç paneli
            let resultHtml = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;flex-wrap:wrap;gap:8px;">
                <h4 style="margin:0;color:var(--secondary);"><i class="fas fa-layer-group me-2"></i>İleri Çalışma Grupları</h4>
                <div style="display:flex;gap:8px;">
                    <button class="btn" style="font-size:11px;padding:5px 12px;background:#8b5cf6;" onclick="ileriGrupProjeAktar()"><i class="fas fa-project-diagram me-1"></i>Sisteme Aktar (Proje & Sınıf Yönetimi)</button>
                    <button class="btn" style="font-size:11px;padding:5px 12px;background:#25D366;" onclick="ileriGrupWhatsapp()"><i class="fab fa-whatsapp me-1"></i>Velilere WA</button>
                    <button class="btn" style="font-size:11px;padding:5px 12px;background:#00B2FF;" onclick="ileriGrupBip()"><i class="fas fa-comment-dots me-1"></i>Velilere BiP</button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:15px;">`;

            const rollerler = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];
            const renkler = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#7f8c8d'];

            gruplar.forEach((grup, gi) => {
                resultHtml += `
                <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow);">
                    <div style="background:linear-gradient(135deg,var(--secondary),#8b5cf6);padding:12px 15px;color:white;">
                        <div style="font-weight:700;font-size:14px;"><i class="fas fa-rocket me-2"></i>İleri Grup ${gi + 1}</div>
                        <div style="font-size:11px;opacity:0.85;">${grup.length} öğrenci · ${sinifFiltre || 'Karma Sınıf'}</div>
                    </div>
                    <div style="padding:12px;">`;
                grup.forEach((ogr, oi) => {
                    const rol = rollerler[Math.min(oi, rollerler.length - 1)];
                    const renk = renkler[Math.min(oi, renkler.length - 1)];
                    const skorBar = Math.max(0, Math.min(100, Math.round(ogr._skor)));
                    resultHtml += `
                        <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
                            <div style="flex:1;">
                                <div style="font-weight:600;font-size:13px;">${ogr.no ? ogr.no + ' - ' : ''}${ogr.adSoyad}</div>
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
                    resultHtml += `<span style="background:var(--input-bg);border:1px solid var(--border);border-radius:20px;padding:4px 10px;font-size:12px;">${o.adSoyad} <span style="color:var(--text-muted);">${o._skor}p</span></span>`;
                });
                resultHtml += '</div></div>';
            }

            document.getElementById('ileri-result-panel').innerHTML = resultHtml;
        }

        function ileriGrupKaydet() {
            if (!advancedGroupData || advancedGroupData.length === 0) return alert('Önce analiz yapın!');
            const container = document.getElementById('groups-container');
            if (!container) return alert('Sınıf Yönetimi sekmesindeki grup konteynerine erişilemiyor.');

            const rollerler = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];
            const renklerHex = ['#e74c3c', '#3498db', '#f1c40f', '#9b59b6', '#7f8c8d'];

            advancedGroupData.forEach((grup, gi) => {
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
                    liHtml += `<li style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);padding-bottom:10px;">
                    <div style="display:flex;flex-direction:column;gap:2px;">
                        <span class="student-name-text" data-name="${ogr.adSoyad}" style="font-weight:600;font-size:14px;">${ogr.no} - ${ogr.adSoyad}</span>
                        <div style="display:flex;align-items:center;gap:5px;">
                            <span class="xp-badge" style="font-size:10px;padding:1px 5px;">${ogr.xp || 0} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${ogr.adSoyad}',1)">+</button>
                            <button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${ogr.adSoyad}',-1)">-</button>
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
                        <button class="btn-remove-student" onclick="this.closest('li').remove();updateStudentPickers();saveData();"><i class="fas fa-user-minus"></i></button>
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

            document.querySelectorAll('.role-select').forEach(sel => updateRoleColor(sel));
            updateStudentPickers(); saveData();
            alert(`✅ ${advancedGroupData.length} İleri çalışma grubu "Sınıf Yönetimi" sekmesine aktarıldı ve öğrenciler eski kümelerinden çıkarıldı!`);
            openTab('tab2');
        }

        function ileriGrupWhatsapp() {
            if (!advancedGroupData || advancedGroupData.length === 0) return alert('Önce analiz yapın!');
            let mesaj = '🚀 *İLERİ ÇALIŞMA GRUPLARI*\n\n';
            advancedGroupData.forEach((grup, gi) => {
                mesaj += `📦 *İleri Grup ${gi + 1}:*\n`;
                grup.forEach((o, oi) => { mesaj += `   ${oi + 1}. ${o.adSoyad} (${o._skor}p)\n`; });
                mesaj += '\n';
            });
            mesaj += '_Proje Tabanlı Ders İşleme Sistemi tarafından oluşturulmuştur._';
            window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(mesaj), '_blank');
        }
        function ileriGrupBip() {
            if (!advancedGroupData || advancedGroupData.length === 0) return alert('Önce analiz yapın!');
            let mesaj = '🚀 *İLERİ ÇALIŞMA GRUPLARI*\n\n';
            advancedGroupData.forEach((grup, gi) => {
                mesaj += `📦 *İleri Grup ${gi + 1}:*\n`;
                grup.forEach((o, oi) => { mesaj += `   ${oi + 1}. ${o.adSoyad} (${o._skor}p)\n`; });
                mesaj += '\n';
            });
            mesaj += '_Proje Tabanlı Ders İşleme Sistemi tarafından oluşturulmuştur._';
            window.open('https://web.bip.com/share?text=' + encodeURIComponent(mesaj), '_blank');
        }

        function ileriGrupProjeAktar() {
            if (!advancedGroupData || advancedGroupData.length === 0) return alert('Önce analiz yapın!');

            let actCount = 0;
            advancedGroupData.forEach((grup, gi) => {
                if (grup.length < 1) return;
                // Sınıf bilgisini ilk öğrenciden al
                let sinif = '';
                const testSt = studentData.find(s => s.adSoyad === grup[0].adSoyad);
                if (testSt) sinif = testSt.sinif;

                const members = grup.map(ogr => {
                    const s = studentData.find(st => st.adSoyad === ogr.adSoyad) || {};
                    return { name: ogr.adSoyad, no: s.no || '', score: 50, aktif: true, katilimSayisi: 0, sonIslem: null };
                });

                const pGrup = {
                    id: Date.now() + gi,
                    title: '🚀 İleri Proje Grubu ' + (gi + 1),
                    ders: 'İleri Çalışma',
                    type: 'teori', // Varsayılan: Teori
                    sinif: sinif || 'Belirsiz Sınıf',
                    desc: 'Yapay Zeka (Algoritma) analizi sonucu üst düzey performanstan dolayı otomatik oluşturulmuştur.',
                    odevLinks: [],
                    members: members,
                    asamalar: PG_ASAMALAR.map((label, i) => ({
                        label, durum: i === 0 ? 'active' : 'pending',
                        not: '', tarih: null
                    })),
                    mesajlar: [],
                    olusturma: new Date().toLocaleDateString('tr-TR')
                };

                projeGruplariData.push(pGrup);
                actCount++;
            });

            if (actCount > 0) {
                pgSave();
                pgRenderList();
                if (typeof pgUpdateTypeCounts === 'function') pgUpdateTypeCounts();
                alert(actCount + ' adet ileri düzey çalışma grubu, "10. Proje Grupları" sekmesine başarıyla eklendi! Sekmeye giderek grupları yönetebilirsiniz.');
                openTab('tab9');
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

            let filteredStudents = studentData.filter(s => classFilter ? s.sinif === classFilter : true);
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

            let filteredStudents = studentData.filter(s => classFilter ? s.sinif === classFilter : true);

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
            const select = document.getElementById('exam-share-student-select');
            const examId = document.getElementById('exam-share-exam-select')?.value;
            if (!select || !examId) return alert('Lütfen sınav ve öğrenci seçiniz.');
            const studentName = select.value;
            const exam = examData.find(e => String(e.id) === String(examId)); if (!exam) return;
            const r = exam.results?.[studentName]; if (!r) return alert('Bu öğrenci için sonuç bulunamadı.');
            const sinifNets = Object.values(exam.results || {});
            const sinifOrta = sinifNets.length ? (sinifNets.reduce((a, b) => a + (b.totalNet || 0), 0) / sinifNets.length).toFixed(1) : '-';
            const trendEmoji = r.trend > 0 ? '📈' : r.trend < 0 ? '📉' : '➡️';
            const sinifOrtaText = sinifOrta !== '-' ? `\n🏫 Sınıf Orta: *${sinifOrta}*` : '';
            const trendText = r.trend !== undefined && r.trend !== 0 ? `\n${trendEmoji} Değişim: *${r.trend > 0 ? '+' : ''}${r.trend}*` : '';
            let yorum = r.totalNet >= 80 ? '🌟 Harika bir performans!' : r.totalNet >= 60 ? '👍 İyi gidiyorsun!' : r.totalNet >= 40 ? '⚠️ Biraz daha çalışman gerekiyor.' : '🔴 Ciddi çalışma gerekiyor!';
            let mesaj = `📊 *SINAV SONUÇ RAPORU*\n📚 *Sınav:* ${exam.title}\n👤 *Öğrenci:* ${studentName}\n📅 *Tarih:* ${new Date(exam.date).toLocaleDateString('tr-TR')}\n\n📝 *DERS NETLERI:*\n📐 Mat: *${r.Matematik || 0}*\n📖 Türkçe: *${r.Turkce || 0}*\n🔬 Fen: *${r.Fen || 0}*\n🌍 Sosyal: *${r.Sosyal || 0}*\n☪️ Din Kültürü: *${r.DinKulturu || 0}*\n🇬🇧 İngilizce: *${r.Ingilizce || 0}*\n\n🎯 *TOPLAM NET:* *${r.totalNet || 0}*  |  Sıra: *${r.rank || '-'}*${sinifOrtaText}${trendText}\n\n${yorum}\n\n_Proje Tabanlı Ders İşleme Sistemi — otomatik oluşturulmuştur._`;
            window.open('https://web.bip.com/share?text=' + encodeURIComponent(mesaj), '_blank');
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
                if (Notification.permission === "granted") { new Notification("Ders Saati!", { body: `${currentLesson.lesson} başlıyor.` }); } else { alert(`${currentLesson.lesson} başlıyor.`); }
                try { new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play(); } catch (e) { }
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

            const studentsInClass = studentData.filter(s => s.sinif === sinif).sort((a, b) => a.no - b.no);

            if (studentsInClass.length === 0) {
                container.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Bu sınıfta öğrenci bulunamadı.</p>';
                return;
            }

            const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

            studentsInClass.forEach(s => {
                const formALink = `${baseUrl}/dersten_once_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formDELink = `${baseUrl}/dersten_sonra_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;

                const qrAUrl = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(formALink)}&color=f59e0b`;
                const qrDEUrl = `https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${encodeURIComponent(formDELink)}&color=8b5cf6`;

                const card = document.createElement('div');
                card.style = "background: var(--card-bg); padding: 15px; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; gap:15px;";

                card.innerHTML = `
                <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px;">
                    <h5 style="margin: 0; color: var(--primary); font-size: 15px;"><i class="fas fa-user-graduate me-2"></i> ${s.no} - ${s.adSoyad}</h5>
                </div>
                
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 200px; display: flex; align-items: center; gap: 15px; background: rgba(245, 158, 11, 0.05); padding: 10px; border-radius: 8px; border: 1px dashed var(--yellow);">
                        <div style="background: white; padding: 4px; border-radius: 4px; border: 1px solid #ddd;">
                            <img src="${qrAUrl}" alt="A Form QR" style="width: 70px; height: 70px; display: block;">
                        </div>
                        <div style="flex: 1;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--yellow); text-transform: uppercase;">1. Aşama (Dersten Önce)</span>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <a href="${formALink}" target="_blank" class="btn" style="padding: 4px 8px; font-size: 10px; background: var(--yellow); color: black; text-decoration: none; flex:1; text-align:center;">Önizle</a>
                                <button class="btn" style="padding: 4px 8px; font-size: 10px; background: var(--text-muted); flex:1;" onclick="copyToClipboard('${formALink}')">Link Kopyala</button>
                            </div>
                        </div>
                    </div>

                    <div style="flex: 1; min-width: 200px; display: flex; align-items: center; gap: 15px; background: rgba(139, 92, 246, 0.05); padding: 10px; border-radius: 8px; border: 1px dashed #8b5cf6;">
                        <div style="background: white; padding: 4px; border-radius: 4px; border: 1px solid #ddd;">
                            <img src="${qrDEUrl}" alt="D-E Form QR" style="width: 70px; height: 70px; display: block;">
                        </div>
                        <div style="flex: 1;">
                            <span style="font-size: 11px; font-weight: 800; color: #8b5cf6; text-transform: uppercase;">3. Aşama (Dersten Sonra)</span>
                            <div style="display:flex; gap:5px; margin-top:5px;">
                                <a href="${formDELink}" target="_blank" class="btn" style="padding: 4px 8px; font-size: 10px; background: #8b5cf6; text-decoration: none; flex:1; text-align:center;">Önizle</a>
                                <button class="btn" style="padding: 4px 8px; font-size: 10px; background: var(--text-muted); flex:1;" onclick="copyToClipboard('${formDELink}')">Link Kopyala</button>
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

            const studentsInClass = studentData.filter(s => s.sinif === sinif).sort((a, b) => a.no - b.no);
            if (studentsInClass.length === 0) return alert('Bu sınıfta yazdırılacak öğrenci bulunamadı.');

            const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            const printWindow = window.open('', '_blank');

            let html = `<!DOCTYPE html>
        <html>
        <head>
            <title>${sinif} Sınıfı - Öğrenci QR Kodları</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #1e293b; margin-bottom: 30px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .student-card { border: 2px dashed #cbd5e1; padding: 15px; border-radius: 12px; break-inside: avoid; page-break-inside: avoid; }
                .student-name { font-size: 16px; font-weight: bold; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px; color: #0f172a; }
                .qr-container { display: flex; justify-content: space-around; }
                .qr-box { text-align: center; }
                .qr-box img { width: 100px; height: 100px; margin-bottom: 5px; }
                .qr-title { font-size: 12px; font-weight: bold; }
                .color-1 { color: #d97706; }
                .color-3 { color: #6d28d9; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h1>${sinif} Sınıfı - Öğrenci QR Kodları</h1>
            <div class="grid">`;

            studentsInClass.forEach(s => {
                const formALink = `${baseUrl}/dersten_once_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;
                const formDELink = `${baseUrl}/dersten_sonra_formu.html?sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no)}&ad=${encodeURIComponent(s.adSoyad)}`;

                // Higher resolution for printing
                const qrAUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formALink)}&color=f59e0b`;
                const qrDEUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formDELink)}&color=8b5cf6`;

                html += `
                <div class="student-card">
                    <div class="student-name">${s.no} - ${s.adSoyad}</div>
                    <div class="qr-container">
                        <div class="qr-box">
                            <img src="${qrAUrl}" alt="QR">
                            <div class="qr-title color-1">1. AŞAMA</div>
                            <div style="font-size:10px; color:#64748b;">(Dersten Önce)</div>
                        </div>
                        <div class="qr-box">
                            <img src="${qrDEUrl}" alt="QR">
                            <div class="qr-title color-3">3. AŞAMA</div>
                            <div style="font-size:10px; color:#64748b;">(Dersten Sonra)</div>
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

        // ══════════════════════════════════════════════
        // TAB 9 — PROJE GRUPLARI SİSTEMİ
        // ══════════════════════════════════════════════
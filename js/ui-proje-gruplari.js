// ============================================================
// ui-proje-gruplari.js
// Proje Grupları Sistemi (Tab 9)
// ============================================================

        let projeGruplariData = [];       // tüm proje grupları
        let pgFormsData = [];             // öğrencilerin doldurduğu proje formları
        let pgActiveId = null;            // detay modalda açık grup id'si

        function pgListenToForms() {
            if (!window.db) return;
            // Sadece son 100 mesaj/formu getir (Performans için)
            window.db.ref('project_group_forms').orderByKey().limitToLast(100).on('value', (snapshot) => {
                if (!snapshot.exists()) {
                    pgFormsData = [];
                    if (document.getElementById('pg-detail-modal').style.display === 'block') pgRenderMessages();
                    return;
                }
                const formsObj = snapshot.val();
                pgFormsData = Object.keys(formsObj).map(key => ({ id: key, ...formsObj[key] }));
                if (document.getElementById('pg-detail-modal').style.display === 'block') pgRenderMessages();
            });
        }

        const PG_ASAMALAR = [
            '1. Problem Tespiti',
            '2. Araştırma & Kaynak',
            '3. Tasarım & Plan',
            '4. Uygulama & Prototip',
            '5. Test & Revizyon',
            '6. Sunum & Rapor'
        ];

        const PG_TYPE_LABELS = {
            teori: '🔬 Teori ve Araştırma',
            tasarim: '🎨 Tasarım ve İnovasyon',
            uretim: '🏭 Üretim ve Sunum'
        };

        const PG_TYPE_DEMOTE = { teori: 'tasarim', tasarim: 'uretim', uretim: null };

        // ── Veri yükle / kaydet ──
        function pgLoad() {
            try {
                const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                projeGruplariData = raw.projeGruplari || [];
            } catch (e) { projeGruplariData = []; }
        }

        function pgSave() {
            try {
                const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                raw.projeGruplari = projeGruplariData;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));

                // Firebase Realtime DB'ye kaydet (Hatalı olan Firestore metodunu kaldırdık)
                if (window.db) {
                    window.db.ref(window.userDBPath).update({
                        projeGruplari: projeGruplariData,
                        lastUpdate: new Date().toISOString()
                    }).catch(err => console.error("Realtime DB pgSave error:", err));
                }
            } catch (e) { }
        }

        // ── Sınıf filtre dropdownlarını doldur ──
        function pgFillSinifDropdowns() {
            const siniflar = [...new Set(studentData.map(s => s.sinif).filter(Boolean))].sort();
            ['pg-filter-sinif', 'pg-c-sinif'].forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const cur = el.value;
                el.innerHTML = '<option value="">-- Tüm / Seçin --</option>' +
                    siniflar.map(s => `<option value="${s}">${s}</option>`).join('');
                el.value = cur;
            });
        }

        // ── Oluşturma modalı ──
        function pgOpenCreateModal() {
            pgFillSinifDropdowns();
            document.getElementById('pg-c-title').value = '';
            document.getElementById('pg-c-ders').value = '';
            document.getElementById('pg-c-desc').value = '';
            document.getElementById('pg-c-video').value = '';
            document.getElementById('pg-c-sinif').value = '';
            document.getElementById('pg-c-member-list').innerHTML =
                '<span style="color:var(--text-muted);font-size:13px;">Önce sınıf seçin...</span>';
            document.getElementById('pg-c-sinif').onchange = pgPopulateCreateMembers;
            document.getElementById('pg-create-modal').style.display = 'block';
        }

        function pgCloseCreateModal() {
            document.getElementById('pg-create-modal').style.display = 'none';
        }

        function pgPopulateCreateMembers() {
            const sinif = document.getElementById('pg-c-sinif').value;
            const box = document.getElementById('pg-c-member-list');
            if (!sinif) { box.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">Önce sınıf seçin...</span>'; return; }
            const students = studentData.filter(s => s.sinif === sinif).sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));
            if (!students.length) { box.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">Bu sınıfta öğrenci yok.</span>'; return; }
            box.innerHTML = students.map(s =>
                `<label style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--card-bg);cursor:pointer;font-size:12px;font-weight:600;">
                <input type="checkbox" class="pg-create-cb" value="${s.adSoyad}" style="width:14px;height:14px;accent-color:var(--secondary);">
                ${s.no} - ${s.adSoyad}
            </label>`
            ).join('');
        }

        function pgCreateGroup() {
            const title = document.getElementById('pg-c-title').value.trim();
            const ders = document.getElementById('pg-c-ders').value.trim();
            const type = document.getElementById('pg-c-type').value;
            const sinif = document.getElementById('pg-c-sinif').value;
            const desc = document.getElementById('pg-c-desc').value.trim();
            const video = document.getElementById('pg-c-video').value.trim();
            if (!title || !sinif) return alert('Proje adı ve sınıf zorunludur!');

            const checked = Array.from(document.querySelectorAll('.pg-create-cb:checked')).map(cb => cb.value);
            if (checked.length < 2) return alert('En az 2 üye seçin!');

            const members = checked.map(name => {
                const s = studentData.find(st => st.adSoyad === name) || {};
                return { name, no: s.no || '', score: 50, aktif: true, katilimSayisi: 0, sonIslem: null };
            });

            const grup = {
                id: Date.now(),
                title, ders, type, sinif, desc,
                odevLinks: video ? [{ url: video, label: 'İçerik Videosu' }] : [],
                members,
                asamalar: PG_ASAMALAR.map((label, i) => ({
                    label, durum: i === 0 ? 'active' : 'pending',
                    not: '', tarih: null
                })),
                mesajlar: [],
                olusturma: new Date().toLocaleDateString('tr-TR')
            };

            projeGruplariData.push(grup);
            pgSave();
            pgCloseCreateModal();
            pgRenderList();
            pgUpdateTypeCounts();
        }

        function pgRenderList() {
            const container = document.getElementById('pg-list-container');
            if (!container) return;

            const filterType = document.getElementById('pg-filter-type') ? document.getElementById('pg-filter-type').value : '';
            const filterSinif = document.getElementById('pg-filter-sinif') ? document.getElementById('pg-filter-sinif').value : '';
            const searchInput = document.getElementById('pg-search');
            const searchF = searchInput ? searchInput.value.toLocaleLowerCase('tr-TR') : '';

            const list = projeGruplariData.filter(g => {
                if (filterType && g.type !== filterType) return false;
                if (filterSinif && g.sinif !== filterSinif) return false;
                if (searchF) {
                    const haystack = (g.title + (g.ders || '') + g.members.map(m => m.name).join(' ')).toLocaleLowerCase('tr-TR');
                    if (!haystack.includes(searchF)) return false;
                }
                return true;
            });

            if (!list.length) {
                container.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-layer-group fa-3x" style="margin-bottom:15px;opacity:0.3;"></i><p style="font-weight:700;">Eşleşen proje grubu bulunamadı</p></div>';
                return;
            }

            const typeColors = { teori: '#3b82f6', tasarim: '#8b5cf6', uretim: '#f59e0b' };

            container.innerHTML = list.map(g => {
                const color = typeColors[g.type] || '#3b82f6';
                const donePh = g.asamalar.filter(a => a.durum === 'done').length;
                const totalPh = g.asamalar.length;
                const avgScore = g.members.length ? Math.round(g.members.reduce((s, m) => s + m.score, 0) / g.members.length) : 0;
                const scoreColor = avgScore >= 70 ? '#10b981' : avgScore >= 45 ? '#f59e0b' : '#ef4444';

                const phaseBar = g.asamalar.map(a =>
                    `<div class="pg-phase-step ${a.durum}" title="${a.label}"></div>`
                ).join('');

                const chips = g.members.map(m => {
                    const dot = m.score >= 70 ? 'pg-score-high' : m.score >= 45 ? 'pg-score-medium' : 'pg-score-low';
                    return `<span class="pg-member-chip ${m.aktif ? '' : 'inactive'}">
                    <span class="pg-score-dot ${dot}"></span>${m.name}
                </span>`;
                }).join('');

                return `<div class="pg-project-card" style="border-left:4px solid ${color};">
                <div class="pg-header">
                    <div>
                        <p class="pg-title">${g.title}</p>
                        <p class="pg-meta"><i class="fas fa-chalkboard me-1"></i>${g.sinif} &nbsp;|&nbsp;
                            <i class="fas fa-book me-1"></i>${g.ders || '-'} &nbsp;|&nbsp;
                            <span style="color:${color};font-weight:700;">${PG_TYPE_LABELS[g.type] || g.type}</span>
                        </p>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
                        <span style="background:${scoreColor};color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;">
                            AI: ${avgScore}p
                        </span>
                        <button class="btn" onclick="pgOpenDetail(${g.id})" style="padding:6px 14px;font-size:12px;background:${color};">
                            <i class="fas fa-edit me-1"></i>Detay
                        </button>
                        <button class="btn" onclick="pgDeleteGroup(${g.id})" style="padding:6px 10px;font-size:12px;background:var(--red);">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="pg-phase-bar">${phaseBar}</div>
                <p style="font-size:11px;color:var(--text-muted);margin:6px 0 8px 0;">
                    Aşama: ${donePh}/${totalPh} tamamlandı &nbsp;|&nbsp; ${g.members.length} üye
                </p>
                <div class="pg-member-list">${chips}</div>
            </div>`;
            }).join('');

            pgUpdateTypeCounts();
        }

        function pgUpdateTypeCounts() {
            ['teori', 'tasarim', 'uretim'].forEach(t => {
                const el = document.getElementById('pg-count-' + t);
                if (el) el.textContent = projeGruplariData.filter(g => g.type === t).length + ' grup';
            });
        }

        function pgFilterByType(t) {
            const sel = document.getElementById('pg-filter-type');
            if (sel) { sel.value = sel.value === t ? '' : t; }
            pgRenderList();
        }

        function pgDeleteGroup(id) {
            if (!confirm('Bu proje grubunu silmek istiyor musunuz?')) return;
            projeGruplariData = projeGruplariData.filter(g => g.id !== id);
            pgSave(); pgRenderList();
        }

        // ── Detay Modal ──
        function pgOpenDetail(id) {
            pgActiveId = id;
            const g = projeGruplariData.find(x => x.id === id);
            if (!g) return;
            const color = { teori: '#3b82f6', tasarim: '#8b5cf6', uretim: '#f59e0b' }[g.type] || '#3b82f6';

            let safeTitle = (g.title || '').replace(/'/g, "\\'");
            let safeSinif = (g.sinif || '').replace(/'/g, "\\'");

            document.getElementById('pg-detail-header').innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;">
                <div>
                    <h3 style="margin:0 0 4px 0;color:${color};">${g.title}</h3>
                    <p style="margin:0;font-size:13px;color:var(--text-muted);">
                        ${g.sinif} &nbsp;|&nbsp; ${PG_TYPE_LABELS[g.type]} &nbsp;|&nbsp; ${g.olusturma}
                    </p>
                </div>
                <div style="display:flex;gap:8px;">
                    <button class="btn" onclick="pgCopyFormLink('${safeTitle}', '${safeSinif}')" style="background:#25D366;font-size:11px;padding:6px 12px;"><i class="fas fa-link me-1"></i>Grup Linkini Kopyala</button>
                    <button class="btn" onclick="pgPrintGroupQRCodes('${safeTitle}', '${safeSinif}', '${id}')" style="background:#ef4444;font-size:11px;padding:6px 12px;"><i class="fas fa-file-pdf me-1"></i>QR PDF İndir</button>
                </div>
            </div>
            ${g.desc ? `<p style="margin:8px 0 0 0;font-size:13px;color:var(--text-main);">${g.desc}</p>` : ''}`;
            pgSwitchInner('asamalar', document.querySelector('.pg-tab-inner-btn'));
            document.getElementById('pg-detail-modal').style.display = 'block';
        }

        function pgCloseDetailModal() {
            document.getElementById('pg-detail-modal').style.display = 'none';
            pgActiveId = null; pgRenderList();
        }

        function pgCopyFormLink(grupAdi, sinif) {
            let baseURL = window.location.href.split('/').slice(0, -1).join('/') + '/proje_grubu_takip_formu.html';
            let fullURL = baseURL + '?grupAdi=' + encodeURIComponent(grupAdi) + '&sinif=' + encodeURIComponent(sinif);
            navigator.clipboard.writeText(fullURL).then(() => {
                alert('Proje Takip Formu linki panoya kopyalandı!\n\nWhatsApp üzerinden gruba gönderebilirsiniz. Link tıklandığında sınıf ve grup adı otomatik doldurulacaktır.');
            }).catch(err => {
                alert('Link kopyalanamadı. Manuel kopyalayın:\n' + fullURL);
            });
        }

        function pgPrintGroupQRCodes(grupAdi, sinif, id) {
            const g = projeGruplariData.find(x => String(x.id) === String(id));
            if (!g || !g.members || g.members.length === 0) return alert('Bu grupta öğrenci bulunamadı.');

            const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            const printWindow = window.open('', '_blank');

            let html = `<!DOCTYPE html>
        <html>
        <head>
            <title>${grupAdi} - Öğrenci QR Kodları</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #1e293b; margin-bottom: 5px; }
                h3 { text-align: center; color: #64748b; margin-top: 0; margin-bottom: 30px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .student-card { border: 2px dashed #cbd5e1; padding: 15px; border-radius: 12px; break-inside: avoid; page-break-inside: avoid; }
                .student-name { font-size: 16px; font-weight: bold; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px; color: #0f172a; text-align:center; }
                .qr-container { display: flex; justify-content: center; }
                .qr-box { text-align: center; }
                .qr-box img { width: 150px; height: 150px; margin-bottom: 5px; }
                .qr-title { font-size: 14px; font-weight: bold; color: #2563eb; margin-top: 5px; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h1>${grupAdi} Grubu - Öğrenci QR Kodları</h1>
            <h3>${sinif} Sınıfı Proje Takip Formları</h3>
            <div class="grid">`;

            g.members.forEach(s => {
                const formLink = `${baseUrl}/proje_grubu_takip_formu.html?grupAdi=${encodeURIComponent(grupAdi)}&sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no || '')}&ad=${encodeURIComponent(s.name)}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formLink)}&color=2563eb`;

                html += `
                <div class="student-card">
                    <div class="student-name">${s.no ? s.no + ' - ' : ''}${s.name}</div>
                    <div class="qr-container">
                        <div class="qr-box">
                            <img src="${qrUrl}" alt="QR">
                            <div class="qr-title">Öğrenciye Özel Form</div>
                            <div style="font-size:11px; color:#64748b;">(Telefon kamerasına okutun)</div>
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
            <\\/script>
        </body>
        </html>`;

            // We replace the escaping for JS literal
            html = html.replace("<\\/script>", "<\/script>");

            printWindow.document.write(html);
            printWindow.document.close();
        }

        function pgSwitchInner(section, btn) {
            document.querySelectorAll('.pg-inner-section').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.pg-tab-inner-btn').forEach(b => b.classList.remove('active'));
            const el = document.getElementById('pg-inner-' + section);
            if (el) el.classList.add('active');
            if (btn) btn.classList.add('active');
            if (section === 'asamalar') pgRenderPhaseEditor();
            if (section === 'uyeler') pgRenderMemberScores();
            if (section === 'mesaj') pgRenderMessages();
            if (section === 'odev') pgRenderOdev();
        }

        // ── Aşamalar ──
        function pgRenderPhaseEditor() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const durumler = ['pending', 'active', 'done', 'blocked'];
            const durumLabel = { pending: 'Bekliyor', active: 'Devam Ediyor', done: 'Tamamlandı', blocked: 'Engellendi' };
            const durumColor = { pending: 'var(--text-muted)', active: 'var(--secondary)', done: 'var(--accent)', blocked: 'var(--red)' };

            document.getElementById('pg-phase-editor').innerHTML = g.asamalar.map((a, i) => `
            <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:10px;border:1px solid var(--border);background:var(--input-bg);margin-bottom:10px;">
                <div style="min-width:28px;height:28px;border-radius:50%;background:${durumColor[a.durum]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;">${i + 1}</div>
                <div style="flex:1;">
                    <p style="margin:0 0 8px 0;font-weight:700;font-size:14px;">${a.label}</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                        <select onchange="pgUpdatePhase(${i},'durum',this.value)" style="padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:${durumColor[a.durum]};font-weight:700;font-size:12px;">
                            ${durumler.map(d => `<option value="${d}" ${a.durum === d ? 'selected' : ''}>${durumLabel[d]}</option>`).join('')}
                        </select>
                        <input type="text" value="${a.not || ''}" placeholder="Not ekle..." onchange="pgUpdatePhase(${i},'not',this.value)"
                            style="flex:1;min-width:160px;padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:var(--text-main);font-size:12px;">
                        <span style="font-size:11px;color:var(--text-muted);">${a.tarih ? '✅ ' + a.tarih : ''}</span>
                    </div>
                </div>
            </div>`).join('');
        }

        function pgUpdatePhase(idx, field, val) {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            g.asamalar[idx][field] = val;
            if (field === 'durum' && val === 'done') g.asamalar[idx].tarih = new Date().toLocaleDateString('tr-TR');
            pgSave();
        }

        // ── Üye Puanlama (AI) ──
        function pgRunAIEval() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;

            // Form verilerini topla
            const gForms = pgFormsData.filter(f => f.grupAdi === g.title);
            let formDataText = gForms.map(f => `Öğrenci: ${f.adSoyad}\nİçerik İzledi mi: ${f.formResponse.icerikIzlendi}\nProblem: ${f.formResponse.problemTanim}\nÇözüm Önerisi: ${f.formResponse.cozumOneri}\nKişisel Katkısı: ${f.formResponse.kisiselKatki}\nArkadaşlarına Yorumu: ${f.formResponse.peerReview}\nKriz Senaryosu: ${f.formResponse.krizSenaryosu || "Yok"}\nKriz Çözümü: ${f.formResponse.krizCozumu || "Yok"}`).join("\n\n");

            let promptText = `Sen bir proje yöneticisi ve öğretmensin. Aşağıda "${g.title}" adlı proje grubunda yer alan öğrencilerin sisteme girdikleri son "Proje Grubu Takip Formu" verileri bulunmaktadır.

Grup Üyeleri:
${g.members.map(m => m.name).join(", ")}

Öğrenci Form Verileri:
${formDataText ? formDataText : "Bu gruba ait henüz form verisi bulunmamaktadır."}

GÖREVİN:
1. Bu öğrencilerin projeye katılımlarını, verdikleri fikirleri, kişisel katkı beyanlarını ve özellikle karşılaştıkları Kriz Senaryolarına (varsa) verdikleri kriz çözüm yanıtlarını analiz ederek her birine 1 ile 100 arasında bir puan (score) ver. 35 puan altı olanları pasif (aktif: false) yap. 
2. Grubun ürettiği projeyi BM Sürdürülebilir Kalkınma Amaçlarına göre değerlendir. Eğer proje çevre, eşitsizlik, temiz su, eğitim gibi bir konuda fayda sağlıyorsa onlara bir Sürdürülebilir Kalkınma Ödülü ata (Örn: 'İklim Savaşçısı', 'Eğitim Gönüllüsü'). Bu ödülü 'sdg_rozeti' adında yeni bir key ile ekle. Eğer ödül verilmeyecekse boş bırak ("").

Lütfen cevabını SADECE aşağıdaki JSON formatında ver, kod bloğu veya başka hiçbir metin ekleme:

[
  { "name": "Öğrenci Adı", "score": 85, "aktif": true, "sdg_rozeti": "Eğitim Gönüllüsü" }
]`;

            window.currentGeminiPrompt = promptText;
            navigator.clipboard.writeText(promptText).then(() => {
                alert("✨ AI Değerlendirme promptu panoya kopyalandı!\n\nŞimdi Gemini açılacak. Kopyalanan metni yapıştırıp, gelen köşeli parantezli JSON sonucunu sistemdeki kutuya yapıştırın.");
                window.open("https://gemini.google.com/app", "_blank");
                document.getElementById('pg-ai-paste-area').style.display = 'block';
            }).catch(err => {
                alert("Kopyalama başarısız. Lütfen konsola bakınız.");
                console.error(err);
            });
        }

        function pgApplyAIResult() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const input = document.getElementById('pg-ai-json-input').value.trim();
            try {
                // Kod bloğu tırnaklarını temizle (markdown formatından gelirse diye)
                let cleanInput = input.replace(/```json/g, '').replace(/```/g, '').trim();
                const result = JSON.parse(cleanInput);
                result.forEach(aiData => {
                    const member = g.members.find(m => m.name === aiData.name);
                    if (member) {
                        member.score = aiData.score;
                        member.aktif = aiData.aktif;
                        member.sdg_rozeti = aiData.sdg_rozeti || "";
                        member.sonIslem = new Date().toLocaleDateString('tr-TR');
                    }
                });
                pgSave();
                pgRenderMemberScores();
                document.getElementById('pg-ai-paste-area').style.display = 'none';
                document.getElementById('pg-ai-json-input').value = '';
                alert("Puanlar başarıyla güncellendi!");
            } catch (e) {
                alert("Geçersiz JSON formatı! Lütfen sadece Gemini'dan gelen köşeli parantezli [ ... ] veriyi yapıştırdığınızdan emin olun.");
                console.error(e);
            }
        }

        function pgRenderMemberScores() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            document.getElementById('pg-member-score-table').innerHTML = `
            <table class="custom-table">
                <thead><tr>
                    <th>Öğrenci</th><th>AI Puanı</th><th>Performans</th><th>Durum</th><th>Son İşlem</th><th>Katılım</th>
                </tr></thead>
                <tbody>
                ${g.members.map((m, i) => {
                const bar = Math.max(m.score, 2);
                const col = m.score >= 70 ? '#10b981' : m.score >= 45 ? '#f59e0b' : '#ef4444';
                return `<tr>
                        <td style="font-weight:600;">${m.no ? m.no + ' - ' : ''}${m.name}</td>
                        <td><strong style="color:${col};">${m.score}p</strong></td>
                        <td>
                            <div class="pg-ai-score-bar">
                                <div class="pg-ai-score-track">
                                    <div class="pg-ai-score-fill" style="width:${bar}%;background:${col};"></div>
                                </div>
                            </div>
                        </td>
                        <td><span style="padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;
                            background:${m.aktif ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};
                            color:${m.aktif ? '#10b981' : '#ef4444'};">
                            ${m.aktif ? '✅ Aktif' : '⚠️ Pasif'}</span>
                            ${m.sdg_rozeti ? `<span style="padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(59, 130, 246, 0.1);color:#3b82f6;margin-left:5px;" title="Sürdürülebilir Kalkınma Ödülü"><i class="fas fa-globe"></i> ${m.sdg_rozeti}</span>` : ''}
                        </td>
                        <td style="font-size:11px;color:var(--text-muted);">${m.sonIslem || '-'}</td>
                        <td style="display:flex; gap:5px; align-items:center;">
                            <button class="btn" onclick="pgAddKatilim(${i})" style="padding:4px 8px;font-size:11px;background:var(--secondary);" title="Katılım Puanı Ekle"><i class="fas fa-plus"></i></button>
                            <button class="btn" onclick="showCBLReport('${m.name.replace(/'/g, "\\'")}')" style="padding:4px 8px;font-size:11px;background:#3b82f6;" title="Bağlam Eğilimi Karnesi Göster"><i class="fas fa-id-card"></i></button>
                        </td>
                    </tr>`;
            }).join('')}
                </tbody>
            </table>`;
        }

        function pgAddKatilim(idx) {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            g.members[idx].katilimSayisi = (g.members[idx].katilimSayisi || 0) + 1;
            pgSave(); pgRenderMemberScores();
        }

        function pgDemoteInactive() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const inactive = g.members.filter(m => !m.aktif);
            if (!inactive.length) return alert('Tüm üyeler aktif, düşürülecek kimse yok.');
            const nextType = PG_TYPE_DEMOTE[g.type];
            if (!nextType) return alert('Bu grup zaten en alt seviyede (Üretim ve Sunum).');
            if (!confirm(`${inactive.length} pasif üye "${PG_TYPE_LABELS[nextType]}" grubuna düşürülecek. Onaylıyor musunuz?`)) return;
            inactive.forEach(m => {
                g.members = g.members.filter(x => x.name !== m.name);
                const newGrup = projeGruplariData.find(pg => pg.type === nextType && pg.sinif === g.sinif);
                if (newGrup) { m.score = 50; m.aktif = true; newGrup.members.push(m); }
            });
            pgSave(); pgRenderMemberScores(); pgRenderList();
            alert(`${inactive.length} öğrenci ${PG_TYPE_LABELS[nextType]} grubuna taşındı.`);
        }

        function pgRemoveInactive() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const inactive = g.members.filter(m => !m.aktif);
            if (!inactive.length) return alert('Tüm üyeler aktif.');
            if (!confirm(`${inactive.length} pasif üye gruptan çıkarılacak. Onaylıyor musunuz?`)) return;
            g.members = g.members.filter(m => m.aktif);
            pgSave(); pgRenderMemberScores(); pgRenderList();
        }

        // ── Mesajlaşma ──
        function pgRenderMessages() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const thread = document.getElementById('pg-msg-thread');

            let allMsgs = [...(g.mesajlar || [])];

            function escapeHTML(str) {
                return (str || '').toString()
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            }

            const gForms = pgFormsData.filter(f => f.grupAdi === g.title);
            gForms.forEach(f => {
                let msgText = `<strong>📝 Proje Aşaması Raporu</strong><br>
            <strong>Gönderen:</strong> ${escapeHTML(f.adSoyad)}<br>
            <strong>Çözüm Fikri:</strong> ${escapeHTML(f.formResponse.cozumOneri)}<br>
            <strong>Katkısı:</strong> ${escapeHTML(f.formResponse.kisiselKatki)}`;

                let timeStr = new Date(f.timestamp || Date.now()).toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });

                allMsgs.push({
                    taraf: 'student',
                    metin: msgText,
                    zaman: timeStr,
                    timestamp: f.timestamp || Date.now()
                });
            });

            allMsgs.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

            thread.innerHTML = allMsgs.length
                ? allMsgs.map(m => `
                <div class="pg-msg ${m.taraf}">
                    ${m.metin}
                    <div class="pg-msg-meta">${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'} — ${m.zaman}</div>
                </div>`).join('')
                : '<div style="text-align:center;color:var(--text-muted);padding:20px;font-size:13px;">Henüz mesaj veya rapor yok.</div>';
            thread.scrollTop = thread.scrollHeight;
        }

        function pgSendMessage() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const input = document.getElementById('pg-msg-input');
            const metin = input.value.trim(); if (!metin) return;
            g.mesajlar = g.mesajlar || [];
            g.mesajlar.push({ taraf: 'teacher', metin, zaman: new Date().toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }), timestamp: Date.now() });
            input.value = '';
            pgSave(); pgRenderMessages();
        }

        function pgShareMsgWhatsapp() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            let text = `📋 *${g.title}* — Grup Mesajları\n\n`;
            g.mesajlar.slice(-10).forEach(m => {
                text += `${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'}: ${m.metin}\n`;
            });
            window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(text), '_blank');
        }
        function pgShareMsgBip() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            let text = `📋 *${g.title}* — Grup Mesajları\n\n`;
            g.mesajlar.slice(-10).forEach(m => {
                text += `${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'}: ${m.metin}\n`;
            });
            window.open('https://web.bip.com/share?text=' + encodeURIComponent(text), '_blank');
        }

        // ── İçerik & Ödev ──
        function pgRenderOdev() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const box = document.getElementById('pg-odev-content');
            if (!g.odevLinks || !g.odevLinks.length) {
                box.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">Henüz içerik eklenmemiş.</p>';
                return;
            }
            box.innerHTML = g.odevLinks.map((l, i) =>
                `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;border:1px solid var(--border);background:var(--input-bg);margin-bottom:8px;">
                <i class="fas fa-play-circle" style="color:var(--secondary);font-size:18px;"></i>
                <a href="${l.url}" target="_blank" style="flex:1;color:var(--secondary);font-weight:600;font-size:13px;">${l.label || l.url}</a>
                <button onclick="pgRemoveOdevLink(${i})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;"><i class="fas fa-times"></i></button>
            </div>`
            ).join('');
        }

        function pgAddOdevLink() {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            const url = document.getElementById('pg-odev-link-input').value.trim();
            const label = document.getElementById('pg-odev-link-label').value.trim() || url;
            if (!url) return alert('Link boş olamaz!');
            if (!g.odevLinks) g.odevLinks = [];
            g.odevLinks.push({ url, label });
            document.getElementById('pg-odev-link-input').value = '';
            document.getElementById('pg-odev-link-label').value = '';
            pgSave(); pgRenderOdev();
        }

        function pgRemoveOdevLink(i) {
            const g = projeGruplariData.find(x => x.id === pgActiveId); if (!g) return;
            g.odevLinks.splice(i, 1); pgSave(); pgRenderOdev();
        }

        // ── Tab9 açılınca init ──
        const _origOpenTab = openTab ? null : null;
        document.addEventListener('DOMContentLoaded', () => {
            pgLoad();
            pgFillSinifDropdowns();
            pgRenderList();
            pgListenToForms();
        });

window.showCBLReport = function(studentName) {
    const g = projeGruplariData.find(x => x.id === pgActiveId);
    if (!g) return;
    const member = g.members.find(m => m.name === studentName);
    if (!member) return;

    let extraInfo = (typeof studentData !== 'undefined') ? studentData.find(s => s.no === member.no || s.adSoyad === member.name) : null;
    let ilgi = (extraInfo && extraInfo.ilgi_alanlari && extraInfo.ilgi_alanlari.length > 0) ? extraInfo.ilgi_alanlari.join(', ') : 'Belirtilmedi';

    let content = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h3 style="margin:0; font-size:22px;">${member.name} ${member.no ? '('+member.no+')' : ''}</h3>
                <span style="color:var(--text-muted); font-size:13px;"><i class="fas fa-users"></i> ${g.title} | ${g.sinif}</span>
            </div>
            <div style="font-size:36px; color:${member.score >= 70 ? '#10b981' : member.score >= 45 ? '#f59e0b' : '#ef4444'}; font-weight:bold;">
                ${member.score || 0}
                <div style="font-size:12px; color:var(--text-muted); font-weight:normal; text-align:center; margin-top:-5px;">Performans Puanı</div>
            </div>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:10px;">
            <div style="background:var(--card-bg); padding:15px; border-radius:8px; border:1px solid var(--border);">
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:5px;">Bağlam Eğilimi (İlgi Alanı)</div>
                <div style="font-weight:600;"><i class="fas fa-compass" style="color:#8b5cf6;"></i> ${ilgi}</div>
            </div>
            <div style="background:var(--card-bg); padding:15px; border-radius:8px; border:1px solid var(--border);">
                <div style="font-size:12px; color:var(--text-muted); margin-bottom:5px;">Sürdürülebilir Kalkınma Ödülü</div>
                <div style="font-weight:600; color:#3b82f6;">${member.sdg_rozeti ? `<i class="fas fa-globe"></i> ${member.sdg_rozeti}` : '<span style="color:var(--text-muted);"><i class="fas fa-minus"></i> Ödül Yok</span>'}</div>
            </div>
        </div>

        <div style="background:var(--input-bg); padding:15px; border-radius:8px; margin-top:5px; border-left: 4px solid ${member.score >= 50 ? '#10b981' : '#ef4444'};">
            <h4 style="margin:0 0 10px 0; font-size:14px;"><i class="fas fa-robot"></i> Yapay Zeka (AI) Genel Değerlendirmesi</h4>
            <p style="margin:0; font-size:13px; line-height:1.6; color:var(--text-main);">
                ${member.score >= 80 ? "Öğrenci proje sürecine üst düzey katkı sağlamış ve olası Kriz (Case Study) senaryolarında grubuna liderlik ederek etkili çözümler üretmiştir. Bağlam temelli öğrenme becerileri yüksek." : 
                member.score >= 45 ? "Öğrenci grup projesinde üzerine düşen temel görevleri yerine getirmiş ve kriz anlarında standart düzeyde reaksiyon göstermiştir. Katılımı olumlu." : 
                "Öğrencinin projedeki kişisel katkısı yetersiz görülmüş ve kriz senaryolarına geliştirdiği tepkiler zayıf bulunmuştur. Daha aktif görev alması önerilir."}
            </p>
        </div>
    `;

    document.getElementById('cbl-report-content').innerHTML = content;
    document.getElementById('cbl-report-modal').style.display = 'flex';

    document.getElementById('cbl-whatsapp-btn').onclick = function() {
        let msg = `Sayın Veli,\nÖğrencimiz *${member.name}* için *Bağlam Temelli Öğrenme (CBL)* Gelişim Raporu:\n\n`;
        msg += `📌 Proje Grubu: ${g.title}\n`;
        msg += `🧭 Bağlam / İlgi Alanı: ${ilgi}\n`;
        msg += `🎯 Performans Puanı: ${member.score || 0}/100\n`;
        if (member.sdg_rozeti) msg += `🌍 Sürdürülebilir Kalkınma Ödülü: ${member.sdg_rozeti}\n`;
        
        let yorum = member.score >= 80 ? "Proje sürecine ve kriz yönetimine harika katkı sağladı!" : (member.score >= 45 ? "Projede üzerine düşeni başarıyla tamamladı." : "Projeye daha fazla katılım sağlaması gerekmektedir.");
        msg += `\n🤖 AI Yorumu: ${yorum}\n\nİyi günler dileriz.`;

        let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };
};

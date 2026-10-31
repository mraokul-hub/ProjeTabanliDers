// ============================================================
// ui-proje-gruplari.js (DÜZELTİLMİŞ TAM KOD)
// Bölüm 11: 🌳 Proje Grupları (PBL & İşbirlikli Öğrenme Motoru)
// Belbin Takım Rolleri, Heterojen Optimizasyon & MEB Rubrik Değerlendirme
// ============================================================

(function () {
    'use strict';

    // ── XSS Koruma Yardımcısı ──
    const escapeHTML = function (str) {
        if (typeof window.escapeHTML === 'function') return window.escapeHTML(str);
        if (typeof window.escapeHtml === 'function') return window.escapeHtml(str);
        return (str || '').toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // ── Güvenli Çok Kaynaklı Öğrenci Çözümleyici ──
    function getSafeStudents() {
        if (Array.isArray(window.studentData) && window.studentData.length > 0) return window.studentData;
        if (Array.isArray(window.students) && window.students.length > 0) return window.students;
        try {
            const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
            const uid = currentUser?.uid || '';
            const baseKey = (typeof STORAGE_KEY !== 'undefined') ? STORAGE_KEY : 'proje_tabanli_ders_data';
            const userKey = uid ? `${baseKey}_${uid}` : baseKey;
            const raw = JSON.parse(localStorage.getItem(userKey) || localStorage.getItem(baseKey) || '{}');
            const list = raw.students || raw.studentData || [];
            if (Array.isArray(list) && list.length > 0) return list;
        } catch (e) {
            console.warn("Proje grupları için öğrenci verisi çözümlenemedi:", e);
        }
        return [];
    }

    function getSafeExams() {
        if (Array.isArray(window.examData) && window.examData.length > 0) return window.examData;
        if (Array.isArray(window.exams) && window.exams.length > 0) return window.exams;
        return [];
    }

    // ── Global Durum & Referanslar ──
    var pgFormsData = [];
    var pgActiveId = null;

    // ── Belbin Takım Rolleri Sözlüğü ──
    const BELBIN_ROLES = {
        kaptan: {
            id: 'kaptan',
            title: 'Takım Kaptanı / Koordinatör',
            icon: '👑',
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.12)',
            desc: 'Hedef belirleme, delegasyon ve genel süreç koordinasyonu'
        },
        arastirmaci: {
            id: 'arastirmaci',
            title: 'Araştırmacı / Veri Toplayıcı',
            icon: '🔍',
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.12)',
            desc: 'Literatür tarama, veri analizi ve kaynak doğrulama'
        },
        tasarimci: {
            id: 'tasarimci',
            title: 'Tasarımcı / İnovasyon Lideri',
            icon: '💡',
            color: '#8b5cf6',
            bg: 'rgba(139, 92, 246, 0.12)',
            desc: 'Görsel modelleme, prototip geliştirme ve yaratıcı çözümler'
        },
        raportor: {
            id: 'raportor',
            title: 'Yazıcı / Raportör & Zaman Yöneticisi',
            icon: '📝',
            color: '#10b981',
            bg: 'rgba(16, 185, 129, 0.12)',
            desc: 'Süreç dokümantasyonu, teslim takvimi ve sunum hazırlığı'
        }
    };
    window.BELBIN_ROLES = BELBIN_ROLES;

    // ── 4 Aşamalı Milestone Standartları ──
    const PG_ASAMALAR = [
        '1. Problem Tespiti & Hipotez',
        '2. Araştırma & Kaynak Taraması',
        '3. Tasarım & Planlama',
        '4. Uygulama & Prototip',
        '5. Test & Akran Değerlendirme',
        '6. Sunum & Nihai Rapor'
    ];
    window.PG_ASAMALAR = PG_ASAMALAR;

    const PG_MILESTONES_DEFAULT = [
        { ad: 'Fikir & Hipotez', tamamlandi: true, tarih: new Date().toISOString().split('T')[0] },
        { ad: 'Tasarım & Planlama', tamamlandi: false, tarih: '' },
        { ad: 'Prototip & Uygulama', tamamlandi: false, tarih: '' },
        { ad: 'Akran Değerlendirme & Rapor', tamamlandi: false, tarih: '' }
    ];

    const PG_TYPE_LABELS = {
        teori: '🔬 Teori ve Araştırma',
        tasarim: '🎨 Tasarım ve İnovasyon',
        uretim: '🏭 Üretim ve Sunum'
    };
    window.PG_TYPE_LABELS = PG_TYPE_LABELS;

    const typeColors = {
        teori: '#3b82f6',
        tasarim: '#8b5cf6',
        uretim: '#f59e0b'
    };
    window.typeColors = typeColors;

    const PG_TYPE_DEMOTE = { teori: 'tasarim', tasarim: 'uretim', uretim: null };

    // ── Proje Verisi Normalizasyonu ──
    function normalizeProject(p, idx) {
        if (!p || typeof p !== 'object') return null;

        const pId = String(p.id || ('proj_' + Date.now() + '_' + (idx || 1)));
        const pTitle = p.title || p.projeAdi || ('Proje Takımı ' + (idx ? idx + 1 : ''));
        const pType = p.type || p.grupTipi || 'tasarim';

        const rawMembers = Array.isArray(p.members) && p.members.length ? p.members : (Array.isArray(p.uyeler) ? p.uyeler : []);
        const roleKeys = Object.keys(BELBIN_ROLES);

        const members = rawMembers.map((m, mIdx) => {
            if (!m) return null;
            if (typeof m === 'string') {
                const allSt = getSafeStudents();
                const found = allSt.find(s => s && (s.adSoyad === m || s.id === m || String(s.no) === m));
                const rKey = roleKeys[mIdx % roleKeys.length];
                const rInfo = BELBIN_ROLES[rKey];
                return {
                    studentId: found ? (found.id || found.no) : ('st_' + mIdx),
                    no: found ? (found.no || '') : '',
                    name: found ? found.adSoyad : m,
                    adSoyad: found ? found.adSoyad : m,
                    rol: rInfo.title,
                    rolKey: rKey,
                    akranPuani: 90,
                    score: 75,
                    vak: found ? (found.vak || found.vakResult || 'Görsel') : 'Görsel',
                    aktif: true,
                    katilimSayisi: 0,
                    sonIslem: new Date().toLocaleDateString('tr-TR')
                };
            }

            const mName = m.name || m.adSoyad || 'Öğrenci';
            const rKey = m.rolKey || (m.rol && m.rol.includes('Kaptan') ? 'kaptan' : (m.rol && m.rol.includes('Tasarım') ? 'tasarimci' : (m.rol && m.rol.includes('Yazıcı') ? 'raportor' : 'arastirmaci')));
            const rInfo = BELBIN_ROLES[rKey] || BELBIN_ROLES.arastirmaci;

            return {
                studentId: m.studentId || m.id || m.no || ('st_' + mIdx),
                no: m.no || '',
                name: mName,
                adSoyad: mName,
                rol: m.rol || rInfo.title,
                rolKey: rKey,
                akranPuani: Number(m.akranPuani) || 90,
                score: Number(m.score) || 75,
                vak: m.vak || 'Görsel',
                cinsiyet: m.cinsiyet || '',
                aktif: (m.aktif !== false),
                katilimSayisi: Number(m.katilimSayisi) || 0,
                sonIslem: m.sonIslem || new Date().toLocaleDateString('tr-TR')
            };
        }).filter(Boolean);

        return {
            id: pId,
            title: pTitle,
            projeAdi: pTitle,
            ders: p.ders || p.tema || 'Genel Fen & STEM',
            tema: p.tema || p.ders || 'PBL Araştırma ve Tasarım',
            type: pType,
            grupTipi: pType,
            sinif: p.sinif || (members[0] && members[0].sinif) || 'Genel',
            desc: p.desc || p.aciklama || 'PBL & İşbirlikli Öğrenme Proje Takımı',
            teslimTarihi: p.teslimTarihi || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            members: members,
            uyeler: members,
            asamalar: Array.isArray(p.asamalar) && p.asamalar.length ? p.asamalar : PG_ASAMALAR.map((label, i) => ({
                label,
                durum: i === 0 ? 'active' : 'pending',
                not: '',
                tarih: i === 0 ? new Date().toLocaleDateString('tr-TR') : null
            })),
            milestones: Array.isArray(p.milestones) && p.milestones.length ? p.milestones : PG_MILESTONES_DEFAULT,
            rubrikPuanlari: p.rubrikPuanlari || { surec: 35, urun: 35, akran: 18, toplam: 88 },
            mesajlar: Array.isArray(p.mesajlar) ? p.mesajlar : [],
            odevLinks: Array.isArray(p.odevLinks) ? p.odevLinks : [],
            olusturma: p.olusturma || new Date().toLocaleDateString('tr-TR'),
            notlar: p.notlar || ''
        };
    }

    function _pgData() {
        let raw = window.projeGruplariData;
        if (!raw && typeof projeGruplariData !== 'undefined') raw = projeGruplariData;
        if (!raw) raw = window.projectGroupsData;

        // Yerel depodan geri yükleme desteği
        if (!raw || (Array.isArray(raw) && raw.length === 0)) {
            try {
                const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
                const uid = currentUser?.uid || '';
                const baseKey = (typeof STORAGE_KEY !== 'undefined') ? STORAGE_KEY : 'proje_tabanli_ders_data';
                const userKey = uid ? `${baseKey}_${uid}` : baseKey;
                const stored = JSON.parse(localStorage.getItem(userKey) || localStorage.getItem(baseKey) || '{}');
                raw = stored.projects || stored.projeGruplari || stored.projeGruplariData || [];
            } catch (e) {}
        }

        let list = [];
        if (Array.isArray(raw)) {
            list = raw;
        } else if (raw && typeof raw === 'object') {
            list = Object.values(raw);
        }

        const normalized = list.map((p, idx) => normalizeProject(p, idx)).filter(Boolean);
        window.projeGruplariData = normalized;
        window.projectGroupsData = normalized;
        if (typeof projeGruplariData !== 'undefined') {
            try { projeGruplariData = normalized; } catch (e) { }
        }
        return normalized;
    }
    window._pgData = _pgData;

    function _setPgData(data) {
        const list = Array.isArray(data) ? data : [];
        window.projeGruplariData = list;
        window.projectGroupsData = list;
        if (typeof projeGruplariData !== 'undefined') {
            try { projeGruplariData = list; } catch (e) { }
        }

        // Yerel depoya kalıcı olarak yaz
        try {
            const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
            const uid = currentUser?.uid || '';
            const baseKey = (typeof STORAGE_KEY !== 'undefined') ? STORAGE_KEY : 'proje_tabanli_ders_data';
            const userKey = uid ? `${baseKey}_${uid}` : baseKey;
            
            const currentStore = JSON.parse(localStorage.getItem(userKey) || localStorage.getItem(baseKey) || '{}');
            currentStore.projects = list;
            currentStore.projeGruplari = list;
            localStorage.setItem(userKey, JSON.stringify(currentStore));
            localStorage.setItem(baseKey, JSON.stringify(currentStore));

            if (window.db && window.userDBPath) {
                window.db.ref(window.userDBPath + '/projects').set(list).catch(() => {});
            }
        } catch (e) {
            console.error("Proje verisi kaydedilemedi:", e);
        }
    }

    // ── Firebase Uydu Form Dinleyicisi ──
    function pgListenToForms() {
        if (!window.db) {
            setTimeout(pgListenToForms, 1500);
            return;
        }
        const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
        if (!currentUser) {
            // Kullanıcı henüz oturum açmadıysa yetki hatasını önlemek için bekle
            setTimeout(pgListenToForms, 1500);
            return;
        }
        if (window._pgFormsRef) {
            try { window._pgFormsRef.off(); } catch (e) { }
        }
        try {
            const currentUser = window.currentUser || ((typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null);
            const teacherUid = currentUser ? currentUser.uid : window.activeWorkspaceUid;
            const isUserAdmin = (currentUser && currentUser.email && currentUser.email.toLowerCase().trim() === 'mremzi@gmail.com') || window.isAdminUser;

            // BOLA/IDOR Koruması: Öğretmen kendi grubuna ait formları dinler, admin root seviyesini denetler
            const targetRef = (teacherUid && !isUserAdmin)
                ? window.db.ref('project_group_forms/' + teacherUid).orderByKey().limitToLast(100)
                : window.db.ref('project_group_forms').orderByKey().limitToLast(100);

            window._pgFormsRef = targetRef;
            window._pgFormsRef.on('value', (snapshot) => {
                if (!snapshot.exists()) {
                    pgFormsData = [];
                    const dModal = document.getElementById('pg-detail-modal');
                    if (dModal && dModal.style.display === 'block') pgRenderMessages();
                    return;
                }
                const formsObj = snapshot.val();
                let formsList = [];
                if (formsObj) {
                    Object.keys(formsObj).forEach(key => {
                        const val = formsObj[key];
                        if (val && typeof val === 'object') {
                            if (val.timestamp !== undefined || val.grupAdi !== undefined) {
                                formsList.push({ id: key, ...val });
                            } else {
                                Object.keys(val).forEach(subKey => {
                                    if (val[subKey] && typeof val[subKey] === 'object') {
                                        formsList.push({ id: subKey, ...val[subKey] });
                                    }
                                });
                            }
                        }
                    });
                }
                pgFormsData = formsList;
                const dModal = document.getElementById('pg-detail-modal');
                if (dModal && dModal.style.display === 'block') pgRenderMessages();
            }, (error) => {
                console.warn("project_group_forms dinleme izni bekleniyor:", error.message);
            });
        } catch (e) {
            console.warn("pgListenToForms hatası:", e);
        }
    }

    // ── Veri Yükleme ve Kayıt ──
    function pgLoad() {
        try {
            _pgData();
        } catch (e) {
            console.error("pgLoad hatası:", e);
        }
    }

    function pgSave() {
        try {
            const currentList = _pgData();
            _setPgData(currentList);
            if (typeof window.saveData === 'function') {
                window.saveData(true);
            }
        } catch (e) {
            console.error("pgSave hatası:", e);
        }
    }

    // ── Yaşam Döngüsü Başlatıcı ──
    function initProjeGruplariModule() {
        pgLoad();
        pgFillSinifDropdowns();
        pgRenderList();
        pgUpdateTypeCounts();
        pgListenToForms();
    }

    // ── Sınıf Seçicileri Doldur ──
    function pgFillSinifDropdowns() {
        const allStudents = getSafeStudents();
        const siniflar = [...new Set(allStudents.map(s => s && s.sinif).filter(Boolean))].sort();

        const filterSinif = document.getElementById('pg-filter-sinif');
        if (filterSinif) {
            const cur = filterSinif.value;
            filterSinif.innerHTML = '<option value="">Tüm Sınıflar</option>' + siniflar.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');
            if (cur && siniflar.includes(cur)) filterSinif.value = cur;
        }

        const cSinif = document.getElementById('pg-c-sinif');
        if (cSinif) {
            const cur = cSinif.value;
            cSinif.innerHTML = '<option value="">-- Sınıf Seçin --</option>' + siniflar.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');
            if (cur && siniflar.includes(cur)) cSinif.value = cur;
            cSinif.onchange = pgPopulateCreateMembers;
        }

        const autoSinif = document.getElementById('pg-auto-sinif');
        if (autoSinif) {
            const cur = autoSinif.value;
            autoSinif.innerHTML = '<option value="">-- Sınıf Seçin --</option>' + siniflar.map(s => `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join('');
            if (cur && siniflar.includes(cur)) autoSinif.value = cur;
        }
    }

    // ── Proje Grubu Oluşturma Modalı ──
    function pgOpenCreateModal() {
        pgFillSinifDropdowns();
        const m = document.getElementById('pg-create-modal');
        if (m) m.style.display = 'block';
    }

    function pgCloseCreateModal() {
        const m = document.getElementById('pg-create-modal');
        if (m) m.style.display = 'none';
    }

    function pgPopulateCreateMembers() {
        const sinif = document.getElementById('pg-c-sinif') ? document.getElementById('pg-c-sinif').value : '';
        const box = document.getElementById('pg-c-member-list');
        if (!box) return;
        if (!sinif) {
            box.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">Önce sınıf seçin...</span>';
            return;
        }
        const allStudents = getSafeStudents();
        const students = allStudents.filter(s => s && s.sinif === sinif);
        if (!students.length) {
            box.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">Bu sınıfta kayıtlı öğrenci yok.</span>';
            return;
        }

        const roleKeys = Object.keys(BELBIN_ROLES);
        box.innerHTML = students.map((s, idx) => {
            const defaultRole = roleKeys[idx % roleKeys.length];
            return `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--card-bg);font-size:12px;width:100%;box-sizing:border-box;">
                    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;flex:1;margin:0;">
                        <input type="checkbox" class="pg-create-cb" data-idx="${idx}" value="${escapeHTML(s.adSoyad)}" data-no="${escapeHTML(s.no || '')}" data-id="${escapeHTML(s.id || s.no || '')}" style="accent-color:var(--secondary);">
                        <span style="font-weight:600;">${escapeHTML(s.no ? s.no + ' - ' : '')}${escapeHTML(s.adSoyad)}</span>
                    </label>
                    <select class="pg-role-select" data-idx="${idx}" style="padding:3px 6px;border-radius:6px;border:1px solid var(--border);background:var(--input-bg);color:var(--text-main);font-size:11px;">
                        ${roleKeys.map(rk => `<option value="${rk}" ${rk === defaultRole ? 'selected' : ''}>${BELBIN_ROLES[rk].icon} ${BELBIN_ROLES[rk].title}</option>`).join('')}
                    </select>
                </div>`;
        }).join('');
    }

    function pgCreateGroup() {
        const title = (document.getElementById('pg-c-title') ? document.getElementById('pg-c-title').value.trim() : '');
        const ders = (document.getElementById('pg-c-ders') ? document.getElementById('pg-c-ders').value.trim() : '');
        const type = (document.getElementById('pg-c-type') ? document.getElementById('pg-c-type').value : 'tasarim');
        const sinif = (document.getElementById('pg-c-sinif') ? document.getElementById('pg-c-sinif').value : '');
        const desc = (document.getElementById('pg-c-desc') ? document.getElementById('pg-c-desc').value.trim() : '');
        const video = (document.getElementById('pg-c-video') ? document.getElementById('pg-c-video').value.trim() : '');

        if (!title || !sinif) return alert('Lütfen Proje Adı ve Sınıf alanlarını doldurun!');

        const checkedBoxes = Array.from(document.querySelectorAll('.pg-create-cb:checked'));
        if (checkedBoxes.length < 2) return alert('Lütfen projeye en az 2 üye öğrenci seçin!');

        const allStudents = getSafeStudents();
        const members = checkedBoxes.map(cb => {
            const name = cb.value;
            const idx = cb.getAttribute('data-idx');
            const s = allStudents.find(st => st && st.adSoyad === name) || {};
            const roleSelect = document.querySelector(`.pg-role-select[data-idx="${idx}"]`);
            const roleKey = roleSelect ? roleSelect.value : 'arastirmaci';
            const roleInfo = BELBIN_ROLES[roleKey] || BELBIN_ROLES.arastirmaci;

            return {
                studentId: cb.getAttribute('data-id') || s.id || s.no || '',
                no: s.no || '',
                name: name,
                adSoyad: name,
                rol: roleInfo.title,
                rolKey: roleKey,
                akranPuani: 90,
                score: 75,
                vak: s.vak || s.vakResult || 'Görsel',
                aktif: true,
                katilimSayisi: 0,
                sonIslem: new Date().toLocaleDateString('tr-TR')
            };
        });

        const newGroup = {
            id: 'proj_' + Date.now(),
            title: title,
            projeAdi: title,
            ders: ders || 'Fen & STEM İnovasyon',
            type: type,
            grupTipi: type,
            sinif: sinif,
            desc: desc || 'PBL Proje Takımı',
            tema: ders || 'Fen & STEM İnovasyon',
            teslimTarihi: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            odevLinks: video ? [{ url: video, label: 'İçerik Videosu' }] : [],
            members: members,
            uyeler: members,
            asamalar: PG_ASAMALAR.map((label, i) => ({
                label,
                durum: i === 0 ? 'active' : 'pending',
                not: '',
                tarih: i === 0 ? new Date().toLocaleDateString('tr-TR') : null
            })),
            milestones: [
                { ad: 'Fikir & Hipotez', tamamlandi: true, tarih: new Date().toLocaleDateString('tr-TR') },
                { ad: 'Tasarım & Planlama', tamamlandi: false, tarih: '' },
                { ad: 'Prototip & Uygulama', tamamlandi: false, tarih: '' },
                { ad: 'Akran Değerlendirme & Rapor', tamamlandi: false, tarih: '' }
            ],
            rubrikPuanlari: { surec: 35, urun: 35, akran: 18, toplam: 88 },
            mesajlar: [],
            olusturma: new Date().toLocaleDateString('tr-TR')
        };

        const currentList = _pgData();
        currentList.push(newGroup);
        _setPgData(currentList);
        pgSave();
        pgCloseCreateModal();
        pgRenderList();
        pgUpdateTypeCounts();
        alert(`🎉 "${title}" proje grubu başarıyla oluşturuldu!`);
    }

    // ── Akıllı Heterojen Takım Dağıtım Motoru ──
    window.pgOpenAutoModal = function () {
        pgFillSinifDropdowns();
        const m = document.getElementById('pg-auto-modal');
        if (m) m.style.display = 'block';
    };

    window.pgCloseAutoModal = function () {
        const m = document.getElementById('pg-auto-modal');
        if (m) m.style.display = 'none';
    };

    window.pgRunAutoHeterogeneous = function () {
        const sinif = document.getElementById('pg-auto-sinif') ? document.getElementById('pg-auto-sinif').value : '';
        const groupSize = parseInt(document.getElementById('pg-auto-size') ? document.getElementById('pg-auto-size').value : 4, 10) || 4;
        const tema = (document.getElementById('pg-auto-theme') ? document.getElementById('pg-auto-theme').value.trim() : '') || 'TÜBİTAK & STEM Projesi';

        if (!sinif) return alert('Lütfen bir sınıf seçin!');

        const allStudents = getSafeStudents();
        const allExams = getSafeExams();

        const targetStudents = allStudents.filter(s => s && s.sinif === sinif);
        if (targetStudents.length < groupSize) {
            return alert(`Seçilen sınıfta en az ${groupSize} öğrenci bulunmalıdır.`);
        }

        const rated = targetStudents.map(s => {
            let net = 0;
            let count = 0;
            allExams.forEach(e => {
                const res = (e && e.results) || {};
                const r = res[s.adSoyad] || Object.values(res).find(x => x && (x.studentId === s.id || x.no === s.no || x.adSoyad === s.adSoyad));
                if (r && r.totalNet !== undefined && r.totalNet !== null && r.totalNet !== '') {
                    net += parseFloat(r.totalNet) || 0;
                    count++;
                }
            });
            const avgNet = count > 0 ? (net / count) : ((Number(s.xp) || 50) / 10);
            const vak = s.vak || s.vakResult || 'Görsel';
            const cinsiyet = s.cinsiyet || (s.adSoyad && (s.adSoyad.endsWith('a') || s.adSoyad.endsWith('e')) ? 'Kız' : 'Erkek');

            return {
                student: s,
                score: avgNet,
                vak: vak,
                cinsiyet: cinsiyet
            };
        });

        rated.sort((a, b) => b.score - a.score);

        const numGroups = Math.max(1, Math.floor(rated.length / groupSize));
        const teamBuckets = Array.from({ length: numGroups }, () => []);

        let forward = true;
        let bucketIdx = 0;

        rated.forEach(item => {
            teamBuckets[bucketIdx].push(item);
            if (forward) {
                bucketIdx++;
                if (bucketIdx >= numGroups) {
                    bucketIdx = numGroups - 1;
                    forward = false;
                }
            } else {
                bucketIdx--;
                if (bucketIdx < 0) {
                    bucketIdx = 0;
                    forward = true;
                }
            }
        });

        const roleOrder = ['kaptan', 'arastirmaci', 'tasarimci', 'raportor'];
        const currentProjects = _pgData();
        let createdCount = 0;

        teamBuckets.forEach((bucket, tIdx) => {
            if (bucket.length === 0) return;
            const gId = 'proj_' + Date.now() + '_' + (tIdx + 1);
            const gTitle = `${tema} - Takım ${tIdx + 1}`;

            const members = bucket.map((item, mIdx) => {
                const rKey = roleOrder[mIdx % roleOrder.length];
                const rInfo = BELBIN_ROLES[rKey];
                return {
                    studentId: item.student.id || item.student.no,
                    no: item.student.no || '',
                    name: item.student.adSoyad,
                    adSoyad: item.student.adSoyad,
                    rol: rInfo.title,
                    rolKey: rKey,
                    vak: item.vak,
                    cinsiyet: item.cinsiyet,
                    akranPuani: 90,
                    score: Math.min(100, Math.round(50 + item.score * 2)),
                    aktif: true,
                    katilimSayisi: 0,
                    sonIslem: new Date().toLocaleDateString('tr-TR')
                };
            });

            const newProj = {
                id: gId,
                title: gTitle,
                projeAdi: gTitle,
                ders: tema,
                type: 'tasarim',
                grupTipi: 'tasarim',
                sinif: sinif,
                desc: 'Johnson & Johnson heterojen optimizasyon algoritması ile dengeli oluşturuldu.',
                tema: tema,
                teslimTarihi: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                members: members,
                uyeler: members,
                asamalar: PG_ASAMALAR.map((label, i) => ({
                    label,
                    durum: i === 0 ? 'active' : 'pending',
                    not: '',
                    tarih: i === 0 ? new Date().toLocaleDateString('tr-TR') : null
                })),
                milestones: [
                    { ad: 'Fikir & Hipotez', tamamlandi: true, tarih: new Date().toLocaleDateString('tr-TR') },
                    { ad: 'Tasarım & Planlama', tamamlandi: false, tarih: '' },
                    { ad: 'Prototip & Uygulama', tamamlandi: false, tarih: '' },
                    { ad: 'Akran Değerlendirme & Rapor', tamamlandi: false, tarih: '' }
                ],
                rubrikPuanlari: { surec: 36, urun: 36, akran: 18, toplam: 90 },
                mesajlar: [],
                odevLinks: [],
                olusturma: new Date().toLocaleDateString('tr-TR')
            };

            currentProjects.push(newProj);
            createdCount++;
        });

        _setPgData(currentProjects);
        pgSave();
        window.pgCloseAutoModal();
        pgRenderList();
        pgUpdateTypeCounts();
        alert(`🎉 Tebrikler! ${createdCount} adet heterojen proje takımı Belbin rolleri ve VAK dengesiyle başarıyla kuruldu.`);
    };

    // ── Liste Render Motoru ──
    function pgRenderList() {
        const container = document.getElementById('pg-list-container');
        if (!container) return;

        pgFillSinifDropdowns();
        const currentList = _pgData();
        const filterType = document.getElementById('pg-filter-type') ? document.getElementById('pg-filter-type').value : '';
        const filterSinif = document.getElementById('pg-filter-sinif') ? document.getElementById('pg-filter-sinif').value : '';
        const searchInput = document.getElementById('pg-search');
        const searchF = searchInput ? searchInput.value.toLocaleLowerCase('tr-TR') : '';

        const list = currentList.filter(g => {
            if (!g) return false;
            const gType = g.type || g.grupTipi || '';
            if (filterType && gType !== filterType) return false;
            if (filterSinif && g.sinif !== filterSinif) return false;
            if (searchF) {
                const membersList = Array.isArray(g.members || g.uyeler) ? (g.members || g.uyeler) : [];
                const haystack = ((g.title || g.projeAdi || '') + ' ' + (g.ders || g.tema || '') + ' ' + membersList.map(m => (m.name || m.adSoyad || '')).join(' ')).toLocaleLowerCase('tr-TR');
                if (!haystack.includes(searchF)) return false;
            }
            return true;
        });

        if (!list.length) {
            container.innerHTML = `
                <div style="text-align:center;padding:60px 20px;color:var(--text-muted);">
                    <i class="fas fa-layer-group fa-3x" style="margin-bottom:15px;opacity:0.3;"></i>
                    <p style="font-weight:700;font-size:15px;">Henüz proje grubu bulunamadı</p>
                    <p style="font-size:12px;">Yeni bir grup oluşturabilir, tek tıkla heterojen takım kurabilir veya 10. İleri Çalışma Grupları sekmesinden aktarabilirsiniz.</p>
                </div>`;
            pgUpdateTypeCounts();
            return;
        }

        container.innerHTML = list.map(g => {
            const gType = g.type || g.grupTipi || 'tasarim';
            const color = typeColors[gType] || '#8b5cf6';
            const members = Array.isArray(g.members || g.uyeler) ? (g.members || g.uyeler) : [];
            const milestones = Array.isArray(g.milestones) ? g.milestones : PG_MILESTONES_DEFAULT;
            const doneMilestones = milestones.filter(m => m && m.tamamlandi).length;

            const rubrik = g.rubrikPuanlari || { surec: 35, urun: 35, akran: 18, toplam: 88 };
            const avgScore = rubrik.toplam || Math.round(members.reduce((s, m) => s + (m.score || 70), 0) / (members.length || 1));
            const scoreColor = avgScore >= 85 ? '#10b981' : avgScore >= 65 ? '#f59e0b' : '#ef4444';

            const milestoneBar = milestones.map(m => `
                <div style="flex:1;text-align:center;">
                    <div style="height:6px;border-radius:3px;background:${m.tamamlandi ? 'var(--accent)' : 'var(--border)'};margin-bottom:4px;"></div>
                    <span style="font-size:9.5px;color:${m.tamamlandi ? 'var(--text-main)' : 'var(--text-muted)'};font-weight:${m.tamamlandi ? '700' : '400'};white-space:nowrap;">
                        ${m.tamamlandi ? '✓ ' : ''}${escapeHTML(m.ad)}
                    </span>
                </div>
            `).join('');

            const chips = members.map(m => {
                const rKey = m.rolKey || 'arastirmaci';
                const rInfo = BELBIN_ROLES[rKey] || { icon: '👤', title: m.rol || 'Üye', bg: 'rgba(59,130,246,0.1)' };
                return `
                    <span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;background:${rInfo.bg};border:1px solid var(--border);font-size:11px;">
                        <span>${rInfo.icon}</span>
                        <strong>${escapeHTML(m.name || m.adSoyad || '')}</strong>
                        <span style="font-size:10px;color:var(--text-muted);">(${escapeHTML(m.rol || rInfo.title)})</span>
                    </span>`;
            }).join('');

            return `
                <div class="pg-project-card" style="border-left:5px solid ${color};padding:18px;margin-bottom:16px;">
                    <div class="pg-header" style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
                        <div>
                            <p class="pg-title" style="margin:0 0 4px;font-size:16px;font-weight:700;color:var(--text-main);">
                                ${escapeHTML(g.title || g.projeAdi || '')}
                            </p>
                            <p class="pg-meta" style="margin:0;font-size:12px;color:var(--text-muted);">
                                <i class="fas fa-school me-1"></i>${escapeHTML(g.sinif || '')} &nbsp;|&nbsp;
                                <i class="fas fa-tag me-1"></i>${escapeHTML(g.tema || g.ders || 'Genel Proje')} &nbsp;|&nbsp;
                                <span style="color:${color};font-weight:700;">${escapeHTML(PG_TYPE_LABELS[gType] || gType)}</span>
                            </p>
                        </div>
                        <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;flex-wrap:wrap;">
                            <span style="background:${scoreColor};color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;" title="MEB Rubrik Toplam Puanı">
                                MEB: ${avgScore}p
                            </span>
                            <button class="btn" onclick="window.pgOpenRubricModal('${escapeHTML(String(g.id))}')" style="padding:6px 10px;font-size:11px;background:#f59e0b;" title="MEB 100 Puan Rubriği ile Değerlendir">
                                <i class="fas fa-star-half-alt me-1"></i>Rubrik
                            </button>
                            <button class="btn" onclick="window.pgPrintCertificate('${escapeHTML(String(g.id))}')" style="padding:6px 10px;font-size:11px;background:#10b981;" title="A4 Görev Dağılım Beratı Yazdır">
                                <i class="fas fa-award me-1"></i>Berat
                            </button>
                            <button class="btn" onclick="pgOpenDetail('${escapeHTML(String(g.id))}')" style="padding:6px 12px;font-size:11px;background:${color};">
                                <i class="fas fa-cog me-1"></i>Yönet
                            </button>
                            <button class="btn" onclick="pgDeleteGroup('${escapeHTML(String(g.id))}')" style="padding:6px 9px;font-size:11px;background:var(--red);">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div style="margin:14px 0 10px;background:var(--input-bg);padding:10px;border-radius:8px;border:1px solid var(--border);">
                        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:6px;">
                            <span><strong>Milestone İlerleme:</strong> ${doneMilestones}/${milestones.length} Tamamlandı</span>
                            <span>Teslim: ${escapeHTML(g.teslimTarihi || '-')}</span>
                        </div>
                        <div style="display:flex;gap:8px;align-items:center;">
                            ${milestoneBar}
                        </div>
                    </div>

                    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                        ${chips}
                    </div>
                </div>`;
        }).join('');

        pgUpdateTypeCounts();
    }

    function pgUpdateTypeCounts() {
        const list = _pgData();
        ['teori', 'tasarim', 'uretim'].forEach(t => {
            const el = document.getElementById('pg-count-' + t);
            if (el) {
                const count = list.filter(g => g && (g.type === t || g.grupTipi === t)).length;
                el.textContent = count + ' grup';
            }
        });
    }

    function pgFilterByType(t) {
        const sel = document.getElementById('pg-filter-type');
        if (sel) {
            sel.value = sel.value === t ? '' : t;
        }
        pgRenderList();
    }

    function pgDeleteGroup(id) {
        if (!confirm('Bu proje grubunu silmek istediğinize emin misiniz?')) return;
        const updated = _pgData().filter(g => g && String(g.id) !== String(id));
        _setPgData(updated);
        pgSave();
        pgRenderList();
        pgUpdateTypeCounts();
    }

    // ── MEB Rubrik Değerlendirme Modalı ──
    window.pgOpenRubricModal = function (projectId) {
        const g = _pgData().find(x => x && String(x.id) === String(projectId));
        if (!g) return;

        const rubrik = g.rubrikPuanlari || { surec: 35, urun: 35, akran: 18, toplam: 88 };
        const modal = document.getElementById('pg-rubric-modal');
        if (!modal) return;

        const nameEl = document.getElementById('rubric-project-name');
        if (nameEl) nameEl.textContent = g.title || g.projeAdi || '';

        const sSurec = document.getElementById('rubric-score-surec');
        if (sSurec) sSurec.value = rubrik.surec !== undefined ? rubrik.surec : 35;
        const lblSurec = document.getElementById('lbl-surec');
        if (lblSurec && sSurec) lblSurec.textContent = sSurec.value;

        const sUrun = document.getElementById('rubric-score-urun');
        if (sUrun) sUrun.value = rubrik.urun !== undefined ? rubrik.urun : 35;
        const lblUrun = document.getElementById('lbl-urun');
        if (lblUrun && sUrun) lblUrun.textContent = sUrun.value;

        const sAkran = document.getElementById('rubric-score-akran');
        if (sAkran) sAkran.value = rubrik.akran !== undefined ? rubrik.akran : 18;
        const lblAkran = document.getElementById('lbl-akran');
        if (lblAkran && sAkran) lblAkran.textContent = sAkran.value;

        window.pgCalcRubricTotal();

        modal.setAttribute('data-active-id', String(projectId));
        modal.style.display = 'block';
    };

    window.pgCloseRubricModal = function () {
        const modal = document.getElementById('pg-rubric-modal');
        if (modal) modal.style.display = 'none';
    };

    window.pgCalcRubricTotal = function () {
        const surecEl = document.getElementById('rubric-score-surec');
        const urunEl = document.getElementById('rubric-score-urun');
        const akranEl = document.getElementById('rubric-score-akran');
        const surec = parseInt(surecEl ? surecEl.value : 35, 10) || 0;
        const urun = parseInt(urunEl ? urunEl.value : 35, 10) || 0;
        const akran = parseInt(akranEl ? akranEl.value : 18, 10) || 0;
        const total = Math.min(100, surec + urun + akran);
        const totalEl = document.getElementById('rubric-score-total');
        if (totalEl) totalEl.textContent = total;
    };

    window.pgSaveRubric = function () {
        const modal = document.getElementById('pg-rubric-modal');
        if (!modal) return;
        const pId = modal.getAttribute('data-active-id');
        const g = _pgData().find(x => x && String(x.id) === String(pId));
        if (!g) return;

        const surec = parseInt(document.getElementById('rubric-score-surec').value, 10) || 0;
        const urun = parseInt(document.getElementById('rubric-score-urun').value, 10) || 0;
        const akran = parseInt(document.getElementById('rubric-score-akran').value, 10) || 0;
        const total = Math.min(100, surec + urun + akran);

        g.rubrikPuanlari = { surec, urun, akran, toplam: total };
        pgSave();
        window.pgCloseRubricModal();
        pgRenderList();
        alert('✅ MEB Rubrik Puanları başarıyla kaydedildi!');
    };

    // ── A4 Takım Beratı & Görev Dağılım Belgesi ──
    window.pgPrintCertificate = function (projectId) {
        const g = _pgData().find(x => x && String(x.id) === String(projectId));
        if (!g) return;

        const printWin = window.open('', '_blank');
        if (!printWin) return alert('Pop-up engelleyiciyi kapatınız.');

        const members = g.members || g.uyeler || [];
        const rubrik = g.rubrikPuanlari || { surec: 36, urun: 36, akran: 18, toplam: 90 };
        const milestones = g.milestones || PG_MILESTONES_DEFAULT;

        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        const formLink = `${baseUrl}/proje_grubu_takip_formu.html?grupAdi=${encodeURIComponent(g.title || g.projeAdi)}&sinif=${encodeURIComponent(g.sinif)}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(formLink)}&color=1e293b`;

        const certHtml = `
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>${escapeHTML(g.title || g.projeAdi)} - Proje Takım Beratı</title>
                <style>
                    @page { size: A4 landscape; margin: 12mm; }
                    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #fff; color: #0f172a; margin: 0; padding: 15px; }
                    .cert-border { border: 8px double #1e293b; padding: 25px; border-radius: 12px; position: relative; min-height: 180mm; box-sizing: border-box; }
                    .header { text-align: center; border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 15px; }
                    .header h1 { font-size: 20pt; margin: 0; color: #1e293b; letter-spacing: 1px; }
                    .header h2 { font-size: 13pt; margin: 4px 0 0; color: #2563eb; }
                    .header p { margin: 2px 0 0; font-size: 9pt; color: #64748b; }
                    .meta-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 15px; font-size: 10pt; }
                    .team-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; }
                    .table-cert { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 9.5pt; }
                    .table-cert th, .table-cert td { border: 1px solid #94a3b8; padding: 6px 10px; }
                    .table-cert th { background: #e2e8f0; }
                    .rubrik-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; font-size: 9.5pt; text-align: center; }
                    .signatures { display: flex; justify-content: space-between; margin-top: 35px; padding: 0 40px; }
                    .sign-col { text-align: center; font-size: 10pt; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    }
                </style>
            </head>
            <body>
                <div class="cert-border">
                    <div class="header">
                        <h1>T.C. MİLLÎ EĞİTİM BAKANLIĞI</h1>
                        <h2>PROJE TABANLI ÖĞRENME (PBL) TAKIM GÖREV BERATI</h2>
                        <p>Johnson & Johnson İşbirlikli Öğrenme & Belbin Takım Rolleri Akreditasyonu</p>
                    </div>

                    <div class="meta-grid">
                        <div class="team-box">
                            <div><strong>Proje Başlığı:</strong> ${escapeHTML(g.title || g.projeAdi)}</div>
                            <div style="margin-top:4px;"><strong>Sınıf & Şube:</strong> ${escapeHTML(g.sinif)} &nbsp;|&nbsp; <strong>Odak Tema:</strong> ${escapeHTML(g.tema || g.ders || 'STEM Araştırma')}</div>
                            <div style="margin-top:4px;"><strong>Aşama Durumu:</strong> ${milestones.filter(m => m.tamamlandi).length}/${milestones.length} Milestone Tamamlandı</div>

                            <table class="table-cert">
                                <thead>
                                    <tr>
                                        <th>Öğrenci No</th>
                                        <th>Adı Soyadı</th>
                                        <th>Belbin Takım Rolü</th>
                                        <th>Sorumluluk Alanı</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${members.map(m => {
                                        const rKey = m.rolKey || 'arastirmaci';
                                        const rInfo = BELBIN_ROLES[rKey] || { title: m.rol || 'Üye', desc: 'Genel Görev' };
                                        return `
                                            <tr>
                                                <td style="text-align:center;">${escapeHTML(m.no || '-')}</td>
                                                <td><strong>${escapeHTML(m.name || m.adSoyad)}</strong></td>
                                                <td>${escapeHTML(m.rol || rInfo.title)}</td>
                                                <td style="font-size:8.5pt;color:#475569;">${escapeHTML(rInfo.desc)}</td>
                                            </tr>`;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>

                        <div class="rubrik-box">
                            <h3 style="margin:0 0 8px;font-size:11pt;color:#1e293b;">MEB Proje Değerlendirme Rubriği</h3>
                            <div style="font-size:24pt;font-weight:800;color:#2563eb;margin-bottom:6px;">${rubrik.toplam} / 100</div>
                            <div style="font-size:9pt;color:#475569;margin-bottom:12px;">
                                Süreç (%40): <strong>${rubrik.surec}p</strong> • Ürün (%40): <strong>${rubrik.urun}p</strong><br>
                                Akran Değerlendirme (%20): <strong>${rubrik.akran}p</strong>
                            </div>
                            <img src="${qrUrl}" alt="Takip QR" style="width:90px;height:90px;border:1px solid #cbd5e1;padding:4px;border-radius:6px;">
                            <div style="font-size:8pt;color:#64748b;margin-top:4px;">Uydu Form Girişi İçin Okutunuz</div>
                        </div>
                    </div>

                    <div class="signatures">
                        <div class="sign-col">
                            <strong>Takım Kaptanı</strong><br><br><br>
                            İmza: ...........................................
                        </div>
                        <div class="sign-col">
                            <strong>Danışman Öğretmen</strong><br><br><br>
                            İmza: ...........................................
                        </div>
                        <div class="sign-col">
                            <strong>Okul Müdürü</strong><br><br><br>
                            Mühür / İmza: ...........................................
                        </div>
                    </div>
                </div>

                <script>
                    setTimeout(() => { window.print(); }, 500);
                </script>
            </body>
            </html>`;

        printWin.document.write(certHtml);
        printWin.document.close();
    };

    // ── Detay Modal & İçerik İşlemleri ──
    function pgOpenDetail(id) {
        pgActiveId = String(id);
        const g = _pgData().find(x => x && String(x.id) === String(id));
        if (!g) return;

        const gType = g.type || g.grupTipi || 'tasarim';
        const color = typeColors[gType] || '#3b82f6';
        let safeTitleAttr = encodeURIComponent(g.title || g.projeAdi || '');
        let safeSinifAttr = encodeURIComponent(g.sinif || '');

        const headerEl = document.getElementById('pg-detail-header');
        if (headerEl) {
            headerEl.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;">
                    <div>
                        <h3 style="margin:0 0 4px 0;color:${color};">${escapeHTML(g.title || g.projeAdi || '')}</h3>
                        <p style="margin:0;font-size:13px;color:var(--text-muted);">
                            ${escapeHTML(g.sinif || '')} &nbsp;|&nbsp; ${escapeHTML(PG_TYPE_LABELS[gType] || gType)} &nbsp;|&nbsp; ${escapeHTML(g.olusturma || '')}
                        </p>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button class="btn" onclick="pgCopyFormLink(decodeURIComponent('${safeTitleAttr}'), decodeURIComponent('${safeSinifAttr}'))" style="background:#25D366;font-size:11px;padding:6px 12px;"><i class="fas fa-link me-1"></i>Grup Linkini Kopyala</button>
                        <button class="btn" onclick="pgPrintGroupQRCodes(decodeURIComponent('${safeTitleAttr}'), decodeURIComponent('${safeSinifAttr}'), '${id}')" style="background:#ef4444;font-size:11px;padding:6px 12px;"><i class="fas fa-qrcode me-1"></i>QR İndir</button>
                    </div>
                </div>
                ${g.desc ? `<p style="margin:8px 0 0 0;font-size:13px;color:var(--text-main);">${escapeHTML(g.desc)}</p>` : ''}`;
        }

        pgSwitchInner('asamalar', document.querySelector('.pg-tab-inner-btn'));
        const modal = document.getElementById('pg-detail-modal');
        if (modal) modal.style.display = 'block';
    }

    function pgCloseDetailModal() {
        const modal = document.getElementById('pg-detail-modal');
        if (modal) modal.style.display = 'none';
        pgActiveId = null;
        pgRenderList();
    }

    function pgCopyFormLink(grupAdi, sinif) {
        const teacherUid = (window.currentUser && window.currentUser.uid) || window.activeWorkspaceUid || (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
        const uidParam = teacherUid ? '&uid=' + encodeURIComponent(teacherUid) : '';
        let baseURL = window.location.href.split('/').slice(0, -1).join('/') + '/proje_grubu_takip_formu.html';
        let fullURL = baseURL + '?grupAdi=' + encodeURIComponent(grupAdi) + '&sinif=' + encodeURIComponent(sinif) + uidParam;
        navigator.clipboard.writeText(fullURL).then(() => {
            alert('Proje Takip Formu linki panoya kopyalandı!\n\nWhatsApp üzerinden gruba gönderebilirsiniz. Link tıklandığında sınıf ve grup adı otomatik doldurulacaktır.');
        }).catch(() => {
            alert('Link kopyalanamadı. Manuel kopyalayın:\n' + fullURL);
        });
    }

    function pgPrintGroupQRCodes(grupAdi, sinif, id) {
        const g = _pgData().find(x => x && String(x.id) === String(id));
        const members = g ? (g.members || g.uyeler || []) : [];
        if (!members.length) return alert('Bu grupta öğrenci bulunamadı.');

        const teacherUid = (window.currentUser && window.currentUser.uid) || window.activeWorkspaceUid || (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
        const uidParam = teacherUid ? '&uid=' + encodeURIComponent(teacherUid) : '';
        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        const printWindow = window.open('', '_blank');
        const safeGrupAdi = escapeHTML(grupAdi || '');
        const safeSinif = escapeHTML(sinif || '');

        let html = `<!DOCTYPE html>
        <html>
        <head>
            <title>${safeGrupAdi} - Öğrenci QR Kodları</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; color: #333; }
                h1 { text-align: center; color: #1e293b; margin-bottom: 5px; }
                h3 { text-align: center; color: #64748b; margin-top: 0; margin-bottom: 30px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .student-card { border: 2px dashed #cbd5e1; padding: 15px; border-radius: 12px; break-inside: avoid; page-break-inside: avoid; }
                .student-name { font-size: 16px; font-weight: bold; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 12px; color: #0f172a; text-align:center; }
                .qr-container { display: flex; justify-content: center; }
                .qr-box { text-align: center; }
                .qr-box img { width: 140px; height: 140px; margin-bottom: 5px; }
                .qr-title { font-size: 13px; font-weight: bold; color: #2563eb; margin-top: 5px; }
                @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
            </style>
        </head>
        <body>
            <h1>${safeGrupAdi} Grubu - Öğrenci QR Kodları</h1>
            <h3>${safeSinif} Sınıfı Proje Takip Formları</h3>
            <div class="grid">
                ${members.map(s => {
                    const formLink = `${baseUrl}/proje_grubu_takip_formu.html?grupAdi=${encodeURIComponent(grupAdi)}&sinif=${encodeURIComponent(sinif)}&no=${encodeURIComponent(s.no || '')}&ad=${encodeURIComponent(s.name || s.adSoyad)}${uidParam}`;
                    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(formLink)}&color=2563eb`;
                    return `
                        <div class="student-card">
                            <div class="student-name">${escapeHTML(s.no ? s.no + ' - ' : '')}${escapeHTML(s.name || s.adSoyad)}</div>
                            <div class="qr-container">
                                <div class="qr-box">
                                    <img src="${qrUrl}" alt="QR">
                                    <div class="qr-title">Öğrenciye Özel Form</div>
                                    <div style="font-size:11px;color:#64748b;">(Telefon kamerasına okutun)</div>
                                </div>
                            </div>
                        </div>`;
                }).join('')}
            </div>
            <script>
                setTimeout(() => { window.print(); }, 800);
            </script>
        </body>
        </html>`;

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

    // ── Aşama Editörü ──
    function pgRenderPhaseEditor() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;

        const asamalar = g.asamalar || [];
        const durumler = ['pending', 'active', 'done', 'blocked'];
        const durumLabel = { pending: 'Bekliyor', active: 'Devam Ediyor', done: 'Tamamlandı', blocked: 'Engellendi' };
        const durumColor = { pending: 'var(--text-muted)', active: 'var(--secondary)', done: 'var(--accent)', blocked: 'var(--red)' };

        const editor = document.getElementById('pg-phase-editor');
        if (!editor) return;

        editor.innerHTML = asamalar.map((a, i) => `
            <div style="display:flex;align-items:flex-start;gap:12px;padding:14px;border-radius:10px;border:1px solid var(--border);background:var(--input-bg);margin-bottom:10px;">
                <div style="min-width:28px;height:28px;border-radius:50%;background:${durumColor[a.durum]};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;">${i + 1}</div>
                <div style="flex:1;">
                    <p style="margin:0 0 8px 0;font-weight:700;font-size:14px;">${escapeHTML(a.label)}</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                        <select onchange="pgUpdatePhase(${i},'durum',this.value)" style="padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:${durumColor[a.durum]};font-weight:700;font-size:12px;">
                            ${durumler.map(d => `<option value="${d}" ${a.durum === d ? 'selected' : ''}>${durumLabel[d]}</option>`).join('')}
                        </select>
                        <input type="text" value="${escapeHTML(a.not || '')}" placeholder="Aşama notu veya çıktı ekle..." onchange="pgUpdatePhase(${i},'not',this.value)"
                            style="flex:1;min-width:160px;padding:5px 10px;border-radius:6px;border:1px solid var(--border);background:var(--card-bg);color:var(--text-main);font-size:12px;">
                        <span style="font-size:11px;color:var(--text-muted);">${a.tarih ? '✅ ' + escapeHTML(a.tarih) : ''}</span>
                    </div>
                </div>
            </div>`).join('');
    }

    function pgUpdatePhase(idx, field, val) {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g || !g.asamalar || !g.asamalar[idx]) return;
        g.asamalar[idx][field] = val;
        if (field === 'durum') {
            g.asamalar[idx].tarih = (val === 'done') ? new Date().toLocaleDateString('tr-TR') : null;
        }
        pgSave();
        pgRenderPhaseEditor();
    }

    // ── AI Analizi & Form Değerlendirme ──
    function pgRunAIEval() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;

        const members = g.members || g.uyeler || [];
        const gForms = pgFormsData.filter(f => f.grupAdi === (g.title || g.projeAdi) && f.sinif === g.sinif);
        let formDataText = gForms.map(f => `Öğrenci: ${f.adSoyad}\nİçerik İzledi mi: ${f.formResponse ? f.formResponse.icerikIzlendi : ''}\nProblem: ${f.formResponse ? f.formResponse.problemTanim : ''}\nÇözüm: ${f.formResponse ? f.formResponse.cozumOneri : ''}\nKatkı: ${f.formResponse ? f.formResponse.kisiselKatki : ''}\nAkran Yorumu: ${f.formResponse ? f.formResponse.peerReview : ''}`).join("\n\n");

        let promptText = `Sen EdTech ve Proje Tabanlı Öğrenme (PBL) değerlendirme uzmanısın. Aşağıda "${g.title || g.projeAdi}" adlı takımın öğrenci form yanıtları yer alıyor.
        
Grup Üyeleri: ${members.map(m => m.name || m.adSoyad).join(", ")}
Öğrenci Form Verileri:
${formDataText || "Henüz form verisi yok."}

GÖREV:
Her öğrenciye 1-100 arası score ver, 40 altı ise aktif:false yap.
Lütfen SADECE JSON formatında döndür:
[
  { "name": "Öğrenci Adı", "score": 85, "aktif": true, "sdg_rozeti": "İklim Savunucusu" }
]`;

        navigator.clipboard.writeText(promptText).then(() => {
            alert("✨ AI Değerlendirme promptu panoya kopyalandı! Gemini veya ChatGPT'ye yapıştırıp sonucu aşağıdaki alana aktarabilirsiniz.");
            const pasteArea = document.getElementById('pg-ai-paste-area');
            if (pasteArea) pasteArea.style.display = 'block';
        }).catch(err => {
            console.error(err);
        });
    }

    function pgApplyAIResult() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const input = document.getElementById('pg-ai-json-input').value.trim();
        try {
            let clean = input.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(clean);
            const members = g.members || g.uyeler || [];

            result.forEach(aiData => {
                const member = members.find(m => (m.name || m.adSoyad) === aiData.name);
                if (member) {
                    member.score = aiData.score;
                    member.aktif = aiData.aktif;
                    member.sdg_rozeti = aiData.sdg_rozeti || "";
                    member.sonIslem = new Date().toLocaleDateString('tr-TR');
                }
            });
            pgSave();
            pgRenderMemberScores();
            const pArea = document.getElementById('pg-ai-paste-area');
            if (pArea) pArea.style.display = 'none';
            const jInput = document.getElementById('pg-ai-json-input');
            if (jInput) jInput.value = '';
            alert("✅ AI Puanları başarıyla işlendi!");
        } catch (e) {
            alert("Geçersiz JSON formatı! Lütfen geçerli bir JSON dizisi girin.");
        }
    }

    function pgRenderMemberScores() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const members = g.members || g.uyeler || [];
        const table = document.getElementById('pg-member-score-table');
        if (!table) return;

        table.innerHTML = `
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>Öğrenci & Rol</th>
                        <th>Puan</th>
                        <th>Durum</th>
                        <th>Son İşlem</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    ${members.map((m, i) => {
                        const col = m.score >= 70 ? '#10b981' : m.score >= 45 ? '#f59e0b' : '#ef4444';
                        const rKey = m.rolKey || 'arastirmaci';
                        const rInfo = BELBIN_ROLES[rKey] || { icon: '👤', title: m.rol || 'Üye' };
                        return `
                            <tr>
                                <td>
                                    <strong>${escapeHTML(m.name || m.adSoyad)}</strong>
                                    <div style="font-size:11px;color:var(--text-muted);">${rInfo.icon} ${escapeHTML(m.rol || rInfo.title)}</div>
                                </td>
                                <td><strong style="color:${col};">${Number(m.score) || 0}p</strong></td>
                                <td>
                                    <span style="padding:2px 7px;border-radius:12px;font-size:11px;font-weight:700;background:${m.aktif ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'};color:${m.aktif ? '#10b981' : '#ef4444'};">
                                        ${m.aktif ? '✅ Aktif' : '⚠️ Pasif'}
                                    </span>
                                </td>
                                <td style="font-size:11px;color:var(--text-muted);">${escapeHTML(m.sonIslem || '-')}</td>
                                <td>
                                    <button class="btn" onclick="pgAddKatilim(${i})" style="padding:4px 8px;font-size:11px;background:var(--secondary);" title="Katılım Puanı Ekle (+5)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </td>
                            </tr>`;
                    }).join('')}
                </tbody>
            </table>`;
    }

    function pgAddKatilim(idx) {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        const members = g ? (g.members || g.uyeler) : null;
        if (!members || !members[idx]) return;
        members[idx].katilimSayisi = (members[idx].katilimSayisi || 0) + 1;
        members[idx].score = Math.min(100, (members[idx].score || 70) + 5);
        members[idx].sonIslem = new Date().toLocaleDateString('tr-TR');
        pgSave();
        pgRenderMemberScores();
    }

    function pgDemoteInactive() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const members = g.members || g.uyeler || [];
        const inactive = members.filter(m => !m.aktif);
        if (!inactive.length) return alert('Tüm üyeler aktif.');
        const nextType = PG_TYPE_DEMOTE[g.type || g.grupTipi];
        if (!nextType) return alert('Bu grup zaten en alt üretim seviyesinde.');
        if (!confirm(`${inactive.length} pasif üye "${PG_TYPE_LABELS[nextType]}" grubuna taşınacak. Onaylıyor musunuz?`)) return;

        const currentAll = _pgData();
        inactive.forEach(m => {
            g.members = members.filter(x => (x.name || x.adSoyad) !== (m.name || m.adSoyad));
            g.uyeler = g.members;
            const newGrup = currentAll.find(pg => pg && (pg.type === nextType || pg.grupTipi === nextType) && pg.sinif === g.sinif);
            if (newGrup) {
                m.aktif = true;
                (newGrup.members || newGrup.uyeler).push(m);
            }
        });
        _setPgData(currentAll);
        pgSave();
        pgRenderMemberScores();
        pgRenderList();
    }

    function pgRemoveInactive() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        let members = g.members || g.uyeler || [];
        const inactive = members.filter(m => !m.aktif);
        if (!inactive.length) return alert('Tüm üyeler aktif.');
        if (!confirm(`${inactive.length} pasif üye gruptan çıkarılacak. Onaylıyor musunuz?`)) return;
        g.members = members.filter(m => m.aktif);
        g.uyeler = g.members;
        pgSave();
        pgRenderMemberScores();
        pgRenderList();
    }

    // ── Mesajlaşma ──
    function pgRenderMessages() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const thread = document.getElementById('pg-msg-thread');
        if (!thread) return;

        let allMsgs = [...(g.mesajlar || [])];
        const gForms = pgFormsData.filter(f => f.grupAdi === (g.title || g.projeAdi));
        gForms.forEach(f => {
            let msgText = `<strong>📝 Proje Uydu Raporu</strong><br>
                <strong>Öğrenci:</strong> ${escapeHTML(f.adSoyad)}<br>
                <strong>Çözüm Fikri:</strong> ${escapeHTML(f.formResponse ? f.formResponse.cozumOneri : '')}<br>
                <strong>Katkı:</strong> ${escapeHTML(f.formResponse ? f.formResponse.kisiselKatki : '')}`;
            let timeStr = new Date(f.timestamp || Date.now()).toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
            allMsgs.push({ taraf: 'student', isReport: true, metin: msgText, zaman: timeStr, timestamp: f.timestamp || Date.now() });
        });

        allMsgs.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

        thread.innerHTML = allMsgs.length
            ? allMsgs.map(m => `
                <div class="pg-msg ${escapeHTML(m.taraf || '')}">
                    ${m.isReport ? m.metin : escapeHTML(m.metin || '')}
                    <div class="pg-msg-meta">${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'} — ${escapeHTML(m.zaman || '')}</div>
                </div>`).join('')
            : '<div style="text-align:center;color:var(--text-muted);padding:20px;font-size:13px;">Henüz mesaj veya form raporu yok.</div>';
        thread.scrollTop = thread.scrollHeight;
    }

    function pgSendMessage() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const input = document.getElementById('pg-msg-input');
        if (!input) return;
        const metin = input.value.trim();
        if (!metin) return;
        g.mesajlar = g.mesajlar || [];
        g.mesajlar.push({ taraf: 'teacher', metin, zaman: new Date().toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }), timestamp: Date.now() });
        input.value = '';
        pgSave();
        pgRenderMessages();
    }

    function pgShareMsgWhatsapp() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        let text = `📋 *${g.title || g.projeAdi}* — Takım İletişim Akışı\n\n`;
        (g.mesajlar || []).slice(-10).forEach(m => {
            text += `${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'}: ${m.metin}\n`;
        });
        window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(text), '_blank');
    }

    function pgShareMsgBip() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        let text = `📋 *${g.title || g.projeAdi}* — Takım İletişim Akışı\n\n`;
        (g.mesajlar || []).slice(-10).forEach(m => {
            text += `${m.taraf === 'teacher' ? '🧑‍🏫 Öğretmen' : '👨‍🎓 Öğrenci'}: ${m.metin}\n`;
        });
        if (typeof window.shareViaBip === 'function') {
            window.shareViaBip(text, `${g.title || g.projeAdi} İletişim`);
        } else {
            window.open('https://web.bip.com/', '_blank');
        }
    }

    // ── İçerik & Ödev Bağlantıları ──
    function pgRenderOdev() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const box = document.getElementById('pg-odev-content');
        if (!box) return;
        if (!g.odevLinks || !g.odevLinks.length) {
            box.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">Henüz kaynak bağlantısı eklenmemiş.</p>';
            return;
        }
        box.innerHTML = g.odevLinks.map((l, i) => {
            const rawUrl = (l.url || '').trim();
            const safeUrl = (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) ? rawUrl : '#';
            const safeLabel = escapeHTML(l.label || l.url || 'Kaynak');
            return `
                <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;border:1px solid var(--border);background:var(--input-bg);margin-bottom:8px;">
                    <i class="fas fa-link" style="color:var(--secondary);font-size:16px;"></i>
                    <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="flex:1;color:var(--secondary);font-weight:600;font-size:13px;">${safeLabel}</a>
                    <button onclick="pgRemoveOdevLink(${i})" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;"><i class="fas fa-times"></i></button>
                </div>`;
        }).join('');
    }

    function pgAddOdevLink() {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g) return;
        const urlInput = document.getElementById('pg-odev-link-input');
        const labelInput = document.getElementById('pg-odev-link-label');
        const url = urlInput ? urlInput.value.trim() : '';
        const label = (labelInput && labelInput.value.trim()) || url;
        if (!url) return alert('Link boş bırakılamaz!');
        if (!g.odevLinks) g.odevLinks = [];
        g.odevLinks.push({ url, label });
        if (urlInput) urlInput.value = '';
        if (labelInput) labelInput.value = '';
        pgSave();
        pgRenderOdev();
    }

    function pgRemoveOdevLink(i) {
        const g = _pgData().find(x => x && String(x.id) === String(pgActiveId));
        if (!g || !g.odevLinks) return;
        g.odevLinks.splice(i, 1);
        pgSave();
        pgRenderOdev();
    }

    // ── Global Dışa Aktarımlar ──
    window.initProjeGruplariModule = initProjeGruplariModule;
    window.renderProjeGruplariModule = pgRenderList;
    window.pgLoad = pgLoad;
    window.pgSave = pgSave;
    window.pgFillSinifDropdowns = pgFillSinifDropdowns;
    window.pgOpenCreateModal = pgOpenCreateModal;
    window.pgCloseCreateModal = pgCloseCreateModal;
    window.pgPopulateCreateMembers = pgPopulateCreateMembers;
    window.pgCreateGroup = pgCreateGroup;
    window.pgRenderList = pgRenderList;
    window.pgUpdateTypeCounts = pgUpdateTypeCounts;
    window.pgFilterByType = pgFilterByType;
    window.pgDeleteGroup = pgDeleteGroup;
    window.pgOpenDetail = pgOpenDetail;
    window.pgCloseDetailModal = pgCloseDetailModal;
    window.pgCopyFormLink = pgCopyFormLink;
    window.pgPrintGroupQRCodes = pgPrintGroupQRCodes;
    window.pgSwitchInner = pgSwitchInner;
    window.pgRenderPhaseEditor = pgRenderPhaseEditor;
    window.pgUpdatePhase = pgUpdatePhase;
    window.pgRunAIEval = pgRunAIEval;
    window.pgApplyAIResult = pgApplyAIResult;
    window.pgRenderMemberScores = pgRenderMemberScores;
    window.pgAddKatilim = pgAddKatilim;
    window.pgDemoteInactive = pgDemoteInactive;
    window.pgRemoveInactive = pgRemoveInactive;
    window.pgRenderMessages = pgRenderMessages;
    window.pgSendMessage = pgSendMessage;
    window.pgShareMsgWhatsapp = pgShareMsgWhatsapp;
    window.pgShareMsgBip = pgShareMsgBip;
    window.pgRenderOdev = pgRenderOdev;
    window.pgAddOdevLink = pgAddOdevLink;
    window.pgRemoveOdevLink = pgRemoveOdevLink;

    // Sayfa ve Sekme Açılışında Otomatik Başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initProjeGruplariModule, 500);
        });
    } else {
        setTimeout(initProjeGruplariModule, 500);
    }

})();
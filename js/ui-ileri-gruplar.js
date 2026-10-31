// ============================================================
// ui-ileri-gruplar.js (DÜZELTİLMİŞ TAM KOD)
// Bölüm 10: 🌙 İleri Çalışma Grupları
// Carol Ann Tomlinson Farklılaştırılmış Öğretim & ZPD İstasyon Motoru
// ============================================================

(function () {
    'use strict';

    // ── XSS Koruma Yardımcısı ──
    const esc = function (str) {
        if (typeof window.escapeHTML === 'function') return window.escapeHTML(str);
        if (typeof window.escapeHtml === 'function') return window.escapeHtml(str);
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
            console.warn("Öğrenci verisi yerelden çözümlenemedi:", e);
        }
        return [];
    }

    function getSafeExams() {
        if (Array.isArray(window.examData) && window.examData.length > 0) return window.examData;
        if (Array.isArray(window.exams) && window.exams.length > 0) return window.exams;
        return [];
    }

    function getSafeTracking() {
        if (Array.isArray(window.trackingData) && window.trackingData.length > 0) return window.trackingData;
        if (Array.isArray(window.trackingItems) && window.trackingItems.length > 0) return window.trackingItems;
        if (Array.isArray(window.homeworks) && window.homeworks.length > 0) return window.homeworks;
        return [];
    }

    // ── Pedagojik Seviye & İstasyon Tanımları ──
    const TOMLINSON_TIERS = {
        destek: {
            id: 'destek',
            title: 'Destek & Telafi Grubu',
            badge: '🌱 Destek (ZPD Giriş)',
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)',
            bloom: 'Hatırlama & Kavrama',
            istasyon: 'Somut Yönerge & Kavram Haritası',
            hedef: 'Kritik kazanım eksiklerinin somut materyallerle kapatılması.'
        },
        temel: {
            id: 'temel',
            title: 'Temel Kavrama Grubu',
            badge: '📚 Temel (ZPD Çekirdek)',
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)',
            bloom: 'Uygulama & Çözümleme',
            istasyon: 'Problem Çözüm & Soru İstasyonu',
            hedef: 'Müfredat standart kazanımlarının pekiştirilmesi.'
        },
        zenginlestirme: {
            id: 'zenginlestirme',
            title: 'İleri Zenginleştirme',
            badge: '⚡ Zenginleştirme (ZPD İleri)',
            color: '#8b5cf6',
            bg: 'rgba(139, 92, 246, 0.1)',
            bloom: 'Analiz & Değerlendirme',
            istasyon: 'Disiplinlerarası Vaka Analizi',
            hedef: 'Karmaşık problemler ve mantık yürütme çalışmaları.'
        },
        akademi: {
            id: 'akademi',
            title: 'Olimpiyat & Akademi',
            badge: '🚀 Akademi & Olimpiyat',
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.1)',
            bloom: 'Sentez & Yaratma',
            istasyon: 'Özgün İnovasyon & Hipotez Testi',
            hedef: 'Derinleştirilmiş araştırma ve üst düzey proje üretimi.'
        }
    };

    // ── Global Durum Normalizasyonu & Senkronizasyon ──
    function normalizeAdvGroup(rawGroup, index) {
        if (!rawGroup) return null;

        if (Array.isArray(rawGroup)) {
            const first = rawGroup[0] || {};
            const sinif = first.sinif || 'Genel';
            const tierKey = 'temel';
            const tierInfo = TOMLINSON_TIERS[tierKey];
            return {
                id: 'adv_grp_' + Date.now() + '_' + (index + 1),
                sinif: sinif,
                grupAdi: `🚀 İleri Çalışma Grubu ${index + 1}`,
                seviye: tierInfo.title,
                tierKey: tierKey,
                odakKonu: tierInfo.hedef,
                istasyonTipi: tierInfo.istasyon,
                bloomSeviyesi: tierInfo.bloom,
                ogrenciler: rawGroup.map(o => ({
                    id: o.id || o.no || '',
                    no: o.no || '',
                    adSoyad: o.adSoyad || o.name || 'Öğrenci',
                    sinif: o.sinif || sinif,
                    score: Number(o._skor || o.score || 75),
                    vak: o.vak || o.vakResult || 'Görsel'
                })),
                gorevler: [
                    { id: 't1_' + index, baslik: 'İstasyon Giriş Analizi', durum: 'tamamlandi' },
                    { id: 't2_' + index, baslik: 'ZPD Derinleşme Etkinliği', durum: 'bekliyor' }
                ],
                kazanimDurumu: { tamamlanan: 1, gelistirilmeli: 1, kritikEksik: 0 },
                olusturmaTarihi: new Date().toISOString()
            };
        }

        if (typeof rawGroup === 'object') {
            const tierKey = rawGroup.tierKey || (rawGroup.seviye && rawGroup.seviye.includes('Akademi') ? 'akademi' : (rawGroup.seviye && rawGroup.seviye.includes('Zengin') ? 'zenginlestirme' : 'temel'));
            const tierInfo = TOMLINSON_TIERS[tierKey] || TOMLINSON_TIERS.temel;
            const ogrs = Array.isArray(rawGroup.ogrenciler) ? rawGroup.ogrenciler : (Array.isArray(rawGroup.members) ? rawGroup.members : (Array.isArray(rawGroup.uyeler) ? rawGroup.uyeler : []));

            return {
                id: rawGroup.id || ('adv_grp_' + Date.now() + '_' + (index + 1)),
                sinif: rawGroup.sinif || (ogrs[0] && ogrs[0].sinif) || 'Genel',
                grupAdi: rawGroup.grupAdi || rawGroup.title || `${tierInfo.badge} - Takım ${index + 1}`,
                seviye: rawGroup.seviye || tierInfo.title,
                tierKey: tierKey,
                odakKonu: rawGroup.odakKonu || rawGroup.tema || tierInfo.hedef,
                istasyonTipi: rawGroup.istasyonTipi || tierInfo.istasyon,
                bloomSeviyesi: rawGroup.bloomSeviyesi || tierInfo.bloom,
                ogrenciler: ogrs.map(o => {
                    if (typeof o === 'string') {
                        const allSt = getSafeStudents();
                        const found = allSt.find(s => s && (s.adSoyad === o || s.id === o || String(s.no) === o));
                        return {
                            id: found ? (found.id || found.no) : o,
                            no: found ? (found.no || '') : '',
                            adSoyad: found ? found.adSoyad : o,
                            sinif: found ? (found.sinif || '') : '',
                            score: 75,
                            vak: found ? (found.vak || found.vakResult || 'Görsel') : 'Görsel'
                        };
                    }
                    return {
                        id: o.id || o.studentId || o.no || '',
                        no: o.no || '',
                        adSoyad: o.adSoyad || o.name || 'Öğrenci',
                        sinif: o.sinif || rawGroup.sinif || '',
                        score: Number(o.score || o._skor || 75),
                        vak: o.vak || o.vakResult || 'Görsel'
                    };
                }),
                gorevler: Array.isArray(rawGroup.gorevler) ? rawGroup.gorevler : [
                    { id: 't1_' + index, baslik: `${tierInfo.istasyon} Giriş Analizi`, durum: 'tamamlandi' },
                    { id: 't2_' + index, baslik: 'ZPD Derinleşme Etkinliği', durum: 'bekliyor' }
                ],
                kazanimDurumu: rawGroup.kazanimDurumu || { tamamlanan: 1, gelistirilmeli: 1, kritikEksik: 0 },
                olusturmaTarihi: rawGroup.olusturmaTarihi || new Date().toISOString()
            };
        }

        return null;
    }

    function getAdvData() {
        let raw = window.advancedGroupData;
        if (!raw && typeof advancedGroupData !== 'undefined') raw = advancedGroupData;
        if (!raw) raw = window.regularGroupsData;

        // Yerel depodan geri yükleme desteği
        if (!raw || (Array.isArray(raw) && raw.length === 0)) {
            try {
                const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
                const uid = currentUser?.uid || '';
                const baseKey = (typeof STORAGE_KEY !== 'undefined') ? STORAGE_KEY : 'proje_tabanli_ders_data';
                const userKey = uid ? `${baseKey}_${uid}` : baseKey;
                const stored = JSON.parse(localStorage.getItem(userKey) || localStorage.getItem(baseKey) || '{}');
                raw = stored.advancedGroupData || stored.advancedGroups || [];
            } catch (e) {}
        }

        let list = [];
        if (Array.isArray(raw)) {
            list = raw;
        } else if (raw && typeof raw === 'object') {
            list = Object.values(raw);
        }

        const normalized = list.map((g, idx) => normalizeAdvGroup(g, idx)).filter(Boolean);
        window.advancedGroupData = normalized;
        window.regularGroupsData = normalized;
        if (typeof advancedGroupData !== 'undefined') {
            try { advancedGroupData = normalized; } catch (e) { }
        }
        return normalized;
    }

    function setAdvData(data) {
        const list = Array.isArray(data) ? data : [];
        window.advancedGroupData = list;
        window.regularGroupsData = list;
        if (typeof advancedGroupData !== 'undefined') {
            try { advancedGroupData = list; } catch (e) { }
        }

        // Yerel depoya ve Firebase'e kalıcı olarak yaz
        try {
            const currentUser = (window.firebase && firebase.auth) ? firebase.auth().currentUser : null;
            const uid = currentUser?.uid || '';
            const baseKey = (typeof STORAGE_KEY !== 'undefined') ? STORAGE_KEY : 'proje_tabanli_ders_data';
            const userKey = uid ? `${baseKey}_${uid}` : baseKey;
            
            const currentStore = JSON.parse(localStorage.getItem(userKey) || localStorage.getItem(baseKey) || '{}');
            currentStore.advancedGroupData = list;
            localStorage.setItem(userKey, JSON.stringify(currentStore));
            localStorage.setItem(baseKey, JSON.stringify(currentStore));

            if (window.db && window.userDBPath) {
                window.db.ref(window.userDBPath + '/advancedGroupData').set(list).catch(() => {});
            }
        } catch (e) {
            console.error("İleri gruplar kaydedilemedi:", e);
        }
    }

    // ── Rotasyon Zamanlayıcı Değişkenleri ──
    let rotationTimerInterval = null;
    let rotationRemainingSeconds = 20 * 60; // 20 dk
    let rotationIsRunning = false;

    // ── Yaşam Döngüsü Başlatıcı ──
    function initIleriGruplarModule() {
        populateClassDropdown();
        renderExistingData();
        setupTimerUI();
    }

    // ── Sınıf Açılır Kutusunu Doldur ──
    function populateClassDropdown() {
        const sel = document.getElementById('ileri-sinif');
        if (!sel) return;
        const students = getSafeStudents();
        const siniflar = [...new Set(students.map(s => s && s.sinif).filter(Boolean))].sort();
        const curVal = sel.value;
        sel.innerHTML = '<option value="">Tüm Sınıflar</option>' +
            siniflar.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
        if (curVal && siniflar.includes(curVal)) {
            sel.value = curVal;
        }
    }

    // ── Mevcut Veriyi Ekrana Bas ──
    function renderExistingData() {
        const data = getAdvData();
        const container = document.getElementById('ileri-result-panel');
        if (!container) return;

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:50px 20px;color:var(--text-muted);">
                    <i class="fas fa-layer-group fa-3x" style="margin-bottom:15px;opacity:0.4;"></i>
                    <p style="font-weight:700;font-size:16px;">Henüz İleri Çalışma Grubu Oluşturulmadı</p>
                    <p style="font-size:12px;max-width:460px;margin:8px auto 16px;">
                        Carol Ann Tomlinson Farklılaştırılmış Öğretim algoritmasını çalıştırmak için sol panelden kriterleri belirleyip <strong>"Pedagojik ZPD Analizi Başlat"</strong> butonuna tıklayın.
                    </p>
                </div>`;
            const ozetPanel = document.getElementById('ileri-ozet-panel');
            if (ozetPanel) ozetPanel.style.display = 'none';
            return;
        }

        renderIleriGruplarModule(data);
    }

    // ── Akıllı Kümeleme Algoritması ──
    function ileriGrupAnalizEt() {
        populateClassDropdown();
        const sinifEl = document.getElementById('ileri-sinif');
        const sinifFiltre = sinifEl ? sinifEl.value : '';
        const grupBoyutInput = document.querySelector('input[name="ileri-grup-boyut"]:checked');
        const grupBoyut = parseInt(grupBoyutInput ? grupBoyutInput.value : 4, 10) || 4;
        const esikEl = document.getElementById('ileri-esik');
        const esik = parseInt(esikEl ? esikEl.value : 30, 10) || 30;

        const kritXP = document.getElementById('krit-xp') ? document.getElementById('krit-xp').checked : true;
        const kritOdev = document.getElementById('krit-odev') ? document.getElementById('krit-odev').checked : true;
        const kritSinav = document.getElementById('krit-sinav') ? document.getElementById('krit-sinav').checked : true;
        const kritKatilim = document.getElementById('krit-katilim') ? document.getElementById('krit-katilim').checked : true;

        const allStudents = getSafeStudents();
        const allTracking = getSafeTracking();
        const allExams = getSafeExams();

        const hedefOgrenciler = allStudents.filter(s => {
            if (!s || !s.adSoyad) return false;
            if (!sinifFiltre) return true;
            return s.sinif === sinifFiltre || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(sinifFiltre));
        });

        if (hedefOgrenciler.length < 2) {
            const container = document.getElementById('ileri-result-panel');
            if (container) {
                container.innerHTML = `
                    <div style="padding:40px;text-align:center;color:var(--text-muted);">
                        <i class="fas fa-exclamation-triangle fa-2x mb-2" style="color:var(--yellow);opacity:0.8;"></i>
                        <p style="font-weight:600;">Bu sınıfta analiz için yeterli öğrenci bulunamadı.</p>
                        <p style="font-size:12px;">Öğrenci Bilgi Sistemi (Modül 1)'den en az 2 öğrenci eklenmiş olmalıdır.</p>
                    </div>`;
            }
            return;
        }

        // Metrik Normalizasyonu
        let minXP = 0, maxXP = 1;
        if (kritXP) {
            const allXP = hedefOgrenciler.map(x => Number(x.xp) || 0);
            minXP = Math.min(...allXP);
            maxXP = Math.max(...allXP);
        }
        const rangeXP = (maxXP - minXP) || 1;

        let maxNet = 1;
        if (kritSinav && allExams.length > 0) {
            const allNets = allExams.flatMap(e => {
                const res = (e && e.results) || {};
                return Object.values(res).map(r => parseFloat(r && r.totalNet) || 0);
            });
            maxNet = allNets.length ? Math.max(...allNets, 1) : 1;
        }

        // Pedagojik hazırbulunuşluk skoru hesapla
        const skorlar = hedefOgrenciler.map(s => {
            let totalScore = 0;
            let activeCritCount = 0;

            if (kritXP) {
                const sXP = Number(s.xp) || 0;
                totalScore += Math.max(0, Math.min(100, ((sXP - minXP) / rangeXP) * 100));
                activeCritCount++;
            }

            if (kritOdev) {
                const sOdevler = allTracking.filter(t => t && (t.sinif === s.sinif || !t.sinif || !sinifFiltre));
                let odevPuan = 70;
                if (sOdevler.length > 0) {
                    const tamamlanan = sOdevler.filter(t => {
                        if (!t.submissions) return false;
                        const sub = t.submissions[s.adSoyad] || (s.id && t.submissions[s.id]) || (s.no && t.submissions[s.no]);
                        return sub && (sub.done || sub.status === 'done' || sub.status === '+');
                    }).length;
                    odevPuan = (tamamlanan / sOdevler.length) * 100;
                }
                totalScore += odevPuan;
                activeCritCount++;
            }

            if (kritSinav) {
                let sNets = [];
                allExams.forEach(e => {
                    const res = (e && e.results) || {};
                    const myRes = res[s.adSoyad] || (s.id && res[s.id]) || (s.no && res[s.no]) ||
                        Object.values(res).find(r => r && (r.studentId === s.id || r.no === s.no || r.adSoyad === s.adSoyad));
                    if (myRes && myRes.totalNet !== undefined && myRes.totalNet !== null && myRes.totalNet !== '') {
                        sNets.push(parseFloat(myRes.totalNet) || 0);
                    }
                });
                let netPuan = 60;
                if (sNets.length > 0) {
                    const avgNet = sNets.reduce((a, b) => a + b, 0) / sNets.length;
                    netPuan = Math.max(0, Math.min(100, (avgNet / maxNet) * 100));
                }
                totalScore += netPuan;
                activeCritCount++;
            }

            if (kritKatilim) {
                const formYanitSayisi = (s.formResponses && s.formResponses.length) || (s.katilimSayisi || 1);
                const katilimPuan = Math.min(100, formYanitSayisi * 25);
                totalScore += katilimPuan;
                activeCritCount++;
            }

            const nihaiPuan = activeCritCount > 0 ? Math.round(totalScore / activeCritCount) : 50;
            const vakStil = s.vak || s.vakResult || (s.psikometri && s.psikometri.vak) || 'Görsel';

            return {
                student: s,
                score: nihaiPuan,
                vak: vakStil
            };
        });

        skorlar.sort((a, b) => b.score - a.score);

        const groups = [];
        let groupCounter = 1;

        const ustKademeSayisi = Math.max(1, Math.round(skorlar.length * (esik / 100)));
        const ustKademe = skorlar.slice(0, ustKademeSayisi);
        const altKademe = skorlar.slice(ustKademeSayisi);

        const yariUst = Math.ceil(ustKademe.length / 2);
        const akademiList = ustKademe.slice(0, yariUst);
        const zenginList = ustKademe.slice(yariUst);

        const yariAlt = Math.ceil(altKademe.length / 2);
        const temelList = altKademe.slice(0, yariAlt);
        const destekList = altKademe.slice(yariAlt);

        const clusterAndBuild = (pool, tierKey) => {
            if (!pool || pool.length === 0) return;
            const tierInfo = TOMLINSON_TIERS[tierKey] || TOMLINSON_TIERS.temel;

            for (let i = 0; i < pool.length; i += grupBoyut) {
                const chunk = pool.slice(i, i + grupBoyut);
                const gId = 'adv_grp_' + Date.now() + '_' + groupCounter;

                groups.push({
                    id: gId,
                    sinif: sinifFiltre || chunk[0].student.sinif || 'Genel',
                    grupAdi: `${tierInfo.badge} - Takım ${groupCounter}`,
                    seviye: tierInfo.title,
                    tierKey: tierKey,
                    odakKonu: tierInfo.hedef,
                    istasyonTipi: tierInfo.istasyon,
                    bloomSeviyesi: tierInfo.bloom,
                    ogrenciler: chunk.map(item => ({
                        id: item.student.id || item.student.no,
                        no: item.student.no || '',
                        adSoyad: item.student.adSoyad,
                        sinif: item.student.sinif,
                        score: item.score,
                        vak: item.vak
                    })),
                    gorevler: [
                        { id: 't1_' + gId, baslik: `${tierInfo.istasyon} Giriş Analizi`, durum: 'tamamlandi' },
                        { id: 't2_' + gId, baslik: 'ZPD Derinleşme Etkinliği', durum: 'bekliyor' },
                        { id: 't3_' + gId, baslik: 'Kazanım Değerlendirme Raporu', durum: 'bekliyor' }
                    ],
                    kazanimDurumu: { tamamlanan: 1, gelistirilmeli: 1, kritikEksik: 0 },
                    olusturmaTarihi: new Date().toISOString()
                });
                groupCounter++;
            }
        };

        clusterAndBuild(akademiList, 'akademi');
        clusterAndBuild(zenginList, 'zenginlestirme');
        clusterAndBuild(temelList, 'temel');
        clusterAndBuild(destekList, 'destek');

        setAdvData(groups);
        renderIleriGruplarModule(groups);

        if (typeof window.saveData === 'function') {
            window.saveData(true);
        }
    }

    // ── Arayüz Render Motoru ──
    function renderIleriGruplarModule(groups) {
        groups = groups || getAdvData();
        const container = document.getElementById('ileri-result-panel');
        if (!container) return;

        if (!groups || groups.length === 0) {
            renderExistingData();
            return;
        }

        const ozetPanel = document.getElementById('ileri-ozet-panel');
        const ozetContent = document.getElementById('ileri-ozet-content');
        if (ozetPanel && ozetContent) {
            ozetPanel.style.display = 'block';
            const toplamOgr = groups.reduce((acc, g) => acc + (g.ogrenciler ? g.ogrenciler.length : 0), 0);
            ozetContent.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px;text-align:center;">
                    <div style="background:var(--input-bg);border-radius:8px;padding:10px;border:1px solid var(--border);">
                        <div style="font-size:20px;font-weight:700;color:var(--secondary);">${toplamOgr}</div>
                        <div style="font-size:11px;color:var(--text-muted);">Öğrenci</div>
                    </div>
                    <div style="background:var(--input-bg);border-radius:8px;padding:10px;border:1px solid var(--border);">
                        <div style="font-size:20px;font-weight:700;color:var(--accent);">${groups.length}</div>
                        <div style="font-size:11px;color:var(--text-muted);">Aktif İstasyon</div>
                    </div>
                    <div style="background:var(--input-bg);border-radius:8px;padding:10px;border:1px solid var(--border);">
                        <div style="font-size:20px;font-weight:700;color:#f59e0b;">ZPD</div>
                        <div style="font-size:11px;color:var(--text-muted);">Tomlinson Modeli</div>
                    </div>
                </div>`;
        }

        let html = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;flex-wrap:wrap;gap:10px;">
                <h4 style="margin:0;color:var(--secondary);display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-satellite-dish"></i>
                    <span>Farklılaştırılmış İstasyon Takımları (${groups.length} Grup)</span>
                </h4>
                <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#8b5cf6;" onclick="window.ileriGrupProjeAktar()" title="İleri Grupları 11. Proje Grupları sekmesine aktarır">
                        <i class="fas fa-project-diagram me-1"></i>Proje Gruplarına Aktar
                    </button>
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:var(--secondary);" onclick="window.ileriGrupKaydet()" title="İleri Grupları 2. Sınıf Yönetimi sepetine aktarır">
                        <i class="fas fa-campground me-1"></i>Sınıf Kümelerine Aktar
                    </button>
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#10b981;" onclick="window.ileriGrupTopluYazdir()" title="Tüm grupları A4 Gözlem Formu olarak yazdırır">
                        <i class="fas fa-print me-1"></i>A4 Gözlem Formu Yazdır
                    </button>
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#25D366;" onclick="window.ileriGrupWhatsapp()">
                        <i class="fab fa-whatsapp me-1"></i>WhatsApp Paylaş
                    </button>
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#00B2FF;" onclick="window.ileriGrupBip()">
                        <i class="fas fa-comment-dots me-1"></i>BiP Paylaş
                    </button>
                    <!-- Liste Halinde Yönet & Sil Butonu -->
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#0284c7;color:#fff;" onclick="window.ileriGrupListeYonetModalAc()" title="İstasyon gruplarını liste tablosunda inceleyin, tek tek veya seçerek silin">
                        <i class="fas fa-list-check me-1"></i>Grupları Liste Olarak Yönet &amp; Sil
                    </button>
                    <!-- Tüm Grupları Sil Butonu -->
                    <button class="btn" style="font-size:12px;padding:7px 13px;background:#ef4444;color:#fff;" onclick="window.ileriGrupTumunuSil()" title="Tüm istasyon gruplarını kalıcı olarak temizler">
                        <i class="fas fa-trash-alt me-1"></i>Tüm Grupları Sil
                    </button>
                </div>
            </div>

            <!-- Toplu İşlem & Seçim Çubuğu -->
            <div id="ileri-toplu-islem-bar" style="display:flex;justify-content:space-between;align-items:center;background:var(--input-bg);padding:8px 14px;border-radius:10px;border:1px solid var(--border);margin-bottom:15px;flex-wrap:wrap;gap:10px;">
                <div style="display:flex;align-items:center;gap:12px;">
                    <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:12.5px;font-weight:600;margin:0;user-select:none;">
                        <input type="checkbox" id="ileri-tumunu-sec-cb" onchange="window.ileriGrupTumunuSecToggle(this.checked)" style="width:16px;height:16px;cursor:pointer;accent-color:var(--secondary);">
                        <span>Tümünü Seç</span>
                    </label>
                    <span id="ileri-secili-bilgi" style="font-size:11.5px;color:var(--text-muted);display:none;">
                        (<strong>0</strong> / ${groups.length} grup seçildi)
                    </span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                    <button class="btn" id="btn-ileri-secilenleri-sil" onclick="window.ileriGrupSecilenleriSil()" style="display:none;font-size:12px;padding:6px 14px;background:#ef4444;color:#fff;border-radius:6px;border:none;cursor:pointer;font-weight:700;box-shadow:0 2px 6px rgba(239,68,68,0.25);">
                        <i class="fas fa-trash-alt me-1"></i>Seçilenleri Sil (<span id="btn-secili-sayi">0</span>)
                    </button>
                </div>
            </div>

            <div id="station-timer-banner" style="background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12));border:1px solid var(--border);border-radius:12px;padding:14px 18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="font-size:26px;color:var(--secondary);"><i class="fas fa-stopwatch"></i></div>
                    <div>
                        <div style="font-size:14px;font-weight:700;">İstasyon Rotasyon Süresi</div>
                        <div style="font-size:11px;color:var(--text-muted);">Süre dolduğunda takımlar bir sonraki çalışma istasyonuna kayar.</div>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <span id="rotation-timer-display" style="font-family:monospace;font-size:22px;font-weight:800;color:var(--text-main);background:var(--card-bg);padding:4px 14px;border-radius:8px;border:1px solid var(--border);">20:00</span>
                    <button class="btn" id="btn-timer-toggle" onclick="window.toggleRotationTimer()" style="background:var(--secondary);font-size:12px;padding:6px 12px;">
                        <i class="fas fa-play me-1"></i>Başlat
                    </button>
                    <button class="btn btn-clear" onclick="window.resetRotationTimer()" style="font-size:12px;padding:6px 10px;">
                        <i class="fas fa-redo"></i>
                    </button>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:16px;">`;

        groups.forEach((g) => {
            const tier = TOMLINSON_TIERS[g.tierKey] || TOMLINSON_TIERS.temel;
            const ogrList = g.ogrenciler || [];
            const gorevler = g.gorevler || [];

            html += `
                <div class="card" style="border-top:4px solid ${tier.color};padding:16px;border-radius:12px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:var(--shadow);background:var(--card-bg);position:relative;">
                    <div>
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
                            <div style="display:flex;align-items:flex-start;gap:10px;">
                                <input type="checkbox" class="adv-group-cb" value="${esc(g.id)}" onchange="window.ileriGrupSecimGuncelle()" style="margin-top:4px;accent-color:var(--secondary);width:17px;height:17px;cursor:pointer;" title="Bu grubu seç">
                                <div>
                                    <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:${tier.bg};color:${tier.color};">
                                        ${esc(g.seviye || tier.title)}
                                    </span>
                                    <h4 style="margin:6px 0 2px;font-size:15px;color:var(--text-main);">${esc(g.grupAdi)}</h4>
                                    <div style="font-size:11px;color:var(--text-muted);"><i class="fas fa-school me-1"></i>${esc(g.sinif)} Sınıfı</div>
                                </div>
                            </div>
                            <button class="btn btn-clear" onclick="window.ileriGrupSil('${esc(g.id)}')" title="Grubu Sil" style="color:var(--red);padding:4px 8px;">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>

                        <div style="background:var(--input-bg);padding:10px;border-radius:8px;border:1px solid var(--border);margin-bottom:12px;font-size:12px;">
                            <div style="margin-bottom:4px;"><strong>🎯 İstasyon:</strong> ${esc(g.istasyonTipi || tier.istasyon)}</div>
                            <div style="margin-bottom:4px;"><strong>🧠 Bloom Seviyesi:</strong> ${esc(g.bloomSeviyesi || tier.bloom)}</div>
                            <div style="color:var(--text-muted);font-size:11px;"><strong>📌 Odak:</strong> ${esc(g.odakKonu || tier.hedef)}</div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between;">
                                <span>Takım Üyeleri (${ogrList.length})</span>
                                <span style="font-size:11px;color:var(--text-muted);">Hazırbulunuşluk</span>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:5px;">`;

            ogrList.forEach(rawOgr => {
                let ogr = rawOgr;
                if (typeof rawOgr === 'string') {
                    const st = getSafeStudents().find(s => s && (s.id === rawOgr || String(s.no) === rawOgr || s.adSoyad === rawOgr));
                    ogr = {
                        adSoyad: st ? st.adSoyad : rawOgr,
                        no: st ? st.no : '',
                        vak: st ? (st.vak || st.vakResult || 'Görsel') : 'Görsel',
                        score: 75
                    };
                } else if (!rawOgr) {
                    return;
                }
                const vakBadge = ogr.vak === 'İşitsel' ? '🎧 İşitsel' : (ogr.vak === 'Kinestetik' ? '✋ Kinestetik' : '👁️ Görsel');
                html += `
                    <div style="display:flex;justify-content:space-between;align-items:center;background:var(--card-bg);padding:6px 10px;border-radius:6px;border:1px solid var(--border);font-size:12px;">
                        <div>
                            <span style="font-weight:600;">${esc(ogr.adSoyad || 'Öğrenci')}</span>
                            <span style="font-size:10px;color:var(--text-muted);margin-left:4px;">#${esc(ogr.no || '')}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:rgba(59,130,246,0.1);color:var(--secondary);">${vakBadge}</span>
                            <span style="font-weight:700;font-size:11px;color:${tier.color};">${ogr.score || 75}p</span>
                        </div>
                    </div>`;
            });

            html += `
                            </div>
                        </div>

                        <div style="margin-bottom:14px;">
                            <div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
                                <span>İstasyon Görevleri</span>
                                <button class="btn btn-clear" style="font-size:11px;padding:2px 6px;color:var(--secondary);" onclick="window.ileriGrupGorevEklePrompt('${esc(g.id)}')">
                                    <i class="fas fa-plus"></i> Görev Ekle
                                </button>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:4px;">`;

            gorevler.forEach(t => {
                const isDone = t.durum === 'tamamlandi';
                html += `
                    <div style="display:flex;align-items:center;justify-content:space-between;background:var(--input-bg);padding:5px 8px;border-radius:6px;font-size:11px;">
                        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;flex:1;margin:0;">
                            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="window.ileriGrupGorevToggle('${esc(g.id)}', '${esc(t.id)}')" style="accent-color:var(--accent);">
                            <span style="${isDone ? 'text-decoration:line-through;opacity:0.6;' : ''}">${esc(t.baslik)}</span>
                        </label>
                        <button class="btn btn-clear" style="padding:0 4px;color:var(--text-muted);font-size:10px;" onclick="window.ileriGrupGorevSil('${esc(g.id)}', '${esc(t.id)}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>`;
            });

            html += `
                            </div>
                        </div>
                    </div>

                    <div style="display:flex;gap:6px;border-top:1px solid var(--border);padding-top:10px;margin-top:8px;">
                        <button class="btn" style="flex:1;font-size:11px;padding:6px 8px;background:var(--secondary);" onclick="window.ileriGrupTekilYazdir('${esc(g.id)}')">
                            <i class="fas fa-print me-1"></i>A4 Gözlem
                        </button>
                        <button class="btn" style="font-size:11px;padding:6px 10px;background:#25D366;" onclick="window.ileriGrupWhatsappTekil('${esc(g.id)}')">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                    </div>
                </div>`;
        });

        html += `</div>`;
        container.innerHTML = html;
        setupTimerUI();
    }

    // ── Görev Yönetimi (CRUD) ──
    window.ileriGrupGorevToggle = function (groupId, taskId) {
        const groups = getAdvData();
        const grp = groups.find(g => g && g.id === groupId);
        if (!grp || !grp.gorevler) return;
        const task = grp.gorevler.find(t => t && t.id === taskId);
        if (task) {
            task.durum = task.durum === 'tamamlandi' ? 'bekliyor' : 'tamamlandi';
            setAdvData(groups);
            renderIleriGruplarModule(groups);
            if (typeof window.saveData === 'function') window.saveData(true);
        }
    };

    window.ileriGrupGorevEklePrompt = function (groupId) {
        const title = prompt('Yeni istasyon görev başlığını girin:');
        if (!title || !title.trim()) return;
        const groups = getAdvData();
        const grp = groups.find(g => g && g.id === groupId);
        if (!grp) return;
        if (!grp.gorevler) grp.gorevler = [];
        grp.gorevler.push({
            id: 'task_' + Date.now(),
            baslik: title.trim(),
            durum: 'bekliyor'
        });
        setAdvData(groups);
        renderIleriGruplarModule(groups);
        if (typeof window.saveData === 'function') window.saveData(true);
    };

    window.ileriGrupGorevSil = function (groupId, taskId) {
        const groups = getAdvData();
        const grp = groups.find(g => g && g.id === groupId);
        if (!grp || !grp.gorevler) return;
        grp.gorevler = grp.gorevler.filter(t => t && t.id !== taskId);
        setAdvData(groups);
        renderIleriGruplarModule(groups);
        if (typeof window.saveData === 'function') window.saveData(true);
    };

    // ── Tekil Grup Silme ──
    window.ileriGrupSil = function (groupId) {
        let groups = getAdvData();
        const target = groups.find(g => g && g.id === groupId);
        const name = target ? target.grupAdi : 'Bu istasyon grubu';
        if (!confirm(`"${name}" takımını silmek istediğinize emin misiniz?`)) return;

        groups = groups.filter(g => g && g.id !== groupId);
        setAdvData(groups);
        renderIleriGruplarModule(groups);
        if (typeof window.saveData === 'function') window.saveData(true);

        if (typeof window.ileriGrupListeRenderTablo === 'function') {
            window.ileriGrupListeRenderTablo();
        }
    };

    // ── Tüm Grupları Toplu Silme ──
    window.ileriGrupTumunuSil = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) {
            alert('Silinecek aktif istasyon takımı bulunamadı.');
            return;
        }

        const count = groups.length;
        if (!confirm(`⚠️ DİKKAT!\n\nOluşturulmuş olan tüm Farklılaştırılmış İstasyon Takımlarını (${count} Grup) silmek istediğinize emin misiniz?\n\nBu işlem kalıcıdır ve tüm istasyon kayıtları temizlenecektir.`)) {
            return;
        }

        setAdvData([]);
        renderExistingData();
        if (typeof window.saveData === 'function') window.saveData(true);

        if (typeof window.ileriGrupListeModalKapat === 'function') {
            window.ileriGrupListeModalKapat();
        }

        alert(`Tüm istasyon takımları (${count} grup) başarıyla silindi.`);
    };

    // ── Seçilenleri Toplu Silme ──
    window.ileriGrupSecilenleriSil = function () {
        const checkedBoxes = Array.from(document.querySelectorAll('.adv-group-cb:checked, .adv-modal-group-cb:checked'));
        const uniqueIds = [...new Set(checkedBoxes.map(cb => cb.value))];

        if (uniqueIds.length === 0) {
            alert('Lütfen silmek istediğiniz en az bir istasyon takımı seçin.');
            return;
        }

        if (!confirm(`Seçilen ${uniqueIds.length} adet istasyon takımını silmek istediğinize emin misiniz?`)) {
            return;
        }

        let groups = getAdvData();
        groups = groups.filter(g => g && !uniqueIds.includes(g.id));
        setAdvData(groups);
        renderIleriGruplarModule(groups);
        if (typeof window.saveData === 'function') window.saveData(true);

        if (typeof window.ileriGrupListeRenderTablo === 'function') {
            window.ileriGrupListeRenderTablo();
        }

        alert(`${uniqueIds.length} adet istasyon takımı silindi.`);
    };

    // ── Checkbox Seçim Durumunu Güncelleme (Grid Görünümü) ──
    window.ileriGrupSecimGuncelle = function () {
        const allBoxes = Array.from(document.querySelectorAll('.adv-group-cb'));
        const checkedBoxes = allBoxes.filter(cb => cb.checked);
        const count = checkedBoxes.length;

        const infoSpan = document.getElementById('ileri-secili-bilgi');
        const silBtn = document.getElementById('btn-ileri-secilenleri-sil');
        const countSpan = document.getElementById('btn-secili-sayi');
        const tumunuSecCb = document.getElementById('ileri-tumunu-sec-cb');

        if (infoSpan) {
            if (count > 0) {
                infoSpan.style.display = 'inline';
                infoSpan.innerHTML = `(<strong>${count}</strong> / ${allBoxes.length} grup seçildi)`;
            } else {
                infoSpan.style.display = 'none';
            }
        }

        if (silBtn && countSpan) {
            countSpan.textContent = count;
            silBtn.style.display = count > 0 ? 'inline-flex' : 'none';
        }

        if (tumunuSecCb) {
            tumunuSecCb.checked = (allBoxes.length > 0 && count === allBoxes.length);
            tumunuSecCb.indeterminate = (count > 0 && count < allBoxes.length);
        }
    };

    // ── Tümünü Seç / Seçimi Kaldır (Grid Görünümü) ──
    window.ileriGrupTumunuSecToggle = function (isChecked) {
        document.querySelectorAll('.adv-group-cb').forEach(cb => {
            cb.checked = !!isChecked;
        });
        window.ileriGrupSecimGuncelle();
    };

    // ── Liste Halinde Yönetim & Silme Modalı ──
    window.ileriGrupListeYonetModalAc = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) {
            alert('Henüz oluşturulmuş bir istasyon takımı bulunmuyor.');
            return;
        }

        let modal = document.getElementById('ileri-grup-liste-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'ileri-grup-liste-modal';
            modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.75);z-index:99999;display:flex;align-items:center;justify-content:center;padding:15px;box-sizing:border-box;';
            modal.innerHTML = `
                <div style="background:var(--card-bg, #ffffff);border-radius:16px;border:1px solid var(--border, #e2e8f0);width:100%;max-width:960px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);overflow:hidden;">
                    <!-- Başlık Çubuğu -->
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 22px;border-bottom:1px solid var(--border, #e2e8f0);background:var(--input-bg, #f8fafc);">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="background:linear-gradient(135deg, #0284c7, #0369a1);color:white;width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(2,132,199,0.3);flex-shrink:0;">
                                <i class="fas fa-list-check"></i>
                            </div>
                            <div>
                                <h3 style="margin:0;font-size:16px;font-weight:700;color:var(--text-main);">
                                    Farklılaştırılmış İstasyon Takımları — Liste Yönetimi &amp; Silme
                                </h3>
                                <p style="margin:2px 0 0 0;font-size:12px;color:var(--text-muted);">
                                    Grupları liste halinde görüntüleyin, tek tek veya seçerek toplu silme yapın.
                                </p>
                            </div>
                        </div>
                        <button type="button" onclick="window.ileriGrupListeModalKapat()" title="Kapat (ESC)" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:24px;line-height:1;padding:4px 8px;border-radius:6px;">
                            &times;
                        </button>
                    </div>

                    <!-- Filtre ve Aksiyon Araç Çubuğu -->
                    <div style="padding:14px 22px;border-bottom:1px solid var(--border, #e2e8f0);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;background:var(--card-bg);">
                        <div style="flex:1;min-width:240px;position:relative;">
                            <i class="fas fa-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px;"></i>
                            <input type="text" id="ileri-modal-search" placeholder="Grup adı, sınıf veya öğrenci adına göre ara..." oninput="window.ileriGrupListeFiltrele(this.value)" style="width:100%;padding:8px 12px 8px 34px;border-radius:8px;border:1px solid var(--border);background:var(--input-bg);color:var(--text-main);font-size:12.5px;box-sizing:border-box;outline:none;">
                        </div>
                        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                            <button type="button" class="btn" id="btn-modal-secilenleri-sil" onclick="window.ileriGrupSecilenleriSil()" style="font-size:12px;padding:7px 14px;background:#ef4444;color:#fff;border-radius:8px;font-weight:700;display:none;">
                                <i class="fas fa-trash-alt me-1"></i>Seçilenleri Sil (<span id="modal-secili-sayi">0</span>)
                            </button>
                            <button type="button" class="btn" onclick="window.ileriGrupTumunuSil()" style="font-size:12px;padding:7px 14px;background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.3);border-radius:8px;font-weight:700;" title="Tüm istasyon gruplarını sil">
                                <i class="fas fa-bomb me-1"></i>Tümünü Temizle
                            </button>
                        </div>
                    </div>

                    <!-- Liste Tablo Alanı -->
                    <div style="padding:0;overflow-y:auto;flex:1;max-height:calc(90vh - 190px);">
                        <div id="ileri-modal-tablo-container"></div>
                    </div>

                    <!-- Alt Bilgi ve Kapat Çubuğu -->
                    <div style="padding:12px 22px;border-top:1px solid var(--border, #e2e8f0);background:var(--input-bg);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                        <span id="ileri-modal-alt-bilgi" style="font-size:12px;color:var(--text-muted);"></span>
                        <button type="button" class="btn btn-clear" onclick="window.ileriGrupListeModalKapat()" style="padding:7px 18px;font-size:12px;">
                            Kapat
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.addEventListener('click', (e) => {
                if (e.target === modal) window.ileriGrupListeModalKapat();
            });
        }

        modal.style.display = 'flex';
        const searchInput = document.getElementById('ileri-modal-search');
        if (searchInput) searchInput.value = '';
        window.ileriGrupListeRenderTablo();
    };

    window.ileriGrupListeModalKapat = function () {
        const modal = document.getElementById('ileri-grup-liste-modal');
        if (modal) modal.style.display = 'none';
        window.ileriGrupSecimGuncelle();
    };

    window.ileriGrupListeFiltrele = function (term) {
        window.ileriGrupListeRenderTablo(term);
    };

    window.ileriGrupListeRenderTablo = function (filterTerm) {
        const container = document.getElementById('ileri-modal-tablo-container');
        if (!container) return;

        let groups = getAdvData();
        if (!groups || groups.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
                    <i class="fas fa-info-circle fa-2x mb-2" style="opacity:0.5;"></i>
                    <p style="margin:0;font-weight:600;">Aktif istasyon grubu bulunmuyor.</p>
                </div>`;
            const altBilgi = document.getElementById('ileri-modal-alt-bilgi');
            if (altBilgi) altBilgi.textContent = 'Toplam 0 grup';
            return;
        }

        const term = (filterTerm || '').trim().toLowerCase();
        let filtered = groups;
        if (term) {
            filtered = groups.filter(g => {
                const gName = (g.grupAdi || '').toLowerCase();
                const gSinif = (g.sinif || '').toLowerCase();
                const gSeviye = (g.seviye || '').toLowerCase();
                const ogrNames = (g.ogrenciler || []).map(o => (typeof o === 'string' ? o : (o.adSoyad || '')).toLowerCase()).join(' ');
                return gName.includes(term) || gSinif.includes(term) || gSeviye.includes(term) || ogrNames.includes(term);
            });
        }

        const altBilgi = document.getElementById('ileri-modal-alt-bilgi');
        if (altBilgi) {
            altBilgi.innerHTML = `Toplam <strong>${groups.length}</strong> grup listeleniyor ${term ? `(Filtre: ${filtered.length} sonuç)` : ''}`;
        }

        let tableHtml = `
            <table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;">
                <thead>
                    <tr style="background:var(--input-bg);border-bottom:1px solid var(--border);color:var(--text-muted);font-size:11.5px;">
                        <th style="padding:10px 14px;width:36px;text-align:center;">
                            <input type="checkbox" id="modal-tumunu-sec-cb" onchange="window.ileriGrupModalTumunuSecToggle(this.checked)" style="accent-color:var(--secondary);width:16px;height:16px;cursor:pointer;">
                        </th>
                        <th style="padding:10px 14px;">Grup &amp; Seviye</th>
                        <th style="padding:10px 14px;">Sınıf</th>
                        <th style="padding:10px 14px;">İstasyon / Odak</th>
                        <th style="padding:10px 14px;">Takım Üyeleri</th>
                        <th style="padding:10px 14px;text-align:center;width:80px;">İşlem</th>
                    </tr>
                </thead>
                <tbody>`;

        filtered.forEach((g) => {
            const tier = TOMLINSON_TIERS[g.tierKey] || TOMLINSON_TIERS.temel;
            const ogrList = g.ogrenciler || [];

            const ogrTags = ogrList.map(rawOgr => {
                const name = typeof rawOgr === 'string' ? rawOgr : (rawOgr.adSoyad || 'Öğrenci');
                const vak = typeof rawOgr === 'object' ? (rawOgr.vak || 'Görsel') : 'Görsel';
                const score = typeof rawOgr === 'object' ? (rawOgr.score || 75) : 75;
                const vakIco = vak === 'İşitsel' ? '🎧' : (vak === 'Kinestetik' ? '✋' : '👁️');
                return `<span style="display:inline-flex;align-items:center;gap:4px;background:var(--input-bg);border:1px solid var(--border);border-radius:4px;padding:2px 6px;margin:2px;font-size:11px;">
                    ${vakIco} <strong>${esc(name)}</strong> <span style="color:${tier.color};font-weight:700;">(${score}p)</span>
                </span>`;
            }).join('');

            tableHtml += `
                <tr style="border-bottom:1px solid var(--border);transition:background 0.15s;" onmouseover="this.style.background='var(--input-bg)'" onmouseout="this.style.background='transparent'">
                    <td style="padding:10px 14px;text-align:center;vertical-align:middle;">
                        <input type="checkbox" class="adv-modal-group-cb" value="${esc(g.id)}" onchange="window.ileriGrupModalSecimGuncelle()" style="accent-color:var(--secondary);width:16px;height:16px;cursor:pointer;">
                    </td>
                    <td style="padding:10px 14px;vertical-align:middle;">
                        <div style="font-weight:700;color:var(--text-main);font-size:13px;">${esc(g.grupAdi)}</div>
                        <span style="font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;background:${tier.bg};color:${tier.color};display:inline-block;margin-top:2px;">
                            ${esc(g.seviye || tier.title)}
                        </span>
                    </td>
                    <td style="padding:10px 14px;vertical-align:middle;color:var(--text-muted);font-weight:600;">
                        ${esc(g.sinif)}
                    </td>
                    <td style="padding:10px 14px;vertical-align:middle;max-width:220px;">
                        <div style="font-weight:600;font-size:11.5px;color:var(--text-main);">${esc(g.istasyonTipi || tier.istasyon)}</div>
                        <div style="font-size:10.5px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(g.odakKonu || tier.hedef)}</div>
                    </td>
                    <td style="padding:10px 14px;vertical-align:middle;">
                        <div style="display:flex;flex-wrap:wrap;max-width:320px;">
                            ${ogrTags || '<span style="color:var(--text-muted);font-size:11px;">Öğrenci yok</span>'}
                        </div>
                    </td>
                    <td style="padding:10px 14px;text-align:center;vertical-align:middle;">
                        <button type="button" class="btn btn-clear" onclick="window.ileriGrupSil('${esc(g.id)}')" title="Bu grubu sil" style="color:var(--red);padding:6px 10px;border-radius:6px;font-size:12px;background:rgba(239,68,68,0.08);">
                            <i class="fas fa-trash-alt me-1"></i>Sil
                        </button>
                    </td>
                </tr>`;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;
        window.ileriGrupModalSecimGuncelle();
    };

    window.ileriGrupModalTumunuSecToggle = function (isChecked) {
        document.querySelectorAll('.adv-modal-group-cb').forEach(cb => {
            cb.checked = !!isChecked;
        });
        window.ileriGrupModalSecimGuncelle();
    };

    window.ileriGrupModalSecimGuncelle = function () {
        const allBoxes = Array.from(document.querySelectorAll('.adv-modal-group-cb'));
        const checkedBoxes = allBoxes.filter(cb => cb.checked);
        const count = checkedBoxes.length;

        const silBtn = document.getElementById('btn-modal-secilenleri-sil');
        const countSpan = document.getElementById('modal-secili-sayi');
        const tumunuSecCb = document.getElementById('modal-tumunu-sec-cb');

        if (silBtn && countSpan) {
            countSpan.textContent = count;
            silBtn.style.display = count > 0 ? 'inline-flex' : 'none';
        }

        if (tumunuSecCb) {
            tumunuSecCb.checked = (allBoxes.length > 0 && count === allBoxes.length);
            tumunuSecCb.indeterminate = (count > 0 && count < allBoxes.length);
        }
    };

    // ── Rotasyon Zamanlayıcı Mantığı ──
    function setupTimerUI() {
        const disp = document.getElementById('rotation-timer-display');
        if (disp) updateTimerDisplay(disp);
        const btn = document.getElementById('btn-timer-toggle');
        if (btn) {
            btn.innerHTML = rotationIsRunning ? '<i class="fas fa-pause me-1"></i>Duraklat' : '<i class="fas fa-play me-1"></i>Başlat';
        }
    }

    function updateTimerDisplay(el) {
        if (!el) el = document.getElementById('rotation-timer-display');
        if (!el) return;
        const m = Math.floor(rotationRemainingSeconds / 60);
        const s = rotationRemainingSeconds % 60;
        el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    window.toggleRotationTimer = function () {
        const btn = document.getElementById('btn-timer-toggle');
        if (rotationIsRunning) {
            clearInterval(rotationTimerInterval);
            rotationIsRunning = false;
            if (btn) btn.innerHTML = '<i class="fas fa-play me-1"></i>Devam Et';
        } else {
            rotationIsRunning = true;
            if (btn) btn.innerHTML = '<i class="fas fa-pause me-1"></i>Duraklat';
            rotationTimerInterval = setInterval(() => {
                if (rotationRemainingSeconds > 0) {
                    rotationRemainingSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(rotationTimerInterval);
                    rotationIsRunning = false;
                    const b = document.getElementById('btn-timer-toggle');
                    if (b) b.innerHTML = '<i class="fas fa-play me-1"></i>Başlat';
                    alert('🔔 İSTASYON ROTASYON SÜRESİ TAMAMLANDI!\nLütfen takımların bir sonraki istasyona geçişini sağlayın.');
                    rotationRemainingSeconds = 20 * 60;
                    updateTimerDisplay();
                }
            }, 1000);
        }
    };

    window.resetRotationTimer = function () {
        clearInterval(rotationTimerInterval);
        rotationIsRunning = false;
        rotationRemainingSeconds = 20 * 60;
        const btn = document.getElementById('btn-timer-toggle');
        if (btn) btn.innerHTML = '<i class="fas fa-play me-1"></i>Başlat';
        updateTimerDisplay();
    };

    // ── A4 Milimetrik Baskı Şablonu ──
    window.ileriGrupTekilYazdir = function (groupId) {
        const groups = getAdvData();
        const grp = groups.find(g => g && g.id === groupId);
        if (!grp) return;
        window.ileriGrupBaskiMotoru([grp]);
    };

    window.ileriGrupTopluYazdir = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) {
            alert('Yazdırılacak aktif grup bulunamadı.');
            return;
        }
        window.ileriGrupBaskiMotoru(groups);
    };

    window.ileriGrupBaskiMotoru = function (groupList) {
        const printWin = window.open('', '_blank');
        if (!printWin) {
            alert('Lütfen tarayıcınızın açılır pencere (pop-up) engelleyicisini kapatın.');
            return;
        }

        let pagesHtml = '';
        groupList.forEach(grp => {
            const tier = TOMLINSON_TIERS[grp.tierKey] || TOMLINSON_TIERS.temel;
            const ogrs = grp.ogrenciler || [];
            const gorevs = grp.gorevler || [];

            pagesHtml += `
                <div class="a4-page">
                    <div class="print-header">
                        <div class="header-titles">
                            <h2>T.C. MİLLÎ EĞİTİM BAKANLIĞI</h2>
                            <h3>Farklılaştırılmış Öğretim & ZPD İstasyon Gözlem Formu</h3>
                            <p>Carol Ann Tomlinson Modeli • Maarif Modeli Bireyselleştirilmiş Takip</p>
                        </div>
                    </div>

                    <div class="info-grid">
                        <div class="info-item"><strong>Sınıf:</strong> ${esc(grp.sinif)}</div>
                        <div class="info-item"><strong>İstasyon Grubu:</strong> ${esc(grp.grupAdi)}</div>
                        <div class="info-item"><strong>Pedagojik Seviye:</strong> ${esc(grp.seviye)}</div>
                        <div class="info-item"><strong>Bloom Düzeyi:</strong> ${esc(grp.bloomSeviyesi || tier.bloom)}</div>
                        <div class="info-item full"><strong>İstasyon Türü & Odak:</strong> ${esc(grp.istasyonTipi)} — ${esc(grp.odakKonu)}</div>
                    </div>

                    <h4>1. Takım Üyeleri & Psikometrik Gözlem Matrisi</h4>
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th style="width:50px;">No</th>
                                <th>Öğrenci Adı Soyadı</th>
                                <th style="width:110px;">VAK Öğrenme Stili</th>
                                <th style="width:90px;">Hazırbulunuşluk</th>
                                <th style="width:140px;">Öğretmen Gözlemi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ogrs.map(rawO => {
                                let o = rawO;
                                if (typeof rawO === 'string') {
                                    const st = getSafeStudents().find(s => s && (s.id === rawO || String(s.no) === rawO || s.adSoyad === rawO));
                                    o = {
                                        adSoyad: st ? st.adSoyad : rawO,
                                        no: st ? st.no : '-',
                                        vak: st ? (st.vak || st.vakResult || 'Görsel') : 'Görsel',
                                        score: 75
                                    };
                                } else if (!rawO) return '';
                                return `
                                <tr>
                                    <td style="text-align:center;">${esc(o.no || '-')}</td>
                                    <td><strong>${esc(o.adSoyad || 'Öğrenci')}</strong></td>
                                    <td style="text-align:center;">${esc(o.vak || 'Görsel')}</td>
                                    <td style="text-align:center;font-weight:bold;">${esc(o.score || 75)} Puan</td>
                                    <td>[ &nbsp; ] Çok İyi &nbsp; [ &nbsp; ] Gelişmeli</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>

                    <h4>2. İstasyon Görevleri & Kazanım Gerçekleşme Takibi</h4>
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th style="width:40px;">Sıra</th>
                                <th>Hedeflenen Görev / Kazanım</th>
                                <th style="width:100px;">Durum</th>
                                <th style="width:130px;">Zamanında Tamamlama</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${gorevs.map((t, idx) => `
                                <tr>
                                    <td style="text-align:center;">${idx + 1}</td>
                                    <td>${esc(t.baslik)}</td>
                                    <td style="text-align:center;">${t.durum === 'tamamlandi' ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}</td>
                                    <td>[ &nbsp; ] Evet &nbsp; [ &nbsp; ] Hayır</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div style="margin-top:25px;display:flex;justify-content:space-between;padding:10px 30px;">
                        <div>
                            <strong>İstasyon Koordinatör Öğrenci</strong><br><br>
                            İmza: .......................................
                        </div>
                        <div>
                            <strong>Ders Öğretmeni</strong><br><br>
                            İmza: .......................................
                        </div>
                    </div>

                    <div class="print-footer">
                        Sistem Kayıt ID: ${esc(grp.id)} • Düzenlenme Tarihi: ${new Date().toLocaleDateString('tr-TR')}
                    </div>
                </div>`;
        });

        const printDoc = `
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>İleri Çalışma Grupları A4 Gözlem Formu</title>
                <style>
                    @page { size: A4 portrait; margin: 12mm; }
                    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; margin: 0; padding: 0; color: #111; font-size: 11pt; background: #fff; }
                    .a4-page { page-break-after: always; padding: 10px; }
                    .a4-page:last-child { page-break-after: avoid; }
                    .print-header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 14px; }
                    .header-titles h2 { margin: 0; font-size: 14pt; letter-spacing: 0.5px; }
                    .header-titles h3 { margin: 4px 0; font-size: 12pt; color: #1d4ed8; }
                    .header-titles p { margin: 0; font-size: 9pt; color: #555; }
                    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; margin-bottom: 14px; font-size: 9.5pt; }
                    .info-item.full { grid-column: 1 / -1; }
                    h4 { margin: 12px 0 6px 0; font-size: 10.5pt; color: #1e293b; border-left: 3px solid #2563eb; padding-left: 6px; }
                    .print-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 9pt; }
                    .print-table th, .print-table td { border: 1px solid #94a3b8; padding: 6px 8px; }
                    .print-table th { background: #e2e8f0; font-weight: bold; }
                    .print-footer { margin-top: 30px; font-size: 8pt; color: #64748b; text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 6px; }
                    @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    }
                </style>
            </head>
            <body>
                ${pagesHtml}
                <script>
                    setTimeout(() => { window.print(); }, 400);
                </script>
            </body>
            </html>`;

        printWin.document.write(printDoc);
        printWin.document.close();
    };

    // ── WhatsApp & BiP Paylaşım ──
    window.ileriGrupWhatsapp = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) return alert('Aktif grup yok.');
        let text = `*🌙 İLERİ ÇALIŞMA & İSTASYON GRUPLARI LİSTESİ*\n\n`;
        groups.forEach((g, idx) => {
            text += `*${idx + 1}. ${g.grupAdi}* (${g.seviye})\n`;
            text += `🎯 İstasyon: ${g.istasyonTipi}\n`;
            text += `👥 Üyeler: ${g.ogrenciler.map(o => o.adSoyad).join(', ')}\n\n`;
        });
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    window.ileriGrupBip = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) return alert('Aktif grup yok.');
        let text = `*🌙 İLERİ ÇALIŞMA & İSTASYON GRUPLARI LİSTESİ*\n\n`;
        groups.forEach((g, idx) => {
            text += `*${idx + 1}. ${g.grupAdi}* (${g.seviye})\n`;
            text += `🎯 İstasyon: ${g.istasyonTipi}\n`;
            text += `👥 Üyeler: ${g.ogrenciler.map(o => o.adSoyad).join(', ')}\n\n`;
        });
        if (typeof window.shareViaBip === 'function') {
            window.shareViaBip(text, 'İleri Çalışma Grupları');
        } else {
            window.open('https://web.bip.com/', '_blank');
        }
    };

    window.ileriGrupWhatsappTekil = function (groupId) {
        const groups = getAdvData();
        const g = groups.find(x => x && x.id === groupId);
        if (!g) return;
        let text = `*🌙 ${g.grupAdi.toUpperCase()} GÖREV FORMU*\n`;
        text += `🎯 İstasyon: ${g.istasyonTipi}\n`;
        text += `📌 Odak Hedef: ${g.odakKonu}\n`;
        text += `👥 Takım Üyeleri: ${g.ogrenciler.map(o => o.adSoyad).join(', ')}\n\n`;
        text += `*Görevler:*\n`;
        (g.gorevler || []).forEach(t => {
            text += `- [${t.durum === 'tamamlandi' ? 'X' : ' '}] ${t.baslik}\n`;
        });
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    // ── 2. Sınıf Yönetimi Kümelerine Aktar ──
    window.ileriGrupKaydet = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) return alert('Önce pedagojik analiz yapın!');
        const container = document.getElementById('groups-container');
        if (!container) return alert('Sınıf Yönetimi sekmesindeki grup konteynerine erişilemiyor.');

        const rollerler = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];

        const sinifEl = document.getElementById('ileri-sinif');
        let hedefSinif = sinifEl ? sinifEl.value : '';
        if (!hedefSinif && groups[0]) {
            hedefSinif = groups[0].sinif;
        }

        const classFilter = document.getElementById('class-filter');
        if (classFilter && hedefSinif) {
            classFilter.value = hedefSinif;
            if (typeof window.loadClassGroups === 'function') window.loadClassGroups(hedefSinif);
        }

        groups.forEach((g) => {
            const ogrs = [...(g.ogrenciler || [])];
            ogrs.sort((a, b) => {
                const aNo = parseInt(a.no, 10) || 0;
                const bNo = parseInt(b.no, 10) || 0;
                if (aNo !== bNo) return aNo - bNo;
                return (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
            });

            ogrs.forEach(ogr => {
                document.querySelectorAll('.group-card li').forEach(li => {
                    const nameSpan = li.querySelector('.student-name-text');
                    if (nameSpan && nameSpan.getAttribute('data-name') === ogr.adSoyad) {
                        li.remove();
                    }
                });
            });

            const card = document.createElement('div');
            card.className = 'group-card';
            let liHtml = '';
            ogrs.forEach((ogr, oi) => {
                const rol = rollerler[Math.min(oi, rollerler.length - 1)];
                const safeJsAd = (ogr.adSoyad || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                const escapedName = esc(ogr.adSoyad);
                liHtml += `<li style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);padding-bottom:10px;">
                    <div style="display:flex;flex-direction:column;gap:2px;">
                        <span class="student-name-text" data-name="${escapedName}" style="font-weight:600;font-size:14px;">${ogr.no ? (ogr.no + ' - ') : ''}${escapedName}</span>
                        <div style="display:flex;align-items:center;gap:5px;">
                            <span class="xp-badge" style="font-size:10px;padding:1px 5px;">${ogr.score || 75} Puan</span>
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
                        <button class="btn-remove-student" onclick="if(confirm('Öğrenciyi kümeden silmek istiyor musunuz?')){this.closest('li').remove();if(typeof updateStudentPickers==='function')updateStudentPickers();if(typeof saveData==='function')saveData();}"><i class="fas fa-user-minus"></i></button>
                    </div></li>`;
            });

            card.innerHTML = `<h3><input type="text" class="group-title-input" value="🚀 ${esc(g.grupAdi)}" oninput="if(typeof saveData==='function')saveData()">
                <button class="action-btn btn-delete" onclick="if(confirm('Kümeyi sil?')){this.closest('.group-card').remove();if(typeof updateStudentPickers==='function')updateStudentPickers();if(typeof saveData==='function')saveData();}" title="Sil"><i class="fas fa-times"></i></button></h3>
                <ul style="padding:0;list-style:none;">${liHtml}</ul>
                <div class="group-footer"><button class="btn btn-purple" style="font-size:11px;padding:8px;" onclick="addXPToGroup(this)"><i class="fas fa-users-cog"></i> Kümeye Toplu Puan Ver</button>
                <div style="display:flex;gap:5px;"><select class="student-picker" style="flex:1;padding:8px;border-radius:8px;font-size:12px;border:1px solid var(--border);background:var(--input-bg);color:var(--text-main);"><option value="">Öğrenci Seç...</option></select>
                <button class="btn" onclick="addStudentToGroupUI(this)" style="padding:8px 15px;font-size:12px;">Ekle</button></div></div>`;
            container.appendChild(card);
        });

        document.querySelectorAll('.role-select').forEach(sel => {
            if (typeof window.updateRoleColor === 'function') window.updateRoleColor(sel);
        });
        if (typeof window.updateStudentPickers === 'function') window.updateStudentPickers();
        if (typeof window.saveData === 'function') window.saveData(true);
        alert(`✅ ${groups.length} İleri Çalışma Grubu "Sınıf Yönetimi" sekmesine aktarıldı!`);
        if (typeof window.openTab === 'function') window.openTab('tab2');
    };

    // ── 11. Proje Gruplarına Aktar ──
    window.ileriGrupProjeAktar = function () {
        const groups = getAdvData();
        if (!groups || groups.length === 0) return alert('Aktarılacak ileri çalışma grubu bulunamadı.');

        let currentProjects = (typeof window._pgData === 'function') ? window._pgData() : (window.projeGruplariData || window.projectGroupsData || []);
        if (!Array.isArray(currentProjects)) currentProjects = [];

        let addedCount = 0;
        groups.forEach(g => {
            const exists = currentProjects.some(p => (p.projeAdi === g.grupAdi || p.title === g.grupAdi));
            if (!exists) {
                const members = (g.ogrenciler || []).map((o, idx) => {
                    const roleKeys = ['kaptan', 'arastirmaci', 'tasarimci', 'raportor'];
                    const rKey = roleKeys[idx % roleKeys.length];
                    const rInfo = (window.BELBIN_ROLES && window.BELBIN_ROLES[rKey]) || { title: 'Araştırmacı' };
                    return {
                        studentId: o.id || o.no,
                        no: o.no || '',
                        name: o.adSoyad,
                        adSoyad: o.adSoyad,
                        rol: rInfo.title,
                        rolKey: rKey,
                        akranPuani: 90,
                        score: Number(o.score) || 75,
                        vak: o.vak || 'Görsel',
                        aktif: true,
                        katilimSayisi: 0,
                        sonIslem: new Date().toLocaleDateString('tr-TR')
                    };
                });

                const newProj = {
                    id: 'proj_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                    title: g.grupAdi,
                    projeAdi: g.grupAdi,
                    sinif: g.sinif,
                    ders: g.istasyonTipi || 'İleri STEM & Farklılaştırılmış Öğretim',
                    tema: g.odakKonu || 'Disiplinlerarası Araştırma ve Prototip',
                    type: 'tasarim',
                    grupTipi: 'tasarim',
                    desc: `${g.seviye || 'İleri Çalışma'} istasyon takımı. Odak: ${g.odakKonu || 'Problem Çözme'}`,
                    teslimTarihi: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    members: members,
                    uyeler: members,
                    asamalar: [
                        { label: '1. Problem Tespiti & Hipotez', durum: 'active', not: 'İleri gruptan aktarıldı', tarih: new Date().toLocaleDateString('tr-TR') },
                        { label: '2. Araştırma & Kaynak Taraması', durum: 'pending', not: '', tarih: null },
                        { label: '3. Tasarım & Planlama', durum: 'pending', not: '', tarih: null },
                        { label: '4. Uygulama & Prototip', durum: 'pending', not: '', tarih: null },
                        { label: '5. Test & Akran Değerlendirme', durum: 'pending', not: '', tarih: null },
                        { label: '6. Sunum & Nihai Rapor', durum: 'pending', not: '', tarih: null }
                    ],
                    milestones: [
                        { ad: 'Fikir & Hipotez', tamamlandi: true, tarih: new Date().toLocaleDateString('tr-TR') },
                        { ad: 'Tasarım & Planlama', tamamlandi: false, tarih: '' },
                        { ad: 'Prototip & Uygulama', tamamlandi: false, tarih: '' },
                        { ad: 'Akran Değerlendirme & Rapor', tamamlandi: false, tarih: '' }
                    ],
                    rubrikPuanlari: { surec: 35, urun: 35, akran: 18, toplam: 88 },
                    mesajlar: [],
                    odevLinks: [],
                    olusturma: new Date().toLocaleDateString('tr-TR'),
                    notlar: '10. İleri Çalışma Grupları modülünden otomatik aktarıldı.'
                };
                currentProjects.push(newProj);
                addedCount++;
            }
        });

        window.projeGruplariData = currentProjects;
        window.projectGroupsData = currentProjects;
        if (typeof projeGruplariData !== 'undefined') {
            try { projeGruplariData = currentProjects; } catch (e) { }
        }

        // Proje gruplarını kaydet ve arayüzü güncelle
        if (typeof window.pgSave === 'function') {
            window.pgSave();
        }
        if (typeof window.pgRenderList === 'function') {
            window.pgRenderList();
        }
        if (typeof window.saveData === 'function') {
            window.saveData(true);
        }

        alert(`${addedCount} adet ileri çalışma grubu, "11. Proje Grupları" modülüne aktarıldı.`);
        if (typeof window.openTab === 'function') {
            window.openTab('tab9');
        }
    };

    // ── Geriye Dönük Uyumluluk Kancaları ──
    window.initIleriGruplarModule = initIleriGruplarModule;
    window.renderIleriGruplarModule = renderIleriGruplarModule;
    window.ileriSinifDoldur = populateClassDropdown;
    window.ileriGrupRenderExisting = renderExistingData;
    window.ileriGrupAnalizEt = ileriGrupAnalizEt;
    window.ileriGrupSil = window.ileriGrupSil;
    window.ileriGrupTumunuSil = window.ileriGrupTumunuSil;
    window.ileriGrupSecilenleriSil = window.ileriGrupSecilenleriSil;
    window.ileriGrupSecimGuncelle = window.ileriGrupSecimGuncelle;
    window.ileriGrupTumunuSecToggle = window.ileriGrupTumunuSecToggle;
    window.ileriGrupListeYonetModalAc = window.ileriGrupListeYonetModalAc;
    window.ileriGrupListeModalKapat = window.ileriGrupListeModalKapat;
    window.ileriGrupListeFiltrele = window.ileriGrupListeFiltrele;
    window.ileriGrupListeRenderTablo = window.ileriGrupListeRenderTablo;

    // ESC Tuşu ile Modal Kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('ileri-grup-liste-modal');
            if (modal && modal.style.display === 'flex') {
                window.ileriGrupListeModalKapat();
            }
        }
    });

    // Sayfa ve Sekme Açılışında Otomatik Başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initIleriGruplarModule, 500);
        });
    } else {
        setTimeout(initIleriGruplarModule, 500);
    }

})();
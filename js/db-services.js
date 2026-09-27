// ============================================================
// db-services.js
// Firebase ve LocalStorage veri işlemleri
// ============================================================

        // VERİ KAYDETME VE YÜKLEME SİSTEMLERİ
        let saveTimeout = null;
        function saveData() {
            if (saveTimeout) clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                _executeSaveData();
            }, 1500); // 1.5 saniyelik debounce süresi
        }

        async function _executeSaveData() {
            const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
            if (selectedClass) {
                const safeClass = selectedClass.replace(/\//g, '_');
                if (typeof groupData !== 'object' || groupData === null) groupData = {};

                const container = document.getElementById('groups-container');
                if (container) {
                    const parsedGroups = [];
                    container.querySelectorAll('.group-card').forEach(card => {
                        const titleInput = card.querySelector('.group-title-input');
                        const title = titleInput ? titleInput.value : '';
                        const students = [];
                        card.querySelectorAll('li').forEach(li => {
                            const nameEl = li.querySelector('.student-name-text');
                            const name = nameEl ? (nameEl.getAttribute('data-name') || nameEl.textContent.split(' - ').pop()) : '';
                            const selectEl = li.querySelector('.role-select');
                            const role = selectEl ? selectEl.value : '';
                            if (name) {
                                students.push({ name, role });
                            }
                        });
                        parsedGroups.push({ title, students });
                    });
                    groupData[safeClass] = parsedGroups;
                }
            }

            const dataToSave = {
                students: studentData,
                advancedGroups: advancedGroupData,
                groups: typeof groupData === 'object' ? groupData : {},
                schedule: scheduleData,
                tracking: trackingData,
                exams: examData,
                lastUpdate: new Date().toISOString()
            };

            // LocalStorage'a yedek olarak kaydet
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            Object.assign(raw, dataToSave);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));

            try {
                if (!window.db) throw new Error("Firebase database objesi bulunamadı. (Çevrimdışı)");
                // Firestore yerine Realtime Database update metodu kullanıyoruz
                await window.db.ref(window.userDBPath).update(dataToSave);

                document.getElementById('db-status').style.color = 'var(--accent)';
                document.getElementById('db-status').title = 'Realtime Database Bağlantısı Aktif';
            } catch (e) {
                console.error("Realtime DB kaydetme hatası:", e);
                document.getElementById('db-status').style.color = 'var(--red)';
                document.getElementById('db-status').title = 'Realtime DB Bağlantı Hatası (Yerel Kayıt Aktif)';
            }
        }

        async function loadFromLocalStorage() {
            try {
                if (!window.db) throw new Error("Firebase veritabanı bağlantısı yok (Çevrimdışı)");
                // GÖÇ (MIGRATION) MANTIĞI: Eğer yönetici ise ve kendi klasörü boşsa eski main_data'dan kopyala
                const currentUser = firebase.auth().currentUser;
                if (currentUser && currentUser.email === 'mremzi@gmail.com') {
                    const snapshot = await window.db.ref(window.userDBPath).once('value');
                    if (!snapshot.exists()) {
                        console.log("Yönetici verileri yeni özel klasöre taşınıyor...");
                        const oldDataSnapshot = await window.db.ref("app_data/main_data").once('value');
                        if (oldDataSnapshot.exists()) {
                            await window.db.ref(window.userDBPath).set(oldDataSnapshot.val());
                            console.log("Eski veriler başarıyla yeni kişisel klasöre aktarıldı!");
                        }
                    }
                }

                // Realtime Database üzerinden canlı (realtime) dinleme
                window.db.ref(window.userDBPath).on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        applyParsedData(data);
                        document.getElementById('db-status').style.color = 'var(--accent)';
                        document.getElementById('db-status').title = 'Realtime Database (Canlı Senkronizasyon)';
                        console.log("Veriler Realtime Database'den canlı yüklendi/güncellendi.");
                    } else {
                        // Veritabanı boşsa arayüzü sıfırla
                        applyParsedData({});
                    }
                }, (error) => {
                    console.error("Realtime DB canlı çekme hatası:", error);
                    document.getElementById('db-status').style.color = 'var(--red)';
                    document.getElementById('db-status').title = 'Realtime DB Bağlantı Hatası';
                    loadLocalFallback();
                });
                listenToStudentForms();
                return;
            } catch (e) {
                console.error("Realtime DB başlatma hatası:", e);
                loadLocalFallback();
            }
        }

        async function loadLocalFallback() {
            // 2. Adım: Statik veri.json dosyasından yükle
            try {
                const response = await fetch('veri.json');
                if (response.ok) {
                    const data = await response.json();
                    applyParsedData(data);
                    return;
                }
            } catch (e) { }

            // 3. Adım: Tarayıcı LocalStorage'ından yükle
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try { applyParsedData(JSON.parse(savedData)); } catch (e) { console.error('LocalStorage veri yükleme hatası:', e); }
            }
        }

        function listenToStudentForms() {
            const listContainer = document.getElementById('student-forms-list');
            if (!listContainer) return;
            if (!window.db) return;

            // Sadece son 100 formu getir (Performans için)
            window.db.ref('student_forms').orderByKey().limitToLast(100).on('value', (snapshot) => {
                if (!snapshot.exists()) {
                    listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">Henüz doldurulmuş form bulunmuyor.</div>';
                    return;
                }

                listContainer.innerHTML = '';

                // Firebase Realtime DB verileri obje olarak döner, diziye çevirip ters çeviriyoruz (en yeni en üstte)
                const formsObj = snapshot.val();
                const formsArray = Object.keys(formsObj).map(key => ({
                    id: key,
                    ...formsObj[key]
                })).reverse();

                function escapeHTML(str) {
                    return (str || '').toString()
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                }

                formsArray.forEach(data => {
                    const typeText = data.type === 'BEFORE' ? '<span style="color:var(--yellow); font-weight:bold;"><i class="fas fa-home"></i> Dersten Önce</span>' : '<span style="color:#8b5cf6; font-weight:bold;"><i class="fas fa-graduation-cap"></i> Dersten Sonra</span>';

                    if (data.type === 'BEFORE' && data.formResponse) {
                        let vCount = 0; let aCount = 0; let kCount = 0;
                        for (const [key, val] of Object.entries(data.formResponse)) {
                            if (key.includes("Öğrenme Stili")) {
                                const answer = val.toString().toLowerCase();
                                if (answer.includes('(görsel)')) vCount++;
                                else if (answer.includes('(işitsel)')) aCount++;
                                else if (answer.includes('(kinestetik)')) kCount++;
                            }
                        }

                        let vakSecimi = null;
                        if (vCount > aCount && vCount > kCount) vakSecimi = 'Görsel';
                        else if (aCount > vCount && aCount > kCount) vakSecimi = 'İşitsel';
                        else if (kCount > vCount && kCount > aCount) vakSecimi = 'Kinestetik';
                        else if (vCount + aCount + kCount > 0) {
                            if (vCount >= aCount && vCount >= kCount) vakSecimi = 'Görsel';
                            else if (aCount >= vCount && aCount >= kCount) vakSecimi = 'İşitsel';
                            else vakSecimi = 'Kinestetik';
                        }

                        if (vakSecimi) {
                            const sIdx = studentData.findIndex(s => s.no.toString() === data.ogrenciNo.toString() && s.sinif === data.sinif);
                            if (sIdx !== -1 && studentData[sIdx].vak !== vakSecimi) {
                                studentData[sIdx].vak = vakSecimi;
                                saveData();
                                renderStudentTable();
                            }
                        }
                    }

                    let answersHTML = '';
                    if (data.formResponse) {
                        for (const [key, val] of Object.entries(data.formResponse)) {
                            const safeKey = escapeHTML(key);
                            const safeVal = escapeHTML(val);
                            if (key === "Eksik Kazanım (Ödev)") {
                                answersHTML += `<div style="margin-top: 8px; background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 6px; border-left: 4px solid var(--red); font-size: 13px; color: var(--text-main);">
                                <strong style="color: var(--red);"><i class="fas fa-exclamation-circle"></i> Öğrencinin Kişisel Ev Ödevi (Tik Atılamayanlar):</strong> <br> ${safeVal}
                            </div>`;
                            } else {
                                answersHTML += `<div style="margin-top: 8px; background: var(--bg); padding: 8px; border-radius: 4px; font-size: 13px;">
                                <strong>Soru:</strong> ${safeKey} <br> <strong>Cevap:</strong> ${safeVal}
                            </div>`;
                            }
                        }
                    }

                    // Realtime DB timestamp ms cinsindendir
                    const dateStr = data.timestamp ? new Date(data.timestamp).toLocaleString('tr-TR') : escapeHTML(data.tarih || '');
                    const safeName = escapeHTML(data.adSoyad);
                    const safeClass = escapeHTML(data.sinif);
                    const safeNo = escapeHTML(data.ogrenciNo);

                    const div = document.createElement('div');
                    div.className = 'group-card';
                    div.style.borderLeft = data.type === 'BEFORE' ? '4px solid var(--yellow)' : '4px solid #8b5cf6';
                    div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 10px;">
                        <div>
                            <h4 style="margin:0 0 5px 0;">${safeName} <span style="font-size:12px; color:var(--text-muted);">(${safeClass} - No: ${safeNo})</span></h4>
                            <div style="font-size:12px; color:var(--text-muted);"><i class="fas fa-clock"></i> ${dateStr}</div>
                        </div>
                        <div style="font-size: 13px;">${typeText}</div>
                    </div>
                    ${answersHTML}
                `;
                    listContainer.appendChild(div);
                });
            }, (error) => {
                console.error("Öğrenci formları çekilemedi:", error);
                listContainer.innerHTML = '<div style="text-align: center; color: var(--red); padding: 20px;">Formlar yüklenirken hata oluştu!</div>';
            });
        }

        let pendingSyncData = null;
        function isUIActive() {
            const activeModals = ['chart-modal', 'pg-create-modal', 'pg-detail-modal', 'evaluation-modal', 'xp-modal']
                .some(id => {
                    const el = document.getElementById(id);
                    return el && (el.style.display === 'block' || el.style.display === 'flex');
                });
            const activeInput = document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
            return activeModals || activeInput;
        }

        function checkPendingSync() {
            if (pendingSyncData && !isUIActive()) {
                console.log("Kilit açıldı, bekleyen güncellemeler uygulanıyor...");
                const dataToApply = pendingSyncData;
                pendingSyncData = null;
                applyParsedData(dataToApply);
            }
        }

        // Modal kapanma ve blur olaylarında pending data var mı kontrol et
        document.addEventListener('focusout', () => setTimeout(checkPendingSync, 100));
        document.addEventListener('click', () => setTimeout(checkPendingSync, 100));

        function applyParsedData(parsed) {
            if (isUIActive()) {
                console.log("Kullanıcı aktif, senkronizasyon beklemeye alındı.");
                pendingSyncData = parsed;
                return;
            }

            studentData = parsed.students || [];
            // Otomatik Göç ve Temizleme (Migration)
            let rawGroups = parsed.groups || {};
            let needsMigration = false;

            if (typeof rawGroups === 'object' && rawGroups !== null) {
                const cleanedGroups = {};
                for (let key in rawGroups) {
                    // Çöp verileri sil (flattenGroups'tan arta kalanlar)
                    if (key.includes('_students_') || key.includes('_title') || key.includes('_role') || key.includes('_name')) {
                        needsMigration = true;
                        continue;
                    }

                    let val = rawGroups[key];
                    // Eğer HTML string ise Diziye çevir
                    if (typeof val === 'string' && val.includes('<div class="group-card"')) {
                        needsMigration = true;
                        let classArray = [];
                        let tempDiv = document.createElement('div');
                        tempDiv.innerHTML = val;
                        tempDiv.querySelectorAll('.group-card').forEach(card => {
                            let titleInput = card.querySelector('.group-title-input');
                            let title = titleInput ? titleInput.value : '';
                            if (!titleInput) {
                                let h3 = card.querySelector('h3');
                                title = h3 ? h3.textContent.trim() : '';
                            }
                            let students = [];
                            card.querySelectorAll('li').forEach(li => {
                                let nameEl = li.querySelector('.student-name-text');
                                let name = nameEl ? (nameEl.getAttribute('data-name') || nameEl.textContent.split(' - ').pop()) : '';
                                let roleEl = li.querySelector('.role-select');
                                // value özelliğine erişmeden önce seçili option var mı bak
                                let role = '';
                                if (roleEl) {
                                    let selectedOpt = roleEl.querySelector('option[selected="selected"]');
                                    if (selectedOpt) role = selectedOpt.value;
                                    else role = roleEl.value;
                                }
                                if (name) students.push({ name, role });
                            });
                            classArray.push({ title, students });
                        });
                        cleanedGroups[key] = classArray;
                    } else {
                        // Eğer Sparse Array (Obje şeklinde) gelmişse, onu normal Diziye çevir
                        let isArrayLike = typeof val === 'object' && val !== null && (Array.isArray(val) || Object.keys(val).some(k => !isNaN(k)));
                        if (isArrayLike) {
                            cleanedGroups[key] = Array.isArray(val) ? val : Object.values(val);
                        } else {
                            cleanedGroups[key] = val;
                        }
                    }
                }

                groupData = cleanedGroups;
            } else if (typeof rawGroups === 'string') {
                groupData = { "Genel": rawGroups };
            } else {
                groupData = rawGroups;
            }

            if (needsMigration) {
                console.log("Veritabanı Array yapısına dönüştürülüyor ve temizleniyor...");
                setTimeout(() => { saveData(); }, 2000); // Otomatik kaydet ve Firebase'i onar
            }
            scheduleData = parsed.schedule || [];
            trackingData = parsed.tracking || [];
            examData = parsed.exams || [];
            advancedGroupData = parsed.advancedGroups || [];

            // Proje grupları verisini de yükle
            if (parsed.projeGruplari) {
                projeGruplariData = parsed.projeGruplari;
            }

            renderStudentTable();
            renderSchedule();
            renderTrackingList();
            renderExams();
            updateClassDropdown();

            if (typeof ileriSinifDoldur === 'function') ileriSinifDoldur();

            const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
            if (selectedClass) loadClassGroups(selectedClass);

            // Proje grupları UI güncellemesi (sekmeler hazırsa tetikle)
            if (typeof pgFillSinifDropdowns === 'function') pgFillSinifDropdowns();
            if (typeof pgRenderList === 'function') pgRenderList();
        }

        function exportToJson() {
            const dataToSave = {
                students: studentData,
                groups: typeof groupData === 'object' ? groupData : {},
                schedule: scheduleData,
                tracking: trackingData,
                exams: examData,
                advancedGroups: advancedGroupData,
                projeGruplari: typeof projeGruplariData !== 'undefined' ? projeGruplariData : {},
                lastUpdate: new Date().toISOString()
            };
            const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `yedekveri.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        }

        function importFromJson(input) {
            const file = input.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (parsed.students) {
                        if (confirm('Mevcut tüm veriler silinecek ve dosyadan yükleme yapılacak. Onaylıyor musunuz?')) {
                            applyParsedData(parsed);
                            saveData();
                            if (typeof pgSave === 'function') pgSave();
                            alert('Veriler başarıyla yüklendi.');
                        }
                    } else { alert('Geçersiz yedek dosyası formatı!'); }
                } catch (err) { alert('Dosya okunurken bir hata oluştu!'); }
                input.value = '';
            };
            reader.readAsText(file);
        }

        function resetAllData() {
            if (confirm('Sistemdeki TÜM veriler (Öğrenciler, Sınavlar, Gruplar, Proje Grupları) temizlenecek! Emin misiniz?')) {
                localStorage.removeItem(STORAGE_KEY);
                studentData = [];
                examData = [];
                trackingData = [];
                scheduleData = [];
                advancedGroupData = [];
                projeGruplariData = [];
                document.getElementById('groups-container').innerHTML = '';
                renderStudentTable();
                renderSchedule();
                renderTrackingList();
                renderExams();
                updateClassDropdown();
                if (typeof pgFillSinifDropdowns === 'function') pgFillSinifDropdowns();
                if (typeof pgRenderList === 'function') pgRenderList();
                saveData();
                if (typeof pgSave === 'function') pgSave();
                alert('Sistem sıfırlandı.');
            }
        }
// ============================================================
// db-services.js
// Firebase NoSQL Düzleştirilmiş Mimarisi - Atomik Güncellemeler
// ============================================================

// Global referanslar (Diff motoru için son kaydedilen durumlar)
let _lastSavedRefs = {
    students: {},
    projects: {},
    regular_groups: {},
    exams: {},
    schedule: null,
    tracking: null
};

let saveTimeout = null;
function saveData() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        _executeSaveData();
    }, 1500); // 1.5 saniyelik debounce
}

async function _executeSaveData() {
    // 1. UI (DOM) üzerinden mevcut sınıf kümelerini çekme
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
                    if (name) students.push({ name, role });
                });
                parsedGroups.push({ title, students });
            });
            groupData[safeClass] = parsedGroups;
        }
    }

    // 2. Firebase Atomik Diff (Karşılaştırma) Motoru
    let updates = {};
    const uid = window.currentUser ? window.currentUser.uid : null;

    if (uid && window.db) {
        
        // --- A. STUDENTS ---
        let currentStudents = {};
        studentData.forEach(s => { if (s && s.no) currentStudents[s.no] = s; });
        
        // Eklenenler / Değişenler
        for (let no in currentStudents) {
            if (JSON.stringify(currentStudents[no]) !== JSON.stringify(_lastSavedRefs.students[no])) {
                updates[`app_data/${uid}/students/${no}`] = currentStudents[no];
            }
        }
        // Silinenler
        for (let no in _lastSavedRefs.students) {
            if (!currentStudents[no]) updates[`app_data/${uid}/students/${no}`] = null;
        }
        _lastSavedRefs.students = JSON.parse(JSON.stringify(currentStudents)); // Deep clone
        
        // --- B. PROJECTS (Proje Grupları) ---
        let currentProjects = {};
        if (typeof projeGruplariData !== 'undefined') {
            projeGruplariData.forEach((g, i) => {
                const gId = g.id || `project_${i}`;
                currentProjects[gId] = g;
            });
        }
        
        for (let id in currentProjects) {
            if (JSON.stringify(currentProjects[id]) !== JSON.stringify(_lastSavedRefs.projects[id])) {
                updates[`app_data/${uid}/projects/${id}`] = currentProjects[id];
            }
        }
        for (let id in _lastSavedRefs.projects) {
            if (!currentProjects[id]) updates[`app_data/${uid}/projects/${id}`] = null;
        }
        _lastSavedRefs.projects = JSON.parse(JSON.stringify(currentProjects));
        
        // --- C. REGULAR GROUPS (Normal Kümeler) ---
        let currentRegGroups = {};
        let seenClasses = new Set();
        for (let sinifName in groupData) {
            const safeClass = sinifName.replace(/\//g, '_');
            if (seenClasses.has(safeClass)) continue;
            seenClasses.add(safeClass);

            const sGruplar = groupData[sinifName];
            if (Array.isArray(sGruplar)) {
                sGruplar.forEach((grup, i) => {
                    const gId = `group_${safeClass}_${i}`;
                    currentRegGroups[gId] = {
                        sinif: grup.sinif || sinifName,
                        title: grup.title || `Küme ${i + 1}`,
                        students: grup.students || []
                    };
                });
            }
        }
        
        for (let id in currentRegGroups) {
            if (JSON.stringify(currentRegGroups[id]) !== JSON.stringify(_lastSavedRefs.regular_groups[id])) {
                updates[`app_data/${uid}/regular_groups/${id}`] = currentRegGroups[id];
            }
        }
        for (let id in _lastSavedRefs.regular_groups) {
            if (!currentRegGroups[id]) updates[`app_data/${uid}/regular_groups/${id}`] = null;
        }
        _lastSavedRefs.regular_groups = JSON.parse(JSON.stringify(currentRegGroups));
        
        // --- D. EXAMS (Sınavlar) ---
        let currentExams = {};
        examData.forEach((e, i) => {
            const eId = e.id || `exam_${i}`;
            currentExams[eId] = e;
        });
        
        for (let id in currentExams) {
            if (JSON.stringify(currentExams[id]) !== JSON.stringify(_lastSavedRefs.exams[id])) {
                updates[`app_data/${uid}/exams/${id}`] = currentExams[id];
            }
        }
        for (let id in _lastSavedRefs.exams) {
            if (!currentExams[id]) updates[`app_data/${uid}/exams/${id}`] = null;
        }
        _lastSavedRefs.exams = JSON.parse(JSON.stringify(currentExams));

        // --- E. SCHEDULE (Takvim) ---
        const currScheduleStr = JSON.stringify(scheduleData);
        if (currScheduleStr !== JSON.stringify(_lastSavedRefs.schedule)) {
            updates[`app_data/${uid}/schedule`] = scheduleData;
            _lastSavedRefs.schedule = scheduleData ? JSON.parse(currScheduleStr) : [];
        }

        // --- F. TRACKING (Akış) ---
        const currTrackingStr = JSON.stringify(trackingData);
        if (currTrackingStr !== JSON.stringify(_lastSavedRefs.tracking)) {
            updates[`app_data/${uid}/tracking`] = trackingData;
            _lastSavedRefs.tracking = trackingData ? JSON.parse(currTrackingStr) : [];
        }
    }

    // 3. Değişiklikleri Firebase'e Tek Seferde Yaz (Atomik)
    try {
        const updateCount = Object.keys(updates).length;
        if (uid && window.db && updateCount > 0) {
            await window.db.ref().update(updates);
            console.log(`[Firebase Atomik] ${updateCount} farklı kayıt (delta) güncellendi.`);
            const dbStatusEl = document.getElementById('db-status');
            if (dbStatusEl) {
                dbStatusEl.style.color = 'var(--accent)';
                dbStatusEl.title = 'Realtime DB (NoSQL Atomik Güncelleme)';
            }
        }
    } catch (e) {
        console.error("Realtime DB güncelleme hatası:", e);
        const dbStatusEl = document.getElementById('db-status');
        if (dbStatusEl) {
            dbStatusEl.style.color = 'var(--red)';
            dbStatusEl.title = 'Bağlantı Hatası (Yerel Aktif)';
        }
    }

    // LocalStorage Yedeği (Çevrimdışı/Hızlı Yükleme İçin - Kullanıcı Bazlı İzolasyon)
    const dataToSaveLocal = {
        students: studentData,
        projects: typeof projeGruplariData !== 'undefined' ? projeGruplariData : [],
        groups: typeof groupData === 'object' ? groupData : {},
        schedule: scheduleData,
        tracking: trackingData,
        exams: examData,
        lastUpdate: new Date().toISOString()
    };
    try {
        const serialized = JSON.stringify(dataToSaveLocal);
        const userKey = uid ? `${STORAGE_KEY}_${uid}` : STORAGE_KEY;
        localStorage.setItem(userKey, serialized);
        localStorage.setItem(STORAGE_KEY, serialized); // Aktif kullanıcı genel önbelleği (Form çıktıları için)
    } catch (e) {}
}

let initialLoadComplete = false;

// UI Aktif mi Kontrolü (Form doldururken tablo renderını engeller)
function isUIActive() {
    const activeModals = ['chart-modal', 'pg-create-modal', 'pg-detail-modal', 'evaluation-modal', 'xp-modal']
        .some(id => {
            const el = document.getElementById(id);
            return el && (el.style.display === 'block' || el.style.display === 'flex');
        });
    const activeInput = document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    return activeModals || activeInput;
}

// Ana Veri Yükleme (Reaktivite Modeli)
async function loadFromLocalStorage() {
    try {
        if (!window.db) throw new Error("Firebase bağlantısı yok");
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) return;
        const uid = currentUser.uid;
        
        console.log("[Veri] NoSQL mimarisi canlı dinleyicileri bağlanıyor...");
        
        // 1. Önce Kullanıcıya Özel LocalStorage'dan hızlıca (Ghost) verileri yükleyelim ki ekran boş kalmasın
        const userKey = `${STORAGE_KEY}_${uid}`;
        let savedData = localStorage.getItem(userKey) || localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try { 
                const p = JSON.parse(savedData);
                studentData = p.students || [];
                if (typeof projeGruplariData !== 'undefined') projeGruplariData = p.projects || [];
                groupData = p.groups || {};
                scheduleData = p.schedule || [];
                trackingData = p.tracking || [];
                examData = p.exams || [];
                fullUIRender();
            } catch (e) {}
        }

        // 2. İlk Yükleme (once 'value') - Hızlı başlangıç
        const snap = await window.db.ref().child('app_data/' + uid + '/students').once('value');
        if(snap.exists()) {
            const val = snap.val();
            studentData = Object.values(val);
            _lastSavedRefs.students = val;
            fullUIRender();
        } else {
            // Firebase'de öğrenci kaydı yoksa eski oturumdan kalan yerel hayalet verileri temizle
            studentData = [];
            _lastSavedRefs.students = {};
            fullUIRender();
        }

        // 3. Child dinleyicileri (Sadece değişeni indir - Minimum Bandwidth)
        attachListeners(uid);

        initialLoadComplete = true;
        
        // Soru takip modülü entegrasyonu
        listenToStudentForms();
        
    } catch (e) {
        console.error("Yükleme hatası:", e);
        loadLocalFallback();
    }
}

function attachListeners(uid) {
    const db = window.db;

    // --- STUDENTS ---
    db.ref(`app_data/${uid}/students`).on('child_changed', snap => {
        const student = snap.val();
        const idx = studentData.findIndex(s => s.no === student.no);
        if (idx > -1) studentData[idx] = student;
        _lastSavedRefs.students[student.no] = student;
        if (!isUIActive()) {
            renderStudentTable();
            if (typeof updateStudentPickers === 'function') updateStudentPickers();
        }
    });
    db.ref(`app_data/${uid}/students`).on('child_added', snap => {
        const student = snap.val();
        if (!studentData.find(s => s.no === student.no)) {
            studentData.push(student);
            _lastSavedRefs.students[student.no] = student;
            if (!isUIActive() && initialLoadComplete) renderStudentTable();
        }
    });
    db.ref(`app_data/${uid}/students`).on('child_removed', snap => {
        const student = snap.val();
        studentData = studentData.filter(s => s.no !== student.no);
        delete _lastSavedRefs.students[student.no];
        if (!isUIActive()) renderStudentTable();
    });

    // Diğer koleksiyonlar genellikle çok büyük olmadığı için on('value') ile kolayca dinlenebilir
    db.ref(`app_data/${uid}/projects`).on('value', snap => {
        const val = snap.val() || {};
        if (typeof projeGruplariData !== 'undefined') projeGruplariData = Object.values(val);
        _lastSavedRefs.projects = val;
        if (!isUIActive() && initialLoadComplete && typeof pgRenderList === 'function') pgRenderList();
    });

    db.ref(`app_data/${uid}/regular_groups`).on('value', snap => {
        const val = snap.val() || {};
        let reconstructed = {};
        Object.values(val).forEach(g => {
            if (g.sinif) {
                const safeClass = g.sinif.replace(/\//g, '_');
                if (!reconstructed[safeClass]) reconstructed[safeClass] = [];
                reconstructed[safeClass].push(g);
                if (safeClass !== g.sinif) {
                    reconstructed[g.sinif] = reconstructed[safeClass];
                }
            }
        });
        groupData = reconstructed;
        _lastSavedRefs.regular_groups = val;
        
        if (!isUIActive() && initialLoadComplete) {
            const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
            if (selectedClass) loadClassGroups(selectedClass);
        }
    });

    db.ref(`app_data/${uid}/exams`).on('value', snap => {
        const val = snap.val() || {};
        examData = Object.values(val);
        _lastSavedRefs.exams = val;
        if (!isUIActive() && initialLoadComplete) renderExams();
    });

    db.ref(`app_data/${uid}/schedule`).on('value', snap => {
        scheduleData = snap.val() || [];
        _lastSavedRefs.schedule = scheduleData;
        if (!isUIActive() && initialLoadComplete) renderSchedule();
    });

    db.ref(`app_data/${uid}/tracking`).on('value', snap => {
        trackingData = snap.val() || [];
        _lastSavedRefs.tracking = trackingData;
        if (!isUIActive() && initialLoadComplete) renderTrackingList();
    });
}

function fullUIRender() {
    renderStudentTable();
    renderSchedule();
    renderTrackingList();
    renderExams();
    updateClassDropdown();
    if (typeof ileriSinifDoldur === 'function') ileriSinifDoldur();
    const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
    if (selectedClass) {
        loadClassGroups(selectedClass);
        if (typeof updateStudentPickers === 'function') updateStudentPickers();
    }
    if (typeof pgFillSinifDropdowns === 'function') pgFillSinifDropdowns();
    if (typeof pgRenderList === 'function') pgRenderList();
    if (window.SoruTakipUI && typeof window.SoruTakipUI.populateStudentDropdown === 'function') {
        window.SoruTakipUI.populateStudentDropdown();
    }
}

async function loadLocalFallback() {
    try {
        const response = await fetch('veri.json');
        if (response.ok) {
            const data = await response.json();
            Object.assign(window, data); // studentData vb.
            fullUIRender();
            return;
        }
    } catch (e) { }
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const p = JSON.parse(savedData);
            studentData = p.students || [];
            advancedGroupData = p.advancedGroups || [];
            groupData = p.groups || {};
            scheduleData = p.schedule || [];
            trackingData = p.tracking || [];
            examData = p.exams || [];
            fullUIRender();
        } catch (e) {}
    }
}

// Soru takip modülü form dinleyicisi (Önceki kod ile aynı)
function listenToStudentForms() {
    const listContainer = document.getElementById('student-forms-list');
    if (!listContainer || !window.db) return;

    window.db.ref('student_forms').orderByKey().limitToLast(100).on('value', (snapshot) => {
        if (!snapshot.exists()) {
            listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">Henüz doldurulmuş form bulunmuyor.</div>';
            return;
        }
        listContainer.innerHTML = '';
        const formsObj = snapshot.val();
        const formsArray = Object.keys(formsObj).map(key => ({ id: key, ...formsObj[key] })).reverse();

        function escapeHTML(str) {
            return (str || '').toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
                        saveData(); // Atomik güncelleme motorunu tetikler
                        if(!isUIActive()) renderStudentTable();
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
                        <strong style="color: var(--red);"><i class="fas fa-exclamation-circle"></i> Öğrencinin Kişisel Ev Ödevi:</strong> <br> ${safeVal}</div>`;
                    } else {
                        answersHTML += `<div style="margin-top: 8px; background: var(--bg); padding: 8px; border-radius: 4px; font-size: 13px;">
                        <strong>Soru:</strong> ${safeKey} <br> <strong>Cevap:</strong> ${safeVal}</div>`;
                    }
                }
            }

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
            ${answersHTML}`;
            listContainer.appendChild(div);
        });
    });
}

function exportToJson() {
    const dataToSave = {
        students: studentData,
        projects: typeof projeGruplariData !== 'undefined' ? projeGruplariData : [],
        groups: typeof groupData === 'object' ? groupData : {},
        schedule: scheduleData,
        tracking: trackingData,
        exams: examData,
        advancedGroups: typeof advancedGroupData !== 'undefined' ? advancedGroupData : [],
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
                    studentData = parsed.students || [];
                    if (typeof projeGruplariData !== 'undefined') projeGruplariData = parsed.projects || [];
                    if (typeof advancedGroupData !== 'undefined') advancedGroupData = parsed.advancedGroups || [];
                    groupData = parsed.groups || {};
                    scheduleData = parsed.schedule || [];
                    trackingData = parsed.tracking || [];
                    examData = parsed.exams || [];
                    
                    saveData(); // Atomik olarak Firebase'e iter
                    alert('Veriler başarıyla yüklendi.');
                }
            } else { alert('Geçersiz yedek dosyası formatı!'); }
        } catch (err) { alert('Dosya okunurken bir hata oluştu!'); }
        input.value = '';
    };
    reader.readAsText(file);
}

function resetAllData() {
    if (confirm('Sistemdeki TÜM veriler (Öğrenciler, Sınavlar, Gruplar) temizlenecek! Emin misiniz?')) {
        if (confirm('Bu işlem GERİ ALINAMAZ! Tüm verilerin silinmesini kesin olarak onaylıyor musunuz?')) {
            studentData = [];
            examData = [];
            trackingData = [];
            scheduleData = [];
            if (typeof projeGruplariData !== 'undefined') projeGruplariData = [];
            if (typeof advancedGroupData !== 'undefined') advancedGroupData = [];
            groupData = {};
            document.getElementById('groups-container').innerHTML = '';
            
            saveData(); // Firebase'deki ilgili ağaçları null yapar (siler)
            alert('Sistem sıfırlandı.');
        }
    }
}

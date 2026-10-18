// ============================================================
// db-services.js
// Firebase NoSQL Düzleştirilmiş Mimarisi - Atomik Güncellemeler
// ============================================================

// Firebase Realtime DB anahtar kısıtlamaları için güvenli encode/decode
// Yasaklı karakterler: . # $ / [ ]
function encodeFirebaseKey(key) {
    if (typeof key !== 'string') return String(key || '');
    return key.replace(/[\.\#\$\/\[\]]/g, match => '%' + match.charCodeAt(0).toString(16).toUpperCase());
}

function decodeFirebaseKey(key) {
    if (typeof key !== 'string') return String(key || '');
    return key.replace(/%[0-9A-Fa-f]{2}/g, match => {
        const char = String.fromCharCode(parseInt(match.substring(1), 16));
        return ['.', '#', '$', '/', '[', ']'].includes(char) ? char : match;
    });
}
window.encodeFirebaseKey = encodeFirebaseKey;
window.decodeFirebaseKey = decodeFirebaseKey;

// Global referanslar (Diff motoru için son kaydedilen durumlar)
// Global referanslar (Diff motoru için son kaydedilen durumlar)
let _lastSavedRefs = {
    students: {},
    projects: {},
    regular_groups: {},
    exams: {},
    schedule: null,
    tracking: {},
    checklists: {},
    kocluk: {}
};

window.invalidateChecklistSavedRef = function(chkId) {
    if (_lastSavedRefs && _lastSavedRefs.checklists) {
        if (chkId) {
            const safeKey = encodeFirebaseKey(String(chkId)).replace(/[\/\.\#\$\/\[\]]/g, '_');
            delete _lastSavedRefs.checklists[safeKey];
            delete _lastSavedRefs.checklists[chkId];
        } else {
            _lastSavedRefs.checklists = {};
        }
    }
};

// Zaman Aşımı (Timeout Wrapper) - Fail-Fast Mimarisi (İsteklerin askıda kalmasını engeller)
function withTimeout(promise, ms = 7000, errorMsg = 'Zaman Aşımı: Sunucu 7 saniye içinde yanıt vermedi.') {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(errorMsg));
        }, ms);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => {
        clearTimeout(timeoutId);
    });
}
window.withTimeout = withTimeout;

// Çevrimiçi ve Firebase Canlı Bağlantı Kontrolü
function isOnlineAndConnected() {
    const isNavOnline = (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') ? navigator.onLine : true;
    if (!isNavOnline) return false;
    // Eğer ilk el sıkışma henüz tamamlanmadıysa (null), bağlantı deneniyor demektir
    if (window.isFirebaseConnected === null || typeof window.isFirebaseConnected === 'undefined') {
        return true;
    }
    return window.isFirebaseConnected === true;
}
window.isOnlineAndConnected = isOnlineAndConnected;

// Firebase ilk bağlantısının kurulmasını bekleyen yardımcı (Sayfa açılışındaki yarış durumunu çözer)
function waitForFirebaseConnection(maxWaitMs = 2500) {
    if (window.isFirebaseConnected === true) return Promise.resolve(true);
    if (typeof navigator !== 'undefined' && !navigator.onLine) return Promise.resolve(false);
    return new Promise(resolve => {
        let resolved = false;
        const checkInterval = setInterval(() => {
            if (window.isFirebaseConnected === true) {
                clearInterval(checkInterval);
                clearTimeout(timeoutId);
                if (!resolved) {
                    resolved = true;
                    resolve(true);
                }
            } else if (typeof navigator !== 'undefined' && !navigator.onLine) {
                clearInterval(checkInterval);
                clearTimeout(timeoutId);
                if (!resolved) {
                    resolved = true;
                    resolve(false);
                }
            }
        }, 50);

        const timeoutId = setTimeout(() => {
            clearInterval(checkInterval);
            if (!resolved) {
                resolved = true;
                resolve(window.isFirebaseConnected === true);
            }
        }, maxWaitMs);
    });
}
window.waitForFirebaseConnection = waitForFirebaseConnection;

// Firebase Realtime DB Canlı Bağlantı Durumu Değişim Kancası
window.onFirebaseConnectionChange = function(connected) {
    if (connected) {
        console.log("[Firebase RTDB] Canlı sunucu bağlantısı kuruldu.");
        setDbSyncStatus('synced', 'Bulut Bağlantısı Aktif');
    } else {
        console.warn("[Firebase RTDB] Canlı sunucu bağlantısı kesildi! (Fail-Fast devrede)");
        setDbSyncStatus('offline', 'Sunucu Bağlantısı Yok');
    }
};

let _isSaving = false;
let _hasPendingSave = false;
let saveTimeout = null;

function showGlobalToast(message, type = 'success') {
    let container = document.getElementById('global-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'global-toast-container';
        container.style = 'position:fixed; top:20px; right:20px; z-index:999999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : (type === 'error' ? '#ef4444' : '#3b82f6'));
    toast.style = `pointer-events:auto; background:${bg}; color:#ffffff; padding:10px 18px; border-radius:10px; font-size:13px; font-weight:600; box-shadow:0 10px 25px -5px rgba(0,0,0,0.3); display:flex; align-items:center; gap:8px; opacity:0; transform:translateX(30px); transition:all 0.3s cubic-bezier(0.4,0,0.2,1);`;
    toast.innerHTML = message;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(0)'; }, 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}
window.showGlobalToast = showGlobalToast;

function setDbSyncStatus(status, message) {
    const el = document.getElementById('db-status');
    const badge = document.getElementById('db-status-badge');
    const timeEl = document.getElementById('db-status-time');
    const nowStr = new Date().toLocaleTimeString('tr-TR');

    let iconHtml = '<i class="fas fa-database"></i>';
    let color = 'var(--accent, #10b981)';
    let bgColor = 'rgba(16, 185, 129, 0.12)';
    let borderColor = 'rgba(16, 185, 129, 0.35)';
    let statusDesc = message || 'Bulut Senkronize';

    if (status === 'saving') {
        iconHtml = '<i class="fas fa-sync fa-spin"></i>';
        color = 'var(--secondary, #3b82f6)';
        bgColor = 'rgba(59, 130, 246, 0.12)';
        borderColor = 'rgba(59, 130, 246, 0.35)';
        statusDesc = message || 'Buluta Aktarılıyor...';
    } else if (status === 'synced') {
        iconHtml = '<i class="fas fa-check-circle"></i>';
        color = 'var(--accent, #10b981)';
        bgColor = 'rgba(16, 185, 129, 0.12)';
        borderColor = 'rgba(16, 185, 129, 0.35)';
        statusDesc = message || 'Bulut Senkronize';
    } else if (status === 'offline') {
        iconHtml = '<i class="fas fa-wifi-slash"></i>';
        color = 'var(--warning, #f59e0b)';
        bgColor = 'rgba(245, 158, 11, 0.12)';
        borderColor = 'rgba(245, 158, 11, 0.35)';
        statusDesc = message || 'Çevrimdışı (Bağlantı Yok)';
    } else if (status === 'error') {
        iconHtml = '<i class="fas fa-exclamation-triangle"></i>';
        color = 'var(--red, #ef4444)';
        bgColor = 'rgba(239, 68, 68, 0.12)';
        borderColor = 'rgba(239, 68, 68, 0.35)';
        statusDesc = message || 'Bağlantı / Zaman Aşımı Hatası';
    }

    if (el) {
        el.innerHTML = iconHtml;
    }
    if (timeEl) {
        timeEl.textContent = `(${nowStr})`;
    }
    if (badge) {
        badge.style.color = color;
        badge.style.background = bgColor;
        badge.style.borderColor = borderColor;
        badge.title = `Veritabanı Durumu: ${statusDesc} [${nowStr}] (Yenilemek için tıklayın)`;
    }
}

function manualForceSync() {
    if (!isOnlineAndConnected()) {
        showGlobalToast('<i class="fas fa-wifi-slash"></i> İnternet bağlantısı yok! Senkronizasyon başlatılamaz.', 'error');
        setDbSyncStatus('offline', 'Çevrimdışı (Bağlantı Yok)');
        return;
    }
    showGlobalToast('<i class="fas fa-sync fa-spin"></i> Veritabanı canlı senkronizasyonu başlatıldı...', 'info');
    saveData(true);
}
window.manualForceSync = manualForceSync;

// Koçluk veri kaynağını güvenli ve dinamik olarak çöz (bellek referansı ayrışmasını engeller)
function getKoclukSourceList() {
    if (Array.isArray(window.koclukData) && window.koclukData.length > 0) return window.koclukData;
    if (typeof koclukData !== 'undefined' && Array.isArray(koclukData) && koclukData.length > 0) return koclukData;
    return (Array.isArray(window.koclukData) ? window.koclukData : (typeof koclukData !== 'undefined' && Array.isArray(koclukData) ? koclukData : []));
}
window.getKoclukSourceList = getKoclukSourceList;

// LocalStorage Yedeği (Çevrimdışı / Hızlı Yükleme İçin - Kullanıcı Bazlı İzolasyon)
function saveLocalData() {
    const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    const uid = currentUser?.uid || '';
    const dataToSaveLocal = {
        students: (typeof studentData !== 'undefined' && Array.isArray(studentData)) ? studentData : (window.studentData || []),
        projects: typeof projeGruplariData !== 'undefined' ? projeGruplariData : [],
        groups: typeof groupData === 'object' ? groupData : {},
        schedule: (typeof scheduleData !== 'undefined' && Array.isArray(scheduleData)) ? scheduleData : (window.scheduleData || []),
        tracking: (typeof trackingData !== 'undefined' && Array.isArray(trackingData)) ? trackingData : (window.trackingData || []),
        checklists: (typeof checklistData !== 'undefined' && Array.isArray(checklistData)) ? checklistData : (window.checklistData || []),
        kocluk: getKoclukSourceList(),
        exams: (typeof examData !== 'undefined' && Array.isArray(examData)) ? examData : (window.examData || []),
        advancedGroups: typeof advancedGroupData !== 'undefined' ? advancedGroupData : [],
        lastUpdate: new Date().toISOString()
    };
    try {
        const serialized = JSON.stringify(dataToSaveLocal);
        const userKey = uid ? `${STORAGE_KEY}_${uid}` : STORAGE_KEY;
        localStorage.setItem(userKey, serialized);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
        console.warn("[LocalStorage] Yerel önbellek yazma hatası:", e);
    }
}
window.saveLocalData = saveLocalData;

function saveData(immediate = false) {
    if (saveTimeout) clearTimeout(saveTimeout);
    
    // Her koşulda önce yerel veriyi garantiye al (çevrimdışıyken veri kaybını sıfırlar)
    saveLocalData();

    // Fallback koruması: Canlı sunucuya erişilemeyip eski yerel yedek gösteriliyorsa,
    // sunucudaki güncel veriyi kazara ezmemek için otomatik yazmayı engelle.
    if (window._isFallbackActive) {
        console.warn("[Veri Güvenliği] Fallback modunda sunucuya otomatik yazma engellendi (Stale Clobbering Koruması).");
        return Promise.resolve(false);
    }

    // Fail-Fast Kontrolü: Çevrimdışı iken sunucuya gitmeyi deneme
    if (!isOnlineAndConnected()) {
        setDbSyncStatus('offline', 'Çevrimdışı (Yerel Hafızaya Kaydedildi)');
        return Promise.reject(new Error("İnternet bağlantısı yok"));
    }

    if (immediate) {
        return _queueSaveData();
    }
    saveTimeout = setTimeout(() => {
        _queueSaveData();
    }, 800); // 800ms debounce
}

async function _queueSaveData() {
    if (!isOnlineAndConnected()) {
        _isSaving = false;
        _hasPendingSave = false;
        setDbSyncStatus('offline', 'Çevrimdışı (İşlem iptal edildi)');
        return;
    }
    if (_isSaving) {
        _hasPendingSave = true;
        return;
    }
    _isSaving = true;
    try {
        await _executeSaveData();
    } catch (err) {
        console.warn("[Kuyruk] Kaydetme hatası/zaman aşımı:", err.message);
        // Hata durumunda bekleyen kayıt kuyruğunu temizle ki sessiz arka plan döngüsü oluşmasın
        _hasPendingSave = false;
    } finally {
        _isSaving = false;
        if (_hasPendingSave && isOnlineAndConnected()) {
            _hasPendingSave = false;
            _queueSaveData();
        } else {
            _hasPendingSave = false;
        }
    }
}

// Çevrimdışı/Sayfa Olayları - Otomatik arka plan eşitlemesi kaldırıldı (Fail-Fast)
window.addEventListener('online', () => {
    console.log("[Ağ] İnternet bağlantısı yeniden kuruldu. (Otomatik arka plan eşitlemesi yapılmaz, manuel istek beklenir).");
    showGlobalToast('<i class="fas fa-wifi"></i> İnternet bağlantısı yeniden kuruldu. Senkronize etmek için durumu yenileyebilirsiniz.', 'info');
    if (typeof window.isFirebaseConnected === 'undefined' || window.isFirebaseConnected) {
        setDbSyncStatus('synced', 'Bağlantı Kuruldu (Senkronizasyon Hazır)');
    }
});

window.addEventListener('offline', () => {
    console.warn("[Ağ] İnternet bağlantısı kesildi. İstekler askıya alınmayacak, fail-fast uygulanacak.");
    setDbSyncStatus('offline', 'Çevrimdışı (Bağlantı Yok - İstekler Durduruldu)');
    showGlobalToast('<i class="fas fa-wifi-slash"></i> İnternet bağlantısı kesildi! İstekler iletilmeyecek.', 'warning');
});

window.addEventListener('beforeunload', () => {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
        if (isOnlineAndConnected()) {
            _executeSaveData().catch(() => {});
        }
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && saveTimeout) {
        clearTimeout(saveTimeout);
        if (isOnlineAndConnected()) {
            _executeSaveData().catch(() => {});
        }
    }
});

async function _executeSaveData() {
    // 0. Fail-Fast Ön Kontrolü: Çevrimdışı veya sunucu bağlantısı yoksa yazma işlemini anında iptal et
    if (!isOnlineAndConnected()) {
        setDbSyncStatus('offline', 'Çevrimdışı (Bağlantı Yok - Kaydedilemedi)');
        showGlobalToast('<i class="fas fa-wifi-slash"></i> İnternet veya veritabanı bağlantısı yok! Kayıt işlemi iptal edildi.', 'error');
        throw new Error("İnternet veya veritabanı bağlantısı yok");
    }
    // 1. UI (DOM) üzerinden mevcut sınıf kümelerini çekme
    const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
    if (selectedClass) {
        const safeClass = selectedClass.replace(/\//g, '_');
        if (typeof groupData !== 'object' || groupData === null) groupData = {};

        const container = document.getElementById('groups-container');
        if (container) {
            const cards = container.querySelectorAll('.group-card');
            if (cards.length > 0) {
                const parsedGroups = [];
                cards.forEach(card => {
                    const titleInput = card.querySelector('.group-title-input');
                    const title = titleInput ? titleInput.value : '';
                    const students = [];
                    card.querySelectorAll('li').forEach(li => {
                        const nameEl = li.querySelector('.student-name-text');
                        const name = nameEl ? (nameEl.getAttribute('data-name') || nameEl.textContent.split(' - ').pop().trim()) : '';
                        const selectEl = li.querySelector('.role-select');
                        const role = selectEl ? selectEl.value : '';
                        if (name) students.push({ name, role });
                    });
                    parsedGroups.push({ title, students });
                });
                groupData[safeClass] = parsedGroups;
            }
        }
    }

    // 2. Firebase Atomik Diff (Karşılaştırma) Motoru
    let updates = {};
    const currentUser = window.currentUser || ((typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null);
    const uid = currentUser ? currentUser.uid : null;

    // Aday referanslar (Sadece başarılı Firebase yazımında commit edilecek!)
    let candidateRefs = {
        students: null,
        projects: null,
        regular_groups: null,
        exams: null,
        schedule: null,
        tracking: null,
        checklists: null,
        kocluk: null
    };

    if (uid && window.db) {
        setDbSyncStatus('saving');
        
        // --- A. STUDENTS ---
        let currentStudents = {};
        studentData.forEach((s, idx) => {
            if (s) {
                const rawKey = s.no ? String(s.no) : ('st_' + (s.sira || idx));
                const safeKey = rawKey.replace(/[\/\.\#\$\/\[\]]/g, '_');
                currentStudents[safeKey] = s;
            }
        });
        
        // Eklenenler / Değişenler
        for (let safeKey in currentStudents) {
            if (JSON.stringify(currentStudents[safeKey]) !== JSON.stringify(_lastSavedRefs.students[safeKey])) {
                updates[`app_data/${uid}/students/${safeKey}`] = currentStudents[safeKey];
            }
        }
        // Silinenler
        for (let safeKey in _lastSavedRefs.students) {
            if (!currentStudents[safeKey]) updates[`app_data/${uid}/students/${safeKey}`] = null;
        }
        candidateRefs.students = currentStudents;
        
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
        candidateRefs.projects = currentProjects;
        
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
        candidateRefs.regular_groups = currentRegGroups;
        
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
        candidateRefs.exams = currentExams;

        // --- E. SCHEDULE (Takvim) ---
        const currScheduleStr = JSON.stringify(scheduleData);
        if (currScheduleStr !== JSON.stringify(_lastSavedRefs.schedule)) {
            updates[`app_data/${uid}/schedule`] = scheduleData;
        }
        candidateRefs.schedule = scheduleData;

        // --- F. TRACKING (Ödev & Proje Takip Sistemi) ---
        let currentTracking = {};
        (trackingData || []).forEach((item, i) => {
            if (item) {
                const trackId = item.id ? String(item.id) : ('trk_' + i);
                const safeTrackId = item.firebaseKey || encodeFirebaseKey(trackId).replace(/[\/\.\#\$\/\[\]]/g, '_');
                
                // Submissions nesnesini Firebase için sanitize et (Öğrenci isimlerindeki '.' karakterlerini korur)
                const sanitizedSubmissions = {};
                if (item.submissions && typeof item.submissions === 'object') {
                    for (let sName in item.submissions) {
                        const safeName = encodeFirebaseKey(sName);
                        const sub = item.submissions[sName] || {};
                        sanitizedSubmissions[safeName] = {
                            done: !!sub.done,
                            absent: !!sub.absent,
                            date: sub.date || '',
                            xp: (sub.xp !== undefined && sub.xp !== null) ? Number(sub.xp) : (Number(item.xp) || 0),
                            penalty: (sub.penalty !== undefined && sub.penalty !== null) ? Number(sub.penalty) : (Number(item.penaltyXp) || 0)
                        };
                    }
                }
                
                currentTracking[safeTrackId] = {
                    id: item.id || safeTrackId,
                    type: item.type || 'Ödev',
                    title: item.title || '',
                    sinif: item.sinif || '',
                    date: item.date || '',
                    xp: Number(item.xp) || 0,
                    penaltyXp: Number(item.penaltyXp) || 0,
                    targetStudents: Array.isArray(item.targetStudents) ? item.targetStudents : null,
                    submissions: sanitizedSubmissions,
                    isNotified: !!item.isNotified,
                    isEvaluated: !!item.isEvaluated
                };
            }
        });

        if (!_lastSavedRefs.tracking || typeof _lastSavedRefs.tracking !== 'object') {
            _lastSavedRefs.tracking = {};
        }

        // Eklenenler / Güncellenenler
        for (let safeTrackId in currentTracking) {
            if (JSON.stringify(currentTracking[safeTrackId]) !== JSON.stringify(_lastSavedRefs.tracking[safeTrackId])) {
                updates[`app_data/${uid}/tracking/${safeTrackId}`] = currentTracking[safeTrackId];
            }
        }
        // Silinenler
        for (let safeTrackId in _lastSavedRefs.tracking) {
            if (!currentTracking[safeTrackId]) {
                updates[`app_data/${uid}/tracking/${safeTrackId}`] = null;
            }
        }
        candidateRefs.tracking = currentTracking;

        // --- G. CHECKLISTS (Öğretmen Takip ve Kontrol Çizelgeleri) ---
        let currentChecklists = {};
        const chkSourceList = (typeof checklistData !== 'undefined' && Array.isArray(checklistData)) ? checklistData : (window.checklistData || []);
        chkSourceList.forEach((item, i) => {
            if (item) {
                const chkId = item.id ? String(item.id) : ('chk_' + i);
                const safeChkId = item.firebaseKey || encodeFirebaseKey(chkId).replace(/[\/\.\#\$\/\[\]]/g, '_');

                const sanitizedEvaluations = {};
                if (item.evaluations && typeof item.evaluations === 'object') {
                    for (let sName in item.evaluations) {
                        const safeName = encodeFirebaseKey(sName);
                        sanitizedEvaluations[safeName] = item.evaluations[sName] || {};
                    }
                }

                currentChecklists[safeChkId] = {
                    id: item.id || safeChkId,
                    templateType: item.templateType || 'meb_katilim',
                    title: item.title || '',
                    sinif: item.sinif || '',
                    date: item.date || '',
                    evalType: item.evalType || 'score',
                    badge: item.badge || 'ÇİZELGE',
                    badgeColor: item.badgeColor || '#3b82f6',
                    criteria: Array.isArray(item.criteria) ? item.criteria : (item.criteria && typeof item.criteria === 'object' ? Object.values(item.criteria) : []),
                    customSymbols: Array.isArray(item.customSymbols) ? item.customSymbols : (item.customSymbols && typeof item.customSymbols === 'object' ? Object.values(item.customSymbols) : null),
                    targetStudents: Array.isArray(item.targetStudents) ? item.targetStudents : null,
                    evaluations: sanitizedEvaluations,
                    isArchived: !!item.isArchived,
                    createdAt: item.createdAt || new Date().toISOString()
                };
            }
        });

        if (!_lastSavedRefs.checklists || typeof _lastSavedRefs.checklists !== 'object') {
            _lastSavedRefs.checklists = {};
        }

        for (let safeChkId in currentChecklists) {
            if (JSON.stringify(currentChecklists[safeChkId]) !== JSON.stringify(_lastSavedRefs.checklists[safeChkId])) {
                updates[`app_data/${uid}/checklists/${safeChkId}`] = currentChecklists[safeChkId];
            }
        }
        for (let safeChkId in _lastSavedRefs.checklists) {
            if (!currentChecklists[safeChkId]) {
                updates[`app_data/${uid}/checklists/${safeChkId}`] = null;
            }
        }
        candidateRefs.checklists = currentChecklists;

        // --- H. KOCLUK (LGS Bilişsel Koçluk & Mentorluk) ---
        let currentKocluk = {};
        const kocSourceList = getKoclukSourceList();
        kocSourceList.forEach((item, i) => {
            if (item) {
                const kocId = item.id ? String(item.id) : ('koc_' + i);
                const safeKocId = item.firebaseKey || encodeFirebaseKey(kocId).replace(/[\/\.\#\$\/\[\]]/g, '_');
                currentKocluk[safeKocId] = {
                    id: item.id || safeKocId,
                    studentNo: item.studentNo || '',
                    adSoyad: item.adSoyad || '',
                    sinif: item.sinif || '',
                    vak: item.vak || '',
                    hedefLise: item.hedefLise || '',
                    hedefYuzdelik: item.hedefYuzdelik || '',
                    baslangicNeti: item.baslangicNeti ?? 65,
                    hedefNet: item.hedefNet ?? 85,
                    haftalikHedefSoru: Number(item.haftalikHedefSoru) || 600,
                    aktifStratejiKurali: item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.',
                    bilesenNotu: item.bilesenNotu || '',
                    hataDefteri: Array.isArray(item.hataDefteri) ? item.hataDefteri : [],
                    gorusmeler: Array.isArray(item.gorusmeler) ? item.gorusmeler : [],
                    denemeler: Array.isArray(item.denemeler) ? item.denemeler : [],
                    haftalikPlan: item.haftalikPlan || null,
                    haftalikTakip: Array.isArray(item.haftalikTakip) ? item.haftalikTakip : [],
                    createdAt: item.createdAt || new Date().toISOString()
                };
            }
        });

        if (!_lastSavedRefs.kocluk || typeof _lastSavedRefs.kocluk !== 'object') {
            _lastSavedRefs.kocluk = {};
        }

        for (let safeKocId in currentKocluk) {
            if (JSON.stringify(currentKocluk[safeKocId]) !== JSON.stringify(_lastSavedRefs.kocluk[safeKocId])) {
                updates[`app_data/${uid}/kocluk/${safeKocId}`] = currentKocluk[safeKocId];
            }
        }
        for (let safeKocId in _lastSavedRefs.kocluk) {
            if (!currentKocluk[safeKocId]) {
                updates[`app_data/${uid}/kocluk/${safeKocId}`] = null;
            }
        }
        candidateRefs.kocluk = currentKocluk;
    }

    // 3. Değişiklikleri Firebase'e Tek Seferde Yaz (Atomik - Fail-Fast Zaman Aşımı Korumalı)
    try {
        const updateCount = Object.keys(updates).length;
        if (uid && window.db && updateCount > 0) {
            // withTimeout ile 7 saniye süre tanınır, aşılırsa reject olur ve catch'e düşer
            await withTimeout(window.db.ref().update(updates), 7000, "Sunucu zaman aşımı (7 sn): Veriler kaydedilemedi");
            console.log(`[Firebase Atomik] ${updateCount} farklı kayıt (delta) başarıyla güncellendi.`);
            
            // Başarılı yazımda referansları commit et
            if (candidateRefs.students) _lastSavedRefs.students = JSON.parse(JSON.stringify(candidateRefs.students));
            if (candidateRefs.projects) _lastSavedRefs.projects = JSON.parse(JSON.stringify(candidateRefs.projects));
            if (candidateRefs.regular_groups) _lastSavedRefs.regular_groups = JSON.parse(JSON.stringify(candidateRefs.regular_groups));
            if (candidateRefs.exams) _lastSavedRefs.exams = JSON.parse(JSON.stringify(candidateRefs.exams));
            if (candidateRefs.schedule !== null) _lastSavedRefs.schedule = candidateRefs.schedule ? JSON.parse(JSON.stringify(candidateRefs.schedule)) : [];
            if (candidateRefs.tracking) _lastSavedRefs.tracking = JSON.parse(JSON.stringify(candidateRefs.tracking));
            if (candidateRefs.checklists) _lastSavedRefs.checklists = JSON.parse(JSON.stringify(candidateRefs.checklists));
            if (candidateRefs.kocluk) _lastSavedRefs.kocluk = JSON.parse(JSON.stringify(candidateRefs.kocluk));

            setDbSyncStatus('synced', `Realtime DB Güncel (${updateCount} delta)`);
        } else if (uid && window.db) {
            // Fark yok, zaten güncel
            setDbSyncStatus('synced', 'Realtime DB Güncel');
        } else {
            setDbSyncStatus('offline', 'Çevrimdışı / Bağlantı Yok');
        }
    } catch (e) {
        console.error("Realtime DB güncelleme hatası (Fail-Fast):", e);
        // Hata durumunda _lastSavedRefs değiştirilmez!
        setDbSyncStatus('error', 'Kayıt Hatası: ' + (e.message || 'Zaman aşımı'));
        showGlobalToast(`<i class="fas fa-exclamation-triangle"></i> Veri Kaydedilemedi: ${e.message || 'Zaman aşımı'}`, 'error');
        throw e;
    }

    // LocalStorage Yedeği
    saveLocalData();
}

let initialLoadComplete = false;

// UI Aktif mi Kontrolü (Form doldururken tablo renderını engeller)
function isUIActive() {
    const activeModals = ['chart-modal', 'pg-create-modal', 'pg-detail-modal', 'evaluation-modal', 'xp-modal', 'checklist-eval-modal', 'checklist-criteria-modal']
        .some(id => {
            const el = document.getElementById(id);
            return el && (el.style.display === 'block' || el.style.display === 'flex');
        });
    const activeInput = document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    return activeModals || activeInput;
}

// Ana Veri Yükleme (Doğrudan Sunucudan Okuma - Fail-Fast Modeli)
async function loadFromLocalStorage() {
    try {
        if (!window.db) throw new Error("Firebase bağlantısı yok");
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) return;
        const uid = currentUser.uid;
        
        // 0. Bağlantı Ön Kontrolü: Çevrimdışı iken sunucuya gitmeyi denemeden fail-fast fırlat
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            throw new Error("İnternet bağlantısı yok.");
        }

        // Firebase ilk bağlantı el sıkışmasını bekle (en fazla 2.5 sn - sayfa açılışındaki yarış durumunu çözer)
        if (window.isFirebaseConnected !== true) {
            await waitForFirebaseConnection(2500);
        }

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            throw new Error("İnternet bağlantısı yok.");
        }

        setDbSyncStatus('saving', 'Canlı veriler sunucudan çekiliyor...');
        console.log("[Veri] Doğrudan uzak sunucudan (Firebase RTDB) veri çekiliyor...");

        // 1. Öğrencileri Doğrudan Sunucudan Çek (7 sn zaman aşımı wrapper)
        let studentsFound = false;
        const snap = await withTimeout(
            window.db.ref().child('app_data/' + uid + '/students').once('value'),
            7000,
            "Öğrenci verisi sunucudan çekilemedi (Zaman Aşımı)"
        );

        if (snap.exists()) {
            const val = snap.val();
            let loadedStudents = [];
            let normalizedRefs = {};
            if (Array.isArray(val)) {
                loadedStudents = val.filter(Boolean);
                loadedStudents.forEach((s, idx) => {
                    const safeKey = s.no ? String(s.no).replace(/[\/\.\#\$\/\[\]]/g, '_') : ('st_' + idx);
                    normalizedRefs[safeKey] = s;
                });
            } else if (typeof val === 'object' && val !== null) {
                loadedStudents = Object.values(val);
                normalizedRefs = val;
            }
            if (loadedStudents.length > 0) {
                studentData = loadedStudents;
                _lastSavedRefs.students = JSON.parse(JSON.stringify(normalizedRefs));
                studentsFound = true;
                fullUIRender();
            }
        }

        // Göç (Migration) Kontrolü: Eğer öğretmenin klasörü boşsa ve yönetici ise app_data/main_data'ya bak
        if (!studentsFound && currentUser.email === 'mremzi@gmail.com') {
            try {
                const adminSnap = await withTimeout(
                    window.db.ref('app_data/main_data/students').once('value'),
                    7000,
                    "Admin öğrenci göçü zaman aşımına uğradı"
                );
                if (adminSnap.exists()) {
                    const adminVal = adminSnap.val();
                    const adminStudents = Array.isArray(adminVal) ? adminVal.filter(Boolean) : Object.values(adminVal || {});
                    if (adminStudents.length > 0) {
                        console.log("[Göç] Yönetici verileri main_data üzerinden içe aktarılıyor...");
                        studentData = adminStudents;
                        _lastSavedRefs.students = Array.isArray(adminVal) ? {} : adminVal;
                        studentsFound = true;
                        fullUIRender();
                        saveData();
                    }
                }
            } catch (err) {
                console.warn("Admin migration check hatası:", err);
            }
        }

        // Eğer Firebase'de öğrenci yoksa boş başlat; YEREL VERİYİ SUNUCUYA OTOMATİK EŞİTLEME!
        if (!studentsFound) {
            studentData = [];
            _lastSavedRefs.students = {};
            fullUIRender();
        }

        // 2. Ödev & Proje Takip (Tracking) Doğrudan Sunucudan Çek (7 sn zaman aşımı wrapper)
        let trackingFound = false;
        const migrationDoneKey = 'tracking_migration_done_' + uid;
        const alreadyMigrated = localStorage.getItem(migrationDoneKey) === 'true';

        try {
            const trackSnap = await withTimeout(
                window.db.ref('app_data/' + uid + '/tracking').once('value'),
                7000,
                "Takip verisi sunucudan çekilemedi (Zaman Aşımı)"
            );
            if (trackSnap.exists()) {
                const trackVal = trackSnap.val();
                let normalizedList = [];
                let normalizedRefs = {};

                if (trackVal && typeof trackVal === 'object') {
                    const entries = Array.isArray(trackVal)
                        ? trackVal.map((v, i) => [String(i), v]).filter(([_, v]) => Boolean(v))
                        : Object.entries(trackVal);

                    entries.forEach(([fbKey, item]) => {
                        if (item) {
                            const trackId = item.id ? String(item.id) : ('trk_' + fbKey);
                            const safeTrackId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                            item.id = trackId;
                            item.firebaseKey = safeTrackId;

                            const decodedSubmissions = {};
                            if (item.submissions && typeof item.submissions === 'object') {
                                for (let k in item.submissions) {
                                    decodedSubmissions[decodeFirebaseKey(k)] = item.submissions[k];
                                }
                            }
                            item.submissions = decodedSubmissions;
                            normalizedList.push(item);
                            normalizedRefs[safeTrackId] = item;
                        }
                    });
                }

                trackingData = normalizedList;
                _lastSavedRefs.tracking = JSON.parse(JSON.stringify(normalizedRefs));
                trackingFound = true;
                localStorage.setItem(migrationDoneKey, 'true');
                renderTrackingList();
            }
        } catch (e) {
            console.warn("Firebase tracking doğrudan yükleme hatası:", e);
        }

        // Göç (Migration) Kontrolü (Sadece yönetici ve ilk kurulum)
        if (!trackingFound && !alreadyMigrated && currentUser.email === 'mremzi@gmail.com') {
            try {
                const adminTrackSnap = await withTimeout(
                    window.db.ref('app_data/main_data/tracking').once('value'),
                    7000,
                    "Admin tracking göçü zaman aşımına uğradı"
                );
                if (adminTrackSnap.exists()) {
                    const aVal = adminTrackSnap.val();
                    let normalizedList = [];
                    let normalizedRefs = {};
                    if (aVal && typeof aVal === 'object') {
                        const entries = Array.isArray(aVal) ? aVal.map((v, i) => [String(i), v]).filter(([_, v]) => Boolean(v)) : Object.entries(aVal);
                        entries.forEach(([fbKey, item]) => {
                            if (item) {
                                const trackId = item.id ? String(item.id) : ('trk_' + fbKey);
                                const safeTrackId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                                item.id = trackId;
                                item.firebaseKey = safeTrackId;
                                normalizedList.push(item);
                                normalizedRefs[safeTrackId] = item;
                            }
                        });
                    }
                    if (normalizedList.length > 0) {
                        console.log("[Göç] Yönetici tracking verileri ilk kez main_data üzerinden içe aktarılıyor...");
                        trackingData = normalizedList;
                        _lastSavedRefs.tracking = normalizedRefs;
                        trackingFound = true;
                        localStorage.setItem(migrationDoneKey, 'true');
                        renderTrackingList();
                        saveData(true);
                    }
                }
            } catch (err) {
                console.warn("Admin tracking migration hatası:", err);
            }
        }

        // Eğer Firebase'de hiç tracking yoksa boş başlat; YEREL VERİYİ OTOMATİK İTME!
        if (!trackingFound) {
            trackingData = [];
            _lastSavedRefs.tracking = {};
            renderTrackingList();
        }

        // 3. Çizelgeler (Checklists) Doğrudan Sunucudan Çek (7 sn zaman aşımı wrapper)
        let checklistsFound = false;
        try {
            const chkSnap = await withTimeout(
                window.db.ref('app_data/' + uid + '/checklists').once('value'),
                7000,
                "Çizelge verisi sunucudan çekilemedi (Zaman Aşımı)"
            );
            if (chkSnap.exists()) {
                const chkVal = chkSnap.val();
                let normalizedList = [];
                let normalizedRefs = {};
                if (chkVal && typeof chkVal === 'object') {
                    const entries = Array.isArray(chkVal)
                        ? chkVal.map((v, i) => [String(i), v]).filter(([_, v]) => Boolean(v))
                        : Object.entries(chkVal);

                    entries.forEach(([fbKey, item]) => {
                        if (item) {
                            const chkId = item.id ? String(item.id) : ('chk_' + fbKey);
                            const safeChkId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                            item.id = chkId;
                            item.firebaseKey = safeChkId;

                            const decodedEvaluations = {};
                            if (item.evaluations && typeof item.evaluations === 'object') {
                                for (let k in item.evaluations) {
                                    decodedEvaluations[decodeFirebaseKey(k)] = item.evaluations[k];
                                }
                            }
                            item.evaluations = decodedEvaluations;

                            // Kriter ve simge dizilerini garantiye al (Firebase nesne dönüşümü koruması)
                            if (item.criteria && typeof item.criteria === 'object' && !Array.isArray(item.criteria)) {
                                item.criteria = Object.values(item.criteria);
                            }
                            if (!Array.isArray(item.criteria)) item.criteria = [];

                            if (item.customSymbols && typeof item.customSymbols === 'object' && !Array.isArray(item.customSymbols)) {
                                item.customSymbols = Object.values(item.customSymbols);
                            }

                            normalizedList.push(item);
                            normalizedRefs[safeChkId] = item;
                        }
                    });
                }
                checklistData = normalizedList;
                window.checklistData = normalizedList;
                _lastSavedRefs.checklists = JSON.parse(JSON.stringify(normalizedRefs));
                checklistsFound = true;
                if (typeof renderChecklistList === 'function') renderChecklistList();
            }
        } catch (e) {
            console.warn("Firebase checklists doğrudan yükleme hatası:", e);
        }

        // Eğer Firebase'de çizelge yoksa boş başlat; YEREL VERİYİ OTOMATİK İTME!
        if (!checklistsFound) {
            checklistData = [];
            window.checklistData = [];
            _lastSavedRefs.checklists = {};
            if (typeof renderChecklistList === 'function') renderChecklistList();
        }

        // 3.5. LGS Koçluk Verilerini Doğrudan Sunucudan Çek
        let koclukFound = false;
        try {
            const kocSnap = await withTimeout(
                window.db.ref('app_data/' + uid + '/kocluk').once('value'),
                7000,
                "Koçluk verisi sunucudan çekilemedi (Zaman Aşımı)"
            );
            if (kocSnap.exists()) {
                const kocVal = kocSnap.val();
                let normalizedList = [];
                let normalizedRefs = {};
                if (kocVal && typeof kocVal === 'object') {
                    const entries = Array.isArray(kocVal)
                        ? kocVal.map((v, i) => [String(i), v]).filter(([_, v]) => Boolean(v))
                        : Object.entries(kocVal);

                    entries.forEach(([fbKey, item]) => {
                        if (item) {
                            const kocId = item.id ? String(item.id) : ('koc_' + fbKey);
                            const safeKocId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                            item.id = kocId;
                            item.firebaseKey = safeKocId;
                            normalizedList.push(item);
                            normalizedRefs[safeKocId] = item;
                        }
                    });
                }
                koclukData = normalizedList;
                window.koclukData = normalizedList;
                _lastSavedRefs.kocluk = JSON.parse(JSON.stringify(normalizedRefs));
                koclukFound = true;
                if (typeof renderKoclukModule === 'function') renderKoclukModule();
            }
        } catch (e) {
            console.warn("Firebase kocluk doğrudan yükleme hatası:", e);
        }

        if (!koclukFound) {
            // LocalStorage'da önceden saklanan koçluk yedeğini kontrol et (offline/yenileme kurtarma)
            let localKocluk = [];
            try {
                const userKey = uid ? `${STORAGE_KEY}_${uid}` : STORAGE_KEY;
                const cachedRaw = localStorage.getItem(userKey) || localStorage.getItem(STORAGE_KEY);
                if (cachedRaw) {
                    const parsed = JSON.parse(cachedRaw);
                    if (Array.isArray(parsed.kocluk) && parsed.kocluk.length > 0) {
                        localKocluk = parsed.kocluk;
                    }
                }
            } catch (err) {}

            if (localKocluk.length > 0) {
                console.log("[Koçluk Kurtarma] Firebase verisi henüz hazır değil, yerel önbellekteki " + localKocluk.length + " öğrenci geri yüklendi.");
                koclukData = localKocluk;
                window.koclukData = localKocluk;
                _lastSavedRefs.kocluk = {};
                koclukFound = true;
                if (typeof renderKoclukModule === 'function') renderKoclukModule();
                // Sunucuya aktar
                saveData(true);
            } else {
                const emptyKoc = [];
                koclukData = emptyKoc;
                window.koclukData = emptyKoc;
                _lastSavedRefs.kocluk = {};
                if (typeof renderKoclukModule === 'function') renderKoclukModule();
            }
        }

        // 4. Canlı dinleyicileri bağla
        attachListeners(uid);

        initialLoadComplete = true;
        window._isFallbackActive = false;
        setDbSyncStatus('synced', 'Canlı Veriler Yüklendi');
        
        // Soru takip modülü entegrasyonu
        listenToStudentForms();
        
    } catch (e) {
        console.error("Yükleme hatası (Fail-Fast):", e);
        setDbSyncStatus('error', 'Veri Çekme Hatası: ' + (e.message || 'Sunucuya ulaşılamadı'));
        showGlobalToast('<i class="fas fa-plug-circle-xmark"></i> Canlı veri yüklenemedi: ' + (e.message || 'Sunucu yanıt vermedi'), 'error');
        // Kullanıcıya çevrimdışı uyarısı ver ve sadece salt-okunur yerel yedeği göster
        window._isFallbackActive = true;
        loadLocalFallback();
    }
}

let _activeDbListeners = [];

function detachListeners() {
    if (_activeDbListeners && _activeDbListeners.length > 0) {
        _activeDbListeners.forEach(ref => {
            try {
                if (ref && typeof ref.off === 'function') {
                    ref.off();
                }
            } catch (e) {
                console.warn("[Firebase RTDB] Dinleyici kapatma hatası:", e);
            }
        });
        _activeDbListeners = [];
    }
    if (window._studentFormsRef) {
        try { window._studentFormsRef.off(); } catch (e) {}
        window._studentFormsRef = null;
    }
}
window.detachListeners = detachListeners;

function attachListeners(uid) {
    detachListeners();
    const db = window.db;
    if (!db || !uid) return;

    // --- STUDENTS ---
    const studentsRef = db.ref(`app_data/${uid}/students`);
    _activeDbListeners.push(studentsRef);

    studentsRef.on('child_changed', snap => {
        const student = snap.val();
        if (!student) return;
        const targetNo = String(student.no || snap.key);
        const idx = studentData.findIndex(s => String(s.no) === targetNo);
        if (idx > -1) {
            studentData[idx] = student;
        } else {
            studentData.push(student);
        }
        _lastSavedRefs.students[snap.key] = JSON.parse(JSON.stringify(student));
        if (!isUIActive()) {
            renderStudentTable();
            if (typeof updateStudentPickers === 'function') updateStudentPickers();
        }
    });

    studentsRef.on('child_added', snap => {
        const student = snap.val();
        if (!student) return;
        const targetNo = String(student.no || snap.key);
        const exists = studentData.some(s => String(s.no) === targetNo);
        if (!exists) {
            studentData.push(student);
            _lastSavedRefs.students[snap.key] = JSON.parse(JSON.stringify(student));
            if (!isUIActive() && initialLoadComplete) {
                renderStudentTable();
                if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
                if (typeof renderTrackingList === 'function') renderTrackingList();
            }
        }
    });

    studentsRef.on('child_removed', snap => {
        const key = snap.key;
        const student = snap.val();
        const targetNo = (student && student.no) ? String(student.no) : String(key);

        // Key migration koruması: Eğer öğrenci hala geçerli bir no ile listede/referansta varsa silme
        const stillInRefs = Object.values(_lastSavedRefs.students || {}).some(s => s && String(s.no) === targetNo);
        if (!stillInRefs) {
            studentData = studentData.filter(s => String(s.no) !== targetNo);
            delete _lastSavedRefs.students[key];
            if (!isUIActive()) {
                renderStudentTable();
                if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
                if (typeof renderTrackingList === 'function') renderTrackingList();
            }
        }
    });

    // Diğer koleksiyonlar genellikle çok büyük olmadığı için on('value') ile kolayca dinlenebilir
    const projectsRef = db.ref(`app_data/${uid}/projects`);
    _activeDbListeners.push(projectsRef);
    projectsRef.on('value', snap => {
        const val = snap.val() || {};
        const projects = Object.values(val).map(p => ({
            ...p,
            members: p.members || [],
            asamalar: p.asamalar || [],
            odevLinks: p.odevLinks || [],
            mesajlar: p.mesajlar || []
        }));
        if (typeof projeGruplariData !== 'undefined') projeGruplariData = projects;
        _lastSavedRefs.projects = JSON.parse(JSON.stringify(val));
        if (!isUIActive() && initialLoadComplete && typeof pgRenderList === 'function') pgRenderList();
    });

    const regGroupsRef = db.ref(`app_data/${uid}/regular_groups`);
    _activeDbListeners.push(regGroupsRef);
    regGroupsRef.on('value', snap => {
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
        _lastSavedRefs.regular_groups = JSON.parse(JSON.stringify(val));
        
        if (!isUIActive() && initialLoadComplete) {
            const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
            if (selectedClass) loadClassGroups(selectedClass);
        }
    });

    const examsRef = db.ref(`app_data/${uid}/exams`);
    _activeDbListeners.push(examsRef);
    examsRef.on('value', snap => {
        const val = snap.val() || {};
        examData = Object.values(val);
        _lastSavedRefs.exams = JSON.parse(JSON.stringify(val));
        if (!isUIActive() && initialLoadComplete) renderExams();
    });

    const scheduleRef = db.ref(`app_data/${uid}/schedule`);
    _activeDbListeners.push(scheduleRef);
    scheduleRef.on('value', snap => {
        scheduleData = snap.val() || [];
        _lastSavedRefs.schedule = JSON.parse(JSON.stringify(scheduleData));
        if (!isUIActive() && initialLoadComplete) renderSchedule();
    });

    const trackingRef = db.ref(`app_data/${uid}/tracking`);
    _activeDbListeners.push(trackingRef);
    trackingRef.on('value', snap => {
        const val = snap.val();
        if (val && typeof val === 'object') {
            const entries = Array.isArray(val)
                ? val.map((v, i) => [String(i), v]).filter(([_, v]) => Boolean(v))
                : Object.entries(val);

            let normalizedList = [];
            let normalizedRefs = {};
            entries.forEach(([fbKey, item]) => {
                if (item) {
                    const trackId = item.id ? String(item.id) : ('trk_' + fbKey);
                    const safeTrackId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                    item.id = trackId;
                    item.firebaseKey = safeTrackId;

                    const decodedSubmissions = {};
                    if (item.submissions && typeof item.submissions === 'object') {
                        for (let k in item.submissions) {
                            decodedSubmissions[decodeFirebaseKey(k)] = item.submissions[k];
                        }
                    }
                    item.submissions = decodedSubmissions;
                    normalizedList.push(item);
                    normalizedRefs[safeTrackId] = item;
                }
            });
            trackingData = normalizedList;
            _lastSavedRefs.tracking = JSON.parse(JSON.stringify(normalizedRefs));
        } else {
            if (initialLoadComplete) {
                trackingData = [];
                _lastSavedRefs.tracking = {};
            }
        }
        if (!isUIActive() && initialLoadComplete) renderTrackingList();
    });

    // Checklists (Öğretmen Takip ve Kontrol Çizelgeleri) Dinleyicisi
    const checklistsRef = db.ref(`app_data/${uid}/checklists`);
    _activeDbListeners.push(checklistsRef);
    checklistsRef.on('value', snap => {
        const val = snap.val();
        if (val) {
            let entries = Object.entries(val);
            let normalizedList = [];
            let normalizedRefs = {};
            entries.forEach(([fbKey, item]) => {
                if (item) {
                    const chkId = item.id ? String(item.id) : ('chk_' + fbKey);
                    const safeChkId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                    item.id = chkId;
                    item.firebaseKey = safeChkId;

                    const decodedEvaluations = {};
                    if (item.evaluations && typeof item.evaluations === 'object') {
                        for (let k in item.evaluations) {
                            decodedEvaluations[decodeFirebaseKey(k)] = item.evaluations[k];
                        }
                    }
                    item.evaluations = decodedEvaluations;

                    // Kriter ve simge dizilerini garantiye al (Firebase nesne dönüşümü koruması)
                    if (item.criteria && typeof item.criteria === 'object' && !Array.isArray(item.criteria)) {
                        item.criteria = Object.values(item.criteria);
                    }
                    if (!Array.isArray(item.criteria)) item.criteria = [];

                    if (item.customSymbols && typeof item.customSymbols === 'object' && !Array.isArray(item.customSymbols)) {
                        item.customSymbols = Object.values(item.customSymbols);
                    }

                    normalizedList.push(item);
                    normalizedRefs[safeChkId] = item;
                }
            });
            checklistData = normalizedList;
            window.checklistData = normalizedList;
            _lastSavedRefs.checklists = JSON.parse(JSON.stringify(normalizedRefs));
        } else {
            if (initialLoadComplete) {
                checklistData = [];
                window.checklistData = [];
                _lastSavedRefs.checklists = {};
            }
        }
        if (!isUIActive() && initialLoadComplete && typeof renderChecklistList === 'function') {
            renderChecklistList();
        }
    });

    // LGS Koçluk & Mentorluk Dinleyicisi
    const koclukRef = db.ref(`app_data/${uid}/kocluk`);
    _activeDbListeners.push(koclukRef);
    koclukRef.on('value', snap => {
        const val = snap.val();
        if (val) {
            let entries = Object.entries(val);
            let normalizedList = [];
            let normalizedRefs = {};
            entries.forEach(([fbKey, item]) => {
                if (item) {
                    const kocId = item.id ? String(item.id) : ('koc_' + fbKey);
                    const safeKocId = encodeFirebaseKey(fbKey).replace(/[\/\.\#\$\/\[\]]/g, '_');
                    item.id = kocId;
                    item.firebaseKey = safeKocId;
                    normalizedList.push(item);
                    normalizedRefs[safeKocId] = item;
                }
            });
            koclukData = normalizedList;
            window.koclukData = normalizedList;
            _lastSavedRefs.kocluk = JSON.parse(JSON.stringify(normalizedRefs));
        } else {
            if (initialLoadComplete) {
                // Eğer yerel bellekte henüz sunucuya gitmekte olan veri varsa ezme
                if (!window.koclukData || window.koclukData.length === 0) {
                    const emptyKoc = [];
                    koclukData = emptyKoc;
                    window.koclukData = emptyKoc;
                    _lastSavedRefs.kocluk = {};
                }
            }
        }
        if (!isUIActive() && initialLoadComplete && typeof renderKoclukModule === 'function') {
            renderKoclukModule();
        }
    });
}

function fullUIRender() {
    renderStudentTable();
    renderSchedule();
    renderTrackingList();
    if (typeof updateChecklistClassContainer === 'function') updateChecklistClassContainer();
    if (typeof renderChecklistList === 'function') renderChecklistList();
    if (typeof renderKoclukModule === 'function') renderKoclukModule();
    renderExams();
    updateClassDropdown();
    if (typeof ileriSinifDoldur === 'function') ileriSinifDoldur();
    const selectedClass = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
    if (selectedClass) {
        loadClassGroups(selectedClass);
        if (typeof updateStudentPickers === 'function') updateStudentPickers();
    }
    if (typeof pgFillSinifDropdowns === 'function') pgFillSinifDropdowns();
    if (window.SoruTakipUI) {
        if (typeof window.SoruTakipUI.populateClassDropdown === 'function') {
            window.SoruTakipUI.populateClassDropdown();
        }
        if (typeof window.SoruTakipUI.populateStudentDropdown === 'function') {
            window.SoruTakipUI.populateStudentDropdown();
        }
    }
}

async function loadLocalFallback() {
    setDbSyncStatus('offline', 'Çevrimdışı (Yerel Salt Okunur Önbellek)');
    window._isFallbackActive = true;
    const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    const uid = currentUser?.uid || '';
    const userKey = uid ? `${STORAGE_KEY}_${uid}` : STORAGE_KEY;
    const savedData = localStorage.getItem(userKey) || localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const p = JSON.parse(savedData);
            studentData = p.students || [];
            window.studentData = studentData;
            if (typeof advancedGroupData !== 'undefined') {
                advancedGroupData = p.advancedGroups || [];
            } else {
                window.advancedGroupData = p.advancedGroups || [];
            }
            groupData = p.groups || {};
            window.groupData = groupData;
            scheduleData = p.schedule || [];
            window.scheduleData = scheduleData;
            trackingData = p.tracking || [];
            window.trackingData = trackingData;
            checklistData = p.checklists || [];
            window.checklistData = checklistData;
            koclukData = p.kocluk || [];
            window.koclukData = koclukData;
            examData = p.exams || [];
            window.examData = examData;
            fullUIRender();
        } catch (e) {
            console.error("[Fallback] Yerel önbellek yükleme hatası:", e);
        }
    }
}

// Soru takip modülü form dinleyicisi
function listenToStudentForms() {
    const listContainer = document.getElementById('student-forms-list');
    if (!listContainer || !window.db) return;

    // Önceki dinleyiciyi kapat (bellek sızıntısını ve çift tetiklemeyi önle)
    if (window._studentFormsRef) {
        try { window._studentFormsRef.off(); } catch (e) {}
    }
    window._studentFormsRef = window.db.ref('student_forms').orderByKey().limitToLast(100);
    window._studentFormsRef.on('value', (snapshot) => {
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

                if (vakSecimi && data.ogrenciNo) {
                    const sIdx = studentData.findIndex(s => {
                        const noMatch = s.no && s.no.toString() === data.ogrenciNo.toString();
                        const classMatch = s.sinif && (s.sinif === data.sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(data.sinif)));
                        if (!noMatch || !classMatch) return false;
                        if (data.adSoyad && s.adSoyad) {
                            const n1 = s.adSoyad.trim().toLocaleLowerCase('tr-TR');
                            const n2 = data.adSoyad.trim().toLocaleLowerCase('tr-TR');
                            return n1 === n2 || n1.includes(n2) || n2.includes(n1);
                        }
                        return true;
                    });
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
        checklists: typeof checklistData !== 'undefined' ? checklistData : (window.checklistData || []),
        kocluk: getKoclukSourceList(),
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
                    checklistData = parsed.checklists || [];
                    window.checklistData = checklistData;
                    koclukData = parsed.kocluk || [];
                    window.koclukData = koclukData;
                    examData = parsed.exams || [];
                    
                    saveData(); // Atomik olarak Firebase'e iter
                    fullUIRender();
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
            checklistData = [];
            window.checklistData = [];
            koclukData = [];
            window.koclukData = [];
            scheduleData = [];
            if (typeof projeGruplariData !== 'undefined') projeGruplariData = [];
            if (typeof advancedGroupData !== 'undefined') advancedGroupData = [];
            groupData = {};
            const grpCont = document.getElementById('groups-container');
            if (grpCont) grpCont.innerHTML = '';
            
            saveData(); // Firebase'deki ilgili ağaçları null yapar (siler)
            fullUIRender();
            alert('Sistem sıfırlandı.');
        }
    }
}

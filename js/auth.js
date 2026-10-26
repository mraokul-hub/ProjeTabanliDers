// ============================================================
// auth.js
// Firebase Authentication ve Admin Paneli Kullanıcı Yönetimi
// ============================================================

// ── YÖNETİCİ PANELİ İŞLEMLERİ ──
function loadUsersAdmin() {
    const adminUsersList = document.getElementById('admin-users-list');
    if (!adminUsersList) return;

    if (!window.db && typeof firebase !== 'undefined' && firebase.database) {
        try {
            window.db = firebase.database();
        } catch (e) {
            console.error("Firebase db başlatılamadı:", e);
        }
    }

    if (!window.db) {
        adminUsersList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#ef4444; padding:25px;">
            <i class="fas fa-exclamation-circle" style="font-size:18px; margin-right:8px;"></i>
            Veritabanı bağlantısı bulunamadı (window.db tanımsız).
        </td></tr>`;
        return;
    }

    // Yükleniyor durumunu göster
    adminUsersList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:25px;">
        <i class="fas fa-spinner fa-spin" style="font-size:18px; margin-right:8px; color:var(--primary);"></i>
        Kullanıcı listesi yükleniyor, lütfen bekleyiniz...
    </td></tr>`;

    const countBadge = document.getElementById('admin-user-count');

    try {
        window.db.ref('kullanicilar').off('value'); // Eski dinleyicileri temizle
        window.db.ref('kullanicilar').on('value', snapshot => {
            adminUsersList.innerHTML = '';

            if (!snapshot.exists()) {
                adminUsersList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:25px;">
                    <i class="fas fa-user-slash" style="font-size:18px; margin-right:8px;"></i>
                    Sistemde henüz kayıtlı kullanıcı bulunmuyor.
                </td></tr>`;
                if (countBadge) countBadge.textContent = '0 Kullanıcı';
                return;
            }

            let userCount = 0;
            const collectedUsers = [];
            snapshot.forEach(childSnapshot => {
                userCount++;
                const uid = childSnapshot.key;
                const data = childSnapshot.val() || {};
                const safeName = (typeof window.escapeHtml === 'function') ? window.escapeHtml(data.adSoyad || '-') : (data.adSoyad || '-').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const safeEmail = (typeof window.escapeHtml === 'function') ? window.escapeHtml(data.email || '-') : (data.email || '-').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const emailParam = (typeof window.escapeJs === 'function') ? window.escapeJs(data.email || '') : (data.email || '').replace(/['"]/g, '');
                const nameParam = (typeof window.escapeJs === 'function') ? window.escapeJs(data.adSoyad || data.email || 'Öğretmen') : (data.adSoyad || data.email || 'Öğretmen').replace(/['"]/g, '');
                const isOnayli = (data.onayli === true || data.onayli === 'true');

                collectedUsers.push({
                    uid,
                    adSoyad: data.adSoyad || data.email || 'Öğretmen',
                    email: data.email || '',
                    onayli: isOnayli
                });

                const tr = document.createElement('tr');
                const tarih = data.kayitTarihi ? new Date(data.kayitTarihi).toLocaleDateString('tr-TR') : '-';
                const durumBadge = isOnayli
                    ? `<span class="xp-badge" style="background:#10b981; color:white; padding:4px 9px; border-radius:12px; font-size:11px; font-weight:600;">Onaylı</span>`
                    : `<span class="xp-badge" style="background:#ef4444; color:white; padding:4px 9px; border-radius:12px; font-size:11px; font-weight:600;">Onaysız</span>`;

                let buttons = '';
                // 1. Hesaba Gir (Öğretmen Çalışma Alanını İncele)
                buttons += `<button class="btn" style="padding: 6px 11px; font-size: 11.5px; margin-right: 5px; flex: initial; background:linear-gradient(135deg, #4f46e5, #6366f1); color:white; border:none; border-radius:6px; cursor:pointer; font-weight:700; box-shadow:0 2px 6px rgba(79,70,229,0.3);" onclick="viewTeacherWorkspace('${uid}', '${nameParam}', '${emailParam}')" title="Bu öğretmenin hesabına gir ve tüm verilerini gör"><i class="fas fa-eye"></i> Hesaba Gir</button>`;

                // 2. Veri Aktar (Hesaplar Arası Klonlama/Birleştirme)
                buttons += `<button class="btn" style="padding: 6px 11px; font-size: 11.5px; margin-right: 5px; flex: initial; background:linear-gradient(135deg, #0284c7, #0ea5e9); color:white; border:none; border-radius:6px; cursor:pointer; font-weight:700; box-shadow:0 2px 6px rgba(2,132,199,0.3);" onclick="openAdminDataTransferModal('${uid}', '')" title="Bu öğretmenin verilerini başka bir hesaba aktar"><i class="fas fa-share-nodes"></i> Veri Aktar</button>`;

                // 3. İsmi Değiştir
                buttons += `<button class="btn btn-primary" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial; background:#3b82f6; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="editUserNameAdmin('${uid}')"><i class="fas fa-edit"></i> İsmi Değiştir</button>`;

                if (!isOnayli) {
                    buttons += `<button class="btn btn-save" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial; background:#10b981; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="approveUser('${uid}')"><i class="fas fa-check"></i> Onayla</button>`;
                } else {
                    buttons += `<button class="btn" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial; background:#f59e0b; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="suspendUser('${uid}')"><i class="fas fa-ban"></i> Askıya Al</button>`;
                }

                buttons += `<button class="btn btn-reset" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial; margin-top: 0; width: auto; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="rejectUser('${uid}')"><i class="fas fa-trash"></i> Sil</button>`;
                buttons += `<button class="btn btn-purple" style="padding: 6px 10px; font-size: 11px; flex: initial; background:#8b5cf6; color:white; border:none; border-radius:6px; cursor:pointer;" onclick="sendPasswordResetAdmin('${emailParam}')"><i class="fas fa-key"></i> Şifre Sıfırla</button>`;

                tr.innerHTML = `
                    <td style="font-weight:600;">${safeName}</td>
                    <td>${safeEmail}</td>
                    <td>${tarih}</td>
                    <td>${durumBadge}</td>
                    <td style="display: flex; gap: 4px; flex-wrap: wrap;">${buttons}</td>
                `;
                adminUsersList.appendChild(tr);
            });

            if (countBadge) {
                countBadge.textContent = `${userCount} Kullanıcı`;
            }

            // Selector ve modal seçim listelerini güncelle
            if (typeof populateAdminTeacherSelector === 'function') {
                populateAdminTeacherSelector(collectedUsers);
            }
        }, error => {
            console.error("Yönetici paneli kullanıcı yükleme hatası:", error);
            let msg = error.message || 'Bilinmeyen hata';
            if (error.code === 'PERMISSION_DENIED') {
                msg = "Erişim Reddedildi (PERMISSION_DENIED): Firebase güvenlik kuralları bu hesabın kullanıcı listesini okumasına izin vermiyor. Lütfen 'mremzi@gmail.com' hesabıyla oturum açtığınızdan emin olun.";
            }
            adminUsersList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#ef4444; padding:25px; font-weight:600;">
                <i class="fas fa-exclamation-triangle" style="font-size:20px; margin-right:8px;"></i>
                Kullanıcılar yüklenirken hata oluştu: ${msg}
            </td></tr>`;
        });
    } catch (err) {
        console.error("loadUsersAdmin genel hatası:", err);
        adminUsersList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#ef4444; padding:25px;">
            <i class="fas fa-exclamation-triangle" style="font-size:20px; margin-right:8px;"></i>
            Hata: ${err.message}
        </td></tr>`;
    }
}

function editUserNameAdmin(uid) {
    if (!window.db) return alert("Veritabanı bağlantısı bulunamadı.");
    window.db.ref('kullanicilar/' + uid).once('value').then(snapshot => {
        const data = snapshot.val() || {};
        const currentName = data.adSoyad || '';
        const newName = prompt(`"${data.email || 'Kullanıcı'}" için yeni Ad Soyad giriniz:`, currentName);

        if (newName === null) return; // İptal edildi
        const trimmed = newName.trim();
        if (!trimmed) {
            alert("Ad Soyad alanı boş bırakılamaz.");
            return;
        }
        if (trimmed === currentName) {
            return; // Değişiklik yok
        }

        window.db.ref('kullanicilar/' + uid).update({ adSoyad: trimmed }).then(() => {
            alert(`Kullanıcı adı başarıyla "${trimmed}" olarak güncellendi.`);
            // Eğer giriş yapan yönetici kendi adını güncellediyse üst paneldeki ismi de anında güncelle
            if (firebase.auth().currentUser && firebase.auth().currentUser.uid === uid) {
                const nameSpan = document.getElementById('user-display-name');
                if (nameSpan) {
                    nameSpan.innerHTML = `<i class="fas fa-user-circle"></i> ${trimmed}`;
                }
            }
        }).catch(err => {
            alert("İsim güncellenirken hata oluştu: " + err.message);
        });
    }).catch(err => {
        alert("Kullanıcı verisi alınamadı: " + err.message);
    });
}

function approveUser(uid) {
    if (!window.db) return alert("Veritabanı bağlantısı bulunamadı.");
    if (confirm("Bu kullanıcıyı onaylamak istediğinize emin misiniz?")) {
        window.db.ref('kullanicilar/' + uid).update({ onayli: true }).then(() => {
            alert("Kullanıcı başarıyla onaylandı.");
        }).catch(err => {
            alert("Onaylama sırasında hata oluştu: " + err.message);
        });
    }
}

function suspendUser(uid) {
    if (!window.db) return alert("Veritabanı bağlantısı bulunamadı.");
    if (confirm("Bu kullanıcının onayını kaldırmak (askıya almak) istediğinize emin misiniz? Kullanıcı sisteme giriş yapamayacaktır.")) {
        window.db.ref('kullanicilar/' + uid).update({ onayli: false }).then(() => {
            alert("Kullanıcı başarıyla askıya alındı.");
        }).catch(err => {
            alert("Askıya alma sırasında hata oluştu: " + err.message);
        });
    }
}

function rejectUser(uid) {
    if (!window.db) return alert("Veritabanı bağlantısı bulunamadı.");
    if (confirm("Bu kullanıcıyı kalıcı olarak silmek istediğinize emin misiniz?")) {
        window.db.ref('kullanicilar/' + uid).remove().then(() => {
            alert("Kullanıcı veritabanından silindi.");
        }).catch(err => {
            alert("Silme işlemi sırasında hata oluştu: " + err.message);
        });
    }
}

function sendPasswordResetAdmin(email) {
    if (!email || email === '-') return alert("Geçerli bir e-posta adresi bulunamadı.");
    if (confirm(email + " adresine şifre sıfırlama bağlantısı gönderilsin mi?")) {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            alert("Şifre sıfırlama e-postası başarıyla gönderildi.");
        }).catch(err => {
            alert("Hata: " + err.message);
        });
    }
}

// ── ÖĞRETMENLER ARASI ÖĞRENCİ AKTARMA (SADECE YÖNETİCİ) ──
let _adminCachedUsers = [];
window._adminTransferSourceStudents = [];

function checkAdminAuth() {
    const user = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
    if (!user) return false;
    return (user.email && user.email.toLowerCase().trim() === 'mremzi@gmail.com');
}

async function openAdminStudentTransferModal() {
    if (!checkAdminAuth()) {
        alert("Bu işlem yalnızca sistem yöneticisi ('mremzi@gmail.com') tarafından gerçekleştirilebilir.");
        return;
    }

    if (!window.db && typeof firebase !== 'undefined' && firebase.database) {
        try {
            window.db = firebase.database();
        } catch (e) {
            console.error("Firebase db başlatılamadı:", e);
        }
    }
    if (!window.db) {
        alert("Veritabanı bağlantısı kurulamadı.");
        return;
    }

    const modal = document.getElementById('admin-student-transfer-modal');
    const sourceSelect = document.getElementById('admin-transfer-source-teacher');
    const targetSelect = document.getElementById('admin-transfer-target-teacher');
    const classFilter = document.getElementById('admin-transfer-class-filter');
    const countBadge = document.getElementById('admin-transfer-count-badge');
    const previewList = document.getElementById('admin-transfer-preview-list');

    if (!modal) return;

    // Reset controls
    window._adminTransferSourceStudents = [];
    if (classFilter) {
        classFilter.innerHTML = '<option value="">Önce Kaynak Öğretmen Seçiniz...</option>';
        classFilter.disabled = true;
    }
    if (countBadge) {
        countBadge.textContent = '0 Öğrenci Seçili';
    }
    if (previewList) {
        previewList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">Öğrenci listesini görmek için yukarıdan bir kaynak öğretmen seçin.</td></tr>';
    }

    if (sourceSelect) sourceSelect.innerHTML = '<option value="">Öğretmenler yükleniyor...</option>';
    if (targetSelect) targetSelect.innerHTML = '<option value="">Öğretmenler yükleniyor...</option>';

    modal.style.display = 'flex';

    try {
        const snap = await window.db.ref('kullanicilar').once('value');
        const users = [];
        if (snap.exists()) {
            snap.forEach(child => {
                const uData = child.val() || {};
                users.push({
                    uid: child.key,
                    adSoyad: uData.adSoyad || 'İsimsiz Öğretmen',
                    email: uData.email || '',
                    onayli: (uData.onayli === true || uData.onayli === 'true')
                });
            });
        }

        // Yönetici de bir öğretmen olduğu için yöneticiyi listeye dahil et
        const currentAuthUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
        if (currentAuthUser) {
            const adminEmail = (currentAuthUser.email || 'mremzi@gmail.com').toLowerCase().trim();
            const existingAdmin = users.find(u => u.uid === currentAuthUser.uid || (u.email && u.email.toLowerCase().trim() === adminEmail));

            if (existingAdmin) {
                existingAdmin.isAdmin = true;
                existingAdmin.onayli = true;
                if (!existingAdmin.adSoyad || existingAdmin.adSoyad === 'İsimsiz Öğretmen') {
                    existingAdmin.adSoyad = currentAuthUser.displayName || 'Yönetici Öğretmen';
                }
            } else {
                let adminName = currentAuthUser.displayName || '';
                try {
                    const pSnap = await window.db.ref('kullanicilar/' + currentAuthUser.uid).once('value');
                    if (pSnap.exists() && pSnap.val() && pSnap.val().adSoyad) {
                        adminName = pSnap.val().adSoyad;
                    }
                } catch (e) { }

                if (!adminName) {
                    const nameSpan = document.getElementById('user-display-name');
                    if (nameSpan) {
                        const rawText = nameSpan.textContent || '';
                        const clean = rawText.replace(/^[^\wğüşıöçĞÜŞİÖÇ]+/i, '').trim();
                        if (clean && clean !== adminEmail) adminName = clean;
                    }
                }
                if (!adminName) {
                    adminName = 'Yönetici (Öğretmen)';
                }

                users.unshift({
                    uid: currentAuthUser.uid,
                    adSoyad: adminName,
                    email: currentAuthUser.email || 'mremzi@gmail.com',
                    onayli: true,
                    isAdmin: true
                });
            }
        }

        // Yöneticiyi en başta gösterecek şekilde organize et
        const adminItems = users.filter(u => u.isAdmin || (u.email && u.email.toLowerCase().trim() === 'mremzi@gmail.com'));
        const teacherItems = users.filter(u => !u.isAdmin && (!u.email || u.email.toLowerCase().trim() !== 'mremzi@gmail.com'));
        teacherItems.sort((a, b) => (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR'));
        _adminCachedUsers = [...adminItems, ...teacherItems];

        let sourceOpts = '<option value="">Kaynak Öğretmen Seçiniz...</option>';
        let targetOpts = '<option value="">Hedef Öğretmen Seçiniz...</option>';

        _adminCachedUsers.forEach(u => {
            const isAdmin = u.isAdmin || (u.email && u.email.toLowerCase().trim() === 'mremzi@gmail.com');
            const adminBadge = isAdmin ? ' 👑 [Yönetici]' : '';
            const statusLabel = u.onayli ? '' : ' [Onaysız]';
            const safeName = (typeof escapeHTML === 'function') ? escapeHTML(u.adSoyad || '') : (u.adSoyad || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const safeEmail = (typeof escapeHTML === 'function') ? escapeHTML(u.email || '') : (u.email || '').replace(/</g, "&lt;").replace(/>/g, "&gt;");
            sourceOpts += `<option value="${u.uid}">${safeName} (${safeEmail})${adminBadge}${statusLabel}</option>`;
            targetOpts += `<option value="${u.uid}">${safeName} (${safeEmail})${adminBadge}${statusLabel}</option>`;
        });

        if (sourceSelect) sourceSelect.innerHTML = sourceOpts;
        if (targetSelect) targetSelect.innerHTML = targetOpts;

    } catch (err) {
        console.error("Öğretmen listesi yüklenemedi:", err);
        alert("Öğretmen listesi çekilirken hata oluştu: " + err.message);
    }
}

function closeAdminStudentTransferModal() {
    const modal = document.getElementById('admin-student-transfer-modal');
    if (modal) modal.style.display = 'none';
}

async function onAdminTransferSourceChange() {
    const sourceSelect = document.getElementById('admin-transfer-source-teacher');
    const targetSelect = document.getElementById('admin-transfer-target-teacher');
    const classFilter = document.getElementById('admin-transfer-class-filter');
    const countBadge = document.getElementById('admin-transfer-count-badge');
    const previewList = document.getElementById('admin-transfer-preview-list');

    if (!sourceSelect) return;
    const sourceUid = sourceSelect.value;

    window._adminTransferSourceStudents = [];

    // Hedef öğretmen listesindeki aynı öğretmeni devre dışı bırak
    if (targetSelect) {
        Array.from(targetSelect.options).forEach(opt => {
            opt.disabled = (opt.value && opt.value === sourceUid);
        });
        if (targetSelect.value === sourceUid) {
            targetSelect.value = '';
        }
    }

    if (!sourceUid) {
        if (classFilter) {
            classFilter.innerHTML = '<option value="">Önce Kaynak Öğretmen Seçiniz...</option>';
            classFilter.disabled = true;
        }
        if (countBadge) countBadge.textContent = '0 Öğrenci Seçili';
        if (previewList) previewList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">Öğrenci listesini görmek için yukarıdan bir kaynak öğretmen seçin.</td></tr>';
        return;
    }

    if (previewList) {
        previewList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);"><i class="fas fa-spinner fa-spin me-2"></i>Öğrenciler yükleniyor...</td></tr>';
    }

    try {
        const snap = await window.db.ref('app_data/' + sourceUid + '/students').once('value');
        let students = [];
        if (snap.exists()) {
            const val = snap.val();
            if (Array.isArray(val)) {
                students = val.filter(Boolean);
            } else if (typeof val === 'object' && val !== null) {
                students = Object.values(val).filter(Boolean);
            }
        }

        // Eğer öğrencisi yoksa ve kaynak yönetici ise app_data/main_data veya aktif oturum belleğine bak (fallback)
        if (students.length === 0) {
            const currentAuth = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
            const sourceUser = _adminCachedUsers.find(u => u.uid === sourceUid);
            const isSourceAdmin = (sourceUser && (sourceUser.isAdmin || (sourceUser.email && sourceUser.email.toLowerCase().trim() === 'mremzi@gmail.com'))) ||
                (currentAuth && (currentAuth.uid === sourceUid || currentAuth.email?.toLowerCase().trim() === 'mremzi@gmail.com'));

            if (isSourceAdmin) {
                // 1. Firebase app_data/main_data/students
                try {
                    const mainSnap = await window.db.ref('app_data/main_data/students').once('value');
                    if (mainSnap.exists()) {
                        const mVal = mainSnap.val();
                        students = Array.isArray(mVal) ? mVal.filter(Boolean) : Object.values(mVal || {}).filter(Boolean);
                    }
                } catch (e) { }

                // 2. Aktif oturum belleği ve yerel depolama
                if (students.length === 0) {
                    if (typeof studentData !== 'undefined' && Array.isArray(studentData) && studentData.length > 0) {
                        students = studentData.slice();
                    } else if (typeof window.studentData !== 'undefined' && Array.isArray(window.studentData) && window.studentData.length > 0) {
                        students = window.studentData.slice();
                    } else {
                        try {
                            const raw = localStorage.getItem('proje_tabanli_ders_data');
                            if (raw) {
                                const parsed = JSON.parse(raw);
                                const list = parsed.students || parsed.studentData || [];
                                if (Array.isArray(list) && list.length > 0) {
                                    students = list.slice();
                                }
                            }
                        } catch (e) { }
                    }
                }
            }
        }

        window._adminTransferSourceStudents = students;

        if (students.length === 0) {
            if (classFilter) {
                classFilter.innerHTML = '<option value="">Kayıtlı Öğrenci Yok</option>';
                classFilter.disabled = true;
            }
            if (countBadge) countBadge.textContent = '0 Öğrenci Bulundu';
            if (previewList) previewList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:#ef4444;"><i class="fas fa-info-circle me-1"></i>Bu öğretmende kayıtlı öğrenci bulunamadı.</td></tr>';
            return;
        }

        // Sınıfları ayıkla
        const classMap = {};
        students.forEach(s => {
            const cName = (s.sinif || 'Belirtilmedi').trim();
            classMap[cName] = (classMap[cName] || 0) + 1;
        });

        const sortedClasses = Object.keys(classMap).sort((a, b) => a.localeCompare(b, 'tr-TR'));

        if (classFilter) {
            let filterHtml = `<option value="ALL">Tüm Sınıflar (${students.length} Öğrenci)</option>`;
            sortedClasses.forEach(cName => {
                filterHtml += `<option value="${cName}">${cName} (${classMap[cName]} Öğrenci)</option>`;
            });
            classFilter.innerHTML = filterHtml;
            classFilter.disabled = false;
        }

        renderAdminTransferPreview(students);

    } catch (err) {
        console.error("Kaynak öğretmen verisi çekilemedi:", err);
        alert("Öğrenci verisi alınırken hata oluştu: " + err.message);
    }
}

function onAdminTransferClassFilterChange() {
    const classFilter = document.getElementById('admin-transfer-class-filter');
    if (!classFilter) return;
    const selectedClass = classFilter.value;
    const allStudents = window._adminTransferSourceStudents || [];

    if (selectedClass === 'ALL' || !selectedClass) {
        renderAdminTransferPreview(allStudents);
    } else {
        const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
        const filtered = allStudents.filter(s => {
            const cName = (s.sinif || 'Belirtilmedi').trim();
            return cName === selectedClass || norm(cName) === norm(selectedClass);
        });
        renderAdminTransferPreview(filtered);
    }
}

function renderAdminTransferPreview(students) {
    const countBadge = document.getElementById('admin-transfer-count-badge');
    const previewList = document.getElementById('admin-transfer-preview-list');

    if (countBadge) {
        countBadge.textContent = `${students.length} Öğrenci Seçili`;
    }

    if (!previewList) return;

    if (students.length === 0) {
        previewList.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">Seçilen sınıfta öğrenci bulunamadı.</td></tr>';
        return;
    }

    // Numaraya göre sırala
    const sorted = [...students].sort((a, b) => (parseInt(a.no, 10) || 0) - (parseInt(b.no, 10) || 0));

    let html = '';
    sorted.forEach((s, idx) => {
        const safeNo = (s.no !== undefined && s.no !== null) ? String(s.no).replace(/</g, "&lt;") : '-';
        const safeName = (s.adSoyad || '-').replace(/</g, "&lt;");
        const safeClass = (s.sinif || '-').replace(/</g, "&lt;");

        html += `<tr>
            <td style="color:var(--text-muted); font-size:11px;">${idx + 1}</td>
            <td style="font-weight:700; color:var(--primary);">${safeNo}</td>
            <td style="font-weight:600;">${safeName}</td>
            <td><span style="background:rgba(59,130,246,0.1); color:#2563eb; padding:2px 8px; border-radius:10px; font-weight:700; font-size:11px;">${safeClass}</span></td>
        </tr>`;
    });

    previewList.innerHTML = html;
}

async function executeAdminStudentTransfer() {
    if (!checkAdminAuth()) {
        alert("Yetkisiz işlem. Yalnızca sistem yöneticisi öğrenci aktarımı yapabilir.");
        return;
    }

    const sourceSelect = document.getElementById('admin-transfer-source-teacher');
    const targetSelect = document.getElementById('admin-transfer-target-teacher');
    const classFilter = document.getElementById('admin-transfer-class-filter');
    const modeRadio = document.querySelector('input[name="admin-transfer-mode"]:checked');

    const sourceUid = sourceSelect ? sourceSelect.value : '';
    const targetUid = targetSelect ? targetSelect.value : '';
    const transferMode = modeRadio ? modeRadio.value : 'merge';
    const selectedClass = classFilter ? classFilter.value : 'ALL';

    if (!sourceUid) {
        alert("Lütfen kaynak öğretmen seçiniz.");
        return;
    }
    if (!targetUid) {
        alert("Lütfen hedef öğretmen seçiniz.");
        return;
    }
    if (sourceUid === targetUid) {
        alert("Kaynak ve hedef öğretmen aynı kişi olamaz.");
        return;
    }

    const allSourceStudents = window._adminTransferSourceStudents || [];
    if (allSourceStudents.length === 0) {
        alert("Kaynak öğretmende aktarılacak öğrenci bulunmuyor.");
        return;
    }

    // Sınıf filtresine göre aktarılacak öğrencileri belirle
    let targetStudentsToTransfer = allSourceStudents;
    if (selectedClass && selectedClass !== 'ALL') {
        const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
        targetStudentsToTransfer = allSourceStudents.filter(s => {
            const cName = (s.sinif || 'Belirtilmedi').trim();
            return cName === selectedClass || norm(cName) === norm(selectedClass);
        });
    }

    if (targetStudentsToTransfer.length === 0) {
        alert("Seçilen filtrede aktarılacak öğrenci bulunamadı.");
        return;
    }

    const sourceUser = _adminCachedUsers.find(u => u.uid === sourceUid);
    const targetUser = _adminCachedUsers.find(u => u.uid === targetUid);

    const sourceTitle = sourceUser ? `${sourceUser.adSoyad} (${sourceUser.email})` : 'Kaynak Öğretmen';
    const targetTitle = targetUser ? `${targetUser.adSoyad} (${targetUser.email})` : 'Hedef Öğretmen';
    const classLabel = (selectedClass === 'ALL' || !selectedClass) ? 'Tüm Sınıflar' : selectedClass;

    // Temiz veriye dönüştür: YALNIZCA No, Ad Soyad, Sınıf
    const cleanTransferList = targetStudentsToTransfer.map(s => ({
        no: (s.no !== undefined && s.no !== null) ? (typeof s.no === 'number' ? s.no : parseInt(s.no, 10) || s.no) : '',
        adSoyad: (s.adSoyad || '').trim(),
        sinif: (s.sinif || '').trim(),
        xp: 0,
        xpLogs: []
    }));

    // Onay penceresi
    if (transferMode === 'overwrite') {
        const confirmed = confirm(
            `⚠️ KRİTİK UYARI (ÜZERİNE YAZMA MODU):\n\n` +
            `Hedef Öğretmen: ${targetTitle}\n` +
            `Aktarılacak: ${cleanTransferList.length} Öğrenci (${classLabel})\n\n` +
            `Hedef öğretmenin MEVCUT TÜM ÖĞRENCİ LİSTESİ SİLİNECEK ve yerine yalnızca bu ${cleanTransferList.length} öğrenci kaydedilecektir!\n\n` +
            `Bu işlemi onaylıyor musunuz?`
        );
        if (!confirmed) return;
    } else {
        const confirmed = confirm(
            `ÖĞRENCİ LİSTESİ AKTARIM ONAYI:\n\n` +
            `Kaynak: ${sourceTitle}\n` +
            `Hedef: ${targetTitle}\n` +
            `Sınıf: ${classLabel}\n` +
            `Öğrenci Sayısı: ${cleanTransferList.length}\n` +
            `Strateji: Mevcut Listeye Ekle / Birleştir (Mevcut sınıflar korunur)\n\n` +
            `Öğrenciler kişisel not ve puanlardan arındırılarak (sadece No-Ad-Sınıf) aktarılacaktır. Onaylıyor musunuz?`
        );
        if (!confirmed) return;
    }

    const btn = document.getElementById('btn-execute-admin-transfer');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Aktarılıyor...`;
    }

    try {
        let finalStudentsPayload = {};

        if (transferMode === 'merge') {
            // Hedef öğretmenin mevcut öğrencilerini çek
            const targetSnap = await window.db.ref('app_data/' + targetUid + '/students').once('value');
            if (targetSnap.exists()) {
                const existingVal = targetSnap.val();
                if (Array.isArray(existingVal)) {
                    existingVal.filter(Boolean).forEach((s, idx) => {
                        const rawKey = s.no ? String(s.no) : ('st_' + idx);
                        const safeKey = rawKey.replace(/[\/\.\#\$\/\[\]]/g, '_');
                        finalStudentsPayload[safeKey] = s;
                    });
                } else if (typeof existingVal === 'object' && existingVal !== null) {
                    finalStudentsPayload = { ...existingVal };
                }
            }

            // Yeni temiz öğrencileri merge et
            cleanTransferList.forEach((s, idx) => {
                const rawKey = s.no ? String(s.no) : ('st_' + (idx + Object.keys(finalStudentsPayload).length));
                const safeKey = rawKey.replace(/[\/\.\#\$\/\[\]]/g, '_');
                finalStudentsPayload[safeKey] = s;
            });

        } else {
            // Overwrite: Sadece temiz liste
            cleanTransferList.forEach((s, idx) => {
                const rawKey = s.no ? String(s.no) : ('st_' + idx);
                const safeKey = rawKey.replace(/[\/\.\#\$\/\[\]]/g, '_');
                finalStudentsPayload[safeKey] = s;
            });
        }

        // Firebase'e atomik yaz
        await window.db.ref('app_data/' + targetUid + '/students').set(finalStudentsPayload);

        // Eğer hedef öğretmen o anda oturum açan yönetici ise yerel belleği ve main_data'yı da güncelle
        const currentAuthUser = firebase.auth().currentUser;
        if (currentAuthUser && (currentAuthUser.uid === targetUid || currentAuthUser.email?.toLowerCase().trim() === 'mremzi@gmail.com' && targetUid === currentAuthUser.uid)) {
            window.db.ref('app_data/main_data/students').set(finalStudentsPayload).catch(() => { });
            studentData = Object.values(finalStudentsPayload);
            if (typeof saveData === 'function') saveData();
            if (typeof fullUIRender === 'function') {
                fullUIRender();
            } else if (typeof renderStudentTable === 'function') {
                renderStudentTable();
            }
        }

        alert(
            `🎉 Aktarım Başarılı!\n\n` +
            `${cleanTransferList.length} öğrenci (${classLabel}) başarıyla "${targetTitle}" hesabına aktarıldı.\n` +
            `Aktarılan veriler sıfırlanmış olarak (No, Ad Soyad, Sınıf) kaydedildi.`
        );

        closeAdminStudentTransferModal();

    } catch (err) {
        console.error("Öğrenci aktarım hatası:", err);
        alert("Öğrenci aktarımı sırasında bir hata oluştu:\n" + err.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-check-double"></i> Öğrencileri Güvenle Aktar`;
        }
    }
}

// ── YÖNETİCİ: ÖĞRETMEN HESABINI İNCELEME (IMPERSONATION) ──
function viewTeacherWorkspace(uid, name, email) {
    if (!uid) return;
    window.activeWorkspaceUid = uid;
    window.activeTeacherInfo = { uid, name, email };

    // Banner'ı göster ve güncelle
    const banner = document.getElementById('admin-viewing-banner');
    const teacherNameEl = document.getElementById('admin-viewing-teacher-name');
    if (banner) banner.style.display = 'flex';
    if (teacherNameEl) teacherNameEl.textContent = `${name} (${email})`;

    // Header selector'ı senkronize et
    const select = document.getElementById('admin-teacher-select');
    if (select) select.value = uid;

    // Verileri yükle
    if (typeof loadFromLocalStorage === 'function') {
        loadFromLocalStorage(uid);
    }

    // Tab 1'e geç ve toast göster
    if (typeof openTab === 'function') openTab('tab1');
    if (typeof showGlobalToast === 'function') {
        showGlobalToast(`👁️ <b>${name}</b> öğretmeninin hesabı açıldı. Tüm veriler yüklendi.`, 'success');
    }
}
window.viewTeacherWorkspace = viewTeacherWorkspace;

function exitTeacherWorkspace() {
    window.activeWorkspaceUid = null;
    window.activeTeacherInfo = null;

    // Banner'ı gizle
    const banner = document.getElementById('admin-viewing-banner');
    if (banner) banner.style.display = 'none';

    // Header selector'ı sıfırla
    const select = document.getElementById('admin-teacher-select');
    if (select) select.value = '';

    // Çalışma alanını temizle
    if (typeof clearWorkspaceData === 'function') {
        clearWorkspaceData();
    }
    if (typeof detachListeners === 'function') {
        detachListeners();
    }

    // Yönetici paneli sekmesine dön
    if (typeof openTab === 'function') openTab('tab-admin');
    if (typeof showGlobalToast === 'function') {
        showGlobalToast('👑 Yönetici görünümüne dönüldü.', 'info');
    }
}
window.exitTeacherWorkspace = exitTeacherWorkspace;

function onAdminTeacherSelectChange(val) {
    if (!val) {
        exitTeacherWorkspace();
    } else {
        const users = window._allUsersAdminCache || [];
        const u = users.find(x => x.uid === val);
        const name = u ? (u.adSoyad || u.email) : 'Öğretmen';
        const email = u ? u.email : '';
        viewTeacherWorkspace(val, name, email);
    }
}
window.onAdminTeacherSelectChange = onAdminTeacherSelectChange;

function populateAdminTeacherSelector(users) {
    window._allUsersAdminCache = users || [];
    const select = document.getElementById('admin-teacher-select');
    const box = document.getElementById('admin-teacher-selector-box');
    if (select) {
        const currentVal = select.value;
        select.innerHTML = '<option value="">👑 Yönetici Görünümü (Boş)</option>';
        users.forEach(u => {
            const label = `${u.adSoyad || 'İsimsiz'} (${u.email || '-'})`;
            select.innerHTML += `<option value="${u.uid}">${label}</option>`;
        });
        if (window.activeWorkspaceUid) {
            select.value = window.activeWorkspaceUid;
        } else if (currentVal) {
            select.value = currentVal;
        }
    }
    if (box) {
        box.style.display = 'inline-flex';
    }
}
window.populateAdminTeacherSelector = populateAdminTeacherSelector;

// ── YÖNETİCİ: HESAPLAR ARASI TÜM VERİLERİ AKTARMA (CROSS-TEACHER TRANSFER) ──
async function openAdminDataTransferModal(preselectedSrcUid = '', preselectedTgtUid = '') {
    const modal = document.getElementById('admin-full-data-transfer-modal');
    if (!modal) return;

    modal.style.display = 'flex';

    const srcSelect = document.getElementById('transfer-src-teacher');
    const tgtSelect = document.getElementById('transfer-tgt-teacher');

    if (!srcSelect || !tgtSelect) return;

    srcSelect.innerHTML = '<option value="">-- Kaynak Öğretmen Seçiniz --</option>';
    tgtSelect.innerHTML = '<option value="">-- Hedef Öğretmen Seçiniz --</option>';

    let users = window._allUsersAdminCache;
    if (!users || users.length === 0) {
        try {
            const snap = await window.db.ref('kullanicilar').once('value');
            users = [];
            snap.forEach(c => {
                const val = c.val() || {};
                users.push({ uid: c.key, adSoyad: val.adSoyad || val.email, email: val.email || '', onayli: val.onayli });
            });
            window._allUsersAdminCache = users;
        } catch (e) {
            users = [];
        }
    }

    users.forEach(u => {
        const label = `${u.adSoyad || 'Öğretmen'} (${u.email || ''})`;
        srcSelect.innerHTML += `<option value="${u.uid}">${label}</option>`;
        tgtSelect.innerHTML += `<option value="${u.uid}">${label} ${u.onayli ? '' : '⚠️ (Onaysız)'}</option>`;
    });

    if (preselectedSrcUid) {
        srcSelect.value = preselectedSrcUid;
    } else if (window.activeWorkspaceUid) {
        srcSelect.value = window.activeWorkspaceUid;
    }

    if (preselectedTgtUid) {
        tgtSelect.value = preselectedTgtUid;
    }

    if (srcSelect.value) {
        onTransferSourceChange(srcSelect.value);
    } else {
        resetTransferModuleBadges();
    }
}
window.openAdminDataTransferModal = openAdminDataTransferModal;

function openAdminDataTransferModalWithCurrent() {
    if (window.activeWorkspaceUid) {
        openAdminDataTransferModal(window.activeWorkspaceUid, '');
    } else {
        openAdminDataTransferModal('', '');
    }
}
window.openAdminDataTransferModalWithCurrent = openAdminDataTransferModalWithCurrent;

function closeAdminDataTransferModal() {
    const modal = document.getElementById('admin-full-data-transfer-modal');
    if (modal) modal.style.display = 'none';
}
window.closeAdminDataTransferModal = closeAdminDataTransferModal;

function resetTransferModuleBadges() {
    document.querySelectorAll('.transfer-mod-count').forEach(el => el.textContent = '-');
}

async function onTransferSourceChange(sourceUid) {
    resetTransferModuleBadges();
    if (!sourceUid || !window.db) return;

    try {
        const snap = await window.db.ref('app_data/' + sourceUid).once('value');
        const data = snap.val() || {};

        const getLen = (obj) => {
            if (!obj) return 0;
            if (Array.isArray(obj)) return obj.length;
            if (typeof obj === 'object') return Object.keys(obj).length;
            return 1;
        };

        const setCount = (id, count) => {
            const el = document.getElementById(id);
            if (el) el.textContent = count;
        };

        setCount('tcount-students', getLen(data.students));
        setCount('tcount-exams', getLen(data.exams));
        setCount('tcount-projects', getLen(data.projects || data.projeGruplariData));
        setCount('tcount-adv-groups', getLen(data.advanced_groups || data.advancedGroupData));
        setCount('tcount-groups', getLen(data.regular_groups || data.groups));
        setCount('tcount-schedule', getLen(data.schedule));
        setCount('tcount-tracking', getLen(data.tracking));
        setCount('tcount-checklists', getLen(data.checklists));
        setCount('tcount-kocluk', getLen(data.kocluk));
        setCount('tcount-yks', getLen(data.yks_kocluk || data.yksKocluk));
    } catch (e) {
        console.warn("Kaynak veri sayılamadı:", e);
    }
}
window.onTransferSourceChange = onTransferSourceChange;

function toggleAllTransferModules() {
    const chks = document.querySelectorAll('.transfer-module-checkbox');
    const anyUnchecked = Array.from(chks).some(c => !c.checked);
    chks.forEach(c => c.checked = anyUnchecked);
}
window.toggleAllTransferModules = toggleAllTransferModules;

async function startAdminCrossTransfer() {
    const srcSelect = document.getElementById('transfer-src-teacher');
    const tgtSelect = document.getElementById('transfer-tgt-teacher');
    const srcUid = srcSelect ? srcSelect.value : '';
    const tgtUid = tgtSelect ? tgtSelect.value : '';

    if (!srcUid) {
        alert("Lütfen kaynak öğretmeni seçiniz.");
        return;
    }
    if (!tgtUid) {
        alert("Lütfen hedef öğretmeni seçiniz.");
        return;
    }
    if (srcUid === tgtUid) {
        alert("Kaynak ve hedef öğretmen aynı hesap olamaz.");
        return;
    }

    const srcName = srcSelect.options[srcSelect.selectedIndex].text;
    const tgtName = tgtSelect.options[tgtSelect.selectedIndex].text;

    const selectedKeys = [];
    document.querySelectorAll('.transfer-module-checkbox:checked').forEach(c => {
        selectedKeys.push(c.getAttribute('data-key'));
    });

    if (selectedKeys.length === 0) {
        alert("Lütfen aktarılacak en az bir modül seçiniz.");
        return;
    }

    const mode = document.querySelector('input[name="admin-transfer-mode"]:checked')?.value || 'clone';
    const modeText = (mode === 'clone') ? 'TAM KLONLAMA (Hedef veritabanı eşitlenir)' : 'BİRLEŞTİRME (Mevcutlar korunur)';

    const confirmMsg =
        `🚀 HESAPLAR ARASI VERİ AKTARIMI:\n\n` +
        `Kaynak: ${srcName}\n` +
        `Hedef: ${tgtName}\n` +
        `Yöntem: ${modeText}\n` +
        `Seçili Modül Sayısı: ${selectedKeys.length}\n\n` +
        `Kaynak öğretmenin seçili tüm verileri hedef öğretmenin hesabına kopyalanacaktır. Devam etmek istiyor musunuz?`;

    if (!confirm(confirmMsg)) return;

    const btn = document.getElementById('btn-execute-cross-transfer');
    if (btn) btn.disabled = true;

    try {
        // 1. Kaynak veriyi çek
        const srcSnap = await window.db.ref('app_data/' + srcUid).once('value');
        const srcData = srcSnap.val() || {};

        // 2. Hedef veriyi güvenlik için yedekle
        const tgtSnap = await window.db.ref('app_data/' + tgtUid).once('value');
        const tgtCurrentData = tgtSnap.val();
        if (tgtCurrentData) {
            const bKey = `backup_${Date.now()}`;
            await window.db.ref(`app_data_backups/${tgtUid}/${bKey}`).set(tgtCurrentData);
        }

        // 3. Hedef kullanıcıyı otomatik onayla
        await window.db.ref('kullanicilar/' + tgtUid + '/onayli').set(true);

        // 4. Modülleri kopyala
        for (const modKey of selectedKeys) {
            let val = srcData[modKey];

            // Özel eşleşmeler
            if (modKey === 'advanced_groups' && !val && srcData.advancedGroupData) val = srcData.advancedGroupData;
            if (modKey === 'projects' && !val && srcData.projeGruplariData) val = srcData.projeGruplariData;
            if (modKey === 'yks_kocluk' && !val && srcData.yksKocluk) val = srcData.yksKocluk;

            if (val !== undefined && val !== null) {
                if (mode === 'clone') {
                    await window.db.ref(`app_data/${tgtUid}/${modKey}`).set(val);
                } else {
                    const exSnap = await window.db.ref(`app_data/${tgtUid}/${modKey}`).once('value');
                    const exVal = exSnap.val();
                    if (Array.isArray(val)) {
                        const merged = (Array.isArray(exVal) ? exVal : []).concat(val);
                        await window.db.ref(`app_data/${tgtUid}/${modKey}`).set(merged);
                    } else if (typeof val === 'object') {
                        const merged = Object.assign({}, exVal || {}, val);
                        await window.db.ref(`app_data/${tgtUid}/${modKey}`).set(merged);
                    } else {
                        await window.db.ref(`app_data/${tgtUid}/${modKey}`).set(val);
                    }
                }
            }
        }

        // Zaman damgası
        await window.db.ref(`app_data/${tgtUid}/lastUpdate`).set(new Date().toISOString());
        await window.db.ref(`app_data/${tgtUid}/transferredFromUid`).set(srcUid);

        // Eğer şu anda hedef öğretmen inceleniyorsa yeniden yükle
        if (window.activeWorkspaceUid === tgtUid) {
            await loadFromLocalStorage(tgtUid);
        }

        alert(`🎉 AKTARIM TAMAMLANDI!\n\n${srcName} öğretmeninin verileri başarıyla ${tgtName} hesabına aktarılmıştır.`);
        closeAdminDataTransferModal();
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('✅ Veri aktarımı başarıyla tamamlandı.', 'success');
        }
    } catch (err) {
        alert("Aktarım sırasında hata oluştu: " + err.message);
    } finally {
        if (btn) btn.disabled = false;
    }
}
window.startAdminCrossTransfer = startAdminCrossTransfer;

// auth.js yüklendiğinde kullanıcı yönetici ise veya admin tabı açıksa otomatik yükle
(function initAdminAutoLoad() {
    const checkAndLoad = () => {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            const user = firebase.auth().currentUser;
            if (user && user.email && user.email.toLowerCase().trim() === 'mremzi@gmail.com') {
                loadUsersAdmin();
            }
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndLoad);
    } else {
        setTimeout(checkAndLoad, 300);
    }
})();
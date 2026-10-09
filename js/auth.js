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
            snapshot.forEach(childSnapshot => {
                userCount++;
                const uid = childSnapshot.key;
                const data = childSnapshot.val() || {};

                const tr = document.createElement('tr');
                const tarih = data.kayitTarihi ? new Date(data.kayitTarihi).toLocaleDateString('tr-TR') : '-';
                const isOnayli = (data.onayli === true || data.onayli === 'true');
                const durumBadge = isOnayli
                    ? `<span class="xp-badge" style="background:#10b981; color:white; padding:4px 9px; border-radius:12px; font-size:11px; font-weight:600;">Onaylı</span>`
                    : `<span class="xp-badge" style="background:#ef4444; color:white; padding:4px 9px; border-radius:12px; font-size:11px; font-weight:600;">Onaysız</span>`;

                const safeName = (data.adSoyad || '-').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const safeEmail = (data.email || '-').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const emailParam = (data.email || '').replace(/'/g, "\\'");

                let buttons = '';
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

// Global scope export
window.loadUsersAdmin = loadUsersAdmin;
window.editUserNameAdmin = editUserNameAdmin;
window.approveUser = approveUser;
window.suspendUser = suspendUser;
window.rejectUser = rejectUser;
window.sendPasswordResetAdmin = sendPasswordResetAdmin;

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
// ============================================================
// auth.js
// Firebase Authentication ve Admin Paneli Kullanıcı Yönetimi
// ============================================================

        // ── YÖNETİCİ PANELİ İŞLEMLERİ ──
        function loadUsersAdmin() {
            const adminUsersList = document.getElementById('admin-users-list');
            if (!adminUsersList) return;

            window.db.ref('kullanicilar').off('value'); // Remove old listeners to prevent duplicates
            window.db.ref('kullanicilar').on('value', snapshot => {
                adminUsersList.innerHTML = '';
                if (!snapshot.exists()) return;

                snapshot.forEach(childSnapshot => {
                    const uid = childSnapshot.key;
                    const data = childSnapshot.val();

                    const tr = document.createElement('tr');
                    const tarih = data.kayitTarihi ? new Date(data.kayitTarihi).toLocaleDateString('tr-TR') : '-';
                    const durumBadge = data.onayli
                        ? `<span class="xp-badge" style="background:#10b981; color:white;">Onaylı</span>`
                        : `<span class="xp-badge" style="background:#ef4444; color:white;">Onaysız</span>`;

                    let buttons = '';
                    if (!data.onayli) {
                        buttons += `<button class="btn btn-save" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial;" onclick="approveUser('${uid}')">Onayla</button>`;
                    }
                    buttons += `<button class="btn btn-reset" style="padding: 6px 10px; font-size: 11px; margin-right: 5px; flex: initial; margin-top: 0; width: auto;" onclick="rejectUser('${uid}')">Sil</button>`;
                    buttons += `<button class="btn btn-purple" style="padding: 6px 10px; font-size: 11px; flex: initial;" onclick="sendPasswordResetAdmin('${data.email}')">Şifre Sıfırla</button>`;

                    tr.innerHTML = `
                        <td style="font-weight:600;">${data.adSoyad || '-'}</td>
                        <td>${data.email || '-'}</td>
                        <td>${tarih}</td>
                        <td>${durumBadge}</td>
                        <td style="display: flex;">${buttons}</td>
                    `;
                    adminUsersList.appendChild(tr);
                });
            });
        }

        function approveUser(uid) {
            if (confirm("Bu kullanıcıyı onaylamak istediğinize emin misiniz?")) {
                window.db.ref('kullanicilar/' + uid).update({ onayli: true }).then(() => {
                    alert("Kullanıcı onaylandı.");
                });
            }
        }

        function rejectUser(uid) {
            if (confirm("Bu kullanıcıyı reddetmek (silmek) istediğinize emin misiniz?")) {
                window.db.ref('kullanicilar/' + uid).remove().then(() => {
                    alert("Kullanıcı veritabanından silindi.");
                });
            }
        }

        function sendPasswordResetAdmin(email) {
            if (!email) return alert("E-posta bulunamadı.");
            if (confirm(email + " adresine şifre sıfırlama bağlantısı gönderilsin mi?")) {
                firebase.auth().sendPasswordResetEmail(email).then(() => {
                    alert("Şifre sıfırlama e-postası gönderildi.");
                }).catch(err => {
                    alert("Hata: " + err.message);
                });
            }
        }
// ============================================================
// ui-tracking.js
// Ödev ve görev takip sistemi
// ============================================================

        function addTrackingItem() {
            const type = document.getElementById('track-type').value; const title = document.getElementById('track-title').value; const date = document.getElementById('track-date').value;
            const xp = parseInt(document.getElementById('track-xp').value) || 0; const penaltyXp = parseInt(document.getElementById('track-penalty').value) || 0;
            let classSet = new Set();
            document.querySelectorAll('.track-class-checkbox:checked').forEach(cb => classSet.add(cb.value));
            document.querySelectorAll('.track-student-checkbox:checked').forEach(cb => classSet.add(cb.dataset.class));
            const selectedClasses = Array.from(classSet);

            if (!title || selectedClasses.length === 0 || !date) return alert("Lütfen gerekli alanları doldurun!");

            selectedClasses.forEach(sinif => {
                const selectedStudents = Array.from(document.querySelectorAll(`.track-student-checkbox[data-class="${sinif}"]:checked`)).map(cb => cb.value);
                trackingData.push({ id: Date.now() + Math.random(), type, title, sinif, date, xp, penaltyXp, targetStudents: selectedStudents.length > 0 ? selectedStudents : null, submissions: {}, isNotified: false });
            });
            renderTrackingList(); saveData();
            document.getElementById('track-title').value = ''; document.getElementById('track-date').value = '';
            document.querySelectorAll('.track-class-checkbox, .track-student-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('[id^="student-list-"]').forEach(el => el.style.display = 'none');
        }

        function checkDeadlines() {
            const banner = document.getElementById('deadline-banner');
            const bannerText = document.getElementById('deadline-banner-text');
            if (!banner || !bannerText) return;

            const now = new Date();
            const upcomingTasks = trackingData.filter(item => {
                const dueDate = new Date(item.date);
                const diffTime = dueDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // Teslimine 3 gün veya daha az kalan görevler
                return diffDays >= 0 && diffDays <= 3;
            });

            if (upcomingTasks.length > 0) {
                banner.style.display = 'flex';
                if (upcomingTasks.length === 1) {
                    const diffDays = Math.ceil((new Date(upcomingTasks[0].date) - now) / (1000 * 60 * 60 * 24));
                    const dayText = diffDays === 0 ? 'Bugün' : (diffDays === 1 ? 'Yarın' : `Son ${diffDays} gün`);
                    bannerText.innerHTML = `Yaklaşan Görev: <strong>${upcomingTasks[0].title}</strong> (${upcomingTasks[0].sinif}) için ${dayText}!`;
                } else {
                    bannerText.innerHTML = `Dikkat! Teslim tarihi yaklaşan <strong>${upcomingTasks.length} adet</strong> göreviniz bulunuyor. (Takip Paneli'ni Kontrol Edin)`;
                }
            } else {
                banner.style.display = 'none';
            }
        }

        function renderTrackingList() {
            const list = document.getElementById('tracking-list'); if (!list) return; list.innerHTML = '';
            trackingData.forEach(item => {
                const totalCount = item.targetStudents ? item.targetStudents.length : studentData.filter(s => s.sinif === item.sinif).length;
                const doneCount = item.submissions ? Object.values(item.submissions).filter(s => s.done).length : 0;
                const card = document.createElement('div'); card.className = 'form-box'; card.style = "margin-bottom:15px; border-left: 5px solid var(--secondary);";
                card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;">
                <div><span class="xp-badge">${item.type}</span><h4 style="margin:5px 0;">${item.title} (${item.sinif})</h4><p style="font-size:12px; margin:0; color:var(--text-muted);">Teslim: ${doneCount} / ${totalCount} | Son Tarih: ${new Date(item.date).toLocaleString('tr-TR')}</p></div>
                <div style="display:flex; gap:8px;"><button class="btn" style="padding:5px 12px; font-size:11px;" onclick="openEvaluation('${item.id}')">Değerlendir</button>
                <button class="btn" style="background:#25D366; padding:5px 12px; font-size:11px;" onclick="shareTrackingSummary('${item.id}')"><i class="fab fa-whatsapp"></i> WA Özet</button>
                <button class="btn" style="background:#00B2FF; padding:5px 12px; font-size:11px;" onclick="shareTrackingSummaryBip('${item.id}')"><i class="fas fa-comment-dots"></i> BiP Özet</button>
                <button class="action-btn btn-delete" onclick="deleteTrackingItem('${item.id}')"><i class="fas fa-trash"></i></button></div></div>`;
                list.appendChild(card);
            });
            checkDeadlines();
        }

        function deleteTrackingItem(id) { if (confirm('Bu görevi silmek istiyor musunuz?')) { trackingData = trackingData.filter(i => String(i.id) !== String(id)); renderTrackingList(); saveData(); } }

        function openEvaluation(id) {
            activeTrackingId = id; activeExamId = null;
            const item = trackingData.find(i => String(i.id) === String(id));
            if (!item) return;
            let students = studentData.filter(s => s.sinif === item.sinif); if (item.targetStudents) students = students.filter(s => item.targetStudents.includes(s.adSoyad));

            document.getElementById('eval-title').textContent = `${item.title} - Değerlendirme`;
            document.getElementById('eval-info').textContent = `${item.sinif} Sınıfı Listesi`;
            document.querySelector('#evaluation-modal thead tr').innerHTML = `<th>Öğrenci</th><th>Durum</th><th>Teslim Zamanı</th><th>XP</th><th>Paylaş</th>`;

            const body = document.getElementById('eval-body'); body.innerHTML = '';
            const submissions = item.submissions || {};
            students.forEach(s => {
                const sub = submissions[s.adSoyad] || { done: false, date: '', xp: item.xp, penalty: item.penaltyXp };
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${s.no} - ${s.adSoyad}</td>
                <td><label><input type="checkbox" ${sub.done ? 'checked' : ''} onchange="toggleSubmission('${s.adSoyad}', this.checked)"> Yapıldı</label></td>
                <td><span style="font-size:11px;">${sub.date || '-'}</span></td>
                <td><span style="color:${sub.done ? 'var(--accent)' : 'var(--red)'}; font-weight:700;">${sub.done ? '+' : '-'}${sub.done ? (sub.xp || item.xp) : (sub.penalty || item.penaltyXp)}</span></td>
                <td style="display:flex;gap:4px;align-items:center;">
                    <button class="action-btn" onclick="shareStudentResult(${id}, '${s.adSoyad}')" style="color:#25D366; background:none; font-size:16px;" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    <button class="action-btn" onclick="shareStudentResultBip(${id}, '${s.adSoyad}')" style="color:#00B2FF; background:none; font-size:16px;" title="BiP"><i class="fas fa-comment-dots"></i></button>
                </td>`;
                body.appendChild(tr);
            });
            document.getElementById('evaluation-modal').style.display = 'block';
        }

        function toggleSubmission(name, done) {
            const item = trackingData.find(i => String(i.id) === String(activeTrackingId));
            if (!item.submissions) item.submissions = {};
            if (!item.submissions[name]) item.submissions[name] = { done: false, date: '', xp: item.xp, penalty: item.penaltyXp };

            const sub = item.submissions[name];
            const sIdx = studentData.findIndex(s => s.adSoyad === name);

            if (sIdx !== -1) {
                // 1. ADIM: Eski durumu sıfırla (Geri al)
                if (sub.done) {
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) - (sub.xp || item.xp);
                } else if (sub.date !== '') {
                    // Daha önce yapmadı (ceza yemiştik), cezayı geri ver
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) + (sub.penalty || item.penaltyXp);
                }

                // 2. ADIM: Yeni durumu uygula
                if (done) {
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) + (sub.xp || item.xp);
                } else {
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) - (sub.penalty || item.penaltyXp);
                }
            }

            sub.done = done;
            sub.date = new Date().toLocaleString('tr-TR');

            renderStudentTable();
            renderTrackingList();
            saveData();
            openEvaluation(activeTrackingId);
        }
        function closeEvaluation() { document.getElementById('evaluation-modal').style.display = 'none'; activeTrackingId = null; activeExamId = null; }

        function shareTrackingSummary(id) {
            const item = trackingData.find(i => String(i.id) === String(id)); if (!item) return;
            let students = studentData.filter(s => s.sinif === item.sinif); if (item.targetStudents) students = students.filter(s => item.targetStudents.includes(s.adSoyad));
            const submissions = item.submissions || {};
            const done = students.filter(s => submissions[s.adSoyad]?.done).map(s => s.adSoyad);
            const notDone = students.filter(s => !submissions[s.adSoyad]?.done).map(s => s.adSoyad);
            let text = `📍 *${item.type.toUpperCase()} BİLGİLENDİRMESİ*\n📝 *Konu:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n⏰ *Son Tarih:* ${new Date(item.date).toLocaleString('tr-TR')}\n\n✅ *TAMAMLAYANLAR (${done.length}):*\n🔹 ` + (done.length > 0 ? done.join('\n🔹 ') : 'Henüz yok') + `\n\n❌ *EKSİK OLANLAR (${notDone.length}):*\n🔸 ` + (notDone.length > 0 ? notDone.join('\n🔸 ') : 'Herkes tamamladı!');
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        }
        function shareTrackingSummaryBip(id) {
            const item = trackingData.find(i => String(i.id) === String(id)); if (!item) return;
            let students = studentData.filter(s => s.sinif === item.sinif); if (item.targetStudents) students = students.filter(s => item.targetStudents.includes(s.adSoyad));
            const submissions = item.submissions || {};
            const done = students.filter(s => submissions[s.adSoyad]?.done).map(s => s.adSoyad);
            const notDone = students.filter(s => !submissions[s.adSoyad]?.done).map(s => s.adSoyad);
            let text = `📍 *${item.type.toUpperCase()} BİLGİLENDİRMESİ*\n📝 *Konu:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n⏰ *Son Tarih:* ${new Date(item.date).toLocaleString('tr-TR')}\n\n✅ *TAMAMLAYANLAR (${done.length}):*\n🔹 ` + (done.length > 0 ? done.join('\n🔹 ') : 'Henüz yok') + `\n\n❌ *EKSİK OLANLAR (${notDone.length}):*\n🔸 ` + (notDone.length > 0 ? notDone.join('\n🔸 ') : 'Herkes tamamladı!');
            window.open(`https://web.bip.com/share?text=${encodeURIComponent(text)}`, '_blank');
        }
        function shareStudentResult(id, name) {
            const item = trackingData.find(i => i.id === id); const sub = item.submissions[name] || { done: false };
            let text = `🎯 *${item.type} DEĞERLENDİRME*\n👤 *Öğrenci:* ${name}\n📌 *Çalışma:* ${item.title}\n📊 *Durum:* ${sub.done ? '✅ Tamamlandı (+' + sub.xp + ' XP)' : '❌ Teslim Edilmedi (-' + sub.penaltyXp + ' XP)'}`;
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        }
        function shareStudentResultBip(id, name) {
            const item = trackingData.find(i => i.id === id); const sub = item.submissions[name] || { done: false };
            let text = `🎯 *${item.type} DEĞERLENDİRME*\n👤 *Öğrenci:* ${name}\n📌 *Çalışma:* ${item.title}\n📊 *Durum:* ${sub.done ? '✅ Tamamlandı (+' + sub.xp + ' XP)' : '❌ Teslim Edilmedi (-' + sub.penaltyXp + ' XP)'}`;
            window.open(`https://web.bip.com/share?text=${encodeURIComponent(text)}`, '_blank');
        }

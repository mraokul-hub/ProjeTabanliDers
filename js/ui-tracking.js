// ============================================================
// ui-tracking.js
// Ödev ve görev takip sistemi
// ============================================================

        let _editingTrackingId = null; // Düzenle modu için

        function addTrackingItem() {
            const type = document.getElementById('track-type').value; const title = document.getElementById('track-title').value; const date = document.getElementById('track-date').value;
            const xp = parseInt(document.getElementById('track-xp').value) || 0; const penaltyXp = parseInt(document.getElementById('track-penalty').value) || 0;
            let classSet = new Set();
            document.querySelectorAll('.track-class-checkbox:checked').forEach(cb => classSet.add(cb.value));
            document.querySelectorAll('.track-student-checkbox:checked').forEach(cb => classSet.add(cb.dataset.class));
            const selectedClasses = Array.from(classSet);

            if (!title || selectedClasses.length === 0 || !date) return alert("Lütfen gerekli alanları doldurun!");

            // Düzenle modu: submissions korunarak güncelle
            if (_editingTrackingId !== null) {
                const idx = trackingData.findIndex(i => String(i.id) === String(_editingTrackingId));
                if (idx !== -1) {
                    const existingSubmissions = trackingData[idx].submissions || {};
                    trackingData[idx] = { ...trackingData[idx], type, title, date, xp, penaltyXp, submissions: existingSubmissions };
                    // Sınıf değiştiyse sınıfı da güncelle
                    if (selectedClasses.length === 1) trackingData[idx].sinif = selectedClasses[0];
                    const selectedStudents = Array.from(document.querySelectorAll(`.track-student-checkbox[data-class="${trackingData[idx].sinif}"]:checked`)).map(cb => cb.value);
                    trackingData[idx].targetStudents = selectedStudents.length > 0 ? selectedStudents : null;
                }
                _editingTrackingId = null;
                const btn = document.getElementById('track-add-btn');
                if (btn) btn.innerHTML = '<i class="fas fa-plus"></i> Ekle';
            } else {
                // Yeni kayıt
                selectedClasses.forEach(sinif => {
                    const selectedStudents = Array.from(document.querySelectorAll(`.track-student-checkbox[data-class="${sinif}"]:checked`)).map(cb => cb.value);
                    trackingData.push({ id: Date.now() + Math.random(), type, title, sinif, date, xp, penaltyXp, targetStudents: selectedStudents.length > 0 ? selectedStudents : null, submissions: {}, isNotified: false });
                });
            }

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
            let upcomingTasks = trackingData.filter(item => {
                const dueDate = new Date(item.date);
                const diffTime = dueDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= 7;
            });

            if (upcomingTasks.length > 0) {
                banner.style.display = 'flex';
                banner.style.alignItems = upcomingTasks.length > 1 ? 'flex-start' : 'center';
                
                // Tarihe göre yakından uzağa sırala
                upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                let htmlParts = upcomingTasks.map((task, idx) => {
                    const diffDays = Math.ceil((new Date(task.date) - now) / (1000 * 60 * 60 * 24));
                    const dayText = diffDays === 0 ? 'Bugün' : (diffDays === 1 ? 'Yarın' : `Son ${diffDays} gün`);
                    return `<strong>${idx + 1}.</strong> ${task.title} <span style="opacity:0.9;">(${task.sinif} - ${dayText})</span>`;
                });
                
                let prefix = upcomingTasks.length > 1 ? `<div style="font-weight: 800; margin-bottom: 5px;">Yaklaşan Görevler:</div>` : `<span style="font-weight: 800; margin-right: 5px;">Yaklaşan Görev:</span>`;
                let separator = upcomingTasks.length > 1 ? '<br>' : '';
                
                bannerText.innerHTML = prefix + htmlParts.join(separator);
            } else {
                banner.style.display = 'none';
            }
        }

        function renderTrackingList() {
            const activeList = document.getElementById('tracking-list-active');
            const passiveList = document.getElementById('tracking-list-passive');
            if (!activeList || !passiveList) return;
            activeList.innerHTML = '';
            passiveList.innerHTML = '';

            const now = new Date();
            // Günün sonunu baz al: bugün son tarihse hala aktif
            const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            let passiveCount = 0;

            trackingData.forEach(item => {
                const deadline = new Date(item.date);
                const isPasif = deadline < now && deadline.toDateString() !== now.toDateString();
                // Eğer deadline bugün ile aynı gündeyse aktif say
                const isActiveDay = deadline.toDateString() === now.toDateString();
                const isPassive = !isActiveDay && deadline < now;

                const totalCount = item.targetStudents ? item.targetStudents.length : studentData.filter(s => s.sinif === item.sinif).length;
                const doneCount = item.submissions ? Object.values(item.submissions).filter(s => s.done).length : 0;

                const borderColor = isPassive ? '#6b7280' : 'var(--secondary)';
                const badgeExtra = isPassive ? ' style="background:#6b7280;"' : '';
                const pasifLabel = isPassive ? `<span style="font-size:10px; background:#6b7280; color:white; padding:2px 6px; border-radius:4px; margin-left:6px;">PASİF</span>` : '';

                const card = document.createElement('div');
                card.className = 'form-box';
                card.style = `margin-bottom:15px; border-left: 5px solid ${borderColor}; ${isPassive ? 'opacity:0.75;' : ''}`;
                card.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap;">
                <div><span class="xp-badge"${badgeExtra}>${item.type}</span>${pasifLabel}<h4 style="margin:5px 0;">${item.title} (${item.sinif})</h4><p style="font-size:12px; margin:0; color:var(--text-muted);">Teslim: ${doneCount} / ${totalCount} | Son Tarih: ${new Date(item.date).toLocaleString('tr-TR')}</p></div>
                <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
                ${isPassive ? `<span style="font-size:10px; color:#6b7280; white-space:nowrap;"><i class="fas fa-info-circle"></i> Tarihi değiştirerek aktif edin</span>` : ''}
                <button class="btn" style="padding:5px 12px; font-size:11px;" onclick="openEvaluation('${item.id}')">Değerlendir</button>
                <button class="btn" style="background:#25D366; padding:5px 12px; font-size:11px;" onclick="shareTrackingSummary('${item.id}')"><i class="fab fa-whatsapp"></i> WA Özet</button>
                <button class="btn" style="background:#00B2FF; padding:5px 12px; font-size:11px;" onclick="shareTrackingSummaryBip('${item.id}')"><i class="fas fa-comment-dots"></i> BiP Özet</button>
                <button class="action-btn" style="background:#f59e0b; color:white;" onclick="editTrackingItem('${item.id}')" title="Düzenle"><i class="fas fa-pen"></i></button>
                <button class="action-btn btn-delete" onclick="deleteTrackingItem('${item.id}')"><i class="fas fa-trash"></i></button>
                </div></div>`;

                if (isPassive) {
                    passiveList.appendChild(card);
                    passiveCount++;
                } else {
                    activeList.appendChild(card);
                }
            });

            // Pasif bölüm başlığını güncelle
            const pasifBtn = passiveList.previousElementSibling?.querySelector('button');
            if (pasifBtn) {
                const countBadge = passiveCount > 0 ? ` <span style="background:#6b7280; color:white; font-size:10px; padding:1px 6px; border-radius:10px;">${passiveCount}</span>` : '';
                pasifBtn.innerHTML = `<i class="fas fa-archive"></i> Eski Ödevler (Pasif)${countBadge}<i id="pasif-arrow" class="fas fa-chevron-down" style="margin-left:auto; transition:transform 0.3s; transform:${passiveList.style.display !== 'none' && passiveList.style.display !== '' ? 'rotate(180deg)' : 'none'}"></i>`;
            }

            checkDeadlines();
        }

        function togglePasifOdevler() {
            const list = document.getElementById('tracking-list-passive');
            const arrow = document.getElementById('pasif-arrow');
            if (!list) return;
            const isOpen = list.style.display === 'flex';
            list.style.display = isOpen ? 'none' : 'flex';
            if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }



        function deleteTrackingItem(id) { if (confirm('Bu görevi silmek istiyor musunuz?')) { trackingData = trackingData.filter(i => String(i.id) !== String(id)); renderTrackingList(); saveData(); } }

        function editTrackingItem(id) {
            const item = trackingData.find(i => String(i.id) === String(id));
            if (!item) return;

            // Düzenle moduna geç, kaydı SILME
            _editingTrackingId = id;

            // Formu doldur
            document.getElementById('track-type').value = item.type || 'Ödev';
            document.getElementById('track-title').value = item.title || '';
            document.getElementById('track-xp').value = item.xp || 0;
            document.getElementById('track-penalty').value = item.penaltyXp || 0;

            // Tarihi datetime-local formatına çevir
            if (item.date) {
                try {
                    const d = new Date(item.date);
                    const pad = n => String(n).padStart(2, '0');
                    document.getElementById('track-date').value =
                        `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                } catch(e) {}
            }

            // Sınıf checkbox'larını işaretle
            document.querySelectorAll('.track-class-checkbox').forEach(cb => { cb.checked = cb.value === item.sinif; });

            // Belirli öğrenciler varsa onları da işaretle
            if (item.targetStudents && item.targetStudents.length > 0) {
                const studentList = document.getElementById(`student-list-${item.sinif}`);
                if (studentList) studentList.style.display = 'block';
                document.querySelectorAll(`.track-student-checkbox[data-class="${item.sinif}"]`).forEach(cb => {
                    cb.checked = item.targetStudents.includes(cb.value);
                });
            }

            // Butonu 'Güncelle' olarak değiştir
            const btn = document.getElementById('track-add-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-save"></i> Güncelle';

            // Forma kaydır ve odaklan
            const titleField = document.getElementById('track-title');
            if (titleField) { titleField.scrollIntoView({ behavior: 'smooth', block: 'center' }); titleField.focus(); }
        }

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
                if (!studentData[sIdx].xpLogs) studentData[sIdx].xpLogs = [];
                // 1. ADIM: Eski durumu sıfırla (Geri al)
                if (sub.done) {
                    let oldAmt = sub.xp || item.xp;
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) - oldAmt;
                    studentData[sIdx].xpLogs.push({ reason: `${item.title} (İptal)`, amount: -oldAmt, date: new Date().toISOString() });
                } else if (sub.date !== '') {
                    // Daha önce yapmadı (ceza yemiştik), cezayı geri ver
                    let oldAmt = sub.penalty || item.penaltyXp;
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) + oldAmt;
                    studentData[sIdx].xpLogs.push({ reason: `${item.title} (Ceza İptal)`, amount: oldAmt, date: new Date().toISOString() });
                }

                // 2. ADIM: Yeni durumu uygula
                if (done) {
                    let newAmt = sub.xp || item.xp;
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) + newAmt;
                    studentData[sIdx].xpLogs.push({ reason: `${item.title} (Tamamladı)`, amount: newAmt, date: new Date().toISOString() });
                } else {
                    let newAmt = sub.penalty || item.penaltyXp;
                    studentData[sIdx].xp = (studentData[sIdx].xp || 0) - newAmt;
                    studentData[sIdx].xpLogs.push({ reason: `${item.title} (Eksik)`, amount: -newAmt, date: new Date().toISOString() });
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
            let text = `📍 *${item.type.toUpperCase()} BİLGİLENDİRMESİ*\n📝 *Konu:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n⏰ *Son Tarih:* ${new Date(item.date).toLocaleString('tr-TR')}`;
            if (Object.keys(submissions).length > 0) {
                const done = students.filter(s => submissions[s.adSoyad]?.done).map(s => s.adSoyad);
                const notDone = students.filter(s => !submissions[s.adSoyad]?.done).map(s => s.adSoyad);
                text += `\n\n✅ *TAMAMLAYANLAR (${done.length}):*\n🔹 ` + (done.length > 0 ? done.join('\n🔹 ') : 'Henüz yok') + `\n\n❌ *EKSİK OLANLAR (${notDone.length}):*\n🔸 ` + (notDone.length > 0 ? notDone.join('\n🔸 ') : 'Herkes tamamladı!');
            }
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        }
        function shareTrackingSummaryBip(id) {
            const item = trackingData.find(i => String(i.id) === String(id)); if (!item) return;
            let students = studentData.filter(s => s.sinif === item.sinif); if (item.targetStudents) students = students.filter(s => item.targetStudents.includes(s.adSoyad));
            const submissions = item.submissions || {};
            let text = `📍 *${item.type.toUpperCase()} BİLGİLENDİRMESİ*\n📝 *Konu:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n⏰ *Son Tarih:* ${new Date(item.date).toLocaleString('tr-TR')}`;
            if (Object.keys(submissions).length > 0) {
                const done = students.filter(s => submissions[s.adSoyad]?.done).map(s => s.adSoyad);
                const notDone = students.filter(s => !submissions[s.adSoyad]?.done).map(s => s.adSoyad);
                text += `\n\n✅ *TAMAMLAYANLAR (${done.length}):*\n🔹 ` + (done.length > 0 ? done.join('\n🔹 ') : 'Henüz yok') + `\n\n❌ *EKSİK OLANLAR (${notDone.length}):*\n🔸 ` + (notDone.length > 0 ? notDone.join('\n🔸 ') : 'Herkes tamamladı!');
            }
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

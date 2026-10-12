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
                    const newId = 'trk_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
                    trackingData.push({ id: newId, type, title, sinif, date, xp, penaltyXp, targetStudents: selectedStudents.length > 0 ? selectedStudents : null, submissions: {}, isNotified: false });
                });
            }

            renderTrackingList();
            if (typeof saveData === 'function') saveData(true);
            document.getElementById('track-title').value = ''; document.getElementById('track-date').value = '';
            document.querySelectorAll('.track-class-checkbox, .track-student-checkbox').forEach(cb => cb.checked = false);
            document.querySelectorAll('[id^="student-list-"]').forEach(el => el.style.display = 'none');
        }

        function toggleDeadlineDropdown(event) {
            if (event && event.target && event.target.closest('.deadline-close-btn')) return;
            const body = document.getElementById('deadline-dropdown-body');
            const chevron = document.getElementById('deadline-chevron');
            if (!body) return;
            
            const isVisible = window.getComputedStyle(body).display !== 'none';
            if (isVisible) {
                body.style.display = 'none';
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            } else {
                body.style.display = 'block';
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            }
        }

        function closeDeadlineBanner(event) {
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }
            const banner = document.getElementById('deadline-banner');
            if (banner) banner.style.display = 'none';
        }

        window.toggleDeadlineDropdown = toggleDeadlineDropdown;
        window.closeDeadlineBanner = closeDeadlineBanner;

        function checkDeadlines() {
            const banner = document.getElementById('deadline-banner');
            const bannerText = document.getElementById('deadline-banner-text');
            const countBadge = document.getElementById('deadline-badge');
            if (!banner || !bannerText) return;

            const now = new Date();
            let upcomingTasks = trackingData.filter(item => {
                const dueDate = new Date(item.date);
                const diffTime = dueDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays >= 0 && diffDays <= 7;
            });

            if (upcomingTasks.length > 0) {
                banner.style.display = 'block';
                if (countBadge) {
                    countBadge.textContent = upcomingTasks.length;
                }
                
                // Tarihe göre yakından uzağa sırala
                upcomingTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                let htmlParts = upcomingTasks.map((task, idx) => {
                    const diffDays = Math.ceil((new Date(task.date) - now) / (1000 * 60 * 60 * 24));
                    let dayText = `Son ${diffDays} gün`;
                    let badgeClass = 'deadline-tag-days';
                    if (diffDays === 0) {
                        dayText = 'Bugün';
                        badgeClass = 'deadline-tag-today';
                    } else if (diffDays === 1) {
                        dayText = 'Yarın';
                        badgeClass = 'deadline-tag-tomorrow';
                    }

                    const safeTitle = typeof escapeHTML === 'function' ? escapeHTML(task.title) : task.title;
                    const safeSinif = typeof escapeHTML === 'function' ? escapeHTML(task.sinif || '') : (task.sinif || '');

                    return `
                    <div class="deadline-task-row">
                        <div class="deadline-task-main">
                            <span class="deadline-task-idx">${idx + 1}</span>
                            <span class="deadline-task-desc">${safeTitle}</span>
                        </div>
                        <div class="deadline-task-meta">
                            <span class="deadline-class-pill">${safeSinif}</span>
                            <span class="deadline-time-pill ${badgeClass}">${dayText}</span>
                        </div>
                    </div>`;
                });
                
                bannerText.innerHTML = htmlParts.join('');
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
                const isActiveDay = deadline.toDateString() === now.toDateString();
                const isPassive = item.isEvaluated || (!isActiveDay && deadline < now);

                const totalCount = item.targetStudents ? item.targetStudents.length : studentData.filter(s => s.sinif === item.sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(item.sinif))).length;
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



        function deleteTrackingItem(id) {
            if (confirm('Bu görevi silmek istiyor musunuz?')) {
                trackingData = trackingData.filter(i => String(i.id) !== String(id));
                renderTrackingList();
                if (typeof saveData === 'function') saveData(true);
            }
        }

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

        let evalSortMode = localStorage.getItem('eval_sort_mode') || 'no'; // 'no' veya 'name'
        let evalSortAsc = localStorage.getItem('eval_sort_asc') !== 'false'; // true veya false

        function setEvalSort(mode) {
            if (evalSortMode === mode) {
                evalSortAsc = !evalSortAsc;
            } else {
                evalSortMode = mode;
                evalSortAsc = true;
            }
            localStorage.setItem('eval_sort_mode', evalSortMode);
            localStorage.setItem('eval_sort_asc', evalSortAsc);
            if (activeTrackingId) {
                openEvaluation(activeTrackingId);
            }
        }
        window.setEvalSort = setEvalSort;

        function toggleEvalSortHeader() {
            if (evalSortMode === 'no') {
                if (evalSortAsc) {
                    evalSortAsc = false;
                } else {
                    evalSortMode = 'name';
                    evalSortAsc = true;
                }
            } else {
                if (evalSortAsc) {
                    evalSortAsc = false;
                } else {
                    evalSortMode = 'no';
                    evalSortAsc = true;
                }
            }
            localStorage.setItem('eval_sort_mode', evalSortMode);
            localStorage.setItem('eval_sort_asc', evalSortAsc);
            if (activeTrackingId) {
                openEvaluation(activeTrackingId);
            }
        }
        window.toggleEvalSortHeader = toggleEvalSortHeader;

        function openEvaluation(id) {
            activeTrackingId = id; activeExamId = null;
            const item = trackingData.find(i => String(i.id) === String(id));
            if (!item) return;
            let students = studentData.filter(s => s.sinif === item.sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(item.sinif)));
            if (item.targetStudents) students = students.filter(s => item.targetStudents.includes(s.adSoyad));

            // Öğrencileri ada veya numaraya göre sırala
            students.sort((a, b) => {
                if (evalSortMode === 'name') {
                    const nameA = String(a.adSoyad || '').trim();
                    const nameB = String(b.adSoyad || '').trim();
                    const res = nameA.localeCompare(nameB, 'tr-TR', { sensitivity: 'base' });
                    return evalSortAsc ? res : -res;
                } else {
                    // Numaraya göre sırala
                    const valA = parseInt(a.no, 10);
                    const valB = parseInt(b.no, 10);
                    if (!isNaN(valA) && !isNaN(valB)) {
                        const diff = valA - valB;
                        if (diff !== 0) return evalSortAsc ? diff : -diff;
                    } else if (!isNaN(valA)) {
                        return evalSortAsc ? -1 : 1;
                    } else if (!isNaN(valB)) {
                        return evalSortAsc ? 1 : -1;
                    } else {
                        const strDiff = String(a.no || '').localeCompare(String(b.no || ''), undefined, { numeric: true });
                        if (strDiff !== 0) return evalSortAsc ? strDiff : -strDiff;
                    }
                    return (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
                }
            });

            document.getElementById('eval-title').textContent = `${item.title} - Değerlendirme`;

            const infoEl = document.getElementById('eval-info');
            if (infoEl) {
                infoEl.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin:4px 0 10px 0;">
                    <div style="font-size:13px; font-weight:600; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-users" style="color:var(--secondary);"></i>
                        <span>${item.sinif} Sınıfı Listesi</span>
                        <span style="font-size:11px; opacity:0.8; font-weight:normal;">(${students.length} Öğrenci)</span>
                    </div>
                    <div style="display:inline-flex; align-items:center; gap:5px; background:var(--input-bg, rgba(0,0,0,0.03)); padding:4px 8px; border-radius:8px; border:1px solid var(--border, #cbd5e1);">
                        <span style="font-size:11px; font-weight:700; color:var(--text-muted); margin-right:4px;"><i class="fas fa-sort"></i> SIRALA:</span>
                        <button type="button" class="btn" onclick="setEvalSort('no')" style="padding:4px 10px; font-size:11.5px; border-radius:6px; cursor:pointer; transition:all 0.2s; ${evalSortMode === 'no' ? 'background:var(--secondary); color:#fff; font-weight:700; box-shadow:0 2px 4px rgba(59,130,246,0.3);' : 'background:transparent; color:var(--text-main); border:1px solid var(--border);'}">
                            <i class="fas ${evalSortMode === 'no' ? (evalSortAsc ? 'fa-sort-numeric-down' : 'fa-sort-numeric-up') : 'fa-sort-numeric-down'}"></i> Numaraya Göre ${evalSortMode === 'no' ? (evalSortAsc ? '(1→9)' : '(9→1)') : ''}
                        </button>
                        <button type="button" class="btn" onclick="setEvalSort('name')" style="padding:4px 10px; font-size:11.5px; border-radius:6px; cursor:pointer; transition:all 0.2s; ${evalSortMode === 'name' ? 'background:var(--secondary); color:#fff; font-weight:700; box-shadow:0 2px 4px rgba(59,130,246,0.3);' : 'background:transparent; color:var(--text-main); border:1px solid var(--border);'}">
                            <i class="fas ${evalSortMode === 'name' ? (evalSortAsc ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up') : 'fa-sort-alpha-down'}"></i> Ada Göre ${evalSortMode === 'name' ? (evalSortAsc ? '(A→Z)' : '(Z→A)') : ''}
                        </button>
                    </div>
                </div>`;
            }

            const sortBadge = `
                <span style="display:inline-flex; align-items:center; gap:4px; font-size:11px; padding:2px 7px; border-radius:6px; margin-left:8px; vertical-align:middle; background:${evalSortMode === 'name' ? 'rgba(59,130,246,0.18)' : 'rgba(16,185,129,0.18)'}; color:${evalSortMode === 'name' ? 'var(--secondary, #2563eb)' : 'var(--accent, #059669)'}; font-weight:700;">
                    <i class="fas ${evalSortMode === 'name' ? (evalSortAsc ? 'fa-sort-alpha-down' : 'fa-sort-alpha-up') : (evalSortAsc ? 'fa-sort-numeric-down' : 'fa-sort-numeric-up')}"></i>
                    ${evalSortMode === 'name' ? (evalSortAsc ? 'Ad (A→Z)' : 'Ad (Z→A)') : (evalSortAsc ? 'No (1→9)' : 'No (9→1)')}
                </span>
            `;

            document.querySelector('#evaluation-modal thead tr').innerHTML = `
                <th onclick="toggleEvalSortHeader()" style="cursor:pointer; user-select:none; transition:background 0.2s;" title="Numaraya veya ada göre sıralamak için tıklayın">
                    <span style="display:inline-flex; align-items:center;">
                        ÖĞRENCİ ${sortBadge}
                        <i class="fas fa-sort" style="margin-left:6px; opacity:0.4; font-size:11px;"></i>
                    </span>
                </th>
                <th>DURUM</th>
                <th>GELMEDİ</th>
                <th>TESLİM ZAMANI</th>
                <th>XP</th>
                <th>PAYLAŞ</th>
            `;

            const body = document.getElementById('eval-body'); body.innerHTML = '';
            const submissions = item.submissions || {};
            students.forEach(s => {
                const sub = submissions[s.adSoyad] || { done: false, absent: false, date: '', xp: item.xp, penalty: item.penaltyXp };
                
                let xpText = '';
                if (sub.absent) {
                    xpText = '<span style="color:#6b7280; font-weight:700;">Muaf (0)</span>';
                } else {
                    xpText = `<span style="color:${sub.done ? 'var(--accent)' : 'var(--red)'}; font-weight:700;">${sub.done ? '+' : '-'}${sub.done ? (sub.xp || item.xp) : (sub.penalty || item.penaltyXp)}</span>`;
                }

                const safeAdSoyad = s.adSoyad.replace(/'/g, "\\'");
                const safeItemId = String(id).replace(/'/g, "\\'");
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${s.no ? s.no + ' - ' : ''}${s.adSoyad}</td>
                <td><label><input type="checkbox" ${sub.done ? 'checked' : ''} ${sub.absent ? 'disabled' : ''} onchange="updateSubmissionStatus('${safeAdSoyad}', 'done', this.checked)"> Yapıldı</label></td>
                <td><label><input type="checkbox" ${sub.absent ? 'checked' : ''} onchange="updateSubmissionStatus('${safeAdSoyad}', 'absent', this.checked)"> Gelmedi</label></td>
                <td><span style="font-size:11px;">${sub.date || '-'}</span></td>
                <td>${xpText}</td>
                <td style="display:flex;gap:4px;align-items:center;">
                    <button class="action-btn" onclick="shareStudentResult('${safeItemId}', '${safeAdSoyad}')" style="color:#25D366; background:none; font-size:16px;" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                    <button class="action-btn" onclick="shareStudentResultBip('${safeItemId}', '${safeAdSoyad}')" style="color:#00B2FF; background:none; font-size:16px;" title="BiP"><i class="fas fa-comment-dots"></i></button>
                </td>`;
                body.appendChild(tr);
            });
            document.getElementById('evaluation-modal').style.display = 'block';
        }

        window.updateSubmissionStatus = function(name, field, value) {
            const item = trackingData.find(i => String(i.id) === String(activeTrackingId));
            if (!item.submissions) item.submissions = {};
            if (!item.submissions[name]) item.submissions[name] = { done: false, absent: false, date: '', xp: item.xp, penalty: item.penaltyXp };

            const sub = item.submissions[name];
            const sIdx = studentData.findIndex(s => s.adSoyad === name);

            if (sIdx !== -1) {
                if (!studentData[sIdx].xpLogs) studentData[sIdx].xpLogs = [];
                // Revert old state
                if (!sub.absent) {
                    if (sub.done) {
                        let oldAmt = sub.xp !== undefined ? sub.xp : item.xp;
                        studentData[sIdx].xp = (studentData[sIdx].xp || 0) - oldAmt;
                        studentData[sIdx].xpLogs.push({ reason: `${item.title} (İptal)`, amount: -oldAmt, date: new Date().toISOString() });
                    } else if (sub.date !== '') {
                        let oldAmt = sub.penalty !== undefined ? sub.penalty : item.penaltyXp;
                        studentData[sIdx].xp = (studentData[sIdx].xp || 0) + oldAmt;
                        studentData[sIdx].xpLogs.push({ reason: `${item.title} (Ceza İptal)`, amount: oldAmt, date: new Date().toISOString() });
                    }
                }
            }

            sub[field] = value;
            if (field === 'absent' && value === true) {
                sub.done = false; // Cannot be done if absent
            }

            if (sIdx !== -1) {
                // Apply new state
                if (!sub.absent) {
                    if (sub.done) {
                        let newAmt = sub.xp !== undefined ? sub.xp : item.xp;
                        studentData[sIdx].xp = (studentData[sIdx].xp || 0) + newAmt;
                        studentData[sIdx].xpLogs.push({ reason: `${item.title} (Tamamladı)`, amount: newAmt, date: new Date().toISOString() });
                    } else {
                        let newAmt = sub.penalty !== undefined ? sub.penalty : item.penaltyXp;
                        studentData[sIdx].xp = (studentData[sIdx].xp || 0) - newAmt;
                        studentData[sIdx].xpLogs.push({ reason: `${item.title} (Eksik)`, amount: -newAmt, date: new Date().toISOString() });
                    }
                }
            }

            sub.date = new Date().toLocaleString('tr-TR');

            renderStudentTable();
            renderTrackingList();
            saveData();
            openEvaluation(activeTrackingId);
        }

        window.finishEvaluation = function() {
            if (!activeTrackingId) return;
            if (!confirm('Bu değerlendirmeyi bitirmek ve ödevi pasife almak istediğinize emin misiniz?')) return;
            const item = trackingData.find(i => String(i.id) === String(activeTrackingId));
            if (item) {
                item.isEvaluated = true;
                renderTrackingList();
                if (typeof saveData === 'function') saveData(true);
                closeEvaluation();
            }
        }
        function closeEvaluation() {
            document.getElementById('evaluation-modal').style.display = 'none';
            activeTrackingId = null;
            activeExamId = null;
            if (typeof saveData === 'function') saveData(true);
        }

        function buildTrackingSummaryText(id) {
            const item = trackingData.find(i => String(i.id) === String(id)); if (!item) return '';
            const normSinif = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
            let students = studentData.filter(s => s.sinif === item.sinif || normSinif(s.sinif) === normSinif(item.sinif));
            if (item.targetStudents && item.targetStudents.length > 0) {
                students = students.filter(s => item.targetStudents.includes(s.adSoyad));
            }
            students.sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));

            const submissions = item.submissions || {};
            let text = `📍 *${item.type.toUpperCase()} BİLGİLENDİRMESİ*\n📝 *Konu:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n⏰ *Son Tarih:* ${new Date(item.date).toLocaleString('tr-TR')}`;
            if (item.xp) text += `\n⭐ *Puan:* +${item.xp} XP` + (item.penaltyXp ? ` (Eksik: -${item.penaltyXp} XP)` : '');

            // Ödeve not / değerlendirme verilmediyse (submissions boş ise) yapanlar ve yapmayanlar mesajda görünmez
            const hasEvaluations = Object.keys(submissions).length > 0;
            if (hasEvaluations && students.length > 0) {
                const done = students.filter(s => submissions[s.adSoyad]?.done).map(s => (s.no ? s.no + ' - ' : '') + s.adSoyad);
                const notDone = students.filter(s => !submissions[s.adSoyad]?.done).map(s => (s.no ? s.no + ' - ' : '') + s.adSoyad);
                text += `\n\n✅ *TAMAMLAYANLAR (${done.length} / ${students.length}):*\n` + (done.length > 0 ? '🔹 ' + done.join('\n🔹 ') : 'Henüz teslim eden yok');
                text += `\n\n❌ *EKSİK OLANLAR (${notDone.length} / ${students.length}):*\n` + (notDone.length > 0 ? '🔸 ' + notDone.join('\n🔸 ') : 'Herkes tamamladı! 🎉');
            }
            return text;
        }

        function shareTrackingSummary(id) {
            const text = buildTrackingSummaryText(id);
            if (!text) return;
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        }

        function shareTrackingSummaryBip(id) {
            const item = trackingData.find(i => String(i.id) === String(id));
            const text = buildTrackingSummaryText(id);
            if (!text) return;
            if (typeof window.shareViaBip === 'function') {
                window.shareViaBip(text, `${item?.sinif || ''} - ${item?.title || ''} Özeti`);
            } else {
                window.copyTextToClipboard ? window.copyTextToClipboard(text) : null;
                window.open(`https://web.bip.com/`, '_blank');
            }
        }

        function buildStudentResultText(id, name) {
            const item = trackingData.find(i => String(i.id) === String(id)); if (!item) return '';
            const sub = (item.submissions && item.submissions[name]) ? item.submissions[name] : { done: false };
            return `🎯 *${item.type.toUpperCase()} DEĞERLENDİRME*\n👤 *Öğrenci:* ${name}\n📌 *Çalışma:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n📊 *Durum:* ${sub.done ? '✅ Tamamlandı (+' + (sub.xp || item.xp) + ' XP)' : '❌ Teslim Edilmedi (-' + (sub.penalty || item.penaltyXp) + ' XP)'}`;
        }

        function shareStudentResult(id, name) {
            const text = buildStudentResultText(id, name);
            if (!text) return;
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        }

        function shareStudentResultBip(id, name) {
            const item = trackingData.find(i => String(i.id) === String(id));
            const text = buildStudentResultText(id, name);
            if (!text) return;
            if (typeof window.shareViaBip === 'function') {
                window.shareViaBip(text, `${name} - ${item?.title || ''}`);
            } else {
                window.copyTextToClipboard ? window.copyTextToClipboard(text) : null;
                window.open(`https://web.bip.com/`, '_blank');
            }
        }

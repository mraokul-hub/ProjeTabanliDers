// ============================================================
// ui-schedule.js
// Ders programı yönetimi
// ============================================================

        function renderSchedule() {
            const body = document.getElementById('schedule-body'); if (!body) return; body.innerHTML = '';
            const times = [...new Set(scheduleData.map(s => s.time))].sort(); const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

            // Renk paleti ve derse göre renk eşleştirme
            const uniqueLessons = [...new Set(scheduleData.map(s => s.lesson.trim()))];
            const colorPalette = [
                '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444',
                '#06b6d4', '#d946ef', '#f97316', '#14b8a6', '#6366f1',
                '#ec4899', '#84cc16', '#0ea5e9', '#f43f5e', '#a855f7'
            ];
            const colorMap = {};
            uniqueLessons.forEach((lesson, index) => {
                colorMap[lesson] = colorPalette[index % colorPalette.length];
            });

            times.forEach(time => {
                const tr = document.createElement('tr'); tr.innerHTML = `<td style="font-weight:700; color:var(--secondary);">${time}</td>`;
                days.forEach(day => {
                    const td = document.createElement('td');
                    const entries = scheduleData
                        .map((s, idx) => ({ ...s, _idx: idx }))
                        .filter(s => s.day === day && s.time === time);
                    entries.forEach(e => {
                        const div = document.createElement('div');
                        const bgColor = colorMap[e.lesson.trim()] || 'var(--secondary)';
                        div.style.cssText = `background:${bgColor}; color:white; padding:5px 8px; border-radius:8px; margin-bottom:5px; font-size:12px; display:flex; justify-content:space-between; align-items:center;`;
                        div.innerHTML = `<span>${e.lesson}</span>`;
                        const btn = document.createElement('button');
                        btn.style.cssText = 'background:none; border:none; color:white; cursor:pointer;';
                        btn.innerHTML = '<i class="fas fa-times"></i>';
                        btn.addEventListener('click', () => removeFromSchedule(e._idx));
                        div.appendChild(btn);
                        td.appendChild(div);
                    });
                    tr.appendChild(td);
                });
                body.appendChild(tr);
            });
            if (times.length === 0) body.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);">Henüz ders eklenmemiş.</td></tr>';
        }

        function removeFromSchedule(idx) { if (confirm('Dersi silmek istediğinize emin misiniz?')) { scheduleData.splice(idx, 1); renderSchedule(); saveData(); } }
        function loadScheduleExcel() {
            const fileInput = document.getElementById('schedule-excel-file'); const file = fileInput.files[0]; if (!file) return alert("Dosya seçiniz!");
            const reader = new FileReader(); reader.onload = function (e) {
                const data = new Uint8Array(e.target.result); const workbook = XLSX.read(data, { type: 'array' });
                const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                if (rows.length === 0) return alert("Excel boş!");
                if (confirm("Mevcut program silinerek aktarılacak?")) {
                    scheduleData = [];
                    rows.forEach(row => {
                        const day = row.Gün || row.Gun || ""; let time = row.Saat || ""; const lesson = row.Ders || row.Sınıf || row.Sinif || "";
                        // Excel ondalık zaman değerini HH:MM formatına çevir (örn: 0.38194 → 09:10)
                        if (typeof time === 'number') {
                            const totalMinutes = Math.round(time * 24 * 60);
                            const hh = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
                            const mm = String(totalMinutes % 60).padStart(2, '0');
                            time = hh + ':' + mm;
                        }
                        if (day && time && lesson) { const valid = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]; const clean = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(); if (valid.includes(clean)) scheduleData.push({ day: clean, time, lesson }); }
                    });
                    scheduleData.sort((a, b) => a.time.localeCompare(b.time)); renderSchedule(); saveData(); alert("Program yüklendi."); fileInput.value = '';
                }
            }; reader.readAsArrayBuffer(file);
        }
        function downloadScheduleTemplate() {
            const template = [{ "Gün": "Pazartesi", "Saat": "09:00", "Ders": "10-A Robotik" }, { "Gün": "Salı", "Saat": "10:30", "Ders": "11-B Kodlama" }];
            const ws = XLSX.utils.json_to_sheet(template); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Program"); XLSX.writeFile(wb, "Ders_Programi_Taslak.xlsx");
        }

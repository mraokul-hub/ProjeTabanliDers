// ============================================================
// ui-controller.js
// Tab yönetimi ve öğrenci tablosu render
// ============================================================

        // Tab adı - seçilen modülün adını bar'da göstermek için
        const TAB_LABELS = {
            'tab1':           '🏹 Öğrenci Bilgi Sistemi',
            'tab2':           '⛺ Sınıf Yönetimi',
            'tab-buz-kirma':  '🔥 Buz Kırma Etkinlikleri',
            'tab3':           '⚔️ Ders İşleme & Strateji',
            'tab4':           '🐎 Öğretmen Ders Programı',
            'tab5':           '📜 Ödev & Proje Takip',
            'tab6':           '🦅 Sınav Analiz',
            'tab7':           '🛡️ Öz Değerlendirme & Formlar',
            'tab8':           '🌙 İleri Çalışma Grupları',
            'tab9':           '🌳 Proje Grupları',
            'tab10':          '🧭 Sistem Kullanım Kılavuzu',
            'tab-admin':      '👑 Yönetici Paneli'
        };

        // Toplam normal (admin háriç) modül sayısı
        const TAB_NUMBERS = {
            'tab1':1,'tab2':2,'tab-buz-kirma':3,'tab3':4,'tab4':5,
            'tab5':6,'tab6':7,'tab7':8,'tab8':9,'tab9':10,'tab10':11,'tab-admin':''
        };

        function openTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            const targetTab = document.getElementById(tabId);
            if (targetTab) targetTab.classList.add('active');

            let foundBtn = null;
            if (window.event && window.event.target && window.event.target.classList.contains('tab-btn')) {
                foundBtn = window.event.target;
            } else {
                const buttons = document.querySelectorAll('.tab-btn');
                buttons.forEach(btn => {
                    const onc = btn.getAttribute('onclick');
                    if (onc && onc.includes(`'${tabId}'`)) {
                        foundBtn = btn;
                    }
                });
            }
            if (foundBtn) foundBtn.classList.add('active');

            // ─ Mobil: overlay'i kapat, aktif etiketi güncelle
            closeMobileMenu();
            const label = TAB_LABELS[tabId] || tabId;
            const num   = TAB_NUMBERS[tabId] || '';
            const labelEl = document.getElementById('mobile-active-tab-label');
            if (labelEl) labelEl.textContent = label;
            const numEl = document.querySelector('.mobile-nav-bar > div:last-child');
            if (numEl && num) numEl.textContent = num + '/11';
            if (numEl && !num) numEl.textContent = '★';

            // Mobil panel: aktif butonu vurgula
            document.querySelectorAll('.mobile-tab-btn').forEach(b => b.classList.remove('active'));
            const mobBtn = document.getElementById('mob-btn-' + tabId);
            if (mobBtn) mobBtn.classList.add('active');

            if (tabId === 'tab9') {
                pgLoad();
                pgRenderList();
            }

            if (tabId === 'tab-admin') {
                if (typeof loadUsersAdmin === 'function') loadUsersAdmin();
            }
        }

        // ── Hamburger Menü Fonksiyonları ──
        function toggleMobileMenu() {
            const overlay = document.getElementById('mobile-menu-overlay');
            if (!overlay) return;
            overlay.classList.toggle('open');
            document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            const overlay = document.getElementById('mobile-menu-overlay');
            if (overlay) {
                overlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        function closeMobileMenuOnOverlay(event) {
            // Sadece arka plana tıklanınca kapansın (panel içine değil)
            if (event.target === document.getElementById('mobile-menu-overlay')) {
                closeMobileMenu();
            }
        }

        // DİĞER STANDART İŞLEVLER (Tablo Render, Filtreleme, vb. KORUNDU)
        function renderStudentTable(dataToRender = null) {
            if (!dataToRender) {
                searchStudents();
                return;
            }
            // Eski menüleri (body'ye taşınmış olanları) temizle
            document.querySelectorAll('body > .xp-popup-panel').forEach(p => p.remove());

            const tbody = document.getElementById('student-table-body'); tbody.innerHTML = '';
            dataToRender.forEach((student) => {
                const realIndex = studentData.indexOf(student);

                // VAK İkonu Belirleme
                let vakIcon = '';
                if (student.vak === 'Görsel') vakIcon = '<i class="fas fa-eye" title="Görsel Öğrenen" style="color: #3b82f6; margin-left: 8px;"></i>';
                else if (student.vak === 'İşitsel') vakIcon = '<i class="fas fa-headphones" title="İşitsel Öğrenen" style="color: #8b5cf6; margin-left: 8px;"></i>';
                else if (student.vak === 'Kinestetik') vakIcon = '<i class="fas fa-hand-paper" title="Kinestetik Öğrenen" style="color: #f59e0b; margin-left: 8px;"></i>';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td><input type="checkbox" class="row-checkbox" data-index="${realIndex}"></td>
                <td>${student.sira || '-'}</td>
                <td>${student.no || '-'}</td>
                <td><span style="font-weight: 600;">${student.adSoyad || '-'}</span>${vakIcon}</td>
                <td>${student.sinif || '-'}</td>
                <td title="Geçmişi Görmek İçin Tıklayın" style="cursor:pointer;" onclick="showXPLogs(${realIndex})"><span class="xp-badge">${student.xp || 0}</span></td>
                <td><span style="font-weight:bold; color:var(--red);">${student.artmayanNot ? '-' + student.artmayanNot : '0'}</span></td>
                <td style="white-space: nowrap;">
                    <div style="display:inline-flex; gap: 5px; align-items:center;">
                        <!-- XP Popup Trigger -->
                        <div class="xp-popup-wrapper">
                            <button type="button" class="btn-xp-trigger" onclick="toggleXPPopup(this, event)" title="XP Puan Ver">Xp</button>
                            <div class="xp-popup-panel">
                                <div class="xp-popup-label">⬆️ Artır</div>
                                <div class="xp-popup-row" style="flex-wrap: wrap;">
                                    <button class="btn-xp" style="background:#10b981;" onclick="addXP(${realIndex}, 2, 'Teşvik / Gelişime Açık'); closeXPPopup(this)" title="Teşvik / Gelişime Açık (+2 XP)"><i class="fas fa-seedling"></i> +2</button>
                                    <button class="btn-xp" style="background:#059669;" onclick="addXP(${realIndex}, 5, 'Sorumlu / Beklenen Katılım'); closeXPPopup(this)" title="Sorumlu / Beklenen Katılım (+5 XP)"><i class="fas fa-check"></i> +5</button>
                                    <button class="btn-xp" style="background:#3b82f6;" onclick="addXP(${realIndex}, 10, 'Üstün Katılım / Orijinal Fikir'); closeXPPopup(this)" title="Üstün Katılım / Orijinal Fikir (+10 XP)"><i class="fas fa-lightbulb"></i> +10</button>
                                    <button class="btn-xp" style="background:#8b5cf6;" onclick="addXP(${realIndex}, 10, 'Uyumlu Takım Oyuncusu'); closeXPPopup(this)" title="Uyumlu Takım Oyuncusu (+10 XP)"><i class="fas fa-users"></i> +10</button>
                                    <button class="btn-xp" style="background:#f59e0b;" onclick="addXP(${realIndex}, 15, 'Doğal Lider / Mentor'); closeXPPopup(this)" title="Doğal Lider / Mentor (+15 XP)"><i class="fas fa-crown"></i> +15</button>
                                    <button class="btn-xp" style="background:#eab308;" onclick="addXP(${realIndex}, 20, 'Sınırları Zorlayan (Azimli)'); closeXPPopup(this)" title="Sınırları Zorlayan / Azimli (+20 XP)"><i class="fas fa-mountain"></i> +20</button>
                                </div>
                                <div class="xp-popup-label">⬇️ Düşür</div>
                                <div class="xp-popup-row">
                                    <button class="btn-xp" style="background:#ef4444;" onclick="addXP(${realIndex}, -5, 'Hazırlıksız Gelme'); closeXPPopup(this)" title="Hazırlıksız Gelme (-5 XP)"><i class="fas fa-minus-circle"></i> -5</button>
                                    <button class="btn-xp" style="background:#dc2626;" onclick="addXP(${realIndex}, -10, 'Dersi Bölme'); closeXPPopup(this)" title="Dersi Bölme (-10 XP)"><i class="fas fa-comment-slash"></i> -10</button>
                                    <button class="btn-xp" style="background:#b91c1c;" onclick="addXP(${realIndex}, -15, 'Ödev Teslim Etmeme'); closeXPPopup(this)" title="Ödev Teslim Etmeme (-15 XP)"><i class="fas fa-file-excel"></i> -15</button>
                                    <button class="btn-xp" style="background:#991b1b;" onclick="addXP(${realIndex}, -20, 'Ciddi Kural İhlali'); closeXPPopup(this)" title="Ciddi Kural İhlali (-20 XP)"><i class="fas fa-ban"></i> -20</button>
                                </div>
                            </div>
                        </div>
                        <button class="action-btn btn-view" onclick="openObservationModal(${realIndex})" title="Hızlı Gözlem Ekle"><i class="fas fa-eye"></i></button>
                        <button class="action-btn btn-edit" onclick="editStudent(${realIndex})" title="Düzenle"><i class="fas fa-pen"></i></button>
                        <button class="action-btn btn-delete" onclick="deleteStudent(${realIndex})" title="Sil"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
                tbody.appendChild(tr);
            });
            document.getElementById('select-all').checked = false;
            updateClassDropdown();
        }

        function updateClassDropdown() {
            const classFilter = document.getElementById('class-filter'); const classViewFilter = document.getElementById('class-view-filter');
            const currentVal = classFilter ? classFilter.value : ""; const currentViewVal = classViewFilter ? classViewFilter.value : "";
            const classes = [...new Set(studentData.map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();

            if (classFilter) {
                if (classes.length === 0) classFilter.innerHTML = '<option value="">Önce sisteme öğrenci yükleyin...</option>';
                else {
                    classFilter.innerHTML = '<option value="">-- Sınıf Seçiniz --</option>';
                    classes.forEach(c => classFilter.innerHTML += `<option value="${c}">${c}</option>`);
                    if (classes.includes(currentVal)) classFilter.value = currentVal;
                }
            }
            if (classViewFilter) {
                classViewFilter.innerHTML = '<option value="">Tüm Sınıflar</option>';
                classes.forEach(c => classViewFilter.innerHTML += `<option value="${c}">${c}</option>`);
                if (classes.includes(currentViewVal)) classViewFilter.value = currentViewVal;
            }

            const trackClassContainer = document.getElementById('track-class-container');
            if (trackClassContainer) {
                trackClassContainer.innerHTML = '';
                classes.forEach(c => {
                    const studentsInClass = studentData.filter(s => s.sinif === c).sort((a, b) => a.no - b.no);
                    const div = document.createElement('div');
                    div.className = 'track-class-card';
                    div.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" class="track-class-checkbox" value="${c}" id="chk-${c}" style="width: 18px; height: 18px; accent-color: var(--secondary); cursor: pointer;" onchange="toggleClassAllStudents('${c}', this.checked)"> 
                            <label for="chk-${c}" style="font-weight: 800; font-size: 15px; cursor:pointer; color: var(--secondary); margin:0;">${c} SINIFI</label>
                        </div>
                        <button class="btn" style="padding: 6px 14px; font-size: 12px; background: var(--secondary); display: inline-flex; align-items: center; gap: 6px;" onclick="toggleStudentListUI('${c}')">
                            <i class="fas fa-list-ul"></i> Öğrenci Seç
                        </button>
                    </div>
                    <div id="student-list-${c}" style="display: none;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; margin-bottom: 5px; background: rgba(16, 185, 129, 0.1); padding: 6px 10px; border-radius: 6px;">
                            <span style="font-size: 11px; font-weight: 700; color: var(--accent);"><i class="fas fa-user-check"></i> ÖĞRENCİ BİLGİSİ</span>
                            <button class="btn" style="padding: 4px 10px; font-size: 11px; background: var(--accent); color: white; border: none; font-weight:700;" onclick="selectAllInClass('${c}')">Tümünü Seç</button>
                        </div>
                        <div class="track-student-grid">
                            ${studentsInClass.map(s => `
                                <div class="track-student-item" onclick="toggleStudentCheckboxDirectly('st-${s.adSoyad.replace(/\s+/g, '')}')">
                                    <input type="checkbox" class="track-student-checkbox" data-class="${c}" value="${s.adSoyad}" id="st-${s.adSoyad.replace(/\s+/g, '')}" onclick="event.stopPropagation()">
                                    <label for="st-${s.adSoyad.replace(/\s+/g, '')}">${s.no} - ${s.adSoyad}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                    trackClassContainer.appendChild(div);
                });
            }

            const examClassCheckboxGrid = document.getElementById('exam-class-checkbox-grid');
            if (examClassCheckboxGrid) {
                examClassCheckboxGrid.innerHTML = '';
                classes.forEach(c => {
                    examClassCheckboxGrid.innerHTML += `
                    <label class="checkbox-item">
                        <input type="checkbox" class="exam-class-checkbox" value="${c}"> ${c}
                    </label>
                `;
                });
            }
            updateExamUploadDropdowns();
            updateEvalClassDropdown();
        }

        // ----------------------------------------------------------------------
        // TAB 3: GELİŞMİŞ YAPAY ZEKA DERS İŞLEME STRATEJİSİ ALGORİTMASI
        // (Bütüncül Kuram, 5E, Kolb, Bloom, Vygotsky Entegrasyonu)
        // ----------------------------------------------------------------------

        // MÜFREDAT VERİ TABANI (Örnek Şablonlar)
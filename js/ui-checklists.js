// ============================================================
// ui-checklists.js
// Öğretmen Takip ve Kontrol Çizelgeleri Sistemi
// ============================================================

(function () {
    // ── ŞABLON TANIMLARI ──
    const CHECKLIST_TEMPLATES = {
        'meb_katilim': {
            name: '🎯 MEB Ders ve Etkinliklere Katılım Ölçeği',
            defaultTitle: 'Ders ve Etkinliklere Katılım Değerlendirme Ölçeği',
            evalType: 'score', // Sayısal puanlı (0-100)
            badge: 'MEB KATILIM',
            badgeColor: '#10b981',
            criteria: [
                { id: 'c1', name: 'Derse Hazırlık ve Araç-Gereç', maxScore: 20 },
                { id: 'c2', name: 'Derse İlgi ve Aktif Katılım', maxScore: 25 },
                { id: 'c3', name: 'Dinleme, İletişim ve Saygı', maxScore: 20 },
                { id: 'c4', name: 'Görev Bilinci ve Sorumluluk', maxScore: 20 },
                { id: 'c5', name: 'Kurallara Uyum ve Çaba', maxScore: 15 }
            ]
        },
        'materyal': {
            name: '📚 Kitap, Defter & Materyal Kontrolü',
            defaultTitle: 'Ders Araç-Gereç ve Materyal Kontrol Çizelgesi',
            evalType: 'check', // Simgeli (+, -, G, !)
            badge: 'MATERYAL',
            badgeColor: '#3b82f6',
            criteria: [
                { id: 'c1', name: 'Ders Kitabı', maxScore: 1 },
                { id: 'c2', name: 'Ders Defteri', maxScore: 1 },
                { id: 'c3', name: 'Soru Bankası / Fasikül', maxScore: 1 },
                { id: 'c4', name: 'Özel Araç-Gereç (Kalem/Boya vb.)', maxScore: 1 }
            ]
        },
        'deney': {
            name: '🔬 Deney & Laboratuvar Süreç Rubriği',
            defaultTitle: 'Deney ve Laboratuvar Uygulamaları Süreç Ölçeği',
            evalType: 'score',
            badge: 'DENEY RUBRİK',
            badgeColor: '#8b5cf6',
            criteria: [
                { id: 'c1', name: 'Laboratuvar Güvenliği & Önlük', maxScore: 20 },
                { id: 'c2', name: 'Deney Düzeneği Kurma & Hipotez', maxScore: 25 },
                { id: 'c3', name: 'Gözlem Yapma & Veri Kaydı', maxScore: 30 },
                { id: 'c4', name: 'Alan Temizliği & Deney Raporu', maxScore: 25 }
            ]
        },
        'haftalik': {
            name: '📅 Haftalık / Periyodik Kontrol Çizelgesi',
            defaultTitle: 'Aylık / 4 Haftalık Periyodik Durum Çizelgesi',
            evalType: 'check',
            badge: 'HAFTALIK TAKİP',
            badgeColor: '#f59e0b',
            criteria: [
                { id: 'c1', name: '1. Hafta', maxScore: 1 },
                { id: 'c2', name: '2. Hafta', maxScore: 1 },
                { id: 'c3', name: '3. Hafta', maxScore: 1 },
                { id: 'c4', name: '4. Hafta', maxScore: 1 }
            ]
        },
        'ozel': {
            name: '⚙️ Özel / Serbest Kriter Listesi',
            defaultTitle: 'Özel Öğrenci Takip Çizelgesi',
            evalType: 'score',
            badge: 'ÖZEL LİSTE',
            badgeColor: '#ec4899',
            criteria: [
                { id: 'c1', name: 'Kriter 1', maxScore: 50 },
                { id: 'c2', name: 'Kriter 2', maxScore: 50 }
            ]
        }
    };

    const DEFAULT_CHECK_SYMBOLS = [
        { key: '+', label: 'Var / Yapıldı', color: '#10b981', isPositive: true },
        { key: '-', label: 'Yok / Eksik', color: '#ef4444', isPositive: false },
        { key: 'G', label: 'Gelmedi', color: '#f59e0b', isPositive: false },
        { key: '!', label: 'Unuttu / Muaf', color: '#8b5cf6', isPositive: false }
    ];

    const CHECK_SYMBOL_PRESETS = {
        'standard': {
            name: '+ / - / G / !',
            symbols: [
                { key: '+', label: 'Var / Yapıldı', color: '#10b981', isPositive: true },
                { key: '-', label: 'Yok / Eksik', color: '#ef4444', isPositive: false },
                { key: 'G', label: 'Gelmedi', color: '#f59e0b', isPositive: false },
                { key: '!', label: 'Unuttu / Muaf', color: '#8b5cf6', isPositive: false }
            ]
        },
        'tick_cross': {
            name: '✓ / ✗ / G / !',
            symbols: [
                { key: '✓', label: 'Tam / Onay', color: '#10b981', isPositive: true },
                { key: '✗', label: 'Eksik / Red', color: '#ef4444', isPositive: false },
                { key: 'G', label: 'Gelmedi', color: '#f59e0b', isPositive: false },
                { key: '!', label: 'Unuttu', color: '#8b5cf6', isPositive: false }
            ]
        },
        'three_tier': {
            name: '+ / ½ / -',
            symbols: [
                { key: '+', label: 'Tam Başarılı', color: '#10b981', isPositive: true },
                { key: '½', label: 'Kısmi / Orta', color: '#f59e0b', isPositive: false },
                { key: '-', label: 'Yetersiz / Eksik', color: '#ef4444', isPositive: false }
            ]
        },
        'ratings': {
            name: '5 / 4 / 3 / 2 / 1',
            symbols: [
                { key: '5', label: 'Pekiyi (5)', color: '#10b981', isPositive: true },
                { key: '4', label: 'İyi (4)', color: '#3b82f6', isPositive: true },
                { key: '3', label: 'Orta (3)', color: '#f59e0b', isPositive: false },
                { key: '2', label: 'Geçer (2)', color: '#ea580c', isPositive: false },
                { key: '1', label: 'Yetersiz (1)', color: '#ef4444', isPositive: false }
            ]
        },
        'letters': {
            name: 'A / B / C / D',
            symbols: [
                { key: 'A', label: 'A (Çok İyi)', color: '#10b981', isPositive: true },
                { key: 'B', label: 'B (İyi)', color: '#3b82f6', isPositive: true },
                { key: 'C', label: 'C (Orta)', color: '#f59e0b', isPositive: false },
                { key: 'D', label: 'D (Geliştirilmeli)', color: '#ef4444', isPositive: false }
            ]
        },
        'faces': {
            name: '😊 / 😐 / 🙁',
            symbols: [
                { key: '😊', label: 'Başarılı', color: '#10b981', isPositive: true },
                { key: '😐', label: 'Orta', color: '#f59e0b', isPositive: false },
                { key: '🙁', label: 'Geliştirilmeli', color: '#ef4444', isPositive: false }
            ]
        }
    };

    function getChecklistSymbols(item) {
        if (item && Array.isArray(item.customSymbols) && item.customSymbols.length > 0) {
            return item.customSymbols;
        }
        return DEFAULT_CHECK_SYMBOLS;
    }

    let _currentCriteria = [];
    let _editingChecklistId = null;
    let _activeModalChecklistId = null;
    let _chkSortMode = localStorage.getItem('chk_sort_mode') || 'no'; // 'no' | 'name'
    let _chkSortAsc = localStorage.getItem('chk_sort_asc') !== 'false';

    // ── GÜVENLİ VERİ ERİŞİM VE SENKRONİZASYON YARDIMCILARI ──
    function getChecklistList() {
        if (typeof checklistData !== 'undefined' && Array.isArray(checklistData)) {
            window.checklistData = checklistData;
            return checklistData;
        }
        if (window.checklistData && Array.isArray(window.checklistData)) {
            return window.checklistData;
        }
        window.checklistData = [];
        return window.checklistData;
    }

    function setChecklistList(newList) {
        window.checklistData = newList;
        if (typeof checklistData !== 'undefined') {
            checklistData = newList;
        }
    }

    function getStudentList() {
        if (typeof studentData !== 'undefined' && Array.isArray(studentData)) {
            window.studentData = studentData;
            return studentData;
        }
        if (window.studentData && Array.isArray(window.studentData)) {
            return window.studentData;
        }
        return [];
    }

    // ── MODÜL BAŞLATICI ──
    function initChecklistModule() {
        onChecklistTemplateChange();
        updateChecklistClassContainer();
        renderChecklistList();
    }

    // ── ŞABLON SEÇİMİ DEĞİŞTİĞİNDE ──
    function onChecklistTemplateChange() {
        const select = document.getElementById('chk-template-select');
        const titleInput = document.getElementById('chk-title-input');
        const evalTypeSelect = document.getElementById('chk-eval-type');
        if (!select) return;

        const tmplKey = select.value || 'meb_katilim';
        const tmpl = CHECKLIST_TEMPLATES[tmplKey];
        if (!tmpl) return;

        if (titleInput && (!_editingChecklistId || titleInput.value.trim() === '')) {
            titleInput.value = tmpl.defaultTitle;
        }
        if (evalTypeSelect) {
            evalTypeSelect.value = tmpl.evalType;
        }

        // Kriterleri şablondan klonla
        _currentCriteria = JSON.parse(JSON.stringify(tmpl.criteria));
        renderCriteriaInputs();
    }

    // ── DEĞERLENDİRME TİPİ DEĞİŞTİĞİNDE (Puan / Check) ──
    function onChecklistEvalTypeChange() {
        const evalType = document.getElementById('chk-eval-type')?.value || 'score';
        if (evalType === 'check') {
            _currentCriteria.forEach(c => c.maxScore = 1);
        } else {
            // Puanlı moda geçtiyse ve hepsi 1 ise dengeli 100 yap
            const allOne = _currentCriteria.every(c => c.maxScore === 1);
            if (allOne && _currentCriteria.length > 0) {
                const equalShare = Math.floor(100 / _currentCriteria.length);
                _currentCriteria.forEach((c, idx) => {
                    c.maxScore = (idx === _currentCriteria.length - 1)
                        ? (100 - equalShare * (_currentCriteria.length - 1))
                        : equalShare;
                });
            }
        }
        renderCriteriaInputs();
    }

    // ── KRİTERLERİN INPUT FORMUNU ÇİZ ──
    function renderCriteriaInputs() {
        const container = document.getElementById('chk-criteria-container');
        const evalType = document.getElementById('chk-eval-type')?.value || 'score';
        const totalPill = document.getElementById('chk-total-max-pill');
        if (!container) return;

        container.innerHTML = '';
        let totalMax = 0;

        _currentCriteria.forEach((crit, index) => {
            totalMax += parseInt(crit.maxScore) || 0;
            const row = document.createElement('div');
            row.style = 'display:flex; align-items:center; gap:8px; margin-bottom:8px; background:var(--input-bg); padding:6px 10px; border-radius:8px; border:1px solid var(--border);';
            row.innerHTML = `
                <span style="font-size:11px; font-weight:700; color:var(--text-muted); width:20px;">${index + 1}.</span>
                <input type="text" value="${escapeHtml(crit.name)}" 
                    placeholder="Kriter / Sütun Başlığı" 
                    style="flex:1; padding:6px 10px; font-size:12px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg); color:var(--text-main);"
                    oninput="updateCriterionField(${index}, 'name', this.value)">
                ${evalType === 'score' ? `
                    <div style="display:inline-flex; align-items:center; gap:4px;">
                        <input type="number" value="${crit.maxScore || 0}" min="1" max="100" 
                            style="width:55px; padding:6px; text-align:center; font-size:12px; font-weight:700; border:1px solid var(--border); border-radius:6px; background:var(--card-bg); color:var(--text-main);"
                            oninput="updateCriterionField(${index}, 'maxScore', parseInt(this.value) || 0)">
                        <span style="font-size:11px; color:var(--text-muted); font-weight:600;">Puan</span>
                    </div>
                ` : `
                    <span style="font-size:11px; padding:3px 8px; border-radius:6px; background:rgba(59,130,246,0.1); color:var(--secondary); font-weight:700; white-space:nowrap;">+/- Simge</span>
                `}
                <button type="button" class="action-btn btn-delete" style="padding:5px 8px; font-size:11px;" onclick="removeCriterion(${index})" title="Kriteri Sil">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            container.appendChild(row);
        });

        if (totalPill) {
            if (evalType === 'score') {
                totalPill.style.display = 'inline-block';
                const isHundred = totalMax === 100;
                totalPill.innerHTML = `Toplam: <strong>${totalMax} Puan</strong> ${isHundred ? '✅ (100 Tam)' : '⚠️ (100 Önerilir)'}`;
                totalPill.style.background = isHundred ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
                totalPill.style.color = isHundred ? 'var(--accent)' : 'var(--yellow)';
                totalPill.style.borderColor = isHundred ? 'var(--accent)' : 'var(--yellow)';
            } else {
                totalPill.style.display = 'inline-block';
                totalPill.innerHTML = `${_currentCriteria.length} Kontrol Sütunu`;
                totalPill.style.background = 'rgba(59,130,246,0.12)';
                totalPill.style.color = 'var(--secondary)';
                totalPill.style.borderColor = 'var(--secondary)';
            }
        }
    }

    function updateCriterionField(idx, field, val) {
        if (_currentCriteria[idx]) {
            _currentCriteria[idx][field] = val;
            if (field === 'maxScore') {
                const evalType = document.getElementById('chk-eval-type')?.value || 'score';
                const totalPill = document.getElementById('chk-total-max-pill');
                if (totalPill && evalType === 'score') {
                    const totalMax = _currentCriteria.reduce((sum, c) => sum + (parseInt(c.maxScore) || 0), 0);
                    const isHundred = totalMax === 100;
                    totalPill.innerHTML = `Toplam: <strong>${totalMax} Puan</strong> ${isHundred ? '✅ (100 Tam)' : '⚠️ (100 Önerilir)'}`;
                    totalPill.style.background = isHundred ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
                    totalPill.style.color = isHundred ? 'var(--accent)' : 'var(--yellow)';
                    totalPill.style.borderColor = isHundred ? 'var(--accent)' : 'var(--yellow)';
                }
            }
        }
    }

    function addCriterion() {
        const evalType = document.getElementById('chk-eval-type')?.value || 'score';
        const newIdx = _currentCriteria.length + 1;
        _currentCriteria.push({
            id: 'c_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: `Yeni Kriter ${newIdx}`,
            maxScore: evalType === 'score' ? 20 : 1
        });
        renderCriteriaInputs();
    }

    function removeCriterion(idx) {
        if (_currentCriteria.length <= 1) {
            alert('En az bir kriter/sütun bulunmalıdır!');
            return;
        }
        _currentCriteria.splice(idx, 1);
        renderCriteriaInputs();
    }

    // ── HEDEF SINIF VE ÖĞRENCİ SEÇİMİ ──
    function updateChecklistClassContainer() {
        const container = document.getElementById('chk-class-container');
        if (!container) return;
        container.innerHTML = '';

        const allStudents = getStudentList();
        if (allStudents.length === 0) {
            container.innerHTML = '<div style="font-size:12px; color:var(--text-muted); padding:8px;">Sistemde kayıtlı sınıf bulunamadı. Önce öğrenci yükleyin.</div>';
            return;
        }
        const classes = [...new Set(allStudents.map(s => s.sinif).filter(Boolean))].sort();

        classes.forEach(c => {
            const classStudents = allStudents.filter(s => s.sinif === c || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(c)))
                .sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));

            const card = document.createElement('div');
            card.className = 'track-class-card';
            card.style = 'background:var(--card-bg); border:1px solid var(--border); border-radius:8px; padding:10px; margin-bottom:8px;';
            card.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <input type="checkbox" class="chk-class-checkbox" value="${c}" id="chk-box-class-${c}" 
                            style="width:17px; height:17px; accent-color:var(--secondary); cursor:pointer;" 
                            onchange="toggleClassAllChecklistStudents('${c}', this.checked)">
                        <label for="chk-box-class-${c}" style="font-weight:700; font-size:13.5px; cursor:pointer; color:var(--text-main); margin:0;">
                            ${c} SINIFI <span style="font-size:11px; font-weight:normal; color:var(--text-muted);">(${classStudents.length} Öğrenci)</span>
                        </label>
                    </div>
                    <button type="button" class="btn" style="padding:4px 10px; font-size:11px; background:var(--input-bg); border:1px solid var(--border); color:var(--text-main);" onclick="toggleChecklistStudentList('${c}')">
                        <i class="fas fa-users"></i> Öğrenci Seç
                    </button>
                </div>
                <div id="chk-student-list-${c}" style="display:none; margin-top:10px; padding-top:8px; border-top:1px dashed var(--border);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <span style="font-size:11px; font-weight:700; color:var(--accent);"><i class="fas fa-check-circle"></i> ÖĞRENCİ LİSTESİ</span>
                        <button type="button" class="btn" style="padding:2px 8px; font-size:10px; background:var(--accent); color:white;" onclick="selectAllInChecklistClass('${c}')">Tümünü Seç/Kaldır</button>
                    </div>
                    <div class="track-student-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:5px; max-height:160px; overflow-y:auto;">
                        ${classStudents.map(s => `
                            <div class="track-student-item" style="display:flex; align-items:center; gap:6px; font-size:11.5px; padding:3px 6px; border-radius:4px; background:rgba(0,0,0,0.02);">
                                <input type="checkbox" class="chk-student-checkbox" data-class="${c}" value="${escapeHtml(s.adSoyad)}" id="chk-st-${c}-${s.no || s.adSoyad.replace(/\s+/g, '')}" onclick="event.stopPropagation()">
                                <label for="chk-st-${c}-${s.no || s.adSoyad.replace(/\s+/g, '')}" style="cursor:pointer; margin:0; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${s.no ? s.no + ' - ' : ''}${escapeHtml(s.adSoyad)}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function toggleChecklistStudentList(c) {
        const el = document.getElementById(`chk-student-list-${c}`);
        if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    function toggleClassAllChecklistStudents(className, isChecked) {
        const checkboxes = document.querySelectorAll(`.chk-student-checkbox[data-class="${className}"]`);
        checkboxes.forEach(cb => cb.checked = isChecked);
        const list = document.getElementById(`chk-student-list-${className}`);
        if (list && isChecked) list.style.display = 'block';
    }

    function selectAllInChecklistClass(className) {
        const checkboxes = document.querySelectorAll(`.chk-student-checkbox[data-class="${className}"]`);
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => cb.checked = !allChecked);
    }

    // ── YENİ ÇİZELGE EKLE / GÜNCELLE ──
    function addChecklistItem() {
        const tmplSelect = document.getElementById('chk-template-select');
        const titleInput = document.getElementById('chk-title-input');
        const evalTypeSelect = document.getElementById('chk-eval-type');
        const dateInput = document.getElementById('chk-date-input');

        const templateType = tmplSelect ? tmplSelect.value : 'meb_katilim';
        const title = titleInput ? titleInput.value.trim() : '';
        const evalType = evalTypeSelect ? evalTypeSelect.value : 'score';
        const date = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().split('T')[0];

        let classSet = new Set();
        document.querySelectorAll('.chk-class-checkbox:checked').forEach(cb => classSet.add(cb.value));
        document.querySelectorAll('.chk-student-checkbox:checked').forEach(cb => classSet.add(cb.dataset.class));
        const selectedClasses = Array.from(classSet);

        if (!title) return alert('Lütfen çizelge başlığını giriniz!');
        if (selectedClasses.length === 0) {
            alert('Lütfen en az bir hedef sınıf seçiniz!');
            const classContainer = document.getElementById('chk-class-container');
            if (classContainer) classContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (!_currentCriteria || _currentCriteria.length === 0) return alert('En az bir kriter tanımlamalısınız!');

        const tmplInfo = CHECKLIST_TEMPLATES[templateType] || CHECKLIST_TEMPLATES['meb_katilim'];
        const list = getChecklistList();
        const allStudents = getStudentList();

        // Düzenleme Modu
        if (_editingChecklistId !== null) {
            const idx = list.findIndex(c => String(c.id) === String(_editingChecklistId));
            if (idx !== -1) {
                const targetSinif = selectedClasses[0] || list[idx].sinif;
                const classStudents = allStudents.filter(s => s.sinif === targetSinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(targetSinif)));
                const selectedStudents = Array.from(document.querySelectorAll(`.chk-student-checkbox[data-class="${targetSinif}"]:checked`)).map(cb => cb.value);
                const isClassChecked = !!document.querySelector(`.chk-class-checkbox[value="${targetSinif}"]:checked`);
                const isAllClass = isClassChecked && (selectedStudents.length === 0 || selectedStudents.length >= classStudents.length);

                list[idx] = {
                    ...list[idx],
                    templateType,
                    title,
                    sinif: targetSinif,
                    evalType,
                    date,
                    badge: tmplInfo.badge,
                    badgeColor: tmplInfo.badgeColor,
                    criteria: JSON.parse(JSON.stringify(_currentCriteria)),
                    targetStudents: isAllClass ? null : (selectedStudents.length > 0 ? selectedStudents : null)
                };
            }
            _editingChecklistId = null;
            const btn = document.getElementById('chk-submit-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-check-circle"></i> Çizelgeyi Oluştur';
            const cancelBtn = document.getElementById('chk-cancel-edit-btn');
            if (cancelBtn) cancelBtn.style.display = 'none';
        } else {
            // Yeni Çizelge (Çoklu Sınıf için her sınıfa bir çizelge oluştur)
            selectedClasses.forEach(sinif => {
                const classStudents = allStudents.filter(s => s.sinif === sinif || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(sinif)));
                const selectedStudents = Array.from(document.querySelectorAll(`.chk-student-checkbox[data-class="${sinif}"]:checked`)).map(cb => cb.value);
                const isClassChecked = !!document.querySelector(`.chk-class-checkbox[value="${sinif}"]:checked`);
                const isAllClass = isClassChecked && (selectedStudents.length === 0 || selectedStudents.length >= classStudents.length);
                const targetList = isAllClass ? null : (selectedStudents.length > 0 ? selectedStudents : null);

                const newId = 'chk_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
                list.push({
                    id: newId,
                    templateType,
                    title,
                    sinif,
                    evalType,
                    date,
                    badge: tmplInfo.badge,
                    badgeColor: tmplInfo.badgeColor,
                    criteria: JSON.parse(JSON.stringify(_currentCriteria)),
                    targetStudents: targetList,
                    evaluations: {},
                    isArchived: false,
                    createdAt: new Date().toISOString()
                });
            });
        }

        setChecklistList(list);

        renderChecklistList();
        if (typeof window.invalidateChecklistSavedRef === 'function') {
            window.invalidateChecklistSavedRef();
        }
        if (typeof saveData === 'function') saveData(true);

        // Formu sıfırla
        document.querySelectorAll('.chk-class-checkbox, .chk-student-checkbox').forEach(cb => cb.checked = false);
        document.querySelectorAll('[id^="chk-student-list-"]').forEach(el => el.style.display = 'none');
        if (titleInput) titleInput.value = '';
        onChecklistTemplateChange();

        if (typeof showGlobalToast === 'function') {
            showGlobalToast('✅ Takip çizelgesi başarıyla oluşturuldu ve kaydedildi!', 'success');
        }
    }

    // ── AKTİF VE ARŞİV ÇİZELGELERİ ÇİZ ──
    function renderChecklistList() {
        if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();

        const activeList = document.getElementById('checklist-list-active');
        const passiveList = document.getElementById('checklist-list-passive');
        if (!activeList || !passiveList) return;

        activeList.innerHTML = '';
        passiveList.innerHTML = '';

        const data = getChecklistList();
        let passiveCount = 0;
        let activeCount = 0;

        if (data.length === 0) {
            activeList.innerHTML = `
                <div style="text-align:center; padding:35px 20px; background:var(--card-bg); border-radius:12px; border:1px dashed var(--border);">
                    <i class="fas fa-clipboard-list" style="font-size:36px; color:var(--text-muted); opacity:0.4; margin-bottom:12px;"></i>
                    <h4 style="margin:0 0 6px 0; color:var(--text-main);">Henüz Takip Çizelgesi Oluşturulmadı</h4>
                    <p style="font-size:12.5px; color:var(--text-muted); margin:0;">Sol panelden şablon seçerek MEB katılım, materyal veya haftalık kontrol çizelgelerinizi başlatabilirsiniz.</p>
                </div>
            `;
            return;
        }

        data.forEach(item => {
            const isPassive = !!item.isArchived;
            const students = getChecklistItemStudents(item);
            const totalCount = students.length;
            const evals = item.evaluations || {};

            // İstatistik hesabı
            let evaluatedCount = 0;
            let totalScoreSum = 0;
            let scoreEvaluatedCount = 0;

            students.forEach(s => {
                const ev = evals[s.adSoyad];
                if (ev && Object.keys(ev).length > 0) {
                    evaluatedCount++;
                    if (item.evalType === 'score' && typeof ev.total === 'number') {
                        totalScoreSum += ev.total;
                        scoreEvaluatedCount++;
                    }
                }
            });

            const classAvg = scoreEvaluatedCount > 0 ? (totalScoreSum / scoreEvaluatedCount).toFixed(1) : null;
            const completionRate = totalCount > 0 ? Math.round((evaluatedCount / totalCount) * 100) : 0;

            const borderColor = isPassive ? '#6b7280' : (item.badgeColor || 'var(--secondary)');
            const badgeBg = item.badgeColor || 'var(--secondary)';

            const card = document.createElement('div');
            card.className = 'form-box';
            card.style = `margin-bottom:15px; border-left: 5px solid ${borderColor}; ${isPassive ? 'opacity:0.8;' : ''}`;
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap;">
                    <div>
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                            <span class="xp-badge" style="background:${badgeBg};">${item.badge || 'ÇİZELGE'}</span>
                            <span style="font-size:11px; padding:2px 8px; border-radius:4px; background:rgba(0,0,0,0.05); font-weight:700; color:var(--text-muted);">${item.evalType === 'score' ? 'Puanlı (0-100)' : 'Kontrol (+ / -)'}</span>
                            ${isPassive ? '<span style="font-size:10px; background:#6b7280; color:white; padding:2px 6px; border-radius:4px;">ARŞİV</span>' : ''}
                        </div>
                        <h4 style="margin:4px 0 6px 0;">${escapeHtml(item.title)} <span style="color:var(--secondary);">(${item.sinif})</span></h4>
                        <p style="font-size:12px; margin:0; color:var(--text-muted); display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                            <span><i class="fas fa-users"></i> Değerlendirilen: <strong>${evaluatedCount} / ${totalCount}</strong> (%${completionRate})</span>
                            ${classAvg !== null ? `<span><i class="fas fa-chart-line" style="color:var(--accent);"></i> Sınıf Ortalaması: <strong>${classAvg} Puan</strong></span>` : ''}
                            <span><i class="fas fa-calendar-alt"></i> ${item.date || '-'}</span>
                        </p>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                        <button class="btn" style="padding:6px 14px; font-size:11.5px; background:var(--accent); color:white; font-weight:700;" onclick="openChecklistModal('${item.id}')">
                            <i class="fas fa-table"></i> Çizelgeyi Doldur
                        </button>
                        <button class="btn" style="padding:6px 12px; font-size:11.5px; background:#6366f1; color:white;" onclick="printChecklist('${item.id}')" title="MEB Resmi A4 Çıktısı Al">
                            <i class="fas fa-print"></i> Yazdır
                        </button>
                        <button class="btn" style="padding:6px 10px; font-size:11.5px; background:var(--secondary); color:white;" onclick="copyEOkulGrades('${item.id}')" title="Notları e-Okul Formatında Kopyala">
                            <i class="fas fa-copy"></i> e-Okul
                        </button>
                        <button class="btn" style="background:#25D366; padding:6px 10px; font-size:11px;" onclick="shareChecklistSummary('${item.id}')" title="WhatsApp Sınıf Özeti">
                            <i class="fab fa-whatsapp"></i>
                        </button>
                        <button class="btn" style="background:#00B2FF; padding:6px 10px; font-size:11px;" onclick="shareChecklistSummaryBip('${item.id}')" title="BiP Sınıf Özeti">
                            <i class="fas fa-comment-dots"></i>
                        </button>
                        <button class="action-btn" style="background:#f59e0b; color:white;" onclick="editChecklistItem('${item.id}')" title="Düzenle">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="action-btn" style="background:${isPassive ? 'var(--secondary)' : '#6b7280'}; color:white;" onclick="archiveChecklistItem('${item.id}', ${!isPassive})" title="${isPassive ? 'Arşivden Çıkar' : 'Arşive Al'}">
                            <i class="fas ${isPassive ? 'fa-box-open' : 'fa-archive'}"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="deleteChecklistItem('${item.id}')" title="Kalıcı Olarak Sil">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            if (isPassive) {
                passiveList.appendChild(card);
                passiveCount++;
            } else {
                activeList.appendChild(card);
                activeCount++;
            }
        });

        if (activeCount === 0 && passiveCount > 0) {
            activeList.innerHTML = `
                <div style="text-align:center; padding:25px 20px; background:var(--card-bg); border-radius:12px; border:1px dashed var(--border);">
                    <i class="fas fa-box-open" style="font-size:28px; color:var(--text-muted); opacity:0.5; margin-bottom:8px;"></i>
                    <p style="font-size:13px; color:var(--text-muted); margin:0;">Aktif çizelge bulunmuyor. Tüm çizelgeler arşivde (${passiveCount} adet).</p>
                </div>
            `;
        }

        // Arşiv Başlığı Sayacı
        const pasifBtn = passiveList.previousElementSibling?.querySelector('button');
        if (pasifBtn) {
            const countBadge = passiveCount > 0 ? ` <span style="background:#6b7280; color:white; font-size:10px; padding:1px 6px; border-radius:10px;">${passiveCount}</span>` : '';
            pasifBtn.innerHTML = `<i class="fas fa-archive"></i> Arşivlenen Çizelgeler${countBadge}<i id="chk-pasif-arrow" class="fas fa-chevron-down" style="margin-left:auto; transition:transform 0.3s; transform:${passiveList.style.display !== 'none' && passiveList.style.display !== '' ? 'rotate(180deg)' : 'none'}"></i>`;
        }
    }

    function togglePassiveChecklists() {
        const list = document.getElementById('checklist-list-passive');
        const arrow = document.getElementById('chk-pasif-arrow');
        if (!list) return;
        const isOpen = list.style.display === 'flex';
        list.style.display = isOpen ? 'none' : 'flex';
        if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }

    // ── KALICI SİLME ──
    async function deleteChecklistItem(id) {
        const list = getChecklistList();
        const item = list.find(c => String(c.id) === String(id));
        const itemTitle = item ? item.title : 'Bu çizelgeyi';
        if (!confirm(`"${itemTitle}" çizelgesini kalıcı olarak silmek istediğinize emin misiniz?`)) return;

        const updatedList = list.filter(c => String(c.id) !== String(id));
        setChecklistList(updatedList);
        renderChecklistList();

        const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
        const uid = currentUser ? currentUser.uid : (window.currentUser ? window.currentUser.uid : null);
        if (uid && window.db) {
            const safeKey = encodeFirebaseKey(String(id)).replace(/[\/\.\#\$\/\[\]]/g, '_');
            try {
                await window.db.ref(`app_data/${uid}/checklists/${safeKey}`).remove();
            } catch (e) {
                console.error("Firebase çizelge silme hatası:", e);
            }
        }

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`🗑️ "${itemTitle}" başarıyla silindi.`, 'success');
        }
    }

    // ── ARŞİVLE / GERİ AL ──
    function archiveChecklistItem(id, shouldArchive) {
        const list = getChecklistList();
        const item = list.find(c => String(c.id) === String(id));
        if (!item) return;
        item.isArchived = shouldArchive;
        setChecklistList(list);
        renderChecklistList();
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(shouldArchive ? '📁 Çizelge arşive taşındı.' : '📂 Çizelge aktif listeye geri alındı.', 'info');
        }
    }

    // ── DÜZENLE MODU ──
    function editChecklistItem(id) {
        const list = getChecklistList();
        const item = list.find(c => String(c.id) === String(id));
        if (!item) return;

        _editingChecklistId = id;
        const tmplSelect = document.getElementById('chk-template-select');
        const titleInput = document.getElementById('chk-title-input');
        const evalTypeSelect = document.getElementById('chk-eval-type');
        const dateInput = document.getElementById('chk-date-input');

        if (tmplSelect) tmplSelect.value = item.templateType || 'meb_katilim';
        if (titleInput) titleInput.value = item.title || '';
        if (evalTypeSelect) evalTypeSelect.value = item.evalType || 'score';
        if (dateInput) dateInput.value = item.date || '';

        _currentCriteria = JSON.parse(JSON.stringify(item.criteria || []));
        renderCriteriaInputs();

        // Sınıfı işaretle
        document.querySelectorAll('.chk-class-checkbox').forEach(cb => cb.checked = cb.value === item.sinif);

        // Hedef öğrenciler varsa işaretle
        if (item.targetStudents && item.targetStudents.length > 0) {
            const list = document.getElementById(`chk-student-list-${item.sinif}`);
            if (list) list.style.display = 'block';
            document.querySelectorAll(`.chk-student-checkbox[data-class="${item.sinif}"]`).forEach(cb => {
                cb.checked = item.targetStudents.includes(cb.value);
            });
        }

        const btn = document.getElementById('chk-submit-btn');
        if (btn) btn.innerHTML = '<i class="fas fa-save"></i> Değişiklikleri Güncelle';

        titleInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        titleInput?.focus();
    }

    // ── MATRİS DEĞERLENDİRME MODALI ──
    function openChecklistModal(id) {
        _activeModalChecklistId = id;
        window._activeModalChecklistId = id;
        const item = getChecklistList().find(c => String(c.id) === String(id));
        if (!item) return;

        if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();
        const students = getChecklistItemStudents(item);

        const modal = document.getElementById('checklist-eval-modal');
        if (!modal) return;

        const titleEl = document.getElementById('chk-modal-title');
        const infoEl = document.getElementById('chk-modal-info');
        const tableThead = document.getElementById('chk-modal-thead');
        const tableTbody = document.getElementById('chk-modal-tbody');

        if (titleEl) {
            titleEl.innerHTML = `<i class="fas fa-clipboard-check" style="color:var(--secondary); margin-right:8px;"></i> ${escapeHtml(item.title)}`;
        }
        if (infoEl) {
            const symbols = getChecklistSymbols(item);
            infoEl.innerHTML = `
                <span class="xp-badge" style="background:${item.badgeColor || 'var(--secondary)'};">${item.badge || 'ÇİZELGE'}</span>
                <span><strong>Sınıf:</strong> ${item.sinif}</span>
                <span><strong>Mevcut:</strong> ${students.length} Öğrenci</span>
                <span><strong>Tarih:</strong> ${item.date || '-'}</span>
                <span><strong>Format:</strong> ${item.evalType === 'score' ? 'Puanlı (0-100)' : 'Kontrol (' + symbols.map(s => escapeHtml(s.key)).join(' / ') + ')'}</span>
            `;
        }

        renderChecklistModalTable();
        modal.style.display = 'block';
    }

    function closeChecklistModal() {
        const modal = document.getElementById('checklist-eval-modal');
        if (modal) modal.style.display = 'none';
        _activeModalChecklistId = null;
        window._activeModalChecklistId = null;
        renderChecklistList();
        if (typeof saveData === 'function') saveData(true);
    }

    function setChecklistEvalSort(mode) {
        if (_chkSortMode === mode) {
            _chkSortAsc = !_chkSortAsc;
        } else {
            _chkSortMode = mode;
            _chkSortAsc = true;
        }
        localStorage.setItem('chk_sort_mode', _chkSortMode);
        localStorage.setItem('chk_sort_asc', _chkSortAsc);
        renderChecklistModalTable();
    }

    // ── MODAL TABLOSUNU ÇİZ ──
    function renderChecklistModalTable() {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        const allStudents = getChecklistItemStudents(item);
        let students = [...allStudents];
        const searchInput = document.getElementById('chk-modal-search');
        const filterVal = (searchInput?.value || '').trim().toLocaleLowerCase('tr-TR');

        if (filterVal) {
            students = students.filter(s => {
                const nameMatch = (s.adSoyad || '').toLocaleLowerCase('tr-TR').includes(filterVal);
                const noMatch = String(s.no || '').includes(filterVal);
                return nameMatch || noMatch;
            });
        }

        // Toolbar sayaç rozetini güncelle
        const countText = document.getElementById('chk-modal-count-text');
        if (countText) {
            countText.textContent = filterVal ? `${students.length} / ${allStudents.length} Öğrenci` : `${students.length} Öğrenci`;
        }

        // Toolbar sıralama butonlarının görünüm ve aktiflik durumunu güncelle
        const btnSortNo = document.getElementById('chk-sort-btn-no');
        const btnSortName = document.getElementById('chk-sort-btn-name');
        if (btnSortNo) {
            const isActive = _chkSortMode === 'no';
            btnSortNo.style.background = isActive ? 'rgba(59,130,246,0.15)' : 'var(--card-bg)';
            btnSortNo.style.color = isActive ? 'var(--secondary)' : 'var(--text-main)';
            btnSortNo.style.borderColor = isActive ? 'var(--secondary)' : 'var(--border)';
            btnSortNo.innerHTML = `<i class="fas fa-sort-numeric-${_chkSortAsc ? 'down' : 'up'}" style="color:var(--secondary);"></i> No ${isActive ? (_chkSortAsc ? '▲' : '▼') : ''}`;
        }
        if (btnSortName) {
            const isActive = _chkSortMode === 'name';
            btnSortName.style.background = isActive ? 'rgba(59,130,246,0.15)' : 'var(--card-bg)';
            btnSortName.style.color = isActive ? 'var(--secondary)' : 'var(--text-main)';
            btnSortName.style.borderColor = isActive ? 'var(--secondary)' : 'var(--border)';
            btnSortName.innerHTML = `<i class="fas fa-sort-alpha-${_chkSortAsc ? 'down' : 'up'}" style="color:var(--secondary);"></i> İsim ${isActive ? (_chkSortAsc ? '▲' : '▼') : ''}`;
        }

        // Sıralama
        students.sort((a, b) => {
            if (_chkSortMode === 'name') {
                const res = (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
                return _chkSortAsc ? res : -res;
            } else {
                const valA = parseInt(a.no, 10);
                const valB = parseInt(b.no, 10);
                if (!isNaN(valA) && !isNaN(valB)) {
                    return _chkSortAsc ? valA - valB : valB - valA;
                }
                return _chkSortAsc ? (a.no || '').localeCompare(b.no || '') : (b.no || '').localeCompare(a.no || '');
            }
        });

        // Header meta bilgisi güncellensin
        const symbols = getChecklistSymbols(item);
        const positiveKeys = symbols.filter(s => s.isPositive).map(s => s.key);
        const primaryPositiveKey = positiveKeys[0] || symbols[0]?.key || '+';

        const infoEl = document.getElementById('chk-modal-info');
        if (infoEl) {
            infoEl.innerHTML = `
                <span class="xp-badge" style="background:${item.badgeColor || 'var(--secondary)'};">${item.badge || 'ÇİZELGE'}</span>
                <span><strong>Sınıf:</strong> ${item.sinif}</span>
                <span><strong>Mevcut:</strong> ${students.length} Öğrenci</span>
                <span><strong>Tarih:</strong> ${item.date || '-'}</span>
                <span><strong>Format:</strong> ${item.evalType === 'score' ? 'Puanlı (0-100)' : 'Kontrol (' + symbols.map(s => escapeHtml(s.key)).join(' / ') + ')'}</span>
            `;
        }

        // Toolbar Hepsi (+) butonunun metnini simgeye göre güncelle
        const batchPosText = document.getElementById('chk-btn-batch-positive-text');
        if (batchPosText) {
            batchPosText.textContent = `Hepsi (${primaryPositiveKey})`;
        }

        // Thead
        const thead = document.getElementById('chk-modal-thead');
        if (thead) {
            thead.innerHTML = `
                <tr>
                    <th style="width:50px; cursor:pointer;" onclick="setChecklistEvalSort('no')" title="Numaraya göre sırala">
                        NO ${_chkSortMode === 'no' ? (_chkSortAsc ? '▲' : '▼') : '↕'}
                    </th>
                    <th style="min-width:160px; cursor:pointer;" onclick="setChecklistEvalSort('name')" title="Ada göre sırala">
                        ÖĞRENCİ ADI SOYADI ${_chkSortMode === 'name' ? (_chkSortAsc ? '▲' : '▼') : '↕'}
                    </th>
                    ${item.criteria.map((c, cIdx) => `
                        <th style="text-align:center; min-width:115px; position:relative; padding:8px 6px;" class="chk-criterion-header" title="${escapeHtml(c.name)} - Tıklayarak adını düzenleyebilirsiniz">
                            <div style="display:flex; align-items:center; justify-content:center; gap:5px; cursor:pointer;" onclick="promptRenameChecklistCriterion('${c.id}')" title="Kriter adını hızlıca değiştirmek için tıklayın">
                                <span style="font-size:12px; font-weight:700; border-bottom:1px dashed currentColor; padding-bottom:1px;">${escapeHtml(c.name)}</span>
                                <i class="fas fa-pen" style="font-size:10px; color:var(--secondary); opacity:0.8;"></i>
                            </div>
                            <div style="display:flex; align-items:center; justify-content:center; gap:4px; margin-top:3px;">
                                ${item.evalType === 'score' ? `<span style="font-size:10px; opacity:0.85; font-weight:normal;">(Maks: ${c.maxScore} P)</span>` : ''}
                                ${item.evalType === 'check' ? `
                                    <button type="button" class="btn" onclick="event.stopPropagation(); batchSetColumnChecklist('${c.id}', '${escapeAttr(primaryPositiveKey)}')" title="Bu kriteri tüm sınıfa (${escapeAttr(primaryPositiveKey)}) yap" style="font-size:9.5px; padding:1px 5px; background:rgba(16,185,129,0.15); color:#10b981; border-radius:4px; border:1px solid rgba(16,185,129,0.3); font-weight:700;"><i class="fas fa-check"></i> Hepsi</button>
                                    <button type="button" class="btn" onclick="event.stopPropagation(); batchSetColumnChecklist('${c.id}', 'clear')" title="Bu sütunu temizle" style="font-size:9.5px; padding:1px 5px; background:rgba(239,68,68,0.1); color:#ef4444; border-radius:4px; border:1px solid rgba(239,68,68,0.25);"><i class="fas fa-times"></i></button>
                                ` : ''}
                            </div>
                        </th>
                    `).join('')}
                    <th style="text-align:center; width:45px; vertical-align:middle; background:rgba(59,130,246,0.04);">
                        <button type="button" class="btn" onclick="quickAddChecklistCriterion()" style="padding:4px 8px; font-size:11px; background:rgba(59,130,246,0.15); color:var(--secondary); border:1px dashed var(--secondary); border-radius:6px; font-weight:700;" title="Yeni Kriter Sütunu Ekle">
                            <i class="fas fa-plus"></i>
                        </button>
                    </th>
                    <th style="text-align:center; width:80px;">TOPLAM</th>
                    <th style="min-width:140px;">NOT / AÇIKLAMA</th>
                    <th style="text-align:center; width:90px;">PAYLAŞ</th>
                </tr>
            `;
        }

        // Tbody
        const tbody = document.getElementById('chk-modal-tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const evals = item.evaluations || {};

        students.forEach(s => {
            const studentEval = evals[s.adSoyad] || {};
            const tr = document.createElement('tr');

            // Kriter hücreleri
            let criteriaCellsHtml = '';
            let studentTotal = 0;
            let hasAnyEntry = false;

            item.criteria.forEach(crit => {
                const cellVal = studentEval[crit.id];

                if (item.evalType === 'score') {
                    const score = (cellVal !== undefined && cellVal !== null) ? Number(cellVal) : '';
                    if (score !== '') {
                        studentTotal += Number(score);
                        hasAnyEntry = true;
                    }
                    criteriaCellsHtml += `
                        <td style="text-align:center; padding:4px;">
                            <input type="number" min="0" max="${crit.maxScore}" 
                                value="${score}" 
                                placeholder="0-${crit.maxScore}"
                                style="width:58px; text-align:center; font-weight:700; font-size:12px; padding:4px; border:1px solid var(--border); border-radius:6px; background:var(--input-bg); color:var(--text-main);"
                                onchange="updateChecklistScoreCell('${escapeAttr(s.adSoyad)}', '${crit.id}', this.value, ${crit.maxScore})">
                        </td>
                    `;
                } else {
                    // Checkbox (Simgeli butonlar) tipi
                    const status = cellVal || '';
                    if (status !== '') hasAnyEntry = true;
                    if (positiveKeys.includes(status)) studentTotal++;

                    const symButtonsHtml = symbols.map(sym => {
                        const isActive = (status === sym.key);
                        const activeStyle = isActive
                            ? `background:${sym.color || 'var(--secondary)'} !important; color:#ffffff !important; border-color:${sym.color || 'var(--secondary)'} !important; box-shadow:0 2px 6px ${(sym.color || '#3b82f6')}66;`
                            : '';
                        return `<button type="button" class="btn-chk-status ${isActive ? 'active-custom' : ''}" style="${activeStyle}" onclick="updateChecklistStatusCell('${escapeAttr(s.adSoyad)}', '${crit.id}', '${escapeAttr(sym.key)}')" title="${escapeAttr(sym.label || sym.key)} (${escapeAttr(sym.key)})">${escapeHtml(sym.key)}</button>`;
                    }).join('');

                    criteriaCellsHtml += `
                        <td style="text-align:center; padding:4px;">
                            <div style="display:inline-flex; gap:2px; background:var(--input-bg); padding:2px; border-radius:6px; border:1px solid var(--border);">
                                ${symButtonsHtml}
                            </div>
                        </td>
                    `;
                }
            });

            // Toplam göstergesi
            let totalBadgeHtml = '';
            if (item.evalType === 'score') {
                if (!hasAnyEntry) {
                    totalBadgeHtml = '<span style="font-size:11px; color:var(--text-muted);">-</span>';
                } else {
                    const color = studentTotal >= 85 ? 'var(--accent)' : (studentTotal >= 70 ? 'var(--secondary)' : (studentTotal >= 50 ? 'var(--yellow)' : 'var(--red)'));
                    totalBadgeHtml = `<span style="font-size:13px; font-weight:800; color:${color};">${studentTotal}</span>`;
                }
            } else {
                totalBadgeHtml = `<span style="font-size:12px; font-weight:700; color:var(--secondary);">${studentTotal} / ${item.criteria.length}</span>`;
            }

            tr.innerHTML = `
                <td style="font-weight:700; color:var(--text-muted);">${s.no || '-'}</td>
                <td style="font-weight:600;">${escapeHtml(s.adSoyad)}</td>
                ${criteriaCellsHtml}
                <td style="text-align:center; color:var(--text-muted); opacity:0.25; font-size:11px;">•</td>
                <td style="text-align:center;">${totalBadgeHtml}</td>
                <td>
                    <input type="text" value="${escapeAttr(studentEval.note || '')}" 
                        placeholder="Öğretmen notu..."
                        style="width:100%; font-size:11.5px; padding:4px 8px; border:1px solid var(--border); border-radius:6px; background:var(--input-bg); color:var(--text-main);"
                        onchange="updateChecklistNote('${escapeAttr(s.adSoyad)}', this.value)">
                </td>
                <td style="text-align:center;">
                    <div style="display:inline-flex; gap:4px;">
                        <button type="button" class="action-btn" style="color:#25D366; background:none; font-size:15px; cursor:pointer;" onclick="shareStudentChecklistResult('${item.id}', '${escapeAttr(s.adSoyad)}', 'wa')" title="WhatsApp"><i class="fab fa-whatsapp"></i></button>
                        <button type="button" class="action-btn" style="color:#00B2FF; background:none; font-size:15px; cursor:pointer;" onclick="shareStudentChecklistResult('${item.id}', '${escapeAttr(s.adSoyad)}', 'bip')" title="BiP"><i class="fas fa-comment-dots"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ── HÜCRE DEĞER GÜNCELLEMELERİ ──
    function updateChecklistScoreCell(studentName, criterionId, value, maxScore) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        if (!item.evaluations) item.evaluations = {};
        if (!item.evaluations[studentName]) item.evaluations[studentName] = {};

        let numericVal = parseInt(value, 10);
        if (isNaN(numericVal) || value === '') {
            delete item.evaluations[studentName][criterionId];
        } else {
            if (numericVal < 0) numericVal = 0;
            if (numericVal > maxScore) numericVal = maxScore;
            item.evaluations[studentName][criterionId] = numericVal;
        }

        // Toplamı yeniden hesapla
        let total = 0;
        let hasAny = false;
        item.criteria.forEach(c => {
            const v = item.evaluations[studentName][c.id];
            if (v !== undefined && v !== null && !isNaN(v)) {
                total += Number(v);
                hasAny = true;
            }
        });
        item.evaluations[studentName].total = hasAny ? total : null;

        renderChecklistModalTable();
        if (typeof saveData === 'function') saveData();
    }

    function updateChecklistStatusCell(studentName, criterionId, status) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        if (!item.evaluations) item.evaluations = {};
        if (!item.evaluations[studentName]) item.evaluations[studentName] = {};

        // Aynı duruma tıklandıysa kaldır
        if (item.evaluations[studentName][criterionId] === status) {
            delete item.evaluations[studentName][criterionId];
        } else {
            item.evaluations[studentName][criterionId] = status;
        }

        renderChecklistModalTable();
        if (typeof saveData === 'function') saveData();
    }

    function updateChecklistNote(studentName, note) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        if (!item.evaluations) item.evaluations = {};
        if (!item.evaluations[studentName]) item.evaluations[studentName] = {};
        item.evaluations[studentName].note = (note || '').trim();

        if (typeof saveData === 'function') saveData();
    }

    // ── HIZLI TOPLU İŞLEMLER ──
    function batchSetAllChecklist(type) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        const students = getChecklistItemStudents(item);
        if (!item.evaluations) item.evaluations = {};

        const symbols = getChecklistSymbols(item);
        const positiveKeys = symbols.filter(s => s.isPositive).map(s => s.key);
        const primaryPositiveKey = positiveKeys[0] || symbols[0]?.key || '+';

        if (type === 'maxScore') {
            students.forEach(s => {
                if (!item.evaluations[s.adSoyad]) item.evaluations[s.adSoyad] = {};
                if (item.evalType === 'score') {
                    let total = 0;
                    item.criteria.forEach(c => {
                        item.evaluations[s.adSoyad][c.id] = c.maxScore;
                        total += c.maxScore;
                    });
                    item.evaluations[s.adSoyad].total = total;
                } else {
                    item.criteria.forEach(c => {
                        item.evaluations[s.adSoyad][c.id] = primaryPositiveKey;
                    });
                }
            });
        } else if (type === 'clear') {
            if (!confirm('Tüm öğrenci puan ve işaretlemeleri temizlenecek. Emin misiniz?')) return;
            students.forEach(s => {
                item.evaluations[s.adSoyad] = {};
            });
        } else if (type === '+' || type === 'firstPositive') {
            students.forEach(s => {
                if (!item.evaluations[s.adSoyad]) item.evaluations[s.adSoyad] = {};
                if (item.evalType === 'score') {
                    let total = 0;
                    item.criteria.forEach(c => {
                        item.evaluations[s.adSoyad][c.id] = c.maxScore;
                        total += c.maxScore;
                    });
                    item.evaluations[s.adSoyad].total = total;
                } else {
                    item.criteria.forEach(c => {
                        item.evaluations[s.adSoyad][c.id] = primaryPositiveKey;
                    });
                }
            });
        } else {
            // Belirli bir simge
            students.forEach(s => {
                if (!item.evaluations[s.adSoyad]) item.evaluations[s.adSoyad] = {};
                item.criteria.forEach(c => {
                    item.evaluations[s.adSoyad][c.id] = type;
                });
            });
        }

        renderChecklistModalTable();
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('⚡ Toplu işlem tüm sınıfa başarıyla uygulandı!', 'success');
        }
    }

    // ── HIZLI KRİTER İŞLEMLERİ (BAŞLIK & SÜTUN EYLEMLERİ) ──
    function promptRenameChecklistCriterion(critId) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;
        const crit = (item.criteria || []).find(c => String(c.id) === String(critId));
        if (!crit) return;

        const newName = prompt('Kriter adını düzenleyin:', crit.name);
        if (newName === null) return; // İptal
        const trimmed = newName.trim();
        if (!trimmed) {
            alert('Kriter adı boş bırakılamaz!');
            return;
        }

        crit.name = trimmed;
        renderChecklistModalTable();
        renderChecklistList();
        if (typeof window.invalidateChecklistSavedRef === 'function') {
            window.invalidateChecklistSavedRef(item.firebaseKey || item.id);
        }
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`✅ Kriter adı "${trimmed}" olarak güncellendi.`, 'success');
        }
    }

    function quickAddChecklistCriterion() {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;
        const count = (item.criteria || []).length + 1;
        const name = prompt('Yeni kriter başlığını girin:', `Kriter ${count}`);
        if (name === null) return;
        const trimmed = name.trim();
        if (!trimmed) return;

        if (!item.criteria) item.criteria = [];
        item.criteria.push({
            id: 'c_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: trimmed,
            maxScore: item.evalType === 'score' ? 20 : 1
        });

        renderChecklistModalTable();
        renderChecklistList();
        if (typeof window.invalidateChecklistSavedRef === 'function') {
            window.invalidateChecklistSavedRef(item.firebaseKey || item.id);
        }
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`✅ "${trimmed}" kriter sütunu eklendi!`, 'success');
        }
    }

    function batchSetColumnChecklist(critId, val) {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;
        const students = getChecklistItemStudents(item);
        if (!item.evaluations) item.evaluations = {};

        const symbols = getChecklistSymbols(item);
        const primaryPositiveKey = symbols.find(s => s.isPositive)?.key || symbols[0]?.key || '+';
        const targetVal = (val === '+') ? primaryPositiveKey : val;

        students.forEach(s => {
            if (!item.evaluations[s.adSoyad]) item.evaluations[s.adSoyad] = {};
            if (targetVal === 'clear') {
                delete item.evaluations[s.adSoyad][critId];
            } else {
                item.evaluations[s.adSoyad][critId] = targetVal;
            }
        });

        renderChecklistModalTable();
        if (typeof window.invalidateChecklistSavedRef === 'function') {
            window.invalidateChecklistSavedRef(item.firebaseKey || item.id);
        }
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(targetVal === 'clear' ? '🧹 Kriter sütunu temizlendi.' : `⚡ Kriter tüm sınıfa uygulandı (${targetVal})!`, 'info');
        }
    }

    // ── KRİTER & SİMGE DÜZENLEME MODALI (DETAYLI YAPILANDIRMA) ──
    let _tempModalCriteria = [];
    let _tempModalSymbols = [];
    let _tempModalEvalType = 'check';

    function openChecklistCriteriaConfigModal() {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        _tempModalCriteria = JSON.parse(JSON.stringify(item.criteria || []));
        _tempModalEvalType = item.evalType || 'check';
        _tempModalSymbols = JSON.parse(JSON.stringify(getChecklistSymbols(item)));

        const radioCheck = document.getElementById('chk-modal-evaltype-check');
        const radioScore = document.getElementById('chk-modal-evaltype-score');
        if (radioCheck && radioScore) {
            radioCheck.checked = (_tempModalEvalType === 'check');
            radioScore.checked = (_tempModalEvalType === 'score');
        }

        const subtitleEl = document.getElementById('chk-criteria-modal-subtitle');
        if (subtitleEl) {
            subtitleEl.textContent = `"${item.title}" (${item.sinif}) çizelgesinin kriterlerini, değerlendirme formatını ve simgelerini yapılandırın.`;
        }

        renderCriteriaModalRows();
        renderModalSymbolsList();

        const symSection = document.getElementById('chk-modal-symbols-section');
        if (symSection) {
            symSection.style.display = (_tempModalEvalType === 'check') ? 'block' : 'none';
        }

        const modal = document.getElementById('checklist-criteria-modal');
        if (modal) modal.style.display = 'block';
    }

    function closeChecklistCriteriaConfigModal() {
        const modal = document.getElementById('checklist-criteria-modal');
        if (modal) modal.style.display = 'none';
        _tempModalCriteria = [];
        _tempModalSymbols = [];
    }

    function onChecklistCriteriaModalEvalTypeChange(newType) {
        _tempModalEvalType = newType;
        const symSection = document.getElementById('chk-modal-symbols-section');
        if (symSection) {
            symSection.style.display = (_tempModalEvalType === 'check') ? 'block' : 'none';
        }

        if (newType === 'check') {
            _tempModalCriteria.forEach(c => c.maxScore = 1);
        } else {
            const allOne = _tempModalCriteria.every(c => c.maxScore === 1);
            if (allOne && _tempModalCriteria.length > 0) {
                const equalShare = Math.floor(100 / _tempModalCriteria.length);
                _tempModalCriteria.forEach((c, idx) => {
                    c.maxScore = (idx === _tempModalCriteria.length - 1)
                        ? (100 - equalShare * (_tempModalCriteria.length - 1))
                        : equalShare;
                });
            }
        }
        renderCriteriaModalRows();
    }

    // ── SİMGE / BUTON YÖNETİMİ FONKSİYONLARI ──
    function renderModalSymbolsList() {
        const container = document.getElementById('chk-modal-symbols-list');
        if (!container) return;
        container.innerHTML = '';

        _tempModalSymbols.forEach((sym, idx) => {
            const row = document.createElement('div');
            row.style = 'display:flex; align-items:center; gap:8px; background:var(--card-bg); padding:6px 8px; border-radius:6px; border:1px solid var(--border);';
            row.innerHTML = `
                <input type="text" maxlength="4" value="${escapeAttr(sym.key)}" 
                    placeholder="Simge" 
                    style="width:46px; text-align:center; font-weight:800; font-size:13px; padding:4px 2px; border:1px solid var(--border); border-radius:6px; background:var(--input-bg); color:var(--text-main);" 
                    oninput="updateModalSymbolField(${idx}, 'key', this.value)" title="Buton üzerindeki karakter veya emoji (örn: +, ✓, A, 5)">
                <input type="text" value="${escapeAttr(sym.label || '')}" 
                    placeholder="Açıklama (Örn: Var / Tam)" 
                    style="flex:1; font-size:12px; padding:4px 8px; border:1px solid var(--border); border-radius:6px; background:var(--input-bg); color:var(--text-main);" 
                    oninput="updateModalSymbolField(${idx}, 'label', this.value)">
                <input type="color" value="${sym.color || '#3b82f6'}" 
                    style="width:32px; height:28px; padding:0; border:1px solid var(--border); border-radius:4px; cursor:pointer; background:none;" 
                    onchange="updateModalSymbolField(${idx}, 'color', this.value)" title="Buton rengi">
                <label style="display:flex; align-items:center; gap:4px; font-size:11px; font-weight:600; cursor:pointer; margin:0; white-space:nowrap; color:var(--text-main);" title="İşaretlendiğinde toplam puana +1 eklenir">
                    <input type="checkbox" ${sym.isPositive ? 'checked' : ''} onchange="updateModalSymbolField(${idx}, 'isPositive', this.checked)">
                    <span>Geçer</span>
                </label>
                <button type="button" class="action-btn btn-delete" onclick="removeModalSymbolRow(${idx})" title="Bu simgeyi kaldır" style="padding:4px 7px; font-size:11px;">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            container.appendChild(row);
        });
    }

    function updateModalSymbolField(idx, field, val) {
        if (_tempModalSymbols[idx]) {
            _tempModalSymbols[idx][field] = val;
        }
    }

    function addChecklistSymbolRow() {
        _tempModalSymbols.push({
            key: '?',
            label: 'Açıklama',
            color: '#6366f1',
            isPositive: false
        });
        renderModalSymbolsList();
    }

    function removeModalSymbolRow(idx) {
        if (_tempModalSymbols.length <= 1) {
            alert('En az bir simge bulunmalıdır!');
            return;
        }
        _tempModalSymbols.splice(idx, 1);
        renderModalSymbolsList();
    }

    function applyChecklistSymbolPreset(presetKey) {
        const preset = CHECK_SYMBOL_PRESETS[presetKey];
        if (!preset) return;
        _tempModalSymbols = JSON.parse(JSON.stringify(preset.symbols));
        renderModalSymbolsList();
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`🎨 "${preset.name}" simge şablonu yüklendi. Kaydet'e basarak uygulayabilirsiniz.`, 'info');
        }
    }

    function renderCriteriaModalRows() {
        const listContainer = document.getElementById('chk-modal-criteria-list');
        const summaryBadge = document.getElementById('chk-modal-criteria-summary');
        const distributeBtn = document.getElementById('chk-modal-distribute-btn');
        if (!listContainer) return;

        listContainer.innerHTML = '';
        let totalMax = 0;

        _tempModalCriteria.forEach((crit, idx) => {
            totalMax += parseInt(crit.maxScore) || 0;
            const row = document.createElement('div');
            row.style = 'display:flex; align-items:center; gap:8px; background:var(--input-bg); padding:8px 10px; border-radius:8px; border:1px solid var(--border);';
            row.innerHTML = `
                <span style="font-size:12px; font-weight:700; color:var(--text-muted); width:24px; text-align:center;">${idx + 1}.</span>
                <input type="text" value="${escapeHtml(crit.name)}" 
                    placeholder="Kriter / Sütun Başlığı" 
                    style="flex:1; padding:6px 10px; font-size:12px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg); color:var(--text-main);"
                    oninput="updateModalCriterionName(${idx}, this.value)">
                ${_tempModalEvalType === 'score' ? `
                    <div style="display:inline-flex; align-items:center; gap:4px;">
                        <input type="number" value="${crit.maxScore || 0}" min="1" max="100" 
                            style="width:55px; padding:6px; text-align:center; font-size:12px; font-weight:700; border:1px solid var(--border); border-radius:6px; background:var(--card-bg); color:var(--text-main);"
                            oninput="updateModalCriterionScore(${idx}, this.value)">
                        <span style="font-size:11px; color:var(--text-muted); font-weight:600;">Puan</span>
                    </div>
                ` : `
                    <span style="font-size:11px; padding:3px 8px; border-radius:6px; background:rgba(59,130,246,0.1); color:var(--secondary); font-weight:700; white-space:nowrap;">+/- Simge</span>
                `}
                <div style="display:inline-flex; gap:2px;">
                    <button type="button" class="action-btn" onclick="moveModalCriterion(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity:0.3; cursor:default;"' : 'title="Yukarı Taşı"'}><i class="fas fa-arrow-up"></i></button>
                    <button type="button" class="action-btn" onclick="moveModalCriterion(${idx}, 1)" ${idx === _tempModalCriteria.length - 1 ? 'disabled style="opacity:0.3; cursor:default;"' : 'title="Aşağı Taşı"'}><i class="fas fa-arrow-down"></i></button>
                </div>
                <button type="button" class="action-btn btn-delete" onclick="removeModalCriterion(${idx})" title="Kriteri Sil" style="padding:5px 8px; font-size:11px;">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            listContainer.appendChild(row);
        });

        if (summaryBadge) {
            if (_tempModalEvalType === 'score') {
                const isHundred = totalMax === 100;
                summaryBadge.innerHTML = `Toplam: <strong>${totalMax} Puan</strong> ${isHundred ? '✅ (100 Tam)' : '⚠️ (100 Önerilir)'}`;
                summaryBadge.style.background = isHundred ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
                summaryBadge.style.color = isHundred ? 'var(--accent)' : 'var(--yellow)';
            } else {
                summaryBadge.innerHTML = `${_tempModalCriteria.length} Kontrol Sütunu`;
                summaryBadge.style.background = 'rgba(59,130,246,0.12)';
                summaryBadge.style.color = 'var(--secondary)';
            }
        }

        if (distributeBtn) {
            distributeBtn.style.display = (_tempModalEvalType === 'score') ? 'inline-block' : 'none';
        }
    }

    function updateModalCriterionName(idx, val) {
        if (_tempModalCriteria[idx]) {
            _tempModalCriteria[idx].name = val;
        }
    }

    function updateModalCriterionScore(idx, val) {
        if (_tempModalCriteria[idx]) {
            _tempModalCriteria[idx].maxScore = parseInt(val, 10) || 0;
            const summaryBadge = document.getElementById('chk-modal-criteria-summary');
            if (summaryBadge && _tempModalEvalType === 'score') {
                const totalMax = _tempModalCriteria.reduce((sum, c) => sum + (parseInt(c.maxScore) || 0), 0);
                const isHundred = totalMax === 100;
                summaryBadge.innerHTML = `Toplam: <strong>${totalMax} Puan</strong> ${isHundred ? '✅ (100 Tam)' : '⚠️ (100 Önerilir)'}`;
                summaryBadge.style.background = isHundred ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
                summaryBadge.style.color = isHundred ? 'var(--accent)' : 'var(--yellow)';
            }
        }
    }

    function addChecklistCriteriaModalRow() {
        const newIdx = _tempModalCriteria.length + 1;
        _tempModalCriteria.push({
            id: 'c_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: `Yeni Kriter ${newIdx}`,
            maxScore: _tempModalEvalType === 'score' ? 20 : 1
        });
        renderCriteriaModalRows();
    }

    function removeModalCriterion(idx) {
        if (_tempModalCriteria.length <= 1) {
            alert('En az bir kriter/sütun bulunmalıdır!');
            return;
        }
        const crit = _tempModalCriteria[idx];
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        let hasData = false;
        if (item && item.evaluations) {
            hasData = Object.values(item.evaluations).some(ev => ev && ev[crit.id] !== undefined && ev[crit.id] !== '');
        }
        if (hasData) {
            if (!confirm(`"${crit.name}" kriterine ait girilmiş öğrenci değerlendirmeleri bulunmaktadır. Bu kriteri silmek istediğinizden emin misiniz?`)) {
                return;
            }
        }
        _tempModalCriteria.splice(idx, 1);
        renderCriteriaModalRows();
    }

    function moveModalCriterion(idx, dir) {
        const targetIdx = idx + dir;
        if (targetIdx < 0 || targetIdx >= _tempModalCriteria.length) return;
        const temp = _tempModalCriteria[idx];
        _tempModalCriteria[idx] = _tempModalCriteria[targetIdx];
        _tempModalCriteria[targetIdx] = temp;
        renderCriteriaModalRows();
    }

    function distributeChecklistCriteriaModalScores() {
        if (!_tempModalCriteria || _tempModalCriteria.length === 0) return;
        const equalShare = Math.floor(100 / _tempModalCriteria.length);
        _tempModalCriteria.forEach((c, idx) => {
            c.maxScore = (idx === _tempModalCriteria.length - 1)
                ? (100 - equalShare * (_tempModalCriteria.length - 1))
                : equalShare;
        });
        renderCriteriaModalRows();
    }

    function saveChecklistCriteriaConfig() {
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;

        if (!_tempModalCriteria || _tempModalCriteria.length === 0) {
            alert('En az bir kriter tanımlamalısınız!');
            return;
        }

        // Boş isim kontrolü
        for (let i = 0; i < _tempModalCriteria.length; i++) {
            const trimmed = (_tempModalCriteria[i].name || '').trim();
            if (!trimmed) {
                alert(`${i + 1}. kriterin başlığı boş bırakılamaz!`);
                return;
            }
            _tempModalCriteria[i].name = trimmed;
        }

        // Kontrol modunda simgelerin doğrulaması
        if (_tempModalEvalType === 'check') {
            if (!_tempModalSymbols || _tempModalSymbols.length === 0) {
                alert('En az bir değerlendirme simgesi tanımlamalısınız!');
                return;
            }
            for (let i = 0; i < _tempModalSymbols.length; i++) {
                const sym = _tempModalSymbols[i];
                const keyTrimmed = (sym.key || '').trim();
                if (!keyTrimmed) {
                    alert(`${i + 1}. simgenin karakteri boş bırakılamaz!`);
                    return;
                }
                sym.key = keyTrimmed;
            }
            item.customSymbols = JSON.parse(JSON.stringify(_tempModalSymbols));
        }

        const wasEvalType = item.evalType;
        item.criteria = JSON.parse(JSON.stringify(_tempModalCriteria));
        item.evalType = _tempModalEvalType;

        // EvalType değiştiyse dönüşüm ve toplamları güncelle
        if (wasEvalType !== item.evalType && item.evaluations) {
            Object.keys(item.evaluations).forEach(studentName => {
                const sEval = item.evaluations[studentName];
                if (!sEval) return;
                if (item.evalType === 'score') {
                    // check'ten score'a geçiş: '+' veya pozitif olanlara maxScore ver
                    const symbols = getChecklistSymbols(item);
                    const posKeys = symbols.filter(s => s.isPositive).map(s => s.key);
                    let total = 0;
                    let hasAny = false;
                    item.criteria.forEach(c => {
                        if (posKeys.includes(sEval[c.id]) || sEval[c.id] === '+') {
                            sEval[c.id] = c.maxScore;
                            total += c.maxScore;
                            hasAny = true;
                        } else if (typeof sEval[c.id] === 'number') {
                            total += sEval[c.id];
                            hasAny = true;
                        }
                    });
                    sEval.total = hasAny ? total : null;
                } else {
                    // score'dan check'e geçiş: pozitif puan varsa ilk pozitif simgeyi yap
                    const symbols = getChecklistSymbols(item);
                    const firstPos = symbols.find(s => s.isPositive)?.key || symbols[0]?.key || '+';
                    item.criteria.forEach(c => {
                        const val = sEval[c.id];
                        if (typeof val === 'number' && val > 0) {
                            sEval[c.id] = firstPos;
                        }
                    });
                }
            });
        } else if (item.evalType === 'score' && item.evaluations) {
            // Puanlı modda kriter puanları değiştiyse toplamları yeniden hesapla
            Object.keys(item.evaluations).forEach(studentName => {
                const sEval = item.evaluations[studentName];
                if (!sEval) return;
                let total = 0;
                let hasAny = false;
                item.criteria.forEach(c => {
                    const val = sEval[c.id];
                    if (val !== undefined && val !== null && !isNaN(val) && val !== '') {
                        total += Number(val);
                        hasAny = true;
                    }
                });
                sEval.total = hasAny ? total : null;
            });
        }

        closeChecklistCriteriaConfigModal();
        renderChecklistModalTable();
        renderChecklistList();

        if (typeof window.invalidateChecklistSavedRef === 'function') {
            window.invalidateChecklistSavedRef(item.firebaseKey || item.id);
        }
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('✅ Kriterler ve değerlendirme simgeleri başarıyla güncellendi!', 'success');
        }
    }

    // ── E-OKUL NOT FORMATINDA KOPYALAMA ──
    function copyEOkulGrades(id) {
        const item = getChecklistList().find(c => String(c.id) === String(id));
        if (!item) return;

        const students = getChecklistItemStudents(item);
        students.sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));

        const evals = item.evaluations || {};
        let lines = [];

        students.forEach(s => {
            const ev = evals[s.adSoyad];
            let grade = '';
            if (item.evalType === 'score') {
                grade = (ev && typeof ev.total === 'number') ? ev.total : '';
            } else {
                const symbols = getChecklistSymbols(item);
                const positiveKeys = symbols.filter(s => s.isPositive).map(s => s.key);
                let plusCount = 0;
                if (ev) {
                    item.criteria.forEach(c => { if (positiveKeys.includes(ev[c.id])) plusCount++; });
                }
                grade = item.criteria.length > 0 ? Math.round((plusCount / item.criteria.length) * 100) : '';
            }
            const safeNo = (typeof window.sanitizeFormula === 'function') ? window.sanitizeFormula(s.no || '') : (s.no || '');
            const safeGrade = (typeof window.sanitizeFormula === 'function') ? window.sanitizeFormula(grade) : grade;
            lines.push(`${safeNo}\t${safeGrade}`);
        });

        const copyText = lines.join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(copyText).then(() => {
                if (typeof showGlobalToast === 'function') {
                    showGlobalToast(`📋 ${students.length} öğrencinin notu e-Okul / Excel için panoya kopyalandı!`, 'success');
                } else {
                    alert('Notlar panoya kopyalandı! e-Okul hızlı not girişine yapıştırabilirsiniz.');
                }
            });
        } else {
            window.copyTextToClipboard ? window.copyTextToClipboard(copyText) : null;
        }
    }

    // ── MEB RESMİ A4 YAZDIRMA MOTORU ──
    function printChecklist(id) {
        const item = getChecklistList().find(c => String(c.id) === String(id));
        if (!item) return;

        const students = getChecklistItemStudents(item);
        students.sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));
        const evals = item.evaluations || {};

        const currentUser = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth().currentUser : null;
        const teacherName = (window.currentUser && window.currentUser.displayName) || (currentUser ? currentUser.email : 'Ders Öğretmeni');

        let rowsHtml = '';
        students.forEach((s, idx) => {
            const ev = evals[s.adSoyad] || {};
            let critTds = '';
            let totalText = '-';

            if (item.evalType === 'score') {
                item.criteria.forEach(c => {
                    critTds += `<td style="text-align:center; padding:5px;">${ev[c.id] !== undefined ? ev[c.id] : ''}</td>`;
                });
                totalText = (typeof ev.total === 'number') ? ev.total : '';
            } else {
                const symbols = getChecklistSymbols(item);
                const positiveKeys = symbols.filter(s => s.isPositive).map(s => s.key);
                item.criteria.forEach(c => {
                    const st = ev[c.id] || '';
                    critTds += `<td style="text-align:center; padding:5px; font-weight:bold;">${st}</td>`;
                });
                let plus = 0;
                item.criteria.forEach(c => { if (positiveKeys.includes(ev[c.id])) plus++; });
                totalText = `${plus}/${item.criteria.length}`;
            }

            rowsHtml += `
                <tr>
                    <td style="text-align:center; padding:5px;">${idx + 1}</td>
                    <td style="text-align:center; padding:5px; font-weight:bold;">${s.no || ''}</td>
                    <td style="padding:5px 8px; text-align:left;">${escapeHtml(s.adSoyad)}</td>
                    ${critTds}
                    <td style="text-align:center; padding:5px; font-weight:bold;">${totalText}</td>
                    <td style="padding:5px 8px; font-size:11px;">${escapeHtml(ev.note || '')}</td>
                </tr>
            `;
        });

        const printWindow = window.open('', '_blank');
        if (!printWindow) return alert('Lütfen tarayıcınızın açılır pencere (popup) engelleyicisini kapatın.');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>${escapeHtml(item.title)} - ${item.sinif}</title>
                <style>
                    @page { size: A4 landscape; margin: 12mm; }
                    body { font-family: "Segoe UI", Arial, sans-serif; font-size: 11px; color: #111; margin: 0; padding: 10px; }
                    .header { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #333; padding-bottom: 10px; }
                    .header h2 { margin: 0 0 4px 0; font-size: 16px; font-weight: bold; }
                    .header h3 { margin: 0 0 6px 0; font-size: 14px; font-weight: normal; }
                    .meta-grid { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 11.5px; font-weight: 600; }
                    table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                    th, td { border: 1px solid #444; padding: 4px; }
                    th { background-color: #f1f5f9; font-weight: bold; font-size: 10.5px; text-align: center; }
                    .signature-box { margin-top: 30px; display: flex; justify-content: space-between; padding: 0 40px; font-size: 12px; }
                    .sig-col { text-align: center; width: 200px; }
                    @media print {
                        body { padding: 0; }
                        button { display: none !important; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>T.C. MİLLÎ EĞİTİM BAKANLIĞI</h2>
                    <h3>${escapeHtml(item.title)}</h3>
                </div>
                <div class="meta-grid">
                    <div><strong>SINIF:</strong> ${item.sinif}</div>
                    <div><strong>TARİH / DÖNEM:</strong> ${item.date || '-'}</div>
                    <div><strong>TOPLAM ÖĞRENCİ:</strong> ${students.length}</div>
                    <div><strong>DERS ÖĞRETMENİ:</strong> ${escapeHtml(teacherName)}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width:30px;">SIRA</th>
                            <th style="width:45px;">NO</th>
                            <th style="text-align:left;">ÖĞRENCİ ADI SOYADI</th>
                            ${item.criteria.map(c => `
                                <th>${escapeHtml(c.name)}<br><span style="font-weight:normal; font-size:9.5px;">(${item.evalType === 'score' ? c.maxScore + ' P' : 'Simge'})</span></th>
                            `).join('')}
                            <th style="width:60px;">TOPLAM</th>
                            <th style="width:120px;">AÇIKLAMA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
                <div class="signature-box">
                    <div class="sig-col">
                        <p><strong>${escapeHtml(teacherName)}</strong></p>
                        <p>Ders Öğretmeni</p>
                        <br><p>İmza</p>
                    </div>
                    <div class="sig-col">
                        <p><strong>UYGUNDUR</strong></p>
                        <p>Okul Müdürü</p>
                        <br><p>İmza / Mühür</p>
                    </div>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // ── WHATSAPP / BİP ÖZET METNİ ──
    function buildChecklistSummaryText(id) {
        const item = getChecklistList().find(c => String(c.id) === String(id));
        if (!item) return '';

        const students = getChecklistItemStudents(item);
        students.sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));
        const evals = item.evaluations || {};

        let text = `📋 *${item.title.toUpperCase()}*\n🏫 *Sınıf:* ${item.sinif}\n📅 *Tarih:* ${item.date || '-'}\n📊 *Tür:* ${item.badge || 'Takip Çizelgesi'}\n`;

        if (item.evalType === 'score') {
            let evaluated = [];
            students.forEach(s => {
                const ev = evals[s.adSoyad];
                if (ev && typeof ev.total === 'number') {
                    evaluated.push(`🔹 ${s.no ? s.no + ' - ' : ''}${s.adSoyad}: *${ev.total} Puan*`);
                }
            });
            text += `\n🎯 *DEĞERLENDİRME SONUÇLARI (${evaluated.length} / ${students.length}):*\n` + (evaluated.length > 0 ? evaluated.join('\n') : 'Henüz not girilmedi.');
        } else {
            const symbols = getChecklistSymbols(item);
            const positiveKeys = symbols.filter(s => s.isPositive).map(s => s.key);
            let done = [];
            let missing = [];
            students.forEach(s => {
                const ev = evals[s.adSoyad];
                let isFull = true;
                if (!ev) isFull = false;
                else {
                    item.criteria.forEach(c => { if (!positiveKeys.includes(ev[c.id])) isFull = false; });
                }
                if (isFull) done.push(`✅ ${s.no ? s.no + ' - ' : ''}${s.adSoyad}`);
                else missing.push(`🔸 ${s.no ? s.no + ' - ' : ''}${s.adSoyad}`);
            });
            text += `\n✅ *EKSİKSİZ OLANLAR (${done.length} / ${students.length}):*\n` + (done.length > 0 ? done.join('\n') : 'Kayıt yok');
            text += `\n\n⚠️ *EKSİĞİ BULUNANLAR (${missing.length} / ${students.length}):*\n` + (missing.length > 0 ? missing.join('\n') : 'Herkes eksiksiz! 🎉');
        }

        return text;
    }

    function shareChecklistSummary(id) {
        const text = buildChecklistSummaryText(id);
        if (!text) return;
        window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
    }

    function shareChecklistSummaryBip(id) {
        const item = getChecklistList().find(c => String(c.id) === String(id));
        const text = buildChecklistSummaryText(id);
        if (!text) return;
        if (typeof window.shareViaBip === 'function') {
            window.shareViaBip(text, `${item?.sinif || ''} - ${item?.title || ''} Özeti`);
        } else {
            window.copyTextToClipboard ? window.copyTextToClipboard(text) : null;
            window.open('https://web.bip.com/', '_blank');
        }
    }

    function shareStudentChecklistResult(id, studentName, platform) {
        const item = getChecklistList().find(c => String(c.id) === String(id));
        if (!item) return;

        const ev = (item.evaluations && item.evaluations[studentName]) || {};
        let text = `👤 *ÖĞRENCİ TAKİP BİLGİLENDİRMESİ*\n📌 *Öğrenci:* ${studentName}\n📋 *Çalışma:* ${item.title}\n🏫 *Sınıf:* ${item.sinif}\n📅 *Tarih:* ${item.date || '-'}\n\n`;

        if (item.evalType === 'score') {
            text += `📊 *Kriter Puanları:*\n`;
            item.criteria.forEach(c => {
                const sc = ev[c.id] !== undefined ? ev[c.id] : 0;
                text += `▫️ ${c.name}: *${sc} / ${c.maxScore} Puan*\n`;
            });
            text += `\n⭐ *TOPLAM PUAN:* *${ev.total !== undefined ? ev.total : 0} / 100*`;
        } else {
            const symbols = getChecklistSymbols(item);
            text += `📊 *Durum Detayı:*\n`;
            item.criteria.forEach(c => {
                const st = ev[c.id] || '';
                const sym = symbols.find(s => s.key === st);
                let stIcon = 'Belirtilmedi';
                if (st) {
                    const label = sym ? (sym.label || sym.key) : st;
                    stIcon = `${sym?.isPositive ? '✅' : '🔸'} ${label} (${st})`;
                }
                text += `▫️ ${c.name}: *${stIcon}*\n`;
            });
        }

        if (ev.note) {
            text += `\n📝 *Öğretmen Notu:* ${ev.note}`;
        }

        if (platform === 'wa') {
            window.open(`https://api.whatsapp.com/send/?text=${encodeURIComponent(text)}`, '_blank');
        } else {
            if (typeof window.shareViaBip === 'function') {
                window.shareViaBip(text, `${studentName} - ${item.title}`);
            } else {
                window.copyTextToClipboard ? window.copyTextToClipboard(text) : null;
                window.open('https://web.bip.com/', '_blank');
            }
        }
    }

    // ── YENİ ÖĞRENCİ SENKRONİZASYONU ──
    function syncStudentsWithChecklists() {
        const checklists = getChecklistList();
        const allStudents = getStudentList();
        if (!Array.isArray(checklists) || !Array.isArray(allStudents)) return false;
        const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
        let changed = false;

        checklists.forEach(item => {
            if (!item || item.isArchived) return; // Arşivlenmişleri elleme
            const itemClassNorm = norm(item.sinif);
            const classStudents = allStudents.filter(s => norm(s.sinif) === itemClassNorm);
            if (classStudents.length === 0) return;

            // targetStudents null ise dinamik alır
            if (!item.targetStudents) return;

            if (Array.isArray(item.targetStudents)) {
                const inTarget = classStudents.filter(s => item.targetStudents.includes(s.adSoyad));
                const isClassWide = (inTarget.length >= classStudents.length - 2) ||
                    (classStudents.length > 0 && (inTarget.length / classStudents.length) >= 0.5);

                if (isClassWide) {
                    classStudents.forEach(s => {
                        if (s.adSoyad && !item.targetStudents.includes(s.adSoyad)) {
                            item.targetStudents.push(s.adSoyad);
                            changed = true;
                        }
                    });
                    const prevLen = item.targetStudents.length;
                    item.targetStudents = item.targetStudents.filter(name => allStudents.some(s => s.adSoyad === name));
                    if (item.targetStudents.length !== prevLen) changed = true;
                }
            }
        });

        if (changed) {
            setChecklistList(checklists);
            if (typeof saveData === 'function') saveData(true);
        }
        return changed;
    }

    function getChecklistItemStudents(item) {
        if (!item) return [];
        const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
        const itemClassNorm = norm(item.sinif);
        const classStudents = getStudentList().filter(s => s.sinif === item.sinif || norm(s.sinif) === itemClassNorm);

        if (!item.targetStudents || !Array.isArray(item.targetStudents) || item.targetStudents.length === 0) {
            return classStudents;
        }

        if (!item.isArchived) {
            const inTarget = classStudents.filter(s => item.targetStudents.includes(s.adSoyad));
            const isClassWide = (inTarget.length >= classStudents.length - 2) ||
                (classStudents.length > 0 && (inTarget.length / classStudents.length) >= 0.5);
            if (isClassWide) {
                classStudents.forEach(s => {
                    if (s.adSoyad && !item.targetStudents.includes(s.adSoyad)) {
                        item.targetStudents.push(s.adSoyad);
                    }
                });
                return classStudents;
            }
        }

        return classStudents.filter(s => item.targetStudents.includes(s.adSoyad));
    }

    // ── YARDIMCI GÜVENLİK METODLARI ──
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    function escapeAttr(str) {
        if (!str) return '';
        return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function distributeChecklistCriteriaEqually() {
        if (!_currentCriteria || _currentCriteria.length === 0) return;
        const count = _currentCriteria.length;
        const base = Math.floor(100 / count);
        const rem = 100 % count;
        _currentCriteria.forEach((c, idx) => {
            c.maxScore = base + (idx < rem ? 1 : 0);
        });
        renderCriteriaInputs();
    }

    function cancelChecklistEdit() {
        _editingChecklistId = null;
        const btn = document.getElementById('chk-submit-btn');
        if (btn) btn.innerHTML = '<i class="fas fa-check-circle"></i> Çizelgeyi Oluştur';
        const cancelBtn = document.getElementById('chk-cancel-edit-btn');
        if (cancelBtn) cancelBtn.style.display = 'none';
        const titleInput = document.getElementById('chk-title-input');
        if (titleInput) titleInput.value = '';
        onChecklistTemplateChange();
    }

    function printActiveChecklist() {
        if (_activeModalChecklistId) printChecklist(_activeModalChecklistId);
    }

    function copyActiveChecklistEOkul() {
        if (_activeModalChecklistId) copyEOkulGrades(_activeModalChecklistId);
    }

    function shareActiveChecklistWhatsApp() {
        if (_activeModalChecklistId) shareChecklistSummary(_activeModalChecklistId);
    }

    function shareActiveChecklistBiP() {
        if (_activeModalChecklistId) shareChecklistSummaryBip(_activeModalChecklistId);
    }

    function toggleActiveChecklistStatus() {
        if (!_activeModalChecklistId) return;
        const item = getChecklistList().find(c => String(c.id) === String(_activeModalChecklistId));
        if (!item) return;
        archiveChecklistItem(_activeModalChecklistId, !item.isArchived);
        closeChecklistModal();
    }

    function batchSetAllActiveChecklist(type) {
        batchSetAllChecklist(type);
    }

    // ── GLOBAL EXPORT ──
    window.CHECKLIST_TEMPLATES = CHECKLIST_TEMPLATES;
    window.initChecklistModule = initChecklistModule;
    window.onChecklistTemplateChange = onChecklistTemplateChange;
    window.onChecklistEvalTypeChange = onChecklistEvalTypeChange;
    window.updateCriterionField = updateCriterionField;
    window.addCriterion = addCriterion;
    window.addChecklistCriterion = addCriterion;
    window.removeCriterion = removeCriterion;
    window.distributeChecklistCriteriaEqually = distributeChecklistCriteriaEqually;
    window.cancelChecklistEdit = cancelChecklistEdit;
    window.updateChecklistClassContainer = updateChecklistClassContainer;
    window.toggleChecklistStudentList = toggleChecklistStudentList;
    window.toggleClassAllChecklistStudents = toggleClassAllChecklistStudents;
    window.selectAllInChecklistClass = selectAllInChecklistClass;
    window.addChecklistItem = addChecklistItem;
    window.saveChecklistForm = addChecklistItem;
    window.renderChecklistList = renderChecklistList;
    window.togglePassiveChecklists = togglePassiveChecklists;
    window.toggleChecklistPasifList = togglePassiveChecklists;
    window.deleteChecklistItem = deleteChecklistItem;
    window.archiveChecklistItem = archiveChecklistItem;
    window.editChecklistItem = editChecklistItem;
    window.openChecklistModal = openChecklistModal;
    window.closeChecklistModal = closeChecklistModal;
    window.setChecklistEvalSort = setChecklistEvalSort;
    window.toggleChecklistSort = setChecklistEvalSort;
    window.renderChecklistModalTable = renderChecklistModalTable;
    window.filterChecklistModalTable = renderChecklistModalTable;
    window.updateChecklistScoreCell = updateChecklistScoreCell;
    window.updateChecklistStatusCell = updateChecklistStatusCell;
    window.updateChecklistNote = updateChecklistNote;
    window.batchSetAllChecklist = batchSetAllChecklist;
    window.batchSetAllActiveChecklist = batchSetAllActiveChecklist;
    window.printActiveChecklist = printActiveChecklist;
    window.copyActiveChecklistEOkul = copyActiveChecklistEOkul;
    window.shareActiveChecklistWhatsApp = shareActiveChecklistWhatsApp;
    window.shareActiveChecklistBiP = shareActiveChecklistBiP;
    window.toggleActiveChecklistStatus = toggleActiveChecklistStatus;
    window.copyEOkulGrades = copyEOkulGrades;
    window.printChecklist = printChecklist;
    window.buildChecklistSummaryText = buildChecklistSummaryText;
    window.shareChecklistSummary = shareChecklistSummary;
    window.shareChecklistSummaryBip = shareChecklistSummaryBip;
    window.shareStudentChecklistResult = shareStudentChecklistResult;
    window.syncStudentsWithChecklists = syncStudentsWithChecklists;
    window.getChecklistItemStudents = getChecklistItemStudents;
    window.promptRenameChecklistCriterion = promptRenameChecklistCriterion;
    window.quickAddChecklistCriterion = quickAddChecklistCriterion;
    window.batchSetColumnChecklist = batchSetColumnChecklist;
    window.openChecklistCriteriaConfigModal = openChecklistCriteriaConfigModal;
    window.closeChecklistCriteriaConfigModal = closeChecklistCriteriaConfigModal;
    window.onChecklistCriteriaModalEvalTypeChange = onChecklistCriteriaModalEvalTypeChange;
    window.renderCriteriaModalRows = renderCriteriaModalRows;
    window.updateModalCriterionName = updateModalCriterionName;
    window.updateModalCriterionScore = updateModalCriterionScore;
    window.addChecklistCriteriaModalRow = addChecklistCriteriaModalRow;
    window.removeModalCriterion = removeModalCriterion;
    window.moveModalCriterion = moveModalCriterion;
    window.distributeChecklistCriteriaModalScores = distributeChecklistCriteriaModalScores;
    window.saveChecklistCriteriaConfig = saveChecklistCriteriaConfig;
    window.renderModalSymbolsList = renderModalSymbolsList;
    window.updateModalSymbolField = updateModalSymbolField;
    window.addChecklistSymbolRow = addChecklistSymbolRow;
    window.removeModalSymbolRow = removeModalSymbolRow;
    window.applyChecklistSymbolPreset = applyChecklistSymbolPreset;
    window.getChecklistSymbols = getChecklistSymbols;
    window.CHECK_SYMBOL_PRESETS = CHECK_SYMBOL_PRESETS;
    window.DEFAULT_CHECK_SYMBOLS = DEFAULT_CHECK_SYMBOLS;

})();

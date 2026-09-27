// ============================================================
// ui-students.js
// Excel yükleme, XP, gözlem, grup yönetimi
// ============================================================

function loadExcel() {
    const fileInput = document.getElementById('excel-file'); const file = fileInput.files[0]; if (!file) return alert('Lütfen yüklemek için bir Excel veya CSV dosyası seçin!');
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result); const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]; const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
        let headerRowIndex = -1; let cols = { sira: -1, no: -1, ad: -1, soyad: -1, adSoyad: -1, sinif: -1 };
        for (let i = 0; i < rows.length; i++) {
            let foundHeaderCount = 0; let tempCols = { sira: -1, no: -1, ad: -1, soyad: -1, adSoyad: -1, sinif: -1 };
            rows[i].forEach((cell, index) => {
                if (!cell) return;
                let cleanStr = cell.toString().toLocaleLowerCase('tr-TR')
                    .replace(/ı/g, 'i')
                    .replace(/ş/g, 's')
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]/g, '');
                if (['no', 'okulno', 'ogrencino', 'numara'].includes(cleanStr)) { tempCols.no = index; foundHeaderCount++; }
                else if (['sira', 'sirano'].includes(cleanStr)) { tempCols.sira = index; foundHeaderCount++; }
                else if (['adsoyad', 'adisoyadi', 'isim', 'ogrenciadsoyad', 'ogrenciadisoyadi'].includes(cleanStr)) { tempCols.adSoyad = index; foundHeaderCount++; }
                else if (['ad', 'adi', 'ogrenciad', 'ogrenciadi'].includes(cleanStr)) { tempCols.ad = index; foundHeaderCount++; }
                else if (['soyad', 'soyadi', 'ogrencisoyad', 'ogrencisoyadi'].includes(cleanStr)) { tempCols.soyad = index; foundHeaderCount++; }
                else if (cleanStr.includes('sinif') || cleanStr.includes('sube')) { tempCols.sinif = index; foundHeaderCount++; }
            });
            if (foundHeaderCount >= 2) { headerRowIndex = i; cols = tempCols; break; }
        }
        if (headerRowIndex !== -1) {
            for (let i = headerRowIndex + 1; i < rows.length; i++) {
                const row = rows[i]; if (!row || row.length === 0 || row.every(c => c === "")) continue;
                let sSira = cols.sira !== -1 ? row[cols.sira] : (studentData.length + 1);
                let sNo = (cols.no !== -1 && row[cols.no] !== undefined && row[cols.no] !== null) ? row[cols.no].toString().trim() : '';
                let sSinif = (cols.sinif !== -1 && row[cols.sinif] !== undefined && row[cols.sinif] !== null) ? row[cols.sinif].toString().trim() : '';
                let sAdSoyad = '';
                if (cols.adSoyad !== -1) {
                    sAdSoyad = (row[cols.adSoyad] !== undefined && row[cols.adSoyad] !== null) ? row[cols.adSoyad].toString().trim() : '';
                } else if (cols.ad !== -1) {
                    sAdSoyad = (row[cols.ad] !== undefined && row[cols.ad] !== null) ? row[cols.ad].toString().trim() : '';
                    if (cols.soyad !== -1 && row[cols.soyad] !== undefined && row[cols.soyad] !== null) {
                        sAdSoyad += ' ' + row[cols.soyad].toString().trim();
                    }
                } else {
                    sAdSoyad = 'Bilinmeyen Öğrenci';
                }
                if (sAdSoyad && sAdSoyad !== '') studentData.push({ sira: sSira, no: sNo, adSoyad: sAdSoyad, sinif: sSinif });
            }
            renderStudentTable(); saveData(); alert('Liste aktarıldı.');
        } else { alert("Hata: Excel formatı tam çözümlenemedi."); }
        fileInput.value = '';
    };
    reader.readAsArrayBuffer(file);
}

function migrateGroupsUI() {
    const cards = document.querySelectorAll('.group-card');
    cards.forEach(card => {
        if (!card.querySelector('.group-footer')) {
            const footer = document.createElement('div'); footer.className = 'group-footer';
            footer.innerHTML = `<button class="btn btn-purple" style="font-size:11px; padding:8px;" onclick="openGroupEvalModal(this)"><i class="fas fa-users-cog"></i> Grubu Değerlendir</button><div style="display:flex; gap:5px; align-items:flex-end;"><div class="student-multi-picker"><button type="button" class="picker-toggle" onclick="toggleStudentPicker(this)"><span class="picker-label">Öğrenci seç...</span><i class="fas fa-chevron-down picker-arrow"></i></button><div class="picker-dropdown" style="display:none;"><input type="text" class="picker-search-input" placeholder="Ara..." oninput="filterPickerItems(this)"><label class="picker-item picker-select-all"><input type="checkbox" class="picker-cb-all" onchange="toggleAllPickerItems(this)"> Tümünü Seç</label></div></div><button class="btn" onclick="addStudentToGroupUI(this)" style="padding:10px 15px; font-size:12px; white-space:nowrap;"><i class="fas fa-plus"></i> Ekle</button></div>`;
            card.appendChild(footer);
        }
        sortGroupByNo(card);
    });
}

// Bir group-card'ın ul'undaki öğrencileri öğrenci no'suna göre sıralar
function sortGroupByNo(groupCard) {
    const ul = groupCard.querySelector('ul');
    if (!ul) return;
    const items = Array.from(ul.querySelectorAll('li'));
    items.sort((a, b) => {
        const aSpan = a.querySelector('.student-name-text');
        const bSpan = b.querySelector('.student-name-text');
        const aName = aSpan ? (aSpan.getAttribute('data-name') || '') : '';
        const bName = bSpan ? (bSpan.getAttribute('data-name') || '') : '';

        const aStudent = studentData.find(s => s.adSoyad === aName) || {};
        const bStudent = studentData.find(s => s.adSoyad === bName) || {};

        let aNo = parseInt(aStudent.no);
        if (isNaN(aNo)) {
            const match = (aSpan ? aSpan.textContent : '').match(/\d+/);
            aNo = match ? parseInt(match[0]) : 0;
        }
        let bNo = parseInt(bStudent.no);
        if (isNaN(bNo)) {
            const match = (bSpan ? bSpan.textContent : '').match(/\d+/);
            bNo = match ? parseInt(match[0]) : 0;
        }

        if (aNo !== bNo) return aNo - bNo;
        return aName.localeCompare(bName, 'tr-TR');
    });
    items.forEach(li => ul.appendChild(li));
}

function generateGroups() {
    const selectedClass = document.getElementById('class-filter').value; if (!selectedClass) return alert('Lütfen önce işlem yapacağınız sınıfı seçin!');

    // Proje Gruplarındaki (İleri Çalışma) öğrencilerin listesi
    let advancedStudentNames = [];
    if (projeGruplariData && projeGruplariData.length > 0) {
        projeGruplariData.forEach(grup => {
            if (grup && grup.members) {
                grup.members.forEach(ogr => { if (ogr) advancedStudentNames.push(ogr.name); });
            }
        });
    }

    const filteredStudents = studentData.filter(s => s.sinif === selectedClass && !advancedStudentNames.includes(s.adSoyad));
    if (filteredStudents.length === 0) return alert('Bu sınıfa ait (proje/ileri düzey gruplar haricinde) öğrenci bulunamadı!');

    let groupSize = filteredStudents.length > 30 ? 6 : (filteredStudents.length > 20 ? 5 : 4);

    let visuals = filteredStudents.filter(s => s.vak === 'Görsel').sort(() => 0.5 - Math.random());
    let auditories = filteredStudents.filter(s => s.vak === 'İşitsel').sort(() => 0.5 - Math.random());
    let kinesthetics = filteredStudents.filter(s => s.vak === 'Kinestetik').sort(() => 0.5 - Math.random());
    let unknowns = filteredStudents.filter(s => !['Görsel', 'İşitsel', 'Kinestetik'].includes(s.vak)).sort(() => 0.5 - Math.random());

    let allShuffled = [];
    let totalLen = filteredStudents.length;
    for (let i = 0; i < totalLen; i++) {
        if (visuals.length > 0) allShuffled.push(visuals.pop());
        if (auditories.length > 0) allShuffled.push(auditories.pop());
        if (kinesthetics.length > 0) allShuffled.push(kinesthetics.pop());
        if (unknowns.length > 0) allShuffled.push(unknowns.pop());
    }

    let groups = [];
    for (let i = 0; i < allShuffled.length; i += groupSize) groups.push(allShuffled.slice(i, i + groupSize));
    // Her kümedeki öğrencileri öğrenci numarasına göre sırala
    groups.forEach(g => g.sort((a, b) => {
        const aNo = parseInt(a.no) || 0; const bNo = parseInt(b.no) || 0;
        if (aNo !== bNo) return aNo - bNo;
        return (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
    }));
    const container = document.getElementById('groups-container'); container.innerHTML = '';

    // Önceki sınıftan kalan rastgele grupları database'den siliyoruz ki yenisi yazılsın
    const safeClass = selectedClass.replace(/\//g, '_');
    if (typeof groupData === 'object') groupData[safeClass] = '';

    groups.forEach((group, index) => {
        let html = `<div class="group-card"><h3><input type="text" class="group-title-input" value="Küme ${index + 1}" oninput="this.setAttribute('value', this.value); saveData()"><button class="action-btn btn-delete" onclick="if(confirm('Kümeyi silmek istiyor musunuz?')){this.closest('.group-card').remove(); updateStudentPickers(); saveData();}" title="Küme Sil"><i class="fas fa-times"></i></button></h3><ul style="padding:0;list-style:none;">`;
        group.forEach(m => {
            html += `<li style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;">
                    <div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${m.adSoyad}" style="font-weight: 600; font-size: 14px;">${m.no} - ${m.adSoyad}</span>
                        <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${m.xp || 0} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${m.adSoyad}', 1)">+</button><button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${m.adSoyad}', -1)">-</button><button class="btn-mini-xp btn-mini-question" onclick="addXPByName('${m.adSoyad}', 5)"><i class="fas fa-question"></i></button>
                        </div></div>
                    <div style="display:flex; gap:8px; align-items:center;"><select class="role-select" onchange="this.querySelectorAll('option').forEach(o => o.value === this.value ? o.setAttribute('selected', 'selected') : o.removeAttribute('selected')); updateRoleColor(this); saveData()"><option value="">Görev...</option><option value="Proje Koordinatörü">Proje Koordinatörü</option><option value="Veri Analisti">Veri Analisti</option><option value="Ar-Ge Sorumlusu">Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler">Halkla İlişkiler</option><option value="Üye">Üye</option></select>
                        <button class="btn-remove-student" onclick="this.closest('li').remove(); updateStudentPickers(); saveData();"><i class="fas fa-user-minus"></i></button></div></li>`;
        });
        container.innerHTML += html + `</ul><div class="group-footer"><button class="btn btn-purple" style="font-size:11px; padding:8px;" onclick="openGroupEvalModal(this)"><i class="fas fa-users-cog"></i> Grubu Değerlendir</button><div style="display:flex; gap:5px; align-items:flex-end;"><div class="student-multi-picker"><button type="button" class="picker-toggle" onclick="toggleStudentPicker(this)"><span class="picker-label">Öğrenci seç...</span><i class="fas fa-chevron-down picker-arrow"></i></button><div class="picker-dropdown" style="display:none;"><input type="text" class="picker-search-input" placeholder="Ara..." oninput="filterPickerItems(this)"><label class="picker-item picker-select-all"><input type="checkbox" class="picker-cb-all" onchange="toggleAllPickerItems(this)"> Tümünü Seç</label></div></div><button class="btn" onclick="addStudentToGroupUI(this)" style="padding:10px 15px; font-size:12px; white-space:nowrap;"><i class="fas fa-plus"></i> Ekle</button></div></div></div>`;
    });
    updateStudentPickers(); saveData();
}

function autoAssignRoles() {
    const groupCards = document.querySelectorAll('.group-card ul'); if (groupCards.length === 0) return alert("Önce grupları oluşturmalısınız!");
    groupCards.forEach(ul => {
        const selects = ul.querySelectorAll('.role-select');
        selects.forEach((select, index) => {
            if (index === 0) select.value = 'Proje Koordinatörü';
            else if (index === 1) select.value = 'Veri Analisti';
            else if (index === 2) select.value = 'Ar-Ge Sorumlusu';
            else if (index === 3) select.value = 'Halkla İlişkiler';
            else if (index === 4) select.value = 'Ar-Ge Sorumlusu'; // 5'li grup: 2. Ar-Ge Sorumlusu
            else if (index === 5) select.value = 'Veri Analisti';    // 6'lı grup: 2. Veri Analisti
            else select.value = 'Üye';

            select.querySelectorAll('option').forEach(o => {
                if (o.value === select.value) o.setAttribute('selected', 'selected');
                else o.removeAttribute('selected');
            });

            updateRoleColor(select);
        });
    });
    saveData();
}

function updateRoleColor(selectElement) {
    const val = selectElement.value; selectElement.style.color = "white";
    if (val === 'Proje Koordinatörü') selectElement.style.backgroundColor = '#e74c3c';
    else if (val === 'Veri Analisti') selectElement.style.backgroundColor = '#3498db';
    else if (val === 'Ar-Ge Sorumlusu') { selectElement.style.backgroundColor = '#f1c40f'; selectElement.style.color = 'black'; }
    else if (val === 'Halkla İlişkiler') selectElement.style.backgroundColor = '#9b59b6';
    else if (val === 'Üye') selectElement.style.backgroundColor = '#7f8c8d';
    else { selectElement.style.backgroundColor = 'var(--input-bg)'; selectElement.style.color = 'var(--text-main)'; }
}

function addManualGroup() {
    const selectedClass = document.getElementById('class-filter').value; if (!selectedClass) return alert('Lütfen önce bir sınıf seçin!');
    const container = document.getElementById('groups-container'); const groupIndex = container.querySelectorAll('.group-card').length + 1;
    const groupCard = document.createElement('div'); groupCard.className = 'group-card';
    groupCard.innerHTML = `<h3><input type="text" class="group-title-input" value="Küme ${groupIndex}" oninput="this.setAttribute('value', this.value); saveData()"><button class="action-btn btn-delete" onclick="if(confirm('Kümeyi silmek istiyor musunuz?')){this.closest('.group-card').remove(); updateStudentPickers(); saveData();}" title="Küme Sil"><i class="fas fa-times"></i></button></h3><ul style="padding:0;list-style:none; min-height:30px;"></ul>
            <div class="group-footer"><button class="btn btn-purple" style="font-size:11px; padding:8px;" onclick="openGroupEvalModal(this)"><i class="fas fa-users-cog"></i> Grubu Değerlendir</button><div style="display:flex; gap:5px; align-items:flex-end;"><div class="student-multi-picker"><button type="button" class="picker-toggle" onclick="toggleStudentPicker(this)"><span class="picker-label">Öğrenci seç...</span><i class="fas fa-chevron-down picker-arrow"></i></button><div class="picker-dropdown" style="display:none;"><input type="text" class="picker-search-input" placeholder="Ara..." oninput="filterPickerItems(this)"><label class="picker-item picker-select-all"><input type="checkbox" class="picker-cb-all" onchange="toggleAllPickerItems(this)"> Tümünü Seç</label></div></div><button class="btn" onclick="addStudentToGroupUI(this)" style="padding:10px 15px; font-size:12px; white-space:nowrap;"><i class="fas fa-plus"></i> Ekle</button></div></div>`;
    container.appendChild(groupCard); updateStudentPickers(); saveData();
}
function clearAllGroups() {
    if (confirm('Tüm grupları silmek istediğinize emin misiniz?')) {
        const selectedClass = document.getElementById('class-filter').value;
        if (selectedClass && typeof groupData === 'object') {
            const safeClass = selectedClass.replace(/\//g, '_');
            groupData[safeClass] = '';
        }
        document.getElementById('groups-container').innerHTML = '';
        saveData();
    }
}

function generateHTMLFromGroups(groups) {
    let html = '';
    groups.forEach((group) => {
        let studentsHtml = '';
        if (group.students) {
            group.students.forEach(student => {
                const stuData = studentData.find(s => s.adSoyad === student.name);
                const xp = stuData ? (stuData.xp || 0) : 0;
                const displayNo = stuData ? stuData.no : "";
                studentsHtml += `<li style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;">
                        <div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${student.name}" style="font-weight: 600; font-size: 14px;">${displayNo} - ${student.name}</span>
                        <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${xp} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${student.name}', 1)">+</button><button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${student.name}', -1)">-</button><button class="btn-mini-xp btn-mini-question" onclick="addXPByName('${student.name}', 5)"><i class="fas fa-question"></i></button>
                        </div></div>
                    <div style="display:flex; gap:8px; align-items:center;"><select class="role-select" onchange="updateRoleColor(this)"><option value="">Görev...</option><option value="Proje Koordinatörü" ${student.role === 'Proje Koordinatörü' ? 'selected' : ''}>Proje Koordinatörü</option><option value="Veri Analisti" ${student.role === 'Veri Analisti' ? 'selected' : ''}>Veri Analisti</option><option value="Ar-Ge Sorumlusu" ${student.role === 'Ar-Ge Sorumlusu' ? 'selected' : ''}>Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler" ${student.role === 'Halkla İlişkiler' ? 'selected' : ''}>Halkla İlişkiler</option><option value="Üye" ${student.role === 'Üye' ? 'selected' : ''}>Üye</option></select>
                        <button class="btn-remove-student" onclick="this.closest('li').remove(); updateStudentPickers(); saveData();"><i class="fas fa-user-minus"></i></button></div></li>`;
            });
        }
        html += `<div class="group-card">
                <h3><input type="text" class="group-title-input" value="${group.title}" oninput="saveData()"><button class="action-btn btn-delete" onclick="if(confirm('Kümeyi silmek istiyor musunuz?')){this.closest('.group-card').remove(); updateStudentPickers(); saveData();}" title="Küme Sil"><i class="fas fa-times"></i></button></h3>
                <ul style="padding:0;list-style:none; min-height:30px;">${studentsHtml}</ul>
                <div class="group-footer"><button class="btn btn-purple" style="font-size:11px; padding:8px;" onclick="openGroupEvalModal(this)"><i class="fas fa-users-cog"></i> Grubu Değerlendir</button><div style="display:flex; gap:5px; align-items:flex-end;"><div class="student-multi-picker"><button type="button" class="picker-toggle" onclick="toggleStudentPicker(this)"><span class="picker-label">Öğrenci seç...</span><i class="fas fa-chevron-down picker-arrow"></i></button><div class="picker-dropdown" style="display:none;"><input type="text" class="picker-search-input" placeholder="Ara..." oninput="filterPickerItems(this)"><label class="picker-item picker-select-all"><input type="checkbox" class="picker-cb-all" onchange="toggleAllPickerItems(this)"> Tümünü Seç</label></div></div><button class="btn" onclick="addStudentToGroupUI(this)" style="padding:10px 15px; font-size:12px; white-space:nowrap;"><i class="fas fa-plus"></i> Ekle</button></div></div>
            </div>`;

    });
    return html;
}

function loadClassGroups(className) {
    const container = document.getElementById('groups-container');
    const advContainer = document.getElementById('advanced-groups-container');
    if (!className) {
        if (container) container.innerHTML = '';
        if (advContainer) advContainer.innerHTML = '';
        return;
    }

    // 1. İlgili sınıfın Kümelerini Yükle
    if (container) {
        const safeClass = className.replace(/\//g, '_');
        const data = (typeof groupData === 'object' ? groupData[safeClass] : '') || '';
        if (Array.isArray(data)) {
            container.innerHTML = generateHTMLFromGroups(data);
        } else {
            container.innerHTML = data;
        }
        if (typeof migrateGroupsUI === 'function') migrateGroupsUI();
        document.querySelectorAll('.role-select').forEach(sel => {
            if (typeof updateRoleColor === 'function') updateRoleColor(sel);
        });
    }

    // 2. Proje Gruplarını (Eğer bu sınıftan grup varsa) alt kısımda listele
    if (advContainer) {
        advContainer.innerHTML = '';
        let hasAdvanced = false;
        let advHtml = `<div style="width:100%; margin-top:20px; padding-top: 20px; border-top: 2px dashed var(--border);">
                           <h4 style="color:var(--accent); margin-bottom:15px; font-size:16px;">
                           <i class="fas fa-project-diagram me-2"></i>Proje Gruplarına Yönlendirilenler (${className})
                           </h4><div class="flex-grid">`;

        if (projeGruplariData && projeGruplariData.length > 0) {
            projeGruplariData.forEach((grup, index) => {
                if (grup.sinif === className && grup.members && grup.members.length > 0) {
                    hasAdvanced = true;
                    advHtml += `<div class="group-card" style="border-left: 4px solid var(--accent); background:rgba(139, 92, 246, 0.05);">
                            <h4 style="color:var(--accent); margin:0 0 10px 0; font-size:14px;"><i class="fas fa-star me-2"></i> ${grup.title}</h4>
                            <ul style="padding:0; list-style:none; margin:0;">`;
                    grup.members.forEach(ogr => {
                        advHtml += `<li style="padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 13px; color:var(--text-main);">${ogr.name}</li>`;
                    });
                    advHtml += `</ul></div>`;
                }
            });
        }
        advHtml += `</div></div>`;
        if (hasAdvanced) advContainer.innerHTML = advHtml;
    }
}

// ===== MOBİL UYUMLU ÇOKLU ÖĞRENCİ SEÇİCİ FONKSİYONLARI =====

// Dropdown aç/kapat
function toggleStudentPicker(toggleBtn) {
    const dropdown = toggleBtn.nextElementSibling;
    const arrow = toggleBtn.querySelector('.picker-arrow');
    const isOpen = dropdown.style.display !== 'none';
    // Tüm diğer açık dropdown'ları kapat
    document.querySelectorAll('.picker-dropdown').forEach(d => { d.style.display = 'none'; });
    document.querySelectorAll('.picker-arrow').forEach(a => a.classList.remove('open'));
    if (!isOpen) {
        dropdown.style.display = 'block';
        arrow.classList.add('open');
        // Arama kutusunu temizle ve odaklan
        const searchInput = dropdown.querySelector('.picker-search-input');
        if (searchInput) { searchInput.value = ''; filterPickerItems(searchInput); searchInput.focus(); }
    }
}

// Dropdown dışına tıklayınca kapat
document.addEventListener('click', function (e) {
    if (!e.target.closest('.student-multi-picker')) {
        document.querySelectorAll('.picker-dropdown').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.picker-arrow').forEach(a => a.classList.remove('open'));
    }
});

// Arama filtresi
function filterPickerItems(input) {
    const term = input.value.toLowerCase();
    const dropdown = input.closest('.picker-dropdown');
    dropdown.querySelectorAll('.picker-item:not(.picker-select-all)').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
}

// Tümünü seç toggle
function toggleAllPickerItems(cbAll) {
    const dropdown = cbAll.closest('.picker-dropdown');
    dropdown.querySelectorAll('.picker-cb:not(.picker-cb-all)').forEach(cb => {
        const item = cb.closest('.picker-item');
        if (item.style.display !== 'none') { cb.checked = cbAll.checked; item.classList.toggle('checked', cbAll.checked); }
    });
    updatePickerLabel(dropdown);
}

// Seçim etiketi güncelle
function updatePickerLabel(dropdown) {
    const picker = dropdown.closest('.student-multi-picker');
    const toggleBtn = picker.querySelector('.picker-toggle');
    const label = toggleBtn.querySelector('.picker-label');
    const checked = dropdown.querySelectorAll('.picker-cb:not(.picker-cb-all):checked');
    if (checked.length === 0) {
        label.textContent = 'Öğrenci seç...';
        toggleBtn.classList.remove('has-selection');
    } else {
        label.textContent = `${checked.length} öğrenci seçildi`;
        toggleBtn.classList.add('has-selection');
    }
}

function updateStudentPickers() {
    const selectedClass = document.getElementById('class-filter').value;
    const allStudentsInClass = studentData.filter(s => s.sinif === selectedClass);
    const assignedStudentNames = Array.from(document.querySelectorAll('.group-card li .student-name-text')).map(s => s.getAttribute('data-name') || s.textContent);
    const availableStudents = allStudentsInClass.filter(s => !assignedStudentNames.includes(s.adSoyad));

    document.querySelectorAll('.student-multi-picker').forEach(picker => {
        const dropdown = picker.querySelector('.picker-dropdown');
        const toggleBtn = picker.querySelector('.picker-toggle');
        const label = toggleBtn.querySelector('.picker-label');
        // Sabit öğeleri (arama ve tümünü seç) koru, öğrenci satırlarını yenile
        dropdown.querySelectorAll('.picker-item:not(.picker-select-all)').forEach(el => el.remove());
        dropdown.querySelector('.picker-cb-all').checked = false;
        label.textContent = 'Öğrenci seç...';
        toggleBtn.classList.remove('has-selection');
        availableStudents.forEach(s => {
            const lbl = document.createElement('label');
            lbl.className = 'picker-item';
            lbl.innerHTML = `<input type="checkbox" class="picker-cb" value="${s.adSoyad}"> ${s.no} - ${s.adSoyad}`;
            lbl.querySelector('input').addEventListener('change', function () {
                lbl.classList.toggle('checked', this.checked);
                updatePickerLabel(dropdown);
            });
            dropdown.appendChild(lbl);
        });
    });
}

function addStudentToGroupUI(btn) {
    const picker = btn.previousElementSibling.matches('.student-multi-picker')
        ? btn.previousElementSibling
        : btn.closest('.group-footer').querySelector('.student-multi-picker');
    if (!picker) return;
    const dropdown = picker.querySelector('.picker-dropdown');
    const checkedBoxes = Array.from(dropdown.querySelectorAll('.picker-cb:not(.picker-cb-all):checked'));
    if (checkedBoxes.length === 0) return;

    const groupCard = btn.closest('.group-card');
    const ul = groupCard.querySelector('ul');
    let added = false;

    checkedBoxes.forEach(cb => {
        const studentName = cb.value;
        const student = studentData.find(s => s.adSoyad === studentName);
        const xp = student ? (student.xp || 0) : 0;
        const displayNo = student ? student.no : '';
        const li = document.createElement('li');
        li.style = 'margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;';
        li.innerHTML = `<div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${studentName}" style="font-weight: 600; font-size: 14px;">${displayNo} - ${studentName}</span>
                    <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${xp} XP</span>
                        <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${studentName}', 1)">+</button>
                        <button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${studentName}', -1)">-</button>
                        <button class="btn-mini-xp btn-mini-question" onclick="addXPByName('${studentName}', 5)"><i class="fas fa-question"></i></button>
                    </div></div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <select class="role-select" onchange="updateRoleColor(this)"><option value="">Görev...</option><option value="Proje Koordinatörü">Proje Koordinatörü</option><option value="Veri Analisti">Veri Analisti</option><option value="Ar-Ge Sorumlusu">Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler">Halkla İlişkiler</option><option value="Üye">Üye</option></select>
                    <button class="btn-remove-student" onclick="this.closest('li').remove(); updateStudentPickers(); saveData();"><i class="fas fa-user-minus"></i></button>
                </div>`;
        ul.appendChild(li);
        added = true;
    });

    if (added) {
        sortGroupByNo(groupCard);
        // Dropdown'u kapat ve seçimleri sıfırla
        const dropdownEl = picker.querySelector('.picker-dropdown');
        dropdownEl.style.display = 'none';
        picker.querySelector('.picker-arrow').classList.remove('open');
        updateStudentPickers();
        saveData();
    }
}

function addXPByName(name, amount) {
    const idx = studentData.findIndex(s => s.adSoyad === name);
    if (idx !== -1) {
        if (!studentData[idx].xp) studentData[idx].xp = 0;
        studentData[idx].xp += amount;
        if (!studentData[idx].xpLogs) studentData[idx].xpLogs = [];
        studentData[idx].xpLogs.push({ reason: 'Küme / Grup Etkinliği', amount: amount, date: new Date().toISOString() });

        renderStudentTable();
        document.querySelectorAll('.group-card li').forEach(li => {
            const nameSpan = li.querySelector('.student-name-text'); if (nameSpan && (nameSpan.getAttribute('data-name') === name)) li.querySelector('.xp-badge').textContent = studentData[idx].xp + ' XP';
        });
        saveData();
    }
}

let currentGroupBtn = null;
function setGroupEvalStar(val) {
    document.getElementById('group-eval-star-val').value = val;
    document.querySelectorAll('#group-eval-stars i').forEach(el => {
        if (parseInt(el.getAttribute('data-val')) <= val) el.className = 'fas fa-star';
        else el.className = 'far fa-star';
    });
}
function openGroupEvalModal(btn) {
    currentGroupBtn = btn;
    const title = btn.closest('.group-card').querySelector('.group-title-input').value;
    document.getElementById('group-eval-title').textContent = title;
    setGroupEvalStar(0); document.getElementById('group-eval-xp').value = '10';
    document.getElementById('group-eval-modal').style.display = 'flex';
}
function saveGroupEval() {
    if (!currentGroupBtn) return;
    const amtStr = document.getElementById('group-eval-xp').value;
    const stars = parseInt(document.getElementById('group-eval-star-val').value);
    const amount = parseInt(amtStr); if (isNaN(amount)) return alert("Geçerli bir XP girin.");

    const names = Array.from(currentGroupBtn.closest('.group-card').querySelectorAll('li .student-name-text')).map(s => s.getAttribute('data-name'));
    const reason = 'Küme Toplu Etkinlik Puanı' + (stars > 0 ? ` (${stars} Yıldız)` : '');

    names.forEach(name => {
        const idx = studentData.findIndex(s => s.adSoyad === name);
        if (idx !== -1) {
            if (!studentData[idx].xp) studentData[idx].xp = 0;
            studentData[idx].xp += amount;
            if (!studentData[idx].xpLogs) studentData[idx].xpLogs = [];
            studentData[idx].xpLogs.push({ reason: reason, amount: amount, date: new Date().toISOString() });

            if (stars > 0) {
                if (!studentData[idx].gozlemler) studentData[idx].gozlemler = [];
                studentData[idx].gozlemler.unshift({ tarih: new Date().toLocaleString('tr-TR'), not: `Grup çalışmasında değerlendirildi: ${stars} Yıldız.` });
            }
        }
    });

    renderStudentTable();
    document.querySelectorAll('.group-card li').forEach(li => {
        const nameSpan = li.querySelector('.student-name-text');
        if (nameSpan) { const student = studentData.find(s => s.adSoyad === nameSpan.getAttribute('data-name')); if (student) li.querySelector('.xp-badge').textContent = (student.xp || 0) + ' XP'; }
    });
    saveData(); document.getElementById('group-eval-modal').style.display = 'none';
    alert(`Kümeye ${amount} XP ve ${stars} yıldız başarıyla eklendi.`);
}

let currentObsStudentIndex = -1;
function openObservationModal(index) {
    currentObsStudentIndex = index;
    const student = studentData[index];
    document.getElementById('obs-student-name').textContent = student.adSoyad;
    document.getElementById('obs-note').value = '';

    const historyDiv = document.getElementById('obs-history'); historyDiv.innerHTML = '';
    if (student.gozlemler && student.gozlemler.length > 0) {
        historyDiv.innerHTML = '<h5 style="margin:0 0 10px 0;">Geçmiş Gözlemler:</h5>';
        student.gozlemler.forEach(g => { historyDiv.innerHTML += `<div style="background:var(--input-bg); padding:8px; border-radius:5px; margin-bottom:5px; border:1px solid var(--border);"><div style="font-size:10px; color:var(--accent); font-weight:bold;">${g.tarih}</div><div>${g.not}</div></div>`; });
    } else { historyDiv.innerHTML = '<em>Henüz gözlem eklenmemiş.</em>'; }
    document.getElementById('observation-modal').style.display = 'flex';
}
function addObservationTag(tag) {
    const noteEl = document.getElementById('obs-note');
    if (noteEl.value) noteEl.value += `, ${tag}`; else noteEl.value = tag;
}
function addNegativeNote() {
    if (currentObsStudentIndex === -1) return;
    const deductionStr = prompt("Bu öğrenciye uygulanacak telafisi olmayan (-) puan miktarını girin (Örn: 10):", "10");
    if (!deductionStr) return;
    const amount = parseInt(deductionStr);
    if (isNaN(amount) || amount <= 0) return alert("Lütfen geçerli pozitif bir sayı girin.");

    const student = studentData[currentObsStudentIndex];

    // XP'den tamamen bağımsız alan
    if (student.artmayanNot === undefined || student.artmayanNot === null) student.artmayanNot = 0;
    student.artmayanNot += amount;

    // Kendi bağımsız log kaydı (xpLogs ile karışmıyor)
    if (!student.artmayanLogs) student.artmayanLogs = [];
    student.artmayanLogs.unshift({ tarih: new Date().toLocaleString('tr-TR'), miktar: amount });

    // Gözlem geçmişine de tarih damalı not düş
    if (!student.gozlemler) student.gozlemler = [];
    student.gozlemler.unshift({ tarih: new Date().toLocaleString('tr-TR'), not: `⛔ Artmayan - Not uygulandı: -${amount} Puan (Toplam: -${student.artmayanNot})` });

    saveData();
    renderStudentTable();
    document.getElementById('observation-modal').style.display = 'none';
    alert(`✅ "${student.adSoyad}" için ${amount} puanlık Artmayan Not kaydedildi.\nBu puan XP’yi etkilemez, tabloda ARTMAYAN sütununda gösterilir.`);
}

function saveObservation() {
    if (currentObsStudentIndex === -1) return;
    const note = document.getElementById('obs-note').value.trim();
    if (!note) return alert("Lütfen bir gözlem notu girin.");
    const student = studentData[currentObsStudentIndex];
    if (!student.gozlemler) student.gozlemler = [];
    student.gozlemler.unshift({ tarih: new Date().toLocaleString('tr-TR'), not: note });
    saveData(); document.getElementById('observation-modal').style.display = 'none'; alert("Gözlem kaydedildi.");
}


function addToSchedule() {
    const day = document.getElementById('schedule-day').value; const time = document.getElementById('schedule-time').value; const lesson = document.getElementById('schedule-lesson').value;
    if (!time || !lesson) return alert("Lütfen saat ve ders bilgisini girin!");
    scheduleData.push({ day, time, lesson }); scheduleData.sort((a, b) => a.time.localeCompare(b.time));
    renderSchedule(); saveData(); document.getElementById('schedule-time').value = ''; document.getElementById('schedule-lesson').value = '';
    if (Notification.permission !== 'granted') Notification.requestPermission();
}

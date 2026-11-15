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
            renderStudentTable(); 
            if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
            if (typeof renderTrackingList === 'function') renderTrackingList();
            if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();
            if (typeof renderChecklistList === 'function') renderChecklistList();
            saveData(); 
            alert('Liste aktarıldı.');
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

    const filteredStudents = studentData.filter(s => (s.sinif === selectedClass || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(selectedClass))) && !advancedStudentNames.includes(s.adSoyad));
    if (filteredStudents.length === 0) return alert('Bu sınıfa ait (proje/ileri düzey gruplar haricinde) öğrenci bulunamadı!');

    let groupSize = filteredStudents.length > 30 ? 6 : (filteredStudents.length > 20 ? 5 : 4);
    let numGroups = Math.ceil(filteredStudents.length / groupSize);

    // FAZ 3: Öğrencileri rastgele yerine XP (Soru çözüm istikrarı) puanlarına göre sıralıyoruz (Büyükten küçüğe)
    const sortByXpDesc = (a, b) => (parseInt(b.xp) || 0) - (parseInt(a.xp) || 0);
    
    let visuals = filteredStudents.filter(s => s.vak === 'Görsel').sort(sortByXpDesc);
    let auditories = filteredStudents.filter(s => s.vak === 'İşitsel').sort(sortByXpDesc);
    let kinesthetics = filteredStudents.filter(s => s.vak === 'Kinestetik').sort(sortByXpDesc);
    let unknowns = filteredStudents.filter(s => !['Görsel', 'İşitsel', 'Kinestetik'].includes(s.vak)).sort(sortByXpDesc);

    // VAK dengesini bozmadan en yüksek XP'lilerden en düşük XP'lilere doğru sıraya dizme
    let allSorted = [];
    let totalLen = filteredStudents.length;
    for (let i = 0; i < totalLen; i++) {
        if (visuals.length > 0) allSorted.push(visuals.shift());
        if (auditories.length > 0) allSorted.push(auditories.shift());
        if (kinesthetics.length > 0) allSorted.push(kinesthetics.shift());
        if (unknowns.length > 0) allSorted.push(unknowns.shift());
    }

    // Gruplara kart dağıtır gibi (Round-Robin) dağıtıyoruz.
    // Böylece her grupta hem Yüksek XP hem Düşük XP'li öğrenciler (Akademik Homojenlik) 
    // hem de farklı VAK profilleri (Öğrenme Stili Homojenliği) dengeli şekilde yer alacak.
    let groups = Array.from({ length: numGroups }, () => []);
    let groupIndex = 0;
    allSorted.forEach(student => {
        groups[groupIndex].push(student);
        groupIndex = (groupIndex + 1) % numGroups;
    });

    // Her kümedeki öğrencileri öğrenci numarasına göre sırala (görünüm için)
    groups.forEach(g => g.sort((a, b) => {
        const aNo = parseInt(a.no) || 0; const bNo = parseInt(b.no) || 0;
        if (aNo !== bNo) return aNo - bNo;
        return (a.adSoyad || '').localeCompare(b.adSoyad || '', 'tr-TR');
    }));
    const container = document.getElementById('groups-container');
    if (container) container.innerHTML = '';

    // Önceki sınıftan kalan rastgele grupları database'den siliyoruz ki yenisi yazılsın
    const safeClass = selectedClass.replace(/\//g, '_');
    if (typeof groupData === 'object') groupData[safeClass] = [];

    let allGroupsHtml = '';
    groups.forEach((group, index) => {
        let html = `<div class="group-card"><h3><input type="text" class="group-title-input" value="Küme ${index + 1}" oninput="this.setAttribute('value', this.value); saveData()"><button class="action-btn btn-delete" onclick="if(confirm('Kümeyi silmek istiyor musunuz?')){this.closest('.group-card').remove(); updateStudentPickers(); saveData();}" title="Küme Sil"><i class="fas fa-times"></i></button></h3><ul style="padding:0;list-style:none;">`;
        group.forEach(m => {
            const escapedAd = (typeof escapeHTML === 'function') ? escapeHTML(m.adSoyad || '') : (m.adSoyad || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            const safeJsAd = (m.adSoyad || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
            html += `<li style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;">
                    <div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${escapedAd}" style="font-weight: 600; font-size: 14px;">${m.no ? (m.no + ' - ') : ''}${escapedAd}</span>
                        <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${m.xp || 0} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${safeJsAd}', 1)">+</button><button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${safeJsAd}', -1)">-</button><button class="btn-mini-xp btn-mini-question" onclick="addXPByName('${safeJsAd}', 5)"><i class="fas fa-question"></i></button>
                        </div></div>
                    <div style="display:flex; gap:8px; align-items:center;"><select class="role-select" onchange="this.querySelectorAll('option').forEach(o => o.value === this.value ? o.setAttribute('selected', 'selected') : o.removeAttribute('selected')); updateRoleColor(this); saveData()"><option value="">Görev...</option><option value="Proje Koordinatörü">Proje Koordinatörü</option><option value="Veri Analisti">Veri Analisti</option><option value="Ar-Ge Sorumlusu">Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler">Halkla İlişkiler</option><option value="Üye">Üye</option></select>
                        <button class="btn-remove-student" onclick="if(confirm('Öğrenciyi kümeden silmek istiyor musunuz?')){this.closest('li').remove(); updateStudentPickers(); saveData();}"><i class="fas fa-user-minus"></i></button></div></li>`;
        });
        allGroupsHtml += html + `</ul><div class="group-footer"><button class="btn btn-purple" style="font-size:11px; padding:8px;" onclick="openGroupEvalModal(this)"><i class="fas fa-users-cog"></i> Grubu Değerlendir</button><div style="display:flex; gap:5px; align-items:flex-end;"><div class="student-multi-picker"><button type="button" class="picker-toggle" onclick="toggleStudentPicker(this)"><span class="picker-label">Öğrenci seç...</span><i class="fas fa-chevron-down picker-arrow"></i></button><div class="picker-dropdown" style="display:none;"><input type="text" class="picker-search-input" placeholder="Ara..." oninput="filterPickerItems(this)"><label class="picker-item picker-select-all"><input type="checkbox" class="picker-cb-all" onchange="toggleAllPickerItems(this)"> Tümünü Seç</label></div></div><button class="btn" onclick="addStudentToGroupUI(this)" style="padding:10px 15px; font-size:12px; white-space:nowrap;"><i class="fas fa-plus"></i> Ekle</button></div></div></div>`;
    });
    if (container) container.innerHTML = allGroupsHtml;
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

function openKumeKagitFormu() {
    const sel = document.getElementById('class-filter') ? document.getElementById('class-filter').value : '';
    const teacherUid = window.currentUser?.uid || '';
    const teacherName = (document.getElementById('user-display-name')?.textContent || '').trim();
    
    // 1. Seçili sınıfın ekrandaki mevcut kümelerini anında topla ve kaydet
    let currentClassGroups = [];
    if (sel) {
        const container = document.getElementById('groups-container');
        if (container) {
            container.querySelectorAll('.group-card').forEach((card, idx) => {
                const titleInput = card.querySelector('.group-title-input');
                const title = titleInput ? titleInput.value : `Küme ${idx + 1}`;
                const students = [];
                card.querySelectorAll('li').forEach(li => {
                    const nameEl = li.querySelector('.student-name-text');
                    const name = nameEl ? (nameEl.getAttribute('data-name') || nameEl.textContent.split(' - ').pop().trim()) : '';
                    const selectEl = li.querySelector('.role-select');
                    const role = selectEl ? selectEl.value : '';
                    
                    // Öğrenci numarasını bul
                    let studentNo = '';
                    if (name) {
                        const sObj = (typeof studentData !== 'undefined') ? studentData.find(s => s.adSoyad === name) : null;
                        if (sObj) studentNo = sObj.no || '';
                        else if (nameEl) {
                            const match = nameEl.textContent.match(/^\s*(\d+)/);
                            if (match) studentNo = match[1];
                        }
                        students.push({ name, role, no: studentNo });
                    }
                });
                if (students.length > 0 || title) {
                    currentClassGroups.push({ title, students });
                }
            });

            // groupData ve depolamaya anında işle
            const safeClass = sel.replace(/\//g, '_');
            if (typeof groupData !== 'object' || groupData === null) groupData = {};
            if (currentClassGroups.length > 0) {
                groupData[safeClass] = currentClassGroups;
                groupData[sel] = currentClassGroups;
            }

            // Seçili sınıfın ham öğrenci listesini de filtrele ve hazırla
            const classStudents = (typeof studentData !== 'undefined')
                ? studentData.filter(s => s.sinif === sel || String(s.sinif).replace(/[\/_-]/g, '') === String(sel).replace(/[\/_-]/g, ''))
                : [];

            try {
                // Hem sessionStorage hem de localStorage'a tüm okul/öğretmen verisini yaz (Sınıf geçişleri için)
                sessionStorage.setItem('kume_form_sinif', sel);
                sessionStorage.setItem('kume_form_groups', JSON.stringify(typeof groupData === 'object' && groupData !== null ? groupData : {}));
                sessionStorage.setItem('kume_form_students', JSON.stringify(typeof studentData !== 'undefined' ? studentData : []));
                sessionStorage.setItem('kume_form_teacher', teacherName);

                localStorage.setItem('kume_form_sinif', sel);
                localStorage.setItem('kume_form_groups', JSON.stringify(typeof groupData === 'object' && groupData !== null ? groupData : {}));
                localStorage.setItem('kume_form_students', JSON.stringify(typeof studentData !== 'undefined' ? studentData : []));
                localStorage.setItem('kume_form_teacher', teacherName);

                if (typeof saveDataLocal === 'function') saveDataLocal();
                else if (typeof saveData === 'function') saveData();
            } catch (e) {
                console.warn('Küme formu önbellek hatası:', e);
            }
        }
    }

    const params = [];
    if (sel) params.push('sinif=' + encodeURIComponent(sel));
    if (teacherUid) params.push('uid=' + encodeURIComponent(teacherUid));
    if (teacherName) params.push('ogretmen=' + encodeURIComponent(teacherName));

    const url = 'Sinif_Kume_Kagit_Formu.html' + (params.length > 0 ? '?' + params.join('&') : '');
    window.open(url, '_blank');
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
                const safeName = (typeof window.escapeHtml === 'function') ? window.escapeHtml(student.name) : student.name;
                const safeJsName = (typeof window.escapeJs === 'function') ? window.escapeJs(student.name) : student.name.replace(/['"]/g, '');
                const safeAttr = (typeof window.escapeAttr === 'function') ? window.escapeAttr(student.name) : student.name;
                studentsHtml += `<li style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;">
                        <div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${safeAttr}" style="font-weight: 600; font-size: 14px;">${displayNo ? displayNo + ' - ' : ''}${safeName}</span>
                        <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${xp} XP</span>
                            <button class="btn-mini-xp btn-mini-plus" onclick="addXPByName('${safeJsName}', 1)">+</button><button class="btn-mini-xp btn-mini-minus" onclick="addXPByName('${safeJsName}', -1)">-</button><button class="btn-mini-xp btn-mini-question" onclick="addXPByName('${safeJsName}', 5)"><i class="fas fa-question"></i></button>
                        </div></div>
                    <div style="display:flex; gap:8px; align-items:center;"><select class="role-select" onchange="updateRoleColor(this)"><option value="">Görev...</option><option value="Proje Koordinatörü" ${student.role === 'Proje Koordinatörü' ? 'selected' : ''}>Proje Koordinatörü</option><option value="Veri Analisti" ${student.role === 'Veri Analisti' ? 'selected' : ''}>Veri Analisti</option><option value="Ar-Ge Sorumlusu" ${student.role === 'Ar-Ge Sorumlusu' ? 'selected' : ''}>Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler" ${student.role === 'Halkla İlişkiler' ? 'selected' : ''}>Halkla İlişkiler</option><option value="Üye" ${student.role === 'Üye' ? 'selected' : ''}>Üye</option></select>
                        <button class="btn-remove-student" onclick="if(confirm('Öğrenciyi kümeden silmek istiyor musunuz?')){this.closest('li').remove(); updateStudentPickers(); saveData();}"><i class="fas fa-user-minus"></i></button></div></li>`;
            });
        }
        const safeGroupTitle = (typeof window.escapeAttr === 'function') ? window.escapeAttr(group.title || '') : (group.title || '');
        html += `<div class="group-card">
                <h3><input type="text" class="group-title-input" value="${safeGroupTitle}" oninput="saveData()"><button class="action-btn btn-delete" onclick="if(confirm('Kümeyi silmek istiyor musunuz?')){this.closest('.group-card').remove(); updateStudentPickers(); saveData();}" title="Küme Sil"><i class="fas fa-times"></i></button></h3>
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
    const allStudentsInClass = studentData.filter(s => s.sinif === selectedClass || (window.normSinif && window.normSinif(s.sinif) === window.normSinif(selectedClass)));
    
    // Proje gruplarındaki (İleri Çalışma / Kulüp) öğrencileri filtrele
    let advancedStudentNames = [];
    if (typeof projeGruplariData !== 'undefined' && projeGruplariData && projeGruplariData.length > 0) {
        projeGruplariData.forEach(grup => {
            if (grup && grup.members) {
                grup.members.forEach(ogr => { if (ogr) advancedStudentNames.push(ogr.name); });
            }
        });
    }

    // SADECE #groups-container içindeki kümelerdeki öğrencileri topla
    const groupsContainer = document.getElementById('groups-container');
    const assignedStudentNames = groupsContainer
        ? Array.from(groupsContainer.querySelectorAll('.group-card li .student-name-text')).map(s => (s.getAttribute('data-name') || s.textContent.split(' - ').pop()).trim())
        : [];
    
    // Hem normal gruplara atanmış hem de proje gruplarına atanmış öğrencileri listeden çıkar
    const availableStudents = allStudentsInClass.filter(s => !assignedStudentNames.includes(s.adSoyad) && !advancedStudentNames.includes(s.adSoyad));

    // Debug: Sorun tespiti için konsola detaylı bilgi yaz
    console.log('[updateStudentPickers] Seçili sınıf:', selectedClass);
    console.log('[updateStudentPickers] Sınıftaki toplam öğrenci:', allStudentsInClass.length);
    console.log('[updateStudentPickers] Kümelere atanmış öğrenci sayısı:', assignedStudentNames.length, assignedStudentNames);
    console.log('[updateStudentPickers] Proje gruplarındaki öğrenci sayısı:', advancedStudentNames.length);
    console.log('[updateStudentPickers] Uygun (boşta) öğrenci sayısı:', availableStudents.length);

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
            const safeName = (typeof window.escapeHTML === 'function') ? window.escapeHTML(s.adSoyad) : s.adSoyad;
            const safeNo = s.no ? ((typeof window.escapeHTML === 'function') ? window.escapeHTML(s.no) : s.no) + ' - ' : '';
            lbl.innerHTML = `<input type="checkbox" class="picker-cb" value="${safeName}"> ${safeNo}${safeName}`;
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
        const escapedName = (typeof window.escapeHTML === 'function') ? window.escapeHTML(studentName) : studentName.replace(/"/g, '&quot;');
        const li = document.createElement('li');
        li.style = 'margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px;';
        li.innerHTML = `<div style="display:flex; flex-direction:column; gap:2px;"><span class="student-name-text" data-name="${escapedName}" style="font-weight: 600; font-size: 14px;">${displayNo} - ${escapedName}</span>
                    <div style="display:flex; align-items:center; gap:5px;"><span class="xp-badge" style="font-size:10px; padding:1px 5px;">${xp} XP</span>
                        <button type="button" class="btn-mini-xp btn-mini-plus">+</button>
                        <button type="button" class="btn-mini-xp btn-mini-minus">-</button>
                        <button type="button" class="btn-mini-xp btn-mini-question"><i class="fas fa-question"></i></button>
                    </div></div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <select class="role-select" onchange="updateRoleColor(this)"><option value="">Görev...</option><option value="Proje Koordinatörü">Proje Koordinatörü</option><option value="Veri Analisti">Veri Analisti</option><option value="Ar-Ge Sorumlusu">Ar-Ge Sorumlusu</option><option value="Halkla İlişkiler">Halkla İlişkiler</option><option value="Üye">Üye</option></select>
                    <button class="btn-remove-student" onclick="if(confirm('Öğrenciyi kümeden silmek istiyor musunuz?')){this.closest('li').remove(); updateStudentPickers(); saveData();}"><i class="fas fa-user-minus"></i></button>
                </div>`;
        const btnPlus = li.querySelector('.btn-mini-plus');
        const btnMinus = li.querySelector('.btn-mini-minus');
        const btnQuest = li.querySelector('.btn-mini-question');
        if (btnPlus) btnPlus.onclick = () => addXPByName(studentName, 1);
        if (btnMinus) btnMinus.onclick = () => addXPByName(studentName, -1);
        if (btnQuest) btnQuest.onclick = () => addXPByName(studentName, 5);
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
        const cur = parseInt(studentData[idx].xp, 10);
        const amt = parseInt(amount, 10) || 0;
        studentData[idx].xp = (isNaN(cur) ? 0 : cur) + amt;
        if (!studentData[idx].xpLogs) studentData[idx].xpLogs = [];
        studentData[idx].xpLogs.push({ reason: 'Küme / Grup Etkinliği', amount: amt, date: new Date().toISOString() });

        renderStudentTable();
        document.querySelectorAll('.group-card li').forEach(li => {
            const nameSpan = li.querySelector('.student-name-text');
            if (nameSpan && (nameSpan.getAttribute('data-name') === name)) {
                const badge = li.querySelector('.xp-badge');
                if (badge) badge.textContent = studentData[idx].xp + ' XP';
            }
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

// ══════════════════════════════════════════════════════════════════════════
// A4 KÜME FORMU OPTİK OKUYUCU & EL YAZISI TANIMA MOTORU (OCR & VISION AI)
// ══════════════════════════════════════════════════════════════════════════

let kumeOcrCameraStream = null;
let kumeOcrParsedClusters = [];
let kumeOcrActiveImageBase64 = null;
let kumeOcrActiveTab = 'file';

// 1. Modalı Aç
function openKumeOcrModal() {
    const classFilter = document.getElementById('class-filter');
    let selectedClass = classFilter ? classFilter.value : '';
    if (!selectedClass) {
        // Eğer sınıf seçilmemişse listedeki ilk geçerli sınıfı otomatik seç
        if (classFilter && classFilter.options.length > 1) {
            for (let i = 0; i < classFilter.options.length; i++) {
                if (classFilter.options[i].value) {
                    classFilter.selectedIndex = i;
                    selectedClass = classFilter.options[i].value;
                    if (typeof loadClassGroups === 'function') loadClassGroups(selectedClass);
                    break;
                }
            }
        }
    }

    if (!selectedClass) {
        alert("Lütfen önce yukarıdaki menüden işlem yapılacak sınıfı seçiniz veya sisteme öğrenci yükleyiniz!");
        if (classFilter) classFilter.focus();
        return;
    }

    const modal = document.getElementById('kume-ocr-modal');
    if (!modal) {
        console.error("kume-ocr-modal bulunamadı.");
        return;
    }

    // Sınıf rozetini ve mevcut öğrenci sayısını güncelle
    const classBadge = document.getElementById('kume-ocr-class-badge');
    const norm = (s) => String(s || '').replace(/[\/_\-\s]/g, '').trim().toUpperCase();
    const classStudents = (typeof studentData !== 'undefined')
        ? studentData.filter(s => s && (s.sinif === selectedClass || norm(s.sinif) === norm(selectedClass)))
        : [];

    if (classBadge) {
        classBadge.textContent = `${selectedClass} Sınıfı (${classStudents.length} Kayıtlı Öğrenci)`;
    }

    // Varsa kayıtlı Gemini API anahtarını yükle
    let savedKey = localStorage.getItem('GEMINI_API_KEY') || localStorage.getItem('gemini_api_key') || '';
    // Eğer tarayıcı otomatik doldurmasıyla yanlışlıkla kullanıcı giriş şifresi kaydedildiyse temizle
    if (savedKey && !savedKey.startsWith('AIzaSy')) {
        localStorage.removeItem('GEMINI_API_KEY');
        localStorage.removeItem('gemini_api_key');
        savedKey = '';
    }
    const keyInput = document.getElementById('kume-gemini-key-input');
    if (keyInput) keyInput.value = savedKey;

    setKumeOcrTab('file');
    resetKumeOcrScan();
    toggleKumeOcrEngineUI();

    modal.style.display = 'flex';
    window.addEventListener('paste', handleKumeOcrPaste);
}

// 2. Modalı Kapat
function closeKumeOcrModal() {
    stopKumeOcrCamera();
    window.removeEventListener('paste', handleKumeOcrPaste);
    const modal = document.getElementById('kume-ocr-modal');
    if (modal) modal.style.display = 'none';
}

window.openKumeOcrModal = openKumeOcrModal;
window.closeKumeOcrModal = closeKumeOcrModal;

// 3. Sekmeler Arası Geçiş (Dosya / Kamera / Yapıştır)
function setKumeOcrTab(tabName) {
    kumeOcrActiveTab = tabName;
    const fileArea = document.getElementById('kume-ocr-file-area');
    const cameraArea = document.getElementById('kume-ocr-camera-area');
    const pasteArea = document.getElementById('kume-ocr-paste-area');
    const btnFile = document.getElementById('btn-tab-ocr-file');
    const btnCamera = document.getElementById('btn-tab-ocr-camera');
    const btnPaste = document.getElementById('btn-tab-ocr-paste');

    if (fileArea) fileArea.style.display = (tabName === 'file') ? 'block' : 'none';
    if (cameraArea) cameraArea.style.display = (tabName === 'camera') ? 'block' : 'none';
    if (pasteArea) pasteArea.style.display = (tabName === 'paste') ? 'block' : 'none';

    const activeBg = "#4f46e5";
    const activeColor = "#ffffff";
    const inactiveBg = "#f1f5f9";
    const inactiveColor = "#475569";

    if (btnFile) {
        btnFile.style.background = (tabName === 'file') ? activeBg : inactiveBg;
        btnFile.style.color = (tabName === 'file') ? activeColor : inactiveColor;
    }
    if (btnCamera) {
        btnCamera.style.background = (tabName === 'camera') ? activeBg : inactiveBg;
        btnCamera.style.color = (tabName === 'camera') ? activeColor : inactiveColor;
    }
    if (btnPaste) {
        btnPaste.style.background = (tabName === 'paste') ? activeBg : inactiveBg;
        btnPaste.style.color = (tabName === 'paste') ? activeColor : inactiveColor;
    }

    if (tabName === 'camera') {
        startKumeOcrCamera();
    } else {
        stopKumeOcrCamera();
    }
}

// 4. Canlı Kamera Yönetimi
async function startKumeOcrCamera() {
    const video = document.getElementById('kume-ocr-video');
    if (!video) return;
    try {
        stopKumeOcrCamera();
        kumeOcrCameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });
        video.srcObject = kumeOcrCameraStream;
        await video.play();
    } catch (err) {
        console.warn("Kamera açılamadı:", err);
        alert("Kamera açılamadı: " + err.message + "\nLütfen 'Fotoğraf Yükle' seçeneğini kullanarak formu yükleyiniz.");
        setKumeOcrTab('file');
    }
}

function stopKumeOcrCamera() {
    if (kumeOcrCameraStream) {
        kumeOcrCameraStream.getTracks().forEach(t => t.stop());
        kumeOcrCameraStream = null;
    }
}

function captureKumeOcrFromCamera() {
    const video = document.getElementById('kume-ocr-video');
    if (!video || !video.videoWidth) {
        alert("Kamera görüntüsü henüz hazır değil, lütfen bir saniye bekleyiniz.");
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    stopKumeOcrCamera();
    processKumeOcrImage(dataUrl);
}

// 5. Dosya Yükleme & Sürükle Bırak
function handleKumeOcrFileSelect(input) {
    if (input.files && input.files[0]) {
        loadKumeOcrFile(input.files[0]);
        input.value = '';
    }
}

function handleKumeOcrDrop(e) {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files[0]) {
        loadKumeOcrFile(dt.files[0]);
    }
}

function loadKumeOcrFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert("Lütfen geçerli bir resim dosyası seçiniz (JPG, PNG, WEBP vb.).");
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        processKumeOcrImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

// 6. Panodan Yapıştırma (Ctrl+V)
function handleKumeOcrPaste(e) {
    const modal = document.getElementById('kume-ocr-modal');
    if (!modal || modal.style.display === 'none') return;

    const items = (e.clipboardData || window.clipboardData)?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = (ev) => {
                processKumeOcrImage(ev.target.result);
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
}

// 7. API Anahtarı ve UI Ayarları
function saveKumeGeminiKey(key, isUserClick = true) {
    const cleanKey = (key || '').trim();
    if (cleanKey) {
        localStorage.setItem('GEMINI_API_KEY', cleanKey);
        localStorage.setItem('gemini_api_key', cleanKey);
        if (isUserClick) {
            if (typeof showStatus === 'function') showStatus("Gemini API Anahtarı kaydedildi.", false);
            else alert("Gemini API Anahtarı kaydedildi.");
        }
    } else {
        localStorage.removeItem('GEMINI_API_KEY');
        localStorage.removeItem('gemini_api_key');
        if (isUserClick) {
            alert("Gemini API Anahtarı temizlendi.");
        }
    }
}

function toggleGeminiKeyVisibility() {
    const keyInput = document.getElementById('kume-gemini-key-input');
    const eyeIcon = document.getElementById('kume-gemini-key-eye');
    if (!keyInput) return;
    if (keyInput.type === 'password') {
        keyInput.type = 'text';
        if (eyeIcon) eyeIcon.className = 'fas fa-eye-slash';
    } else {
        keyInput.type = 'password';
        if (eyeIcon) eyeIcon.className = 'fas fa-eye';
    }
}
window.toggleGeminiKeyVisibility = toggleGeminiKeyVisibility;
window.saveKumeGeminiKey = saveKumeGeminiKey;

function toggleKumeOcrEngineUI() {
    const engine = document.querySelector('input[name="kume-ocr-engine"]:checked')?.value || 'hybrid';
    const keyWrap = document.getElementById('kume-ocr-apikey-wrap');
    if (keyWrap) {
        keyWrap.style.display = (engine === 'hybrid') ? 'flex' : 'none';
    }
}

function updateKumeOcrProgress(text, percent) {
    const progSec = document.getElementById('kume-ocr-progress-section');
    const statusText = document.getElementById('kume-ocr-status-text');
    const badge = document.getElementById('kume-ocr-percent-badge');
    const bar = document.getElementById('kume-ocr-progress-bar');

    if (progSec) progSec.style.display = 'block';
    if (statusText) statusText.innerHTML = text;
    if (badge) badge.textContent = `%${percent}`;
    if (bar) bar.style.width = `${percent}%`;
}

function resetKumeOcrScan() {
    const inputSec = document.getElementById('kume-ocr-input-section');
    const progSec = document.getElementById('kume-ocr-progress-section');
    const resSec = document.getElementById('kume-ocr-results-section');

    if (inputSec) inputSec.style.display = 'block';
    if (progSec) progSec.style.display = 'none';
    if (resSec) resSec.style.display = 'none';

    kumeOcrParsedClusters = [];
    kumeOcrActiveImageBase64 = null;
}

// ── YARDIMCI METİN & FUZZY EŞLEŞTİRME FONKSİYONLARI ──

// Türkçe Karakter Katlama & Normalizasyon (OCR karakter sapmalarını toleranslı kılar)
function foldTurkishText(str) {
    if (!str) return '';
    return String(str)
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '');
}

// Levenshtein Mesafesi Algoritması (Harf eksik/hatalı olsa bile en yakın ismi bulur)
function calcLevenshteinDist(a, b) {
    if (!a || !b) return (a || '').length + (b || '').length;
    const al = a.length;
    const bl = b.length;
    let prev = new Array(bl + 1);
    let curr = new Array(bl + 1);
    for (let j = 0; j <= bl; j++) prev[j] = j;

    for (let i = 1; i <= al; i++) {
        curr[0] = i;
        const ac = a[i - 1];
        for (let j = 1; j <= bl; j++) {
            const cost = ac === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(
                prev[j] + 1,       // silme
                curr[j - 1] + 1,   // ekleme
                prev[j - 1] + cost // değiştirme
            );
        }
        for (let j = 0; j <= bl; j++) prev[j] = curr[j];
    }
    return prev[bl];
}

// Benzerlik Oranı (0.0 - 1.0)
function calcStringSimilarity(s1, s2) {
    if (!s1 && !s2) return 1.0;
    if (!s1 || !s2) return 0.0;
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = calcLevenshteinDist(s1, s2);
    return Math.max(0, (maxLen - dist) / maxLen);
}

// OCR El Yazısı Rakam Düzeltme (Harf/Rakam Karışıklıklarını Düzeltme: O->0, l->1, S->5 vb.)
function cleanOcrDigitCandidate(word) {
    if (!word) return '';
    return String(word)
        .replace(/[Oo]/g, '0')
        .replace(/[Ili|!]/g, '1')
        .replace(/[Zz]/g, '2')
        .replace(/[Ss]/g, '5')
        .replace(/[Bb]/g, '8')
        .replace(/\D/g, '');
}

// Opsiyonel: Form Başlığındaki Barkodu Tespit Etme (Sınıfı Kağıttan Doğrulama)
async function detectKumeBarcodeFromImage(imageSource) {
    try {
        if ('BarcodeDetector' in window) {
            const detector = new BarcodeDetector({ formats: ['code_128', 'qr_code', 'code_39'] });
            const img = new Image();
            await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = imageSource; });
            const codes = await detector.detect(img);
            if (codes && codes.length > 0 && codes[0].rawValue) {
                return codes[0].rawValue;
            }
        }
    } catch (e) {
        console.debug("Kume form barkod taraması atlandı:", e);
    }
    return null;
}

// 8. Görsel İşleme ve Çift Kademeli OCR Motoru
async function processKumeOcrImage(imageSource) {
    kumeOcrActiveImageBase64 = imageSource;

    const inputSec = document.getElementById('kume-ocr-input-section');
    if (inputSec) inputSec.style.display = 'none';

    updateKumeOcrProgress('<i class="fas fa-magic fa-spin me-2"></i>Form görseli optimize ediliyor ve kalibre ediliyor...', 15);

    // Kağıt Formunda Barkod Varsa Sınıfı Otomatik Doğrula / Senkronize Et
    try {
        const detectedCode = await detectKumeBarcodeFromImage(imageSource);
        if (detectedCode && detectedCode.startsWith('KUME-')) {
            const rawClass = detectedCode.replace('KUME-', '').trim();
            const classSelect = document.getElementById('class-filter');
            if (classSelect && rawClass) {
                const norm = (s) => String(s || '').replace(/[\/_\-\s]/g, '').trim().toUpperCase();
                const matchedOption = Array.from(classSelect.options).find(opt => norm(opt.value) === norm(rawClass));
                if (matchedOption && classSelect.value !== matchedOption.value) {
                    console.log(`Barkoddan sınıf tespit edildi: ${matchedOption.value}`);
                    classSelect.value = matchedOption.value;
                    classSelect.dispatchEvent(new Event('change'));
                }
            }
        }
    } catch (e) {}

    // Aktif sınıftaki kayıtlı öğrenci listesini al
    const selectedClass = document.getElementById('class-filter')?.value || '';
    const norm = (s) => String(s || '').replace(/[\/_\-\s]/g, '').trim().toUpperCase();
    const classStudents = (typeof studentData !== 'undefined')
        ? studentData.filter(s => s && (s.sinif === selectedClass || norm(s.sinif) === norm(selectedClass)))
        : [];

    const engine = document.querySelector('input[name="kume-ocr-engine"]:checked')?.value || 'tesseract';
    const apiKey = localStorage.getItem('GEMINI_API_KEY') || localStorage.getItem('gemini_api_key') || document.getElementById('kume-gemini-key-input')?.value?.trim();

    // ── STRATEJİ A: GEMINI VISION AI (El Yazısı ve Türkçe için En Yüksek Doğruluk) ──
    if (engine === 'hybrid') {
        if (apiKey) {
            try {
                updateKumeOcrProgress('✨ <strong>Google Gemini AI:</strong> El yazıları ve küme tabloları analiz ediliyor...', 40);
                const geminiResult = await callGeminiVisionKumeOcr(imageSource, classStudents, selectedClass, apiKey);
                if (geminiResult && Array.isArray(geminiResult) && geminiResult.length > 0) {
                    updateKumeOcrProgress('✅ El yazıları başarıyla çözümlendi, eşleştirme tamamlandı!', 100);
                    setTimeout(() => {
                        renderKumeOcrResults(geminiResult, classStudents);
                    }, 400);
                    return;
                }
            } catch (err) {
                console.warn("Gemini Vision API çağrısı başarısız oldu, yerel Tesseract motoruna geçiliyor:", err);
                updateKumeOcrProgress('⚠️ Gemini API yanıt vermedi. Yerel Tesseract OCR motoruna aktarılıyor...', 35);
            }
        } else {
            updateKumeOcrProgress('ℹ️ Gemini API anahtarı bulunmadığından yerel Tesseract motoru devreye alınıyor...', 30);
        }
    }

    // ── STRATEJİ B: TESSERACT.JS (Çevrimdışı / Yerel Motor) + AKILLI ÖĞRENCİ LİSTESİ EŞLEŞTİRME ──
    try {
        updateKumeOcrProgress('⚡ <strong>Tesseract OCR Motoru:</strong> Metinler taranıyor...', 50);
        const tesseractResult = await runTesseractKumeOcr(imageSource, classStudents);
        updateKumeOcrProgress('✅ Optik karakter tanıma tamamlandı!', 100);
        setTimeout(() => {
            renderKumeOcrResults(tesseractResult, classStudents);
        }, 400);
    } catch (err) {
        console.error("OCR Hatası:", err);
        alert("Görsel taranırken bir hata oluştu: " + err.message);
        resetKumeOcrScan();
    }
}

// 9. Gemini Vision API ile Küme Formunu Okuma
async function callGeminiVisionKumeOcr(imageSource, classStudents, selectedClass, apiKey) {
    // Base64 veri ve MIME tipini ayıkla
    const parts = imageSource.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const base64Data = parts[1];

    const studentRosterStr = classStudents.map(s => `${s.no ? s.no + ' - ' : ''}${s.adSoyad}`).join(', ');

    const promptText = `Sen A4 Küme Yönetimi ve Grup Değerlendirme Formunu okuyan uzman bir optik karakter ve el yazısı tanıma (OCR) asistanısın.
Fotoğrafta 6 adet küme kartı vardır (KÜME 1, KÜME 2, KÜME 3, KÜME 4, KÜME 5, KÜME 6).
Her kümede bir "KÜME ADI" ve 6 satırlı tabloda öğrenciler yer alır.
Tablodaki sütunlar: Sıra, Okul No, Öğrenci Adı Soyadı, Görev/Rol (PK: Proje Koordinatörü, VA: Veri Analisti, AR: Ar-Ge Sorumlusu, HI: Halkla İlişkiler, Ü: Üye).

Bu sınıftaki (${selectedClass}) kayıtlı öğrenciler:
${studentRosterStr || 'Kayıtlı liste boş'}

GÖREV:
Görseldeki el yazılarını ve kutucuklardaki işaretlemeleri oku. İsimleri ve numaraları yukarıdaki sınıf listesindeki doğru öğrencilerle eşleştir.
YANIT FORMATI:
SADECE ve YALNIZCA geçerli bir JSON dizi formatı döndür. Açıklama metni, selamlama veya markdown kod bloğu (örn: \`\`\`json) yazma. Doğrudan [ ile başlayıp ] ile bitir:
[
  {
    "title": "1. Küme",
    "students": [
      { "no": "104", "name": "Ahmet Yılmaz", "role": "Proje Koordinatörü" }
    ]
  }
]`;

    // Gemini modelleri (Flash 1.5 -> Flash 2.0)
    const models = ['gemini-1.5-flash', 'gemini-2.0-flash'];
    let lastError = null;

    for (let model of models) {
        try {
            updateKumeOcrProgress(`✨ Gemini AI (${model}) el yazısını analiz ediyor...`, 65);
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: promptText },
                            {
                                inlineData: {
                                    mimeType: mimeType,
                                    data: base64Data
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        topK: 1
                    }
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const errMsg = errData?.error?.message || res.statusText;
                lastError = new Error(`HTTP ${res.status}: ${errMsg}`);
                continue;
            }

            const data = await res.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

            let parsed = null;
            const jsonMatch = cleaned.match(/\[\s*\{[\s\S]*\}\s*\]/);
            if (jsonMatch) {
                parsed = JSON.parse(jsonMatch[0]);
            } else {
                parsed = JSON.parse(cleaned);
            }

            if (Array.isArray(parsed) && parsed.length > 0) {
                return normalizeParsedClusters(parsed, classStudents);
            }
        } catch (e) {
            lastError = e;
        }
    }

    throw lastError || new Error("Gemini AI çıktısı JSON formatına dönüştürülemedi.");
}

// 10. Tesseract.js ile Yerel OCR ve Akıllı Eşleştirme Motoru
async function runTesseractKumeOcr(imageSource, classStudents) {
    if (typeof Tesseract === 'undefined') {
        throw new Error("Tesseract.js kütüphanesi henüz yüklenemedi. Lütfen internet bağlantınızı kontrol ediniz veya sayfayı yenileyiniz.");
    }

    // Görseli canvas üzerinde optimize et
    const img = new Image();
    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageSource;
    });

    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;
    const maxDim = 2000;
    if (width > maxDim || height > maxDim) {
        if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
        } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
        }
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    // Görüntü Ön-İşleme: Dinamik Kontrast Germe (Dynamic Contrast Stretching)
    // Beyaz kağıt arka planını parlak, kurşun ve tükenmez kalem el yazılarını netleştirir
    try {
        const imgData = ctx.getImageData(0, 0, width, height);
        const d = imgData.data;
        let minLum = 255;
        let maxLum = 0;

        for (let i = 0; i < d.length; i += 4) {
            const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            if (lum < minLum) minLum = lum;
            if (lum > maxLum) maxLum = lum;
        }

        const lumRange = Math.max(30, maxLum - minLum);
        for (let i = 0; i < d.length; i += 4) {
            const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            let normVal = ((gray - minLum) / lumRange) * 255;
            normVal = Math.min(255, Math.max(0, ((normVal - 128) * 1.35) + 128));
            d[i] = normVal;
            d[i + 1] = normVal;
            d[i + 2] = normVal;
        }
        ctx.putImageData(imgData, 0, 0);
    } catch (e) {
        console.warn("Görsel filtreleme atlandı:", e);
    }

    // Tesseract OCR Çalıştır
    const { data } = await Tesseract.recognize(canvas, 'tur+eng', {
        logger: m => {
            if (m.status === 'recognizing text') {
                const p = Math.round((m.progress || 0) * 45) + 45;
                updateKumeOcrProgress('⚡ Tesseract el yazıları ve karakterleri çözümlüyor...', p);
            }
        }
    });

    const fullText = data.text || '';
    // Bellek Temizliği: 16MB bitmap canvas alanını bellekten anında serbest bırak
    canvas.width = 0;
    canvas.height = 0;
    return parseTesseractTextToClusters(fullText, classStudents);
}

// 11. Tesseract Metnini 6 Kümeye Akıllıca Ayrıştırma (Levenshtein + Regex + Karakter Katlama)
function parseTesseractTextToClusters(fullText, classStudents) {
    const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
    const clusters = [];
    for (let i = 1; i <= 6; i++) {
        clusters.push({
            title: `${i}. Küme`,
            students: []
        });
    }

    const remainingStudents = [...classStudents];
    const assignedSet = new Set();

    // Satır bazında küme takibi: "K-01", "KÜME 1", "1. KÜME" vb. başlıklarını algıla
    let currentClusterIdx = 0;
    const lineClusterIndices = [];

    lines.forEach((line, lineIdx) => {
        const kMatch = line.match(/(?:k[\-_]?0?([1-6])|küme\s*([1-6])|([1-6])\.\s*küme)/i);
        if (kMatch) {
            const detectedNum = parseInt(kMatch[1] || kMatch[2] || kMatch[3], 10);
            if (detectedNum >= 1 && detectedNum <= 6) {
                currentClusterIdx = detectedNum - 1;
            }
        }
        lineClusterIndices[lineIdx] = currentClusterIdx;
    });

    // ── 1. AŞAMA: OKUL NUMARALARINI TESPİT ET (Regex + OCR Harf/Rakam Düzeltme) ──
    lines.forEach((line, lineIdx) => {
        const numMatches = line.match(/\b\d{2,5}\b/g) || [];

        // Kelimelerden OCR rakam adayı türet (Örn: 'l04' -> '104')
        const tokens = line.split(/[\s,;:|\-]+/).filter(t => t.length >= 2 && t.length <= 6);
        tokens.forEach(tok => {
            const candidate = cleanOcrDigitCandidate(tok);
            if (candidate && candidate.length >= 2 && candidate.length <= 5 && !numMatches.includes(candidate)) {
                numMatches.push(candidate);
            }
        });

        if (numMatches.length > 0) {
            numMatches.forEach(numStr => {
                const found = remainingStudents.find(s => String(s.no) === numStr && !assignedSet.has(s.no));
                if (found) {
                    assignedSet.add(found.no);
                    const cIdx = lineClusterIndices[lineIdx] ?? Math.min(5, Math.floor((lineIdx / Math.max(1, lines.length)) * 6));
                    clusters[cIdx].students.push({
                        no: found.no,
                        name: found.adSoyad,
                        role: detectRoleInLine(line)
                    });
                }
            });
        }
    });

    // ── 2. AŞAMA: LEVENSHTEIN MESAFE & FUZZY İSİM EŞLEŞTİRME ──
    remainingStudents.forEach(stu => {
        if (assignedSet.has(stu.no)) return;

        const stuTokens = (stu.adSoyad || '').split(/\s+/).filter(t => t.length >= 2);
        const foldedStuTokens = stuTokens.map(foldTurkishText);
        const foldedFullName = foldTurkishText(stu.adSoyad || '');

        let bestMatch = null;
        let bestScore = 0;
        let bestLineIdx = -1;

        lines.forEach((line, lIdx) => {
            const foldedLine = foldTurkishText(line);
            if (!foldedLine) return;

            // 1. Tam ad alt-dize eşleşmesi
            if (foldedFullName.length >= 4 && foldedLine.includes(foldedFullName)) {
                bestScore = 1.0;
                bestMatch = line;
                bestLineIdx = lIdx;
                return;
            }

            // 2. Token bazında Levenshtein fuzzy benzerliği
            const lineTokens = line.split(/[\s,;:|\-]+/).map(foldTurkishText).filter(t => t.length >= 2);
            let matchedTokenCount = 0;

            for (const sTok of foldedStuTokens) {
                let maxTokSim = 0;
                for (const lTok of lineTokens) {
                    if (lTok === sTok) {
                        maxTokSim = 1.0;
                        break;
                    }
                    if (Math.abs(lTok.length - sTok.length) <= 2) {
                        const sim = calcStringSimilarity(sTok, lTok);
                        if (sim > maxTokSim) maxTokSim = sim;
                    }
                }
                if (maxTokSim >= 0.75) {
                    matchedTokenCount++;
                }
            }

            const requiredMatches = Math.max(1, Math.ceil(foldedStuTokens.length * 0.65));
            if (matchedTokenCount >= requiredMatches) {
                const score = matchedTokenCount / foldedStuTokens.length;
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = line;
                    bestLineIdx = lIdx;
                }
            }
        });

        if (bestScore >= 0.65 && bestLineIdx !== -1) {
            assignedSet.add(stu.no);
            const cIdx = lineClusterIndices[bestLineIdx] ?? Math.min(5, Math.floor((bestLineIdx / Math.max(1, lines.length)) * 6));
            clusters[cIdx].students.push({
                no: stu.no || '',
                name: stu.adSoyad,
                role: detectRoleInLine(lines[bestLineIdx])
            });
        }
    });

    // ── 3. AŞAMA: KÜME BAŞLIKLARINI YENİDEN KONTROL ET & DÜZENLE ──
    lines.forEach((line) => {
        const kMatch = line.match(/(?:küme\s*([1-6])|([1-6])\.\s*küme)\s*[:\-]?\s*(.*)/i);
        if (kMatch) {
            const num = parseInt(kMatch[1] || kMatch[2], 10);
            const extraTitle = (kMatch[3] || '').trim();
            if (num >= 1 && num <= 6 && extraTitle.length > 2 && extraTitle.length < 35 && !extraTitle.toUpperCase().includes('ÖĞRENCİ')) {
                clusters[num - 1].title = extraTitle;
            }
        }
    });

    return normalizeParsedClusters(clusters, classStudents);
}

// Rol Kısaltmalarını Satırdan Yakala
function detectRoleInLine(lineStr) {
    const s = lineStr.toUpperCase();
    if (s.includes('PK') || s.includes('KOORD') || s.includes('YÖNETİCİ')) return 'Proje Koordinatörü';
    if (s.includes('VA') || s.includes('ANALİST') || s.includes('YAZICI')) return 'Veri Analisti';
    if (s.includes('AR') || s.includes('AR-GE') || s.includes('MALZEME')) return 'Ar-Ge Sorumlusu';
    if (s.includes('HI') || s.includes('İLİŞK') || s.includes('SÖZCÜ')) return 'Halkla İlişkiler';
    return 'Üye';
}

// 12. Parse Edilen Kümeleri Standart 6 Kümeye Tamamlama & Düzeltme
function normalizeParsedClusters(clusters, classStudents) {
    const normalized = [];
    const rolesCycle = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];

    for (let i = 1; i <= 6; i++) {
        const existing = clusters[i - 1] || null;
        const title = (existing && existing.title) ? existing.title : `${i}. Küme`;
        const rawStudents = (existing && Array.isArray(existing.students)) ? existing.students : [];

        const cleanStudents = rawStudents.map((st, sIdx) => {
            let sNo = st.no ? String(st.no).trim() : '';
            let sName = st.name ? String(st.name).trim() : '';
            let sRole = st.role ? String(st.role).trim() : (rolesCycle[sIdx] || 'Üye');

            // Eğer no yoksa ama isim sınıf listesinde varsa no'yu eşle
            if (!sNo && sName && classStudents.length > 0) {
                const match = classStudents.find(cs => cs.adSoyad.toLowerCase() === sName.toLowerCase());
                if (match) sNo = match.no || '';
            }

            return { no: sNo, name: sName, role: sRole };
        });

        normalized.push({
            title: title,
            students: cleanStudents
        });
    }

    return normalized;
}

// 13. Okunan Kümeleri Doğrulama Izgarasında Gösterme
function renderKumeOcrResults(clusters, classStudents) {
    kumeOcrParsedClusters = clusters;

    const progSec = document.getElementById('kume-ocr-progress-section');
    const resSec = document.getElementById('kume-ocr-results-section');
    const grid = document.getElementById('kume-ocr-cards-grid');

    if (progSec) progSec.style.display = 'none';
    if (resSec) resSec.style.display = 'block';
    if (!grid) return;

    // Sınıf mevcudu için otomatik tamamlama datalist oluştur / güncelle
    let datalist = document.getElementById('kume-ocr-students-datalist');
    if (!datalist) {
        datalist = document.createElement('datalist');
        datalist.id = 'kume-ocr-students-datalist';
        document.body.appendChild(datalist);
    }
    datalist.innerHTML = classStudents.map(cs => {
        const noPrefix = cs.no ? `${cs.no} - ` : '';
        return `<option value="${escapeHtml(cs.adSoyad)}">${noPrefix}${escapeHtml(cs.adSoyad)}</option>`;
    }).join('');

    grid.innerHTML = '';

    clusters.forEach((cluster, cIdx) => {
        const card = document.createElement('div');
        card.className = 'ocr-cluster-card';
        card.setAttribute('data-cluster-idx', cIdx);
        card.style.cssText = `
            background: var(--card-bg, #ffffff);
            border: 2px solid var(--border, #e2e8f0);
            border-radius: 12px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        `;

        let studentsRowsHtml = '';
        const students = cluster.students || [];

        students.forEach((stu, sIdx) => {
            const isMatched = classStudents.some(cs => (stu.no && String(cs.no) === String(stu.no)) || (stu.name && cs.adSoyad.toLowerCase() === stu.name.toLowerCase()));
            const matchBadge = isMatched
                ? `<span class="ocr-match-badge" style="color:#059669; font-weight:700; font-size:12px;" title="Kayıtlı öğrenci listesiyle doğrulandı">✔️</span>`
                : `<span class="ocr-match-badge" style="color:#f59e0b; font-weight:700; font-size:12px;" title="Yeni veya liste dışı öğrenci (Açılır listeden seçebilirsiniz)">⚠️</span>`;

            studentsRowsHtml += `
                <div class="ocr-student-row" style="display:flex; align-items:center; gap:6px; padding:4px 0; border-bottom:1px solid var(--border, #f1f5f9);">
                    <span style="font-size:11px; font-weight:700; color:var(--text-muted); width:16px;">${sIdx + 1}.</span>
                    <input type="text" class="ocr-student-no" value="${escapeHtml(stu.no || '')}" placeholder="No" style="width:48px; padding:4px 6px; font-size:12px; border-radius:6px; border:1px solid var(--border, #cbd5e1); text-align:center;">
                    <input type="text" class="ocr-student-name" list="kume-ocr-students-datalist" value="${escapeHtml(stu.name || '')}" placeholder="Öğrenci Adı Soyadı (Listeden Seç)" oninput="handleOcrStudentNameChange(this)" style="flex:1; padding:4px 8px; font-size:12px; border-radius:6px; border:1px solid var(--border, #cbd5e1);">
                    <select class="ocr-student-role" style="padding:4px 6px; font-size:11.5px; border-radius:6px; border:1px solid var(--border, #cbd5e1); max-width:115px;">
                        <option value="Proje Koordinatörü" ${stu.role.includes('Koord') || stu.role === 'PK' ? 'selected' : ''}>[PK] Koordinatör</option>
                        <option value="Veri Analisti" ${stu.role.includes('Analist') || stu.role === 'VA' ? 'selected' : ''}>[VA] Analist</option>
                        <option value="Ar-Ge Sorumlusu" ${stu.role.includes('Ar-Ge') || stu.role === 'AR' ? 'selected' : ''}>[AR] Ar-Ge</option>
                        <option value="Halkla İlişkiler" ${stu.role.includes('İlişkiler') || stu.role === 'HI' ? 'selected' : ''}>[HI] Halkla İliş.</option>
                        <option value="Üye" ${!stu.role || stu.role === 'Üye' || stu.role === 'Ü' ? 'selected' : ''}>[Ü] Üye</option>
                    </select>
                    ${matchBadge}
                    <button type="button" onclick="this.closest('.ocr-student-row').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding:2px;" title="Öğrenciyi Sil">&times;</button>
                </div>
            `;
        });

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #e0e7ff; padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="background:#4f46e5; color:#fff; font-size:11px; font-weight:800; padding:2px 7px; border-radius:6px;">K-${String(cIdx + 1).padStart(2, '0')}</span>
                    <input type="text" class="ocr-cluster-title" value="${escapeHtml(cluster.title || `${cIdx + 1}. Küme`)}" style="font-weight:700; font-size:13.5px; border:none; border-bottom:1px dashed #cbd5e1; padding:2px 4px; background:transparent;">
                </div>
                <div style="display:flex; gap:6px;">
                    <button type="button" class="btn" onclick="addOcrStudentRow(this)" style="padding:3px 8px; font-size:11px; background:#e0e7ff; color:#3730a3; border-radius:6px;" title="Yeni boş satır ekle">
                        <i class="fas fa-plus"></i> Ekle
                    </button>
                </div>
            </div>
            <div class="ocr-students-list" style="display:flex; flex-direction:column; min-height:80px;">
                ${studentsRowsHtml || '<div style="text-align:center; color:var(--text-muted); font-size:12px; padding:15px;">Öğrenci bulunamadı.</div>'}
            </div>
        `;

        grid.appendChild(card);
    });
}

// Otomatik Öğrenci İsmi & Numara Eşleştirme (Datalist seçildiğinde çalışır)
function handleOcrStudentNameChange(input) {
    const row = input.closest('.ocr-student-row');
    if (!row) return;
    const nameVal = (input.value || '').trim();
    const noInput = row.querySelector('.ocr-student-no');
    const badgeSpan = row.querySelector('.ocr-match-badge');

    const selectedClass = document.getElementById('class-filter')?.value || '';
    const norm = (s) => String(s || '').replace(/[\/_\-\s]/g, '').trim().toUpperCase();
    const classStudents = (typeof studentData !== 'undefined')
        ? studentData.filter(s => s && (s.sinif === selectedClass || norm(s.sinif) === norm(selectedClass)))
        : [];

    const matched = classStudents.find(cs => cs.adSoyad.toLowerCase() === nameVal.toLowerCase());
    if (matched) {
        if (noInput && !noInput.value) noInput.value = matched.no || '';
        if (badgeSpan) {
            badgeSpan.innerHTML = '✔️';
            badgeSpan.style.color = '#059669';
            badgeSpan.title = 'Kayıtlı öğrenci listesiyle doğrulandı';
        }
    } else {
        if (badgeSpan) {
            badgeSpan.innerHTML = '⚠️';
            badgeSpan.style.color = '#f59e0b';
            badgeSpan.title = 'Liste dışı veya el ile yazılmış öğrenci';
        }
    }
}
window.handleOcrStudentNameChange = handleOcrStudentNameChange;

// 14. Yeni Satır Ekleme Yardımcısı
function addOcrStudentRow(btn) {
    const list = btn.closest('.ocr-cluster-card').querySelector('.ocr-students-list');
    const emptyMsg = list.querySelector('div[style*="text-align:center"]');
    if (emptyMsg) emptyMsg.remove();

    const rowCount = list.querySelectorAll('.ocr-student-row').length + 1;
    const row = document.createElement('div');
    row.className = 'ocr-student-row';
    row.style.cssText = 'display:flex; align-items:center; gap:6px; padding:4px 0; border-bottom:1px solid var(--border, #f1f5f9);';
    row.innerHTML = `
        <span style="font-size:11px; font-weight:700; color:var(--text-muted); width:16px;">${rowCount}.</span>
        <input type="text" class="ocr-student-no" placeholder="No" style="width:48px; padding:4px 6px; font-size:12px; border-radius:6px; border:1px solid var(--border, #cbd5e1); text-align:center;">
        <input type="text" class="ocr-student-name" list="kume-ocr-students-datalist" placeholder="Öğrenci Adı Soyadı (Listeden Seç)" oninput="handleOcrStudentNameChange(this)" style="flex:1; padding:4px 8px; font-size:12px; border-radius:6px; border:1px solid var(--border, #cbd5e1);">
        <select class="ocr-student-role" style="padding:4px 6px; font-size:11.5px; border-radius:6px; border:1px solid var(--border, #cbd5e1); max-width:115px;">
            <option value="Proje Koordinatörü">[PK] Koordinatör</option>
            <option value="Veri Analisti">[VA] Analist</option>
            <option value="Ar-Ge Sorumlusu">[AR] Ar-Ge</option>
            <option value="Halkla İlişkiler">[HI] Halkla İliş.</option>
            <option value="Üye" selected>[Ü] Üye</option>
        </select>
        <span class="ocr-match-badge" style="color:#94a3b8; font-size:12px;" title="Manuel giriş">✏️</span>
        <button type="button" onclick="this.closest('.ocr-student-row').remove()" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding:2px;" title="Sil">&times;</button>
    `;
    list.appendChild(row);
}

// 15. Kümeleri Doğrudan Sisteme Aktar ve Kaydet
function applyOcrClustersToSystem() {
    const selectedClass = document.getElementById('class-filter')?.value;
    if (!selectedClass) {
        alert("Lütfen önce bir sınıf seçiniz!");
        return;
    }

    const cards = document.querySelectorAll('.ocr-cluster-card');
    if (cards.length === 0) {
        alert("Aktarılacak küme verisi bulunamadı.");
        return;
    }

    const finalGroups = [];
    let totalStudents = 0;

    cards.forEach((card, idx) => {
        const titleInput = card.querySelector('.ocr-cluster-title');
        const title = titleInput ? titleInput.value.trim() : `${idx + 1}. Küme`;
        const students = [];

        card.querySelectorAll('.ocr-student-row').forEach(row => {
            const noInput = row.querySelector('.ocr-student-no');
            const nameInput = row.querySelector('.ocr-student-name');
            const roleSelect = row.querySelector('.ocr-student-role');

            const no = noInput ? noInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'Üye';

            if (name) {
                students.push({ name, no, role });
                totalStudents++;
            }
        });

        finalGroups.push({ title, students });
    });

    if (totalStudents === 0) {
        if (!confirm("Kümelerde hiç öğrenci adı tespit edilmedi. Yine de boş kümeleri kaydetmek istiyor musunuz?")) {
            return;
        }
    }

    // 1. groupData nesnesini güncelle
    const safeClass = selectedClass.replace(/\//g, '_');
    if (typeof groupData !== 'object' || groupData === null) groupData = {};
    groupData[safeClass] = finalGroups;
    groupData[selectedClass] = finalGroups;

    // 2. Ana ekrandaki kümeleri yeniden çiz
    if (typeof loadClassGroups === 'function') {
        loadClassGroups(selectedClass);
    }
    if (typeof updateStudentPickers === 'function') {
        updateStudentPickers();
    }

    // 3. Kalıcı kaydet (Firebase ve LocalStorage)
    try {
        sessionStorage.setItem('kume_form_sinif', selectedClass);
        sessionStorage.setItem('kume_form_groups', JSON.stringify(groupData));
        localStorage.setItem('kume_form_sinif', selectedClass);
        localStorage.setItem('kume_form_groups', JSON.stringify(groupData));
    } catch (e) {}

    if (typeof saveDataLocal === 'function') saveDataLocal();
    else if (typeof saveData === 'function') saveData();

    // 4. Modalı Kapat & Tebrik Bildirimi
    closeKumeOcrModal();

    if (typeof showStatus === 'function') {
        showStatus(`🎉 ${selectedClass} sınıfına ${finalGroups.length} küme ve ${totalStudents} öğrenci aktarıldı!`, false);
    } else {
        alert(`✅ Başarılı!\n\n${selectedClass} sınıfı için ${finalGroups.length} küme ve toplam ${totalStudents} öğrenci başarıyla sisteme aktarıldı ve kaydedildi.`);
    }
}

// Güvenli HTML Kaçış Yardımcısı
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}




// ============================================================================
// ⛺ KÜME YÖNETİMİ & KÜME OLUŞTURMA - EXCEL ŞABLONU VE VERİ YÜKLEME MODÜLÜ
// ============================================================================

const KUME_EXCEL_TEMPLATE_BASE64 = "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";

let kumeExcelParsedClusters = [];

// 1. Excel Şablonunu İndir (.xlsx)
function downloadKumeExcelTemplate() {
    try {
        const byteCharacters = atob(KUME_EXCEL_TEMPLATE_BASE64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 300);
        if (typeof showStatus === 'function') {
            showStatus('📥 Küme Excel Şablonu indirildi.', false);
        }
    } catch (e) {
        console.error('Şablon indirme hatası:', e);
        const a = document.createElement('a');
        a.href = 'Kume_Yukleme_Sablonu.xlsx';
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// 2. Excel Yükleme Tetikleyici
function triggerKumeExcelImport() {
    const input = document.getElementById('kume-excel-file-input');
    if (input) {
        input.value = '';
        input.click();
    }
}

// 3. Dosya Seçildiğinde Çalışan Ana İşleyici
async function handleKumeExcelUpload(input) {
    const file = input?.files?.[0];
    if (!file) return;

    if (typeof showStatus === 'function') {
        showStatus('⏳ Excel dosyası okunuyor ve kümeler çözümleniyor...', false);
    }

    try {
        const result = await parseUniversalKumeExcel(file);
        if (!result || !result.clusters || result.clusters.length === 0) {
            alert('Excel dosyasında geçerli küme veya öğrenci verisi bulunamadı.\nLütfen dosyanın "Küme.xlsx" veya "Excel Şablonu İndir" formatına uygun olduğundan emin olun.');
            return;
        }
        openKumeExcelModal(result);
    } catch (err) {
        console.error('Excel çözümleme hatası:', err);
        alert('Excel dosyası işlenirken bir hata oluştu:\n' + (err.message || err));
    } finally {
        if (input) input.value = '';
    }
}

// Türkçe Karakter Normalizasyonu
function normKumeText(str) {
    if (!str) return '';
    return String(str).trim()
        .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
        .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
        .replace(/Ü/g, 'u').replace(/ü/g, 'u')
        .replace(/Ş/g, 's').replace(/ş/g, 's')
        .replace(/Ö/g, 'o').replace(/ö/g, 'o')
        .replace(/Ç/g, 'c').replace(/ç/g, 'c')
        .toLowerCase();
}

// Rol Normalizasyonu
function normalizeKumeRole(str) {
    if (!str) return 'Üye';
    const s = String(str).trim().toUpperCase();
    if (s === 'PK' || s.includes('KOORD') || s.includes('YÖNETİCİ')) return 'Proje Koordinatörü';
    if (s === 'VA' || s.includes('ANALİST') || s.includes('YAZICI')) return 'Veri Analisti';
    if (s === 'AR' || s.includes('AR-GE') || s.includes('MALZEME')) return 'Ar-Ge Sorumlusu';
    if (s === 'HI' || s.includes('İLİŞK') || s.includes('SÖZCÜ')) return 'Halkla İlişkiler';
    if (s === 'Ü' || s === 'U' || s.includes('ÜYE')) return 'Üye';
    return 'Üye';
}

// Küme Başlığı Temizleme
function cleanKumeTitle(rawTitle, defaultIdx) {
    if (!rawTitle) return `${defaultIdx}. Küme`;
    let t = String(rawTitle).trim();
    t = t.replace(/^\s*KÜME\s+ADI:\s*/i, '');
    t = t.replace(/^\s*K-[0-9]+\s*/i, '');
    t = t.replace(/^\s*KÜME\s+[0-9]+[:\s-]*/i, '');
    return t.trim() || `${defaultIdx}. Küme`;
}

// 4. Evrensel Excel Ayrıştırıcı (Universal Kume Parser)
async function parseUniversalKumeExcel(file) {
    const arrayBuffer = await file.arrayBuffer();

    // A. ÖNCELİK: Yüksek Doğruluklu XML & Stil Ayrıştırıcı (Küme.xlsx / Renkli Optik Şablon)
    if (typeof DecompressionStream !== 'undefined' && file.name.endsWith('.xlsx')) {
        try {
            const xmlResult = await parseKumeFromXmlZip(new Uint8Array(arrayBuffer));
            if (xmlResult && xmlResult.clusters && xmlResult.clusters.length > 0) {
                return xmlResult;
            }
        } catch (xmlErr) {
            console.warn('XML doğrudan açma uyarısı, SheetJS moduna geçiliyor:', xmlErr);
        }
    }

    // B. YEDEK & DÜZ TABLO: SheetJS Kütüphanesi ile Ayrıştırma
    if (typeof XLSX === 'undefined') {
        throw new Error('SheetJS (XLSX) kütüphanesi yüklü değil.');
    }

    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error('Excel dosyasında çalışma sayfası bulunamadı.');
    }

    // İlk veya ilgili sayfayı kontrol et
    for (const sName of workbook.SheetNames) {
        const ws = workbook.Sheets[sName];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        if (!rows || rows.length === 0) continue;

        // 1. Form Düzeni mi? (K-01, KÜME 1, KÜME ADI içeriyor mu?)
        const isForm = rows.slice(0, 10).some(r => Array.isArray(r) && r.some(c => String(c).includes('KÜME') || String(c).includes('K-01')));
        if (isForm) {
            const res = parseKumeSheetJsForm(rows, sName);
            if (res && res.clusters.length > 0) return res;
        }

        // 2. Düz Liste Düzeni mi? (Sınıf, Küme No, Okul No, Ad Soyad...)
        const flatRes = parseKumeSheetJsFlat(rows, sName);
        if (flatRes && flatRes.clusters.length > 0) return flatRes;
    }

    throw new Error('Excel dosyasında tanınabilir küme düzeni bulunamadı.');
}

// Native Zip Decompression & XML Parser (Stilleri ve Renkleri Tam Destekler)
async function parseKumeFromXmlZip(buffer) {
    const files = {};
    let offset = 0;
    while (offset < buffer.length - 4) {
        const sig = buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24);
        if (sig === 0x04034b50) {
            const compMethod = buffer[offset + 8] | (buffer[offset + 9] << 8);
            const compSize = (buffer[offset + 18]) | (buffer[offset + 19] << 8) | (buffer[offset + 20] << 16) | (buffer[offset + 21] << 24);
            const nameLen = buffer[offset + 26] | (buffer[offset + 27] << 8);
            const extraLen = buffer[offset + 28] | (buffer[offset + 29] << 8);
            
            const nameBytes = buffer.subarray(offset + 30, offset + 30 + nameLen);
            const name = new TextDecoder('utf-8').decode(nameBytes);
            const dataOffset = offset + 30 + nameLen + extraLen;
            const compData = buffer.subarray(dataOffset, dataOffset + compSize);

            if (compMethod === 8) {
                const ds = new DecompressionStream('deflate-raw');
                const writer = ds.writable.getWriter();
                writer.write(compData);
                writer.close();
                const reader = ds.readable.getReader();
                const chunks = [];
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }
                const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
                const fullBuf = new Uint8Array(totalLen);
                let p = 0;
                for (const c of chunks) {
                    fullBuf.set(c, p);
                    p += c.length;
                }
                files[name] = new TextDecoder('utf-8').decode(fullBuf);
            } else if (compMethod === 0) {
                files[name] = new TextDecoder('utf-8').decode(compData);
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }

    if (!files['xl/worksheets/sheet1.xml']) return null;

    // 1. Shared Strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
        const matches = files['xl/sharedStrings.xml'].match(/<si>[\s\S]*?<\/si>/g) || [];
        matches.forEach(si => {
            const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        });
    }

    // 2. Fills & Styles
    const fills = [];
    if (files['xl/styles.xml']) {
        const fillMatches = files['xl/styles.xml'].match(/<fill>[\s\S]*?<\/fill>/g) || [];
        fillMatches.forEach(f => {
            const rgbMatch = f.match(/rgb="([A-Fa-f0-9]{8})"/);
            fills.push(rgbMatch ? rgbMatch[1].toUpperCase() : null);
        });
    }
    const xfFills = [];
    if (files['xl/styles.xml']) {
        const xfsMatch = files['xl/styles.xml'].match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/);
        if (xfsMatch) {
            const xfMatches = xfsMatch[1].match(/<xf[^>]*>/g) || [];
            xfMatches.forEach(xf => {
                const fillIdMatch = xf.match(/fillId="(\d+)"/);
                const fid = fillIdMatch ? parseInt(fillIdMatch[1]) : 0;
                xfFills.push(fills[fid] || null);
            });
        }
    }

    // 3. Sheet Name & Class
    let sheetNames = [];
    if (files['xl/workbook.xml']) {
        const sMatches = files['xl/workbook.xml'].match(/<sheet[^>]+name="([^"]+)"/g) || [];
        sheetNames = sMatches.map(m => m.match(/name="([^"]+)"/)[1]);
    }

    const sheetXml = files['xl/worksheets/sheet1.xml'];
    const cellMap = {};
    const rowMatches = sheetXml.match(/<row[^>]*>[\s\S]*?<\/row>/g) || [];
    rowMatches.forEach(rowStr => {
        const cMatches = rowStr.match(/<c[^>]*>[\s\S]*?<\/c>|<c[^>]*\/>/g) || [];
        cMatches.forEach(cStr => {
            const rMatch = cStr.match(/r="([A-Z0-9]+)"/);
            if (!rMatch) return;
            const ref = rMatch[1];
            const tMatch = cStr.match(/t="([a-z]+)"/);
            const sMatch = cStr.match(/s="(\d+)"/);
            const vMatch = cStr.match(/<v>([\s\S]*?)<\/v>/);

            let val = vMatch ? vMatch[1] : '';
            if (tMatch && tMatch[1] === 's' && val !== '') {
                val = sharedStrings[parseInt(val)] || '';
            }
            const sIdx = sMatch ? parseInt(sMatch[1]) : 0;
            const fill = xfFills[sIdx] || null;
            cellMap[ref] = { val: String(val).trim(), fill };
        });
    });

    const allVals = Object.values(cellMap).map(c => c.val);
    const isForm = allVals.some(v => v.includes('KÜME') && (v.includes('YÖNETİMİ') || v.includes('K-01') || v.includes('KÜME 1')));
    if (!isForm) return null;

    // Sınıfı Bul
    let detectedClass = '';
    for (const [ref, c] of Object.entries(cellMap)) {
        if (c.val.toUpperCase().includes('SINIF') || c.val.toUpperCase().includes('ŞUBE')) {
            const m = c.val.match(/SINIF\s*(?:\/|\&)?\s*ŞUBE\s*:\s*([^\n\r]+)/i) || c.val.match(/SINIF\s*:\s*([^\n\r]+)/i);
            if (m) {
                detectedClass = m[1].trim();
                break;
            }
        }
    }
    if (!detectedClass && sheetNames.length > 0) {
        const m = sheetNames[0].match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const clusterPairs = [
        { left: { titleCell: 'C5', rows: [7,8,9,10,11,12], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A13' },
          right: { titleCell: 'M5', rows: [7,8,9,10,11,12], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K13' } },
        { left: { titleCell: 'C16', rows: [18,19,20,21,22,23], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A24' },
          right: { titleCell: 'M16', rows: [18,19,20,21,22,23], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K24' } },
        { left: { titleCell: 'C27', rows: [29,30,31,32,33,34], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A35' },
          right: { titleCell: 'M27', rows: [29,30,31,32,33,34], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K35' } }
    ];

    const clusters = [];
    let clusterCounter = 1;
    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];

    clusterPairs.forEach(pair => {
        [pair.left, pair.right].forEach(side => {
            const title = cleanKumeTitle(cellMap[side.titleCell]?.val, clusterCounter);
            const students = [];

            side.rows.forEach((r, rIdx) => {
                const no = (cellMap[`${side.colNo}${r}`]?.val || '').trim();
                const name = (cellMap[`${side.colName}${r}`]?.val || '').trim();
                if (name) {
                    let role = '';
                    // 1. Renk dolgusu kontrolü (PK=Mavi, VA=Yeşil, AR=Turuncu, HI=Mor, Ü=Koyu)
                    for (const rc of side.roleCols) {
                        const cData = cellMap[`${rc.c}${r}`];
                        if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {
                            role = rc.r;
                            break;
                        }
                    }
                    // 2. Metin işareti kontrolü ('X', '1', '+', 'V')
                    if (!role) {
                        for (const rc of side.roleCols) {
                            const val = (cellMap[`${rc.c}${r}`]?.val || '').toUpperCase();
                            if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                                role = rc.r;
                                break;
                            }
                        }
                    }
                    // 3. Varsayılan rol döngüsü
                    if (!role) {
                        role = defaultRoles[rIdx] || 'Üye';
                    }
                    students.push({ no, name, role });
                }
            });

            clusters.push({
                title,
                students,
                observation: cellMap[side.obsCell]?.val || ''
            });
            clusterCounter++;
        });
    });

    return { detectedClass, clusters };
}

// SheetJS Form Düzeni Ayrıştırıcı
function parseKumeSheetJsForm(rows, sheetName) {
    let detectedClass = '';
    // Sınıf satırını tara
    for (let i = 0; i < Math.min(6, rows.length); i++) {
        const r = rows[i];
        if (!Array.isArray(r)) continue;
        for (const cell of r) {
            const str = String(cell);
            if (str.toUpperCase().includes('SINIF') || str.toUpperCase().includes('ŞUBE')) {
                const m = str.match(/SINIF\s*(?:\/|\&)?\s*ŞUBE\s*:\s*([^\n\r]+)/i) || str.match(/SINIF\s*:\s*([^\n\r]+)/i);
                if (m) { detectedClass = m[1].trim(); break; }
            }
        }
        if (detectedClass) break;
    }
    if (!detectedClass && sheetName) {
        const m = sheetName.match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];
    const clusterPairs = [
        { left: { titleRow: 4, titleCol: 2, startRow: 6, endRow: 11, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 4, titleCol: 12, startRow: 6, endRow: 11, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } },
        { left: { titleRow: 15, titleCol: 2, startRow: 17, endRow: 22, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 15, titleCol: 12, startRow: 17, endRow: 22, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } },
        { left: { titleRow: 26, titleCol: 2, startRow: 28, endRow: 33, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] },
          right: { titleRow: 26, titleCol: 12, startRow: 28, endRow: 33, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] } }
    ];

    const clusters = [];
    let clusterCounter = 1;
    const roleMapping = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];

    clusterPairs.forEach(pair => {
        [pair.left, pair.right].forEach(side => {
            const rawTitle = (rows[side.titleRow] && rows[side.titleRow][side.titleCol]) ? rows[side.titleRow][side.titleCol] : '';
            const title = cleanKumeTitle(rawTitle, clusterCounter);
            const students = [];

            for (let r = side.startRow; r <= side.endRow; r++) {
                const row = rows[r];
                if (!row) continue;
                const no = String(row[side.colNo] || '').trim();
                const name = String(row[side.colName] || '').trim();
                if (name) {
                    let role = '';
                    side.roleCols.forEach((colIdx, i) => {
                        const val = String(row[colIdx] || '').trim().toUpperCase();
                        if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                            role = roleMapping[i];
                        }
                    });
                    if (!role) {
                        const rOffset = r - side.startRow;
                        role = defaultRoles[rOffset] || 'Üye';
                    }
                    students.push({ no, name, role });
                }
            }

            clusters.push({ title, students });
            clusterCounter++;
        });
    });

    return { detectedClass, clusters };
}

// SheetJS Düz Liste Ayrıştırıcı (Sınıf | Küme | No | Ad Soyad | Rol)
function parseKumeSheetJsFlat(rows, sheetName) {
    let headerRowIdx = -1;
    let colMap = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (!row || !Array.isArray(row)) continue;
        let matchCount = 0;
        const tempCols = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

        row.forEach((cell, idx) => {
            const clean = normKumeText(cell).replace(/[^a-z0-9]/g, '');
            if (['kume', 'kumeno', 'grup', 'grupno', 'takim'].includes(clean)) {
                tempCols.kumeNo = idx;
                matchCount++;
            } else if (['kumeadi', 'kumead', 'grupadi', 'grupad', 'takimadi'].includes(clean)) {
                tempCols.kumeAdi = idx;
                matchCount++;
            } else if (['okulno', 'ogrencino', 'no', 'numara'].includes(clean)) {
                tempCols.no = idx;
                matchCount++;
            } else if (['ogrenciadsoyad', 'ogrenciadisoyadi', 'adsoyad', 'adisoyadi', 'isim', 'ogrenci'].includes(clean)) {
                tempCols.adSoyad = idx;
                matchCount++;
            } else if (['gorev', 'rol', 'gorevrol', 'gorevi', 'rolu'].includes(clean)) {
                tempCols.rol = idx;
                matchCount++;
            } else if (['sinif', 'sube', 'sinifsube'].includes(clean)) {
                tempCols.sinif = idx;
                matchCount++;
            } else if (['not', 'gozlem', 'gozlemnot', 'aciklama'].includes(clean)) {
                tempCols.not = idx;
            }
        });

        if (matchCount >= 2 && (tempCols.adSoyad !== -1 || tempCols.no !== -1)) {
            headerRowIdx = r;
            colMap = tempCols;
            break;
        }
    }

    if (headerRowIdx === -1) return null;

    const clusterMap = {};
    let detectedClass = '';

    for (let r = headerRowIdx + 1; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0 || row.every(c => c === '')) continue;

        const sSinif = colMap.sinif !== -1 ? String(row[colMap.sinif] || '').trim() : '';
        if (sSinif && !detectedClass) detectedClass = sSinif;

        const kNo = colMap.kumeNo !== -1 ? String(row[colMap.kumeNo] || '').trim() : '';
        const kName = colMap.kumeAdi !== -1 ? String(row[colMap.kumeAdi] || '').trim() : '';
        const sNo = colMap.no !== -1 ? String(row[colMap.no] || '').trim() : '';
        const sAd = colMap.adSoyad !== -1 ? String(row[colMap.adSoyad] || '').trim() : '';
        const sRol = colMap.rol !== -1 ? normalizeKumeRole(row[colMap.rol]) : 'Üye';

        if (!sAd && !sNo) continue;

        const clusterKey = kNo || kName || '1';
        if (!clusterMap[clusterKey]) {
            let title = kName || (kNo ? `${kNo}. Küme` : '1. Küme');
            clusterMap[clusterKey] = { title, students: [] };
        }

        clusterMap[clusterKey].students.push({
            no: sNo,
            name: sAd,
            role: sRol
        });
    }

    if (!detectedClass && sheetName) {
        const m = sheetName.match(/(\d+[\s\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }

    const clusters = Object.values(clusterMap);
    return { detectedClass, clusters };
}

// 5. Excel İnceleme Modalı Açma
function openKumeExcelModal(parsedResult) {
    kumeExcelParsedClusters = parsedResult.clusters || [];
    const detectedClass = parsedResult.detectedClass || '';

    const modal = document.getElementById('kume-excel-modal');
    const classSelect = document.getElementById('kume-excel-target-class');
    const grid = document.getElementById('kume-excel-cards-grid');

    if (!modal || !classSelect || !grid) return;

    // Hedef Sınıf Seçeneğini Ayarla
    const existingClasses = [...new Set((typeof studentData !== 'undefined' ? studentData : []).map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();
    if (detectedClass && !existingClasses.includes(detectedClass)) {
        existingClasses.unshift(detectedClass);
    }

    const currentClassFilter = document.getElementById('class-filter')?.value || '';
    const initialSelectedClass = detectedClass || currentClassFilter || existingClasses[0] || '7/A';

    classSelect.innerHTML = existingClasses.map(c => 
        `<option value="${escapeHtml(c)}" ${c === initialSelectedClass ? 'selected' : ''}>${escapeHtml(c)}</option>`
    ).join('');
    if (!existingClasses.includes(initialSelectedClass)) {
        const opt = document.createElement('option');
        opt.value = initialSelectedClass;
        opt.textContent = initialSelectedClass;
        opt.selected = true;
        classSelect.appendChild(opt);
    }

    // Kartları Çiz
    renderKumeExcelCards();

    modal.style.display = 'flex';
}

// 6. Excel İnceleme Modalı Kapatma
function closeKumeExcelModal() {
    const modal = document.getElementById('kume-excel-modal');
    if (modal) modal.style.display = 'none';
}

// 7. Modaldaki Küme Kartlarını Oluşturma
function renderKumeExcelCards() {
    const grid = document.getElementById('kume-excel-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    kumeExcelParsedClusters.forEach((cluster, cIdx) => {
        const card = document.createElement('div');
        card.className = 'excel-cluster-card';
        card.setAttribute('data-cluster-idx', cIdx);
        card.style.cssText = `
            background: var(--card-bg, #ffffff);
            border: 2px solid var(--border, #e2e8f0);
            border-radius: 12px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        `;

        const students = cluster.students || [];

        let rowsHtml = '';
        students.forEach((stu, sIdx) => {
            rowsHtml += createExcelStudentRowHtml(stu.no, stu.name, stu.role);
        });

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border, #e2e8f0); padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex:1;">
                    <span style="background:#107c41; color:#fff; font-size:11px; font-weight:800; padding:3px 8px; border-radius:6px;">K-${String(cIdx + 1).padStart(2, '0')}</span>
                    <input type="text" class="excel-cluster-title" value="${escapeHtml(cluster.title || `${cIdx + 1}. Küme`)}" placeholder="Küme Adı" style="font-weight:700; font-size:13.5px; border:1px solid var(--border, #cbd5e1); border-radius:6px; padding:4px 8px; flex:1; background:var(--tab-bg, #f8fafc); color:var(--text-main, #0f172a);">
                </div>
                <span class="excel-card-count-badge" style="font-size:11px; font-weight:700; color:var(--text-muted, #64748b); background:#f1f5f9; padding:2px 8px; border-radius:10px; margin-left:6px;">
                    ${students.length} Öğrenci
                </span>
            </div>
            <div class="excel-students-rows-wrap" style="display:flex; flex-direction:column; gap:5px; max-height:220px; overflow-y:auto;">
                ${rowsHtml}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                <button type="button" onclick="addExcelStudentRow(${cIdx})" style="background:none; border:1px dashed #94a3b8; border-radius:6px; padding:4px 10px; font-size:11.5px; color:#107c41; cursor:pointer; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fas fa-plus"></i> Öğrenci Ekle
                </button>
            </div>
        `;

        grid.appendChild(card);
    });

    updateExcelStatsBadge();
}

// Öğrenci Satırı HTML Üretici
function createExcelStudentRowHtml(no, name, role) {
    const safeNo = escapeHtml(no || '');
    const safeName = escapeHtml(name || '');
    const safeRole = role || 'Üye';

    return `
        <div class="excel-student-row" style="display:flex; align-items:center; gap:6px; padding:3px 0; border-bottom:1px solid #f1f5f9;">
            <input type="text" class="excel-student-no" value="${safeNo}" placeholder="No" style="width:58px; font-size:11.5px; font-family:monospace; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a; text-align:center;">
            <input type="text" class="excel-student-name" value="${safeName}" placeholder="Adı Soyadı" style="flex:1; font-size:12px; font-weight:600; padding:4px 8px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a;">
            <select class="excel-student-role" style="font-size:11px; font-weight:700; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#1e293b; width:115px;">
                <option value="Proje Koordinatörü" ${safeRole === 'Proje Koordinatörü' ? 'selected' : ''}>Proje Koord.</option>
                <option value="Veri Analisti" ${safeRole === 'Veri Analisti' ? 'selected' : ''}>Veri Analisti</option>
                <option value="Ar-Ge Sorumlusu" ${safeRole === 'Ar-Ge Sorumlusu' ? 'selected' : ''}>Ar-Ge Sor.</option>
                <option value="Halkla İlişkiler" ${safeRole === 'Halkla İlişkiler' ? 'selected' : ''}>Halkla İliş.</option>
                <option value="Üye" ${safeRole === 'Üye' ? 'selected' : ''}>Üye</option>
            </select>
            <button type="button" onclick="this.closest('.excel-student-row').remove(); updateExcelStatsBadge();" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding:2px 4px; line-height:1;" title="Öğrenciyi Sil">&times;</button>
        </div>
    `;
}

// 8. Modala Öğrenci Satırı Ekle
function addExcelStudentRow(cIdx) {
    const card = document.querySelector(`.excel-cluster-card[data-cluster-idx="${cIdx}"]`);
    if (!card) return;
    const wrap = card.querySelector('.excel-students-rows-wrap');
    if (!wrap) return;

    const div = document.createElement('div');
    div.innerHTML = createExcelStudentRowHtml('', '', 'Üye');
    wrap.appendChild(div.firstElementChild);
    updateExcelStatsBadge();
}

// 9. İstatistik Rozetini Güncelleme
function updateExcelStatsBadge() {
    const cards = document.querySelectorAll('.excel-cluster-card');
    let totalStudents = 0;
    cards.forEach(card => {
        const count = card.querySelectorAll('.excel-student-row').length;
        const b = card.querySelector('.excel-card-count-badge');
        if (b) b.textContent = `${count} Öğrenci`;
        totalStudents += count;
    });

    const badge = document.getElementById('kume-excel-stats-badge');
    if (badge) {
        badge.innerHTML = `<i class="fas fa-check-circle"></i> ${cards.length} Küme · ${totalStudents} Öğrenci`;
    }
}

// 10. Kümeleri Sisteme Aktar ve Kaydet
function applyKumeExcelToSystem() {
    const targetClass = document.getElementById('kume-excel-target-class')?.value?.trim();
    if (!targetClass) {
        alert('Lütfen geçerli bir hedef sınıf seçiniz!');
        return;
    }

    const cards = document.querySelectorAll('.excel-cluster-card');
    if (cards.length === 0) {
        alert('Aktarılacak küme kartı bulunamadı.');
        return;
    }

    const finalGroups = [];
    const collectedStudents = [];
    let totalStudents = 0;

    cards.forEach((card, idx) => {
        const titleInput = card.querySelector('.excel-cluster-title');
        const title = titleInput ? titleInput.value.trim() : `${idx + 1}. Küme`;
        const students = [];

        card.querySelectorAll('.excel-student-row').forEach(row => {
            const noInput = row.querySelector('.excel-student-no');
            const nameInput = row.querySelector('.excel-student-name');
            const roleSelect = row.querySelector('.excel-student-role');

            const no = noInput ? noInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'Üye';

            if (name) {
                students.push({ no, name, role });
                collectedStudents.push({ no, name, role, sinif: targetClass });
                totalStudents++;
            }
        });

        finalGroups.push({ title, students });
    });

    if (totalStudents === 0) {
        if (!confirm('Kümelerde hiç öğrenci adı bulunamadı. Boş kümeleri kaydetmek istiyor musunuz?')) {
            return;
        }
    }

    // Yeni Öğrencileri 'studentData' Listesine de Ekle
    const syncCheckbox = document.getElementById('kume-excel-sync-students');
    if (syncCheckbox && syncCheckbox.checked && typeof studentData !== 'undefined') {
        let addedCount = 0;
        collectedStudents.forEach(stu => {
            const exists = studentData.some(s => 
                (s.sinif === targetClass) && 
                ((stu.no && String(s.no).trim() === String(stu.no).trim()) || 
                 (s.adSoyad && s.adSoyad.trim().toLowerCase() === stu.name.trim().toLowerCase()))
            );
            if (!exists) {
                studentData.push({
                    sira: studentData.length + 1,
                    no: stu.no || '',
                    adSoyad: stu.name,
                    sinif: targetClass
                });
                addedCount++;
            }
        });

        if (addedCount > 0) {
            if (typeof renderStudentTable === 'function') renderStudentTable();
            if (typeof updateClassDropdown === 'function') updateClassDropdown();
            if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
            if (typeof renderTrackingList === 'function') renderTrackingList();
            if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();
            if (typeof renderChecklistList === 'function') renderChecklistList();
        }
    }

    // groupData Nesnesini Güncelle
    const safeClass = targetClass.replace(/\//g, '_');
    if (typeof groupData !== 'object' || groupData === null) groupData = {};
    groupData[safeClass] = finalGroups;
    groupData[targetClass] = finalGroups;

    // Sınıf Filtresini Güncelle ve Kümeleri Çiz
    const classFilter = document.getElementById('class-filter');
    if (classFilter) {
        let found = false;
        for (let i = 0; i < classFilter.options.length; i++) {
            if (classFilter.options[i].value === targetClass) {
                classFilter.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            const opt = document.createElement('option');
            opt.value = targetClass;
            opt.textContent = targetClass;
            opt.selected = true;
            classFilter.appendChild(opt);
        }
    }

    if (typeof loadClassGroups === 'function') {
        loadClassGroups(targetClass);
    }
    if (typeof updateStudentPickers === 'function') {
        updateStudentPickers();
    }

    // Kalıcı Olarak Kaydet (Session, LocalStorage & Firebase)
    try {
        sessionStorage.setItem('kume_form_sinif', targetClass);
        sessionStorage.setItem('kume_form_groups', JSON.stringify(groupData));
        localStorage.setItem('kume_form_sinif', targetClass);
        localStorage.setItem('kume_form_groups', JSON.stringify(groupData));
    } catch (e) {}

    if (typeof saveDataLocal === 'function') saveDataLocal();
    else if (typeof saveData === 'function') saveData();

    // Modalı Kapat & Bildir
    closeKumeExcelModal();

    if (typeof showStatus === 'function') {
        showStatus(`🎉 ${targetClass} sınıfına ${finalGroups.length} küme ve ${totalStudents} öğrenci Excel'den aktarıldı!`, false);
    } else {
        alert(`✅ Başarılı!\n\n${targetClass} sınıfı için ${finalGroups.length} küme ve toplam ${totalStudents} öğrenci başarıyla Excel dosyasından aktarıldı ve sisteme kaydedildi.`);
    }
}


// Global Window Bağlantıları
if (typeof window !== 'undefined') {
    window.downloadKumeExcelTemplate = downloadKumeExcelTemplate;
    window.triggerKumeExcelImport = triggerKumeExcelImport;
    window.handleKumeExcelUpload = handleKumeExcelUpload;
    window.openKumeExcelModal = openKumeExcelModal;
    window.closeKumeExcelModal = closeKumeExcelModal;
    window.applyKumeExcelToSystem = applyKumeExcelToSystem;
    window.addExcelStudentRow = addExcelStudentRow;
    window.updateExcelStatsBadge = updateExcelStatsBadge;
    window.KUME_EXCEL_TEMPLATE_BASE64 = KUME_EXCEL_TEMPLATE_BASE64;
}

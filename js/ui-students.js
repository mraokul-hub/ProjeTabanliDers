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
    const container = document.getElementById('groups-container'); container.innerHTML = '';

    // Önceki sınıftan kalan rastgele grupları database'den siliyoruz ki yenisi yazılsın
    const safeClass = selectedClass.replace(/\//g, '_');
    if (typeof groupData === 'object') groupData[safeClass] = [];

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


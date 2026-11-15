const fs = require('fs');

function normTurkish(str) {
    if (!str) return '';
    return String(str).trim()
        .replace(/İ/g, 'i').replace(/I/g, 'ı')
        .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
        .replace(/Ü/g, 'u').replace(/ü/g, 'u')
        .replace(/Ş/g, 's').replace(/ş/g, 's')
        .replace(/Ö/g, 'o').replace(/ö/g, 'o')
        .replace(/Ç/g, 'c').replace(/ç/g, 'c')
        .toLowerCase();
}

function normalizeRole(str) {
    if (!str) return 'Üye';
    const s = String(str).trim().toUpperCase();
    if (s === 'PK' || s.includes('KOORD') || s.includes('YÖNETİCİ')) return 'Proje Koordinatörü';
    if (s === 'VA' || s.includes('ANALİST') || s.includes('YAZICI')) return 'Veri Analisti';
    if (s === 'AR' || s.includes('AR-GE') || s.includes('MALZEME')) return 'Ar-Ge Sorumlusu';
    if (s === 'HI' || s.includes('İLİŞK') || s.includes('SÖZCÜ')) return 'Halkla İlişkiler';
    if (s === 'Ü' || s === 'U' || s.includes('ÜYE')) return 'Üye';
    return 'Üye';
}

function cleanClusterTitle(rawTitle, defaultIdx) {
    if (!rawTitle) return `${defaultIdx}. Küme`;
    let t = String(rawTitle).trim();
    t = t.replace(/^\s*KÜME\s+ADI:\s*/i, '');
    t = t.replace(/^\s*K-[0-9]+\s*/i, '');
    t = t.replace(/^\s*KÜME\s+[0-9]+[:\s-]*/i, '');
    return t.trim() || `${defaultIdx}. Küme`;
}

// 1. Direct XML Decompression Parser (Preserves styles/colors)
async function parseKumeFromXml(buf) {
    const files = {};
    let offset = 0;
    while (offset < buf.length - 4) {
        const sig = buf.readUInt32LE(offset);
        if (sig === 0x04034b50) {
            const compMethod = buf.readUInt16LE(offset + 8);
            const compSize = buf.readUInt32LE(offset + 18);
            const nameLen = buf.readUInt16LE(offset + 26);
            const extraLen = buf.readUInt16LE(offset + 28);
            const name = buf.toString('utf8', offset + 30, offset + 30 + nameLen);
            const dataOffset = offset + 30 + nameLen + extraLen;
            const compData = buf.subarray(dataOffset, dataOffset + compSize);
            
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
                files[name] = Buffer.concat(chunks).toString('utf8');
            } else if (compMethod === 0) {
                files[name] = compData.toString('utf8');
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }

    if (!files['xl/worksheets/sheet1.xml']) {
        return null;
    }

    // Shared strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
        const matches = files['xl/sharedStrings.xml'].match(/<si>[\s\S]*?<\/si>/g) || [];
        matches.forEach(si => {
            const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        });
    }

    // Styles (fills)
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

    // Sheet Name detection
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

    // Check if this sheet is Form Format
    const allVals = Object.values(cellMap).map(c => c.val);
    const isForm = allVals.some(v => v.includes('KÜME') && (v.includes('YÖNETİMİ') || v.includes('K-01') || v.includes('KÜME 1')));
    if (!isForm) {
        return null; // Let fallback/flat table parser handle it
    }

    // Detect Class
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
            const title = cleanClusterTitle(cellMap[side.titleCell]?.val, clusterCounter);
            const students = [];

            side.rows.forEach((r, rIdx) => {
                const no = (cellMap[`${side.colNo}${r}`]?.val || '').trim();
                const name = (cellMap[`${side.colName}${r}`]?.val || '').trim();
                if (name) {
                    let role = '';
                    // 1. Color fill in bubble
                    for (const rc of side.roleCols) {
                        const cData = cellMap[`${rc.c}${r}`];
                        if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {
                            role = rc.r;
                            break;
                        }
                    }
                    // 2. Mark (X, 1, +, V)
                    if (!role) {
                        for (const rc of side.roleCols) {
                            const val = (cellMap[`${rc.c}${r}`]?.val || '').toUpperCase();
                            if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                                role = rc.r;
                                break;
                            }
                        }
                    }
                    // 3. Fallback default
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

console.log('Tested definitions.');

// Test with sheet2 of Kume_Yukleme_Sablonu.xlsx using python / node or manual array
const sampleSheet2Rows = [
    ['Sınıf', 'Küme No', 'Küme Adı', 'Okul No', 'Öğrenci Adı Soyadı', 'Görev / Rol', 'Gözlem / Not'],
    ['7/A', '1', 'Avcı Kurtlar', '0293', 'MUHAMMED MUSAB BAKIRCI', 'Veri Analisti', ''],
    ['7/A', '1', 'Avcı Kurtlar', '0266', 'HASAN KELEŞ', 'Ar-Ge Sorumlusu', ''],
    ['7/A', '2', 'Pireler Beceri FC', '0108', 'YUNUS EMRE SİMİT', 'Ar-Ge Sorumlusu', '']
];

function testFlat() {
    let headerRowIdx = -1;
    let colMap = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

    for (let r = 0; r < sampleSheet2Rows.length; r++) {
        const row = sampleSheet2Rows[r];
        let matchCount = 0;
        const tempCols = { sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 };

        row.forEach((cell, idx) => {
            const clean = normTurkish(cell).replace(/[^a-z0-9]/g, '');
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

    const clusterMap = {};
    let detectedClass = '';

    for (let r = headerRowIdx + 1; r < sampleSheet2Rows.length; r++) {
        const row = sampleSheet2Rows[r];
        const sSinif = colMap.sinif !== -1 ? String(row[colMap.sinif] || '').trim() : '';
        if (sSinif && !detectedClass) detectedClass = sSinif;

        const kNo = colMap.kumeNo !== -1 ? String(row[colMap.kumeNo] || '').trim() : '';
        const kName = colMap.kumeAdi !== -1 ? String(row[colMap.kumeAdi] || '').trim() : '';
        const sNo = colMap.no !== -1 ? String(row[colMap.no] || '').trim() : '';
        const sAd = colMap.adSoyad !== -1 ? String(row[colMap.adSoyad] || '').trim() : '';
        const sRol = colMap.rol !== -1 ? normalizeRole(row[colMap.rol]) : 'Üye';

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

    console.log('Flat Table Parse Result:');
    console.log('Class:', detectedClass);
    console.log('Clusters:', Object.values(clusterMap));
}

testFlat();

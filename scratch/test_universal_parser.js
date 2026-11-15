const fs = require('fs');

// Normalizers
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

// Universal parser
async function parseKumeWorkbook(buffer) {
    // 1. Unzip XMLs
    const files = {};
    let offset = 0;
    while (offset < buffer.length - 4) {
        const sig = buffer.readUInt32LE(offset);
        if (sig === 0x04034b50) {
            const compMethod = buffer.readUInt16LE(offset + 8);
            const compSize = buffer.readUInt32LE(offset + 18);
            const nameLen = buffer.readUInt16LE(offset + 26);
            const extraLen = buffer.readUInt16LE(offset + 28);
            const name = buffer.toString('utf8', offset + 30, offset + 30 + nameLen);
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
                files[name] = Buffer.concat(chunks).toString('utf8');
            } else if (compMethod === 0) {
                files[name] = compData.toString('utf8');
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }

    // Shared Strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
        const matches = files['xl/sharedStrings.xml'].match(/<si>[\s\S]*?<\/si>/g) || [];
        matches.forEach(si => {
            const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        });
    }

    // Fills & Styles
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
    console.log('Found sheets:', sheetNames);

    // Let's parse sheet1
    function parseSheetXml(sheetXml) {
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
        return cellMap;
    }

    // Check Sheet 1
    const cellMap1 = parseSheetXml(files['xl/worksheets/sheet1.xml'] || '');
    
    // Check if Sheet 1 is Form Format (has KÜME YÖNETİMİ or K-01 or KÜME 1)
    const allVals1 = Object.values(cellMap1).map(c => c.val);
    const isFormFormat = allVals1.some(v => v.includes('KÜME') && (v.includes('YÖNETİMİ') || v.includes('K-01') || v.includes('KÜME 1')));

    let detectedClass = '';
    // Look for class in A3..D3 or any cell
    for (const [ref, c] of Object.entries(cellMap1)) {
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

    console.log('Detected class:', detectedClass);

    let clusters = [];

    if (isFormFormat) {
        console.log('Parsing Form Format (Küme.xlsx layout)...');
        const clusterPairs = [
            { left: { titleCell: 'C5', rows: [7,8,9,10,11,12], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A13' },
              right: { titleCell: 'M5', rows: [7,8,9,10,11,12], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K13' } },
            { left: { titleCell: 'C16', rows: [18,19,20,21,22,23], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A24' },
              right: { titleCell: 'M16', rows: [18,19,20,21,22,23], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K24' } },
            { left: { titleCell: 'C27', rows: [29,30,31,32,33,34], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}], obsCell: 'A35' },
              right: { titleCell: 'M27', rows: [29,30,31,32,33,34], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}], obsCell: 'K35' } }
        ];

        let clusterCounter = 1;
        const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];

        clusterPairs.forEach(pair => {
            [pair.left, pair.right].forEach(side => {
                const title = cleanClusterTitle(cellMap1[side.titleCell]?.val, clusterCounter);
                const students = [];

                side.rows.forEach((r, rIdx) => {
                    const no = (cellMap1[`${side.colNo}${r}`]?.val || '').trim();
                    const name = (cellMap1[`${side.colName}${r}`]?.val || '').trim();
                    if (name) {
                        let role = '';
                        // 1. Check color fill in role bubble
                        for (const rc of side.roleCols) {
                            const cData = cellMap1[`${rc.c}${r}`];
                            if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {
                                role = rc.r;
                                break;
                            }
                        }
                        // 2. Check mark ('X', '1', '+', 'V')
                        if (!role) {
                            for (const rc of side.roleCols) {
                                const val = (cellMap1[`${rc.c}${r}`]?.val || '').toUpperCase();
                                if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {
                                    role = rc.r;
                                    break;
                                }
                            }
                        }
                        // 3. Fallback to default role
                        if (!role) {
                            role = defaultRoles[rIdx] || 'Üye';
                        }
                        students.push({ no, name, role });
                    }
                });

                clusters.push({
                    title,
                    students,
                    observation: cellMap1[side.obsCell]?.val || ''
                });
                clusterCounter++;
            });
        });
    }

    return { detectedClass, clusters };
}

// Test with both Kume.xlsx and Kume_Yukleme_Sablonu.xlsx
async function runTests() {
    console.log('=== TESTING Küme.xlsx ===');
    const res1 = await parseKumeWorkbook(fs.readFileSync('Küme.xlsx'));
    console.log(`Class: ${res1.detectedClass}, Clusters: ${res1.clusters.length}`);
    res1.clusters.forEach((c, i) => console.log(` Küme ${i+1}: ${c.title} (${c.students.length} students)`));

    console.log('\n=== TESTING Kume_Yukleme_Sablonu.xlsx ===');
    const res2 = await parseKumeWorkbook(fs.readFileSync('Kume_Yukleme_Sablonu.xlsx'));
    console.log(`Class: ${res2.detectedClass}, Clusters: ${res2.clusters.length}`);
    res2.clusters.forEach((c, i) => console.log(` Küme ${i+1}: ${c.title} (${c.students.length} students)`));
}

runTests().catch(console.error);

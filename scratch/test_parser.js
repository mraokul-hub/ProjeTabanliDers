const fs = require('fs');

async function parseKumeXlsx(buf) {
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

    // Parse Shared Strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {
        const ssXml = files['xl/sharedStrings.xml'];
        const matches = ssXml.match(/<si>[\s\S]*?<\/si>/g) || [];
        matches.forEach(si => {
            const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        });
    }

    // Parse Styles (fills & cellXfs)
    const fills = [];
    if (files['xl/styles.xml']) {
        const stXml = files['xl/styles.xml'];
        const fillMatches = stXml.match(/<fill>[\s\S]*?<\/fill>/g) || [];
        fillMatches.forEach(f => {
            const rgbMatch = f.match(/rgb="([A-Fa-f0-9]{8})"/);
            fills.push(rgbMatch ? rgbMatch[1].toUpperCase() : null);
        });
    }
    const xfFills = [];
    if (files['xl/styles.xml']) {
        const stXml = files['xl/styles.xml'];
        const xfsMatch = stXml.match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/);
        if (xfsMatch) {
            const xfMatches = xfsMatch[1].match(/<xf[^>]*>/g) || [];
            xfMatches.forEach(xf => {
                const fillIdMatch = xf.match(/fillId="(\d+)"/);
                const fid = fillIdMatch ? parseInt(fillIdMatch[1]) : 0;
                xfFills.push(fills[fid] || null);
            });
        }
    }

    // Parse sheet1.xml
    const sheetXml = files['xl/worksheets/sheet1.xml'] || '';
    const cellMap = {}; // 'A1': { val: '', fill: '' }
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
            cellMap[ref] = { val, fill };
        });
    });

    console.log('Sample cells:');
    console.log('A1:', cellMap['A1']);
    console.log('A3:', cellMap['A3']);
    console.log('C5:', cellMap['C5']);
    console.log('C7:', cellMap['C7'], 'D7 fill:', cellMap['D7']?.fill, 'E7 fill:', cellMap['E7']?.fill);
    console.log('M5:', cellMap['M5']);
    console.log('M7:', cellMap['M7'], 'N7 fill:', cellMap['N7']?.fill, 'P7 fill:', cellMap['P7']?.fill);

    // Extract Clusters
    // Küme 1: rows 7-12, cols A-I
    // Küme 2: rows 7-12, cols K-S
    // Küme 3: rows 18-23, cols A-I
    // Küme 4: rows 18-23, cols K-S
    // Küme 5: rows 29-34, cols A-I
    // Küme 6: rows 29-34, cols K-S

    const clusterDefs = [
        { titleCell: 'C5', defaultTitle: '1. Küme', rows: [7,8,9,10,11,12], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}] },
        { titleCell: 'M5', defaultTitle: '2. Küme', rows: [7,8,9,10,11,12], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}] },
        { titleCell: 'C16', defaultTitle: '3. Küme', rows: [18,19,20,21,22,23], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}] },
        { titleCell: 'M16', defaultTitle: '4. Küme', rows: [18,19,20,21,22,23], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}] },
        { titleCell: 'C27', defaultTitle: '5. Küme', rows: [29,30,31,32,33,34], colNo: 'B', colName: 'C', roleCols: [{c:'D',r:'Proje Koordinatörü'},{c:'E',r:'Veri Analisti'},{c:'F',r:'Ar-Ge Sorumlusu'},{c:'G',r:'Halkla İlişkiler'},{c:'H',r:'Üye'}] },
        { titleCell: 'M27', defaultTitle: '6. Küme', rows: [29,30,31,32,33,34], colNo: 'L', colName: 'M', roleCols: [{c:'N',r:'Proje Koordinatörü'},{c:'O',r:'Veri Analisti'},{c:'P',r:'Ar-Ge Sorumlusu'},{c:'Q',r:'Halkla İlişkiler'},{c:'R',r:'Üye'}] }
    ];

    const clusters = [];
    clusterDefs.forEach((def, cIdx) => {
        let titleRaw = cellMap[def.titleCell]?.val || '';
        let title = titleRaw.replace(/^KÜME ADI:\s*/i, '').trim();
        if (!title) title = `${cIdx + 1}. Küme`;

        const students = [];
        def.rows.forEach(r => {
            const no = (cellMap[`${def.colNo}${r}`]?.val || '').trim();
            const name = (cellMap[`${def.colName}${r}`]?.val || '').trim();
            if (name) {
                // Find role:
                let role = 'Üye';
                for (const rc of def.roleCols) {
                    const cData = cellMap[`${rc.c}${r}`];
                    // If fill is highlighted (non-null and not white/slate default)
                    if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {
                        role = rc.r;
                        break;
                    }
                }
                students.push({ no, name, role });
            }
        });
        clusters.push({ title, students });
    });

    console.log('\n--- EXTRACTED CLUSTERS ---');
    clusters.forEach((c, i) => {
        console.log(`\nCluster ${i+1}: ${c.title} (${c.students.length} students)`);
        c.students.forEach(s => console.log(`  - [${s.no}] ${s.name} (${s.role})`));
    });
}

const buf = fs.readFileSync('Küme.xlsx');
parseKumeXlsx(buf).catch(console.error);

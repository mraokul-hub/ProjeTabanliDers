import base64

with open('scratch/template_base64.txt', 'r', encoding='ascii') as f:
    template_b64 = f.read().strip()

js_code = f'''
// ============================================================================
// ⛺ KÜME YÖNETİMİ & KÜME OLUŞTURMA - EXCEL ŞABLONU VE VERİ YÜKLEME MODÜLÜ
// ============================================================================

const KUME_EXCEL_TEMPLATE_BASE64 = "{template_b64}";

let kumeExcelParsedClusters = [];

// 1. Excel Şablonunu İndir (.xlsx)
function downloadKumeExcelTemplate() {{
    try {{
        const byteCharacters = atob(KUME_EXCEL_TEMPLATE_BASE64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {{
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }}
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {{
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }}, 300);
        if (typeof showStatus === 'function') {{
            showStatus('📥 Küme Excel Şablonu indirildi.', false);
        }}
    }} catch (e) {{
        console.error('Şablon indirme hatası:', e);
        const a = document.createElement('a');
        a.href = 'Kume_Yukleme_Sablonu.xlsx';
        a.download = 'Kume_Yukleme_Sablonu.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }}
}}

// 2. Excel Yükleme Tetikleyici
function triggerKumeExcelImport() {{
    const input = document.getElementById('kume-excel-file-input');
    if (input) {{
        input.value = '';
        input.click();
    }}
}}

// 3. Dosya Seçildiğinde Çalışan Ana İşleyici
async function handleKumeExcelUpload(input) {{
    const file = input?.files?.[0];
    if (!file) return;

    if (typeof showStatus === 'function') {{
        showStatus('⏳ Excel dosyası okunuyor ve kümeler çözümleniyor...', false);
    }}

    try {{
        const result = await parseUniversalKumeExcel(file);
        if (!result || !result.clusters || result.clusters.length === 0) {{
            alert('Excel dosyasında geçerli küme veya öğrenci verisi bulunamadı.\\nLütfen dosyanın "Küme.xlsx" veya "Excel Şablonu İndir" formatına uygun olduğundan emin olun.');
            return;
        }}
        openKumeExcelModal(result);
    }} catch (err) {{
        console.error('Excel çözümleme hatası:', err);
        alert('Excel dosyası işlenirken bir hata oluştu:\\n' + (err.message || err));
    }} finally {{
        if (input) input.value = '';
    }}
}}

// Türkçe Karakter Normalizasyonu
function normKumeText(str) {{
    if (!str) return '';
    return String(str).trim()
        .replace(/İ/g, 'i').replace(/I/g, 'i').replace(/ı/g, 'i')
        .replace(/Ğ/g, 'g').replace(/ğ/g, 'g')
        .replace(/Ü/g, 'u').replace(/ü/g, 'u')
        .replace(/Ş/g, 's').replace(/ş/g, 's')
        .replace(/Ö/g, 'o').replace(/ö/g, 'o')
        .replace(/Ç/g, 'c').replace(/ç/g, 'c')
        .toLowerCase();
}}

// Rol Normalizasyonu
function normalizeKumeRole(str) {{
    if (!str) return 'Üye';
    const s = String(str).trim().toUpperCase();
    if (s === 'PK' || s.includes('KOORD') || s.includes('YÖNETİCİ')) return 'Proje Koordinatörü';
    if (s === 'VA' || s.includes('ANALİST') || s.includes('YAZICI')) return 'Veri Analisti';
    if (s === 'AR' || s.includes('AR-GE') || s.includes('MALZEME')) return 'Ar-Ge Sorumlusu';
    if (s === 'HI' || s.includes('İLİŞK') || s.includes('SÖZCÜ')) return 'Halkla İlişkiler';
    if (s === 'Ü' || s === 'U' || s.includes('ÜYE')) return 'Üye';
    return 'Üye';
}}

// Küme Başlığı Temizleme
function cleanKumeTitle(rawTitle, defaultIdx) {{
    if (!rawTitle) return `${{defaultIdx}}. Küme`;
    let t = String(rawTitle).trim();
    t = t.replace(/^\\s*KÜME\\s+ADI:\\s*/i, '');
    t = t.replace(/^\\s*K-[0-9]+\\s*/i, '');
    t = t.replace(/^\\s*KÜME\\s+[0-9]+[:\\s-]*/i, '');
    return t.trim() || `${{defaultIdx}}. Küme`;
}}

// 4. Evrensel Excel Ayrıştırıcı (Universal Kume Parser)
async function parseUniversalKumeExcel(file) {{
    const arrayBuffer = await file.arrayBuffer();

    // A. ÖNCELİK: Yüksek Doğruluklu XML & Stil Ayrıştırıcı (Küme.xlsx / Renkli Optik Şablon)
    if (typeof DecompressionStream !== 'undefined' && file.name.endsWith('.xlsx')) {{
        try {{
            const xmlResult = await parseKumeFromXmlZip(new Uint8Array(arrayBuffer));
            if (xmlResult && xmlResult.clusters && xmlResult.clusters.length > 0) {{
                return xmlResult;
            }}
        }} catch (xmlErr) {{
            console.warn('XML doğrudan açma uyarısı, SheetJS moduna geçiliyor:', xmlErr);
        }}
    }}

    // B. YEDEK & DÜZ TABLO: SheetJS Kütüphanesi ile Ayrıştırma
    if (typeof XLSX === 'undefined') {{
        throw new Error('SheetJS (XLSX) kütüphanesi yüklü değil.');
    }}

    const workbook = XLSX.read(new Uint8Array(arrayBuffer), {{ type: 'array' }});
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {{
        throw new Error('Excel dosyasında çalışma sayfası bulunamadı.');
    }}

    // İlk veya ilgili sayfayı kontrol et
    for (const sName of workbook.SheetNames) {{
        const ws = workbook.Sheets[sName];
        const rows = XLSX.utils.sheet_to_json(ws, {{ header: 1, defval: '' }});
        if (!rows || rows.length === 0) continue;

        // 1. Form Düzeni mi? (K-01, KÜME 1, KÜME ADI içeriyor mu?)
        const isForm = rows.slice(0, 10).some(r => Array.isArray(r) && r.some(c => String(c).includes('KÜME') || String(c).includes('K-01')));
        if (isForm) {{
            const res = parseKumeSheetJsForm(rows, sName);
            if (res && res.clusters.length > 0) return res;
        }}

        // 2. Düz Liste Düzeni mi? (Sınıf, Küme No, Okul No, Ad Soyad...)
        const flatRes = parseKumeSheetJsFlat(rows, sName);
        if (flatRes && flatRes.clusters.length > 0) return flatRes;
    }}

    throw new Error('Excel dosyasında tanınabilir küme düzeni bulunamadı.');
}}

// Native Zip Decompression & XML Parser (Stilleri ve Renkleri Tam Destekler)
async function parseKumeFromXmlZip(buffer) {{
    const files = {{}};
    let offset = 0;
    while (offset < buffer.length - 4) {{
        const sig = buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24);
        if (sig === 0x04034b50) {{
            const compMethod = buffer[offset + 8] | (buffer[offset + 9] << 8);
            const compSize = (buffer[offset + 18]) | (buffer[offset + 19] << 8) | (buffer[offset + 20] << 16) | (buffer[offset + 21] << 24);
            const nameLen = buffer[offset + 26] | (buffer[offset + 27] << 8);
            const extraLen = buffer[offset + 28] | (buffer[offset + 29] << 8);
            
            const nameBytes = buffer.subarray(offset + 30, offset + 30 + nameLen);
            const name = new TextDecoder('utf-8').decode(nameBytes);
            const dataOffset = offset + 30 + nameLen + extraLen;
            const compData = buffer.subarray(dataOffset, dataOffset + compSize);

            if (compMethod === 8) {{
                const ds = new DecompressionStream('deflate-raw');
                const writer = ds.writable.getWriter();
                writer.write(compData);
                writer.close();
                const reader = ds.readable.getReader();
                const chunks = [];
                while (true) {{
                    const {{ done, value }} = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }}
                const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
                const fullBuf = new Uint8Array(totalLen);
                let p = 0;
                for (const c of chunks) {{
                    fullBuf.set(c, p);
                    p += c.length;
                }}
                files[name] = new TextDecoder('utf-8').decode(fullBuf);
            }} else if (compMethod === 0) {{
                files[name] = new TextDecoder('utf-8').decode(compData);
            }}
            offset = dataOffset + compSize;
        }} else {{
            offset++;
        }}
    }}

    if (!files['xl/worksheets/sheet1.xml']) return null;

    // 1. Shared Strings
    const sharedStrings = [];
    if (files['xl/sharedStrings.xml']) {{
        const matches = files['xl/sharedStrings.xml'].match(/<si>[\\s\\S]*?<\\/si>/g) || [];
        matches.forEach(si => {{
            const tMatches = si.match(/<t[^>]*>([\\s\\S]*?)<\\/t>/g) || [];
            const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
            sharedStrings.push(text);
        }});
    }}

    // 2. Fills & Styles
    const fills = [];
    if (files['xl/styles.xml']) {{
        const fillMatches = files['xl/styles.xml'].match(/<fill>[\\s\\S]*?<\\/fill>/g) || [];
        fillMatches.forEach(f => {{
            const rgbMatch = f.match(/rgb="([A-Fa-f0-9]{{8}})"/);
            fills.push(rgbMatch ? rgbMatch[1].toUpperCase() : null);
        }});
    }}
    const xfFills = [];
    if (files['xl/styles.xml']) {{
        const xfsMatch = files['xl/styles.xml'].match(/<cellXfs[^>]*>([\\s\\S]*?)<\\/cellXfs>/);
        if (xfsMatch) {{
            const xfMatches = xfsMatch[1].match(/<xf[^>]*>/g) || [];
            xfMatches.forEach(xf => {{
                const fillIdMatch = xf.match(/fillId="(\\d+)"/);
                const fid = fillIdMatch ? parseInt(fillIdMatch[1]) : 0;
                xfFills.push(fills[fid] || null);
            }});
        }}
    }}

    // 3. Sheet Name & Class
    let sheetNames = [];
    if (files['xl/workbook.xml']) {{
        const sMatches = files['xl/workbook.xml'].match(/<sheet[^>]+name="([^"]+)"/g) || [];
        sheetNames = sMatches.map(m => m.match(/name="([^"]+)"/)[1]);
    }}

    const sheetXml = files['xl/worksheets/sheet1.xml'];
    const cellMap = {{}};
    const rowMatches = sheetXml.match(/<row[^>]*>[\\s\\S]*?<\\/row>/g) || [];
    rowMatches.forEach(rowStr => {{
        const cMatches = rowStr.match(/<c[^>]*>[\\s\\S]*?<\\/c>|<c[^>]*\\/>/g) || [];
        cMatches.forEach(cStr => {{
            const rMatch = cStr.match(/r="([A-Z0-9]+)"/);
            if (!rMatch) return;
            const ref = rMatch[1];
            const tMatch = cStr.match(/t="([a-z]+)"/);
            const sMatch = cStr.match(/s="(\\d+)"/);
            const vMatch = cStr.match(/<v>([\\s\\S]*?)<\\/v>/);

            let val = vMatch ? vMatch[1] : '';
            if (tMatch && tMatch[1] === 's' && val !== '') {{
                val = sharedStrings[parseInt(val)] || '';
            }}
            const sIdx = sMatch ? parseInt(sMatch[1]) : 0;
            const fill = xfFills[sIdx] || null;
            cellMap[ref] = {{ val: String(val).trim(), fill }};
        }});
    }});

    const allVals = Object.values(cellMap).map(c => c.val);
    const isForm = allVals.some(v => v.includes('KÜME') && (v.includes('YÖNETİMİ') || v.includes('K-01') || v.includes('KÜME 1')));
    if (!isForm) return null;

    // Sınıfı Bul
    let detectedClass = '';
    for (const [ref, c] of Object.entries(cellMap)) {{
        if (c.val.toUpperCase().includes('SINIF') || c.val.toUpperCase().includes('ŞUBE')) {{
            const m = c.val.match(/SINIF\\s*(?:\\/|\\&)?\\s*ŞUBE\\s*:\\s*([^\\n\\r]+)/i) || c.val.match(/SINIF\\s*:\\s*([^\\n\\r]+)/i);
            if (m) {{
                detectedClass = m[1].trim();
                break;
            }}
        }}
    }}
    if (!detectedClass && sheetNames.length > 0) {{
        const m = sheetNames[0].match(/(\\d+[\\s\\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }}

    const clusterPairs = [
        {{ left: {{ titleCell: 'C5', rows: [7,8,9,10,11,12], colNo: 'B', colName: 'C', roleCols: [{{c:'D',r:'Proje Koordinatörü'}},{{c:'E',r:'Veri Analisti'}},{{c:'F',r:'Ar-Ge Sorumlusu'}},{{c:'G',r:'Halkla İlişkiler'}},{{c:'H',r:'Üye'}}], obsCell: 'A13' }},
          right: {{ titleCell: 'M5', rows: [7,8,9,10,11,12], colNo: 'L', colName: 'M', roleCols: [{{c:'N',r:'Proje Koordinatörü'}},{{c:'O',r:'Veri Analisti'}},{{c:'P',r:'Ar-Ge Sorumlusu'}},{{c:'Q',r:'Halkla İlişkiler'}},{{c:'R',r:'Üye'}}], obsCell: 'K13' }} }},
        {{ left: {{ titleCell: 'C16', rows: [18,19,20,21,22,23], colNo: 'B', colName: 'C', roleCols: [{{c:'D',r:'Proje Koordinatörü'}},{{c:'E',r:'Veri Analisti'}},{{c:'F',r:'Ar-Ge Sorumlusu'}},{{c:'G',r:'Halkla İlişkiler'}},{{c:'H',r:'Üye'}}], obsCell: 'A24' }},
          right: {{ titleCell: 'M16', rows: [18,19,20,21,22,23], colNo: 'L', colName: 'M', roleCols: [{{c:'N',r:'Proje Koordinatörü'}},{{c:'O',r:'Veri Analisti'}},{{c:'P',r:'Ar-Ge Sorumlusu'}},{{c:'Q',r:'Halkla İlişkiler'}},{{c:'R',r:'Üye'}}], obsCell: 'K24' }} }},
        {{ left: {{ titleCell: 'C27', rows: [29,30,31,32,33,34], colNo: 'B', colName: 'C', roleCols: [{{c:'D',r:'Proje Koordinatörü'}},{{c:'E',r:'Veri Analisti'}},{{c:'F',r:'Ar-Ge Sorumlusu'}},{{c:'G',r:'Halkla İlişkiler'}},{{c:'H',r:'Üye'}}], obsCell: 'A35' }},
          right: {{ titleCell: 'M27', rows: [29,30,31,32,33,34], colNo: 'L', colName: 'M', roleCols: [{{c:'N',r:'Proje Koordinatörü'}},{{c:'O',r:'Veri Analisti'}},{{c:'P',r:'Ar-Ge Sorumlusu'}},{{c:'Q',r:'Halkla İlişkiler'}},{{c:'R',r:'Üye'}}], obsCell: 'K35' }} }}
    ];

    const clusters = [];
    let clusterCounter = 1;
    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];

    clusterPairs.forEach(pair => {{
        [pair.left, pair.right].forEach(side => {{
            const title = cleanKumeTitle(cellMap[side.titleCell]?.val, clusterCounter);
            const students = [];

            side.rows.forEach((r, rIdx) => {{
                const no = (cellMap[`${{side.colNo}}${{r}}`]?.val || '').trim();
                const name = (cellMap[`${{side.colName}}${{r}}`]?.val || '').trim();
                if (name) {{
                    let role = '';
                    // 1. Renk dolgusu kontrolü (PK=Mavi, VA=Yeşil, AR=Turuncu, HI=Mor, Ü=Koyu)
                    for (const rc of side.roleCols) {{
                        const cData = cellMap[`${{rc.c}}${{r}}`];
                        if (cData && cData.fill && ['FF1D4ED8', 'FF047857', 'FFB45309', 'FF6D28D9', 'FF1E293B'].includes(cData.fill)) {{
                            role = rc.r;
                            break;
                        }}
                    }}
                    // 2. Metin işareti kontrolü ('X', '1', '+', 'V')
                    if (!role) {{
                        for (const rc of side.roleCols) {{
                            const val = (cellMap[`${{rc.c}}${{r}}`]?.val || '').toUpperCase();
                            if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {{
                                role = rc.r;
                                break;
                            }}
                        }}
                    }}
                    // 3. Varsayılan rol döngüsü
                    if (!role) {{
                        role = defaultRoles[rIdx] || 'Üye';
                    }}
                    students.push({{ no, name, role }});
                }}
            }});

            clusters.push({{
                title,
                students,
                observation: cellMap[side.obsCell]?.val || ''
            }});
            clusterCounter++;
        }});
    }});

    return {{ detectedClass, clusters }};
}}

// SheetJS Form Düzeni Ayrıştırıcı
function parseKumeSheetJsForm(rows, sheetName) {{
    let detectedClass = '';
    // Sınıf satırını tara
    for (let i = 0; i < Math.min(6, rows.length); i++) {{
        const r = rows[i];
        if (!Array.isArray(r)) continue;
        for (const cell of r) {{
            const str = String(cell);
            if (str.toUpperCase().includes('SINIF') || str.toUpperCase().includes('ŞUBE')) {{
                const m = str.match(/SINIF\\s*(?:\\/|\\&)?\\s*ŞUBE\\s*:\\s*([^\\n\\r]+)/i) || str.match(/SINIF\\s*:\\s*([^\\n\\r]+)/i);
                if (m) {{ detectedClass = m[1].trim(); break; }}
            }}
        }}
        if (detectedClass) break;
    }}
    if (!detectedClass && sheetName) {{
        const m = sheetName.match(/(\\d+[\\s\\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }}

    const defaultRoles = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye', 'Üye'];
    const clusterPairs = [
        {{ left: {{ titleRow: 4, titleCol: 2, startRow: 6, endRow: 11, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] }},
          right: {{ titleRow: 4, titleCol: 12, startRow: 6, endRow: 11, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] }} }},
        {{ left: {{ titleRow: 15, titleCol: 2, startRow: 17, endRow: 22, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] }},
          right: {{ titleRow: 15, titleCol: 12, startRow: 17, endRow: 22, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] }} }},
        {{ left: {{ titleRow: 26, titleCol: 2, startRow: 28, endRow: 33, colNo: 1, colName: 2, roleCols: [3,4,5,6,7] }},
          right: {{ titleRow: 26, titleCol: 12, startRow: 28, endRow: 33, colNo: 11, colName: 12, roleCols: [13,14,15,16,17] }} }}
    ];

    const clusters = [];
    let clusterCounter = 1;
    const roleMapping = ['Proje Koordinatörü', 'Veri Analisti', 'Ar-Ge Sorumlusu', 'Halkla İlişkiler', 'Üye'];

    clusterPairs.forEach(pair => {{
        [pair.left, pair.right].forEach(side => {{
            const rawTitle = (rows[side.titleRow] && rows[side.titleRow][side.titleCol]) ? rows[side.titleRow][side.titleCol] : '';
            const title = cleanKumeTitle(rawTitle, clusterCounter);
            const students = [];

            for (let r = side.startRow; r <= side.endRow; r++) {{
                const row = rows[r];
                if (!row) continue;
                const no = String(row[side.colNo] || '').trim();
                const name = String(row[side.colName] || '').trim();
                if (name) {{
                    let role = '';
                    side.roleCols.forEach((colIdx, i) => {{
                        const val = String(row[colIdx] || '').trim().toUpperCase();
                        if (['X', '1', '+', 'V', '✓', '✔'].includes(val)) {{
                            role = roleMapping[i];
                        }}
                    }});
                    if (!role) {{
                        const rOffset = r - side.startRow;
                        role = defaultRoles[rOffset] || 'Üye';
                    }}
                    students.push({{ no, name, role }});
                }}
            }}

            clusters.push({{ title, students }});
            clusterCounter++;
        }});
    }});

    return {{ detectedClass, clusters }};
}}

// SheetJS Düz Liste Ayrıştırıcı (Sınıf | Küme | No | Ad Soyad | Rol)
function parseKumeSheetJsFlat(rows, sheetName) {{
    let headerRowIdx = -1;
    let colMap = {{ sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 }};

    for (let r = 0; r < rows.length; r++) {{
        const row = rows[r];
        if (!row || !Array.isArray(row)) continue;
        let matchCount = 0;
        const tempCols = {{ sinif: -1, kumeNo: -1, kumeAdi: -1, no: -1, adSoyad: -1, rol: -1, not: -1 }};

        row.forEach((cell, idx) => {{
            const clean = normKumeText(cell).replace(/[^a-z0-9]/g, '');
            if (['kume', 'kumeno', 'grup', 'grupno', 'takim'].includes(clean)) {{
                tempCols.kumeNo = idx;
                matchCount++;
            }} else if (['kumeadi', 'kumead', 'grupadi', 'grupad', 'takimadi'].includes(clean)) {{
                tempCols.kumeAdi = idx;
                matchCount++;
            }} else if (['okulno', 'ogrencino', 'no', 'numara'].includes(clean)) {{
                tempCols.no = idx;
                matchCount++;
            }} else if (['ogrenciadsoyad', 'ogrenciadisoyadi', 'adsoyad', 'adisoyadi', 'isim', 'ogrenci'].includes(clean)) {{
                tempCols.adSoyad = idx;
                matchCount++;
            }} else if (['gorev', 'rol', 'gorevrol', 'gorevi', 'rolu'].includes(clean)) {{
                tempCols.rol = idx;
                matchCount++;
            }} else if (['sinif', 'sube', 'sinifsube'].includes(clean)) {{
                tempCols.sinif = idx;
                matchCount++;
            }} else if (['not', 'gozlem', 'gozlemnot', 'aciklama'].includes(clean)) {{
                tempCols.not = idx;
            }}
        }});

        if (matchCount >= 2 && (tempCols.adSoyad !== -1 || tempCols.no !== -1)) {{
            headerRowIdx = r;
            colMap = tempCols;
            break;
        }}
    }}

    if (headerRowIdx === -1) return null;

    const clusterMap = {{}};
    let detectedClass = '';

    for (let r = headerRowIdx + 1; r < rows.length; r++) {{
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
        if (!clusterMap[clusterKey]) {{
            let title = kName || (kNo ? `${{kNo}}. Küme` : '1. Küme');
            clusterMap[clusterKey] = {{ title, students: [] }};
        }}

        clusterMap[clusterKey].students.push({{
            no: sNo,
            name: sAd,
            role: sRol
        }});
    }}

    if (!detectedClass && sheetName) {{
        const m = sheetName.match(/(\\d+[\\s\\-_/]*[A-Za-z]+)/);
        if (m) detectedClass = m[1].replace(/[-_]/g, '/');
    }}

    const clusters = Object.values(clusterMap);
    return {{ detectedClass, clusters }};
}}

// 5. Excel İnceleme Modalı Açma
function openKumeExcelModal(parsedResult) {{
    kumeExcelParsedClusters = parsedResult.clusters || [];
    const detectedClass = parsedResult.detectedClass || '';

    const modal = document.getElementById('kume-excel-modal');
    const classSelect = document.getElementById('kume-excel-target-class');
    const grid = document.getElementById('kume-excel-cards-grid');

    if (!modal || !classSelect || !grid) return;

    // Hedef Sınıf Seçeneğini Ayarla
    const existingClasses = [...new Set((typeof studentData !== 'undefined' ? studentData : []).map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();
    if (detectedClass && !existingClasses.includes(detectedClass)) {{
        existingClasses.unshift(detectedClass);
    }}

    const currentClassFilter = document.getElementById('class-filter')?.value || '';
    const initialSelectedClass = detectedClass || currentClassFilter || existingClasses[0] || '7/A';

    classSelect.innerHTML = existingClasses.map(c => 
        `<option value="${{escapeHtml(c)}}" ${{c === initialSelectedClass ? 'selected' : ''}}>${{escapeHtml(c)}}</option>`
    ).join('');
    if (!existingClasses.includes(initialSelectedClass)) {{
        const opt = document.createElement('option');
        opt.value = initialSelectedClass;
        opt.textContent = initialSelectedClass;
        opt.selected = true;
        classSelect.appendChild(opt);
    }}

    // Kartları Çiz
    renderKumeExcelCards();

    modal.style.display = 'flex';
}}

// 6. Excel İnceleme Modalı Kapatma
function closeKumeExcelModal() {{
    const modal = document.getElementById('kume-excel-modal');
    if (modal) modal.style.display = 'none';
}}

// 7. Modaldaki Küme Kartlarını Oluşturma
function renderKumeExcelCards() {{
    const grid = document.getElementById('kume-excel-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    kumeExcelParsedClusters.forEach((cluster, cIdx) => {{
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
        students.forEach((stu, sIdx) => {{
            rowsHtml += createExcelStudentRowHtml(stu.no, stu.name, stu.role);
        }});

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border, #e2e8f0); padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex:1;">
                    <span style="background:#107c41; color:#fff; font-size:11px; font-weight:800; padding:3px 8px; border-radius:6px;">K-${{String(cIdx + 1).padStart(2, '0')}}</span>
                    <input type="text" class="excel-cluster-title" value="${{escapeHtml(cluster.title || `${{cIdx + 1}}. Küme`)}}" placeholder="Küme Adı" style="font-weight:700; font-size:13.5px; border:1px solid var(--border, #cbd5e1); border-radius:6px; padding:4px 8px; flex:1; background:var(--tab-bg, #f8fafc); color:var(--text-main, #0f172a);">
                </div>
                <span class="excel-card-count-badge" style="font-size:11px; font-weight:700; color:var(--text-muted, #64748b); background:#f1f5f9; padding:2px 8px; border-radius:10px; margin-left:6px;">
                    ${{students.length}} Öğrenci
                </span>
            </div>
            <div class="excel-students-rows-wrap" style="display:flex; flex-direction:column; gap:5px; max-height:220px; overflow-y:auto;">
                ${{rowsHtml}}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                <button type="button" onclick="addExcelStudentRow(${{cIdx}})" style="background:none; border:1px dashed #94a3b8; border-radius:6px; padding:4px 10px; font-size:11.5px; color:#107c41; cursor:pointer; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fas fa-plus"></i> Öğrenci Ekle
                </button>
            </div>
        `;

        grid.appendChild(card);
    }});

    updateExcelStatsBadge();
}}

// Öğrenci Satırı HTML Üretici
function createExcelStudentRowHtml(no, name, role) {{
    const safeNo = escapeHtml(no || '');
    const safeName = escapeHtml(name || '');
    const safeRole = role || 'Üye';

    return `
        <div class="excel-student-row" style="display:flex; align-items:center; gap:6px; padding:3px 0; border-bottom:1px solid #f1f5f9;">
            <input type="text" class="excel-student-no" value="${{safeNo}}" placeholder="No" style="width:58px; font-size:11.5px; font-family:monospace; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a; text-align:center;">
            <input type="text" class="excel-student-name" value="${{safeName}}" placeholder="Adı Soyadı" style="flex:1; font-size:12px; font-weight:600; padding:4px 8px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#0f172a;">
            <select class="excel-student-role" style="font-size:11px; font-weight:700; padding:4px 6px; border-radius:6px; border:1px solid var(--border, #cbd5e1); background:#fff; color:#1e293b; width:115px;">
                <option value="Proje Koordinatörü" ${{safeRole === 'Proje Koordinatörü' ? 'selected' : ''}}>Proje Koord.</option>
                <option value="Veri Analisti" ${{safeRole === 'Veri Analisti' ? 'selected' : ''}}>Veri Analisti</option>
                <option value="Ar-Ge Sorumlusu" ${{safeRole === 'Ar-Ge Sorumlusu' ? 'selected' : ''}}>Ar-Ge Sor.</option>
                <option value="Halkla İlişkiler" ${{safeRole === 'Halkla İlişkiler' ? 'selected' : ''}}>Halkla İliş.</option>
                <option value="Üye" ${{safeRole === 'Üye' ? 'selected' : ''}}>Üye</option>
            </select>
            <button type="button" onclick="this.closest('.excel-student-row').remove(); updateExcelStatsBadge();" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding:2px 4px; line-height:1;" title="Öğrenciyi Sil">&times;</button>
        </div>
    `;
}}

// 8. Modala Öğrenci Satırı Ekle
function addExcelStudentRow(cIdx) {{
    const card = document.querySelector(`.excel-cluster-card[data-cluster-idx="${{cIdx}}"]`);
    if (!card) return;
    const wrap = card.querySelector('.excel-students-rows-wrap');
    if (!wrap) return;

    const div = document.createElement('div');
    div.innerHTML = createExcelStudentRowHtml('', '', 'Üye');
    wrap.appendChild(div.firstElementChild);
    updateExcelStatsBadge();
}}

// 9. İstatistik Rozetini Güncelleme
function updateExcelStatsBadge() {{
    const cards = document.querySelectorAll('.excel-cluster-card');
    let totalStudents = 0;
    cards.forEach(card => {{
        const count = card.querySelectorAll('.excel-student-row').length;
        const b = card.querySelector('.excel-card-count-badge');
        if (b) b.textContent = `${{count}} Öğrenci`;
        totalStudents += count;
    }});

    const badge = document.getElementById('kume-excel-stats-badge');
    if (badge) {{
        badge.innerHTML = `<i class="fas fa-check-circle"></i> ${{cards.length}} Küme · ${{totalStudents}} Öğrenci`;
    }}
}}

// 10. Kümeleri Sisteme Aktar ve Kaydet
function applyKumeExcelToSystem() {{
    const targetClass = document.getElementById('kume-excel-target-class')?.value?.trim();
    if (!targetClass) {{
        alert('Lütfen geçerli bir hedef sınıf seçiniz!');
        return;
    }}

    const cards = document.querySelectorAll('.excel-cluster-card');
    if (cards.length === 0) {{
        alert('Aktarılacak küme kartı bulunamadı.');
        return;
    }}

    const finalGroups = [];
    const collectedStudents = [];
    let totalStudents = 0;

    cards.forEach((card, idx) => {{
        const titleInput = card.querySelector('.excel-cluster-title');
        const title = titleInput ? titleInput.value.trim() : `${{idx + 1}}. Küme`;
        const students = [];

        card.querySelectorAll('.excel-student-row').forEach(row => {{
            const noInput = row.querySelector('.excel-student-no');
            const nameInput = row.querySelector('.excel-student-name');
            const roleSelect = row.querySelector('.excel-student-role');

            const no = noInput ? noInput.value.trim() : '';
            const name = nameInput ? nameInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'Üye';

            if (name) {{
                students.push({{ no, name, role }});
                collectedStudents.push({{ no, name, role, sinif: targetClass }});
                totalStudents++;
            }}
        }});

        finalGroups.push({{ title, students }});
    }});

    if (totalStudents === 0) {{
        if (!confirm('Kümelerde hiç öğrenci adı bulunamadı. Boş kümeleri kaydetmek istiyor musunuz?')) {{
            return;
        }}
    }}

    // Yeni Öğrencileri 'studentData' Listesine de Ekle
    const syncCheckbox = document.getElementById('kume-excel-sync-students');
    if (syncCheckbox && syncCheckbox.checked && typeof studentData !== 'undefined') {{
        let addedCount = 0;
        collectedStudents.forEach(stu => {{
            const exists = studentData.some(s => 
                (s.sinif === targetClass) && 
                ((stu.no && String(s.no).trim() === String(stu.no).trim()) || 
                 (s.adSoyad && s.adSoyad.trim().toLowerCase() === stu.name.trim().toLowerCase()))
            );
            if (!exists) {{
                studentData.push({{
                    sira: studentData.length + 1,
                    no: stu.no || '',
                    adSoyad: stu.name,
                    sinif: targetClass
                }});
                addedCount++;
            }}
        }});

        if (addedCount > 0) {{
            if (typeof renderStudentTable === 'function') renderStudentTable();
            if (typeof updateClassDropdown === 'function') updateClassDropdown();
            if (typeof syncStudentsWithTracking === 'function') syncStudentsWithTracking();
            if (typeof renderTrackingList === 'function') renderTrackingList();
            if (typeof syncStudentsWithChecklists === 'function') syncStudentsWithChecklists();
            if (typeof renderChecklistList === 'function') renderChecklistList();
        }}
    }}

    // groupData Nesnesini Güncelle
    const safeClass = targetClass.replace(/\\//g, '_');
    if (typeof groupData !== 'object' || groupData === null) groupData = {{}};
    groupData[safeClass] = finalGroups;
    groupData[targetClass] = finalGroups;

    // Sınıf Filtresini Güncelle ve Kümeleri Çiz
    const classFilter = document.getElementById('class-filter');
    if (classFilter) {{
        let found = false;
        for (let i = 0; i < classFilter.options.length; i++) {{
            if (classFilter.options[i].value === targetClass) {{
                classFilter.selectedIndex = i;
                found = true;
                break;
            }}
        }}
        if (!found) {{
            const opt = document.createElement('option');
            opt.value = targetClass;
            opt.textContent = targetClass;
            opt.selected = true;
            classFilter.appendChild(opt);
        }}
    }}

    if (typeof loadClassGroups === 'function') {{
        loadClassGroups(targetClass);
    }}
    if (typeof updateStudentPickers === 'function') {{
        updateStudentPickers();
    }}

    // Kalıcı Olarak Kaydet (Session, LocalStorage & Firebase)
    try {{
        sessionStorage.setItem('kume_form_sinif', targetClass);
        sessionStorage.setItem('kume_form_groups', JSON.stringify(groupData));
        localStorage.setItem('kume_form_sinif', targetClass);
        localStorage.setItem('kume_form_groups', JSON.stringify(groupData));
    }} catch (e) {{}}

    if (typeof saveDataLocal === 'function') saveDataLocal();
    else if (typeof saveData === 'function') saveData();

    // Modalı Kapat & Bildir
    closeKumeExcelModal();

    if (typeof showStatus === 'function') {{
        showStatus(`🎉 ${{targetClass}} sınıfına ${{finalGroups.length}} küme ve ${{totalStudents}} öğrenci Excel'den aktarıldı!`, false);
    }} else {{
        alert(`✅ Başarılı!\\n\\n${{targetClass}} sınıfı için ${{finalGroups.length}} küme ve toplam ${{totalStudents}} öğrenci başarıyla Excel dosyasından aktarıldı ve sisteme kaydedildi.`);
    }}
}}
'''

with open('scratch/kume_excel_module.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Generated scratch/kume_excel_module.js. Size:", len(js_code))

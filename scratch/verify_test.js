const fs = require('fs');

// Mock browser objects
global.window = global;
global.TextDecoder = TextDecoder;
global.Uint8Array = Uint8Array;
global.ArrayBuffer = ArrayBuffer;
global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
global.Blob = class Blob { constructor(parts) { this.parts = parts; } };
global.URL = { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} };
global.escapeHtml = (s) => String(s || '');
global.document = {
    getElementById: () => ({ value: '', style: {}, innerHTML: '', appendChild: () => {}, removeChild: () => {} }),
    createElement: () => ({ style: {}, appendChild: () => {}, removeChild: () => {}, click: () => {} })
};

// Evaluate the appended module
const jsContent = fs.readFileSync('scratch/kume_excel_module.js', 'utf8');
eval(jsContent);

async function testFull() {
    console.log('Testing parseUniversalKumeExcel on Küme.xlsx...');
    const buf1 = fs.readFileSync('Küme.xlsx');
    const mockFile1 = { name: 'Küme.xlsx', arrayBuffer: async () => buf1.buffer.slice(buf1.byteOffset, buf1.byteOffset + buf1.byteLength) };
    const res1 = await parseUniversalKumeExcel(mockFile1);
    console.log('Res 1: Class = ' + res1.detectedClass + ', Clusters = ' + res1.clusters.length);
    res1.clusters.forEach((c, idx) => {
        console.log('  Küme ' + (idx+1) + ': ' + c.title + ' (' + c.students.length + ' students)');
        c.students.forEach(s => console.log('    [' + s.no + '] ' + s.name + ' - ' + s.role));
    });

    console.log('\nTesting parseUniversalKumeExcel on Kume_Yukleme_Sablonu.xlsx...');
    const buf2 = fs.readFileSync('Kume_Yukleme_Sablonu.xlsx');
    const mockFile2 = { name: 'Kume_Yukleme_Sablonu.xlsx', arrayBuffer: async () => buf2.buffer.slice(buf2.byteOffset, buf2.byteOffset + buf2.byteLength) };
    const res2 = await parseUniversalKumeExcel(mockFile2);
    console.log('Res 2: Class = ' + res2.detectedClass + ', Clusters = ' + res2.clusters.length);
    res2.clusters.forEach((c, idx) => {
        console.log('  Küme ' + (idx+1) + ': ' + c.title + ' (' + c.students.length + ' students)');
    });

    console.log('\nTesting download template decoding...');
    const byteChars = atob(KUME_EXCEL_TEMPLATE_BASE64);
    console.log('Decoded bytes: ' + byteChars.length + ', Valid PK header: ' + (byteChars.slice(0, 2) === 'PK'));
}

testFull().catch(console.error);

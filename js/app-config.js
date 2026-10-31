// ============================================================
// app-config.js
// Global değişkenler, tema yönetimi ve init
// ============================================================

// GLOBAL VERİ YAPILARI
let studentData = [];
let groupData = "";
let scheduleData = [];
let trackingData = [];
let checklistData = [];
let examData = [];
let koclukData = [];
let yksKoclukData = [];
let projeGruplariData = [];
let advancedGroupData = [];

// window referans senkronizasyonu
window.studentData = studentData;
window.groupData = groupData;
window.scheduleData = scheduleData;
window.trackingData = trackingData;
window.checklistData = checklistData;
window.projeGruplariData = projeGruplariData;
window.advancedGroupData = advancedGroupData;

// examData referansını window nesnesi ile iki yönlü tam senkronize et (hafıza ayrışmasını engeller)
try {
    Object.defineProperty(window, 'examData', {
        get: function () {
            return examData;
        },
        set: function (val) {
            examData = Array.isArray(val) ? val : (val || []);
        },
        configurable: true,
        enumerable: true
    });
} catch (e) {
    window.examData = examData;
}


// koclukData referansını window nesnesi ile iki yönlü tam senkronize et (hafıza ayrışmasını engeller)
try {
    Object.defineProperty(window, 'koclukData', {
        get: function () {
            return koclukData;
        },
        set: function (val) {
            koclukData = Array.isArray(val) ? val : (val || []);
        },
        configurable: true,
        enumerable: true
    });
} catch (e) {
    window.koclukData = koclukData;
}

// yksKoclukData referansını window nesnesi ile iki yönlü tam senkronize et (12. Sınıf YKS)
try {
    Object.defineProperty(window, 'yksKoclukData', {
        get: function () {
            return yksKoclukData;
        },
        set: function (val) {
            yksKoclukData = Array.isArray(val) ? val : (val || []);
        },
        configurable: true,
        enumerable: true
    });
} catch (e) {
    window.yksKoclukData = yksKoclukData;
}

// projeGruplariData referansını window nesnesi ile iki yönlü tam senkronize et
try {
    Object.defineProperty(window, 'projeGruplariData', {
        get: function () {
            return projeGruplariData;
        },
        set: function (val) {
            projeGruplariData = Array.isArray(val) ? val : (val || []);
        },
        configurable: true,
        enumerable: true
    });
} catch (e) {
    window.projeGruplariData = projeGruplariData;
}

// advancedGroupData referansını window nesnesi ile iki yönlü tam senkronize et
try {
    Object.defineProperty(window, 'advancedGroupData', {
        get: function () {
            return advancedGroupData;
        },
        set: function (val) {
            advancedGroupData = Array.isArray(val) ? val : (val || []);
        },
        configurable: true,
        enumerable: true
    });
} catch (e) {
    window.advancedGroupData = advancedGroupData;
}

let myChart = null;
let currentSort = { column: null, asc: true };
let activeExamId = null;
let activeTrackingId = null;
let activeChartStudentName = "";
let tempExcelRows = [];
let tempExcelHeaders = [];
const STORAGE_KEY = 'proje_tabanli_ders_data';

// Sınıf adı standardizasyonu (7/A, 7-A, 7 A -> 7A)
window.normSinif = function(s) {
    return String(s || '').replace(/[\/_\-\s]/g, '').trim().toUpperCase();
};

// TEMA YÖNETİMİ
let currentTheme = localStorage.getItem('theme') || 'auto';
function setTheme(theme) { currentTheme = theme; localStorage.setItem('theme', theme); applyTheme(); }
function applyTheme() {
    let themeToApply = currentTheme;
    if (currentTheme === 'auto') {
        themeToApply = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', themeToApply);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        const onclk = btn.getAttribute('onclick') || '';
        if (onclk.includes(currentTheme)) btn.classList.add('active');
    });
}
if (window.matchMedia) {
    try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (currentTheme === 'auto') applyTheme(); });
    } catch (e) {}
}

function updateDbStatusIcon() {
    const icon = document.getElementById('db-status');
    if (!icon) return;
    if (navigator.onLine) {
        icon.style.color = 'var(--accent)';
        icon.title = 'Firestore Veritabanı Aktif (Çevrimiçi)';
    } else {
        icon.style.color = 'var(--red)';
        icon.title = 'Firestore Bağlantısı Yok (Çevrimdışı / Yerel Depolama Devrede)';
    }
}

// SAYFA YÜKLENDİĞİNDE ÇALIŞACAK MANTIK
document.addEventListener('DOMContentLoaded', async () => {
    applyTheme();
    updateDbStatusIcon();

    // Gemini API anahtarını yükle (Eğer tarayıcı otomatik doldurmasıyla yanlışlıkla kullanıcı giriş şifresi kaydedildiyse temizle)
    const savedGeminiKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedGeminiKey && !savedGeminiKey.startsWith('AIzaSy')) {
        localStorage.removeItem('GEMINI_API_KEY');
        localStorage.removeItem('gemini_api_key');
    } else if (savedGeminiKey && document.getElementById('gemini-api-key')) {
        document.getElementById('gemini-api-key').value = savedGeminiKey;
    }

    // Çevrimdışı/Çevrimiçi durum takibi
    window.addEventListener('online', () => {
        updateDbStatusIcon();
        saveData(); // İnternet geldiğinde yerelde biriken verileri senkronize et
    });
    window.addEventListener('offline', updateDbStatusIcon);
});

// KULLANICI ÇIKIŞ FONKSİYONU
function logoutUser() {
    if (confirm('Hesabınızdan çıkış yapmak istediğinize emin misiniz?')) {
        try {
            if (typeof STORAGE_KEY !== 'undefined') {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) {}
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
        }).catch(error => {
            console.error("Çıkış yapılırken hata oluştu:", error);
            alert("Çıkış yapılırken bir hata oluştu.");
        });
    }
}

// ============================================================
// BİP & SOSYAL PAYLAŞIM FONKSİYONLARI
// ============================================================
window.copyTextToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => console.warn("Clipboard API hatası:", err));
    }
    // Senkron execCommand yedeği
    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    } catch (e) {}
};

// ══════════════════════════════════════════════════════════════════
// BİP ENTEGRASYONU: EMOJİ SADELEŞTİRME & ETKİLEŞİMLİ ÖNİZLEME MODALI
// ══════════════════════════════════════════════════════════════════

/**
 * WhatsApp kaynaklı karmaşık, çok baytlı veya nadir Unicode emojileri
 * BiP'in sorunsuz işleyebileceği evrensel standart emojilere sadeleştirir.
 */
window.sanitizeTextForBip = function(text) {
    if (!text) return '';
    let s = String(text);

    // 1. Bayraklar (2 bölgesel gösterge sembolü) -> 🔹
    s = s.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '🔹');

    // 2. Karmaşık / çok katmanlı / BiP uyumsuz emojileri temel BiP emojilerine dönüştür
    s = s.replace(/[\u{1F3C5}\u{1F3C6}\u{1F947}\u{1F948}\u{1F949}\u{1F396}\u{1F38F}\u2B50\u{1F31F}\u2728]/gu, '⭐');
    s = s.replace(/[\u{1F550}-\u{1F567}\u23F0\u23F1\u23F2\u23F3\u{1F4C5}\u{1F4C6}\u{1F5D3}]/gu, '🗓️');
    s = s.replace(/[\u{1F4E3}\u{1F514}\u{1F4EF}\u{1F4E2}]/gu, '📢');
    s = s.replace(/[\u{1F3AF}\u{1F4CD}\u{1F5FA}\u{1F6A9}]/gu, '📍');
    s = s.replace(/[\u{1F4DA}\u{1F4D6}\u{1F3EB}\u{1F393}\u270F\u{1F4DD}\u2712\u{1F58A}\u{1F4CB}\u{1F4C4}\u{1F4D1}\u{1F4CC}]/gu, '📌');
    s = s.replace(/[\u{1F6A8}\u26D4\u{1F6D1}\u2757\u2755\u{1F534}\u{1F7E5}\u274C\u2716\u{1F494}\u26A0]/gu, '⚠️');
    s = s.replace(/[\u2714\u2611\u{1F7E2}\u{1F7E9}\u{1F44D}\u{1F44F}\u{1F389}\u{1F388}\u2705]/gu, '✅');
    s = s.replace(/[\u{1F4A1}\u{1F50D}\u{1F50E}\u{1F9D0}\u2139]/gu, 'ℹ️');
    s = s.replace(/[\u{1F464}\u{1F465}\u{1F468}\u{1F469}\u{1F9EE}\u{1F52C}\u{1F9EA}\u{1F52D}\u{1F30D}\u{1F30E}\u{1F30F}\u262A\u{1F54C}\u{1F4CA}\u{1F4C8}\u{1F4C9}\u{1F4DC}\u{1F333}\u{1F319}\u{1F985}\u{1F48E}\u{1F525}\u{1F4AA}\u{1F64C}\u{1F539}\u{1F538}\u{1F537}\u{1F536}]/gu, '🔹');

    // 3. Sıfır genişlikli bağlayıcıları (ZWJ), varyasyon seçicileri ve cilt tonlarını temizle
    s = s.replace(/[\u200D\uFE0E\uFE0F]/gu, '');
    s = s.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '');

    // 4. İzin verilen temel BiP emojileri (varyasyon seçicisiz eşleşme için)
    const safeEmojis = ['📌', '📢', '🗓', '✅', '⚠️', 'ℹ', '🔹', '📍', '⭐', '💬', '📎', '✉'];

    // Kalan diğer resimsel Unicode emojilerini güvenli mermi imine (🔹) dönüştür
    s = s.replace(/\p{Extended_Pictographic}/gu, (m) => {
        return safeEmojis.includes(m) ? m : '🔹';
    });

    // Art arda gelen mükerrer 🔹 işaretlerini tekleştir
    s = s.replace(/🔹\s*🔹+/g, '🔹');

    return s;
};

/**
 * BiP mesaj düzenleme ve önizleme modalını açar.
 */
window.openBipShareModal = function(rawText, title) {
    window._bipOriginalText = rawText || '';
    const cleanText = window.sanitizeTextForBip(rawText);

    let modal = document.getElementById('bip-share-modal');
    if (!modal) {
        if (typeof window.createBipShareModalDom === 'function') {
            window.createBipShareModalDom();
            modal = document.getElementById('bip-share-modal');
        }
    }

    if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    const titleEl = document.getElementById('bip-modal-title');
    if (titleEl && title) {
        titleEl.textContent = title;
    } else if (titleEl) {
        titleEl.textContent = 'BiP Mesajını Düzenle & Gönder';
    }

    const textarea = document.getElementById('bip-modal-textarea');
    if (textarea) {
        textarea.value = cleanText;
    }

    window.updateBipStats();

    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            if (textarea) {
                textarea.focus();
                textarea.setSelectionRange(0, 0);
            }
        }, 50);
    }
};

/**
 * BiP modalını kapatır.
 */
window.closeBipShareModal = function() {
    const modal = document.getElementById('bip-share-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

/**
 * Textarea altındaki karakter, kelime ve satır sayaçlarını canlı günceller.
 */
window.updateBipStats = function() {
    const textarea = document.getElementById('bip-modal-textarea');
    if (!textarea) return;
    const val = textarea.value || '';

    const charCount = val.length;
    const lineCount = val.length === 0 ? 0 : val.split('\n').length;
    const wordCount = val.trim().length === 0 ? 0 : val.trim().split(/\s+/).length;

    const charEl = document.getElementById('bip-char-count');
    const lineEl = document.getElementById('bip-line-count');
    const wordEl = document.getElementById('bip-word-count');

    if (charEl) charEl.textContent = charCount;
    if (lineEl) lineEl.textContent = lineCount;
    if (wordEl) wordEl.textContent = wordCount;
};

/**
 * Düzenlenen metni panoya kopyalar ve kullanıcıya buton/toast bildirimi verir.
 */
window.copyBipModalText = function() {
    const textarea = document.getElementById('bip-modal-textarea');
    if (!textarea) return;
    const textToCopy = textarea.value;

    window.copyTextToClipboard(textToCopy);

    const btn = document.getElementById('btn-bip-copy');
    if (btn) {
        const oldHtml = btn.innerHTML;
        const oldBg = btn.style.background;
        btn.innerHTML = '<i class="fas fa-check me-1"></i> Kopyalandı! ✔️';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.style.boxShadow = '0 4px 14px rgba(16,185,129,0.35)';

        setTimeout(() => {
            btn.innerHTML = oldHtml;
            btn.style.background = oldBg;
            btn.style.boxShadow = '';
        }, 2200);
    }

    if (typeof window.showGlobalToast === 'function') {
        window.showGlobalToast('✅ BiP mesajı başarıyla panoya kopyalandı!', 'success');
    }
};

/**
 * BiP Web uygulamasını yeni sekmede açar.
 */
window.openBipWebDirectly = function() {
    const textarea = document.getElementById('bip-modal-textarea');
    if (textarea && textarea.value) {
        window.copyTextToClipboard(textarea.value);
    }
    window.open('https://web.bip.com/', '_blank');
    if (typeof window.showGlobalToast === 'function') {
        window.showGlobalToast('🌐 BiP Web açılıyor, panodaki metni Ctrl + V ile yapıştırabilirsiniz.', 'info');
    }
};

/**
 * İmlecin bulunduğu konuma hızlı BiP emojisi ekler.
 */
window.insertEmojiAtBipCursor = function(emoji) {
    const textarea = document.getElementById('bip-modal-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + emoji + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    textarea.focus();
    window.updateBipStats();
};

/**
 * Textarea içindeki metni tekrar BiP emojilerine göre süzer.
 */
window.reSanitizeBipTextarea = function() {
    const textarea = document.getElementById('bip-modal-textarea');
    if (!textarea) return;
    textarea.value = window.sanitizeTextForBip(textarea.value);
    window.updateBipStats();
    if (typeof window.showGlobalToast === 'function') {
        window.showGlobalToast('🧹 Emojiler BiP formatına göre sadeleştirildi.', 'info');
    }
};

/**
 * Textarea içeriğini ilk gelen orijinal metne sıfırlar.
 */
window.resetBipTextareaToOriginal = function() {
    const textarea = document.getElementById('bip-modal-textarea');
    if (!textarea) return;
    if (window._bipOriginalText !== undefined) {
        textarea.value = window._bipOriginalText;
        window.updateBipStats();
        if (typeof window.showGlobalToast === 'function') {
            window.showGlobalToast('🔄 Orijinal ham metne geri dönüldü.', 'info');
        }
    }
};

/**
 * Modal DOM'u dinamik olarak oluşturma (güvenlik fallback).
 */
window.createBipShareModalDom = function() {
    if (document.getElementById('bip-share-modal')) return;
    const m = document.createElement('div');
    m.id = 'bip-share-modal';
    m.onclick = function(e) { if (e.target === m) window.closeBipShareModal(); };
    m.style.cssText = 'display:none; position:fixed; inset:0; width:100%; height:100%; background:rgba(15, 23, 42, 0.82); z-index:100000; backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px; box-sizing:border-box; overflow-y:auto;';
    m.innerHTML = `
        <div style="background:var(--card-bg, #ffffff); border-radius:14px; border:1px solid rgba(0, 178, 255, 0.35); max-width:640px; width:100%; box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 178, 255, 0.25); display:flex; flex-direction:column; overflow:hidden; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border, #e2e8f0); background:linear-gradient(to right, rgba(0, 178, 255, 0.06), transparent);">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="background:linear-gradient(135deg, #00B2FF, #0077B6); color:white; width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 12px rgba(0, 178, 255, 0.35); flex-shrink:0;">
                        <i class="fas fa-comment-dots"></i>
                    </div>
                    <div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <h3 id="bip-modal-title" style="margin:0; font-size:15.5px; font-weight:800; color:var(--text-main);">BiP Mesajını Düzenle &amp; Gönder</h3>
                            <span style="background:rgba(0,178,255,0.12); color:#0284c7; font-size:10px; font-weight:700; padding:2px 7px; border-radius:10px; border:1px solid rgba(0,178,255,0.3);">BiP Uyumlu</span>
                        </div>
                        <p style="margin:2px 0 0 0; font-size:11.5px; color:var(--text-muted);">Karmaşık emojiler sadeleştirildi. Metni dilediğiniz gibi düzenleyip kopyalayabilirsiniz.</p>
                    </div>
                </div>
                <button type="button" onclick="closeBipShareModal()" title="Kapat (ESC)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:24px; line-height:1; padding:0 6px; border-radius:6px;">&times;</button>
            </div>
            <div style="padding:16px 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
                        <span style="font-size:11px; font-weight:700; color:var(--text-muted); margin-right:4px;">Hızlı Emojiler:</span>
                        <button type="button" onclick="insertEmojiAtBipCursor('📌')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">📌</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('📢')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">📢</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('🗓️')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">🗓️</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('✅')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">✅</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('⚠️')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">⚠️</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('ℹ️')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">ℹ️</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('🔹')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">🔹</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('📍')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">📍</button>
                        <button type="button" onclick="insertEmojiAtBipCursor('⭐')" style="border:1px solid var(--border); background:var(--input-bg); border-radius:6px; padding:3px 7px; font-size:13px; cursor:pointer;">⭐</button>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button type="button" onclick="reSanitizeBipTextarea()" class="btn" style="background:var(--input-bg); color:var(--text-main); border:1px solid var(--border); font-size:11px; padding:4px 8px; border-radius:6px; cursor:pointer; font-weight:600;"><i class="fas fa-magic me-1" style="color:#00B2FF;"></i> Sadeleştir</button>
                        <button type="button" onclick="resetBipTextareaToOriginal()" class="btn" style="background:var(--input-bg); color:var(--text-muted); border:1px solid var(--border); font-size:11px; padding:4px 8px; border-radius:6px; cursor:pointer;"><i class="fas fa-undo me-1"></i> Orijinal</button>
                    </div>
                </div>
                <textarea id="bip-modal-textarea" oninput="updateBipStats()" placeholder="BiP mesajı..." style="width:100%; min-height:220px; max-height:400px; resize:vertical; padding:12px 14px; font-family:ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace; font-size:12.5px; line-height:1.55; border-radius:10px; border:1px solid var(--border, #cbd5e1); background:var(--input-bg, #f8fafc); color:var(--text-main); box-sizing:border-box; outline:none; transition:border-color 0.2s;"></textarea>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:11.5px; color:var(--text-muted); flex-wrap:wrap; gap:6px;">
                    <div>
                        <span id="bip-char-count" style="font-weight:700; color:var(--text-main);">0</span> karakter · 
                        <span id="bip-word-count" style="font-weight:700; color:var(--text-main);">0</span> kelime · 
                        <span id="bip-line-count" style="font-weight:700; color:var(--text-main);">0</span> satır
                    </div>
                    <div style="font-size:11px; color:#0284c7; display:flex; align-items:center; gap:4px; font-weight:600;">
                        <i class="fas fa-check-circle" style="color:#10b981;"></i> BiP Evrensel Emoji Standardı
                    </div>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-top:1px solid var(--border, #e2e8f0); background:var(--input-bg, #f8fafc); flex-wrap:wrap; gap:10px;">
                <button type="button" class="btn btn-clear" onclick="closeBipShareModal()" style="padding:8px 16px; font-size:12px;"><i class="fas fa-times me-1"></i> İptal</button>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button type="button" id="btn-bip-open-web" class="btn" onclick="openBipWebDirectly()" style="background:rgba(0,178,255,0.12); color:#0284c7; border:1px solid rgba(0,178,255,0.35); font-weight:700; padding:8px 16px; border-radius:8px; font-size:12px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;"><i class="fas fa-external-link-alt"></i> BiP Web'i Aç</button>
                    <button type="button" id="btn-bip-copy" class="btn" onclick="copyBipModalText()" style="background:linear-gradient(135deg, #00B2FF, #0077B6); color:white; font-weight:700; padding:9px 20px; border-radius:8px; font-size:12.5px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 14px rgba(0,178,255,0.35);"><i class="fas fa-copy"></i> Panoya Kopyala</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(m);
};

// Global BiP paylaşım tetikleyicisi
window.shareViaBip = function(text, title) {
    window.openBipShareModal(text, title);
};

// ESC Tuşu ile BiP Modalını Kapatma Dinleyicisi
if (!window._bipEscBound) {
    window._bipEscBound = true;
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const m = document.getElementById('bip-share-modal');
            if (m && m.style.display !== 'none' && m.style.display !== '') {
                window.closeBipShareModal();
            }
        }
    });
}

// Global Güvenli HTML Kaçış Yardımcısı
window.escapeHTML = function(str) {
    if (str === null || str === undefined) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};
window.escapeHtml = window.escapeHTML;

// HTML Nitelikleri (Attributes) için Kaçış
window.escapeAttr = function(str) {
    if (str === null || str === undefined) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
};

// Inline JS Dizgileri (onclick vb.) için Güvenli Kaçış (CWE-79 Breakout Önleyici)
window.escapeJs = function(str) {
    if (str === null || str === undefined) return '';
    return str.toString()
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/</g, '\\x3C')
        .replace(/>/g, '\\x3E')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
};

// CSV / Excel Formula Injection Önleyici (CWE-1236)
window.sanitizeFormula = function(val) {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (/^[=\+\-@\t\r]/.test(str)) {
        return "'" + str;
    }
    return str;
};

// Çoklu Kiracı / Öğretmen İzolasyonlu Form Açıcı (BOLA/IDOR Önleyici)
window.openTeacherForm = function(url) {
    const uid = (window.currentUser && window.currentUser.uid) || window.activeWorkspaceUid || (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
    const separator = url.includes('?') ? '&' : '?';
    const fullUrl = uid ? `${url}${separator}uid=${encodeURIComponent(uid)}` : url;
    window.open(fullUrl, '_blank');
};

// ============================================================
// MOBİL PERFORMANS & EVRENSEL MODAL YÖNETİMİ (UX / ACCELERATION)
// ============================================================

let _openModalsCount = 0;
let _scrollLockPosY = 0;
let _isScrollLocked = false;

window.lockBodyScroll = function() {
    if (!_isScrollLocked) {
        _scrollLockPosY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        document.body.classList.add('modal-open');
        document.body.style.top = `-${_scrollLockPosY}px`;
        _isScrollLocked = true;
    }
    _openModalsCount++;
};

window.unlockBodyScroll = function(forceAll = false) {
    if (forceAll) {
        _openModalsCount = 0;
    } else {
        _openModalsCount = Math.max(0, _openModalsCount - 1);
    }
    if (_openModalsCount === 0 && _isScrollLocked) {
        document.body.classList.remove('modal-open');
        const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10)) || _scrollLockPosY;
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
        _isScrollLocked = false;
    }
};

window.syncModalScrollLock = function() {
    // Görünür herhangi bir modal var mı kontrol et
    const visibleModal = document.querySelector(`
        .modal[style*="display: flex"], .modal[style*="display: block"],
        .pg-modal-overlay[style*="display: block"], .pg-modal-overlay[style*="display: flex"],
        [id$="-modal"][style*="display: block"], [id$="-modal"][style*="display: flex"],
        [id*="modal-"][style*="display: block"], [id*="modal-"][style*="display: flex"],
        #evaluation-modal[style*="display: block"], #checklist-eval-modal[style*="display: block"],
        #checklist-criteria-modal[style*="display: block"], #chart-modal[style*="display: block"],
        #xp-modal[style*="display: block"], #rubric-modal[style*="display: block"],
        #observation-modal[style*="display: block"], #group-eval-modal[style*="display: block"],
        #cbl-report-modal[style*="display: block"], #soru-takip-scanner-modal[style*="display: flex"],
        #kume-ocr-modal[style*="display: flex"]
    `);

    if (visibleModal) {
        if (!_isScrollLocked) {
            _scrollLockPosY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            document.body.classList.add('modal-open');
            document.body.style.top = `-${_scrollLockPosY}px`;
            _isScrollLocked = true;
        }
    } else {
        if (_isScrollLocked) {
            document.body.classList.remove('modal-open');
            const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10)) || _scrollLockPosY;
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
            _isScrollLocked = false;
            _openModalsCount = 0;
        }
    }
};

// Evrensel Modal Açma / Kapatma
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    requestAnimationFrame(() => {
        modal.style.display = 'flex';
        window.lockBodyScroll();
    });
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
    window.unlockBodyScroll();
    window.syncModalScrollLock();
};

// Sayfa yüklendiğinde ESC tuşu, backdrop tıklaması ve MutationObserver dinleyicilerini başlat
document.addEventListener('DOMContentLoaded', function() {
    // 1. ESC Tuşu ile Modal Kapatma
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            let closedAny = false;
            const openModals = document.querySelectorAll(`
                .modal, .pg-modal-overlay, [id$="-modal"], [id*="modal-"],
                #evaluation-modal, #checklist-eval-modal, #checklist-criteria-modal,
                #chart-modal, #xp-modal, #rubric-modal, #observation-modal, #group-eval-modal,
                #cbl-report-modal, #soru-takip-scanner-modal, #kume-ocr-modal
            `);
            openModals.forEach(m => {
                if (m.style.display && m.style.display !== 'none') {
                    m.style.display = 'none';
                    closedAny = true;
                }
            });
            if (closedAny) {
                window.unlockBodyScroll(true);
            }
        }
    });

    // 2. Backdrop (Koyu Arka Plan) Tıklaması ile Kapatma
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        const isBackdrop = target.classList.contains('modal') ||
                           target.classList.contains('pg-modal-overlay') ||
                           (target.id && (target.id.endsWith('-modal') || target.id.startsWith('modal-'))) ||
                           target.id === 'evaluation-modal' ||
                           target.id === 'checklist-eval-modal' ||
                           target.id === 'chart-modal' ||
                           target.id === 'xp-modal' ||
                           target.id === 'rubric-modal' ||
                           target.id === 'observation-modal' ||
                           target.id === 'group-eval-modal' ||
                           target.id === 'cbl-report-modal' ||
                           target.id === 'soru-takip-scanner-modal' ||
                           target.id === 'kume-ocr-modal';

        if (isBackdrop && target.style.display !== 'none' && target.style.display !== '') {
            target.style.display = 'none';
            window.syncModalScrollLock();
        }
    });

    // 3. MutationObserver: Sayfa genelinde herhangi bir modal display değiştiğinde scroll lock senkronizasyonu
    try {
        const modalObserver = new MutationObserver(function(mutations) {
            for (let mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    window.syncModalScrollLock();
                    break;
                }
            }
        });

        const allModals = document.querySelectorAll(`
            .modal, .pg-modal-overlay, [id$="-modal"], [id*="modal-"],
            #evaluation-modal, #checklist-eval-modal, #checklist-criteria-modal,
            #chart-modal, #xp-modal, #rubric-modal, #observation-modal, #group-eval-modal,
            #cbl-report-modal, #soru-takip-scanner-modal, #kume-ocr-modal
        `);
        allModals.forEach(m => {
            modalObserver.observe(m, { attributes: true, attributeFilter: ['style', 'class'] });
        });
    } catch (e) {
        console.warn("[ModalObserver] Desteklenmiyor veya hata:", e);
    }
});




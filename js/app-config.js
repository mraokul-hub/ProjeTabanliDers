// ============================================================
// app-config.js
// Global değişkenler, tema yönetimi ve init
// ============================================================

// GLOBAL VERİ YAPILARI
let studentData = [];
let groupData = "";
let scheduleData = [];
let trackingData = [];
let examData = [];
let myChart = null;
let currentSort = { column: null, asc: true };
let activeExamId = null;
let activeTrackingId = null;
let activeChartStudentName = "";
let tempExcelRows = [];
let tempExcelHeaders = [];
const STORAGE_KEY = 'proje_tabanli_ders_data';

// TEMA YÖNETİMİ
let currentTheme = localStorage.getItem('theme') || 'auto';
function setTheme(theme) { currentTheme = theme; localStorage.setItem('theme', theme); applyTheme(); }
function applyTheme() {
    let themeToApply = currentTheme;
    if (currentTheme === 'auto') themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeToApply);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(currentTheme)) btn.classList.add('active');
    });
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (currentTheme === 'auto') applyTheme(); });

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

    // Gemini API anahtarını yükle
    const savedGeminiKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedGeminiKey && document.getElementById('gemini-api-key')) {
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

window.showBipShareToast = function(text, title) {
    let toast = document.getElementById('bip-share-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bip-share-toast';
        toast.style = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            background: rgba(15, 23, 42, 0.95);
            color: #ffffff;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(0, 178, 255, 0.4);
            max-width: 420px;
            font-family: inherit;
            backdrop-filter: blur(8px);
            animation: bipSlideIn 0.3s ease-out;
            transition: opacity 0.3s, transform 0.3s;
        `;
        document.body.appendChild(toast);

        if (!document.getElementById('bip-toast-styles')) {
            const st = document.createElement('style');
            st.id = 'bip-toast-styles';
            st.textContent = `
                @keyframes bipSlideIn {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(st);
        }
    }

    toast.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:12px;">
            <div style="background:#00B2FF; color:white; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px;">
                <i class="fas fa-comment-dots"></i>
            </div>
            <div style="flex:1;">
                <div style="font-weight:700; font-size:14px; color:#00B2FF; margin-bottom:4px;">
                    BiP Özet Metni Kopyalandı! ✅
                </div>
                <div style="font-size:12px; color:#e2e8f0; line-height:1.4; margin-bottom:12px;">
                    BiP Web yeni sekmede açıldı. Mesajı göndermek istediğiniz sohbete tıklayıp <strong>Ctrl + V</strong> (Yapıştır) ile hemen gönderebilirsiniz.
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                    <button id="bip-toast-copy-btn" class="btn" style="background:#334155; color:white; padding:5px 10px; font-size:11px; border-radius:6px; border:none; cursor:pointer;">
                        <i class="fas fa-copy"></i> Tekrar Kopyala
                    </button>
                    <button id="bip-toast-open-btn" class="btn" style="background:#00B2FF; color:white; padding:5px 10px; font-size:11px; border-radius:6px; border:none; cursor:pointer;">
                        <i class="fas fa-external-link-alt"></i> BiP Web'e Git
                    </button>
                </div>
            </div>
            <button onclick="document.getElementById('bip-share-toast').style.display='none'" style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:18px; padding:0 4px; line-height:1;">
                &times;
            </button>
        </div>
    `;

    toast.style.display = 'block';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    const copyBtn = document.getElementById('bip-toast-copy-btn');
    if (copyBtn) {
        copyBtn.onclick = () => {
            window.copyTextToClipboard(text);
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Tekrar Kopyala';
            }, 2000);
        };
    }

    const openBtn = document.getElementById('bip-toast-open-btn');
    if (openBtn) {
        openBtn.onclick = () => {
            window.open('https://web.bip.com/', '_blank');
        };
    }

    if (window._bipToastTimer) clearTimeout(window._bipToastTimer);
    window._bipToastTimer = setTimeout(() => {
        if (toast) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => { toast.style.display = 'none'; }, 300);
        }
    }, 8000);
};

window.shareViaBip = function(text, title) {
    // 1. Her koşulda metni panoya kopyala
    window.copyTextToClipboard(text);

    // 2. Mobil cihaz kontrolü ve Web Share API desteği
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
        navigator.share({
            title: title || 'BiP Paylaşım',
            text: text
        }).catch(err => {
            if (err.name !== 'AbortError') {
                window.open('https://web.bip.com/', '_blank');
                window.showBipShareToast(text, title);
            }
        });
        return;
    }

    // 3. Masaüstü / Web: BiP Web'i aç ve kullanıcıya panoya kopyalandığını bildir
    window.open('https://web.bip.com/', '_blank');
    window.showBipShareToast(text, title);
};


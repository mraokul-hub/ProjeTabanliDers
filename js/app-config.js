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
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';
        }).catch(error => {
            console.error("Çıkış yapılırken hata oluştu:", error);
            alert("Çıkış yapılırken bir hata oluştu.");
        });
    }
}

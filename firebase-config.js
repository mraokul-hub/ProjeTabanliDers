// firebase-config.js dosyasının tam içeriği
const firebaseConfig = {
    apiKey: "AIzaSyBCc-q7R0EKKgOn7Ok8cHdaI5L4FB_Tq2w",
    authDomain: "proje-tabanli-ders-isleme.firebaseapp.com",
    databaseURL: "https://proje-tabanli-ders-isleme-default-rtdb.firebaseio.com",
    projectId: "proje-tabanli-ders-isleme",
    storageBucket: "proje-tabanli-ders-isleme.appspot.com",
    messagingSenderId: "999626004209",
    appId: "1:999626004209:web:02f6b026e5f0dc907dbb50",
    measurementId: "G-G1R6X5DTNN"
};

// Firebase'i Başlat (Daha önce başlatılmadıysa başlatır, hata vermesini önler)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Değişkenleri tüm HTML dosyalarından erişilebilir olması için window objesine atıyoruz
window.analytics = firebase.analytics();
window.db = firebase.database();
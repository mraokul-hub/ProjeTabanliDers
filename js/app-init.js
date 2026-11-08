// app-init.js — Sistem Başlatıcı ve Sekme Uyanma Kancası
// Proje Tabanlı Ders İşleme | Vanilla JS
// Kaynak: Proje Tabanlı Ders işleme.html satır 10235–10350
// Oluşturulma: 08.11.2026 15:17:13
// UYARI: waitForFirebaseConnection guard'ı korunuyor.
'use strict';

        (function () {
            const nativeOpenTab = window.openTab;

            window.openTab = function (tabId) {
                // 1. Orijinal sekme değiştirici fonksiyonu çalıştır
                if (typeof nativeOpenTab === 'function') {
                    try {
                        nativeOpenTab(tabId);
                    } catch (e) {
                        console.warn("nativeOpenTab hatası:", e);
                    }
                } else {
                    // ui-controller.js yüklenememişse güvenli yedek sekme motoru
                    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
                    document.querySelectorAll('.tab-btn, .mobile-tab-btn').forEach(btn => btn.classList.remove('active'));

                    const targetContent = document.getElementById(tabId);
                    if (targetContent) targetContent.classList.add('active');

                    const activeBtn = document.querySelector(`[onclick*="'${tabId}'"]`);
                    if (activeBtn) activeBtn.classList.add('active');
                }

                // 1.5. Modül 3 (⚔️ Ders İşleme Stratejisi & Müfredat) Uyanma Mekanizması
                if (tabId === 'tab3') {
                    setTimeout(() => {
                        if (typeof window.initMufredat === 'function') window.initMufredat();
                    }, 50);
                }

                // 2. Modül 10 (🌙 İleri Çalışma Grupları) Uyanma Mekanizması
                if (tabId === 'tab8') {
                    setTimeout(() => {
                        if (typeof window.initIleriGruplarModule === 'function') {
                            window.initIleriGruplarModule();
                        } else {
                            if (typeof window.ileriSinifDoldur === 'function') window.ileriSinifDoldur();
                            if (typeof window.ileriGrupRenderExisting === 'function') window.ileriGrupRenderExisting();
                        }
                    }, 50);
                }

                // 3. Modül 11 (🌳 Proje Grupları) Uyanma Mekanizması
                if (tabId === 'tab9') {
                    setTimeout(() => {
                        if (typeof window.initProjeGruplariModule === 'function') {
                            window.initProjeGruplariModule();
                        } else {
                            if (typeof window.pgLoad === 'function') window.pgLoad();
                            if (typeof window.pgFillSinifDropdowns === 'function') window.pgFillSinifDropdowns();
                            if (typeof window.pgRenderList === 'function') window.pgRenderList();
                            if (typeof window.pgUpdateTypeCounts === 'function') window.pgUpdateTypeCounts();
                        }
                    }, 50);
                }
            };
        })();

        // ── DOM Yüklendiğinde Otomatik Başlatıcılar ──
        document.addEventListener('DOMContentLoaded', () => {
            // Soru Takip Modülü
            setTimeout(() => {
                if (window.SoruTakipUI && !window.SoruTakipUI._initialized) {
                    window.SoruTakipUI.init();
                }
            }, 600);

            // Takip ve Kontrol Çizelgeleri Modülü
            setTimeout(() => {
                if (typeof window.initChecklistModule === 'function') {
                    window.initChecklistModule();
                }
            }, 500);

            // LGS Bilişsel Koçluk Modülü
            setTimeout(() => {
                if (typeof window.renderKoclukModule === 'function') {
                    window.renderKoclukModule();
                }
            }, 700);

            // YKS Bilişsel Koçluk Modülü
            setTimeout(() => {
                if (typeof window.renderYksKoclukModule === 'function') {
                    window.renderYksKoclukModule();
                }
            }, 750);

            // VAK Bilişsel Değerlendirme & Raporlama Modülü
            setTimeout(() => {
                if (window.VakEngine && typeof window.VakEngine.renderVakReportsTable === 'function') {
                    window.VakEngine.renderVakReportsTable();
                }
            }, 800);

            // 10. İleri Çalışma Grupları & 11. Proje Grupları Başlangıç Ön Yüklemesi
            setTimeout(() => {
                if (typeof window.initIleriGruplarModule === 'function') {
                    window.initIleriGruplarModule();
                } else if (typeof window.ileriSinifDoldur === 'function') {
                    window.ileriSinifDoldur();
                }

                if (typeof window.initProjeGruplariModule === 'function') {
                    window.initProjeGruplariModule();
                } else if (typeof window.pgLoad === 'function') {
                    window.pgLoad();
                    if (typeof window.pgFillSinifDropdowns === 'function') window.pgFillSinifDropdowns();
                    if (typeof window.pgRenderList === 'function') window.pgRenderList();
                    if (typeof window.pgUpdateTypeCounts === 'function') window.pgUpdateTypeCounts();
                }
            }, 650);
        });

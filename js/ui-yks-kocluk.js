// ============================================================
// ui-yks-kocluk.js (v2.0 Master Lise & YKS Bilişsel İcra Sürümü)
// 9, 10, 11, 12. Sınıf & Mezun Bilişsel Mentorluk, OYSS & YKS Ekosistemi
// MEB Maarif Modeli, Çift Motorlu TDE™, 1-3-7-21 Ebbinghaus & İzomorfik A4
// ============================================================

(function () {
    'use strict';

    let activeYksKoclukId = null;
    let activeYksDetailSubTab = 'tab-yks-profil';
    let activeHataFilter = 'all'; // all, due, A, B, C, D, completed
    let activeSelectedKokNeden = 'A';

    const escapeFn = window.escapeHTML || function (s) {
        return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    // ─────────────────────────────────────────────────────────────
    // MEB 10 DERS SABİTLERİ (OYSS ORTAK YAZILILARI)
    // ─────────────────────────────────────────────────────────────
    const MEB_10_DERSI = [
        { id: 'turk_dili', name: 'Türk Dili ve Edebiyatı', kredi: 5, icon: '📖' },
        { id: 'matematik', name: 'Matematik', kredi: 6, icon: '📐' },
        { id: 'fizik', name: 'Fizik', kredi: 2, icon: '⚡' },
        { id: 'kimya', name: 'Kimya', kredi: 2, icon: '🧪' },
        { id: 'biyoloji', name: 'Biyoloji', kredi: 2, icon: '🧬' },
        { id: 'tarih', name: 'Tarih', kredi: 2, icon: '📜' },
        { id: 'cografya', name: 'Coğrafya', kredi: 2, icon: '🌍' },
        { id: 'felsefe', name: 'Felsefe', kredi: 2, icon: '🤔' },
        { id: 'din_kulturu', name: 'Din Kültürü ve Ahlak Bilgisi', kredi: 2, icon: '🌙' },
        { id: 'ingilizce', name: 'İngilizce (1. Yabancı Dil)', kredi: 4, icon: '🗣️' }
    ];

    /**
     * Sınıf Seviyesini Tespit Et (9, 10, 11, 12, 'mezun')
     */
    function detectSinifSeviyesi(val) {
        if (!val) return 12;
        if (typeof val === 'number') return val;
        const str = String(val).toLowerCase().trim();
        if (str.includes('mezun')) return 'mezun';
        const match = str.match(/(9|10|11|12)/);
        if (match) return parseInt(match[1], 10);
        return 12;
    }

    /**
     * OBP Koruma Kalkanı Hesaplayıcı (4 Yıllık Projeksiyon & Ham Puana Katkı)
     * Ham puana eklenecek OBP = Diploma Notu * 0.6 (30.00 - 60.00 Puan)
     */
    function calculateObpShield(item) {
        if (!item) return { diplomaNotu: 85, obpPuan: 425, yerlestirmeKatkisi: 51, s9: 85, s10: 85, s11: 85, s12: 85 };
        const obpTakip = item.obpTakip || {};
        const base = Number(item.obp) || 85;
        const s9 = Number(obpTakip.sinif9) || base;
        const s10 = Number(obpTakip.sinif10) || s9;
        const s11 = Number(obpTakip.sinif11) || s10;
        const s12 = Number(obpTakip.sinif12_tahmin) || s11;

        const diplomaNotu = parseFloat(((s9 + s10 + s11 + s12) / 4).toFixed(2));
        const obpPuan = parseFloat((diplomaNotu * 5).toFixed(2)); // 500 üzerinden
        const yerlestirmeKatkisi = parseFloat((diplomaNotu * 0.6).toFixed(2)); // 30 - 60 puan arası

        return {
            s9, s10, s11, s12,
            diplomaNotu,
            obpPuan,
            yerlestirmeKatkisi,
            detay: `Diploma Notu: ${diplomaNotu} ➔ YKS Ham Puana Katkı: +${yerlestirmeKatkisi} Puan`
        };
    }

    /**
     * MEB OYSS 10 Ders Ağırlıklı Karne Ortalaması Hesaplayıcı
     */
    function calculateOyssAverages(item) {
        const yazililar = item?.yazililar || {};
        let totalWeighted = 0;
        let totalKredi = 0;

        MEB_10_DERSI.forEach(d => {
            const y1 = parseFloat(yazililar.donem1_y1?.[d.id]);
            const y2 = parseFloat(yazililar.donem1_y2?.[d.id]);
            const y3 = parseFloat(yazililar.donem2_y1?.[d.id]);
            const y4 = parseFloat(yazililar.donem2_y2?.[d.id]);

            const notes = [y1, y2, y3, y4].filter(n => !isNaN(n) && n !== null);
            if (notes.length > 0) {
                const avg = notes.reduce((a, b) => a + b, 0) / notes.length;
                totalWeighted += avg * d.kredi;
                totalKredi += d.kredi;
            }
        });

        const generalAvg = totalKredi > 0 ? parseFloat((totalWeighted / totalKredi).toFixed(2)) : (Number(item?.obp) || 0);
        return { generalAvg, totalKredi };
    }

    // ─────────────────────────────────────────────────────────────
    // 0. ÇİFT MOTORLU TDE, ARALIKLI TEKRAR & KONFOR ALANI MOTORLARI
    // ─────────────────────────────────────────────────────────────

    /**
     * Çift Motorlu Turlama Disiplin Endeksi (TDE-YKS) Hesaplayıcı (0-100 Puan)
     * Oturuma (TYT veya AYT) göre dinamik psikometrik katsayılar uygular.
     */
    function calculateYksTde(deneme) {
        if (!deneme) {
            return {
                tdePuan: 75,
                badgeText: 'Orta Düzey Strateji',
                badgeColor: '#f59e0b',
                badgeBg: 'rgba(245, 158, 11, 0.12)',
                badgeBorder: 'rgba(245, 158, 11, 0.35)',
                detay: 'Deneme verisi bulunmuyor.'
            };
        }

        const isAyt = String(deneme.tur || '').toUpperCase().includes('AYT');
        const s = deneme.sureAnalizi || {};

        if (isAyt) {
            // AYT TDE: 180 dk / 80 soru (soru başına 2.25 dk). Hız değil, işlem hatasızlığı & kavram yanılgısı esastır.
            let puan = 100;
            const dikkatHatasi = Number(s.dikkatHatasiSayisi) || 0;
            const kokOkumaHatasi = Number(s.kokOkumaHatasiSayisi) || 0;
            const kumarSoru = Number(s.kumarSoruSayisi) || 0;
            const optik = !!s.optikKontrol;

            puan -= (dikkatHatasi * 12);
            puan -= (kokOkumaHatasi * 10);
            puan -= (kumarSoru * 15);
            if (!optik) puan -= 10;

            puan = Math.max(0, Math.min(100, puan));

            let badgeText = 'Yüksek Akademik İsabet';
            let badgeColor = '#10b981';
            let badgeBg = 'rgba(16, 185, 129, 0.12)';
            let badgeBorder = 'rgba(16, 185, 129, 0.35)';

            if (puan < 70) {
                badgeText = 'Kavramsal Boşluk / Acelecilik';
                badgeColor = '#ef4444';
                badgeBg = 'rgba(239, 68, 68, 0.12)';
                badgeBorder = 'rgba(239, 68, 68, 0.35)';
            } else if (puan < 85) {
                badgeText = 'Orta Düzey İşlem Dalgalanması';
                badgeColor = '#f59e0b';
                badgeBg = 'rgba(245, 158, 11, 0.12)';
                badgeBorder = 'rgba(245, 158, 11, 0.35)';
            }

            return {
                tdePuan: puan,
                badgeText,
                badgeColor,
                badgeBg,
                badgeBorder,
                detay: `AYT İsabet Skoru: Dikkat Hatası: -${dikkatHatasi * 12}p, Soru Kökü: -${kokOkumaHatasi * 10}p, Rastgele İşaretleme: -${kumarSoru * 15}p`
            };
        } else {
            // TYT TDE: 165 dk / 120 soru (soru başına 1.375 dk). Zaman baskısı, turlama ve inatlaşmama esastır.
            const turkce1Tur = Number(s.turkce1Tur || 42);
            const mat1Tur = Number(s.mat1Tur || 45);
            const fenSos1Tur = Number(s.fenSos1Tur || 30);
            const inatlasma = Number(s.inatlasmaSayisi || 0);
            const tur2Kazanc = Number(s.tur2NetKazanc || 0);
            const optik = !!s.optikKontrol;

            // Zaman puanı (Maks 35)
            const turkcePuan = Math.max(0, 15 - Math.floor(Math.max(0, turkce1Tur - 43) / 3) * 3);
            const matPuan = Math.max(0, 12 - Math.floor(Math.max(0, mat1Tur - 45) / 3) * 3);
            const fenSosPuan = Math.max(0, 8 - Math.floor(Math.max(0, fenSos1Tur - 32) / 3) * 2);

            // İnatlaşmama cezası (Maks 30 puan - her inatlaşılan soru -8p)
            const inatlasmaPuan = Math.max(0, 30 - (inatlasma * 8));

            // 2. Tur net kurtarma kazancı (Maks 20 puan - her kurtarılan net +4p)
            const tur2Puan = Math.min(20, Math.max(0, Math.round(tur2Kazanc * 4)));

            // Optik kontrol (Maks 15 puan)
            const optikPuan = optik ? 15 : 0;

            const total = Math.min(100, Math.max(0, turkcePuan + matPuan + fenSosPuan + inatlasmaPuan + tur2Puan + optikPuan));

            let badgeText = 'Üst Düzey Turlama Disiplini';
            let badgeColor = '#10b981';
            let badgeBg = 'rgba(16, 185, 129, 0.12)';
            let badgeBorder = 'rgba(16, 185, 129, 0.35)';

            if (total < 70) {
                badgeText = 'Kırmızı Alarm: Süre İntiharı & İnatlaşma';
                badgeColor = '#ef4444';
                badgeBg = 'rgba(239, 68, 68, 0.12)';
                badgeBorder = 'rgba(239, 68, 68, 0.35)';
            } else if (total < 85) {
                badgeText = 'Orta Düzey Süre Yönetimi';
                badgeColor = '#f59e0b';
                badgeBg = 'rgba(245, 158, 11, 0.12)';
                badgeBorder = 'rgba(245, 158, 11, 0.35)';
            }

            return {
                tdePuan: total,
                turkcePuan,
                matPuan,
                fenSosPuan,
                inatlasmaPuan,
                tur2Puan,
                optikPuan,
                badgeText,
                badgeColor,
                badgeBg,
                badgeBorder,
                detay: `TYT Süre Skoru: Türkçe (${turkcePuan}/15), Mat (${matPuan}/12), Fen/Sos (${fenSosPuan}/8), İnatlaşmama (${inatlasmaPuan}/30), 2. Tur (${tur2Puan}/20), Optik (${optikPuan}/15)`
            };
        }
    }

    /**
     * Konfor Alanı İndeksi (KAİ) & Psödo-Çalışma Dedektörü
     * KAİ = [(Düzey 1 + Düzey 2) / Toplam Soru] * 100
     */
    function calculateKai(haftalikSoru) {
        if (!haftalikSoru) return { kai: 0, isComfortTrap: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)', label: 'Veri Yok', total: 0 };

        const d1 = Number(haftalikSoru.duzey1) || 0;
        const d2 = Number(haftalikSoru.duzey2) || 0;
        const d3 = Number(haftalikSoru.duzey3) || 0;
        const d4 = Number(haftalikSoru.duzey4) || 0;
        const total = d1 + d2 + d3 + d4;

        if (total === 0) {
            return { kai: 0, isComfortTrap: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)', label: 'Soru Girilmedi', total: 0 };
        }

        const kai = Math.round(((d1 + d2) / total) * 100);
        let label = '🟢 Dengeli & Zorlayıcı Büyüme Bölgesi (ZPD)';
        let badgeColor = '#10b981';
        let badgeBg = 'rgba(16, 185, 129, 0.12)';
        let isComfortTrap = false;

        if (kai > 55) {
            label = '🔴 Ağır Konfor Alanı Tuzağı (Psödo-Çalışma Alarmı)';
            badgeColor = '#ef4444';
            badgeBg = 'rgba(239, 68, 68, 0.12)';
            isComfortTrap = true;
        } else if (kai > 45) {
            label = '🟡 Dikkat: Kolay Soru Ağırlıklı Gelişim';
            badgeColor = '#f59e0b';
            badgeBg = 'rgba(245, 158, 11, 0.12)';
        } else if (kai < 30) {
            label = '🟣 Üst Düzey Nöral Direnç (İlk 1.000 / 5.000 Hedefi)';
            badgeColor = '#8b5cf6';
            badgeBg = 'rgba(139, 92, 246, 0.12)';
        }

        return {
            kai,
            total,
            isComfortTrap,
            badgeColor,
            badgeBg,
            label
        };
    }

    /**
     * YKS Spaced Repetition (Aralıklı Tekrar) Durumu
     * 1 gün (24h) -> 3 gün (72h) -> 7 gün (168h) -> 21 gün (504h) Ebbinghaus Mühürleme Döngüsü
     */
    function getYksHataRepeatStatus(hata) {
        if (!hata) return { status: 'none', label: 'Bilinmiyor', isDue: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' };

        if (hata.tekrar1 && hata.tekrar3 && hata.tekrar7 && hata.tekrar21) {
            return { status: 'completed', label: '🟢 Kalıcılaştı (Hafızaya Mühürlendi)', isDue: false, badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.12)' };
        }

        const now = Date.now();
        let createdMs = now;
        if (hata.createdAt) {
            createdMs = new Date(hata.createdAt).getTime();
        } else if (hata.tarih) {
            const parts = String(hata.tarih).split('.');
            if (parts.length === 3) createdMs = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
            else createdMs = new Date(hata.tarih).getTime();
        }
        if (isNaN(createdMs)) createdMs = now;

        const diffHours = (now - createdMs) / (1000 * 60 * 60);

        if (!hata.tekrar1) {
            if (diffHours >= 24) return { status: 'due1', label: '🔴 1. Gün Tekrarı Gecikti (Bugün Çöz!)', isDue: true, badgeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.12)' };
            return { status: 'wait1', label: '⏳ 1. Gün Tekrarı Bekleniyor (24 sa)', isDue: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' };
        }
        if (!hata.tekrar3) {
            if (diffHours >= 72) return { status: 'due3', label: '🟠 3. Gün Tekrarı Geldi (Bugün Çöz!)', isDue: true, badgeColor: '#f97316', badgeBg: 'rgba(249,115,22,0.12)' };
            return { status: 'wait3', label: '⏳ 3. Gün Tekrarı Bekleniyor (72 sa)', isDue: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' };
        }
        if (!hata.tekrar7) {
            if (diffHours >= 168) return { status: 'due7', label: '🟣 7. Gün Pekiştirme Tekrarı Geldi', isDue: true, badgeColor: '#8b5cf6', badgeBg: 'rgba(139,92,246,0.12)' };
            return { status: 'wait7', label: '⏳ 7. Gün Pekiştirmesi Bekleniyor (168 sa)', isDue: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' };
        }
        if (!hata.tekrar21) {
            if (diffHours >= 504) return { status: 'due21', label: '🔵 21. Gün Nihai Mühürleme Tekrarı Geldi', isDue: true, badgeColor: '#0284c7', badgeBg: 'rgba(2,132,199,0.12)' };
            return { status: 'wait21', label: '⏳ 21. Gün Mühürlemesi Bekleniyor (504 sa)', isDue: false, badgeColor: '#64748b', badgeBg: 'rgba(100,116,139,0.1)' };
        }

        return { status: 'completed', label: '🟢 Kalıcılaştı', isDue: false, badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.12)' };
    }

    /**
     * 4 Kök Neden Hata Taksonomisi Meta Bilgisi
     */
    function getYksKokNedenMeta(code) {
        const c = String(code || 'A').toUpperCase();
        switch (c) {
            case 'A':
                return {
                    code: 'A',
                    short: 'Bilgi Boşluğu',
                    label: 'Bilgi & Kavram Yanılgısı',
                    desc: 'Kavramı veya formülü bilmiyordum / ters hatırladım (Deklaratif Bellek).',
                    color: '#ef4444',
                    bg: 'rgba(239,68,68,0.12)',
                    border: '#ef4444',
                    icon: '🔴'
                };
            case 'B':
                return {
                    code: 'B',
                    short: 'Kurgu / Öncül',
                    label: 'Kurgu & Soru Kökü Algılama',
                    desc: 'Soru kökünü ("değinilmemiştir"), öncülü veya grafiği yanlış okudum.',
                    color: '#d97706',
                    bg: 'rgba(245,158,11,0.12)',
                    border: '#f59e0b',
                    icon: '🟡'
                };
            case 'C':
                return {
                    code: 'C',
                    short: 'Süre / İşlem',
                    label: 'Süre Yetişmeme & İşlem Hatası',
                    desc: 'Zaman baskısıyla acele ettim, 4 işlem veya optik kaydırma hatası.',
                    color: '#ea580c',
                    bg: 'rgba(234,88,12,0.12)',
                    border: '#ea580c',
                    icon: '🟠'
                };
            case 'D':
                return {
                    code: 'D',
                    short: 'Bilişsel Direnç',
                    label: 'Bilişsel Direnç & İnatlaşma',
                    desc: 'Soruyla 2.5 dakikadan fazla inatlaştım veya önyargıyla sorudan kaçtım.',
                    color: '#8b5cf6',
                    bg: 'rgba(139,92,246,0.12)',
                    border: '#8b5cf6',
                    icon: '🟣'
                };
            default:
                return {
                    code: 'A',
                    short: 'Bilgi Boşluğu',
                    label: 'Bilgi & Kavram Yanılgısı',
                    desc: 'Kavramı veya formülü bilmiyordum / ters hatırladım.',
                    color: '#ef4444',
                    bg: 'rgba(239,68,68,0.12)',
                    border: '#ef4444',
                    icon: '🔴'
                };
        }
    }

    function getYksKokNedenBadge(code) {
        const m = getYksKokNedenMeta(code);
        return `<span style="background:${m.bg}; color:${m.color}; border:1px solid ${m.border}40; padding:2px 7px; border-radius:6px; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;" title="${escapeFn(m.desc)}">
            <span>${m.icon}</span> <strong>Kod ${m.code}:</strong> ${m.label}
        </span>`;
    }

    /**
     * YKS Dönemsel 5 Faz Periyodizasyon Motoru
     */
    function getCurrentYksPhase(itemFaz) {
        const phases = [
            { id: 1, name: 'Faz 1', title: 'Yaz Temel İnşası & TYT Omurgası (Temmuz - Eylül)', focus: 'TYT %70 + 11. Sınıf Eksik Kapatma & 07:30 Paragraf-Problem Rutini' },
            { id: 2, name: 'Faz 2', title: 'AYT Konu Derinleşmesi (Ekim - Aralık)', focus: 'AYT %60 + TYT Kondisyon Denemeleri & Kod A Hata Sıfırlama' },
            { id: 3, name: 'Faz 3', title: 'Soru Hacmi & LTI Zirvesi (Ocak - Mart)', focus: 'Limit-Türev-İntegral / Organik Kimya / Sistemler & Seri Deneme Girişi' },
            { id: 4, name: 'Faz 4', title: 'Seri Deneme & Cerrahi Kamp (Nisan - Mayıs)', focus: 'Haftada 3 TYT + 2 AYT Simülasyonu & 4 Kök Neden Ameliyathanesi' },
            { id: 5, name: 'Faz 5', title: 'ÖSYM Tüneli & Bilişsel Tepeleme (Haziran)', focus: 'Çıkmış Soru Cerrahisi, Biyolojik Ritim ve TDE İnatlaşmama Zirvesi' }
        ];
        const num = Number(itemFaz) || 1;
        return phases.find(p => p.id === num) || phases[0];
    }

    /**
     * Net Platosu Teşhis & Reçete Motoru
     */
    function diagnoseYksNetPlateau(item) {
        const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];
        if (denemeler.length < 3) {
            return {
                hasPlateau: false,
                type: 'none',
                status: '🟢 Veri Toplanıyor (Yeterli Deneme Yok)',
                color: '#10b981',
                recete: 'Plato teşhisi için öğrencinin en az 3 adet deneme kaydı incelenmektedir.'
            };
        }

        const tytDenemeler = denemeler.filter(d => !String(d.tur).toUpperCase().includes('AYT')).slice(-4);
        if (tytDenemeler.length >= 3) {
            const nets = tytDenemeler.map(d => Number(d.netler?.toplam || 0));
            const maxNet = Math.max(...nets);
            const minNet = Math.min(...nets);
            const diff = maxNet - minNet;

            if (diff <= 3.5) {
                const avgNet = (nets.reduce((a, b) => a + b, 0) / nets.length).toFixed(1);
                if (avgNet < 70) {
                    return {
                        hasPlateau: true,
                        type: 'tyt_low',
                        status: `⚠️ TYT Temel Platosu (${avgNet} Nette Kilitlenme)`,
                        color: '#ef4444',
                        recete: 'Reçete: Konu çalışmasını durdurun. Süre baskısı ve turlama taktiği zayıf. TYT Türkçe ve Matematik branş denemelerine geçilmelidir.'
                    };
                } else {
                    return {
                        hasPlateau: true,
                        type: 'tyt_high',
                        status: `⚠️ TYT Hız & Turlama Platosu (${avgNet} Net)`,
                        color: '#f59e0b',
                        recete: 'Reçete: Sorularla inatlaşma var. İnatlaşılan her soruya -8 puan TDE cezası verilmeli; 1. tur 120 dakikada bitirilip 2. tur net avcılığına odaklanılmalıdır.'
                    };
                }
            }
        }

        return {
            hasPlateau: false,
            type: 'rising',
            status: '🟢 İstikrarlı Yükseliş / Dinamik Dalgalanma',
            color: '#10b981',
            recete: 'Öğrencinin net eğrisi sağlıklı dalgalanıyor. Mevcut blok çalışma ve aralıklı tekrar disiplini korunmalıdır.'
        };
    }

    // ─────────────────────────────────────────────────────────────
    // 1. ANA MODÜL RENDER VE KARTLAR
    // ─────────────────────────────────────────────────────────────

    function renderYksKoclukModule() {
        const container = document.getElementById('yks-kocluk-cards-container');
        if (!container) return;

        const list = Array.isArray(window.yksKoclukData) ? window.yksKoclukData : [];
        const kademeFilter = document.getElementById('yks-kocluk-kademe-filter')?.value || '';
        const classFilter = document.getElementById('yks-kocluk-class-filter')?.value || '';
        const areaFilter = document.getElementById('yks-kocluk-area-filter')?.value || '';
        const searchInput = (document.getElementById('yks-kocluk-search-input')?.value || '').toLocaleLowerCase('tr-TR').trim();

        // Eski kayıtların intibakı
        list.forEach(item => {
            if (!item.sinifSeviyesi) {
                item.sinifSeviyesi = detectSinifSeviyesi(item.sinif);
            }
            if (!item.obpTakip) {
                item.obpTakip = {
                    sinif9: item.obp || 85,
                    sinif10: item.obp || 85,
                    sinif11: item.obp || 85,
                    sinif12_tahmin: item.obp || 85,
                    hesaplananObp: item.obp || 85
                };
            }
            if (!item.yazililar) {
                item.yazililar = { donem1_y1: {}, donem1_y2: {}, donem2_y1: {}, donem2_y2: {} };
            }
        });

        updateYksKoclukStatistics(list);
        populateYksClassFilter(list);

        const filtered = list.filter(k => {
            const kKademe = String(detectSinifSeviyesi(k.sinifSeviyesi || k.sinif));
            if (kademeFilter && kKademe !== kademeFilter) {
                return false;
            }
            if (classFilter && k.sinif !== classFilter && window.normSinif && window.normSinif(k.sinif) !== window.normSinif(classFilter)) {
                return false;
            }
            if (areaFilter && k.alan !== areaFilter) {
                return false;
            }
            if (searchInput) {
                const haystack = `${k.adSoyad} ${k.studentNo} ${k.sinif} ${k.alan} ${k.bilesenNotu}`.toLocaleLowerCase('tr-TR');
                if (!haystack.includes(searchInput)) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--card-bg); border-radius: 12px; border: 2px dashed var(--border);">
                    <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.6;">🎯</div>
                    <h3 style="margin: 0 0 8px 0; color: var(--text-main); font-size: 1.15rem;">Koçluk Havuzunda Öğrenci Bulunmuyor</h3>
                    <p style="margin: 0 0 18px 0; color: var(--text-muted); font-size: 13px; max-width: 540px; margin-inline: auto;">
                        9, 10, 11, 12. Sınıf veya mezun öğrencilerinizi ekleyerek; MEB OYSS 10 ders yazılı takibi, OBP Koruma Kalkanı (+30..+60P), çift motorlu TDE (TYT-AYT) ve Ebbinghaus hafıza ameliyathanesini yönetmeye başlayabilirsiniz.
                    </p>
                    <button class="btn btn-primary" onclick="openAddYksKoclukModal()" style="padding: 10px 22px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fas fa-user-plus"></i> Yeni Öğrenci Ekle
                    </button>
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach(item => {
            const safeId = escapeFn(item.id);
            const safeName = escapeFn(item.adSoyad);
            const safeNo = escapeFn(item.studentNo || '-');
            const safeSinif = escapeFn(item.sinif || '12. Sınıf');
            const safeAlan = escapeFn(item.alan || 'SAY');
            const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);

            const obpShield = calculateObpShield(item);
            const oyssAvg = calculateOyssAverages(item);
            const kaiInfo = calculateKai(item.haftalikSoruSayisi);
            const plateau = diagnoseYksNetPlateau(item);
            const phase = getCurrentYksPhase(item.aktifFaz);

            const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
            const pendingRepeats = hatalar.filter(h => getYksHataRepeatStatus(h).isDue).length;

            let alanColor = '#0284c7';
            if (safeAlan === 'EA') alanColor = '#d97706';
            else if (safeAlan === 'SÖZ') alanColor = '#7c3aed';
            else if (safeAlan === 'DİL') alanColor = '#10b981';

            // Kademe rozeti
            let kademeBadge = '';
            if (seviye === 9) kademeBadge = '<span style="background:rgba(16,185,129,0.15); color:#059669; border:1px solid rgba(16,185,129,0.4); font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">🌱 9. Sınıf (Temel &amp; OYSS)</span>';
            else if (seviye === 10) kademeBadge = '<span style="background:rgba(2,132,199,0.15); color:#0284c7; border:1px solid rgba(2,132,199,0.4); font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">🌿 10. Sınıf (Kavram &amp; OYSS)</span>';
            else if (seviye === 11) kademeBadge = `<span style="background:rgba(217,119,6,0.15); color:#d97706; border:1px solid rgba(217,119,6,0.4); font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">⚡ 11. Sınıf (${safeAlan})</span>`;
            else if (seviye === 'mezun') kademeBadge = '<span style="background:rgba(124,58,237,0.15); color:#7c3aed; border:1px solid rgba(124,58,237,0.4); font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">🎓 Mezun (ÖSYM Zirve)</span>';
            else kademeBadge = `<span style="background:${alanColor}; color:white; font-size:10px; font-weight:800; padding:2px 8px; border-radius:10px;">🎯 12. Sınıf (${safeAlan})</span>`;

            // Kart Orta Dinamik İstatistikleri (9-10 vs 11-12)
            let centerStatHtml = '';
            if (seviye === 9 || seviye === 10) {
                // 9-10: OBP Kalkanı + 10 Ders Yazılı Ortalaması
                centerStatHtml = `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:10px; text-align:center;">
                            <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">OBP Kalkan Katkısı</div>
                            <div style="font-size:18px; font-weight:900; color:#059669; margin:2px 0;">
                                +${obpShield.yerlestirmeKatkisi} Puan
                            </div>
                            <div style="font-size:10px; color:var(--text-muted);">Diploma: <strong>${obpShield.diplomaNotu}</strong> / 100</div>
                        </div>

                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:10px; text-align:center;">
                            <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">10 Ders OYSS Ort.</div>
                            <div style="font-size:18px; font-weight:900; color:#0284c7; margin:2px 0;">
                                ${oyssAvg.generalAvg > 0 ? oyssAvg.generalAvg : (item.obp || '85.0')}
                            </div>
                            <div style="font-size:10px; color:var(--text-muted);">Sabah: <strong>20P + 15Pr + 10G</strong></div>
                        </div>
                    </div>
                `;
            } else {
                // 11, 12, Mezun: Çift Motorlu Netler (TYT vs AYT)
                const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];
                const lastTyt = denemeler.filter(d => !String(d.tur).toUpperCase().includes('AYT')).slice(-1)[0];
                const lastAyt = denemeler.filter(d => String(d.tur).toUpperCase().includes('AYT')).slice(-1)[0];

                const currentTytNet = lastTyt ? Number(lastTyt.netler?.toplam || 0).toFixed(1) : (Number(item.baslangicTytNet) || 0).toFixed(1);
                const currentAytNet = lastAyt ? Number(lastAyt.netler?.toplam || 0).toFixed(1) : (Number(item.baslangicAytNet) || 0).toFixed(1);
                const hedefTyt = Number(item.hedefTytNet) || 100;
                const hedefAyt = Number(item.hedefAytNet) || 65;

                centerStatHtml = `
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px;">
                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:10px; text-align:center;">
                            <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">TYT Neti</div>
                            <div style="font-size:18px; font-weight:900; color:var(--text-main); margin:2px 0;">
                                ${currentTytNet} <span style="font-size:11px; color:var(--text-muted); font-weight:500;">/ ${hedefTyt}</span>
                            </div>
                            <div style="width:100%; height:4px; background:rgba(0,0,0,0.06); border-radius:2px; overflow:hidden;">
                                <div style="width:${Math.min(100, Math.round((currentTytNet / hedefTyt) * 100))}%; height:100%; background:#0284c7;"></div>
                            </div>
                        </div>

                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:10px; text-align:center;">
                            <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">AYT Neti</div>
                            <div style="font-size:18px; font-weight:900; color:var(--text-main); margin:2px 0;">
                                ${currentAytNet} <span style="font-size:11px; color:var(--text-muted); font-weight:500;">/ ${hedefAyt}</span>
                            </div>
                            <div style="width:100%; height:4px; background:rgba(0,0,0,0.06); border-radius:2px; overflow:hidden;">
                                <div style="width:${Math.min(100, Math.round((currentAytNet / hedefAyt) * 100))}%; height:100%; background:#7c3aed;"></div>
                            </div>
                        </div>
                    </div>
                `;
            }

            const hedefSira = Number(item.hedefSiralama) ? `İlk ${Number(item.hedefSiralama).toLocaleString('tr-TR')}` : (seviye === 9 || seviye === 10 ? 'OBP Kalkan Hedefi' : 'Sıralama Belirtilmedi');

            html += `
            <div class="card" style="background:var(--card-bg); border:1px solid var(--border); border-radius:14px; padding:18px; box-shadow:var(--shadow); display:flex; flex-direction:column; justify-content:space-between; transition:transform 0.2s, box-shadow 0.2s; position:relative; overflow:hidden;">
                <div style="position:absolute; top:0; left:0; width:100%; height:4px; background:linear-gradient(90deg, ${alanColor}, #6366f1);"></div>
                
                <div>
                    <!-- Kart Üst Başlık & Rozetler -->
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                        <div>
                            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                <h3 style="margin:0; font-size:1.15rem; color:var(--text-main); font-weight:800;">${safeName}</h3>
                                ${kademeBadge}
                            </div>
                            <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                                No: <strong>${safeNo}</strong> &bull; Sınıf: <strong>${safeSinif}</strong> &bull; OBP: <strong style="color:#059669;">${obpShield.diplomaNotu}</strong>
                            </div>
                        <div style="text-align:right; display:flex; align-items:center; gap:6px;">
                            <span style="background:rgba(2,132,199,0.1); color:#0284c7; border:1px solid rgba(2,132,199,0.3); font-size:11px; font-weight:700; padding:3px 8px; border-radius:8px; display:inline-block;">
                                🎯 ${escapeFn(hedefSira)}
                            </span>
                            <button class="action-btn" onclick="event.stopPropagation(); deleteYksKoclukStudent('${safeId}')" title="Öğrenciyi Koçluk Sisteminden Sil" style="color:#ef4444; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.25); border-radius:6px; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer;" onmouseover="this.style.background='rgba(239,68,68,0.2)'" onmouseout="this.style.background='rgba(239,68,68,0.08)'">
                                <i class="fas fa-trash" style="font-size:11px;"></i>
                            </button>
                        </div>
                    </div>

                    ${centerStatHtml}

                    <!-- Konfor Alanı & Plato Teşhis Barı -->
                    <div style="margin-bottom:14px; font-size:11px; display:flex; flex-direction:column; gap:5px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; background:${kaiInfo.badgeBg}; border:1px solid ${kaiInfo.badgeColor}40; padding:6px 10px; border-radius:6px; color:${kaiInfo.badgeColor}; font-weight:700;">
                            <span><i class="fas fa-brain me-1"></i> Konfor Alanı (KAİ): %${kaiInfo.kai}</span>
                            <span style="font-size:10px;">${escapeFn(kaiInfo.label)}</span>
                        </div>

                        ${plateau.hasPlateau && (seviye !== 9 && seviye !== 10) ? `
                        <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:6px 10px; border-radius:6px; color:#ef4444; font-weight:700; display:flex; justify-content:space-between;">
                            <span><i class="fas fa-exclamation-triangle me-1"></i> ${escapeFn(plateau.status)}</span>
                            <span style="font-size:10px; font-weight:500;">Reçete Hazır</span>
                        </div>
                        ` : ''}

                        <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); padding:2px 4px;">
                            <span><i class="fas fa-flag-checkered me-1"></i> ${escapeFn(phase.name)}</span>
                            <span>${pendingRepeats > 0 ? `<strong style="color:#ef4444;">🔴 ${pendingRepeats} Bekleyen Tekrar</strong>` : '🟢 Tekrarlar Güncel'}</span>
                        </div>
                    </div>
                </div>

                <!-- Kart Alt Butonları -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:6px; border-top:1px solid var(--border); padding-top:12px;">
                    <button class="btn btn-outline-secondary" onclick="openYksQuickSyncModal('${safeId}')" style="font-size:11.5px; padding:7px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:5px;">
                        <i class="fas fa-bolt" style="color:#d97706;"></i> 60 Sn Hızlı Giriş
                    </button>
                    <button class="btn btn-outline-secondary" onclick="openYksPrintCenterModal('${safeId}')" style="font-size:11.5px; padding:7px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:5px;">
                        <i class="fas fa-print" style="color:#059669;"></i> Akıllı Formlar
                    </button>
                    <button class="btn btn-primary" onclick="openYksDetailModal('${safeId}')" style="grid-column:1 / -1; font-size:12px; padding:8px; font-weight:700; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
                        <i class="fas fa-chart-line"></i> Bilişsel Kokpit &amp; Hata Ameliyathanesi
                    </button>
                </div>
            </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * YKS Üst İstatistik Kartlarını Güncelle
     */
    function updateYksKoclukStatistics(list) {
        const totalEl = document.getElementById('yks-stat-total');
        const avgTytEl = document.getElementById('yks-stat-avg-tyt');
        const avgAytEl = document.getElementById('yks-stat-avg-ayt');
        const pendingEl = document.getElementById('yks-stat-pending-errors');

        if (!list || list.length === 0) {
            if (totalEl) totalEl.textContent = '0';
            if (avgTytEl) avgTytEl.textContent = '0';
            if (avgAytEl) avgAytEl.textContent = '0';
            if (pendingEl) pendingEl.textContent = '0';
            return;
        }

        let totalTyt = 0;
        let tytCount = 0;
        let totalAyt = 0;
        let aytCount = 0;
        let totalPending = 0;

        list.forEach(k => {
            const denemeler = Array.isArray(k.denemeler) ? k.denemeler : [];
            const lastTyt = denemeler.filter(d => !String(d.tur).toUpperCase().includes('AYT')).slice(-1)[0];
            const lastAyt = denemeler.filter(d => String(d.tur).toUpperCase().includes('AYT')).slice(-1)[0];

            if (lastTyt) {
                totalTyt += Number(lastTyt.netler?.toplam || 0);
                tytCount++;
            } else if (k.baslangicTytNet) {
                totalTyt += Number(k.baslangicTytNet);
                tytCount++;
            }

            if (lastAyt) {
                totalAyt += Number(lastAyt.netler?.toplam || 0);
                aytCount++;
            } else if (k.baslangicAytNet) {
                totalAyt += Number(k.baslangicAytNet);
                aytCount++;
            }

            const hatalar = Array.isArray(k.hataDefteri) ? k.hataDefteri : [];
            totalPending += hatalar.filter(h => getYksHataRepeatStatus(h).isDue).length;
        });

        if (totalEl) totalEl.textContent = list.length;
        if (avgTytEl) avgTytEl.textContent = tytCount > 0 ? (totalTyt / tytCount).toFixed(1) : '-';
        if (avgAytEl) avgAytEl.textContent = aytCount > 0 ? (totalAyt / aytCount).toFixed(1) : '-';
        if (pendingEl) pendingEl.textContent = totalPending;
    }

    /**
     * Sınıf Filtresi Açılır Kutusunu Doldur
     */
    function populateYksClassFilter(list) {
        const select = document.getElementById('yks-kocluk-class-filter');
        if (!select) return;

        const currentVal = select.value;
        const classes = new Set();
        (list || []).forEach(k => { if (k.sinif) classes.add(k.sinif); });

        let html = '<option value="">Tüm Sınıflar</option>';
        Array.from(classes).sort().forEach(c => {
            html += `<option value="${escapeFn(c)}"${c === currentVal ? ' selected' : ''}>${escapeFn(c)}</option>`;
        });
        select.innerHTML = html;
    }

    // ─────────────────────────────────────────────────────────────
    // 2. ÖĞRENCİ EKLEME & YÖNETİM (9-12. SINIF DİNAMİK)
    // ─────────────────────────────────────────────────────────────

    function openAddYksKoclukModal() {
        const studentSelect = document.getElementById('yks-add-student-select');
        const manualBox = document.getElementById('yks-add-manual-fields');
        const badgeEl = document.getElementById('yks-add-selected-badge');
        const kademeSelect = document.getElementById('yks-add-kademe');

        if (manualBox) manualBox.style.display = 'none';
        if (badgeEl) badgeEl.style.display = 'none';

        const nameInput = document.getElementById('yks-add-name');
        const noInput = document.getElementById('yks-add-no');
        const classInput = document.getElementById('yks-add-class');
        if (nameInput) nameInput.value = '';
        if (noInput) noInput.value = '';
        if (classInput) classInput.value = '12-A';
        if (kademeSelect) kademeSelect.value = '12';

        if (studentSelect) {
            const registered = (window.studentData || []);
            const alreadyInKeys = (window.yksKoclukData || []).map(k => `${String(k.studentNo || '')}_${String(k.adSoyad || '')}`);
            let html = '<option value="">-- Mevcut Öğrenci Listesinden Seçiniz --</option>';

            const sortedList = [...registered].sort((a, b) => {
                const classA = String(a.sinif || '');
                const classB = String(b.sinif || '');
                const classCmp = classA.localeCompare(classB, 'tr', { numeric: true });
                if (classCmp !== 0) return classCmp;
                const noA = parseInt(a.no, 10) || 0;
                const noB = parseInt(b.no, 10) || 0;
                if (noA && noB && noA !== noB) return noA - noB;
                const nameA = a.adSoyad || a.ad || a.name || '';
                const nameB = b.adSoyad || b.ad || b.name || '';
                return nameA.localeCompare(nameB, 'tr');
            });

            sortedList.forEach((s, idx) => {
                const sName = (s.adSoyad || (s.ad ? (s.ad + (s.soyad ? ' ' + s.soyad : '')) : '') || s.name || s.ogrenciAdi || '').trim();
                const sNo = (s.no !== undefined && s.no !== null) ? String(s.no).trim() : '';
                const sClass = (s.sinif || '').trim();
                const key = `${sNo}_${sName}`;

                if (!alreadyInKeys.includes(key)) {
                    const label = sNo ? `${sNo} - ${sName || 'İsimsiz Öğrenci'} (${sClass || 'Lise'})` : `${sName || 'İsimsiz Öğrenci'} (${sClass || 'Lise'})`;
                    html += `<option value="${escapeFn(sNo)}" data-name="${escapeFn(sName)}" data-class="${escapeFn(sClass)}" data-idx="${idx}">${escapeFn(label)}</option>`;
                }
            });
            html += '<option value="__MANUAL__">✍️ Listede Olmayan Yeni Öğrenci Gir...</option>';
            studentSelect.innerHTML = html;
            studentSelect.value = '';
        }

        onYksAddKademeChange();

        const modal = document.getElementById('yks-kocluk-add-modal');
        if (modal) modal.style.display = 'flex';
    }

    function onYksAddKademeChange() {
        const kademeSelect = document.getElementById('yks-add-kademe');
        const alanSelect = document.getElementById('yks-add-alan');
        const val = kademeSelect?.value || '12';

        if (val === '9' || val === '10') {
            if (alanSelect) {
                alanSelect.innerHTML = '<option value="ORTAK" selected>🌱 Lise 9-10. Sınıf Ortak Müfredat</option>';
            }
        } else {
            if (alanSelect && (!alanSelect.querySelector('option[value="SAY"]'))) {
                alanSelect.innerHTML = `
                    <option value="SAY" selected>Sayısal (SAY)</option>
                    <option value="EA">Eşit Ağırlık (EA)</option>
                    <option value="SÖZ">Sözel (SÖZ)</option>
                    <option value="DİL">Yabancı Dil (DİL)</option>
                `;
            }
        }
    }

    function onYksAddStudentSelectChange() {
        const select = document.getElementById('yks-add-student-select');
        const manualBox = document.getElementById('yks-add-manual-fields');
        const badgeEl = document.getElementById('yks-add-selected-badge');
        const badgeText = document.getElementById('yks-add-selected-badge-text');
        const nameInput = document.getElementById('yks-add-name');
        const noInput = document.getElementById('yks-add-no');
        const classInput = document.getElementById('yks-add-class');
        const kademeSelect = document.getElementById('yks-add-kademe');
        if (!select) return;

        if (select.value === '__MANUAL__') {
            if (manualBox) manualBox.style.display = 'block';
            if (badgeEl) badgeEl.style.display = 'none';
            if (nameInput) { nameInput.value = ''; nameInput.focus(); }
            if (noInput) noInput.value = '';
            if (classInput) classInput.value = '12-A';
        } else if (select.value) {
            if (manualBox) manualBox.style.display = 'none';
            const opt = select.options[select.selectedIndex];
            const optName = opt ? (opt.getAttribute('data-name') || '') : '';
            const optClass = opt ? (opt.getAttribute('data-class') || '') : '';
            const studentNo = select.value || (opt ? opt.getAttribute('data-no') || '' : '');

            const found = (window.studentData || []).find(s => {
                const sName = (s.adSoyad || (s.ad ? (s.ad + (s.soyad ? ' ' + s.soyad : '')) : '') || s.name || '').trim();
                return String(s.no) === String(studentNo) && (!optName || sName === optName);
            }) || (window.studentData || []).find(s => String(s.no) === String(studentNo));

            const resolvedName = (found ? (found.adSoyad || (found.ad ? (found.ad + (found.soyad ? ' ' + found.soyad : '')) : '') || found.name || '') : optName).trim();
            const resolvedClass = (found ? found.sinif : optClass) || '12-A';

            if (nameInput) nameInput.value = resolvedName;
            if (noInput) noInput.value = studentNo;
            if (classInput) classInput.value = resolvedClass;

            const autoKademe = detectSinifSeviyesi(resolvedClass);
            if (kademeSelect) {
                kademeSelect.value = String(autoKademe);
                onYksAddKademeChange();
            }

            if (badgeEl && badgeText) {
                badgeText.innerHTML = `<strong>${escapeFn(resolvedName)}</strong> <span style="opacity:0.85;">(Okul No: ${escapeFn(studentNo)}${resolvedClass ? ' • Sınıf: ' + escapeFn(resolvedClass) : ''})</span>`;
                badgeEl.style.display = 'block';
            }
        } else {
            if (manualBox) manualBox.style.display = 'none';
            if (badgeEl) badgeEl.style.display = 'none';
            if (nameInput) nameInput.value = '';
            if (noInput) noInput.value = '';
            if (classInput) classInput.value = '12-A';
        }
    }

    function saveNewYksStudent() {
        const select = document.getElementById('yks-add-student-select');
        const nameInput = document.getElementById('yks-add-name');
        const noInput = document.getElementById('yks-add-no');
        const classInput = document.getElementById('yks-add-class');
        const kademeSelect = document.getElementById('yks-add-kademe');
        const alanSelect = document.getElementById('yks-add-alan');
        const obpInput = document.getElementById('yks-add-obp');
        const hedefSiraInput = document.getElementById('yks-add-hedef-sira');
        const hedefTytInput = document.getElementById('yks-add-hedef-tyt');
        const hedefAytInput = document.getElementById('yks-add-hedef-ayt');
        const basTytInput = document.getElementById('yks-add-bas-tyt');
        const basAytInput = document.getElementById('yks-add-bas-ayt');
        const vakSelect = document.getElementById('yks-add-vak');

        let adSoyad = nameInput?.value?.trim() || '';
        let studentNo = noInput?.value?.trim() || '';
        let sinif = classInput?.value?.trim() || '12-A';
        const kademeVal = kademeSelect?.value || '12';
        const sinifSeviyesi = detectSinifSeviyesi(kademeVal);

        if (!adSoyad && select && select.value && select.value !== '__MANUAL__') {
            const opt = select.options[select.selectedIndex];
            if (opt) {
                adSoyad = (opt.getAttribute('data-name') || '').trim();
                studentNo = studentNo || opt.getAttribute('data-no') || select.value;
                sinif = sinif || opt.getAttribute('data-class') || '12-A';
            }
            if (!adSoyad) {
                const found = (window.studentData || []).find(s => String(s.no) === String(select.value));
                if (found) {
                    adSoyad = (found.adSoyad || (found.ad ? (found.ad + (found.soyad ? ' ' + found.soyad : '')) : '') || found.name || '').trim();
                    studentNo = studentNo || String(found.no || select.value);
                    sinif = sinif || found.sinif || '12-A';
                }
            }
        }

        if (!adSoyad) {
            alert('Lütfen listeden bir öğrenci seçiniz veya ad soyad giriniz.');
            return;
        }

        // Sınav Analiz modülünden geçmiş sonuçları otomatik topla
        const studentExams = [];
        if (typeof examData !== 'undefined' && Array.isArray(examData)) {
            examData.forEach(exam => {
                if (!exam.results) return;
                Object.entries(exam.results).forEach(([sKey, res]) => {
                    const match = (studentNo && String(studentNo) === String(res.no)) || 
                                  (adSoyad.toLocaleLowerCase('tr-TR').trim() === String(sKey).toLocaleLowerCase('tr-TR').trim());
                    if (match) {
                        const tr = parseFloat(res.Turkce) || 0;
                        const mat = parseFloat(res.Matematik) || 0;
                        const fen = parseFloat(res.Fen) || 0;
                        const sos = parseFloat(res.Sosyal) || 0;
                        const din = parseFloat(res.DinKulturu) || 0;
                        const ing = parseFloat(res.Ingilizce) || 0;
                        const sozel = parseFloat((tr + sos + din + ing).toFixed(2));
                        const topNet = (res.totalNet !== undefined && res.totalNet !== null && res.totalNet !== '')
                            ? parseFloat(res.totalNet)
                            : parseFloat((sozel + mat + fen).toFixed(2));
                        const isAyt = String(exam.title || '').toUpperCase().includes('AYT');

                        studentExams.push({
                            id: 'den_exam_' + exam.id,
                            examId: String(exam.id),
                            source: 'exam_module',
                            tarih: exam.date || new Date().toISOString().split('T')[0],
                            tur: isAyt ? 'AYT' : 'TYT',
                            yayin: exam.title,
                            netler: { toplam: topNet, turkce: tr, matematik: mat, fen: fen, sosyal: sos, din: din, ingilizce: ing },
                            sureAnalizi: isAyt ? { dikkatHatasiSayisi: 1, kokOkumaHatasiSayisi: 0, kumarSoruSayisi: 0, optikKontrol: true }
                                : { turkce1Tur: 42, mat1Tur: 45, fenSos1Tur: 30, inatlasmaSayisi: 0, tur2NetKazanc: 4, optikKontrol: true }
                        });
                    }
                });
            });
        }
        studentExams.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());

        const obpVal = Number(obpInput?.value) || 88.5;
        const newId = 'yks_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

        const newRecord = {
            id: newId,
            studentNo: studentNo || String(Date.now()).slice(-4),
            adSoyad: adSoyad,
            sinif: sinif,
            sinifSeviyesi: sinifSeviyesi,
            alan: alanSelect?.value || (sinifSeviyesi === 9 || sinifSeviyesi === 10 ? 'ORTAK' : 'SAY'),
            obp: obpVal,
            obpTakip: {
                sinif9: obpVal,
                sinif10: obpVal,
                sinif11: obpVal,
                sinif12_tahmin: obpVal,
                hesaplananObp: obpVal
            },
            yazililar: {
                donem1_y1: {},
                donem1_y2: {},
                donem2_y1: {},
                donem2_y2: {}
            },
            hedefSiralama: Number(hedefSiraInput?.value) || 10000,
            hedefTytNet: Number(hedefTytInput?.value) || 100,
            hedefAytNet: Number(hedefAytInput?.value) || 68,
            baslangicTytNet: Number(basTytInput?.value) || 65,
            baslangicAytNet: Number(basAytInput?.value) || 30,
            vakStili: vakSelect?.value || 'Görsel',
            aktifFaz: 1,
            bilesenNotu: '',
            hataDefteri: [],
            denemeler: studentExams,
            haftalikSoruSayisi: (sinifSeviyesi === 9 || sinifSeviyesi === 10) 
                ? { duzey1: 180, duzey2: 180, duzey3: 90, duzey4: 0, toplam: 450 }
                : { duzey1: 100, duzey2: 200, duzey3: 350, duzey4: 150, toplam: 800 },
            haftalikPlan: null,
            createdAt: new Date().toISOString()
        };

        if (!Array.isArray(window.yksKoclukData)) window.yksKoclukData = [];
        window.yksKoclukData.push(newRecord);
        if (typeof yksKoclukData !== 'undefined') yksKoclukData = window.yksKoclukData;

        renderYksKoclukModule();
        if (typeof saveData === 'function') saveData(true);

        const modal = document.getElementById('yks-kocluk-add-modal');
        if (modal) modal.style.display = 'none';

        let successMsg = `${adSoyad} (${sinifSeviyesi}. Sınıf) başarıyla Koçluk Havuzuna eklendi.`;
        if (studentExams.length > 0) {
            successMsg += `\n📊 8. Sınav Analiz modülünden ${studentExams.length} adet geçmiş deneme sonucu otomatik aktarıldı.`;
        }
        alert(successMsg);
    }

    function deleteYksKoclukStudent(kocId) {
        const idToDel = kocId || activeYksKoclukId;
        if (!idToDel) return;
        const target = (window.yksKoclukData || []).find(k => String(k.id) === String(idToDel));
        const targetName = target ? target.adSoyad : 'Bu öğrenciyi';
        if (!confirm(`"${targetName}" Koçluk sisteminden silinsin mi? (Bu işlem geri alınamaz)`)) return;
        if (Array.isArray(window.yksKoclukData)) {
            window.yksKoclukData = window.yksKoclukData.filter(k => String(k.id) !== String(idToDel));
            if (typeof yksKoclukData !== 'undefined') yksKoclukData = window.yksKoclukData;
            if (typeof saveData === 'function') saveData(true);
            renderYksKoclukModule();
            const modal = document.getElementById('yks-kocluk-detail-modal');
            if (modal && modal.style.display === 'flex') modal.style.display = 'none';
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. DETAY MODALI & SUB-TABS (ADAPTİF KOKPİT & QUICK SWITCHER)
    // ─────────────────────────────────────────────────────────────
    window.activeYksDenemeSubSegment = window.activeYksDenemeSubSegment || null;
    window.activeYksHataSubSegment = window.activeYksHataSubSegment || 'kok-neden-dagilim';
    window.activeYksPiramitSubSegment = window.activeYksPiramitSubSegment || 'piramit-teshis';

    /**
     * Mobilde sanal klavye açıldığında input alanını ekranın ortasına pürüzsüz kaydırır
     */
    function yksAutoScrollOnFocus(el) {
        if (!el) return;
        setTimeout(() => {
            if (typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 280);
    }

    /**
     * Akıllı Formlar Açılır Menüsünü Aç / Kapat
     */
    
    /**
     * 60 Saniyelik Hızlı Giriş Çekmecesini (Inline Drawer) Açar / Kapatır
     */
    function toggleYksQuickDrawer() {
        const drawer = document.getElementById('yks-inline-quick-drawer');
        if (!drawer) return;
        const isHidden = drawer.style.display === 'none' || !drawer.style.display;
        if (isHidden) {
            const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
            if (item) {
                const s = item.haftalikSoruSayisi || {};
                const d1 = document.getElementById('yks-drawer-d1');
                const d2 = document.getElementById('yks-drawer-d2');
                const d3 = document.getElementById('yks-drawer-d3');
                const d4 = document.getElementById('yks-drawer-d4');
                const netInp = document.getElementById('yks-drawer-net');
                if (d1) d1.value = s.duzey1 || 0;
                if (d2) d2.value = s.duzey2 || 0;
                if (d3) d3.value = s.duzey3 || 0;
                if (d4) d4.value = s.duzey4 || 0;
                if (netInp) netInp.value = '';
                updateYksDrawerKai();
            }
            drawer.style.display = 'block';
            drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            drawer.style.display = 'none';
        }
    }

    function updateYksDrawerKai() {
        const d1 = Number(document.getElementById('yks-drawer-d1')?.value) || 0;
        const d2 = Number(document.getElementById('yks-drawer-d2')?.value) || 0;
        const d3 = Number(document.getElementById('yks-drawer-d3')?.value) || 0;
        const d4 = Number(document.getElementById('yks-drawer-d4')?.value) || 0;
        const total = d1 + d2 + d3 + d4;
        const kai = total > 0 ? Math.round(((d1 + d2) / total) * 100) : 0;
        const prev = document.getElementById('yks-drawer-kai-preview');
        if (prev) {
            const color = (kai > 55) ? '#ef4444' : (kai >= 45 ? '#f59e0b' : '#10b981');
            prev.innerHTML = `Toplam: <strong>${total} Soru</strong> &bull; Canlı KAİ: <strong style="color:${color}; font-size:12.5px;">%${kai}</strong>`;
        }
    }

    function submitYksInlineQuickSync() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const d1 = Number(document.getElementById('yks-drawer-d1')?.value) || 0;
        const d2 = Number(document.getElementById('yks-drawer-d2')?.value) || 0;
        const d3 = Number(document.getElementById('yks-drawer-d3')?.value) || 0;
        const d4 = Number(document.getElementById('yks-drawer-d4')?.value) || 0;
        const total = d1 + d2 + d3 + d4;
        const quickNet = parseFloat(document.getElementById('yks-drawer-net')?.value);

        item.haftalikSoruSayisi = { duzey1: d1, duzey2: d2, duzey3: d3, duzey4: d4, toplam: total };

        if (!isNaN(quickNet) && quickNet > 0) {
            if (!Array.isArray(item.denemeler)) item.denemeler = [];
            const seviye = item.sinifSeviyesi || detectSinifSeviyesi(item.sinif);
            const isJunior = (seviye === 9 || seviye === 10);
            item.denemeler.push({
                id: 'den_' + Date.now(),
                tarih: new Date().toISOString().split('T')[0],
                tur: isJunior ? 'TYT Kondisyon' : 'TYT',
                yayin: '60 Sn Hızlı Giriş Denemesi',
                netler: { toplam: quickNet },
                sureAnalizi: { optikKontrol: true }
            });
        }

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('60 saniyelik haftalık veriler başarıyla kaydedildi.', 'success');
        }

        const drawer = document.getElementById('yks-inline-quick-drawer');
        if (drawer) drawer.style.display = 'none';

        switchYksDetailSubTab(activeYksDetailSubTab);
        renderYksKoclukModule();
    }

    function toggleYksFormsMenu(e) {
        if (e) e.stopPropagation();
        const pMenu = document.getElementById('yks-parent-dropdown-menu');
        if (pMenu) pMenu.style.display = 'none';
        const fMenu = document.getElementById('yks-forms-dropdown-menu');
        if (fMenu) {
            fMenu.style.display = (fMenu.style.display === 'block') ? 'none' : 'block';
        }
    }

    /**
     * Veli Bülteni Açılır Menüsünü Aç / Kapat
     */
    function toggleYksParentMenu(e) {
        if (e) e.stopPropagation();
        const fMenu = document.getElementById('yks-forms-dropdown-menu');
        if (fMenu) fMenu.style.display = 'none';
        const pMenu = document.getElementById('yks-parent-dropdown-menu');
        if (pMenu) {
            pMenu.style.display = (pMenu.style.display === 'block') ? 'none' : 'block';
        }
    }

    /**
     * Tüm açık dropdown menüleri kapatır
     */
    function hideYksDropdowns() {
        const fMenu = document.getElementById('yks-forms-dropdown-menu');
        const pMenu = document.getElementById('yks-parent-dropdown-menu');
        if (fMenu) fMenu.style.display = 'none';
        if (pMenu) pMenu.style.display = 'none';
    }

    document.addEventListener('click', () => hideYksDropdowns());

    /**
     * Klavye Kısayolları (Alt + Sol Ok: Önceki Öğrenci, Alt + Sağ Ok: Sonraki Öğrenci)
     */
    window.addEventListener('keydown', (e) => {
        const modal = document.getElementById('yks-kocluk-detail-modal');
        if (!modal || modal.style.display !== 'flex') return;
        if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'Left')) {
            e.preventDefault();
            navigateYksKoclukStudent(-1);
        } else if (e.altKey && (e.key === 'ArrowRight' || e.key === 'Right')) {
            e.preventDefault();
            navigateYksKoclukStudent(1);
        }
    });

    /**
     * Hızlı Öğrenci Değiştirici Dropdown'ını Doldurur
     */
    function populateYksQuickSwitcher(selectedId) {
        const select = document.getElementById('yks-quick-student-select');
        if (!select) return;
        const list = Array.isArray(window.yksKoclukData) ? window.yksKoclukData : [];
        if (list.length === 0) {
            select.innerHTML = '<option value="">YKS Koçluk Havuzu Boş</option>';
            return;
        }
        let opts = '';
        list.forEach(s => {
            const isSel = String(s.id) === String(selectedId) ? 'selected' : '';
            const sev = s.sinifSeviyesi || detectSinifSeviyesi(s.sinif);
            const kademeBadge = (sev === 'mezun') ? '🎓 Mezun' : `${sev}. Sınıf`;
            opts += `<option value="${escapeFn(s.id)}" ${isSel}>${escapeFn(s.sinif || kademeBadge)} - No:${escapeFn(s.studentNo || '-')} • ${escapeFn(s.adSoyad)} (${escapeFn(s.alan || 'Sayısal')})</option>`;
        });
        select.innerHTML = opts;
    }

    /**
     * Önceki / Sonraki Öğrenciye Hızlı Geçiş Yapar (Modalı Kapatmadan)
     */
    function navigateYksKoclukStudent(direction) {
        const list = Array.isArray(window.yksKoclukData) ? window.yksKoclukData : [];
        if (list.length === 0) return;
        let idx = list.findIndex(k => String(k.id) === String(activeYksKoclukId));
        if (idx === -1) idx = 0;
        let nextIdx = idx + direction;
        if (nextIdx < 0) nextIdx = list.length - 1;
        if (nextIdx >= list.length) nextIdx = 0;
        const nextStudent = list[nextIdx];
        if (nextStudent) {
            openYksDetailModal(nextStudent.id, activeYksDetailSubTab);
        }
    }

    /**
     * Veli WhatsApp Mesajı Gönder / Kopyala
     */
    function sendYksParentWhatsApp(mode) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const lastDeneme = (Array.isArray(item.denemeler) ? item.denemeler : []).slice(-1)[0];
        const plateau = diagnoseYksNetPlateau(item);
        const obp = calculateObpShield(item);
        const kai = calculateKai(item.haftalikSoruSayisi);

        let msg = '';
        if (mode === 'plato') {
            msg = `Sayın Velimiz, ${item.adSoyad} isimli öğrencimizin YKS hazırlık sürecinde bilişsel koçluk takibinde net platosu/süre tıkanıklığı teşhis edilmiştir.\n\n` +
                  `📌 Durum Teşhisi: ${plateau.status}\n` +
                  `💡 Uzman Cerrahi Reçete: ${plateau.recete}\n\n` +
                  `🛡️ Evde Alınacak Önlemler (Krizsiz Protokol):\n` +
                  `1. Ev ortamında kesinlikle net veya deneme puanı sorgulanmamalı, sınav baskısı kurulmamalıdır.\n` +
                  `2. Nöral konsolidasyon ve bellek oturması için günlük 7.5 - 8 saat kaliteli uyku ritmi korunmalıdır.\n` +
                  `3. Öğrencimizle mutabık kalınan haftalık çalışma ve turlama kuralına güvenilmelidir.\n\n` +
                  `Bilişsel Mentorluk ve Psikometrik Takip Servisi`;
        } else {
            msg = `Sayın Velimiz, ${item.adSoyad} (${item.sinif || (seviye + '. Sınıf')} - ${item.alan || 'YKS'}) isimli öğrencimizin bilişsel gelişim bülteni oluşturulmuştur:\n\n` +
                  `🎯 Akademik Hedef: ${item.hedefProgram || item.hedefBolum || 'Hedef Lisans'} (İlk ${item.hedefSiralama || '20.000'})\n` +
                  (lastDeneme ? `⏱️ Son Deneme (${lastDeneme.tur}): Toplam ${Number(lastDeneme.netler?.toplam || 0).toFixed(2)} Net (TDE: ${calculateYksTde(lastDeneme).tdePuan}/100)\n` : '') +
                  `📊 Konfor Alanı İndeksi (KAİ): %${kai.kai} (${kai.label})\n` +
                  (seviye === 9 || seviye === 10 ? `🛡️ Tahmini OBP Kalkanı: +${obp.yerlestirmeKatkisi} Puan (Diploma: ${obp.diplomaNotu})\n` : '') +
                  `\nDetaylı analiz okul portalımızda veli incelemesine açıktır.`;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(msg).then(() => {
                if (typeof showGlobalToast === 'function') {
                    showGlobalToast('Veli bülteni panoya kopyalandı. WhatsApp Web açılıyor...', 'success');
                } else {
                    alert('Veli bülteni panoya kopyalandı.');
                }
            });
        }
        const waUrl = 'https://web.whatsapp.com/send?text=' + encodeURIComponent(msg);
        window.open(waUrl, '_blank');
    }

    /**
     * BiP ile Sadeleştirilmiş Paylaşım
     */
    function shareYksViaBip() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;
        const kai = calculateKai(item.haftalikSoruSayisi);
        const lastDeneme = (Array.isArray(item.denemeler) ? item.denemeler : []).slice(-1)[0];
        const msg = `BiP Öğrenci Bilgilendirme: ${item.adSoyad} | ` +
                    (lastDeneme ? `Son Net: ${Number(lastDeneme.netler?.toplam || 0).toFixed(2)} | ` : '') +
                    `KAİ: %${kai.kai} | Hedef: ${item.hedefProgram || 'YKS'}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(msg);
            if (typeof showGlobalToast === 'function') showGlobalToast('BiP mesajı panoya kopyalandı.', 'success');
            else alert('BiP mesajı kopyalandı.');
        }
    }

    function openYksDetailModal(kocId, keepSubTab) {
        activeYksKoclukId = kocId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        item.sinifSeviyesi = item.sinifSeviyesi || detectSinifSeviyesi(item.sinif);

        const titleEl = document.getElementById('yks-detail-student-title');
        const badgeEl = document.getElementById('yks-detail-badge');

        let kademeText = '12. Sınıf YKS';
        if (item.sinifSeviyesi === 9) kademeText = '🌱 9. Sınıf (Temel İnşa & OYSS)';
        else if (item.sinifSeviyesi === 10) kademeText = '🌿 10. Sınıf (Kavram & OYSS)';
        else if (item.sinifSeviyesi === 11) kademeText = `⚡ 11. Sınıf (${item.alan || 'Sayısal'} Omurgası)`;
        else if (item.sinifSeviyesi === 'mezun') kademeText = '🎓 Mezun (ÖSYM Zirve)';

        if (titleEl) {
            titleEl.innerHTML = `<i class="fas fa-graduation-cap" style="color:#0284c7;"></i> <span>${escapeFn(item.adSoyad)}</span>`;
        }
        if (badgeEl) {
            badgeEl.textContent = `${item.sinif || kademeText} • ${item.alan || 'Sayısal'} • Hedef: ${item.hedefProgram || item.hedefBolum || 'Üniversite'} (İlk ${item.hedefSiralama || '20.000'})`;
        }

        // Quick Switcher dropdown'ını doldur
        populateYksQuickSwitcher(kocId);

        // Sub-Tab başlıklarını sınıf seviyesine göre dinamik uyarlayalım
        const denemelerBtn = document.getElementById('yks-sub-btn-tab-yks-denemeler');
        const profilBtn = document.getElementById('yks-sub-btn-tab-yks-profil');
        if (item.sinifSeviyesi === 9 || item.sinifSeviyesi === 10) {
            if (profilBtn) profilBtn.innerHTML = '🎯 Profil &amp; OBP Kalkanı';
            if (denemelerBtn) denemelerBtn.innerHTML = '📝 MEB OYSS 10 Ders Yazılıları';
        } else if (item.sinifSeviyesi === 11) {
            if (profilBtn) profilBtn.innerHTML = '🎯 Profil &amp; Alan Hedefleri';
            if (denemelerBtn) denemelerBtn.innerHTML = '⏱️ OYSS &amp; Aylık TYT';
        } else {
            if (profilBtn) profilBtn.innerHTML = '🎯 Profil &amp; Hedefler';
            if (denemelerBtn) denemelerBtn.innerHTML = '⏱️ Denemeler &amp; TDE';
        }

        const modal = document.getElementById('yks-kocluk-detail-modal');
        const targetSubTab = keepSubTab || (modal && modal.style.display === 'flex' && activeYksDetailSubTab ? activeYksDetailSubTab : 'tab-yks-profil');

        if (modal) {
            modal.style.display = 'flex';
            if (typeof window.lockBodyScroll === 'function') window.lockBodyScroll();
        }

        switchYksDetailSubTab(targetSubTab);
    }

    function switchYksDetailSubTab(subTabId) {
        activeYksDetailSubTab = subTabId;
        window.activeYksDetailSubTab = subTabId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        document.querySelectorAll('.yks-sub-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.yks-sub-tab-content').forEach(c => c.style.display = 'none');

        const targetBtn = document.getElementById(`yks-sub-btn-${subTabId}`);
        const targetContent = document.getElementById(subTabId);
        if (targetBtn) {
            targetBtn.classList.add('active');
            if (typeof targetBtn.scrollIntoView === 'function') {
                targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
        if (targetContent) targetContent.style.display = 'block';

        if (subTabId === 'tab-yks-profil') renderYksDetailProfile(item);
        else if (subTabId === 'tab-yks-denemeler') renderYksDetailDenemeler(item);
        else if (subTabId === 'tab-yks-hata') renderYksDetailHataDefteri(item);
        else if (subTabId === 'tab-yks-isi-haritasi') renderYksDetailHeatmap(item);
        else if (subTabId === 'tab-yks-piramit') renderYksDetailPiramit(item);
        else if (subTabId === 'tab-yks-ai') renderYksDetailAi(item);
    }

    // --- Sub-Tab 1: Profil, Hedefler & OBP Kalkanı ---
    function renderYksDetailProfile(item) {
        const c = document.getElementById('tab-yks-profil');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const phase = getCurrentYksPhase(item.aktifFaz);
        const plateau = diagnoseYksNetPlateau(item);
        const obpShield = calculateObpShield(item);
        const oyssAvg = calculateOyssAverages(item);

        let leftCardHtml = '';
        if (seviye === 9 || seviye === 10) {
            // 9-10 Profil: OBP Koruma Kalkanı Simülatörü & 4 Yıllık Projeksiyon
            leftCardHtml = `
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <h4 style="margin:0 0 12px 0; color:#059669; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-shield-alt"></i> OBP Koruma Kalkanı &amp; 4 Yıllık Projeksiyon
                    </h4>
                    <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:12px; margin-bottom:12px; text-align:center;">
                        <div style="font-size:11px; color:#059669; font-weight:800; text-transform:uppercase;">YKS Ham Puana Katkı Kalkanı</div>
                        <div style="font-size:26px; font-weight:900; color:#059669; margin:2px 0;">+${obpShield.yerlestirmeKatkisi} Puan</div>
                        <div style="font-size:11.5px; color:var(--text-muted);">
                            Tahmini Diploma Notu: <strong>${obpShield.diplomaNotu}</strong> &bull; ÖSYM OBP: <strong>${obpShield.obpPuan}</strong>
                        </div>
                    </div>
                    <table class="custom-table" style="font-size:12px; width:100%;">
                        <tr><td style="font-weight:bold;">🌱 9. Sınıf Yıl Sonu:</td><td><input type="number" step="0.1" id="yks-obp-s9" value="${obpShield.s9}" style="width:70px; padding:3px; border-radius:4px; border:1px solid var(--border);"></td></tr>
                        <tr><td style="font-weight:bold;">🌿 10. Sınıf Yıl Sonu:</td><td><input type="number" step="0.1" id="yks-obp-s10" value="${obpShield.s10}" style="width:70px; padding:3px; border-radius:4px; border:1px solid var(--border);"></td></tr>
                        <tr><td style="font-weight:bold;">⚡ 11. Sınıf Tahmini:</td><td><input type="number" step="0.1" id="yks-obp-s11" value="${obpShield.s11}" style="width:70px; padding:3px; border-radius:4px; border:1px solid var(--border);"></td></tr>
                        <tr><td style="font-weight:bold;">🎯 12. Sınıf Tahmini:</td><td><input type="number" step="0.1" id="yks-obp-s12" value="${obpShield.s12}" style="width:70px; padding:3px; border-radius:4px; border:1px solid var(--border);"></td></tr>
                    </table>
                    <button class="btn btn-primary" onclick="saveYksObpProjections()" style="width:100%; margin-top:10px; padding:6px; font-size:11.5px; font-weight:700; background:#059669; border-color:#059669;">
                        <i class="fas fa-save me-1"></i> OBP Kalkanını Güncelle
                    </button>
                </div>
            `;
        } else {
            // 11-12 & Mezun: Hedef Sıralama & Çift Motorlu Netler
            leftCardHtml = `
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <h4 style="margin:0 0 12px 0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-bullseye"></i> Akademik Hedefler &amp; Alan
                    </h4>
                    <table class="custom-table" style="font-size:12.5px; width:100%;">
                        <tr><td style="width:130px; font-weight:bold;">Alan:</td><td><strong style="color:#0284c7;">${escapeFn(item.alan || 'SAY')}</strong></td></tr>
                        <tr><td style="font-weight:bold;">Diploma (OBP):</td><td><strong>${obpShield.diplomaNotu} (+${obpShield.yerlestirmeKatkisi}p Katkı)</strong></td></tr>
                        <tr><td style="font-weight:bold;">Hedef Sıralama:</td><td><strong>İlk ${Number(item.hedefSiralama || 0).toLocaleString('tr-TR')}</strong></td></tr>
                        <tr><td style="font-weight:bold;">TYT Net Hedefi:</td><td>Başlangıç: <strong>${item.baslangicTytNet || 0}</strong> &rarr; Hedef: <strong style="color:#0284c7;">${item.hedefTytNet || 0}</strong></td></tr>
                        <tr><td style="font-weight:bold;">AYT Net Hedefi:</td><td>Başlangıç: <strong>${item.baslangicAytNet || 0}</strong> &rarr; Hedef: <strong style="color:#7c3aed;">${item.hedefAytNet || 0}</strong></td></tr>
                        <tr><td style="font-weight:bold;">Öğrenme Stili:</td><td>${escapeFn(item.vakStili || 'Görsel')}</td></tr>
                    </table>
                </div>
            `;
        }

        c.innerHTML = `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
                ${leftCardHtml}

                <!-- Periyodizasyon / Çekirdek Rutin Kartı -->
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <h4 style="margin:0 0 12px 0; color:#7c3aed; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-calendar-check"></i> ${seviye === 9 || seviye === 10 ? 'Sabah 07:30 Çekirdek Rutini' : 'Aktif Periyodizasyon Fazı'}
                    </h4>

                    ${seviye === 9 || seviye === 10 ? `
                    <div style="background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.3); border-radius:8px; padding:12px; margin-bottom:12px;">
                        <div style="font-weight:800; font-size:12.5px; color:#0284c7;">🌅 Her Sabah 07:30 Nöral Açılış Protokolü:</div>
                        <ul style="margin:6px 0 0 0; padding-left:18px; font-size:11.5px; color:var(--text-main); line-height:1.5;">
                            <li><strong>20 Paragraf:</strong> Anlam bilgisi ve hızlı okuma refleks inşaatı.</li>
                            <li><strong>15 Temel Problem:</strong> Denklem kurma ve rutin dışı akıl yürütme.</li>
                            <li><strong>10 Geometri:</strong> Açı-kenar bağıntıları ve doğrudan görme refleksi.</li>
                        </ul>
                    </div>
                    ` : `
                    <div style="background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.3); border-radius:8px; padding:12px; margin-bottom:12px;">
                        <div style="font-weight:800; font-size:13px; color:#7c3aed;">${escapeFn(phase.name)}: ${escapeFn(phase.title)}</div>
                        <p style="margin:4px 0 0 0; font-size:11.5px; color:var(--text-muted); line-height:1.4;">${escapeFn(phase.focus)}</p>
                    </div>
                    `}

                    <h5 style="margin:10px 0 6px 0; color:var(--text-main); font-size:12px;">Bilişsel Plato Teşhisi:</h5>
                    <div style="background:${plateau.hasPlateau ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)'}; border:1px solid ${plateau.color}50; border-radius:8px; padding:10px;">
                        <strong style="color:${plateau.color}; font-size:12px;">${escapeFn(plateau.status)}</strong>
                        <p style="margin:4px 0 0 0; font-size:11.5px; color:var(--text-muted);">${escapeFn(plateau.recete)}</p>
                    </div>
                </div>
            </div>

            <div style="margin-top:16px; background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                <h4 style="margin:0 0 8px 0; color:var(--text-main); font-size:13px;">Mentor Strateji &amp; İcra Notu</h4>
                <textarea id="yks-mentor-notes" placeholder="Öğrencinin haftalık çalışma dengesi, kök neden reçetesi ve cerrahi hedefleri..." style="width:100%; min-height:80px; padding:10px; border-radius:8px; border:1px solid var(--border); background:var(--input-bg); font-size:12.5px;">${escapeFn(item.bilesenNotu || '')}</textarea>
                <div style="display:flex; justify-content:flex-end; margin-top:8px;">
                    <button class="btn btn-primary" onclick="saveYksMentorNote()" style="padding:6px 16px; font-size:12px; font-weight:700;">
                        <i class="fas fa-save me-1"></i> Notu Kaydet
                    </button>
                </div>
            </div>
        `;
    }

    function saveYksObpProjections() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const s9 = parseFloat(document.getElementById('yks-obp-s9')?.value) || 85;
        const s10 = parseFloat(document.getElementById('yks-obp-s10')?.value) || 85;
        const s11 = parseFloat(document.getElementById('yks-obp-s11')?.value) || 85;
        const s12 = parseFloat(document.getElementById('yks-obp-s12')?.value) || 85;

        item.obpTakip = {
            sinif9: s9,
            sinif10: s10,
            sinif11: s11,
            sinif12_tahmin: s12,
            hesaplananObp: parseFloat(((s9 + s10 + s11 + s12) / 4).toFixed(2))
        };
        item.obp = item.obpTakip.hesaplananObp;

        if (typeof saveData === 'function') saveData(true);
        renderYksDetailProfile(item);
        renderYksKoclukModule();
        alert('OBP Koruma Kalkanı başarıyla güncellendi.');
    }

    function saveYksMentorNote() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;
        const note = document.getElementById('yks-mentor-notes')?.value || '';
        item.bilesenNotu = note;
        if (typeof saveData === 'function') saveData(true);
        alert('Mentor notu başarıyla güncellendi.');
    }

    // ─────────────────────────────────────────────────────────────
    // SUB-TAB 2: DENEMELER, MEB OYSS & ÇİFT MOTORLU TDE SİSTEMİ
    // ─────────────────────────────────────────────────────────────

    function switchYksDenemeSubSegment(segmentId) {
        window.activeYksDenemeSubSegment = segmentId;
        document.querySelectorAll('.yks-deneme-seg-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-segment') === segmentId;
            btn.classList.toggle('active', isActive);
        });

        // Tüm olası deneme segment div'leri
        ['oyss', 'tyt-deneme', 'obp-kalkan', 'trend-plato', 'yeni-deneme', 'deneme-gecmisi'].forEach(seg => {
            const el = document.getElementById('yks-deneme-seg-' + seg);
            if (el) el.style.display = (seg === segmentId) ? 'block' : 'none';
        });
    }

    /**
     * Etkileşimli SVG Gelişim Grafiği (TYT & AYT Netleri ve Hedef Çizgisi)
     */
    function generateYksTrendSvg(item) {
        const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];
        const W = 620;
        const H = 200;
        const PAD_L = 40;
        const PAD_R = 25;
        const PAD_T = 20;
        const PAD_B = 30;

        if (denemeler.length === 0) {
            return `
                <div style="background:var(--input-bg); border:1px dashed var(--border); border-radius:10px; padding:30px; text-align:center; color:var(--text-muted); font-size:12px;">
                    <i class="fas fa-chart-line" style="font-size:28px; opacity:0.4; margin-bottom:8px; display:block;"></i>
                    Henüz grafik için deneme kaydı girilmedi. "Hızlı Sınav Girişi" sekmesinden ilk denemenizi kaydedin veya 8. Sınav Analizden veri çekin.
                </div>
            `;
        }

        const tytMax = 120;
        const targetNet = parseFloat(item.hedefTytNet) || (item.sinifSeviyesi === 11 ? 75 : 90);
        const targetY = H - PAD_B - ((targetNet / tytMax) * (H - PAD_T - PAD_B));

        // Noktaları hesapla
        const n = denemeler.length;
        const stepX = n > 1 ? (W - PAD_L - PAD_R) / (n - 1) : (W - PAD_L - PAD_R) / 2;

        let tytPoints = [];
        let aytPoints = [];
        let tytSvgPoints = '';
        let aytSvgPoints = '';
        let xLabels = '';
        let dotsSvg = '';

        denemeler.forEach((d, i) => {
            const x = n > 1 ? PAD_L + i * stepX : W / 2;
            const isAyt = String(d.tur).toUpperCase().includes('AYT');
            const totalNet = Number(d.netler?.toplam || 0);

            // Y ekseni ölçekleme (TYT için 120, AYT için 80)
            const maxScale = isAyt ? 80 : 120;
            const y = H - PAD_B - (Math.min(totalNet, maxScale) / maxScale) * (H - PAD_T - PAD_B);

            if (isAyt) {
                aytPoints.push({ x, y, net: totalNet, ad: d.yayin || d.ad || 'AYT', tarih: d.tarih || '' });
                aytSvgPoints += `${x},${y} `;
                dotsSvg += `
                    <polygon points="${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" style="cursor:pointer;">
                        <title>AYT: ${escapeFn(d.yayin || d.ad || 'Deneme')} - ${totalNet.toFixed(2)} Net (${d.tarih || ''})</title>
                    </polygon>
                    <text x="${x}" y="${y - 8}" font-size="9" font-weight="700" fill="#7c3aed" text-anchor="middle">${totalNet.toFixed(1)}</text>
                `;
            } else {
                tytPoints.push({ x, y, net: totalNet, ad: d.yayin || d.ad || 'TYT', tarih: d.tarih || '' });
                tytSvgPoints += `${x},${y} `;
                dotsSvg += `
                    <circle cx="${x}" cy="${y}" r="4.5" fill="#0284c7" stroke="#ffffff" stroke-width="1.5" style="cursor:pointer;">
                        <title>TYT: ${escapeFn(d.yayin || d.ad || 'Deneme')} - ${totalNet.toFixed(2)} Net (${d.tarih || ''})</title>
                    </circle>
                    <text x="${x}" y="${y - 8}" font-size="9" font-weight="700" fill="#0284c7" text-anchor="middle">${totalNet.toFixed(1)}</text>
                `;
            }

            // X Etiketi
            const shortName = (d.yayin || d.ad || `D-${i + 1}`).substring(0, 8);
            xLabels += `<text x="${x}" y="${H - 10}" font-size="9.5" fill="var(--text-muted, #64748b)" text-anchor="middle">${escapeFn(shortName)}</text>`;
        });

        return `
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:10px; padding:12px; margin-bottom:14px; overflow-x:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:11.5px; font-weight:700;">
                    <div style="display:flex; gap:14px; align-items:center;">
                        <span style="display:inline-flex; align-items:center; gap:5px; color:#0284c7;"><span style="width:10px; height:10px; border-radius:50%; background:#0284c7;"></span> TYT Net Eğrisi</span>
                        <span style="display:inline-flex; align-items:center; gap:5px; color:#7c3aed;"><span style="width:10px; height:10px; background:#7c3aed; transform:rotate(45deg);"></span> AYT Net Eğrisi</span>
                        <span style="display:inline-flex; align-items:center; gap:5px; color:#10b981;"><span style="width:16px; height:2px; background:#10b981; border-top:1px dashed #10b981;"></span> Hedef (${targetNet} Net)</span>
                    </div>
                    <span style="color:var(--text-muted); font-size:11px;">Son ${denemeler.length} Deneme</span>
                </div>
                <div style="min-width:540px;">
                    <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; display:block;">
                        <!-- Yatay Kılavuz Çizgileri -->
                        <line x1="${PAD_L}" y1="${H - PAD_B}" x2="${W - PAD_R}" y2="${H - PAD_B}" stroke="rgba(148,163,184,0.25)" stroke-width="1" />
                        <line x1="${PAD_L}" y1="${H - PAD_B - 0.25 * (H - PAD_T - PAD_B)}" x2="${W - PAD_R}" y2="${H - PAD_B - 0.25 * (H - PAD_T - PAD_B)}" stroke="rgba(148,163,184,0.15)" stroke-dasharray="3,3" />
                        <line x1="${PAD_L}" y1="${H - PAD_B - 0.50 * (H - PAD_T - PAD_B)}" x2="${W - PAD_R}" y2="${H - PAD_B - 0.50 * (H - PAD_T - PAD_B)}" stroke="rgba(148,163,184,0.15)" stroke-dasharray="3,3" />
                        <line x1="${PAD_L}" y1="${H - PAD_B - 0.75 * (H - PAD_T - PAD_B)}" x2="${W - PAD_R}" y2="${H - PAD_B - 0.75 * (H - PAD_T - PAD_B)}" stroke="rgba(148,163,184,0.15)" stroke-dasharray="3,3" />
                        <line x1="${PAD_L}" y1="${PAD_T}" x2="${W - PAD_R}" y2="${PAD_T}" stroke="rgba(148,163,184,0.25)" stroke-width="1" />

                        <!-- Hedef Çizgisi -->
                        <line x1="${PAD_L}" y1="${targetY}" x2="${W - PAD_R}" y2="${targetY}" stroke="#10b981" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.85" />
                        <text x="${W - PAD_R}" y="${targetY - 4}" font-size="9" font-weight="800" fill="#10b981" text-anchor="end">Hedef: ${targetNet}N</text>

                        <!-- TYT Çizgisi -->
                        ${tytPoints.length > 1 ? `<polyline fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${tytSvgPoints.trim()}" />` : ''}

                        <!-- AYT Çizgisi -->
                        ${aytPoints.length > 1 ? `<polyline fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,2" points="${aytSvgPoints.trim()}" />` : ''}

                        <!-- Noktalar ve Değerler -->
                        ${dotsSvg}

                        <!-- X Eksen Etiketleri -->
                        ${xLabels}
                    </svg>
                </div>
            </div>
        `;
    }

    function renderYksDetailDenemeler(item) {
        const c = document.getElementById('tab-yks-denemeler');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);

        // 9 ve 10. Sınıflar İçin Alt Segment Menüsü
        if (seviye === 9 || seviye === 10) {
            const activeSeg = window.activeYksDenemeSubSegment || 'oyss';
            c.innerHTML = `
                <!-- Sub-Segment Kontrolü (9-10. Sınıf) -->
                <div class="yks-subsegment-nav">
                    <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'oyss' ? 'active' : ''}" data-segment="oyss" onclick="switchYksDenemeSubSegment('oyss')">
                        <i class="fas fa-edit"></i> 📝 MEB OYSS 10 Ders Yazılı Takip Konsolu
                    </button>
                    <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'tyt-deneme' ? 'active' : ''}" data-segment="tyt-deneme" onclick="switchYksDenemeSubSegment('tyt-deneme')">
                        <i class="fas fa-stopwatch"></i> ⏱️ TYT Kondisyon Denemeleri &amp; Giriş
                    </button>
                    <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'obp-kalkan' ? 'active' : ''}" data-segment="obp-kalkan" onclick="switchYksDenemeSubSegment('obp-kalkan')">
                        <i class="fas fa-shield-alt"></i> 🛡️ OBP Koruma Kalkanı Projeksiyonu
                    </button>
                </div>

                <!-- Segment 1: MEB OYSS 10 Ders -->
                <div id="yks-deneme-seg-oyss" style="${activeSeg === 'oyss' ? 'display:block;' : 'display:none;'}">
                    ${getOyssYaziliTakipHtml(item)}
                </div>

                <!-- Segment 2: TYT Kondisyon Denemeleri -->
                <div id="yks-deneme-seg-tyt-deneme" style="${activeSeg === 'tyt-deneme' ? 'display:block;' : 'display:none;'}">
                    <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                            <h4 style="margin:0; color:#0284c7; font-size:14px;"><i class="fas fa-stopwatch me-1"></i> Erken Kademe TYT Kondisyon Denemeleri</h4>
                            <div style="display:flex; gap:8px;">
                                <button class="btn btn-clear" onclick="if (typeof window.syncAllExamsToKocluk === 'function') { window.syncAllExamsToKocluk(false); const cur = (window.yksKoclukData||[]).find(k=>k.id==='${item.id}'); if(cur) renderYksDetailDenemeler(cur); }" style="font-size:11.5px; padding:6px 12px; font-weight:700; border:1px solid rgba(2,132,199,0.35); border-radius:6px; background:rgba(2,132,199,0.08); color:#0284c7;">
                                    <i class="fas fa-sync-alt me-1"></i> 🦅 8. Sınav Analizden Veri Çek
                                </button>
                                <button class="btn btn-primary" onclick="showAddYksDenemeForm()" style="font-size:11.5px; padding:6px 12px; font-weight:700;">
                                    <i class="fas fa-plus me-1"></i> Hızlı Sınav Formunu Aç
                                </button>
                            </div>
                        </div>
                        ${renderDenemelerTableRows(item)}
                    </div>
                    ${renderAddDenemeFormBox(item)}
                </div>

                <!-- Segment 3: OBP Koruma Kalkanı -->
                <div id="yks-deneme-seg-obp-kalkan" style="${activeSeg === 'obp-kalkan' ? 'display:block;' : 'display:none;'}">
                    ${getObpShieldFullHtml(item)}
                </div>
            `;
            return;
        }

        // 11, 12 ve Mezun Seviyesi İçin Alt Segment Menüsü
        const activeSeg = window.activeYksDenemeSubSegment || 'trend-plato';
        const plateau = diagnoseYksNetPlateau(item);

        c.innerHTML = `
            <!-- Sub-Segment Kontrolü (11-12/Mezun) -->
            <div class="yks-subsegment-nav">
                <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'trend-plato' ? 'active' : ''}" data-segment="trend-plato" onclick="switchYksDenemeSubSegment('trend-plato')">
                    <i class="fas fa-chart-line"></i> 📈 Trend &amp; Çift Motorlu Plato Röntgeni
                </button>
                <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'yeni-deneme' ? 'active' : ''}" data-segment="yeni-deneme" onclick="switchYksDenemeSubSegment('yeni-deneme')">
                    <i class="fas fa-plus-circle"></i> ➕ Hızlı Sınav Girişi (İzomorfik Numpad &amp; Canlı Net)
                </button>
                <button type="button" class="yks-segment-btn yks-deneme-seg-btn ${activeSeg === 'deneme-gecmisi' ? 'active' : ''}" data-segment="deneme-gecmisi" onclick="switchYksDenemeSubSegment('deneme-gecmisi')">
                    <i class="fas fa-list-alt"></i> 📋 Deneme Kütüğü &amp; TDE Karneleri
                </button>
            </div>

            <!-- Segment 1: Trend Grafiği & Çift Motorlu Plato Röntgeni -->
            <div id="yks-deneme-seg-trend-plato" style="${activeSeg === 'trend-plato' ? 'display:block;' : 'display:none;'}">
                ${generateYksTrendSvg(item)}
                <div style="background:var(--card-bg); border:1.5px solid ${plateau.color || 'var(--border)'}; border-radius:10px; padding:16px; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
                        <h4 style="margin:0; color:${plateau.color || 'var(--text-main)'}; font-size:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-microscope"></i> Çift Katmanlı Net Platosu &amp; Süre Röntgeni
                        </h4>
                        <span style="background:${plateau.color}18; color:${plateau.color}; border:1px solid ${plateau.color}40; padding:3px 10px; border-radius:6px; font-weight:800; font-size:12px;">
                            ${escapeFn(plateau.status)}
                        </span>
                    </div>
                    <div style="background:var(--input-bg); border-left:4px solid ${plateau.color || '#0284c7'}; border-radius:0 8px 8px 0; padding:10px 14px; font-size:12px; line-height:1.45; color:var(--text-main);">
                        <strong>Cerrahi Bilişsel Reçete:</strong> ${escapeFn(plateau.recete)}
                    </div>
                </div>
            </div>

            <!-- Segment 2: Hızlı Sınav Girişi Formu -->
            <div id="yks-deneme-seg-yeni-deneme" style="${activeSeg === 'yeni-deneme' ? 'display:block;' : 'display:none;'}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                    <div style="font-size:12px; color:var(--text-muted);">
                        Form-2 ile birebir aynı sırada numpad akışı (Doğru ➔ Tab ➔ Yanlış ➔ Tab ➔ Sonraki Ders).
                    </div>
                    <button class="btn btn-clear" onclick="if (typeof window.syncAllExamsToKocluk === 'function') { window.syncAllExamsToKocluk(false); const cur = (window.yksKoclukData||[]).find(k=>k.id==='${item.id}'); if(cur) renderYksDetailDenemeler(cur); }" style="font-size:11.5px; padding:6px 12px; font-weight:700; border:1px solid rgba(2,132,199,0.35); border-radius:6px; background:rgba(2,132,199,0.08); color:#0284c7;">
                        <i class="fas fa-sync-alt me-1"></i> 🦅 8. Sınav Analizden Veri Çek
                    </button>
                </div>
                ${renderAddDenemeFormBox(item, true)}
            </div>

            <!-- Segment 3: Deneme Kütüğü & TDE Karneleri -->
            <div id="yks-deneme-seg-deneme-gecmisi" style="${activeSeg === 'deneme-gecmisi' ? 'display:block;' : 'display:none;'}">
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h4 style="margin:0; color:#0284c7; font-size:14px;"><i class="fas fa-list-alt me-1"></i> Tüm Kayıtlı Sınavlar ve TDE Skorları</h4>
                        <button class="btn btn-primary" onclick="switchYksDenemeSubSegment('yeni-deneme')" style="font-size:11.5px; padding:6px 12px; font-weight:700;">
                            <i class="fas fa-plus me-1"></i> Yeni Deneme Ekle
                        </button>
                    </div>
                    ${renderDenemelerTableRows(item)}
                </div>
            </div>
        `;
    }

    /**
     * MEB OYSS 10 Ders HTML Şablonu
     */
    function getOyssYaziliTakipHtml(item) {
        const yazililar = item.yazililar || {};
        const oyssAvg = calculateOyssAverages(item);

        let tableRows = '';
        MEB_10_DERSI.forEach((ders, idx) => {
            const y1_1 = yazililar.donem1_y1?.[ders.id] ?? '';
            const y1_2 = yazililar.donem1_y2?.[ders.id] ?? '';
            const y2_1 = yazililar.donem2_y1?.[ders.id] ?? '';
            const y2_2 = yazililar.donem2_y2?.[ders.id] ?? '';

            const arr = [parseFloat(y1_1), parseFloat(y1_2), parseFloat(y2_1), parseFloat(y2_2)].filter(n => !isNaN(n));
            const rowAvg = arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '-';

            tableRows += `
                <tr class="yks-oyss-row" data-ders="${escapeFn(ders.id)}">
                    <td style="text-align:center; font-weight:bold;">${idx + 1}</td>
                    <td style="font-weight:700; white-space:nowrap;">
                        <span style="margin-right:6px;">${ders.icon}</span> ${escapeFn(ders.name)}
                        <span style="font-size:10px; color:var(--text-muted); font-weight:normal;">(${ders.kredi} Kredi)</span>
                    </td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y1_1" value="${y1_1}" placeholder="-" onfocus="yksAutoScrollOnFocus(this)" style="width:55px; text-align:center; padding:5px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y1_2" value="${y1_2}" placeholder="-" onfocus="yksAutoScrollOnFocus(this)" style="width:55px; text-align:center; padding:5px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y2_1" value="${y2_1}" placeholder="-" onfocus="yksAutoScrollOnFocus(this)" style="width:55px; text-align:center; padding:5px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y2_2" value="${y2_2}" placeholder="-" onfocus="yksAutoScrollOnFocus(this)" style="width:55px; text-align:center; padding:5px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center; font-weight:800; color:#0284c7;">${rowAvg}</td>
                </tr>
            `;
        });

        return `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h4 style="margin:0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-edit"></i> MEB OYSS 10 Ders Ortak Yazılı Takip Konsolu
                        </h4>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                            9 ve 10. sınıflarda OYSS senaryo yazılıları OBP kalkanının temelini oluşturur.
                        </div>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <span style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); padding:5px 12px; border-radius:6px; font-size:12px; font-weight:800;">
                            Ağırlıklı Karne Ort.: ${oyssAvg.generalAvg}
                        </span>
                        <button class="btn btn-primary" onclick="saveYksOyssYazililar()" style="font-size:12px; padding:7px 16px; font-weight:700;">
                            <i class="fas fa-save me-1"></i> Yazılı Notlarını Kaydet
                        </button>
                    </div>
                </div>

                <div style="overflow-x:auto;">
                    <table class="custom-table" style="width:100%; font-size:12px; margin:0;">
                        <thead>
                            <tr style="background:var(--tab-bg);">
                                <th style="width:35px; text-align:center;">#</th>
                                <th>10 Temel MEB Dersi</th>
                                <th style="width:75px; text-align:center;">1. Dnm Y1</th>
                                <th style="width:75px; text-align:center;">1. Dnm Y2</th>
                                <th style="width:75px; text-align:center;">2. Dnm Y1</th>
                                <th style="width:75px; text-align:center;">2. Dnm Y2</th>
                                <th style="width:80px; text-align:center;">Yıl Ort.</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            </div>
        `;
    }

    /**
     * OBP Kalkanı Detay Kartı
     */
    function getObpShieldFullHtml(item) {
        const obpShield = calculateObpShield(item);
        return `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:18px;">
                <h4 style="margin:0 0 12px 0; color:#059669; display:flex; align-items:center; gap:8px;">
                    <i class="fas fa-shield-alt"></i> 🛡️ OBP Koruma Kalkanı &amp; 4 Yıllık Projeksiyon Simülatörü
                </h4>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:16px;">
                    <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:14px; text-align:center;">
                        <div style="font-size:11px; color:#059669; font-weight:800; text-transform:uppercase;">YKS Ham Puana Eklenecek Kalkan</div>
                        <div style="font-size:28px; font-weight:900; color:#059669; margin:4px 0;">+${obpShield.yerlestirmeKatkisi} Puan</div>
                        <div style="font-size:11.5px; color:var(--text-muted);">
                            ÖSYM OBP Puanı: <strong>${obpShield.obpPuan}</strong> &bull; Katsayı: 0.6
                        </div>
                    </div>
                    <div style="background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.3); border-radius:8px; padding:14px; text-align:center;">
                        <div style="font-size:11px; color:#0284c7; font-weight:800; text-transform:uppercase;">4 Yıllık Tahmini Diploma Notu</div>
                        <div style="font-size:28px; font-weight:900; color:#0284c7; margin:4px 0;">${obpShield.diplomaNotu}</div>
                        <div style="font-size:11.5px; color:var(--text-muted);">
                            Sıralamaya Doğrudan Etki: <strong>+12.000..+35.000 Kişi</strong>
                        </div>
                    </div>
                </div>

                <table class="custom-table" style="font-size:12.5px; width:100%; margin-bottom:14px;">
                    <thead>
                        <tr style="background:var(--tab-bg);">
                            <th>Lise Kademesi</th>
                            <th style="width:120px; text-align:center;">Yıl Sonu Notu</th>
                            <th>Kalkan Durumu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight:bold;">🌱 9. Sınıf Yıl Sonu:</td>
                            <td style="text-align:center;"><input type="number" step="0.1" id="yks-obp-s9" value="${obpShield.s9}" onfocus="yksAutoScrollOnFocus(this)" style="width:75px; padding:5px; text-align:center; border-radius:4px; border:1px solid var(--border);"></td>
                            <td style="font-size:11.5px; color:var(--text-muted);">Temel kavram ve OYSS senaryoları</td>
                        </tr>
                        <tr>
                            <td style="font-weight:bold;">🌿 10. Sınıf Yıl Sonu:</td>
                            <td style="text-align:center;"><input type="number" step="0.1" id="yks-obp-s10" value="${obpShield.s10}" onfocus="yksAutoScrollOnFocus(this)" style="width:75px; padding:5px; text-align:center; border-radius:4px; border:1px solid var(--border);"></td>
                            <td style="font-size:11.5px; color:var(--text-muted);">Kritik eşik: Alan seçimi öncesi OBP güvencesi</td>
                        </tr>
                        <tr>
                            <td style="font-weight:bold;">⚡ 11. Sınıf Tahmini:</td>
                            <td style="text-align:center;"><input type="number" step="0.1" id="yks-obp-s11" value="${obpShield.s11}" onfocus="yksAutoScrollOnFocus(this)" style="width:75px; padding:5px; text-align:center; border-radius:4px; border:1px solid var(--border);"></td>
                            <td style="font-size:11.5px; color:var(--text-muted);">AYT omurgası dersleri</td>
                        </tr>
                        <tr>
                            <td style="font-weight:bold;">🎯 12. Sınıf Tahmini:</td>
                            <td style="text-align:center;"><input type="number" step="0.1" id="yks-obp-s12" value="${obpShield.s12}" onfocus="yksAutoScrollOnFocus(this)" style="width:75px; padding:5px; text-align:center; border-radius:4px; border:1px solid var(--border);"></td>
                            <td style="font-size:11.5px; color:var(--text-muted);">Mezuniyet ve YKS final yılı</td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-primary" onclick="saveYksObpProjections()" style="padding:8px 18px; font-size:12px; font-weight:700; background:#059669; border-color:#059669;">
                    <i class="fas fa-save me-1"></i> OBP Kalkanı Notlarını Kaydet
                </button>
            </div>
        `;
    }

    function renderTytAytDenemeList(container, item) {
        renderYksDetailDenemeler(item);
    }

    function renderDenemelerTableRows(item) {
        const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];
        let rows = '';
        denemeler.forEach((d, idx) => {
            const tde = calculateYksTde(d);
            const isAyt = String(d.tur).toUpperCase().includes('AYT');
            const totalNet = Number(d.netler?.toplam || 0).toFixed(2);
            const sourceBadge = (d.source === 'exam_module' || d.examId)
                ? `<span style="display:inline-block; font-size:10px; font-weight:800; background:rgba(2,132,199,0.12); color:#0284c7; border:1px solid rgba(2,132,199,0.3); padding:1px 6px; border-radius:4px; margin-left:6px;" title="8. Sınav Analiz bölümünden otomatik aktarıldı"><i class="fas fa-link me-1"></i>8. Sınav Analiz</span>`
                : '';
            rows += `
                <tr>
                    <td style="font-weight:bold; text-align:center;">${idx + 1}</td>
                    <td>${escapeFn(d.tarih || '-')}</td>
                    <td><span style="background:${isAyt ? '#7c3aed' : '#0284c7'}; color:white; padding:2px 8px; border-radius:6px; font-size:10px; font-weight:800;">${escapeFn(d.tur)}</span></td>
                    <td>${escapeFn(d.yayin || 'Genel Deneme')}${sourceBadge}</td>
                    <td style="font-weight:900; color:var(--text-main); text-align:center;">${totalNet}</td>
                    <td style="text-align:center;">
                        <span style="background:${tde.badgeBg}; color:${tde.badgeColor}; border:1px solid ${tde.badgeBorder}; padding:2px 8px; border-radius:6px; font-weight:800; font-size:11px;">
                            ${tde.tdePuan} Puan
                        </span>
                    </td>
                    <td style="font-size:11px; color:var(--text-muted);">${escapeFn(tde.badgeText)}</td>
                    <td style="text-align:center;">
                        <button class="action-btn" onclick="deleteYksDeneme(${idx})" title="Denemeyi Sil" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        if (!rows) {
            rows = `<tr><td colspan="8" style="text-align:center; padding:22px; color:var(--text-muted);">Henüz kayıtlı deneme sınavı bulunamadı.</td></tr>`;
        }

        return `
            <div style="overflow-x:auto;">
                <table class="custom-table" style="width:100%; font-size:12px; margin:0;">
                    <thead>
                        <tr style="background:var(--tab-bg);">
                            <th style="width:40px; text-align:center;">#</th>
                            <th style="width:90px;">Tarih</th>
                            <th style="width:65px;">Oturum</th>
                            <th>Yayın / Deneme Adı</th>
                            <th style="width:80px; text-align:center;">Toplam Net</th>
                            <th style="width:100px; text-align:center;">TDE Skoru</th>
                            <th>Stratejik Teşhis</th>
                            <th style="width:50px; text-align:center;">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    /**
     * İzomorfik Form-2 Sıralı Hızlı Deneme Giriş Kutusu (Zero-Friction Numpad Flow)
     */
    function renderAddDenemeFormBox(item, forceVisible) {
        const displayStyle = forceVisible ? 'display:block;' : 'display:none;';
        return `
            <div id="yks-add-deneme-form-box" style="${displayStyle} margin-top:14px; background:var(--card-bg); border:1.5px dashed #0284c7; border-radius:10px; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                    <h4 style="margin:0; color:#0284c7; font-size:13.5px; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-bolt" style="color:#d97706;"></i> ⏱️ Hızlı Sınav Girişi (İzomorfik Sıra &amp; Canlı Net)
                    </h4>
                    <div style="background:rgba(2,132,199,0.1); border:1px solid rgba(2,132,199,0.3); border-radius:6px; padding:4px 10px; font-size:12px; font-weight:800; color:#0284c7;">
                        Toplam Net: <span id="yks-den-live-toplam-display">0.00</span>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="font-size:11px; font-weight:700;">Tarih:</label>
                        <input type="date" id="yks-den-date" value="${new Date().toISOString().split('T')[0]}" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Oturum Türü:</label>
                        <select id="yks-den-tur" onchange="toggleYksDenemeTurFields()" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px; font-weight:700;">
                            <option value="TYT" selected>TYT (120 Soru / 165 Dk)</option>
                            <option value="AYT">AYT (80 Soru / 180 Dk)</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Yayın / Deneme Adı:</label>
                        <input type="text" id="yks-den-yayin" placeholder="Örn: 3D Türkiye Geneli-1" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Toplam Net (Otomatik):</label>
                        <input type="number" step="0.25" id="yks-den-toplam-net" value="0" readonly style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px; font-weight:900; color:#0284c7;">
                    </div>
                </div>

                <!-- 1-e-1 İZOMORFİK BRANŞ GİRİŞ MATRİSİ (FORM-2 İLE AYNI SIRA) -->
                <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px;">
                    <div style="font-size:11.5px; font-weight:800; color:var(--text-main); margin-bottom:8px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
                        <span><i class="fas fa-keyboard me-1"></i> Numpad Hızlı Giriş (Sıra: D ➔ Tab ➔ Y ➔ Tab ➔ Sonraki Ders)</span>
                        <span style="font-size:11px; color:var(--text-muted);">Boş ve Net Otomatik Hesaplanır</span>
                    </div>

                    <!-- TYT Branşları -->
                    <div id="yks-tyt-branches-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px;">
                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#0284c7; margin-bottom:4px;">1. Türkçe (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="1" min="0" max="40" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="2" min="0" max="40" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#0284c7;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="20" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#d97706; margin-bottom:4px;">2. Sosyal Bilimler (20 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="3" min="0" max="20" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="4" min="0" max="20" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">20</span><br>Net: <strong class="yks-val-net" style="color:#d97706;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#059669; margin-bottom:4px;">3. Temel Matematik (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="5" min="0" max="40" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="6" min="0" max="40" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#059669;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="20" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#7c3aed; margin-bottom:4px;">4. Fen Bilimleri (20 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="7" min="0" max="20" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="8" min="0" max="20" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">20</span><br>Net: <strong class="yks-val-net" style="color:#7c3aed;">0.00</strong></div>
                            </div>
                        </div>
                    </div>

                    <!-- AYT Branşları (Varsayılan Gizli) -->
                    <div id="yks-ayt-branches-grid" style="display:none; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px;">
                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#7c3aed; margin-bottom:4px;">AYT Matematik (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="11" min="0" max="40" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="12" min="0" max="40" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#7c3aed;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#059669; margin-bottom:4px;">AYT Fen / Edebiyat-Sosyal (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="13" min="0" max="40" class="yks-input-d" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="14" min="0" max="40" class="yks-input-y" onfocus="yksAutoScrollOnFocus(this)" oninput="calculateYksLiveNet(this)" style="width:52px; padding:5px; text-align:center; font-size:12.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#059669;">0.00</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ÇİFT MOTORLU TDE AKORDEON PANELİ -->
                <div style="border:1px solid var(--border); border-radius:8px; margin-bottom:14px; overflow:hidden;">
                    <div onclick="toggleYksTdeAccordion()" style="background:var(--tab-bg); padding:10px 14px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-weight:700; font-size:12px;">
                        <span><i class="fas fa-sliders-h me-1" style="color:#d97706;"></i> Çift Motorlu TDE™ Strateji &amp; Süre Analizi Parametreleri (İsteğe Bağlı)</span>
                        <i id="yks-tde-acc-icon" class="fas fa-chevron-down"></i>
                    </div>
                    <div id="yks-tde-accordion-body" style="display:none; padding:14px; background:var(--card-bg);">
                        <div id="yks-tde-tyt-fields" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; font-size:11.5px;">
                            <div>
                                <label style="font-weight:700;">1. Türkçe Süresi (Dk):</label>
                                <input type="number" id="yks-tde-turkce-sure" value="40" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">3. Matematik Süresi (Dk):</label>
                                <input type="number" id="yks-tde-mat-sure" value="45" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">Fen + Sosyal Süresi (Dk):</label>
                                <input type="number" id="yks-tde-fen-sos-sure" value="30" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">İnatlaşılan Soru Adedi (-8p):</label>
                                <input type="number" id="yks-tde-inat-soru" value="0" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">2. Turda Kurtarılan Net (+4p):</label>
                                <input type="number" id="yks-tde-tur2-net" value="0" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div style="display:flex; align-items:center; gap:6px; margin-top:16px;">
                                <input type="checkbox" id="yks-tde-optik" checked>
                                <label for="yks-tde-optik" style="font-weight:700;">Optik Kontrol Yapıldı (+15p)</label>
                            </div>
                        </div>

                        <div id="yks-tde-ayt-fields" style="display:none; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; font-size:11.5px;">
                            <div>
                                <label style="font-weight:700;">Dikkat Hatası (-12p/soru):</label>
                                <input type="number" id="yks-tde-ayt-dikkat" value="0" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">Kök/Öncül Algılama (-10p):</label>
                                <input type="number" id="yks-tde-ayt-oncul" value="0" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div>
                                <label style="font-weight:700;">Rastgele Kumar İşaretleme (-15p):</label>
                                <input type="number" id="yks-tde-ayt-kumar" value="0" onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:5px; border-radius:4px; border:1px solid var(--border);">
                            </div>
                            <div style="display:flex; align-items:center; gap:6px; margin-top:16px;">
                                <input type="checkbox" id="yks-tde-ayt-optik" checked>
                                <label for="yks-tde-ayt-optik" style="font-weight:700;">AYT Optik Kontrol (+10p)</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:8px;">
                    <button class="btn btn-clear" onclick="document.getElementById('yks-add-deneme-form-box').style.display='none';" style="font-size:12px; padding:7px 16px;">İptal</button>
                    <button class="btn btn-primary" onclick="saveNewYksDeneme()" style="font-size:12px; padding:7px 20px; font-weight:700;">
                        <i class="fas fa-save me-1"></i> Denemeyi Kaydet &amp; TDE Skorla
                    </button>
                </div>
            </div>
        `;
    }

    function showAddYksDenemeForm() {
        const box = document.getElementById('yks-add-deneme-form-box');
        if (box) {
            box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
            if (box.style.display === 'block') {
                box.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    function toggleYksDenemeTurFields() {
        const tur = document.getElementById('yks-den-tur')?.value || 'TYT';
        const isAyt = tur === 'AYT';

        const tytGrid = document.getElementById('yks-tyt-branches-grid');
        const aytGrid = document.getElementById('yks-ayt-branches-grid');
        const tytTde = document.getElementById('yks-tde-tyt-fields');
        const aytTde = document.getElementById('yks-tde-ayt-fields');

        if (tytGrid) tytGrid.style.display = isAyt ? 'none' : 'grid';
        if (aytGrid) aytGrid.style.display = isAyt ? 'grid' : 'none';
        if (tytTde) tytTde.style.display = isAyt ? 'none' : 'grid';
        if (aytTde) aytTde.style.display = isAyt ? 'grid' : 'none';

        // Sıfırla ve yeniden hesapla
        document.querySelectorAll('.yks-input-d, .yks-input-y').forEach(inp => {
            if (inp.offsetParent !== null) {
                calculateYksLiveNet(inp);
            }
        });
    }

    function toggleYksTdeAccordion() {
        const body = document.getElementById('yks-tde-accordion-body');
        const icon = document.getElementById('yks-tde-acc-icon');
        if (body) {
            const isHidden = body.style.display === 'none';
            body.style.display = isHidden ? 'block' : 'none';
            if (icon) icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        }
    }

    function calculateYksLiveNet(inputEl) {
        const row = inputEl.closest('.yks-branch-row');
        if (!row) return;

        const totalQ = parseInt(row.getAttribute('data-total-q') || '40', 10);
        const dVal = parseFloat(row.querySelector('.yks-input-d')?.value) || 0;
        const yVal = parseFloat(row.querySelector('.yks-input-y')?.value) || 0;

        const bVal = Math.max(0, totalQ - (dVal + yVal));
        const netVal = Math.max(0, dVal - (yVal * 0.25));

        const bSpan = row.querySelector('.yks-val-b');
        const netSpan = row.querySelector('.yks-val-net');
        if (bSpan) bSpan.textContent = bVal;
        if (netSpan) netSpan.textContent = netVal.toFixed(2);

        // Toplam neti güncelle
        updateYksTotalNetLive();
    }

    function updateYksTotalNetLive() {
        const tur = document.getElementById('yks-den-tur')?.value || 'TYT';
        const isAyt = tur === 'AYT';
        const gridId = isAyt ? 'yks-ayt-branches-grid' : 'yks-tyt-branches-grid';
        const grid = document.getElementById(gridId);

        let sumNet = 0;
        if (grid) {
            grid.querySelectorAll('.yks-branch-row').forEach(r => {
                const n = parseFloat(r.querySelector('.yks-val-net')?.textContent) || 0;
                sumNet += n;
            });
        }

        const displayEl = document.getElementById('yks-den-live-toplam-display');
        const inputEl = document.getElementById('yks-den-toplam-net');
        if (displayEl) displayEl.textContent = sumNet.toFixed(2);
        if (inputEl) inputEl.value = sumNet.toFixed(2);
    }

    function saveNewYksDeneme() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const tarih = document.getElementById('yks-den-date')?.value || new Date().toISOString().split('T')[0];
        const tur = document.getElementById('yks-den-tur')?.value || 'TYT';
        const yayin = document.getElementById('yks-den-yayin')?.value.trim() || `${tur} Genel Deneme`;
        const net = parseFloat(document.getElementById('yks-den-toplam-net')?.value) || 0;

        // Süre Analizi
        let sureAnalizi = {};
        if (tur === 'TYT') {
            sureAnalizi = {
                turkce1TurDk: parseInt(document.getElementById('yks-tde-turkce-sure')?.value) || 40,
                mat1TurDk: parseInt(document.getElementById('yks-tde-mat-sure')?.value) || 45,
                fenSosyalSureDk: parseInt(document.getElementById('yks-tde-fen-sos-sure')?.value) || 30,
                inatSoruSayisi: parseInt(document.getElementById('yks-tde-inat-soru')?.value) || 0,
                tur2KurtarilanNet: parseFloat(document.getElementById('yks-tde-tur2-net')?.value) || 0,
                optikKontrol: document.getElementById('yks-tde-optik')?.checked ?? true
            };
        } else {
            sureAnalizi = {
                dikkatHatasiSoru: parseInt(document.getElementById('yks-tde-ayt-dikkat')?.value) || 0,
                soruKokuAlgilamaHatasi: parseInt(document.getElementById('yks-tde-ayt-oncul')?.value) || 0,
                rastgeleKumarIsaretleme: parseInt(document.getElementById('yks-tde-ayt-kumar')?.value) || 0,
                optikKontrol: document.getElementById('yks-tde-ayt-optik')?.checked ?? true
            };
        }

        const newDen = {
            id: 'den_' + Date.now(),
            tarih,
            tur,
            yayin,
            netler: { toplam: net },
            sureAnalizi
        };

        if (!Array.isArray(item.denemeler)) item.denemeler = [];
        item.denemeler.push(newDen);

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Deneme sınavı ve TDE analizi başarıyla kaydedildi.', 'success');
        }

        window.activeYksDenemeSubSegment = 'deneme-gecmisi';
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
    }

    function deleteYksDeneme(index) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item || !Array.isArray(item.denemeler)) return;
        if (!confirm('Bu deneme kaydını silmek istediğinize emin misiniz?')) return;
        item.denemeler.splice(index, 1);
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Deneme kaydı silindi.', 'warning');
        }
        window.activeYksDenemeSubSegment = 'deneme-gecmisi';
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
    }


    function saveYksOyssYazililar() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const yazililar = { donem1_y1: {}, donem1_y2: {}, donem2_y1: {}, donem2_y2: {} };
        document.querySelectorAll('.yks-oyss-row').forEach(row => {
            const dersId = row.getAttribute('data-ders');
            const y1_1 = row.querySelector('.y1_1')?.value;
            const y1_2 = row.querySelector('.y1_2')?.value;
            const y2_1 = row.querySelector('.y2_1')?.value;
            const y2_2 = row.querySelector('.y2_2')?.value;

            if (y1_1 !== '' && !isNaN(y1_1)) yazililar.donem1_y1[dersId] = parseFloat(y1_1);
            if (y1_2 !== '' && !isNaN(y1_2)) yazililar.donem1_y2[dersId] = parseFloat(y1_2);
            if (y2_1 !== '' && !isNaN(y2_1)) yazililar.donem2_y1[dersId] = parseFloat(y2_1);
            if (y2_2 !== '' && !isNaN(y2_2)) yazililar.donem2_y2[dersId] = parseFloat(y2_2);
        });

        item.yazililar = yazililar;
        const avgObj = calculateOyssAverages(item);
        if (avgObj.generalAvg > 0) {
            item.obp = avgObj.generalAvg;
            const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
            if (!item.obpTakip) item.obpTakip = {};
            if (seviye === 9) item.obpTakip.sinif9 = avgObj.generalAvg;
            else if (seviye === 10) item.obpTakip.sinif10 = avgObj.generalAvg;
            else if (seviye === 11) item.obpTakip.sinif11 = avgObj.generalAvg;
            item.obpTakip.hesaplananObp = calculateObpShield(item).diplomaNotu;
        }

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('MEB OYSS yazılı notları ve OBP Kalkanı kaydedildi.', 'success');
        } else {
            alert('MEB OYSS yazılı notları ve OBP Kalkanı başarıyla kaydedildi.');
        }
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
    }

    // ─────────────────────────────────────────────────────────────
    // SUB-TAB 3: METABİLİŞSEL SORU AMELİYATHANESİ & HATA DEFTERİ
    // ─────────────────────────────────────────────────────────────

    function switchYksHataSubSegment(segmentId) {
        window.activeYksHataSubSegment = segmentId;
        document.querySelectorAll('.yks-hata-seg-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-segment') === segmentId;
            btn.classList.toggle('active', isActive);
        });

        ['kok-neden-dagilim', 'ebbinghaus-tekrarlar', 'yeni-hata-ameliyat'].forEach(seg => {
            const el = document.getElementById('yks-hata-seg-' + seg);
            if (el) el.style.display = (seg === segmentId) ? 'block' : 'none';
        });
    }

    function renderYksDetailHataDefteri(item) {
        const c = document.getElementById('tab-yks-hata');
        if (!c) return;

        const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const activeSeg = window.activeYksHataSubSegment || 'kok-neden-dagilim';

        // Kök neden dağılım sayıları
        let countA = 0, countB = 0, countC = 0, countD = 0;
        let dueCount = 0;
        let completedCount = 0;

        hatalar.forEach(h => {
            const st = getYksHataRepeatStatus(h);
            if (st.isDue) dueCount++;
            if (st.status === 'completed') completedCount++;
            const k = (h.kokNeden || 'A').toUpperCase();
            if (k === 'A') countA++;
            else if (k === 'B') countB++;
            else if (k === 'C') countC++;
            else if (k === 'D') countD++;
        });

        const totalErrors = hatalar.length;
        const pA = totalErrors ? Math.round((countA / totalErrors) * 100) : 0;
        const pB = totalErrors ? Math.round((countB / totalErrors) * 100) : 0;
        const pC = totalErrors ? Math.round((countC / totalErrors) * 100) : 0;
        const pD = totalErrors ? Math.round((countD / totalErrors) * 100) : 0;

        // Dominant Kök Neden Tespiti ve Cerrahi Reçete
        let dominantCode = 'A';
        let maxCount = countA;
        if (countB > maxCount) { dominantCode = 'B'; maxCount = countB; }
        if (countC > maxCount) { dominantCode = 'C'; maxCount = countC; }
        if (countD > maxCount) { dominantCode = 'D'; maxCount = countD; }

        const dominantMeta = getYksKokNedenMeta(dominantCode);

        let dominantRecete = '';
        if (dominantCode === 'A') {
            dominantRecete = 'Konu temelinde kavram boşluğu var. Deneme çözmeyi yavaşlatıp MEB kazanım testlerine ve kavram haritalarına dönülmelidir.';
        } else if (dominantCode === 'B') {
            dominantRecete = 'Soru kökü ve kurgu tuzaklarına düşülüyor. Sorunun altı çizilmeli, "hangisi olamaz / kesinlikle" ifadelerine nöral kilitlenme uygulanmalıdır.';
        } else if (dominantCode === 'C') {
            dominantRecete = 'Zaman baskısı altında işlem ve optik kontrol hatası yapılıyor. Numpad turlama tekniği ve her sorudan sonra optik kontrol alışkanlığı kazandırılmalıdır.';
        } else {
            dominantRecete = 'Öğrencinin zor sorulara veya belirli branşlara karşı bilişsel direnci var. Blok pomodoro seanslarında ilk 15 dakika en çok korkulan soru tipine ayrılmalıdır.';
        }

        // Bekleyen Ebbinghaus Tekrarları
        const dueErrors = hatalar.map((h, i) => ({ h, idx: i })).filter(item => getYksHataRepeatStatus(item.h).isDue);

        // Filtreli Tüm Hatalar
        const filteredHatalar = hatalar.map((h, i) => ({ h, idx: i })).filter(item => {
            if (activeHataFilter === 'due') return getYksHataRepeatStatus(item.h).isDue;
            if (activeHataFilter === 'completed') return getYksHataRepeatStatus(item.h).status === 'completed';
            if (['A', 'B', 'C', 'D'].includes(activeHataFilter)) return (item.h.kokNeden || 'A').toUpperCase() === activeHataFilter;
            return true;
        });

        let allRows = '';
        filteredHatalar.forEach(({ h, idx }, displayIdx) => {
            const rep = getYksHataRepeatStatus(h);
            allRows += `
                <tr>
                    <td style="font-weight:bold; text-align:center;">${displayIdx + 1}</td>
                    <td><span style="font-size:10px; font-weight:800; background:rgba(2,132,199,0.1); color:#0284c7; padding:2px 6px; border-radius:4px;">${escapeFn(h.oturum || 'TYT')}</span> &bull; <strong>${escapeFn(h.ders || '-')}</strong></td>
                    <td style="font-size:11.5px;">${escapeFn(h.konu || '-')}</td>
                    <td style="text-align:center;">
                        ${getYksKokNedenBadge(h.kokNeden)}
                    </td>
                    <td style="font-size:11px; line-height:1.35;">
                        ${h.kavramYanilgisi ? `<div style="color:#ef4444; font-weight:600;"><i class="fas fa-times-circle me-1"></i>${escapeFn(h.kavramYanilgisi)}</div>` : ''}
                        <div style="color:#059669; font-weight:600;"><i class="fas fa-check-circle me-1"></i>${escapeFn(h.soruNotu || '-')}</div>
                    </td>
                    <td style="text-align:center;">
                        <span style="background:${rep.badgeBg}; color:${rep.badgeColor}; font-size:10px; font-weight:800; padding:2px 6px; border-radius:6px; display:inline-block;">
                            ${escapeFn(rep.label)}
                        </span>
                    </td>
                    <td style="text-align:center; font-size:10.5px; white-space:nowrap;">
                        <label style="margin-right:4px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 1)" ${h.tekrar1 ? 'checked' : ''} title="1. Gün (24 sa)"> 1G</label>
                        <label style="margin-right:4px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 3)" ${h.tekrar3 ? 'checked' : ''} title="3. Gün (72 sa)"> 3G</label>
                        <label style="margin-right:4px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 7)" ${h.tekrar7 ? 'checked' : ''} title="7. Gün (168 sa)"> 7G</label>
                        <label style="cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 21)" ${h.tekrar21 ? 'checked' : ''} title="21. Gün (504 sa)"> 21G</label>
                    </td>
                    <td style="text-align:center;">
                        <button class="action-btn" onclick="deleteYksHata(${idx})" title="Soruyu Sil" style="color:#ef4444; background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        if (!allRows) {
            allRows = `<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Bu filtreye uygun soru kaydı bulunamadı.</td></tr>`;
        }

        let dueRows = '';
        dueErrors.forEach(({ h, idx }, displayIdx) => {
            const rep = getYksHataRepeatStatus(h);
            dueRows += `
                <tr style="background:rgba(239,68,68,0.04);">
                    <td style="font-weight:bold; text-align:center;">${displayIdx + 1}</td>
                    <td><strong>${escapeFn(h.ders || '-')}</strong> <small style="color:var(--text-muted);">(${escapeFn(h.oturum || 'TYT')})</small></td>
                    <td>${escapeFn(h.konu || '-')}</td>
                    <td style="text-align:center;">${getYksKokNedenBadge(h.kokNeden)}</td>
                    <td style="font-size:11px;">
                        ${h.kavramYanilgisi ? `<span style="color:#ef4444; font-weight:700;">Yanıldım:</span> ${escapeFn(h.kavramYanilgisi)}<br>` : ''}
                        <span style="color:#059669; font-weight:700;">Nüans:</span> ${escapeFn(h.soruNotu || '-')}
                    </td>
                    <td style="text-align:center;">
                        <span style="background:${rep.badgeBg}; color:${rep.badgeColor}; font-size:10.5px; font-weight:800; padding:3px 8px; border-radius:6px;">
                            ${escapeFn(rep.label)}
                        </span>
                    </td>
                    <td style="text-align:center; white-space:nowrap;">
                        <label style="margin-right:6px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 1)" ${h.tekrar1 ? 'checked' : ''}> 1G</label>
                        <label style="margin-right:6px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 3)" ${h.tekrar3 ? 'checked' : ''}> 3G</label>
                        <label style="margin-right:6px; cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 7)" ${h.tekrar7 ? 'checked' : ''}> 7G</label>
                        <label style="cursor:pointer;"><input type="checkbox" onchange="toggleYksHataTekrar(${idx}, 21)" ${h.tekrar21 ? 'checked' : ''}> 21G</label>
                    </td>
                </tr>
            `;
        });

        if (!dueRows) {
            dueRows = `<tr><td colspan="7" style="text-align:center; padding:26px; color:#10b981; font-weight:700;"><i class="fas fa-check-circle me-1"></i> Tebrikler! Şu an günü gelmiş bekleyen aralıklı tekrar sorusu yok.</td></tr>`;
        }

        c.innerHTML = `
            <!-- Sub-Segment Kontrolü (Hata Defteri) -->
            <div class="yks-subsegment-nav">
                <button type="button" class="yks-segment-btn yks-hata-seg-btn ${activeSeg === 'kok-neden-dagilim' ? 'active' : ''}" data-segment="kok-neden-dagilim" onclick="switchYksHataSubSegment('kok-neden-dagilim')">
                    <i class="fas fa-chart-pie"></i> 🎯 4 Kök Neden Dağılımı &amp; Cerrahi Reçete
                </button>
                <button type="button" class="yks-segment-btn yks-hata-seg-btn ${activeSeg === 'ebbinghaus-tekrarlar' ? 'active' : ''}" data-segment="ebbinghaus-tekrarlar" onclick="switchYksHataSubSegment('ebbinghaus-tekrarlar')">
                    <i class="fas fa-history"></i> ⏰ Ebbinghaus Bekleyen Tekrarlar <span style="background:#ef4444; color:white; font-size:10px; padding:1px 6px; border-radius:10px; margin-left:4px;">${dueCount}</span>
                </button>
                <button type="button" class="yks-segment-btn yks-hata-seg-btn ${activeSeg === 'yeni-hata-ameliyat' ? 'active' : ''}" data-segment="yeni-hata-ameliyat" onclick="switchYksHataSubSegment('yeni-hata-ameliyat')">
                    <i class="fas fa-plus-circle"></i> ➕ Soru Ameliyathanesine Yatır &amp; Kütük
                </button>
            </div>

            <!-- Segment 1: Kök Neden Dağılımı ve Cerrahi Reçete -->
            <div id="yks-hata-seg-kok-neden-dagilim" style="${activeSeg === 'kok-neden-dagilim' ? 'display:block;' : 'display:none;'}">
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h4 style="margin:0; font-size:13.5px; color:var(--text-main); font-weight:800;">
                            <i class="fas fa-dna me-1" style="color:#0284c7;"></i> Nöral Hata Kök Neden Dağılımı (${totalErrors} Kayıtlı Soru)
                        </h4>
                        <span style="font-size:11.5px; color:var(--text-muted);">
                            Baskın Kod: <strong style="color:${dominantMeta.color};">${dominantMeta.icon} Kod ${dominantMeta.code} (${dominantMeta.short})</strong>
                        </span>
                    </div>

                    <!-- 4 Renkli Dağılım Çubuğu -->
                    <div style="height:24px; border-radius:6px; overflow:hidden; display:flex; margin-bottom:12px; border:1px solid var(--border); font-size:10.5px; font-weight:800; color:white; text-align:center; line-height:24px;">
                        <div style="width:${pA}%; background:#ef4444; min-width:${pA > 0 ? '25px' : '0'};" title="Kod A (Bilgi Eksikliği): %${pA}">${pA > 7 ? `A %${pA}` : ''}</div>
                        <div style="width:${pB}%; background:#f59e0b; min-width:${pB > 0 ? '25px' : '0'};" title="Kod B (Kurgu/Soru Kökü): %${pB}">${pB > 7 ? `B %${pB}` : ''}</div>
                        <div style="width:${pC}%; background:#0284c7; min-width:${pC > 0 ? '25px' : '0'};" title="Kod C (Süre/İşlem Hatası): %${pC}">${pC > 7 ? `C %${pC}` : ''}</div>
                        <div style="width:${pD}%; background:#7c3aed; min-width:${pD > 0 ? '25px' : '0'};" title="Kod D (Bilişsel Direnç): %${pD}">${pD > 7 ? `D %${pD}` : ''}</div>
                    </div>

                    <!-- Kod Açıklama Rozetleri -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:8px; font-size:11.5px; margin-bottom:14px;">
                        <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:6px 10px;">
                            <span style="color:#ef4444; font-weight:800;">🔴 Kod A:</span> Bilgi Eksikliği <strong>(${countA})</strong>
                        </div>
                        <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:6px 10px;">
                            <span style="color:#f59e0b; font-weight:800;">🟡 Kod B:</span> Kurgu &amp; Kök <strong>(${countB})</strong>
                        </div>
                        <div style="background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.3); border-radius:6px; padding:6px 10px;">
                            <span style="color:#0284c7; font-weight:800;">🔵 Kod C:</span> Süre &amp; İşlem <strong>(${countC})</strong>
                        </div>
                        <div style="background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.3); border-radius:6px; padding:6px 10px;">
                            <span style="color:#7c3aed; font-weight:800;">🟣 Kod D:</span> Bilişsel Direnç <strong>(${countD})</strong>
                        </div>
                    </div>

                    <!-- Dominant Reçete Kartı -->
                    <div style="background:var(--input-bg); border-left:4px solid ${dominantMeta.color}; border-radius:0 8px 8px 0; padding:12px 14px; font-size:12px; line-height:1.45;">
                        <strong style="color:${dominantMeta.color};">${dominantMeta.icon} Dominant Kök Neden Cerrahi Reçetesi:</strong>
                        <div style="margin-top:3px; color:var(--text-main);">${dominantRecete}</div>
                    </div>
                </div>
            </div>

            <!-- Segment 2: Bekleyen Ebbinghaus Tekrarları -->
            <div id="yks-hata-seg-ebbinghaus-tekrarlar" style="${activeSeg === 'ebbinghaus-tekrarlar' ? 'display:block;' : 'display:none;'}">
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h4 style="margin:0; font-size:14px; color:#ef4444;"><i class="fas fa-clock me-1"></i> Ebbinghaus Unutma Eğrisine Göre Acil Tekrar Bekleyen Sorular</h4>
                        <span style="font-size:11.5px; color:var(--text-muted);">
                            1. Gün (24s) ➔ 3. Gün (72s) ➔ 7. Gün (168s) ➔ 21. Gün (504s)
                        </span>
                    </div>
                    <div style="overflow-x:auto;">
                        <table class="custom-table" style="width:100%; font-size:12px; margin:0;">
                            <thead>
                                <tr style="background:var(--tab-bg);">
                                    <th style="width:35px; text-align:center;">#</th>
                                    <th>Ders &amp; Oturum</th>
                                    <th>Konu / Kazanım</th>
                                    <th style="width:80px; text-align:center;">Kök Neden</th>
                                    <th>Kavram Yanılgısı &amp; Bilişsel Nüans</th>
                                    <th style="width:110px; text-align:center;">Durum</th>
                                    <th style="width:130px; text-align:center;">Mühürle</th>
                                </tr>
                            </thead>
                            <tbody>${dueRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Segment 3: Soru Ameliyathanesi Formu & Tüm Kayıtlar -->
            <div id="yks-hata-seg-yeni-hata-ameliyat" style="${activeSeg === 'yeni-hata-ameliyat' ? 'display:block;' : 'display:none;'}">
                <!-- 2 Sütunlu Cerrahi Kayıt Formu -->
                <div style="background:var(--card-bg); border:1.5px solid #0284c7; border-radius:10px; padding:16px; margin-bottom:16px;">
                    <h4 style="margin:0 0 12px 0; color:#0284c7; font-size:13.5px; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-cut" style="color:#ef4444;"></i> Metabilişsel Soru Ameliyathanesine Yatır (Kavram Yanılgısı ➔ Doğru Kural)
                    </h4>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:700;">Sınav / Oturum:</label>
                            <select id="yks-err-oturum" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px; font-weight:700;">
                                <option value="TYT">TYT</option>
                                <option value="AYT">AYT</option>
                                <option value="OYSS">MEB OYSS Yazılısı</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Ders:</label>
                            <input type="text" id="yks-err-ders" placeholder="Örn: Matematik, Fizik, Biyoloji..." onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Konu / Mikro-Kazanım:</label>
                            <input type="text" id="yks-err-konu" placeholder="Örn: Türev Geometrik Yorum, Limit, Mitoz..." onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Soru Kalite Piramidi Düzeyi:</label>
                            <select id="yks-err-duzey" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px; font-weight:700;">
                                <option value="1">Düzey 1 (Temel Hatırlama)</option>
                                <option value="2">Düzey 2 (Kavrama &amp; Standart)</option>
                                <option value="3" selected>Düzey 3 (Yeni Nesil &amp; Çift Kazanım)</option>
                                <option value="4">Düzey 4 (Üst Biliş &amp; Eleme)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Kök Neden Hap Seçicileri -->
                    <div style="margin-bottom:12px;">
                        <label style="font-size:11px; font-weight:700; margin-bottom:6px; display:block;">Cerrahi Kök Neden Kodu:</label>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            <button type="button" class="btn btn-sm yks-kok-btn" data-kok="A" onclick="selectYksHataKokNeden('A')" style="border-radius:20px; font-size:11.5px; font-weight:700; padding:5px 14px; background:rgba(239,68,68,0.18); color:#ef4444; border:2px solid #ef4444;">
                                🔴 Kod A: Bilgi Eksikliği
                            </button>
                            <button type="button" class="btn btn-sm yks-kok-btn" data-kok="B" onclick="selectYksHataKokNeden('B')" style="border-radius:20px; font-size:11.5px; font-weight:700; padding:5px 14px; background:transparent; color:var(--text-muted); border:1px solid var(--border);">
                                🟡 Kod B: Kurgu &amp; Kök
                            </button>
                            <button type="button" class="btn btn-sm yks-kok-btn" data-kok="C" onclick="selectYksHataKokNeden('C')" style="border-radius:20px; font-size:11.5px; font-weight:700; padding:5px 14px; background:transparent; color:var(--text-muted); border:1px solid var(--border);">
                                🔵 Kod C: Süre &amp; İşlem
                            </button>
                            <button type="button" class="btn btn-sm yks-kok-btn" data-kok="D" onclick="selectYksHataKokNeden('D')" style="border-radius:20px; font-size:11.5px; font-weight:700; padding:5px 14px; background:transparent; color:var(--text-muted); border:1px solid var(--border);">
                                🟣 Kod D: Bilişsel Direnç
                            </button>
                        </div>
                    </div>

                    <!-- İki Sütunlu Metabilişsel Analiz Alanı -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px; margin-bottom:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:#ef4444;"><i class="fas fa-times-circle me-1"></i> Ben Ne Düşündüm? (Kavram Yanılgım / Çeldirici Tuzağım):</label>
                            <textarea id="yks-err-yanilgi" rows="2" placeholder="Örn: Soruda 'kesinlikle' diyordu, negatif kökleri unutup pozitif kabul ettim..." onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(239,68,68,0.4); background:var(--input-bg); font-size:12px;"></textarea>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700; color:#059669;"><i class="fas fa-check-circle me-1"></i> Doğru Bilişsel Nüans &amp; Kalıcı Kural:</label>
                            <textarea id="yks-err-not" rows="2" placeholder="Örn: Eşitsizliklerde payda işaret değiştirirken yön değiştirir, paydayı sıfır yapan kökü daima yuvarlak içine al..." onfocus="yksAutoScrollOnFocus(this)" style="width:100%; padding:8px; border-radius:6px; border:1px solid rgba(16,185,129,0.4); background:var(--input-bg); font-size:12px;"></textarea>
                        </div>
                    </div>

                    <div style="display:flex; justify-content:flex-end;">
                        <button class="btn btn-primary" onclick="saveNewYksHata()" style="padding:8px 22px; font-size:12px; font-weight:700;">
                            <i class="fas fa-save me-1"></i> Soruyu Ameliyathaneye Kaydet
                        </button>
                    </div>
                </div>

                <!-- Tüm Kayıtlı Sorular Kütüğü & Filtre Çubuğu -->
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <h4 style="margin:0; font-size:13.5px; color:var(--text-main); font-weight:800;">
                            <i class="fas fa-archive me-1"></i> Hata Ameliyathanesi Arşivi (${filteredHatalar.length} Soru)
                        </h4>
                        <!-- Filtre Butonları -->
                        <div style="display:flex; gap:5px; flex-wrap:wrap;">
                            <button class="btn btn-sm ${activeHataFilter === 'all' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('all')" style="font-size:11px; padding:4px 10px;">Hepsi (${hatalar.length})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'due' ? 'btn-danger' : 'btn-clear'}" onclick="filterYksHataDefteri('due')" style="font-size:11px; padding:4px 10px;">Bekleyenler (${dueCount})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'A' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('A')" style="font-size:11px; padding:4px 10px;">Kod A (${countA})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'B' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('B')" style="font-size:11px; padding:4px 10px;">Kod B (${countB})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'C' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('C')" style="font-size:11px; padding:4px 10px;">Kod C (${countC})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'D' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('D')" style="font-size:11px; padding:4px 10px;">Kod D (${countD})</button>
                            <button class="btn btn-sm ${activeHataFilter === 'completed' ? 'btn-success' : 'btn-clear'}" onclick="filterYksHataDefteri('completed')" style="font-size:11px; padding:4px 10px;">Tamamlanan (${completedCount})</button>
                        </div>
                    </div>

                    <div style="overflow-x:auto;">
                        <table class="custom-table" style="width:100%; font-size:12px; margin:0;">
                            <thead>
                                <tr style="background:var(--tab-bg);">
                                    <th style="width:35px; text-align:center;">#</th>
                                    <th>Ders &amp; Oturum</th>
                                    <th>Konu / Kazanım</th>
                                    <th style="width:80px; text-align:center;">Kök Neden</th>
                                    <th>Kavram Yanılgısı &amp; Bilişsel Nüans</th>
                                    <th style="width:110px; text-align:center;">Tekrar Durumu</th>
                                    <th style="width:130px; text-align:center;">Mühürler</th>
                                    <th style="width:45px; text-align:center;">Sil</th>
                                </tr>
                            </thead>
                            <tbody>${allRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function selectYksHataKokNeden(code) {
        activeSelectedKokNeden = code;
        document.querySelectorAll('.yks-kok-btn').forEach(b => {
            const isMatch = b.getAttribute('data-kok') === code;
            if (isMatch) {
                b.style.border = '2px solid #ef4444';
                b.style.background = 'rgba(239,68,68,0.18)';
                b.style.color = '#ef4444';
            } else {
                b.style.border = '1px solid var(--border)';
                b.style.background = 'transparent';
                b.style.color = 'var(--text-muted)';
            }
        });
    }

    function filterYksHataDefteri(f) {
        activeHataFilter = f;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (item) renderYksDetailHataDefteri(item);
    }

    function saveNewYksHata() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const oturum = document.getElementById('yks-err-oturum')?.value || 'TYT';
        const ders = document.getElementById('yks-err-ders')?.value.trim() || 'Genel';
        const konu = document.getElementById('yks-err-konu')?.value.trim();
        const duzey = parseInt(document.getElementById('yks-err-duzey')?.value || '3', 10);
        const kavramYanilgisi = document.getElementById('yks-err-yanilgi')?.value.trim() || '';
        const soruNotu = document.getElementById('yks-err-not')?.value.trim();

        if (!konu || !soruNotu) {
            alert('Lütfen sorunun ait olduğu konuyu ve doğru bilişsel kuralı yazınız.');
            return;
        }

        const newHata = {
            id: 'hata_' + Date.now(),
            oturum,
            ders,
            konu,
            duzey,
            kokNeden: activeSelectedKokNeden || 'A',
            kavramYanilgisi,
            soruNotu,
            kayitTarihi: new Date().toISOString(),
            tekrar1: false,
            tekrar3: false,
            tekrar7: false,
            tekrar21: false
        };

        if (!Array.isArray(item.hataDefteri)) item.hataDefteri = [];
        item.hataDefteri.unshift(newHata);

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Soru ameliyathanesi kaydı başarıyla eklendi.', 'success');
        }

        window.activeYksHataSubSegment = 'yeni-hata-ameliyat';
        renderYksDetailHataDefteri(item);
        renderYksKoclukModule();
    }

    function toggleYksHataTekrar(hataIndex, cycleDay) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item || !Array.isArray(item.hataDefteri) || !item.hataDefteri[hataIndex]) return;

        const h = item.hataDefteri[hataIndex];
        if (cycleDay === 1) h.tekrar1 = !h.tekrar1;
        else if (cycleDay === 3) h.tekrar3 = !h.tekrar3;
        else if (cycleDay === 7) h.tekrar7 = !h.tekrar7;
        else if (cycleDay === 21) h.tekrar21 = !h.tekrar21;

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`${cycleDay}. gün tekrar mühürü güncellendi.`, 'success');
        }

        renderYksDetailHataDefteri(item);
        renderYksKoclukModule();
    }

    function deleteYksHata(index) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item || !Array.isArray(item.hataDefteri)) return;
        if (!confirm('Bu soruyu hata ameliyathanesinden silmek istediğinize emin misiniz?')) return;
        item.hataDefteri.splice(index, 1);
        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Soru kaydı silindi.', 'warning');
        }
        renderYksDetailHataDefteri(item);
        renderYksKoclukModule();
    }


    function showAddYksHataBox() {
        switchYksHataSubSegment('yeni-hata-ameliyat');
        const box = document.getElementById('yks-err-oturum');
        if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // --- Sub-Tab 4: MEB Müfredatı Mikro-Kazanım Isı Haritası (Heatmap) ---

    function getActiveYksStudent() {
        const curId = activeYksKoclukId || window.activeYksKoclukId;
        return (window.yksKoclukData || []).find(k => String(k.id) === String(curId)) || null;
    }

    function getYksKazanimKey(grade, subj, top) {
        return `${grade}___${subj}___${top}`;
    }

    function getYksKazanimData(item, grade, subj, top) {
        if (!item || !item.kazanimIsiHaritasi) return null;
        const key = getYksKazanimKey(grade, subj, top);
        if (item.kazanimIsiHaritasi[key]) return item.kazanimIsiHaritasi[key];
        const fallbackKey = `${subj}___${top}`;
        if (item.kazanimIsiHaritasi[fallbackKey]) return item.kazanimIsiHaritasi[fallbackKey];
        return null;
    }

    function getEffectiveYksKazanimStatus(item, grade, subj, top, hatalar) {
        const entry = getYksKazanimData(item, grade, subj, top);
        if (entry && entry.durum) {
            return {
                status: entry.durum,
                isManual: true,
                entry: entry,
                errorCount: 0
            };
        }
        const subClean = String(subj || '').toLowerCase();
        const topClean = String(top || '').toLowerCase();
        const errorCount = (hatalar || []).filter(h => {
            const hDers = String(h.ders || '').toLowerCase();
            const hKonu = String(h.konu || '').toLowerCase();
            return (hDers.includes(subClean) || subClean.includes(hDers)) &&
                   (hKonu.includes(topClean) || topClean.includes(hKonu));
        }).length;

        let status = 'gray';
        if (errorCount >= 2) {
            status = 'red';
        } else if (errorCount === 1) {
            status = 'yellow';
        }
        return {
            status: status,
            isManual: false,
            entry: null,
            errorCount: errorCount
        };
    }

    function renderYksDetailHeatmap(item) {
        const c = document.getElementById('tab-yks-isi-haritasi');
        if (!c) return;
        if (!item) {
            item = getActiveYksStudent();
            if (!item) return;
        } else if (item.id) {
            activeYksKoclukId = item.id;
            window.activeYksKoclukId = item.id;
        }

        item.kazanimIsiHaritasi = item.kazanimIsiHaritasi || {};
        const curr = window.curriculumData || {};
        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const defaultGrade = (seviye === 9) ? '9. Sınıf' : (seviye === 10) ? '10. Sınıf' : (seviye === 11) ? '11. Sınıf' : '12. Sınıf';
        window.activeYksHeatGrade = window.activeYksHeatGrade || defaultGrade;
        const activeGrade = window.activeYksHeatGrade;
        const targetGradeCurriculum = curr[activeGrade] || {};
        const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];

        // KPI istatistiklerini hesapla
        let totalTopics = 0;
        let greenCount = 0;
        let yellowCount = 0;
        let redCount = 0;
        let grayCount = 0;

        const subjects = Object.keys(targetGradeCurriculum);
        subjects.forEach(sub => {
            const units = targetGradeCurriculum[sub] || {};
            Object.keys(units).forEach(uName => {
                const topics = Array.isArray(units[uName].Konular) ? units[uName].Konular : [];
                topics.forEach(top => {
                    totalTopics++;
                    const st = getEffectiveYksKazanimStatus(item, activeGrade, sub, top, hatalar);
                    if (st.status === 'green') greenCount++;
                    else if (st.status === 'yellow') yellowCount++;
                    else if (st.status === 'red') redCount++;
                    else grayCount++;
                });
            });
        });

        // Müfredat dışında elle girilmiş özel konular varsa onları da ekle
        Object.keys(item.kazanimIsiHaritasi).forEach(k => {
            if (k.startsWith(`${activeGrade}___`)) {
                const parts = k.split('___');
                const sub = parts[1];
                const top = parts[2];
                let exists = false;
                if (targetGradeCurriculum[sub]) {
                    Object.keys(targetGradeCurriculum[sub]).forEach(u => {
                        const tops = targetGradeCurriculum[sub][u].Konular || [];
                        if (tops.includes(top)) exists = true;
                    });
                }
                if (!exists) {
                    totalTopics++;
                    const st = item.kazanimIsiHaritasi[k].durum;
                    if (st === 'green') greenCount++;
                    else if (st === 'yellow') yellowCount++;
                    else if (st === 'red') redCount++;
                    else grayCount++;
                }
            }
        });

        const greenPct = totalTopics > 0 ? Math.round((greenCount / totalTopics) * 100) : 0;
        const yellowPct = totalTopics > 0 ? Math.round((yellowCount / totalTopics) * 100) : 0;
        const redPct = totalTopics > 0 ? Math.round((redCount / totalTopics) * 100) : 0;
        const grayPct = totalTopics > 0 ? Math.max(0, 100 - greenPct - yellowPct - redPct) : 0;

        let html = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:12px; padding:16px; margin-bottom:16px;">
                <!-- Üst Başlık & Eylemler -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h4 style="margin:0; color:#0284c7; display:flex; align-items:center; gap:8px; font-size:16px; font-weight:800;">
                            <i class="fas fa-th-large"></i> MEB Mikro-Kazanım Isı Haritası & Teşhis Masası
                        </h4>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                            Bilişsel hakimiyet, soru çözümleri ve hata defteri entegrasyonlu klinik mikro-kazanım röntgeni.
                        </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                        <button type="button" class="btn btn-primary" onclick="toggleYksHeatDrawer(true)" style="font-size:12px; padding:7px 14px; font-weight:700; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                            <i class="fas fa-plus-circle"></i> Yeni Teşhis / Kazanım Gir
                        </button>
                        <button type="button" class="btn btn-outline-secondary" onclick="printYksHeatmapReport()" style="font-size:12px; padding:7px 12px; font-weight:700; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
                            <i class="fas fa-print"></i> Rapor Al
                        </button>
                    </div>
                </div>

                <!-- Kademe / Sınıf Seçim Çubuğu -->
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px; overflow-x:auto; padding-bottom:4px;" class="yks-heat-grade-pills">
                    <span style="font-size:11.5px; font-weight:800; color:var(--text-muted); white-space:nowrap; margin-right:4px;">
                        <i class="fas fa-graduation-cap"></i> KADEME:
                    </span>
                    <button type="button" class="btn btn-sm ${activeGrade === '9. Sınıf' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="switchYksHeatGrade('9. Sınıf')" style="font-size:11.5px; font-weight:700; border-radius:20px; padding:4px 12px;">9. Sınıf (TYT)</button>
                    <button type="button" class="btn btn-sm ${activeGrade === '10. Sınıf' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="switchYksHeatGrade('10. Sınıf')" style="font-size:11.5px; font-weight:700; border-radius:20px; padding:4px 12px;">10. Sınıf (TYT)</button>
                    <button type="button" class="btn btn-sm ${activeGrade === '11. Sınıf' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="switchYksHeatGrade('11. Sınıf')" style="font-size:11.5px; font-weight:700; border-radius:20px; padding:4px 12px;">11. Sınıf (AYT)</button>
                    <button type="button" class="btn btn-sm ${activeGrade === '12. Sınıf' ? 'btn-primary' : 'btn-outline-secondary'}" onclick="switchYksHeatGrade('12. Sınıf')" style="font-size:11.5px; font-weight:700; border-radius:20px; padding:4px 12px;">12. Sınıf (AYT)</button>
                </div>

                <!-- KPI Bilişsel Röntgen Kartları -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px; margin-bottom:12px;">
                    <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:10px; text-align:center;">
                        <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Toplam Konu</div>
                        <div style="font-size:18px; font-weight:800; color:var(--text-main); margin-top:2px;">${totalTopics}</div>
                    </div>
                    <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:10px; text-align:center; cursor:pointer;" onclick="setYksHeatStatusFilter('green')">
                        <div style="font-size:10px; font-weight:700; color:#059669; text-transform:uppercase;">🟢 Otonomi</div>
                        <div style="font-size:18px; font-weight:800; color:#059669; margin-top:2px;">${greenCount} <span style="font-size:11px; font-weight:600;">(%${greenPct})</span></div>
                    </div>
                    <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:10px; text-align:center; cursor:pointer;" onclick="setYksHeatStatusFilter('yellow')">
                        <div style="font-size:10px; font-weight:700; color:#d97706; text-transform:uppercase;">🟡 Konsolidasyon</div>
                        <div style="font-size:18px; font-weight:800; color:#d97706; margin-top:2px;">${yellowCount}</div>
                    </div>
                    <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:10px; text-align:center; cursor:pointer;" onclick="setYksHeatStatusFilter('red')">
                        <div style="font-size:10px; font-weight:700; color:#dc2626; text-transform:uppercase;">🔴 Cerrahi Eksik</div>
                        <div style="font-size:18px; font-weight:800; color:#dc2626; margin-top:2px;">${redCount}</div>
                    </div>
                    <div style="background:var(--input-bg); border:1px dashed var(--border); border-radius:8px; padding:10px; text-align:center; cursor:pointer;" onclick="setYksHeatStatusFilter('gray')">
                        <div style="font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">⚪ Başlanmadı</div>
                        <div style="font-size:18px; font-weight:800; color:var(--text-muted); margin-top:2px;">${grayCount}</div>
                    </div>
                </div>

                <!-- İlerleme Çubuğu -->
                <div style="margin-bottom:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; margin-bottom:4px;">
                        <span>Müfredat Hakimiyet Oranı</span>
                        <span style="color:#059669;">%${greenPct} Bilişsel Otonomi</span>
                    </div>
                    <div style="height:8px; background:rgba(148,163,184,0.2); border-radius:4px; overflow:hidden; display:flex;">
                        <div style="width:${greenPct}%; background:#10b981;" title="🟢 Otonomi: %${greenPct}"></div>
                        <div style="width:${yellowPct}%; background:#f59e0b;" title="🟡 Konsolidasyon: %${yellowPct}"></div>
                        <div style="width:${redPct}%; background:#ef4444;" title="🔴 Cerrahi: %${redPct}"></div>
                    </div>
                </div>

                <!-- ➕ Hızlı Teşhis ve Soru Giriş Çekmecesi (Drawer) -->
                <div id="yks-heat-entry-drawer" style="display:none; background:var(--input-bg); border:2px solid #0284c7; border-radius:10px; padding:16px; margin-bottom:18px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--border); padding-bottom:8px;">
                        <h5 id="yks-heat-drawer-title" style="margin:0; color:#0284c7; font-weight:800; font-size:14px; display:flex; align-items:center; gap:6px;">
                            <i class="fas fa-stethoscope"></i> Mikro-Kazanım Teşhis & Soru Giriş Masası
                        </h5>
                        <button type="button" onclick="toggleYksHeatDrawer(false)" style="background:none; border:none; font-size:16px; color:var(--text-muted); cursor:pointer;">&times;</button>
                    </div>

                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:3px; display:block;">Kademe</label>
                            <select id="yks-heat-in-grade" class="form-control" style="font-size:12px; padding:6px 8px; border-radius:6px;" onchange="onYksHeatDrawerGradeChange()">
                                <option value="9. Sınıf" ${activeGrade === '9. Sınıf' ? 'selected' : ''}>9. Sınıf (TYT)</option>
                                <option value="10. Sınıf" ${activeGrade === '10. Sınıf' ? 'selected' : ''}>10. Sınıf (TYT)</option>
                                <option value="11. Sınıf" ${activeGrade === '11. Sınıf' ? 'selected' : ''}>11. Sınıf (AYT)</option>
                                <option value="12. Sınıf" ${activeGrade === '12. Sınıf' ? 'selected' : ''}>12. Sınıf (AYT)</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:3px; display:block;">Ders</label>
                            <select id="yks-heat-in-subj" class="form-control" style="font-size:12px; padding:6px 8px; border-radius:6px;" onchange="onYksHeatDrawerSubjChange()"></select>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:3px; display:block;">Ünite / Tema</label>
                            <select id="yks-heat-in-unite" class="form-control" style="font-size:12px; padding:6px 8px; border-radius:6px;" onchange="onYksHeatDrawerUniteChange()"></select>
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">
                                <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin:0;">Konu / Mikro-Kazanım</label>
                                <a href="javascript:void(0)" onclick="toggleYksHeatCustomTopic()" id="yks-heat-toggle-custom-btn" style="font-size:10.5px; color:#0284c7; text-decoration:none; font-weight:700;">+ Özel Konu</a>
                            </div>
                            <select id="yks-heat-in-top-select" class="form-control" style="font-size:12px; padding:6px 8px; border-radius:6px;" onchange="onYksHeatDrawerTopSelectChange()"></select>
                            <input type="text" id="yks-heat-in-top-custom" class="form-control" placeholder="Özel konu adı yazın..." style="display:none; font-size:12px; padding:6px 8px; border-radius:6px; margin-top:4px;" onfocus="yksAutoScrollOnFocus(this)">
                        </div>
                    </div>

                    <!-- Durum Seçimi & Soru Girişleri -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:12px; background:var(--card-bg); border:1px solid var(--border); border-radius:8px; padding:10px;">
                        <div>
                            <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:6px; display:block;">Bilişsel Durum (Teşhis)</label>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                                <button type="button" id="yks-heat-status-btn-green" class="btn btn-sm" onclick="selectYksHeatDrawerStatus('green')" style="font-size:11px; font-weight:700; border-radius:6px; text-align:left; padding:6px 10px; border:1px solid #10b981; background:rgba(16,185,129,0.1); color:#059669;">
                                    🟢 Bilişsel Otonomi
                                </button>
                                <button type="button" id="yks-heat-status-btn-yellow" class="btn btn-sm" onclick="selectYksHeatDrawerStatus('yellow')" style="font-size:11px; font-weight:700; border-radius:6px; text-align:left; padding:6px 10px; border:1px solid #f59e0b; background:rgba(245,158,11,0.1); color:#d97706;">
                                    🟡 Konsolidasyon
                                </button>
                                <button type="button" id="yks-heat-status-btn-red" class="btn btn-sm" onclick="selectYksHeatDrawerStatus('red')" style="font-size:11px; font-weight:700; border-radius:6px; text-align:left; padding:6px 10px; border:1px solid #ef4444; background:rgba(239,68,68,0.1); color:#dc2626;">
                                    🔴 Cerrahi Müdahale
                                </button>
                                <button type="button" id="yks-heat-status-btn-gray" class="btn btn-sm" onclick="selectYksHeatDrawerStatus('gray')" style="font-size:11px; font-weight:700; border-radius:6px; text-align:left; padding:6px 10px; border:1px solid var(--border); background:var(--input-bg); color:var(--text-muted);">
                                    ⚪ Başlanmadı / Nötr
                                </button>
                            </div>
                            <input type="hidden" id="yks-heat-in-status" value="green">
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin:0;">Soru Çözüm Verisi (Opsiyonel)</label>
                                <span id="yks-heat-in-net-display" style="font-size:11px; font-weight:800; color:#0284c7;">Net: 0.00 | Başarı: %0</span>
                            </div>
                            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
                                <div>
                                    <input type="number" id="yks-heat-in-soru" class="form-control" placeholder="Çözülen" min="0" style="font-size:11.5px; padding:6px; border-radius:6px;" oninput="calcYksHeatDrawerNet()" onfocus="yksAutoScrollOnFocus(this)">
                                </div>
                                <div>
                                    <input type="number" id="yks-heat-in-dogru" class="form-control" placeholder="Doğru" min="0" style="font-size:11.5px; padding:6px; border-radius:6px;" oninput="calcYksHeatDrawerNet()" onfocus="yksAutoScrollOnFocus(this)">
                                </div>
                                <div>
                                    <input type="number" id="yks-heat-in-yanlis" class="form-control" placeholder="Yanlış" min="0" style="font-size:11.5px; padding:6px; border-radius:6px;" oninput="calcYksHeatDrawerNet()" onfocus="yksAutoScrollOnFocus(this)">
                                </div>
                            </div>
                            <div style="margin-top:6px;">
                                <input type="date" id="yks-heat-in-date" class="form-control" style="font-size:11px; padding:4px 8px; border-radius:6px;" onfocus="yksAutoScrollOnFocus(this)">
                            </div>
                        </div>
                    </div>

                    <!-- Mentor & Klinik Teşhis Notu -->
                    <div style="margin-bottom:12px;">
                        <label style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:3px; display:block;">Mentor & Klinik Teşhis Notu (Kavram Yanılgısı / Nüanslar)</label>
                        <textarea id="yks-heat-in-note" class="form-control" rows="2" placeholder="Örn: Fonksiyon bileşkesinde tanım kümesi ihmal ediliyor. Parabol tepe noktası simetri ekseniyle pekiştirilecek..." style="font-size:11.5px; padding:8px; border-radius:6px;" onfocus="yksAutoScrollOnFocus(this)"></textarea>
                    </div>

                    <!-- Eylem Butonları -->
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                        <button type="button" id="yks-heat-btn-reset" class="btn btn-outline-danger" onclick="resetYksKazanimStatus()" style="display:none; font-size:11.5px; font-weight:700; padding:6px 14px; border-radius:6px;">
                            <i class="fas fa-trash-alt"></i> Teşhisi Sıfırla
                        </button>
                        <div style="display:flex; gap:8px; margin-left:auto;">
                            <button type="button" class="btn btn-secondary" onclick="toggleYksHeatDrawer(false)" style="font-size:11.5px; font-weight:700; padding:6px 14px; border-radius:6px;">
                                Vazgeç
                            </button>
                            <button type="button" class="btn btn-primary" onclick="saveYksKazanimStatus()" style="font-size:11.5px; font-weight:700; padding:6px 18px; border-radius:6px; background:#0284c7; border-color:#0284c7;">
                                <i class="fas fa-save me-1"></i> Teşhisi Kaydet
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Filtreleme & Canlı Arama Çubuğu -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px; background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:8px 12px;">
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                        <select id="yks-heat-filter-subj" class="form-control" style="font-size:11.5px; padding:4px 8px; border-radius:6px; min-width:140px;" onchange="filterYksHeatmap()">
                            <option value="all">Tüm Dersler (${subjects.length})</option>
                            ${subjects.map(s => `<option value="${escapeFn(s)}">${escapeFn(s)}</option>`).join('')}
                        </select>

                        <div style="gap:4px; font-size:11px; display:flex;" class="yks-heat-status-filters">
                            <button type="button" class="btn btn-sm yks-heat-filter-pill active" data-status="all" onclick="setYksHeatStatusFilter('all')" style="font-size:11px; padding:3px 8px; border-radius:14px;">Tümü</button>
                            <button type="button" class="btn btn-sm yks-heat-filter-pill" data-status="red" onclick="setYksHeatStatusFilter('red')" style="font-size:11px; padding:3px 8px; border-radius:14px; color:#dc2626;">🔴 Cerrahi</button>
                            <button type="button" class="btn btn-sm yks-heat-filter-pill" data-status="yellow" onclick="setYksHeatStatusFilter('yellow')" style="font-size:11px; padding:3px 8px; border-radius:14px; color:#d97706;">🟡 Tekrar</button>
                            <button type="button" class="btn btn-sm yks-heat-filter-pill" data-status="green" onclick="setYksHeatStatusFilter('green')" style="font-size:11px; padding:3px 8px; border-radius:14px; color:#059669;">🟢 Otonomi</button>
                            <button type="button" class="btn btn-sm yks-heat-filter-pill" data-status="gray" onclick="setYksHeatStatusFilter('gray')" style="font-size:11px; padding:3px 8px; border-radius:14px; color:var(--text-muted);">⚪ Başlanmadı</button>
                        </div>
                    </div>

                    <div style="display:flex; align-items:center; gap:6px;">
                        <input type="text" id="yks-heat-search-input" class="form-control" placeholder="🔎 Konu veya ünite ara..." style="font-size:11.5px; padding:4px 10px; border-radius:6px; width:180px;" oninput="filterYksHeatmap()" onfocus="yksAutoScrollOnFocus(this)">
                        <span id="yks-heat-visible-count" style="font-size:11px; font-weight:700; color:var(--text-muted); white-space:nowrap;">${totalTopics} Konu</span>
                    </div>
                </div>
        `;

        if (subjects.length === 0) {
            html += `<p style="color:var(--text-muted); font-size:12px; padding:20px 0; text-align:center;">Bu kademeye ait MEB müfredat verisi bulunamadı.</p></div>`;
            c.innerHTML = html;
            return;
        }

        // Subject Blocks ve Topic Cards Üretimi
        subjects.forEach(sub => {
            const units = targetGradeCurriculum[sub] || {};
            let subTopicCardsHtml = '';
            let subTotal = 0;
            let subGreen = 0;
            let subYellow = 0;
            let subRed = 0;
            let subGray = 0;

            Object.keys(units).forEach(uName => {
                const u = units[uName];
                const topics = Array.isArray(u.Konular) ? u.Konular : [];

                topics.forEach(top => {
                    subTotal++;
                    const st = getEffectiveYksKazanimStatus(item, activeGrade, sub, top, hatalar);
                    const currentStatus = st.status;
                    const key = getYksKazanimKey(activeGrade, sub, top);

                    if (currentStatus === 'green') subGreen++;
                    else if (currentStatus === 'yellow') subYellow++;
                    else if (currentStatus === 'red') subRed++;
                    else subGray++;

                    let cardBg = 'var(--input-bg)';
                    let cardBorder = 'var(--border)';
                    let badgeLabel = '⚪ Başlanmadı';
                    let badgeStyle = 'background:rgba(148,163,184,0.18); color:var(--text-muted); border:1px dashed var(--border);';

                    if (currentStatus === 'green') {
                        cardBg = 'rgba(16, 185, 129, 0.06)';
                        cardBorder = 'rgba(16, 185, 129, 0.35)';
                        badgeLabel = '🟢 Bilişsel Otonomi';
                        badgeStyle = 'background:#059669; color:#fff; border:none;';
                    } else if (currentStatus === 'yellow') {
                        cardBg = 'rgba(245, 158, 11, 0.06)';
                        cardBorder = 'rgba(245, 158, 11, 0.35)';
                        badgeLabel = st.errorCount > 0 ? `🟡 Konsolidasyon (${st.errorCount} Hata)` : '🟡 Konsolidasyon';
                        badgeStyle = 'background:#d97706; color:#fff; border:none;';
                    } else if (currentStatus === 'red') {
                        cardBg = 'rgba(239, 68, 68, 0.08)';
                        cardBorder = 'rgba(239, 68, 68, 0.4)';
                        badgeLabel = st.errorCount > 0 ? `🔴 Cerrahi (${st.errorCount} Hata)` : '🔴 Cerrahi Müdahale';
                        badgeStyle = 'background:#dc2626; color:#fff; border:none;';
                    }

                    const entry = st.entry;
                    const hasQuestions = entry && Number(entry.soruSayisi) > 0;
                    const hasNote = entry && entry.mentorNotu && entry.mentorNotu.trim();

                    subTopicCardsHtml += `
                        <div class="yks-heat-card"
                             data-subj="${escapeFn(sub)}"
                             data-top="${escapeFn(top)}"
                             data-unite="${escapeFn(uName)}"
                             data-status="${currentStatus}"
                             data-search="${escapeFn(top.toLowerCase())} ${escapeFn(uName.toLowerCase())} ${escapeFn(sub.toLowerCase())}"
                             style="background:${cardBg}; border:1px solid ${cardBorder}; border-radius:8px; padding:10px; font-size:11.5px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.2s;">
                            
                            <div>
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px; gap:4px;">
                                    <span style="font-size:9.5px; color:var(--text-muted); font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeFn(uName)}">
                                        <i class="fas fa-layer-group"></i> ${escapeFn(uName.split(':')[0])}
                                    </span>
                                    <span style="font-size:9px; color:var(--text-muted);">${entry?.tarih ? entry.tarih.slice(5) : ''}</span>
                                </div>
                                <div style="font-weight:700; color:var(--text-main); line-height:1.3; margin-bottom:6px;">
                                    ${escapeFn(top)}
                                </div>
                            </div>

                            <div>
                                ${hasQuestions ? `
                                    <div style="font-size:10px; color:#0284c7; font-weight:700; margin-bottom:4px; background:rgba(2,132,199,0.08); padding:2px 6px; border-radius:4px; display:inline-block;">
                                        <i class="fas fa-pencil-alt"></i> ${entry.soruSayisi} Soru (%${entry.basariYuzdesi || Math.round((entry.dogruSayisi / entry.soruSayisi) * 100)} D)
                                    </div>
                                ` : ''}

                                ${hasNote ? `
                                    <div style="font-size:10px; color:var(--text-muted); font-style:italic; margin-bottom:6px; background:var(--card-bg); padding:3px 6px; border-radius:4px; border-left:2px solid #0284c7; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${escapeFn(entry.mentorNotu)}">
                                        <i class="fas fa-comment-dots" style="color:#0284c7;"></i> ${escapeFn(entry.mentorNotu)}
                                    </div>
                                ` : ''}

                                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px; gap:4px;">
                                    <button type="button" class="btn btn-sm yks-kazanim-cycle-btn"
                                            data-key="${encodeURIComponent(key)}"
                                            onclick="cycleYksKazanimStatusByKey(this.getAttribute('data-key'))"
                                            title="Tıkla: Durumu Değiştir (⚪ ➔ 🟢 ➔ 🟡 ➔ 🔴)"
                                            style="${badgeStyle}; font-size:10px; font-weight:800; padding:3px 8px; border-radius:6px; cursor:pointer;">
                                        ${badgeLabel}
                                    </button>

                                    <button type="button" class="btn btn-sm btn-outline-secondary"
                                            data-grade="${escapeFn(activeGrade)}"
                                            data-subj="${escapeFn(sub)}"
                                            data-unite="${escapeFn(uName)}"
                                            data-top="${escapeFn(top)}"
                                            onclick="openYksKazanimEditModal(this)"
                                            title="Detaylı Teşhis ve Soru Sayısı Düzenle"
                                            style="font-size:10.5px; padding:2px 6px; border-radius:5px; border-color:var(--border);">
                                        <i class="fas fa-pen"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            });

            html += `
                <div class="yks-heat-subject-block" data-subj="${escapeFn(sub)}" style="margin-bottom:14px; border:1px solid var(--border); border-radius:10px; padding:12px; background:var(--card-bg);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                        <div style="font-weight:800; font-size:13.5px; color:var(--text-main); display:flex; align-items:center; gap:6px;">
                            <i class="fas fa-book-open" style="color:#0284c7;"></i> ${escapeFn(sub)}
                            <span style="font-size:11px; font-weight:600; color:var(--text-muted);">(${subTotal} Konu)</span>
                        </div>
                        <div style="display:flex; gap:6px; font-size:10.5px; font-weight:700;">
                            <span style="color:#059669;"><i class="fas fa-check-circle"></i> ${subGreen} Otonomi</span>
                            <span style="color:#d97706;">• ${subYellow} Tekrar</span>
                            <span style="color:#dc2626;">• ${subRed} Cerrahi</span>
                            <span style="color:var(--text-muted);">• ${subGray} Başlanmadı</span>
                        </div>
                    </div>
                    <div class="yks-heat-cards-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(230px, 1fr)); gap:10px;">
                        ${subTopicCardsHtml}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        c.innerHTML = html;

        // Aktif filtreleri koru
        if (window.activeYksHeatSubjFilter && window.activeYksHeatSubjFilter !== 'all') {
            const fSub = document.getElementById('yks-heat-filter-subj');
            if (fSub) fSub.value = window.activeYksHeatSubjFilter;
        }
        if (window.activeYksHeatStatusFilter) {
            setYksHeatStatusFilter(window.activeYksHeatStatusFilter, false);
        }
    }

    function toggleYksHeatDrawer(forceOpen, prefillData) {
        const drawer = document.getElementById('yks-heat-entry-drawer');
        if (!drawer) return;

        const willOpen = (typeof forceOpen === 'boolean') ? forceOpen : (drawer.style.display === 'none');
        drawer.style.display = willOpen ? 'block' : 'none';

        if (willOpen) {
            const item = getActiveYksStudent();
            const gradeEl = document.getElementById('yks-heat-in-grade');
            const targetGrade = prefillData?.grade || window.activeYksHeatGrade || (gradeEl ? gradeEl.value : '12. Sınıf');

            if (gradeEl) gradeEl.value = targetGrade;
            onYksHeatDrawerGradeChange(prefillData?.subj, prefillData?.unite, prefillData?.top);

            const titleEl = document.getElementById('yks-heat-drawer-title');
            const resetBtn = document.getElementById('yks-heat-btn-reset');

            if (prefillData && prefillData.top) {
                if (titleEl) titleEl.innerHTML = `<i class="fas fa-edit"></i> Teşhis Düzenle: ${escapeFn(prefillData.top)}`;
                if (resetBtn) resetBtn.style.display = 'inline-block';

                const existing = getYksKazanimData(item, targetGrade, prefillData.subj, prefillData.top);
                selectYksHeatDrawerStatus(existing?.durum || 'green');

                const sEl = document.getElementById('yks-heat-in-soru');
                const dEl = document.getElementById('yks-heat-in-dogru');
                const yEl = document.getElementById('yks-heat-in-yanlis');
                const nEl = document.getElementById('yks-heat-in-note');
                const dtEl = document.getElementById('yks-heat-in-date');

                if (sEl) sEl.value = existing?.soruSayisi || '';
                if (dEl) dEl.value = existing?.dogruSayisi || '';
                if (yEl) yEl.value = existing?.yanlisSayisi || '';
                if (nEl) nEl.value = existing?.mentorNotu || '';
                if (dtEl) dtEl.value = existing?.tarih || new Date().toISOString().split('T')[0];

                calcYksHeatDrawerNet();
            } else {
                if (titleEl) titleEl.innerHTML = `<i class="fas fa-stethoscope"></i> Mikro-Kazanım Teşhis & Soru Giriş Masası`;
                if (resetBtn) resetBtn.style.display = 'none';
                selectYksHeatDrawerStatus('green');

                const sEl = document.getElementById('yks-heat-in-soru');
                const dEl = document.getElementById('yks-heat-in-dogru');
                const yEl = document.getElementById('yks-heat-in-yanlis');
                const nEl = document.getElementById('yks-heat-in-note');
                const dtEl = document.getElementById('yks-heat-in-date');

                if (sEl) sEl.value = '';
                if (dEl) dEl.value = '';
                if (yEl) yEl.value = '';
                if (nEl) nEl.value = '';
                if (dtEl) dtEl.value = new Date().toISOString().split('T')[0];

                calcYksHeatDrawerNet();
            }

            drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function onYksHeatDrawerGradeChange(targetSubj, targetUnite, targetTop) {
        const gradeEl = document.getElementById('yks-heat-in-grade');
        const subjEl = document.getElementById('yks-heat-in-subj');
        if (!gradeEl || !subjEl) return;

        const grade = gradeEl.value;
        const curr = window.curriculumData || {};
        const subjects = Object.keys(curr[grade] || {});

        subjEl.innerHTML = subjects.map(s => `<option value="${escapeFn(s)}">${escapeFn(s)}</option>`).join('');
        if (targetSubj && subjects.includes(targetSubj)) {
            subjEl.value = targetSubj;
        }

        onYksHeatDrawerSubjChange(targetUnite, targetTop);
    }

    function onYksHeatDrawerSubjChange(targetUnite, targetTop) {
        const gradeEl = document.getElementById('yks-heat-in-grade');
        const subjEl = document.getElementById('yks-heat-in-subj');
        const uniteEl = document.getElementById('yks-heat-in-unite');
        if (!gradeEl || !subjEl || !uniteEl) return;

        const grade = gradeEl.value;
        const subj = subjEl.value;
        const curr = window.curriculumData || {};
        const units = Object.keys(curr[grade]?.[subj] || {});

        uniteEl.innerHTML = units.map(u => `<option value="${escapeFn(u)}">${escapeFn(u)}</option>`).join('');
        if (targetUnite && units.includes(targetUnite)) {
            uniteEl.value = targetUnite;
        }

        onYksHeatDrawerUniteChange(targetTop);
    }

    function onYksHeatDrawerUniteChange(targetTop) {
        const gradeEl = document.getElementById('yks-heat-in-grade');
        const subjEl = document.getElementById('yks-heat-in-subj');
        const uniteEl = document.getElementById('yks-heat-in-unite');
        const topEl = document.getElementById('yks-heat-in-top-select');
        if (!gradeEl || !subjEl || !uniteEl || !topEl) return;

        const grade = gradeEl.value;
        const subj = subjEl.value;
        const unite = uniteEl.value;
        const curr = window.curriculumData || {};
        const topics = Array.isArray(curr[grade]?.[subj]?.[unite]?.Konular) ? curr[grade][subj][unite].Konular : [];

        topEl.innerHTML = topics.map(t => `<option value="${escapeFn(t)}">${escapeFn(t)}</option>`).join('');
        if (targetTop && topics.includes(targetTop)) {
            topEl.value = targetTop;
            const customInput = document.getElementById('yks-heat-in-top-custom');
            if (customInput) customInput.style.display = 'none';
            topEl.style.display = 'block';
        } else if (targetTop) {
            const customInput = document.getElementById('yks-heat-in-top-custom');
            if (customInput) {
                customInput.value = targetTop;
                customInput.style.display = 'block';
                topEl.style.display = 'none';
            }
        }
    }

    function toggleYksHeatCustomTopic(forceCustom) {
        const topSelect = document.getElementById('yks-heat-in-top-select');
        const topCustom = document.getElementById('yks-heat-in-top-custom');
        const btn = document.getElementById('yks-heat-toggle-custom-btn');
        if (!topSelect || !topCustom) return;

        const isCurrentlyCustom = (topCustom.style.display !== 'none');
        const makeCustom = (typeof forceCustom === 'boolean') ? forceCustom : !isCurrentlyCustom;

        if (makeCustom) {
            topSelect.style.display = 'none';
            topCustom.style.display = 'block';
            topCustom.focus();
            if (btn) btn.textContent = '📋 Listeden Seç';
        } else {
            topSelect.style.display = 'block';
            topCustom.style.display = 'none';
            if (btn) btn.textContent = '+ Özel Konu';
        }
    }

    function selectYksHeatDrawerStatus(status) {
        const inStatus = document.getElementById('yks-heat-in-status');
        if (inStatus) inStatus.value = status;

        ['green', 'yellow', 'red', 'gray'].forEach(s => {
            const btn = document.getElementById(`yks-heat-status-btn-${s}`);
            if (btn) {
                if (s === status) {
                    btn.style.boxShadow = '0 0 0 2px var(--text-main)';
                    btn.style.fontWeight = '900';
                } else {
                    btn.style.boxShadow = 'none';
                    btn.style.fontWeight = '700';
                }
            }
        });
    }

    function calcYksHeatDrawerNet() {
        const s = Number(document.getElementById('yks-heat-in-soru')?.value) || 0;
        const d = Number(document.getElementById('yks-heat-in-dogru')?.value) || 0;
        const y = Number(document.getElementById('yks-heat-in-yanlis')?.value) || 0;
        const netDisplay = document.getElementById('yks-heat-in-net-display');
        if (!netDisplay) return;

        const net = Math.max(0, +(d - (y * 0.25)).toFixed(2));
        const pct = s > 0 ? Math.round((d / s) * 100) : 0;
        netDisplay.textContent = `Net: ${net} | Başarı: %${pct}`;
    }

    function saveYksKazanimStatus() {
        const item = getActiveYksStudent();
        if (!item) {
            alert('Aktif öğrenci seçilmedi.');
            return;
        }

        const grade = document.getElementById('yks-heat-in-grade')?.value;
        const subj = document.getElementById('yks-heat-in-subj')?.value;
        const unite = document.getElementById('yks-heat-in-unite')?.value;
        const customInput = document.getElementById('yks-heat-in-top-custom');
        const selectTop = document.getElementById('yks-heat-in-top-select');
        const top = (customInput && customInput.style.display !== 'none' && customInput.value.trim())
            ? customInput.value.trim()
            : selectTop?.value;

        if (!grade || !subj || !top) {
            alert('Lütfen kademe, ders ve konu seçiniz.');
            return;
        }

        const durum = document.getElementById('yks-heat-in-status')?.value || 'green';
        const soruSayisi = Number(document.getElementById('yks-heat-in-soru')?.value) || 0;
        const dogruSayisi = Number(document.getElementById('yks-heat-in-dogru')?.value) || 0;
        const yanlisSayisi = Number(document.getElementById('yks-heat-in-yanlis')?.value) || 0;
        const mentorNotu = document.getElementById('yks-heat-in-note')?.value?.trim() || '';
        const tarih = document.getElementById('yks-heat-in-date')?.value || new Date().toISOString().split('T')[0];

        item.kazanimIsiHaritasi = item.kazanimIsiHaritasi || {};
        const key = getYksKazanimKey(grade, subj, top);

        item.kazanimIsiHaritasi[key] = {
            sinif: grade,
            ders: subj,
            unite: unite || '',
            konu: top,
            durum: durum,
            soruSayisi: soruSayisi,
            dogruSayisi: dogruSayisi,
            yanlisSayisi: yanlisSayisi,
            basariYuzdesi: soruSayisi > 0 ? Math.round((dogruSayisi / soruSayisi) * 100) : 0,
            mentorNotu: mentorNotu,
            tarih: tarih,
            kaynak: 'manual'
        };

        if (typeof saveData === 'function') saveData(true);

        const drawer = document.getElementById('yks-heat-entry-drawer');
        if (drawer) drawer.style.display = 'none';

        renderYksDetailHeatmap(item);

        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`"${top}" teşhis verisi başarıyla kaydedildi.`, 'success');
        } else {
            alert(`"${top}" teşhis verisi başarıyla kaydedildi.`);
        }
    }

    function resetYksKazanimStatus() {
        const item = getActiveYksStudent();
        if (!item || !item.kazanimIsiHaritasi) return;

        const grade = document.getElementById('yks-heat-in-grade')?.value;
        const subj = document.getElementById('yks-heat-in-subj')?.value;
        const customInput = document.getElementById('yks-heat-in-top-custom');
        const selectTop = document.getElementById('yks-heat-in-top-select');
        const top = (customInput && customInput.style.display !== 'none' && customInput.value.trim())
            ? customInput.value.trim()
            : selectTop?.value;

        if (!top) return;
        const key = getYksKazanimKey(grade, subj, top);
        const fallbackKey = `${subj}___${top}`;

        delete item.kazanimIsiHaritasi[key];
        delete item.kazanimIsiHaritasi[fallbackKey];

        if (typeof saveData === 'function') saveData(true);

        const drawer = document.getElementById('yks-heat-entry-drawer');
        if (drawer) drawer.style.display = 'none';

        renderYksDetailHeatmap(item);

        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`"${top}" teşhisi sıfırlandı.`, 'info');
        }
    }

    function cycleYksKazanimStatusByKey(encodedKey) {
        const key = decodeURIComponent(encodedKey);
        const item = getActiveYksStudent();
        if (!item) return;

        item.kazanimIsiHaritasi = item.kazanimIsiHaritasi || {};
        const parts = key.split('___');
        const grade = parts[0];
        const subj = parts[1];
        const top = parts[2];

        const st = getEffectiveYksKazanimStatus(item, grade, subj, top, item.hataDefteri || []);
        const currentStatus = st.status;

        // Döngü: gray -> green -> yellow -> red -> gray
        let nextStatus = 'green';
        if (currentStatus === 'gray') nextStatus = 'green';
        else if (currentStatus === 'green') nextStatus = 'yellow';
        else if (currentStatus === 'yellow') nextStatus = 'red';
        else if (currentStatus === 'red') nextStatus = 'gray';

        const existing = item.kazanimIsiHaritasi[key] || {};
        item.kazanimIsiHaritasi[key] = {
            ...existing,
            sinif: grade,
            ders: subj,
            konu: top,
            durum: nextStatus,
            tarih: new Date().toISOString().split('T')[0],
            kaynak: 'cycle'
        };

        if (typeof saveData === 'function') saveData(true);

        renderYksDetailHeatmap(item);

        const statusLabels = {
            green: '🟢 Bilişsel Otonomi',
            yellow: '🟡 Konsolidasyon',
            red: '🔴 Cerrahi Müdahale',
            gray: '⚪ Başlanmadı / Nötr'
        };

        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`"${top}": ${statusLabels[nextStatus]}`, 'success');
        }
    }

    function openYksKazanimEditModal(btn) {
        if (!btn) return;
        const grade = btn.getAttribute('data-grade');
        const subj = btn.getAttribute('data-subj');
        const unite = btn.getAttribute('data-unite');
        const top = btn.getAttribute('data-top');

        toggleYksHeatDrawer(true, {
            grade: grade,
            subj: subj,
            unite: unite,
            top: top
        });
    }

    function switchYksHeatGrade(gradeName) {
        window.activeYksHeatGrade = gradeName;
        const item = getActiveYksStudent();
        if (item) renderYksDetailHeatmap(item);
    }

    function setYksHeatStatusFilter(statusVal, doReFilter) {
        window.activeYksHeatStatusFilter = statusVal;
        document.querySelectorAll('.yks-heat-filter-pill').forEach(btn => {
            const isMatch = btn.getAttribute('data-status') === statusVal;
            btn.classList.toggle('active', isMatch);
            if (isMatch) {
                btn.style.background = '#0284c7';
                btn.style.color = '#fff';
            } else {
                btn.style.background = '';
                btn.style.color = '';
            }
        });

        if (doReFilter !== false) {
            filterYksHeatmap();
        }
    }

    function filterYksHeatmap() {
        const subjFilter = document.getElementById('yks-heat-filter-subj')?.value || 'all';
        const statusFilter = window.activeYksHeatStatusFilter || 'all';
        const searchInput = (document.getElementById('yks-heat-search-input')?.value || '').toLowerCase().trim();

        window.activeYksHeatSubjFilter = subjFilter;

        let visibleCount = 0;
        const cards = document.querySelectorAll('.yks-heat-card');

        cards.forEach(card => {
            const cardSubj = card.getAttribute('data-subj');
            const cardStatus = card.getAttribute('data-status');
            const cardSearch = card.getAttribute('data-search') || '';

            const matchSubj = (subjFilter === 'all' || cardSubj === subjFilter);
            const matchStatus = (statusFilter === 'all' || cardStatus === statusFilter);
            const matchSearch = (!searchInput || cardSearch.includes(searchInput));

            const isVisible = matchSubj && matchStatus && matchSearch;
            card.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
        });

        document.querySelectorAll('.yks-heat-subject-block').forEach(block => {
            const blockSubj = block.getAttribute('data-subj');
            const matchSubj = (subjFilter === 'all' || blockSubj === subjFilter);
            if (!matchSubj) {
                block.style.display = 'none';
            } else {
                const hasVisibleCard = Array.from(block.querySelectorAll('.yks-heat-card')).some(c => c.style.display !== 'none');
                block.style.display = hasVisibleCard ? 'block' : 'none';
            }
        });

        const countBadge = document.getElementById('yks-heat-visible-count');
        if (countBadge) {
            countBadge.textContent = `${visibleCount} Konu Gösteriliyor`;
        }
    }

    function printYksHeatmapReport() {
        const item = getActiveYksStudent();
        if (!item) {
            alert('Aktif öğrenci bulunamadı.');
            return;
        }

        const curr = window.curriculumData || {};
        const grade = window.activeYksHeatGrade || '12. Sınıf';
        const targetCurr = curr[grade] || {};
        const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];

        let rowsHtml = '';
        Object.keys(targetCurr).forEach(sub => {
            const units = targetCurr[sub] || {};
            Object.keys(units).forEach(uName => {
                const topics = units[uName].Konular || [];
                topics.forEach(top => {
                    const st = getEffectiveYksKazanimStatus(item, grade, sub, top, hatalar);
                    const statusText = (st.status === 'green') ? '🟢 Otonomi' : (st.status === 'yellow') ? '🟡 Konsolidasyon' : (st.status === 'red') ? '🔴 Cerrahi Müdahale' : '⚪ Başlanmadı';
                    const qData = st.entry?.soruSayisi ? `${st.entry.soruSayisi} Soru (%${st.entry.basariYuzdesi || 0} D)` : '-';
                    const note = st.entry?.mentorNotu || (st.errorCount > 0 ? `${st.errorCount} hata defteri kaydı` : '-');

                    rowsHtml += `
                        <tr>
                            <td><strong>${escapeFn(sub)}</strong></td>
                            <td>${escapeFn(uName.split(':')[0])}</td>
                            <td>${escapeFn(top)}</td>
                            <td style="font-weight:bold;">${statusText}</td>
                            <td>${qData}</td>
                            <td style="font-size:9px;">${escapeFn(note)}</td>
                        </tr>
                    `;
                });
            });
        });

        const printWin = window.open('', '_blank');
        if (!printWin) {
            alert('Lütfen açılır pencere (pop-up) engelleyicisini kapatınız.');
            return;
        }

        printWin.document.write(`
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>MEB Mikro-Kazanım Isı Haritası - ${escapeFn(item.adSoyad)}</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 10px; color: #1e293b; padding: 15px; }
                    h2 { margin: 0 0 4px 0; color: #0284c7; }
                    .header-box { border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; }
                    table { width: 100%; border-collapse: collapse; font-size: 9.5px; }
                    th, td { border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; }
                    th { background: #f1f5f9; font-weight: bold; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                <div class="header-box">
                    <div>
                        <h2>MEB ${escapeFn(grade)} Mikro-Kazanım Hakimiyet Matrisi</h2>
                        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif || '')} - ${escapeFn(item.alan || '')}) | <strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}</div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Ders</th>
                            <th>Ünite</th>
                            <th>Mikro-Kazanım / Konu</th>
                            <th>Bilişsel Durum</th>
                            <th>Soru İstatistiği</th>
                            <th>Mentor & Teşhis Notu</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
                <script>
                    window.onload = function() { window.print(); };
                </script>
            </body>
            </html>
        `);
        printWin.document.close();
    }

    // --- Sub-Tab 5: Soru Piramidi & Haftalık Soru Takip ---
    // ─────────────────────────────────────────────────────────────
    // SUB-TAB 5: SORU KALİTE PİRAMİDİ & KAİ İNDEKSİ
    // ─────────────────────────────────────────────────────────────

    function switchYksPiramitSubSegment(segmentId) {
        window.activeYksPiramitSubSegment = segmentId;
        document.querySelectorAll('.yks-piramit-seg-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-segment') === segmentId;
            btn.classList.toggle('active', isActive);
        });

        ['piramit-teshis', 'haftalik-giris'].forEach(seg => {
            const el = document.getElementById('yks-piramit-seg-' + seg);
            if (el) el.style.display = (seg === segmentId) ? 'block' : 'none';
        });
    }

    function renderYksDetailPiramit(item) {
        const c = document.getElementById('tab-yks-piramit');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const s = item.haftalikSoruSayisi || { duzey1: 100, duzey2: 200, duzey3: 350, duzey4: 150, toplam: 800 };
        const kai = calculateKai(s);
        const activeSeg = window.activeYksPiramitSubSegment || 'piramit-teshis';

        let targetInfoText = '';
        if (seviye === 9 || seviye === 10) {
            targetInfoText = '🌱 9-10. Sınıf Bilişsel Hedefi: Düzey 1 (%40) + Düzey 2 (%40) + Düzey 3 (%20). Temel kavram ve OYSS senaryoları pekiştirilmelidir.';
        } else if (seviye === 11) {
            targetInfoText = '⚡ 11. Sınıf Bilişsel Hedefi: Düzey 1 (%25) + Düzey 2 (%35) + Düzey 3 (%30) + Düzey 4 (%10). AYT omurgası ve yeni nesil analiz soruları ağırlıklı olmalıdır.';
        } else {
            targetInfoText = '🎯 12. Sınıf & Mezun Bilişsel Hedefi: Düzey 1 (%15) + Düzey 2 (%25) + Düzey 3 (%40) + Düzey 4 (%20). Konfor alanından çıkılmalı, Düzey 3-4 soruları çözülmelidir.';
        }

        const pD1 = kai.total ? Math.round(((s.duzey1 || 0) / kai.total) * 100) : 0;
        const pD2 = kai.total ? Math.round(((s.duzey2 || 0) / kai.total) * 100) : 0;
        const pD3 = kai.total ? Math.round(((s.duzey3 || 0) / kai.total) * 100) : 0;
        const pD4 = kai.total ? Math.round(((s.duzey4 || 0) / kai.total) * 100) : 0;

        c.innerHTML = `
            <!-- Sub-Segment Kontrolü (Piramit) -->
            <div class="yks-subsegment-nav">
                <button type="button" class="yks-segment-btn yks-piramit-seg-btn ${activeSeg === 'piramit-teshis' ? 'active' : ''}" data-segment="piramit-teshis" onclick="switchYksPiramitSubSegment('piramit-teshis')">
                    <i class="fas fa-layer-group"></i> 📊 Piramit Dağılımı &amp; KAİ Teşhisi
                </button>
                <button type="button" class="yks-segment-btn yks-piramit-seg-btn ${activeSeg === 'haftalik-giris' ? 'active' : ''}" data-segment="haftalik-giris" onclick="switchYksPiramitSubSegment('haftalik-giris')">
                    <i class="fas fa-edit"></i> ✏️ Haftalık Soru Girişi &amp; Güncelleme
                </button>
            </div>

            <!-- Segment 1: Piramit Dağılımı ve KAİ Teşhisi -->
            <div id="yks-piramit-seg-piramit-teshis" style="${activeSeg === 'piramit-teshis' ? 'display:block;' : 'display:none;'}">
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:16px;">
                    <!-- Sol Kart: KAİ Göstergesi & Alarm -->
                    <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                        <h4 style="margin:0 0 12px 0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-tachometer-alt"></i> Konfor Alanı İndeksi (KAİ™) &amp; Psödo-Çalışma Alarmı
                        </h4>
                        
                        <div style="background:${kai.badgeBg}; border:1.5px solid ${kai.badgeColor}; border-radius:8px; padding:14px; margin-bottom:14px; text-align:center;">
                            <div style="font-size:32px; font-weight:900; color:${kai.badgeColor};">KAİ: %${kai.kai}</div>
                            <div style="font-size:12.5px; font-weight:800; color:${kai.badgeColor}; margin-top:3px;">${escapeFn(kai.label)}</div>
                            <p style="margin:8px 0 0 0; font-size:11.5px; color:var(--text-muted); line-height:1.4;">
                                ${targetInfoText}
                            </p>
                        </div>

                        <!-- Psödo-Çalışma Eşikleri Açıklaması -->
                        <div style="background:var(--input-bg); border-radius:8px; padding:12px; font-size:11.5px; line-height:1.45;">
                            <div style="font-weight:700; color:var(--text-main); margin-bottom:6px;">Bilişsel Eşik Değerleri:</div>
                            <div style="color:#ef4444; margin-bottom:3px;">🔴 <strong>KAİ > %55:</strong> Psödo-Çalışma Tuzağı (Öğrenci bildiği soruları çözerek kendini kandırıyor).</div>
                            <div style="color:#f59e0b; margin-bottom:3px;">🟡 <strong>KAİ %45-55:</strong> Denge Eşiği (Orta seviye zorlanma).</div>
                            <div style="color:#059669; margin-bottom:3px;">🟢 <strong>KAİ %30-45:</strong> Bilişsel Gelişim Bölgesi (Optimal zorlanma ve nöral sıçrama).</div>
                            <div style="color:#7c3aed;">🟣 <strong>KAİ < %30:</strong> Aşırı Bilişsel Yük / Tükenmişlik Tehlikesi.</div>
                        </div>
                    </div>

                    <!-- Sağ Kart: Görsel Piramit Çubukları -->
                    <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                        <h4 style="margin:0 0 14px 0; color:#0284c7; display:flex; align-items:center; justify-content:space-between;">
                            <span><i class="fas fa-mountain me-2"></i> 4 Seviyeli Soru Piramidi</span>
                            <span style="font-size:12px; color:var(--text-muted); font-weight:normal;">Toplam: <strong>${kai.total} Soru</strong></span>
                        </h4>

                        <div style="display:flex; flex-direction:column; gap:12px; font-size:11.5px;">
                            <!-- Düzey 4 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px;">
                                    <span>🟣 [Düzey 4] Üst Bilişsel &amp; Eleme</span>
                                    <span style="color:#7c3aed;">${s.duzey4 || 0} Soru (%${pD4})</span>
                                </div>
                                <div style="height:10px; background:rgba(0,0,0,0.06); border-radius:5px; overflow:hidden;">
                                    <div style="height:100%; width:${pD4}%; background:#7c3aed; border-radius:5px;"></div>
                                </div>
                                <div style="font-size:10.5px; color:var(--text-muted); margin-top:2px;">ÖSYM tarzı çift kazanımlı zor sorular</div>
                            </div>

                            <!-- Düzey 3 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px;">
                                    <span>🟢 [Düzey 3] Yeni Nesil &amp; Analiz</span>
                                    <span style="color:#059669;">${s.duzey3 || 0} Soru (%${pD3})</span>
                                </div>
                                <div style="height:10px; background:rgba(0,0,0,0.06); border-radius:5px; overflow:hidden;">
                                    <div style="height:100%; width:${pD3}%; background:#059669; border-radius:5px;"></div>
                                </div>
                                <div style="font-size:10.5px; color:var(--text-muted); margin-top:2px;">Kurgulu, grafikli ve modelleme soruları</div>
                            </div>

                            <!-- Düzey 2 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px;">
                                    <span>🟡 [Düzey 2] Kavrama &amp; Standart Test</span>
                                    <span style="color:#d97706;">${s.duzey2 || 0} Soru (%${pD2})</span>
                                </div>
                                <div style="height:10px; background:rgba(0,0,0,0.06); border-radius:5px; overflow:hidden;">
                                    <div style="height:100%; width:${pD2}%; background:#d97706; border-radius:5px;"></div>
                                </div>
                                <div style="font-size:10.5px; color:var(--text-muted); margin-top:2px;">Konu pekiştirme ve soru bankası standartları</div>
                            </div>

                            <!-- Düzey 1 -->
                            <div>
                                <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:4px;">
                                    <span>🔵 [Düzey 1] Temel Bilgi &amp; Hatırlama</span>
                                    <span style="color:#0284c7;">${s.duzey1 || 0} Soru (%${pD1})</span>
                                </div>
                                <div style="height:10px; background:rgba(0,0,0,0.06); border-radius:5px; overflow:hidden;">
                                    <div style="height:100%; width:${pD1}%; background:#0284c7; border-radius:5px;"></div>
                                </div>
                                <div style="font-size:10.5px; color:var(--text-muted); margin-top:2px;">Doğrudan formül, tanım ve kavram tarama</div>
                            </div>
                        </div>

                        <div style="margin-top:16px; text-align:right;">
                            <button class="btn btn-outline-secondary btn-sm" onclick="switchYksPiramitSubSegment('haftalik-giris')" style="font-size:11.5px; font-weight:700;">
                                <i class="fas fa-edit me-1"></i> Sayıları Güncelle
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Segment 2: Haftalık Soru Girişi Formu -->
            <div id="yks-piramit-seg-haftalik-giris" style="${activeSeg === 'haftalik-giris' ? 'display:block;' : 'display:none;'}">
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:18px; max-width:640px; margin:0 auto;">
                    <h4 style="margin:0 0 14px 0; color:#0284c7; font-size:14px; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-edit"></i> Haftalık Soru Sayılarını Güncelle (KAİ Canlı Hesaplayıcı)
                    </h4>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">
                        Öğrencinin son bir haftada çözdüğü soruları bilişsel zorluk düzeylerine göre giriniz.
                    </p>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
                        <div>
                            <label style="font-size:11.5px; font-weight:700; color:#0284c7;">[Düzey 1] Temel Hatırlama:</label>
                            <input type="number" id="yks-pir-d1" value="${s.duzey1 || 0}" min="0" onfocus="yksAutoScrollOnFocus(this)" oninput="updateYksLiveKaiPreview()" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:13px; font-weight:700;">
                        </div>
                        <div>
                            <label style="font-size:11.5px; font-weight:700; color:#d97706;">[Düzey 2] Kavrama &amp; Standart:</label>
                            <input type="number" id="yks-pir-d2" value="${s.duzey2 || 0}" min="0" onfocus="yksAutoScrollOnFocus(this)" oninput="updateYksLiveKaiPreview()" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:13px; font-weight:700;">
                        </div>
                        <div>
                            <label style="font-size:11.5px; font-weight:700; color:#059669;">[Düzey 3] Yeni Nesil &amp; Analiz:</label>
                            <input type="number" id="yks-pir-d3" value="${s.duzey3 || 0}" min="0" onfocus="yksAutoScrollOnFocus(this)" oninput="updateYksLiveKaiPreview()" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:13px; font-weight:700;">
                        </div>
                        <div>
                            <label style="font-size:11.5px; font-weight:700; color:#7c3aed;">[Düzey 4] Üst Biliş &amp; Eleme:</label>
                            <input type="number" id="yks-pir-d4" value="${s.duzey4 || 0}" min="0" onfocus="yksAutoScrollOnFocus(this)" oninput="updateYksLiveKaiPreview()" style="width:100%; padding:7px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:13px; font-weight:700;">
                        </div>
                    </div>

                    <!-- Canlı Hesaplama Önizlemesi -->
                    <div id="yks-live-kai-box" style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                        <div>
                            Toplam: <strong id="yks-live-pir-total">${kai.total} Soru</strong>
                        </div>
                        <div>
                            Canlı KAİ: <strong id="yks-live-pir-kai" style="color:${kai.badgeColor}; font-size:14px;">%${kai.kai}</strong>
                        </div>
                    </div>

                    <div style="display:flex; justify-content:flex-end; gap:8px;">
                        <button class="btn btn-clear" onclick="switchYksPiramitSubSegment('piramit-teshis')" style="padding:7px 16px; font-size:12px;">İptal</button>
                        <button class="btn btn-primary" onclick="saveYksPiramitQuestions()" style="padding:7px 20px; font-size:12px; font-weight:700;">
                            <i class="fas fa-save me-1"></i> KAİ ve Soruları Kaydet
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function updateYksLiveKaiPreview() {
        const d1 = Number(document.getElementById('yks-pir-d1')?.value) || 0;
        const d2 = Number(document.getElementById('yks-pir-d2')?.value) || 0;
        const d3 = Number(document.getElementById('yks-pir-d3')?.value) || 0;
        const d4 = Number(document.getElementById('yks-pir-d4')?.value) || 0;
        const total = d1 + d2 + d3 + d4;
        const kaiVal = total > 0 ? Math.round(((d1 + d2) / total) * 100) : 0;

        const totEl = document.getElementById('yks-live-pir-total');
        const kaiEl = document.getElementById('yks-live-pir-kai');
        if (totEl) totEl.textContent = total + ' Soru';
        if (kaiEl) {
            kaiEl.textContent = '%' + kaiVal;
            kaiEl.style.color = (kaiVal > 55) ? '#ef4444' : (kaiVal >= 45 ? '#f59e0b' : '#10b981');
        }
    }

    function saveYksPiramitQuestions() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const d1 = Number(document.getElementById('yks-pir-d1')?.value) || 0;
        const d2 = Number(document.getElementById('yks-pir-d2')?.value) || 0;
        const d3 = Number(document.getElementById('yks-pir-d3')?.value) || 0;
        const d4 = Number(document.getElementById('yks-pir-d4')?.value) || 0;
        const total = d1 + d2 + d3 + d4;

        item.haftalikSoruSayisi = { duzey1: d1, duzey2: d2, duzey3: d3, duzey4: d4, toplam: total };

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Haftalık soru dağılımı ve KAİ indeksi kaydedildi.', 'success');
        }

        window.activeYksPiramitSubSegment = 'piramit-teshis';
        renderYksDetailPiramit(item);
        renderYksKoclukModule();
    }

    // --- Sub-Tab 6: Gemini AI & WhatsApp / BiP Entegrasyonu ---
    function renderYksDetailAi(item) {
        const c = document.getElementById('tab-yks-ai');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const phase = getCurrentYksPhase(item.aktifFaz);
        const kai = calculateKai(item.haftalikSoruSayisi);
        const plateau = diagnoseYksNetPlateau(item);
        const obpShield = calculateObpShield(item);

        const promptText = `Öğrenci: ${item.adSoyad} (${seviye}. Sınıf - Alan: ${item.alan} - OBP: ${obpShield.diplomaNotu})
OBP Koruma Kalkanı Katkısı: +${obpShield.yerlestirmeKatkisi} Ham Puan
Hedef: ${seviye === 9 || seviye === 10 ? 'Lise OBP Kalkanını 95+ seviyesinde tutmak' : `İlk ${item.hedefSiralama || 10000} Sıralama`}
Haftalık Çözülen Soru: Toplam ${kai.total} Soru, Konfor Alanı İndeksi: %${kai.kai} (${kai.label})
Hata Ameliyathanesinde Bekleyen Tekrar: ${item.hataDefteri?.filter(h => getYksHataRepeatStatus(h).isDue).length || 0} Adet

Yukarıdaki verilere dayanarak;
1) Öğrencinin turlama tekniği, bilişsel hata kök nedenleri ve konfor alanından çıkışı için 3 maddelik acil reçete yaz.
2) Veli için evde net sormamayı ve krizsiz iletişimi teminat altına alan 100 kelimelik yapıcı bir bülten oluştur.`;

        const waText = `Sayın Velimiz, ${item.adSoyad} isimli öğrencimizin haftalık bilişsel analizleri tamamlanmıştır. Öğrencimiz bu hafta ${kai.total} soru çözmüş ve %${kai.kai} konfor alanı indeksiyle ilerlemiştir. Öğrencimize deneme sonrasında "Kaç net yaptın?" yerine "Bugün turlamayı ve stratejini uygulayabildin mi?" diye sorarak çabasını takdir etmenizi rica ederiz. Saygılarımızla, Lise & YKS Bilişsel Başarı Mentoru.`;

        c.innerHTML = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                <h4 style="margin:0 0 10px 0; color:#7c3aed; display:flex; align-items:center; gap:8px;">
                    <i class="fas fa-robot"></i> Gemini AI Analiz Promptu &amp; WhatsApp / BiP Bülteni
                </h4>
                <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">
                    Öğrencinin tüm psikometrik verileri hazır prompta ve veli bültenine dönüştürüldü.
                </p>

                <div style="margin-bottom:14px;">
                    <label style="font-size:11px; font-weight:700;">Hazır Gemini AI Koçluk Promptu:</label>
                    <textarea readonly style="width:100%; min-height:110px; padding:10px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:11.5px; font-family:monospace;">${escapeFn(promptText)}</textarea>
                    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:6px;">
                        <button class="btn btn-outline-secondary" onclick="navigator.clipboard.writeText(\`${promptText.replace(/`/g, '\\`')}\`); alert('Gemini AI promptu kopyalandı.');" style="font-size:11px; padding:5px 12px;">
                            <i class="fas fa-copy me-1"></i> Promptu Kopyala
                        </button>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border); padding-top:14px;">
                    <label style="font-size:11px; font-weight:700; color:#059669;"><i class="fab fa-whatsapp me-1"></i> Tek Tıkla Veli Bülteni (WhatsApp &amp; BiP):</label>
                    <textarea id="yks-wa-text" style="width:100%; min-height:75px; padding:8px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">${escapeFn(waText)}</textarea>
                    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
                        <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('yks-wa-text').value); alert('WhatsApp mesajı panoya kopyalandı.');" style="background:#25D366; color:white; font-size:11.5px; padding:6px 14px; font-weight:700; border-radius:6px;">
                            <i class="fab fa-whatsapp me-1"></i> WhatsApp Kopyala
                        </button>
                        <button class="btn" onclick="if(typeof window.shareViaBip==='function'){window.shareViaBip(document.getElementById('yks-wa-text').value);}else{alert('BiP modalı açılamadı.');}" style="background:#0284c7; color:white; font-size:11.5px; padding:6px 14px; font-weight:700; border-radius:6px;">
                            <i class="fas fa-comment-dots me-1"></i> BiP ile Paylaş (Sadeleştir)
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ─────────────────────────────────────────────────────────────
    // 4. 60 SANİYELİK HIZLI GİRİŞ SİHİRBAZI
    // ─────────────────────────────────────────────────────────────

    function openYksQuickSyncModal(kocId) {
        activeYksKoclukId = kocId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const s = item.haftalikSoruSayisi || {};
        const qD1 = document.getElementById('yks-qs-d1');
        const qD2 = document.getElementById('yks-qs-d2');
        const qD3 = document.getElementById('yks-qs-d3');
        const qD4 = document.getElementById('yks-qs-d4');
        const qTyt = document.getElementById('yks-qs-tyt-net');
        const qAyt = document.getElementById('yks-qs-ayt-net');

        if (qD1) qD1.value = s.duzey1 || 0;
        if (qD2) qD2.value = s.duzey2 || 0;
        if (qD3) qD3.value = s.duzey3 || 0;
        if (qD4) qD4.value = s.duzey4 || 0;
        if (qTyt) qTyt.value = '';
        if (qAyt) qAyt.value = '';

        const titleEl = document.getElementById('yks-quick-sync-title');
        if (titleEl) {
            titleEl.innerHTML = `<i class="fas fa-bolt"></i> ⚡ 60 Saniyelik Hızlı Giriş: ${escapeFn(item.adSoyad)}`;
        }

        const modal = document.getElementById('yks-kocluk-quick-sync-modal');
        if (modal) modal.style.display = 'flex';
    }

    function saveYksQuickSync() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const d1 = Number(document.getElementById('yks-qs-d1')?.value) || 0;
        const d2 = Number(document.getElementById('yks-qs-d2')?.value) || 0;
        const d3 = Number(document.getElementById('yks-qs-d3')?.value) || 0;
        const d4 = Number(document.getElementById('yks-qs-d4')?.value) || 0;
        const tytNet = document.getElementById('yks-qs-tyt-net')?.value;
        const aytNet = document.getElementById('yks-qs-ayt-net')?.value;
        const inat = Number(document.getElementById('yks-qs-inat')?.value) || 0;

        item.haftalikSoruSayisi = { duzey1: d1, duzey2: d2, duzey3: d3, duzey4: d4, toplam: d1 + d2 + d3 + d4 };

        const today = new Date().toISOString().split('T')[0];
        if (tytNet !== '' && !isNaN(tytNet)) {
            if (!Array.isArray(item.denemeler)) item.denemeler = [];
            item.denemeler.push({
                id: 'den_qs_tyt_' + Date.now(),
                tarih: today,
                tur: 'TYT',
                yayin: 'Haftalık TYT Denemesi',
                netler: { toplam: Number(tytNet) },
                sureAnalizi: { inatlasmaSayisi: inat, optikKontrol: true, turkce1Tur: 42, mat1Tur: 45, fenSos1Tur: 30, tur2NetKazanc: 4 }
            });
        }

        if (aytNet !== '' && !isNaN(aytNet)) {
            if (!Array.isArray(item.denemeler)) item.denemeler = [];
            item.denemeler.push({
                id: 'den_qs_ayt_' + Date.now(),
                tarih: today,
                tur: 'AYT',
                yayin: 'Haftalık AYT Denemesi',
                netler: { toplam: Number(aytNet) },
                sureAnalizi: { dikkatHatasiSayisi: 1, kokOkumaHatasiSayisi: 0, kumarSoruSayisi: 0, optikKontrol: true }
            });
        }

        if (typeof saveData === 'function') saveData(true);
        renderYksKoclukModule();

        const modal = document.getElementById('yks-kocluk-quick-sync-modal');
        if (modal) modal.style.display = 'none';
        alert('Hızlı veriler başarıyla kaydedildi ve senkronize edildi.');
    }

    // ─────────────────────────────────────────────────────────────
    // 5. AKILLI FORM MERKEZİ VE İZOMORFİK FORM BASKISI (A4 PRINT CSS)
    // ─────────────────────────────────────────────────────────────

    function openYksPrintCenterModal(kocId) {
        if (kocId) activeYksKoclukId = kocId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        const nameEl = document.getElementById('yks-print-student-name');
        if (nameEl && item) {
            nameEl.textContent = `${item.adSoyad} (${item.sinif} - ${item.alan})`;
        }
        const modal = document.getElementById('yks-kocluk-print-center-modal');
        if (modal) modal.style.display = 'flex';
    }

    function printYksForm(formType, targetId) {
        const idToUse = targetId || activeYksKoclukId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(idToUse));
        if (!item) {
            alert('Yazdırılacak öğrenci kaydı bulunamadı.');
            return;
        }

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const phase = getCurrentYksPhase(item.aktifFaz);
        const kai = calculateKai(item.haftalikSoruSayisi);
        const obpShield = calculateObpShield(item);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent('https://meb.gov.tr/kocluk_' + item.id)}&color=0284c7`;

        let html = '';

        if (formType === 'FORM-1') {
            // FORM-1: Haftalık Blok Çalışma & Denge Matrisi
            const dueYksErrors = (Array.isArray(item.hataDefteri) ? item.hataDefteri : []).filter(h => getYksHataRepeatStatus(h).isDue).slice(0, 5);
            let errRows = '';
            if (dueYksErrors.length > 0) {
                dueYksErrors.forEach(h => {
                    const meta = getYksKokNedenMeta(h.kokNeden);
                    errRows += `
                    <tr>
                        <td style="font-weight:bold;">${escapeFn(h.oturum || 'TYT')} - ${escapeFn(h.ders || '')}</td>
                        <td>${escapeFn(h.konu || '')}</td>
                        <td style="text-align:center; font-size:9px; font-weight:700;"><span style="color:${meta.color};">${meta.icon} Kod ${meta.code}:</span> ${meta.short}</td>
                        <td style="font-size:9px;">${escapeFn(h.soruNotu || '-')}</td>
                        <td style="text-align:center;">${h.tekrar1 ? '☑' : '☐'}</td>
                        <td style="text-align:center;">${h.tekrar3 ? '☑' : '☐'}</td>
                        <td style="text-align:center;">${h.tekrar7 ? '☑' : '☐'}</td>
                        <td style="text-align:center;">${h.tekrar21 ? '☑' : '☐'}</td>
                    </tr>`;
                });
            } else {
                errRows = `
                <tr><td style="font-weight:bold;">Matematik</td><td>Fonksiyonlar / Parabol</td><td style="text-align:center; font-size:9px; font-weight:700;"><span style="color:#ef4444;">🔴 Kod A:</span> Bilgi Boşluğu</td><td style="font-size:9px;">Tepe noktası r = -b/2a formülü ve simetri ekseni.</td><td style="text-align:center;">☑</td><td style="text-align:center;">☑</td><td style="text-align:center;">☐</td><td style="text-align:center;">☐</td></tr>
                <tr><td style="font-weight:bold;">Fizik</td><td>Kuvvet ve Hareket / Bağıl</td><td style="text-align:center; font-size:9px; font-weight:700;"><span style="color:#d97706;">🟡 Kod B:</span> Kurgu / Öncül</td><td style="font-size:9px;">Gözlenen eksi gözlemci vektör yönü ters alındı.</td><td style="text-align:center;">☑</td><td style="text-align:center;">☐</td><td style="text-align:center;">☐</td><td style="text-align:center;">☐</td></tr>
                <tr><td style="font-weight:bold;">Türkçe</td><td>Paragrafta Anlam / Ana Düşünce</td><td style="text-align:center; font-size:9px; font-weight:700;"><span style="color:#ea580c;">🟠 Kod C:</span> Süre / İşlem</td><td style="font-size:9px;">Soru kökündeki 'çıkarılamaz' ifadesi olumlu okundu.</td><td style="text-align:center;">☑</td><td style="text-align:center;">☑</td><td style="text-align:center;">☑</td><td style="text-align:center;">☐</td></tr>`;
            }

            const is9or10 = (seviye === 9 || seviye === 10);
            const formTitle = is9or10 ? `FORM-1: LİSE (${seviye}. SINIF) HAFTALIK DERS/YAZILI BLOK ÇALIŞMA & GELİŞİM MATRİSİ` : `FORM-1: YKS HAFTALIK BLOK ÇALIŞMA & DEEP WORK DENGE MATRİSİ`;

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>${formTitle} - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; line-height: 1.3; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 5px; margin-bottom: 6px; }
        .hdr h2 { margin: 0; font-size: 13px; color: #0369a1; text-transform: uppercase; }
        .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; font-size: 9.5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9.5px; }
        th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 5px; text-align: left; font-size: 9px; text-transform: uppercase; }
        td { border: 1px solid #cbd5e1; padding: 3px 5px; }
        .rule-box { background: #e0f2fe; border: 1px dashed #0284c7; border-radius: 6px; padding: 5px 8px; margin-bottom: 6px; font-size: 9.5px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9.5px; }
        .sig-line { margin-top: 18px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; } table, tr, td, th { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>📋 ${formTitle}</h2>
            <div style="font-size:9.5px; color:#64748b;">${phase.name}: ${phase.title} &bull; Alan: <strong>${escapeFn(item.alan)}</strong> &bull; OBP: <strong>${obpShield.diplomaNotu}</strong></div>
        </div>
        <img src="${qrUrl}" width="50" height="50" style="border-radius:4px; border:1px solid #cbd5e1;">
    </div>

    <div class="info-grid">
        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)}</div>
        <div><strong>Okul No / Sınıf:</strong> ${escapeFn(item.studentNo)} / ${escapeFn(item.sinif)}</div>
        <div><strong>Haftalık Hedef Soru:</strong> ${kai.total || 500} Soru</div>
        <div><strong>Tarih / Hafta:</strong> ____ / ____ / 2026</div>
    </div>

    <div class="rule-box">
        <strong>⚡ 07:30 Nöral Açılış &amp; Blok Çalışma Protokolü:</strong> 
        Her sabah 07:30'da [20 Paragraf + 15 Problem + 10 Geometri] tamamlanacak; akşam bloklarında derin odak (75-90 dk) uygulanacaktır.
    </div>

    <table>
        <thead>
            <tr>
                <th style="width:75px;">Gün</th>
                <th style="width:110px;">Sabah Rutini (07:30)</th>
                <th>Blok 1 (Okul/Ders)</th>
                <th>Blok 2 (Ödev/Konu)</th>
                <th>Blok 3 (Cerrahi Soru)</th>
                <th style="width:50px; text-align:center;">Soru</th>
                <th style="width:40px; text-align:center;">Uyku</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Pazartesi</td><td>[ ] 20 Paragraf + 15 Problem</td><td></td><td></td><td></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr><td>Salı</td><td>[ ] 20 Paragraf + 10 Geometri</td><td></td><td></td><td></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr><td>Çarşamba</td><td>[ ] 20 Paragraf + 15 Problem</td><td></td><td></td><td></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr><td>Perşembe</td><td>[ ] 20 Paragraf + 10 Geometri</td><td></td><td></td><td></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr><td>Cuma</td><td>[ ] 20 Paragraf + 15 Problem</td><td></td><td></td><td></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr style="background:#f8fafc;"><td>Cumartesi</td><td>[ ] 30 Paragraf + 20 Problem</td><td colspan="3"><strong>🎯 Haftalık Deneme &amp; Cerrahi Triyaj (FORM-2)</strong></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
            <tr style="background:#f8fafc;"><td>Pazar</td><td>[ ] Genel Bilişsel Tekrar</td><td colspan="3"><strong>🔬 Aralıklı Tekrar (1-3-7-21) &amp; Haftalık Planlama</strong></td><td style="text-align:center;">___</td><td style="text-align:center;">23:30</td></tr>
        </tbody>
    </table>

    <div style="font-weight:bold; margin-bottom:3px; color:#0369a1;">🚨 BU HAFTA GÜNÜ GELEN EBBİNGHAUS ARALIKLI TEKRAR LİSTESİ:</div>
    <table>
        <thead>
            <tr>
                <th style="width:110px;">Ders / Oturum</th>
                <th>Kazanım / Konu</th>
                <th style="width:130px; text-align:center;">Kök Neden</th>
                <th>Bilişsel Püf Noktası</th>
                <th style="width:28px; text-align:center;">1G</th>
                <th style="width:28px; text-align:center;">3G</th>
                <th style="width:28px; text-align:center;">7G</th>
                <th style="width:28px; text-align:center;">21G</th>
            </tr>
        </thead>
        <tbody>${errRows}</tbody>
    </table>

    <div class="sig">
        <div>Öğrenci Taahhüdü<div class="sig-line"></div></div>
        <div>Mentor / Koç Onayı<div class="sig-line"></div></div>
        <div>Veli İmzası<div class="sig-line"></div></div>
    </div>
</body>
</html>`;
        } else if (formType === 'FORM-2') {
            // FORM-2: Deneme Sonrası Acil Triyaj ve Çift Motorlu TDE Karnesi (İzomorfik Sıra)
            const sonHatalar = (Array.isArray(item.hataDefteri) ? item.hataDefteri : []).slice(-5);
            let triyajRows = '';
            if (sonHatalar.length > 0) {
                sonHatalar.forEach((h, i) => {
                    const m = getYksKokNedenMeta(h.kokNeden);
                    triyajRows += `<tr>
                        <td style="text-align:center; font-weight:bold;">${i + 1}</td>
                        <td>${escapeFn(h.ders || '-')}</td>
                        <td>${escapeFn(h.konu || '-')}</td>
                        <td style="text-align:center; font-weight:700;"><span style="color:${m.color};">${m.icon} Kod ${m.code}:</span> ${m.short}</td>
                        <td style="font-size:9px;">${escapeFn(h.soruNotu || '-')}</td>
                    </tr>`;
                });
            } else {
                triyajRows = `
                <tr><td style="text-align:center;">1</td><td>Matematik</td><td>Türevde Teğet Eğimi</td><td style="text-align:center;"><span style="color:#ef4444;">🔴 Kod A:</span> Bilgi Boşluğu</td><td>Türev formülü yerine integral kuralı uygulandı.</td></tr>
                <tr><td style="text-align:center;">2</td><td>Fizik</td><td>Elektriksel Potansiyel</td><td style="text-align:center;"><span style="color:#d97706;">🟡 Kod B:</span> Kurgu / Öncül</td><td>Skaler potansiyelde vektörel toplama yapıldı.</td></tr>
                <tr><td style="text-align:center;">3</td><td>Türkçe</td><td>Cümle Analizi</td><td style="text-align:center;"><span style="color:#ea580c;">🟠 Kod C:</span> Süre / İşlem</td><td>Son 5 dakikada panikleyip hızlı işaretlendi.</td></tr>
                <tr><td style="text-align:center;">4</td><td>Kimya</td><td>Gazlarda Kinetik Teori</td><td style="text-align:center;"><span style="color:#8b5cf6;">🟣 Kod D:</span> Bilişsel Direnç</td><td>Soruyla 3.5 dakika inatlaşıldı, geçilemedi.</td></tr>`;
            }

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-2: Deneme Sonrası Acil Triyaj & TDE - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; line-height: 1.3; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ef4444; padding-bottom: 5px; margin-bottom: 6px; }
        .hdr h2 { margin: 0; font-size: 13px; color: #dc2626; text-transform: uppercase; }
        .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; font-size: 9.5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9.5px; }
        th { background: #fee2e2; border: 1px solid #fca5a5; padding: 3px 5px; text-align: left; font-size: 9px; text-transform: uppercase; }
        td { border: 1px solid #cbd5e1; padding: 3px 5px; }
        .rubric { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9.5px; }
        .sig-line { margin-top: 18px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; } table, tr, td, th { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>⏱️ FORM-2: Deneme Sonrası Acil Triyaj ve Çift Motorlu TDE Karnesi</h2>
            <div style="font-size:9.5px; color:#64748b;">Sınavdan Çıktıktan Sonra İlk 60 Dakika İçerisinde Doldurulmalıdır (1-e-1 İzomorfik Sıra)</div>
        </div>
        <img src="${qrUrl}" width="50" height="50" style="border-radius:4px; border:1px solid #cbd5e1;">
    </div>

    <div class="info-grid">
        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)}</div>
        <div><strong>Oturum:</strong> [ ] TYT (120 Soru) &nbsp; [ ] AYT (80 Soru)</div>
        <div><strong>Yayın:</strong> ______________________</div>
        <div><strong>Tarih:</strong> ____.____.2026</div>
    </div>

    <div style="font-weight:bold; margin-bottom:3px; color:#dc2626;">📊 1. İZOMORFİK SÜRE &amp; TURLAMA KARNESİ (DİJİTAL SIRA İLE BİREBİR AYNI)</div>
    <table>
        <thead>
            <tr>
                <th>Test / Branş</th>
                <th style="text-align:center; width:45px;">Soru</th>
                <th style="text-align:center; width:45px;">Doğru</th>
                <th style="text-align:center; width:45px;">Yanlış</th>
                <th style="text-align:center; width:45px;">Boş</th>
                <th style="text-align:center; width:50px;">Net</th>
                <th style="text-align:center; width:75px;">1. Tur Süresi</th>
                <th style="text-align:center; width:85px;">2. Tur Kazancı</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1. Türkçe / Edebiyat-Sos 1</td><td style="text-align:center;">40</td><td></td><td></td><td></td><td></td><td style="text-align:center;">___ dk</td><td style="text-align:center;">+ ___ net</td></tr>
            <tr><td>2. Sosyal Bilimler / Sosyal 2</td><td style="text-align:center;">20 / 40</td><td></td><td></td><td></td><td></td><td style="text-align:center;">___ dk</td><td style="text-align:center;">+ ___ net</td></tr>
            <tr><td>3. Temel Matematik / AYT Mat</td><td style="text-align:center;">40</td><td></td><td></td><td></td><td></td><td style="text-align:center;">___ dk</td><td style="text-align:center;">+ ___ net</td></tr>
            <tr><td>4. Fen Bilimleri / Fen</td><td style="text-align:center;">20 / 40</td><td></td><td></td><td></td><td></td><td style="text-align:center;">___ dk</td><td style="text-align:center;">+ ___ net</td></tr>
            <tr style="background:#fef2f2; font-weight:bold;"><td>TOPLAM</td><td style="text-align:center;">120 / 80</td><td></td><td></td><td></td><td></td><td style="text-align:center;">___ dk</td><td style="text-align:center;">+ ___ net</td></tr>
        </tbody>
    </table>

    <div class="rubric">
        <strong style="color:#0369a1;">⚖️ TDE (Turlama Disiplin Endeksi) 100 Puanlık Hızlı Rubrik:</strong>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-top:4px; font-size:9px;">
            <div>&bull; Türkçe 1. Tur &le; 43 dk: <strong>15p</strong> (-3p/3dk)</div>
            <div>&bull; Mat 1. Tur &le; 45 dk: <strong>12p</strong> (-3p/3dk)</div>
            <div>&bull; Fen/Sos 1. Tur &le; 32 dk: <strong>8p</strong> (-2p/3dk)</div>
            <div>&bull; İnatlaşmama (&le;2.5 dk): <strong>30p</strong> (-8p/inat)</div>
            <div>&bull; 2. Tur Kurtarma: <strong>20p</strong> (+4p/net)</div>
            <div>&bull; Optik Kontrol (3 dk): <strong>15p</strong></div>
        </div>
        <div style="margin-top:4px; border-top:1px dashed #cbd5e1; padding-top:4px; font-weight:bold; display:flex; justify-content:space-between;">
            <span>HESAPLANAN TDE SKORU: _______ / 100</span>
            <span>ÖSYM Hazır Bulunuşluk: [ ] &ge;85 Üstün &nbsp; [ ] 70-84 Orta &nbsp; [ ] &lt;70 Kritik Alarm</span>
        </div>
    </div>

    <div style="font-weight:bold; margin-bottom:3px; color:#dc2626;">🔬 2. ACİL TRİYAJ &amp; 4 KÖK NEDEN ANALİZİ</div>
    <table>
        <thead>
            <tr>
                <th style="width:25px; text-align:center;">#</th>
                <th style="width:90px;">Ders</th>
                <th>Soru Konusu / Kazanım</th>
                <th style="width:140px; text-align:center;">Kök Neden</th>
                <th>Cerrahi Müdahale / Püf Noktası</th>
            </tr>
        </thead>
        <tbody>${triyajRows}</tbody>
    </table>

    <div class="sig">
        <div>Öğrenci İmzası<div class="sig-line"></div></div>
        <div>YKS Mentor Değerlendirmesi<div class="sig-line"></div></div>
        <div>Veli Bilgilendirme Onayı<div class="sig-line"></div></div>
    </div>
</body>
</html>`;
        } else if (formType === 'FORM-3') {
            // FORM-3: Metabilişsel Soru Ameliyathanesi Föyü (2x2 Kes-Yapıştır Şablonu)
            const ameliyatHatalar = (Array.isArray(item.hataDefteri) ? item.hataDefteri : []).slice(0, 4);
            let cells = '';

            for (let i = 0; i < 4; i++) {
                const h = ameliyatHatalar[i];
                const meta = h ? getYksKokNedenMeta(h.kokNeden) : null;
                cells += `
                <div style="border: 1.5px dashed #64748b; border-radius: 6px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; height: 420px; background: #fafafa; page-break-inside: avoid;">
                    <div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #cbd5e1; padding-bottom:4px; margin-bottom:6px;">
                            <strong style="color:#0284c7; font-size:10.5px;">HÜCRE #${i + 1}: ${h ? escapeFn(h.oturum + ' - ' + h.ders) : 'Ders: __________________'}</strong>
                            <span style="font-size:9px; color:#64748b;">Konu: ${h ? escapeFn(h.konu) : '__________________'}</span>
                        </div>
                        
                        <!-- Kes Yapıştır Çerçevesi -->
                        <div style="height: 160px; border: 1px dashed #94a3b8; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: white; color: #94a3b8; font-size: 10px; margin-bottom: 6px;">
                            ✂️ Kesilen Soru Kupürünü Buraya Yapıştırınız (160px)
                        </div>

                        <!-- 4 Kök Neden Kutucukları -->
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 8.5px; margin-bottom: 6px;">
                            <div style="border:1px solid #ef4444; padding:2px 4px; border-radius:3px; background:${meta && meta.code === 'A' ? 'rgba(239,68,68,0.15)' : 'white'}; font-weight:${meta && meta.code === 'A' ? 'bold' : 'normal'};">[ ${meta && meta.code === 'A' ? 'X' : ' '} ] 🔴 Kod A: Bilgi Boşluğu</div>
                            <div style="border:1px solid #d97706; padding:2px 4px; border-radius:3px; background:${meta && meta.code === 'B' ? 'rgba(245,158,11,0.15)' : 'white'}; font-weight:${meta && meta.code === 'B' ? 'bold' : 'normal'};">[ ${meta && meta.code === 'B' ? 'X' : ' '} ] 🟡 Kod B: Kurgu / Öncül</div>
                            <div style="border:1px solid #ea580c; padding:2px 4px; border-radius:3px; background:${meta && meta.code === 'C' ? 'rgba(234,88,12,0.15)' : 'white'}; font-weight:${meta && meta.code === 'C' ? 'bold' : 'normal'};">[ ${meta && meta.code === 'C' ? 'X' : ' '} ] 🟠 Kod C: Süre / İşlem</div>
                            <div style="border:1px solid #8b5cf6; padding:2px 4px; border-radius:3px; background:${meta && meta.code === 'D' ? 'rgba(139,92,246,0.15)' : 'white'}; font-weight:${meta && meta.code === 'D' ? 'bold' : 'normal'};">[ ${meta && meta.code === 'D' ? 'X' : ' '} ] 🟣 Kod D: Bilişsel Direnç</div>
                        </div>

                        <div style="font-size:9px; margin-bottom:4px;">
                            <strong>🔴 Ben Ne Düşündüm (Yanılgım):</strong> 
                            <div style="border-bottom:1px dotted #94a3b8; height:18px; margin-top:2px;">${h && h.kavramYanilgisi ? escapeFn(h.kavramYanilgisi) : ''}</div>
                        </div>

                        <div style="font-size:9px; margin-bottom:4px;">
                            <strong>🟢 Doğru Bilişsel Nüans &amp; Kural:</strong> 
                            <div style="border-bottom:1px dotted #94a3b8; height:18px; margin-top:2px;">${h && h.soruNotu ? escapeFn(h.soruNotu) : ''}</div>
                        </div>
                    </div>

                    <!-- Ebbinghaus İmza Kutucukları -->
                    <div style="border-top:1px solid #cbd5e1; padding-top:4px; display:flex; justify-content:space-between; font-size:8.5px; font-weight:bold;">
                        <span>1. Gün (24h): [ ${h && h.tekrar1 ? '✔' : ' '} ]</span>
                        <span>3. Gün (72h): [ ${h && h.tekrar3 ? '✔' : ' '} ]</span>
                        <span>7. Gün (168h): [ ${h && h.tekrar7 ? '✔' : ' '} ]</span>
                        <span>21. Gün (504h): [ ${h && h.tekrar21 ? '✔' : ' '} ]</span>
                    </div>
                </div>`;
            }

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-3: Soru Ameliyathanesi Föyü - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7c3aed; padding-bottom: 4px; margin-bottom: 6px; }
        .hdr h2 { margin: 0; font-size: 13px; color: #7c3aed; text-transform: uppercase; }
        .grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 860px; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; } .grid-2x2 { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>🔬 FORM-3: Metabilişsel Soru Ameliyathanesi Föyü (Kes-Yapıştır &amp; 1-3-7-21 Gün)</h2>
            <div style="font-size:9.5px; color:#64748b;">Öğrenci: <strong>${escapeFn(item.adSoyad)}</strong> (${escapeFn(item.studentNo)} - ${escapeFn(item.sinif)}) &bull; Ameliyat Tarihi: ____.____.2026</div>
        </div>
        <img src="${qrUrl}" width="45" height="45" style="border-radius:4px; border:1px solid #cbd5e1;">
    </div>

    <div class="grid-2x2">
        ${cells}
    </div>
</body>
</html>`;
        } else if (formType === 'FORM-4') {
            // FORM-4: Gelişim Karnesi & Mentor-Veli Mutabakatı
            const tytDenemeler = (Array.isArray(item.denemeler) ? item.denemeler : []).filter(d => !String(d.tur).includes('AYT'));
            const aytDenemeler = (Array.isArray(item.denemeler) ? item.denemeler : []).filter(d => String(d.tur).includes('AYT'));

            const sonTytNet = tytDenemeler.slice(-1)[0]?.netler?.toplam || item.baslangicTytNet || 0;
            const sonAytNet = aytDenemeler.slice(-1)[0]?.netler?.toplam || item.baslangicAytNet || 0;

            const is9or10 = (seviye === 9 || seviye === 10);

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-4: Bilişsel Gelişim Karnesi & Mutabakat - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; line-height: 1.35; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #059669; padding-bottom: 5px; margin-bottom: 6px; }
        .hdr h2 { margin: 0; font-size: 13px; color: #047857; text-transform: uppercase; }
        .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; font-size: 9.5px; }
        .card-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 6px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; margin-top: 10px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9.5px; }
        .sig-line { margin-top: 20px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; } .card-box { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>🧠 FORM-4: Lise &amp; YKS Bilişsel Gelişim Karnesi &amp; Mentor-Veli Mutabakatı</h2>
            <div style="font-size:9.5px; color:#64748b;">Aylık Bilişsel İcra, OBP Koruma Kalkanı ve Krizsiz Ev Sözleşmesi</div>
        </div>
        <img src="${qrUrl}" width="50" height="50" style="border-radius:4px; border:1px solid #cbd5e1;">
    </div>

    <div class="info-grid">
        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)}</div>
        <div><strong>Kademe / Alan:</strong> ${seviye}. Sınıf / ${escapeFn(item.alan)}</div>
        <div><strong>OBP Kalkan Katkısı:</strong> +${obpShield.yerlestirmeKatkisi} Puan</div>
        <div><strong>Aktif Faz:</strong> ${phase.name}</div>
    </div>

    <div class="card-box">
        <strong style="color:#047857;">📈 1. AKADEMİK GELİŞİM VE PSİKOMETRİK PERFORMANS TABLOSU</strong>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-top:6px; font-size:9.5px;">
            ${is9or10 ? `
            <div style="border:1px solid #e2e8f0; padding:6px; border-radius:4px; background:white;">
                <div>9. Sınıf Yıl Sonu: <strong>${obpShield.s9}</strong></div>
                <div>10. Sınıf Yıl Sonu: <strong>${obpShield.s10}</strong></div>
                <div>Hesaplanan OBP: <strong style="color:#059669;">${obpShield.diplomaNotu}</strong></div>
            </div>
            <div style="border:1px solid #e2e8f0; padding:6px; border-radius:4px; background:white;">
                <div>Ham Puana Katkı: <strong style="color:#059669; font-size:11px;">+${obpShield.yerlestirmeKatkisi} Puan</strong></div>
                <div>10 Ders OYSS Ort.: <strong>${calculateOyssAverages(item).generalAvg}</strong></div>
                <div>Sabah Rutini: <strong>20P + 15Pr + 10G</strong></div>
            </div>
            ` : `
            <div style="border:1px solid #e2e8f0; padding:6px; border-radius:4px; background:white;">
                <div>Başlangıç TYT: <strong>${item.baslangicTytNet || 0}</strong></div>
                <div>Son TYT Neti: <strong>${sonTytNet}</strong></div>
                <div>Hedef TYT Neti: <strong style="color:#0284c7;">${item.hedefTytNet || 100}</strong></div>
            </div>
            <div style="border:1px solid #e2e8f0; padding:6px; border-radius:4px; background:white;">
                <div>Başlangıç AYT: <strong>${item.baslangicAytNet || 0}</strong></div>
                <div>Son AYT Neti: <strong>${sonAytNet}</strong></div>
                <div>Hedef AYT Neti: <strong style="color:#7c3aed;">${item.hedefAytNet || 68}</strong></div>
            </div>
            `}
            <div style="border:1px solid #e2e8f0; padding:6px; border-radius:4px; background:white;">
                <div>Konfor Alanı (KAİ): <strong>%${kai.kai}</strong></div>
                <div>Teşhis: <strong style="color:${kai.badgeColor};">${escapeFn(kai.label)}</strong></div>
                <div>Mühürlenen Soru: <strong>🟢 ${item.hataDefteri?.filter(h => getYksHataRepeatStatus(h).status === 'completed').length || 0} Adet</strong></div>
            </div>
        </div>
    </div>

    <div class="card-box">
        <strong style="color:#047857;">🎯 2. MENTOR BİLİŞSEL PLATO VE EYLEM REÇETESİ</strong>
        <p style="margin:4px 0; font-size:9.5px; color:#334155; line-height:1.4;">
            ${escapeFn(item.bilesenNotu || 'Öğrencinin haftalık blok odak disiplini ve 07:30 paragraf-problem rutini titizlikle sürdürülmelidir. Hata ameliyathanesindeki 1-3-7-21 gün tekrarları aksatılmamalıdır.')}
        </p>
    </div>

    <div class="card-box" style="background:#f0fdf4; border-color:#86efac;">
        <strong style="color:#166534;">🤝 3. EV İÇİ KRİZSİZ İLETİŞİM PROTOKOLÜ (VELİ MUTABAKATI)</strong>
        <ul style="margin:4px 0 0 0; padding-left:18px; font-size:9px; color:#14532d; line-height:1.45;">
            <li>Öğrenciye deneme veya yazılı sonrasında "Kaç aldın/kaç net yaptın?" yerine <strong>"Bugün stratejine sadık kalabildin mi, turlamayı uyguladın mı?"</strong> sorusu sorulacaktır.</li>
            <li>Net ve not dalgalanmalarının bir başarısızlık değil; güçlendirilecek bilişsel nüansları gösteren tanı haritası olduğu kabul edilecektir.</li>
            <li>Sirkadiyen biyolojik ritim için saat 23:30'da ekran ve çalışma kapatılarak uyku protokolüne geçilecektir.</li>
        </ul>
    </div>

    <div class="sig">
        <div>Öğrenci Taahhüdü<div class="sig-line"></div></div>
        <div>Bilişsel Başarı Mentoru<div class="sig-line"></div></div>
        <div>Veli Mutabakat İmzası<div class="sig-line"></div></div>
    </div>
</body>
</html>`;
        }

        const printWin = window.open('', '_blank', 'width=850,height=1100');
        if (printWin) {
            printWin.document.open();
            printWin.document.write(html);
            printWin.document.close();
            setTimeout(() => {
                printWin.focus();
                printWin.print();
            }, 500);
        }
    }

    // ─────────────────────────────────────────────────────────────
    // GLOBAL FONKSİYONLARI DIŞA AKTAR
    // ─────────────────────────────────────────────────────────────
    window.renderYksKoclukModule = renderYksKoclukModule;
    window.openAddYksKoclukModal = openAddYksKoclukModal;
    window.onYksAddStudentSelectChange = onYksAddStudentSelectChange;
    window.onYksAddKademeChange = onYksAddKademeChange;
    window.saveNewYksStudent = saveNewYksStudent;
    window.deleteYksKoclukStudent = deleteYksKoclukStudent;
    window.openYksDetailModal = openYksDetailModal;
    window.toggleYksQuickDrawer = toggleYksQuickDrawer;
    window.updateYksDrawerKai = updateYksDrawerKai;
    window.submitYksInlineQuickSync = submitYksInlineQuickSync;
    window.populateYksQuickSwitcher = populateYksQuickSwitcher;
    window.navigateYksKoclukStudent = navigateYksKoclukStudent;
    window.switchYksDenemeSubSegment = switchYksDenemeSubSegment;
    window.switchYksHataSubSegment = switchYksHataSubSegment;
    window.switchYksPiramitSubSegment = switchYksPiramitSubSegment;
    window.toggleYksFormsMenu = toggleYksFormsMenu;
    window.toggleYksParentMenu = toggleYksParentMenu;
    window.hideYksDropdowns = hideYksDropdowns;
    window.sendYksParentWhatsApp = sendYksParentWhatsApp;
    window.shareYksViaBip = shareYksViaBip;
    window.yksAutoScrollOnFocus = yksAutoScrollOnFocus;
    window.updateYksLiveKaiPreview = updateYksLiveKaiPreview;
    window.calculateYksTde = calculateYksTde;
    window.calculateKai = calculateKai;
    window.getYksHataRepeatStatus = getYksHataRepeatStatus;
    window.diagnoseYksNetPlateau = diagnoseYksNetPlateau;
    window.getCurrentYksPhase = getCurrentYksPhase;
    window.detectSinifSeviyesi = detectSinifSeviyesi;
    window.switchYksDetailSubTab = switchYksDetailSubTab;
    window.saveYksMentorNote = saveYksMentorNote;
    window.saveYksObpProjections = saveYksObpProjections;
    window.showAddYksDenemeForm = showAddYksDenemeForm;
    window.toggleYksDenemeTurFields = toggleYksDenemeTurFields;
    window.toggleYksTdeAccordion = toggleYksTdeAccordion;
    window.calculateYksLiveNet = calculateYksLiveNet;
    window.saveNewYksDeneme = saveNewYksDeneme;
    window.deleteYksDeneme = deleteYksDeneme;
    window.saveYksOyssYazililar = saveYksOyssYazililar;
    window.showAddYksHataBox = showAddYksHataBox;
    window.selectYksHataKokNeden = selectYksHataKokNeden;
    window.filterYksHataDefteri = filterYksHataDefteri;
    window.saveNewYksHata = saveNewYksHata;
    window.toggleYksHataTekrar = toggleYksHataTekrar;
    window.deleteYksHata = deleteYksHata;
    window.saveYksPiramitQuestions = saveYksPiramitQuestions;
    window.openYksQuickSyncModal = openYksQuickSyncModal;
    window.saveYksQuickSync = saveYksQuickSync;
    window.openYksPrintCenterModal = openYksPrintCenterModal;
    window.printYksForm = printYksForm;
    window.calculateObpShield = calculateObpShield;
    window.calculateOyssAverages = calculateOyssAverages;
    window.renderYksDetailHeatmap = renderYksDetailHeatmap;
    window.toggleYksHeatDrawer = toggleYksHeatDrawer;
    window.onYksHeatDrawerGradeChange = onYksHeatDrawerGradeChange;
    window.onYksHeatDrawerSubjChange = onYksHeatDrawerSubjChange;
    window.onYksHeatDrawerUniteChange = onYksHeatDrawerUniteChange;
    window.toggleYksHeatCustomTopic = toggleYksHeatCustomTopic;
    window.selectYksHeatDrawerStatus = selectYksHeatDrawerStatus;
    window.calcYksHeatDrawerNet = calcYksHeatDrawerNet;
    window.saveYksKazanimStatus = saveYksKazanimStatus;
    window.resetYksKazanimStatus = resetYksKazanimStatus;
    window.cycleYksKazanimStatusByKey = cycleYksKazanimStatusByKey;
    window.openYksKazanimEditModal = openYksKazanimEditModal;
    window.switchYksHeatGrade = switchYksHeatGrade;
    window.setYksHeatStatusFilter = setYksHeatStatusFilter;
    window.filterYksHeatmap = filterYksHeatmap;
    window.printYksHeatmapReport = printYksHeatmapReport;

})();

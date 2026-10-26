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
    // 3. DETAY MODALI & SUB-TABS (ADAPTİF KOKPİT)
    // ─────────────────────────────────────────────────────────────

    function openYksDetailModal(kocId) {
        activeYksKoclukId = kocId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        item.sinifSeviyesi = item.sinifSeviyesi || detectSinifSeviyesi(item.sinif);

        const titleEl = document.getElementById('yks-detail-student-title');
        if (titleEl) {
            let kademeText = '12. Sınıf YKS';
            if (item.sinifSeviyesi === 9) kademeText = '🌱 9. Sınıf (Temel İnşa & OYSS)';
            else if (item.sinifSeviyesi === 10) kademeText = '🌿 10. Sınıf (Kavram & OYSS)';
            else if (item.sinifSeviyesi === 11) kademeText = `⚡ 11. Sınıf (${item.alan} Omurgası)`;
            else if (item.sinifSeviyesi === 'mezun') kademeText = '🎓 Mezun (ÖSYM Zirve)';
            titleEl.innerHTML = `🎯 ${escapeFn(item.adSoyad)} <span style="font-size:12px; font-weight:600; opacity:0.8; margin-left:8px;">(${escapeFn(item.studentNo || '')} • ${kademeText})</span>`;
        }

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

        switchYksDetailSubTab(activeYksDetailSubTab || 'tab-yks-profil');

        const modal = document.getElementById('yks-kocluk-detail-modal');
        if (modal) modal.style.display = 'flex';
    }

    function switchYksDetailSubTab(subTabId) {
        activeYksDetailSubTab = subTabId;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        document.querySelectorAll('.yks-sub-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.yks-sub-tab-content').forEach(c => c.style.display = 'none');

        const targetBtn = document.getElementById(`yks-sub-btn-${subTabId}`);
        const targetContent = document.getElementById(subTabId);
        if (targetBtn) targetBtn.classList.add('active');
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

    // --- Sub-Tab 2: Denemeler & OYSS Yazılıları ---
    function renderYksDetailDenemeler(item) {
        const c = document.getElementById('tab-yks-denemeler');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);

        // 9 veya 10. Sınıf Modu: MEB OYSS 10 Ders Yazılı Takip Konsolu
        if (seviye === 9 || seviye === 10) {
            renderOyssYaziliTakip(c, item);
            return;
        }

        // 11, 12 veya Mezun Modu: Denemeler & TDE Skorlama
        renderTytAytDenemeList(c, item);
    }

    function renderOyssYaziliTakip(container, item) {
        const yazililar = item.yazililar || {};
        const oyssAvg = calculateOyssAverages(item);
        const obpShield = calculateObpShield(item);

        let tableRows = '';
        MEB_10_DERSI.forEach((ders, idx) => {
            const y1_1 = yazililar.donem1_y1?.[ders.id] ?? '';
            const y1_2 = yazililar.donem1_y2?.[ders.id] ?? '';
            const y2_1 = yazililar.donem2_y1?.[ders.id] ?? '';
            const y2_2 = yazililar.donem2_y2?.[ders.id] ?? '';

            // Ortalama
            const arr = [parseFloat(y1_1), parseFloat(y1_2), parseFloat(y2_1), parseFloat(y2_2)].filter(n => !isNaN(n));
            const rowAvg = arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '-';

            tableRows += `
                <tr class="yks-oyss-row" data-ders="${escapeFn(ders.id)}">
                    <td style="text-align:center; font-weight:bold;">${idx + 1}</td>
                    <td style="font-weight:700; white-space:nowrap;">
                        <span style="margin-right:6px;">${ders.icon}</span> ${escapeFn(ders.name)}
                        <span style="font-size:10px; color:var(--text-muted); font-weight:normal;">(${ders.kredi} Kredi)</span>
                    </td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y1_1" value="${y1_1}" placeholder="-" style="width:55px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y1_2" value="${y1_2}" placeholder="-" style="width:55px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y2_1" value="${y2_1}" placeholder="-" style="width:55px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center;"><input type="number" min="0" max="100" class="yks-oyss-inp y2_2" value="${y2_2}" placeholder="-" style="width:55px; text-align:center; padding:4px; border-radius:4px; border:1px solid var(--border);"></td>
                    <td style="text-align:center; font-weight:800; color:#0284c7;">${rowAvg}</td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:16px;">
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
                        <span style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); padding:4px 10px; border-radius:6px; font-size:12px; font-weight:800;">
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

            <!-- Varsa Girilen TYT Denemeleri -->
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h4 style="margin:0; color:var(--text-main); font-size:13px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-stopwatch" style="color:#0284c7;"></i> TYT Deneme Kayıtları &amp; Hızlı Giriş
                    </h4>
                    <button class="btn btn-primary" onclick="showAddYksDenemeForm()" style="font-size:11.5px; padding:5px 12px; font-weight:700;">
                        <i class="fas fa-plus me-1"></i> Yeni Deneme Ekle
                    </button>
                </div>
                ${renderDenemelerTableRows(item)}
                ${renderAddDenemeFormBox(item)}
            </div>
        `;
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
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
        alert('MEB OYSS yazılı notları ve OBP Kalkanı başarıyla kaydedildi.');
    }

    function renderTytAytDenemeList(container, item) {
        container.innerHTML = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:16px;">
                <h4 style="margin:0 0 12px 0; color:#0284c7; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                    <span><i class="fas fa-chart-bar me-2"></i> Deneme Kayıtları &amp; Çift Motorlu TDE Skoru</span>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-clear" onclick="if (typeof window.syncAllExamsToKocluk === 'function') { window.syncAllExamsToKocluk(false); const cur = (window.yksKoclukData||[]).find(k=>k.id==='${item.id}'); if(cur) renderYksDetailDenemeler(cur); }" style="font-size:11.5px; padding:6px 12px; font-weight:700; border:1px solid rgba(2,132,199,0.35); border-radius:6px; background:rgba(2,132,199,0.08); color:#0284c7;">
                            <i class="fas fa-sync-alt me-1"></i> 🦅 8. Sınav Analizden Güncelle
                        </button>
                        <button class="btn btn-primary" onclick="showAddYksDenemeForm()" style="font-size:11.5px; padding:6px 12px; font-weight:700;">
                            <i class="fas fa-plus me-1"></i> Yeni Deneme Ekle
                        </button>
                    </div>
                </h4>
                ${renderDenemelerTableRows(item)}
            </div>
            ${renderAddDenemeFormBox(item)}
        `;
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
                        <button class="action-btn" onclick="deleteYksDeneme(${idx})" title="Denemeyi Sil" style="color:#ef4444;"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        if (!rows) {
            rows = `<tr><td colspan="8" style="text-align:center; padding:22px; color:var(--text-muted);">Henüz deneme kaydı girilmedi.</td></tr>`;
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
    function renderAddDenemeFormBox(item) {
        return `
            <div id="yks-add-deneme-form-box" style="display:none; margin-top:16px; background:var(--card-bg); border:1.5px dashed #0284c7; border-radius:10px; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
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
                        <input type="date" id="yks-den-date" value="${new Date().toISOString().split('T')[0]}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
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
                        <input type="text" id="yks-den-yayin" placeholder="Örn: 3D Türkiye Geneli-1" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Toplam Net (Otomatik Hesaplanır):</label>
                        <input type="number" step="0.25" id="yks-den-toplam-net" value="0" readonly style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:var(--input-bg); font-size:12px; font-weight:900; color:#0284c7;">
                    </div>
                </div>

                <!-- 1-e-1 İZOMORFİK BRANŞ GİRİŞ MATRİSİ (FORM-2 İLE AYNI SIRA) -->
                <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px;">
                    <div style="font-size:11.5px; font-weight:800; color:var(--text-main); margin-bottom:8px; display:flex; justify-content:space-between;">
                        <span><i class="fas fa-keyboard me-1"></i> Numpad Hızlı Giriş (Sıra: D ➔ Tab ➔ Y ➔ Tab ➔ Sonraki Ders)</span>
                        <span style="font-size:11px; color:var(--text-muted);">Boş ve Net Otomatik Hesaplanır</span>
                    </div>

                    <!-- TYT Branşları -->
                    <div id="yks-tyt-branches-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px;">
                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#0284c7; margin-bottom:4px;">1. Türkçe (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="1" min="0" max="40" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="2" min="0" max="40" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#0284c7;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="20" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#d97706; margin-bottom:4px;">2. Sosyal Bilimler (20 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="3" min="0" max="20" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="4" min="0" max="20" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">20</span><br>Net: <strong class="yks-val-net" style="color:#d97706;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#059669; margin-bottom:4px;">3. Temel Matematik (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="5" min="0" max="40" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="6" min="0" max="40" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#059669;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="20" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#7c3aed; margin-bottom:4px;">4. Fen Bilimleri (20 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="7" min="0" max="20" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="8" min="0" max="20" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">20</span><br>Net: <strong class="yks-val-net" style="color:#7c3aed;">0.00</strong></div>
                            </div>
                        </div>
                    </div>

                    <!-- AYT Branşları (Varsayılan Gizli) -->
                    <div id="yks-ayt-branches-grid" style="display:none; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px;">
                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#7c3aed; margin-bottom:4px;">AYT Matematik (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="11" min="0" max="40" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="12" min="0" max="40" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#7c3aed;">0.00</strong></div>
                            </div>
                        </div>

                        <div class="yks-branch-row" data-total-q="40" style="border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--card-bg);">
                            <div style="font-weight:700; font-size:12px; color:#0284c7; margin-bottom:4px;">AYT Fen / Alan-2 (40 Soru)</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <div><label style="font-size:10px;">Doğru</label><input type="number" tabindex="13" min="0" max="40" class="yks-input-d" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10px;">Yanlış</label><input type="number" tabindex="14" min="0" max="40" class="yks-input-y" oninput="calculateYksLiveNet(this)" style="width:50px; padding:4px; text-align:center; font-size:12px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="font-size:11px; margin-left:auto; text-align:right;">Boş: <span class="yks-val-b" style="font-weight:700;">40</span><br>Net: <strong class="yks-val-net" style="color:#0284c7;">0.00</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TDE AKORDEONU (KADEMELİ AÇIĞA ÇIKARMA) -->
                <div style="margin-bottom:12px;">
                    <button type="button" class="btn btn-clear" onclick="toggleYksTdeAccordion()" style="font-size:11.5px; padding:6px 10px; font-weight:700; border:1px dashed var(--border); border-radius:6px; width:100%; text-align:left; display:flex; justify-content:space-between; align-items:center;">
                        <span><i class="fas fa-stopwatch me-1" style="color:#0284c7;"></i> ⏱️ TDE Süre ve Turlama Detaylarını Gir (Opsiyonel / Akordeon)</span>
                        <i id="yks-tde-acc-icon" class="fas fa-chevron-down"></i>
                    </button>

                    <div id="yks-tde-accordion-body" style="display:none; margin-top:8px; padding:10px; border:1px solid var(--border); border-radius:6px; background:var(--tab-bg);">
                        <div id="yks-tyt-tde-fields">
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px;">
                                <div><label style="font-size:10.5px;">Türkçe 1. Tur (dk):</label><input type="number" id="yks-tde-turkce" value="42" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px;">Matematik 1. Tur (dk):</label><input type="number" id="yks-tde-mat" value="45" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px;">Fen/Sosyal 1. Tur (dk):</label><input type="number" id="yks-tde-fensos" value="30" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px; color:#ef4444; font-weight:700;">İnatlaşma Sayısı:</label><input type="number" id="yks-tde-inat" value="0" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px; color:#059669; font-weight:700;">2. Tur Net Kurtarma:</label><input type="number" step="0.25" id="yks-tde-tur2" value="4" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="display:flex; align-items:center; gap:6px; margin-top:14px;"><input type="checkbox" id="yks-tde-optik" checked><label for="yks-tde-optik" style="font-size:11px; cursor:pointer;">Optik Son Kontrol (3 dk)</label></div>
                            </div>
                        </div>

                        <div id="yks-ayt-tde-fields" style="display:none;">
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:8px;">
                                <div><label style="font-size:10.5px;">Dikkat / İşlem Hatası:</label><input type="number" id="yks-ayt-dikkat" value="1" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px;">Soru Kökü Algılama Hatası:</label><input type="number" id="yks-ayt-kok" value="0" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div><label style="font-size:10.5px;">Rastgele (Kumar) İşaretleme:</label><input type="number" id="yks-ayt-kumar" value="0" style="width:100%; padding:4px; font-size:11.5px; border-radius:4px; border:1px solid var(--border);"></div>
                                <div style="display:flex; align-items:center; gap:6px; margin-top:14px;"><input type="checkbox" id="yks-ayt-optik" checked><label for="yks-ayt-optik" style="font-size:11px; cursor:pointer;">Optik &amp; İşlem Çapraz Kontrol</label></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:8px;">
                    <button class="btn btn-clear" onclick="document.getElementById('yks-add-deneme-form-box').style.display='none'" style="padding:6px 14px; font-size:12px;">İptal</button>
                    <button class="btn btn-primary" onclick="saveNewYksDeneme()" style="padding:6px 18px; font-size:12px; font-weight:700;"><i class="fas fa-check me-1"></i> Denemeyi Kaydet</button>
                </div>
            </div>
        `;
    }

    function showAddYksDenemeForm() {
        const box = document.getElementById('yks-add-deneme-form-box');
        if (box) {
            box.style.display = 'block';
            box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function toggleYksDenemeTurFields() {
        const tur = document.getElementById('yks-den-tur')?.value;
        const tytBranches = document.getElementById('yks-tyt-branches-grid');
        const aytBranches = document.getElementById('yks-ayt-branches-grid');
        const tytTde = document.getElementById('yks-tyt-tde-fields');
        const aytTde = document.getElementById('yks-ayt-tde-fields');

        if (tur === 'AYT') {
            if (tytBranches) tytBranches.style.display = 'none';
            if (aytBranches) aytBranches.style.display = 'grid';
            if (tytTde) tytTde.style.display = 'none';
            if (aytTde) aytTde.style.display = 'block';
        } else {
            if (tytBranches) tytBranches.style.display = 'grid';
            if (aytBranches) aytBranches.style.display = 'none';
            if (tytTde) tytTde.style.display = 'block';
            if (aytTde) aytTde.style.display = 'none';
        }
        calculateYksLiveNet();
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
        if (inputEl) {
            const row = inputEl.closest('.yks-branch-row');
            if (row) {
                const totalQ = parseInt(row.getAttribute('data-total-q') || '40', 10);
                const d = parseFloat(row.querySelector('.yks-input-d')?.value) || 0;
                const y = parseFloat(row.querySelector('.yks-input-y')?.value) || 0;
                const b = Math.max(0, totalQ - (d + y));
                const net = Math.max(0, parseFloat((d - (y / 4)).toFixed(2)));

                const bEl = row.querySelector('.yks-val-b');
                const netEl = row.querySelector('.yks-val-net');
                if (bEl) bEl.textContent = b;
                if (netEl) netEl.textContent = net.toFixed(2);
            }
        }

        const tur = document.getElementById('yks-den-tur')?.value || 'TYT';
        const targetContainer = tur === 'AYT' ? document.getElementById('yks-ayt-branches-grid') : document.getElementById('yks-tyt-branches-grid');

        let total = 0;
        if (targetContainer) {
            targetContainer.querySelectorAll('.yks-branch-row').forEach(row => {
                const d = parseFloat(row.querySelector('.yks-input-d')?.value) || 0;
                const y = parseFloat(row.querySelector('.yks-input-y')?.value) || 0;
                total += (d - (y / 4));
            });
        }

        const cleanTotal = Math.max(0, parseFloat(total.toFixed(2)));
        const topNetInput = document.getElementById('yks-den-toplam-net');
        const liveDisplay = document.getElementById('yks-den-live-toplam-display');
        if (topNetInput) topNetInput.value = cleanTotal;
        if (liveDisplay) liveDisplay.textContent = cleanTotal.toFixed(2);
    }

    function saveNewYksDeneme() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const tarih = document.getElementById('yks-den-date')?.value || new Date().toISOString().split('T')[0];
        const tur = document.getElementById('yks-den-tur')?.value || 'TYT';
        const yayin = document.getElementById('yks-den-yayin')?.value?.trim() || 'Genel Deneme';
        const net = Number(document.getElementById('yks-den-toplam-net')?.value) || 0;

        let sureAnalizi = {};
        if (tur === 'AYT') {
            sureAnalizi = {
                dikkatHatasiSayisi: Number(document.getElementById('yks-ayt-dikkat')?.value) || 0,
                kokOkumaHatasiSayisi: Number(document.getElementById('yks-ayt-kok')?.value) || 0,
                kumarSoruSayisi: Number(document.getElementById('yks-ayt-kumar')?.value) || 0,
                optikKontrol: !!document.getElementById('yks-ayt-optik')?.checked
            };
        } else {
            sureAnalizi = {
                turkce1Tur: Number(document.getElementById('yks-tde-turkce')?.value) || 42,
                mat1Tur: Number(document.getElementById('yks-tde-mat')?.value) || 45,
                fenSos1Tur: Number(document.getElementById('yks-tde-fensos')?.value) || 30,
                inatlasmaSayisi: Number(document.getElementById('yks-tde-inat')?.value) || 0,
                tur2NetKazanc: Number(document.getElementById('yks-tde-tur2')?.value) || 0,
                optikKontrol: !!document.getElementById('yks-tde-optik')?.checked
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
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
    }

    function deleteYksDeneme(index) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item || !Array.isArray(item.denemeler)) return;
        if (!confirm('Bu deneme kaydını silmek istediğinize emin misiniz?')) return;
        item.denemeler.splice(index, 1);
        if (typeof saveData === 'function') saveData(true);
        renderYksDetailDenemeler(item);
        renderYksKoclukModule();
    }

    // --- Sub-Tab 3: Metabilişsel Hata Defteri (Spaced Repetition & 4 Kök Neden) ---
    function renderYksDetailHataDefteri(item) {
        const c = document.getElementById('tab-yks-hata');
        if (!c) return;

        const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];

        // Filtre sayıları
        let dueCount = 0;
        let countA = 0, countB = 0, countC = 0, countD = 0;
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

        const filteredHatalar = hatalar.filter(h => {
            if (activeHataFilter === 'due') return getYksHataRepeatStatus(h).isDue;
            if (activeHataFilter === 'completed') return getYksHataRepeatStatus(h).status === 'completed';
            if (['A', 'B', 'C', 'D'].includes(activeHataFilter)) return (h.kokNeden || 'A').toUpperCase() === activeHataFilter;
            return true;
        });

        let rows = '';
        filteredHatalar.forEach((h, idx) => {
            const rep = getYksHataRepeatStatus(h);
            const originalIndex = hatalar.indexOf(h);
            rows += `
                <tr>
                    <td style="font-weight:bold; text-align:center;">${idx + 1}</td>
                    <td><span style="font-size:10.5px; font-weight:700;">${escapeFn(h.oturum || 'TYT')}</span> &bull; <strong>${escapeFn(h.ders || '-')}</strong></td>
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
                    <td style="text-align:center; font-size:10.5px;">
                        <label style="margin-right:4px;"><input type="checkbox" onchange="toggleYksHataTekrar(${originalIndex}, 1)" ${h.tekrar1 ? 'checked' : ''} title="1. Gün (24 sa)"> 1G</label>
                        <label style="margin-right:4px;"><input type="checkbox" onchange="toggleYksHataTekrar(${originalIndex}, 3)" ${h.tekrar3 ? 'checked' : ''} title="3. Gün (72 sa)"> 3G</label>
                        <label style="margin-right:4px;"><input type="checkbox" onchange="toggleYksHataTekrar(${originalIndex}, 7)" ${h.tekrar7 ? 'checked' : ''} title="7. Gün (168 sa)"> 7G</label>
                        <label><input type="checkbox" onchange="toggleYksHataTekrar(${originalIndex}, 21)" ${h.tekrar21 ? 'checked' : ''} title="21. Gün (504 sa)"> 21G</label>
                    </td>
                    <td style="text-align:center;">
                        <button class="action-btn" onclick="deleteYksHata(${originalIndex})" title="Hatayı Sil" style="color:#ef4444;"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });

        if (!rows) {
            rows = `<tr><td colspan="8" style="text-align:center; padding:22px; color:var(--text-muted);">Bu filtrede soru bulunmuyor.</td></tr>`;
        }

        c.innerHTML = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                    <div>
                        <h4 style="margin:0; color:#ef4444; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-microscope"></i> Metabilişsel Soru Ameliyathanesi &amp; Ebbinghaus Döngüsü (1 - 3 - 7 - 21 Gün)
                        </h4>
                        <div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">
                            Yanlış veya boş bırakılan sorular "Ben Ne Düşündüm vs Doğru Nüans" ile ameliyata alınır.
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="showAddYksHataBox()" style="font-size:11.5px; padding:6px 14px; font-weight:700;">
                        <i class="fas fa-plus me-1"></i> Yeni Soru Ameliyata Al
                    </button>
                </div>

                <!-- Hızlı Filtre Butonları -->
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px; font-size:11px;">
                    <button class="btn ${activeHataFilter === 'all' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('all')" style="padding:4px 10px; font-size:11px;">Tümü (${hatalar.length})</button>
                    <button class="btn ${activeHataFilter === 'due' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('due')" style="padding:4px 10px; font-size:11px; color:#ef4444; font-weight:700;">🚨 Günü Gelen / Geciken (${dueCount})</button>
                    <button class="btn ${activeHataFilter === 'A' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('A')" style="padding:4px 10px; font-size:11px;">🔴 Kod A (${countA})</button>
                    <button class="btn ${activeHataFilter === 'B' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('B')" style="padding:4px 10px; font-size:11px;">🟡 Kod B (${countB})</button>
                    <button class="btn ${activeHataFilter === 'C' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('C')" style="padding:4px 10px; font-size:11px;">🟠 Kod C (${countC})</button>
                    <button class="btn ${activeHataFilter === 'D' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('D')" style="padding:4px 10px; font-size:11px;">🟣 Kod D (${countD})</button>
                    <button class="btn ${activeHataFilter === 'completed' ? 'btn-primary' : 'btn-clear'}" onclick="filterYksHataDefteri('completed')" style="padding:4px 10px; font-size:11px; color:#059669;">🟢 Mühürlenen (${completedCount})</button>
                </div>

                <div style="overflow-x:auto;">
                    <table class="custom-table" style="width:100%; font-size:12px; margin:0;">
                        <thead>
                            <tr style="background:var(--tab-bg);">
                                <th style="width:35px; text-align:center;">#</th>
                                <th style="width:120px;">Ders / Oturum</th>
                                <th>Kazanım / Konu</th>
                                <th style="width:180px; text-align:center;">Kök Neden</th>
                                <th>Bilişsel Deşifre Notu</th>
                                <th style="width:140px; text-align:center;">Tekrar Durumu</th>
                                <th style="width:140px; text-align:center;">1-3-7-21 Onay</th>
                                <th style="width:40px; text-align:center;">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>

            <!-- Yeni Hata Formu -->
            <div id="yks-add-hata-box" style="display:none; background:var(--card-bg); border:1.5px dashed #ef4444; border-radius:10px; padding:16px;">
                <h4 style="margin:0 0 10px 0; color:#ef4444; font-size:13px; display:flex; align-items:center; gap:6px;">
                    <i class="fas fa-scalpel me-1"></i> Soru Ameliyathanesine Yeni Yanlış/Boş Soru Yatır
                </h4>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:10px; margin-bottom:12px;">
                    <div>
                        <label style="font-size:11px; font-weight:700;">Oturum / Alan:</label>
                        <select id="yks-hata-oturum" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                            <option value="TYT">TYT Oturumu</option>
                            <option value="AYT">AYT Oturumu</option>
                            <option value="OYSS">MEB OYSS Yazılısı</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Ders:</label>
                        <input type="text" id="yks-hata-ders" placeholder="Örn: Matematik" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Konu / Mikro-Kazanım:</label>
                        <input type="text" id="yks-hata-konu" placeholder="Örn: Türev - Ekstremum Noktaları" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">Soru Düzeyi (Piramit):</label>
                        <select id="yks-hata-duzey" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                            <option value="1">Düzey 1 (Kavrama/Formül)</option>
                            <option value="2">Düzey 2 (Uygulama/Tarama)</option>
                            <option value="3" selected>Düzey 3 (Yeni Nesil/ÖSYM)</option>
                            <option value="4">Düzey 4 (Üst Düzey Eleme)</option>
                        </select>
                    </div>
                </div>

                <!-- 4 Kök Neden Tıklanabilir Buton Paneli -->
                <div style="margin-bottom:12px;">
                    <label style="font-size:11px; font-weight:700; margin-bottom:6px; display:block;">4 Kök Neden Teşhisi Seçiniz:</label>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
                        <div id="btn-kok-A" onclick="selectYksHataKokNeden('A')" style="cursor:pointer; border:1.5px solid #ef4444; background:rgba(239,68,68,0.12); padding:8px; border-radius:6px;">
                            <strong style="color:#ef4444; font-size:11.5px;">🔴 Kod A: Bilgi &amp; Kavram Yanılgısı</strong>
                            <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Kavramı/formülü bilmiyordum (Deklaratif Bellek).</div>
                        </div>
                        <div id="btn-kok-B" onclick="selectYksHataKokNeden('B')" style="cursor:pointer; border:1px solid var(--border); background:var(--input-bg); padding:8px; border-radius:6px;">
                            <strong style="color:#d97706; font-size:11.5px;">🟡 Kod B: Kurgu &amp; Soru Kökü Hatası</strong>
                            <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Öncülü, olumsuzu veya grafiği yanlış okudum.</div>
                        </div>
                        <div id="btn-kok-C" onclick="selectYksHataKokNeden('C')" style="cursor:pointer; border:1px solid var(--border); background:var(--input-bg); padding:8px; border-radius:6px;">
                            <strong style="color:#ea580c; font-size:11.5px;">🟠 Kod C: Süre &amp; İşlem Hatası</strong>
                            <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Zaman baskısı, 4 işlem veya kaydırma hatası.</div>
                        </div>
                        <div id="btn-kok-D" onclick="selectYksHataKokNeden('D')" style="cursor:pointer; border:1px solid var(--border); background:var(--input-bg); padding:8px; border-radius:6px;">
                            <strong style="color:#8b5cf6; font-size:11.5px;">🟣 Kod D: Bilişsel Direnç &amp; İnatlaşma</strong>
                            <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">&gt;2.5 dk inatlaştım veya önyargıyla kaçtım.</div>
                        </div>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
                    <div>
                        <label style="font-size:11px; font-weight:700; color:#ef4444;">1. Ben Ne Düşündüm? (Kavram Yanılgım / Çeldirici):</label>
                        <textarea id="yks-hata-yanilgi" placeholder="Soruda hangi çeldiriciye takıldım, zihnimdeki yanlış mantık neydi?..." style="width:100%; min-height:65px; padding:8px; border-radius:6px; border:1px solid var(--border); font-size:12px;"></textarea>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700; color:#059669;">2. Doğru Bilişsel Nüans (Bir Dahaki Sefere Uygulanacak Kural):</label>
                        <textarea id="yks-hata-not" placeholder="Sorunun asıl püf noktası, formülü ve turlama anında dikkat edilecek kritik kural..." style="width:100%; min-height:65px; padding:8px; border-radius:6px; border:1px solid var(--border); font-size:12px;"></textarea>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:8px;">
                    <button class="btn btn-clear" onclick="document.getElementById('yks-add-hata-box').style.display='none'" style="padding:6px 14px; font-size:12px;">İptal</button>
                    <button class="btn btn-primary" onclick="saveNewYksHata()" style="padding:6px 18px; font-size:12px; font-weight:700;"><i class="fas fa-check me-1"></i> Soru Ameliyathanesine Mühürle</button>
                </div>
            </div>
        `;
    }

    function filterYksHataDefteri(filterKey) {
        activeHataFilter = filterKey;
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (item) renderYksDetailHataDefteri(item);
    }

    function selectYksHataKokNeden(code) {
        activeSelectedKokNeden = code;
        ['A', 'B', 'C', 'D'].forEach(c => {
            const btn = document.getElementById(`btn-kok-${c}`);
            if (btn) {
                if (c === code) {
                    btn.style.border = '1.5px solid #ef4444';
                    btn.style.background = 'rgba(239,68,68,0.12)';
                } else {
                    btn.style.border = '1px solid var(--border)';
                    btn.style.background = 'var(--input-bg)';
                }
            }
        });
    }

    function showAddYksHataBox() {
        const box = document.getElementById('yks-add-hata-box');
        if (box) {
            box.style.display = 'block';
            box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function saveNewYksHata() {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item) return;

        const oturum = document.getElementById('yks-hata-oturum')?.value || 'TYT';
        const ders = document.getElementById('yks-hata-ders')?.value?.trim() || 'Matematik';
        const konu = document.getElementById('yks-hata-konu')?.value?.trim() || 'Genel Kazanım';
        const duzey = Number(document.getElementById('yks-hata-duzey')?.value) || 3;
        const yanilgi = document.getElementById('yks-hata-yanilgi')?.value?.trim() || '';
        const not = document.getElementById('yks-hata-not')?.value?.trim() || '';

        const newHata = {
            id: 'hata_' + Date.now(),
            tarih: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
            oturum,
            ders,
            konu,
            kokNeden: activeSelectedKokNeden,
            duzey,
            kavramYanilgisi: yanilgi,
            soruNotu: not,
            tekrar1: false,
            tekrar3: false,
            tekrar7: false,
            tekrar21: false
        };

        if (!Array.isArray(item.hataDefteri)) item.hataDefteri = [];
        item.hataDefteri.push(newHata);

        if (typeof saveData === 'function') saveData(true);
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
        renderYksDetailHataDefteri(item);
        renderYksKoclukModule();
    }

    function deleteYksHata(index) {
        const item = (window.yksKoclukData || []).find(k => String(k.id) === String(activeYksKoclukId));
        if (!item || !Array.isArray(item.hataDefteri)) return;
        if (!confirm('Bu soruyu hata ameliyathanesinden silmek istediğinize emin misiniz?')) return;
        item.hataDefteri.splice(index, 1);
        if (typeof saveData === 'function') saveData(true);
        renderYksDetailHataDefteri(item);
        renderYksKoclukModule();
    }

    // --- Sub-Tab 4: MEB Müfredatı Mikro-Kazanım Isı Haritası (Heatmap) ---
    function renderYksDetailHeatmap(item) {
        const c = document.getElementById('tab-yks-isi-haritasi');
        if (!c) return;

        const curr = window.curriculumData || {};
        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);

        let targetGradeCurriculum = {};
        if (seviye === 9) targetGradeCurriculum = curr['9. Sınıf'] || {};
        else if (seviye === 10) targetGradeCurriculum = curr['10. Sınıf'] || {};
        else if (seviye === 11) targetGradeCurriculum = curr['11. Sınıf'] || {};
        else targetGradeCurriculum = curr['12. Sınıf'] || curr['11. Sınıf'] || {};

        const hatalar = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];

        let html = `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                    <div>
                        <h4 style="margin:0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-th me-1"></i> MEB ${seviye}. Sınıf Mikro-Kazanım Isı Haritası
                        </h4>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                            Hata defteri ve deneme teşhisleri MEB müfredatına göre otomatik taranarak renklendirilmiştir.
                        </div>
                    </div>
                    <div style="display:flex; gap:8px; font-size:11px; font-weight:700;">
                        <span style="background:rgba(239,68,68,0.12); color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:3px 8px; border-radius:6px;">🔴 Cerrahi Müdahale (&gt;%40 Kayıp)</span>
                        <span style="background:rgba(245,158,11,0.12); color:#d97706; border:1px solid rgba(245,158,11,0.3); padding:3px 8px; border-radius:6px;">🟡 Konsolidasyon</span>
                        <span style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); padding:3px 8px; border-radius:6px;">🟢 Bilişsel Otonomi</span>
                    </div>
                </div>
        `;

        const subjects = Object.keys(targetGradeCurriculum);
        if (subjects.length === 0) {
            html += `<p style="color:var(--text-muted); font-size:12px; padding:16px 0;">Bu kademeye ait müfredat verisi henüz sisteme girilmedi.</p></div>`;
            c.innerHTML = html;
            return;
        }

        subjects.forEach(sub => {
            html += `
                <div style="margin-bottom:14px; border:1px solid var(--border); border-radius:8px; padding:10px; background:var(--input-bg);">
                    <div style="font-weight:800; font-size:13px; color:var(--text-main); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-book-open" style="color:#0284c7;"></i> ${escapeFn(sub)}
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:8px;">
            `;

            const units = targetGradeCurriculum[sub] || {};
            Object.keys(units).forEach(uName => {
                const u = units[uName];
                const topics = Array.isArray(u.Konular) ? u.Konular : [];

                topics.forEach(top => {
                    const errorCount = hatalar.filter(h =>
                        String(h.ders || '').toLowerCase().includes(sub.toLowerCase()) &&
                        (String(h.konu || '').toLowerCase().includes(top.toLowerCase()) || top.toLowerCase().includes(String(h.konu || '').toLowerCase()))
                    ).length;

                    let bg = 'rgba(16, 185, 129, 0.08)';
                    let border = 'rgba(16, 185, 129, 0.3)';
                    let badge = '🟢 Bilişsel Otonomi';
                    let badgeCol = '#059669';

                    if (errorCount >= 2) {
                        bg = 'rgba(239, 68, 68, 0.12)';
                        border = 'rgba(239, 68, 68, 0.4)';
                        badge = `🔴 Cerrahi (${errorCount} Hata)`;
                        badgeCol = '#dc2626';
                    } else if (errorCount === 1) {
                        bg = 'rgba(245, 158, 11, 0.1)';
                        border = 'rgba(245, 158, 11, 0.35)';
                        badge = '🟡 Konsolidasyon';
                        badgeCol = '#d97706';
                    }

                    html += `
                        <div style="background:${bg}; border:1px solid ${border}; border-radius:6px; padding:8px; font-size:11.5px; display:flex; flex-direction:column; justify-content:space-between;">
                            <div style="font-weight:700; color:var(--text-main); line-height:1.3; margin-bottom:6px;">${escapeFn(top)}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:9.5px; color:var(--text-muted);">${escapeFn(uName.split(':')[0])}</span>
                                <span style="font-size:10px; font-weight:800; color:${badgeCol};">${badge}</span>
                            </div>
                        </div>
                    `;
                });
            });

            html += `</div></div>`;
        });

        html += `</div>`;
        c.innerHTML = html;
    }

    // --- Sub-Tab 5: Soru Piramidi & Haftalık Soru Takip ---
    function renderYksDetailPiramit(item) {
        const c = document.getElementById('tab-yks-piramit');
        if (!c) return;

        const seviye = detectSinifSeviyesi(item.sinifSeviyesi || item.sinif);
        const s = item.haftalikSoruSayisi || { duzey1: 100, duzey2: 200, duzey3: 350, duzey4: 150, toplam: 800 };
        const kai = calculateKai(s);

        let targetInfoText = '';
        if (seviye === 9 || seviye === 10) {
            targetInfoText = '🌱 9-10. Sınıf Optimal Hedefi: Düzey 1 (%40) + Düzey 2 (%40) + Düzey 3 (%20)';
        } else if (seviye === 11) {
            targetInfoText = '⚡ 11. Sınıf Optimal Hedefi: Düzey 1 (%25) + Düzey 2 (%35) + Düzey 3 (%30) + Düzey 4 (%10)';
        } else {
            targetInfoText = '🎯 12. Sınıf & Mezun Hedefi: Düzey 1 (%15) + Düzey 2 (%25) + Düzey 3 (%40) + Düzey 4 (%20)';
        }

        c.innerHTML = `
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <h4 style="margin:0 0 12px 0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-layer-group"></i> Soru Kalite Piramidi &amp; KAİ İndeksi
                    </h4>
                    
                    <div style="background:${kai.badgeBg}; border:1.5px solid ${kai.badgeColor}; border-radius:8px; padding:12px; margin-bottom:14px; text-align:center;">
                        <div style="font-size:26px; font-weight:900; color:${kai.badgeColor};">KAİ: %${kai.kai}</div>
                        <div style="font-size:12px; font-weight:700; color:${kai.badgeColor}; margin-top:2px;">${escapeFn(kai.label)}</div>
                        <p style="margin:6px 0 0 0; font-size:11px; color:var(--text-muted); line-height:1.35;">
                            ${targetInfoText}
                        </p>
                    </div>

                    <!-- Piramit Çubukları -->
                    <div style="display:flex; flex-direction:column; gap:8px; font-size:11.5px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:3px;">
                                <span>[Düzey 4] Üst Bilişsel / Eleme</span>
                                <span style="color:#7c3aed;">${s.duzey4 || 0} Soru (%${kai.total ? Math.round((s.duzey4 / kai.total) * 100) : 0})</span>
                            </div>
                            <div style="height:8px; background:rgba(0,0,0,0.06); border-radius:4px; overflow:hidden;">
                                <div style="height:100%; width:${kai.total ? Math.round((s.duzey4 / kai.total) * 100) : 0}%; background:#7c3aed;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:3px;">
                                <span>[Düzey 3] Yeni Nesil / ÖSYM Düzeyi</span>
                                <span style="color:#0284c7;">${s.duzey3 || 0} Soru (%${kai.total ? Math.round((s.duzey3 / kai.total) * 100) : 0})</span>
                            </div>
                            <div style="height:8px; background:rgba(0,0,0,0.06); border-radius:4px; overflow:hidden;">
                                <div style="height:100%; width:${kai.total ? Math.round((s.duzey3 / kai.total) * 100) : 0}%; background:#0284c7;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:3px;">
                                <span>[Düzey 2] Tarama &amp; Pekiştirme</span>
                                <span style="color:#d97706;">${s.duzey2 || 0} Soru (%${kai.total ? Math.round((s.duzey2 / kai.total) * 100) : 0})</span>
                            </div>
                            <div style="height:8px; background:rgba(0,0,0,0.06); border-radius:4px; overflow:hidden;">
                                <div style="height:100%; width:${kai.total ? Math.round((s.duzey2 / kai.total) * 100) : 0}%; background:#d97706;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:3px;">
                                <span>[Düzey 1] Temel Kazanım / Formül</span>
                                <span style="color:#64748b;">${s.duzey1 || 0} Soru (%${kai.total ? Math.round((s.duzey1 / kai.total) * 100) : 0})</span>
                            </div>
                            <div style="height:8px; background:rgba(0,0,0,0.06); border-radius:4px; overflow:hidden;">
                                <div style="height:100%; width:${kai.total ? Math.round((s.duzey1 / kai.total) * 100) : 0}%; background:#64748b;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px;">
                    <h4 style="margin:0 0 12px 0; color:#0284c7; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-edit"></i> Haftalık Soru Hacmini Güncelle
                    </h4>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
                        <div>
                            <label style="font-size:11px; font-weight:700;">Düzey 1 (Temel):</label>
                            <input type="number" id="yks-pir-d1" value="${s.duzey1 || 0}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Düzey 2 (Tarama):</label>
                            <input type="number" id="yks-pir-d2" value="${s.duzey2 || 0}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Düzey 3 (Yeni Nesil):</label>
                            <input type="number" id="yks-pir-d3" value="${s.duzey3 || 0}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">Düzey 4 (Eleme/Üst Düzey):</label>
                            <input type="number" id="yks-pir-d4" value="${s.duzey4 || 0}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="saveYksPiramitQuestions()" style="width:100%; padding:8px; font-weight:700; font-size:12px;">
                        <i class="fas fa-calculator me-1"></i> Soru Sayılarını Kaydet &amp; KAİ Yeniden Hesapla
                    </button>
                </div>
            </div>
        `;
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
        renderYksDetailPiramit(item);
        renderYksKoclukModule();
        alert('Haftalık soru dağılımı ve KAİ indeksi kaydedildi.');
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

})();

// ============================================================
// ui-kocluk.js (v3.0 Bilişsel Kademeli LGS Mimarlık Sistemi)
// 5, 6, 7 ve 8. Sınıf K-12 Bilişsel Koçluk, TDE Motoru, Hata Defteri & Mentorluk Sistemi
// ============================================================

(function () {
    'use strict';

    let activeKoclukId = null;
    let activeDetailSubTab = 'tab-koc-profil';

    const escapeFn = window.escapeHTML || function (s) {
        return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    // ─────────────────────────────────────────────────────────────
    // 0. BİLİŞSEL KADEMELİ PEDAGOJİ, TDE VE ARALIKLI TEKRAR MOTORLARI
    // ─────────────────────────────────────────────────────────────

    /**
     * Sınıf Düzeyine Duyarlı Bilişsel Pedagoji Konfigürasyonu
     * (Sweller Bilişsel Yük, Bloom Taksonomisi & MEB Müfredatı Uyumlu)
     * 5, 6, 7 ve 8. sınıf kademeleri için ideal soru piramidi, konfor alanı eşiği,
     * odak blok süreleri, hedef soru ve müfredat ders eşlemesini döner.
     */
    function getGradeCognitiveConfig(sinifStr) {
        const s = String(sinifStr || '').trim();
        if (s.startsWith('5')) {
            return {
                sinifNo: 5,
                grade: 5,
                gradeLabel: '5. Sınıf',
                stageTitle: 'Bilişsel Temel & Okuma Dayanıklılığı',
                piramit: { kavrama: 60, orta: 25, yeniNesil: 15, kavramaCount: 240, ortaCount: 100, yeniNesilCount: 60 },
                idealPiramit: { kavrama: 60, orta: 25, yeniNesil: 15 },
                konforThreshold: 10, // Yeni Nesil < %10 ise alarm
                konforRatio: 0.10,
                pomodoroOdakDk: 25,
                blokOdakDk: 40,
                odakDakika: 25,
                molaDakika: 5,
                odakBlok: '25 dk çalışma + 5 dk mola (Pomodoro Modeli)',
                hedefSoruVarsayilan: 400,
                hedefSoruMin: 350,
                hedefSoruMax: 450,
                defaultHedefSoru: 400,
                defaultHedefOkul: 'Bursluluk (İOKBS) & Proje Ortaokulu Başarısı',
                defaultBaslangicNet: 65,
                defaultHedefNet: 80,
                maxNet: 90,
                tdeIdealFen: 28,
                tdeIdealMat: 25,
                dersler: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Din Kültürü', 'İngilizce'],
                sosyalDersAdi: 'Sosyal Bilgiler',
                sosyalDersIcon: 'fa-compass',
                isLgsFinal: false
            };
        } else if (s.startsWith('6')) {
            return {
                sinifNo: 6,
                grade: 6,
                gradeLabel: '6. Sınıf',
                stageTitle: 'Muhakeme & Analitik Genişleme',
                piramit: { kavrama: 45, orta: 35, yeniNesil: 20, kavramaCount: 225, ortaCount: 175, yeniNesilCount: 100 },
                idealPiramit: { kavrama: 45, orta: 35, yeniNesil: 20 },
                konforThreshold: 20, // Yeni Nesil < %20 ise alarm
                konforRatio: 0.20,
                pomodoroOdakDk: 30,
                blokOdakDk: 50,
                odakDakika: 30,
                molaDakika: 5,
                odakBlok: '30 dk çalışma + 5 dk mola',
                hedefSoruVarsayilan: 500,
                hedefSoruMin: 450,
                hedefSoruMax: 550,
                defaultHedefSoru: 500,
                defaultHedefOkul: 'Bursluluk (İOKBS) & Fen/Sosyal Bilimler Lisesi Altyapısı',
                defaultBaslangicNet: 68,
                defaultHedefNet: 82,
                maxNet: 90,
                tdeIdealFen: 28,
                tdeIdealMat: 25,
                dersler: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Din Kültürü', 'İngilizce'],
                sosyalDersAdi: 'Sosyal Bilgiler',
                sosyalDersIcon: 'fa-compass',
                isLgsFinal: false
            };
        } else if (s.startsWith('7')) {
            return {
                sinifNo: 7,
                grade: 7,
                gradeLabel: '7. Sınıf',
                stageTitle: 'Ön LGS Çıraklığı & Zırhlanma',
                piramit: { kavrama: 30, orta: 35, yeniNesil: 35, kavramaCount: 180, ortaCount: 210, yeniNesilCount: 210 },
                idealPiramit: { kavrama: 30, orta: 35, yeniNesil: 35 },
                konforThreshold: 30, // Yeni Nesil < %30 ise alarm
                konforRatio: 0.30,
                pomodoroOdakDk: 40,
                blokOdakDk: 60,
                odakDakika: 40,
                molaDakika: 10,
                odakBlok: '40 dk çalışma + 10 dk mola (Derin Odaklanma)',
                hedefSoruVarsayilan: 600,
                hedefSoruMin: 550,
                hedefSoruMax: 650,
                defaultHedefSoru: 600,
                defaultHedefOkul: 'Hedef Fen Lisesi / Nitelikli Anadolu Lisesi (Ön LGS Çıraklığı)',
                defaultBaslangicNet: 70,
                defaultHedefNet: 85,
                maxNet: 90,
                tdeIdealFen: 30,
                tdeIdealMat: 28,
                dersler: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'Din Kültürü', 'İngilizce'],
                sosyalDersAdi: 'Sosyal Bilgiler',
                sosyalDersIcon: 'fa-compass',
                isLgsFinal: false
            };
        } else {
            // 8. Sınıf (Varsayılan)
            return {
                sinifNo: 8,
                grade: 8,
                gradeLabel: '8. Sınıf',
                stageTitle: 'LGS Ustalığı & Sınav Otomasyonu',
                piramit: { kavrama: 20, orta: 30, yeniNesil: 50, kavramaCount: 120, ortaCount: 180, yeniNesilCount: 300 },
                idealPiramit: { kavrama: 20, orta: 30, yeniNesil: 50 },
                konforThreshold: 45, // Yeni Nesil < %45 ise alarm
                konforRatio: 0.45,
                pomodoroOdakDk: 40,
                blokOdakDk: 80,
                odakDakika: 40,
                molaDakika: 10,
                odakBlok: '40+10 dk veya LGS Simülasyon Blokları (75 dk Sözel / 80 dk Sayısal)',
                hedefSoruVarsayilan: 700,
                hedefSoruMin: 600,
                hedefSoruMax: 800,
                defaultHedefSoru: 700,
                defaultHedefOkul: 'Galatasaray / Kabataş / Ankara Fen / Nitelikli Fen Lisesi',
                defaultBaslangicNet: 72,
                defaultHedefNet: 88,
                maxNet: 90,
                tdeIdealFen: 32,
                tdeIdealMat: 30,
                dersler: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'T.C. İnkılap', 'Din Kültürü', 'İngilizce'],
                sosyalDersAdi: 'T.C. İnkılap',
                sosyalDersIcon: 'fa-landmark',
                isLgsFinal: true
            };
        }
    }
    window.getGradeCognitiveConfig = getGradeCognitiveConfig;

    /**
     * Net değerinden ve soru sayısından Doğru (D), Yanlış (Y) ve Boş (B) sayılarını çözümler.
     * LGS için penalty = 3 (3Y 1D götürür). YKS için penalty = 4 (4Y 1D götürür).
     */
    function resolveDybFromNet(netVal, maxQuestions = 20, penalty = 3) {
        if (netVal === null || netVal === undefined || netVal === '' || isNaN(Number(netVal))) {
            return { d: 0, y: 0, b: maxQuestions };
        }
        const net = Math.max(0, Math.round(Number(netVal) * 100) / 100);
        if (net === 0) {
            return { d: 0, y: 0, b: maxQuestions };
        }

        let best = null;
        let minDiff = Infinity;

        for (let y = 0; y <= maxQuestions; y++) {
            const d = Math.round(net + (y / penalty));
            if (d >= 0 && (d + y) <= maxQuestions) {
                const calcNet = Math.round((d - (y / penalty)) * 100) / 100;
                const diff = Math.abs(calcNet - net);
                if (diff < 0.02) {
                    best = { d, y, b: Math.max(0, maxQuestions - d - y) };
                    break;
                }
                if (diff < minDiff) {
                    minDiff = diff;
                    best = { d, y, b: Math.max(0, maxQuestions - d - y) };
                }
            }
        }

        if (!best) {
            const fallbackD = Math.min(maxQuestions, Math.max(0, Math.round(net)));
            best = { d: fallbackD, y: 0, b: Math.max(0, maxQuestions - fallbackD) };
        }
        return best;
    }
    window.resolveDybFromNet = resolveDybFromNet;

    /**
     * Turlama Disiplin Endeksi (TDE) ve Strateji Disiplin Skoru Motoru (0-100 Puan)
     * 8. Sınıf: LGS Sayısal 80 dk (Fen <= 32 dk, Mat <= 30 dk, inatlaşma cezası, 2. tur kazanımları, optik kontrol)
     * 5, 6, 7. Sınıflar: Kademeye uyarlanmış Süre ve Strateji Disiplin Skoru (Ders başı süre aşımı, inatlaşılan soru sayısı, kontrol protokolü)
     */
    function calculateTDE(deneme, sinifStr) {
        if (!deneme) {
            return {
                tdePuan: 75,
                fenZamanPuan: 15,
                matZamanPuan: 15,
                inatlasmaPuan: 30,
                fen2TurPuan: 5,
                mat2TurPuan: 10,
                optikPuan: 0,
                badgeText: 'Orta Düzey Dalgalanma',
                badgeColor: '#92400e',
                badgeBg: '#fef3c7',
                badgeBorder: '#f59e0b'
            };
        }

        const config = getGradeCognitiveConfig(sinifStr || deneme.sinif);
        const inatlasma = Number(deneme.inatlasmaSayisi) || 0;
        const optik = !!deneme.optikKontrol;

        let fenZamanPuan = 15;
        let matZamanPuan = 15;
        let fen2TurPuan = 0;
        let mat2TurPuan = 0;

        if (config.isLgsFinal) {
            // 8. Sınıf LGS 80 dk Sayısal Oturumu
            const fen1Tur = (deneme.fen1TurSure !== undefined && deneme.fen1TurSure !== null && deneme.fen1TurSure !== '') ? Number(deneme.fen1TurSure) : 32;
            const mat1Tur = (deneme.mat1TurSure !== undefined && deneme.mat1TurSure !== null && deneme.mat1TurSure !== '') ? Number(deneme.mat1TurSure) : 30;
            const fen2Tur = Number(deneme.fen2TurKazanc) || 0;
            const mat2Tur = Number(deneme.mat2TurKazanc) || 0;

            fenZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, fen1Tur - 32) / 3) * 5);
            matZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, mat1Tur - 30) / 3) * 5);
            fen2TurPuan = fen2Tur >= 2 ? 10 : (fen2Tur === 1 ? 5 : 0);
            mat2TurPuan = mat2Tur >= 3 ? 15 : (mat2Tur === 2 ? 10 : (mat2Tur === 1 ? 5 : 0));
        } else {
            // 5, 6 ve 7. Sınıf Kademeli Süre & Strateji Disiplin Skoru
            const idealSure = config.grade === 5 ? 25 : 28;
            const fen1Tur = (deneme.fen1TurSure !== undefined && deneme.fen1TurSure !== null && deneme.fen1TurSure !== '') ? Number(deneme.fen1TurSure) : idealSure;
            const mat1Tur = (deneme.mat1TurSure !== undefined && deneme.mat1TurSure !== null && deneme.mat1TurSure !== '') ? Number(deneme.mat1TurSure) : idealSure;
            const fen2Tur = Number(deneme.fen2TurKazanc) || 0;
            const mat2Tur = Number(deneme.mat2TurKazanc) || 0;

            fenZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, fen1Tur - idealSure) / 3) * 5);
            matZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, mat1Tur - idealSure) / 3) * 5);
            fen2TurPuan = fen2Tur >= 1 ? 10 : 0;
            mat2TurPuan = mat2Tur >= 2 ? 15 : (mat2Tur === 1 ? 8 : 0);
        }

        // İnatlaşma Cezası (İdeal: 0 soru, her inatlaşılan soru -10p, maks 30p)
        const inatlasmaPuan = Math.max(0, 30 - (inatlasma * 10));

        // Optik / Son Kontrol Protokolü (Son 3-5 dk yapıldı mı: Evet 15p, Hayır 0p)
        const optikPuan = optik ? 15 : 0;

        const totalPuan = Math.min(100, Math.max(0, fenZamanPuan + matZamanPuan + inatlasmaPuan + fen2TurPuan + mat2TurPuan + optikPuan));

        let badgeText = 'Orta Düzey Dalgalanma';
        let badgeColor = '#92400e';
        let badgeBg = '#fef3c7';
        let badgeBorder = '#f59e0b';

        if (totalPuan >= 85) {
            badgeText = config.isLgsFinal ? 'Üst Düzey Stratejik Olgunluk' : 'Mükemmel Strateji Disiplini';
            badgeColor = '#065f46';
            badgeBg = '#d1fae5';
            badgeBorder = '#10b981';
        } else if (totalPuan < 70) {
            badgeText = config.isLgsFinal ? 'Kırmızı Alarm: Süre Yönetimi Çöküşü' : 'Dikkat: Süre & İnatlaşma Kaybı';
            badgeColor = '#991b1b';
            badgeBg = '#fee2e2';
            badgeBorder = '#ef4444';
        }

        return {
            tdePuan: totalPuan,
            fenZamanPuan,
            matZamanPuan,
            inatlasmaPuan,
            fen2TurPuan,
            mat2TurPuan,
            optikPuan,
            badgeText,
            badgeColor,
            badgeBg,
            badgeBorder
        };
    }
    window.calculateTDE = calculateTDE;

    /**
     * Spaced Repetition (Aralıklı Tekrar) Durum Belirleyici
     * 1 gün (24h), 3 gün (72h) ve 14 gün (336h) döngüsü
     */
    function getHataRepeatStatus(hata) {
        if (!hata) {
            return { status: 'none', label: 'Bilinmiyor', isDue: false, badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };
        }

        if (hata.tekrar1 && hata.tekrar3 && hata.tekrar14) {
            return { status: 'completed', label: '🟢 Kalıcılaştı', isDue: false, badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.12)' };
        }

        const now = Date.now();
        let createdMs = now;
        if (hata.createdAt) {
            createdMs = new Date(hata.createdAt).getTime();
        } else if (hata.tarih) {
            const parts = String(hata.tarih).split('.');
            if (parts.length === 3) {
                createdMs = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
            } else {
                createdMs = new Date(hata.tarih).getTime();
            }
        }
        if (isNaN(createdMs)) createdMs = now;

        const diffHours = (now - createdMs) / (1000 * 60 * 60);

        if (!hata.tekrar1) {
            if (diffHours >= 24) {
                return { status: 'due1', label: '🔴 1. Gün Tekrarı Gecikti / Bugün Çözülmeli', isDue: true, badgeColor: '#ef4444', badgeBg: 'rgba(239,68,68,0.12)' };
            }
            return { status: 'waiting1', label: '⏳ 1. Gün Tekrarı Bekleniyor', isDue: false, badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };
        }
        if (!hata.tekrar3) {
            if (diffHours >= 72) {
                return { status: 'due3', label: '🟠 3. Gün Tekrarı Geldi', isDue: true, badgeColor: '#f97316', badgeBg: 'rgba(249,115,22,0.12)' };
            }
            return { status: 'waiting3', label: '⏳ 3. Gün Tekrarı Bekleniyor', isDue: false, badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };
        }
        if (!hata.tekrar14) {
            if (diffHours >= 336) {
                return { status: 'due14', label: '🟣 14. Gün Kalıcılaştırma Tekrarı Geldi', isDue: true, badgeColor: '#8b5cf6', badgeBg: 'rgba(139,92,246,0.12)' };
            }
            return { status: 'waiting14', label: '⏳ 14. Gün Kalıcılaştırma Gelmedi', isDue: false, badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };
        }

        return { status: 'completed', label: '🟢 Kalıcılaştı', isDue: false, badgeColor: '#10b981', badgeBg: 'rgba(16,185,129,0.12)' };
    }
    window.getHataRepeatStatus = getHataRepeatStatus;

    /**
     * Kademeli Periyodizasyon (Faz Algılayıcı)
     * Öğrencinin sınıfına ve takvim ayına göre dinamik faz tespiti yapar:
     * - 8. Sınıf: Faz 1 (Eyl-Oca: Temel İnşa), Faz 2 (Şub-Mar: Branş Denemeleri & TDE), Faz 3 (Nis-May: Hata Eritme), Faz 4 (May-Haz: Biyolojik Ritim)
     * - 5-7. Sınıflar: Faz 1 (Eyl-Kas: Kitap Okuma & Rutin), Faz 2 (Ara-Oca: Mantık/Grafik & Yarıyıl), Faz 3 (Şub-Nis: Beceri Temelli & İOKBS), Faz 4 (May-Haz: Yıl Sonu & Üst Sınıf)
     */
    function getCurrentLgsPhase(sinifStr) {
        const config = getGradeCognitiveConfig(sinifStr);
        const month = new Date().getMonth(); // 0: Ocak, 1: Şubat, ..., 11: Aralık

        if (config.isLgsFinal) {
            // 8. Sınıf LGS Periyodizasyonu
            if (month === 1 || month === 2) {
                return {
                    id: 2,
                    name: 'Faz 2 (Şubat-Mart)',
                    title: 'Branş Denemeleri & Turlama Otomasyonu (Hedef: TDE >= 85)',
                    focus: 'Fen 32 dk / Mat 30 dk turlama otomasyonu, inatlaşma terki',
                    badgeBg: 'rgba(245, 158, 11, 0.12)',
                    badgeColor: '#d97706'
                };
            } else if (month === 3 || month === 4) {
                return {
                    id: 3,
                    name: 'Faz 3 (Nisan-Mayıs)',
                    title: 'Genel Deneme, Hata Eritme & Plato Kırma (%50+ İleri Muhakeme)',
                    focus: 'Genel denemeler, aralıklı tekrar hata eritme, %50+ ileri düzey beceri temelli sorular',
                    badgeBg: 'rgba(99, 102, 241, 0.12)',
                    badgeColor: '#6366f1'
                };
            } else if (month === 5) {
                return {
                    id: 4,
                    name: 'Faz 4 (Mayıs Sonu-Haziran)',
                    title: '09:30 Biyolojik Ritim, Sınav Zihni & Regülasyon',
                    focus: 'Sınav saatinde biyolojik uyanıklık, stres ve zihinsel regülasyon',
                    badgeBg: 'rgba(239, 68, 68, 0.12)',
                    badgeColor: '#ef4444'
                };
            } else {
                return {
                    id: 1,
                    name: 'Faz 1 (Eylül-Ocak)',
                    title: 'Temel İnşa & Okuma Direnci (40+10 dk Blok Odaklı)',
                    focus: 'Temel kavram inşası, uzun soru okuma direnci, derin odak blokları',
                    badgeBg: 'rgba(16, 185, 129, 0.12)',
                    badgeColor: '#10b981'
                };
            }
        } else {
            // 5, 6 ve 7. Sınıf Kademeli Bilişsel Periyodizasyonu
            if (month === 11 || month === 0) {
                return {
                    id: 2,
                    name: 'Faz 2 (Aralık-Ocak)',
                    title: 'Mantık/Grafik Temelleri & Yarıyıl Pekiştirme Kampı',
                    focus: 'Tablo/grafik okuma becerileri, analitik muhakeme ve yarıyıl eksik kapatma',
                    badgeBg: 'rgba(245, 158, 11, 0.12)',
                    badgeColor: '#d97706'
                };
            } else if (month >= 1 && month <= 3) {
                return {
                    id: 3,
                    name: 'Faz 3 (Şubat-Nisan)',
                    title: 'Beceri Temelliye Geçiş & İOKBS Bursluluk Deneme Provası',
                    focus: 'MEB beceri temelli soru çözümü, süre disiplini ve bursluluk provası',
                    badgeBg: 'rgba(99, 102, 241, 0.12)',
                    badgeColor: '#6366f1'
                };
            } else if (month === 4 || month === 5) {
                return {
                    id: 4,
                    name: 'Faz 4 (Mayıs-Haziran)',
                    title: 'Yıl Sonu Kazanım Yetkinliği & Bir Üst Sınıfa Hazırlık',
                    focus: 'Yıl sonu kazanım taraması, LGS temeli ve bir üst sınıfa güçlü zırhlanma',
                    badgeBg: 'rgba(239, 68, 68, 0.12)',
                    badgeColor: '#ef4444'
                };
            } else {
                return {
                    id: 1,
                    name: 'Faz 1 (Eylül-Kasım)',
                    title: 'Kitap Okuma & Bilişsel Rutin İnşası',
                    focus: 'Günlük okuma dayanıklılığı, Pomodoro odak blokları ve temel kavramlar',
                    badgeBg: 'rgba(16, 185, 129, 0.12)',
                    badgeColor: '#10b981'
                };
            }
        }
    }
    window.getCurrentLgsPhase = getCurrentLgsPhase;

    // ─────────────────────────────────────────────────────────────
    // 1. ANA MODÜL RENDER VE KARTLARI LİSTELEME
    // ─────────────────────────────────────────────────────────────
    function renderKoclukModule() {
        const container = document.getElementById('kocluk-cards-container');
        if (!container) return;

        const list = Array.isArray(window.koclukData) ? window.koclukData : [];
        const classFilter = document.getElementById('kocluk-class-filter')?.value || '';
        const phaseFilter = document.getElementById('kocluk-phase-filter')?.value || '';
        const searchInput = (document.getElementById('kocluk-search-input')?.value || '').toLocaleLowerCase('tr-TR').trim();

        // İstatistikleri Güncelle
        updateKoclukStatistics(list);
        populateKoclukClassFilter(list);

        // Filtreleme
        const filtered = list.filter(k => {
            if (classFilter && k.sinif !== classFilter && window.normSinif && window.normSinif(k.sinif) !== window.normSinif(classFilter)) {
                return false;
            }
            if (phaseFilter) {
                const sPhase = k.activePhase || getCurrentLgsPhase(k.sinif).id;
                if (String(sPhase) !== String(phaseFilter)) return false;
            }
            if (searchInput) {
                const searchHaystack = `${k.adSoyad} ${k.studentNo} ${k.sinif} ${k.hedefLise}`.toLocaleLowerCase('tr-TR');
                if (!searchHaystack.includes(searchInput)) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--card-bg); border-radius: 12px; border: 2px dashed var(--border);">
                    <div style="font-size: 3rem; margin-bottom: 12px; opacity: 0.6;">🧠</div>
                    <h3 style="margin: 0 0 8px 0; color: var(--text-main); font-size: 1.15rem;">Koçluk Listesinde Öğrenci Bulunmuyor</h3>
                    <p style="margin: 0 0 18px 0; color: var(--text-muted); font-size: 13px; max-width: 520px; margin-inline: auto;">
                        Ortaokul 5, 6, 7 ve 8. sınıf öğrencilerinizi koçluk havuzuna ekleyerek; kademeli soru kalite piramidi (Sweller &amp; Bloom), TDE süre disiplini, metabilişsel 4 kök neden teşhisi (John Flavell) ve yapay zeka destekli pedagojik rehberlik süreçlerini yönetebilirsiniz.
                    </p>
                    <button class="btn btn-primary" onclick="openAddKoclukModal()" style="padding: 10px 22px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
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
            const safeSinif = escapeFn(item.sinif || '8. Sınıf');
            const config = getGradeCognitiveConfig(item.sinif);
            const safeLise = escapeFn(item.hedefLise || config.defaultHedefOkul);
            const safeYuzdelik = escapeFn(item.hedefYuzdelik || (config.isLgsFinal ? '%1.0' : (config.grade === 7 ? '%2.0' : '%3.5')));
            
            // Öğrencinin güncel VAK öğrenme stilini çek
            let currentVak = item.vak || 'Analitik / Görsel';
            if (typeof studentData !== 'undefined' && Array.isArray(studentData)) {
                const sObj = studentData.find(s => String(s.no) === String(item.studentNo));
                if (sObj && (sObj.ogrenmeStili || sObj.vak)) {
                    currentVak = sObj.ogrenmeStili || sObj.vak;
                    item.vak = currentVak;
                }
            }
            const safeVak = escapeFn(currentVak);

            const baslangic = Number(item.baslangicNeti) || config.defaultBaslangicNet;
            const hedef = Number(item.hedefNet) || config.defaultHedefNet;

            // Son Net ve Son TDE Verisi (Sınıfa duyarlı motor)
            const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
            const sonNet = getStudentLatestNet(item);
            const progressPercent = Math.min(100, Math.max(0, Math.round(((sonNet - baslangic) / (Math.max(hedef - baslangic, 1))) * 100)));

            const tdeInfo = lastDeneme ? calculateTDE(lastDeneme, item.sinif) : { tdePuan: 75, badgeText: 'Henüz Deneme Yok', badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };

            // Bekleyen ve Gecikmiş Hata Tekrarları
            const allErrors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
            const dueErrors = allErrors.filter(h => getHataRepeatStatus(h).isDue).length;
            const uncompletedErrors = allErrors.filter(h => !h.tekrar1 || !h.tekrar3 || !h.tekrar14).length;

            let errorBadgeHtml = '';
            if (dueErrors > 0) {
                errorBadgeHtml = `<span style="background: #fee2e2; color: #991b1b; border: 1.5px solid #f87171; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(239, 68, 68, 0.2); animation: pulse 1.5s infinite;">
                    <i class="fas fa-bell"></i> ${dueErrors} Tekrar Günü Geldi!
                </span>`;
            } else if (uncompletedErrors > 0) {
                errorBadgeHtml = `<span style="background: #fef3c7; color: #92400e; border: 1.5px solid #fcd34d; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fas fa-clock"></i> ${uncompletedErrors} Süreçte
                </span>`;
            } else {
                errorBadgeHtml = `<span style="background: #d1fae5; color: #065f46; border: 1.5px solid #6ee7b7; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fas fa-check-double"></i> Pekiştirildi
                </span>`;
            }

            html += `
            <div class="kocluk-student-card" style="background: var(--card-bg); border: 1.5px solid var(--border); border-radius: 16px; padding: 18px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between; gap: 14px; position: relative; transition: all 0.25s ease;">
                
                <!-- Kart Başlık & Bilgi -->
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3); flex-shrink: 0;">
                                ${safeName.charAt(0)}
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 15.5px; color: var(--text-main); font-weight: 800; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                    ${safeName}
                                    <span style="font-size: 11px; font-weight: 700; color: #6366f1; background: rgba(99, 102, 241, 0.1); padding: 2px 7px; border-radius: 6px; border: 1px solid rgba(99, 102, 241, 0.25);">No: ${safeNo}</span>
                                </h4>
                                <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 11.5px; flex-wrap: wrap;">
                                    <span style="font-weight: 700; color: #0284c7; background: rgba(2, 132, 199, 0.08); padding: 2px 7px; border-radius: 5px; border: 1px solid rgba(2, 132, 199, 0.25);">
                                        <i class="fas fa-graduation-cap me-1"></i>${safeSinif}
                                    </span>
                                    <span style="font-weight: 700; color: #7c3aed; background: rgba(124, 58, 237, 0.08); padding: 2px 7px; border-radius: 5px; border: 1px solid rgba(124, 58, 237, 0.25);">
                                        <i class="fas fa-brain me-1"></i>${safeVak}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style="text-align: right; flex-shrink: 0;">
                            ${errorBadgeHtml}
                        </div>
                    </div>

                    <!-- Hedef Lise/Okul & TDE Rozetleri -->
                    <div style="background: var(--input-bg); border: 1px solid var(--border); border-radius: 10px; padding: 11px 13px; margin-bottom: 12px;">
                        <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #4f46e5; margin-bottom: 5px; display: flex; align-items: center; justify-content: space-between;">
                            <span><i class="fas fa-bullseye me-1"></i> ${config.isLgsFinal ? 'HEDEF LİSE' : 'HEDEF OKUL / LİSE'}</span>
                            <span style="color: #4338ca; font-size: 11px; font-weight: 800; background: rgba(99, 102, 241, 0.12); padding: 2px 7px; border-radius: 5px;">Dilim: ${safeYuzdelik}</span>
                        </div>
                        <div style="font-size: 13.5px; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 7px; display: flex; align-items: center; gap: 6px;" title="${safeLise}">
                            <i class="fas fa-school" style="color: #6366f1;"></i> ${safeLise}
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed var(--border); padding-top:7px; font-size:11.5px; flex-wrap: wrap; gap: 4px;">
                            <span style="color:var(--text-muted); font-weight:700;"><i class="fas fa-stopwatch me-1"></i> ${config.isLgsFinal ? 'Son TDE Skoru' : 'Süre & Strateji Skoru'}:</span>
                            <span style="background:${tdeInfo.badgeBg}; color:${tdeInfo.badgeColor}; border:1px solid ${tdeInfo.badgeBorder}; font-weight:800; padding:3px 9px; border-radius:6px; font-size:11px;">
                                ${lastDeneme ? `${tdeInfo.tdePuan}/100` : 'Belirsiz'} • ${tdeInfo.badgeText}
                            </span>
                        </div>
                    </div>

                    <!-- Net İlerleme Çubuğu -->
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; margin-bottom: 6px;">
                            <span style="color: var(--text-muted); font-weight: 600;">
                                Mevcut Net: <strong style="color: #059669; font-size: 15px; font-weight: 800;">${sonNet}</strong> <span style="font-size:11px; color:var(--text-muted);">/ ${config.maxNet || 90}</span>
                            </span>
                            <span style="color: var(--text-muted); font-weight: 600;">
                                Hedef: <strong style="color: #4f46e5; font-size: 15px; font-weight: 800;">${hedef}</strong> <span style="font-size:11px; color:var(--text-muted);">Net</span>
                            </span>
                        </div>
                        <div style="width: 100%; height: 9px; background: rgba(148, 163, 184, 0.2); border-radius: 10px; overflow: hidden; position: relative;">
                            <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #6366f1, #10b981); border-radius: 10px; transition: width 0.4s ease;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 5px;">
                            <span>Başlangıç: <strong style="color: var(--text-main); font-weight: 800;">${baslangic} Net</strong></span>
                            <span>Haftalık Soru: <strong style="color: #d97706; font-weight: 800;">${item.haftalikHedefSoru || config.defaultHedefSoru}</strong></span>
                        </div>
                    </div>
                </div>

                <!-- Aksiyon Butonları -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; border-top: 1px solid var(--border); padding-top: 12px;">
                    <button type="button" onclick="openKoclukDetailModal('${safeId}')" style="background: linear-gradient(135deg, #4f46e5, #4338ca); color: #ffffff; border: none; padding: 8px 10px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; box-shadow: 0 2px 6px rgba(79, 70, 229, 0.25); transition: all 0.2s ease;">
                        <i class="fas fa-sliders-h"></i> Süreç &amp; Kokpit
                    </button>
                    <button type="button" onclick="runAiCoachingForStudent('${safeId}')" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #ffffff; border: none; padding: 8px 10px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; box-shadow: 0 2px 6px rgba(139, 92, 246, 0.25); transition: all 0.2s ease;">
                        <i class="fas fa-brain"></i> AI Koçluk
                    </button>
                    <button type="button" onclick="openParentWhatsAppShareModal('${safeId}')" style="background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; border: none; padding: 8px 10px; font-size: 11.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25); transition: all 0.2s ease;">
                        <i class="fab fa-whatsapp" style="font-size: 13px;"></i> Veli Bülteni
                    </button>
                    <button type="button" onclick="deleteKoclukStudent('${safeId}')" style="background: rgba(239, 68, 68, 0.08); color: #dc2626; border: 1.5px solid rgba(239, 68, 68, 0.3); padding: 7px 10px; font-size: 11px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; cursor: pointer; transition: all 0.2s ease;">
                        <i class="fas fa-trash-alt"></i> Listeden Çıkar
                    </button>
                    <button type="button" onclick="openQuickWeeklySyncModal('${safeId}')" style="grid-column: 1 / -1; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; border: none; padding: 9px 12px; font-size: 12px; font-weight: 800; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; cursor: pointer; box-shadow: 0 3px 8px rgba(245, 158, 11, 0.3); transition: all 0.2s ease;">
                        <i class="fas fa-bolt"></i> ⚡ 60 Sn Hızlı Giriş &amp; Form Bas
                    </button>
                </div>

            </div>`;
        });

        container.innerHTML = html;
    }

    // ─────────────────────────────────────────────────────────────
    // 2. İSTATİSTİKLER VE SINIF FİLTRESİ
    // ─────────────────────────────────────────────────────────────
    function updateKoclukStatistics(list) {
        const totalEl = document.getElementById('koc-stat-total');
        const avgNetEl = document.getElementById('koc-stat-avg-net');
        const avgTargetEl = document.getElementById('koc-stat-avg-target');
        const avgTdeEl = document.getElementById('koc-stat-avg-tde');
        const errorsEl = document.getElementById('koc-stat-pending-errors');

        if (!totalEl) return;

        totalEl.textContent = list.length;

        if (list.length === 0) {
            if (avgNetEl) avgNetEl.textContent = '0';
            if (avgTargetEl) avgTargetEl.textContent = '0';
            if (avgTdeEl) avgTdeEl.textContent = '0/100';
            if (errorsEl) errorsEl.textContent = '0';
            return;
        }

        let totalCurrentNet = 0;
        let totalTargetNet = 0;
        let totalDueErrors = 0;
        let totalPendingErrors = 0;
        let totalTde = 0;
        let tdeCount = 0;

        list.forEach(k => {
            totalCurrentNet += getStudentLatestNet(k);
            totalTargetNet += (Number(k.hedefNet) || 85);
            (k.hataDefteri || []).forEach(h => {
                const rep = getHataRepeatStatus(h);
                if (rep.isDue) totalDueErrors++;
                if (!h.tekrar1 || !h.tekrar3 || !h.tekrar14) totalPendingErrors++;
            });
            if (Array.isArray(k.denemeler) && k.denemeler.length > 0) {
                const last = k.denemeler[k.denemeler.length - 1];
                const res = calculateTDE(last, k.sinif);
                totalTde += res.tdePuan;
                tdeCount++;
            }
        });

        if (avgNetEl) avgNetEl.textContent = (totalCurrentNet / list.length).toFixed(1);
        if (avgTargetEl) avgTargetEl.textContent = (totalTargetNet / list.length).toFixed(1);
        if (avgTdeEl) {
            avgTdeEl.textContent = tdeCount > 0 ? `${Math.round(totalTde / tdeCount)}/100` : '75/100';
        }
        if (errorsEl) {
            if (totalDueErrors > 0) {
                errorsEl.innerHTML = `<span style="color:#ef4444;">${totalDueErrors} Günü Gelmiş</span> <small style="font-size:13px; color:var(--text-muted); font-weight:500;">(${totalPendingErrors} toplam)</small>`;
            } else {
                errorsEl.textContent = totalPendingErrors;
            }
        }
    }

    function populateKoclukClassFilter(list) {
        const filterSelect = document.getElementById('kocluk-class-filter');
        if (!filterSelect) return;
        const currentVal = filterSelect.value;
        const classes = new Set();
        list.forEach(k => { if (k.sinif) classes.add(k.sinif); });

        let opts = '<option value="">Tüm Sınıflar</option>';
        Array.from(classes).sort().forEach(c => {
            const sel = (c === currentVal) ? 'selected' : '';
            opts += `<option value="${escapeFn(c)}" ${sel}>${escapeFn(c)}</option>`;
        });
        filterSelect.innerHTML = opts;
    }

    function getStudentLatestNet(kocItem) {
        if (Array.isArray(kocItem.denemeler) && kocItem.denemeler.length > 0) {
            const last = kocItem.denemeler[kocItem.denemeler.length - 1];
            if (last && typeof last.toplamNet !== 'undefined') {
                return Number(last.toplamNet);
            }
        }
        return Number(kocItem.baslangicNeti) || 70;
    }

    // ─────────────────────────────────────────────────────────────
    // 3. ÖĞRENCİ EKLEME MODALI VE İŞLEMLERİ
    // ─────────────────────────────────────────────────────────────
    function openAddKoclukModal() {
        const modal = document.getElementById('kocluk-add-modal');
        if (!modal) return;

        const classSelect = document.getElementById('koc-add-class-select');
        const studentSelect = document.getElementById('koc-add-student-select');

        if (classSelect && typeof studentData !== 'undefined') {
            const classes = new Set();
            studentData.forEach(s => { if (s.sinif) classes.add(s.sinif); });
            let classOpts = '<option value="">-- Sınıf Seçin (5-8) --</option>';
            Array.from(classes).sort().forEach(c => {
                const sStr = String(c).trim();
                let badge = '';
                if (sStr.startsWith('8')) badge = '🎯 (8. Sınıf LGS Grubu)';
                else if (sStr.startsWith('7')) badge = '🛡️ (7. Sınıf Ön LGS Çıraklığı)';
                else if (sStr.startsWith('6')) badge = '📐 (6. Sınıf Analitik Muhakeme)';
                else if (sStr.startsWith('5')) badge = '🌱 (5. Sınıf Bilişsel Temel)';
                const isEight = sStr.startsWith('8');
                classOpts += `<option value="${escapeFn(c)}" ${isEight ? 'style="font-weight:bold;color:var(--secondary);"' : ''}>${escapeFn(c)} ${badge}</option>`;
            });
            classSelect.innerHTML = classOpts;
        }

        if (studentSelect) {
            studentSelect.innerHTML = '<option value="">-- Önce Sınıf Seçiniz --</option>';
        }

        const defaultCfg = getGradeCognitiveConfig('8. Sınıf');
        document.getElementById('koc-add-lise').value = defaultCfg.defaultHedefOkul;
        document.getElementById('koc-add-yuzdelik').value = '%1.0';
        document.getElementById('koc-add-baslangic-net').value = defaultCfg.defaultBaslangicNet;
        document.getElementById('koc-add-hedef-net').value = defaultCfg.defaultHedefNet;
        document.getElementById('koc-add-soru-hedef').value = defaultCfg.defaultHedefSoru;
        document.getElementById('koc-add-notlar').value = '';

        modal.style.display = 'flex';
    }

    function onKoclukClassChange() {
        const classSelect = document.getElementById('koc-add-class-select');
        const studentSelect = document.getElementById('koc-add-student-select');
        if (!classSelect || !studentSelect) return;

        const selClass = classSelect.value;
        if (!selClass || typeof studentData === 'undefined') {
            studentSelect.innerHTML = '<option value="">-- Önce Sınıf Seçiniz --</option>';
            return;
        }

        // Seçilen kademeye göre hedef ve soru parametrelerini dinamik yükle
        const cfg = getGradeCognitiveConfig(selClass);
        const liseInput = document.getElementById('koc-add-lise');
        const yuzdelikInput = document.getElementById('koc-add-yuzdelik');
        const baslangicInput = document.getElementById('koc-add-baslangic-net');
        const hedefInput = document.getElementById('koc-add-hedef-net');
        const soruHedefInput = document.getElementById('koc-add-soru-hedef');

        if (liseInput) liseInput.value = cfg.defaultHedefOkul;
        if (yuzdelikInput) yuzdelikInput.value = cfg.isLgsFinal ? '%1.0' : (cfg.grade === 7 ? '%2.0' : '%3.5');
        if (baslangicInput) baslangicInput.value = cfg.defaultBaslangicNet;
        if (hedefInput) hedefInput.value = cfg.defaultHedefNet;
        if (soruHedefInput) soruHedefInput.value = cfg.defaultHedefSoru;

        const norm = window.normSinif || (s => s);
        const filtered = studentData.filter(s => norm(s.sinif) === norm(selClass));

        let studentOpts = '<option value="">-- Öğrenci Seçiniz --</option>';
        filtered.forEach(s => {
            const alreadyIn = (window.koclukData || []).some(k => String(k.studentNo) === String(s.no));
            const badge = alreadyIn ? ' (Zaten Koçlukta)' : '';
            studentOpts += `<option value="${escapeFn(s.no)}" ${alreadyIn ? 'disabled style="color:gray;"' : ''}>${escapeFn(s.no)} - ${escapeFn(s.adSoyad)}${badge}</option>`;
        });
        studentSelect.innerHTML = studentOpts;
    }

    function onKoclukStudentSelectChange() {
        const studentSelect = document.getElementById('koc-add-student-select');
        if (!studentSelect || !studentSelect.value) return;

        const sid = studentSelect.value;
        const student = (typeof studentData !== 'undefined') ? studentData.find(s => String(s.no) === String(sid)) : null;
        if (!student) return;

        const cfg = getGradeCognitiveConfig(student.sinif);

        if (typeof examData !== 'undefined' && Array.isArray(examData) && examData.length > 0) {
            let totalNetSum = 0;
            let count = 0;
            examData.forEach(ex => {
                if (!ex.results) return;
                const r = ex.results[student.adSoyad] || Object.values(ex.results).find(res => String(res.no) === String(student.no));
                if (r && r.totalNet) {
                    totalNetSum += Number(r.totalNet);
                    count++;
                }
            });
            if (count > 0) {
                const avg = Math.round(totalNetSum / count);
                document.getElementById('koc-add-baslangic-net').value = avg;
                document.getElementById('koc-add-hedef-net').value = Math.min(cfg.maxNet, avg + (cfg.isLgsFinal ? 14 : 10));
                if (typeof showGlobalToast === 'function') {
                    showGlobalToast(`📊 ${student.sinif || 'Sınav'} Analiz kayıtlarından ${student.adSoyad} için ${count} adet sınav tespit edildi ve netleri aktarıldı.`, 'info');
                }
            }
        }
    }

    function saveNewKoclukStudent() {
        const studentSelect = document.getElementById('koc-add-student-select');
        const sid = studentSelect?.value;
        if (!sid) {
            alert('Lütfen koçluk havuzuna eklenecek öğrenciyi seçiniz!');
            return;
        }

        const student = (typeof studentData !== 'undefined') ? studentData.find(s => String(s.no) === String(sid)) : null;
        if (!student) {
            alert('Öğrenci verisi bulunamadı.');
            return;
        }

        const cfg = getGradeCognitiveConfig(student.sinif);
        const lise = document.getElementById('koc-add-lise')?.value.trim() || cfg.defaultHedefOkul;
        const yuzdelik = document.getElementById('koc-add-yuzdelik')?.value.trim() || (cfg.isLgsFinal ? '%1.0' : '%2.5');
        const baslangic = Number(document.getElementById('koc-add-baslangic-net')?.value) || cfg.defaultBaslangicNet;
        const hedef = Number(document.getElementById('koc-add-hedef-net')?.value) || cfg.defaultHedefNet;
        const soruHedef = Number(document.getElementById('koc-add-soru-hedef')?.value) || cfg.defaultHedefSoru;
        const notlar = document.getElementById('koc-add-notlar')?.value.trim() || '';

        // Sınav Analiz modülünden bu öğrenciye ait tüm geçmiş denemeleri topla
        const studentExams = [];
        if (typeof examData !== 'undefined' && Array.isArray(examData)) {
            examData.forEach(exam => {
                if (!exam.results) return;
                Object.entries(exam.results).forEach(([sKey, res]) => {
                    const match = (String(student.no) === String(res.no)) || 
                                  (student.adSoyad.toLocaleLowerCase('tr-TR').trim() === String(sKey).toLocaleLowerCase('tr-TR').trim());
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
                        const examDateStr = exam.date ? new Date(exam.date).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR');

                        const denObj = {
                            id: 'den_exam_' + exam.id,
                            examId: String(exam.id),
                            source: 'exam_module',
                            ad: exam.title,
                            tarih: examDateStr,
                            sozelNet: sozel,
                            sayisalNet: parseFloat((mat + fen).toFixed(2)),
                            matNet: mat,
                            matematik: mat,
                            fenNet: fen,
                            fen: fen,
                            toplamNet: topNet,
                            turkce: tr,
                            inkilap: sos,
                            sosyal: sos,
                            din: din,
                            ingilizce: ing,
                            rank: res.rank || '-',
                            cozumSirasi: 'Fen-Mat',
                            fen1TurSure: cfg.grade === 5 ? 25 : (cfg.grade === 8 ? 32 : 28),
                            mat1TurSure: cfg.grade === 5 ? 25 : (cfg.grade === 8 ? 30 : 28),
                            inatlasmaSayisi: 0,
                            fen2TurKazanc: 2,
                            mat2TurKazanc: 2,
                            optikKontrol: true,
                            tdePuan: 75
                        };
                        if (typeof calculateTDE === 'function') {
                            denObj.tdePuan = calculateTDE(denObj, student.sinif).tdePuan;
                        }
                        studentExams.push(denObj);
                    }
                });
            });
        }

        studentExams.sort((a, b) => {
            const parseD = str => {
                if (!str) return 0;
                const parts = String(str).split('.');
                if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
                return new Date(str).getTime() || 0;
            };
            return parseD(a.tarih) - parseD(b.tarih);
        });

        const initialDeneme = {
            id: 'den_' + Date.now(),
            ad: `${cfg.gradeLabel} Başlangıç Düzey Tespit Denemesi`,
            tarih: new Date().toLocaleDateString('tr-TR'),
            sozelNet: Math.round(baslangic * 0.6),
            sayisalNet: Math.round(baslangic * 0.4),
            matNet: Math.round(baslangic * 0.2),
            fenNet: Math.round(baslangic * 0.2),
            toplamNet: baslangic,
            cozumSirasi: 'Fen-Mat',
            fen1TurSure: cfg.grade === 5 ? 25 : (cfg.grade === 8 ? 32 : 28),
            mat1TurSure: cfg.grade === 5 ? 25 : (cfg.grade === 8 ? 30 : 28),
            inatlasmaSayisi: 1,
            fen2TurKazanc: 1,
            mat2TurKazanc: 1,
            optikKontrol: true,
            tdePuan: 75
        };
        initialDeneme.tdePuan = calculateTDE(initialDeneme, student.sinif).tdePuan;

        const initialDenemeler = studentExams.length > 0 ? studentExams : [initialDeneme];

        const newRecord = {
            id: 'koc_' + Date.now(),
            studentNo: String(student.no),
            adSoyad: student.adSoyad,
            sinif: student.sinif || '8. Sınıf',
            vak: student.ogrenmeStili || student.vak || 'Görsel/Analitik',
            hedefLise: lise,
            hedefYuzdelik: yuzdelik,
            baslangicNeti: baslangic,
            hedefNet: hedef,
            haftalikHedefSoru: soruHedef,
            bilesenNotu: notlar,
            hataDefteri: [],
            gorusmeler: [
                {
                    id: 'g_' + Date.now(),
                    tarih: new Date().toLocaleDateString('tr-TR'),
                    konu: cfg.isLgsFinal ? 'LGS Koçluk Başlangıç & Hedef Analiz Toplantısı' : `${cfg.gradeLabel} Bilişsel Koçluk Başlangıç & Hedef Analizi`,
                    notlar: `Öğrencinin başlangıç neti ${baslangic}, hedefi ${hedef} net (${lise}) olarak belirlendi. Kademeli soru kalitesi piramidi ve TDE stratejisi devreye alındı.`,
                    dayaniklikPuani: 4
                }
            ],
            denemeler: initialDenemeler,
            createdAt: new Date().toISOString()
        };

        if (!Array.isArray(window.koclukData)) window.koclukData = [];
        window.koclukData.push(newRecord);
        if (typeof koclukData !== 'undefined') koclukData = window.koclukData;

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`🎯 ${student.adSoyad} (${student.sinif}) başarıyla Bilişsel Koçluk havuzuna eklendi!`, 'success');
        }

        closeModal('kocluk-add-modal');
        renderKoclukModule();
    }

    function deleteKoclukStudent(kocId) {
        if (!confirm('Bu öğrenciyi koçluk takip havuzundan çıkarmak istediğinize emin misiniz? (Hata defteri, denemeler ve görüşme kayıtları silinecektir)')) {
            return;
        }

        if (Array.isArray(window.koclukData)) {
            window.koclukData = window.koclukData.filter(k => String(k.id) !== String(kocId));
            if (typeof koclukData !== 'undefined') koclukData = window.koclukData;
            if (typeof saveData === 'function') saveData(true);
            if (typeof showGlobalToast === 'function') {
                showGlobalToast('Öğrenci koçluk listesinden çıkarıldı.', 'warning');
            }
            renderKoclukModule();
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. ÖĞRENCİ KOÇLUK KOKPİTİ (DETAY MODALI)
    // ─────────────────────────────────────────────────────────────
    function openKoclukDetailModal(kocId) {
        activeKoclukId = kocId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const modal = document.getElementById('kocluk-detail-modal');
        if (!modal) return;

        const titleEl = document.getElementById('koc-detail-title');
        const badgeEl = document.getElementById('koc-detail-badge');
        if (titleEl) titleEl.innerHTML = `<i class="fas fa-user-astronaut me-2" style="color:var(--secondary);"></i> ${escapeFn(item.adSoyad)}`;
        if (badgeEl) badgeEl.textContent = `${item.sinif} - No: ${item.studentNo} | Hedef: ${item.hedefLise}`;

        // Üst Bar Aksiyon Butonlarını Bağla
        const printCenterBtn = document.getElementById('btn-open-print-center');
        if (printCenterBtn) {
            printCenterBtn.onclick = () => openKoclukPrintCenter(kocId);
        }
        const quickSyncBtn = document.getElementById('btn-quick-sync-modal');
        if (quickSyncBtn) {
            quickSyncBtn.onclick = () => openQuickWeeklySyncModal(kocId);
        }
        // ── ONE-LOOK PULSE (TEK BAKIŞTA NABIZ) HESAPLAMA VE RENDER ──
        const pulseBar = document.getElementById('koc-detail-pulse-bar');
        if (pulseBar) {
            const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];
            const lastDen = denemeler.length > 0 ? denemeler[denemeler.length - 1] : null;
            const prevDen = denemeler.length > 1 ? denemeler[denemeler.length - 2] : null;

            // 1. Plato / Trend Sinyali
            let trendHtml = '';
            if (lastDen && prevDen) {
                const diff = Math.round(((lastDen.toplamNet || 0) - (prevDen.toplamNet || 0)) * 100) / 100;
                if (diff > 0) {
                    trendHtml = `<span style="background:rgba(16,185,129,0.12); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:4px 9px; border-radius:6px; font-weight:700;"><i class="fas fa-arrow-up me-1"></i> Trend: +${diff} Net Yükselişte</span>`;
                } else if (diff === 0) {
                    trendHtml = `<span style="background:rgba(245,158,11,0.12); color:#d97706; border:1px solid rgba(245,158,11,0.3); padding:4px 9px; border-radius:6px; font-weight:700;"><i class="fas fa-minus me-1"></i> Sinyal: Plato / Duraksama</span>`;
                } else {
                    trendHtml = `<span style="background:rgba(239,68,68,0.12); color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:4px 9px; border-radius:6px; font-weight:700;"><i class="fas fa-arrow-down me-1"></i> Sinyal: ${diff} Net Düşüş (İncele)</span>`;
                }
            } else if (lastDen) {
                trendHtml = `<span style="background:rgba(99,102,241,0.12); color:#6366f1; border:1px solid rgba(99,102,241,0.3); padding:4px 9px; border-radius:6px; font-weight:700;">🎯 Son Net: ${lastDen.toplamNet || 0}/90</span>`;
            } else {
                trendHtml = `<span style="background:rgba(148,163,184,0.15); color:var(--text-muted); border:1px solid var(--border); padding:4px 9px; border-radius:6px; font-weight:600;">Deneme Kaydı Bekleniyor</span>`;
            }

            // 2. TDE Rozeti ve Temel Süre Kaybı
            let tdeHtml = '';
            if (lastDen) {
                const tde = calculateTDE(lastDen);
                const inatTxt = (lastDen.inatlasmaSayisi && lastDen.inatlasmaSayisi > 0) ? ` • ${lastDen.inatlasmaSayisi} İnatlaşma!` : '';
                tdeHtml = `<span style="background:${tde.badgeBg}; color:${tde.badgeColor}; border:1px solid ${tde.badgeBorder}; padding:4px 9px; border-radius:6px; font-weight:800;" title="Fen 1. Tur: ${lastDen.fen1TurSure || 32}dk, Mat 1. Tur: ${lastDen.mat1TurSure || 30}dk"><i class="fas fa-stopwatch me-1"></i> TDE: ${tde.tdePuan}/100 (${tde.badgeText}${inatTxt})</span>`;
            } else {
                tdeHtml = `<span style="background:rgba(245,158,11,0.12); color:#f59e0b; border:1px solid rgba(245,158,11,0.3); padding:4px 9px; border-radius:6px; font-weight:700;">TDE: 75/100 (Başlangıç)</span>`;
            }

            // 3. Acil Hata Defteri Sayacı (1-3-14 Gün)
            const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
            const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue);
            let errorHtml = '';
            if (dueErrors.length > 0) {
                errorHtml = `<span style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.4); padding:4px 9px; border-radius:6px; font-weight:800;"><i class="fas fa-exclamation-triangle me-1"></i> 🚨 ${dueErrors.length} Hata Tekrarda Gecikti!</span>`;
            } else if (errors.length > 0) {
                errorHtml = `<span style="background:rgba(16,185,129,0.12); color:#10b981; border:1px solid rgba(16,185,129,0.3); padding:4px 9px; border-radius:6px; font-weight:700;"><i class="fas fa-check-circle me-1"></i> Tekrarlar Düzenli (${errors.length} Hata)</span>`;
            } else {
                errorHtml = `<span style="background:rgba(148,163,184,0.15); color:var(--text-muted); border:1px solid var(--border); padding:4px 9px; border-radius:6px; font-weight:600;"><i class="fas fa-book me-1"></i> Hata Defteri Boş</span>`;
            }

            pulseBar.innerHTML = `
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <strong style="color:var(--text-muted); font-size:11px; text-transform:uppercase; letter-spacing:0.5px;"><i class="fas fa-heartbeat text-danger me-1"></i> Koçluk Nabzı:</strong>
                    ${trendHtml}
                    ${tdeHtml}
                    ${errorHtml}
                </div>
                <div style="font-size:11px; color:var(--text-muted); font-weight:600;">
                    <span style="color:var(--primary); font-weight:700;"><i class="fas fa-flag-checkered me-1"></i> Hedef:</span> ${item.hedefNet} Net
                </div>
            `;
            pulseBar.style.display = 'flex';
        }

        switchDetailSubTab('tab-koc-profil');
        modal.style.display = 'flex';
    }

    function switchDetailSubTab(tabId) {
        activeDetailSubTab = tabId;
        document.querySelectorAll('.koc-subtab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.koc-subtab-content').forEach(c => c.style.display = 'none');

        const btn = document.getElementById('btn-' + tabId);
        const content = document.getElementById(tabId);
        if (btn) btn.classList.add('active');
        if (content) content.style.display = 'block';

        const item = (window.koclukData || []).find(k => String(k.id) === String(activeKoclukId));
        if (!item) return;

        if (tabId === 'tab-koc-profil') renderSubTabProfil(item);
        if (tabId === 'tab-koc-hata') renderSubTabHataDefteri(item);
        if (tabId === 'tab-koc-deneme') renderSubTabDenemeler(item);
        if (tabId === 'tab-koc-gorusme') renderSubTabGorusmeler(item);
        if (tabId === 'tab-koc-ai') renderSubTabAiPrompt(item);
    }

    // --- ALT SEKME 1: PROFİL VE HEDEFLER ---
    function renderSubTabProfil(item) {
        const container = document.getElementById('koc-subtab-profil-body');
        if (!container) return;

        const config = getGradeCognitiveConfig(item.sinif);

        // Soru Kalite Piramidi & Konfor Alanı Hesabı (Sınıf Kademesine Duyarlı)
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const defaultKavrama = Math.round(config.defaultHedefSoru * (config.idealPiramit.kavrama / 100));
        const defaultOrta = Math.round(config.defaultHedefSoru * (config.idealPiramit.orta / 100));
        const defaultYeni = Math.round(config.defaultHedefSoru * (config.idealPiramit.yeniNesil / 100));

        const kavrama = lastTakip ? (Number(lastTakip.kavramaCount) || Math.round((Number(lastTakip.kazanimSoru) || defaultKavrama) * 0.4)) : defaultKavrama;
        const orta = lastTakip ? (Number(lastTakip.ortaCount) || Math.round((Number(lastTakip.kazanimSoru) || defaultOrta) * 0.6)) : defaultOrta;
        const yeniNesil = lastTakip ? (Number(lastTakip.yeniNesilCount) || Number(lastTakip.yeniNesilSoru) || defaultYeni) : defaultYeni;
        const totalHaftalikSoru = Math.max(1, kavrama + orta + yeniNesil);
        const kavramaYuzde = Math.round((kavrama / totalHaftalikSoru) * 100);
        const ortaYuzde = Math.round((orta / totalHaftalikSoru) * 100);
        const yeniNesilYuzde = Math.round((yeniNesil / totalHaftalikSoru) * 100);
        const isKonforAlani = (yeniNesil / totalHaftalikSoru) < config.konforThreshold;

        const phase = getCurrentLgsPhase(item.sinif);

        let konforAlaniHtml = '';
        if (isKonforAlani) {
            konforAlaniHtml = `
            <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; border-radius:8px; padding:12px 14px; margin-top:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#ef4444; font-size:12.5px;"><i class="fas fa-exclamation-triangle me-1"></i> ⚠️ Konfor Alanı Tuzağı / Psödo-Çalışma Alarmı!</strong>
                    <span style="background:rgba(239,68,68,0.15); color:#ef4444; padding:2px 8px; border-radius:4px; font-size:10.5px; font-weight:800;">Yeni Nesil: %${yeniNesilYuzde} &lt; %${Math.round(config.konforThreshold * 100)}</span>
                </div>
                <p style="margin:4px 0 0 0; font-size:12px; color:var(--text-main); line-height:1.45;">
                    Öğrenci haftalık soru sayısını kolay/orta kazanım sorularıyla şişirmektedir. <strong>${config.stageTitle} gereği, Beceri Temelli Yeni Nesil soru oranı minimum %${config.idealPiramit.yeniNesil}'e çıkarılmalıdır.</strong>
                </p>
            </div>`;
        }

        container.innerHTML = `
            <!-- Aktif Pedagojik Faz & Strateji Bandı -->
            <div style="background:linear-gradient(135deg, rgba(99,102,241,0.06), rgba(16,185,129,0.06)); border:1px solid var(--border); border-radius:10px; padding:14px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <span style="background:${phase.badgeBg}; color:${phase.badgeColor}; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:800; text-transform:uppercase;">
                        📅 ${phase.name} • ${config.stageTitle}
                    </span>
                    <h4 style="margin:4px 0 0 0; font-size:13.5px; color:var(--text-main);">${phase.title}</h4>
                    <p style="margin:2px 0 0 0; font-size:11.5px; color:var(--text-muted);">${phase.focus}</p>
                </div>
                <div style="text-align:right;">
                    <button class="btn btn-warning btn-sm" onclick="openQuickWeeklySyncModal('${item.id}')" style="font-weight:700; border-radius:6px; padding:6px 12px; font-size:12px;">
                        <i class="fas fa-bolt me-1"></i> 60 Sn Hızlı Giriş
                    </button>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                <!-- Sol Kolon: Hedef ve Parametreler -->
                <div class="form-box" style="margin:0;">
                    <h5 style="margin:0 0 12px 0; color:var(--primary); font-size:13.5px;"><i class="fas fa-bullseye me-2"></i> Hedef ve Bilişsel Parametreler</h5>
                    
                    <div class="form-group" style="margin-bottom:10px; background:rgba(99,102,241,0.06); padding:10px 12px; border-radius:8px; border:1px solid rgba(99,102,241,0.25);">
                        <label style="font-size:11.5px; font-weight:800; color:#4f46e5; display:flex; align-items:center; gap:6px;">
                            <i class="fas fa-flag"></i> BU HAFTANIN TEK STRATEJİK KURALI:
                        </label>
                        <input type="text" id="koc-edit-strateji" value="${escapeFn(item.aktifStratejiKurali || (config.isLgsFinal ? 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.' : 'Çözemediğin soruyla 2 dakikadan fazla inatlaşma, işaretleyip turlamaya devam et.'))}" placeholder="Örn: 120 saniyeyi aşan soruya [?] koyup geç." style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:var(--text-main); font-size:12px;">
                    </div>

                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">${config.isLgsFinal ? 'HEDEF LİSE:' : 'HEDEF OKUL / LİSE:'}</label>
                        <input type="text" id="koc-edit-lise" value="${escapeFn(item.hedefLise || config.defaultHedefOkul)}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">HEDEF YÜZDELİK DİLİM:</label>
                        <input type="text" id="koc-edit-yuzdelik" value="${escapeFn(item.hedefYuzdelik || (config.isLgsFinal ? '%1.0' : '%2.5'))}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                        <div class="form-group" style="margin:0;">
                            <label style="font-size:11.5px; font-weight:700;">BAŞLANGIÇ NET:</label>
                            <input type="number" id="koc-edit-baslangic" value="${item.baslangicNeti || config.defaultBaslangicNet}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div class="form-group" style="margin:0;">
                            <label style="font-size:11.5px; font-weight:700;">HEDEF NET:</label>
                            <input type="number" id="koc-edit-hedef" value="${item.hedefNet || config.defaultHedefNet}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">HAFTALIK HEDEF SORU SAYISI:</label>
                        <input type="number" id="koc-edit-soru-hedef" value="${item.haftalikHedefSoru || config.defaultHedefSoru}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                </div>

                <!-- Sağ Kolon: Soru Piramidi & Koçluk Notu -->
                <div class="form-box" style="margin:0; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <h5 style="margin:0 0 12px 0; color:var(--secondary); font-size:13.5px;"><i class="fas fa-layer-group me-2"></i> Soru Kalite Piramidi &amp; Odak Dengesi</h5>
                        
                        <!-- Soru Piramidi Dağılımı (Sınıfa Göre 3 Kademeli) -->
                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px;">
                            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
                                <span style="font-weight:700; color:#3b82f6;">Kavrama: ${kavrama} (%${kavramaYuzde})</span>
                                <span style="font-weight:700; color:#d97706;">Orta: ${orta} (%${ortaYuzde})</span>
                                <span style="font-weight:700; color:#8b5cf6;">Yeni Nesil: ${yeniNesil} (%${yeniNesilYuzde})</span>
                            </div>
                            <div style="width:100%; height:12px; background:var(--border); border-radius:6px; overflow:hidden; display:flex;">
                                <div style="width:${kavramaYuzde}%; background:#3b82f6;" title="Kavrama/Temel (%${config.idealPiramit.kavrama} İdeal)"></div>
                                <div style="width:${ortaYuzde}%; background:#d97706;" title="Uygulama/Orta (%${config.idealPiramit.orta} İdeal)"></div>
                                <div style="width:${yeniNesilYuzde}%; background:#8b5cf6;" title="Yeni Nesil Beceri Temelli (%${config.idealPiramit.yeniNesil} İdeal)"></div>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); margin-top:4px;">
                                <span>Hedef: %${config.idealPiramit.kavrama} Kavrama</span>
                                <span>Hedef: %${config.idealPiramit.orta} Orta</span>
                                <span>Hedef: %${config.idealPiramit.yeniNesil} Beceri Temelli</span>
                            </div>
                            ${konforAlaniHtml}
                        </div>

                        <div class="form-group" style="margin-bottom:10px;">
                            <label style="font-size:11.5px; font-weight:700;">ÖĞRENME STİLİ (VAK):</label>
                            <input type="text" id="koc-edit-vak" value="${escapeFn(item.vak || 'Analitik / Görsel')}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div class="form-group" style="margin-bottom:12px;">
                            <label style="font-size:11.5px; font-weight:700;">GÜÇLÜ YÖNLER VE GELİŞİM ALANLARI:</label>
                            <textarea id="koc-edit-notlar" rows="3" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border); font-size:12.5px; line-height:1.5;">${escapeFn(item.bilesenNotu || '')}</textarea>
                        </div>
                    </div>

                    <button class="btn btn-primary" onclick="saveKoclukProfileChanges()" style="width:100%; padding:9px; font-weight:700; border-radius:6px;">
                        <i class="fas fa-save me-1"></i> Parametre Değişikliklerini Kaydet
                    </button>
                </div>
            </div>
        `;
    }

    function saveKoclukProfileChanges() {
        const item = (window.koclukData || []).find(k => String(k.id) === String(activeKoclukId));
        if (!item) return;

        item.aktifStratejiKurali = document.getElementById('koc-edit-strateji')?.value.trim() || item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.';
        item.hedefLise = document.getElementById('koc-edit-lise')?.value.trim() || item.hedefLise;
        item.hedefYuzdelik = document.getElementById('koc-edit-yuzdelik')?.value.trim() || item.hedefYuzdelik;
        item.baslangicNeti = Number(document.getElementById('koc-edit-baslangic')?.value) || item.baslangicNeti;
        item.hedefNet = Number(document.getElementById('koc-edit-hedef')?.value) || item.hedefNet;
        item.haftalikHedefSoru = Number(document.getElementById('koc-edit-soru-hedef')?.value) || item.haftalikHedefSoru;
        item.vak = document.getElementById('koc-edit-vak')?.value.trim() || item.vak;
        item.bilesenNotu = document.getElementById('koc-edit-notlar')?.value.trim() || '';

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Öğrenci koçluk profili ve strateji kuralı güncellendi.', 'success');
        }
        renderKoclukModule();
    }

    // --- ALT SEKME 2: METABİLİŞSEL HATA DEFTERİ (KÖK NEDEN DAĞILIMI, REÇETE & SPACED REPETITION) ---
    function renderSubTabHataDefteri(item) {
        const container = document.getElementById('koc-subtab-hata-body');
        if (!container) return;

        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];

        // 1. Kök Neden Dağılımını Hesapla
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        errors.forEach(e => {
            const code = (e.kokNeden || 'A').toUpperCase();
            if (counts[code] !== undefined) counts[code]++;
            else counts.A++;
        });
        const total = errors.length;
        const pA = total > 0 ? Math.round((counts.A / total) * 100) : 0;
        const pB = total > 0 ? Math.round((counts.B / total) * 100) : 0;
        const pC = total > 0 ? Math.round((counts.C / total) * 100) : 0;
        const pD = total > 0 ? Math.max(0, 100 - pA - pB - pC) : 0;

        // 2. Cerrahi Reçete Teşhisi (En Yüksek Oranlı Kök Neden)
        let dominantCode = 'A';
        let maxCount = counts.A;
        ['B', 'C', 'D'].forEach(c => {
            if (counts[c] > maxCount) {
                maxCount = counts[c];
                dominantCode = c;
            }
        });

        let receteHtml = '';
        if (total === 0) {
            receteHtml = `
                <div style="background:var(--input-bg); border-left:4px solid var(--secondary); padding:10px 14px; border-radius:6px; font-size:12px; color:var(--text-muted);">
                    <i class="fas fa-info-circle me-1"></i> Henüz hata kaydı girilmedi. Öğrencinin denemelerde ve testlerde çözemediği soruları eklediğinizde yapay zeka cerrahi reçeteyi otomatik sentezleyecektir.
                </div>`;
        } else if (dominantCode === 'A') {
            receteHtml = `
                <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; border-radius:6px; padding:12px 14px; font-size:12.5px;">
                    <strong style="color:#ef4444;"><i class="fas fa-microscope me-1"></i> Cerrahi Reçete (%${pA} - Kod A Bilgi Eksikliği):</strong>
                    Öğrenci temel kavram ve kazanım basamağında takılmaktadır. <em>Öncelikli Eylem:</em> Yeni nesil soru çözümü geçici olarak azaltılmalı; konu özeti çıkarma ve MEB kazanım kavrama testleri çözümü zorunlu kılınmalıdır.
                </div>`;
        } else if (dominantCode === 'B') {
            receteHtml = `
                <div style="background:rgba(245,158,11,0.08); border-left:4px solid #f59e0b; border-radius:6px; padding:12px 14px; font-size:12.5px;">
                    <strong style="color:#f59e0b;"><i class="fas fa-search me-1"></i> Cerrahi Reçete (%${pB} - Kod B Soru Kurgusu/Okuma):</strong>
                    Öğrenci konuyu bilmekte ancak öncül kurgusunu, olumsuz soru köklerini veya grafik eksenlerini yanlış okumaktadır. <em>Öncelikli Eylem:</em> Sorularda "değildir/çıkarılamaz" ifadelerinin altını çizme ve deney değişkenlerini (bağımsız/kontrol) daire içine alma antrenmanı yapılmalıdır.
                </div>`;
        } else if (dominantCode === 'C') {
            receteHtml = `
                <div style="background:rgba(249,115,22,0.08); border-left:4px solid #ea580c; border-radius:6px; padding:12px 14px; font-size:12.5px;">
                    <strong style="color:#ea580c;"><i class="fas fa-stopwatch me-1"></i> Cerrahi Reçete (%${pC} - Kod C Süre Baskısı/İşlem Hatası):</strong>
                    Öğrenci süre yetmeme kaygısıyla acele etmekte ve dört işlem/satır atlama hatası yapmaktadır. <em>Öncelikli Eylem:</em> Branş denemelerinde son 3 dakika optik kontrol ve işlem sağlama protokolü uygulanmalıdır.
                </div>`;
        } else {
            receteHtml = `
                <div style="background:rgba(139,92,246,0.08); border-left:4px solid #8b5cf6; border-radius:6px; padding:12px 14px; font-size:12.5px;">
                    <strong style="color:#8b5cf6;"><i class="fas fa-shield-alt me-1"></i> Cerrahi Reçete (%${pD} - Kod D Bilişsel Direnç/İnatlaşma):</strong>
                    Öğrenci çok adımlı zor sorularda bilişsel direnç göstererek pes etmekte veya 3-4 dakika inatlaşarak sınav temposunu çökertmektedir. <em>Öncelikli Eylem:</em> 120. saniyede soruyu terk etme (taktiksel pas geçme) kronometre antrenmanı derhal başlatılmalıdır.
                </div>`;
        }

        // 3. Tablo Satırları
        let rowsHtml = '';
        errors.forEach(err => {
            const repStatus = getHataRepeatStatus(err);
            const codeBadge = getKökNedenBadge(err.kokNeden);
            const isCompleted = err.tekrar1 && err.tekrar3 && err.tekrar14;

            rowsHtml += `
            <tr style="border-bottom:1px solid var(--border); font-size:12.5px; ${isCompleted ? 'background:rgba(16,185,129,0.04);' : (repStatus.isDue ? 'background:rgba(239,68,68,0.04);' : '')}">
                <td style="padding:10px; font-weight:700; color:var(--text-main);">${escapeFn(err.ders)}</td>
                <td style="padding:10px;">${escapeFn(err.konu)}</td>
                <td style="padding:10px;">${codeBadge}</td>
                <td style="padding:10px; font-size:11.5px; color:var(--text-muted); max-width:240px;">${escapeFn(err.soruNotu || '-')}</td>
                <td style="padding:10px; text-align:center;">
                    <input type="checkbox" ${err.tekrar1 ? 'checked' : ''} onchange="toggleSpacedRepetition('${item.id}', '${err.id}', 'tekrar1', this.checked)">
                </td>
                <td style="padding:10px; text-align:center;">
                    <input type="checkbox" ${err.tekrar3 ? 'checked' : ''} onchange="toggleSpacedRepetition('${item.id}', '${err.id}', 'tekrar3', this.checked)">
                </td>
                <td style="padding:10px; text-align:center;">
                    <input type="checkbox" ${err.tekrar14 ? 'checked' : ''} onchange="toggleSpacedRepetition('${item.id}', '${err.id}', 'tekrar14', this.checked)">
                </td>
                <td style="padding:10px; text-align:center;">
                    <span style="background:${repStatus.badgeBg}; color:${repStatus.badgeColor}; padding:3px 8px; border-radius:10px; font-size:10.5px; font-weight:700; white-space:nowrap;">
                        ${repStatus.label}
                    </span>
                </td>
                <td style="padding:10px; text-align:right; white-space:nowrap;">
                    <button class="action-btn" onclick="openEditHataModal('${item.id}', '${err.id}')" title="Düzenle" style="background:none; border:none; color:var(--primary); cursor:pointer; margin-right:6px;"><i class="fas fa-edit"></i></button>
                    <button class="action-btn btn-delete" onclick="deleteHataDefteriItem('${item.id}', '${err.id}')" title="Sil"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        });

        // 4. MEB Müfredatı Konu Isı Haritası (Micro-Topic Heatmap)
        const topicMap = {};
        errors.forEach(err => {
            const key = `${err.ders || 'Genel'} - ${err.konu || 'Genel'}`;
            if (!topicMap[key]) {
                topicMap[key] = { ders: err.ders, konu: err.konu, errors: [] };
            }
            topicMap[key].errors.push(err);
        });

        let heatMapBadgesHtml = '';
        const topics = Object.values(topicMap);
        if (topics.length === 0) {
            heatMapBadgesHtml = '<span style="font-size:11.5px; color:var(--text-muted);">Henüz ısı haritası oluşturulacak soru bulunmuyor.</span>';
        } else {
            topics.forEach(t => {
                const hasRed = t.errors.some(e => ((e.kokNeden === 'A' || e.kokNeden === 'D') && !e.tekrar14));
                const allGreen = t.errors.every(e => (e.tekrar1 && e.tekrar3 && e.tekrar14));
                let badgeBg = 'rgba(245,158,11,0.12)';
                let badgeColor = '#d97706';
                let badgeBorder = 'rgba(245,158,11,0.35)';
                let icon = '🟡';
                let title = 'Strateji/Dikkat Eksiği';

                if (hasRed) {
                    badgeBg = 'rgba(239,68,68,0.12)';
                    badgeColor = '#ef4444';
                    badgeBorder = 'rgba(239,68,68,0.35)';
                    icon = '🔴';
                    title = 'Cerrahi Müdahale Gerekiyor (Kazanım/Direnç)';
                } else if (allGreen) {
                    badgeBg = 'rgba(16,185,129,0.12)';
                    badgeColor = '#10b981';
                    badgeBorder = 'rgba(16,185,129,0.35)';
                    icon = '🟢';
                    title = 'Kalıcılaştı';
                }

                heatMapBadgesHtml += `
                    <span style="background:${badgeBg}; color:${badgeColor}; border:1px solid ${badgeBorder}; padding:4px 9px; border-radius:8px; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:5px;" title="${escapeFn(t.ders)}: ${escapeFn(t.konu)} (${title})">
                        ${icon} <strong>${escapeFn(t.ders)}:</strong> ${escapeFn(t.konu)} <small style="opacity:0.85;">(${t.errors.length})</small>
                    </span>
                `;
            });
        }

        container.innerHTML = `
            <!-- Kök Neden Dağılım Barı -->
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:15px; box-shadow:var(--shadow);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
                    <strong style="font-size:13px; color:var(--text-main);"><i class="fas fa-chart-pie me-1" style="color:var(--secondary);"></i> Metabilişsel Kök Neden Dağılımı (${total} Soru)</strong>
                    <div style="font-size:11px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span style="color:#ef4444; font-weight:700;" title="Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum.">🔴 A: %${pA} (Bilgi/Kavram)</span>
                        <span style="color:#d97706; font-weight:700;" title="Soruyu bilmeme rağmen olumsuz kökü, grafiği veya öncülü yanlış okudum.">🟡 B: %${pB} (Kurgu/Okuma)</span>
                        <span style="color:#ea580c; font-weight:700;" title="Süre baskısıyla acele ettim, dört işlem veya kaydırma hatası yaptım.">🟠 C: %${pC} (Süre/İşlem)</span>
                        <span style="color:#8b5cf6; font-weight:700;" title="Soruyla 2.5 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu.">🟣 D: %${pD} (Bilişsel Direnç)</span>
                    </div>
                </div>

                <div style="width:100%; height:14px; background:var(--input-bg); border-radius:8px; overflow:hidden; display:flex; border:1px solid var(--border);">
                    <div style="width:${pA}%; background:#ef4444;" title="Kod A: Bilgi &amp; Kavram Eksikliği (%${pA}) - Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum."></div>
                    <div style="width:${pB}%; background:#f59e0b;" title="Kod B: Kurgu &amp; Soru Kökü Hatası (%${pB}) - Soruyu bilmeme rağmen olumsuz kökü, grafiği veya öncülü yanlış okudum."></div>
                    <div style="width:${pC}%; background:#ea580c;" title="Kod C: Süre Baskısı &amp; İşlem Hatası (%${pC}) - Süre baskısıyla acele ettim, dört işlem veya kaydırma hatası yaptım."></div>
                    <div style="width:${pD}%; background:#8b5cf6;" title="Kod D: Bilişsel Direnç &amp; İnatlaşma (%${pD}) - Soruyla 2.5 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu."></div>
                </div>

                <div style="margin-top:12px;">
                    ${receteHtml}
                </div>
            </div>

            <!-- MEB Müfredatı Konu Isı Haritası (Micro-Topic Heatmap) -->
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:14px; margin-bottom:15px; box-shadow:var(--shadow);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                    <strong style="font-size:12.5px; color:var(--text-main);"><i class="fas fa-fire me-1" style="color:#ef4444;"></i> MEB Müfredatı Konu Isı Haritası (Micro-Topic Heatmap)</strong>
                    <div style="font-size:11px; display:flex; gap:10px; color:var(--text-muted); font-weight:600;">
                        <span style="color:#ef4444;">🔴 Cerrahi Müdahale</span>
                        <span style="color:#d97706;">🟡 Strateji/Dikkat</span>
                        <span style="color:#10b981;">🟢 Kalıcılaştı</span>
                    </div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${heatMapBadgesHtml}
                </div>
            </div>

            <!-- Yeni Hata Ekleme Paneli -->
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:10px; padding:15px; margin-bottom:18px;">
                <h5 style="margin:0 0 10px 0; color:var(--primary); font-size:13px; font-weight:700;">
                    <i class="fas fa-plus-circle me-1"></i> Yeni Yanlış/Boş Soru Kaydı Ekle (${escapeFn(config.gradeLabel)} Metabilişsel Teşhis)
                </h5>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap:10px; margin-bottom:10px;">
                    <div>
                        <label style="font-size:11px; font-weight:700;">DERS:</label>
                        <select id="koc-new-err-ders" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                            ${config.dersler.map(d => {
                                let icon = '📘';
                                if (d.includes('Fen')) icon = '🔬';
                                else if (d.includes('Türkçe')) icon = '📕';
                                else if (d.includes('İnkılap')) icon = '🇹🇷';
                                else if (d.includes('Sosyal')) icon = '🌍';
                                else if (d.includes('İngilizce')) icon = '🇬🇧';
                                else if (d.includes('Din')) icon = '🕌';
                                return `<option value="${escapeFn(d)}">${icon} ${escapeFn(d)}</option>`;
                            }).join('')}
                        </select>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">KONU / KAZANIM:</label>
                        <input type="text" id="koc-new-err-konu" placeholder="${config.grade === 5 ? 'Örn: Doğal Sayılar / Kuvvetin Ölçülmesi' : (config.grade === 8 ? 'Örn: EBOB-EKOK / Basınç' : 'Örn: Cebirsel İfadeler / Saf Maddeler')}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div style="grid-column: span 2;">
                        <label style="font-size:11px; font-weight:700; display:block; margin-bottom:6px;">4 KÖK NEDEN KODU (METABİLİŞSEL TEŞHİS &amp; AÇIKLAMA):</label>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
                            <button type="button" class="btn-kok-pill" data-kok="A" onclick="selectKokNedenPill('A')" style="text-align:left; background:rgba(239,68,68,0.18); color:#ef4444; border:2px solid #ef4444; border-radius:8px; padding:7px 10px; cursor:pointer;" title="Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum.">
                                <div style="font-size:11.5px; font-weight:800;">🔴 Kod A: Bilgi &amp; Kavram</div>
                                <div style="font-size:10px; font-weight:500; opacity:0.85; margin-top:2px; line-height:1.25;">Kavram/formül hatırlanamadı, kazanım bilinmiyor.</div>
                            </button>
                            <button type="button" class="btn-kok-pill" data-kok="B" onclick="selectKokNedenPill('B')" style="text-align:left; background:var(--card-bg); color:var(--text-main); border:1px solid var(--border); border-radius:8px; padding:7px 10px; cursor:pointer;" title="Soruyu bilmeme rağmen olumsuz kökü, grafiği veya öncülü yanlış okudum.">
                                <div style="font-size:11.5px; font-weight:800; color:#d97706;">🟡 Kod B: Kurgu &amp; Soru Kökü</div>
                                <div style="font-size:10px; font-weight:500; opacity:0.85; margin-top:2px; line-height:1.25;">Olumsuz kök, grafik veya öncül yanlış okundu.</div>
                            </button>
                            <button type="button" class="btn-kok-pill" data-kok="C" onclick="selectKokNedenPill('C')" style="text-align:left; background:var(--card-bg); color:var(--text-main); border:1px solid var(--border); border-radius:8px; padding:7px 10px; cursor:pointer;" title="Süre baskısıyla acele ettim, dört işlem veya kaydırma hatası yaptım.">
                                <div style="font-size:11.5px; font-weight:800; color:#ea580c;">🟠 Kod C: Süre &amp; İşlem</div>
                                <div style="font-size:10px; font-weight:500; opacity:0.85; margin-top:2px; line-height:1.25;">Süre baskısıyla acele, dört işlem/kaydırma.</div>
                            </button>
                            <button type="button" class="btn-kok-pill" data-kok="D" onclick="selectKokNedenPill('D')" style="text-align:left; background:var(--card-bg); color:var(--text-main); border:1px solid var(--border); border-radius:8px; padding:7px 10px; cursor:pointer;" title="Soruyla 2.5 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu.">
                                <div style="font-size:11.5px; font-weight:800; color:#8b5cf6;">🟣 Kod D: Bilişsel Direnç</div>
                                <div style="font-size:10px; font-weight:500; opacity:0.85; margin-top:2px; line-height:1.25;">2.5+ dk inatlaşıldı, taktiksel pas geçilemedi.</div>
                            </button>
                            <input type="hidden" id="koc-new-err-kok" value="A">
                        </div>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">SORU ÖZETİ / NOTU:</label>
                        <input type="text" id="koc-new-err-not" placeholder="Örn: 2. öncüldeki istisnayı göremedi" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                </div>
                <div style="display:flex; justify-content:flex-end;">
                    <button class="btn btn-primary" onclick="addHataDefteriEntry('${item.id}')" style="padding:7px 16px; font-size:12px; font-weight:700; border-radius:6px;">
                        <i class="fas fa-check"></i> Hata Defterine Kaydet
                    </button>
                </div>
            </div>

            <!-- Tablo -->
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; text-align:left;">
                    <thead>
                        <tr style="background:var(--tab-bg); border-bottom:2px solid var(--border); font-size:11.5px; color:var(--text-muted); text-transform:uppercase;">
                            <th style="padding:10px;">Ders</th>
                            <th style="padding:10px;">Konu</th>
                            <th style="padding:10px; min-width:200px;">Kök Neden &amp; Teşhis</th>
                            <th style="padding:10px;">Teşhis / Soru Notu</th>
                            <th style="padding:10px; text-align:center;">1. Gün (24h)</th>
                            <th style="padding:10px; text-align:center;">3. Gün (72h)</th>
                            <th style="padding:10px; text-align:center;">14. Gün (336h)</th>
                            <th style="padding:10px; text-align:center;">Tekrar Durumu</th>
                            <th style="padding:10px; text-align:right;">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">Henüz hata kaydı girilmedi. Öğrencinin yanlış yaptığı soruları ekleyerek aralıklı tekrar döngüsünü başlatın.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }

    function selectKokNedenPill(code) {
        const hiddenInput = document.getElementById('koc-new-err-kok');
        if (hiddenInput) hiddenInput.value = code;
        const colorMap = {
            'A': { bg: 'rgba(239,68,68,0.18)', color: '#ef4444', border: '2px solid #ef4444' },
            'B': { bg: 'rgba(245,158,11,0.18)', color: '#d97706', border: '2px solid #f59e0b' },
            'C': { bg: 'rgba(234,88,12,0.18)', color: '#ea580c', border: '2px solid #ea580c' },
            'D': { bg: 'rgba(139,92,246,0.18)', color: '#8b5cf6', border: '2px solid #8b5cf6' }
        };
        document.querySelectorAll('.btn-kok-pill').forEach(btn => {
            const k = btn.getAttribute('data-kok');
            if (k === code && colorMap[k]) {
                btn.style.background = colorMap[k].bg;
                btn.style.borderColor = colorMap[k].color;
                btn.style.borderWidth = '2px';
                btn.style.borderStyle = 'solid';
            } else {
                btn.style.background = 'var(--card-bg)';
                btn.style.borderColor = 'var(--border)';
                btn.style.borderWidth = '1px';
                btn.style.borderStyle = 'solid';
            }
        });
    }

    function getKokNedenMeta(code) {
        const c = String(code || 'A').toUpperCase();
        switch (c) {
            case 'A':
                return {
                    code: 'A',
                    short: 'Bilgi Eksikliği',
                    label: 'Bilgi & Kavram Eksikliği',
                    desc: 'Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum.',
                    color: '#ef4444',
                    bg: 'rgba(239,68,68,0.14)',
                    border: '#ef4444',
                    icon: '🔴'
                };
            case 'B':
                return {
                    code: 'B',
                    short: 'Kurgu / Öncül',
                    label: 'Kurgu & Soru Kökü Hatası',
                    desc: 'Soruyu bilmeme rağmen olumsuz kökü, grafiği veya öncülü yanlış okudum.',
                    color: '#d97706',
                    bg: 'rgba(245,158,11,0.14)',
                    border: '#f59e0b',
                    icon: '🟡'
                };
            case 'C':
                return {
                    code: 'C',
                    short: 'Süre / İşlem',
                    label: 'Süre Baskısı & İşlem Hatası',
                    desc: 'Süre baskısıyla acele ettim, dört işlem veya kaydırma hatası yaptım.',
                    color: '#ea580c',
                    bg: 'rgba(234,88,12,0.14)',
                    border: '#ea580c',
                    icon: '🟠'
                };
            case 'D':
                return {
                    code: 'D',
                    short: 'Bilişsel Direnç',
                    label: 'Bilişsel Direnç & İnatlaşma',
                    desc: 'Soruyla 2.5 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu.',
                    color: '#8b5cf6',
                    bg: 'rgba(139,92,246,0.14)',
                    border: '#8b5cf6',
                    icon: '🟣'
                };
            default:
                return {
                    code: 'A',
                    short: 'Bilgi Eksikliği',
                    label: 'Bilgi & Kavram Eksikliği',
                    desc: 'Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum.',
                    color: '#ef4444',
                    bg: 'rgba(239,68,68,0.14)',
                    border: '#ef4444',
                    icon: '🔴'
                };
        }
    }

    function getKökNedenBadge(code) {
        const m = getKokNedenMeta(code);
        return `<span style="background:${m.bg}; color:${m.color}; border:1px solid ${m.border}45; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;" title="${escapeFn(m.desc)}">
            <span>${m.icon}</span> <strong>Kod ${m.code}:</strong> ${m.label}
        </span>`;
    }

    function addHataDefteriEntry(kocId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const ders = document.getElementById('koc-new-err-ders')?.value;
        const konu = document.getElementById('koc-new-err-konu')?.value.trim();
        const kok = document.getElementById('koc-new-err-kok')?.value;
        const not = document.getElementById('koc-new-err-not')?.value.trim();

        if (!konu) {
            alert('Lütfen sorunun ait olduğu konuyu belirtiniz.');
            return;
        }

        if (!Array.isArray(item.hataDefteri)) item.hataDefteri = [];

        item.hataDefteri.unshift({
            id: 'err_' + Date.now(),
            ders,
            konu,
            kokNeden: kok,
            soruNotu: not,
            tarih: new Date().toLocaleDateString('tr-TR'),
            createdAt: new Date().toISOString(),
            tekrar1: false,
            tekrar3: false,
            tekrar14: false
        });

        if (typeof saveData === 'function') saveData(true);
        renderSubTabHataDefteri(item);
        renderKoclukModule();
    }

    function toggleSpacedRepetition(kocId, errId, tekrarKey, checked) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.hataDefteri)) return;

        const err = item.hataDefteri.find(e => String(e.id) === String(errId));
        if (err) {
            err[tekrarKey] = checked;
            if (typeof saveData === 'function') saveData(true);
            renderSubTabHataDefteri(item);
            renderKoclukModule();
        }
    }

    function deleteHataDefteriItem(kocId, errId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.hataDefteri)) return;

        if (confirm('Bu hata kaydını silmek istediğinize emin misiniz?')) {
            item.hataDefteri = item.hataDefteri.filter(e => String(e.id) !== String(errId));
            if (typeof saveData === 'function') saveData(true);
            renderSubTabHataDefteri(item);
            renderKoclukModule();
        }
    }

    function openEditHataModal(kocId, errId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.hataDefteri)) return;
        const err = item.hataDefteri.find(e => String(e.id) === String(errId));
        if (!err) return;

        const config = getGradeCognitiveConfig(item.sinif);
        const dersSelect = document.getElementById('edit-hata-ders');
        if (dersSelect) {
            dersSelect.innerHTML = config.dersler.map(d => {
                let icon = '📘';
                if (d.includes('Fen')) icon = '🔬';
                else if (d.includes('Türkçe')) icon = '📕';
                else if (d.includes('İnkılap')) icon = '🇹🇷';
                else if (d.includes('Sosyal')) icon = '🌍';
                else if (d.includes('İngilizce')) icon = '🇬🇧';
                else if (d.includes('Din')) icon = '🕌';
                return `<option value="${escapeFn(d)}">${icon} ${escapeFn(d)}</option>`;
            }).join('');
        }

        document.getElementById('edit-hata-koc-id').value = kocId;
        document.getElementById('edit-hata-id').value = errId;
        if (dersSelect) dersSelect.value = err.ders || config.dersler[0];
        document.getElementById('edit-hata-konu').value = err.konu || '';
        document.getElementById('edit-hata-kok').value = err.kokNeden || 'A';
        document.getElementById('edit-hata-not').value = err.soruNotu || '';
        document.getElementById('edit-hata-cozum').value = err.solutionNote || err.cozumNotu || '';
        document.getElementById('edit-hata-tekrar1').checked = !!err.tekrar1;
        document.getElementById('edit-hata-tekrar3').checked = !!err.tekrar3;
        document.getElementById('edit-hata-tekrar14').checked = !!err.tekrar14;

        const modal = document.getElementById('kocluk-edit-hata-modal');
        if (modal) modal.style.display = 'flex';
    }

    function saveEditHata() {
        const kocId = document.getElementById('edit-hata-koc-id')?.value;
        const errId = document.getElementById('edit-hata-id')?.value;
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.hataDefteri)) return;
        const err = item.hataDefteri.find(e => String(e.id) === String(errId));
        if (!err) return;

        const ders = document.getElementById('edit-hata-ders')?.value;
        const konu = document.getElementById('edit-hata-konu')?.value.trim();
        const kok = document.getElementById('edit-hata-kok')?.value;
        const not = document.getElementById('edit-hata-not')?.value.trim();
        const cozum = document.getElementById('edit-hata-cozum')?.value.trim();
        const t1 = !!document.getElementById('edit-hata-tekrar1')?.checked;
        const t3 = !!document.getElementById('edit-hata-tekrar3')?.checked;
        const t14 = !!document.getElementById('edit-hata-tekrar14')?.checked;

        if (!konu) {
            alert('Lütfen konu / kazanım alanını doldurunuz.');
            return;
        }

        err.ders = ders;
        err.konu = konu;
        err.kokNeden = kok;
        err.soruNotu = not;
        err.solutionNote = cozum;
        err.cozumNotu = cozum;
        err.tekrar1 = t1;
        err.tekrar3 = t3;
        err.tekrar14 = t14;

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Metabilişsel soru kaydı güncellendi.', 'success');
        }

        closeModal('kocluk-edit-hata-modal');
        renderSubTabHataDefteri(item);
        renderKoclukModule();
    }

    // ─────────────────────────────────────────────────────────────
    // 5. ALT SEKME 3: DENEME SINAVLARI, SVG TREND GRAFİĞİ & ÇİFT KATMANLI PLATO TESPİTİ
    // ─────────────────────────────────────────────────────────────

    /**
     * Pure SVG Çift Eksenli Net ve TDE Korelasyon Grafiği (Harici Kütüphanesiz)
     */
    function renderSvgNetTdeChart(denemeler) {
        if (!Array.isArray(denemeler) || denemeler.length === 0) {
            return `
                <div style="text-align:center; padding:30px; background:var(--input-bg); border-radius:10px; border:1px dashed var(--border); color:var(--text-muted); font-size:12.5px;">
                    <i class="fas fa-chart-line fa-2x mb-2" style="opacity:0.4;"></i>
                    <p style="margin:5px 0 0 0;">Trend grafiği için en az 1 deneme sınavı sonucu girilmelidir.</p>
                </div>`;
        }

        const W = 700;
        const H = 220;
        const padL = 50;
        const padR = 50;
        const padT = 30;
        const padB = 40;

        const plotW = W - padL - padR;
        const plotH = H - padT - padB;

        const N = denemeler.length;
        const xStep = N > 1 ? plotW / (N - 1) : plotW / 2;

        // Koordinat Dönüşümleri
        // Net: 0 - 90
        const getYNet = net => padT + plotH - ((Math.min(90, Math.max(0, net)) / 90) * plotH);
        // TDE: 0 - 100
        const getYTde = tde => padT + plotH - ((Math.min(100, Math.max(0, tde)) / 100) * plotH);

        let netPath = '';
        let tdePath = '';
        let netPoints = '';
        let tdePoints = '';
        let xLabels = '';

        denemeler.forEach((d, i) => {
            const x = N > 1 ? padL + (i * xStep) : padL + (plotW / 2);
            const netVal = Number(d.toplamNet) || 0;
            const tdeVal = Number(d.tdePuan || (calculateTDE(d).tdePuan)) || 75;

            const yNet = getYNet(netVal);
            const yTde = getYTde(tdeVal);

            if (i === 0) {
                netPath += `M ${x} ${yNet}`;
                tdePath += `M ${x} ${yTde}`;
            } else {
                netPath += ` L ${x} ${yNet}`;
                tdePath += ` L ${x} ${yTde}`;
            }

            // Net Çemberleri (Mavi)
            netPoints += `
                <circle cx="${x}" cy="${yNet}" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="2">
                    <title>${escapeFn(d.ad)}: ${netVal} Net</title>
                </circle>
                <text x="${x}" y="${yNet - 9}" font-size="11" font-weight="bold" fill="#3b82f6" text-anchor="middle">${netVal}</text>
            `;

            // TDE Kareleri (Turuncu)
            tdePoints += `
                <rect x="${x - 4}" y="${yTde - 4}" width="8" height="8" fill="#f59e0b" stroke="#ffffff" stroke-width="2">
                    <title>${escapeFn(d.ad)} TDE: ${tdeVal}/100</title>
                </rect>
                <text x="${x}" y="${yTde + 16}" font-size="10.5" font-weight="bold" fill="#ea580c" text-anchor="middle">${tdeVal}</text>
            `;

            // X Etiketi
            const shortName = d.ad.length > 12 ? d.ad.substring(0, 11) + '..' : d.ad;
            xLabels += `<text x="${x}" y="${H - 10}" font-size="10" fill="var(--text-muted, #64748b)" text-anchor="middle">${escapeFn(shortName)}</text>`;
        });

        return `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:12px; padding:15px; margin-bottom:18px; box-shadow:var(--shadow);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
                    <div style="font-size:13px; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-chart-line" style="color:var(--secondary);"></i> Net &amp; TDE (Turlama Disiplini) Korelasyon Grafiği
                    </div>
                    <div style="display:flex; align-items:center; gap:15px; font-size:11.5px; font-weight:700;">
                        <span style="color:#3b82f6; display:flex; align-items:center; gap:5px;">
                            <span style="display:inline-block; width:12px; height:3px; background:#3b82f6;"></span> Toplam Net (Maks: 90)
                        </span>
                        <span style="color:#f59e0b; display:flex; align-items:center; gap:5px;">
                            <span style="display:inline-block; width:12px; height:2px; border-top:2px dashed #f59e0b;"></span> TDE Skoru (0 - 100)
                        </span>
                    </div>
                </div>

                <div style="width:100%; overflow-x:auto;">
                    <svg viewBox="0 0 ${W} ${H}" style="width:100%; min-width:550px; height:200px; display:block;">
                        <!-- Yatay Kılavuz Çizgileri -->
                        <line x1="${padL}" y1="${padT}" x2="${W - padR}" y2="${padT}" stroke="var(--border)" stroke-dasharray="3,3" opacity="0.6"/>
                        <line x1="${padL}" y1="${padT + plotH / 2}" x2="${W - padR}" y2="${padT + plotH / 2}" stroke="var(--border)" stroke-dasharray="3,3" opacity="0.6"/>
                        <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="var(--border)" opacity="0.8"/>

                        <!-- Sol Eksen (Net: 0-90) -->
                        <text x="${padL - 10}" y="${padT + 4}" font-size="10" fill="#3b82f6" font-weight="700" text-anchor="end">90N</text>
                        <text x="${padL - 10}" y="${padT + plotH / 2 + 4}" font-size="10" fill="#3b82f6" text-anchor="end">45N</text>
                        <text x="${padL - 10}" y="${padT + plotH + 4}" font-size="10" fill="#3b82f6" text-anchor="end">0N</text>

                        <!-- Sağ Eksen (TDE: 0-100) -->
                        <text x="${W - padR + 10}" y="${padT + 4}" font-size="10" fill="#f59e0b" font-weight="700" text-anchor="start">100P</text>
                        <text x="${W - padR + 10}" y="${padT + plotH / 2 + 4}" font-size="10" fill="#f59e0b" text-anchor="start">50P</text>
                        <text x="${W - padR + 10}" y="${padT + plotH + 4}" font-size="10" fill="#f59e0b" text-anchor="start">0P</text>

                        <!-- Çizgiler -->
                        <path d="${netPath}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="${tdePath}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4" stroke-linecap="round"/>

                        <!-- Noktalar -->
                        ${netPoints}
                        ${tdePoints}

                        <!-- X Eksen Etiketleri -->
                        ${xLabels}
                    </svg>
                </div>
            </div>`;
    }

    function renderSubTabDenemeler(item) {
        const container = document.getElementById('koc-subtab-deneme-body');
        if (!container) return;

        const config = getGradeCognitiveConfig(item.sinif);
        const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];

        // Çift Katmanlı Akıllı Plato & TDE Tespiti (Sınıf Kademesine Duyarlı)
        let platoTehisHtml = '';
        if (denemeler.length >= 3) {
            const last3 = denemeler.slice(-3);
            const netSpread = Math.max(...last3.map(d => Number(d.toplamNet) || 0)) - Math.min(...last3.map(d => Number(d.toplamNet) || 0));
            const avgTde = last3.reduce((acc, d) => acc + (d.tdePuan || calculateTDE(d, item.sinif).tdePuan), 0) / 3;

            if (netSpread <= 3) {
                if (avgTde < 75) {
                    const platoMudahele = config.isLgsFinal
                        ? '1. Turda Fen 32 dk / Mat 30 dk blok kuralı uygulanmalı ve 120 saniyeyi geçen sorular derhal işaretlenip geçilmelidir.'
                        : `Süre ve Strateji Disiplini çerçevesinde soru başına en fazla 90-120 saniye tanınmalı, takılınan sorulara takılmadan turlama taktiği uygulanmalıdır. (${config.stageTitle})`;
                    platoTehisHtml = `
                    <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; border-radius:8px; padding:14px; margin-bottom:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="color:#ef4444; font-size:13.5px;"><i class="fas fa-exclamation-triangle me-1"></i> Süreç Teşhisi: Turlama &amp; Süre Disiplini Tıkanıklığı</strong>
                            <span style="background:rgba(239,68,68,0.15); color:#ef4444; padding:2px 8px; border-radius:6px; font-weight:800; font-size:11px;">Ort. TDE: ${avgTde.toFixed(1)} / 100</span>
                        </div>
                        <p style="margin:0; font-size:12.5px; color:var(--text-main); line-height:1.5;">
                            Öğrencinin son netleri <strong>${last3.map(d => d.toplamNet).join(' → ')}</strong> aralığında sıkışmıştır. Bu tıkanıklık <strong>bilgi eksiğinden değil</strong>, süre yetiştirememe ve soru inatlaşmasından (Düşük TDE) kaynaklanmaktadır. 
                            <em>Müdahale:</em> ${platoMudahele}
                        </p>
                    </div>`;
                } else if (avgTde >= 85) {
                    platoTehisHtml = `
                    <div style="background:rgba(59,130,246,0.08); border-left:4px solid #3b82f6; border-radius:8px; padding:14px; margin-bottom:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="color:#3b82f6; font-size:13.5px;"><i class="fas fa-lightbulb me-1"></i> Süreç Teşhisi: Kazanım &amp; Muhakeme Derinliği İhtiyacı</strong>
                            <span style="background:rgba(59,130,246,0.15); color:#3b82f6; padding:2px 8px; border-radius:6px; font-weight:800; font-size:11px;">Ort. TDE: ${avgTde.toFixed(1)} / 100</span>
                        </div>
                        <p style="margin:0; font-size:12.5px; color:var(--text-main); line-height:1.5;">
                            Öğrencinin sınav turlama stratejisi ve süre yönetimi kusursuzdur (TDE Yüksek). Netlerdeki plato <strong>üst düzey beceri temelli sorulardaki kavramsal derinlik</strong> eksikliğindendir.
                            <em>Müdahale:</em> Hata defterindeki <strong>Kod A (Bilgi)</strong> ve <strong>Kod B (Kurgu/Öncül)</strong> sorularına cerrahi derinleşme uygulanmalı, çok adımlı deney ve analiz soruları incelenmelidir.
                        </p>
                    </div>`;
                } else {
                    platoTehisHtml = `
                    <div style="background:rgba(245,158,11,0.08); border-left:4px solid #f59e0b; border-radius:8px; padding:14px; margin-bottom:16px;">
                        <strong style="color:#f59e0b; font-size:13px;"><i class="fas fa-chart-line me-1"></i> Standart Plato Uyarısı:</strong>
                        <p style="margin:4px 0 0 0; font-size:12.5px; color:var(--text-main);">Öğrencinin son netleri <strong>${last3.map(d => d.toplamNet).join(' → ')}</strong> aralığında dalgalanmaktadır. Hem süre kontrolü hem de hata defteri analizi birlikte yürütülmelidir.</p>
                    </div>`;
                }
            }
        }

        // Tablo Satırları
        let rowsHtml = '';
        denemeler.forEach(d => {
            // Otomatik D-Y-B çözümleme (eğer henüz işlenmediyse)
            if (d.sozelD == null && d.sozelNet != null) {
                let sD = 0, sY = 0, sB = 0;
                let anySub = false;
                [
                    { dKey: 'turkceD', yKey: 'turkceY', bKey: 'turkceB', net: d.turkce, q: 20 },
                    { dKey: 'inkilapD', yKey: 'inkilapY', bKey: 'inkilapB', net: (d.inkilap ?? d.sosyal ?? d.inkNet), q: 10 },
                    { dKey: 'dinD', yKey: 'dinY', bKey: 'dinB', net: (d.din ?? d.dinNet), q: 10 },
                    { dKey: 'ingilizceD', yKey: 'ingilizceY', bKey: 'ingilizceB', net: (d.ingilizce ?? d.ingNet), q: 10 }
                ].forEach(sub => {
                    let curD = d[sub.dKey];
                    let curY = d[sub.yKey];
                    let curB = d[sub.bKey];
                    if (curD == null && curY == null && sub.net != null && sub.net !== '') {
                        const r = resolveDybFromNet(sub.net, sub.q, 3);
                        curD = r.d; curY = r.y; curB = r.b;
                        d[sub.dKey] = curD; d[sub.yKey] = curY; d[sub.bKey] = curB;
                    }
                    if (curD != null && curD !== '') {
                        anySub = true;
                        sD += parseInt(curD) || 0;
                        sY += parseInt(curY) || 0;
                        sB += (curB != null && curB !== '') ? (parseInt(curB) || 0) : Math.max(0, sub.q - (parseInt(curD) || 0) - (parseInt(curY) || 0));
                    }
                });
                if (anySub) {
                    d.sozelD = sD; d.sozelY = sY; d.sozelB = sB;
                } else {
                    const r = resolveDybFromNet(d.sozelNet, 50, 3);
                    d.sozelD = r.d; d.sozelY = r.y; d.sozelB = r.b;
                }
            }
            if (d.matD == null && (d.matNet != null || d.matematik != null)) {
                const r = resolveDybFromNet(d.matNet ?? d.matematik, 20, 3);
                d.matD = r.d; d.matY = r.y; d.matB = r.b;
            }
            if (d.fenD == null && (d.fenNet != null || d.fen != null)) {
                const r = resolveDybFromNet(d.fenNet ?? d.fen, 20, 3);
                d.fenD = r.d; d.fenY = r.y; d.fenB = r.b;
            }
            if (d.sayisalD == null && (d.matD != null || d.fenD != null)) {
                d.sayisalD = (d.matD || 0) + (d.fenD || 0);
                d.sayisalY = (d.matY || 0) + (d.fenY || 0);
                d.sayisalB = (d.matB || 0) + (d.fenB || 0);
            }
            if (d.toplamD == null && (d.sozelD != null || d.sayisalD != null)) {
                d.toplamD = (d.sozelD || 0) + (d.sayisalD || 0);
                d.toplamY = (d.sozelY || 0) + (d.sayisalY || 0);
                d.toplamB = (d.sozelB || 0) + (d.sayisalB || 0);
            }

            const tde = calculateTDE(d, item.sinif);
            const sozelDetay = (d.sozelD != null && d.sozelD !== '') ? `<div style="font-size:10.5px; color:var(--text-muted); font-weight:600; margin-top:2px;">${d.sozelD}D ${d.sozelY || 0}Y ${d.sozelB || 0}B</div>` : '';
            const matDetay = (d.matD != null && d.matD !== '') ? `<div style="font-size:10.5px; color:var(--text-muted); font-weight:600; margin-top:2px;">${d.matD}D ${d.matY || 0}Y ${d.matB || 0}B</div>` : '';
            const fenDetay = (d.fenD != null && d.fenD !== '') ? `<div style="font-size:10.5px; color:var(--text-muted); font-weight:600; margin-top:2px;">${d.fenD}D ${d.fenY || 0}Y ${d.fenB || 0}B</div>` : '';
            const topDetay = (d.toplamD != null && d.toplamD !== '') ? `<div style="font-size:11px; font-weight:700; color:#059669; margin-top:2px;">${d.toplamD}D ${d.toplamY || 0}Y ${d.toplamB || 0}B</div>` : '';

            const hasSubLessons = (d.turkce != null || d.inkilap != null || d.sosyal != null || d.din != null || d.ingilizce != null);
            const inkOrSosNet = d.inkilap ?? d.sosyal ?? '-';
            const inkOrSosLabel = config.isLgsFinal ? 'İnk' : 'Sos';
            const subBadge = hasSubLessons ? `
                <div style="font-size:9.5px; color:var(--text-muted); margin-top:3px; display:flex; gap:3px; justify-content:center; flex-wrap:wrap;">
                    <span title="Türkçe Net" style="background:rgba(239,68,68,0.1); color:#ef4444; padding:1px 3px; border-radius:3px; font-weight:700;">Tr:${d.turkce ?? '-'}</span>
                    <span title="${config.sosyalDersAdi} Net" style="background:rgba(245,158,11,0.1); color:#d97706; padding:1px 3px; border-radius:3px; font-weight:700;">${inkOrSosLabel}:${inkOrSosNet}</span>
                    <span title="Din Net" style="background:rgba(16,185,129,0.1); color:#059669; padding:1px 3px; border-radius:3px; font-weight:700;">Din:${d.din ?? '-'}</span>
                    <span title="İngilizce Net" style="background:rgba(139,92,246,0.1); color:#7c3aed; padding:1px 3px; border-radius:3px; font-weight:700;">İng:${d.ingilizce ?? '-'}</span>
                </div>
            ` : '';

            const sourceBadge = (d.source === 'exam_module' || d.examId)
                ? `<span style="display:inline-block; font-size:10px; font-weight:800; background:rgba(2,132,199,0.12); color:#0284c7; border:1px solid rgba(2,132,199,0.3); padding:1px 6px; border-radius:4px; margin-left:6px;" title="8. Sınav Analiz modülünden otomatik aktarıldı"><i class="fas fa-link me-1"></i>8. Sınav Analiz</span>`
                : '';

            rowsHtml += `
            <tr style="border-bottom:1px solid var(--border); font-size:12.5px;">
                <td style="padding:10px; font-weight:700;">${escapeFn(d.ad)}${sourceBadge}</td>
                <td style="padding:10px; color:var(--text-muted); font-size:11.5px;">${escapeFn(d.tarih)}</td>
                <td style="padding:10px; text-align:center;">
                    <strong style="color:#6366f1; font-size:13px;">${d.sozelNet ?? (d.turkce ? (Number(d.turkce) + Number(d.inkilap || d.sosyal || 0) + Number(d.din || 0) + Number(d.ingilizce || 0)) : '-')}</strong>
                    ${sozelDetay}
                    ${subBadge}
                </td>
                <td style="padding:10px; text-align:center;">
                    <strong style="color:var(--secondary); font-size:13px;">${d.matNet ?? (d.matematik ?? '-')}</strong>
                    ${matDetay}
                </td>
                <td style="padding:10px; text-align:center;">
                    <strong style="color:var(--teal); font-size:13px;">${d.fenNet ?? (d.fen ?? '-')}</strong>
                    ${fenDetay}
                </td>
                <td style="padding:10px; text-align:center;">
                    <strong style="font-size:14.5px; font-weight:800; color:var(--accent);">${d.toplamNet ?? '-'}</strong>
                    ${topDetay}
                </td>
                <td style="padding:10px; text-align:center;">
                    <span style="background:${tde.badgeBg}; color:${tde.badgeColor}; border:1px solid ${tde.badgeBorder}; padding:3px 8px; border-radius:6px; font-weight:800; font-size:11px;">
                        ${tde.tdePuan}/100 • ${tde.badgeText}
                    </span>
                </td>
                <td style="padding:10px; text-align:right; white-space:nowrap;">
                    <button class="action-btn" onclick="openEditDenemeModal('${item.id}', '${d.id}')" title="Düzenle" style="background:none; border:none; color:var(--primary); cursor:pointer; margin-right:6px;"><i class="fas fa-edit"></i></button>
                    <button class="action-btn btn-delete" onclick="deleteDenemeEntry('${item.id}', '${d.id}')" title="Sil"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        });

        container.innerHTML = `
            ${platoTehisHtml}
            ${renderSvgNetTdeChart(denemeler)}

            <!-- Yeni Deneme Ekleme Formu -->
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:18px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                    <h5 style="margin:0; font-size:13.5px; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-plus-circle" style="color:var(--secondary);"></i> Yeni Deneme ve ${config.isLgsFinal ? 'TDE Strateji' : 'Süre & Strateji'} Girişi
                    </h5>
                    <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                        <button type="button" class="btn btn-clear" onclick="if (typeof window.syncAllExamsToKocluk === 'function') { window.syncAllExamsToKocluk(false); const cur = (window.koclukData||[]).find(k=>k.id==='${item.id}'); if(cur) renderSubTabDenemeler(cur); }" style="font-size:11.5px; padding:5px 11px; border:1px solid rgba(2,132,199,0.35); border-radius:6px; background:rgba(2,132,199,0.08); color:#0284c7; font-weight:700;">
                            <i class="fas fa-sync-alt me-1"></i> 🦅 8. Sınav Analizden Güncelle
                        </button>
                        <button type="button" class="btn btn-clear" onclick="toggleTdeDetailsPanel()" style="font-size:11.5px; padding:5px 11px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg);">
                            <i class="fas fa-cog me-1" style="color:var(--secondary);"></i> <span id="tde-toggle-text">${config.isLgsFinal ? 'TDE Turlama Detaylarını Göster' : 'Süre & Turlama Detaylarını Göster'}</span>
                        </button>
                    </div>
                </div>

                <!-- Deneme Adı & Tarih -->
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:10px; margin-bottom:12px;">
                    <div>
                        <label style="font-size:11px; font-weight:700; color:var(--text-main);">DENEME ADI:</label>
                        <input type="text" id="koc-den-ad" placeholder="Örn: Kurumsal Deneme 4" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border); font-size:12.5px; font-weight:600;">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700; color:var(--text-main);">TARİH:</label>
                        <input type="text" id="koc-den-tarih" value="${new Date().toLocaleDateString('tr-TR')}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border); font-size:12.5px;">
                    </div>
                </div>

                <!-- Doğru - Yanlış - Boş ve Otomatik Net Hesaplama Matrisi -->
                <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:8px; overflow:hidden; margin-bottom:12px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
                    <table style="width:100%; border-collapse:collapse; font-size:12px;">
                        <thead>
                            <tr style="background:var(--tab-bg); border-bottom:1px solid var(--border); color:var(--text-muted); font-size:11px; text-transform:uppercase;">
                                <th style="padding:8px 12px; text-align:left;">Ders / Bölüm</th>
                                <th style="padding:8px 6px; text-align:center; width:80px;">Doğru (D)</th>
                                <th style="padding:8px 6px; text-align:center; width:80px;">Yanlış (Y)</th>
                                <th style="padding:8px 6px; text-align:center; width:80px;">Boş (B)</th>
                                <th style="padding:8px 12px; text-align:center; width:115px;">Otomatik Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- SÖZEL BÖLÜM (Ders Ders Doğru, Yanlış, Boş ve Net Girişi) -->
                            <!-- 1. Türkçe (20 Soru) -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:7px 12px; font-weight:700; color:#ef4444;">
                                    <i class="fas fa-book me-1" style="color:#ef4444;"></i> Türkçe <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(20 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-tr-d" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('tr', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-tr-y" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('tr', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-tr-b" min="0" max="20" placeholder="20" onfocus="this.select()" oninput="calcSubBoşChange('tr', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-sub-tr-net" step="0.25" placeholder="0.00" readonly style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid #ef4444; background:rgba(239,68,68,0.08); font-weight:800; color:#ef4444; font-size:13px;">
                                </td>
                            </tr>

                            <!-- 2. Sosyal Bilgiler / İnkılap Tarihi (10 Soru) -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:7px 12px; font-weight:700; color:#f59e0b;">
                                    <i class="${config.sosyalDersIcon} me-1" style="color:#f59e0b;"></i> ${config.sosyalDersAdi} <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(10 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ink-d" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('ink', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ink-y" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('ink', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ink-b" min="0" max="10" placeholder="10" onfocus="this.select()" oninput="calcSubBoşChange('ink', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-sub-ink-net" step="0.25" placeholder="0.00" readonly style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid #f59e0b; background:rgba(245,158,11,0.08); font-weight:800; color:#d97706; font-size:13px;">
                                </td>
                            </tr>

                            <!-- 3. Din Kültürü (10 Soru) -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:7px 12px; font-weight:700; color:#10b981;">
                                    <i class="fas fa-mosque me-1" style="color:#10b981;"></i> Din Kültürü ve A.B. <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(10 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-din-d" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('din', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-din-y" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('din', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-din-b" min="0" max="10" placeholder="10" onfocus="this.select()" oninput="calcSubBoşChange('din', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-sub-din-net" step="0.25" placeholder="0.00" readonly style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid #10b981; background:rgba(16,185,129,0.08); font-weight:800; color:#10b981; font-size:13px;">
                                </td>
                            </tr>

                            <!-- 4. İngilizce (10 Soru) -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:7px 12px; font-weight:700; color:#8b5cf6;">
                                    <i class="fas fa-globe me-1" style="color:#8b5cf6;"></i> Yabancı Dil (İngilizce) <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(10 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ing-d" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('ing', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ing-y" min="0" max="10" placeholder="0" onfocus="this.select()" oninput="calcSubBrans('ing', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-sub-ing-b" min="0" max="10" placeholder="10" onfocus="this.select()" oninput="calcSubBoşChange('ing', 10)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-sub-ing-net" step="0.25" placeholder="0.00" readonly style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid #8b5cf6; background:rgba(139,92,246,0.08); font-weight:800; color:#8b5cf6; font-size:13px;">
                                </td>
                            </tr>

                            <!-- SÖZEL BÖLÜM TOPLAMI -->
                            <tr style="background:rgba(99,102,241,0.06); border-bottom:2px solid #6366f1;">
                                <td style="padding:8px 12px; font-weight:800; color:#4f46e5;">
                                    <i class="fas fa-book-reader me-1" style="color:#6366f1;"></i> SÖZEL BÖLÜM TOPLAMI <span style="font-size:10.5px; color:var(--text-muted); font-weight:600;">(50 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sozel-d" min="0" max="50" placeholder="0" onfocus="this.select()" oninput="calcDybNet('sozel', 50)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #6366f1; font-weight:800; color:#10b981; font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sozel-y" min="0" max="50" placeholder="0" onfocus="this.select()" oninput="calcDybNet('sozel', 50)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #6366f1; font-weight:800; color:#ef4444; font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sozel-b" min="0" max="50" placeholder="50" onfocus="this.select()" oninput="calcDybBoşChange('sozel', 50)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #6366f1; font-weight:700; color:var(--text-muted); font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-den-sozel" step="0.25" placeholder="0.00" onfocus="this.select()" oninput="updateAutoToplamNet()" style="width:85px; text-align:center; padding:5px; border-radius:6px; border:2px solid #6366f1; background:rgba(99,102,241,0.12); font-weight:900; color:#4f46e5; font-size:13.5px;">
                                </td>
                            </tr>

                            <!-- Matematik Satırı -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:8px 12px; font-weight:700; color:var(--secondary);">
                                    <i class="fas fa-calculator me-1" style="color:var(--secondary);"></i> Matematik <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(20 Soru)</span>
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-mat-d" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcDybNet('mat', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-mat-y" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcDybNet('mat', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-mat-b" min="0" max="20" placeholder="20" onfocus="this.select()" oninput="calcDybBoşChange('mat', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:6px 12px; text-align:center;">
                                    <input type="number" id="koc-den-mat" step="0.25" placeholder="0.00" onfocus="this.select()" oninput="updateAutoToplamNet()" style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--secondary); background:rgba(59,130,246,0.08); font-weight:800; color:var(--secondary); font-size:13px;">
                                </td>
                            </tr>

                            <!-- Fen Bilimleri Satırı -->
                            <tr style="border-bottom:1px solid var(--border);">
                                <td style="padding:8px 12px; font-weight:700; color:var(--teal);">
                                    <i class="fas fa-atom me-1" style="color:var(--teal);"></i> Fen Bilimleri <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(20 Soru)</span>
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-fen-d" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcDybNet('fen', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#10b981; font-size:12.5px;">
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-fen-y" min="0" max="20" placeholder="0" onfocus="this.select()" oninput="calcDybNet('fen', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:#ef4444; font-size:12.5px;">
                                </td>
                                <td style="padding:6px; text-align:center;">
                                    <input type="number" id="koc-den-fen-b" min="0" max="20" placeholder="20" onfocus="this.select()" oninput="calcDybBoşChange('fen', 20)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--border); font-weight:600; color:var(--text-muted); font-size:12.5px;">
                                </td>
                                <td style="padding:6px 12px; text-align:center;">
                                    <input type="number" id="koc-den-fen" step="0.25" placeholder="0.00" onfocus="this.select()" oninput="updateAutoToplamNet()" style="width:85px; text-align:center; padding:5px; border-radius:6px; border:1px solid var(--teal); background:rgba(20,184,166,0.08); font-weight:800; color:var(--teal); font-size:13px;">
                                </td>
                            </tr>

                            <!-- SAYISAL BÖLÜM TOPLAMI -->
                            <tr style="background:rgba(2,132,199,0.06); border-bottom:2px solid #0284c7;">
                                <td style="padding:8px 12px; font-weight:800; color:#0369a1;">
                                    <i class="fas fa-brain me-1" style="color:#0284c7;"></i> SAYISAL BÖLÜM TOPLAMI <span style="font-size:10.5px; color:var(--text-muted); font-weight:600;">(40 Soru)</span>
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sayisal-d" min="0" max="40" placeholder="0" onfocus="this.select()" oninput="calcDybNet('sayisal', 40)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #0284c7; font-weight:800; color:#10b981; font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sayisal-y" min="0" max="40" placeholder="0" onfocus="this.select()" oninput="calcDybNet('sayisal', 40)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #0284c7; font-weight:800; color:#ef4444; font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px; text-align:center;">
                                    <input type="number" id="koc-den-sayisal-b" min="0" max="40" placeholder="40" onfocus="this.select()" oninput="calcDybBoşChange('sayisal', 40)" style="width:65px; text-align:center; padding:5px; border-radius:6px; border:1px solid #0284c7; font-weight:700; color:var(--text-muted); font-size:12.5px; background:var(--card-bg);">
                                </td>
                                <td style="padding:5px 12px; text-align:center;">
                                    <input type="number" id="koc-den-sayisal" step="0.25" placeholder="0.00" onfocus="this.select()" oninput="updateAutoToplamNet()" style="width:85px; text-align:center; padding:5px; border-radius:6px; border:2px solid #0284c7; background:rgba(2,132,199,0.12); font-weight:900; color:#0369a1; font-size:13.5px;">
                                </td>
                            </tr>

                            <!-- GENEL TOPLAM Satırı -->
                            <tr style="background:rgba(16,185,129,0.06); font-weight:800;">
                                <td style="padding:10px 12px; color:var(--primary); font-size:12.5px;">
                                    <i class="fas fa-award me-1" style="color:#10b981;"></i> TOPLAM ${config.isLgsFinal ? 'LGS' : config.stageTitle.toUpperCase()} <span style="font-size:10.5px; color:var(--text-muted); font-weight:600;">(90 Soru)</span>
                                </td>
                                <td style="padding:8px 6px; text-align:center; color:#10b981; font-size:13px;" id="koc-den-toplam-d">0</td>
                                <td style="padding:8px 6px; text-align:center; color:#ef4444; font-size:13px;" id="koc-den-toplam-y">0</td>
                                <td style="padding:8px 6px; text-align:center; color:var(--text-muted); font-size:13px;" id="koc-den-toplam-b">90</td>
                                <td style="padding:8px 12px; text-align:center;">
                                    <input type="number" id="koc-den-toplam" readonly style="width:90px; text-align:center; padding:6px; border-radius:6px; border:2px solid #10b981; background:rgba(16,185,129,0.15); font-weight:900; font-size:14.5px; color:#10b981;">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Katlanabilir TDE Metrik Paneli -->
                <div id="koc-tde-details-panel" style="display:none; background:var(--card-bg); border:1px dashed var(--secondary); border-radius:8px; padding:14px; margin-bottom:12px;">
                    <div style="font-size:12px; font-weight:700; color:var(--secondary); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                        <span><i class="fas fa-stopwatch me-1"></i> ${config.isLgsFinal ? 'Turlama Disiplin Endeksi (TDE)' : 'Süre & Strateji Disiplin Skoru (TDE)'} Parametreleri</span>
                        <span id="koc-live-tde-badge" style="font-size:11px; font-weight:800; padding:2px 8px; border-radius:4px; background:rgba(245,158,11,0.15); color:#f59e0b;">
                            Hesaplanan TDE: 75/100
                        </span>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:10px; margin-bottom:10px;">
                        <div>
                            <label style="font-size:11px; font-weight:700;">ÇÖZÜM SIRASI:</label>
                            <select id="koc-tde-sira" onchange="liveCalculateTdePreview()" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                                <option value="Fen-Mat" selected>Önce Fen, Sonra Mat (Önerilen)</option>
                                <option value="Mat-Fen">Önce Mat, Sonra Fen</option>
                                <option value="Karisik">Karışık / Turlamasız</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">FEN 1. TUR SÜRE (DK):</label>
                            <input type="number" id="koc-tde-fen1" value="${config.isLgsFinal ? 32 : 28}" oninput="liveCalculateTdePreview()" placeholder="İdeal: &lt;= ${config.isLgsFinal ? 32 : 28}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">MAT 1. TUR SÜRE (DK):</label>
                            <input type="number" id="koc-tde-mat1" value="${config.isLgsFinal ? 30 : 25}" oninput="liveCalculateTdePreview()" placeholder="İdeal: &lt;= ${config.isLgsFinal ? 30 : 25}" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">İNATLAŞILAN SORU (&gt;2 DK):</label>
                            <input type="number" id="koc-tde-inat" value="0" oninput="liveCalculateTdePreview()" placeholder="İdeal: 0" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">FEN 2. TUR NET KAZANCI:</label>
                            <input type="number" id="koc-tde-fen2" value="2" oninput="liveCalculateTdePreview()" placeholder="İdeal: &gt;= 2" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">MAT 2. TUR NET KAZANCI:</label>
                            <input type="number" id="koc-tde-mat2" value="3" oninput="liveCalculateTdePreview()" placeholder="İdeal: &gt;= 3" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                    </div>

                    <div style="display:flex; align-items:center; gap:8px;">
                        <input type="checkbox" id="koc-tde-optik" checked onchange="liveCalculateTdePreview()" style="width:16px; height:16px;">
                        <label for="koc-tde-optik" style="font-size:12px; font-weight:600; cursor:pointer;">
                            Sınavın son 3 dakikasında sayfa sayfa optik kontrol ve turlama kontrolü uygulandı (+15p)
                        </label>
                    </div>
                </div>

                <div style="display:flex; justify-content:flex-end;">
                    <button class="btn btn-primary" onclick="saveNewDenemeEntry('${item.id}')" style="padding:7px 18px; font-size:12px; font-weight:700; border-radius:6px;">
                        <i class="fas fa-check me-1"></i> Deneme Sonucunu &amp; TDE Kaydet
                    </button>
                </div>
            </div>

            <!-- Tablo -->
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; text-align:left;">
                    <thead>
                        <tr style="background:var(--tab-bg); border-bottom:2px solid var(--border); font-size:11.5px; color:var(--text-muted); text-transform:uppercase;">
                            <th style="padding:10px;">Deneme Adı</th>
                            <th style="padding:10px;">Tarih</th>
                            <th style="padding:10px; text-align:center;">Sözel (50)</th>
                            <th style="padding:10px; text-align:center;">Mat (20)</th>
                            <th style="padding:10px; text-align:center;">Fen (20)</th>
                            <th style="padding:10px; text-align:center;">Toplam Net</th>
                            <th style="padding:10px; text-align:center;">${config.isLgsFinal ? 'TDE Skoru &amp; Teşhis' : 'Strateji Skoru &amp; Teşhis'}</th>
                            <th style="padding:10px; text-align:right;">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Henüz deneme kaydı yok.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }

    // ─────────────────────────────────────────────────────────────
    // DOĞRU / YANLIŞ / BOŞ VE OTOMATİK NET HESAPLAMA MOTORU
    // ─────────────────────────────────────────────────────────────
    function syncSayisalFromMatFen() {
        const mDEl = document.getElementById('koc-den-mat-d');
        const mYEl = document.getElementById('koc-den-mat-y');
        const fDEl = document.getElementById('koc-den-fen-d');
        const fYEl = document.getElementById('koc-den-fen-y');

        const mD = parseInt(mDEl?.value);
        const mY = parseInt(mYEl?.value);
        const fD = parseInt(fDEl?.value);
        const fY = parseInt(fYEl?.value);

        const hasMat = !isNaN(mD) || !isNaN(mY);
        const hasFen = !isNaN(fD) || !isNaN(fY);

        if (hasMat || hasFen) {
            const curMD = Math.max(0, mD || 0);
            const curMY = Math.max(0, mY || 0);
            const curFD = Math.max(0, fD || 0);
            const curFY = Math.max(0, fY || 0);

            const totD = curMD + curFD;
            const totY = curMY + curFY;
            const totB = Math.max(0, 40 - totD - totY);
            const totNet = Math.round((totD - (totY / 3)) * 100) / 100;

            const sayDEl = document.getElementById('koc-den-sayisal-d');
            const sayYEl = document.getElementById('koc-den-sayisal-y');
            const sayBEl = document.getElementById('koc-den-sayisal-b');
            const sayNetEl = document.getElementById('koc-den-sayisal');

            if (sayDEl) sayDEl.value = totD;
            if (sayYEl) sayYEl.value = totY;
            if (sayBEl) sayBEl.value = totB;
            if (sayNetEl) sayNetEl.value = totNet.toFixed(2).replace(/\.00$/, '');
        }
    }

    function calcDybNet(prefix, maxQ) {
        const dEl = document.getElementById(`koc-den-${prefix}-d`);
        const yEl = document.getElementById(`koc-den-${prefix}-y`);
        const bEl = document.getElementById(`koc-den-${prefix}-b`);
        const netEl = document.getElementById(`koc-den-${prefix}`);

        const dVal = Math.max(0, parseInt(dEl?.value) || 0);
        const yVal = Math.max(0, parseInt(yEl?.value) || 0);

        // Boş hesapla (Kalan soru sayısı)
        const bVal = Math.max(0, maxQ - dVal - yVal);
        if (bEl && (dEl?.value !== '' || yEl?.value !== '')) {
            bEl.value = bVal;
        }

        // LGS Kuralı: 3 Yanlış 1 Doğruyu Götürür
        const net = Math.round((dVal - (yVal / 3)) * 100) / 100;
        if (netEl) {
            netEl.value = (dEl?.value !== '' || yEl?.value !== '') ? (net.toFixed(2).replace(/\.00$/, '')) : '';
        }

        if (prefix === 'mat' || prefix === 'fen') {
            syncSayisalFromMatFen();
        }

        updateAutoToplamNet();
    }

    function calcDybBoşChange(prefix, maxQ) {
        const dEl = document.getElementById(`koc-den-${prefix}-d`);
        const yEl = document.getElementById(`koc-den-${prefix}-y`);
        const bEl = document.getElementById(`koc-den-${prefix}-b`);
        const dVal = parseInt(dEl?.value) || 0;
        const yVal = parseInt(yEl?.value) || 0;
        const bVal = parseInt(bEl?.value) || 0;

        if (dVal + yVal + bVal > maxQ) {
            if (bEl) bEl.style.borderColor = '#ef4444';
        } else {
            if (bEl) bEl.style.borderColor = 'var(--border)';
        }

        if (prefix === 'mat' || prefix === 'fen') {
            syncSayisalFromMatFen();
        }

        updateAutoToplamNet();
    }

    function calcSubBrans(subKey, maxQ) {
        const dEl = document.getElementById(`koc-sub-${subKey}-d`);
        const yEl = document.getElementById(`koc-sub-${subKey}-y`);
        const bEl = document.getElementById(`koc-sub-${subKey}-b`);
        const netEl = document.getElementById(`koc-sub-${subKey}-net`);
        const badge = document.getElementById(`koc-sub-${subKey}-net-badge`);

        const dVal = Math.max(0, parseInt(dEl?.value) || 0);
        const yVal = Math.max(0, parseInt(yEl?.value) || 0);
        const bVal = Math.max(0, maxQ - dVal - yVal);
        if (bEl && (dEl?.value !== '' || yEl?.value !== '')) {
            bEl.value = bVal;
        }

        const net = Math.round((dVal - (yVal / 3)) * 100) / 100;
        if (netEl) {
            netEl.value = (dEl?.value !== '' || yEl?.value !== '') ? (net.toFixed(2).replace(/\.00$/, '')) : '';
        }
        if (badge) {
            badge.textContent = `${net.toFixed(2).replace(/\.00$/, '')} Net`;
        }

        // 4 Sözel branşını topla
        const subList = [
            { key: 'tr', max: 20 },
            { key: 'ink', max: 10 },
            { key: 'din', max: 10 },
            { key: 'ing', max: 10 }
        ];

        let totalD = 0, totalY = 0, totalB = 0, totalNet = 0;
        let anyFilled = false;
        subList.forEach(s => {
            const d = parseInt(document.getElementById(`koc-sub-${s.key}-d`)?.value);
            const y = parseInt(document.getElementById(`koc-sub-${s.key}-y`)?.value);
            if (!isNaN(d) || !isNaN(y)) {
                anyFilled = true;
                const curD = Math.max(0, d || 0);
                const curY = Math.max(0, y || 0);
                const curB = Math.max(0, s.max - curD - curY);
                totalD += curD;
                totalY += curY;
                totalB += curB;
                totalNet += Math.round((curD - (curY / 3)) * 100) / 100;
            }
        });

        if (anyFilled) {
            const sozelDEl = document.getElementById('koc-den-sozel-d');
            const sozelYEl = document.getElementById('koc-den-sozel-y');
            const sozelBEl = document.getElementById('koc-den-sozel-b');
            const sozelNetEl = document.getElementById('koc-den-sozel');

            if (sozelDEl) sozelDEl.value = totalD;
            if (sozelYEl) sozelYEl.value = totalY;
            if (sozelBEl) sozelBEl.value = totalB;
            if (sozelNetEl) sozelNetEl.value = totalNet.toFixed(2).replace(/\.00$/, '');
        }

        updateAutoToplamNet();
    }

    function calcSubBoşChange(subKey, maxQ) {
        const dEl = document.getElementById(`koc-sub-${subKey}-d`);
        const yEl = document.getElementById(`koc-sub-${subKey}-y`);
        const bEl = document.getElementById(`koc-sub-${subKey}-b`);
        const dVal = parseInt(dEl?.value) || 0;
        const yVal = parseInt(yEl?.value) || 0;
        const bVal = parseInt(bEl?.value) || 0;

        if (dVal + yVal + bVal > maxQ) {
            if (bEl) bEl.style.borderColor = '#ef4444';
        } else {
            if (bEl) bEl.style.borderColor = 'var(--border)';
        }
        calcSubBrans(subKey, maxQ);
    }

    function toggleTdeDetailsPanel() {
        const panel = document.getElementById('koc-tde-details-panel');
        const text = document.getElementById('tde-toggle-text');
        if (!panel) return;
        if (panel.style.display === 'none' || !panel.style.display) {
            panel.style.display = 'block';
            if (text) text.textContent = 'TDE Detaylarını Gizle';
            liveCalculateTdePreview();
        } else {
            panel.style.display = 'none';
            if (text) text.textContent = 'TDE Turlama Detaylarını Göster';
        }
    }

    function updateAutoToplamNet() {
        const s = parseFloat(document.getElementById('koc-den-sozel')?.value) || 0;
        const m = parseFloat(document.getElementById('koc-den-mat')?.value) || 0;
        const f = parseFloat(document.getElementById('koc-den-fen')?.value) || 0;
        const sayNetInput = document.getElementById('koc-den-sayisal');

        let sayNet = 0;
        if (sayNetInput && sayNetInput.value !== '') {
            sayNet = parseFloat(sayNetInput.value) || 0;
        } else {
            sayNet = m + f;
        }

        const topEl = document.getElementById('koc-den-toplam');
        if (topEl) {
            topEl.value = (s + sayNet).toFixed(2).replace(/\.00$/, '');
        }

        // Toplam Doğru, Yanlış, Boş sayılarını güncelle
        const sD = parseInt(document.getElementById('koc-den-sozel-d')?.value) || 0;
        const mD = parseInt(document.getElementById('koc-den-mat-d')?.value) || 0;
        const fD = parseInt(document.getElementById('koc-den-fen-d')?.value) || 0;

        const sY = parseInt(document.getElementById('koc-den-sozel-y')?.value) || 0;
        const mY = parseInt(document.getElementById('koc-den-mat-y')?.value) || 0;
        const fY = parseInt(document.getElementById('koc-den-fen-y')?.value) || 0;

        const sB = parseInt(document.getElementById('koc-den-sozel-b')?.value) || 0;
        const mB = parseInt(document.getElementById('koc-den-mat-b')?.value) || 0;
        const fB = parseInt(document.getElementById('koc-den-fen-b')?.value) || 0;

        const sayDEl = document.getElementById('koc-den-sayisal-d');
        const sayYEl = document.getElementById('koc-den-sayisal-y');
        const sayBEl = document.getElementById('koc-den-sayisal-b');

        const sayD = (sayDEl && sayDEl.value !== '') ? (parseInt(sayDEl.value) || 0) : (mD + fD);
        const sayY = (sayYEl && sayYEl.value !== '') ? (parseInt(sayYEl.value) || 0) : (mY + fY);
        const sayB = (sayBEl && sayBEl.value !== '') ? (parseInt(sayBEl.value) || 0) : ((mD || fD || mY || fY) ? (mB + fB) : 40);

        const topDEl = document.getElementById('koc-den-toplam-d');
        const topYEl = document.getElementById('koc-den-toplam-y');
        const topBEl = document.getElementById('koc-den-toplam-b');

        if (topDEl) topDEl.textContent = (sD + sayD);
        if (topYEl) topYEl.textContent = (sY + sayY);
        if (topBEl) topBEl.textContent = (sB + sayB);
    }

    function liveCalculateTdePreview() {
        const badge = document.getElementById('koc-live-tde-badge');
        if (!badge) return;

        const curItem = (window.koclukData || []).find(k => String(k.id) === String(activeKoclukId));
        const dummy = {
            fen1TurSure: Number(document.getElementById('koc-tde-fen1')?.value) || 32,
            mat1TurSure: Number(document.getElementById('koc-tde-mat1')?.value) || 30,
            inatlasmaSayisi: Number(document.getElementById('koc-tde-inat')?.value) || 0,
            fen2TurKazanc: Number(document.getElementById('koc-tde-fen2')?.value) || 0,
            mat2TurKazanc: Number(document.getElementById('koc-tde-mat2')?.value) || 0,
            optikKontrol: document.getElementById('koc-tde-optik')?.checked
        };
        const res = calculateTDE(dummy, curItem?.sinif);
        badge.textContent = `Hesaplanan TDE: ${res.tdePuan}/100 • ${res.badgeText}`;
        badge.style.background = res.badgeBg;
        badge.style.color = res.badgeColor;
    }

    function saveNewDenemeEntry(kocId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const ad = document.getElementById('koc-den-ad')?.value.trim();
        if (!ad) {
            alert('Lütfen deneme adını giriniz.');
            return;
        }

        const sozel = parseFloat(document.getElementById('koc-den-sozel')?.value) || 0;
        const mat = parseFloat(document.getElementById('koc-den-mat')?.value) || 0;
        const fen = parseFloat(document.getElementById('koc-den-fen')?.value) || 0;
        const sayNetInput = document.getElementById('koc-den-sayisal');
        const sayNet = (sayNetInput && sayNetInput.value !== '') ? (parseFloat(sayNetInput.value) || 0) : parseFloat((mat + fen).toFixed(2));
        const toplam = parseFloat((sozel + sayNet).toFixed(2));
        const tarih = document.getElementById('koc-den-tarih')?.value.trim() || new Date().toLocaleDateString('tr-TR');

        const sozelD = parseInt(document.getElementById('koc-den-sozel-d')?.value) || 0;
        const sozelY = parseInt(document.getElementById('koc-den-sozel-y')?.value) || 0;
        const sozelB = parseInt(document.getElementById('koc-den-sozel-b')?.value) || 0;

        const matD = parseInt(document.getElementById('koc-den-mat-d')?.value) || 0;
        const matY = parseInt(document.getElementById('koc-den-mat-y')?.value) || 0;
        const matB = parseInt(document.getElementById('koc-den-mat-b')?.value) || 0;

        const fenD = parseInt(document.getElementById('koc-den-fen-d')?.value) || 0;
        const fenY = parseInt(document.getElementById('koc-den-fen-y')?.value) || 0;
        const fenB = parseInt(document.getElementById('koc-den-fen-b')?.value) || 0;

        const sayisalDEl = document.getElementById('koc-den-sayisal-d');
        const sayisalYEl = document.getElementById('koc-den-sayisal-y');
        const sayisalBEl = document.getElementById('koc-den-sayisal-b');

        const sayisalD = (sayisalDEl && sayisalDEl.value !== '') ? (parseInt(sayisalDEl.value) || 0) : (matD + fenD);
        const sayisalY = (sayisalYEl && sayisalYEl.value !== '') ? (parseInt(sayisalYEl.value) || 0) : (matY + fenY);
        const sayisalB = (sayisalBEl && sayisalBEl.value !== '') ? (parseInt(sayisalBEl.value) || 0) : (matB + fenB);

        const toplamD = sozelD + sayisalD;
        const toplamY = sozelY + sayisalY;
        const toplamB = sozelB + sayisalB;

        const turkceD = parseInt(document.getElementById('koc-sub-tr-d')?.value);
        const turkceY = parseInt(document.getElementById('koc-sub-tr-y')?.value);
        const turkceB = parseInt(document.getElementById('koc-sub-tr-b')?.value);

        const inkilapD = parseInt(document.getElementById('koc-sub-ink-d')?.value);
        const inkilapY = parseInt(document.getElementById('koc-sub-ink-y')?.value);
        const inkilapB = parseInt(document.getElementById('koc-sub-ink-b')?.value);

        const dinD = parseInt(document.getElementById('koc-sub-din-d')?.value);
        const dinY = parseInt(document.getElementById('koc-sub-din-y')?.value);
        const dinB = parseInt(document.getElementById('koc-sub-din-b')?.value);

        const ingilizceD = parseInt(document.getElementById('koc-sub-ing-d')?.value);
        const ingilizceY = parseInt(document.getElementById('koc-sub-ing-y')?.value);
        const ingilizceB = parseInt(document.getElementById('koc-sub-ing-b')?.value);

        const cozumSirasi = document.getElementById('koc-tde-sira')?.value || 'Fen-Mat';
        const fen1TurSure = Number(document.getElementById('koc-tde-fen1')?.value) || 32;
        const mat1TurSure = Number(document.getElementById('koc-tde-mat1')?.value) || 30;
        const inatlasmaSayisi = Number(document.getElementById('koc-tde-inat')?.value) || 0;
        const fen2TurKazanc = Number(document.getElementById('koc-tde-fen2')?.value) || 0;
        const mat2TurKazanc = Number(document.getElementById('koc-tde-mat2')?.value) || 0;
        const optikKontrol = !!document.getElementById('koc-tde-optik')?.checked;

        const inkilapNet = !isNaN(inkilapD) ? Math.round((inkilapD - ((inkilapY || 0) / 3)) * 100) / 100 : null;

        const denemeObj = {
            id: 'den_' + Date.now(),
            ad,
            tarih,
            sozelD,
            sozelY,
            sozelB,
            sozelNet: sozel,
            matD,
            matY,
            matB,
            matNet: mat,
            fenD,
            fenY,
            fenB,
            fenNet: fen,
            sayisalD,
            sayisalY,
            sayisalB,
            sayisalNet: sayNet,
            toplamD,
            toplamY,
            toplamB,
            toplamNet: toplam,
            turkceD: !isNaN(turkceD) ? turkceD : null,
            turkceY: !isNaN(turkceY) ? turkceY : null,
            turkceB: !isNaN(turkceB) ? turkceB : null,
            turkce: !isNaN(turkceD) ? Math.round((turkceD - ((turkceY || 0) / 3)) * 100) / 100 : null,

            inkilapD: !isNaN(inkilapD) ? inkilapD : null,
            inkilapY: !isNaN(inkilapY) ? inkilapY : null,
            inkilapB: !isNaN(inkilapB) ? inkilapB : null,
            inkilap: inkilapNet,
            sosyal: inkilapNet, // 5-7. Sınıflar İçin Sosyal Bilgiler Uyumu

            dinD: !isNaN(dinD) ? dinD : null,
            dinY: !isNaN(dinY) ? dinY : null,
            dinB: !isNaN(dinB) ? dinB : null,
            din: !isNaN(dinD) ? Math.round((dinD - ((dinY || 0) / 3)) * 100) / 100 : null,

            ingilizceD: !isNaN(ingilizceD) ? ingilizceD : null,
            ingilizceY: !isNaN(ingilizceY) ? ingilizceY : null,
            ingilizceB: !isNaN(ingilizceB) ? ingilizceB : null,
            ingilizce: !isNaN(ingilizceD) ? Math.round((ingilizceD - ((ingilizceY || 0) / 3)) * 100) / 100 : null,
            cozumSirasi,
            fen1TurSure,
            mat1TurSure,
            inatlasmaSayisi,
            fen2TurKazanc,
            mat2TurKazanc,
            optikKontrol,
            tdePuan: 0
        };

        denemeObj.tdePuan = calculateTDE(denemeObj, item.sinif).tdePuan;

        if (!Array.isArray(item.denemeler)) item.denemeler = [];
        item.denemeler.push(denemeObj);

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Deneme sınavı ve TDE strateji analizi başarıyla kaydedildi.', 'success');
        }

        renderSubTabDenemeler(item);
        renderKoclukModule();
    }

    function deleteDenemeEntry(kocId, denId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.denemeler)) return;

        if (confirm('Bu deneme kaydını silmek istediğinize emin misiniz?')) {
            item.denemeler = item.denemeler.filter(d => String(d.id) !== String(denId));
            if (typeof saveData === 'function') saveData(true);
            renderSubTabDenemeler(item);
            renderKoclukModule();
        }
    }

    function openEditDenemeModal(kocId, denId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.denemeler)) return;
        const den = item.denemeler.find(d => String(d.id) === String(denId));
        if (!den) return;

        const config = getGradeCognitiveConfig(item.sinif);

        document.getElementById('edit-den-koc-id').value = kocId;
        document.getElementById('edit-den-id').value = denId;
        document.getElementById('edit-den-ad').value = den.ad || '';
        document.getElementById('edit-den-tarih').value = den.tarih || new Date().toLocaleDateString('tr-TR');

        // Modal Sözel Branş Etiketini Sınıfa Göre Güncelle (Sosyal Bilgiler vs İnkılap)
        const inkLabel = document.getElementById('edit-sub-ink-label');
        if (inkLabel) {
            inkLabel.innerHTML = `<i class="${config.sosyalDersIcon} me-1" style="color:#f59e0b;"></i> ${config.sosyalDersAdi} <span style="font-size:10.5px; color:var(--text-muted); font-weight:500;">(10 Soru)</span>`;
        }

        // Sözel Alt Branşları Çözümle ve Doldur
        let sumSubD = 0, sumSubY = 0, sumSubB = 0;
        let anySubFilled = false;

        const editSubList = [
            { key: 'tr', dProp: 'turkceD', yProp: 'turkceY', bProp: 'turkceB', netProp: 'turkce', max: 20 },
            { key: 'ink', dProp: 'inkilapD', yProp: 'inkilapY', bProp: 'inkilapB', netProp: 'inkilap', altNet: 'sosyal', fallbackNet: 'inkNet', max: 10 },
            { key: 'din', dProp: 'dinD', yProp: 'dinY', bProp: 'dinB', netProp: 'din', altNet: 'dinNet', max: 10 },
            { key: 'ing', dProp: 'ingilizceD', yProp: 'ingilizceY', bProp: 'ingilizceB', netProp: 'ingilizce', altNet: 'ingNet', max: 10 }
        ];

        editSubList.forEach(s => {
            let curD = den[s.dProp];
            let curY = den[s.yProp];
            let curB = den[s.bProp];
            let curNet = (den[s.netProp] != null && den[s.netProp] !== '') 
                ? den[s.netProp] 
                : (s.altNet && den[s.altNet] != null ? den[s.altNet] : (s.fallbackNet ? den[s.fallbackNet] : null));

            // Eğer D veya Y boş ama Net varsa, otomatik DYB çöz
            if ((curD == null || curD === '') && (curY == null || curY === '') && curNet != null && curNet !== '') {
                const resolved = resolveDybFromNet(curNet, s.max, 3);
                curD = resolved.d;
                curY = resolved.y;
                curB = resolved.b;
                den[s.dProp] = curD;
                den[s.yProp] = curY;
                den[s.bProp] = curB;
            }

            if (curD != null && curD !== '') {
                anySubFilled = true;
                const dNum = Math.max(0, parseInt(curD) || 0);
                const yNum = Math.max(0, parseInt(curY) || 0);
                const bNum = (curB != null && curB !== '') ? Math.max(0, parseInt(curB) || 0) : Math.max(0, s.max - dNum - yNum);
                sumSubD += dNum;
                sumSubY += yNum;
                sumSubB += bNum;
            }

            const dEl = document.getElementById(`edit-sub-${s.key}-d`);
            const yEl = document.getElementById(`edit-sub-${s.key}-y`);
            const bEl = document.getElementById(`edit-sub-${s.key}-b`);
            const netEl = document.getElementById(`edit-sub-${s.key}-net`);

            if (dEl) dEl.value = (curD != null && curD !== '') ? curD : '';
            if (yEl) yEl.value = (curY != null && curY !== '') ? curY : '';
            if (bEl) {
                if (curB != null && curB !== '') {
                    bEl.value = curB;
                } else if ((curD != null && curD !== '') || (curY != null && curY !== '')) {
                    bEl.value = Math.max(0, s.max - (parseInt(curD) || 0) - (parseInt(curY) || 0));
                } else {
                    bEl.value = '';
                }
            }
            if (netEl) netEl.value = (curNet != null && curNet !== '') ? curNet : '';
        });

        // Sözel Toplam
        let sozelD = den.sozelD;
        let sozelY = den.sozelY;
        let sozelB = den.sozelB;
        let sozelNet = den.sozelNet;

        if ((sozelD == null || sozelD === '') && (sozelY == null || sozelY === '')) {
            if (anySubFilled) {
                sozelD = sumSubD;
                sozelY = sumSubY;
                sozelB = sumSubB;
                if (sozelNet == null || sozelNet === '') {
                    sozelNet = Math.round((sozelD - (sozelY / 3)) * 100) / 100;
                }
            } else if (sozelNet != null && sozelNet !== '') {
                const resolved = resolveDybFromNet(sozelNet, 50, 3);
                sozelD = resolved.d;
                sozelY = resolved.y;
                sozelB = resolved.b;
            }
            den.sozelD = sozelD;
            den.sozelY = sozelY;
            den.sozelB = sozelB;
        }

        if (document.getElementById('edit-den-sozel-d')) {
            document.getElementById('edit-den-sozel-d').value = (sozelD != null && sozelD !== '') ? sozelD : '';
            document.getElementById('edit-den-sozel-y').value = (sozelY != null && sozelY !== '') ? sozelY : '';
            document.getElementById('edit-den-sozel-b').value = (sozelB != null && sozelB !== '') ? sozelB : '';
        }
        document.getElementById('edit-den-sozel').value = (sozelNet != null && sozelNet !== '') ? sozelNet : '';

        // Matematik
        let matD = den.matD;
        let matY = den.matY;
        let matB = den.matB;
        let matNet = (den.matNet != null && den.matNet !== '') ? den.matNet : den.matematik;

        if ((matD == null || matD === '') && (matY == null || matY === '') && matNet != null && matNet !== '') {
            const resolved = resolveDybFromNet(matNet, 20, 3);
            matD = resolved.d;
            matY = resolved.y;
            matB = resolved.b;
            den.matD = matD;
            den.matY = matY;
            den.matB = matB;
        }

        if (document.getElementById('edit-den-mat-d')) {
            document.getElementById('edit-den-mat-d').value = (matD != null && matD !== '') ? matD : '';
            document.getElementById('edit-den-mat-y').value = (matY != null && matY !== '') ? matY : '';
            document.getElementById('edit-den-mat-b').value = (matB != null && matB !== '') ? matB : '';
        }
        document.getElementById('edit-den-mat').value = (matNet != null && matNet !== '') ? matNet : '';

        // Fen Bilimleri
        let fenD = den.fenD;
        let fenY = den.fenY;
        let fenB = den.fenB;
        let fenNet = (den.fenNet != null && den.fenNet !== '') ? den.fenNet : den.fen;

        if ((fenD == null || fenD === '') && (fenY == null || fenY === '') && fenNet != null && fenNet !== '') {
            const resolved = resolveDybFromNet(fenNet, 20, 3);
            fenD = resolved.d;
            fenY = resolved.y;
            fenB = resolved.b;
            den.fenD = fenD;
            den.fenY = fenY;
            den.fenB = fenB;
        }

        if (document.getElementById('edit-den-fen-d')) {
            document.getElementById('edit-den-fen-d').value = (fenD != null && fenD !== '') ? fenD : '';
            document.getElementById('edit-den-fen-y').value = (fenY != null && fenY !== '') ? fenY : '';
            document.getElementById('edit-den-fen-b').value = (fenB != null && fenB !== '') ? fenB : '';
        }
        document.getElementById('edit-den-fen').value = (fenNet != null && fenNet !== '') ? fenNet : '';

        // Sayısal Toplam
        let sayD = den.sayisalD;
        let sayY = den.sayisalY;
        let sayB = den.sayisalB;
        let sayNetVal = den.sayisalNet;

        if ((sayD == null || sayD === '') && (sayY == null || sayY === '')) {
            if ((matD != null && matD !== '') || (fenD != null && fenD !== '')) {
                sayD = (parseInt(matD) || 0) + (parseInt(fenD) || 0);
                sayY = (parseInt(matY) || 0) + (parseInt(fenY) || 0);
                sayB = (parseInt(matB) || 0) + (parseInt(fenB) || 0);
            } else if (sayNetVal != null && sayNetVal !== '') {
                const resolved = resolveDybFromNet(sayNetVal, 40, 3);
                sayD = resolved.d;
                sayY = resolved.y;
                sayB = resolved.b;
            }
            den.sayisalD = sayD;
            den.sayisalY = sayY;
            den.sayisalB = sayB;
        }

        if (sayNetVal == null || sayNetVal === '') {
            if (matNet != null || fenNet != null) {
                sayNetVal = Math.round(((parseFloat(matNet) || 0) + (parseFloat(fenNet) || 0)) * 100) / 100;
            }
        }

        if (document.getElementById('edit-den-sayisal-d')) {
            document.getElementById('edit-den-sayisal-d').value = (sayD != null && sayD !== '') ? sayD : '';
            document.getElementById('edit-den-sayisal-y').value = (sayY != null && sayY !== '') ? sayY : '';
            document.getElementById('edit-den-sayisal-b').value = (sayB != null && sayB !== '') ? sayB : '';
        }
        if (document.getElementById('edit-den-sayisal')) {
            document.getElementById('edit-den-sayisal').value = (sayNetVal != null && sayNetVal !== '') ? sayNetVal : '';
        }

        // Genel Toplam (90 Soru)
        let topD = den.toplamD;
        let topY = den.toplamY;
        let topB = den.toplamB;
        let topNet = den.toplamNet;

        if ((topD == null || topD === '') && (topY == null || topY === '')) {
            if ((sozelD != null && sozelD !== '') || (sayD != null && sayD !== '')) {
                topD = (parseInt(sozelD) || 0) + (parseInt(sayD) || 0);
                topY = (parseInt(sozelY) || 0) + (parseInt(sayY) || 0);
                topB = (parseInt(sozelB) || 0) + (parseInt(sayB) || 0);
            } else if (topNet != null && topNet !== '') {
                const resolved = resolveDybFromNet(topNet, 90, 3);
                topD = resolved.d;
                topY = resolved.y;
                topB = resolved.b;
            }
            den.toplamD = topD;
            den.toplamY = topY;
            den.toplamB = topB;
        }

        if (topNet == null || topNet === '') {
            topNet = Math.round(((parseFloat(sozelNet) || 0) + (parseFloat(sayNetVal) || 0)) * 100) / 100;
        }

        document.getElementById('edit-den-toplam').value = (topNet != null && topNet !== '') ? topNet : '';

        const editTopD = document.getElementById('edit-den-toplam-d');
        const editTopY = document.getElementById('edit-den-toplam-y');
        const editTopB = document.getElementById('edit-den-toplam-b');
        if (editTopD) editTopD.textContent = (topD != null && topD !== '') ? topD : 0;
        if (editTopY) editTopY.textContent = (topY != null && topY !== '') ? topY : 0;
        if (editTopB) editTopB.textContent = (topB != null && topB !== '') ? topB : 90;

        document.getElementById('edit-tde-fen1').value = den.fen1TurSure ?? 32;
        document.getElementById('edit-tde-mat1').value = den.mat1TurSure ?? 30;
        document.getElementById('edit-tde-inat').value = den.inatlasmaSayisi ?? 0;
        document.getElementById('edit-tde-fen2').value = den.fen2TurKazanc ?? 2;
        document.getElementById('edit-tde-mat2').value = den.mat2TurKazanc ?? 3;
        document.getElementById('edit-tde-optik').checked = !!den.optikKontrol;

        editLiveTdePreview();
        const modal = document.getElementById('kocluk-edit-deneme-modal');
        if (modal) modal.style.display = 'flex';
    }

    function editSyncSayisalFromMatFen() {
        const mDEl = document.getElementById('edit-den-mat-d');
        const mYEl = document.getElementById('edit-den-mat-y');
        const fDEl = document.getElementById('edit-den-fen-d');
        const fYEl = document.getElementById('edit-den-fen-y');

        const mD = parseInt(mDEl?.value);
        const mY = parseInt(mYEl?.value);
        const fD = parseInt(fDEl?.value);
        const fY = parseInt(fYEl?.value);

        const hasMat = !isNaN(mD) || !isNaN(mY);
        const hasFen = !isNaN(fD) || !isNaN(fY);

        if (hasMat || hasFen) {
            const curMD = Math.max(0, mD || 0);
            const curMY = Math.max(0, mY || 0);
            const curFD = Math.max(0, fD || 0);
            const curFY = Math.max(0, fY || 0);

            const totD = curMD + curFD;
            const totY = curMY + curFY;
            const totB = Math.max(0, 40 - totD - totY);
            const totNet = Math.round((totD - (totY / 3)) * 100) / 100;

            const sayDEl = document.getElementById('edit-den-sayisal-d');
            const sayYEl = document.getElementById('edit-den-sayisal-y');
            const sayBEl = document.getElementById('edit-den-sayisal-b');
            const sayNetEl = document.getElementById('edit-den-sayisal');

            if (sayDEl) sayDEl.value = totD;
            if (sayYEl) sayYEl.value = totY;
            if (sayBEl) sayBEl.value = totB;
            if (sayNetEl) sayNetEl.value = totNet.toFixed(2).replace(/\.00$/, '');
        }
    }

    function editCalcDybNet(prefix, maxQ) {
        const dEl = document.getElementById(`edit-den-${prefix}-d`);
        const yEl = document.getElementById(`edit-den-${prefix}-y`);
        const bEl = document.getElementById(`edit-den-${prefix}-b`);
        const netEl = document.getElementById(`edit-den-${prefix}`);

        const dVal = Math.max(0, parseInt(dEl?.value) || 0);
        const yVal = Math.max(0, parseInt(yEl?.value) || 0);
        const bVal = Math.max(0, maxQ - dVal - yVal);
        if (bEl && (dEl?.value !== '' || yEl?.value !== '')) {
            bEl.value = bVal;
        }

        const net = Math.round((dVal - (yVal / 3)) * 100) / 100;
        if (netEl) {
            netEl.value = (dEl?.value !== '' || yEl?.value !== '') ? (net.toFixed(2).replace(/\.00$/, '')) : '';
        }

        if (prefix === 'mat' || prefix === 'fen') {
            editSyncSayisalFromMatFen();
        }

        editUpdateAutoNet();
    }

    function editCalcDybBoşChange(prefix, maxQ) {
        const dEl = document.getElementById(`edit-den-${prefix}-d`);
        const yEl = document.getElementById(`edit-den-${prefix}-y`);
        const bEl = document.getElementById(`edit-den-${prefix}-b`);
        const dVal = parseInt(dEl?.value) || 0;
        const yVal = parseInt(yEl?.value) || 0;
        const bVal = parseInt(bEl?.value) || 0;

        if (dVal + yVal + bVal > maxQ) {
            if (bEl) bEl.style.borderColor = '#ef4444';
        } else {
            if (bEl) bEl.style.borderColor = 'var(--border)';
        }

        if (prefix === 'mat' || prefix === 'fen') {
            editSyncSayisalFromMatFen();
        }

        editUpdateAutoNet();
    }

    function editCalcSubBrans(subKey, maxQ) {
        const dEl = document.getElementById(`edit-sub-${subKey}-d`);
        const yEl = document.getElementById(`edit-sub-${subKey}-y`);
        const bEl = document.getElementById(`edit-sub-${subKey}-b`);
        const netEl = document.getElementById(`edit-sub-${subKey}-net`);

        const dVal = Math.max(0, parseInt(dEl?.value) || 0);
        const yVal = Math.max(0, parseInt(yEl?.value) || 0);
        const bVal = Math.max(0, maxQ - dVal - yVal);
        if (bEl && (dEl?.value !== '' || yEl?.value !== '')) {
            bEl.value = bVal;
        }

        const net = Math.round((dVal - (yVal / 3)) * 100) / 100;
        if (netEl) {
            netEl.value = (dEl?.value !== '' || yEl?.value !== '') ? (net.toFixed(2).replace(/\.00$/, '')) : '';
        }

        // 4 Sözel branşını topla ve edit-den-sozel'e aktar
        const subList = [
            { key: 'tr', max: 20 },
            { key: 'ink', max: 10 },
            { key: 'din', max: 10 },
            { key: 'ing', max: 10 }
        ];

        let totalD = 0, totalY = 0, totalB = 0, totalNet = 0;
        let anyFilled = false;
        subList.forEach(s => {
            const d = parseInt(document.getElementById(`edit-sub-${s.key}-d`)?.value);
            const y = parseInt(document.getElementById(`edit-sub-${s.key}-y`)?.value);
            if (!isNaN(d) || !isNaN(y)) {
                anyFilled = true;
                const curD = Math.max(0, d || 0);
                const curY = Math.max(0, y || 0);
                const curB = Math.max(0, s.max - curD - curY);
                totalD += curD;
                totalY += curY;
                totalB += curB;
                totalNet += Math.round((curD - (curY / 3)) * 100) / 100;
            }
        });

        if (anyFilled) {
            const sozelDEl = document.getElementById('edit-den-sozel-d');
            const sozelYEl = document.getElementById('edit-den-sozel-y');
            const sozelBEl = document.getElementById('edit-den-sozel-b');
            const sozelNetEl = document.getElementById('edit-den-sozel');

            if (sozelDEl) sozelDEl.value = totalD;
            if (sozelYEl) sozelYEl.value = totalY;
            if (sozelBEl) sozelBEl.value = totalB;
            if (sozelNetEl) sozelNetEl.value = totalNet.toFixed(2).replace(/\.00$/, '');
        }

        editUpdateAutoNet();
    }

    function editCalcSubBoşChange(subKey, maxQ) {
        const dEl = document.getElementById(`edit-sub-${subKey}-d`);
        const yEl = document.getElementById(`edit-sub-${subKey}-y`);
        const bEl = document.getElementById(`edit-sub-${subKey}-b`);
        const dVal = parseInt(dEl?.value) || 0;
        const yVal = parseInt(yEl?.value) || 0;
        const bVal = parseInt(bEl?.value) || 0;

        if (dVal + yVal + bVal > maxQ) {
            if (bEl) bEl.style.borderColor = '#ef4444';
        } else {
            if (bEl) bEl.style.borderColor = 'var(--border)';
        }
        editCalcSubBrans(subKey, maxQ);
    }

    function editUpdateAutoNet() {
        const sozel = parseFloat(document.getElementById('edit-den-sozel')?.value) || 0;
        const mat = parseFloat(document.getElementById('edit-den-mat')?.value) || 0;
        const fen = parseFloat(document.getElementById('edit-den-fen')?.value) || 0;
        const sayNetInput = document.getElementById('edit-den-sayisal');

        let sayNet = 0;
        if (sayNetInput && sayNetInput.value !== '') {
            sayNet = parseFloat(sayNetInput.value) || 0;
        } else {
            sayNet = mat + fen;
        }

        const topEl = document.getElementById('edit-den-toplam');
        if (topEl) {
            topEl.value = (sozel + sayNet).toFixed(2).replace(/\.00$/, '');
        }

        const sD = parseInt(document.getElementById('edit-den-sozel-d')?.value) || 0;
        const mD = parseInt(document.getElementById('edit-den-mat-d')?.value) || 0;
        const fD = parseInt(document.getElementById('edit-den-fen-d')?.value) || 0;

        const sY = parseInt(document.getElementById('edit-den-sozel-y')?.value) || 0;
        const mY = parseInt(document.getElementById('edit-den-mat-y')?.value) || 0;
        const fY = parseInt(document.getElementById('edit-den-fen-y')?.value) || 0;

        const sB = parseInt(document.getElementById('edit-den-sozel-b')?.value) || 0;
        const mB = parseInt(document.getElementById('edit-den-mat-b')?.value) || 0;
        const fB = parseInt(document.getElementById('edit-den-fen-b')?.value) || 0;

        const sayDEl = document.getElementById('edit-den-sayisal-d');
        const sayYEl = document.getElementById('edit-den-sayisal-y');
        const sayBEl = document.getElementById('edit-den-sayisal-b');

        const sayD = (sayDEl && sayDEl.value !== '') ? (parseInt(sayDEl.value) || 0) : (mD + fD);
        const sayY = (sayYEl && sayYEl.value !== '') ? (parseInt(sayYEl.value) || 0) : (mY + fY);
        const sayB = (sayBEl && sayBEl.value !== '') ? (parseInt(sayBEl.value) || 0) : ((mD || fD || mY || fY) ? (mB + fB) : 40);

        const topDEl = document.getElementById('edit-den-toplam-d');
        const topYEl = document.getElementById('edit-den-toplam-y');
        const topBEl = document.getElementById('edit-den-toplam-b');

        if (topDEl) topDEl.textContent = (sD + sayD);
        if (topYEl) topYEl.textContent = (sY + sayY);
        if (topBEl) topBEl.textContent = (sB + sayB);

        editLiveTdePreview();
    }

    function editLiveTdePreview() {
        const kocId = document.getElementById('edit-den-koc-id')?.value;
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));

        const fen1 = Number(document.getElementById('edit-tde-fen1')?.value) || 32;
        const mat1 = Number(document.getElementById('edit-tde-mat1')?.value) || 30;
        const inat = Number(document.getElementById('edit-tde-inat')?.value) || 0;
        const fen2 = Number(document.getElementById('edit-tde-fen2')?.value) || 2;
        const mat2 = Number(document.getElementById('edit-tde-mat2')?.value) || 3;
        const optik = !!document.getElementById('edit-tde-optik')?.checked;

        const res = calculateTDE({
            fen1TurSure: fen1,
            mat1TurSure: mat1,
            inatlasmaSayisi: inat,
            fen2TurKazanc: fen2,
            mat2TurKazanc: mat2,
            optikKontrol: optik
        }, item?.sinif);

        const badge = document.getElementById('edit-live-tde-badge');
        if (badge) {
            badge.textContent = `Hesaplanan TDE: ${res.tdePuan}/100 • ${res.badgeText}`;
            badge.style.background = res.badgeBg;
            badge.style.color = res.badgeColor;
        }
    }

    function saveEditDeneme() {
        const kocId = document.getElementById('edit-den-koc-id')?.value;
        const denId = document.getElementById('edit-den-id')?.value;
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.denemeler)) return;
        const den = item.denemeler.find(d => String(d.id) === String(denId));
        if (!den) return;

        const ad = document.getElementById('edit-den-ad')?.value.trim();
        if (!ad) {
            alert('Lütfen deneme adını giriniz.');
            return;
        }

        const sozel = parseFloat(document.getElementById('edit-den-sozel')?.value) || 0;
        const mat = parseFloat(document.getElementById('edit-den-mat')?.value) || 0;
        const fen = parseFloat(document.getElementById('edit-den-fen')?.value) || 0;
        const toplam = parseFloat(document.getElementById('edit-den-toplam')?.value) || (sozel + mat + fen);
        const tarih = document.getElementById('edit-den-tarih')?.value.trim() || den.tarih;

        const sozelD = parseInt(document.getElementById('edit-den-sozel-d')?.value) || 0;
        const sozelY = parseInt(document.getElementById('edit-den-sozel-y')?.value) || 0;
        const sozelB = parseInt(document.getElementById('edit-den-sozel-b')?.value) || 0;

        const matD = parseInt(document.getElementById('edit-den-mat-d')?.value) || 0;
        const matY = parseInt(document.getElementById('edit-den-mat-y')?.value) || 0;
        const matB = parseInt(document.getElementById('edit-den-mat-b')?.value) || 0;

        const fenD = parseInt(document.getElementById('edit-den-fen-d')?.value) || 0;
        const fenY = parseInt(document.getElementById('edit-den-fen-y')?.value) || 0;
        const fenB = parseInt(document.getElementById('edit-den-fen-b')?.value) || 0;

        const sayisalDEl = document.getElementById('edit-den-sayisal-d');
        const sayisalYEl = document.getElementById('edit-den-sayisal-y');
        const sayisalBEl = document.getElementById('edit-den-sayisal-b');
        const sayisalNetEl = document.getElementById('edit-den-sayisal');

        const sayisalD = (sayisalDEl && sayisalDEl.value !== '') ? (parseInt(sayisalDEl.value) || 0) : (matD + fenD);
        const sayisalY = (sayisalYEl && sayisalYEl.value !== '') ? (parseInt(sayisalYEl.value) || 0) : (matY + fenY);
        const sayisalB = (sayisalBEl && sayisalBEl.value !== '') ? (parseInt(sayisalBEl.value) || 0) : (matB + fenB);
        const sayisalNet = (sayisalNetEl && sayisalNetEl.value !== '') ? (parseFloat(sayisalNetEl.value) || 0) : parseFloat((mat + fen).toFixed(2));

        const fen1 = Number(document.getElementById('edit-tde-fen1')?.value) || 32;
        const mat1 = Number(document.getElementById('edit-tde-mat1')?.value) || 30;
        const inat = Number(document.getElementById('edit-tde-inat')?.value) || 0;
        const fen2 = Number(document.getElementById('edit-tde-fen2')?.value) || 0;
        const mat2 = Number(document.getElementById('edit-tde-mat2')?.value) || 0;
        const optik = !!document.getElementById('edit-tde-optik')?.checked;

        const turkceD = parseInt(document.getElementById('edit-sub-tr-d')?.value);
        const turkceY = parseInt(document.getElementById('edit-sub-tr-y')?.value);
        const turkceB = parseInt(document.getElementById('edit-sub-tr-b')?.value);

        const inkilapD = parseInt(document.getElementById('edit-sub-ink-d')?.value);
        const inkilapY = parseInt(document.getElementById('edit-sub-ink-y')?.value);
        const inkilapB = parseInt(document.getElementById('edit-sub-ink-b')?.value);

        const dinD = parseInt(document.getElementById('edit-sub-din-d')?.value);
        const dinY = parseInt(document.getElementById('edit-sub-din-y')?.value);
        const dinB = parseInt(document.getElementById('edit-sub-din-b')?.value);

        const ingilizceD = parseInt(document.getElementById('edit-sub-ing-d')?.value);
        const ingilizceY = parseInt(document.getElementById('edit-sub-ing-y')?.value);
        const ingilizceB = parseInt(document.getElementById('edit-sub-ing-b')?.value);

        const tdeInfo = calculateTDE({
            fen1TurSure: fen1,
            mat1TurSure: mat1,
            inatlasmaSayisi: inat,
            fen2TurKazanc: fen2,
            mat2TurKazanc: mat2,
            optikKontrol: optik
        }, item.sinif);

        den.ad = ad;
        den.tarih = tarih;
        den.sozelD = sozelD;
        den.sozelY = sozelY;
        den.sozelB = sozelB;
        den.sozelNet = sozel;
        den.matD = matD;
        den.matY = matY;
        den.matB = matB;
        den.matNet = mat;
        den.fenD = fenD;
        den.fenY = fenY;
        den.fenB = fenB;
        den.fenNet = fen;
        den.sayisalD = sayisalD;
        den.sayisalY = sayisalY;
        den.sayisalB = sayisalB;
        den.sayisalNet = sayisalNet;
        den.toplamD = sozelD + sayisalD;
        den.toplamY = sozelY + sayisalY;
        den.toplamB = sozelB + sayisalB;
        den.toplamNet = Math.round(toplam * 100) / 100;

        const subTrNet = parseFloat(document.getElementById('edit-sub-tr-net')?.value);
        const subInkNet = parseFloat(document.getElementById('edit-sub-ink-net')?.value);
        const subDinNet = parseFloat(document.getElementById('edit-sub-din-net')?.value);
        const subIngNet = parseFloat(document.getElementById('edit-sub-ing-net')?.value);

        den.turkceD = !isNaN(turkceD) ? turkceD : null;
        den.turkceY = !isNaN(turkceY) ? turkceY : null;
        den.turkceB = !isNaN(turkceB) ? turkceB : null;
        den.turkce = !isNaN(turkceD) ? Math.round((turkceD - ((turkceY || 0) / 3)) * 100) / 100 : (!isNaN(subTrNet) ? subTrNet : den.turkce);

        den.inkilapD = !isNaN(inkilapD) ? inkilapD : null;
        den.inkilapY = !isNaN(inkilapY) ? inkilapY : null;
        den.inkilapB = !isNaN(inkilapB) ? inkilapB : null;
        const finalInkNet = !isNaN(inkilapD) ? Math.round((inkilapD - ((inkilapY || 0) / 3)) * 100) / 100 : (!isNaN(subInkNet) ? subInkNet : den.inkilap);
        den.inkilap = finalInkNet;
        den.sosyal = finalInkNet; // 5-7. Sınıflar İçin Sosyal Bilgiler Uyumu
        den.sosyalD = den.inkilapD;
        den.sosyalY = den.inkilapY;
        den.sosyalB = den.inkilapB;

        den.dinD = !isNaN(dinD) ? dinD : null;
        den.dinY = !isNaN(dinY) ? dinY : null;
        den.dinB = !isNaN(dinB) ? dinB : null;
        den.din = !isNaN(dinD) ? Math.round((dinD - ((dinY || 0) / 3)) * 100) / 100 : (!isNaN(subDinNet) ? subDinNet : den.din);

        den.ingilizceD = !isNaN(ingilizceD) ? ingilizceD : null;
        den.ingilizceY = !isNaN(ingilizceY) ? ingilizceY : null;
        den.ingilizceB = !isNaN(ingilizceB) ? ingilizceB : null;
        den.ingilizce = !isNaN(ingilizceD) ? Math.round((ingilizceD - ((ingilizceY || 0) / 3)) * 100) / 100 : (!isNaN(subIngNet) ? subIngNet : den.ingilizce);

        den.fen1TurSure = fen1;
        den.mat1TurSure = mat1;
        den.inatlasmaSayisi = inat;
        den.fen2TurKazanc = fen2;
        den.mat2TurKazanc = mat2;
        den.optikKontrol = optik;
        den.tdePuan = tdeInfo.tdePuan;

        // 8. Sınav Analiz modülünden gelen bir denemeyse, examData'daki öğrenci sonucunu da güncelle
        if ((den.source === 'exam_module' || den.examId) && Array.isArray(window.examData)) {
            const linkedExam = window.examData.find(e => String(e.id) === String(den.examId));
            if (linkedExam && linkedExam.results) {
                const studentKey = Object.keys(linkedExam.results).find(name => {
                    const r = linkedExam.results[name];
                    return (r && r.no && String(r.no).trim() === String(item.studentNo).trim()) ||
                           (name.trim().toLocaleLowerCase('tr-TR') === (item.adSoyad || '').trim().toLocaleLowerCase('tr-TR'));
                });
                if (studentKey && linkedExam.results[studentKey]) {
                    const stRes = linkedExam.results[studentKey];
                    if (den.turkce != null) stRes.Turkce = den.turkce;
                    if (den.matNet != null) stRes.Matematik = den.matNet;
                    if (den.fenNet != null) stRes.Fen = den.fenNet;
                    if (den.inkilap != null) stRes.Sosyal = den.inkilap;
                    if (den.din != null) stRes.DinKulturu = den.din;
                    if (den.ingilizce != null) stRes.Ingilizce = den.ingilizce;
                    stRes.totalNet = den.toplamNet;
                }
            }
        }

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Deneme sınavı başarıyla güncellendi.', 'success');
        }

        closeModal('kocluk-edit-deneme-modal');
        renderSubTabDenemeler(item);
        renderKoclukModule();
    }

    // --- ALT SEKME 4: MENTORLUK & GÖRÜŞME GÜNLÜĞÜ ---
    function renderSubTabGorusmeler(item) {
        const container = document.getElementById('koc-subtab-gorusme-body');
        if (!container) return;

        const gorusmeler = Array.isArray(item.gorusmeler) ? item.gorusmeler : [];

        let cardsHtml = '';
        gorusmeler.forEach(g => {
            cardsHtml += `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-left:4px solid var(--secondary); border-radius:8px; padding:12px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:6px;">
                    <strong style="color:var(--text-main); font-size:13px;">${escapeFn(g.konu)}</strong>
                    <div style="font-size:11.5px; color:var(--text-muted); display:flex; align-items:center; gap:8px;">
                        <span><i class="fas fa-calendar-alt"></i> ${escapeFn(g.tarih)}</span>
                        <span style="background:rgba(99,102,241,0.1); color:#6366f1; padding:2px 6px; border-radius:4px; font-weight:700;">
                            Dayanıklılık: ${g.dayaniklikPuani || 4}/5 ⭐
                        </span>
                        <button class="action-btn" onclick="openEditGorusmeModal('${item.id}', '${g.id}')" title="Düzenle" style="background:none; border:none; color:var(--primary); cursor:pointer; padding:2px 4px;"><i class="fas fa-edit"></i></button>
                        <button class="action-btn btn-delete" onclick="deleteGorusmeNote('${item.id}', '${g.id}')" title="Sil" style="background:none; border:none; color:var(--red); cursor:pointer; padding:2px 4px;"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                ${g.studentBottleneck ? `<div style="font-size:11.5px; color:#ea580c; margin-bottom:4px; font-weight:600;"><i class="fas fa-exclamation-circle me-1"></i> <strong>Darboğaz:</strong> ${escapeFn(g.studentBottleneck)}</div>` : ''}
                ${g.weeklyActionPlan ? `<div style="font-size:11.5px; color:#10b981; margin-bottom:4px; font-weight:600;"><i class="fas fa-check-circle me-1"></i> <strong>Haftalık Eylem:</strong> ${escapeFn(g.weeklyActionPlan)}</div>` : ''}
                <p style="margin:0; font-size:12.5px; color:var(--text-muted); line-height:1.5;">${escapeFn(g.notlar)}</p>
            </div>`;
        });

        container.innerHTML = `
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:16px;">
                <h5 style="margin:0 0 10px 0; font-size:13px; font-weight:700; color:var(--primary);"><i class="fas fa-comments me-1"></i> Yeni Bilişsel Görüşme &amp; Eylem Planı Ekle</h5>
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:10px; margin-bottom:10px;">
                    <input type="text" id="koc-new-gorusme-konu" placeholder="Görüşme Başlığı (Örn: TDE Süre Yönetimi ve 120 Sn Kuralı)" style="padding:7px 10px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                    <select id="koc-new-gorusme-puan" style="padding:7px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                        <option value="5">Dayanıklılık Puanı: 5 (Mükemmel)</option>
                        <option value="4" selected>Dayanıklılık Puanı: 4 (İyi)</option>
                        <option value="3">Dayanıklılık Puanı: 3 (Orta / Plato)</option>
                        <option value="2">Dayanıklılık Puanı: 2 (Direnç / Kaygı)</option>
                        <option value="1">Dayanıklılık Puanı: 1 (Zihinsel Donma)</option>
                    </select>
                </div>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                    <input type="text" id="koc-new-gorusme-darbogaz" placeholder="Öğrencinin Darboğazı (Örn: Matematik 2. tura kalamama)" style="padding:7px 10px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                    <input type="text" id="koc-new-gorusme-eylem" placeholder="Haftalık Eylem Planı (Örn: Hafta içi 3 adet 30 dk fen denemesi)" style="padding:7px 10px; border-radius:6px; border:1px solid var(--border); font-size:12px;">
                </div>
                <textarea id="koc-new-gorusme-not" rows="3" placeholder="Görüşmede alınan kararlar, öğrenciye verilen stratejik görevler ve koçun gözlemleri..." style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-size:12.5px; margin-bottom:10px;"></textarea>
                <div style="display:flex; justify-content:flex-end;">
                    <button class="btn btn-primary" onclick="addGorusmeNote('${item.id}')" style="padding:7px 16px; font-size:12px; font-weight:700; border-radius:6px;">
                        <i class="fas fa-save me-1"></i> Görüşmeyi Kaydet
                    </button>
                </div>
            </div>

            <div>
                <h5 style="margin:0 0 12px 0; font-size:13px; color:var(--primary);">Geçmiş Mentorluk Görüşmeleri (${gorusmeler.length})</h5>
                ${cardsHtml || '<p style="color:var(--text-muted); font-size:12px;">Henüz kaydedilmiş bir görüşme bulunmuyor.</p>'}
            </div>
        `;
    }

    function addGorusmeNote(kocId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const konu = document.getElementById('koc-new-gorusme-konu')?.value.trim() || 'Haftalık Koçluk Değerlendirmesi';
        const puan = parseInt(document.getElementById('koc-new-gorusme-puan')?.value) || 4;
        const darbogaz = document.getElementById('koc-new-gorusme-darbogaz')?.value.trim();
        const eylem = document.getElementById('koc-new-gorusme-eylem')?.value.trim();
        const notlar = document.getElementById('koc-new-gorusme-not')?.value.trim();

        if (!notlar) {
            alert('Lütfen görüşme notlarını giriniz.');
            return;
        }

        if (!Array.isArray(item.gorusmeler)) item.gorusmeler = [];
        item.gorusmeler.unshift({
            id: 'g_' + Date.now(),
            tarih: new Date().toLocaleDateString('tr-TR'),
            konu,
            dayaniklikPuani: puan,
            studentBottleneck: darbogaz,
            weeklyActionPlan: eylem,
            notlar
        });

        if (typeof saveData === 'function') saveData(true);
        renderSubTabGorusmeler(item);
    }

    function openEditGorusmeModal(kocId, gorId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.gorusmeler)) return;
        const gor = item.gorusmeler.find(g => String(g.id) === String(gorId));
        if (!gor) return;

        document.getElementById('edit-gor-koc-id').value = kocId;
        document.getElementById('edit-gor-id').value = gorId;
        document.getElementById('edit-gor-konu').value = gor.konu || '';
        document.getElementById('edit-gor-tarih').value = gor.tarih || new Date().toLocaleDateString('tr-TR');
        document.getElementById('edit-gor-puan').value = gor.dayaniklikPuani || 4;
        document.getElementById('edit-gor-mod').value = gor.parentMessageMode || 'standart';
        document.getElementById('edit-gor-darbogaz').value = gor.studentBottleneck || '';
        document.getElementById('edit-gor-eylem').value = gor.weeklyActionPlan || '';
        document.getElementById('edit-gor-notlar').value = gor.notlar || '';

        const modal = document.getElementById('kocluk-edit-gorusme-modal');
        if (modal) modal.style.display = 'flex';
    }

    function saveEditGorusme() {
        const kocId = document.getElementById('edit-gor-koc-id')?.value;
        const gorId = document.getElementById('edit-gor-id')?.value;
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.gorusmeler)) return;
        const gor = item.gorusmeler.find(g => String(g.id) === String(gorId));
        if (!gor) return;

        const konu = document.getElementById('edit-gor-konu')?.value.trim() || 'Haftalık Koçluk Değerlendirmesi';
        const tarih = document.getElementById('edit-gor-tarih')?.value.trim() || gor.tarih;
        const puan = parseInt(document.getElementById('edit-gor-puan')?.value) || 4;
        const mod = document.getElementById('edit-gor-mod')?.value || 'standart';
        const darbogaz = document.getElementById('edit-gor-darbogaz')?.value.trim();
        const eylem = document.getElementById('edit-gor-eylem')?.value.trim();
        const notlar = document.getElementById('edit-gor-notlar')?.value.trim();

        if (!notlar) {
            alert('Lütfen görüşme notlarını giriniz.');
            return;
        }

        gor.konu = konu;
        gor.tarih = tarih;
        gor.dayaniklikPuani = puan;
        gor.parentMessageMode = mod;
        gor.studentBottleneck = darbogaz;
        gor.weeklyActionPlan = eylem;
        gor.notlar = notlar;

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Mentorluk görüşme kaydı güncellendi.', 'success');
        }

        closeModal('kocluk-edit-gorusme-modal');
        renderSubTabGorusmeler(item);
    }

    function deleteGorusmeNote(kocId, gorId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item || !Array.isArray(item.gorusmeler)) return;

        if (confirm('Bu mentorluk görüşme notunu silmek istediğinize emin misiniz?')) {
            item.gorusmeler = item.gorusmeler.filter(g => String(g.id) !== String(gorId));
            if (typeof saveData === 'function') saveData(true);
            renderSubTabGorusmeler(item);
        }
    }

    // --- ALT SEKME 5: GELİŞMİŞ YAPAY ZEKA KOÇLUK & ÇİFT MODLU VELİ BÜLTENİ ---
    function renderSubTabAiPrompt(item) {
        const container = document.getElementById('koc-subtab-ai-body');
        if (!container) return;

        const config = getGradeCognitiveConfig(item.sinif);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme, item.sinif) : { tdePuan: 75 };

        container.innerHTML = `
            <div style="background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.08)); border: 2px dashed #6366f1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🧠</div>
                <h4 style="margin: 0 0 8px 0; color: #4f46e5; font-size: 16px;">5 Modüllük ${config.isLgsFinal ? 'LGS' : config.stageTitle} Bilişsel Koçluk &amp; ${config.isLgsFinal ? 'TDE' : 'Strateji'} Raporu (Google Gemini)</h4>
                <p style="margin: 0 0 16px 0; color: var(--text-muted); font-size: 13px; max-width: 600px; margin-inline: auto;">
                    <strong>${escapeFn(item.adSoyad)}</strong> (${escapeFn(item.sinif)}) için branş netleri (Sözel, Mat, Fen), <strong>${config.isLgsFinal ? 'TDE Skoru' : 'Süre & Strateji Skoru'} (${tde.tdePuan}/100)</strong>, baskın hata kök neden kodu ve ${config.isLgsFinal ? 'hedef lise' : 'hedef okul / lise'} parametreleri kademe seviyesine uygun olarak tam otomatik enjekte edilmiştir.
                </p>
                <button class="btn btn-purple" onclick="runAiCoachingForStudent('${item.id}')" style="padding: 12px 24px; font-size: 13.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fas fa-brain"></i> Promptu Panoya Kopyala &amp; Gemini'yi Aç
                </button>
            </div>

            <!-- İki Modlu Veli WhatsApp Bülteni Paneli -->
            <div style="background: var(--input-bg); border: 1px solid var(--border); border-radius: 12px; padding: 18px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
                    <h5 style="margin:0; font-size:13.5px; color:var(--text-main); font-weight:700;">
                        <i class="fab fa-whatsapp" style="color:#10b981;"></i> İki Modlu Veli İletişim Bülteni
                    </h5>
                    <span style="font-size:11px; background:rgba(16,185,129,0.12); color:#10b981; padding:3px 10px; border-radius:20px; font-weight:700;">
                        WhatsApp Web Uyumlu
                    </span>
                </div>
                
                <p style="margin:0 0 14px 0; font-size:12.5px; color:var(--text-muted); line-height:1.5;">
                    Öğrencinin haftalık durumuna göre veliye uygun mesaj modunu seçerek tek tıkla paylaşabilirsiniz:
                </p>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                    <!-- Mod 1: Standart -->
                    <div style="background:var(--card-bg); border:1px solid var(--border); border-radius:10px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <strong style="color:var(--text-main); font-size:13px; display:block; margin-bottom:4px;">
                                🌟 1. Standart Haftalık Gelişim Bülteni
                            </strong>
                            <p style="font-size:12px; color:var(--text-muted); margin:0 0 12px 0;">
                                Çabayı, soru çözme disiplinini ve hata defterinde kalıcılaşan soruları öne çıkaran pozitif bilgilendirme.
                            </p>
                        </div>
                        <button class="btn" style="background:#10b981; color:white; font-size:12px; font-weight:700; padding:8px 14px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="sendParentWhatsAppMessage('${item.id}', 'standart')">
                            <i class="fab fa-whatsapp"></i> Standart Bülteni Gönder
                        </button>
                    </div>

                    <!-- Mod 2: Krizsiz Plato / TDE < 70 -->
                    <div style="background:var(--card-bg); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
                        <div>
                            <strong style="color:#ef4444; font-size:13px; display:block; margin-bottom:4px;">
                                🚨 2. TDE &lt; 70 / Plato Krizsiz Analiz Modu
                            </strong>
                            <p style="font-size:12px; color:var(--text-muted); margin:0 0 12px 0;">
                                Veliye net konuşmayı yasaklayan; evde öğrenciyle 10 dakikalık empati ve taktik konuşması yapmasını sağlayan diyalog rehberi.
                            </p>
                        </div>
                        <button class="btn" style="background:#ef4444; color:white; font-size:12px; font-weight:700; padding:8px 14px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="sendParentWhatsAppMessage('${item.id}', 'krizsiz')">
                            <i class="fas fa-shield-heart"></i> Krizsiz Diyalog Bültenini Gönder
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ─────────────────────────────────────────────────────────────
    // 6. GELİŞMİŞ GEMINI AI PROMPT ENTEGRASYONU (5-8. SINIF KADEMELİ)
    // ─────────────────────────────────────────────────────────────
    async function runAiCoachingForStudent(kocId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const config = getGradeCognitiveConfig(item.sinif);
        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme, item.sinif) : { tdePuan: 75, badgeText: 'Normal' };

        // Hata Defteri Baskın Kök Neden Analizi
        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        errors.forEach(e => {
            const c = (e.kokNeden || 'A').toUpperCase();
            if (counts[c] !== undefined) counts[c]++;
            else counts.A++;
        });

        let dominantCode = 'A';
        let maxCount = counts.A;
        ['B', 'C', 'D'].forEach(c => {
            if (counts[c] > maxCount) {
                maxCount = counts[c];
                dominantCode = c;
            }
        });
        const dominantPercent = errors.length > 0 ? Math.round((maxCount / errors.length) * 100) : 0;
        const dominantMap = {
            'A': 'Kod A (Bilgi & Kavram Eksikliği: Kavram/formül hatırlanamadı veya bilinmiyor)',
            'B': 'Kod B (Kurgu & Soru Kökü Hatası: Olumsuz kök, grafik veya öncül yanlış okundu)',
            'C': 'Kod C (Süre Baskısı & İşlem Hatası: Zaman baskısıyla acele, dört işlem veya kaydırma)',
            'D': 'Kod D (Bilişsel Direnç & İnatlaşma: Soruyla 2+ dakika inatlaşıldı, taktiksel pas geçilemedi)'
        };

        const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue);
        let hataAnalizMetni = '';
        if (dueErrors.length > 0) {
            hataAnalizMetni = dueErrors.slice(0, 5).map(e => {
                const meta = getKokNedenMeta(e.kokNeden);
                return `  • ${e.ders} (${e.konu}): Kod ${meta.code} [${meta.label}] - Soru Notu: ${e.soruNotu || '-'}`;
            }).join('\n');
        } else {
            hataAnalizMetni = '  (Günü gelmiş gecikmiş hata yok, pekiştirme döngüsü düzenli işliyor)';
        }

        const phase = getCurrentLgsPhase(item.sinif);
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const kavrama = lastTakip ? (Number(lastTakip.kavramaCount ?? lastTakip.kazanimSoru) || 0) : 150;
        const orta = lastTakip ? (Number(lastTakip.ortaCount) || 0) : 150;
        const yeniNesil = lastTakip ? (Number(lastTakip.yeniNesilCount ?? lastTakip.yeniNesilSoru) || 0) : 200;
        const totalQ = kavrama + orta + yeniNesil;
        const piramidYuzde = totalQ > 0 ? Math.round((yeniNesil / totalQ) * 100) : 0;
        const isComfortZone = piramidYuzde < config.konforThreshold;

        const topicMap = {};
        errors.forEach(err => {
            const key = `${err.ders || 'Genel'} - ${err.konu || 'Genel'}`;
            if (!topicMap[key]) topicMap[key] = { ders: err.ders, konu: err.konu, errors: [] };
            topicMap[key].errors.push(err);
        });
        const redTopics = Object.values(topicMap)
            .filter(t => t.errors.some(e => ((e.kokNeden === 'A' || e.kokNeden === 'D') && !e.tekrar14)))
            .map(t => `${t.ders} (${t.konu})`)
            .join(', ') || 'Kritik kırmızı konu yok (Pekiştirme süreci dengeli)';

        const roleIntroduction = config.isLgsFinal
            ? `Sen; 8. sınıf LGS hazırlık süreçlerinde uzmanlaşmış, gelişim psikolojisi, bilişsel koçluk, ergenlik dönemi pedagojisi ve sınav stratejileri alanında 15+ yıl deneyimli kıdemli bir Pedagog ve Bilişsel Eğitim Koçusun.`
            : `Sen; ortaokul ${config.stageTitle} kademesinde uzmanlaşmış, gelişim psikolojisi (somut işlemlerden soyut işlemlere geçiş), bilişsel koçluk, odaklanma disiplini ve ${config.examFocus} alanında 15+ yıl deneyimli kıdemli bir Pedagog ve Bilişsel Mentor koçusun.`;

        const prompt = `${roleIntroduction}
Yaklaşımın; ezberci veya baskıcı değil, "içsel motivasyonu tetikleyen", "Sweller Bilişsel Yük Kuramı ile zihinsel kapasiteyi optimize eden", "Bloom Taksonomisi ile aşamalı derinleşen" ve "metabilişsel (öğrenmeyi öğrenme) becerileri geliştiren" modern eğitim bilimleri ilkelerine dayanır.

════════════════════════════════════════════════════════════════════
ÖĞRENCİ PROFİLİ VE GÜNCEL BİLİŞSEL / DENEME VERİLERİ
════════════════════════════════════════════════════════════════════
- Öğrenci Adı Soyadı : ${item.adSoyad} (Sınıf Kademesi: ${item.sinif}, No: ${item.studentNo})
- Kademe ve Faz      : ${config.stageTitle} | Aktif Faz: ${phase.name} (${phase.title})
- Haftanın Stratejisi: "${item.aktifStratejiKurali || 'Süre baskısında takılınan soruya [?] koyup derhal geç.'}"
- Öğrenme Stili (VAK): ${item.vak || 'Analitik / Görsel'}
- Mevcut Net Düzeyi  : 90 soru üzerinden ${latestNet} Net (Hedef: ${item.hedefNet} Net | Başlangıç: ${item.baslangicNeti} Net)
- Son Deneme Branşları: Sözel: ${lastDeneme?.sozelNet ?? 45}/50 [${config.sosyalDersAdi} dahil] | Mat: ${lastDeneme?.matNet ?? 13}/20 | Fen: ${lastDeneme?.fenNet ?? 15}/20
- ${config.isLgsFinal ? 'Turlama Disiplin Endeksi (TDE)' : 'Süre & Strateji Disiplin Skoru'}: ${tde.tdePuan}/100 (${tde.badgeText})
  * Çözüm Sırası: ${lastDeneme?.cozumSirasi || 'Fen-Mat'}
  * Fen 1. Tur Süresi: ${lastDeneme?.fen1TurSure || (config.isLgsFinal ? 32 : 28)} dk | Mat 1. Tur Süresi: ${lastDeneme?.mat1TurSure || (config.isLgsFinal ? 30 : 25)} dk
  * İnatlaşılan Soru (>2 dk): ${lastDeneme?.inatlasmaSayisi || 0} adet
  * 2. Tur Net Kazancı: Fen +${lastDeneme?.fen2TurKazanc || 0}, Mat +${lastDeneme?.mat2TurKazanc || 0}
- Hedef Okul / Lise  : ${item.hedefLise} (Hedef Dilim: ${item.hedefYuzdelik || '%1.0'})
- Soru Kalite Piramidi: %${Math.max(0, 100 - piramidYuzde)} Temel/Uygulama / %${piramidYuzde} Yeni Nesil Beceri Temelli ${isComfortZone ? `(⚠️ Konfor Alanı Tuzağı: Seviye eşiği %${config.konforThreshold}'nin altında, kolay soru ağırlıklı!)` : '(Dengeli Dağılım)'}
- Haftalık Soru Hedefi: ${item.haftalikHedefSoru || config.hedefSoruVarsayilan} Soru
- Bilişsel Gözlem    : ${item.bilesenNotu || 'Çok adımlı analitik sorularda dikkat ve odak dalgalanması yaşayabiliyor, okuduğunu anlama kapasitesi yüksek.'}

Metabilişsel Hata Defteri & Isı Haritası Durumu:
- Toplam Kayıt: ${errors.length} adet hatalı/boş soru
- Baskın Kök Neden: %${dominantPercent} ile ${dominantMap[dominantCode]}
- Isı Haritasında Kırmızı (Cerrahi) Konular: ${redTopics}
- Günü Gelmiş / Gecikmiş Tekrar Sayısı: ${dueErrors.length} adet
${hataAnalizMetni}

════════════════════════════════════════════════════════════════════
GÖREV VE BEKLENEN ÇIKTI MODÜLLERİ (${config.stageTitle.toUpperCase()})
════════════════════════════════════════════════════════════════════
Bu öğrenci için aşağıdaki 5 ana modülü içeren somut, pedagojik ve doğrudan uygulanabilir bir "Bilişsel Koçluk ve Gelişim Sistemi" hazırla:

---
MODÜL 1: STRATEJİK HAFTALIK ÇALIŞMA VE DERS DAĞILIM MODELİ
- Oturum Blokları: ${config.pomodoroDk} dk derin odak + ${config.molaDk} dk zihinsel deşarj pencereleri (${config.focusDesc}).
- Kademeli Soru Piramidi: %${config.piramit.kavrama} Kavrama/Temel Bilgi, %${config.piramit.orta} Beceri & Uygulama, %${config.piramit.yeniNesil} Üst Düzey Yeni Nesil / Muhakeme.
- Öğrencinin ${item.haftalikHedefSoru || config.hedefSoruVarsayilan} soru hedefine uygun 7 günlük dengeli program (derslerde Türkçe, Matematik, Fen Bilimleri ve ${config.sosyalDersAdi} dengesini koruyarak).

---
MODÜL 2: METABİLİŞSEL HATA DEFTERİ VE CERRAHİ REÇETE
- Öğrencinin baskın kök nedeni olan "${dominantMap[dominantCode]}" teşhisine yönelik cerrahi müdahale adımları.
- Ebbinghaus Unutma Eğrisi gereği 1. Gün, 3. Gün ve 14. Gün aralıklı tekrar (Spaced Repetition) için pratik çalışma yönergesi.

---
MODÜL 3: SINAV STRATEJİLERİ VE TDE SÜRE YÖNETİMİ (${config.examFocus.toUpperCase()})
- Öğrencinin ${tde.tdePuan}/100 olan strateji puanını 90 üzerine çıkarmak için süre ve taktik reçetesi.
- Takılınan soruyla inatlaşmama, soru köküne turlama işareti [?] koyup geçme refleksi geliştirme antrenmanı.
- Sınavda zihinsel yorgunluk ve donma yaşandığında uygulanacak 30 saniyelik mikro regülasyon (diyafram nefesi ve zihinsel resetleme).

---
MODÜL 4: GELİŞİM PSİKOLOJİSİ, MOTİVASYON VE ÖZ-DÜZENLEME
- ${latestNet} net bandından ${item.hedefNet} nete ulaşmak için içsel motivasyonu canlı tutma yöntemleri.
- Hata yapmaktan korkmama (hatayı öğrenme fırsatı olarak kodlama) ve öz-yeterlilik geliştirme.
- Hafta sonu öğrencinin kendini değerlendireceği 5 maddelik somut rubrik.

---
MODÜL 5: VELİ VE MENTOR İLETİŞİM PROTOKOLÜ
- Evdeki çalışma ortamı, uyku hijyeni (${config.sinifNo <= 6 ? '21:30 - 22:00' : '22:30'} yatak saati) ve ekran detoksu standartları.
- Haftalık 10-15 dakikalık "Krizsiz Değerlendirme Çemberi" konuşma taslağı (Öğrenciye kesinlikle söylenmemesi gereken tetikleyici cümleler ve yapıcı sorular).

════════════════════════════════════════════════════════════════════
ÇIKTI FORMATI VE DİL KURALI
════════════════════════════════════════════════════════════════════
- Dil: Pedagojik açıdan yapıcı, motive edici, net ve doğrudan eyleme dönük.
- Biçimlendirme: Markdown tabloları, kalın başlıklar ve net kontrol listeleri (bullet points) kullan.`;

        window.currentGeminiPrompt = prompt;

        try {
            await navigator.clipboard.writeText(prompt);
        } catch (_) {
            const ta = document.createElement('textarea');
            ta.value = prompt;
            ta.style.cssText = 'position:fixed;opacity:0;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }

        window.open('https://gemini.google.com/', '_blank');

        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`🧠 ${config.isLgsFinal ? 'LGS' : config.stageTitle} Bilişsel Koçluk Promptu Panoya Kopyalandı ve Gemini Açıldı!`, 'success');
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 7. İKİ MODLU VELİ WHATSAPP PAYLAŞIM MOTORU
    // ─────────────────────────────────────────────────────────────
    function openParentWhatsAppShareModal(kocId) {
        openKoclukDetailModal(kocId);
        switchDetailSubTab('tab-koc-ai');
    }

    async function sendParentWhatsAppMessage(kocId, mode = 'standart') {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const config = getGradeCognitiveConfig(item.sinif);
        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme, item.sinif) : { tdePuan: 75, badgeText: 'Dengeli' };
        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const completedErrors = errors.filter(h => h.tekrar1 && h.tekrar3 && h.tekrar14).length;
        const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue).length;

        let msg = '';

        if (mode === 'krizsiz') {
            // Mod 2: TDE < 70 / Plato Krizsiz Analiz Modu
            msg = `🛡️ *${config.isLgsFinal ? 'LGS Hazırlık Süreci' : config.stageTitle + ' Süreci'}: Veli Krizsiz Rehberlik Bülteni* 🛡️

Değerli Velimiz,
Öğrencimiz *${item.adSoyad}* (${item.sinif}) ile yürüttüğümüz son çalışma ve deneme analizinde önemli bir pedagojik bulgu tespit ettik.

📊 *Süreç Teşhisi:*
Öğrencimizin konu bilgi eksiği değil; sınav/soru çözümü esnasında süre yönetimi ve turlama stratejisi dalgalanması (${config.isLgsFinal ? 'TDE Skoru' : 'Strateji Skoru'}: ${tde.tdePuan}/100) yaşadığını gözlemledik.

⚠️ *ÇOK ÖNEMLİ RİCA:*
Lütfen öğrencimizle bu akşam *kesinlikle net, doğru/yanlış sayısı veya sıralama konuşmayınız!*

🏠 *Evde Uygulanacak 10 Dakikalık "Krizsiz Analiz" Konuşma Rehberi:*
1. *Güvenli Alan:* "Bugünkü sonucun ne olursa olsun bizim için çok kıymetlisin. Bu sadece bir taktik ve odaklanma tatbikatı."
2. *Nesnel Süre İncelemesi:* "Hangi sorularda gereğinden fazla inatlaştın? O sorulardan bir iki tanesini birlikte inceleyelim mi?"
3. *Batık Maliyet Farkındalığı:* "Zor bir soruyla inatlaşmayıp 'işaret koyup geçmek' kayıp değil; arkadaki çözebileceğin soruları kurtarır."
4. *Gelecek Uygulama İçin Tek Kural:* "Gelecek çalışmada senden tek bir hedef istiyoruz: Takıldığın soruyu hemen turlayıp geçmek."

Unutmayınız; başarı hiç hata yapmamak değil, hatalardan en hızlı strateji üretebilmektir. Birlikte aşacağız! 🚀`;
        } else {
            // Mod 1: Standart Haftalık Gelişim Bülteni
            msg = `🌟 *${config.isLgsFinal ? 'LGS Hazırlık' : config.stageTitle} & Bilişsel Gelişim Bülteni* 🌟

Değerli Velimiz,
Öğrencimiz *${item.adSoyad}* (${item.sinif}) ile yürüttüğümüz bilişsel koçluk ve gelişim sürecine dair bu haftaki değerlendirme özetimiz:

🎯 *${config.isLgsFinal ? 'Hedef Lise' : 'Hedef Okul / Lise'}:* ${item.hedefLise} (Hedef Dilim: ${item.hedefYuzdelik || '%1.0'})
📊 *Son Net Seviyesi:* ${latestNet} Net (Hedef: ${item.hedefNet} Net)
⏱️ *${config.isLgsFinal ? 'Turlama Disiplin Endeksi (TDE)' : 'Süre & Strateji Disiplin Skoru'}:* ${tde.tdePuan}/100 (${tde.badgeText})
📚 *Haftalık Soru Disiplini:* Hedeflenen ${item.haftalikHedefSoru || config.hedefSoruVarsayilan} soru temposunda ilerliyor.
📕 *Metabilişsel Hata Defteri:* Toplam ${errors.length} analiz edilmiş sorudan *${completedErrors} adedi kalıcı hafızaya alındı.* (${dueErrors} soru aralıklı tekrar havuzunda).

💡 *Ev İçi Koçluk Tavsiyemiz:*
Lütfen net sayısından ziyade, öğrencimizin soru çözerken gösterdiği odaklanma süresini ve gösterdiği gayreti takdir ediniz. Dinlenme saatlerinde ekran yerine zihinsel dinlenme sağlayan aktivitelere teşvik edelim.

Göstermiş olduğunuz iş birliği için teşekkür ederiz. 🚀`;
        }

        try {
            await navigator.clipboard.writeText(msg);
            if (typeof showGlobalToast === 'function') {
                showGlobalToast(`📱 ${mode === 'krizsiz' ? 'Krizsiz Analiz' : 'Standart'} Veli WhatsApp mesajı kopyalandı! WhatsApp açılıyor...`, 'success');
            }
        } catch (_) {
            alert('Mesaj kopyalanamadı:\n\n' + msg);
        }

        window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    }

    // ─────────────────────────────────────────────────────────────
    // 8. HİBRİT "AKILLI KAĞIT" MERKEZİ & 4 PRE-FILLED A4 YAZDIRMA MOTORU
    // ─────────────────────────────────────────────────────────────
    function openKoclukPrintCenter(studentId) {
        const targetId = studentId || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        if (!item) {
            alert('Lütfen yazdırma işlemi için bir öğrenci seçiniz.');
            return;
        }

        activeKoclukId = targetId;
        const infoEl = document.getElementById('koc-print-student-info');
        if (infoEl) {
            infoEl.innerHTML = `<strong>${escapeFn(item.adSoyad)}</strong> (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | Hedef: ${escapeFn(item.hedefLise)}`;
        }

        const modal = document.getElementById('kocluk-print-center-modal');
        if (modal) modal.style.display = 'flex';
    }

    function printSmartForm(studentId, formType = 1) {
        const targetId = studentId || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        if (!item) {
            alert('Öğrenci koçluk kaydı bulunamadı.');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Yazdırma penceresi açılamadı. Lütfen tarayıcınızın açılır pencere (popup) engelleyicisini devre dışı bırakın.');
            return;
        }

        const config = getGradeCognitiveConfig(item.sinif);
        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme, item.sinif) : { tdePuan: 75, badgeText: 'Orta Düzey' };
        const phase = getCurrentLgsPhase(item.sinif);
        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const strategyRule = item.aktifStratejiKurali || 'Süre baskısında takılınan soruya [?] koyup derhal geç.';

        let html = '';

        if (formType === 1) {
            // ============================================================
            // FORM-1: Kişiselleştirilmiş Haftalık Blok Çalışma & Soru Piramidi
            // ============================================================
            const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue).slice(0, 5);
            let errRows = '';
            dueErrors.forEach(e => {
                const meta = getKokNedenMeta(e.kokNeden);
                errRows += `
                <tr>
                    <td style="font-weight:bold;">${escapeFn(e.ders)}</td>
                    <td>${escapeFn(e.konu)}</td>
                    <td style="text-align:center; font-size:9.5px; font-weight:700; white-space:nowrap;">
                        <span style="color:${meta.color};">${meta.icon} Kod ${meta.code}:</span> ${meta.short}
                    </td>
                    <td style="font-size:10px;">${escapeFn(e.soruNotu || '-')}</td>
                    <td style="text-align:center;">${e.tekrar1 ? '☑' : '☐'} 1.G</td>
                    <td style="text-align:center;">${e.tekrar3 ? '☑' : '☐'} 3.G</td>
                    <td style="text-align:center;">${e.tekrar14 ? '☑' : '☐'} 14.G</td>
                </tr>`;
            });
            if (!errRows) {
                errRows = `
                <tr><td colspan="7" style="text-align:center; padding:6px; color:#64748b; font-style:italic;">
                    Bu hafta günü gelmiş gecikmiş hata tekrarı bulunmuyor. Yeni çözülemeyen sorularınızı buraya ekleyiniz.
                </td></tr>
                <tr><td style="height:18px;"></td><td></td><td style="font-size:8px; text-align:center; color:#64748b;">[A:Bilgi / B:Kurgu / C:Süre / D:Direnç]</td><td></td><td style="text-align:center;">☐ 1.G</td><td style="text-align:center;">☐ 3.G</td><td style="text-align:center;">☐ 14.G</td></tr>
                <tr><td style="height:18px;"></td><td></td><td style="font-size:8px; text-align:center; color:#64748b;">[A:Bilgi / B:Kurgu / C:Süre / D:Direnç]</td><td></td><td style="text-align:center;">☐ 1.G</td><td style="text-align:center;">☐ 3.G</td><td style="text-align:center;">☐ 14.G</td></tr>`;
            }

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-1: Haftalık Blok Çalışma & Soru Piramidi - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10.5px; line-height: 1.3; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4f46e5; padding-bottom: 6px; margin-bottom: 8px; }
        .hdr h2 { margin: 0; font-size: 14px; color: #3730a3; text-transform: uppercase; }
        .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 8px; font-size: 10px; }
        .rule-box { background: #eef2ff; border: 1.5px dashed #4f46e5; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 11px; }
        .sec-title { font-weight: bold; font-size: 11px; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 10px; }
        th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; font-size: 9px; text-transform: uppercase; }
        td { border: 1px solid #cbd5e1; padding: 4px 5px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center; margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 10px; }
        .sig-line { margin-top: 22px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>📋 FORM-1: Kişiselleştirilmiş Haftalık Blok Çalışma &amp; Soru Piramidi</h2>
            <div style="font-size:10px; color:#64748b;">${config.stageTitle} | ${phase.name}: ${phase.title}</div>
        </div>
        <div style="text-align:right; font-size:9.5px; color:#64748b;">Hafta: ${new Date().toLocaleDateString('tr-TR')}</div>
    </div>

    <div class="info-grid">
        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)})</div>
        <div><strong>Hedef Okul / Lise:</strong> ${escapeFn(item.hedefLise)} (${escapeFn(item.hedefYuzdelik || '%1.0')})</div>
        <div><strong>Mevcut / Hedef:</strong> ${latestNet} Net / ${item.hedefNet} Net</div>
        <div><strong>Haftalık Hedef:</strong> ${item.haftalikHedefSoru || config.hedefSoruVarsayilan} Soru (%${config.piramit.yeniNesil} Yeni Nesil)</div>
    </div>

    <div class="rule-box">
        <strong style="color:#4338ca;">🎯 BU HAFTANIN TEK STRATEJİK KURALI:</strong>
        <span style="font-weight:bold; color:#0f172a;"> "${escapeFn(strategyRule)}"</span>
    </div>

    <!-- 1. Bölüm: Aralıklı Tekrar Hata Çizelgesi -->
    <div class="sec-title">
        <span>📕 Hata Defterinden Günü Gelmiş / Gecikmiş Aralıklı Tekrarlar</span>
        <span style="font-size:9.5px; color:#64748b;">Spaced Repetition: 1. Gün / 3. Gün / 14. Gün</span>
    </div>
    <table>
        <thead>
            <tr>
                <th style="width:15%;">Ders</th>
                <th style="width:22%;">Konu / Kazanım</th>
                <th style="width:19%; text-align:center;">Kök Neden &amp; Teşhis</th>
                <th>Soru Teşhisi / Not</th>
                <th style="width:7%; text-align:center;">1. Gün</th>
                <th style="width:7%; text-align:center;">3. Gün</th>
                <th style="width:7%; text-align:center;">14. Gün</th>
            </tr>
        </thead>
        <tbody>
            ${errRows}
        </tbody>
    </table>

    <!-- 2. Bölüm: 7 Günlük Blok Çalışma & Soru Piramidi Tablosu -->
    <div class="sec-title">
        <span>⏱️ 7 Günlük Blok Odaklanma (${config.pomodoroDk} dk Odak) &amp; Soru Kalite Piramidi</span>
        <span style="font-size:9.5px; color:#64748b;">İdeal: %${config.piramit.kavrama} Temel | %${config.piramit.orta} Beceri/Uygulama | %${config.piramit.yeniNesil} Yeni Nesil</span>
    </div>
    <table>
        <thead>
            <tr>
                <th style="width:12%;">Gün</th>
                <th style="width:23%;">1. Oturum (Sözel ${config.pomodoroDk} dk)</th>
                <th style="width:23%;">2. Oturum (Sayısal ${config.pomodoroDk} dk)</th>
                <th style="width:14%; text-align:center;">Kavrama Soru</th>
                <th style="width:14%; text-align:center;">Yeni Nesil Soru</th>
                <th style="width:7%; text-align:center;">Toplam</th>
                <th style="width:7%; text-align:center;">Odak</th>
            </tr>
        </thead>
        <tbody>
            <tr><td style="font-weight:bold;">Pazartesi</td><td>Türkçe + Din Kültürü</td><td>Matematik Konu Kavrama &amp; Problem</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Salı</td><td>${config.sosyalDersAdi} + İngilizce</td><td>Fen Bilimleri Analiz &amp; Deney Soruları</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Çarşamba</td><td>Türkçe Paragraf / Anlam Bilgisi</td><td>Matematik Çok Adımlı Beceri Soruları</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Perşembe</td><td>Din + ${config.sosyalDersAdi} Kavrama</td><td>Fen Bilimleri Kavram Haritası &amp; Test</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Cuma</td><td>İngilizce Kelime &amp; Okuduğunu Anlama</td><td>Matematik Akıl Yürütme Pratiği</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold; background:#fef3c7;">Cumartesi</td><td colspan="2" style="text-align:center; font-weight:bold; color:#b45309;">${config.isLgsFinal ? '🎯 GENEL LGS DENEME PROVASI (Sözel 75 dk + Sayısal 80 dk)' : '🎯 HAFTALIK KONU &amp; BECERİ TARAMA DENEMESİ (' + config.examFocus + ')'}</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">90 S</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold; background:#f1f5f9;">Pazar</td><td>Hata Defteri Aralıklı Tekrarları</td><td>Haftalık Değerlendirme &amp; Zihinsel Deşarj</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
        </tbody>
    </table>

    <div class="sig">
        <div><strong>Bilişsel Eğitim Koçu</strong><div class="sig-line">İmza</div></div>
        <div><strong>Öğrenci: ${escapeFn(item.adSoyad)}</strong><div class="sig-line">İmza</div></div>
        <div><strong>Veli</strong><div class="sig-line">İmza / Tarih</div></div>
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},600);};<\/script>
</body>
</html>`;

        } else if (formType === 2) {
            // ============================================================
            // FORM-2: Deneme Sonrası Acil Triyaj ve TDE Analiz Formu
            // ============================================================
            const sampleErrors = errors.slice(0, 6);
            const form2Rows = [0, 1, 2, 3, 4, 5].map(idx => {
                const err = sampleErrors[idx];
                const ders = err ? escapeFn(err.ders) : '';
                const notu = err ? `${err.konu ? '<strong>' + escapeFn(err.konu) + ':</strong> ' : ''}${escapeFn(err.soruNotu || '')}` : '';
                const kok = err ? String(err.kokNeden || '').toUpperCase() : '';
                const t1 = err?.tekrar1 ? '☑' : '☐';
                const t3 = err?.tekrar3 ? '☑' : '☐';
                const t14 = err?.tekrar14 ? '☑' : '☐';

                return `
                <tr>
                    <td style="font-weight:600;">${ders}</td>
                    <td style="text-align:center;">${err ? (err.soruNo || '-') : ''}</td>
                    <td style="font-size:7.5px; line-height:1.25; padding:2px 4px;">
                        <div>${kok === 'A' ? '☑' : '☐'} <strong style="color:#ef4444;">A:</strong> Bilgi Eksikliği</div>
                        <div>${kok === 'B' ? '☑' : '☐'} <strong style="color:#d97706;">B:</strong> Kurgu / Öncül</div>
                        <div>${kok === 'C' ? '☑' : '☐'} <strong style="color:#ea580c;">C:</strong> Süre / İşlem</div>
                        <div>${kok === 'D' ? '☑' : '☐'} <strong style="color:#7c3aed;">D:</strong> Bilişsel Direnç</div>
                    </td>
                    <td style="font-size:8.5px;">${notu}</td>
                    <td style="text-align:center; font-size:8.5px; white-space:nowrap;">${t1} 1G &nbsp; ${t3} 3G &nbsp; ${t14} 14G</td>
                </tr>`;
            }).join('');

            const idealFenSure = config.isLgsFinal ? 32 : 28;
            const idealMatSure = config.isLgsFinal ? 30 : 25;

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-2: Deneme Sonrası Triyaj & TDE - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; line-height: 1.3; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d97706; padding-bottom: 5px; margin-bottom: 8px; }
        .hdr h2 { margin: 0; font-size: 14px; color: #b45309; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 6px; font-size: 9.5px; }
        th { background: #fef3c7; border: 1px solid #cbd5e1; padding: 4px 6px; text-align: left; font-size: 9px; text-transform: uppercase; }
        td { border: 1px solid #cbd5e1; padding: 3px 5px; }
        .sec-title { font-weight: bold; font-size: 10.5px; color: #b45309; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin: 6px 0 4px 0; display:flex; justify-content:space-between; }
        .causes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 6px; }
        .cause-box { border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px; font-size: 9px; }
        .rubrik { background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 6px 8px; font-size: 9.5px; margin-bottom: 6px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center; margin-top: 8px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 9.5px; }
        .sig-line { margin-top: 20px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>⏱️ FORM-2: Deneme Sonrası Acil Triyaj ve ${config.isLgsFinal ? 'TDE' : 'Strateji'} Analiz Formu</h2>
            <div style="font-size:9.5px; color:#64748b;">Öğrenci: ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | ${config.isLgsFinal ? 'Son TDE' : 'Strateji Skoru'}: ${tde.tdePuan}/100</div>
        </div>
        <div style="text-align:right; font-size:9px; color:#64748b;">Deneme: ${escapeFn(lastDeneme?.ad || (config.isLgsFinal ? 'LGS Deneme' : 'Gelişim Denemesi'))} (${lastDeneme?.tarih || new Date().toLocaleDateString('tr-TR')})</div>
    </div>

    <!-- Branş Net & Süre Tablosu -->
    <div class="sec-title"><span>1. Branş Bazlı Net ve Süre Tablosu</span><span>Sayısal: 80 dk | Sözel: 75 dk</span></div>
    <table>
        <thead>
            <tr>
                <th>Ders</th><th style="text-align:center;">Soru</th><th style="text-align:center;">Doğru</th><th style="text-align:center;">Yanlış</th><th style="text-align:center;">Boş</th><th style="text-align:center;">Net</th><th style="text-align:center;">İdeal Süre</th><th style="text-align:center;">Harcanan Süre</th><th style="text-align:center;">Fark / Durum</th>
            </tr>
        </thead>
        <tbody>
            <tr><td style="font-weight:bold;">Türkçe</td><td style="text-align:center;">20</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">30 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold;">${config.sosyalDersAdi}</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">12 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold;">Din Kültürü</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">10 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold;">İngilizce</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">12 dk</td><td></td><td></td></tr>
            <tr style="background:#f8fafc;"><td style="font-weight:bold; color:#1e3a8a;">SÖZEL TOPLAM</td><td style="text-align:center; font-weight:bold;">50</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold; color:#1e3a8a;">${lastDeneme?.sozelNet ?? '.......'}</td><td style="text-align:center; font-weight:bold;">64-70 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold; color:#b45309;">Fen Bilimleri</td><td style="text-align:center;">20</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">${lastDeneme?.fenNet ?? '.......'}</td><td style="text-align:center;">${idealFenSure} dk</td><td style="text-align:center;">${lastDeneme?.fen1TurSure ? lastDeneme.fen1TurSure + ' dk' : ''}</td><td></td></tr>
            <tr><td style="font-weight:bold; color:#4338ca;">Matematik</td><td style="text-align:center;">20</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">${lastDeneme?.matNet ?? '.......'}</td><td style="text-align:center;">${idealMatSure} dk</td><td style="text-align:center;">${lastDeneme?.mat1TurSure ? lastDeneme.mat1TurSure + ' dk' : ''}</td><td></td></tr>
            <tr style="background:#f0f9ff;"><td style="font-weight:bold; color:#0369a1;">SAYISAL TOPLAM</td><td style="text-align:center; font-weight:bold;">40</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold; color:#0369a1;">${(lastDeneme?.sayisalNet ?? (lastDeneme?.matNet != null && lastDeneme?.fenNet != null ? (Number(lastDeneme.matNet) + Number(lastDeneme.fenNet)).toFixed(2).replace(/\.00$/, '') : '.......'))}</td><td style="text-align:center; font-weight:bold;">80 dk</td><td></td><td></td></tr>
            <tr style="background:#fef3c7;"><td style="font-weight:bold; color:#b45309;">GENEL TOPLAM</td><td style="text-align:center; font-weight:bold;">90</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold; color:#b45309; font-size:11px;">${lastDeneme?.toplamNet ?? latestNet} Net</td><td style="text-align:center; font-weight:bold;">155 dk</td><td colspan="2" style="text-align:center; font-weight:bold;">${config.isLgsFinal ? 'TDE' : 'Strateji'}: ${tde.tdePuan}/100</td></tr>
        </tbody>
    </table>

    <!-- 4 Kök Neden Tanımı -->
    <div class="sec-title"><span>2. Metabilişsel 4 Kök Neden Kodlama Rehberi</span></div>
    <div class="causes-grid">
        <div class="cause-box" style="border-left:3px solid #ef4444;">
            <strong style="color:#ef4444;">Kod A: Bilgi Eksikliği</strong>
            <div>Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum.</div>
        </div>
        <div class="cause-box" style="border-left:3px solid #f59e0b;">
            <strong style="color:#f59e0b;">Kod B: Kurgu / Öncül</strong>
            <div>Soruyu bilmeme rağmen olumsuz kökü, grafiği veya öncülü yanlış okudum.</div>
        </div>
        <div class="cause-box" style="border-left:3px solid #ea580c;">
            <strong style="color:#ea580c;">Kod C: Süre / İşlem</strong>
            <div>Süre baskısıyla acele ettim, dört işlem veya kaydırma hatası yaptım.</div>
        </div>
        <div class="cause-box" style="border-left:3px solid #8b5cf6;">
            <strong style="color:#8b5cf6;">Kod D: Bilişsel Direnç</strong>
            <div>Soruyla 2 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu.</div>
        </div>
    </div>

    <!-- Hata Kütüğü -->
    <div class="sec-title"><span>3. Acil Cerrahi Hata Kütüğü (En Kritik 6 Soru)</span></div>
    <table>
        <thead>
            <tr>
                <th style="width:13%;">Ders</th>
                <th style="width:7%; text-align:center;">Soru No</th>
                <th style="width:22%; text-align:center;">Kök Neden &amp; Açıklaması</th>
                <th>Neden Yanlış Yaptım? / Doğru Yaklaşım</th>
                <th style="width:14%; text-align:center;">Tekrar Döngüsü</th>
            </tr>
        </thead>
        <tbody>
            ${form2Rows}
        </tbody>
    </table>

    <!-- 25 Puanlık TDE Rubriği -->
    <div class="rubrik">
        <strong style="color:#b45309;">📊 25 Puanlık Sınav Taktik &amp; Süre Yönetimi Öz-Değerlendirmesi:</strong>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:3px;">
            <div>☐ 1. Fen Bilimleri 1. turu ${idealFenSure} dakikada tamamlandı mı? (+5p)</div>
            <div>☐ 2. Matematik 1. turu ${idealMatSure} dakikada tamamlandı mı? (+5p)</div>
            <div>☐ 3. Takılınan hiçbir soruyla inatlaşmadan işaret konup geçildi mi? (+5p)</div>
            <div>☐ 4. 2. turda geri dönülüp en az 2-3 soru tekrar analiz edildi mi? (+5p)</div>
            <div>☐ 5. Sınavın son 3 dakikasında sayfa sayfa optik kontrol yapıldı mı? (+5p)</div>
            <div><strong>Toplam Taktik Skoru: ....... / 25 Puan</strong></div>
        </div>
    </div>

    <div class="sig">
        <div><strong>Öğrenci: ${escapeFn(item.adSoyad)}</strong><div class="sig-line">İmza</div></div>
        <div><strong>Bilişsel Koç / Danışman</strong><div class="sig-line">İmza</div></div>
        <div><strong>Veli</strong><div class="sig-line">İmza / Tarih</div></div>
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},600);};<\/script>
</body>
</html>`;

        } else if (formType === 3) {
            // ============================================================
            // FORM-3: Fiziksel Soru Ameliyathanesi (Kes-Yapıştır A4 Şablonu)
            // ============================================================
            const activeErrors = errors.slice(0, 4);
            const boxes = [0, 1, 2, 3].map(i => {
                const err = activeErrors[i];
                const dersKonu = err ? `${err.ders} - ${err.konu}` : '...................................................';
                const notu = err ? err.soruNotu : '';
                return `
                <div style="border: 1.5px solid #334155; border-radius: 6px; padding: 6px; display: grid; grid-template-columns: 55% 45%; gap: 8px; height: 122mm; box-sizing: border-box;">
                    <!-- Sol: Yapıştırma Alanı -->
                    <div style="border: 2px dashed #94a3b8; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #94a3b8; font-size: 11px; padding: 8px;">
                        <span style="font-size:24px; margin-bottom:4px;">✂️</span>
                        <strong>Yanlış / Boş Bırakılan Sorunun Kupürünü Buraya Yapıştırınız</strong>
                        <span style="font-size:9.5px; margin-top:4px; opacity:0.8;">(Şıklar ve soru kökü eksiksiz olmalı)</span>
                    </div>

                    <!-- Sağ: Cerrahi Analiz Paneli -->
                    <div style="display: flex; flex-direction: column; justify-content: space-between; font-size: 9.5px;">
                        <div>
                            <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin-bottom: 5px;">
                                <strong style="color: #4338ca; font-size: 10.5px;">Ders / Konu:</strong>
                                <div style="font-weight: bold; color: #0f172a;">${escapeFn(dersKonu)}</div>
                            </div>

                            <div style="margin-bottom: 6px;">
                                <strong style="color: #b45309; font-size:9.5px;">Metabilişsel Kök Neden Teşhisi:</strong>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 4px; margin-top: 2px; font-size: 8px; font-weight: bold;">
                                    <span>${err?.kokNeden === 'A' ? '☑' : '☐'} <span style="color:#ef4444;">A:</span> Bilgi Boşluğu</span>
                                    <span>${err?.kokNeden === 'B' ? '☑' : '☐'} <span style="color:#d97706;">B:</span> Kurgu / Öncül</span>
                                    <span>${err?.kokNeden === 'C' ? '☑' : '☐'} <span style="color:#ea580c;">C:</span> Süre / İşlem</span>
                                    <span>${err?.kokNeden === 'D' ? '☑' : '☐'} <span style="color:#7c3aed;">D:</span> Bilişsel Direnç</span>
                                </div>
                            </div>

                            <div style="margin-bottom: 6px;">
                                <strong style="color: #dc2626;">Neden Yanlış Yaptım / Boş Bıraktım?</strong>
                                <div style="border-bottom: 1px dotted #94a3b8; height: 16px;">${escapeFn(notu)}</div>
                                <div style="border-bottom: 1px dotted #94a3b8; height: 16px;"></div>
                            </div>

                            <div>
                                <strong style="color: #15803d;">Doğru Yaklaşım &amp; Çözüm Püf Noktası:</strong>
                                <div style="border-bottom: 1px dotted #94a3b8; height: 16px;"></div>
                                <div style="border-bottom: 1px dotted #94a3b8; height: 16px;"></div>
                                <div style="border-bottom: 1px dotted #94a3b8; height: 16px;"></div>
                            </div>
                        </div>

                        <!-- Tekrar Kutucukları -->
                        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; text-align: center;">
                            <strong style="color: #475569; display: block; font-size: 9px; margin-bottom: 2px;">SPACED REPETITION (ARALIKLI TEKRAR) ONAYI</strong>
                            <div style="display: flex; justify-content: space-around; font-weight: bold;">
                                <span>${err?.tekrar1 ? '☑' : '☐'} 1. Gün</span>
                                <span>${err?.tekrar3 ? '☑' : '☐'} 3. Gün</span>
                                <span>${err?.tekrar14 ? '☑' : '☐'} 14. Gün (Kalıcı)</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            }).join('');

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-3: Soru Ameliyathanesi - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 5mm 6mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #0f172a; font-size: 10px; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #8b5cf6; padding-bottom: 3px; margin-bottom: 5px; }
        .hdr h2 { margin: 0; font-size: 13.5px; color: #6d28d9; text-transform: uppercase; }
        .grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; height: 260mm; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>🔬 FORM-3: Fiziksel Soru Ameliyathanesi (Kes-Yapıştır Şablonu)</h2>
            <div style="font-size:9.5px; color:#64748b;">Öğrenci: ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | ${config.stageTitle}</div>
        </div>
        <div style="text-align:right; font-size:9px; color:#64748b;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</div>
    </div>

    <div class="grid-2x2">
        ${boxes}
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},600);};<\/script>
</body>
</html>`;

        } else {
            // ============================================================
            // FORM-4: Kapsamlı Koçluk Raporu & Veli-Öğrenci Mutabakat Kartı
            // ============================================================
            const counts = { A: 0, B: 0, C: 0, D: 0 };
            errors.forEach(e => {
                const c = (e.kokNeden || 'A').toUpperCase();
                if (counts[c] !== undefined) counts[c]++;
                else counts.A++;
            });
            const totalErr = errors.length;
            const pA = totalErr > 0 ? Math.round((counts.A / totalErr) * 100) : 0;
            const pB = totalErr > 0 ? Math.round((counts.B / totalErr) * 100) : 0;
            const pC = totalErr > 0 ? Math.round((counts.C / totalErr) * 100) : 0;
            const pD = totalErr > 0 ? Math.max(0, 100 - pA - pB - pC) : 0;

            const denemeler = (Array.isArray(item.denemeler) ? item.denemeler : []).slice(-4);
            let denRows = '';
            denemeler.forEach(d => {
                const dTde = calculateTDE(d, item.sinif);
                denRows += `
                <tr>
                    <td>${escapeFn(d.ad)}</td>
                    <td>${escapeFn(d.tarih)}</td>
                    <td style="text-align:center;">${d.sozelNet ?? '-'}</td>
                    <td style="text-align:center; font-weight:bold;">${d.matNet ?? '-'}</td>
                    <td style="text-align:center; font-weight:bold;">${d.fenNet ?? '-'}</td>
                    <td style="text-align:center; font-weight:bold; color:#1e3a8a;">${d.toplamNet ?? '-'}</td>
                    <td style="text-align:center;">${dTde.tdePuan}/100 (${dTde.badgeText})</td>
                </tr>`;
            });
            if (!denRows) denRows = '<tr><td colspan="7" style="text-align:center; padding:6px;">Henüz deneme kaydı girilmedi.</td></tr>';

            const recentErrors = errors.slice(0, 5);
            let errRows = '';
            recentErrors.forEach(e => {
                const meta = getKokNedenMeta(e.kokNeden);
                errRows += `
                <tr>
                    <td style="font-weight:bold;">${escapeFn(e.ders)}</td>
                    <td>${escapeFn(e.konu)}</td>
                    <td style="text-align:center; font-size:9.5px; font-weight:700; white-space:nowrap;">
                        <span style="color:${meta.color};">${meta.icon} Kod ${meta.code}:</span> ${meta.short}
                    </td>
                    <td style="font-size:9.5px;">${escapeFn(e.soruNotu || '-')}</td>
                    <td style="text-align:center;">${e.tekrar1 ? '☑' : '☐'}</td>
                    <td style="text-align:center;">${e.tekrar3 ? '☑' : '☐'}</td>
                    <td style="text-align:center;">${e.tekrar14 ? '☑' : '☐'}</td>
                </tr>`;
            });
            if (!errRows) errRows = '<tr><td colspan="7" style="text-align:center; padding:6px;">Henüz hata kaydı bulunmuyor.</td></tr>';

            html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>FORM-4: Bilişsel Koçluk & Mutabakat Raporu - ${escapeFn(item.adSoyad)}</title>
    <style>
        @page { size: A4 portrait; margin: 6mm 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; color: #1e293b; font-size: 10.5px; line-height: 1.35; }
        .hdr { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3b82f6; padding-bottom: 6px; margin-bottom: 8px; }
        .hdr h2 { margin: 0; font-size: 14.5px; color: #1e3a8a; text-transform: uppercase; }
        .grid-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px; margin-bottom: 8px; font-size: 10px; }
        .info-cell strong { display: block; font-size: 9px; color: #64748b; text-transform: uppercase; }
        .sec-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 8px; }
        .sec-title { font-size: 11px; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; }
        table { width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 4px; }
        th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 5px; text-align: left; font-size: 9px; text-transform: uppercase; }
        td { border: 1px solid #cbd5e1; padding: 3px 5px; }
        .root-bar { display: flex; height: 9px; border-radius: 4px; overflow: hidden; margin-bottom: 5px; border: 1px solid #cbd5e1; }
        .mutabakat { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; padding: 6px 10px; font-size: 10px; margin-bottom: 8px; }
        .sig { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center; margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 10px; }
        .sig-line { margin-top: 22px; border-top: 1px solid #94a3b8; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
</head>
<body>
    <div class="hdr">
        <div>
            <h2>🧠 FORM-4: ${config.isLgsFinal ? 'LGS' : config.stageTitle} Bilişsel Koçluk Raporu &amp; Veli-Öğrenci Mutabakatı</h2>
            <div style="font-size:10px; color:#64748b;">Kademe: ${config.stageTitle} | Dönem: ${phase.name} | Strateji Kuralı: "${escapeFn(strategyRule)}"</div>
        </div>
        <div style="text-align:right; font-size:9.5px; color:#64748b;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</div>
    </div>

    <div class="grid-info">
        <div class="info-cell"><strong>Öğrenci Adı Soyadı</strong><span>${escapeFn(item.adSoyad)}</span></div>
        <div class="info-cell"><strong>Sınıf / No</strong><span>${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}</span></div>
        <div class="info-cell"><strong>Hedef Okul / Lise</strong><span>${escapeFn(item.hedefLise)} (${escapeFn(item.hedefYuzdelik || '%1.0')})</span></div>
        <div class="info-cell"><strong>Güncel Net / Hedef</strong><span>${latestNet} Net / ${item.hedefNet} Net</span></div>
        <div class="info-cell"><strong>Öğrenme Stili (VAK)</strong><span>${escapeFn(item.vak || 'Analitik / Görsel')}</span></div>
        <div class="info-cell"><strong>Haftalık Soru Hedefi</strong><span>${item.haftalikHedefSoru || config.hedefSoruVarsayilan} Soru</span></div>
        <div class="info-cell"><strong>${config.isLgsFinal ? 'Son TDE Skoru' : 'Süre & Strateji Skoru'}</strong><span style="color:#d97706; font-weight:bold;">${tde.tdePuan}/100 (${escapeFn(tde.badgeText)})</span></div>
        <div class="info-cell"><strong>Kayıtlı Hata Sayısı</strong><span>${totalErr} Soru</span></div>
    </div>

    <!-- Deneme Tablosu -->
    <div class="sec-box">
        <div class="sec-title"><span>📈 Deneme Sınavları &amp; ${config.isLgsFinal ? 'Turlama Disiplin Endeksi (TDE)' : 'Süre & Strateji Endeksi'}</span><span>Maks Net: 90</span></div>
        <table>
            <thead>
                <tr>
                    <th>Deneme Adı</th><th>Tarih</th><th style="text-align:center;">Sözel (50)</th><th style="text-align:center;">Mat (20)</th><th style="text-align:center;">Fen (20)</th><th style="text-align:center;">Toplam</th><th style="text-align:center;">${config.isLgsFinal ? 'TDE Skoru' : 'Strateji Skoru'}</th>
                </tr>
            </thead>
            <tbody>${denRows}</tbody>
        </table>
    </div>

    <!-- Hata Dağılımı -->
    <div class="sec-box">
        <div class="sec-title">
            <span>📕 Metabilişsel Hata Defteri &amp; Aralıklı Tekrar Çizelgesi</span>
            <span style="font-size:9px; color:#475569; font-weight:bold;">A: %${pA} (Bilgi) | B: %${pB} (Kurgu) | C: %${pC} (Süre) | D: %${pD} (Direnç)</span>
        </div>
        <div class="root-bar">
            <div style="width:${pA}%; background:#ef4444;" title="Kod A: Bilgi Eksikliği (%${pA}) - Kavramı hatırlayamadım, formülü veya kazanımı bilmiyordum."></div>
            <div style="width:${pB}%; background:#f59e0b;" title="Kod B: Kurgu &amp; Soru Kökü Hatası (%${pB}) - Soruyu bilmeme rağmen olumsuz kökü veya öncülü yanlış okudum."></div>
            <div style="width:${pC}%; background:#ea580c;" title="Kod C: Süre Baskısı &amp; İşlem Hatası (%${pC}) - Süre baskısıyla acele, dört işlem veya kaydırma."></div>
            <div style="width:${pD}%; background:#8b5cf6;" title="Kod D: Bilişsel Direnç &amp; İnatlaşma (%${pD}) - Soruyla 2+ dakika inatlaşıldı."></div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width:14%;">Ders</th>
                    <th style="width:20%;">Konu</th>
                    <th style="width:20%; text-align:center;">Kök Neden &amp; Teşhis</th>
                    <th>Teşhis Notu</th>
                    <th style="width:7%; text-align:center;">1. Gün</th>
                    <th style="width:7%; text-align:center;">3. Gün</th>
                    <th style="width:7%; text-align:center;">14. Gün</th>
                </tr>
            </thead>
            <tbody>${errRows}</tbody>
        </table>
    </div>

    <!-- Mutabakat & Protokol -->
    <div class="mutabakat">
        <strong style="color:#15803d; font-size:10.5px;">🤝 Veli - Öğrenci Haftalık Mutabakatı &amp; Yaşam Hijyeni Protokolü:</strong>
        <p style="margin:3px 0 0 0; line-height:1.4;">
            1. <strong>Uyku Hijyeni:</strong> Öğrenci zihinsel toparlanma için her akşam en geç <strong>${config.sinifNo <= 6 ? '21:30 - 22:00\'de' : '22:30\'da'}</strong> yatakta olacak; mavi ışık (telefon/tablet) kapatılacaktır.<br>
            2. <strong>Ev İçi İletişim:</strong> Evde kesinlikle net sayısı, sıralama ve kıyaslama konuşulmayacak; sadece odaklanma disiplini ve gayret takdir edilecektir.<br>
            3. <strong>Stratejik Kural:</strong> "${escapeFn(strategyRule)}" kuralına eksiksiz riayet edilecektir.
        </p>
    </div>

    <div class="sig">
        <div><strong>Bilişsel Eğitim Koçu</strong><div class="sig-line">İmza</div></div>
        <div><strong>Öğrenci: ${escapeFn(item.adSoyad)}</strong><div class="sig-line">İmza</div></div>
        <div><strong>Veli</strong><div class="sig-line">İmza / Tarih</div></div>
    </div>
    <script>window.onload=function(){setTimeout(function(){window.print();},600);};<\/script>
</body>
</html>`;
        }

        printWindow.document.write(html);
        printWindow.document.close();
    }

    function printKoclukReport(studentId) {
        printSmartForm(studentId, 4);
    }

    // ─────────────────────────────────────────────────────────────
    // 9. 60 SANİYELİK HIZLI VERİ GİRİŞ SİHİRBAZI MOTORU (5-8. SINIF DİNAMİK)
    // ─────────────────────────────────────────────────────────────
    function openQuickWeeklySyncModal(studentId) {
        const list = Array.isArray(window.koclukData) ? window.koclukData : [];
        if (list.length === 0) {
            alert('Lütfen önce koçluk havuzuna en az bir öğrenci ekleyiniz.');
            return;
        }

        let targetId = studentId || activeKoclukId;
        if (!targetId || !list.some(k => String(k.id) === String(targetId))) {
            targetId = list[0].id;
        }

        const item = list.find(k => String(k.id) === String(targetId));
        if (!item) return;

        activeKoclukId = targetId;
        const config = getGradeCognitiveConfig(item.sinif);

        // Öğrenci Seçim Menüsünü Doldur
        const selectEl = document.getElementById('sync-student-select');
        if (selectEl) {
            let opts = '';
            list.forEach(s => {
                const isSel = (String(s.id) === String(targetId)) ? 'selected' : '';
                opts += `<option value="${escapeFn(s.id)}" ${isSel}>${escapeFn(s.adSoyad)} (${escapeFn(s.sinif || '8. Sınıf')})</option>`;
            });
            selectEl.innerHTML = opts;
        }

        // Aktif Faz Rozetini Güncelle (Sınıfa göre kademeli faz)
        const phase = getCurrentLgsPhase(item.sinif);
        const phaseBadge = document.getElementById('sync-active-phase-badge');
        if (phaseBadge) {
            phaseBadge.textContent = `${phase.name}`;
            phaseBadge.style.background = phase.badgeBg;
            phaseBadge.style.color = phase.badgeColor;
        }

        // Başlık Rozetini Güncelle
        const badge = document.getElementById('koc-sync-student-badge');
        if (badge) {
            badge.innerHTML = `<strong>${escapeFn(item.adSoyad)}</strong> (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | Hedef: ${escapeFn(item.hedefLise || (config.isLgsFinal ? 'Nitelikli Lise' : 'İOKBS Bursluluk / Üst Sınıf Hazırlık'))}`;
        }

        // Başlık ve Etiketleri Sınıfa Göre Dinamikleştir
        const piramitTitle = document.getElementById('sync-piramit-title');
        if (piramitTitle) {
            piramitTitle.innerHTML = `<i class="fas fa-layer-group"></i> 1. Haftalık Soru Kalite Piramidi (%${config.piramit.kavrama} Kavrama / %${config.piramit.orta} Orta / %${config.piramit.yeniNesil} Yeni Nesil) &amp; Ritmi:`;
        }
        const lblKav = document.getElementById('sync-lbl-kavrama');
        if (lblKav) lblKav.textContent = `%${config.piramit.kavrama} KAVRAMA / TEMEL:`;
        const lblOrta = document.getElementById('sync-lbl-orta');
        if (lblOrta) lblOrta.textContent = `%${config.piramit.orta} UYGULAMA / ORTA:`;
        const lblYeni = document.getElementById('sync-lbl-yeninesil');
        if (lblYeni) lblYeni.textContent = `%${config.piramit.yeniNesil} YENİ NESİL / İLERİ:`;
        const lblBlok = document.getElementById('sync-blok-lbl');
        if (lblBlok) lblBlok.textContent = `ODAK BLOK (${config.pomodoroOdakDk}/${config.blokOdakDk} dk):`;
        const tdeHeader = document.getElementById('sync-deneme-tde-header');
        if (tdeHeader) tdeHeader.innerHTML = `<i class="fas fa-chart-line"></i> 2. Yeni Deneme Sonucu &amp; ${config.isLgsFinal ? 'TDE Turlama' : 'Süre & Strateji'} (Opsiyonel):`;

        // 1. Soru Piramidi Verilerini Doldur (Sınıf konfigürasyonuna duyarlı)
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const kavramaEl = document.getElementById('sync-soru-kavrama');
        const ortaEl = document.getElementById('sync-soru-orta');
        const yeniNesilEl = document.getElementById('sync-soru-yeninesil');
        const uykuEl = document.getElementById('sync-uyku');
        const blokEl = document.getElementById('sync-blok');
        const rubrikEl = document.getElementById('sync-rubrik-puan');

        if (kavramaEl) kavramaEl.value = lastTakip ? (lastTakip.kavramaCount ?? lastTakip.kazanimSoru ?? config.piramit.kavramaCount) : config.piramit.kavramaCount;
        if (ortaEl) ortaEl.value = lastTakip ? (lastTakip.ortaCount ?? config.piramit.ortaCount) : config.piramit.ortaCount;
        if (yeniNesilEl) yeniNesilEl.value = lastTakip ? (lastTakip.yeniNesilCount ?? lastTakip.yeniNesilSoru ?? config.piramit.yeniNesilCount) : config.piramit.yeniNesilCount;
        if (uykuEl) uykuEl.value = lastTakip ? (lastTakip.sleepAverage ?? lastTakip.uykuOrtalamasi ?? (config.sinifNo <= 6 ? 9 : 8)) : (config.sinifNo <= 6 ? 9 : 8);
        if (blokEl) blokEl.value = lastTakip ? (lastTakip.focusBlockCount ?? lastTakip.odakBlokSayisi ?? (config.sinifNo <= 6 ? 8 : 12)) : (config.sinifNo <= 6 ? 8 : 12);
        if (rubrikEl) rubrikEl.value = lastTakip ? (lastTakip.rubricScore ?? 22) : 22;

        syncUpdatePiramitCalc();

        // 2. Deneme Alanlarını Sıfırla / Hazırla
        document.getElementById('sync-den-ad').value = '';
        document.getElementById('sync-den-sozel').value = '';
        document.getElementById('sync-den-mat').value = '';
        document.getElementById('sync-den-fen').value = '';
        document.getElementById('sync-den-toplam').value = '';
        document.getElementById('sync-tde-fen1').value = String(config.tdeIdealFen);
        document.getElementById('sync-tde-mat1').value = String(config.tdeIdealMat);
        document.getElementById('sync-tde-inat').value = '0';
        document.getElementById('sync-tde-fen2').value = '2';
        document.getElementById('sync-tde-mat2').value = '3';
        document.getElementById('sync-tde-optik').checked = true;

        syncLiveTdePreview();

        // 3. Bekleyen Aralıklı Hata Tekrarları
        const listEl = document.getElementById('sync-pending-errors-list');
        if (listEl) {
            const pending = (item.hataDefteri || []).filter(h => (!h.tekrar1 || !h.tekrar3 || !h.tekrar14));
            if (pending.length === 0) {
                listEl.innerHTML = '<div style="color:var(--text-muted); font-size:11.5px; padding:4px 0;"><i class="fas fa-check-circle text-success me-1"></i> Tüm aralıklı tekrarlar tamamlandı, bekleyen soru yok.</div>';
            } else {
                let pRows = '<table style="width:100%; border-collapse:collapse; font-size:11px;">';
                pending.forEach(p => {
                    const status = getHataRepeatStatus(p);
                    pRows += `
                    <tr style="border-bottom:1px solid var(--border);">
                        <td style="padding:4px; font-weight:bold;">${escapeFn(p.ders)} (${escapeFn(p.konu)})</td>
                        <td style="padding:4px; color:${status.badgeColor}; font-weight:700;">${status.label}</td>
                        <td style="padding:4px; text-align:right;">
                            <label style="margin-right:6px; font-size:10.5px;"><input type="checkbox" data-err-id="${p.id}" data-cycle="tekrar1" ${p.tekrar1 ? 'checked disabled' : ''}> 1.G</label>
                            <label style="margin-right:6px; font-size:10.5px;"><input type="checkbox" data-err-id="${p.id}" data-cycle="tekrar3" ${p.tekrar3 ? 'checked disabled' : ''}> 3.G</label>
                            <label style="font-size:10.5px;"><input type="checkbox" data-err-id="${p.id}" data-cycle="tekrar14" ${p.tekrar14 ? 'checked disabled' : ''}> 14.G</label>
                        </td>
                    </tr>`;
                });
                pRows += '</table>';
                listEl.innerHTML = pRows;
            }
        }

        // 4. Stratejik Kural
        const ruleEl = document.getElementById('sync-strateji-kurali');
        if (ruleEl) {
            ruleEl.value = item.aktifStratejiKurali || (config.isLgsFinal ? 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.' : 'Test çözerken takıldığın soruda 90 saniyeyi aşma, işaret koyup 2. tura bırak.');
        }

        const modal = document.getElementById('kocluk-quick-sync-modal');
        if (modal) modal.style.display = 'flex';
    }

    function onQuickSyncStudentChange(newId) {
        if (!newId) return;
        openQuickWeeklySyncModal(newId);
    }

    function syncUpdatePiramitCalc() {
        const studentSelect = document.getElementById('sync-student-select');
        const targetId = studentSelect?.value || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        const config = getGradeCognitiveConfig(item?.sinif);

        const kavrama = Number(document.getElementById('sync-soru-kavrama')?.value) || 0;
        const orta = Number(document.getElementById('sync-soru-orta')?.value) || 0;
        const yeni = Number(document.getElementById('sync-soru-yeninesil')?.value) || 0;
        const total = kavrama + orta + yeni;
        const alertEl = document.getElementById('sync-piramit-alert');
        if (!alertEl) return;

        if (total === 0) {
            alertEl.innerHTML = 'Toplam: 0 Soru • Yeni Nesil: %0';
            alertEl.style.background = 'rgba(107,114,128,0.12)';
            alertEl.style.color = '#6b7280';
            return;
        }

        const pct = Math.round((yeni / total) * 100);
        if (pct < config.konforThreshold) {
            alertEl.innerHTML = `⚠️ Konfor Alanı Tuzağı! (${config.sinifNo}. Sınıf Eşiği: %${config.konforThreshold} - Şu an: %${pct}) • Toplam: ${total} Soru`;
            alertEl.style.background = 'rgba(239, 68, 68, 0.15)';
            alertEl.style.color = '#ef4444';
        } else {
            alertEl.innerHTML = `🟢 Dengeli Dağılım (${config.sinifNo}. Sınıf Hedefi: %${config.piramit.yeniNesil} - Şu an: %${pct}) • Toplam: ${total} Soru`;
            alertEl.style.background = 'rgba(16, 185, 129, 0.15)';
            alertEl.style.color = '#10b981';
        }
    }

    function syncUpdateAutoNet() {
        const sozel = parseFloat(document.getElementById('sync-den-sozel')?.value) || 0;
        const mat = parseFloat(document.getElementById('sync-den-mat')?.value) || 0;
        const fen = parseFloat(document.getElementById('sync-den-fen')?.value) || 0;
        const topEl = document.getElementById('sync-den-toplam');
        if (topEl) {
            topEl.value = (sozel + mat + fen).toFixed(2).replace(/\.00$/, '');
        }
        syncLiveTdePreview();
    }

    function syncLiveTdePreview() {
        const studentSelect = document.getElementById('sync-student-select');
        const targetId = studentSelect?.value || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        const config = getGradeCognitiveConfig(item?.sinif);

        const fen1 = Number(document.getElementById('sync-tde-fen1')?.value) || config.tdeIdealFen;
        const mat1 = Number(document.getElementById('sync-tde-mat1')?.value) || config.tdeIdealMat;
        const inat = Number(document.getElementById('sync-tde-inat')?.value) || 0;
        const fen2 = Number(document.getElementById('sync-tde-fen2')?.value) || 2;
        const mat2 = Number(document.getElementById('sync-tde-mat2')?.value) || 3;
        const optik = !!document.getElementById('sync-tde-optik')?.checked;

        const tde = calculateTDE({
            fen1TurSure: fen1,
            mat1TurSure: mat1,
            inatlasmaSayisi: inat,
            fen2TurKazanc: fen2,
            mat2TurKazanc: mat2,
            optikKontrol: optik
        }, item?.sinif);

        const badge = document.getElementById('sync-live-tde-badge');
        if (badge) {
            badge.textContent = `${config.isLgsFinal ? 'Canlı TDE' : 'Strateji Skoru'}: ${tde.tdePuan}/100 • ${tde.badgeText}`;
            badge.style.background = tde.badgeBg;
            badge.style.color = tde.badgeColor;
        }
    }

    function submitQuickWeeklySync(andPrintForm1 = false) {
        const studentSelect = document.getElementById('sync-student-select');
        const targetId = studentSelect?.value || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        if (!item) return;

        const config = getGradeCognitiveConfig(item.sinif);

        // 1. Haftalık Takip Verisi (Soru Kalite Piramidi & Yaşam Ritmi)
        const kavrama = Number(document.getElementById('sync-soru-kavrama')?.value) || 0;
        const orta = Number(document.getElementById('sync-soru-orta')?.value) || 0;
        const yeniNesil = Number(document.getElementById('sync-soru-yeninesil')?.value) || 0;
        const total = kavrama + orta + yeniNesil;
        const ratio = total > 0 ? (yeniNesil / total) : 0;
        const uyku = Number(document.getElementById('sync-uyku')?.value) || (config.sinifNo <= 6 ? 9 : 8);
        const blok = Number(document.getElementById('sync-blok')?.value) || (config.sinifNo <= 6 ? 8 : 12);
        const rubrik = Number(document.getElementById('sync-rubrik-puan')?.value) || 20;

        if (!Array.isArray(item.haftalikTakip)) item.haftalikTakip = [];
        item.haftalikTakip.push({
            id: 'wt_' + Date.now(),
            haftaTarihi: new Date().toLocaleDateString('tr-TR'),
            kavramaCount: kavrama,
            ortaCount: orta,
            yeniNesilCount: yeniNesil,
            totalQuestions: total,
            newGenerationRatio: Math.round(ratio * 100),
            isComfortZoneTrap: ratio < (config.konforThreshold / 100),
            kazanimSoru: kavrama + orta, // Geriye dönük uyumluluk
            yeniNesilSoru: yeniNesil,     // Geriye dönük uyumluluk
            uykuOrtalamasi: uyku,
            sleepAverage: uyku,
            odakBlokSayisi: blok,
            focusBlockCount: blok,
            rubricScore: rubrik
        });

        // 2. Yeni Deneme Girişi (Eğer deneme adı girildiyse)
        const denAd = document.getElementById('sync-den-ad')?.value.trim();
        if (denAd) {
            const sozel = parseFloat(document.getElementById('sync-den-sozel')?.value) || 0;
            const mat = parseFloat(document.getElementById('sync-den-mat')?.value) || 0;
            const fen = parseFloat(document.getElementById('sync-den-fen')?.value) || 0;
            const toplam = parseFloat(document.getElementById('sync-den-toplam')?.value) || (sozel + mat + fen);
            const fen1 = Number(document.getElementById('sync-tde-fen1')?.value) || config.tdeIdealFen;
            const mat1 = Number(document.getElementById('sync-tde-mat1')?.value) || config.tdeIdealMat;
            const inat = Number(document.getElementById('sync-tde-inat')?.value) || 0;
            const fen2 = Number(document.getElementById('sync-tde-fen2')?.value) || 0;
            const mat2 = Number(document.getElementById('sync-tde-mat2')?.value) || 0;
            const optik = !!document.getElementById('sync-tde-optik')?.checked;

            const tdeInfo = calculateTDE({
                fen1TurSure: fen1,
                mat1TurSure: mat1,
                inatlasmaSayisi: inat,
                fen2TurKazanc: fen2,
                mat2TurKazanc: mat2,
                optikKontrol: optik
            }, item.sinif);

            if (!Array.isArray(item.denemeler)) item.denemeler = [];
            item.denemeler.push({
                id: 'den_' + Date.now(),
                ad: denAd,
                tarih: new Date().toLocaleDateString('tr-TR'),
                sozelNet: sozel,
                matNet: mat,
                fenNet: fen,
                toplamNet: Math.round(toplam * 100) / 100,
                cozumSirasi: config.isLgsFinal ? 'Fen-Mat' : 'Mat-Fen',
                fen1TurSure: fen1,
                mat1TurSure: mat1,
                inatlasmaSayisi: inat,
                fen2TurKazanc: fen2,
                mat2TurKazanc: mat2,
                optikKontrol: optik,
                tdePuan: tdeInfo.tdePuan,
                sosyal: 0,
                inkilap: 0
            });
        }

        // 3. Aralıklı Tekrar Onaylarını İşle
        const listEl = document.getElementById('sync-pending-errors-list');
        if (listEl && Array.isArray(item.hataDefteri)) {
            const checkboxes = listEl.querySelectorAll('input[type="checkbox"]:not(:disabled)');
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const errId = cb.getAttribute('data-err-id');
                    const cycle = cb.getAttribute('data-cycle');
                    const err = item.hataDefteri.find(e => String(e.id) === String(errId));
                    if (err && cycle) {
                        err[cycle] = true;
                    }
                }
            });
        }

        // 4. Strateji Kuralını Güncelle
        const ruleVal = document.getElementById('sync-strateji-kurali')?.value.trim();
        if (ruleVal) {
            item.aktifStratejiKurali = ruleVal;
        }

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`⚡ ${item.adSoyad} (${config.sinifNo}. Sınıf) için haftalık veriler ve ${config.isLgsFinal ? 'TDE' : 'Strateji Skoru'} başarıyla senkronize edildi!`, 'success');
        }

        closeModal('kocluk-quick-sync-modal');
        renderKoclukModule();

        const detailModal = document.getElementById('kocluk-detail-modal');
        if (detailModal && detailModal.style.display !== 'none') {
            switchDetailSubTab(activeDetailSubTab);
        }

        if (andPrintForm1) {
            setTimeout(() => {
                printSmartForm(item.id, 1);
            }, 300);
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    }

    // ─────────────────────────────────────────────────────────────
    // GLOBAL BAĞLANTILAR (Window Export)
    // ─────────────────────────────────────────────────────────────
    window.renderKoclukModule = renderKoclukModule;
    window.openAddKoclukModal = openAddKoclukModal;
    window.closeModal = closeModal;
    window.onKoclukClassChange = onKoclukClassChange;
    window.onKoclukStudentSelectChange = onKoclukStudentSelectChange;
    window.saveNewKoclukStudent = saveNewKoclukStudent;
    window.deleteKoclukStudent = deleteKoclukStudent;
    window.openKoclukDetailModal = openKoclukDetailModal;
    window.switchDetailSubTab = switchDetailSubTab;
    window.saveKoclukProfileChanges = saveKoclukProfileChanges;
    window.addHataDefteriEntry = addHataDefteriEntry;
    window.toggleSpacedRepetition = toggleSpacedRepetition;
    window.deleteHataDefteriItem = deleteHataDefteriItem;
    window.openEditHataModal = openEditHataModal;
    window.saveEditHata = saveEditHata;
    window.saveNewDenemeEntry = saveNewDenemeEntry;
    window.deleteDenemeEntry = deleteDenemeEntry;
    window.openEditDenemeModal = openEditDenemeModal;
    window.editUpdateAutoNet = editUpdateAutoNet;
    window.editLiveTdePreview = editLiveTdePreview;
    window.saveEditDeneme = saveEditDeneme;
    window.addGorusmeNote = addGorusmeNote;
    window.openEditGorusmeModal = openEditGorusmeModal;
    window.saveEditGorusme = saveEditGorusme;
    window.deleteGorusmeNote = deleteGorusmeNote;
    window.runAiCoachingForStudent = runAiCoachingForStudent;
    window.openParentWhatsAppShareModal = openParentWhatsAppShareModal;
    window.sendParentWhatsAppMessage = sendParentWhatsAppMessage;
    window.printKoclukReport = printKoclukReport;
    window.openKoclukPrintCenter = openKoclukPrintCenter;
    window.printSmartForm = printSmartForm;
    window.openQuickWeeklySyncModal = openQuickWeeklySyncModal;
    window.onQuickSyncStudentChange = onQuickSyncStudentChange;
    window.syncUpdatePiramitCalc = syncUpdatePiramitCalc;
    window.syncUpdateAutoNet = syncUpdateAutoNet;
    window.syncLiveTdePreview = syncLiveTdePreview;
    window.submitQuickWeeklySync = submitQuickWeeklySync;
    window.calculateTDE = calculateTDE;
    window.getHataRepeatStatus = getHataRepeatStatus;
    window.getCurrentLgsPhase = getCurrentLgsPhase;
    window.toggleTdeDetailsPanel = toggleTdeDetailsPanel;
    window.updateAutoToplamNet = updateAutoToplamNet;
    window.liveCalculateTdePreview = liveCalculateTdePreview;
    window.calcDybNet = calcDybNet;
    window.calcDybBoşChange = calcDybBoşChange;
    window.calcSubBrans = calcSubBrans;
    window.calcSubBoşChange = calcSubBoşChange;
    window.toggleBransDetailsPanel = (typeof toggleBransDetailsPanel === 'function') ? toggleBransDetailsPanel : toggleTdeDetailsPanel;
    window.editCalcDybNet = editCalcDybNet;
    window.editCalcDybBoşChange = editCalcDybBoşChange;
    window.editCalcSubBrans = editCalcSubBrans;
    window.editCalcSubBoşChange = editCalcSubBoşChange;
    window.selectKokNedenPill = selectKokNedenPill;

    // Arama ve Filtre Dinleyicileri
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('kocluk-search-input');
        const classFilter = document.getElementById('kocluk-class-filter');
        const phaseFilter = document.getElementById('kocluk-phase-filter');
        if (searchInput) searchInput.addEventListener('input', renderKoclukModule);
        if (classFilter) classFilter.addEventListener('change', renderKoclukModule);
        if (phaseFilter) phaseFilter.addEventListener('change', renderKoclukModule);
    });

})();

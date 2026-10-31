// ============================================================
// vak-engine.js (v1.0 Proje Tabanlı Ders İşleme & Koçluk Entegrasyonu)
// Kademe Bazlı Dinamik VAK (Görsel, İşitsel, Kinestetik) Ölçme & Raporlama Motoru
// ============================================================

(function () {
    'use strict';

    /**
     * Sınıf bilgisinden (örn: "8/A", "12-C", "4-B") kademe seviyesini (grade_level) ayıklar.
     * @param {string|number} sinif 
     * @returns {number} 1 - 12 arası sınıf seviyesi
     */
    function parseGradeLevel(sinif) {
        if (!sinif) return 8;
        const str = String(sinif).trim();
        const match = str.match(/\b(1[0-2]|[1-9])\b/);
        if (match) return parseInt(match[1], 10);
        return 8; // Varsayılan ortaokul LGS düzeyi
    }

    /**
     * Sınıf seviyesine göre gelişimsel evre tanımını döner.
     * @param {number} grade 
     * @returns {string} Gelişimsel Dönem
     */
    function getDevelopmentalStage(grade) {
        if (grade >= 1 && grade <= 4) {
            return 'İlkokul / Somut İşlemler Dönemi (7-10 Yaş)';
        } else if (grade >= 5 && grade <= 8) {
            return 'Ortaokul / Soyut İşlemlere Geçiş & Erken Ergenlik (11-14 Yaş)';
        } else {
            return 'Lise / Üstbilişsel & Stratejik Planlama Dönemi (15-18 Yaş)';
        }
    }

    /**
     * Kademeye göre pedagojik değerlendirme türünü belirler.
     * @param {number} grade 
     * @returns {string} Değerlendirme Tipi
     */
    function getAssessmentType(grade) {
        if (grade <= 4) return 'Oyunlaştırılmış Mikro-Hikaye Envanteri';
        if (grade <= 8) return 'Senaryo Tabanlı Dinamik Yaşam İkilemleri';
        return 'Çok Boyutlu Üstbilişsel Tercih Envanteri (Likert)';
    }

    // ─────────────────────────────────────────────────────────────
    // 1. KADEME BAZLI PEDAGOJİK SORU & SENARYO ENVANTERİ
    // ─────────────────────────────────────────────────────────────

    const VAK_QUESTION_BANKS = {
        // 1 - 4. Sınıflar (Somut İşlemler / 7-10 Yaş): Kısa, sıcak, 15-20 kelimelik oyunsu senaryolar
        tier1: [
            {
                id: 't1_q1',
                question: 'Bir masal kahramanı olsan gizemli bir kaleyi nasıl keşfedersin?',
                options: [
                    { key: 'V', text: 'Kalenin resimli haritasını açar, odaların renklerine bakarım.', style: 'Görsel' },
                    { key: 'A', text: 'Kaledeki kuşların ve gizli kapıların fısıltılarını dinlerim.', style: 'İşitsel' },
                    { key: 'K', text: 'Kalenin merdivenlerini koşarak çıkar, taşlarına dokunurum.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't1_q2',
                question: 'Öğretmenin sana yepyeni bir oyun anlattığında en çabuk nasıl öğrenirsin?',
                options: [
                    { key: 'V', text: 'Öğretmenimin tahtaya çizdiği resimlere ve hareketlere bakınca.', style: 'Görsel' },
                    { key: 'A', text: 'Öğretmenimin oyunun kurallarını sesli anlatmasını dinleyince.', style: 'İşitsel' },
                    { key: 'K', text: 'Hemen oyuna katılıp arkadaşlarımla koşup oynayarak.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't1_q3',
                question: 'Boş zamanında en çok hangi etkinliği yapmaktan mutlu olursun?',
                options: [
                    { key: 'V', text: 'Boyama kitabı boyamak, çizgi film izlemek veya resim yapmak.', style: 'Görsel' },
                    { key: 'A', text: 'Müzik dinlemek, şarkı söylemek veya sesli masal dinlemek.', style: 'İşitsel' },
                    { key: 'K', text: 'Legolarla kuleler yapmak, hamurla oynamak veya bahçede zıplamak.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't1_q4',
                question: 'Bir hayvanat bahçesine gittiğinde aklında en çok ne kalır?',
                options: [
                    { key: 'V', text: 'Hayvanların parlak tüyleri, renkleri ve kocaman resimleri.', style: 'Görsel' },
                    { key: 'A', text: 'Aslanın kükremesi, kuşların cik cikleri ve bakıcının sesi.', style: 'İşitsel' },
                    { key: 'K', text: 'Yürümek, yavru midilliyi sevmek ve çimlerde koşmak.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't1_q5',
                question: 'Yeni bir şeyi hatırlamak istediğinde en çok ne yaparsın?',
                options: [
                    { key: 'V', text: 'Gözlerimi kapatıp o şeyin resmini aklıma getiririm.', style: 'Görsel' },
                    { key: 'A', text: 'Kendi kendime fısıldayarak sesli tekrar ederim.', style: 'İşitsel' },
                    { key: 'K', text: 'Elimle havada yazarım ya da parmaklarımla taklit ederim.', style: 'Kinestetik' }
                ]
            }
        ],

        // 5 - 8. Sınıflar (Soyut İşlemlere Geçiş & Akran / 11-14 Yaş): Okul, proje ve sınav ikilemleri
        tier2: [
            {
                id: 't2_q1',
                question: 'Fen veya Sosyal dersinde bir grup proje görevi aldığınızda ilk tercihin ne olur?',
                options: [
                    { key: 'V', text: 'Projenin posterini, afişini tasarlamak ve infografikleri hazırlamak.', style: 'Görsel' },
                    { key: 'A', text: 'Grup içinde beyin fırtınası başlatıp sunum metnini seslendirmek.', style: 'İşitsel' },
                    { key: 'K', text: '3 boyutlu maket, deney düzeneği veya hareketli bir model inşa etmek.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't2_q2',
                question: 'Zorlu bir LGS deneme sınavından önce bir konuyu tekrar ederken nasıl çalışırsın?',
                options: [
                    { key: 'V', text: 'Renkli fosforlu kalemlerle özet çıkartır, kavram haritalarını incelerim.', style: 'Görsel' },
                    { key: 'A', text: 'Konuyu arkadaşıma anlatırım veya sesli soru çözüm videoları dinlerim.', style: 'İşitsel' },
                    { key: 'K', text: 'Odamda gezinerek, soruyu kağıda çizip karalayarak çözerim.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't2_q3',
                question: 'Derste öğretmeni dinlerken odaklanmanı en çok ne kolaylaştırır?',
                options: [
                    { key: 'V', text: 'Akıllı tahtadaki grafikler, şemalar ve öğretmenin tahta düzeni.', style: 'Görsel' },
                    { key: 'A', text: 'Öğretmenin ses tonu, yaptığı espriler ve sınıf içi tartışmalar.', style: 'İşitsel' },
                    { key: 'K', text: 'Elimde kalemle not tutmak, altını çizmek ve laboratuvar etkinliği yapmak.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't2_q4',
                question: 'Yeni aldığın bir teknolojik cihazı veya oyunu kurarken hangisini yaparsın?',
                options: [
                    { key: 'V', text: 'Kutudaki resimli kılavuzu ve şemaları adım adım incelerim.', style: 'Görsel' },
                    { key: 'A', text: 'Bilen birine "nasıl yapılıyor?" diye sorar ya da tanıtım videosu dinlerim.', style: 'İşitsel' },
                    { key: 'K', text: 'Kılavuza bakmadan doğrudan tuşlarına basarak deneyerek çözerim.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't2_q5',
                question: 'Sınav anında bir soruyu hatırlamakta zorlandığında zihnin ne yapar?',
                options: [
                    { key: 'V', text: 'Defterdeki sayfanın yerini, hangi renkle yazıldığını hatırlarım.', style: 'Görsel' },
                    { key: 'A', text: 'Öğretmenin o konuyu anlatırken söylediği kelimeleri duyar gibi olurum.', style: 'İşitsel' },
                    { key: 'K', text: 'O soruyu çözerken elimin hareketini ya da yaşadığım hissi hatırlarım.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't2_q6',
                question: 'Sınıfta en çok hangi ortamda dikkatin dağılır?',
                options: [
                    { key: 'V', text: 'Tahta dağınık, sınıf görsel olarak karmaşık ve ışık yetersizken.', style: 'Görsel' },
                    { key: 'A', text: 'Arka sıralardan fısıltı, gürültü veya kapı gıcırtısı geldiğinde.', style: 'İşitsel' },
                    { key: 'K', text: 'Çok uzun süre hiç kıpırdamadan aynı sırada oturmak zorunda kalınca.', style: 'Kinestetik' }
                ]
            }
        ],

        // 9 - 12. Sınıflar (Üstbilişsel / 15-18 Yaş): Analitik, zaman yönetimi, YKS stresi ve akademik strateji
        tier3: [
            {
                id: 't3_q1',
                question: 'YKS (TYT-AYT) veya yoğun lise sınavlarına hazırlanırken karmaşık bir konuyu analiz ederken:',
                options: [
                    { key: 'V', text: 'Zihin haritaları (Mind Map), akış diyagramları ve formül tabloları çıkarırım.', style: 'Görsel' },
                    { key: 'A', text: 'Konunun podcast / ses kayıtlarını dinler, bir çalışma grubuyla tartışırım.', style: 'İşitsel' },
                    { key: 'K', text: 'Doğrudan soru bankasını açar, deneme yanılma ve çözümlü örnekleri yazarak ilerlerim.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't3_q2',
                question: 'Sınav ortamında zaman baskısı ve stres altındayken bilgiye erişim refleksin:',
                options: [
                    { key: 'V', text: 'Sorunun metnindeki kritik verileri renklendirip şemayı gözümün önüne getiririm.', style: 'Görsel' },
                    { key: 'A', text: 'Sorunun kurgusunu iç sesimle kendime özetleyerek adım adım çözerim.', style: 'İşitsel' },
                    { key: 'K', text: 'Elimle taslak çizimler yapar, işlem basamaklarını fiziksel olarak kağıda dökerim.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't3_q3',
                question: 'Uzun bir blok çalışma (75-90 dakika) sırasında odağını koruma yöntemin:',
                options: [
                    { key: 'V', text: 'Çalışma masamın tamamen sade ve sadece çalıştığım föyün açık olması.', style: 'Görsel' },
                    { key: 'A', text: 'Arka planda belirli frekansta odaklanma sesi (Lo-Fi/Beyaz Gürültü) dinlemek.', style: 'İşitsel' },
                    { key: 'K', text: 'Pomodoro aralarında yürümek, esnemek ve ayakta kısa molalar vermek.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't3_q4',
                question: 'Deneme analizi yaparken (Metabilişsel Hata Defteri sürecinde):',
                options: [
                    { key: 'V', text: 'Yanlış soruların fotoğrafını/grafiğini kesip düzenli hata defterine yapıştırmak.', style: 'Görsel' },
                    { key: 'A', text: 'Hata yaptığım soruyu branş öğretmenine sesli olarak adım adım tartıştırmak.', style: 'İşitsel' },
                    { key: 'K', text: 'Soruyu baştan sona sıfırdan beyaz bir kağıda adım adım yeniden çözmek.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't3_q5',
                question: 'Soyut matematiksel veya felsefi bir teoriyi kavramada sana en çok güç veren dinamik:',
                options: [
                    { key: 'V', text: 'Geometrik modeller, simülasyonlar ve görsel kanıtlar görmek.', style: 'Görsel' },
                    { key: 'A', text: 'Teorinin mantığını akıcı bir dille anlatan bir akademisyeni dinlemek.', style: 'İşitsel' },
                    { key: 'K', text: 'Formülü gerçek bir probleme uyarlamak, laboratuvar/uygulama simülasyonu yapmak.', style: 'Kinestetik' }
                ]
            },
            {
                id: 't3_q6',
                question: 'Kişisel öğrenme ortamında verimini en çok düşüren bilişsel engel (blocker):',
                options: [
                    { key: 'V', text: 'Sayfa düzeni kötü, sıkışık puntolu ve grafiksiz salt metin kaynaklar.', style: 'Görsel' },
                    { key: 'A', text: 'Ders çalışırken ortamdaki düzensiz konuşmalar, TV sesi veya sessizliğin bozulması.', style: 'İşitsel' },
                    { key: 'K', text: 'Sürekli pasif dinleyici konumunda kalmak, uygulamaya geçememek.', style: 'Kinestetik' }
                ]
            }
        ]
    };

    /**
     * Sınıf düzeyine göre uygun soru bankasını getirir.
     * @param {number} gradeLevel 
     * @returns {Array} Soru nesneleri
     */
    function getQuestionsForGrade(gradeLevel) {
        if (gradeLevel <= 4) return VAK_QUESTION_BANKS.tier1;
        if (gradeLevel <= 8) return VAK_QUESTION_BANKS.tier2;
        return VAK_QUESTION_BANKS.tier3;
    }

    // ─────────────────────────────────────────────────────────────
    // 2. PEDAGOJİK VAK HESAPLAMA MOTORU & STRICT JSON ÜRETİCİ
    // ─────────────────────────────────────────────────────────────

    /**
     * Yanıtları puanlar, yüzdeleri ve baskın stili hesaplayarak STRICT JSON şemasını üretir.
     * @param {Array<string>|Object} answers - Yanıtlar: ['V', 'A', 'V', 'K'] veya { q1: 'V', ... }
     * @param {number} gradeLevel - 1 - 12 arası
     * @param {Object} studentMeta - Öğrenci ek bilgileri { no, adSoyad, sinif }
     * @returns {Object} Strict JSON Schema Çıktısı
     */
    function calculateVakScores(answers, gradeLevel = 8, studentMeta = {}) {
        let vPoints = 0;
        let aPoints = 0;
        let kPoints = 0;

        // Yanıtları diziye normalize et
        const answerList = Array.isArray(answers) ? answers : Object.values(answers || {});

        answerList.forEach(ans => {
            if (!ans) return;
            const str = String(ans).toUpperCase().trim();
            if (str === 'V' || str.includes('GÖRSEL') || str.includes('VISUAL')) vPoints += 1;
            else if (str === 'A' || str.includes('İŞİTSEL') || str.includes('AUDITORY')) aPoints += 1;
            else if (str === 'K' || str.includes('KİNESTETİK') || str.includes('KINESTHETIC')) kPoints += 1;
        });

        const total = vPoints + aPoints + kPoints;
        const validTotal = total > 0 ? total : 3;
        if (total === 0) {
            vPoints = 1; aPoints = 1; kPoints = 1;
        }

        // Yüzdeleri hesapla
        const vPerc = Number(((vPoints / validTotal) * 100).toFixed(1));
        const aPerc = Number(((aPoints / validTotal) * 100).toFixed(1));
        const kPerc = Number(((kPoints / validTotal) * 100).toFixed(1));

        // Skorları sırala
        const styles = [
            { name: 'Görsel (Visual)', key: 'Görsel', perc: vPerc },
            { name: 'İşitsel (Auditory)', key: 'İşitsel', perc: aPerc },
            { name: 'Kinestetik (Kinesthetic)', key: 'Kinestetik', perc: kPerc }
        ].sort((a, b) => b.perc - a.perc);

        const diffTopTwo = styles[0].perc - styles[1].perc;

        let dominantStyle = styles[0].name;
        let profileType = 'Tekil Baskın';
        let dominantKey = styles[0].key;

        // Kural: En yüksek iki kanal arasındaki fark < %5 ise Çoklu / Hibrit (Bimodal/Multimodal)
        if (diffTopTwo < 5.0) {
            dominantStyle = `Çoklu / Hibrit (${styles[0].key} - ${styles[1].key})`;
            profileType = 'Çoklu / Hibrit (Bimodal)';
            dominantKey = 'Çoklu / Hibrit';
        }

        // Kademe ve profile göre pedagojik öngörüler oluştur
        const insights = generatePedagogicalInsights(dominantKey, gradeLevel, { vPerc, aPerc, kPerc });
        const recommendations = generateActionableRecommendations(dominantKey, gradeLevel);

        // Strict JSON Schema
        return {
            student_metadata: {
                student_no: studentMeta.no || null,
                student_name: studentMeta.adSoyad || null,
                class_name: studentMeta.sinif || `${gradeLevel}. Sınıf`,
                grade_level: gradeLevel,
                developmental_stage: getDevelopmentalStage(gradeLevel),
                assessment_type: getAssessmentType(gradeLevel),
                assessment_timestamp: new Date().toISOString()
            },
            vak_scores: {
                visual_percentage: vPerc,
                auditory_percentage: aPerc,
                kinesthetic_percentage: kPerc,
                raw_points: {
                    visual: vPoints,
                    auditory: aPoints,
                    kinesthetic: kPoints,
                    total: total
                },
                dominant_style: dominantStyle,
                dominant_key: dominantKey,
                profile_type: profileType,
                channel_gap: Number(diffTopTwo.toFixed(1))
            },
            pedagogical_insights: insights,
            actionable_recommendations: recommendations
        };
    }

    /**
     * Kademeye ve stile göre bilişsel öngörü üretir.
     */
    function generatePedagogicalInsights(dominantKey, grade, scores) {
        if (dominantKey.includes('Görsel')) {
            return {
                summary: `Öğrenci, bilgiyi grafikler, zihin haritaları, renk kodlamaları ve görsel düzenlemelerle aldığında en yüksek kalıcılığı sağlamaktadır (${grade}. sınıf gelişim düzeyine uygun).`,
                cognitive_strengths: [
                    'Görsel detayları, mekânsal düzeni ve sayfa yerleşimini hızlı hatırlama',
                    'Yönerge okurken şemaları, grafik ve tabloları metne tercih etme',
                    'Karmaşık konuları zihninde resmederek veya kavram haritalarıyla modelleyerek çözme'
                ],
                potential_blockers: [
                    'Yalnızca sözlü anlatım yapılan monolog derslerde dikkatin çabuk dağılması',
                    'Görsel uyaran eksikliğinde ve dağınık tahta düzeninde konudan kopma riski'
                ]
            };
        } else if (dominantKey.includes('İşitsel')) {
            return {
                summary: `Öğrenci, bilgiyi sesli açıklamalar, ritmik tekrarlar, sınıf içi tartışmalar ve ses tonlamalarıyla aldığında en yüksek öğrenme verimine ulaşmaktadır (${grade}. sınıf düzeyi).`,
                cognitive_strengths: [
                    'Sözlü yönergeleri tek seferde kavrama ve hafızada tutma yeteneği',
                    'Öğrendiği bilgiyi sesli olarak arkadaşına anlatırken derinleştirme becerisi',
                    'Ders dinlerken tonlama ve vurgulardan ipucu yakalama hassasiyeti'
                ],
                potential_blockers: [
                    'Gürültülü, arka planda fısıltı veya gürültü olan ortamlarda odaklanma güçlüğü',
                    'Tamamen sessiz ortamlarda iç sesini duyamadığı için okuma yavaşlığı yaşama'
                ]
            };
        } else if (dominantKey.includes('Kinestetik')) {
            return {
                summary: `Öğrenci, yaparak-yaşayarak, dokunarak, hareket ederek ve sürece bedensel olarak dahil olduğunda en kalıcı kavrayışı geliştirmektedir (${grade}. sınıf düzeyi).`,
                cognitive_strengths: [
                    'Deney, maket, drama, simülasyon ve pratik uygulamalarda yüksek motivasyon',
                    'Kas hafızası ve fiziksel eylemlerle öğrenilen bilgileri uzun yıllar unutmama',
                    'Soruyu karalayarak, çizerek ve işlem basamaklarını somutlaştırarak hızlı çözme'
                ],
                potential_blockers: [
                    'Uzun süre hareketsiz, pasif dinleyici konumunda kalınca kıpırdanma ve odak kaybı',
                    'Yalnızca metin okumaya dayalı teorik derslerde çabuk yorulma ve motivasyon düşüşü'
                ]
            };
        } else {
            // Çoklu / Hibrit (Bimodal)
            return {
                summary: `Öğrenci, iki veya daha fazla duyusal kanalı dengeli kullanan esnek (hibrit) bir bilişsel profile sahiptir. Bilgiyi çoklu temsil modlarıyla (multimodal) aldığında maksimum performans gösterir.`,
                cognitive_strengths: [
                    'Farklı ders dinamiklerine ve öğretmen anlatım stillerine hızla adapte olabilme',
                    'Görsel şemayı sesli tartışmayla veya uygulamayla zenginleştirerek bütünleştirme',
                    'Grup çalışmalarında hem tasarımsal hem sözel hem pratik görevleri üstlenebilme'
                ],
                potential_blockers: [
                    'Tek bir kanala hapsedilmiş (sadece düz metin veya sadece kuru ses) ortamlarda potansiyelini sergileyememe'
                ]
            };
        }
    }

    /**
     * Kademeye göre uygulanabilir (actionable) tavsiyeler üretir.
     */
    function generateActionableRecommendations(dominantKey, grade) {
        const isPrimary = grade <= 4;
        const isMiddle = grade >= 5 && grade <= 8;
        const isHigh = grade >= 9;

        if (dominantKey.includes('Görsel')) {
            return {
                for_student: isHigh
                    ? [
                        'YKS hazırlığında formül ve kavramları renkli zihin haritaları (Mind Map) ile duvarına as.',
                        'Deneme analizinde yanlış soruların görselini kesip hata defterine şematik çözümüyle yapıştır.',
                        'Soru çözerken kritik verileri renkli fosforlu kalemlerle altını çizerek netleştir.'
                    ]
                    : isMiddle
                        ? [
                            'LGS hazırlığında ders çalışırken fosforlu kalemler ve renkli özet kartları kullan.',
                            'Zorlandığın Fen ve Matematik kurallarını renkli post-it\'lere yazıp masanın karşısına yapıştır.',
                            'Konuları YouTube soru çözüm videolarındaki grafik ve tahta çizimlerine bakarak tekrar et.'
                        ]
                        : [
                            'Ödevlerini yaparken renkli boya kalemlerini ve resimli çalışma kağıtlarını kullan.',
                            'Okuduğun masalların resimlerini defterine çizerek hikayeyi aklında tut.',
                            'Çalışma masanı her zaman düzenli ve sade tut.'
                        ],
                for_teacher: isHigh
                    ? [
                        'Ders sunumlarında infografikler, akış şemaları ve görsel kavram ağlarına ağırlık verin.',
                        'Tahtayı renk kodlamalı bloklar halinde düzenli kullanın; formül türetimlerini şematize edin.',
                        'Proje ve ödev teslimlerinde görsel sunum ve raporlama seçenekleri sunun.'
                    ]
                    : [
                        'Ders anlatımında akıllı tahta şemaları, animasyonlar ve kavram haritalarını merkeze alın.',
                        'Sözlü yönergeleri tahtaya madde madde yazarak görselleştirin.',
                        'Kümeleme etkinliklerinde öğrenciye afiş, poster ve grafik hazırlama rolü verin.'
                    ],
                for_parent: [
                    'Evde ders çalışırken sessiz ve görsel olarak dikkati dağıtmayan düzenli bir çalışma köşesi oluşturun.',
                    'Öğrencinin duvarına çalışma takvimi, zihin haritaları ve motivasyon panosu asmasına izin verin.'
                ]
            };
        } else if (dominantKey.includes('İşitsel')) {
            return {
                for_student: isHigh
                    ? [
                        'Karmaşık teorileri kendi sesinle ses kaydına alıp yolda veya molalarda dinle.',
                        'Çalışma arkadaşlarınla haftalık deneme sorularını karşılıklı tartışarak müzakere et.',
                        'Soru çözerken iç sesinle soru kökünü kendine bir rehber gibi özetle.'
                    ]
                    : [
                        'Konuları çalıştıktan sonra bir aile büyüğüne veya kendine sesli olarak anlat.',
                        'Konu tekrarlarında eğitici podcast ve sesli konu anlatımlarından faydalan.',
                        'Formülleri ve kuralları ritmik şarkı veya tekerleme haline getirerek ezberle.'
                    ],
                for_teacher: [
                    'Ders başlangıcında hedefleri sözlü olarak net biçimde ifade edin; ses tonunuzu modüle edin.',
                    'Soru-cevap, münazara ve akran etkileşimli sesli tartışma ortamları yaratın.',
                    'Önemli kuralları sınıfa koro halinde veya ritmik olarak tekrar ettirin.'
                ],
                for_parent: [
                    'Çocuğunuz sesli ders çalışırken veya fısıldayarak soru çözerken onu susturmayınız.',
                    'Akşamları "Bugün okulda ne öğrendin, bana da anlatır mısın?" diyerek konuşmasını teşvik edin.',
                    'Ders çalışma ortamında TV veya telefon konuşması gibi arka plan seslerini engelleyin.'
                ]
            };
        } else if (dominantKey.includes('Kinestetik')) {
            return {
                for_student: isHigh
                    ? [
                        'Blok çalışma aralarında (her 40-50 dk) mutlaka ayağa kalkıp esneme ve hareket molası ver.',
                        'Soru çözerken elindeki kalemi aktif kullan; her soru için boş kağıda karalama taslağı çiz.',
                        'Mümkünse ayakta çalışma masası veya hareket edebileceğin bir çalışma alanı kurgula.'
                    ]
                    : [
                        'Ezber yaparken veya kelime öğrenirken odanın içinde yürüyerek tekrar et.',
                        'Deneyler yap, maketler oluştur ve el becerisi gerektiren proje görevlerini üstlen.',
                        'Masa başında uzun süre hareketsiz kalmak yerine kısa hareketli molalarla çalış.'
                    ],
                for_teacher: [
                    'Ders esnasında öğrenciye tahtaya kalkma, materyal dağıtma veya rol alma fırsatı tanıyın.',
                    'Laboratuvar, atölye, canlandırma (drama) ve somut materyal kullanımını artırın.',
                    'Öğrencinin elinde stres topu veya silgiyle oynamasını dersten koptuğu şeklinde yorumlamayın.'
                ],
                for_parent: [
                    'Öğrencinin ders çalışırken kıpırdanmasını, bacak sallamasını engellemeye çalışıp enerjisini kırmayın.',
                    'Çalışma programına spor ve fiziksel aktivite saatlerini aksatmadan dahil edin.',
                    'Hafta sonları müze gezileri, doğa yürüyüşleri ve deneysel atölyelerle öğrenmesini destekleyin.'
                ]
            };
        } else {
            // Çoklu / Hibrit
            return {
                for_student: [
                    'Görsel zihin haritalarını sesli anlatımla ve el yazısıyla birleştiren karma çalışma metodunu uygula.',
                    'Farklı ders türlerine göre strateji değiştir (Sayısalda görsel-kinestetik, Sözelde işitsel-görsel).'
                ],
                for_teacher: [
                    'Çoklu zeka ve çoklu duyuya hitap eden zenginleştirilmiş öğrenme istasyonları kurun.',
                    'Öğrenciye proje gruplarında farklı roller arasında köprü olma misyonu verin.'
                ],
                for_parent: [
                    'Öğrencinin hem görsel hem işitsel hem pratik çalışma materyallerine erişimini destekleyin.'
                ]
            };
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. PROJE VERİTABANI & ÖĞRENCİ ENTEGRASYONU
    // ─────────────────────────────────────────────────────────────

    /**
     * VAK analiz sonucunu projenin studentData havuzuna ve Firebase RTDB'ye atomik olarak işler.
     * @param {string|number} studentNoOrId - Öğrenci No veya ID
     * @param {Object} vakResult - calculateVakScores çıktısı
     * @returns {boolean} Başarılı ise true
     */
    function applyVakResultToStudent(studentNoOrId, vakResult) {
        if (!vakResult || !studentNoOrId) return false;
        if (!Array.isArray(window.studentData)) return false;

        const sIdx = window.studentData.findIndex(s => 
            String(s.no) === String(studentNoOrId) || String(s.id) === String(studentNoOrId)
        );

        if (sIdx === -1) return false;

        const dominant = vakResult.vak_scores.dominant_key;

        // Geriye dönük uyumluluk: Mevcut kümeleme, sınav ve koçluk alanları student.vak okur
        window.studentData[sIdx].vak = dominant;
        window.studentData[sIdx].ogrenmeStili = dominant;

        // İleri düzey analitik detay nesnesi
        window.studentData[sIdx].vakDetails = vakResult;

        // Firebase RTDB ve Yerel Depolama ile Senkronize Et
        if (typeof window.saveData === 'function') {
            window.saveData(true);
        }

        // Aktif arayüzleri tetikle
        if (typeof window.renderStudentTable === 'function') window.renderStudentTable();
        if (typeof window.renderKoclukModule === 'function') window.renderKoclukModule();
        if (typeof window.renderYksKoclukModule === 'function') window.renderYksKoclukModule();
        if (typeof renderVakReportsTable === 'function') renderVakReportsTable();

        return true;
    }

    /**
     * Projemiz için optimize edilmiş Google Gemini AI Prompt metnini üretir.
     * @param {Object} student - Öğrenci nesnesi
     * @param {Array|Object} rawAnswers - Öğrencinin anket yanıtları
     * @returns {string} Gemini API veya Kopyala-Yapıştır Koçluk Promptu
     */
    function generateGeminiVakPrompt(student, rawAnswers = null) {
        const gradeLevel = parseGradeLevel(student?.sinif);
        const stage = getDevelopmentalStage(gradeLevel);
        const sName = student?.adSoyad || 'Öğrenci';
        const sNo = student?.no || '-';
        const sClass = student?.sinif || `${gradeLevel}. Sınıf`;

        return `# ROL VE GÖREV TANIMI
Sen; pedagojik ölçme-değerlendirme, eğitim psikolojisi ve çocuk gelişimi alanlarında uzmanlaşmış kıdemli bir Eğitim Teknoloğu ve Kıdemli Yazılım Mimarisin.
Görevin; aşağıda bilgileri verilen öğrencimizin öğrenme stilini VAK (Görsel / Visual, İşitsel / Auditory, Kinestetik / Kinesthetic) modeline göre analiz eden, kademesine (${gradeLevel}. Sınıf - ${stage}) tam uyumlu, pedagojik ve eyleme dökülebilir STRICT JSON çıktısını üretmektir.

---

## 1. ÖĞRENCİ BAĞLAMI
- Öğrenci Adı Soyadı: ${sName}
- Okul No: ${sNo}
- Sınıfı: ${sClass} (Kademe Seviyesi: ${gradeLevel})
- Gelişimsel Dönem: ${stage}
- Mevcut Yanıt Verisi: ${rawAnswers ? JSON.stringify(rawAnswers) : 'Standart Kademe Envanteri'}

---

## 2. KADEME BAZLI DEĞERLENDİRME KURALLARI
${gradeLevel <= 4 
    ? '- Somut işlemler dönemi. Kısa, sıcak, 15-20 kelimelik benzetmeli mikro hikaye dili kullan.' 
    : (gradeLevel <= 8 
        ? '- Soyut işlemlere geçiş ve akran dönemi. LGS, okul projeleri ve sosyal ikilemler bağlamında analiz et.' 
        : '- Üstbilişsel (metacognitive) düşünme dönemi. YKS, zaman yönetimi, stres regülasyonu ve akademik analiz dili kullan.')
}
- Her yanıt ilgili kanala puan katar ($V_{puan}$, $A_{puan}$, $K_{puan}$).
- Toplam üzerinden yüzdelikler (%Visual, %Auditory, %Kinesthetic) hesaplanır.
- Eğer en yüksek iki kanal arasındaki fark < %5.0 ise profil "Çoklu / Hibrit (Bimodal)" olarak tanımlanmalıdır.

---

## 3. İSTENEN ÇIKTI (STRICT JSON SCHEMA)
Hiçbir önsöz, açıklama veya markdown bloğu olmadan, doğrudan aşağıdaki şemaya tam uyan JSON nesnesi dön:
{
  "student_metadata": {
    "student_no": "${sNo}",
    "student_name": "${sName}",
    "class_name": "${sClass}",
    "grade_level": ${gradeLevel},
    "developmental_stage": "${stage}",
    "assessment_type": "${getAssessmentType(gradeLevel)}"
  },
  "vak_scores": {
    "visual_percentage": 0.0,
    "auditory_percentage": 0.0,
    "kinesthetic_percentage": 0.0,
    "dominant_style": "Görsel (Visual)",
    "profile_type": "Tekil Baskın"
  },
  "pedagogical_insights": {
    "summary": "...",
    "cognitive_strengths": ["...", "..."],
    "potential_blockers": ["...", "..."]
  },
  "actionable_recommendations": {
    "for_student": ["...", "..."],
    "for_teacher": ["...", "..."],
    "for_parent": ["..."]
  }
}`;
    }

    // ─────────────────────────────────────────────────────────────
    // 4. ÖĞRETMEN DİJİTAL DEĞERLENDİRME MODALI YÖNETİMİ
    // ─────────────────────────────────────────────────────────────

    let modalActiveGrade = 8;
    let modalActiveStudent = null;

    function openVakAssessmentModal(studentNo = null) {
        const modal = document.getElementById('vak-assessment-modal');
        if (!modal) return;

        const select = document.getElementById('vak-modal-student-select');
        if (select) {
            const list = Array.isArray(window.studentData) ? window.studentData : [];
            let html = '<option value="">-- Öğrenci Seçiniz --</option>';
            list.forEach(s => {
                const sName = (s.adSoyad || (s.ad ? (s.ad + ' ' + s.soyad) : '') || s.name || '').trim();
                const sNo = s.no || '';
                const sClass = s.sinif || '';
                const sel = (studentNo && String(sNo) === String(studentNo)) ? 'selected' : '';
                html += `<option value="${sNo}" data-class="${sClass}" data-name="${sName}" ${sel}>${sNo} - ${sName} (${sClass})</option>`;
            });
            select.innerHTML = html;
            if (studentNo) select.value = studentNo;
        }

        onVakModalStudentChange();
        modal.style.display = 'flex';
    }

    function onVakModalStudentChange() {
        const select = document.getElementById('vak-modal-student-select');
        const badgeEl = document.getElementById('vak-modal-tier-badge');
        const container = document.getElementById('vak-modal-questions-box');
        if (!select || !container) return;

        const selNo = select.value;
        const opt = select.options[select.selectedIndex];
        const studentClass = opt ? (opt.getAttribute('data-class') || '8/A') : '8/A';

        modalActiveStudent = (window.studentData || []).find(s => String(s.no) === String(selNo)) || null;
        modalActiveGrade = parseGradeLevel(studentClass);

        if (badgeEl) {
            badgeEl.textContent = `${modalActiveGrade}. Sınıf (${getDevelopmentalStage(modalActiveGrade)})`;
        }

        const questions = getQuestionsForGrade(modalActiveGrade);
        let qHtml = '';

        questions.forEach((q, idx) => {
            qHtml += `
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px;">
                <div style="font-weight:700; font-size:12.5px; margin-bottom:8px; display:flex; gap:6px;">
                    <span style="background:var(--primary); color:#fff; width:20px; height:20px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:11px;">${idx + 1}</span>
                    <span>${q.question}</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    ${q.options.map(opt => `
                        <label style="display:flex; align-items:center; gap:8px; padding:6px 10px; background:var(--card-bg); border:1px solid var(--border); border-radius:6px; cursor:pointer; font-size:12px;">
                            <input type="radio" name="vak_m_q_${q.id}" value="${opt.key}" onchange="VakEngine.updateModalLivePreview()" required>
                            <span><strong>[${opt.style}]:</strong> ${opt.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>`;
        });

        container.innerHTML = qHtml;
        updateModalLivePreview();
    }

    function updateModalLivePreview() {
        const questions = getQuestionsForGrade(modalActiveGrade);
        const answers = [];

        questions.forEach(q => {
            const checked = document.querySelector(`input[name="vak_m_q_${q.id}"]:checked`);
            if (checked) answers.push(checked.value);
        });

        const vCount = answers.filter(a => a === 'V').length;
        const aCount = answers.filter(a => a === 'A').length;
        const kCount = answers.filter(a => a === 'K').length;
        const total = Math.max(1, vCount + aCount + kCount);

        const vP = Math.round((vCount / total) * 100);
        const aP = Math.round((aCount / total) * 100);
        const kP = Math.round((kCount / total) * 100);

        const vEl = document.getElementById('vak-modal-live-v');
        const aEl = document.getElementById('vak-modal-live-a');
        const kEl = document.getElementById('vak-modal-live-k');
        const domEl = document.getElementById('vak-modal-live-dom');

        if (vEl) vEl.textContent = `%${vP}`;
        if (aEl) aEl.textContent = `%${aP}`;
        if (kEl) kEl.textContent = `%${kP}`;

        if (domEl) {
            if (answers.length === 0) {
                domEl.textContent = 'Seçim bekleniyor...';
                domEl.style.color = 'var(--text-muted)';
            } else {
                const diff = Math.abs(Math.max(vP, aP, kP) - (vP + aP + kP - Math.max(vP, aP, kP) - Math.min(vP, aP, kP)));
                if (diff < 5 && answers.length >= 3) {
                    domEl.textContent = '🎯 Çoklu / Hibrit Stil';
                    domEl.style.color = '#10b981';
                } else if (vP >= aP && vP >= kP) {
                    domEl.textContent = '👁️ Görsel (Visual)';
                    domEl.style.color = '#3b82f6';
                } else if (aP >= vP && aP >= kP) {
                    domEl.textContent = '🎧 İşitsel (Auditory)';
                    domEl.style.color = '#8b5cf6';
                } else {
                    domEl.textContent = '✋ Kinestetik (Kinesthetic)';
                    domEl.style.color = '#f59e0b';
                }
            }
        }
    }

    function saveVakFromModal() {
        const select = document.getElementById('vak-modal-student-select');
        if (!select || !select.value) {
            alert('Lütfen bir öğrenci seçiniz.');
            return;
        }

        const questions = getQuestionsForGrade(modalActiveGrade);
        const answers = [];

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const checked = document.querySelector(`input[name="vak_m_q_${q.id}"]:checked`);
            if (!checked) {
                alert(`Lütfen tüm soruları işaretleyiniz (${i + 1}. soru boş bırakıldı).`);
                return;
            }
            answers.push(checked.value);
        }

        const student = (window.studentData || []).find(s => String(s.no) === String(select.value));
        const assessment = calculateVakScores(answers, modalActiveGrade, student || { no: select.value });

        const success = applyVakResultToStudent(select.value, assessment);

        if (success) {
            const modal = document.getElementById('vak-assessment-modal');
            if (modal) modal.style.display = 'none';
            alert(`✅ ${student?.adSoyad || select.value} için VAK Öğrenme Stili (${assessment.vak_scores.dominant_style}) başarıyla hesaplandı ve tüm sisteme işlendi!`);
        } else {
            alert('Öğrenci kaydı güncellenirken bir hata oluştu.');
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 5. RAPORLAMA, TABLO RENDER & SINIF ANALİZİ
    // ─────────────────────────────────────────────────────────────

    function renderVakReportsTable(selectedClass = '') {
        const tbody = document.getElementById('vak-reports-table-body');
        if (!tbody) return;

        const allStudents = Array.isArray(window.studentData) ? window.studentData : [];

        // Sınıf filtre açılır kutusunu otomatik güncelle
        const classFilterSelect = document.getElementById('vak-filter-class');
        if (classFilterSelect) {
            const currentVal = classFilterSelect.value;
            const uniqueClasses = [...new Set(allStudents.map(s => s.sinif).filter(c => c && c.toString().trim() !== ''))].sort();
            if (classFilterSelect.options.length <= 1 && uniqueClasses.length > 0) {
                classFilterSelect.innerHTML = '<option value="">Tüm Sınıflar</option>';
                uniqueClasses.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = c;
                    classFilterSelect.appendChild(opt);
                });
                if (currentVal && uniqueClasses.includes(currentVal)) {
                    classFilterSelect.value = currentVal;
                }
            }
        }

        const classFilter = selectedClass || (document.getElementById('vak-filter-class')?.value || '');
        const searchInput = (document.getElementById('vak-search-student')?.value || '').toLocaleLowerCase('tr-TR').trim();

        const filtered = allStudents.filter(s => {
            if (classFilter && s.sinif !== classFilter && window.normSinif && window.normSinif(s.sinif) !== window.normSinif(classFilter)) {
                return false;
            }
            if (searchInput) {
                const haystack = `${s.no} ${s.adSoyad} ${s.sinif} ${s.vak || ''}`.toLocaleLowerCase('tr-TR');
                if (!haystack.includes(searchInput)) return false;
            }
            return true;
        });

        // Üst İstatistik Kartlarını Güncelle
        updateVakStatistics(filtered);

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted); font-size:13px;">Seçilen kriterlere uygun öğrenci bulunamadı.</td></tr>`;
            return;
        }

        let html = '';
        filtered.forEach(s => {
            const safeNo = escapeFn(s.no || '-');
            const safeName = escapeFn(s.adSoyad || '-');
            const safeClass = escapeFn(s.sinif || '-');
            const vakKey = s.vak || s.ogrenmeStili || 'Belirtilmedi';
            const details = s.vakDetails || null;

            let vPerc = 33, aPerc = 33, kPerc = 34;
            if (details && details.vak_scores) {
                vPerc = Math.round(details.vak_scores.visual_percentage || 0);
                aPerc = Math.round(details.vak_scores.auditory_percentage || 0);
                kPerc = Math.round(details.vak_scores.kinesthetic_percentage || 0);
            } else if (vakKey === 'Görsel') { vPerc = 60; aPerc = 25; kPerc = 15; }
            else if (vakKey === 'İşitsel') { vPerc = 20; aPerc = 65; kPerc = 15; }
            else if (vakKey === 'Kinestetik') { vPerc = 20; aPerc = 20; kPerc = 60; }

            let badgeBg = 'rgba(100,116,139,0.1)', badgeColor = '#64748b', icon = 'fas fa-question';
            if (vakKey.includes('Görsel')) { badgeBg = 'rgba(59,130,246,0.12)'; badgeColor = '#3b82f6'; icon = 'fas fa-eye'; }
            else if (vakKey.includes('İşitsel')) { badgeBg = 'rgba(139,92,246,0.12)'; badgeColor = '#8b5cf6'; icon = 'fas fa-headphones'; }
            else if (vakKey.includes('Kinestetik')) { badgeBg = 'rgba(245,158,11,0.12)'; badgeColor = '#f59e0b'; icon = 'fas fa-hand-paper'; }
            else if (vakKey.includes('Hibrit') || vakKey.includes('Çoklu')) { badgeBg = 'rgba(16,185,129,0.12)'; badgeColor = '#10b981'; icon = 'fas fa-brain'; }

            html += `
            <tr style="border-bottom:1px solid var(--border); font-size:12.5px;">
                <td style="padding:10px; font-weight:700;">${safeNo}</td>
                <td style="padding:10px; font-weight:600; color:var(--text-main);">${safeName}</td>
                <td style="padding:10px;"><span style="background:var(--input-bg); padding:2px 8px; border-radius:4px; font-weight:600;">${safeClass}</span></td>
                <td style="padding:10px;">
                    <span style="display:inline-flex; align-items:center; gap:6px; background:${badgeBg}; color:${badgeColor}; padding:4px 10px; border-radius:12px; font-weight:700; font-size:11.5px;">
                        <i class="${icon}"></i> ${escapeFn(vakKey)}
                    </span>
                </td>
                <td style="padding:10px; min-width:140px;">
                    <div style="display:flex; height:7px; border-radius:4px; overflow:hidden; background:var(--border);">
                        <div style="width:${vPerc}%; background:#3b82f6;" title="Görsel: %${vPerc}"></div>
                        <div style="width:${aPerc}%; background:#8b5cf6;" title="İşitsel: %${aPerc}"></div>
                        <div style="width:${kPerc}%; background:#f59e0b;" title="Kinestetik: %${kPerc}"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:10px; color:var(--text-muted); margin-top:2px;">
                        <span>G:%${vPerc}</span>
                        <span>İ:%${aPerc}</span>
                        <span>K:%${kPerc}</span>
                    </div>
                </td>
                <td style="padding:10px; text-align:right; white-space:nowrap;">
                    <button class="btn btn-clear" onclick="VakEngine.printStudentVakReport('${safeNo}')" title="A4 Rapor Çıktısı Al" style="padding:5px 9px; font-size:11px; margin-right:4px;">
                        <i class="fas fa-print" style="color:var(--primary);"></i> Çıktı
                    </button>
                    <button class="btn btn-clear" onclick="VakEngine.openVakEditModal('${safeNo}')" title="Profili Düzenle / Editle" style="padding:5px 9px; font-size:11px; margin-right:4px;">
                        <i class="fas fa-edit" style="color:#d97706;"></i> Editle
                    </button>
                    <button class="btn btn-clear" onclick="VakEngine.openVakLinkHub('${safeNo}')" title="Modüllere Bağlantı Kur" style="padding:5px 9px; font-size:11px;">
                        <i class="fas fa-link" style="color:#10b981;"></i> Bağlan
                    </button>
                </td>
            </tr>`;
        });

        tbody.innerHTML = html;
    }

    function updateVakStatistics(list) {
        let total = list.length;
        let vCount = 0, aCount = 0, kCount = 0, hCount = 0;

        list.forEach(s => {
            const v = s.vak || s.ogrenmeStili || '';
            if (v.includes('Görsel')) vCount++;
            else if (v.includes('İşitsel')) aCount++;
            else if (v.includes('Kinestetik')) kCount++;
            else if (v.includes('Hibrit') || v.includes('Çoklu')) hCount++;
        });

        const elTotal = document.getElementById('vak-stat-total');
        const elV = document.getElementById('vak-stat-v');
        const elA = document.getElementById('vak-stat-a');
        const elK = document.getElementById('vak-stat-k');
        const elH = document.getElementById('vak-stat-h');

        if (elTotal) elTotal.textContent = total;
        if (elV) elV.textContent = total > 0 ? `%${Math.round((vCount / total) * 100)} (${vCount})` : '%0';
        if (elA) elA.textContent = total > 0 ? `%${Math.round((aCount / total) * 100)} (${aCount})` : '%0';
        if (elK) elK.textContent = total > 0 ? `%${Math.round((kCount / total) * 100)} (${kCount})` : '%0';
        if (elH) elH.textContent = total > 0 ? `%${Math.round((hCount / total) * 100)} (${hCount})` : '%0';
    }

    // ─────────────────────────────────────────────────────────────
    // 6. FORM ÇIKTISI ALMA (TEK SAYFA A4 PEDAGOJİK GELİŞİM RAPORU)
    // ─────────────────────────────────────────────────────────────

    function printStudentVakReport(studentNoOrId) {
        const student = (window.studentData || []).find(s => 
            String(s.no) === String(studentNoOrId) || String(s.id) === String(studentNoOrId)
        );

        if (!student) {
            alert('Yazdırılacak öğrenci kaydı bulunamadı.');
            return;
        }

        const grade = parseGradeLevel(student.sinif);
        const stage = getDevelopmentalStage(grade);
        const safeName = escapeFn(student.adSoyad || 'Öğrenci');
        const safeNo = escapeFn(student.no || '-');
        const safeClass = escapeFn(student.sinif || `${grade}. Sınıf`);

        // Değerlendirme nesnesini al ya da üret
        let details = student.vakDetails;
        if (!details || !details.vak_scores) {
            const defaultKey = student.vak || 'Görsel';
            details = calculateVakScores([defaultKey === 'Görsel' ? 'V' : (defaultKey === 'İşitsel' ? 'A' : 'K')], grade, student);
        }

        const scores = details.vak_scores;
        const insights = details.pedagogical_insights;
        const recs = details.actionable_recommendations;

        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        const teacherUid = (window.currentUser && window.currentUser.uid) || window.activeWorkspaceUid || (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser ? firebase.auth().currentUser.uid : '');
        const uidParam = teacherUid ? '&uid=' + encodeURIComponent(teacherUid) : '';
        const formLink = `${baseUrl}/vak_formu.html?sinif=${encodeURIComponent(student.sinif || '')}&no=${encodeURIComponent(student.no || '')}&ad=${encodeURIComponent(student.adSoyad || '')}${uidParam}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(formLink)}&color=0284c7`;

        const printWin = window.open('', '_blank');
        const html = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>VAK Bilişsel Öğrenme Stili Karnesi - ${safeName}</title>
    <style>
        @page { size: A4 portrait; margin: 12mm 14mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 11pt; line-height: 1.45; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2.5px solid #0284c7; padding-bottom: 10px; margin-bottom: 12px; }
        .header h1 { font-size: 16pt; color: #0284c7; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .header p { margin: 0; font-size: 9pt; color: #64748b; font-weight: 600; }
        .student-info-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 14px; font-size: 9.5pt; }
        .info-cell strong { display: block; font-size: 7.5pt; text-transform: uppercase; color: #64748b; margin-bottom: 2px; }
        .scores-card { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
        .score-box { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; }
        .score-box.visual { border-color: #3b82f6; background: rgba(59,130,246,0.04); }
        .score-box.auditory { border-color: #8b5cf6; background: rgba(139,92,246,0.04); }
        .score-box.kinesthetic { border-color: #f59e0b; background: rgba(245,158,11,0.04); }
        .score-box .title { font-size: 8.5pt; font-weight: 700; margin-bottom: 4px; }
        .score-box .percent { font-size: 18pt; font-weight: 800; }
        .dominant-banner { background: #0284c7; color: #fff; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 11pt; text-align: center; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
        .section-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px; }
        .section-title { font-size: 10pt; font-weight: 800; color: #0284c7; margin: 0 0 6px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; display: flex; align-items: center; gap: 6px; }
        ul { margin: 0; padding-left: 18px; font-size: 9pt; }
        li { margin-bottom: 3px; }
        .recs-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .rec-col { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; font-size: 8.5pt; }
        .rec-col h4 { margin: 0 0 4px 0; font-size: 9pt; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; }
        .footer-signatures { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; margin-top: 20px; font-size: 8.5pt; color: #64748b; }
        .sig-line { border-top: 1px dashed #94a3b8; margin-top: 35px; padding-top: 4px; }
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1>🧠 BİLİŞSEL VAK ÖĞRENME STİLİ GELİŞİM KARNESİ</h1>
            <p>T.C. MİLLÎ EĞİTİM BAKANLIĞI • PROJE VE KOÇLUK TABANLI DERS İŞLEME SİSTEMİ</p>
        </div>
        <img src="${qrUrl}" alt="Doğrulama QR" style="width:75px; height:75px; border-radius:4px; border:1px solid #cbd5e1;">
    </div>

    <div class="student-info-grid">
        <div class="info-cell">
            <strong>ÖĞRENCİ ADI SOYADI</strong>
            <span style="font-size:11pt; font-weight:700;">${safeName}</span>
        </div>
        <div class="info-cell">
            <strong>OKUL NUMARASI</strong>
            <span>${safeNo}</span>
        </div>
        <div class="info-cell">
            <strong>SINIF / ŞUBE</strong>
            <span>${safeClass}</span>
        </div>
        <div class="info-cell">
            <strong>DEĞERLENDİRME TARİHİ</strong>
            <span>${new Date().toLocaleDateString('tr-TR')}</span>
        </div>
    </div>

    <div class="dominant-banner">
        <span>🎯 BASKIN ÖĞRENME PROFİLİ: <strong>${scores.dominant_style}</strong></span>
        <span style="font-size:9pt; background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:4px;">${scores.profile_type}</span>
    </div>

    <div class="scores-card">
        <div class="score-box visual">
            <div class="title" style="color:#3b82f6;">👁️ GÖRSEL (VISUAL)</div>
            <div class="percent" style="color:#3b82f6;">%${scores.visual_percentage}</div>
            <div style="font-size:7.5pt; color:#64748b;">Şema, zihin haritası & renkler</div>
        </div>
        <div class="score-box auditory">
            <div class="title" style="color:#8b5cf6;">🎧 İŞİTSEL (AUDITORY)</div>
            <div class="percent" style="color:#8b5cf6;">%${scores.auditory_percentage}</div>
            <div style="font-size:7.5pt; color:#64748b;">Sesli tekrar, dinleme & tartışma</div>
        </div>
        <div class="score-box kinesthetic">
            <div class="title" style="color:#f59e0b;">✋ KİNESTETİK (KINESTHETIC)</div>
            <div class="percent" style="color:#f59e0b;">%${scores.kinesthetic_percentage}</div>
            <div style="font-size:7.5pt; color:#64748b;">Yaparak-yaşayarak & hareket</div>
        </div>
    </div>

    <div class="section-box">
        <div class="section-title">📊 PEDAGOJİK DEĞERLENDİRME & BİLİŞSEL TEŞHİS (${stage})</div>
        <p style="margin:0 0 8px 0; font-size:9pt; color:#334155;">${insights.summary}</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:6px 10px;">
                <strong style="color:#16a34a; font-size:8pt; display:block; margin-bottom:2px;">💪 Bilişsel Güçlü Yönler:</strong>
                <ul>${(insights.cognitive_strengths || []).map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:6px; padding:6px 10px;">
                <strong style="color:#dc2626; font-size:8pt; display:block; margin-bottom:2px;">⚠️ Dikkat Edilecek Bilişsel Engeller:</strong>
                <ul>${(insights.potential_blockers || []).map(b => `<li>${b}</li>`).join('')}</ul>
            </div>
        </div>
    </div>

    <div class="section-box" style="margin-bottom:8px;">
        <div class="section-title">🎯 3 BOYUTLU STRATEJİK EYLEM REHBERİ</div>
        <div class="recs-grid">
            <div class="rec-col">
                <h4>🎯 Öğrenci İçin</h4>
                <ul>${(recs.for_student || []).map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
            <div class="rec-col">
                <h4>👩‍🏫 Öğretmen İçin</h4>
                <ul>${(recs.for_teacher || []).map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
            <div class="rec-col">
                <h4>🏡 Veli İçin</h4>
                <ul>${(recs.for_parent || []).map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
        </div>
    </div>

    <div class="footer-signatures">
        <div>
            Öğrenci İmzası
            <div class="sig-line">${safeName}</div>
        </div>
        <div>
            Danışman Öğretmen / Mentor
            <div class="sig-line">İmza & Tarih</div>
        </div>
        <div>
            Veli Onayı
            <div class="sig-line">İmza & Ad Soyad</div>
        </div>
    </div>

    <script>
        window.onload = () => { setTimeout(() => { window.print(); }, 800); }
    <\/script>
</body>
</html>`;

        printWin.document.write(html);
        printWin.document.close();
    }

    // ─────────────────────────────────────────────────────────────
    // 7. EDİTLEME / DÜZENLEME MODALI YÖNETİMİ
    // ─────────────────────────────────────────────────────────────

    let activeEditStudentNo = null;

    function openVakEditModal(studentNoOrId) {
        const student = (window.studentData || []).find(s => 
            String(s.no) === String(studentNoOrId) || String(s.id) === String(studentNoOrId)
        );

        if (!student) {
            alert('Düzenlenecek öğrenci bulunamadı.');
            return;
        }

        activeEditStudentNo = student.no;
        const modal = document.getElementById('vak-edit-modal');
        if (!modal) return;

        const titleEl = document.getElementById('vak-edit-student-title');
        if (titleEl) {
            titleEl.textContent = `${student.no} - ${student.adSoyad} (${student.sinif})`;
        }

        const details = student.vakDetails || {};
        const scores = details.vak_scores || {};

        document.getElementById('vak-edit-style-select').value = student.vak || 'Görsel';
        document.getElementById('vak-edit-v-input').value = scores.visual_percentage || 50;
        document.getElementById('vak-edit-a-input').value = scores.auditory_percentage || 30;
        document.getElementById('vak-edit-k-input').value = scores.kinesthetic_percentage || 20;
        document.getElementById('vak-edit-note-input').value = details.teacherNote || '';

        modal.style.display = 'flex';
    }

    function saveVakEditFromModal() {
        if (!activeEditStudentNo) return;

        const student = (window.studentData || []).find(s => String(s.no) === String(activeEditStudentNo));
        if (!student) return;

        const newStyle = document.getElementById('vak-edit-style-select')?.value || 'Görsel';
        const v = Number(document.getElementById('vak-edit-v-input')?.value) || 0;
        const a = Number(document.getElementById('vak-edit-a-input')?.value) || 0;
        const k = Number(document.getElementById('vak-edit-k-input')?.value) || 0;
        const note = document.getElementById('vak-edit-note-input')?.value.trim() || '';

        const grade = parseGradeLevel(student.sinif);

        // Yeni profil oluştur
        const updatedDetails = {
            student_metadata: {
                student_no: student.no,
                student_name: student.adSoyad,
                class_name: student.sinif,
                grade_level: grade,
                developmental_stage: getDevelopmentalStage(grade),
                assessment_type: 'Öğretmen Manuel Düzenleme & Bilişsel Gözlem',
                updated_at: new Date().toISOString()
            },
            vak_scores: {
                visual_percentage: v,
                auditory_percentage: a,
                kinesthetic_percentage: k,
                dominant_style: newStyle,
                dominant_key: newStyle,
                profile_type: (Math.abs(v - a) < 5 || Math.abs(v - k) < 5) ? 'Çoklu / Hibrit' : 'Tekil Baskın'
            },
            teacherNote: note,
            pedagogical_insights: generatePedagogicalInsights(newStyle, grade, { vPerc: v, aPerc: a, kPerc: k }),
            actionable_recommendations: generateActionableRecommendations(newStyle, grade)
        };

        applyVakResultToStudent(student.no, updatedDetails);

        const modal = document.getElementById('vak-edit-modal');
        if (modal) modal.style.display = 'none';

        renderVakReportsTable();
        alert(`✅ ${student.adSoyad} isimli öğrencinin VAK profili güncellendi ve tüm sisteme yansıtıldı.`);
    }

    // ─────────────────────────────────────────────────────────────
    // 8. BAĞLANTI KURMA & DİĞER MODÜLLERLE ENTEGRASYON
    // ─────────────────────────────────────────────────────────────

    let activeLinkStudentNo = null;

    function openVakLinkHub(studentNoOrId) {
        const student = (window.studentData || []).find(s => 
            String(s.no) === String(studentNoOrId) || String(s.id) === String(studentNoOrId)
        );

        if (!student) {
            alert('Öğrenci bulunamadı.');
            return;
        }

        activeLinkStudentNo = student.no;
        const modal = document.getElementById('vak-link-hub-modal');
        if (!modal) return;

        const titleEl = document.getElementById('vak-link-student-title');
        if (titleEl) {
            titleEl.textContent = `${student.no} - ${student.adSoyad} (${student.sinif}) • Stil: ${student.vak || 'Belirtilmedi'}`;
        }

        modal.style.display = 'flex';
    }

    function linkToGrouping() {
        closeModal('vak-link-hub-modal');
        if (typeof window.openTab === 'function') {
            window.openTab('tab1');
            const student = (window.studentData || []).find(s => String(s.no) === String(activeLinkStudentNo));
            if (student && student.sinif && document.getElementById('class-select')) {
                document.getElementById('class-select').value = student.sinif;
                if (typeof window.renderStudentTable === 'function') window.renderStudentTable();
            }
        }
    }

    function linkToStrategy() {
        closeModal('vak-link-hub-modal');
        if (typeof window.openTab === 'function') {
            window.openTab('tab3');
        }
    }

    function linkToLgsCoaching() {
        closeModal('vak-link-hub-modal');
        if (typeof window.openTab === 'function') {
            window.openTab('tab-kocluk');
            const student = (window.studentData || []).find(s => String(s.no) === String(activeLinkStudentNo));
            const existingKoc = (window.koclukData || []).find(k => String(k.studentNo) === String(activeLinkStudentNo));
            if (existingKoc && typeof window.openKoclukDetailModal === 'function') {
                window.openKoclukDetailModal(existingKoc.id);
            } else if (typeof window.openAddKoclukModal === 'function') {
                window.openAddKoclukModal();
            }
        }
    }

    function linkToYksCoaching() {
        closeModal('vak-link-hub-modal');
        if (typeof window.openTab === 'function') {
            window.openTab('tab-yks-kocluk');
            const existingYks = (window.yksKoclukData || []).find(k => String(k.studentNo) === String(activeLinkStudentNo));
            if (existingYks && typeof window.openYksDetailModal === 'function') {
                window.openYksDetailModal(existingYks.id);
            } else if (typeof window.openAddYksKoclukModal === 'function') {
                window.openAddYksKoclukModal();
            }
        }
    }

    async function sendVakWhatsApp() {
        const student = (window.studentData || []).find(s => String(s.no) === String(activeLinkStudentNo));
        if (!student) return;

        const grade = parseGradeLevel(student.sinif);
        const style = student.vak || 'Görsel';
        const details = student.vakDetails || {};
        const recs = details.actionable_recommendations ? (details.actionable_recommendations.for_parent || []) : [];

        const msg = `🌟 *Bilişsel Öğrenme Stili & Gelişim Bülteni* 🌟

Değerli Velimiz,
Öğrencimiz *${student.adSoyad}* (${student.sinif}) ile gerçekleştirdiğimiz pedagojik VAK envanteri neticesinde, öğrencimizin bilgiyi en kalıcı şekilde *${style}* duyusal kanalıyla işlediği belirlenmiştir.

💡 *Evde Öğrenciyi Destekleme Rehberi:*
${recs.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Öğrencimizin ders çalışma verimini artırmak adına evdeki çalışma masasını ve molalarını bu doğrultuda yapılandırmanızı rica ederiz.
Saygılarımızla, Proje Tabanlı Başarı Ekibi.`;

        try {
            await navigator.clipboard.writeText(msg);
            alert('📱 Veli WhatsApp bilgilendirme mesajı panoya kopyalandı! WhatsApp Web açılıyor...');
        } catch (_) {
            alert('Mesaj:\n\n' + msg);
        }

        window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    }

    // ─────────────────────────────────────────────────────────────
    // GLOBAL EXPORT
    // ─────────────────────────────────────────────────────────────
    window.VakEngine = {
        parseGradeLevel,
        getDevelopmentalStage,
        getAssessmentType,
        getQuestionsForGrade,
        calculateVakScores,
        applyVakResultToStudent,
        generateGeminiVakPrompt,
        openVakAssessmentModal,
        onVakModalStudentChange,
        updateModalLivePreview,
        saveVakFromModal,
        renderVakReportsTable,
        printStudentVakReport,
        openVakEditModal,
        saveVakEditFromModal,
        openVakLinkHub,
        linkToGrouping,
        linkToStrategy,
        linkToLgsCoaching,
        linkToYksCoaching,
        sendVakWhatsApp,
        questionBanks: VAK_QUESTION_BANKS
    };

    window.openVakAssessmentModal = openVakAssessmentModal;

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
    }
    if (typeof window.closeModal !== 'function') {
        window.closeModal = closeModal;
    }

    // Sekme Dinleyicisi
    document.addEventListener('DOMContentLoaded', () => {
        const filterSelect = document.getElementById('vak-filter-class');
        const searchInput = document.getElementById('vak-search-student');
        if (filterSelect) filterSelect.addEventListener('change', () => renderVakReportsTable());
        if (searchInput) searchInput.addEventListener('input', () => renderVakReportsTable());
    });

})();

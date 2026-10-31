// ============================================================
// curriculum.js
// MEB Türkiye Yüzyılı Maarif Modeli & Karma Yapı (Master Veritabanı)
// Kaynak: MEB 2024-2026 Ders Kitapları & TTKB Resmi Müfredat (tymm.meb.gov.tr)
// YENİ MODEL (Tema / Öğrenim Çıktısı): 1, 2, 3, 5, 6, 7, 9, 10, 11. Sınıflar
// ESKİ MODEL (Ünite / Kazanım): 4, 8, 12. Sınıflar (LGS, YKS ve İlkokul Geçiş)
// Güncelleme Tarihi: 2026-10-16
// ============================================================

const curriculumData = {
    "1. Sınıf": {
        "Türkçe": {
            "1. Tema: Güzel Davranışlarımız": {
                "Konular": [
                    "Dinleme ve İzleme Kuralları",
                    "Nezaket ve Görgü İfadeleri",
                    "İlk Okuma Yazma: a, n, e, t Ses Grubu",
                    "Duygu ve Düşünceleri Sözlü Paylaşma"
                ],
                "Öğrenim Çıktıları": [
                    "Dinleme ve izleme kurallarını uygulayarak dinlediği metinden anlam çıkarır.",
                    "a, n, e, t seslerini tanır, seslendirir, hece ve kelimeler oluşturup kurallı yazar.",
                    "Günlük yaşamda nezaket, sevgi ve saygı bildiren ifadeleri yerinde kullanır.",
                    "Metinle ilgili görsel ögeleri inceleyerek metnin içeriğini tahmin eder."
                ]
            },
            "2. Tema: Mustafa Kemal'den Atatürk'e": {
                "Konular": [
                    "Atatürk'ün Çocukluk Yılları ve Ailesi",
                    "Vatan ve Bayrak Sevgisi",
                    "İlk Okuma Yazma: i, l, o, k, u Ses Grubu",
                    "Görsellerden Hareketle Olay Sıralama"
                ],
                "Öğrenim Çıktıları": [
                    "Mustafa Kemal Atatürk'ün hayatı ile ilgili temel olayları kavrar ve anlatır.",
                    "i, l, o, k, u seslerini okur, yazar, önceki seslerle birleştirerek yeni kelimeler türetir.",
                    "Dinlediği veya okuduğu metindeki olayları kronolojik sıraya koyar.",
                    "Millî ve manevi değerleri yansıtan metinlerdeki ana iletiyi belirler."
                ]
            },
            "3. Tema: Çevremizdeki Yaşam": {
                "Konular": [
                    "Yakın Çevre, Ev ve Okul Yaşamı",
                    "Doğa ve Hayvan Sevgisi",
                    "İlk Okuma Yazma: r, ı, m, s, d, b Ses Grubu",
                    "Basit Cümleler Kurma ve Nokta Kullanımı"
                ],
                "Öğrenim Çıktıları": [
                    "Çevresindeki varlıkları, doğayı ve canlıları gözlemleyerek sözlü betimler.",
                    "r, ı, m, s, d, b seslerini tanır, doğru sesletir ve yazı defterine kurallı yazar.",
                    "Duygu ve gözlemlerini basit, anlamlı ve kurallı cümlelerle ifade eder.",
                    "Cümle sonuna nokta konulması gerektiğini fark eder ve uygular."
                ]
            },
            "4. Tema: Yol Arkadaşımız Kitaplar": {
                "Konular": [
                    "Kitap Sevgisi ve Sayfa Düzeni",
                    "Kütüphane Kültürü",
                    "İlk Okuma Yazma: ö, v, y, c, z, ç Ses Grubu",
                    "Okuduğu Metni Anlatma ve Paylaşma"
                ],
                "Öğrenim Çıktıları": [
                    "Kitabın kapak, yazar ve sayfa gibi temel bölümlerini tanır.",
                    "ö, v, y, c, z, ç seslerini içeren hece, kelime ve kısa cümleleri akıcı okur ve yazar.",
                    "Okuduğu kısa hikâyeleri ana hatlarıyla arkadaşlarına aktarır.",
                    "Kitap okuma alışkanlığının kişisel gelişime katkısını fark eder."
                ]
            },
            "5. Tema: Yeteneklerimizi Keşfediyoruz": {
                "Konular": [
                    "Bireysel İlgi ve Beceriler",
                    "Sanat ve Spor Sevgisi",
                    "İlk Okuma Yazma: g, p, h, ü, ş, f Ses Grubu",
                    "Büyük Harflerin Kullanımı"
                ],
                "Öğrenim Çıktıları": [
                    "Kendisine özgü yetenek ve becerileri fark ederek sözlü olarak tanıtır.",
                    "g, p, h, ü, ş, f seslerini doğru okur ve işlek bir yazıyla yazar.",
                    "Özel isimlerin ve cümlelerin büyük harfle başladığını kavrar ve uygular.",
                    "Metinlerdeki kahramanların fiziksel ve kişisel özelliklerini ayırt eder."
                ]
            },
            "6. Tema: Minik Kâşifler": {
                "Konular": [
                    "Bilimsel Merak ve Araştırma",
                    "Doğa Olaylarını Gözlemleme",
                    "İlk Okuma Yazma: j, ğ Sesleri ve Alfabenin Tamamlanması",
                    "Soru Cümleleri ve Soru İşareti"
                ],
                "Öğrenim Çıktıları": [
                    "Merak ettiği konular hakkında sorular sorar ve basit bilgilendirici metinleri anlar.",
                    "j ve ğ seslerini öğrenerek Türk alfabesindeki tüm harfleri tamamlar.",
                    "Soru cümlelerini vurgu ve tonlamasına uygun okur, sonuna soru işareti koyar.",
                    "Gözlem ve deneyimlerini aktaran kısa notlar yazar."
                ]
            },
            "7. Tema: Atalarımızın İzleri": {
                "Konular": [
                    "Geleneksel Çocuk Oyunları",
                    "Tekerleme, Ninni ve Masallar",
                    "Millî Kültür Unsurlarımız",
                    "Şiir Okuma ve Ritim"
                ],
                "Öğrenim Çıktıları": [
                    "Kültürel mirasımıza ait tekerleme, bilmece ve masalları dinler ve seslendirir.",
                    "Okuduğu şiirlerdeki ahenk ve ritmi fark ederek duygusuna uygun okur.",
                    "Geleneksel bayram ve kutlamaların toplum için önemini metinler üzerinden açıklar.",
                    "Metinlerde geçen yeni kelimeleri günlük konuşmalarında kullanır."
                ]
            },
            "8. Tema: Sorumluluklarımızın Farkındayız": {
                "Konular": [
                    "Evde ve Okulda Sorumluluklarımız",
                    "Zamanı Verimli Kullanma",
                    "Çevre Temizliği ve Düzen",
                    "Duygu Belirten Cümleler ve Ünlem İşareti"
                ],
                "Öğrenim Çıktıları": [
                    "Bireysel ve toplumsal sorumluluklarını kavrayarak davranışlarına yansıtır.",
                    "Sevinç, korku, şaşkınlık gibi duyguları belirten cümleleri ve ünlem işaretini ayırt eder.",
                    "Dinledikleri ve okuduklarıyla ilgili düşüncelerini yazılı olarak paylaşır.",
                    "Yazılarında harfler ve kelimeler arasında uygun boşluklar bırakır."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Nesnelerin Geometrisi (1)": {
                "Konular": [
                    "Uzamsal İlişkiler (Altında, Üstünde, Önünde, Arkasında, Sağında, Solunda)",
                    "Eş Nesneler ve Benzerlikler"
                ],
                "Öğrenim Çıktıları": [
                    "Nesnelerin birbirine göre uzamsal konumlarını uygun matematiksel ifadelerle belirtir.",
                    "Birebir eş olan nesneleri ve geometrik modelleri ayırt eder."
                ]
            },
            "2. Tema: Sayılar ve Nicelikler (1)": {
                "Konular": [
                    "1'den 20'ye Kadar Rakamlar ve Doğal Sayılar",
                    "Nesne Sayısını Belirleme ve Eşleme",
                    "Sıra Bildiren Sayılar (ıncı/inci)",
                    "İleriye ve Geriye Ritmik Saymalar (Birer, İkişer, Beşer, Onar)",
                    "Sayı ve Şekil Örüntüleri",
                    "Çoklukları Tahmin Etme"
                ],
                "Öğrenim Çıktıları": [
                    "20'ye kadar olan doğal sayıları okur, yazar ve nesne modelleriyle gösterir.",
                    "Nesne gruplarını sayarak çoklukları azlık, çokluk ve eşitlik bakımından karşılaştırır.",
                    "Sıra bildiren sayıları günlük yaşam durumlarında doğru kullanır.",
                    "Belirli bir kurala göre dizilmiş sayı ve şekil örüntülerindeki eksik ögeleri tamamlar."
                ]
            },
            "3. Tema: Sayılar ve Nicelikler (2)": {
                "Konular": [
                    "Standart Olmayan Birimlerle Uzunluk Ölçme",
                    "Nesneleri Uzunluklarına Göre Sıralama",
                    "Kütleleri Karşılaştırma ve Tartma (Ağır-Hafif)"
                ],
                "Öğrenim Çıktıları": [
                    "Nesnelerin uzunluklarını standart olmayan ölçme birimleriyle ölçer ve karşılaştırır.",
                    "İki nesnenin kütlesini tartarak veya hissederek hangisinin daha ağır olduğunu belirler."
                ]
            },
            "4. Tema: İşlemlerden Cebirsel Düşünmeye": {
                "Konular": [
                    "Toplama İşleminin Anlamı ve Birleştirme",
                    "Çıkarma İşleminin Anlamı ve Fark",
                    "Sıfırın Toplama ve Çıkarmadaki Rolü",
                    "Zihinden Toplama ve Çıkarma Stratejileri",
                    "Matematiksel Eşitlik Kavramı (= İşareti)"
                ],
                "Öğrenim Çıktıları": [
                    "Toplamı 20'ye kadar olan doğal sayılarla toplama işlemi yapar ve modelle açıklar.",
                    "20'ye kadar olan doğal sayılarla çıkarma işlemi yapar ve eksilen, çıkan, fark ilişkisini kavrar.",
                    "Toplama ve çıkarma işlemlerinde sıfırın etkisini açıklar.",
                    "Matematiksel eşitlik ifadesinin her iki tarafındaki dengenin korunduğunu fark eder."
                ]
            },
            "5. Tema: Sayılar ve Nicelikler (3)": {
                "Konular": [
                    "Madenî Paralarımız (Kuruş ve Lira)",
                    "Zamanı Ölçme (Tam ve Yarım Saatler)",
                    "Takvim Okuma (Gün, Hafta, Ay, Mevsim)"
                ],
                "Öğrenim Çıktıları": [
                    "Tedavüldeki madenî paralarımızı tanır ve değer ilişkilerini karşılaştırır.",
                    "Analog ve dijital saatler üzerinde tam ve yarım saatleri okur.",
                    "Takvim üzerinde günleri, haftaları ve ayları takip ederek zaman ilişkilerini açıklar."
                ]
            },
            "6. Tema: Nesnelerin Geometrisi (2)": {
                "Konular": [
                    "Temel Geometrik Şekiller (Üçgen, Kare, Dikdörtgen, Çember)",
                    "Geometrik Şekillerin Köşe ve Kenar Özellikleri",
                    "Günlük Hayattaki Cisimlerin Geometrik Modelleri"
                ],
                "Öğrenim Çıktıları": [
                    "Üçgen, kare, dikdörtgen ve çember modellerini tanır, adlandırır ve çizer.",
                    "Geometrik şekillerin köşe ve kenar sayılarını inceler.",
                    "Çevresindeki nesneleri uygun geometrik şekillerle eşleştirir."
                ]
            },
            "7. Tema: Veriye Dayalı Araştırma": {
                "Konular": [
                    "Basit Veri Toplama ve Sınıflandırma",
                    "Nesne Grafiği Oluşturma ve Yorumlama"
                ],
                "Öğrenim Çıktıları": [
                    "En çok iki veri grubuna ait nesneleri sayarak benzerliklerine göre sınıflandırır.",
                    "Elde ettiği verilerle basit nesne grafiği oluşturur ve grafikten bilgi çıkarır."
                ]
            }
        },
        "Hayat Bilgisi": {
            "1. Öğrenme Alanı: Ben ve Okulum": {
                "Konular": [
                    "Öğretmenim ve Arkadaşlarım",
                    "Sınıf ve Okul Ortamını Tanıma",
                    "Okul Kuralları ve Güvenlik",
                    "Bireysel Özelliklerimiz ve Farklılıklarımız"
                ],
                "Öğrenim Çıktıları": [
                    "Kendini tanıtır, arkadaşlarının duygu ve düşüncelerine saygı duyar.",
                    "Okulun fiziki bölümlerini (müdür odası, kütüphane, tuvalet, bahçe) tanır ve doğru kullanır.",
                    "Sınıf içi ve okul kurallarına uymanın toplumsal yaşamdaki önemini fark eder.",
                    "Okul kaynaklarını ve ders araç gereçlerini tasarruflu kullanır."
                ]
            },
            "2. Öğrenme Alanı: Sağlığım ve Güvenliğim": {
                "Konular": [
                    "Kişisel Bakım ve Temizlik Kuralları",
                    "Sağlıklı ve Dengeli Beslenme",
                    "Okul Yolunda Trafik Güvenliği",
                    "Acil Durumlar ve 112 Acil Çağrı Merkezi"
                ],
                "Öğrenim Çıktıları": [
                    "El yıkama, diş fırçalama gibi kişisel hijyen kurallarını günlük hayatta uygular.",
                    "Sağlıklı büyümek için besin gruplarından dengeli tüketmenin önemini açıklar.",
                    "Okula geliş ve gidişlerde kaldırım kullanımı, yaya geçidi ve trafik ışıklarına uyar.",
                    "Acil durumlarda 112 numarasını gereksiz yere meşgul etmeden arayabileceğini bilir."
                ]
            },
            "3. Öğrenme Alanı: Ailem ve Toplum": {
                "Konular": [
                    "Aile Bireyleri ve Akrabalık İlişkileri",
                    "Evdeki Görev ve Sorumluluklarımız",
                    "Aile İçi Nezaket, Sevgi ve Saygı"
                ],
                "Öğrenim Çıktıları": [
                    "Aile bireylerini tanıtır ve aralarındaki iş bölümünün önemini kavrar.",
                    "Ev içindeki eşyaları düzenli tutma ve basit görevleri yerine getirme sorumluluğu alır.",
                    "Aile üyeleriyle iletişiminde nezaket ifadelerini doğru kullanır."
                ]
            },
            "4. Öğrenme Alanı: Yaşadığım Yer ve Ülkem": {
                "Konular": [
                    "Evimizin Adresi ve Yakın Çevresi",
                    "Bayrağımız ve İstiklal Marşı'mız",
                    "Mustafa Kemal Atatürk'ün Hayatı",
                    "Millî Günlerimiz ve Törenler"
                ],
                "Öğrenim Çıktıları": [
                    "Evinin adresini, anne ve babasının telefon numarasını öğrenir ve acil durumda söyler.",
                    "Türk bayrağına ve İstiklal Marşı'na bağımsızlık sembolleri olarak saygı gösterir.",
                    "Atatürk'ün doğduğu yeri, ailesini ve milletimiz için yaptıklarını açıklar.",
                    "Millî bayram kutlamalarına ve okul törenlerine istekli katılır."
                ]
            },
            "5. Öğrenme Alanı: Doğa ve Çevre": {
                "Konular": [
                    "Çevremizdeki Hayvanlar ve Bitkiler",
                    "Mevsimler ve Hava Olayları",
                    "Çevre Temizliği, Su Tasarrufu ve Geri Dönüşüm"
                ],
                "Öğrenim Çıktıları": [
                    "Çevresindeki hayvan ve bitkilerin yaşam haklarına saygı duyar, onları korur.",
                    "Mevsim şartlarına uygun giyinir ve doğadaki mevsimsel değişiklikleri gözlemler.",
                    "Atıkları uygun geri dönüşüm kutularına atar, suyu ve elektriği israf etmez."
                ]
            },
            "6. Öğrenme Alanı: Bilim, Teknoloji ve Sanat": {
                "Konular": [
                    "Evde ve Okulda Kullanılan Teknolojik Araçlar",
                    "Bilinçli ve Güvenli Ekran Kullanımı",
                    "Oyun, Sanat ve Zanaat Etkinlikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Teknolojik araçların hayatı kolaylaştıran işlevlerini fark eder.",
                    "Tablet, televizyon ve telefon başında geçirilen süreyi dengeler ve dijital güvenliğe uyar.",
                    "Geleneksel çocuk oyunları ve sanatsal etkinliklerle kendini ifade eder."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "Çevremizdeki Doğal ve Yapay Sesler",
                    "İnce-Kalın ve Kuvvetli-Hafif Sesler",
                    "İstiklal Marşı'nı Doğru Dinleme ve Söyleme Kuralları"
                ],
                "Öğrenim Çıktıları": [
                    "Doğadaki canlı ve cansız varlıkların seslerini dinler ve kaynaklarına göre ayırt eder.",
                    "Sesin gürlük ve yükseklik özelliklerini fark ederek basit ses alıştırmaları yapar.",
                    "İstiklal Marşı seslendirilirken uygun duruş sergiler ve saygıyla dinler."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Vücut Perküsyonu ve Ritim Çalgıları",
                    "Düzeye Uygun Çocuk Şarkıları",
                    "Müzik Eşliğinde Hareket ve Oyun"
                ],
                "Öğrenim Çıktıları": [
                    "El çırpma, ayak vurma veya ritim çalgıları ile şarkıların temposuna eşlik eder.",
                    "Öğrendiği çocuk şarkılarını doğru ezgi ve nefes kontrolüyle seslendirir.",
                    "Müziğin ritmine uygun hareketler sergileyerek müzikli oyunlara katılır."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü ve Algı": {
                "Konular": [
                    "Doğadaki Renkler, Çizgiler ve Dokular",
                    "Ana Renkler (Kırmızı, Sarı, Mavi) ve Ara Renklerin Oluşumu",
                    "Sanat Eserlerini İnceleme"
                ],
                "Öğrenim Çıktıları": [
                    "Çevresindeki nesnelerin biçimsel özelliklerini, çizgilerini ve yüzey dokularını inceler.",
                    "Ana renkleri tanır ve boyaları birbirine karıştırarak yeni renkler keşfeder.",
                    "Görsel sanat eserlerindeki renk ve şekil uyumunu sözlü olarak yorumlar."
                ]
            },
            "2. Tema: Sanatsal Tasarım ve Uygulama": {
                "Konular": [
                    "Çizim, Boyama ve Leke Çalışmaları",
                    "Yoğurma Maddeleriyle (Oyun Hamuru, Kil) Üç Boyutlu Şekillendirme",
                    "Yırtma-Yapıştırma ve Kolaj Teknikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı boyama materyallerini (pastel, kuru boya) kullanarak özgün resimler yapar.",
                    "Yoğurma maddeleriyle basit üç boyutlu nesneler tasarlar.",
                    "Sanat araç gereçlerini güvenli, temiz ve düzenli bir şekilde kullanır."
                ]
            }
        },
        "Beden Eğitimi ve Oyun": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Temel Yer Değiştirme Hareketleri (Yürüme, Koşma, Sıçrama)",
                    "Denge ve Koordinasyon Çalışmaları",
                    "Nesne Kontrolü Becerileri (Top Yuvarlama, Atma, Tutma)"
                ],
                "Öğrenim Çıktıları": [
                    "Temel lokomotor hareketleri farklı hız ve zeminlerde kontrollü uygular.",
                    "Denge tahtası ve çizgiler üzerinde vücut dengesini koruyarak hareket eder.",
                    "Nesneleri hedefe doğru yönlendirir, atılan topu iki eliyle yakalar."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Geleneksel Çocuk Oyunları (Mendil Kapmaca, Yağ Satarım Bal Satarım)",
                    "Oyun Kuralları ve Centilmenlik",
                    "Fiziksel Aktivite ve Kişisel Temizlik"
                ],
                "Öğrenim Çıktıları": [
                    "Arkadaşlarıyla grup hâlinde kurallı eğitsel ve geleneksel oyunlar oynar.",
                    "Oyun esnasında sırasını bekler, kazananı tebrik eder ve kurallara uyar.",
                    "Oyun ve hareket sonrasında el-yüz yıkama ve dinlenme alışkanlığı sergiler."
                ]
            }
        },
        "İngilizce": {
            "1. Tema: Words and Greetings": {
                "Konular": [
                    "Basit İngilizce kelimeleri söyler",
                    "'Words and Greetings' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Words and Greetings' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Words and Greetings' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Words and Greetings' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Basit İngilizce kelimeleri söyler.",
                    "'Words and Greetings' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Words and Greetings' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Words and Greetings' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Words and Greetings' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            },
            "2. Tema: Colors and Numbers": {
                "Konular": [
                    "Renkleri ve 1-10 arası sayıları İngilizce sayar",
                    "'Colors and Numbers' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Colors and Numbers' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Colors and Numbers' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Colors and Numbers' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Renkleri ve 1-10 arası sayıları İngilizce sayar.",
                    "'Colors and Numbers' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Colors and Numbers' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Colors and Numbers' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Colors and Numbers' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        }
    },
    "2. Sınıf": {
        "Türkçe": {
            "1. Tema: Değerlerimizle Varız": {
                "Konular": [
                    "Sevgi, Saygı, Dürüstlük ve Yardımseverlik Metinleri",
                    "Şiir ve Düzyazı Ayrımı",
                    "Noktalama İşaretleri (Nokta, Virgül, Soru İşareti)",
                    "Eş Anlamlı Kelimeler"
                ],
                "Öğrenim Çıktıları": [
                    "Okuduğu metindeki temel ahlaki ve insani değerleri belirler ve açıklar.",
                    "Şiir ile düzyazı arasındaki biçimsel farkları ayırt eder.",
                    "Metinlerde nokta, virgül ve soru işaretinin işlevlerini kavrar ve doğru kullanır.",
                    "Anlamdaş (eş anlamlı) sözcükleri bularak cümle içinde kullanır."
                ]
            },
            "2. Tema: Atatürk ve Çocuk": {
                "Konular": [
                    "Atatürk'ün Çocuk Sevgisi ve 23 Nisan",
                    "Metin Başlığı ile İçerik Uyumu",
                    "Görsellerden Hareketle Ana Fikri Tahmin Etme",
                    "Özel İsimlere Gelen Eklerin Kesme İşaretiyle Ayrılması"
                ],
                "Öğrenim Çıktıları": [
                    "Atatürk'ün çocuklara armağan ettiği bayramın önemini metinler üzerinden açıklar.",
                    "Okuduğu metnin konusuna uygun başlıklar önerir.",
                    "Görselleri inceleyerek metnin ana fikri hakkında çıkarımda bulunur.",
                    "Kişi ve yer adlarına gelen ekleri kesme işaretiyle (') doğru ayırır."
                ]
            },
            "3. Tema: Doğada Neler Oluyor?": {
                "Konular": [
                    "Canlılar, Bitkiler ve Mevsim Döngüleri",
                    "Bilgilendirici Metinlerde Sebep-Sonuç İlişkileri",
                    "Zıt Anlamlı Kelimeler",
                    "Gözleme Dayalı Kısa Paragraflar Yazma"
                ],
                "Öğrenim Çıktıları": [
                    "Doğa olaylarını konu alan metinlerde sebep-sonuç ilişkilerini tespit eder.",
                    "Karşıt (zıt) anlamlı kelimeleri metin içinde ayırt eder ve eşleştirir.",
                    "Doğadaki gözlemlerini aktaran kısa ve anlamlı paragraflar yazar.",
                    "Sözlük ve imla kılavuzunu kullanarak kelimelerin doğru yazılışını kontrol eder."
                ]
            },
            "4. Tema: Okuma Serüvenimiz": {
                "Konular": [
                    "Kitap Sevgisi ve Masallar",
                    "Hikâye Unsurları (Olay, Şahıs, Yer, Zaman)",
                    "Akıcı Okuma Kuralları",
                    "Alfabetik Sıralama"
                ],
                "Öğrenim Çıktıları": [
                    "Okuduğu hikâyelerdeki ana olay örgüsünü, yer ve kişileri belirler.",
                    "Noktalama işaretlerine dikkat ederek metinleri akıcı ve sesli okur.",
                    "Kelimeleri ilk harflerine göre alfabetik sıraya dizer.",
                    "Okuduğu kitapları arkadaşlarına tavsiye eden kısa tanıtım yazıları yazar."
                ]
            },
            "5. Tema: Yeteneklerimizi Tanıyoruz": {
                "Konular": [
                    "Kişisel Başarılar, Spor ve Sanat",
                    "Nezaket Kurallarına Uygun Sözlü Sunum",
                    "Olayların Oluş Sırasına Göre Dizimi (Önce, Sonra, Daha Sonra)",
                    "Konuşurken Beden Dilini Kullanma"
                ],
                "Öğrenim Çıktıları": [
                    "Kendi yetenek ve ilgi alanlarını tanıtan kısa bir konuşma yapar.",
                    "Metinlerdeki olayları oluş sırasını belirten kelimelerle kronolojik olarak sıralar.",
                    "Dinleme ve konuşma sürecinde göz teması kurar ve nezaket kurallarına uyar.",
                    "Yazılarında hece bölünmelerinde kısa çizgi (-) işaretini doğru kullanır."
                ]
            },
            "6. Tema: Mucit Çocuk": {
                "Konular": [
                    "Hayal Gücü ve Yaratıcı Fikirler",
                    "Basit İcatlar ve Bilim İnsanları",
                    "Metin İçi Soru Cümleleri",
                    "Tasarım ve Problem Çözme Fikirleri Yazma"
                ],
                "Öğrenim Çıktıları": [
                    "Bilim ve teknik temalı metinlerdeki yeni kavramları çözümler.",
                    "Karşılaştığı bir probleme yönelik hayal gücünü kullanarak özgün çözüm üretir ve yazar.",
                    "Soru eki olan 'mı, mi, mu, mü' eklerinin ayrı yazıldığını fark eder ve doğru uygular.",
                    "Metindeki açık ve örtük iletileri ayırt eder."
                ]
            },
            "7. Tema: Kültür Hazinemiz": {
                "Konular": [
                    "Nasreddin Hoca Fıkraları, Maniler ve Atasözleri",
                    "Millî Kültür Unsurlarımız ve Bayramlarımız",
                    "Deyimlerin Anlamını Kavrama",
                    "Konuşma Çizgisi ve Tırnak İşareti"
                ],
                "Öğrenim Çıktıları": [
                    "Fıkra, mani ve atasözlerindeki kültürel incelikleri kavrar ve yorumlar.",
                    "Günlük konuşmalarda sıkça kullanılan deyimlerin anlamlarını metin bağlamında açıklar.",
                    "Karşılıklı konuşmalarda konuşma çizgisinin (uzun çizgi) kullanımını uygular.",
                    "Geleneksel bayram ve törenlerin millet hayatındaki yerini kavrar."
                ]
            },
            "8. Tema: Haklarımızı Biliyoruz": {
                "Konular": [
                    "Çocuk Hakları ve Birlikte Yaşama Kuralları",
                    "Toplumsal Sorumluluk ve Adalet",
                    "Kurallı Cümle Yapısı",
                    "Ünlem İşaretinin Kullanım Alanları"
                ],
                "Öğrenim Çıktıları": [
                    "Çocuk olarak sahip olduğu temel hakları (eğitim, oyun, sağlık) metinler üzerinden açıklar.",
                    "Kurallı ve devrik cümleleri ayırt eder, yazılarında yüklemi sonda olan kurallı cümleler kurar.",
                    "Korku, sevinç, şaşkınlık ve hitap bildiren ifadelerden sonra ünlem işareti kullanır.",
                    "Kendi duygu ve düşüncelerini içeren serbest düşünce yazıları yazar."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Sayılar ve Nicelikler (1)": {
                "Konular": [
                    "100'e Kadar Doğal Sayıları Okuma ve Yazma",
                    "Onluk ve Birlikler, Basamak Değerleri",
                    "Deste ve Düzine Kavramları",
                    "İleriye ve Geriye İkişer, Üçer, Dörder, Beşer, Onar Ritmik Sayma",
                    "Sayı Doğrusu ve Sayıları Karşılaştırma",
                    "Sayı Örüntüleri ve Tahmin"
                ],
                "Öğrenim Çıktıları": [
                    "İki basamaklı doğal sayıların basamak adlarını ve basamak değerlerini açıklar.",
                    "Nesne gruplarını deste ve düzine olarak gruplandırır.",
                    "Belirtilen adımlarla ileriye ve geriye ritmik saymalar yapar.",
                    "Sayıları büyükten küçüğe veya küçükten büyüğe sıralar, sembol (<, >) kullanır.",
                    "Kuralı verilen sayı örüntülerindeki eksik sayıları tamamlar."
                ]
            },
            "2. Tema: Sayılar ve Nicelikler (2)": {
                "Konular": [
                    "Bütün, Yarım ve Çeyrek Kesirleri",
                    "Paralarımız (Lira ve Kuruş İlişkisi)",
                    "Zamanı Ölçme (Çeyrek Geçe, Çeyrek Kala, Buçuk)",
                    "Zaman Birimleri (Gün, Hafta, Ay, Mevsim, Yıl)",
                    "Standart Uzunluk (Metre, Santimetre) ve Kütle (Kilogram) Ölçme"
                ],
                "Öğrenim Çıktıları": [
                    "Bütün, yarım ve çeyrek arasındaki matematiksel ilişkiyi modeller üzerinde gösterir.",
                    "Madenî ve kâğıt paralarımızı tanır, basit alışveriş problemlerini çözer.",
                    "Analog ve dijital saatlerde çeyrek geçe ve çeyrek kala durumlarını doğru okur.",
                    "Uzunlukları standart ölçme araçlarıyla (metre, cetvel) ölçer ve tahmin eder.",
                    "Nesnelerin kütlesini kilogram birimiyle ifade eder ve karşılaştırır."
                ]
            },
            "3. Tema: İşlemlerden Cebirsel Düşünmeye": {
                "Konular": [
                    "İki Basamaklı Sayılarla Eldeli ve Eldesiz Toplama",
                    "Onluk Bozarak ve Bozmadan Çıkarma İşlemi",
                    "Toplama ve Çıkarma İşlemlerinin Sonucunu Tahmin Etme",
                    "Çarpma İşleminin Mantığı (Tekrarlı Toplama) ve Çarpım Tablosu (1-5)",
                    "Bölme İşleminin Anlamı (Eşit Paylaştırma ve Gruplama)",
                    "Dört İşlem Problemleri ve Verilmeyen Terimi Bulma"
                ],
                "Öğrenim Çıktıları": [
                    "100'e kadar olan sayılarla eldeli toplama ve onluk bozmalı çıkarma işlemlerini yapar.",
                    "İşlem sonuçlarını tahmin eder ve tahminini gerçek sonuçla karşılaştırır.",
                    "Çarpma işleminin tekrarlı toplama olduğunu kavrayarak 1, 2, 3, 4 ve 5 ile çarpar.",
                    "Bölme işlemini ardışık çıkarma ve paylaştırma modelleriyle çözer.",
                    "Eşitliklerde verilmeyen toplananı veya eksileni bulur."
                ]
            },
            "4. Tema: Nesnelerin Geometrisi (1)": {
                "Konular": [
                    "Geometrik Cisimler (Küp, Kare Prizma, Dikdörtgen Prizma, Silindir, Koni, Küre)",
                    "Geometrik Cisimlerin Yüzey Özellikleri",
                    "Standart Olmayan Birimlerle Sıvı Ölçme ve Karşılaştırma"
                ],
                "Öğrenim Çıktıları": [
                    "Geometrik cisim modellerini adlandırır, köşe ve yüzeylerini inceler.",
                    "Geometrik cisimlerin yüzeylerini kullanarak kâğıt üzerine geometrik şekiller çıkarır.",
                    "Kapların sıvı alma kapasitelerini standart olmayan birimlerle ölçer ve karşılaştırır."
                ]
            },
            "5. Tema: Nesnelerin Geometrisi (2)": {
                "Konular": [
                    "Doğru Parçası, Yatay, Dikey ve Eğik Çizgiler",
                    "Şekillerde Simetri Doğrusu ve Katlama",
                    "Geometrik Şekil Örüntüleri"
                ],
                "Öğrenim Çıktıları": [
                    "Yatay, dikey ve eğik çizgi modellerini tanır ve cetvelle çizer.",
                    "Geometrik şekillerin ve nesnelerin dikey simetri eksenini katlama yöntemiyle keşfeder.",
                    "Geometrik şekillerden oluşan örüntülerin kuralını açıklar ve sürdürür."
                ]
            },
            "6. Tema: Veriye Dayalı Araştırma": {
                "Konular": [
                    "Basit Araştırma Soruları Sorma",
                    "Çetele ve Sıklık Tablosu Oluşturma",
                    "Nesne ve Şekil Grafiğini Okuma"
                ],
                "Öğrenim Çıktıları": [
                    "Sınıf içi bir araştırma konusu belirleyerek veri toplar.",
                    "Topladığı verileri çetele ve sıklık tablolarına dönüştürür.",
                    "Şekil ve nesne grafiklerini inceleyerek en çok, en az gibi çıkarımlarda bulunur."
                ]
            }
        },
        "Hayat Bilgisi": {
            "1. Öğrenme Alanı: Ben ve Okulum": {
                "Konular": [
                    "Sınıfımızın ve Okulumuzun İhtiyaçları",
                    "Arkadaşlık İlişkilerinde Saygı, Adalet ve Paylaşım",
                    "Okul Kaynaklarını Tasarruflu ve Özenli Kullanma",
                    "Sınıf Kurallarını Birlikte Belirleme"
                ],
                "Öğrenim Çıktıları": [
                    "Okul ve sınıf ihtiyaçlarının karşılanmasında sorumluluk üstlenir.",
                    "Arkadaşlarıyla iletişiminde adil, saygılı ve dürüst davranışlar sergiler.",
                    "Okuldaki su, elektrik ve eğitim materyallerini israf etmeden kullanır.",
                    "Birlikte yaşama kurallarının oluşturulmasına katkıda bulunur."
                ]
            },
            "2. Öğrenme Alanı: Sağlığım ve Güvenliğim": {
                "Konular": [
                    "Kişisel Bakım, El ve Vücut Hijyeni",
                    "Mevsimine Uygun ve Dengeli Beslenme",
                    "Evde, Okulda ve Parkta Güvenlik Kuralları",
                    "Trafikte Güvenli Yolculuk ve Acil Durumlar"
                ],
                "Öğrenim Çıktıları": [
                    "Sağlığını korumak için kişisel bakım ve temizlik kurallarını düzenli uygular.",
                    "Taze ve mevsimine uygun gıdalarla beslenmenin önemini kavrar.",
                    "Elektrik prizleri, kesici aletler ve merdivenlerde güvenlik kurallarına uyar.",
                    "Trafikte yaya ve yolcu olarak emniyet kemeri kullanımı gibi kurallara riayet eder."
                ]
            },
            "3. Öğrenme Alanı: Ailem ve Toplum": {
                "Konular": [
                    "Aile İçi Karar Alma Süreçleri ve Fikir Paylaşımı",
                    "Akrabalık ve Komşuluk İlişkilerinde Nezaket",
                    "Ev İçi Görev ve Sorumlulukların Paylaşımı"
                ],
                "Öğrenim Çıktıları": [
                    "Aile toplantılarında ve karar süreçlerinde kendi düşüncelerini nezaketle ifade eder.",
                    "Akrabalarına ve komşularına karşı saygılı ve yardımsever tutum sergiler.",
                    "Evdeki sorumlulukları aksatmadan yerine getirerek aile dayanışmasına katkıda bulunur."
                ]
            },
            "4. Öğrenme Alanı: Yaşadığım Yer ve Ülkem": {
                "Konular": [
                    "Yaşadığımız Yerleşim Birimi (Köy, Mahalle, İlçe, İl)",
                    "Kroki Çizimine Giriş ve Yönler",
                    "Tarihî Mekânlarımız ve Kültürel Zenginliklerimiz",
                    "Atatürk'ün Kişilik Özellikleri ve Başarıları"
                ],
                "Öğrenim Çıktıları": [
                    "Yaşadığı yerin yerel özelliklerini, yöneticilerini ve doğal güzelliklerini tanır.",
                    "Ev ve okul çevresini gösteren basit krokiler çizer ve okur.",
                    "Tarihî ve turistik değerlerimizi koruma bilinci sergiler.",
                    "Mustafa Kemal Atatürk'ün vatanseverlik ve çalışkanlık gibi kişilik özelliklerini kavrar."
                ]
            },
            "5. Öğrenme Alanı: Doğa ve Çevre": {
                "Konular": [
                    "Bitki ve Hayvanların Yaşam Koşulları",
                    "Geri Dönüşümün Doğaya Katkısı",
                    "Doğal Afetler (Deprem, Sel, Yangın) ve Alınacak Önlemler"
                ],
                "Öğrenim Çıktıları": [
                    "Canlıların büyümesi için su, hava, güneş ve toprağın gerekliliğini açıklar.",
                    "Çevreyi temiz tutar ve geri dönüştürülebilir atıkları ayrıştırır.",
                    "Doğal afetler sırasında sergilenmesi gereken güvenli davranışları (çök-kapan-tutun) öğrenir."
                ]
            },
            "6. Öğrenme Alanı: Bilim, Teknoloji ve Sanat": {
                "Konular": [
                    "Teknolojik Ürünlerin Güvenli ve Bilinçli Kullanımı",
                    "Dijital Güvenlik ve Zaman Sınırı",
                    "Geleneksel Sanat ve El Sanatları Örnekleri"
                ],
                "Öğrenim Çıktıları": [
                    "Teknolojik cihazları göz ve beden sağlığını koruyacak mesafede ve sürede kullanır.",
                    "İnternet ortamında yabancılarla bilgi paylaşılmaması gerektiğini kavrar.",
                    "Kültürümüzün zenginliğini yansıtan el sanatlarını (dokuma, çömlekçilik vb.) tanır."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: School Life": {
                "Konular": [
                    "Greetings and Introductions (Hello, Hi, Good morning, How are you?)",
                    "School Supplies (pencil, notebook, eraser, school bag)",
                    "Days of the Week",
                    "School Routines"
                ],
                "Öğrenim Çıktıları": [
                    "Responds to basic greeting and leave-taking expressions accurately.",
                    "Identifies and names everyday school objects correctly.",
                    "Names the days of the week in chronological order.",
                    "Follows simple teacher instructions within the school context."
                ]
            },
            "Theme 2: Classroom Life": {
                "Konular": [
                    "Classroom Commands (Stand up, Sit down, Open your book, Be quiet)",
                    "Numbers 1-20",
                    "Colors (red, blue, yellow, green, orange, purple, pink)",
                    "Asking for Permission (May I... ?)"
                ],
                "Öğrenim Çıktıları": [
                    "Understands and acts upon basic verbal commands in the classroom.",
                    "Counts classroom objects from 1 to 20.",
                    "Identifies and states the colors of various classroom items.",
                    "Asks for permission politely using simple phrases."
                ]
            },
            "Theme 3: Personal Life": {
                "Konular": [
                    "Feelings and Emotions (happy, sad, angry, tired, hungry)",
                    "Body Parts (head, shoulders, knees, toes, eyes, ears)",
                    "Expressing Physical States"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies and expresses basic feelings and physical conditions.",
                    "Points to and names major parts of the human body.",
                    "Responds to simple questions about how they feel."
                ]
            },
            "Theme 4: Family Life": {
                "Konular": [
                    "Family Members (mother, father, brother, sister, grandfather, grandmother)",
                    "Introducing Family Members (This is my...)",
                    "Age and Personal Information"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies family members in photos and illustrations.",
                    "Introduces family members using short and simple structures.",
                    "States their age and asks someone else's age politely."
                ]
            },
            "Theme 5: Homes & Houses & Neighbourhoods": {
                "Konular": [
                    "Rooms in a House (living room, bedroom, kitchen, bathroom)",
                    "Basic Furniture (table, chair, bed, sofa)",
                    "Places in the Neighbourhood (park, school, market)"
                ],
                "Öğrenim Çıktıları": [
                    "Names the main rooms and everyday furniture of a house.",
                    "Recognizes familiar places in their immediate neighborhood.",
                    "Identifies where people and objects are located in a room."
                ]
            },
            "Theme 6: Life in the City & the World": {
                "Konular": [
                    "Common Animals (dog, cat, bird, horse, cow, fish)",
                    "Modes of Transport (car, bus, bike, train, plane)",
                    "Expressing Likes and Dislikes (I like / I don't like)"
                ],
                "Öğrenim Çıktıları": [
                    "Names domestic, farm, and wild animals correctly.",
                    "Identifies common vehicles used in city transportation.",
                    "Expresses simple preferences regarding animals and everyday foods."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "İnsan, Doğa ve Çalgı Sesleri",
                    "Ritim Kalıpları ve Vuruşlar",
                    "Şarkılarda Hız ve Gürlük Değişimleri (Hızlı-Yavaş, Kuvvetli-Hafif)"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı ses kaynaklarını dinleyerek ayırt eder ve özelliklerini betimler.",
                    "İki ve üç vuruşlu basit ritim kalıplarını vücut hareketleriyle uygular.",
                    "Şarkılardaki tempo ve ses seviyesi değişimlerini fark ederek eşlik eder."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Şarkı Söylerken Duruş, Nefes ve Diksiyon",
                    "Ritim Çalgılarıyla Şarkılara Eşlik",
                    "Millî ve Kültürel Ezgiler, Marşlar"
                ],
                "Öğrenim Çıktıları": [
                    "Çocuk şarkılarını ve okul marşlarını anlaşılır bir diksiyonla seslendirir.",
                    "Ritim çalgılarını (zil, tef, marakas, ritim çubuğu) doğru teknikle çalar.",
                    "Öğrendiği ezgilerle ilgili özgün ritmik ve melodik fikirler üretir."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü": {
                "Konular": [
                    "Görsel Sanat Yapıtlarında Renk ve Denge",
                    "Geleneksel El Sanatlarımız (Ebru, Halı Dokuma, Çini)",
                    "Müze ve Sanat Galerisi Kültürü"
                ],
                "Öğrenim Çıktıları": [
                    "Sanat eserlerindeki ana ve ara renklerin kullanım biçimlerini inceler.",
                    "Kültürel mirasımıza ait geleneksel Türk el sanatlarını tanır.",
                    "Müze ve sergilerde eserleri saygıyla inceleme bilinci sergiler."
                ]
            },
            "2. Tema: Sanatsal Tasarım": {
                "Konular": [
                    "Gözleme ve Hayale Dayalı Resim Çalışmaları",
                    "Farklı Dokulu ve Geri Dönüşümlü Malzemelerle Tasarım",
                    "Üç Boyutlu Şekillendirme ve Maket Yapımı"
                ],
                "Öğrenim Çıktıları": [
                    "Gözlemlerini ve hayal gücünü yansıtan özgün sanatsal kompozisyonlar üretir.",
                    "Atık malzemeleri kullanarak estetik ve işlevsel üç boyutlu tasarımlar yapar.",
                    "Sanat çalışmalarını sergiler ve arkadaşlarıyla paylaşır."
                ]
            }
        },
        "Beden Eğitimi ve Oyun": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Kombine Hareket Becerileri (Sekme, Kayma, Tırmanma, Dönme)",
                    "Denge ve Vücut Farkındalığı",
                    "Top Kontrolü ve Paslaşma Becerileri"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı yön, düzey ve alanlarda birden fazla lokomotor hareketi art arda uygular.",
                    "Denge tahtasında ve jimnastik minderinde vücut kontrolünü sağlar.",
                    "Küçük ve büyük topları arkadaşına pas verir ve kontrollü yakalar."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Eğitsel ve Geleneksel Takım Oyunları",
                    "Spor Ahlakı ve Centilmenlik (Fair-Play)",
                    "Düzenli Egzersiz ve Duruş (Postür) Sağlığı"
                ],
                "Öğrenim Çıktıları": [
                    "Takım oyunlarında kurallara riayet eder ve arkadaşlarıyla iş birliği içinde çalışır.",
                    "Yarışmalarda galibiyeti ve mağlubiyeti hoşgörüyle karşılar.",
                    "Doğru oturma, yürüme ve yük taşıma duruşunun omurga sağlığı için önemini kavrar."
                ]
            }
        }
    },
    "3. Sınıf": {
        "Türkçe": {
            "1. Tema: Değerlerimizle Yaşıyoruz": {
                "Konular": [
                    "Sevgi, Saygı, Adalet ve Vefa Temalı Metinler",
                    "Metnin Ana Fikri ve Yardımcı Fikirleri",
                    "Noktalama İşaretleri (İki Nokta, Tırnak İşareti, Kesme İşareti)",
                    "Eş Anlamlı ve Zıt Anlamlı Kelimeler"
                ],
                "Öğrenim Çıktıları": [
                    "Okuduğu metnin konusunu, ana fikrini ve yardımcı fikirlerini açıkça tespit eder.",
                    "Metinlerdeki temel insani değerleri kendi yaşantısındaki durumlarla ilişkilendirir.",
                    "Yazılarında iki nokta, tırnak işareti ve kesme işaretini yerinde kullanır.",
                    "Kelimelerin eş ve zıt anlamlılarını metin bağlamında doğru belirler."
                ]
            },
            "2. Tema: Atatürk ve Kahramanlarımız": {
                "Konular": [
                    "Millî Mücadele Destanları ve Kahramanları",
                    "Atatürk'ün İlkeleri ve İnkılapları",
                    "Kahramanlık Şiirlerinde Ana Duygu ve Ahenk",
                    "Özet Çıkarma Teknikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Millî Mücadele kahramanlarının fedakârlıklarını anlatan metinleri kavrar.",
                    "Şiirlerdeki ritmi, ahengi ve şairin aktarmak istediği ana duyguyu belirler.",
                    "Okuduğu metni ana hatlarıyla ve kendi cümleleriyle özetler.",
                    "Atatürk'ün bilim, sanat ve eğitime verdiği önemi yansıtan konuşmalar yapar."
                ]
            },
            "3. Tema: Doğayı Tanıyoruz": {
                "Konular": [
                    "Ekosistemler, Canlı Türleri ve Çevre Bilinci",
                    "Bilgilendirici Metinlerde Bilgiye Ulaşma",
                    "İsimler (Adlar) ve Varlıkların Nitelikleri (Sıfatlar)",
                    "Sebep-Sonuç Cümleleri"
                ],
                "Öğrenim Çıktıları": [
                    "Doğa ve çevre temalı bilgilendirici metinlerden çıkarımlar yapar.",
                    "Metin içinde varlıkları karşılayan isimleri ve varlıkların özelliklerini belirten sıfatları fark eder.",
                    "Cümleler arasındaki sebep-sonuç ilişkilerini çözümler ve kurar.",
                    "Doğal kaynakların korunmasına yönelik bilinçli düşünce yazıları kaleme alır."
                ]
            },
            "4. Tema: Bilgi Hazinemiz": {
                "Konular": [
                    "Kitap Türleri (Öykü, Masal, Şiir, Biyografi)",
                    "Kütüphane Kullanımı ve Kaynak Tarama",
                    "Metinle İlgili Sorular Sorma ve Cevaplama",
                    "Paragraf Yapısı (Giriş, Gelişme, Sonuç)"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı edebi türlerdeki metinleri karşılaştırarak özelliklerini belirler.",
                    "Bilgi edinmek için sözlük, ansiklopedi ve kütüphane kaynaklarından faydalanır.",
                    "Metinle ilgili '5N1K' (Ne, Nerede, Ne zaman, Nasıl, Neden, Kim) sorularını cevaplar.",
                    "Giriş, gelişme ve sonuç bölümlerine dikkat ederek kurallı paragraflar yazar."
                ]
            },
            "5. Tema: Yeteneklerimizi Kullanıyoruz": {
                "Konular": [
                    "Başarı Öyküleri, Spor ve Sanat Tutkusu",
                    "Planlı ve Disiplinli Çalışmanın Önemi",
                    "Eylem Bildiren Kelimeler (Fiiller)",
                    "Düşüncelerini Topluluk Önünde İfade Etme"
                ],
                "Öğrenim Çıktıları": [
                    "Bireysel yeteneklerin gelişiminde planlı çalışmanın rolünü kavrar.",
                    "Cümledeki iş, oluş ve hareket bildiren kelimeleri (fiilleri) ayırt eder.",
                    "Topluluk önünde konuşurken ses tonunu, vurguyu ve beden dilini etkili kullanır.",
                    "Kendisine veya çevresine ait başarı deneyimlerini anlatan yazılar yazar."
                ]
            },
            "6. Tema: Bilim Yolculuğu": {
                "Konular": [
                    "Buluşlar, Mucitler ve Bilimsel Araştırma",
                    "Teknolojik Gelişmeler ve Gelecek",
                    "Amaç-Sonuç Cümleleri",
                    "Yazım Kuralları (Büyük Harfler, Birleşik Kelimeler)"
                ],
                "Öğrenim Çıktıları": [
                    "Bilim insanlarının araştırma yöntemlerini ve merak duygusunu inceler.",
                    "Metinlerdeki amaç-sonuç ilişkilerini doğru tespit eder.",
                    "Kurum adlarının, bayram isimlerinin ve özel günlerin yazımında imla kurallarına uyar.",
                    "Teknolojinin olumlu ve olumsuz yönlerini tartışan kısa metinler oluşturur."
                ]
            },
            "7. Tema: Millî Kültürümüz": {
                "Konular": [
                    "Geleneksel Sanatlarımız, Halk Oyunlarımız ve Destanlar",
                    "Atasözleri ve Deyimlerin Anlam Zenginliği",
                    "Karşılaştırma Cümleleri",
                    "Kültürel Mirasın Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "Kültürümüzü yansıtan efsane, destan ve halk hikâyelerini anlamlandırır.",
                    "Metinlerde geçen atasözleri ve deyimleri anlamına uygun yerlerde kullanır.",
                    "Varlıklar ve durumlar arasındaki benzerlik ve farklılıkları belirten karşılaştırmalar yapar.",
                    "Millî kültür ögelerimizin yaşatılması gerektiğine dair fikirlerini savunur."
                ]
            },
            "8. Tema: Hak ve Sorumluluklarımız": {
                "Konular": [
                    "Bireysel, Ailevi ve Toplumsal Sorumluluklar",
                    "Demokrasi Bilinci ve Adalet",
                    "Noktalama İşaretlerinin Toplu Uygulaması",
                    "İkna Edici ve Bilgilendirici Yazılar Yazma"
                ],
                "Öğrenim Çıktıları": [
                    "Hak ve özgürlüklerin sınırlarını, başkalarının haklarına saygı çerçevesinde açıklar.",
                    "Yazılarında tüm noktalama işaretlerini kurallarına uygun olarak eksiksiz kullanır.",
                    "Fikirlerini kanıtlarla destekleyerek ikna edici konuşmalar ve yazılar hazırlar.",
                    "Okul meclisi ve sınıf içi demokratik süreçlere katılım sağlar."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Sayılar ve Nicelikler (1)": {
                "Konular": [
                    "Üç Basamaklı Doğal Sayılar (Okuma, Yazma, Basamak ve Sayı Değeri)",
                    "Sayıları En Yakın Onluğa ve Yüzlüğe Yuvarlama",
                    "Tek ve Çift Doğal Sayılar",
                    "Romen Rakamları (I-XX)",
                    "İleriye ve Geriye Altışar, Yedişer, Sekizer, Dokuzar Ritmik Sayma",
                    "Sayı ve Şekil Örüntüleri, Çokluklarda Tahmin"
                ],
                "Öğrenim Çıktıları": [
                    "Üç basamaklı doğal sayıları çözümler ve basamak değerlerini açıklar.",
                    "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
                    "Tek ve çift doğal sayıları ayırt eder ve toplama-çıkarma sonuçlarıyla ilişkilendirir.",
                    "20'ye kadar olan Romen rakamlarını okur ve yazar.",
                    "Kuralı verilen sayı ve şekil örüntülerinin adımlarını eksiksiz sürdürür."
                ]
            },
            "2. Tema: Sayılar ve Nicelikler (2)": {
                "Konular": [
                    "Kesirler (Birim Kesir, Basit Kesir, Pay ve Payda İlişkisi)",
                    "Paralarımız (Lira ve Kuruş Dönüşümleri)",
                    "Zamanı Ölçme (Saat, Dakika, Saniye İlişkisi, Takvim Problemleri)",
                    "Standart Uzunluk (m, cm, km) ve Kütle (g, kg, ton) Ölçüleri"
                ],
                "Öğrenim Çıktıları": [
                    "Birim kesirleri ve basit kesirleri modellerle gösterir, pay ve payda ilişkisini açıklar.",
                    "Lira ve kuruş arasındaki matematiksel dönüşümleri yapar ve alışveriş problemlerini çözer.",
                    "Zaman birimleri (saat, dakika, saniye) arasında dönüşüm yaparak süre hesaplar.",
                    "Metre, santimetre ve kilometre ile gram, kilogram ve ton birimlerini yerinde kullanır."
                ]
            },
            "3. Tema: İşlemlerden Cebirsel Düşünmeye": {
                "Konular": [
                    "Üç Basamaklı Sayılarla Eldeli Toplama ve Onluk Bozmalı Çıkarma",
                    "Toplama ve Çıkarma İşlemlerinde Tahmin ve Zihinden İşlemler",
                    "İki ve Üç Basamaklı Sayılarla Çarpma İşlemi",
                    "İki Basamaklı Sayıyı Bir Basamaklı Sayıya Bölme (Kalanlı ve Kalansız)",
                    "Dört İşlem Problemleri ve Eşitlik Durumları"
                ],
                "Öğrenim Çıktıları": [
                    "En çok üç basamaklı doğal sayılarla toplama ve çıkarma işlemlerini akıcı biçimde yapar.",
                    "İki basamaklı sayılarla çarpma işlemlerini yapar, 10 ve 100 ile kısa yoldan çarpar.",
                    "Kalanlı ve kalansız bölme işlemlerinde bölen, bölünen, bölüm ve kalan ilişkisini kavrar.",
                    "Dört işlem adımlarını içeren çok adımlı günlük hayat problemlerini çözer ve kurar."
                ]
            },
            "4. Tema: Nesnelerin Geometrisi (1)": {
                "Konular": [
                    "Geometrik Cisimlerin Köşe, Yüz ve Ayrıt Özellikleri",
                    "Çokgenler (Üçgen, Dörtgen, Beşgen, Altıgen, Sekizgen)",
                    "Çevre Uzunluğu Hesaplama ve Tahmin Etme",
                    "Sıvı Ölçme (Litre ve Yarım Litre İlişkisi)"
                ],
                "Öğrenim Çıktıları": [
                    "Geometrik cisimlerin köşe, yüz ve ayrıt sayılarını belirler.",
                    "Geometrik şekilleri kenar sayılarına göre sınıflandırır ve isimlendirir.",
                    "Kare, dikdörtgen ve üçgenin çevre uzunluklarını standart birimlerle hesaplar.",
                    "Litre ve yarım litre birimlerini kullanarak sıvı ölçme problemleri çözer."
                ]
            },
            "5. Tema: Nesnelerin Geometrisi (2)": {
                "Konular": [
                    "Nokta, Doğru, Işın, Doğru Parçası ve Açı Kavramları",
                    "Şekillerde Simetri Doğrusu ve Simetrik Şekli Tamamlama",
                    "Geometrik Çizimler ve Kodlama Mantığı"
                ],
                "Öğrenim Çıktıları": [
                    "Nokta, doğru, ışın ve doğru parçası modellerini çizer ve sembolle gösterir.",
                    "Açının kollarını ve köşesini belirler, dik açıyı referans alarak açıları inceler.",
                    "Düzlemsel şekillerin birden fazla simetri doğrusunu bulur ve simetrik parçayı çizer."
                ]
            },
            "6. Tema: Veriye Dayalı Araştırma": {
                "Konular": [
                    "İstatistiksel Veri Toplama Süreci",
                    "Çetele ve Sıklık Tablosu",
                    "Nesne ve Şekil Grafiğini Sütun Grafiğine Dönüştürme",
                    "Grafik Verilerini Yorumlama"
                ],
                "Öğrenim Çıktıları": [
                    "Bir araştırma sorusuna yönelik verileri anket veya gözlemle toplar.",
                    "Toplanan verileri sıklık tablosuna ve yatay/dikey sütun grafiklerine aktarır.",
                    "Grafiklerden elde edilen bilgileri analiz ederek tahmin ve yorumlarda bulunur."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Ünite: Bilimsel Keşif Yolculuğu": {
                "Konular": [
                    "Bilim İnsanlarının Ortak Özellikleri (Merak, Gözlem, Sabır)",
                    "Bilimsel Süreç Becerileri (Gözlem, Ölçme, Veri Kaydetme)",
                    "Basit Bilimsel Deneylerin Aşamaları"
                ],
                "Öğrenim Çıktıları": [
                    "Bilim insanlarının meraklı ve sorgulayıcı tutumlarını örnek olaylarla inceler.",
                    "Gözlem ve ölçüm yaparak elde ettiği verileri tablo veya şemalarla kaydeder.",
                    "Deney sürecinde güvenlik kurallarına ve yönergelere titizlikle uyar."
                ]
            },
            "2. Ünite: Canlılar Dünyasına Yolculuk": {
                "Konular": [
                    "Duyu Organlarımız (Göz, Kulak, Burun, Dil, Deri) ve Görevleri",
                    "Duyu Organlarının Sağlığını Koruma Yolları",
                    "Canlıların Ortak Özellikleri (Beslenme, Solunum, Hareket, Büyüme, Çoğalma)"
                ],
                "Öğrenim Çıktıları": [
                    "Duyu organlarının yapılarını ve çevreyi algılamadaki görevlerini modellerle açıklar.",
                    "Duyu organlarının sağlığı için alınması gereken tedbirleri açıklar.",
                    "Canlı ve cansız varlıklar arasındaki temel farkları canlılık özellikleri üzerinden ayırt eder."
                ]
            },
            "3. Ünite: Yer Bilimciler İş Başında": {
                "Konular": [
                    "Dünya'mızın Katmanları (Hava, Su, Kara, Magma, Çekirdek)",
                    "Kayaçlar, Madenler, Mineraller ve Toprak Oluşumu",
                    "Fosil Oluşumu ve Paleontoloji"
                ],
                "Öğrenim Çıktıları": [
                    "Dünya'nın şeklini ve içten dışa doğru katmanlarını şemalar üzerinde gösterir.",
                    "Kayaçların ufalanmasıyla toprağın oluştuğunu ve ekonomik değere sahip olanların maden olduğunu kavrar.",
                    "Fosillerin oluşum süreçlerini ve geçmiş yaşam hakkında bilgi verdiğini açıklar."
                ]
            },
            "4. Ünite: Maddeyi Tanıyalım, Karıştırıp Ayıralım": {
                "Konular": [
                    "Maddenin Duyu Organlarıyla Algılanan Özellikleri (Sertlik, Esneklik, Kırılganlık)",
                    "Maddenin Halleri (Katı, Sıvı, Gaz)",
                    "Saf Madde ve Karışım Ayrımı",
                    "Karışımları Ayırma Yöntemleri (Eleme, Süzme, Mıknatısla Ayırma)"
                ],
                "Öğrenim Çıktıları": [
                    "Maddeleri sertlik, esneklik, kırılganlık, koku ve tat gibi niteliklerine göre sınıflandırır.",
                    "Maddenin katı, sıvı ve gaz hâllerine günlük yaşamdan örnekler verir.",
                    "Saf madde ile karışımları karşılaştırır, günlük hayattaki karışımları uygun yöntemle ayırır."
                ]
            },
            "5. Ünite: Hareketi Keşfediyorum": {
                "Konular": [
                    "Varlıkların Hareket Türleri (Hızlanma, Yavaşlama, Dönme, Sallanma, Yön Değiştirme)",
                    "İtme ve Çekme Kuvveti",
                    "Kuvvetin Cisimlerin Hareketi ve Şekli Üzerindeki Etkileri"
                ],
                "Öğrenim Çıktıları": [
                    "Hareket eden cisimlerin hızlanma, yavaşlama ve dönme hareketlerini gözlemleyerek ayırt eder.",
                    "İtme ve çekmenin birer kuvvet olduğunu ve cisimleri harekete geçirebileceğini açıklar.",
                    "Kuvvetin cisimler üzerindeki yavaşlatıcı, durdurucu ve şekil değiştirici etkilerini deneyle gösterir."
                ]
            },
            "6. Ünite: Yaşamımızı Kolaylaştıran Elektrik": {
                "Konular": [
                    "Elektrikli Araç-Gereçler ve Kullanım Amaçları (Isınma, Aydınlatma, Hareket)",
                    "Elektrik Kaynakları (Şehir Elektriği, Pil, Akü, Batarya)",
                    "Elektriğin Güvenli ve Tasarruflu Kullanımı"
                ],
                "Öğrenim Çıktıları": [
                    "Elektrikli aletleri kullanım amaçlarına göre doğru gruplandırır.",
                    "Farklı elektrik kaynaklarını tanır ve cihazların hangi kaynakla çalıştığını eşleştirir.",
                    "Elektrik çarpmasına karşı alınacak güvenlik önlemlerini ve tasarruf yollarını açıklar."
                ]
            },
            "7. Ünite: Toprağı Tanıyorum, Tarımı Keşfediyorum": {
                "Konular": [
                    "Toprağın Yapısı ve Canlılar İçin Önemi",
                    "Tohumun Çimlenme Koşulları ve Bitki Gelişim Basamakları",
                    "Tarımsal Üretim ve Sürdürülebilir Çevre"
                ],
                "Öğrenim Çıktıları": [
                    "Toprağın bitkiler ve hayvanlar için temel bir yaşam alanı olduğunu kavrar.",
                    "Bir tohumun çimlenmesi için gerekli şartları (su, hava, uygun sıcaklık) deneyle test eder.",
                    "Bilinçli tarım uygulamalarının ve toprağı korumanın önemini açıklar."
                ]
            },
            "8. Ünite: Canlıların Yaşam Alanlarına Yolculuk": {
                "Konular": [
                    "Farklı Yaşam Alanları (Ormanlar, Çöller, Kutuplar, Su Ekosistemleri)",
                    "Canlıların Yaşadıkları Çevreye Uyumu (Adaptasyon)",
                    "Doğal Çevrenin Korunması ve Biyoçeşitlilik"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı iklim ve coğrafyalardaki yaşam alanlarının özelliklerini araştırır.",
                    "Canlıların yaşam alanlarındaki şartlara nasıl uyum sağladığına dair örnekler verir.",
                    "Biyoçeşitliliğin korunması için doğal çevrenin tahrip edilmesini önleyici öneriler sunar."
                ]
            }
        },
        "Hayat Bilgisi": {
            "1. Öğrenme Alanı: Ben ve Okulum": {
                "Konular": [
                    "Güçlü ve Güçlendirilmesi Gereken Yönlerimiz",
                    "Arkadaşlık İlişkilerinde Empati, Tarafsızlık ve Çatışma Çözümü",
                    "Okul Kulüpleri, Projeler ve Sosyal Etkinlikler"
                ],
                "Öğrenim Çıktıları": [
                    "Kişisel güçlü ve zayıf yönlerini dürüstçe değerlendirerek hedefler belirler.",
                    "Arkadaşları arasında çıkan anlaşmazlıklarda empati kurarak uzlaşmacı çözümler üretir.",
                    "Okul kulüplerine aktif katılarak sosyal sorumluluk projelerinde görev alır."
                ]
            },
            "2. Öğrenme Alanı: Sağlığım ve Güvenliğim": {
                "Konular": [
                    "Bilinçli Tüketici Davranışları (Gıda Etiketleri, TSE, Son Kullanma Tarihi)",
                    "Mevsimsel Beslenme ve Spor Alışkanlığı",
                    "Acil Durumlar, Doğal Afetler ve Tahliye Planı"
                ],
                "Öğrenim Çıktıları": [
                    "Gıda alışverişinde ambalaj, son kullanma tarihi ve onay damgalarını inceler.",
                    "Sağlıklı kalmak için düzenli spor yapmanın ve dengeli beslenmenin önemini kavrar.",
                    "Okulda ve evde deprem, yangın gibi afetler için hazırlanan tahliye planına uyar."
                ]
            },
            "3. Öğrenme Alanı: Ailem ve Toplum": {
                "Konular": [
                    "Aile Bütçesi, Gelir-Gider Dengesi ve Tasarruf",
                    "Komşuluk Hakları ve Toplumsal Dayanışma",
                    "Özel Gereksinimli Bireyler ve Toplumsal Destek"
                ],
                "Öğrenim Çıktıları": [
                    "Aile bütçesini korumak için istek ve ihtiyaç ayrımını titizlikle yapar.",
                    "Komşuluk ilişkilerinde saygı ve yardımlaşma değerlerini sergiler.",
                    "Toplumdaki özel gereksinimli bireylerin hayatını kolaylaştıracak davranışlar geliştirir."
                ]
            },
            "4. Öğrenme Alanı: Yaşadığım Yer ve Ülkem": {
                "Konular": [
                    "İlimizin ve İlçemizin Yönetim Yapısı (Vali, Kaymakam, Belediye Başkanı, Muhtar)",
                    "Kroki Çiziminde Ayrıntılar ve Yön Tayini",
                    "Tarihî ve Kültürel Mirasımız",
                    "Millî Birlik, Beraberlik ve Kurtuluş Savaşı"
                ],
                "Öğrenim Çıktıları": [
                    "Yaşadığı yerdeki mülki amirleri ve yerel yöneticileri tanır, görevlerini açıklar.",
                    "Kroki üzerinde belirli bir konumu yön kavramlarını (kuzey, güney vb.) kullanarak bulur.",
                    "Kültürel zenginliğimizi yansıtan tarihî yapıları koruma sorumluluğu üstlenir.",
                    "Milletimizin bağımsızlık mücadelesinde sergilediği birlik ve dayanışmayı kavrar."
                ]
            },
            "5. Öğrenme Alanı: Doğa ve Çevre": {
                "Konular": [
                    "Doğal Çevrenin Bozulması ve Canlılara Etkisi",
                    "Su, Enerji ve Kaynak Tasarrufu",
                    "Çevre Sorunlarına Karşı Proje Geliştirme",
                    "Sokak Hayvanlarını Koruma"
                ],
                "Öğrenim Çıktıları": [
                    "İnsan faaliyetlerinin doğal çevreye ve yaban hayatına olumsuz etkilerini değerlendirir.",
                    "Evde ve okulda kaynakları tasarruflu kullanarak israfı önler.",
                    "Çevre kirliliğinin azaltılmasına yönelik uygulanabilir fikir ve projeler üretir.",
                    "Sokak hayvanlarının bakımına ve korunmasına duyarlılık gösterir."
                ]
            },
            "6. Öğrenme Alanı: Bilim, Teknoloji ve Sanat": {
                "Konular": [
                    "Geçmişten Günümüze Önemli İcatlar ve Hayatımıza Katkıları",
                    "Güvenli İnternet Kullanımı ve Dijital Ayak İzi",
                    "Tiyatro, Sinema ve Sanat Merkezlerini Tanıma"
                ],
                "Öğrenim Çıktıları": [
                    "İcatların ve teknolojik aletlerin insan yaşamındaki dönüştürücü etkisini açıklar.",
                    "İnternet ortamında kişisel bilgilerin gizliliğini korur ve güvenli siteleri tercih eder.",
                    "Tiyatro, sergi ve konser gibi kültürel etkinliklere katılma alışkanlığı kazanır."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: School Life": {
                "Konular": [
                    "School Subjects (Maths, Science, Art, Music, English, Physical Education)",
                    "School Timetables and Schedules",
                    "Expressing Likes and Dislikes about Classes (I like Maths / I don't like Science)"
                ],
                "Öğrenim Çıktıları": [
                    "Names school subjects correctly and reads a daily class schedule.",
                    "Expresses preferences regarding favorite and least favorite school classes.",
                    "Asks and answers questions about class timetables and day sequences."
                ]
            },
            "Theme 2: Classroom Life": {
                "Konular": [
                    "Classroom Stationery and Belongings",
                    "Prepositions of Place (in, on, under, behind, in front of, next to)",
                    "Polite Requests and School Routines"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies and locates classroom objects using prepositions of place.",
                    "Formulates polite classroom requests using 'Can I...' or 'May I...'.",
                    "Follows multi-step oral instructions given by the teacher."
                ]
            },
            "Theme 3: Personal Life": {
                "Konular": [
                    "Describing Physical Appearance (tall, short, slim, curly hair, blue eyes)",
                    "Personal Possessions and Toys",
                    "Expressing Abilities and Inabilities with 'Can / Can't'"
                ],
                "Öğrenim Çıktıları": [
                    "Describes the physical appearance of oneself and peers accurately.",
                    "Talks about personal possessions using possessive pronouns simply.",
                    "Expresses what they and others can or cannot do."
                ]
            },
            "Theme 4: Family Life": {
                "Konular": [
                    "Extended Family Members (aunt, uncle, cousin)",
                    "Family Professions and Jobs",
                    "Daily Routines at Home (wake up, have dinner, go to bed)"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies and talks about extended family relations clearly.",
                    "Names common professions and associates them with family members.",
                    "Describes simple household daily routines in sequential order."
                ]
            },
            "Theme 5: Homes & Houses & The Neighbourhood": {
                "Konular": [
                    "Parts of a House and Household Appliances",
                    "Neighbourhood Places (bakery, hospital, library, supermarket, pharmacy)",
                    "Giving Simple Directions (Turn left, Turn right, Go straight)"
                ],
                "Öğrenim Çıktıları": [
                    "Names parts of a house and specific appliances in different rooms.",
                    "Identifies common public places in the neighborhood and their functions.",
                    "Understands and gives basic directional instructions."
                ]
            },
            "Theme 6: Life in the City & the World": {
                "Konular": [
                    "Means of Transport (bus, train, plane, ship, bicycle)",
                    "Weather Conditions and Seasons (sunny, rainy, snowy, windy, cold, hot)",
                    "Countries and Flags (Turkey, Britain, Germany, France)"
                ],
                "Öğrenim Çıktıları": [
                    "Names various vehicles and talks about ways of commuting.",
                    "Describes weather conditions and seasonal patterns simply.",
                    "Identifies countries, nationalities, and world flags."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "Temel Nota Adları ve Dizek (Porte) Üzerindeki Yerleri (Do-Re-Mi-Fa-Sol-La-Si)",
                    "Sol Anahtarı ve Ses Yükseklikleri",
                    "Ritim Kalıpları (Birlik, İkilik, Dörtlük Vuruşlar)"
                ],
                "Öğrenim Çıktıları": [
                    "Temel nota adlarını dizek üzerindeki yerlerine göre tanır ve okur.",
                    "Farklı süre değerlerine sahip ritim kalıplarını el çırparak veya çalgıyla seslendirir.",
                    "Şarkılardaki melodik inici ve çıkıcı hareketleri fark eder."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Okul Marşları ve Belirli Gün Şarkıları",
                    "Basit Melodika veya Flüt Çalma Tekniklerine Giriş",
                    "Özgün Ritim Motifi Üretme"
                ],
                "Öğrenim Çıktıları": [
                    "Millî marşları ve çocuk şarkılarını doğru ton ve ritimle seslendirir.",
                    "Temel bir ezgi çalgısında (blokflüt, melodika vb.) temel notaları seslendirir.",
                    "Verilen bir söz öbeğine uygun özgün ritim kalıpları tasarlar."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü": {
                "Konular": [
                    "Sanat Eserlerinde Tasarım İlkeleri (Denge, Ritim, Oran, Vurgu)",
                    "Ünlü Ressamlar ve Eser İncelemeleri",
                    "Kültür Varlıkları ve Sanat Tarihine Giriş"
                ],
                "Öğrenim Çıktıları": [
                    "Sanat yapıtlarında kullanılan kompozisyon ilkelerini inceler ve açıklar.",
                    "Dünya ve Türk resim sanatının önemli temsilcilerini ve eserlerini tanır.",
                    "Kültür varlıklarının korunması konusunda duyarlı bir sanat vizyonu edinir."
                ]
            },
            "2. Tema: Sanatsal Tasarım": {
                "Konular": [
                    "Resimde Derinlik ve Perspektif Başlangıcı (Ön, Orta, Arka Plan)",
                    "Renk Geçişleri, Açık-Koyu Ton Değerleri",
                    "Rölyef, Heykel ve Geri Dönüşüm Heykeltıraşlığı"
                ],
                "Öğrenim Çıktıları": [
                    "Çizimlerinde ön, orta ve arka plan derinlik ilişkilerini başarıyla kurar.",
                    "Renk tonlamaları ve ışık-gölge çalışmalarıyla nesnelere hacim kazandırır.",
                    "Farklı materyalleri birleştirerek üç boyutlu sanatsal tasarımlar üretir."
                ]
            }
        },
        "Beden Eğitimi ve Oyun": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Koordinasyon Parkurlarında Çeviklik ve Hız",
                    "Ritmik Hareketler ve Basit Halk Oyunları Adımları",
                    "Hedefe Yönelik Atma ve Vurma Becerileri"
                ],
                "Öğrenim Çıktıları": [
                    "Engellerden oluşan koordinasyon parkurlarını kurallara uygun hızla tamamlar.",
                    "Müzik ve ritim eşliğinde yöresel halk oyunlarının temel figürlerini sergiler.",
                    "Farklı boyutlardaki toplarla hedefe yönelik isabetli atışlar yapar."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Fiziksel Uygunluk, Esneklik ve Kuvvet Gelişimi",
                    "Spor Yaparken Isınma, Soğuma ve İlkyardım Temelleri",
                    "Takım Ruhu, Dayanışma ve Liderlik Becerileri"
                ],
                "Öğrenim Çıktıları": [
                    "Egzersiz öncesinde ısınma, sonrasında soğuma hareketlerinin önemini uygulayarak kavrar.",
                    "Fiziksel aktiviteler sırasında oluşabilecek küçük yaralanmalarda temel güvenlik önlemlerini alır.",
                    "Takım oyunlarında sorumluluk üstlenir, arkadaşlarına liderlik ve rehberlik eder."
                ]
            }
        }
    },
    "4. Sınıf": {
        "Türkçe": {
            "1. Tema: Okuma Kültürü": {
                "Konular": [
                    "Kitap Sevgisi ve Kütüphaneler",
                    "Söz Varlığını Geliştirme ve Bağlamdan Anlam Çıkarma",
                    "Metnin Ana Fikri, Konusu ve Başlık İlişkisi",
                    "Temel Noktalama İşaretlerinin İşlevleri"
                ],
                "Kazanımlar": [
                    "Okuduğu metnin konusunu ve ana fikrini belirler.",
                    "Metinle ilgili soruları cevaplar ve metne içeriğine uygun farklı başlıklar önerir.",
                    "Bilinmeyen kelimelerin anlamlarını tahmin etmek için görsel ve bağlamsal ipuçlarını kullanır.",
                    "Nokta, virgül, iki nokta, tırnak işareti gibi noktalama işaretlerini işlevlerine uygun kullanır."
                ]
            },
            "2. Tema: Millî Mücadele ve Atatürk": {
                "Konular": [
                    "Kurtuluş Savaşı Kahramanları ve Cepheler",
                    "Mustafa Kemal Atatürk'ün Liderlik Özellikleri",
                    "Olayların Kronolojik Sıralanışı ve Sebep-Sonuç İlişkileri",
                    "Metin Özetleme ve Sözlü İfade"
                ],
                "Kazanımlar": [
                    "Millî Mücadele kahramanlarını ve Atatürk'ün hayatını anlatan metinleri doğru yorumlar.",
                    "Metindeki olayların gelişimini ve neden-sonuç ilişkilerini kavrar.",
                    "Dinlediklerini ve okuduklarını kendi cümleleriyle tutarlı şekilde özetler.",
                    "Vatan sevgisi ve bağımsızlık bilincini yansıtan düşünce yazıları yazar."
                ]
            },
            "3. Tema: Erdemler": {
                "Konular": [
                    "Dürüstlük, Sabır, Adalet, Vefa ve Cömertlik",
                    "Metindeki Karakterlerin Tahlili ve Karşılaştırılması",
                    "Deyim ve Atasözlerinin Anlamı",
                    "Nezaket Diliyle Hikâye Edici Metin Yazma"
                ],
                "Kazanımlar": [
                    "Erdemlerle ilgili metinlerin ana iletisini kavrar ve karakter tahlili yapar.",
                    "Metinde geçen deyim ve atasözlerinin anlamına katkısını açıklar.",
                    "Olayları sebep-sonuç bağlamında kurgulayarak özgün hikâyeler yazar.",
                    "Konuşmalarında nezaket ve saygı kurallarına titizlikle uyar."
                ]
            },
            "4. Tema: Millî Kültürümüz": {
                "Konular": [
                    "Geleneklerimiz, El Sanatları ve Bayramlarımız",
                    "Tarihî Eserler ve Kültürel Miras",
                    "Şiir ve Düzyazı Biçimsel Özellikleri",
                    "Söz Varlığını Zenginleştirme"
                ],
                "Kazanımlar": [
                    "Millî kültür ögelerimizi yansıtan metinleri analiz eder ve kültürel bilinci pekiştirir.",
                    "Kültürel kavramların anlamını doğru kavrayarak yazılı anlatımlarında kullanır.",
                    "Şiir ve düzyazı arasındaki biçimsel ve ahenk yönünden farkları ayırt eder.",
                    "Kültürel mirasımızın korunmasına yönelik görüş bildirir ve sunum yapar."
                ]
            },
            "5. Tema: Doğa ve Evren": {
                "Konular": [
                    "Doğa Olayları, İklim ve Canlılar Arasındaki Denge",
                    "Çevre Kirliliği ve Ekolojik Sorunlar",
                    "Gerçek ve Hayal Ürünü Unsurları Ayırt Etme",
                    "Gözlem ve Betimleme Yazıları"
                ],
                "Kazanımlar": [
                    "Doğa ve çevre bilincini konu alan bilgilendirici metinleri anlar.",
                    "Metindeki gerçekçi ve hayal ürünü ifadeleri birbirinden ayırt eder.",
                    "Gözlemlerinden hareketle canlılar ve çevre etkileşimini anlatan betimleyici metinler yazar.",
                    "Görsellerden hareketle doğa olaylarını ve mevsim döngülerini yorumlar."
                ]
            },
            "6. Tema: Sanat": {
                "Konular": [
                    "Resim, Müzik, Heykel ve Tiyatro Sanatı",
                    "Şiirde Ritim, Kafiye ve Ana Duygu",
                    "Sanatsal Bir Etkinliği Eleştirme ve Yorumlama",
                    "Düşünceyi Geliştirme Yolları (Örneklendirme, Karşılaştırma)"
                ],
                "Kazanımlar": [
                    "Sanatın birey ve toplum hayatındaki önemini anlatan metinleri kavrar.",
                    "Şiirlerdeki dize, kıta, ahenk ögelerini ve ana duyguyu keşfeder.",
                    "Katıldığı sanatsal bir etkinlikle ilgili izlenimlerini yazılı ve sözlü olarak aktarır.",
                    "Metindeki ana düşünceyi destekleyen yardımcı düşünce ve örnekleri belirler."
                ]
            },
            "7. Tema: Birey ve Toplum": {
                "Konular": [
                    "İnsan Hakları, Farklılıklara Saygı ve Empati",
                    "Toplumsal Yardımlaşma ve Birlikte Yaşama Kültürü",
                    "Metin Karakterlerinin Davranışlarını Yorumlama",
                    "Tartışma ve Fikir Paylaşımı Kuralları"
                ],
                "Kazanımlar": [
                    "Bireysel farklılıklara ve insan haklarına saygıyı ele alan metinleri değerlendirir.",
                    "Metindeki kahramanların davranışlarını empati kurarak eleştirir.",
                    "Toplumsal iş birliği ve kuralların önemini açıklayan düşünce yazıları yazar.",
                    "Sınıf içi tartışmalarda başkalarının sözünü kesmeden saygıyla dinler ve konuşur."
                ]
            },
            "8. Tema: Bilim ve Teknoloji": {
                "Konular": [
                    "Bilimsel Keşifler ve Teknolojik Yenilikler",
                    "Güvenli ve Bilinçli İnternet Kullanımı",
                    "Grafik, Tablo ve Şemaları Yorumlama",
                    "Yazım ve İmla Kurallarını Doğru Uygulama"
                ],
                "Kazanımlar": [
                    "Bilgilendirici metinlerdeki buluş ve icat süreçlerini kavrar.",
                    "Bilimsel metinlerde geçen infografik, tablo ve şemaları doğru okur.",
                    "Teknolojinin güvenli kullanımı konusunda ilkeler belirler ve uygular.",
                    "Büyük harflerin, kısaltmaların ve sayıların yazımına dikkat ederek metin oluşturur."
                ]
            }
        },
        "Matematik": {
            "1. Ünite: Doğal Sayılar ve Toplama/Çıkarma": {
                "Konular": [
                    "4, 5 ve 6 Basamaklı Doğal Sayılar (Okuma, Yazma, Çözümleme)",
                    "Sayıları En Yakın Onluğa veya Yüzlüğe Yuvarlama",
                    "Doğal Sayıları Karşılaştırma ve Sıralama",
                    "En Çok Dört Basamaklı Sayılarla Toplama ve Çıkarma",
                    "Zihinden Toplama-Çıkarma ve Tahmin Stratejileri"
                ],
                "Kazanımlar": [
                    "4, 5 ve 6 basamaklı doğal sayıları okur, yazar ve basamak değerlerini belirler.",
                    "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
                    "En çok dört basamaklı doğal sayılarla toplama ve çıkarma işlemlerini yapar.",
                    "Toplama ve çıkarma işlemlerinde tahmin stratejilerini kullanır ve zihinden işlem yapar."
                ]
            },
            "2. Ünite: Doğal Sayılarla Çarpma ve Bölme": {
                "Konular": [
                    "Üç Basamaklı Sayılarla İki Basamaklı Sayıları Çarpma",
                    "10, 100 ve 1000 ile Zihinden Çarpma ve Bölme",
                    "Dört Basamaklı Sayıları İki Basamaklı Sayılara Bölme",
                    "Çarpma ve Bölme İşlemlerinde Tahmin",
                    "Dört İşlem Gerektiren Günlük Hayat Problemleri"
                ],
                "Kazanımlar": [
                    "En çok üç basamaklı doğal sayıları iki basamaklı doğal sayılarla çarpar.",
                    "En çok dört basamaklı doğal sayıları en çok iki basamaklı doğal sayılara böler.",
                    "10, 100 ve 1000 ile kısa yoldan çarpma ve bölme işlemlerini yapar.",
                    "Çarpma ve bölme işlemlerini içeren günlük hayat problemlerini çözer ve kurar."
                ]
            },
            "3. Ünite: Kesirler ve Zaman Ölçme": {
                "Konular": [
                    "Basit, Bileşik ve Tam Sayılı Kesirler",
                    "Kesirleri Sayı Doğrusunda Gösterme ve Sıralama",
                    "Bir Çokluğun Belirtilen Kesir Kadarını Hesaplama",
                    "Paydaları Eşit Kesirlerle Toplama ve Çıkarma",
                    "Zaman Ölçme Birimleri Arasındaki Dönüşümler ve Zaman Problemleri"
                ],
                "Kazanımlar": [
                    "Basit, bileşik ve tam sayılı kesirleri tanır, modellerle gösterir ve sayı doğrusunda sıralar.",
                    "Bir çokluğun belirtilen basit kesir kadarını hesaplar.",
                    "Paydaları eşit kesirlerle toplama ve çıkarma işlemlerini yapar.",
                    "Zaman ölçme birimleri (saat, dakika, saniye, yıl, ay, hafta, gün) arasındaki ilişkileri dönüştürür."
                ]
            },
            "4. Ünite: Geometrik Cisimler ve Şekiller": {
                "Konular": [
                    "Üçgen, Kare ve Dikdörtgenin Kenar ve Köşe Özellikleri",
                    "Kenar Uzunluklarına Göre Üçgen Çeşitleri (Eşkenar, İkizkenar, Çeşitkenar)",
                    "Küp, Kare Prizma, Dikdörtgen Prizma ve Silindirin Temel Özellikleri",
                    "Geometrik Cisimlerin Açınımları ve Geometrik Örüntüler"
                ],
                "Kazanımlar": [
                    "Üçgen, kare ve dikdörtgenin kenar ve köşe özelliklerini inceler ve isimlendirir.",
                    "Kenar uzunluklarına göre üçgen çeşitlerini (eşkenar, ikizkenar, çeşitkenar) sınıflandırır.",
                    "Küp, kare prizma, dikdörtgen prizma ve silindirin açınımlarını ve yüz özelliklerini kavrar.",
                    "Geometrik şekil ve cisimlerle örüntüler oluşturur ve kuralını açıklar."
                ]
            },
            "5. Ünite: Geometride Temel Kavramlar ve Uzunluk Ölçme": {
                "Konular": [
                    "Doğru, Doğru Parçası, Işın ve Açı Kavramları",
                    "Açı Çeşitleri (Dar, Dik, Geniş, Doğru Açı) ve İletki ile Ölçme",
                    "Standart Uzunluk Ölçü Birimleri (mm, cm, m, km) ve Dönüşümleri",
                    "Uzunluk Ölçme Problemleri"
                ],
                "Kazanımlar": [
                    "Doğru, doğru parçası ve ışın kavramlarını tanır ve modellerini çizer.",
                    "Açıları dar, dik, geniş ve doğru açı olarak sınıflandırır ve iletki ile ölçer.",
                    "Standart uzunluk ölçme birimlerini (milimetre, santimetre, metre, kilometre) birbirine dönüştürür.",
                    "Uzunluk ölçme ile ilgili günlük hayat problemlerini çözer."
                ]
            },
            "6. Ünite: Çevre ve Alan Ölçme, Tartma, Sıvıları Ölçme": {
                "Konular": [
                    "Kare ve Dikdörtgenin Çevre Uzunluğunu Hesaplama",
                    "Birim Karelerle Düzlemsel Şekillerin Alanını Bulma",
                    "Kütle Ölçü Birimleri (Miligram, Gram, Kilogram, Ton) ve Dönüşümleri",
                    "Sıvı Ölçü Birimleri (Litre, Mililitre) ve Problemleri"
                ],
                "Kazanımlar": [
                    "Kare ve dikdörtgenin çevre uzunluklarını formülle hesaplar.",
                    "Kare ve dikdörtgenin alanını birim kareler kullanarak modeller ve belirler.",
                    "Kilogram, gram, ton ve miligram ilişkisini açıklar, tartma problemleri çözer.",
                    "Litre ve mililitre birimlerini kavrar, sıvı ölçüleri ile ilgili problemleri çözer."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Ünite: Yer Kabuğu ve Dünya'mızın Hareketleri": {
                "Konular": [
                    "Yer Kabuğunun Yapısı (Kayaçlar, Mineraller, Madenler)",
                    "Fosiller ve Fosil Oluşum Evreleri",
                    "Dünya'nın Kendi Etrafında Dönme Hareketi ve Gece-Gündüz Oluşumu",
                    "Dünya'nın Güneş Etrafında Dolanma Hareketi ve Mevsimlerin Oluşumu"
                ],
                "Kazanımlar": [
                    "Yer kabuğunun kayaçlar, mineraller ve fosillerden oluşan yapısını açıklar.",
                    "Fosillerin oluşum süreçlerini ve geçmiş canlılar hakkındaki önemini kavrar.",
                    "Dünya'nın kendi etrafında dönme hareketini ve gece-gündüz oluşumunu açıklar.",
                    "Dünya'nın Güneş etrafında dolanma hareketini ve mevsimlerin oluşumundaki rolünü kavrar."
                ]
            },
            "2. Ünite: Besinlerimiz": {
                "Konular": [
                    "Besin İçerikleri (Karbonhidrat, Protein, Yağ, Vitamin, Su, Mineral)",
                    "Besinlerin Vücuttaki Öncelikli Görevleri",
                    "Dengeli ve Sağlıklı Beslenme (Obezite ve İsraf)",
                    "Alkol ve Sigaranın İnsan Sağlığına Zararları"
                ],
                "Kazanımlar": [
                    "Canlıların yaşamını sürdürmesi için besinlerin gerekliliğini açıklar.",
                    "Besin içeriklerini (karbonhidrat, protein, yağ, vitamin, su, mineral) ve görevlerini kavrar.",
                    "Dengeli ve sağlıklı beslenmenin vücut sağlığı açısından önemini değerlendirir.",
                    "Alkol ve sigaranın insan sağlığına ve organlara zararlarını tartışır."
                ]
            },
            "3. Ünite: Kuvvetin Etkileri": {
                "Konular": [
                    "Kuvvetin Cisimlerin Hareketi Üzerindeki Etkileri (Hızlanma, Yavaşlama, Durma, Yön Değiştirme)",
                    "Kuvvetin Cisimler Üzerindeki Şekil Değiştirici Etkisi",
                    "Mıknatısların Özellikleri ve Kutupları (N ve S)",
                    "Mıknatısların Çekme-İtme Özellikleri ve Günlük Yaşamdaki Kullanımı"
                ],
                "Kazanımlar": [
                    "Kuvvetin cisimlerin hareket yönünü, hızını değiştirici ve durdurucu etkilerini açıklar.",
                    "Kuvvetin cisimler üzerindeki şekil değiştirici etkisini deneylerle gözlemler.",
                    "Mıknatısların kutuplarını, itme-çekme özelliklerini ve manyetik etkisini keşfeder.",
                    "Mıknatısların günlük yaşamda ve teknolojideki kullanım alanlarına örnekler verir."
                ]
            },
            "4. Ünite: Maddenin Özellikleri": {
                "Konular": [
                    "Maddenin Duyu Organlarıyla Fark Edilen Özellikleri (Suda Yüzme-Batma, Suyu Çekme-Çekmeme, Mıknatısla Çekilme)",
                    "Maddenin Ölçülebilir Özellikleri (Kütle ve Hacim)",
                    "Maddenin Halleri (Katı, Sıvı, Gaz)",
                    "Isı Etkisiyle Meydana Gelen Hâl Değişimleri (Erime, Donma, Buharlaşma)"
                ],
                "Kazanımlar": [
                    "Maddelerin duyu organlarıyla fark edilen niteliklerini deneylerle test eder.",
                    "Maddenin kütle ve hacim özelliklerini ölçerek açıklar.",
                    "Maddenin katı, sıvı ve gaz hâllerini tanır ve ayırt eder.",
                    "Isınma ve soğuma sonucu meydana gelen hâl değişimlerini deneyle gösterir."
                ]
            },
            "5. Ünite: Aydınlatma ve Ses Teknolojileri": {
                "Konular": [
                    "Geçmişten Günümüze Aydınlatma Teknolojilerinin Gelişimi",
                    "Uygun Aydınlatma ve Göz Sağlığı",
                    "Işık Kirliliği ve Doğal Hayata Etkileri",
                    "Geçmişten Günümüze Ses Teknolojileri ve Ses Kirliliği"
                ],
                "Kazanımlar": [
                    "Geçmişten günümüze aydınlatma teknolojilerinin gelişimini ve insan yaşamına katkılarını tartışır.",
                    "Uygun aydınlatmanın göz sağlığı ve enerji tasarrufu açısından önemini kavrar.",
                    "Işık kirliliğinin doğal yaşama ve çevreye olumsuz etkilerini açıklar.",
                    "Geçmişten günümüze ses teknolojilerini inceler ve ses kirliliğinin zararlarını tartışır."
                ]
            },
            "6. Ünite: İnsan ve Çevre": {
                "Konular": [
                    "Bilinçli Tüketici ve Doğal Kaynakların Tasarruflu Kullanımı",
                    "Geri Dönüşümün Doğaya ve Ekonomiye Katkısı",
                    "Çevre Sorunları (Hava, Su, Toprak Kirliliği) ve Çözüm Yolları"
                ],
                "Kazanımlar": [
                    "Çevreyi temiz tutmanın ve kaynakları tasarruflu kullanmanın önemini kavrar.",
                    "Geri dönüşümün doğal kaynakların korunmasına ve çevre temizliğine katkısını değerlendirir.",
                    "Bilinçli bir tüketici olarak çevre sorunlarına karşı duyarlı davranışlar sergiler.",
                    "Yerel ve küresel çevre sorunlarının nedenlerini ve çözüm önerilerini araştırır."
                ]
            },
            "7. Ünite: Basit Elektrik Devreleri": {
                "Konular": [
                    "Basit Elektrik Devresi Elemanları (Pil, Ampul, Anahtar, Bağlantı Kablosu)",
                    "Çalışan Elektrik Devresi Kurma ve Devre Elemanlarının Görevleri",
                    "Evlerdeki Elektrik Düğmeleri ve Prizlerin Devredeki Rolü"
                ],
                "Kazanımlar": [
                    "Basit bir elektrik devresini oluşturan elemanları tanır ve işlevlerini açıklar.",
                    "Çalışan bir elektrik devresi kurar ve devre elemanlarını test eder.",
                    "Evlerdeki elektrik düğmelerinin ve prizlerin devredeki anahtar görevi gördüğünü kavrar.",
                    "Devrede ampul parlaklığını etkileyen faktörleri keşfeder."
                ]
            }
        },
        "Sosyal Bilgiler": {
            "1. Ünite: Birey ve Toplum": {
                "Konular": [
                    "T.C. Kimlik Kartı ve Resmî Kimlik Belgeleri",
                    "Yaşamımıza İlişkin Olaylar ve Kronoloji",
                    "Bireysel Farklılıklar, İlgi ve Yeteneklerimiz",
                    "Duygularımız ve Empati Kurma"
                ],
                "Kazanımlar": [
                    "Türkiye Cumhuriyeti kimlik kartındaki bilgileri inceler ve kimlik belgesinin önemini açıklar.",
                    "Yaşamına ilişkin olayları kronolojik sıraya koyar.",
                    "Bireysel farklılıklara saygı duyar ve empati becerisi geliştirir.",
                    "Duygusal, fiziksel ve zihinsel özelliklerinin farkında olarak kendini doğru ifade eder."
                ]
            },
            "2. Ünite: Kültür ve Miras": {
                "Konular": [
                    "Sözlü Tarih Araştırmaları ve Aile Tarihi",
                    "Geleneksel Çocuk Oyunları ile Günümüz Oyunları",
                    "Millî Kültür Ögelerimiz (Mimari, El Sanatları, Yemekler)",
                    "Millî Mücadele Kahramanlarının Fedakârlıkları"
                ],
                "Kazanımlar": [
                    "Ailesinin ve çevresinin sözlü tarih araştırmasını yaparak millî kültürü tanır.",
                    "Geleneksel çocuk oyunları ile günümüz oyunlarını karşılaştırır.",
                    "Millî kültür ögelerini yansıtan eserleri inceler.",
                    "Millî Mücadele kahramanlarının fedakârlıklarını ve bağımsızlık ruhunu kavrar."
                ]
            },
            "3. Ünite: İnsanlar, Yerler ve Çevreler": {
                "Konular": [
                    "Yön Bulma Yöntemleri (Doğal ve Teknolojik Yöntemler)",
                    "Kroki Çizimi ve Kullanımı",
                    "Çevremizdeki Doğal ve Beşerî Unsurlar",
                    "Hava Durumu Gözlemleri ve Tablosu",
                    "Doğal Afetler ve Afete Hazırlık"
                ],
                "Kazanımlar": [
                    "Doğal ve beşerî yön bulma yöntemlerini kullanarak yönünü belirler.",
                    "Çevresindeki yerleri gösteren basit bir kroki çizer.",
                    "Yaşadığı çevredeki doğal ve beşerî unsurları ayırt eder.",
                    "Hava durumu gözlemleri yapar ve hava olaylarını açıklar.",
                    "Doğal afetlere karşı hazırlıklı olmanın yollarını araştırır."
                ]
            },
            "4. Ünite: Bilim, Teknoloji ve Toplum": {
                "Konular": [
                    "Teknolojik Ürünlerin Geçmişten Bugüne Gelişimi",
                    "Teknolojinin Hayatımıza Getirdiği Kolaylıklar ve Riskler",
                    "Teknolojik Ürünleri Güvenli ve Amacına Uygun Kullanma",
                    "Mucitler ve Bilim İnsanlarının Ortak Özellikleri"
                ],
                "Kazanımlar": [
                    "Günlük yaşamında kullandığı teknolojik ürünlerin zaman içindeki gelişimini inceler.",
                    "Teknolojik ürünlerin hayatımızdaki faydalarını ve olası zararlarını tartışır.",
                    "Teknolojik ürünleri amacına uygun ve güvenli şekilde kullanma kurallarını uygular.",
                    "Mucit ve bilim insanlarının ortak özelliklerini fark eder, özgün fikirler üretir."
                ]
            },
            "5. Ünite: Üretim, Dağıtım ve Tüketim": {
                "Konular": [
                    "İstek ve İhtiyaçlar Arasındaki Fark",
                    "Bilinçli Bütçe Hazırlama ve Tasarruf",
                    "Çevremizdeki Ekonomik Faaliyetler ve Meslekler",
                    "Bilinçli Tüketici Standartları (TSE, Garanti Belgesi, Fatura)"
                ],
                "Kazanımlar": [
                    "İstek ve ihtiyaçlarını ayırt ederek bütçe hazırlama bilinci kazanır.",
                    "Çevresindeki ekonomik faaliyetleri ve meslekleri inceler.",
                    "Bilinçli bir tüketici olarak alışverişte dikkat edilmesi gereken kuralları uygular.",
                    "İsrafı önleme ve kaynakları tasarruflu kullanma alışkanlığı geliştirir."
                ]
            },
            "6. Ünite: Etkin Vatandaşlık": {
                "Konular": [
                    "Çocuk Haklarına Dair Sözleşme ve Haklarımız",
                    "Ailede, Okulda ve Toplumda Sorumluluklarımız",
                    "Okul Meclisi ve Eğitsel Kulüpler",
                    "Bağımsızlık Sembollerimiz (Bayrak ve İstiklal Marşı)"
                ],
                "Kazanımlar": [
                    "Bir çocuk olarak haklarını bilir ve çocuk haklarının korunmasının önemini kavrar.",
                    "Ailede, okulda ve toplumda üzerine düşen sorumlulukları yerine getirir.",
                    "Eğitsel ve sosyal kulüp faaliyetlerine gönüllü olarak katılır.",
                    "Bağımsızlığımızın sembolleri olan bayrak ve İstiklal Marşı'na saygı duyar."
                ]
            },
            "7. Ünite: Küresel Bağlantılar": {
                "Konular": [
                    "Farklı Ülkelerin Kültürel Özellikleri ve Yaşam Tarzları",
                    "Türkiye'nin Komşuları ve Türk Cumhuriyetleri",
                    "Farklı Kültürlere Karşı Hoşgörü ve Önyargısız Yaklaşım",
                    "Küresel Çevre ve İnsani Sorunlar"
                ],
                "Kazanımlar": [
                    "Dünya üzerindeki farklı ülkelerin kültürel özelliklerini araştırır.",
                    "Türkiye'nin komşularını ve Türk cumhuriyetlerini harita üzerinde tanır.",
                    "Farklı kültürlere karşı önyargısız ve hoşgörülü yaklaşım sergiler.",
                    "Küresel sorunlara (çevre, açlık, yoksulluk) duyarlılık geliştirir."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: Günlük Hayattaki Dini İfadeler": {
                "Konular": [
                    "Besmele, Selam, Hamd, Şükür ve Tekbir Kavramları",
                    "Dilek ve Dualarda Geçen Dini İfadeler (İnşallah, Maşallah vb.)",
                    "Sübhaneke Duası ve Anlamı"
                ],
                "Kazanımlar": [
                    "Günlük hayatta kullanılan besmele, selam, hamd, şükür, tekbir gibi dini ifadeleri açıklar.",
                    "Dilek ve dualarda geçen dini ifadeleri doğru yerde kullanır.",
                    "Sübhaneke duasını ezbere okur ve anlamını açıklar."
                ]
            },
            "2. Ünite: İslam'ı Tanıyalım": {
                "Konular": [
                    "İslam'ın İnanç Esasları (İmanın Şartları)",
                    "İslam'ın Temel İbadetleri (Kelime-i Şehadet, Namaz, Oruç, Zekât, Hac)",
                    "Amentü Duası ve Anlamı"
                ],
                "Kazanımlar": [
                    "İslam'ın inanç esaslarını ve imanın şartlarını kavrar.",
                    "İslam'ın temel ibadetlerini (namaz, oruç, zekat, hac, kelime-i şehadet) tanır.",
                    "Amentü duasını ezbere okur ve anlamını açıklar."
                ]
            },
            "3. Ünite: Güzel Ahlak": {
                "Konular": [
                    "İslam Dininde Güzel Ahlakın Önemi",
                    "Anne, Baba, Akraba ve Komşulara Karşı İyi Davranma",
                    "Fatiha Suresi ve Anlamı"
                ],
                "Kazanımlar": [
                    "İslam dininin güzel ahlaka verdiği önemi ayet ve hadislerle açıklar.",
                    "Anne, baba, akraba ve komşulara karşı iyi davranmanın önemini kavrar.",
                    "Fatiha suresini ezbere okur ve anlamını açıklar."
                ]
            },
            "4. Ünite: Hz. Muhammed'i Tanıyalım": {
                "Konular": [
                    "Hz. Muhammed'in Doğumu, Çocukluk ve Gençlik Yılları",
                    "Hz. Muhammed'in Dürüstlüğü ve Güvenilirliği (el-Emin)",
                    "Salli ve Barik Duaları ve Anlamları"
                ],
                "Kazanımlar": [
                    "Hz. Muhammed'in doğumunu, çocukluğunu ve gençliğini öğrenir.",
                    "Hz. Muhammed'in dürüstlüğünü, güvenilirliğini (el-Emin) ve ahlaki erdemlerini kavrar.",
                    "Salli ve Barik dualarını ezbere okur ve anlamlarını açıklar."
                ]
            },
            "5. Ünite: Din ve Temizlik": {
                "Konular": [
                    "Beden, Elbise ve Çevre Temizliği",
                    "Maddi ve Manevi Temizlik İlişkisi",
                    "İbadetlerde Temizlik (Abdestin Önemi)",
                    "İhlas Suresi ve Anlamı"
                ],
                "Kazanımlar": [
                    "İslam'ın beden, çevre ve kalp temizliğine verdiği önemi değerlendirir.",
                    "Temizliğin ibadetlerle olan ilişkisini (abdest vb.) kavrar.",
                    "İhlas suresini ezbere okur ve anlamını açıklar."
                ]
            }
        },
        "İngilizce": {
            "Unit 1: Classroom Rules": {
                "Konular": [
                    "Classroom Objects and Supplies",
                    "Giving and Obeying Classroom Instructions (Be quiet, Raise your hand, Listen)",
                    "Asking for Permission (May I come in? May I take your pencil?)"
                ],
                "Kazanımlar": [
                    "Sınıf içi nesneleri tanır ve sayar.",
                    "Basit sınıf yönergelerini (Open the door, sit down, be quiet) anlar ve uygular.",
                    "İzin isteme ifadelerini (May I come in? May I take your pencil?) kullanır."
                ]
            },
            "Unit 2: Nationality": {
                "Konular": [
                    "Countries and Nationalities (Turkey-Turkish, England-English, Spain-Spanish)",
                    "Asking and Stating Origins (Where are you from? I am from...)",
                    "Flags of Different Countries"
                ],
                "Kazanımlar": [
                    "Ülke ve millet adlarını söyler (Turkey - Turkish, England - English).",
                    "Nereden olduğunu ve milliyetini sorar ve söyler (Where are you from? I'm from Turkey).",
                    "Harita üzerinde ülkeleri ve bayrakları eşleştirir."
                ]
            },
            "Unit 3: Cartoons": {
                "Konular": [
                    "Cartoon Characters and Superheroes",
                    "Expressing Abilities and Inabilities with 'Can / Can't'",
                    "Asking and Answering Ability Questions (Can you fly? No, I can't)"
                ],
                "Kazanımlar": [
                    "Çizgi film karakterlerinin yeteneklerini anlatır (Superman can fly).",
                    "Yapabildiklerini ve yapamadıklarını ifade eder (I can swim / I can't drive).",
                    "Basit yetenek soruları sorar ve cevaplar (Can you ride a bike?)."
                ]
            },
            "Unit 4: Free Time": {
                "Konular": [
                    "Leisure Activities and Hobbies (playing football, reading comics, dancing, flying a kite)",
                    "Expressing Likes and Dislikes (I like swimming / I dislike running)",
                    "Asking About Hobbies"
                ],
                "Kazanımlar": [
                    "Boş zaman aktivitelerini (playing football, reading comics, dancing) söyler.",
                    "Sevdiklerini ve sevmediklerini ifade eder (I like swimming / I dislike running).",
                    "Arkadaşlarının hobilerini ve ilgi alanlarını sorar."
                ]
            },
            "Unit 5: My Day": {
                "Konular": [
                    "Daily Routines (wake up, brush teeth, have breakfast, go to school, sleep)",
                    "Telling the Time (o'clock and half past)",
                    "Expressing Activity Times"
                ],
                "Kazanımlar": [
                    "Günlük rutinlerini ve günün bölümlerini anlatır (wake up, brush teeth, have breakfast).",
                    "Tam ve buçuk saatleri söyler (It is three o'clock / It is half past two).",
                    "Günlük aktivitelerin zamanını ifade eder."
                ]
            },
            "Unit 6: Fun with Science": {
                "Konular": [
                    "Simple Lab Tools and Scientific Experiments",
                    "Prepositions of Place (in, on, under, in front of, behind)",
                    "Giving Simple Experiment Instructions (Mix the colors, Pour water, Melt the ice)"
                ],
                "Kazanımlar": [
                    "Basit bilimsel deney adımlarını anlar ve eşleştirir.",
                    "Nesnelerin yerini belirten edatları (in, on, under, in front of) kullanır.",
                    "Basit talimatlar verir (Mix the colors, pour the water)."
                ]
            },
            "Unit 7: Jobs": {
                "Konular": [
                    "Occupations (doctor, teacher, firefighter, police officer, nurse, pilot)",
                    "Workplaces (hospital, school, fire station, police station, airport)",
                    "Talking About Jobs and Duties (What do you do? I am a doctor)"
                ],
                "Kazanımlar": [
                    "Meslekleri tanır ve adlandırır (doctor, teacher, pilot, firefighter).",
                    "Kişilerin mesleklerini sorar ve söyler (What is your job? I am a doctor).",
                    "Mesleklerin çalıştıkları yerleri eşleştirir (A teacher works at school)."
                ]
            },
            "Unit 8: My Clothes": {
                "Konular": [
                    "Weather Conditions and Seasons (sunny, rainy, snowy, windy, cold, hot)",
                    "Clothing Items (coat, boots, hat, gloves, umbrella, sunglasses)",
                    "Borrowing and Lending Clothes (Can I borrow your coat?)"
                ],
                "Kazanımlar": [
                    "Mevsimleri ve hava durumunu ifade eder (sunny, rainy, snowy, windy).",
                    "Hava durumuna uygun kıyafetleri söyler (wear a coat, put on boots).",
                    "İhtiyaç duyduğu kıyafetleri rica eder (Can I borrow your umbrella?)."
                ]
            },
            "Unit 9: My Friends": {
                "Konular": [
                    "Describing Physical Appearance (tall, short, slim, plump, dark hair, blue eyes)",
                    "Basic Personality Traits (friendly, helpful, polite, cheerful)",
                    "Introducing Friends Based on Appearance"
                ],
                "Kazanımlar": [
                    "İnsanların fiziksel özelliklerini betimler (tall, short, slim, blue eyes, curly hair).",
                    "Kişilik özelliklerini basitçe ifade eder (friendly, helpful, cheerful).",
                    "Arkadaşını fiziksel görünüşüne göre tanıtır."
                ]
            },
            "Unit 10: Food and Drinks": {
                "Konular": [
                    "Food and Beverage Vocabulary (apple, sandwich, water, milk, soup, pizza)",
                    "Expressing Hunger and Thirst (I am hungry / I am thirsty)",
                    "Offering and Responding Politely (Would you like some water? Yes, please / No, thank you)"
                ],
                "Kazanımlar": [
                    "Yiyecek ve içecek isimlerini söyler.",
                    "Açlık ve tokluk durumunu ifade eder (I am hungry / I am thirsty).",
                    "Yiyecek teklifinde bulunur ve cevap verir (Would you like some water? Yes, please / No, thank you)."
                ]
            }
        },
        "Müzik": {
            "1. Ünite: Nota Bilgisi ve Ritim": {
                "Konular": [
                    "Nota Adları ve Süre Değerleri (Birlik, İkilik, Dörtlük, Sekizlik Notalar)",
                    "Porte, Dizek ve Sol Anahtarının Görevi",
                    "Ritim Kalıpları ve Tartım Çalışmaları"
                ],
                "Kazanımlar": [
                    "Nota adlarını ve süre değerlerini (birlik, ikilik, dörtlük, sekizlik) öğrenir.",
                    "Porte, dizek ve Sol anahtarı kavramlarını kavrar.",
                    "Ritim kalıplarını el çırparak veya çalgıyla seslendirir."
                ]
            },
            "2. Ünite: Şarkı Repertuarı ve Ses Gelişimi": {
                "Konular": [
                    "Türk Halk Müziği ve Türk Sanat Müziği Çocuk Şarkıları",
                    "Okul Marşları ve Belirli Gün Eserleri",
                    "Doğru Duruş, Nefes Kontrolü ve Diksiyon"
                ],
                "Kazanımlar": [
                    "Türk Halk Müziği ve Türk Sanat Müziği çocuk şarkılarını doğru tonla söyler.",
                    "Marşları ve bayram şarkılarını coşkuyla seslendirir.",
                    "Şarkı söylerken nefes kontrolü ve doğru duruş sergiler."
                ]
            },
            "3. Ünite: Çalgıları Tanıma": {
                "Konular": [
                    "Geleneksel Türk Çalgıları (Bağlama, Ney, Kanun, Kaval)",
                    "Batı Müziği Çalgıları (Keman, Piyano, Gitar, Flüt)",
                    "Çalgı Türleri (Telli, Yaylı, Nefesli, Vurmalı Çalgılar)"
                ],
                "Kazanımlar": [
                    "Geleneksel Türk müziği (bağlama, ney, kanun) ve Batı müziği çalgılarını tanır.",
                    "Çalgıları telli, yaylı, nefesli ve vurmalı olarak sınıflandırır.",
                    "Basit ritim aletleriyle ezgilere eşlik eder."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Ünite: Tasarım ve Kompozisyon": {
                "Konular": [
                    "Görsel Sanatlarda Denge, Ritim, Oran ve Vurgu İlkeleri",
                    "Renk Tonları, Sıcak-Soğuk Renk Kontrastı",
                    "Mozaik, Kolaj ve Baskı Teknikleri"
                ],
                "Kazanımlar": [
                    "Görsel sanatlarda denge, ritim, oran ve vurgu ilkelerini uygular.",
                    "Mozaik, kolaj ve baskı tekniklerini kullanarak özgün çalışmalar üretir.",
                    "Renk tonları ve kontrast ilişkilerini resimlerinde kullanır."
                ]
            },
            "2. Ünite: Sanat Tarihi ve Kültürel Miras": {
                "Konular": [
                    "Geleneksel Türk-İslam Sanatları (Hat, Tezhip, Ebru, Minyatür)",
                    "Dünya Sanat Tarihinde Önemli Sanatçılar ve Eserleri",
                    "Tarihî Yapılar, Ören Yerleri ve Müzeler"
                ],
                "Kazanımlar": [
                    "Türk-İslam sanatını (hat, tezhip, ebru, minyatür) tanır ve örnekler inceler.",
                    "Dünya sanat tarihinden ünlü ressamları ve eserlerini keşfeder.",
                    "Tarihi eserleri ve müzeleri ziyaret etme bilinci kazanır."
                ]
            },
            "3. Ünite: Görsel İletişim ve Üç Boyutlu Sanat": {
                "Konular": [
                    "Temel Dijital Çizim ve İllüstrasyon Araçları",
                    "Afiş, Logo ve Sembol Tasarımı",
                    "Kil ve Seramik Şekillendirme ile Sanat Eleştirisi"
                ],
                "Kazanımlar": [
                    "Temel dijital çizim ve tasarım araçlarını tanır.",
                    "Dijital ortamda veya kâğıt üzerinde basit grafik ve afiş çalışmaları yapar.",
                    "Görsel sanat eserlerini saygıyla ve yapıcı şekilde eleştirir."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: Temel Spor Becerileri ve Oyun": {
                "Konular": [
                    "Basketbol, Voleybol ve Futbol Temel Pas, Top Sürme ve Şut Teknikleri",
                    "Takım Oyunlarında Kurallar ve Strateji",
                    "Spor Ahlakı, Fair-Play ve Centilmenlik"
                ],
                "Kazanımlar": [
                    "Basketbol, voleybol ve futbolun temel pas, top sürme ve şut kurallarını öğrenir.",
                    "Takım oyunlarında iş birliği, fair-play ve kurallara uyma davranışı sergiler.",
                    "Koordinasyon, denge ve esneklik gerektiren hareketleri uygular."
                ]
            },
            "2. Ünite: Yaşam Boyu Sağlık ve Egzersiz": {
                "Konular": [
                    "Düzenli Fiziksel Aktivitenin Beden ve Ruh Sağlığına Etkileri",
                    "Isınma ve Soğuma Hareketlerinin Önemi",
                    "Sporcu Beslenmesi, Su Tüketimi ve Dinlenme İlkeleri"
                ],
                "Kazanımlar": [
                    "Düzenli fiziksel aktivitenin beden ve ruh sağlığına faydalarını açıklar.",
                    "Spor yaparken ısınma ve soğuma hareketlerinin önemini kavrar.",
                    "Sağlıklı beslenme ve su tüketiminin spor performansına etkisini değerlendirir."
                ]
            }
        }
    },
    "5. Sınıf": {
        "Türkçe": {
            "1. Tema: Oyun Dünyası": {
                "Konular": [
                    "Geleneksel ve Modern Oyunlar",
                    "Oyun Kuralları ve Dayanışma",
                    "Okuma ve Dinleme Stratejileri",
                    "Söz Varlığı: Eş ve Zıt Anlamlı Kelimeler"
                ],
                "Öğrenim Çıktıları": [
                    "Dinlediklerinde/izlediklerinde geçen bilmediği kelimelerin anlamını bağlamdan hareketle tahmin eder.",
                    "Oyun kültürü ve kurallarını konu alan metinlerdeki açık ve örtük anlamları ayırt eder.",
                    "Metnin ana fikrini ve ana fikri destekleyen yardımcı fikirleri belirler.",
                    "Oyun kurallarını ve aşamalarını işlem basamaklarına uygun biçimde yazılı ve sözlü ifade eder."
                ]
            },
            "2. Tema: Atatürk'ü Tanımak": {
                "Konular": [
                    "Atatürk'ün Çocukluk ve Eğitim Hayatı",
                    "Mustafa Kemal'in Kişilik Özellikleri ve İdealistliği",
                    "Metin İnceleme ve Karakter Tahlili",
                    "Yazım ve Noktalama Kuralları"
                ],
                "Öğrenim Çıktıları": [
                    "Mustafa Kemal Atatürk'ün hayatı ve ilkeleriyle ilgili metinleri doğru telaffuz ve tonlamayla okur.",
                    "Metindeki olayların gelişimini kronolojik sıraya koyar ve neden-sonuç ilişkilerini açıklar.",
                    "Okuduğu metinden hareketle Atatürk'ün vatanseverlik, liderlik ve bilime verdiği önemi analiz eder.",
                    "Büyük harflerin kullanımı ve kesme işaretinin işlevlerini metin üretiminde kurallı uygular."
                ]
            },
            "3. Tema: Duygularımı Tanıyorum": {
                "Konular": [
                    "Empati, Sevgi, Umut ve Korku Temalı Metinler",
                    "Şiirde Duygu ve Ahenk Unsurları",
                    "Öznel ve Nesnel Yargılar",
                    "Duygu Bildiren Hikâye ve Anı Yazma"
                ],
                "Öğrenim Çıktıları": [
                    "Okuduğu metindeki kahramanların duygusal durumlarını ve davranış gerekçelerini yorumlar.",
                    "Şiirlerdeki ana duyguyu, ritmi ve söz sanatlarını (benzetme, kişileştirme) keşfeder.",
                    "Metinlerdeki öznel ve nesnel anlatımlı cümleleri birbirinden ayırt eder.",
                    "Kendi duygu dünyasını yansıtan özgün hikâye veya anı yazısı kaleme alır."
                ]
            },
            "4. Tema: Geleneklerimiz": {
                "Konular": [
                    "Kültürel Miras, Bayramlar ve Misafirperverlik",
                    "Atasözleri ve Deyimlerin Metindeki İşlevi",
                    "Bilgilendirici Metinlerde Başlık-İçerik Uyumu",
                    "Görsel Okuma ve Karikatür Yorumlama"
                ],
                "Öğrenim Çıktıları": [
                    "Kültürel değerlerimizi yansıtan metinlerdeki deyim ve atasözlerinin anlama katkısını değerlendirir.",
                    "Metinle ilgili görselleri, infografikleri ve kültürel ögeleri analiz eder.",
                    "Okuduğu metnin konusuna ve içeriğine uygun yeni başlıklar belirler.",
                    "Gelenek ve göreneklerimizin toplumsal birliğe katkısını savunan düşünce yazısı yazar."
                ]
            },
            "5. Tema: İletişim ve Sosyal İlişkiler": {
                "Konular": [
                    "Etkili Dinleme, Nezaket ve Beden Dili",
                    "Dijital İletişim ve Medya Okuryazarlığı",
                    "Paragrafta Yapı (Giriş, Gelişme, Sonuç)",
                    "Düşünceyi Geliştirme Yolları (Örneklendirme, Karşılaştırma)"
                ],
                "Öğrenim Çıktıları": [
                    "Sözlü iletişimde nezaket kurallarına, ses tonuna ve göz temasına dikkat eder.",
                    "Bilgilendirici metinlerde düşünceyi geliştirme yollarını (tanımlama, örneklendirme) tespit eder.",
                    "Paragrafın ana düşüncesini ve paragraflar arasındaki anlam bütünlüğünü kavrar.",
                    "Eleştirel düşünme yöntemini kullanarak dijital medyadaki bilgilerin güvenirliğini sorgular."
                ]
            },
            "6. Tema: Sağlıklı Yaşıyorum": {
                "Konular": [
                    "Dengeli Beslenme, Spor ve Uyku Düzeni",
                    "Bilgilendirici Metinlerde Sebep-Sonuç ve Amaç-Sonuç Cümleleri",
                    "Grafik ve Tablo Okuma",
                    "Özet Çıkarma ve Sunum Hazırlama"
                ],
                "Öğrenim Çıktıları": [
                    "Sağlık ve spor temalı metinlerdeki sebep-sonuç ve amaç-sonuç ilişkilerini çözümler.",
                    "Sağlıkla ilgili istatistiki tablo ve grafikleri inceleyerek çıkarımlarda bulunur.",
                    "Okuduğu bilgilendirici metni temel noktalarını kaybetmeden kendi ifadeleriyle özetler.",
                    "Sağlıklı yaşam alışkanlıklarını teşvik eden afiş, broşür veya bilgilendirici sunum hazırlar."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Geometrik Şekiller": {
                "Konular": [
                    "Doğru, Doğru Parçası ve Işın",
                    "İki Doğrunun Birbirine Göre Konumları",
                    "Açılar (Dar, Dik, Geniş, Doğru Açı)",
                    "Üçgen ve Dörtgen Çeşitleri ve Temel Elemanları"
                ],
                "Öğrenim Çıktıları": [
                    "Doğru, doğru parçası ve ışını modellerle temsil eder, sembolle gösterir.",
                    "Bir düzlemde iki doğrunun birbirine göre paralel, kesişen ve dik durumlarını açıklar.",
                    "Açıları ölçülerine göre dar, dik, geniş ve doğru açı olarak sınıflandırır.",
                    "Üçgenleri açılarına ve kenar uzunluklarına göre, dörtgenleri (kare, dikdörtgen, paralelkenar, eşkenar dörtgen, yamuk) açı ve kenar özelliklerine göre sınıflandırır."
                ]
            },
            "2. Tema: Sayılar ve Nicelikler: Doğal Sayılar": {
                "Konular": [
                    "En Çok Dokuz Basamaklı Doğal Sayılar",
                    "Basamak ve Sayı Değeri, Bölük Kavramı",
                    "Doğal Sayılarla Dört İşlem Stratejileri",
                    "Zihinden İşlemler ve Tahmin Etme",
                    "Doğal Sayıların Karesi ve Küpü"
                ],
                "Öğrenim Çıktıları": [
                    "En çok dokuz basamaklı doğal sayıları okur, yazar ve bölük-basamak ilişkisini çözümler.",
                    "Doğal sayılarla toplama, çıkarma, çarpma ve bölme işlemlerini akıcı biçimde yürütür.",
                    "Dört işlem içeren problemleri çözerken sonucu tahmin eder ve tahminini gerçek sonuçla karşılaştırır.",
                    "Bir doğal sayının karesini ve küpünü üslü ifade olarak gösterir ve değerini hesaplar."
                ]
            },
            "3. Tema: Geometrik Nicelikler": {
                "Konular": [
                    "Uzunluk Ölçme Birimleri (m, dm, cm, mm, km) ve Dönüşümleri",
                    "Üçgen ve Dörtgenlerin Çevre Uzunlukları",
                    "Dikdörtgenin Alan Bağıntısı ve Birimkareler",
                    "Aynı Alana Sahip Farklı Dikdörtgenler"
                ],
                "Öğrenim Çıktıları": [
                    "Standart uzunluk ölçme birimlerini birbirine dönüştürür ve çevre hesaplama problemlerine uygular.",
                    "Üçgen ve dörtgenlerin çevre uzunluklarını hesaplar, verilen çevreye uygun şekiller çizer.",
                    "Dikdörtgenin alan bağıntısını birim karelerle modeller ve alanını hesaplar.",
                    "Alanı verilen bir dikdörtgenin kenar uzunluklarını tahmin eder ve çevre-alan ilişkisini yorumlar."
                ]
            },
            "4. Tema: Sayılar ve Nicelikler: Kesirler ve Yüzde": {
                "Konular": [
                    "Birim Kesirler ve Sayı Doğrusunda Gösterme",
                    "Bileşik ve Tam Sayılı Kesir Dönüşümleri",
                    "Denk Kesirler ve Sadeleştirme/Genişletme",
                    "Kesirlerle Toplama ve Çıkarma İşlemleri",
                    "Ondalık Gösterim ve Basamak Değerleri",
                    "Yüzde Sembolü (%) ve Kesir-Ondalık Dönüşümleri"
                ],
                "Öğrenim Çıktıları": [
                    "Birim kesirleri sıralar ve sayı doğrusunda modeller.",
                    "Bileşik kesri tam sayılı kesre, tam sayılı kesri bileşik kesre dönüştürür.",
                    "Sadeleştirme ve genişletme yöntemleriyle denk kesirler oluşturur, kesirleri karşılaştırır.",
                    "Paydaları eşit veya birbirinin katı olan kesirlerle toplama ve çıkarma işlemleri yapar.",
                    "Paydası 10, 100 veya 1000 olan kesirleri ondalık gösterimle yazar ve basamak değerlerini belirtir.",
                    "Bir çokluğun belirtilen yüzdesini hesaplar; kesir, ondalık ve yüzde gösterimlerini birbirine dönüştürür."
                ]
            },
            "5. Tema: İstatistiksel Araştırma Süreci": {
                "Konular": [
                    "Araştırma Sorusu Oluşturma",
                    "Veri Toplama, Çetele ve Sıklık Tablosu",
                    "Sütun Grafiği Çizme ve Yorumlama"
                ],
                "Öğrenim Çıktıları": [
                    "Belirli bir amaca yönelik araştırma soruları üretir ve veri toplama yöntemlerini planlar.",
                    "Elde edilen verileri sıklık tablosuna aktarır ve uygun ölçekli sütun grafiği oluşturur.",
                    "Sütun grafiğindeki verileri yorumlayarak araştırma sorusuna ilişkin sonuçlar çıkarır."
                ]
            },
            "6. Tema: İşlemlerle Cebirsel Düşünme": {
                "Konular": [
                    "Sayı ve Şekil Örüntüleri",
                    "Örüntünün Kuralını Bulma ve Adımları Sürdürme",
                    "Eşitlik İlkesi ve Denge Modelleri"
                ],
                "Öğrenim Çıktıları": [
                    "Belirli bir kurala göre artan veya azalan sayı ve şekil örüntülerinin genel kuralını açıklar.",
                    "Kuralı verilen bir örüntünün istenen adımındaki terimi hesaplar.",
                    "Matematiksel eşitliklerdeki bilinmeyen terimi terazi ve denge mantığıyla bulur."
                ]
            },
            "7. Tema: Veriden Olasılığa": {
                "Konular": [
                    "Olayların Gerçekleşme Olasılıkları",
                    "Eşit, Daha Fazla ve Daha Az Olasılıklı Durumlar"
                ],
                "Öğrenim Çıktıları": [
                    "Günlük yaşam deneylerinde olası çıktıları listeler.",
                    "Bir olayın gerçekleşme olasılığını 'kesin', 'imkânsız', 'daha fazla', 'daha az' veya 'eşit' olarak nitelendirir."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Tema: Gökyüzündeki Komşularımız ve Biz": {
                "Konular": [
                    "Güneş'in Yapısı, Katmanları ve Dönme Hareketi",
                    "Ay'ın Yapısı, Atmosferi ve Yüzey Özellikleri",
                    "Ay'ın Hareketleri ve Evreleri (Ana ve Ara Evreler)",
                    "Güneş, Dünya ve Ay'ın Birbirine Göre Hareketleri"
                ],
                "Öğrenim Çıktıları": [
                    "Güneş'in şekil, büyüklük ve geometrik yapısını modeller üzerinden açıklar.",
                    "Ay'ın yüzey özelliklerini (krater, toz tabakası) ve atmosferinin inceliğini sorgular.",
                    "Ay'ın dönme ve dolanma hareketlerini, evrelerinin oluşum sırasını modelleyerek açıklar.",
                    "Güneş, Dünya ve Ay'ın boyutlarını ve birbirlerine göre dönme yönlerini karşılaştırmalı gösterir."
                ]
            },
            "2. Tema: Kuvveti Tanıyalım": {
                "Konular": [
                    "Kuvvetin Tanımı, Büyüklüğü ve Dinamometre",
                    "Kuvvet Birimi (Newton) ve Yayların Esneklik Sınırı",
                    "Sürtünme Kuvveti (Kinetik ve Statik Sürtünme)",
                    "Hava ve Su Direnci, Sürtünmenin Günlük Yaşama Etkileri"
                ],
                "Öğrenim Çıktıları": [
                    "Kuvvetin büyüklüğünü dinamometre ile ölçer ve biriminin Newton (N) olduğunu belirtir.",
                    "Yayların uzama miktarı ile uygulanan kuvvet arasındaki doğrusal ilişkiyi deneyle keşfeder.",
                    "Sürtünme kuvvetinin pürüzlü ve kaygan yüzeylerdeki etkisini karşılaştırır.",
                    "Hava ve su direncinin hareket üzerindeki yavaşlatıcı etkisini deneylerle test eder, günlük hayat tasarımlarını (paraşüt, gemi burnu) açıklar."
                ]
            },
            "3. Tema: Canlıların Yapısına Yolculuk": {
                "Konular": [
                    "Mikroskobik Canlılar (Bakteriler, Amip, Öglena, Paramesyum)",
                    "Mantarlar (Şapkalı, Maya, Küf, Parazit Mantarları)",
                    "Bitkiler (Çiçekli ve Çiçeksiz Bitkiler, Bitki Organları)",
                    "Hayvanlar (Omurgalı ve Omurgasız Hayvanlar)"
                ],
                "Öğrenim Çıktıları": [
                    "Mikroskobik canlıların varlığını mikroskop yardımıyla gözlemler, yararlı ve zararlı türlerini ayırt eder.",
                    "Mantarların bitki olmadığını, besinlerini dışarıdan hazır aldığını ve türlerini sınıflandırır.",
                    "Bitkileri çiçekli ve çiçeksiz olarak gruplandırır; kök, gövde, yaprak ve çiçeğin görevlerini kavrar.",
                    "Hayvanları omurgalı (balıklar, kurbağalar, sürüngenler, kuşlar, memeliler) ve omurgasızlar olarak sınıflandırır."
                ]
            },
            "4. Tema: Işığın Dünyası": {
                "Konular": [
                    "Işığın Doğrusal Yayılması",
                    "Işığın Yansıması ve Yansıma Kanunları (Düzgün ve Dağınık Yansıma)",
                    "Maddelerin Işık Geçirgenliği (Saydam, Yarı Saydam, Opak)",
                    "Tam Gölge Oluşumu ve Gölge Boyunu Etkileyen Değişkenler"
                ],
                "Öğrenim Çıktıları": [
                    "Işığın her yönde ve doğrusal yayıldığını basit deneylerle gösterir.",
                    "Düzgün ve dağınık yansıma olaylarını çizerek yansıma kanunlarını uygular.",
                    "Maddeleri ışığı geçirme durumlarına göre saydam, yarı saydam ve opak olarak sınıflandırır.",
                    "Opak cisimlerin tam gölgesini oluşturur; ışık kaynağı ve cismin konumuna göre gölge boyundaki değişimi analiz eder."
                ]
            },
            "5. Tema: Maddenin Doğası": {
                "Konular": [
                    "Maddenin Hâl Değişimi (Erime, Donma, Buharlaşma, Yoğuşma, Süblimleşme, Kırağılaşma)",
                    "Maddenin Ayırt Edici Özellikleri (Erime Noktası, Donma Noktası, Kaynama Noktası)",
                    "Isı ve Sıcaklık Kavramları Arasındaki Farklar",
                    "Isı Alışverişi ve Isıl Denge",
                    "Genleşme ve Büzülme Olayları"
                ],
                "Öğrenim Çıktıları": [
                    "Maddelerin ısı etkisiyle uğradığı hâl değişimlerini deneylerle gözlemler ve açıklar.",
                    "Saf maddeler için erime, donma ve kaynama noktalarının ayırt edici özellik olduğunu deney verileriyle kanıtlar.",
                    "Isı ile sıcaklık kavramları arasındaki farkı açıklar; ısının bir enerji, sıcaklığın bir gösterge olduğunu kavrar.",
                    "Farklı sıcaklıktaki sıvıların karıştırılmasıyla oluşan ısı alışverişini ve son sıcaklığı yorumlar.",
                    "Katı, sıvı ve gaz maddelerde genleşme ve büzülme olaylarını günlük hayattan örneklerle inceler."
                ]
            },
            "6. Tema: Yaşamımızdaki Elektrik": {
                "Konular": [
                    "Basit Elektrik Devresi Elemanları ve Devre Şemaları",
                    "Devre Elemanlarının Sembolik Gösterimi",
                    "Bağımlı, Bağımsız ve Kontrol Edilen Değişkenler",
                    "Ampul Parlaklığını Etkileyen Faktörler (Pil Sayısı ve Ampul Sayısı)"
                ],
                "Öğrenim Çıktıları": [
                    "Elektrik devresi elemanlarını (pil, ampul, anahtar, iletken tel) standart sembollerle çizer.",
                    "Çalışan bir devre kurarak devre şeması ile gerçek bağlantıyı eşleştirir.",
                    "Bir elektrik devresinde pil sayısı veya ampul sayısı değiştiğinde ampul parlaklığındaki değişimi deneyle araştırır.",
                    "Deney süreçlerinde bağımlı, bağımsız ve sabit tutulan değişkenleri belirler ve kaydeder."
                ]
            },
            "7. Tema: Sürdürülebilir Yaşam ve Geri Dönüşüm": {
                "Konular": [
                    "Doğal Kaynaklar ve İnsan Faaliyetleri",
                    "Çevre Kirliliği (Hava, Su, Toprak ve Işık Kirliliği)",
                    "Geri Dönüşüm, Yeniden Kullanım ve Sıfır Atık Hareketi",
                    "Biyolojik Çeşitliliğin Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "İnsan kaynaklı faaliyetlerin doğal çevreye ve biyoçeşitliliğe verdiği zararları sorgular.",
                    "Atıkların ayrıştırılması, geri dönüşüm ve kompost uygulamalarının ülke ekonomisine katkısını açıklar.",
                    "Sıfır atık prensibine dayalı bireysel çevre projeleri tasarlar ve uygular."
                ]
            }
        },
        "Sosyal Bilgiler": {
            "1. Tema: Birlikte Yaşamak": {
                "Konular": [
                    "Sosyal Rollerimiz ve Bireysel Gelişim",
                    "Hak, Özgürlük ve Sorumluluk Dengesi",
                    "Çocuk Haklarına Dair Sözleşme",
                    "Gruplarda İş Birliği ve Dayanışma"
                ],
                "Öğrenim Çıktıları": [
                    "İçinde bulunduğu gruplardaki rollerini belirler ve rollerine uygun sorumluluklar üstlenir.",
                    "Çocuk Hakları Sözleşmesi'nde yer alan temel haklarının ihlaline karşı bilinç sergiler.",
                    "Toplumsal yaşamda iş birliği, empati ve yardımlaşmanın önemini örnek olaylarla açıklar."
                ]
            },
            "2. Tema: Evimiz Dünya": {
                "Konular": [
                    "Haritalar, Ölçek ve Harita İşaretleri (Lejant)",
                    "Türkiye'nin Fiziki Coğrafyası (Dağlar, Ovalar, Platolar, Akarsular)",
                    "İklim Tipleri ve İnsan Yaşamına Etkisi",
                    "Doğal Afetler ve Çevre Sorunları"
                ],
                "Öğrenim Çıktıları": [
                    "Fiziki ve beşerî haritalar üzerindeki sembolleri (lejant) doğru okuyarak konum analizi yapar.",
                    "Yaşadığı çevrenin ve Türkiye'nin temel yeryüzü şekillerini harita üzerinde gösterir.",
                    "Karadeniz, Akdeniz ve Karasal iklimlerin konut tiplerine, giyime ve tarımsal üretime etkilerini karşılaştırır.",
                    "Doğal afetlerin nedenlerini ve afet anında yapılması gereken güvenlik adımlarını açıklar."
                ]
            },
            "3. Tema: Ortak Mirasımız": {
                "Konular": [
                    "Anadolu ve Mezopotamya Uygarlıkları (Hititler, Frigler, Lidyalılar, Urartular, Sümerler, Babiller, Asurlar)",
                    "Tarihî Mekânlar, Nesneler ve Doğal Varlıklar",
                    "Kültürel Zenginliklerimiz ve Somut Olmayan Kültürel Miras"
                ],
                "Öğrenim Çıktıları": [
                    "Anadolu ve Mezopotamya uygarlıklarının insanlık tarihine ve bilime katkılarını inceler.",
                    "Çevresindeki ve Türkiye'deki tarihî eserler ile doğal güzellikleri ayırt ederek koruma bilinci edinir.",
                    "Halk oyunları, bayramlar, düğünler gibi kültürel unsurların birlik ve beraberliğe katkısını değerlendirir."
                ]
            },
            "4. Tema: Yaşayan Demokrasimiz": {
                "Konular": [
                    "Toplumsal Kuralların Gerekliliği",
                    "Merhâmet, Adalet ve Eşitlik İlkeleri",
                    "Sivil Toplum Kuruluşları (STK) ve Toplumsal Katılım",
                    "Resmî Kurumlar ve Hizmet Alanları"
                ],
                "Öğrenim Çıktıları": [
                    "Yazılı ve yazısız kuralların toplumsal barış ve adalet için vazgeçilmez olduğunu açıklar.",
                    "Toplumsal sorunların çözümünde sivil toplum kuruluşlarının ve resmî kurumların işlevlerini inceler.",
                    "Okul meclisleri ve sınıf kararlarında demokratik süreçleri uygulayarak katılım sağlar."
                ]
            },
            "5. Tema: Hayatımızdaki Ekonomi": {
                "Konular": [
                    "Bölgemizin Ekonomik Faaliyetleri (Tarım, Hayvancılık, Sanayi, Turizm, Madencilik)",
                    "Ekonomik Faaliyetlerin Mesleklerle İlişkisi",
                    "Üretim, Dağıtım ve Tüketim Ağı",
                    "Bilinçli Tüketici Hakları ve Bütçe"
                ],
                "Öğrenim Çıktıları": [
                    "Yaşadığı bölgenin coğrafi özellikleriyle yürütülen ekonomik faaliyetler arasında bağ kurar.",
                    "Ekonomik faaliyetlerin çeşitlenmesiyle ortaya çıkan meslek gruplarını tanır.",
                    "Bir ürünün tarladan/fabrikadan sofraya geliş sürecindeki üretim ve dağıtım zincirini açıklar.",
                    "Bilinçli bir tüketici olarak haklarını arama yollarını (Tüketici Hakem Heyetleri) ve bütçe planlamasını uygular."
                ]
            },
            "6. Tema: Teknoloji ve Sosyal Bilimler": {
                "Konular": [
                    "Teknolojinin Sosyal ve Kültürel Hayata Etkileri",
                    "Bilimsel Araştırma Basamakları ve Akademik Dürüstlük",
                    "Telif, Patent ve Bilişim Etiği"
                ],
                "Öğrenim Çıktıları": [
                    "Teknolojik araçların sosyalleşme ve aile içi iletişime olumlu/olumsuz etkilerini tartışır.",
                    "Bilimsel bir araştırmada kaynakça belirtmenin, telif haklarına ve intihal kurallarına uymanın önemini açıklar.",
                    "İnternet ortamında bilgi güvenliği ve etik davranış kurallarına uyar."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Allah İnancı": {
                "Konular": [
                    "Evrendeki Mükemmel Düzen ve Allah'ın Varlığı",
                    "Allah'ın İsim ve Sıfatları (Rahman, Rahim, İlim, Kudret, Semi, Basar)",
                    "Dua ve İbadetin İnsan Hayatındaki Yeri",
                    "İhlas Suresi ve Anlamı"
                ],
                "Öğrenim Çıktıları": [
                    "Evrendeki ölçü, denge ve ahenkten hareketle Allah'ın varlığı ve birliği hakkında çıkarımlarda bulunur.",
                    "Allah'ın zati ve subuti sıfatlarının anlamlarını açıklar.",
                    "Duanın anlamını, adabını ve Allah ile kul arasındaki iletişimi güçlendiren yönünü kavrar.",
                    "İhlas suresini doğru telaffuzla okur ve tevhit inancını yansıtan mesajını açıklar."
                ]
            },
            "2. Tema: Peygamberlere İman": {
                "Konular": [
                    "Peygamberlik Kavramı ve Peygamberlerin Nitelikleri (Sıdk, Emanet, Fetanet, İsmet, Tebliğ)",
                    "İlahi Kitaplar ve Vahiy Kavramı",
                    "Hz. İbrahim'in Tevhit Mücadelesi"
                ],
                "Öğrenim Çıktıları": [
                    "Peygamberlerin insanlara doğru yolu göstermek için gönderilmiş elçiler olduğunu açıklar.",
                    "Peygamberlerin ortak ahlaki niteliklerini ve güvenilirliklerini modellerle gösterir.",
                    "Hz. İbrahim'in akıl yürüterek putperestliğe karşı verdiği tevhit mücadelesini kavrar."
                ]
            },
            "3. Tema: İbadet ve Temizlik": {
                "Konular": [
                    "Maddi ve Manevi Temizlik (Taharet)",
                    "Namaz İbadetinin Önemi ve Hazırlık Aşamaları (Abdest, Gusül, Teyemmüm)",
                    "Namazın Kılınış Şekli ve Vakitleri"
                ],
                "Öğrenim Çıktıları": [
                    "İslam'ın beden, elbise, çevre ve kalp temizliğine verdiği önemi değerlendirir.",
                    "Abdestin alınışını ve namazın şartlarını uygulamalı olarak öğrenir.",
                    "Günde beş vakit namazın bireye kazandırdığı zaman bilincini ve ruhsal huzuru açıklar."
                ]
            },
            "4. Tema: Güzel Ahlak": {
                "Konular": [
                    "Nezaket, Saygı ve Sevgi Dili",
                    "Selamlaşma Adabı ve Ziyaret Kuralları",
                    "Sofra Adabı ve Konuşma Ahlakı",
                    "Tahiyyat Duası ve Anlamı"
                ],
                "Öğrenim Çıktıları": [
                    "Günlük iletişimde nezaket kurallarına, tatlı dilli ve yapıcı olmaya özen gösterir.",
                    "Selamlaşmanın sevgi ve kardeşlik bağlarını güçlendirici rolünü kavrar.",
                    "Yeme-içme ve misafirlikte İslami ahlak ilkelerini sergiler.",
                    "Tahiyyat duasını ezbere okur ve anlamını açıklar."
                ]
            },
            "5. Tema: Hz. Muhammed'in Hayatı": {
                "Konular": [
                    "Hz. Muhammed'in Doğumu, Ailesi ve Çocukluğu",
                    "Gençlik Yılları ve Hilfü'l-Fudûl (Erdemliler Birliği)",
                    "İlk Vahiy ve Mekke Dönemi Tebliği"
                ],
                "Öğrenim Çıktıları": [
                    "Hz. Muhammed'in çocukluk ve gençlik yıllarındaki ahlaki erdemlerini inceler.",
                    "Gençliğinde adaletsizliğe karşı kurulan Hilfü'l-Fudûl topluluğundaki rolünü kavrar.",
                    "Hira Mağarası'ndaki ilk vahiy sürecini ve İslam'a davetin ilk adımlarını açıklar."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: Hello": {
                "Konular": [
                    "Greetings and Introductions",
                    "Countries, Nationalities and Languages",
                    "School Subjects (Maths, Science, Art, History, PE)",
                    "Expressing Likes, Dislikes and Preferences"
                ],
                "Öğrenim Çıktıları": [
                    "Exchanges personal information regarding country, nationality and native language.",
                    "Talks about school timetables and expresses likes/dislikes about academic subjects.",
                    "Understands simple audio recordings about international students introducing themselves."
                ]
            },
            "Theme 2: My Town": {
                "Konular": [
                    "Public Buildings and Places in Town (library, bakery, pharmacy, cinema)",
                    "Prepositions of Place (opposite, between, next to, behind, in front of)",
                    "Asking for and Giving Directions (Turn left, Go straight, Take the second right)"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies municipal buildings and their functions on an illustrated town map.",
                    "Asks for and understands directional instructions to reach specific destinations.",
                    "Describes the exact location of buildings using advanced spatial prepositions."
                ]
            },
            "Theme 3: Games and Hobbies": {
                "Konular": [
                    "Indoor and Outdoor Games (blind man's buff, hopscotch, chess, cycling)",
                    "Expressing Abilities and Inabilities with 'Can / Can't'",
                    "Asking and Talking About Hobbies and Leisure Time"
                ],
                "Öğrenim Çıktıları": [
                    "Names various leisure games and sports activities accurately.",
                    "Expresses personal abilities and limitations clearly using modal structures.",
                    "Interviews peers about their weekend hobbies and presents findings."
                ]
            },
            "Theme 4: My Daily Routine": {
                "Konular": [
                    "Daily Activities and Morning/Evening Routines",
                    "Telling the Time (digital, analog, quarter past/to, half past)",
                    "Cardinal Numbers (1-100)",
                    "Simple Present Tense with Daily Routines"
                ],
                "Öğrenim Çıktıları": [
                    "Describes regular daily routines using accurate time expressions.",
                    "Tells the exact time in both formal and conversational structures.",
                    "Reads and writes numbers from 1 to 100 in diverse contextual settings."
                ]
            },
            "Theme 5: Health": {
                "Konular": [
                    "Common Illnesses (headache, stomachache, sore throat, cough, measles)",
                    "Expressing Physical Ailments and Needs",
                    "Giving Suggestions and Advice with 'Should / Shouldn't'"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies and verbalizes common illnesses and physical symptoms.",
                    "Offers practical health suggestions to someone who feels unwell using 'should/shouldn't'.",
                    "Understands simple conversations between a patient and a medical professional."
                ]
            },
            "Theme 6: Movies": {
                "Konular": [
                    "Movie Types (animation, comedy, drama, sci-fi, horror)",
                    "Describing Movie Characters and Personalities",
                    "Expressing Opinions and Giving Reasons (I think, because...)"
                ],
                "Öğrenim Çıktıları": [
                    "Classifies movies into distinct genres according to posters and plot summaries.",
                    "Describes movie characters using personality and appearance adjectives.",
                    "Expresses reasoned opinions and preferences about films they have watched."
                ]
            },
            "Theme 7: Party Time": {
                "Konular": [
                    "Months of the Year and Ordinal Numbers (1st - 31st)",
                    "Expressing Dates and Birthdays",
                    "Party Types and Preparations (invitation cards, candles, balloons, gifts)",
                    "Expressing Obligations and Permissions (must, can)"
                ],
                "Öğrenim Çıktıları": [
                    "States calendar dates and birthdays correctly using ordinal numbers.",
                    "Writes a simple invitation card for a birthday celebration or themed party.",
                    "Expresses basic needs and permissions required for hosting an event."
                ]
            },
            "Theme 8: Fitness": {
                "Konular": [
                    "Sports and Exercise Types (jogging, swimming, aerobics, weightlifting)",
                    "Making, Accepting and Refusing Suggestions (Let's..., How about...?)",
                    "Expressing Excuses Politely"
                ],
                "Öğrenim Çıktıları": [
                    "Names sports disciplines and equipment needed for athletic activities.",
                    "Makes, accepts, and declines activity suggestions politely with sound excuses.",
                    "Conducts simple surveys on class sporting habits and records the data."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Tema: Bilişim Teknolojilerinin Hayatımızdaki Yeri": {
                "Konular": [
                    "Bilişim Teknolojilerinin Temel Kavramları",
                    "Bilgisayar Donanım Parçaları (Dahili ve Harici Donanımlar)",
                    "Yazılım Türleri (Sistem Yazılımları ve Uygulama Yazılımları)",
                    "Dosya Yönetimi, Klasörleme ve Uzantılar"
                ],
                "Öğrenim Çıktıları": [
                    "Donanım ve yazılım bileşenlerini ayırt eder, temel bilgisayar mimarisini açıklar.",
                    "İşletim sistemlerinin görevlerini kavrar ve masaüstü yönetimini etkin kullanır.",
                    "Dosya uzantılarını (doc, pdf, jpg, mp3 vb.) dosya türleriyle doğru eşleştirir ve düzenli klasörleme yapar."
                ]
            },
            "2. Tema: Bilişim Etiği ve Güvenlik": {
                "Konular": [
                    "Dijital Vatandaşlık ve Bilişim Etiği",
                    "Siber Zorbalık ve İnternet Tehditleri",
                    "Güçlü Parola Oluşturma ve Bilgi Güvenliği",
                    "Telif Hakları, Lisans Türleri ve Açık Kaynak"
                ],
                "Öğrenim Çıktıları": [
                    "Sanal ortamda etik ilkelere, saygı ve nezaket kurallarına uygun davranır.",
                    "Siber zorbalıkla karşılaştığında izleyeceği güvenlik adımlarını açıklar.",
                    "Kişisel verilerini koruyacak güçlü şifre kombinasyonları oluşturur.",
                    "Dijital içeriklerde telif haklarına ve Creative Commons lisanslarına saygı duyar."
                ]
            },
            "3. Tema: İletişim, Araştırma ve İş Birliği": {
                "Konular": [
                    "İnternet ve Arama Motorlarında Doğru Bilgiye Ulaşma",
                    "E-Posta Yönetimi ve İletişim Protokolleri",
                    "Bulut Depolama ve Ortak Doküman Çalışması"
                ],
                "Öğrenim Çıktıları": [
                    "Arama motorlarında anahtar kelimeleri ve filtreleme araçlarını kullanarak doğru bilgiye ulaşır.",
                    "E-posta yazım kurallarına uygun biçimde güvenli mesajlaşma yürütür.",
                    "Bulut araçlarıyla iş birlikli dosya paylaşımı ve ortak doküman düzenleme yapar."
                ]
            },
            "4. Tema: Problem Çözme ve Algoritmalar": {
                "Konular": [
                    "Problem Çözme Basamakları ve Problem Analizi",
                    "Algoritma Kavramı ve Günlük Yaşam Algoritmaları",
                    "Akış Şemaları ve Temel Şekiller",
                    "Blok Tabanlı Kodlamaya Giriş (Scratch Ortamı)"
                ],
                "Öğrenim Çıktıları": [
                    "Karmaşık bir problemi alt bileşenlerine ayırarak adım adım çözüm planı oluşturur.",
                    "Günlük yaşam durumlarına yönelik algoritmalar tasarlar ve akış şemalarıyla gösterir.",
                    "Blok tabanlı kodlama platformunda karakter hareketi, ses ve temel görsel komutları çalıştırır."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "Ses Değerleri ve Nota İşaretleri",
                    "İstiklal Marşı'nın Müzikal Yapısı ve Doğru Söylenişi",
                    "Sesin Yüksekliği ve Gürlük Düzeyleri",
                    "Türk Halk ve Sanat Müziği Çalgıları"
                ],
                "Öğrenim Çıktıları": [
                    "Nota adlarını ve süre değerlerini porte üzerinde ayırt eder.",
                    "İstiklal Marşı'nı usulüne, nefes yerlerine ve tonuna uygun olarak seslendirir.",
                    "Müzik eserlerindeki hız ve dinamik basamaklarını (forte, piyano) ayırt eder.",
                    "Geleneksel Türk müziği çalgılarını (bağlama, tambur, ney, kaval) ses özelliklerine göre tanır."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Blokflüt veya Melodika Çalma Teknikleri",
                    "Ritim Kalıpları ile Şarkı Eşliği",
                    "Özgün Melodi ve Ritim Motifi Üretme"
                ],
                "Öğrenim Çıktıları": [
                    "Temel bir ezgi çalgısında doğru parmak ve nefes tekniklerini kullanarak eserler icra eder.",
                    "Öğrendiği çocuk şarkılarına ve marşlara vurmalı çalgılarla doğru ritimle eşlik eder.",
                    "Verilen bir metin veya duyguya uygun özgün ritmik modeller tasarlar."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü": {
                "Konular": [
                    "Sanat Elemanları (Nokta, Çizgi, Leke, Doku, Renk)",
                    "Anadolu Medeniyetleri Sanat Mirası",
                    "Müze Bilinci ve Sanat Eseri Eleştirisi"
                ],
                "Öğrenim Çıktıları": [
                    "Sanat yapıtlarında kullanılan temel tasarım elemanlarını inceler ve çözümler.",
                    "Anadolu coğrafyasında yaşamış uygarlıkların sanat eserlerini tanır.",
                    "Bir sanat eserini konusu, rengi ve tekniği bakımından yapıcı biçimde eleştirir."
                ]
            },
            "2. Tema: Sanatsal Tasarım": {
                "Konular": [
                    "Perspektif Başlangıcı (Tek Kaçışlı Perspektif)",
                    "Renk Armonisi ve Sıcak-Soğuk Renk Zıtlığı",
                    "Kil ve Seramik ile Şekillendirme"
                ],
                "Öğrenim Çıktıları": [
                    "Tek kaçışlı perspektif kurallarını uygulayarak mekân ve yol çizimleri yapar.",
                    "Resimlerinde renk armonilerini ve kontrastlarını bilinçli kullanır.",
                    "Yoğurma maddeleriyle üç boyutlu özgün figürler ve objeler tasarlar."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Atletik Beceriler (Koşular, Uzun Atlama, Fırlatma)",
                    "Temel Jimnastik Hareketleri ve Denge",
                    "Top Kontrolü ve Paslaşma Becerileri"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı mesafelerde tempolu koşu ve engelli atlama becerilerini teknik kurallara uygun sergiler.",
                    "Jimnastik minderinde öne/arkaya yuvarlanma ve amut hazırlık dengelerini sağlar.",
                    "Basketbol, voleybol ve futbolda temel sürüş, göğüs pası ve top sektirme hareketlerini uygular."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Fiziksel Uygunluk Bileşenleri (Esneklik, Kuvvet, Çeviklik)",
                    "Spor Ahlakı ve Fair-Play",
                    "Egzersizde Nabız Kontrolü ve Sağlık Güvenliği"
                ],
                "Öğrenim Çıktıları": [
                    "Kişisel fiziksel uygunluk testlerini (mekik, şınav, otur-eriş) uygular ve kaydeder.",
                    "Yarışmalarda rakibe saygı ve kurallara riayet ederek centilmenlik ruhu sergiler.",
                    "Egzersiz öncesi ve sonrası nabzını ölçerek dinlenmenin ve sıvı alımının önemini açıklar."
                ]
            }
        },
        "Seçmeli Zeka Oyunları": {
            "1. Tema: Akıl Yürütme": {
                "Konular": [
                    "Mantık bulmacaları çözer",
                    "'Akıl Yürütme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Akıl Yürütme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Akıl Yürütme' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Akıl Yürütme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Mantık bulmacaları çözer.",
                    "'Akıl Yürütme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Akıl Yürütme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Akıl Yürütme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Akıl Yürütme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            },
            "2. Tema: Problem Çözme": {
                "Konular": [
                    "Zeka oyunlarında alternatif yollar bulur",
                    "'Problem Çözme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Problem Çözme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Problem Çözme' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Problem Çözme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Zeka oyunlarında alternatif yollar bulur.",
                    "'Problem Çözme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Problem Çözme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Problem Çözme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Problem Çözme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            }
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "1. Tema: Daily Life": {
                "Konular": [
                    "Günlük konuşmaları anlar",
                    "'Daily Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Daily Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Daily Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Daily Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Günlük konuşmaları anlar.",
                    "'Daily Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Daily Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Daily Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Daily Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        }
    },
    "6. Sınıf": {
        "Türkçe": {
            "1. Tema: Dilimizin Zenginliği": {
                "Konular": [
                    "Türkçenin Tarihi Gelişimi ve Söz Varlığı",
                    "Deyimler, Atasözleri ve Vecizeler",
                    "Sözcükte Anlam (Gerçek, Mecaz, Terim Anlam)",
                    "Kökler ve Ekler (İsim ve Fiil Kökleri, Yapım ve Çekim Ekleri)"
                ],
                "Öğrenim Çıktıları": [
                    "Kelimelerin gerçek, mecaz ve terim anlamlarını metin bağlamında ayırt eder.",
                    "Atasözü ve deyimlerin kültürel değerlerimizi yansıtan derin anlamlarını analiz eder.",
                    "Kelimeleri köklerine ve aldıkları eklere ayırarak yapım eklerinin türetme işlevini kavrar.",
                    "Söz varlığını zenginleştiren edebi metinleri akıcı ve vurgulu seslendirir."
                ]
            },
            "2. Tema: Bağımsızlık Yolu": {
                "Konular": [
                    "Millî Mücadele ve Çanakkale Destanı",
                    "Vatan, Bayrak ve Şehitlik Temalı Şiirler",
                    "İsimler (Adlar) ve İsim Tamlamaları",
                    "Metin Türleri: Anı (Hatıra) ve Mektup"
                ],
                "Öğrenim Çıktıları": [
                    "Millî Mücadele ruhunu işleyen metinlerdeki duygu, düşünce ve olay örgüsünü çözümler.",
                    "İsim tamlamalarını (belirtili, belirtisiz, zincirleme) metin üzerinde bulur ve yazar.",
                    "Anı ve mektup türlerinin özelliklerini ayırt eder, kendi hayatından bir anıyı kaleme alır.",
                    "Şiirlerdeki ritim, ölçü, kafiye ve ahenk ögelerini değerlendirir."
                ]
            },
            "3. Tema: Farklı Dünyalar": {
                "Konular": [
                    "Bilim Kurgu ve Fantastik Edebiyat",
                    "Hayal Gücüne Dayalı Hikâye Edici Metinler",
                    "Sıfatlar (Ön Adlar) ve Sıfat Tamlamaları",
                    "Metindeki Gerçek ve Kurgusal Unsurlar"
                ],
                "Öğrenim Çıktıları": [
                    "Metindeki gerçekçi unsurlarla hayal ürünü (kurgusal) ögeleri karşılaştırır.",
                    "Varlıkların durum, biçim, renk ve sayılarını belirten sıfatları metin içinde tespit eder.",
                    "Giriş, gelişme ve sonuç planına uyarak özgün bir bilim kurgu hikâyesi kurgular.",
                    "Kurgusal metinlerdeki anlatıcı bakış açılarını (birinci ve üçüncü kişi) belirler."
                ]
            },
            "4. Tema: İletişim ve Sosyal İlişkiler": {
                "Konular": [
                    "Toplumsal Hoşgörü, Empati ve Dayanışma",
                    "Zamirler (Adıllar) ve Türleri",
                    "Münazara ve Tartışma Kuralları",
                    "Noktalama İşaretleri (Noktalı Virgül, Yay Ayraç)"
                ],
                "Öğrenim Çıktıları": [
                    "İsmin yerini tutan zamirleri (kişi, işaret, belgisiz, soru) metin bağlamında işlevine göre kullanır.",
                    "Bir konu hakkında tez ve antitez üreterek kurallı bir münazara yürütür.",
                    "Noktalı virgül ve yay ayraç işaretlerinin doğru kullanım alanlarını metinlerinde sergiler.",
                    "İletişim çatışmalarını önleyen yapıcı bir dil ve üslup geliştirir."
                ]
            },
            "5. Tema: Bilim ve Teknoloji": {
                "Konular": [
                    "Yapay Zekâ, Bilişim ve İnovasyon Metinleri",
                    "Edat, Bağlaç ve Ünlemler",
                    "Grafik, Tablo ve İnfografik Okuma",
                    "Bilgilendirici Metin Türleri: Makale ve Gezi Yazısı"
                ],
                "Öğrenim Çıktıları": [
                    "Cümleler arasında anlam ilgisi kuran edat, bağlaç ve duygu belirten ünlemleri ayırt eder.",
                    "Bilimsel ve teknik verileri içeren infografikleri ve tabloları analiz eder.",
                    "Gezi yazısı ve makale türlerinin biçimsel ve içerik özelliklerini kavrar.",
                    "Teknolojinin etik boyutunu ele alan gerekçelendirilmiş bir düşünce yazısı yazar."
                ]
            },
            "6. Tema: Lider Ruhlar": {
                "Konular": [
                    "Tarihe Yön Veren Şahsiyetler ve Bilim İnsanları",
                    "Metinler Arası Karşılaştırma",
                    "Biyografi ve Otobiyografi Türleri",
                    "Yazım Kuralları (Birleşik Sözcüklerin Yazımı)"
                ],
                "Öğrenim Çıktıları": [
                    "Biyografi ve otobiyografi metinlerini inceleyerek liderlerin kişilik özelliklerini tahlil eder.",
                    "Aynı temayı işleyen iki farklı metnin dil, üslup ve bakış açısını karşılaştırır.",
                    "Birleşik sözcüklerin, ikilemelerin ve 'ki'/'de' bağlaçlarının yazımını kurallara uygun yürütür.",
                    "Örnek aldığı bir tarihî veya bilimsel şahsiyetin hayatını tanıtan metin yazar."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Sayılar ve Nicelikler": {
                "Konular": [
                    "Doğal Sayılarla İşlemler ve İşlem Önceliği",
                    "Doğal Sayıların Çarpanları ve Katları",
                    "Bölünebilme Kuralları (2, 3, 4, 5, 6, 9, 10)",
                    "Asal Sayılar ve Asal Çarpanlara Ayırma",
                    "İki Doğal Sayının Ortak Bölenleri ve Ortak Katları",
                    "Kümeler (Eleman, Liste, Venn Şeması, Kesişim ve Birleşim)"
                ],
                "Öğrenim Çıktıları": [
                    "Çok adımlı işlemlerde işlem önceliği sırasını (parantez, üslü ifade, çarpma/bölme, toplama/çıkarma) uygular.",
                    "Doğal sayıların çarpanlarını listeler; 2, 3, 4, 5, 6, 9 ve 10 ile kalansız bölünebilme kurallarını kullanır.",
                    "Asal sayıları tanır ve bir sayıyı asal çarpan algoritmasıyla asal çarpanlarına ayırır.",
                    "İki doğal sayının ortak bölenlerini ve ortak katlarını belirler, ilgili problemleri çözer.",
                    "Kümeler ile ilgili temel kavramları açıklar; kümelerde kesişim ve birleşim işlemlerini modeller."
                ]
            },
            "2. Tema: İşlemlerle Cebirsel Düşünme ve Değişimler": {
                "Konular": [
                    "Tam Sayılar (Pozitif, Negatif, Sayı Doğrusu)",
                    "Tam Sayıların Karşılaştırılması ve Mutlak Değer",
                    "Kesirlerle Dört İşlem (Toplama, Çıkarma, Çarpma, Bölme)",
                    "Ondalık Gösterimle Bölme ve Çarpma",
                    "Ondalık Gösterimleri Yuvarlama"
                ],
                "Öğrenim Çıktıları": [
                    "Negatif ve pozitif tam sayıları günlük yaşam durumlarıyla ilişkilendirir, sayı doğrusunda sıralar.",
                    "Tam sayıların mutlak değerini bir sayının sıfıra olan uzaklığı olarak açıklar ve karşılaştırır.",
                    "Kesirlerle çarpma ve bölme işlemlerini modellerle açıklar ve dört işlem problemlerini çözer.",
                    "Ondalık gösterimleri basamak değerlerine göre yuvarlar, çarpma ve bölme işlemlerini yürütür."
                ]
            },
            "3. Tema: Oran ve Cebirsel İfadeler": {
                "Konular": [
                    "Oran Kavramı ve Oranın Gösterimi",
                    "Birimli ve Birimsiz Oran Ayrımı",
                    "Cebirsel İfadelerin Anlamı ve Terimleri",
                    "Cebirsel İfadelerin Değerini Hesaplama"
                ],
                "Öğrenim Çıktıları": [
                    "İki çokluğun birbirine oranını belirler, kesir biçiminde ifade eder.",
                    "Aynı veya farklı birimlere sahip çoklukların oranını birimli ve birimsiz oran olarak sınıflandırır.",
                    "Sözel ifadelere uygun harfli (cebirsel) ifadeler yazar; değişken, terim, katsayı ve sabit terimi belirler.",
                    "Cebirsel ifadelerin verilen değişken değerine göre sayısal değerini hesaplar."
                ]
            },
            "4. Tema: Geometrik Şekiller ve Nicelikler": {
                "Konular": [
                    "Açılar (Komşu, Tümler, Bütünler, Ters Açılar)",
                    "Üçgenin Alan Bağıntısı ve Yükseklik",
                    "Paralelkenarın Alan Bağıntısı",
                    "Alan Ölçü Birimleri (m², dm², cm², mm²) ve Arazi Ölçüleri (Ar, Dekar, Hektar)"
                ],
                "Öğrenim Çıktıları": [
                    "Komşu, tümler, bütünler ve ters açıların özelliklerini belirler ve açı problemlerini çözer.",
                    "Üçgenin alan bağıntısını taban ve yükseklik ilişkisiyle açıklar, alan hesaplamaları yapar.",
                    "Paralelkenarın alan bağıntısını dikdörtgenle ilişkilendirerek kavrar.",
                    "Alan ölçü birimleri ve arazi ölçü birimleri (dönüm, hektar) arasındaki dönüşümleri yapar."
                ]
            },
            "5. Tema: Çember ve Geometrik Cisimler": {
                "Konular": [
                    "Çemberin Temel Elemanları (Merkez, Yarıçap, Çap)",
                    "Çemberin Çevre Uzunluğu ve Pi Sayısı (π)",
                    "Dikdörtgenler Prizmasının Hacmi ve Hacim Bağıntısı",
                    "Hacim Ölçü Birimleri ve Sıvı Ölçüleri (Litre, Desimetreküp İlişkisi)"
                ],
                "Öğrenim Çıktıları": [
                    "Çember ile daire arasındaki farkı açıklar; merkez, çap ve yarıçap kavramlarını çizer.",
                    "Çemberin çevre uzunluğunu pi (π) sayısı yardımıyla hesaplar.",
                    "Dikdörtgenler prizmasının hacmini birim küplerle modeller ve en-boy-yükseklik çarpımıyla hesaplar.",
                    "Hacim ölçü birimleri (m³, dm³, cm³) ile sıvı ölçü birimleri (litre, mililitre) arasındaki geçişleri yapar."
                ]
            },
            "6. Tema: İstatistiksel Araştırma ve Veri Analizi": {
                "Konular": [
                    "İki Veri Grubuna Ait Araştırma Soruları",
                    "İkili Sıklık Tablosu ve İkili Sütun Grafiği",
                    "Aritmetik Ortalama ve Açıklık Kavramları"
                ],
                "Öğrenim Çıktıları": [
                    "İki farklı veri grubunu karşılaştırmayı gerektiren araştırma soruları üretir ve veri toplar.",
                    "Toplanan verileri ikili sütun grafiği ile görselleştirir ve gruplar arası karşılaştırma yapar.",
                    "Bir veri grubunun aritmetik ortalamasını ve açıklığını hesaplayarak verilerin dağılımını yorumlar."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Tema: Güneş Sistemi ve Tutulmalar": {
                "Konular": [
                    "Güneş Sistemindeki Gezegenler (İç ve Dış Gezegenler)",
                    "Asteroitler, Meteorlar ve Gök Taşları",
                    "Güneş Tutulması Olayı ve Koşulları",
                    "Ay Tutulması Olayı ve Koşulları"
                ],
                "Öğrenim Çıktıları": [
                    "Güneş sistemindeki gezegenleri Güneş'e olan uzaklıklarına ve yapısal özelliklerine (karasal/gazsal) göre sıralar.",
                    "Asteroit, meteor ve gök taşı kavramlarını modeller üzerinden ayırt eder.",
                    "Güneş ve Ay tutulmalarını Dünya, Güneş ve Ay'ın birbirine göre konumlarını çizerek modeller.",
                    "Güneş ve Ay tutulmalarının her ay gerçekleşmeme nedenini yörünge eğikliği üzerinden açıklar."
                ]
            },
            "2. Tema: Vücudumuzdaki Sistemler": {
                "Konular": [
                    "Destek ve Hareket Sistemi (Kemikler, Eklemler, Kaslar)",
                    "Sindirim Sistemi (Mekanik ve Kimyasal Sindirim, Sindirime Yardımcı Organlar)",
                    "Dolaşım Sistemi (Kalbin Yapısı, Kan Damarları, Büyük ve Küçük Kan Dolaşımı, Kan Grupları)",
                    "Solunum Sistemi (Solunum Organları, Gaz Alışverişi)",
                    "Boşaltım Sistemi (Böbrekler, Nefronlar ve Boşaltıma Yardımcı Organlar)"
                ],
                "Öğrenim Çıktıları": [
                    "Kemik çeşitlerini, eklem türlerini ve kas tiplerini (çizgili, düz, kalp) yapı ve görevlerine göre sınıflandırır.",
                    "Besinlerin kimyasal sindiriminin başladığı ve bittiği organları, enzimlerin rolünü açıklar.",
                    "Kalbin yapısını, kan damarlarını ve küçük/büyük kan dolaşımının amacını modeller üzerinde gösterir.",
                    "Akciğerlerde gerçekleşen gaz değişimini solunum sistemi modelleri kurarak açıklar.",
                    "Böbreklerin kanı süzme işlevini ve atık maddelerin vücuttan uzaklaştırılma yollarını açıklar."
                ]
            },
            "3. Tema: Kuvvet ve Hareket": {
                "Konular": [
                    "Bileşke Kuvvet (Net Kuvvet) Kavramı",
                    "Aynı Doğrultulu ve Zıt Yönlü Kuvvetlerin Bileşkesi",
                    "Dengelenmiş ve Dengelenmemiş Kuvvetler",
                    "Sabit Süratli Hareket ve Yol-Zaman Grafikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Bir cisme etki eden birden fazla kuvvetin bileşkesini büyüklük ve yön bakımından hesaplar.",
                    "Dengelenmiş kuvvetler etkisindeki bir cismin durma veya sabit süratle hareket durumunu ayırt eder.",
                    "Sabit süratli hareket yapan bir cismin yol, zaman ve sürat ilişkisini formüle eder ve grafiklerini çizer."
                ]
            },
            "4. Tema: Madde ve Isı": {
                "Konular": [
                    "Maddenin Tanecikli, Boşluklu ve Hareketli Yapısı",
                    "Yoğunluk (Özkütle) Kavramı ve Matematiksel Bağıntısı (d = m / V)",
                    "Birbiri İçinde Çözünmeyen Sıvıların Yoğunlukları",
                    "Isı İletkeni ve Isı Yalıtkanı Maddeler",
                    "Binalarda Isı Yalıtımı ve Yakıt Çeşitleri"
                ],
                "Öğrenim Çıktıları": [
                    "Maddelerin katı, sıvı ve gaz hâllerindeki tanecik hareketlerini (titreşim, öteleme, dönme) modeller.",
                    "Kütle ve hacim ölçümleri yaparak katı ve sıvı maddelerin yoğunluğunu hesaplar.",
                    "Farklı yoğunluktaki sıvıların aynı kaba konulduğunda oluşturduğu tabakalaşmayı deneyle inceler.",
                    "Isı iletkeni ve yalıtkanı malzemeleri belirler; binalarda ısı yalıtımının enerji tasarrufundaki önemini değerlendirir."
                ]
            },
            "5. Tema: Ses ve Özellikleri": {
                "Konular": [
                    "Sesin Farklı Ortamlarda (Katı, Sıvı, Gaz) Yayılması",
                    "Sesin Boşlukta Yayılmaması",
                    "Sesin Sürati ve Işık Sürati ile Karşılaştırılması",
                    "Sesin Yansıması, Yankı ve Soğurulması",
                    "Ses Yalıtımı ve Akustik Uygulamalar"
                ],
                "Öğrenim Çıktıları": [
                    "Sesin maddesel ortamlarda dalgalar hâlinde yayıldığını ve boşlukta yayılamayacağını deneyle kanıtlar.",
                    "Sesin katı, sıvı ve gaz ortamlardaki yayılma süratlerini tanecik yakınlığı üzerinden karşılaştırır.",
                    "Sesin bir yüzeye çarparak yansıması (yankı) ve soğurulması olaylarını açıklar.",
                    "Gürültü kirliliğini önlemeye yönelik ses yalıtımı tasarımları ve akustik düzenlemeler geliştirir."
                ]
            },
            "6. Tema: Vücudumuzdaki Sistemler ve Sağlığı": {
                "Konular": [
                    "Denetleyici ve Düzenleyici Sistemler (Sinir Sistemi ve İç Salgı Bezleri)",
                    "Duyu Organlarının Yapısı ve İşleyişi",
                    "Duyu Organı Kusurları ve Tedavi Teknolojileri",
                    "Sistemlerin Sağlığını Koruma ve İlk Yardım"
                ],
                "Öğrenim Çıktıları": [
                    "Merkezi ve çevresel sinir sisteminin bölümlerini (beyin, beyincik, omurilik, omurilik soğanı) ve refleksleri açıklar.",
                    "İç salgı bezlerinin (hipofiz, tiroit, pankreas, böbrek üstü) hormonlarını ve vücuttaki düzenleyici görevlerini kavrar.",
                    "Göz, kulak, burun, dil ve deri organlarının çalışma mekanizmasını açıklar; duyu kusurlarını inceler.",
                    "Sistemlerin sağlıklı işlemesi için dengeli beslenme, teknoloji bağımlılığından uzak durma ve ilk yardım kurallarını kavrar."
                ]
            },
            "7. Tema: Elektriğin İletimi ve Direnç": {
                "Konular": [
                    "İletken ve Yalıtkan Maddeler (Katı ve Sıvı İletkenler)",
                    "Elektriksel Direnç Kavramı",
                    "Direnci Etkileyen Faktörler (İletkenin Uzunluğu, Dik Kesit Alanı, Cinsi)",
                    "Reosta ve Ayarlı Dirençler"
                ],
                "Öğrenim Çıktıları": [
                    "Maddelerin elektrik iletkenliklerini basit elektrik devresi kurarak test eder ve iletken/yalıtkan olarak ayırır.",
                    "Elektrik enerjisinin iletiminde iletken telin direncini kavrar.",
                    "Bir iletkenin direncinin; telin boyuna, kalınlığına (kesitine) ve cinsine bağlı olduğunu deneyle gösterir.",
                    "Devrede direnç değişiminin ampul parlaklığı üzerindeki etkisini açıklar."
                ]
            }
        },
        "Sosyal Bilgiler": {
            "1. Tema: Birlikte Yaşamak": {
                "Konular": [
                    "Sosyal Değişim ve Toplumsal Rollerimiz",
                    "Kültürel Önyargılar ve Ayrımcılıkla Mücadele",
                    "Toplumsal Dayanışma, Vakıflar ve Birlik Ruhu"
                ],
                "Öğrenim Çıktıları": [
                    "Toplumsal rollerinin zaman içindeki değişimini ve bu rollerin getirdiği sorumlulukları açıklar.",
                    "Farklılıklara saygı göstererek toplumsal önyargı ve kalıpyargıların kırılmasına katkıda bulunur.",
                    "Tarihten günümüze yardımlaşma ve dayanışma kurumlarının (vakıf kültürü) önemini değerlendirir."
                ]
            },
            "2. Tema: Evimiz Dünya": {
                "Konular": [
                    "Dünya'nın Paralel ve Meridyen Sistemi",
                    "Kıtalar, Okyanuslar ve Coğrafi Konum (Matematik ve Özel Konum)",
                    "Farklı Kıtaların İklim ve Bitki Örtüsü Özellikleri",
                    "Türkiye'nin Jeopolitik Konumu"
                ],
                "Öğrenim Çıktıları": [
                    "Paralel ve meridyen ağını kullanarak herhangi bir noktanın coğrafi koordinatlarını belirler.",
                    "Türkiye'nin mutlak (matematik) ve göreceli (özel) konum özelliklerini harita üzerinde analiz eder.",
                    "Dünya üzerindeki farklı iklim kuşaklarının insan yaşamına ve ekonomik faaliyetlere etkilerini karşılaştırır."
                ]
            },
            "3. Tema: Ortak Mirasımız": {
                "Konular": [
                    "İlk Türk Devletleri (Asya Hun, Kök Türk, Uygur) ve Kültürü",
                    "İslamiyet'in Doğuşu, Dört Halife Dönemi ve Bilim",
                    "Türklerin İslamiyet'i Kabulü ve İlk Türk-İslam Devletleri (Karahanlılar, Gazneliler, Selçuklular)",
                    "Anadolu'nun Türkleşmesi ve Miryokefalon Zaferi"
                ],
                "Öğrenim Çıktıları": [
                    "Orta Asya ilk Türk devletlerinin yönetim, ordu ve sosyal yapı özelliklerini açıklar.",
                    "İslamiyet'in yayılmasıyla birlikte ortaya çıkan siyasi, bilimsel ve kültürel dönüşümü kavrar.",
                    "Türklerin İslamiyet'i kabulü sonrasında oluşan edebî eserleri (Kutadgu Bilig, Divanü Lugati't-Türk) analiz eder.",
                    "Malazgirt ve Miryokefalon savaşlarıyla Anadolu'nun Türk yurdu hâline gelme sürecini değerlendirir."
                ]
            },
            "4. Tema: Yaşayan Demokrasimiz": {
                "Konular": [
                    "Demokrasinin Temel İlkeleri (Millî Egemenlik, Eşitlik, Özgürlük, Çoğulculuk)",
                    "Devletin Temel Organları: Yasama, Yürütme, Yargı",
                    "Kuvvetler Ayrılığı İlkesi ve Anayasa",
                    "Türk Kadınının Siyasi ve Sosyal Haklarına Kavuşması"
                ],
                "Öğrenim Çıktıları": [
                    "Demokratik yönetim biçimlerini oligarşi, monarşi, teokrasi ve cumhuriyet kavramları üzerinden karşılaştırır.",
                    "Türkiye Cumhuriyeti Anayasası'nda yer alan yasama, yürütme ve yargı güçlerinin görev dağılımını kavrar.",
                    "Cumhuriyet devrimleriyle Türk kadınına tanınan siyasal ve toplumsal hakların önemini açıklar."
                ]
            },
            "5. Tema: Hayatımızdaki Ekonomi": {
                "Konular": [
                    "Türkiye'nin Doğal Kaynakları (Madenler, Su Kaynakları, Ormanlar, Topraklar)",
                    "Kaynakların Verimli Kullanımı ve Sürdürülebilir Kalkınma",
                    "Yatırım, Üretim ve Girişimcilik",
                    "Vergi Vermenin Vatandaşlık Görevi Olarak Önemi"
                ],
                "Öğrenim Çıktıları": [
                    "Türkiye'nin sahip olduğu yer altı ve yer üstü kaynaklarını harita üzerinde analiz eder.",
                    "Bilinçli bir girişimci olarak fizibilite çalışması ve yeni iş projeleri tasarlar.",
                    "Vergi vermenin kamu hizmetlerinin yürütülmesindeki ve ülke kalkınmasındaki rolünü açıklar."
                ]
            },
            "6. Tema: Teknoloji ve Sosyal Bilimler": {
                "Konular": [
                    "Geçmişten Günümüze Bilimsel Gelişmeler",
                    "Türk-İslam Bilim İnsanları (İbn-i Sina, el-Cezeri, el-Harezmi, Biruni)",
                    "Telif ve Patent Hakları, Korsan Yayınla Mücadele",
                    "Geleceğin Teknolojileri ve Etik"
                ],
                "Öğrenim Çıktıları": [
                    "Türk-İslam medeniyetinde yetişen bilim insanlarının dünya bilim mirasına katkılarını inceler.",
                    "Fikri mülkiyet haklarını koruma bilinci sergiler ve bandrollü/orijinal ürün tercih eder.",
                    "Bilişim ve biyoteknoloji alanındaki yeniliklerin insanlığın geleceğine etkilerini tartışır."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Peygamber ve İlahi Kitap İnancı": {
                "Konular": [
                    "Allah'ın Elçileri Olarak Peygamberler",
                    "İlahi Kitaplar ve Gönderiliş Amaçları (Tevrat, Zebur, İncil, Kur'an)",
                    "Kur'an-ı Kerim'in İndiriliş Süreci ve Özellikleri",
                    "Hz. Adem'in Kıssası"
                ],
                "Öğrenim Çıktıları": [
                    "İlahi kitapların gönderiliş gerekçelerini ve temel ahlaki mesajlarını açıklar.",
                    "Dört büyük kutsal kitabın hangi peygamberlere gönderildiğini eşleştirir.",
                    "Kur'an-ı Kerim'in mushaf hâline getirilmesi ve çoğaltılması aşamalarını kavrar.",
                    "Hz. Adem'in yaratılışını ve insanoğlunun yeryüzündeki sorumluluğunu değerlendirir."
                ]
            },
            "2. Tema: Namaz İbadeti": {
                "Konular": [
                    "Namazın Şartları (Dışındaki ve İçindeki Farzlar)",
                    "Cemaatle Namaz, Cuma ve Bayram Namazları",
                    "Cenaze Namazı ve Yolcu Namazı",
                    "Kunut Duaları ve Anlamları"
                ],
                "Öğrenim Çıktıları": [
                    "Namazın farzlarını (hadesten taharet, setr-i avret, kıraat, rükû, secde vb.) açıklar.",
                    "Cuma, bayram ve cenaze namazlarının kılınış şekillerini ve toplumsal dayanışmadaki rolünü kavrar.",
                    "Yatsı namazının vitir bölümünde okunan Kunut dualarını ezbere okur ve anlamını açıklar."
                ]
            },
            "3. Tema: Zararlı Alışkanlıklar": {
                "Konular": [
                    "İslam'ın Korunmasını Emrettiği Temel Değerler (Can, Akıl, Mal)",
                    "Alkol, Kumar ve Uyuşturucu Maddelerin Bireysel ve Sosyal Zararları",
                    "Sigara ve Dijital Bağımlılık",
                    "Zararlı Alışkanlıklardan Korunma Yolları"
                ],
                "Öğrenim Çıktıları": [
                    "İslam dininin akıl ve beden sağlığını korumaya yönelik haram ve yasaklarını ayetlerle açıklar.",
                    "Alkol ve kumarın aile bütçesi ve toplumsal huzur üzerindeki yıkıcı etkilerini değerlendirir.",
                    "Zararlı alışkanlıklara karşı 'hayır' diyebilme becerisi ve irade kontrolü geliştirir."
                ]
            },
            "4. Tema: Hz. Muhammed'in Hayatı": {
                "Konular": [
                    "Hz. Muhammed'in Peygamberlik Öncesi Erdemli Tavırları",
                    "Hicret Olayı ve Medine İslam Devleti'nin Kuruluşu",
                    "Medine Sözleşmesi ve Toplumsal Barış",
                    "Bedir, Uhud, Hendek Savaşları ve Veda Haccı"
                ],
                "Öğrenim Çıktıları": [
                    "Hicretin İslam tarihindeki dönüm noktasını ve Müslümanların maruz kaldığı baskıları kavrar.",
                    "Medine Sözleşmesi'nin farklı din ve ırklar arasında barış içinde bir arada yaşama kültürüne katkısını değerlendirir.",
                    "Hz. Muhammed'in Veda Hutbesi'ndeki evrensel insan hakları mesajlarını analiz eder."
                ]
            },
            "5. Tema: Temel Değerlerimiz": {
                "Konular": [
                    "Vatan, Millet ve Bayrak Sevgisi",
                    "Şehitlik ve Gazilik Mertebeleri",
                    "Kültürümüzdeki Cami ve Mescit Mimarisi",
                    "İstiklal Marşı'mızdaki Dini Motifler"
                ],
                "Öğrenim Çıktıları": [
                    "Vatan sevgisinin imandan kaynaklanan kutsal bir görev olduğunu açıklar.",
                    "Şehitlik ve gazilik kavramlarının dinimizdeki yüce makamını ayet ve hadislerle yorumlar.",
                    "Camilerin ibadet mekânı olmasının yanı sıra ilim, kültür ve toplanma yeri olma özelliğini açıklar."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: Life": {
                "Konular": [
                    "Daily Routines and After-School Activities",
                    "Telling the Time and Exact Dates",
                    "Expressing Preferences using Simple Present Tense"
                ],
                "Öğrenim Çıktıları": [
                    "Describes regular daily routines and after-school clubs using appropriate adverbs of frequency.",
                    "States exact calendar dates, clock times, and parts of the day precisely.",
                    "Interviews classmates about their weekday and weekend schedules."
                ]
            },
            "Theme 2: Yummy Breakfast": {
                "Konular": [
                    "Food and Drinks for Breakfast (cheese, olives, eggs, cereal, tea)",
                    "Expressing Likes, Dislikes and Preferences",
                    "Using Quantifiers: some, any, a lot of",
                    "Nutritious vs Junk Food"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies and names traditional and international breakfast items.",
                    "Expresses food preferences using 'prefer', 'like', and 'dislike'.",
                    "Distinguishes between wholesome, healthy foods and processed junk food."
                ]
            },
            "Theme 3: Downtown": {
                "Konular": [
                    "City Life vs Country Life",
                    "Making Comparisons with Comparative Adjectives (-er, more)",
                    "Describing Simultaneous Actions with Present Continuous Tense"
                ],
                "Öğrenim Çıktıları": [
                    "Compares urban environments and rural settings using comparative structures.",
                    "Describes what people are doing at the moment in a busy city square.",
                    "Understands short audio descriptions contrasting living in the city and countryside."
                ]
            },
            "Theme 4: Weather and Emotions": {
                "Konular": [
                    "Weather Conditions and Celsius Temperatures",
                    "Feelings and Emotional States (anxious, energetic, sleepy, depressed)",
                    "Associating Weather with Personal Emotions"
                ],
                "Öğrenim Çıktıları": [
                    "Describes weather forecasts across different geographic regions accurately.",
                    "Expresses personal emotional reactions to various weather conditions.",
                    "Listens to weather forecast reports and extracts relevant temperature details."
                ]
            },
            "Theme 5: At the Fair": {
                "Konular": [
                    "Funfair Rides (roller coaster, bumper cars, Ferris wheel, carousel)",
                    "Expressing Personal Opinions with Adjectives (exciting, terrifying, boring)",
                    "Agreeing and Disagreeing with Others"
                ],
                "Öğrenim Çıktıları": [
                    "Names attractions and rides found in an amusement park.",
                    "Expresses personal opinions about fair rides using descriptive adjectives.",
                    "States polite agreement or disagreement regarding leisure activities."
                ]
            },
            "Theme 6: Occupations": {
                "Konular": [
                    "Occupations and Job Responsibilities (mechanic, architect, lawyer, tailor)",
                    "Talking About Past States with 'Was / Were'",
                    "Stating Dates of Birth and Historical Facts"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies professions and explains what professionals do in their daily tasks.",
                    "Uses the past form of 'to be' (was/were) to talk about past locations and professions.",
                    "Asks and answers questions about past events and dates of birth."
                ]
            },
            "Theme 7: Holidays": {
                "Konular": [
                    "Vacation Types and Travel Destinations (seaside, camping, sightseeing)",
                    "Talking About Past Events with Simple Past Tense (Regular/Irregular Verbs)",
                    "Describing Holiday Activities"
                ],
                "Öğrenim Çıktıları": [
                    "Narrates past vacation experiences using regular and irregular past verbs.",
                    "Identifies various holiday types and activities (swimming, hiking, taking photos).",
                    "Writes a postcard or short travel journal about their last trip."
                ]
            },
            "Theme 8: Saving the Planet": {
                "Konular": [
                    "Environmental Problems (air/water pollution, deforestation, global warming)",
                    "Obligations and Suggestions with 'Should / Shouldn't'",
                    "Eco-friendly Habits (recycling, saving electricity and water)"
                ],
                "Öğrenim Çıktıları": [
                    "Names major environmental hazards threatening the planet.",
                    "Gives practical recommendations on conserving natural resources using modal verbs.",
                    "Prepares an eco-friendly action poster outlining green classroom rules."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Tema: Bilişim Teknolojileri ve Yazılım Dünyası": {
                "Konular": [
                    "İşletim Sistemleri ve Görevleri (Açık ve Kapalı Kaynak Kodlu Sistemler)",
                    "Yazılım Lisanslama ve Fikri Mülkiyet",
                    "Dosya Biçimleri, Sıkıştırma ve Arşivleme"
                ],
                "Öğrenim Çıktıları": [
                    "İşletim sistemlerinin donanım-yazılım koordinasyonundaki rolünü açıklar.",
                    "Özgür yazılım felsefesini, açık kaynak kodlu sistemleri (Pardus, Linux) tanır.",
                    "Büyük boyutlu verileri sıkıştırma ve arşivleme araçlarıyla organize eder."
                ]
            },
            "2. Tema: Ağ Teknolojileri ve Siber Güvenlik": {
                "Konular": [
                    "Bilgisayar Ağları Türleri (LAN, MAN, WAN)",
                    "İnternet Altyapısı, IP Adresi ve DNS Kavramları",
                    "Kötü Amaçlı Yazılımlar (Virüs, Truva Atı, Solucan, Fidye Yazılımı)",
                    "Güvenlik Duvarı ve Antivirüs Programları"
                ],
                "Öğrenim Çıktıları": [
                    "Yerel ve geniş alan ağlarının çalışma prensiplerini şemalar üzerinden gösterir.",
                    "Zararlı yazılım türlerini tanır ve bilgisayarı tehditlere karşı koruyucu önlemler alır.",
                    "İnternet bankacılığı ve alışverişinde SSL sertifikası ve HTTPS güvenliğini denetler."
                ]
            },
            "3. Tema: Dijital Ürün Tasarımı": {
                "Konular": [
                    "Elektronik Tablolama Programları (Hücre, Formül, Fonksiyon)",
                    "Hesap Tablolarında Matematiksel Hesaplamalar (TOPLA, ORTALAMA, EĞER)",
                    "Verileri Tablo ve Grafiklerle Görselleştirme",
                    "Ses ve Video Düzenleme Yazılımları"
                ],
                "Öğrenim Çıktıları": [
                    "Elektronik tablolama yazılımlarında formül ve temel fonksiyonları kullanarak hesaplama yapar.",
                    "Sayısal verileri pasta, sütun ve çizgi grafiklerine dönüştürür.",
                    "Özgün ses ve video dosyalarını kesme, birleştirme ve efekt ekleme adımlarıyla düzenler."
                ]
            },
            "4. Tema: Algoritmik Düşünme ve Blok Tabanlı Kodlama": {
                "Konular": [
                    "Algoritmada Değişken ve Sabit Tanımlama",
                    "Karar Yapıları (Eğer-İse, Değilse Koşulları)",
                    "Döngü Yapıları (Sürekli Tekrarla, Belli Sayıda Tekrarla)",
                    "Scratch Ortamında Etkileşimli Oyun ve Animasyon Geliştirme"
                ],
                "Öğrenim Çıktıları": [
                    "Programlama sürecinde verileri saklamak için değişken mantığını uygular.",
                    "Karar (şart) ve döngü bloklarını algoritmalarında hatasız kurgular.",
                    "Karakterler arası haberleşme ve algılama bloklarını kullanarak özgün eğitici oyunlar kodlar."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "Bona ve Solfej Çalışmaları",
                    "Ses Değiştirici İşaretler (Diyez, Bemol, Naturel)",
                    "Türk Müziğinde Makam Kavramı (Nihavend, Rast, Hicaz)",
                    "Çok Sesli Müzik ve Koro Bilinci"
                ],
                "Öğrenim Çıktıları": [
                    "Notaları süre değerlerine ve ses yüksekliklerine uygun olarak solfejle okur.",
                    "Diyez ve bemol işaretlerinin notalar üzerindeki ses inceltme/kalınlaştırma etkisini kavrar.",
                    "Geleneksel Türk müziğinde temel makamların ezgisel özelliklerini dinleyerek ayırt eder.",
                    "Koro çalışmalarında sesini diğer seslerle uyumlu kullanarak iki sesli koro şarkılarına katılır."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Çalgı İcrasında Duruş ve İleri Teknikler",
                    "Türkülerimiz ve Hikâyeleri",
                    "Dijital Müzik Araçlarıyla Ritim Tasarımı"
                ],
                "Öğrenim Çıktıları": [
                    "Seçilen ezgi çalgısında parça repertuarını genişleterek doğru tonla icra eder.",
                    "Hikâyesi olan türkülerimizi dinleyerek kültürel bağlamını ve duygusunu analiz eder.",
                    "Temel dijital müzik yazılımlarıyla basit ritim ve melodi döngüleri (loop) oluşturur."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü": {
                "Konular": [
                    "Klasik Sanat Akımlarına Giriş (Rönesans ve Barok Sanatı)",
                    "Geleneksel Türk El Sanatları: Ebru, Minyatür ve Çini",
                    "Görsel İletişimde Tipografi ve Grafik Tasarım"
                ],
                "Öğrenim Çıktıları": [
                    "Tarihsel dönemlerin sanat anlayışlarını ve öne çıkan başyapıtlarını inceler.",
                    "Geleneksel Türk ebru ve hat sanatının estetik inceliklerini çözümler.",
                    "Afiş, kitap kapağı ve ambalaj tasarımlarında tipografik ögelerin işlevini kavrar."
                ]
            },
            "2. Tema: Sanatsal Tasarım": {
                "Konular": [
                    "Çift Kaçışlı (İki Noktalı) Perspektif Çizimleri",
                    "Işık-Gölge, Derecelendirme ve Hacim Kazandırma",
                    "Atık Maddelerle Heykel ve Asamblaj Çalışmaları"
                ],
                "Öğrenim Çıktıları": [
                    "İki kaçış noktalı perspektif kurallarını uygulayarak bina ve cadde çizimleri yapar.",
                    "Karakalem çalışmalarında ton çubuğu oluşturarak nesnelere gerçekçi hacim ve derinlik kazandırır.",
                    "Geri dönüştürülebilir farklı materyalleri birleştirerek özgün rölyef ve heykeller üretir."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Voleybolda Parmak Pas, Manşet Pas ve Servis Teknikleri",
                    "Basketbolda Top Sürme, Göğüs/Başüstü Pas ve Turnike",
                    "Futbolda Ayak İçi-Dışı Pas ve Şut Teknikleri",
                    "Hentbolda Temel Pas ve Kaleye Şut Becerileri"
                ],
                "Öğrenim Çıktıları": [
                    "Voleybolda manşet ve parmak pası kurallara uygun teknikle uygular.",
                    "Basketbolda top hakimiyetini koruyarak turnike adımını ve şut mekaniğini sergiler.",
                    "Futbolda top kontrolü, isabetli pas ve şut çalışmalarını koordineli yürütür.",
                    "Takım oyunlarında hücum ve savunma alan paylaşımını sahada uygular."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Aerobik ve Anaerobik Egzersizler",
                    "Sağlıklı Duruş (Postür) ve Omurga Sağlığı",
                    "Spor Organizasyonlarında Görev ve Sorumluluk"
                ],
                "Öğrenim Çıktıları": [
                    "Düzenli aerobik egzersizlerin kalp-damar sistemi üzerindeki olumlu etkilerini açıklar.",
                    "Hatalı oturuş ve taşıma alışkanlıklarının omurgada yol açabileceği duruş bozukluklarını açıklar.",
                    "Sınıf içi spor turnuvalarında hakemlik, saha düzeni ve organizasyon görevlerini üstlenir."
                ]
            }
        },
        "Seçmeli Zeka Oyunları": {
            "1. Tema: Strateji Oyunları": {
                "Konular": [
                    "Satranç ve benzeri oyunlarda hamle planlar",
                    "'Strateji Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Strateji Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Strateji Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Strateji Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Satranç ve benzeri oyunlarda hamle planlar.",
                    "'Strateji Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Strateji Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Strateji Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Strateji Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            },
            "2. Tema: Hafıza Oyunları": {
                "Konular": [
                    "Görsel hafıza tekniklerini kullanır",
                    "'Hafıza Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Hafıza Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Hafıza Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Hafıza Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Görsel hafıza tekniklerini kullanır.",
                    "'Hafıza Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Hafıza Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Hafıza Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Hafıza Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            }
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "1. Tema: My World": {
                "Konular": [
                    "İlgi alanları hakkında konuşur",
                    "'My World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'My World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'My World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'My World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "İlgi alanları hakkında konuşur.",
                    "'My World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'My World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'My World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'My World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        }
    },
    "7. Sınıf": {
        "Türkçe": {
            "1. Tema: Hayat Boyu Gelişim": {
                "Konular": [
                    "Kişisel Gelişim, Öğrenme Azmi ve Hedef Belirleme",
                    "Fiillerde Anlam (İş, Oluş, Durum Fiilleri)",
                    "Fiillerde Kip ve Kişi (Haber ve Dilek Kipleri)",
                    "Fiillerde Anlam (Zaman) Kayması"
                ],
                "Öğrenim Çıktıları": [
                    "İş (kılış), oluş ve durum fiillerini anlamsal özelliklerine göre ayırt eder.",
                    "Fiilleri haber (bildirme) ve dilek (tasarlama) kipleriyle şahıs eklerine göre çekimler.",
                    "Fiillerde bir kipin başka bir kip yerine kullanıldığı zaman kayması durumlarını çözümler.",
                    "Kişisel hedeflerini ve gelişim sürecini anlatan planlı düşünce yazıları yazar."
                ]
            },
            "2. Tema: Bir Hilal Uğruna": {
                "Konular": [
                    "Çanakkale Zaferi, Millî İrade ve Kahramanlık",
                    "Ek Fiil (Ek Eylem) ve Görevleri",
                    "Şiirde Söz Sanatları (Teşbih, Tezat, İntak, Mübalağa)",
                    "Metin Türü: Destan ve Söylev (Nutuk)"
                ],
                "Öğrenim Çıktıları": [
                    "Ek fiilin isim soylu sözcükleri yüklem yapma ve basit zamanlı fiilleri birleşik zamanlı yapma görevlerini kavrar.",
                    "Edebi metinlerdeki tezat (karşıtlık), mübalağa (abartma) ve intak (konuşturma) sanatlarını bulur.",
                    "Destan ve söylev metinlerindeki coşkulu anlatımı ve hitabet dilini tahlil eder.",
                    "Tarihî zaferlerimizi ve vatan sevgisini anlatan etkileyici konuşmalar yapar."
                ]
            },
            "3. Tema: İletişim ve Sosyal İlişkiler": {
                "Konular": [
                    "Etkili İletişim, Medya Okuryazarlığı ve Eleştirel Düşünme",
                    "Zarflar (Belirteçler): Durum, Zaman, Miktar, Yer-Yön, Soru",
                    "Anlatım Bozuklukları (Anlamsal Düzeyde)",
                    "Metin Türü: Söyleşi (Sohbet) ve Fıkra (Köşe Yazısı)"
                ],
                "Öğrenim Çıktıları": [
                    "Fiilleri, sıfatları ve diğer zarfları anlamca tamamlayan zarf türlerini metin bağlamında kullanır.",
                    "Gereksiz sözcük kullanımı, çelişen sözlerin bir arada bulunması gibi anlamsal anlatım bozukluklarını düzeltir.",
                    "Sohbet ve köşe yazısı (fıkra) türlerinin özelliklerini karşılaştırarak özgün bir köşe yazısı kaleme alır.",
                    "Medya mesajlarını eleştirel gözle değerlendirerek manipülatif ve taraflı içerikleri fark eder."
                ]
            },
            "4. Tema: Türk Sanatı": {
                "Konular": [
                    "Geleneksel Türk Mimarisi, Hat, Tezhip ve Musiki",
                    "Fiillerde Yapı: Basit, Türemiş ve Birleşik Fiiller",
                    "Kurallı Birleşik Fiiller (Yeterlilik, Tezlik, Süreklilik, Yaklaşma)",
                    "Metin İnceleme ve Sanat Eleştirisi"
                ],
                "Öğrenim Çıktıları": [
                    "Basit, türemiş ve birleşik yapılı fiilleri ayırt eder; kurallı birleşik fiillerin kattığı anlamları açıklar.",
                    "Türk sanat eserlerinin estetik ve kültürel değerini anlatan metinleri çözümler.",
                    "Görsel sanat yapıtları veya mimari eserler hakkında nesnel ve öznel kriterlerle eleştiri yazısı yazar."
                ]
            },
            "5. Tema: Okuma Kültürü": {
                "Konular": [
                    "Kitap Okuma Alışkanlığı ve Kütüphaneler",
                    "Metin Türü: Deneme ve Roman Tahlili",
                    "Cümlede Anlam: Örtülü Anlam, Koşul-Sonuç, Karşılaştırma",
                    "Noktalama İşaretleri ve İmla Kuralları"
                ],
                "Öğrenim Çıktıları": [
                    "Deneme türünün samimi ve özgün üslubunu kavrar, serbest bir konuda deneme metni oluşturur.",
                    "Okuduğu romanın şahıs kadrosunu, mekânını, zamanını ve çatışma unsurlarını tahlil eder.",
                    "Metindeki örtülü anlamları ve alt metin mesajlarını derinlemesine çözümler.",
                    "Yazılarında tırnak, eğik çizgi, kısa ve uzun çizgi işaretlerini işlevlerine uygun kullanır."
                ]
            },
            "6. Tema: Hak ve Sorumluluklar": {
                "Konular": [
                    "Adalet, Eşitlik, Hukukun Üstünlüğü ve Çevre Hakları",
                    "Düşünceyi Geliştirme Yolları (Tanık Gösterme, Sayısal Verilerden Yararlanma)",
                    "Paragrafta Yapı ve Anlatım İlkeleri (Duruluk, Açıklık, Akıcılık)",
                    "Resmî Yazışmalar: Dilekçe ve E-Posta Yazma"
                ],
                "Öğrenim Çıktıları": [
                    "Bilgilendirici metinlerde düşünceyi geliştirme yollarından tanık gösterme ve sayısal verileri inceler.",
                    "Anlatımda duruluk, açıklık ve yalınlık ilkelerini gözeterek metin oluşturur.",
                    "Resmî kurumlara hitaben yazılan dilekçelerin biçimsel kurallarına eksiksiz uyar.",
                    "Bireysel ve toplumsal hak arama yollarını medeni çerçevede savunur."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Tam Sayılarla İşlemler": {
                "Konular": [
                    "Tam Sayılarla Toplama ve Çıkarma İşlemleri",
                    "Tam Sayılarla Çarpma ve Bölme İşlemleri",
                    "Tam Sayıların Kuvvetleri (Negatif Sayıların Çift/Tek Kuvvetleri)",
                    "Tam Sayı Problemleri ve Modelleme"
                ],
                "Öğrenim Çıktıları": [
                    "Tam sayılarla toplama ve çıkarma işlemlerini sayı doğrusunda ve sayma pullarıyla modeller.",
                    "Tam sayılarla çarpma ve bölme işlemlerinde işaret kurallarını (+, -) hatasız uygular.",
                    "Tam sayıların pozitif tam sayı kuvvetlerini hesaplar; tabanın negatif olduğu durumlarda parantez etkisini ayırt eder.",
                    "Tam sayılarla işlem yapmayı gerektiren günlük yaşam problemlerini çözer."
                ]
            },
            "2. Tema: Rasyonel Sayılar ve İşlemler": {
                "Konular": [
                    "Rasyonel Sayı Kavramı ve Sayı Doğrusunda Gösterme",
                    "Rasyonel Sayıların Ondalık Gösterimi ve Devirli Ondalık Açılımlar",
                    "Rasyonel Sayıları Sıralama ve Karşılaştırma",
                    "Rasyonel Sayılarla Dört İşlem",
                    "Çok Adımlı İşlemler ve Rasyonel Sayı Problemleri"
                ],
                "Öğrenim Çıktıları": [
                    "a/b (b sıfırdan farklı) biçimindeki rasyonel sayıları tanır ve sayı doğrusunda gösterir.",
                    "Rasyonel sayıları ondalık gösterimle yazar; devirli ondalık sayıları rasyonel sayıya dönüştürür.",
                    "Rasyonel sayılarla toplama, çıkarma, çarpma ve bölme işlemlerini yürütür.",
                    "Merdivenli (çok adımlı) kesir işlemlerini ve rasyonel sayı problemlerini adım adım çözer."
                ]
            },
            "3. Tema: Cebirsel İfadeler, Eşitlik ve Denklem": {
                "Konular": [
                    "Cebirsel İfadelerle Toplama ve Çıkarma İşlemleri",
                    "Bir Doğal Sayı ile Bir Cebirsel İfadeyi Çarpma",
                    "Aritmetik Örüntülerin Kuralını Harfle İfade Etme",
                    "Eşitliğin Korunumu İlkesi",
                    "Birinci Dereceden Bir Bilinmeyenli Denklemleri Kurma ve Çözme"
                ],
                "Öğrenim Çıktıları": [
                    "Cebirsel ifadelerle toplama ve çıkarma yapar, benzer terimleri birleştirir.",
                    "Bir doğal sayıyı parantez içindeki cebirsel ifade üzerine dağıtır.",
                    "Aritmetik örüntülerin kuralını n değişkenini kullanarak genel terim (an + b) şeklinde yazar.",
                    "Birinci dereceden bir bilinmeyenli denklemleri eşitliğin her iki tarafına aynı işlemi uygulayarak çözer ve gerçek hayat problemlerine uygular."
                ]
            },
            "4. Tema: Oran ve Orantı": {
                "Konular": [
                    "Oran, Orantı ve Orantı Sabiti (k)",
                    "Doğru Orantı ve Ters Orantı Kavramları",
                    "Doğru ve Ters Orantı Problemleri",
                    "Yüzdeler: Bir Çokluğun Belirtilen Yüzdesini Bulma",
                    "Kâr-Zarar, Faiz ve İskonto Problemleri"
                ],
                "Öğrenim Çıktıları": [
                    "İki oranın eşitliği olan orantıyı kurar ve orantı sabitini (k) belirler.",
                    "Doğru orantılı ve ters orantılı çoklukları ayırt eder, grafiklerini inceler ve problemlerini çözer.",
                    "Bir sayıyı belirli bir yüzde kadar artıran veya azaltan hesaplamaları yapar.",
                    "Alışveriş, kâr, zarar, KDV ve indirim içeren yüzde problemlerini çözer."
                ]
            },
            "5. Tema: Doğrular, Açılar ve Çokgenler": {
                "Konular": [
                    "Paralel İki Doğrunun Bir Kesenle Yaptığı Açılar (Yöndeş, İç Ters, Dış Ters Açılar)",
                    "Çokgenlerin Temel Özellikleri (Köşegen, İç ve Dış Açılar)",
                    "Düzgün Çokgenler ve İç Açı Ölçüleri Toplamı",
                    "Özel Dörtgenler (Yamuk, Eşkenar Dörtgen) ve Alan Bağıntıları"
                ],
                "Öğrenim Çıktıları": [
                    "Paralel doğruların bir kesenle oluşturduğu yöndeş, iç ters, dış ters açıların ölçü ilişkilerini problem çözmede kullanır.",
                    "n kenarlı bir çokgenin iç açılarının ölçüleri toplamını [(n-2) x 180°] formülüyle bulur.",
                    "Düzgün çokgenlerin bir iç ve bir dış açısının ölçüsünü hesaplar.",
                    "Eşkenar dörtgenin (köşegenler çarpımının yarısı) ve yamuğun alan bağıntılarını açıklar ve uygular."
                ]
            },
            "6. Tema: Çember ve Daire": {
                "Konular": [
                    "Çemberde Merkez Açı ve Merkez Açının Gördüğü Yay",
                    "Çemberin ve Çember Parçasının (Yay) Uzunluğu",
                    "Dairenin Alanı ve Daire Diliminin Alanı"
                ],
                "Öğrenim Çıktıları": [
                    "Merkez açının ölçüsü ile gördüğü yayın ölçüsünün eşit olduğunu açıklar.",
                    "Çember yayının uzunluğunu merkez açının oranını kullanarak hesaplar.",
                    "Dairenin alanını (π x r²) ve belirli bir merkez açıya sahip daire diliminin alanını hesaplar."
                ]
            },
            "7. Tema: Veri Analizi": {
                "Konular": [
                    "Çizgi Grafiği Çizme ve Yorumlama",
                    "Daire Grafiği Oluşturma ve Yorumlama",
                    "Grafikler Arası Dönüşümler",
                    "Merkezi Eğilim ve Yayılım Ölçüleri: Aritmetik Ortalama, Tepe Değer (Mod), Ortanca (Medyan)"
                ],
                "Öğrenim Çıktıları": [
                    "Zamana bağlı değişim gösteren verileri çizgi grafiği ile gösterir ve yorumlar.",
                    "Bir bütünün parçalarını göstermek için daire grafiği oluşturur ve açı oranlarını belirler.",
                    "Veri setinin aritmetik ortalama, medyan ve mod değerlerini hesaplayarak uygun temsil biçimini seçer."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Tema: Güneş Sistemi ve Ötesi": {
                "Konular": [
                    "Uzay Araştırmaları, Roketler, Yapay Uydular ve Uzay İstasyonları",
                    "Uzay Kirliliği ve Olası Tehlikeleri",
                    "Teleskobun Yapısı ve Tarihsel Gelişimi (Aynalı ve Mercekli Teleskoplar)",
                    "Gök Cisimleri: Yıldızlar, Takımyıldızları, Kuyruklu Yıldızlar",
                    "Yıldızların Yaşam Döngüsü (Bulutsu, Kara Delik, Beyaz Cüce)",
                    "Galaksiler (Samanyolu, Andromeda) ve Evren Kavramı"
                ],
                "Öğrenim Çıktıları": [
                    "Uzay araştırmalarında kullanılan araçları (sonda, teleskop, uydu) ve Türkiye'nin uzaydaki uydularını tanır.",
                    "Uzay kirliliğinin sebeplerini sorgular ve önlenmesine dair çözümler önerir.",
                    "Teleskobun gök bilimin gelişimindeki rolünü değerlendirir.",
                    "Yıldızların oluşum sürecini bulutsu (nebula) kavramından başlayarak son evrelerine kadar modeller.",
                    "Galaksi türlerini ve evrenin genişlemesini açıklayan modelleri inceler."
                ]
            },
            "2. Tema: Hücre ve Bölünmeler": {
                "Konular": [
                    "Hücrenin Temel Kısımları (Hücre Zarı, Sitoplazma, Çekirdek)",
                    "Organeller ve Görevleri",
                    "Bitki ve Hayvan Hücresi Arasındaki Farklar",
                    "Hücreden Organizmaya (Hücre-Doku-Organ-Sistem-Organizma)",
                    "Mitoz Bölünme: Aşamaları ve Canlılar İçin Önemi",
                    "Mayoz Bölünme: Aşamaları, Mayoz-1/Mayoz-2, Krossing-over ve Biyoçeşitlilik"
                ],
                "Öğrenim Çıktıları": [
                    "Hücrenin temel bölümlerini ve organellerin (mitokondri, kloroplast, ribozom vb.) işlevlerini modeller üzerinde açıklar.",
                    "Bitki ve hayvan hücrelerini şekil, çeper, kloroplast ve sentriyol yönünden mikroskopta karşılaştırır.",
                    "Mitoz bölünmenin kromozom sayısını sabit tuttuğunu, vücut hücrelerinde gerçekleşip onarım ve büyüme sağladığını kavrar.",
                    "Mayoz bölünmede gerçekleşen parça değişimi (krossing-over) olayının tür içi çeşitliliği sağladığını ve üreme hücrelerini oluşturduğunu modellerle gösterir."
                ]
            },
            "3. Tema: Kuvvet ve Enerji": {
                "Konular": [
                    "Kütle ve Ağırlık Kavramları Arasındaki Farklar",
                    "Yer Çekimi Kuvveti ve Kütle Çekim İvmesi",
                    "Fiziksel Anlamda İş (W = F x x) ve Enerji İlişkisi",
                    "Kinetik Enerji ve Potansiyel Enerji (Çekim ve Esneklik Potansiyeli)",
                    "Enerjinin Korunumu ve Dönüşümü (Sürtünme ile Isıya Dönüşüm)"
                ],
                "Öğrenim Çıktıları": [
                    "Kütle ile ağırlık arasındaki farkı dinamometre ve eşit kollu terazi kullanımı üzerinden açıklar.",
                    "Fiziksel anlamda iş yapılabilmesi için cisme uygulanan kuvvetin ve hareket yönünün aynı doğrultuda olması gerektiğini kavrar.",
                    "Kinetik enerjinin kütle ve sürate; çekim potansiyel enerjisinin kütle ve yüksekliğe bağlı olduğunu deneyle kanıtlar.",
                    "Mekanik enerjinin korunumu ilkesini; sürtünmeli yüzeylerde enerjinin bir kısmının ısıya dönüştüğünü göstererek açıklar."
                ]
            },
            "4. Tema: Saf Madde ve Karışımlar": {
                "Konular": [
                    "Maddenin Tanecikli Yapısı ve Atom (Proton, Nötron, Elektron)",
                    "Molekül Kavramı, Saf Maddeler: Elementler ve Bileşikler",
                    "İlk 18 Element ve Yaygın Elementlerin Sembolleri",
                    "Yaygın Bileşiklerin Formülleri (H₂O, CO₂, NaCl, NH₃ vb.)",
                    "Homojen ve Heterojen Karışımlar (Çözeltiler)",
                    "Çözünme Hızını Etkileyen Faktörler (Sıcaklık, Temas Yüzeyi, Karıştırma)",
                    "Karışımları Ayırma Yöntemleri (Buharlaştırma, Damıtma, Yoğunluk Farkı)"
                ],
                "Öğrenim Çıktıları": [
                    "Atomun yapısındaki temel parçacıkları (çekirdek ve katmanlar) modeller üzerinde gösterir.",
                    "Elementlerin sembollerle, bileşiklerin formüllerle gösterildiğini kavrar; ilk 18 elementin sembollerini öğrenir.",
                    "Homojen (çözelti) ve heterojen karışımları ayırt eder; çözücü ve çözünen ilişkisini açıklar.",
                    "Çözünme hızına sıcaklığın, karıştırmanın ve temas yüzeyinin etkisini kontrollü deneylerle inceler.",
                    "Karışımları fiziksel yöntemlerle (buharlaştırma, ayrımsal damıtma, ayırma hunisi) ayırır."
                ]
            },
            "5. Tema: Işığın Madde ile Etkileşimi": {
                "Konular": [
                    "Işığın Soğurulması (Absorpsiyonu) ve Koyu/Açık Renkler",
                    "Güneş Enerjisinin Kullanım Alanları",
                    "Aynalar ve Görüntü Özellikleri (Düz, Çukur ve Tümsek Aynalar)",
                    "Işığın Kırılması ve Kırılma Kanunları",
                    "Mercekler (İnce ve Kalın Kenarlı Mercekler) ve Odak Noktası",
                    "Göz Kusurları ve Merceklerle Tedavisi"
                ],
                "Öğrenim Çıktıları": [
                    "Işığın maddeler tarafından soğurulmasının sıcaklık artışına neden olduğunu deneyle gösterir.",
                    "Düz, çukur ve tümsek aynalarda oluşan görüntünün özelliklerini (düz, ters, büyük, küçük) inceler ve kullanım alanlarını belirler.",
                    "Işığın bir ortamdan diğerine geçerken hızının değiştiğini ve kırıldığını açıklar; çok yoğundan az yoğuna geçiş durumlarını çizer.",
                    "İnce ve kalın kenarlı merceklerin ışığı toplama ve dağıtma özelliklerini kavrar; miyop ve hipermetrop göz kusurlarını uygun mercekle eşleştirir."
                ]
            },
            "6. Tema: Canlılarda Üreme, Büyüme ve Gelişme": {
                "Konular": [
                    "İnsanda Üremeyi Sağlayan Yapı ve Organlar (Dişi ve Erkek Üreme Sistemleri)",
                    "Sperm, Yumurta, Döllenme, Zigot, Embriyo ve Fetüs Aşamaları",
                    "Hamilelik Sürecinde Anne ve Bebek Sağlığı",
                    "Hayvanlarda Üreme (Eşeyli ve Eşeysiz Üreme, Başkalaşım)",
                    "Bitkilerde Üreme: Çiçeğin Kısımları, Tozlaşma, Döllenme ve Çimlenme"
                ],
                "Öğrenim Çıktıları": [
                    "İnsanda üremeyi sağlayan organları şema üzerinde gösterir; sperm ve yumurtanın birleşerek bebeği oluşturma evrelerini açıklar.",
                    "Embriyonun sağlıklı gelişebilmesi için anne adayının dikkat etmesi gereken unsurları (beslenme, zararlı maddelerden uzak durma) değerlendirir.",
                    "Eşeysiz üreme çeşitlerini (vejetatif, bölünme, tomurcuklanma, rejenerasyon) ve kurbağa/kelebekteki başkalaşımı açıklar.",
                    "Çiçekli bitkilerde tozlaşma ve döllenme aşamalarını; tohumun çimlenmesine etki eden faktörleri (sıcaklık, oksijen, su) deneyle belirler."
                ]
            },
            "7. Tema: Elektrik Devreleri": {
                "Konular": [
                    "Ampullerin Bağlanma Şekilleri: Seri Bağlama ve Paralel Bağlama",
                    "Seri ve Paralel Devrelerde Akım, Gerilim ve Ampul Parlaklığı",
                    "Elektrik Akımının Tanımı ve Ampermetre ile Ölçümü",
                    "Gerilim (Potansiyel Farkı) Tanımı ve Voltmetre ile Ölçümü",
                    "Ohm Yasası (R = V / I) ve Direnç Hesaplamaları"
                ],
                "Öğrenim Çıktıları": [
                    "Ampullerin seri ve paralel bağlandığı devreler kurarak akım yollarını modeller.",
                    "Seri bağlı ampul sayısı arttıkça parlaklığın azaldığını, paralel bağlı devrelerde parlaklığın değişmediğini deneyle keşfeder.",
                    "Devredeki elektrik akımını ampermetre ile gerilimi voltmetre ile ölçer; ampermetrenin seri, voltmetrenin paralel bağlandığını kavrar.",
                    "Bir iletkenin uçları arasındaki gerilim ile üzerinden geçen akım arasındaki oranı (Ohm Yasası) grafik üzerinden hesaplar."
                ]
            }
        },
        "Sosyal Bilgiler": {
            "1. Tema: İletişim ve İnsan İlişkileri": {
                "Konular": [
                    "İletişimi Etkileyen Tutumlar (Ben Dili, Sen Dili, Empati)",
                    "Etkili Dinleme ve İletişim Kazaları",
                    "Kitle İletişim Araçları, Medya Etiği ve Doğru Bilgi Alma Hakkı",
                    "Kamuoyu Oluşturma, Sansür ve Tekzip"
                ],
                "Öğrenim Çıktıları": [
                    "Bireyler arası iletişimde 'sen dili' yerine yapıcı olan 'ben dili'ni kullanmaya özen gösterir.",
                    "Medyanın sunduğu haberleri sorgular; sansür, tekzip ve haber alma özgürlüğü kavramlarını tartışır.",
                    "Kitle iletişim araçlarının kamuoyu oluşturmadaki dönüştürücü gücünü analiz eder."
                ]
            },
            "2. Tema: Türk Tarihinde Yolculuk": {
                "Konular": [
                    "Osmanlı Devleti'nin Kuruluşu, Beylikten Devlete Geçiş",
                    "Osmanlı Askerî Teşkilatı (Tımarlı Sipahiler ve Yeniçeriler)",
                    "İstanbul'un Fethi ve Dünya Tarihindeki Sonuçları",
                    "Denizlerde Hâkimiyet (Preveze Deniz Zaferi)",
                    "Osmanlı Kültür, Sanat ve Hoşgörü Politikası (İstimalet)",
                    "Osmanlı Devleti'nde Islahat Hareketleri (Lale Devri ve Tanzimat)"
                ],
                "Öğrenim Çıktıları": [
                    "Osmanlı Devleti'nin kısa sürede beylikten imparatorluğa dönüşmesinde gaza anlayışı ve istimalet (hoşgörü) politikasının rolünü kavrar.",
                    "Tımar sisteminin ordu, tarım ve vergi toplamaya sağladığı katkıları inceler.",
                    "İstanbul'un fethinin siyasi, ekonomik ve dini sonuçlarını küresel boyutta analiz eder.",
                    "Avrupa'daki gelişmelere karşı Osmanlı'da gerçekleştirilen askerî ve sivil yenileşme hareketlerini değerlendirir."
                ]
            },
            "3. Tema: Ülkemizde Nüfus": {
                "Konular": [
                    "Türkiye'de Nüfusun Dağılışını Etkileyen Doğal ve Beşerî Faktörler",
                    "Nüfus Sayımları ve Demografik Veriler (Yaş, Cinsiyet, Eğitim)",
                    "Göçün Nedenleri ve Sonuçları (İç Göç, Dış Göç, Beyin Göçü)",
                    "Anayasa Güvencesinde Yerleşme ve Seyahat Özgürlüğü"
                ],
                "Öğrenim Çıktıları": [
                    "Türkiye nüfusunun kıyı ve iç kesimlerdeki dağılış nedenlerini fiziki ve ekonomik verilerle analiz eder.",
                    "Nüfus piramitlerini ve demografik tabloları yorumlayarak Türkiye'nin nüfus yapısını açıklar.",
                    "İç ve dış göç hareketlerinin sosyal, ekonomik ve kentsel altyapı üzerindeki etkilerini tartışır.",
                    "Yerleşme ve seyahat hürriyetinin hangi kanuni şartlarda sınırlandırılabileceğini kavrar."
                ]
            },
            "4. Tema: Zaman İçinde Bilim": {
                "Konular": [
                    "Yazının İcadı ve Bilginin Depolanması (Kil Tabletlerden Buluta)",
                    "Orta Çağ İslam Dünyasında Bilim ve Beytü'l-Hikme",
                    "Avrupa'da Rönesans, Reform, Aydınlanma Çağı ve Sanayi Devrimi",
                    "Düşünce Özgürlüğü ve Bilimsel Gelişmeler"
                ],
                "Öğrenim Çıktıları": [
                    "Yazı ve matbaanın icadının bilginin korunması ve yayılmasındaki tarihsel önemini değerlendirir.",
                    "İslam dünyasındaki bilimsel birikimin tercüme faaliyetleriyle Avrupa'ya geçişini inceler.",
                    "Rönesans ve Aydınlanma Çağı düşünürlerinin skolastik düşünceyi yıkarak bilime açtığı yolu açıklar."
                ]
            },
            "5. Tema: Ekonomi ve Sosyal Hayat": {
                "Konular": [
                    "Toprağın Üretimdeki Önemi (İkta, Tımar ve Günümüz Tarımı)",
                    "Üretim Teknolojisindeki Gelişmeler ve Sanayileşme",
                    "Vakıf Medeniyeti ve Sosyal Yardımlaşma",
                    "Mesleki Eğitim: Ahilik Teşkilatı, Loncalar ve Meslek Liseleri"
                ],
                "Öğrenim Çıktıları": [
                    "Tarihten günümüze toprak mülkiyeti ve yönetim sistemlerinin ekonomik kalkınmadaki rolünü kavrar.",
                    "Ahilik teşkilatının mesleki ahlak, kalite standardı ve esnaf dayanışmasındaki işlevini analiz eder.",
                    "Osmanlı vakıf sisteminin eğitim, sağlık ve bayındırlık hizmetlerindeki vazgeçilmez yerini değerlendirir."
                ]
            },
            "6. Tema: Yaşayan Demokrasi": {
                "Konular": [
                    "Demokrasinin Tarihsel Gelişim Süreci (Antik Yunan'dan Magna Carta'ya)",
                    "Türkiye Cumhuriyeti'nin Temel Organları ve Kuvvetler Ayrılığı",
                    "Siyasi Partiler ve Demokratik Katılım",
                    "Demokrasinin Önündeki Tehditler (Darbeler ve Vesayet)"
                ],
                "Öğrenim Çıktıları": [
                    "Demokrasi anlayışının tarihsel süreçteki basamaklarını ve insan hakları bildirgelerini açıklar.",
                    "Cumhuriyet rejiminde halkın oy hakkı ve siyasi partiler aracılığıyla yönetime katılımını kavrar.",
                    "Hukukun üstünlüğü ve anayasal düzeni korumanın vatandaşlık bilinci açısından önemini savunur."
                ]
            },
            "7. Tema: Küresel Sorunlar": {
                "Konular": [
                    "Uluslararası Örgütler (BM, NATO, Türk Devletleri Teşkilatı)",
                    "Küresel İklim Değişikliği, Kuraklık ve Su Krizi",
                    "Açlık, Salgın Hastalıklar ve Savaş Göçleri",
                    "Küresel Sorunlara Karşı Ortak Çözümler"
                ],
                "Öğrenim Çıktıları": [
                    "Türkiye'nin üye olduğu bölgesel ve uluslararası kuruluşların dünya barışına katkısını değerlendirir.",
                    "Küresel çevre sorunları ve tatlı su kaynaklarının tükenmesine karşı bireysel ve küresel önlemleri tartışır.",
                    "Savaş mağdurları ve mültecilere yönelik insani diplomasi ilkelerini açıklar."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Melek ve Ahiret İnancı": {
                "Konular": [
                    "Varlıklar Âlemi: Görünen ve Görünmeyen Varlıklar",
                    "Meleklerin Özellikleri ve Dört Büyük Melek (Cebrail, Mikail, İsrafil, Azrail)",
                    "Cin ve Şeytan Kavramları, Şeytanın Kötülüklerinden Korunma",
                    "Ahiret Hayatının Aşamaları (Kıyamet, Ba's, Mahşer, Mizan, Cennet, Cehennem)",
                    "Nas Suresi ve Anlamı"
                ],
                "Öğrenim Çıktıları": [
                    "Varlıklar âlemini maddi ve manevi boyutlarıyla sınıflandırarak meleklerin niteliklerini kavrar.",
                    "Ahiret inancının insanın sorumluluk bilincine ve ahlaki davranışlarına etkisini açıklar.",
                    "Ölüm, kabir hayatı, kıyamet ve mahşer günündeki adil hesabı ayetlerle temellendirir.",
                    "Nas suresini doğru sesletimle okur ve kötülüklerden Allah'a sığınma mesajını açıklar."
                ]
            },
            "2. Tema: Hac ve Kurban": {
                "Konular": [
                    "Hac İbadeti: Anlamı, Şartları ve Farzları (İhram, Kâbe'yi Tavaf, Arafat Vakfesi)",
                    "Hacla İlgili Mekânlar ve Kavramlar (Mikat, Say, Sa'y, Safa-Merve, Şeytan Taşlama)",
                    "Umre İbadeti ve Hacdan Farkları",
                    "Kurban İbadeti: Hükmü, Şartları ve Toplumsal Dayanışmadaki Rolü"
                ],
                "Öğrenim Çıktıları": [
                    "Hac ibadetinin bireysel arınma ve dünya Müslümanlarının kardeşliğini pekiştirmedeki işlevini açıklar.",
                    "Haccın farzlarını ve sembolik anlamlarını (ihramın eşitliği temsil etmesi vb.) kavrar.",
                    "Kurban ibadetinin Allah'a yakınlaşma ve toplumda yoksulları gözetme boyutunu değerlendirir."
                ]
            },
            "3. Tema: Ahlaki Davranışlar": {
                "Konular": [
                    "İslam'ın Övdüğü Ahlaki Tutumlar (Doğruluk, Emanet, Adalet, Vatanseverlik, Sabır)",
                    "İslam'ın Yerdiği Davranışlar (Yalan, Gıybet, İftira, Hile, Kıskançlık)",
                    "Kul Hakkı ve Önemi",
                    "Felak Suresi ve Anlamı"
                ],
                "Öğrenim Çıktıları": [
                    "İslam ahlakının temelini oluşturan erdemleri ayet ve hadisler ışığında davranışlarına yansıtır.",
                    "Dedikodu, iftira ve yalanın bireyler arası güveni sarsıcı zararlarını tartışır.",
                    "Kul hakkının affedilmesinde helalleşmenin zorunlu olduğunu kavrar.",
                    "Felak suresini ezbere okur ve kıskançlık ile hasetten korunma anlamını açıklar."
                ]
            },
            "4. Tema: İslam Düşüncesinde Yorumlar": {
                "Konular": [
                    "Dinin Anlaşılmasında Farklı Yorumların (Mezheplerin) Çıkış Sebepleri",
                    "İtikadi (İnançla İlgili) Yorumlar: Maturidilik ve Eş'arilik",
                    "Ameli-Fıkhi (İbadetle İlgili) Yorumlar: Hanefilik, Malikilik, Şafiilik, Hanbelilik",
                    "Tasavvufi Yorumlar: Yesevilik, Mevlevilik, Nakşibendilik, Alevilik-Bektaşilik"
                ],
                "Öğrenim Çıktıları": [
                    "İslam düşüncesindeki farklı mezhep ve yorumların kültürel bir zenginlik olduğunu kavrar.",
                    "İtikadi ve ameli mezheplerin temel yaklaşımlarını tanır.",
                    "Alevilik-Bektaşilik kültüründeki cem, cemevi, semah ve gülbank kavramlarını öğrenir."
                ]
            },
            "5. Tema: Din ve Güzel Sanatlar": {
                "Konular": [
                    "İslam'ın Sanata ve Estetiğe Bakışı",
                    "Cami Mimarisi, Hat Sanatı, Tezhip ve Ebru",
                    "Türk Tasavvuf Musikisi ve Edebiyatımızdaki Naatlar"
                ],
                "Öğrenim Çıktıları": [
                    "İslam medeniyetinde mimari, süsleme ve musikinin dinin ruhuyla nasıl bütünleştiğini analiz eder.",
                    "Hat, tezhip ve ebru sanatçılarının sabır ve estetik anlayışlarını takdir eder.",
                    "Edebiyatımızdaki naat, mevlid ve ilahilerin taşıdığı manevi duyguları açıklar."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: Appearance and Personality": {
                "Konular": [
                    "Describing Physical Appearance (slim, well-built, freckles, wavy hair)",
                    "Describing Personality Traits (generous, stubborn, punctual, outgoing)",
                    "Making Comparisons with Comparative Adjectives"
                ],
                "Öğrenim Çıktıları": [
                    "Describes peers and historical figures using rich appearance and personality vocabulary.",
                    "Makes comparative evaluations between people's characters accurately.",
                    "Understands audio interviews about people's personal traits."
                ]
            },
            "Theme 2: Sports": {
                "Konular": [
                    "Indoor and Outdoor Sports Disciplines",
                    "Sports Equipment and Venues",
                    "Talking About Frequency of Actions with Adverbs of Frequency",
                    "Simple Present Tense with Sports Routines"
                ],
                "Öğrenim Çıktıları": [
                    "Categorizes individual and team sports according to equipment and playing surfaces.",
                    "Talks about training routines and matches using frequency adverbs (always, rarely).",
                    "Interviews an athlete and notes down their training regimen."
                ]
            },
            "Theme 3: Biographies": {
                "Konular": [
                    "Life Milestones: Born, Grow Up, Graduate, Marry, Achieve, Die",
                    "Talking About Past Events and Dates with Simple Past Tense",
                    "Sequencing Historical Events Chronologically"
                ],
                "Öğrenim Çıktıları": [
                    "Narrates past life stories and achievements of renowned scientists and artists.",
                    "Asks and answers questions about specific past dates, historical eras, and milestones.",
                    "Writes a well-structured short biography of an inspiring role model."
                ]
            },
            "Theme 4: Wild Animals": {
                "Konular": [
                    "Habitats and Endangered Animal Species (reptiles, mammals, carnivores)",
                    "Human Impact on Wildlife and Extinction",
                    "Giving Suggestions and Warnings with 'Should / Shouldn't'"
                ],
                "Öğrenim Çıktıları": [
                    "Classifies wild animal species according to their habitats, diets, and biological groups.",
                    "Explains reasons behind species extinction and deforestation.",
                    "Proposes conservation measures to protect endangered animals using modal verbs."
                ]
            },
            "Theme 5: Television": {
                "Konular": [
                    "Television Program Types (documentary, soap opera, reality show, sitcom)",
                    "Expressing Preferences with 'Prefer' (prefer something to something else)",
                    "Giving Opinions and Recommendations about TV Shows"
                ],
                "Öğrenim Çıktıları": [
                    "Names different broadcast genres and states personal viewing habits.",
                    "Uses 'prefer' structure with nouns and gerunds (-ing) to contrast choices.",
                    "Writes a brief review recommending an educational TV documentary."
                ]
            },
            "Theme 6: Celebrations": {
                "Konular": [
                    "Party Types: Birthday, Anniversary, Graduation, Welcome Party",
                    "Making Arrangements and Shopping Lists",
                    "Quantifiers: a few, a little, a lot of, much, many",
                    "Writing and Responding to Invitation Letters"
                ],
                "Öğrenim Çıktıları": [
                    "Plans an event checklist and categorizes party supplies using quantifiers.",
                    "Writes formal and informal invitation cards, expressing acceptance or refusal politely.",
                    "Discusses party arrangements in paired communicative activities."
                ]
            },
            "Theme 7: Dreams": {
                "Konular": [
                    "Future Predictions and Personal Ambitions",
                    "Using Simple Future Tense with 'Will / Won't'",
                    "Expressing Hopes and Beliefs (I hope, I believe, definitely, probably)"
                ],
                "Öğrenim Çıktıları": [
                    "Makes optimistic or realistic forecasts about future careers and world events.",
                    "Uses future modals (will/won't) alongside adverbs of certainty.",
                    "Shares long-term aspirations regarding education and travels."
                ]
            },
            "Theme 8: Public Buildings": {
                "Konular": [
                    "City Services and Public Buildings (municipality, police station, fire station)",
                    "Expressing Purpose with Infinitive of Purpose ('to + verb')",
                    "Describing Errands and Urban Daily Tasks"
                ],
                "Öğrenim Çıktıları": [
                    "Identifies municipal buildings and explains why people visit them.",
                    "Formulates sentences indicating purpose using 'to' (e.g., I went to the bakery to buy bread).",
                    "Follows dialogs about urban errands and pinpoints destinations on maps."
                ]
            },
            "Theme 9: Environment": {
                "Konular": [
                    "Global Warming, Carbon Footprint and Pollution",
                    "Obligations and Prohibitions with 'Must / Mustn't' and 'Have to'",
                    "Renewable Energy and Sustainable Solutions"
                ],
                "Öğrenim Çıktıları": [
                    "Discusses environmental problems and human ecological footprints.",
                    "Expresses strict environmental rules and personal obligations using 'must' and 'have to'.",
                    "Designs an environmental action campaign with actionable slogans."
                ]
            },
            "Theme 10: Planets": {
                "Konular": [
                    "Planets in the Solar System, Orbits and Satellites",
                    "Making Comparisons with Superlative Adjectives (-est, the most)",
                    "Scientific Facts and Planetary Data"
                ],
                "Öğrenim Çıktıları": [
                    "Names planets and compares their sizes, distances, and temperatures using superlatives.",
                    "Extracts scientific details from texts regarding planetary exploration and space probes.",
                    "Presents comparative planetary facts in structured digital slides."
                ]
            }
        },
        "Teknoloji ve Tasarım": {
            "1. Tema: Tasarım Odaklı Süreç": {
                "Konular": [
                    "Tasarım Odaklı Düşünme (Design Thinking) Basamakları",
                    "Problemi Tanımlama, Empati Kurma ve Araştırma",
                    "Fikir Geliştirme (Beyin Fırtınası, SCAMPER)",
                    "Tasarım Kriterleri ve Değerlendirme Matrisi"
                ],
                "Öğrenim Çıktıları": [
                    "Günlük yaşamda karşılaştığı bir soruna yönelik tasarım odaklı düşünme adımlarını uygular.",
                    "Hedef kullanıcı kitlesiyle empati kurarak ihtiyaç analizi raporu hazırlar.",
                    "Yaratıcı fikir geliştirme yöntemleriyle alternatif çözüm eskizleri çizer."
                ]
            },
            "2. Tema: Temel Tasarım İlkeleri": {
                "Konular": [
                    "Tasarım Elemanları: Çizgi, Renk, Doku, Şekil, Form",
                    "Tasarım İlkeleri: Denge, Ritim, Bütünlük, Vurgu, Oran-Orantı",
                    "İki Boyutlu ve Üç Boyutlu Çizim Teknikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Görsel tasarım ilkelerini analiz ederek dengeli ve estetik kompozisyonlar oluşturur.",
                    "Nesnelerin izometrik ve perspektif teknik çizimlerini kurallara uygun çizer.",
                    "Renk çemberi ve kontrast kurallarını tasarımlarında bilinçli kullanır."
                ]
            },
            "3. Tema: Görsel İletişim ve Ürün Tasarımı": {
                "Konular": [
                    "Ergonomi ve Antropometri Kavramları",
                    "Malzeme Bilgisi (Ahşap, Metal, Plastik, Kompozit)",
                    "Prototip Üretimi ve Model Yapımı",
                    "Ürün Testi ve Kullanıcı Geri Bildirimi"
                ],
                "Öğrenim Çıktıları": [
                    "Ürün tasarımında insan vücut ölçülerine (antropometri) ve kullanım kolaylığına (ergonomi) dikkat eder.",
                    "Tasarım amacına uygun dayanıklı ve işlenebilir malzeme seçimi yapar.",
                    "Geliştirdiği özgün ürünün işlevsel maketini veya prototipini inşa eder ve test eder."
                ]
            },
            "4. Tema: İnovasyon ve Girişimcilik": {
                "Konular": [
                    "İnovasyon Türleri (Ürün, Süreç, Pazarlama, Sosyal İnovasyon)",
                    "Buluş, Keşif ve İnovasyon Farkı",
                    "Fikri ve Sınai Mülkiyet Hakları (Patent, Faydalı Model, Marka Tescili)"
                ],
                "Öğrenim Çıktıları": [
                    "Mevcut ürünlerdeki eksiklikleri tespit ederek inovatif iyileştirmeler önerir.",
                    "Buluşların korunmasında Türk Patent ve Marka Kurumu tescil süreçlerini kavrar.",
                    "Özgün ürününü pazarlayabilecek bir iş modeli ve sunum dosyası hazırlar."
                ]
            }
        },
        "Müzik": {
            "1. Tema: Müziksel Algı ve Bilgilenme": {
                "Konular": [
                    "Aralık Bilgisi ve Gamlar (Majör ve Minör Diziler)",
                    "Türk Sanat Müziği Usulleri (Nim Sofyan, Semai, Düyek)",
                    "Farklı Dönem ve Türlerde Dünya Müziği (Barok, Klasik, Romantik)"
                ],
                "Öğrenim Çıktıları": [
                    "Müzikte aralık kavramını ve majör-minör dizilerin tınısal farklarını ayırt eder.",
                    "Geleneksel Türk musikisinde temel usulleri diz vurarak icra eder.",
                    "Batı müziğinin tarihsel dönemlerini ve önemli bestecilerini (Bach, Mozart, Beethoven) tanır."
                ]
            },
            "2. Tema: Müziksel Yaratıcılık ve İcra": {
                "Konular": [
                    "Toplu Çalma ve Söyleme Kuralları",
                    "Bölgesel Türküler ve Tavırlar",
                    "Müzik Teknolojileri ile Ses Kaydı ve Düzenleme"
                ],
                "Öğrenim Çıktıları": [
                    "Koro ve orkestra icralarında şef işaretlerine ve ritmik disipline uyar.",
                    "Farklı yörelerimize ait türküleri yöresel tavır ve hançereye uygun seslendirir.",
                    "Mobil veya bilgisayar tabanlı müzik programlarında ses kaydı alarak çok kanallı miksaj yapar."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Tema: Görsel Sanat Kültürü": {
                "Konular": [
                    "Modern Sanat Akımları (Empresyonizm, Kübizm, Sürrealizm)",
                    "Türk Resim Sanatının Öncüleri (Osman Hamdi Bey, İbrahim Çallı)",
                    "Sanat Eseri Analiz Yöntemleri (Biçim, İçerik, Bağlam)"
                ],
                "Öğrenim Çıktıları": [
                    "Modern sanat akımlarının ortaya çıkış nedenlerini ve görsel özelliklerini açıklar.",
                    "Cumhuriyet öncesi ve sonrası Türk ressamlarının eserlerini tematik olarak inceler.",
                    "Bir sanat yapıtını estetik, toplumsal ve felsefi bağlamda eleştirir."
                ]
            },
            "2. Tema: Sanatsal Tasarım": {
                "Konular": [
                    "Üç Kaçışlı Perspektif Çizimleri ve Kuşbakışı Görünüm",
                    "Akrilik ve Guaj Boya Teknikleri",
                    "Grafik Tasarımda Logo, Amblem ve Piktogram Üretimi"
                ],
                "Öğrenim Çıktıları": [
                    "Kuşbakışı ve solucan gözü bakış açısıyla üç kaçışlı perspektif çizimleri yapar.",
                    "Boya katmanları ve renk geçişleriyle tuval üzerinde özgün kompozisyonlar üretir.",
                    "Belirli bir kurum veya mesaj için sembolik değeri olan özgün amblem ve logolar tasarlar."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Hareket Yetkinliği": {
                "Konular": [
                    "Voleybolda Blok, Smaç ve Hücum Taktikleri",
                    "Basketbolda Alan Savunması ve Hızlı Hücum (Fast-Break)",
                    "Futbolda Ofsayt Kuralı, Taktik Diziliş ve Duran Toplar",
                    "Atletizmde Bayrak Koşuları ve Yüksek Atlama"
                ],
                "Öğrenim Çıktıları": [
                    "Voleybolda smaç ve ikili blok hareketlerini oyun esnasında uygular.",
                    "Basketbolda birebir savunma ve alan savunması taktiklerini uygular.",
                    "Futbolda takım dizilişine uygun mevkisinde görev yapar ve taktik uygular.",
                    "Bayrak koşularında bayrak değişimini teknik kurallara uygun olarak hatasız yürütür."
                ]
            },
            "2. Tema: Aktif ve Sağlıklı Yaşam": {
                "Konular": [
                    "Kişisel Antrenman Programı Planlama",
                    "Spor Sakatlıklarında RICE Protokolü (Dinlenme, Buz, Kompresyon, Yükseltme)",
                    "Doping ve Zararlı Maddelerin Sporcu Sağlığına Etkileri"
                ],
                "Öğrenim Çıktıları": [
                    "Kendi fiziksel kapasitesine uygun haftalık egzersiz ve kondisyon programı hazırlar.",
                    "Burkulma ve kas zedelenmelerinde temel ilkyardım basamağı olan RICE uygulamasını öğrenir.",
                    "Sporda dürüst rekabeti zedeleyen doping maddelerinin biyolojik zararlarını değerlendirir."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Tema: Programlama Temelleri": {
                "Konular": [
                    "Scratch ile karmaşık projeler geliştirir",
                    "'Programlama Temelleri' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir",
                    "'Programlama Temelleri' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır",
                    "Öğrendiği bilgileri kullanarak 'Programlama Temelleri' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar",
                    "'Programlama Temelleri' konusunun günlük yaşamdaki yeri hakkında verileri toplar"
                ],
                "Öğrenim Çıktıları": [
                    "Scratch ile karmaşık projeler geliştirir.",
                    "'Programlama Temelleri' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                    "'Programlama Temelleri' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                    "Öğrendiği bilgileri kullanarak 'Programlama Temelleri' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                    "'Programlama Temelleri' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
                ]
            },
            "2. Tema: Veri Yönetimi": {
                "Konular": [
                    "Elektronik tablolar (Excel) kullanır",
                    "'Veri Yönetimi' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir",
                    "'Veri Yönetimi' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır",
                    "Öğrendiği bilgileri kullanarak 'Veri Yönetimi' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar",
                    "'Veri Yönetimi' konusunun günlük yaşamdaki yeri hakkında verileri toplar"
                ],
                "Öğrenim Çıktıları": [
                    "Elektronik tablolar (Excel) kullanır.",
                    "'Veri Yönetimi' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                    "'Veri Yönetimi' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                    "Öğrendiği bilgileri kullanarak 'Veri Yönetimi' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                    "'Veri Yönetimi' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
                ]
            }
        },
        "Seçmeli Zeka Oyunları": {
            "1. Tema: Mantıksal Çıkarım": {
                "Konular": [
                    "Karmaşık problemleri alt adımlara böler",
                    "'Mantıksal Çıkarım' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Mantıksal Çıkarım' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Mantıksal Çıkarım' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Mantıksal Çıkarım' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Karmaşık problemleri alt adımlara böler.",
                    "'Mantıksal Çıkarım' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Mantıksal Çıkarım' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Mantıksal Çıkarım' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Mantıksal Çıkarım' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            },
            "2. Tema: Yaratıcılık": {
                "Konular": [
                    "Farklı çözüm yolları üretir",
                    "'Yaratıcılık' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur",
                    "'Yaratıcılık' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer",
                    "Öğrendiği bilgileri kullanarak 'Yaratıcılık' alanında geometrik ilişkileri keşfeder ve kanıtlar",
                    "'Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı çözüm yolları üretir.",
                    "'Yaratıcılık' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                    "'Yaratıcılık' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                    "Öğrendiği bilgileri kullanarak 'Yaratıcılık' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                    "'Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
                ]
            }
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "1. Tema: Travel and Culture": {
                "Konular": [
                    "Gezi planı yapar",
                    "'Travel and Culture' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Travel and Culture' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Travel and Culture' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Travel and Culture' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Gezi planı yapar.",
                    "'Travel and Culture' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Travel and Culture' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Travel and Culture' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Travel and Culture' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        }
    },
    "8. Sınıf": {
        "Türkçe": {
            "1. Tema: Erdemler": {
                "Konular": [
                    "Fiilimsiler (İsim-Fiil, Sıfat-Fiil, Zarf-Fiil)",
                    "Söz Sanatları (Teşbih, İstiare, Tezat, Kişileştirme, Konuşturma)",
                    "Metnin Konusu, Ana Fikri ve Yardımcı Fikirleri",
                    "Düşünce Yazısı (Makale ve Deneme) Yazma"
                ],
                "Kazanımlar": [
                    "Fiilimsilerin cümledeki işlevlerini ve eklerini kavrar; fiilimsi türlerini ayırt eder.",
                    "Metindeki söz sanatlarını tespit ederek edebi metne kattığı anlam derinliğini yorumlar.",
                    "Okuduğu metnin konusunu, ana fikrini ve ana fikri destekleyen yardımcı fikirleri belirler.",
                    "Erdemler ve ahlaki değerler üzerine düşüncelerini kanıtlar sunarak makale veya deneme formunda yazar."
                ]
            },
            "2. Tema: Millî Mücadele ve Atatürk": {
                "Konular": [
                    "Cümlenin Ögeleri (Temel ve Yardımcı Ögeler, Ara Sözler)",
                    "Cümlede Vurgu",
                    "Anlatım Biçimleri (Açıklama, Tartışma, Öyküleme, Betimleme)",
                    "Düşünceyi Geliştirme Yolları (Tanımlama, Karşılaştırma, Örneklendirme, Tanık Gösterme)"
                ],
                "Kazanımlar": [
                    "Cümlenin temel ögelerini (yüklem, özne) ve yardımcı ögelerini (nesne, yer tamlayıcısı, zarf tamlayıcısı) doğru analiz eder.",
                    "Cümlede vurgulanan ögeyi yüklemin türüne ve konumuna göre tespit eder.",
                    "Metindeki anlatım biçimlerini ve düşünceyi geliştirme yollarını belirleyerek metin çözümlemesi yapar.",
                    "Atatürk'ün askerlik dehası ve fikir hayatını yansıtan metinleri dil ve anlatım yönünden inceler."
                ]
            },
            "3. Tema: Bilim ve Teknoloji": {
                "Konular": [
                    "Fiilde Çatı: Özne-Yüklem İlişkisi (Etken, Edilgen)",
                    "Fiilde Çatı: Nesne-Yüklem İlişkisi (Geçişli, Geçişsiz)",
                    "Grafik, Tablo ve İnfografik Yorumlama",
                    "Metin Türleri: Makale, Fıkra ve Söyleşi Ayrımı"
                ],
                "Kazanımlar": [
                    "Fiillerin çatı özelliklerini öznesine göre (etken/edilgen) ve nesnesine göre (geçişli/geçişsiz) değerlendirir.",
                    "İsim cümlelerinde çatı özelliği aranmayacağını kavrar.",
                    "Bilgilendirici metinlerdeki grafik, istatistiki tablo ve infografiklerden hareketle analitik çıkarımlar yapar.",
                    "Yapay zekâ ve bilimsel gelişmelerle ilgili eleştirel bir değerlendirme yazısı kaleme alır."
                ]
            },
            "4. Tema: Birey ve Toplum": {
                "Konular": [
                    "Cümle Türleri: Anlamına Göre (Olumlu, Olumsuz, Soru, Ünlem)",
                    "Cümle Türleri: Yüklemin Türüne ve Yerine Göre (İsim/Fiil, Kurallı/Devrik)",
                    "Cümle Türleri: Yapısına Göre (Tek Yüklemli, Fiilimsili, Birden Çok Yüklemli, Bağlaçlı Cümleler)",
                    "Anlatım Bozuklukları (Yapısal ve Anlamsal Düzeyde)"
                ],
                "Kazanımlar": [
                    "Cümleleri yükleminin yerine, türüne, anlamına ve yapısına göre sınıflandırır.",
                    "Tek yüklemli, içinde fiilimsi bulunan, birden çok yüklemli ve bağlı cümleleri ayırt eder.",
                    "Öge eksikliği, özne-yüklem uyumsuzluğu, tamlama ve çatı uyuşmazlığından kaynaklanan anlatım bozukluklarını düzeltir.",
                    "Toplumsal sorumluluk ve insan hakları konularında ikna edici konuşmalar yürütür."
                ]
            },
            "5. Tema: Zaman ve Mekân": {
                "Konular": [
                    "Metindeki Örtülü Anlamlar ve Alt Metin Çıkarımı",
                    "Hikâye Edici Metinlerde Olay Örgüsü, Zaman, Mekân ve Anlatıcı",
                    "Yazım Kuralları (Büyük Harfler, Kısaltmalar, Sayılar)",
                    "Noktalama İşaretlerinin Eksiksiz Uygulanması"
                ],
                "Kazanımlar": [
                    "Okuduğu metindeki açık ve örtük anlamları tespit eder; alt metin çözümlemesi yapar.",
                    "Olay metinlerinde serim, düğüm, çözüm evrelerini ve anlatıcı bakış açılarını tahlil eder.",
                    "Yazılarında noktalama işaretlerini ve yazım kurallarını hatasız uygulayarak imla bilinci sergiler.",
                    "Mekânın insan psikolojisi üzerindeki etkisini betimleyici unsurlarla anlatan hikâye yazar."
                ]
            },
            "6. Tema: Millî Kültürümüz": {
                "Konular": [
                    "Sözcükte ve Söz Öbeklerinde Anlam İncelikleri",
                    "Deyim, Atasözü ve İkilemelerin Metindeki Rolü",
                    "Paragrafta Yapı (Paragraf Tamamlama, Akışı Bozan Cümle, İkiye Bölme)",
                    "Görsel Okuma ve Karikatür Analizi"
                ],
                "Kazanımlar": [
                    "Kelimelerin ve söz öbeklerinin bağlama göre kazandığı yeni anlamları belirler.",
                    "Paragrafın giriş, gelişme ve sonuç cümlelerini tespit eder; anlatımın akışını bozan cümleyi bulur.",
                    "Millî kültür ögelerimizi ve geleneklerimizi anlatan edebi metinleri üslup yönünden inceler.",
                    "Karikatür, afiş ve fotoğrafların verdiği mesajları eleştirel gözle yorumlar."
                ]
            },
            "7. Tema: Doğa ve Evren": {
                "Konular": [
                    "Mantık ve Muhakeme Becerileri, Çıkarım Yapma",
                    "Metinler Arası Karşılaştırma",
                    "Çevre Kirliliği ve İklim Krizi Metinleri",
                    "Özgün Betimleyici Metin Yazma"
                ],
                "Kazanımlar": [
                    "Sözel mantık ve akıl yürütme sorularında ipuçlarını değerlendirerek doğru eşleştirmeleri yapar.",
                    "Farklı türlerdeki metinlerin ortak ve ayrışan yönlerini içerik ve üslup bakımından karşılaştırır.",
                    "Metindeki sebep-sonuç, amaç-sonuç ve koşul-sonuç cümlelerini eksiksiz belirler.",
                    "Doğanın estetiğini ve çevre bilincini yansıtan özgün bir deneme yazar."
                ]
            },
            "8. Tema: Sanat": {
                "Konular": [
                    "Edebi Metinlerde Estetik Değer ve Üslup",
                    "Metin Türleri: Tiyatro, Deneme, Eleştiri, Röportaj",
                    "Anlatımın Özellikleri (Akıcılık, Duruluk, Özgünlük, Açıklık)",
                    "Münazara ve Panel Sunumu"
                ],
                "Kazanımlar": [
                    "Tiyatro metinlerindeki çatışmaları, diyalogları ve sahneleme tekniklerini çözümler.",
                    "Metnin anlatım özelliklerini duruluk, akıcılık, özgünlük ilkeleri doğrultusunda değerlendirir.",
                    "Sanatın toplumsal değişime katkısını savunan argümanlar geliştirerek panel veya münazara yürütür.",
                    "Sanatsal bir etkinliğe veya esere yönelik tarafsız bir eleştiri yazısı kaleme alır."
                ]
            }
        },
        "Matematik": {
            "1. Ünite: Çarpanlar ve Katlar / Üslü İfadeler": {
                "Konular": [
                    "Pozitif Tam Sayıların Pozitif Çarpanları ve Asal Çarpanlar",
                    "En Büyük Ortak Bölen (EBOB) ve En Küçük Ortak Kat (EKOK)",
                    "Aralarında Asal Sayılar",
                    "Tam Sayıların Tam Sayı Kuvvetleri (Negatif Üs)",
                    "Üslü İfadelerle Temel İşlemler (Çarpma, Bölme, Üssün Üssü)",
                    "Ondalık Gösterimlerin Çözümlenmesi ve Bilimsel Gösterim"
                ],
                "Kazanımlar": [
                    "Verilen pozitif tam sayıların çarpanlarını bulur, asal çarpan algoritmasıyla üslü biçimde yazar.",
                    "İki doğal sayının EBOB ve EKOK değerlerini hesaplar; günlük hayattaki parça-bütün problemlerini çözer.",
                    "Ortak böleni yalnızca 1 olan sayıların aralarında asal olduğunu açıklar.",
                    "Tam sayıların negatif kuvvetlerini hesaplar; üslü ifadelerle çarpma ve bölme kurallarını uygular.",
                    "Çok büyük ve çok küçük sayıları 10'un kuvvetleriyle gösterir; |a| 1 ile 10 arasında olmak üzere a x 10ⁿ biçimindeki bilimsel gösterimi kavrar."
                ]
            },
            "2. Ünite: Kareköklü İfadeler / Veri Analizi": {
                "Konular": [
                    "Tam Kare Pozitif Tam Sayılar ve Karekök Kavramı",
                    "Tam Kare Olmayan Sayıların Kareköklerini Tahmin Etme",
                    "Kareköklü Bir İfadeyi a√b Şeklinde Yazma ve Katsayıyı Kök İçine Alma",
                    "Kareköklü İfadelerde Toplama, Çıkarma, Çarpma ve Bölme",
                    "Ondalık İfadelerin Karekökleri",
                    "Gerçek Sayılar: Rasyonel ve İrrasyonel Sayı Ayrımı",
                    "Veri Analizi: Çizgi, Sütun ve Daire Grafikleri Arası Dönüşümler"
                ],
                "Kazanımlar": [
                    "Tam kare pozitif tam sayıların kareköklerini hesaplar; tam kare olmayan sayıların hangi iki ardışık tam sayı arasında olduğunu tahmin eder.",
                    "Kareköklü ifadeleri a√b şeklinde yazar ve katsayıyı kök içine alır.",
                    "Kareköklü ifadelerde dört işlem yapar; çarpıldığında sonucu doğal sayı yapan çarpanları belirler.",
                    "Ondalık gösterimlerin kareköklerini belirler.",
                    "Gerçek sayıları rasyonel ve irrasyonel (√2, π gibi) olarak sınıflandırır.",
                    "Verileri sütun, daire veya çizgi grafiği ile gösterir; grafikler arası uygun dönüşümleri yaparak yorumlar."
                ]
            },
            "3. Ünite: Basit Olayların Olma Olasılığı / Cebirsel İfadeler ve Özdeşlikler": {
                "Konular": [
                    "Bir Olayın Olasılığı ve Olası Durumların Sayısı",
                    "Eşit Olasılıklı, Kesin ve İmkânsız Olaylar",
                    "Basit Bir Olayın Olma Olasılığını Hesaplama",
                    "Cebirsel İfadelerle Çarpma İşlemi ve Modelleme",
                    "Özdeşlikler: İki Kare Farkı ve Tam Kare Özdeşlikleri",
                    "Cebirsel İfadeleri Çarpanlarına Ayırma Yöntemleri (Ortak Çarpan, Özdeşlikler)"
                ],
                "Kazanımlar": [
                    "Bir olayın olası durumlarını belirler; olayın olma olasılığının 0 (imkânsız) ile 1 (kesin) arasında olduğunu kavrar.",
                    "Basit olayların olma olasılığını (İstenen Durum / Tüm Durumlar) formülüyle hesaplar.",
                    "Cebirsel ifadeleri çarpar ve cebir karolarıyla modeller.",
                    "(a+b)², (a-b)² tam kare özdeşlikleri ile a²-b² iki kare farkı özdeşliğini geometrik modellerle açıklar.",
                    "Cebirsel ifadeleri ortak çarpan parantezine alma ve özdeşliklerden yararlanma yöntemleriyle çarpanlarına ayırır."
                ]
            },
            "4. Ünite: Doğrusal Denklemler / Eşitsizlikler": {
                "Konular": [
                    "Birinci Dereceden Bir Bilinmeyenli Denklemler",
                    "Koordinat Sistemi ve Sıralı İkililer",
                    "Doğrusal İlişkiler, Tablo ve Doğru Grafikleri (Eksenleri Kesen, Orijinden Geçen Doğrular)",
                    "Doğrunun Eğimi (m = Dikey / Yatay)",
                    "Birinci Dereceden Bir Bilinmeyenli Eşitsizlikler ve Sayı Doğrusunda Gösterme"
                ],
                "Kazanımlar": [
                    "Birinci dereceden bir bilinmeyenli rasyonel katsayılı denklemleri çözer.",
                    "Koordinat sistemini eksenler, bölgeler ve orijin üzerinden tanır; noktaları koordinatlarıyla eşleştirir.",
                    "Doğrusal denklemlerin grafiklerini çizer (x=a, y=b, y=mx, y=mx+n).",
                    "Doğrunun eğimini modellerle açıklar; dikey uzunluğun yatay uzunluğa oranı olarak hesaplar.",
                    "Küçüktür, büyüktür, küçük eşittir, büyük eşittir sembollerini içeren eşitsizlikleri çözer ve sayı doğrusunda gösterir."
                ]
            },
            "5. Ünite: Üçgenler / Eşlik ve Benzerlik": {
                "Konular": [
                    "Üçgende Kenarortay, Açıortay ve Yükseklik",
                    "Üçgen Eşitsizliği (Kenar Uzunlukları Arasındaki Bağıntı)",
                    "Üçgenin Kenar Uzunlukları ile Açı Ölçüleri Arasındaki İlişki",
                    "Üçgen Çizim Şartları (Üç Kenar, İki Kenar-Bir Açı, Bir Kenar-İki Açı)",
                    "Pisagor Bağıntısı (a² + b² = c²)",
                    "Eşlik ve Benzerlik Şartları, Benzerlik Oranı (k)"
                ],
                "Kazanımlar": [
                    "Üçgende kenarortay, açıortay ve yükseklik elemanlarını çizer ve özelliklerini belirler.",
                    "Üçgenin bir kenar uzunluğunun diğer iki kenarın farkının mutlak değerinden büyük, toplamından küçük olduğunu (üçgen eşitsizliği) kavrar.",
                    "Büyük açı karşısında büyük kenar bulunduğunu açıklar.",
                    "Cetvel, açıölçer ve pergel kullanarak belirli ölçülere sahip üçgenler çizer.",
                    "Dik üçgende Pisagor bağıntısını modellerle doğrular ve geometrik problemlerde uygular.",
                    "Benzer çokgenlerin karşılıklı kenar oranının benzerlik oranına (k) eşit olduğunu, eş şekillerin benzerlik oranının 1 olduğunu açıklar."
                ]
            },
            "6. Ünite: Dönüşüm Geometrisi / Geometrik Cisimler": {
                "Konular": [
                    "Öteleme Hareketi ve Koordinat Düzleminde Öteleme",
                    "Yansıma Hareketi ve Simetri Doğrusu (x ve y Eksenine Göre Yansıma)",
                    "Ardışık Öteleme ve Yansıma",
                    "Dik Prizmaların (Kare, Dikdörtgen, Üçgen) Açınımları, Yüzey Alanı ve Hacmi",
                    "Dik Dairesel Silindirin Açınımı, Yüzey Alanı ve Hacmi",
                    "Dik Piramit ve Dik Koninin Temel Elemanları ve Açınımları"
                ],
                "Kazanımlar": [
                    "Nokta, doğru parçası ve geometrik şekillerin öteleme ve yansıma altındaki görüntülerini koordinat sisteminde çizer.",
                    "Dik prizmaların temel elemanlarını tanır, açınımlarını çizer; yüzey alanı ve hacim bağıntılarını hesaplar.",
                    "Dik dairesel silindirin açınımını yapar; taban çevresi ile yan yüzey ilişkisini kavrar; yüzey alanı ve hacmini hesaplar.",
                    "Dik piramit ve dik koninin temel elemanlarını (tepe noktası, yükseklik, ana doğru) belirler ve açınımlarını inceler."
                ]
            }
        },
        "Fen Bilimleri": {
            "1. Ünite: Mevsimler ve İklim": {
                "Konular": [
                    "Dünya'nın Dönme Ekseni Eğikliği (23° 27')",
                    "Dünya'nın Güneş Etrafında Dolanma Hareketi ve Mevsimlerin Oluşumu",
                    "Güneş Işınlarının Geliş Açısı, Birim Yüzeye Düşen Işık Enerjisi",
                    "Ekinoks (21 Mart, 23 Eylül) ve Gündönümü (21 Haziran, 21 Aralık) Tarihleri",
                    "İklim ve Hava Olayları Arasındaki Farklar",
                    "Meteoroloji ve Klimatoloji Bilimleri",
                    "Küresel İklim Değişikliği, Sera Gazları ve Önlemler"
                ],
                "Kazanımlar": [
                    "Mevsimlerin oluşumunu Dünya'nın dönme ekseni eğikliği ve Güneş etrafındaki dolanma hareketiyle açıklar.",
                    "Işığın geliş açısına bağlı olarak birim yüzeye aktarılan ısı enerjisindeki değişimi deneylerle modeller.",
                    "İklim ile hava olayları arasındaki temel farkları (süre, alan, değişkenlik) açıklar.",
                    "Küresel iklim değişikliğinin nedenlerini ve sürdürülebilir çevre için alınacak tedbirleri tartışır."
                ]
            },
            "2. Ünite: DNA ve Genetik Kod": {
                "Konular": [
                    "Kromozom, DNA, Gen ve Nükleotid İlişkisi",
                    "DNA'nın Çift Sarmallı Yapısı ve Nükleotid Eşleşmesi (A-T, G-C)",
                    "DNA'nın Kendini Eşlemesi (Replikasyon) Basamakları",
                    "Kalıtım: Mendel Genetiği, Alel Gen, Fenotip ve Genotip",
                    "Tek Karakter Çaprazlamaları ve Akraba Evliliğinin Riskleri",
                    "Mutasyon, Modifikasyon, Adaptasyon ve Doğal Seçilim",
                    "Biyoteknoloji Uygulamaları, Genetik Mühendisliği ve Biyoetik"
                ],
                "Kazanımlar": [
                    "Nükleotid, gen, DNA ve kromozom kavramlarını karmaşıktan basite doğru sıralar ve modeller.",
                    "DNA'nın yapısını oluşturan organik baz, deoksiriboz şekeri ve fosfat ilişkisini açıklar.",
                    "Tek karakter çaprazlamalarında fenotip ve genotip oranlarını hesaplar; insanlarda cinsiyetin kalıtımını açıklar.",
                    "Mutasyon ile modifikasyon arasındaki farkları çevresel etmenler üzerinden açıklar.",
                    "Canlıların yaşadıkları çevreye uyum sağlama (adaptasyon) özelliklerini ve doğal seçilim sürecini kavrar.",
                    "Biyoteknoloji ve gen teknolojisi uygulamalarının faydalarını ve risklerini biyoetik açıdan değerlendirir."
                ]
            },
            "3. Ünite: Basınç": {
                "Konular": [
                    "Katı Basıncını Etkileyen Faktörler (Ağırlık/Kuvvet ve Temas Yüzey Alanı)",
                    "Sıvı Basıncını Etkileyen Faktörler (Derinlik ve Sıvı Yoğunluğu)",
                    "Sıvıların Basıncı İletmesi: Pascal Prensibi ve Teknolojik Uygulamaları",
                    "Gaz ve Açık Hava Basıncı (Torricelli Deneyi, Barometre)",
                    "Kapalı Kaplardaki Gaz Basıncı (Manometre)"
                ],
                "Kazanımlar": [
                    "Katı basıncının kuvvetle doğru, yüzey alanıyla ters orantılı olduğunu deneylerle keşfeder.",
                    "Sıvı basıncının derinlik ve yoğunlukla doğru orantılı olduğunu, kabın şekline bağlı olmadığını analiz eder.",
                    "Pascal prensibinin günlük hayat ve teknolojideki (hidrolik fren, vinç, berber koltuğu) uygulamalarını açıklar.",
                    "Açık hava basıncının varlığını kanıtlayan deneyleri yorumlar; yükseklik arttıkça açık hava basıncının azaldığını kavrar."
                ]
            },
            "4. Ünite: Madde ve Endüstri": {
                "Konular": [
                    "Periyodik Sistemin Tarihçesi ve Katman-Elektron Dağılımı",
                    "Elementlerin Sınıflandırılması: Metaller, Yarı Metaller, Ametaller, Soygazlar",
                    "Fiziksel ve Kimyasal Değişimler",
                    "Kimyasal Tepkimeler ve Kütlenin Korunumu Kanunu",
                    "Asitler ve Bazlar: Özellikleri, pH Ölçeği, İndikatörler",
                    "Asit Yağmurlarının Çevreye Etkileri ve Korunma Yolları",
                    "Maddenin Isı ile Etkileşimi: Öz Isı, Hâl Değişimi Isısı (Le, Lb), Isınma-Soğuma Grafikleri",
                    "Türkiye'de Kimya Endüstrisinin Gelişimi"
                ],
                "Kazanımlar": [
                    "Periyodik sistemde grup ve periyotların nasıl oluştuğunu açıklar; ilk 18 elementin sınıflandırmasını yapar.",
                    "Maddelerde meydana gelen değişimleri atomik bağların kopması veya yeni bağların oluşması üzerinden fiziksel/kimyasal olarak ayırt eder.",
                    "Kimyasal tepkimelerde atom türü, sayısı ve kütlenin korunduğunu modeller üzerinde gösterir.",
                    "Asit ve bazların pH değerlerini, belirteç renklerini açıklar; asit yağmurlarını önleyici tedbirler üretir.",
                    "Öz ısının ayırt edici bir özellik olduğunu deneyle kanıtlar; hâl değiştirme ısılarını hesaplar ve ısınma grafiklerini yorumlar."
                ]
            },
            "5. Ünite: Basit Makineler": {
                "Konular": [
                    "Basit Makinelerin Genel Çalışma İlkeleri (Kuvvet Kazancı, Yoldan Kayıp, İş Kolaylığı)",
                    "Makaralar: Sabit Makara, Hareketli Makara ve Palanga Sistemleri",
                    "Kaldıraçlar: Desteğin, Yükün ve Kuvvetin Ortada Olduğu Kaldıraç Çeşitleri",
                    "Eğik Düzlem, Çıkrık, Dişli Çarklar, Kasnaklar ve Vida Mekanizmaları",
                    "Basit Makinelerden Oluşan Bileşik Düzenekler"
                ],
                "Kazanımlar": [
                    "Basit makinelerin işten veya enerjiden kazanç sağlamadığını, yalnızca iş kolaylığı sağladığını açıklar.",
                    "Sabit ve hareketli makaralarda kuvvet kazancı ve ip çekilme miktarlarını karşılaştırır.",
                    "Kaldıraç çeşitlerini destek, yük ve kuvvetin konumuna göre sınıflandırarak günlük yaşam örnekleriyle eşleştirir.",
                    "Eğik düzlem ve çıkrık sistemlerinde kuvvet kazancını etkileyen değişkenleri deneyle keşfeder.",
                    "Farklı basit makineleri bir araya getirerek işlevsel bir bileşik makine modeli tasarlar."
                ]
            },
            "6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi": {
                "Konular": [
                    "Besin Zinciri ve Enerji Piramidi (Üreticiler, Tüketiciler, Ayrıştırıcılar)",
                    "Biyolojik Birikim ve Enerji Aktarımı (%10 Yasası)",
                    "Fotosentez: Denklemi, Işığa Bağımlı Faktörler ve Canlılar İçin Önemi",
                    "Hücresel Solunum: Oksijenli ve Oksijensiz Solunum, Fermantasyon (Laktik Asit ve Etil Alkol)",
                    "Madde Döngüleri: Su, Karbon, Azot ve Oksijen Döngüleri",
                    "Sürdürülebilir Kalkınma, Karbon ve Su Ayak İzi"
                ],
                "Kazanımlar": [
                    "Besin zincirinde üreticiden son tüketiciye doğru biyolojik birikimin arttığını, aktarılan enerjinin azaldığını açıklar.",
                    "Fotosentezin yapay ve doğal ışıkta gerçekleştiğini, fotosentez hızını etkileyen faktörleri (ışık şiddeti, CO₂ miktarı, sıcaklık) deneyle test eder.",
                    "Oksijenli ve oksijensiz solunum arasındaki ATP kazancı farkını karşılaştırır.",
                    "Madde döngülerinin ekosistem dengesindeki hayati rolünü değerlendirir.",
                    "Gelecek nesiller için doğal kaynakların tasarruflu kullanımını ve sürdürülebilir kalkınma modellerini savunur."
                ]
            },
            "7. Ünite: Elektrik Yükleri ve Elektrik Enerjisi": {
                "Konular": [
                    "Elektrik Yükleri ve Elektriklenme Çeşitleri: Sürtünme, Dokunma ve Etki ile Elektriklenme",
                    "Elektroskopun Çalışma Prensibi ve Yük Durumları",
                    "Topraklama Olayı ve Günlük Yaşamdaki Güvenlik Önlemleri",
                    "Elektrik Enerjisinin Isı, Işık ve Hareket Enerjisine Dönüşümü",
                    "Elektrik Motoru ve Dinamo Çalışma Prensipleri",
                    "Elektrik Faturasını Hesaplama, Enerji Tasarrufu ve Güvenlik"
                ],
                "Kazanımlar": [
                    "Cisimlerin elektrik yüklerini ve sürtünme, dokunma, etki yoluyla elektriklenme mekanizmalarını açıklar.",
                    "Elektroskop kullanarak bir cismin yüklü olup olmadığını ve yükünün işaretini belirler.",
                    "Topraklamanın statik yükleri nötrleme işlevini ve can güvenliği açısından önemini kavrar.",
                    "Elektrik enerjisinin ısı ve ışığa dönüşümünü (sigorta, akkor ampul) modellerle açıklar.",
                    "Elektrik enerjisinin hareket enerjisine (motor), hareket enerjisinin elektriğe (jeneratör) dönüşümünü keşfeder.",
                    "Elektrik enerjisi tüketimini kilowatt-saat (kWh) üzerinden hesaplar ve enerji tasarrufu bilinci sergiler."
                ]
            }
        },
        "T.C. İnkılap Tarihi ve Atatürkçülük": {
            "1. Ünite: Bir Kahraman Doğuyor": {
                "Konular": [
                    "20. Yüzyıl Başlarında Osmanlı Devleti'nin Durumu (Fikir Akımları, Sanayi İnkılabı, Fransız İhtilali)",
                    "Mustafa Kemal'in Çocukluk Dönemi, Ailesi ve Öğrenim Hayatı",
                    "Mustafa Kemal'in Fikir Hayatını Etkileyen Şehirler (Selanik, Manastır, İstanbul, Şam, Sofya) ve Yazarlar",
                    "Mustafa Kemal'in İlk Askerî Görevleri: Şam, 31 Mart Vakası, Trablusgarp Savaşı ve Balkan Savaşları",
                    "Mustafa Kemal'in Kişilik Özellikleri (Vatanseverlik, İleri Görüşlülük, Teşkilatçılık, Kararlılık)"
                ],
                "Kazanımlar": [
                    "20. yüzyıl başlarında Osmanlı Devleti'nin siyasi, sosyal ve ekonomik çöküş nedenlerini analiz eder.",
                    "Mustafa Kemal'in çocukluk ve öğrenim hayatının kişilik gelişimine etkilerini inceler.",
                    "Mustafa Kemal'in yetiştiği şehirlerin ve fikir insanlarının onun düşünce dünyasındaki yansımalarını değerlendirir.",
                    "Trablusgarp Savaşı'nda sömürgeciliğe karşı yerel halkı teşkilatlandırma başarısını değerlendirir.",
                    "Mustafa Kemal'in askerî ve sivil faaliyetlerini kişilik özellikleriyle ilişkilendirir."
                ]
            },
            "2. Ünite: Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar": {
                "Konular": [
                    "I. Dünya Savaşı'nın Nedenleri, İttifak ve İtilaf Devletleri",
                    "Osmanlı Devleti'nin Savaştığı Cepheler (Kafkas, Çanakkale, Kanal, Hicaz-Yemen vb.)",
                    "Mondros Ateşkes Antlaşması ve Yurdun İşgali Karşısında Tutumlar",
                    "Cemiyetler: Zararlı Cemiyetler (Azınlık ve Millî Varlığa Düşman) ve Yararlı Cemiyetler",
                    "Kuvâ-yı Millîye Hareketi",
                    "Mustafa Kemal'in Samsun'a Çıkışı, Havza ve Amasya Genelgeleri",
                    "Erzurum ve Sivas Kongreleri, Amasya Görüşmeleri",
                    "Misak-ı Millî Kararları, İstanbul'un İşgali ve Büyük Millet Meclisi'nin (BMM) Açılışı",
                    "BMM'ye Karşı Çıkarılan Ayaklanmalar ve Hıyanet-i Vataniye Kanunu",
                    "Sevr Barış Antlaşması ve Türk Milletinin Tepkisi"
                ],
                "Kazanımlar": [
                    "I. Dünya Savaşı'nda Osmanlı ordusunun savaştığı cepheleri, özellikle Çanakkale Zaferi'nin seyrini analiz eder.",
                    "Mondros Ateşkesi sonrası başlayan işgallere karşı İstanbul Hükûmeti'nin, Mustafa Kemal'in ve Türk milletinin tutumlarını karşılaştırır.",
                    "Kuvâ-yı Millîye'nin kuruluşunu ve millî cemiyetlerin Sivas Kongresi'nde birleştirilmesini kavrar.",
                    "Genelge ve kongreler sürecinde millî egemenlik ve tam bağımsızlık ilkelerinin olgunlaşmasını analiz eder.",
                    "Misak-ı Millî kararlarını ve 23 Nisan 1920'de açılan BMM'nin kurucu ve demokratik özelliklerini değerlendirir.",
                    "Türk milletini esarete mahkûm eden Sevr Antlaşması'nı hukuken geçersiz kılan şartları ve millî tepkiyi açıklar."
                ]
            },
            "3. Ünite: Millî Bir Destan: Ya İstiklal Ya Ölüm!": {
                "Konular": [
                    "Kurtuluş Savaşı'nda Doğu Cephesi (Gümrü Antlaşması) ve Güney Cephesi (Fransız ve Ermenilere Karşı Direniş)",
                    "Batı Cephesi: Düzenli Ordunun Kurulması",
                    "I. İnönü Zaferi ve Sonuçları (Teşkilat-ı Esasiye, İstiklal Marşı, Londra Konferansı, Moskova Antlaşması)",
                    "II. İnönü Zaferi ve Kütahya-Eskişehir Muharebeleri",
                    "Tekâlif-i Millîye Emirleri ve Topyekûn Seferberlik",
                    "Sakarya Meydan Muharebesi ve Sonuçları (Kars ve Ankara Antlaşmaları)",
                    "Büyük Taarruz ve Başkomutanlık Meydan Muharebesi",
                    "Mudanya Ateşkes Antlaşması ve Lozan Barış Antlaşması"
                ],
                "Kazanımlar": [
                    "Doğu ve Güney cephelerindeki mücadeleleri, bölgesel kahramanları (Maraş, Antep, Urfa direnişi) değerlendirir.",
                    "I. İnönü Zaferi'nin ulusal ve uluslararası sonuçlarını (diplomatik başarılar) analiz eder.",
                    "Kütahya-Eskişehir yenilgisi sonrası Tekâlif-i Millîye Emirleri ile milletin sergilediği fedakârlığı takdir eder.",
                    "Sakarya Zaferi ile Büyük Taarruz'un askerî ve diplomatik safhalarını inceler; Mustafa Kemal'e gazilik ve mareşallik unvanı verilişini açıklar.",
                    "Lozan Barış Antlaşması ile kapitülasyonların kaldırılmasını, sınırların çizilmesini ve Türkiye Cumhuriyeti'nin bağımsız bir devlet olarak tanınmasını analiz eder."
                ]
            },
            "4. Ünite: Atatürkçülük ve Çağdaşlaşan Türkiye": {
                "Konular": [
                    "Atatürk İlkeleri: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık",
                    "Siyasal Alanda İnkılaplar: Saltanatın Kaldırılması, Ankara'nın Başkent Olması, Cumhuriyetin İlanı, Halifeliğin Kaldırılması",
                    "Hukuk Alanında İnkılaplar: Şeriye Mahkemelerinin Kapatılması, Türk Medeni Kanunu",
                    "Eğitim ve Kültür Alanında İnkılaplar: Tevhid-i Tedrisat, Harf İnkılabı, Millet Mektepleri, Türk Tarih ve Dil Kurumları, Üniversite Reformu",
                    "Toplumsal Alanda İnkılaplar: Şapka ve Kıyafet Kanunu, Tekke ve Zaviyelerin Kapatılması, Takvim-Saat-Ölçü Değişiklikleri, Soyadı Kanunu",
                    "Ekonomi Alanında İnkılaplar: İzmir İktisat Kongresi, Aşar Vergisinin Kaldırılması, Kabotaj Kanunu, Sanayi Planları ve Tarım Kredi Kooperatifleri"
                ],
                "Kazanımlar": [
                    "Atatürk ilkelerinin amaçlarını ve birbirini tamamlayan bütünleyici ilkelerini (millî egemenlik, akılcılık) kavrar.",
                    "Siyasal alanda yapılan inkılapların millî iradeyi güçlendirici rolünü açıklar.",
                    "Türk Medeni Kanunu ile kadınlara sağlanan sosyal, hukuki ve ekonomik eşitliği değerlendirir.",
                    "Tevhid-i Tedrisat ve yeni Türk harflerinin kabulü ile eğitimde sağlanan çağdaşlaşma hamlelerini analiz eder.",
                    "Ekonomik alanda tam bağımsızlığı hedefleyen 'Millî İktisat' politikalarını ve Kabotaj Kanunu'nun denizlerimizdeki hâkimiyet açısından önemini açıklar."
                ]
            },
            "5. Ünite: Demokratikleşme Çabaları": {
                "Konular": [
                    "Demokratik Devlet Anlayışı ve Çok Partili Hayatın Önemi",
                    "Cumhuriyet Halk Fırkası, Terakkiperver Cumhuriyet Fırkası ve Serbest Cumhuriyet Fırkası",
                    "Demokrasiye Yönelik Tehditler: Şeyh Sait İsyanı ve Menemen Olayı",
                    "Mustafa Kemal'e Suikast Girişimi ve Takrir-i Sükûn Kanunu"
                ],
                "Kazanımlar": [
                    "Çok partili hayata geçiş denemelerini ve ilk muhalefet partilerinin kuruluş amaçlarını karşılaştırır.",
                    "Rejime ve inkılaplara karşı çıkarılan gerici isyanların çok partili hayata geçişi geciktiren etkilerini değerlendirir.",
                    "Mustafa Kemal'e düzenlenen suikast girişiminin cumhuriyetin varlığına yönelik bir tehdit olduğunu kavrar."
                ]
            },
            "6. Ünite: Atatürk Dönemi Türk Dış Politikası": {
                "Konular": [
                    "Türk Dış Politikasının Temel İlkeleri (Tam Bağımsızlık, Barışçılık, Akılcılık, Gerçekçilik)",
                    "Yabancı Okullar Sorunu ve Nüfus Mübadelesi",
                    "Musul Meselesi ve Ankara Antlaşması (1926)",
                    "Türkiye'nin Milletler Cemiyeti'ne Girişi (1932)",
                    "Balkan Antantı (1934) ve Sadabat Paktı (1937)",
                    "Montrö Boğazlar Sözleşmesi (1936) ve Boğazlar Üzerinde Tam Hâkimiyet",
                    "Hatay'ın Ana Vatana Katılması Süreci (1938-1939)"
                ],
                "Kazanımlar": [
                    "Atatürk dönemi Türk dış politikasının 'Yurtta sulh, cihanda sulh' ilkesi doğrultusunda yürütüldüğünü açıklar.",
                    "Musul sorununun çözümsüzlüğe uğramasında iç politikadaki karışıklıkların etkisini değerlendirir.",
                    "Montrö Boğazlar Sözleşmesi ile Boğazlar Komisyonu'nun kaldırılarak Türk egemenliğinin sağlandığını kavrar.",
                    "Mustafa Kemal'in diplomatik dehası sayesinde Hatay'ın barışçıl yollarla Türkiye'ye ilhak sürecini analiz eder."
                ]
            },
            "7. Ünite: Atatürk'ün Ölümü ve Sonrası": {
                "Konular": [
                    "Mustafa Kemal Atatürk'ün Vefatı ve Dünya Çapındaki Yankıları",
                    "Atatürk'ün Eserleri (Nutuk) ve Entelektüel Mirası",
                    "İkinci Dünya Savaşı Yıllarında Türkiye (Denge Politikası ve Ekonomik Tedbirler)",
                    "Çok Partili Demokratik Hayata Kesin Geçiş (1946 Seçimleri ve Demokrat Parti)"
                ],
                "Kazanımlar": [
                    "Atatürk'ün vefatının ardından Türk ve dünya liderlerinin paylaştığı taziyelerden hareketle onun evrensel liderliğini takdir eder.",
                    "II. Dünya Savaşı sırasında Türkiye'nin uyguladığı aktif tarafsızlık diplomasisini ve savaşın ülkemizdeki sosyoekonomik etkilerini açıklar.",
                    "Türkiye'de 1946 ve 1950 seçimleriyle çok partili demokratik parlamenter sistemin yerleşmesini değerlendirir."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: Kader İnancı": {
                "Konular": [
                    "Kader ve Kaza Kavramları",
                    "Evrendeki Yasalar: Fiziksel, Biyolojik ve Toplumsal Yasalar (Sünnetullah)",
                    "İnsanın İlmi, İradesi, Sorumluluğu ve Kader İlişkisi (Külli İrade ve Cüzi İrade)",
                    "Kaderle İlgili Kavramlar: Ecel, Ömür, Rızık, Tevekkül, Başarı/Başarısızlık, Sağlık/Hastalık",
                    "Bir Peygamber Tanıyorum: Hz. Musa",
                    "Bir Ayet Tanıyorum: Âyetü'l-Kürsî ve Anlamı"
                ],
                "Kazanımlar": [
                    "Kader ve kaza kavramlarını ayetlerle açıklar; evrendeki fiziksel, biyolojik ve toplumsal yasaları örneklerle ayırt eder.",
                    "İnsanın özgür iradesiyle eylemlerinden sorumlu olduğunu kavrar; yanlış kader anlayışlarını (kader mahkûmuyum vb.) reddeder.",
                    "Tevekkülün gerekli tüm tedbirleri aldıktan sonra Allah'a güvenmek olduğunu kavrar.",
                    "Hz. Musa'nın Firavun'a karşı tevhit mücadelesini ve İsrailoğullarını kurtarışını inceler.",
                    "Âyetü'l-Kürsî'yi ezbere okur ve Allah'ın yüce sıfatlarını açıklayan mesajını kavrar."
                ]
            },
            "2. Ünite: Zekât ve Sadaka": {
                "Konular": [
                    "İslam'ın Paylaşma ve Yardımlaşmaya Verdiği Önem",
                    "Zekât ve Sadaka İbadeti: Şartları, Nisap Miktarı ve Kimlere Verileceği",
                    "Zekât Oranları (Altın, Para, Ticaret Malı, Küçükbaş, Büyükbaş, Toprak Ürünleri/Öşür)",
                    "Sadaka-i Cariye (Kesintisiz Sadaka) ve İnfak Kavramı",
                    "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları",
                    "Bir Peygamber Tanıyorum: Hz. Şuayb",
                    "Bir Sure Tanıyorum: Ma'ûn Suresi ve Anlamı"
                ],
                "Kazanımlar": [
                    "İslam'ın mülkiyete ve gelir dağılımında adalete verdiği önemi zekât ibadeti üzerinden açıklar.",
                    "Zekât verilecek malları, nisap miktarlarını (1/40, 1/10 vb.) ve Kur'an'da belirtilen zekât alabilecek kimseleri hesaplar.",
                    "Sadaka-i cariyenin (okul, çeşme, faydalı ilim) ölümden sonra da sevap kazandırdığını kavrar.",
                    "Hz. Şuayb'ın ölçü ve tartıda dürüstlük ilkesine dayanan tebliğini inceler.",
                    "Ma'ûn suresini ezbere okur ve ibadetleri gösteriş için yapmanın, yetimi itip kakmanın kınandığı mesajını kavrar."
                ]
            },
            "3. Ünite: Din ve Hayat": {
                "Konular": [
                    "Dinin Temel Gayesi (Zarûrât-ı Hamse): Canın, Aklın, Neslin, Malın ve Dinin Korunması",
                    "Din, Birey ve Toplum İlişkisi",
                    "Dinin Toplumsal Dönüştürücü Gücü",
                    "Bir Peygamber Tanıyorum: Hz. Yusuf",
                    "Bir Sure Tanıyorum: Asr Suresi ve Anlamı"
                ],
                "Kazanımlar": [
                    "İslam dininin can, akıl, nesil, mal ve din güvenliğini teminat altına aldığını ayet ve hadislerle açıklar.",
                    "Dinin ahlakı güzelleştirici, suç oranlarını azaltıcı ve toplumsal huzuru sağlayıcı fonksiyonunu kavrar.",
                    "Hz. Yusuf'un hayatındaki sabır, iffet ve adalet örneklerini tahlil eder.",
                    "Asr suresini ezbere okur; hüsrandan kurtuluşun iman, salih amel, hakkı ve sabrı tavsiye etmekle mümkün olduğunu kavrar."
                ]
            },
            "4. Ünite: Hz. Muhammed'in Örnekliği": {
                "Konular": [
                    "Hz. Muhammed'in Doğruluğu ve Güvenilir Kişiliği (Muhammedü'l-Emin)",
                    "Hz. Muhammed'in Merhametli ve Affedici Oluşu",
                    "Hz. Muhammed'in İstişareye (Danışmaya) Verdiği Önem",
                    "Hz. Muhammed'in Davasındaki Kararlılığı ve Cesareti",
                    "Hz. Muhammed'in Hakkı Gözetmedeki Hassasiyeti",
                    "Bir Sure Tanıyorum: Kureyş Suresi ve Anlamı"
                ],
                "Kazanımlar": [
                    "Hz. Muhammed'in hayatındaki dürüstlük ve güvenilirlik örneklerini günlük yaşamına rehber edinir.",
                    "Uhud ve Hendek savaşları öncesinde ashabıyla istişare ederek ortak karara uyma erdemini açıklar.",
                    "Güçlünün değil haklının yanında durma ve adaleti titizlikle uygulama hassasiyetini kavrar.",
                    "Kureyş suresini ezbere okur ve güven-nimet ilişkisini değerlendirir."
                ]
            },
            "5. Ünite: Kur'an-ı Kerim ve Özellikleri": {
                "Konular": [
                    "Kur'an-ı Kerim'in Ana Konuları: İnanç, İbadet, Ahlak, Muamelat (Sosyal İlişkiler) ve Kıssalar",
                    "Kur'an-ı Kerim'in Yol Gösterici, Açıklayıcı ve Aydınlatıcı Nitelikleri",
                    "Bir Peygamber Tanıyorum: Hz. Nuh"
                ],
                "Kazanımlar": [
                    "Kur'an-ı Kerim'in ana konularını ayetlerden örneklerle sınıflandırır.",
                    "Kur'an'ın insanı düşünmeye, akıl yürütmeye ve evreni araştırmaya yönelten ayetlerini inceler.",
                    "Hz. Nuh'un inkârcı kavmine karşı sabırla sürdürdüğü tebliğ görevini ve tufan hadisesini açıklar."
                ]
            }
        },
        "İngilizce": {
            "Unit 1: Friendship": {
                "Konular": [
                    "Personal Characteristics of True Friends (honest, loyal, supportive, caring)",
                    "Making Invitations and Offers (Would you like to join us?, Why don't we...?)",
                    "Accepting, Refusing and Making Excuses",
                    "Writing a Friendly Invitation Letter or Email"
                ],
                "Kazanımlar": [
                    "Arkadaşlık ilişkilerindeki erdemleri ve kişisel özellikleri ifade eder.",
                    "Teklif ve davetleri kibarca kabul etme veya geçerli bir mazeret sunarak reddetme ifadelerini kullanır.",
                    "Davet mektuplarına ve e-postalara yazılı olarak nezaketle cevap verir."
                ]
            },
            "Unit 2: Teen Life": {
                "Konular": [
                    "Daily Routines and Teen Habits",
                    "Music Genres and Preferences (rap, classical, heavy metal, pop)",
                    "Expressing Preferences with 'Prefer' and 'Would Rather'",
                    "Expressing Likes, Dislikes and Fondness (be fond of, keen on, crazy about, can't stand)"
                ],
                "Kazanımlar": [
                    "Gençlerin günlük alışkanlıklarını, hobilerini ve giyim tercihlerini açıklar.",
                    "Müzik türleri hakkındaki kişisel beğenilerini 'keen on', 'can't stand' kalıplarıyla ifade eder.",
                    "Tercihlerini 'prefer' ve 'would rather' yapılarını kullanarak gerekçeleriyle açıklar."
                ]
            },
            "Unit 3: In the Kitchen": {
                "Konular": [
                    "Cooking Methods (boil, fry, bake, roast, grill, steam)",
                    "Kitchen Utensils (tablespoon, bowl, pan, baking tray, grater)",
                    "Describing a Recipe and Sequencing Steps (First, Second, Then, Next, After that, Finally)",
                    "Expressing Food Preferences"
                ],
                "Kazanımlar": [
                    "Yemek hazırlama süreçlerini ve pişirme yöntemlerini doğru kelimelerle betimler.",
                    "Bir yemek tarifini işlem basamaklarına göre sıralama bağlaçlarını kullanarak anlatır.",
                    "Farklı mutfak aletlerinin kullanım alanlarını eşleştirir."
                ]
            },
            "Unit 4: On the Phone": {
                "Konular": [
                    "History of Communication Tools (smoke signals, telegraph, smartphone)",
                    "Phone Call Conversations: Making a Call, Answering, Holding, Connecting",
                    "Leaving and Taking Messages (Could you hold on?, Would you like to leave a message?)",
                    "Telephone Etiquette and Expressions"
                ],
                "Kazanımlar": [
                    "Telefon konuşmalarında kendini tanıtma, beklemesini isteme ve hatta bağlama kalıplarını uygular.",
                    "Telefonda mesaj bırakma ve gelen mesajı eksiksiz not alma becerisi sergiler.",
                    "İletişim araçlarının tarihsel gelişimini karşılaştırır."
                ]
            },
            "Unit 5: The Internet": {
                "Konular": [
                    "Internet Terminology (browser, download, upload, attachment, search engine)",
                    "Internet Safety Rules and Cyber Ethics",
                    "Accepting and Refusing Social Media Requests",
                    "Online Habits and Digital Addictions"
                ],
                "Kazanımlar": [
                    "İnternet terimlerini ve dosya paylaşım kavramlarını yerinde kullanır.",
                    "İnternet ortamında kişisel bilgilerin güvenliğini sağlayacak güvenlik kurallarını açıklar.",
                    "Sosyal ağlardaki istekleri ve mesajları güvenli biçimde yönetir."
                ]
            },
            "Unit 6: Adventures": {
                "Konular": [
                    "Extreme Sports (skydiving, bungee jumping, rafting, paragliding)",
                    "Comparing Risky Activities with Comparative and Superlative Structures",
                    "Expressing Preferences with 'Prefer' and 'Would Rather'",
                    "Giving Explanations and Justifications for Preferences"
                ],
                "Kazanımlar": [
                    "Ekstrem spor türlerini ve gerekli güvenlik ekipmanlarını tanır.",
                    "Macera sporlarını tehlike, heyecan ve maliyet bakımından karşılaştırır.",
                    "Tercihlerini 'would rather' ve 'prefer' kullanarak nedenleriyle ifade eder."
                ]
            },
            "Unit 7: Tourism": {
                "Konular": [
                    "Tourist Destinations, Cultural Heritage and Architecture",
                    "Describing Past Travel Experiences with Present Perfect Tense (have/has + V3)",
                    "Comparing Vacation Types (cultural tour, seaside resort, eco-tourism)",
                    "Weather and Accommodation Details"
                ],
                "Kazanımlar": [
                    "Tarihî yapıları, turistik mekânları ve iklim özelliklerini tasvir eder.",
                    "Geçmiş deneyimlerini 'Present Perfect Tense' kullanarak anlatır.",
                    "Konaklama, ulaşım ve mutfak kültürünü kapsayan bir tatil broşürü hazırlar."
                ]
            },
            "Unit 8: Chores": {
                "Konular": [
                    "Household Chores (vacuuming, dusting, doing the laundry, loading the dishwasher)",
                    "Expressing Obligations and Responsibilities with 'Must / Have to / Be responsible for'",
                    "Sharing Tasks Fairly at Home and School"
                ],
                "Kazanımlar": [
                    "Ev içi görev ve sorumlulukları doğru kelimelerle ifade eder.",
                    "Zorunluluk ve mesuliyet bildiren yapıları (have to, responsible for) kurallı kullanır.",
                    "Evde ve okulda iş bölümünün önemini savunan konuşmalar yapar."
                ]
            },
            "Unit 9: Science": {
                "Konular": [
                    "Scientific Breakthroughs, Inventions and Pioneers",
                    "Describing Past Lab Experiments and Actions in Progress",
                    "Futuristic Scientific Developments and Space Exploration",
                    "Talking About Famous Scientists and Inventions"
                ],
                "Kazanımlar": [
                    "Bilimsel keşifleri, deney süreçlerini ve mucitleri tanıtır.",
                    "Geçmişte ve günümüzde devam eden bilimsel çalışmaları anlatır.",
                    "Gelecekte insanlığı bekleyen tıbbi ve teknolojik gelişmelere dair fikir yürütür."
                ]
            },
            "Unit 10: Natural Forces": {
                "Konular": [
                    "Natural Disasters: Earthquake, Flood, Tsunami, Drought, Avalanche",
                    "Causes, Consequences and Preventive Measures",
                    "Making Predictions About the Earth's Ecological Future",
                    "Expressing Warnings and Conditions"
                ],
                "Kazanımlar": [
                    "Doğal afetleri ve oluşum nedenlerini ifade eder.",
                    "Çevre felaketlerine ve iklim krizine karşı alınması gereken tedbirleri açıklar.",
                    "Gelecekte yaşanabilecek doğal afetlere yönelik tahmin ve koşul cümleleri kurar."
                ]
            }
        },
        "Teknoloji ve Tasarım": {
            "1. Ünite: Tasarım ve İnovasyon Süreci": {
                "Konular": [
                    "Tasarım Odaklı Düşünme ile Problem Çözme",
                    "İnovasyon Çeşitleri (Ürün, Süreç, Pazarlama)",
                    "Fikri ve Sınai Mülkiyet: Patent, Faydalı Model, Marka Tescili"
                ],
                "Kazanımlar": [
                    "Karmaşık bir sorunun çözümüne yönelik tasarım basamaklarını planlar ve yürütür.",
                    "Geliştirdiği yenilikçi fikri inovasyon türlerine göre sınıflandırır.",
                    "Buluşunun korunması için patent başvuru dosyasının temel unsurlarını hazırlar."
                ]
            },
            "2. Ünite: Görsel Tasarım ve Modelleme": {
                "Konular": [
                    "Bilgisayar Destekli Tasarım (CAD) Programları",
                    "Üç Boyutlu Modelleme ve 3D Yazıcı Teknolojileri",
                    "Malzeme Bilgisi ve Mukavemet Prensipleri"
                ],
                "Kazanımlar": [
                    "CAD yazılımlarını kullanarak üç boyutlu ürün modelleri tasarlar.",
                    "3D yazıcı dilimleme programı üzerinden modelin baskı parametrelerini ayarlar.",
                    "Tasarımında dayanıklılık, estetik ve ergonomi kriterlerini bir arada uygular."
                ]
            },
            "3. Ünite: Mekatronik ve Robotik Sistemler": {
                "Konular": [
                    "Mekanik Sistemler (Dişli, Kasnak, Kol Mekanizmaları)",
                    "Elektronik Devre Bileşenleri, Sensörler ve Mikrodenetleyiciler",
                    "Akıllı Otomasyon ve Robotik Kodlama"
                ],
                "Kazanımlar": [
                    "Hareket iletim elemanlarını kullanarak işlevsel mekanik düzenekler kurar.",
                    "Sensörler (ışık, mesafe, sıcaklık) yardımıyla çevresini algılayan akıllı prototipler geliştirir.",
                    "Mikrodenetleyici kartını blok veya metin tabanlı programlayarak görevi tamamlatır."
                ]
            },
            "4. Ünite: Ürün Geliştirme ve Girişimcilik": {
                "Konular": [
                    "İş Fikri Geliştirme ve Fizibilite Çalışması",
                    "Prototip Testi, Maliyet Analizi ve Pazarlama Stratejisi",
                    "Tasarım Sunumu ve Değerlendirme"
                ],
                "Kazanımlar": [
                    "Pazar araştırması yaparak tüketici ihtiyacına uygun iş fikri geliştirir.",
                    "Ürünün üretim maliyetini hesaplar ve hedef kitleye yönelik pazarlama planı hazırlar.",
                    "Tasarımını jüri önünde ikna edici argümanlarla sunar ve geri bildirimleri değerlendirir."
                ]
            }
        },
        "Müzik": {
            "1. Ünite: Müzik Kültürü ve Eser Çözümleme": {
                "Konular": [
                    "Türk Müziği Makamları ve Usulleri (Hicaz, Nihavent, Rast)",
                    "İstiklal Marşı'nın Müzikal Formu ve Tarihsel Önemi",
                    "Farklı Müzik Türleri (Klasik, Caz, Rock, Tasavvuf Müziği)"
                ],
                "Kazanımlar": [
                    "Türk müziği makamlarını tınısal özelliklerine göre ayırt eder.",
                    "İstiklal Marşı'nı diksiyon ve ritmik vurgularına tam uyarak coşkuyla seslendirir.",
                    "Farklı müzik türlerini enstrümantasyon ve dönem özelliklerine göre çözümler."
                ]
            },
            "2. Ünite: Toplu Çalma ve Söyleme": {
                "Konular": [
                    "Çalgı ile Çok Sesli İcra ve Ritim Disiplini",
                    "Müziğin İnsan Psikolojisi ve Toplum Üzerindeki Etkisi",
                    "Özgün Melodi ve Beste Denemeleri"
                ],
                "Kazanımlar": [
                    "Toplu icrada kendi sesini ve çalgısını topluluk dengesine uyumlu kullanır.",
                    "Müziğin stres azaltıcı ve birleştirici gücünü değerlendirir.",
                    "Temel armoni kurallarına uygun olarak kısa ezgiler ve ritim kalıpları besteler."
                ]
            }
        },
        "Görsel Sanatlar": {
            "1. Ünite: Görsel İletişim ve Tasarım": {
                "Konular": [
                    "Perspektif Kuralları ve Mekânsal Derinlik",
                    "Tipografi, Afiş, Logo ve Kurumsal Kimlik Tasarımı",
                    "Işık-Gölge, Leke ve Hacim Çalışmaları"
                ],
                "Kazanımlar": [
                    "Çizimlerinde tek ve çift kaçışlı perspektif kurallarını eksiksiz uygular.",
                    "Görsel iletişim ilkelerine uygun afiş ve logo tasarımı yapar.",
                    "Işık-gölge dengesiyle nesneleri üç boyutlu derinlik hissiyle resmeder."
                ]
            },
            "2. Ünite: Sanat Eleştirisi ve Kültürel Miras": {
                "Konular": [
                    "Çağdaş ve Geleneksel Sanat Eserlerinin Karşılaştırılması",
                    "Sanat Eseri Tahlili (Biçim, Anlam ve Bağlam)",
                    "Müzecilik ve Kültür Mirasını Koruma Bilinci"
                ],
                "Kazanımlar": [
                    "Geleneksel Türk motiflerini çağdaş tasarım ögeleriyle harmanlayarak özgün eserler üretir.",
                    "Sanat eserlerini estetik felsefesi kriterlerine göre eleştirir.",
                    "Tarihî ve kültürel mirasın korunması konusunda toplumsal farkındalık sergiler."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: Takım Sporları ve Strateji": {
                "Konular": [
                    "Basketbol, Voleybol ve Hentbol İleri Taktik Uygulamaları",
                    "Müsabaka Kuralları, Hakem İşaretleri ve Fair-Play",
                    "Fiziksel Uygunluk Testleri (Kuvvet, Dayanıklılık, Çeviklik)"
                ],
                "Kazanımlar": [
                    "Takım oyunlarında hücum ve savunma stratejilerini müsabaka ortamında başarıyla uygular.",
                    "Oyun kurallarını ve hakem kararlarını saygıyla karşılayarak fair-play değerini içselleştirir.",
                    "Kişisel fiziksel uygunluk değerlerini test eder ve gelişim grafiğini takip eder."
                ]
            },
            "2. Ünite: Yaşam Boyu Spor ve İlk Yardım": {
                "Konular": [
                    "Hareketsiz (Sedanter) Yaşamın Riskleri ve Egzersiz Reçetesi",
                    "Spor Yaralanmalarında İlk Yardım Prensipleri",
                    "Doğa Sporları ve Çevre Duyarlılığı"
                ],
                "Kazanımlar": [
                    "Sedanter yaşamın kardiyovasküler risklerini kavrar ve kişisel spor alışkanlığı edinir.",
                    "Burkulma, kramp ve kanamalarda yapılması gereken temel ilkyardım müdahalelerini açıklar.",
                    "Açık hava ve doğa sporlarında çevreye duyarlı davranış sergiler."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Ünite: Bilişim Okuryazarlığı ve İletişim": {
                "Konular": [
                    "İnternet etiği",
                    "Siber zorbalık",
                    "Bulut bilişim ve işbirlikli çalışma araçlarını etkin kullanır"
                ],
                "Kazanımlar": [
                    "İnternet etiği, telif hakları ve açık kaynak lisanslarını kavrar.",
                    "Siber zorbalık, dijital ayak izi ve bilgi güvenliği ilkelerini açıklar.",
                    "Bulut bilişim ve işbirlikli çalışma araçlarını etkin kullanır."
                ]
            },
            "2. Ünite: Algoritma ve Blok Tabanlı Programlama": {
                "Konular": [
                    "Karmaşık problemleri alt problemlere ayrıştırarak akış şemaları tasarlar",
                    "Döngüler",
                    "Yazdığı kodlardaki mantıksal hataları (debugging) tespit eder ve düzeltir"
                ],
                "Kazanımlar": [
                    "Karmaşık problemleri alt problemlere ayrıştırarak akış şemaları tasarlar.",
                    "Döngüler, koşul yapıları, değişkenler ve fonksiyonları içeren programlar kodlar.",
                    "Yazdığı kodlardaki mantıksal hataları (debugging) tespit eder ve düzeltir."
                ]
            },
            "3. Ünite: Robotik Kodlama ve Yapay Zeka Temelleri": {
                "Konular": [
                    "Sensörler",
                    "Yapay zekanın ve makine öğrenmesinin temel mantığını açıklar",
                    "Geleceğin teknolojileri (IoT"
                ],
                "Kazanımlar": [
                    "Sensörler, mikrodenetleyiciler ve motorlar kullanarak basit robotik prototip geliştirir.",
                    "Yapay zekanın ve makine öğrenmesinin temel mantığını açıklar.",
                    "Geleceğin teknolojileri (IoT, blokzincir, sanal gerçeklik) hakkında farkındalık kazanır."
                ]
            }
        },
        "Seçmeli Zeka Oyunları": {
            "1. Ünite: Akıl Yürütme ve İşlem Oyunları": {
                "Konular": [
                    "Sudoku",
                    "Hızlı düşünme",
                    "Kriptoloji ve şifreleme mantığını çözer"
                ],
                "Kazanımlar": [
                    "Sudoku, kendoku ve kakuro gibi matematiksel mantık oyunlarını çözer.",
                    "Hızlı düşünme, karar verme ve alternatif stratejiler üretme becerisi geliştirir.",
                    "Kriptoloji ve şifreleme mantığını çözer."
                ]
            },
            "2. Ünite: Strateji ve Kutu Oyunları": {
                "Konular": [
                    "Satranç",
                    "Oyun analizi yaparak rakibin stratejisini öngörür ve karşı hamle geliştirir",
                    "Kaybetmeyi olgunlukla karşılama ve centilmenlik bilinci kazanır"
                ],
                "Kazanımlar": [
                    "Satranç, mangala ve reversi gibi strateji oyunlarında ileri hamle planlar.",
                    "Oyun analizi yaparak rakibin stratejisini öngörür ve karşı hamle geliştirir.",
                    "Kaybetmeyi olgunlukla karşılama ve centilmenlik bilinci kazanır."
                ]
            }
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "1. Ünite: Global Communication": {
                "Konular": [
                    "Farklı kültürlerdeki günlük iletişim kalıplarını ve beden dilini inceler",
                    "İngilizce kısa hikâyeleri analiz eder ve kendi kelimeleriyle anlatır",
                    "Uluslararası güncel olaylar hakkında kısa sunum yapar"
                ],
                "Kazanımlar": [
                    "Farklı kültürlerdeki günlük iletişim kalıplarını ve beden dilini inceler.",
                    "İngilizce kısa hikâyeleri analiz eder ve kendi kelimeleriyle anlatır.",
                    "Uluslararası güncel olaylar hakkında kısa sunum yapar."
                ]
            },
            "2. Ünite: Creative Writing & Debate": {
                "Konular": [
                    "İngilizce münazara kurallarına uygun olarak fikirlerini savunur",
                    "Özgün şiir",
                    "Gelişmiş dinleme metinlerindeki ana ve yan fikirleri tespit eder"
                ],
                "Kazanımlar": [
                    "İngilizce münazara kurallarına uygun olarak fikirlerini savunur.",
                    "Özgün şiir, blog yazısı veya kısa senaryo yazar.",
                    "Gelişmiş dinleme metinlerindeki ana ve yan fikirleri tespit eder."
                ]
            }
        }
    },
    "9. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "1. Tema: Sözün İnceliği": {
                "Konular": [
                    "Edebiyatın Tanımı, Sanat ve Bilim Dallarıyla İlişkisi",
                    "Edebi Metinlerin Özellikleri ve Edebi Dil",
                    "Şiirde Anlatım ve Ahenk Unsurları (Ölçü, Kafiye, Redif)",
                    "Edebi Sanatlar (Teşbih, İstiare, Mecazımürsel, Teşhis)",
                    "Sözlü ve Yazılı Edebiyat Geleneği"
                ],
                "Öğrenim Çıktıları": [
                    "Edebi metinlerin kurmaca yapısını, özgün dilini ve estetik işlevini kavrar.",
                    "Şiir tahlillerinde ritim, ahenk ögelerini ve açık/örtük iletileri çözümler.",
                    "Metindeki edebi sanatları bularak bunların anlatımın zenginliğine katkısını değerlendirir.",
                    "Edebiyatın tarih, felsefe, psikoloji ve coğrafya ile olan çok yönlü bağını açıklar."
                ]
            },
            "2. Tema: Anlam Arayışı": {
                "Konular": [
                    "Olay Çevresinde Gelişen Edebi Metinler: Hikâye (Öykü)",
                    "Hikâyenin Unsurları (Olay Örgüsü, Kişiler, Mekân, Zaman, Anlatıcı)",
                    "Hikâye Türleri: Olay (Maupassant) ve Durum (Çehov) Hikâyesi",
                    "Dünya ve Türk Edebiyatında Hikâyenin Gelişimi",
                    "Anlatım Teknikleri (Diyalog, İç Konuşma, Geriye Dönüş)"
                ],
                "Öğrenim Çıktıları": [
                    "Olay ve durum hikâyelerinin yapısal özelliklerini karşılaştırarak tahlil eder.",
                    "Hikâyede hâkim, kahraman ve gözlemci anlatıcı bakış açılarını ayırt eder.",
                    "Metinlerdeki çatışmaları, karakterlerin psikolojik durumlarını ve temayı inceler.",
                    "Anlatım tekniklerini bilinçli kullanarak serim-düğüm-çözüm planına uygun özgün bir hikâye yazar."
                ]
            },
            "3. Tema: Anlamın Yapı Taşları": {
                "Konular": [
                    "Sözcük Türleri: İsimler (Adlar) ve İsim Tamlamaları",
                    "Sıfatlar (Ön Adlar) ve Sıfat Tamlamaları",
                    "Zamirler (Adıllar) ve Türleri",
                    "Zarflar (Belirteçler), Edat, Bağlaç ve Ünlemler",
                    "Cümlenin Temel ve Yardımcı Ögeleri",
                    "Yazım Kuralları ve Noktalama İşaretleri"
                ],
                "Öğrenim Çıktıları": [
                    "Metin içindeki sözcük türlerini morfolojik ve anlamsal işlevlerine göre doğru sınıflandırır.",
                    "İsim ve sıfat tamlamalarının metnin anlatım zenginliğindeki yerini kavrar.",
                    "Cümle çözümlemelerinde temel ve yardımcı ögeleri eksiksiz belirler.",
                    "Yazılı anlatımlarında imla kurallarına ve noktalama işaretlerinin işlevlerine titizlikle uyar."
                ]
            },
            "4. Tema: Dilin Zenginliği": {
                "Konular": [
                    "Türkçenin Tarihi Dönemleri ve Gelişimi (Altay Dönemi, Eski Türkçe, Orta Türkçe, Türkiye Türkçesi)",
                    "Türkçenin Söz Varlığı, Kelime Türetme Yolları",
                    "Dillerin Sınıflandırılması (Köken ve Yapı Bakımından)",
                    "Türk Dilinin Ses Özellikleri ve Ses Olayları",
                    "Bilgilendirici Metinler: Makale ve Deneme Türleri"
                ],
                "Öğrenim Çıktıları": [
                    "Türkçenin Ural-Altay dil ailesindeki yerini ve sondan eklemeli yapı özelliklerini kavrar.",
                    "Türk dilinin tarihi evrelerini yazıtlar ve temel eserler üzerinden inceler.",
                    "Büyük ve küçük ünlü uyumu ile ünsüz benzeşmesi, yumuşaması, türemesi ve düşmesi kurallarını metin üzerinde uygular.",
                    "Dili doğru, etkili ve zengin biçimde kullanarak düşüncelerini deneme veya makale formunda ifade eder."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Sayılar": {
                "Konular": [
                    "Gerçek Sayılar Kümesi (Doğal, Tam, Rasyonel ve İrrasyonel Sayılar)",
                    "Sayı Doğrusu ve Aralık Kavramı (Açık, Kapalı, Yarı Açık Aralıklar)",
                    "Mutlak Değer Kavramı, Özellikleri ve Geometrik Yorumu",
                    "Mutlak Değerli Denklem ve Eşitsizliklerin Çözüm Kümeleri",
                    "Üslü ve Köklü İfadeler ile Özellikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Gerçek sayılar kümesinin alt kümeleri arasındaki kapsama ilişkisini şemayla gösterir.",
                    "Gerçek sayılar kümesindeki aralıkları cebirsel olarak ifade eder ve sayı doğrusunda modeller.",
                    "Mutlak değerin geometrik olarak uzaklık belirttiğini kavrar; mutlak değerli denklem ve eşitsizlikleri çözer.",
                    "Üslü ve köklü ifadelerin temel özelliklerini kullanarak cebirsel sadeleştirmeler yapar."
                ]
            },
            "2. Tema: Nicelikler ve Değişimler": {
                "Konular": [
                    "Birinci Dereceden Bir Bilinmeyenli Denklem ve Eşitsizlikler",
                    "Birinci Dereceden İki Bilinmeyenli Denklem Sistemleri (Yok Etme ve Yerine Koyma Yöntemi)",
                    "Birinci Dereceden İki Bilinmeyenli Eşitsizlik Sistemlerinin Grafikle Çözümü",
                    "Fonksiyon Kavramına Giriş, Doğrusal Değişim ve Grafik Modelleri",
                    "Gerçek Hayat Durumlarını Modelleme ve Problem Çözme"
                ],
                "Öğrenim Çıktıları": [
                    "Birinci dereceden bir ve iki bilinmeyenli denklem sistemlerini cebirsel yöntemlerle çözer.",
                    "İki bilinmeyenli eşitsizlik sistemlerinin çözüm kümesini koordinat düzleminde taralı bölge olarak gösterir.",
                    "Değişkenler arasındaki doğrusal ilişkileri fonksiyonel modellerle temsil eder.",
                    "Oran-orantı, hareket, karışım, işçi ve yüzde problemlerini matematiksel denklemler kurarak çözer."
                ]
            },
            "3. Tema: Geometrik Şekiller": {
                "Konular": [
                    "Geometrik Kavramlar: Nokta, Doğru, Düzlem ve Açı",
                    "Paralel İki Doğrunun Bir Kesenle Yaptığı Açılar",
                    "Üçgende Açı Özellikleri (İç Açılar, Dış Açılar ve Açı Bağıntıları)",
                    "Üçgende Kenar-Açı Bağıntıları ve Üçgen Eşitsizliği",
                    "Özel Üçgenler: İkizkenar ve Eşkenar Üçgenin Geometrik Özellikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Açılarla ilgili temel teoremleri kullanarak doğrudan açı problemlerini çözer.",
                    "Üçgenin iç açılarının toplamının 180°, dış açılarının toplamının 360° olduğunu ispatlar.",
                    "Üçgen eşitsizliğini kullanarak bir üçgenin çizilebilme şartlarını analiz eder.",
                    "İkizkenar ve eşkenar üçgende tabana indirilen dikmenin açıortay ve kenarortay olma durumunu keşfeder."
                ]
            },
            "4. Tema: Eşlik ve Benzerlik": {
                "Konular": [
                    "Üçgenlerin Eşliği ve Eşlik Kriterleri (K.A.K., A.K.A., K.K.K.)",
                    "Üçgenlerin Benzerliği ve Benzerlik Kriterleri (A.A., K.A.K., K.K.K.)",
                    "Thales Teoremi ve Temel Orantı Teoremi",
                    "Benzerlik Oranı ile Alan ve Çevre İlişkisi",
                    "Dik Üçgende Pisagor Teoremi ve Öklid Bağıntıları"
                ],
                "Öğrenim Çıktıları": [
                    "İki üçgenin eşliğini uygun kriterlerle doğrular ve karşılıklı elemanlarını eşleştirir.",
                    "Benzer üçgenlerde karşılıklı kenar uzunluklarının orantılı olduğunu kullanarak bilinmeyen uzunlukları hesaplar.",
                    "Temel orantı ve Thales teoremlerini kullanarak geometrik bölüntü problemlerini çözer.",
                    "Dik üçgende Pisagor ve Öklid teoremlerini uygulayarak metrik bağıntıları çözümler."
                ]
            },
            "5. Tema: Algoritma ve Bilişim": {
                "Konular": [
                    "Mantık: Önermeler, Bileşik Önermeler ve Doğruluk Tabloları",
                    "Mantıksal Bağlaçlar (Ve, Veya, İse, Ancak ve Ancak, Ya Da)",
                    "Açık Önermeler ve Niceleyiciler (Her, Bazı)",
                    "Algoritmik Düşünme, Akış Şeması Sembolleri ve Matematiksel Mantık",
                    "Matematiksel İspat Yöntemleri (Doğrudan İspat, Olmayana Ergi, Çelişki)"
                ],
                "Öğrenim Çıktıları": [
                    "Önermelerin doğruluk değerlerini belirler, bileşik önermelerin denkliğini doğruluk tablosuyla gösterir.",
                    "Koşullu önermenin karşıtını, tersini ve karşıt tersini oluşturur.",
                    "Matematiksel bir problemin çözüm basamaklarını algoritmik akış şemasına dönüştürür.",
                    "Matematiksel teoremleri mantıksal çıkarım kurallarıyla ispatlar."
                ]
            },
            "6. Tema: İstatistiksel Araştırma Süreci": {
                "Konular": [
                    "İstatistiksel Problem Belirleme ve Örneklem Seçimi",
                    "Veri Toplama Yöntemleri ve Veri Düzenleme",
                    "Merkezi Eğilim (Ortalama, Medyan, Mod) ve Yayılım Ölçüleri (Açıklık, Çeyrekler Açıklığı, Standart Sapma)",
                    "Veri Görselleştirme: Kutu Grafiği (Boxplot) ve Serpme Grafiği",
                    "Verilerin Karşılaştırılması ve İstatistiksel Çıkarım"
                ],
                "Öğrenim Çıktıları": [
                    "Araştırma sürecinde tarafsız ve amaca uygun örneklem belirler.",
                    "Veri setinin merkezi eğilim ve yayılım ölçülerini hesaplayarak dağılımın homojenliğini yorumlar.",
                    "Verileri kutu grafiği üzerinde göstererek çeyrekler ve aykırı değerleri inceler.",
                    "İki değişkenli verilerin serpme grafiğini çizerek aralarındaki korelasyonu değerlendirir."
                ]
            },
            "7. Tema: Veriden Olasılığa": {
                "Konular": [
                    "Örnek Uzay, Olay ve Çıktı Kavramları",
                    "Ayrık ve Ayrık Olmayan Olaylar",
                    "Olasılık Fonksiyonunun Temel Aksiyomları",
                    "Tümleyen Olayın Olasılığı",
                    "Eş Olasılıklı Olaylarda Teorik ve Deneysel Olasılık Hesabı"
                ],
                "Öğrenim Çıktıları": [
                    "Bir deneyin tüm olası çıktılarını örnek uzay kümesi olarak yazar.",
                    "Ayrık ve ayrık olmayan olayların birleşiminin olasılığını kümeler yardımıyla hesaplar.",
                    "Deneysel olasılık ile teorik olasılık arasındaki farkı deney tekrarı üzerinden açıklar.",
                    "Gerçek yaşam olaylarında risk ve gerçekleşme olasılıklarını matematiksel temelde analiz eder."
                ]
            }
        },
        "Fizik": {
            "1. Tema: Fizik Bilimi ve Kariyer Keşfi": {
                "Konular": [
                    "Fiziğin Tanımı, Evreni Açıklamadaki Rolü ve Alt Dalları (Mekanik, Termodinamik, Elektromanyetizma, Optik, Atom/Molekül, Nükleer, Katıhâl, Yüksek Enerji/Plazma)",
                    "Fiziksel Niceliklerin Sınıflandırılması: Temel ve Türetilmiş Büyüklükler",
                    "Skaler ve Vektörel Büyüklükler, Vektörlerde Bileşke Bulma (Uç Uca Ekleme Yöntemi)",
                    "Bilimsel Araştırma Merkezleri (TÜBİTAK, ASELSAN, TENMAK, CERN, NASA, ESA)",
                    "Fizik ile İlgili Meslekler ve Mühendislik Alanları"
                ],
                "Öğrenim Çıktıları": [
                    "Doğadaki olayları açıklarken fiziğin uygun alt dalını ve disiplinler arası ilişkilerini belirler.",
                    "Fiziksel büyüklükleri SI birim sistemine, skaler/vektörel ve temel/türetilmiş özelliklerine göre sınıflandırır.",
                    "Tek ve iki boyutta vektörlerin bileşkesini grafiksel ve cebirsel yöntemlerle hesaplar.",
                    "Ulusal ve uluslararası bilimsel araştırma merkezlerinin bilimsel bilgi üretimi ve teknolojideki rolünü açıklar."
                ]
            },
            "2. Tema: Kuvvet ve Hareket": {
                "Konular": [
                    "Hareket Türleri (Öteleme, Dönme, Titreşim)",
                    "Konum, Alınan Yol, Yer Değiştirme, Sürat ve Hız Kavramları",
                    "Düzgün Doğrusal Hareket (Sabit Hızlı Hareket) ve Konum-Zaman / Hız-Zaman Grafikleri",
                    "Ortalama Hız, Anlık Hız ve İvme Kavramı",
                    "Newton'un Hareket Yasaları (Eylemsizlik, Temel Yasa F=m.a, Etki-Tepki)",
                    "Sürtünme Kuvveti (Statik ve Kinetik Sürtünme Katsayıları)"
                ],
                "Öğrenim Çıktıları": [
                    "Doğrusal bir yörüngede hareket eden cisimlerin konum-zaman ve hız-zaman grafiklerini çizerek yorumlar.",
                    "Sürat ile hız arasındaki skaler-vektörel farkı günlük hayattan örneklerle açıklar.",
                    "Newton'un temel hareket yasalarını serbest cisim diyagramları çizerek problemlere uygular.",
                    "Statik ve kinetik sürtünme kuvvetlerinin büyüklüğünü yüzey cinsi ve tepki kuvvetine bağlı olarak hesaplar."
                ]
            },
            "3. Tema: Akışkanlar": {
                "Konular": [
                    "Maddenin Ayırt Edici Özelliği Olarak Özkütle (Yoğunluk) ve Karışımların Özkütlesi",
                    "Katı Basıncı ve Piezoelektrik Olayı",
                    "Durgun Sıvıların Basıncı (P = h.d.g), Sıvı Basınç Kuvveti ve Pascal Prensibi",
                    "Açık Hava Basıncı (Torricelli Deneyi) ve Gaz Basıncı",
                    "Akışkanların Hareketi: Süreklilik Denklemi ve Bernoulli İlkesi",
                    "Durgun Akışkanlarda Kaldırma Kuvveti (Archimedes İlkesi)"
                ],
                "Öğrenim Çıktıları": [
                    "Özkütle bağıntısını kullanarak saf maddelerin ve karışımların özkütlelerini hesaplar.",
                    "Durgun sıvı ve gazlarda basıncı etkileyen değişkenleri analiz eder, manometre ve barometrelerin çalışma mantığını kavrar.",
                    "Bernoulli ilkesini (akışkan süratinin arttığı yerde basıncın düşmesi) uçak kanadı, püskürteç gibi teknolojiler üzerinden açıklar.",
                    "Sıvı içine bırakılan katı cisimlerin yüzme, askıda kalma ve batma durumlarını etki eden kaldırma kuvvetiyle ilişkilendirir."
                ]
            },
            "4. Tema: Enerji": {
                "Konular": [
                    "Fiziksel Anlamda İş (W = F . Δx) ve Güç (P = W / t)",
                    "Mekanik Enerji Türleri: Kinetik Enerji (Ek = 1/2 m.v²) ve Çekim Potansiyel Enerjisi (Ep = m.g.h)",
                    "Esneklik Potansiyel Enerjisi (Ee = 1/2 k.x²)",
                    "Mekanik Enerjinin Korunumu ve Dönüşümü",
                    "Sürtünmeli Ortamlarda Enerji Kaybı ve Isıya Dönüşüm",
                    "Enerji Verimi, Enerji Tasarrufu ve Yenilenebilir/Yenilenemez Enerji Kaynakları"
                ],
                "Öğrenim Çıktıları": [
                    "Kuvvet-yol grafiğinin altındaki alanın yapılan işi verdiğini açıklar; güç hesaplamaları yapar.",
                    "Kinetik ve potansiyel enerji bağıntılarını uygulayarak mekanik enerjinin korunduğu durumları modeller.",
                    "Sürtünme nedeniyle mekanik enerjinin bir kısmının termal enerjiye dönüştüğünü gösteren hesaplamalar yapar.",
                    "Sistemlerin verimini hesaplar ve enerji tasarrufunun sürdürülebilir kalkınmadaki önemini savunur."
                ]
            }
        },
        "Kimya": {
            "1. Tema: Etkileşim": {
                "Konular": [
                    "Kimyasal Türler (Atom, Molekül, İyon, Radikal)",
                    "Kimyasal Türler Arası Etkileşimlerin Sınıflandırılması (Güçlü ve Zayıf Etkileşimler)",
                    "Güçlü Etkileşimler: İyonik Bağ, İyonik Bileşiklerin Lewis Yapısı ve Örgü Yapısı",
                    "Kovalent Bağ (Polar ve Apolar Kovalent Bağ), Moleküllerin Lewis Gösterimi",
                    "Metalik Bağ ve Elektron Denizi Modeli",
                    "Zayıf Etkileşimler: Van der Waals Kuvvetleri (Dipol-Dipol, İndüklenmiş Dipol / London) ve Hidrojen Bağı"
                ],
                "Öğrenim Çıktıları": [
                    "Kimyasal türleri tanır ve aralarındaki etkileşimleri bağ enerjisi kriterine (yaklaşık 40 kJ/mol) göre sınıflandırır.",
                    "İyonik ve kovalent bağlı bileşiklerin oluşumunu Lewis elektron nokta yapılarıyla gösterir.",
                    "Metalik bağ modelini kullanarak metallerin elektrik/ısı iletkenliğini ve işlenebilirliğini açıklar.",
                    "Maddelerin kaynama noktası gibi fiziksel özelliklerini moleküller arası zayıf etkileşimlerin gücüyle ilişkilendirir."
                ]
            },
            "2. Tema: Çeşitlilik": {
                "Konular": [
                    "Maddenin Fiziksel Hâlleri (Katı, Sıvı, Gaz, Plazma)",
                    "Katı Türleri: Amorf Katılar ve Kristal Katılar (İyonik, Moleküler, Kovalent, Metalik Kristaller)",
                    "Sıvılarda Viskozite, Buharlaşma, Yoğuşma ve Denge Buhar Basıncı",
                    "Kaynama Olayı ve Kaynama Noktasına Etki Eden Faktörler (Dış Basınç, Sıvı Cinsi, Saflık)",
                    "Gazların Genel Özellikleri ve Gaz Değişkenleri (Basınç, Hacim, Sıcaklık, Madde Miktarı)",
                    "Plazma Hâli ve Kullanım Alanları"
                ],
                "Öğrenim Çıktıları": [
                    "Kristal katı türlerini tanecikleri bir arada tutan kuvvetlere ve fiziksel dayanıklılıklarına göre ayırt eder.",
                    "Sıvıların viskozitelerini sıcaklık ve moleküller arası çekim kuvveti üzerinden deneysel olarak karşılaştırır.",
                    "Kaynama olayı ile buharlaşma arasındaki farkları açıklar; buhar basıncını etkileyen faktörleri çözümler.",
                    "Plazma hâlinin özelliklerini ve günlük hayattaki (floresan, plazma ekran, yıldırım) varlığını değerlendirir."
                ]
            },
            "3. Tema: Sürdürülebilirlik": {
                "Konular": [
                    "Kimya Biliminin Tarihçesi: Simyadan Kimyaya Geçiş",
                    "Kimya Laboratuvarında Güvenlik Kuralları ve Güvenlik Uyarı İşaretleri (Piktogramlar)",
                    "Su ve Hayat: Suyun Canlılar İçin Önemi, Su Tasarrufu ve Su Kaynaklarının Korunması",
                    "Çevre Kimyası: Hava, Su ve Toprak Kirleticiler (Ağır Metaller, Sera Gazları, Plastikler)",
                    "Yeşil Kimya Prensipleri ve Sürdürülebilir Atık Yönetimi"
                ],
                "Öğrenim Çıktıları": [
                    "Simya ile kimya arasındaki farkı bilimsel yöntem ve teorik temeller üzerinden açıklar.",
                    "Kimyasal maddelerin üzerindeki tehlike sembollerinin (yakıcı, aşındırıcı, zehirli vb.) anlamlarını uygular.",
                    "Suyun sertliğini, arıtma yöntemlerini ve doğal su döngüsünü kimyasal açıdan değerlendirir.",
                    "Yeşil kimya felsefesini benimseyerek zararlı atıkları azaltacak çevre dostu çözümler önerir."
                ]
            }
        },
        "Biyoloji": {
            "1. Tema: Yaşam": {
                "Konular": [
                    "Canlıların Ortak Özellikleri (Hücresel Yapı, Beslenme, Solunum, Boşaltım, Hareket, Uyarılara Tepki, Uyum, Metabolizma, Homeostazi, Üreme, Büyüme-Gelişme)",
                    "Canlıların Yapısında Bulunan Temel İnorganik Bileşikler: Su, Mineraller, Asitler, Bazlar ve Tuzlar",
                    "Canlıların Yapısında Bulunan Organik Bileşikler: Karbonhidratlar (Mono-, Di-, Polisakkaritler)",
                    "Lipitler (Trigliseritler, Fosfolipitler, Steroitler)",
                    "Proteinler (Amino Asit Yapısı, Peptit Bağı, Denatürasyon) ve Enzimler (Aktivasyon Enerjisi, Enzim Yapısı, Enzim Hızını Etkileyen Faktörler)",
                    "Nükleik Asitler (DNA ve RNA Yapısı) ve ATP Molekülü, Vitaminler"
                ],
                "Öğrenim Çıktıları": [
                    "Canlıların ortak özelliklerini biyolojik süreçlerle eşleştirerek açıklar.",
                    "Suyun kohezyon, adezyon ve yüksek özgül ısı gibi özelliklerinin biyolojik sistemlerdeki işlevini kavrar.",
                    "Karbonhidrat, yağ ve proteinlerin yapı taşlarını, bağ türlerini ve canlıdaki enerji/yapısal rollerini karşılaştırır.",
                    "Enzimlerin biyolojik katalizör olma mekanizmasını ve enzim reaksiyon hızına etki eden değişkenleri (sıcaklık, pH, substrat) deney verileriyle inceler.",
                    "DNA, RNA ve ATP moleküllerinin kimyasal yapısını şematize eder."
                ]
            },
            "2. Tema: Organizasyon": {
                "Konular": [
                    "Hücre Teorisinin Tarihsel Gelişimi ve Mikroskobun Rolü",
                    "Hücre Çeşitleri: Prokaryot ve Ökaryot Hücre Yapısı",
                    "Hücre Zarı Yapısı (Akıcı Mozaik Zar Modeli) ve Özellikleri",
                    "Hücre Zarından Madde Geçişleri: Pasif Taşıma (Difüzyon, Osmoz, Kolaylaştırılmış Difüzyon) ve Aktif Taşıma",
                    "Endositoz (Fagositoz, Pinositoz) ve Ekzositoz Olayları",
                    "Sitoplazma ve Organeller (Zarsız: Ribozom, Sentrozom; Tek Zarlı: ER, Golgi, Lizozom, Koful, Peroksizom; Çift Zarlı: Mitokondri, Kloroplast)",
                    "Hücre İskeleti Elemanları (Mikrofilament, Ara Filament, Mikrotübül) ve Çekirdek",
                    "Hücresel Organizasyon Basamakları (Hücre -> Doku -> Organ -> Sistem -> Organizma)"
                ],
                "Öğrenim Çıktıları": [
                    "Prokaryot ve ökaryot hücreleri organel çeşitliliği ve genetik materyalin konumu bakımından karşılaştırır.",
                    "Hücre zarından madde geçiş mekanizmalarını enerji harcanma durumuna ve molekül büyüklüğüne göre sınıflandırır.",
                    "Plazmoliz, deplazmoliz ve turgor basıncı deneylerini kurgular ve osmotik basınç dengesini açıklar.",
                    "Ökaryot hücre organellerinin görevlerini, yapısal özelliklerini ve birbirleriyle olan metabolik koordinasyonunu açıklar.",
                    "Bir hücreli canlılardan çok hücreli kompleks organizmalara geçişteki organizasyon hiyerarşisini modeller."
                ]
            }
        },
        "Tarih": {
            "1. Tema: Geçmişin İnşa Sürecinde Tarih": {
                "Konular": [
                    "Tarih Biliminin Konusu, Kapsamı ve Özellikleri",
                    "Tarih Araştırmalarında Yöntem (Kaynak Arama, Tasnif, Tahlil, Tenkit, Terkip)",
                    "Tarihî Kaynak Türleri (Birinci ve İkinci El Kaynaklar, Yazılı, Sözlü, Arkeolojik Kaynaklar)",
                    "Tarih Yazıcılığı Türleri (Hikâyeci, Öğretici, Araştırmacı Tarihyazımı)",
                    "Zaman ve Takvim Sistemleri (Güneş ve Ay Yılı Takvimleri, Türklerin Kullandığı Takvimler)",
                    "Tarih Öğreniminin Millî Bilinç ve Toplumsal Hafıza Açısından Önemi"
                ],
                "Öğrenim Çıktıları": [
                    "Tarihsel bilgilerin elde edilmesinde kullanılan bilimsel yöntem basamaklarını uygular.",
                    "Tarihî kaynakları güvenilirlik ve doğrudanlık derecelerine göre tenkit süzgecinden geçirir.",
                    "Türklerin tarih boyunca kullandığı takvimleri (12 Hayvanlı, Hicri, Celali, Rumi, Miladi) astronomik ve kültürel temelleriyle açıklar.",
                    "Tarih biliminin geçmişi nesnel değerlendirme ve millet olma bilincini güçlendirmedeki rolünü savunur."
                ]
            },
            "2. Tema: Eski Çağ Medeniyetleri": {
                "Konular": [
                    "İnsanlığın İlk Dönemleri: Avcı-Toplayıcı Yaşamdan Yerleşik Tarım Toplumuna Geçiş (Göbeklitepe, Çatalhöyük, Çayönü)",
                    "Yazının İcadı ve Tarihî Çağların Başlaması (Sümer Çivi Yazısı, Mısır Hiyeroglifi)",
                    "Mezopotamya Medeniyetleri (Sümerler, Akadlar, Babiller, Asurlar, Elamlar)",
                    "Anadolu Medeniyetleri (Hititler, Frigler, Lidyalılar, Urartular, İyonlar)",
                    "Mısır, Doğu Akdeniz (Fenike, İbrani), İran, Hint ve Çin Medeniyetleri",
                    "Ege ve Yunan Medeniyeti (Polisler, Kolonicilik, Demokrasinin Doğuşu)",
                    "İlk Devletlerde Hukuk Kuralları (Urkagina Kanunları, Hammurabi Kanunları, Hitit Kanunları)"
                ],
                "Öğrenim Çıktıları": [
                    "İlk yerleşim merkezlerinin ortaya çıkışında coğrafi ve iklimsel faktörlerin etkisini değerlendirir.",
                    "Eski Çağ medeniyetlerinin yazı, alfabe, takvim, tıp ve hukuk alanlarındaki insanlığa ortak mirasını inceler.",
                    "İlk Çağ siyasi organizasyon biçimlerini (site/şehir devleti, teokratik monarşi, imparatorluk) karşılaştırır.",
                    "Hammurabi ve Hitit kanunlarını mülkiyet, aile ve ceza hukuku bağlamında analiz eder."
                ]
            },
            "3. Tema: Orta Çağ Medeniyetleri": {
                "Konular": [
                    "Orta Çağ'ın Siyasi Yapıları: Avrupa'da Feodalite (Derebeylik) ve Katolik Kilisesi Skolastisizmi",
                    "Bizans (Doğu Roma) İmparatorluğu'nun Yönetim ve Askerî Yapısı (Tema Sistemi)",
                    "Sasani İmparatorluğu'nun Siyasi ve Sosyal Dinamikleri",
                    "İslamiyet Öncesi Avrasya Bozkır Kültürü ve İlk Türk Devletleri (Asya Hun, Kök Türk, Uygur Devletleri)",
                    "Orta Asya Türk Toplum Yapısı: Oguş, Urug, Boy, Bodun, İl; Töre Hukuku",
                    "Orta Çağ'da Askerî Organizasyonlar (Şövalyeler, Lejyonerler, Türk Süvarileri/Hilal Taktiği)",
                    "Orta Çağ Ticaret Yolları: İpek Yolu, Baharat Yolu, Kürk Yolu ve Kral Yolu"
                ],
                "Öğrenim Çıktıları": [
                    "Orta Çağ dünyasındaki başlıca siyasi ve askeri organizasyonları güç temelleri üzerinden tahlil eder.",
                    "Avrupa feodalizminin toplumsal tabakalaşmasını ve kilisenin siyasi egemenliğini kavrar.",
                    "Orta Asya Türk devletlerinin kut anlayışını, ordu-millet yapısını ve konargöçer yaşam tarzını inceler.",
                    "Tarihî ticaret yollarının devletler arası siyasi mücadelelere ve kültürel etkileşime etkilerini analiz eder."
                ]
            }
        },
        "Coğrafya": {
            "1. Tema: Coğrafyanın Doğası": {
                "Konular": [
                    "Doğa ve İnsan Etkileşimi (Doğanın İnsana, İnsanın Doğaya Etkileri)",
                    "Coğrafyanın Tanımı, Konusu ve Bölümleri (Fiziki Coğrafya: Jeomorfoloji, Klimatoloji, Hidrografya vb.; Beşerî Coğrafya)",
                    "Coğrafyanın İlkeleri: Nedensellik, Dağılış, Karşılıklı İlgi (Bağlantı)",
                    "Coğrafya Biliminin Tarihsel Gelişimi (İlk Çağ, Orta Çağ İslam Dünyası, Yeni ve Yakın Çağ Öncüleri)"
                ],
                "Öğrenim Çıktıları": [
                    "İnsan ile doğal çevre arasındaki dinamik etkileşimi sürdürülebilirlik ilkeleri çerçevesinde sorgular.",
                    "Coğrafyanın fiziki ve beşerî alt disiplinlerinin inceleme sahalarını ayırt eder.",
                    "Coğrafi olayları dağılış ve nedensellik ilkelerine dayanarak harita üzerinde çözümler.",
                    "Eratosthenes, Strabon, Biruni, Evliya Çelebi ve Humboldt gibi bilim insanlarının coğrafyaya katkılarını kavrar."
                ]
            },
            "2. Tema: Mekânsal Bilgi Teknolojileri": {
                "Konular": [
                    "Haritanın Tanımı, Harita Çizim Elemanları (Ölçek, Lejant, Yön Oku, Koordinat)",
                    "Harita Projeksiyon Yöntemleri (Silindirik, Konik, Düzlem Projeksiyonlar)",
                    "Ölçek Türleri (Kesir ve Çizgi Ölçek) ve Harita Hesaplamaları (Uzunluk ve Alan Hesapları)",
                    "Yeryüzü Şekillerinin Haritalarda Gösterilme Yöntemleri: İzoips (Eş Yükselti) Yöntemi",
                    "İzoips Haritalarında Yer Şekillerini (Vadi, Sırt, Tepe, Çukur, Falez, Delta) Okuma",
                    "Coğrafi Bilgi Sistemleri (CBS) ve Uzaktan Algılama Teknolojileri"
                ],
                "Öğrenim Çıktıları": [
                    "Küre yüzeyinin düzleme aktarılmasında ortaya çıkan bozulmaları projeksiyon türleriyle eşleştirir.",
                    "Kesir ve çizgi ölçek dönüşümlerini yaparak haritalarda gerçek uzunluk ve alan hesaplamaları yürütür.",
                    "İzoips eğrilerinin özelliklerini kullanarak topoğrafya haritasından profil çıkarma becerisi sergiler.",
                    "CBS yazılımlarının afet yönetimi, şehir planlama ve çevre takibindeki işlevini değerlendirir."
                ]
            },
            "3. Tema: Doğal Sistemler ve Süreçler": {
                "Konular": [
                    "Dünya'nın Şekli (Geoit) ve Boyutlarının Sonuçları",
                    "Dünya'nın Günlük (Kendi Ekseni Etrafında) Hareketi ve Sonuçları (Coriolis Kuvveti, Yerel Saat)",
                    "Dünya'nın Yıllık Hareketi ve Eksen Eğikliği (23° 27') Sonuçları",
                    "Mevsimlerin Oluşumu, Aydınlanma Çemberi, Ekinoks ve Gündönümü Dönemleri",
                    "Atmosferin Katmanları (Troposfer, Stratosfer vb.) ve Özellikleri",
                    "İklim Elemanları: Sıcaklık Dağılışını Etkileyen Faktörler ve İzoterm Haritaları",
                    "Basınç ve Rüzgârlar: Basınç Merkezleri, Rüzgâr Çeşitleri (Sürekli, Mevsimlik, Yerel Rüzgârlar)",
                    "Nem ve Yağış: Mutlak, Maksimum ve Bağıl Nem; Yağış Tipleri ve Dağılışı",
                    "Yeryüzündeki Büyük İklim Tipleri (Makroklima)"
                ],
                "Öğrenim Çıktıları": [
                    "Dünya'nın şekli ve eksen eğikliğinin yeryüzünde sıcaklık kuşaklarının oluşumuna etkilerini analiz eder.",
                    "Yerel saat hesaplamalarını boylam farkları üzerinden hatasız uygular.",
                    "Güneş ışınlarının düşme açısının yıl içindeki değişimini grafikler üzerinde modeller.",
                    "İklim elemanlarının oluşum mekanizmalarını çözümler; sıcaklık ve yağış grafiklerini inceleyerek iklim tipini belirler."
                ]
            },
            "4. Tema: Beşerî Sistemler ve Süreçler": {
                "Konular": [
                    "Yerleşmenin Tarihsel Gelişimi ve Yerleşmeyi Sınırlandıran Faktörler (İklim, Yükselti, Çöller, Kutuplar)",
                    "Kırsal Yerleşme Türleri ve Doku Özellikleri (Toplu ve Dağınık Yerleşmeler)",
                    "Şehirsel Yerleşmeler, Fonksiyonlarına Göre Şehirler (Sanayi, Ticaret, Turizm, İdari vb.)",
                    "Mesken Tipleri ve Doğal Çevreyle Uyumu (Ahşap, Taş, Toprak Kerpiç Meskenler)"
                ],
                "Öğrenim Çıktıları": [
                    "Tarihten günümüze ilk yerleşim alanlarının seçimindeki coğrafi gerekçeleri açıklar.",
                    "Kırsal yerleşmelerin dağılışında su kaynakları ve yer şekillerinin etkisini analiz eder.",
                    "Şehirleri etki alanlarına (küresel, bölgesel, yerel) ve hâkim ekonomik fonksiyonlarına göre sınıflandırır."
                ]
            },
            "5. Tema: Ekonomik Faaliyetler ve Etkileri": {
                "Konular": [
                    "Ekonomik Faaliyetlerin Temel Sektörleri: Birincil (Tarım, Hayvancılık, Ormancılık)",
                    "İkincil Faaliyetler (Sanayi, İmalat, Enerji Üretimi)",
                    "Üçüncül Faaliyetler (Hizmet: Ulaşım, Ticaret, Eğitim, Sağlık, Bankacılık)",
                    "Dördüncül (Bilişim, Yazılım) ve Beşincil (Üst Düzey Yönetim) Faaliyetler",
                    "Ekonomik Faaliyetlerin Ülkelerin Gelişmişlik Düzeyleriyle İlişkisi"
                ],
                "Öğrenim Çıktıları": [
                    "Ekonomik faaliyet türlerini ve çalışan nüfusun sektörel dağılımını göstergeler üzerinden inceler.",
                    "Gelişmiş ve az gelişmiş ülkelerin ekonomik sektör oranlarını karşılaştırarak çıkarımlarda bulunur."
                ]
            },
            "6. Tema: Afetler ve Sürdürülebilir Çevre": {
                "Konular": [
                    "Doğa Kaynaklı Afetlerin Sınıflandırılması: Jeolojik ve Jeomorfolojik Afetler (Deprem, Tsunami, Volkanizma, Heyelan)",
                    "Meteorolojik ve Hidrolojik Afetler (Kasırga, Sel, Kuraklık, Çığ)",
                    "Afetlerin Dağılışı ve Türkiye'nin Afet Riski",
                    "Afet Yönetimi Basamakları: Risk Azaltma, Hazırlık, Müdahale ve İyileştirme"
                ],
                "Öğrenim Çıktıları": [
                    "Doğal afetlerin oluşum mekanizmalarını yeryüzünün tektonik ve iklimsel yapısıyla eşleştirir.",
                    "Türkiye'de heyelan, deprem ve sel riskinin yüksek olduğu bölgeleri harita üzerinde analiz eder.",
                    "Afet öncesinde, anında ve sonrasında sergilenmesi gereken doğru davranış kalıplarını planlar."
                ]
            },
            "7. Tema: Bölgeler, Ülkeler ve Küresel Bağlantılar": {
                "Konular": [
                    "Bölge Kavramı ve Bölge Türleri (Şekilsel ve İşlevsel Bölgeler)",
                    "Doğal (Fiziki) Özelliklerine Göre Bölgeler, Beşerî ve İdari Bölgeler",
                    "Bölge Sınırlarının Kademeli Değişimi ve Geçirgenliği",
                    "Uluslararası Ulaşım ve Ticaret Ağları"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı coğrafi kriterlere göre belirlenmiş bölge haritalarını inceler ve sınır benzerliklerini ayırt eder.",
                    "Zaman içinde doğal bölge sınırlarının zor değiştiğini, beşerî bölge sınırlarının ise hızla değişebileceğini açıklar."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Bilgi ve İnanç": {
                "Konular": [
                    "İslam'da Bilgi Kaynakları: Selim Akıl, Sadık Haber (Vahiy ve Sünnet), Salim Duyular",
                    "İman Kavramı, İmanın Mahiyeti ve Taklidi İmandan Tahkiki İmana Geçiş",
                    "İman ve Amel İlişkisi",
                    "İslam İnanç Esasları ve Özellikleri",
                    "İsra Suresi 36. Ayet Bağlamında Bilgi Ahlakı"
                ],
                "Öğrenim Çıktıları": [
                    "İslam epistemolojisinde doğru bilgiye ulaşma vasıtalarını ve aklın sınırlarını açıklar.",
                    "Kör taklit yerine sorgulayıcı, delile dayalı tahkiki imanın bireydeki dönüştürücü gücünü kavrar.",
                    "İnanç esaslarının insanın anlam arayışına getirdiği bütüncül çözümleri analiz eder."
                ]
            },
            "2. Tema: İbadet ve Ahlak": {
                "Konular": [
                    "İslam'da İbadetin Anlamı, Amacı ve Kapsamı",
                    "İbadetlerin Temel İlkeleri: İsteklilik, Samimiyet (İhlas) ve Sünnete Uygunluk",
                    "İbadetlerin Bireysel (Huzur, Disiplin) ve Toplumsal (Birlik, Dayanışma) Faydaları",
                    "İbadet-Ahlak Bütünlüğü: Kötülüklerden Alıkoyan İbadet Şuuru"
                ],
                "Öğrenim Çıktıları": [
                    "İbadetin yalnızca şekilsel ritüellerden ibaret olmadığını, hayatın her anını kuşatan kulluk bilinci olduğunu açıklar.",
                    "Gösterişten (riya) uzak, samimiyetle ifa edilen ibadetlerin ahlaki olgunlaşmadaki rolünü kavrar.",
                    "Namaz, oruç, zekât gibi ibadetlerin toplumsal adalete ve merhamet duygusuna katkısını değerlendirir."
                ]
            },
            "3. Tema: Din ve Toplum": {
                "Konular": [
                    "Dinin İnsan ve Toplum Hayatındaki Yeri",
                    "Dinin Temel Hedefleri: Zarûrât-ı Hamse (Canın, Neslin, Aklın, Malın, Dinin Korunması)",
                    "Toplumsal Barış, Kardeşlik ve Adalet İlkeleri",
                    "Aile Kurumunun Korunması ve Sıla-i Rahim"
                ],
                "Öğrenim Çıktıları": [
                    "Dinin toplumsal değerlerin ve hukuk kurallarının oluşumundaki kurucu işlevini değerlendirir.",
                    "İslam hukukunun korumayı hedeflediği beş temel evrensel ilkeyi güncel sorunlarla ilişkilendirir.",
                    "Akrabalık bağlarını gözetmenin ve aile içi saygının toplumsal çözülmeyi önleyici gücünü açıklar."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: Personal Experiences": {
                "Konular": [
                    "Personal Experiences and Memorable Events",
                    "Present Perfect Tense vs. Simple Past Tense",
                    "Time Adverbs: just, already, yet, since, for, ever, never",
                    "Expressing Emotional Responses and Life Lessons"
                ],
                "Öğrenim Çıktıları": [
                    "Narrates past personal achievements and unique milestones using present perfect structures accurately.",
                    "Contrasts completed past actions with indefinite life experiences in spoken dialogues.",
                    "Composes a reflective personal journal entry describing life-changing memories."
                ]
            },
            "Theme 2: Media and Communication": {
                "Konular": [
                    "Traditional vs. Digital Media Channels",
                    "Media Literacy, Fake News and Disinformation",
                    "Passive Voice in Journalistic Contexts (Present Simple and Past Simple Passive)",
                    "Expressing Points of View and Formal Arguments"
                ],
                "Öğrenim Çıktıları": [
                    "Critically analyzes headline news articles and identifies biased or unverified claims.",
                    "Reports formal news events and scientific breakthroughs using passive voice structures.",
                    "Participates in a classroom debate evaluating the ethical boundaries of social media networks."
                ]
            },
            "Theme 3: Global Issues": {
                "Konular": [
                    "Global Ecological Crises: Climate Change, Deforestation, Water Scarcity",
                    "Conditional Sentences: Type 1 (Real) and Type 2 (Hypothetical Situations)",
                    "Proposing Environmental Solutions with Modals (ought to, should, must)",
                    "International Solidarity and Non-Governmental Organizations"
                ],
                "Öğrenim Çıktıları": [
                    "Discusses global environmental threats and their long-term socioeconomic outcomes.",
                    "Constructs hypothetical conditional arguments regarding ecological preservation (e.g., If we protected forests...).",
                    "Drafts an action manifesto outlining concrete sustainable development goals."
                ]
            },
            "Theme 4: Technology and Innovation": {
                "Konular": [
                    "Artificial Intelligence, Robotics, and Biotechnology",
                    "Future Modals of Deduction and Prediction (will, may, might, could)",
                    "Advantages and Ethical Dilemmas of Technological Breakthroughs",
                    "Describing Scientific Processes and Inventions"
                ],
                "Öğrenim Çıktıları": [
                    "Speculates about futuristic technologies and societal transformations using predictive modals.",
                    "Understands formal audio documentaries discussing the ethics of genetic engineering and AI.",
                    "Delivers a well-researched oral presentation introducing an innovative tech concept."
                ]
            },
            "Theme 5: Future Plans and Career Pathways": {
                "Konular": [
                    "Future Intentions and Definite Arrangements: Will, Be Going To, Present Continuous for Future",
                    "Career Planning, Professional Competencies and Job Interviews",
                    "Time Clauses: when, as soon as, before, after, until",
                    "Formal Cover Letter and Resume Writing"
                ],
                "Öğrenim Çıktıları": [
                    "Articulates short-term and long-term vocational ambitions using varied future time expressions.",
                    "Simulates formal job interviews by articulating personal strengths and professional qualifications.",
                    "Drafts a formal professional cover letter applying for a specific academic or career opportunity."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Atletizm ve Kondisyonel Beceriler": {
                "Konular": [
                    "Kondisyonel Motorik Beceriler: Kuvvet, Dayanıklılık, Çabukluk ve Esneklik",
                    "Kısa ve Orta Mesafe Koşu Mekaniği, Çıkış (Takoz) Teknikleri",
                    "Dinamik ve Statik Isınma-Soğuma Protokolleri",
                    "Postür Analizi ve Egzersiz Ergonomisi"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı mesafe koşularında takoz çıkışını ve adım frekansını tekniğine uygun yürütür.",
                    "Fiziksel uygunluk test parametrelerini (Cooper testi, mekik, esneklik) uygulayarak gelişimini raporlar.",
                    "Antrenman öncesi dinamik, sonrası statik esneme hareketlerini sakatlıkları önleyecek biçimde uygular."
                ]
            },
            "2. Tema: Bireysel ve Takım Sporlarında Taktik": {
                "Konular": [
                    "Basketbolda Temel Hücum Setleri, Perdeleme (Pick and Roll) ve Alan Paylaşımı",
                    "Voleybolda Dönüşler, Manşetle Karşılama ve Sistem Dizilişleri (4-2, 5-1)",
                    "Futbolda Alan Savunması, Pas Açıları ve Ofsayt Taktiği",
                    "Sporda Dürüst Oyun (Fair-Play) Etiği ve Müsabaka Disiplini"
                ],
                "Öğrenim Çıktıları": [
                    "Takım oyunlarında hücum ve savunma prensiplerini müsabaka ortamında başarıyla uygular.",
                    "Oyun kurallarına, hakem kararlarına ve rakip oyunculara saygılı centilmen tutum sergiler.",
                    "Bireysel spor dallarında stratejik karar alma ve odaklanma becerilerini sahada gösterir."
                ]
            }
        },
        "Görsel Sanatlar / Müzik": {
            "1. Tema: Sanatsal İfade ve Algı": {
                "Konular": [
                    "Görsel Sanatlarda Tasarım İlkeleri: Denge, Ritim, Kontrast, Vurgu ve Bütünlük",
                    "Renk Teorisi: Renk Çemberi, Armoniler, Sıcak-Soğuk Denge",
                    "Karakalem Tonlaması ve Çizgisel Perspektif",
                    "Müzikte Ritim, Solfej ve Makamsal Ezgilerin Tahlili"
                ],
                "Öğrenim Çıktıları": [
                    "Sanat elemanlarını kullanarak dengeli ve estetik bir kompozisyon oluşturur.",
                    "Perspektif ilkelerini uygulayarak nesnelere iki ve üç boyutlu derinlik kazandırır.",
                    "Müziksel formları ve ritmik vuruşları doğru ses tonuyla seslendirir."
                ]
            },
            "2. Tema: Sanat Tarihi ve Kültürel Miras": {
                "Konular": [
                    "İlk Çağ Sanatından Klasik Türk Sanatına Kültürel Bellek",
                    "Selçuklu ve Osmanlı Mimarisi, Taş ve Çini İşçiliği",
                    "Batı Sanat Tarihinde Rönesans ve Barok Döneminin Başyapıtları",
                    "Müzik Kültüründe Klasik Türk Müziği ve Halk Ozanlığı Geleneği"
                ],
                "Öğrenim Çıktıları": [
                    "Tarihsel dönemlerin mimari ve görsel sanat eserlerini medeniyet bağlamında analiz eder.",
                    "Klasik Türk ve Batı sanatının önde gelen temsilcilerini ve başyapıtlarını tanır.",
                    "Sanat eserlerinin korunmasına ve gelecek kuşaklara aktarılmasına duyarlılık gösterir."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Tema: Problem Çözme ve Algoritmik Tasarım": {
                "Konular": [
                    "Algoritmik Düşünme: Problemi Ayrıştırma ve Örüntü Tanıma",
                    "Algoritmaların Akış Şemalarıyla Modellenmesi",
                    "Değişkenler, Sabitler ve Aritmetik/Mantıksal Operatörler",
                    "Programlama Yaşam Döngüsü ve Hata Ayıklama (Debugging)"
                ],
                "Öğrenim Çıktıları": [
                    "Matematiksel ve mantıksal problemleri çözmek için adım adım algoritmalar tasarlar.",
                    "Akış şeması gösterimlerini standart sembollerle kurallara uygun çizer.",
                    "Algoritmada mantık ve sözdizimi hatalarını tespit ederek ayıklar."
                ]
            },
            "2. Tema: Metin Tabanlı Programlama": {
                "Konular": [
                    "Python Programlama Diline Giriş: Temel Sözdizimi",
                    "Veri Tipleri (Integer, Float, String, Boolean) ve Tip Dönüşümleri",
                    "Karar Yapıları: if, elif, else Blokları",
                    "Döngüler: for ve while Döngüleri, Döngü Kontrol İfadeleri (break, continue)",
                    "Temel Veri Yapıları: Listeler ve Demetler"
                ],
                "Öğrenim Çıktıları": [
                    "Metin tabanlı dilde konsol girdi/çıktı işlemlerini hatasız kodlar.",
                    "Şartlı durumları if-else yapılarıyla kurgulayarak dallanma algoritmaları oluşturur.",
                    "Tekrarlı işlemleri döngüler yardımıyla optimize ederek liste yapılarıyla çalışır."
                ]
            }
        },
        "Felsefe": {
            "1. Tema: Felsefeye Giriş": {
                "Konular": [
                    "Felsefenin tanımını ve tarihini açıklar",
                    "'Felsefeye Giriş' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir",
                    "'Felsefeye Giriş' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir",
                    "Öğrendiği bilgileri kullanarak 'Felsefeye Giriş' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir",
                    "'Felsefeye Giriş' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder"
                ],
                "Öğrenim Çıktıları": [
                    "Felsefenin tanımını ve tarihini açıklar.",
                    "'Felsefeye Giriş' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                    "'Felsefeye Giriş' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                    "Öğrendiği bilgileri kullanarak 'Felsefeye Giriş' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                    "'Felsefeye Giriş' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
                ]
            },
            "2. Tema: Bilgi Felsefesi": {
                "Konular": [
                    "Bilginin ne olduğunu ve kaynaklarını tartışır",
                    "'Bilgi Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir",
                    "'Bilgi Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir",
                    "Öğrendiği bilgileri kullanarak 'Bilgi Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir",
                    "'Bilgi Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder"
                ],
                "Öğrenim Çıktıları": [
                    "Bilginin ne olduğunu ve kaynaklarını tartışır.",
                    "'Bilgi Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                    "'Bilgi Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                    "Öğrendiği bilgileri kullanarak 'Bilgi Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                    "'Bilgi Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
                ]
            }
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "1. Tema: Tanışma ve Selamlaşma": {
                "Konular": [
                    "Temel selamlaşma kalıplarını kullanır",
                    "'Tanışma ve Selamlaşma' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Tanışma ve Selamlaşma' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Tanışma ve Selamlaşma' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Tanışma ve Selamlaşma' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Temel selamlaşma kalıplarını kullanır.",
                    "'Tanışma ve Selamlaşma' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Tanışma ve Selamlaşma' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Tanışma ve Selamlaşma' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Tanışma ve Selamlaşma' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            },
            "2. Tema: Günlük Yaşam": {
                "Konular": [
                    "Sayılar",
                    "'Günlük Yaşam' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Günlük Yaşam' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Günlük Yaşam' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Günlük Yaşam' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Sayılar, renkler ve günleri söyler.",
                    "'Günlük Yaşam' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Günlük Yaşam' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Günlük Yaşam' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Günlük Yaşam' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        },
        "Seçmeli Bilgisayar Bilimi": {
            "1. Tema: Algoritma ve Kodlama": {
                "Konular": [
                    "Algoritma adımlarını tasarlar",
                    "'Algoritma ve Kodlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Algoritma ve Kodlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Algoritma ve Kodlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Algoritma ve Kodlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Algoritma adımlarını tasarlar.",
                    "'Algoritma ve Kodlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Algoritma ve Kodlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Algoritma ve Kodlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Algoritma ve Kodlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Etik ve Güvenlik": {
                "Konular": [
                    "Bilişim etiğini açıklar",
                    "'Etik ve Güvenlik' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Etik ve Güvenlik' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Etik ve Güvenlik' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Etik ve Güvenlik' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Bilişim etiğini açıklar.",
                    "'Etik ve Güvenlik' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Etik ve Güvenlik' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Etik ve Güvenlik' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Etik ve Güvenlik' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        },
        "Seçmeli Astronomi ve Uzay Bilimleri": {
            "1. Tema: Evreni Tanıyalım": {
                "Konular": [
                    "Gök cisimlerini sınıflandırır",
                    "'Evreni Tanıyalım' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Evreni Tanıyalım' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Evreni Tanıyalım' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Evreni Tanıyalım' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Gök cisimlerini sınıflandırır.",
                    "'Evreni Tanıyalım' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Evreni Tanıyalım' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Evreni Tanıyalım' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Evreni Tanıyalım' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Uzay Araştırmaları": {
                "Konular": [
                    "Uzay teknolojilerinin günlük hayata katkısını açıklar",
                    "'Uzay Araştırmaları' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Uzay Araştırmaları' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Uzay Araştırmaları' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Uzay Araştırmaları' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Uzay teknolojilerinin günlük hayata katkısını açıklar.",
                    "'Uzay Araştırmaları' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Uzay Araştırmaları' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Uzay Araştırmaları' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Uzay Araştırmaları' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        },
        "Seçmeli Proje Hazırlama": {
            "1. Tema: Bilimsel Yöntem": {
                "Konular": [
                    "Proje konusunu belirler",
                    "'Bilimsel Yöntem' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Bilimsel Yöntem' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Bilimsel Yöntem' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Bilimsel Yöntem' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Proje konusunu belirler.",
                    "'Bilimsel Yöntem' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Bilimsel Yöntem' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Bilimsel Yöntem' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Bilimsel Yöntem' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Proje Tasarımı": {
                "Konular": [
                    "Proje takvimi oluşturur ve sunar",
                    "'Proje Tasarımı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Proje Tasarımı' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Proje Tasarımı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Proje Tasarımı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Proje takvimi oluşturur ve sunar.",
                    "'Proje Tasarımı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Proje Tasarımı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Proje Tasarımı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Proje Tasarımı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        }
    },
    "10. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "1. Tema: İslamiyet Öncesi ve Geçiş Dönemi Türk Edebiyatı": {
                "Konular": [
                    "İslamiyet Öncesi Sözlü Edebiyat: Koşuk, Sagu, Sav ve Destan Türleri",
                    "İslamiyet Öncesi Yazılı Dönem: Orhun Yazıtları ve Uygur Metinleri",
                    "Geçiş Dönemi Eserleri: Kutadgu Bilig, Divanü Lugati't-Türk, Atabetü'l-Hakayık, Divan-ı Hikmet",
                    "Dede Korkut Hikâyeleri: Yapısı, Dili ve Kültürel Değeri"
                ],
                "Öğrenim Çıktıları": [
                    "İslamiyet öncesi Türk şiirinin nazım birimi (dörtlük), ölçüsü (hece) ve temalarını kavrar.",
                    "Orhun Abideleri'nin Türk dili, tarihi ve devlet yönetimi anlayışındaki kurucu rolünü analiz eder.",
                    "Geçiş Dönemi eserlerinde İslamiyet etkisindeki yeni nazım şekillerini (aruz, mesnevi, beyit) ve ahlaki gayeyi inceler.",
                    "Dede Korkut Hikâyeleri'nin destandan halk hikâyeciliğine geçişteki köprü işlevini çözümler."
                ]
            },
            "2. Tema: Halk Edebiyatı": {
                "Konular": [
                    "Anonim Halk Edebiyatı: Mani, Türkü, Ağıt, Ninni Türleri",
                    "Âşık Tarzı Halk Edebiyatı: Koşma (Güzelleme, Koçaklama, Taşlama, Ağıt), Semai, Varsağı, Destan",
                    "Dinî-Tasavvufi Halk Edebiyatı: İlahi, Nefes, Şathiye, Nutuk, Devriye",
                    "Önemli Halk Şairleri (Köroğlu, Karacaoğlan, Dadaloğlu, Yunus Emre, Pir Sultan Abdal)"
                ],
                "Öğrenim Çıktıları": [
                    "Halk edebiyatının kollarını (anonim, âşık, tekke) dil, üslup ve biçim yönünden ayırt eder.",
                    "Koşma ve türkülerin hece kalıplarını, kafiye örgüsünü ve ahenk unsurlarını çözümler.",
                    "Tasavvuf düşüncesinin halk şiirindeki mecaz ve sembollerle aktarılışını değerlendirir."
                ]
            },
            "3. Tema: Divan Edebiyatı": {
                "Konular": [
                    "Divan Edebiyatının Oluşumu, Kaynakları ve Estetik Anlayışı",
                    "Divan Şiiri Nazım Şekilleri: Beyitlerle Kurulanlar (Gazel, Kaside, Mesnevi, Kıt'a)",
                    "Dörtlüklerle ve Bentlerle Kurulanlar (Rubai, Tuyuğ, Şarkı, Terkibibent, Terciibent)",
                    "Divan Edebiyatında Mazmunlar ve Edebi Sanatlar",
                    "Büyük Divan Şairleri (Fuzuli, Baki, Nedim, Şeyh Galip)"
                ],
                "Öğrenim Çıktıları": [
                    "Gazel ve kaside nazım şekillerinin bölümlerini (matla, makta, mahlas vb.) ve kafiye düzenini tahlil eder.",
                    "Divan şiirindeki mazmunları (gül-bülbül, şem-pervane vb.) çözümler.",
                    "Aruz vezninin Türkçeye uygulanışındaki incelikleri kavrar ve klasik şiirin estetik dünyasını yorumlar."
                ]
            },
            "4. Tema: Roman ve Hikâye": {
                "Konular": [
                    "Destandan Romana: Mesneviler ve Halk Hikâyeleri",
                    "Tanzimat Dönemi Roman ve Hikâyesi (İlk Çeviriler, İlk Yerli ve Edebi Romanlar)",
                    "Servetifünun ve Millî Edebiyat Döneminde Roman ve Hikâyenin Gelişimi",
                    "Roman Tahlili Unsurları (Tema, Tip ve Karakter, Zaman, Mekân, Bakış Açısı)"
                ],
                "Öğrenim Çıktıları": [
                    "Batılı anlamda roman türünün Türk edebiyatındaki serüvenini ve ilk eserleri (Taaşşuk-ı Talat ve Fitnat, İntibah vb.) inceler.",
                    "Tanzimat romanındaki yanlış Batılılaşma, esaret ve cariyelik temalarını dönemin şartları içinde tahlil eder.",
                    "Servetifünun ve Millî Edebiyat dönemi romanlarının realizm ve natüralizm akımlarıyla ilişkisini kavrar."
                ]
            },
            "5. Tema: Tiyatro": {
                "Konular": [
                    "Geleneksel Türk Tiyatrosu: Karagöz (Gölge Oyunu), Orta Oyunu, Meddah, Köy Seyirlik Oyunları",
                    "Modern Tiyatroya Geçiş: Tanzimat Tiyatrosu (Şinasi'nin Şair Evlenmesi)",
                    "Tiyatronun Yapı Unsurları: Olay Örgüsü, Çatışma, Kişiler, Sahne, Diyalog ve Monolog",
                    "Tiyatro Türleri: Trajedi, Komedi ve Dram"
                ],
                "Öğrenim Çıktıları": [
                    "Geleneksel Türk seyirlik oyunlarının yazılı bir metne dayanmayan (doğaçlama) özelliklerini kavrar.",
                    "Karagöz ve Orta Oyunu'ndaki tipleri (Hacivat-Karagöz, Kavuklu-Pişekâr) tahlil eder.",
                    "Batılı tiyatronun Tanzimat'la birlikte Türk toplumuna girişini ve sahnelenme serüvenini değerlendirir."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Sayma ve Olasılık": {
                "Konular": [
                    "Toplama ve Çarpma Yoluyla Sayma İlkeleri",
                    "Faktöriyel Kavramı ve İşlemleri",
                    "Permütasyon (Sıralama): n Elemanın r'li Permütasyonları, Tekrarlı Permütasyon",
                    "Kombinasyon (Seçme): n Elemanın r'li Kombinasyonları ve Geometrik Kombinasyon Problemleri",
                    "Binom Açılımı, Pascal Üçgeni ve Katsayılar İlişkisi",
                    "Koşullu Olasılık, Bağımlı ve Bağımsız Olaylar, Bileşik Olayların Olasılığı"
                ],
                "Öğrenim Çıktıları": [
                    "Sayma ilkelerini kullanarak karmaşık sıralama ve seçim problemlerini analitik olarak çözer.",
                    "Tekrarlı permütasyon formülünü harf dizilimleri ve yol problemlerine uygular.",
                    "Pascal üçgeni ile binom katsayıları arasındaki bağlantıyı kurar; açılımdaki belirli terimleri hesaplar.",
                    "Bir olayın gerçekleşme olasılığını önceden gerçekleşmiş başka bir olay koşulu altında (P(A|B)) hesaplar."
                ]
            },
            "2. Tema: Fonksiyonlar": {
                "Konular": [
                    "Fonksiyon Kavramı, Tanım, Değer ve Görüntü Kümeleri",
                    "Fonksiyon Olma Şartı (Dikey Doğru Testi)",
                    "Fonksiyon Türleri: Birebir, Örten, İçine, Birim, Sabit, Sıfır ve Doğrusal Fonksiyon",
                    "Parçalı Fonksiyonlar ve Mutlak Değer Fonksiyonu",
                    "Fonksiyon Grafikleri ve Yorumlanması",
                    "Fonksiyonlarda Dört İşlem",
                    "İki Fonksiyonun Bileşkesi ((fog)(x)) ve Bir Fonksiyonun Tersi (f⁻¹(x))"
                ],
                "Öğrenim Çıktıları": [
                    "İlişkilerin fonksiyon olup olmadığını tanım ve değer kümeleri üzerinden cebirsel ve grafiksel doğrular.",
                    "Fonksiyonların grafiklerini çizer; grafik üzerinden tanım ve görüntü kümelerini belirler.",
                    "Bileşke fonksiyon işlemlerini yürütür ve birleşme/değişme özelliklerini inceler.",
                    "Birebir ve örten bir fonksiyonun tersinin var olduğunu kavrar; kuralını cebirsel olarak bulur."
                ]
            },
            "3. Tema: Polinomlar": {
                "Konular": [
                    "Polinom Kavramı, Derecesi, Başkatsayısı ve Sabit Terimi",
                    "Polinomlarda Toplama, Çıkarma, Çarpma İşlemleri",
                    "Polinomlarda Bölme İşlemi, Bölüm ve Kalan İlişkisi (P(x) = B(x).Q(x) + K(x))",
                    "Polinomun ax+b ile Bölümünden Kalanı Bölme Yapmadan Bulma",
                    "Çarpanlara Ayırma Yöntemleri: Ortak Çarpan, Gruplandırma, Tam Kare ve İki Kare Farkı",
                    "Rasyonel İfadelerin Sadeleştirilmesi"
                ],
                "Öğrenim Çıktıları": [
                    "Cebirsel ifadelerin polinom olma şartını (doğal sayı üsler) ayırt eder.",
                    "Polinomlarda bölme algoritmasını uygulayarak kalan bulma teoremini hatasız kullanır.",
                    "Çarpanlara ayırma teknikleriyle karmaşık cebirsel ve rasyonel ifadeleri sadeleştirir."
                ]
            },
            "4. Tema: İkinci Dereceden Denklemler": {
                "Konular": [
                    "İkinci Dereceden Bir Bilinmeyenli Denklem Tanımı (ax² + bx + c = 0)",
                    "Çarpanlara Ayırma ve Tam Kareye Tamamlama ile Çözüm",
                    "Diskriminant (Δ = b² - 4ac) Yöntemi ile Kök Bulma",
                    "Karmaşık Sayılar Kümesine Giriş (i² = -1, Sanal Birim)",
                    "Kökler ile Katsayılar Arasındaki İlişkiler (Kökler Toplamı ve Çarpımı)",
                    "Kökleri Verilen İkinci Dereceden Denklemi Kurma"
                ],
                "Öğrenim Çıktıları": [
                    "İkinci dereceden denklemlerin kök varlığını diskriminantın işaretine (Δ > 0, Δ = 0, Δ < 0) göre analiz eder.",
                    "Reel kökü olmayan denklemlerin karmaşık köklerini sanal birim (i) yardımıyla bulur.",
                    "Kökler toplamı (-b/a) ve kökler çarpımı (c/a) formüllerini problem çözümlerinde uygular.",
                    "Kökleri bilinen ikinci dereceden denklemi x² - (x1+x2)x + (x1.x2) = 0 bağıntısıyla yazar."
                ]
            },
            "5. Tema: Geometri: Dörtgenler ve Çokgenler": {
                "Konular": [
                    "Çokgenlerde Temel Kavramlar, İç ve Dış Açılar Toplamı",
                    "Düzgün Çokgenlerin Kenar, Açı ve Alan Özellikleri",
                    "Dörtgenlerin Genel Açı, Kenar ve Köşegen Özellikleri",
                    "Özel Dörtgenler: Paralelkenar ve Eşkenar Dörtgen",
                    "Dikdörtgen, Kare, Deltoid ve Yamuk (İkizkenar ve Dik Yamuk)",
                    "Özel Dörtgenlerde Çevre ve Alan Bağıntıları"
                ],
                "Öğrenim Çıktıları": [
                    "Düzgün çokgenlerin iç ve dış açı ölçülerini hesaplayarak geometrik çizimler yapar.",
                    "Özel dörtgenlerin açı, kenar ve köşegen simetrilerini karşılaştırır.",
                    "Paralelkenar, eşkenar dörtgen, yamuk ve deltoidin alan bağıntılarını ispatlar ve problemlere uygular."
                ]
            },
            "6. Tema: Katı Cisimler": {
                "Konular": [
                    "Dik Prizmaların (Küp, Dikdörtgenler Prizması, Üçgen Prizma) Özellikleri",
                    "Dik Prizmaların Yüzey Alanı ve Hacim Hesapları",
                    "Dik Piramitlerin Temel Elemanları, Alan ve Hacmi"
                ],
                "Öğrenim Çıktıları": [
                    "Prizma ve piramitlerin üç boyutlu uzay modellerini ve düzlemsel açınımlarını inceler.",
                    "Katı cisimlerin yüzey alanı ve hacimlerini formüle ederek pratik hesaplamalar yürütür."
                ]
            }
        },
        "Fizik": {
            "1. Tema: Elektrik": {
                "Konular": [
                    "Elektrik Yüklerinin Hareketi ve Elektrik Akımı Kavramı",
                    "Katı, Sıvı ve Gazlarda Elektrik İletimi",
                    "Direnç, İletkenin Direncini Etkileyen Değişkenler ve Ohm Kanunu (V = I.R)",
                    "Dirençlerin Bağlanması: Seri ve Paralel Bağlama, Eşdeğer Direnç",
                    "Elektrik Devrelerinde Akım ve Potansiyel Farkı Ölçümü (Ampermetre ve Voltmetre Bağlantıları)",
                    "Üreteçlerin Seri ve Paralel Bağlanması, Devre Akımına Etkisi",
                    "Elektriksel Enerji (E = V.I.t) ve Elektriksel Güç (P = I².R), Elektrik Faturalandırması"
                ],
                "Öğrenim Çıktıları": [
                    "Elektrik akımının iletken içindeki elektron hareketiyle oluştuğunu kavrar.",
                    "Seri ve paralel bağlı direnç içeren karmaşık devrelerde eşdeğer direnci ve kol akımlarını hesaplar.",
                    "İç dirençli/dirençsiz üreteçlerin bağlanma prensiplerini ve tükenme sürelerini karşılaştırır.",
                    "Elektrikli aletlerin harcadığı enerjiyi ve güç değerlerini hesaplayarak tasarruf tedbirleri belirler."
                ]
            },
            "2. Tema: Manyetizma": {
                "Konular": [
                    "Mıknatısların Özellikleri, Kutupları ve Manyetik Alan Çizgileri",
                    "Dünya'nın Manyetik Alanı ve Pusula Çalışma Mantığı",
                    "Akım Geçen Düz Bir Telin Çevresinde Oluşan Manyetik Alan (Sağ El Kuralı)",
                    "Elektromıknatıs Yapımı ve Manyetik Kuvveti Etkileyen Değişkenler"
                ],
                "Öğrenim Çıktıları": [
                    "Mıknatısların çevrelerinde oluşturdukları manyetik alan çizgilerinin özelliklerini modeller.",
                    "Akım taşıyan düz tel ve bobin etrafındaki manyetik alanın yönünü sağ el kuralıyla bulur.",
                    "Elektromıknatısın günlük yaşam ve teknolojideki (maglev treni, kapı zili, röle) işlevlerini açıklar."
                ]
            },
            "3. Tema: Basınç ve Kaldırma Kuvveti": {
                "Konular": [
                    "Katı Basıncı, Basınç Kuvveti ve Piezoelektrik Olayı",
                    "Durgun Sıvı Basıncı, Sıvı Basınç Kuvveti ve U Boruları",
                    "Pascal Prensibi ve Hidrolik Sistemler",
                    "Açık Hava Basıncı, Torricelli Deneyi ve Barometreler, Kapalı Kaplardaki Gaz Basıncı",
                    "Archimedes İlkesi ve Sıvıların Kaldırma Kuvveti (Fk = Vbatan . dsıvı . g)",
                    "Cisimlerin Sıvı İçindeki Denge Durumları (Yüzme, Askıda Kalma, Batma) ve Ağırlaşma Kapları"
                ],
                "Öğrenim Çıktıları": [
                    "Katı, sıvı ve gaz basıncını etkileyen faktörleri deneylerle analiz eder.",
                    "U borusu ve su cenderesi düzeneklerinde sıvı basınç dengesini kurarak bilinmeyen özkütle ve kuvveti hesaplar.",
                    "Kaldırma kuvvetinin batan hacim ve sıvı yoğunluğuyla ilişkisini doğrular.",
                    "Taşırma kaplarına atılan cisimlerin kapta meydana getirdiği kütle artışını kaldırma kuvvetiyle açıklar."
                ]
            },
            "4. Tema: Dalgalar": {
                "Konular": [
                    "Dalga Hareketinin Temel Değişkenleri: Periyot, Frekans, Dalga Boyu, Hız ve Genlik (v = λ.f)",
                    "Dalgaların Sınıflandırılması: Titreşim Doğrultusuna Göre (Enine ve Boyuna) ve Taşıdığı Enerjiye Göre (Mekanik ve Elektromanyetik)",
                    "Yay Dalgaları: Atma Kavramı, Yansıma (Sabit ve Serbest Uç), İletilme (İnce ve Kalın Yay)",
                    "Su Dalgaları: Düzlemsel ve Dairesel Su Dalgaları, Doğrusal ve Parabolik Engellerden Yansıma, Stroboskop",
                    "Su Dalgalarında Kırılma (Derin ve Sığ Ortam Geçişleri)",
                    "Ses Dalgaları: Sesin Şiddeti, Yüksekliği (Frekansı), Tınısı; Rezonans ve Yankı",
                    "Deprem Dalgaları ve Deprem Güvenliği"
                ],
                "Öğrenim Çıktıları": [
                    "Dalgaların temel değişkenleri arasındaki matematiksel bağıntıyı uygular.",
                    "Yay dalgalarında farklı ortamlara geçen atmaların hız, genlik ve dalga boyu değişimlerini analiz eder.",
                    "Su dalgalarında derinlik değişiminin dalga sürati ve kırılma üzerindeki etkilerini açıklar.",
                    "Ses dalgalarının rezonans ve tını özelliklerini inceler; deprem dalgalarının türlerini ve şiddetini kavrar."
                ]
            },
            "5. Tema: Optik": {
                "Konular": [
                    "Işık Şiddeti, Işık Akısı ve Aydınlanma Şiddeti (E = I / d²)",
                    "Işığın Yansıması ve Düzlem Aynada Görüntü Özellikleri",
                    "Küresel Aynalar: Çukur ve Tümsek Aynalar, Odak Noktası, Özel Işınlar ve Görüntü Çizimleri",
                    "Işığın Kırılması, Snell Kanunu ve Kırılma İndisi",
                    "Tam Yansıma ve Sınır Açısı, Fiber Optik Teknolojisi",
                    "Mercekler: İnce ve Kalın Kenarlı Mercekler, Özel Işınlar, Odak Uzaklığı ve Görüntü Özellikleri",
                    "Prizmalar ve Işığın Renklerine Ayrılması"
                ],
                "Öğrenim Çıktıları": [
                    "Aydınlanma şiddetini etkileyen değişkenleri inceler ve fotometre prensibini açıklar.",
                    "Düzlem, çukur ve tümsek aynalarda özel ışınları kullanarak görüntü boyu ve yerini çizer.",
                    "Işığın farklı kırıcılık indisine sahip ortamlardan geçerken doğrultu değiştirmesini Snell kanunuyla hesaplar.",
                    "Merceklerin optik aletlerdeki (mikroskop, teleskop, fotoğraf makinesi) ve göz kusurları tedavisindeki rolünü açıklar."
                ]
            }
        },
        "Kimya": {
            "1. Tema: Kimyanın Temel Kanunları ve Kimyasal Hesaplamalar": {
                "Konular": [
                    "Kütlenin Korunumu Kanunu (Lavoisier)",
                    "Sabit Oranlar Kanunu (Proust) ve Katlı Oranlar Kanunu (Dalton)",
                    "Mol Kavramı, Avogadro Sayısı (6,02x10²³), Bağıl Atom Kütlesi ve Molar Hacim",
                    "Kimyasal Tepkime Türleri (Yanma, Sentez, Analiz, Asit-Baz, Çökelme)",
                    "Kimyasal Denklemlerin Denkleştirilmesi",
                    "Kimyasal Tepkime Hesaplamaları (Stokiyometri, Sınırlayıcı Bileşen, Yüzde Verim ve Saf Olmayan Madde Problemleri)"
                ],
                "Öğrenim Çıktıları": [
                    "Kimyanın temel kanunlarını deney verilerini kullanarak açıklar ve kanıtlar.",
                    "Madde miktarı (mol), tanecik sayısı, kütle ve normal şartlardaki gaz hacmi dönüşümlerini yapar.",
                    "Kimyasal tepkimeleri denkleştirir; reaktif ve ürünlerin stokiyometrik katsayılarına göre madde miktarlarını hesaplar.",
                    "Sınırlayıcı bileşen içeren tepkimelerde artan maddeyi ve kuramsal/gerçek verim yüzdelerini hesaplar."
                ]
            },
            "2. Tema: Karışımlar": {
                "Konular": [
                    "Homojen Karışımlar (Çözeltiler) ve Heterojen Karışımlar (Süspansiyon, Emülsiyon, Kolloid, Aerosol)",
                    "Çözünme Süreci: Çözücü-Çözünen Etkileşimleri ('Benzer benzeri çözer' İlkesi)",
                    "Derişim Birimleri: Kütlece Yüzde Derişim, Hacimce Yüzde Derişim, Milyonda Bir (ppm)",
                    "Çözelti Hazırlama, Seyreltme ve Deriştirme Hesaplamaları",
                    "Koligatif Özellikler (Kaynama Noktası Yükselmesi - Ebriliyoskopi, Donma Noktası Düşmesi - Kriyoskopi, Osmoz)",
                    "Karışımları Ayırma ve Saflaştırma Yöntemleri (Tanecik Boyutu, Yoğunluk, Kaynama Noktası ve Çözünürlük Farkı ile Ayırma)"
                ],
                "Öğrenim Çıktıları": [
                    "Karışımları faz durumlarına ve dağılan tanecik boyutlarına göre sınıflandırır.",
                    "Moleküler ve iyonik çözünme mekanizmalarını tanecikler arası etkileşimlerle açıklar.",
                    "Kütlece/hacimce yüzde ve ppm derişim hesaplamalarını çözelti problemlerine uygular.",
                    "Çözeltilerin koligatif özelliklerini saf çözücüyle karşılaştırarak günlük yaşam uygulamalarını (kışın yollara tuz atılması vb.) değerlendirir.",
                    "Karışımları süzme, diyaliz, flotasyon, damıtma ve kristallendirme yöntemleriyle bileşenlerine ayırır."
                ]
            },
            "3. Tema: Asitler, Bazlar ve Tuzlar": {
                "Konular": [
                    "Asit ve Bazların Tanımı (Arrhenius Tanımı), Genel Özellikleri",
                    "Asit ve Bazların Ayırt Edilmesi: İndikatörler (Turnusol, Fenolftalein vb.) ve pH/pOH Kavramı",
                    "Asitlerin ve Bazların Tepkimeleri: Nötralleşme Tepkimesi ve Metallerle Tepkimeleri (Aktif, Soy, Yarı Soy, Amfoter Metaller)",
                    "Hayatımızda Asitler ve Bazlar: Tüketim Maddelerindeki Asitler, Asit Yağmurları ve Güvenlik Önlemleri",
                    "Tuzların Özellikleri ve Önemli Tuzlar (NaCl, NaHCO₃, Na₂CO₃, CaCO₃, NH₄Cl)"
                ],
                "Öğrenim Çıktıları": [
                    "Maddelerin asitlik ve bazlık derecelerini pH ölçeği üzerinde karşılaştırır.",
                    "Asit ve bazların metallerle oluşturduğu gaz çıkışlarını (H₂, SO₂, NO₂ vb.) tepkime denklemleriyle yazar.",
                    "Nötralleşme tepkimelerinde tam nötralleşme şartlarını ve tuz oluşumunu çözümler.",
                    "Yaygın tuzların kimyasal formüllerini, elde ediliş yollarını ve endüstrideki kullanım alanlarını kavrar."
                ]
            },
            "4. Tema: Kimya Her Yerde": {
                "Konular": [
                    "Temizlik Maddeleri: Sabun ve Deterjanların Kimyasal Yapısı, Kir Temizleme Mekanizması",
                    "Hijyen Amaçlı Maddeler (Çamaşır Suyu, Kireç Kaymağı)",
                    "Polimerler: Monomer, Polimer Kavramları ve Yaygın Polimerler (Kauçuk, PE, PET, Kevlar, PVC, Teflon)",
                    "Kozmetik Maddeler ve Bileşenleri",
                    "İlaç Formları (Hap, Şurup, İğne, Merhem) ve Bilinçli İlaç Kullanımı",
                    "Gıdalar: Hazır Gıdalarda Kullanılan Katkı Maddeleri (Koruyucular, Renklendiriciler, Emülgatörler) ve Yağ Türleri"
                ],
                "Öğrenim Çıktıları": [
                    "Sabun ve deterjan moleküllerinin hidrofob ve hidrofil uçlarının kirleri çözme mekanizmasını açıklar.",
                    "Polimer malzemelerin olumlu özelliklerini ve çevreye verdikleri zararları değerlendirir.",
                    "Gıdalardaki katkı maddelerinin sağlık üzerindeki olası risklerini ve ambalaj etiketlerini sorgular."
                ]
            }
        },
        "Biyoloji": {
            "1. Tema: Hücre Bölünmeleri": {
                "Konular": [
                    "Hücre Bölünmesinin Gerekliliği (Yüzey/Hacim Oranı, Çekirdek/Sitoplazma Dengesi)",
                    "Hücre Döngüsü ve Aşamaları: İnterfaz (G1, S, G2) ve Mitotik Evre",
                    "Mitoz Bölünme Evreleri: Profaz, Metafaz, Anafaz, Telofaz ve Sitokinez (Bitki ve Hayvan Hücresinde Farklar)",
                    "Hücre Döngüsünün Kontrolü (G1, G2, M Kontrol Noktaları) ve Kanserleşme",
                    "Eşeysiz Üreme Çeşitleri: Bölünerek Üreme, Tomurcuklanma, Sporla Üreme, Rejenerasyon, Partenogenez, Vejetatif Üreme",
                    "Mayoz Bölünmenin Önemi: Kromozom Sayısının Sabit Kalması ve Biyoçeşitlilik",
                    "Mayoz Evreleri: Mayoz I (Krossing-over, Sinapsis, Tetrat, Homolog Kromozom Ayrılması) ve Mayoz II (Kardeş Kromatit Ayrılması)",
                    "Eşeyli Üreme, Döllenme ve Eşeysiz Üremeyle Karşılaştırılması"
                ],
                "Öğrenim Çıktıları": [
                    "Mitozun evrelerini mikroskop preparatları ve modeller üzerinde inceler; kromozom sayısı-DNA miktarı grafiklerini çizer.",
                    "Hücre döngüsü kontrol mekanizmasının bozulması sonucu kontrolsüz bölünen kanser hücrelerinin gelişimini tartışır.",
                    "Eşeysiz üreme biçimlerinin tarımsal üretimdeki avantaj ve dezavantajlarını değerlendirir.",
                    "Mayoz bölünmede çeşitlilik sağlayan faktörleri (krossing-over ve homolog kromozomların rastgele dağılımı) açıklar."
                ]
            },
            "2. Tema: Kalıtımın Genel Esasları": {
                "Konular": [
                    "Mendel Genetiği: Temel Kavramlar (Gen, Alel, Lokus, Homozigot, Heterozigot, Dominant, Resesif, Fenotip, Genotip)",
                    "Mendel İlkeleri: Ayrılma İlkesi ve Bağımsız Dağılım İlkesi",
                    "Monohibrit ve Dihibrit Çaprazlamalar, Punnett Karesi Yöntemi",
                    "Eksik Baskınlık, Eş Baskınlık (Kodominans) ve Çok Alellilik (AB0 ve Rh Kan Grupları)",
                    "Eşeyin Belirlenmesi ve Eşeye Bağlı Kalıtım (X ve Y Kromozomuna Bağlı Kalıtım: Renk Körlüğü, Hemofili)",
                    "Soyağaçları ve Genetik Hastalıkların Kalıtım Şeklinin Belirlenmesi",
                    "Akraba Evliliklerinin Genetik Riskleri"
                ],
                "Öğrenim Çıktıları": [
                    "Mendel çaprazlamalarında genotip ve fenotip oranlarını olasılık kurallarıyla hesaplar.",
                    "Kan gruplarının kalıtım mekanizmasını çözer; Rh uyuşmazlığının (Eritroblastosis fetalis) nedenlerini açıklar.",
                    "X kromozomuna bağlı çekinik kalıtılan hastalıkların soyağaçlarındaki aktarım yollarını çözümler.",
                    "Akraba evliliklerinde çekinik genetik kusurların ortaya çıkma olasılığının artışını değerlendirir."
                ]
            },
            "3. Tema: Ekosistem Ekolojisi ve Güncel Çevre Sorunları": {
                "Konular": [
                    "Ekolojinin Temel Kavramları: Tür, Popülasyon, Komünite, Ekosistem, Biyom, Biyosfer, Habitat, Ekolojik Niş",
                    "Ekosistemin Bileşenleri: Abiyotik (Işık, Sıcaklık, İklim, Su, Toprak, pH) ve Biyotik Faktörler (Üreticiler, Tüketiciler, Ayrıştırıcılar)",
                    "Ekosistemde Madde ve Enerji Akışı: Besin Zinciri, Besin Ağı, Ekolojik Piramitler (Biyokütle, Sayı, Enerji)",
                    "Madde Döngüleri: Karbon, Azot ve Su Döngüleri",
                    "Güncel Çevre Sorunları: Sera Etkisi, Küresel Isınma, Asit Yağmurları, Ozon Tabakasının İncelmesi, Ötrofikasyon",
                    "Doğal Kaynakların Sürdürülebilirliği ve Biyoçeşitliliğin Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "Ekosistemdeki canlılar arasındaki beslenme ilişkilerini (ototrof, heterotrof, miksotrof) modeller.",
                    "Besin piramidinde üreticiden son tüketiciye gidildikçe aktarılan enerji, biyokütle ve biyolojik birikim değişimini analiz eder.",
                    "Azot döngüsündeki fiksasyon, nitrifikasyon ve denitrifikasyon aşamalarını bakteri faaliyetleriyle ilişkilendirir.",
                    "İnsan kaynaklı kirliliklerin ekosistem dengesini bozma süreçlerini değerlendirerek sürdürülebilir koruma stratejileri geliştirir."
                ]
            }
        },
        "Tarih": {
            "1. Tema: Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi": {
                "Konular": [
                    "11-13. Yüzyıllarda Anadolu'ya Yapılan Oğuz Göçleri ve Yurt Edinme Süreci",
                    "Pasinler (1048) ve Malazgirt (1071) Zaferleri, Anadolu'da Kurulan İlk Türk Beylikleri (Saltuklular, Danişmentliler, Mengücekliler, Artuklular, Çaka Beyliği)",
                    "Türkiye Selçuklu Devleti'nin Kuruluşu, Miryokefalon Zaferi (1176) ve Anadolu'nun Kesin Türk Yurdu Oluşu",
                    "Haçlı Seferleri ve İslam Dünyasına Etkileri",
                    "Türkiye Selçuklularında Ticareti Geliştirme Politikaları (Kervansaraylar, Sigorta Sistemi)",
                    "Kösedağ Savaşı (1243) ve İkinci Beylikler Dönemi"
                ],
                "Öğrenim Çıktıları": [
                    "Anadolu'nun fethi ve Türkleşmesinde Malazgirt Zaferi'nin ve ilk Türk beyliklerinin imar/iskan faaliyetlerini değerlendirir.",
                    "Miryokefalon Zaferi'nin Bizans'ın Türkleri Anadolu'dan atma ümidini sona erdiren siyasi sonuçlarını açıklar.",
                    "Haçlı Seferleri'nin nedenlerini ve Akdeniz ticaretinin gelişimi gibi siyasi, sosyal, ekonomik sonuçlarını kavrar.",
                    "Kösedağ yenilgisi sonrası Anadolu'daki siyasi otorite boşluğunu ve beyliklerin ortaya çıkışını inceler."
                ]
            },
            "2. Tema: Beylikten Devlete Osmanlı Siyaseti (1302-1453)": {
                "Konular": [
                    "14. Yüzyıl Başlarında Yakın Doğu ve Avrupa'nın Jeopolitik Durumu",
                    "Osmanlı Beyliği'nin Kuruluşu: Kuruluş Teorileri (Wittek, Köprülü, İnalcık)",
                    "Balkanlardaki Fetih Siyaseti: İskân ve İstimalet (Hoşgörü) Politikaları",
                    "Koyunhisar, Sırpsındığı, I. Kosova, Niğbolu ve Varna Savaşları",
                    "Ankara Savaşı (1402), Fetret Devri ve Osmanlı Siyasi Birliğinin Dağılması",
                    "Osmanlı'nın Yeniden Toparlanması ve II. Murad Dönemi Gelişmeleri"
                ],
                "Öğrenim Çıktıları": [
                    "Osmanlı Beyliği'nin kısa sürede cihan devletine dönüşmesini sağlayan jeopolitik, askeri ve idari faktörleri analiz eder.",
                    "İskân ve istimalet politikalarının Balkanlar'da Osmanlı kalıcılığını sağlama rolünü değerlendirir.",
                    "Ankara Savaşı'nın sonuçlarını ve Fetret Devri'ndeki taht kavgalarının devlete etkilerini inceler."
                ]
            },
            "3. Tema: Devletleşme Sürecinde Savaşçılar ve Askerler": {
                "Konular": [
                    "Osmanlı Askerî Teşkilatının Temelleri: Alpler, Gaziler ve Düzenli Orduya Geçiş (Yaya ve Müsellemler)",
                    "Tımar Sistemi ve Tımarlı Sipahiler (Eyalet Ordusu)",
                    "Kapıkulu Ocağı: Yeniçeri Teşkilatı ve Devşirme Sistemi",
                    "Osmanlı Donanmasının Oluşumu (Karesioğulları'nın Katılımı ve İlk Tersaneler)"
                ],
                "Öğrenim Çıktıları": [
                    "Tımar sisteminin ordu finansmanı, tarımsal süreklilik ve taşra güvenliğindeki çok yönlü işlevini kavrar.",
                    "Devşirme sisteminin işleyiş mekanizmasını ve Kapıkulu Ocaklarının merkez otoritesini korumadaki rolünü açıklar."
                ]
            },
            "4. Tema: Beylikten Devlete Osmanlı Medeniyeti": {
                "Konular": [
                    "Anadolu'da Tasavvuf Kültürü ve Manevi Mimarlar (Mevlana, Hacı Bektaş-ı Veli, Yunus Emre, Ahi Evran)",
                    "Osmanlı Devleti'nde İlim ve Eğitim: Medreseler, Müderrisler ve Âlimler (Davud-ı Kayseri, Molla Fenari, Ali Kuşçu)",
                    "Osmanlı Şehir Dokusu, Ahilik Teşkilatı ve Esnaf Ahlakı",
                    "Erken Dönem Osmanlı Sanatı ve Mimarisi (Bursa ve Edirne Eserleri)"
                ],
                "Öğrenim Çıktıları": [
                    "Tasavvufi düşüncenin Anadolu'da toplumsal birlik ve kaynaşmayı sağlama işlevini tahlil eder.",
                    "Medreselerin Osmanlı idari ve hukuki yapısının kurulmasındaki akademik önemini değerlendirir.",
                    "Ahi teşkilatının mesleki ahlak, usta-çırak ilişkisi ve fiyat denetimi (narh) sistemini inceler."
                ]
            },
            "5. Tema: Dünya Gücü Osmanlı (1453-1595)": {
                "Konular": [
                    "İstanbul'un Fethinin Sebepleri, Hazırlıkları ve Kuşatma Süreci",
                    "Fethin Türk ve Dünya Tarihi Açısından Sonuçları",
                    "II. Mehmed (Fatih) Dönemi Fetihleri: Balkanlar, Karadeniz ve Ege Adaları",
                    "İslam Dünyasında Liderlik Mücadelesi: Otlukbeli, Çaldıran, Mercidabık ve Ridaniye Savaşları",
                    "Hilafetin Osmanlı'ya Geçişi ve Doğu Akdeniz Ticaret Yolları",
                    "Kanuni Sultan Süleyman Dönemi: Mohaç Meydan Muharebesi, Viyana Kuşatması, Kapitülasyonlar",
                    "Denizlerde Hâkimiyet: Preveze Deniz Zaferi (1538) ve Cerbe Zaferi"
                ],
                "Öğrenim Çıktıları": [
                    "İstanbul'un fethinin getirdiği jeopolitik üstünlüğü ve Orta Çağ'ın kapanıp Yeni Çağ'ın başlamasındaki rolünü kavrar.",
                    "Yavuz Sultan Selim'in doğu seferlerinin İslam dünyasında birliği sağlama ve baharat yolunu denetleme boyutunu analiz eder.",
                    "Kanuni döneminde Avrupa'daki mezhep bölünmelerine karşı izlenen denge siyasetini ve Akdeniz hâkimiyetini açıklar."
                ]
            },
            "6. Tema: Sultan ve Merkez Teşkilatı": {
                "Konular": [
                    "Topkapı Sarayı'nın Bölümleri ve İşlevleri: Birun, Enderun ve Harem",
                    "Divan-ı Hümayun'un Yapısı, Karar Alma Süreci ve Divan Üyeleri (Sadrazam, Şeyhülislam, Nişancı, Defterdar, Kazasker, Kaptan-ı Derya)",
                    "Padişahın Otoritesinin Güçlendirilmesi: Fatih Kanunnamesi (Kanunname-i Âl-i Osman)",
                    "Osmanlı Hukuk Sistemi: Şer'i ve Örfi Hukuk Dengesi"
                ],
                "Öğrenim Çıktıları": [
                    "Topkapı Sarayı'nın hem devlet idare merkezi hem yükseköğretim (Enderun) kurumu olma özelliğini tahlil eder.",
                    "Divan-ı Hümayun üyelerinin yetki ve sorumluluklarını günümüz bakanlıklarıyla karşılaştırır.",
                    "Fatih Kanunnamesi ile merkezî otoritenin mutlaklaştırılması adımlarını değerlendirir."
                ]
            },
            "7. Tema: Klasik Çağda Osmanlı Toplum Düzeni": {
                "Konular": [
                    "Osmanlı Toplumunun Sınıflandırılması: Yönetenler (Askerîler: Seyfiye, İlmiye, Kalemiye) ve Yönetilenler (Reaya)",
                    "Osmanlı Millet Sistemi (Dini Cemaat Esasına Dayalı Toplum Modeli)",
                    "Sosyal Hayat, Vakıf Sistemi ve Şehir Yaşamı",
                    "Lonca Teşkilatı, Narh Sistemi ve Esnaf Dayanışması"
                ],
                "Öğrenim Çıktıları": [
                    "Osmanlı toplumunda yöneten zümrelerin (kılıç, ilim ve kalem ehli) devlet işleyişindeki rollerini ayırt eder.",
                    "Millet sisteminin farklı din ve ırktan toplulukları yüzyıllarca bir arada barış içinde tutma başarısını kavrar.",
                    "Vakıf sisteminin kamu hizmetlerinin finansmanı ve sosyal refahın tesisindeki vazgeçilmez yerini değerlendirir."
                ]
            }
        },
        "Coğrafya": {
            "1. Tema: Doğal Sistemler: Yer Kabuğunun Yapısı ve Süreçler": {
                "Konular": [
                    "Dünya'nın İç Yapısı ve Katmanları (Yer Kabuğu/Litosfer, Manto/Astenosfer, Çekirdek/Barisfer)",
                    "Levha Tektoniği Kuramı (Wegener Kıtaların Kayması Teorisi)",
                    "Jeolojik Zamanlar (Prekambriyen, Paleozoyik, Mezozoyik, Senozoyik) ve Yaşanan Temel Olaylar",
                    "İç Kuvvetler: Orojenez (Dağ Oluşumu - Kıvrılma ve Kırılma)",
                    "Epirojenez (Kıta Oluşumu - Transgresyon ve Regresyon)",
                    "Volkanizma (Derinlik ve Yüzey Volkanizması, Volkanik Şekiller)",
                    "Depremler (Sismoloji, Deprem Türleri, Deprem Dalgaları ve Etkileri)",
                    "Kayaç Türleri: Magmatik (Püskürük), Tortul (Sedimenter) ve Başkalaşım (Metamorfik) Kayaçlar"
                ],
                "Öğrenim Çıktıları": [
                    "Dünya'nın iç yapısını sıcaklık, yoğunluk ve basınç değişimleri üzerinden açıklar.",
                    "Levha hareketlerinin dağ sıraları, okyanus hendekleri ve deprem kuşaklarını oluşturma sürecini modeller.",
                    "İç kuvvetlerin enerjilerini yerin derinliklerindeki magmadan aldığını kavrar ve orojenez/epirojenez olaylarını karşılaştırır.",
                    "Kayaç döngüsünü ve farklı kayaçların topoğrafya üzerindeki şekillendirici etkilerini (karstik şekiller, peri bacaları vb.) inceler."
                ]
            },
            "2. Tema: Dış Kuvvetler ve Türkiye'nin Yer Şekilleri": {
                "Konular": [
                    "Dış Kuvvetlerin Enerji Kaynağı (Güneş) ve Aşındırma-Taşıma-Biriktirme Faaliyetleri",
                    "Akarsular: Akarsu Aşınım (Vadi Türleri, Kırgıbayır, Dev Kazanı) ve Birikim Şekilleri (Delta, Birikinti Konisi)",
                    "Rüzgârlar: Rüzgâr Aşınım (Mantar Kaya, Tafoni) ve Birikim Şekilleri (Barkan, Lös)",
                    "Karstik Şekiller: Lapya, Dolin, Uvala, Polye, Obruk, Mağara, Traverten",
                    "Buzullar: Moren, Sirk Gölleri, Hörgüç Kaya",
                    "Dalga ve Akıntılar: Falez, Tombolo, Kıyı Kordonu, Lagün",
                    "Türkiye'nin Dağları, Platoları ve Ovaları"
                ],
                "Öğrenim Çıktıları": [
                    "Dış kuvvetlerin iklim özelliklerine bağlı olarak yeryüzünü aşındırma ve biriktirme süreçlerini açıklar.",
                    "Türkiye'nin genç oluşumlu bir ülke olmasının yer şekillerine yansımasını değerlendirir.",
                    "Türkiye'deki karstik, volkanik ve akarsu şekillerini harita üzerinde gösterir."
                ]
            },
            "3. Tema: Su, Toprak ve Bitki Varlığı": {
                "Konular": [
                    "Hidrosfer: Okyanuslar, Denizler ve Boğazlar",
                    "Göller ve Oluşumlarına Göre Sınıflandırılması (Tektonik, Volkanik, Karstik, Set Gölleri)",
                    "Akarsu Rejimleri ve Havza Özellikleri (Açık ve Kapalı Havza)",
                    "Yer Altı Suları ve Kaynak Türleri (Vadi, Yamaç, Karstik/Voklüz, Artezyen, Gayzer)",
                    "Toprak Oluşumu, Toprağın Katmanları (Horizonlar) ve Toprak Tipleri (Zonal, İntrazonal, Azonal Topraklar)",
                    "Bitki Örtüsü: Ağaç, Çalı ve Ot Formasyonları, Yeryüzünde Bitki Dağılışını Etkileyen Faktörler",
                    "Türkiye'nin Su, Toprak ve Bitki Zenginliği"
                ],
                "Öğrenim Çıktıları": [
                    "Yeryüzündeki tatlı ve tuzlu su kaynaklarının dağılışını ve su döngüsünü açıklar.",
                    "Farklı iklim koşullarında oluşan toprak tiplerini horizon özellikleri ve verimlilikleri bakımından inceler.",
                    "Bitki topluluklarının iklim ve yer şekilleriyle olan uyumunu analiz eder; Türkiye'nin endemik bitki varlığını değerlendirir."
                ]
            },
            "4. Tema: Beşerî Sistemler: Nüfus ve Yerleşme": {
                "Konular": [
                    "Nüfusun Önemi, Nüfus Sayımlarının Tarihsel Gelişimi ve Amaçları",
                    "Dünya Nüfusunun Tarihsel Değişimi ve Sıçrama Dönemleri",
                    "Nüfusun Dağılışını Etkileyen Doğal ve Beşerî Faktörler",
                    "Nüfus Piramitleri ve Ülkelerin Gelişmişlik Düzeyleriyle İlişkisi",
                    "Göçün Nedenleri ve Türleri (İç/Dış, Gönüllü/Zorunlu, İşçi, Beyin Göçleri)",
                    "Türkiye'de Nüfusun Alansal Dağılışı, Nüfus Politikaları ve Göç Olgusu"
                ],
                "Öğrenim Çıktıları": [
                    "Demografik göstergeleri (doğum, ölüm, bağımlı nüfus, ortalama ömür) analiz eder.",
                    "Nüfus piramitlerinin taban ve tavan genişliklerinden hareketle ülkelerin geleceğe yönelik nüfus projeksiyonlarını yapar.",
                    "Uluslararası göç hareketlerinin kaynak ve hedef ülkeler üzerindeki sosyal/ekonomik sonuçlarını değerlendirir."
                ]
            },
            "5. Tema: Afetler": {
                "Konular": [
                    "Afetlerin Genel Özellikleri ve Sınıflandırılması",
                    "Jeolojik Afetler: Deprem, Volkanik Patlama, Tsunami",
                    "Jeomorfolojik Afetler: Heyelan, Kaya Düşmesi, Çamur Akıntısı",
                    "Meteorolojik ve Hidrolojik Afetler: Fırtına, Kasırga, Sel, Su Baskını, Kuraklık, Çığ",
                    "Afetlerin Dağılışı, Afet Risk Yönetimi ve Afet Bilinci"
                ],
                "Öğrenim Çıktıları": [
                    "Doğal afetlerin oluşum nedenlerini tektonik plakalar ve küresel hava dolaşımıyla ilişkilendirir.",
                    "Türkiye'de yaşanan afet türlerini (özellikle Kuzey Anadolu ve Doğu Anadolu Fay Kuşağı depremleri) harita üzerinde analiz eder.",
                    "Afet öncesi erken uyarı sistemlerinin ve mekânsal planlamanın can ve mal kaybını önlemedeki önemini savunur."
                ]
            }
        },
        "Felsefe": {
            "1. Tema: Felsefeyi Tanıma": {
                "Konular": [
                    "Felsefenin Anlamı, Doğuşu ve 'Philosophia' Kavramı",
                    "Felsefi Düşüncenin Nitelikleri (Sorgulayıcı, Eleştirel, Refleksif, Rasyonel, Tutarlı, Yığılımlı/Kümülatif, Evrensel)",
                    "Felsefenin Bireysel İşlevleri (Kendini Tanıma, Ön Yargılardan Uzaklaşma, Özgür Düşünme)",
                    "Felsefenin Toplumsal İşlevleri (Demokrasi Bilinci, Bilgi Toplumu, Farklılıklara Hoşgörü)",
                    "Felsefe ile Hayat İlişkisi"
                ],
                "Öğrenim Çıktıları": [
                    "Felsefenin merak, hayret ve şüphe duygusundan doğan düşünsel bir arayış olduğunu kavrar.",
                    "Felsefi düşünceyi efsanevi (mitolojik) ve dogmatik yaklaşımlardan ayıran eleştirel nitelikleri açıklar.",
                    "Felsefi bakış açısının bireyin yaşamına anlam katma ve analitik düşünme becerisine katkısını değerlendirir."
                ]
            },
            "2. Tema: Felsefe ile Düşünme": {
                "Konular": [
                    "Akıl Yürütme ve Argümantasyon: Akıl İlkeleri (Özdeşlik, Çelişmezlik, Üçüncü Durumun İmkânsızlığı, Yeter-Sebep)",
                    "Akıl Yürütme Türleri: Tümdengelim (Dedüksiyon), Tümevarım (Endüksiyon) ve Analoji",
                    "Görüş, Önerme ve Argüman Kavramları",
                    "Argümanların Geçerliliği ve Tutarlılığı",
                    "Dil ve Felsefe İlişkisi: Kavram Yanılgıları, Anlam ve Doğruluk"
                ],
                "Öğrenim Çıktıları": [
                    "Felsefi metinlerdeki argümanları mantıksal geçerlilik ve öncüllerin tutarlılığı yönünden çözümler.",
                    "Tümdengelim ve tümevarım yöntemlerini kullanarak geçerli felsefi argümanlar inşa eder.",
                    "Düşüncenin aktarımında dilin sınırlarını ve kavram kargaşalarının tartışmaları saptırıcı rolünü inceler."
                ]
            },
            "3. Tema: Varlık Felsefesi (Ontoloji)": {
                "Konular": [
                    "Varlık Felsefesinin Konusu ve Temel Soruları (Varlık Var mıdır? Varlığın Mahiyeti Nedir?)",
                    "Varlığın Varlığını Reddedenler: Nihilizm (Hiççilik) ve Taoculuk",
                    "Varlığı Kabul Edenler: Realizm (Gerçekçilik)",
                    "Varlığın Mahiyetine Dair Görüşler: Varlığı 'Oluş' Olarak Kabul Edenler (Herakleitos, Whitehead)",
                    "Varlığı 'İdea' Olarak Kabul Edenler (Platon, Aristoteles, Farabi, Hegel)",
                    "Varlığı 'Madde' Olarak Kabul Edenler (Demokritos, Hobbes, La Mettrie, Marx)",
                    "Varlığı 'Hem Madde Hem Ruh' Olarak Kabul Edenler (Descartes - Düalizm)",
                    "Varlığı 'Fenomen' Olarak Kabul Edenler (Husserl)"
                ],
                "Öğrenim Çıktıları": [
                    "Varlık felsefesinin metafizikle ilişkisini ve varlığın ilk nedenlerini sorgular.",
                    "İdealist, materyalist ve düalist varlık anlayışlarının temel argümanlarını karşılaştırır.",
                    "Kendi varlık kavrayışını felsefi gerekçeler sunarak temellendirir."
                ]
            },
            "4. Tema: Bilgi Felsefesi (Epistemoloji)": {
                "Konular": [
                    "Bilgi Felsefesinin Temel Soruları: Doğru Bilgi Mümkün müdür? Bilginin Kaynağı ve Sınırları Nelerdir?",
                    "Bilgi Türleri: Gündelik, Dini, Sanatsal, Teknik, Bilimsel ve Felsefi Bilgi",
                    "Doğru Bilginin İmkânsız Olduğunu Savunanlar: Sofistler (Protagoras, Gorgias) ve Septikler (Pyrrhon, Timon)",
                    "Doğru Bilginin Mümkün Olduğunu Savunanlar: Rasyonalizm (Akılcılık: Sokrates, Platon, Descartes, Kant)",
                    "Empirizm (Deneycilik: Locke, Hume) ve Kritisizm (Eleştirellik: Kant)",
                    "Pozitivizm (Olguculuk: Comte), Entüisyonizm (Sezgicilik: Gazali, Bergson), Pragmatizm (Faydacılık: James, Dewey)",
                    "Doğruluk Ölçütleri: Uygunluk, Tutarlılık, Tümel Uzlaşım, Apaçıklık, Yarar"
                ],
                "Öğrenim Çıktıları": [
                    "Şüphecilerin ve dogmatik düşünürlerin doğru bilgiye ulaşma iddialarını eleştirir.",
                    "Bilginin kaynağına ilişkin akılcı ve deneyci yaklaşımların çatışan noktalarını tahlil eder.",
                    "Bir bilginin doğruluğunu 'tümel uzlaşım' ve 'olgusal uygunluk' gibi ölçütlerle denetler."
                ]
            },
            "5. Tema: Ahlak, Din ve Siyaset Felsefesi": {
                "Konular": [
                    "Ahlak Felsefesi: Ahlaki Eylem, Özgürlük, Sorumluluk ve Vicdan İlişkisi",
                    "Evrensel Ahlak Yasasının Varlığı Tartışması (Hedonizm, Egoizm, Utilitarizm, Kant'ın Ödev Ahlakı)",
                    "Din Felsefesi: Tanrı'nın Varlığına İlişkin Görüşler (Teizm, Deizm, Panteizm, Agnostisizm, Ateizm)",
                    "Siyaset Felsefesi: Devletin Doğuşu (Doğal ve Yapay Kurum Olarak Devlet), Meşruiyet, Adalet ve Ütopyalar"
                ],
                "Öğrenim Çıktıları": [
                    "İnsanın ahlaki kararlarındaki özgürlük derecesini determinizm ve indeterminizm çerçevesinde tartışır.",
                    "Kant'ın ödev ahlakındaki karşılıksız iyilik ve ahlak yasası prensibini çözümler.",
                    "İdeal toplum ve devlet arayışında yazılan ütopya ve distopyaları (Platon'un Devleti, Orwell'in 1984'ü) felsefi açıdan değerlendirir."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Allah İnancı ve İnsan": {
                "Konular": [
                    "İnsanın Tabiatı ve İnanma İhtiyacı (Fıtrat Kavramı)",
                    "Allah'ın Varlığının ve Birliğinin Delilleri: Gaye ve Nizam Delili, Ekmel (Mükemmel Varlık) Delili",
                    "Allah'ın İsimleri (Esmâ-i Hüsnâ) ve Sıfatlarının Yansımaları",
                    "İnsan ile Allah Arasındaki İletişim Yolları: Dua, İbadet, Kur'an Okuma ve Tövbe",
                    "Rûm Suresi 17-27. Ayetler Işığında Yaratılışın Gayesi"
                ],
                "Öğrenim Çıktıları": [
                    "İnsanın doğuştan getirdiği inanma duygusunu fıtrat kavramıyla açıklar.",
                    "Evrendeki düzen ve amaçlılıktan hareketle nizam ve teleolojik delilleri temellendirir.",
                    "Duanın ve samimi tövbenin insanın manevi gelişimine ve psikolojik sağlığına katkısını kavrar."
                ]
            },
            "2. Tema: İslam ve Gençlik": {
                "Konular": [
                    "Kur'an-ı Kerim'de ve Hadislerde Gençliğin Önemi",
                    "Hz. Muhammed'in Gençlere Verdiği Değer ve Güven (Genç Sahabiler: Hz. Ali, Usame bin Zeyd, Mus'ab bin Umeyr)",
                    "Tarihten Örnek Genç Şahsiyetler: Ashab-ı Kehf ve Hz. Yusuf'un İffeti",
                    "Gençlerin Karşılaştığı İnanç ve Ahlak Problemleri (Deizm, Nihilizm, Bağımlılık)",
                    "Gençlerin Kişilik İnşasında Dini Değerlerin Rolü"
                ],
                "Öğrenim Çıktıları": [
                    "Peygamberimizin gençlere idari, askerî ve tebliğ alanlarında yüklediği sorumlulukları inceler.",
                    "Ashab-ı Kehf'in inançları uğruna verdikleri tavizsiz duruşu günümüz gençlik idealleriyle bağdaştırır.",
                    "Çağdaş ideolojik akımların ve ahlaki yozlaşmanın getirdiği tehlikelere karşı manevi kalkanlar geliştirir."
                ]
            },
            "3. Tema: Din ve Hayat": {
                "Konular": [
                    "Dinin Aile Hayatındaki Yeri ve Önemi",
                    "Çalışma, Helal Kazanç ve Mülkiyet Ahlakı",
                    "İslam'ın İktisadi İlkeleri: Faiz, Rüşvet, Hile ve Karaborsacılığın Yasaklanması",
                    "Çevre Ahlakı ve Doğal Kaynakların İbadet Şuuruyla Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "Ailenin kurulması ve devamında sevgi, saygı ve sorumluluk bilincini ayetlerle açıklar.",
                    "Helal kazanç ve alın teri kavramlarının bireysel vicdan ve kamu huzurundaki belirleyiciliğini kavrar.",
                    "İslam'ın tabiatı bir emanet olarak gören çevre etiği anlayışını savunur."
                ]
            },
            "4. Tema: İslam Düşüncesinde İtikadi ve Siyasi Yorumlar": {
                "Konular": [
                    "Dinin Değişmeyen Esasları (Sabiteler) ile Yoruma Açık Alanları (Değişkenler)",
                    "İslam Düşüncesinde İtikadi ve Siyasi Ekollerin Doğuş Sebepleri",
                    "Ehl-i Sünnet Ekolü: Maturidilik (Akıl ve Nakil Dengesi) ve Eş'arilik",
                    "Şia (İmamiyye ve Zeydiyye) Ekolü ve Temel Görüşleri",
                    "Dinde Aşırılıklardan Kaçınma, Dini İstismardan Korunma ve Birlik Bilinci"
                ],
                "Öğrenim Çıktıları": [
                    "İslam düşüncesindeki farklı mezhep ve yorumların toplumsal, coğrafi ve insani sebeplere dayanan zenginlik olduğunu açıklar.",
                    "İmam Maturidi'nin akıl ve iradeyi önceleyen teolojik sistemini kavrar.",
                    "Dini metinleri bağlamından kopararak terör veya menfaat için kullanan istismarcı yapılara karşı uyanık duruş sergiler."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: School Life and Identity": {
                "Konular": [
                    "Personal Attributes, Talents, and Identity",
                    "Describing Daily Routines, Study Habits, and School Protocols",
                    "Comparative and Superlative Evaluation of Educational Systems",
                    "Stating Habits in the Past with 'Used to'"
                ],
                "Öğrenim Çıktıları": [
                    "Articulates complex descriptions of individual identity, study habits, and academic disciplines.",
                    "Contrasts historical educational traditions with modern school routines using 'used to'.",
                    "Participates fluently in discussions negotiating classroom rules and collaborative responsibilities."
                ]
            },
            "Theme 2: Plans and Ambitions": {
                "Konular": [
                    "Vocational Aims, Academic Ambitions, and Career Pathways",
                    "Expressing Future Intentions and Scheduled Commitments (Future Continuous, Future Perfect)",
                    "Conditional Clauses (Type 1 and 2) in Practical Decision-Making",
                    "Writing a Formal Application and Curriculum Vitae (CV)"
                ],
                "Öğrenim Çıktıları": [
                    "Outlines personal career objectives using advanced future aspect structures.",
                    "Applies conditional logic to discuss alternative professional scenarios and choices.",
                    "Compiles a comprehensive curriculum vitae accompanied by a formal application letter."
                ]
            },
            "Theme 3: Legendary Figures": {
                "Konular": [
                    "Historical Personalities, Inventors, and Mythological Heroes",
                    "Narrating Events in Chronological Sequence with Past Simple and Past Continuous Tenses",
                    "Using Time Clauses (while, when, as, as soon as)",
                    "Biographical Writing and Character Profiling"
                ],
                "Öğrenim Çıktıları": [
                    "Narrates past historic actions and background contexts using past continuous and simple past verbs seamlessly.",
                    "Analyzes written biographies of pioneering figures and pinpoints key milestones.",
                    "Presents a coherent biographical profile highlighting the ethical qualities of a historical leader."
                ]
            },
            "Theme 4: Traditions and Food Culture": {
                "Konular": [
                    "Culinary Traditions, International Dishes, and Festive Meals",
                    "Describing Complex Cooking Steps using Sequence Connectors and Passive Structures",
                    "Cultural Etiquette, Hospitality, and Celebratory Customs",
                    "Quantifiers and Partitives with Ingredients"
                ],
                "Öğrenim Çıktıları": [
                    "Explains culinary preparation processes and cultural gastronomy using passive descriptions.",
                    "Compares traditional Turkish culinary hospitality with diverse international culinary customs.",
                    "Writes a comprehensive procedural recipe for a traditional dish with precise quantities."
                ]
            },
            "Theme 5: Travel and Tourism": {
                "Konular": [
                    "Travel Destinations, Accommodation, and Booking Procedures",
                    "Modals of Advice, Obligation, and Necessity (must, have to, should, ought to)",
                    "Present Perfect Continuous Tense for Unfinished Actions",
                    "Designing a Travel Brochure and City Guide"
                ],
                "Öğrenim Çıktıları": [
                    "Handles complex travel reservations, transit queries, and accommodation arrangements.",
                    "Expresses continuous travel experiences and duration of stay using present perfect continuous.",
                    "Designs an informative tourism pamphlet recommending architectural landmarks and itinerary tips."
                ]
            },
            "Theme 6: Digital Era and Cyber Ethics": {
                "Konular": [
                    "Digital Technologies, Social Networks, and Artificial Intelligence",
                    "Cyberbullying, Internet Addiction, and Information Privacy",
                    "Expressing Opinions, Agreement, and Disagreement in Formal Debates",
                    "Writing an Opinion Essay on Technology"
                ],
                "Öğrenim Çıktıları": [
                    "Engages in formal debates on the social impact of technological immersion and online anonymity.",
                    "Applies ethical online security measures to safeguard personal digital identity.",
                    "Composes an argumentative opinion essay defending balanced technology consumption."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Bireysel ve Takım Sporlarında İleri Beceriler": {
                "Konular": [
                    "Basketbolda Bölgesel Savunma Taktikleri, Hızlı Hücum ve Pozisyon Alma",
                    "Voleybolda İkili ve Üçlü Blok Düzenekleri, Hücum Varyasyonları",
                    "Futbolda Alan Presi, Taktik Formasyonlar ve Duran Top Stratejileri",
                    "Müsabaka Yönetimi, Hakemlik Kuralları ve Saha İçi Disiplin"
                ],
                "Öğrenim Çıktıları": [
                    "Seçilen takım sporunda karmaşık hücum ve savunma taktiklerini müsabakada uygular.",
                    "Müsabaka kurallarını detaylarıyla bilerek sınıf içi turnuvalarda hakemlik yapar.",
                    "Takım stratejisine uygun görev paylaşımı alarak liderlik ve sorumluluk sergiler."
                ]
            },
            "2. Tema: Yaşam Boyu Sağlık ve Antrenman İlkeleri": {
                "Konular": [
                    "Antrenman İlkeleri: Yüklenme, Dinlenme, Süreklilik ve Çeşitlilik",
                    "Bireysel Egzersiz Reçetesi Hazırlama ve Gelişimi İzleme",
                    "Ofis/Masa Başı Ergonomisi ve Omurga Sağlığı Egzersizleri",
                    "Doping ve Yapay Performans Artırıcıların Kardiyovasküler Zararları"
                ],
                "Öğrenim Çıktıları": [
                    "Kişisel fiziksel uygunluk değerlerine göre periyodik antrenman planı tanzim eder.",
                    "Hareketsiz yaşamın omurga ve kas sisteminde oluşturduğu deformasyonları önleyici egzersizler uygular.",
                    "Spor ahlakını zedeleyen ve sağlığı tehdit eden zararlı maddelere karşı bilinçli tavır sergiler."
                ]
            }
        },
        "Görsel Sanatlar / Müzik": {
            "1. Tema: Sanat Akımları ve Görsel Tasarım": {
                "Konular": [
                    "Klasik ve Modern Sanat Akımları: Rönesans, Barok, Romantizm, Realizm, İzlenimcilik",
                    "Görsel Tasarımda Kompozisyon, Derinlik ve Altın Oran",
                    "Portre ve Natürmort Çizim Teknikleri",
                    "Müzikte Türk Sanat ve Halk Müziği Eserlerinin Usul ve Makam Analizi"
                ],
                "Öğrenim Çıktıları": [
                    "Sanat akımlarının ortaya çıktığı dönemin felsefi ve toplumsal yapısıyla bağını kurar.",
                    "Altın oran ve perspektif kurallarını uygulayarak özgün natürmort veya figüratif çalışmalar üretir.",
                    "Geleneksel Türk müziği makamlarını (Rast, Nihavent, Hicaz, Hüseyni) dinleyerek ayırt eder."
                ]
            },
            "2. Tema: Kültürel Bellek ve Sanat Tarihi": {
                "Konular": [
                    "Geleneksel Türk-İslam Sanatları: Hat, Tezhip, Minyatür, Ebru ve Ahşap Oymacılığı",
                    "Cumhuriyet Dönemi Türk Resmi ve Heykeli",
                    "Çağdaş Sanat Eserleri Çözümleme ve Eleştiri Yöntemleri",
                    "Sanat Galerisi ve Müze Kültürü"
                ],
                "Öğrenim Çıktıları": [
                    "Geleneksel Türk el sanatlarının estetik ve manevi kodlarını çözümler.",
                    "Cumhuriyet kuşağı Türk sanatçılarının eserlerini ulusal ve evrensel temalar bakımından eleştirir.",
                    "Kişisel portfolyo hazırlayarak sanatsal çalışmalarını sergileme bilinci kazanır."
                ]
            }
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Tema: İleri Programlama ve Veri Yapıları": {
                "Konular": [
                    "Fonksiyonlar (Parametreler, Dönüş Değerleri ve Fonksiyon Kapsamı / Scope)",
                    "Gelişmiş Veri Yapıları: Sözlükler (Dictionary), Kümeler (Set) ve İki Boyutlu Listeler",
                    "Dosya Yönetimi (Metin ve CSV Dosyalarını Okuma, Yazma ve Güncelleme)",
                    "Hata Yakalama ve İstisna Yönetimi (try, except, finally Blokları)"
                ],
                "Öğrenim Çıktıları": [
                    "Kod tekrarını önlemek için modüler fonksiyonlar yazar ve parametre aktarımını yönetir.",
                    "Veri depolama ve erişim işlemlerinde anahtar-değer (dictionary) mimarisini uygular.",
                    "Verileri harici dosyalara kalıcı olarak kaydeder ve dosya okuma algoritmalarını kurar.",
                    "Çalışma zamanı hatalarını (runtime errors) öngörerek istisna bloklarıyla güvenli kodlama yapar."
                ]
            },
            "2. Tema: Yapay Zekâ ve Veri Bilimine Giriş": {
                "Konular": [
                    "Büyük Veri (Big Data) Kavramı ve Veri Ön İşleme Aşamaları",
                    "Yapay Zekânın Temelleri ve Alt Dalları (Makine Öğrenmesi, Derin Öğrenme)",
                    "Temel Makine Öğrenmesi Yaklaşımları: Denetimli ve Denetimsiz Öğrenme",
                    "Siber Güvenlik Protokolleri, Kriptografi Temelleri ve Yapay Zekâ Etiği"
                ],
                "Öğrenim Çıktıları": [
                    "Büyük veri kümelerini analiz ederek karar destek süreçlerindeki işlevini açıklar.",
                    "Sınıflandırma ve regresyon gibi denetimli öğrenme algoritmalarının mantığını modeller.",
                    "Yapay zekâ sistemlerinin karar alma süreçlerindeki etik ve güvenlik sorumluluklarını tartışır."
                ]
            }
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "1. Tema: Okul Hayatı": {
                "Konular": [
                    "Okul dersleri ve aktiviteleri hakkında konuşur",
                    "'Okul Hayatı' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Okul Hayatı' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Okul Hayatı' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Okul Hayatı' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Okul dersleri ve aktiviteleri hakkında konuşur.",
                    "'Okul Hayatı' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Okul Hayatı' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Okul Hayatı' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Okul Hayatı' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            },
            "2. Tema: Tatil ve Seyahat": {
                "Konular": [
                    "Geçmiş zaman kullanarak tatilini anlatır",
                    "'Tatil ve Seyahat' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Tatil ve Seyahat' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Tatil ve Seyahat' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Tatil ve Seyahat' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Geçmiş zaman kullanarak tatilini anlatır.",
                    "'Tatil ve Seyahat' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Tatil ve Seyahat' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Tatil ve Seyahat' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Tatil ve Seyahat' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        },
        "Seçmeli Bilgisayar Bilimi": {
            "1. Tema: Programlama Dilleri": {
                "Konular": [
                    "Veri yapılarını ve fonksiyonları kullanır",
                    "'Programlama Dilleri' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Programlama Dilleri' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Programlama Dilleri' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Programlama Dilleri' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Veri yapılarını ve fonksiyonları kullanır.",
                    "'Programlama Dilleri' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Programlama Dilleri' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Programlama Dilleri' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Programlama Dilleri' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Yapay Zeka": {
                "Konular": [
                    "Yapay zekanın kullanım alanlarını açıklar",
                    "'Yapay Zeka' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Yapay Zeka' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Yapay Zeka' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Yapay Zeka' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Yapay zekanın kullanım alanlarını açıklar.",
                    "'Yapay Zeka' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Yapay Zeka' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Yapay Zeka' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Yapay Zeka' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        },
        "Seçmeli Astronomi ve Uzay Bilimleri": {
            "1. Tema: Güneş Sistemi": {
                "Konular": [
                    "Gezegenlerin hareketlerini açıklar",
                    "'Güneş Sistemi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Güneş Sistemi' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Güneş Sistemi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Güneş Sistemi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Gezegenlerin hareketlerini açıklar.",
                    "'Güneş Sistemi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Güneş Sistemi' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Güneş Sistemi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Güneş Sistemi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Yıldızların Evrimi": {
                "Konular": [
                    "Yıldızların doğum ve ölüm süreçlerini açıklar",
                    "'Yıldızların Evrimi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Yıldızların Evrimi' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Yıldızların Evrimi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Yıldızların Evrimi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Yıldızların doğum ve ölüm süreçlerini açıklar.",
                    "'Yıldızların Evrimi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Yıldızların Evrimi' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Yıldızların Evrimi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Yıldızların Evrimi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        },
        "Seçmeli Proje Hazırlama": {
            "1. Tema: Veri Toplama ve Analiz": {
                "Konular": [
                    "Araştırma verilerini analiz eder",
                    "'Veri Toplama ve Analiz' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Veri Toplama ve Analiz' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Veri Toplama ve Analiz' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Veri Toplama ve Analiz' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Araştırma verilerini analiz eder.",
                    "'Veri Toplama ve Analiz' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Veri Toplama ve Analiz' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Veri Toplama ve Analiz' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Veri Toplama ve Analiz' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            },
            "2. Tema: Raporlama": {
                "Konular": [
                    "Proje sonuçlarını akademik formatta raporlar",
                    "'Raporlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar",
                    "'Raporlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum",
                    "Öğrendiği bilgileri kullanarak 'Raporlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır",
                    "'Raporlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir"
                ],
                "Öğrenim Çıktıları": [
                    "Proje sonuçlarını akademik formatta raporlar.",
                    "'Raporlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                    "'Raporlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                    "Öğrendiği bilgileri kullanarak 'Raporlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                    "'Raporlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
                ]
            }
        }
    },
    "11. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "1. Tema: Batı Etkisinde Türk Edebiyatı: Tanzimat": {
                "Konular": [
                    "Tanzimat Edebiyatının Oluşumu ve Tarihî Arka Planı",
                    "Tanzimat I. ve II. Dönem Şiirinin Özellikleri, Hak, Adalet, Hürriyet Temaları",
                    "Tanzimat Roman ve Hikâyesi: Yanlış Batılılaşma, Esaret ve Cariyelik",
                    "Tanzimat Tiyatrosu ve Gazetecilik Faaliyetleri",
                    "Dönemin Temsilcileri: Şinasi, Namık Kemal, Ziya Paşa, Recaizade Mahmut Ekrem, Abdülhak Hamit Tarhan"
                ],
                "Öğrenim Çıktıları": [
                    "Tanzimat edebiyatının doğuşunu hazırlayan sosyal, siyasi ve kültürel ortamı metinler üzerinden açıklar.",
                    "Tanzimat I. Dönem sanatçılarının 'toplum için sanat', II. Dönem sanatçılarının 'sanat için sanat' anlayışlarını karşılaştırır.",
                    "Dönemin roman ve tiyatrolarındaki tema, tip/karakter çatışmalarını ve teknik kusurları çözümler.",
                    "Şiirlerde divan edebiyatı nazım şekilleriyle yeni kavramların (vatan, hürriyet, eşitlik) işlenişini tahlil eder."
                ]
            },
            "2. Tema: Servetifünun ve Fecriati Edebiyatı": {
                "Konular": [
                    "Servetifünun (Edebiyat-ı Cedide) Hareketinin Doğuşu ve Sanat Anlayışı",
                    "Servetifünun Şiirinde Ahenk, Parnasizm ve Sembolizm Etkileri, Mensur Şiir",
                    "Halit Ziya Uşaklıgil ve Mehmet Rauf ile Türk Romanında Teknik Olgunluk",
                    "Fecriati Topluluğu ve Edebi Beyannamesi ('Sanat şahsi ve muhteremdir')",
                    "Dönemin Öncüleri: Tevfik Fikret, Cenap Şahabettin, Ahmet Haşim"
                ],
                "Öğrenim Çıktıları": [
                    "Servetifünun şairlerinin dil, aruz vezni, parnasizm ve sembolizm akımlarıyla kurdukları estetik bağı çözümler.",
                    "Servetifünun romanında realizm ve natüralizm ilkelerinin başarıyla uygulanışını ve psikolojik tahlilleri inceler.",
                    "Fecriati topluluğunun Türk edebiyatındaki ilk edebi bildirgeyi yayımlama misyonunu ve Ahmet Haşim'in saf şiir anlayışını kavrar."
                ]
            },
            "3. Tema: Millî Edebiyat": {
                "Konular": [
                    "Genç Kalemler Dergisi ve Ömer Seyfettin'in 'Yeni Lisan' Makalesi",
                    "Dilde Sadeleşme Hareketi ve Millî Mücadele Ruhu",
                    "Millî Edebiyat Dönemi Şiirinde Hece Vezni ve Memleket Sevgisi",
                    "Millî Edebiyat Dönemi Roman ve Hikâyesi (Anadolu Gerçekliği, Kurtuluş Savaşı)",
                    "Önemli Temsilciler: Ömer Seyfettin, Ziya Gökalp, Mehmet Emin Yurdakul, Yakup Kadri Karaosmanoğlu, Halide Edip Adıvar, Reşat Nuri Güntekin"
                ],
                "Öğrenim Çıktıları": [
                    "Yeni Lisan Hareketi'nin Türkçenin yabancı dillerin boyunduruğundan kurtulmasındaki tarihi rolünü kavrar.",
                    "Millî Edebiyat sanatçılarının İstanbul dışına çıkarak Anadolu coğrafyasını ve insanını edebiyata taşıma başarısını tahlil eder.",
                    "Kurtuluş Savaşı'nı konu edinen romanları (Yaban, Ateşten Gömlek vb.) dönemin zihniyetiyle ilişkilendirir."
                ]
            },
            "4. Tema: Öğretici Metinler: Makale, Sohbet, Fıkra ve Eleştiri": {
                "Konular": [
                    "Makale Türü: Bilimsel/Edebi Makale, Tez ve Kanıtlama Yöntemleri",
                    "Fıkra (Köşe Yazısı) ve Sohbet (Söyleşi) Türlerinin Karşılaştırılması",
                    "Eleştiri (Tenkit) Türü: Öznel ve Nesnel Eleştiri İlkeleri",
                    "Önemli Yazarlar ve Metin Analizleri (Ahmet Rasim, Şevket Rado, Nurullah Ataç)"
                ],
                "Öğrenim Çıktıları": [
                    "Öğretici metin türlerini amaç, hedef kitle, dil ve anlatım özellikleri yönünden karşılaştırır.",
                    "Gazete ve dergi çevresinde gelişen metinlerdeki ana fikir, kanıt ve düşünceyi geliştirme yollarını belirler.",
                    "Bir sanat eseri veya toplumsal konu hakkında nesnel ölçütlere dayalı eleştiri metni yazar."
                ]
            },
            "5. Tema: Cumhuriyet Öncesi ve Dönemi Tiyatro": {
                "Konular": [
                    "Tanzimat ve Meşrutiyet Tiyatrosundan Cumhuriyet Tiyatrosuna Geçiş",
                    "Tiyatroda Sahne Dili, Çatışma, Mekân ve Kostüm Tasarımı",
                    "Epik ve Absürt Tiyatronun Temel Özellikleri",
                    "Dönemin Tiyatro Eserlerinin Tahlili"
                ],
                "Öğrenim Çıktıları": [
                    "Geleneksel seyirlik unsurlardan modern sahne düzenine geçişin aşamalarını açıklar.",
                    "Tiyatro metinlerindeki dramatik örgüyü, iç/dış çatışmaları ve karakter tahlillerini yapar.",
                    "Toplumsal dönüşümün ve birey-toplum çatışmasının tiyatro eserlerine yansımasını çözümler."
                ]
            }
        },
        "Matematik": {
            "1. Tema: Trigonometri": {
                "Konular": [
                    "Yönlü Açılar, Açı Ölçü Birimleri (Derece, Radyan) ve Dönüşümleri",
                    "Trigonometrik Fonksiyonlar (Sinüs, Kosinüs, Tanjant, Kotanjant) ve Birim Çember",
                    "Trigonometrik Değerlerin İşaretleri ve İndirgeme Formülleri",
                    "Kosinüs ve Sinüs Teoremleri",
                    "Trigonometrik Fonksiyonların Grafikleri ve Periyot Kavramı",
                    "Ters Trigonometrik Fonksiyonlar (Arcsin, Arccos, Arctan)"
                ],
                "Öğrenim Çıktıları": [
                    "Yönlü açı kavramını birim çember üzerinde açıklar, derece ile radyan arasındaki geçişleri yapar.",
                    "Trigonometrik fonksiyonların birim çemberdeki eksen tanımlarını ve temel özdeşlikleri (sin²x + cos²x = 1 vb.) ispatlar.",
                    "Geniş ve negatif açıların trigonometrik oranlarını dar açı cinsinden indirgeme bağıntılarıyla ifade eder.",
                    "Üçgenlerde kenar ve açılar arasındaki ilişkileri sinüs ve kosinüs teoremleri yardımıyla hesaplar.",
                    "Trigonometrik fonksiyonların periyotlarını bulur, grafiklerini çizer ve ters trigonometrik fonksiyonları tanımlar."
                ]
            },
            "2. Tema: Analitik Geometri": {
                "Konular": [
                    "Doğrunun Analitik İncelenmesi: İki Nokta Arasındaki Uzaklık",
                    "Doğru Parçasını Belli Bir Oranda Bölen Noktanın Koordinatları",
                    "Doğrunun Eğimi ve Eğim Açısı",
                    "Doğru Denklemleri (Eğimi ve Bir Noktası Bilinen, İki Noktası Bilinen Doğru)",
                    "İki Doğrunun Birbirine Göre Konumları (Paralellik, Diklik, Kesişme)",
                    "Noktanın Doğruya Uzaklığı ve Paralel İki Doğru Arasındaki Uzaklık"
                ],
                "Öğrenim Çıktıları": [
                    "Analitik düzlemde iki nokta arasındaki uzaklık formülünü Pisagor bağıntısı üzerinden türetir ve uygular.",
                    "Doğruların eğimlerini doğrultuları üzerinden hesaplar; paralel doğruların eğimlerinin eşit, dik doğruların eğimleri çarpımının -1 olduğunu gösterir.",
                    "Farklı biçimlerde verilen doğru denklemlerini grafiğe dönüştürür, kesişim noktalarını denklem sistemleriyle çözer.",
                    "Bir noktanın bir doğruya ve paralel iki doğru arasındaki en kısa uzaklığı formülle hesaplar."
                ]
            },
            "3. Tema: Fonksiyonlarda Uygulamalar ve Parabol": {
                "Konular": [
                    "Fonksiyonun Eksenleri Kestiği Noktalar, Pozitif ve Negatif Olduğu Aralıklar",
                    "Artan ve Azalan Fonksiyonlar, Ortalama Değişim Hızı",
                    "İkinci Dereceden Bir Değişkenli Fonksiyonlar (Parabol) ve Grafiği",
                    "Parabolün Tepe Noktası (r, k) ve Simetri Ekseni",
                    "Parabol ile Doğrunun Birbirine Göre Durumları",
                    "Fonksiyonların Dönüşümleri (Öteleme, Simetri ve Ölçekleme)"
                ],
                "Öğrenim Çıktıları": [
                    "Fonksiyonların grafiklerini inceleyerek artan-azalan aralıkları ve ortalama değişim hızını hesaplar.",
                    "f(x) = ax² + bx + c fonksiyonunun tepe noktasını, odak ve simetri eksenini belirleyerek grafiğini çizer.",
                    "İkinci dereceden fonksiyonlar ile doğru denklemlerinin ortak çözümünden diskriminant analizini yürütür.",
                    "f(x) fonksiyonundan hareketle f(x)±k, f(x±k), -f(x) ve k.f(x) dönüşüm grafiklerini çizer."
                ]
            },
            "4. Tema: Denklem ve Eşitsizlik Sistemleri": {
                "Konular": [
                    "İkinci Dereceden İki Bilinmeyenli Denklem Sistemlerinin Çözüm Kümeleri",
                    "İkinci Dereceden Bir Bilinmeyenli Eşitsizlikler ve İşaret Tablosu",
                    "Çarpım ve Bölüm Şeklindeki Eşitsizliklerin Çözümü",
                    "İkinci Dereceden Eşitsizlik Sistemleri ve Çözüm Kümelerinin Gösterimi"
                ],
                "Öğrenim Çıktıları": [
                    "İkinci dereceden iki bilinmeyenli denklem sistemlerini yerine koyma veya yok etme yöntemleriyle çözer.",
                    "İkinci dereceden fonksiyonların işaret tablosunu köklerin tek/çift katlı olma durumuna göre oluşturur.",
                    "Rasyonel ifadeler içeren eşitsizliklerin ve eşitsizlik sistemlerinin çözüm kümelerini reel sayılarda belirler."
                ]
            },
            "5. Tema: Çember ve Daire": {
                "Konular": [
                    "Çemberin Temel Elemanları: Kiriş, Teğet, Kesen ve Yay Özellikleri",
                    "Çemberde Açılar: Merkez Açı, Çevre Açı, Teğet-Kiriş Açı, İç ve Dış Açılar",
                    "Kirişler Dörtgeni ve Özellikleri",
                    "Çemberde Teğet Özellikleri ve Çemberin Çevresi",
                    "Dairenin Alanı, Daire Diliminin ve Daire Parçasının Alanı"
                ],
                "Öğrenim Çıktıları": [
                    "Çemberde açı özelliklerini ispatlayarak açı ve yay ölçüsü problemlerini çözer.",
                    "Teğet-kiriş bağıntılarını ve çemberin merkezinden kirişe indirilen dikmenin kirişi ortaladığını kavrar.",
                    "Dairenin alan formülünden yararlanarak dairesel halka ve karmaşık daire dilimi alanlarını hesaplar."
                ]
            },
            "6. Tema: Uzay Geometri ve Katı Cisimler": {
                "Konular": [
                    "Dik Prizmaların ve Dik Piramitlerin Alan ve Hacim Bağıntıları",
                    "Dik Dairesel Silindirin ve Dik Dairesel Koninin Alan ve Hacmi",
                    "Kürenin Yüzey Alanı ve Hacim Hesaplamaları",
                    "Katı Cisimlerin Düzlemlerle Arakesitleri"
                ],
                "Öğrenim Çıktıları": [
                    "Prizma, piramit, koni, silindir ve kürenin yüzey alanı ve hacim formüllerini geometrik problemler üzerinde uygular.",
                    "Üç boyutlu katı cisimlerin farklı açılardan arakesit alanlarını ve döndürme ile oluşan cisimleri hesaplar."
                ]
            },
            "7. Tema: Olasılık": {
                "Konular": [
                    "Koşullu Olasılık Bağıntısı ve Bağımsız Olaylar",
                    "Bileşik Olayların Olasılığı ve Ağaç Şeması",
                    "Deneysel Olasılık ile Teorik Olasılık Arasındaki İlişki"
                ],
                "Öğrenim Çıktıları": [
                    "Bir olayın gerçekleşme olasılığını başka bir olayın gerçekleşmiş olması şartına bağlayarak koşullu olasılık formülünü uygular.",
                    "Bağımsız olayların gerçekleşme olasılığını çarpım kuralıyla hesaplar.",
                    "Deneysel veriler üzerinden hesaplanan olasılığın deneme sayısı arttıkça teorik olasılığa yaklaştığını açıklar."
                ]
            }
        },
        "Fizik": {
            "1. Tema: Vektörler, Bağıl Hareket ve Newton'ın Hareket Yasaları": {
                "Konular": [
                    "İki ve Üç Boyutlu Kartezyen Koordinat Sisteminde Vektörler",
                    "Vektörlerin Bileşenlerine Ayrılması ve Analitik Toplama Yöntemi",
                    "Bir ve İki Boyutta Bağıl Hareket (Nehir Problemleri, Bileşik Hareket)",
                    "Newton'ın İkinci Yasası Uygulamaları: Eğik Düzlem, Makaralı Sistemler ve Üst Üste Cisimler",
                    "Statik ve Kinetik Sürtünme Katsayıları ile Hareket Denklemleri"
                ],
                "Öğrenim Çıktıları": [
                    "Vektörleri bileşenlerine ayırarak analitik yöntemle bileşke vektörü hesaplar.",
                    "Farklı referans sistemlerindeki gözlemcilerin birbirine göre bağıl hız vektörlerini ve nehirde hareket problemlerini çözer.",
                    "Sürtünmeli ve eğik düzlemlerde serbest cisim diyagramı çizerek ivme ve ip gerilme kuvvetlerini hesaplar."
                ]
            },
            "2. Tema: Bir ve İki Boyutta Sabit İvmeli Hareket": {
                "Konular": [
                    "Bir Boyutta Sabit İvmeli Hareket Denklemleri ve Grafikleri",
                    "Serbest Düşme, Düşey Doğrultuda Atış Hareketleri (Aşağı ve Yukarı Atış)",
                    "Limit Hız Kavramı ve Havanın Direnç Kuvveti",
                    "İki Boyutta Sabit İvmeli Hareket: Yatay Atış ve Eğik Atış Hareketi",
                    "Atış Hareketlerinde Uçuş Süresi, Maksimum Yükseklik ve Menzil Hesapları"
                ],
                "Öğrenim Çıktıları": [
                    "Sabit ivmeli hareketin konum-zaman, hız-zaman ve ivme-zaman grafiklerini çizerek alan ve eğim ilişkilerini çözümler.",
                    "Yer çekimi ivmesi altında hareket eden cisimlerin düşey doğrultudaki atış hareketlerini formüle eder.",
                    "Yatay ve eğik atış hareketini yatayda sabit hızlı, düşeyde serbest düşme hareketi olarak bileşenlerine ayırarak analiz eder."
                ]
            },
            "3. Tema: İş, Enerji, Güç ve İtme-Momentum": {
                "Konular": [
                    "Değişken Kuvvetin Yaptığı İş ve Kuvvet-Yol Grafiği",
                    "Mekanik Enerjinin Korunumu ve Sürtünmeli Sistemlerde Enerji Kaybı",
                    "İtme (Impulse) Kavramı ve Çizgisel Momentum Değişimi Arasındaki İlişki (I = ΔP)",
                    "Çizgisel Momentumun Korunumu İlkesi",
                    "Bir ve İki Boyutta Çarpışmalar (Esnek ve Esnek Olmayan Çarpışmalar, Patlamalar)"
                ],
                "Öğrenim Çıktıları": [
                    "Kuvvet-yol grafiğinin altındaki alanı iş ve kinetik enerji değişimi ile ilişkilendirir.",
                    "Cisme uygulanan itmenin momentum değişimine eşit olduğunu deneylerle ve matematiksel bağıntılarla doğrular.",
                    "Sürtünmesiz ortamlarda esnek ve tam esnek olmayan çarpışmalarda momentum ve kinetik enerji korunumunu hesaplar."
                ]
            },
            "4. Tema: Tork, Denge ve Basit Makineler": {
                "Konular": [
                    "Tork (Kuvvet Momenti) Tanımı, Vektörel Çarpım ve Sağ El Kuralı",
                    "Cisimlerin Denge Şartları (Toplam Kuvvet = 0, Toplam Tork = 0)",
                    "Kütle Merkezi ve Ağırlık Merkezi Kavramları, Homojen/Heterojen Cisimler",
                    "Basit Makineler: Kaldıraç, Çıkrık, Palanga, Eğik Düzlem, Vida, Dişli Çark ve Kasnaklarda Verim"
                ],
                "Öğrenim Çıktıları": [
                    "Torkun büyüklüğünü ve dönme yönünü sağ el kuralıyla tayin eder.",
                    "Dengedeki bir cisim üzerinde etki eden kuvvetlerin ve torkların sıfıra eşitliği ilkelerini problemlere uygular.",
                    "Karmaşık geometrik şekilli levhaların ve tel sistemlerinin kütle merkezini hesaplar.",
                    "Basit makinelerden oluşan düzeneklerde kuvvet kazancı ve mekanik verim yüzdesini hesaplar."
                ]
            },
            "5. Tema: Elektrik ve Manyetizma": {
                "Konular": [
                    "Noktasal Yükler Arasında Coulomb Kuvveti ve Elektriksel Alan (E = k.q/d²)",
                    "Elektriksel Potansiyel Enerji, Potansiyel (V) ve İki Nokta Arasındaki Potansiyel Farkı",
                    "Düzgün Elektrik Alan, Yüklü Paralel Levhalar ve Parçacık Dinamiği",
                    "Sığa (Kapasite) ve Kondansatörlerin Enerjisi",
                    "Akım Geçen Tel, Halka ve Selenoidin Manyetik Alanı",
                    "Manyetik Kuvvet (Tele ve Yüklü Parçacığa Etki Eden Kuvvet, Lorentz Kuvveti)",
                    "Manyetik Akı, Faraday ve Lenz İndüksiyon Kanunları, Öz İndüksiyon Akımı",
                    "Alternatif Akım (AC) Prensipleri, RLC Devreleri, Empedans ve Rezonans",
                    "Transformatörler: İdeal ve Gerçek Transformatörlerde Gerilim-Akım Oranları"
                ],
                "Öğrenim Çıktıları": [
                    "Noktasal elektrik yüklerinin oluşturduğu kuvvet, elektrik alan ve elektriksel potansiyel büyüklüklerini hesaplar.",
                    "Yüklü paralel levhalar arasında hareket eden yüklü taneciklerin ivmesini, sapma miktarını ve yapılan elektriksel işi açıklar.",
                    "Manyetik alan içindeki akım taşıyan tele ve hareketli yüke etki eden kuvvetin yönünü sağ el kuralıyla bulur.",
                    "Manyetik akı değişiminin indüksiyon emk'sı oluşturduğunu Faraday ve Lenz yasaları üzerinden matematiksel olarak modeller.",
                    "Alternatif akımın özelliklerini doğru akımla karşılaştırır; transformatörlerin elektrik enerjisinin taşınmasındaki rolünü kavrar."
                ]
            }
        },
        "Kimya": {
            "1. Tema: Modern Atom Teorisi": {
                "Konular": [
                    "Bohr Atom Modelinin Sınırları ve Kuantum Mekaniğine Giriş",
                    "Dalga-Parçacık İkiliği (De Broglie) ve Heisenberg Belirsizlik İlkesi",
                    "Schrödinger Dalga Denklemi, Kuantum Sayıları (n, l, ml, ms) ve Orbital Türleri (s, p, d, f)",
                    "Çok Elektronlu Atomlarda Elektron Dizilimleri (Aufbau, Pauli İlkesi, Hund Kuralı)",
                    "Uyarılmış Atom, Küresel Simetri ve İzoelektronik Tanecikler",
                    "Periyodik Sistem ve Periyodik Özelliklerin Değişimi (Yarıçap, İyonlaşma Enerjisi, Elektron İlgisi, Elektronegatiflik, Oksitlerin Asitlik/Bazlığı)",
                    "Elementlerin Yükseltgenme Basamakları"
                ],
                "Öğrenim Çıktıları": [
                    "Elektronların kuantum sayılarını belirler, orbitallerin enerji seviyelerini Aufbau kuralına göre sıralar.",
                    "Elementlerin elektron dizilimlerini yazarak küresel simetri ve uyarılma durumlarını ayırt eder.",
                    "Periyodik cetvelde grup ve periyot boyunca atomik özelliklerin periyodik değişim grafiklerini çözümler.",
                    "Bileşiklerdeki element atomlarının yükseltgenme basamaklarını kurallara uygun hesaplar."
                ]
            },
            "2. Tema: Gazlar": {
                "Konular": [
                    "Gazların Genel Özellikleri ve Kinetik Teori Varsayımları",
                    "Gaz Yasaları: Boyle, Charles, Gay-Lussac ve Avogadro Yasaları",
                    "İdeal Gaz Denklemi (P.V = n.R.T) ve İdeal Gaz Sabiti",
                    "Gaz Karışımları, Dalton Kısmi Basınçlar Yasası ve Mol Kesri",
                    "Gazlarda Difüzyon ve Efüzyon (Graham Difüzyon Yasası)",
                    "Gerçek Gazlar, İdeallikten Sapma, Van der Waals Denklemi, Kritik Sıcaklık ve Joule-Thomson Olayı"
                ],
                "Öğrenim Çıktıları": [
                    "Gaz yasalarını deney grafikleri üzerinden modeller ve ideal gaz denklemine ulaşır.",
                    "Kısmi basınç ve mol kesri kavramlarını kullanarak gaz karışımlarının basınç hesaplamalarını yapar.",
                    "Graham difüzyon yasasını gazların mol kütleleri ve sıcaklıkları üzerinden formüle eder.",
                    "Joule-Thomson olayı ile soğutma sistemlerinin (buzdolabı, klima) çalışma prensibini ilişkilendirir."
                ]
            },
            "3. Tema: Sıvı Çözeltiler ve Çözünürlük": {
                "Konular": [
                    "Çözünme Süreci ve Çözücü-Çözünen Etkileşimleri (Hidratasyon ve Solvatasyon)",
                    "Derişim Birimleri: Molarite, Molalite, Mol Kesri, Kütlece ve Hacimce Yüzde, ppm",
                    "Çözelti Hazırlama, Seyreltme ve Çözeltilerin Karıştırılması",
                    "Koligatif Özellikler: Buhar Basıncı Düşmesi (Raoult Yasası), Kaynama Noktası Yükselmesi (Ebülliyoskopi), Donma Noktası Alçalması (Kriyoskopi) ve Osmoz",
                    "Çözünürlük Kavramı, Doymuş, Doymamış ve Aşırı Doymuş Çözeltiler",
                    "Çözünürlüğe Etki Eden Faktörler: Sıcaklık (Endotermik/Ekzotermik), Basınç (Henry Yasası), Ortak İyon Etkisi"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı derişim birimlerini birbirine dönüştürür ve laboratuvar koşullarında istenen derişimde çözelti hazırlar.",
                    "Çözeltilerin donma noktası alçalması ve kaynama noktası yükselmesini tanecik sayısı (van't Hoff faktörü) üzerinden hesaplar.",
                    "Çözünürlük-sıcaklık grafiklerini okuyarak çökelme ve kristallenme problemlerini çözer."
                ]
            },
            "4. Tema: Kimyasal Tepkimelerde Enerji": {
                "Konular": [
                    "Tepkime Isısı ve Entalpi Değişimi (ΔH), Endotermik ve Ekzotermik Tepkimeler",
                    "Potansiyel Enerji - Tepkime Koordinatı Grafikleri",
                    "Standart Oluşum Entalpisi (Molar Oluşum Entalpisi) ve Tepkime Entalpisi Hesabı",
                    "Bağ Enerjileri ve Kırılan-Oluşan Bağ Enerjilerinden Entalpi Hesabı",
                    "Hess Yasası (Tepkime Isılarının Toplanabilirliği İlkesi)"
                ],
                "Öğrenim Çıktıları": [
                    "Kimyasal tepkimeleri entalpi işaretine (ΔH > 0 veya ΔH < 0) göre sınıflandırır.",
                    "Standart oluşum entalpileri tablosunu kullanarak tepkimelerin entalpi değişimlerini hesaplar.",
                    "Hess yasasını uygulayarak basamaklı tepkimelerin ara adımlarından net tepkime entalpisini türetir."
                ]
            },
            "5. Tema: Kimyasal Tepkimelerde Hız ve Denge": {
                "Konular": [
                    "Kimyasal Tepkime Hızının Tanımı ve Madde Miktarındaki Değişimle Ölçülmesi",
                    "Çarpışma Teorisi, Etkin Çarpışma ve Aktifleşmiş Kompleks",
                    "Tepkime Hızına Etki Eden Faktörler: Madde Cinsi, Derişim, Sıcaklık, Katalizör ve Temas Yüzeyi",
                    "Basamaklı (Mekanizmalı) Tepkimelerde Hız Bağıntısı ve Hızı Belirleyen Yavaş Adım",
                    "Kimyasal Denge Kavramı, İleri ve Geri Tepkime Hızları Eşitliği",
                    "Denge Bağıntısı (Kc ve Kp) ve Aralarındaki Bağıntı (Kp = Kc.(RT)^Δn)",
                    "Dengeye Etki Eden Faktörler: Le Chatelier İlkesi (Derişim, Hacim/Basınç, Sıcaklık Değişimi)",
                    "Suda Çözünme-Çökelme Dengeleri (Çözünürlük Çarpımı Kçç) ve Ortak İyonun Çözünürlüğe Etkisi"
                ],
                "Öğrenim Çıktıları": [
                    "Deneysel verilerden yararlanarak tepkimenin hız bağıntısını, mertebesini (derecesini) ve hız sabitinin (k) birimini bulur.",
                    "Kimyasal denge koşullarını açıklar ve denge sabiti hesaplamalarını yürütür.",
                    "Le Chatelier ilkesine göre denge sistemine yapılan dış müdahalelerin dengenin yönüne etkisini grafiklerle yorumlar.",
                    "Az çözünen tuzların çözünürlük çarpımını (Kçç) hesaplar ve çökelme şartlarını belirler."
                ]
            }
        },
        "Biyoloji": {
            "1. Tema: İnsan Fizyolojisi": {
                "Konular": [
                    "Denetleyici ve Düzenleyici Sistem: Nöronun Yapısı, İmpuls İletimi (Polarizasyon, Depolarizasyon, Repolarizasyon), Sinapslarda İletim ve Nörotransmitterler",
                    "Merkezi Sinir Sistemi (Beyin ve Omurilik) ile Çevresel Sinir Sistemi (Somatik ve Otonom Sinir Sistemi)",
                    "Duyu Organları: Göz, Kulak (İşitme ve Denge), Burun, Dil, Deri Yapısı ve Mekanoreseptörler/Fotoreseptörler",
                    "Endokrin Sistem: Hipofiz, Tiroit, Paratiroit, Böbrek Üstü Bezleri, Pankreas ve Eşeysel Bezlerin Hormonları ve Geri Bildirim (Feedback)",
                    "Destek ve Hareket Sistemi: Kemik ve Kıkırdak Dokusu, Eklemler, Çizgili Kaslarda Kasılma Mekanizması (Huxley Kayan İplikler Modeli)",
                    "Sindirim Sistemi: Sindirim Kanalı Organları, Mekanik/Kimyasal Sindirim, Sindirim Enzimleri, Karaciğer ve Pankreasın Rolü, Emilim",
                    "Dolaşım Sistemi: Kalbin Çalışması (Sistol-Diyastol), Damarlar, Kan Dokusu, Lenf Dolaşımı ve Bağışıklık Çeşitleri (Özgül ve Özgül Olmayan)",
                    "Solunum Sistemi: Solunum Organları, Alveollerde Gaz Değişimi, Oksijen ve Karbondioksitin Kanda Taşınma Mekanizmaları",
                    "Üriner (Boşaltım) Sistem: Böbreğin Anatomik Yapısı, Nefronlarda İdrar Oluşumu (Süzülme, Geri Emilim, Salgılama) ve Homeostazi",
                    "Üreme Sistemi ve Embriyonik Gelişim: Dişi ve Erkek Üreme Organları, Gametogenez, Menstrüal Döngü, Döllenme ve Embriyo Gelişim Aşamaları"
                ],
                "Öğrenim Çıktıları": [
                    "Sinir hücresinde elektrokimyasal impuls iletimini ve sinapslardaki kimyasal iletim basamaklarını karşılaştırır.",
                    "Hormonların hedef hücre üzerindeki etkilerini ve feedback mekanizmasıyla homeostazinin sağlanışını modeller.",
                    "Çizgili kasın kasılma ve gevşeme evrelerinde sarkomer boyundaki ve bantlaşmadaki (A, I, H bantları) değişimleri inceler.",
                    "Besin monomerlerinin sindirim ürünlerinin kılcal kan damarları ve lenf sistemi yoluyla kalbe taşınma rotasını açıklar.",
                    "Akciğer ve doku kılcallarında hemoglobinin oksijen ve karbondioksit bağlama/bırakma reaksiyonlarını denklemlerle gösterir.",
                    "Nefronlarda gerçekleşen süzülme ve geri emilim olaylarını ozmotik basınç ve aktif taşıma ilkeleriyle çözümler."
                ]
            },
            "2. Tema: Komünite ve Popülasyon Ekolojisi": {
                "Konular": [
                    "Komünitenin Yapısı, Ekolojik Niş, Tür İçi ve Türler Arası Rekabet",
                    "Simbiyotik İlişkiler: Mutualizm, Kommensalizm, Parazitizm",
                    "Süksesyon (Ekolojik Süksesyon): Birincil ve İkincil Süksesyon Evreleri",
                    "Popülasyon Dinamiği: Popülasyon Yoğunluğu, Dağılım Modelleri (Kümeli, Düzenli, Rastgele)",
                    "Popülasyon Büyüme Modelleri: Üstel Büyüme (J Tipi) ve Lojistik Büyüme (S Tipi)",
                    "Taşıma Kapasitesi ve Çevre Direnci",
                    "Popülasyonların Yaş Dağılım Piramitleri"
                ],
                "Öğrenim Çıktıları": [
                    "Komünitelerdeki tür çeşitliliğini etkileyen coğrafi ve ekolojik faktörleri analiz eder.",
                    "Birlikte yaşayan canlılar arasındaki simbiyotik ilişkilerin her iki tarafa sağladığı fayda/zarar dengesini modeller.",
                    "Popülasyon büyüme eğrilerini çevre direnci ve taşıma kapasitesi sınırları dahilinde matematiksel olarak açıklar."
                ]
            }
        },
        "Tarih": {
            "1. Tema: Değişen Dünya Dengeleri Karşısında Osmanlı Siyaseti (1595-1774)": {
                "Konular": [
                    "17. Yüzyılda Osmanlı Devleti'nin Jeopolitik Durumu ve Sınırları",
                    "Osmanlı-Avusturya Savaşları ve Zitvatorok Antlaşması (1606) ile Mütekabiliyet İlkesi",
                    "Osmanlı-Safevi (İran) Savaşları ve Kasr-ı Şirin Antlaşması (1639)",
                    "Girit'in Fethi ve Denizlerdeki Son Başarılar",
                    "II. Viyana Kuşatması (1683), Kutsal İttifak Savaşları ve Karlofça Antlaşması (1699)",
                    "18. Yüzyılda Kaybedilen Toprakları Geri Alma Çabaları: Prut, Pasarofça ve Belgrad Antlaşmaları",
                    "Küçük Kaynarca Antlaşması (1774) ve Kırım'ın Bağımsızlığı"
                ],
                "Öğrenim Çıktıları": [
                    "Zitvatorok Antlaşması ile Osmanlı'nın diplomatik üstünlüğünün eşitlik (mütekabiliyet) ilkesine dönüştüğünü değerlendirir.",
                    "Karlofça Antlaşması'nın Osmanlı Devleti'nin Orta Avrupa hâkimiyetini sona erdiren ve gerileme dönemini başlatan etkilerini analiz eder.",
                    "Küçük Kaynarca Antlaşması ile Rusya'ya tanınan kapitülasyonların ve Ortodoksları himaye hakkının yarattığı tehditleri kavrar."
                ]
            },
            "2. Tema: Değişim Çağında Avrupa ve Osmanlı": {
                "Konular": [
                    "Rönesans ve Reformun Avrupa Düşüncesine Etkileri (Rasyonalizm ve Sekülerleşme)",
                    "Merkantilizm ve Coğrafi Keşiflerin Osmanlı Ekonomisine Olumsuz Yansımaları (Akçenin Değer Kaybı/Enflasyon)",
                    "17. Yüzyıl Osmanlı İç İsyanları: Celali İsyanları, Yeniçeri İsyanları ve Suhte İsyanları",
                    "Lale Devri (1718-1730): Batı Tarzı İlk Islahatlar, İbrahim Müteferrika ve İlk Türk Matbaası",
                    "18. Yüzyıl Islahatçı Padişahları (I. Mahmud, III. Mustafa, I. Abdülhamid, III. Selim) ve Nizam-ı Cedit Hareketi"
                ],
                "Öğrenim Çıktıları": [
                    "Avrupa'da yaşanan bilimsel ve askeri devrimin Osmanlı klasik kurumları üzerindeki dönüştürücü baskısını açıklar.",
                    "Celali ve Merkez isyanlarının toplumsal düzeni, üretimi ve asayişi sarsan dinamiklerini inceler.",
                    "Lale Devri ile başlayan Avrupa'yı örnek alma sürecinin kültürel ve kurumsal boyutlarını değerlendirir."
                ]
            },
            "3. Tema: Uluslararası İlişkilerde Denge Stratejisi (1774-1914)": {
                "Konular": [
                    "Fransız İhtilali (1789) ve Yaydığı Fikirler (Milliyetçilik, Eşitlik, Hürriyet)",
                    "Osmanlı Devleti'nin Dağılmayı Önleme Stratejisi: Denge Politikası",
                    "Sırp ve Yunan İsyanları, Navarin Olayı",
                    "Mehmet Ali Paşa İsyanı ve Boğazlar Sorununun Ortaya Çıkışı (Hünkâr İskelesi, Londra Boğazlar Sözleşmesi)",
                    "Kırım Savaşı (1853-1856) ve Paris Barış Antlaşması (Osmanlı'nın Avrupalı Devlet Sayılması)",
                    "93 Harbi (1877-1878 Osmanlı-Rus Savaşı) ve Berlin Antlaşması (Sırbistan, Karadağ, Romanya'nın Bağımsızlığı)"
                ],
                "Öğrenim Çıktıları": [
                    "Milliyetçilik akımının Osmanlı'nın çok uluslu yapısında tetiklediği Balkan isyanlarını analiz eder.",
                    "Büyük güçlerin (İngiltere, Rusya, Fransa) 'Şark Meselesi' kapsamındaki Osmanlı topraklarını paylaşma politikalarını değerlendirir.",
                    "Berlin Antlaşması ile Osmanlı Devleti'nin İngiltere yanlısı dış politikadan Almanya ile yakınlaşmaya geçiş sürecini kavrar."
                ]
            },
            "4. Tema: Devrimler Çağında Değişen Devlet-Toplum İlişkileri": {
                "Konular": [
                    "Sanayi Devrimi ve Modern İdeolojiler (Liberalizm, Sosyalizm, Milliyetçilik)",
                    "Sened-i İttifak (1808) ile Padişahın Yetkilerinin İlk Kez Kısıtlanması",
                    "II. Mahmud Dönemi Yenilikleri (Yeniçeri Ocağının Kaldırılması - Vaka-i Hayriye, Muhtarlıklar, Posta Teşkilatı)",
                    "Tanzimat Fermanı (1839) ve Islahat Fermanı (1856): Kanun Üstünlüğü ve Gayrimüslim Hakları",
                    "I. Meşrutiyet (1876), Kanun-ı Esasi ve Mebusan Meclisi'nin Açılışı",
                    "II. Abdülhamid Dönemi ve İslamcılık (Panislamizm) Siyaseti",
                    "II. Meşrutiyet (1908), 31 Mart Vakası (1909) ve Kanun-ı Esasi Değişiklikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Tanzimat Fermanı ile can, mal ve namus güvenliğinin devlet garantisine alınarak hukuk devleti adımının atılışını inceler.",
                    "Kanun-ı Esasi ile Türk tarihinde ilk kez anayasal parlamenter sisteme geçişi değerlendirir.",
                    "Osmanlı'yı dağılmaktan kurtarmak için öne sürülen fikir akımlarını (Osmanlıcılık, İslamcılık, Türkçülük, Batıcılık) karşılaştırır."
                ]
            },
            "5. Tema: Sermaye ve Emek & XIX ve XX. Yüzyılda Değişen Gündelik Hayat": {
                "Konular": [
                    "Sanayileşme ile El Emeğinden Fabrika Üretimine Geçiş",
                    "Osmanlı Baltalimanı Ticaret Sözleşmesi (1838) ve Yerli Sanayinin Çöküşü",
                    "Osmanlı Dış Borçlanması ve Düyun-ı Umumiye İdaresinin Kurulması (1881)",
                    "Hicaz Demiryolu ve Telgraf Hatları ile Ulaşım-Haberleşme Ağı",
                    "Modern Şehirleşme, Nüfus Hareketleri, Göçler ve Kamuoyu Olgusu"
                ],
                "Öğrenim Çıktıları": [
                    "Baltalimanı Antlaşması'nın Osmanlı pazarını Avrupa'nın açık sömürgesi hâline getiren ekonomik sonuçlarını tahlil eder.",
                    "Düyun-ı Umumiye İdaresi ile Osmanlı maliyesinin bağımsızlığını kaybetme sürecini kavrar.",
                    "Balkanlar ve Kafkaslar'dan Anadolu'ya yönelen kitlesel göçlerin demografik ve kültürel etkilerini değerlendirir."
                ]
            }
        },
        "Coğrafya": {
            "1. Tema: Doğal Sistemler: Biyoçeşitlilik ve Ekosistemler": {
                "Konular": [
                    "Biyoçeşitlilik Kavramı ve Yeryüzünde Biyoçeşitliliğin Dağılışını Etkileyen Faktörler (Fiziki, Paleocoğrafya, Biyolojik)",
                    "Karasal Biyomlar (Tropikal Yağmur Ormanları, Savan, Çöl, Tayga, Tundra) ve Sucul Biyomlar (Tatlı ve Tuzlu Su Biyomları)",
                    "Ekosistemlerin Unsurları ve Madde Döngüleri (Karbon, Su, Oksijen, Azot)",
                    "Enerji Akışı ve Besin Zinciri",
                    "Ramsar Sözleşmesi ve Sulak Alanların Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "Biyoçeşitliliğin küresel ölçekteki dağılışını iklim ve yer şekilleri faktörleriyle ilişkilendirir.",
                    "Madde döngülerinde karbon salınımı ve tutulum dengesini bozan insan faaliyetlerini sorgular.",
                    "Sulak alanların korunması ve ekosistem dengesinin sürdürülebilirliği için çevre politikaları önerir."
                ]
            },
            "2. Tema: Beşerî Sistemler: Nüfus Politikaları ve Şehirler": {
                "Konular": [
                    "Ülkelerin Nüfus Politikaları (Nüfus Artış Hızını Azaltıcı, Artırıcı ve Niteliğini İyileştirici Politikalar)",
                    "Türkiye'nin Geçmişten Günümüze Nüfus Politikaları ve Gelecek Projeksiyonları",
                    "Şehirlerin Fonksiyonel Gelişimi ve Küresel Etki Alanları (New York, Tokyo, Londra, Paris, Mekke vb.)",
                    "Türkiye'de Şehirlerin Fonksiyonları ve Kır-Kent Nüfus Dinamikleri"
                ],
                "Öğrenim Çıktıları": [
                    "Farklı gelişmişlik düzeyindeki ülkelerin uyguladıkları nüfus politikalarının gerekçelerini ve sonuçlarını karşılaştırır.",
                    "Şehirleri idari, dini, askeri, sanayi ve turizm fonksiyonlarına göre küresel, bölgesel ve yerel etki alanlarına ayırır.",
                    "Türkiye'de iç göçün yönünü ve mekânsal planlama gereksinimlerini açıklar."
                ]
            },
            "3. Tema: Türkiye'nin Ekonomik Coğrafyası": {
                "Konular": [
                    "Türkiye Ekonomisinin Sektörel Dağılımı ve Ekonomi Politikalarının Tarihsel Süreci",
                    "Türkiye'de Tarım: Tarımı Etkileyen Faktörler (Sulama, Gübreleme, Tohum Islahı, Makineleşme) ve Tarım Ürünleri",
                    "Türkiye'de Hayvancılık Faaliyetleri (Büyükbaş, Küçükbaş, Kümes, İpek Böcekçiliği, Arıcılık)",
                    "Türkiye'nin Madenleri (Demir, Bakır, Boksit, Krom, Bor vb.) ve Enerji Kaynakları (Taş Kömürü, Linyit, Petrol, Doğal Gaz, Hidroelektrik, Jeotermal, Rüzgâr, Güneş)",
                    "Türkiye'de Sanayinin Dağılışını Etkileyen Faktörler (Hammadde, Enerji, Ulaşım, Pazar) ve Başlıca Sanayi Kolları"
                ],
                "Öğrenim Çıktıları": [
                    "Türkiye'de uygulanan ekonomi politikalarının kalkınma hamlelerindeki yerini tarihsel olarak inceler.",
                    "Türkiye'de yetiştirilen başlıca tarım ürünlerinin iklim ve toprak şartlarıyla coğrafi dağılışını haritalandırır.",
                    "Türkiye'nin maden ve enerji potansiyelini yenilenebilir enerji dönüşümü bağlamında değerlendirir.",
                    "Sanayi tesislerinin yer seçiminde hammaddeye yakınlık ve ulaşım ağının belirleyiciliğini örneklerle çözümler."
                ]
            },
            "4. Tema: Türkiye'nin Bölgesel Kalkınma Projeleri ve Jeopolitiği": {
                "Konular": [
                    "Bölgesel Kalkınma Projelerinin Amaçları",
                    "Güneydoğu Anadolu Projesi (GAP), Doğu Anadolu Projesi (DAP), Doğu Karadeniz Projesi (DOKAP), Konya Ovası Projesi (KOP), Yeşilırmak Havzası ve ZBK Projeleri",
                    "Türkiye'nin Jeopolitik Konumu ve Stratejik Önemi (Boğazlar, Enerji Koridoru Olma Rolü)"
                ],
                "Öğrenim Çıktıları": [
                    "Bölgesel kalkınma projelerinin tarımsal verimlilik, sanayi, istihdam ve göçü önleme üzerindeki etkilerini karşılaştırır.",
                    "Türkiye'nin Avrasya ve Orta Doğu enerji nakil hatlarındaki (TANAP, TürkAkım) merkezî jeopolitik gücünü analiz eder."
                ]
            },
            "5. Tema: Küresel Ortam: Bölgeler ve Ülkeler": {
                "Konular": [
                    "İlk Medeniyet Merkezlerinin Doğuşu ve Coğrafi Özellikleri (Mezopotamya, Mısır, Hint, Çin, Maya, İnka)",
                    "Kültür Bölgeleri ve Türk Kültürünün Yayılış Alanları",
                    "Küresel Ticaretin Merkezleri ve Ticaret Ağları (Hammadde, Üretim ve Tüketim Bölgeleri)",
                    "Dünya Turizm Faaliyetleri ve Kültürel Etkileşim"
                ],
                "Öğrenim Çıktıları": [
                    "Medeniyetlerin akarsu boyları ve verimli ovalarda kurulma gerekçelerini coğrafi şartlarla açıklar.",
                    "Türk kültürünün maddi ve manevi ögelerinin Orta Asya'dan Balkanlar'a kadar uzanan coğrafi izlerini inceler.",
                    "Dünya ticaretinde hammadde üreten bölgeler ile sanayi üretim merkezleri arasındaki taşımacılık güzergâhlarını çözümler."
                ]
            },
            "6. Tema: Çevre ve Toplum": {
                "Konular": [
                    "Doğal Kaynakların Bilinçsiz Kullanımı ve Çevre Sorunları (Toprak Erozyonu, Çölleşme, Asit Yağmurları)",
                    "Maden ve Enerji Üretiminin Çevreye Etkileri",
                    "Katı, Sıvı ve Gaz Atıklar, Geri Dönüşüm Stratejileri",
                    "Uluslararası Çevre Sözleşmeleri ve Doğal Sit Alanlarının Korunması"
                ],
                "Öğrenim Çıktıları": [
                    "Doğal kaynakların aşırı tüketiminin yarattığı küresel ekolojik krizleri ve çölleşme tehdidini sorgular.",
                    "Sıfır atık ve geri dönüşüm uygulamalarının kaynak tasarrufundaki ekonomik ve çevresel rolünü değerlendirir."
                ]
            }
        },
        "Felsefe": {
            "1. Tema: MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi (İlk Çağ Felsefesi)": {
                "Konular": [
                    "Felsefenin Doğuşu: Milet Okulu ve Doğa Filozofları (Thales, Anaksimandros, Anaksimenes)",
                    "İlk Neden (Arkhe) Problemi: Herakleitos, Parmenides, Demokritos, Empedokles",
                    "İnsan Üzerine Felsefe: Sofistler (Gorgias, Protagoras) ve Sokrates (Sokratik Yöntem, Erdem-Bilgi Özdeşliği)",
                    "Sistematik Felsefe: Platon (İdealar Kuramı, Mağara Alegorisi, İdeal Devlet)",
                    "Aristoteles: Dört Neden Kuramı (Maddi, Formel, Fail, Ereksel Neden) ve 'Altın Orta' Ahlakı"
                ],
                "Öğrenim Çıktıları": [
                    "Antik Yunan doğa filozoflarının evrenin ilk maddesi (arkhe) arayışındaki felsefi gerekçeleri karşılaştırır.",
                    "Sofistlerin görelilik (rölativizm) anlayışı ile Sokrates'in ahlaki nesnellik savunusu arasındaki çatışmayı tahlil eder.",
                    "Platon'un idealar dünyası ile görünüşler dünyası ayrımını bilgi ve varlık felsefesi bağlamında çözümler.",
                    "Aristoteles'in varlığın oluşumunu açıklayan dört neden kuramını ve aşırılıklardan uzak durmayı öğütleyen altın orta erdemini kavrar."
                ]
            },
            "2. Tema: MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi (Orta Çağ Felsefesi)": {
                "Konular": [
                    "Dönemin Karakteristik Özellikleri: İnancın Akılla Temellendirilmesi",
                    "Hristiyan Felsefesi: Patristik Dönem (Augustinus) ve Skolastik Dönem (Aquinaslı Thomas)",
                    "Hristiyan Felsefesinde Temel Problemler: Kötülük Problemi, Ruhun Ölümsüzlüğü, Tümeller Tartışması (Kavram Realizmi, Adcılık/Nominalizm, Kavramcılık/Konseptüalizm)",
                    "İslam Felsefesi: Doğuşu, Çeviri Faaliyetleri ve Beytü'l-Hikme",
                    "İslam Felsefesinde Temel Problemler: Yaratıcı'nın Varlığını Kanıtlama (Hudûs, İmkân, İnayet Delilleri), Akıl-İnanç İlişkisi",
                    "Önemli İslam Filozofları: Kindi, Farabi (Erdemli Şehir), İbn Sina (Zorunlu Varlık/Vacibü'l-Vücud), Gazali (Sezgicilik/Kalp Gözü), İbn Rüşd (Çifte Hakikat)"
                ],
                "Öğrenim Çıktıları": [
                    "Orta Çağ Hristiyan felsefesinde aklın dine hizmet eden bir araç (ancilla theologiae) olarak görülüşünü inceler.",
                    "Tümeller tartışmasındaki realizm ve nominalizm karşıtlığını varlık ve bilgi açısından değerlendirir.",
                    "İslam filozoflarının akıl ile nakli uzlaştırma çabalarını ve Antik Yunan felsefesini koruyup zenginleştirerek Batı'ya aktarma rolünü açıklar."
                ]
            },
            "3. Tema: 15. Yüzyıl - 17. Yüzyıl Felsefesi (Rönesans ve Modern Felsefe)": {
                "Konular": [
                    "Rönesans'ın Felsefi Temelleri: Hümanizm, Sekülerleşme ve Skolastik Düşüncenin Yıkılışı",
                    "Bilimsel Yöntemin Doğuşu: F. Bacon (Tümevarım, İdoller Kuramı), Galileo, Kopernik, Newton",
                    "Kartezyen Felsefe ve Descartes: Metodik Şüphe, 'Düşünüyorum, öyleyse varım' (Cogito ergo sum), Ruh-Beden Düalizmi",
                    "Hukuk ve Siyaset Felsefesi: N. Machiavelli (Prens, Pragmatik Siyaset), T. Hobbes (Leviathan, 'İnsan insanın kurdudur', Toplum Sözleşmesi)",
                    "Ütopyalar: Thomas More (Ütopya), Campanella (Güneş Ülkesi), Bacon (Yeni Atlantis)"
                ],
                "Öğrenim Çıktıları": [
                    "Rönesans felsefesinde odağın teolojiden insana ve doğaya kayışını hümanizm kavramıyla temellendirir.",
                    "Descartes'ın şüpheyi kesin bilgiye ulaşmak için bir yöntem olarak kullanışını kartezyen epistemoloji üzerinden çözümler.",
                    "Modern devlet kuramlarında Machiavelli ve Hobbes'un meşruiyet ve merkezi egemenlik tezlerini karşılaştırır."
                ]
            },
            "4. Tema: 18. Yüzyıl - 19. Yüzyıl Felsefesi (Aydınlanma Dönemi)": {
                "Konular": [
                    "Aydınlanma Çağının Temel Karakteri: Aklın Otoritesi ve Özgürleşme",
                    "Bilginin Kaynağı Problemi: J. Locke (Tabula Rasa, Empirizm), D. Hume (Nedensellik Eleştirisi)",
                    "I. Kant: Kritisizm (Deney ve Aklın Sentezi), A Priori / A Posteriori Bilgi, Ödev Ahlakı ve Kategorik İmperatif",
                    "Birey-Devlet İlişkisi: J.J. Rousseau (Toplum Sözleşmesi, Genel İrade), Montesquieu (Kuvvetler Ayrılığı)",
                    "G.W.F. Hegel: Diyalektik İdealizm (Tez-Antitez-Sentez), Geist (Mutlak Akıl) Kavramı"
                ],
                "Öğrenim Çıktıları": [
                    "Locke'un doğuştan bilgi fikrini reddedip zihni boş bir levhaya benzettiği ampirik temellendirmesini kavrar.",
                    "Kant'ın 'Görüsüz kavramlar boş, kavramsız görüler kördür' vecizesiyle rasyonalizm ve empirizmi sentezleyişini analiz eder.",
                    "Montesquieu'nün kuvvetler ayrılığı ilkesinin modern anayasal demokrasilerin inşasındaki önemini değerlendirir.",
                    "Hegel'in diyalektik yöntemini tarihsel ve felsefi süreçlerin işleyişi üzerinden açıklar."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Tema: Dünya ve Ahiret": {
                "Konular": [
                    "Hayatın Anlamı ve Ahirete İman Bilinci",
                    "Ahiret Hayatının Aşamaları: Ecel, Ömür, Berzah (Kabir Hayatı), Kıyamet, Ba's (Yeniden Diriliş), Haşir ve Mahşer, Hesap, Mizan, Şefaat, Cennet ve Cehennem",
                    "Ahirete İmanın Bireysel ve Toplumsal Hayata Etkileri",
                    "Cenaze Uğurlama Adabı, Taziye Kuralları ve Kabir Ziyareti",
                    "Bakara Suresi 153-157. Ayetler Işığında Sabır ve Metanet"
                ],
                "Öğrenim Çıktıları": [
                    "İnsanın dünyadaki varoluşsal gayesini ahiret inancının getirdiği sorumluluk şuuruyla ilişkilendirir.",
                    "Ölüm sonrası hayatın merhalelerini Kur'an ayetleri ve hadisler bağlamında kronolojik olarak kavrar.",
                    "Ahirete imanın haksızlıkları önleme, adaleti temin etme ve ümitsizliği gidermedeki gücünü açıklar."
                ]
            },
            "2. Tema: Kur'an'a Göre Hz. Muhammed": {
                "Konular": [
                    "Hz. Muhammed'in Beşeri ve Peygamberlik Yönü",
                    "Hz. Muhammed'in Tebliğ (Hükümleri Duyurma), Tebyin (Açıklama), Teşri (Hüküm Koyma) ve Temsil (Örnek Olma) Görevleri",
                    "Hatemü'l-Enbiya (Peygamberlerin Sonuncusu) Oluşu",
                    "Üsve-i Hasene (En Güzel Örnek) Olarak Peygamberin Ahlakı",
                    "Ahzâb Suresi 21 ve 45-46. Ayetler Çerçevesinde Nebevî Misyon"
                ],
                "Öğrenim Çıktıları": [
                    "Peygamberimizin vahiy alma ve tebliğ etme vasfının yanında bizim gibi bir insan olduğunu ayırt eder.",
                    "Sünnetin Kur'an'ı açıklamada ve ibadetlerin uygulanmasında vazgeçilmez bir kaynak olduğunu kavrar.",
                    "Hz. Muhammed'in evrensel ahlaki erdemlerini (vefa, adalet, merhamet) modern hayatına rehber edinir."
                ]
            },
            "3. Tema: Kur'an'da Bazı Kavramlar": {
                "Konular": [
                    "Hidayet Kavramı ve Dalalet Ayrımı",
                    "İhsan ve Muhsin Olma Bilinci (Allah'ı Görüyormuşçasına Yaşamak)",
                    "İhlas Kavramı ve Riyanın İbadetleri Boş Çıkarması",
                    "Takva ve Muttaki İnsan Özellikleri",
                    "Sırat-ı Müstakim (Dosdoğru Yol) ve İstikamet",
                    "Cihat Kavramı: Nefisle Mücadele, İlimle Tebliğ ve Meşru Savunma Savaşı"
                ],
                "Öğrenim Çıktıları": [
                    "Kur'an'ın temel ahlaki ve itikadi kavramlarını bağlamlarına uygun olarak açıklar.",
                    "Cihat kavramının haksız saldırganlık veya terör olmadığını; nefisle mücadele, ilimle tebliğ ve vatan müdafaası olduğunu kavrar."
                ]
            },
            "4. Tema: İnançla İlgili Felsefi Yaklaşımlar": {
                "Konular": [
                    "Modern Dünyada İnanç Problemleri ve Dinin Karşılaştığı Felsefi Akımlar",
                    "Tanrı'nın Varlığını Reddeden veya Şüphe Eden Yaklaşımlar: Ateizm, Agnostisizm (Bilinemezcilik), Deizm (Peygambersiz/Kitapsız Din Anlayışı)",
                    "Maddeci ve Faydacı Yaklaşımlar: Materyalizm, Pozitivizm (Olguculuk), Sekülerizm (Dünyevileşme), Pragmatizm, Nihilizm (Hiççilik)",
                    "Kötülük Problemi ve İslam'ın Hayır-Şer Anlayışı",
                    "İnanç Sorunlarına Karşı İslam'ın Akılcı ve Vahye Dayalı Çözümleri"
                ],
                "Öğrenim Çıktıları": [
                    "Deizm ve ateizm gibi çağdaş akımların Tanrı-insan-evren ilişkisini koparan argümanlarını eleştirir.",
                    "Kötülük problemine karşı İslam'ın imtihan dünyası ve cüzi irade ilkeleriyle tutarlı cevaplar verir.",
                    "İnançsızlığın doğurduğu ahlaki ve psikolojik boşluklara karşı sağlam iman temelleri geliştirir."
                ]
            }
        },
        "İngilizce": {
            "Theme 1: Future Jobs": {
                "Konular": [
                    "Future Professions, Emerging Technologies, and Job Competencies",
                    "Expressing Future Intentions and Predictions with 'Will', 'Be Going To', Future Continuous",
                    "Making Inferences and Hypotheses Regarding Career Paths",
                    "Composing an Essay on Artificial Intelligence and the Job Market"
                ],
                "Öğrenim Çıktıları": [
                    "Expresses predictions and professional career choices using nuanced future aspect structures.",
                    "Understands formal audio interviews where career consultants discuss automation and future skills.",
                    "Drafts an argumentative essay anticipating the labor market requirements of the 21st century."
                ]
            },
            "Theme 2: Hobbies and Skills": {
                "Konular": [
                    "Leisure Activities, Talents, and Artistic Competencies",
                    "Expressing Abilities and Talents in Diverse Contexts (can, could, be able to)",
                    "Using Gerunds and Infinitives after Specific Verbs and Adjectives",
                    "Conducting a Survey on Peer Hobbies and Presenting Data"
                ],
                "Öğrenim Çıktıları": [
                    "Articulates personal competencies and leisure pursuits using gerund and infinitive structures.",
                    "Compares varying difficulty levels of sports and artistic hobbies accurately.",
                    "Interviews peers regarding extracurricular proficiencies and compiles an analytical chart."
                ]
            },
            "Theme 3: Hard Times": {
                "Konular": [
                    "Historic Crises, Natural Disasters, and Personal Hardships",
                    "Narrating Past Experiences: Past Continuous vs. Simple Past Tense",
                    "Past Habits and Past States with 'Used to' and 'Would'",
                    "Expressing Empathy, Sympathy, and Resilience in Adversity"
                ],
                "Öğrenim Çıktıları": [
                    "Narrates past struggles and historic challenges using complex past tense narratives.",
                    "Contrasts historical everyday living conditions with modern comfort using 'used to' and 'would'.",
                    "Drafts a first-person fictional diary reflecting resilience through a historic crisis."
                ]
            },
            "Theme 4: What a Life!": {
                "Konular": [
                    "Notable Biographies, Scientific Breakthroughs, and Inspiring Figures",
                    "Sequencing Past Events with Past Perfect Tense (had + V3) and Past Simple",
                    "Time Adverbs: by the time, before, after, as soon as, until",
                    "Writing an Inspiring Biographical Article"
                ],
                "Öğrenim Çıktıları": [
                    "Chronologically sequences past biographical events using the past perfect tense.",
                    "Extracts pivotal life milestones and achievements from authentic English biographies.",
                    "Writes a comprehensive biographical article portraying an iconic scientist or reformer."
                ]
            },
            "Theme 5: Back to the Past": {
                "Konular": [
                    "Hypothetical Situations, Regrets, and Speculations About the Past",
                    "Conditional Sentences Type 3 (If + Past Perfect, would have + V3)",
                    "Expressing Past Wishes and Regrets with 'Wish Clauses' (I wish I had...)",
                    "Writing a Reflective Letter Evaluating Historic Pivots"
                ],
                "Öğrenim Çıktıları": [
                    "Expresses past hypothetical scenarios and constructive reflections using Conditionals Type 3.",
                    "Articulates personal and historical regrets using 'wish' structures accurately.",
                    "Exchanges spoken dialogues evaluating alternative outcomes of historical turning points."
                ]
            },
            "Theme 6: Open Your Heart": {
                "Konular": [
                    "Emotional Well-Being, Interpersonal Conflicts, and Empathy",
                    "Active and Passive Voice across Various Tenses",
                    "Expressing Causes, Consequences, and Constructive Feedback",
                    "Writing an Advice Column Entry for Relationship Challenges"
                ],
                "Öğrenim Çıktıları": [
                    "Rephrases statements from active to passive voice to emphasize the recipient of the action.",
                    "Understands spoken narratives about emotional intelligence and interpersonal conflict resolution.",
                    "Writes a formal response to an advice column recommending empathetic solutions."
                ]
            },
            "Theme 7: Facts About Turkey": {
                "Konular": [
                    "Geographical Heritage, UNESCO World Heritage Sites, and Turkish Landmarks",
                    "Describing Landmarks using Relative Clauses (who, which, that, where, whose)",
                    "Comparative and Superlative Geographical Descriptions",
                    "Preparing an Immersive Tourism Presentation"
                ],
                "Öğrenim Çıktıları": [
                    "Describes Turkey's historical, natural, and cultural landmarks using defining relative clauses.",
                    "Synthesizes geographic data to compare diverse regions of Turkey.",
                    "Presents a structured multimedia travel guide highlighting historical sites like Cappadocia and Göbeklitepe."
                ]
            },
            "Theme 8: Sports": {
                "Konular": [
                    "Competitive Sports, Extreme Disciplines, and Athletic Rigor",
                    "Modals of Obligation, Prohibition, and Permission (must, have to, need to, can)",
                    "Expressing Sportsmanship, Fair Play, and Competition Etiquette",
                    "Writing a Sports Commentary or Match Review"
                ],
                "Öğrenim Çıktıları": [
                    "Articulates complex competition regulations and athletic rules using modal verbs.",
                    "Debates the psychological and physical demands of extreme sports vs. team sports.",
                    "Composes an engaging sports report analyzing tactical strategies in a competitive match."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Tema: Fiziksel Uygunluk ve Sağlıklı Yaşam": {
                "Konular": [
                    "Kişisel Fiziksel Uygunluk Parametreleri (Kardiyovasküler Dayanıklılık, Kas Kuvveti, Esneklik)",
                    "Antrenman Planlama: Yüklenme ve Toparlanma Döngüleri",
                    "Sporcu Beslenmesi, Sıvı Dengesi ve Enerji Sistemleri (Aerobik ve Anaerobik Sistem)",
                    "Hareketsiz Yaşamın Kronik Hastalıklara Etkisi"
                ],
                "Öğrenim Çıktıları": [
                    "Bireysel fiziksel uygunluk testlerini uygulayarak dönemsel gelişim profilini raporlar.",
                    "Farklı enerji sistemlerine uygun antrenman şiddeti ve nabız aralıklarını hesaplar.",
                    "Sağlıklı yaşam için dengeli beslenme ve düzenli egzersiz programı tasarlar."
                ]
            },
            "2. Tema: Spor Branşlarında İleri Teknik ve Taktik": {
                "Konular": [
                    "Takım Sporlarında Hücum ve Savunma Formasyonları",
                    "Müsabaka Analizi, Rakip Çözümleme ve Alan Savunması",
                    "Spor Ahlakı, Liderlik, Takım Uyumu ve Centilmenlik",
                    "Spor Yaralanmalarında İlkyardım Müdahaleleri"
                ],
                "Öğrenim Çıktıları": [
                    "Müsabaka esnasında değişen oyun şartlarına göre taktiksel varyasyonları sahaya yansıtır.",
                    "Takım çalışmasında sorumluluk alarak kriz anlarında yapıcı liderlik sergiler.",
                    "Spor sakatlanmalarında doğru ilkyardım basamaklarını (RICE protokolü vb.) uygular."
                ]
            }
        },
        "Görsel Sanatlar / Müzik": {
            "1. Tema: Çağdaş Sanat ve Görsel İfade": {
                "Konular": [
                    "20. Yüzyıl Çağdaş Sanat Akımları (Fovizm, Dışavurumculuk, Sürrealizm, Pop-Art)",
                    "Görsel Tasarımda Özgün Kompozisyon, Doku ve Hacim Çalışmaları",
                    "Kavramsal Sanat ve Enstalasyon (Yerleştirme) Sanatı",
                    "Müzikte Türk Sanat ve Halk Müziği Eserlerinin Armonik ve Ritmik Tahlili"
                ],
                "Öğrenim Çıktıları": [
                    "Çağdaş sanat yapıtlarını biçim, renk ve kavramsal içerik yönünden tahlil eder.",
                    "Görsel kompozisyon kurallarını kullanarak soyut veya figüratif özgün sanat üretimi yapar.",
                    "Geleneksel Türk müziği makamlarını ve çok sesli koro eserlerini estetik kriterlerle dinler ve yorumlar."
                ]
            },
            "2. Tema: Sanat Eleştirisi ve Estetik Çözümleme": {
                "Konular": [
                    "Sanat Eseri İnceleme Basamakları: Betimleme, Çözümleme, Yorumlama ve Yargı",
                    "Müze Bilinci, Sanat Galerileri ve Küratörlük Kavramı",
                    "Sanatın Toplumsal Hafıza ve Kimlik İnşasındaki Rolü"
                ],
                "Öğrenim Çıktıları": [
                    "Seçilen bir sanat yapıtını dört aşamalı sanat eleştirisi yöntemine uygun olarak yazılı raporlar.",
                    "Müzelerdeki kültürel ve sanatsal mirası korumanın yurttaşlık bilinci açısından önemini savunur."
                ]
            }
        },
        "Seçmeli Sosyoloji": {
            "1. Tema: Sosyolojiye Giriş ve Sosyolojik Yöntem": {
                "Konular": [
                    "Sosyolojinin Tanımı, Doğuşunu Hazırlayan Koşullar (Sanayi Devrimi, Fransız İhtilali)",
                    "Sosyolojinin Öncüleri: A. Comte, E. Durkheim, K. Marx, M. Weber, İbn Haldun (Mukaddime)",
                    "Sosyolojik Yöntem ve Araştırma Teknikleri (Anket, Mülakat, Monografi, Katılımlı Gözlem)",
                    "Toplumsal Olay ve Toplumsal Olgu Kavramları"
                ],
                "Öğrenim Çıktıları": [
                    "Toplumsal olayları bilimsel ve nesnel bir bakış açısıyla (sosyolojik muhayyile) analiz eder.",
                    "Sosyolojik araştırma yöntemlerini etik kurallar çerçevesinde veri toplama süreçlerine uygular."
                ]
            },
            "2. Tema: Birey, Toplum ve Toplumsal Yapı": {
                "Konular": [
                    "Sosyalleşme (Toplumsallaşma) Süreci ve Araçları (Aile, Okul, Akran Grubu, Kitle İletişim)",
                    "Toplumsal Statü (Edinilmiş ve Kazanılmış Statüler), Rol ve Rol Çatışması",
                    "Toplumsal Değerler, Normlar ve Toplumsal Kontrol Mekanizmaları",
                    "Toplumsal Tabakalaşma ve Tabakalaşma Tipleri (Kapalı/Kast, Yarı Açık/Zümre, Açık Sınıf)",
                    "Toplumsal Hareketlilik: Dikey ve Yatay Hareketlilik"
                ],
                "Öğrenim Çıktıları": [
                    "Bireyin sosyalleşme sürecinde edindiği statü ve roller arasındaki çatışmaları örneklerle açıklar.",
                    "Toplumsal tabakalaşma ve hareketlilik dinamiklerini modern toplumun fırsat eşitliği bağlamında değerlendirir."
                ]
            },
            "3. Tema: Toplumsal Değişme ve Kurumlar": {
                "Konular": [
                    "Toplumsal Değişmeyi Etkileyen Faktörler (Teknoloji, Ekonomi, Kültür, Çevre)",
                    "Toplumsal Kurumlar: Aile, Eğitim, Ekonomi, Siyaset ve Din Kurumu",
                    "Modernleşme, Küreselleşme ve Toplumsal Bütünleşme Sorunları"
                ],
                "Öğrenim Çıktıları": [
                    "Toplumsal kurumların işlevlerini ve tarihsel süreçteki yapısal değişimlerini analiz eder.",
                    "Küreselleşmenin yerel kültürler ve toplumsal dayanışma üzerindeki etkilerini tartışır."
                ]
            }
        },
        "Seçmeli Psikoloji": {
            "1. Tema: Psikoloji Bilimini Tanıyalım": {
                "Konular": [
                    "Psikolojinin Tanımı, Konusu ve Amaçları (Betimleme, Açıklama, Yordama, Kontrol)",
                    "Psikolojide Yaklaşımlar (Yapısalcılık, İşlevselcilik, Davranışçılık, Psikanalitik, Bilişsel, Biyolojik, İnsancıl)",
                    "Psikolojinin Alt Dalları (Klinik, Sosyal, Gelişim, Bilişsel, Endüstri Psikolojisi)",
                    "Psikolojide Araştırma Yöntemleri (Gözlem, Deney, Vaka İncelemesi, Testler)"
                ],
                "Öğrenim Çıktıları": [
                    "İnsan davranışlarını farklı psikolojik yaklaşımların (bilişsel, psikanalitik, davranışçı) bakış açılarıyla değerlendirir.",
                    "Psikolojide neden-sonuç bağıntılarını belirlemek için kullanılan deneysel yöntemleri (bağımlı, bağımsız değişken) çözümler."
                ]
            },
            "2. Tema: Psikolojinin Temel Süreçleri": {
                "Konular": [
                    "Gelişim Psikolojisi: Büyüme, Olgunlaşma, Öğrenme, Kritik Dönem",
                    "Duyum ve Algı: Eşikler, Duyusal Uyum, Algıda Örgütleme (Gestalt İlkeleri) ve Algı Yanılmaları (İllüzyon, Halüsinasyon)",
                    "Güdülenme ve Duygular (İçsel/Dışsal Güdülenme, Maslow İhtiyaçlar Hiyerarşisi)",
                    "Bilinç ve Dikkat, Uyku Evreleri ve Rüyalar"
                ],
                "Öğrenim Çıktıları": [
                    "Algı ve duyum süreçlerini ayırt eder; Gestalt algısal örgütleme yasalarını (yakınlık, benzerlik, tamamlama) inceler.",
                    "Maslow'un ihtiyaçlar hiyerarşisini bireysel gelişim ve motivasyon faktörleriyle ilişkilendirir."
                ]
            },
            "3. Tema: Öğrenme, Bellek, Düşünme ve Ruh Sağlığı": {
                "Konular": [
                    "Öğrenme Türleri: Klasik Koşullanma (Pavlov), Edimsel Koşullanma (Skinner), Sosyal/Model Alarak Öğrenme (Bandura)",
                    "Bellek Süreçleri: Duyusal Kayıt, Kısa Süreli Bellek, Uzun Süreli Bellek ve Hatırlama/Unutma",
                    "Stres Kavramı, Stres Kaynakları ve Baş Etme Mekanizmaları (Savunma Mekanizmaları)",
                    "Ruh Sağlığı ve Normal Dışı Davranışlar (Anksiyete, Depresyon, Fobiler)"
                ],
                "Öğrenim Çıktıları": [
                    "Klasik ve edimsel koşullanma mekanizmalarını pekiştireç ve ceza kavramları üzerinden modeller.",
                    "Belleğin bilgi işleme basamaklarını kavrar; unutmayı azaltan etkili çalışma stratejileri geliştirir.",
                    "Bireyin kaygı karşısında kullandığı savunma mekanizmalarını (bastırma, yansıtma, yüceltme vb.) tahlil eder."
                ]
            }
        },
        "Seçmeli Bilgisayar Bilimi": {
            "1. Tema: Nesne Yönelimli Programlama (OOP)": {
                "Konular": [
                    "Nesne Yönelimli Programlama Temelleri: Sınıf (Class) ve Nesne (Object)",
                    "Kapsülleme (Encapsulation) ve Erişim Belirteçleri",
                    "Kalıtım (Inheritance) ve Üst/Alt Sınıf Hiyerarşisi",
                    "Çok Biçimlilik (Polymorphism) ve Metot Aşırı Yükleme (Overloading/Overriding)"
                ],
                "Öğrenim Çıktıları": [
                    "Gerçek hayat problemlerini sınıflar ve nesneler tasarlayarak modeller.",
                    "Kalıtım prensibini kullanarak modüler ve yeniden kullanılabilir kod blokları inşa eder.",
                    "Çok biçimlilik ile aynı arayüz üzerinden farklı nesne davranışlarını çalıştırır."
                ]
            },
            "2. Tema: Algoritma Analizi ve Veri Tabanı Mimarisi": {
                "Konular": [
                    "Algoritma Karmaşıklığı ve Big-O Gösterimi",
                    "Temel Sıralama ve Arama Algoritmaları (Bubble Sort, Insertion Sort, Binary Search)",
                    "İlişkisel Veri Tabanı Yönetim Sistemleri (RDBMS) ve Tablo Tasarımı",
                    "Temel SQL Sorguları: SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN"
                ],
                "Öğrenim Çıktıları": [
                    "Algoritmaların zaman ve bellek karmaşıklığını Big-O notasyonu ile karşılaştırır.",
                    "İlişkisel veri tabanında tablolar arası birincil (primary key) ve yabancı anahtar (foreign key) ilişkisi kurar.",
                    "SQL sorgularıyla verileri filtreler, günceller ve tabloları birleştirerek raporlar."
                ]
            }
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "1. Tema: Alışveriş ve Moda": {
                "Konular": [
                    "Kıyafetler ve alışveriş hakkında konuşur",
                    "'Alışveriş ve Moda' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Alışveriş ve Moda' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Alışveriş ve Moda' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Alışveriş ve Moda' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Kıyafetler ve alışveriş hakkında konuşur.",
                    "'Alışveriş ve Moda' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Alışveriş ve Moda' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Alışveriş ve Moda' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Alışveriş ve Moda' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            },
            "2. Tema: Sağlık": {
                "Konular": [
                    "Sağlık sorunlarını ifade eder ve tavsiye verir",
                    "'Sağlık' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar",
                    "'Sağlık' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder",
                    "Öğrendiği bilgileri kullanarak 'Sağlık' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar",
                    "'Sağlık' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür"
                ],
                "Öğrenim Çıktıları": [
                    "Sağlık sorunlarını ifade eder ve tavsiye verir.",
                    "'Sağlık' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                    "'Sağlık' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                    "Öğrendiği bilgileri kullanarak 'Sağlık' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                    "'Sağlık' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
                ]
            }
        }
    },
    "12. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "1. Ünite: Giriş (Felsefe ve Psikolojiyle İlişki)": {
                "Konular": [
                    "Edebiyat ile Felsefe ve Psikoloji Arasındaki Disiplinler Arası İlişki",
                    "Dilin Tarihî Süreçteki Değişimini Etkileyen Faktörler (Din, Coğrafya, Kültür, Teknoloji)",
                    "İlk Örneklerden Günümüze Türkçenin Önemli Sözlükleri (Divanü Lugati't-Türk, Mukaddimetü'l-Edep, Kamus-ı Türki vb.)",
                    "Metinlerde Yazım ve Noktalama Kurallarının Eleştirel Uygulaması"
                ],
                "Kazanımlar": [
                    "Edebiyat ile felsefe ve psikoloji arasındaki ilişkiyi metinler üzerinden açıklar.",
                    "Dilin tarihi süreçteki değişimini etkileyen sebepleri (kültür, din, coğrafya, teknoloji) analiz eder[cite: 1].",
                    "İlk örneklerden günümüze Türkçenin sözlüklerini (Divanü Lugati't-Türk, Kamus-ı Türki vb.) inceler[cite: 1].",
                    "Metinlerdeki yazım ve noktalama kurallarını eleştirel gözle değerlendirir[cite: 1]."
                ]
            },
            "2. Ünite: Hikâye (1960 Sonrası ve Küçürek Hikâye)": {
                "Konular": [
                    "1960 Sonrası Türk Hikâyeciliğinde Tematik Çeşitlilik ve Bireyin İç Dünyası",
                    "Küçürek (Minimal) Hikâyenin Özellikleri, İmbiklenmiş Anlatım ve Çağrışım Gücü",
                    "Modernist ve Postmodernist Hikâyelerde Kullanılan Anlatım Teknikleri (Bilinç Akışı, İç Monolog, Pastiş, Parodi)",
                    "Dönemin Temsilcileri: Ferit Edgü, Mustafa Kutlu, Sevgi Soysal, Rasim Özdenören"
                ],
                "Kazanımlar": [
                    "1960 sonrası Türk hikâyesinin temalarını, anlatım tekniklerini ve yönelimlerini çözümler[cite: 1].",
                    "Küçürek (minimal) hikâyenin özelliklerini kavrar ve örnek metinleri tahlil eder[cite: 1].",
                    "Modernist ve postmodernist hikâyelerde kullanılan teknikleri (bilinç akışı, iç monolog, pastiş) belirler[cite: 1].",
                    "Özgün bir küçürek hikâye metni kaleme alır ve edebi estetiğini tartışır[cite: 1]."
                ]
            },
            "3. Ünite: Şiir (Cumhuriyet Dönemi Türk Şiiri)": {
                "Konular": [
                    "Cumhuriyet Dönemi Saf (Öz) Şiir Anlayışı (Ahmet Hamdi Tanpınar, Cahit Sıtkı Tarancı)",
                    "Toplumcu Gerçekçi Şiir (Nazım Hikmet, Rıfat Ilgaz, Ahmed Arif)",
                    "Garip Akımı (I. Yeni: Orhan Veli, Oktay Rifat, Melih Cevdet)",
                    "İkinci Yeni Şiiri (Cemal Süreya, Edip Cansever, Sezai Karakoç, Ece Ayhan, İlhan Berk)",
                    "Dini Değerleri ve Geleneği Öne Çıkaran Şiir (Sezai Karakoç, Cahit Zarifoğlu, Erdem Bayazıt)",
                    "1980 Sonrası Türk Şiiri ve Cumhuriyet Devri Poetikaları"
                ],
                "Kazanımlar": [
                    "Cumhuriyet Dönemi saf şiir, toplumcu şiir, Garip akımı, İkinci Yeni ve dini değerleri öne çıkaran şiir anlayışlarını karşılaştırır[cite: 1].",
                    "1980 sonrası Türk şiirinin genel özelliklerini ve eğilimlerini belirler[cite: 1].",
                    "Şiirlerdeki imge, ahenk, ritim, edebi sanatlar ve açık/örtük iletileri çözümler[cite: 1].",
                    "Cumhuriyet devri şairlerinin şiir anlayışlarını yansıtan poetikaları inceler[cite: 1]."
                ]
            },
            "4. Ünite: Roman (1980 Sonrası ve Postmodern Roman)": {
                "Konular": [
                    "1980 Sonrası Türk Romanında Arayışlar ve Bireysel Yabancılaşma",
                    "Postmodern Roman Kuramı: Üstkurmaca, Metinlerarasılık, Çoğulcu Bakış Açısı, İroni",
                    "Roman Tahlili Unsurları ve Şahıs Kadrosunun Psikolojik/Sosyolojik Boyutu",
                    "Roman Türünün Sinema ve Dijital Medyaya Uyarlanması",
                    "Temsilciler: Orhan Pamuk, İhsan Oktay Anar, Bilge Karasu, Pınar Kür"
                ],
                "Kazanımlar": [
                    "1980 sonrası Türk romanının toplumsal ve bireysel konularını inceler[cite: 1].",
                    "Postmodern romanda üstkurmaca, metinlerarasılık, parodi ve ironi tekniklerini çözümler[cite: 1].",
                    "Romandaki şahıs kadrosunun psikolojik ve sosyal tahlilini yapar[cite: 1].",
                    "Roman ile sinema/dijital medya uyarlamaları arasındaki farkları tartışır[cite: 1]."
                ]
            },
            "5. Ünite: Tiyatro (Cumhuriyet Dönemi Türk Tiyatrosu)": {
                "Konular": [
                    "Cumhuriyet Dönemi Tiyatrosunun Gelişim Evreleri ve Tematik Zenginliği",
                    "Haldun Taner ve Epik Tiyatro Anlayışı (Keşanlı Ali Destanı)",
                    "Absürt (Uyumsuz) Tiyatro Akımı",
                    "Tiyatro Metinlerindeki Çatışmalar, Sahne Düzeni ve Diyalog Yapısı"
                ],
                "Kazanımlar": [
                    "Cumhuriyet Dönemi Türk tiyatrosundaki gelişmeleri, türleri ve tematik eğilimleri inceler[cite: 1].",
                    "Epik tiyatro ve absürt tiyatronun özelliklerini metinler üzerinden açıklar[cite: 1].",
                    "Tiyatro metnindeki çatışmaları, sahneleme tekniklerini ve diyalog yapılarını çözümler[cite: 1].",
                    "Bir tiyatro sahnesini canlandırarak sözlü ve bedensel iletişim becerisini sergiler[cite: 1]."
                ]
            },
            "6. Ünite: Deneme / Söylev": {
                "Konular": [
                    "Cumhuriyet Döneminde Deneme Türünün Seçkin Örnekleri (Nurullah Ataç, Suut Kemal Yetkin, Cemil Meriç)",
                    "Söylev (Hitabet) Türünün Özellikleri, Amacı ve Toplumsal Harekete Geçirici Rolü",
                    "Mustafa Kemal Atatürk'ün 'Nutuk' Eseri ve Söylev Sanatı",
                    "Düşünceyi İkna Edici Üslupla İfade Eden Deneme Yazımı"
                ],
                "Kazanımlar": [
                    "Cumhuriyet Dönemi deneme yazarlarını ve eserlerini konu, dil ve üslup yönünden inceler[cite: 1].",
                    "Söylev (hitabet) türünün özelliklerini ve tarihi-toplumsal işlevini kavrar[cite: 1].",
                    "Atatürk'ün Nutuk başta olmak üzere önemli söylev metinlerini analiz eder[cite: 1].",
                    "Güncel bir konuda düşüncelerini etkili bir üslupla aktaran özgün bir deneme yazar[cite: 1]."
                ]
            },
            "7. Ünite: Mülakat / Röportaj": {
                "Konular": [
                    "Mülakat Türünün Özellikleri, Soru Hazırlama ve Görüşme Teknikleri",
                    "Röportaj Türünün Özellikleri: Gazete/Dergi Röportajı, Fotoğraflı Anlatım",
                    "Mülakat ile Röportaj Arasındaki Farklar",
                    "Basın Ahlakı ve Doğru Haber Aktarımı İlkeleri"
                ],
                "Kazanımlar": [
                    "Mülakat ve röportaj türlerinin özelliklerini, farklarını ve gelişimini inceler[cite: 1].",
                    "Bir alanın uzmanıyla mülakat planlar, sorular hazırlar ve uygular[cite: 1].",
                    "Görsel ve işitsel unsurlarla zenginleştirilmiş bir röportaj metni hazırlar[cite: 1].",
                    "Medya etiği ve doğru bilgi aktarımı ilkelerini kavrar[cite: 1]."
                ]
            }
        },
        "Matematik": {
            "1. Ünite: Üstel ve Logaritmik Fonksiyonlar": {
                "Konular": [
                    "Üstel Fonksiyon Tanımı, Grafiği ve Birebirlik/Örtenlik Özellikleri",
                    "Logaritma Fonksiyonu (Üstel Fonksiyonun Tersi)",
                    "Onluk ve Doğal Logaritma (ln) Fonksiyonları",
                    "Logaritmanın Özellikleri ve Taban Değiştirme Kuralı",
                    "Üstel ve Logaritmik Denklemler ile Eşitsizlikler",
                    "Üstel Büyüme, Bozunma ve Gerçek Hayat Uygulamaları (Deprem Şiddeti Richter Ölçeği, Ses Düzeyi Desibel, Kimyada pH Hesabı)"
                ],
                "Kazanımlar": [
                    "Üstel fonksiyonu açıklar ve grafiğini çizer; üstel büyüme ve bozunma problemlerini modeller[cite: 1].",
                    "Logaritma fonksiyonunu üstel fonksiyonun tersi olarak tanımlar ve özelliklerini kavrar[cite: 1].",
                    "Taban değiştirme kuralı ve logaritmanın temel özelliklerini kullanarak işlem yapar[cite: 1].",
                    "Üstel ve logaritmik denklemler ile eşitsizliklerin çözüm kümelerini bulur; günlük hayat problemlerine (deprem büyüklüğü, ses şiddeti, pH) uygular[cite: 1]."
                ]
            },
            "2. Ünite: Diziler": {
                "Konular": [
                    "Gerçek Sayı Dizileri, Genel Terim (an) ve Sonlu Dizi",
                    "Aritmetik Dizi: Ortak Fark, Genel Terim ve İlk n Terim Toplamı (Sn)",
                    "Geometrik Dizi: Ortak Çarpan, Genel Terim ve İlk n Terim Toplamı",
                    "Aritmetik ve Geometrik Dizilerin Günlük Yaşam Problemlerine (Finansal Faiz, Kredi Geri Ödemeleri, Nüfus Artışı) Uygulanması"
                ],
                "Kazanımlar": [
                    "Gerçek sayı dizilerini tanımlar, genel terimini ve sonlu dizi kavramını açıklar[cite: 1].",
                    "Aritmetik dizinin özelliklerini, genel terimini ve ilk n terim toplamı formülünü türetir ve uygular[cite: 1].",
                    "Geometrik dizinin özelliklerini, genel terimini ve ilk n terim toplamını hesaplar[cite: 1].",
                    "Dizileri günlük hayat finansal modellemelerinde (faiz, nüfus artışı vb.) kullanır[cite: 1]."
                ]
            },
            "3. Ünite: Trigonometri": {
                "Konular": [
                    "İki Açının Toplam ve Farkının Trigonometrik Değerleri (sin(a±b), cos(a±b), tan(a±b))",
                    "İki Kat Açı (Yarım Açı) Formülleri (sin2x, cos2x, tan2x)",
                    "Trigonometrik Denklemler: sin x = a, cos x = a ve tan x = a Çözüm Kümeleri",
                    "Trigonometrik Modelleme ve Periyodik Hareket Problemleri"
                ],
                "Kazanımlar": [
                    "İki açının toplam ve farkının trigonometrik değerlerine ait formülleri türetir ve kullanır[cite: 1].",
                    "İki kat açı (yarım açı) formüllerini oluşturur ve trigonometrik sadeleştirmelerde uygular[cite: 1].",
                    "sin x = a, cos x = a ve tan x = a biçimindeki trigonometrik denklemleri çözer[cite: 1].",
                    "Trigonometrik modelleme ile fiziksel dalga ve periyodik hareket problemlerini analiz eder[cite: 1]."
                ]
            },
            "4. Ünite: Türev": {
                "Konular": [
                    "Bir Fonksiyonun Bir Noktadaki Limiti, Sağdan ve Soldan Limit",
                    "Limit Özellikleri ve 0/0 Belirsizlik Durumunun Çözümü",
                    "Süreklilik Şartı ve Süreksizlik Noktaları",
                    "Anlık Değişim Oranı ve Türevin Limit Tanımı",
                    "Türev Alma Kuralları: Polinom, Çarpım, Bölüm ve Zincir Kuralı (Bileşke Fonksiyonun Türevi)",
                    "Türevin Geometrik Yorumu: Teğet ve Normal Doğrularının Eğim ve Denklemleri",
                    "Artan ve Azalan Fonksiyonlar, Birinci Türev Testi",
                    "Yerel Ekstremum (Maksimum ve Minimum) Noktaları",
                    "Maksimum ve Minimum Problemleri ve Modelleme"
                ],
                "Kazanımlar": [
                    "Bir fonksiyonun bir noktadaki limitini ve süreklilik şartlarını inceler; belirsizlik durumlarını çözer[cite: 1].",
                    "Anlık değişim oranını ve türevin limit tanımını açıklar[cite: 1].",
                    "Türev alma kurallarını (çarpım, bölüm, bileşke ve zincir kuralı) fonksiyonlara uygular[cite: 1].",
                    "Türevin geometrik yorumunu (teğet ve normal denklemleri) kavrar; artan-azalan aralıkları ve yerel ekstremum noktalarını belirler; maksimum-minimum problemlerini çözer[cite: 1]."
                ]
            },
            "5. Ünite: İntegral": {
                "Konular": [
                    "Belirsiz İntegral Kavramı ve Diferansiyel İlkesi",
                    "Temel İntegral Alma Kuralları (Kuvvet Kuralı)",
                    "Değişken Değiştirme Yöntemi ile İntegral Hesabı",
                    "Belirli İntegral ve Kalkülüsün Temel Teoremi",
                    "Belirli İntegralin Özellikleri",
                    "Riemann Toplamı (Alt ve Üst Riemann Toplamı, Orta Nokta Kuralı)",
                    "Belirli İntegral ile Eğrilerin Altında Kalan Alan ve İki Eğri Arasındaki Alan Hesabı"
                ],
                "Kazanımlar": [
                    "Belirsiz integrali diferansiyel kavramı ve türevin ters işlemi olarak açıklar; temel integral alma kurallarını uygular[cite: 1].",
                    "Değişken değiştirme yöntemini kullanarak integral hesaplar[cite: 1].",
                    "Riemann toplamını ve belirli integrali açıklar; belirli integralin temel teoremini kavrar[cite: 1].",
                    "Belirli integral yardımıyla eğrilerin altında kalan alanı ve iki eğri arasındaki alanı hesaplar[cite: 1]."
                ]
            },
            "6. Ünite: Çemberin Analitik İncelenmesi": {
                "Konular": [
                    "Çemberin Standart Denklemi (Merkezi (a, b) ve Yarıçapı r Olan Çember: (x-a)² + (y-b)² = r²)",
                    "Merkezi Orijinde Olan Çember (x² + y² = r²)",
                    "Çemberin Genel Denklemi (x² + y² + Dx + Ey + F = 0) ve Merkez/Yarıçap Dönüşümleri",
                    "Bir Doğru ile Bir Çemberin Birbirine Göre Durumları (Kesişen, Teğet, Kesişmeyen)"
                ],
                "Kazanımlar": [
                    "Merkezi ve yarıçapı verilen çemberin standart ve genel denklemini yazar[cite: 1].",
                    "Genel denklemi verilen çemberin merkezini ve yarıçapını belirler; grafiklerini çizer[cite: 1].",
                    "Bir doğru ile bir çemberin birbirine göre durumlarını inceler (teğet, kesen, kesişmeyen)[cite: 1].",
                    "Çember denklemlerini günlük hayat tasarım ve mühendislik problemlerinde modeller[cite: 1]."
                ]
            }
        },
        "Fizik": {
            "1. Ünite: Çembersel Hareket": {
                "Konular": [
                    "Düzgün Çembersel Hareket: Periyot, Frekans, Çizgisel Hız, Açısal Hız (v = ω.r)",
                    "Merkezcil İvme ve Merkezcil Kuvvet (F = m.v²/r = m.ω².r)",
                    "Yatay ve Düşey Düzlemde Düzgün Çembersel Hareket, Konik Sarkaç",
                    "Eğimli ve Eğimsiz Virajlarda Güvenli Dönüş Şartları",
                    "Dönerek Öteleme Hareketi ve Toplam Kinetik Enerji (E = 1/2 m.v² + 1/2 I.ω²)",
                    "Eylemsizlik Momenti (I) ve Geometrik Şekiller",
                    "Açısal Momentum (L = I.ω), Tork ve Açısal Momentum Değişimi, Açısal Momentumun Korunumu",
                    "Kütle Çekim Kuvveti, Kütle Çekim Potansiyel Enerjisi, Kurtulma ve Dolanma Hızı",
                    "Kepler Kanunları (Yörüngeler, Alanlar ve Periyotlar Kanunu)"
                ],
                "Kazanımlar": [
                    "Düzgün çembersel harekette periyot, frekans, çizgisel hız, açısal hız, merkezcil ivme ve merkezcil kuvvet kavramlarını açıklar[cite: 1].",
                    "Yatay, düşey ve eğimli virajlarda çembersel hareket dinamiklerini çözer[cite: 1].",
                    "Dönerek öteleme hareketinde toplam kinetik enerjiyi ve eylemsizlik momentini kavrar[cite: 1].",
                    "Açısal momentumun tanımını ve dış tork sıfır olduğunda açısal momentumun korunumunu modellerle açıklar[cite: 1].",
                    "Kepler kanunlarını ve kütle çekim kuvvetinin gezegen hareketlerindeki rolünü analiz eder[cite: 1]."
                ]
            },
            "2. Ünite: Basit Harmonik Hareket": {
                "Konular": [
                    "Basit Harmonik Hareketin Tanımı ve Çembersel Hareketin İzdüşümü Olarak Modellenmesi",
                    "Konum, Hız, İvme ve Geri Çağırıcı Kuvvetin Zamana Bağlı Değişim Denklemleri ve Grafikleri",
                    "Yaylı Sarkaç (T = 2π√(m/k)) ve Yayların Seri/Paralel Bağlanması",
                    "Basit Sarkaç (T = 2π√(L/g)) ve Yer Çekimi İvmesine Bağımlılık",
                    "Harmonik Harekette Enerji Dönüşümleri (Kinetik ve Potansiyel Enerji Korunumu)",
                    "Rezonans Olayı ve Yapısal Mühendislikteki Önemi"
                ],
                "Kazanımlar": [
                    "Basit harmonik hareketi düzgün çembersel hareketin izdüşümü olarak modeller[cite: 1].",
                    "Harmonik harekette konum, hız, ivme ve kuvvetin zamana bağlı değişim denklemlerini açıklar[cite: 1].",
                    "Yaylı sarkaç ve basit sarkacın periyodunu etkileyen değişkenleri inceler ve hesaplar[cite: 1].",
                    "Harmonik harekette mekanik enerjinin korunumunu ve rezonans olayını tartışır[cite: 1]."
                ]
            },
            "3. Ünite: Dalga Mekaniği": {
                "Konular": [
                    "Su Dalgalarında Kırınım Olayı ve Yarık Genişliği (w) / Dalga Boyu (λ) Şartı",
                    "Su Dalgalarında Girişim Olayı: Düğüm Çizgileri, Katar Çizgileri ve Yol Farkı (Δs = n.λ)",
                    "Işıkta Girişim: Young Çift Yarık Deneyi, Saçak Genişliği (Δx = λ.L / d.n), Merkezi Aydınlık Saçak",
                    "Işıkta Kırınım: Tek Yarık Deneyi, Saçak Genişliği ve Aydınlık/Karanlık Saçak Şartları",
                    "Doppler Olayı: Su, Ses ve Işık Dalgalarında Frekans ve Dalga Boyu Kayması (Kızıla Kayma)",
                    "Elektromanyetik Dalgaların Özellikleri ve Spektrum (Radyo, Mikrodalga, Kızılötesi, Görünür Işık, Morötesi, X Işınları, Gama Işınları)"
                ],
                "Kazanımlar": [
                    "Su dalgalarında kırınım ve girişim olaylarını modellerle açıklar[cite: 1].",
                    "Işıkta çift yarıkta girişim (Young deneyi) ve tek yarıkta kırınım olaylarını karşılaştırır[cite: 1].",
                    "Işığın dalga doğasını, saçak aralığını ve yol farkını hesaplar[cite: 1].",
                    "Doppler olayının mekanik ve elektromanyetik dalgalardaki oluşumunu ve astronomideki kullanımını açıklar; elektromanyetik spektrumu sınıflandırır[cite: 1]."
                ]
            },
            "4. Ünite: Atom Fiziğine Giriş ve Radyoaktivite": {
                "Konular": [
                    "Atom Kavramının Tarihsel Gelişimi: Dalton, Thomson, Rutherford Atom Modelleri",
                    "Bohr Atom Modeli: Postulatları, Yarıçap (rn), Enerji Seviyeleri (En) ve İyonlaşma Enerjisi",
                    "Bohr Modelinin Başarıları ve Eksiklikleri, Modern Kuantum Atom Modeline Geçiş",
                    "Atomların Uyarılması: Çarpışma, Fotonla Soğurma ve Isıtma ile Uyarılma, Franck-Hertz Deneyi",
                    "Radyoaktivite: Çekirdek Kararlılığı, Nötron/Proton Oranı (N/Z)",
                    "Radyoaktif Işımalar: Alfa (α), Beta (β-, β+) ve Gama (γ) Bozunmaları",
                    "Yarılanma Ömrü, Nükleer Fisyon (Bölünme) ve Nükleer Füzyon (Kaynaşma), Kütle-Enerji Eşdeğerliği (E = mc²)"
                ],
                "Kazanımlar": [
                    "Tarihsel süreçte atom modellerini (Dalton, Thomson, Rutherford, Bohr) inceler; Bohr atom modelinin başarılarını ve eksiklerini kavrar[cite: 1].",
                    "Atomların uyarılma yollarını (çarpışma, foton, ısı) ve spektrum çizgilerini açıklar; Franck-Hertz deneyini yorumlar[cite: 1].",
                    "Kararsız çekirdeklerin radyoaktif bozunmalarını (alfa, beta, gama) ve yarılanma ömrünü hesaplar[cite: 1].",
                    "Nükleer fisyon ve füzyon reaksiyonlarını, kütle-enerji eşdeğerliğini (E=mc²) ve nükleer enerji santrallerini değerlendirir[cite: 1]."
                ]
            },
            "5. Ünite: Modern Fizik": {
                "Konular": [
                    "Özel Görelilik Teorisi: Michelson-Morley Deneyi ve Işık Hızının Değişmezliği İlkesi",
                    "Einstein'ın İki Temel Postulatı, Göreli Zaman (Zaman Genişlemesi) ve Göreli Uzunluk (Boy Büzülmesi)",
                    "Siyah Cisim Işıması, Klasik Fiziğin Çıkmazı (Morötesi Felaket) ve Planck Kuantum Hipotezi (E = h.f)",
                    "Fotoelektrik Olayı: Foton, Eşik Enerjisi, Bağlanma Enerjisi, Einstein Fotoelektrik Denklemi (Efoton = Ebağlanma + Ekinetik)",
                    "Fotoelektrik Akımı Etkileyen Değişkenler: Işık Şiddeti, Gerilim, Frekans ve Durdurma Potansiyeli",
                    "Compton Saçılması: Çarpışmada Momentum ve Enerji Korunumu",
                    "Fotonun Dalga-Parçacık İkiliği ve De Broglie Madde Dalgaları (λ = h / p)"
                ],
                "Kazanımlar": [
                    "Özel görelilik teorisinin iki temel postulatını kavrar; zamanın genişlemesi ve uzunluğun büzülmesini açıklar[cite: 1].",
                    "Siyah cisim ışımasını ve Planck'ın kuantum hipotezini modeller[cite: 1].",
                    "Fotoelektrik olayı ve Einstein'ın fotoelektrik denklemini deney verileriyle analiz eder; eşik enerjisi ve durdurma gerilimini hesaplar[cite: 1].",
                    "Compton saçılmasını ve De Broglie dalga boyunu (dalga-parçacık ikiliği) kavrar[cite: 1]."
                ]
            },
            "6. Ünite: Modern Fiziğin Teknolojideki Uygulamaları": {
                "Konular": [
                    "Tıbbi Görüntüleme Cihazları: Röntgen, Manyetik Rezonans (MR), Bilgisayarlı Tomografi (BT), PET ve Ultrason",
                    "Yarı İletken Teknolojisi: p-Tipi ve n-Tipi Yarı İletkenler, Diyot, Transistör ve LED'ler, Güneş Pilleri (Fotovoltaik Hücreler)",
                    "Süperiletkenlik: Kritik Sıcaklık, Meissner Etkisi ve Manyetik Havalanma (Maglev Trenleri)",
                    "Nanoteknoloji ve Karbon Allotropları (Grafen, Nanotüp)",
                    "LASER (Lazer) Işınlarının Elde Edilişi (Uyarılmış Işıma), Özellikleri ve Kullanım Alanları"
                ],
                "Kazanımlar": [
                    "Tıbbi görüntüleme cihazlarının (Röntgen, MR, Tomografi, PET, Ultrason) temel fiziksel çalışma prensiplerini karşılaştırır[cite: 1].",
                    "Yarı iletken maddelerin özelliklerini, diyot, transistör ve güneş pillerinin işlevlerini açıklar[cite: 1].",
                    "Süper iletkenlik durumunu, Meissner etkisini ve maglev trenlerindeki kullanımını inceler[cite: 1].",
                    "Nanoteknolojinin kullanım alanlarını ve LASER ışınlarının elde edilişini/özelliklerini açıklar[cite: 1]."
                ]
            }
        },
        "Kimya": {
            "1. Ünite: Kimya ve Elektrik": {
                "Konular": [
                    "İndirgenme-Yükseltgenme (Redoks) Tepkimeleri ve İyon-Elektron (Yarı Tepkime) Yöntemiyle Denkleştirme",
                    "Elektrotlar ve Elektrokimyasal Hücreler (Galvanik Hücre / Daniell Pili)",
                    "Standart Elektrot Potansiyelleri (E°), Yükseltgenme-İndirgenme Potansiyelleri ve Standart Hidrojen Elektrodu (SHE)",
                    "Pilin Kendiliğindenliği (İstemliliği) ve Pil Potansiyeli Hesabı (E°pil = E°katot - E°anot)",
                    "Derişim Pilleri ve Standart Olmayan Koşullarda Pil Potansiyeli: Nernst Eşitliği (E = E° - (0,0592/n).logQ)",
                    "Lityum İyon Pilleri ve Akümülatörler",
                    "Elektroliz Olayı, Faraday Elektroliz Yasaları (m = Q.M / z.F), Suyun Elektrolizi (Hoffman Voltamerresi)",
                    "Erimiş Tuzların ve Sulu Çözeltilerin Elektrolizi (Anot ve Katotta Öncelikli Açığa Çıkan Maddeler)",
                    "Korozyon Olayı, Korozyonu Önleme Yöntemleri ve Kurban Elektrot (Katodik Koruma)"
                ],
                "Kazanımlar": [
                    "İndirgenme-yükseltgenme (redoks) tepkimelerini yarı tepkime yöntemiyle denkleştirir[cite: 1].",
                    "Standart elektrot potansiyellerini kullanarak galvanik hücrelerin (piller) potansiyelini ve kendiliğindenliğini belirler[cite: 1].",
                    "Nernst eşitliğini derişim pillerine ve standart olmayan koşullara uygular; lityum iyon pillerini açıklar[cite: 1].",
                    "Elektroliz olayını, Faraday yasalarını, suyun elektrolizini ve korozyondan korunma (katodik koruma) yöntemlerini kavrar[cite: 1]."
                ]
            },
            "2. Ünite: Karbon Kimyasına Giriş": {
                "Konular": [
                    "Organik ve Anorganik Bileşiklerin Yapısal ve Fiziksel Farkları",
                    "Organik Bileşiklerin Basit Formülü, Molekül Formülü ve Yapı Formülü",
                    "Karbon Elementinin Dört Bağ Yapma Özelliği ve Hibritleşme (sp³, sp², sp Hibrit Orbitalleri)",
                    "Sigma (σ) ve Pi (π) Bağlarının Oluşumu, Karşılaştırılması",
                    "Karbonun Allotropları: Doğal Allotroplar (Elmas, Grafit) ve Yapay Allotroplar (Grafen, Fulleren, Nanotüp)",
                    "Kovalent Bağlı Moleküllerin Lewis Formülleri ve Oktet/Dublet Kuralları",
                    "Molekül Geometrisi ve VSEPR (Değerlik Katmanı Elektron Çifti İtmesi) Kuramı (Doğrusal, Kırık Doğru, Düzlem Üçgen, Düzgün Dörtyüzlü, Üçgen Piramit)"
                ],
                "Kazanımlar": [
                    "Organik ve anorganik bileşiklerin özelliklerini ve aralarındaki farkları belirler[cite: 1].",
                    "Karbon elementinin çok bağ yapabilme özelliğini ve allotroplarını (elmas, grafit, grafen, fulleren, nanotüp) açıklar[cite: 1].",
                    "Kovalent bağlı moleküllerin Lewis formüllerini yazar; hibritleşme türlerini (sp, sp², sp³) belirler[cite: 1].",
                    "VSEPR teorisini kullanarak molekül geometrisini (doğrusal, kırık doğru, düzlem üçgen, düzgün dörtyüzlü, üçgen piramit) ve bağ açılarını açıklar[cite: 1]."
                ]
            },
            "3. Ünite: Organik Bileşikler": {
                "Konular": [
                    "Hidrokarbonların Sınıflandırılması: Alifatik ve Aromatik Hidrokarbonlar",
                    "Alkanlar (Parafinler): IUPAC Adlandırma Kuralları, Yapı İzomerliği, Alkil Kökleri, Fiziksel ve Kimyasal Özellikleri (Yanma, Halojenlerle Yer Değiştirme)",
                    "Alkenler (Olefinler): Adlandırma, Geometrik İzomerlik (Cis-Trans İzomerliği), Katılma Tepkimeleri (Markovnikov Kuralı), Polimerleşme",
                    "Alkinler (Asetilenler): Adlandırma, Uç ve İç Alkinler, Fehling ve Tollens Ayıraçlarıyla Çökelek Verme Reaksiyonları",
                    "Aromatik Bileşikler (Arenler): Benzen Halkası, Rezonans Yapı, Naftalin, Toluen, Anilin, Fenol",
                    "Fonksiyonel Gruplar ve Sınıflandırılması",
                    "Alkoller: Monoalkoller, Polialkoller (Glikol, Gliserin), Primer/Sekonder/Tersiyer Alkoller, Adlandırma ve Yükseltgenme Tepkimeleri",
                    "Eterler: Simetrik ve Asimetrik Eterler, Adlandırma, Fonksiyonel Grup İzomerliği (Alkol-Eter)",
                    "Karbonil Bileşikleri: Aldehitler ve Ketonlar, Adlandırma, Tollens ve Fehling ile İndirgenme/Yükseltgenme Reaksiyonları, Aldehit-Keton İzomerliği",
                    "Karboksilik Asitler: Monokarboksilik, Polikarboksilik, Oksi Asitler, Yağ Asitleri, Adlandırma ve Özellikleri",
                    "Esterler: Esterleşme Tepkimesi (Karboksilik Asit + Alkol), Adlandırma ve Asit-Ester İzomerliği"
                ],
                "Kazanımlar": [
                    "Hidrokarbonları (alkanlar, alkenler, alkinler ve aromatik bileşikler) adlandırır (IUPAC kuralları), tepkimelerini ve izomerlik türlerini inceler[cite: 1].",
                    "Fonksiyonel grupları tanır; alkolleri ve eterleri sınıflandırır, adlandırır ve fiziksel/kimyasal özelliklerini açıklar[cite: 1].",
                    "Aldehit ve ketonların özelliklerini, Tollens ve Fehling belirteçleriyle indirgenme-yükseltgenme tepkimelerini kavrar[cite: 1].",
                    "Karboksilik asitleri ve esterleri adlandırır; sabunlaşma, esterleşme tepkimelerini ve günlük yaşamdaki kullanım alanlarını açıklar[cite: 1]."
                ]
            },
            "4. Ünite: Enerji Kaynakları ve Bilimsel Gelişmeler": {
                "Konular": [
                    "Fosil Yakıtlar: Kömür Türleri, Ham Petrolün Damıtma Ürünleri, Doğal Gaz (LPG, CNG)",
                    "Fosil Yakıtların Çevreye Etkileri, Sera Etkisi, Asit Yağmurları ve Karbon Ayak İzi",
                    "Yenilenebilir Enerji Kaynakları: Biyokütle Enerjisi (Biyoetanol, Biyodizel), Jeotermal, Rüzgâr, Güneş ve Hidrojen Enerjisi",
                    "Bor Mineralleri, Bor Bileşiklerinin Kullanım Alanları ve Türkiye'nin Bor Potansiyeli",
                    "Yeşil Kimya (Sürdürülebilir Kimya) Prensipleri ve Atom Ekonomisi"
                ],
                "Kazanımlar": [
                    "Fosil yakıtların (kömür, petrol, doğal gaz) çevreye etkilerini ve sera gazı salınımını değerlendirir[cite: 1].",
                    "Yenilenebilir ve temiz enerji kaynaklarını (biyokütle, hidrojen enerjisi, bor mineralleri) karşılaştırır[cite: 1].",
                    "Yeşil kimya ilkelerini ve sürdürülebilir üretim süreçlerini tartışır[cite: 1]."
                ]
            }
        },
        "Biyoloji": {
            "1. Ünite: Genden Proteine": {
                "Konular": [
                    "Nükleik Asitlerin Keşfi (Griffith, Avery-MacLeod-McCarty, Hershey-Chase Deneyleri)",
                    "DNA ve RNA'nın Yapısı, Pürin ve Pirimidin Bazları, Fosfodiester Bağları",
                    "DNA'nın Yarı Korunumlu Eşlenmesi (Replikasyon), Meselson-Stahl Deneyi",
                    "Replikasyonda Görev Alan Enzimler: Helikaz, DNA Polimeraz, DNA Ligaz; Okazaki Parçacıkları",
                    "Genetik Şifre: Üçlü Şifreler (Kodon, Antikodon), Başlama ve Bitiş Kodonları",
                    "Protein Sentezi (Santral Doğma): Transkripsiyon (Yazılma - RNA Polimeraz) ve Translasyon (Okunma - Ribozom)",
                    "Genetik Mühendisliği, Rekombinant DNA Teknolojisi, Gen Klonlaması, Kök Hücre ve CRISPR-Cas9 Teknolojisi"
                ],
                "Kazanımlar": [
                    "Nükleik asitlerin (DNA ve RNA) yapısını, nükleotid dizilimlerini ve hücredeki işlevlerini açıklar[cite: 1].",
                    "DNA'nın yarı korunumlu eşlenmesini (Meselson-Stahl deneyi) ve replikasyon enzimlerini (helikaz, DNA polimeraz, ligaz) kavrar[cite: 1].",
                    "Genetik şifreyi, kodon-antikodon ilişkisini ve santral doğma (replikasyon, transkripsiyon, translasyon) sürecini modeller[cite: 1].",
                    "Gen klonlaması, CRISPR teknolojisi ve genetik mühendisliğinin etik boyutlarını değerlendirir[cite: 1]."
                ]
            },
            "2. Ünite: Canlılarda Enerji Dönüşümleri": {
                "Konular": [
                    "Canlılık ve Enerji: ATP Molekülünün Yapısı, Fosforilasyon Türleri (Substrat Düzeyinde, Oksidatif, Fotofosforilasyon)",
                    "Fotosentez: Kloroplastın Yapısı (Grana ve Stroma), Fotosentez Pigmentleri (Klorofil, Karotenoitler), Engelmann Deneyi",
                    "Fotosentez Reaksiyonları: Işığa Bağımlı Reaksiyonlar (Fotoliz, ETS, ATP ve NADPH Üretimi) ve Işıktan Bağımsız Reaksiyonlar (Calvin Döngüsü, PGAL ve Glikoz Sentezi)",
                    "Fotosentez Hızını Etkileyen Faktörler (Işık Şiddeti, Dalga Boyu, CO₂ Yoğunluğu, Sıcaklık) ve Kemosentez Olayı",
                    "Hücresel Solunum: Glikoliz Evresi (Sitoplazmada Ortak Evre), Pirüvat Oksidasyonu",
                    "Krebs Döngüsü (Mitokondri Matriksinde) ve Elektron Taşıma Sistemi (ETS - Oksidatif Fosforilasyon)",
                    "Oksijensiz Solunum ve Fermantasyon: Etil Alkol ve Laktik Asit Fermantasyonu"
                ],
                "Kazanımlar": [
                    "ATP'nin yapısını ve fosforilasyon çeşitlerini (substrat düzeyinde, oksidatif, fotofosforilasyon) açıklar[cite: 1].",
                    "Fotosentezin ışığa bağımlı ve ışıktan bağımsız (Calvin döngüsü) reaksiyonlarını, fotoliz olayını ve kloroplastın yapısını kavrar; kemosentezi fotosentezle karşılaştırır[cite: 1].",
                    "Hücresel solunum basamaklarını (glikoliz, pirüvat oksidasyonu, Krebs döngüsü, ETS) ve ATP kazancını analiz eder[cite: 1].",
                    "Oksijensiz solunum ve fermantasyon (laktik asit ve etil alkol) çeşitlerini hücresel solunumla karşılaştırır[cite: 1]."
                ]
            },
            "3. Ünite: Bitki Biyolojisi": {
                "Konular": [
                    "Bitkisel Dokular: Meristem Doku (Uç ve Yanal Meristem / Kambiyum)",
                    "Temel Doku (Parankima, Kollenkima, Sklerenkima), İletim Doku (Ksilem/Odun Boruları, Floem/Soymuk Boruları) ve Örtü Doku (Epidermis, Periderm, Stoma, Hidatot, Tüy, Lentisel)",
                    "Bitki Organları: Kök, Gövde (Tek Çenekli ve Çift Çenekli Bitkilerde Gövde Anatomisi) ve Yaprak Yapısı",
                    "Bitkilerde Su ve Mineral Taşınımı: Kök Basıncı, Kılcallık, Kohezyon-Gerilim Teorisi; Stomanın Açılıp Kapanma Mekanizması",
                    "Organik Maddelerin Taşınması: Basınç-Akış Teorisi (Kaynak ve Havuz Hücre İlişkisi)",
                    "Bitkisel Hormonlar: Oksin, Giberellin, Sitokinin, Etilen ve Absisik Asit (ABA)",
                    "Bitkilerde Hareket: Tropizma (Yönelim) ve Nasti (Irgalanma) Hareketleri, Fotoperiyodizm",
                    "Çiçekli Bitkilerde Eşeyli Üreme: Çiçeğin Yapısı, Mikrospor ve Megaspor Oluşumu, Tozlaşma, Çifte Döllenme, Tohum ve Meyve Oluşumu, Çimlenme Koşulları"
                ],
                "Kazanımlar": [
                    "Bitkisel dokuları (meristem, temel, iletim, örtü doku) ve görevlerini modeller üzerinde gösterir[cite: 1].",
                    "Bitkisel organların (kök, gövde, yaprak) anatomik yapısını inceler[cite: 1].",
                    "Bitkilerde su ve mineral taşınımını (kök basıncı, kohezyon-gerilim teorisi) ve organik madde taşınımını (basınç-akış teorisi) açıklar; stomanın açılıp kapanma mekanizmasını kavrar[cite: 1].",
                    "Bitkisel hormonları (oksin, giberellin, sitokinin, absisik asit, etilen) ve bitkilerde hareket çeşitlerini (tropizma, nasti) inceler; çiçekli bitkilerde üreme ve çimlenmeyi açıklar[cite: 1]."
                ]
            },
            "4. Ünite: Canlılar ve Çevre": {
                "Konular": [
                    "Popülasyon Genetiği ve Hardy-Weinberg Dengesi (Gen Frekanslarının Hesaplanması)",
                    "Gen Havuzunu Değiştiren Faktörler: Mutasyon, Göç, Genetik Sürüklenme, Rastgele Olmayan Evlilikler ve Doğal Seçilim",
                    "Çevre Şartlarının Gen İşleyişine Etkisi (Epigenetik Mekanizmalar)",
                    "Sürdürülebilir Hayat ve Biyoçeşitliliğin Korunmasına Yönelik Küresel Stratejiler"
                ],
                "Kazanımlar": [
                    "Popülasyon genetiğinde Hardy-Weinberg kuralını ve gen havuzunu değiştiren faktörleri açıklar[cite: 1].",
                    "Çevre koşullarının genlerin işleyişine ve fenotipe etkisini (epigenetik) değerlendirir[cite: 1].",
                    "Biyoçeşitliliğin korunması ve küresel çevre felaketlerine karşı sürdürülebilir biyo-stratejiler geliştirir[cite: 1]."
                ]
            }
        },
        "T.C. İnkılap Tarihi ve Atatürkçülük": {
            "1. Ünite: 20. Yüzyıl Başlarında Osmanlı Devleti ve Dünya": {
                "Konular": [
                    "20. Yüzyıl Başlarında Osmanlı Devleti'nin Siyasi Buhranları, Trablusgarp ve Balkan Savaşları",
                    "I. Dünya Savaşı'nın Nedenleri, İttifak ve İtilaf Blokları, Osmanlı'nın Savaşa Girişi",
                    "Osmanlı Cepheleri: Çanakkale, Kafkas, Kanal, Hicaz-Yemen ve Irak Cepheleri",
                    "Mustafa Kemal'in Askerî Başarıları ve Millî Mücadele'ye Zihinsel Hazırlık Evresi"
                ],
                "Kazanımlar": [
                    "20. yüzyıl başlarında Osmanlı Devleti'nin siyasi buhranlarını, Trablusgarp ve Balkan Savaşları'nı analiz eder[cite: 1].",
                    "I. Dünya Savaşı'nın genel ve özel sebeplerini, Osmanlı'nın savaşa giriş gerekçelerini inceler[cite: 1].",
                    "I. Dünya Savaşı'nda Osmanlı ordusunun savaştığı cepheleri ve Çanakkale Zaferi'nin küresel etkilerini değerlendirir[cite: 1].",
                    "Mustafa Kemal'in askerlik dehasını sergilediği görevleri ve Millî Mücadele'ye hazırlık evresini kavrar[cite: 1]."
                ]
            },
            "2. Ünite: Millî Mücadele": {
                "Konular": [
                    "Mondros Ateşkesi ve İşgaller Karşısında Kuvâ-yı Millîye Hareketi",
                    "Genelgeler ve Kongreler: Amasya, Erzurum ve Sivas Kongreleri ile Millî İrade",
                    "Misak-ı Millî ve BMM'nin Açılması, Ayaklanmalar ve İstiklal Mahkemeleri",
                    "Kurtuluş Savaşı Cepheleri: Doğu, Güney ve Batı Cephesi Muharebeleri",
                    "Sakarya Zaferi, Büyük Taarruz, Mudanya Ateşkesi ve Lozan Barış Antlaşması"
                ],
                "Kazanımlar": [
                    "Mondros Ateşkesi sonrası işgallere karşı oluşan yerel cemiyetleri ve Kuvâ-yı Millîye hareketini açıklar[cite: 1].",
                    "Amasya Genelgesi, Erzurum ve Sivas Kongreleri ile ulusal egemenlik ve tam bağımsızlık fikrinin olgunlaşmasını analiz eder[cite: 1].",
                    "Misak-ı Millî kararlarını, TBMM'nin açılışını ve TBMM'ye karşı çıkarılan isyanları değerlendirir[cite: 1].",
                    "Doğu, Güney ve Batı cephelerindeki askeri mücadeleleri, Sakarya Zaferi'ni ve Büyük Taarruz'u tahlil eder; Lozan Barış Antlaşması'nı siyasi zafer olarak değerlendirir[cite: 1]."
                ]
            },
            "3. Ünite: Atatürkçülük ve Türk İnkılabı": {
                "Konular": [
                    "Atatürk İlkeleri: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık",
                    "Siyasal İnkılaplar: Saltanatın Kaldırılması, Cumhuriyetin İlanı, Halifeliğin Kaldırılması",
                    "Hukuk İnkılabı: Türk Medeni Kanunu ve Anayasa Hareketleri",
                    "Eğitim, Kültür, Toplumsal ve Ekonomik Alanda Çağdaşlaşma Adımları"
                ],
                "Kazanımlar": [
                    "Atatürk ilkelerini (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık) bütüncül olarak kavrar[cite: 1].",
                    "Siyasal alanda saltanatın ve halifeliğin kaldırılmasını, cumhuriyetin ilanını açıklar[cite: 1].",
                    "Hukuk alanında Türk Medeni Kanunu'nun ve anayasaların kabulünü toplumsal eşitlik açısından değerlendirir[cite: 1].",
                    "Eğitim, kültür ve ekonomi alanlarında yapılan inkılapların çağdaş Türk toplumunun inşasındaki rolünü açıklar[cite: 1]."
                ]
            },
            "4. Ünite: İki Savaş Arasındaki Dönemde Türkiye ve Dünya": {
                "Konular": [
                    "Atatürk Dönemi Dış Politikasının Temel İlkeleri ('Yurtta sulh, cihanda sulh')",
                    "Musul Meselesi, Nüfus Mübadelesi ve Milletler Cemiyeti'ne Giriş",
                    "Balkan Antantı, Sadabat Paktı ve Montrö Boğazlar Sözleşmesi",
                    "Hatay'ın Ana Vatana Katılması ve 1929 Dünya Ekonomik Buhranı (Büyük Buhran)"
                ],
                "Kazanımlar": [
                    "Atatürk dönemi dış politikasının barışçıl ve gerçekçi ilkelerini ('Yurtta sulh, cihanda sulh') analiz eder[cite: 1].",
                    "Balkan Antantı ve Sadabat Paktı'nın bölgesel barışa katkısını açıklar[cite: 1].",
                    "Montrö Boğazlar Sözleşmesi ile Boğazlar üzerinde tam Türk hâkimiyetinin kurulmasını ve Hatay'ın ana vatana katılması sürecini kavrar[cite: 1].",
                    "1929 Dünya Ekonomik Buhranı'nın Türkiye ve dünya ekonomisine etkilerini değerlendirir[cite: 1]."
                ]
            },
            "5. Ünite: II. Dünya Savaşı Sürecinde Türkiye ve Dünya": {
                "Konular": [
                    "II. Dünya Savaşı'nın Nedenleri, Mihver ve Müttefik Blokları, Savaşın Seyri",
                    "Türkiye'nin Savaş Yıllarında Uyguladığı Aktif Tarafsızlık ve Denge Diplomasisi",
                    "Savaş Döneminde Türkiye'de Sosyoekonomik Hayat (Varlık Vergisi, Millî Korunma Kanunu)",
                    "Savaşın Sonuçları ve Birleşmiş Milletler Teşkilatının Kuruluşu"
                ],
                "Kazanımlar": [
                    "II. Dünya Savaşı'nın nedenlerini, Mihver ve Müttefik devletler bloklarını ve savaşın gidişatını inceler[cite: 1].",
                    "Türkiye'nin savaş boyunca uyguladığı çok yönlü aktif tarafsızlık ve diplomasi politikasını değerlendirir[cite: 1].",
                    "Savaş yıllarında Türkiye'deki ekonomik sıkıntıları, Varlık Vergisi ve Millî Korunma Kanunu uygulamalarını açıklar[cite: 1].",
                    "Savaşın küresel sonuçlarını, Birleşmiş Milletler'in kuruluşunu ve insan hakları ihlallerini tartışır[cite: 1]."
                ]
            },
            "6. Ünite: II. Dünya Savaşı Sonrasında Türkiye ve Dünya": {
                "Konular": [
                    "Soğuk Savaş Döneminin Başlaması: Doğu (Varşova Paktı) ve Batı (NATO) Blokları",
                    "Truman Doktrini, Marshall Planı ve Türkiye'nin NATO'ya Girişi (Kore Savaşı)",
                    "Türkiye'de Çok Partili Siyasi Hayata Geçiş ve Demokrat Parti Dönemi",
                    "1950'li Yıllarda Türkiye'deki Ekonomik, Sosyal ve Kültürel Dönüşüm"
                ],
                "Kazanımlar": [
                    "Soğuk Savaş döneminin başlamasını, Doğu ve Batı bloklarının oluşumunu (NATO ve Varşova Paktı) kavrar[cite: 1].",
                    "Türkiye'nin NATO'ya giriş sürecini ve Kore Savaşı'na katılımını değerlendirir[cite: 1].",
                    "Türkiye'de çok partili hayata geçişi ve 1950 seçimleriyle Demokrat Parti döneminin başlamasını analiz eder[cite: 1].",
                    "1950'li yıllarda Türkiye'deki ekonomik, sosyal ve kültürel dönüşümleri inceler[cite: 1]."
                ]
            },
            "7. Ünite: Toplumsal Devrim Çağında Dünya ve Türkiye": {
                "Konular": [
                    "1960-1990 Yılları Arasında Türkiye'de Siyasi Hayat ve Anayasalar (1961 ve 1982 Anayasaları)",
                    "1974 Kıbrıs Barış Harekâtı ve Ege Adaları / Kıta Sahanlığı Sorunu",
                    "Yumuşama (Detant) Dönemi ve Bağlantısızlar Hareketi",
                    "Türkiye'de Sanayileşme, İç-Dış Göçler ve Kentleşme Süreci"
                ],
                "Kazanımlar": [
                    "1960-1990 arası dönemde Türkiye'deki siyasi dalgalanmaları ve 1961/1982 anayasalarını karşılaştırır[cite: 1].",
                    "Kıbrıs Barış Harekâtı'nın (1974) nedenlerini, seyrini ve Türk dış politikasındaki yerini değerlendirir[cite: 1].",
                    "Bağlantısızlar Hareketi ve nükleer silahlanma yarışının uluslararası ilişkilere etkilerini kavrar[cite: 1].",
                    "Türkiye'de sanayileşme, iç göç, gecekondu kültürü ve edebiyat/sanat hayatındaki gelişmeleri inceler[cite: 1]."
                ]
            },
            "8. Ünite: 21. Yüzyılın Eşiğinde Türkiye ve Dünya": {
                "Konular": [
                    "SSCB'nin Dağılması ve Bağımsız Türk Cumhuriyetlerinin Kurulması (Azerbaycan, Kazakistan, Özbekistan, Türkmenistan, Kırgızistan)",
                    "Balkanlar ve Orta Doğu'da Krizler: Bosna Savaşı, Körfez Savaşları ve Filistin Sorunu",
                    "Avrupa Birliği ile Türkiye İlişkileri ve Gümrük Birliği",
                    "Bilişim Çağı, İnternet Devrimi, Yapay Zekâ ve Türkiye'nin Vizyon Projeleri"
                ],
                "Kazanımlar": [
                    "Sovyetler Birliği'nin dağılması, Türk cumhuriyetlerinin bağımsızlığını kazanması ve Türkiye ile ilişkilerini analiz eder[cite: 1].",
                    "Balkanlar ve Orta Doğu'daki krizleri (Bosna Savaşı, Körfez Savaşları) ve Türkiye'nin bölgesel rolünü kavrar[cite: 1].",
                    "Küreselleşme, bilgi ve iletişim teknolojileri devrimi ile yapay zekanın 21. yüzyıla etkilerini açıklar[cite: 1].",
                    "Türkiye'nin jeopolitik konumunun önemini, vizyoner atılımlarını ve uluslararası arenadaki misyonunu değerlendirir[cite: 1]."
                ]
            }
        },
        "Coğrafya": {
            "1. Ünite: Ekstrem Doğa Olayları ve Doğal Sistemler": {
                "Konular": [
                    "Ekstrem Doğa Olaylarının Tanımı: Jeolojik, Jeomorfolojik ve Klimatik Ekstremler",
                    "Geleceğe Yönelik Küresel İklim Senaryoları ve Ekosistemlerin Tepkisi",
                    "Doğadaki Madde Döngülerine İnsan Müdahalesi ve Karbon Salınımı"
                ],
                "Kazanımlar": [
                    "Ekstrem doğa olaylarının (meteorolojik, jeolojik, hidrolojik) oluşum nedenlerini ve küresel etkilerini değerlendirir[cite: 1].",
                    "Geleceğe yönelik iklim senaryolarını ve ekosistemlerin bu değişimlere tepkisini açıklar[cite: 1].",
                    "Doğadaki karbon ve hidrolojik döngüdeki insan müdahalelerini analiz eder[cite: 1]."
                ]
            },
            "2. Ünite: Küresel Ticaret ve Bölgesel Kalkınma Projeleri": {
                "Konular": [
                    "Dünyadaki Önemli Hammadde, Sanayi Üretimi ve Tüketim Havzaları",
                    "Uluslararası Ticaret Hatları, Boğazlar ve Kanallar (Süveyş, Panama, Malakka, Hürmüz, Cebelitarık)",
                    "Türkiye'nin Bölgesel Kalkınma Projeleri (GAP, DAP, KOP, DOKAP) ve Uygulama Aşamaları"
                ],
                "Kazanımlar": [
                    "Dünyadaki önemli sanayi, hammadde ve üretim bölgelerini harita üzerinde çözümler[cite: 1].",
                    "Türkiye'nin bölgesel kalkınma projelerini (GAP, DAP, DOKAP, ZBK, KOP) hedefleri ve etkileri yönünden inceler[cite: 1].",
                    "Uluslararası ulaşım hatlarının (boğazlar, kanallar, boru hatları) jeopolitik önemini kavrar[cite: 1]."
                ]
            },
            "3. Ünite: Çevre ve Toplum (Küresel Sorunlar)": {
                "Konular": [
                    "Küresel Çevre Tehditleri: Sera Etkisi, Ozon Seyrelmesi, Asit Yağmurları ve Nükleer Kirlilik",
                    "Doğal Kaynakların Gelecek Nesillere Aktarımı ve Çevre Etiği",
                    "Uluslararası Çevre Sözleşmeleri (Kyoto Protokolü, Paris İklim Anlaşması)"
                ],
                "Kazanımlar": [
                    "Çevre kirliliğinin küresel boyutlarını (asit yağmurları, radyoaktif atıklar, ozon tabakası) ve uluslararası çevre sözleşmelerini tartışır[cite: 1].",
                    "Doğal kaynakların sürdürülebilir kullanımı ve gelecek nesillere aktarımı için çevre etiğini savunur[cite: 1]."
                ]
            }
        },
        "Felsefe": {
            "1. Ünite: 20. Yüzyıl Felsefesi": {
                "Konular": [
                    "20. Yüzyıl Felsefesinin Tarihsel ve Entelektüel Arka Planı",
                    "Ana Akımlar: Fenomenoloji (Husserl), Varoluşçuluk (Sartre, Heidegger), Mantıkçı Pozitivizm (Carnap), Hermeneutik (Dilthey, Gadamer), Diyalektik Materyalizm (Marx)",
                    "Dönem Filozoflarının Metin Tahlilleri"
                ],
                "Kazanımlar": [
                    "20. yüzyıl felsefesinin tarihsel ve toplumsal arka planını inceler[cite: 1].",
                    "Dönemin temel akımlarını (fenomenoloji, mantıkçı pozitivizm, varoluşçuluk, hermeneutik, diyalektik materyalizm) ayırt eder[cite: 1].",
                    "Dönem filozoflarının (Husserl, Sartre, Nietzsche, Wittgenstein, Heidegger) görüşlerini metinlerle tahlil eder[cite: 1]."
                ]
            },
            "2. Ünite: Felsefi Metin Analizi ve Akıl Yürütme": {
                "Konular": [
                    "Felsefi Argümanların Tutarlılık, Geçerlilik ve Temellendirme Açısından Çözümlenmesi",
                    "Varoluş, Bireysel Özgürlük, Yabancılaşma ve Adalet Problemleri"
                ],
                "Kazanımlar": [
                    "Felsefi argümanları, tutarlılık, geçerlilik ve temellendirme ilkelerine göre değerlendirir[cite: 1].",
                    "Varoluş, özgürlük, yabancılaşma ve insan hakları kavramlarını felsefi metinler üzerinden tartışır[cite: 1]."
                ]
            },
            "3. Ünite: Felsefenin Güncel Hayattaki Rolü": {
                "Konular": [
                    "Yapay Zekâ Etiği, Biyoetik ve Çevre Felsefesi",
                    "Enformasyon Çağında Dezenformasyon ve Eleştirel Düşünme Becerisi"
                ],
                "Kazanımlar": [
                    "Yapay zeka etiği, çevre etiği ve biyoetik gibi çağdaş sorunlara felsefi bakış açısı getirir[cite: 1].",
                    "Kritik düşünme becerisinin dezenformasyon ve manipülasyonla mücadeledeki önemini kavrar[cite: 1]."
                ]
            }
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: İslam ve Bilim": {
                "Konular": [
                    "İslam Medeniyetinde Bilimsel Düşüncenin Temelleri ve Kur'an'ın Akla Verdiği Önem",
                    "Müslüman Bilim İnsanları ve İnsanlığa Hizmetleri (İbn-i Sina, Harezmi, Biruni, Ali Kuşçu, Cezeri)",
                    "Tarihteki Önemli İlim Merkezleri: Beytü'l-Hikme, Rasathaneler ve Medreseler"
                ],
                "Kazanımlar": [
                    "İslam medeniyetinde bilim ve düşüncenin gelişimini (Beytü'l-Hikme, rasathaneler) inceler[cite: 1].",
                    "Müslüman bilim insanlarının (İbn-i Sina, Harezmi, Ali Kuşçu, Biruni, Katip Çelebi vb.) dünya bilimine katkılarını açıklar[cite: 1].",
                    "Kur'an'ın akla, araştırmaya ve evreni incelemeye verdiği önemi ayetlerle değerlendirir[cite: 1]."
                ]
            },
            "2. Ünite: Anadolu'da İslam ve Tasavvuf": {
                "Konular": [
                    "Anadolu'nun İslamlaşmasında Horasan Erenlerinin Rolü",
                    "Ahilik Teşkilatı: Ahlak, Üretim ve Sosyal Dayanışma",
                    "Gönül Erleri: Yunus Emre, Mevlana, Hacı Bektaş Veli, Ahi Evran ve Hacı Bayram Veli'nin Evrensel Mesajları"
                ],
                "Kazanımlar": [
                    "Anadolu'nun İslamlaşmasında Horasan erenlerinin ve mutasavvıfların rolünü kavrar[cite: 1].",
                    "Ahilik teşkilatının ahlaki ve iktisadi ilkelerini analiz eder[cite: 1].",
                    "Hacı Bektaş Veli, Yunus Emre, Mevlana ve Ahi Evran'ın evrensel sevgi, hoşgörü ve barış mesajlarını değerlendirir[cite: 1]."
                ]
            },
            "3. Ünite: Güncel Dini Meseleler": {
                "Konular": [
                    "Dini Hükümlerin Kaynakları ve Güncel Meselelere Çözüm Arayışı",
                    "Tıbbi Konularda Dini Görüşler: Organ Nakli, Kan Bağışı, Ötenazi",
                    "İktisadi Konularda Dini İlkeler: Haksız Kazanç, Borsa, Faizsiz Bankacılık",
                    "Gıda ve Tüketim Ahlakı, Helal Gıda Standartları"
                ],
                "Kazanımlar": [
                    "İslam fıkhının yeni gelişen tıbbi ve ekonomik meselelere yaklaşım ilkelerini açıklar.",
                    "Organ bağışı ve kan naklinin canı koruma ilkesi doğrultusundaki dini hükmünü kavrar.",
                    "Ticaret ve finansal işlemlerde helal kazanç, adalet ve hakkaniyet ilkelerini gözetir."
                ]
            },
            "4. Ünite: Hint ve Doğu Asya Dinleri": {
                "Konular": [
                    "Hinduizm: İnanç Esasları, Kast Sistemi, Reenkarnasyon (Karma ve Samsara)",
                    "Budizm: Siddhartha Gautama, Dört Yüce Hakikat, Sekiz Katlı Asil Yol, Nirvana",
                    "Konfüçyanizm ve Taoizm'in Temel Ahlaki İlkeleri (Yin-Yang)"
                ],
                "Kazanımlar": [
                    "Hinduizm ve Budizm'in inanç sistemlerini ve ritüellerini ana hatlarıyla açıklar.",
                    "Doğu Asya dinlerindeki ahlaki öğretileri İslam'ın tevhit anlayışıyla karşılaştırarak değerlendirir."
                ]
            }
        },
        "İngilizce": {
            "Unit 1: Music": {
                "Konular": [
                    "Musical Genres, Acoustic Variations, and Cultural Rhythms",
                    "Expressing Past Habits and Former Lifestyles with 'Used to'",
                    "Writing a Formal Music and Concert Album Review"
                ],
                "Kazanımlar": [
                    "Expressing personal opinions about musical genres, singers and rhythm[cite: 1].",
                    "Stating past habits and preferences using 'used to' and past simple[cite: 1].",
                    "Writing a review of a concert or music album[cite: 1]."
                ]
            },
            "Unit 2: Friendship": {
                "Konular": [
                    "Interpersonal Dynamics, Conflict Resolution, and Loyalty",
                    "Expressing Hypothetical Regrets and Unreal Conditions (Conditionals Type 2 and 3, Wish Clauses)",
                    "Writing an Empathetic Advice Column Response"
                ],
                "Kazanımlar": [
                    "Analyzing interpersonal relationships, conflict resolution and empathy[cite: 1].",
                    "Expressing regrets and hypothetical wishes using conditional forms (Type 2/3, wish clauses)[cite: 1].",
                    "Writing an advice column for relationship problems[cite: 1]."
                ]
            },
            "Unit 3: Human Rights": {
                "Konular": [
                    "Universal Human Rights, Civil Liberties, and Gender Equality",
                    "Reported Speech: Statements, Commands, and Inquiries",
                    "Delivering a Persuasive Oratorical Speech on Equity"
                ],
                "Kazanımlar": [
                    "Discussing universal human rights, equality and social justice[cite: 1].",
                    "Reporting speech and thoughts accurately (reported speech)[cite: 1].",
                    "Delivering a persuasive speech on equality and freedom[cite: 1]."
                ]
            },
            "Unit 4: Coming Soon": {
                "Konular": [
                    "Futuristic Cybernetics, Space Colonies, and Quantum Computing",
                    "Advanced Future Aspect Tenses (Future Perfect, Future Continuous)",
                    "Composing a Science-Fiction Synopsis and Technological Forecast"
                ],
                "Kazanımlar": [
                    "Talking about futuristic predictions, space colonization and cybernetic advancements[cite: 1].",
                    "Using future perfect and future continuous tenses appropriately[cite: 1].",
                    "Writing a sci-fi movie pitch or technological foresight essay[cite: 1]."
                ]
            },
            "Unit 5: Alternative Energy": {
                "Konular": [
                    "Renewable Energy Systems and Global Carbon Quotas",
                    "Passive Voice Structures in Ecological and Technical Reports",
                    "Designing an Actionable Sustainable Campus Proposal"
                ],
                "Kazanımlar": [
                    "Discussing renewable energy resources and ecological footprints[cite: 1].",
                    "Expressing causes and effects of industrial pollution using passive voice[cite: 1].",
                    "Designing an eco-friendly project presentation in English[cite: 1]."
                ]
            },
            "Unit 6: Technology": {
                "Konular": [
                    "Technological Breakthroughs, Nanotechnology, and Smart Systems",
                    "Expressing Conditions and Hypothetical Situations",
                    "Composing an Analytical Essay on Technological Ethics"
                ],
                "Kazanımlar": [
                    "Teknolojik gelişmelerin avantaj ve dezavantajlarını karmaşık yapılarla tartışır.",
                    "Teknoloji bağımlılığı ve yapay zekâ etiği üzerine argümanlar geliştirir.",
                    "Teknolojik bir cihazın veya buluşun çalışma basamaklarını tanıtır."
                ]
            }
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: İleri Spor Becerileri ve Liderlik": {
                "Konular": [
                    "Seçilen Spor Branşında İleri Düzey Taktik Uygulamalar",
                    "Müsabaka Yönetimi, Hakemlik Kuralları ve Organizasyon Becerileri",
                    "Spor Psikolojisi, Stres Yönetimi ve Centilmenlik"
                ],
                "Kazanımlar": [
                    "Seçilen bir spor branşında ileri seviye teknik ve taktikleri uygular[cite: 1].",
                    "Müsabaka yönetimi, hakemlik kuralları ve organizasyon becerilerini deneyimler[cite: 1].",
                    "Spor psikolojisini ve stres yönetimini müsabakalarda kullanır[cite: 1]."
                ]
            },
            "2. Ünite: Yaşam Boyu Sağlık ve Antrenman İlkeleri": {
                "Konular": [
                    "Kişisel Antrenman ve Fitness Programı Tasarlama",
                    "Masa Başı Ergonomisi ve Postür Bozukluklarını Önleme Egzersizleri",
                    "Sedanter Yaşama Karşı Fiziksel Aktivite Alışkanlığı"
                ],
                "Kazanımlar": [
                    "Kişisel antrenman programı tasarlar ve dönemsel gelişimini takip eder[cite: 1].",
                    "Ergonomi, omurga sağlığı ve masa başı egzersizlerini günlük hayatına entegre eder[cite: 1]."
                ]
            }
        },
        "Görsel Sanatlar / Müzik": {
            "1. Ünite: Sanatsal İfade ve Bireysel Üslup": {
                "Konular": [
                    "Özgün Sanatsal Portfolyo Oluşturma",
                    "Geleneksel ve Çağdaş Sanat Tekniklerinin Hibrit Kullanımı",
                    "Sergileme, Küratörlük ve Sanat Yönetimi Süreçleri"
                ],
                "Kazanımlar": [
                    "Kendi sanatsal vizyonunu yansıtan özgün bir portfolyo oluşturur[cite: 1].",
                    "Geleneksel ve çağdaş teknikleri bir arada kullanarak melez eserler tasarlar[cite: 1].",
                    "Sanat eserini sergileme ve küratörlük süreçlerini kavrar[cite: 1]."
                ]
            },
            "2. Ünite: Sanat, Estetik ve Toplumsal Yansıma": {
                "Konular": [
                    "Sanatın Toplumsal Hafıza ve Değişimdeki Rolü",
                    "Estetik Felsefesi Açısından Başyapıt Tahlilleri",
                    "Müziksel Eserlerin Çok Sesli Form Çözümlemesi"
                ],
                "Kazanımlar": [
                    "Sanatın toplumsal hafızayı diri tutma işlevini tarihi örneklerle açıklar[cite: 1].",
                    "Estetik felsefesi ilkelerine göre sanat eserlerini derinlemesine çözümler[cite: 1]."
                ]
            }
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "1. Ünite: Alltag und Medien / La vie quotidienne": {
                "Konular": [
                    "Günlük rutinleri",
                    "Karmaşık cümle yapılarıyla geçmişte yapılan etkinlikleri anlatır",
                    "Kısa haber metinlerini ve duyuruları anlar"
                ],
                "Kazanımlar": [
                    "Günlük rutinleri, medya kullanımını ve dijital alışkanlıkları ikinci yabancı dilde ifade eder.",
                    "Karmaşık cümle yapılarıyla geçmişte yapılan etkinlikleri anlatır.",
                    "Kısa haber metinlerini ve duyuruları anlar."
                ]
            },
            "2. Ünite: Zukunft und Beruf / L'avenir et la carrière": {
                "Konular": [
                    "Gelecek planları",
                    "İş başvurusu",
                    "Kültürlerarası iletişimde nezaket kurallarını gözetir"
                ],
                "Kazanımlar": [
                    "Gelecek planları, üniversite tercihleri ve mesleki ideallerini ifade eder.",
                    "İş başvurusu, özgeçmiş hazırlama ve e-posta yazışma kalıplarını uygular.",
                    "Kültürlerarası iletişimde nezaket kurallarını gözetir."
                ]
            }
        },
        "Seçmeli Psikoloji / Sosyoloji": {
            "1. Ünite: Sosyal Psikoloji ve Birey": {
                "Konular": [
                    "Tutumlar",
                    "Bireyin toplum içindeki rolünü ve sosyal kimlik kuramını inceler",
                    "İletişim çatışmalarının psikolojik dinamiklerini ve empatiyi değerlendirir"
                ],
                "Kazanımlar": [
                    "Tutumlar, ön yargılar, grup dinamikleri ve sosyal etki kavramlarını açıklar.",
                    "Bireyin toplum içindeki rolünü ve sosyal kimlik kuramını inceler.",
                    "İletişim çatışmalarının psikolojik dinamiklerini ve empatiyi değerlendirir."
                ]
            },
            "2. Ünite: Kültür, Toplum ve Değişme": {
                "Konular": [
                    "Toplumsal tabakalaşma",
                    "Toplumsal kurumları (aile",
                    "Çağdaş sosyolojik araştırmaların yöntem ve tekniklerini kavrar"
                ],
                "Kazanımlar": [
                    "Toplumsal tabakalaşma, hareketlilik ve küreselleşmenin etkilerini tartışır.",
                    "Toplumsal kurumları (aile, eğitim, ekonomi, din) ve işlevlerini sosyolojik açıdan tahlil eder.",
                    "Çağdaş sosyolojik araştırmaların yöntem ve tekniklerini kavrar."
                ]
            }
        },
        "Seçmeli Bilgisayar Bilimi": {
            "1. Ünite: İleri Yazılım ve Proje Geliştirme": {
                "Konular": [
                    "Nesne yönelimli programlama (OOP) ve modern yazılım mimarilerini uygular",
                    "Veritabanı tasarımı (SQL/NoSQL) ve API entegrasyonu gerçekleştirir",
                    "Yazılım yaşam döngüsüne (SDLC) uygun bir dönem sonu projesi geliştirir"
                ],
                "Kazanımlar": [
                    "Nesne yönelimli programlama (OOP) ve modern yazılım mimarilerini uygular.",
                    "Veritabanı tasarımı (SQL/NoSQL) ve API entegrasyonu gerçekleştirir.",
                    "Yazılım yaşam döngüsüne (SDLC) uygun bir dönem sonu projesi geliştirir."
                ]
            },
            "2. Ünite: Yeni Nesil Teknolojiler ve Güvenlik": {
                "Konular": [
                    "Yapay zeka modellerini",
                    "Siber güvenlik protokolleri",
                    "Yazılım etiği ve lisanslama modellerini değerlendirir"
                ],
                "Kazanımlar": [
                    "Yapay zeka modellerini, büyük veri analitiğini ve veri görselleştirmeyi kavrar.",
                    "Siber güvenlik protokolleri, kriptografi ve güvenli kod yazma standartlarını uygular.",
                    "Yazılım etiği ve lisanslama modellerini değerlendirir."
                ]
            }
        }
    }
};


function toggleInputMode() {
    const mode = document.querySelector('input[name="input-mode"]:checked').value;
    if (mode === 'mufredat') {
        document.getElementById('mufredat-container').style.display = 'grid';
        document.getElementById('serbest-container').style.display = 'none';
    } else {
        document.getElementById('mufredat-container').style.display = 'none';
        document.getElementById('serbest-container').style.display = 'grid';
    }
}

function initMufredat() {
    const classSelect = document.getElementById('mufredat-class');
    if (!classSelect) return;
    classSelect.innerHTML = '<option value="">Sınıf Seçin...</option>';
    Object.keys(curriculumData).forEach(function (c) {
        classSelect.innerHTML += '<option value="' + c + '">' + c + '</option>';
    });
}

function getNewModelNaming() {
    const selectedRadio = document.querySelector('input[name="new-model-naming"]:checked');
    return selectedRadio ? selectedRadio.value : (localStorage.getItem('preferredNewModelNaming') || 'tema');
}

function isNewModelClass(classVal) {
    if (!classVal) return false;
    return ["1. ", "2. ", "3. ", "5. ", "6. ", "7. ", "9. ", "10. ", "11. "].some(prefix => classVal.startsWith(prefix));
}

function updateMufredatTerminology() {
    const classVal = document.getElementById('mufredat-class').value;
    if (!isNewModelClass(classVal)) return;

    const naming = getNewModelNaming();
    try { localStorage.setItem('preferredNewModelNaming', naming); } catch (e) {}

    const uniteSelect = document.getElementById('mufredat-unite');
    const konuSelect = document.getElementById('mufredat-konu');
    const dersVal = document.getElementById('mufredat-ders').value;
    const currentUniteVal = uniteSelect.value;

    const uniteLabel = naming === 'tema' ? 'Tema / Alan Becerisi:' : 'Ünite / Alan Becerisi:';
    if (uniteSelect.previousElementSibling) uniteSelect.previousElementSibling.innerHTML = uniteLabel;
    if (konuSelect.previousElementSibling) konuSelect.previousElementSibling.innerHTML = 'Öğrenim Çıktısı / Konu:';

    if (dersVal && curriculumData[classVal] && curriculumData[classVal][dersVal]) {
        const unitePlaceholder = naming === 'tema' ? 'Tema Seçin...' : 'Ünite Seçin...';
        uniteSelect.innerHTML = '<option value="">' + unitePlaceholder + '</option>';
        Object.keys(curriculumData[classVal][dersVal]).forEach(function (uKey) {
            let displayText = uKey;
            if (naming === 'unite') {
                displayText = uKey.replace(/Tema/g, 'Ünite').replace(/tema/g, 'ünite');
            }
            uniteSelect.innerHTML += '<option value="' + uKey + '">' + displayText + '</option>';
        });
        uniteSelect.value = currentUniteVal;
    }
}

function updateMufredatDers() {
    const classVal = document.getElementById('mufredat-class').value;
    const dersSelect = document.getElementById('mufredat-ders');
    const uniteSelect = document.getElementById('mufredat-unite');
    const konuSelect = document.getElementById('mufredat-konu');
    const toggleDiv = document.getElementById('new-model-terminology-toggle');

    const isNewModel = isNewModelClass(classVal);
    if (toggleDiv) {
        toggleDiv.style.display = isNewModel ? 'flex' : 'none';
        const savedNaming = localStorage.getItem('preferredNewModelNaming') || 'tema';
        const targetRadio = document.querySelector(`input[name="new-model-naming"][value="${savedNaming}"]`);
        if (targetRadio) targetRadio.checked = true;
    }

    const naming = isNewModel ? getNewModelNaming() : 'unite';
    const uniteLabel = isNewModel ? (naming === 'tema' ? 'Tema / Alan Becerisi:' : 'Ünite / Alan Becerisi:') : 'Ünite:';
    const konuLabel = isNewModel ? 'Öğrenim Çıktısı / Konu:' : 'Kazanım / Konu:';

    if (uniteSelect.previousElementSibling) uniteSelect.previousElementSibling.innerHTML = uniteLabel;
    if (konuSelect.previousElementSibling) konuSelect.previousElementSibling.innerHTML = konuLabel;

    dersSelect.innerHTML = '<option value="">Ders Seçin...</option>';
    uniteSelect.innerHTML = '<option value="">Önce Ders Seçin...</option>';
    konuSelect.innerHTML = isNewModel ? (naming === 'tema' ? '<option value="">Önce Tema Seçin...</option>' : '<option value="">Önce Ünite Seçin...</option>') : '<option value="">Önce Ünite Seçin...</option>';

    dersSelect.disabled = !classVal;
    uniteSelect.disabled = true;
    konuSelect.disabled = true;

    if (classVal && curriculumData[classVal]) {
        Object.keys(curriculumData[classVal]).forEach(function (d) {
            dersSelect.innerHTML += '<option value="' + d + '">' + d + '</option>';
        });
    }
}

function updateMufredatUnite() {
    const classVal = document.getElementById('mufredat-class').value;
    const dersVal = document.getElementById('mufredat-ders').value;
    const uniteSelect = document.getElementById('mufredat-unite');
    const konuSelect = document.getElementById('mufredat-konu');

    const isNewModel = isNewModelClass(classVal);
    const naming = isNewModel ? getNewModelNaming() : 'unite';

    const unitePlaceholder = isNewModel ? (naming === 'tema' ? 'Tema Seçin...' : 'Ünite Seçin...') : 'Ünite Seçin...';
    const konuPlaceholder = isNewModel ? (naming === 'tema' ? 'Önce Tema Seçin...' : 'Önce Ünite Seçin...') : 'Önce Ünite Seçin...';

    uniteSelect.innerHTML = '<option value="">' + unitePlaceholder + '</option>';
    konuSelect.innerHTML = '<option value="">' + konuPlaceholder + '</option>';

    uniteSelect.disabled = !dersVal;
    konuSelect.disabled = true;

    if (dersVal && curriculumData[classVal] && curriculumData[classVal][dersVal]) {
        Object.keys(curriculumData[classVal][dersVal]).forEach(function (uKey) {
            let displayText = uKey;
            if (isNewModel && naming === 'unite') {
                displayText = uKey.replace(/Tema/g, 'Ünite').replace(/tema/g, 'ünite');
            }
            uniteSelect.innerHTML += '<option value="' + uKey + '">' + displayText + '</option>';
        });
    }
}

function updateMufredatKonu() {
    const classVal = document.getElementById('mufredat-class').value;
    const dersVal = document.getElementById('mufredat-ders').value;
    const uniteVal = document.getElementById('mufredat-unite').value;
    const konuSelect = document.getElementById('mufredat-konu');

    const isNewModel = isNewModelClass(classVal);

    if (isNewModel) {
        konuSelect.multiple = true;
        konuSelect.style.height = '140px';
        konuSelect.innerHTML = '<option value="" disabled>Birden fazla seçim yapabilirsiniz (Ctrl / Cmd ile)...</option>';
    } else {
        konuSelect.multiple = false;
        konuSelect.style.height = 'auto';
        Array.from(konuSelect.options).forEach(opt => opt.selected = false);
        konuSelect.innerHTML = '<option value="">Kazanım veya Konu Seçin...</option>';
    }
    
    konuSelect.disabled = !uniteVal;

    if (uniteVal && curriculumData[classVal] && curriculumData[classVal][dersVal] && curriculumData[classVal][dersVal][uniteVal]) {
        const uData = curriculumData[classVal][dersVal][uniteVal];
        const esc = (typeof window.escapeHTML === 'function') ? window.escapeHTML : function(s){ return String(s||''); };

        if (Array.isArray(uData)) {
            uData.forEach(function (k) {
                konuSelect.innerHTML += '<option value="' + esc(k) + '">' + esc(k) + '</option>';
            });
        } else if (typeof uData === 'object' && uData !== null) {
            const konular = Array.isArray(uData.Konular) ? uData.Konular : [];
            const ciktilar = Array.isArray(uData['Öğrenim Çıktıları'])
                ? uData['Öğrenim Çıktıları']
                : (Array.isArray(uData['Kazanımlar']) ? uData['Kazanımlar'] : []);

            if (konular.length > 0) {
                const og = document.createElement('optgroup');
                og.label = '📖 Alt Konular';
                konular.forEach(function (k) {
                    const opt = document.createElement('option');
                    opt.value = k;
                    opt.textContent = '🔹 ' + k;
                    og.appendChild(opt);
                });
                konuSelect.appendChild(og);
            }

            if (ciktilar.length > 0) {
                const og = document.createElement('optgroup');
                og.label = isNewModel ? '🎯 Öğrenim Çıktıları' : '🎯 Kazanımlar';
                ciktilar.forEach(function (c) {
                    const opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = '✔️ ' + c;
                    og.appendChild(opt);
                });
                konuSelect.appendChild(og);
            }
        }
    }
}

window.curriculumData = curriculumData;
window.getNewModelNaming = getNewModelNaming;
window.isNewModelClass = isNewModelClass;
window.updateMufredatTerminology = updateMufredatTerminology;
window.updateMufredatDers = updateMufredatDers;
window.updateMufredatUnite = updateMufredatUnite;
window.updateMufredatKonu = updateMufredatKonu;
window.toggleInputMode = toggleInputMode;
window.initMufredat = initMufredat;

document.addEventListener('DOMContentLoaded', initMufredat);

// ── Web 2.0 Materyal Motoru ──
function getWeb2Tools(dersAdi, konu) {
    const d = (dersAdi || '').toLocaleLowerCase('tr-TR');
    const k = (konu || '').toLocaleLowerCase('tr-TR');
    if (d.includes('matematik') || d.includes('geometri') || k.includes('grafik') || k.includes('fonksiyon')) return { araçlar: 'GeoGebra, Desmos', aciklama: 'GeoGebra ile 3D modelleme veya Desmos ile etkileşimli grafik analizi yapın.', link: 'https://www.geogebra.org' };
    if (d.includes('fen') || d.includes('fizik') || d.includes('kimya') || d.includes('biyoloji')) return { araçlar: 'PhET Simülasyonları', aciklama: 'PhET Interactive Simulations ile sanal laboratuvar deneyi gerçekleştirin.', link: 'https://phet.colorado.edu' };
    if (d.includes('tarih') || d.includes('coğrafya') || d.includes('sosyal')) return { araçlar: 'Google Earth, Timeline JS', aciklama: 'Google Earth üzerinden tarihi mekanlara sanal tur yapın veya Timeline JS ile kronoloji oluşturun.', link: 'https://www.google.com/earth' };
    if (d.includes('bilişim') || d.includes('kodlama') || d.includes('robotik') || d.includes('yazılım')) return { araçlar: 'Scratch, Tinkercad', aciklama: 'Scratch ile blok tabanlı kodlama veya Tinkercad ile 3D devre/model tasarımı yapın.', link: 'https://scratch.mit.edu' };
    if (d.includes('türk') || d.includes('edebiyat') || d.includes('dil')) return { araçlar: 'Padlet, Book Creator', aciklama: 'Padlet dijital panosunda fikir haritası veya Book Creator ile interaktif kitap oluşturun.', link: 'https://padlet.com' };
    if (d.includes('müzik') || d.includes('resim') || d.includes('sanat')) return { araçlar: 'Chrome Music Lab, Canva', aciklama: 'Chrome Music Lab ile müzik keşfi veya Canva ile görsel tasarım yapın.', link: 'https://musiclab.chromeexperiments.com' };
    return { araçlar: 'Padlet, Miro, Mentimeter', aciklama: 'Padlet veya Miro dijital panosu ile ortak fikir üretimi, Mentimeter ile anlık anket yapın.', link: 'https://www.mentimeter.com' };
}

// ── Konu Özeti Üretici ──
function getKonuOzeti(konu, dersAdi, unite) {
    const d = (dersAdi || '').toLocaleLowerCase('tr-TR');
    let kavramlar = [];
    let beceriler = [];
    let gunlukBag = '';

    if (d.includes('matematik') || d.includes('geometri')) {
        kavramlar = ['Temel tanım ve aksiyomlar', 'Formül ve işlem adımları', 'Grafik/şekil yorumlama'];
        beceriler = ['Analitik düşünme', 'Problem kurma ve çözme', 'Soyut kavramı somutlaştırma'];
        gunlukBag = 'Mühendislik hesapları, mimari tasarım, veri analizi';
    } else if (d.includes('fen') || d.includes('fizik') || d.includes('kimya') || d.includes('biyoloji')) {
        kavramlar = ['Temel kavram ve tanımlar', 'Neden-sonuç ilişkileri', 'Deney / gözlem bulguları'];
        beceriler = ['Bilimsel sorgulama', 'Hipotez kurma ve test etme', 'Veri yorumlama'];
        gunlukBag = 'Sağlık, çevre, teknoloji ve günlük yaşam uygulamaları';
    } else if (d.includes('tarih') || d.includes('coğrafya') || d.includes('sosyal')) {
        kavramlar = ['Temel olaylar ve tarihler', 'Neden-sonuç zincirleri', 'Coğrafi/toplumsal bağlam'];
        beceriler = ['Eleştirel okuma', 'Zaman ve mekân algısı', 'Empati ve perspektif alma'];
        gunlukBag = 'Güncel olayları tarihi perspektifle yorumlama';
    } else if (d.includes('bilişim') || d.includes('kodlama') || d.includes('robotik')) {
        kavramlar = ['Algoritma ve mantık yapısı', 'Kod sözdizimi ve kuralları', 'Hata ayıklama (Debug)'];
        beceriler = ['Computational thinking', 'Problem ayrıştırma', 'Özgün çözüm üretme'];
        gunlukBag = 'Yazılım geliştirme, otomasyon, yapay zeka temelleri';
    } else if (d.includes('türk') || d.includes('edebiyat') || d.includes('dil')) {
        kavramlar = ['Ana tema ve yan temalar', 'Edebi sanatlar ve türler', 'Dil bilgisi yapıları'];
        beceriler = ['Eleştirel okuma ve yazma', 'Sözel iletişim', 'Özgün üretim'];
        gunlukBag = 'Etkili iletişim, gazetecilik, dijital içerik üretimi';
    } else {
        kavramlar = ['Temel kavramlar ve tanımlar', 'Konu içi ilişkiler', 'Önemli çıkarımlar'];
        beceriler = ['Eleştirel düşünme', 'Analiz ve sentez', 'İşbirlikli öğrenme'];
        gunlukBag = 'Konu kapsamının günlük yaşam ve meslek hayatına yansımaları';
    }

    return { kavramlar, beceriler, gunlukBag };
}

// ── Exit Ticket Üretici ──
function getExitTickets(konu, dersAdi) {
    const d = (dersAdi || '').toLocaleLowerCase('tr-TR');
    const baseQ = `Bugün öğrendiğin "<strong>${konu}</strong>" kavramını 8 yaşındaki bir çocuğa nasıl açıklardın? Kağıda çiz veya yaz.`;
    const extraQ = d.includes('matematik') || d.includes('fizik') || d.includes('kimya')
        ? `"<strong>${konu}</strong>" konusunu içeren, günlük hayattan bir örnek problem yaz ve çöz.`
        : d.includes('tarih') || d.includes('coğrafya')
            ? `"<strong>${konu}</strong>" ile ilgili bugün öğrendiğin en şaşırtıcı bilgiyi bir arkadaşına aktarır gibi yaz.`
            : `"<strong>${konu}</strong>" konusunda hâlâ merak ettiğin bir soruyu yaz.`;
    return [baseQ, extraQ];
}


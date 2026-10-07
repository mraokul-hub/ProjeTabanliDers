// ============================================================
// curriculum.js
// MEB Türkiye Yüzyılı Maarif Modeli & Karma Yapı (Master Veritabanı)
// Kaynak: MEB 2024-2025 Ders Kitapları & TTKB Resmi Müfredat
// YENİ MODEL (Tema / Öğrenim Çıktısı): 1, 2, 3, 5, 6, 7, 9, 10, 11. Sınıflar
// ESKİ MODEL (Ünite / Kazanım): 4, 8, 12. Sınıflar (LGS, YKS ve İlkokul Geçiş)
// Güncelleme Tarihi: 2026-10-06
// ============================================================

const curriculumData = {
    "1. Sınıf": {
        "Türkçe": {
            "Güzel Davranışlarımız (Tema 1)": [
                "Dinleme kurallarını uygular ve metinden anlam çıkarır.",
                "İyi insan olma ve güzel davranışlarla ilgili metinleri anlar.",
                "Duygu ve düşüncelerini sözlü olarak ifade eder.",
                "Merhamet, mütevazılık, saygı değerlerini kavrar.",
                "İlk okuma-yazma: a, n, e, t harfleri ve 1-4 rakamları öğretilir."
            ],
            "Mustafa Kemal'den Atatürk'e (Tema 2)": [
                "Atatürk'ün hayatını anlatan metinleri anlar.",
                "Vatanseverlik, cesaret ve fedakârlık değerlerini kavrar.",
                "Dinlediklerini kendi yaşantısıyla karşılaştırarak anlamlandırır.",
                "Metnin konusunu belirler ve olayları sıralar.",
                "İlk okuma-yazma: i, l, o, k, u harfleri ve 5-0 rakamları öğretilir."
            ],
            "Çevremizdeki Yaşam (Tema 3)": [
                "Çevresindeki varlıkları gözlemler ve betimler.",
                "Okuma akıcılığını geliştirir.",
                "Söz varlığını zenginleştirir.",
                "Basit cümlelerle gözlemlerini yazar.",
                "Noktalama işaretlerini (nokta, soru işareti) doğru kullanır."
            ],
            "Yol Arkadaşımız Kitaplar (Tema 4)": [
                "Kitap okuma alışkanlığı kazanır.",
                "Okuduğu kitabı arkadaşlarına tanıtır.",
                "Kütüphane ve kitap kültürünü kavrar.",
                "Farklı tür metinleri (şiir, hikâye) okur."
            ],
            "Yeteneklerimizi Keşfediyoruz (Tema 5)": [
                "Kendine özgü yeteneğini fark eder ve anlatır.",
                "Metin içindeki mesajı anlar.",
                "Hayal gücünü kullanarak basit metinler yazar.",
                "Büyük harf kullanımına dikkat eder."
            ],
            "Minik Kâşifler (Tema 6)": [
                "Araştırma merakı ve bilimsel düşünme geliştirir.",
                "Basit bilgilendirici metinleri okur.",
                "Gözlemlerini sözlü ifade eder.",
                "Metindeki soru ifadelerini anlar."
            ],
            "Atalarımızın İzleri (Tema 7)": [
                "Geleneksel kültür ögelerini (tekerleme, ninni, bilmece) okur.",
                "Geçmişe ait metinleri anlamlandırır.",
                "Söz varlığını kültürel ögelerle zenginleştirir.",
                "Geçmiş zaman ekini kavrar."
            ],
            "Sorumluluklarımızın Farkındayız (Tema 8)": [
                "Sorumluluk temalı metinleri anlar.",
                "Günlük yaşamdan yazma örnekleri verir.",
                "Kurallı ve düzgün cümle yazar.",
                "Dinleme kurallarını uygular."
            ]
        },
        "Matematik": {
            "Sayılar ve İşlemler (Tema 1)": [
                "20'ye kadar olan doğal sayıları okur, yazar ve sayar.",
                "Nesneleri sayar ve sayılarla eşleştirir.",
                "Sayıları büyükten küçüğe ve küçükten büyüğe sıralar.",
                "Toplama ve çıkarma işlemi yapar.",
                "Toplama ve çıkarma arasındaki ilişkiyi kavrar."
            ],
            "Geometri (Tema 2)": [
                "Temel geometrik şekilleri (üçgen, kare, daire, dikdörtgen) tanır ve adlandırır.",
                "Nesneleri şekillerine ve özelliklerine göre sınıflandırır.",
                "Şekil ve sayı örüntüleri oluşturur.",
                "Uzamsal ilişkileri ifade eder (üstünde, altında, yanında vb.)."
            ],
            "Ölçme (Tema 3)": [
                "Uzunlukları standart olmayan birimlerle ölçer.",
                "Zaman kavramını (gün, hafta, ay, yıl) kullanır.",
                "Parayı tanır ve değerlerini karşılaştırır.",
                "Tartma ve sıvı ölçme kavramlarını keşfeder."
            ],
            "Veri İşleme (Tema 4)": [
                "Nesne grafiği oluşturur ve okur.",
                "'Veri İşleme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veri İşleme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veri İşleme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veri İşleme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Hayat Bilgisi": {
            "Ben ve Okulum (Tema 1)": [
                "Okul kurallarını bilir ve uygular.",
                "'Ben ve Okulum' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ben ve Okulum' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ben ve Okulum' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ben ve Okulum' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Sağlığım ve Güvenliğim (Tema 2)": [
                "Sağlıklı beslenme kurallarına uyar.",
                "'Sağlığım ve Güvenliğim' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Sağlığım ve Güvenliğim' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Sağlığım ve Güvenliğim' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Sağlığım ve Güvenliğim' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Doğa ve Çevre (Tema 3)": [
                "Çevresindeki doğal unsurları gözlemler.",
                "'Doğa ve Çevre' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Doğa ve Çevre' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Doğa ve Çevre' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Doğa ve Çevre' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "Words and Greetings (Tema 1)": [
                "Basit İngilizce kelimeleri söyler.",
                "'Words and Greetings' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Words and Greetings' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Words and Greetings' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Words and Greetings' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Colors and Numbers (Tema 2)": [
                "Renkleri ve 1-10 arası sayıları İngilizce sayar.",
                "'Colors and Numbers' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Colors and Numbers' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Colors and Numbers' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Colors and Numbers' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Çevresindeki sesleri dinler ve ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Öğrendiği şarkılara ritim çalgılarıyla eşlik eder.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Renkleri tanır ve sıcak-soğuk renkleri ayırt eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Farklı materyallerle üç boyutlu çalışmalar yapar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Oyun": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel hareket becerilerini (koşma, sıçrama, atma) uygular.",
                "'Hareket Yetkinliği' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Hareket Yetkinliği' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli fiziksel aktivitenin sağlığa faydalarını kavrar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "2. Sınıf": {
        "Türkçe": {
            "Değerlerimizle Varız (Tema 1)": [
                "Metindeki temel değerleri (sevgi, saygı, yardımseverlik) tanır.",
                "Duygu ve düşüncelerini sözlü ve yazılı ifade eder.",
                "Yazılarında değer ifadelerini kullanır.",
                "Okuduğu metnin ana fikrini bulur."
            ],
            "Atatürk ve Çocuk (Tema 2)": [
                "Atatürk'ün çocuklara verdiği önemi anlatan metinleri okur.",
                "'Atatürk ve Çocuk' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Atatürk ve Çocuk' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Atatürk ve Çocuk' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Atatürk ve Çocuk' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Doğada Neler Oluyor? (Tema 3)": [
                "Doğa olaylarını anlatan bilgilendirici metinleri okur.",
                "Neden-sonuç ilişkisi kurar.",
                "Gözlemlerini yazıya döker.",
                "Metin içindeki ana fikri bulur."
            ],
            "Okuma Serüvenimiz (Tema 4)": [
                "Farklı türde kitapları okur ve sever.",
                "Okuduğu kitabı arkadaşlarına özetler.",
                "Okuma alışkanlığı geliştirir.",
                "Kitap tanıtım yazısı yazar."
            ],
            "Yeteneklerimizi Tanıyoruz (Tema 5)": [
                "Kendi yeteneklerini fark eder ve anlatır.",
                "'Yeteneklerimizi Tanıyoruz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Yeteneklerimizi Tanıyoruz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Yeteneklerimizi Tanıyoruz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Yeteneklerimizi Tanıyoruz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Mucit Çocuk (Tema 6)": [
                "Teknoloji ve icat temalı metinleri anlar.",
                "'Mucit Çocuk' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Mucit Çocuk' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Mucit Çocuk' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Mucit Çocuk' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Kültür Hazinemiz (Tema 7)": [
                "Geleneksel kültür ögelerini (masal, tekerleme, mani) okur.",
                "'Kültür Hazinemiz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Kültür Hazinemiz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Kültür Hazinemiz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Kültür Hazinemiz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Haklarımızı Biliyoruz (Tema 8)": [
                "Hak ve sorumluluk temalı metinleri okur.",
                "'Haklarımızı Biliyoruz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Haklarımızı Biliyoruz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Haklarımızı Biliyoruz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Haklarımızı Biliyoruz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ]
        },
        "Matematik": {
            "Sayılar ve İşlemler (Tema 1)": [
                "100'e kadar doğal sayıları okur ve yazar.",
                "Çift ve tek sayıları belirler.",
                "İki basamaklı sayılarla eldeli ve eldesiz toplama yapar.",
                "Onluk bozarak çıkarma işlemi yapar.",
                "Çarpma işleminin anlamını (tekrarlı toplama) kavrar.",
                "2, 5 ve 10 çarpım tablolarını öğrenir."
            ],
            "Geometri (Tema 2)": [
                "Geometrik cisimleri (küp, dikdörtgenler prizması, silindir, küre) tanır.",
                "Nesneleri geometrik şekillerine göre sınıflandırır.",
                "Simetriyi fark eder ve simetrik şekiller çizer.",
                "Geometrik şekillerin köşe ve kenar sayılarını belirler."
            ],
            "Ölçme (Tema 3)": [
                "Uzunlukları metre ve santimetre cinsinden ölçer.",
                "Kilogram ve gram birimlerini kavrar.",
                "Saat ve dakika birimlerini kullanır.",
                "Takvim okur."
            ],
            "Veri İşleme (Tema 4)": [
                "Verileri tabloya aktarır.",
                "'Veri İşleme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veri İşleme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veri İşleme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veri İşleme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Hayat Bilgisi": {
            "Ben ve Okulum (Tema 1)": [
                "Okul kurallarını bilir ve uygular.",
                "'Ben ve Okulum' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ben ve Okulum' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ben ve Okulum' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ben ve Okulum' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Sağlığım ve Güvenliğim (Tema 2)": [
                "Sağlıklı beslenme kurallarına uyar.",
                "'Sağlığım ve Güvenliğim' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Sağlığım ve Güvenliğim' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Sağlığım ve Güvenliğim' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Sağlığım ve Güvenliğim' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Doğa ve Çevre (Tema 3)": [
                "Çevresindeki doğal unsurları gözlemler.",
                "'Doğa ve Çevre' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Doğa ve Çevre' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Doğa ve Çevre' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Doğa ve Çevre' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "School Life (Tema 1)": [
                "Okul eşyalarını tanıtır.",
                "'School Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'School Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'School Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'School Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Classroom Life (Tema 2)": [
                "Sınıf içi yönergeleri (otur, kalk, dinle) uygular.",
                "'Classroom Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Classroom Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Classroom Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Classroom Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Personal Life (Tema 3)": [
                "Kendini tanıtır ve hobilerinden bahseder.",
                "'Personal Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Personal Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Personal Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Personal Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Family Life (Tema 4)": [
                "Aile üyelerini İngilizce olarak tanıtır.",
                "'Family Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Family Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Family Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Family Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Homes & Houses & Neighbourhoods (Tema 5)": [
                "Evin bölümlerini ve eşyalarını söyler.",
                "'Homes & Houses & Neighbourhoods' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Homes & Houses & Neighbourhoods' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Homes & Houses & Neighbourhoods' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Homes & Houses & Neighbourhoods' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in the City & the World (Tema 6)": [
                "Şehirdeki temel yerleri (park, okul, hastane) söyler.",
                "'Life in the City & the World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in the City & the World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in the City & the World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in the City & the World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Çevresindeki sesleri dinler ve ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Öğrendiği şarkılara ritim çalgılarıyla eşlik eder.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Renkleri tanır ve sıcak-soğuk renkleri ayırt eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Farklı materyallerle üç boyutlu çalışmalar yapar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Oyun": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel hareket becerilerini (koşma, sıçrama, atma) uygular.",
                "'Hareket Yetkinliği' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Hareket Yetkinliği' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli fiziksel aktivitenin sağlığa faydalarını kavrar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "3. Sınıf": {
        "Türkçe": {
            "Değerlerimizle Yaşıyoruz (Tema 1)": [
                "Değer temalı metinleri anlar ve yorumlar.",
                "Metindeki ana fikri ve yardımcı fikirleri bulur.",
                "Kişisel deneyimlerini yazıya döker.",
                "Duygu ve düşüncelerini düzgün cümlelerle ifade eder."
            ],
            "Atatürk ve Kahramanlarımız (Tema 2)": [
                "Atatürk ve Kurtuluş Savaşı kahramanlarını anlatan metinleri okur.",
                "'Atatürk ve Kahramanlarımız' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Atatürk ve Kahramanlarımız' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Atatürk ve Kahramanlarımız' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Atatürk ve Kahramanlarımız' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Doğayı Tanıyoruz (Tema 3)": [
                "Doğa ve çevre temalı metinleri okur.",
                "Bilgilendirici metinlerde neden-sonuç ilişkisi kurar.",
                "Doğayla ilgili gözlemlerini yazar.",
                "Sözcük türlerini (isim, sıfat) kavrar."
            ],
            "Bilgi Hazinemiz (Tema 4)": [
                "Farklı türlerde (roman, hikâye, şiir) metinler okur.",
                "Okuduğu kitabı özetler.",
                "Okuma alışkanlığı geliştirir.",
                "Metin türlerini (hikâye, bilgilendirici metin) ayırt eder."
            ],
            "Yeteneklerimizi Kullanıyoruz (Tema 5)": [
                "Yetenek ve başarı temalı metinleri okur.",
                "'Yeteneklerimizi Kullanıyoruz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Yeteneklerimizi Kullanıyoruz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Yeteneklerimizi Kullanıyoruz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Yeteneklerimizi Kullanıyoruz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Bilim Yolculuğu (Tema 6)": [
                "Bilim insanları ve icatları anlatan metinleri okur.",
                "Bilgilendirici metin yazar.",
                "Araştırma merakı geliştirir.",
                "Kaynak kullanmayı öğrenir."
            ],
            "Millî Kültürümüz (Tema 7)": [
                "Atasözleri ve deyimlerin anlamını kavrar.",
                "'Millî Kültürümüz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Millî Kültürümüz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Millî Kültürümüz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Millî Kültürümüz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Hak ve Sorumluluklarımız (Tema 8)": [
                "Hak ve sorumluluk temalı metinleri okur.",
                "Bireysel ve toplumsal sorumlulukları kavrar.",
                "İkna edici metin yazar.",
                "Metin içindeki açık ve örtük anlamları kavrar."
            ]
        },
        "Matematik": {
            "Sayılar ve İşlemler (Tema 1)": [
                "1000'e kadar doğal sayıları okur, yazar ve basamak değerlerini kavrar.",
                "Sayıları sıralar ve karşılaştırır.",
                "10'a kadar çarpım tablolarını öğrenir.",
                "Birinci basamaklı sayıyla çarpma ve bölme yapar.",
                "Kesir kavramını (birim kesirler) kavrar."
            ],
            "Geometri (Tema 2)": [
                "Doğru, ışın ve doğru parçasını tanır.",
                "Açı kavramını anlar ve farklı açı türlerini tanır.",
                "Geometrik şekilleri sınıflandırır.",
                "Geometrik örüntüler oluşturur."
            ],
            "Ölçme (Tema 3)": [
                "Metre, desimetre ve santimetre arasındaki ilişkiyi kavrar.",
                "Kilogram ve gram birimlerini kullanır.",
                "Litre ve mililitre birimlerini kavrar.",
                "Zaman ölçme birimlerini kullanır."
            ],
            "Veri İşleme (Tema 4)": [
                "Sütun ve resim grafiği oluşturur ve yorumlar.",
                "'Veri İşleme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veri İşleme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veri İşleme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veri İşleme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fen Bilimleri": {
            "Bilimsel Keşif Yolculuğu (Tema 1)": [
                "Bilim insanlarının özelliklerini araştırır.",
                "'Bilimsel Keşif Yolculuğu' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Bilimsel Keşif Yolculuğu' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Bilimsel Keşif Yolculuğu' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Bilimsel Keşif Yolculuğu' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Canlılar Dünyasına Yolculuk (Tema 2)": [
                "Çevresindeki canlıları gözlemler ve sınıflandırır.",
                "'Canlılar Dünyasına Yolculuk' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Canlılar Dünyasına Yolculuk' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Canlılar Dünyasına Yolculuk' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Canlılar Dünyasına Yolculuk' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Yer Bilimciler İş Başında (Tema 3)": [
                "Dünya'nın şeklini ve katmanlarını açıklar.",
                "'Yer Bilimciler İş Başında' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Yer Bilimciler İş Başında' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Yer Bilimciler İş Başında' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Yer Bilimciler İş Başında' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Maddeyi Tanıyalım, Karıştırıp Ayıralım (Tema 4)": [
                "Maddenin hallerini (katı, sıvı, gaz) örneklerle açıklar.",
                "'Maddeyi Tanıyalım, Karıştırıp Ayıralım' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Maddeyi Tanıyalım, Karıştırıp Ayıralım' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Maddeyi Tanıyalım, Karıştırıp Ayıralım' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Maddeyi Tanıyalım, Karıştırıp Ayıralım' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Hareketi Keşfediyorum (Tema 5)": [
                "İtme ve çekme kuvvetinin cisimler üzerindeki etkilerini açıklar.",
                "'Hareketi Keşfediyorum' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Hareketi Keşfediyorum' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Hareketi Keşfediyorum' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Hareketi Keşfediyorum' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Yaşamımızı Kolaylaştıran Elektrik (Tema 6)": [
                "Şehir elektriği ve pille çalışan araçları ayırt eder.",
                "'Yaşamımızı Kolaylaştıran Elektrik' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Yaşamımızı Kolaylaştıran Elektrik' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Yaşamımızı Kolaylaştıran Elektrik' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Yaşamımızı Kolaylaştıran Elektrik' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Toprağı Tanıyorum, Tarımı Keşfediyorum (Tema 7)": [
                "Toprağın oluşumunu ve bitki yetiştirmenin aşamalarını açıklar.",
                "'Toprağı Tanıyorum, Tarımı Keşfediyorum' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Toprağı Tanıyorum, Tarımı Keşfediyorum' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Toprağı Tanıyorum, Tarımı Keşfediyorum' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Toprağı Tanıyorum, Tarımı Keşfediyorum' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Canlıların Yaşam Alanlarına Yolculuk (Tema 8)": [
                "Farklı yaşam alanlarındaki (orman, deniz, çöl) canlıları eşleştirir.",
                "'Canlıların Yaşam Alanlarına Yolculuk' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Canlıların Yaşam Alanlarına Yolculuk' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Canlıların Yaşam Alanlarına Yolculuk' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Canlıların Yaşam Alanlarına Yolculuk' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ]
        },
        "Hayat Bilgisi": {
            "Ben ve Okulum (Tema 1)": [
                "Okul kurallarını bilir ve uygular.",
                "'Ben ve Okulum' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ben ve Okulum' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ben ve Okulum' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ben ve Okulum' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Sağlığım ve Güvenliğim (Tema 2)": [
                "Sağlıklı beslenme kurallarına uyar.",
                "'Sağlığım ve Güvenliğim' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Sağlığım ve Güvenliğim' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Sağlığım ve Güvenliğim' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Sağlığım ve Güvenliğim' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Doğa ve Çevre (Tema 3)": [
                "Çevresindeki doğal unsurları gözlemler.",
                "'Doğa ve Çevre' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Doğa ve Çevre' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Doğa ve Çevre' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Doğa ve Çevre' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "School Life (Tema 1)": [
                "Okul eşyalarını tanıtır.",
                "'School Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'School Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'School Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'School Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Classroom Life (Tema 2)": [
                "Sınıf içi yönergeleri (otur, kalk, dinle) uygular.",
                "'Classroom Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Classroom Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Classroom Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Classroom Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Personal Life (Tema 3)": [
                "Kendini tanıtır ve hobilerinden bahseder.",
                "'Personal Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Personal Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Personal Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Personal Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Family Life (Tema 4)": [
                "Aile üyelerini İngilizce olarak tanıtır.",
                "'Family Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Family Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Family Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Family Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Homes & Houses & Neighbourhoods (Tema 5)": [
                "Evin bölümlerini ve eşyalarını söyler.",
                "'Homes & Houses & Neighbourhoods' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Homes & Houses & Neighbourhoods' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Homes & Houses & Neighbourhoods' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Homes & Houses & Neighbourhoods' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in the City & the World (Tema 6)": [
                "Şehirdeki temel yerleri (park, okul, hastane) söyler.",
                "'Life in the City & the World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in the City & the World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in the City & the World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in the City & the World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Çevresindeki sesleri dinler ve ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Öğrendiği şarkılara ritim çalgılarıyla eşlik eder.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Renkleri tanır ve sıcak-soğuk renkleri ayırt eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Farklı materyallerle üç boyutlu çalışmalar yapar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Oyun": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel hareket becerilerini (koşma, sıçrama, atma) uygular.",
                "'Hareket Yetkinliği' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Hareket Yetkinliği' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli fiziksel aktivitenin sağlığa faydalarını kavrar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "4. Sınıf": {
        "Türkçe": {
            "1. Tema: Okuma Kültürü": [
                "Okuduğu metnin konusunu ve ana fikrini belirler.",
                "Metinle ilgili soruları cevaplar ve metne farklı başlıklar önerir.",
                "Sözcüklerin anlamlarını tahmin etmek için görsel ve bağlamsal ipuçlarını kullanır.",
                "Noktalama işaretlerini (nokta, virgül, soru, ünlem) işlevine uygun kullanır."
            ],
            "2. Tema: Millî Mücadele ve Atatürk": [
                "Millî Mücadele kahramanlarını ve Atatürk'ün hayatını anlatan metinleri kavrar.",
                "Metindeki olayların gelişimini ve neden-sonuç ilişkilerini açıklar.",
                "Dinlediklerini ve okuduklarını kendi cümleleriyle özetler.",
                "Vatan sevgisi ve bağımsızlık bilincini metin üzerinden yorumlar."
            ],
            "3. Tema: Erdemler": [
                "Erdemlerle (doğruluk, dürüstlük, sabır, vefa) ilgili metinlerin ana fikrini bulur.",
                "Metindeki kahramanların özelliklerini karşılaştırır ve karakter tahlili yapar.",
                "Nezaket, saygı ve sevgi dilini yansıtan özgün hikâyeler yazar.",
                "Deyim ve atasözlerinin metne kattığı anlamı kavrar."
            ],
            "4. Tema: Millî Kültürümüz": [
                "Millî kültür ögelerimizi (gelenekler, bayramlar, masallar, mimari) yansıtan metinleri yorumlar.",
                "Metinlerde geçen kültürel kavramların anlamını açıklar ve söz varlığını zenginleştirir.",
                "Kültürel mirasımızın korunmasına yönelik görüş bildirir ve sunum yapar.",
                "Şiir ve düzyazı arasındaki biçimsel ve anlamsal farkları ayırt eder."
            ],
            "5. Tema: Doğa ve Evren": [
                "Doğa olaylarını ve çevre bilincini konu alan bilgilendirici metinleri anlar.",
                "Metindeki gerçek ve hayal ürünü unsurları ayırt eder.",
                "Canlılar ve çevre arasındaki etkileşimi anlatan gözlem metni yazar.",
                "Görsellerden hareketle doğa olaylarını ve mevsim döngülerini betimler."
            ],
            "6. Tema: Sanat": [
                "Sanatın (müzik, resim, tiyatro, heykel) önemini vurgulayan metinleri okur.",
                "Şiirlerdeki ritim, kafiye ve ana duyguyu keşfeder.",
                "Sanatsal bir etkinlikle ilgili duygu ve düşüncelerini sözlü ve yazılı ifade eder.",
                "Metindeki ana düşünceyi destekleyen yardımcı düşünceleri belirler."
            ],
            "7. Tema: Birey ve Toplum": [
                "Bireysel farklılıklara ve insan haklarına saygıyı anlatan metinleri okur.",
                "Empati kurarak metindeki karakterlerin davranışlarını yorumlar.",
                "Toplumsal kuralların ve iş birliğinin önemini açıklayan düşünce yazısı yazar.",
                "Dinleme ve konuşma kurallarına uygun olarak sınıf tartışmalarına katılır."
            ],
            "8. Tema: Bilim ve Teknoloji": [
                "Bilimsel buluşları ve teknolojik yenilikleri anlatan metinlerden bilgi çıkarır.",
                "Bilgilendirici metinlerdeki grafik, tablo ve şemaları yorumlar.",
                "Teknolojinin güvenli ve bilinçli kullanımı konusunda ilkeler belirler.",
                "Büyük harflerin ve kısaltmaların yazım kurallarına dikkat ederek metin yazar."
            ]
        },
        "Matematik": {
            "1. Ünite: Doğal Sayılar ve Toplama/Çıkarma": [
                "4, 5 ve 6 basamaklı doğal sayıları okur, yazar ve basamak değerlerini belirler.",
                "Doğal sayıları en yakın onluğa veya yüzlüğe yuvarlar.",
                "En çok dört basamaklı doğal sayılarla toplama ve çıkarma işlemi yapar.",
                "Toplama ve çıkarma işlemlerinde tahmin stratejilerini kullanır ve zihinden işlem yapar."
            ],
            "2. Ünite: Doğal Sayılarla Çarpma ve Bölme": [
                "En çok üç basamaklı doğal sayıları iki basamaklı doğal sayılarla çarpar.",
                "En çok dört basamaklı doğal sayıları en çok iki basamaklı doğal sayılara böler.",
                "10, 100 ve 1000 ile zihinden çarpma ve bölme işlemleri yapar.",
                "Çarpma ve bölme işlemlerini içeren günlük hayat problemlerini çözer ve kurar."
            ],
            "3. Ünite: Kesirler ve Zaman Ölçme": [
                "Basit, bileşik ve tam sayılı kesirleri tanır, modellerle gösterir ve sayı doğrusunda sıralar.",
                "Bir çokluğun belirtilen basit kesir kadarını hesaplar.",
                "Paydaları eşit kesirlerle toplama ve çıkarma işlemi yapar.",
                "Zaman ölçme birimleri (saat, dakika, saniye, yıl, ay, hafta, gün) arasındaki ilişkileri dönüştürür."
            ],
            "4. Ünite: Geometrik Cisimler ve Şekiller": [
                "Üçgen, kare ve dikdörtgenin kenar ve köşe özelliklerini inceler ve isimlendirir.",
                "Kenar uzunluklarına göre üçgen çeşitlerini (eşkenar, ikizkenar, çeşitkenar) sınıflandırır.",
                "Küp, kare prizma, dikdörtgenler prizması ve silindirin temel özelliklerini inceler.",
                "Geometrik şekil ve cisimlerle örüntüler oluşturur ve kuralını açıklar."
            ],
            "5. Ünite: Geometride Temel Kavramlar ve Uzunluk Ölçme": [
                "Doğru, doğru parçası, ışın ve açı kavramlarını tanır ve modellerini çizer.",
                "Açıları dar, dik, geniş ve doğru açı olarak sınıflandırır ve iletki ile ölçer.",
                "Standart uzunluk ölçme birimlerini (milimetre, santimetre, metre, kilometre) birbirine dönüştürür.",
                "Uzunluk ölçme ile ilgili günlük hayat problemlerini çözer."
            ],
            "6. Ünite: Çevre ve Alan Ölçme, Tartma, Sıvıları Ölçme": [
                "Kare ve dikdörtgenin çevre uzunluklarını hesaplar.",
                "Kare ve dikdörtgenin alanını birim kareler kullanarak modeller ve belirler.",
                "Kilogram ve gram ilişkisini açıklar, tartma problemleri çözer.",
                "Litre ve mililitre birimlerini kavrar, sıvı ölçüleri ile ilgili problem çözer."
            ]
        },
        "Fen Bilimleri": {
            "1. Ünite: Yer Kabuğu ve Dünya'mızın Hareketleri": [
                "Yer kabuğunun kayaçlar, mineraller ve fosillerden oluşan yapısını açıklar.",
                "Fosillerin oluşum süreçlerini ve geçmiş canlılar hakkındaki önemini kavrar.",
                "Dünya'nın kendi etrafında dönme hareketini ve gece-gündüz oluşumunu açıklar.",
                "Dünya'nın Güneş etrafında dolanma hareketini ve mevsimlerin oluşumundaki rolünü kavrar."
            ],
            "2. Ünite: Besinlerimiz": [
                "Canlıların yaşamını sürdürmesi için besinlerin gerekliliğini açıklar.",
                "Besin içeriklerini (karbonhidrat, protein, yağ, vitamin, su, mineral) ve görevlerini kavrar.",
                "Dengeli ve sağlıklı beslenmenin vücut sağlığı açısından önemini değerlendirir.",
                "Alkol ve sigaranın insan sağlığına ve organlara zararlarını tartışır."
            ],
            "3. Ünite: Kuvvetin Etkileri": [
                "Kuvvetin cisimlerin hareket yönünü, hızını değiştirici ve durdurucu etkilerini açıklar.",
                "Kuvvetin cisimler üzerindeki şekil değiştirici etkisini deneylerle gözlemler.",
                "Mıknatısların kutuplarını, itme-çekme özelliklerini ve manyetik etkisini keşfeder.",
                "Mıknatısların günlük yaşamda ve teknolojideki kullanım alanlarına örnekler verir."
            ],
            "4. Ünite: Maddenin Özellikleri": [
                "Maddelerin duyu organlarıyla fark edilen özelliklerini (sertlik, esneklik vb.) betimler.",
                "Maddenin kütle ve hacim özelliklerini ölçerek açıklar.",
                "Maddenin katı, sıvı ve gaz hâllerini tanır ve ayırt eder.",
                "Isınma ve soğuma sonucu meydana gelen hâl değişimlerini (erime, donma, buharlaşma) deneyle gösterir."
            ],
            "5. Ünite: Aydınlatma ve Ses Teknolojileri": [
                "Geçmişten günümüze aydınlatma teknolojilerinin gelişimini ve insan yaşamına katkılarını tartışır.",
                "Uygun aydınlatmanın göz sağlığı ve enerji tasarrufu açısından önemini kavrar.",
                "Işık kirliliğinin doğal yaşama ve çevreye olumsuz etkilerini açıklar.",
                "Geçmişten günümüze ses teknolojilerini inceler ve ses kirliliğinin zararlarını tartışır."
            ],
            "6. Ünite: İnsan ve Çevre": [
                "Çevreyi temiz tutmanın ve kaynakları tasarruflu kullanmanın önemini kavrar.",
                "Geri dönüşümün doğal kaynakların korunmasına ve çevre temizliğine katkısını değerlendirir.",
                "Bilinçli bir tüketici olarak çevre sorunlarına karşı duyarlı davranışlar sergiler.",
                "Yerel ve küresel çevre sorunlarının nedenlerini ve çözüm önerilerini araştırır."
            ],
            "7. Ünite: Basit Elektrik Devreleri": [
                "Basit bir elektrik devresini oluşturan elemanları (pil, ampul, anahtar, kablo) tanır ve açıklar.",
                "Çalışan bir elektrik devresi kurar ve devre elemanlarını test eder.",
                "Evlerdeki elektrik düğmelerinin ve prizlerin devredeki anahtar görevi gördüğünü kavrar.",
                "Devrede ampul parlaklığını etkileyen faktörleri keşfeder."
            ]
        },
        "Sosyal Bilgiler": {
            "1. Ünite: Birey ve Toplum": [
                "Türkiye Cumhuriyeti kimlik kartındaki bilgileri inceler ve kimlik belgesinin önemini açıklar.",
                "Yaşamına ilişkin olayları kronolojik sıraya koyar.",
                "Bireysel farklılıklara saygı duyar ve empati becerisi geliştirir.",
                "Duygusal, fiziksel ve zihinsel özelliklerinin farkında olarak kendini ifade eder."
            ],
            "2. Ünite: Kültür ve Miras": [
                "Ailesinin ve çevresinin sözlü tarih araştırmasını yaparak millî kültürü tanır.",
                "Geleneksel çocuk oyunları ile günümüz oyunlarını karşılaştırır.",
                "Millî kültür ögelerini (mimari, el sanatları, yemekler) yansıtan eserleri inceler.",
                "Millî Mücadele kahramanlarının fedakârlıklarını ve bağımsızlık ruhunu kavrar."
            ],
            "3. Ünite: İnsanlar, Yerler ve Çevreler": [
                "Doğal ve beşerî yön bulma yöntemlerini kullanarak yönünü belirler.",
                "Çevresindeki yerleri gösteren basit bir kroki çizer.",
                "Yaşadığı çevredeki doğal ve beşerî unsurları ayırt eder.",
                "Hava durumu gözlemleri yapar ve hava olaylarını açıklar.",
                "Doğal afetlere karşı hazırlıklı olmanın yollarını araştırır."
            ],
            "4. Ünite: Bilim, Teknoloji ve Toplum": [
                "Günlük yaşamında kullandığı teknolojik ürünlerin zaman içindeki gelişimini inceler.",
                "Teknolojik ürünlerin hayatımızdaki faydalarını ve olası zararlarını tartışır.",
                "Teknolojik ürünleri amacına uygun ve güvenli şekilde kullanma kurallarını uygular.",
                "Mucit ve bilim insanlarının ortak özelliklerini fark eder, özgün fikirler üretir."
            ],
            "5. Ünite: Üretim, Dağıtım ve Tüketim": [
                "İstek ve ihtiyaçlarını ayırt ederek bütçe hazırlama bilinci kazanır.",
                "Çevresindeki ekonomik faaliyetleri ve meslekleri inceler.",
                "Bilinçli bir tüketici olarak alışverişte dikkat edilmesi gereken kuralları (TSE, son kullanma vb.) uygular.",
                "İsrafı önleme ve kaynakları tasarruflu kullanma alışkanlığı geliştirir."
            ],
            "6. Ünite: Etkin Vatandaşlık": [
                "Bir çocuk olarak haklarını bilir ve çocuk haklarının korunmasının önemini kavrar.",
                "Ailede, okulda ve toplumda üzerine düşen sorumlulukları yerine getirir.",
                "Eğitsel ve sosyal kulüp faaliyetlerine gönüllü olarak katılır.",
                "Bağımsızlığımızın sembolleri olan bayrak ve İstiklal Marşı'na saygı duyar."
            ],
            "7. Ünite: Küresel Bağlantılar": [
                "Dünya üzerindeki farklı ülkelerin kültürel özelliklerini araştırır.",
                "Türkiye'nin komşularını ve Türk cumhuriyetlerini harita üzerinde tanır.",
                "Farklı kültürlere karşı önyargısız ve hoşgörülü yaklaşım sergiler.",
                "Küresel sorunlara (çevre, açlık, yoksulluk) duyarlılık geliştirir."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: Günlük Hayattaki Dini İfadeler": [
                "Günlük hayatta kullanılan besmele, selam, hamd, şükür, tekbir gibi dini ifadeleri açıklar.",
                "Dilek ve dualarda geçen dini ifadeleri doğru yerde kullanır.",
                "Sübhaneke duasını ezbere okur ve anlamını açıklar."
            ],
            "2. Ünite: İslam'ı Tanıyalım": [
                "İslam'ın inanç esaslarını ve imanın şartlarını kavrar.",
                "İslam'ın temel ibadetlerini (namaz, oruç, zekat, hac, kelime-i şehadet) tanır.",
                "Amentü duasını ezbere okur ve anlamını açıklar."
            ],
            "3. Ünite: Güzel Ahlak": [
                "İslam dininin güzel ahlaka verdiği önemi ayet ve hadislerle açıklar.",
                "Anne, baba, akraba ve komşulara karşı iyi davranmanın önemini kavrar.",
                "Fatiha suresini ezbere okur ve anlamını açıklar."
            ],
            "4. Ünite: Hz. Muhammed'i Tanıyalım": [
                "Hz. Muhammed'in doğumunu, çocukluğunu ve gençliğini öğrenir.",
                "Hz. Muhammed'in dürüstlüğünü, güvenilirliğini (el-Emin) ve ahlaki erdemlerini kavrar.",
                "Salli ve Barik dualarını ezbere okur ve anlamlarını açıklar."
            ],
            "5. Ünite: Din ve Temizlik": [
                "İslam'ın beden, çevre ve kalp temizliğine verdiği önemi değerlendirir.",
                "Temizliğin ibadetlerle olan ilişkisini (abdest, boy abdesti) kavrar.",
                "İhlas suresini ezbere okur ve anlamını açıklar."
            ]
        },
        "İngilizce": {
            "Unit 1: Classroom Rules": [
                "Sınıf içi nesneleri tanır ve sayar.",
                "Basit sınıf yönergelerini (Open the door, sit down, be quiet) anlar ve uygular.",
                "İzin isteme ifadelerini (May I come in? May I take your pencil?) kullanır."
            ],
            "Unit 2: Nationality": [
                "Ülke ve millet adlarını söyler (Turkey - Turkish, England - English).",
                "Nereden olduğunu ve milliyetini sorar ve söyler (Where are you from? I'm from Turkey).",
                "Harita üzerinde ülkeleri ve bayrakları eşleştirir."
            ],
            "Unit 3: Cartoons": [
                "Çizgi film karakterlerinin yeteneklerini anlatır (Superman can fly).",
                "Yapabildiklerini ve yapamadıklarını ifade eder (I can swim / I can't drive).",
                "Basit yetenek soruları sorar ve cevaplar (Can you ride a bike?)."
            ],
            "Unit 4: Free Time": [
                "Boş zaman aktivitelerini (playing football, reading comics, dancing) söyler.",
                "Sevdiklerini ve sevmediklerini ifade eder (I like swimming / I dislike running).",
                "Arkadaşlarının hobilerini ve ilgi alanlarını sorar."
            ],
            "Unit 5: My Day": [
                "Günlük rutinlerini ve günün bölümlerini anlatır (wake up, brush teeth, have breakfast).",
                "Tam ve buçuk saatleri söyler (It is three o'clock / It is half past two).",
                "Günlük aktivitelerin zamanını ifade eder."
            ],
            "Unit 6: Fun with Science": [
                "Basit bilimsel deney adımlarını anlar ve eşleştirir.",
                "Nesnelerin yerini belirten edatları (in, on, under, in front of) kullanır.",
                "Basit talimatlar verir (Mix the colors, pour the water)."
            ],
            "Unit 7: Jobs": [
                "Meslekleri tanır ve adlandırır (doctor, teacher, pilot, firefighter).",
                "Kişilerin mesleklerini sorar ve söyler (What is your job? I am a doctor).",
                "Mesleklerin çalıştıkları yerleri eşleştirir (A teacher works at school)."
            ],
            "Unit 8: My Clothes": [
                "Mevsimleri ve hava durumunu ifade eder (sunny, rainy, snowy, windy).",
                "Hava durumuna uygun kıyafetleri söyler (wear a coat, put on boots).",
                "İhtiyaç duyduğu kıyafetleri rica eder (Can I borrow your umbrella?)."
            ],
            "Unit 9: My Friends": [
                "İnsanların fiziksel özelliklerini betimler (tall, short, slim, blue eyes, curly hair).",
                "Kişilik özelliklerini basitçe ifade eder (friendly, helpful, cheerful).",
                "Arkadaşını fiziksel görünüşüne göre tanıtır."
            ],
            "Unit 10: Food and Drinks": [
                "Yiyecek ve içecek isimlerini söyler.",
                "Açlık ve tokluk durumunu ifade eder (I am hungry / I am thirsty).",
                "Yiyecek teklifinde bulunur ve cevap verir (Would you like some water? Yes, please / No, thank you)."
            ]
        },
        "Müzik": {
            "1. Ünite: Nota Bilgisi": [
                "Nota adlarını ve süre değerlerini (birlik, ikilik, dörtlük, sekizlik) öğrenir.",
                "Porte, dizek ve Sol anahtarı kavramlarını kavrar.",
                "Ritim kalıplarını el çırparak veya çalgıyla seslendirir."
            ],
            "2. Ünite: Şarkı Repertuarı": [
                "Türk Halk Müziği ve Türk Sanat Müziği çocuk şarkılarını doğru tonla söyler.",
                "Marşları ve bayram şarkılarını coşkuyla seslendirir.",
                "Şarkı söylerken nefes kontrolü ve doğru duruş sergiler."
            ],
            "3. Ünite: Çalgılar": [
                "Geleneksel Türk müziği (bağlama, ney, kanun) ve Batı müziği çalgılarını tanır.",
                "Çalgıları telli, yaylı, nefesli ve vurmalı olarak sınıflandırır.",
                "Basit ritim aletleriyle ezgilere eşlik eder."
            ]
        },
        "Görsel Sanatlar": {
            "1. Ünite: Tasarım ve Kompozisyon": [
                "Görsel sanatlarda denge, ritim, oran ve vurgu ilkelerini uygular.",
                "Mozaik, kolaj ve baskı tekniklerini kullanarak özgün çalışmalar üretir.",
                "Renk tonları ve kontrast ilişkilerini resimlerinde kullanır."
            ],
            "2. Ünite: Sanat Tarihi": [
                "Türk-İslam sanatını (hat, tezhip, ebru, minyatür) tanır ve örnekler inceler.",
                "Dünya sanat tarihinden ünlü ressamları ve eserlerini keşfeder.",
                "Tarihi eserleri ve müzeleri ziyaret etme bilinci kazanır."
            ],
            "3. Ünite: Dijital Sanat": [
                "Temel dijital çizim ve tasarım araçlarını tanır.",
                "Dijital ortamda basit grafik ve illüstrasyon çalışmaları yapar.",
                "Görsel sanat eserlerini saygıyla ve yapıcı şekilde eleştirir."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: Temel Spor Becerileri": [
                "Basketbol, voleybol ve futbolun temel pas, top sürme ve şut kurallarını öğrenir.",
                "Takım oyunlarında iş birliği, fair-play ve kurallara uyma davranışı sergiler.",
                "Koordinasyon, denge ve esneklik gerektiren hareketleri uygular."
            ],
            "2. Ünite: Sağlıklı Yaşam": [
                "Düzenli fiziksel aktivitenin beden ve ruh sağlığına faydalarını açıklar.",
                "Spor yaparken ısınma ve soğuma hareketlerinin önemini kavrar.",
                "Sağlıklı beslenme ve su tüketiminin spor performansına etkisini değerlendirir."
            ]
        }
    },
    "5. Sınıf": {
        "Türkçe": {
            "Oyun Dünyası (Tema 1)": [
                "Oyun kültürüne ait metinleri anlar.",
                "'Oyun Dünyası' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Oyun Dünyası' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Oyun Dünyası' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Oyun Dünyası' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Atatürk'ü Tanımak (Tema 2)": [
                "Atatürk'ün hayatı ve kişiliğiyle ilgili metinleri yorumlar.",
                "'Atatürk'ü Tanımak' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Atatürk'ü Tanımak' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Atatürk'ü Tanımak' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Atatürk'ü Tanımak' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Duygularımı Tanıyorum (Tema 3)": [
                "Duygu ve düşüncelerini ifade eden metinler yazar.",
                "'Duygularımı Tanıyorum' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Duygularımı Tanıyorum' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Duygularımı Tanıyorum' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Duygularımı Tanıyorum' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Geleneklerimiz (Tema 4)": [
                "Kültürel ögeleri anlatan metinleri okur.",
                "'Geleneklerimiz' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Geleneklerimiz' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Geleneklerimiz' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Geleneklerimiz' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "İletişim ve Sosyal İlişkiler (Tema 5)": [
                "İletişim becerilerini metinler üzerinden geliştirir.",
                "'İletişim ve Sosyal İlişkiler' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'İletişim ve Sosyal İlişkiler' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'İletişim ve Sosyal İlişkiler' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'İletişim ve Sosyal İlişkiler' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Sağlıklı Yaşıyorum (Tema 6)": [
                "Sağlık ve spor temalı bilgilendirici metinleri anlar.",
                "'Sağlıklı Yaşıyorum' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Sağlıklı Yaşıyorum' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Sağlıklı Yaşıyorum' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Sağlıklı Yaşıyorum' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ]
        },
        "Matematik": {
            "Geometrik Şekiller (Tema 1)": [
                "Üçgenleri ve dörtgenleri özelliklerine göre sınıflandırır.",
                "'Geometrik Şekiller' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometrik Şekiller' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometrik Şekiller' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometrik Şekiller' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Sayılar ve Nicelikler: Doğal Sayılar (Tema 2)": [
                "1 milyona kadar doğal sayıları okur ve yazar.",
                "'Sayılar ve Nicelikler: Doğal Sayılar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Sayılar ve Nicelikler: Doğal Sayılar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Sayılar ve Nicelikler: Doğal Sayılar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Sayılar ve Nicelikler: Doğal Sayılar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Geometrik Nicelikler (Tema 3)": [
                "Çokgenlerin çevresini hesaplar.",
                "'Geometrik Nicelikler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometrik Nicelikler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometrik Nicelikler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometrik Nicelikler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Sayılar ve Nicelikler: Kesirler ve Yüzde (Tema 4)": [
                "Kesirlerde toplama, çıkarma, çarpma işlemleri yapar.",
                "Ondalık sayılarla dört işlem yapar.",
                "Yüzde hesaplamaları yapar.",
                "Oran kavramını açıklar."
            ],
            "İstatistiksel Araştırma Süreci (Tema 5)": [
                "Veri toplar ve farklı grafik türlerinde gösterir.",
                "'İstatistiksel Araştırma Süreci' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İstatistiksel Araştırma Süreci' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İstatistiksel Araştırma Süreci' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İstatistiksel Araştırma Süreci' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "İşlemlerle Cebirsel Düşünme (Tema 6)": [
                "Değişken kavramını kavrar.",
                "'İşlemlerle Cebirsel Düşünme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İşlemlerle Cebirsel Düşünme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İşlemlerle Cebirsel Düşünme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İşlemlerle Cebirsel Düşünme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Veriden Olasılığa (Tema 7)": [
                "Olasılık kavramını tanır.",
                "'Veriden Olasılığa' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veriden Olasılığa' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veriden Olasılığa' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veriden Olasılığa' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fen Bilimleri": {
            "Gökyüzündeki Komşularımız ve Biz (Tema 1)": [
                "Güneş, Dünya ve Ay'ın birbirine göre hareketlerini açıklar.",
                "'Gökyüzündeki Komşularımız ve Biz' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Gökyüzündeki Komşularımız ve Biz' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Gökyüzündeki Komşularımız ve Biz' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Gökyüzündeki Komşularımız ve Biz' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Kuvveti Tanıyalım (Tema 2)": [
                "Kuvvetin büyüklüğünü dinamometre ile ölçer.",
                "'Kuvveti Tanıyalım' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Kuvveti Tanıyalım' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Kuvveti Tanıyalım' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Kuvveti Tanıyalım' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Canlıların Yapısına Yolculuk (Tema 3)": [
                "Canlıları (mikroskobik canlılar, mantarlar, bitkiler, hayvanlar) sınıflandırır.",
                "'Canlıların Yapısına Yolculuk' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Canlıların Yapısına Yolculuk' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Canlıların Yapısına Yolculuk' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Canlıların Yapısına Yolculuk' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Işığın Dünyası (Tema 4)": [
                "Işığın yayılmasını ve yansımasını deneylerle gösterir.",
                "'Işığın Dünyası' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Işığın Dünyası' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Işığın Dünyası' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Işığın Dünyası' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Maddenin Doğası (Tema 5)": [
                "Maddenin hal değişimlerini (erime, donma, kaynama) açıklar.",
                "'Maddenin Doğası' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Maddenin Doğası' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Maddenin Doğası' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Maddenin Doğası' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Yaşamımızdaki Elektrik (Tema 6)": [
                "Basit elektrik devresi elemanlarını tanır.",
                "'Yaşamımızdaki Elektrik' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Yaşamımızdaki Elektrik' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Yaşamımızdaki Elektrik' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Yaşamımızdaki Elektrik' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Sürdürülebilir Yaşam ve Geri Dönüşüm (Tema 7)": [
                "Geri dönüşümün ve çevre bilincinin önemini tartışır.",
                "'Sürdürülebilir Yaşam ve Geri Dönüşüm' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Sürdürülebilir Yaşam ve Geri Dönüşüm' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilir Yaşam ve Geri Dönüşüm' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Sürdürülebilir Yaşam ve Geri Dönüşüm' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ]
        },
        "Sosyal Bilgiler": {
            "Birlikte Yaşamak (Tema 1)": [
                "Sosyal rollerin ve sorumlulukların önemini açıklar.",
                "'Birlikte Yaşamak' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Birlikte Yaşamak' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Birlikte Yaşamak' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Birlikte Yaşamak' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Evimiz Dünya (Tema 2)": [
                "Doğal varlıklar ile tarihî mekânları ayırt eder.",
                "'Evimiz Dünya' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Evimiz Dünya' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Evimiz Dünya' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Evimiz Dünya' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Ortak Mirasımız (Tema 3)": [
                "Kültürel ögelerin geçmişten bugüne değişimini analiz eder.",
                "'Ortak Mirasımız' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ortak Mirasımız' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ortak Mirasımız' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ortak Mirasımız' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Yaşayan Demokrasimiz (Tema 4)": [
                "Temel hak ve özgürlüklerini günlük yaşamla ilişkilendirir.",
                "'Yaşayan Demokrasimiz' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Yaşayan Demokrasimiz' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Yaşayan Demokrasimiz' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Yaşayan Demokrasimiz' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Hayatımızdaki Ekonomi (Tema 5)": [
                "Üretim, dağıtım ve tüketim ağını kavrar.",
                "'Hayatımızdaki Ekonomi' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Hayatımızdaki Ekonomi' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Hayatımızdaki Ekonomi' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Hayatımızdaki Ekonomi' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Teknoloji ve Sosyal Bilimler (Tema 6)": [
                "Teknolojinin sosyal hayata etkilerini tartışır.",
                "'Teknoloji ve Sosyal Bilimler' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Teknoloji ve Sosyal Bilimler' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Teknoloji ve Sosyal Bilimler' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Teknoloji ve Sosyal Bilimler' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "Hello (Tema 1)": [
                "Tanışma, selamlaşma ve vedalaşma ifadelerini kullanır.",
                "'Hello' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Hello' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Hello' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Hello' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "My Town (Tema 2)": [
                "Yaşadığı yeri tarif eder ve yön sorar.",
                "'My Town' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'My Town' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'My Town' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'My Town' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Games and Hobbies (Tema 3)": [
                "Oyunlar ve hobiler hakkında konuşur.",
                "'Games and Hobbies' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Games and Hobbies' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Games and Hobbies' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Games and Hobbies' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "My Daily Routine (Tema 4)": [
                "Günlük rutin işlerini saat vererek anlatır.",
                "'My Daily Routine' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'My Daily Routine' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'My Daily Routine' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'My Daily Routine' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Health (Tema 5)": [
                "Sağlık sorunlarını ifade eder ve tavsiye verir.",
                "'Health' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Health' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Health' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Health' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Movies (Tema 6)": [
                "Sevdiği filmler ve karakterleri hakkında konuşur.",
                "'Movies' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Movies' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Movies' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Movies' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Party Time (Tema 7)": [
                "Parti türlerini bilir ve davet ifadeleri kullanır.",
                "'Party Time' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Party Time' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Party Time' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Party Time' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Fitness (Tema 8)": [
                "Spor dallarını ve yetenekleri ifade eder.",
                "'Fitness' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Fitness' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Fitness' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Fitness' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "Bilişim Teknolojilerinin Hayatımızdaki Yeri (Tema 1)": [
                "Bilişim teknolojilerinin kullanım alanlarını açıklar.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Bilişim Teknolojilerinin Hayatımızdaki Yeri' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Dijital Ürün Tasarımı (Tema 2)": [
                "Kelime işlemci ve sunum programlarını kullanır.",
                "'Dijital Ürün Tasarımı' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Dijital Ürün Tasarımı' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Dijital Ürün Tasarımı' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Dijital Ürün Tasarımı' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Ağlar ve İletişim (Tema 3)": [
                "Bilgisayar ağlarının temel kavramlarını açıklar.",
                "'Ağlar ve İletişim' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Ağlar ve İletişim' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Ağlar ve İletişim' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Ağlar ve İletişim' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Bilişim Etiği ve Güvenlik (Tema 4)": [
                "Dijital dünyada etik kurallara uyar ve güvenlik önlemi alır.",
                "'Bilişim Etiği ve Güvenlik' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Bilişim Etiği ve Güvenlik' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Bilişim Etiği ve Güvenlik' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Bilişim Etiği ve Güvenlik' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Yapay Zekâ (Tema 5)": [
                "Yapay zekanın günlük hayattaki örneklerini keşfeder.",
                "'Yapay Zekâ' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Yapay Zekâ' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Yapay Zekâ' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Yapay Zekâ' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Programlama (Tema 6)": [
                "Blok tabanlı programlama ile basit algoritmalar yazar.",
                "'Programlama' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Programlama' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Programlama' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Programlama' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Farklı müzik türlerini ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Basit ritmik ve ezgisel motifler oluşturur.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Görsel sanat eserlerini analiz eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Özgün sanatsal çalışmalar tasarlar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel spor becerilerini oyun içinde kullanır.",
                "'Hareket Yetkinliği' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Hareket Yetkinliği' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli egzersizin fiziksel gelişime etkisini açıklar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "Seçmeli Zeka Oyunları": {
            "Akıl Yürütme (Tema 1)": [
                "Mantık bulmacaları çözer.",
                "'Akıl Yürütme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Akıl Yürütme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Akıl Yürütme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Akıl Yürütme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Problem Çözme (Tema 2)": [
                "Zeka oyunlarında alternatif yollar bulur.",
                "'Problem Çözme' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Problem Çözme' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Problem Çözme' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Problem Çözme' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "Daily Life (Tema 1)": [
                "Günlük konuşmaları anlar.",
                "'Daily Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Daily Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Daily Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Daily Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Allah İnancı (Tema 1)": [
                "Allah'ın zati ve subuti sıfatlarını açıklar.",
                "'Allah İnancı' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Allah İnancı' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Allah İnancı' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Allah İnancı' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Peygamberlere İman (Tema 2)": [
                "Peygamberlerin insanlık için önemini kavrar.",
                "'Peygamberlere İman' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Peygamberlere İman' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Peygamberlere İman' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Peygamberlere İman' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "İbadet ve Temizlik (Tema 3)": [
                "İslam'da temizliğin önemini ve ibadetlerle ilişkisini açıklar.",
                "'İbadet ve Temizlik' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'İbadet ve Temizlik' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'İbadet ve Temizlik' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'İbadet ve Temizlik' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Güzel Ahlak (Tema 4)": [
                "İslam'ın güzel ahlaka verdiği önemi kavrar.",
                "'Güzel Ahlak' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Güzel Ahlak' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Güzel Ahlak' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Güzel Ahlak' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Hz. Muhammed'in Hayatı (Tema 5)": [
                "Hz. Muhammed'in çocukluk ve gençlik yıllarını açıklar.",
                "'Hz. Muhammed'in Hayatı' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Hz. Muhammed'in Hayatı' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Hz. Muhammed'in Hayatı' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Hz. Muhammed'in Hayatı' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        }
    },
    "6. Sınıf": {
        "Türkçe": {
            "Dilimizin Zenginliği (Tema 1)": [
                "Türkçenin söz varlığını zenginleştiren metinleri okur.",
                "'Dilimizin Zenginliği' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Dilimizin Zenginliği' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Dilimizin Zenginliği' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Dilimizin Zenginliği' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Bağımsızlık Yolu (Tema 2)": [
                "Millî mücadele temalı metinleri analiz eder.",
                "'Bağımsızlık Yolu' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Bağımsızlık Yolu' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Bağımsızlık Yolu' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Bağımsızlık Yolu' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Farklı Dünyalar (Tema 3)": [
                "Hayal gücünü geliştiren kurgusal metinleri yorumlar.",
                "'Farklı Dünyalar' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Farklı Dünyalar' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Farklı Dünyalar' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Farklı Dünyalar' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "İletişim ve Sosyal İlişkiler (Tema 4)": [
                "İletişim becerilerini vurgulayan olay yazılarını anlar.",
                "'İletişim ve Sosyal İlişkiler' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'İletişim ve Sosyal İlişkiler' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'İletişim ve Sosyal İlişkiler' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'İletişim ve Sosyal İlişkiler' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Bilim ve Teknoloji (Tema 5)": [
                "Bilimsel metinleri okur ve araştırma yapar.",
                "'Bilim ve Teknoloji' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Bilim ve Teknoloji' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Bilim ve Teknoloji' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Bilim ve Teknoloji' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Lider Ruhlar (Tema 6)": [
                "Liderlik özelliklerini anlatan metinleri inceler.",
                "'Lider Ruhlar' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Lider Ruhlar' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Lider Ruhlar' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Lider Ruhlar' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ]
        },
        "Matematik": {
            "Sayılar ve Nicelikler (Tema 1)": [
                "Tam sayıları tanır, karşılaştırır ve sıralar.",
                "Çarpanlar ve katlar (EBOB, EKOK) hesaplar.",
                "Kesirlerde dört işlem yapar.",
                "Ondalık sayılarla işlemler yapar.",
                "Yüzde hesaplamaları yapar."
            ],
            "İşlemlerle Cebirsel Düşünme ve Değişimler (Tema 2)": [
                "Değişken kavramını açıklar.",
                "Cebirsel ifadelerle işlem yapar.",
                "Birinci dereceden denklemleri çözer.",
                "Oran ve orantı kavramlarını uygular."
            ],
            "Geometrik Şekiller (Tema 3)": [
                "Açı türlerini sınıflandırır.",
                "Üçgenlerin ve dörtgenlerin özelliklerini inceler.",
                "Çokgenlerin iç açılarının toplamını hesaplar.",
                "Koordinat sisteminde çalışır."
            ],
            "Geometrik Nicelikler (Tema 4)": [
                "Dörtgenlerin alan ve çevrelerini hesaplar.",
                "'Geometrik Nicelikler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometrik Nicelikler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometrik Nicelikler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometrik Nicelikler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "İstatistiksel Araştırma Süreci (Tema 5)": [
                "Veri toplar ve düzenler.",
                "'İstatistiksel Araştırma Süreci' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İstatistiksel Araştırma Süreci' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İstatistiksel Araştırma Süreci' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İstatistiksel Araştırma Süreci' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Veriden Olasılığa (Tema 6)": [
                "Olasılık deneyleri yapar.",
                "'Veriden Olasılığa' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veriden Olasılığa' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veriden Olasılığa' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veriden Olasılığa' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fen Bilimleri": {
            "Güneş Sistemi ve Tutulmalar (Tema 1)": [
                "Güneş sistemindeki gezegenleri sınıflandırır.",
                "'Güneş Sistemi ve Tutulmalar' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Güneş Sistemi ve Tutulmalar' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Güneş Sistemi ve Tutulmalar' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Güneş Sistemi ve Tutulmalar' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Kuvvetin Etkisinde Hareket (Tema 2)": [
                "Bileşke kuvveti ve sürati hesaplar.",
                "'Kuvvetin Etkisinde Hareket' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Kuvvetin Etkisinde Hareket' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Kuvvetin Etkisinde Hareket' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Kuvvetin Etkisinde Hareket' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Canlılarda Sistemler (Tema 3)": [
                "Destek ve hareket, sindirim, dolaşım sistemlerini açıklar.",
                "'Canlılarda Sistemler' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Canlılarda Sistemler' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Canlılarda Sistemler' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Canlılarda Sistemler' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Işığın Yansıması ve Renkler (Tema 4)": [
                "Işığın yansıması ve aynaları açıklar.",
                "'Işığın Yansıması ve Renkler' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Işığın Yansıması ve Renkler' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Işığın Yansıması ve Renkler' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Işığın Yansıması ve Renkler' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Maddenin Ayırt Edici Özellikleri (Tema 5)": [
                "Yoğunluk kavramını hesaplar ve deneylerle gösterir.",
                "'Maddenin Ayırt Edici Özellikleri' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Maddenin Ayırt Edici Özellikleri' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Maddenin Ayırt Edici Özellikleri' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Maddenin Ayırt Edici Özellikleri' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Elektriğin İletimi ve Direnç (Tema 6)": [
                "İletken ve yalıtkan maddeleri test eder.",
                "'Elektriğin İletimi ve Direnç' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Elektriğin İletimi ve Direnç' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Elektriğin İletimi ve Direnç' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Elektriğin İletimi ve Direnç' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Sürdürülebilir Yaşam ve Etkileşim (Tema 7)": [
                "Kaynakların verimli kullanımını tartışır.",
                "'Sürdürülebilir Yaşam ve Etkileşim' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Sürdürülebilir Yaşam ve Etkileşim' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilir Yaşam ve Etkileşim' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Sürdürülebilir Yaşam ve Etkileşim' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ]
        },
        "Sosyal Bilgiler": {
            "Birlikte Yaşamak (Tema 1)": [
                "Toplumsal uyum ve yardımlaşmanın önemini açıklar.",
                "'Birlikte Yaşamak' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Birlikte Yaşamak' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Birlikte Yaşamak' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Birlikte Yaşamak' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Evimiz Dünya (Tema 2)": [
                "Farklı iklim tiplerinin insan yaşamına etkisini açıklar.",
                "'Evimiz Dünya' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Evimiz Dünya' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Evimiz Dünya' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Evimiz Dünya' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Ortak Mirasımız (Tema 3)": [
                "Türklerin tarihsel süreçteki göçlerini ve kültürünü değerlendirir.",
                "'Ortak Mirasımız' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ortak Mirasımız' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ortak Mirasımız' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ortak Mirasımız' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Yaşayan Demokrasimiz (Tema 4)": [
                "Demokratik yönetim biçimlerini karşılaştırır.",
                "'Yaşayan Demokrasimiz' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Yaşayan Demokrasimiz' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Yaşayan Demokrasimiz' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Yaşayan Demokrasimiz' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Hayatımızdaki Ekonomi (Tema 5)": [
                "Türkiye'nin ekonomik kaynaklarını ve yatırım projelerini tartışır.",
                "'Hayatımızdaki Ekonomi' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Hayatımızdaki Ekonomi' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Hayatımızdaki Ekonomi' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Hayatımızdaki Ekonomi' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Teknoloji ve Sosyal Bilimler (Tema 6)": [
                "Bilimsel ve teknolojik gelişmelerin geleceğe etkisini açıklar.",
                "'Teknoloji ve Sosyal Bilimler' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Teknoloji ve Sosyal Bilimler' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Teknoloji ve Sosyal Bilimler' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Teknoloji ve Sosyal Bilimler' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "Life (Tema 1)": [
                "Günlük yaşam aktiviteleri hakkında detaylı bilgi verir.",
                "'Life' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Yummy Breakfast (Tema 2)": [
                "Yiyecek ve içecek tercihleri hakkında konuşur.",
                "'Yummy Breakfast' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Yummy Breakfast' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Yummy Breakfast' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Yummy Breakfast' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Downtown (Tema 3)": [
                "Şehir hayatı ile ilgili karşılaştırmalar (comparatives) yapar.",
                "'Downtown' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Downtown' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Downtown' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Downtown' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Weather and Emotions (Tema 4)": [
                "Hava durumunu ve duygularını ifade eder.",
                "'Weather and Emotions' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Weather and Emotions' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Weather and Emotions' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Weather and Emotions' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "At the Fair (Tema 5)": [
                "Lunapark araçları hakkında duygu ve düşüncelerini söyler.",
                "'At the Fair' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'At the Fair' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'At the Fair' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'At the Fair' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Occupations (Tema 6)": [
                "Meslekleri tanıtır ve mesleki yeteneklerden bahseder.",
                "'Occupations' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Occupations' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Occupations' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Occupations' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Holidays (Tema 7)": [
                "Geçmiş zaman (Past Tense) kullanarak tatil anılarını anlatır.",
                "'Holidays' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Holidays' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Holidays' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Holidays' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Saving the Planet (Tema 8)": [
                "Çevre koruma ile ilgili tavsiyelerde bulunur (should/shouldn't).",
                "'Saving the Planet' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Saving the Planet' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Saving the Planet' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Saving the Planet' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "Bilişim Teknolojilerinin Hayatımızdaki Yeri (Tema 1)": [
                "Geleceğin yenilikçi teknolojilerini tartışır.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Bilişim Teknolojilerinin Hayatımızdaki Yeri' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Bilişim Teknolojilerinin Hayatımızdaki Yeri' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Dijital Ürün Tasarımı ve Geliştirme (Tema 2)": [
                "Elektronik tablolama, ses ve video düzenleme araçlarını kullanır.",
                "'Dijital Ürün Tasarımı ve Geliştirme' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Dijital Ürün Tasarımı ve Geliştirme' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Dijital Ürün Tasarımı ve Geliştirme' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Dijital Ürün Tasarımı ve Geliştirme' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Bilgisayar Ağları ve İletişim (Tema 3)": [
                "İnternet altyapısı ve veri iletim kavramlarını açıklar.",
                "'Bilgisayar Ağları ve İletişim' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Bilgisayar Ağları ve İletişim' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Bilgisayar Ağları ve İletişim' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Bilgisayar Ağları ve İletişim' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Siber Güvenlik (Tema 4)": [
                "Siber saldırılara karşı alınacak kişisel önlemleri uygular.",
                "'Siber Güvenlik' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Siber Güvenlik' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Siber Güvenlik' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Siber Güvenlik' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Yapay Zekâ Uygulamaları (Tema 5)": [
                "Makine öğrenmesi kavramını basit örneklerle kavrar.",
                "'Yapay Zekâ Uygulamaları' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Yapay Zekâ Uygulamaları' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Yapay Zekâ Uygulamaları' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Yapay Zekâ Uygulamaları' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Blok Tabanlı Programlama (Tema 6)": [
                "Değişken, döngü ve karar yapılarını kullanarak oyun geliştirir.",
                "'Blok Tabanlı Programlama' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Blok Tabanlı Programlama' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Blok Tabanlı Programlama' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Blok Tabanlı Programlama' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Farklı müzik türlerini ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Basit ritmik ve ezgisel motifler oluşturur.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Görsel sanat eserlerini analiz eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Özgün sanatsal çalışmalar tasarlar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel spor becerilerini oyun içinde kullanır.",
                "'Hareket Yetkinliği' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Hareket Yetkinliği' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli egzersizin fiziksel gelişime etkisini açıklar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "Seçmeli Zeka Oyunları": {
            "Strateji Oyunları (Tema 1)": [
                "Satranç ve benzeri oyunlarda hamle planlar.",
                "'Strateji Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Strateji Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Strateji Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Strateji Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Hafıza Oyunları (Tema 2)": [
                "Görsel hafıza tekniklerini kullanır.",
                "'Hafıza Oyunları' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Hafıza Oyunları' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Hafıza Oyunları' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Hafıza Oyunları' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "My World (Tema 1)": [
                "İlgi alanları hakkında konuşur.",
                "'My World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'My World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'My World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'My World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Peygamber ve İlahi Kitap İnancı (Tema 1)": [
                "İlahi kitapların gönderiliş amacını açıklar.",
                "'Peygamber ve İlahi Kitap İnancı' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Peygamber ve İlahi Kitap İnancı' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Peygamber ve İlahi Kitap İnancı' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Peygamber ve İlahi Kitap İnancı' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Ramazan ve Oruç (Tema 2)": [
                "Oruç ibadetinin önemini ve faydalarını kavrar.",
                "'Ramazan ve Oruç' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Ramazan ve Oruç' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Ramazan ve Oruç' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Ramazan ve Oruç' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Ahlaki Davranışlar (Tema 3)": [
                "İslam'ın övdüğü ahlaki davranışlara örnek verir.",
                "'Ahlaki Davranışlar' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Ahlaki Davranışlar' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Ahlaki Davranışlar' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Ahlaki Davranışlar' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Peygamberliğinden Önce Hz. Muhammed (Tema 4)": [
                "Hz. Muhammed'in peygamberlik öncesi erdemli davranışlarını açıklar.",
                "'Peygamberliğinden Önce Hz. Muhammed' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Peygamberliğinden Önce Hz. Muhammed' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Peygamberliğinden Önce Hz. Muhammed' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Peygamberliğinden Önce Hz. Muhammed' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Kültürümüzdeki Dinî Motifler (Tema 5)": [
                "Din ve kültür ilişkisini edebiyat, mimari ve musikideki örneklerle açıklar.",
                "'Kültürümüzdeki Dinî Motifler' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Kültürümüzdeki Dinî Motifler' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Kültürümüzdeki Dinî Motifler' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Kültürümüzdeki Dinî Motifler' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        }
    },
    "7. Sınıf": {
        "Türkçe": {
            "Hayat Boyu Gelişim (Tema 1)": [
                "Kişisel gelişim temalı metinleri analiz eder.",
                "'Hayat Boyu Gelişim' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Hayat Boyu Gelişim' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Hayat Boyu Gelişim' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Hayat Boyu Gelişim' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Bir Hilal Uğruna (Tema 2)": [
                "Vatan ve kahramanlık temalı edebî metinleri okur.",
                "'Bir Hilal Uğruna' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Bir Hilal Uğruna' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Bir Hilal Uğruna' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Bir Hilal Uğruna' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "İletişim ve Sosyal İlişkiler (Tema 3)": [
                "Farklı bakış açıları sunan metinleri tartışır.",
                "'İletişim ve Sosyal İlişkiler' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'İletişim ve Sosyal İlişkiler' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'İletişim ve Sosyal İlişkiler' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'İletişim ve Sosyal İlişkiler' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Türk Sanatı (Tema 4)": [
                "Sanat ve estetik değerleri anlatan metinleri yorumlar.",
                "'Türk Sanatı' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Türk Sanatı' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Türk Sanatı' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Türk Sanatı' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Okuma Kültürü (Tema 5)": [
                "Kitap okuma alışkanlığı üzerine yazılmış denemeleri kavrar.",
                "'Okuma Kültürü' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Okuma Kültürü' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Okuma Kültürü' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Okuma Kültürü' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ],
            "Hak ve Sorumluluklar (Tema 6)": [
                "Vatandaşlık bilincini geliştiren metinler yazar.",
                "'Hak ve Sorumluluklar' bağlamında okuduğu metindeki örtük anlamları çıkarır.",
                "'Hak ve Sorumluluklar' konularını incelerken metnin ana fikrini ve yardımcı fikirlerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Hak ve Sorumluluklar' alanında konuyla ilgili farklı bakış açılarını tartışır.",
                "'Hak ve Sorumluluklar' konusunun günlük yaşamdaki yeri hakkında kendi duygu ve düşüncelerini yaratıcı bir şekilde yazıya döker."
            ]
        },
        "Matematik": {
            "Sayılar ve Nicelikler (Tema 1)": [
                "Tam sayılarla dört işlem yapar.",
                "Rasyonel sayıları tanır, sıralar ve işlem yapar.",
                "Oran ve orantıyı kavrar ve uygular.",
                "Yüzde, faiz ve iskonto problemleri çözer."
            ],
            "İşlemlerle Cebirsel Düşünme ve Değişimler (Tema 2)": [
                "Cebirsel ifadelerde çarpanlara ayırır.",
                "Birinci dereceden denklem kurar ve çözer.",
                "Birinci dereceden eşitsizlikleri çözer.",
                "Doğrusal ilişkileri grafikle gösterir."
            ],
            "Geometrik Şekiller (Tema 3)": [
                "Üçgenlerin ve çokgenlerin özelliklerini inceler.",
                "Açıortay, kenarortay ve yükseklik kavramlarını açıklar.",
                "Benzerlik kavramını uygular.",
                "Koordinat sisteminde geometrik çizimler yapar."
            ],
            "Geometrik Nicelikler (Tema 4)": [
                "Üçgen ve çokgenlerin alan ve çevrelerini hesaplar.",
                "'Geometrik Nicelikler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometrik Nicelikler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometrik Nicelikler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometrik Nicelikler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "İstatistiksel Araştırma Süreci (Tema 5)": [
                "İstatistiksel araştırma süreci uygular.",
                "'İstatistiksel Araştırma Süreci' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İstatistiksel Araştırma Süreci' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İstatistiksel Araştırma Süreci' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İstatistiksel Araştırma Süreci' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fen Bilimleri": {
            "Uzay Çağı (Tema 1)": [
                "Uzay araştırmalarının teknolojideki yerini tartışır.",
                "'Uzay Çağı' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Uzay Çağı' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Uzay Çağı' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Uzay Çağı' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Kuvvet ve Enerjiyi Keşfedelim (Tema 2)": [
                "Kinetik ve potansiyel enerji kavramlarını açıklar.",
                "'Kuvvet ve Enerjiyi Keşfedelim' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Kuvvet ve Enerjiyi Keşfedelim' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Kuvvet ve Enerjiyi Keşfedelim' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Kuvvet ve Enerjiyi Keşfedelim' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Hücreden Organizmaya (Tema 3)": [
                "Hücrenin yapısını ve bölünme çeşitlerini (mitoz, mayoz) kavrar.",
                "'Hücreden Organizmaya' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Hücreden Organizmaya' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Hücreden Organizmaya' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Hücreden Organizmaya' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Madde ve Doğası (Tema 4)": [
                "Saf maddeleri ve karışımları ayırt eder.",
                "'Madde ve Doğası' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Madde ve Doğası' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Madde ve Doğası' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Madde ve Doğası' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Işığın Madde İle Etkileşimi (Tema 5)": [
                "Işığın kırılmasını ve mercekleri açıklar.",
                "'Işığın Madde İle Etkileşimi' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Işığın Madde İle Etkileşimi' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Işığın Madde İle Etkileşimi' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Işığın Madde İle Etkileşimi' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Canlılarda Üreme, Büyüme, Gelişme (Tema 6)": [
                "Bitki ve hayvanlarda üreme süreçlerini açıklar.",
                "'Canlılarda Üreme, Büyüme, Gelişme' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Canlılarda Üreme, Büyüme, Gelişme' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Canlılarda Üreme, Büyüme, Gelişme' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Canlılarda Üreme, Büyüme, Gelişme' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ],
            "Sürdürülebilir Yaşam ve Enerji (Tema 7)": [
                "Elektrik devrelerinde akım, gerilim ve direnç ilişkisini açıklar.",
                "'Sürdürülebilir Yaşam ve Enerji' bağlamında konuyla ilgili bilimsel süreç becerilerini (gözlem, hipotez) uygular.",
                "'Sürdürülebilir Yaşam ve Enerji' konularını incelerken doğal fenomenlerin neden-sonuç ilişkilerini analiz eder.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilir Yaşam ve Enerji' alanında deney verilerini kullanarak geçerli sonuçlar çıkarır.",
                "'Sürdürülebilir Yaşam ve Enerji' konusunun günlük yaşamdaki yeri hakkında teknolojik gelişmelerin sürdürülebilirliğe etkisini tartışır."
            ]
        },
        "Sosyal Bilgiler": {
            "Birlikte Yaşamak (Tema 1)": [
                "İletişim araçlarının birey ve toplum üzerindeki etkisini açıklar.",
                "'Birlikte Yaşamak' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Birlikte Yaşamak' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Birlikte Yaşamak' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Birlikte Yaşamak' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Evimiz Dünya (Tema 2)": [
                "Nüfus dağılışını etkileyen faktörleri sorgular.",
                "'Evimiz Dünya' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Evimiz Dünya' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Evimiz Dünya' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Evimiz Dünya' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Ortak Mirasımız (Tema 3)": [
                "Osmanlı Devleti'nin kuruluşunu ve kültürel mirasını değerlendirir.",
                "'Ortak Mirasımız' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Ortak Mirasımız' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Ortak Mirasımız' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Ortak Mirasımız' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Yaşayan Demokrasimiz (Tema 4)": [
                "Türkiye Cumhuriyeti'nin demokratikleşme adımlarını açıklar.",
                "'Yaşayan Demokrasimiz' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Yaşayan Demokrasimiz' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Yaşayan Demokrasimiz' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Yaşayan Demokrasimiz' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Hayatımızdaki Ekonomi (Tema 5)": [
                "Meslek seçiminde ilgi, yetenek ve değerlerin rolünü kavrar.",
                "'Hayatımızdaki Ekonomi' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Hayatımızdaki Ekonomi' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Hayatımızdaki Ekonomi' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Hayatımızdaki Ekonomi' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ],
            "Teknoloji ve Sosyal Bilimler (Tema 6)": [
                "Kurumların sosyal yaşama ve dayanışmaya katkısını araştırır.",
                "'Teknoloji ve Sosyal Bilimler' bağlamında tarihsel ve coğrafi kanıtları kullanarak çıkarım yapar.",
                "'Teknoloji ve Sosyal Bilimler' konularını incelerken toplumsal sorunlara farklı açılardan yaklaşarak çözüm üretir.",
                "Öğrendiği bilgileri kullanarak 'Teknoloji ve Sosyal Bilimler' alanında insan-mekan etkileşimini harita ve grafikler üzerinden açıklar.",
                "'Teknoloji ve Sosyal Bilimler' konusunun günlük yaşamdaki yeri hakkında kavramların tarihsel değişimini ve sürekliliğini analiz eder."
            ]
        },
        "İngilizce": {
            "School Life & Education (Tema 1)": [
                "Eğitim hayatı ve okul alışkanlıkları hakkında konuşur.",
                "'School Life & Education' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'School Life & Education' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'School Life & Education' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'School Life & Education' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Classroom Life & Learning (Tema 2)": [
                "Sınıf içi öğrenme stratejileri ve kurallarını tartışır.",
                "'Classroom Life & Learning' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Classroom Life & Learning' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Classroom Life & Learning' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Classroom Life & Learning' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Personal Life & Well-Being (Tema 3)": [
                "Fiziksel ve kişisel özellikleri tarif eder.",
                "'Personal Life & Well-Being' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Personal Life & Well-Being' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Personal Life & Well-Being' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Personal Life & Well-Being' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Family Life & Home (Tema 4)": [
                "Aile içi sorumluluklar ve ev işleri hakkında konuşur.",
                "'Family Life & Home' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Family Life & Home' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Family Life & Home' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Family Life & Home' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in the Neighbourhood (Tema 5)": [
                "Mahalle ve şehirdeki sosyal yaşamı detaylandırır.",
                "'Life in the Neighbourhood' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in the Neighbourhood' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in the Neighbourhood' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in the Neighbourhood' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in the World & Culture (Tema 6)": [
                "Farklı kültürler, televizyon programları ve inanışlar hakkında konuşur.",
                "'Life in the World & Culture' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in the World & Culture' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in the World & Culture' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in the World & Culture' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in Nature (Tema 7)": [
                "Vahşi hayvanlar ve doğayı koruma yollarını anlatır.",
                "'Life in Nature' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in Nature' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in Nature' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in Nature' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Life in the Universe & Future (Tema 8)": [
                "Gelecek zaman kullanarak uzay ve gelecek planları yapar.",
                "'Life in the Universe & Future' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Life in the Universe & Future' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Life in the Universe & Future' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Life in the Universe & Future' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Teknoloji ve Tasarım": {
            "Tasarım Süreci (Tema 1)": [
                "Tasarım sürecinin adımlarını uygulayarak yenilikçi fikirler geliştirir.",
                "'Tasarım Süreci' bağlamında karşılaştığı bir soruna yönelik inovatif tasarım süreçlerini planlar.",
                "'Tasarım Süreci' konularını incelerken farklı malzemeleri kullanarak kullanılabilir bir prototip geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Tasarım Süreci' alanında ürün tasarımında ergonomi ve estetik ilkelerini uygular.",
                "'Tasarım Süreci' konusunun günlük yaşamdaki yeri hakkında kendi ürettiği çözümü patent, telif ve pazarlama açısından değerlendirir."
            ],
            "İnovasyon ve Girişimcilik (Tema 2)": [
                "Girişimcilik kavramını açıklar ve inovatif ürün tasarlar.",
                "'İnovasyon ve Girişimcilik' bağlamında karşılaştığı bir soruna yönelik inovatif tasarım süreçlerini planlar.",
                "'İnovasyon ve Girişimcilik' konularını incelerken farklı malzemeleri kullanarak kullanılabilir bir prototip geliştirir.",
                "Öğrendiği bilgileri kullanarak 'İnovasyon ve Girişimcilik' alanında ürün tasarımında ergonomi ve estetik ilkelerini uygular.",
                "'İnovasyon ve Girişimcilik' konusunun günlük yaşamdaki yeri hakkında kendi ürettiği çözümü patent, telif ve pazarlama açısından değerlendirir."
            ],
            "Bilgisayar Destekli Tasarım (Tema 3)": [
                "3 boyutlu modelleme yazılımlarını kullanarak ürün tasarımı yapar.",
                "'Bilgisayar Destekli Tasarım' bağlamında karşılaştığı bir soruna yönelik inovatif tasarım süreçlerini planlar.",
                "'Bilgisayar Destekli Tasarım' konularını incelerken farklı malzemeleri kullanarak kullanılabilir bir prototip geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Bilgisayar Destekli Tasarım' alanında ürün tasarımında ergonomi ve estetik ilkelerini uygular.",
                "'Bilgisayar Destekli Tasarım' konusunun günlük yaşamdaki yeri hakkında kendi ürettiği çözümü patent, telif ve pazarlama açısından değerlendirir."
            ]
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "Programlama Temelleri (Tema 1)": [
                "Scratch ile karmaşık projeler geliştirir.",
                "'Programlama Temelleri' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Programlama Temelleri' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Programlama Temelleri' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Programlama Temelleri' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ],
            "Veri Yönetimi (Tema 2)": [
                "Elektronik tablolar (Excel) kullanır.",
                "'Veri Yönetimi' bağlamında problem çözümüne yönelik algoritmik düşünme stratejileri geliştirir.",
                "'Veri Yönetimi' konularını incelerken dijital etiğe ve siber güvenlik kurallarına uygun davranır.",
                "Öğrendiği bilgileri kullanarak 'Veri Yönetimi' alanında blok tabanlı veya metin tabanlı programlama ile ürün tasarlar.",
                "'Veri Yönetimi' konusunun günlük yaşamdaki yeri hakkında verileri toplar, işler ve dijital araçlarla görselleştirir."
            ]
        },
        "Müzik": {
            "Müziksel Algı ve Bilgilenme (Tema 1)": [
                "Farklı müzik türlerini ayırt eder.",
                "'Müziksel Algı ve Bilgilenme' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Algı ve Bilgilenme' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Algı ve Bilgilenme' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Algı ve Bilgilenme' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ],
            "Müziksel Yaratıcılık (Tema 2)": [
                "Basit ritmik ve ezgisel motifler oluşturur.",
                "'Müziksel Yaratıcılık' bağlamında farklı müzik türlerini dinleyerek ritim ve ezgi yapısını analiz eder.",
                "'Müziksel Yaratıcılık' konularını incelerken sesini ve/veya çalgısını doğru teknikle kullanarak müzik yapar.",
                "Öğrendiği bilgileri kullanarak 'Müziksel Yaratıcılık' alanında müziğin toplum, tarih ve kültürle olan bağını yorumlar.",
                "'Müziksel Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında müzikal fikirlerini teknolojik araçlar kullanarak besteye dönüştürür."
            ]
        },
        "Görsel Sanatlar": {
            "Görsel Sanat Kültürü (Tema 1)": [
                "Görsel sanat eserlerini analiz eder.",
                "'Görsel Sanat Kültürü' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Görsel Sanat Kültürü' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Görsel Sanat Kültürü' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Görsel Sanat Kültürü' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanatsal Tasarım (Tema 2)": [
                "Özgün sanatsal çalışmalar tasarlar.",
                "'Sanatsal Tasarım' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanatsal Tasarım' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanatsal Tasarım' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanatsal Tasarım' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Hareket Yetkinliği (Tema 1)": [
                "Temel spor becerilerini oyun içinde kullanır.",
                "'Hareket Yetkinliği' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Hareket Yetkinliği' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Hareket Yetkinliği' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Hareket Yetkinliği' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "Aktif ve Sağlıklı Yaşam (Tema 2)": [
                "Düzenli egzersizin fiziksel gelişime etkisini açıklar.",
                "'Aktif ve Sağlıklı Yaşam' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Aktif ve Sağlıklı Yaşam' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Aktif ve Sağlıklı Yaşam' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Aktif ve Sağlıklı Yaşam' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "Seçmeli Zeka Oyunları": {
            "Mantıksal Çıkarım (Tema 1)": [
                "Karmaşık problemleri alt adımlara böler.",
                "'Mantıksal Çıkarım' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Mantıksal Çıkarım' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Mantıksal Çıkarım' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Mantıksal Çıkarım' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Yaratıcılık (Tema 2)": [
                "Farklı çözüm yolları üretir.",
                "'Yaratıcılık' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Yaratıcılık' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Yaratıcılık' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Yaratıcılık' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "Travel and Culture (Tema 1)": [
                "Gezi planı yapar.",
                "'Travel and Culture' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Travel and Culture' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Travel and Culture' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Travel and Culture' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Melek ve Ahiret İnancı (Tema 1)": [
                "Varlıklar alemini sınıflandırır ve ahiret inancını açıklar.",
                "'Melek ve Ahiret İnancı' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Melek ve Ahiret İnancı' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Melek ve Ahiret İnancı' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Melek ve Ahiret İnancı' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Hac, Umre ve Kurban (Tema 2)": [
                "Hac ve kurban ibadetlerinin birey ve toplum için önemini kavrar.",
                "'Hac, Umre ve Kurban' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Hac, Umre ve Kurban' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Hac, Umre ve Kurban' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Hac, Umre ve Kurban' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "İslam Düşüncesinde Yorumlar (Tema 3)": [
                "İslam düşüncesindeki tasavvufi ve fıkhi yorum farklılıklarını kavrar.",
                "'İslam Düşüncesinde Yorumlar' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'İslam Düşüncesinde Yorumlar' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'İslam Düşüncesinde Yorumlar' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'İslam Düşüncesinde Yorumlar' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Peygamber Olarak Hz. Muhammed (Tema 4)": [
                "Hz. Muhammed'in peygamberlik yönünü ve rahmet elçisi oluşunu açıklar.",
                "'Peygamber Olarak Hz. Muhammed' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Peygamber Olarak Hz. Muhammed' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Peygamber Olarak Hz. Muhammed' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Peygamber Olarak Hz. Muhammed' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Yaşayan Dünya Dinleri (Tema 5)": [
                "Yahudilik, Hristiyanlık, Hinduizm ve Budizm'in temel özelliklerini tanır.",
                "'Yaşayan Dünya Dinleri' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Yaşayan Dünya Dinleri' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Yaşayan Dünya Dinleri' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Yaşayan Dünya Dinleri' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        }
    },
    "8. Sınıf": {
        "Türkçe": {
            "1. Tema: Erdemler": [
                "Fiilimsilerin (isim-fiil, sıfat-fiil, zarf-fiil) işlevlerini ve cümledeki görevlerini kavrar.",
                "Metindeki söz sanatlarını (teşbih, istiare, kişileştirme, tezat, konuşturma) tespit eder.",
                "Okuduğu metnin konusunu, ana fikrini ve yardımcı fikirlerini belirler.",
                "Erdemler ve insani değerlerle ilgili düşünce yazısı (makale, deneme) yazar."
            ],
            "2. Tema: Millî Mücadele ve Atatürk": [
                "Cümlenin ögelerini (özne, yüklem, nesne, yer tamlayıcısı, zarf tamlayıcısı) ayırt eder.",
                "Metindeki anlatım biçimlerini (açıklama, tartışma, öyküleme, betimleme) ve düşünceyi geliştirme yollarını belirler.",
                "Atatürk'ün ilkelerini ve liderlik vasıflarını yansıtan metinleri analiz eder.",
                "Yazılarında anlatım bozukluklarını tespit eder ve düzeltir."
            ],
            "3. Tema: Bilim ve Teknoloji": [
                "Fiilde çatı (özne-yüklem ve nesne-yüklem ilişkisi) özelliklerini kavrar.",
                "Bilgilendirici metinlerdeki grafik, tablo ve infografikleri yorumlar.",
                "Yapay zeka ve teknolojik gelişmelerle ilgili eleştirel bir deneme yazar.",
                "Metin türlerini (fıkra, makale, deneme, söyleşi) biçim ve içerik açısından ayırt eder."
            ],
            "4. Tema: Birey ve Toplum": [
                "Cümle türlerini (anlamına, yüklemin türüne, yerine ve yapısına göre) analiz eder.",
                "Metinler arası karşılaştırma yaparak ortak ve farklı bakış açılarını değerlendirir.",
                "Toplumsal sorunlara çözüm önerisi getiren ikna edici bir konuşma yapar.",
                "Noktalama işaretlerini ve yazım kurallarını metinlerinde kusursuz uygular."
            ],
            "5. Tema: Zaman ve Mekân": [
                "Metindeki örtülü anlamları ve alt metinleri çıkarır.",
                "Hikâye edici metinlerde olay örgüsü, zaman, mekân ve anlatıcı unsurlarını inceler.",
                "Zaman yönetimi ve mekânın insan psikolojisine etkisi üzerine özgün bir hikâye kurgular.",
                "Deyim, atasözü ve vecizelerin metnin anlamına katkısını açıklar."
            ],
            "6. Tema: Millî Kültürümüz": [
                "Kültürel mirasımızı yansıtan edebi metinleri dil ve üslup yönünden inceler.",
                "Görsel okuma yaparak afiş, karikatür ve belgeselleri eleştirel gözle değerlendirir.",
                "Geleneksel sanatlarımız ve tarihimizle ilgili araştırmaya dayalı bir rapor hazırlar.",
                "Kelime gruplarını ve sözcükte anlam inceliklerini kavrar."
            ],
            "7. Tema: Doğa ve Evren": [
                "Paragrafta yapı (giriş, gelişme, sonuç cümleleri, akışı bozan cümleler) kurallarını uygular.",
                "Çevre kirliliği ve iklim krizi temalı metinlerde neden-sonuç, amaç-sonuç ilişkilerini kurar.",
                "Mantık ve muhakeme sorularında çıkarım ve akıl yürütme becerilerini kullanır.",
                "Doğanın estetiğini yansıtan betimleyici bir metin yazar."
            ],
            "8. Tema: Sanat": [
                "Edebi metinlerin estetik değerini takdir eder ve sanatsal mesajını kavrar.",
                "Metindeki anlatım özelliklerini (akıcılık, duruluk, özgünlük, açıklık) değerlendirir.",
                "Sanatın toplumsal değişimdeki rolünü tartışan panel veya münazara yürütür.",
                "Kendine ait bir üslupla sanatsal bir eleştiri yazısı kaleme alır."
            ]
        },
        "Matematik": {
            "1. Ünite: Çarpanlar ve Katlar / Üslü İfadeler": [
                "Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, çarpanları üslü ifadelerin çarpımı şeklinde yazar.",
                "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer.",
                "Tam sayıların tam sayı kuvvetlerini hesaplar ve üslü ifadelerle çarpma/bölme işlemlerini yapar.",
                "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır."
            ],
            "2. Ünite: Kareköklü İfadeler / Veri Analizi": [
                "Tam kare pozitif tam sayıların kareköklerini belirler ve tam kare olmayan sayıların kareköklerini tahmin eder.",
                "Kareköklü bir ifadeyi a√b şeklinde yazar ve kareköklü ifadelerde toplama, çıkarma, çarpma, bölme yapar.",
                "Ondalık ifadelerin kareköklerini belirler ve gerçek sayıları rasyonel-irrasyonel olarak sınıflandırır.",
                "Verileri daire grafiği, sütun grafiği ve çizgi grafiği ile gösterir, grafikler arası dönüşümleri yorumlar."
            ],
            "3. Ünite: Basit Olayların Olma Olasılığı / Cebirsel İfadeler ve Özdeşlikler": [
                "Bir olayın olma olasılığını hesaplar, kesin ve imkânsız olayları açıklar.",
                "Olası durumların sayısını belirler ve eş olasılıklı durumları ayırt eder.",
                "Cebirsel ifadeleri çarpar ve modelleme yapar.",
                "Özdeşlikleri (iki kare farkı, tam kare ifadeler) modellerle açıklar ve cebirsel ifadeleri çarpanlarına ayırır."
            ],
            "4. Ünite: Doğrusal Denklemler / Eşitsizlikler": [
                "Birinci dereceden bir bilinmeyenli denklemleri çözer ve problem durumlarına uygular.",
                "Doğrusal ilişkileri tablo ve grafikle gösterir, doğrunun eğimini modellerle açıklar ve hesaplar.",
                "Doğru grafiklerini çizer ve eksenleri kestiği noktaları belirler.",
                "Birinci dereceden bir bilinmeyenli eşitsizlikleri sayı doğrusunda gösterir ve çözer."
            ],
            "5. Ünite: Üçgenler / Eşlik ve Benzerlik": [
                "Üçgende kenarortay, açıortay ve yükseklik elemanlarını çizer ve özelliklerini belirler.",
                "Üçgenin iki kenar uzunluğu ile bir açısının ölçüsü arasındaki bağıntıları ve üçgen eşitsizliğini kavrar.",
                "Pisagor bağıntısını modellerle açıklar ve geometrik problemlerde uygular.",
                "Benzer çokgenlerin benzerlik oranını belirler, üçgenlerin eşlik ve benzerlik şartlarını uygular."
            ],
            "6. Ünite: Dönüşüm Geometrisi / Geometrik Cisimler": [
                "Nokta, doğru parçası ve diğer şekillerin öteleme ve yansıma hareketlerini koordinat sisteminde yapar.",
                "Dik prizmaların (kare, dikdörtgen, üçgen prizma) açınımlarını çizer, yüzey alanı ve hacim bağıntılarını kavrar.",
                "Dik dairesel silindirin açınımını yapar, yüzey alanı ve hacmini hesaplar.",
                "Dik piramit ve dik koninin temel elemanlarını tanır ve açınımlarını inceler."
            ]
        },
        "Fen Bilimleri": {
            "1. Ünite: Mevsimler ve İklim": [
                "Mevsimlerin oluşumunda Dünya'nın dönme ekseninin eğikliğini ve Güneş etrafındaki dolanımını açıklar.",
                "İklim ve hava olayları arasındaki farkları belirler ve meteorolojinin çalışma alanını açıklar.",
                "Küresel iklim değişikliklerinin nedenlerini ve olası sonuçlarını tartışır."
            ],
            "2. Ünite: DNA ve Genetik Kod": [
                "Nükleotid, gen, DNA ve kromozom kavramlarını basitten karmaşığa sıralar ve ilişkisini kavrar.",
                "DNA'nın yapısını model üzerinde gösterir ve DNA'nın kendini eşlemesini açıklar.",
                "Tek karakter çaprazlamaları ile genotip ve fenotip oranlarını hesaplar.",
                "Mutasyon, modifikasyon, adaptasyon, doğal seçilim ve varyasyon kavramlarını ayırt eder.",
                "Biyoteknolojik uygulamaların olumlu ve olumsuz etkilerini etik açıdan değerlendirir."
            ],
            "3. Ünite: Basınç": [
                "Katı basıncını etkileyen değişkenleri (kuvvet ve yüzey alanı) deneylerle keşfeder.",
                "Sıvı basıncını etkileyen değişkenleri (derinlik ve yoğunluk) analiz eder.",
                "Açık hava basıncının varlığını kanıtlayan deneyleri yorumlar ve Torricelli deneyini kavrar.",
                "Pascal prensibinin günlük hayat ve teknolojideki (hidrolik fren, su cenderesi) uygulamalarını açıklar."
            ],
            "4. Ünite: Madde ve Endüstri": [
                "Periyodik sistemde elementleri metal, yarı metal, ametal ve soygaz olarak sınıflandırır.",
                "Fiziksel ve kimyasal değişimler arasındaki farkları deneylerle gözlemler.",
                "Kimyasal tepkimeleri model üzerinde gösterir ve kütlenin korunumunu açıklar.",
                "Asit ve bazların genel özelliklerini, pH ölçeğini ve asit yağmurlarının çevreye etkilerini inceler.",
                "Maddenin ısı ile etkileşiminde özgül ısı, hâl değişimi ısısı ve ısınma grafiklerini yorumlar."
            ],
            "5. Ünite: Basit Makineler": [
                "Basit makinelerin kuvvetten veya yoldan kazanç sağlama prensiplerini kavrar (işten kazanç olmadığını bilir).",
                "Sabit makara, hareketli makara ve palanga sistemlerini karşılaştırır.",
                "Kaldıraç çeşitlerini destek, yük ve kuvvetin konumuna göre analiz eder.",
                "Eğik düzlem, çıkrık, dişli çarklar ve vida mekanizmalarının günlük hayattaki işlevlerini inceler."
            ],
            "6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi": [
                "Besin zincirinde üretici, tüketici ve ayrıştırıcı canlılar arasındaki enerji akışını açıklar.",
                "Fotosentez hızını etkileyen faktörleri deneylerle test eder ve fotosentezin canlılar için önemini kavrar.",
                "Hücresel solunum çeşitlerini (oksijenli ve oksijensiz solunum) karşılaştırır.",
                "Su, karbon, azot ve oksijen döngülerini açıklar; küresel ısınmaya karşı sürdürülebilir kalkınmayı tartışır."
            ],
            "7. Ünite: Elektrik Yükleri ve Elektrik Enerjisi": [
                "Elektrik yüklerini ve sürtünme, dokunma, etki ile elektriklenme çeşitlerini açıklar.",
                "Elektroskopun çalışma prensibini deneylerle gösterir.",
                "Topraklama olayını ve günlük yaşamdaki güvenlik uygulamalarını kavrar.",
                "Elektrik enerjisinin ısı, ışık ve hareket enerjisine dönüşümünü modellerle açıklar; elektrik faturasını hesaplar."
            ]
        },
        "T.C. İnkılap Tarihi ve Atatürkçülük": {
            "1. Ünite: Bir Kahraman Doğuyor": [
                "20. yüzyıl başlarında Osmanlı Devleti'nin siyasi, sosyal ve ekonomik durumunu analiz eder.",
                "Mustafa Kemal'in çocukluk dönemi, eğitim hayatı ve fikir hayatını etkileyen kişileri inceler.",
                "Mustafa Kemal'in askerlik hayatındaki ilk görevlerini (Şam, 31 Mart, Trablusgarp, Balkan Savaşları) değerlendirir.",
                "Mustafa Kemal'in kişilik özelliklerini (vatanseverlik, teşkilatçılık, kararlılık vb.) olaylarla ilişkilendirir."
            ],
            "2. Ünite: Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar": [
                "I. Dünya Savaşı'nın sebeplerini, Osmanlı'nın savaşa girişini ve savaştığı cepheleri değerlendirir.",
                "Mondros Ateşkes Antlaşması'nın imzalanması ve yurdun işgaline karşı Kuvâ-yı Millîye hareketini kavrar.",
                "Mustafa Kemal'in Samsun'a çıkışı, Havza, Amasya, Erzurum ve Sivas genelgeleriyle örgütlenme sürecini inceler.",
                "Misak-ı Millî kararlarını, TBMM'nin açılışını, ayaklanmaları ve Sevr Barış Antlaşması'nı değerlendirir."
            ],
            "3. Ünite: Millî Bir Destan: Ya İstiklal Ya Ölüm!": [
                "Kurtuluş Savaşı'nda Doğu ve Güney cephelerindeki mücadeleleri analiz eder.",
                "Batı Cephesi'nde I. ve II. İnönü Savaşları, Kütahya-Eskişehir Muharebeleri sürecini açıklar.",
                "Tekâlif-i Millîye Emirleri'nin Türk milletinin fedakârlığı açısından önemini kavrar.",
                "Sakarya Meydan Muharebesi, Büyük Taarruz, Mudanya Ateşkesi ve Lozan Barış Antlaşması'nı analiz eder."
            ],
            "4. Ünite: Atatürkçülük ve Çağdaşlaşan Türkiye": [
                "Atatürk ilkelerini (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık) kavrar.",
                "Siyasal alanda yapılan inkılapları (Saltanatın kaldırılması, Cumhuriyetin ilanı, Halifeliğin kaldırılması) açıklar.",
                "Hukuk, eğitim-kültür ve toplumsal alanda yapılan çağdaşlaşma adımlarını değerlendirir.",
                "Ekonomi alanında İzmir İktisat Kongresi, Kabotaj Kanunu ve kalkınma planlarının etkilerini açıklar."
            ],
            "5. Ünite: Demokratikleşme Çabaları": [
                "Cumhuriyet Halk Fırkası, Terakkiperver Cumhuriyet Fırkası ve Serbest Cumhuriyet Fırkası'nı karşılaştırır.",
                "Çok partili hayata geçiş denemelerini ve karşılaşılan engelleri (Şeyh Sait İsyanı, Menemen Olayı) inceler.",
                "Mustafa Kemal'e suikast girişimini ve cumhuriyet rejimine yönelik tehditleri değerlendirir."
            ],
            "6. Ünite: Atatürk Dönemi Türk Dış Politikası": [
                "Atatürk dönemi Türk dış politikasının temel ilkelerini (bağımsızlık, barış, gerçekçilik) kavrar.",
                "Yabancı okullar, Musul meselesi, nüfus mübadelesi ve Milletler Cemiyeti'ne girişi açıklar.",
                "Balkan Antantı, Sadabat Paktı, Montrö Boğazlar Sözleşmesi ve Hatay'ın ana vatana katılışını analiz eder."
            ],
            "7. Ünite: Atatürk'ün Ölümü ve Sonrası": [
                "Atatürk'ün vefatının yurt içinde ve dünyadaki yankılarını değerlendirir.",
                "Mustafa Kemal Atatürk'ün bıraktığı eserleri ve fikir mirasını korumanın önemini açıklar.",
                "II. Dünya Savaşı sürecinde Türkiye'nin uyguladığı tarafsızlık ve denge politikasını kavrar."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: Kader İnancı": [
                "Kader ve kaza kavramlarını ayetlerle açıklar; evrendeki fiziksel, biyolojik ve toplumsal yasaları inceler.",
                "İnsanın ilmi, iradesi, sorumluluğu ve kader ilişkisini açıklar.",
                "Ömür, ecel, rızık, tevekkül, başarı, sağlık ve afet kavramlarını kaderle ilişkilendirir.",
                "Hz. Musa'nın hayatını ve Ayet el-Kürsi'nin anlamını kavrar."
            ],
            "2. Ünite: Zekât ve Sadaka": [
                "İslam'ın paylaşma ve yardımlaşmaya verdiği önemi açıklar.",
                "Zekât, sadaka ve infak kavramlarının şartlarını, oranlarını ve kimlere verileceğini kavrar.",
                "Zekât ve sadakanın bireysel ve toplumsal faydalarını değerlendirir.",
                "Hz. Şuayb'ın hayatını ve Ma'ûn suresinin anlamını inceler."
            ],
            "3. Ünite: Din ve Hayat": [
                "Dinin temel gayesi olan can, nesil, akıl, mal ve din emniyetini açıklar.",
                "Dinin birey ve toplum hayatındaki ahlaki dönüştürücü etkisini değerlendirir.",
                "Hz. Yusuf'un örnek hayatını ve Asr suresinin anlamını açıklar."
            ],
            "4. Ünite: Hz. Muhammed'in Örnekliği": [
                "Hz. Muhammed'in doğruluğu, güvenilirliği, merhameti, adaleti ve hoşgörüsünü örneklerle açıklar.",
                "Hz. Muhammed'in istişareye verdiği önemi ve kararlılığını olaylar üzerinden kavrar.",
                "Hz. Muhammed'in hakkı gözetmedeki hassasiyetini ve Kureyş suresinin anlamını açıklar."
            ],
            "5. Ünite: Kur'an-ı Kerim ve Özellikleri": [
                "Kur'an-ı Kerim'in ana konularını (inanç, ibadet, ahlak, muamelat, kıssalar) açıklar.",
                "Kur'an-ı Kerim'in yol gösterici, aydınlatıcı ve açıklayıcı özelliklerini kavrar.",
                "Hz. Nuh'un hayatını ve Kur'an'dan mesajlar çıkarır."
            ]
        },
        "İngilizce": {
            "Unit 1: Friendship": [
                "Accepting and refusing invitations and making excuses (Would you like to come? I'd love to, but I can't).",
                "Expressing personal traits of true friends (honest, reliable, generous, loyal).",
                "Writing a simple invitation letter and responding politely."
            ],
            "Unit 2: Teen Life": [
                "Expressing preferences and daily routines (prefer listening to music, fond of sports).",
                "Describing regular activities and musical genres (rap, classical, pop).",
                "Discussing fashion and daily habits of teenagers."
            ],
            "Unit 3: In the Kitchen": [
                "Describing a process and recipe steps (First, second, then, next, finally).",
                "Cooking methods and kitchen utensils (boil, fry, bake, chop, dice).",
                "Expressing preferences in cooking and eating."
            ],
            "Unit 4: On the Phone": [
                "Making phone calls, holding, taking messages (Could you hold on? Would you like to leave a message?).",
                "Ways of communication throughout history (smoke signals, telegraph, smartphone).",
                "Polite telephone conversations and conversational idioms."
            ],
            "Unit 5: The Internet": [
                "Accepting and refusing requests on social platforms.",
                "Internet vocabulary (download, upload, browser, search engine, attachment).",
                "Internet safety rules and ethical online behavior."
            ],
            "Unit 6: Adventures": [
                "Expressing preferences in extreme sports (prefer skydiving to rafting).",
                "Comparing adventurous activities using comparative structures (more exciting, dangerous).",
                "Giving explanations and reasons for risky sports choices."
            ],
            "Unit 7: Tourism": [
                "Describing historical places, tourist destinations and architectural landmarks.",
                "Comparing vacation types (cultural holiday, seaside resort, eco-tourism).",
                "Expressing experiences and preferences about accommodations and transportation."
            ],
            "Unit 8: Chores": [
                "Expressing responsibilities and obligations (must, have to, responsible for).",
                "Household chores (dusting, doing laundry, taking out garbage, loading dishwasher).",
                "Sharing tasks fairly in family and school life."
            ],
            "Unit 9: Science": [
                "Describing scientific discoveries, inventors and technological breakthroughs.",
                "Talking about past scientific events and lab experiments.",
                "Expressing opinions about futuristic developments and space exploration."
            ],
            "Unit 10: Natural Forces": [
                "Making predictions about natural disasters (earthquake, flood, drought, avalanche).",
                "Expressing causes, consequences and preventive precautions of environmental threats.",
                "Discussing global climate change and resource sustainability."
            ]
        },
        "Bilişim Teknolojileri ve Yazılım": {
            "1. Ünite: Bilişim Okuryazarlığı ve İletişim": [
                "İnternet etiği, telif hakları ve açık kaynak lisanslarını kavrar.",
                "Siber zorbalık, dijital ayak izi ve bilgi güvenliği ilkelerini açıklar.",
                "Bulut bilişim ve işbirlikli çalışma araçlarını etkin kullanır."
            ],
            "2. Ünite: Algoritma ve Blok Tabanlı Programlama": [
                "Karmaşık problemleri alt problemlere ayrıştırarak akış şemaları tasarlar.",
                "Döngüler, koşul yapıları, değişkenler ve fonksiyonları içeren programlar kodlar.",
                "Yazdığı kodlardaki mantıksal hataları (debugging) tespit eder ve düzeltir."
            ],
            "3. Ünite: Robotik Kodlama ve Yapay Zeka Temelleri": [
                "Sensörler, mikrodenetleyiciler ve motorlar kullanarak basit robotik prototip geliştirir.",
                "Yapay zekanın ve makine öğrenmesinin temel mantığını açıklar.",
                "Geleceğin teknolojileri (IoT, blokzincir, sanal gerçeklik) hakkında farkındalık kazanır."
            ]
        },
        "Müzik": {
            "1. Ünite: Müzik Kültürü ve Eser Çözümleme": [
                "Türk müziği makamlarını (Hicaz, Nihavent, Rast) ve ritmik yapılarını inceler.",
                "İstiklal Marşı'nı ve millî marşları doğru nefes ve diksiyonla seslendirir.",
                "Farklı müzik türlerini (Klasik, Caz, Halk Müziği) karşılaştırarak dinler."
            ],
            "2. Ünite: Toplu Çalma ve Söyleme": [
                "Ritim çalgıları veya melodika/flüt ile toplu icra kurallarına uyar.",
                "Müziğin insan psikolojisi ve toplum üzerindeki iyileştirici gücünü değerlendirir.",
                "Özgün ritim ve melodi kalıpları üreterek kaydeder."
            ]
        },
        "Görsel Sanatlar": {
            "1. Ünite: Görsel İletişim ve Tasarım": [
                "Perspektif kurallarını (tek ve çift kaçışlı) çizimlerinde uygular.",
                "Tipografi, afiş ve logo tasarımı ilkelerini kullanarak görsel mesaj oluşturur.",
                "Işık-gölge ve leke dengesiyle hacim hissi veren resimler yapar."
            ],
            "2. Ünite: Sanat Eleştirisi ve Kültürel Miras": [
                "Çağdaş ve geleneksel sanat eserlerini form, içerik ve bağlam yönünden eleştirir.",
                "Geleneksel motiflerimizi modern tasarım ögeleriyle harmanlar.",
                "Görsel sanatların çevre ve mimariyle ilişkisini inceler."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: Takım Sporları ve Strateji": [
                "Voleybol, basketbol veya hentbolda hücum ve savunma taktiklerini uygular.",
                "Spor ahlakı (fair-play), liderlik ve rakibe saygı değerlerini içselleştirir.",
                "Fiziksel uygunluk testlerini (esneklik, dayanıklılık, kuvvet) uygular ve kaydeder."
            ],
            "2. Ünite: Yaşam Boyu Spor ve İlk Yardım": [
                "Sedanter yaşamın zararlarını ve düzenli egzersiz programı hazırlamayı öğrenir.",
                "Spor yaralanmalarında temel ilk yardım prensiplerini kavrar.",
                "Doğa sporları ve açık hava aktivitelerinde çevreye duyarlı davranır."
            ]
        },
        "Seçmeli Zeka Oyunları": {
            "1. Ünite: Akıl Yürütme ve İşlem Oyunları": [
                "Sudoku, kendoku ve kakuro gibi matematiksel mantık oyunlarını çözer.",
                "Hızlı düşünme, karar verme ve alternatif stratejiler üretme becerisi geliştirir.",
                "Kriptoloji ve şifreleme mantığını çözer."
            ],
            "2. Ünite: Strateji ve Kutu Oyunları": [
                "Satranç, mangala ve reversi gibi strateji oyunlarında ileri hamle planlar.",
                "Oyun analizi yaparak rakibin stratejisini öngörür ve karşı hamle geliştirir.",
                "Kaybetmeyi olgunlukla karşılama ve centilmenlik bilinci kazanır."
            ]
        },
        "Seçmeli Yabancı Dil (İngilizce vb.)": {
            "1. Ünite: Global Communication": [
                "Farklı kültürlerdeki günlük iletişim kalıplarını ve beden dilini inceler.",
                "İngilizce kısa hikâyeleri analiz eder ve kendi kelimeleriyle anlatır.",
                "Uluslararası güncel olaylar hakkında kısa sunum yapar."
            ],
            "2. Ünite: Creative Writing & Debate": [
                "İngilizce münazara kurallarına uygun olarak fikirlerini savunur.",
                "Özgün şiir, blog yazısı veya kısa senaryo yazar.",
                "Gelişmiş dinleme metinlerindeki ana ve yan fikirleri tespit eder."
            ]
        }
    },
    "9. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "Sözün İnceliği (Tema 1)": [
                "Edebi metnin özgün ve bireysel bir dil kullandığını kavrar.",
                "Metindeki söz sanatlarını belirler.",
                "Metnin anlam katmanlarını çözümler.",
                "Sözlü edebiyat geleneğini tanır."
            ],
            "Anlam Arayışı (Tema 2)": [
                "Farklı türlerde metinleri eleştirel okur.",
                "Metinde tema ve mesaj ilişkisini kurar.",
                "Kendi bakış açısını ifade eden metin yazar.",
                "Roman ve hikâye türünü karşılaştırır."
            ],
            "Anlamın Yapı Taşları (Tema 3)": [
                "Dil bilgisi kurallarını metin içinde uygular.",
                "Sözcük türlerini ve cümle ögelerini metin bağlamında kavrar.",
                "Yazı türleri (şiir, hikâye, deneme) arasındaki farkları belirler.",
                "Metni biçim ve içerik bakımından analiz eder."
            ],
            "Dilin Zenginliği (Tema 4)": [
                "Türkçenin söz varlığını ve dil güzelliğini kavrar.",
                "Söz varlığını zenginleştirir.",
                "Türkçeyi doğru ve etkili kullanır.",
                "Dil bilinci geliştirir."
            ]
        },
        "Matematik": {
            "Sayılar (Tema 1)": [
                "Doğal sayılar, tam sayılar, rasyonel ve irrasyonel sayıları tanır.",
                "'Sayılar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Sayılar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Sayılar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Sayılar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Nicelikler ve Değişimler (Tema 2)": [
                "Birinci dereceden denklem ve eşitsizlikleri çözer.",
                "'Nicelikler ve Değişimler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Nicelikler ve Değişimler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Nicelikler ve Değişimler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Nicelikler ve Değişimler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Geometrik Şekiller (Tema 3)": [
                "Üçgenlerin temel özelliklerini inceler.",
                "'Geometrik Şekiller' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometrik Şekiller' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometrik Şekiller' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometrik Şekiller' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Eşlik ve Benzerlik (Tema 4)": [
                "Eş şekilleri ve koşullarını belirler.",
                "'Eşlik ve Benzerlik' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Eşlik ve Benzerlik' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Eşlik ve Benzerlik' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Eşlik ve Benzerlik' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Algoritma ve Bilişim (Tema 5)": [
                "Algoritmayı matematiksel problem çözmeye uygular.",
                "'Algoritma ve Bilişim' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Algoritma ve Bilişim' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Algoritma ve Bilişim' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Algoritma ve Bilişim' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "İstatistiksel Araştırma Süreci (Tema 6)": [
                "Veri toplama ve düzenleme süreçlerini uygular.",
                "'İstatistiksel Araştırma Süreci' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İstatistiksel Araştırma Süreci' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İstatistiksel Araştırma Süreci' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İstatistiksel Araştırma Süreci' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Veriden Olasılığa (Tema 7)": [
                "Olasılık kavramını açıklar.",
                "'Veriden Olasılığa' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Veriden Olasılığa' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Veriden Olasılığa' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Veriden Olasılığa' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fizik": {
            "Fizik Bilimi ve Kariyer Keşfi (Tema 1)": [
                "Fizik biliminin alt dallarını ve uygulama alanlarını açıklar.",
                "'Fizik Bilimi ve Kariyer Keşfi' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Fizik Bilimi ve Kariyer Keşfi' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Fizik Bilimi ve Kariyer Keşfi' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Fizik Bilimi ve Kariyer Keşfi' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Kuvvet ve Hareket (Tema 2)": [
                "Hareket çeşitlerini ve Newton'un hareket yasalarını açıklar.",
                "'Kuvvet ve Hareket' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Kuvvet ve Hareket' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Kuvvet ve Hareket' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Kuvvet ve Hareket' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Akışkanlar (Tema 3)": [
                "Akışkanların özelliklerini ve basınç kavramını değerlendirir.",
                "'Akışkanlar' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Akışkanlar' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Akışkanlar' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Akışkanlar' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Enerji (Tema 4)": [
                "İş, güç ve enerji kavramlarını günlük hayattan örneklerle açıklar.",
                "'Enerji' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Enerji' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Enerji' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Enerji' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ]
        },
        "Kimya": {
            "Etkileşim (Tema 1)": [
                "Kimyasal türleri ve bu türler arası etkileşimleri açıklar.",
                "'Etkileşim' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Etkileşim' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Etkileşim' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Etkileşim' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Çeşitlilik (Tema 2)": [
                "Maddenin hâllerini ve bu hâllerin özelliklerini ayırt eder.",
                "'Çeşitlilik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Çeşitlilik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Çeşitlilik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Çeşitlilik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Sürdürülebilirlik (Tema 3)": [
                "Çevre kimyası ve suyun doğadaki döngüsünü açıklar.",
                "'Sürdürülebilirlik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Sürdürülebilirlik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilirlik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Sürdürülebilirlik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ]
        },
        "Biyoloji": {
            "Yaşam (Tema 1)": [
                "Canlıların ortak özelliklerini ve inorganik/organik bileşikleri açıklar.",
                "'Yaşam' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Yaşam' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Yaşam' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Yaşam' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ],
            "Organizasyon (Tema 2)": [
                "Hücrenin yapısını ve organizasyon basamaklarını açıklar.",
                "'Organizasyon' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Organizasyon' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Organizasyon' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Organizasyon' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ]
        },
        "Tarih": {
            "Geçmişin İnşa Sürecinde Tarih (Tema 1)": [
                "Tarih biliminin konusu, yöntemi ve kaynaklarını açıklar.",
                "'Geçmişin İnşa Sürecinde Tarih' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Geçmişin İnşa Sürecinde Tarih' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Geçmişin İnşa Sürecinde Tarih' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Geçmişin İnşa Sürecinde Tarih' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Eski Çağ Medeniyetleri (Tema 2)": [
                "İnsanlığın ilk dönemlerindeki siyasi ve kültürel gelişmeleri analiz eder.",
                "'Eski Çağ Medeniyetleri' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Eski Çağ Medeniyetleri' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Eski Çağ Medeniyetleri' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Eski Çağ Medeniyetleri' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Orta Çağ Medeniyetleri (Tema 3)": [
                "Orta Çağ'da Asya, Avrupa ve İslam dünyasındaki gelişmeleri değerlendirir.",
                "'Orta Çağ Medeniyetleri' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Orta Çağ Medeniyetleri' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Orta Çağ Medeniyetleri' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Orta Çağ Medeniyetleri' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ]
        },
        "Coğrafya": {
            "Coğrafyanın Doğası (Tema 1)": [
                "Coğrafyanın konularını ve bölümlerini kavrar.",
                "'Coğrafyanın Doğası' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Coğrafyanın Doğası' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Coğrafyanın Doğası' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Coğrafyanın Doğası' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Mekânsal Bilgi Teknolojileri (Tema 2)": [
                "Harita bilgisi ve CBS kavramlarını açıklar.",
                "'Mekânsal Bilgi Teknolojileri' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Mekânsal Bilgi Teknolojileri' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Mekânsal Bilgi Teknolojileri' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Mekânsal Bilgi Teknolojileri' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Doğal Sistemler ve Süreçler (Tema 3)": [
                "Dünya'nın şekli, hareketleri ve iklim elemanlarını inceler.",
                "'Doğal Sistemler ve Süreçler' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Doğal Sistemler ve Süreçler' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Doğal Sistemler ve Süreçler' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Doğal Sistemler ve Süreçler' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Beşerî Sistemler ve Süreçler (Tema 4)": [
                "Nüfus ve yerleşmenin dağılışını açıklar.",
                "'Beşerî Sistemler ve Süreçler' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Beşerî Sistemler ve Süreçler' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Beşerî Sistemler ve Süreçler' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Beşerî Sistemler ve Süreçler' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Ekonomik Faaliyetler ve Etkileri (Tema 5)": [
                "Ekonomik faaliyet türlerini sınıflandırır.",
                "'Ekonomik Faaliyetler ve Etkileri' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Ekonomik Faaliyetler ve Etkileri' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Ekonomik Faaliyetler ve Etkileri' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Ekonomik Faaliyetler ve Etkileri' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Afetler ve Sürdürülebilir Çevre (Tema 6)": [
                "Doğa kaynaklı afetleri ve korunma yollarını tartışır.",
                "'Afetler ve Sürdürülebilir Çevre' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Afetler ve Sürdürülebilir Çevre' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Afetler ve Sürdürülebilir Çevre' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Afetler ve Sürdürülebilir Çevre' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Bölgeler, Ülkeler ve Küresel Bağlantılar (Tema 7)": [
                "Bölge türlerini ve sınırlarını inceler.",
                "'Bölgeler, Ülkeler ve Küresel Bağlantılar' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Bölgeler, Ülkeler ve Küresel Bağlantılar' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Bölgeler, Ülkeler ve Küresel Bağlantılar' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Bölgeler, Ülkeler ve Küresel Bağlantılar' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ]
        },
        "İngilizce": {
            "Personal Experiences (Tema 1)": [
                "Kişisel deneyimlerini anlatır (present perfect).",
                "'Personal Experiences' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Personal Experiences' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Personal Experiences' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Personal Experiences' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Media (Tema 2)": [
                "Medya türlerini değerlendirir.",
                "'Media' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Media' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Media' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Media' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Global Issues (Tema 3)": [
                "Küresel sorunları tartışır.",
                "'Global Issues' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Global Issues' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Global Issues' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Global Issues' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Technology (Tema 4)": [
                "Teknolojinin etkilerini tartışır.",
                "'Technology' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Technology' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Technology' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Technology' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Future Plans (Tema 5)": [
                "Gelecek planlarını anlatır.",
                "'Future Plans' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Future Plans' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Future Plans' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Future Plans' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Bilgi ve İnanç (Tema 1)": [
                "İman ve bilgi ilişkisini açıklar.",
                "'Bilgi ve İnanç' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Bilgi ve İnanç' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Bilgi ve İnanç' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Bilgi ve İnanç' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "İbadet ve Ahlak (Tema 2)": [
                "İslam'ın şartlarını açıklar.",
                "'İbadet ve Ahlak' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'İbadet ve Ahlak' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'İbadet ve Ahlak' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'İbadet ve Ahlak' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Din ve Toplum (Tema 3)": [
                "Dinin toplumsal işlevlerini açıklar.",
                "'Din ve Toplum' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Din ve Toplum' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Din ve Toplum' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Din ve Toplum' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        },
        "Felsefe": {
            "Felsefeye Giriş (Tema 1)": [
                "Felsefenin tanımını ve tarihini açıklar.",
                "'Felsefeye Giriş' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Felsefeye Giriş' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Felsefeye Giriş' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Felsefeye Giriş' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Bilgi Felsefesi (Tema 2)": [
                "Bilginin ne olduğunu ve kaynaklarını tartışır.",
                "'Bilgi Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Bilgi Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Bilgi Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Bilgi Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Atletizm ve Kondisyon (Tema 1)": [
                "Kuvvet, dayanıklılık ve hız antrenmanları yapar.",
                "'Atletizm ve Kondisyon' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Atletizm ve Kondisyon' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Atletizm ve Kondisyon' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Atletizm ve Kondisyon' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "Spor Dalları ve Taktik (Tema 2)": [
                "Bireysel ve takım sporlarında teknik ve taktik uygular.",
                "'Spor Dalları ve Taktik' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Spor Dalları ve Taktik' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Spor Dalları ve Taktik' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Spor Dalları ve Taktik' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "Tanışma ve Selamlaşma (Tema 1)": [
                "Temel selamlaşma kalıplarını kullanır.",
                "'Tanışma ve Selamlaşma' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Tanışma ve Selamlaşma' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Tanışma ve Selamlaşma' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Tanışma ve Selamlaşma' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Günlük Yaşam (Tema 2)": [
                "Sayılar, renkler ve günleri söyler.",
                "'Günlük Yaşam' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Günlük Yaşam' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Günlük Yaşam' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Günlük Yaşam' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Görsel Sanatlar / Müzik": {
            "Sanata Giriş (Tema 1)": [
                "Sanatın temel kavramlarını açıklar.",
                "'Sanata Giriş' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanata Giriş' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanata Giriş' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanata Giriş' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Sanat Tarihi (Tema 2)": [
                "Tarihsel süreçte sanatın gelişimini özetler.",
                "'Sanat Tarihi' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanat Tarihi' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanat Tarihi' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanat Tarihi' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Seçmeli Bilgisayar Bilimi": {
            "Algoritma ve Kodlama (Tema 1)": [
                "Algoritma adımlarını tasarlar.",
                "'Algoritma ve Kodlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Algoritma ve Kodlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Algoritma ve Kodlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Algoritma ve Kodlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Etik ve Güvenlik (Tema 2)": [
                "Bilişim etiğini açıklar.",
                "'Etik ve Güvenlik' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Etik ve Güvenlik' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Etik ve Güvenlik' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Etik ve Güvenlik' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Seçmeli Astronomi ve Uzay Bilimleri": {
            "Evreni Tanıyalım (Tema 1)": [
                "Gök cisimlerini sınıflandırır.",
                "'Evreni Tanıyalım' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Evreni Tanıyalım' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Evreni Tanıyalım' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Evreni Tanıyalım' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Uzay Araştırmaları (Tema 2)": [
                "Uzay teknolojilerinin günlük hayata katkısını açıklar.",
                "'Uzay Araştırmaları' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Uzay Araştırmaları' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Uzay Araştırmaları' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Uzay Araştırmaları' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Seçmeli Proje Hazırlama": {
            "Bilimsel Yöntem (Tema 1)": [
                "Proje konusunu belirler.",
                "'Bilimsel Yöntem' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Bilimsel Yöntem' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Bilimsel Yöntem' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Bilimsel Yöntem' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Proje Tasarımı (Tema 2)": [
                "Proje takvimi oluşturur ve sunar.",
                "'Proje Tasarımı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Proje Tasarımı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Proje Tasarımı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Proje Tasarımı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "10. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "İslamiyet Öncesi ve Geçiş Dönemi Edebiyatı (Tema 1)": [
                "Sözlü edebiyat döneminin özelliklerini açıklar.",
                "'İslamiyet Öncesi ve Geçiş Dönemi Edebiyatı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'İslamiyet Öncesi ve Geçiş Dönemi Edebiyatı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'İslamiyet Öncesi ve Geçiş Dönemi Edebiyatı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'İslamiyet Öncesi ve Geçiş Dönemi Edebiyatı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Halk Edebiyatı (Tema 2)": [
                "Âşık edebiyatını ve tekke edebiyatını açıklar.",
                "'Halk Edebiyatı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Halk Edebiyatı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Halk Edebiyatı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Halk Edebiyatı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Divan Edebiyatı (Tema 3)": [
                "Divan edebiyatının özelliklerini ve temsilcilerini açıklar.",
                "'Divan Edebiyatı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Divan Edebiyatı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Divan Edebiyatı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Divan Edebiyatı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Roman ve Hikâye (Tema 4)": [
                "Romanın yapısını ve türlerini açıklar.",
                "'Roman ve Hikâye' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Roman ve Hikâye' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Roman ve Hikâye' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Roman ve Hikâye' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Tiyatro (Tema 5)": [
                "Geleneksel Türk tiyatrosunu (Karagöz, Meddah, Orta Oyunu) açıklar.",
                "'Tiyatro' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Tiyatro' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Tiyatro' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Tiyatro' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Matematik": {
            "Sayma ve Olasılık (Tema 1)": [
                "Permütasyon ve kombinasyon hesaplar.",
                "'Sayma ve Olasılık' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Sayma ve Olasılık' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Sayma ve Olasılık' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Sayma ve Olasılık' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Fonksiyonlar (Tema 2)": [
                "Fonksiyon kavramını ve tanım-değer kümesini açıklar.",
                "'Fonksiyonlar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Fonksiyonlar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Fonksiyonlar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Fonksiyonlar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Polinomlar (Tema 3)": [
                "Polinom kavramını açıklar.",
                "'Polinomlar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Polinomlar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Polinomlar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Polinomlar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "İkinci Dereceden Denklemler (Tema 4)": [
                "İkinci dereceden denklemi çözer (ayrımcı yöntemi).",
                "'İkinci Dereceden Denklemler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'İkinci Dereceden Denklemler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'İkinci Dereceden Denklemler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'İkinci Dereceden Denklemler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Geometri (Tema 5)": [
                "Özel dörtgenlerin özelliklerini inceler.",
                "'Geometri' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Geometri' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Geometri' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Geometri' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fizik": {
            "Hareket (Tema 1)": [
                "Sabit ivmeli hareketi hesaplar ve grafiklerini çizer.",
                "'Hareket' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Hareket' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Hareket' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Hareket' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "İş, Güç, Enerji (Tema 2)": [
                "Mekanik enerjinin korunumu ilkesini açıklar.",
                "'İş, Güç, Enerji' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'İş, Güç, Enerji' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'İş, Güç, Enerji' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'İş, Güç, Enerji' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Elektrik (Tema 3)": [
                "Elektrik devrelerinde akım, direnç ve potansiyel farkını hesaplar.",
                "'Elektrik' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Elektrik' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Elektrik' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Elektrik' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Dalgalar (Tema 4)": [
                "Dalga hareketi, periyot, frekans ve dalga boyunu açıklar.",
                "'Dalgalar' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Dalgalar' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Dalgalar' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Dalgalar' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ]
        },
        "Kimya": {
            "Etkileşim (Tema 1)": [
                "Kimyasal tepkimeleri ve stokiyometrik hesaplamaları açıklar.",
                "'Etkileşim' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Etkileşim' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Etkileşim' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Etkileşim' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Çeşitlilik (Tema 2)": [
                "Çözeltilerin özelliklerini ve derişim birimlerini kavrar.",
                "'Çeşitlilik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Çeşitlilik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Çeşitlilik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Çeşitlilik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Sürdürülebilirlik (Tema 3)": [
                "Yeşil kimya ve atom ekonomisi prensiplerini tartışır.",
                "'Sürdürülebilirlik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Sürdürülebilirlik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilirlik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Sürdürülebilirlik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ]
        },
        "Biyoloji": {
            "Enerji (Tema 1)": [
                "Hücresel solunum, fotosentez ve fermantasyon süreçlerini açıklar.",
                "'Enerji' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Enerji' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Enerji' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Enerji' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ],
            "Ekoloji (Tema 2)": [
                "Ekosistem, madde döngüleri ve güncel çevre sorunlarını değerlendirir.",
                "'Ekoloji' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Ekoloji' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Ekoloji' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Ekoloji' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ]
        },
        "Tarih": {
            "Osmanlı'nın Kuruluş ve Yükseliş Dönemi (Tema 1)": [
                "Osmanlı Devleti'nin kuruluşunu açıklar.",
                "'Osmanlı'nın Kuruluş ve Yükseliş Dönemi' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Osmanlı'nın Kuruluş ve Yükseliş Dönemi' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Osmanlı'nın Kuruluş ve Yükseliş Dönemi' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Osmanlı'nın Kuruluş ve Yükseliş Dönemi' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Osmanlı Duraklama ve Gerileme Dönemi (Tema 2)": [
                "17-18. yüzyıl Osmanlı savaşlarını açıklar.",
                "'Osmanlı Duraklama ve Gerileme Dönemi' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Osmanlı Duraklama ve Gerileme Dönemi' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Osmanlı Duraklama ve Gerileme Dönemi' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Osmanlı Duraklama ve Gerileme Dönemi' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Sanayi Devrimi ve Etkileri (Tema 3)": [
                "Sanayi Devrimi'nin nedenlerini ve sonuçlarını açıklar.",
                "'Sanayi Devrimi ve Etkileri' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Sanayi Devrimi ve Etkileri' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Sanayi Devrimi ve Etkileri' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Sanayi Devrimi ve Etkileri' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Fransız İhtilali ve Milliyetçilik (Tema 4)": [
                "Fransız İhtilali'nin nedenlerini ve sonuçlarını açıklar.",
                "'Fransız İhtilali ve Milliyetçilik' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Fransız İhtilali ve Milliyetçilik' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Fransız İhtilali ve Milliyetçilik' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Fransız İhtilali ve Milliyetçilik' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "I. Dünya Savaşı (Tema 5)": [
                "I. Dünya Savaşı'nın nedenlerini ve sonuçlarını açıklar.",
                "'I. Dünya Savaşı' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'I. Dünya Savaşı' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'I. Dünya Savaşı' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'I. Dünya Savaşı' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ]
        },
        "Coğrafya": {
            "Yer Şekilleri (Tema 1)": [
                "Yer kabuğunun yapısını açıklar.",
                "'Yer Şekilleri' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Yer Şekilleri' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Yer Şekilleri' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Yer Şekilleri' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Su ve İklim (Tema 2)": [
                "Okyanus akıntılarının iklime etkisini açıklar.",
                "'Su ve İklim' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Su ve İklim' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Su ve İklim' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Su ve İklim' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Nüfus ve Yerleşme (Tema 3)": [
                "Türkiye'nin nüfus özelliklerini açıklar.",
                "'Nüfus ve Yerleşme' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Nüfus ve Yerleşme' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Nüfus ve Yerleşme' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Nüfus ve Yerleşme' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Ekonomik Coğrafya (Tema 4)": [
                "Türkiye'nin tarım bölgelerini ve ürünlerini açıklar.",
                "'Ekonomik Coğrafya' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Ekonomik Coğrafya' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Ekonomik Coğrafya' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Ekonomik Coğrafya' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Küresel Çevre (Tema 5)": [
                "Küresel iklim değişikliğinin nedenlerini açıklar.",
                "'Küresel Çevre' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Küresel Çevre' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Küresel Çevre' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Küresel Çevre' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ]
        },
        "Felsefe": {
            "Varlık Felsefesi (Tema 1)": [
                "Varlık kavramını ve ontoloji sorunlarını açıklar.",
                "'Varlık Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Varlık Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Varlık Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Varlık Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Ahlak Felsefesi (Tema 2)": [
                "Ahlak felsefesinin temel sorularını açıklar.",
                "'Ahlak Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Ahlak Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Ahlak Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Ahlak Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Siyaset Felsefesi (Tema 3)": [
                "Devlet ve meşruiyet kavramlarını açıklar.",
                "'Siyaset Felsefesi' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Siyaset Felsefesi' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Siyaset Felsefesi' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Siyaset Felsefesi' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ]
        },
        "İngilizce": {
            "Health and Diet (Tema 1)": [
                "Sağlıklı yaşam alışkanlıklarını anlatır.",
                "'Health and Diet' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Health and Diet' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Health and Diet' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Health and Diet' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Relationships (Tema 2)": [
                "İnsan ilişkilerini tartışır.",
                "'Relationships' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Relationships' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Relationships' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Relationships' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Science and Technology (Tema 3)": [
                "Bilimsel gelişmeleri anlatır.",
                "'Science and Technology' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Science and Technology' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Science and Technology' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Science and Technology' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Culture and Art (Tema 4)": [
                "Farklı kültürleri karşılaştırır.",
                "'Culture and Art' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Culture and Art' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Culture and Art' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Culture and Art' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Future of the World (Tema 5)": [
                "Gelecekle ilgili tahminler yapar.",
                "'Future of the World' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Future of the World' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Future of the World' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Future of the World' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Bireysel Sporlar (Tema 1)": [
                "Atletizm, yüzme ve jimnastik gibi bireysel spor dallarında becerilerini geliştirir.",
                "'Bireysel Sporlar' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Bireysel Sporlar' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Bireysel Sporlar' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Bireysel Sporlar' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "Takım Sporları (Tema 2)": [
                "Basketbol, voleybol ve futbolun taktik oyununu kavrar.",
                "'Takım Sporları' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Takım Sporları' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Takım Sporları' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Takım Sporları' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Allah İnancı ve İnsan (Tema 1)": [
                "İnsanın doğası ve din ilişkisini tartışır.",
                "'Allah İnancı ve İnsan' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Allah İnancı ve İnsan' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Allah İnancı ve İnsan' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Allah İnancı ve İnsan' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "İslam ve Gençlik (Tema 2)": [
                "İslam'ın gençlere verdiği önemi açıklar.",
                "'İslam ve Gençlik' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'İslam ve Gençlik' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'İslam ve Gençlik' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'İslam ve Gençlik' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "Okul Hayatı (Tema 1)": [
                "Okul dersleri ve aktiviteleri hakkında konuşur.",
                "'Okul Hayatı' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Okul Hayatı' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Okul Hayatı' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Okul Hayatı' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Tatil ve Seyahat (Tema 2)": [
                "Geçmiş zaman kullanarak tatilini anlatır.",
                "'Tatil ve Seyahat' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Tatil ve Seyahat' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Tatil ve Seyahat' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Tatil ve Seyahat' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Görsel Sanatlar / Müzik": {
            "Sanat Akımları (Tema 1)": [
                "Klasik ve modern sanat akımlarını karşılaştırır.",
                "'Sanat Akımları' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Sanat Akımları' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Sanat Akımları' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Sanat Akımları' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Tasarım İlkeleri (Tema 2)": [
                "Sanatsal eserlerde kompozisyon kurallarını inceler.",
                "'Tasarım İlkeleri' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Tasarım İlkeleri' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Tasarım İlkeleri' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Tasarım İlkeleri' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Seçmeli Bilgisayar Bilimi": {
            "Programlama Dilleri (Tema 1)": [
                "Veri yapılarını ve fonksiyonları kullanır.",
                "'Programlama Dilleri' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Programlama Dilleri' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Programlama Dilleri' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Programlama Dilleri' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Yapay Zeka (Tema 2)": [
                "Yapay zekanın kullanım alanlarını açıklar.",
                "'Yapay Zeka' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Yapay Zeka' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Yapay Zeka' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Yapay Zeka' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Seçmeli Astronomi ve Uzay Bilimleri": {
            "Güneş Sistemi (Tema 1)": [
                "Gezegenlerin hareketlerini açıklar.",
                "'Güneş Sistemi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Güneş Sistemi' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Güneş Sistemi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Güneş Sistemi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Yıldızların Evrimi (Tema 2)": [
                "Yıldızların doğum ve ölüm süreçlerini açıklar.",
                "'Yıldızların Evrimi' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Yıldızların Evrimi' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Yıldızların Evrimi' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Yıldızların Evrimi' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Seçmeli Proje Hazırlama": {
            "Veri Toplama ve Analiz (Tema 1)": [
                "Araştırma verilerini analiz eder.",
                "'Veri Toplama ve Analiz' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Veri Toplama ve Analiz' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Veri Toplama ve Analiz' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Veri Toplama ve Analiz' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Raporlama (Tema 2)": [
                "Proje sonuçlarını akademik formatta raporlar.",
                "'Raporlama' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Raporlama' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Raporlama' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Raporlama' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "11. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "Batı Etkisinde Türk Edebiyatı: Tanzimat (Tema 1)": [
                "Tanzimat edebiyatının oluşum sürecini açıklar.",
                "'Batı Etkisinde Türk Edebiyatı: Tanzimat' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Batı Etkisinde Türk Edebiyatı: Tanzimat' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Batı Etkisinde Türk Edebiyatı: Tanzimat' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Batı Etkisinde Türk Edebiyatı: Tanzimat' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Servetifünun ve Fecriati (Tema 2)": [
                "Servetifünun edebiyatının özelliklerini açıklar.",
                "'Servetifünun ve Fecriati' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Servetifünun ve Fecriati' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Servetifünun ve Fecriati' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Servetifünun ve Fecriati' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Milli Edebiyat (Tema 3)": [
                "Milli Edebiyat döneminin oluşumunu açıklar.",
                "'Milli Edebiyat' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Milli Edebiyat' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Milli Edebiyat' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Milli Edebiyat' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Makale, Sohbet ve Fıkra (Tema 4)": [
                "Makale türünün özelliklerini açıklar.",
                "'Makale, Sohbet ve Fıkra' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Makale, Sohbet ve Fıkra' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Makale, Sohbet ve Fıkra' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Makale, Sohbet ve Fıkra' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Cumhuriyet Öncesi Tiyatro (Tema 5)": [
                "Tanzimat tiyatrosunun özelliklerini açıklar.",
                "'Cumhuriyet Öncesi Tiyatro' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Cumhuriyet Öncesi Tiyatro' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Cumhuriyet Öncesi Tiyatro' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Cumhuriyet Öncesi Tiyatro' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Matematik": {
            "Trigonometri (Tema 1)": [
                "Trigonometrik oranları tanımlar.",
                "'Trigonometri' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Trigonometri' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Trigonometri' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Trigonometri' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Analitik Geometri (Tema 2)": [
                "Noktanın analitikte incelenmesini yapar.",
                "'Analitik Geometri' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Analitik Geometri' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Analitik Geometri' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Analitik Geometri' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Karmaşık Sayılar (Tema 3)": [
                "Karmaşık sayı kavramını açıklar.",
                "'Karmaşık Sayılar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Karmaşık Sayılar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Karmaşık Sayılar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Karmaşık Sayılar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Parabol ve Uygulamalar (Tema 4)": [
                "İkinci dereceden fonksiyonun grafiğini çizer.",
                "'Parabol ve Uygulamalar' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Parabol ve Uygulamalar' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Parabol ve Uygulamalar' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Parabol ve Uygulamalar' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ],
            "Katı Cisimler (Tema 5)": [
                "Prizma, piramit, koni, silindir ve kürenin yüzey alanını hesaplar.",
                "'Katı Cisimler' bağlamında verilen problemin çözümüne yönelik algoritma oluşturur.",
                "'Katı Cisimler' konularını incelerken matematiksel modelleri kullanarak gerçek hayat problemlerini çözer.",
                "Öğrendiği bilgileri kullanarak 'Katı Cisimler' alanında geometrik ilişkileri keşfeder ve kanıtlar.",
                "'Katı Cisimler' konusunun günlük yaşamdaki yeri hakkında veri gruplarını karşılaştırarak istatistiksel çıkarım yapar."
            ]
        },
        "Fizik": {
            "Kuvvet ve Hareket (Tema 1)": [
                "İki boyutta hareket ve Newton'un hareket yasalarının uygulamalarını yapar.",
                "'Kuvvet ve Hareket' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Kuvvet ve Hareket' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Kuvvet ve Hareket' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Kuvvet ve Hareket' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Elektrik ve Manyetizma (Tema 2)": [
                "Elektromanyetik indüksiyon ve alternatif akımı açıklar.",
                "'Elektrik ve Manyetizma' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Elektrik ve Manyetizma' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Elektrik ve Manyetizma' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Elektrik ve Manyetizma' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ],
            "Optik (Tema 3)": [
                "Işığın kırılması, mercekler ve optik aletlerin yapısını kavrar.",
                "'Optik' bağlamında fiziksel nicelikler arasındaki ilişkileri matematiksel modellerle açıklar.",
                "'Optik' konularını incelerken doğadaki kuvvet ve hareket prensiplerini deneylerle test eder.",
                "Öğrendiği bilgileri kullanarak 'Optik' alanında enerji dönüşümlerini günlük hayattaki sistemler üzerinden analiz eder.",
                "'Optik' konusunun günlük yaşamdaki yeri hakkında fizik ilkelerini kullanarak basit mühendislik tasarımları yapar."
            ]
        },
        "Kimya": {
            "Etkileşim (Tema 1)": [
                "Kimyasal tepkimelerde hız ve dengeyi etkileyen faktörleri açıklar.",
                "'Etkileşim' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Etkileşim' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Etkileşim' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Etkileşim' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Çeşitlilik (Tema 2)": [
                "Asit-baz dengesi ve çözünürlük çarpımını hesaplar.",
                "'Çeşitlilik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Çeşitlilik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Çeşitlilik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Çeşitlilik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ],
            "Sürdürülebilirlik (Tema 3)": [
                "Elektrokimyasal piller ve korozyondan korunma yollarını açıklar.",
                "'Sürdürülebilirlik' bağlamında maddelerin makroskobik özellikleri ile mikroskobik yapıları arasında bağ kurar.",
                "'Sürdürülebilirlik' konularını incelerken kimyasal süreçlerin çevreye ve insan sağlığına etkilerini tartışır.",
                "Öğrendiği bilgileri kullanarak 'Sürdürülebilirlik' alanında deney verilerini kullanarak kimyasal kanunları ispatlar.",
                "'Sürdürülebilirlik' konusunun günlük yaşamdaki yeri hakkında günlük hayattaki maddelerin bileşimlerini kimyasal olarak analiz eder."
            ]
        },
        "Biyoloji": {
            "Tepki (Tema 1)": [
                "Canlılarda sinir sistemi ve duyu organlarının işleyişini açıklar.",
                "'Tepki' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Tepki' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Tepki' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Tepki' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ],
            "Homeostazi (Tema 2)": [
                "Endokrin, dolaşım, solunum, sindirim ve boşaltım sistemlerini kavrar.",
                "'Homeostazi' bağlamında canlı sistemlerin yapı ve işleyişini hücresel düzeyde açıklar.",
                "'Homeostazi' konularını incelerken biyoçeşitliliğin ve ekosistemlerin korunmasına yönelik projeler geliştirir.",
                "Öğrendiği bilgileri kullanarak 'Homeostazi' alanında genetik ilkelerini kullanarak kalıtsal olasılıkları hesaplar.",
                "'Homeostazi' konusunun günlük yaşamdaki yeri hakkında insan faaliyetlerinin biyolojik sistemlere olan uzun vadeli etkilerini yorumlar."
            ]
        },
        "Tarih": {
            "Değişen Dünyada Osmanlı Devleti (1683-1789) (Tema 1)": [
                "Viyana Kuşatması sonrası siyasi mücadeleleri ve Lale Devri'ni açıklar.",
                "'Değişen Dünyada Osmanlı Devleti (1683-1789)' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Değişen Dünyada Osmanlı Devleti (1683-1789)' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Değişen Dünyada Osmanlı Devleti (1683-1789)' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Değişen Dünyada Osmanlı Devleti (1683-1789)' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Dönüşüm Sürecinde Osmanlı (1789-1908) (Tema 2)": [
                "Tanzimat, Islahat ve Meşrutiyet dönemlerinin etkilerini değerlendirir.",
                "'Dönüşüm Sürecinde Osmanlı (1789-1908)' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Dönüşüm Sürecinde Osmanlı (1789-1908)' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Dönüşüm Sürecinde Osmanlı (1789-1908)' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Dönüşüm Sürecinde Osmanlı (1789-1908)' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ],
            "Savaşlar Sarmalında Osmanlı (1908-1918) (Tema 3)": [
                "Trablusgarp, Balkan Savaşları ve I. Dünya Savaşı'nın sonuçlarını analiz eder.",
                "'Savaşlar Sarmalında Osmanlı (1908-1918)' bağlamında tarihsel olayları dönemin şartları içinde (tarihsel empati) değerlendirir.",
                "'Savaşlar Sarmalında Osmanlı (1908-1918)' konularını incelerken farklı tarihsel kaynakları karşılaştırarak güvenilirliklerini sorgular.",
                "Öğrendiği bilgileri kullanarak 'Savaşlar Sarmalında Osmanlı (1908-1918)' alanında tarihsel süreçlerdeki değişim ve süreklilik unsurlarını analiz eder.",
                "'Savaşlar Sarmalında Osmanlı (1908-1918)' konusunun günlük yaşamdaki yeri hakkında geçmişteki siyasi/sosyal olayların günümüz dünyasına etkilerini tartışır."
            ]
        },
        "Coğrafya": {
            "Biyoçeşitlilik (Tema 1)": [
                "Biyom kavramını ve biyom türlerini açıklar.",
                "'Biyoçeşitlilik' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Biyoçeşitlilik' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Biyoçeşitlilik' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Biyoçeşitlilik' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Ülkeler ve Bölgeler (Tema 2)": [
                "Dünya'da kalkınmışlık farklılıklarını açıklar.",
                "'Ülkeler ve Bölgeler' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Ülkeler ve Bölgeler' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Ülkeler ve Bölgeler' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Ülkeler ve Bölgeler' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Türkiye'nin Beşerî ve Ekonomik Coğrafyası (Tema 3)": [
                "Türkiye'nin nüfus özelliklerini açıklar.",
                "'Türkiye'nin Beşerî ve Ekonomik Coğrafyası' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Türkiye'nin Beşerî ve Ekonomik Coğrafyası' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Türkiye'nin Beşerî ve Ekonomik Coğrafyası' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Türkiye'nin Beşerî ve Ekonomik Coğrafyası' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ],
            "Çevre Sorunları (Tema 4)": [
                "Küresel iklim değişikliğinin sonuçlarını tartışır.",
                "'Çevre Sorunları' bağlamında doğal ve beşeri sistemlerin etkileşimini mekansal verilerle analiz eder.",
                "'Çevre Sorunları' konularını incelerken yerel ve küresel çevre sorunlarına sürdürülebilir çözümler önerir.",
                "Öğrendiği bilgileri kullanarak 'Çevre Sorunları' alanında harita okuma becerilerini kullanarak coğrafi konumun etkilerini tartışır.",
                "'Çevre Sorunları' konusunun günlük yaşamdaki yeri hakkında ekonomik faaliyetlerin çevresel ve kültürel boyutlarını değerlendirir."
            ]
        },
        "Felsefe": {
            "Çevre Sorunları ve Felsefe (Tema 1)": [
                "Çevre etiğini felsefi bir bakış açısıyla değerlendirir.",
                "'Çevre Sorunları ve Felsefe' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Çevre Sorunları ve Felsefe' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Çevre Sorunları ve Felsefe' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Çevre Sorunları ve Felsefe' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Teknoloji ve Hayat (Tema 2)": [
                "Teknolojinin insan hayatına etkisini felsefi boyutta tartar.",
                "'Teknoloji ve Hayat' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Teknoloji ve Hayat' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Teknoloji ve Hayat' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Teknoloji ve Hayat' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Akıl ve İnanç (Tema 3)": [
                "Akıl ile inanç arasındaki ilişkiyi felsefi olarak açıklar.",
                "'Akıl ve İnanç' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Akıl ve İnanç' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Akıl ve İnanç' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Akıl ve İnanç' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Edebiyat ve Felsefe (Tema 4)": [
                "Edebiyat eserlerindeki felsefi problemleri yorumlar.",
                "'Edebiyat ve Felsefe' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Edebiyat ve Felsefe' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Edebiyat ve Felsefe' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Edebiyat ve Felsefe' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Hayatın Anlamı (Tema 5)": [
                "Varoluş ve hayatın anlamı üzerine felsefi çıkarımlar yapar.",
                "'Hayatın Anlamı' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Hayatın Anlamı' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Hayatın Anlamı' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Hayatın Anlamı' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ],
            "Hukuk ve Felsefe (Tema 6)": [
                "Adalet, hak ve hukuk kavramlarını felsefi açıdan inceler.",
                "'Hukuk ve Felsefe' bağlamında felsefi soruları günlük yaşam problemleriyle ilişkilendirir.",
                "'Hukuk ve Felsefe' konularını incelerken farklı filozofların argümanlarını mantıksal tutarlılık açısından eleştirir.",
                "Öğrendiği bilgileri kullanarak 'Hukuk ve Felsefe' alanında kendi düşüncelerini felsefi kavramlar kullanarak temellendirir.",
                "'Hukuk ve Felsefe' konusunun günlük yaşamdaki yeri hakkında metinlerdeki örtük varsayımları ve önkabulleri tespit eder."
            ]
        },
        "İngilizce": {
            "Communication (Tema 1)": [
                "Etkili iletişim stratejilerini tartışır.",
                "'Communication' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Communication' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Communication' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Communication' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Work and Career (Tema 2)": [
                "Kariyer planlamasını anlatır.",
                "'Work and Career' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Work and Career' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Work and Career' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Work and Career' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Environment and Sustainability (Tema 3)": [
                "Çevre sorunlarını derinlemesine tartışır.",
                "'Environment and Sustainability' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Environment and Sustainability' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Environment and Sustainability' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Environment and Sustainability' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Literature and Arts (Tema 4)": [
                "Edebi metinler okur ve yorumlar.",
                "'Literature and Arts' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Literature and Arts' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Literature and Arts' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Literature and Arts' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Global Issues (Tema 5)": [
                "Küresel sorunları karmaşık dil yapılarıyla tartışır.",
                "'Global Issues' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Global Issues' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Global Issues' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Global Issues' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "Sağlıklı Yaşam ve Fitness (Tema 1)": [
                "Kişisel egzersiz programı hazırlar.",
                "'Sağlıklı Yaşam ve Fitness' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'Sağlıklı Yaşam ve Fitness' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'Sağlıklı Yaşam ve Fitness' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'Sağlıklı Yaşam ve Fitness' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ],
            "İleri Spor Teknikleri (Tema 2)": [
                "Seçilen spor dalında ileri teknikler geliştirir.",
                "'İleri Spor Teknikleri' bağlamında spor dalına özgü motorik özellikleri oyun içinde koordineli kullanır.",
                "'İleri Spor Teknikleri' konularını incelerken düzenli fiziksel aktivitenin bedensel ve zihinsel sağlığa etkisini savunur.",
                "Öğrendiği bilgileri kullanarak 'İleri Spor Teknikleri' alanında fair-play ruhuyla takım çalışması ve liderlik becerilerini uygular.",
                "'İleri Spor Teknikleri' konusunun günlük yaşamdaki yeri hakkında spor esnasında ilkyardım ve güvenlik önlemlerini kavrar."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "Dünya ve Ahiret (Tema 1)": [
                "Ahiret inancının insan davranışlarına etkisini açıklar.",
                "'Dünya ve Ahiret' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Dünya ve Ahiret' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Dünya ve Ahiret' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Dünya ve Ahiret' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ],
            "Kur'an'a Göre Hz. Muhammed (Tema 2)": [
                "Hz. Muhammed'in örnekliğini açıklar.",
                "'Kur'an'a Göre Hz. Muhammed' bağlamında dini metinlerdeki evrensel ahlak ilkelerini tespit eder.",
                "'Kur'an'a Göre Hz. Muhammed' konularını incelerken inanç esaslarının bireysel ve toplumsal hayattaki yansımalarını yorumlar.",
                "Öğrendiği bilgileri kullanarak 'Kur'an'a Göre Hz. Muhammed' alanında farklı yorum ve düşünce zenginliklerine hoşgörüyle yaklaşır.",
                "'Kur'an'a Göre Hz. Muhammed' konusunun günlük yaşamdaki yeri hakkında din ve kültür etkileşimini tarihi süreç bağlamında analiz eder."
            ]
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "Alışveriş ve Moda (Tema 1)": [
                "Kıyafetler ve alışveriş hakkında konuşur.",
                "'Alışveriş ve Moda' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Alışveriş ve Moda' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Alışveriş ve Moda' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Alışveriş ve Moda' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ],
            "Sağlık (Tema 2)": [
                "Sağlık sorunlarını ifade eder ve tavsiye verir.",
                "'Sağlık' bağlamında hedef dildeki farklı metin türlerinden spesifik bilgileri ayıklar.",
                "'Sağlık' konularını incelerken günlük iletişim bağlamlarında duygu ve düşüncelerini akıcı şekilde ifade eder.",
                "Öğrendiği bilgileri kullanarak 'Sağlık' alanında dinlediği farklı aksanlardaki konuşmaların ana temasını kavrar.",
                "'Sağlık' konusunun günlük yaşamdaki yeri hakkında verilen konu etrafında karşılıklı diyalog ve tartışma yürütür."
            ]
        },
        "Görsel Sanatlar / Müzik": {
            "Çağdaş Sanat (Tema 1)": [
                "Çağdaş sanat eserlerini yorumlar.",
                "'Çağdaş Sanat' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Çağdaş Sanat' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Çağdaş Sanat' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Çağdaş Sanat' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ],
            "Proje Geliştirme (Tema 2)": [
                "Kişisel sanat portfolyosu oluşturur.",
                "'Proje Geliştirme' bağlamında sanat eserlerini estetik değerlere ve dönemsel özelliklere göre eleştirir.",
                "'Proje Geliştirme' konularını incelerken farklı materyaller ve teknikler kullanarak özgün sanatsal üretim yapar.",
                "Öğrendiği bilgileri kullanarak 'Proje Geliştirme' alanında görsel iletişim araçlarının kültürel etkilerini tartışır.",
                "'Proje Geliştirme' konusunun günlük yaşamdaki yeri hakkında çevresindeki görsel uyarıcıları sanat perspektifiyle yorumlar."
            ]
        },
        "Seçmeli Psikoloji": {
            "Psikoloji Bilimini Tanıyalım (Tema 1)": [
                "Psikolojinin alt dallarını ve yöntemlerini açıklar.",
                "'Psikoloji Bilimini Tanıyalım' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Psikoloji Bilimini Tanıyalım' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Psikoloji Bilimini Tanıyalım' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Psikoloji Bilimini Tanıyalım' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Psikolojinin Temel Süreçleri (Tema 2)": [
                "Öğrenme, hafıza ve algı süreçlerini açıklar.",
                "'Psikolojinin Temel Süreçleri' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Psikolojinin Temel Süreçleri' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Psikolojinin Temel Süreçleri' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Psikolojinin Temel Süreçleri' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        },
        "Seçmeli Sosyoloji": {
            "Sosyolojiye Giriş (Tema 1)": [
                "Toplum yapısını ve sosyolojik bakış açısını açıklar.",
                "'Sosyolojiye Giriş' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Sosyolojiye Giriş' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Sosyolojiye Giriş' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Sosyolojiye Giriş' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ],
            "Toplumsal Yapı (Tema 2)": [
                "Toplumsal tabakalaşma ve eşitsizliği tartışır.",
                "'Toplumsal Yapı' bağlamında konuyla ilgili verilen araştırma görevini işbirlikli öğrenme ile tamamlar.",
                "'Toplumsal Yapı' konularını incelerken öğrendiklerini dijital bir materyale (sunum, poster, video) dönüştürür.",
                "Öğrendiği bilgileri kullanarak 'Toplumsal Yapı' alanında disiplinlerarası bağ kurarak yaratıcı bir çözüm haritası çıkarır.",
                "'Toplumsal Yapı' konusunun günlük yaşamdaki yeri hakkında öğrenme sürecindeki güçlü ve zayıf yönlerini yansıtıcı düşünmeyle değerlendirir."
            ]
        }
    },
    "12. Sınıf": {
        "Türk Dili ve Edebiyatı": {
            "1. Ünite: Giriş (Felsefe ve Psikolojiyle İlişki)": [
                "Edebiyat ile felsefe ve psikoloji arasındaki ilişkiyi metinler üzerinden açıklar.",
                "Dilin tarihi süreçteki değişimini etkileyen sebepleri (kültür, din, coğrafya, teknoloji) analiz eder.",
                "İlk örneklerden günümüze Türkçenin sözlüklerini (Divanü Lugati't-Türk, Kamus-ı Türki vb.) inceler.",
                "Metinlerdeki yazım ve noktalama kurallarını eleştirel gözle değerlendirir."
            ],
            "2. Ünite: Hikâye (1960 Sonrası ve Küçürek Hikâye)": [
                "1960 sonrası Türk hikâyesinin temalarını, anlatım tekniklerini ve yönelimlerini çözümler.",
                "Küçürek (minimal) hikâyenin özelliklerini kavrar ve örnek metinleri tahlil eder.",
                "Modernist ve postmodernist hikâyelerde kullanılan teknikleri (bilinç akışı, iç monolog, pastiş) belirler.",
                "Özgün bir küçürek hikâye metni kaleme alır ve edebi estetiğini tartışır."
            ],
            "3. Ünite: Şiir (Cumhuriyet Dönemi Türk Şiiri)": [
                "Cumhuriyet Dönemi saf şiir, toplumcu şiir, Garip akımı, İkinci Yeni ve dini değerleri öne çıkaran şiir anlayışlarını karşılaştırır.",
                "1980 sonrası Türk şiirinin genel özelliklerini ve eğilimlerini belirler.",
                "Şiirlerdeki imge, ahenk, ritim, edebi sanatlar ve açık/örtük iletileri çözümler.",
                "Cumhuriyet devri şairlerinin şiir anlayışlarını yansıtan poetikaları inceler."
            ],
            "4. Ünite: Roman (1980 Sonrası ve Postmodern Roman)": [
                "1980 sonrası Türk romanının toplumsal ve bireysel konularını inceler.",
                "Postmodern romanda üstkurmaca, metinlerarasılık, parodi ve ironi tekniklerini çözümler.",
                "Romandaki şahıs kadrosunun psikolojik ve sosyal tahlilini yapar.",
                "Roman ile sinema/dijital medya uyarlamaları arasındaki farkları tartışır."
            ],
            "5. Ünite: Tiyatro (Cumhuriyet Dönemi Türk Tiyatrosu)": [
                "Cumhuriyet Dönemi Türk tiyatrosundaki gelişmeleri, türleri ve tematik eğilimleri inceler.",
                "Epik tiyatro ve absürt tiyatronun özelliklerini metinler üzerinden açıklar.",
                "Tiyatro metnindeki çatışmaları, sahneleme tekniklerini ve diyalog yapılarını çözümler.",
                "Bir tiyatro sahnesini canlandırarak sözlü ve bedensel iletişim becerisini sergiler."
            ],
            "6. Ünite: Deneme / Söylev": [
                "Cumhuriyet Dönemi deneme yazarlarını ve eserlerini konu, dil ve üslup yönünden inceler.",
                "Söylev (hitabet) türünün özelliklerini ve tarihi-toplumsal işlevini kavrar.",
                "Atatürk'ün Nutuk başta olmak üzere önemli söylev metinlerini analiz eder.",
                "Güncel bir konuda düşüncelerini etkili bir üslupla aktaran özgün bir deneme yazar."
            ],
            "7. Ünite: Mülakat / Röportaj": [
                "Mülakat ve röportaj türlerinin özelliklerini, farklarını ve gelişimini inceler.",
                "Bir alanın uzmanıyla mülakat planlar, sorular hazırlar ve uygular.",
                "Görsel ve işitsel unsurlarla zenginleştirilmiş bir röportaj metni hazırlar.",
                "Medya etiği ve doğru bilgi aktarımı ilkelerini kavrar."
            ]
        },
        "Matematik": {
            "1. Ünite: Üstel ve Logaritmik Fonksiyonlar": [
                "Üstel fonksiyonu açıklar ve grafiğini çizer; üstel büyüme ve bozunma problemlerini modeller.",
                "Logaritma fonksiyonunu üstel fonksiyonun tersi olarak tanımlar ve özelliklerini kavrar.",
                "Taban değiştirme kuralı ve logaritmanın temel özelliklerini kullanarak işlem yapar.",
                "Üstel ve logaritmik denklemler ile eşitsizliklerin çözüm kümelerini bulur; günlük hayat problemlerine (deprem büyüklüğü, ses şiddeti, pH) uygular."
            ],
            "2. Ünite: Diziler": [
                "Gerçek sayı dizilerini tanımlar, genel terimini ve sonlu dizi kavramını açıklar.",
                "Aritmetik dizinin özelliklerini, genel terimini ve ilk n terim toplamı formülünü türetir ve uygular.",
                "Geometrik dizinin özelliklerini, genel terimini ve ilk n terim toplamını hesaplar.",
                "Dizileri günlük hayat finansal modellemelerinde (faiz, nüfus artışı vb.) kullanır."
            ],
            "3. Ünite: Trigonometri": [
                "İki açının toplam ve farkının trigonometrik değerlerine ait formülleri türetir ve kullanır.",
                "İki kat açı (yarım açı) formüllerini oluşturur ve trigonometrik sadeleştirmelerde uygular.",
                "sin x = a, cos x = a ve tan x = a biçimindeki trigonometrik denklemleri çözer.",
                "Trigonometrik modelleme ile fiziksel dalga ve periyodik hareket problemlerini analiz eder."
            ],
            "4. Ünite: Türev": [
                "Bir fonksiyonun bir noktadaki limitini ve süreklilik şartlarını inceler; belirsizlik durumlarını çözer.",
                "Anlık değişim oranını ve türevin limit tanımını açıklar.",
                "Türev alma kurallarını (çarpım, bölüm, bileşke ve zincir kuralı) fonksiyonlara uygular.",
                "Türevin geometrik yorumunu (teğet ve normal denklemleri) kavrar; artan-azalan aralıkları ve yerel ekstremum noktalarını belirler; maksimum-minimum problemlerini çözer."
            ],
            "5. Ünite: İntegral": [
                "Belirsiz integrali diferansiyel kavramı ve türevin ters işlemi olarak açıklar; temel integral alma kurallarını uygular.",
                "Değişken değiştirme yöntemini kullanarak integral hesaplar.",
                "Riemann toplamını ve belirli integrali açıklar; belirli integralin temel teoremini kavrar.",
                "Belirli integral yardımıyla eğrilerin altında kalan alanı ve iki eğri arasındaki alanı hesaplar."
            ],
            "6. Ünite: Çemberin Analitik İncelenmesi": [
                "Merkezi ve yarıçapı verilen çemberin standart ve genel denklemini yazar.",
                "Genel denklemi verilen çemberin merkezini ve yarıçapını belirler; grafiklerini çizer.",
                "Bir doğru ile bir çemberin birbirine göre durumlarını inceler (teğet, kesen, kesişmeyen).",
                "Çember denklemlerini günlük hayat tasarım ve mühendislik problemlerinde modeller."
            ]
        },
        "Fizik": {
            "1. Ünite: Çembersel Hareket": [
                "Düzgün çembersel harekette periyot, frekans, çizgisel hız, açısal hız, merkezcil ivme ve merkezcil kuvvet kavramlarını açıklar.",
                "Yatay, düşey ve eğimli virajlarda çembersel hareket dinamiklerini çözer.",
                "Dönerek öteleme hareketinde toplam kinetik enerjiyi ve eylemsizlik momentini kavrar.",
                "Açısal momentumun tanımını ve dış tork sıfır olduğunda açısal momentumun korunumunu modellerle açıklar.",
                "Kepler kanunlarını ve kütle çekim kuvvetinin gezegen hareketlerindeki rolünü analiz eder."
            ],
            "2. Ünite: Basit Harmonik Hareket": [
                "Basit harmonik hareketi düzgün çembersel hareketin izdüşümü olarak modeller.",
                "Harmonik harekette konum, hız, ivme ve kuvvetin zamana bağlı değişim denklemlerini açıklar.",
                "Yaylı sarkaç ve basit sarkacın periyodunu etkileyen değişkenleri inceler ve hesaplar.",
                "Harmonik harekette mekanik enerjinin korunumunu ve rezonans olayını tartışır."
            ],
            "3. Ünite: Dalga Mekaniği": [
                "Su dalgalarında kırınım ve girişim olaylarını modellerle açıklar.",
                "Işıkta çift yarıkta girişim (Young deneyi) ve tek yarıkta kırınım olaylarını karşılaştırır.",
                "Işığın dalga doğasını, saçak aralığını ve yol farkını hesaplar.",
                "Doppler olayının mekanik ve elektromanyetik dalgalardaki oluşumunu ve astronomideki kullanımını açıklar; elektromanyetik spektrumu sınıflandırır."
            ],
            "4. Ünite: Atom Fiziğine Giriş ve Radyoaktivite": [
                "Tarihsel süreçte atom modellerini (Dalton, Thomson, Rutherford, Bohr) inceler; Bohr atom modelinin başarılarını ve eksiklerini kavrar.",
                "Atomların uyarılma yollarını (çarpışma, foton, ısı) ve spektrum çizgilerini açıklar; Franck-Hertz deneyini yorumlar.",
                "Kararsız çekirdeklerin radyoaktif bozunmalarını (alfa, beta, gama) ve yarılanma ömrünü hesaplar.",
                "Nükleer fisyon ve füzyon reaksiyonlarını, kütle-enerji eşdeğerliğini (E=mc²) ve nükleer enerji santrallerini değerlendirir."
            ],
            "5. Ünite: Modern Fizik": [
                "Özel görelilik teorisinin iki temel postulatını kavrar; zamanın genişlemesi ve uzunluğun büzülmesini açıklar.",
                "Siyah cisim ışımasını ve Planck'ın kuantum hipotezini modeller.",
                "Fotoelektrik olayı ve Einstein'ın fotoelektrik denklemini deney verileriyle analiz eder; eşik enerjisi ve durdurma gerilimini hesaplar.",
                "Compton saçılmasını ve De Broglie dalga boyunu (dalga-parçacık ikiliği) kavrar."
            ],
            "6. Ünite: Modern Fiziğin Teknolojideki Uygulamaları": [
                "Tıbbi görüntüleme cihazlarının (Röntgen, MR, Tomografi, PET, Ultrason) temel fiziksel çalışma prensiplerini karşılaştırır.",
                "Yarı iletken maddelerin özelliklerini, diyot, transistör ve güneş pillerinin işlevlerini açıklar.",
                "Süper iletkenlik durumunu, Meissner etkisini ve maglev trenlerindeki kullanımını inceler.",
                "Nanoteknolojinin kullanım alanlarını ve LASER ışınlarının elde edilişini/özelliklerini açıklar."
            ]
        },
        "Kimya": {
            "1. Ünite: Kimya ve Elektrik": [
                "İndirgenme-yükseltgenme (redoks) tepkimelerini yarı tepkime yöntemiyle denkleştirir.",
                "Standart elektrot potansiyellerini kullanarak galvanik hücrelerin (piller) potansiyelini ve kendiliğindenliğini belirler.",
                "Nernst eşitliğini derişim pillerine ve standart olmayan koşullara uygular; lityum iyon pillerini açıklar.",
                "Elektroliz olayını, Faraday yasalarını, suyun elektrolizini ve korozyondan korunma (katodik koruma) yöntemlerini kavrar."
            ],
            "2. Ünite: Karbon Kimyasına Giriş": [
                "Organik ve anorganik bileşiklerin özelliklerini ve aralarındaki farkları belirler.",
                "Karbon elementinin çok bağ yapabilme özelliğini ve allotroplarını (elmas, grafit, grafen, fulleren, nanotüp) açıklar.",
                "Kovalent bağlı moleküllerin Lewis formüllerini yazar; hibritleşme türlerini (sp, sp², sp³) belirler.",
                "VSEPR teorisini kullanarak molekül geometrisini (doğrusal, kırık doğru, düzlem üçgen, düzgün dörtyüzlü, üçgen piramit) ve bağ açılarını açıklar."
            ],
            "3. Ünite: Organik Bileşikler": [
                "Hidrokarbonları (alkanlar, alkenler, alkinler ve aromatik bileşikler) adlandırır (IUPAC kuralları), tepkimelerini ve izomerlik türlerini inceler.",
                "Fonksiyonel grupları tanır; alkolleri ve eterleri sınıflandırır, adlandırır ve fiziksel/kimyasal özelliklerini açıklar.",
                "Aldehit ve ketonların özelliklerini, Tollens ve Fehling belirteçleriyle indirgenme-yükseltgenme tepkimelerini kavrar.",
                "Karboksilik asitleri ve esterleri adlandırır; sabunlaşma, esterleşme tepkimelerini ve günlük yaşamdaki kullanım alanlarını açıklar."
            ],
            "4. Ünite: Enerji Kaynakları ve Bilimsel Gelişmeler": [
                "Fosil yakıtların (kömür, petrol, doğal gaz) çevreye etkilerini ve sera gazı salınımını değerlendirir.",
                "Yenilenebilir ve temiz enerji kaynaklarını (biyokütle, hidrojen enerjisi, bor mineralleri) karşılaştırır.",
                "Yeşil kimya ilkelerini ve sürdürülebilir üretim süreçlerini tartışır."
            ]
        },
        "Biyoloji": {
            "1. Ünite: Genden Proteine": [
                "Nükleik asitlerin (DNA ve RNA) yapısını, nükleotid dizilimlerini ve hücredeki işlevlerini açıklar.",
                "DNA'nın yarı korunumlu eşlenmesini (Meselson-Stahl deneyi) ve replikasyon enzimlerini (helikaz, DNA polimeraz, ligaz) kavrar.",
                "Genetik şifreyi, kodon-antikodon ilişkisini ve santral doğma (replikasyon, transkripsiyon, translasyon) sürecini modeller.",
                "Gen klonlaması, CRISPR teknolojisi ve genetik mühendisliğinin etik boyutlarını değerlendirir."
            ],
            "2. Ünite: Canlılarda Enerji Dönüşümleri": [
                "ATP'nin yapısını ve fosforilasyon çeşitlerini (substrat düzeyinde, oksidatif, fotofosforilasyon) açıklar.",
                "Fotosentezin ışığa bağımlı ve ışıktan bağımsız (Calvin döngüsü) reaksiyonlarını, fotoliz olayını ve kloroplastın yapısını kavrar; kemosentezi fotosentezle karşılaştırır.",
                "Hücresel solunum basamaklarını (glikoliz, pirüvat oksidasyonu, Krebs döngüsü, ETS) ve ATP kazancını analiz eder.",
                "Oksijensiz solunum ve fermantasyon (laktik asit ve etil alkol) çeşitlerini hücresel solunumla karşılaştırır."
            ],
            "3. Ünite: Bitki Biyolojisi": [
                "Bitkisel dokuları (meristem, temel, iletim, örtü doku) ve görevlerini modeller üzerinde gösterir.",
                "Bitkisel organların (kök, gövde, yaprak) anatomik yapısını inceler.",
                "Bitkilerde su ve mineral taşınımını (kök basıncı, kohezyon-gerilim teorisi) ve organik madde taşınımını (basınç-akış teorisi) açıklar; stomanın açılıp kapanma mekanizmasını kavrar.",
                "Bitkisel hormonları (oksin, giberellin, sitokinin, absisik asit, etilen) ve bitkilerde hareket çeşitlerini (tropizma, nasti) inceler; çiçekli bitkilerde üreme ve çimlenmeyi açıklar."
            ],
            "4. Ünite: Canlılar ve Çevre": [
                "Popülasyon genetiğinde Hardy-Weinberg kuralını ve gen havuzunu değiştiren faktörleri açıklar.",
                "Çevre koşullarının genlerin işleyişine ve fenotipe etkisini (epigenetik) değerlendirir.",
                "Biyoçeşitliliğin korunması ve küresel çevre felaketlerine karşı sürdürülebilir biyo-stratejiler geliştirir."
            ]
        },
        "Coğrafya": {
            "1. Ünite: Ekstrem Doğa Olayları ve Doğal Sistemler": [
                "Ekstrem doğa olaylarının (meteorolojik, jeolojik, hidrolojik) oluşum nedenlerini ve küresel etkilerini değerlendirir.",
                "Geleceğe yönelik iklim senaryolarını ve ekosistemlerin bu değişimlere tepkisini açıklar.",
                "Doğadaki karbon ve hidrolojik döngüdeki insan müdahalelerini analiz eder."
            ],
            "2. Ünite: Küresel Ticaret ve Bölgesel Kalkınma Projeleri": [
                "Dünyadaki önemli sanayi, hammadde ve üretim bölgelerini harita üzerinde çözümler.",
                "Türkiye'nin bölgesel kalkınma projelerini (GAP, DAP, DOKAP, ZBK, KOP) hedefleri ve etkileri yönünden inceler.",
                "Uluslararası ulaşım hatlarının (boğazlar, kanallar, boru hatları) jeopolitik önemini kavrar."
            ],
            "3. Ünite: Çevre ve Toplum (Küresel Sorunlar)": [
                "Çevre kirliliğinin küresel boyutlarını (asit yağmurları, radyoaktif atıklar, ozon tabakası) ve uluslararası çevre sözleşmelerini tartışır.",
                "Doğal kaynakların sürdürülebilir kullanımı ve gelecek nesillere aktarımı için çevre etiğini savunur."
            ]
        },
        "Felsefe": {
            "1. Ünite: 20. Yüzyıl Felsefesi": [
                "20. yüzyıl felsefesinin tarihsel ve toplumsal arka planını inceler.",
                "Dönemin temel akımlarını (fenomenoloji, mantıkçı pozitivizm, varoluşçuluk, hermeneutik, diyalektik materyalizm) ayırt eder.",
                "Dönem filozoflarının (Husserl, Sartre, Nietzsche, Wittgenstein, Heidegger) görüşlerini metinlerle tahlil eder."
            ],
            "2. Ünite: Felsefi Metin Analizi ve Akıl Yürütme": [
                "Felsefi argümanları, tutarlılık, geçerlilik ve temellendirme ilkelerine göre değerlendirir.",
                "Varoluş, özgürlük, yabancılaşma ve insan hakları kavramlarını felsefi metinler üzerinden tartışır."
            ],
            "3. Ünite: Felsefenin Güncel Hayattaki Rolü": [
                "Yapay zeka etiği, çevre etiği ve biyoetik gibi çağdaş sorunlara felsefi bakış açısı getirir.",
                "Kritik düşünme becerisinin dezenformasyon ve manipülasyonla mücadeledeki önemini kavrar."
            ]
        },
        "İngilizce": {
            "Unit 1: Music": [
                "Expressing personal opinions about musical genres, singers and rhythm.",
                "Stating past habits and preferences using 'used to' and past simple.",
                "Writing a review of a concert or music album."
            ],
            "Unit 2: Friendship": [
                "Analyzing interpersonal relationships, conflict resolution and empathy.",
                "Expressing regrets and hypothetical wishes using conditional forms (Type 2/3, wish clauses).",
                "Writing an advice column for relationship problems."
            ],
            "Unit 3: Human Rights": [
                "Discussing universal human rights, equality and social justice.",
                "Reporting speech and thoughts accurately (reported speech).",
                "Delivering a persuasive speech on equality and freedom."
            ],
            "Unit 4: Coming Soon": [
                "Talking about futuristic predictions, space colonization and cybernetic advancements.",
                "Using future perfect and future continuous tenses appropriately.",
                "Writing a sci-fi movie pitch or technological foresight essay."
            ],
            "Unit 5: Alternative Energy": [
                "Discussing renewable energy resources and ecological footprints.",
                "Expressing causes and effects of industrial pollution using passive voice.",
                "Designing an eco-friendly project presentation in English."
            ]
        },
        "Din Kültürü ve Ahlak Bilgisi": {
            "1. Ünite: İslam ve Bilim": [
                "İslam medeniyetinde bilim ve düşüncenin gelişimini (Beytü'l-Hikme, rasathaneler) inceler.",
                "Müslüman bilim insanlarının (İbn-i Sina, Harezmi, Ali Kuşçu, Biruni, Katip Çelebi vb.) dünya bilimine katkılarını açıklar.",
                "Kur'an'ın akla, araştırmaya ve evreni incelemeye verdiği önemi ayetlerle değerlendirir."
            ],
            "2. Ünite: Anadolu'da İslam ve Tasavvuf": [
                "Anadolu'nun İslamlaşmasında Horasan erenlerinin ve mutasavvıfların rolünü kavrar.",
                "Ahilik teşkilatının ahlaki ve iktisadi ilkelerini analiz eder.",
                "Hacı Bektaş Veli, Yunus Emre, Mevlana ve Ahi Evran'ın evrensel sevgi, hoşgörü ve barış mesajlarını değerlendirir."
            ]
        },
        "İkinci Yabancı Dil (Almanca/Fransızca)": {
            "1. Ünite: Alltag und Medien / La vie quotidienne": [
                "Günlük rutinleri, medya kullanımını ve dijital alışkanlıkları ikinci yabancı dilde ifade eder.",
                "Karmaşık cümle yapılarıyla geçmişte yapılan etkinlikleri anlatır.",
                "Kısa haber metinlerini ve duyuruları anlar."
            ],
            "2. Ünite: Zukunft und Beruf / L'avenir et la carrière": [
                "Gelecek planları, üniversite tercihleri ve mesleki ideallerini ifade eder.",
                "İş başvurusu, özgeçmiş hazırlama ve e-posta yazışma kalıplarını uygular.",
                "Kültürlerarası iletişimde nezaket kurallarını gözetir."
            ]
        },
        "Beden Eğitimi ve Spor": {
            "1. Ünite: İleri Spor Becerileri ve Liderlik": [
                "Seçilen bir spor branşında ileri seviye teknik ve taktikleri uygular.",
                "Müsabaka yönetimi, hakemlik kuralları ve organizasyon becerilerini deneyimler.",
                "Spor psikolojisini ve stres yönetimini müsabakalarda kullanır."
            ],
            "2. Ünite: Yaşam Boyu Sağlık ve Antrenman İlkeleri": [
                "Kişisel antrenman programı tasarlar ve dönemsel gelişimini takip eder.",
                "Ergonomi, omurga sağlığı ve masa başı egzersizlerini günlük hayatına entegre eder."
            ]
        },
        "Görsel Sanatlar / Müzik": {
            "1. Ünite: Sanatsal İfade ve Bireysel Üslup": [
                "Kendi sanatsal vizyonunu yansıtan özgün bir portfolyo oluşturur.",
                "Geleneksel ve çağdaş teknikleri bir arada kullanarak melez eserler tasarlar.",
                "Sanat eserini sergileme ve küratörlük süreçlerini kavrar."
            ],
            "2. Ünite: Sanat, Estetik ve Toplumsal Yansıma": [
                "Sanatın toplumsal hafızayı diri tutma işlevini tarihi örneklerle açıklar.",
                "Estetik felsefesi ilkelerine göre sanat eserlerini derinlemesine çözümler."
            ]
        },
        "Seçmeli Psikoloji / Sosyoloji": {
            "1. Ünite: Sosyal Psikoloji ve Birey": [
                "Tutumlar, ön yargılar, grup dinamikleri ve sosyal etki kavramlarını açıklar.",
                "Bireyin toplum içindeki rolünü ve sosyal kimlik kuramını inceler.",
                "İletişim çatışmalarının psikolojik dinamiklerini ve empatiyi değerlendirir."
            ],
            "2. Ünite: Kültür, Toplum ve Değişme": [
                "Toplumsal tabakalaşma, hareketlilik ve küreselleşmenin etkilerini tartışır.",
                "Toplumsal kurumları (aile, eğitim, ekonomi, din) ve işlevlerini sosyolojik açıdan tahlil eder.",
                "Çağdaş sosyolojik araştırmaların yöntem ve tekniklerini kavrar."
            ]
        },
        "Seçmeli Bilgisayar Bilimi": {
            "1. Ünite: İleri Yazılım ve Proje Geliştirme": [
                "Nesne yönelimli programlama (OOP) ve modern yazılım mimarilerini uygular.",
                "Veritabanı tasarımı (SQL/NoSQL) ve API entegrasyonu gerçekleştirir.",
                "Yazılım yaşam döngüsüne (SDLC) uygun bir dönem sonu projesi geliştirir."
            ],
            "2. Ünite: Yeni Nesil Teknolojiler ve Güvenlik": [
                "Yapay zeka modellerini, büyük veri analitiğini ve veri görselleştirmeyi kavrar.",
                "Siber güvenlik protokolleri, kriptografi ve güvenli kod yazma standartlarını uygular.",
                "Yazılım etiği ve lisanslama modellerini değerlendirir."
            ]
        },
        "T.C. İnkılap Tarihi ve Atatürkçülük": {
            "1. Ünite: 20. Yüzyıl Başlarında Osmanlı Devleti ve Dünya": [
                "20. yüzyıl başlarında Osmanlı Devleti'nin siyasi buhranlarını, Trablusgarp ve Balkan Savaşları'nı analiz eder.",
                "I. Dünya Savaşı'nın genel ve özel sebeplerini, Osmanlı'nın savaşa giriş gerekçelerini inceler.",
                "I. Dünya Savaşı'nda Osmanlı ordusunun savaştığı cepheleri ve Çanakkale Zaferi'nin küresel etkilerini değerlendirir.",
                "Mustafa Kemal'in askerlik dehasını sergilediği görevleri ve Millî Mücadele'ye hazırlık evresini kavrar."
            ],
            "2. Ünite: Millî Mücadele": [
                "Mondros Ateşkesi sonrası işgallere karşı oluşan yerel cemiyetleri ve Kuvâ-yı Millîye hareketini açıklar.",
                "Amasya Genelgesi, Erzurum ve Sivas Kongreleri ile ulusal egemenlik ve tam bağımsızlık fikrinin olgunlaşmasını analiz eder.",
                "Misak-ı Millî kararlarını, TBMM'nin açılışını ve TBMM'ye karşı çıkarılan isyanları değerlendirir.",
                "Doğu, Güney ve Batı cephelerindeki askeri mücadeleleri, Sakarya Zaferi'ni ve Büyük Taarruz'u tahlil eder; Lozan Barış Antlaşması'nı siyasi zafer olarak değerlendirir."
            ],
            "3. Ünite: Atatürkçülük ve Türk İnkılabı": [
                "Atatürk ilkelerini (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık) bütüncül olarak kavrar.",
                "Siyasal alanda saltanatın ve halifeliğin kaldırılmasını, cumhuriyetin ilanını açıklar.",
                "Hukuk alanında Türk Medeni Kanunu'nun ve anayasaların kabulünü toplumsal eşitlik açısından değerlendirir.",
                "Eğitim, kültür ve ekonomi alanlarında yapılan inkılapların çağdaş Türk toplumunun inşasındaki rolünü açıklar."
            ],
            "4. Ünite: İki Savaş Arasındaki Dönemde Türkiye ve Dünya": [
                "Atatürk dönemi dış politikasının barışçıl ve gerçekçi ilkelerini ('Yurtta sulh, cihanda sulh') analiz eder.",
                "Balkan Antantı ve Sadabat Paktı'nın bölgesel barışa katkısını açıklar.",
                "Montrö Boğazlar Sözleşmesi ile Boğazlar üzerinde tam Türk hâkimiyetinin kurulmasını ve Hatay'ın ana vatana katılması sürecini kavrar.",
                "1929 Dünya Ekonomik Buhranı'nın Türkiye ve dünya ekonomisine etkilerini değerlendirir."
            ],
            "5. Ünite: II. Dünya Savaşı Sürecinde Türkiye ve Dünya": [
                "II. Dünya Savaşı'nın nedenlerini, Mihver ve Müttefik devletler bloklarını ve savaşın gidişatını inceler.",
                "Türkiye'nin savaş boyunca uyguladığı çok yönlü aktif tarafsızlık ve diplomasi politikasını değerlendirir.",
                "Savaş yıllarında Türkiye'deki ekonomik sıkıntıları, Varlık Vergisi ve Millî Korunma Kanunu uygulamalarını açıklar.",
                "Savaşın küresel sonuçlarını, Birleşmiş Milletler'in kuruluşunu ve insan hakları ihlallerini tartışır."
            ],
            "6. Ünite: II. Dünya Savaşı Sonrasında Türkiye ve Dünya": [
                "Soğuk Savaş döneminin başlamasını, Doğu ve Batı bloklarının oluşumunu (NATO ve Varşova Paktı) kavrar.",
                "Türkiye'nin NATO'ya giriş sürecini ve Kore Savaşı'na katılımını değerlendirir.",
                "Türkiye'de çok partili hayata geçişi ve 1950 seçimleriyle Demokrat Parti döneminin başlamasını analiz eder.",
                "1950'li yıllarda Türkiye'deki ekonomik, sosyal ve kültürel dönüşümleri inceler."
            ],
            "7. Ünite: Toplumsal Devrim Çağında Dünya ve Türkiye": [
                "1960-1990 arası dönemde Türkiye'deki siyasi dalgalanmaları ve 1961/1982 anayasalarını karşılaştırır.",
                "Kıbrıs Barış Harekâtı'nın (1974) nedenlerini, seyrini ve Türk dış politikasındaki yerini değerlendirir.",
                "Bağlantısızlar Hareketi ve nükleer silahlanma yarışının uluslararası ilişkilere etkilerini kavrar.",
                "Türkiye'de sanayileşme, iç göç, gecekondu kültürü ve edebiyat/sanat hayatındaki gelişmeleri inceler."
            ],
            "8. Ünite: 21. Yüzyılın Eşiğinde Türkiye ve Dünya": [
                "Sovyetler Birliği'nin dağılması, Türk cumhuriyetlerinin bağımsızlığını kazanması ve Türkiye ile ilişkilerini analiz eder.",
                "Balkanlar ve Orta Doğu'daki krizleri (Bosna Savaşı, Körfez Savaşları) ve Türkiye'nin bölgesel rolünü kavrar.",
                "Küreselleşme, bilgi ve iletişim teknolojileri devrimi ile yapay zekanın 21. yüzyıla etkilerini açıklar.",
                "Türkiye'nin jeopolitik konumunun önemini, vizyoner atılımlarını ve uluslararası arenadaki misyonunu değerlendirir."
            ]
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
            if (konuSelect.previousElementSibling) konuSelect.previousElementSibling.innerHTML = 'Öğrenim Çıktısı:';

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
            const konuLabel = isNewModel ? 'Öğrenim Çıktısı:' : 'Konu:';

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
                konuSelect.style.height = '120px';
                konuSelect.innerHTML = '<option value="" disabled>Birden fazla seçim yapabilirsiniz (Ctrl / Cmd ile)...</option>';
            } else {
                konuSelect.multiple = false;
                konuSelect.style.height = 'auto';
                Array.from(konuSelect.options).forEach(opt => opt.selected = false);
                konuSelect.innerHTML = '<option value="">Kazanım Seçin...</option>';
            }
            
            konuSelect.disabled = !uniteVal;

            if (uniteVal && curriculumData[classVal] && curriculumData[classVal][dersVal] && curriculumData[classVal][dersVal][uniteVal]) {
                curriculumData[classVal][dersVal][uniteVal].forEach(function (k) {
                    konuSelect.innerHTML += '<option value="' + k + '">' + k + '</option>';
                });
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

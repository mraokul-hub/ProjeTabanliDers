// ============================================================
// curriculum.js
// Müfredat veri yapısı ve ders seçimi
// ============================================================

        const curriculumData = {
            "1. Sınıf": {
                "Türkçe": {
                    "Okuma ve Yazma": [
                        "Harfler ve Sesler",
                        "Heceleme",
                        "Kelime Okuma ve Yazma",
                        "Basit Cümleler Kurma"
                    ],
                    "Dinleme ve İzleme": [
                        "Masal Dinleme",
                        "Görsel Okuma",
                        "Yönergelere Uyma"
                    ],
                    "Konuşma": [
                        "Kendini Tanıtma",
                        "Olayları Anlatma",
                        "Görgü Kuralları"
                    ]
                },
                "Matematik": {
                    "Sayılar ve İşlemler": [
                        "1'den 20'ye Kadar Sayma",
                        "Rakamları Yazma",
                        "Toplama İşlemine Giriş",
                        "Çıkarma İşlemine Giriş"
                    ],
                    "Geometri": [
                        "Temel Geometrik Şekiller (Kare, Üçgen, Daire)",
                        "Uzamsal İlişkiler"
                    ],
                    "Ölçme": [
                        "Uzunluk Ölçme",
                        "Zaman Ölçme (Tam Saatler)"
                    ]
                },
                "Hayat Bilgisi": {
                    "Okulumuzda Hayat": [
                        "Okulla Tanışma",
                        "Sınıf Kuralları",
                        "Okulun Bölümleri"
                    ],
                    "Evimizde Hayat": [
                        "Aile Bireyleri",
                        "Evimizin Adresi",
                        "Evdeki Sorumluluklar"
                    ],
                    "Sağlıklı Hayat": [
                        "Kişisel Bakım",
                        "Sağlıklı Beslenme"
                    ],
                    "Doğada Hayat": [
                        "Mevsimler",
                        "Bitkiler ve Hayvanlar"
                    ]
                },
                "İngilizce": {
                    "Words": [
                        "Greetings",
                        "Numbers 1-10",
                        "Colors"
                    ],
                    "Friends": [
                        "Introducing oneself",
                        "My friends"
                    ],
                    "In the Classroom": [
                        "Classroom objects",
                        "Simple commands"
                    ]
                }
            },
            "2. Sınıf": {
                "Türkçe": {
                    "Okuma Anlama": [
                        "Metnin Konusu",
                        "Metnin Ana Fikri",
                        "Şiir Okuma"
                    ],
                    "Yazma": [
                        "Olay Yazıları",
                        "Kısa Bilgilendirici Metinler",
                        "Yazım Kurallarına Giriş"
                    ],
                    "Söz Varlığı": [
                        "Eş Anlamlı Kelimeler",
                        "Zıt Anlamlı Kelimeler"
                    ]
                },
                "Matematik": {
                    "Sayılar ve İşlemler": [
                        "100'e Kadar Sayma",
                        "Eldeli Toplama",
                        "Onluk Bozarak Çıkarma",
                        "Çarpma İşlemine Giriş",
                        "Bölme İşlemine Giriş"
                    ],
                    "Geometri": [
                        "Geometrik Cisimler (Küp, Silindir)",
                        "Simetri"
                    ],
                    "Veri İşleme": [
                        "Çetele Tablosu",
                        "Nesne Grafiği"
                    ]
                },
                "Hayat Bilgisi": {
                    "Güvenli Hayat": [
                        "Trafik Kuralları",
                        "Acil Durumlar"
                    ],
                    "Ülkemizde Hayat": [
                        "Ülkemizin Yönetim Şekli",
                        "Milli Bayramlarımız"
                    ],
                    "Doğada Hayat": [
                        "Doğa Olayları",
                        "Geri Dönüşüm"
                    ]
                },
                "İngilizce": {
                    "My House": [
                        "Rooms in the house",
                        "Furniture"
                    ],
                    "My Family": [
                        "Family members",
                        "Describing people"
                    ],
                    "Animals": [
                        "Pets",
                        "Farm animals"
                    ]
                }
            },
            "3. Sınıf": {
                "Türkçe": {
                    "Okuma": [
                        "Okuduğunu Anlama",
                        "Metnin Bölümleri",
                        "Şiir ve Düz Yazı"
                    ],
                    "Yazma": [
                        "Paragraf Oluşturma",
                        "Noktalama İşaretleri",
                        "Hikaye Tamamlama"
                    ]
                },
                "Matematik": {
                    "Sayılar": [
                        "1000'e Kadar Sayma",
                        "3 Basamaklı Sayılarla İşlemler",
                        "Zihinden Çarpma ve Bölme"
                    ],
                    "Kesirler": [
                        "Bütün, Yarım, Çeyrek",
                        "Birim Kesirler"
                    ],
                    "Geometri": [
                        "Doğru, Işın, Açı",
                        "Geometrik Örüntüler"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Bilimsel Keşif Yolculuğu": [
                        "Bilimsel Bilgiye Ulaşma Yolları",
                        "Bilim İnsanlarının Özellikleri"
                    ],
                    "2. Ünite: Canlılar Dünyasına Yolculuk": [
                        "Canlıların Sınıflandırılması",
                        "Duyu Organlarının İşlevleri",
                        "Canlıların Yaşam Döngüleri"
                    ],
                    "3. Ünite: Yer Bilimciler İş Başında": [
                        "Kayaçlar, Madenler ve Mineraller",
                        "Fosil Oluşumu"
                    ],
                    "4. Ünite: Maddeyi Tanıyalım, Karıştırıp Ayıralım": [
                        "Maddenin Katı, Sıvı ve Gaz Hâli",
                        "Karışımlar ve Karışımların Ayrılması",
                        "Atıkların Ayrıştırılması"
                    ],
                    "5. Ünite: Hareketi Keşfediyorum": [
                        "Varlıkların Hareketleri",
                        "Kuvvet ve Etkileri"
                    ],
                    "6. Ünite: Yaşamımızı Kolaylaştıran Elektrik": [
                        "Elektrikli Araç Gereçler",
                        "Elektrikli Araç Gereçlerin Güvenli Kullanımı",
                        "Elektriğin Tasarruflu Kullanımı"
                    ],
                    "7. Ünite: Toprağı Tanıyorum, Tarımı Keşfediyorum": [
                        "Toprak Oluşumu ve Yapısı",
                        "Bitki Yetiştirme"
                    ],
                    "8. Ünite: Canlıların Yaşam Alanlarına Yolculuk": [
                        "Yaşam Alanları",
                        "Canlı Çeşitliliği",
                        "Yaşam Alanlarının Korunmasının Canlı Çeşitliliğine Etkisi"
                    ]
                },
                "Hayat Bilgisi": {
                    "Okulumuzda Hayat": [
                        "Okulun Krokisi",
                        "Meslekler"
                    ],
                    "Sağlıklı Hayat": [
                        "Kişisel Temizlik",
                        "Bilinçli Tüketici"
                    ]
                },
                "İngilizce": {
                    "Feelings": [
                        "Emotions",
                        "Expressing feelings"
                    ],
                    "Toys and Games": [
                        "Names of toys",
                        "Action verbs"
                    ],
                    "My City": [
                        "Places in a city",
                        "Transportation"
                    ]
                }
            },
            "4. Sınıf": {
                "Türkçe": {
                    "Okuma": [
                        "Hızlı ve Anlayarak Okuma",
                        "Metin Türleri",
                        "Sözlük Kullanımı"
                    ],
                    "Dil Bilgisi": [
                        "İsimler",
                        "Sıfatlar",
                        "Zarflar",
                        "Cümle Bilgisi"
                    ]
                },
                "Matematik": {
                    "Doğal Sayılar": [
                        "Milyonlara Kadar Sayma",
                        "Dört İşlem Problemleri"
                    ],
                    "Kesirler": [
                        "Kesir Çeşitleri",
                        "Kesirlerde Toplama ve Çıkarma"
                    ],
                    "Ölçme": [
                        "Uzunluk, Çevre ve Alan Ölçme",
                        "Tartma ve Sıvı Ölçme"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Bilime Yolculuk": [
                        "Bilimin Özellikleri",
                        "Bilgi Kaynaklarının Güvenilirliği"
                    ],
                    "2. Ünite: Sağlıklı Besleniyorum": [
                        "Besinlerin İçerikleri",
                        "Besinler ve Sağlıklı Yaşam"
                    ],
                    "3. Ünite: Dünya'mızı Keşfedelim": [
                        "Dünya'nın Şekli",
                        "Dünya'nın Yapısı",
                        "Dünya'nın Hareketleri"
                    ],
                    "4. Ünite: Maddenin Değişimi": [
                        "Maddenin Hâl Değişimleri",
                        "Maddelerin Isı Etkisiyle Değişimi"
                    ],
                    "5. Ünite: Mıknatısı Keşfediyorum": [
                        "Mıknatısın Kutupları ve Etkileşimleri",
                        "Mıknatısın Etki Ettiği Maddeler",
                        "Mıknatısın Kullanım Alanları"
                    ],
                    "6. Ünite: Enerji Dedektifleri": [
                        "Basit Elektrik Devresi",
                        "Yenilenebilir ve Yenilenemeyen Enerji Kaynakları"
                    ],
                    "7. Ünite: Işığın Peşinde": [
                        "Işığın Görmedeki Rolü",
                        "Işık Kaynakları",
                        "Işık Kirliliği"
                    ],
                    "8. Ünite: Sürdürülebilir Şehirler ve Topluluklar": [
                        "Sürdürülebilir Yaşam"
                    ]
                },
                "Sosyal Bilgiler": {
                    "Birey ve Toplum": [
                        "Kimliğim",
                        "Duygularım ve Düşüncelerim"
                    ],
                    "Kültür ve Miras": [
                        "Milli Kültürümüz",
                        "Geçmişten Günümüze Aile"
                    ],
                    "İnsanlar, Yerler ve Çevreler": [
                        "Yönler",
                        "Kroki",
                        "Doğal Afetler"
                    ]
                },
                "Din Kültürü ve Ahlak Bilgisi": {
                    "Günlük Hayattaki Dini İfadeler": [
                        "Dini İfadeler",
                        "Dilek ve Dualar"
                    ],
                    "İslam'ı Tanıyalım": [
                        "İslam'ın İnanç Esasları",
                        "İslam'ın Şartları"
                    ]
                },
                "İngilizce": {
                    "Classroom Rules": [
                        "Obligations",
                        "Permissions"
                    ],
                    "Daily Routine": [
                        "Telling the time",
                        "Daily activities"
                    ],
                    "Food and Drinks": [
                        "Ordering food",
                        "Expressing preferences"
                    ]
                }
            },
            "5. Sınıf": {
                "Türkçe": {
                    "Okuma Anlama": [
                        "Metin Analizi",
                        "Paragrafta Anlam",
                        "Şiir İncelemesi"
                    ],
                    "Söz Varlığı ve Dil Bilgisi": [
                        "Kök ve Ekler",
                        "Sesteş Kelimeler",
                        "Deyimler ve Atasözleri"
                    ]
                },
                "Matematik": {
                    "Doğal Sayılarla İşlemler": [
                        "Üslü İfadeler",
                        "Parantezli İşlemler",
                        "Zihinden İşlemler"
                    ],
                    "Kesirler ve Ondalık Gösterim": [
                        "Kesirleri Genişletme ve Sadeleştirme",
                        "Ondalık Gösterimlerin Okunuşu ve Yazılışı",
                        "Yüzdeler"
                    ],
                    "Geometri": [
                        "Temel Geometrik Kavramlar",
                        "Çokgenler",
                        "Dikdörtgenler Prizması"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Gökyüzündeki Komşularımız ve Biz": [
                        "Gökyüzündeki Komşumuz: Güneş",
                        "Gökyüzündeki Komşumuz: Ay",
                        "Dünya'mız ve Gökyüzündeki Komşularımız"
                    ],
                    "2. Ünite: Kuvveti Tanıyalım": [
                        "Kuvvet ve Kuvvetin Ölçülmesi",
                        "Kütle ve Ağırlık İlişkisi",
                        "Sürtünme Kuvveti"
                    ],
                    "3. Ünite: Canlıların Yapısına Yolculuk": [
                        "Hücre ve Organelleri",
                        "Bitki ve Hayvan Hücresi Arasındaki Benzerlik ve Farklılıklar",
                        "Hücre-Doku-Organ-Sistem-Organizma İlişkisi",
                        "Destek ve Hareket Sistemi"
                    ],
                    "4. Ünite: Işığın Dünyası": [
                        "Işığın Yayılması",
                        "Işığın Maddeyle Etkileşimi",
                        "Tam Gölgenin Oluşumu"
                    ],
                    "5. Ünite: Maddenin Doğası": [
                        "Taneciklerin Konumu",
                        "Taneciklerin Boşluklu Yapısı",
                        "Taneciklerin Hareketi",
                        "Isı ve Sıcaklık",
                        "Isı ve Sıcaklık Arasındaki Farklar",
                        "Maddenin Hâl Değişimi",
                        "Isı Akışı ile İlgili Temel Kavramlar"
                    ],
                    "6. Ünite: Yaşamımızdaki Elektrik": [
                        "Devre Elemanlarının Sembolleri ve Devre Şeması",
                        "Basit Elektrik Devresi",
                        "Ampul Parlaklığını Etkileyen Değişkenler"
                    ],
                    "7. Ünite: Sürdürülebilir Yaşam ve Geri Dönüşüm": [
                        "Evsel Atıklar",
                        "Geri Dönüşüm",
                        "Atık Yönetimi"
                    ]
                },
                "Sosyal Bilgiler": {
                    "Birey ve Toplum": [
                        "Haklarımı Öğreniyorum",
                        "Çocuk Hakları"
                    ],
                    "Kültür ve Miras": [
                        "Anadolu ve Mezopotamya Uygarlıkları",
                        "Kültürel Özelliklerimiz"
                    ],
                    "İnsanlar, Yerler ve Çevreler": [
                        "Harita Okuryazarlığı",
                        "İklim ve İnsan Faaliyetleri"
                    ]
                },
                "Din Kültürü ve Ahlak Bilgisi": {
                    "Allah İnancı": [
                        "Allah'ın Varlığı ve Birliği",
                        "Allah'ın İsim ve Sıfatları"
                    ],
                    "Ramazan Ayı ve Oruç": [
                        "Oruç İbadeti",
                        "Ramazan Ayının Önemi"
                    ]
                },
                "İngilizce": {
                    "Hello!": [
                        "Meeting new people",
                        "Countries and Nationalities"
                    ],
                    "My Town": [
                        "Giving directions",
                        "Locations"
                    ],
                    "Games and Hobbies": [
                        "Likes and Dislikes",
                        "Abilities (Can/Can't)"
                    ]
                }
            },
            "6. Sınıf": {
                "Türkçe": {
                    "Okuma": [
                        "Metin Karşılaştırma",
                        "Görsel Yorumlama",
                        "Eleştirel Okuma"
                    ],
                    "Dil Bilgisi": [
                        "İsim Tamlamaları",
                        "Zamirler",
                        "Edat, Bağlaç, Ünlem"
                    ]
                },
                "Matematik": {
                    "Çarpanlar ve Katlar": [
                        "Asal Sayılar",
                        "Bölünebilme Kuralları",
                        "EBOB ve EKOK"
                    ],
                    "Tam Sayılar ve Kesirler": [
                        "Tam Sayılarda Yön",
                        "Kesirlerle İşlemler",
                        "Ondalık Gösterimlerle Çözümleme"
                    ],
                    "Cebirsel İfadeler": [
                        "Değişken Kavramı",
                        "Örüntüler ve İlişkiler"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Güneş Sistemi ve Tutulmalar": [
                        "Güneş Sistemi ve Gezegenler",
                        "Güneş ve Ay Tutulmaları"
                    ],
                    "2. Ünite: Kuvvetin Etkisinde Hareket": [
                        "Bileşke Kuvvet",
                        "Dengelenmiş ve Dengelenmemiş Kuvvetler",
                        "Sürat ve Hız İlişkisi"
                    ],
                    "3. Ünite: Canlılarda Sistemler": [
                        "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme",
                        "Denetleyici ve Düzenleyici Sistemler"
                    ],
                    "4. Ünite: Işığın Yansıması ve Renkler": [
                        "Işığın Yansıması",
                        "Düzgün ve Dağınık Yansıma",
                        "Yansıma Kanunları",
                        "Ayna Çeşitlerinde Görüntü Özellikleri",
                        "Aynaların Kullanım Alanları",
                        "Işığın Soğurulması",
                        "Beyaz Işığı Oluşturan Renkler",
                        "Cisimlerin Renkli Görülmesi",
                        "Güneş Işığının Günlük Yaşamda Kullanım Alanları"
                    ],
                    "5. Ünite: Maddenin Ayırt Edici Özellikleri": [
                        "Isı ve Madde Etkileşimi",
                        "Maddenin Hâl Değişim Noktaları",
                        "Yoğunluk"
                    ],
                    "6. Ünite: Elektriğin İletimi ve Direnç": [
                        "Elektriğin İletimi",
                        "Elektriksel Direnç ve Bağlı Olduğu Faktörler"
                    ],
                    "7. Ünite: Sürdürülebilir Yaşam ve Etkileşim": [
                        "Biyoçeşitlilik",
                        "Biyoçeşitliliği Tehdit Eden Faktörler",
                        "İnsan ve Çevre Etkileşimi",
                        "Isı Amaçlı Yakıt Kullanımı"
                    ]
                },
                "Sosyal Bilgiler": {
                    "Kültür ve Miras": [
                        "Orta Asya İlk Türk Devletleri",
                        "İslamiyet'in Doğuşu ve Türkler",
                        "Türkiye Selçuklu Devleti"
                    ],
                    "Üretim, Dağıtım ve Tüketim": [
                        "Türkiye'nin Kaynakları",
                        "Vergi Bilinci"
                    ]
                },
                "Bilişim Teknolojileri": {
                    "Bilişim Sistemleri": [
                        "Bilgisayarın Donanım Birimleri",
                        "Yazılım Türleri"
                    ],
                    "Problem Çözme ve Programlama": [
                        "Algoritma Geliştirme",
                        "Blok Tabanlı Kodlama (Scratch)"
                    ]
                },
                "Din Kültürü ve Ahlak Bilgisi": {
                    "Peygamber ve İlahi Kitap İnancı": [
                        "Peygamberlerin Özellikleri",
                        "İlahi Kitaplar"
                    ],
                    "Namaz İbadeti": [
                        "Namazın Şartları ve Kılınışı",
                        "Cemaatle Namaz"
                    ]
                },
                "İngilizce": {
                    "Life": [
                        "Daily routines",
                        "Adverbs of frequency"
                    ],
                    "Yummy Breakfast": [
                        "Food and drinks",
                        "Preferences"
                    ],
                    "Weather and Emotions": [
                        "Weather conditions",
                        "Feelings"
                    ]
                }
            },
            "7. Sınıf": {
                "Türkçe": {
                    "Okuma": [
                        "Metindeki Söz Sanatları",
                        "Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları"
                    ],
                    "Dil Bilgisi": [
                        "Fiiller (Eylemler)",
                        "Fiillerde Anlam Kayması",
                        "Zarflar (Belirteçler)"
                    ]
                },
                "Matematik": {
                    "Tam Sayılarla İşlemler": [
                        "Tam Sayılarla Toplama, Çıkarma, Çarpma, Bölme",
                        "Tam Sayıların Kuvvetleri"
                    ],
                    "Rasyonel Sayılar": [
                        "Rasyonel Sayıları Tanıma",
                        "Rasyonel Sayılarla İşlemler"
                    ],
                    "Cebirsel İfadeler ve Denklemler": [
                        "Eşitlik ve Denklem",
                        "Birinci Dereceden Bir Bilinmeyenli Denklemler"
                    ],
                    "Oran ve Orantı": [
                        "Doğru Orantı",
                        "Ters Orantı",
                        "Yüzdeler"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Uzay Çağı": [
                        "Türkiye ve Uzay Araştırmaları",
                        "Uzayda Neler Var?"
                    ],
                    "2. Ünite: Kuvvet ve Enerjiyi Keşfedelim": [
                        "Fiziksel Anlamda Yapılan İş",
                        "Enerji Çeşitleri",
                        "Enerji Dönüşümleri",
                        "Enerjinin Korunumu Yasası"
                    ],
                    "3. Ünite: Vücudumuzdaki Sistemler": [
                        "Sindirim Sistemi",
                        "Dolaşım Sistemi",
                        "Kan Bağışı",
                        "Solunum Sistemi",
                        "Boşaltım Sistemi"
                    ],
                    "4. Ünite: Işığın Kırılması ve Mercekler": [
                        "Işığın Kırılması",
                        "Mercekler"
                    ],
                    "5. Ünite: Maddenin Doğasına Yolculuk": [
                        "Maddenin Tanecikli Yapısı",
                        "Saf Maddeler",
                        "Karışımlar",
                        "Karışımların Ayrılması"
                    ],
                    "6. Ünite: Elektriklenme": [
                        "Elektriklenme",
                        "Elektriklenme Çeşitleri",
                        "Elektrik Yükleri"
                    ],
                    "7. Ünite: Sürdürülebilir Yaşam ve Geri Dönüşüm": [
                        "Besin Zinciri ve Enerji Akışı",
                        "Sürdürülebilir Yaşam",
                        "Kaynakların Tasarruflu Kullanımı"
                    ]
                },
                "Sosyal Bilgiler": {
                    "İletişim ve İnsan İlişkileri": [
                        "Kitle İletişim Araçları",
                        "İletişim Özgürlüğü"
                    ],
                    "Türk Tarihinde Yolculuk": [
                        "Osmanlı Devleti'nin Kuruluşu ve Yükselişi",
                        "Avrupa'daki Gelişmelerin Osmanlı'ya Etkisi"
                    ],
                    "Ekonomi ve Sosyal Hayat": [
                        "Toprak Yönetimi ve Tarım",
                        "Vakıflar ve Sivil Toplum Kuruluşları"
                    ]
                },
                "Teknoloji ve Tasarım": {
                    "Tasarım Süreci": [
                        "Sorun Belirleme",
                        "Araştırma ve Çözüm Üretme"
                    ],
                    "İnovasyon": [
                        "Yenilikçi Fikirler",
                        "Girişimcilik"
                    ]
                },
                "Din Kültürü ve Ahlak Bilgisi": {
                    "Melek ve Ahiret İnancı": [
                        "Meleklerin Özellikleri",
                        "Ahiret Hayatının Aşamaları"
                    ],
                    "Hac ve Kurban İbadeti": [
                        "Haccın Yapılışı",
                        "Kurban Kesmenin Önemi"
                    ]
                },
                "İngilizce": {
                    "Appearance and Personality": [
                        "Describing physical appearance",
                        "Personality traits"
                    ],
                    "Sports": [
                        "Talking about sports",
                        "Routines and frequency"
                    ],
                    "Biographies": [
                        "Talking about past events",
                        "Historical figures"
                    ]
                }
            },
            "8. Sınıf": {
                "Türkçe": {
                    "Okuma": [
                        "Metin Türleri (Makale, Deneme, Fıkra)",
                        "Söz Sanatları",
                        "Cümlede Anlam"
                    ],
                    "Dil Bilgisi": [
                        "Fiilimsiler",
                        "Cümlenin Ögeleri",
                        "Cümle Türleri",
                        "Yazım ve Noktalama"
                    ]
                },
                "Matematik": {
                    "Çarpanlar ve Katlar": [
                        "EBOB, EKOK",
                        "Aralarında Asal Sayılar"
                    ],
                    "Üslü İfadeler": [
                        "Üslü İfadelerle İşlemler",
                        "Bilimsel Gösterim"
                    ],
                    "Kareköklü İfadeler": [
                        "Tamkare Sayılar",
                        "Kareköklü İfadelerde Çarpma ve Bölme"
                    ],
                    "Veri Analizi": [
                        "Çizgi, Sütun ve Daire Grafikleri",
                        "Olasılık"
                    ]
                },
                "Fen Bilimleri": {
                    "1. Ünite: Mevsimler ve İklim": [
                        "Mevsimlerin Oluşumu",
                        "İklim ve Hava Olayları"
                    ],
                    "2. Ünite: Yaşamı Kolaylaştıran Kuvvet": [
                        "Basit Makineler",
                        "İş Kolaylığı",
                        "Kuvvetten Kazanç ve Kayıp",
                        "Yoldan Kazanç ve Kayıp"
                    ],
                    "3. Ünite: Yaşamın Gizemı": [
                        "DNA ve Genetik Kod",
                        "Mitoz ve Mayoz",
                        "Kalıtım",
                        "Mutasyon ve Adaptasyon"
                    ],
                    "4. Ünite: Sesin Dünyası": [
                        "Sesin Oluşumu ve Özellikleri",
                        "Sesin Madde ile Etkileşimi"
                    ],
                    "5. Ünite: Periyodik Tablo ve Maddenin Etkileşimi": [
                        "Periyodik Tablo",
                        "Fiziksel ve Kimyasal Değişimler",
                        "Kimyasal Tepkimeler",
                        "Asitler ve Bazlar"
                    ],
                    "6. Ünite: Elektriğin Yolculuğu": [
                        "Ampullerin Bağlanma Şekli",
                        "Elektrik Enerjisinin Dönüşmesi"
                    ],
                    "7. Ünite: Sürdürülebilir Yaşam ve Madde Döngüleri": [
                        "Enerji Dönüşümleri",
                        "Madde Döngüleri",
                        "Küresel İklim Değişikliği"
                    ]
                },
                "T.C. İnkılap Tarihi ve Atatürkçülük": {
                    "Bir Kahraman Doğuyor": [
                        "Avrupa'daki Gelişmeler ve Osmanlı",
                        "Mustafa Kemal'in Eğitim Hayatı"
                    ],
                    "Milli Uyanış": [
                        "I. Dünya Savaşı ve Osmanlı Devleti",
                        "Cemiyetler ve Kuva-yı Milliye"
                    ],
                    "Ya İstiklal Ya Ölüm": [
                        "Kurtuluş Savaşı Cepheleri",
                        "Mudanya ve Lozan"
                    ]
                },
                "Din Kültürü ve Ahlak Bilgisi": {
                    "Kader İnancı": [
                        "Kader ve Kaza Kapsamı",
                        "İnsanın İradesi ve Kader"
                    ],
                    "Zekat ve Sadaka": [
                        "Zekatın Kimlere Verileceği",
                        "Sadakanın Toplumsal Faydaları"
                    ]
                },
                "İngilizce": {
                    "Friendship": [
                        "Making invitations",
                        "Accepting and refusing"
                    ],
                    "Teen Life": [
                        "Preferences",
                        "Daily routines of teenagers"
                    ],
                    "In the Kitchen": [
                        "Cooking processes",
                        "Describing recipes"
                    ]
                }
            },
            "9. Sınıf": {
                "Türk Dili ve Edebiyatı": {
                    "Giriş": [
                        "Edebiyatın Bilimlerle ve Güzel Sanatlarla İlişkisi",
                        "Metinlerin Sınıflandırılması"
                    ],
                    "Hikâye": [
                        "Hikâye Türünün Özellikleri",
                        "Olay ve Durum Hikâyesi"
                    ],
                    "Şiir": [
                        "Şiirde Biçim ve Ahenk Unsurları",
                        "Şiirde Tema ve Konu"
                    ]
                },
                "Matematik": {
                    "Mantık": [
                        "Önermeler",
                        "Bileşik Önermeler",
                        "Koşullu Önermeler ve İki Yönlü Koşullu Önermeler"
                    ],
                    "Kümeler": [
                        "Kümelerde Temel Kavramlar",
                        "Kümelerde İşlemler",
                        "Kümelerde Problem Çözümü"
                    ],
                    "Denklem ve Eşitsizlikler": [
                        "Sayı Kümeleri",
                        "Bölünebilme Kuralları",
                        "Birinci Dereceden Denklemler"
                    ]
                },
                "Fizik": {
                    "Fizik Bilimine Giriş": [
                        "Fiziğin Alt Dalları",
                        "Temel ve Türetilmiş Büyüklükler"
                    ],
                    "Madde ve Özellikleri": [
                        "Kütle, Hacim, Özkütle",
                        "Dayanıklılık, Adezyon, Kohezyon"
                    ],
                    "Hareket ve Kuvvet": [
                        "Düzgün Doğrusal Hareket",
                        "Newton'ın Hareket Yasaları",
                        "Sürtünme Kuvveti"
                    ]
                },
                "Kimya": {
                    "Kimya Bilimi": [
                        "Simyadan Kimyaya",
                        "Kimyanın Uğraş Alanları",
                        "Kimyasal Maddelerin İşaretleri"
                    ],
                    "Atom ve Periyodik Sistem": [
                        "Atom Modelleri",
                        "Atomun Yapısı",
                        "Periyodik Özelliklerin Değişimi"
                    ],
                    "Kimyasal Türler Arası Etkileşimler": [
                        "İyonik ve Kovalent Bağlar",
                        "Metalik Bağ",
                        "Zayıf Etkileşimler"
                    ]
                },
                "Biyoloji": {
                    "Yaşam Bilimi Biyoloji": [
                        "Canlıların Ortak Özellikleri",
                        "İnorganik ve Organik Bileşikler",
                        "Enzimler ve Vitaminler"
                    ],
                    "Hücre": [
                        "Hücre Teorisi",
                        "Hücre Zarı ve Madde Geçişleri",
                        "Sitoplazma ve Organeller"
                    ]
                },
                "Tarih": {
                    "Tarih ve Zaman": [
                        "Tarih Biliminin Özellikleri",
                        "Zaman ve Takvim"
                    ],
                    "İnsanlığın İlk Dönemleri": [
                        "Tarih Öncesi Çağlar",
                        "İlk Çağ Uygarlıkları"
                    ],
                    "Orta Çağ'da Dünya": [
                        "Orta Çağ'da Siyasi Yapılar",
                        "Tarım ve Ticaret"
                    ]
                },
                "Coğrafya": {
                    "Doğal Sistemler": [
                        "İnsan ve Doğa Etkileşimi",
                        "Dünya'nın Şekli ve Hareketleri",
                        "Harita Bilgisi ve Koordinat Sistemi"
                    ],
                    "İklim Sistemleri": [
                        "Atmosfer ve Sıcaklık",
                        "Basınç ve Rüzgarlar",
                        "Nem ve Yağış"
                    ]
                },
                "İngilizce": {
                    "Studying Abroad": [
                        "Meeting new people",
                        "Introducing family members"
                    ],
                    "My Environment": [
                        "Describing neighborhoods",
                        "Asking for and giving directions"
                    ],
                    "Movies": [
                        "Expressing likes and dislikes",
                        "Talking about movie genres"
                    ]
                }
            },
            "10. Sınıf": {
                "Türk Dili ve Edebiyatı": {
                    "Destan ve Efsane": [
                        "Destan Türü ve Özellikleri",
                        "Dünya ve Türk Destanları"
                    ],
                    "Roman": [
                        "Roman Türünün Tarihsel Gelişimi",
                        "Roman İnceleme Yöntemleri"
                    ],
                    "Tiyatro": [
                        "Geleneksel Türk Tiyatrosu",
                        "Modern Tiyatro"
                    ]
                },
                "Matematik": {
                    "Sayma ve Olasılık": [
                        "Sıralama ve Seçme (Permütasyon-Kombinasyon)",
                        "Binom Açılımı",
                        "Basit Olayların Olasılıkları"
                    ],
                    "Fonksiyonlar": [
                        "Fonksiyon Kavramı ve Gösterimi",
                        "Fonksiyon Grafikleri",
                        "Bileşke ve Ters Fonksiyon"
                    ],
                    "Polinomlar": [
                        "Polinom Kavramı",
                        "Polinomlarda İşlemler",
                        "Polinomlarda Çarpanlara Ayırma"
                    ]
                },
                "Fizik": {
                    "Elektrik ve Manyetizma": [
                        "Elektrik Akımı ve Devreler",
                        "Mıknatıslar ve Manyetik Alan"
                    ],
                    "Basınç ve Kaldırma Kuvveti": [
                        "Katı, Sıvı, Gaz Basıncı",
                        "Arşimet Prensibi"
                    ],
                    "Dalgalar": [
                        "Dalga Kavramı",
                        "Yay, Su, Ses ve Deprem Dalgaları"
                    ]
                },
                "Kimya": {
                    "Kimyanın Temel Kanunları ve Kimyasal Hesaplamalar": [
                        "Kütlenin Korunumu, Sabit ve Katlı Oranlar",
                        "Mol Kavramı",
                        "Kimyasal Tepkime Türleri"
                    ],
                    "Karışımlar": [
                        "Homojen ve Heterojen Karışımlar",
                        "Karışımları Ayırma Teknikleri"
                    ],
                    "Asitler, Bazlar ve Tuzlar": [
                        "Asitlerin ve Bazların Genel Özellikleri",
                        "pH Kavramı",
                        "Tuzların Özellikleri ve Kullanım Alanları"
                    ]
                },
                "Biyoloji": {
                    "Hücre Bölünmeleri": [
                        "Mitoz ve Eşeysiz Üreme",
                        "Mayoz ve Eşeyli Üreme"
                    ],
                    "Kalıtımın Genel İlkeleri": [
                        "Mendel İlkeleri",
                        "Eşbaskınlık, Çok Alellilik",
                        "Cinsiyete Bağlı Kalıtım"
                    ],
                    "Ekosistem Ekolojisi": [
                        "Ekosistemin Canlı ve Cansız Bileşenleri",
                        "Besin Zinciri ve Enerji Akışı"
                    ]
                },
                "Tarih": {
                    "Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi": [
                        "Oğuz Göçleri ve Anadolu",
                        "Anadolu'nun Türkleşmesi",
                        "Haçlı Seferleri"
                    ],
                    "Beylikten Devlete Osmanlı Siyaseti": [
                        "Kayı Boyu ve Osmanlı'nın Kuruluşu",
                        "Balkanlardaki Fetihler ve İskan Siyaseti"
                    ]
                },
                "Coğrafya": {
                    "Dünya'nın Yapısı ve Oluşum Süreci": [
                        "Yerin Katmanları",
                        "Levha Tektoniği",
                        "Jeolojik Zamanlar"
                    ],
                    "Su, Toprak ve Bitki": [
                        "Dünya'daki Su Kaynakları",
                        "Toprak Oluşumu ve Türleri",
                        "Bitki Formasyonları"
                    ]
                },
                "Felsefe": {
                    "Felsefeyi Tanıma": [
                        "Felsefi Düşüncenin Özellikleri",
                        "Felsefenin İnsan ve Toplum Hayatındaki Rolü"
                    ],
                    "Felsefe İle Düşünme": [
                        "Düşünme ve Akıl Yürütme Kavramları",
                        "Doğruluk ve Gerçeklik"
                    ]
                }
            },
            "11. Sınıf": {
                "Türk Dili ve Edebiyatı": {
                    "Şiir": [
                        "Tanzimat Dönemi Şiiri",
                        "Servetifünun ve Fecriati Şiiri",
                        "Milli Edebiyat Dönemi Şiiri"
                    ],
                    "Makale ve Sohbet": [
                        "Bilimsel ve Edebi Makale",
                        "Sohbet ve Fıkra Türleri"
                    ],
                    "Roman": [
                        "Cumhuriyet Dönemi Türk Romanı (1923-1950)",
                        "Dünya Edebiyatında Roman"
                    ]
                },
                "Matematik": {
                    "Trigonometri": [
                        "Yönlü Açılar",
                        "Trigonometrik Fonksiyonlar",
                        "Kosinüs ve Sinüs Teoremleri"
                    ],
                    "Analitik Geometri": [
                        "Noktanın Analitik İncelenmesi",
                        "Doğrunun Analitik İncelenmesi"
                    ],
                    "Fonksiyonlarda Uygulamalar": [
                        "İkinci Dereceden Fonksiyonlar ve Grafikleri (Parabol)",
                        "Eşitsizlik Sistemleri"
                    ]
                },
                "Fizik": {
                    "Kuvvet ve Hareket": [
                        "Vektörler ve Bağıl Hareket",
                        "Newton'ın Hareket Yasaları Uygulamaları",
                        "Atışlar",
                        "Enerji ve Momentum"
                    ],
                    "Elektrik ve Manyetizma": [
                        "Elektriksel Kuvvet ve Elektrik Alan",
                        "Elektriksel Potansiyel",
                        "Sığa ve Kondansatörler",
                        "Manyetik Kuvvet ve İndüksiyon"
                    ]
                },
                "Kimya": {
                    "Modern Atom Teorisi": [
                        "Bohr ve Modern Atom Modeli",
                        "Kuantum Sayıları",
                        "Periyodik Sistem ve Elektron Dizilimleri"
                    ],
                    "Gazlar": [
                        "Gazların Özellikleri ve Gaz Yasaları",
                        "İdeal Gaz Denklemi",
                        "Kısmi Basınç ve Kinetik Teori"
                    ],
                    "Sıvı Çözeltiler ve Çözünürlük": [
                        "Çözücü-Çözünen Etkileşimleri",
                        "Derişim Birimleri",
                        "Koligatif Özellikler"
                    ]
                },
                "Biyoloji": {
                    "İnsan Fizyolojisi 1": [
                        "Sinir Sistemi",
                        "Endokrin Sistem",
                        "Duyu Organları",
                        "Destek ve Hareket Sistemi"
                    ],
                    "İnsan Fizyolojisi 2": [
                        "Sindirim Sistemi",
                        "Dolaşım ve Bağışıklık Sistemi",
                        "Solunum ve Boşaltım Sistemi"
                    ]
                },
                "Tarih": {
                    "Değişen Dünya Dengeleri Karşısında Osmanlı": [
                        "Karlofça Antlaşması ve Sonrası",
                        "18. Yüzyıl Osmanlı-Rus Savaşları"
                    ],
                    "Devrimler Çağında Değişen Devlet-Toplum": [
                        "Fransız İhtilali ve Sanayi İnkılabı",
                        "Osmanlı'da Dağılmayı Önleme Çabaları"
                    ]
                },
                "Coğrafya": {
                    "Biyoçeşitlilik": [
                        "Ekosistemlerin İşleyişi",
                        "Madde Döngüleri"
                    ],
                    "Ülkeler ve Bölgeler": [
                        "Küresel Ortam: Bölgeler ve Ülkeler",
                        "Türkiye'nin Jeopolitik Konumu"
                    ]
                },
                "Felsefe": {
                    "MÖ 6. Yüzyıl - MS 2. Yüzyıl Felsefesi": [
                        "İlk Neden ve Değişim Düşüncesi",
                        "Sokrates ve Platon"
                    ],
                    "MS 2. Yüzyıl - MS 15. Yüzyıl Felsefesi": [
                        "Hristiyan ve İslam Felsefesinin Temel Özellikleri"
                    ]
                }
            },
            "12. Sınıf": {
                "Türk Dili ve Edebiyatı": {
                    "Giriş": [
                        "Edebiyat ile Felsefe İlişkisi",
                        "Edebiyat ile Psikoloji/Psikiyatri İlişkisi"
                    ],
                    "Şiir": [
                        "Cumhuriyet Dönemi'nde Saf Şiir",
                        "Toplumcu Gerçekçi Şiir",
                        "Garip Akımı ve İkinci Yeni"
                    ],
                    "Roman": [
                        "Cumhuriyet Dönemi'nde Bireyin İç Dünyasını Esas Alan Romanlar",
                        "Toplumcu Gerçekçi Romanlar"
                    ]
                },
                "Matematik (İleri)": {
                    "Üstel ve Logaritmik Fonksiyonlar": [
                        "Üstel Fonksiyon",
                        "Logaritma Fonksiyonu ve Özellikleri",
                        "Logaritmik Denklemler"
                    ],
                    "Diziler": [
                        "Gerçek Sayı Dizileri",
                        "Aritmetik ve Geometrik Diziler"
                    ],
                    "Limit ve Süreklilik": [
                        "Limit Kavramı ve Özellikleri",
                        "Süreklilik"
                    ],
                    "Türev": [
                        "Türev Kavramı ve Alma Kuralları",
                        "Türevin Uygulamaları (Maksimum-Minimum, Artan-Azalan)"
                    ],
                    "İntegral": [
                        "Belirsiz İntegral",
                        "Belirli İntegral",
                        "İntegral İle Alan Hesabı"
                    ]
                },
                "Fizik": {
                    "Çembersel Hareket": [
                        "Düzgün Çembersel Hareket",
                        "Dönerek Öteleme Hareketi",
                        "Açısal Momentum",
                        "Kütle Çekim Kuvveti"
                    ],
                    "Basit Harmonik Hareket": [
                        "Yay Sarkacı",
                        "Basit Sarkaç"
                    ],
                    "Dalga Mekaniği": [
                        "Su Dalgalarında Girişim",
                        "Işığın Tek ve Çift Yarıkta Girişimi",
                        "Doppler Olayı"
                    ],
                    "Modern Fizik": [
                        "Özel Görelilik",
                        "Kuantum Fiziğine Giriş",
                        "Fotoelektrik Olayı",
                        "Compton Saçılması"
                    ]
                },
                "Kimya": {
                    "Kimya ve Elektrik": [
                        "İndirgenme-Yükseltgenme (Redoks) Tepkimeleri",
                        "Aktiflik",
                        "Piller ve Elektroliz"
                    ],
                    "Karbon Kimyasına Giriş": [
                        "Anorganik ve Organik Bileşikler",
                        "Karbon Allotropları",
                        "Lewis Formülleri ve Hibritleşme"
                    ],
                    "Organik Bileşikler": [
                        "Hidrokarbonlar (Alkan, Alken, Alkin, Aromatikler)",
                        "Alkoller ve Eterler",
                        "Karbonil Bileşikleri (Aldehit, Keton)"
                    ]
                },
                "Biyoloji": {
                    "Genden Proteine": [
                        "Nükleik Asitlerin Keşfi ve Yapısı",
                        "Genetik Şifre ve Protein Sentezi",
                        "Biyoteknoloji ve Gen Mühendisliği"
                    ],
                    "Canlılarda Enerji Dönüşümleri": [
                        "Canlılık ve Enerji (ATP)",
                        "Fotosentez",
                        "Kemosentez",
                        "Hücresel Solunum (Oksijenli, Oksijensiz)"
                    ],
                    "Bitki Biyolojisi": [
                        "Bitkilerin Yapısı",
                        "Bitkilerde Madde Taşınması",
                        "Bitkilerde Üreme ve Büyüme"
                    ]
                },
                "T.C. İnkılap Tarihi ve Atatürkçülük": {
                    "20. Yüzyıl Başlarında Osmanlı Devleti ve Dünya": [
                        "Trablusgarp ve Balkan Savaşları",
                        "I. Dünya Savaşı"
                    ],
                    "Milli Mücadele": [
                        "Hazırlık Dönemi (Genelgeler ve Kongreler)",
                        "TBMM'nin Açılışı",
                        "Muharebeler ve Lozan Antlaşması"
                    ],
                    "Atatürkçülük ve Türk İnkılabı": [
                        "Atatürk İlkeleri",
                        "Siyasi, Hukuki ve Sosyal Alandaki İnkılaplar"
                    ]
                },
                "Coğrafya": {
                    "Ekstrem Doğa Olayları": [
                        "Klimatolojik ve Jeolojik Ekstrem Olaylar",
                        "Küresel İklim Değişimi"
                    ],
                    "Küresel Ticaret ve Turizm": [
                        "Üretim, Dağıtım, Tüketim Ağları",
                        "Dünya Turizmi ve Türkiye"
                    ]
                },
                "İngilizce": {
                    "Music": [
                        "Describing music genres",
                        "Expressing opinions"
                    ],
                    "Friendship": [
                        "Personal traits",
                        "True friendship"
                    ],
                    "Human Rights": [
                        "Expressing ideas on human rights",
                        "Equality and justice"
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

        function updateMufredatDers() {
            const classVal = document.getElementById('mufredat-class').value;
            const dersSelect = document.getElementById('mufredat-ders');
            const uniteSelect = document.getElementById('mufredat-unite');
            const konuSelect = document.getElementById('mufredat-konu');

            dersSelect.innerHTML = '<option value="">Ders Seçin...</option>';
            uniteSelect.innerHTML = '<option value="">Önce Ders Seçin...</option>';
            konuSelect.innerHTML = '<option value="">Önce Ünite Seçin...</option>';

            dersSelect.disabled = !classVal;
            uniteSelect.disabled = true;
            konuSelect.disabled = true;

            if (classVal) {
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

            uniteSelect.innerHTML = '<option value="">Ünite Seçin...</option>';
            konuSelect.innerHTML = '<option value="">Önce Ünite Seçin...</option>';

            uniteSelect.disabled = !dersVal;
            konuSelect.disabled = true;

            if (dersVal) {
                Object.keys(curriculumData[classVal][dersVal]).forEach(function (u) {
                    uniteSelect.innerHTML += '<option value="' + u + '">' + u + '</option>';
                });
            }
        }

        function updateMufredatKonu() {
            const classVal = document.getElementById('mufredat-class').value;
            const dersVal = document.getElementById('mufredat-ders').value;
            const uniteVal = document.getElementById('mufredat-unite').value;
            const konuSelect = document.getElementById('mufredat-konu');

            konuSelect.innerHTML = '<option value="">Konu Seçin...</option>';
            konuSelect.disabled = !uniteVal;

            if (uniteVal) {
                curriculumData[classVal][dersVal][uniteVal].forEach(function (k) {
                    konuSelect.innerHTML += '<option value="' + k + '">' + k + '</option>';
                });
            }
        }

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

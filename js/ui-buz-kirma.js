// ui-buz-kirma.js — Buz Kırma Etkinlik Modülü
// Proje Tabanlı Ders İşleme | Vanilla JS
// Kaynak: Proje Tabanlı Ders işleme.html satır 3294–3516
// Oluşturulma: 08.11.2026 15:17:13
'use strict';

                // Global değişkende seçili etkinliği tut
                window.selectedIcebreaker = null;

                function markIceBreakerSelected(btn, baslik, sure, aciklama) {
                    // Seçilen etkinliği global değişkene kaydet
                    window.selectedIcebreaker = { baslik, sure, aciklama };

                    // Ekrandaki diğer tüm etkinlik butonlarının stilini sıfırla
                    document.querySelectorAll('#buz-kirma-output .btn').forEach(b => {
                        if (b.getAttribute('data-is-ai') === 'true') {
                            b.innerHTML = '<i class="fas fa-plus"></i> Ders Planına Ekle';
                            b.style.background = 'rgba(139, 92, 246, 0.1)';
                            b.style.color = '#7c3aed';
                        } else {
                            b.innerHTML = '<i class="fas fa-plus"></i> Ders Planına Ekle';
                            b.style.background = 'rgba(56, 189, 248, 0.1)';
                            b.style.color = '#0284c7';
                        }
                    });

                    // Tıklanan butonu 'Seçildi' olarak işaretle ve stilini değiştir
                    btn.innerHTML = '<i class="fas fa-check"></i> Etkinlik Seçildi (Derse Eklenecek)';
                    btn.style.background = btn.getAttribute('data-is-ai') === 'true' ? '#8b5cf6' : '#38bdf8';
                    btn.style.color = 'white';

                    // Tab 4 (Strateji) tarafındaki seçim bilgi panosunu güncelle ve görünür yap
                    const sib = document.getElementById('selected-icebreaker-display');
                    if (sib) {
                        sib.style.display = 'flex';
                        document.getElementById('sib-name').innerText = baslik;
                    }
                }

                function clearIceBreakerSelection() {
                    // Seçimi iptal et ve global değişkeni sıfırla
                    window.selectedIcebreaker = null;

                    // Seçim panosunu gizle
                    const sib = document.getElementById('selected-icebreaker-display');
                    if (sib) sib.style.display = 'none';

                    // Etkinlik butonlarını tekrar varsayılan "Ekle" durumuna getir
                    document.querySelectorAll('#buz-kirma-output .btn').forEach(b => {
                        if (b.getAttribute('data-is-ai') === 'true') {
                            b.innerHTML = '<i class="fas fa-plus"></i> Ders Planına Ekle';
                            b.style.background = 'rgba(139, 92, 246, 0.1)';
                            b.style.color = '#7c3aed';
                        } else {
                            b.innerHTML = '<i class="fas fa-plus"></i> Ders Planına Ekle';
                            b.style.background = 'rgba(56, 189, 248, 0.1)';
                            b.style.color = '#0284c7';
                        }
                    });
                }

                function generateIceBreakers() {
                    // Kullanıcının seçtiği sınıf seviyesini kontrol et
                    const seviye = document.getElementById('buz-kirma-seviye').value;
                    if (!seviye) return alert('Lütfen önce bir sınıf seviyesi seçiniz!');

                    // Çıktı alanını görünür yap ve temizle
                    const output = document.getElementById('buz-kirma-output');
                    output.style.display = 'grid';
                    output.innerHTML = '';

                    // Yerleşik etkinlik veri tabanı
                    const etkinlikler = {
                        sinif_1: [
                            { baslik: 'Duygu Termometresi', sure: '5 dk', aciklama: 'Öğrenciler sınıfa girerken yüz ifadelerini temsil eden renklere isimlerini yapıştırır. Okul korkusunu azaltır.' },
                            { baslik: 'Sessiz Heykel', sure: '5 dk', aciklama: 'Müzik durduğunda tahtadaki hayvana/nesneye dönüşerek donma. Dürtü kontrolünü geliştirir.' },
                            { baslik: 'Görünmez Top', sure: '5 dk', aciklama: 'Ağır, hafif veya yapışkan bir hayali topu birbirine atma. İnce ve kaba motor becerilerini çalıştırır.' },
                            { baslik: 'Görünmez İp', sure: '5 dk', aciklama: 'Halka olup görünmez bir ipi karşılıklı çekme taklidi yapma. Senkronizasyonu öğretir.' }
                        ],
                        sinif_2: [
                            { baslik: 'Duygu Termometresi', sure: '5 dk', aciklama: 'Renkler yerine "heyecanlı, uykulu, mutlu" gibi temel kelimeler kullanılır.' },
                            { baslik: 'Sessiz Heykel', sure: '5 dk', aciklama: 'Kurallara adaptasyon için tekrar edilir.' },
                            { baslik: 'Senkronize Ritim', sure: '5 dk', aciklama: 'Öğretmenin başlattığı alkış/masa vurma ritmini sınıfça aynen kopyalama.' },
                            { baslik: 'Görsel Hikaye Zinciri', sure: '10 dk', aciklama: 'Tahtadaki basit 3 görseli birbirine bağlayarak kısa cümleler kurma.' },
                            { baslik: 'Günün Erdemi Pandomimi', sure: '10 dk', aciklama: '"Yardımlaşma" gibi bir kavramı hiç konuşmadan arkadaşlarına anlatma.' }
                        ],
                        sinif_3: [
                            { baslik: 'Görsel Hikaye Zinciri', sure: '10 dk', aciklama: 'Görseller arası mantık zorlaştırılır (Örn: Dişli çark, bulut, ayakkabı).' },
                            { baslik: 'Canlı Elektrik Devresi', sure: '5 dk', aciklama: 'El ele tutuşup el sıkarak "akımı" iletme. Grup bilincini somutlaştırır.' },
                            { baslik: 'Senkronize Ritim', sure: '5 dk', aciklama: 'Ritimler uzatılır ve hızlandırılır.' },
                            { baslik: 'Kovanın Ritmi', sure: '5 dk', aciklama: 'Tahtadaki 3 komuta göre aynı anda hareket etme. Birlikte hareket etme becerisini artırır.' },
                            { baslik: 'İkili Şifreleme', sure: '5 dk', aciklama: 'Her güne özel bir el sıkışma veya hareket ritmiyle sınıfa girme.' }
                        ],
                        sinif_4: [
                            { baslik: 'Canlı Elektrik Devresi', sure: '5 dk', aciklama: 'Sınıfın akımı iletme hızında kendi rekorunu kırması için süreli oynanır.' },
                            { baslik: 'Kovanın Ritmi', sure: '5 dk', aciklama: 'Dikkat dağıtıcı unsurlar eklenerek odaklanma zorlanır.' },
                            { baslik: 'Ortak Nokta Avı', sure: '10 dk', aciklama: 'Sınıfta rastgele eşleşip 2 dakika içinde tamamen tesadüfi 3 ortak özellik bulma.' },
                            { baslik: 'Zincirleme Kavram Ağı', sure: '10 dk', aciklama: 'Bir kelimeden yola çıkıp herkesin yeni bir kelime ekleyerek ağı büyütmesi.' },
                            { baslik: 'Ses İmzası', sure: '5 dk', aciklama: 'Gözler kapalıyken dinletilen doğa/makine sesinin kaynağını bulma.' }
                        ],
                        sinif_5: [
                            { baslik: 'Ortak Nokta Avı', sure: '10 dk', aciklama: 'Yeni arkadaşlıkları pekiştirmek için tekrar edilir.' },
                            { baslik: 'Parça Bütünü Anlatır (Makro Zoom)', sure: '5 dk', aciklama: 'Çok yakından çekilmiş bir görselin ne olduğunu tahmin etme. Merakı inanılmaz tetikler.' },
                            { baslik: 'Giriş Algoritması (Kapı Görevi)', sure: '5 dk', aciklama: 'Sınıfa girerken tahtadaki "Eğer-Değilse" kuralına uyarak oturma (Örn: Mavi giyenler bir tur dönsün).' },
                            { baslik: 'İki Doğru, Bir Yalan', sure: '10 dk', aciklama: 'Ders öncesi öğretmenin veya öğrencilerin kendileri hakkında tahmin oyunu oynaması.' },
                            { baslik: 'Ses İmzası', sure: '5 dk', aciklama: 'Frekanslar daha karmaşık (iki ses üst üste) verilir.' }
                        ],
                        sinif_6: [
                            { baslik: 'Giriş Algoritması', sure: '5 dk', aciklama: 'Kapıdaki algoritmalar zorlaştırılır.' },
                            { baslik: 'Parça Bütünü Anlatır', sure: '5 dk', aciklama: 'Biyoloji veya teknoloji odaklı detaylarla devam eder.' },
                            { baslik: 'Hatalı İcatlar Atölyesi', sure: '10 dk', aciklama: 'Kırık bir şemsiyeden dünyanın en absürt ama işe yarar icadını uydurma.' },
                            { baslik: 'Günün Şifresi / Gizemi', sure: '5 dk', aciklama: 'Tahtada derse başlamadan çözülmesi gereken anagram veya şifreli metin.' },
                            { baslik: 'Kolektif Sensörler', sure: '5 dk', aciklama: 'Kapalı kutudaki nesneyi ağırlık ve ses ile tahmin etme veri analizi.' },
                            { baslik: 'Petek Mantığı', sure: '10 dk', aciklama: 'Tahtadaki altıgenlere sadece belirli kurala uyan (Örn: asal sayılar) verileri yazarak örüntü kurma.' }
                        ],
                        sinif_7: [
                            { baslik: 'Hatalı İcatlar Atölyesi', sure: '10 dk', aciklama: 'İnovatif düşünceyi desteklemek için argümanlarla savunma eklenerek devam eder.' },
                            { baslik: '"Eğer... Olsaydı" Zihin Haritası', sure: '10 dk', aciklama: '"Yerçekimi yatay çalışsaydı evleri nasıl yapardık?" gibi ıraksak düşünme pratikleri.' },
                            { baslik: 'Algoritma Çözücüler (Unplugged Coding)', sure: '10 dk', aciklama: 'Bir grubun diğer gruba sadece sözlü komutla tahtaya şekil çizdirmesi.' },
                            { baslik: 'Tersine Mühendislik', sure: '10 dk', aciklama: 'Parçalara ayrılmış bir nesnenin nasıl birleştiğini veya bir parça eksilirse ne olacağını tartışma.' },
                            { baslik: 'Yanlışı Bul', sure: '5 dk', aciklama: 'Kasıtlı mantık hataları barındıran metin/görseli dedektif gibi analiz etme.' },
                            { baslik: 'Sistem Çöküşü (Oyun)', sure: '5 dk', aciklama: 'Herkesin iki "sabit nokta" seçip aradaki mesafeyi koruyarak sürekli sınıf içinde hareket etmesi.' }
                        ],
                        sinif_8: [
                            { baslik: 'Beyin Yakan Trivia', sure: '5 dk', aciklama: 'Sınav stresini kırmak için dersle hiç alakası olmayan çok hızlı genel kültür testi.' },
                            { baslik: 'Soru Bombası', sure: '5 dk', aciklama: 'Sınav cevaplama baskısını kırmak için ortaya konan obje hakkında sadece "soru sorma" egzersizi.' },
                            { baslik: '"Eğer... Olsaydı" Zihin Haritası', sure: '10 dk', aciklama: 'Zihinsel esnekliği artırmak için uygulanır.' },
                            { baslik: 'Algoritma Çözücüler', sure: '10 dk', aciklama: 'Takım çalışması için devam eder.' },
                            { baslik: 'Ortak Problem, Tek Çözüm', sure: '10 dk', aciklama: 'Kısıtlı malzemeyle (3 kağıt, 1 kalem) 2 dakikada mini mekanik sorun çözme.' },
                            { baslik: 'Kör Kılavuz', sure: '5 dk', aciklama: 'Stresi azaltmak ve arkadaşa güveni tazelemek için gözü kapalı yönlendirme oyunu.' }
                        ],
                        sinif_9: [
                            { baslik: 'Soru Bombası', sure: '5 dk', aciklama: 'Konuşmaktan çekinen öğrencileri argüman üretmeye cesaretlendirmek için kullanılır.' },
                            { baslik: 'Altı Şapkalı Mikro Tartışma', sure: '5 dk', aciklama: 'Güncel bir konuyu farklı şapkaların (kötümser, iyimser, objektif) bakış açısıyla 5 dakika tartışma.' },
                            { baslik: 'Hatalı İcatlar Atölyesi', sure: '10 dk', aciklama: 'Eski bir anakart veya sensör gibi teknolojik parçalarla geri dönüşüm vizyonu eklenerek oynanır.' },
                            { baslik: 'Eksik Veri Tamamlama', sure: '5 dk', aciklama: 'Yarım kalmış bir denklem veya algoritmayı tamamlama beyin fırtınası.' },
                            { baslik: 'Sınıfın İcadı', sure: '10 dk', aciklama: 'Tahtadaki rastgele 3 çizimin üzerine herkesin ekleme yaparak ortak bir sistem tasarlaması.' }
                        ],
                        sinif_10: [
                            { baslik: 'Kavramsal Açık Artırma (Fikir Pazarı)', sure: '10 dk', aciklama: 'Tahtadaki 5 farklı iddiadan doğru olduğuna inandıklarına sanal puan yatırma.' },
                            { baslik: 'Altı Şapkalı Mikro Tartışma', sure: '5 dk', aciklama: 'Felsefi ve bilimsel meseleler üzerinden devam eder.' },
                            { baslik: 'Kelime Simyası', sure: '10 dk', aciklama: 'Dilde olmayan yeni bir kelime uydurup etimolojisini ve kullanımını oluşturma.' },
                            { baslik: 'Alternatif Tarih', sure: '10 dk', aciklama: '"Dinozorlar tükenmeseydi mimari nasıl olurdu?" gibi tarihsel/bilimsel kırılmaları tartışma.' },
                            { baslik: 'Gelecekten Gelen Obje', sure: '5 dk', aciklama: 'Sıradan bir USB belleğin 3000 yılındaki işlevini kurgulama.' }
                        ],
                        sinif_11: [
                            { baslik: 'Kutu Dışı Bağlantılar (Lateral Thinking)', sure: '10 dk', aciklama: 'Alakasız iki kavram (Termodinamik ve Trafik Sıkışıklığı) arasında mantıksal köprü kurma.' },
                            { baslik: 'Kavramsal Açık Artırma', sure: '10 dk', aciklama: 'İleri düzey akademik mitleri yıkmak için kullanılır.' },
                            { baslik: 'Günün Hipotezi', sure: '5 dk', aciklama: '"Karıncalar dünyayı daha iyi yönetirdi" gibi iddialar etrafında hızlı münazara.' },
                            { baslik: 'Kavram Çorbası', sure: '10 dk', aciklama: 'Alakasız 4 kelimenin anlamlı şekilde geçtiği bilimsel/mantıklı bir paragraf yazma.' },
                            { baslik: 'Kritik Karar İkilemi', sure: '10 dk', aciklama: 'Gemide "doktoru mu çiftçiyi mi" kurtarırdınız gibi ahlaki ve analitik kriz senaryoları.' },
                            { baslik: 'Mars\'ta Yaşam', sure: '10 dk', aciklama: 'Mars\'ta hayatta kalmak için elektrikli olmayan tek bir aleti nasıl modifiye edeceklerini tasarlama.' }
                        ],
                        sinif_12: [
                            { baslik: 'Kutu Dışı Bağlantılar', sure: '10 dk', aciklama: 'YKS stresi altındaki zihni rahatlatıp farklı lobları çalıştırmak için devam eder.' },
                            { baslik: 'Altı Şapkalı Mikro Tartışma', sure: '5 dk', aciklama: 'Hızlı, rasyonel ve veriye dayalı karar alma pratiği.' },
                            { baslik: 'Duygu Grafiği', sure: '5 dk', aciklama: 'Sabah kalkıştan derse kadar olan enerji değişimini X-Y eksenine çizerek veri görselleştirme yapma (Sınav kaygısını dışa vurumu sağlar).' },
                            { baslik: 'Veri Avcısı', sure: '5 dk', aciklama: 'Derse girerken verilen çarpıcı bir küresel istatistiğin kendi yaşamlarıyla bağını tartışma.' },
                            { baslik: 'Zincirleme Reaksiyon (Rube Goldberg)', sure: '10 dk', aciklama: 'Tahtadaki kinetik sistem taslağında eksik aktarım parçasını bularak bütünü görme.' },
                            { baslik: 'Kritik Karar İkilemi', sure: '10 dk', aciklama: 'Stratejik önceliklendirme yeteneğini keskinleştirmek için kullanılır.' }
                        ]
                    };

                    // İlgili sınıfın etkinlik listesini al
                    const secilen = etkinlikler[seviye];
                    if (!secilen) return alert('Seçilen sınıf seviyesi için etkinlik bulunamadı.');

                    // Her bir etkinliği kart olarak ekrana çiz
                    secilen.forEach(etk => {
                        const div = document.createElement('div');
                        div.className = 'group-card';
                        div.style.borderTop = '4px solid #38bdf8';

                        // Olası HTML/JS karakter hatalarını (tırnak, satır sonu) temizle
                        const safeBaslik = (etk.baslik || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/[\r\n]+/g, ' ');
                        const safeSure = (etk.sure || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/[\r\n]+/g, ' ');
                        const safeAciklama = (etk.aciklama || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/[\r\n]+/g, ' ');

                        div.innerHTML = '<h3 style="color: #38bdf8; margin-bottom: 10px; font-size: 16px;"><i class="fas fa-gamepad"></i> ' + etk.baslik + '</h3>' +
                            '<div style="font-size: 12px; color: var(--text-muted); margin-bottom: 15px;"><i class="fas fa-clock"></i> Süre: ' + etk.sure + '</div>' +
                            '<p style="font-size: 13px; line-height: 1.5; color: var(--text-main);">' + etk.aciklama + '</p>' +
                            `<button class="btn" data-is-ai="false" style="width: 100%; margin-top: 15px; padding: 8px; font-size: 12px; background: rgba(56, 189, 248, 0.1); color: #0284c7; border: 1px solid #38bdf8;" onclick="markIceBreakerSelected(this, '${safeBaslik}', '${safeSure}', '${safeAciklama}')"><i class="fas fa-plus"></i> Ders Planına Ekle</button>`;
                        output.appendChild(div);
                    });
                }

                async function generateIceBreakersAI() {
                    // Sınıf seviyesi seçilmemişse işlemi durdur
                    const seviye = document.getElementById('buz-kirma-seviye').value;
                    if (!seviye) return alert('Lütfen önce bir sınıf seviyesi seçiniz!');

                    // Yapay zeka için prompt (komut) hazırlığı
                    const prompt = `Sen yetenekli bir eğitmensin. ${seviye.replace('_', '. ')} seviyesindeki öğrenciler için derse odaklanmalarını ve streslerini atmalarını sağlayacak 3 farklı, yaratıcı, kısa ve uygulanabilir "Buz Kırma (Icebreaker)" etkinliği üret.

Lütfen çıktıyı okunaklı, samimi ve ilham verici bir metin (markdown) olarak sun. Her bir etkinlik için:
- **Etkinlik Adı:** ...
- **Süre:** ...
- **Tür:** (Hareketli / Odaklanma / Sosyal vb.)
- **Açıklama & Uygulama:** ... 
şeklinde başlıklandırma yap.`;

                    // Yükleniyor durumunu göster ve yönlendir
                    const output = document.getElementById('buz-kirma-output');
                    output.style.display = 'block';

                    window.currentGeminiPrompt = prompt;
                    try {
                        const fallbackCopy = (text) => {
                            const ta = document.createElement('textarea');
                            ta.value = text;
                            document.body.appendChild(ta);
                            ta.select();
                            document.execCommand('copy');
                            document.body.removeChild(ta);
                        };
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(prompt).catch(() => fallbackCopy(prompt));
                        } else {
                            fallbackCopy(prompt);
                        }

                        output.innerHTML = `<div style="text-align:center;padding:20px;color:#8b5cf6;"><i class="fas fa-check-circle fa-2x" style="margin-bottom:10px;"></i><p>Buz Kırma etkinlik promptu panoya kopyalandı! Lütfen açılan Gemini sekmesine yapıştırıp çalıştırın.</p></div>`;
                        window.open("https://gemini.google.com/app", "_blank");
                    } catch (e) {
                        alert("Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın:\n\n" + prompt);
                    }
                }
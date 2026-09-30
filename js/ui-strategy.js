// ============================================================
// ui-strategy.js
// AI Ders Stratejisi üretimi
// ============================================================

        function suggestAIStrategy() {
            const mode = document.querySelector('input[name="input-mode"]:checked').value;
            let classInput, nameInput, uniteInput, topicInput;
            if (mode === 'mufredat') {
                classInput = document.getElementById('mufredat-class').value || 'Belirtilmedi';
                nameInput = document.getElementById('mufredat-ders').value || 'Belirtilmedi';
                uniteInput = document.getElementById('mufredat-unite').value || 'Belirtilmedi';
                topicInput = document.getElementById('mufredat-konu').value || 'Genel Konu';
            } else {
                classInput = document.getElementById('free-class').value.trim() || 'Tüm Sınıflar';
                nameInput = document.getElementById('free-name').value.trim() || 'Genel Ders';
                uniteInput = document.getElementById('free-unite').value.trim() || 'Genel Ünite';
                topicInput = document.getElementById('free-topic').value.trim() || 'Genel Konu';
            }

            const useKolb = document.getElementById('strat-kolb').checked;
            const useVygotsky = document.getElementById('strat-vygotsky').checked;
            const useBloom = document.getElementById('strat-bloom').checked;
            const useAnaliz = document.getElementById('strat-analiz').checked;
            const useUDL = document.getElementById('strat-udl') && document.getElementById('strat-udl').checked;
            const useFlipped = document.getElementById('strat-flipped') && document.getElementById('strat-flipped').checked;
            const sureVal = parseInt(document.getElementById('ders-suresi') ? document.getElementById('ders-suresi').value : 40) || 40;

            // Sınıfın VAK dağılımını hesapla
            const classStudents = studentData.filter(s => classInput === 'Tüm Sınıflar' || s.sinif === classInput);
            const totalStudents = classStudents.length || 1;
            const vakCounts = { 'Görsel': 0, 'İşitsel': 0, 'Kinestetik': 0, 'Belirtilmedi': 0 };
            classStudents.forEach(s => {
                if (s.vak && vakCounts[s.vak] !== undefined) vakCounts[s.vak]++;
                else vakCounts['Belirtilmedi']++;
            });
            let vPerc = Math.round((vakCounts['Görsel'] / totalStudents) * 100);
            let aPerc = Math.round((vakCounts['İşitsel'] / totalStudents) * 100);
            let kPerc = Math.round((vakCounts['Kinestetik'] / totalStudents) * 100);

            if (vPerc === 0 && aPerc === 0 && kPerc === 0) {
                vPerc = 33;
                aPerc = 33;
                kPerc = 34;
            }

            const outputDiv = document.getElementById('ai-strategy-output');
            outputDiv.innerHTML = `<div style="text-align:center;padding:30px;color:var(--secondary);"><i class="fas fa-search fa-spin fa-3x" style="margin-bottom:15px;"></i><h4 style="margin:0 0 5px 0;">Stratejiler Sentezleniyor...</h4><p style="font-weight:500;font-size:13px;color:var(--text-muted);">"<em>${topicInput}</em>" konusu eğitim kuramlarına entegre ediliyor...</p></div>`;
            outputDiv.style.display = 'block';

            setTimeout(async () => {
                const lowerTopic = topicInput.toLocaleLowerCase('tr-TR');

                // ── Zaman dağılımı ──
                let t1, t2, t3, t4;
                if (sureVal <= 40) { t1 = 5; t4 = 5; t2 = Math.floor((sureVal - t1 - t4) * 0.5); t3 = sureVal - t1 - t2 - t4; }
                else { t1 = 10; t4 = 10; t2 = Math.floor((sureVal - t1 - t4) * 0.5); t3 = sureVal - t1 - t2 - t4; }

                // ── Analiz aracı ──
                let analizAraci = { isim: 'SCAMPER Tekniği', ikon: 'fa-lightbulb', aciklama: `Öğrencilerden "${topicInput}" konusundaki bir fikri S(Yerine Koy), C(Birleştir), M(Değiştir) adımlarıyla yeni bir ürüne dönüştürmelerini isteyin.` };
                if (lowerTopic.includes('tarih') || lowerTopic.includes('coğrafya') || lowerTopic.includes('fen') || lowerTopic.includes('iklim') || lowerTopic.includes('savaş'))
                    analizAraci = { isim: 'Balık Kılçığı (Ishikawa) Diyagramı', ikon: 'fa-fish', aciklama: `Tahtaya bir balık iskeleti çizin. Baş kısmına "${topicInput}" ile ilgili ana problemi yazın ve öğrencilerin alt nedenleri kılçıklara yerleştirmesini sağlayın.` };
                else if (lowerTopic.includes('matematik') || lowerTopic.includes('kodlama') || lowerTopic.includes('fizik'))
                    analizAraci = { isim: 'Bilişsel İskele Kurma (Scaffolding)', ikon: 'fa-layer-group', aciklama: `Doğrudan formülü vermek yerine eksik bir şablon sunun. Öğrenciler ustalaştıkça bu desteği kademeli geri çekin.` };

                // ── Aktif stratejiler ──
                let activeStrats = '5E Modeli';
                if (useKolb) activeStrats += ', Kolb';
                if (useVygotsky) activeStrats += ', Vygotsky';
                if (useBloom) activeStrats += ', Bloom';
                if (useAnaliz) activeStrats += ', ' + analizAraci.isim.split(' ')[0];
                if (useUDL) activeStrats += ', UDL';
                if (useFlipped) activeStrats += ', Flipped Classroom';

                // ── Web 2.0 ──
                const w2 = getWeb2Tools(nameInput, topicInput);

                // ── HTML blokları ──
                const kolbHtml = useKolb
                    ? `<li><strong>Kolb İstasyonları Rotasyonu:</strong> Sınıfı 4 istasyona ayırın:
                    <ul style="padding-left:15px;margin-top:5px;color:var(--text-muted);font-size:12px;">
                        <li><em>Görsel/İşitsel:</em> "${topicInput}" ile ilgili infografik veya kısa video.</li>
                        <li><em>Teorik/Analitik:</em> Akademik okuma ve veri analizi.</li>
                        <li><em>Mantıksal/Uygulama:</em> Algoritma veya problem çözme.</li>
                        <li><em>Kinestetik:</em> 3D model veya drama tasarımı.</li>
                    </ul></li>`
                    : `<li><strong>Aktif Araştırma:</strong> "${topicInput}" konusunda kaynak taraması ve okuma.</li>`;

                const vygotskyHtml = useVygotsky
                    ? `<li><strong>Akran Mentorluğu:</strong> Kümelerdeki "Proje Koordinatörü" ve "Halkla İlişkiler" öğrencilere liderlik vererek Düşün-Eşleş-Paylaş tekniğini uygulayın.</li>` : '';

                const bloomHtml = useBloom
                    ? `<li><strong>Bloom (Sentez/Oluşturma):</strong> "${topicInput}" problemi için somut, gerçek hayat simülasyonu içeren bir çözüm üretmelerini isteyin.</li>`
                    : `<li><strong>Otantik Görev:</strong> "${topicInput}" konusunda günlük hayattan bir probleme çözüm üretilsin.</li>`;

                const analizHtml = useAnaliz
                    ? `<li><strong><i class="fas ${analizAraci.ikon}" style="color:var(--accent);"></i> ${analizAraci.isim}</strong><br><span style="font-size:12px;color:var(--text-muted);">${analizAraci.aciklama}</span></li>` : '';

                const udlHtml = useUDL ? `
                <div style="background:var(--card-bg);border-left:4px solid #10b981;padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                    <h5 style="margin:0 0 10px 0;color:#10b981;font-size:14px;"><i class="fas fa-users me-2"></i> Farklılaştırılmış Öğretim (UDL)</h5>
                    <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                        <li><strong>🧩 Destek İhtiyacı Olan Öğrenciler:</strong> Görsel infografikler, adım adım basitleştirilmiş talimatlar ve anahtar sözcük kartları sunun. Karmaşık adımları 2-3 aşamaya bölün.</li>
                        <li><strong>🚀 İleri Düzey Öğrenciler:</strong> "${topicInput}" konusunda açık uçlu bir tasarım görevi verin. Küme içinde "Uzman Elçi" rolü alarak diğer kümelerle bilgi paylaşımı yapsınlar.</li>
                    </ul>
                </div>` : '';

                const exitTickets = getExitTickets(topicInput, nameInput);
                const exitHtml = `
                <li><strong>Çıkış Bileti 1:</strong> ${exitTickets[0]}</li>
                <li><strong>Çıkış Bileti 2:</strong> ${exitTickets[1]}</li>`;

                const ozet = getKonuOzeti(topicInput, nameInput, uniteInput);

                const flippedHtml = useFlipped ? `
                <div style="background:var(--card-bg);border-left:4px solid var(--accent);padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                    <h5 style="margin:0 0 10px 0;color:var(--accent);font-size:14px;"><i class="fas fa-home me-2"></i> Ters Yüz Sınıf (Flipped Classroom) — Okul Dışı Uzantı</h5>
                    <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                        <li><strong>Ön Hazırlık (Ders Öncesi):</strong> Öğrenciler bir sonraki derse gelmeden önce "${topicInput}" ile ilgili 5-10 dk'lık bir video izlesin veya kısa okuma tamamlasın.</li>
                        <li><strong>Proje Devamlılığı (Ders Sonrası):</strong> Bugün başlanan projeyi evde belirli bir adıma kadar tamamlayıp bir sonraki derse getirsinler. Dijital portföy kaydı tutulabilir.</li>
                        <li><strong>Paylaşım Platformu:</strong> <a href="${w2.link}" target="_blank" style="color:var(--secondary);">${w2.araçlar}</a> üzerinde çalışmalarını sınıf kanalına yüklesinler.</li>
                    </ul>
                </div>` : '';

                // ── Gemini Prompt İnşası ──
                let promptText = `Sen deneyimli bir K-12 müfredat uzmanı ve uzman bir pedagogsun.
Lütfen aşağıdaki parametrelere ve seçilen eğitim modellerine göre son derece profesyonel, detaylı ve uygulanabilir bir ders planı ve strateji dokümanı oluştur.

DERS BİLGİLERİ:
- Sınıf Seviyesi: ${classInput}
- Ders Adı: ${nameInput}
- Ünite Adı: ${uniteInput}
- Konu Başlığı: ${topicInput}
- Toplam Ders Süresi: ${sureVal} dakika

SINIF PROFİLİ (ÖĞRENME STİLLERİ):
- Bu sınıfın Öğrenme Stilleri Dağılımı: %${vPerc} Görsel, %${aPerc} İşitsel, %${kPerc} Kinestetik.
- Lütfen etkinlikleri tasarlarken, bu ağırlıklara sahip öğrencilerin en iyi öğrenebileceği araçları, süreleri ve görevleri dikkate alarak ders sürecine entegre et.
${window.selectedIcebreaker ? `
SEÇİLEN BUZ KIRMA ETKİNLİĞİ:
- Etkinlik Adı: ${window.selectedIcebreaker.baslik}
- Süresi: ${window.selectedIcebreaker.sure}
- Detayı: ${window.selectedIcebreaker.aciklama}
- Lütfen derse tam olarak bu etkinlikle (Giriş/Engage aşamasında veya öncesinde) başla ve dersin geri kalanına mantıksal bir köprü kur.
` : ''}

UYGULANACAK EĞİTİM MODELLERİ VE AŞAMALARI:
1. 5E Öğrenme Modeli (Giriş/Engage: ${t1} dk, Keşfetme/Explore: ${t2} dk, Açıklama/Explain: ${t2} dk, Derinleştirme/Elaborate: ${t3} dk, Değerlendirme/Evaluate: ${t4} dk aşamalarını detaylandır).
`;

                if (useKolb) {
                    promptText += `2. Kolb Deneyimsel Öğrenme İstasyonları (Görsel/İşitsel, Teorik/Analitik, Mantıksal/Uygulama ve Kinestetik/Gözlemsel istasyonlardaki aktiviteleri açıkla).\n`;
                }
                if (useVygotsky) {
                    promptText += `3. Vygotsky Sosyo-Kültürel Gelişim (Akran mentorluğu grupları, işbirliği rolleri ve Yakınsal Gelişim Alanı - ZPD destek mekanizmalarını ders içi tasarıma entegre et).\n`;
                }
                if (useBloom) {
                    promptText += `4. Bloom Taksonomisi (Dersin hedeflerini Bilme düzeyinden başlayarak Sentez/Oluşturma ve Değerlendirme düzeylerine kadar taşı, öğrencileri özgün üretime teşvik et).\n`;
                }
                if (useAnaliz) {
                    promptText += `5. Analiz Aracı (${analizAraci.isim} tekniğini ders sürecine dahil et: ${analizAraci.aciklama})\n`;
                }
                if (useUDL) {
                    promptText += `6. Evrensel Tasarım İlkeleri - UDL (Farklılaştırılmış öğretim kapsamında: Destek ihtiyacı olan öğrenciler için görsel/basitleştirilmiş materyal önerileri ve ileri seviye öğrenciler için derinleşme görevleri belirle).\n`;
                }
                if (useFlipped) {
                    promptText += `7. Ters Yüz Sınıf - Flipped Classroom (Ders öncesi öğrencilerin evde yapacağı ön hazırlığı ve ders sonrası dijital araçlarla yapılacak proje devamlılığı ödevlerini tasarla).\n`;
                }

                // A5 KAZANIM LİSTESİ VE DERS NOTU PROMPTU
                promptText += `
📄 ÖĞRENCİ ÇIKTISI (A5 DOKÜMANI FORMATI)
(Aşağıdaki bölümü öğretmenin doğrudan Google Dokümanlar'a kopyalayıp A5 çıktısı alabileceği şekilde, tam olarak şu yapıda üret:)

(Lütfen aşağıdaki bölümü kopyalayarak Google Dokümanlar üzerinden ikiye bölüp A5 boyutunda öğrencilerin masalarına bırakınız.)

--- LÜTFEN BU ÇİZGİDEN KESİNİZ VEYA SAYFAYI İKİYE BÖLÜNÜZ ---

(YAPAY ZEKA İÇİN ÖZEL TALİMAT: Buradan sonrasını bir önceki bölümün ardışık devamı gibi değil, öğrencilere verilecek yeni bir sayfa başı veya kağıdın arka yüzü formatında, tamamen ayrı ve bağımsız bir blok olarak üret. Mutlaka aşağıdaki başlıkları ve boşluk doldurma alanlarını aynen kullanarak başla:)

ÖĞRENCİ ÇALIŞMA VE KAZANIM DOKÜMANI
Ders / Ünite: ${nameInput} - ${topicInput}
Adı Soyadı: .....................................................   Sınıfı / No: ${classInput}/....... / ........   Tarih: ....../....../........

I) GEREKLİ ÖN BİLGİLER:
(Bu bölümde öğrencinin ilgili konuyu kavrayabilmesi için önceden hatırlaması gereken temel kavramları sınıf seviyesine ve MEB müfredatına uygun, sade bir dille yine tiklerle belirtilmiş olacak şekilde listele. Her cümlenin başına [ ] şeklinde tik atma boşluğu koy.)

II) A5 KAZANIM KONTROLÜ VE EV ÖDEVİM:
(Buraya konunun en temel 5 kazanımını öğrenci ağzından yaz. Bu maddeler kesinlikle seçilen "${classInput}" sınıf seviyesine ve yaş grubuna pedagojik olarak uygun olmalıdır. Karmaşık akademik dil yerine, bu sınıf seviyesindeki bir öğrencinin kendi kendine sorabileceği netlikte olmalıdır. Her cümlenin başına [ ] şeklinde tik atma boşluğu koy.)

ÖNEMLİ NOT: Lütfen yukarıdaki maddeleri samimi olarak işaretle. Tikleyemediğin [ ] boşluklar, bu akşamki "Ev Ödevin" ve araştırma konundur!

B) DERS SIRASINDA ÖĞRENDİKLERİM:
(Öğrencinin not alabilmesi için burada en az 10-15 satırlık çok geniş bir boşluk veya alt tireler bırak.)

C) DERSTEKİ SORULARIM:
(Öğrencinin sorularını yazabilmesi için burada en az 10-15 satırlık çok geniş bir boşluk veya alt tireler bırak.)
`;

                promptText += `
DİJİTAL ARAÇ ENTEGRASYONU:
- Önerilen Web 2.0 / Dijital Araçlar: ${w2.araçlar}
- Bu aracın ders sürecinde nasıl aktif ve işbirlikli kullanılacağını açıklayan senaryo: ${w2.aciklama}

DEĞERLENDİRME & ÇIKIŞ BİLETLERİ:
- Dersin sonunda öğrencilere uygulanacak çıkış biletleri:
  - Çıkış Bileti 1: ${exitTickets[0]}
  - Çıkış Bileti 2: ${exitTickets[1]}

ÇIKTI DİLİ VE FORMATI:
- Çıktıyı tamamen Türkçe Google döküman olarak oluştur. 

- Konuyu okul - sınıf seviyesine uygun, sade ama pedagojik derinliği olan bir dille ele al.

- Okunaklı başlıklar, listeler ve tablolar kullanarak sun.`;

                window.currentGeminiPrompt = promptText;

                let apiHtml = `
                <!-- Gemini AI Entegrasyon Paneli (API Anahtarsız) -->
                <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08)); border: 2px dashed var(--secondary); border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: var(--shadow); display: flex; justify-content: space-between; align-items: center; gap: 15px; flex-wrap: wrap; animation: fadeIn 0.5s ease-in-out;">
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="margin: 0 0 6px 0; color: var(--secondary); font-size: 15px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-brain"></i> Gemini Yapay Zeka Entegrasyonu (Doğrudan Yönlendirme)
                        </h4>
                        <p style="margin: 0; font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
                            Aşağıdaki yerel şablon ders planını, <strong>Google Gemini Yapay Zekası</strong> ile genişletmek ve özelleştirmek ister misiniz? 
                            Sizin için zengin bir pedagojik prompt hazırlandı. Tek tıkla kopyalayıp Gemini web arayüzünde doğrudan çalıştırabilirsiniz.
                        </p>
                    </div>
                    <button class="btn btn-purple" onclick="copyPromptAndOpenGemini(this)" style="padding: 12px 22px; font-size: 13.5px; font-weight: 700; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; border-radius: 8px;">
                        <i class="fas fa-copy"></i> Kopyala ve Gemini'a Git
                    </button>
                </div>`;

                const html = `
                ${apiHtml}
                <div style="border-bottom:2px solid var(--border);padding-bottom:15px;margin-bottom:20px;">
                    <h4 style="color:var(--primary);margin:0 0 5px 0;font-size:18px;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-robot" style="color:var(--secondary);"></i> Bütüncül &amp; Otantik Ders İşleme Planı
                    </h4>
                    <p style="margin:0;color:var(--text-muted);font-size:13px;">
                        <strong>Sınıf:</strong> ${classInput} | <strong>Ders:</strong> ${nameInput}<br>
                        <strong>Ünite:</strong> ${uniteInput} | <strong>Konu:</strong> ${topicInput}<br>
                        <span style="font-size:11px;opacity:0.8;color:var(--accent);"><i class="fas fa-layer-group"></i> Aktif Kuramlar: ${activeStrats}</span>
                    </p>
                    <!-- Zaman Çizelgesi -->
                    <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
                        <span style="background:var(--yellow);color:#000;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">⚡ Uyanış: ${t1} dk</span>
                        <span style="background:var(--secondary);color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">🔍 Keşif: ${t2} dk</span>
                        <span style="background:var(--accent);color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">⚙️ Otantik Görev: ${t3} dk</span>
                        <span style="background:#8b5cf6;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">🤲 Kapanış: ${t4} dk</span>
                        <span style="background:var(--input-bg);color:var(--text-muted);padding:4px 10px;border-radius:20px;font-size:11px;border:1px solid var(--border);">Toplam: ${sureVal} dk</span>
                    </div>
                    <!-- Web 2.0 Öneri -->
                    <div style="margin-top:10px;background:var(--input-bg);border-radius:8px;padding:10px 14px;border:1px solid var(--border);font-size:12px;">
                        <i class="fas fa-laptop-code" style="color:var(--secondary);"></i>
                        <strong style="color:var(--secondary);">Önerilen Dijital Araçlar:</strong>
                        <a href="${w2.link}" target="_blank" style="color:var(--accent);font-weight:700;margin-left:4px;">${w2.araçlar}</a>
                        <span style="color:var(--text-muted);margin-left:6px;">— ${w2.aciklama}</span>
                    </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:15px;">
                    <div style="background:var(--card-bg);border-left:4px solid var(--yellow);padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                        <h5 style="margin:0 0 10px 0;color:var(--yellow);font-size:14px;"><i class="fas fa-bolt me-2"></i> 1. Aşama: Uyanış &amp; Genel Keşif — <em style="font-weight:400;">${t1} dakika</em> (5E: Engage)</h5>
                        <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                            <li><strong>EGO'dan ECO'ya (Bağlamsal Kanca):</strong> Derse "<em>${topicInput}</em>" tanımını vererek başlamayın. Öğrencilere gerçek dünyadan beklenmedik bir anomali sunun ve "Bu durumda ne olurdu?" sorusunu yöneltin.</li>
                            <li><strong>Sokratik İrdeleme:</strong> Açık uçlu sorularla öğrencilerin problemi kişisel bir mesele olarak hissetmelerini sağlayın.</li>
                        </ul>
                    </div>

                    <div style="background:var(--card-bg);border-left:4px solid var(--secondary);padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                        <h5 style="margin:0 0 10px 0;color:var(--secondary);font-size:14px;"><i class="fas fa-project-diagram me-2"></i> 2. Aşama: Süreç Eğitimi &amp; Derinleşme — <em style="font-weight:400;">${t2} dakika</em> (5E: Explore &amp; Explain)</h5>
                        <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                            ${kolbHtml}
                            ${vygotskyHtml}
                        </ul>
                    </div>

                    <div style="background:var(--card-bg);border-left:4px solid var(--accent);padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                        <h5 style="margin:0 0 10px 0;color:var(--accent);font-size:14px;"><i class="fas fa-cogs me-2"></i> 3. Aşama: Otantik Görev &amp; Oluşturma — <em style="font-weight:400;">${t3} dakika</em> (5E: Elaborate)</h5>
                        <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                            ${bloomHtml}
                            ${analizHtml}
                            <li><strong>Hata Odaklı Gelişim (İterasyon):</strong> Süreçteki hataları cezalandırmayın; tahtaya yansıtarak sınıfça "Debug" yapın.</li>
                        </ul>
                    </div>

                    ${udlHtml}

                    <div style="background:var(--card-bg);border-left:4px solid #8b5cf6;padding:15px;border-radius:8px;border:1px solid var(--border);border-left-width:4px;">
                        <h5 style="margin:0 0 10px 0;color:#8b5cf6;font-size:14px;"><i class="fas fa-hands-helping me-2"></i> 4. Aşama: Refleksif Kapanış &amp; Çıkış Biletleri — <em style="font-weight:400;">${t4} dakika</em> (5E: Evaluate)</h5>
                        <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-main);line-height:1.6;">
                            <li><strong>Üstbilişsel Yansıma:</strong> "Ürettiğimiz bu çözüm topluma nasıl faydalı olabilir?" sorusunu sınıfça tartışın.</li>
                            ${exitHtml}
                        </ul>
                    </div>

                    ${flippedHtml}
                </div>

                <!-- Konu Özeti -->
                <div id="konu-ozeti-blok" style="background:linear-gradient(135deg,var(--card-bg),var(--input-bg));border:1px solid var(--border);border-top:3px solid var(--secondary);border-radius:10px;padding:18px;margin-top:5px;">
                    <h5 style="margin:0 0 12px 0;color:var(--secondary);font-size:14px;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-scroll"></i> 📋 Ders Konu Özeti — <em style="font-weight:400;font-size:13px;">${topicInput} / ${nameInput}</em>
                    </h5>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;font-size:12px;">
                        <div style="background:var(--card-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                            <div style="font-weight:700;color:var(--primary);margin-bottom:6px;"><i class="fas fa-key" style="color:var(--secondary);margin-right:4px;"></i>Temel Kavramlar</div>
                            <ul style="margin:0;padding-left:16px;color:var(--text-main);line-height:1.7;">
                                <li><em>${topicInput}</em> — ana kavram</li>
                                ${ozet.kavramlar.map(k => `<li>${k}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="background:var(--card-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                            <div style="font-weight:700;color:var(--primary);margin-bottom:6px;"><i class="fas fa-star" style="color:var(--yellow);margin-right:4px;"></i>Kazanılan Beceriler</div>
                            <ul style="margin:0;padding-left:16px;color:var(--text-main);line-height:1.7;">
                                ${ozet.beceriler.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="background:var(--card-bg);border-radius:8px;padding:12px;border:1px solid var(--border);">
                            <div style="font-weight:700;color:var(--primary);margin-bottom:6px;"><i class="fas fa-link" style="color:var(--accent);margin-right:4px;"></i>Günlük Hayat Bağlantısı</div>
                            <p style="margin:0;color:var(--text-muted);line-height:1.6;">${ozet.gunlukBag}</p>
                            <div style="margin-top:8px;padding-top:8px;border-top:1px dashed var(--border);font-size:11px;color:var(--text-muted);">
                                <strong>Ünite:</strong> ${uniteInput} &nbsp;|&nbsp; <strong>Sınıf:</strong> ${classInput}
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;">
                    <button class="btn btn-clear" style="font-size:12px;padding:8px 15px;" onclick="document.getElementById('ai-strategy-output').style.display='none';"><i class="fas fa-times me-1"></i> Paneli Kapat</button>
                    <button class="btn btn-purple" style="font-size:12px;padding:8px 15px;" onclick="suggestAIStrategy()"><i class="fas fa-sync-alt me-1"></i> Planı Yeniden Üret</button>
                </div>`;
                outputDiv.innerHTML = html;
            }, 1500);
        }

        function copyPromptAndOpenGemini(btn) {
            if (!window.currentGeminiPrompt) {
                alert("Önce bir ders planı oluşturmalısınız.");
                return;
            }
            const origText = btn.innerHTML;
            
            const fallbackCopy = (text) => {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            };

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(window.currentGeminiPrompt).catch(() => fallbackCopy(window.currentGeminiPrompt));
                } else {
                    fallbackCopy(window.currentGeminiPrompt);
                }
                
                btn.innerHTML = `<i class="fas fa-check-circle"></i> Prompt Kopyalandı!`;
                btn.style.background = 'var(--accent)';

                setTimeout(() => {
                    btn.innerHTML = `<i class="fas fa-external-link-alt"></i> Yönlendiriliyor...`;
                    window.open("https://gemini.google.com/app", "_blank");
                }, 800);

                setTimeout(() => {
                    btn.innerHTML = origText;
                    btn.style.background = '';
                }, 3000);
            } catch (err) {
                console.error("Kopyalama hatası:", err);
                alert("Otomatik kopyalama başarısız oldu. Lütfen şu prompt metnini manuel olarak kopyalayın:\n\n" + window.currentGeminiPrompt);
            }
        }

        // Diğer Tüm Javascript Fonksiyonları Aynen Korunmuştur
        function toggleStudentListUI(className) {
            const list = document.getElementById(`student-list-${className}`);
            list.style.display = list.style.display === 'none' ? 'block' : 'none';
        }

        function toggleStudentCheckboxDirectly(id) {
            const cb = document.getElementById(id);
            if (cb) cb.checked = !cb.checked;
        }

        function toggleClassAllStudents(className, isChecked) {
            const checkboxes = document.querySelectorAll(`.track-student-checkbox[data-class="${className}"]`);
            checkboxes.forEach(cb => cb.checked = isChecked);
            if (isChecked) {
                document.getElementById(`student-list-${className}`).style.display = 'block';
            }
        }

        function selectAllInClass(className) {
            const checkboxes = document.querySelectorAll(`.track-student-checkbox[data-class="${className}"]`);
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            checkboxes.forEach(cb => cb.checked = !allChecked);
        }

        function toggleSelectAll(source) { document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = source.checked); }

        function deleteSelectedStudents() {
            const checked = Array.from(document.querySelectorAll('.row-checkbox:checked'));
            if (checked.length === 0) return alert('Lütfen silmek istediğiniz öğrencileri seçin.');
            if (!confirm(`Seçili ${checked.length} öğrenci silinecek. Emin misiniz?`)) return;
            const indicesToDelete = new Set(checked.map(cb => parseInt(cb.dataset.index)));
            studentData = studentData.filter((_, i) => !indicesToDelete.has(i));
            document.getElementById('select-all').checked = false;
            renderStudentTable();
            saveData();
        }

        function sortTable(column) {
            if (currentSort.column === column) currentSort.asc = !currentSort.asc; else { currentSort.column = column; currentSort.asc = true; }
            studentData.sort((a, b) => {
                let valA = a[column] || ''; let valB = b[column] || '';
                if (!isNaN(valA) && !isNaN(valB) && valA !== '' && valB !== '') { valA = Number(valA); valB = Number(valB); }
                else if (column === 'xp' || column === 'artmayanNot') { valA = Number(valA) || 0; valB = Number(valB) || 0; }
                else { valA = valA.toString().toLocaleLowerCase('tr-TR'); valB = valB.toString().toLocaleLowerCase('tr-TR'); }
                if (valA < valB) return currentSort.asc ? -1 : 1; if (valA > valB) return currentSort.asc ? 1 : -1; return 0;
            });
            searchStudents();
        }

        function clearForm() { document.getElementById('sira-no').value = ''; document.getElementById('okul-no').value = ''; document.getElementById('ad-soyad').value = ''; document.getElementById('sinif').value = ''; document.getElementById('xp-input').value = '0'; document.getElementById('ilgi-alani-input').value = ''; document.getElementById('edit-index').value = '-1'; }
        function saveStudent() {
            const sira = document.getElementById('sira-no').value;
            const no = document.getElementById('okul-no').value;
            const adSoyad = document.getElementById('ad-soyad').value;
            const sinif = document.getElementById('sinif').value;
            const xp = parseInt(document.getElementById('xp-input').value) || 0;
            const ilgi_alanlari = [document.getElementById('ilgi-alani-input').value].filter(Boolean);
            const editIndex = parseInt(document.getElementById('edit-index').value);

            if (!adSoyad || !no) return alert("Okul No ve Ad Soyad zorunludur.");

            if (editIndex >= 0) {
                // 🔑 Mevcut öğrencinin tüm verilerini koru (xpLogs, gozlemler, artmayanNot, vak vb.)
                // Sadece düzenlenen alanları güncelle
                studentData[editIndex] = {
                    ...studentData[editIndex],  // eski veriler korunur
                    sira, no, adSoyad, sinif, xp, ilgi_alanlari
                };
            } else {
                studentData.push({ sira, no, adSoyad, sinif, xp, ilgi_alanlari });
            }

            clearForm(); renderStudentTable(); saveData();
        }

        function editStudent(index) { const student = studentData[index]; document.getElementById('sira-no').value = student.sira; document.getElementById('okul-no').value = student.no; document.getElementById('ad-soyad').value = student.adSoyad; document.getElementById('sinif').value = student.sinif; document.getElementById('xp-input').value = student.xp || 0; document.getElementById('ilgi-alani-input').value = (student.ilgi_alanlari && student.ilgi_alanlari[0]) || ''; document.getElementById('edit-index').value = index; }
        function deleteStudent(index) { if (confirm("Bu öğrenciyi silmek istediğinize emin misiniz?")) { studentData.splice(index, 1); renderStudentTable(); saveData(); clearForm(); } }
        function toggleXPPopup(btn, event) {
            if (event) {
                event.stopPropagation();
            }

            // Açık olan tüm panelleri kapat
            document.querySelectorAll('.xp-popup-panel.open').forEach(p => {
                p.classList.remove('open');
            });

            // Butona ait paneli bul
            let panelId = btn.getAttribute('data-panel-id');
            let panel;
            if (panelId) {
                panel = document.getElementById(panelId);
            } else {
                panel = btn.nextElementSibling;
                if (panel && panel.classList.contains('xp-popup-panel')) {
                    // Paneli body'ye taşı ki CSS transform/filter etkileşimlerinden kurtulsun
                    panelId = 'xp-panel-' + Math.random().toString(36).substr(2, 9);
                    panel.id = panelId;
                    btn.setAttribute('data-panel-id', panelId);
                    document.body.appendChild(panel);
                } else {
                    panel = null;
                }
            }

            if (!panel) return;

            const isOpen = panel.classList.contains('open');

            if (!isOpen) {
                // Önce görünmez yap, konumu hesapla, sonra göster
                panel.style.visibility = 'hidden';
                panel.style.top = '-9999px';
                panel.style.left = '-9999px';
                panel.classList.add('open');

                // Bir sonraki frame'de boyutlar hazır olacak
                requestAnimationFrame(() => {
                    const rect = btn.getBoundingClientRect();
                    const panelW = panel.offsetWidth || 280;
                    const panelH = panel.offsetHeight || 160;

                    // Butonun ortasına hizala
                    let leftPos = rect.left + (rect.width / 2) - (panelW / 2);

                    // Ekran sınırlarını aşmasın
                    if (leftPos < 10) leftPos = 10;
                    if (leftPos + panelW > window.innerWidth - 10) {
                        leftPos = window.innerWidth - panelW - 10;
                    }

                    // Önce aşağıya aç, ekrana sığmazsa yukarı aç
                    let topPos = rect.bottom + 8;
                    if (topPos + panelH > window.innerHeight - 10) {
                        topPos = rect.top - panelH - 8;
                    }

                    // Body'de olduğu için Viewport koordinatları kusursuz çalışır!
                    panel.style.left = leftPos + 'px';
                    panel.style.top = topPos + 'px';
                    panel.style.bottom = 'auto';
                    panel.style.transform = 'none';
                    panel.style.visibility = 'visible';
                });
            } else {
                panel.classList.remove('open');
            }
        }

        function closeXPPopup(innerBtn) {
            const panel = innerBtn.closest('.xp-popup-panel');
            if (panel) panel.classList.remove('open');
        }
        // Dışarı tıklayınca popup kapansın
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.xp-popup-wrapper') && !e.target.closest('.xp-popup-panel')) {
                document.querySelectorAll('.xp-popup-panel.open').forEach(p => p.classList.remove('open'));
            }
        });

        function addBulkXP(amount, reason, btn) {
            const classFilter = document.getElementById('class-view-filter');
            const classVal = classFilter ? classFilter.value : '';
            const checkedBoxes = document.querySelectorAll('.row-checkbox:checked');
            
            let targetIndexes = [];
            
            if (checkedBoxes.length > 0) {
                checkedBoxes.forEach(cb => targetIndexes.push(parseInt(cb.getAttribute('data-index'))));
            } else if (classVal) {
                for (let i = 0; i < studentData.length; i++) {
                    if (studentData[i].sinif === classVal) targetIndexes.push(i);
                }
            } else {
                alert("Lütfen toplu XP vermek için listeden öğrenci seçin veya yukarıdan bir Sınıf seçin.");
                return;
            }

            if (targetIndexes.length === 0) {
                alert("Uygun öğrenci bulunamadı.");
                return;
            }

            targetIndexes.forEach(index => {
                if (!studentData[index].xp) studentData[index].xp = 0;
                studentData[index].xp += amount;
                if (!studentData[index].xpLogs) studentData[index].xpLogs = [];
                studentData[index].xpLogs.push({ reason: reason + ' (Toplu)', amount: amount, date: new Date().toISOString() });
            });

            renderStudentTable();
            saveData();

            const isNegative = amount < 0;
            const color = isNegative ? '#ef4444' : '#f1c40f';
            const sign = isNegative ? '' : '+';
            const toast = document.createElement('div');
            toast.style = `position:fixed; bottom:20px; right:20px; background:var(--accent); color:white; padding:12px 24px; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.3); z-index:9999; font-size: 13px; opacity:1; transition: opacity 0.5s ease-in-out; border-left: 5px solid ${color};`;
            toast.innerHTML = `<i class="${isNegative ? 'fas fa-exclamation-triangle' : 'fas fa-award'} me-2" style="font-size:16px;"></i> <strong>${targetIndexes.length} Öğrenci</strong>: <span style="color:${color}; font-weight:bold;">${sign}${amount} XP</span> <br><small style="opacity:0.8;">Kategori: ${reason}</small>`;
            document.body.appendChild(toast);
            setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 3000);

            if (btn) closeXPPopup(btn);
        }


        function addXP(index, amount, reason = 'Genel') {

            if (!studentData[index].xp) studentData[index].xp = 0;
            studentData[index].xp += amount;

            // Şeffaflık Raporlaması için Log Tutma
            if (!studentData[index].xpLogs) studentData[index].xpLogs = [];
            studentData[index].xpLogs.push({ reason: reason, amount: amount, date: new Date().toISOString() });

            renderStudentTable();
            saveData();

            // Anında Geri Bildirim (Dopamin Etkisi - Toast Animasyonu)
            const isNegative = amount < 0;
            const color = isNegative ? '#ef4444' : '#f1c40f';
            const sign = isNegative ? '' : '+';
            const toast = document.createElement('div');
            toast.style = `position:fixed; bottom:20px; right:20px; background:var(--accent); color:white; padding:12px 24px; border-radius:8px; box-shadow:0 4px 15px rgba(0,0,0,0.3); z-index:9999; font-size: 13px; opacity:1; transition: opacity 0.5s ease-in-out; border-left: 5px solid ${color};`;
            toast.innerHTML = `<i class="${isNegative ? 'fas fa-exclamation-triangle' : 'fas fa-award'} me-2" style="font-size:16px;"></i> <strong>${studentData[index].adSoyad}</strong>: <span style="color:${color}; font-weight:bold;">${sign}${amount} XP</span> <br><small style="opacity:0.8;">Kategori: ${reason}</small>`;
            document.body.appendChild(toast);

            setTimeout(() => toast.style.opacity = '0', 2000);
            setTimeout(() => toast.remove(), 2500);
        }

        let activeXPStudentIndex = -1;
        function showXPLogs(index) {
            activeXPStudentIndex = index;
            const student = studentData[index];
            document.getElementById('xp-modal-title').innerHTML = `<i class="fas fa-star" style="color:var(--yellow);"></i> ${student.adSoyad} (${student.xp || 0} XP) - Geçmiş ve Rubrik`;

            const logsContainer = document.getElementById('xp-logs-container');
            logsContainer.innerHTML = '';
            if (!student.xpLogs || student.xpLogs.length === 0) {
                logsContainer.innerHTML = '<div style="color:var(--text-muted); font-style:italic; padding:10px;">Henüz puan geçmişi bulunmuyor.</div>';
            } else {
                // Sort by date descending
                const sortedLogs = [...student.xpLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
                sortedLogs.forEach(log => {
                    const isPos = log.amount > 0;
                    const dateStr = new Date(log.date).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
                    logsContainer.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding:8px 0;">
                        <div>
                            <div style="font-weight:600; color:var(--text-main);">${log.reason}</div>
                            <div style="font-size:11px; color:var(--text-muted);">${dateStr}</div>
                        </div>
                        <div style="font-weight:bold; color:${isPos ? '#10b981' : '#ef4444'};">
                            ${isPos ? '+' : ''}${log.amount}
                        </div>
                    </div>
                `;
                });
            }

            document.getElementById('custom-xp-amount').value = '';
            document.getElementById('custom-xp-reason').value = '';
            const modal = document.getElementById('xp-modal');
            modal.style.display = 'flex';
        }

        function applyCustomXP(amount, reason) {
            if (activeXPStudentIndex === -1) return;
            addXP(activeXPStudentIndex, amount, reason);
            showXPLogs(activeXPStudentIndex); // Refresh modal
        }

        function applyManualXP() {
            if (activeXPStudentIndex === -1) return;
            const amt = parseInt(document.getElementById('custom-xp-amount').value);
            const reason = document.getElementById('custom-xp-reason').value.trim() || 'Özel Değerlendirme';
            if (isNaN(amt) || amt === 0) return alert('Lütfen geçerli bir puan giriniz.');

            addXP(activeXPStudentIndex, amt, reason);
            showXPLogs(activeXPStudentIndex); // Refresh modal
        }
        function searchStudents() {
            const query = document.getElementById('search-input').value.toLocaleLowerCase('tr-TR'); const selectedClass = document.getElementById('class-view-filter').value;
            const filtered = studentData.filter(student => {
                const matchesQuery = (student.adSoyad || '').toLocaleLowerCase('tr-TR').includes(query) || (student.no || '').toString().includes(query);
                const matchesClass = selectedClass === "" || student.sinif === selectedClass;
                return matchesQuery && matchesClass;
            });
            renderStudentTable(filtered);
        }

        async function generateContextScenarios() {
            const apiKey = localStorage.getItem('GEMINI_API_KEY');


            const mode = document.querySelector('input[name="input-mode"]:checked').value;
            let topicInput = mode === 'mufredat' 
                ? document.getElementById('mufredat-konu').value 
                : document.getElementById('free-topic').value;

            if (!topicInput || topicInput.trim() === '') {
                alert('Lütfen bir konu seçin veya girin.');
                return;
            }

            const outputDiv = document.getElementById('ai-context-output');
            outputDiv.innerHTML = `<div style="text-align:center;padding:20px;color:#10b981;"><i class="fas fa-bolt fa-spin fa-2x" style="margin-bottom:10px;"></i><p>Bağlam Senaryoları Üretiliyor...</p></div>`;
            outputDiv.style.display = 'block';

            const prompt = `Sen uzman bir Eğitim Teknoloğu ve Bağlam Temelli Eğitim (CBL) uzmanısın.
Öğretmen şu konuyu işleyecek: "${topicInput}"
Senden bu konu için 3 farklı 'Gerçek Hayat Senaryosu (Bağlam Kancası)' üretmeni istiyorum.
Senaryolar şu üç temada olmalı:
1. Uzay / Gelecek
2. Yerel Çevre / Doğa
3. Ekonomi / Girişimcilik

Lütfen çıktıyı aşağıdaki başlıklar altında, okunaklı, samimi ve ilham verici bir metin (markdown) olarak sun:

### 🚀 Uzay / Gelecek Teması
- **Senaryo Başlığı:** ...
- **Bağlam Kancası:** ...

### 🌿 Yerel Çevre / Doğa Teması
- **Senaryo Başlığı:** ...
- **Bağlam Kancası:** ...

### 💼 Ekonomi / Girişimcilik Teması
- **Senaryo Başlığı:** ...
- **Bağlam Kancası:** ...`;

            window.currentGeminiPrompt = prompt;
            const btn = document.createElement('button');
            copyPromptAndOpenGemini(btn);
            
            outputDiv.innerHTML = `<div style="text-align:center;padding:20px;color:#10b981;"><i class="fas fa-check-circle fa-2x" style="margin-bottom:10px;"></i><p>Bağlam Senaryoları promptu kopyalandı! Lütfen açılan Gemini sekmesine yapıştırıp çalıştırın.</p></div>`;
        }

/**
 * ui-soru-takip.js
 * Soru Çözüm Takip Sistemi — Öğretmen Paneli İş Mantığı Modülü
 *
 * Kapsam (Rapor doğrultusunda):
 *  - Kural 1: Zahmetsiz veri girişi → WhatsApp link üretici
 *  - Kural 2: Fotoğraflı soru köprüsü → fotoğraflı kayıtları tabloda gösterme
 *  - Kural 3: Trend & Eğilim Analizi → Radar Grafik + Çizgi Grafik (Chart.js)
 *  - Kural 4: Yapay Zeka Koçluğu → Gemini API ile zayıf konu analizi
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[SoruTakip] Modül yüklendi.');

    const soruTakipUI = {

        /** @type {firebase.database.Reference|null} */
        activeListener: null,
        /** @type {Chart|null} */
        radarChart: null,
        /** @type {Chart|null} */
        trendChart: null,
        /** @type {Array} Tablodaki mevcut veri seti (AI analizi için saklanır) */
        currentData: [],

        // ─────────────────────────────────────────────
        // BAŞLATICI
        // ─────────────────────────────────────────────
        init() {
            this.container = document.getElementById('soru-takip-container');
            if (!this.container) return;

            this.classSelect   = document.getElementById('soru-takip-class-select');
            this.studentSelect = document.getElementById('soru-takip-student-select');
            this.linkOutput    = document.getElementById('soru-takip-link-output');
            this.whatsappBtn   = document.getElementById('soru-takip-whatsapp-btn');
            this.tableBody     = document.getElementById('soru-takip-table-body');
            this.aiResultBox   = document.getElementById('soru-takip-ai-result');

            this.bindEvents();
            this.populateClassDropdown();
            this.populateStudentDropdown();
            window.SoruTakipUI = this;
        },

        // ─────────────────────────────────────────────
        // OLAYLAR
        // ─────────────────────────────────────────────
        bindEvents() {
            if (this.classSelect) {
                this.classSelect.addEventListener('change', () => {
                    this.populateStudentDropdown();
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) {
                        this.generateLink(sid);
                        this.loadStudentData(sid);
                    } else {
                        if (this.linkOutput) this.linkOutput.value = '';
                        if (this.tableBody) this.tableBody.innerHTML = '<tr><td colspan="9">Bir öğrenci seçiniz veya "A4 Soru Takip Formu Yazdır" butonu ile sınıfın tamamını yazdırınız.</td></tr>';
                        this.destroyCharts();
                    }
                });
            }

            if (this.studentSelect) {
                this.studentSelect.addEventListener('change', (e) => {
                    const sid = e.target.value;
                    if (sid) {
                        this.generateLink(sid);
                        this.loadStudentData(sid);
                    } else {
                        if (this.linkOutput) this.linkOutput.value = '';
                        if (this.tableBody) this.tableBody.innerHTML = '<tr><td colspan="9">Lütfen öğrenci seçiniz.</td></tr>';
                        this.destroyCharts();
                    }
                });
            }

            if (this.whatsappBtn) {
                this.whatsappBtn.addEventListener('click', () => {
                    const link = this.linkOutput?.value;
                    if (link) {
                        window.open(
                            `https://api.whatsapp.com/send?text=${encodeURIComponent('Soru çözüm verisi girişi için: ' + link)}`,
                            '_blank'
                        );
                    } else {
                        alert('Lütfen önce bir öğrenci seçiniz.');
                    }
                });
            }

            // AI Analiz Butonları (Kural 4 & Faz 4)
            const aiBtn = document.getElementById('soru-takip-ai-btn');
            if (aiBtn) {
                aiBtn.addEventListener('click', () => this.runAIAnalysis());
            }

            const veliAiBtn = document.getElementById('soru-takip-veli-ai-btn');
            if (veliAiBtn) {
                veliAiBtn.addEventListener('click', () => this.runParentReport());
            }
        },

        // ─────────────────────────────────────────────
        // SINIF LİSTESİ DROPDOWN
        // ─────────────────────────────────────────────
        populateClassDropdown() {
            if (!this.classSelect || typeof studentData === 'undefined') return;
            const currentSelection = this.classSelect.value;
            const classes = Array.from(new Set(studentData.map(s => s.sinif).filter(Boolean))).sort();
            
            this.classSelect.innerHTML = '<option value="">Tüm Sınıflar</option>';
            classes.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                this.classSelect.appendChild(opt);
            });
            if (currentSelection && classes.includes(currentSelection)) {
                this.classSelect.value = currentSelection;
            }
        },

        // ─────────────────────────────────────────────
        // ÖĞRENCİ LİSTESİ DROPDOWN
        // ─────────────────────────────────────────────
        populateStudentDropdown() {
            if (!this.studentSelect || typeof studentData === 'undefined') return;
            const currentSelection = this.studentSelect.value;
            const selectedClass = this.classSelect ? this.classSelect.value : '';

            const defaultLabel = selectedClass ? '-- Tüm Sınıf (Toplu Form) --' : 'Öğrenci Seçiniz...';
            this.studentSelect.innerHTML = `<option value="">${defaultLabel}</option>`;
            
            const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
            let filtered = studentData;
            if (selectedClass) {
                filtered = studentData.filter(s => s.sinif === selectedClass || norm(s.sinif) === norm(selectedClass));
            }

            filtered.slice().sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0)).forEach(s => {
                const opt = document.createElement('option');
                opt.value = s.no;
                opt.textContent = `${s.no} - ${s.adSoyad}${selectedClass ? '' : ' (' + (s.sinif || '') + ')'}`;
                this.studentSelect.appendChild(opt);
            });

            // Varsa eski seçimi geri yükle
            if (currentSelection && Array.from(this.studentSelect.options).some(o => o.value === currentSelection)) {
                this.studentSelect.value = currentSelection;
            }
        },

        // ─────────────────────────────────────────────
        // KURAL 1 — WhatsApp Link Üretici
        // ─────────────────────────────────────────────
        generateLink(sid) {
            if (!window.currentUser?.uid) return;
            
            let baseUrl = "https://mraokul-hub.github.io";
            if (window.location.origin && window.location.origin.startsWith('http')) {
                baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            }
            
            const student = typeof studentData !== 'undefined' ? studentData.find(s => s.no == sid) : null;
            const sname   = student ? student.adSoyad : '';
            const link    = `${baseUrl}/veli-form.html?uid=${window.currentUser.uid}&sid=${sid}&sname=${encodeURIComponent(sname)}`;
            if (this.linkOutput) this.linkOutput.value = link;
        },

        // ─────────────────────────────────────────────
        // FİREBASE REAL-TIME DİNLEYİCİ
        // ─────────────────────────────────────────────
        loadStudentData(sid) {
            if (!window.currentUser?.uid) return;

            // Önceki dinleyiciyi kapat
            if (this.activeListener) {
                this.activeListener.off();
                this.activeListener = null;
            }

            if (this.tableBody) {
                this.tableBody.innerHTML = '<tr><td colspan="9">Yükleniyor...</td></tr>';
            }

            // Yeni veri yolunu dinle — güvenli ortak havuz (database.rules.json ile korunur)
            this.activeListener = firebase.database().ref(`soru_takip_forms/${window.currentUser.uid}/${sid}`);
            this.activeListener.on('value', (snapshot) => {
                const data = snapshot.val();
                this.renderTable(data);
                this.renderCharts(data);   // Kural 3: Grafikleri güncelle
                this.processUnawardedXP(data, sid); // FAZ 1: Otomatik XP Kazanımı
            });
        },

        // ─────────────────────────────────────────────
        // FAZ 1: Oyunlaştırma ve XP Entegrasyonu
        // ─────────────────────────────────────────────
        async processUnawardedXP(data, sid) {
            if (!data || !window.studentData || typeof window.saveData !== 'function') return;
            const updates = {};
            let totalNewXp = 0;

            Object.entries(data).forEach(([key, entry]) => {
                if (!entry.xpAdded) {
                    const dogru = parseInt(entry.dogru) || 0;
                    const yanlis = parseInt(entry.yanlis) || 0;
                    
                    // Pedagojik Güncelleme (Growth Mindset): 
                    // - Yanlışlardan puan düşülmez (hata yapma korkusunu yenmek için).
                    // - Doğru için +3 XP
                    // - Yanlış (deneme/çaba) için +1 XP
                    // - Yeni nesil (LGS) testi çözüldüyse ekstra %50 XP bonusu.
                    let earned = (dogru * 3) + (yanlis * 1);
                    
                    if (entry.soruTipi === 'yeni-nesil' || entry.soruTipi === 'karisik') {
                        earned += Math.floor(earned * 0.5); // Zorluk bonusu
                    }

                    if (earned > 0) {
                        totalNewXp += earned;
                    }
                    // Formun XP'si işlendi olarak işaretle
                    updates[`soru_takip_forms/${window.currentUser.uid}/${sid}/${key}/xpAdded`] = true;
                }
            });

            if (totalNewXp > 0) {
                // Öğrencinin ana profilini bul ve XP ekle
                const student = window.studentData.find(s => String(s.no) === String(sid));
                if (student) {
                    student.xp = (parseInt(student.xp) || 0) + Math.floor(totalNewXp);
                    
                    // 1. Ana veritabanına kaydet (Öğrenci tablosu için)
                    window.saveData(); 
                    
                    // 2. Formları 'işlendi' olarak işaretle (Bir daha XP eklenmemesi için)
                    await firebase.database().ref().update(updates);
                    
                    // 3. UI Bildirimi
                    if (typeof window.showStatus === 'function') {
                        window.showStatus(`🎉 Tebrikler! Soru çözümlerinden ${Math.floor(totalNewXp)} XP eklendi!`, false);
                    }
                    
                    // Eğer öğrenci tablosu açıksa anlık güncelle
                    if (typeof window.renderStudentTable === 'function') {
                        window.renderStudentTable();
                    }
                }
            }
        },

        // ─────────────────────────────────────────────
        // TABLO ÇİZDİRME
        // Kural 2: Fotoğraflı kayıtlar 📷 simgesiyle işaretlenir
        // ─────────────────────────────────────────────
        renderTable(data) {
            if (!this.tableBody) return;
            this.tableBody.innerHTML = '';
            this.currentData = [];

            if (!data) {
                this.tableBody.innerHTML = '<tr><td colspan="10">Henüz veri girişi yapılmamış.</td></tr>';
                this.destroyCharts();
                return;
            }

            const entries = Object.entries(data)
                .map(([k, v]) => ({ id: k, ...v }))
                .sort((a, b) => new Date(b.tarih) - new Date(a.tarih));

            this.currentData = entries;

            // Soru Tipi badge
            const tipiBadge = {
                'temel'     : '<span title="Temel (Kazanım)" style="font-size:0.75rem;background:#d1fae5;color:#065f46;padding:2px 7px;border-radius:12px;font-weight:600;">🎯 Temel</span>',
                'yeni-nesil': '<span title="Yeni Nesil (LGS)"  style="font-size:0.75rem;background:#ede9fe;color:#5b21b6;padding:2px 7px;border-radius:12px;font-weight:600;">🧠 YN</span>',
                'karisik'   : '<span title="Karışık"           style="font-size:0.75rem;background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:12px;font-weight:600;">🔀 Karışık</span>',
            };

            entries.forEach(entry => {
                const hasFoto = Boolean(entry.fotoBase64);
                const modBadge = {
                    elle            : '<span title="Elle Giriş"     style="font-size:1rem;">✍️</span>',
                    'elle+fotograf' : '<span title="Elle + Foto"    style="font-size:1rem;">✍️+📷</span>',
                    fotograf        : '<span title="Fotoğraflı"     style="font-size:1rem;">📷</span>',
                    omr             : '<span title="Kağıt Okutma"   style="font-size:1rem;">📄</span>',
                }[entry.mod] || '';

                // Kaynak + Konu birleştir
                const konuStr = [entry.kaynak, entry.konu].filter(Boolean).join(' / ') || (entry.aciklama || '-');
                const tipStr  = tipiBadge[entry.soruTipi] || '';
                const ogrStr  = entry.ogrSoru > 0 ? `<span style="color:#F97316;font-weight:700;">🙋 ${entry.ogrSoru}</span>` : '-';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${entry.tarih || '-'}</td>
                    <td>${entry.ders  || '-'}</td>
                    <td style="font-size:0.82rem;color:#374151;">${konuStr}</td>
                    <td>${tipStr}</td>
                    <td style="color:#10B981;font-weight:700;">${entry.dogru  ?? '-'}</td>
                    <td style="color:#EF4444;font-weight:700;">${entry.yanlis ?? '-'}</td>
                    <td style="color:#6B7280;font-weight:700;">${entry.bos    ?? '-'}</td>
                    <td style="text-align:center;">${ogrStr}</td>
                    <td style="text-align:center;">${modBadge}
                        ${hasFoto
                            ? `<button onclick="window.SoruTakipUI.showPhoto('${entry.id}')"
                                style="font-size:10px;padding:3px 7px;background:#F97316;color:#fff;border:none;border-radius:5px;cursor:pointer;margin-left:4px;">
                                Fotoğrafı Gör</button>`
                            : ''}
                    </td>
                    <td style="text-align:center;">
                        <button onclick="window.SoruTakipUI.deleteEntry('${entry.id}')" style="background: none; border: none; color: var(--red); cursor: pointer; padding: 4px;" title="Bu kaydı sil">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>`;
                this.tableBody.appendChild(tr);
            });
        },

        // Kural 2: Fotoğraflı soru köprüsü — fotoğraf popup
        showPhoto(entryId) {
            const entry = this.currentData.find(e => e.id === entryId);
            if (!entry?.fotoBase64) return;
            const win = window.open('', '_blank');
            win.document.write(`<html><body style="margin:0;background:#111;display:flex;justify-content:center;align-items:center;min-height:100vh;">
                <img src="${entry.fotoBase64}" style="max-width:100%;max-height:100vh;border-radius:8px;">
                </body></html>`);
        },

        deleteEntry(entryId) {
            if (!window.currentUser?.uid || !this.studentSelect.value) return;
            if (!confirm('Bu kayıt tamamen silinecek. Öğrenci tablosuna otomatik olarak eklenmiş XP varsa manuel düşmeniz gerekebilir, devam etmek istiyor musunuz?')) return;
            const sid = this.studentSelect.value;
            firebase.database().ref(`soru_takip_forms/${window.currentUser.uid}/${sid}/${entryId}`).remove()
                .then(() => {
                    if (typeof window.showStatus === 'function') window.showStatus('Kayıt başarıyla silindi.', false);
                })
                .catch(err => {
                    console.error("Silme hatası:", err);
                    alert("Kayıt silinemedi!");
                });
        },

        // ─────────────────────────────────────────────
        // KURAL 3 — Trend ve Eğilim Analizi
        // Chart.js ile Radar + Çizgi Grafikler
        // ─────────────────────────────────────────────
        renderCharts(data) {
            this.destroyCharts();
            if (!data) return;

            const entries = Object.values(data);

            // ── A. Radar Grafik: Ders bazlı doğru/yanlış dağılımı ──
            const dersOzet = {};
            entries.forEach(e => {
                if (!e.ders) return;
                if (!dersOzet[e.ders]) dersOzet[e.ders] = { dogru: 0, yanlis: 0 };
                dersOzet[e.ders].dogru  += (e.dogru  || 0);
                dersOzet[e.ders].yanlis += (e.yanlis || 0);
            });

            const dersLabels    = Object.keys(dersOzet);
            const dogruValues   = dersLabels.map(d => dersOzet[d].dogru);
            const yanlisValues  = dersLabels.map(d => dersOzet[d].yanlis);

            const radarCtx = document.getElementById('soru-takip-radar-chart');
            if (radarCtx && dersLabels.length > 0) {
                this.radarChart = new Chart(radarCtx, {
                    type: 'radar',
                    data: {
                        labels: dersLabels,
                        datasets: [
                            {
                                label: 'Doğru',
                                data: dogruValues,
                                backgroundColor: 'rgba(16,185,129,0.15)',
                                borderColor: '#10B981',
                                pointBackgroundColor: '#10B981',
                                borderWidth: 2,
                            },
                            {
                                label: 'Yanlış',
                                data: yanlisValues,
                                backgroundColor: 'rgba(239,68,68,0.15)',
                                borderColor: '#EF4444',
                                pointBackgroundColor: '#EF4444',
                                borderWidth: 2,
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: 'top' } },
                        scales: { r: { beginAtZero: true } }
                    }
                });
            }

            // ── B. Çizgi Grafik: Tarihe göre doğru trendi ──
            const tarihOzet = {};
            entries
                .filter(e => e.tarih)
                .sort((a, b) => new Date(a.tarih) - new Date(b.tarih))
                .forEach(e => {
                    tarihOzet[e.tarih] = (tarihOzet[e.tarih] || 0) + (e.dogru || 0);
                });

            const tarihLabels  = Object.keys(tarihOzet);
            const tarihDogrular = Object.values(tarihOzet);

            const trendCtx = document.getElementById('soru-takip-trend-chart');
            if (trendCtx && tarihLabels.length > 1) {
                this.trendChart = new Chart(trendCtx, {
                    type: 'line',
                    data: {
                        labels: tarihLabels,
                        datasets: [{
                            label: 'Günlük Toplam Doğru',
                            data: tarihDogrular,
                            borderColor: '#4F46E5',
                            backgroundColor: 'rgba(79,70,229,0.08)',
                            tension: 0.4,
                            fill: true,
                            pointBackgroundColor: '#4F46E5',
                            pointRadius: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: { legend: { position: 'top' } },
                        scales: { y: { beginAtZero: true } }
                    }
                });
            }
        },

        destroyCharts() {
            if (this.radarChart) { this.radarChart.destroy(); this.radarChart = null; }
            if (this.trendChart) { this.trendChart.destroy(); this.trendChart = null; }
        },

        // ─────────────────────────────────────────────
        // KURAL 4 — Yapay Zeka (Gemini) Koçluğu
        // API key gereksiz. Prompt otomatik oluşturulur,
        // panoya kopyalanır ve gemini.com açılır.
        // ─────────────────────────────────────────────
        async runAIAnalysis() {
            if (this.currentData.length === 0) {
                alert('Analiz için önce bir öğrenci seçiniz ve verilerin yüklenmesini bekleyiniz.');
                return;
            }

            const aiBox = document.getElementById('soru-takip-ai-result');
            const aiBtn = document.getElementById('soru-takip-ai-btn');

            // Ders bazlı özet hesapla
            const dersOzet = {};
            let toplamKayit = 0;
            this.currentData.forEach(e => {
                if (!e.ders) return;
                if (!dersOzet[e.ders]) dersOzet[e.ders] = { 
                    dogru: 0, yanlis: 0, bos: 0, 
                    temel: 0, yeniNesil: 0, karisik: 0, ogrSoru: 0,
                    gun: new Set() 
                };
                dersOzet[e.ders].dogru   += (parseInt(e.dogru)  || 0);
                dersOzet[e.ders].yanlis  += (parseInt(e.yanlis) || 0);
                dersOzet[e.ders].bos     += (parseInt(e.bos)    || 0);
                dersOzet[e.ders].ogrSoru += (parseInt(e.ogrSoru) || 0);
                
                if (e.soruTipi === 'temel') dersOzet[e.ders].temel++;
                else if (e.soruTipi === 'yeni-nesil') dersOzet[e.ders].yeniNesil++;
                else if (e.soruTipi === 'karisik') dersOzet[e.ders].karisik++;

                if (e.tarih) dersOzet[e.ders].gun.add(e.tarih);
                toplamKayit++;
            });

            const student = typeof studentData !== 'undefined' ? studentData.find(s => s.no == this.studentSelect?.value) : null;
            const ad   = student?.adSoyad || 'Öğrenci';
            const sinif = student?.sinif   || '';

            // Veri tablosu (prompt için okunabilir format)
            const dersTablosu = Object.entries(dersOzet).map(([ders, v]) => {
                const basari = v.dogru + v.yanlis > 0
                    ? Math.round((v.dogru / (v.dogru + v.yanlis)) * 100)
                    : 0;
                let detay = `- ${ders}: ${v.dogru}D, ${v.yanlis}Y, ${v.bos}B → Başarı: %${basari}`;
                detay += ` | (${v.temel} Temel, ${v.yeniNesil} LGS tarzı test)`;
                if (v.ogrSoru > 0) detay += ` | 🙋 Öğretmene soracağı soru: ${v.ogrSoru}`;
                return detay;
            }).join('\n');

            // Son 5 girişin tarihleri (trend için)
            const sonGirisler = [...this.currentData]
                .filter(e => e.tarih && e.ders)
                .slice(0, 5)
                .map(e => `  • ${e.tarih} | ${e.ders}: ${e.dogru ?? 0}D / ${e.yanlis ?? 0}Y`)
                .join('\n');

            // ── Prompt oluştur ──
            const prompt = `Sen deneyimli bir Türk eğitim koçusun. Aşağıdaki öğrencinin soru çözüm verilerini analiz ederek kapsamlı bir koçluk raporu hazırla.

═══════════════════════════════════
ÖĞRENCİ BİLGİSİ VE PROFİLİ
═══════════════════════════════════
Ad Soyad : ${ad}${sinif ? '\nSınıf    : ' + sinif : ''}
Öğrenme Stili (VAK): ${student.ogrenmeStili || student.vak || 'Bilinmiyor'}
Toplam Soru Girişi : ${toplamKayit} adet veri

═══════════════════════════════════
DERS BAZLI SORU ANALİZİ
═══════════════════════════════════
${dersTablosu}

═══════════════════════════════════
SON GİRİŞLER (Trend)
═══════════════════════════════════
${sonGirisler || '  (Henüz yeterli veri yok)'}

═══════════════════════════════════
RAPORDAN BEKLENTİLER
═══════════════════════════════════
Lütfen şu başlıkları içeren bir koçluk raporu hazırla:

1. 📊 GENEL DURUM DEĞERLENDİRMESİ
   Öğrencinin genel çalışma düzenini ve performansını özetle.

2. 💪 GÜÇLÜ YÖNLER
   En başarılı olduğu ders(ler) ve bu başarının sebeplerini açıkla.

3. ⚠️ GELİŞİM GEREKTİREN ALANLAR
   En düşük başarı oranına sahip ders(ler)i ve olası sebebi belirt.

4. 🎯 DERS BAZLI STRATEJİLER
   Her ders için 1-2 somut, uygulanabilir öneri sun.

5. 📅 HAFTALIK ÇALIŞMA PLANI
   Verilere dayalı kısa bir haftalık program öner.

6. 🌟 MOTİVASYON MESAJI
   Öğrenciye özel, pozitif ve teşvik edici bir kapanış mesajı yaz.

Türkçe yaz. Sade, anlaşılır ve uygulanabilir ol.`;

            // ── Panoya kopyala ──
            let kopyalandi = false;
            try {
                await navigator.clipboard.writeText(prompt);
                kopyalandi = true;
            } catch (_) {
                // Clipboard API erişimi yoksa fallback
                const ta = document.createElement('textarea');
                ta.value = prompt;
                ta.style.cssText = 'position:fixed;opacity:0;';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
                kopyalandi = true;
            }

            // ── Gemini.com'u aç ──
            window.open('https://gemini.google.com/', '_blank');

            // ── Kullanıcıya bilgi kutusu göster ──
            if (aiBox) {
                aiBox.style.display = 'block';
                aiBox.innerHTML = `
                    <div style="text-align:center; padding:0.5rem 0 1rem;">
                        <div style="font-size:2rem; margin-bottom:0.5rem;">✅</div>
                        <strong style="font-size:1rem; color:var(--primary,#4F46E5);">
                            Prompt Panoya Kopyalandı!
                        </strong>
                    </div>
                    <ol style="margin:0; padding-left:1.25rem; font-size:0.88rem; line-height:1.9; color:var(--text-main,#111827);">
                        <li>Gemini sekmesi açıldı <em>(açılmadıysa <a href="https://gemini.google.com/" target="_blank" style="color:#4F46E5;">buraya tıkla</a>)</em></li>
                        <li>Gemini'deki mesaj kutusuna tıkla</li>
                        <li><kbd style="background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:1px 6px;">Ctrl+V</kbd> ile yapıştır</li>
                        <li>Gönder → Raporunu oku 📊</li>
                    </ol>
                    <hr style="border:none;border-top:1px dashed var(--border,#e5e7eb);margin:1rem 0 0.75rem;">
                    <details style="font-size:0.8rem; color:var(--text-muted,#6b7280);">
                        <summary style="cursor:pointer; font-weight:600; color:var(--primary,#4F46E5);">
                            🔍 Oluşturulan Prompt'u Görüntüle
                        </summary>
                        <pre style="margin-top:0.75rem; white-space:pre-wrap; background:var(--input-bg,#f8fafc);
                                    padding:0.75rem; border-radius:8px; border:1px solid var(--border,#e5e7eb);
                                    font-family:monospace; font-size:0.78rem; line-height:1.6;
                                    max-height:300px; overflow-y:auto;">${prompt.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
                    </details>`;
            }
        },

        // ─────────────────────────────────────────────
        // FAZ 4: VELİ GELİŞİM KARNESİ (Yapay Zeka)
        // ─────────────────────────────────────────────
        async runParentReport() {
            if (this.currentData.length === 0) {
                alert('Yapay zeka analizi için henüz veri girişi yapılmamış.');
                return;
            }

            const sid = this.studentSelect.value;
            const student = typeof studentData !== 'undefined' ? studentData.find(s => String(s.no) === String(sid)) : null;
            if (!student) return;

            const ad = student.adSoyad;
            const sinif = student.sinif;
            const toplamKayit = this.currentData.length;

            const dersOzet = {};
            this.currentData.forEach(e => {
                if (!e.ders) return;
                if (!dersOzet[e.ders]) dersOzet[e.ders] = { 
                    dogru: 0, yanlis: 0, bos: 0, 
                    temel: 0, yeniNesil: 0, karisik: 0, ogrSoru: 0,
                    gun: new Set() 
                };
                dersOzet[e.ders].dogru   += (parseInt(e.dogru)  || 0);
                dersOzet[e.ders].yanlis  += (parseInt(e.yanlis) || 0);
                dersOzet[e.ders].bos     += (parseInt(e.bos)    || 0);
                dersOzet[e.ders].ogrSoru += (parseInt(e.ogrSoru) || 0);
                
                if (e.soruTipi === 'temel') dersOzet[e.ders].temel++;
                else if (e.soruTipi === 'yeni-nesil') dersOzet[e.ders].yeniNesil++;
                else if (e.soruTipi === 'karisik') dersOzet[e.ders].karisik++;

                if (e.tarih) dersOzet[e.ders].gun.add(e.tarih);
            });

            const dersTablosu = Object.entries(dersOzet).map(([ders, v]) => {
                const basari = v.dogru + v.yanlis > 0 ? Math.round((v.dogru / (v.dogru + v.yanlis)) * 100) : 0;
                let msj = `- ${ders}: ${v.dogru}D, ${v.yanlis}Y → Başarı: %${basari} (${v.temel} Temel, ${v.yeniNesil} LGS tarzı test)`;
                if (v.ogrSoru > 0) msj += ` | Öğretmene soracağı: ${v.ogrSoru} soru var.`;
                return msj;
            }).join('\n');

            const prompt = `Sen deneyimli, samimi ve motive edici bir öğretmensin. Aşağıdaki soru çözüm verilerine ve notlara bakarak öğrencinin velisine (WhatsApp'tan gönderilmek üzere) kısa, anlaşılır ve yapıcı bir 'Aylık Gelişim Raporu' mesajı yaz.

═══════════════════════════════════
ÖĞRENCİ BİLGİSİ
═══════════════════════════════════
Öğrenci: ${ad} (${sinif || ''})
XP Puanı: ${student.xp || 0}
Öğrenme Stili: ${student.ogrenmeStili || student.vak || 'Bilinmiyor'}
Çözülen Soru Verisi: Toplam ${toplamKayit} kayıt
Son Durum:
${dersTablosu}

═══════════════════════════════════
BEKLENEN FORMAT (Veliye Hitaben)
═══════════════════════════════════
- Mesaj direkt "Değerli velimiz," şeklinde başlamalı.
- Soru çözüm disiplini övülmeli (XP veya Soru sayısı).
- Hangi derste çok iyi, hangi derste biraz daha dikkatli olması gerektiği kibar bir dille söylenmeli.
- VAK (öğrenme stili) bilgisine uygun 1-2 çok basit ev içi pratik tavsiyesi verilmeli.
- Uzun paragraflar yerine madde işaretleri ve emojiler kullanılmalı.`;

            // Panoya kopyala
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
            
            const aiBox = document.getElementById('soru-takip-ai-result');
            if (aiBox) {
                aiBox.style.display = 'block';
                aiBox.innerHTML = `
                    <div style="text-align:center; padding:0.5rem 0 1rem;">
                        <div style="font-size:2rem; margin-bottom:0.5rem;">📱</div>
                        <strong style="font-size:1rem; color:var(--orange);">
                            Veli Raporu Promptu Kopyalandı!
                        </strong>
                    </div>
                    <p style="font-size:12.5px;">Gemini'den alacağınız yanıtı kopyalayarak, üstteki <b>WhatsApp'tan Gönder</b> butonu yardımıyla veliye iletebilirsiniz.</p>
                `;
            }
        }
    };

    // DOM yüklendiğinde hemen başlat
    soruTakipUI.init();

    // Global nesneye ata (dışarıdan erişim için)
    window.SoruTakipUI = soruTakipUI;
});

// A4 Soru Takip Formu Yazdırma Penceresini Açma Yardımcısı
window.openSoruTakipKagitFormu = function() {
    const classVal = document.getElementById('soru-takip-class-select')?.value || '';
    const studentVal = document.getElementById('soru-takip-student-select')?.value || '';
    
    let targetStudents = [];
    const allStudents = (typeof studentData !== 'undefined' ? studentData : []);
    
    if (studentVal) {
        const found = allStudents.find(s => String(s.no) === String(studentVal));
        if (found) targetStudents = [found];
    } else if (classVal) {
        const norm = s => String(s || '').replace(/[\/_-]/g, '').trim().toUpperCase();
        targetStudents = allStudents.filter(s => s.sinif === classVal || norm(s.sinif) === norm(classVal));
        targetStudents.sort((a, b) => (parseInt(a.no) || 0) - (parseInt(b.no) || 0));
    }
    
    try {
        sessionStorage.setItem('soru_takip_print_class', classVal);
        sessionStorage.setItem('soru_takip_print_student_no', studentVal);
        sessionStorage.setItem('soru_takip_print_students', JSON.stringify(targetStudents));
    } catch(e) {}
    
    let url = 'Soru_Cozum_Kagit_Formu.html';
    const params = [];
    if (classVal) params.push('class=' + encodeURIComponent(classVal));
    if (studentVal) params.push('no=' + encodeURIComponent(studentVal));
    if (params.length > 0) url += '?' + params.join('&');
    
    window.open(url, '_blank');
};


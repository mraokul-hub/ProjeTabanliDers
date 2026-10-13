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
        currentWeekNo: 1,
        scannerStream: null,
        scannerInterval: null,

        // ─────────────────────────────────────────────
        // BAŞLATICI
        // ─────────────────────────────────────────────
        init() {
            if (this._initialized) return;
            this.container = document.getElementById('soru-takip-container');
            if (!this.container) return;
            this._initialized = true;

            this.classSelect     = document.getElementById('soru-takip-class-select');
            this.studentSelect   = document.getElementById('soru-takip-student-select');
            this.linkOutput      = document.getElementById('soru-takip-link-output');
            this.whatsappBtn     = document.getElementById('soru-takip-whatsapp-btn');
            this.tableBody       = document.getElementById('soru-takip-table-body');
            this.aiResultBox     = document.getElementById('soru-takip-ai-result');

            // Yeni Dönem & Barkod Elemanları
            this.dersSelect      = document.getElementById('soru-takip-ders-select');
            this.startDateInput  = document.getElementById('soru-takip-start-date');
            this.endDateInput    = document.getElementById('soru-takip-end-date');
            this.weekBadge       = document.getElementById('soru-takip-week-badge');
            this.linkStatus      = document.getElementById('soru-takip-link-status');
            this.btnThisWeek     = document.getElementById('btn-period-this-week');
            this.btnNextWeek     = document.getElementById('btn-period-next-week');
            this.btnPeriod21Days = document.getElementById('btn-period-21-days');
            this.btnScanBarcode  = document.getElementById('btn-scan-paper-barcode');
            this.btnOpenDirect   = document.getElementById('btn-open-direct-form');
            this.btnCopyLink     = document.getElementById('btn-copy-smart-link');
            this.scannerModal     = document.getElementById('soru-takip-scanner-modal');
            this.scannerVideo     = document.getElementById('soru-takip-scanner-video');
            this.scannerCanvas    = document.getElementById('soru-takip-scanner-canvas');
            this.scannerFeedback  = document.getElementById('soru-takip-scanner-feedback');
            this.scannerFileInput = document.getElementById('soru-takip-scanner-file-input');
            this.btnUploadFile    = document.getElementById('btn-scanner-upload-file');
            this.btnQuickUpload   = document.getElementById('btn-scanner-quick-upload');
            this.scannerDropzone  = document.getElementById('soru-takip-scanner-dropzone');
            this.scannerCurrentFacingMode = 'environment';

            this.initPeriodDefaults();
            this.bindEvents();
            this.populateClassDropdown();
            this.populateStudentDropdown();
            window.SoruTakipUI = this;
        },

        // 21 Günlük Tek Ders Dönemi Belirleme (1 Sayfa = 21 Gün)
        set21DaysPeriod() {
            let startVal = this.startDateInput?.value;
            if (!startVal) {
                const today = new Date();
                const day = today.getDay();
                const diff = today.getDate() - day + (day === 0 ? -6 : 1);
                const mon = new Date(today.setDate(diff));
                startVal = mon.toISOString().split('T')[0];
                if (this.startDateInput) this.startDateInput.value = startVal;
            }

            const parts = startVal.split('-');
            if (parts.length === 3) {
                const sDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
                const eDate = new Date(sDate);
                eDate.setDate(sDate.getDate() + 20); // 21 gün (0..20)
                const yyyy = eDate.getFullYear();
                const mm = String(eDate.getMonth() + 1).padStart(2, '0');
                const dd = String(eDate.getDate()).padStart(2, '0');
                if (this.endDateInput) this.endDateInput.value = `${yyyy}-${mm}-${dd}`;
            }

            if (this.weekBadge) {
                this.weekBadge.textContent = `${this.currentWeekNo}. Hafta (21 Gün)`;
            }

            const ders = this.dersSelect?.value || '';
            if (this.linkStatus) {
                this.linkStatus.textContent = ders ? `● ${ders} (21 Gün Kilitli)` : '● 21 Gün Kilitli';
            }

            const sid = this.studentSelect ? this.studentSelect.value : '';
            if (sid) this.generateLink(sid);
        },

        // Varsayılan Haftayı ve Tarihleri Hesapla
        initPeriodDefaults() {
            const today = new Date();
            const day = today.getDay();
            const diff = today.getDate() - day + (day === 0 ? -6 : 1);
            const mon = new Date(today.setDate(diff));
            const sun = new Date(mon);
            sun.setDate(mon.getDate() + 6);

            const monStr = mon.toISOString().split('T')[0];
            const sunStr = sun.toISOString().split('T')[0];

            if (this.startDateInput && !this.startDateInput.value) this.startDateInput.value = monStr;
            if (this.endDateInput && !this.endDateInput.value) this.endDateInput.value = sunStr;

            // Hafta hesapla (Eylül başlangıçlı MEB takvimi)
            let sepStart = new Date(new Date().getFullYear(), 8, 8);
            if (new Date() < sepStart && new Date().getMonth() < 6) {
                sepStart = new Date(new Date().getFullYear() - 1, 8, 8);
            }
            const diffDays = Math.floor((new Date() - sepStart) / (1000 * 60 * 60 * 24));
            this.currentWeekNo = Math.max(1, Math.min(40, Math.floor(diffDays / 7) + 1));

            if (this.weekBadge) this.weekBadge.textContent = `${this.currentWeekNo}. Hafta`;
            if (this.linkStatus) {
                const ders = this.dersSelect?.value || '';
                this.linkStatus.textContent = ders ? `● ${ders} Kilitli` : '● Tarih Kilitli';
            }
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
                        if (this.tableBody) this.tableBody.innerHTML = '<tr><td colspan="10">Bir öğrenci seçiniz veya "A4 Soru Takip Formu Yazdır" butonu ile sınıfın tamamını yazdırınız.</td></tr>';
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
                        if (this.tableBody) this.tableBody.innerHTML = '<tr><td colspan="10">Lütfen öğrenci seçiniz veya "Kağıt / Barkod Tara" ile kağıdı kameraya okutunuz.</td></tr>';
                        this.destroyCharts();
                    }
                });
            }

            // Tarih değişimleri
            if (this.startDateInput) {
                this.startDateInput.addEventListener('change', () => {
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) this.generateLink(sid);
                });
            }
            if (this.endDateInput) {
                this.endDateInput.addEventListener('change', () => {
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) this.generateLink(sid);
                });
            }

            // Hızlı dönem butonları
            if (this.btnThisWeek) {
                this.btnThisWeek.addEventListener('click', () => {
                    const now = new Date();
                    const day = now.getDay();
                    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
                    const mon = new Date(now.setDate(diff));
                    const sun = new Date(mon);
                    sun.setDate(mon.getDate() + 6);
                    if (this.startDateInput) this.startDateInput.value = mon.toISOString().split('T')[0];
                    if (this.endDateInput) this.endDateInput.value = sun.toISOString().split('T')[0];
                    
                    let sep = new Date(new Date().getFullYear(), 8, 8);
                    if (new Date() < sep && new Date().getMonth() < 6) sep = new Date(new Date().getFullYear() - 1, 8, 8);
                    this.currentWeekNo = Math.max(1, Math.min(40, Math.floor((new Date() - sep)/(1000*60*60*24*7)) + 1));
                    if (this.weekBadge) this.weekBadge.textContent = `${this.currentWeekNo}. Hafta`;
                    
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) this.generateLink(sid);
                });
            }

            if (this.btnNextWeek) {
                this.btnNextWeek.addEventListener('click', () => {
                    const next = new Date();
                    next.setDate(next.getDate() + 7);
                    const day = next.getDay();
                    const diff = next.getDate() - day + (day === 0 ? -6 : 1);
                    const mon = new Date(next.setDate(diff));
                    const sun = new Date(mon);
                    sun.setDate(mon.getDate() + 6);
                    if (this.startDateInput) this.startDateInput.value = mon.toISOString().split('T')[0];
                    if (this.endDateInput) this.endDateInput.value = sun.toISOString().split('T')[0];
                    
                    this.currentWeekNo = (this.currentWeekNo || 1) + 1;
                    if (this.weekBadge) this.weekBadge.textContent = `${this.currentWeekNo}. Hafta`;
                    
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) this.generateLink(sid);
                });
            }

            // Ders Değişimi (Seçimli ve Değiştirilebilir)
            if (this.dersSelect) {
                this.dersSelect.addEventListener('change', () => {
                    const ders = this.dersSelect.value;
                    if (ders) {
                        this.set21DaysPeriod();
                    } else {
                        this.initPeriodDefaults();
                    }
                    const sid = this.studentSelect ? this.studentSelect.value : '';
                    if (sid) this.generateLink(sid);
                });
            }

            if (this.btnPeriod21Days) {
                this.btnPeriod21Days.addEventListener('click', () => {
                    this.set21DaysPeriod();
                });
            }

            // Link Kopyala Butonu
            if (this.btnCopyLink) {
                this.btnCopyLink.addEventListener('click', () => {
                    const val = this.linkOutput ? this.linkOutput.value : '';
                    if (!val) {
                        alert('Lütfen önce bir öğrenci seçiniz.');
                        return;
                    }
                    navigator.clipboard.writeText(val).then(() => {
                        this.btnCopyLink.innerHTML = '<i class="fas fa-check" style="color:#059669;"></i>';
                        setTimeout(() => {
                            this.btnCopyLink.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 1800);
                    });
                });
            }

            // Doğrudan Forma Git Butonu
            if (this.btnOpenDirect) {
                this.btnOpenDirect.addEventListener('click', () => {
                    const link = this.linkOutput?.value;
                    if (link) {
                        window.open(link, '_blank');
                    } else {
                        alert('Lütfen önce bir öğrenci seçiniz veya A4 formundan karekod okutunuz.');
                    }
                });
            }

            // Kağıt / Barkod Tara Butonu
            if (this.btnScanBarcode) {
                this.btnScanBarcode.onclick = (e) => {
                    if (e) e.preventDefault();
                    this.openScannerModal();
                };
            }

            // Dosyadan / Fotoğraftan Barkod Tara Butonları
            if (this.btnUploadFile && this.scannerFileInput) {
                this.btnUploadFile.addEventListener('click', () => this.scannerFileInput.click());
            }
            if (this.btnQuickUpload && this.scannerFileInput) {
                this.btnQuickUpload.addEventListener('click', () => this.scannerFileInput.click());
            }
            if (this.scannerFileInput) {
                this.scannerFileInput.addEventListener('change', (e) => {
                    const file = e.target.files?.[0];
                    if (file) this.scanImageFile(file);
                });
            }

            // Sürükle & Bırak ile Dosyadan Tarama
            const dropTarget = this.scannerDropzone || this.scannerVideo?.parentElement;
            if (dropTarget) {
                ['dragenter', 'dragover'].forEach(evt => {
                    dropTarget.addEventListener(evt, (e) => {
                        e.preventDefault();
                        dropTarget.style.outline = '3px dashed #3b82f6';
                        dropTarget.style.outlineOffset = '-4px';
                    });
                });
                ['dragleave', 'drop'].forEach(evt => {
                    dropTarget.addEventListener(evt, (e) => {
                        e.preventDefault();
                        dropTarget.style.outline = 'none';
                    });
                });
                dropTarget.addEventListener('drop', (e) => {
                    const file = e.dataTransfer?.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                        this.scanImageFile(file);
                    }
                });
            }

            // Kamera Değiştir Butonu
            const btnSwitchCam = document.getElementById('btn-scanner-switch-camera');
            if (btnSwitchCam) {
                btnSwitchCam.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchCamera();
                });
            }

            // Siyah ekrana veya tap-to-play uyarısına tıklayarak videoyu başlatma
            const tapOverlay = document.getElementById('soru-takip-scanner-tap-to-play');
            const handleManualPlay = () => {
                if (this.scannerVideo) {
                    this.scannerVideo.play().then(() => {
                        if (tapOverlay) tapOverlay.style.display = 'none';
                        this.startScanningLoop();
                    }).catch(e => console.warn(e));
                }
            };
            if (tapOverlay) tapOverlay.addEventListener('click', handleManualPlay);
            if (this.scannerVideo) this.scannerVideo.addEventListener('click', handleManualPlay);

            // WhatsApp Butonu
            if (this.whatsappBtn) {
                this.whatsappBtn.addEventListener('click', () => {
                    const link = this.linkOutput?.value;
                    if (link) {
                        const student = typeof studentData !== 'undefined' ? studentData.find(s => s.no == this.studentSelect?.value) : null;
                        const sname = student ? student.adSoyad : '';
                        const ders = this.dersSelect?.value || '';
                        const dersText = ders ? `${ders} dersi ` : '';
                        const periodDesc = ders ? '21 günlük takip çizelgesi' : `${this.currentWeekNo}. Hafta`;
                        const text = `Sayın Velimiz, ${sname ? sname + ' öğrencimizin ' : ''}${dersText}${periodDesc} soru çözüm verilerini girmek için bağlantınız:\n${link}`;
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
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
        // KAĞIT / BARKOD TARAYICI METOTLARI
        // ─────────────────────────────────────────────
        openScannerModal() {
            if (!this.scannerModal) return;
            this.scannerModal.style.display = 'flex';
            this.startScanner();
        },

        closeScannerModal() {
            this.stopScanner();
            if (this.scannerModal) this.scannerModal.style.display = 'none';
            const tapOverlay = document.getElementById('soru-takip-scanner-tap-to-play');
            if (tapOverlay) tapOverlay.style.display = 'none';
        },

        switchCamera() {
            const nextMode = (this.scannerCurrentFacingMode === 'environment') ? 'user' : 'environment';
            this.startScanner(nextMode);
        },

        async startScanner(preferredFacingMode) {
            if (!this.scannerVideo) return;

            // Önceki yayını durdur
            this.stopScanner();

            if (preferredFacingMode) {
                this.scannerCurrentFacingMode = preferredFacingMode;
            } else if (!this.scannerCurrentFacingMode) {
                this.scannerCurrentFacingMode = 'environment';
            }

            if (this.scannerFeedback) {
                this.scannerFeedback.textContent = "📷 Kamera başlatılıyor...";
                this.scannerFeedback.style.color = "#0284c7";
            }

            const tapOverlay = document.getElementById('soru-takip-scanner-tap-to-play');
            if (tapOverlay) tapOverlay.style.display = 'none';

            // Tarayıcı MediaDevices desteği kontrolü
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                if (this.scannerFeedback) {
                    this.scannerFeedback.innerHTML = "⚠️ Tarayıcınız doğrudan kamera erişimini desteklemiyor.<br>Lütfen aşağıdaki <strong>'Dosyadan / Fotoğraftan Tara'</strong> butonunu kullanarak fotoğraf çekiniz.";
                    this.scannerFeedback.style.color = "#ef4444";
                }
                return;
            }

            // Mobil Safari/Chrome için zorunlu video özellikleri
            this.scannerVideo.setAttribute('autoplay', '');
            this.scannerVideo.setAttribute('muted', '');
            this.scannerVideo.setAttribute('playsinline', '');
            this.scannerVideo.setAttribute('webkit-playsinline', '');
            this.scannerVideo.playsInline = true;
            this.scannerVideo.muted = true;

            const mode = this.scannerCurrentFacingMode;

            // Kademeli deneme listesi (ideal environment -> exact environment -> ideal user -> genel video)
            const constraintsList = [
                { video: { facingMode: { ideal: mode }, width: { ideal: 1280 }, height: { ideal: 720 } } },
                { video: { facingMode: { ideal: mode } } },
                { video: { facingMode: mode } },
                { video: true }
            ];

            let stream = null;
            let lastErr = null;

            for (const constraints of constraintsList) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                    if (stream) break;
                } catch(err) {
                    lastErr = err;
                }
            }

            if (!stream) {
                let errText = "Kamera açılamadı";
                if (lastErr) {
                    if (lastErr.name === 'NotAllowedError' || lastErr.name === 'PermissionDeniedError') {
                        errText = "🔒 Kamera izni reddedildi. Lütfen tarayıcı adres çubuğundaki kilit (veya site ayarı) simgesine dokunup kamera iznini açınız.";
                    } else if (lastErr.name === 'NotFoundError' || lastErr.name === 'DevicesNotFoundError') {
                        errText = "Cihazda kullanılabilir kamera bulunamadı.";
                    } else if (lastErr.name === 'NotReadableError' || lastErr.name === 'TrackStartError') {
                        errText = "Kamera başka bir uygulama tarafından kullanılıyor olabilir.";
                    } else {
                        errText = "Kamera açılamadı: " + (lastErr.message || lastErr.name);
                    }
                }
                if (this.scannerFeedback) {
                    this.scannerFeedback.innerHTML = errText + "<br><small style='color:#64748b;'>Alternatif olarak aşağıdaki 'Dosyadan / Fotoğraftan Tara' butonuna dokunup kameranızla fotoğraf çekebilirsiniz.</small>";
                    this.scannerFeedback.style.color = "#ef4444";
                }
                return;
            }

            this.scannerStream = stream;
            this.scannerVideo.srcObject = stream;

            // Mobilde play() kilidini çözmek için onloadedmetadata dinle ve play()'i güvenli çağır
            let loopStarted = false;
            const initiatePlay = () => {
                if (loopStarted) return;
                const playPromise = this.scannerVideo.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        if (tapOverlay) tapOverlay.style.display = 'none';
                        loopStarted = true;
                        this.startScanningLoop();
                    }).catch(playErr => {
                        console.warn("Otomatik video oynatma engellendi:", playErr);
                        if (tapOverlay) tapOverlay.style.display = 'block';
                        if (this.scannerFeedback) {
                            this.scannerFeedback.textContent = "👆 Kamerayı başlatmak için siyah alana dokunun...";
                            this.scannerFeedback.style.color = "#d97706";
                        }
                    });
                } else {
                    loopStarted = true;
                    this.startScanningLoop();
                }
            };

            this.scannerVideo.onloadedmetadata = () => {
                initiatePlay();
            };

            // Yedek başlatıcı (bazı Android tarayıcılarında onloadedmetadata geç tetiklenebilir)
            setTimeout(() => {
                if (!loopStarted) {
                    initiatePlay();
                }
            }, 600);
        },

        stopScanner() {
            if (this.scannerInterval) {
                clearInterval(this.scannerInterval);
                this.scannerInterval = null;
            }
            if (this.scannerStream) {
                this.scannerStream.getTracks().forEach(t => t.stop());
                this.scannerStream = null;
            }
            if (this.scannerVideo) {
                this.scannerVideo.srcObject = null;
            }
        },

        startScanningLoop() {
            if (this.scannerInterval) {
                clearInterval(this.scannerInterval);
                this.scannerInterval = null;
            }
            if (!this.scannerCanvas || !this.scannerVideo) return;
            const ctx = this.scannerCanvas.getContext('2d');
            
            if (this.scannerFeedback) {
                const isBackCam = (this.scannerCurrentFacingMode === 'environment');
                this.scannerFeedback.innerHTML = `🎯 Kağıdın sağ üstündeki karekodu kameraya gösteriniz... <span style="font-size:11px; color:#64748b;">(${isBackCam ? 'Arka Kamera' : 'Ön Kamera'})</span>`;
                this.scannerFeedback.style.color = "#059669";
            }

            const hasBarcodeDetector = ('BarcodeDetector' in window);
            let detector = null;
            if (hasBarcodeDetector) {
                try {
                    detector = new BarcodeDetector({ formats: ['qr_code', 'code_128', 'code_39', 'ean_13'] });
                } catch(e) {}
            }

            this.scannerInterval = setInterval(async () => {
                if (this.scannerVideo.readyState < 2 || this.scannerVideo.paused || !this.scannerVideo.videoWidth) return;
                
                // 1. Öncelik: Yerel Tarayıcı BarcodeDetector Motoru (Ultra Hızlı ve Donanım Destekli)
                if (detector) {
                    try {
                        const barcodes = await detector.detect(this.scannerVideo);
                        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
                            this.handleScannedCode(barcodes[0].rawValue);
                            return;
                        }
                    } catch(e) {}
                }

                // 2. Öncelik: jsQR Canvas Kare Analizi
                if (typeof jsQR !== 'undefined') {
                    this.scannerCanvas.width = this.scannerVideo.videoWidth;
                    this.scannerCanvas.height = this.scannerVideo.videoHeight;
                    ctx.drawImage(this.scannerVideo, 0, 0, this.scannerCanvas.width, this.scannerCanvas.height);

                    const imageData = ctx.getImageData(0, 0, this.scannerCanvas.width, this.scannerCanvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: 'attemptBoth'
                    });

                    if (code && code.data) {
                        this.handleScannedCode(code.data);
                    }
                }
            }, 200);
        },

        // ─────────────────────────────────────────────
        // DOSYADAN / FOTOĞRAFTAN KAREKOD TARAMA
        // ─────────────────────────────────────────────
        scanImageFile(file) {
            if (!file || !file.type.startsWith('image/')) {
                if (this.scannerFeedback) {
                    this.scannerFeedback.textContent = "⚠️ Lütfen geçerli bir resim dosyası seçiniz (PNG, JPG, WEBP vb.).";
                    this.scannerFeedback.style.color = "#dc2626";
                }
                return;
            }

            if (this.scannerFeedback) {
                this.scannerFeedback.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Dosya inceleniyor: <strong>${file.name}</strong>...`;
                this.scannerFeedback.style.color = "#2563eb";
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = async () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const codeData = await this.decodeQRFromImage(img, canvas, ctx);
                    if (codeData) {
                        if (this.scannerFeedback) {
                            this.scannerFeedback.innerHTML = `✅ <strong>Dosyadaki karekod başarıyla okundu!</strong>`;
                            this.scannerFeedback.style.color = "#059669";
                        }
                        this.handleScannedCode(codeData);
                    } else {
                        if (this.scannerFeedback) {
                            this.scannerFeedback.innerHTML = `❌ Görselde karekod tespit edilemedi. Lütfen kağıdın sağ üst köşesini net gösteren aydınlık bir fotoğraf yükleyiniz veya doğrudan telefon kameranızla okutunuz.`;
                            this.scannerFeedback.style.color = "#dc2626";
                        }
                    }
                    if (this.scannerFileInput) this.scannerFileInput.value = '';
                };
                img.onerror = () => {
                    if (this.scannerFeedback) {
                        this.scannerFeedback.textContent = "❌ Resim yüklenirken bir sorun oluştu.";
                        this.scannerFeedback.style.color = "#dc2626";
                    }
                    if (this.scannerFileInput) this.scannerFileInput.value = '';
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        // Çok Kademeli Akıllı QR & Barkod Çözücü
        async decodeQRFromImage(img, canvas, ctx) {
            // 1. Strateji: Donanım Hızlandırmalı Modern Tarayıcı Motoru (Chromium BarcodeDetector API)
            if ('BarcodeDetector' in window) {
                try {
                    const detector = new BarcodeDetector({ formats: ['qr_code', 'code_128', 'code_39', 'ean_13', 'upc_a'] });
                    const codes = await detector.detect(img);
                    if (codes && codes.length > 0 && codes[0].rawValue) {
                        return codes[0].rawValue;
                    }
                } catch (e) {
                    console.warn("BarcodeDetector hatası, jsQR motoruna geçiliyor:", e);
                }
            }

            if (typeof jsQR === 'undefined') {
                console.error('jsQR kütüphanesi bulunamadı.');
                return null;
            }

            const nw = img.naturalWidth;
            const nh = img.naturalHeight;

            // Yardımcı test fonksiyonu: Belirtilen alanı çizer, jsQR ile arar, başarısız olursa kontrast binarizasyonu dener
            const testCanvasRegion = (targetW, targetH, sx = 0, sy = 0, sw = nw, sh = nh) => {
                canvas.width = targetW;
                canvas.height = targetH;
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
                let idata = ctx.getImageData(0, 0, targetW, targetH);
                let res = jsQR(idata.data, targetW, targetH, { inversionAttempts: 'attemptBoth' });
                if (res && res.data) return res.data;

                // Kontrast Eşikleme / Binarizasyon Filtresi (Gölgeli ve Loş Işıklı Kağıtlar İçin)
                const d = idata.data;
                let minL = 255, maxL = 0;
                for (let i = 0; i < d.length; i += 4) {
                    let lum = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
                    if (lum < minL) minL = lum;
                    if (lum > maxL) maxL = lum;
                }
                if (maxL - minL > 25) {
                    const thresh = minL + (maxL - minL) * 0.52;
                    for (let i = 0; i < d.length; i += 4) {
                        let lum = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
                        let v = lum < thresh ? 0 : 255;
                        d[i] = v;
                        d[i+1] = v;
                        d[i+2] = v;
                    }
                    res = jsQR(d, targetW, targetH, { inversionAttempts: 'attemptBoth' });
                    if (res && res.data) return res.data;
                }
                return null;
            };

            // 2. Strateji: Doğrudan Tam Görsel (Kullanıcı sadece karekodu veya üst kısmı kırpıp yüklediyse)
            let found = testCanvasRegion(Math.min(nw, 1400), Math.round(nh * (Math.min(nw, 1400) / nw)));
            if (found) return found;

            found = testCanvasRegion(Math.min(nw, 800), Math.round(nh * (Math.min(nw, 800) / nw)));
            if (found) return found;

            // 3. Strateji: A4 Takip Formu Sağ Üst Köşe (Tam Kağıt Çekimlerinde Odaklanma)
            const cropW1 = Math.round(nw * 0.45);
            const cropH1 = Math.round(nh * 0.35);
            const cropX1 = Math.round(nw - cropW1);
            found = testCanvasRegion(cropW1, cropH1, cropX1, 0, cropW1, cropH1);
            if (found) return found;

            // 4. Strateji: Genişletilmiş Sağ Üst Çeyrek (%60 x %45)
            const cropW2 = Math.round(nw * 0.60);
            const cropH2 = Math.round(nh * 0.45);
            const cropX2 = Math.round(nw - cropW2);
            found = testCanvasRegion(cropW2, cropH2, cropX2, 0, cropW2, cropH2);
            if (found) return found;

            // 5. Strateji: Orijinal Tam Çözünürlük (2600px'e kadar)
            if (nw <= 2600 && nh <= 2600) {
                found = testCanvasRegion(nw, nh);
                if (found) return found;
            }

            return null;
        },

        handleScannedCode(rawText) {
            let targetSid = '';
            let targetStart = '';
            let targetEnd = '';
            let targetWeek = '';
            let targetDers = '';

            // 1. URL formatı mı?
            if (rawText.startsWith('http://') || rawText.startsWith('https://')) {
                try {
                    const urlObj = new URL(rawText);
                    targetSid   = urlObj.searchParams.get('sid') || urlObj.searchParams.get('s');
                    targetStart = urlObj.searchParams.get('start') || urlObj.searchParams.get('st');
                    targetEnd   = urlObj.searchParams.get('end') || urlObj.searchParams.get('ed');
                    targetWeek  = urlObj.searchParams.get('week') || urlObj.searchParams.get('w');
                    targetDers  = urlObj.searchParams.get('ders') || urlObj.searchParams.get('d');
                } catch(e) {}
            } else if (rawText.startsWith('{')) {
                try {
                    const parsed = JSON.parse(rawText);
                    targetSid   = parsed.sid || parsed.no || parsed.s;
                    targetStart = parsed.start || parsed.st;
                    targetEnd   = parsed.end || parsed.ed;
                    targetWeek  = parsed.week || parsed.w;
                    targetDers  = parsed.ders || parsed.d;
                } catch(e) {}
            } else if (rawText.startsWith('ST-')) {
                // ST-101-W05 veya ST-101-W05-MAT
                const parts = rawText.split('-');
                if (parts.length >= 2) targetSid = parts[1];
                if (parts.length >= 3) targetWeek = parts[2].replace(/\D/g, '');
                if (parts.length >= 4) {
                    const dCode = parts[3].toUpperCase();
                    const codeMap = {
                        'MAT': 'Matematik',
                        'TÜR': 'Türkçe',
                        'TUR': 'Türkçe',
                        'FEN': 'Fen Bilimleri',
                        'SOS': 'Sosyal Bilgiler',
                        'İNG': 'İngilizce',
                        'ING': 'İngilizce',
                        'DİN': 'Din Kültürü',
                        'DIN': 'Din Kültürü',
                        'İNK': 'T.C. İnkılap Tarihi',
                        'INK': 'T.C. İnkılap Tarihi'
                    };
                    targetDers = codeMap[dCode] || parts[3];
                }
            }

            if (!targetSid) return;

            // Sesli bildirim (Soft Beep)
            try {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 880;
                gain.gain.value = 0.15;
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                setTimeout(() => { osc.stop(); audioCtx.close(); }, 120);
            } catch(e) {}

            this.stopScanner();

            // Öğrenciyi veritabanında bul
            const stList = typeof studentData !== 'undefined' ? studentData : [];
            const foundStudent = stList.find(s => String(s.no) === String(targetSid));

            if (targetStart && this.startDateInput) this.startDateInput.value = targetStart;
            if (targetEnd && this.endDateInput) this.endDateInput.value = targetEnd;
            if (targetWeek) {
                this.currentWeekNo = parseInt(targetWeek, 10) || this.currentWeekNo;
                if (this.weekBadge) this.weekBadge.textContent = `${this.currentWeekNo}. Hafta`;
            }
            if (targetDers && this.dersSelect) {
                this.dersSelect.value = targetDers;
            }

            if (foundStudent) {
                if (foundStudent.sinif && this.classSelect) {
                    this.classSelect.value = foundStudent.sinif;
                    this.populateStudentDropdown();
                }
                if (this.studentSelect) {
                    this.studentSelect.value = foundStudent.no;
                }
                this.generateLink(foundStudent.no);
                this.loadStudentData(foundStudent.no);

                if (this.scannerFeedback) {
                    const dersBadge = targetDers ? ` &middot; 📘 ${targetDers}` : '';
                    this.scannerFeedback.innerHTML = `
                        <div style="background:#ecfdf5; border:1.5px solid #059669; border-radius:8px; padding:10px; margin-top:4px;">
                            <div style="font-size:13.5px; font-weight:800; color:#065f46;">
                                🎉 <strong>${foundStudent.adSoyad} (${foundStudent.no})</strong> Tanındı!
                            </div>
                            <div style="font-size:11.5px; color:#047857; margin-top:3px;">
                                📅 ${this.currentWeekNo}. Hafta${dersBadge} &middot; Sistem Senkronize Edildi
                            </div>
                            <div style="display:flex; gap:6px; justify-content:center; margin-top:8px;">
                                <button type="button" onclick="window.SoruTakipUI.openDirectForm(); window.SoruTakipUI.closeScannerModal();" class="btn" style="background:#059669; color:#fff; font-size:11.5px; padding:6px 12px; border-radius:6px; font-weight:700; border:none; cursor:pointer;">
                                    ⚡ Doğrudan Veri Girişini Aç
                                </button>
                                <button type="button" onclick="window.SoruTakipUI.closeScannerModal();" class="btn" style="background:#e2e8f0; color:#1e293b; font-size:11.5px; padding:6px 12px; border-radius:6px; font-weight:600; border:none; cursor:pointer;">
                                    Tabloyu Göster
                                </button>
                            </div>
                        </div>`;
                }
            } else {
                if (this.studentSelect) this.studentSelect.value = targetSid;
                this.generateLink(targetSid);
                this.loadStudentData(targetSid);
                if (this.scannerFeedback) {
                    this.scannerFeedback.innerHTML = `🎉 <strong>Öğrenci No: ${targetSid}</strong> Başarıyla Tanındı!`;
                    this.scannerFeedback.style.color = "#059669";
                }
            }

            // Kullanıcı buton tıklamazsa 1.8 sn sonra modalı yumuşak kapatır
            setTimeout(() => {
                if (this.scannerModal && this.scannerModal.style.display !== 'none') {
                    this.closeScannerModal();
                }
            }, 1800);
        },

        openDirectForm() {
            const link = this.linkOutput?.value;
            if (link) {
                window.open(link, '_blank');
            } else {
                alert('Lütfen önce bir öğrenci seçiniz veya A4 formundan karekod okutunuz.');
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
            
            let baseUrl = "https://mraokul-hub.github.io/ProjeTabanliDersIsleme";
            if (window.location.origin && window.location.origin.startsWith('http')) {
                baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            }
            
            const student = typeof studentData !== 'undefined' ? studentData.find(s => s.no == sid) : null;
            const sname   = student ? student.adSoyad : '';
            const start   = this.startDateInput?.value || '';
            const end     = this.endDateInput?.value || '';
            const week    = this.currentWeekNo || 1;
            const ders    = this.dersSelect?.value || '';

            let link = `${baseUrl}/veli-form.html?uid=${window.currentUser.uid}&sid=${sid}&sname=${encodeURIComponent(sname)}`;
            if (start && end) {
                link += `&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&week=${encodeURIComponent(week)}`;
            }
            if (ders) {
                link += `&ders=${encodeURIComponent(ders)}`;
            }
            if (this.linkOutput) this.linkOutput.value = link;

            if (this.linkStatus) {
                this.linkStatus.textContent = ders ? `● ${ders} (21 Gün Kilitli)` : '● Tarih Kilitli';
            }
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
    const classVal   = document.getElementById('soru-takip-class-select')?.value || '';
    const studentVal = document.getElementById('soru-takip-student-select')?.value || '';
    const dersVal    = document.getElementById('soru-takip-ders-select')?.value || '';
    const startVal   = document.getElementById('soru-takip-start-date')?.value || '';
    const endVal     = document.getElementById('soru-takip-end-date')?.value || '';
    const weekVal    = window.SoruTakipUI?.currentWeekNo || 1;
    const teacherUid = window.currentUser?.uid || '';
    
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
        sessionStorage.setItem('soru_takip_print_ders', dersVal);
        sessionStorage.setItem('soru_takip_print_students', JSON.stringify(targetStudents));
        sessionStorage.setItem('soru_takip_print_uid', teacherUid);
        sessionStorage.setItem('soru_takip_print_start_date', startVal);
        sessionStorage.setItem('soru_takip_print_end_date', endVal);
        sessionStorage.setItem('soru_takip_print_week', weekVal);

        localStorage.setItem('soru_takip_print_class', classVal);
        localStorage.setItem('soru_takip_print_student_no', studentVal);
        localStorage.setItem('soru_takip_print_ders', dersVal);
        localStorage.setItem('soru_takip_print_students', JSON.stringify(targetStudents));
        localStorage.setItem('soru_takip_print_uid', teacherUid);
        localStorage.setItem('soru_takip_print_start_date', startVal);
        localStorage.setItem('soru_takip_print_end_date', endVal);
        localStorage.setItem('soru_takip_print_week', weekVal);
    } catch(e) {}
    
    let url = 'Soru_Cozum_Kagit_Formu.html';
    const params = [];
    if (classVal) params.push('class=' + encodeURIComponent(classVal));
    if (studentVal) params.push('no=' + encodeURIComponent(studentVal));
    if (dersVal) params.push('ders=' + encodeURIComponent(dersVal));
    if (teacherUid) params.push('uid=' + encodeURIComponent(teacherUid));
    if (startVal) params.push('start=' + encodeURIComponent(startVal));
    if (endVal) params.push('end=' + encodeURIComponent(endVal));
    if (weekVal) params.push('week=' + encodeURIComponent(weekVal));
    if (params.length > 0) url += '?' + params.join('&');
    
    window.open(url, '_blank');
};


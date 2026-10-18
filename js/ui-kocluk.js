// ============================================================
// ui-kocluk.js (v2.0 İleri Düzey Mimari & Pedagojik Sürüm)
// 8. Sınıf LGS Bilişsel Koçluk, TDE Motoru, Hata Defteri & Mentorluk Sistemi
// ============================================================

(function () {
    'use strict';

    let activeKoclukId = null;
    let activeDetailSubTab = 'tab-koc-profil';

    const escapeFn = window.escapeHTML || function (s) {
        return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };

    // ─────────────────────────────────────────────────────────────
    // 0. TDE (TURLAMA DİSİPLİN ENDEKSİ) VE ARALIKLI TEKRAR MOTORLARI
    // ─────────────────────────────────────────────────────────────

    /**
     * Turlama Disiplin Endeksi (TDE) Hesaplama Motoru (0-100 Puan)
     * Pedagojik kriterler: Fen/Mat 1. tur süreleri, inatlaşma, 2. tur kazanımları, optik kontrol
     */
    function calculateTDE(deneme) {
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
                badgeColor: '#f59e0b',
                badgeBg: 'rgba(245, 158, 11, 0.12)',
                badgeBorder: 'rgba(245, 158, 11, 0.35)'
            };
        }

        const fen1Tur = (deneme.fen1TurSure !== undefined && deneme.fen1TurSure !== null && deneme.fen1TurSure !== '') ? Number(deneme.fen1TurSure) : 32;
        const mat1Tur = (deneme.mat1TurSure !== undefined && deneme.mat1TurSure !== null && deneme.mat1TurSure !== '') ? Number(deneme.mat1TurSure) : 30;
        const inatlasma = Number(deneme.inatlasmaSayisi) || 0;
        const fen2Tur = Number(deneme.fen2TurKazanc) || 0;
        const mat2Tur = Number(deneme.mat2TurKazanc) || 0;
        const optik = !!deneme.optikKontrol;

        // 1. Fen 1. Tur Zaman Puanı (İdeal <= 32 dk, her 3 dk aşımda -5p, maks 15p)
        const fenZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, fen1Tur - 32) / 3) * 5);

        // 2. Mat 1. Tur Zaman Puanı (İdeal <= 30 dk, her 3 dk aşımda -5p, maks 15p)
        const matZamanPuan = Math.max(0, 15 - Math.floor(Math.max(0, mat1Tur - 30) / 3) * 5);

        // 3. İnatlaşma Cezası (İdeal: 0 soru, her inatlaşılan soru -10p, maks 30p)
        const inatlasmaPuan = Math.max(0, 30 - (inatlasma * 10));

        // 4. Fen 2. Tur Kazanç Puanı (>=2 net -> 10p, 1 net -> 5p, 0 -> 0p, maks 10p)
        const fen2TurPuan = fen2Tur >= 2 ? 10 : (fen2Tur === 1 ? 5 : 0);

        // 5. Mat 2. Tur Kazanç Puanı (>=3 net -> 15p, 2 net -> 10p, 1 net -> 5p, 0 -> 0p, maks 15p)
        const mat2TurPuan = mat2Tur >= 3 ? 15 : (mat2Tur === 2 ? 10 : (mat2Tur === 1 ? 5 : 0));

        // 6. Optik Kontrol Puanı (Son 3 dk yapıldı mı: Evet 15p, Hayır 0p)
        const optikPuan = optik ? 15 : 0;

        const totalPuan = Math.min(100, Math.max(0, fenZamanPuan + matZamanPuan + inatlasmaPuan + fen2TurPuan + mat2TurPuan + optikPuan));

        let badgeText = 'Orta Düzey Dalgalanma';
        let badgeColor = '#f59e0b';
        let badgeBg = 'rgba(245, 158, 11, 0.12)';
        let badgeBorder = 'rgba(245, 158, 11, 0.35)';

        if (totalPuan >= 85) {
            badgeText = 'Üst Düzey Stratejik Olgunluk';
            badgeColor = '#10b981';
            badgeBg = 'rgba(16, 185, 129, 0.12)';
            badgeBorder = 'rgba(16, 185, 129, 0.35)';
        } else if (totalPuan < 70) {
            badgeText = 'Kırmızı Alarm: Süre Yönetimi Çöküşü';
            badgeColor = '#ef4444';
            badgeBg = 'rgba(239, 68, 68, 0.12)';
            badgeBorder = 'rgba(239, 68, 68, 0.35)';
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
            // "18.10.2026" veya ISO
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

    /**
     * LGS Dönemsel Faz (Periyodizasyon) Algılayıcısı
     * Sistem tarihine göre aktif pedagojik fazı ve odak hedeflerini belirler.
     */
    function getCurrentLgsPhase() {
        const month = new Date().getMonth(); // 0: Ocak, 1: Şubat, ..., 11: Aralık
        // Faz 2 (Şubat-Mart): 1, 2
        // Faz 3 (Nisan-Mayıs): 3, 4
        // Faz 4 (Mayıs Sonu-Haziran): 5
        // Faz 1 (Eylül-Ocak): 8, 9, 10, 11, 0
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
                title: 'Genel Deneme, Hata Eritme & Plato Kırma (%50 İleri Muhakeme)',
                focus: 'Genel denemeler, aralıklı tekrar hata eritme, %50 ileri düzey beceri temelli sorular',
                badgeBg: 'rgba(99, 102, 241, 0.12)',
                badgeColor: '#6366f1'
            };
        } else if (month === 5) {
            return {
                id: 4,
                name: 'Faz 4 (Mayıs Sonu-Haziran)',
                title: 'Biyolojik Ritim, Sabah 09:30 Zihin Açıklığı & Zihinsel Regülasyon',
                focus: 'Sınav saatinde biyolojik uyanıklık, stres ve zihinsel regülasyon',
                badgeBg: 'rgba(239, 68, 68, 0.12)',
                badgeColor: '#ef4444'
            };
        } else {
            return {
                id: 1,
                name: 'Faz 1 (Eylül-Ocak)',
                title: 'Temel İnşa & Okuma Direnci (40+10 dk Blok Odaklı)',
                focus: 'Temel kavram inşası, uzun soru okuma direnci, odak blokları',
                badgeBg: 'rgba(16, 185, 129, 0.12)',
                badgeColor: '#10b981'
            };
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 1. ANA MODÜL RENDER VE KARTLARI LİSTELEME
    // ─────────────────────────────────────────────────────────────
    function renderKoclukModule() {
        const container = document.getElementById('kocluk-cards-container');
        if (!container) return;

        const list = Array.isArray(window.koclukData) ? window.koclukData : [];
        const classFilter = document.getElementById('kocluk-class-filter')?.value || '';
        const searchInput = (document.getElementById('kocluk-search-input')?.value || '').toLocaleLowerCase('tr-TR').trim();

        // İstatistikleri Güncelle
        updateKoclukStatistics(list);
        populateKoclukClassFilter(list);

        // Filtreleme
        const filtered = list.filter(k => {
            if (classFilter && k.sinif !== classFilter && window.normSinif && window.normSinif(k.sinif) !== window.normSinif(classFilter)) {
                return false;
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
                    <p style="margin: 0 0 18px 0; color: var(--text-muted); font-size: 13px; max-width: 480px; margin-inline: auto;">
                        LGS hazırlık sürecindeki 8. sınıf öğrencilerinizi koçluk havuzuna ekleyerek; hedef net, TDE turlama endeksi, metabilişsel hata defteri ve yapay zeka destekli rehberlik süreçlerini yönetebilirsiniz.
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
            const safeLise = escapeFn(item.hedefLise || 'Nitelikli Lise Hedefi');
            const safeYuzdelik = escapeFn(item.hedefYuzdelik || '%1.0');
            const safeVak = escapeFn(item.vak || 'Analitik / Bütüncül');

            const baslangic = Number(item.baslangicNeti) || 65;
            const hedef = Number(item.hedefNet) || 85;

            // Son Net ve Son TDE Verisi
            const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
            const sonNet = getStudentLatestNet(item);
            const progressPercent = Math.min(100, Math.max(0, Math.round(((sonNet - baslangic) / (Math.max(hedef - baslangic, 1))) * 100)));

            const tdeInfo = lastDeneme ? calculateTDE(lastDeneme) : { tdePuan: 75, badgeText: 'Henüz Deneme Yok', badgeColor: '#6b7280', badgeBg: 'rgba(107,114,128,0.1)' };

            // Bekleyen ve Gecikmiş Hata Tekrarları
            const allErrors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
            const dueErrors = allErrors.filter(h => getHataRepeatStatus(h).isDue).length;
            const uncompletedErrors = allErrors.filter(h => !h.tekrar1 || !h.tekrar3 || !h.tekrar14).length;

            let errorBadgeHtml = '';
            if (dueErrors > 0) {
                errorBadgeHtml = `<span style="background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.35); padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px; animation: pulse 1.5s infinite;">
                    <i class="fas fa-bell"></i> ${dueErrors} Tekrar Günü Geldi!
                </span>`;
            } else if (uncompletedErrors > 0) {
                errorBadgeHtml = `<span style="background: rgba(245, 158, 11, 0.12); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fas fa-clock"></i> ${uncompletedErrors} Süreçte
                </span>`;
            } else {
                errorBadgeHtml = `<span style="background: rgba(16, 185, 129, 0.12); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fas fa-check-double"></i> Hatalar Pekiştirildi
                </span>`;
            }

            html += `
            <div class="kocluk-student-card" style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 20px; box-shadow: var(--shadow); display: flex; flex-direction: column; justify-content: space-between; gap: 15px; position: relative; transition: transform 0.2s ease, box-shadow 0.2s ease;">
                
                <!-- Kart Başlık & Bilgi -->
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);">
                                ${safeName.charAt(0)}
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 15px; color: var(--text-main); font-weight: 700; display: flex; align-items: center; gap: 6px;">
                                    ${safeName}
                                    <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); background: var(--input-bg); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">No: ${safeNo}</span>
                                </h4>
                                <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px; font-size: 11.5px; color: var(--text-muted);">
                                    <span style="font-weight: 600; color: var(--secondary);"><i class="fas fa-graduation-cap"></i> ${safeSinif}</span>
                                    <span>•</span>
                                    <span><i class="fas fa-brain"></i> ${safeVak}</span>
                                </div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            ${errorBadgeHtml}
                        </div>
                    </div>

                    <!-- Hedef Lise & TDE Rozetleri -->
                    <div style="background: rgba(99, 102, 241, 0.06); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: 8px; padding: 10px 12px; margin-bottom: 12px;">
                        <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #6366f1; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
                            <span><i class="fas fa-bullseye me-1"></i> Hedef Lise</span>
                            <span style="color: #4f46e5; font-size: 11px;">Dilim: ${safeYuzdelik}</span>
                        </div>
                        <div style="font-size: 13px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px;" title="${safeLise}">
                            🏫 ${safeLise}
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed rgba(99,102,241,0.2); padding-top:6px; font-size:11.5px;">
                            <span style="color:var(--text-muted);"><i class="fas fa-tachometer-alt me-1"></i> Son TDE Skoru:</span>
                            <span style="background:${tdeInfo.badgeBg}; color:${tdeInfo.badgeColor}; font-weight:800; padding:2px 8px; border-radius:6px; font-size:11px;">
                                ${lastDeneme ? `${tdeInfo.tdePuan}/100` : 'Belirsiz'} • ${tdeInfo.badgeText}
                            </span>
                        </div>
                    </div>

                    <!-- Net İlerleme Çubuğu -->
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
                            <span style="color: var(--text-muted);">Mevcut: <strong style="color:var(--text-main); font-size:13px;">${sonNet} Net</strong></span>
                            <span style="color: var(--accent); font-weight: 700;">Hedef: ${hedef} Net</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: var(--border); border-radius: 10px; overflow: hidden; position: relative;">
                            <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #6366f1, #10b981); border-radius: 10px; transition: width 0.4s ease;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: var(--text-muted); margin-top: 4px;">
                            <span>Başlangıç: ${baslangic} Net</span>
                            <span>Haftalık Soru: <strong>${item.haftalikHedefSoru || 600}</strong></span>
                        </div>
                    </div>
                </div>

                <!-- Aksiyon Butonları -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; border-top: 1px solid var(--border); padding-top: 12px;">
                    <button class="btn btn-primary" onclick="openKoclukDetailModal('${safeId}')" style="padding: 7px 10px; font-size: 11.5px; font-weight: 700; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                        <i class="fas fa-sliders-h"></i> Süreç &amp; Kokpit
                    </button>
                    <button class="btn btn-purple" onclick="runAiCoachingForStudent('${safeId}')" style="padding: 7px 10px; font-size: 11.5px; font-weight: 700; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                        <i class="fas fa-brain"></i> AI Koçluk
                    </button>
                    <button class="btn btn-clear" onclick="openParentWhatsAppShareModal('${safeId}')" style="padding: 6px 10px; font-size: 11px; font-weight: 600; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">
                        <i class="fab fa-whatsapp"></i> Veli Bülteni
                    </button>
                    <button class="btn btn-delete" onclick="deleteKoclukStudent('${safeId}')" style="padding: 6px 10px; font-size: 11px; font-weight: 600; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
                        <i class="fas fa-trash-alt"></i> Listeden Çıkar
                    </button>
                    <button class="btn" onclick="openQuickWeeklySyncModal('${safeId}')" style="grid-column: 1 / -1; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 7px 10px; font-size: 11.5px; font-weight: 700; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; cursor: pointer; box-shadow: 0 2px 6px rgba(245,158,11,0.3);">
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
        const errorsEl = document.getElementById('koc-stat-pending-errors');

        if (!totalEl) return;

        totalEl.textContent = list.length;

        if (list.length === 0) {
            if (avgNetEl) avgNetEl.textContent = '0';
            if (avgTargetEl) avgTargetEl.textContent = '0';
            if (errorsEl) errorsEl.textContent = '0';
            return;
        }

        let totalCurrentNet = 0;
        let totalTargetNet = 0;
        let totalDueErrors = 0;
        let totalPendingErrors = 0;

        list.forEach(k => {
            totalCurrentNet += getStudentLatestNet(k);
            totalTargetNet += (Number(k.hedefNet) || 85);
            (k.hataDefteri || []).forEach(h => {
                const rep = getHataRepeatStatus(h);
                if (rep.isDue) totalDueErrors++;
                if (!h.tekrar1 || !h.tekrar3 || !h.tekrar14) totalPendingErrors++;
            });
        });

        if (avgNetEl) avgNetEl.textContent = (totalCurrentNet / list.length).toFixed(1);
        if (avgTargetEl) avgTargetEl.textContent = (totalTargetNet / list.length).toFixed(1);
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
            let classOpts = '<option value="">-- Sınıf Seçin --</option>';
            Array.from(classes).sort().forEach(c => {
                const isEight = c.includes('8');
                classOpts += `<option value="${escapeFn(c)}" ${isEight ? 'style="font-weight:bold;color:var(--secondary);"' : ''}>${escapeFn(c)} ${isEight ? '🎯 (LGS Grubu)' : ''}</option>`;
            });
            classSelect.innerHTML = classOpts;
        }

        if (studentSelect) {
            studentSelect.innerHTML = '<option value="">-- Önce Sınıf Seçiniz --</option>';
        }

        document.getElementById('koc-add-lise').value = 'Fen Lisesi';
        document.getElementById('koc-add-yuzdelik').value = '%1.0';
        document.getElementById('koc-add-baslangic-net').value = 70;
        document.getElementById('koc-add-hedef-net').value = 88;
        document.getElementById('koc-add-soru-hedef').value = 600;
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

        if (typeof examData !== 'undefined' && Array.isArray(examData) && examData.length > 0) {
            let totalNetSum = 0;
            let count = 0;
            examData.forEach(ex => {
                if (ex.results && ex.results[student.adSoyad] && ex.results[student.adSoyad].totalNet) {
                    totalNetSum += Number(ex.results[student.adSoyad].totalNet);
                    count++;
                }
            });
            if (count > 0) {
                const avg = Math.round(totalNetSum / count);
                document.getElementById('koc-add-baslangic-net').value = avg;
                document.getElementById('koc-add-hedef-net').value = Math.min(90, avg + 14);
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

        const lise = document.getElementById('koc-add-lise')?.value.trim() || 'Nitelikli Lise';
        const yuzdelik = document.getElementById('koc-add-yuzdelik')?.value.trim() || '%1.0';
        const baslangic = Number(document.getElementById('koc-add-baslangic-net')?.value) || 70;
        const hedef = Number(document.getElementById('koc-add-hedef-net')?.value) || 88;
        const soruHedef = Number(document.getElementById('koc-add-soru-hedef')?.value) || 600;
        const notlar = document.getElementById('koc-add-notlar')?.value.trim() || '';

        const initialDeneme = {
            id: 'den_' + Date.now(),
            ad: 'Başlangıç Düzey Tespit Denemesi',
            tarih: new Date().toLocaleDateString('tr-TR'),
            sozelNet: 45,
            matNet: 12,
            fenNet: 13,
            toplamNet: baslangic,
            cozumSirasi: 'Fen-Mat',
            fen1TurSure: 32,
            mat1TurSure: 33,
            inatlasmaSayisi: 1,
            fen2TurKazanc: 1,
            mat2TurKazanc: 2,
            optikKontrol: true,
            tdePuan: 75
        };
        initialDeneme.tdePuan = calculateTDE(initialDeneme).tdePuan;

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
                    konu: 'LGS Koçluk Başlangıç & Hedef Analiz Toplantısı',
                    notlar: `Öğrencinin başlangıç neti ${baslangic}, hedefi ${hedef} net (${lise}) olarak belirlendi. TDE turlama stratejisi devreye alındı.`,
                    dayaniklikPuani: 4
                }
            ],
            denemeler: [initialDeneme],
            createdAt: new Date().toISOString()
        };

        if (!Array.isArray(window.koclukData)) window.koclukData = [];
        window.koclukData.push(newRecord);
        if (typeof koclukData !== 'undefined') koclukData = window.koclukData;

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast(`🎯 ${student.adSoyad} başarıyla LGS Koçluk havuzuna eklendi!`, 'success');
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
        const printBtn = document.getElementById('btn-print-kocluk-report');
        if (printBtn) {
            printBtn.onclick = () => printSmartForm(kocId, 4);
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

        // Soru Kalite Piramidi & Konfor Alanı Hesabı
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const kazanim = lastTakip ? (Number(lastTakip.kazanimSoru) || 0) : 140;
        const yeniNesil = lastTakip ? (Number(lastTakip.yeniNesilSoru) || 0) : 360;
        const totalHaftalikSoru = Math.max(1, kazanim + yeniNesil);
        const yeniNesilOrani = yeniNesil / totalHaftalikSoru;
        const yeniNesilYuzde = Math.round(yeniNesilOrani * 100);
        const kazanimYuzde = 100 - yeniNesilYuzde;
        const isKonforAlani = yeniNesilOrani < 0.45;

        const phase = getCurrentLgsPhase();

        let konforAlaniHtml = '';
        if (isKonforAlani) {
            konforAlaniHtml = `
            <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; border-radius:8px; padding:12px 14px; margin-top:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#ef4444; font-size:12.5px;"><i class="fas fa-exclamation-triangle me-1"></i> ⚠️ Konfor Alanı Tuzağı Tespit Edildi!</strong>
                    <span style="background:rgba(239,68,68,0.15); color:#ef4444; padding:2px 8px; border-radius:4px; font-size:10.5px; font-weight:800;">Yeni Nesil: %${yeniNesilYuzde}</span>
                </div>
                <p style="margin:4px 0 0 0; font-size:12px; color:var(--text-main); line-height:1.45;">
                    Öğrenci soru sayısını doldurmak için kolay/kazanım sorularına ağırlık veriyor. <strong>Plato kırmak için Beceri Temelli soru oranını %50'ye çıkarınız.</strong>
                </p>
            </div>`;
        }

        container.innerHTML = `
            <!-- Aktif Pedagojik Faz & Strateji Bandı -->
            <div style="background:linear-gradient(135deg, rgba(99,102,241,0.06), rgba(16,185,129,0.06)); border:1px solid var(--border); border-radius:10px; padding:14px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                    <span style="background:${phase.badgeBg}; color:${phase.badgeColor}; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:800; text-transform:uppercase;">
                        📅 ${phase.name}
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
                        <input type="text" id="koc-edit-strateji" value="${escapeFn(item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.')}" placeholder="Örn: 120 saniyeyi aşan soruya [?] koyup geç." style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border); font-weight:700; color:var(--text-main); font-size:12px;">
                    </div>

                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">HEDEF LİSE:</label>
                        <input type="text" id="koc-edit-lise" value="${escapeFn(item.hedefLise || '')}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">HEDEF YÜZDELİK DİLİM:</label>
                        <input type="text" id="koc-edit-yuzdelik" value="${escapeFn(item.hedefYuzdelik || '')}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                        <div class="form-group" style="margin:0;">
                            <label style="font-size:11.5px; font-weight:700;">BAŞLANGIÇ NET:</label>
                            <input type="number" id="koc-edit-baslangic" value="${item.baslangicNeti || 70}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div class="form-group" style="margin:0;">
                            <label style="font-size:11.5px; font-weight:700;">HEDEF NET:</label>
                            <input type="number" id="koc-edit-hedef" value="${item.hedefNet || 88}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom:10px;">
                        <label style="font-size:11.5px; font-weight:700;">HAFTALIK HEDEF SORU SAYISI:</label>
                        <input type="number" id="koc-edit-soru-hedef" value="${item.haftalikHedefSoru || 600}" style="width:100%; padding:7px 10px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                </div>

                <!-- Sağ Kolon: Soru Piramidi & Koçluk Notu -->
                <div class="form-box" style="margin:0; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <h5 style="margin:0 0 12px 0; color:var(--secondary); font-size:13.5px;"><i class="fas fa-layer-group me-2"></i> Soru Kalite Piramidi &amp; Odak Dengesi</h5>
                        
                        <!-- Soru Piramidi Dağılımı -->
                        <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px; margin-bottom:12px;">
                            <div style="display:flex; justify-content:space-between; font-size:11.5px; margin-bottom:6px;">
                                <span style="font-weight:700; color:#3b82f6;">Kazanım: ${kazanim} (%${kazanimYuzde})</span>
                                <span style="font-weight:700; color:#8b5cf6;">Yeni Nesil: ${yeniNesil} (%${yeniNesilYuzde})</span>
                            </div>
                            <div style="width:100%; height:10px; background:var(--border); border-radius:6px; overflow:hidden; display:flex;">
                                <div style="width:${kazanimYuzde}%; background:#3b82f6;" title="Kazanım/Kavrama"></div>
                                <div style="width:${yeniNesilYuzde}%; background:#8b5cf6;" title="Yeni Nesil Beceri Temelli"></div>
                            </div>
                            <div style="display:flex; justify-content:space-between; font-size:10.5px; color:var(--text-muted); margin-top:4px;">
                                <span>İdeal: %20 Kavrama</span>
                                <span>İdeal: %30 Orta + %50 İleri Beceri Temelli</span>
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
                <td style="padding:10px; text-align:right;">
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
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <strong style="font-size:13px; color:var(--text-main);"><i class="fas fa-chart-pie me-1" style="color:var(--secondary);"></i> Metabilişsel Kök Neden Dağılımı (${total} Soru)</strong>
                    <div style="font-size:11.5px; display:flex; gap:12px; flex-wrap:wrap;">
                        <span style="color:#ef4444; font-weight:700;">🔴 A: %${pA}</span>
                        <span style="color:#f59e0b; font-weight:700;">🟡 B: %${pB}</span>
                        <span style="color:#ea580c; font-weight:700;">🟠 C: %${pC}</span>
                        <span style="color:#8b5cf6; font-weight:700;">🟣 D: %${pD}</span>
                    </div>
                </div>

                <div style="width:100%; height:14px; background:var(--input-bg); border-radius:8px; overflow:hidden; display:flex; border:1px solid var(--border);">
                    <div style="width:${pA}%; background:#ef4444;" title="Kod A (Bilgi): %${pA}"></div>
                    <div style="width:${pB}%; background:#f59e0b;" title="Kod B (Kurgu/Okuma): %${pB}"></div>
                    <div style="width:${pC}%; background:#ea580c;" title="Kod C (Süre/Dikkat): %${pC}"></div>
                    <div style="width:${pD}%; background:#8b5cf6;" title="Kod D (Bilişsel Direnç): %${pD}"></div>
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
                    <i class="fas fa-plus-circle me-1"></i> Yeni Yanlış/Boş Soru Kaydı Ekle (Metabilişsel Teşhis)
                </h5>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap:10px; margin-bottom:10px;">
                    <div>
                        <label style="font-size:11px; font-weight:700;">DERS:</label>
                        <select id="koc-new-err-ders" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                            <option value="Matematik">📘 Matematik</option>
                            <option value="Fen Bilimleri">🔬 Fen Bilimleri</option>
                            <option value="Türkçe">📕 Türkçe</option>
                            <option value="T.C. İnkılap">🇹🇷 T.C. İnkılap Tarihi</option>
                            <option value="İngilizce">🇬🇧 İngilizce</option>
                            <option value="Din Kültürü">🕌 Din Kültürü</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">KONU / KAZANIM:</label>
                        <input type="text" id="koc-new-err-konu" placeholder="Örn: EBOB-EKOK / Basınç" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">4 KÖK NEDEN KODU:</label>
                        <select id="koc-new-err-kok" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                            <option value="A">🔴 Kod A: Bilgi / Kazanım Eksikliği</option>
                            <option value="B">🟡 Kod B: Soru Kurgusu / Öncülü Yanlış Anlama</option>
                            <option value="C">🟠 Kod C: Süre Baskısı / Dikkatsizlik / İşlem Hatası</option>
                            <option value="D">🟣 Kod D: Soru Tipine Yabancılık / Bilişsel Direnç</option>
                        </select>
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
                            <th style="padding:10px;">Kök Neden</th>
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

    function getKökNedenBadge(code) {
        if (code === 'A') return '<span style="background:rgba(239,68,68,0.15);color:#ef4444;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:700;">🔴 Kod A: Bilgi</span>';
        if (code === 'B') return '<span style="background:rgba(245,158,11,0.15);color:#f59e0b;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:700;">🟡 Kod B: Kurgu/Okuma</span>';
        if (code === 'C') return '<span style="background:rgba(249,115,22,0.15);color:#ea580c;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:700;">🟠 Kod C: Dikkat/Süre</span>';
        return '<span style="background:rgba(139,92,246,0.15);color:#8b5cf6;padding:2px 7px;border-radius:6px;font-size:11px;font-weight:700;">🟣 Kod D: Bilişsel Direnç</span>';
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

        const denemeler = Array.isArray(item.denemeler) ? item.denemeler : [];

        // Çift Katmanlı Akıllı Plato & TDE Tespiti
        let platoTehisHtml = '';
        if (denemeler.length >= 3) {
            const last3 = denemeler.slice(-3);
            const netSpread = Math.max(...last3.map(d => Number(d.toplamNet) || 0)) - Math.min(...last3.map(d => Number(d.toplamNet) || 0));
            const avgTde = last3.reduce((acc, d) => acc + (d.tdePuan || calculateTDE(d).tdePuan), 0) / 3;

            if (netSpread <= 3) {
                if (avgTde < 75) {
                    platoTehisHtml = `
                    <div style="background:rgba(239,68,68,0.08); border-left:4px solid #ef4444; border-radius:8px; padding:14px; margin-bottom:16px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                            <strong style="color:#ef4444; font-size:13.5px;"><i class="fas fa-exclamation-triangle me-1"></i> Süreç Teşhisi: Turlama Disiplini Çöküşü</strong>
                            <span style="background:rgba(239,68,68,0.15); color:#ef4444; padding:2px 8px; border-radius:6px; font-weight:800; font-size:11px;">Ort. TDE: ${avgTde.toFixed(1)} / 100</span>
                        </div>
                        <p style="margin:0; font-size:12.5px; color:var(--text-main); line-height:1.5;">
                            Öğrencinin son netleri <strong>${last3.map(d => d.toplamNet).join(' → ')}</strong> aralığında sıkışmıştır. Bu tıkanıklık <strong>bilgi eksiğinden değil</strong>, süre yetiştirememe ve soru inatlaşmasından (Düşük TDE) kaynaklanmaktadır. 
                            <em>Müdahale:</em> 1. Turda Fen 32 dk / Mat 30 dk blok kuralı uygulanmalı ve 120 saniyeyi geçen sorular derhal işaretlenip geçilmelidir.
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
                            Öğrencinin sınav turlama stratejisi ve süre yönetimi kusursuzdur (TDE Yüksek). 70'li netlerdeki plato <strong>üst düzey beceri temelli sorulardaki kavramsal derinlik</strong> eksikliğindendir.
                            <em>Müdahale:</em> Hata defterindeki <strong>Kod A (Bilgi)</strong> ve <strong>Kod B (Kurgu/Öncül)</strong> sorularına cerrahi derinleşme uygulanmalı, çok adımlı deney soruları analiz edilmelidir.
                        </p>
                    </div>`;
                } else {
                    platoTehisHtml = `
                    <div style="background:rgba(245,158,11,0.08); border-left:4px solid #f59e0b; border-radius:8px; padding:14px; margin-bottom:16px;">
                        <strong style="color:#f59e0b; font-size:13px;"><i class="fas fa-chart-line me-1"></i> Standart Plato Uyarısı:</strong>
                        <p style="margin:4px 0 0 0; font-size:12.5px; color:var(--text-main);">Öğrencinin son netleri <strong>${last3.map(d => d.toplamNet).join(' → ')}</strong> aralığında dalgalanmaktadır. Hem 120 sn kuralı hem de hata defteri analizi birlikte yürütülmelidir.</p>
                    </div>`;
                }
            }
        }

        // Tablo Satırları
        let rowsHtml = '';
        denemeler.forEach(d => {
            const tde = calculateTDE(d);
            rowsHtml += `
            <tr style="border-bottom:1px solid var(--border); font-size:12.5px;">
                <td style="padding:10px; font-weight:700;">${escapeFn(d.ad)}</td>
                <td style="padding:10px; color:var(--text-muted); font-size:11.5px;">${escapeFn(d.tarih)}</td>
                <td style="padding:10px; text-align:center;">${d.sozelNet ?? (d.turkce ? (Number(d.turkce) + Number(d.inkilap || 0) + Number(d.din || 0) + Number(d.ingilizce || 0)) : '-')}</td>
                <td style="padding:10px; text-align:center; font-weight:700; color:var(--secondary);">${d.matNet ?? (d.matematik ?? '-')}</td>
                <td style="padding:10px; text-align:center; font-weight:700; color:var(--teal);">${d.fenNet ?? (d.fen ?? '-')}</td>
                <td style="padding:10px; text-align:center; font-size:14px; font-weight:800; color:var(--accent);">${d.toplamNet ?? '-'}</td>
                <td style="padding:10px; text-align:center;">
                    <span style="background:${tde.badgeBg}; color:${tde.badgeColor}; border:1px solid ${tde.badgeBorder}; padding:3px 8px; border-radius:6px; font-weight:800; font-size:11px;">
                        ${tde.tdePuan}/100 • ${tde.badgeText}
                    </span>
                </td>
                <td style="padding:10px; text-align:right;">
                    <button class="action-btn btn-delete" onclick="deleteDenemeEntry('${item.id}', '${d.id}')" title="Sil"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        });

        container.innerHTML = `
            ${platoTehisHtml}
            ${renderSvgNetTdeChart(denemeler)}

            <!-- Yeni Deneme Ekleme Formu -->
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:10px; padding:16px; margin-bottom:18px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h5 style="margin:0; font-size:13px; font-weight:700; color:var(--primary);">
                        <i class="fas fa-plus-circle me-1"></i> Yeni Deneme ve TDE Strateji Girişi
                    </h5>
                    <button type="button" class="btn btn-clear" onclick="toggleTdeDetailsPanel()" style="font-size:11.5px; padding:4px 10px;">
                        <i class="fas fa-cog me-1"></i> <span id="tde-toggle-text">TDE Turlama Detaylarını Göster</span>
                    </button>
                </div>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:10px; margin-bottom:12px;">
                    <div>
                        <label style="font-size:11px; font-weight:700;">DENEME ADI:</label>
                        <input type="text" id="koc-den-ad" placeholder="Örn: Kurumsal Deneme 4" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">SÖZEL NET (50):</label>
                        <input type="number" id="koc-den-sozel" step="0.25" placeholder="Örn: 46" oninput="updateAutoToplamNet()" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">MAT NET (20):</label>
                        <input type="number" id="koc-den-mat" step="0.25" placeholder="Örn: 14" oninput="updateAutoToplamNet()" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">FEN NET (20):</label>
                        <input type="number" id="koc-den-fen" step="0.25" placeholder="Örn: 16" oninput="updateAutoToplamNet()" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                    </div>
                    <div>
                        <label style="font-size:11px; font-weight:700;">TOPLAM NET (90):</label>
                        <input type="number" id="koc-den-toplam" readonly style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border); background:rgba(16,185,129,0.1); font-weight:800; color:#10b981;">
                    </div>
                </div>

                <!-- Katlanabilir TDE Metrik Paneli -->
                <div id="koc-tde-details-panel" style="display:none; background:var(--card-bg); border:1px dashed var(--secondary); border-radius:8px; padding:14px; margin-bottom:12px;">
                    <div style="font-size:12px; font-weight:700; color:var(--secondary); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                        <span><i class="fas fa-stopwatch me-1"></i> Turlama Disiplin Endeksi (TDE) Parametreleri</span>
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
                            <input type="number" id="koc-tde-fen1" value="32" oninput="liveCalculateTdePreview()" placeholder="İdeal: &lt;= 32" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">MAT 1. TUR SÜRE (DK):</label>
                            <input type="number" id="koc-tde-mat1" value="30" oninput="liveCalculateTdePreview()" placeholder="İdeal: &lt;= 30" style="width:100%; padding:6px; border-radius:6px; border:1px solid var(--border);">
                        </div>
                        <div>
                            <label style="font-size:11px; font-weight:700;">İNATLAŞILAN SORU (&gt;2.5 DK):</label>
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
                            Sınavın son 3 dakikasında sayfa sayfa optik kontrol protokolü uygulandı (+15p)
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
                            <th style="padding:10px; text-align:center;">TDE Skoru &amp; Teşhis</th>
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
        const topEl = document.getElementById('koc-den-toplam');
        if (topEl) {
            topEl.value = (s + m + f).toFixed(2);
        }
    }

    function liveCalculateTdePreview() {
        const badge = document.getElementById('koc-live-tde-badge');
        if (!badge) return;

        const dummy = {
            fen1TurSure: Number(document.getElementById('koc-tde-fen1')?.value) || 32,
            mat1TurSure: Number(document.getElementById('koc-tde-mat1')?.value) || 30,
            inatlasmaSayisi: Number(document.getElementById('koc-tde-inat')?.value) || 0,
            fen2TurKazanc: Number(document.getElementById('koc-tde-fen2')?.value) || 0,
            mat2TurKazanc: Number(document.getElementById('koc-tde-mat2')?.value) || 0,
            optikKontrol: document.getElementById('koc-tde-optik')?.checked
        };
        const res = calculateTDE(dummy);
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
        const toplam = parseFloat((sozel + mat + fen).toFixed(2));

        const cozumSirasi = document.getElementById('koc-tde-sira')?.value || 'Fen-Mat';
        const fen1TurSure = Number(document.getElementById('koc-tde-fen1')?.value) || 32;
        const mat1TurSure = Number(document.getElementById('koc-tde-mat1')?.value) || 30;
        const inatlasmaSayisi = Number(document.getElementById('koc-tde-inat')?.value) || 0;
        const fen2TurKazanc = Number(document.getElementById('koc-tde-fen2')?.value) || 0;
        const mat2TurKazanc = Number(document.getElementById('koc-tde-mat2')?.value) || 0;
        const optikKontrol = !!document.getElementById('koc-tde-optik')?.checked;

        const denemeObj = {
            id: 'den_' + Date.now(),
            ad,
            tarih: new Date().toLocaleDateString('tr-TR'),
            sozelNet: sozel,
            matNet: mat,
            fenNet: fen,
            toplamNet: toplam,
            cozumSirasi,
            fen1TurSure,
            mat1TurSure,
            inatlasmaSayisi,
            fen2TurKazanc,
            mat2TurKazanc,
            optikKontrol,
            tdePuan: 0
        };

        denemeObj.tdePuan = calculateTDE(denemeObj).tdePuan;

        if (!Array.isArray(item.denemeler)) item.denemeler = [];
        item.denemeler.push(denemeObj);

        if (typeof saveData === 'function') saveData(true);
        if (typeof showGlobalToast === 'function') {
            showGlobalToast('Deneme sınavı ve TDE strateji analizi kaydedildi.', 'success');
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

    // --- ALT SEKME 4: MENTORLUK & GÖRÜŞME GÜNLÜĞÜ ---
    function renderSubTabGorusmeler(item) {
        const container = document.getElementById('koc-subtab-gorusme-body');
        if (!container) return;

        const gorusmeler = Array.isArray(item.gorusmeler) ? item.gorusmeler : [];

        let cardsHtml = '';
        gorusmeler.forEach(g => {
            cardsHtml += `
            <div style="background:var(--card-bg); border:1px solid var(--border); border-left:4px solid var(--secondary); border-radius:8px; padding:12px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <strong style="color:var(--text-main); font-size:13px;">${escapeFn(g.konu)}</strong>
                    <div style="font-size:11.5px; color:var(--text-muted); display:flex; align-items:center; gap:8px;">
                        <span><i class="fas fa-calendar-alt"></i> ${escapeFn(g.tarih)}</span>
                        <span style="background:rgba(99,102,241,0.1); color:#6366f1; padding:2px 6px; border-radius:4px; font-weight:700;">
                            Dayanıklılık: ${g.dayaniklikPuani || 4}/5 ⭐
                        </span>
                    </div>
                </div>
                <p style="margin:0; font-size:12.5px; color:var(--text-muted); line-height:1.5;">${escapeFn(g.notlar)}</p>
            </div>`;
        });

        container.innerHTML = `
            <div style="background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:14px; margin-bottom:16px;">
                <h5 style="margin:0 0 10px 0; font-size:13px; font-weight:700; color:var(--primary);"><i class="fas fa-comments me-1"></i> Yeni Bilişsel Görüşme Notu Ekle</h5>
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
            notlar
        });

        if (typeof saveData === 'function') saveData(true);
        renderSubTabGorusmeler(item);
    }

    // --- ALT SEKME 5: GELİŞMİŞ YAPAY ZEKA KOÇLUK & ÇİFT MODLU VELİ BÜLTENİ ---
    function renderSubTabAiPrompt(item) {
        const container = document.getElementById('koc-subtab-ai-body');
        if (!container) return;

        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme) : { tdePuan: 75 };

        container.innerHTML = `
            <div style="background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.08)); border: 2px dashed #6366f1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🧠</div>
                <h4 style="margin: 0 0 8px 0; color: #4f46e5; font-size: 16px;">5 Modüllük LGS Bilişsel Koçluk &amp; TDE Raporu (Google Gemini)</h4>
                <p style="margin: 0 0 16px 0; color: var(--text-muted); font-size: 13px; max-width: 600px; margin-inline: auto;">
                    <strong>${escapeFn(item.adSoyad)}</strong> için branş netleri (Sözel, Mat, Fen), <strong>TDE Skoru (${tde.tdePuan}/100)</strong>, baskın hata kök neden kodu ve hedef lise parametreleri tam otomatik enjekte edilerek profesyonel prompt hazırlanmıştır.
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
    // 6. GELİŞMİŞ GEMINI AI PROMPT ENTEGRASYONU
    // ─────────────────────────────────────────────────────────────
    async function runAiCoachingForStudent(kocId) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(kocId));
        if (!item) return;

        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme) : { tdePuan: 75, badgeText: 'Normal' };

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
            'A': 'Kod A (Bilgi / Kavram Eksikliği)',
            'B': 'Kod B (Soru Kurgusunu / Öncülü Yanlış Anlama)',
            'C': 'Kod C (Süre Baskısı / Dikkatsizlik / İşlem Hatası)',
            'D': 'Kod D (Bilişsel Direnç / İnatlaşma & Donma)'
        };

        const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue);
        let hataAnalizMetni = '';
        if (dueErrors.length > 0) {
            hataAnalizMetni = dueErrors.slice(0, 5).map(e => `  • ${e.ders} (${e.konu}): Kök Neden ${e.kokNeden} - ${e.soruNotu || ''}`).join('\n');
        } else {
            hataAnalizMetni = '  (Günü gelmiş gecikmiş hata yok, pekiştirme döngüsü düzenli işliyor)';
        }

        const phase = getCurrentLgsPhase();
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const kazanim = lastTakip ? (Number(lastTakip.kazanimSoru) || 0) : 150;
        const yeniNesil = lastTakip ? (Number(lastTakip.yeniNesilSoru) || 0) : 350;
        const piramidYuzde = Math.round((yeniNesil / Math.max(1, kazanim + yeniNesil)) * 100);

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

        const prompt = `Sen; 8. sınıf LGS hazırlık süreçlerinde uzmanlaşmış, gelişim psikolojisi, bilişsel koçluk, ergenlik dönemi pedagojisi ve sınav stratejileri alanında 15+ yıl deneyimli kıdemli bir Pedagog ve Bilişsel Eğitim Koçusun.
Yaklaşımın; ezberci veya baskıcı değil, "içsel motivasyonu tetikleyen", "bilişsel yükü optimize eden" ve "metabilişsel (öğrenmeyi öğrenme) becerileri geliştiren" modern eğitim bilimleri ilkelerine dayanır.

════════════════════════════════════════════════════════════════════
ÖĞRENCİ PROFİLİ VE GÜNCEL TDE / DENEME VERİLERİ
════════════════════════════════════════════════════════════════════
- Öğrenci Adı Soyadı : ${item.adSoyad} (Sınıf: ${item.sinif}, No: ${item.studentNo})
- Aktif LGS Fazı     : ${phase.name} - ${phase.title}
- Haftanın Stratejisi: "${item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.'}"
- Öğrenme Stili (VAK): ${item.vak || 'Analitik / Görsel'}
- Mevcut Genel Net   : 90 soru üzerinden ${latestNet} Net
- Son Deneme Branşları: Sözel: ${lastDeneme?.sozelNet ?? 45}/50 | Mat: ${lastDeneme?.matNet ?? 13}/20 | Fen: ${lastDeneme?.fenNet ?? 15}/20
- Turlama Disiplin Endeksi (TDE): ${tde.tdePuan}/100 (${tde.badgeText})
  * Çözüm Sırası: ${lastDeneme?.cozumSirasi || 'Fen-Mat'}
  * Fen 1. Tur Süresi: ${lastDeneme?.fen1TurSure || 32} dk | Mat 1. Tur Süresi: ${lastDeneme?.mat1TurSure || 30} dk
  * İnatlaşılan Soru (>2.5 dk): ${lastDeneme?.inatlasmaSayisi || 0} adet
  * 2. Tur Net Kazancı: Fen +${lastDeneme?.fen2TurKazanc || 0}, Mat +${lastDeneme?.mat2TurKazanc || 0}
- Hedef Lise & Dilim : ${item.hedefLise} (Dilim: ${item.hedefYuzdelik || '%1.0'})
- Hedef Net          : ${item.hedefNet} Net (Başlangıç: ${item.baslangicNeti} Net)
- Soru Kalite Piramidi: %${100 - piramidYuzde} Kazanım / %${piramidYuzde} Yeni Nesil Beceri Temelli ${piramidYuzde < 45 ? '(⚠️ Konfor Alanı Tuzağı: Kolay soru ağırlıklı!)' : '(Dengeli Dağılım)'}
- Haftalık Soru Hedefi: ${item.haftalikHedefSoru || 600} Soru
- Bilişsel Gözlem    : ${item.bilesenNotu || 'Sayısal oturumda çok adımlı sorularda zaman baskısı hissediyor, sözel muhakemesi kuvvetli.'}

Metabilişsel Hata Defteri & Isı Haritası Durumu:
- Toplam Kayıt: ${errors.length} adet hatalı soru
- Baskın Kök Neden: %${dominantPercent} ile ${dominantMap[dominantCode]}
- Isı Haritasında Kırmızı (Cerrahi) Konular: ${redTopics}
- Günü Gelmiş / Gecikmiş Tekrar Sayısı: ${dueErrors.length} adet
${hataAnalizMetni}

════════════════════════════════════════════════════════════════════
GÖREV VE BEKLENEN ÇIKTI MODÜLLERİ
════════════════════════════════════════════════════════════════════
Bu öğrenci için aşağıdaki 5 ana modülü içeren somut, pedagojik ve doğrudan uygulanabilir bir "LGS Hazırlık ve Rehberlik Sistemi" hazırla:

---
MODÜL 1: STRATEJİK HAFTALIK ÇALIŞMA VE DERS DAĞILIM MODELİ
- Haftalık toplam çalışma süresi ve oturum blokları (40+10 veya 75+15 LGS adaptasyon blokları).
- Seviye Piramidi: %20 Kavrama/Tekrar, %30 Orta Seviye Yeni Nesil, %50 İleri Düzey Beceri Temelli/Muhakeme.
- Öğrencinin ${item.haftalikHedefSoru || 600} soru hedefine uygun 7 günlük dengeli program (zihinsel deşarj pencereleri dahil).

---
MODÜL 2: METABİLİŞSEL HATA DEFTERİ VE CERRAHİ REÇETE
- Öğrencinin baskın kök nedeni olan "${dominantMap[dominantCode]}" teşhisine yönelik cerrahi müdahale adımları.
- 1 gün, 3 gün ve 14 gün aralıklı tekrar (Spaced Repetition) için pratik çalışma yönergesi.

---
MODÜL 3: SINAV STRATEJİLERİ VE TDE SÜRE YÖNETİMİ
- Öğrencinin ${tde.tdePuan}/100 olan TDE puanını 90 üzerine çıkarmak için dakika dakika turlama planı (Fen 1. tur <= 32 dk, Mat 1. tur <= 30 dk).
- 120. saniyede soruyu terk etme (turlama işareti koyup geçme) kronometre antrenmanı.
- Sınavda zihinsel donma yaşandığında uygulanacak 30 saniyelik mikro regülasyon (nefes ve resetleme) manevrası.

---
MODÜL 4: SINAV PSİKOLOJİSİ, MOTİVASYON VE ÖZ-DÜZENLEME
- ${latestNet} net bandındaki platoyu aşıp ${item.hedefNet} nete ulaşmak için psikolojik dayanıklılık (mental toughness) adımları.
- Başarısızlık korkusu ve mükemmeliyetçilikle baş etme.
- Pazar akşamı öğrencinin kendini değerlendireceği 5 maddelik rubrik.

---
MODÜL 5: VELİ VE MENTOR İLETİŞİM PROTOKOLÜ
- Evdeki huzur, uyku ve beslenme standartları.
- Haftalık 10-15 dakikalık "Krizsiz Değerlendirme Çemberi" konuşma taslağı (Öğrenciye asla söylenmemesi gereken tetikleyici cümleler ve yapıcı sorular).

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
            showGlobalToast('🧠 Gelişmiş LGS & TDE Koçluk Promptu Panoya Kopyalandı ve Gemini Açıldı!', 'success');
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

        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme) : { tdePuan: 75 };
        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const completedErrors = errors.filter(h => h.tekrar1 && h.tekrar3 && h.tekrar14).length;
        const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue).length;

        let msg = '';

        if (mode === 'krizsiz') {
            // Mod 2: TDE < 70 / Plato Krizsiz Analiz Modu
            msg = `🛡️ *LGS Hazırlık Süreci: Veli Krizsiz Rehberlik Bülteni* 🛡️

Değerli Velimiz,
Öğrencimiz *${item.adSoyad}* ile yürüttüğümüz son deneme analizinde önemli bir pedagojik bulgu tespit ettik.

📊 *Süreç Teşhisi:*
Öğrencimizin konu bilgi eksiği değil; sınav anında turlama stratejisi ve süre yönetimi dalgalanması (TDE Skoru: ${tde.tdePuan}/100) yaşadığını gözlemledik.

⚠️ *ÇOK ÖNEMLİ RİCA:*
Lütfen öğrencimizle bu akşam *kesinlikle net, doğru/yanlış sayısı veya sıralama konuşmayınız!*

🏠 *Evde Uygulanacak 10 Dakikalık "Krizsiz Analiz" Konuşma Rehberi:*
1. *Güvenli Alan:* "Bugünkü deneme sonucun ne olursa olsun bizim için çok kıymetlisin. Bu sadece bir taktik tatbikatı."
2. *Nesnel Süre İncelemesi:* "Hangi sorularda 2.5 dakikadan fazla inatlaştın? O sorulardan bir iki tanesini birlikte inceleyelim mi?"
3. *Batık Maliyet Farkındalığı:* "Zor bir soruyla inatlaşmayıp 'işaret koyup geçmek' puan kaybettirmez; arkadaki kolay 3 soruyu kurtarır."
4. *Gelecek Deneme İçin Tek Kural:* "Gelecek sınavda senden tek bir hedef istiyoruz: 2 dakikayı geçen soruyu hemen turlayıp geçmek."

Unutmayınız; şampiyonlar hiç hata yapmayanlar değil, hatalarından en hızlı strateji üretenlerdir. Birlikte aşacağız! 🚀`;
        } else {
            // Mod 1: Standart Haftalık Gelişim Bülteni
            msg = `🌟 *LGS Hazırlık & Bilişsel Gelişim Bülteni* 🌟

Değerli Velimiz,
Öğrencimiz *${item.adSoyad}* ile yürüttüğümüz LGS hazırlık ve bilişsel koçluk sürecine dair bu haftaki değerlendirme özetimiz:

🎯 *Hedef Lise:* ${item.hedefLise} (Hedef Dilim: ${item.hedefYuzdelik || '%1.0'})
📊 *Son Net Seviyesi:* ${latestNet} Net (Hedef: ${item.hedefNet} Net)
⏱️ *Turlama Disiplin Endeksi (TDE):* ${tde.tdePuan}/100 (${tde.badgeText})
📚 *Haftalık Soru Disiplini:* Hedeflenen ${item.haftalikHedefSoru || 600} soru temposunda ilerliyor.
📕 *Metabilişsel Hata Defteri:* Toplam ${errors.length} analiz edilmiş sorudan *${completedErrors} adedi kalıcı hafızaya alındı.* (${dueErrors} soru tekrar havuzunda).

💡 *Ev İçi Koçluk Tavsiyemiz:*
Lütfen net sayısından ziyade, öğrencinin soru çözerken gösterdiği odaklanma süresini ve gayretini takdir ediniz. Dinlenme saatlerinde ekran yerine zihinsel dinlenme sağlayan aktivitelere teşvik edelim.

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

        const latestNet = getStudentLatestNet(item);
        const lastDeneme = (Array.isArray(item.denemeler) && item.denemeler.length > 0) ? item.denemeler[item.denemeler.length - 1] : null;
        const tde = lastDeneme ? calculateTDE(lastDeneme) : { tdePuan: 75, badgeText: 'Orta Düzey' };
        const phase = getCurrentLgsPhase();
        const errors = Array.isArray(item.hataDefteri) ? item.hataDefteri : [];
        const strategyRule = item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.';

        let html = '';

        if (formType === 1) {
            // ============================================================
            // FORM-1: Kişiselleştirilmiş Haftalık Blok Çalışma & Soru Piramidi
            // ============================================================
            const dueErrors = errors.filter(h => getHataRepeatStatus(h).isDue).slice(0, 5);
            let errRows = '';
            dueErrors.forEach(e => {
                errRows += `
                <tr>
                    <td style="font-weight:bold;">${escapeFn(e.ders)}</td>
                    <td>${escapeFn(e.konu)}</td>
                    <td style="text-align:center;">Kod ${escapeFn(e.kokNeden)}</td>
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
                <tr><td style="height:18px;"></td><td></td><td></td><td></td><td style="text-align:center;">☐ 1.G</td><td style="text-align:center;">☐ 3.G</td><td style="text-align:center;">☐ 14.G</td></tr>
                <tr><td style="height:18px;"></td><td></td><td></td><td></td><td style="text-align:center;">☐ 1.G</td><td style="text-align:center;">☐ 3.G</td><td style="text-align:center;">☐ 14.G</td></tr>`;
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
            <div style="font-size:10px; color:#64748b;">${phase.name}: ${phase.title}</div>
        </div>
        <div style="text-align:right; font-size:9.5px; color:#64748b;">Hafta: ${new Date().toLocaleDateString('tr-TR')}</div>
    </div>

    <div class="info-grid">
        <div><strong>Öğrenci:</strong> ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)})</div>
        <div><strong>Hedef Lise:</strong> ${escapeFn(item.hedefLise)} (${escapeFn(item.hedefYuzdelik || '%1.0')})</div>
        <div><strong>Mevcut / Hedef:</strong> ${latestNet} Net / ${item.hedefNet} Net</div>
        <div><strong>Haftalık Hedef:</strong> ${item.haftalikHedefSoru || 600} Soru (%50 Yeni Nesil)</div>
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
                <th style="width:18%;">Ders</th>
                <th style="width:25%;">Konu / Kazanım</th>
                <th style="width:12%; text-align:center;">Kök Neden</th>
                <th>Soru Teşhisi / Not</th>
                <th style="width:8%; text-align:center;">1. Gün</th>
                <th style="width:8%; text-align:center;">3. Gün</th>
                <th style="width:8%; text-align:center;">14. Gün</th>
            </tr>
        </thead>
        <tbody>
            ${errRows}
        </tbody>
    </table>

    <!-- 2. Bölüm: 7 Günlük Blok Çalışma & Soru Piramidi Tablosu -->
    <div class="sec-title">
        <span>⏱️ 7 Günlük Blok Odaklanma (75/80 dk) &amp; Soru Kalite Piramidi</span>
        <span style="font-size:9.5px; color:#64748b;">İdeal: %20 Kazanım | %30 Orta Yeni Nesil | %50 İleri Beceri Temelli</span>
    </div>
    <table>
        <thead>
            <tr>
                <th style="width:12%;">Gün</th>
                <th style="width:23%;">1. Oturum (Sözel 75 dk)</th>
                <th style="width:23%;">2. Oturum (Sayısal 80 dk)</th>
                <th style="width:14%; text-align:center;">Kazanım Soru</th>
                <th style="width:14%; text-align:center;">Yeni Nesil Soru</th>
                <th style="width:7%; text-align:center;">Toplam</th>
                <th style="width:7%; text-align:center;">Odak</th>
            </tr>
        </thead>
        <tbody>
            <tr><td style="font-weight:bold;">Pazartesi</td><td>Türkçe + Din Kültürü</td><td>Matematik (EBOB-EKOK / Üslü)</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Salı</td><td>İnkılap Tarihi + İngilizce</td><td>Fen Bilimleri (Mevsimler/İklim)</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Çarşamba</td><td>Türkçe Paragraf / Muhakeme</td><td>Matematik Çok Adımlı Problemler</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Perşembe</td><td>Din + İnkılap Kavrama</td><td>Fen Bilimleri DNA &amp; Genetik</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold;">Cuma</td><td>İngilizce Kelime &amp; Okuma</td><td>Matematik Geometrik Olasılık</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">⭐</td></tr>
            <tr><td style="font-weight:bold; background:#fef3c7;">Cumartesi</td><td colspan="2" style="text-align:center; font-weight:bold; color:#b45309;">🎯 GENEL LGS DENEME PROVASI (Sözel 75 dk + Sayısal 80 dk)</td><td style="text-align:center;">.......</td><td style="text-align:center;">.......</td><td style="text-align:center;">90 S</td><td style="text-align:center;">⭐</td></tr>
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
            <h2>⏱️ FORM-2: Deneme Sonrası Acil Triyaj ve TDE Analiz Formu</h2>
            <div style="font-size:9.5px; color:#64748b;">Öğrenci: ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | Son TDE: ${tde.tdePuan}/100</div>
        </div>
        <div style="text-align:right; font-size:9px; color:#64748b;">Deneme: ${escapeFn(lastDeneme?.ad || 'LGS Deneme')} (${lastDeneme?.tarih || new Date().toLocaleDateString('tr-TR')})</div>
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
            <tr><td style="font-weight:bold;">T.C. İnkılap</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">12 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold;">Din Kültürü</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">10 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold;">İngilizce</td><td style="text-align:center;">10</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">.......</td><td style="text-align:center;">12 dk</td><td></td><td></td></tr>
            <tr style="background:#f8fafc;"><td style="font-weight:bold; color:#1e3a8a;">SÖZEL TOPLAM</td><td style="text-align:center; font-weight:bold;">50</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold; color:#1e3a8a;">${lastDeneme?.sozelNet ?? '.......'}</td><td style="text-align:center; font-weight:bold;">64-70 dk</td><td></td><td></td></tr>
            <tr><td style="font-weight:bold; color:#b45309;">Fen Bilimleri</td><td style="text-align:center;">20</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">${lastDeneme?.fenNet ?? '.......'}</td><td style="text-align:center;">32 dk</td><td style="text-align:center;">${lastDeneme?.fen1TurSure ? lastDeneme.fen1TurSure + ' dk' : ''}</td><td></td></tr>
            <tr><td style="font-weight:bold; color:#4338ca;">Matematik</td><td style="text-align:center;">20</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold;">${lastDeneme?.matNet ?? '.......'}</td><td style="text-align:center;">30 dk</td><td style="text-align:center;">${lastDeneme?.mat1TurSure ? lastDeneme.mat1TurSure + ' dk' : ''}</td><td></td></tr>
            <tr style="background:#fef3c7;"><td style="font-weight:bold; color:#b45309;">GENEL TOPLAM</td><td style="text-align:center; font-weight:bold;">90</td><td></td><td></td><td></td><td style="text-align:center; font-weight:bold; color:#b45309; font-size:11px;">${lastDeneme?.toplamNet ?? latestNet} Net</td><td style="text-align:center; font-weight:bold;">155 dk</td><td colspan="2" style="text-align:center; font-weight:bold;">TDE: ${tde.tdePuan}/100</td></tr>
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
            <div>Soruyla 2.5 dakikadan fazla inatlaştım, bırakamadım ve sınav koptu.</div>
        </div>
    </div>

    <!-- Hata Kütüğü -->
    <div class="sec-title"><span>3. Acil Cerrahi Hata Kütüğü (En Kritik 6 Soru)</span></div>
    <table>
        <thead>
            <tr>
                <th style="width:14%;">Ders</th><th style="width:8%; text-align:center;">Soru No</th><th style="width:14%; text-align:center;">Kök Neden</th><th>Neden Yanlış Yaptım? / Doğru Yaklaşım</th><th style="width:14%; text-align:center;">Tekrar Döngüsü</th>
            </tr>
        </thead>
        <tbody>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
            <tr><td></td><td style="text-align:center;"></td><td style="text-align:center;">[A] [B] [C] [D]</td><td></td><td style="text-align:center;">☐ 1G  ☐ 3G  ☐ 14G</td></tr>
        </tbody>
    </table>

    <!-- 25 Puanlık TDE Rubriği -->
    <div class="rubrik">
        <strong style="color:#b45309;">📊 25 Puanlık Sınav Taktik &amp; Turlama Öz-Değerlendirmesi:</strong>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px; margin-top:3px;">
            <div>☐ 1. Fen Bilimleri 1. turu 32 dakikada tamamlandı mı? (+5p)</div>
            <div>☐ 2. Matematik 1. turu 30 dakikada tamamlandı mı? (+5p)</div>
            <div>☐ 3. 120 saniyeyi geçen hiçbir soruyla inatlaşılmadı mı? (+5p)</div>
            <div>☐ 4. 2. turda geri dönülüp en az 3 net kazanıldı mı? (+5p)</div>
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
                                <strong style="color: #b45309;">4 Kök Neden Kodu:</strong>
                                <div style="display: flex; gap: 4px; margin-top: 2px; font-weight: bold;">
                                    <span>[${err?.kokNeden === 'A' ? 'X' : ' '}] A (Bilgi)</span>
                                    <span>[${err?.kokNeden === 'B' ? 'X' : ' '}] B (Kurgu)</span>
                                    <span>[${err?.kokNeden === 'C' ? 'X' : ' '}] C (Süre)</span>
                                    <span>[${err?.kokNeden === 'D' ? 'X' : ' '}] D (Direnç)</span>
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
            <div style="font-size:9.5px; color:#64748b;">Öğrenci: ${escapeFn(item.adSoyad)} (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | Hedef: ${escapeFn(item.hedefLise)}</div>
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
                const dTde = calculateTDE(d);
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
                errRows += `
                <tr>
                    <td style="font-weight:bold;">${escapeFn(e.ders)}</td>
                    <td>${escapeFn(e.konu)}</td>
                    <td style="text-align:center;">Kod ${escapeFn(e.kokNeden)}</td>
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
    <title>FORM-4: LGS Koçluk & Mutabakat Raporu - ${escapeFn(item.adSoyad)}</title>
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
            <h2>🧠 FORM-4: LGS Bilişsel Koçluk Raporu &amp; Veli-Öğrenci Mutabakatı</h2>
            <div style="font-size:10px; color:#64748b;">Dönem: ${phase.name} | Strateji Kuralı: "${escapeFn(strategyRule)}"</div>
        </div>
        <div style="text-align:right; font-size:9.5px; color:#64748b;">Tarih: ${new Date().toLocaleDateString('tr-TR')}</div>
    </div>

    <div class="grid-info">
        <div class="info-cell"><strong>Öğrenci Adı Soyadı</strong><span>${escapeFn(item.adSoyad)}</span></div>
        <div class="info-cell"><strong>Sınıf / No</strong><span>${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}</span></div>
        <div class="info-cell"><strong>Hedef Lise / Dilim</strong><span>${escapeFn(item.hedefLise)} (${escapeFn(item.hedefYuzdelik || '%1.0')})</span></div>
        <div class="info-cell"><strong>Güncel Net / Hedef</strong><span>${latestNet} Net / ${item.hedefNet} Net</span></div>
        <div class="info-cell"><strong>Öğrenme Stili (VAK)</strong><span>${escapeFn(item.vak || 'Analitik / Görsel')}</span></div>
        <div class="info-cell"><strong>Haftalık Soru Hedefi</strong><span>${item.haftalikHedefSoru || 600} Soru</span></div>
        <div class="info-cell"><strong>Son TDE Skoru</strong><span style="color:#d97706; font-weight:bold;">${tde.tdePuan}/100 (${escapeFn(tde.badgeText)})</span></div>
        <div class="info-cell"><strong>Kayıtlı Hata Sayısı</strong><span>${totalErr} Soru</span></div>
    </div>

    <!-- Deneme Tablosu -->
    <div class="sec-box">
        <div class="sec-title"><span>📈 Deneme Sınavları &amp; Turlama Disiplin Endeksi (TDE)</span><span>Maks Net: 90</span></div>
        <table>
            <thead>
                <tr>
                    <th>Deneme Adı</th><th>Tarih</th><th style="text-align:center;">Sözel (50)</th><th style="text-align:center;">Mat (20)</th><th style="text-align:center;">Fen (20)</th><th style="text-align:center;">Toplam</th><th style="text-align:center;">TDE Skoru</th>
                </tr>
            </thead>
            <tbody>${denRows}</tbody>
        </table>
    </div>

    <!-- Hata Dağılımı -->
    <div class="sec-box">
        <div class="sec-title">
            <span>📕 Metabilişsel Hata Defteri &amp; Aralıklı Tekrar Çizelgesi</span>
            <span style="font-size:9.5px; color:#64748b;">A: %${pA} | B: %${pB} | C: %${pC} | D: %${pD}</span>
        </div>
        <div class="root-bar">
            <div style="width:${pA}%; background:#ef4444;" title="A: Bilgi"></div>
            <div style="width:${pB}%; background:#f59e0b;" title="B: Kurgu"></div>
            <div style="width:${pC}%; background:#ea580c;" title="C: Dikkat"></div>
            <div style="width:${pD}%; background:#8b5cf6;" title="D: Direnç"></div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Ders</th><th>Konu</th><th style="text-align:center;">Kök</th><th>Teşhis Notu</th><th style="text-align:center;">1. Gün</th><th style="text-align:center;">3. Gün</th><th style="text-align:center;">14. Gün</th>
                </tr>
            </thead>
            <tbody>${errRows}</tbody>
        </table>
    </div>

    <!-- Mutabakat & Protokol -->
    <div class="mutabakat">
        <strong style="color:#15803d; font-size:10.5px;">🤝 Veli - Öğrenci Haftalık Mutabakatı &amp; Uyku Hijyeni Protokolü:</strong>
        <p style="margin:3px 0 0 0; line-height:1.4;">
            1. <strong>Uyku Hijyeni:</strong> Öğrenci zihinsel toparlanma için her akşam en geç <strong>22:30'da</strong> yatakta olacak; mavi ışık (telefon/tablet) kapatılacaktır.<br>
            2. <strong>Ev İçi İletişim:</strong> Evde kesinlikle net sayısı, sıralama ve kıyaslama konuşulmayacak; sadece soru çözme disiplini ve odak takdir edilecektir.<br>
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
    // 9. 60 SANİYELİK HIZLI VERİ GİRİŞ SİHİRBAZI MOTORU
    // ─────────────────────────────────────────────────────────────
    function openQuickWeeklySyncModal(studentId) {
        const targetId = studentId || activeKoclukId;
        const item = (window.koclukData || []).find(k => String(k.id) === String(targetId));
        if (!item) {
            alert('Lütfen hızlı veri girişi yapılacak öğrenciyi seçiniz.');
            return;
        }

        activeKoclukId = targetId;

        // Başlık Rozetini Güncelle
        const badge = document.getElementById('koc-sync-student-badge');
        if (badge) {
            badge.innerHTML = `<strong>${escapeFn(item.adSoyad)}</strong> (${escapeFn(item.sinif)} - No: ${escapeFn(item.studentNo)}) | Hedef: ${escapeFn(item.hedefLise)}`;
        }

        // 1. Soru Piramidi Verilerini Doldur
        const lastTakip = (Array.isArray(item.haftalikTakip) && item.haftalikTakip.length > 0) ? item.haftalikTakip[item.haftalikTakip.length - 1] : null;
        const kazanimEl = document.getElementById('sync-soru-kazanim');
        const yeniNesilEl = document.getElementById('sync-soru-yeninesil');
        const uykuEl = document.getElementById('sync-uyku');
        const blokEl = document.getElementById('sync-blok');

        if (kazanimEl) kazanimEl.value = lastTakip ? (lastTakip.kazanimSoru || 150) : 150;
        if (yeniNesilEl) yeniNesilEl.value = lastTakip ? (lastTakip.yeniNesilSoru || 350) : 350;
        if (uykuEl) uykuEl.value = lastTakip ? (lastTakip.uykuOrtalamasi || 8) : 8;
        if (blokEl) blokEl.value = lastTakip ? (lastTakip.odakBlokSayisi || 12) : 12;

        // 2. Deneme Alanlarını Sıfırla / Hazırla
        document.getElementById('sync-den-ad').value = '';
        document.getElementById('sync-den-sozel').value = '';
        document.getElementById('sync-den-mat').value = '';
        document.getElementById('sync-den-fen').value = '';
        document.getElementById('sync-den-toplam').value = '';
        document.getElementById('sync-tde-fen1').value = '32';
        document.getElementById('sync-tde-mat1').value = '30';
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
            ruleEl.value = item.aktifStratejiKurali || 'Sayısal oturumda 120 saniyeyi aşan soruya [?] koyup derhal geç.';
        }

        const modal = document.getElementById('kocluk-quick-sync-modal');
        if (modal) modal.style.display = 'flex';
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
        const fen1 = Number(document.getElementById('sync-tde-fen1')?.value) || 32;
        const mat1 = Number(document.getElementById('sync-tde-mat1')?.value) || 30;
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
        });

        const badge = document.getElementById('sync-live-tde-badge');
        if (badge) {
            badge.textContent = `Canlı TDE: ${tde.tdePuan}/100 • ${tde.badgeText}`;
            badge.style.background = tde.badgeBg;
            badge.style.color = tde.badgeColor;
        }
    }

    function submitQuickWeeklySync(andPrintForm1 = false) {
        const item = (window.koclukData || []).find(k => String(k.id) === String(activeKoclukId));
        if (!item) return;

        // 1. Haftalık Takip Verisi
        const kazanim = Number(document.getElementById('sync-soru-kazanim')?.value) || 0;
        const yeniNesil = Number(document.getElementById('sync-soru-yeninesil')?.value) || 0;
        const uyku = Number(document.getElementById('sync-uyku')?.value) || 8;
        const blok = Number(document.getElementById('sync-blok')?.value) || 0;

        if (!Array.isArray(item.haftalikTakip)) item.haftalikTakip = [];
        item.haftalikTakip.push({
            id: 'wt_' + Date.now(),
            haftaTarihi: new Date().toLocaleDateString('tr-TR'),
            kazanimSoru: kazanim,
            yeniNesilSoru: yeniNesil,
            uykuOrtalamasi: uyku,
            odakBlokSayisi: blok
        });

        // 2. Yeni Deneme Girişi (Eğer deneme adı girildiyse)
        const denAd = document.getElementById('sync-den-ad')?.value.trim();
        if (denAd) {
            const sozel = parseFloat(document.getElementById('sync-den-sozel')?.value) || 0;
            const mat = parseFloat(document.getElementById('sync-den-mat')?.value) || 0;
            const fen = parseFloat(document.getElementById('sync-den-fen')?.value) || 0;
            const toplam = parseFloat(document.getElementById('sync-den-toplam')?.value) || (sozel + mat + fen);
            const fen1 = Number(document.getElementById('sync-tde-fen1')?.value) || 32;
            const mat1 = Number(document.getElementById('sync-tde-mat1')?.value) || 30;
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
            });

            if (!Array.isArray(item.denemeler)) item.denemeler = [];
            item.denemeler.push({
                id: 'den_' + Date.now(),
                ad: denAd,
                tarih: new Date().toLocaleDateString('tr-TR'),
                sozelNet: sozel,
                matNet: mat,
                fenNet: fen,
                toplamNet: Math.round(toplam * 100) / 100,
                cozumSirasi: 'Fen-Mat',
                fen1TurSure: fen1,
                mat1TurSure: mat1,
                inatlasmaSayisi: inat,
                fen2TurKazanc: fen2,
                mat2TurKazanc: mat2,
                optikKontrol: optik,
                tdePuan: tdeInfo.tdePuan
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
            showGlobalToast(`⚡ ${item.adSoyad} için haftalık veriler ve TDE başarıyla senkronize edildi!`, 'success');
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
    window.saveNewDenemeEntry = saveNewDenemeEntry;
    window.deleteDenemeEntry = deleteDenemeEntry;
    window.addGorusmeNote = addGorusmeNote;
    window.runAiCoachingForStudent = runAiCoachingForStudent;
    window.openParentWhatsAppShareModal = openParentWhatsAppShareModal;
    window.sendParentWhatsAppMessage = sendParentWhatsAppMessage;
    window.printKoclukReport = printKoclukReport;
    window.openKoclukPrintCenter = openKoclukPrintCenter;
    window.printSmartForm = printSmartForm;
    window.openQuickWeeklySyncModal = openQuickWeeklySyncModal;
    window.syncUpdateAutoNet = syncUpdateAutoNet;
    window.syncLiveTdePreview = syncLiveTdePreview;
    window.submitQuickWeeklySync = submitQuickWeeklySync;
    window.calculateTDE = calculateTDE;
    window.getHataRepeatStatus = getHataRepeatStatus;
    window.getCurrentLgsPhase = getCurrentLgsPhase;
    window.toggleTdeDetailsPanel = toggleTdeDetailsPanel;
    window.updateAutoToplamNet = updateAutoToplamNet;
    window.liveCalculateTdePreview = liveCalculateTdePreview;

    // Arama ve Filtre Dinleyicileri
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('kocluk-search-input');
        const classFilter = document.getElementById('kocluk-class-filter');
        if (searchInput) searchInput.addEventListener('input', renderKoclukModule);
        if (classFilter) classFilter.addEventListener('change', renderKoclukModule);
    });

})();

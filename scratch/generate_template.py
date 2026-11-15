import xlsxwriter
import shutil
import os

def create_kume_template(filename="Kume_Yukleme_Sablonu.xlsx"):
    wb = xlsxwriter.Workbook(filename)
    
    # -------------------------------------------------------------
    # STYLES / FORMATS
    # -------------------------------------------------------------
    fmt_main_title = wb.add_format({
        'bold': True,
        'font_size': 14,
        'font_name': 'Segoe UI',
        'bg_color': '#1E293B',
        'font_color': '#FFFFFF',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#334155'
    })
    
    fmt_logo_box = wb.add_format({
        'bold': True,
        'font_size': 10,
        'font_name': 'Segoe UI',
        'bg_color': '#0F172A',
        'font_color': '#38BDF8',
        'align': 'center',
        'valign': 'vcenter',
        'text_wrap': True,
        'border': 1,
        'border_color': '#334155'
    })
    
    fmt_sub_title = wb.add_format({
        'font_size': 9,
        'font_name': 'Segoe UI',
        'bg_color': '#334155',
        'font_color': '#94A3B8',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#475569'
    })
    
    fmt_meta_box = wb.add_format({
        'bold': True,
        'font_size': 9,
        'font_name': 'Segoe UI',
        'bg_color': '#F1F5F9',
        'font_color': '#0F172A',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#CBD5E1'
    })
    
    fmt_kume_header = wb.add_format({
        'bold': True,
        'font_size': 10,
        'font_name': 'Segoe UI',
        'bg_color': '#1E293B',
        'font_color': '#FFFFFF',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#0F172A'
    })

    fmt_kume_code = wb.add_format({
        'bold': True,
        'font_size': 10,
        'font_name': 'Segoe UI',
        'bg_color': '#0EA5E9',
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#0284C7'
    })
    
    fmt_th = wb.add_format({
        'bold': True,
        'font_size': 8,
        'font_name': 'Segoe UI',
        'bg_color': '#E2E8F0',
        'font_color': '#1E293B',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#CBD5E1'
    })
    
    fmt_th_left = wb.add_format({
        'bold': True,
        'font_size': 8,
        'font_name': 'Segoe UI',
        'bg_color': '#E2E8F0',
        'font_color': '#1E293B',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#CBD5E1'
    })

    fmt_td_no = wb.add_format({
        'font_size': 9,
        'font_name': 'Segoe UI',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#E2E8F0'
    })

    fmt_td_okul_no = wb.add_format({
        'font_size': 9,
        'font_name': 'Consolas',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#E2E8F0',
        'num_format': '@'
    })

    fmt_td_name = wb.add_format({
        'font_size': 9,
        'font_name': 'Segoe UI',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#E2E8F0'
    })

    fmt_role_bubble = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#FFFFFF',
        'font_color': '#64748B',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#CBD5E1'
    })

    # Highlighted role bubbles
    fmt_role_pk = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#1D4ED8', # Blue
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#1E40AF'
    })

    fmt_role_va = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#047857', # Green
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#065F46'
    })

    fmt_role_ar = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#B45309', # Orange / Amber
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#92400E'
    })

    fmt_role_hi = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#6D28D9', # Purple
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#5B21B6'
    })

    fmt_role_u = wb.add_format({
        'bold': True,
        'font_size': 7,
        'font_name': 'Segoe UI',
        'bg_color': '#1E293B', # Slate
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#0F172A'
    })

    fmt_note_box = wb.add_format({
        'font_size': 8,
        'font_name': 'Segoe UI',
        'bg_color': '#F8FAFC',
        'font_color': '#64748B',
        'align': 'left',
        'valign': 'top',
        'border': 1,
        'border_color': '#E2E8F0',
        'text_wrap': True
    })

    fmt_guide_box = wb.add_format({
        'font_size': 8,
        'font_name': 'Segoe UI',
        'bg_color': '#F1F5F9',
        'font_color': '#334155',
        'align': 'left',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#CBD5E1'
    })

    fmt_role_guide = wb.add_format({
        'bold': True,
        'font_size': 8,
        'font_name': 'Segoe UI',
        'bg_color': '#1E293B',
        'font_color': '#F8FAFC',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#0F172A'
    })

    # =============================================================
    # SHEET 1: Küme Formu (Şablon)
    # =============================================================
    ws1 = wb.add_worksheet('Küme Formu (Şablon)')
    ws1.set_paper(9) # A4
    ws1.fit_to_pages(1, 1)
    
    # Column Widths
    # Left Block (Cols A..I -> 0..8)
    ws1.set_column(0, 0, 3.5)   # A: #
    ws1.set_column(1, 1, 10.0)  # B: OKUL NO
    ws1.set_column(2, 2, 24.0)  # C: ÖĞRENCİ ADI SOYADI
    ws1.set_column(3, 7, 3.5)   # D..H: PK, VA, AR, HI, Ü
    ws1.set_column(8, 8, 6.0)   # I: NOT
    
    # Separator Col J (9)
    ws1.set_column(9, 9, 2.0)   # J: BOŞLUK
    
    # Right Block (Cols K..S -> 10..18)
    ws1.set_column(10, 10, 3.5) # K: #
    ws1.set_column(11, 11, 10.0)# L: OKUL NO
    ws1.set_column(12, 12, 24.0)# M: ÖĞRENCİ ADI SOYADI
    ws1.set_column(13, 17, 3.5) # N..R: PK, VA, AR, HI, Ü
    ws1.set_column(18, 18, 6.0) # S: NOT

    # Header Row 1 & 2
    ws1.set_row(0, 26)
    ws1.merge_range('A1:P1', '  KÜME YÖNETİMİ & GRUP DEĞERLENDİRME FORMU', fmt_main_title)
    ws1.merge_range('Q1:S2', 'KÜME-ŞABLON\nPROJE-AI', fmt_logo_box)
    
    ws1.set_row(1, 18)
    ws1.merge_range('A2:P2', '  Proje Tabanlı Ders İşleme Sistemi · Küme & Rol Dağılım Formu', fmt_sub_title)

    # Header Row 3: Class metadata
    ws1.set_row(2, 22)
    ws1.merge_range('A3:C3', ' SINIF / ŞUBE: 7/A', fmt_meta_box)
    ws1.merge_range('D3:I3', ' DERS / KONU: Fen Bilimleri', fmt_meta_box)
    ws1.merge_range('K3:M3', ' TARİH: 15.11.2026', fmt_meta_box)
    ws1.merge_range('N3:S3', ' ÖĞRETMEN: Hamdi Yazır', fmt_meta_box)

    # Empty spacer row 4
    ws1.set_row(3, 8)

    # Helper function to render a pair of clusters
    def render_cluster_pair(row_start, k_left, k_right, left_students, right_students):
        # Header Row (Row 5, 16, 27)
        r_head = row_start
        ws1.set_row(r_head, 22)
        # Left cluster header
        ws1.write(r_head, 0, f'K-{k_left:02d}', fmt_kume_code)
        ws1.write(r_head, 1, f'KÜME {k_left}', fmt_kume_header)
        left_name = left_students.get('name', f'{k_left}. Küme Adı')
        ws1.merge_range(r_head, 2, r_head, 6, f' KÜME ADI: {left_name}', fmt_kume_header)
        ws1.write(r_head, 7, 'NOT:', fmt_kume_header)
        ws1.write(r_head, 8, left_students.get('grade', ''), fmt_meta_box)

        # Right cluster header
        ws1.write(r_head, 10, f'K-{k_right:02d}', fmt_kume_code)
        ws1.write(r_head, 11, f'KÜME {k_right}', fmt_kume_header)
        right_name = right_students.get('name', f'{k_right}. Küme Adı')
        ws1.merge_range(r_head, 12, r_head, 16, f' KÜME ADI: {right_name}', fmt_kume_header)
        ws1.write(r_head, 17, 'NOT:', fmt_kume_header)
        ws1.write(r_head, 18, right_students.get('grade', ''), fmt_meta_box)

        # Table Column Header Row (Row 6, 17, 28)
        r_th = row_start + 1
        ws1.set_row(r_th, 18)
        ws1.write(r_th, 0, '#', fmt_th)
        ws1.write(r_th, 1, 'OKUL NO', fmt_th)
        ws1.write(r_th, 2, 'ÖĞRENCİ ADI SOYADI', fmt_th_left)
        ws1.merge_range(r_th, 3, r_th, 7, 'GÖREV / ROL', fmt_th)
        ws1.write(r_th, 8, 'NOT', fmt_th)

        ws1.write(r_th, 10, '#', fmt_th)
        ws1.write(r_th, 11, 'OKUL NO', fmt_th)
        ws1.write(r_th, 12, 'ÖĞRENCİ ADI SOYADI', fmt_th_left)
        ws1.merge_range(r_th, 13, r_th, 17, 'GÖREV / ROL', fmt_th)
        ws1.write(r_th, 18, 'NOT', fmt_th)

        # 6 Student Rows
        role_formats = {
            'PK': fmt_role_pk,
            'VA': fmt_role_va,
            'AR': fmt_role_ar,
            'HI': fmt_role_hi,
            'Ü': fmt_role_u
        }
        
        for s_idx in range(6):
            r_stu = row_start + 2 + s_idx
            ws1.set_row(r_stu, 18)
            # Left Student
            stu_l = left_students.get('students', [])
            s_data_l = stu_l[s_idx] if s_idx < len(stu_l) else {}
            ws1.write(r_stu, 0, s_idx + 1, fmt_td_no)
            ws1.write(r_stu, 1, s_data_l.get('no', ''), fmt_td_okul_no)
            ws1.write(r_stu, 2, s_data_l.get('name', ''), fmt_td_name)
            
            selected_role_l = s_data_l.get('role', '')
            for col_offset, r_code in enumerate(['PK', 'VA', 'AR', 'HI', 'Ü']):
                col_num = 3 + col_offset
                if selected_role_l == r_code:
                    ws1.write(r_stu, col_num, r_code, role_formats[r_code])
                else:
                    ws1.write(r_stu, col_num, r_code, fmt_role_bubble)
            ws1.write(r_stu, 8, s_data_l.get('note', ''), fmt_td_no)

            # Right Student
            stu_r = right_students.get('students', [])
            s_data_r = stu_r[s_idx] if s_idx < len(stu_r) else {}
            ws1.write(r_stu, 10, s_idx + 1, fmt_td_no)
            ws1.write(r_stu, 11, s_data_r.get('no', ''), fmt_td_okul_no)
            ws1.write(r_stu, 12, s_data_r.get('name', ''), fmt_td_name)
            
            selected_role_r = s_data_r.get('role', '')
            for col_offset, r_code in enumerate(['PK', 'VA', 'AR', 'HI', 'Ü']):
                col_num = 13 + col_offset
                if selected_role_r == r_code:
                    ws1.write(r_stu, col_num, r_code, role_formats[r_code])
                else:
                    ws1.write(r_stu, col_num, r_code, fmt_role_bubble)
            ws1.write(r_stu, 18, s_data_r.get('note', ''), fmt_td_no)

        # Observation / Notes Box (2 rows height)
        r_note = row_start + 8
        ws1.set_row(r_note, 16)
        ws1.set_row(r_note + 1, 16)
        ws1.merge_range(r_note, 0, r_note + 1, 8, f" GÖZLEM / NOT: {left_students.get('obs', '')}", fmt_note_box)
        ws1.merge_range(r_note, 10, r_note + 1, 18, f" GÖZLEM / NOT: {right_students.get('obs', '')}", fmt_note_box)
        
        # Spacer
        ws1.set_row(r_note + 2, 8)

    # Sample data matching Kume.xlsx
    cluster1 = {
        'name': 'Avcı Kurtlar',
        'students': [
            {'no': '0293', 'name': 'MUHAMMED MUSAB BAKIRCI', 'role': 'VA'},
            {'no': '0266', 'name': 'HASAN KELEŞ', 'role': 'AR'},
            {'no': '0413', 'name': 'MUHARREM AYDIN', 'role': 'PK'},
            {'no': '0347', 'name': 'CELİL YAHYA YILDIRIM', 'role': 'HI'},
        ]
    }
    cluster2 = {
        'name': 'Pireler Beceri FC',
        'students': [
            {'no': '0108', 'name': 'YUNUS EMRE SİMİT', 'role': 'AR'},
            {'no': '0399', 'name': 'MEHMET BECERİKLİ', 'role': 'HI'},
            {'no': '0767', 'name': 'YAVUZ SELİM YAVUZ', 'role': 'AR'},
            {'no': '0444', 'name': 'YILMAZ PİRE', 'role': 'PK'},
            {'no': '0297', 'name': 'MUHAMMED MUSAB SERT', 'role': 'VA'},
        ]
    }
    cluster3 = {
        'name': 'Arka 3 lü',
        'students': [
            {'no': '0312', 'name': 'ÖMER TUNAHAN ÖZDEMİR', 'role': 'VA'},
            {'no': '0612', 'name': 'MUSTAFA KURŞUN', 'role': 'HI'},
            {'no': '0123', 'name': 'KEREM ÇOBANOĞLU', 'role': 'PK'},
        ]
    }
    cluster4 = {
        'name': 'ADA Yıldızları',
        'students': [
            {'no': '0590', 'name': 'ABDULRAHMAN FARRAH', 'role': 'PK'},
            {'no': '0101', 'name': 'YUSUF BERKAY KOYUNCU', 'role': 'HI'},
            {'no': '0528', 'name': 'AHMET KUDSİ BÜYÜKKAYNAK', 'role': 'AR'},
            {'no': '0727', 'name': 'FATİH GÜL', 'role': 'VA'},
            {'no': '0212', 'name': 'ERTUĞRUL CERAN', 'role': 'AR'},
        ]
    }
    cluster5 = {
        'name': 'ÇALIŞKANLAR',
        'students': [
            {'no': '0119', 'name': 'EMİRHAN KAÇAR', 'role': 'PK'},
            {'no': '0278', 'name': 'MUHAMMED ERZURUM', 'role': 'HI'},
            {'no': '0367', 'name': 'YUNUS KEREM AKDEMİR', 'role': 'VA'},
            {'no': '0719', 'name': 'AHMED EL ALİ', 'role': 'HI'},
            {'no': '0594', 'name': 'MAHMUT SAMİ CAN', 'role': 'VA'},
        ]
    }
    cluster6 = {
        'name': 'YAAH',
        'students': [
            {'no': '0391', 'name': 'HASAN TÖMEK', 'role': 'PK'},
            {'no': '0220', 'name': 'HASAN BUĞRA YAŞKIR', 'role': 'VA'},
            {'no': '0467', 'name': 'ALİ ER', 'role': 'AR'},
            {'no': '0530', 'name': 'HACI YUSUF UZUN', 'role': 'HI'},
        ]
    }

    # Render pairs:
    # Küme 1 & 2 at row 4 (0-indexed -> row 5 Excel)
    render_cluster_pair(4, 1, 2, cluster1, cluster2)
    # Küme 3 & 4 at row 15 (0-indexed -> row 16 Excel)
    render_cluster_pair(15, 3, 4, cluster3, cluster4)
    # Küme 5 & 6 at row 26 (0-indexed -> row 27 Excel)
    render_cluster_pair(26, 5, 6, cluster5, cluster6)

    # Footer guides
    ws1.set_row(37, 18)
    ws1.merge_range('A38:S38', ' 📌 Rehber: İlgili öğrencinin rol kutusuna "X" yazabilir, kutucuğu renklendirebilir veya rol kısaltmasını (PK, VA, AR, HI, Ü) bırakabilirsiniz.', fmt_guide_box)
    ws1.set_row(38, 20)
    ws1.merge_range('A39:S39', ' * ROL KISALTMALARI: [PK] Proje Koord. / Yönetici | [VA] Veri Analisti / Yazıcı | [AR] Ar-Ge / Malzemeci | [HI] Halkla İliş. / Sözcü | [Ü] Üye   —   PROJE-AI · 2026', fmt_role_guide)

    # =============================================================
    # SHEET 2: Düz Liste Formatı (Alternatif Kolay Tablo)
    # =============================================================
    ws2 = wb.add_worksheet('Düz Liste Formatı')
    ws2.set_column(0, 0, 10.0) # Sınıf
    ws2.set_column(1, 1, 10.0) # Küme No
    ws2.set_column(2, 2, 22.0) # Küme Adı
    ws2.set_column(3, 3, 12.0) # Okul No
    ws2.set_column(4, 4, 28.0) # Öğrenci Adı Soyadı
    ws2.set_column(5, 5, 20.0) # Görev / Rol
    ws2.set_column(6, 6, 25.0) # Not / Gözlem

    fmt_tbl_th = wb.add_format({
        'bold': True,
        'font_size': 10,
        'font_name': 'Segoe UI',
        'bg_color': '#1E293B',
        'font_color': '#FFFFFF',
        'align': 'center',
        'valign': 'vcenter',
        'border': 1,
        'border_color': '#0F172A'
    })

    headers2 = ['Sınıf', 'Küme No', 'Küme Adı', 'Okul No', 'Öğrenci Adı Soyadı', 'Görev / Rol', 'Gözlem / Not']
    ws2.set_row(0, 24)
    for c_i, h in enumerate(headers2):
        ws2.write(0, c_i, h, fmt_tbl_th)

    flat_data = [
        # Küme 1
        ('7/A', '1', 'Avcı Kurtlar', '0293', 'MUHAMMED MUSAB BAKIRCI', 'Veri Analisti', ''),
        ('7/A', '1', 'Avcı Kurtlar', '0266', 'HASAN KELEŞ', 'Ar-Ge Sorumlusu', ''),
        ('7/A', '1', 'Avcı Kurtlar', '0413', 'MUHARREM AYDIN', 'Proje Koordinatörü', ''),
        ('7/A', '1', 'Avcı Kurtlar', '0347', 'CELİL YAHYA YILDIRIM', 'Halkla İlişkiler', ''),
        # Küme 2
        ('7/A', '2', 'Pireler Beceri FC', '0108', 'YUNUS EMRE SİMİT', 'Ar-Ge Sorumlusu', ''),
        ('7/A', '2', 'Pireler Beceri FC', '0399', 'MEHMET BECERİKLİ', 'Halkla İlişkiler', ''),
        ('7/A', '2', 'Pireler Beceri FC', '0767', 'YAVUZ SELİM YAVUZ', 'Ar-Ge Sorumlusu', ''),
        ('7/A', '2', 'Pireler Beceri FC', '0444', 'YILMAZ PİRE', 'Proje Koordinatörü', ''),
        ('7/A', '2', 'Pireler Beceri FC', '0297', 'MUHAMMED MUSAB SERT', 'Veri Analisti', ''),
        # Küme 3
        ('7/A', '3', 'Arka 3 lü', '0312', 'ÖMER TUNAHAN ÖZDEMİR', 'Veri Analisti', ''),
        ('7/A', '3', 'Arka 3 lü', '0612', 'MUSTAFA KURŞUN', 'Halkla İlişkiler', ''),
        ('7/A', '3', 'Arka 3 lü', '0123', 'KEREM ÇOBANOĞLU', 'Proje Koordinatörü', ''),
        # Küme 4
        ('7/A', '4', 'ADA Yıldızları', '0590', 'ABDULRAHMAN FARRAH', 'Proje Koordinatörü', ''),
        ('7/A', '4', 'ADA Yıldızları', '0101', 'YUSUF BERKAY KOYUNCU', 'Halkla İlişkiler', ''),
        ('7/A', '4', 'ADA Yıldızları', '0528', 'AHMET KUDSİ BÜYÜKKAYNAK', 'Ar-Ge Sorumlusu', ''),
        ('7/A', '4', 'ADA Yıldızları', '0727', 'FATİH GÜL', 'Veri Analisti', ''),
        ('7/A', '4', 'ADA Yıldızları', '0212', 'ERTUĞRUL CERAN', 'Ar-Ge Sorumlusu', ''),
        # Küme 5
        ('7/A', '5', 'ÇALIŞKANLAR', '0119', 'EMİRHAN KAÇAR', 'Proje Koordinatörü', ''),
        ('7/A', '5', 'ÇALIŞKANLAR', '0278', 'MUHAMMED ERZURUM', 'Halkla İlişkiler', ''),
        ('7/A', '5', 'ÇALIŞKANLAR', '0367', 'YUNUS KEREM AKDEMİR', 'Veri Analisti', ''),
        ('7/A', '5', 'ÇALIŞKANLAR', '0719', 'AHMED EL ALİ', 'Halkla İlişkiler', ''),
        ('7/A', '5', 'ÇALIŞKANLAR', '0594', 'MAHMUT SAMİ CAN', 'Veri Analisti', ''),
        # Küme 6
        ('7/A', '6', 'YAAH', '0391', 'HASAN TÖMEK', 'Proje Koordinatörü', ''),
        ('7/A', '6', 'YAAH', '0220', 'HASAN BUĞRA YAŞKIR', 'Veri Analisti', ''),
        ('7/A', '6', 'YAAH', '0467', 'ALİ ER', 'Ar-Ge Sorumlusu', ''),
        ('7/A', '6', 'YAAH', '0530', 'HACI YUSUF UZUN', 'Halkla İlişkiler', ''),
    ]

    fmt_row_even = wb.add_format({'font_name': 'Segoe UI', 'font_size': 9, 'border': 1, 'border_color': '#E2E8F0', 'bg_color': '#FFFFFF'})
    fmt_row_odd = wb.add_format({'font_name': 'Segoe UI', 'font_size': 9, 'border': 1, 'border_color': '#E2E8F0', 'bg_color': '#F8FAFC'})
    fmt_row_center_even = wb.add_format({'font_name': 'Segoe UI', 'font_size': 9, 'border': 1, 'border_color': '#E2E8F0', 'bg_color': '#FFFFFF', 'align': 'center'})
    fmt_row_center_odd = wb.add_format({'font_name': 'Segoe UI', 'font_size': 9, 'border': 1, 'border_color': '#E2E8F0', 'bg_color': '#F8FAFC', 'align': 'center'})

    for r_i, r_data in enumerate(flat_data, start=1):
        ws2.set_row(r_i, 20)
        c_fmt = fmt_row_center_odd if r_i % 2 == 1 else fmt_row_center_even
        t_fmt = fmt_row_odd if r_i % 2 == 1 else fmt_row_even
        
        ws2.write(r_i, 0, r_data[0], c_fmt)
        ws2.write(r_i, 1, r_data[1], c_fmt)
        ws2.write(r_i, 2, r_data[2], t_fmt)
        ws2.write(r_i, 3, r_data[3], c_fmt)
        ws2.write(r_i, 4, r_data[4], t_fmt)
        ws2.write(r_i, 5, r_data[5], t_fmt)
        ws2.write(r_i, 6, r_data[6], t_fmt)

    wb.close()
    print(f"Successfully generated {filename}")

if __name__ == '__main__':
    create_kume_template("Kume_Yukleme_Sablonu.xlsx")

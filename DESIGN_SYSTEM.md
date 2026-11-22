# Hệ Thống Thiết Kế & Kiến Trúc Nội Dung — LISTENING LAB (Nhóm 06)

Tài liệu đặc tả hệ thống thiết kế giao diện (Visual Design System), kiến trúc đa trang (Multi-page Sitemap) và chuẩn thương hiệu cho đồ án môn **Kỹ năng mềm (Năm học 2026 – 2027)** tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS).

---

## 1. Định Vị Thương Hiệu (Brand Identity)

- **Tên nhóm:** LISTENING LAB (Nhóm 06)
- **Môn học:** Kỹ năng mềm — Đồ án Cuối kỳ I, Năm học 2026 – 2027
- **Đơn vị:** Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS)
- **Đề tài:** *“Already-Always-Listening”* (Lắng nghe với tâm thế định kiến / Lắng nghe trọn vẹn không phán xét)
- **Khẩu hiệu (Slogan):** *“Listen with an Open Mind, Connect with a Pure Heart”*
- **Phụ đề tiếng Việt:** *“Lắng nghe bằng tâm trí rộng mở, kết nối bằng trái tim chân thành”*
- **Thông điệp cốt lõi:** *“Muốn hợp tác thành công, trước hết phải học cách tháo bỏ 'bộ lọc định kiến' để lắng nghe trọn vẹn và thấu hiểu đối phương.”*
- **Phong cách thẩm mỹ:** Editorial hiện đại, tinh tế, tối giản nhưng giàu chất sáng tạo (kết hợp lưới biên tập báo chí với họa tiết sóng âm học — Acoustic Wave Motifs).

---

## 2. Hệ Thống Màu Sắc (Color Palette)

| Vai trò màu | Tên token | Mã Hex | Ứng dụng thực tế |
|---|---|---|---|
| Nền chính | `--bg-canvas` | `#F8F9FA` | Nền toàn trang (Warm Off-White / Alabaster), tạo cảm giác sạch sẽ, thoáng mắt |
| Bề mặt thẻ | `--bg-surface` | `#FFFFFF` | Thẻ thông tin, khung nội dung, hộp thoại chi tiết |
| Nền nhấn phụ | `--bg-tint` | `#F1F5F9` | Nền khối trích dẫn, bảng phụ, khu vực phân tách nhẹ |
| Màu chủ đạo | `--brand-navy` | `#1E293B` | Tiêu đề, thanh điều hướng, chân trang (Midnight Navy — tin cậy, chuyên nghiệp) |
| Màu chữ chính | `--text-primary` | `#0F172A` | Văn bản nội dung chính (độ tương phản cao > 12:1 trên nền sáng) |
| Màu chữ phụ | `--text-secondary` | `#475569` | Mô tả, chú thích, nhãn thời gian, thông tin phụ |
| Điểm nhấn năng lượng | `--accent-coral` | `#F97316` | Nút hành động chính (CTA), sóng âm sáng tạo, cảnh báo điểm nhấn |
| Điểm nhấn cân bằng | `--accent-teal` | `#0D9488` | Trạng thái hoàn thành, sóng âm hài hòa, thẻ quy tắc khuyến khích |
| Viền tinh tế | `--border-subtle` | `#E2E8F0` | Đường viền thẻ `1px`, đường kẻ bảng, phân tách mô-đun |

---

## 3. Kiểu Chữ & Tỉ Lệ (Typography Scale)

Cả 2 họ chữ đều hỗ trợ đầy đủ dấu tiếng Việt và có sẵn trong **Google Fonts** lẫn **Google Sites**:

- **Tiêu đề (Display & Headings):** `Be Vietnam Pro` (hoặc `Plus Jakarta Sans`), trọng lượng `600`, `700`, `800`.
- **Nội dung (Body & UI):** `Inter`, trọng lượng `400`, `500`, `600`.
- **Mã số / Thống kê (Monospace/Tabular):** `Be Vietnam Pro` với `font-variant-numeric: tabular-nums` cho MSSV, thời gian và điểm số.

| Cấp độ | Kích thước (Desktop → Mobile) | Line-height | Weight | Sử dụng cho |
|---|---|---|---|---|
| `H1` (Hero) | `clamp(2.15rem, 4.2vw, 3.35rem)` | `1.15` | `800` | Tiêu đề chính đầu trang |
| `H2` (Section) | `clamp(1.6rem, 2.8vw, 2.25rem)` | `1.22` | `700` | Tiêu đề phân khu lớn |
| `H3` (Card) | `1.25rem` (`20px`) | `1.32` | `700` | Tiêu đề thẻ, tiểu mục |
| `Body Lead` | `1.125rem` (`18px`) | `1.65` | `400` | Đoạn dẫn mở đầu |
| `Body Base` | `1rem` (`16px`) | `1.65` | `400` | Văn bản đoạn văn, danh sách |
| `Caption / Badge` | `0.8125rem` (`13px`) | `1.4` | `600` | Nhãn, MSSV, huy hiệu vai trò |

---

## 4. Kiến Trúc Đa Trang (Multi-Page Sitemap)

1. **`index.html` — Trang Chủ:**
   - Hero section với huy hiệu đồ án, tiêu đề chính, slogan song ngữ, 2 nút CTA và minh họa sóng âm chuyển hóa từ hỗn loạn (định kiến) sang hài hòa (lắng nghe mở).
   - Tổng quan đề tài *"Already-Always-Listening"* & Thông điệp cốt lõi.
   - Lộ trình thực hiện 10 tuần (5 giai đoạn trực quan).
   - Thư viện ảnh **"Khoảnh Khắc Hợp Tác & Hậu Trường"** (lưới ảnh với khung chờ chuyên nghiệp cho họp khởi động, họp thư viện và hậu trường quay phim).
2. **`thanh-vien.html` — Thành Viên Nhóm:**
   - Lưới 6 thẻ thành viên tương tác (cân đối 3×2 trên màn hình lớn, 2×3 trên máy tính bảng, 1 cột trên di động).
   - Nhấp vào từng thẻ mở hộp thoại chi tiết (`<dialog>`) hiển thị khung ảnh chân dung, câu châm ngôn cá nhân, MSSV, email trường, vai trò chuyên môn và đóng góp hợp tác.
3. **`hop-dong.html` — Hợp Đồng, Quy Tắc & Giao Tiếp:**
   - Tiêu đề văn bản chính thức (ký ngày 17/10/2026 tại TP. Hồ Chí Minh bởi cả 6 thành viên) + bảng xác nhận chữ ký.
   - Bộ quy tắc ứng xử 3 cột: **Bắt Buộc Làm**, **Tuyệt Đối Không Làm**, **Khuyến Khích Làm**.
   - Kế hoạch giao tiếp & lịch họp cố định (12:00 Thứ Năm & 20:00 Thứ Bảy online; họp offline thư viện; Zalo/Drive/Sheets; quy tắc phản hồi 24h/12h).
   - Bảng đối chiếu **Cơ Chế Thưởng – Phạt** và **Thang Điểm Đánh Giá Chéo (Peer-Assessment 0–10)**.
4. **`nhan-dien.html` — Nhận Diện Thương Hiệu (Logo & Thẻ Đeo):**
   - Trình bày ý tưởng Logo **LISTENING LAB**: kết hợp tai nghe/sóng âm cách điệu tạo thành con số **"06"** lồng vào bong bóng thoại mở, tượng trưng cho sự lắng nghe thấu cảm.
   - Bảng màu nhận diện tương tác (nhấp sao chép mã Hex) & quy chuẩn kiểu chữ.
   - Khu trưng bày 6 mẫu **Thẻ Đeo Thành Viên (Lanyard ID Card Mockup)** khổ đứng cho ngày quay phim và bảo vệ đồ án, hiển thị logo, khung ảnh, họ tên, chức danh nổi bật, MSSV và mã QR dẫn về website nhóm. Hỗ trợ tải xuống SVG/PNG trực tiếp.
5. **`san-pham.html` — Sản Phẩm & Báo Cáo:**
   - Khung trình chiếu Phim ngắn cuối kỳ *"Mở Lòng Để Lắng Nghe"* (7–10 phút) kèm tóm tắt kịch bản 3 hồi.
   - Khung trưng bày Poster truyền thông chính thức khổ dọc (kèm bản thiết kế mẫu có thể xem phóng to hoặc xuất file).
   - Liên kết nhanh đến Kho lưu trữ tài liệu Google Drive 10 tuần & cấu trúc 15 mục Cuốn báo cáo cuối kỳ.

---

## 5. Khả Năng Tương Thích Nền Tảng (Google Sites / WordPress)

- Mọi phân khu đều đóng gói theo mô hình khối độc lập (Section → Container `1200px` → Grid 12 cột / 3 cột / 2 cột).
- Không phụ thuộc framework nặng bên ngoài: HTML ngữ nghĩa thuần, CSS biến cục bộ và JavaScript chuẩn trình duyệt hiện đại.
- Đi kèm bộ **Mã Nhúng Google Sites (`google-sites-embeds/`)** và **Hướng Dẫn Dựng Trên Google Sites (`GOOGLE_SITES_IMPLEMENTATION_GUIDE.md`)** để nhóm có thể đưa lên `sites.google.com` nhanh chóng.

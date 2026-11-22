# Hướng Dẫn Xuất Bản Website Nhóm 06 (LISTENING LAB) Lên Google Sites

## Lưu ý kỹ thuật về việc xuất bản tự động lên Google Sites

Hiện tại **Google Sites phiên bản mới (`sites.google.com`) không có API công khai (REST API / SDK)** để tạo trang, chỉnh sửa bố cục hay nhấn nút Xuất bản (Publish) tự động bằng mã nguồn, đồng thời bắt buộc phải đăng nhập trực tiếp vào tài khoản Google cá nhân của bạn.

Vì vậy, toàn bộ **website đa trang hoàn chỉnh** (5 trang HTML/CSS/JS độc lập, chuẩn responsive & tiếp cận WCAG), **bộ ảnh SVG/PNG Logo & Thẻ đeo**, **nội dung copywriting tiếng Việt** và **mã nhúng Google Sites (`google-sites-embeds/`)** đã được tạo sẵn trong thư mục này để bạn chỉ mất khoảng 10–15 phút đưa lên Google Sites hoặc chạy ngay trên hosting miễn phí.

---

## Cách 1: Dựng & Công khai trực tiếp trên Google Sites (`sites.google.com`)

### Bước 1: Tạo trang và cấu hình Giao diện (Theme)
1. Truy cập [sites.google.com](https://sites.google.com) bằng tài khoản Google của nhóm → chọn **Trang web trống (Blank site)**.
2. Đặt tên tệp dự án: `LISTENING LAB - Nhóm 06` và tiêu đề trang: `LISTENING LAB (Nhóm 06)`.
3. Vào tab **Giao diện (Themes)** → **Tùy chỉnh (Custom)** → **Tạo giao diện (Create theme)**:
   - **Tên giao diện:** `Listening Lab 2026`
   - **Logo thương hiệu:** Mở trang `nhan-dien.html` trong dự án này → nhấn nút **Tải PNG (1080px)** ở Logo nền sáng → tải lên Google Sites.
   - **Màu sắc:**
     - Màu nền chính: `#F8F9FA`
     - Màu điểm nhấn: `#F97316` (Cam san hô) hoặc `#1E293B` (Xanh hải quân đậm)
   - **Kiểu chữ (Font):**
     - Tiêu đề: `Be Vietnam Pro` (In đậm 700/800)
     - Văn bản thường: `Inter` (400/500)

### Bước 2: Tạo đủ 5 Trang trong tab `Trang (Pages)`
Tạo đúng 5 trang (sắp xếp theo thứ tự thanh điều hướng):
1. **Trang chủ** (Mặc định)
2. **Thành viên**
3. **Hợp đồng & Quy tắc**
4. **Nhận diện**
5. **Sản phẩm**

### Bước 3: Đưa nội dung & khối nhúng tương tác vào từng trang
Bạn có thể chọn **Chèn (Insert) → Nhúng (Embed) → Mã nhúng (Embed code)** để dán trực tiếp các tệp trong `google-sites-embeds/`, hoặc dùng các khối **Bố cục (Layout Blocks)** có sẵn của Google Sites với nội dung tiếng Việt chuẩn trong các tệp HTML:

- **Trang chủ (`index.html`):**
  - Dán `google-sites-embeds/hero-soundwave.html` làm Hero đầu trang.
  - Thêm khối văn bản **Tổng quan đề tài & Thông điệp cốt lõi** + khối **5 cột / 5 thẻ Lộ trình 10 tuần**.
  - Thêm khối **Thư viện ảnh 3×2** với tiêu đề *“Khoảnh Khắc Hợp Tác & Hậu Trường”* và thay bằng ảnh chụp họp nhóm / thư viện / hậu trường quay phim thật.
- **Thành viên (`thanh-vien.html`):**
  - Dùng bố cục **3 cột (x2 hàng)** của Google Sites để chèn ảnh chân dung 6 thành viên kèm Họ tên, MSSV, Email, Vai trò và Mô tả trách nhiệm từ trang `thanh-vien.html`.
- **Hợp đồng & Quy tắc (`hop-dong.html`):**
  - Dùng bố cục **3 cột** cho Bộ quy tắc ứng xử (*Bắt buộc làm* / *Tuyệt đối không làm* / *Khuyến khích làm*), khối **4 thẻ Kế hoạch giao tiếp**, và nhúng bảng **Thưởng – Phạt** cùng **Thang điểm Đánh giá chéo 0–10**.
- **Nhận diện (`nhan-dien.html`):**
  - Mở `nhan-dien.html` trên trình duyệt → nhấn **Tải PNG** cho Logo (nền sáng + nền tối) và **Tải thẻ (.PNG)** cho 6 thẻ đeo thành viên để chèn trực tiếp vào Google Sites, hoặc dán mã nhúng `google-sites-embeds/id-badges.html`.
- **Sản phẩm (`san-pham.html`):**
  - Dùng tính năng **Chèn → YouTube** hoặc **Drive** để nhúng Video phim ngắn *“Mở Lòng Để Lắng Nghe”* (7–10 phút), chèn ảnh **Poster**, và đặt nút dẫn đến thư mục **Google Drive 10 tuần**.

### Bước 4: Xuất bản công khai (Public)
1. Nhấn nút **Xuất bản (Publish)** ở góc trên bên phải.
2. Đặt địa chỉ web ngắn gọn, ví dụ: `listening-lab-nhom06-k26` (URL sẽ là `https://sites.google.com/view/listening-lab-nhom06-k26`).
3. Tại mục **Ai có thể xem trang web của tôi (Who can view my site)** → chọn **Quản lý (Manage)** → đổi quyền **Trang web đã xuất bản** thành **Công khai (Public)** → nhấn **Xong** → **Xuất bản**.

---

## Cách 2: Mở & Xuất bản ngay bộ Website Đa Trang Hoàn Chỉnh trong thư mục này

Toàn bộ mã nguồn tĩnh (`index.html`, `thanh-vien.html`, `hop-dong.html`, `nhan-dien.html`, `san-pham.html`) đã sẵn sàng chạy trực tiếp trên trình duyệt mà không cần cài đặt thêm bất kỳ thư viện nào:
- Mở trực tiếp tệp `index.html` để xem giao diện và xuất các tệp Logo/Thẻ đeo PNG.
- Có thể kéo thả cả thư mục dự án lên **Netlify Drop** (`app.netlify.com/drop`) hoặc **GitHub Pages** để có một đường link công khai chuẩn chỉnh song song với Google Sites.

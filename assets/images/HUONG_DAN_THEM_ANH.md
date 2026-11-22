# Hướng Dẫn Thay Ảnh Thật Cho Website LISTENING LAB (Nhóm 06)

Các lớp CSS hỗ trợ khung ảnh (`.portrait-frame img`, `.id-badge__photo img`, `.gallery-photo`, `.poster-image`) đã được cấu hình sẵn trong `styles/pages.css`.

## 1. Cấu trúc tên file ảnh khuyến nghị
Đặt ảnh của nhóm vào các thư mục con sau trong `assets/images/`:

- **Ảnh chân dung 6 thành viên** (`assets/images/members/`):
  - `dat.jpg` (Trần Minh Đạt — 26127519)
  - `long.jpg` (Ngô Hoàng Long — 26127264)
  - `qhuy.jpg` (Trần Quang Huy — 26127187)
  - `ghuy.jpg` (Nguyễn Gia Huy — 26127175)
  - `duy.jpg` (Huỳnh Gia Duy — 26127100)
  - `phuc.jpg` (Lê Vĩnh Phúc — 26127367)
- **Ảnh họp nhóm & hậu trường** (`assets/images/gallery/`):
  - `hop-khoi-dong.jpg`, `brainstorming.jpg`, `thu-vien.jpg`, `hau-truong-quay.jpg`, `chieu-thu.jpg`, `tong-duyet.jpg`
- **Ảnh Poster chính thức** (`assets/images/poster/`):
  - `poster-chinh-thuc.png` (khổ dọc tỉ lệ `1 : 1.414` hoặc A3)

## 2. Cách gắn ảnh vào HTML (hoặc gửi trực tiếp vào khung chat)

### Cách A: Gửi trực tiếp vào khung chat để trợ lý gắn tự động
Kéo thả ảnh hoặc nhấn biểu tượng đính kèm (`+` / ghim kẹp) ngay trong khung chat, ghi rõ ảnh của thành viên nào hoặc ảnh Poster, trợ lý sẽ tự chèn thẻ `<img>`, tối ưu hiển thị và `git push` lên GitHub Pages giúp bạn.

### Cách B: Tự thay trong mã nguồn HTML
- **Trên `thanh-vien.html`:** Thay `<div class="portrait-frame" aria-hidden="true">TMĐ</div>` bằng:
  ```html
  <div class="portrait-frame">
    <img src="assets/images/members/dat.jpg" alt="Chân dung Trần Minh Đạt" width="96" height="96" loading="lazy">
  </div>
  ```
- **Trên `san-pham.html`:** Thay khối `<div class="poster-mockup">...</div>` bằng:
  ```html
  <img class="poster-image" src="assets/images/poster/poster-chinh-thuc.png" alt="Poster chính thức phim ngắn Mở Lòng Để Lắng Nghe" width="800" height="1131" loading="lazy">
  ```
- Sau khi lưu file, chạy trong PowerShell tại thư mục dự án:
  ```powershell
  git add .
  git commit -m "Cap nhat hinh anh thanh vien va poster"
  git push
  ```

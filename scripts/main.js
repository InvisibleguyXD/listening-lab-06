/* ==========================================================================
   LISTENING LAB (Nhóm 06) — Interactive Enhancements & Accessibility
   ========================================================================== */

(() => {
  "use strict";

  // 1. Nạp polyfill Popover có điều kiện nếu trình duyệt cũ chưa hỗ trợ
  if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
    import("https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js").catch(() => {
      // Bỏ qua lặng lẽ nếu ngoại tuyến; menu vẫn có thể điều hướng qua liên kết chân trang
    });
  }

  // 2. Hộp thông báo trạng thái (Live Region Toast)
  const toastEl = document.getElementById("toast-live");
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 2600);
  }

  async function copyText(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.setAttribute("readonly", "");
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
      }
      showToast(successMsg);
    } catch {
      showToast(`Không thể tự động sao chép. Giá trị: ${text}`);
    }
  }

  // 3. Thanh điều hướng thích ứng (Responsive Popover Navbar theo ResizeObserver)
  function initResponsiveNavbar() {
    const header = document.querySelector(".site-header");
    const inner = header?.querySelector(".header-inner");
    const menu = document.getElementById("site-menu");
    if (!header || !inner || !menu) return;

    let lastMeasuredCollapsedWidth = 0;

    function syncMenuLayout(forceMeasure = false) {
      const currentlyWide = header.classList.contains("is-wide");
      const currentWidth = header.getBoundingClientRect().width;

      if (!currentlyWide && !forceMeasure && currentWidth <= lastMeasuredCollapsedWidth) {
        return;
      }

      const wasOpen = !currentlyWide && menu.matches(":popover-open, .\\:popover-open");

      header.classList.add("is-measuring");
      header.classList.add("is-wide");
      menu.removeAttribute("popover");

      const fitsInline = inner.scrollWidth <= inner.clientWidth + 1;

      if (fitsInline) {
        header.classList.add("is-wide");
        menu.removeAttribute("popover");
        lastMeasuredCollapsedWidth = 0;
      } else {
        header.classList.remove("is-wide");
        menu.setAttribute("popover", "auto");
        lastMeasuredCollapsedWidth = currentWidth;
        if (wasOpen && typeof menu.showPopover === "function") {
          try {
            menu.showPopover();
          } catch {
            // Bỏ qua nếu chưa thể mở lại popover
          }
        }
      }

      window.requestAnimationFrame(() => {
        header.classList.remove("is-measuring");
      });
    }

    syncMenuLayout(true);

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => {
        syncMenuLayout(false);
      });
      ro.observe(header);
      ro.observe(menu);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => syncMenuLayout(true));
    }
  }

  // 4. Fallback light-dismiss cho <dialog closedby="any"> trên trình duyệt chưa hỗ trợ closedBy
  function initDialogLightDismissFallback() {
    const dialogs = document.querySelectorAll('dialog[closedby="any"]');
    if (dialogs.length === 0) return;

    const outside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };

    dialogs.forEach((dialog) => {
      dialog.addEventListener("close", () => {
        dialog.returnValue = "";
      });

      if (!("closedBy" in HTMLDialogElement.prototype)) {
        let pressedOutside = false;
        dialog.addEventListener("pointerdown", (e) => {
          pressedOutside = outside(e, dialog);
        });
        dialog.addEventListener("pointerup", (e) => {
          if (pressedOutside && outside(e, dialog)) {
            dialog.close();
          }
          pressedOutside = false;
        });
      }
    });
  }

  // 5. Trang chủ: Điều khiển minh họa sóng âm & Hộp thoại xem ảnh hậu trường
  function initHomePage() {
    const waveSvg = document.getElementById("hero-wave-svg");
    const wavePauseBtn = document.getElementById("wave-pause-btn");
    const waveStatusText = document.getElementById("wave-status-text");

    if (waveSvg && wavePauseBtn) {
      let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const updateWaveControl = () => {
        waveSvg.classList.toggle("wave-svg--paused", paused);
        wavePauseBtn.textContent = paused ? "Chạy chuyển động sóng âm" : "Tạm dừng chuyển động";
        if (waveStatusText) {
          waveStatusText.textContent = paused
            ? "Chế độ tĩnh (Đang tạm dừng chuyển động)"
            : "Sóng âm chuyển hóa: Định kiến → Thấu hiểu";
        }
      };
      updateWaveControl();

      wavePauseBtn.addEventListener("click", () => {
        paused = !paused;
        updateWaveControl();
      });
    }

    // Lightbox cho Thư viện ảnh Khoảnh Khắc Hợp Tác & Hậu Trường
    const galleryDialog = document.getElementById("gallery-dialog");
    const galleryTitle = document.getElementById("gallery-dialog-title");
    const galleryStage = document.getElementById("gallery-dialog-stage");
    const galleryDesc = document.getElementById("gallery-dialog-desc");
    const galleryMeta = document.getElementById("gallery-dialog-meta");
    const galleryTriggers = document.querySelectorAll("[data-gallery-item]");

    if (galleryDialog && galleryTriggers.length > 0) {
      galleryTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const title = trigger.dataset.title || "";
          const desc = trigger.dataset.desc || "";
          const meta = trigger.dataset.meta || "";
          const badge = trigger.dataset.badge || "";

          if (galleryTitle) galleryTitle.textContent = title;
          if (galleryDesc) galleryDesc.textContent = desc;
          if (galleryMeta) galleryMeta.textContent = meta;
          if (galleryStage) {
            galleryStage.textContent = `${badge} — Khung ảnh chờ thay thế (khuyến nghị 1600×1000 px)`;
          }
          galleryDialog.showModal();
        });
      });
    }
  }

  // 6. Trang Thành viên: Hồ sơ chi tiết tương tác 6 thành viên
  const MEMBERS = [
    {
      id: "dat",
      initials: "TMĐ",
      name: "Trần Minh Đạt",
      mssv: "26127519",
      role: "Nhóm trưởng & Quản lý tiến độ",
      shortRole: "NHÓM TRƯỞNG",
      email: "tmdat2626@clc.fitus.edu.vn",
      accent: "teal",
      quote: "“Người dẫn dắt tốt không phải người nói nhiều nhất, mà là người giữ cho mọi tiếng nói trong nhóm đều được lắng nghe trọn vẹn.”",
      responsibilities:
        "Lập kế hoạch 10 tuần, điều phối cuộc họp định kỳ, quản lý tiến độ và nộp báo cáo tuần (Biểu mẫu 4) đúng hạn.",
      collaboration:
        "Giữ vai trò lắng nghe công bằng, điều hòa bất đồng, giải quyết mâu thuẫn trong quá trình quay dựng và duy trì năng lượng tích cực cho cả nhóm."
    },
    {
      id: "long",
      initials: "NHL",
      name: "Ngô Hoàng Long",
      mssv: "26127264",
      role: "Quản lý Tài nguyên & Biên tập Báo cáo",
      shortRole: "TÀI NGUYÊN & BÁO CÁO",
      email: "nhlong2636@clc.fitus.edu.vn",
      accent: "coral",
      quote: "“Minh bạch trong lưu trữ và tỉ mỉ trong từng trang biên bản là nền tảng giúp cả nhóm bước đi vững chắc suốt 10 tuần.”",
      responsibilities:
        "Quản lý kho lưu trữ Google Drive chung, thu thập hình ảnh minh chứng họp hàng tuần, tổng hợp và chuẩn hóa định dạng Cuốn báo cáo cuối kỳ 15 mục.",
      collaboration:
        "Đôn đốc các thành viên nộp phần suy ngẫm bài học cá nhân, rà soát tính thống nhất của văn phong và dữ liệu minh chứng."
    },
    {
      id: "qhuy",
      initials: "TQH",
      name: "Trần Quang Huy",
      mssv: "26127187",
      role: "Đạo diễn & Kỹ thuật Video/Audio",
      shortRole: "ĐẠO DIỄN & VIDEO",
      email: "tqhuy2616@clc.fitus.edu.vn",
      accent: "teal",
      quote: "“Âm thanh và ánh sáng chỉ thực sự chạm đến khán giả khi ê-kíp thấu hiểu cảm xúc của từng nhân vật trước khi bấm máy.”",
      responsibilities:
        "Phụ trách góc quay, dựng phim hậu kỳ (Premiere / CapCut), xử lý âm thanh (Audacity), lồng tiếng và biên tập phụ đề tiếng Việt (Aegisub) cho phim ngắn 7–10 phút.",
      collaboration:
        "Hướng dẫn diễn viên bắt nhịp cảm xúc tại hiện trường và phối hợp chặt chẽ cùng bộ phận hậu cần để tối ưu thiết bị, bối cảnh quay."
    },
    {
      id: "ghuy",
      initials: "NGH",
      name: "Nguyễn Gia Huy",
      mssv: "26127175",
      role: "Thiết kế Website & Poster",
      shortRole: "THIẾT KẾ WEB & POSTER",
      email: "nghuy2621@clc.fitus.edu.vn",
      accent: "coral",
      quote: "“Thiết kế tốt là lắng nghe câu chuyện của cả tập thể rồi chuyển hóa thành đường nét, màu sắc và trải nghiệm ai cũng dễ chạm tới.”",
      responsibilities:
        "Thiết kế bộ nhận diện thương hiệu (Logo LISTENING LAB, thẻ đeo thành viên), xây dựng website nhóm và thiết kế Poster truyền thông đồ án.",
      collaboration:
        "Thu thập chân dung, tiểu sử của 6 thành viên, lắng nghe góp ý thẩm mỹ từ toàn nhóm để tinh chỉnh giao diện rõ ràng, hiện đại."
    },
    {
      id: "duy",
      initials: "HGD",
      name: "Huỳnh Gia Duy",
      mssv: "26127100",
      role: "Biên kịch chính & Nội dung",
      shortRole: "BIÊN KỊCH CHÍNH",
      email: "hgduy2625@clc.fitus.edu.vn",
      accent: "teal",
      quote: "“Kịch bản hay không viết từ góc nhìn của một người, mà được gọt giũa từ sự lắng nghe không định kiến với mọi phản biện.”",
      responsibilities:
        "Phát triển ý tưởng tiểu phẩm, thiết kế sơ đồ tư duy (xMind) và viết kịch bản phân cảnh chi tiết cho phim ngắn “Mở Lòng Để Lắng Nghe”.",
      collaboration:
        "Chủ trì buổi đọc thoại (Read-through), tiếp thu góc nhìn đa chiều của các diễn viên để lời thoại tự nhiên và giàu sức nặng thông điệp."
    },
    {
      id: "phuc",
      initials: "LVP",
      name: "Lê Vĩnh Phúc",
      mssv: "26127367",
      role: "Hậu cần & Kiểm thử",
      shortRole: "HẬU CẦN & KIỂM THỬ",
      email: "lvphuc2635@clc.fitus.edu.vn",
      accent: "coral",
      quote: "“Sự chuẩn bị chu đáo phía sau ống kính và lắng nghe phản hồi thật từ người xem là thước đo trung thực nhất cho thành công của dự án.”",
      responsibilities:
        "Chuẩn bị đạo cụ, bối cảnh quay phim (thư viện, phòng học, quán cà phê), tham gia diễn xuất và thiết kế biểu mẫu Google Forms khảo sát phản hồi khán giả.",
      collaboration:
        "Chăm lo điều phối hậu trường, kết nối tinh thần diễn viên và tổng hợp phản hồi người xem ngoài nhóm để hoàn thiện thông điệp cuối kỳ."
    }
  ];

  function initMembersPage() {
    const memberDialog = document.getElementById("member-dialog");
    const openButtons = document.querySelectorAll("[data-member-id]");
    if (!memberDialog || openButtons.length === 0) return;

    const elPortrait = document.getElementById("modal-member-portrait");
    const elName = document.getElementById("modal-member-title");
    const elMssv = document.getElementById("modal-member-mssv");
    const elRole = document.getElementById("modal-member-role");
    const elQuote = document.getElementById("modal-member-quote");
    const elResp = document.getElementById("modal-member-resp");
    const elCollab = document.getElementById("modal-member-collab");
    const elEmailLink = document.getElementById("modal-member-email");
    const elCopyBtn = document.getElementById("modal-member-copy");
    const elPrevBtn = document.getElementById("modal-member-prev");
    const elNextBtn = document.getElementById("modal-member-next");

    let activeIndex = 0;

    function renderMemberModal(index) {
      activeIndex = (index + MEMBERS.length) % MEMBERS.length;
      const m = MEMBERS[activeIndex];
      if (elPortrait) {
        elPortrait.textContent = m.initials;
        elPortrait.classList.toggle("portrait-frame--coral", m.accent === "coral");
      }
      if (elName) elName.textContent = m.name;
      if (elMssv) elMssv.textContent = `MSSV: ${m.mssv}`;
      if (elRole) elRole.textContent = m.role;
      if (elQuote) elQuote.textContent = m.quote;
      if (elResp) elResp.textContent = m.responsibilities;
      if (elCollab) elCollab.textContent = m.collaboration;
      if (elEmailLink) {
        elEmailLink.textContent = m.email;
        elEmailLink.href = `mailto:${m.email}`;
      }
      if (elCopyBtn) {
        elCopyBtn.dataset.copyValue = m.email;
        elCopyBtn.dataset.copyLabel = `Đã sao chép email của ${m.name}`;
      }
    }

    openButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = MEMBERS.findIndex((m) => m.id === btn.dataset.memberId);
        renderMemberModal(idx >= 0 ? idx : 0);
        memberDialog.showModal();
      });
    });

    elPrevBtn?.addEventListener("click", () => renderMemberModal(activeIndex - 1));
    elNextBtn?.addEventListener("click", () => renderMemberModal(activeIndex + 1));
  }

  // 7. Các nút sao chép nhanh (Email, Mã màu Hex, đường dẫn)
  function initCopyButtons() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copy-value]");
      if (!btn) return;
      const val = btn.dataset.copyValue || "";
      const msg = btn.dataset.copyLabel || `Đã sao chép: ${val}`;
      copyText(val, msg);
    });
  }

  // 8. Xuất SVG / PNG cho Logo, Thẻ đeo thành viên và Poster
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function svgElementToPng(svgEl, width, height, filename) {
    const clone = svgEl.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", String(width));
    clone.setAttribute("height", String(height));
    const serialized = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            downloadBlob(pngBlob, filename);
            showToast(`Đã tải xuống ${filename}`);
          }
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function drawBadgePng(member) {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 960;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Nền thẻ
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 640, 960);

    // Phần đầu thẻ Midnight Navy
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(0, 0, 640, 260);

    // Lỗ móc dây đeo
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.roundRect(245, 32, 150, 22, 11);
    ctx.fill();

    // Tiêu đề thương hiệu trên thẻ
    ctx.fillStyle = "#F8F9FA";
    ctx.font = "800 32px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("LISTENING LAB", 320, 115);

    ctx.fillStyle = "#5EEAD4";
    ctx.font = "700 19px 'Inter', system-ui, sans-serif";
    ctx.fillText("NHÓM 06 • KỸ NĂNG MỀM 2026 – 2027", 320, 152);

    ctx.fillStyle = "#FDBA74";
    ctx.font = "600 17px 'Inter', system-ui, sans-serif";
    ctx.fillText("HCMUS • ĐẠI HỌC KHOA HỌC TỰ NHIÊN", 320, 185);

    // Khung chữ cái chân dung chờ
    ctx.fillStyle = "#F1F5F9";
    ctx.strokeStyle = member.accent === "coral" ? "#F97316" : "#0D9488";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(210, 225, 220, 220, 36);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1E293B";
    ctx.font = "800 64px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.fillText(member.initials, 320, 355);

    // Họ và tên
    ctx.fillStyle = "#0F172A";
    ctx.font = "800 38px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.fillText(member.name, 320, 520);

    // Huy hiệu vai trò
    ctx.fillStyle = member.accent === "coral" ? "#FFEDD5" : "#CCFBF1";
    ctx.beginPath();
    ctx.roundRect(120, 550, 400, 54, 27);
    ctx.fill();

    ctx.fillStyle = member.accent === "coral" ? "#C2410C" : "#0F766E";
    ctx.font = "800 22px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.fillText(member.shortRole, 320, 585);

    // MSSV & Email
    ctx.fillStyle = "#475569";
    ctx.font = "700 24px 'Inter', system-ui, sans-serif";
    ctx.fillText(`MSSV: ${member.mssv}`, 320, 655);
    ctx.font = "500 20px 'Inter', system-ui, sans-serif";
    ctx.fillText(member.email, 320, 692);

    // Chân thẻ
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(0, 770, 640, 190);
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 20px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("“Listen with an Open Mind,", 48, 845);
    ctx.fillText("Connect with a Pure Heart”", 48, 878);
    ctx.fillStyle = "#475569";
    ctx.font = "500 16px 'Inter', system-ui, sans-serif";
    ctx.fillText("Đề tài: Already-Always-Listening", 48, 916);

    // Khối QR tượng trưng rõ nét
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 2;
    ctx.fillRect(468, 800, 124, 124);
    ctx.strokeRect(468, 800, 124, 124);
    ctx.fillStyle = "#1E293B";
    const pattern = [
      [1,1,1,0,1,1,1],
      [1,0,1,1,1,0,1],
      [1,1,1,0,1,1,1],
      [0,1,0,1,0,1,0],
      [1,1,1,1,0,1,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,1,1]
    ];
    pattern.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) ctx.fillRect(482 + c * 14, 814 + r * 14, 11, 11);
      });
    });

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `the-deo-${member.mssv}.png`);
        showToast(`Đã xuất ảnh thẻ đeo cho ${member.name}`);
      }
    }, "image/png");
  }

  function initBrandPage() {
    document.querySelectorAll("[data-export-logo-svg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.exportLogoSvg;
        const svg = document.getElementById(targetId);
        if (!svg) return;
        const serialized = new XMLSerializer().serializeToString(svg);
        downloadBlob(new Blob([serialized], { type: "image/svg+xml;charset=utf-8" }), `${targetId}.svg`);
        showToast(`Đã tải xuống ${targetId}.svg`);
      });
    });

    document.querySelectorAll("[data-export-logo-png]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.exportLogoPng;
        const svg = document.getElementById(targetId);
        if (!svg) return;
        svgElementToPng(svg, 1080, 288, `${targetId}.png`);
      });
    });

    document.querySelectorAll("[data-export-badge]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const member = MEMBERS.find((m) => m.id === btn.dataset.exportBadge);
        if (member) drawBadgePng(member);
      });
    });
  }

  // 9. Trang Sản phẩm: Xem phóng to Poster
  function initDeliverablesPage() {
    const posterBtn = document.getElementById("poster-zoom-btn");
    const posterDialog = document.getElementById("poster-dialog");
    if (posterBtn && posterDialog) {
      posterBtn.addEventListener("click", () => posterDialog.showModal());
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initResponsiveNavbar();
    initDialogLightDismissFallback();
    initCopyButtons();
    initHomePage();
    initMembersPage();
    initBrandPage();
    initDeliverablesPage();
  });
})();

# Portfolio cá nhân

Base cho lập trình viên: React + TypeScript + Vite, CSS thuần, Oxlint (template Vite).

## Chạy dự án

Dùng Node.js 22.12+ hoặc Node 24. Môi trường khởi tạo dùng Node 24.

```bash
npm install
npm run dev
```

Kiểm tra: `npm run lint`. Build: `npm run build`. Xem bản build: `npm run preview`.
Đầu ra deploy nằm trong `dist/`.

## Cấu trúc

- `src/data/portfolio.ts`: tên, mô tả, kỹ năng, dự án, email, social links.
- `src/components/Section.tsx`: section dùng lại.
- `src/App.tsx`: các phần của portfolio.
- `src/App.css`: layout responsive.
- `src/index.css`: style nền và biến màu.

Nội dung lấy từ hai CV và thông tin người dùng xác nhận. `src/data/portfolio.ts` chứa `profile` (liên hệ và URL) cùng `content.vi`/`content.en` (nội dung song ngữ). Cập nhật cả hai ngôn ngữ khi sửa nội dung. Tiếng Việt mặc định lần đầu; lựa chọn được lưu trong localStorage và cập nhật HTML lang, title, description. Chuyển ngôn ngữ giữ vị trí đọc trong section hiện tại.

Font Be Vietnam Pro self-host bằng Fontsource; icon từ Phosphor. `public/cv/` chứa hai CV tiếng Việt; `public/images/haobox.png` là hình giới thiệu công khai của HaoBox. `artifacts/` chứa ảnh kiểm tra desktop/mobile, không được đưa vào thư mục build. Xem `DESIGN.md` và `docs/portfolio-ui-proposal.md` để đọc quyết định thiết kế.

Animation dùng `motion`: section khi cuộn, monogram chuyển động, thanh tiến độ đọc. Chữ nghề nghiệp gõ luân phiên có cleanup timer và hỗ trợ reduced-motion. Link GitHub/LinkedIn nằm trong `profile`. GitHub Activity tải contributions công khai từ `github-contributions-api.jogruber.de` (dịch vụ bên thứ ba, không cần token); có trạng thái loading/error, nút thử lại và link GitHub trực tiếp. Bộ lọc dự án phân biệt dự án nhóm và cá nhân. Form liên hệ mở ứng dụng email, chưa có backend gửi mail. Người dùng chỉ xác nhận học vấn HCMUTE; không có phần chứng chỉ bổ sung.

## Công nghệ gợi ý

Các lựa chọn thông dụng theo nhu cầu, không phải bảng xếp hạng mức độ phổ biến:

| Công nghệ | Khi nào nên dùng |
| --- | --- |
| React + TypeScript + Vite | Base hiện tại: portfolio một trang, deploy tĩnh |
| Tailwind CSS | Utility class, chuẩn hóa spacing và màu |
| shadcn/ui + Radix UI | Dialog, dropdown, UI tương tác phức tạp |
| Lucide React | Icon nhất quán |
| Motion | Animation React, hỗ trợ giảm chuyển động |
| React Hook Form + Zod | Form và validation; gửi email cần backend/dịch vụ riêng |
| React Router | Nhiều trang hoặc trang chi tiết dự án |
| TanStack Query | Tải/cache dữ liệu API; chưa cần với nội dung tĩnh |
| Zustand | Trạng thái chia sẻ phức tạp; chưa cần cho base |
| Next.js | Blog, HTML render sẵn, metadata theo trang, backend tích hợp |
| Vitest + Testing Library / Playwright | Kiểm thử logic, tương tác và trình duyệt |
| Vercel / Netlify / GitHub Pages | Hosting; Pages dưới subpath cần cấu hình base của Vite |

Đề xuất: hoàn thiện nội dung và ảnh dự án trước; thêm Tailwind, Lucide, Motion khi cần. Không cần cài tất cả cùng lúc.

Tài liệu: [React](https://react.dev/learn/build-a-react-app-from-scratch), [Vite](https://vite.dev/guide/), [Tailwind](https://tailwindcss.com/docs/installation/using-vite).

# PhimHub - Web Xem Phim Tối Giản, Hiện Đại

Website xem phim trực tuyến hiện đại, giao diện tối giản (minimalist dark mode) được xây dựng bằng **React**, **TypeScript**, **Vite** và **TanStack Query** (React Query v5), kết nối trực tiếp với hệ thống API của `https://vsmov.com/api`.

---

## 🚀 Tính Năng Chính

- **Giao diện tối giản & Hiện đại (Minimalist Dark UI)**: Lấy cảm hứng từ Netflix và Apple TV, tối ưu hiển thị trên cả điện thoại (Mobile) và máy tính (Desktop).
- **Tối ưu hóa hiệu năng (Code Optimization)**:
  - Tách bạch rõ ràng giữa tầng dữ liệu (API/Service), tầng trạng thái (Custom Hooks/TanStack Query), tầng giao diện dùng chung (Reusable UI Components) và các trang (Pages).
  - Tự động lưu cache thông minh với `staleTime` và `gcTime`, tránh gọi lại API không cần thiết khi chuyển trang hoặc tab.
  - Phân trang mượt mà với `placeholderData: keepPreviousData` (không bị nhấp nháy màn hình trắng khi tải trang kế tiếp).
  - Tìm kiếm tức thì tối ưu với kỹ thuật `debounce` (350ms - 400ms).
- **Trình phát video thông minh (Smart Video Player)**:
  - Hỗ trợ đổi server nhanh (Server Vietsub #1, #2...).
  - Danh sách tập phim dạng lưới gọn gàng, tự động đánh dấu các tập đã xem.
  - Tự động chuyển tập tiếp theo (Next Episode).
  - Chế độ rạp chiếu phim (Theater Mode / Phóng to).
  - Nút tải lại (Reload) video khi đường truyền mạng chập chờn.
- **Bộ lọc phim chuyên sâu (Advanced Filter)**:
  - Lọc theo thể loại: Hành động, Tình cảm, Cổ trang, Kinh dị, Hoạt hình, Hài hước...
  - Lọc theo quốc gia: Hàn Quốc, Trung Quốc, Âu Mỹ, Nhật Bản, Thái Lan, Việt Nam...
  - Lọc theo năm phát hành, định dạng (Phim bộ, Phim lẻ, Hoạt hình, TV Shows), trạng thái (Hoàn tất, Đang chiếu).
  - Đồng bộ trực tiếp với URL query parameters (dễ dàng bookmark hoặc chia sẻ link đã lọc).
- **Hộp thoại tìm kiếm nhanh (Fast Search Modal)**:
  - Bấm phím tắt `Ctrl + K` hoặc bấm icon tìm kiếm ở thanh điều hướng để mở popup tìm kiếm nhanh.
  - Hiển thị kết quả preview trực tiếp với poster, điểm đánh giá và năm phát hành.
- **Danh sách phim yêu thích (Watchlist)**: Lưu vào LocalStorage của trình duyệt, không cần đăng nhập.
- **Lịch sử xem phim (Watch History)**: Tự động ghi nhớ bộ phim và tập đang xem dở để người dùng xem tiếp bất kỳ lúc nào.

---

## 📁 Cấu Trúc Thư Mục Dùng Chung

Dự án được phân chia mô đun hóa theo đúng yêu cầu tối ưu hóa:

```
D:/Movie/
├── src/
│   ├── api/                    # Quản lý gọi API & xử lý dữ liệu
│   │   ├── client.ts           # Fetch wrapper chuẩn hóa lỗi & headers
│   │   ├── movieApi.ts         # Danh sách phim mới, danh sách lọc, chi tiết phim, tìm kiếm
│   │   └── index.ts
│   ├── types/                  # Định nghĩa kiểu dữ liệu TypeScript nghiêm ngặt
│   │   ├── movie.ts            # MovieItem, MovieDetail, Episode, Server, Pagination
│   │   ├── filter.ts           # FilterParams, SearchParams
│   │   └── index.ts
│   ├── constants/              # Dữ liệu cố định (Thể loại, Quốc gia, Năm, Menu)
│   │   └── index.ts
│   ├── utils/                  # Các hàm tiện ích dùng chung
│   │   ├── image.ts            # Chuẩn hóa link ảnh poster/backdrop
│   │   ├── format.ts           # Định dạng điểm số, thời lượng, ngày tháng
│   │   ├── storage.ts          # Quản lý LocalStorage (Yêu thích & Lịch sử)
│   │   └── index.ts
│   ├── hooks/                  # Custom React Hooks với TanStack Query
│   │   ├── useLatestMovies.ts  # Lấy phim mới cập nhật (có phân trang)
│   │   ├── useMovieList.ts     # Lấy phim theo danh mục & bộ lọc
│   │   ├── useMovieDetail.ts   # Lấy thông tin chi tiết phim & các tập
│   │   ├── useSearchMovies.ts  # Tìm kiếm phim theo từ khóa
│   │   ├── useFavorites.ts     # Hook quản lý phim đã lưu
│   │   ├── useWatchHistory.ts  # Hook quản lý lịch sử xem
│   │   └── useDebounce.ts      # Hook chống giật/lag khi gõ tìm kiếm
│   ├── components/             # Thư viện component tái sử dụng
│   │   ├── common/             # Component nền tảng dùng chung
│   │   │   ├── Button.tsx      # Nút bấm đa dạng variant & loading spinner
│   │   │   ├── Input.tsx       # Ô nhập liệu có nút clear & icon
│   │   │   ├── Badge.tsx       # Nhãn trạng thái, điểm TMDB, chất lượng HD
│   │   │   ├── Skeleton.tsx    # Hiệu ứng shimmer đang tải nội dung
│   │   │   ├── Pagination.tsx  # Bộ điều hướng phân trang
│   │   │   ├── Modal.tsx       # Hộp thoại popup tiện lợi
│   │   │   └── EmptyState.tsx  # Khối thông báo khi không có dữ liệu
│   │   ├── layout/             # Khung trang chính
│   │   │   ├── Navbar.tsx      # Thanh điều hướng trên cùng (Glassmorphism)
│   │   │   ├── Footer.tsx      # Chân trang tối giản
│   │   │   ├── SearchModal.tsx # Hộp thoại tìm kiếm nhanh (Ctrl + K)
│   │   │   └── Layout.tsx      # Khung layout tổng thể
│   │   └── movie/              # Component đặc thù cho phim
│   │       ├── MovieCard.tsx   # Thẻ phim với hiệu ứng hover & nút lưu
│   │       ├── MovieGrid.tsx   # Lưới danh sách phim responsive
│   │       ├── HeroBanner.tsx  # Banner tiêu điểm phim nổi bật đầu trang
│   │       ├── VideoPlayer.tsx # Trình phát video iframe có chế độ rạp
│   │       ├── EpisodeSelector.tsx # Bảng chọn server & tập phim
│   │       └── FilterBar.tsx   # Thanh lọc đa điều kiện
│   ├── pages/                  # Các trang giao diện
│   │   ├── HomePage.tsx        # Trang chủ
│   │   ├── MovieDetailPage.tsx # Trang chi tiết phim & xem phim
│   │   ├── FilterPage.tsx      # Trang duyệt phim & lọc nâng cao
│   │   ├── SearchPage.tsx      # Trang kết quả tìm kiếm
│   │   ├── FavoritesPage.tsx   # Trang danh sách yêu thích
│   │   ├── HistoryPage.tsx     # Trang lịch sử xem
│   │   └── NotFoundPage.tsx    # Trang 404
│   ├── App.tsx                 # Cấu hình Router & QueryClientProvider
│   ├── main.tsx                # Điểm khởi chạy React
│   └── index.css               # Tailwind CSS & tùy chỉnh thanh cuộn
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy

### 1. Khởi động môi trường phát triển (Development):
```bash
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

### 2. Đóng gói cho môi trường thực tế (Production Build):
```bash
npm run build
```

### 3. Xem trước bản đóng gói:
```bash
npm run preview
```

---

## 📡 API Được Sử Dụng

- **Phim mới cập nhật**: `GET https://vsmov.com/api/danh-sach/phim-moi-cap-nhat?page=1`
- **Danh sách theo slug & bộ lọc**: `GET https://vsmov.com/api/danh-sach/[slug]?page=1&limit=24&category=...&country=...&year=...&type=...&status=...`
- **Tìm kiếm**: `GET https://vsmov.com/api/tim-kiem?keyword=[keyword]&page=1&limit=20`
- **Chi tiết phim & tập**: `GET https://vsmov.com/api/phim/[slug]`

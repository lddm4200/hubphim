export const API_BASE_URL = 'https://vsmov.com/api';

export const NAV_LINKS = [
  { name: 'Trang Chủ', path: '/' },
  { name: 'Phim Mới', path: '/danh-sach/phim-moi-cap-nhat' },
  { name: 'Phim Bộ', path: '/danh-sach/phim-bo?type=series' },
  { name: 'Phim Lẻ', path: '/danh-sach/phim-le?type=single' },
  { name: 'Hoạt Hình', path: '/danh-sach/phim-moi-cap-nhat?type=hoathinh' },
  { name: 'TV Shows', path: '/danh-sach/phim-moi-cap-nhat?type=tvshows' },
  { name: 'Khám Phá', path: '/kham-pha' },
  { name: 'Yêu Thích', path: '/yeu-thich' },
  { name: 'Lịch Sử', path: '/lich-su' },
];

export const CATEGORIES = [
  { name: 'Tất cả thể loại', slug: '' },
  { name: 'Hành Động', slug: 'hanh-dong' },
  { name: 'Tình Cảm', slug: 'tinh-cam' },
  { name: 'Hài Hước', slug: 'hai-huoc' },
  { name: 'Cổ Trang', slug: 'co-trang' },
  { name: 'Tâm Lý', slug: 'tam-ly' },
  { name: 'Hình Sự', slug: 'hinh-su' },
  { name: 'Chiến Tranh', slug: 'chien-tranh' },
  { name: 'Thể Thao', slug: 'the-thao' },
  { name: 'Võ Thuật', slug: 'vo-thuat' },
  { name: 'Viễn Tưởng', slug: 'vien-tuong' },
  { name: 'Phiêu Lưu', slug: 'phieu-luu' },
  { name: 'Khoa Học', slug: 'khoa-hoc' },
  { name: 'Kinh Dị', slug: 'kinh-di' },
  { name: 'Âm Nhạc', slug: 'am-nhac' },
  { name: 'Thần Thoại', slug: 'than-thoai' },
  { name: 'Tài Liệu', slug: 'tai-lieu' },
  { name: 'Gia Đình', slug: 'gia-dinh' },
  { name: 'Chính Kịch', slug: 'chinh-kich' },
  { name: 'Bí Ẩn', slug: 'bi-an' },
  { name: 'Học Đường', slug: 'hoc-duong' },
  { name: 'Kinh Điển', slug: 'kinh-dien' },
];

export const COUNTRIES = [
  { name: 'Tất cả quốc gia', slug: '' },
  { name: 'Trung Quốc', slug: 'trung-quoc' },
  { name: 'Hàn Quốc', slug: 'han-quoc' },
  { name: 'Âu Mỹ', slug: 'au-my' },
  { name: 'Nhật Bản', slug: 'nhat-ban' },
  { name: 'Thái Lan', slug: 'thai-lan' },
  { name: 'Việt Nam', slug: 'viet-nam' },
  { name: 'Đài Loan', slug: 'dai-loan' },
  { name: 'Ấn Độ', slug: 'an-do' },
  { name: 'Hồng Kông', slug: 'hong-kong' },
  { name: 'Anh', slug: 'anh' },
  { name: 'Pháp', slug: 'phap' },
  { name: 'Canada', slug: 'canada' },
];

export const MOVIE_TYPES = [
  { name: 'Tất cả định dạng', slug: '' },
  { name: 'Phim Bộ', slug: 'series' },
  { name: 'Phim Lẻ', slug: 'single' },
  { name: 'Hoạt Hình', slug: 'hoathinh' },
  { name: 'TV Shows', slug: 'tvshows' },
];

export const MOVIE_STATUSES = [
  { name: 'Tất cả trạng thái', slug: '' },
  { name: 'Hoàn tất', slug: 'completed' },
  { name: 'Đang chiếu', slug: 'ongoing' },
  { name: 'Trailer', slug: 'trailer' },
];

export const YEARS = [
  { name: 'Tất cả năm', slug: '' },
  { name: '2026', slug: '2026' },
  { name: '2025', slug: '2025' },
  { name: '2024', slug: '2024' },
  { name: '2023', slug: '2023' },
  { name: '2022', slug: '2022' },
  { name: '2021', slug: '2021' },
  { name: '2020', slug: '2020' },
  { name: '2019', slug: '2019' },
  { name: '2018', slug: '2018' },
  { name: 'Trước 2018', slug: 'truoc-2018' },
];

export const PLACEHOLDER_POSTER = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22450%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20450%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23475569%3Bfont-weight%3A600%3Bfont-family%3Asystem-ui%2C%20sans-serif%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22300%22%20height%3D%22450%22%20fill%3D%22%230f172a%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22105%22%20y%3D%22230%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

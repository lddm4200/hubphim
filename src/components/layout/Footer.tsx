import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constants';

export const Footer: React.FC = () => {
  const topCategories = CATEGORIES.slice(1, 9);

  return (
    <footer className="border-t border-surface-border mt-16 pt-10 pb-20 md:pb-10 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Brand info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-2 select-none">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-sm font-bold tracking-tight text-white">
                Phim<span className="text-brand">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-2">
              Xem phim trực tuyến chất lượng cao, phụ đề và thuyết minh. Nguồn dữ liệu từ Vsmov API.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-semibold text-zinc-300 mb-2">Thể loại</h4>
            <ul className="space-y-1.5 text-zinc-400">
              {topCategories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link to={`/kham-pha?category=${c.slug}`} className="hover:text-zinc-200 transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-zinc-300 mb-2">Mục lục</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <Link to="/danh-sach/phim-bo?type=series" className="hover:text-zinc-200 transition-colors">
                  Phim bộ
                </Link>
              </li>
              <li>
                <Link to="/danh-sach/phim-le?type=single" className="hover:text-zinc-200 transition-colors">
                  Phim lẻ
                </Link>
              </li>
              <li>
                <Link to="/kham-pha" className="hover:text-zinc-200 transition-colors">
                  Bộ lọc phim
                </Link>
              </li>
              <li>
                <Link to="/lich-su" className="hover:text-zinc-200 transition-colors">
                  Lịch sử xem
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-border/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2">
          <span>© {new Date().getFullYear()} PhimHub. Tối giản và tối ưu.</span>
          <span>Dữ liệu phi lợi nhuận phục vụ mục đích học tập.</span>
        </div>
      </div>
    </footer>
  );
};

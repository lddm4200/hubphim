import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tv, Film, Compass, Bookmark } from 'lucide-react';
import { useFavorites } from '../../hooks';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const navItems = [
    { label: 'Trang chủ', path: '/', icon: Home },
    { label: 'Phim bộ', path: '/danh-sach/phim-bo?type=series', icon: Tv },
    { label: 'Phim lẻ', path: '/danh-sach/phim-le?type=single', icon: Film },
    { label: 'Khám phá', path: '/kham-pha', icon: Compass },
    { label: 'Đã lưu', path: '/yeu-thich', icon: Bookmark, badge: favorites.length },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-surface-border pb-safe">
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname + location.search === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path.split('?')[0]));

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-center select-none transition-colors relative ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-brand text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-semibold text-white' : 'font-normal'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

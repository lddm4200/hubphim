import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, History, Bookmark } from 'lucide-react';
import { useFavorites } from '../../hooks';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Phim mới', path: '/danh-sach/phim-moi-cap-nhat' },
    { name: 'Phim bộ', path: '/danh-sach/phim-bo?type=series' },
    { name: 'Phim lẻ', path: '/danh-sach/phim-le?type=single' },
    { name: 'Khám phá', path: '/kham-pha' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-[#0c0c0e]/95 backdrop-blur-md border-b border-surface-border'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-brand" />
              <span className="text-lg font-bold tracking-tight text-white">
                Phim<span className="text-brand">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname + location.search === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path.split('?')[0]));

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'text-white font-medium bg-surface-subtle'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-surface-subtle/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-border border border-surface-border text-zinc-400 hover:text-zinc-200 text-xs transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tìm phim...</span>
              <kbd className="hidden lg:inline-block text-[10px] bg-black/40 border border-zinc-700/60 px-1 py-0.5 rounded text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Desktop Favorites */}
            <Link
              to="/yeu-thich"
              title="Phim đã lưu"
              className="hidden md:flex relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-subtle transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand text-white text-[9px] font-bold flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>

            {/* History Link */}
            <Link
              to="/lich-su"
              title="Lịch sử xem"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-subtle transition-colors"
              aria-label="Lịch sử xem"
            >
              <History className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

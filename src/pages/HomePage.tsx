import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLatestMovies, useMovieList } from '../hooks';
import { HeroBanner, MovieGrid } from '../components/movie';
import { Pagination } from '../components/common';

export const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Queries
  const { data: latestData, isLoading: isLatestLoading } = useLatestMovies(currentPage);
  const { data: seriesData, isLoading: isSeriesLoading } = useMovieList('phim-bo', {
    page: 1,
    limit: 12,
    type: 'series',
  });
  const { data: singleData, isLoading: isSingleLoading } = useMovieList('phim-le', {
    page: 1,
    limit: 12,
    type: 'single',
  });

  const latestMovies = latestData?.items || [];
  const heroMovie = latestMovies[0];
  const pagination = latestData?.pagination;

  const quickCategories = [
    { name: 'Hành Động', slug: 'hanh-dong' },
    { name: 'Tình Cảm', slug: 'tinh-cam' },
    { name: 'Cổ Trang', slug: 'co-trang' },
    { name: 'Kinh Dị', slug: 'kinh-di' },
    { name: 'Hài Hước', slug: 'hai-huoc' },
    { name: 'Viễn Tưởng', slug: 'vien-tuong' },
    { name: 'Hoạt Hình', slug: 'hoat-hinh' },
  ];

  return (
    <div className="pb-10">
      {/* Hero Banner */}
      <HeroBanner movie={heroMovie} isLoading={isLatestLoading} />

      {/* Category Pills (Horizontal swipe on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-3 px-3 sm:mx-0 sm:px-0">
        {quickCategories.map((c) => (
          <Link
            key={c.slug}
            to={`/kham-pha?category=${c.slug}`}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-subtle text-zinc-300 hover:text-white hover:bg-surface-border border border-surface-border/60 transition-colors shrink-0 whitespace-nowrap"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Section 1: Phim Mới Cập Nhật */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Mới cập nhật
          </h2>

          <Link
            to="/danh-sach/phim-moi-cap-nhat"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5 transition-colors"
          >
            <span>Tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MovieGrid movies={latestMovies} isLoading={isLatestLoading} skeletonCount={12} />

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={Math.min(pagination.totalPages, 50)}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </section>

      {/* Section 2: Phim Bộ */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Phim bộ nổi bật
          </h2>

          <Link
            to="/danh-sach/phim-bo?type=series"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5 transition-colors"
          >
            <span>Tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MovieGrid movies={seriesData?.items || []} isLoading={isSeriesLoading} skeletonCount={6} />
      </section>

      {/* Section 3: Phim Lẻ */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Phim lẻ chọn lọc
          </h2>

          <Link
            to="/danh-sach/phim-le?type=single"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5 transition-colors"
          >
            <span>Tất cả</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MovieGrid movies={singleData?.items || []} isLoading={isSingleLoading} skeletonCount={6} />
      </section>
    </div>
  );
};

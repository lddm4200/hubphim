import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieList } from '../hooks';
import { FilterBar, MovieGrid } from '../components/movie';
import { Pagination, EmptyState } from '../components/common';
import { FilterParams } from '../types';

export const FilterPage: React.FC = () => {
  const { slug = 'phim-moi-cap-nhat' } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterParams = useMemo(() => {
    return {
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '24', 10),
      category: searchParams.get('category') || undefined,
      country: searchParams.get('country') || undefined,
      year: searchParams.get('year') || undefined,
      type: searchParams.get('type') || undefined,
      status: searchParams.get('status') || undefined,
    };
  }, [searchParams]);

  const { data, isLoading } = useMovieList(slug, filters);
  const movies = data?.items || [];
  const pagination = data?.pagination;

  const handleFilterChange = (updated: Partial<FilterParams>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updated).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        nextParams.set(key, val.toString());
      } else {
        nextParams.delete(key);
      }
    });

    if (!('page' in updated)) {
      nextParams.set('page', '1');
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    const nextParams = new URLSearchParams();
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const getPageTitle = () => {
    if (slug === 'phim-bo') return 'Phim bộ';
    if (slug === 'phim-le') return 'Phim lẻ';
    if (slug === 'subteam') return 'Phim thuyết minh';
    if (filters.type === 'hoathinh') return 'Hoạt hình';
    if (filters.type === 'tvshows') return 'TV Shows';
    return 'Duyệt phim';
  };

  return (
    <div className="pb-12 pt-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {getPageTitle()}
        </h1>
        {pagination && (
          <span className="text-xs text-zinc-400">
            {pagination.totalItems} kết quả
          </span>
        )}
      </div>

      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {movies.length > 0 || isLoading ? (
        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={18} />
      ) : (
        <EmptyState
          title="Không tìm thấy phim phù hợp"
          description="Hãy thử bỏ chọn một số tiêu chí lọc."
          actionLabel="Đặt lại bộ lọc"
          onAction={handleResetFilters}
        />
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={Math.min(pagination.totalPages, 200)}
            onPageChange={(p) => handleFilterChange({ page: p })}
          />
        </div>
      )}
    </div>
  );
};

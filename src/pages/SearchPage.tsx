import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSearchMovies, useDebounce } from '../hooks';
import { MovieGrid } from '../components/movie';
import { Input, Pagination, EmptyState } from '../components/common';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlKeyword = searchParams.get('keyword') || '';
  const urlPage = parseInt(searchParams.get('page') || '1', 10);

  const [inputVal, setInputVal] = useState(urlKeyword);
  const debouncedInput = useDebounce(inputVal, 350);

  useEffect(() => {
    setInputVal(urlKeyword);
  }, [urlKeyword]);

  useEffect(() => {
    if (debouncedInput.trim() !== urlKeyword.trim()) {
      setSearchParams(
        debouncedInput.trim()
          ? { keyword: debouncedInput.trim(), page: '1' }
          : {}
      );
    }
  }, [debouncedInput]);

  const { data, isLoading } = useSearchMovies(urlKeyword, urlPage, 24);
  const movies = data?.items || [];
  const pagination = data?.pagination;

  const handlePageChange = (p: number) => {
    setSearchParams({ keyword: urlKeyword, page: p.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-12 pt-1 max-w-5xl mx-auto">
      {/* Search Input */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
          Tìm kiếm
        </h1>
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onClear={() => setInputVal('')}
          placeholder="Nhập tên phim, diễn viên..."
          leftIcon={<Search className="w-4 h-4 text-zinc-400" />}
          autoFocus
        />
        {urlKeyword && (
          <p className="text-xs text-zinc-400 mt-2">
            {isLoading
              ? 'Đang tìm...'
              : `Tìm thấy ${pagination?.totalItems ?? movies.length} kết quả cho "${urlKeyword}"`}
          </p>
        )}
      </div>

      {/* Results */}
      {movies.length > 0 || isLoading ? (
        <MovieGrid movies={movies} isLoading={isLoading} skeletonCount={12} />
      ) : urlKeyword ? (
        <EmptyState
          title={`Không tìm thấy kết quả`}
          description="Hãy thử từ khóa ngắn hơn hoặc kiểm tra lỗi chính tả."
        />
      ) : (
        <p className="text-center py-12 text-zinc-500 text-xs">
          Nhập từ khóa vào ô phía trên để bắt đầu tìm phim.
        </p>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

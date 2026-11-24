import React from 'react';
import { useFavorites } from '../hooks';
import { MovieGrid } from '../components/movie';
import { EmptyState } from '../components/common';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="pb-12 pt-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Phim đã lưu
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {favorites.length} bộ phim
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <EmptyState
          title="Chưa lưu phim nào"
          description="Bấm biểu tượng lưu trên thẻ phim để thêm vào danh sách này."
        />
      )}
    </div>
  );
};

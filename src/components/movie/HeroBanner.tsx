import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Bookmark, Star } from 'lucide-react';
import { MovieItem } from '../../types';
import { getImageUrl, formatRating } from '../../utils';
import { Button } from '../common';
import { useFavorites } from '../../hooks';

export interface HeroBannerProps {
  movie?: MovieItem;
  isLoading?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie, isLoading }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading || !movie) {
    return (
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[460px] min-h-[240px] bg-surface-subtle animate-pulse rounded-xl mb-6" />
    );
  }

  const favorite = isFavorite(movie.slug);
  const rating = formatRating(movie.tmdb?.vote_average);
  const backdropUrl = getImageUrl(movie.thumb_url || movie.poster_url);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[460px] min-h-[260px] rounded-xl overflow-hidden mb-6 border border-surface-border/50 group bg-black">
      {/* Backdrop Image */}
      <img
        src={backdropUrl}
        alt={movie.name}
        className="absolute inset-0 w-full h-full object-cover object-top opacity-70 group-hover:opacity-75 transition-opacity"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/80 via-transparent to-transparent hidden sm:block" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 max-w-xl z-10">
        <div className="flex items-center gap-2 mb-2 text-xs text-zinc-300">
          {rating !== '0.0' && (
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              {rating}
            </span>
          )}
          {movie.year && <span>• {movie.year}</span>}
          <span className="text-brand font-medium">• Mới cập nhật</span>
        </div>

        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-1">
          {movie.name}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 mb-4 line-clamp-1">
          {movie.origin_name}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link to={`/phim/${movie.slug}`}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
              className="text-xs sm:text-sm px-4"
            >
              Xem ngay
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => toggleFavorite(movie)}
            leftIcon={<Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-white' : ''}`} />}
            className="text-xs sm:text-sm"
          >
            {favorite ? 'Đã lưu' : 'Lưu phim'}
          </Button>
        </div>
      </div>
    </div>
  );
};

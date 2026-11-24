import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Bookmark } from 'lucide-react';
import { MovieItem } from '../../types';
import { getImageUrl, formatRating } from '../../utils';
import { useFavorites } from '../../hooks';

export interface MovieCardProps {
  movie: MovieItem;
  className?: string;
  showBookmark?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  className = '',
  showBookmark = true,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.slug);

  const rating = formatRating(movie.tmdb?.vote_average);
  const posterUrl = getImageUrl(movie.poster_url || movie.thumb_url);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className={`group flex flex-col ${className}`}>
      {/* Poster Container */}
      <Link
        to={`/phim/${movie.slug}`}
        className="block relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-surface-subtle border border-surface-border/50"
      >
        <img
          src={posterUrl}
          alt={movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getImageUrl(movie.thumb_url);
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
          {rating !== '0.0' ? (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-black/75 backdrop-blur-sm text-amber-400 px-1.5 py-0.5 rounded">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
              {rating}
            </span>
          ) : (
            <span />
          )}

          {showBookmark && (
            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label={favorite ? 'Bỏ lưu' : 'Lưu phim'}
              className={`pointer-events-auto p-1.5 rounded-md backdrop-blur-sm transition-colors ${
                favorite
                  ? 'bg-brand text-white'
                  : 'bg-black/60 text-zinc-300 hover:text-white sm:opacity-0 group-hover:opacity-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom Year Tag */}
        {movie.year && (
          <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium bg-black/75 backdrop-blur-sm text-zinc-300 px-1.5 py-0.5 rounded">
            {movie.year}
          </span>
        )}
      </Link>

      {/* Title & Info */}
      <div className="pt-2 flex flex-col">
        <Link
          to={`/phim/${movie.slug}`}
          className="text-xs sm:text-sm font-medium text-zinc-100 hover:text-brand transition-colors line-clamp-1 leading-snug"
          title={movie.name}
        >
          {movie.name}
        </Link>
        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
          {movie.origin_name || movie.name}
        </p>
      </div>
    </div>
  );
};

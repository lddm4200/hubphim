import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { useDebounce, useSearchMovies } from '../../hooks';
import { getImageUrl, formatRating } from '../../utils';
import { Modal } from '../common';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data, isLoading } = useSearchMovies(debouncedKeyword, 1, 8);
  const searchResults = data?.items || [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setKeyword('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onClose();
      navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleSelectMovie = (slug: string) => {
    onClose();
    navigate(`/phim/${slug}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" showCloseButton={true}>
      <form onSubmit={handleSubmit} className="relative mb-3">
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm tên phim, diễn viên..."
          className="w-full bg-surface-card text-zinc-100 placeholder:text-zinc-500 rounded-lg pl-9 pr-9 py-2.5 text-sm border border-surface-border focus:outline-none focus:border-zinc-400"
        />
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
        {isLoading && (
          <Loader2 className="w-4 h-4 text-zinc-400 animate-spin absolute right-3 top-3" />
        )}
      </form>

      {/* Results */}
      <div className="space-y-1 max-h-[60vh] overflow-y-auto">
        {searchResults.map((movie) => {
          const rating = formatRating(movie.tmdb?.vote_average);
          const poster = getImageUrl(movie.thumb_url || movie.poster_url);

          return (
            <div
              key={movie._id || movie.slug}
              onClick={() => handleSelectMovie(movie.slug)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-border/60 cursor-pointer transition-colors"
            >
              <img
                src={poster}
                alt={movie.name}
                className="w-9 h-12 object-cover rounded bg-zinc-800 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getImageUrl(movie.poster_url);
                }}
              />
              <div className="flex-grow min-w-0">
                <h4 className="text-xs sm:text-sm font-medium text-zinc-100 truncate">
                  {movie.name}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                  {movie.year && <span>{movie.year}</span>}
                  {rating !== '0.0' && <span className="text-amber-400">★ {rating}</span>}
                  <span className="truncate">{movie.origin_name}</span>
                </div>
              </div>
            </div>
          );
        })}

        {debouncedKeyword && !isLoading && searchResults.length === 0 && (
          <p className="text-xs text-zinc-400 text-center py-6">
            Không tìm thấy phim phù hợp.
          </p>
        )}

        {searchResults.length > 0 && (
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-center text-xs text-zinc-300 hover:text-white py-2 mt-2 rounded bg-surface-card hover:bg-surface-border transition-colors font-medium border border-surface-border"
          >
            Xem tất cả kết quả cho "{keyword}"
          </button>
        )}
      </div>
    </Modal>
  );
};

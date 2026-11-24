import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bookmark, Share2, Check, ChevronRight } from 'lucide-react';
import { useMovieDetail, useFavorites, useWatchHistory, useMovieList } from '../hooks';
import { getImageUrl, formatRating, stripHtml } from '../utils';
import { VideoPlayer, EpisodeSelector, MovieGrid } from '../components/movie';
import { Button, EmptyState } from '../components/common';
import { EpisodeItem } from '../types';

export const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useMovieDetail(slug || '');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { saveHistory } = useWatchHistory();

  const [currentServerIndex, setCurrentServerIndex] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState<EpisodeItem | null>(null);
  const [copied, setCopied] = useState(false);

  const movie = data?.movie;
  const servers = data?.episodes || [];

  // Default to first episode
  useEffect(() => {
    if (servers.length > 0 && servers[0]?.server_data?.length > 0) {
      setCurrentServerIndex(0);
      setCurrentEpisode(servers[0].server_data[0]);
    }
  }, [movie?._id]);

  // Save history
  useEffect(() => {
    if (movie && currentEpisode) {
      saveHistory({
        movieId: movie._id,
        slug: movie.slug,
        name: movie.name,
        originName: movie.origin_name,
        posterUrl: movie.poster_url || movie.thumb_url,
        episodeName: currentEpisode.name,
        episodeSlug: currentEpisode.slug,
        serverName: servers[currentServerIndex]?.server_name || 'Server 1',
      });
    }
  }, [movie?.slug, currentEpisode?.slug, currentServerIndex]);

  // Related movies
  const primaryCategorySlug = movie?.category?.[0]?.slug || '';
  const { data: relatedData } = useMovieList('phim-moi-cap-nhat', {
    category: primaryCategorySlug,
    limit: 6,
  });

  const relatedMovies = useMemo(() => {
    if (!relatedData?.items) return [];
    return relatedData.items.filter((m) => m.slug !== movie?.slug).slice(0, 6);
  }, [relatedData?.items, movie?.slug]);

  // Next episode logic
  const currentEpisodesList = servers[currentServerIndex]?.server_data || [];
  const currentEpIndex = currentEpisodesList.findIndex(
    (ep) => ep.slug === currentEpisode?.slug
  );
  const hasNextEpisode = currentEpIndex >= 0 && currentEpIndex < currentEpisodesList.length - 1;

  const handleNextEpisode = () => {
    if (hasNextEpisode) {
      setCurrentEpisode(currentEpisodesList[currentEpIndex + 1]);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="py-4 space-y-4 animate-pulse">
        <div className="w-full aspect-video max-h-[480px] bg-surface-subtle rounded-lg" />
        <div className="h-28 bg-surface-subtle rounded-lg" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="py-20 text-center">
        <EmptyState
          title="Không tìm thấy phim"
          description="Phim này có thể không tồn tại hoặc tạm thời không khả dụng."
          actionLabel="Tải lại trang"
          onAction={() => refetch()}
        />
      </div>
    );
  }

  const favorite = isFavorite(movie.slug);
  const rating = formatRating(movie.tmdb?.vote_average);
  const posterUrl = getImageUrl(movie.poster_url || movie.thumb_url);

  return (
    <div className="pb-12 pt-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3 flex-wrap">
        <Link to="/" className="hover:text-white transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        {movie.type === 'series' ? (
          <Link to="/danh-sach/phim-bo?type=series" className="hover:text-white transition-colors">
            Phim bộ
          </Link>
        ) : (
          <Link to="/danh-sach/phim-le?type=single" className="hover:text-white transition-colors">
            Phim lẻ
          </Link>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-200 truncate max-w-[200px]">{movie.name}</span>
      </nav>

      {/* Video Player */}
      {currentEpisode && (
        <VideoPlayer
          embedUrl={currentEpisode.link_embed}
          movieTitle={movie.name}
          episodeName={`Tập ${currentEpisode.name}`}
          serverName={servers[currentServerIndex]?.server_name}
          hasNextEpisode={hasNextEpisode}
          onNextEpisode={handleNextEpisode}
        />
      )}

      {/* Episode Selector */}
      {servers.length > 0 && (
        <EpisodeSelector
          servers={servers}
          currentServerIndex={currentServerIndex}
          currentEpisodeSlug={currentEpisode?.slug || ''}
          onSelectEpisode={(srvIdx, ep) => {
            setCurrentServerIndex(srvIdx);
            setCurrentEpisode(ep);
          }}
          className="mb-6"
        />
      )}

      {/* Movie Details Box */}
      <div className="bg-surface-subtle border border-surface-border rounded-lg p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Poster */}
          <div className="w-28 sm:w-36 md:w-44 shrink-0 mx-auto sm:mx-0">
            <img
              src={posterUrl}
              alt={movie.name}
              className="w-full aspect-[2/3] object-cover rounded-lg bg-surface-card border border-surface-border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getImageUrl(movie.thumb_url);
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {movie.name}
                </h1>

                {/* Save and Share Buttons */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <Button
                    variant={favorite ? 'primary' : 'secondary'}
                    size="sm"
                    leftIcon={<Bookmark className={`w-3.5 h-3.5 ${favorite ? 'fill-white' : ''}`} />}
                    onClick={() => toggleFavorite(movie)}
                    className="text-xs !py-1 !min-h-[32px]"
                  >
                    {favorite ? 'Đã lưu' : 'Lưu'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    onClick={handleShare}
                    className="text-xs !py-1 !min-h-[32px]"
                  >
                    {copied ? 'Đã sao chép' : 'Chia sẻ'}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-3">
                {movie.origin_name} {movie.year ? `(${movie.year})` : ''}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs">
                {rating !== '0.0' && (
                  <span className="bg-zinc-800 text-amber-400 px-2 py-0.5 rounded font-medium">
                    ★ {rating} TMDB
                  </span>
                )}
                {movie.quality && (
                  <span className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded font-medium">
                    {movie.quality}
                  </span>
                )}
                {movie.lang && (
                  <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                    {movie.lang}
                  </span>
                )}
                {movie.episode_current && (
                  <span className="bg-zinc-800 text-emerald-400 px-2 py-0.5 rounded font-medium">
                    {movie.episode_current}
                  </span>
                )}
                {movie.time && (
                  <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                    {movie.time}
                  </span>
                )}
              </div>
            </div>

            {/* Synopsis */}
            {movie.content && (
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-4 font-normal mt-2">
                {stripHtml(movie.content)}
              </p>
            )}

            {/* Categories & Country */}
            <div className="mt-4 pt-3 border-t border-surface-border text-xs text-zinc-400 flex flex-wrap gap-x-4 gap-y-1">
              {movie.category && movie.category.length > 0 && (
                <div>
                  <span className="text-zinc-500 mr-1.5">Thể loại:</span>
                  {movie.category.map((cat, idx) => (
                    <React.Fragment key={cat.slug}>
                      <Link
                        to={`/kham-pha?category=${cat.slug}`}
                        className="text-zinc-300 hover:text-white"
                      >
                        {cat.name}
                      </Link>
                      {idx < movie.category.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {movie.country && movie.country.length > 0 && (
                <div>
                  <span className="text-zinc-500 mr-1.5">Quốc gia:</span>
                  {movie.country.map((c) => c.name).join(', ')}
                </div>
              )}

              {movie.director && movie.director.length > 0 && movie.director[0] !== '' && (
                <div>
                  <span className="text-zinc-500 mr-1.5">Đạo diễn:</span>
                  <span className="text-zinc-300">{movie.director.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <section className="mt-8">
          <h3 className="text-base font-bold text-white tracking-tight mb-3">
            Phim cùng thể loại
          </h3>
          <MovieGrid movies={relatedMovies} />
        </section>
      )}
    </div>
  );
};

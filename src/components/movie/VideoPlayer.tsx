import React, { useState } from 'react';
import { RotateCw, Maximize2, Minimize2, SkipForward } from 'lucide-react';

export interface VideoPlayerProps {
  embedUrl: string;
  movieTitle: string;
  episodeName?: string;
  serverName?: string;
  hasNextEpisode?: boolean;
  onNextEpisode?: () => void;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedUrl,
  movieTitle,
  episodeName,
  serverName,
  hasNextEpisode,
  onNextEpisode,
  className = '',
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className={`w-full mb-4 sm:mb-6 ${className}`}>
      {/* Player Header bar */}
      <div className="flex items-center justify-between bg-surface-subtle border border-surface-border rounded-t-lg px-3 py-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="font-semibold text-zinc-100 truncate">
            {movieTitle} {episodeName ? `• ${episodeName}` : ''}
          </span>
          {serverName && (
            <span className="hidden sm:inline-block text-[11px] text-zinc-400 bg-surface-card px-1.5 py-0.5 rounded border border-surface-border shrink-0">
              {serverName.trim()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {hasNextEpisode && onNextEpisode && (
            <button
              type="button"
              onClick={onNextEpisode}
              className="flex items-center gap-1 text-[11px] px-2 py-1 text-zinc-300 hover:text-white rounded hover:bg-surface-border transition-colors"
            >
              <SkipForward className="w-3 h-3" />
              <span>Tập tiếp</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReload}
            title="Tải lại"
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-surface-border transition-colors"
            aria-label="Tải lại"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsTheater(!isTheater)}
            title="Chế độ rạp"
            className="hidden sm:block p-1.5 text-zinc-400 hover:text-white rounded hover:bg-surface-border transition-colors"
            aria-label="Chế độ rạp"
          >
            {isTheater ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Iframe Container */}
      <div
        className={`relative w-full bg-black rounded-b-lg overflow-hidden border-x border-b border-surface-border aspect-video ${
          isTheater ? 'sm:aspect-[21/9]' : ''
        }`}
      >
        <iframe
          key={iframeKey}
          src={embedUrl}
          title={`${movieTitle} - ${episodeName || ''}`}
          className="w-full h-full border-0 absolute inset-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </div>
  );
};

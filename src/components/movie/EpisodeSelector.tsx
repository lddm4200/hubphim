import React from 'react';
import { Check } from 'lucide-react';
import { EpisodeServer, EpisodeItem } from '../../types';
import { useWatchHistory } from '../../hooks';

export interface EpisodeSelectorProps {
  servers: EpisodeServer[];
  currentServerIndex: number;
  currentEpisodeSlug: string;
  onSelectEpisode: (serverIndex: number, episode: EpisodeItem) => void;
  className?: string;
}

export const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  servers = [],
  currentServerIndex,
  currentEpisodeSlug,
  onSelectEpisode,
  className = '',
}) => {
  const { history } = useWatchHistory();
  const currentServer = servers[currentServerIndex] || servers[0];
  const episodes = currentServer?.server_data || [];

  if (!servers || servers.length === 0 || episodes.length === 0) {
    return null;
  }

  const isEpisodeWatched = (epSlug: string) => {
    return history.some((h) => h.episodeSlug === epSlug);
  };

  return (
    <div className={`bg-surface-subtle border border-surface-border rounded-lg p-3 sm:p-4 ${className}`}>
      {/* Server selector */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-surface-border flex-wrap">
        <span className="text-xs font-semibold text-zinc-300">Nguồn phát:</span>

        {servers.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {servers.map((srv, idx) => {
              const isActive = idx === currentServerIndex;
              const serverTitle = srv.server_name.replace(/\r\n|\n|\r/g, ' ').trim();
              return (
                <button
                  key={`server-${idx}`}
                  onClick={() => onSelectEpisode(idx, srv.server_data[0])}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-black font-semibold'
                      : 'bg-surface-card text-zinc-300 hover:text-white border border-surface-border'
                  }`}
                >
                  {serverTitle || `Server ${idx + 1}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Episode Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-zinc-400">
          Danh sách tập ({episodes.length} tập)
        </span>
      </div>

      {/* Episode Grid - Touch friendly on mobile */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1.5 max-h-60 overflow-y-auto pr-1">
        {episodes.map((ep) => {
          const isActive = ep.slug === currentEpisodeSlug;
          const watched = isEpisodeWatched(ep.slug);

          return (
            <button
              key={ep.slug}
              onClick={() => onSelectEpisode(currentServerIndex, ep)}
              className={`relative flex items-center justify-center py-2 px-1 rounded-md text-xs font-medium transition-colors min-h-[38px] ${
                isActive
                  ? 'bg-brand text-white font-bold'
                  : 'bg-surface-card hover:bg-surface-border text-zinc-200 border border-surface-border/60'
              }`}
            >
              <span>{ep.name}</span>
              {watched && !isActive && (
                <Check className="w-2.5 h-2.5 text-zinc-400 absolute top-1 right-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

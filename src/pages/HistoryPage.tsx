import React from 'react';
import { Play, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWatchHistory } from '../hooks';
import { getImageUrl } from '../utils';
import { EmptyState, Button } from '../components/common';

export const HistoryPage: React.FC = () => {
  const { history, removeHistory, clearHistory } = useWatchHistory();

  return (
    <div className="pb-12 pt-1 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Lịch sử xem
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {history.length} phim đã xem
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-zinc-400" />}
            className="text-xs text-zinc-400 hover:text-red-400 !py-1 !min-h-[30px]"
          >
            Xóa tất cả
          </Button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-2">
          {history.map((item) => {
            const poster = getImageUrl(item.posterUrl);

            return (
              <div
                key={item.slug}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-surface-subtle border border-surface-border"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={poster}
                    alt={item.name}
                    className="w-10 h-14 sm:w-12 sm:h-16 object-cover rounded bg-surface-card shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      to={`/phim/${item.slug}`}
                      className="text-xs sm:text-sm font-medium text-zinc-100 hover:text-brand truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {item.originName || item.name}
                    </p>
                    <span className="inline-block text-[10px] text-brand font-medium mt-1">
                      Đang xem: Tập {item.episodeName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Link to={`/phim/${item.slug}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Play className="w-3 h-3 fill-white" />}
                      className="text-xs !py-1 !px-2.5 !min-h-[30px]"
                    >
                      Xem tiếp
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeHistory(item.slug)}
                    title="Xóa"
                    className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Chưa có lịch sử"
          description="Các phim và tập bạn xem sẽ được tự động lưu lại tại đây."
        />
      )}
    </div>
  );
};

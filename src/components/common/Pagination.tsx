import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        start = 2;
        end = 3;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
        end = totalPages - 1;
      }

      pages.push(1);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {/* Prev */}
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="!p-2 min-w-[36px] min-h-[36px]"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="px-1 text-zinc-500 text-sm select-none">
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;
        return (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(p as number)}
            className={`min-w-[36px] h-[36px] px-2.5 rounded-lg text-sm font-medium transition-colors ${
              isCurrent
                ? 'bg-zinc-100 text-black font-semibold'
                : 'bg-surface-subtle text-zinc-300 hover:bg-surface-border border border-surface-border'
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="!p-2 min-w-[36px] min-h-[36px]"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

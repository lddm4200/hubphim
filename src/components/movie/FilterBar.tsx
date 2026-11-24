import React from 'react';
import { RotateCcw } from 'lucide-react';
import { FilterParams } from '../../types';
import { CATEGORIES, COUNTRIES, YEARS, MOVIE_TYPES, MOVIE_STATUSES } from '../../constants';

export interface FilterBarProps {
  filters: FilterParams;
  onChange: (updatedFilters: Partial<FilterParams>) => void;
  onReset: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  className = '',
}) => {
  const hasActiveFilters = Boolean(
    filters.category ||
    filters.country ||
    filters.year ||
    filters.type ||
    filters.status
  );

  return (
    <div
      className={`bg-surface-subtle border border-surface-border rounded-lg p-3 mb-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-zinc-300">Bộ lọc</span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt lại</span>
          </button>
        )}
      </div>

      {/* Select Controls Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {/* Type */}
        <select
          value={filters.type || ''}
          onChange={(e) => onChange({ type: e.target.value, page: 1 })}
          className="bg-surface-card border border-surface-border text-zinc-200 text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer min-h-[38px]"
        >
          {MOVIE_TYPES.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={filters.category || ''}
          onChange={(e) => onChange({ category: e.target.value, page: 1 })}
          className="bg-surface-card border border-surface-border text-zinc-200 text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer min-h-[38px]"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Country */}
        <select
          value={filters.country || ''}
          onChange={(e) => onChange({ country: e.target.value, page: 1 })}
          className="bg-surface-card border border-surface-border text-zinc-200 text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer min-h-[38px]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={filters.year || ''}
          onChange={(e) => onChange({ year: e.target.value, page: 1 })}
          className="bg-surface-card border border-surface-border text-zinc-200 text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer min-h-[38px]"
        >
          {YEARS.map((y) => (
            <option key={y.slug} value={y.slug}>
              {y.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status || ''}
          onChange={(e) => onChange({ status: e.target.value, page: 1 })}
          className="bg-surface-card border border-surface-border text-zinc-200 text-xs rounded-md px-2.5 py-2 focus:outline-none focus:border-zinc-500 cursor-pointer min-h-[38px] col-span-2 sm:col-span-1"
        >
          {MOVIE_STATUSES.map((st) => (
            <option key={st.slug} value={st.slug}>
              {st.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

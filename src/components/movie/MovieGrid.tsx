import React from 'react';
import { MovieItem } from '../../types';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from '../common';

export interface MovieGridProps {
  movies?: MovieItem[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies = [],
  isLoading = false,
  skeletonCount = 12,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4 ${className}`}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MovieCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4 ${className}`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie._id || movie.slug} movie={movie} />
      ))}
    </div>
  );
};

import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-zinc-800/60 rounded ${className}`}
    />
  );
};

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
    </div>
  );
};

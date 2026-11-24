import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../api';
import { MovieDetailResponse } from '../types';

export function useMovieDetail(slug: string) {
  return useQuery<MovieDetailResponse, Error>({
    queryKey: ['movies', 'detail', slug],
    queryFn: () => movieApi.getMovieDetail(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes cache for details
    enabled: Boolean(slug && slug.trim().length > 0),
  });
}

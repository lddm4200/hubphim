import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { movieApi } from '../api';
import { MovieListResponse } from '../types';

export function useLatestMovies(page: number = 1) {
  return useQuery<MovieListResponse, Error>({
    queryKey: ['movies', 'latest', page],
    queryFn: () => movieApi.getLatestMovies(page),
    staleTime: 3 * 60 * 1000, // 3 minutes
    placeholderData: keepPreviousData,
  });
}

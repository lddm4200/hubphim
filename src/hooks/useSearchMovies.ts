import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { movieApi } from '../api';
import { MovieListResponse } from '../types';

export function useSearchMovies(keyword: string, page: number = 1, limit: number = 20) {
  const trimmed = keyword.trim();

  return useQuery<MovieListResponse, Error>({
    queryKey: ['movies', 'search', trimmed, page, limit],
    queryFn: () => movieApi.searchMovies({ keyword: trimmed, page, limit }),
    enabled: trimmed.length > 0,
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

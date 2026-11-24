import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { movieApi } from '../api';
import { MovieListResponse, FilterParams } from '../types';

export function useMovieList(slug: string = 'phim-moi-cap-nhat', params: FilterParams = {}) {
  return useQuery<MovieListResponse, Error>({
    queryKey: ['movies', 'list', slug, params],
    queryFn: () => movieApi.getMovieList(slug, params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

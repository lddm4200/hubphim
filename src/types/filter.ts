export type MovieType = 'single' | 'series' | 'hoathinh' | 'tvshows';
export type MovieStatus = 'trailer' | 'ongoing' | 'completed';

export interface FilterParams {
  page?: number;
  limit?: number;
  year?: string | number;
  country?: string;
  category?: string;
  type?: MovieType | string;
  status?: MovieStatus | string;
  sort_field?: string;
}

export interface SearchParams {
  keyword: string;
  page?: number;
  limit?: number;
}

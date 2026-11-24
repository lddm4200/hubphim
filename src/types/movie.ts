export interface TmdbInfo {
  type?: string;
  id?: string | number | null;
  season?: number | null;
  vote_average?: string | number;
  vote_count?: number;
}

export interface ImdbInfo {
  id?: string | null;
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface CountryItem {
  id: number;
  name: string;
  slug: string;
}

export interface MovieItem {
  _id: number;
  name: string;
  origin_name: string;
  slug: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  tmdb?: TmdbInfo;
  imdb?: ImdbInfo;
  modified?: {
    time: string;
  };
}

export interface EpisodeItem {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8?: string;
}

export interface EpisodeServer {
  server_name: string;
  server_data: EpisodeItem[];
}

export interface MovieDetail extends MovieItem {
  content: string;
  type: 'single' | 'series' | 'hoathinh' | 'tvshows' | string;
  status: 'trailer' | 'ongoing' | 'completed' | string;
  trailer_url?: string | null;
  time?: string;
  episode_current?: string;
  episode_total?: string;
  quality?: string;
  lang?: string;
  notify?: string | null;
  showtimes?: string | null;
  keywords?: string[];
  view?: number;
  chieurap?: boolean;
  sub_docquyen?: boolean;
  actor: string[];
  director: string[];
  category: CategoryItem[];
  country: CountryItem[];
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface MovieListResponse {
  status: boolean;
  msg?: string;
  items: MovieItem[];
  pathImage?: string;
  pagination: Pagination;
}

export interface MovieDetailResponse {
  status: boolean;
  msg?: string;
  movie: MovieDetail;
  episodes: EpisodeServer[];
}

import { fetcher } from './client';
import {
  MovieListResponse,
  MovieDetailResponse,
  FilterParams,
  SearchParams,
} from '../types';

export const movieApi = {
  /**
   * Lấy danh sách phim mới cập nhật
   * Endpoint: /api/danh-sach/phim-moi-cap-nhat?page=1
   */
  async getLatestMovies(page: number = 1): Promise<MovieListResponse> {
    return fetcher<MovieListResponse>(`/danh-sach/phim-moi-cap-nhat?page=${page}`);
  },

  /**
   * Lấy danh sách phim theo slug danh sách kết hợp bộ lọc
   * Endpoint: /api/danh-sach/[slug]
   */
  async getMovieList(
    slug: string = 'phim-moi-cap-nhat',
    params: FilterParams = {}
  ): Promise<MovieListResponse> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.year) searchParams.append('year', params.year.toString());
    if (params.country) searchParams.append('country', params.country);
    if (params.category) searchParams.append('category', params.category);
    if (params.type) searchParams.append('type', params.type);
    if (params.status) searchParams.append('status', params.status);
    if (params.sort_field) searchParams.append('sort_field', params.sort_field);

    const queryString = searchParams.toString();
    const endpoint = `/danh-sach/${slug}${queryString ? `?${queryString}` : ''}`;

    return fetcher<MovieListResponse>(endpoint);
  },

  /**
   * Tìm kiếm phim theo từ khóa
   * Endpoint: /api/tim-kiem?keyword=[keyword]&page=1&limit=20
   */
  async searchMovies({ keyword, page = 1, limit = 20 }: SearchParams): Promise<MovieListResponse> {
    if (!keyword.trim()) {
      return {
        status: true,
        items: [],
        pagination: {
          currentPage: 1,
          totalItems: 0,
          totalItemsPerPage: limit,
          totalPages: 0,
        },
      };
    }

    const searchParams = new URLSearchParams({
      keyword: keyword.trim(),
      page: page.toString(),
      limit: limit.toString(),
    });

    return fetcher<MovieListResponse>(`/tim-kiem?${searchParams.toString()}`);
  },

  /**
   * Lấy chi tiết phim và danh sách tập
   * Endpoint: /api/phim/[slug]
   */
  async getMovieDetail(slug: string): Promise<MovieDetailResponse> {
    return fetcher<MovieDetailResponse>(`/phim/${encodeURIComponent(slug)}`);
  },
};

import { API_BASE_URL } from '../constants';

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      ...options,
    });

    if (!res.ok) {
      throw new ApiError(`Request failed with status ${res.status}: ${res.statusText}`, res.status);
    }

    const data = await res.json();
    return data as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Unknown network error';
    throw new ApiError(message);
  }
}

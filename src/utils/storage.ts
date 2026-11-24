import { MovieItem, WatchHistoryItem } from '../types';

const FAVORITES_KEY = 'vsmov_favorites';
const HISTORY_KEY = 'vsmov_watch_history';

export const storage = {
  getFavorites(): MovieItem[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isFavorite(slug: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some((item) => item.slug === slug);
  },

  toggleFavorite(movie: MovieItem): boolean {
    try {
      const favorites = this.getFavorites();
      const exists = favorites.some((item) => item.slug === movie.slug);
      let updated: MovieItem[];
      if (exists) {
        updated = favorites.filter((item) => item.slug !== movie.slug);
      } else {
        updated = [movie, ...favorites];
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  },

  removeFavorite(slug: string): void {
    const favorites = this.getFavorites();
    const updated = favorites.filter((item) => item.slug !== slug);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  },

  getHistory(): WatchHistoryItem[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveHistory(item: Omit<WatchHistoryItem, 'updatedAt'>): void {
    try {
      const history = this.getHistory();
      const filtered = history.filter((h) => h.slug !== item.slug);
      const updated: WatchHistoryItem[] = [
        { ...item, updatedAt: Date.now() },
        ...filtered,
      ].slice(0, 50); // limit to last 50 movies
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save watch history', e);
    }
  },

  removeHistory(slug: string): void {
    const history = this.getHistory();
    const updated = history.filter((item) => item.slug !== slug);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  },

  clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
  },
};

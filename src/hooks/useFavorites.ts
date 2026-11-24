import { useState, useEffect, useCallback } from 'react';
import { MovieItem } from '../types';
import { storage } from '../utils';

export function useFavorites() {
  const [favorites, setFavorites] = useState<MovieItem[]>(() => storage.getFavorites());

  // Listen to cross-tab updates or manual updates
  useEffect(() => {
    const handleStorage = () => {
      setFavorites(storage.getFavorites());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.some((item) => item.slug === slug),
    [favorites]
  );

  const toggleFavorite = useCallback((movie: MovieItem) => {
    const isAdded = storage.toggleFavorite(movie);
    setFavorites(storage.getFavorites());
    return isAdded;
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    storage.removeFavorite(slug);
    setFavorites(storage.getFavorites());
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
  };
}

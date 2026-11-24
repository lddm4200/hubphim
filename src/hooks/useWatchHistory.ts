import { useState, useEffect, useCallback } from 'react';
import { WatchHistoryItem } from '../types';
import { storage } from '../utils';

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>(() => storage.getHistory());

  useEffect(() => {
    const handleStorage = () => {
      setHistory(storage.getHistory());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const saveHistory = useCallback((item: Omit<WatchHistoryItem, 'updatedAt'>) => {
    storage.saveHistory(item);
    setHistory(storage.getHistory());
  }, []);

  const removeHistory = useCallback((slug: string) => {
    storage.removeHistory(slug);
    setHistory(storage.getHistory());
  }, []);

  const clearHistory = useCallback(() => {
    storage.clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    saveHistory,
    removeHistory,
    clearHistory,
  };
}

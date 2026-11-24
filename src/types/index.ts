export * from './movie';
export * from './filter';

export interface WatchHistoryItem {
  movieId: number;
  slug: string;
  name: string;
  originName: string;
  posterUrl: string;
  episodeName: string;
  episodeSlug: string;
  serverName: string;
  updatedAt: number;
}

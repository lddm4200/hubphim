import { PLACEHOLDER_POSTER } from '../constants';

export const getImageUrl = (url?: string | null, pathPrefix?: string): string => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return PLACEHOLDER_POSTER;
  }

  // Already a full URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If pathPrefix is given
  if (pathPrefix) {
    const cleanPrefix = pathPrefix.endsWith('/') ? pathPrefix : `${pathPrefix}/`;
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return `${cleanPrefix}${cleanUrl}`;
  }

  // Default fallback image CDN for vsmov
  if (url.startsWith('/storage/')) {
    return `https://vsmov.com${url}`;
  }

  return `https://vsmov.com/storage/images/${url.startsWith('/') ? url.slice(1) : url}`;
};

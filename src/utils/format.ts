export const formatRating = (score?: string | number | null): string => {
  if (score === undefined || score === null) return '0.0';
  const num = typeof score === 'number' ? score : parseFloat(score);
  if (isNaN(num)) return '0.0';
  return num.toFixed(1);
};

export const formatDuration = (time?: string | null): string => {
  if (!time) return 'N/A';
  return time;
};

export const stripHtml = (html?: string | null): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

export const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('vi-VN');
  } catch {
    return '';
  }
};

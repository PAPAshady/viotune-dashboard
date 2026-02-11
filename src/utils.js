// an utility function to convert milliseconds into currect time format
export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const fomrattedMinsAndSeconds = `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (hours) {
    const formattedHours = `${hours.toString().padStart(2, '0')}:`;
    return formattedHours + fomrattedMinsAndSeconds;
  }

  return fomrattedMinsAndSeconds;
};

export function getPagination(currentPage, totalPages, siblingCount = 1, boundaryCount = 1) {
  const pages = [];

  // left boundary
  for (let i = 1; i <= boundaryCount; i++) pages.push(i);

  // sibling range
  const leftSibling = Math.max(currentPage - siblingCount, boundaryCount + 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

  if (leftSibling > boundaryCount + 1) pages.push('...'); // left ellipsis

  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i); // window

  if (rightSibling < totalPages - boundaryCount) pages.push('...'); // right ellipsis

  // right boundary
  for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) pages.push(i);

  return pages;
}

// Adds a human-readable date label (e.g. "Jan 6") to each chart data item
// based on its `created_at` timestamp. Keeps the original date intact.
export const addDateLabelToChartData = (chartData) =>
  chartData?.map((item) => {
    return {
      ...item,
      dateLabel: new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };
  });

export const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = (now - past) / 1000; // difference in seconds

  if (diff < 60) return 'just now';

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
  ];

  for (let unit of units) {
    const amount = Math.floor(diff / unit.seconds);
    if (amount >= 1) {
      return `${amount} ${unit.name}${amount > 1 ? 's' : ''} ago`;
    }
  }
};

export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

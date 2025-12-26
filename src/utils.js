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

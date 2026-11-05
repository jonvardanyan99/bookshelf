type CoverSize = 'L' | 'M' | 'S';

export const getCoverUrl = (coverId: number, size: CoverSize) =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

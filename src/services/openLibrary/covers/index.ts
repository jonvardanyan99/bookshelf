import type { CoverSize } from '@/types/models';

export const getCoverUrl = (coverId: number, size: CoverSize) =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

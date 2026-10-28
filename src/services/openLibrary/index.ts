import { cacheLife } from 'next/cache';

import type { GetSubjectResponse, GetSubjectVariables } from '@/services/openLibrary/types';

type CoverSize = 'L' | 'M' | 'S';

export const getCoverUrl = (coverId: number, size: CoverSize) =>
  `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;

export const getSubject = async ({ limit = 3, subject }: GetSubjectVariables) => {
  'use cache';
  cacheLife('days');

  const response = await fetch(
    `https://openlibrary.org/subjects/${subject}.json?${new URLSearchParams({ limit: String(limit) })}`,
    { headers: { 'User-Agent': 'Bookshelf' } },
  );

  if (!response.ok) {
    throw new Error(`Failed to load subject "${subject}": ${response.status}`);
  }

  return (await response.json()) as GetSubjectResponse;
};

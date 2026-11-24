import { cacheLife } from 'next/cache';

import type { OpenLibraryResult } from '@/types/models';

export const fetchOpenLibrary = async <OpenLibraryResponse>(
  path: string,
  searchParams: Record<string, string>,
): Promise<OpenLibraryResult<OpenLibraryResponse>> => {
  'use cache';

  try {
    const url = new URL(path, process.env.OPEN_LIBRARY_URL);
    url.search = new URLSearchParams(searchParams).toString();

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Bookshelf' },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      cacheLife('minutes');

      return { data: null, status: response.status };
    }

    const responseBody = (await response.json()) as OpenLibraryResponse;

    cacheLife('days');

    return { data: responseBody, status: response.status };
  } catch {
    cacheLife('minutes');

    return { data: null, status: null };
  }
};

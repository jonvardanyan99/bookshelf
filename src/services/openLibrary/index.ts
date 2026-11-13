import { cacheLife } from 'next/cache';

export const fetchOpenLibrary = async <OpenLibraryResponse>(
  path: string,
  searchParams: Record<string, string>,
) => {
  'use cache';

  try {
    const url = new URL(path, process.env.OPEN_LIBRARY_URL);
    url.search = new URLSearchParams(searchParams).toString();

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Bookshelf' },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Open Library request failed with status ${String(response.status)}`);
    }

    const responseBody = (await response.json()) as OpenLibraryResponse;

    cacheLife('days');

    return responseBody;
  } catch {
    cacheLife('minutes');

    return null;
  }
};

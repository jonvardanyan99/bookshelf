import { create } from 'axios';

const openLibraryClient = create({
  baseURL: process.env.OPEN_LIBRARY_URL,
  headers: { 'User-Agent': 'Bookshelf' },
  timeout: 10_000,
});

export const fetchOpenLibrary = async <OpenLibraryResponse>(
  path: string,
  searchParams: Record<string, string>,
) => {
  const response = await openLibraryClient.get<OpenLibraryResponse>(path, {
    params: searchParams,
  });

  return response.data;
};

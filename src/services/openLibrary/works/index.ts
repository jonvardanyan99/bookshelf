import { fetchOpenLibrary } from '@/services/openLibrary';
import type {
  GetWorkBookshelvesResponse,
  GetWorkRatingsResponse,
  GetWorkResponse,
  GetWorkVariables,
} from '@/services/openLibrary/works/types';

export const getWork = ({ workId }: GetWorkVariables) =>
  fetchOpenLibrary<GetWorkResponse>(`/works/${workId}.json`, {});

export const getWorkRatings = ({ workId }: GetWorkVariables) =>
  fetchOpenLibrary<GetWorkRatingsResponse>(`/works/${workId}/ratings.json`, {});

export const getWorkBookshelves = ({ workId }: GetWorkVariables) =>
  fetchOpenLibrary<GetWorkBookshelvesResponse>(`/works/${workId}/bookshelves.json`, {});

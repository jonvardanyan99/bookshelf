import { fetchOpenLibrary } from '@/services/openLibrary';
import type { GetAuthorResponse, GetAuthorVariables } from '@/services/openLibrary/authors/types';

export const getAuthor = ({ authorKey }: GetAuthorVariables) =>
  fetchOpenLibrary<GetAuthorResponse>(`${authorKey}.json`, {});

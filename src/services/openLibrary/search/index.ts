import { fetchOpenLibrary } from '@/services/openLibrary';
import type {
  SearchWorksResponse,
  SearchWorksVariables,
} from '@/services/openLibrary/search/types';

export const searchWorks = ({ limit = 20, query, sort = 'trending' }: SearchWorksVariables) =>
  fetchOpenLibrary<SearchWorksResponse>('/search.json', {
    fields: 'author_name,cover_i,key,title',
    has_fulltext: 'true',
    limit: String(limit),
    // eslint-disable-next-line id-length -- the Search API names its query parameter `q`
    q: `${query} language:eng`,
    sort,
  });

export type SearchSort = 'new' | 'random.daily' | 'trending' | 'want_to_read';

export interface SearchWorksVariables {
  limit?: number;
  query: string;
  sort?: SearchSort;
}

export interface SearchWorksResponse {
  docs: {
    author_name?: string[];
    cover_i?: number;
    key: string;
    title: string;
  }[];
  numFound: number;
}

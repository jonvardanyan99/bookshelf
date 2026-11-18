import type { SearchSort } from '@/services/openLibrary/search/types';

export type ToastType = 'error' | 'success';

export interface Subgenre {
  name: string;
  query: string;
  slug: string;
  sort?: SearchSort;
}

export interface Genre {
  name: string;
  query: string;
  slug: string;
  subgenres: Subgenre[];
  subject: string;
  title: string;
}

export interface ParsedForm<Data> {
  data: Data | null;
  errors: Partial<Record<keyof Data, string[]>>;
  values: Partial<Record<string, string>>;
}

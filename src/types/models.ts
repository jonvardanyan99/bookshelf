import type { SearchSort } from '@/services/openLibrary/search/types';

export type ToastType = 'error' | 'success';

export type CoverSize = 'L' | 'M' | 'S';

export interface Subgenre {
  name: string;
  query: string;
  slug: string;
  sort?: SearchSort;
}

export interface Genre {
  coversSubject: string;
  name: string;
  query: string;
  slug: string;
  subgenres: Subgenre[];
  title: string;
}

export interface OpenLibraryResult<OpenLibraryResponse> {
  data: OpenLibraryResponse | null;
  status: number | null;
}

export interface ParsedForm<Data> {
  data: Data | null;
  errors: Partial<Record<keyof Data, string[]>>;
  values: Partial<Record<string, string>>;
}

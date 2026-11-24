import type { GetWorkResponse, Work, WorkRedirect } from '@/services/openLibrary/works/types';

export const getBookId = (bookKey: string) => bookKey.replace('/works/', '');

export const isBookId = (bookId: string) => /^OL\d+W$/.test(bookId);

export const isBook = (bookRecord: GetWorkResponse): bookRecord is Work =>
  bookRecord.type.key === '/type/work';

export const isMergedBook = (bookRecord: GetWorkResponse): bookRecord is WorkRedirect =>
  bookRecord.type.key === '/type/redirect';

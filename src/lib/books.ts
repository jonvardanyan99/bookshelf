import 'server-only';

import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { getWork } from '@/services/openLibrary/works';
import { getBookId, isBook, isBookId, isMergedBook } from '@/utils/bookRecords';

export const getBookOrExit = async (bookId: string) => {
  if (!isBookId(bookId)) {
    notFound();
  }

  const bookResult = await getWork({ workId: bookId });

  if (bookResult.status === 404) {
    notFound();
  }

  if (!bookResult.data) {
    return null;
  }

  const book = bookResult.data;

  if (isMergedBook(book)) {
    const mergedIntoBookId = getBookId(book.location);
    const isValidMergeTarget = isBookId(mergedIntoBookId) && mergedIntoBookId !== bookId;

    if (!isValidMergeTarget) {
      notFound();
    }

    redirect(ROUTES.book(mergedIntoBookId));
  }

  if (!isBook(book)) {
    notFound();
  }

  return book;
};

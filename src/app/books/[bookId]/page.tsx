import type { Metadata } from 'next';
import { Suspense } from 'react';

import { BookDetails } from '@/app/books/[bookId]/components/BookDetails';
import { Loader } from '@/components/Loader';
import { getBookOrExit } from '@/lib/books';

export const generateMetadata = async ({
  params,
}: PageProps<'/books/[bookId]'>): Promise<Metadata> => {
  const { bookId } = await params;
  const book = await getBookOrExit(bookId);

  return book ? { title: book.title } : {};
};

export default function BookPage({ params }: PageProps<'/books/[bookId]'>) {
  return (
    <Suspense fallback={<Loader className="py-[134px]" size="large" />}>
      <BookDetails params={params} />
    </Suspense>
  );
}

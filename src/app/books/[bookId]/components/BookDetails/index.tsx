import { memo, Suspense } from 'react';

import { AuthorNames } from '@/app/books/[bookId]/components/BookDetails/components/AuthorNames';
import { BookStats } from '@/app/books/[bookId]/components/BookDetails/components/BookStats';
import { BookCover } from '@/components/BookCover';
import { EmptyData } from '@/components/EmptyData';
import { Loader } from '@/components/Loader';
import { ServerToast } from '@/components/ServerToast';
import { Typography } from '@/components/Typography';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { getBookOrExit } from '@/lib/books';

const TITLE_ID = 'book-title';
const DESCRIPTION_TITLE_ID = 'book-description-title';
const TOPICS_TITLE_ID = 'book-topics-title';

interface Props {
  params: PageProps<'/books/[bookId]'>['params'];
}

const Component: React.FC<Props> = async ({ params }) => {
  const { bookId } = await params;
  const book = await getBookOrExit(bookId);

  if (!book) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.openLibraryUnavailable} type="error" />;
  }

  const coverId = book.covers?.find((cover) => cover > 0);
  const description = (
    typeof book.description === 'string' ? book.description : book.description?.value
  )?.trim();
  const authorKeys = book.authors?.map((author) => author.author.key) ?? [];
  const topics = book.subjects
    ?.map((topic) => topic.trim())
    .filter((topic) => topic !== '')
    .join(', ');

  return (
    <section aria-labelledby={TITLE_ID} className="flex flex-col gap-[24px] sm:flex-row">
      <BookCover coverId={coverId} size="large" title={book.title} />
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[4px]">
          <Typography className="text-h2!" id={TITLE_ID} variant="h1">
            {book.title}
          </Typography>
          {authorKeys.length > 0 && (
            <Suspense fallback={<Loader className="py-[4px]" />}>
              <AuthorNames authorKeys={authorKeys} />
            </Suspense>
          )}
          {book.first_publish_date && (
            <Typography className="text-gray" variant="subtitle">
              First published in {book.first_publish_date}
            </Typography>
          )}
        </div>
        <Suspense fallback={<Loader className="py-[18px]" />}>
          <BookStats bookId={bookId} />
        </Suspense>
        <section aria-labelledby={DESCRIPTION_TITLE_ID}>
          <Typography className="mb-[12px] text-h4!" id={DESCRIPTION_TITLE_ID} variant="h2">
            Description
          </Typography>
          {description ? (
            <Typography className="whitespace-pre-line" variant="body">
              {description}
            </Typography>
          ) : (
            <EmptyData />
          )}
        </section>
        <section aria-labelledby={TOPICS_TITLE_ID}>
          <Typography className="mb-[12px] text-h4!" id={TOPICS_TITLE_ID} variant="h2">
            Topics
          </Typography>
          {topics ? <Typography variant="body">{topics}</Typography> : <EmptyData />}
        </section>
      </div>
    </section>
  );
};

export const BookDetails = memo(Component);

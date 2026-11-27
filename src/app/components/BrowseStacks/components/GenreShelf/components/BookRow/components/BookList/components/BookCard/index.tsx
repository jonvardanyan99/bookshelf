import { memo } from 'react';

import { BookCover } from '@/components/BookCover';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import type { SearchWorksResponse } from '@/services/openLibrary/search/types';
import { getBookId } from '@/utils/bookRecords';

interface Props {
  book: SearchWorksResponse['docs'][number];
}

const Component: React.FC<Props> = ({ book }) => (
  <li className="w-[120px] shrink-0">
    <Link className="group block" href={ROUTES.book(getBookId(book.key))} variant="plain">
      <BookCover
        className="mb-[8px] transition group-hover:translate-y-[-4px] group-hover:shadow-cover-lifted motion-reduce:transition-none"
        coverId={book.cover_i}
        size="medium"
        title={book.title}
      />
      <Typography
        className="truncate font-medium transition-colors group-hover:text-primary"
        variant="subtitle"
      >
        {book.title}
      </Typography>
      {book.author_name && (
        <Typography className="mt-[4px] truncate text-caption! text-gray" variant="subtitle">
          {book.author_name[0]}
        </Typography>
      )}
    </Link>
  </li>
);

export const BookCard = memo(Component);

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
      <BookCover className="mb-[8px]" coverId={book.cover_i} size="medium" title={book.title} />
      <Typography
        className="mb-[4px] truncate font-medium underline decoration-transparent transition-colors group-hover:decoration-current"
        variant="subtitle"
      >
        {book.title}
      </Typography>
      {book.author_name && (
        <Typography className="truncate text-caption! text-gray" variant="subtitle">
          {book.author_name[0]}
        </Typography>
      )}
    </Link>
  </li>
);

export const BookCard = memo(Component);

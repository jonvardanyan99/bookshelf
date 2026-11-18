import Image from 'next/image';
import { memo } from 'react';

import { Typography } from '@/components/Typography';
import { getCoverUrl } from '@/services/openLibrary/covers';
import type { SearchWorksResponse } from '@/services/openLibrary/search/types';

interface Props {
  book: SearchWorksResponse['docs'][number];
}

const Component: React.FC<Props> = ({ book }) => (
  <li className="w-[120px] shrink-0">
    <div className="relative mb-[8px] h-[180px] overflow-hidden rounded-[4px] border border-gray-light bg-white shadow-cover">
      {book.cover_i !== undefined && (
        <Image
          alt={book.title}
          className="object-cover"
          fill
          sizes="120px"
          src={getCoverUrl(book.cover_i, 'M')}
        />
      )}
    </div>
    <Typography className="mb-[4px] truncate font-medium" variant="subtitle">
      {book.title}
    </Typography>
    {book.author_name && (
      <Typography className="truncate text-caption! text-gray" variant="subtitle">
        {book.author_name[0]}
      </Typography>
    )}
  </li>
);

export const BookCard = memo(Component);

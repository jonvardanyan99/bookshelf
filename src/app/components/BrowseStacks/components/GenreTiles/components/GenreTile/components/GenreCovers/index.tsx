import { clsx } from 'clsx';
import { memo } from 'react';

import { BookCover } from '@/components/BookCover';
import { ServerToast } from '@/components/ServerToast';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { getSubject } from '@/services/openLibrary/subjects';
import type { Genre } from '@/types/models';

const FAN_CLASS_NAMES = [
  'left-0 translate-y-[2px] rotate-[-7deg] group-hover:translate-x-[-4px] group-hover:translate-y-[1px] group-hover:rotate-[-11deg] group-aria-[current=true]:translate-x-[-4px] group-aria-[current=true]:translate-y-[1px] group-aria-[current=true]:rotate-[-11deg]',
  'left-[22px] z-1 translate-y-[-4px] group-hover:translate-y-[-8px] group-aria-[current=true]:translate-y-[-8px]',
  'left-[44px] translate-y-[2px] rotate-[7deg] group-hover:translate-x-[4px] group-hover:translate-y-[1px] group-hover:rotate-[11deg] group-aria-[current=true]:translate-x-[4px] group-aria-[current=true]:translate-y-[1px] group-aria-[current=true]:rotate-[11deg]',
];

interface Props {
  coversSubject: Genre['coversSubject'];
}

const Component: React.FC<Props> = async ({ coversSubject }) => {
  const coversResult = await getSubject({ subject: coversSubject });

  if (!coversResult.data) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.openLibraryUnavailable} type="error" />;
  }

  const books = coversResult.data.works;

  return (
    <div aria-hidden="true" className="relative h-[72px] w-[88px]">
      {books.map((book, index) => (
        <BookCover
          className={clsx(
            FAN_CLASS_NAMES[index],
            'absolute! bottom-0 transition-transform motion-reduce:transition-none',
          )}
          coverId={book.cover_id}
          key={book.key}
          size="small"
          title={book.title}
        />
      ))}
    </div>
  );
};

export const GenreCovers = memo(Component);

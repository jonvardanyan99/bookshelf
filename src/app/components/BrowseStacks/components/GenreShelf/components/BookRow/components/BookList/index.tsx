import { memo } from 'react';

import { BookCard } from '@/app/components/BrowseStacks/components/GenreShelf/components/BookRow/components/BookList/components/BookCard';
import { EmptyData } from '@/components/EmptyData';
import { ServerToast } from '@/components/ServerToast';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { searchWorks } from '@/services/openLibrary/search';
import type { Subgenre } from '@/types/models';

interface Props {
  query: Subgenre['query'];
  sort?: Subgenre['sort'];
}

const Component: React.FC<Props> = async ({ query, sort }) => {
  const searchResponse = await searchWorks({ query, sort });

  if (!searchResponse) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.openLibraryUnavailable} type="error" />;
  }

  if (searchResponse.docs.length === 0) {
    return <EmptyData />;
  }

  return (
    <ul className="flex scrollbar-thin gap-[16px] overflow-x-auto p-[4px_4px_12px_4px]">
      {searchResponse.docs.map((doc) => (
        <BookCard book={doc} key={doc.key} />
      ))}
    </ul>
  );
};

export const BookList = memo(Component);

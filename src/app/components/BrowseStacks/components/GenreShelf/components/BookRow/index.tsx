import { memo, Suspense } from 'react';

import { BookList } from '@/app/components/BrowseStacks/components/GenreShelf/components/BookRow/components/BookList';
import { Loader } from '@/components/Loader';
import { Typography } from '@/components/Typography';
import type { Subgenre } from '@/types/models';

interface Props {
  id: string;
  subgenre: Subgenre;
}

const Component: React.FC<Props> = ({ id, subgenre }) => {
  const titleId = `${id}-title`;

  return (
    <section aria-labelledby={titleId} className="scroll-mt-header-offset" id={id}>
      <Typography className="mb-[12px] text-body! font-semibold!" id={titleId} variant="h4">
        {subgenre.name}
      </Typography>
      <Suspense fallback={<Loader className="py-[106px]" size="large" />}>
        <BookList query={subgenre.query} sort={subgenre.sort} />
      </Suspense>
    </section>
  );
};

export const BookRow = memo(Component);

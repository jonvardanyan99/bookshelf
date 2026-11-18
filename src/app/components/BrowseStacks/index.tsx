import { memo, Suspense } from 'react';

import { GenreBrowser } from '@/app/components/BrowseStacks/components/GenreBrowser';
import { GenreTiles } from '@/app/components/BrowseStacks/components/GenreTiles';
import { Typography } from '@/components/Typography';
import { GENRES } from '@/constants/genres';

const TITLE_ID = 'browse-stacks-title';

interface Props {
  searchParams: PageProps<'/'>['searchParams'];
}

const Component: React.FC<Props> = ({ searchParams }) => (
  <section aria-labelledby={TITLE_ID} className="mb-[32px]">
    <Typography className="mb-[8px] text-h4!" id={TITLE_ID} variant="h2">
      Browse the stacks
    </Typography>
    <Suspense fallback={<GenreTiles genres={GENRES} />}>
      <GenreBrowser searchParams={searchParams} />
    </Suspense>
  </section>
);

export const BrowseStacks = memo(Component);

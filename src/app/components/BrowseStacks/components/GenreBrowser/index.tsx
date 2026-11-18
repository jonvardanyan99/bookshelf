import { memo, Suspense } from 'react';

import { GenreShelf } from '@/app/components/BrowseStacks/components/GenreShelf';
import { GenreTiles } from '@/app/components/BrowseStacks/components/GenreTiles';
import { Loader } from '@/components/Loader';
import { GENRES } from '@/constants/genres';

interface Props {
  searchParams: PageProps<'/'>['searchParams'];
}

const Component: React.FC<Props> = async ({ searchParams }) => {
  const { stack } = await searchParams;
  const activeGenre = GENRES.find((genre) => genre.slug === stack) ?? GENRES[0];

  return (
    <>
      <GenreTiles activeSlug={activeGenre.slug} genres={GENRES} />
      <Suspense fallback={<Loader className="py-[144px]" size="large" />}>
        <GenreShelf genre={activeGenre} />
      </Suspense>
    </>
  );
};

export const GenreBrowser = memo(Component);

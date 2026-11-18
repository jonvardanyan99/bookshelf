import { memo } from 'react';

import { GenreTile } from '@/app/components/BrowseStacks/components/GenreTiles/components/GenreTile';
import type { Genre } from '@/types/models';

interface Props {
  activeSlug?: Genre['slug'];
  genres: Genre[];
}

const Component: React.FC<Props> = ({ activeSlug, genres }) => (
  <ul className="mb-[12px] flex scrollbar-thin gap-[16px] overflow-x-auto p-[4px_4px_12px_4px]">
    {genres.map((genre) => (
      <GenreTile genre={genre} isActive={genre.slug === activeSlug} key={genre.slug} />
    ))}
  </ul>
);

export const GenreTiles = memo(Component);

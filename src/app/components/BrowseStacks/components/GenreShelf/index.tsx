import { memo } from 'react';

import { BookRow } from '@/app/components/BrowseStacks/components/GenreShelf/components/BookRow';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import type { Genre, Subgenre } from '@/types/models';

const TITLE_ID = 'genre-shelf-title';

interface Props {
  genre: Genre;
}

const Component: React.FC<Props> = ({ genre }) => {
  const getRowId = (rowSlug: string) => `genre-${genre.slug}-${rowSlug}`;
  const shelfSubgenres: Subgenre[] = [
    { name: genre.title, query: genre.query, slug: 'trending' },
    ...genre.subgenres,
  ];

  return (
    <section
      aria-labelledby={TITLE_ID}
      className="rounded-[8px] border border-gray-light bg-beige p-[16px]"
    >
      <Typography className="mb-[4px] text-h4!" id={TITLE_ID} variant="h3">
        {genre.name}
      </Typography>
      <nav
        aria-label={`${genre.name} subgenres`}
        className="mb-[24px] flex flex-wrap items-center gap-[12px]"
      >
        <Typography className="text-gray" variant="subtitle">
          Jump to
        </Typography>
        <ul className="flex flex-wrap gap-[12px]">
          {genre.subgenres.map((subgenre) => (
            <li key={subgenre.slug}>
              <Link href={`#${getRowId(subgenre.slug)}`} variant="inline">
                <Typography className="text-subtitle! font-medium" variant="caption">
                  {subgenre.name}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col gap-[24px]">
        {shelfSubgenres.map((shelfSubgenre) => (
          <BookRow
            id={getRowId(shelfSubgenre.slug)}
            key={shelfSubgenre.slug}
            subgenre={shelfSubgenre}
          />
        ))}
      </div>
    </section>
  );
};

export const GenreShelf = memo(Component);

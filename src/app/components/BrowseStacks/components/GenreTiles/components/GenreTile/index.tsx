import { memo } from 'react';

import { GenreCovers } from '@/app/components/BrowseStacks/components/GenreTiles/components/GenreTile/components/GenreCovers';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import type { Genre } from '@/types/models';

interface Props {
  genre: Genre;
  isActive: boolean;
}

const Component: React.FC<Props> = ({ genre, isActive }) => {
  const genreSearchParams = new URLSearchParams({ stack: genre.slug });
  const genreHref = `${ROUTES.home}?${genreSearchParams.toString()}`;

  return (
    <li className="w-[120px] shrink-0">
      <Link
        aria-current={isActive}
        className="group h-auto! w-full flex-col gap-[12px] p-[16px]! shadow-raised"
        href={genreHref}
        variant="outlined"
      >
        <GenreCovers subject={genre.subject} />
        <Typography className="text-subtitle! font-semibold" variant="caption">
          {genre.name}
        </Typography>
      </Link>
    </li>
  );
};

export const GenreTile = memo(Component);

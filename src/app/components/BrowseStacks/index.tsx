import { memo } from 'react';

import { GenreTile } from '@/app/components/BrowseStacks/components/GenreTile';
import { Typography } from '@/components/Typography';

const GENRES = [
  { name: 'Featured', subject: 'classics' },
  { name: 'Crime', subject: 'crime' },
  { name: 'Drama', subject: 'drama' },
  { name: 'Fantasy', subject: 'fantasy' },
  { name: 'Horror', subject: 'horror' },
  { name: 'Mystery', subject: 'mystery' },
  { name: 'Romance', subject: 'romance' },
  { name: 'Sci-Fi', subject: 'science_fiction' },
  { name: 'Thriller', subject: 'thriller' },
  { name: 'Kids', subject: 'juvenile_literature' },
  { name: 'History', subject: 'history' },
  { name: 'Biography', subject: 'biography' },
];

const TITLE_ID = 'browse-stacks-title';

const Component: React.FC = () => (
  <section aria-labelledby={TITLE_ID} className="mb-[32px]">
    <Typography className="mb-[8px] text-h4!" id={TITLE_ID} variant="h2">
      Browse the stacks
    </Typography>
    <ul className="flex gap-[16px] overflow-x-auto p-[4px]">
      {GENRES.map((genre) => (
        <li className="w-[120px] shrink-0" key={genre.subject}>
          <GenreTile name={genre.name} subject={genre.subject} />
        </li>
      ))}
    </ul>
  </section>
);

export const BrowseStacks = memo(Component);

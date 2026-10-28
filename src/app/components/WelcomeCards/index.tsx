import { memo } from 'react';

import { Typography } from '@/components/Typography';

const CARDS = [
  {
    description: 'Millions of books available through Controlled Digital Lending',
    title: 'Read Free Library Books Online',
  },
  {
    description: 'Learn how to set a yearly reading goal and track what you read',
    title: 'Set a Yearly Reading Goal',
  },
  {
    description: 'Organize your Books using Lists & the Reading Log',
    title: 'Keep Track of your Favorite Books',
  },
  {
    description: 'Digital shelves organized like a physical library',
    title: 'Try the virtual Library Explorer',
  },
  {
    description: 'Find matching results within the text of millions of books',
    title: 'Try Fulltext Search',
  },
  {
    description: 'Discover opportunities to improve the library',
    title: 'Volunteer at Bookshelf',
  },
  {
    description: 'Your feedback will help us improve these cards',
    title: 'Send us feedback',
  },
];

const TITLE_ID = 'welcome-title';

const Component: React.FC = () => (
  <section aria-labelledby={TITLE_ID} className="mb-[32px]">
    <Typography className="mb-[8px] text-h4!" id={TITLE_ID} variant="h1">
      Welcome to Bookshelf
    </Typography>
    <ul className="flex gap-[16px] overflow-x-auto p-[4px]">
      {CARDS.map((card) => (
        <li
          className="flex w-[310px] shrink-0 flex-col justify-center gap-[4px] rounded-[8px] border border-gray-light bg-white p-[24px_8px] shadow-raised"
          key={card.title}
        >
          <Typography className="font-medium" variant="body">
            {card.title}
          </Typography>
          <Typography className="text-caption!" variant="body">
            {card.description}
          </Typography>
        </li>
      ))}
    </ul>
  </section>
);

export const WelcomeCards = memo(Component);

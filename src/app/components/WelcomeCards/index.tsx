import Image, { type StaticImageData } from 'next/image';
import { memo } from 'react';

import bookOpenIcon from '@/assets/icons/book-open.svg';
import bookmarkIcon from '@/assets/icons/bookmark.svg';
import handHeartIcon from '@/assets/icons/hand-heart.svg';
import libraryIcon from '@/assets/icons/library.svg';
import messageSquareIcon from '@/assets/icons/message-square.svg';
import targetIcon from '@/assets/icons/target.svg';
import textSearchIcon from '@/assets/icons/text-search.svg';
import { Typography } from '@/components/Typography';

const CARDS = [
  {
    description: 'Millions of books available through Controlled Digital Lending',
    icon: bookOpenIcon as StaticImageData,
    iconAlt: 'Open book',
    title: 'Read Free Library Books Online',
  },
  {
    description: 'Learn how to set a yearly reading goal and track what you read',
    icon: targetIcon as StaticImageData,
    iconAlt: 'Target',
    title: 'Set a Yearly Reading Goal',
  },
  {
    description: 'Organize your Books using Lists & the Reading Log',
    icon: bookmarkIcon as StaticImageData,
    iconAlt: 'Bookmark',
    title: 'Keep Track of your Favorite Books',
  },
  {
    description: 'Digital shelves organized like a physical library',
    icon: libraryIcon as StaticImageData,
    iconAlt: 'Library shelf',
    title: 'Try the virtual Library Explorer',
  },
  {
    description: 'Find matching results within the text of millions of books',
    icon: textSearchIcon as StaticImageData,
    iconAlt: 'Text search',
    title: 'Try Fulltext Search',
  },
  {
    description: 'Discover opportunities to improve the library',
    icon: handHeartIcon as StaticImageData,
    iconAlt: 'Hand holding a heart',
    title: 'Volunteer at Bookshelf',
  },
  {
    description: 'Your feedback will help us improve these cards',
    icon: messageSquareIcon as StaticImageData,
    iconAlt: 'Message',
    title: 'Send us feedback',
  },
];

const TITLE_ID = 'welcome-title';

const Component: React.FC = () => (
  <section aria-labelledby={TITLE_ID} className="mb-[32px]">
    <Typography className="mb-[8px] text-h4!" id={TITLE_ID} variant="h1">
      Welcome to Bookshelf
    </Typography>
    <ul className="flex scrollbar-thin gap-[16px] overflow-x-auto p-[4px_4px_12px_4px]">
      {CARDS.map((card) => (
        <li
          className="flex w-[310px] shrink-0 items-center gap-[8px] rounded-[8px] border border-gray-light bg-beige p-[8px]"
          key={card.title}
        >
          <Image alt={card.iconAlt} className="size-[80px]" src={card.icon} />
          <div>
            <Typography className="mb-[4px] font-medium" variant="body">
              {card.title}
            </Typography>
            <Typography className="text-caption!" variant="body">
              {card.description}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export const WelcomeCards = memo(Component);

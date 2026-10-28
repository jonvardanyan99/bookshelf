import { memo } from 'react';

import { Typography } from '@/components/Typography';

const LINK_GROUPS = [
  {
    links: ['Vision', 'Volunteer', 'Partner With Us', 'Careers', 'Blog', 'Terms of Service'],
    title: 'Bookshelf',
  },
  {
    links: [
      'Home',
      'Books',
      'Authors',
      'Subjects',
      'Collections',
      'Advanced Search',
      'Return to Top',
    ],
    title: 'Discover',
  },
  {
    links: ['Developer Center', 'API Documentation', 'Bulk Data Dumps', 'Writing Bots'],
    title: 'Develop',
  },
  {
    links: ['Help Center', 'Contact Us', 'Suggesting Edits', 'Add a Book', 'Release Notes'],
    title: 'Help',
  },
];

const Component: React.FC = () => (
  <footer className="flex flex-wrap gap-[24px] p-[40px_20px]">
    {LINK_GROUPS.map((linkGroup) => (
      <div className="min-w-[150px] flex-1" key={linkGroup.title}>
        <Typography className="mb-[12px] text-caption!" variant="h2">
          {linkGroup.title}
        </Typography>
        <ul className="flex flex-col gap-[4px]">
          {linkGroup.links.map((link) => (
            <li key={link}>
              <Typography className="text-primary" variant="caption">
                {link}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </footer>
);

export const Footer = memo(Component);

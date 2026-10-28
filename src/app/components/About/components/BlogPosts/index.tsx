import { memo } from 'react';

import { Typography } from '@/components/Typography';

const POSTS = [
  { date: '2026-08-23', title: 'Building a Library Patrons Choose to Revisit' },
  { date: '2026-08-23', title: 'Helping Patrons Discover Books' },
  {
    date: '2026-07-15',
    title: 'Google Summer of Code Contributors Improve the Patron Experience',
  },
];

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

const TITLE_ID = 'blog-posts-title';

const Component: React.FC = () => (
  <section aria-labelledby={TITLE_ID}>
    <Typography className="mb-[12px] text-subtitle! text-primary" id={TITLE_ID} variant="h3">
      Latest Blog Posts
    </Typography>
    <ul className="flex flex-col gap-[12px]">
      {POSTS.map((post) => (
        <li key={post.title}>
          <Typography variant="subtitle">
            <Typography className="text-subtitle! text-primary" variant="caption">
              {post.title}
            </Typography>{' '}
            -{' '}
            <time dateTime={post.date}>
              <Typography className="text-subtitle! italic" variant="caption">
                {DATE_FORMAT.format(new Date(post.date))}
              </Typography>
            </time>
          </Typography>
        </li>
      ))}
    </ul>
  </section>
);

export const BlogPosts = memo(Component);

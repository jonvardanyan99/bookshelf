import { memo } from 'react';

import { BlogPosts } from '@/app/components/About/components/BlogPosts';
import { Typography } from '@/components/Typography';

const TITLE_ID = 'about-title';

const Component: React.FC = () => (
  <section aria-labelledby={TITLE_ID}>
    <Typography className="mb-[12px] text-h4!" id={TITLE_ID} variant="h2">
      About the Project
    </Typography>
    <div className="flex flex-col gap-[24px] md:flex-row">
      <div className="md:w-[439px]">
        <Typography className="mb-[12px]" variant="body">
          Bookshelf is an open, editable library catalog, building towards a web page for every book
          ever published.{' '}
          <Typography className="text-body! text-primary" variant="caption">
            More
          </Typography>
        </Typography>
        <Typography variant="subtitle">
          Just like Wikipedia, you can contribute new information or corrections to the catalog. You
          can browse by{' '}
          <Typography className="text-subtitle! text-primary" variant="caption">
            subjects
          </Typography>
          ,{' '}
          <Typography className="text-subtitle! text-primary" variant="caption">
            authors
          </Typography>{' '}
          or{' '}
          <Typography className="text-subtitle! text-primary" variant="caption">
            lists
          </Typography>{' '}
          members have created. If you love books, why not help build a library?
        </Typography>
      </div>
      <BlogPosts />
    </div>
  </section>
);

export const About = memo(Component);

import type { Metadata } from 'next';

import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

const TITLE_ID = 'not-found-title';

export default function NotFoundPage() {
  return (
    <section aria-labelledby={TITLE_ID} className="max-w-standalone-page">
      <Typography className="mb-[12px]" id={TITLE_ID} variant="h1">
        Page not found
      </Typography>
      <Typography className="mb-[24px]" variant="body">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </Typography>
      <Link href={ROUTES.home} variant="primary">
        Go to home page
      </Link>
    </section>
  );
}

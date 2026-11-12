'use client';

import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';

interface Props {
  retry: () => void;
}

const TITLE_ID = 'error-title';

export default function ErrorPage({ retry }: Props) {
  return (
    <section aria-labelledby={TITLE_ID} className="max-w-standalone-page">
      <Typography className="mb-[12px]" id={TITLE_ID} variant="h1">
        Something went wrong
      </Typography>
      <Typography className="mb-[24px]" variant="body">
        We couldn&apos;t finish that. Please try again.
      </Typography>
      <Button onClick={retry} type="button" variant="primary">
        Try again
      </Button>
    </section>
  );
}

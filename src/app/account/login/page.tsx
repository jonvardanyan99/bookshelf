import type { Metadata } from 'next';

import { LogInForm } from '@/app/account/login/components/LogInForm';
import { FormActionBoundary } from '@/components/FormActionBoundary';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';

const TITLE_ID = 'log-in-title';

export const metadata: Metadata = {
  title: 'Log In',
};

export default function LogInPage() {
  return (
    <section aria-labelledby={TITLE_ID} className="max-w-standalone-page">
      <Typography className="mb-[12px]" id={TITLE_ID} variant="h1">
        Log In
      </Typography>
      <FormActionBoundary>
        <LogInForm />
      </FormActionBoundary>
      <Typography variant="body">
        Not a member of Bookshelf?{' '}
        <Link href={ROUTES.signUp} variant="inline">
          Sign up now
        </Link>
      </Typography>
    </section>
  );
}

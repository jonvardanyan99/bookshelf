import type { Metadata } from 'next';

import { SignUpForm } from '@/app/account/create/components/SignUpForm';
import { FormActionBoundary } from '@/components/FormActionBoundary';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';

const TITLE_ID = 'sign-up-title';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <section aria-labelledby={TITLE_ID} className="max-w-[400px]">
      <Typography className="mb-[12px]" id={TITLE_ID} variant="h1">
        Sign Up
      </Typography>
      <FormActionBoundary>
        <SignUpForm />
      </FormActionBoundary>
      <Typography variant="body">
        Already have an account?{' '}
        <Link href={ROUTES.logIn} variant="inline">
          Log in
        </Link>
      </Typography>
    </section>
  );
}

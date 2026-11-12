import 'server-only';

import { cookies } from 'next/headers';

import { TOAST_COOKIE } from '@/constants/cookies';
import type { ToastName } from '@/constants/toasts';

const TOAST_COOKIE_MAX_AGE = 60;

// Only call this right before a redirect: setting a cookie otherwise refreshes the page, which
// remounts its forms and loses their useActionState values.
export const setRedirectToast = async (toastName: ToastName) => {
  const cookieStore = await cookies();

  cookieStore.set(TOAST_COOKIE, toastName, {
    maxAge: TOAST_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

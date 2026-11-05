import { type NextRequest, NextResponse } from 'next/server';

import { SESSION_COOKIE } from '@/constants/cookies';
import { ROUTES } from '@/constants/routes';
import { getUser } from '@/lib/dal';
import { verifySession } from '@/lib/session';

const GUEST_ONLY_ROUTES = [ROUTES.logIn, ROUTES.signUp];

export const proxy = async (request: NextRequest) => {
  const isGuestOnlyPageRequest =
    request.method === 'GET' &&
    GUEST_ONLY_ROUTES.some((route) => route === request.nextUrl.pathname);

  if (!isGuestOnlyPageRequest) {
    return NextResponse.next();
  }

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    return NextResponse.next();
  }

  const user = await getUser(session.userId).catch(() => undefined);

  if (user === undefined) {
    return NextResponse.next();
  }

  if (user) {
    return NextResponse.redirect(new URL(ROUTES.home, request.nextUrl));
  }

  const response = NextResponse.next();

  response.cookies.delete(SESSION_COOKIE);

  return response;
};

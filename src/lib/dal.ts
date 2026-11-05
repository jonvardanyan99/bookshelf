import 'server-only';

import { eq } from 'drizzle-orm';
import { io } from 'next/cache';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { SESSION_COOKIE } from '@/constants/cookies';
import { db } from '@/db';
import { users } from '@/db/schema';
import { verifySession } from '@/lib/session';

export const getUser = async (userId: number) => {
  const user = await db
    .select({ id: users.id, screenName: users.screenName })
    .from(users)
    .where(eq(users.id, userId))
    .get();

  return user ?? null;
};

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();

  // jose reads the clock to check the token's expiry
  await io();

  const session = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    return null;
  }

  return getUser(session.userId).catch(() => null);
});

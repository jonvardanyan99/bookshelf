import 'server-only';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SESSION_COOKIE } from '@/constants/cookies';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);

interface SessionPayload {
  userId: number;
}

const signSession = (payload: SessionPayload, expiresAt: Date) =>
  new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);

export const verifySession = async (session = '') => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    const { userId } = payload;

    return typeof userId === 'number' ? { userId } : null;
  } catch {
    return null;
  }
};

export const createSession = async (userId: number) => {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await signSession({ userId }, expiresAt);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
};

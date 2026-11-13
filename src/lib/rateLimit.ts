import 'server-only';

import { headers } from 'next/headers';

const MINUTE = 60 * 1000;

interface Attempts {
  count: number;
  resetsAt: number;
}

interface RateLimitOptions {
  maxAttempts: number;
  windowDuration: number;
}

interface RateLimit extends RateLimitOptions {
  attemptsByKey: Map<string, Attempts>;
  purgesAt: number;
}

const createRateLimit = (options: RateLimitOptions): RateLimit => ({
  ...options,
  attemptsByKey: new Map(),
  purgesAt: 0,
});

const LOG_IN_BY_EMAIL = createRateLimit({ maxAttempts: 10, windowDuration: 15 * MINUTE });
const LOG_IN_BY_IP = createRateLimit({ maxAttempts: 30, windowDuration: 15 * MINUTE });
const SIGN_UP_BY_IP = createRateLimit({ maxAttempts: 10, windowDuration: 60 * MINUTE });

const consumeAttempt = (rateLimit: RateLimit, key: string) => {
  const now = Date.now();

  if (rateLimit.purgesAt <= now) {
    for (const [attemptedKey, attempts] of rateLimit.attemptsByKey) {
      if (attempts.resetsAt <= now) {
        rateLimit.attemptsByKey.delete(attemptedKey);
      }
    }

    rateLimit.purgesAt = now + MINUTE;
  }

  const storedAttempts = rateLimit.attemptsByKey.get(key);
  const attempts =
    storedAttempts && storedAttempts.resetsAt > now
      ? storedAttempts
      : { count: 0, resetsAt: now + rateLimit.windowDuration };

  attempts.count += 1;
  rateLimit.attemptsByKey.set(key, attempts);

  return attempts.count <= rateLimit.maxAttempts;
};

// Next.js only sets x-forwarded-for when it's missing, and a proxy appends the address it received
// the request from, so the last entry is the only one a client can't choose.
const getClientIp = async () => {
  const requestHeaders = await headers();

  return requestHeaders.get('x-forwarded-for')?.split(',').at(-1)?.trim() ?? 'unknown';
};

export const consumeLogInAttempt = async (email: string) => {
  const isIpAllowed = consumeAttempt(LOG_IN_BY_IP, await getClientIp());
  const isEmailAllowed = consumeAttempt(LOG_IN_BY_EMAIL, email);

  return isIpAllowed && isEmailAllowed;
};

export const clearLogInAttempts = (email: string) => {
  LOG_IN_BY_EMAIL.attemptsByKey.delete(email);
};

export const consumeSignUpAttempt = async () => consumeAttempt(SIGN_UP_BY_IP, await getClientIp());

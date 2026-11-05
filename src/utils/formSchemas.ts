import * as zod from 'zod';

import { PASSWORD_FIELD } from '@/constants/formFields';

export const ERROR_MESSAGES = {
  emailTaken: 'This email is already registered.',
  invalidCredentials: 'Invalid email or password.',
  invalidEmail: 'Enter a valid email.',
  max: (count: number) => `Use at most ${count} characters.`,
  min: (count: number) => `Use at least ${count} characters.`,
  passwordRequired: 'Enter your password.',
  regex: 'Use letters, numbers, symbols and spaces, with at least one letter or number.',
  screenNameTaken: 'This screen name is taken.',
  tooManyAttempts: 'Too many log in attempts. Try again in 15 minutes.',
} as const;

const EMAIL_SCHEMA = zod
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    zod.email({ error: ERROR_MESSAGES.invalidEmail }).max(254, { error: ERROR_MESSAGES.max(254) }),
  );

export const LOG_IN_SCHEMA = zod.object({
  email: EMAIL_SCHEMA,
  [PASSWORD_FIELD]: zod.string().min(1, { error: ERROR_MESSAGES.passwordRequired }),
});

export const SIGN_UP_SCHEMA = zod.object({
  email: EMAIL_SCHEMA,
  [PASSWORD_FIELD]: zod
    .string()
    .min(8, { error: ERROR_MESSAGES.min(8) })
    .max(128, { error: ERROR_MESSAGES.max(128) }),
  screenName: zod
    .string()
    .trim()
    .normalize('NFKC')
    .min(3, { abort: true, error: ERROR_MESSAGES.min(3) })
    .max(20, { abort: true, error: ERROR_MESSAGES.max(20) })
    .regex(/^(?=.*[\p{L}\p{N}])[\p{L}\p{M}\p{N}\p{P}\p{S} ]+$/u, { error: ERROR_MESSAGES.regex }),
});

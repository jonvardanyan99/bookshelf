'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { UNEXPECTED_ERROR_MESSAGE } from '@/constants/toasts';
import { db } from '@/db';
import { users } from '@/db/schema';
import { hashPassword, UNKNOWN_USER_PASSWORD_HASH, verifyPassword } from '@/lib/password';
import { clearLogInAttempts, consumeLogInAttempt, consumeSignUpAttempt } from '@/lib/rateLimit';
import { createSession, deleteSession } from '@/lib/session';
import { setRedirectToast } from '@/lib/toast';
import type { LogInFormState, SignUpFormState } from '@/types/formValues';
import { parseForm } from '@/utils/forms';
import { ERROR_MESSAGES, LOG_IN_SCHEMA, SIGN_UP_SCHEMA } from '@/utils/formSchemas';

export const signUp = async (
  _state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const form = parseForm(SIGN_UP_SCHEMA, formData);

  if (!form.data) {
    return { errors: form.errors, values: form.values };
  }

  const { email, password, screenName } = form.data;
  const isSignUpAllowed = await consumeSignUpAttempt();

  if (!isSignUpAllowed) {
    return { message: ERROR_MESSAGES.tooManySignUpAttempts, values: form.values };
  }

  try {
    const insertedUsers = await db
      .insert(users)
      .values({
        email,
        passwordHash: await hashPassword(password),
        screenName,
        screenNameKey: screenName.toLowerCase(),
      })
      .onConflictDoNothing()
      .returning({ id: users.id })
      .all();

    if (insertedUsers.length === 0) {
      const userWithEmail = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .get();

      return userWithEmail
        ? { errors: { email: [ERROR_MESSAGES.emailTaken] }, values: form.values }
        : { errors: { screenName: [ERROR_MESSAGES.screenNameTaken] }, values: form.values };
    }

    await createSession(insertedUsers[0].id);
  } catch {
    return { toastError: UNEXPECTED_ERROR_MESSAGE, values: form.values };
  }

  await setRedirectToast('signedUp');

  return redirect(ROUTES.home);
};

export const logIn = async (
  _state: LogInFormState,
  formData: FormData,
): Promise<LogInFormState> => {
  const form = parseForm(LOG_IN_SCHEMA, formData);

  if (!form.data) {
    return { errors: form.errors, values: form.values };
  }

  const { email, password } = form.data;
  const isLogInAllowed = await consumeLogInAttempt(email);

  if (!isLogInAllowed) {
    return { message: ERROR_MESSAGES.tooManyLogInAttempts, values: form.values };
  }

  try {
    const user = await db
      .select({ id: users.id, passwordHash: users.passwordHash })
      .from(users)
      .where(eq(users.email, email))
      .get();

    const isPasswordCorrect = await verifyPassword(
      password,
      user?.passwordHash ?? UNKNOWN_USER_PASSWORD_HASH,
    );

    if (!user || !isPasswordCorrect) {
      return { message: ERROR_MESSAGES.invalidCredentials, values: form.values };
    }

    clearLogInAttempts(email);
    await createSession(user.id);
  } catch {
    return { toastError: UNEXPECTED_ERROR_MESSAGE, values: form.values };
  }

  await setRedirectToast('loggedIn');

  return redirect(ROUTES.home);
};

export const logOut = async () => {
  await deleteSession();
  await setRedirectToast('loggedOut');

  return redirect(ROUTES.home);
};

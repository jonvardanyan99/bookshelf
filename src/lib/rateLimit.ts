import 'server-only';

const MAX_LOG_IN_ATTEMPTS = 10;
const LOG_IN_WINDOW = 15 * 60 * 1000;

interface LogInAttempts {
  count: number;
  resetsAt: number;
}

const logInAttemptsByEmail = new Map<string, LogInAttempts>();

export const consumeLogInAttempt = (email: string) => {
  const now = Date.now();

  for (const [attemptedEmail, logInAttempts] of logInAttemptsByEmail) {
    if (logInAttempts.resetsAt <= now) {
      logInAttemptsByEmail.delete(attemptedEmail);
    }
  }

  const logInAttempts = logInAttemptsByEmail.get(email) ?? {
    count: 0,
    resetsAt: now + LOG_IN_WINDOW,
  };

  logInAttempts.count += 1;
  logInAttemptsByEmail.set(email, logInAttempts);

  return logInAttempts.count <= MAX_LOG_IN_ATTEMPTS;
};

export const clearLogInAttempts = (email: string) => {
  logInAttemptsByEmail.delete(email);
};

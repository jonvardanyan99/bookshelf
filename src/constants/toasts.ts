export const TOASTS = [
  { message: 'You are logged in.', name: 'loggedIn' },
  { message: 'You are logged out.', name: 'loggedOut' },
  { message: 'Your account was created.', name: 'signedUp' },
] as const;

export type ToastName = (typeof TOASTS)[number]['name'];

export const UNEXPECTED_ERROR_MESSAGE = 'Something went wrong. Please try again.';

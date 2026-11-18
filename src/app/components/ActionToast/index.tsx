import { cookies } from 'next/headers';
import { memo } from 'react';

import { ServerToast } from '@/components/ServerToast';
import { TOAST_COOKIE } from '@/constants/cookies';
import { TOAST_SUCCESS_MESSAGES } from '@/constants/toasts';

const Component: React.FC = async () => {
  const cookieStore = await cookies();
  const toastName = cookieStore.get(TOAST_COOKIE)?.value;
  const actionToast = TOAST_SUCCESS_MESSAGES.find(
    (successMessage) => successMessage.name === toastName,
  );

  return (
    actionToast && (
      <ServerToast
        cookieToDelete={TOAST_COOKIE}
        key={actionToast.name}
        message={actionToast.message}
        type="success"
      />
    )
  );
};

export const ActionToast = memo(Component);

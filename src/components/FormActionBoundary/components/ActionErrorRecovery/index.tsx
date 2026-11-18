'use client';

import { memo, useEffect } from 'react';
import { toast } from 'sonner';

import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';

interface Props {
  reset: () => void;
}

const Component: React.FC<Props> = ({ reset }) => {
  useEffect(() => {
    const errorMessage = navigator.onLine
      ? TOAST_ERROR_MESSAGES.unexpected
      : TOAST_ERROR_MESSAGES.connectionLost;

    toast.error(errorMessage, { id: errorMessage });
    reset();
  }, [reset]);

  return null;
};

export const ActionErrorRecovery = memo(Component);

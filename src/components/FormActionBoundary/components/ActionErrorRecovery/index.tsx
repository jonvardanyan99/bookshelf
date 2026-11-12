'use client';

import { memo, useEffect } from 'react';
import { toast } from 'sonner';

import { UNEXPECTED_ERROR_MESSAGE } from '@/constants/toasts';

const CONNECTION_ERROR_MESSAGE =
  "We couldn't reach the server. Check your connection and try again.";

interface Props {
  reset: () => void;
}

const Component: React.FC<Props> = ({ reset }) => {
  useEffect(() => {
    const errorMessage = navigator.onLine ? UNEXPECTED_ERROR_MESSAGE : CONNECTION_ERROR_MESSAGE;

    toast.error(errorMessage, { id: errorMessage });
    reset();
  }, [reset]);

  return null;
};

export const ActionErrorRecovery = memo(Component);

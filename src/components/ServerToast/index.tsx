'use client';

import { memo, useEffect } from 'react';
import { toast } from 'sonner';

import type { ToastType } from '@/types/models';
import { deleteCookie } from '@/utils/cookies';

interface Props {
  cookieToDelete?: string;
  message: string;
  type: ToastType;
}

const Component: React.FC<Props> = ({ cookieToDelete, message, type }) => {
  useEffect(() => {
    if (cookieToDelete) {
      deleteCookie(cookieToDelete);
    }

    toast[type](message, { id: message });
  }, [cookieToDelete, message, type]);

  return null;
};

export const ServerToast = memo(Component);

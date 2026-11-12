'use client';

import { memo, useEffect } from 'react';
import { toast } from 'sonner';

import type { ToastType } from '@/types/models';
import { deleteCookie } from '@/utils/cookies';

// A toast without a cookie reports a state (an outage), not an event, so revisiting a page that
// still reports it must not repeat it until the next full page load.
const shownStateMessages = new Set<string>();

interface Props {
  cookieToDelete?: string;
  message: string;
  type: ToastType;
}

const Component: React.FC<Props> = ({ cookieToDelete, message, type }) => {
  useEffect(() => {
    const isShownState = !cookieToDelete && shownStateMessages.has(message);

    if (isShownState) {
      return;
    }

    if (cookieToDelete) {
      deleteCookie(cookieToDelete);
    } else {
      shownStateMessages.add(message);
    }

    toast[type](message, { id: message });
  }, [cookieToDelete, message, type]);

  return null;
};

export const ServerToast = memo(Component);

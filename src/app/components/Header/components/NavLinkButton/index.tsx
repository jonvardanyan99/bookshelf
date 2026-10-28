'use client';

import { memo, useCallback } from 'react';

import { Button } from '@/components/Button';

interface Props {
  children: React.ReactNode;
}

const Component: React.FC<Props> = ({ children }) => {
  const handleClick = useCallback(() => {
    // Not implemented yet
  }, []);

  return (
    <Button onClick={handleClick} variant="text">
      {children}
    </Button>
  );
};

export const NavLinkButton = memo(Component);

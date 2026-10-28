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
    <Button
      className="group flex h-auto! w-full flex-col items-center gap-[12px] p-[16px]! shadow-raised"
      onClick={handleClick}
      variant="outlined"
    >
      {children}
    </Button>
  );
};

export const GenreTileButton = memo(Component);

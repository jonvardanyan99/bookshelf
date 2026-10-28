'use client';

import { memo, useCallback } from 'react';

import { Button } from '@/components/Button';

const Component: React.FC = () => {
  const handleClick = useCallback(() => {
    // Not implemented yet
  }, []);

  return (
    <Button className="h-[32px]! px-[12px]! text-subtitle!" onClick={handleClick} variant="primary">
      Become a Librarian
    </Button>
  );
};

export const BecomeLibrarianButton = memo(Component);

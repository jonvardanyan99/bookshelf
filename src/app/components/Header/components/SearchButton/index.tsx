'use client';

import { memo, useCallback } from 'react';

import { Button } from '@/components/Button';

const Component: React.FC = () => {
  const handleClick = useCallback(() => {
    // Not implemented yet
  }, []);

  return (
    <Button className="w-full text-left" onClick={handleClick} variant="outlined">
      Search
    </Button>
  );
};

export const SearchButton = memo(Component);

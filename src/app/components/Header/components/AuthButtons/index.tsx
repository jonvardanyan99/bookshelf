'use client';

import { memo, useCallback } from 'react';

import { Button } from '@/components/Button';

const Component: React.FC = () => {
  const handleLogInClick = useCallback(() => {
    // Not implemented yet
  }, []);

  const handleSignUpClick = useCallback(() => {
    // Not implemented yet
  }, []);

  return (
    <div className="flex gap-[4px]">
      <Button className="px-[12px]!" onClick={handleLogInClick} variant="text">
        Log In
      </Button>
      <Button className="px-[12px]!" onClick={handleSignUpClick} variant="primary">
        Sign Up
      </Button>
    </div>
  );
};

export const AuthButtons = memo(Component);

'use client';

import Image, { type StaticImageData } from 'next/image';
import { memo, useCallback } from 'react';

import arrowRightIcon from '@/assets/icons/arrow-right.svg';
import { Button } from '@/components/Button';

const Component: React.FC = () => {
  const handleClick = useCallback(() => {
    // Not implemented yet
  }, []);

  return (
    <Button
      className="flex h-[32px]! items-center gap-[8px] px-[12px]! text-subtitle!"
      onClick={handleClick}
      type="button"
      variant="primary"
    >
      Become a Librarian
      <Image alt="Arrow" className="size-[16px]" src={arrowRightIcon as StaticImageData} />
    </Button>
  );
};

export const BecomeLibrarianButton = memo(Component);

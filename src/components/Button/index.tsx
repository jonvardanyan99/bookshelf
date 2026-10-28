'use client';

import { clsx } from 'clsx';
import { memo } from 'react';

type Variant = 'outlined' | 'primary' | 'text';

const CLASS_NAMES: Record<Variant, string> = {
  outlined: 'border border-gray-light bg-white hover:bg-beige',
  primary: 'border border-primary bg-primary text-white shadow-raised hover:bg-secondary',
  text: 'hover:bg-gray-light',
};

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  variant: Variant;
}

const Component: React.FC<Props> = ({ children, className, onClick, variant }) => (
  <button
    className={clsx(
      CLASS_NAMES[variant],
      className,
      'h-[36px] cursor-pointer rounded-[8px] px-[16px] text-body whitespace-nowrap',
    )}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

export const Button = memo(Component);

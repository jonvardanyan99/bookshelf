'use client';

import { clsx } from 'clsx';
import { memo } from 'react';

type ButtonType = 'button' | 'submit';

type Variant = 'outlined' | 'primary' | 'text';

const CLASS_NAMES: Record<Variant, string> = {
  outlined: 'border border-gray-light bg-white hover:bg-beige',
  primary: 'border border-primary bg-primary text-white shadow-raised hover:bg-secondary',
  text: 'hover:bg-gray-light',
};

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: ButtonType;
  variant: Variant;
}

const Component: React.FC<Props> = ({ children, className, disabled, onClick, type, variant }) => (
  <button
    className={clsx(
      CLASS_NAMES[variant],
      className,
      'h-[36px] cursor-pointer rounded-[8px] px-[16px] text-body whitespace-nowrap disabled:cursor-default disabled:opacity-60',
    )}
    disabled={disabled}
    onClick={onClick}
    type={type === 'submit' ? 'submit' : 'button'}
  >
    {children}
  </button>
);

export const Button = memo(Component);

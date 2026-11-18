'use client';

import { clsx } from 'clsx';
import { memo } from 'react';
import { useFormStatus } from 'react-dom';

import { Loader } from '@/components/Loader';

type ButtonType = 'button' | 'submit';

type Variant = 'outlined' | 'primary' | 'text';

const CLASS_NAMES: Record<Variant, string> = {
  outlined: 'border border-gray-light bg-white hover:bg-beige',
  primary: 'border border-primary bg-primary text-white shadow-raised hover:bg-secondary',
  text: 'hover:bg-gray-light',
};

const LOADER_CLASS_NAMES: Record<Variant, string> = {
  outlined: 'text-black',
  primary: 'text-white',
  text: 'text-black',
};

interface Props extends React.ComponentProps<'button'> {
  type: ButtonType;
  variant: Variant;
}

const Component: React.FC<Props> = ({
  children,
  className,
  disabled,
  type,
  variant,
  ...buttonProps
}) => {
  const { pending } = useFormStatus();
  const isSubmitting = type === 'submit' && pending;

  return (
    <button
      {...buttonProps}
      aria-busy={isSubmitting}
      className={clsx(
        CLASS_NAMES[variant],
        className,
        'relative h-[36px] rounded-[8px] px-[16px] text-body whitespace-nowrap',
        { 'text-transparent!': isSubmitting },
      )}
      disabled={disabled === true || isSubmitting}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
      {isSubmitting && <Loader className={clsx(LOADER_CLASS_NAMES[variant], 'absolute inset-0')} />}
    </button>
  );
};

export const Button = memo(Component);

import { clsx } from 'clsx';
import NextLink from 'next/link';
import { memo } from 'react';

type LinkVariant = 'inline' | 'plain' | 'primary' | 'text';

const CLASS_NAMES: Record<LinkVariant, string> = {
  inline: 'text-primary underline hover:text-secondary',
  plain: '',
  primary: 'border border-primary bg-primary text-white shadow-raised hover:bg-secondary',
  text: 'hover:bg-gray-light',
};

interface Props {
  children: React.ReactNode;
  className?: string;
  href: string;
  variant: LinkVariant;
}

const Component: React.FC<Props> = ({ children, className, href, variant }) => {
  const isButtonLook = variant === 'primary' || variant === 'text';

  return (
    <NextLink
      className={clsx(CLASS_NAMES[variant], className, {
        'inline-flex h-[36px] items-center rounded-[8px] px-[16px] text-body whitespace-nowrap':
          isButtonLook,
      })}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export const Link = memo(Component);

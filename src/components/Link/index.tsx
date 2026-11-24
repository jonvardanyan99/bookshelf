import { clsx } from 'clsx';
import NextLink from 'next/link';
import { memo } from 'react';

type LinkVariant = 'inline' | 'outlined' | 'plain' | 'primary' | 'text';

const CLASS_NAMES: Record<LinkVariant, string> = {
  inline: 'text-primary underline transition-colors hover:text-secondary',
  outlined:
    'border border-gray-light bg-white hover:bg-beige aria-[current=true]:border-primary aria-[current=true]:bg-beige',
  plain: '',
  primary: 'border border-primary bg-primary text-white shadow-raised hover:bg-secondary',
  text: 'hover:bg-gray-light',
};

interface Props extends React.ComponentProps<typeof NextLink> {
  variant: LinkVariant;
}

const Component: React.FC<Props> = ({ className, variant, ...linkProps }) => {
  const isButtonLook = variant === 'outlined' || variant === 'primary' || variant === 'text';

  return (
    <NextLink
      className={clsx(CLASS_NAMES[variant], className, {
        'inline-flex h-[36px] items-center rounded-[8px] px-[16px] text-body whitespace-nowrap transition-colors':
          isButtonLook,
      })}
      {...linkProps}
    />
  );
};

export const Link = memo(Component);

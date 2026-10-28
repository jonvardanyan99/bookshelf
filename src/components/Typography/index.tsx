import { clsx } from 'clsx';
import { memo } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'subtitle' | 'caption';

const ELEMENTS = {
  body: 'p',
  caption: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle: 'p',
} as const satisfies Record<Variant, React.ElementType>;

const CLASS_NAMES: Record<Variant, string> = {
  body: 'text-body',
  caption: 'text-caption',
  h1: 'text-h1 font-bold',
  h2: 'text-h2 font-bold',
  h3: 'text-h3 font-bold',
  h4: 'text-h4 font-bold',
  subtitle: 'text-subtitle',
};

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant: Variant;
}

const Component: React.FC<Props> = ({ children, className, id, variant }) => {
  const Element = ELEMENTS[variant];

  return (
    <Element className={clsx(CLASS_NAMES[variant], className)} id={id}>
      {children}
    </Element>
  );
};

export const Typography = memo(Component);

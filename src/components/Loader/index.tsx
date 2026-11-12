import { clsx } from 'clsx';
import { memo } from 'react';

type LoaderSize = 'large' | 'medium' | 'small';

const SIZE_CLASS_NAMES: Record<LoaderSize, string> = {
  large: 'size-[32px]',
  medium: 'size-[24px]',
  small: 'size-[16px]',
};

interface Props {
  className?: string;
  size?: LoaderSize;
}

const Component: React.FC<Props> = ({ className, size = 'small' }) => (
  <div
    aria-label="Loading"
    className={clsx(className, 'flex items-center justify-center')}
    role="status"
  >
    <div
      className={clsx(
        SIZE_CLASS_NAMES[size],
        'animate-spin rounded-full border-2 border-current border-t-transparent',
      )}
    />
  </div>
);

export const Loader = memo(Component);

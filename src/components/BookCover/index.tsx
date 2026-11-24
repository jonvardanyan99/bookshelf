import { clsx } from 'clsx';
import Image, { type StaticImageData } from 'next/image';
import { memo } from 'react';

import imageOffIcon from '@/assets/icons/image-off.svg';
import { Typography } from '@/components/Typography';
import { getCoverUrl } from '@/services/openLibrary/covers';
import type { CoverSize } from '@/types/models';

type BookCoverSize = 'large' | 'medium' | 'small';

interface SizeStyle {
  className: string;
  coverSize: CoverSize;
  iconClassName: string;
  sizes: string;
}

const SIZE_STYLES: Record<BookCoverSize, SizeStyle> = {
  large: {
    className: 'h-[300px] w-[200px]',
    coverSize: 'L',
    iconClassName: 'size-[32px]',
    sizes: '200px',
  },
  medium: {
    className: 'h-[180px] w-[120px]',
    coverSize: 'M',
    iconClassName: 'size-[32px]',
    sizes: '120px',
  },
  small: {
    className: 'h-[66px] w-[44px]',
    coverSize: 'M',
    iconClassName: 'size-[20px]',
    sizes: '44px',
  },
};

interface Props {
  className?: string;
  coverId?: number | null;
  size: BookCoverSize;
  title: string;
}

const Component: React.FC<Props> = ({ className, coverId, size, title }) => {
  const sizeStyle = SIZE_STYLES[size];
  const hasCaption = size !== 'small';

  return (
    <div
      className={clsx(
        sizeStyle.className,
        className,
        'relative flex shrink-0 flex-col items-center justify-center gap-[8px] overflow-hidden rounded-[4px] border border-gray-light bg-beige shadow-cover',
      )}
    >
      {coverId ? (
        <Image
          alt={title}
          className="object-cover"
          fill
          sizes={sizeStyle.sizes}
          src={getCoverUrl(coverId, sizeStyle.coverSize)}
        />
      ) : (
        <>
          <Image
            alt="Crossed-out image"
            className={sizeStyle.iconClassName}
            src={imageOffIcon as StaticImageData}
          />
          {hasCaption && (
            <Typography className="text-gray" variant="caption">
              No cover
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export const BookCover = memo(Component);

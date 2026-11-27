import Image, { type StaticImageData } from 'next/image';
import { memo } from 'react';

import starEmptyIcon from '@/assets/icons/star-empty.svg';
import starFullIcon from '@/assets/icons/star-full.svg';
import starHalfIcon from '@/assets/icons/star-half.svg';
import type { GetWorkRatingsResponse } from '@/services/openLibrary/works/types';

const MAX_RATING = 5;

const STAR_ICONS = {
  empty: { alt: 'Empty star', src: starEmptyIcon as StaticImageData },
  full: { alt: 'Full star', src: starFullIcon as StaticImageData },
  half: { alt: 'Half star', src: starHalfIcon as StaticImageData },
};

interface Props {
  average: NonNullable<GetWorkRatingsResponse['summary']['average']>;
}

const Component: React.FC<Props> = ({ average }) => {
  const roundedAverage = Math.round(average * 2) / 2;

  const stars = Array.from({ length: MAX_RATING }, (_, index) => {
    const position = index + 1;

    if (position <= roundedAverage) {
      return { icon: STAR_ICONS.full, position };
    }

    if (position - 0.5 === roundedAverage) {
      return { icon: STAR_ICONS.half, position };
    }

    return { icon: STAR_ICONS.empty, position };
  });

  return (
    <div
      aria-label={`Rated ${average.toFixed(1)} out of ${MAX_RATING}`}
      className="flex gap-[2px]"
      role="img"
    >
      {stars.map((star) => (
        <Image
          alt={star.icon.alt}
          className="size-[18px]"
          key={star.position}
          src={star.icon.src}
        />
      ))}
    </div>
  );
};

export const RatingStars = memo(Component);

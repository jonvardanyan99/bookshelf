import { clsx } from 'clsx';
import Image from 'next/image';
import { memo } from 'react';

import { GenreTileButton } from '@/app/components/BrowseStacks/components/GenreTile/components/GenreTileButton';
import { ServerToast } from '@/components/ServerToast';
import { Typography } from '@/components/Typography';
import { getCoverUrl } from '@/services/openLibrary/covers';
import { getSubject } from '@/services/openLibrary/subjects';

const OPEN_LIBRARY_ERROR_MESSAGE = "Book covers couldn't load right now. Please try again later.";

const FAN_CLASS_NAMES = [
  'left-0 translate-y-[2px] rotate-[-7deg] group-hover:translate-x-[-4px] group-hover:translate-y-[1px] group-hover:rotate-[-11deg]',
  'left-[22px] z-1 translate-y-[-4px] group-hover:translate-y-[-8px]',
  'left-[44px] translate-y-[2px] rotate-[7deg] group-hover:translate-x-[4px] group-hover:translate-y-[1px] group-hover:rotate-[11deg]',
];

interface Props {
  name: string;
  subject: string;
}

const Component: React.FC<Props> = async ({ name, subject }) => {
  const { works } = await getSubject({ subject });

  return (
    <GenreTileButton>
      <div aria-hidden="true" className="relative h-[72px] w-[88px]">
        {works?.map((work, index) => {
          const coverClassName = clsx(
            FAN_CLASS_NAMES[index],
            'absolute bottom-0 h-[66px] w-[44px] overflow-hidden rounded-[4px] bg-beige shadow-cover transition-transform',
          );

          return work.cover_id ? (
            <div className={coverClassName} key={work.key}>
              <Image
                alt={work.title}
                className="object-cover"
                fill
                sizes="44px"
                src={getCoverUrl(work.cover_id, 'M')}
              />
            </div>
          ) : (
            <div className={clsx(coverClassName, 'border border-gray-light')} key={work.key} />
          );
        })}
      </div>
      <Typography className="text-subtitle! font-semibold" variant="caption">
        {name}
      </Typography>
      {!works && <ServerToast message={OPEN_LIBRARY_ERROR_MESSAGE} type="error" />}
    </GenreTileButton>
  );
};

export const GenreTile = memo(Component);

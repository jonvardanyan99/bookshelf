import { clsx } from 'clsx';
import Image from 'next/image';
import { memo } from 'react';

import { ServerToast } from '@/components/ServerToast';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { getCoverUrl } from '@/services/openLibrary/covers';
import { getSubject } from '@/services/openLibrary/subjects';
import type { Genre } from '@/types/models';

const FAN_CLASS_NAMES = [
  'left-0 translate-y-[2px] rotate-[-7deg] group-hover:translate-x-[-4px] group-hover:translate-y-[1px] group-hover:rotate-[-11deg] group-aria-[current=true]:translate-x-[-4px] group-aria-[current=true]:translate-y-[1px] group-aria-[current=true]:rotate-[-11deg]',
  'left-[22px] z-1 translate-y-[-4px] group-hover:translate-y-[-8px] group-aria-[current=true]:translate-y-[-8px]',
  'left-[44px] translate-y-[2px] rotate-[7deg] group-hover:translate-x-[4px] group-hover:translate-y-[1px] group-hover:rotate-[11deg] group-aria-[current=true]:translate-x-[4px] group-aria-[current=true]:translate-y-[1px] group-aria-[current=true]:rotate-[11deg]',
];

interface Props {
  subject: Genre['subject'];
}

const Component: React.FC<Props> = async ({ subject }) => {
  const subjectResponse = await getSubject({ subject });

  if (!subjectResponse) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.openLibraryUnavailable} type="error" />;
  }

  return (
    <div aria-hidden="true" className="relative h-[72px] w-[88px]">
      {subjectResponse.works.map((work, index) => {
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
  );
};

export const GenreCovers = memo(Component);

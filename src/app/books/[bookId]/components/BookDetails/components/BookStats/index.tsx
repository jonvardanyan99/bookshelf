import { memo } from 'react';

import { ServerToast } from '@/components/ServerToast';
import { Typography } from '@/components/Typography';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { getWorkBookshelves, getWorkRatings } from '@/services/openLibrary/works';
import type { GetWorkVariables } from '@/services/openLibrary/works/types';

const formatCount = (count: number) => count.toLocaleString('en-US');

interface Props {
  bookId: GetWorkVariables['workId'];
}

const Component: React.FC<Props> = async ({ bookId }) => {
  const [ratingsResult, readingLogResult] = await Promise.all([
    getWorkRatings({ workId: bookId }),
    getWorkBookshelves({ workId: bookId }),
  ]);

  if (!ratingsResult.data || !readingLogResult.data) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.bookDetailsUnavailable} type="error" />;
  }

  const { average, count } = ratingsResult.data.summary;
  const shelfCounts = readingLogResult.data.counts;
  const stats = [
    { label: 'Average rating', value: average === null ? 'Not rated' : average.toFixed(1) },
    { label: 'Ratings', value: formatCount(count) },
    { label: 'Want to read', value: formatCount(shelfCounts.want_to_read) },
    { label: 'Currently reading', value: formatCount(shelfCounts.currently_reading) },
    { label: 'Have read', value: formatCount(shelfCounts.already_read) },
  ];

  return (
    <dl className="flex flex-wrap items-start gap-[24px]">
      {stats.map((stat) => (
        <div className="flex flex-col-reverse gap-[4px]" key={stat.label}>
          <dt>
            <Typography className="text-gray" variant="subtitle">
              {stat.label}
            </Typography>
          </dt>
          <dd>
            <Typography className="text-h4! font-semibold tabular-nums" variant="body">
              {stat.value}
            </Typography>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export const BookStats = memo(Component);

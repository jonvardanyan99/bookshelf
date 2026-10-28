import { clsx } from 'clsx';
import { memo } from 'react';

import { BecomeLibrarianButton } from '@/app/components/Community/components/BecomeLibrarianButton';
import { Typography } from '@/components/Typography';

const FACTS = [
  { description: 'By anyone, like Wikipedia', title: 'Editable' },
  { description: 'Every record, free to download', title: 'Public' },
  { description: 'Built on the Open Library catalog', title: 'Nonprofit' },
];

const STATS = [
  { change: '↑ 57%', label: 'New Members', value: '238K' },
  { change: null, label: 'Books Read', value: '277K' },
  { change: '↑ 30%', label: 'Catalog Edits', value: '319K' },
  { change: '↑ 222%', label: 'Lists Created', value: '5.9K' },
];

const CARD_CLASS_NAME = 'rounded-[8px] border border-gray-light bg-white p-[24px] shadow-raised';

const Component: React.FC = () => (
  <section aria-label="Community" className="mb-[32px] flex flex-col gap-[16px] md:flex-row">
    <div className={clsx(CARD_CLASS_NAME, 'flex flex-col gap-[24px] md:flex-2 md:flex-row')}>
      <div className="flex flex-1 flex-col items-start gap-[12px]">
        <Typography className="max-w-[340px] text-h3!" variant="h2">
          A library made by the people who use it.
        </Typography>
        <Typography className="mb-[12px] max-w-[565px] text-gray" variant="body">
          A catalog for every book ever published, maintained by readers like you.
        </Typography>
        <BecomeLibrarianButton />
      </div>
      <dl className="mt-[4px] flex flex-col gap-[12px] md:w-[240px]">
        {FACTS.map((fact) => (
          <div key={fact.title}>
            <dt className="mb-[4px]">
              <Typography className="font-semibold" variant="subtitle">
                {fact.title}
              </Typography>
            </dt>
            <dd>
              <Typography className="text-gray" variant="subtitle">
                {fact.description}
              </Typography>
            </dd>
          </div>
        ))}
      </dl>
    </div>
    <div className={clsx(CARD_CLASS_NAME, 'flex flex-col gap-[12px] md:flex-1')}>
      <Typography
        className="text-caption! font-medium! tracking-[0.24px] text-gray uppercase"
        variant="h2"
      >
        In the last month
      </Typography>
      <dl className="grid grid-cols-2 items-start gap-x-[24px] gap-y-[12px]">
        {STATS.map((stat) => (
          <div className="flex flex-col-reverse gap-[4px]" key={stat.label}>
            <dt>
              <Typography className="text-gray" variant="subtitle">
                {stat.label}
              </Typography>
            </dt>
            <dd className="flex flex-wrap items-baseline gap-[8px]">
              <Typography className="text-h4! font-semibold tabular-nums" variant="body">
                {stat.value}
              </Typography>
              {stat.change && (
                <Typography className="text-gray tabular-nums" variant="caption">
                  {stat.change}
                </Typography>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export const Community = memo(Component);

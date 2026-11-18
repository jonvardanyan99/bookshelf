import { memo } from 'react';

import { Typography } from '@/components/Typography';

const Component: React.FC = () => (
  <Typography className="text-gray" variant="subtitle">
    Nothing here yet.
  </Typography>
);

export const EmptyData = memo(Component);

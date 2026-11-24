import { memo } from 'react';

import { ServerToast } from '@/components/ServerToast';
import { Typography } from '@/components/Typography';
import { TOAST_ERROR_MESSAGES } from '@/constants/toasts';
import { getAuthor } from '@/services/openLibrary/authors';

interface Props {
  authorKeys: string[];
}

const Component: React.FC<Props> = async ({ authorKeys }) => {
  const authorResults = await Promise.all(authorKeys.map((authorKey) => getAuthor({ authorKey })));
  const isOpenLibraryUnavailable = authorResults.some(
    (authorResult) => !authorResult.data && authorResult.status !== 404,
  );

  if (isOpenLibraryUnavailable) {
    return <ServerToast message={TOAST_ERROR_MESSAGES.bookDetailsUnavailable} type="error" />;
  }

  const authorNames = authorResults.flatMap((authorResult) =>
    authorResult.data ? [authorResult.data.name] : [],
  );

  if (authorNames.length === 0) {
    return null;
  }

  const joinedAuthorNames = authorNames.join(', ');

  return <Typography variant="body">by {joinedAuthorNames}</Typography>;
};

export const AuthorNames = memo(Component);

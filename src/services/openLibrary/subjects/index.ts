import { cacheLife } from 'next/cache';

import { fetchOpenLibrary } from '@/services/openLibrary';
import type {
  GetSubjectResponse,
  GetSubjectVariables,
} from '@/services/openLibrary/subjects/types';

export const getSubject = async ({
  limit = 3,
  subject,
}: GetSubjectVariables): Promise<GetSubjectResponse> => {
  'use cache';

  try {
    const subjectResponse = await fetchOpenLibrary<GetSubjectResponse>(
      `/subjects/${subject}.json`,
      { limit: String(limit) },
    );

    cacheLife('days');

    return subjectResponse;
  } catch {
    cacheLife('minutes');

    return { works: [] };
  }
};

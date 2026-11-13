import { fetchOpenLibrary } from '@/services/openLibrary';
import type {
  GetSubjectResponse,
  GetSubjectVariables,
} from '@/services/openLibrary/subjects/types';

export const getSubject = ({ limit = 3, subject }: GetSubjectVariables) =>
  fetchOpenLibrary<GetSubjectResponse>(`/subjects/${subject}.json`, { limit: String(limit) });

import type * as zod from 'zod';

import type { LOG_IN_SCHEMA, SIGN_UP_SCHEMA } from '@/utils/formSchemas';

export interface FormState<Fields extends string> {
  errors?: Partial<Record<Fields, string[]>>;
  toastError?: string;
  values?: Partial<Record<Fields, string>>;
}

export interface LogInFormState extends FormState<keyof zod.infer<typeof LOG_IN_SCHEMA>> {
  message?: string;
}

export interface SignUpFormState extends FormState<keyof zod.infer<typeof SIGN_UP_SCHEMA>> {
  message?: string;
}

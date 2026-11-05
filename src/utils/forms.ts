import 'server-only';

import * as zod from 'zod';

import { PASSWORD_FIELD } from '@/constants/formFields';
import type { ParsedForm } from '@/types/models';

const SECRET_FIELDS = [PASSWORD_FIELD];

const getFieldValue = (formData: FormData, name: string) => {
  const value = formData.get(name);

  return typeof value === 'string' ? value : '';
};

export const parseForm = <Schema extends zod.ZodObject>(
  schema: Schema,
  formData: FormData,
): ParsedForm<zod.infer<Schema>> => {
  const fieldValues = Object.keys(schema.shape).map((fieldName): [string, string] => [
    fieldName,
    getFieldValue(formData, fieldName),
  ]);
  const values = Object.fromEntries(
    fieldValues.filter(
      ([fieldName]) => !SECRET_FIELDS.some((secretField) => secretField === fieldName),
    ),
  );
  const result = schema.safeParse(Object.fromEntries(fieldValues));

  if (!result.success) {
    return { data: null, errors: zod.flattenError(result.error).fieldErrors, values };
  }

  return { data: result.data, errors: {}, values };
};

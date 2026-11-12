'use client';

import { catchError, type ErrorInfo } from 'next/error';

import { ActionErrorRecovery } from '@/components/FormActionBoundary/components/ActionErrorRecovery';

export const FormActionBoundary = catchError((_props: object, errorInfo: ErrorInfo) => (
  <ActionErrorRecovery reset={errorInfo.reset} />
));

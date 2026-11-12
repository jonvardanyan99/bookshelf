import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import type { FormState } from '@/types/formValues';

export const useFormAction = <State extends FormState<string>>(
  serverAction: (state: Awaited<State>, formData: FormData) => Promise<State>,
  initialState: Awaited<State>,
) => {
  const actionState = useActionState(serverAction, initialState);
  const [state] = actionState;

  useEffect(() => {
    if (state.toastError) {
      toast.error(state.toastError);
    }
  }, [state]);

  return actionState;
};

'use client';

import { memo, useActionState } from 'react';

import { signUp } from '@/actions/auth';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { PASSWORD_FIELD } from '@/constants/formFields';

const Component: React.FC = () => {
  const [state, action, pending] = useActionState(signUp, {});

  return (
    <form action={action} className="mb-[24px] flex flex-col items-start gap-[24px]">
      <div className="flex flex-col gap-[12px] self-stretch">
        <TextField
          autoComplete="email"
          defaultValue={state.values?.email}
          errors={state.errors?.email}
          label="Email"
          name="email"
          type="email"
        />
        <TextField
          autoComplete="username"
          defaultValue={state.values?.screenName}
          errors={state.errors?.screenName}
          label="Screen Name"
          name="screenName"
          type="text"
        />
        <TextField
          autoComplete="new-password"
          errors={state.errors?.[PASSWORD_FIELD]}
          label="Password"
          name={PASSWORD_FIELD}
          type="password"
        />
      </div>
      <Button disabled={pending} type="submit" variant="primary">
        Sign Up
      </Button>
    </form>
  );
};

export const SignUpForm = memo(Component);

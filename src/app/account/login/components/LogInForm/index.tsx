'use client';

import { memo, useActionState } from 'react';

import { logIn } from '@/actions/auth';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { Typography } from '@/components/Typography';
import { PASSWORD_FIELD } from '@/constants/formFields';

const Component: React.FC = () => {
  const [state, action, pending] = useActionState(logIn, {});

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
          autoComplete="current-password"
          errors={state.errors?.[PASSWORD_FIELD]}
          label="Password"
          name={PASSWORD_FIELD}
          type="password"
        />
        {state.message && (
          <Typography className="text-error" variant="subtitle">
            {state.message}
          </Typography>
        )}
      </div>
      <Button disabled={pending} type="submit" variant="primary">
        Log In
      </Button>
    </form>
  );
};

export const LogInForm = memo(Component);

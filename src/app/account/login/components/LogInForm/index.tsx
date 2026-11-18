'use client';

import { memo } from 'react';

import { logIn } from '@/actions/auth';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';
import { Typography } from '@/components/Typography';
import { PASSWORD_FIELD } from '@/constants/formFields';
import { useFormAction } from '@/hooks/useFormAction';

const Component: React.FC = () => {
  const [state, action] = useFormAction(logIn, {});

  return (
    <form action={action} className="mb-[24px]">
      <div className="mb-[24px] flex flex-col gap-[12px]">
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
          <Typography className="text-error" role="alert" variant="subtitle">
            {state.message}
          </Typography>
        )}
      </div>
      <Button type="submit" variant="primary">
        Log In
      </Button>
    </form>
  );
};

export const LogInForm = memo(Component);

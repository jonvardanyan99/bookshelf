import { memo } from 'react';

import { Typography } from '@/components/Typography';

type InputType = 'email' | 'password' | 'text';

interface Props {
  autoComplete: string;
  defaultValue?: string;
  errors?: string[];
  label: string;
  name: string;
  type: InputType;
}

const Component: React.FC<Props> = ({ autoComplete, defaultValue, errors, label, name, type }) => {
  const errorId = `${name}-error`;
  const hasErrors = errors !== undefined && errors.length > 0;

  return (
    <div className="flex flex-col gap-[4px]">
      <label htmlFor={name}>
        <Typography className="text-subtitle! font-semibold" variant="caption">
          {label}
        </Typography>
      </label>
      <input
        aria-describedby={hasErrors ? errorId : undefined}
        aria-invalid={hasErrors}
        autoComplete={autoComplete}
        className="h-[36px] rounded-[8px] border border-gray-light bg-white px-[12px] text-body"
        defaultValue={defaultValue}
        id={name}
        name={name}
        required
        type={type}
      />
      {hasErrors && (
        <Typography className="text-error" id={errorId} role="alert" variant="caption">
          {errors.join(' ')}
        </Typography>
      )}
    </div>
  );
};

export const TextField = memo(Component);

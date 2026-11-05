import { memo } from 'react';

import { logOut } from '@/actions/auth';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';
import { getCurrentUser } from '@/lib/dal';

const Component: React.FC = async () => {
  const user = await getCurrentUser();

  return user ? (
    <form action={logOut} className="flex items-center gap-[12px]">
      <Typography className="text-body! font-semibold" variant="caption">
        {user.screenName}
      </Typography>
      <Button className="px-[12px]!" type="submit" variant="text">
        Log Out
      </Button>
    </form>
  ) : (
    <div className="flex gap-[12px]">
      <Link className="px-[12px]!" href={ROUTES.logIn} variant="text">
        Log In
      </Link>
      <Link className="px-[12px]!" href={ROUTES.signUp} variant="primary">
        Sign Up
      </Link>
    </div>
  );
};

export const Account = memo(Component);

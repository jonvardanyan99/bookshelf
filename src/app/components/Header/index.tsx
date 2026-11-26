import Image, { type StaticImageData } from 'next/image';
import { memo, Suspense } from 'react';

import { Account } from '@/app/components/Header/components/Account';
import { NavLinkButton } from '@/app/components/Header/components/NavLinkButton';
import { SearchButton } from '@/app/components/Header/components/SearchButton';
import icon from '@/app/icon.svg';
import { Link } from '@/components/Link';
import { Loader } from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = ['My Books', 'Browse'];

const Component: React.FC = () => (
  <header className="sticky top-0 z-2 mb-[12px] flex flex-wrap items-center gap-[16px] border-b border-gray-light bg-linear-to-b from-white to-beige p-[12px] shadow-raised">
    <Link className="group flex items-center gap-[8px]" href={ROUTES.home} variant="plain">
      <Image
        alt="Bookshelf logo"
        className="size-[40px] transition-transform group-hover:rotate-[-6deg] motion-reduce:transition-none"
        src={icon as StaticImageData}
      />
      <Typography
        className="text-h4! font-bold transition-colors group-hover:text-primary"
        variant="caption"
      >
        Bookshelf
      </Typography>
    </Link>
    <nav aria-label="Main" className="flex-1">
      <ul className="flex">
        {NAV_LINKS.map((navLink) => (
          <li key={navLink}>
            <NavLinkButton>{navLink}</NavLinkButton>
          </li>
        ))}
      </ul>
    </nav>
    <search className="flex-1">
      <SearchButton />
    </search>
    <Suspense fallback={<Loader className="px-[76px]" />}>
      <Account />
    </Suspense>
  </header>
);

export const Header = memo(Component);

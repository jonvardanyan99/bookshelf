import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { AuthButtons } from '@/app/components/Header/components/AuthButtons';
import { NavLinkButton } from '@/app/components/Header/components/NavLinkButton';
import { SearchButton } from '@/app/components/Header/components/SearchButton';
import icon from '@/app/icon.svg';
import { Typography } from '@/components/Typography';
import { ROUTES } from '@/constants/routes';

const NAV_LINKS = ['My Books', 'Browse'];

const Component: React.FC = () => (
  <header className="sticky top-0 z-2 mb-[12px] flex flex-wrap items-center gap-[16px] border-b border-gray-light bg-linear-to-b from-beige to-gray-light p-[12px]">
    <Link className="flex items-center gap-[8px]" href={ROUTES.home}>
      <Image alt="Bookshelf logo" className="size-[40px]" src={icon as StaticImageData} />
      <Typography className="text-h4! font-bold" variant="caption">
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
    <AuthButtons />
  </header>
);

export const Header = memo(Component);

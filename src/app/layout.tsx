import './globals.css';

import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Browse, discover and keep track of books with Open Library.',
  title: 'Bookshelf',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={clsx(inter.className, 'h-full antialiased')} lang="en">
      <body className="flex min-h-full flex-col bg-beige text-black">{children}</body>
    </html>
  );
}

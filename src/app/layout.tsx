import './globals.css';

import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { Typography } from '@/components/Typography';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Browse, discover and keep track of books with Open Library.',
  title: 'Bookshelf',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={clsx(inter.className, 'h-full antialiased')} lang="en">
      <body className="mx-auto flex min-h-full max-w-[1060px] flex-col bg-beige text-black">
        <a
          className="sr-only rounded-[8px] border border-gray-light bg-white p-[8px_16px] text-primary underline focus:not-sr-only focus:absolute focus:top-[8px] focus:left-[8px] focus:z-3"
          href="#main"
        >
          <Typography className="text-body! font-semibold" variant="caption">
            Skip to main content
          </Typography>
        </a>
        <Header />
        <main
          className="mb-[4px] flex-1 rounded-[8px] border border-gray-light bg-white p-[24px_20px]"
          id="main"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  headers: () =>
    Promise.resolve([
      {
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
        source: '/:path*',
      },
    ]),
  images: {
    remotePatterns: [new URL('https://covers.openlibrary.org/b/id/**')],
  },
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      '*.css': {
        as: '*.css',
        loaders: ['@tailwindcss/turbopack'],
      },
    },
  },
};

export default nextConfig;

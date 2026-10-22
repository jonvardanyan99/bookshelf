import { Typography } from '@/components/Typography';

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[768px] flex-1 flex-col justify-center p-[64px_16px]">
      <Typography className="mb-[16px]" variant="h1">
        Bookshelf
      </Typography>
      <Typography className="text-gray" variant="body">
        Browse, discover and keep track of books with Open Library.
      </Typography>
    </main>
  );
}

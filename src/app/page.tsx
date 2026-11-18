import { About } from '@/app/components/About';
import { BrowseStacks } from '@/app/components/BrowseStacks';
import { Community } from '@/app/components/Community';
import { WelcomeCards } from '@/app/components/WelcomeCards';

export default function Home({ searchParams }: PageProps<'/'>) {
  return (
    <>
      <WelcomeCards />
      <BrowseStacks searchParams={searchParams} />
      <Community />
      <About />
    </>
  );
}

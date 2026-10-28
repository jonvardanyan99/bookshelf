import { About } from '@/app/components/About';
import { BrowseStacks } from '@/app/components/BrowseStacks';
import { Community } from '@/app/components/Community';
import { WelcomeCards } from '@/app/components/WelcomeCards';

export default function Home() {
  return (
    <>
      <WelcomeCards />
      <BrowseStacks />
      <Community />
      <About />
    </>
  );
}

import SnowGlobeCanvas from '@/shared/components/canvas/SnowGlobeCanvas';
import UISection from '@/shared/components/ui/UISection';
import Header from './_components/header';
import TestModal from '@/shared/components/modals/testModal';

const Home = () => {
  return (
    <>
      <UISection>
        <Header />
        <TestModal />
      </UISection>
      <SnowGlobeCanvas />
    </>
  );
};

export default Home;

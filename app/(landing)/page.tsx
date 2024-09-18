import SnowGlobeCanvas from '@/shared/components/canvas/SnowGlobeCanvas';
import TestModal from '@/shared/components/modals/testModal';

const Home = () => {
  return (
    <>
      <div style={{ zIndex: 1, position: 'relative' }}>
        <TestModal />
      </div>
      <SnowGlobeCanvas />
    </>
  );
};

export default Home;

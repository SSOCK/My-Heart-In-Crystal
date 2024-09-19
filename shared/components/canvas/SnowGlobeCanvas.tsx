'use client';

import { Canvas } from '@react-three/fiber';
import Bottom from '@/shared/components/3dModels/Bottom';
import { OrbitControls } from '@react-three/drei';
import Base from './Base';
import MainDecoration from './MainDecoration';
import Glass from './Glass';
import Decorations from './Decorations';
import Snowflake from './Snowflake';

const SnowGlobeCanvas = () => {
  return (
    <section
      style={{
        width: '100%',
        height: '100dvh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [20, 2, 0], fov: 100 }}
      >
        <OrbitControls target={[0, 0, 0]} enablePan={false} />
        <ambientLight intensity={1} color={'#ffffff'} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
          color={'#ffffff'}
          castShadow
        />
        <Glass />
        {Array.from({ length: 100 }, (_, i) => (
          <Snowflake key={i} />
        ))}
        <Decorations />
        <MainDecoration />
        <Base />
        <Bottom />
      </Canvas>
    </section>
  );
};

export default SnowGlobeCanvas;

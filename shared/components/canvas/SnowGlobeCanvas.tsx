'use client';

import { Canvas } from '@react-three/fiber';
import Bottom from '../3dModels/Bottom';
import { OrbitControls } from '@react-three/drei';

const SnowGlobeCanvas = () => {
  return (
    <section style={{ width: '100%', height: '100dvh' }}>
      <Canvas flat linear camera={{ position: [20, 2, 0], fov: 100 }}>
        <OrbitControls target={[0, 0, 0]} enablePan={false} />
        <ambientLight intensity={1} color={'#ffffff'} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
          color={'#ffffff'}
          castShadow
        />
        <Bottom />
      </Canvas>
    </section>
  );
};

export default SnowGlobeCanvas;

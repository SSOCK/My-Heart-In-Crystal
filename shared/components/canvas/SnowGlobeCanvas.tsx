'use client';

import { Canvas } from '@react-three/fiber';
import Bottom from '../3dModels/Bottom';
import { OrbitControls } from '@react-three/drei';

const SnowGlobeCanvas = () => {
  return (
    <Canvas camera={{ position: [15, 2, 0], fov: 100 }} shadows={true}>
      <OrbitControls target={[0, 0, 2]} enablePan={false} />
      <ambientLight intensity={1} color={'#ffffff'} />
      <directionalLight
        position={[5, 7, 3]}
        intensity={2}
        color={'#ffffff'}
        castShadow
      />
      <Bottom />
    </Canvas>
  );
};

export default SnowGlobeCanvas;

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/shared/components/3dModels/MainDecoration';

const MakeCanvas = () => {
  return (
    <section className="canvas-3d">
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [5, 0, 0], fov: 100 }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={false}
          // maxPolarAngle={(Math.PI / 2 / 9) * 8}
        />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color={'#ffffff'}
        />
        <MainDecoration />
      </Canvas>
    </section>
  );
};

export default MakeCanvas;

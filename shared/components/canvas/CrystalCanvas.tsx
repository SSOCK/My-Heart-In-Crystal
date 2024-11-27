'use client';

import { Canvas } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/shared/components/3dModels/MainDecoration';
import Bottom from '@/shared/components/3dModels/Bottom';
import Decorations from '@/shared/components/canvas/Decorations';
import Environment from '@/shared/components/3dModels/Environment';

import Base from '@/shared/components/3dModels/Base';
import Glass from '@/shared/components/3dModels/Glass';
import Snowflake from '@/shared/components/3dModels/Snowflake';
import Ground from '@/shared/components/3dModels/Ground';

import Raycaster from '@/shared/components/canvas/Raycaster';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const CrystalCanvas = () => {
  return (
    <section className="canvas-3d">
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [16, 0, 0], fov: 100 }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={(Math.PI / 2 / 9) * 8}
        />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color={'#ffffff'}
          castShadow={true}
          shadow-mapSize-width={2048} // shadow resolution
          shadow-mapSize-height={2048}
          shadow-camera-far={50} // default is 50
          shadow-camera-near={1}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
        <Raycaster />
        <Glass />
        {Array.from({ length: 100 }, (_, i) => (
          <Snowflake key={i} />
        ))}
        <Decorations />
        <MainDecoration />
        <Base />
        <Bottom />
        <Ground />
        <Environment />

        <EffectComposer>
          <Bloom
            mipmapBlur={true}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            intensity={0.2}
          />
        </EffectComposer>
      </Canvas>
    </section>
  );
};

export default CrystalCanvas;

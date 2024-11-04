'use client';

import { useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MainDecoration from '@/app/(protected)/make/_components/MainDecoration';
import Bottom from '@/app/(protected)/make/_components/Bottom';
import Base from '@/app/(protected)/make/_components/Base';

const MakeCanvas = ({ step }: { step: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="canvas-3d">
      <Canvas
        flat
        linear
        shadows={true}
        camera={{ position: [12, 0, 0], fov: 100 }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          maxZoom={1}
          minDistance={8}
          maxDistance={15}
          maxPolarAngle={(Math.PI / 2) * 1.2}
        />
        <ambientLight intensity={1.5} color={'#ffffff'} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color={'#ffffff'}
        />
        {step >= 1 && <MainDecoration />}
        {step >= 3 && (
          <>
            <Base />
            <Bottom />
          </>
        )}
      </Canvas>
    </section>
  );
};

export default MakeCanvas;

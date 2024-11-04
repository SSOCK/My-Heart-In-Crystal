'use client';

import { Suspense } from 'react';
import { DrawerClose } from '@/components/ui/drawer';
import { DecorationType } from '@/shared/types/model';
import { Canvas } from '@react-three/fiber';
import Deco from '@/app/(protected)/make/_components/Deco';

const Decoration = ({ path, type }: { path: string; type: DecorationType }) => {
  return (
    <DrawerClose style={{ width: '18rem', height: '18rem' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} color={'#ffffff'} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            color={'#ffffff'}
          />
          <Deco path={path} type={type} />
        </Suspense>
      </Canvas>
    </DrawerClose>
  );
};

export default Decoration;

'use client';

import { DrawerTrigger } from '@/components/ui/drawer';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';

const Deco = ({ path }: { path: string }) => {
  const deco = useGLTF(path).scene.clone() as Group;

  deco.name = 'MainDeco';
  deco.scale.set(1, 1, 1);
  deco.position.set(0, -1.5, 0);
  deco.rotation.set(0, Math.PI, 0);
  deco.children.forEach((mesh) => (mesh.castShadow = false));

  useFrame((_, delta) => {
    deco.rotation.y += delta;
    if (deco.rotation.y > Math.PI * 2) deco.rotation.y = 0;
  });

  return <primitive object={deco} />;
};

const Decoration = ({ path }: { path: string }) => {
  return (
    <DrawerTrigger style={{ width: '18rem', height: '18rem' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={1} color={'#ffffff'} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color={'#ffffff'}
        />
        <Deco path={path} />
      </Canvas>
    </DrawerTrigger>
  );
};

export default Decoration;

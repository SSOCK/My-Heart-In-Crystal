'use client';

import { MutableRefObject, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Vector3 } from 'three';

import { makeColorChangedMaterial } from '@/shared/components/3dModels/utils/model';
import { use3DModel } from '@/app/(protected)/make/store/modelStore';

const fallingModel = (
  modelRef: Group,
  speedRef: MutableRefObject<Vector3>,
  delta: number,
  isStoppedRef: MutableRefObject<boolean>
) => {
  const airResistance = 0.02;
  const acceleration = 0.3 * delta; //가속도

  if (modelRef) {
    modelRef.position.add(speedRef.current);
    speedRef.current.y -= acceleration;
    speedRef.current.y *= 1 - airResistance;

    if (modelRef.position.y <= 0.1 && Math.abs(speedRef.current.y) <= 0.05) {
      isStoppedRef.current = true;
    }

    if (modelRef.position.y <= 0) {
      speedRef.current.y *= -1;
    }
  }
};

const MainDecoration = () => {
  const { model } = use3DModel() as { model: string };

  const deco = useGLTF(model).scene.clone() as Group;
  const speedRef = useRef<Vector3>(new Vector3(0, 0, 0));
  const isStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    isStoppedRef.current = false;
  }, [deco]);

  deco.name = 'MainDeco';
  deco.scale.set(1, 1, 1);
  deco.position.set(0, 10, 0);
  deco.children.forEach((mesh) => (mesh.castShadow = false));

  useFrame((_, delta) => {
    if (delta > 1) {
      delta = 0;
    }
    if (!isStoppedRef.current) {
      fallingModel(deco, speedRef, delta, isStoppedRef);
    }
  });

  const colorPart = deco.getObjectByName('colorPart') as Mesh | undefined;
  const color = '#ff0000';
  if (!colorPart) {
    return null;
  }
  colorPart.material = makeColorChangedMaterial(colorPart, color);

  return <primitive object={deco} />;
};

export default MainDecoration;

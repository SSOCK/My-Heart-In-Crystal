import { useGLTF } from '@react-three/drei';
import { ENVIRONMENTS } from '@/shared/constants/3dModel';
import { Mesh, MeshStandardMaterial } from 'three';

const Environment = () => {
  const moon = useGLTF(ENVIRONMENTS.MOON).scene.clone();

  moon.scale.set(10, 10, 10);
  moon.position.set(150, 100, 100);
  moon.rotation.set(0, Math.PI / 2, 0);
  moon.children.forEach((e) => {
    e.receiveShadow = false;
    if (e instanceof Mesh) {
      if (e.material instanceof MeshStandardMaterial) {
        e.material.emissive.set('#ffe880');
        e.material.emissiveIntensity = 0.8;
      }
    }
  });
  return <primitive object={moon} />;
};

export default Environment;

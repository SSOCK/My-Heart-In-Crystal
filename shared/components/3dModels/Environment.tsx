import { useGLTF } from '@react-three/drei';
import { ENVIRONMENTS } from '@/shared/constants/3dModel';
import { Mesh, MeshStandardMaterial, Vector3 } from 'three';

const Moon = () => {
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

const Tree = ({ position }: { position: Vector3 }) => {
  const tree = useGLTF(ENVIRONMENTS.TREE).scene.clone();
  tree.scale.set(1.5, 1.5, 1.5);
  tree.position.set(position.x, position.y, position.z);
  tree.receiveShadow = true;
  tree.castShadow = true;

  tree.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material instanceof MeshStandardMaterial) {
        object.material.emissive.set('#ffffff');
        object.material.roughness = 1;
        object.material.metalness = 0;
        object.material.emissiveIntensity = 0.06;
      }
    }
  });
  return <primitive object={tree} />;
};

const Environments = () => {
  const treePositions = [
    new Vector3(-35, -5, -35),
    new Vector3(-25, -5, 20),
    new Vector3(-30, -5, -45),
    new Vector3(-35, -5, 35),
    new Vector3(-10, -5, 35),
    new Vector3(5, -5, 40),
    new Vector3(10, -5, -30),
    new Vector3(-5, -5, -35),
  ];
  return (
    <>
      <Moon />
      {treePositions.map((position, index) => (
        <Tree key={index} position={position} />
      ))}
    </>
  );
};

export default Environments;

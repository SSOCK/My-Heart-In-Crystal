import { useGLTF } from '@react-three/drei';

const Bottom = () => {
  const bottom = useGLTF('/assets/bottoms/bottom.glb').scene.clone();
  return <primitive object={bottom} />;
};

export default Bottom;

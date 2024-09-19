import { Color, Vector3 } from 'three';

const Glass = () => {
  const color = new Color('white');
  const radius = 7;
  const position = new Vector3(0, radius / 2, 0);

  return (
    <mesh position={position} name={'glass'}>
      <sphereGeometry args={[radius, 36, 32]} />
      <meshStandardMaterial
        transparent={true}
        color={color}
        opacity={0.1}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
};

export default Glass;

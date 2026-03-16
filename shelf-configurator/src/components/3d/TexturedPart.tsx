import { useMemo } from 'react';
import type { MaterialType, ShelfPart } from '../../types';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const getMaterialProps = (type: MaterialType) => {
  switch (type) {
    case 'natural_wood':
      return { color: '#c8a96e', roughness: 0.8, metalness: 0.0 };
    case 'white_matte':
      return { color: '#f0ede8', roughness: 0.9, metalness: 0.0 };
    case 'black_matte':
      return { color: '#1a1a1a', roughness: 0.9, metalness: 0.0 };
    case 'glossy_white':
      return { color: '#ffffff', roughness: 0.05, metalness: 0.1 };
    default:
      return { color: '#ffffff', roughness: 0.5, metalness: 0.0 };
  }
};

function WoodPart({ part, materialProps }: { part: ShelfPart; materialProps: ReturnType<typeof getMaterialProps> }) {

  const textures = useTexture({
    map:          '/textures/natural_wood/color.jpg',
    roughnessMap: '/textures/natural_wood/roughness.jpg',
    normalMap:    '/textures/natural_wood/normal.jpg',
  });

  useMemo(() => {
    const scaleX = part.dimensions[0] / 100;
    const scaleY = part.dimensions[1] / 100;
    const scaleZ = part.dimensions[2] / 100;

    Object.values(textures).forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      if (part.type === 'shelf' || part.type === 'top' || part.type === 'bottom') {
        texture.repeat.set(scaleX, scaleZ);
      } else if (part.type === 'side') {
        texture.repeat.set(scaleZ, scaleY);
      } else if (part.type === 'back') {
        texture.repeat.set(scaleX, scaleY);
      }

      texture.needsUpdate = true;
    });
  }, [textures, part.dimensions, part.type]);

  return (
    <mesh position={part.position} castShadow receiveShadow>
      <boxGeometry args={part.dimensions} />
      <meshStandardMaterial {...textures} {...materialProps} />
    </mesh>
  );
}


function TexturedPart({ part, materialType }: { part: ShelfPart; materialType: MaterialType }) {
  const materialProps = getMaterialProps(materialType);

  if (materialType !== 'natural_wood') {
    return (
      <mesh position={part.position} castShadow receiveShadow>
        <boxGeometry args={part.dimensions} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  return <WoodPart part={part} materialProps={materialProps} />;
}



export default TexturedPart;

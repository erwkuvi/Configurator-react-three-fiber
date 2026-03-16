import { useMemo } from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { generateShelfParts } from '../../utils/geometry';
import type { MaterialType } from '../../types';

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

const ParametricShelf = () => {
	const {height, width, depth, shelfCount, thickness, material } = useConfigStore((state) => state.config);

  const parts = useMemo(() => {
    return generateShelfParts({
      width,
      height,
      depth,
      thickness,
      shelfCount,
      material
    });
  }, [width, height, depth, thickness, shelfCount, material]);

  const materialProps = getMaterialProps(material);

  return (
    <group>
      {parts.map((part) => (
        <mesh 
          key={part.id} 
          position={part.position} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={part.dimensions} />
          
          <meshStandardMaterial 
            color={materialProps.color}
            roughness={materialProps.roughness}
            metalness={materialProps.metalness}
						wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ParametricShelf;


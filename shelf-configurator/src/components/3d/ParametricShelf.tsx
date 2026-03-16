import { useMemo } from 'react';
import { useConfigStore } from '../../store/useConfigStore';
import { generateShelfParts } from '../../utils/geometry';
import  TexturedPart from './TexturedPart'


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

	return (
    <group>
      {parts.map((part) => (
        <TexturedPart key={part.id} part={part} materialType={material} />
      ))}
    </group>
  );
};

export default ParametricShelf;


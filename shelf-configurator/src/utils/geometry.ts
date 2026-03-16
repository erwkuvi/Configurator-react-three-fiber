import type { ShelfConfig, ShelfPart } from "../types";

export function generateShelfParts(config: ShelfConfig): ShelfPart[] {

	const { width, height, depth, thickness, shelfCount } = config;
	const parts: ShelfPart[] = [];

	// Common dimensions
	const innerWidth = width - 2 * thickness;


	// Left Side
	parts.push({
		id: 'side-left',
		type: 'side',
		dimensions: [thickness, height, depth],
		position: [-(width / 2) + (thickness / 2), height / 2, 0],
	});

	// Right Side
	parts.push({
		id: 'side-right',
		type: 'side',
		dimensions: [thickness, height, depth],
		position: [(width / 2) - (thickness / 2), height / 2, 0],
	});

	// Bottom Board
	parts.push({
		id: 'board-bottom',
		type: 'bottom',
		dimensions: [innerWidth, thickness, depth],
		position: [0, thickness / 2, 0],
	});

	// Top Board
	parts.push({
		id: 'board-top',
		type: 'top',
		dimensions: [innerWidth, thickness, depth],
		position: [0, height - (thickness / 2), 0],
	});

	// Back Board 
	const backThickness = 0.5;
	parts.push({
		id: 'board-back',
		type: 'back',
		dimensions: [innerWidth, height - 2 * thickness, backThickness],
		position: [0, height / 2, -(depth / 2) + (backThickness / 2)],
	});

	// Internal Shelves
	const usableHeight = height - (2 * thickness);

	const dividerCount = Math.floor(width / 150);
	const columns = dividerCount + 1;

	const totalDividerWidth = dividerCount * thickness;
	const columnInnerWidth = (innerWidth - totalDividerWidth) / columns;

	const xStep = columnInnerWidth + thickness;

	const dividerStartX = -(innerWidth / 2) + columnInnerWidth + (thickness / 2);

	for (let i = 0; i < dividerCount; i++) {
    parts.push({
      id: `divider-${i}`,
      type: 'side', 
      dimensions: [thickness, usableHeight, depth],
      position: [dividerStartX + (i * xStep), height / 2, 0],
    });
  }

	const stepSize = usableHeight / (shelfCount + 1);
  const shelfStartX = -(innerWidth / 2) + (columnInnerWidth / 2);

  for (let col = 0; col < columns; col++) {
    const currentColumnX = shelfStartX + (col * xStep);
    
    for (let row = 1; row <= shelfCount; row++) {
      parts.push({
        id: `shelf-internal-c${col}-r${row}`,
        type: 'shelf',
        dimensions: [columnInnerWidth, thickness, depth],
        position: [currentColumnX, thickness + (row * stepSize), 0],
      });
    }
  }

	return parts;
}

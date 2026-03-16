import { describe, it, expect } from 'vitest';
import { generateShelfParts } from './geometry';
import type { ShelfConfig } from '../types';

describe('Geometry Engine: generateShelfParts', () => {
  const baseConfig: ShelfConfig = {
    width: 100,
    height: 200,
    depth: 40,
    thickness: 2,
    shelfCount: 4,
    material: 'natural_wood',
  };

  it('should generate the correct number of base parts for a standard shelf', () => {
    const parts = generateShelfParts(baseConfig);
    
    // 1 Left Side + 1 Right Side + 1 Top + 1 Bottom + 1 Back + 4 Shelves = 9 parts
    expect(parts.length).toBe(9);
    
    const leftSide = parts.find(p => p.id === 'side-left');
    expect(leftSide).toBeDefined();
    // Verify C-level coordinate logic: Is it exactly on the left edge?
    expect(leftSide?.position[0]).toBe(-49); // -(100/2) + (2/2) = -49
  });

  it('should dynamically inject a vertical divider and split shelves when width >= 150cm', () => {
    const wideConfig = { ...baseConfig, width: 160 };
    const parts = generateShelfParts(wideConfig);
    
    const dividers = parts.filter(p => p.id.startsWith('divider-'));
    // 160 / 150 = 1 (rounded down) -> 1 divider expected
    expect(dividers.length).toBe(1);

    const shelves = parts.filter(p => p.type === 'shelf');
    // 4 rows * 2 columns = 8 shelf boards expected
    expect(shelves.length).toBe(8);

    // Verify the BOM: The shelves should now be narrower to fit inside the columns
    // const innerSpace = 160 - (2 * 2); // 156
    // const spaceMinusDivider = 156 - 2; // 154
    const expectedShelfWidth = 154 / 2; // 77
    
    expect(shelves[0].dimensions[0]).toBe(expectedShelfWidth);
  });
});

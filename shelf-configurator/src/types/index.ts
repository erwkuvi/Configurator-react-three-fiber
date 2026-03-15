export type MaterialType = 'natural_wood' | 'white_matte' | 'black_matte' | 'glossy_white';

export interface ShelfConfig {
  width: number;       // in cm
  height: number;      // in cm
  depth: number;       // in cm
  shelfCount: number;  // Number of internal shelves
  thickness: number;   // Board thickness 
  material: MaterialType;
}


export interface ShelfPart {
  id: string;
  type: 'side' | 'top' | 'bottom' | 'shelf' | 'back';
  dimensions: [number, number, number]; // [width, height, depth]
  position: [number, number, number];   // [x, y, z]
}

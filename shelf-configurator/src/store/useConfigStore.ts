import { create } from 'zustand';
import type { ShelfConfig } from '../types';

const DEFAULT_CONFIG: ShelfConfig = {
  width: 115,
  height: 150,
  depth: 40,
  shelfCount: 2,
  thickness: 3,
  material: 'natural_wood',
};

interface ConfigState {
	config: ShelfConfig;
	updateConfig: (patch: Partial<ShelfConfig>) => void;
	resetConfig: () => void;
}


export const useConfigStore = create<ConfigState>((set) => ({
	config: DEFAULT_CONFIG,
	// Mutations
	updateConfig: (patch) =>
		set((state) => ({ config: { ...state.config, ...patch } })),
	resetConfig: () => set({ config: DEFAULT_CONFIG }),
}));

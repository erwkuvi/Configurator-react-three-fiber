import { CubeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import SliderField from './SliderField';
import { useConfigStore } from '../../store/useConfigStore';
import type { MaterialType } from '../../types';


interface MaterialOption {
  id: MaterialType;
  name: string;
  colorCode: string;
}

const MATERIALS: MaterialOption[] = [
	{ id: 'natural_wood', name: 'Natural Wood', colorCode: 'bg-[#d2b48c]' },
	{ id: 'white_matte', name: 'White Matte', colorCode: 'bg-slate-50 border border-slate-200' },
	{ id: 'black_matte', name: 'Black Matte', colorCode: 'bg-slate-800' },
	{ id: 'glossy_white', name: 'Glossy White', colorCode: 'bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' },
];

// --- Main Sidebar Component ---

function ConfiguratorSidebar() {

	const config = useConfigStore((state) => state.config);
	const resetConfig = useConfigStore((state) => state.resetConfig);
	const updateConfig = useConfigStore((state) => state.updateConfig);
	console.log(config.thickness);


	return (
		<aside className="w-80 h-screen flex flex-col bg-white border-r border-slate-200 font-sans shadow-sm z-10">
			{/* Header */}
			<div className="p-6 border-b border-slate-100 flex items-center gap-3">
				<div className="p-2 bg-encoway bg-opacity-10 rounded-lg">
					<CubeIcon className="w-6 h-6 text-gray-50" />
				</div>
				<h1 className="text-sm font-bold tracking-wider text-slate-800 uppercase">
					Shelf-Configurator <span className="text-encoway">v1.0</span>
				</h1>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 overflow-y-auto p-6">
				{/* Dimensions Section */}
				<section className="mb-8">
					<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dimensions (cm)</h2>
					<SliderField
						label="Height"
						value={config.height}
						min={50}
						max={250}
						onChange={(val) => updateConfig({height: val})}
					/>
					<SliderField
						label="Width"
						value={config.width}
						min={30}
						max={200}
						onChange={(val) => updateConfig({width: val})}
					/>
					<SliderField
						label="Depth"
						value={config.depth}
						min={20}
						max={60}
						onChange={(val) => updateConfig({depth: val})}
					/>
					<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Structural density</h2>
					<SliderField
						label="Number of Shelves"
						value={config.shelfCount}
						min={1}
						max={3}
						onChange={(val) => updateConfig({shelfCount: val})}
					/>
					<SliderField
						label="Thickness"
						value={config.thickness}
						min={1}
						max={3}
						onChange={(val) => updateConfig({thickness: val})}
					/>
				</section>

				{/* Materials Section */}
				<section className="mb-8">
					<h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Material Finishes</h2>
					<div className="grid grid-cols-2 gap-3">
						{MATERIALS.map((mat) => {
							const isActive = config.material === mat.id;
							return (
								<button
									key={mat.id}
									onClick={() => updateConfig({material: mat.id})}
									className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200 ${isActive
										? 'border-encoway bg-encoway bg-opacity-5'
										: 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
										}`}
								>
									<div className={`w-8 h-8 rounded-full mb-2 ${mat.colorCode}`} />
									<span className={`text-xs font-medium text-center ${isActive ? 'text-gray-50' : 'text-slate-600'}`}>
										{mat.name}
									</span>
								</button>
							);
						})}
					</div>
				</section>
			</div>

			{/* Footer / Actions */}
			<div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col gap-3">
				<button
					onClick={resetConfig}
					className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-transparent border border-slate-300 hover:bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg transition-colors"
				>
					<ArrowPathIcon className="w-5 h-5" />
					Reset to Factory
				</button>
			</div>
		</aside>
	);
}

export default ConfiguratorSidebar;

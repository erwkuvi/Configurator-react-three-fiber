import './App.css'
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Loader } from '@react-three/drei';
import ConfiguratorSidebar from './components/ui/ConfiguratorSidebar';
import ParametricShelf from './components/3d/ParametricShelf';
import { Suspense } from 'react';
import { useConfigStore } from './store/useConfigStore';


function App() {
	const config = useConfigStore((state) => state.config);

	return (
		<div className="w-screen h-screen bg-neutral-100 flex overflow-hidden">

			<aside className="bg-white border-l border-gray-200  shadow-xl z-10 flex flex-col">
				<ConfiguratorSidebar />
			</aside>

			<main className="flex-1 relative">
				<Canvas shadows camera={{ position: [150, 150, 250], fov: 45 }}>
					<ambientLight intensity={0.5} />
					<directionalLight position={[200, 100, 100]} intensity={1.0} castShadow />

					<Suspense fallback={null}>
						<Environment preset="apartment" />
						<ParametricShelf />
					</Suspense>

					<ContactShadows
						position={[0, 0, 0]}
						opacity={1.0}
						scale={200}
						blur={10}
						far={10}
					/>
					<OrbitControls
						makeDefault
						minPolarAngle={0}
						maxPolarAngle={Math.PI / 2 + 0.1}
						target={[0, config.height / 2, 0]}
					/>
				</Canvas>
				<Loader
					containerStyles={{ background: '#f5f5f5' }} 
					innerStyles={{ width: '300px' }}
					barStyles={{ background: '#3b82f6' }} 
					dataStyles={{ color: '#1f2937', fontSize: '14px', fontFamily: 'sans-serif' }}
					dataInterpolation={(p) => `Loading assets... ${p.toFixed(0)}%`}
				/>
			</main>

		</div>
	);
}

export default App

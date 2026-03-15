
interface Props {
	label: string;
	value: number;
	min: number;
	max: number;
	onChange: (val: number) => void;
}

// --- Sub-components ---

const SliderField = ({ label, value, min, max, onChange }: Props) => (
	<div className="mb-6">
		<div className="flex justify-between items-center mb-2">
			<label className="text-sm font-medium text-slate-700">{label}</label>
			<span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
				{value} 
			</span>
		</div>
		<input
			type="range"
			min={min}
			max={max}
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1d76e2]"
		/>
	</div>
);

export default SliderField;


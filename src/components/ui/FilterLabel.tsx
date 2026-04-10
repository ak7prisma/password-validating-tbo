interface FilterLabelProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const FilterLabel = ({ label, checked, onChange }: FilterLabelProps) => (
  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 cursor-pointer">
    <input type="checkbox" className="accent-red-600 w-4 h-4" checked={checked} onChange={onChange} />
    {label}
  </label>
);
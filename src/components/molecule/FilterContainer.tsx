import type { DFAPolicy } from '../../utils/dfa';
import { FilterLabel } from '../ui/FilterLabel';

interface Props {
  rules: DFAPolicy;
  setRules: React.Dispatch<React.SetStateAction<DFAPolicy>>;
}

export const FilterContainer = ({ rules, setRules }: Props) => {
  const toggleRule = (key: keyof Omit<DFAPolicy, 'minLength'>) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-gray-900/80 backdrop-blur-md border border-red-600/40 p-6 rounded-t-xl relative border-b-0 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-orange-500 via-red-600 to-orange-500 shadow-[0_0_10px_#ff003c]" />
      
      <h3 className="font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 mb-4">
        SERVER SECURITY POLICY <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded align-middle ml-2">DFA</span>
      </h3>
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <FilterLabel label="[A-Z] Alpha" checked={rules.requireAlpha} onChange={() => toggleRule('requireAlpha')} />
        <FilterLabel label="[0-9] Numeric" checked={rules.requireNumeric} onChange={() => toggleRule('requireNumeric')} />
        <FilterLabel label="[!@#] Symbol" checked={rules.requireSymbol} onChange={() => toggleRule('requireSymbol')} />
        
        <div className="flex items-center gap-2 text-sm font-bold text-orange-500">
          <span>MIN_LEN:</span>
          <input
            type="number"
            min={1}
            value={rules.minLength}
            onChange={(e) => setRules(p => ({ ...p, minLength: Number(e.target.value) }))}
            className="bg-transparent border border-orange-500 text-white w-12 text-center py-1 outline-none"
          />
        </div>
      </div>
    </section>
  );
};
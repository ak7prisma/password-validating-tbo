import { type DFARules } from '../../utils/dfalogic';
import { Input } from '../ui/Input';

interface Props {
  rules: DFARules;
  setRules: React.Dispatch<React.SetStateAction<DFARules>>;
}

export const FilterContainer = ({ rules, setRules }: Props) => {
  const toggleRule = (key: keyof Omit<DFARules, 'minLength'>) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-gray-900/80 backdrop-blur-md border border-red-600/40 p-6 rounded-t-xl relative border-b-0 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-orange-500 via-red-600 to-orange-500 shadow-[0_0_10px_#ff003c]" />
      
      <h3 className="font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 mb-4">
        SERVER SECURITY POLICY <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded align-middle ml-2">DFA</span>
      </h3>
      
      <div className="flex flex-wrap justify-between items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 cursor-pointer">
          <input type="checkbox" className="accent-red-600 w-4 h-4" checked={rules.reqLetter} onChange={() => toggleRule('reqLetter')} />
          [A-Z] Alpha
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 cursor-pointer">
          <input type="checkbox" className="accent-red-600 w-4 h-4" checked={rules.reqNumber} onChange={() => toggleRule('reqNumber')} />
          [0-9] Numeric
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 cursor-pointer">
          <input type="checkbox" className="accent-red-600 w-4 h-4" checked={rules.reqSymbol} onChange={() => toggleRule('reqSymbol')} />
          [!@#] Symbol
        </label>
        <div className="flex items-center gap-2 text-sm font-bold text-orange-500">
          MIN_LEN:
          <input 
            type="number" min={1} 
            value={rules.minLength} 
            onChange={(e) => setRules(p => ({ ...p, minLength: Number(e.target.value) }))}
            className="bg-transparent border border-orange-500 text-white w-12 text-center py-1 outline-none" 
          />
        </div>
      </div>
    </section>
  );
};
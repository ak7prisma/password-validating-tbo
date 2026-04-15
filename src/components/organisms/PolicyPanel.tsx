import React from 'react';
import type { DFAPolicy } from '../../utils/dfa';

interface PolicyPanelProps {
  policy: DFAPolicy;
  onPolicyChange: (newPolicy: DFAPolicy) => void;
}

export const PolicyPanel: React.FC<PolicyPanelProps> = ({ policy, onPolicyChange }) => {
  const handleChange = (key: keyof DFAPolicy, value: boolean | number) => {
    onPolicyChange({ ...policy, [key]: value });
  };

  return (
    <div className="bg-[#111] p-4 border-l-4 border-[#f7931e] shadow-[0_0_10px_#f7931e]/20 mb-6">
      <h3 className="text-[#f7931e] font-bold text-lg mb-3 tracking-widest uppercase">
        DFA Security Policies
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={policy.requireAlpha}
            onChange={(e) => handleChange('requireAlpha', e.target.checked)}
            className="accent-[#f7931e] w-4 h-4 cursor-pointer"
          />
          <span>Require Alphabet (A-Z)</span>
        </label>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={policy.requireNumeric}
            onChange={(e) => handleChange('requireNumeric', e.target.checked)}
            className="accent-[#f7931e] w-4 h-4 cursor-pointer"
          />
          <span>Require Numeric (0-9)</span>
        </label>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={policy.requireSymbol}
            onChange={(e) => handleChange('requireSymbol', e.target.checked)}
            className="accent-[#f7931e] w-4 h-4 cursor-pointer"
          />
          <span>Require Symbol (!@#)</span>
        </label>

        <label className="flex items-center space-x-2">
          <span>Min Length :</span>
          <input
            type="number"
            min={1}
            max={20}
            value={policy.minLength}
            onChange={(e) => handleChange('minLength', Number.parseInt(e.target.value) || 0)}
            className="bg-[#222] border border-gray-600 text-white w-16 px-2 py-1 text-center outline-none focus:border-[#f7931e]"
          />
        </label>
      </div>
    </div>
  );
};

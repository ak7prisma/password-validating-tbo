import React from 'react';
import { DFAResult, DFARules } from '../../utils/dfa';

export interface ContentProps {
  isMatch: boolean;
  result: DFAResult;
  rules: DFARules;
}

export const ModalContent = ({ isMatch, result, rules }: ContentProps) => {
  return (
    <div className="bg-black/60 p-4 border-l-2 border-orange-500 font-mono text-sm space-y-2">
      <h4 className="text-orange-500 mb-2">{"> DFA ENGINE TRACE:"}</h4>
      <div className="flex justify-between">
        <span>[POLICY] Verify_Key:</span>
        <span className={isMatch ? 'text-green-500' : 'text-red-500'}>{isMatch ? 'OK' : 'MISMATCH'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Alpha_State:</span>
        <span className={result.letterOk ? 'text-green-500' : 'text-red-500'}>{result.finalStateInfo.hasL ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Numeric_State:</span>
        <span className={result.numberOk ? 'text-green-500' : 'text-red-500'}>{result.finalStateInfo.hasN ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Symbol_State:</span>
        <span className={result.symbolOk ? 'text-green-500' : 'text-red-500'}>{result.finalStateInfo.hasS ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Length_State:</span>
        <span className={result.lengthOk ? 'text-green-500' : 'text-red-500'}>{result.finalStateInfo.length}/{rules.minLength}</span>
      </div>
    </div>
  );
};
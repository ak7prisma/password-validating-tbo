import type { DFAResult, DFAPolicy } from '../../utils/dfa';

export interface ContentProps {
  isMatch: boolean;
  result: DFAResult;
  rules: DFAPolicy;
}

export const ModalContent = ({ isMatch, result, rules }: ContentProps) => {
  const letterOk = !rules.requireAlpha || result.hasAlpha;
  const numberOk = !rules.requireNumeric || result.hasNumeric;
  const symbolOk = !rules.requireSymbol || result.hasSymbol;
  const lengthOk = result.isLengthValid;

  return (
    <div className="bg-black/60 p-4 border-l-2 border-orange-500 font-mono text-sm space-y-2">
      <h4 className="text-orange-500 mb-2">{"> DFA ENGINE TRACE:"}</h4>
      <div className="flex justify-between">
        <span>[POLICY] Verify_Key:</span>
        <span className={isMatch ? 'text-green-500' : 'text-red-500'}>{isMatch ? 'OK' : 'MISMATCH'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Alpha_State:</span>
        <span className={letterOk ? 'text-green-500' : 'text-red-500'}>{result.hasAlpha ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Numeric_State:</span>
        <span className={numberOk ? 'text-green-500' : 'text-red-500'}>{result.hasNumeric ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Symbol_State:</span>
        <span className={symbolOk ? 'text-green-500' : 'text-red-500'}>{result.hasSymbol ? 'VALID' : 'INVALID'}</span>
      </div>
      <div className="flex justify-between">
        <span>[DFA] Length_State:</span>
        <span className={lengthOk ? 'text-green-500' : 'text-red-500'}>{result.inputLength}/{rules.minLength}</span>
      </div>
    </div>
  );
};
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DFAResult } from '../../utils/dfa';
import { Button } from '../atoms/Button';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  dfaResult: DFAResult | null;
  pwdMismatch: boolean;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, dfaResult, pwdMismatch }) => {
  if (!isOpen) return null;

  const isSuccess = dfaResult?.isAccepted && !pwdMismatch;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className={`bg-[#0a0a0a] border-2 ${isSuccess ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-[#ff003c] shadow-[0_0_20px_rgba(255,0,60,0.3)]'} max-w-2xl w-full p-6 relative [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]`}
        >
          <div className="absolute top-0 right-0 p-4">
            <button onClick={onClose} className="text-gray-400 hover:text-white font-mono text-xl">X</button>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-500' : 'text-[#ff003c]'}`}>
            {isSuccess ? 'REGISTRATION SUCCESS' : 'FAILED'}
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-[#111] p-4 font-mono text-sm overflow-x-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-600 border border-gray-800">
              <div className="text-gray-400 mb-2">{'// DFA TRACE'}</div>
              {dfaResult?.trace.map((t, i) => (
                <div key={`${t.char}-${t.fromState}-${t.toState}-${i}`} className="mb-1 text-gray-300">
                  <span className="text-[#f7931e]">Step {i + 1}:</span> Input '{t.char}' ({t.charClass})
                  {' -> '} Transition: <span className="text-pink-400">{t.fromState}</span> {'=>'} <span className="text-cyan-400">{t.toState}</span>
                </div>
              ))}
              {(!dfaResult?.trace || dfaResult.trace.length === 0) && (
                <div className="text-gray-500">No input processed.</div>
              )}
              <div className="mt-4 border-t border-gray-700 pt-2 text-[#f7931e]">
                {'// DFA FINAL RESULT'}
              </div>
              <div className="text-gray-300">
                Final State: <span className="text-cyan-400">{dfaResult?.finalState}</span><br />
                Has Alphabet: <span className={dfaResult?.hasAlpha ? "text-green-400" : "text-red-400"}>{dfaResult?.hasAlpha ? 'true' : 'false'}</span><br />
                Has Numeric: <span className={dfaResult?.hasNumeric ? "text-green-400" : "text-red-400"}>{dfaResult?.hasNumeric ? 'true' : 'false'}</span><br />
                Has Symbol: <span className={dfaResult?.hasSymbol ? "text-green-400" : "text-red-400"}>{dfaResult?.hasSymbol ? 'true' : 'false'}</span><br />
                Length Valid: <span className={dfaResult?.isLengthValid ? "text-green-400" : "text-red-400"}>{dfaResult?.isLengthValid ? 'true' : 'false'}</span><br />
                Password Mismatch: <span className={pwdMismatch ? "text-red-400" : "text-green-400"}>{pwdMismatch ? 'true' : 'false'}</span><br />
                <strong className="mt-2 block">DFA Accepted: <span className={dfaResult?.isAccepted ? "text-green-400" : "text-red-400"}>{dfaResult?.isAccepted ? 'true' : 'false'}</span></strong>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
             <Button variant={isSuccess ? 'secondary' : 'primary'} onClick={onClose}>Close</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

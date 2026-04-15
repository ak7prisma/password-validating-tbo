import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PolicyPanel } from "../components/organisms/PolicyPanel";
import { RegistrationForm } from "../components/organisms/RegistrationForm";
import { ResultModal } from "../components/organisms/ResultModal";
import { useTiltEffect } from "../hooks/useTiltEffect";
import { useRegistrationFlow } from "../hooks/useRegistrationFlow";
import { DEFAULT_DFA_POLICY, PORTAL_COPY } from "../utils/constants";
import type { DFAPolicy } from "../utils/dfa";

export const RegistrationPage: React.FC = () => {
  const [policy, setPolicy] = useState<DFAPolicy>(DEFAULT_DFA_POLICY);
  const cardRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY } = useTiltEffect(cardRef);
  const { isModalOpen, dfaResult, pwdMismatch, handleRegistrationSubmit, closeModal } =
    useRegistrationFlow(policy);

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white flex flex-col items-center justify-between p-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-[#050505]">
      {/* Background Neon Elements */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f7931e] to-transparent opacity-50 blur-sm"></div>
      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#ff003c] to-transparent opacity-50 blur-sm"></div>
      
      <div className="flex-grow flex items-center justify-center w-full">
        <motion.div
          className="max-w-xl w-full relative z-10"
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="bg-[#0a0a0a] border border-gray-800 p-8 shadow-2xl relative [clip-path:polygon(0_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%)] before:absolute before:inset-0 before:border-t-2 before:border-l-2 before:border-[#ff003c] before:[clip-path:polygon(0_0,20%_0,0_20%)] after:absolute after:inset-0 after:border-b-2 after:border-r-2 after:border-[#f7931e] after:[clip-path:polygon(100%_100%,80%_100%,100%_80%)]"
          >
            <div style={{ transform: "translateZ(50px)" }}>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#f7931e] to-[#ff003c] filter drop-shadow-[0_0_10px_rgba(255,0,60,0.8)]">
                  {PORTAL_COPY.title}
                </h1>
                <p className="text-gray-400 text-sm mt-2 font-mono uppercase tracking-widest">
                  {PORTAL_COPY.subtitle}
                </p>
              </div>

              <PolicyPanel policy={policy} onPolicyChange={setPolicy} />
              <RegistrationForm onSubmitStart={handleRegistrationSubmit} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dfaResult={dfaResult}
        pwdMismatch={pwdMismatch}
      />
    </div>
  );
};

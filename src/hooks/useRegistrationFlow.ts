import { useState } from "react";
import { PasswordDFA, type DFAResult, type DFAPolicy } from "../utils/dfa";

interface UseRegistrationFlowResult {
  isModalOpen: boolean;
  dfaResult: DFAResult | null;
  pwdMismatch: boolean;
  handleRegistrationSubmit: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  closeModal: () => void;
}

export const useRegistrationFlow = (policy: DFAPolicy): UseRegistrationFlowResult => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dfaResult, setDfaResult] = useState<DFAResult | null>(null);
  const [pwdMismatch, setPwdMismatch] = useState(false);

  const handleRegistrationSubmit = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const dfa = new PasswordDFA(policy);
    const result = dfa.evaluate(password);

    console.log(`Processing registration for: ${username} (${email})`);

    setDfaResult(result);
    setPwdMismatch(password !== confirmPassword);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    dfaResult,
    pwdMismatch,
    handleRegistrationSubmit,
    closeModal,
  };
};

import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { PasswordInput } from '../molecules/PasswordInput';
import { Button } from '../atoms/Button';

interface RegistrationFormProps {
  onSubmitStart: (username: string, email: string, pass: string, confirm: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmitStart }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitStart(username, email, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="USERNAME"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      
      <Input
        label="EMAIL"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <PasswordInput
        label="PASSWORD"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <PasswordInput
        label="CONFIRM PASSWORD"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <div className="pt-4 flex justify-end">
        <Button variant="primary" type="submit" className="w-full sm:w-auto">
          INITIALIZE REGISTRATION
        </Button>
      </div>
    </form>
  );
};

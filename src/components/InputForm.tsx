// components/InputForm.tsx
import React, { useState } from 'react';
import './InputForm.scss';

interface InputFormProps {
  onStart: (limit: number) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onStart }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = parseInt(inputValue, 10);

    if (Number.isNaN(value) || value < 0 || value > 100) {
      setError('Please enter a number between 0 and 100');
    } else {
      onStart(value);
      setInputValue('');
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a number between 0 and 100"
        />
        <button type="submit">Start</button>
        {error && <div className="error">{error}</div>}
        {submitted && !error && <div className="success">Form submitted successfully</div>}
      </form>
    </div>
  );
};

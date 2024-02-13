// components/InputForm.tsx
import React, { useState } from 'react';
import './InputForm.scss';

interface InputFormProps {
  onStart: (limit: number) => void;
  formOnChange: (value: number) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onStart, formOnChange }) => {
  const [inputValue, setInputValue] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Number.isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
      setError('Please enter a number between 0 and 100');
    } else {
      onStart(inputValue);
      setInputValue(0);
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(Number(e.target.value));
            formOnChange(Number(e.target.value));
          }}
          placeholder="Enter a number between 0 and 100"
        />
        <button type="submit">Start</button>
        {error && <div className="error">{error}</div>}
        {submitted && !error && <div className="success">Form submitted successfully</div>}
      </form>
    </div>
  );
};

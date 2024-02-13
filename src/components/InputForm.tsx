// components/InputForm.tsx
import React, { useState } from 'react';
import './InputForm.scss';

interface InputFormProps {
  onStart: () => void;
  formOnChange: (value: number) => void;
  concurrencyLimit: string
}

export const InputForm: React.FC<InputFormProps> = ({
  formOnChange,
  onStart,
  concurrencyLimit,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="number"
          max={concurrencyLimit}
          onChange={(e) => {
            formOnChange(Number(e.target.value));
          }}
          placeholder="Enter a number between 0 and 100"
        />
        <button type="submit">Start</button>

        {submitted && (
          <div className="success">Form submitted successfully</div>
        )}
      </form>
    </div>
  );
};

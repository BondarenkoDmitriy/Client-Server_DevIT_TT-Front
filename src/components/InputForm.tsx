/* eslint-disable */

import React, { useRef, useState } from "react";
import "./InputForm.scss";
import { debounce } from "lodash";

interface InputFormProps {
  onStart: () => void;
  formOnChange: (value: number) => void;
  concurrencyLimit: string;
}

export const InputForm: React.FC<InputFormProps> = ({
  formOnChange,
  onStart,
  concurrencyLimit,
}) => {

  const [submitted, setSubmitted] = useState<boolean>(false);

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onStart();
    setSubmitted(true);
  };

  const handleChangeDebounce = debounce((e) => {
    const currentValue = e.target.value;
    const regex = /^(?:100|[1-9]?[0-9])$/;
    
    if (!input.current) return;

    if (!regex.test(currentValue)) {
      formOnChange(10);
      input.current.value = "";
    } else {
      formOnChange(currentValue);
      input.current.value = currentValue;
    }
  }, 300); 


  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='number'
          ref={input}
          max={concurrencyLimit}
          onChange={(e) => {
            handleChangeDebounce(e);
        }}
          placeholder='Enter a number between 0 and 100'
        />
        <button type='submit'>Start</button>

        {submitted && (
          <div className='success'>Form submitted successfully</div>
        )}
      </form>
    </div>
  );
};

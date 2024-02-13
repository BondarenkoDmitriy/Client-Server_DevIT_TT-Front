import React from 'react';
import { InputForm } from './components/InputForm';
import './App.scss';

export const App: React.FC = () => {
  const handleStart = (limit: number) => {
    // eslint-disable-next-line no-console
    console.log('Starting with limit:', limit);
  };

  return (
    <div className="App">
      <h1>Client-Server Form</h1>
      <InputForm onStart={handleStart} />
    </div>
  );
};

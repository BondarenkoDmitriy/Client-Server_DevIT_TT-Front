/* eslint-disable */

import React from 'react';
import { InputForm } from './components/InputForm';
import './App.scss';
import _ from 'lodash';

export const App: React.FC = () => {
  const handleClickStart = async (limit: number) => {
    try {
      const requests = Array.from({ length: limit }, (_, index) => index + 1);

      const allPromises = requests.map(async (index) => {
        const response = await fetch(`http://localhost:5000/api?index=${index}&limit=${limit}`, {
          method: 'GET',
        });
        return response.text();
      })

      const promisesChunks = _.chunk(allPromises, 10);

      promisesChunks.forEach(async (chunk) => {
        const responses = await Promise.all(chunk);

        responses.forEach((data, index) => {
          console.log(`Response from server ${index}:`, data);
        });
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStart = async (limit: number) => {
    console.log('Starting with limit:', limit);
    await handleClickStart(limit);
  };

  return (
    <div className="App">
      <h1>Client-Server Form</h1>
      <InputForm onStart={handleStart} />
    </div>
  );
};

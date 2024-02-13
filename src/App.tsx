/* eslint-disable */

import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import './App.scss';
import _ from 'lodash';

export const App: React.FC = () => {
  const [sizeChunks, setSizeChunks] = useState<number>(10);
  const [list, setList] = useState<string[]>([]);
 
  const handleClickStart = async () => {
    try {
      const requests = Array.from(Array(100).keys());

      const allPromises = requests.map(async (index) => {
        const response = await fetch(
          `http://localhost:5000/api?index=${index}&limit=${sizeChunks}`,
          {
            method: "GET",
          }
        );
        return response.text();
      });
      const promisesChunks = _.chunk(allPromises, sizeChunks);
      promisesChunks.forEach(async (chunk) => {
        const responses = await Promise.all(chunk);
        setList((prev) => [...prev, ...responses]);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  type ItemProps = {
    index: any;
  };
  const Item: React.FC<ItemProps> = ({ index }) => <p>{index}</p>;

  const concurrencyLimit = "100";

  return (
    <div className='App'>
      <h1>Client-Server Form</h1>
     
      <InputForm
        onStart={handleClickStart}
        formOnChange={setSizeChunks}
        concurrencyLimit={concurrencyLimit}
      />

      <div>
        {list.map((i, index) => (
          <Item index={i} key={index} />
        ))}
      </div>
    </div>
  );
};

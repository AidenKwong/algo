import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const SimpleSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    e.preventDefault();
    Simple_Sorting_Algo(number);
  };

  const Simple_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    const send = async () => {
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (sortedArr[i] > sortedArr[j]) {
            var tmp = sortedArr[i];
            sortedArr[i] = sortedArr[j];
            sortedArr[j] = tmp;

            setOutput([...sortedArr]);
            await timer(10);
          }
        }
      }
      return setRunning(false);
    };
    send();
  };

  return (
    <SortVizMain
      title="Simeple Sorting Algorithm"
      instruction="Please enter the length of array "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={200}
    />
  );
};

export default SimpleSortViz;

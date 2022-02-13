import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const InsertionSortViz = () => {
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
      for (let i = 1; i < n; i++) {
        let current = sortedArr[i];

        let j = i - 1;
        while (j > -1 && current < sortedArr[j]) {
          sortedArr[j + 1] = sortedArr[j];
          setOutput([...sortedArr]);
          await timer(10);
          j--;
        }
        sortedArr[j + 1] = current;
      }
      return setRunning(false);
    };
    send();
  };

  return (
    <SortVizMain
      title="Insertion Sorting Algorithm"
      instruction="Please enter the length of array "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={1000}
    />
  );
};

export default InsertionSortViz;

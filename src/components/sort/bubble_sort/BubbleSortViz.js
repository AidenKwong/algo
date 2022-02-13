import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const BubbleSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    e.preventDefault();
    Bubble_Sorting_Algo(number);
  };

  const Bubble_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    const send = async () => {
      for (let i = n; i >= 0; i--) {
        for (let j = n; j >= 0; j--) {
          if (sortedArr[i] > sortedArr[j - 1]) {
            var tmp = sortedArr[i];
            sortedArr[i] = sortedArr[j - 1];
            sortedArr[j - 1] = tmp;
            setOutput([...sortedArr]);
            await timer();
          }
        }
      }

      return setRunning(false);
    };
    send();
  };

  return (
    <SortVizMain
      title="Bubble Sorting Algorithm"
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

export default BubbleSortViz;

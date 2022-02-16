import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const bubbleSort = (array) => {
  for (var i = array.length; i >= 0; i--) {
    for (var j = array.length; j >= 0; j--) {
      if (array[i] > array[j - 1]) {
        var tmp = array[i];
        array[i] = array[j - 1];
        array[j - 1] = tmp;

      }
    }
  }
  return array;
};
`;

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
      for (var i = n; i >= 0; i--) {
        for (var j = n; j >= 0; j--) {
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
      title="Bubble Sort"
      instruction="Please enter the length of array "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={200}
      code={code}
    />
  );
};

export default BubbleSortViz;

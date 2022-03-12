import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const insertionSort = (array) => {
  for (var i = 1; i < n; i++) {
    var current = array[i];

    var j = i - 1;
    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
};
`;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const InsertionSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [checkingIdx, setCheckingIdx] = useState({ curr: null, check: null });

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
      for (var i = 1; i < n; i++) {
        var current = sortedArr[i];

        var j = i - 1;
        while (j > -1 && current < sortedArr[j]) {
          setCheckingIdx({ curr: i, check: j });
          sortedArr[j + 1] = sortedArr[j];
          setOutput([...sortedArr]);
          await timer(10);
          j--;
        }
        sortedArr[j + 1] = current;
      }
      setCheckingIdx({ curr: null, check: null });
      return setRunning(false);
    };
    send();
  };

  return (
    <SortVizMain
      title="Insertion Sort"
      instruction="Please enter the length of array "
      output={output}
      checkingIdx={checkingIdx}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={1000}
      code={code}
    />
  );
};

export default InsertionSortViz;

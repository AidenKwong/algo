import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const SelectionSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    e.preventDefault();
    selectionSort(number);
  };

  const selectionSort = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }
    const sortedArr = [...array];

    const send = async () => {
      for (let i = 0; i < n; i++) {
        var min = i;
        for (let j = i + 1; j < n; j++) {
          if (sortedArr[j] < sortedArr[min]) {
            min = j;
          }
        }

        if (min !== i) {
          var tmp = sortedArr[i];
          sortedArr[i] = sortedArr[min];
          sortedArr[min] = tmp;
          setOutput([...sortedArr]);
          await timer(10);
        }
      }
      return setRunning(false);
    };
    send().then(() => setOutput([...sortedArr]));
  };

  return (
    <SortVizMain
      title="Selection Sorting Algorithm"
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

export default SelectionSortViz;

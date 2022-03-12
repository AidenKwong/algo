import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const selectionSort = (array) => {
  for (var i = 0; i < array.length; i++) {
    var min = i;
    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }

    if (min !== i) {
      var tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;
    }
  }
  return array;
};`;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const SelectionSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [checkingIdx, setCheckingIdx] = useState({ curr: null, check: null });

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
      for (var i = 0; i < n; i++) {
        var min = i;
        for (var j = i + 1; j < n; j++) {
          if (sortedArr[j] < sortedArr[min]) {
            min = j;
            setCheckingIdx({ curr: i, check: j });
            setOutput([...sortedArr]);
            await timer(10);
          }
        }

        if (min !== i) {
          var tmp = sortedArr[i];
          sortedArr[i] = sortedArr[min];
          sortedArr[min] = tmp;
        }
      }
      setCheckingIdx({ curr: null, check: null });
      return setRunning(false);
    };
    send().then(() => setOutput([...sortedArr]));
  };

  return (
    <SortVizMain
      title="Selection Sort"
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

export default SelectionSortViz;

import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const partition = (arr, start, end) => {
  const pivotValue = arr[end];
  var pivotIndex = start;
  for (var i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
};

const quickSortIterative = async (arr) => {
  var stack = [];
  stack.push(0);
  stack.push(arr.length - 1);
  while (stack[stack.length - 1] >= 0) {
    var end = stack.pop();
    var start = stack.pop();
    var pivotIndex = partition(arr, start, end);
    if (pivotIndex - 1 > start) {
      stack.push(start);
      stack.push(pivotIndex - 1);
    }
    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1);
      stack.push(end);
    }
    setOutput([...arr]);
    await timer(10);
  }
  setOutput([...arr]);
  return setRunning(false);
};`;

const partition = (arr, start, end) => {
  const pivotValue = arr[end];
  var pivotIndex = start;
  for (var i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      pivotIndex++;
    }
  }
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
};
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const QuickSortViz = () => {
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

  const quickSortIterative = async (arr) => {
    var stack = [];
    stack.push(0);
    stack.push(arr.length - 1);
    while (stack[stack.length - 1] >= 0) {
      var end = stack.pop();
      var start = stack.pop();
      var pivotIndex = partition(arr, start, end);
      if (pivotIndex - 1 > start) {
        stack.push(start);
        stack.push(pivotIndex - 1);
      }
      if (pivotIndex + 1 < end) {
        stack.push(pivotIndex + 1);
        stack.push(end);
      }
      setCheckingIdx({ curr: end, check: start });
      setOutput([...arr]);
      await timer(10);
    }
    setCheckingIdx({ curr: null, check: null });
    setOutput([...arr]);
    return setRunning(false);
  };

  const Simple_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    quickSortIterative(sortedArr);
  };

  return (
    <SortVizMain
      title="Quick Sorting"
      instruction="Please enter the length of array "
      output={output}
      checkingIdx={checkingIdx}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={1500}
      code={code}
    />
  );
};

export default QuickSortViz;

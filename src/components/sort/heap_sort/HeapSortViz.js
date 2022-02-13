import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const buildMaxHeap = (arr) => {
  let i = Math.floor(arr.length / 2 - 1);

  while (i >= 0) {
    heapify(arr, i, arr.length);
    i -= 1;
  }
};

const heapify = (heap, i, max) => {
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;

    leftChild = 2 * i + 1;

    rightChild = leftChild + 1;

    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }

    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }

    if (index === i) {
      return;
    }

    swap(heap, i, index);

    i = index;
  }
};

const swap = (arr, firstItemIndex, lastItemIndex) => {
  const temp = arr[firstItemIndex];

  arr[firstItemIndex] = arr[lastItemIndex];
  arr[lastItemIndex] = temp;
};

const HeapSortViz = () => {
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

  const heapSort = async (arr) => {
    buildMaxHeap(arr);

    var lastElement = arr.length - 1;

    while (lastElement > 0) {
      swap(arr, 0, lastElement);
      heapify(arr, 0, lastElement);
      lastElement -= 1;
      setOutput([...arr]);
      await timer(10);
    }
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
    heapSort(sortedArr);
  };

  return (
    <SortVizMain
      title="Heap Sorting Algorithm"
      instruction="Please enter the length of array "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={2000}
    />
  );
};

export default HeapSortViz;

import React, { useState } from "react";
const buildMaxHeap = (arr) => {
  // Get index of the middle element
  let i = Math.floor(arr.length / 2 - 1);

  // Build a max heap out of
  // All array elements passed in
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

    // Get the left child index
    // Using the known formula
    leftChild = 2 * i + 1;

    // Get the right child index
    // Using the known formula
    rightChild = leftChild + 1;

    // If the left child is not last element
    // And its value is bigger
    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }

    // If the right child is not last element
    // And its value is bigger
    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }

    // If none of the above conditions is true
    // Just return
    if (index === i) {
      return;
    }

    // Else swap elements
    swap(heap, i, index);

    // Continue by using the swapped index
    i = index;
  }
};

const swap = (arr, firstItemIndex, lastItemIndex) => {
  const temp = arr[firstItemIndex];

  // Swap first and last items in the array
  arr[firstItemIndex] = arr[lastItemIndex];
  arr[lastItemIndex] = temp;
};

const HeapSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleOnChange = (e) => {
    //input field value
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    //hit RUN button
    e.preventDefault();
    Simple_Sorting_Algo(number);
  };

  const heapSort = async (arr) => {
    // Build max heap
    buildMaxHeap(arr);

    // Get the index of the last element
    var lastElement = arr.length - 1;

    // Continue heap sorting until we have
    // One element left
    while (lastElement > 0) {
      swap(arr, 0, lastElement);
      heapify(arr, 0, lastElement);
      lastElement -= 1;
      setOutput([...arr]);
      await timer(10);
    }
    setOutput([...arr]);
    // Return sorted array
    return setRunning(false);
  };

  const Simple_Sorting_Algo = (n) => {
    //simple sorting algorithm
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    heapSort(sortedArr);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Heap Sorting Algorithm O(nlogn)</h1>
      <form onSubmit={handleRun}>
        <span style={{ fontSize: "1rem" }}>
          {
            "Please enter the length of array (>100 will take a long time to run) "
          }
        </span>
        <input onChange={handleOnChange} />
        <div>
          <button style={{ margin: "1rem 0" }} disabled={running}>
            RUN
          </button>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "50vh",
          border: "1px solid black",
        }}
      >
        {output.map((num, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "gray",
              outline: "1px solid black",
              width: `${(1 / output.length) * 100}%`,
              height: `${(num / Math.max(...output)) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeapSortViz;

import React, { useState } from "react";

function partition(arr, start, end) {
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

const QuickSortViz = () => {
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

  async function quickSortIterative(arr) {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    var stack = [];

    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);

    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while (stack[stack.length - 1] >= 0) {
      // Extracting the top unsorted subarray
      var end = stack.pop();
      var start = stack.pop();

      var pivotIndex = partition(arr, start, end);

      // If there are unsorted elements to the "left" of the pivot,
      // we add that subarray to the stack so we can sort it later
      if (pivotIndex - 1 > start) {
        stack.push(start);
        stack.push(pivotIndex - 1);
      }

      // If there are unsorted elements to the "right" of the pivot,
      // we add that subarray to the stack so we can sort it later
      if (pivotIndex + 1 < end) {
        stack.push(pivotIndex + 1);
        stack.push(end);
      }
      setOutput([...arr]);
      await timer(10);
    }
    setOutput([...arr]);
    return setRunning(false);
  }

  const Simple_Sorting_Algo = (n) => {
    //simple sorting algorithm
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    quickSortIterative(sortedArr);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Quick Sorting Algorithm O(nlogn)</h1>
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

export default QuickSortViz;

import React, { useState } from "react";
import "../sort.scss";

function partition(arr, start, end) {
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

      pivotIndex++;
    }
  }

  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}

const QuickSortViz = () => {
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

  async function quickSortIterative(arr) {
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
  }

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
    <div className="container">
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

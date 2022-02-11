import React, { useState } from "react";
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const SelectionSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);

  const handleOnChange = (e) => {
    //input field value
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    //hit RUN button
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
        // Finding the smallest number in the subarray

        var min = i;
        for (let j = i + 1; j < n; j++) {
          if (sortedArr[j] < sortedArr[min]) {
            min = j;
          }
        }

        if (min !== i) {
          // Swapping the elements

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
    <div style={{ padding: "2rem" }}>
      <h1>Selection Sorting Algorithm O(n^2)</h1>
      <form onSubmit={handleRun}>
        <span style={{ fontSize: "1rem" }}>
          {"Please enter the length of array "}
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

export default SelectionSortViz;

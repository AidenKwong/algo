import React, { useState } from "react";
import "../sort.scss";

const InsertionSortViz = () => {
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

  const Simple_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    const send = async () => {
      for (let i = 1; i < n; i++) {
        let current = sortedArr[i];

        let j = i - 1;
        while (j > -1 && current < sortedArr[j]) {
          sortedArr[j + 1] = sortedArr[j];
          setOutput([...sortedArr]);
          await timer(10);
          j--;
        }
        sortedArr[j + 1] = current;
      }
      return setRunning(false);
    };
    send();
  };

  return (
    <div className="container">
      <h1>Insertion Sorting Algorithm O(n^2)</h1>
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

export default InsertionSortViz;

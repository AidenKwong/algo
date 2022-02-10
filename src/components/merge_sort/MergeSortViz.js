import React, { useState } from "react";

const MergeSortViz = () => {
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

  async function mergeSort(arr) {
    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    var n = arr.length;
    var curr_size;

    // For picking starting index of
    // left subarray to be merged
    var left_start;

    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
      // Pick starting point of different
      // subarrays of current size
      for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
        // Find ending point of left
        // subarray. mid+1 is starting
        // point of right
        var mid = Math.min(left_start + curr_size - 1, n - 1);

        var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

        // Merge Subarrays arr[left_start...mid]
        // & arr[mid+1...right_end]

        setOutput([...arr]);
        await timer(10);
        merge(arr, left_start, mid, right_end);
      }
    }
    setOutput([...arr]);
    setRunning(false);
  }

  /*
   * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
   */
  function merge(arr, l, m, r) {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;

    /* create temp arrays */
    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    /*
     * Copy data to temp arrays L and R
     */
    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    /*
     * Merge the temp arrays back into arr[l..r]
     */
    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    /*
     * Copy the remaining elements of L, if there are any
     */
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    /*
     * Copy the remaining elements of R, if there are any
     */
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }
  const Simple_Sorting_Algo = (n) => {
    //simple sorting algorithm
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }
    mergeSort([...array]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Merge Sorting Algorithm</h1>
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

export default MergeSortViz;

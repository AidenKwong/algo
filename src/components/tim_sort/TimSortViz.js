import React, { useState } from "react";

var MIN_MERGE = 32;

function minRunLength(n) {
  // Becomes 1 if any 1 bits are shifted off
  var r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
}

// This function sorts array from left index to
// to right index which is of size atmost RUN
function insertionSort(arr, left, right) {
  for (var i = left + 1; i <= right; i++) {
    var temp = arr[i];
    var j = i - 1;

    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

// Merge function merges the sorted runs
function merge(arr, l, m, r) {
  // Original array is broken in two parts
  // left and right array
  var len1 = m - l + 1,
    len2 = r - m;
  var left = new Array(len1);
  var right = new Array(len2);
  for (var x = 0; x < len1; x++) {
    left[x] = arr[l + x];
  }
  for (x = 0; x < len2; x++) {
    right[x] = arr[m + 1 + x];
  }

  var i = 0;
  var j = 0;
  var k = l;

  // After comparing, we merge those two
  // array in larger sub array
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements
  // of left, if any
  while (i < len1) {
    arr[k] = left[i];
    k++;
    i++;
  }

  // Copy remaining element
  // of right, if any
  while (j < len2) {
    arr[k] = right[j];
    k++;
    j++;
  }
}

// Iterative Timsort function to sort the
// array[0...n-1] (similar to merge sort)

const TimSortViz = () => {
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

  async function timSort(arr) {
    var n = arr.length;
    var minRun = minRunLength(MIN_MERGE);

    // Sort individual subarrays of size RUN
    for (var i = 0; i < n; i += minRun) {
      insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
      setOutput([...arr]);
      await timer(10);
    }

    // Start merging from size
    // RUN (or 32). It will
    // merge to form size 64,
    // then 128, 256 and so on
    // ....
    for (var size = minRun; size < n; size = 2 * size) {
      // Pick starting point
      // of left sub array. We
      // are going to merge
      // arr[left..left+size-1]
      // and arr[left+size, left+2*size-1]
      // After every merge, we
      // increase left by 2*size
      for (var left = 0; left < n; left += 2 * size) {
        // Find ending point of left sub array
        // mid+1 is starting point of right sub
        // array
        var mid = left + size - 1;
        var right = Math.min(left + 2 * size - 1, n - 1);

        // Merge sub array arr[left.....mid] &
        // arr[mid+1....right]
        if (mid < right) merge(arr, left, mid, right);
        setOutput([...arr]);
        await timer(10);
      }
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
    timSort(sortedArr);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tim Sorting Algorithm O(nlogn)</h1>
      <form onSubmit={handleRun}>
        <span style={{ fontSize: "1rem" }}>
          {"Please enter the length of array  "}
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

export default TimSortViz;

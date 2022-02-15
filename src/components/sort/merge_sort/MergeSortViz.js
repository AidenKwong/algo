import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = ` const merge = (arr, l, m, r)=> {
  var i, j, k;
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = Array(n1).fill(0);
  var R = Array(n2).fill(0);

  for (i = 0; i < n1; i++) L[i] = arr[l + i];
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

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

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

  const mergeSort = (array) => {
  var n = array.length;
  var curr_size;
  var left_start;

  for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      var mid = Math.min(left_start + curr_size - 1, n - 1);
      var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
      merge(array, left_start, mid, right_end);
    }
  }
  return array
};
`;

const MergeSortViz = () => {
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

  const mergeSort = async (arr) => {
    var n = arr.length;
    var curr_size;
    var left_start;

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
      for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
        var mid = Math.min(left_start + curr_size - 1, n - 1);

        var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

        setOutput([...arr]);
        await timer(10);
        merge(arr, left_start, mid, right_end);
      }
    }
    setOutput([...arr]);
    setRunning(false);
  };

  const merge = (arr, l, m, r) => {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    for (i = 0; i < n1; i++) L[i] = arr[l + i];
    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

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

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  };
  const Simple_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }
    mergeSort([...array]);
  };

  return (
    <SortVizMain
      title="Merge Sorting"
      instruction="Please enter the length of array "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={2000}
      code={code}
    />
  );
};

export default MergeSortViz;

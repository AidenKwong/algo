import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const timSort = (arr) => {
  var n = arr.length;
  var minRun = minRunLength(MIN_MERGE);

  for (var i = 0; i < n; i += minRun) {
    insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }

  for (var size = minRun; size < n; size = 2 * size) {
    for (var left = 0; left < n; left += 2 * size) {
      var mid = left + size - 1;
      var right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }
  return arr;
};`

var MIN_MERGE = 32;

const minRunLength = (n) => {
  var r = 0;
  while (n >= MIN_MERGE) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
};

const insertionSort = (arr, left, right) => {
  for (var i = left + 1; i <= right; i++) {
    var temp = arr[i];
    var j = i - 1;

    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
};

const merge = (arr, l, m, r) => {
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

  while (i < len1) {
    arr[k] = left[i];
    k++;
    i++;
  }

  while (j < len2) {
    arr[k] = right[j];
    k++;
    j++;
  }
};

const TimSortViz = () => {
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

  const timSort = async (arr) => {
    var n = arr.length;
    var minRun = minRunLength(MIN_MERGE);

    for (var i = 0; i < n; i += minRun) {
      insertionSort(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
      setOutput([...arr]);
      await timer(10);
    }

    for (var size = minRun; size < n; size = 2 * size) {
      for (var left = 0; left < n; left += 2 * size) {
        var mid = left + size - 1;
        var right = Math.min(left + 2 * size - 1, n - 1);

        if (mid < right) merge(arr, left, mid, right);
        setOutput([...arr]);
        await timer(10);
      }
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
    timSort(sortedArr);
  };

  return (
    <SortVizMain
      title="Tim Sorting Algorithm"
      instruction="Please enter the length of array  "
      output={output}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={5000}
      code={code}
    />
  );
};

export default TimSortViz;

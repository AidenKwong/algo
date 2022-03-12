import React, { useState } from "react";
import SortVizMain from "../SortVizMain";

const code = `const bubbleSort = (array) => {
	var swapped = true;
	do {
		swapped = false;
		for (var j = 0; j < array.length; j++) {
			if (array[j] > array[j + 1]) {
				var temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
	return array;
};
`;
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const BubbleSortViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState([]);
  const [checkingIdx, setCheckingIdx] = useState({ curr: null, check: null });

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    e.preventDefault();
    Bubble_Sorting_Algo(number);
  };

  const Bubble_Sorting_Algo = (n) => {
    setRunning(true);
    const array = [];
    for (var i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 1000));
    }

    const sortedArr = [...array];
    const send = async () => {
      var swapped = true;
      do {
        swapped = false;
        for (var i = n; i >= 0; i--) {
          if (sortedArr[i] > sortedArr[i + 1]) {
            setCheckingIdx({ curr: i, check: i + 1 });
            var temp = sortedArr[i];
            sortedArr[i] = sortedArr[i + 1];
            sortedArr[i + 1] = temp;
            swapped = true;
          }
          setOutput([...sortedArr]);
          await timer(1);
        }
      } while (swapped);
      setCheckingIdx({ curr: null, check: null });
      setRunning(false);
    };
    send();
    setOutput([...sortedArr]);
  };

  return (
    <SortVizMain
      title="Bubble Sort"
      instruction="Please enter the length of array "
      output={output}
      checkingIdx={checkingIdx}
      handleRun={handleRun}
      handleOnChange={handleOnChange}
      running={running}
      number={number}
      maxLength={200}
      code={code}
    />
  );
};

export default BubbleSortViz;

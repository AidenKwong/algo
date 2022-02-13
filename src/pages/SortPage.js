import React from "react";

import {
  BubbleSortViz,
  InsertionSortViz,
  MergeSortViz,
  QuickSortViz,
  SelectionSortViz,
  SimpleSortViz,
  TimSortViz,
  HeapSortViz,
} from "../components/sort";

const SortPage = () => {
  return (
    <>
      <SimpleSortViz />
      <SelectionSortViz />
      <BubbleSortViz />
      <InsertionSortViz />
      <MergeSortViz />
      <QuickSortViz />
      <HeapSortViz />
      <TimSortViz />
    </>
  );
};

export default SortPage;

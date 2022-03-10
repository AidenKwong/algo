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
    <div className="page">
      <h3 style={{ maxWidth: "960px", color: "gray" }}>
        This page is to show the changes during the running progress of
        algorithms. The visualisations are set to show the how the algorithms
        work and the time interval for the visual changes are set differently to
        have easy view. Therefore, the running time cannot be taken as reference
        for time complexity.
      </h3>
      <SimpleSortViz />
      <SelectionSortViz />
      <BubbleSortViz />
      <InsertionSortViz />
      <MergeSortViz />
      <QuickSortViz />
      <HeapSortViz />
      <TimSortViz />
    </div>
  );
};

export default SortPage;

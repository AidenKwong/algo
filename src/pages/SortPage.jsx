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
      <h1>Sort</h1>
      <p>
        A sorting algorithm is an algorithm that puts elements of a list into an
        order. The most frequently used orders are numerical order and
        lexicographical order, and either ascending or descending. Efficient
        sorting is important for optimizing the efficiency of other algorithms
        (such as search and merge algorithms) that require input data to be in
        sorted lists. Sorting is also often useful for canonicalizing data and
        for producing human-readable output.
      </p>
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

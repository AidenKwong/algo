import "./App.css";
import {
  BubbleSortViz,
  InsertionSortViz,
  MergeSortViz,
  QuickSortViz,
  SelectionSortViz,
  SimpleSortViz,
  TimSortViz,
  HeapSortViz,
} from "./components/sort";
import BSTViz from "./components/binary_tree/BSTViz";
function App() {
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Algorithm Visualizer</h1>
      </div>
      <BSTViz />
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
}

export default App;

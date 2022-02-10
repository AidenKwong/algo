import "./App.css";
import BubbleSortViz from "./components/bubble_sort/BubbleSortViz";
import InsertionSortViz from "./components/insertion_sort/InsertionSortViz";
import MergeSortViz from "./components/merge_sort/MergeSortViz";
import QuickSortViz from "./components/quick_sort/QuickSortViz";
import SelectionSortViz from "./components/selection_sort/SelectionSortViz";
import SimpleSortViz from "./components/simple_sort/SimpleSortViz";
import TimSortViz from "./components/tim_sort/TimSortViz";
import HeapSortViz from "./heap_sort/HeapSortViz";
function App() {
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Sorting Algorithm Visualizer</h1>
      </div>

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

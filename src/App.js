import "./App.css";
import BubbleSortViz from "./components/bubble_sort/BubbleSortViz";
import InsertionSortViz from "./components/insertion_sort/InsertionSortViz";
import MergeSortViz from "./components/merge_sort/MergeSortViz";
import SelectionSortViz from "./components/selection_sort/SelectionSortViz";
import SimpleSortViz from "./components/simple_sort/SimpleSortViz";
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
    </div>
  );
}

export default App;

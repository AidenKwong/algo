import "./App.css";
import BubbleSortViz from "./components/bubble_sort/BubbleSortViz";
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
    </div>
  );
}

export default App;

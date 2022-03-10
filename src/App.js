/** @jsxImportSource @emotion/react */
import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";
import SortPage from "./pages/SortPage";

import TreePage from "./pages/TreePage";
import GraphPage from "./pages/GraphPage";
import HomePage from "./pages/HomePage";
import LinkedListPage from "./pages/LinkedListPage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <h1 className="websiteName">⚡ Algorithm Visualizer</h1>
        </Link>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/linked-list" element={<LinkedListPage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/sort" element={<SortPage />} />
      </Routes>
    </div>
  );
};

export default App;

/** @jsxImportSource @emotion/react */
import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";

import {
  TreePage,
  GraphPage,
  HomePage,
  LinkedListPage,
  SortPage,
} from "./pages";

import Navbar from "./components/navbar/Navbar";
import FooterSection from "./pages/footer/FooterSection";

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
      <FooterSection />
    </div>
  );
};

export default App;

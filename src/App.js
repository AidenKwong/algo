/** @jsxImportSource @emotion/react */
import "./App.scss";
import BSTViz from "./components/binary_tree/BSTViz";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SortPage from "./pages/SortPage";
import { css } from "@emotion/react";

const App = () => {
  var location = useLocation();

  const homeNav = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${location.pathname === "/" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/" && "0.25em solid"};
    margin: 0.5rem;
    font-weight: 600;
    color: #81b29a;
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/" && "#ececec"};
      }
    }
  `;
  const sortNav = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: ${location.pathname === "/sort" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/sort" && "0.25em solid"};
    margin: 0.5rem;
    font-weight: 600;
    color: #81b29a;
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/sort" && "#ececec"};
      }
    }
  `;

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Algorithm Visualizer</h1>
        <div className="pageNav">
          <Link to="/" css={homeNav}>
            <span>BST</span>
          </Link>
          <Link to="/sort" css={sortNav}>
            <span>SORT</span>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<BSTViz />} />
        <Route path="/sort" element={<SortPage />} />
      </Routes>
    </div>
  );
};

export default App;

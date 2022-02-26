/** @jsxImportSource @emotion/react */
import "./App.scss";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SortPage from "./pages/SortPage";
import { css } from "@emotion/react";
import TreePage from "./pages/TreePage";
import GraphPage from "./pages/GraphPage";
import HomePage from "./pages/HomePage";

const App = () => {
  var location = useLocation();

  const nav = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    font-weight: 600;
    color: #81b29a;
  `;

  const treeNav = css`
    ${nav}
    border-top: ${location.pathname === "/tree" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/tree" && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/tree" && "#ececec"};
      }
    }
  `;

  const sortNav = css`
    ${nav}
    border-top: ${location.pathname === "/sort" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/sort" && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/sort" && "#ececec"};
      }
    }
  `;

  const GraphNav = css`
    ${nav}
    border-top: ${location.pathname === "/graph" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/graph" && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/graph" && "#ececec"};
      }
    }
  `;

  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <Link to="/">
          <h1 className="websiteName">Algorithm Visualizer</h1>
        </Link>

        <div className="pageNav">
          <Link to="/graph" css={GraphNav}>
            <span>GRAPH</span>
          </Link>
          <Link to="/tree" css={treeNav}>
            <span>BST</span>
          </Link>
          <Link to="/sort" css={sortNav}>
            <span>SORT</span>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/sort" element={<SortPage />} />
      </Routes>
    </div>
  );
};

export default App;

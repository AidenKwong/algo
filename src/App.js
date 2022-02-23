/** @jsxImportSource @emotion/react */
import "./App.scss";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SortPage from "./pages/SortPage";
import { css } from "@emotion/react";
import TreePage from "./pages/TreePage";
import GraphPage from "./pages/GraphPage";

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

  const homeNav = css`
    ${nav}
    border-top: ${location.pathname === "/" && "0.25em solid white"};
    border-bottom: ${location.pathname === "/" && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== "/" && "#ececec"};
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
        <h1>Algorithm Visualizer</h1>
        <div className="pageNav">
          <Link to="/graph" css={GraphNav}>
            <span>GRAPH</span>
          </Link>
          <Link to="/" css={homeNav}>
            <span>BST</span>
          </Link>
          <Link to="/sort" css={sortNav}>
            <span>SORT</span>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/graph" element={<GraphPage />} />
        <Route path="/" element={<TreePage />} />
        <Route path="/sort" element={<SortPage />} />
      </Routes>
    </div>
  );
};

export default App;

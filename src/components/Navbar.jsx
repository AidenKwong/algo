import React from "react";
import { css } from "@emotion/css";
import { Link, useLocation } from "react-router-dom";
import variables from "../styles/_variables.scss";

const Navbar = () => {
  var location = useLocation();

  const navItem = (path) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    font-weight: 600;
    color: ${variables.green};
    border-top: ${location.pathname === `${path}` && "0.25em solid white"};
    border-bottom: ${location.pathname === `${path}` && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== `${path}` && "#ececec"};
      }
    }
  `;

  return (
    <div style={{ textAlign: "center" }}>
      <div className="pageNav">
        <Link to="/linked-list" className={navItem("/linked-list")}>
          <span>LINKED LIST</span>
        </Link>
        <Link to="/graph" className={navItem("/graph")}>
          <span>GRAPH</span>
        </Link>
        <Link to="/tree" className={navItem("/tree")}>
          <span>BST</span>
        </Link>
        <Link to="/sort" className={navItem("/sort")}>
          <span>SORT</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

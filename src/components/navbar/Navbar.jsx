import React, { useState, useEffect } from "react";
import { css } from "@emotion/css";
import { Link, useLocation } from "react-router-dom";
import variables from "../../styles/_variables.scss";
import { IoMdMenu } from "react-icons/io";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const Navbar = () => {
  var location = useLocation();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [open, setOpen] = useState(false);
  const medianDevice = windowDimensions.width < 1024;
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItem = (path) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    font-weight: 600;
    color: ${variables.green};
    border-top: ${(location.pathname === `${path}`) & !medianDevice &&
    "0.25em solid white"};
    border-bottom: ${location.pathname === `${path}` && "0.25em solid"};
    span {
      padding: 0.5rem 1rem;
      &:hover {
        border-radius: 0.2em;
        background-color: ${location.pathname !== `${path}` && "#ececec"};
      }
    }
  `;

  const pageNav = css`
    transition: ${medianDevice && "transform 300ms ease"};
    display: flex;
    transform: ${medianDevice & !open ? "translateX(-100%)" : "translateX(0)"};
    opacity: ${medianDevice & !open ? "0" : "1"};
    justify-content: "center";
    flex-direction: ${medianDevice ? "column" : "row"};
    position: ${medianDevice ? "absolute" : "static"};
    left: ${medianDevice ? "0" : "auto"};
    top: ${medianDevice ? "4rem" : "auto"};
    background-color: ${medianDevice ? variables.lightBrown : "transparent"};
    outline: ${medianDevice ? `0.2em solid ${variables.blue}` : "none"};

    padding: ${medianDevice ? "1rem 0" : "0"};
    width: ${medianDevice ? "100vw" : "auto"};
    align-items: center;
    list-style: none;
    gap: 2rem;
    z-index: 10;
  `;

  const menuButton = css`
    display: ${!medianDevice ? "none" : "flex"};
    &:hover {
      cursor: pointer;
    }
  `;

  return (
    <div style={{ textAlign: "center" }}>
      <span className={menuButton} onClick={() => setOpen(!open)}>
        <IoMdMenu size={32} />
      </span>

      <div className={pageNav}>
        <Link
          to="/linked-list"
          className={navItem("/linked-list")}
          onClick={() => setOpen(false)}
        >
          <span>LINKED LIST</span>
        </Link>
        <Link
          to="/graph"
          className={navItem("/graph")}
          onClick={() => setOpen(false)}
        >
          <span>GRAPH</span>
        </Link>
        <Link
          to="/tree"
          className={navItem("/tree")}
          onClick={() => setOpen(false)}
        >
          <span>BST</span>
        </Link>
        <Link
          to="/sort"
          className={navItem("/sort")}
          onClick={() => setOpen(false)}
        >
          <span>SORT</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

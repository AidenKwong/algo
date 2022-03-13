import React, { useState, useEffect, useRef } from "react";
import { BinarySearchTree } from "./BST_structure";
import * as d3 from "d3";
import styles from "./BSTViz.module.scss";
import { saveSvgAsPng } from "save-svg-as-png";

const yOffSet = 36;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const BSTTemplate = () => {
  const BST = new BinarySearchTree();

  BST.insert(0);

  return BST;
};

const myLink = (d) => {
  return `M ${d.source.x} ${d.source.y + yOffSet} l ${
    d.target.x - d.source.x
  } ${d.target.y - d.source.y}`;
};

const BSTViz = () => {
  const [number, setNumber] = useState(0);
  const [output, setOutput] = useState(BSTTemplate);
  const [running, setRunning] = useState(false);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef();
  const svgRef = useRef();

  const handleRun = (e) => {
    e.preventDefault();
    runBuildTree(number);
  };

  const runBuildTree = async (n) => {
    setRunning(true);
    const BST = new BinarySearchTree();
    for (var i = 0; i < n; i++) {
      BST.insert(Math.ceil(Math.random() * 100));
      await timer(500);
      setOutput({ ...BST });
    }
    setRunning(false);
    setOutput({ ...BST });
  };

  useEffect(() => {
    const height = containerRef.current.clientHeight;
    const width = containerRef.current.clientWidth;

    setContainerWidth(width);

    const root = d3.hierarchy(output.root);
    const treeLayout = d3.tree().size([width, height]);

    const links = treeLayout(root).links();
    const svg = d3.select("#BSTViz");

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    svg.append("g").attr("id", "links");
    svg.append("g").attr("id", "nodes");
    svg
      .select("#links")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", myLink)
      .attr("fill", "none")
      .attr("stroke", (d) => (d.target.data.data ? "#3d405b" : "none"))
      .attr("stroke-width", ".2em");

    svg
      .select("#nodes")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("r", "1rem")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y + yOffSet)
      .attr("stroke", "#3d405b")
      .attr("stroke-width", "0.2em")
      .text((d) => d.data.data)
      .style("display", (d) =>
        d.data.data === 0 || d.data === 0 ? "none" : "block"
      )
      .attr("fill", "white");

    svg
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + yOffSet)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .text((d) => d.data.data)
      .style("display", (d) => (d.data.data === 0 ? "none" : "block"))
      .style("user-select", "none")
      .attr("fill", "#3d405b")
      .style("font-weight", "600");
  }, [output]);

  return (
    <div>
      <h1>Binary Search Tree</h1>
      <p>
        A binary search tree (BST), also called an ordered or sorted binary
        tree, is a rooted binary tree data structure whose internal nodes each
        store a key greater than all the keys in the node's left subtree and
        less than those in its right subtree. The time complexity of operations
        on the binary search tree is directly proportional to the height of the
        tree.
      </p>
      <form onSubmit={handleRun}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "1rem" }}>
            {
              "Please enter the number of nodes you want to insert in the Binary Search Tree "
            }
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              onChange={(e) => setNumber(e.target.value)}
              placeholder={
                containerWidth < 500 ? "between 3 and 30" : "between 3 and 100"
              }
              style={{ textAlign: "center" }}
            />
            <button
              disabled={
                (number > 100) |
                (number < 3) |
                running |
                ((containerWidth < 500) & (number > 30))
              }
            >
              {running ? <div className="BUILDING" /> : "BUILD"}
            </button>
          </div>
        </div>
      </form>
      <div
        ref={containerRef}
        className={styles.vizContainer}
        style={{
          flex: 1,
          height: 960,
        }}
      >
        <svg id="BSTViz" ref={svgRef} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span>{"Download current BST image:"}</span>
        <button
          disabled={running}
          onClick={() => saveSvgAsPng(svgRef.current, "BST.png")}
        >
          {running ? <div className="BUILDING" /> : "Download"}
        </button>
      </div>
    </div>
  );
};

export default BSTViz;

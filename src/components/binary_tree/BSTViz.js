import React, { useState, useEffect, useRef } from "react";
import { BinarySearchTree } from "./BST_structure";
import * as d3 from "d3";
import "./BSTViz.scss";

const yOffSet = 36;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const BSTTemplate = () => {
  const BST = new BinarySearchTree();
  for (var i = 0; i < 5; i++) {
    BST.insert(`example: ${Math.ceil(Math.random() * 10)}`);
  }
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
  const [downloadURL, setDownloadURL] = useState("#");
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

  const handleFork = () => {
    var svgData = svgRef.current.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    setDownloadURL(svgUrl);
    alert("BST.svg forked");
  };

  useEffect(() => {
    const height = containerRef.current.clientHeight;
    const width = containerRef.current.clientWidth;
    const root = d3.hierarchy(output.root);
    const treeLayout = d3.tree().size([width, height]);

    const links = treeLayout(root).links();
    const svg = d3.select("#BSTViz");

    svg.attr("width", width).style("height", height);

    svg
      .selectAll("path")
      .data(links)
      .join("path")
      .transition()
      .duration(50)
      .attr("d", myLink)
      .attr("fill", "none")
      .attr("stroke", (d) => (d.target.data.data ? "#3d405b" : "none"))
      .attr("stroke-width", ".1em");

    svg
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .transition()
      .duration(50)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + yOffSet)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.data)
      .style("display", (d) => (d.data.data === 0 ? "none" : "block"))
      .style("user-select", "none")
      .attr("fill", "#3d405b")
      .style("font-weight", "600");

    const svgEl = svgRef.current;
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }, [output]);

  return (
    <div>
      <h1>Binary Search Tree</h1>
      <form onSubmit={handleRun}>
        <p style={{ fontSize: "1rem" }}>
          {
            "Please enter the number of nodes you want to insert in the Binary Search Tree "
          }
        </p>
        <input
          onChange={(e) => setNumber(e.target.value)}
          placeholder="between 3 and 100"
          style={{ textAlign: "center" }}
        />
        <button disabled={(number > 100) | (number < 3) | running}>
          BUILD
        </button>
      </form>
      <div
        ref={containerRef}
        className="vizContainer"
        style={{
          height: 960,
        }}
      >
        <svg id="BSTViz" ref={svgRef} />
      </div>
      <span>{"Fork to save current BST image:"}</span>

      <button
        style={{ margin: "1rem" }}
        onClick={handleFork}
        disabled={running}
      >
        Fork
      </button>
      <a style={{ margin: "1rem" }} href={downloadURL} download="BST.svg">
        Click here to download
      </a>
    </div>
  );
};

export default BSTViz;

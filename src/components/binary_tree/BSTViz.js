import React, { useEffect } from "react";
import { BinarySearchTree } from "./BST_structure";
import * as d3 from "d3";

const height = 960;
const width = 960;

const BSTViz = () => {
  const BST = new BinarySearchTree();
  for (var i = 0; i < 10; i++) {
    BST.insert(Math.floor(Math.random() * 100));
  }
  const root = d3.hierarchy(BST.root);
  const treeLayout = d3.tree().size([width, height]);
  const links = treeLayout(root).links();

  const linkPathGen = d3
    .linkVertical()
    .x((d) => d.x)
    .y((d) => d.y);
  useEffect(() => {
    const svg = d3.select("#BSTViz");
    svg
      .attr("width", width)
      .style("height", height)
      .style("border", "1px solid black");

    svg
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", linkPathGen)
      .attr("fill", "none")
      .attr("stroke", "black");
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Binary Search Tree</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg id="BSTViz" />
      </div>
    </div>
  );
};

export default BSTViz;

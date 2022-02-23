import "./GraphViz.scss";
import React, { useState, useRef, useEffect } from "react";
import constructGraph from "./constructGraph";
import { saveSvgAsPng } from "save-svg-as-png";
import * as d3 from "d3";
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import constructAdjacencyList from "./traversal";

var myChart = echarts.extendComponentModel;
echarts.use([SVGRenderer, CanvasRenderer]);

const GraphViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [EChartOption, setEChartOption] = useState(null);
  const [BFSpath, setBFSpath] = useState([0, 0]);
  const [BFSqueue, setBFSqueue] = useState([]);
  const maxLength = 30;
  const graphRef = useRef();

  useEffect(() => {
    myChart = echarts.init(graphRef.current, null, {
      renderer: "svg",
    });
  }, []);

  useEffect(() => {
    if (EChartOption) {
      myChart.setOption({
        series: [
          {
            force: {
              layoutAnimation: false,
            },
            data: EChartOption.series[0].data,
            edges: EChartOption.series[0].edges,
          },
        ],
      });
    }
  }, [EChartOption]);

  const handleRun = (e) => {
    e.preventDefault();
    setRunning(true);
    constructGraph(myChart, number, setRunning, setEChartOption);
  };

  const handleTraversal = (e) => {
    e.preventDefault();
    setRunning(true);
    constructAdjacencyList(
      BFSpath[0] + "",
      BFSpath[1] + "",
      EChartOption.series[0].data,
      EChartOption.series[0].edges,
      setEChartOption,
      setBFSqueue,
      setRunning
    );
  };

  return (
    <div>
      <h1>Graph</h1>
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
            {`Enter the number of nodes you want to contruct the random graph ( < ${maxLength} )`}
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
              placeholder={`< ${maxLength}`}
              style={{ textAlign: "center" }}
            />
            <button disabled={running | (number > maxLength)}>
              {running ? <div className="RUNNING" /> : "BUILD"}
            </button>
          </div>
        </div>
      </form>
      <form onSubmit={handleTraversal}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "1rem" }}>{`Breadth First Search: `}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              onChange={(e) =>
                setBFSpath((prev) => {
                  prev[0] = e.target.value;
                  return [...prev];
                })
              }
              placeholder={`start`}
              style={{ textAlign: "center" }}
            />
            <input
              onChange={(e) =>
                setBFSpath((prev) => {
                  prev[1] = e.target.value;
                  return [...prev];
                })
              }
              placeholder={`target`}
              style={{ textAlign: "center" }}
            />
            <button disabled={running | (number > maxLength)}>
              {running ? <div className="RUNNING" /> : "SEARCH"}
            </button>
          </div>
        </div>
      </form>
      <div ref={graphRef} className="vizContainer">
        <div style={{ display: "flex", margin: "1em", gap: "1rem" }}>
          <p>queue:</p>
          {BFSqueue.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
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
          onClick={() =>
            saveSvgAsPng(
              d3.select(graphRef.current).select("svg").node(),
              "Graph.png"
            )
          }
        >
          {running ? <div className="BUILDING" /> : "Download"}
        </button>
      </div>
    </div>
  );
};

export default GraphViz;

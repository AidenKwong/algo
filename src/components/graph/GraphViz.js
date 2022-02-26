import styles from "./GraphViz.module.scss";
import React, { useState, useRef, useEffect } from "react";
import constructGraph from "./constructGraph";
import { saveSvgAsPng } from "save-svg-as-png";
import * as d3 from "d3";
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import BFS from "./BFS";
import { AiOutlineCaretRight } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";

var myChart = echarts.extendComponentModel;
echarts.use([SVGRenderer, CanvasRenderer]);

const GraphViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [EChartOption, setEChartOption] = useState(null);
  const [BFSpath, setBFSpath] = useState(["", ""]);
  const [BFSqueue, setBFSqueue] = useState([]);
  const [built, setBuilt] = useState(false);
  const maxLength = 30;
  const graphRef = useRef();

  useEffect(() => {
    myChart = echarts.init(graphRef.current, null, {
      renderer: "svg",
    });
    myChart.on("click", { dataType: "node" }, (params) => {
      for (var i = 0; i < BFSpath.length; i++) {
        if (BFSpath[i] === "") {
          setBFSpath((prev) => {
            prev[i] = +params.name;
            return [...prev];
          });
        }
      }
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

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleRun = (e) => {
    e.preventDefault();
    setRunning(true);
    constructGraph(myChart, number, setRunning, setEChartOption, setBuilt);
  };

  const handleTraversal = (e) => {
    e.preventDefault();
    setRunning(true);
    if (BFSpath)
      BFS(
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
      <div className={styles.header}>
        <h1>Graph</h1>
        <button className="secondaryBtn" onClick={refreshPage}>
          <MdOutlineRefresh />
          {`refresh`}
        </button>
      </div>

      <form onSubmit={handleRun}>
        <div className={styles.buildPrompt}>
          <p>
            {`Enter the number of nodes you want to contruct the random graph ( < ${maxLength} )`}
          </p>
          <div className={styles.inputButtonGroup}>
            <input
              onChange={(e) => setNumber(e.target.value)}
              placeholder={`< ${maxLength}`}
            />
            <button disabled={running | (number > maxLength)}>
              {running ? <div className="RUNNING" /> : "BUILD"}
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleTraversal}>
        <div className={styles.buildPrompt}>
          <p>{`Breadth First Search: ( if not set, default is 0 )`}</p>
          <div className={styles.inputButtonGroup}>
            <input
              onChange={(e) =>
                setBFSpath((prev) => {
                  prev[0] = e.target.value;
                  return [...prev];
                })
              }
              placeholder={`start`}
              value={BFSpath[0]}
            />
            <input
              onChange={(e) =>
                setBFSpath((prev) => {
                  prev[1] = e.target.value;
                  return [...prev];
                })
              }
              placeholder={`target`}
              value={BFSpath[1]}
            />
            <button
              disabled={
                running | (number > maxLength) | !built | (BFSpath === ["", ""])
              }
            >
              {running ? <div className="RUNNING" /> : "SEARCH"}
            </button>
          </div>
        </div>
      </form>

      <div className={styles.vizContainer}>
        <div className={styles.vizDescription}>
          <span className={styles.queue}>
            <p>queue</p>
            <AiOutlineCaretRight style={{ margin: "auto 0" }} />
            {BFSqueue.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </span>
          <p className={styles.prompt}>
            {BFSpath[0] === ""
              ? `please select start node`
              : BFSpath[1] === "" || BFSpath[0] === BFSpath[1]
              ? `please select target node`
              : BFSpath[0] !== BFSpath[1] && "please click search button"}
          </p>
        </div>
        <div ref={graphRef} className={styles.render} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span>{"Download current graph image:"}</span>
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

import React, { useState, useEffect, useRef } from "react";
import LinkedList from "./linked_list";
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import styles from "./LinkedListViz.module.scss";
import { saveSvgAsPng } from "save-svg-as-png";
import * as d3 from "d3";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

var myChart = echarts.extendComponentModel;
echarts.use([SVGRenderer, CanvasRenderer]);
const maxLength = 10;

const LinkedListViz = () => {
  const graphRef = useRef();
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const [list, setList] = useState(new LinkedList(0));
  const [output, setOutput] = useState([]);
  const [outputLink, setOutputLink] = useState([]);
  const [constructed, setConstructed] = useState(false);

  useEffect(() => {
    myChart = echarts.init(graphRef.current, null, {
      renderer: "svg",
    });
  }, []);

  useEffect(() => {
    myChart.setOption({
      series: [
        {
          type: "graph",
          layout: "none",
          symbolSize: 40,
          silent: true,
          symbol: "rect",
          lineStyle: {
            color: "#3d405b",
            width: 4,
            opacity: 0.75,
            zLevel: 2,
          },
          itemStyle: {
            borderColor: "#3d405b",
            borderWidth: 3,
            color: "white",
          },
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 600,
            // offset: [-5, 0],
          },
          edgeSymbol: ["none", "arrow"],
          data: [],
          // links: [],
          links: [],
        },
      ],
    });
  }, []);

  const handleRun = (e) => {
    e.preventDefault();
    setRunning(true);
    setList(new LinkedList(0));
    if (constructed) {
      setOutput([]);
      setOutputLink([]);
      setRunning(false);
      return setConstructed(false);
    }

    var tempList = list;
    const iterate = async () => {
      for (let i = 0; i < number; i++) {
        let random = Math.ceil(Math.random() * 10);
        tempList.add(random);
        await timer(1000);
        setList(tempList);
        setOutput((prevState) => {
          prevState.push({
            id: i,
            name: `${random}`,
            x: i * 30,
            y: 50,
          });
          return prevState;
        });

        if (output.length > 1)
          setOutputLink((prevState) => {
            prevState.push({
              source: output[i - 1]?.id,
              target: output[i]?.id,
            });
            return prevState;
          });

        myChart.setOption({ series: [{ data: output, links: outputLink }] });
      }
      setRunning(false);
      setConstructed(true);
    };
    iterate();
  };

  return (
    <div>
      <h3>In Progress...</h3>
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
      <div className={styles.vizContainer} ref={graphRef} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span>{"Download current linked list image:"}</span>
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

export default LinkedListViz;

import React, { useRef } from "react";
import "./SortVizMain.scss";
import PrismCode from "./PrismCode";
import variables from "../../styles/_variables.scss";
import { saveSvgAsPng } from "save-svg-as-png";
import * as d3 from "d3";
const SortVizMain = ({
  title,
  instruction,
  output,
  handleRun,
  handleOnChange,
  running,
  number,
  maxLength,
  code,
}) => {
  const vizRef = useRef();
  const vizWidth = vizRef.current?.clientWidth - 8;
  const vizHeight = vizRef.current?.clientHeight - 8;
  const containerObserver = new ResizeObserver((entries) => {});

  vizRef.current && containerObserver.observe(vizRef.current);

  return (
    <div className="vizMain">
      <h1>{title}</h1>
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
            {instruction + ` ( < ${maxLength} )`}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              onChange={handleOnChange}
              placeholder={`< ${maxLength}`}
              style={{ textAlign: "center" }}
            />
            <button disabled={running | (number > maxLength)}>
              {running ? <div className="SORTING" /> : "SORT"}
            </button>
          </div>
        </div>
      </form>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div className="vizContainer" ref={vizRef}>
          <svg
            width={vizWidth ? vizWidth : 100}
            height={vizHeight ? vizHeight : 100}
          >
            {output.map((num, i) => (
              <rect
                key={i}
                x={(i * vizWidth) / output.length}
                y={vizHeight - (num * vizHeight) / Math.max(...output)}
                width={
                  output.length > 480
                    ? vizWidth / output.length + 1
                    : vizWidth / output.length - 1
                }
                height={(num / Math.max(...output)) * vizHeight}
                fill={variables.blue}
              />
            ))}
          </svg>
        </div>
        <div className="vizCodeMain">
          <h3>JS</h3>
          <PrismCode
            style={{ overflow: "scroll" }}
            code={code}
            language={"javascript"}
          />
        </div>
      </div>
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
              d3.select(vizRef.current).select("svg").node(),
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

export default SortVizMain;

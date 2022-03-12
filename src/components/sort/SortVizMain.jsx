import React, { useRef } from "react";
import styles from "./SortVizMain.module.scss";
import PrismCode from "./PrismCode";
import variables from "../../styles/_variables.scss";
import { saveSvgAsPng } from "save-svg-as-png";
import * as d3 from "d3";
const SortVizMain = ({
  title,
  instruction,
  output,
  checkingIdx,
  handleRun,
  handleOnChange,
  running,
  number,
  maxLength,
  code,
  MIN_MERGE,
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
        <div className={styles.legends}>
          {checkingIdx && (
            <>
              <span>{`Index:`}</span>
              <svg width={20} height={16}>
                <rect x={4} width={16} height={16} fill={"white"} />
              </svg>
              <span> {`curr: ${checkingIdx?.curr}`}</span>
              <svg width={20} height={16}>
                <rect x={4} width={16} height={16} fill={"red"} />
              </svg>
              <span> {`swap: ${checkingIdx?.check}`}</span>
            </>
          )}

          {MIN_MERGE ? `MIN_MERGE: ${MIN_MERGE}` : null}
        </div>
        <div className={styles.vizContainer} ref={vizRef}>
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
                fill={
                  checkingIdx?.curr === i
                    ? "white"
                    : checkingIdx?.check === i
                    ? "red"
                    : variables.blue
                }
              />
            ))}
          </svg>
        </div>
        <div className={styles.vizCodeMain}>
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

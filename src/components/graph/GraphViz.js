import "./GraphViz.scss";
import React, { useState, useEffect, useRef } from "react";
import constructGraph from "./constructGraph";

const GraphViz = () => {
  const [number, setNumber] = useState(0);
  const [running, setRunning] = useState(false);
  const maxLength = 30;
  const graphRef = useRef(null);

  const handleRun = (e) => {
    e.preventDefault();
    setRunning(true);
    constructGraph(graphRef.current, number, setRunning);
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
          }}
        >
          <p style={{ fontSize: "1rem" }}>
            {`Enter the number of nodes you want to contruct the random graph ( < ${maxLength} )`}
          </p>
          <input
            onChange={(e) => setNumber(e.target.value)}
            placeholder={`< ${maxLength}`}
            style={{ textAlign: "center" }}
          />
          <button disabled={running | (number > maxLength)}>
            {running ? <div className="BUILDING" /> : "BUILD"}
          </button>
        </div>
      </form>
      <div ref={graphRef} className="vizContainer" />
    </div>
  );
};

export default GraphViz;

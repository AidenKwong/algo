import React from "react";
import "./SortVizMain.scss";
import PrismCode from "./PrismCode";
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
  return (
    <div className="vizMain">
      <h1>{title}</h1>
      <form onSubmit={handleRun}>
        <span style={{ fontSize: "1rem" }}>
          {instruction + ` ( < ${maxLength} )`}
        </span>
        <input
          onChange={handleOnChange}
          placeholder={`< ${maxLength}`}
          style={{ textAlign: "center" }}
        />
        <div>
          <button
            style={{ margin: "1rem 0" }}
            disabled={running | (number > maxLength)}
          >
            RUN
          </button>
        </div>
      </form>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div className="vizContainer">
          {output.map((num, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#3d405b",
                marginLeft: `${output.length <= 400 ? "1px" : "none"}`,
                width: `${(1 / output.length) * 100}%`,
                height: `${(num / Math.max(...output)) * 100}%`,
              }}
            />
          ))}
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
    </div>
  );
};

export default SortVizMain;

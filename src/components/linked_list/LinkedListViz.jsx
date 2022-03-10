import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import LinkedList from "./linked_list";

const LinkedListViz = () => {
  const graphRef = useRef();
  const [list, setList] = useState(new LinkedList(0));

  useEffect(() => {
    var myChart = echarts.init(graphRef.current, null, {
      renderer: "svg",
    });
    var tempList = list;
    for (let i = 0; i < 10; i++) {
      tempList.add(Math.ceil(Math.random() * 100));
    }

    setList(tempList);
  }, [list]);
  return (
    <>
      <h3>In Progress...</h3>
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <div ref={graphRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
};

export default LinkedListViz;

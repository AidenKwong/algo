import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";

const GraphPage = () => {
  const graphRef = useRef(null);
  echarts.use([SVGRenderer, CanvasRenderer]);

  useEffect(() => {
    var myChart = echarts.init(graphRef.current, null, { renderer: "svg" });

    const data = [
      {
        fixed: false,
        x: myChart.getWidth() / 2,
        y: myChart.getHeight() / 2,
        symbolSize: 32,
        name: "-1",
      },
    ];

    const edges = [];
    const option = {
      series: [
        {
          type: "graph",
          layout: "force",
          silent: true,
          emphasis: {
            disabled: true,
          },
          lineStyle: {
            color: "#3d405b",
            width: 3,
            opacity: 1,
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
          },
          animation: false,
          data: data,
          force: {
            // initLayout: 'circular'
            // gravity: 0
            repulsion: 500,
            edgeLength: 32,
          },
          edges: edges,
        },
      ],
    };

    const myInterval = setInterval(function () {
      data.push({
        name: data.length + "",
        symbolSize: 32,
      });
      var source = Math.floor((data.length - 1) * Math.random());
      var target = Math.floor((data.length - 1) * Math.random());
      if (source !== target) {
        edges.push({
          source: source,
          target: target,
        });
      }
      myChart.setOption({
        series: [
          {
            data: data,
            edges: edges,
          },
        ],
      });
      // console.log("nodes: " + data.length);
      // console.log("links: " + data.length);
      if (data.length > 20) clearInterval(myInterval);
    }, 100);

    option && myChart.setOption(option);
  }, []);

  return (
    <div
      ref={graphRef}
      style={{ width: "100%", height: "960px", backgroundColor: "#81b29a" }}
    />
  );
};

export default GraphPage;

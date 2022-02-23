import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";

const constructGraph = (domEl, n, setRunning) => {
  echarts.use([SVGRenderer, CanvasRenderer]);
  var myChart = echarts.init(domEl, null, { renderer: "svg" });

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
          initLayout: "circular",
          repulsion: 300,
          edgeLength: 64,
          friction: 0.3,
        },
        edges: edges,
      },
    ],
  };

  const myInterval = setInterval(() => {
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
    if (data.length > n) {
      clearInterval(myInterval);
      setRunning(false);
    }
  }, 500);

  option && myChart.setOption(option);
};

export default constructGraph;

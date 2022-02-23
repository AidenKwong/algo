const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const constructAdjacencyList = (
  start,
  target,
  nodes,
  edges,
  setEChartOption,
  setBFSqueue,
  setRunning
) => {
  const mutateNodes = [...nodes];
  // const mutateEdges = [...edges];

  const updateOption = () => {
    setEChartOption((prevOption) => {
      prevOption.series[0].data = mutateNodes;
      return { ...prevOption };
    });
  };

  const nodeArr = nodes.map((node) => node.name + "");
  const edgeArr = edges.map((edge) => [edge.source + "", edge.target + ""]);

  const AdjLst = new Map();

  const addNode = (node) => {
    AdjLst.set(node, []);
  };

  const addEdge = (source, target) => {
    AdjLst.get(source).push(target);
    AdjLst.get(target).push(source);
  };

  nodeArr.forEach(addNode);
  edgeArr.forEach((edge) => addEdge(...edge));

  const bfs = async (start, target) => {
    const visited = new Set();
    const queue = [start];
    while (queue.length > 0) {
      mutateNodes[start].itemStyle = {
        color: "gray",
      };
      setBFSqueue([...queue]);
      updateOption();
      await timer(750);
      const node = queue.shift();
      for (var i = 0; i < nodes.length; i++) {
        if (node === nodes[i].name) {
          mutateNodes[i].symbolSize = 48;
          setBFSqueue([...queue]);
          updateOption();
          await timer(300);
          mutateNodes[i].symbolSize = 32;
          updateOption();
        }
      }
      const neighbours = AdjLst.get(node);

      for (const neighbour of neighbours) {
        await timer(750);
        for (i = 0; i < nodes.length; i++) {
          if (neighbour === nodes[i].name) {
            mutateNodes[i].symbolSize = 48;
            setBFSqueue([...queue]);
            updateOption();
            await timer(300);
            mutateNodes[i].symbolSize = 32;
            updateOption();
          }
        }

        if (neighbour === target) {
          mutateNodes[target].itemStyle = {
            color: "green",
          };
          setBFSqueue([...queue]);
          updateOption();
          return setRunning(false);
        }

        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          queue.push(neighbour);

          for (i = 0; i < nodes.length; i++) {
            if (neighbour === nodes[i].name) {
              mutateNodes[i].itemStyle = {
                color: "orange",
              };
              setBFSqueue([...queue]);
              updateOption();
            }
          }
        }
      }
    }
  };
  bfs(start, target);

  return AdjLst;
};

export default constructAdjacencyList;

<template>
    <div class="chart-box">
        <!-- <div>{{ name }}</div> -->
        <div id="progress" style="flex: 1"></div>
    </div>
</template>

<script>
import ProcessNode from "./ProcessNode.vue";
import { Graph, Node, Path, Cell } from "@antv/x6";
import "@antv/x6-vue-shape";
export default {
    name: "Process",
    data() {
        return {
            curData: {},
            list: [
                {
                    id: "1",
                    shape: "process-node",
                    x: 290,
                    y: 110,
                    data: {
                        label: "读数据",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "1-1",
                            group: "out",
                            args: {
                                dx: 90,
                                dy: 36,
                            },
                        },
                    ],
                    // component: "process-node",
                },
                {
                    id: "2",
                    shape: "process-node",
                    x: 290,
                    y: 225,
                    data: {
                        label: "逻辑回归",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "2-1",
                            group: "in",
                            args: {
                                dx: 90,
                            },
                        },
                        {
                            id: "2-2",
                            group: "out",
                            args: {
                                dx: 60,
                                dy: 36,
                            },
                        },
                        {
                            id: "2-3",
                            group: "out",
                            args: {
                                dx: 120,
                                dy: 36,
                            },
                        },
                    ],
                    // component: "process-node",
                },
                {
                    id: "3",
                    shape: "process-node",
                    x: 170,
                    y: 350,
                    data: {
                        label: "模型预测",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "3-1",
                            group: "in",
                            args: {
                                dx: 90,
                            },
                        },
                        {
                            id: "3-2",
                            group: "out",
                            args: {
                                dx: 90,
                            },
                        },
                    ],
                    // component: "process-node",
                },
                {
                    id: "4",
                    shape: "process-node",
                    x: 450,
                    y: 350,
                    data: {
                        label: "读取参数",
                        status: "success",
                    },
                    ports: [
                        {
                            id: "4-1",
                            group: "in",
                            args: {
                                dx: 90,
                            },
                        },
                        {
                            id: "4-2",
                            group: "out",
                            args: {
                                dx: 90,
                            },
                        },
                    ],
                    // component: "process-node",
                },
                {
                    id: "5",
                    shape: "dag-edge",
                    source: {
                        cell: "1",
                        port: "1-1",
                    },
                    target: {
                        cell: "2",
                        port: "2-1",
                    },
                    zIndex: 0,
                },
                {
                    id: "6",
                    shape: "dag-edge",
                    source: {
                        cell: "2",
                        port: "2-2",
                    },
                    target: {
                        cell: "3",
                        port: "3-1",
                    },
                    zIndex: 0,
                },
                {
                    id: "7",
                    shape: "dag-edge",
                    source: {
                        cell: "2",
                        port: "2-3",
                    },
                    target: {
                        cell: "4",
                        port: "4-1",
                    },
                    zIndex: 0,
                },
            ],
            nodeStatusList: [
                [
                    {
                        id: "1",
                        status: "running",
                    },
                    {
                        id: "2",
                        status: "default",
                    },
                    {
                        id: "3",
                        status: "default",
                    },
                    {
                        id: "4",
                        status: "default",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "running",
                    },
                    {
                        id: "3",
                        status: "default",
                    },
                    {
                        id: "4",
                        status: "default",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "success",
                    },
                    {
                        id: "3",
                        status: "running",
                    },
                    {
                        id: "4",
                        status: "running",
                    },
                ],
                [
                    {
                        id: "1",
                        status: "success",
                    },
                    {
                        id: "2",
                        status: "success",
                    },
                    {
                        id: "3",
                        status: "success",
                    },
                    {
                        id: "4",
                        status: "failed",
                    },
                ],
            ],
        };
    },
    computed: {
        name() {
            return this.curData.obj?.name || "xxx";
        },
    },
    created() {
        this.registerNewNode();
    },
    mounted() {
        this.initGraph();
    },
    methods: {
        registerNewNode() {
            Graph.registerNode("process-node", {
                inherit: "vue-shape",
                component: {
                    template: `<process-node></process-node>`,
                    components: {
                        ProcessNode,
                    },
                },
                ports: {
                    groups: {
                        in: {
                            position: "top",
                            // position: {
                            //     name: "top",
                            //     args: {
                            //         // dx: 2,
                            //     },
                            // },
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: "#C2C8D5",
                                    strokeWidth: 1,
                                    fill: "#fff",
                                },
                            },
                        },
                        out: {
                            position: "bottom",
                            attrs: {
                                circle: {
                                    r: 4,
                                    magnet: true,
                                    stroke: "#C2C8D5",
                                    strokeWidth: 1,
                                    fill: "#fff",
                                },
                            },
                        },
                    },
                },
            });
        },
        initGraph() {
            // 线
            Graph.registerEdge(
                "dag-edge",
                {
                    inherit: "edge",
                    attrs: {
                        line: {
                            stroke: "#C2C8D5",
                            strokeWidth: 1,
                            targetMarker: null,
                        },
                    },
                },
                true
            );

            Graph.registerConnector(
                "algo-connector",
                (s, e) => {
                    const offset = 4;
                    const deltaY = Math.abs(e.y - s.y);
                    const control = Math.floor((deltaY / 3) * 2);

                    const v1 = { x: s.x, y: s.y + offset + control };
                    const v2 = { x: e.x, y: e.y - offset - control };

                    return Path.normalize(
                        `M ${s.x} ${s.y}
						L ${s.x} ${s.y + offset}
						C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
						L ${e.x} ${e.y}
						`
                    );
                },
                true
            );

            const graph = new Graph({
                container: document.getElementById("progress"),
                // autoResize: true,
                height: 600,
                panning: {
                    enabled: true,
                    eventTypes: ["leftMouseDown", "mouseWheel"],
                },
                mousewheel: {
                    enabled: true,
                    modifiers: "ctrl",
                    factor: 1.1,
                    maxScale: 1.5,
                    minScale: 0.5,
                },
                highlighting: {
                    magnetAdsorbed: {
                        name: "stroke",
                        args: {
                            attrs: {
                                fill: "#fff",
                                stroke: "#31d0c6",
                                strokeWidth: 4,
                            },
                        },
                    },
                },
                connecting: {
                    snap: true,
                    allowBlank: false,
                    allowLoop: false,
                    highlight: true,
                    connector: "algo-connector",
                    connectionPoint: "anchor",
                    anchor: "center",
                    validateMagnet({ magnet }) {
                        return magnet.getAttribute("port-group") !== "top";
                    },
                    createEdge() {
                        return graph.createEdge({
                            shape: "dag-edge",
                            attrs: {
                                line: {
                                    strokeDasharray: "5 5",
                                },
                            },
                            zIndex: -1,
                        });
                    },
                },
                selecting: {
                    enabled: true,
                    multiple: true,
                    rubberEdge: true,
                    rubberNode: true,
                    modifiers: "shift",
                    rubberband: true,
                },
            });

            graph.on("edge:connected", ({ edge }) => {
                edge.attr({
                    line: {
                        strokeDasharray: "",
                    },
                });
            });

            graph.on("node:change:data", ({ node }) => {
                const edges = graph.getIncomingEdges(node);
                const { status } = node.getData();
                edges?.forEach((edge) => {
                    if (status === "running") {
                        edge.attr("line/strokeDasharray", 5);
                        edge.attr(
                            "line/style/animation",
                            "running-line 30s infinite linear"
                        );
                    } else {
                        edge.attr("line/strokeDasharray", "");
                        edge.attr("line/style/animation", "");
                    }
                });
            });

            // 初始化节点/边
            const init = (data) => {
                const cells = [];
                data.forEach((item) => {
                    if (item.shape === "process-node") {
                        // console.log(item);
                        cells.push(graph.createNode(item));
                    } else {
                        cells.push(graph.createEdge(item));
                    }
                });
                graph.resetCells(cells);
            };

            // 显示节点状态
            const showNodeStatus = async (statusList) => {
                const status = statusList.shift();
                status?.forEach((item) => {
                    const { id, status } = item;
                    const node = graph.getCellById(id);
                    const data = node.getData();
                    node.setData({
                        ...data,
                        status: status,
                    });
                });
                setTimeout(() => {
                    showNodeStatus(statusList);
                }, 3000);
            };

            init(this.list);
            showNodeStatus(this.nodeStatusList);
            graph.centerContent();
        },
        registerVueNode() {
            // 节点
            Graph.registerVueComponent(
                "process-node",
                {
                    template: `<process-node></process-node>`,
                    components: {
                        ProcessNode,
                    },
                    ports: {
                        groups: {
                            top: {
                                position: "top",
                                attrs: {
                                    circle: {
                                        r: 4,
                                        magnet: true,
                                        stroke: "#C2C8D5",
                                        strokeWidth: 2,
                                        fill: "#fff",
                                    },
                                },
                            },
                            bottom: {
                                position: "bottom",
                                attrs: {
                                    circle: {
                                        r: 4,
                                        magnet: true,
                                        stroke: "#C2C8D5",
                                        strokeWidth: 1,
                                        fill: "#fff",
                                    },
                                },
                            },
                        },
                    },
                },
                true
            );
        },
    },
};
</script>

<style>
.node {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-left: 4px solid #5f95ff;
    border-radius: 4px;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
    font-size: 16px;
}
.node img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 8px;
}
.node .label {
    display: inline-block;
    flex-shrink: 0;
    width: 104px;
    margin-left: 8px;
    color: #666;
    font-size: 12px;
}
.node .status {
    flex-shrink: 0;
}
.node.success {
    border-left: 4px solid #52c41a;
}
.node.failed {
    border-left: 4px solid #ff4d4f;
}
.node.running .status img {
    animation: spin 1s linear infinite;
}
.x6-node-selected .node {
    border-color: #1890ff;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node.success {
    border-color: #52c41a;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node.failed {
    border-color: #ff4d4f;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #fedcdc;
}
.x6-edge:hover path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2) {
    stroke: #1890ff;
    stroke-width: 1.5px !important;
}

@keyframes running-line {
    to {
        stroke-dashoffset: -1000;
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

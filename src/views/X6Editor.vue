<template>
  <div class="wrap">
    <section class="node-box" ref="stencilContainer">
      <ul class="node-list" @mousedown="startDrag">
        <li class="node-item" v-for="item in nodeList" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </section>
    <section class="graph-box" ref="graphContainer"></section>
    <section class="detail-box">{{ currentSelect }}</section>
  </div>
</template>

<script>
import { Graph, Shape, Addon, Dom } from "@antv/x6";

const { Rect, Circle } = Shape;
const { Dnd, Stencil } = Addon;

// 连接桩
const portCircle = {
  r: 4,
  magnet: true,
  stroke: "#5F95FF",
  strokeWidth: 1,
  fill: "#fff",
  style: {
    visibility: "hidden",
  },
};
const ports = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: portCircle,
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: portCircle,
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: portCircle,
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: portCircle,
      },
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
};

export default {
  data() {
    return {
      nodeList: [
        {
          id: 1,
          name: "feature_binning",
        },
        {
          id: 2,
          name: "feature_02",
        },
        {
          id: 3,
          name: "feature_03",
        },
      ],
      graph: {},
      dnd: {},
      stencil: {},
      currentSelect: "",
    };
  },
  mounted() {
    // this.initNode();
    this.initGraph();
    this.initPorts();
  },
  methods: {
    initNode() {
      Graph.registerNode(
        "custom-polygon",
        {
          inherit: "polygon",
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
            },
            text: {
              fontSize: 12,
              fill: "#262626",
            },
          },
          ports: {
            ...ports,
            items: [
              {
                group: "top",
              },
              {
                group: "bottom",
              },
            ],
          },
        },
        true
      );
    },
    initStencil() {
      this.stencil = new Stencil({
        title: "节点列表",
        target: this.graph,
        search: false,
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        // groups: [
        //   {
        //     name: "group1",
        //     title: "Group(Collapsable)",
        //   },
        //   {
        //     name: "group2",
        //     title: "Group",
        //     // collapsable: false,
        //   },
        // ],
      });

      this.$refs.stencilContainer.appendChild(this.stencil.container);

      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
          text: { text: "rect", fill: "white" },
        },
      });

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
          text: { text: "ellipse", fill: "white" },
        },
      });

      // this.stencil.load([r, c, c2, r2.clone()], "group1");
      // this.stencil.load([c2.clone(), r2, r3, c3], "group2");

      this.stencil.load([r, c]);
    },
    initPorts() {
      // ports = ;
    },
    initDnd() {
      this.dnd = new Dnd({
        target: this.graph,
        scaled: false,
        animation: true,
        validateNode(droppingNode, options) {
          return droppingNode.shape === "html"
            ? new Promise((resolve) => {
                const { draggingNode, draggingGraph } = options;
                const view = draggingGraph.findView(draggingNode);
                const contentElem = view.findOne("foreignObject > body > div");
                Dom.addClass(contentElem, "validating");
                setTimeout(() => {
                  Dom.removeClass(contentElem, "validating");
                  resolve(true);
                }, 3000);
              })
            : true;
        },
      });
    },
    startDrag(e) {
      e = e || window.event;
      let target = e.target || e.srcElement;
      if (target.nodeName.toLowerCase() !== "li") {
        return;
      }
      const node = this.graph.createNode({
        width: 130,
        height: 50,
        attrs: {
          label: {
            text: target.innerText,
            fill: "#3E66FF",
          },
          body: {
            stroke: "#3E66FF",
            strokeWidth: 1,
            rx: 4,
            ry: 4,
          },
        },
        ports: {
          ...ports,
          items: [
            {
              group: "top",
            },
            {
              group: "bottom",
            },
          ],
        },
      });
      // console.log(node);
      this.dnd.start(node, e);
    },
    initGraph() {
      this.graph = new Graph({
        container: this.$refs.graphContainer,
        width: 1387,
        height: 800,
        grid: true,
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: "ctrl",
          minScale: 0.5,
          maxScale: 3,
        },
        connecting: {
          router: {
            name: "manhattan",
            args: {
              padding: 1,
            },
          },
          connector: {
            name: "rounded",
            args: {
              radius: 8,
            },
          },
          anchor: "center",
          connectionPoint: "anchor",
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: "#A2B1C3",
                  strokeWidth: 2,
                  targetMarker: {
                    name: "classic",
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            });
          },
          validateConnection({ targetMagnet }) {
            return !!targetMagnet;
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: "stroke",
            args: {
              attrs: {
                fill: "#5F95FF",
                stroke: "#5F95FF",
              },
            },
          },
        },
        history: true,
        resizing: false,
        rotating: false,
        selecting: {
          enabled: true,
          rubberband: false, // 启用框选
          showNodeSelectionBox: true,
        },
        snapline: true,
        // scroller: {
        //   enabled: true,
        //   pageVisible: false,
        //   pageBreak: false,
        //   pannable: true,
        // },
        keyboard: true,
        clipboard: true,
      });

      this.initDnd();
      this.initEvent();
    },
    initEvent() {
      let { graph } = this;
      graph.on("node:selected", ({ cell, node, options }) => {
        this.currentSelect = JSON.stringify(node);
      });

      graph.on("node:unselected", ({ cell, node, options }) => {
        this.currentSelect = "";
      });

      graph.bindKey(["meta+x", "ctrl+x"], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.cut(cells);
        }
        return false;
      });

      //undo redo
      graph.bindKey(["meta+z", "ctrl+z"], () => {
        if (graph.history.canUndo()) {
          graph.history.undo();
        }
        return false;
      });
      graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
        if (graph.history.canRedo()) {
          graph.history.redo();
        }
        return false;
      });

      //delete
      graph.bindKey("backspace", () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
          graph.removeCells(cells);
        }
      });

      // 连接桩显示/隐藏
      graph.on("node:mouseenter", () => {
        const container = this.$refs.graphContainer;
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, true);
      });
      graph.on("node:mouseleave", () => {
        const container = this.$refs.graphContainer;
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, false);
      });
    },
    // 控制连接桩显示/隐藏
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 800px;
  display: flex;
  color: #333;
}

.wrap .node-box {
  position: relative;
  width: 200px;
}
.node-list {
  height: 800px;
  overflow: auto;
  list-style: none;
}
.node-list .node-item {
  width: 130px;
  height: 50px;
  line-height: 50px;
  background: #f8f8f8;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: move;
}
.validating {
  position: relative;
}
.validating:after {
  position: absolute;
  top: 4px;
  left: 4px;
  content: " ";
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 6px solid #873bf4;
  border-color: #873bf4 transparent #873bf4 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.wrap .graph-box {
  flex: 1;
  /* background: #ccc; */
}
.wrap /deep/ .x6-graph-scroller {
  border: 1px solid rgba(151, 151, 151, 0.4);
}

.wrap .detail-box {
  width: 300px;
  word-wrap: break-word;
  /* background: #ddd; */
}
</style>

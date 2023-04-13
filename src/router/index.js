import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/x6editor"
  },
  {
    path: "/drag",
    name: "Drag",
    component: () => import("../views/Drag.vue")
  },
  {
    path: "/dag",
    name: "Dag",
    component: () => import("../views/DAG.vue")
  },
  {
    path: "/flow",
    name: "Flow",
    component: () => import("../views/Flow.vue")
  },
  {
    path: "/g6editor",
    name: "G6Editor",
    component: () => import("../views/G6Editor.vue")
  },
  {
    path: "/x6editor",
    name: "X6Editor",
    component: () => import("../views/X6Editor.vue")
  },
  {
    path: "/codehljs",
    name: "Code",
    component: () => import("../views/Code.vue")
  },

  {
    path: "/menutest",
    name: "Menu",
    component: () => import("../views/MenuTest.vue"),
    redirect: "/menutest/menu1",
    children: [{
        path: '/menutest/menu1',
        component: () => import("../views/menuPages/menu1.vue"),
        children: [{
            path: '/menutest/menu1/menu1-1',
            component: () => import("../views/menuPages/menu1-1.vue"),
          },
          {
            path: '/menutest/menu1/menu1-2',
            component: () => import("../views/menuPages/menu1-2.vue"),
          }
        ]
      },
      {
        path: '/menutest/menu2',
        component: () => import("../views/menuPages/menu2.vue"),
        children: [{
            path: '/menutest/menu2/menu2-1',
            component: () => import("../views/menuPages/menu2-1.vue"),
          },
          {
            path: '/menutest/menu2/menu2-2',
            component: () => import("../views/menuPages/menu2-2.vue"),
            children: [{
                path: '/menutest/menu2/menu2-2/menu2-1-1',
                component: () => import("../views/menuPages/menu2-1-1.vue"),
              },
              {
                path: '/menutest/menu2/menu2-2/menu2-2-2',
                component: () => import("../views/menuPages/menu2-1-2.vue"),
              }
            ]
          },
          {
            path: '/menutest/menu2/menu2-3',
            component: () => import("../views/menuPages/menu2-3.vue"),
          }
        ]
      },
      {
        path: '/menutest/menu3',
        component: () => import("../views/menuPages/menu3.vue"),
      }
    ]
  },
  
  {
    path: "/background",
    name: "Background",
    component: () => import("../views/Background.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
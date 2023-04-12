import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import request from "../api/http";

import "@/assets/css/common.css";

//  ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// codemirror
import VueCodeMirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
Vue.use(VueCodeMirror);

Vue.prototype.$request = request;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

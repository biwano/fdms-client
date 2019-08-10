import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Fdms from "./fdms-vue";

Vue.config.productionTip = false;
Vue.use(Fdms, {
  api: {
    baseURL: "http://localhost:5000/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
    withCredentials: true
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

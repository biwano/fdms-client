import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Fdms from "./fdms-vue";

Vue.config.productionTip = false;
Vue.use(Fdms, {
  baseURL: 'http://localhost:5000/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Fdms from "./fdms-vue";
import store from "./store.js";
import config from "./config.js";
import "./icons.js";

import "./mixins";

import "./style.css";
import "bulma/css/bulma.css";

Vue.config.productionTip = false;
Vue.use(Fdms, Object.assign({}, config, { store }));
Vue.mixin({
  computed: {
    bus() {
      return this.$store.state.bus;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

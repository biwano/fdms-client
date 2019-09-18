import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import Fdms from "./fdms-vue";
import store from "./store.js";
import config from "./config.js";
import "./icons.js";

import "./mixins";

import "purecss/build/pure.css";

Vue.config.productionTip = false;
Vue.use(Fdms, config);
Vue.mixin({
  methods: {
    busy() {
      this.$store.commit("busy");
    },
    available() {
      this.$store.commit("available");
    },
    busy_while(promise) {
      this.busy();
      this.clear_messages();
      return promise.finally(() => {
        this.available();
      });
    }
  },
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

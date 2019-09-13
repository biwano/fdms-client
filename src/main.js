import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Fdms from "./fdms-vue";
import store from "./store";
import config from "./config";
import "./icons.js";

import "./mixins";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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

Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

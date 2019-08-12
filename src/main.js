import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Fdms from "./fdms-vue";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "purecss/build/pure.css";

Vue.config.productionTip = false;
Vue.use(Fdms, {
  api: {
    baseURL: "http://localhost:5000/",
    timeout: 30000,
    headers: { "X-Custom-Header": "foobar" },
    tenant_master: "fdms",
    withCredentials: true,
    on401() {
      this.globalError("Please authenticate");
      this.$router.push('/login');
    }
  }
});
Vue.mixin({
  computed : {
    tenant_id: function() { 
      return this.$store.state.tenant_id; 
    }
  }
});
library.add(faPlusCircle);
library.add(faHome);
library.add(faSignOutAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

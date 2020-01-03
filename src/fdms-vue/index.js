import fdms from "./mixins/fdms.js";
import "./style.css";
import "./icons.js";
import store from "./store.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Icon from "./components/Icon.vue";
import ClickableIcon from "./components/ClickableIcon.vue";
import ClickableButton from "./components/ClickableButton.vue";
import AsyncComputed from "vue-async-computed";

var Fdms = {};
Fdms.install = function(Vue, options) {
  console.log(ClickableIcon);
  Vue.component("font-awesome-icon", FontAwesomeIcon);
  Vue.component("fdms-icon", Icon);
  Vue.component("fdms-clickable-icon", ClickableIcon);
  Vue.component("fdms-button", ClickableButton);
  Vue.use(AsyncComputed);

  options.store.registerModule('fdms', store)
  // 1. add global method or property
  /*  Vue.myGlobalMethod = function () {
    // some logic ...
  }
*/
  // 2. add a global asset
  /*  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // some logic ...
    }
    ...
  })
*/
  // 3. inject some component options

  fdms(Vue, options);

  // 4. add an instance method
  /*  Vue.prototype.$myMethod = function (methodOptions) {
    // some logic ...
  }
  */
};
export default Fdms;

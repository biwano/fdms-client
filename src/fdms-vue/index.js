import fdms from "./mixins/fdms.js";
import "./style.css";
import "./icons.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

var Fdms = {};
Fdms.install = function(Vue, options) {
  Vue.component("font-awesome-icon", FontAwesomeIcon);

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

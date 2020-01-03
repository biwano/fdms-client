import http_mixin from "./http.js";
import helpers_mixin from "./helpers.js";
import logger_mixin from "./logger.js";

export default function(Vue, options) {
  options.store.commit("fdms/init", options);
  Vue.mixin({
    mixins: [http_mixin, helpers_mixin, logger_mixin]
  });
}

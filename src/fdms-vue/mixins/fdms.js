import state from "./state.js";
import http_mixin from "./http.js";
import helpers_mixin from "./helpers.js";

export default function(Vue, options) {
  const axios = require("axios");
  state.http = axios.create({
    baseURL: options.api.baseURL,
    timeout: options.api.timeout,
    withCredentials: options.api.withCredentials,
    headers: options.api.headers
  });
  state.fdms_tenant_id = undefined;
  state.fdms_initialized = false;
  state.fdms_config = undefined;
  state.options = options;
  Vue.mixin({
    mixins: [http_mixin, helpers_mixin]
  });
}

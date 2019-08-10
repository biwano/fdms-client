export default function(Vue, options) {
  const axios = require("axios");
  const http = axios.create({
    baseURL: options.api.baseURL,
    timeout: options.api.timeout,
    headers: options.api.headers
  });
  Vue.mixin({
    methods: {
      search() {
        return http.get("/search");
      }
    }
  });
}

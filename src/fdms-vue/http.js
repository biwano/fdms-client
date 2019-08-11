export default function(Vue, options) {
  const axios = require("axios");
  let http = axios.create({
    baseURL: options.api.baseURL,
    timeout: options.api.timeout,
    headers: options.api.headers
  });
  Vue.mixin({
    methods: {
      search() {
        return http.get("/search").then((response) => response.data);
      },
      sign_in(tenant, login, password) {
        http = axios.create({
          baseURL: options.api.baseURL,
          timeout: options.api.timeout,
          headers: options.api.headers,
          auth: {
            username: `${tenant}|${login}`,
            password: password
          }
        });
        return http.get("/user").then((response) => response.data);
      }
    }
  });
}

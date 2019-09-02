function toURI(base, tenant_id, params) {
  var str = [];
  params = Object.assign({"__tenant_id": tenant_id}, params)
  for(var p in params){
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
  }
  return base + "?" + str.join("&");
}

export default function(Vue, options) {
  const axios = require("axios");
  let http = axios.create({
    baseURL: options.api.baseURL,
    timeout: options.api.timeout,
    withCredentials: options.api.withCredentials,
    headers: options.api.headers
  });
  Vue.mixin({
    methods: {
      _callHandler(handler, param) {
        if (options.api[`on${handler}`]) {
            options.api[`on${handler}`].bind(this)(param);
        }
      },
      filter(tenant_id, params) {
        if (tenant_id === undefined) return Promise.resolve([]);
        let uri = toURI("/filter", tenant_id, params);

        return http.get(uri)
          .then((response) => response.data)
          .catch((e) => {
            console.log(e);
            this._callHandler(e.response.status, e)
            return e;
          });
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
        return this.get_user();
      },
      get_user() {
        return http.get("/user")
          .then((response) => response.data);
      },
      create_tenant(tenant_id, drop) {
        return http.post("/tenants", { tenant_id, "drop": drop });
      },
      delete_tenant(tenant_id) {
        return http.delete(`/tenants/${tenant_id}`);
      }
    }
  });
}

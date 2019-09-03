function toURI(base, tenant_id, params) {
  var strs = [];
  var str=""
  if (params !== undefined) {
    for(var p in params){
      str="?"
      strs.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
  }
  return `/${tenant_id}${base}${str}${strs.join("&")}`;
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
      _handle(promise) {
        return promise.then((response) => response.data)
          .catch((e) => {
            this._callHandler(e.response.status, e)
            throw(e);
          });
      },
      fdms_filter(tenant_id, params) {
        let uri = toURI("/filter", tenant_id, params);
        return this._handle(http.get(uri))
         
      },
      fdms_sign_in(tenant_id, login, password) {
        http = axios.create({
          baseURL: options.api.baseURL,
          timeout: options.api.timeout,
          headers: options.api.headers,
          auth: {
            username: `${tenant_id}|${login}`,
            password: password
          }
        });
        return this.get_user();
      },
      fdms_get_user() {
        return http.get("/auth")
          .then((response) => response.data);
      },
      fdms_create_tenant(tenant_id, drop) {
        return this._handle(http.post("/tenants", { tenant_id, "drop": drop }));
      },
      fdms_delete_tenant(tenant_id) {
        return this._handle(http.delete(`/tenants/${tenant_id}`));
      },
      fdms_get(tenant_id, id, params) {
        if (!id.startsWith("/")) id = `/${id}`;
        return this._handle(http.get(toURI(`/documents${id}`, tenant_id, params)));
      }
    }
  });
}

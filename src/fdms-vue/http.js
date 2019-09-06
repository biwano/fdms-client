import bus from "./bus.js";
import C from "./constants.js";

function toURI(base, tenant_id, params) {
  var strs = [];
  var str = "";
  if (params !== undefined) {
    for(var p in params) {
      str = "?";
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
  let fdms_tenant_id = undefined;
  let fdms_initialized = false;
  Vue.mixin({

    methods: {
      _callHandler(handler, param) {
        if (options.api[`on${handler}`]) {
          options.api[`on${handler}`].bind(this)(param);
        }
      },
      _handle(promise) {
        return promise
          .then(response => response.data)
          .catch(e => {
            this._callHandler(e.response.status, e);
            throw e;
          });
      },
      fdms_filter(params) {
        let uri = toURI("/filter", fdms_tenant_id, params);
        return this._handle(http.get(uri));
      },
/*      fdms_sign_in(tenant_id, login, password) {
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
      },*/
      fdms_get_user() {
        return http.get("/auth").then(response => {
          var user = response.data;
          fdms_initialized = true;
          if (user.is_fdms_admin) fdms_tenant_id = options.api.tenant_master;
          else fdms_tenant_id = user.tenant_id;
          user.tenant_id = fdms_tenant_id;
          bus.$emit("logged_in", user);
          return user;
        });
      },
      fdms_create_tenant(tenant_id, drop) {
        return this._handle(http.post("/tenants", { tenant_id, drop }));
      },
      fdms_delete_tenant(tenant_id) {
        return this._handle(http.delete(`/tenants/${tenant_id}`));
      },
      fdms_get(id, params) {
        if (!id.startsWith("/")) id = `/${id}`;
        return this._handle(
          http.get(toURI(`/documents${id}`, fdms_tenant_id, params))
        );
      },
      fdms_get_children(id, params) {
        var more_params = {};
        more_params[C.MODIFIERS] = "children";
        params = Object.assign({}, params, more_params);
        return this.fdms_get(id, params);
      },
      fdms_doc_label(doc) {
        return doc[C.PATH_SEGMENT];
      },
      fdms_doc_path(doc) {
        return doc[C.PATH];
      },
      fdms_after_init(func) {
        if (fdms_initialized) func();
        else {
          this.bus.$on("logged_in", func);
        }
      }
    }
  });
}

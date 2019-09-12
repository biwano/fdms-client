import bus from "./bus.js";
import { 
  VIEW_CONFIG,
  SCHEMA_ID,
  DEFAULT,
  PATH,
  PATH_SEGMENT,
  MODIFIERS 
} from "./constants.js";
import cache from "js-cache";

function toURI(base, tenant_id, params) {
  var strs = [];
  var str = "";
  if (params !== undefined) {
    for (var p in params) {
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
  let fdms_config = undefined;
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
          return this._handle(http.get("/config")).then((config) => {
            fdms_config = config;
            bus.$emit("logged_in", user);
            return user;
          });
        });
      },
      fdms_create_tenant(tenant_id, drop) {
        return this._handle(http.post("/tenants", { tenant_id, drop }));
      },
      fdms_delete_tenant(tenant_id) {
        return this._handle(http.delete(`/tenants/${tenant_id}`));
      },
      fdms_refresh_tenant(tenant_id) {
        return this._handle(http.put(`/tenants/${tenant_id}?items=views`));
      },
      fdms_get(doc_id, params) {
        if (typeof doc_id === "object") {
          return doc_id;
          //var doc = doc_id;
          //doc_id = doc[PATH];
        }
        if (!doc_id.startsWith("/")) doc_id = `/${doc_id}`;
        return this._handle(
          http.get(toURI(`/documents${doc_id}`, fdms_tenant_id, params))
        );
      },
      fdms_get_children(doc_id, params) {
        if (typeof doc_id === "object") {
          var doc = doc_id;
          doc_id = doc[PATH];
        }
        var more_params = {};
        more_params[MODIFIERS] = "children";
        params = Object.assign({}, params, more_params);
        return this.fdms_get(doc_id, params);
      },
      from_cache(key, func) {
        if (cache.get(key) !== undefined) return cache.get(key);
        else {
          var value = func();
          if (options.api.use_cache) cache.set(key, value, options.api.cache_ttl);
          return value;
        }
      },
      async fdms_get_view_config(view_config) {
        if (typeof view_config === "object") {
          var doc = view_config;
          view_config = doc[VIEW_CONFIG];
          if (!view_config) {
            var schema = await this.fdms_get_schema(doc[SCHEMA_ID]);
            view_config = schema[VIEW_CONFIG];
          }
          if (!view_config) view_config = DEFAULT;
        }
        return this.from_cache(`config|${view_config}`, () => {
          return this.fdms_get(`/meta/ui/views/${view_config}`).then(doc => {
            return doc ? doc.config : undefined;
          });
        });
      },
      async fdms_get_schema(schema_id) {
        if (typeof schema_id === "object") {
          var doc = schema_id;
          schema_id = doc[SCHEMA_ID];
        }
        return this.from_cache(`schema|${schema_id}`, async () => {
          var schema = await this.fdms_get(`/meta/schemas/${schema_id}`);
          return schema;
        });
      },
      async fdms_get_schema_full(schema_id) {
        var schema = await this.fdms_get_schema(schema_id);
        Object.assign(schema.properties, fdms_config.base_properties);
        return schema;
      },
      fdms_doc_label(doc) {
        return doc[PATH_SEGMENT];
      },
      fdms_doc_path(doc) {
        return doc[PATH];
      },
      fdms_after_init(func) {
        if (fdms_initialized) func();
        else {
          this.bus.$on("logged_in", func);
        }
      },
      fdms_log() {
        var args = [];
        args.push("FDMS: ");
        args.push(`<${this.$options.name}>`);
        for (var i in arguments) {
          args.push(arguments[i]);
        }
        console.log.apply(console, args);
      },
      fdms_navigate(thing) {
        bus.$emit("navigate", this.fdms_as_path(thing));
      },
      fdms_bus() {
        return bus;
      },
      fdms_as_path(thing) {
        if (typeof thing === "object") return thing[PATH];
        else return thing;
      }
    }
  });
}

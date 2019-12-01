import bus from "../bus.js";

import {
  VIEW_CONFIG,
  SCHEMA_ID,
  DEFAULT,
  PATH,
  MODIFIERS,
  FACETS,
  FACET_SHOW_IN_TREE
} from "../constants.js";
import state from "./state.js";
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

export default {
  methods: {
    _callHandler(handler, param) {
      if (state.options.api[`on${handler}`]) {
        state.options.api[`on${handler}`].bind(this)(param);
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
      let uri = toURI("/filter", state.fdms_tenant_id, params);
      return this._handle(state.http.get(uri));
    },
/*      fdms_sign_in(tenant_id, login, password) {
      state.http = axios.create({
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
      return state.http.get("/auth").then(response => {
        var user = response.data;
        state.fdms_initialized = true;
        if (user.is_fdms_admin) state.fdms_tenant_id = state.options.api.tenant_master;
        else state.fdms_tenant_id = user.tenant_id;
        user.tenant_id = state.fdms_tenant_id;
        return this._handle(state.http.get("/config")).then((config) => {
          state.fdms_config = config;
          bus.$emit("logged_in", user);
          return user;
        });
      });
    },
    fdms_create_tenant(tenant_id, drop) {
      return this._handle(state.http.post("/tenants", { tenant_id, drop }));
    },
    fdms_delete_tenant(tenant_id) {
      return this._handle(state.http.delete(`/tenants/${tenant_id}`));
    },
    fdms_refresh_tenant(tenant_id) {
      return this._handle(state.http.put(`/tenants/${tenant_id}?items=views`));
    },
    fdms_get(doc_id, params) {
      if (typeof doc_id === "object") {
        return doc_id;
        //var doc = doc_id;
        //doc_id = doc[PATH];
      }
      var more_params = {};
      more_params[MODIFIERS] = "with_permissions";
      params = Object.assign({}, params, more_params);
      if (!doc_id.startsWith("/")) doc_id = `/${doc_id}`;
      return this._handle(
        state.http.get(toURI(`/documents${doc_id}`, state.fdms_tenant_id, params))
      );
    },
    fdms_update(doc) {
      return this._handle(
        state.http.put(toURI(`/documents${doc[PATH]}`, state.fdms_tenant_id), doc)
      );
    },
    fdms_get_tree_children(doc_id, params) {
      if (typeof doc_id === "object") {
        var doc = doc_id;
        doc_id = doc[PATH];
      }
      var more_params = {};
      more_params[FACETS] = FACET_SHOW_IN_TREE;
      more_params[MODIFIERS] = "children,with_permissions";
      params = Object.assign({}, params, more_params);
      return this._handle(
        state.http.get(toURI(`/documents${doc_id}`, state.fdms_tenant_id, params))
      );
    },
    fdms_from_cache(key, func) {
      if (cache.get(key)) return cache.get(key);
      else {
        var value = func();
        if (state.options.api.use_cache) cache.set(key, value, state.options.api.cache_ttl);
        return value;
      }
    },
    async fdms_get_view_config(view_config) {
      if (typeof view_config === "object") {
        var doc = view_config;
        view_config = doc[VIEW_CONFIG];
        if (!view_config) {
          var schema = await this.fdms_get_schema(doc[SCHEMA_ID]);
          if (schema) {
            view_config = schema[VIEW_CONFIG];
          }
        }
        if (!view_config) view_config = DEFAULT;
      }
      return this.fdms_from_cache(`config|${view_config}`, () => {
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
      return this.fdms_from_cache(`schema|${schema_id}`, async () => {
        var schema = await this.fdms_get(`/meta/schemas/${schema_id}`);
        return schema;
      });
    },
    async fdms_get_schema_full(schema_id) {
      var schema = await this.fdms_get_schema(schema_id);
      if (schema) {
        Object.assign(schema.properties, state.fdms_config.base_properties);
      }
      return schema;
    },
  }
};

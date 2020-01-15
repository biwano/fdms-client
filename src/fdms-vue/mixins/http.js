import {
  VIEW_CONFIG,
  SCHEMA_ID,
  DEFAULT,
  PATH,
  MODIFIERS,
  FACETS,
  FACET_SHOW_IN_TREE
} from "../constants.js";
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
  computed: {
    fdms_http() {
      return this.fdms_store_get("http");
    }
  },
  methods: {
    fdms_store_get(key) {
      return this.$store.getters[`fdms/${key}`];
    },
    _callHandler(handler, param) {
      if (this.fdms_store_get("options").api[`on${handler}`]) {
        this.fdms_store_get("options").api[`on${handler}`].bind(this)(param);
      }
    },
    _handle(function_returning_http_promise) {
      return this.fdms_after_init(() => {
        var promise = function_returning_http_promise()
          .then(response => response.data)
          .catch(e => {
            this._callHandler(e.response.status, e);
            throw e;
          });
        return promise;
      });
    },
    _handle_busy(function_returning_http_promise) {
      return this.fdms_busy_while(this._handle(function_returning_http_promise));
    },
    fdms_filter(params) {
      let uri = toURI("/filter", this.fdms_store_get("tenant_id"), params);
      return this._handle(() => this.fdms_http.get(uri));
    },
    fdms_get_user() {
      return this.fdms_http.get("/auth").then(response => {
        var user = response.data;
        this.$store.commit("fdms/logged_in", user);
        return this.fdms_http.get("/config").then(response => {
          this.$store.commit("fdms/configure", response.data);
          return user;
        });
      });
    },
    fdms_create_tenant(tenant_id, drop) {
      return this._handle_busy(() => this.fdms_http.post("/tenants", { tenant_id, drop }));
    },
    fdms_delete_tenant(tenant_id) {
      return this._handle_busy(() => this.fdms_http.delete(`/tenants/${tenant_id}`));
    },
    fdms_refresh_tenant(tenant_id) {
      return this._handle_busy(() => this.fdms_http.put(`/tenants/${tenant_id}?items=views`));
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
      return this._handle(() =>
        this.fdms_http.get(toURI(`/documents${doc_id}`, this.fdms_store_get("tenant_id"), params))
      );
    },
    fdms_update(doc) {
      return this._handle_busy(() =>
        this.fdms_http.put(toURI(`/documents${doc[PATH]}`, this.fdms_store_get("tenant_id")), doc)
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
      return this._handle(() =>
        this.fdms_http.get(toURI(`/documents${doc_id}`, this.fdms_store_get("tenant_id"), params))
      );
    },
    fdms_from_cache(key, func) {
      if (cache.get(key)) return cache.get(key);
      else {
        var value = func();
        if (this.fdms_store_get("options").api.use_cache) cache.set(key, value, this.fdms_store_get("options").api.cache_ttl);
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
        Object.assign(schema.properties, this.fdms_store_get("config").base_properties);
      }
      return schema;
    },
  }
};

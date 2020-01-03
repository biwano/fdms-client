export default {
  namespaced: true,
  state: {
    busy: 0,
    tenant_id: undefined,
    initialized: false,
    config: undefined,
    options: undefined,
    tenant_master: undefined,
    http: undefined,
    user: undefined
  },
  mutations: {
    init(state, options) {
      state.options = options;
      const axios = require("axios");
      state.http = axios.create({
        baseURL: options.api.baseURL,
        timeout: options.api.timeout,
        withCredentials: options.api.withCredentials,
        headers: options.api.headers
      });
    },
    busy(state) {
      state.busy++;
    },
    available(state) {
      state.busy--;
    },
    logged_in(state, user) {
      state.initialized = true;
      if (user.is_fdms_admin) {
        state.tenant_id = state.options.api.tenant_master;
      } else {
        state.tenant_id = user.tenant_id;
      }
      user.tenant_id = state.tenant_id;
      state.user = user;
    },
    configure(state, config) {
      state.config = config;
    }
  },
  getters: {
    busy(state) {
      return state.busy > 0;
    },
    options(state) {
      return state.options;
    },
    tenant_id(state) {
      return state.tenant_id;
    },
    tenant_master(state) {
      return state.tenant_master;
    },
    initialized(state) {
      return state.initialized;
    },
    http(state) {
      return state.http;
    },
    config(state) {
      return state.config;
    },
    user(state) {
      return state.user;
    }
  }
};

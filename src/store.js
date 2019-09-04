import Vue from "vue";
import Vuex from "vuex";
import bus from "@/fdms-vue/bus.js"
import config from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    messages: {},
    busy: false,
    bus
  },
  mutations: {
    busy(state) {
      state.busy = true;
    },
    available(state) {
      state.busy = false;
    },
    /*
    set_user(state, user) {
      state.user = user;
      if (user.is_fdms_admin) state.tenant_id = config.api.tenant_master;
      else state.tenant_id = user.tenant_id;
      bus.$emit("logged_in", user);
    },*/
    clear_messages(state, category) {
  		state.messages[category] = { messages: [], options: {} };
  		state.messages = Object.assign({}, state.messages);
    },
    message(state, payload) {
  		state.messages[payload.category] = state.messages[payload.category] || { messages: [], options: {} };
  		state.messages[payload.category].messages.push({ type: payload.type, text: payload.text});
		  state.messages = Object.assign({}, state.messages);
    }
  }
})
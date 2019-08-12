import Vue from "vue";
import Vuex from "vuex";
import bus from "./bus.js"

Vue.use(Vuex);

function message(messages, category, type, text) {

}
export default new Vuex.Store({
  state: {
    user: null,
    messages: {},
    tenant_id: undefined,
  },
  mutations: {
    set_user (state, user) {
      state.user = user;
      if (user.is_fdms_admin) state.tenant_id = "fdms";
      else state.tenant_id = user.tenant_id;
      bus.$emit("logged_in", user);
    },
    clearMessages(state, category) {
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
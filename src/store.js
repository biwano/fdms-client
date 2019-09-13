import Vue from "vue";
import Vuex from "vuex";
import bus from "@/fdms-vue/bus.js"
import config from "./config";

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    user: undefined,
    messages: {},
    busy: 0,
    bus
  },
  mutations: {
    busy(state) {
      state.busy++;
    },
    available(state) {
      state.busy--;
    },
    set_user(state, user) {
      state.user = user;
    },
    clear_messages(state, category) {
  		state.messages[category] = { messages: [], options: {} };
  		state.messages = Object.assign({}, state.messages);
    },
    message(state, payload) {
  		state.messages[payload.category] = state.messages[payload.category] || { messages: [], options: {} };
  		state.messages[payload.category].messages.push({ type: payload.type, text: payload.text});
		  state.messages = Object.assign({}, state.messages);
    }
  },
  getters: {
    user: state => {
      return state.user !== undefined ? state.user : {};
    }
  }
});
bus.$on("logged_in", user => {
  store.commit("set_user", user);
});

export default store;
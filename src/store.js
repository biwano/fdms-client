import Vue from "vue";
import Vuex from "vuex";
import bus from "@/fdms-vue/bus.js";
//import config from "./config";

Vue.use(Vuex);
function getMessageCategory(state, category) {
  return state.message_categories[category] || { messages: [], options: {} };
}
function findMessage(state, uuid) {
  var found;
  Object.keys(state.message_categories).forEach(category => {
    var messages = state.message_categories[category].messages;
    messages.forEach((message, index) => {
      if (message.uuid === uuid) found = { category, index, message };
    });
  });
  return found;
}
var store = new Vuex.Store({
  state: {
    user: undefined,
    message_categories: {},
    busy: 0,
    bus,
    uuid: 0
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
      var message_category = getMessageCategory(state, category);
      var now = new Date();
      message_category.messages.forEach(message => {
        message.ended = now;
      });
      state.message_categories = Object.assign({}, state.message_categories);
    },
    clear_message(state, uuid) {
      var found = findMessage(state, uuid);
      if (found) found.message.ended = new Date();
      state.message_categories = Object.assign({}, state.message_categories);
    },
    update_message(state, message) {
      var found = findMessage(state, message.uuid);
      if (found) state.message_categories[found.category].messages[found.index] = message;
      state.message_categories = Object.assign({}, state.message_categories);
    },
    message(state, payload) {
      var uuid = state.uuid++;
      state.message_categories[payload.category] = state.message_categories[
        payload.category
      ] || { messages: [], options: {} };
      state.message_categories[payload.category].messages.push({
        type: payload.type,
        text: payload.text,
        uuid
      });
      state.message_categories = Object.assign({}, state.message_categories);
    }
  },
  getters: {
    user: state => {
      return state.user !== undefined ? state.user : {};
    },
    message_categories: state => {
      return state.message_categories;
    },
    message_category: (state, getters) => category_name => {
      var category = getters.message_categories[category_name];
      return category || { messages: [], options: {} };
    },
    messages: (state, getters) => category_name => {
      return getters.message_category(category_name).messages;
    }
  }
});
bus.$on("logged_in", user => {
  store.commit("set_user", user);
});

export default store;

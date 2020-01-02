<template>
  <div>
    <div
      :class="visibilityClass(message)"
      v-for="message in $store.getters.messages(category)"
    >
      <button class="delete" @click="clear_message(message)"></button>
      <font-awesome-icon :icon="icon(message)" :class="iconClass(message)" />
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    category: String
  },
  methods: {
    visibilityClass(message) {
      var clazz = {};
      clazz["notification"] = true;
      clazz["message"] = true;
      if (message.shown) {
        clazz["invisible"] = false;
        clazz[message.ended ? "invisible" : "visible"] = true;
      }
      else { 
        clazz["invisible"] = true;
        window.setTimeout(() => {
          message.shown = new Date();
          this.$store.commit("update_message", message);
        }, 10);
      }
      return clazz;
    },
    iconClass(message) {
      var clazz = {};
      clazz["fdms-icon"] = true;
      clazz[message.type] = true;
      return clazz;
    },
    icon(message) {
      if (message.type === "info") return "thumbs-up";
      if (message.type === "error") return "exclamation-circle";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  margin-bottom: 15px;
  display: block;
}
.error {
  color: #f44336; /* Red */
}
.info {
  color: #099; /* Red */
}
.message {
  overflow: hidden;
}
.message.visible {
  opacity: 1;
  max-height: 100px;
  transition: 1s;
}
.message.invisible {
  opacity: 1;
  max-height: 0;
  transition: 1s;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}
</style>

export default {
  props: ["value", "mode", "model", "config", "doc"],
  data() {
    return {
      local_value: undefined
    };
  },
  watch: {
    value(val) {
      this.local_value = val;
    },
    local_value(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    view() {
      return !this.mode || this.mode === "view";
    }
  }
};

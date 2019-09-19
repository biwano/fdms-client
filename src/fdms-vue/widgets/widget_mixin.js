import debounce from "lodash.debounce";
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
    },
    doc() {
      this.debounced_widget_update();
    },
    config() {
      this.debounced_widget_update();
    }
  },
  created() {
    this.debounced_widget_update = debounce(this.widget_update, 25);
    this.debounced_widget_update();
  },
  computed: {
    view() {
      return !this.mode || this.mode === "view";
    }
  },
  methods: {
    widget_update() {}
  }
};

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
    this.local_value = this.value;
    this.debounced_widget_update = debounce(this.widget_update, 25);
    this.debounced_widget_update();
  },
  computed: {
    mode_edit() {
      return this.mode === "edit" && this.config.readonly === undefined;
    },
    mode_view() {
      return !this.mode_edit;
    }
  },
  methods: {
    widget_update() {}
  }
};

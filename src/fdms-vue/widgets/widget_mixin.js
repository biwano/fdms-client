import debounce from "lodash.debounce";
export default {
  props: ["value", "mode", "model", "widget", "doc"],
  data() {
    return {
      local_value: undefined,
      initialized: false      
    };
  },
  watch: {
    value(val) {
      this.local_value = val;
    },
    local_value(val) {
      if (this.initialized) this.$emit("input", val);
    },
    doc() {
      this.debounced_widget_update();
    },
    widget() {
      this.debounced_widget_update();
    }
  },
  created() {
    this.local_value = this.value;
    this.debounced_widget_update = debounce(this.widget_update, 25);
    this.debounced_widget_update();
    window.setTimeout(() => { this.initialized = true }, 1);
  },
  computed: {
    local_widget() {
      return this.widget || {};
    },
    mode_edit() {
      return this.mode === "edit" && this.local_widget.readonly === undefined;
    },
    mode_view() {
      return !this.mode_edit;
    },
  },
  methods: {
    widget_update() {}
  }
};

import doc_widget_mixin from "./doc_mixin.js";

export default {
  props: {
    mode: String,
    model: String
  },
  mixins: [doc_widget_mixin],
  computed: {
    view() {
      return !this.mode || this.mode === "view";
    }
  }
};

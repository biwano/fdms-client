import doc_widget from "./doc.js"

export default {
  props: {
    mode: String,
    model: String
  },
  mixins: [doc_widget],
  computed: {
    view() {
      return !this.mode || this.mode === "view";
    }
  }
};

import { PATH } from "../constants.js";
export default {
  props: {
    doc_id: [String, Object],
  },
  data() {
    return {
      doc: undefined
    };
  },
  watch: {
    doc_id(val, oldval) {
      if (oldval === undefined || val[PATH] !== oldval[PATH]) {
        this.widget_load();
      }
    }
  },
  created() {
    this.widget_load();
  },
  methods: {
    async widget_load() {
      if (this.doc_id) {
        this.doc = await this.fdms_get(this.doc_id);
        this.load();
      }
    },
    load() {}
  }
};


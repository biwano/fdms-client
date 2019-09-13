export default {
  props: {
    doc: [String, Object],
    config: Object
  },
  data() {
    return {
      doc_: undefined
    }
  },
  watch: {
    doc() {
      this.widget_load();
    }
  },
  async created() {
    this.widget_load();
  },
  methods: {
    async widget_load() {
      if (this.doc) {
        this.doc_ = await this.fdms_get(this.doc);
        this.load();
      }
    },
    load() {}
  }
};


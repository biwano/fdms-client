export default {
  props: {
    root_path : { default: "/" }
  },
  data() {
    return {
      local_root_path: undefined,
      doc: undefined
    };
  },
  watch: {
    $route(route) {
      this.update(route.params.path);
    }
  },
  created() {
    this.fdms_after_init(() => {
      this.local_root_path = this.root_path;
      this.update(this.$route.params.path);
    });
  },
  methods: {
    async update(path) {
      path = path || this.root_path;
      this.doc = await this.fdms_get(path);
    }
  }
};

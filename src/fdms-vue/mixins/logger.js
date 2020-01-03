export default {
  methods: {
    fdms_log_be(level, args) {
      if (this.fdms_has_log_level(level)) {
        var final_args = [`[FDMS] ${level} <${this.$options.name}>(${this._uid})`];
        for (var i in args) {
          final_args.push(args[i]);
        }
        console.log.apply(console, final_args);
      }
    },
    fdms_has_log_level(level) {
      return this.fdms_store_get("options").log[level];
    },
    fdms_warn() {
      this.fdms_log_be("WARNING", arguments);
    },
    fdms_info() {
      this.fdms_log_be("INFO", arguments);
    },
    fdms_error() {
      this.fdms_log_be("ERROR", arguments);
    },
    fdms_debug() {
      this.fdms_log_be("DEBUG", arguments);
    },
    fdms_trace() {
      this.fdms_log_be("TRACE", arguments);
    }
  }
};

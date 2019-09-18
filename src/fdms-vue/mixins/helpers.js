import bus from "../bus.js";
import state from "./state.js";
import {
  PATH,
  PATH_SEGMENT,
  ID
} from "../constants.js";
import Mustache from "mustache";

var widgets_auto_props = {
  keyword: "text",
  boolean: "boolean",
  date: "date",
  json: "text"
};
export default {
  methods: {
    fdms_doc_label(doc) {
      return doc[PATH_SEGMENT];
    },
    fdms_doc_path(doc) {
      return doc[PATH];
    },
    fdms_after_init(func) {
      if (state.fdms_initialized) func();
      else {
        bus.$on("logged_in", func);
      }
    },
    fdms_log_be(level, args) {
      var final_args = [`[FDMS] ${level} <${this.$options.name}>`];
      for (var i in args) {
        final_args.push(args[i]);
      }
      console.log.apply(console, final_args);
    },
    fdms_warn() {
      if (state.options.log.warn) this.fdms_log_be("WARNING", arguments);
    },
    fdms_info() {
      if (state.options.log.info) this.fdms_log_be("INFO", arguments);
    },
    fdms_error() {
      if (state.options.log.error) this.fdms_log_be("ERROR", arguments);
    },
    fdms_debug() {
      if (state.options.log.debug) this.fdms_log_be("DEBUG", arguments);
    },
    fdms_trace() {
      if (state.options.log.trace) this.fdms_log_be("TRACE", arguments);
    },
    fdms_navigate(thing) {
      var path = this.fdms_as_path(thing);
      this.fdms_debug("navigate", path);
      bus.$emit("navigate", path);
    },
    fdms_bus() {
      return bus;
    },
    fdms_as_path(thing) {
      if (typeof thing === "object") return thing[PATH];
      else return thing;
    },
    fdms_configure_widget(widget, schema) {
      if (typeof widget !== "object") {
        widget = {
          auto: widget,
          config: { }
        };
      }
      widget = Object.assign({}, widget);
      widget.config = Object.assign({}, widget.config);
      if (widget.auto) {
        var model = widget.auto;
        widget.config.model = model;
        if (schema && schema.properties) {
          var prop = schema.properties[model];
          if (prop) {
            while (prop.alias) {
              prop = schema.properties[prop.alias];
            }
            if (!widget.type) widget.type = widgets_auto_props[prop.type];
            if (prop.list === true) {
              widget = {
                type: "array",
                config: {
                  model,
                  widget,
                  label: model
                }
              };
            }
            this.fdms_trace("Widget auto configured", widget, prop);
          } else this.fdms_warn("Auto mapping failed: Unknown property :", widget.config.model, "for schema :", schema["id"]);
        }
        if (!widget.config.label) {
          widget.config.label = model;
        }
      }
      return widget;
    },
    fdms_interpolate(template, data) {
      return Mustache.render(template,data);
    }
  }
};

import bus from "../bus.js";
import state from "./state.js";
import {
  PATH,
  PATH_SEGMENT,
  PARENT_UUID,
  DOCUMENT_UUID,
  PERMISSIONS
} from "../constants.js";
import Mustache from "mustache";

var widgets_auto_props = {
  keyword: { type: "text" },
  boolean: { type: "boolean" },
  date: { type: "date" },
  json: { type: "text" },
  email: { type: "text", config: { type: "email" } }
};
export default {
  methods: {
    fdms_doc_label(doc) {
      return doc[PATH_SEGMENT];
    },
    fdms_doc_path(doc) {
      return doc[PATH];
    },
    fdms_doc_is_writable(doc) {
      return doc && doc[PERMISSIONS] && doc[PERMISSIONS].includes("w");
    },
    fdms_after_init(func) {
      if (state.fdms_initialized) func();
      else {
        bus.$on("logged_in", func);
      }
    },
    fdms_log_be(level, args) {
      var final_args = [`[FDMS] ${level} <${this.$options.name}>(${this._uid})`];
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
      if (widget.type == "children") {
        widget.type = "list";
        widget.config.filter = {};
        widget.config.filter[PARENT_UUID] = `{{doc.${DOCUMENT_UUID}}}`;
        this.fdms_trace("'Children' widget auto configured", widget, prop);
      }
      if (widget.auto) {
        var model = widget.auto;
        widget.config.model = model;
        if (schema && schema.properties) {
          var prop = schema.properties[model];
          if (prop) {
            while (prop.alias) {
              widget.config.readonly = true;
              prop = schema.properties[prop.alias];
            }
            var auto_prop = widgets_auto_props[prop.type];
            if (!widget.type) widget.type = auto_prop.type;
            Object.assign(widget.config, auto_prop.config);
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
            this.fdms_trace("'auto' widget configured. schema: ", schema.id, "model: ", model, "type: ", prop.type, "=>", widget.type, widget);
          } else this.fdms_warn("Auto mapping failed: Unknown property :", widget.config.model, "for schema :", schema.id);
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

import bus from "../bus.js";
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
  json: { type: "json" },
  email: { type: "text", input: "email" }
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
      return new Promise((resolve) => {
        if (this.fdms_store_get("initialized")) resolve(func());
        else {
          this.$store.subscribe((mutation) => {
            if (mutation.type === 'fdms/configure') {
              var result = func();
              resolve(result);
            }
          });
        }
      });
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
          auto: widget
        };
      }
      widget = Object.assign({}, widget);
      if (widget.type == "children") {
        widget.label = "Children";
        widget.type = "list";
        widget.filter = {};
        widget.filter[PARENT_UUID] = `{{doc.${DOCUMENT_UUID}}}`;
        this.fdms_trace("'Children' widget auto configured", widget, prop);
      }
      if (widget.auto) {
        var model = widget.auto;
        widget.model = model;
        if (schema && schema.properties) {
          var prop = schema.properties[model];
          if (prop) {
            while (prop.alias) {
              widget.readonly = true;
              prop = schema.properties[prop.alias];
            }
            var auto_prop = widgets_auto_props[prop.type];
            if (!widget.type) widget.type = auto_prop.type;
            Object.assign(widget, auto_prop.config);
            if (prop.list === true) {
              widget = {
                type: "array",
                model,
                widget,
                label: model
              };
            }
            this.fdms_trace("'auto' widget configured. schema: ", schema.id, "model: ", model, "type: ", prop.type, "=>", widget.type, widget);
          } else this.fdms_warn("Auto mapping failed: Unknown property :", widget.config.model, "for schema :", schema.id);
        }
        if (!widget.label) {
          widget.label = model;
        }
      }
      return widget;
    },
    fdms_interpolate(template, data) {
      return Mustache.render(template, data);
    },
    fdms_busy() {
      this.$store.commit("fdms/busy");
    },
    fdms_available() {
      this.$store.commit("fdms/available");
    },
    fdms_busy_while(promise) {
      this.fdms_busy();
      this.clear_messages();
      return promise.finally(() => {
        this.fdms_available();
      });
    },
    is_fdms_busy() {
      return this.$store.getters["fdms/busy"];
    }

  }
};

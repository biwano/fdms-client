<template>
  <span>
    <table>
      <tr v-for="key in keys">
        <td>{{ key }}</td>
        <td><widget-proxy :widget="makeWidget(value[key])" :doc="doc" :value="value[key]" :mode="mode"></widget-proxy></td>
      </tr>
    </table>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetJson",
  mixins: [widget_mixin],
  components: { WidgetProxy: () => import("./WidgetProxy.vue") },
  methods: {
    click() {
      // link is True go to doc
      if (this.is_link == true) {
        if (this.config.link == true) {
          this.fdms_navigate(this.doc);
        } else {
        // It must be a string interpolate!
          var path = this.fdms_interpolate(this.config.link, { doc: this.doc, model: this.value });
          this.fdms_navigate(path);
        }
      }
    },
    makeWidget(val) {
      var type = "";
      var config = {};
      if (typeof val == "string") type = "text";
      else if (Array.isArray(val)) { 
        type = "array";
        config = {
          widget: {
            "type": "json",
            "config": {}
          }
        };
      }
/*      else if (typeof val == "object") type = "json";
      else type = "text";*/
      return {
        type,
        mode: this.mode,
        config
      };
    }
  },
  computed: {
    keys() {
      return Object.keys(this.value);
    }
  }
};
</script>

<template>
  <span>
    <span v-for="(entry, index) in value">
      <widget-proxy :widget="config.widget" v-model="value[index]" :doc="doc"></widget-proxy>      
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetArray",
  mixins: [widget_mixin],
  components: { WidgetProxy: () => import("./WidgetProxy.vue") },
  data() {
    return {
      children: []
    };
  },
  methods: {
    async widget_load() {
      this.children = await this.fdms_get_children(this.doc);
    }
  }
};
</script>

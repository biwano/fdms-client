<template>
  <span>
    <ol :class="display_config">
      <li v-for="(entry, index) in value">
        <widget-proxy :widget="config.widget" v-model="value[index]" :doc="doc" :mode="mode"></widget-proxy>      
      </li>
    </ol>
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
  },
  computed: {
    display_config() {
      return `fdms_${this.config.display}`;
    }
  }
};
</script>

<style scoped>
.fdms_bulleted_list {
  display: block;
  list-style-type: disc;
  margin :0;
  padding-inline-start:0;
}
.fdms_numbered_lit {
  display: block;
  margin :0;
  padding-inline-start:0;
}
</style>

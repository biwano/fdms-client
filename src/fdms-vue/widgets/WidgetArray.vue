<template>
  <span>
    <ol :class="display_config">
      <li v-for="(entry, index) in value">
        <widget-proxy :widget="widget.widget" v-model="value[index]" :doc="doc" :mode="mode"></widget-proxy>      
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
      var clazz = {};
      var display = this.widget.display || "bulleted_list";
      display.split(" ").forEach((cls) => {
        clazz[`fdms_${cls}`] = true;
      });
      return clazz;
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
.fdms_numbered_list {
  display: block;
  margin :0;
  padding-inline-start:0;
}
.fdms_with_hook {
  position: relative;
  width: 100%;
  margin-top: 2px;
  padding-left: 25px;
}
.fdms_with_hook:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 15px;
  border: 1px solid grey;
  border-right-width: 0;
}
</style>

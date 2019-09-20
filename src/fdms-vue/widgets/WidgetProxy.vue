<template>
  <span v-if="widget.type">
  <component
    v-bind:is="`widget-${widget.type}`" v-model="local_value" :config="widget.config" :doc="doc" :mode="mode">
  </component>
</span>
</template>

<script>
import WidgetText from "./WidgetText.vue";
import WidgetList from "./WidgetList.vue";
import WidgetArray from "./WidgetArray.vue";
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetProxy",
  components: { WidgetText, WidgetArray, WidgetList },
  mixins: [widget_mixin],
  props: {
    widget: Object
  }
};
</script>

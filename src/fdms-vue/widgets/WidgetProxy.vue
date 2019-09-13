<template>
  <span>
  <component v-if="ready"
    v-bind:is="`widget-${widget.type}`" :model="widget.model" :config="widget.config" :doc="doc" :schema="schema">
      
    </component>
</span>
</template>

<script>
import WidgetText from "./WidgetText.vue";
import WidgetChildren from "./WidgetChildren.vue";

export default {
  name: "WidgetProxy",
  components: { WidgetText, WidgetChildren },
  props: {
    doc: Object,
    schema: Object,
    widget: Object
  },
  computed: {
    ready() {
      return this.widget && (this.widget.type === "text" || this.widget.type === "children");
    }
  }
};
</script>
<style scoped>
</style>

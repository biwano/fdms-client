<template>
  <span>
  <component
    v-bind:is="`widget-${widget.type}`" v-model="local_value" :config="widget.config" :doc="doc">
      
    </component>
</span>
</template>

<script>
import WidgetText from "./WidgetText.vue";
import WidgetChildren from "./WidgetChildren.vue";
import WidgetArray from "./WidgetArray.vue";
import WidgetUser from "./WidgetUser.vue";

export default {
  name: "WidgetProxy",
  components: { WidgetText, WidgetChildren, WidgetArray, WidgetUser },
  props: {
    value: [Object, String, Array],
    doc: Object,
    widget: Object
  },
  data() {
    return {
      local_value: undefined
    };
  },
  created() {
    this.local_value = this.value;
  },
  watch: {
    value(val) {
      this.local_value = val;
    },
    local_value(val) {
      this.$emit("input", val);
    }
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

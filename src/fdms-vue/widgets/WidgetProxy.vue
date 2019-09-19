<template>
  <span v-if="widget.type">
  <component
    v-bind:is="`widget-${widget.type}`" v-model="local_value" :config="widget.config" :doc="doc">
      
    </component>
</span>
</template>

<script>
import WidgetText from "./WidgetText.vue";
import WidgetList from "./WidgetList.vue";
import WidgetArray from "./WidgetArray.vue";

export default {
  name: "WidgetProxy",
  components: { WidgetText, WidgetArray, WidgetList },
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
  }
};
</script>
<style scoped>
</style>

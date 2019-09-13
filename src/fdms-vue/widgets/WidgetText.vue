<template>
  <span v-if="config">
    <span v-if="view">
      {{ doc[config.model] }}
    </span>
  </span>
</template>

<script>
import doc_model_widget_mixin from "./doc_model_mixin.js";

export default {
  name: "WidgetText",
  mixins: [doc_model_widget_mixin]
};
</script>

<template>
  <span>
    <span v-if="view">
        <font-awesome-icon icon="users" class="icon-link"/>
      {{ value }}
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetUser",
  mixins: [widget_mixin]
};
</script>

<template>
  <span class="fdms-clickable" style="display:inline-block" v-on:click="$emit('click')" :disabled="is_fdms_busy()">
    <fdms-icon :icon="icon" />
    <slot></slot>
</span>
</template>

<script>
// @ is an alias to /src
export default {
  name: "fdms-clickable-icon",
  props: ["icon"]
};
</script>

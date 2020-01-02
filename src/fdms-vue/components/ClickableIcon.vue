<template>
  <span class="fdms-clickable" v-on:click="$emit('click')">
    <font-awesome-icon :icon="icon" class="fdms-icon" />
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

<template>
  <button type="button" class="button is-link" @click="$emit('click')" :disabled="is_fdms_busy()">
  	<fdms-icon v-if="icon" :icon="icon" :spin="spin" />
  	<slot></slot>
  </button>
</template>
<script>
export default {
  name: "fdms-button",
  props: ["icon", "spin"]
};
</script>

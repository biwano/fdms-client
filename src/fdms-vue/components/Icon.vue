<template>
  <font-awesome-icon :icon="icon" class="fdms-icon" :spin="spin" />
</template>

<script>
// @ is an alias to /src
export default {
  name: "fdms-icon",
  props: ["icon", "spin"]
};
</script>

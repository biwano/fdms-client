<template>
  <div>
  	<h1>Browse</h1>
    <tree-root :tenant_id="user_tenant_id" :path="path"></tree-root>
 </div>
</template>

<script>
import TreeRoot from "@/fdms-vue/TreeRoot.vue";

export default {
  name: "Browse",
  data() {
    return {
      path: undefined,
    }
  },
  created() {
    this.bus.$on("logged_in", () => this.path="/");
  },
  components: {
    TreeRoot
  },
};
</script>

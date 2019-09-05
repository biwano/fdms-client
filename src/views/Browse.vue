<template>
  <div>
  	<h1>Browse</h1>
    <tree-root :tenant_id="user_tenant_id" :path="path" :expanded="true"></tree-root>
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
    this.fdms_after_init(() => this.path="/");
  },
  components: {
    TreeRoot
  },
};
</script>

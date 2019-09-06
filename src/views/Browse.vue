<template>
  <div>
  	<h1>Browse</h1>
    <div class="browse_layout">
      <div class="tree">
        <div class="tree_in">
          <tree-root :tenant_id="user_tenant_id" :path="path" :expanded="true"></tree-root>
        </div>
      </div>
      <div class="content">
      </div>
    </div>
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
<style scoped>
.browse_layout {
  display:flex;
}
.content {
  flex:1 1 auto;
}
.tree {
  height:100vh;
  flex:0 1 200px;
  padding:5px;
}
.tree_in {
  display: block;
}
</style>

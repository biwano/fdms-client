<template>
  <div v-if="root_path !== undefined">
  	<h1>Browse</h1>
    <div class="browse_layout">
      <div class="tree">
        <div class="tree_in">
          <tree-root :doc_id="root_path" v-model="doc"></tree-root>
        </div>
      </div>
      <div class="content">
        <document-detail :doc_id="path"></document-detail>
      </div>
    </div>
 </div>
</template>

<script>
import TreeRoot from "@/fdms-vue/TreeRoot.vue";
import DocumentDetail from "@/fdms-vue/DocumentDetail.vue";
import { PATH } from "@/fdms-vue/constants";

export default {
  name: "Browse",
  data() {
    return {
      root_path: undefined,
      doc: undefined
    };
  },
  created() {
    this.fdms_after_init(() => (this.root_path = "/"));
  },
  components: {
    TreeRoot,
    DocumentDetail
  },
  computed: {
    path() {
      return this.doc !== undefined ? this.doc[PATH] : undefined;
    },
    version() {
      return undefined;
    }
  }
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

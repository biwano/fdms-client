<template>
  <div v-if="local_root_path !== undefined">
    <div class="tree">
      <document-tree :doc_id="local_root_path" v-model="doc"></document-tree>
    </div>
  </div>
</template>

<script>
import DocumentTree from "@/fdms-vue/widgets/DocumentTree.vue";
import DocumentNavMixin from "@/mixins/documentNavMixin.js";

export default {
  name: "NavDocumentsTree",
  props: ["root_path"],
  mixins: [DocumentNavMixin],
  components: {
    DocumentTree
  }
};
</script>
<style scoped>
.tree {
  padding: 0.5em 0.75em;
  /*display: table-cell;
  padding: 5px;
  */
}
</style>

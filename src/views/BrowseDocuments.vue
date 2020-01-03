<template>
  <div>
  	<h1 class="title is-pulled-right">Documents</h1>
    <breadcrumb :doc_id="doc"></breadcrumb>
    <hr/>
    <document :doc_id="doc"></document>
  </div>
</template>

<script>
import Document from "@/fdms-vue/widgets/Document.vue";
import Breadcrumb from "@/fdms-vue/widgets/BreadCrumb.vue";
import DocumentNavMixin from "@/mixins/documentNavMixin.js";

export default {
  name: "BrowseDocuments",
  mixins: [DocumentNavMixin],
  components: {
    Document,
    Breadcrumb
  },
};
</script>
<style scoped>
.content {
  padding: 5px;
}
.tree {
  display: table-cell;
  padding: 5px;
}
.tree_in {
  display: block;
}
</style>

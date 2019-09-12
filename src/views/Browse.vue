<template>
  <div v-if="root_path !== undefined">
  	<h1>Browse</h1>
    <hr/>
    <breadcrumb :doc="doc"></breadcrumb>
    <hr/>
    <div class="browse_layout">
      <div class="tree">
          <tree-root :doc="root_path"></tree-root>
      </div>
      <div class="content">
        <document :doc="doc"></document>
      </div>
    </div>
 </div>
</template>

<script>
import TreeRoot from "@/fdms-vue/widgets/TreeRoot.vue";
import Document from "@/fdms-vue/widgets/Document.vue";
import Breadcrumb from "@/fdms-vue/widgets/BreadCrumb.vue";

export default {
  name: "Browse",
  data() {
    return {
      root_path: undefined,
      doc: undefined
    };
  },
  components: {
    TreeRoot,
    Document,
    Breadcrumb
  },
  watch: {
    $route(route) {
      this.update(route.params.path);
    }
  },
  created() {
    this.fdms_after_init(() => { 
      this.root_path = "/";
      this.update(this.$route.params.path);
    });
  },
  methods: {
    update(path) {
      this.doc = path || "/";
    }
  }
};
</script>
<style scoped>
.browse_layout {
  display: grid;
  grid-template-columns: minmax(max-content, 0.2fr) 1fr;
  grid-gap: 5px;
}
.content {
  display: table-cell;
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

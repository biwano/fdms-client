<template>
  <div v-if="root_path !== undefined">
  	<h1 class="title is-pulled-right">Create document</h1>
    <breadcrumb :doc_id="doc"></breadcrumb>
    <hr/>
    <document :doc_id="doc"></document>
 </div>
</template>

<script>
import Document from "@/fdms-vue/widgets/Document.vue";
import Breadcrumb from "@/fdms-vue/widgets/BreadCrumb.vue";

export default {
  name: "CreateDocument",
  data() {
    return {
      root_path: undefined,
      doc: undefined,
      new_doc: {}
    };
  },
  components: {
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
    async update(path) {
      path = path || "/";
      this.doc = await this.fdms_get(path);
    }
  }
};
</script>
<style scoped>

</style>

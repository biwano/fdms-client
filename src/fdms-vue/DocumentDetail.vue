<template>
  <div v-if="doc !== undefined && schema !== undefined">
    {{ doc.__path }}
    <hr/>
    <documents-list :docs="children" :columns="columns"></documents-list>
  </div>
</template>

<script>
import { SCHEMA_ID, VIEW_CONFIG } from "./constants.js";
import DocumentChildren from "./DocumentChildren.vue";
import DocumentsList from "./DocumentsList.vue";

export default {
  name: "DocumentDetail",
  components: { "document-children": DocumentChildren, DocumentsList },
  props: {
    doc_id: String,
    version: String
  },
  data() {
    return {
      doc: undefined,
      schema: undefined,
      config: undefined,
      children: undefined
    };
  },
  watch: {
    doc_id() {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.doc = await this.fdms_get(this.doc_id);
      this.children = await this.fdms_get_children(this.doc_id);
      //this.schema = await this.fdms_get_schema(this.doc[SCHEMA_ID]);
      this.config = await this.fdms_get_schema(this.doc[VIEW_CONFIG]);
    }
  },
  computed: {
    columns() {
      return this.config ? this.config.columns : [];
    }
  }
};
</script>
<style scoped>
</style>

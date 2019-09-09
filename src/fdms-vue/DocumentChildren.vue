<template>
  <div>
    <div v-for="(child, index) in children">
      {{ fdms_doc_label(child) }}
    </div>
  </div>
</template>
l
<script>
import { SCHEMA_ID } from "./constants.js";

export default {
  name: "DocumentChildren",
  data() {
    return {
      children: undefined,
      config: undefined
    };
  },
  props: {
    doc_id: String
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
      this.children = await this.fdms_get_children(this.doc_id);
      var doc = await this.fdms_get(this.doc_id);
      this.config = await this.fdms_get_schema(doc[SCHEMA_ID]);
      console.log(this.config);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.children {
  margin-left:14px;
}
.icon {
  margin-right:5px;
}
.node_layout {
  margin-bottom:2px;
}
.selected {
  color: #066;
  font-weight: bold;
}
</style>

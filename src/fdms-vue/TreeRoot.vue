<template>
  <div v-if="doc">
    <div >
      {{ label }}
    </div>
    
  </div>
</template>

<script>
import C from "./constants.js";

export default {
  name: "TreeRoot",
  data() {
    return {
      doc: {},
      label: ""
    }
  },
  props: {
    tenant_id: String,
    path: String,
  },
  watch: {
    tenant_id() {
      this.load();
    },
    path() {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.doc = await this.fdms_get(this.path);
      this.label = this.doc[C.PATH_SEGMENT]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

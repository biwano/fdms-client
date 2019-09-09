<template>
  <div v-if="doc !== undefined">
    {{ doc.__path }}
  </div>
</template>

<script>
export default {
  name: "DocumentDetail",
  props: {
    doc_id: String,
    version: String
  },
  data() {
    return {
      doc: undefined
    };
  },
  watch: {
    doc_id() {
      this.load();
    }
  },
  methods: {
    async load() {
      this.doc = await this.fdms_get(this.doc_id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

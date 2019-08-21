<template>
  <div>
  	<h1>Browse</h1>
 </div>
</template>

<script>

export default {
  name: "browse",
  data() {
    return {
      docs: [],
    }
  },
  created() {
    this.load();
    this.bus.$on("logged_in", this.load);
  },
  methods: {
    async load() {
      this.docs = await this.filter(this.tenant_id, { schema_id: "tenant"});
    }
  },
  components: {
  },
};
</script>

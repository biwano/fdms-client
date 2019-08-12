<template>
  <div>
  	    <h1>Tenants</h1>

	<div style="float:right"><font-awesome-icon icon="plus-circle" style="font-size: 50px"/></div>
  	<documents-list :docs="docs" :columns="columns"></documents-list>
  </div>
</template>

<script>
// @ is an alias to /src
import DocumentsList from "@/fdms-vue/DocumentsList.vue";
import bus from "@/bus"
export default {
  name: "tenants",
  data() {
  	return {
  		docs: [],
  		columns:[{"label": "Identifier", "attribute": "id"}]
  	}
  },
  created() {
  	this.load();
    bus.$on("logged_in", this.load);
  },
  methods: {
  	async load() {
    	this.docs = await this.filter(this.tenant_id, { schema_id: "tenant"});
  	},
  },
  components: {
    "documents-list": DocumentsList
  },
  computed : {
    tenant_id: function() { 
      return this.$store.state.tenant_id; 
    }
  }
};
</script>

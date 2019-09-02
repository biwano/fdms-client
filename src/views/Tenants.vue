<template>
  <div>
  	    <h1>Tenants</h1>

  	<div style="float:right">
      <router-link to="/tenants/create">
        <font-awesome-icon icon="plus-circle" class="big-icon"/>
      </router-link>
    </div>

    <documents-list :docs="docs" :columns="columns">
      <template v-slot:custom-headers>
        <th>Actions</th>
      </template>
      <template v-slot:custom-values="slotProps">
        <td>
          <a href="#">
            <font-awesome-icon icon="trash" class="icon-link" v-on:click="delete_tenant_(slotProps.doc.id)"/>
          </a>

        </td>
      </template>
    </documents-list>
  </div>
</template>

<script>
// @ is an alias to /src
import DocumentsList from "@/fdms-vue/DocumentsList.vue";
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
    this.bus.$on("logged_in", this.load);
  },
  methods: {
  	async load() {
    	this.docs = await this.filter(this.tenant_id, { __schema_id: "__tenant"});
  	},
    delete_tenant_(tenant_id) {
      this.busy_while(
        this.delete_tenant(tenant_id).then(() => {
            this.global_info(`Tenant ${tenant_id} deleted`);
            this.load();
        }).catch((e) => {
            this.global_error("Could not delete tenant");          
        })
      );
    },
  },
  components: {
    "documents-list": DocumentsList
  }
};
</script>

<template>
  <div>
    <documents-list :docs="docs" :columns="columns">
      <template v-slot:custom-headers>
        <th>Actions</th>
      </template>
      <template v-slot:custom-values="slotProps">
        <td>
          <fdms-clickable-icon icon="trash" v-on:click="delete_tenant_(slotProps.doc.id)"></fdms-clickable-icon>
          <fdms-clickable-icon icon="sync-alt" v-on:click="refresh_tenant_(slotProps.doc.id)"></fdms-clickable-icon>
        </td>
      </template>
    </documents-list>
  </div>
</template>

<script>
// @ is an alias to /src
import DocumentsList from "@/fdms-vue/widgets/DocumentsList.vue";
import C from "@/fdms-vue/constants.js";
export default {
  name: "tenants",
  data() {
  	return {
  		docs: [],
  		columns:["id"]
  	}
  },
  created() {
  	this.fdms_after_init(this.load);
  },
  methods: {
  	async load() {
      var body = {};
      body[C.SCHEMA_ID] = C.TENANT_SCHEMA_ID;
    	this.docs = await this.fdms_filter(body);
  	},
    delete_tenant_(tenant_id) {
      this.busy_while(
        this.fdms_delete_tenant(tenant_id).then(() => {
            this.global_info(`Tenant ${tenant_id} deleted`);
            this.load();
        }).catch((e) => {
            this.global_error("Could not delete tenant");
        })
      );
    },
    refresh_tenant_(tenant_id) {
      this.busy_while(
        this.fdms_refresh_tenant(tenant_id).then(() => {
            this.global_info(`Tenant ${tenant_id} refreshed`);
            this.load();
        }).catch((e) => {
            this.global_error("Could not refresh tenant");
        })
      );
    },
  },
  components: {
    "documents-list": DocumentsList
  }
};
</script>

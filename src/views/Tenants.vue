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
import C from "@/fdms-vue/constants.js";
import bus from "@/fdms-vue/bus.js";
export default {
  name: "tenants",
  data() {
  	return {
  		docs: [],
  		columns:[{"label": "Identifier", "attribute": "id"}]
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
  },
  components: {
    "documents-list": DocumentsList
  }
};
</script>

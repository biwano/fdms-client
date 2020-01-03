<template>
  <div>
    <div>
  	 <h1 class="title is-pulled-right">Create tenant</h1>
    </div>
    <div class="field is-clearfix">
      <label class="label">Tenant ID</label>
      <div class="control">
        <input class="input" type="text" placeholder="ID" id="id" v-model="id" :disabled="is_fdms_busy()">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" id="drop" v-model="drop" :disabled="is_fdms_busy()">Drop tenant if it exists</a>
        </label>
      </div>
    </div>
    
    <fdms-button icon="save" @click="submit">Create</fdms-button>
    <fdms-button icon="ban" class="is-light" @click="cancel">Cancel</fdms-button>
  </div>
</template>

<script>

export default {
  name: "create_tenant",
  data() {
  	return {
  		id: "__root",
      drop:true
  	}
  },
  components: {
  },
  methods: {
  	submit() {
      this.fdms_busy_while(
    		this.fdms_create_tenant(this.id, this.drop).then(() => {
            this.global_info(`Tenant ${this.id} created`);
            this.$router.push("/tenants");
    		}).catch((e)=> {
    				this.global_error("Could not create tenant");
    		})
      );
  	},
    cancel() {
      this.$router.push("/tenants");
    }
  }
};
</script>

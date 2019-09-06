<template>
  <div>
  	<h1>Create tenant</h1>
    <form class="pure-form pure-form-stacked">
	    <fieldset>
          <label for="id">Tenant ID</label>
	        <input type="text" placeholder="ID" id="id" v-model="id"/>
          
          <label for="drop">Drop tenant if it exists</label> 
          <input type="checkbox" id="drop" v-model="drop"><br/>
	        
          <button  type="button" class="pure-button pure-button-primary" v-on:click="submit">Create</button>

	    </fieldset>
	  </form>
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
      this.busy_while(
    		this.fdms_create_tenant(this.id, this.drop).then(() => {
            this.global_info(`Tenant ${this.id} created`);
            this.$router.push("/tenants")
    		}).catch((e)=> {
    				this.global_error("Could not create tenant");
    		})
      );
  	}
  }
};
</script>

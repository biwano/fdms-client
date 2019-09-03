<template>
  <div>
  	<h1>Login</h1>
    <form class="pure-form pure-form-stacked">
	    <fieldset>
	        <input type="text" placeholder="Login" v-model="login"/>
	        <input type="password" placeholder="Password"  v-model="password"/>

	        <button  type="button" class="pure-button pure-button-primary" v-on:click="submit">Sign in</button>

	    </fieldset>
	  </form>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
  	return {
  		login: "",
  		password: ""
  	}
  },
  components: {
  },
  methods: {
  	submit() {
  		this.clear_messages();
  		this.fdms_sign_in("*", this.login, this.password).then((user) => {
  			this.$store.commit("set_user", user);
  			this.$router.push("/tenants");
  		}).catch((e)=> {
  			if (e.response.status == "401") {
  				this.global_error("Invalid credentials");
  			}
  			return e;
  		});
  	}
  }
};
</script>

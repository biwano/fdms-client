<template>
  <div>
  	<h1>Login</h1>
      <input class="input" type="text" placeholder="Login" v-model="login"/>
      <input class="input" type="password" placeholder="Password"  v-model="password"/>

      <fdms-button class="button"  type="button" v-on:click="submit">Sign in</fdms-button>
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

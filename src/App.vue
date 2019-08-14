<template>
  <div id="layout">
    <!-- Menu toggle -->
    <div id="menu">
      <div>

        <ul>
          <li>    <span class="item heading">The Free DMS</span></li>
          <li>    <span class="item heading">{{ $store.state.tenant_id}}</span></li>
              <hr/>
          <li>  <router-link to="/tenants"  class="item link">
            <font-awesome-icon icon="home" />Tenants
          </router-link></li>
              <hr/>
          <li><router-link to="/login"  class="item link">
                      <font-awesome-icon icon="sign-out-alt" />Logout
              </router-link></li>
        </ul>
      </div>
    </div>
    <div id="main">
      <messages category="global"></messages>
      <span v-if="$store.state.busy" class="spinner">
        <font-awesome-icon icon="cog" spin />
      </span>
    <router-view />
    </div>
  </div>
</template>
<script>
import Messages from "@/components/Messages.vue";
 
export default {
  name: "App",
  components: {
    'messages': Messages
  },
  created() {
    this.get_user().then((user) => {
      this.$store.commit("set_user", user);
    });
  },
  methods: {
    submit() {
      this.sign_in("*", this.login, this.password).then((user) => {
        this.$store.commit("set_user", user);
        this.$router.push('/');
      }).catch(()=> {
        this.$store.commit()
      });
    }
  }
};
</script>
<style>
#menu {
  float:left;
  height:100vh;
  background-color:#033;
  margin-right: 15px;

}
#main {
  padding-left: 5px;
  padding-right: 5px;
}
body {
  color:#022;
  font-family: 'Open Sans';
}
h1 {
  margin-top:0 !important;
}
ul {
  padding:0px;
  padding-top: 5px;
  margin:0;
}
.heading {
  text-transform: uppercase;
}
.item {
  padding:10px;
  display:block;
}
li a {
  text-transform: uppercase;
  text-decoration:none;
  color: white;
}
li a:hover {
   background-color:#033; 
   color:white;
}
li a.router-link-exact-active {
   background-color:#044; 
}
li {
    color: white;
}
.pure-button-primary {
  background-color: #044 !important;
}
a {
  color:#022;
}
a:hover {
  color:#044;
}
.big-icon {
  font-size: 50px;
}
.spinner {
  font-size: 50px;
  float:right;  
}
</style>

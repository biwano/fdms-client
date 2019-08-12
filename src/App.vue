<template>
  <div id="layout">
    <!-- Menu toggle -->
    <div id="menu">
      <div>
        <ul>
          <li>    <span class="item heading">The Free DMS</span></li>
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
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  -->
    <div id="main">
      <messages category="global"></messages>
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
  background-color:#022;
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
</style>

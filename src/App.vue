<template>
  <div id="layout">
    <!-- Menu toggle -->
    <div id="menu">
      <navigation></navigation>
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
import Nav from "@/components/Nav.vue";
 
export default {
  name: "App",
  components: {
    'messages': Messages,
    'navigation': Nav
  },
  created() {
    this.fdms_get_user();
  },
  methods: {
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
  float:left;
  padding-left: 5px;
  padding-right: 5px;
}
body {
  color:#022;
  font-family: Helvetica,Arial,sans-serif;
}
h1 {
  margin-top:0 !important;
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

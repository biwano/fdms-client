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
      <div id="route_content">
        <router-view />
      </div>
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
  flex: 0 1 150px;
  height:100vh;
  background-color:#033;
}
#main {
  flex:1 1 auto;
}
#route_content {
  padding:5px;
}
body {
  color:#022;
  font-family: Helvetica,Arial,sans-serif;
}
h1 {
  margin-top:0 !important;
}
th {
  background-color:#033;
  color:white;
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
<style>
#layout {
  display:flex;
  flex-direction:row;
}
</style>
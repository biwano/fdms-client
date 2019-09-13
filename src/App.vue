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
    "messages": Messages,
    "navigation": Nav
  },
  created() {
    this.fdms_get_user();
    this.fdms_info("init");
    this.fdms_bus().$on("navigate", path => {
      path = this.fdms_as_path(path);
      this.$router.push({ name: "browse", params: { path } });
    });
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
.clickable {
  cursor: pointer;
}
.clickable:hover {
  color:#044;
}
.icon-link {
  margin-right:15px;
}
hr {
  margin-block-end: 0px;
  margin-block-start: 0px;
}
</style>
<style>
#layout {
  display:flex;
  flex-direction:row;
}
</style>
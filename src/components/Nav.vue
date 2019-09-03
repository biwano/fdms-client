<template>
  <div>
    <ul>
      <nav-entry>{{ user_tenant_id}}</nav-entry>
      <nav-entry>The Free DMS</nav-entry>
      <hr/>
      <nav-entry to="/browse" icon="folder">Browse</nav-entry>
      <nav-entry to="/tenants" icon="home">Tenants</nav-entry>
      <hr/>
      <nav-entry to="/login" icon="sign-out-alt">Logout</nav-entry>
    </ul>
  </div>
</template>
<script>
import NavEntry from "@/components/NavEntry.vue";
 
export default {
  name: "Nav",
  components: {
    "nav-entry": NavEntry
  },
};
</script>
<style scoped>
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
</style>

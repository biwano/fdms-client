<template>
  <div class="layout">
    <div class="top">
    <ul>
      <nav-entry>The Free DMS</nav-entry>
      <hr/>
      <nav-entry>{{ $store.getters.user.tenant_id}}</nav-entry>
      <hr/>
      <nav-entry to="/documents/browse" icon="folder">Browse</nav-entry>
      <nav-entry to="/tenants" icon="home">Tenants</nav-entry>
    </ul>
    </div>
    <div class="bottom">
    <ul>
      <nav-entry to="/login" icon="sign-out-alt">{{ $store.getters.user.user_id}}</nav-entry>
    </ul>
    </div>
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
.layout {
  display:flex;
  flex-direction:column;
  height:100%;
}
.top {
  flex: 1 1 auto;
}
.bottom {
  flex: 0 1 20px; 
}
ul {
  padding:0px;
  padding-top: 5px;
  margin:0;
}
.item {
  padding:10px;
  display:block;
}
</style>

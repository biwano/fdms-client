<template>
  <aside class="menu">
    <p class="menu-label">
      {{ $store.getters.user.tenant_id}}
    </p>
    <ul class="menu-list">
      <nav-entry to="/documents/browse" icon="folder"><span>Browse</span></nav-entry>
      <li :class="sub_nav_class('/documents')">
        <nav-documents-tree root_path="/meta"></nav-documents-tree>
      </li>
      <nav-entry to="/tenants" icon="home">Tenants</nav-entry>
      <li :class="sub_nav_class('/tenants')">
        <ul>
          <nav-entry to="/tenants/create" icon="plus-circle">Create tenant</nav-entry>
        </ul>
      </li>

    </ul>
    <p class="menu-label">
      {{ $store.getters.user.user_id}}
    </p>
    <ul class="menu-list">
      <nav-entry to="/login" icon="sign-out-alt">Logout</nav-entry>
    </ul>
  </aside>
</template>
<script>
import NavEntry from "@/components/NavEntry.vue";
import NavDocumentsTree from "@/components/NavDocumentsTree.vue";
 
export default {
  name: "Nav",
  components: {
    "nav-entry": NavEntry,
    "nav-documents-tree": NavDocumentsTree
  },
  methods: {
    sub_nav_class(route) {
      var is_active = this.$route.path.startsWith(route);
      return {
        sub_nav_active: is_active,
        sub_nav_inactive: !is_active
      }
    }
  }
};
</script>
<style scoped>
.sub_nav_active {
  transition: 1s;
  max-height: 1000px;
  overflow: hidden;
}
.sub_nav_inactive {
  transition: 1s;
  max-height: 0;
  overflow: hidden;
}
</style>

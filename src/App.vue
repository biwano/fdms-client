<template>
  <div>
    <div id="layout">
      <!-- Menu toggle -->
      <navigation></navigation>
      <div id="main">
        <div id="route_content">
          <router-view />
        </div>
      </div>
    </div>
    <div id="notifications">
      <messages category="global"></messages>
    </div>
    <span :class="spinner_class">
        <fdms-icon icon="cog" :spin="true" />
    </span>
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
      this.$router.push({ name: "browse_documents", params: { path } });
    });
    this.fdms_bus().$on("create_document_requested", path => {
      this.$router.push({ name: "create_document", params: { path } });
    });
    
    this.fdms_bus().$on("saved", doc => {
      this.global_info(`Document ${doc.__path_segment} saved`);
    });
    this.fdms_bus().$on("new_document_canceled", path => {
      this.$router.push({ name: "browse_documents", params: { path } });
    });
    
      
  },
  computed: {
    spinner_class() {
      return {
        spinner: true,
        "spinner-active": this.is_fdms_busy()
      };
    }
  }
};
</script>

<style>
#layout {
  display:flex;
  flex-direction:row;
}
#main {
  flex:1 1 auto;
}
#notifications {
  position: absolute;
  bottom: 0px;  
  width:100%;
}
.spinner {
  font-size: 50px;
  float:right;  
  opacity: 0;
  position: absolute;
  right: -50px;
  bottom: 0;
  transition: 1s;
  color:#3273dc;
}
.spinner-active {
  transition: 1s;
  opacity: 1;
  right: 0px;
}
</style>
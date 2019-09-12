import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Tenants from "./views/Tenants.vue";
import CreateTenant from "./views/CreateTenant.vue";
import Browse from "./views/Browse.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Login },
    { path: "/login", name: "login", component: Login },
    { path: "/tenants", name: "tenants", component: Tenants },
    { path: "/tenants/create", name: "create_tenant", component: CreateTenant },
    { path: "/browse/:path*", name: "browse", component: Browse },

  ]
});

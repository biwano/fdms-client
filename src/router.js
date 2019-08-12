import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Tenants from "./views/Tenants.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Login
    },
    {
      path: "/tenants",
      name: "tenants",
      component: Tenants
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    }
  ]
});

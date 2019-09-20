<template>
  <li>  
    <router-link v-if="link" :to="to"  class="item link">
      <font-awesome-icon :icon="icon" class="icon"/><slot></slot>
    </router-link>
    <span v-if="!link" class="item heading"><slot></slot></span>
  </li>
</template>
<script>
 
export default {
  props: ["to", "icon", "label"],
  name: "NavEntry",
  computed: {
    link() {
      return this.to!== undefined;
    }
  }
};
</script>
<style scoped>
li a {
  text-transform: uppercase;
  text-decoration:none;
  color: white;
}
li a:hover {
   background-color:#044; 
   color:white;
}
li a.router-link-active {
   background-color:#066; 
}
li {
    color: white;
}
.heading {
  text-transform: uppercase;
}
.item {
  padding:10px;
  display:block;
}
.icon {
  margin-right:5px;
}

</style>

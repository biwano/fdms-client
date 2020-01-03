<template>
  <li>
    <router-link
      ref="link"
      v-if="is_link"
      :to="to"
      class="link"
      :class="link_class"
    >
      <fdms-icon :icon="icon" class="icon" /><span class="slot"
        ><slot></slot
      ></span>
    </router-link>
    <span v-else class="slot"><slot></slot></span>
  </li>
</template>
<script>
export default {
  props: ["to", "icon", "label"],
  name: "NavEntry",
  data() {
    return {
      link_class: { 
        "is-active": false,
        link: true
      }
    };
  },
  mounted() {
    this.update_link_class(this.$route);
  },
  watch: {
    $route(route) {
      this.update_link_class(route);
    }
  },
  methods: {
    update_link_class(route) {
      this.link_class = {
        "is-active": route.path === this.to,
        link: true
      };
    }
  },
  computed: {
    is_link() {
      return this.to !== undefined;
    }
  }
};
</script>
<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
.slot {
  display: inline-block;
  vertical-align: middle;
}
</style>

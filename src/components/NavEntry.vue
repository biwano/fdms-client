<template>
  <li>
    <router-link
      ref="link"
      v-if="is_link"
      :to="to"
      class="link"
      :class="link_class"
    >
      <font-awesome-icon :icon="icon" class="icon" /><span class="slot"
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
  watch: {
    $route(val) {
      this.link_class = {
        "is-active": val.path === this.to,
        link: true
      };
    }
  },
  mounted() {
    /*
    this.observer = new MutationObserver(mutations => {
          this.computeLinkClass();
    });
    this.observer.observe(this.$refs.link.$el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["class"]
    });
    this.computeLinkClass();
    */
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    computeLinkClass() {
      this.link_class = {
        "is-active":
          this.$refs.link &&
          this.$refs.link.$el.classList.contains("router-link-active"),
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
  margin-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
.slot {
  display: inline-block;
  vertical-align: middle;
}
</style>

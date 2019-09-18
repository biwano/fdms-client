<template>
  <span>
    <span v-if="children">
        <documents-list :docs="children" :columns="config.columns"></documents-list>
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetList",
  mixins: [widget_mixin],
  components: { DocumentsList: () => import("./DocumentsList.vue") },
  data() {
    return {
      children: []
    };
  },
  created() {
    this.load();
  },
  watch: {
    doc() {
      this.load();
    }
  },
  methods: {
    async load() {
      var filter = this.config.filter;
      if (filter && this.doc) {
        for (var key in filter) {
          filter[key] = this.fdms_interpolate(filter[key], { doc: this.doc });
        }
        this.children = await this.fdms_filter(filter);
      }
    }
  }
};
</script>

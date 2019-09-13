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
  name: "WidgetChildren",
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
      this.children = await this.fdms_get_children(this.doc);
    }
  }
};
</script>

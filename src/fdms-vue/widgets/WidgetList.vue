<template>
  <span>
    <span v-if="docs.length">
        <documents-list :docs="docs" :columns="config.columns"></documents-list>
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
      docs: []
    };
  },
  methods: {
    async widget_update() {
      var filter = {};
      this.docs = [];
      if (this.config.filter && this.doc) {
        for (var key in this.config.filter) {
          filter[key] = this.fdms_interpolate(this.config.filter[key], { doc: this.doc });
        }
        this.docs = await this.fdms_filter(filter);
        this.fdms_trace("List updated", this.docs);
      } else this.fdms_trace("List not updated", this.doc, this.config.filter);
    }
  }
};
</script>

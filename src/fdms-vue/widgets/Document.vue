<template>
  <div v-if="doc_ && view_config" class="pure-g">
    <div v-for="widget in layout" class="pure-u-1-3">
      <b v-if="widget.label">{{widget.label}} : </b>
      <widget-proxy :widget="widget" :doc="doc_" :schema="schema"></widget-proxy>
      <br/>
      
    </div>
  </div>
</template>

<script>
import WidgetProxy from "./WidgetProxy.vue";
import doc_mixin from "./doc_mixin.js";

export default {
  name: "Document",
  components: { WidgetProxy },
  mixins: [doc_mixin],
  props: {
    version: String
  },
  data() {
    return {
      schema: undefined,
      children: undefined,
      view_config: undefined
    };
  },
  methods: {
    async load() {
      this.view_config = await this.fdms_get_view_config(this.doc_);
      this.schema = await this.fdms_get_schema_full(this.doc_);
    }
  },
  computed: {
    layout() {
      var layout = [];

      if (this.view_config && this.view_config.layout && this.schema) {
        layout = this.view_config.layout;
        for (var i in layout) {
          this.fdms_configure_widget(layout[i], this.schema);
        }
      }
      return layout;
    }
  }
};
</script>
<style scoped>
</style>

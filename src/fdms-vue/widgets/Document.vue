<template>
  <div v-if="doc_ && view_config">
    <div v-for="widget in layout">
      <b v-if="widget.label">{{widget.label}} : </b>
      <widget-proxy :widget="widget" v-model="doc_[widget.config.model]" :doc="doc_" ></widget-proxy>
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
          layout[i] = this.fdms_configure_widget(layout[i], this.schema);
        }
      }
      return layout;
    }
  }
};
</script>
<style scoped>
</style>

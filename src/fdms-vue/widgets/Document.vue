<template>
  <div v-if="layout">
    <div v-for="widget in layout">
      <b v-if="widget.config.label">{{widget.config.label}} : </b>
      <widget-proxy :widget="widget" v-model="doc[widget.config.model]" :doc="doc" ></widget-proxy>
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
      view_config: undefined
    };
  },  
  methods: {
    async load() {
      this.view_config = undefined;
      this.schema = undefined;
      this.view_config = await this.fdms_get_view_config(this.doc);
      this.schema = await this.fdms_get_schema_full(this.doc);
    }
  },
  computed: {
    layout: {
      get() {
        var layout = [];
        if (this.view_config && this.view_config.layout && this.schema) {
          layout = this.view_config.layout;
          for (var i in layout) {
            layout[i] = this.fdms_configure_widget(layout[i], this.schema);
          }
          this.fdms_trace("Layout computed", layout);
        }
        else this.fdms_trace("Layout not computed yet.", "view config:", this.view_config, "schema", this.schema);
        return layout;
      },
      set(layout) {
        this.layout = layout;
      }
    }
  }
};
</script>
<style scoped>
</style>

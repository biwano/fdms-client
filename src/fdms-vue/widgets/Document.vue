<template>
  <div v-if="layout">
    <div style="float:right">
      <font-awesome-icon icon="edit" class="fdms-big-icon fdms-clickable" @click="set_mode('edit')" v-if="fdms_doc_is_writable(doc) && mode=='view'"/>
      <font-awesome-icon icon="ban" class="fdms-big-icon fdms-clickable" @click="set_mode('view')" v-if="mode=='edit'"/>
    </div>
    <div v-for="widget in layout">
      <b v-if="widget.config.label">{{widget.config.label}} : </b>
      <widget-proxy :widget="widget" v-model="doc[widget.config.model]" :doc="doc" :mode="mode"></widget-proxy>
      <br/>
    </div>
    <button type="button" class="pure-button pure-button-primary" v-on:click="save" v-if="mode=='edit'">Save</button>
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
      view_config: undefined,
      mode: "view"
    };
  },
  methods: {
    async load() {
      this.view_config = undefined;
      this.schema = undefined;
      this.view_config = await this.fdms_get_view_config(this.doc);
      this.schema = await this.fdms_get_schema_full(this.doc);
    },
    set_mode(mode) {
      this.mode = mode;
    },
    async save() {
      await this.fdms_update(this.doc);
      this.set_mode('view');
      this.load();
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

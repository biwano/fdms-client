<template>
  <div v-if="widgets">
    <div style="float:right">
      <span v-if="fdms_doc_is_writable(doc)" >
        <fdms-button @click="set_mode('edit')" icon="edit" v-if="is_view">Edit document</fdms-button>
        <fdms-button icon="save" @click="save" v-if="is_edit">Save</fdms-button>
        <fdms-button icon="ban" class="is-light" @click="set_mode('view')" v-if="is_edit">Cancel</fdms-button>
      </span>
    </div>
    <!-- Select schema for new documents -->
    <select v-if="is_new">
    </select>
    <!-- Widgets -->
    <div v-for="widget in widgets">
      <b v-if="widget.label">{{widget.label}} </b>
      <widget-proxy :widget="widget" v-model="doc[widget.model]" :doc="doc" :mode="mode_"></widget-proxy>
      <br/>
    </div>
    <!-- Save document -->

    <!-- Create children -->
    <fdms-icon v-if="!is_new" icon="plus-circle" class="fdms-big-icon fdms-clickable" @click="create_child"/>
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
    version: String,
    mode: String 
  },
  data() {
    return {
      schema: undefined,
      view_config: undefined,
      mode_: "view"
    };
  },
  created() {
    if (this.mode) this.set_mode(this.mode);
  },
  methods: {
    async load() {
      this.view_config = undefined;
      this.schema = undefined;
      this.view_config = await this.fdms_get_view_config(this.doc);
      this.schema = await this.fdms_get_schema_full(this.doc);
    },
    set_mode(mode) {
      this.mode_ = mode;
    },
    create_child() {
      this.fdms_bus().$emit("create_document_requested", this.path);
      
      
    },
    async save() {
      await this.fdms_update(this.doc);
      this.fdms_bus().$emit("saved", this.doc);
      this.set_mode('view');
      this.load();
    },
    cancel_new() {
      this.fdms_bus().$emit("new_document_canceled", this.path);
    }
  },
  computed: {
    widgets: {
      get() {
        var widgets = [];
        if (this.view_config && this.view_config.widgets && this.schema) {
          widgets = this.view_config.widgets;
          for (var i in widgets) {
            widgets[i] = this.fdms_configure_widget(widgets[i], this.schema);
          }
          this.fdms_trace("Widgets computed", widgets);
        }
        else this.fdms_trace("Layout not computed yet.", "view config:", this.view_config, "schema", this.schema);
        return widgets;
      },
      set(widgets) {
        this.widgets = widgets;
      }
    },
    is_new() {
      return this.mode_ == 'new';
    },
    is_edit() {
      return this.mode_ == 'edit';
    },
    is_view() {
      return this.mode_ == 'view';
    }
  }
};
</script>
<style scoped>
</style>

<template>
  <div v-if="doc_ && view_config" class="pure-g">
    <div v-for="item in layout" class="pure-u-1-3">
      <b v-if="item.label">{{item.label}} : </b>
      <component v-bind:is="`widget-${item.type}`" :model="item.model" :doc="doc_" :config="item.config"></component>
      <br/>
      
    </div>
    <hr/>
    <!--<documents-list :docs="children" :columns="columns"></documents-list>-->
  </div>
</template>

<script>
import DocumentsList from "./DocumentsList.vue";
import WidgetText from "./WidgetText.vue";
import WidgetChildren from "./WidgetChildren.vue";
import doc_mixin from "../mixins/doc.js";
import { SCHEMA_ID } from "../constants.js";

export default {
  name: "Document",
  components: { DocumentsList, WidgetText, WidgetChildren },
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
      var autoprops = {
        keyword: "text",
        boolean: "boolean",
        date: "date",
        json: "text"
      };
      if (this.view_config && this.view_config.layout && this.schema) {
        layout = this.view_config.layout;
        for (var i in layout) {
          var item = layout[i];
          if (item.type === "auto") {
            var model = item.config.model;
            var prop = this.schema.properties[model];
            if (prop) {

              item.type = autoprops[prop.type];
              if (prop.list === true) {
                item = { 
                  type: "list",
                  label: model,
                  config: {
                    widgets_config: item
                  }
    }
              } else {
              if (!item.label) {
                item.label = model;
              }
            }
            }
            else this.fdms_log("Auto mapping failedUnknown property :", item.config.model, "for schema :", this.doc_[SCHEMA_ID]);
            
          }
        }
      }
      return layout;
    }
  }
};
</script>
<style scoped>
</style>

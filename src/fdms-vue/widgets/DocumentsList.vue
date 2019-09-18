<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th v-for="widget in columns_">{{ widget.config.label}}</th>
          <slot name="custom-headers"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td v-for="widget in item.widgets">
            <widget-proxy :widget="widget" :doc="item.doc" v-model="item.doc[widget.config.model]"></widget-proxy>
          </td>
          <slot name="custom-values" v-bind:doc="item.doc"></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

import WidgetProxy from "./WidgetProxy.vue";

export default {
  name: "DocumentsList",
  components: { WidgetProxy },
  props: {
    docs: Array,
    columns: Array
  },
  data() {
    return {
      items: []
    };
  },
  watch: {
    async docs() {
      var items = [];
      this.items = [];
      if (this.docs) {
        for (var i in this.docs) {
          var schema = await this.fdms_get_schema_full(this.docs[i]);
          var widgets = [];
          for (var j = 0; j < this.columns.length; j++) {
            this.fdms_debug(j, this.columns);
            widgets.push(this.fdms_configure_widget(this.columns[j], schema));
          }
          var item = {
            doc: this.docs[i],
            schema,
            widgets
          };
          items.push(item);
        }
      }
      this.items = items;
    }
  },
  computed: {
    columns_() {
      var columns = [];
      for (var i in this.columns) {
        var col = this.fdms_configure_widget(this.columns[i]);
        columns.push(col);
      }
      this.fdms_debug("headers", columns);
      return columns;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

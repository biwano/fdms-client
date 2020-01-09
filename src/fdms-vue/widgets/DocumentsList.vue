<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="widget in headers">{{ widget.label}}</th>
          <slot name="custom-headers"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td v-for="widget in item.widgets">
            <widget-proxy :widget="widget" :doc="item.doc" v-model="item.doc[widget.model]"></widget-proxy>
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
    widgets: Array
  },
  computed: {
    headers() {
      var headers = [];
      for (var i in this.widgets) {
        var col = this.fdms_configure_widget(this.widgets[i]);
        headers.push(col);
      }
      this.fdms_trace("Headers configured", headers);
      return headers;
    }
  },
  asyncComputed: {
    async items() {
      var items = [];
      this.items = [];
      if (this.docs) {
        this.fdms_trace("Configuring rows. Source", this.widgets);
        for (var i in this.docs) {
          var schema = await this.fdms_get_schema_full(this.docs[i]);
          var widgets = [];
          for (var j = 0; j < this.widgets.length; j++) {
            widgets.push(this.fdms_configure_widget(this.widgets[j], schema));
          }
          var item = {
            doc: this.docs[i],
            schema,
            widgets
          };
          items.push(item);
        }
        this.fdms_trace("Configuring rows. Result", items);
      } else this.fdms_trace("Rows not configured", this.docs);
      return items;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

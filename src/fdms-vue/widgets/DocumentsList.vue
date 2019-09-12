<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th v-for="column in columns_">{{column.label}}</th>
          <slot name="custom-headers"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docs">
          <td v-for="column in columns_">
            <span v-if="column.link" class="clickable" @click="fdms_navigate(doc)">{{ doc[column.model] }}</span>
            <span v-if="!column.link">{{ doc[column.model] }}</span>
          </td>
          <slot name="custom-values" v-bind:doc="doc"></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DocumentsList",
  props: {
    docs: Array,
    columns: Array
  },
  computed: {
    columns_() {
      var columns = [];
      for (var i in this.columns) {
        var col = this.columns[i];
        if (typeof col === "object") {
          if (!col.label) col.label = col.model;
          if (!col.link) col.link = false;
          columns.push(col);
        } else columns.push({
          "label" : col,
          "model" : col,
          "link": false
        });
      }
      return columns;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th v-for="column in columns">{{column.label}}</th>
          <slot name="custom-headers"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docs">
          <td v-for="column in columns">
            {{ doc[column.attribute] }}
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

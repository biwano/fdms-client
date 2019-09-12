<template>
  <span v-if="config && children">
      <documents-list :docs="children" :columns="config.columns"></documents-list>
  </span>
</template>

<script>
import widget_mixin from "../mixins/doc.js";
import DocumentsList from "./DocumentsList.vue";

export default {
  name: "WidgetChildren",
  mixins: [widget_mixin],
  components: { DocumentsList },
  data() {
    return {
      children: []
    };
  },
  methods: {
    async widget_load() {
      this.children = await this.fdms_get_children(this.doc);
    }
  }
};
</script>

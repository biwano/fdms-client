<template>
  <div class="node_layout">
    <div v-for="(child, index) in children">
      <span v-if="!child.___expanded" v-on:click="expand(child, index)">
        <font-awesome-icon icon="caret-down" class="icon clickable"/>
        <font-awesome-icon  icon="folder" class="icon clickable"/>
      </span>
      <span v-if="child.___expanded" v-on:click="unexpand(child, index)">
        <font-awesome-icon icon="caret-right" class="icon clickable"/>
        <font-awesome-icon icon="folder-open" class="icon clickable"/>
      </span>
      <span @click="select_ui(child)" :class="{ selected:isSelected(child) }"  class="clickable">{{ child.___label }}</span>
      </a>
      <div v-if="child.___expanded"  class="children">
        <tree-root :tenant_id="user_tenant_id" :doc="fdms_doc_path(child, index)" v-model="selected"></tree-root>
      </div>
    </div>
  </div>
</template>

<script>
import { FACETS, FACET_SHOW_IN_TREE, PATH } from "../constants.js";
import doc_mixin from "./doc_mixin.js";

export default {
  name: "TreeRoot",
  mixins: [doc_mixin],
  data() {
    return {
      children: undefined,
      selected: undefined
    };
  },
  props: {
    value: Object
  },
  watch: {
    selected(child) {
      this.select(child);
    },
    value(value) {
      this.selected = value;
    }
  },
  created() {
    this.load();
  },
  methods: {
    expand(child, index) {
      child.___expanded = true;
      this.$set(this.children, index, child);
    },
    unexpand(child, index) {
      child.___expanded = false;
      this.$set(this.children, index, child);
    },
    select(child) {
      this.selected = child;
      this.$emit("input", child);
    },
    select_ui(child) {
      this.fdms_navigate(child);
      this.select(child);
    },
    isSelected(child) {
      return this.selected !== undefined && this.selected[PATH] == child[PATH];
    },
    async load() {
      var params = {};
      params[FACETS] = FACET_SHOW_IN_TREE;
      this.children = await this.fdms_get_children(this.doc, params);
      for (var index in this.children) {
        var child = this.children[index];
        child.___expanded = false;
        child.___label = this.fdms_doc_label(child);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.children {
  margin-left:14px;
}
.icon {
  margin-right:5px;
}
.node_layout {
  margin-bottom:2px;
}
.selected {
  color: #066;
  font-weight: bold;
}
</style>

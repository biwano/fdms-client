<template>
  <div class="node_layout">
    <div v-for="(child, index) in children" class="clickable">
      <span v-if="!child.___expanded" v-on:click="expand(child, index)">
        <font-awesome-icon icon="caret-down" class="icon"/>
        <font-awesome-icon  icon="folder" class="icon"/>
      </span>
      <span v-if="child.___expanded" v-on:click="unexpand(child, index)">
        <font-awesome-icon icon="caret-right" class="icon"/>
        <font-awesome-icon icon="folder-open" class="icon"/>
      </span>
      <span @click="select(child)" :class="{ selected:isSelected(child) }">{{ child.___label }}</span>
      </a>
      <div v-if="child.___expanded"  class="children">
        <tree-root :tenant_id="user_tenant_id" :doc_id="fdms_doc_path(child, index)" v-model="selected"></tree-root>
      </div>
    </div>
  </div>
</template>

<script>
import {FACETS, FACET_SHOW_IN_TREE, PATH} from "./constants.js";

export default {
  name: "TreeRoot",
  data() {
    return {
      children: undefined,
      selected: undefined
    };
  },
  props: {
    doc_id: String,
    value: Object
  },
  watch: {
    doc_id() {
      this.load();
    },
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
    isSelected(child) {
      return this.selected !== undefined && this.selected[PATH] == child[PATH];
    },
    async load() {
      if (this.children === undefined) {
        var params = {};
        params[FACETS] = FACET_SHOW_IN_TREE;
        this.children = await this.fdms_get_children(this.doc_id, params);
        for (var index in this.children) {
          var child = this.children[index];
          child.___expanded = false;
          child.___label = this.fdms_doc_label(child);
        }
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

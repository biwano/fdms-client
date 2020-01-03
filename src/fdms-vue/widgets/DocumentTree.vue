<template>
  <div class="node_layout">
    <div v-for="(child, index) in children" >
      <div v-if="!child.___expanded" v-on:click="expand(child, index)" :class="selectedClass(child)">
        <fdms-icon icon="caret-down" />
        <fdms-icon  icon="folder" class="fdms-icon"/>
        <span @click="select_ui(child)" >{{ child.___label }}</span>
      </div>
      <div v-if="child.___expanded" v-on:click="unexpand(child, index)" :class="selectedClass(child)">
        <fdms-icon icon="caret-right" class="fdms-icon"/>
        <fdms-icon icon="folder-open" class="fdms-icon"/>
        <span @click="select_ui(child)" >{{ child.___label }}</span>
      </div>
      <div v-if="child.___expanded"  class="children">
        <document-tree :doc_id="fdms_doc_path(child, index)" v-model="selected"></document-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { PATH } from "../constants.js";
import doc_mixin from "./doc_mixin.js";

export default {
  name: "DocumentTree",
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
  created() {
    this.selected = this.value;
  },
  watch: {
    selected(child) {
      this.select(child);
    },
    value(value) {
      this.selected = value;
      this.autoexpand();
    }
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
    autoexpand() {
      if (this.selected && this.children) {
        this.children.forEach(child => {
          if (this.selected[PATH].startsWith(`${child[PATH]}/`)) {
            this.expand(child);
          }
        });
      }
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
      return this.value !== undefined && this.value[PATH] == child[PATH];
    },
    selectedClass(child) {
      var clazz = { 
        "child": true,
        "fdms-clickable": true 
      };
      if (this.isSelected(child)) {
        clazz["selected"] = true;
      }
      return clazz;
    },
    async load() {
      this.children = await this.fdms_get_tree_children(this.doc);
      for (var index in this.children) {
        var child = this.children[index];
        child.___expanded = false;
        child.___label = this.fdms_doc_label(child);
      }
      this.autoexpand();
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
.child {
  padding: 2px;
}
.child.selected {
  color: white;
  background-color: #3273dc;
}
</style>

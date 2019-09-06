<template>
  <div v-if="doc" class="node_layout">
    <span v-if="!local_expanded" v-on:click="expand">
      <font-awesome-icon icon="caret-down" class="caret"/>
      <font-awesome-icon  icon="folder"/>
    </span>
    <span v-if="local_expanded" v-on:click="unexpand">
      <font-awesome-icon icon="caret-right" class="caret"/>
      <font-awesome-icon icon="folder-open"/>
    </span>
    {{ label }}

    <div v-if="local_expanded" v-for="child in children" class="children">
      <tree-root :tenant_id="user_tenant_id" :path="fdms_doc_path(child)" :expanded="true"></tree-root>
    </div>
  </div>
</template>

<script>
import C from "./constants.js";

export default {
  name: "TreeRoot",
  data() {
    return {
      doc: undefined,
      label: "",
      local_expanded: false,
      children: undefined,
    }
  },
  props: {
    tenant_id: String,
    expanded:false,
    path: String,
  },
  created() {
    this.local_expanded = this.expanded;
  },
  watch: {
    tenant_id() {
      this.load();
    },
    path() {
      this.load();
    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      if (this.path !== undefined) {
        this.doc = await this.fdms_get(this.path);
        this.label = this.fdms_doc_label(this.doc);
        this.load_children();
      }
    },
    expand() {
      this.local_expanded = true;
      this.load_children();
    },
    unexpand() {
      this.local_expanded = false;
    },
    async load_children() {
      //if (this.children === undefined) 
        var params = {}
        //params[C.FACETS] = C.FACET_SHOW_IN_TREE;
        this.children = await this.fdms_get_children(this.path, params);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.children {
  margin-left:15px;
}
.caret {
  margin-right:5px;
}
.node_layout {
  margin-bottom:2px;
}
</style>

<template>
  <nav v-if="doc" class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a @click="navigate('/')" class="fdms-clickable"><fdms-icon icon="home" style="position:relative; top:2px;"/></a></li>
      <li v-for="path in paths">
        <a @click="navigate(path.target)" class="fdms-clickable">{{ path.segment }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { PATH } from "../constants.js";
import doc_mixin from "./doc_mixin.js";

export default {
  name: "Breadcrumb",
  mixins: [doc_mixin],
  methods: {
    navigate(path) {
      this.fdms_navigate(path);
    }
  },
  computed: {
    paths() {
      var paths = [];
      if (this.doc) {
        var string_paths = this.doc[PATH].split("/");
        var target = "";
        for (var i in string_paths) {
          var segment = string_paths[i];
          if (i > 0 && segment) {
            target = `${target}/${string_paths[i]}`;
            var separator = i > 1 ? "/" : "";
            paths.push({ segment, target, separator });
          }
        }
      }
      return paths;
    }
  }
};
</script>
<style scoped>
</style>

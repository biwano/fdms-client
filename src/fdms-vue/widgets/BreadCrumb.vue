<template>
  <span v-if="doc_">
    <span @click="navigate('/')" class="clickable">
      /
    </span>
    <span v-for="path in paths">
      <span>{{ path.separator }}</span>
      <span @click="navigate(path.target)" class="clickable">
      {{ path.segment }} 
    </span>
    </span>
  </span>
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
      if (this.doc_) {
        var string_paths = this.doc_[PATH].split("/");
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

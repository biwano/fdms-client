<template>
  <span :class="{ 'fdms-clickable': is_link}"  @click="click">
    <span v-if="icon">
        <fdms-icon :icon="icon" class="fdms-icon"/>
    </span>
    <span v-if="mode_view">
      {{ value }}
    </span>
    <span v-if="mode_edit">
      <input class="input" :type="widget.input" v-model="local_value" :disabled="is_fdms_busy()"></input>
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetText",
  mixins: [widget_mixin],
  methods: {
    click() {
      // link is True go to doc
      if (this.is_link == true) {
        if (this.widget.link == true) {
          this.fdms_navigate(this.doc);
        } else {
        // It must be a string interpolate!
          var path = this.fdms_interpolate(this.widget.link, { doc: this.doc, model: this.value });
          this.fdms_navigate(path);
        }
      }
    }
  },
  computed: {
    icon() {
        return this.widget.icon;
    },
    is_link() {
      return this.widget.link ? true : false;
    }
  }
};
</script>

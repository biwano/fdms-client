<template>
  <span :class="{ 'fdms-clickable': is_link}"  @click="click">
    <span v-if="icon">
        <fdms-icon :icon="icon" class="fdms-icon"/>
    </span>
    <span v-if="mode_view" @click="$emit('click')">
      {{ value }}
    </span>
    <span v-if="mode_edit" @keyup.enter="$emit('submit', local_value)">
      <input class="input" :type="local_widget.input" v-model="local_value" :disabled="is_fdms_busy()"></input>
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
        if (this.local_widget.link == true) {
          this.fdms_navigate(this.doc);
        } else {
        // It must be a string interpolate!
          var path = this.fdms_interpolate(this.local_widget.link, { doc: this.doc, model: this.value });
          this.fdms_navigate(path);
        }
      }
    }
  },
  computed: {
    icon() {
        return this.local_widget.icon;
    },
    is_link() {
      return this.local_widget.link ? true : false;
    }
  }
};
</script>

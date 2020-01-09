<template>
  <span>
    <span v-if="!expanded" @click="expand">
      <fdms-clickable-icon icon="caret-down" />
        <div class="not_expanded">
      </div>
    </span>
    <span v-if="expanded">
      <fdms-clickable-icon icon="caret-right" @click="unexpand" />
      <div v-for="key in keys" class="expanded">
        <div v-if="isInline(value[key])">
          {{ key }}: <widget-proxy :widget="makeWidget(value[key])" :doc="doc" v-model="value[key]" :mode="mode"></widget-proxy></td>
        </div>
        <div v-else>
          {{ key }}
          <div class="children">
            <widget-proxy :widget="makeWidget(value[key])" :doc="doc" v-model="value[key]" :mode="mode"></widget-proxy></td>
          </div>
        </div>
      </div>
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";

export default {
  name: "WidgetJson",
  mixins: [widget_mixin],
  data() {
    return {
      expanded: true
    }
  },
  components: { WidgetProxy: () => import("./WidgetProxy.vue") },
  methods: {
    expand() {
      this.expanded = true;
    },
    unexpand() {
      this.expanded = false;
    },
    click() {
      // link is True go to doc
      if (this.is_link == true) {
        if (this.config.link == true) {
          this.fdms_navigate(this.doc);
        } else {
        // It must be a string interpolate!
          var path = this.fdms_interpolate(this.widget.link, { doc: this.doc, model: this.value });
          this.fdms_navigate(path);
        }
      }
    },
    isInline(val) {
      if (Array.isArray(val)) return false;
      else if (typeof val === "object") return false;
      else return true;

    },
    makeWidget(val) {
      widget = {}
      if (typeof val == "string") widget.type = "text";
      else if (Array.isArray(val)) { 
        var widget = {
          type: "array",
          display: "numbered_list with_hook",
          widget: {
            "type": "json",
          }
        }
      }
      else if (typeof val == "object") widget.type = "json";
      else widget.type = "text";
      return widget;
    }
  },
  computed: {
    keys() {
      return Object.keys(this.value);
    }
  }
};
</script>
<style>
.children {
  margin-left:14px;
}
.expanded {
  position: relative;
  width: 100%;
  margin-top: 2px;
  padding-left: 15px;
}
.expanded:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 15px;
  border: 1px solid grey;
  border-right-width: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.not_expanded {
  position: relative;
  display: inline;
  width: 100%;
  height: 15px;
  margin-top: 2px;
  padding-left: 15px;
}
.not_expanded:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  width: 5px;
  border: 1px solid grey;
  border-right-width: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.not_expanded:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 5px;
  border: 1px solid grey;
  border-left-width: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

</style>
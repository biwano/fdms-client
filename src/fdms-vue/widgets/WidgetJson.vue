<template>
  <span>
    <span v-if="!expanded" @click="expand">
      <font-awesome-icon icon="caret-down" class="fdms-icon fdms-clickable"/>
        <div class="not_expanded">
      </div>
    </span>
    <span v-if="expanded">
      <font-awesome-icon icon="caret-right" class="fdms-icon fdms-clickable"  @click="unexpand" />
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
          var path = this.fdms_interpolate(this.config.link, { doc: this.doc, model: this.value });
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
      var type = "";
      var config = {};
      if (typeof val == "string") type = "text";
      else if (Array.isArray(val)) { 
        type = "array";
        config = {
          display: "numbered_list",
          widget: {
            "type": "json",
            "config": {},
          }
        };
      }
      else if (typeof val == "object") type = "json";
      else type = "text";
      return {
        type,
        mode: this.mode,
        config
      };
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
  width: 5px;
  border: 2px solid black;
  border-right-width: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
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
  border: 2px solid black;
  border-right-width: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.not_expanded:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 5px;
  border: 2px solid black;
  border-left-width: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

</style>
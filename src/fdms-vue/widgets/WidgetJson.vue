<template>
  <span>
    <span v-if="!expanded" @click="expand">
      <fdms-clickable-icon icon="caret-down" />
        <div class="not_expanded">
      </div>
    </span>
    <span v-if="expanded">
      <fdms-clickable-icon icon="caret-right" @click="unexpand" />
      <div  class="expanded">
        <div v-for="key in keys">
          <b>
          <widget-text :doc="doc" @input="keyChanged(key, $event)" :value="key" :mode="keyMode(key)"
              :clickable="!mode_view"
              :ref="key"
              @click="keySwitchMode(key, 'edit')"
              @submit="keySwitchMode(key, 'view')">
            </widget-text>
          </b>
          <span v-if="isInline(local_value[key])">
            <span v-if="mode_view">:</span>
            <widget-proxy :widget="makeWidget(local_value[key])" :doc="doc" v-model="local_value[key]" :mode="mode"></widget-proxy></td>
          </span>

          <div v-else>
            <div class="children">
              <widget-proxy :widget="makeWidget(local_value[key])" :doc="doc" v-model="local_value[key]" :mode="mode"></widget-proxy></td>
            </div>
          </div>
        </div>
      </div>
    </span>
  </span>
</template>

<script>
import widget_mixin from "./widget_mixin.js";
import WidgetText from "./WidgetText.vue";

export default {
  name: "WidgetJson",
  mixins: [widget_mixin],
  data() {
    return {
      expanded: true,
      key_statuses: {}
    }
  },
  components: { WidgetText, WidgetProxy: () => import("./WidgetProxy.vue") },
  created() {
    this.updateKeyStatuses();
  },
  methods: {
    expand() {
      this.expanded = true;
    },
    unexpand() {
      this.expanded = false;
    },
    isInline(val) {
      if (Array.isArray(val)) return false;
      else if (typeof val === "object") return true;
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
    },
    updateKeyStatuses() {
      this.key_statuses = {};
      Object.keys(this.local_value).forEach( key => {
        //this.key_statuses[key] = {};
        this.key_statuses[key] = { mode: "view", value: this.local_value[key] };
      });
    },
    keyChanged(key, new_key) {
      var val = this.local_value[key];
      delete this.local_value[key];
      this.local_value[new_key] = val;
      this.local_value = Object.assign({}, this.local_value);

      val = this.key_statuses[key];
      delete this.key_statuses[key];
      this.key_statuses[new_key] = val;
      this.key_statuses = Object.assign({}, this.key_statuses);
    },
    keyMode(key) {
      return this.key_statuses[key].mode == "edit" ? this.mode : "view";
    },
    keySwitchMode(key, mode) {
      if (mode === undefined) {
          mode = this.key_statuses[key].mode == "edit" ? "view" : "edit";
      }
      this.key_statuses[key].mode = mode; 
      this.key_statuses = Object.assign({}, this.key_statuses);
      if (mode==='edit') {
        this.$refs[key][0].focus();
      }
    }
  },
  computed: {
    keys() {
      return Object.keys(this.local_value);
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
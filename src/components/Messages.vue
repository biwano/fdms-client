<template>
  <div >
    <div v-if="$store.state.messages[category] !== undefined" >
    
      <span :class="getClass(message)" 
      v-for="message in $store.state.messages[category].messages">
        {{ message.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  props: {
    category: String
  },
  methods: {
    getClass(message) {
      return `alert ${message.type}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
  margin-bottom: 15px;
  display: block;
}
.error {
    background-color: #f44336; /* Red */
}
.info {
  background-color: #099; /* Red */
}
</style>

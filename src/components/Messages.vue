<template>
  <div >
    <div v-if="$store.state.messages[category] !== undefined" >
    
      <span :class="message.type" 
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}
</style>

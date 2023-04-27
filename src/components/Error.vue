<template>
  <div id="wrapper">
    <b-button variant="primary" v-on:click="$router.push({ path: '/' })">Home</b-button>
    <b-icon id="alert-icon" icon="exclamation-circle" scale="4" variant="danger"></b-icon>
    <h1 v-if="!messasge">Error</h1>
    <h1 v-if="messasge"> {{ messasge }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props:{
    messasge: String
  },
}
</script>
<style scoped>
</style>

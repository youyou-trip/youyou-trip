<template>
  <div id="app">
    <m-header></m-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from './components/MHeader.vue'
export default {
  name: 'App',
  components: {
    MHeader: MHeader
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html {
  font-size: 14px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

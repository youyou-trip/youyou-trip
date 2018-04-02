<!-- 绘制景点路线的组件 -->

<template>
  <div class="sightCanvas"></div>
</template>
<script>
// import TSP from '../util/TSP'
// import getDistance from '../util/getDistance'

export default {
  props: {
    city: {
      type: String
    }
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style lang="stylus" scoped>
.sightCanvas
  width: 100%
  height: 100%
</style>

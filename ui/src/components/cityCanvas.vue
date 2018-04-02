<!-- 绘制路线的组件，start是起点城市，end是终点城市，lists是中间经过的城市列表 -->

<template>
  <div class="cityCanvas"></div>
</template>
<script>
// import TSP from '../util/TSP'
// import getDistance from '../util/getDistance'

export default {
  props: {
    lists: {
      type: Array
    },
    start: {
      type: Object
    },
    end: {
      type: Object
    }
  },
  mounted () {
  },
  watch: {
    lists: {
      deep: true,
      handler: function (oldValue, newValue) {
        // 在这里更新画布，绘制新的路线
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.cityCanvas
  width: 100%
  height: 100%
</style>

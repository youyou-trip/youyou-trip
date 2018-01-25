<template>
  <div class="myCanvas"></div>
</template>
<script>
export default {
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
   // this.$watch('lists', )
  }
}
</script>
<style lang="stylus" scoped>
.myCanvas
  width: 100%
  height: 100%
</style>

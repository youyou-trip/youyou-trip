<template>
  <div class="plan-route">
    <div class="canvas">
      <div class="myCanvas-wrapper">
        <myCanvas>绘制地图</myCanvas>
      </div>
      <div class="cities">
        <ul>
          <li v-for="city in cities" @click="toggleCity($event)" :data-id="city.city_id">
            <p class="name">{{city.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="sight in sights">{{sight.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import fetch from '@/util/fetch'
import myCanvas from '@/components/myCanvas.vue'

export default {
  data () {
    return {
      drawCities: [],
      cities: [],
      sights: [],
      hotSightsStart: 0
    }
  },
  mounted () {
    fetch({
      method: 'get',
      url: 'http://localhost:3000/get-cities?hotSightsStart=' + this.hotSightsStart
    })
      .then(res => {
        if (res.data.error === 1) {
          this.cities = res.data.cityInfo
          this.sights = res.data.hotSights
        }
      })
  },
  methods: {
    toggleCity (e) {
      let target
      if (e.target.nodeName === 'P') {
          target = e.target.parentNode.getAttrite('data-id')
      } else if (e.target.nodeName === 'LI') {
          target = e.target.getAttrite('data-id')
      }
      if (drawCities.indexOf(target) < 0) {
        drawCities.push(target)
      }
    }
  },
  components: {
    myCanvas: myCanvas
  }
}
</script>
<style lang="stylus" scoped>
.plan-route
  display: flex
  flex-wrap: nowrap
  .canvas
    flex: 3
    .myCanvas-wrapper
      height: 30rem
    .cities
      ul
        li
          display: inline-block
          width: 6rem
          margin: 0.2rem 0.5rem
          list-style: none
  .list
    flex: 1
    ul
      li
        list-style: none
</style>

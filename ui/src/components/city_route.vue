<!-- 这个地方有两种方案：
      1. 规划完城市路线后点击提交进入景点规划页面（怎样保存城市路径？存数据库？）
      2. 在该页面添加规划景点的组件（使页面变复杂，布局上有问题）
 -->
<template>
  <div class="plan-route">
    <div class="canvas">
      <div class="myCanvas-wrapper-city">
        <cityCanvas :lists="drawCities" :start="start" :end="end">绘制地图</cityCanvas>
      </div>
      <!-- 默认不显示，点击城市时显示 -->
      <div class="myCanvas-wrapper-sight">
        <sightCanvas :city="thisCity"></sightCanvas>
      </div>
      <div class="cities">
        <ul>
          <li v-for="city in cities" :data-id="city.city_id" :key="city.id" @click="toggleCity($event)">
            <p class="add">{{city.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="list">
      <ul>
        <li v-for="sight in sights" :key="sight.id">{{sight.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import fetch from '@/util/fetch'
import cityCanvas from '@/components/cityCanvas.vue'
import sightCanvas from '@/components/sightCanvas.vue'

export default {
  data () {
    return {
      // 加入路线规划的城市信息数组
      drawCities: [],
      // 所有城市的状态（在路线规划数组中或不在）
      drawCitiesState: [],
      cities: [],
      sights: [],
      hotSightsStart: 0,
      start: {},
      end: {},
      thisCity: ''      // 规划经典路线的城市
    }
  },
  mounted () {
    let start = this.$store.getters.getStart ? this.$store.getters.getStart : window.localStorage.getItem('start')
    let end = this.$store.getters.getEnd ? this.$store.getters.getEnd : window.localStorage.getItem('end')
    fetch({
      method: 'get',
      url: 'http://localhost:3000/get-cities?province=陕西'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.cities = res.data.cityInfo
          this.cities.forEach(item => {
            if (item['name'] === start) {
              this.start = JSON.parse(JSON.stringify(item))
            } else if (item['name'] === end) {
              this.end = JSON.parse(JSON.stringify(item))
            }
          })
        }
      })
    fetch({
      method: 'get',
      url: 'http://localhost:3000/hot-sights?hotSightsStart=' + this.hotSightsStart
    })
      .then(res => {
        if (res.data.error === 1) {
          this.sights = res.data.hotSights
        }
      })
  },
  methods: {
    /** @augments
     * 点击切换城市状态（添加进路线规划或者删除）
     */
    toggleCity (e) {
      let target = e.target.nodeName === 'P' ? e.target : e.target.childNode
      let targetId = Number(target.parentNode.getAttribute('data-id'))
      let targetName = target.innerHTML
      if (!this.drawCitiesState[targetId]) {
        this.cities.forEach(item => {
          if (item['city_id'] === targetId) {
            this.drawCities.push(JSON.parse(JSON.stringify(item)))
            target.className = 'sub'
            this.drawCitiesState[targetId] = true
          }
        })
      } else if (targetName !== this.start && targetName !== this.end) {
        this.drawCities.find((item, index) => {
          if (item['city_id'] === targetId) {
            this.drawCities.splice(index, 1)
            // return
          }
        })
        target.className = 'add'
        this.drawCitiesState[targetId] = false
      }
    }
  },
  components: {
    cityCanvas: cityCanvas,
    sightCanvas: sightCanvas
  }
}
</script>
<style lang="stylus" scoped>
.plan-route
  display: flex
  flex-wrap: nowrap
  .canvas
    flex: 3
    .myCanvas-wrapper-city
      height: 30rem
    .cities
      ul
        li
          position: relative
          display: inline-block
          width: 6rem
          margin: 0.2rem 0.5rem
          list-style: none
          cursor: pointer
          &:hover
            p::after
              display: inline-block
              position: absolute
              right: -0.2rem
              top: -0.4rem
              width: 0.8rem
              height: 0.8rem
              color: #ffffff
              background: red
              border-radius: 50%
              text-align: center
              line-height: 0.9rem
              font-size: 0.8rem
            p.sub::after
              content: '-'
            p.add::after
              content: '+'
  .list
    flex: 1
    ul
      li
        list-style: none
</style>

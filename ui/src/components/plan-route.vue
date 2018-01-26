<template>
  <div class="plan-route">
    <div class="canvas">
      <div class="myCanvas-wrapper">
        <myCanvas :lists="drawCities">绘制地图</myCanvas>
      </div>
      <div class="cities">
        <ul>
          <li v-for="city in cities" :data-id="city.city_id" :key="city.id" @click="toggleCity($event)">
            <p>{{city.name}}</p>
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
import myCanvas from '@/components/myCanvas.vue'

export default {
  data () {
    return {
      add: true,
      drawCities: [],
      cities: [],
      sights: [],
      hotSightsStart: 0,
      start: this.$store.getters.getStart ? this.$store.getters.getStart : window.localStorage.getItem('start'),
      end: this.$store.getters.getEnd ? this.$store.getters.getEnd : window.localStorage.getItem('end')
    }
  },
  mounted () {
    fetch({
      method: 'get',
      url: 'http://localhost:3000/get-cities?province=陕西'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.cities = res.data.cityInfo
          this.cities.forEach(item => {
            if (item['name'] === this.start || item['name'] === this.end) {
              this.drawCities[item['city_id']] = JSON.parse(JSON.stringify(item))
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
  computed: {
    addOrSub: function () {
      console.log(this.add)
      return {
        add: this.add,
        sub: !this.add
      }
    }
  },
  methods: {
    toggleCity (e) {
      let targetId, targetName
       if (e.target.nodeName === 'P') {
        targetId = e.target.parentNode.getAttribute('data-id')
        targetName = e.target.innerHTML
      } else if (e.target.nodeName === 'LI') {
        targetId = e.target.getAttribute('data-id')
        targetName = e.target.childNode.innerHTML
      }
      if (!this.drawCities[targetId]) {
        this.cities.forEach(item => {
          if (item['city_id'] == targetId) {
            this.drawCities[targetId] = JSON.parse(JSON.stringify(item))
            e.target.className += 'sub'
            console.log(e.target.className)
          }
        })
      } else if (targetName !== this.start && targetName !== this.end){
        this.drawCities[targetId] = null
        e.target.className -= 'sub'
      }
      this.add = !this.add
      console.log(this.drawCities)
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
              content: '+'
            p.sub::after
              content: '-'
  .list
    flex: 1
    ul
      li
        list-style: none
</style>

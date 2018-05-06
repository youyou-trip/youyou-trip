<template>
  <Row>
    <Col span="18">
      <div class="canvas">
      <div class="myCanvas-wrapper">
        <myCanvas>您的浏览器不支持Canvas</myCanvas>
      </div>
      <div class="cities">
        <ul>
          <li v-for="city in cities" :data-id="city.city_id" :data-X="city.pointX" :data-Y="city.pointY" :key="city.id" @click="toggleCity($event)">
            <p>{{city.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    </Col>
    <Col span="6">
       <Timeline>
        <TimelineItem v-for="city in City">
            <p class="time">{{city.name}}</p>
            <p class="content">Apple I 问世</p>
        </TimelineItem>
    </Timeline>
    </Col>
  </Row>
</template>
<script>
import fetch from '@/util/fetch'
import myCanvas from '@/components/myCanvas.vue'

export default {
  data () {
    return {
      City: this.$store.getters.getCity,
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
      url: 'http://localhost:3000/city/all?province=陕西'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.cities = res.data.cityInfo
        }
      })
    fetch({
      method: 'get',
      url: 'http://localhost:3000/sight/hot?hotSightsStart=' + this.hotSightsStart
    })
      .then(res => {
        if (res.data.error === 1) {
          this.sights = res.data.hotSights
        }
      })

      if(this.City.length < 1){
        this.$store.dispatch('SAVE', {start: this.start, end: this.end})
        this.$store.dispatch('City',{name:this.start,X:window.localStorage.getItem('startX'),Y:window.localStorage.getItem('startY')})
        this.$store.dispatch('City',{name:this.end,X:window.localStorage.getItem('endX'),Y:window.localStorage.getItem('endY')})
      }
  },
  methods: {
    toggleCity (e) {
      let targetId, targetName,X,Y,sub
       if (e.target.nodeName === 'P') {
        targetId = e.target.parentNode.getAttribute('data-id')
        X = e.target.parentNode.getAttribute('data-X')
        Y = e.target.parentNode.getAttribute('data-Y')
        sub =e.target.parentNode.getAttribute('data-Sub')
        targetName = e.target.innerHTML
      } else if (e.target.nodeName === 'LI') {
        targetId = e.target.getAttribute('data-id')
        X = e.target.getAttribute('data-X')
        Y = e.target.getAttribute('data-Y')
        sub =e.target.getAttribute('data-Sub')
        targetName = e.target.childNode.innerHTML
      }
      if(sub==="true"){
        e.target.className = ''
        e.target.parentNode.setAttribute("data-sub","false")
        this.$store.dispatch('deleteCity', {name:targetName, X:Number(X),Y:Number(Y)})
      }else{
        this.$store.dispatch('City', {name:targetName, X:Number(X),Y:Number(Y)})
        e.target.className += 'sub'
        e.target.parentNode.setAttribute("data-sub","true")
      }
    }
  },
  components: {
    myCanvas: myCanvas
  }
}
</script>
<style lang="stylus" scoped>
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
.time
  text-align:left;
</style>

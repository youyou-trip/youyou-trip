<template>
    <Row>
        <Col class="way" span="16">
          <div class="title">
            <h1>请输入您要去的起点和终点</h1>
          </div>
          <div class="box">
            <div class="start">
              <Select v-model="start" style="width:200px">
                  <Option v-for="item in cityList" :value="item.name">{{ item.name }}</Option>
              </Select>
            </div>
            <Icon type="android-send"></Icon>
            <div class="end">
              <Select v-model="end" style="width:200px">
                <Option v-for="item in cityList" :value="item.name">{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <Button @click="submit" type="success">确定</Button>
        </Col>
        <Col span="8">
          <div class="hot" ref="hot_sights">
            <Carousel
                v-model="value3"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
                <CarouselItem v-for="(hot, index) in hotsights" v-bind:key="index">
                    <img v-bind:src="hot.image" alt="图片"/>
                    <div class="demo-caroussel">{{hot.name}}</div>
                </CarouselItem>
            </Carousel>
          </div>
        </Col>
    </Row>
</template>

<script>
import fetch from '@/util/fetch'

export default {
  data () {
    return {
      start: '',
      end: '',
      cityList:'',
      City:this.$store.getters.getCity,
      hotsights: [],
      hotSightsStart: 0,
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover'
      }
    }
  },
  mounted () {
    // fetch({
    //   method: 'get',
    //   url: 'http://localhost:3000/hot-sights?hotSightsStart=' + this.hotSightsStart,
    // })
    //   .then(res => {
    //     // this.$refs.hot_sights.innerHTML += JSON.stringify(res)
    //     this.hotsights = res.data.hotSights
    //   })
    fetch({
      method: 'get',
      url: 'http://localhost:3000/'
    })
      .then(res => {
        if(res.data.loginState){
          this.$store.dispatch('User', res.data.username)
          window.localStorage.setItem('user_id', res.data.username)
        }else{
          //弹窗

        }
      })
    fetch({
    method: 'get',
    url: 'http://localhost:3000/get-cities?province=陕西',
    })
      .then(res => {
        this.cityList = res.data.cityInfo
      })
  },
  methods: {
    submit () {
        fetch({
          method: 'post',
          url: 'http://localhost:3000/start-end',
          data: {
            start: this.start,
            end: this.end
          }
        })
          .then(res => {
            if (res.data.error === 1) {
              this.$router.push('/plan-route')
            }
        })
        window.localStorage.setItem('start', this.start)
        window.localStorage.setItem('end', this.end)
        this.$store.dispatch('SAVE', {start: this.start, end: this.end})
        this.cityList.forEach(item => {
          if (item['name'] == this.start) {
            this.$store.dispatch('City',{name:this.start,X:Number(item.pointX),Y:Number(item.pointY)})
          }
          else if(item['name'] == this.end){
            this.$store.dispatch('City',{name:this.end,X:Number(item.pointX),Y:Number(item.pointY)})
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.way
  display:flex
  flex-direction:column
  .title
    margin: 60px 0
  .box
    margin: 58px auto
    display:flex
    .start,.end
      margin:-8px 15px 0 15px
  button
    margin:60px auto
    width:25%
img
  width:30%
</style>

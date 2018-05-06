<template>
  <div>
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
              <div v-for="(hot, index) in hotsights" v-bind:key="index" class="demo-caroussel">{{hot.name}}</div>
          </div>
        </Col>
    </Row>
    <Row class="loginer" id="login">
      <Col span = "24" class="login_box">
          <div class="title">
            <div @click="login" v-bind:class="{active:active}">登陆</div>
            <div @click="sigin" v-bind:class="{active:!active}">注册</div>
          </div>
          <login v-if="active"></login>
          <sigin v-if="!active"></sigin>
      </Col>
    </Row>
  </div>
</template>

<script>
import fetch from '@/util/fetch'
import login from './login.vue'
import sigin from './sigin.vue'

export default {
  data () {
    return {
      active: true,
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
  components: {
    login: login,
    sigin: sigin
  },
  mounted () {
    fetch({
      method: 'get',
      url: 'http://localhost:3000/sight/hot?hotSightsStart=' + this.hotSightsStart,
    })
      .then(res => {
        this.hotsights = res.data.hotSights
      })
    fetch({
      method: 'get',
      url: 'http://localhost:3000/'
    })
      .then(res => {
        if(res.data.loginState){
          this.$store.dispatch('User', res.data.username)
          window.localStorage.setItem('user_id', res.data.username)
        }else{//弹窗
          var login = document.querySelector("#login");
          login.style.display = "block";
        }
      })
    fetch({
    method: 'get',
    url: 'http://localhost:3000/city/all?province=陕西',
    })
      .then(res => {
        this.cityList = res.data.cityInfo
      })
  },
  methods: {
    login () {
      this.active = true
    },
    sigin () {
      this.active = false
    },
    submit () {
        fetch({
          method: 'post',
          url: 'http://localhost:3000/route/start-end',
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
        this.$store.dispatch('ClearCity',{})
        this.cityList.forEach(item => {
          if (item['name'] == this.start) {
            window.localStorage.setItem('startX', Number(item.pointX))
            window.localStorage.setItem('startY', Number(item.pointY))
            this.$store.dispatch('City',{name:this.start,X:Number(item.pointX),Y:Number(item.pointY)})
          }
          else if(item['name'] == this.end){
            window.localStorage.setItem('endX', Number(item.pointX))
            window.localStorage.setItem('endY', Number(item.pointY))
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
.loginer
  display:none
  z-index:10
  position:fixed
  background-color:rgba(0,0,0,.8)
  top:0
  bottom:0
  left:0
  right:0
  width:100%
  height:100%
  .login_box
    position:fixed
    top:0
    bottom:0
    left:0
    right:0
    margin:auto
    width:350px
    height:350px
    border-radius:20px
    background-color:#fff
    .title
      display: flex
      justify-content: center
      padding: 50px 20px
      font-size: 1.2rem
      color: lightness
      text-align: center
      div
        flex: 1
        cursor: pointer
      .active
        background:#42b983
        border-radius:5px
//   .hiden
//     display: none
</style>

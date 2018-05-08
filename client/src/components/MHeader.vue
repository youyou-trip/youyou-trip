<template>
<div>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
            <Icon type="home"></Icon>
            <router-link to="/">youyoutrip</router-link>
        </MenuItem>
        <MenuItem name="2">
            <Icon type="location"></Icon>
            <router-link to="/sign-route">定点规划</router-link>
        </MenuItem>
        <MenuItem name="3">
            <Icon type="map"></Icon>
            <router-link to="/plan-route">多城市规划</router-link>
        </MenuItem>
        <MenuItem name="4">
            <Icon type="plane"></Icon>
            <router-link to="/user-path">我的出行</router-link>
        </MenuItem>
        <MenuItem name="5" class="login_show">
            <div class="demo-avatar"  @click="showlogin">
                <Avatar>{{user}}</Avatar>
            </div>
        </MenuItem>
    </Menu>
    <div class="loginer" ref="login">
      <div class="login_box">
          <div class="title">
            <div @click="login" v-bind:class="{active:active}">登陆</div>
            <div @click="sigin" v-bind:class="{active:!active}">注册</div>
          </div>
          <login v-if="active" @index="change"></login>
          <sigin v-if="!active" @index="change"></sigin>
      </div>
    </div>
</div>
</template>

<script>
import login from './login.vue'
import sigin from './sigin.vue'

    export default {
        data () {
            return {
                active: true,
                theme1: 'light',
                user: this.$store.getters.getUser ? this.$store.getters.getUser : window.localStorage.getItem('user_id')
            }
        },
        computed: {
            getUser() {
                return this.$store.getters.getUser;
            }
        },
        watch: {
            getUser(val) {
                this.user = val;
            }
        },
        components: {
            login: login,
            sigin: sigin
        },
        methods:{
            login () {
                this.active = true
            },
            sigin () {
                this.active = false
            },
            showlogin () {
                this.$refs.login.style.display = "block";
            },
            change (msg) {
                console.log("aaaaa");
                this.$refs.login.style.display = "none";
            }
        }
    }
</script>


<style lang="stylus">
.loginer
  display:none
  z-index:1000
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
</style>
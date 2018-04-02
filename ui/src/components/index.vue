<template>
  <div class="index">
    <div class="title">
      <div @click="login">登陆</div>
      <div @click="signup">注册</div>
    </div>
    <login v-if="active"></login>
    <signup v-if="!active"></signup>
  </div>
</template>
<script>
import login from './login.vue'
import signup from './signup.vue'

export default {
  data () {
    return {
      active: true
    }
  },
  methods: {
    login () {
      this.active = true
    },
    signup () {
      this.active = false
    }
  },
  components: {
    login: login,
    signup: signup
  }
}
</script>
<style lang="stylus">
.index
  margin: 0 auto
  width: 20rem
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
  .hiden
    display: none
</style>

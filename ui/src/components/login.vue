<template>
    <div class="login">
        <div class="box">
            <div>
                <span>用户名:</span>
                <input type="text" v-model="user_id">
            </div>
            <div>
                <span>密码:</span>
                <input type="password" v-model="psd">
            </div>
        </div>
        <button @click="login">登陆</button>
    </div>
</template>
<script>
import fetch from '@/util/fetch'

export default {
  data () {
    return {
      user_id: '',
      psd: ''
    }
  },
  methods: {
    login () {
      let that = this
        fetch({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: {
            id: this.user_id,
            password: this.psd
          }
        })
          .then(res => {
            if (res.data === 1) {
              this.$router.push('/start-end')
            }
          })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  height: 40rem
  .box
    div
      padding: 10px 20px
      span
        display: inline-block
        width: 4rem
  button
    margin: 2rem
    width: 4rem
    height: 2rem
    background: #333
    border: none
    color: #fff
    border-radius: 3px
    cursor: pointer
</style>

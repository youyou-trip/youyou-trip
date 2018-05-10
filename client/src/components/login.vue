<template>
    <div class="login">
        <div class="box">
            <div class="input">
              <Icon type="ios-person"></Icon>
              <Input v-model="user_id" placeholder="用户名" style="width: 250px"></Input>
            </div>
            <div class="input">
              <Icon type="ios-compose-outline"></Icon>
              <Input v-model="psd" type="password" placeholder="密码" style="width: 250px"></Input>
            </div>
        </div>
        <Button @click="login" type="success">确定</Button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      user_id: '',
      psd: ''
    }
  },
  methods: {
    login () {
      this.$fetch({
        method: 'post',
        url: '/api/user/login',
        data: {
          id: this.user_id,
          password: this.psd
        }
      })
        .then(res => {
          if (res.data == 1) {
            this.$store.dispatch('User', this.user_id)
            window.localStorage.setItem('user_id', this.user_id)
            this.$router.push('/')
            this.$emit('index','true');
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  .box
    .input
      margin:10px auto
  Button
      width:200px
      margin:20px 0
</style>

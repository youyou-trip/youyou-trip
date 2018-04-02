<template>
    <div class="signup">
        <div class="box">
            <div>
                <span>用户名:</span>
                <input type="text" v-model="id">
            </div>
            <div>
                <span>昵称:</span>
                <input type="type" v-model="name">
            </div>
            <div>
                <span>密码:</span>
                <input type="password" v-model="psd">
            </div>
        </div>
        <button @click="signup">注册</button>
    </div>
</template>
<script>
import fetch from '@/util/fetch'

export default {
  data () {
    return {
      name: '',
      id: '',
      psd: ''
    }
  },
  methods: {
    signup () {
      fetch({
        method: 'post',
        url: 'http://localhost:3000/signup',
        data: {
          id: this.id,
          name: this.name,
          password: this.psd
        }
      }).then(res => {
        alert(res.data)
        if (res.data === 1) {
          window.localStorage.setItem('user_id', this.user_id)
          this.$router.push('/start-end')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.signup {
    height: 40rem;

    .box {
        div {
            padding: 10px 20px;

            span {
                display: inline-block;
                width: 4rem;
            }
        }
    }

    button {
        margin: 2rem;
        width: 4rem;
        height: 2rem;
        background: #333;
        border: none;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
    }
}
</style>

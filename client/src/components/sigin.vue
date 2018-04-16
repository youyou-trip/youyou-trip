<template>
    <div class="sigin">
        <div class="box">
            <div>
                <span>用户名:</span>
                <input type="text" v-model="user_id">
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
        <button @click="signin">注册</button>
    </div>
</template>
<script>
import fetch from "@/util/fetch";

export default {
  data() {
    return {
      user_id: "",
      name: "",
      psd: ""
    };
  },
  methods: {
    signin() {
      // let that = this
      if (this.user_id && this.name && this.psd) {
        fetch({
          method: "post",
          url: "http://localhost:3000/signin",
          data: {
            id: this.user_id,
            name: this.name,
            password: this.psd
          }
        }).then(res => {
          if (res.data === 1) {
            alert("注册成功");
          }
        });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.sigin {
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

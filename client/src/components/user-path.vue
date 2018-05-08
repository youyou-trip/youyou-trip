<template>
  <div class="user">
    <ul class="message_box">
      <li v-for="item in message" class="message">
        <span class="name">{{item.name}}</span>
        <p class="text">{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      message:'',
      user:this.$store.getters.getUser ? this.$store.getters.getUser : window.localStorage.getItem('user_id')
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.message_box
  height: 400px;
  overflow: auto;
  .message
    width:80%
    height:50px
    margin:1px auto
    list-style-type:none
    background-color:#42b983
    border-radius:10px
    .name
      float: left
      display:inline-block
      text-align:center
      margin:5px 5px
      width:40px
      height:40px
      line-height:40px;
      background-color:#fff
      border-radius:25px
.leave_message
  width:80%
  margin:0 auto
  position:fixed
  bottom:5px
  left:0
  right:0
  Button
    width:200px
    margin:20px 0
</style>

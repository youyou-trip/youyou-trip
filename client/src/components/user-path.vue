<template>
  <div class="user">
    <div class="message_box">
      <div class="header"><h2>我的出行</h2></div>
      <div  class="message" v-for="item in userData">
        <div class="box-header">
          <div>{{item.start}}</div>->
          <div>{{item.end}}</div>
          <div class="time">{{item.date}}</div>
        </div>
        <div class="box-body">
          <div class="body-pass">
            <div v-for="city in item.passCity">{{city}} </div>
          </div>
          <div class="body-sight">
            <div v-for="sight in item.sights">{{sight.sight}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user:this.$store.getters.getUser ? this.$store.getters.getUser : window.localStorage.getItem('user_id'),
      userData:[]
    }
  },
  methods: {
  },
  mounted (){
    this.$fetch({//获取城市
      method: 'get',
      url: '/api/mine'
    })
      .then(res => {
        if (res.data.error === 1) {
          for(let i =0;i<res.data.userData.length;i++){
            let day = new Date(Date.parse(res.data.userData[i].date))
            this.userData.push({
              date:day.toLocaleString(),
              end:res.data.userData[i].end,
              passCity:JSON.parse(res.data.userData[i].passCity),
              sights:JSON.parse(res.data.userData[i].sights),
              start:res.data.userData[i].start
            })
          }
        }
      })
  }
}
</script>
<style lang="stylus">
.user
  padding-top:62px
  .message_box
    width:80%
    margin:auto
    padding:10px 20px 
    list-style-type:none
    .header
      background-color: #42b983
      color:#fff
      border-radius:5px
      margin-bottom:10px
    .message
      border:1px solid #42b983
      border-radius:5px;
      margin:2px
      .box-header
        display:flex
        div
          flex:1
        .time
          flex:5
      .box-body
        .body-pass
          display:flex
          div
            flex:1
        .body-sight
          display:flex
          div
            flex:1
</style>

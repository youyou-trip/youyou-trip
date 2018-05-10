<template>
    <Row>
        <Col class="way" span="22">
          <div class="title">
            <h1>请输入您要去的起点和终点</h1>
            <input type="text" class="hide">
          </div>
          <div class="box">
            <div class="start">
              <Select v-model="start" style="width:200px" filterable>
                  <Option v-for="item in cityList" :value="item.name" :key="item.value">{{ item.name }}</Option>
              </Select>
            </div>
            <Icon type="android-send"></Icon>
            <div class="end">
              <Select v-model="end" style="width:200px" filterable>
                <Option v-for="item in cityList" :value="item.name" :key="item.value">{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <Button @click="submit" type="success">确定</Button>
        </Col>
        <Col span="2">
        </Col>
    </Row>
</template>

<script>
export default {
  data () {
    return {
      start: '',
      end: '',
      cityList:[],
      City:this.$store.getters.getCity,
    }
  },
  mounted () {
    this.$fetch({
      method: 'get',
      url: '/api/'
    })
      .then(res => {
        if(res.data.loginState){
          this.$store.dispatch('User', res.data.username)
          window.localStorage.setItem('user_id', res.data.username)
        }
      })
    this.$fetch({
    method: 'get',
    url: '/api/city/all?province=陕西省',
    })
      .then(res => {
        console.log(res.data.country)
        for(let key in res.data.country) {
          this.cityList=this.cityList.concat(res.data.country[key])
        }
      
      })
  },
  methods: {
    submit () {
      if(this.start!==''&&this.end!==''){
        this.$fetch({
          method: 'post',
          url: '/api/route/start-end',
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
      }else{
        alert("终点或起点未选择！");
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.way
  display:flex
  flex-direction:column
  .title
    margin: 150px 0 40px 0
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
.hide
  position: relative 
  left: -1000px
</style>

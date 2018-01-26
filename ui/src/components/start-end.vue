<template>
  <div class="start-end">
    <div class="title">
      请输入您要去的起点和终点
    </div>
    <div class="box">
      <div class="start">
        <span>起点</span>
        <input type="text" v-model="start">
      </div>
      <div class="end">
        <span>终点</span>
        <input type="text" v-model="end">
      </div>
    </div>
    <button @click="submit">确定</button>
    <div ref="hot_sights"></div>
  </div>
</template>
<script>
import fetch from '@/util/fetch'

export default {
  data () {
    return {
      start: '',
      end: '',
      hotSightsStart: 0
    }
  },
  mounted () {
    fetch({
      method: 'get',
      url: 'http://localhost:3000/hot-sights?hotSightsStart=' + this.hotSightsStart,
    })
      .then(res => {
        this.$refs.hot_sights.innerHTML += JSON.stringify(res)
      })
    fetch({
    method: 'get',
    url: 'http://localhost:3000/get-cities?province=陕西',
    })
      .then(res => {
        this.$refs.hot_sights.innerHTML += JSON.stringify(res)
      })
  },
  methods: {
    submit () {
        fetch({
          method: 'post',
          url: 'http://localhost:3000/start-end',
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
    }
  }
}
</script>


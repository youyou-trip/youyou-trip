<template>
  <div class="start-end">
    <div class="title">
      <div class="city">城市间路线规划</div>
      <div class="sight">城市中景点规划</div>
    </div>
    <div class="city-box">
      <div class="title">
        请输入您要去的起点和终点
      </div>
      <div class="box">
        <div class="start">
          <span>起点</span>
          <!-- 这里应该是下拉框 -->
          <input type="text" v-model="start">
        </div>
        <div class="end">
          <span>终点</span>
          <!-- 这里应该是下拉框 -->
          <input type="text" v-model="end">
        </div>
      </div>
      <button @click="submit_c">确定</button>
      <div ref="hot_sights"></div>
    </div>
    <div class="sight-box">
      <div class="title">
        请输入您要游玩的城市
      </div>
      <div class="box">
        <div class="start">
          <span>城市</span>
          <input type="text" v-model="city">
        </div>
      </div>
      <button @click="submit_s">确定</button>
      <div ref="hot_sights"></div>
    </div>
  </div>
</template>
<script>
import fetch from '@/util/fetch'

export default {
  data () {
    return {
      start: '',
      end: '',
      city: '',
      hotSightsStart: 0
    }
  },
  mounted () {
    fetch({
      method: 'get',
      url:
        'http://localhost:3000/hot-sights?hotSightsStart=' + this.hotSightsStart
    }).then(res => {
      // 获取热门景点（需要前端布局，展示）
      this.$refs.hot_sights.innerHTML += JSON.stringify(res)
    })
    fetch({
      method: 'get',
      url: 'http://localhost:3000/get-cities?province=陕西'
    }).then(res => {
      // 获取陕西省所有城市列表（需要前端页面选择）
      this.$refs.hot_sights.innerHTML += JSON.stringify(res)
    })
  },
  methods: {
    submit_c () {
      fetch({
        method: 'post',
        url: 'http://localhost:3000/start-end',
        data: {
          start: this.start,
          end: this.end
        }
      }).then(res => {
        if (res.data.error === 1) {
          this.$router.push('/city-route')
        }
      })
      window.localStorage.setItem('start', this.start)
      window.localStorage.setItem('end', this.end)
      // 如果不想跳转页面可以在该页进行路线规划
      this.$store.dispatch('SAVE', { start: this.start, end: this.end })
    },
    submit_s () {
      fetch({
        method: 'post',
        url: 'http://localhost:3000/sights-route',
        data: {
          city: this.city
        }
      }).then(res => {
        if (res.data.error === 1) {
          this.$route.push('/sight-route')
        }
      })
      window.localStorage.setItem('city', this.city)
    }
  }
}
</script>

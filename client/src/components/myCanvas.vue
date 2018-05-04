<template>
  <div>
    <canvas id="myCanvas" width="1000" height="500"></canvas>
  </div>
</template>
<script>
import TSP from '../util/TSP'
import getDistance from '../util/getDistance'
import CanvasCity from '../util/CanvasCity.js'

export default {
  data () {
    return {
      City: this.$store.getters.getCity
    }
  },
  mounted () {
    let canvas = document.querySelector('#myCanvas')
    let ctx = canvas.getContext('2d')

    function road(x,y,z,w,d){ //画圈
      if(d>=100){
        return ;
      }else{
        d +=1
      }
      ctx.beginPath();
      ctx.strokeStyle = '#1c86d1';
      ctx.lineWidth = 2;
      ctx.moveTo(x,y);
      ctx.lineTo(x+(z-x)*d/100,y+(w-y)*d/100);
      ctx.stroke();
      window.requestAnimationFrame(function () {
        road(x,y,z,w,d)
      })
    }

    function rander(city,x,y,tmp){ //画圆
      if(tmp >= 2 * Math.PI){
        return
      }else{
        tmp += 2 * (Math.PI / 180)
      }
      //画圈
      let r=35
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#1c86d1';
      ctx.arc(x, y, r, 0, tmp);
      ctx.stroke();
      ctx.closePath();
      //写字
      ctx.fillStyle = '#1d89d5';
      ctx.font= 12 + 'px Microsoft Yahei';
      ctx.textAlign='center';
      ctx.fillText(city, x, y+5);
      window.requestAnimationFrame(function () {
        rander(city,x,y,tmp)
      })
    }
    let canvascity = CanvasCity(this.City);
    console.log(canvascity);
    for(let i= 0;i<canvascity.length;i++){
      rander(canvascity[i].name,canvascity[i].X,canvascity[i].Y,0)
    }
    // rander(window.localStorage.getItem('start'),200,244,0)
    // rander(window.localStorage.getItem('end'),800,244,0)
    // road(200+35,244,800-35,244,0)
  },
  computed: {
      getCity() {
          return this.$store.getters.getCity;
      }
  },
  watch: {
      getCity(val) {
          this.City = val;
      }
  }
}
</script>
<style lang="stylus" scoped>
div
  margin-left:-8px
  #myCanvas
    border:1px solid #ccc
</style>

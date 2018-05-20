<template>
  <div>
    <canvas id="myCanvas" width="1000" height="500"></canvas>
    <Button @click="path" type="success">确认路线</Button>
  </div>
</template>
<script>
import TSP from '../util/TSP'
import getDistance from '../util/getDistance'
import {CanvasCity} from '../util/CanvasCity.js'
import { setTimeout } from 'timers';

export default {
  data () {
    return {
      City: this.$store.getters.getCity,
      ID:[],
      timer:null,
      rFrame:null
    }
  },
  methods: {
      path(){
        this.$fetch({
        method: 'post',
        url: '/api/route/save-city',
        data: {
          route:this.ID
        }
        })
        .then(res => {
          if (res.data === 1) {
            console.log("ok")
          }
        })
      },
      road(x,y,z,w,d){ //画线
      let canvas =document.querySelector('#myCanvas');
      let ctx = canvas.getContext('2d');
      if(d>=100){
        return ;
      }else{
        d +=2
      }
      ctx.beginPath();
      ctx.strokeStyle = '#1c86d1';
      ctx.lineWidth = 1;
      ctx.moveTo(x,y);
      ctx.lineTo(x+(z-x)/100*d,y+(w-y)/100*d);
      ctx.stroke();
      let self = this;
      this.rFrame = window.requestAnimationFrame(function () {
        self.road(x,y,z,w,d)
      })
    },
    rander(city,x,y,tmp){ //画圆
      let canvas =document.querySelector('#myCanvas');
      let ctx = canvas.getContext('2d');
      //画圈
      let r=2;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#1c86d1';
      ctx.arc(x, y, r, 2 * Math.PI, tmp);
      ctx.stroke();
      ctx.closePath();
      //写字
      ctx.fillStyle = '#1d89d5';
      ctx.font= 12 + 'px Microsoft Yahei';
      ctx.textAlign='center';
      ctx.fillText(city, x, y-5);
    }
  },
  mounted () {
  },
  computed: {
      getCity() {
        return this.$store.getters.getCity;
      }
  },
  watch: {
      getCity(val) {
        this.City = val;
        let arrX = [];
        let arrY = [];
        let cityPath = null;
        let canvas =document.querySelector('#myCanvas');
        let ctx = canvas.getContext('2d');
        this.timer = null;
        window.cancelAnimationFrame(this.rFrame);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let canvascity = CanvasCity(this.City);
        for(let i= 0;i<canvascity.length;i++){
          this.rander(canvascity[i].name,canvascity[i].X,canvascity[i].Y,0)
        }
        for(let i =0;i<this.City.length;i++){
          arrX.push(this.City[i].X);
          arrY.push(this.City[i].Y);
        }
        cityPath  = TSP(getDistance(arrX,arrY),arrX.length);
        let IDpath = [];
        let arrPath = [];
        for(let i =0;i<cityPath.length;i++){
          IDpath.push(this.City[cityPath[i]].ID);
          arrPath.push({X: canvascity[cityPath[i]].X,Y: canvascity[cityPath[i]].Y});
        }
        this.ID = IDpath;
        let self = this;
        for(let i= 0;i<arrPath.length-1;i++){
          this.timer = setTimeout(function(){
            self.road(arrPath[i].X,arrPath[i].Y,arrPath[i+1].X,arrPath[i+1].Y,0)}
            ,1200*i)
        }
      }
  }
}
</script>
<style lang="stylus" scoped>
div
  margin-left:-8px
  #myCanvas
    border:1px solid #ccc
Button
 width:80%
</style>

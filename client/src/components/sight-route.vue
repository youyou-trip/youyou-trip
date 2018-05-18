<template>
  <div class="sight-route">
    <div class="path">
      <div class="tips">
        <h1>城市路径</h1>
      </div>
      <div class="path_ul">
        <div class="path_li" v-for="(item,index) in city">
          <h3 :data-name="item" @click="getHot">{{item}}</h3>
          <div :data-index="index" class="train" @click="getTrain">车次信息</div>
        </div>
      </div>
    </div>
    <div class="hot">
      <div class="nowName"><h2>{{this.now}}</h2></div>
      <Scroll :on-reach-bottom="handleReachBottom" :height="550" class="Scroll">
        <Card dis-hover v-for="(item, index) in hotsight" :key="index" style="margin: 2px 0" class="HotList">
            <div class="Hot">
              <div class="hot_box">
                <!-- <div class="box_img">
                  <img :src=item.image alt="景点图片" width="100">
                </div> -->
                <div class="box_rating">
                  <span>{{item.name}}</span>
                  <Rate disabled v-model="item.rating"></Rate>
                </div>
              </div>
              <div class="box_add">
                <div class="add_tip" @click="AddSight" :data-X="item.X" :data-Y="item.Y" :data-name="item.name">+</div>
                <div class="del_tip" @click="DelSight" :data-X="item.X" :data-Y="item.Y" :data-name="item.name">-</div>
              </div>
            </div>
        </Card>
      </Scroll>
    </div>
    <div class="cityPath">
      <div class="path" v-for="(city,key) in sightPath">
        <div class="header">{{key}}规划路线</div>
        <div calss="cityname">{{city}}</div>
      </div>
      <Button @click="TSPpath" type="success">路线生成</Button>
      <Button @click="Postpath" type="success">确认路线</Button>
    </div>
    <div class="gettrain">
      <div class="close" @click="close">X</div>
      <Table width="550" border :columns="columns" :data="data" class="Table"></Table>
    </div>
  </div>
</template>
<script>
import TSP from '../util/TSP'
import getDistance from '../util/getDistance'

export default {
  data () {
    return {
      now:"",
      city:[],
      columns:[],
      data:[],
      hotsight:[],
      hotSightsStart:0,
      cityPath:{},
      sightPath:{}
    }
  },methods:{
    getTrain(e){
      let index = e.target.getAttribute("data-index");
      this.$fetch({
        method: 'get',
        url: `/api/train?start=${this.city[index]}&end=${this.city[Number(index)+1]}`
      })
        .then(res => {
          if(res.data.error == 1){
            this.columns=[];
            this.data = [];
            for(let i = 0;i<res.data.trains.col.length;i++){
              this.columns.push({title:res.data.trains.col[i],key:res.data.trains.col[i]});
            }
            for(let i = 0;i<res.data.trains.value.length;i++){
              this.data.push({"车次":res.data.trains.value[i][0],
              "始发站":res.data.trains.value[i][1],
              "始发时间":res.data.trains.value[i][2],
              "出发站":res.data.trains.value[i][3],
              "开车时间":res.data.trains.value[i][4],
              "到达站":res.data.trains.value[i][5],
              "到达时间":res.data.trains.value[i][6],
              "终点站":res.data.trains.value[i][7],
              "终到时间":res.data.trains.value[i][8]})
            }
          }
          let Dom = document.querySelector(".gettrain")
          Dom.style.display = "block";
        })
    },
    getHot(e){
      this.hotsight= [];
      this.hotSightsStart = 0;
      let name = e.target.getAttribute("data-name");
      this.now = name;
      this.$fetch({
        method: 'get',
        url: `/api/sight/hot?city=${name}&hotSightsStart=${this.hotSightsStart}`
      })
        .then(res => {
          if(res.data.error == 1){
            for(let i =0;i < res.data.hotSights.length;i++){
              this.hotsight.push({name:res.data.hotSights[i].name,
              rating:Number(res.data.hotSights[i].overall_rating),
              image:res.data.hotSights[i].image,
              X:res.data.hotSights[i].diPointX,
              Y:res.data.hotSights[i].diPointY});
            }
            this.hotSightsStart +=10;
          }
        })
    },
    handleReachBottom () {
      return new Promise(() => {
          setTimeout(() => {
              const last = this.hotsight[this.hotsight.length - 1];
              let name = this.now
              this.$fetch({
                method: 'get',
                url: `/api/sight/hot?city=${name}&hotSightsStart=${this.hotSightsStart}`
              })
              .then(res => {
                if(res.data.error == 1){
                  for(let i =0;i < res.data.hotSights.length;i++){
                    this.hotsight.push({name:res.data.hotSights[i].name,
                    rating:Number(res.data.hotSights[i].overall_rating),
                    image:res.data.hotSights[i].image,
                    X:res.data.hotSights[i].diPointX,
                    Y:res.data.hotSights[i].diPointY});
                  }
                  this.hotSightsStart +=10;
                }
              })
          }, 1000);
      });
    },
    AddSight(e){
      let X= e.target.getAttribute("data-X");
      let Y= e.target.getAttribute("data-Y");
      let name= e.target.getAttribute("data-name");
      e.target.style.display = "none";
      e.target.parentNode.querySelector(".del_tip").style.display = "block";
      this.cityPath[this.now].push({
        name:name,
        X:X,
        Y:Y
      });
      console.log(this.cityPath);
    },DelSight(e){
      let name= e.target.getAttribute("data-name");
      let k = 0;
      e.target.style.display = "none";
      e.target.parentNode.querySelector(".add_tip").style.display = "block";
      for(let i =0;i<this.cityPath[this.now].length;i++){
        if(name=this.cityPath[this.now].name){
          k = i;
          break; 
        }
      }
      this.cityPath[this.now].splice(k,1);
    },
    TSPpath(){
      let sightpath = {};
      for(let key in this.cityPath){
        let arrX = [];
        let arrY = [];
        for(let i =0;i<this.cityPath[key].length;i++){
          arrX.push(this.cityPath[key][i].X);
          arrY.push(this.cityPath[key][i].Y);
        }
        sightpath[key]=TSP(getDistance(arrX,arrY),arrX.length);
        for(let key in sightpath){
          for(let i =0;i<sightpath[key].length;i++){
            sightpath[key][i] = this.cityPath[key][i].name;
          }
        }
        this.sightPath = sightpath;
        console.log(this.sightPath)
      }
    },
    Postpath(){
       this.$fetch({
        method: 'post',
        url: '/api/route/save-sight',
        data:this.sightPath
      })
        .then(res => {
          alert("存储成功，请到我的出行查看！")
        })
        
    },
    close(){
      let Dom = document.querySelector(".gettrain")
      Dom.style.display = "none";
    }
  },
  mounted () {
    this.$fetch({//获取城市
      method: 'get',
      url: '/api/route/city'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.city = JSON.parse(res.data.passCity)
          for(let i=0;i<this.city.length;i++){
            this.cityPath[this.city[i]]=[];
          }

          this.now = this.city[0];
          this.$fetch({//获取hot
            method: 'get',
            url: `/api/sight/hot?city=${this.now}&hotSightsStart=${this.hotSightsStart}`
          })
            .then(res => {
              if(res.data.error == 1){
                  for(let i =0;i < res.data.hotSights.length;i++){
                    this.hotsight.push({name:res.data.hotSights[i].name,
                    rating:Number(res.data.hotSights[i].overall_rating),
                    image:res.data.hotSights[i].image,
                    X:res.data.hotSights[i].diPointX,
                    Y:res.data.hotSights[i].diPointY});
                  }
                  this.hotSightsStart +=10;
              }
            })
        }
      })
      .catch(()=>{
        alert("请选择路径");
        this.$router.push('/');
      })

  }
}
</script>
<style lang="stylus" scoped>
.sight-route
  display:flex
  padding-top:65px
  height:100%
  .path
    flex:1
    margin:20px 10px
    border-radius:10px
    border:1px solid #42b983
    .tips
      background-color:#42b983
      border-radius:10px 10px 0 0 
      color:#fff
    .path_ul
      .path_li:last-child .train
          display:none
      .path_li
        position:relative
        height:52px
        h3
          text-align:left
          cursor:pointer
        .train
          margin-left:50px
          text-align:left
          height:28px
          line-height:28px
          color:#42b983
          cursor: pointer
        .train::before
          content:''
          width: 24px
          height: 30px
          background-image:url("../img/arrow1.png")
          position:absolute
          top:20px
          left:10px

  .cityPath
    flex:2
    Button
      width:48%
    // .path
    // .header
    // .cityname
    // .citysight
  .hot
    flex:3
    border:2px solid #42b983
    border-radius:5px
    height:98%
    .nowName
      background-color:#42b983
      color:#fff
    .Scroll
      padding:2px
      .HotList       
        .Hot
          display:flex
          .hot_box
            flex:6
          .box_add
            flex:1
            margin:auto
            .add_tip
              width:30px
              height:30px
              line-height:30px
              background-color:#42b983
              color:#fff
              font-size:20px
              cursor:pointer
            .del_tip
              display:none
              width:30px
              height:30px
              line-height:28px
              background-color:#e65b50
              color:#fff
              font-size:20px
              cursor:pointer  
  .gettrain
    display:none
    position:fixed
    top:0
    z-index :1000
    width:100%
    height:100%
    background-color:rgba(0,0,0,.5)
    .Table
      position:absolute
      height:100%
      top:0
      right:0
      left:0
      bottom:0
      overflow:auto
      margin:auto
    .close
      cursor:pointer
      position:fixed
      height: 20px
      width:20px
      background-color:#fff
      line-height :20px
      border-radius:10px
      top:10px
      right:10px
</style>

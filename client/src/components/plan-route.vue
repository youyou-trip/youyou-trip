<template>
  <div class="map-box">
      <div id="map"></div>
      <div class="cities">
        <div class="cities_tip">
          <h1>添加城市</h1> 
        </div>
        <Collapse v-model="value" accordion class="collapse">
            <Panel  v-for="(item,index) in cities" class="panel">
              {{item}}
              <ul slot="content">
                <li v-for="city in country[index]" :data-id="city.city_id" :data-X="city.pointX" :data-Y="city.pointY" :key="city.id" @click="toggleCity($event)">
                  <p>{{city.name}}</p>
                </li>
              </ul>
            </Panel>
        </Collapse>
        <Button @click="clickpath" type="success">确认路线</Button>
      </div>
      <div class="path">
        <span v-for="item in path">{{item}}  </span>
      </div>
  </div>
</template>

<script>
import TSP from '../util/TSP'
import getDistance from '../util/getDistance'

export default {
  data () {
    return {
      City: this.$store.getters.getCity,
      cities: [],
      country: [],
      start: this.$store.getters.getStart ? this.$store.getters.getStart : window.localStorage.getItem('start'),
      end: this.$store.getters.getEnd ? this.$store.getters.getEnd : window.localStorage.getItem('end'),
      value:'1',
      map:{},
      ID:[],
      path:[]

    }
  },
  mounted () {
    var map = new BMap.Map("map");   
    this.map = map;
    map.centerAndZoom(new BMap.Point(108.952, 34.223), 11);
    map.addControl(new BMap.MapTypeControl({
      mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
          ]}));	  
    map.enableScrollWheelZoom(true); 
 
    this.$fetch({
      method: 'get',
      url: '/api/city/all?province=陕西省'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.cities = res.data.city;          
          this.country = res.data.country;
        }
      })

    this.$fetch({
      method: 'get',
      url: '/api/route/start-end'
    })
      .then(res => {
        if (res.data.error === 1) {
          this.$store.dispatch('City',{name:res.data.start,X:res.data.startPos.x,Y:res.data.startPos.y,ID:res.data.startId})
          this.$store.dispatch('City',{name:res.data.end,X:res.data.endPos.x,Y:res.data.endPos.y,ID:res.data.endId})
          this.path.push(res.data.start);
          this.path.push(res.data.end);
        }
      })
  },
  methods: {
    clickpath(){
        this.$fetch({
        method: 'post',
        url: '/api/route/save-city',
        data: {
          route:this.ID
        }
        })
        .then(res => {
          if (res.data === 1) {
            console.log(res.data)
            this.$router.push('/sight-route')
          }
        })
      },
    toggleCity (e) {
      let targetId, targetName,X,Y,sub
       if (e.target.nodeName === 'P') {
        targetId = e.target.parentNode.getAttribute('data-id')
        X = e.target.parentNode.getAttribute('data-X')
        Y = e.target.parentNode.getAttribute('data-Y')
        sub =e.target.parentNode.getAttribute('data-Sub')
        targetName = e.target.innerHTML
      } else if (e.target.nodeName === 'LI') {
        targetId = e.target.getAttribute('data-id')
        X = e.target.getAttribute('data-X')
        Y = e.target.getAttribute('data-Y')
        sub =e.target.getAttribute('data-Sub')
        targetName = e.target.childNode.innerHTML
      }
      if(sub==="true"){
        e.target.className = ''
        e.target.parentNode.setAttribute("data-sub","false")
        this.$store.dispatch('deleteCity', {name:targetName, X:Number(X),Y:Number(Y),ID:Number(targetId)})
      }else{
        this.$store.dispatch('AddCity', {name:targetName, X:Number(X),Y:Number(Y),ID:Number(targetId)})
        e.target.className += 'sub'
        e.target.parentNode.setAttribute("data-sub","true")
      }
    }
  },
  computed:{
    getCity () {
      return this.$store.getters.getCity;
    }
  },
  watch: {
     getCity (val) {
        this.City = val;
        this.map.clearOverlays();
        let arrX = [];
        let arrY = [];
        for(let i=0;i<this.City.length;i++){
          var point = new BMap.Point((Number(this.City[i].X)/1000000).toFixed(3),(Number(this.City[i].Y)/1000000).toFixed(3));  
          this.map.centerAndZoom(point, 8);    
          var marker = new BMap.Marker(point);   
          this.map.addOverlay(marker);
        }
        for(let i =0;i<this.City.length;i++){
          arrX.push(this.City[i].X);
          arrY.push(this.City[i].Y);
        }
        let cityPath  = TSP(getDistance(arrX,arrY),arrX.length);
        let IDpath = [];
        let arrPath = [];
        this.path = [];
        for(let i =0;i<cityPath.length;i++){
          this.path.push(this.City[cityPath[i]].name);
          IDpath.push(this.City[cityPath[i]].ID);
          arrPath.push(new BMap.Point((Number(this.City[cityPath[i]].X)/1000000).toFixed(3),(Number(this.City[cityPath[i]].Y)/1000000).toFixed(3)));
        }
        var polyline = new BMap.Polyline(
            arrPath,
            {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
            );
        this.map.addOverlay(polyline);
        this.ID = IDpath;
     }
  }
}
</script>
<style lang="stylus" scoped>
.path
  position:fixed
  top:10%
  right:8%
  width:70%
  height:50px
  background:#fff
  border:2px solid #42b983
  border-radius:5px
.cities
  border-radius:10px
  position: fixed
  top: 10%
  left: 1%
  width:20%
  height:80%
  background:#fff
  Button
    width:100%
    margin:10px 0
  .cities_tip
    border-radius:10px 10px 0 0
    background-color:#42b983
    color:#fff
    height:10%
    padding: 10px 0
  .collapse
      width:100%;
      height:88%;
      overflow:auto;
    .panel
      text-align:left
      ul
        li
          text-align:center 
          position: relative
          display: inline-block
          width: 6rem
          margin: 0.2rem 0.8rem
          list-style: none
          cursor: pointer
          background-color :#42b983
          color:#fff
          border-radius: 5px
          &:hover
            p::after
              display: inline-block
              position: absolute
              right: -0.2rem
              top: -0.4rem
              width: 0.8rem
              height: 0.8rem
              color: #ffffff
              background: red
              border-radius: 50%
              text-align: center
              line-height: 0.9rem
              font-size: 0.8rem
              content: '+'
            p.sub::after
              content: '-'
.map-box
  width: 100%
  height: 100% 
  #map
    width: 100%
    height: 100%
    overflow: hidden
    margin:0
    font-family:"微软雅黑"
</style>

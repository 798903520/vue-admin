<template>
  <el-button @click="initData()">点击重随</el-button>
  <el-button @click="move(true)">点击开始</el-button>
  <el-button @click="move(false)">点击结束</el-button>
  <div id="ball">
    <canvas id="ballCanvas" height="500" width="600"></canvas>
  </div>

</template>

<script>
import ballClass from '../../js/ball.js'
export default {
  name: "ball",
  data(){
    return {
      ballInitData:[],
      timmer:null,
    }
  },
  methods:{
    //小球移动
    move(type){
      if(!type){
        clearInterval(this.timmer);
        this.timmer = null;
        return;
      }
      let _this = this;
      //left => x   top => y
      this.timmer = setInterval(function (){
        _this.ballInitData.forEach(item => {
          let sd = item.speed-(item.speed/2),sd_1 = item.speed,sd_2 = item.speed+(item.speed/2);
          switch (item.moveType){
            case 0:
              item.top-=sd_2;
              item.left+=sd;
              item.top<=0+item.len/2?item.moveType=5:'';
              item.left>=600-item.len/2?item.moveType=11:'';
              break;
            case 1:
              item.top-=sd_1;
              item.left+=sd_1;
              item.top<=0+item.len/2?item.moveType=4:'';
              item.left>=600-item.len/2?item.moveType=10:'';
              break;
            case 2:
              item.top-=sd;
              item.left+=sd_2;
              item.top<=0+item.len/2?item.moveType=3:'';
              item.left>600-item.len/2?item.moveType=9:'';
              break;
            case 3:
              item.top+=sd;
              item.left+=sd_2;
              item.top>=500-item.len/2?item.moveType=2:'';
              item.left>=600-item.len/2?item.moveType=8:'';
              break;
            case 4:
              item.top+=sd_1;
              item.left+=sd_1;
              item.top>=500-item.len/2?item.moveType=1:'';
              item.left>=600-item.len/2?item.moveType=7:'';
              break;
            case 5:
              item.top+=sd_2
              item.left+=sd;
              item.top>=500-item.len/2?item.moveType=0:'';
              item.left>=600-item.len/2?item.moveType=6:'';
              break;
            case 6:
              item.top+=sd_2;
              item.left-=sd;
              item.left<=0+item.len/2?item.moveType=5:'';
              item.top>=500-item.len/2?item.moveType=11:'';
              break;
            case 7:
              item.top+=sd_1;
              item.left-=sd_1;
              item.left<=0+item.len/2?item.moveType=4:'';
              item.top>=500-item.len/2?item.moveType=10:'';
              break;
            case 8:
              item.top+=sd;
              item.left-=sd_2
              item.left<=0+item.len/2?item.moveType=3:'';
              item.top>=500-item.len/2?item.moveType=9:'';
              break;
            case 9:
              item.top-=sd;
              item.left-=sd_2;
              item.top<=0+item.len/2?item.moveType=8:'';
              item.left<=0+item.len/2?item.moveType=2:'';
              break;
            case 10:
              item.top-=sd_1;
              item.left-=sd_1;
              item.top<=0+item.len/2?item.moveType=7:'';
              item.left<=0+item.len/2?item.moveType=1:'';
              break;
            case 11:
              item.top-=sd_2;
              item.left-=sd;
              item.top<=0+item.len/2?item.moveType=6:'';
              item.left<=0+item.len/2?item.moveType=0:'';
              // item.top<=0+item.len/2?item.top=-(item.top):item.top-=sd_2;
              // item.left<=0+item.len/2?item.left=-(item.left):item.left-=sd;
              break;
          }
        })
        //清除画布
        let canvasBall = document.getElementById('ballCanvas');
        let ctx = canvasBall.getContext('2d');
        ctx.fillStyle='rgba(255,255,255,0.5)'
        ctx.fillRect(0,0,canvasBall.width,canvasBall.height)
        _this.initBall();
      },10)

    },
    //初始化数据
    initData(){
      this.ballInitData = window.newBall(10);
      //清除画布
      let canvasBall = document.getElementById('ballCanvas');
      let ctx = canvasBall.getContext('2d');
      ctx.clearRect(0,0,canvasBall.width,canvasBall.height)

      this.initBall()
    },
    //初始化画布
    initBall(){
      let canvasBall = document.getElementById('ballCanvas');
      let ctx = canvasBall.getContext('2d');
      for (let i=0;i<this.ballInitData.length;i++){
        let item= this.ballInitData[i];
        ctx.beginPath();
        ctx.fillStyle=item.color;
        ctx.arc(item.left,item.top,item.len/2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
      }
    }
  },
  mounted() {
    this.initData();
  }
}
</script>
<script setup>
!(function ballFun () {
  let ballData = [];
  window.newBall = function (x){
    ballData = [];
    for(let i = 0;i<x;i++){
      ballData.push(new ballClass());
    }
    return ballData;
  }
})()
</script>

<style scoped lang="less">
#ball{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
#ballCanvas{
  border: 1px solid black;
}
</style>

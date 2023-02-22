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
        clearInterval(this.timmer);
        this.timmer = null;
      if(!type){
        return;
      }
      let _this = this;
      this.timmer = setInterval(function (){
        for(let item of _this.ballInitData){
          item.move();
        }
        //清除画布
        let canvasBall = document.getElementById('ballCanvas');
        let ctx = canvasBall.getContext('2d');
        ctx.fillStyle='rgba(255,255,255,0.5)'
        ctx.fillRect(0,0,canvasBall.width,canvasBall.height)
        _this.initBall();
      },20)

    },
    //初始化数据
    initData(){
      this.ballInitData = window.newBall(50);
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
// 立即执行 闭包函数绑定到window
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

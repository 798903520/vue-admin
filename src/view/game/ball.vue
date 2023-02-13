<template>
  <el-button @click="initData()">点击重随</el-button>
  <div id="ball">
    <canvas id="ballCanvas" height="500" width="500"></canvas>
  </div>

</template>

<script>
import ballClass from '../../js/ball.js'
export default {
  name: "ball",
  data(){
    return {
      ballInitData:[],
    }
  },
  methods:{
    initData(){
      this.ballInitData = window.newBall(10);
      //清除画布
      let canvasBall = document.getElementById('ballCanvas');
      let ctx = canvasBall.getContext('2d');
      ctx.clearRect(0,0,canvasBall.width,canvasBall.height)

      this.initBall()
    },
    initBall(){
      let canvasBall = document.getElementById('ballCanvas');
      let ctx = canvasBall.getContext('2d');
      for (let i=0;i<this.ballInitData.length;i++){
        let item= this.ballInitData[i];
        ctx.beginPath();
        ctx.fillStyle=item.color;
        ctx.arc(item.top,item.left,item.len/2,0,2*Math.PI);
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

<template>
  <div class="center" id="back">
    <div class="centerB" id="point">
      <div class="cecrat" id="eye">
        <div class="eyeCenter"></div>
        <div class="highLight1"></div>
        <div class="highLight2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "domMove",
  data() {
    timmer:null
  },
  methods: {
    getWidth() {
      let data = document.getElementById('back');
      let data2 = document.getElementById('point');
      let data3 = document.getElementById('eye');

      let regX, regY;
      let eyex,eyey;
      data.addEventListener('mousemove', function (even) {
        //节流
        if(this.timmer){return;}
        this.timmer = setTimeout(()=>{
          regX = (even.offsetX - (data.clientWidth / 2)) / 15 * (-1);
          regY = (even.offsetY - (data.clientHeight / 2)) / 10 * (1);

          eyex = (even.offsetX - (data.clientWidth / 2)) / 7;
          eyey = (even.offsetY - (data.clientHeight / 2)) / 5;
          data3.style.marginTop = `${eyey}px`,
          data3.style.marginLeft = `${eyex}px`,
          data2.style.transform = `rotateX(${regY}deg) rotateY(${regX}deg)`;
          this.timmer = null;
        },40)
      })
      data.addEventListener('mouseleave', function (even) {
        clearTimeout(this.timmer);
        this.timmer = null;
        data3.style.marginTop = `0px`,
        data3.style.marginLeft = `0px`,
        data2.style.transform = `rotateX(0deg) rotateY(0deg)`;
      })
    },
  },
  mounted() {
    this.getWidth();
  }
}
</script>

<style scoped lang="less">
.center {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;

  .centerB {
    width: 200px;
    height: 150px;
    background-color: #ececec;
    transform-style: preserve-3d;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 60%;
    .cecrat{
      width: 100px;
      height: 100px;
      background-color: black;
      border-radius: 50px;
      position: relative;
      box-shadow: 0px 0px 15px 15px rgba(0,0,0,0.15);
      .eyeCenter{
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: #bebebe;
        border-radius: 10px;
      }
      .highLight1{
        height: 30px;
        width: 10px;
        position: absolute;
        top: 25px;
        left: 10px;
        background-color: white;
        border-radius: 10px;
      }
      .highLight2{
        height: 10px;
        width: 10px;
        position: absolute;
        top: 65px;
        left: 10px;
        border-radius: 5px;
        background-color: white;
      }
    }
  }
}
</style>

<!--
 * @Description:
 * @Author: denglinlin
 * @Date: 2022-05-21 11:45:20
 * @LastEditors: denglinlin
 * @LastEditTime: 2022-05-23 17:00:20
-->
<template>
  <div id="order">
    <div class="scorce">
      <div class="left"><span>得分:</span><span>{{allPoint}}</span></div>
      <div class="mid"><span>{{flag == true ?'正在游戏' : '暂停'}}</span></div>
      <div class="right"><span>时间:</span><span>{{allTimecom}}</span></div>
    </div>
    <div
      class="snake"
      v-for="(item, index) in body"
      :key="item.id"
      :style="styleOption(item, index)"
    ></div>
    <div class="food" :style="foodStyle(food)">徐</div>
    <div class="gameOver" v-if="gameIsOver">
      <h1>游戏结束</h1>
      <h1>得分{{allPoint}}</h1>
      <span class="restart" @click="restart()">重新开始</span>
    </div>
  </div>
</template>

<script>
"order";
export default {
  computed:{
    allTimecom(){
      if(this.allTime == 0){
        return '00:00'
      }else{
        let m,mm,s,ss;
        ss = (parseInt(this.allTime/60)<10)? ('0'+parseInt(this.allTime/60)):(''+parseInt(this.allTime/60));
        s = (this.allTime%60<10)? ('0'+this.allTime%60):(''+this.allTime%60);
        m = (ss%60<10)? ('0'+ss%60):(''+ss%60);
        return `${m}:${s}`
      }
    },
  },
  data() {
    return {
      //游戏状态
      nowType:0,
      //时间
      allTime:0,
      //时间定时器
      timeTimer:null,
      //得分
      allPoint:0,
      // 移动速度
      fast:500,
      // 食物
      food:{
        x:0,
        y:0,
      },
      // 是否开启穿墙模式
      isThrow: false,
      // 游戏是否结束
      gameIsOver: false,
      // 暂停
      flag: true,
      // 定时器
      timmer: null,
      // 方向
      direction: null,
      // 蛇身体
      body: [
        {
          x: 20,
          y: 0,
          id: 0,
        },
        {
          x: 10,
          y: 0,
          id: 1,
        },
        {
          x: 0,
          y: 0,
          id: 2,
        },
      ],
    };
  },

  //进入组件
  mounted() {
    this.init();
  },
  methods: {
    // 吃到食物
    eatFood(){
      let _this = this;
      if((_this.body[0].x - _this.food.x)==0&&(_this.body[0].y - _this.food.y)==0){
        _this.allPoint+=100;
          _this.body.push({
            x:_this.food.x,
            y:_this.food.y,
            id:_this.body.length+1
          });
          _this.food < 250 ? _this.fast -=20:_this.fast -=50;
          _this.food = _this.randomFood();
          clearInterval(_this.timmer);
          _this.stepOne();
        }
    },
    // 食物
    foodStyle(food){
      return {
        position: "absolute",
          top: food.y + "px",
          left: food.x + "px",
          backgroundColor: "red",
          width: "10px",
          height: "10px",
          color:"blue",
          fontSize:'12px',
          lineHeight:"12px"
      }
    },
    // 重新开始
    restart() {
      this.body = [
        {
          x: 0,
          y: 0,
          id: 0,
        },
        {
          x: -10,
          y: 0,
          id: 1,
        },
        {
          x: -20,
          y: 0,
          id: 2,
        },
      ];
      this.allTime = 0;
      this.init();
      this.gameIsOver = false;
    },
    // 初始化
    init() {
      // 方向标志位
      this.direction = "right";
      this.food = this.randomFood();
      this.stepOne();
      this.keyDown();
      this.getTime();
    },
    //获取时间
    getTime(){
      let _this = this;
      _this.timeTimer = setInterval(function (){
        _this.allTime += 1;
      },1000);
    },
    // 暂停时间
    stopTime(){
      clearInterval(this.timeTimer);
      this.timeTimer = null;
    },
    // 监听按键事件
    keyDown() {
      let _this = this;
      document.onkeydown = function (e) {
        let type = e || window.event || arguments.callee.caller.arguments[0];
        // 向左
        if (
          type &&
          type.keyCode == 37 &&
          _this.direction != "right" &&
          _this.direction != "left" &&
          _this.flag == true
        ) {
          clearInterval(_this.timmer);
          _this.direction = "left";
          _this.stepOne();
          return;
        }
        // 向右
        if (
          type &&
          type.keyCode == 39 &&
          _this.direction != "left" &&
          _this.direction != "right" &&
          _this.flag == true
        ) {
          clearInterval(_this.timmer);
          _this.direction = "right";
          _this.stepOne();
          return;
        }
        // 向上
        if (
          type &&
          type.keyCode == 38 &&
          _this.direction != "down" &&
          _this.direction != "up" &&
          _this.flag == true
        ) {
          clearInterval(_this.timmer);
          _this.direction = "up";
          _this.stepOne();
          return;
        }
        // 向xia
        if (
          type &&
          type.keyCode == 40 &&
          _this.direction != "up" &&
          _this.direction != "down" &&
          _this.flag == true
        ) {
          clearInterval(_this.timmer);
          _this.direction = "down";
          _this.stepOne();
          return;
        }
        // 暂停
        if (type && type.keyCode == 32) {
          clearInterval(_this.timmer);
          _this.flag = !_this.flag;
          _this.flag == false?_this.stopTime():_this.getTime();
          if (_this.flag == true) {
            _this.stepOne();
          }
        }
      };
    },
    // 位置
    stepOne() {
      let _this = this;
      _this.timmer = setInterval(function () {
        for (let i = _this.body.length - 1; i > 0; i--) {
          _this.body[i].x = _this.body[i - 1].x;
          _this.body[i].y = _this.body[i - 1].y;
        }
        switch (_this.direction) {
          case "left":
            _this.body[0].x -= 10;
            break;
          case "up":
            _this.body[0].y -= 10;
            break;
          case "down":
            _this.body[0].y += 10;
            break;
          default:
            _this.body[0].x += 10;
            break;
        }
        _this.eatFood();
        if (_this.isThrow == true) {
          _this.isOpen();
        } else {
          _this.isNotOpen();
        }
      }, this.fast);
    },
    // 是否开启穿墙模式
    isNotOpen() {
      if (
        this.body[0].x < 0 ||
        this.body[0].x > 490 ||
        this.body[0].y < 0 ||
        this.body[0].y > 490
      ) {
        clearInterval(this.timmer);
        this.gameIsOver = true;
        clearInterval(this.timeTimer);
        this.timeTimer = null;
        this.allTime == 0;
      }
    },
    isOpen() {},
    // 随机位置
    randomFood(){
      let x = Math.round(Math.random()*49)*10;
      let y = Math.round(Math.random()*49)*10;
      return {
        x:x,
        y:y
      }
    },
    // 样式设置
    styleOption(item, index) {
      if (index == 0) {
        return {
          position: "absolute",
          top: item.y + "px",
          left: item.x + "px",
          backgroundColor: "black",
          width: "10px",
          height: "10px",
        };
      } else if (index == this.body.length - 1) {
        return {
          position: "absolute",
          top: item.y + "px",
          left: item.x + "px",
          backgroundColor: "black",
          width: "6px",
          height: "6px",
          margin:'2px'
        };
      } else {
        return {
          position: "absolute",
          top: item.y + "px",
          left: item.x + "px",
          backgroundColor: "black",
          width: "8px",
          height: "8px",
          margin:'1px'
        };
      }
    },
  },
  //实例创建之前钩子函数--给body添加行内样式
  beforeCreate() {},
  //实例销毁之前钩子--移除body 标签的属性style
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
#order {
  user-select: none;
  height: 500px;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: antiquewhite;
  box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.2),
    -1px -1px 5px 5px rgba(0, 0, 0, 0.2);
  .scorce{
    position: absolute;
    top: -50px;
    font-size: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .gameOver {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ;
    h1 {
      text-align: center;
      margin-bottom: 50px;
    }
    .restart:hover {
      cursor: pointer;
      color: aquamarine;
    }
  }
}
</style>

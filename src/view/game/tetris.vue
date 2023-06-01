<template>
  <div class="eluosibg">
    <div class="leftArea">{{ isPlay }}</div>
    <canvas id="canBG" width="360" height="600"></canvas>
    <div class="rightArea"></div>
    <!-- <img src="/src/assets/img/bg.png" alt=""> -->
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import tetrisBlock from "../../js/tetris";


const whBoth = 30;//边长
const _width = 360;
const _height = 600;

// 生成 x 条数据
function getTData(x) {
  let num = x;
  let itemData = [];
  function returndata(num) {
    itemData = [];
    for (let i = 0; i < num; i++) {
      itemData.push(new tetrisBlock());
    }
    return itemData;
  }
  return returndata(num);
}


// 初始化背景数据
const BGData = ref([]);


/**
  * 填充背景数组
  */
function fillBGArr(x = 12, y = 20) {
  let data = [];
  for (let i = 0; i < x; i++) {
    data.push([]);
    for (let j = 0; j < y; j++) {
      data[i][j] = 0;
    }
  }
  BGData.value = data;
  drawBG();
}


// 全局画笔
const ctx = ref({});


/**
  * 画出背景
  */
async function drawBG() {
  // let img1 = new Image();
  // img1.src = '/src/assets/img/bg.png';

  // img1.onload = function () {
  for (let itemx = 0; itemx < BGData.value.length; itemx++) {
    for (let itemy = 0; itemy < BGData.value[itemx].length; itemy++) {
      // console.log(`x=${itemx},y=${itemy}`);

      // 填充矩形
      if(BGData.value[itemx][itemy] == 0){
        ctx.value.strokeRect(itemx * whBoth, itemy * whBoth, whBoth, whBoth);
      }else if(BGData.value[itemx][itemy] == 1){
        ctx.value.fillRect(itemx * whBoth, itemy * whBoth, whBoth, whBoth);
      }
      // ctx.fillRect(itemx*whBoth+whBoth/2.6,itemy*whBoth+whBoth/2.6,whBoth/4,whBoth/4);

      // 填充自定义图片
      // ctx.drawImage(img1, itemx * whBoth, itemy * whBoth, whBoth, whBoth)
    }
  }
  // }

}


// 清除画布
function clearBG() {
  ctx.value.fillStyle = 'rgba(255,255,255,1)'
  ctx.value.fillRect(0, 0, _width, _height);
  ctx.value.fillStyle = 'black';
}


/**
  * 获取画笔
  */
function getDraw() {
  let can = document.getElementById('canBG');
  ctx.value = can.getContext('2d');

  // 注册事件
  window.onkeydown = function (e) {
    console.log('e', e.which);

    switch (count.value) {
      case null:
        count.value = true;
        gameStart();
        break;
      case true:
        if (e.which == 32) {
          count.value = false;
          gameStop()
        }
        break;
      case false:
        if (e.which == 32) {
          count.value = true;
          gameContinue()
        }
        break;

      default:
        break;
    }
  }
}

// 时间控制
let timmer = null;
// 当前方块
const nowFK = reactive({});
// 下一个方块
const nextFK = reactive({});

//四种状态
function gameStart() {
  console.log('ctx', ctx.value);
  nowFK.value = new tetrisBlock(whBoth, 0);
  nextFK.value = new tetrisBlock(whBoth);
  timmer = setInterval(() => {
    fullDwn()
  }, 1000);
}
function gameStop() {
  clearInterval(timmer);
  timmer = null;
}
function gameContinue() {
  timmer = setInterval(() => {
    fullDwn();
  }, 1000);
}
function gameEnd() { }

function fullDwn() {
  clearBG();
  drawBG();
  // if (nowFK.value.pointY == )
    for (let index in nowFK.value.arr) {
      for (let idx in nowFK.value.arr[index]) {
        console.log('nowFK.value.arr[index]', nowFK.value.arr[index][idx]);
        if (nowFK.value.arr[index][idx] == 1) {
          ctx.value.fillRect(
            nowFK.value.pointX + index * whBoth,
            nowFK.value.pointY + idx * whBoth,
            whBoth, whBoth
          )
        }
      }
    }
  nowFK.value.fullDown();
}

function fulldown1(){
  for (let index in nowFK.value.arr) {
      for (let idx in nowFK.value.arr[index]) {
        console.log('nowFK.value.arr[index]', nowFK.value.arr[index][idx]);
        BGData.value[5][0] = BGData.value[5][0] == nowFK.value[index][idx]?'':'';
        // if (nowFK.value.arr[index][idx] == 1) {
        //   ctx.value.fillRect(
        //     nowFK.value.pointX + index * whBoth,
        //     nowFK.value.pointY + idx * whBoth,
        //     whBoth, whBoth
        //   )
        // }
      }
    }
  BGData.value[5][0] == nowFK.value[0][0]
}


const count = ref(null);
const isPlay = computed(() => {
  switch (count.value) {
    case null:
      return '点击任意键开始';
    case true:
      return '游戏中'
    case false:
      return '暂停中'
  }
});
/**
  * 变化状态
  */


onMounted(() => {
  getDraw();
  fillBGArr();

});
</script>

<style scoped lang="less">
.eluosibg {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

  .leftArea,
  .rightArea {
    flex: 1;
  }

  .leftArea {
    // text
  }
}

#canBG {
  border: 1px solid black;
  margin: 0 20px;
}
</style>

<template>
<div class="drawPage">
  <div class="leftBar">
    <el-tabs tab-position="left" type="border-card" >
      <el-tab-pane label="图形">
        <div class="itemType" v-for="item in typeList" :key="item.key" @dragstart="getDragType(item.key)" draggable="true">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="画笔">画笔</el-tab-pane>
      <el-tab-pane label="图层">图层</el-tab-pane>
    </el-tabs>
  </div>
  <div class="board" @mouseup="moveStop($event)">
    <div :draggable="false" id="topBlock" class="topLine lineBtn" @mousedown="mouseIsDown($event,'topBlock')"></div>
    <div :draggable="false" id="rightBlock" class="rightLine lineBtn" @mousedown="mouseIsDown($event,'rightBlock')"></div>
    <div :draggable="false" id="bottomBlock" class="bottomLine lineBtn" @mousedown="mouseIsDown($event,'bottomBlock')"></div>
    <div :draggable="false" id="leftBlock" class="leftLine lineBtn" @mousedown="mouseIsDown($event,'leftBlock')" ></div>
    <canvas @dragleave="leaveCanvas($event)" @click="clickBoard($event)"
            @dragover="getXY($event)" ondragover="event.preventDefault()"
            id="drawBoard" width="800" height="600"></canvas>
  </div>
</div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {Rectangle} from '../../js/drawBoard02.js'


//拖拽的图形
const type = ref('');
//图形
const typeList = ref([
  {
    name:'矩形',
    key:'Rectangle'
  }
]);


/**
  * 实例数组
  */
const drawArr = ref([]);

/**
  * 根据类型添加数据
  */
function addInArr(e){
  console.log('type.value',type.value)
  switch (type.value) {
    case 'Rectangle':
      drawArr.value.unshift(new Rectangle('drawBoard',e.offsetX,e.offsetY));
      break;
    // case 'Rectangle':
    //   drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
    //   break;
    // case 'Rectangle':
    //   drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
    //   break;
    // case 'Rectangle':
    //   drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
    //   break;
    // case 'Rectangle':
    //   drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
    //   break;
    // case 'Rectangle':
    //   drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
    //   break;
  }
}

//用于节流
let timmer = null;
//拖入获取位置
function getXY(e){
  if(timmer){
    clearTime();
    timmer = setTimeout(()=>{
      // drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
      addInArr(e);
      draw();
      clearTime();
    },100);
  }else{
    timmer = setTimeout(()=>{
      // drawArr.value.unshift(new Rectangle(ctx.value,e.offsetX,e.offsetY));
      addInArr(e);
      draw();
      clearTime();
    },100);
  }
}
function leaveCanvas(e){
  clearTime();
  console.log('dragEnd',e)
}

/**
  * 清除计时器
  */
function clearTime(){
  clearTimeout(timmer);
  timmer = null;
}


function draw() {
  ctx.value.fillStyle = 'rgba(255,255,255,1)';
  ctx.value.fillRect(0,0,800,600)
  for(let i=drawArr.value.length-1;i>=0;i--){
    drawArr.value[i].clean();
    drawArr.value[i].draw();
  }
}

//点击位置时对比数据
function clickBoard(e) {
  let idx = drawArr.value.findIndex((item) => {

    return item.x-parseInt(item.width/2)<e.offsetX &&
    e.offsetX < (item.x-parseInt(item.width/2)+item.width) &&
    item.y-parseInt(item.height/2)<e.offsetY &&
    e.offsetY < (item.y-parseInt(item.height/2)+item.height)

  });
  //未点击到块直接退出
  if(idx == -1){
    drawArr.value[0]?drawArr.value[0].strokeColor = 'black':'';
    drawArr.value[0]?drawArr.value[0].setBtn():'';
    draw();
    return
  }

  //符合条件的第一个块置顶并且框变蓝色
  let clickData = drawArr.value.splice(idx,1);
  drawArr.value[0]?drawArr.value[0].strokeColor = 'black':'';
  clickData[0].strokeColor = 'rgb(76,130,232)';
  drawArr.value.unshift(clickData[0]);
  draw();

//  根据数据给锚点定位
  drawArr.value[0].lineBtnPosition();
}



/**
  * 鼠标按事件
  */
let moveDomId = null;
let positionArr = {};
function mouseIsDown(e,id){
  // console.log('mouseIsDown',e)
  positionArr.x=e.pageX;
  positionArr.y=e.pageY;
  moveDomId = id;
}
function mouseIsUp(e,id){
  console.log('mouseIsUp',e)
  // moveDom.onmousemove=()=>{};
}

function moveStop(e){
  // moveDom?moveDom.onmousemove=()=>{}:'';
  console.log('e',positionArr.y,e.pageY)
  if(!moveDomId){return}
  switch (moveDomId){
    case 'topBlock':
        drawArr.value[0].y += (e.pageY-positionArr.y)/2;
        drawArr.value[0].height -= (e.pageY-positionArr.y);
      break;
    case 'rightBlock':
      drawArr.value[0].x += (e.pageX-positionArr.x)/2;
      drawArr.value[0].width += (e.pageX-positionArr.x);
      break;
    case 'bottomBlock':
      drawArr.value[0].y += (e.pageY-positionArr.y)/2;
      drawArr.value[0].height += (e.pageY-positionArr.y);
      break;
    case 'leftBlock':
      drawArr.value[0].x += (e.pageX-positionArr.x)/2;
      drawArr.value[0].width -= (e.pageX-positionArr.x);
      break;
  }
  draw();
  drawArr.value[0].lineBtnPosition();
  moveDomId = null;
  positionArr = {};
}

//画笔
const ctx = ref({});
onMounted(()=>{
  let canvas = document.getElementById('drawBoard');
  ctx.value = canvas.getContext('2d');
});




/**
  * h获取拖拽的类型
  */
function getDragType (t){
  type.value = t;
}

</script>

<style scoped lang="less">
.drawPage{
  width: 100%;
  height: 100%;
  display: flex;
  .leftBar{
    width: 200px;
    .itemType{
      font-size: 13px;
      color: #858585;
      border: 1px solid #cbcbcb;
      padding: 10px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .board{
    flex:1;
    border: 1px solid #dcdfe6;
    position: relative;
    overflow: hidden;

    --topLine-top:-10px;
    --topLine-left:-10px;
    --rightLine-top:-10px;
    --rightLine-left:-10px;
    --bottomLine-top:-10px;
    --bottomLine-left:-10px;
    --leftLine-top:-10px;
    --leftLine-left:-10px;

    .lineBtn{
      height: 10px;
      width: 10px;
      background-color: rgba(70, 123, 224,0.5);
      position: absolute;
      user-select: none;
    }
    .topLine{
      top: var(--topLine-top);
      left: var(--topLine-left);
      cursor: row-resize;
    }
    .rightLine{
      top: var(--rightLine-top);
      left: var(--rightLine-left);
      cursor:col-resize ;
    }
    .bottomLine{
      top: var(--bottomLine-top);
      left: var(--bottomLine-left);
      cursor: row-resize;
    }
    .leftLine{
      top: var(--leftLine-top);
      left: var(--leftLine-left);
      cursor:col-resize ;
    }
  }

  ::v-deep .el-tabs__item.is-left{
    padding: 0 5px;
  }
  ::v-deep .el-tabs{
    height: 100%;
    .el-tabs__content{
      padding: 10px;
      height: 100%;
      margin: 0;
    }
    .el-tabs__header{
      margin: 0;
    }
  }
}
#drawBoard{
  border: 1px dashed #04a2db;
}
</style>

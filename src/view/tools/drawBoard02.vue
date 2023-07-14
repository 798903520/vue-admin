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
      <el-tab-pane label="图层">
        <div class="itemType3" @click="selectToTop(item,index)" :class="{'selected':item.selected}" v-for="(item,index) in drawArr" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="close" @click="">&times;</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作">
        <div class="itemType3">
          <span>透明</span>
          <el-switch size="small" v-model="whiteBackground" @change="changeBackground()"></el-switch>
          <input v-model="backgroundColor" @change="changeBackground(true)" type="color">
        </div>
        <div class="itemType3" @click="exportCanvasAsPNG('drawBoard')">
          保存PNG
        </div>
        <div class="itemType3" @click="exportCanvasData()">
          导出数据
        </div>
      </el-tab-pane>
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
//是否透明背景
const whiteBackground = ref(false);
//背景颜色
const backgroundColor = ref('#ffffff');

/**
  * 根据类型添加数据
  */
function addInArr(e){
  console.log('type.value',type.value)
  switch (type.value) {
    case 'Rectangle':
      drawArr.value.unshift(new Rectangle('drawBoard',e.offsetX,e.offsetY));
      drawArr.value[0].name = '矩形'+drawArr.value.length;
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
  ctx.value.clearRect(0,0,800,600);
  if(whiteBackground.value){
    let style = '';
    style= backgroundColor.value;
    ctx.value.fillStyle = style;
    ctx.value.fillRect(0,0,800,600)
  }
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

  if(drawArr.value.length == 0){return}
  // 如果选中 终止后面点击操作的判断
  if(drawArr.value[0].selected){
    drawArr.value[0].x = e.offsetX;
    drawArr.value[0].y = e.offsetY;
    drawArr.value[0].strokeColor = 'black'
    drawArr.value[0].setBtn();
    draw();
    drawArr.value[0].selected = null;
    return
  }

  //未点击到块直接退出
  if(idx == -1){
    drawArr.value[0].strokeColor = 'black';
    drawArr.value[0].setBtn();
    drawArr.value[0].selected = null;
    draw();
    return
  }else{
    //符合条件的第一个块置顶并且框变蓝色
    let clickData = drawArr.value.splice(idx,1);
    drawArr.value[0]?drawArr.value[0].strokeColor = 'black':'';
    clickData[0].strokeColor = 'rgb(76,130,232)';
    drawArr.value.unshift(clickData[0]);
    draw();

    //  根据数据给锚点定位
    drawArr.value[0].lineBtnPosition();
    drawArr.value[0].selected = true;
  }

}



/**
  * 鼠标按事件
  */
let moveDomId = null;
let positionArr = {};
function mouseIsDown(e,id){
  positionArr.x=e.pageX;
  positionArr.y=e.pageY;
  moveDomId = id;
}
function mouseIsUp(e,id){
  console.log('mouseIsUp',e)
  // moveDom.onmousemove=()=>{};
}

function moveStop(e){
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
  drawArr.value[0].strokeColor = 'black';
  drawArr.value[0].setBtn();
  draw();
  drawArr.value[0].selected = null;
  // drawArr.value[0].lineBtnPosition();
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

/**
  * 选择置顶
  */
function selectToTop(data,idx){
  if(idx == 0){
    drawArr.value[0].strokeColor = 'black';
    drawArr.value[0].selected = null;
    draw();
    drawArr.value[0].setBtn();
    return;
  }

  drawArr.value.forEach(item => {
    item.selected  = null;
  })
  let clickData = drawArr.value.splice(idx,1);
  drawArr.value[0]?drawArr.value[0].strokeColor = 'black':'';
  clickData[0].strokeColor = 'rgb(76,130,232)';
  drawArr.value.unshift(clickData[0]);
  draw();

  //  根据数据给锚点定位
  drawArr.value[0].lineBtnPosition();
  drawArr.value[0].selected = true;
}


/**
  * 切换背景
  */
function  changeBackground(type = false){
  type?whiteBackground.value=true:"";

  draw();
}

function createTimestamp () {
  return parseInt(new Date().getTime() / 1000) + '';
};
/**
  * 保存为png
  */
function exportCanvasAsPNG(id) {
  let fileName = `point_${createTimestamp()}.png`;
  let canvasElement = document.getElementById(id);
  let MIME_TYPE = "image/png";
  let imgURL = canvasElement.toDataURL(MIME_TYPE);
  let dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
/**
  * 保存数据
  */
function exportCanvasData(){

}



</script>

<style scoped lang="less">
.drawPage{
  width: 100%;
  height: 100%;
  display: flex;
  .leftBar{
    width: 200px;

    --el-switch-off-color:#04a0e9;
    --el-switch-on-color:#4879bd;
    .itemType{
      font-size: 13px;
      color: #858585;
      border: 1px solid #cbcbcb;
      padding: 10px;
      border-radius: 2px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .itemType3{
      font-size: 13px;
      color: #858585;
      border: 1px solid #cbcbcb;
      padding: 8px;
      border-radius: 2px;
      cursor: pointer;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .close{
        font-size: 20px;
        display: block;
        height: 15px;
        width: 15px;
        line-height: 15px;
        padding: 2px;
      }
    }
    .itemType3.selected{
      border: 1px solid #3073da;
      color: #3073da;
    }
  }
  .board{
    flex:1;
    border: 1px solid #dcdfe6;
    position: relative;
    overflow: hidden;
    background-color: #eaeaea;

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
      height: calc(100% - 10px);
      margin: 0;
      overflow-y: auto;
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

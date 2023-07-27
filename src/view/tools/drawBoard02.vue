<template>
<div class="drawPage">
  <div class="leftBar">
    <el-tabs tab-position="left" @tab-change="getIndex" type="border-card" >
      <el-tab-pane label="图形">
        <div class="itemType" v-for="item in typeList" :key="item.key" @dragstart="getDragType(item.key)" draggable="true">
          {{item.name}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="画笔">
        <div v-if="canvasList.isPaint?true:false" class="itemType3">
          <span>颜色</span>
          <input v-model="canvasList.drawArr[0].strokeColor" @change="" type="color">
        </div>
        <div v-if="canvasList.isPaint?true:false" class="itemType3">
          <span>粗细</span>
          <div class="lineType" :class="{'is_select':canvasList.drawArr[0].width == item}"
               @click="canvasList.drawArr[0].width = item"
               :title="`宽度${item}像素`" v-for="(item,index) in lineTypeList" :key="item">
            <span :style="{width:item+'px'}" :class="'line_'+index"></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图层">
        <span v-if="canvasList.drawArr.length == 0">暂无图层</span>
        <div class="itemType3" @click="selectToTop(item,index)" :class="{'selected':item.selected}" v-for="(item,index) in canvasList.drawArr" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="close" @click.stop="deleteOne(index)">&times;</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="画布">
        <div class="itemType3">
          <span>透明</span>
          <el-switch size="small" v-model="canvasList.whiteBackground" @change="changeBackground()"></el-switch>
          <input v-model="canvasList.backgroundColor" @change="changeBackground(true)" type="color">
        </div>
        <div class="itemTypeInput">
          <span>长</span>
          <input type="text" v-model.lazy="canvasList.height" @change="changeWH()" />
          <span>宽</span>
          <input type="text" v-model.lazy="canvasList.width" @change="changeWH()" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作">
        <div class="itemType3" @click="exportCanvasAsPNG('drawBoard')">
          保存PNG
        </div>
        <div class="itemType3" @click="exportCanvasData()">
          导出数据
        </div>
        <div class="itemType3" @click="importCanvasData()">
          导入数据
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="board" @mouseup="moveStop($event)">
    <div :draggable="false" id="topBlock" class="topLine lineBtn" @mousedown="mouseIsDown($event,'topBlock')"></div>
    <div :draggable="false" id="rightBlock" class="rightLine lineBtn" @mousedown="mouseIsDown($event,'rightBlock')"></div>
    <div :draggable="false" id="bottomBlock" class="bottomLine lineBtn" @mousedown="mouseIsDown($event,'bottomBlock')"></div>
    <div :draggable="false" id="leftBlock" class="leftLine lineBtn" @mousedown="mouseIsDown($event,'leftBlock')" ></div>
    <canvas @dragleave="leaveCanvas($event)" @mousedown="paintStart($event)"
            @mouseup="paintEnd($event)" @click="clickBoard($event)"
            @dragover="getXY($event)" ondragover="event.preventDefault()"
            id="drawBoard" :width="canvasList.width" :height="canvasList.height"></canvas>
  </div>
</div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {
  Rectangle,//矩形
  Circle,//原型
  Tree,
  Paint,//树
} from '../../js/drawBoard02.js'


//拖拽的图形
const type = ref('');
//图形
const typeList = ref([
  {
    name:'矩形',
    key:'Rectangle'
  },
  {
    name:'圆形',
    key:'Circle'
  },
  {
    name:'树',
    key:'Tree'
  },
]);


//画布
const canvasList = ref({
  width:'800',
  height:'600',
  drawArr:[],//实例数组
  isPaint:false,//是否是画板
  whiteBackground:false,//是否透明色
  backgroundColor:'#ffffff',//背景颜色
  // timmer :null,//用于节流
  // moveDomId:null,//鼠标方块标志
  // positionArr:{},//鼠标方块位置
  ctx:{}//画笔
})

//lineType 画笔粗细
const lineTypeList=[1,2,4,6];

/**
  * 根据类型添加数据
  */
function addInArr(e,data = null){
  console.log('type.value',type.value)
  let TXdata = null;
  switch (type.value) {
    case 'Rectangle':
      TXdata = data?data: {
        x:e.offsetX,
        y:e.offsetY,
        width:100,
        height:100,
      };
      canvasList.value.drawArr.unshift(new Rectangle('drawBoard',TXdata));
      canvasList.value.drawArr[0].name = '矩形'+canvasList.value.drawArr.filter(item => {return item.type=='Rectangle'}).length;
      break;
    case 'Circle':
      TXdata = data?data: {
        x:e.offsetX,
        y:e.offsetY,
        width:60,
      };
      canvasList.value.drawArr.unshift(new Circle('drawBoard',TXdata));
      canvasList.value.drawArr[0].name = '圆形'+canvasList.value.drawArr.filter(item => {return item.type=='Circle'}).length;
      break;
    case 'Tree':
      TXdata = data?data: {
        x:e.offsetX,
        y:e.offsetY,
        width:10,
      };
      canvasList.value.drawArr.unshift(new Tree('drawBoard',TXdata));
      canvasList.value.drawArr[0].name = '树'+canvasList.value.drawArr.filter(item => {return item.type=='Tree'}).length;
      break;
    case 'Paint':
      TXdata = data?data: {};
      canvasList.value.drawArr.unshift(new Paint('drawBoard',TXdata));
      canvasList.value.drawArr[0].name = '绘画'+canvasList.value.drawArr.filter(item => {return item.type=='Paint'}).length;
      break;
    // case 'Rectangle':
    //   canvasList.value.drawArr.unshift(new Rectangle(canvasList.value.ctx,e.offsetX,e.offsetY));
    //   break;
    // case 'Rectangle':
    //   canvasList.value.drawArr.unshift(new Rectangle(canvasList.value.ctx,e.offsetX,e.offsetY));
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
      addInArr(e);
      draw();
      clearTime();
    },100);
  }else{
    timmer = setTimeout(()=>{
      addInArr(e);
      draw();
      clearTime();
    },100);
  }
}
function leaveCanvas(e){
  clearTime();
}

/**
  * 清除计时器
  */
function clearTime(){
  clearTimeout(timmer);
  timmer = null;
}


function draw() {
  canvasList.value.ctx.clearRect(0,0,canvasList.value.width,canvasList.value.height);
  if(canvasList.value.whiteBackground){
    let style = '';
    style= canvasList.value.backgroundColor;
    canvasList.value.ctx.fillStyle = style;
    canvasList.value.ctx.fillRect(0,0,canvasList.value.width,canvasList.value.height)
  }
  for(let i=canvasList.value.drawArr.length-1;i>=0;i--){
    canvasList.value.drawArr[i].clean();
    canvasList.value.drawArr[i].draw();
  }
}

//点击位置时对比数据
function clickBoard(e) {
  if(canvasList.value.isPaint){
    return;
  }else{
    tuxing(e)
  }
}

function tuxing(e){
  //调用本身的方法判断位置是否在内  findIndex判断最顶上一个后不再执行
  let idx = canvasList.value.drawArr.findIndex((item) => {
    return item.isSelect(e);
  });
  if(canvasList.value.drawArr.length == 0){return}
  // 如果选中 终止后面点击操作的判断
  if(canvasList.value.drawArr[0].selected){
    canvasList.value.drawArr[0].x = e.offsetX;
    canvasList.value.drawArr[0].y = e.offsetY;
    // canvasList.value.drawArr[0].strokeColor = 'black'
    canvasList.value.drawArr[0].setBtn();
    draw();
    canvasList.value.drawArr[0].selected = null;
    return
  }

  //未点击到块直接退出
  if(idx == -1){
    // canvasList.value.drawArr[0].strokeColor = 'black';
    canvasList.value.drawArr[0].setBtn();
    canvasList.value.drawArr[0].selected = null;
    draw();
    return
  }else{
    //符合条件的第一个块置顶并且框变蓝色
    let clickData = canvasList.value.drawArr.splice(idx,1);
    // canvasList.value.drawArr[0]?canvasList.value.drawArr[0].strokeColor = 'black':'';
    // clickData[0].strokeColor = 'rgb(76,130,232)';
    canvasList.value.drawArr.unshift(clickData[0]);
    draw();

    //  根据数据给锚点定位
    canvasList.value.drawArr[0].lineBtnPosition();
    canvasList.value.drawArr[0].selected = true;
  }

}



/**
  * 鼠标按小方块事件
  */
let moveDomId = null;
let positionArr = {};
function mouseIsDown(e,id){
  positionArr.x=e.pageX;
  positionArr.y=e.pageY;
  moveDomId = id;
}


function moveStop(e){
  if(!moveDomId){return}
  //调用方法改变大小
  canvasList.value.drawArr[0].blockPosition(moveDomId,positionArr,e);
  // canvasList.value.drawArr[0].strokeColor = 'black';
  canvasList.value.drawArr[0].setBtn();
  draw();
  canvasList.value.drawArr[0].selected = null;
  // canvasList.value.drawArr[0].lineBtnPosition();
  moveDomId = null;
  positionArr = {};
}

//画笔
const ctx = ref({});
onMounted(()=>{
  let canvas = document.getElementById('drawBoard');
  canvasList.value.ctx = canvas.getContext('2d');
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
    // canvasList.value.drawArr[0].strokeColor = 'black';
    canvasList.value.drawArr[0].selected = (canvasList.value.drawArr[0].selected)?null:true;
    draw();
    canvasList.value.drawArr[0].selected?canvasList.value.drawArr[0].lineBtnPosition():canvasList.value.drawArr[0].setBtn();
    return;
  }

  canvasList.value.drawArr.forEach(item => {
    item.selected  = null;
  })
  let clickData = canvasList.value.drawArr.splice(idx,1);
  // canvasList.value.drawArr[0]?canvasList.value.drawArr[0].strokeColor = 'black':'';
  // clickData[0].strokeColor = 'rgb(76,130,232)';
  canvasList.value.drawArr.unshift(clickData[0]);
  draw();

  //  根据数据给锚点定位
  canvasList.value.drawArr[0].lineBtnPosition();
  canvasList.value.drawArr[0].selected = true;
}


/**
  * 切换背景
  */
function  changeBackground(type = false){
  type?canvasList.value.whiteBackground=true:"";

  draw();
}

function createTimestamp () {
  return parseInt(new Date().getTime()) + '';
}
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
function exportCanvasData1(){
  let JSONArr = JSON.stringify(canvasList.value.drawArr);
  let fileName = `JSON_${createTimestamp()}.json`;
  const blob = new Blob([JSONArr], { type: 'application/json' });
  // 创建一个链接，并设置其href属性为Blob的URL
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  // 设置链接的下载属性，以及下载时的文件名
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function exportCanvasData(){
  let JSONArr = JSON.stringify(canvasList.value);
  let fileName = `JSON_${createTimestamp()}.json`;
  const blob = new Blob([JSONArr], { type: 'application/json' });
  // 创建一个链接，并设置其href属性为Blob的URL
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  // 设置链接的下载属性，以及下载时的文件名
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
  * 导入数据
  */
function importCanvasData1(){
  let selectInput = document.createElement('input');
  selectInput.setAttribute('type','file');
  selectInput.onchange = ()=>{
    let data = selectInput.files[0];
    if(data && data.name.indexOf('.json') != -1){
      const reader = new FileReader();
      reader.readAsText(data);
      reader.onload =() =>{
        const fileData = JSON.parse(reader.result);
        importDataAddArr(fileData);
      }
    }else{
      console.log('请选择符合条件的json文件!')
    }
    document.body.removeChild(selectInput);
  }
  document.body.appendChild(selectInput);
  selectInput.click();
}
function importCanvasData(){
  let selectInput = document.createElement('input');
  selectInput.setAttribute('type','file');
  selectInput.onchange = ()=>{
    let data = selectInput.files[0];
    if(data && data.name.indexOf('.json') != -1){
      const reader = new FileReader();
      reader.readAsText(data);
      reader.onload =() =>{
        const fileData = JSON.parse(reader.result);
        canvasList.value = fileData;
        canvasList.value.ctx = document.getElementById('drawBoard').getContext('2d');
        importDataAddArr(fileData.drawArr);
      }
    }else{
      console.log('请选择符合条件的json文件!')
    }
    document.body.removeChild(selectInput);
  }
  document.body.appendChild(selectInput);
  selectInput.click();
}

/**
  * 数据导入完成后,生成数组
  */
function importDataAddArr(data){
  canvasList.value.drawArr = [];
  for(let item of data){
    type.value = item.type;
    addInArr(null,item);
  }
  draw();
}

/**
  * 删除一个图形
  */
function deleteOne(index){
  canvasList.value.drawArr.splice(index,1);
  draw();
  canvasList.value.drawArr[0].setBtn();
}

/**
  * 修改长宽
  */
function changeWH (){
  // console.log('123')
  draw()
}




//获取当前tab
function getIndex(data) {
  if(data == 1){
    type.value = "Paint";
    //存在画图图层就置顶,不存在创建
    let paint = canvasList.value.drawArr.findIndex((item) => {
      return item.type == 'Paint'
    });
    if(paint == -1){
      addInArr(null,null);
    }else {
      let clickData = canvasList.value.drawArr.splice(paint,1);
      canvasList.value.drawArr.unshift(clickData[0]);
    }
  }
  //只有在画笔页面才能绘制图形  清除选中状态
  canvasList.value.isPaint = data == 1?true:false;
  // canvasList.value.drawArr.length >0?selectToTop("",0):'';
}

let paintdom = null;
let line = [];
//绘制开始
function paintStart(e) {
  if(canvasList.value.isPaint){
  //  执行绘画
    line.push({
      x:e.offsetX,
      y:e.offsetY
    })
    canvasList.value.drawArr[0].draw({x:e.offsetX, y:e.offsetY},false)
    paintdom = document.getElementById('drawBoard');
    paintdom.addEventListener('mousemove',paintMove,false)
  }else{
    return;
  }
}
function paintMove(e){
  line.push({
    x:e.offsetX,
    y:e.offsetY
  });
  canvasList.value.drawArr[0].draw({x:e.offsetX,y:e.offsetY});
}
//绘制结束
function paintEnd(e) {
  if(canvasList.value.isPaint){
    //  绘画结束
    canvasList.value.drawArr[0].draw(null,true);
    canvasList.value.drawArr[0].point.push(line);
    line = [];
    paintdom.removeEventListener('mousemove',paintMove,false);
    paintdom = null;
  }else{
    return;
  }
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

    .itemTypeInput{
      font-size: 13px;
      color: #858585;
      border: 1px solid #cbcbcb;
      padding: 8px;
      border-radius: 2px;
      cursor: pointer;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      span{
        margin: 5px 0;
      }
      input{
        padding:5px;
      }
      input:focus-visible{
        padding:6px;
        //outline-width: 1px;
        //outline-color: #008d9d;
        border: 1px solid #008d9d;
        border-radius: 2px;
        outline:unset;
      }
    }
    .lineType{
      border: 1px solid #dcdcdc;
      border-radius: 2px;
      height: 16px;
      width: 16px;
      span{
        margin: 0 auto;
        display: block;
        height: 100%;
        background-color: black;
      }
    }
    .is_select{
      border: 1px solid #4c82e8;
    }
  }
  .board::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border: 1px solid #c3c3c3;
  }
  .board::-webkit-scrollbar-thumb {
    background-color: #c3c3c3;
  }
  .board{
    flex:1;
    width: 0;
    height: 100%;
    border: 1px solid #dcdfe6;
    position: relative;
    overflow: auto;
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

  :deep(.el-tabs__item.is-left){
    padding: 0 5px;
  }
  :deep(.el-tabs){
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
  border: 2px dashed #04a2db;
}
</style>

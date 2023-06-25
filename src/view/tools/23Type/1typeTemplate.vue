<template>
  <div class="typeBase">
    <div class="leftWord" @click="getWhere()">
      <template v-for="(item, index) in leftWordArr">
        <pre class="preCode" contenteditable="true" @keydown="getData(index, $event)">{{ item }}</pre>
      </template>
    </div>
    <div class="rightResult">
      <div class="getRes">
        <span class="clickBtn" @click="getWord">点击获取结果</span>
        <span class="clickBtn" @click="logData = []">清空</span>
      </div>
      <div class="console">
        <pre :class="item.type == 'log'?'logFont':'errFont'" v-for="(item,index) in logData" :key="index">{{ item.data }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let props = defineProps(['wordCode']);

const leftWord = props.wordCode;
const leftWordArr = ref([]);

// 转换数组渲染
function initWordArr() {
  let data = [];
  data = leftWord.split('\n');
  for (let item in data) {
    if (data[item].length == 0) {
      data.splice(item, 1);
    }
  }
  leftWordArr.value = data;
}
onMounted(() => {
  initWordArr();
});


let cursor = {};

// 点击面板获取位置xinxi 
function getWhere() {
  cursor = window.getSelection(); 
}


// 获取代码
function getWord() {
  let arr = [];
  let domArr = document.getElementsByClassName('preCode');
  for (let item of domArr) {
    arr.push(item.innerHTML);
  }
  let codeStr = arr.join('\n');
  doCode(codeStr)

}
// 执行代码
function doCode(code) {
  try {
    eval(code);
  } catch (err){
    console.error(err);
  }
}

/**
  * 修改父组件数据
  */
function getData(index, ev) {

  // backspace事件
  if (ev.keyCode == 8) {
    if (ev.srcElement.innerHTML.length == 0 && index > 0) {
      leftWordArr.value.splice(index, 1);
      let dm = document.getElementsByClassName('preCode')[index - 1];
      let range = document.createRange();
      range.selectNodeContents(dm);
      range.collapse(false);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      dm.focus();
      return;
    }
    leftWordArr.value[index] = ev.srcElement.innerHTML;

    // enter事件
  } else if (ev.keyCode == 13) {
    // 阻止事件发生
    ev.preventDefault();
    leftWordArr.value.splice(index, 0, '');
    let dm = document.getElementsByClassName('preCode')[index + 1];
    let range = document.createRange();
    range.selectNodeContents(dm);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    dm.focus();
    return;
  } else {
    leftWordArr.value[index] = ev.srcElement.innerHTML;
  }
}

/**
  * 拦截console.log
  */
const logData = ref([]);
function getConsole() {
  if(console.oldLog){
    console.log = console.oldLog;
  }
  console.oldLog = console.log;
  console.log = function (str) {
    console.oldLog(str);
    logData.value.push({ type: 'log', data: str });
  }
}
function getError() {
  if(console.oldErr){
    console.error = console.oldErr;
  }
  console.oldErr = console.error;
  console.error = function (str) {
    console.oldErr(str);
    logData.value.push({ type: 'err', data: str });
  }
}
onMounted(() => {
  getConsole();
  getError();
});


</script>

<style lang="less" scoped>
.typeBase {
  width: 100%;
  height: 100%;
  display: flex;

  .leftWord,
  .rightResult {
    flex: 1;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto;
  }

  .leftWord pre {
      margin: 0;
      padding: 0 10px;
      outline: none;
      word-break:break-all;
      white-space: pre-wrap;
    }
    .leftWord pre:nth-child(2n-1){
      background-color: whitesmoke;
    }
    .leftWord{
      border-right: unset ;
    }


  .rightResult {
    display: flex;
    flex-direction: column;

    .clickBtn {
      display: inline-block;
      background-color: blanchedalmond;
      padding: 10px 30px;
      border-radius: 4px;
      color: #4e4e4e;
      cursor: pointer;
      margin-right: 10px;
      user-select: none;
    }

    .console {
      flex: 1;
      overflow-y: auto;
      width: 100%;
      pre{
        width: 100%;
        margin: 5px 0;
        word-break:break-all;
        white-space: pre-wrap;
      }
      .logFont{
        color: #4e4e4e;
      }
      .errFont{
        color: #ff3c00;
      }
    }
  }
}
</style>
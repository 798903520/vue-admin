<template>
  <div class="typeBase">
      <div class="leftWord" @click="getWhere()">
        <template v-for="(item) in leftWordArr">
            <pre class="preCode" contenteditable="true" v-html="item"></pre>
        </template>
      </div>
      <div class="rightResult">
        <div class="getRes">
          <span class="clickBtn" @click="getWord">点击获取结果</span>
        </div>
        <div class="console">
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
function initWordArr(){
  let data = [];
  data = leftWord.split('\n');
  leftWordArr.value = data;
}
onMounted(()=>{
  initWordArr();
});


let cursor = {};

// 点击面板获取位置xinxi 
function getWhere(){
  cursor = window.getSelection();
}


// 获取代码
function getWord(){
  let arr = [];
  let domArr = document.getElementsByClassName('preCode');
  for(let item of domArr){
    arr.push(item.innerHTML);
  }
  let codeStr = arr.join('\n');
  doCode(codeStr)

}
// 执行代码
function doCode(code){
  let res = null;
  try{
    eval(code);
    // console.log('res',res);
  }catch{
    console.error(res);
  }
}

</script>

<style lang="less" scoped>
.typeBase{
  width: 100%;
  height: 100%;
  display: flex;
  .leftWord,.rightResult{
    width: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 10px;
    pre{
      margin: 0;
      outline: none;
    }
  }


  .rightResult{
    .clickBtn{
      display: inline-block;
      background-color: blanchedalmond;
      padding: 10px 30px;
      border-radius: 4px;
      color: #4e4e4e;
      cursor: pointer;
    }
  }
}

</style>
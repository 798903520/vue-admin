<template>
  <div id="name">
    <div id="name_content">
      <div class="firstPage">
        <div class="nath two">
          <a href="/">TDom</a>
        </div>
        <div class="num">321</div>
        <input class="input_text" type="text">
        <span class="text_apsn"></span>
      </div>

<!--      <div class="top_div"></div>-->

<!--      <div class="move_div" id="animation_dom">-->
<!--      </div>-->

<!--      <div class="top_div"></div>-->
    </div>
  </div>

</template>


<script setup>
import {render, getVNode} from '../js/jsFun.js';
import {onMounted} from "vue";

let ani_dom_style = `position: absolute;
  top: 55%;
  left: 55%;
  width: var(--width-w);
  height: var(--height-h);
  background-color: #008d9d;
  border-radius: 50%;
  display:none;
  z-index:2;`

let Height  = 0

let time = null;

//监听滚动
function add_listen_scroll(){
  let ani_height = document.getElementById("name_content");
  let out_dom = document.getElementById("name");
  Height = ani_height.offsetHeight;
  document.getElementById('animation_dom').style.height = Height + 'px';
  let ani_dom = document.createElement('div');
  ani_dom.setAttribute('style',ani_dom_style);
  ani_dom.setAttribute('id','ani_change_dom');
  out_dom.appendChild(ani_dom);

  // window.requestAnimationFrame(step);
}

function step(){
  let firstPageHeight = document.getElementsByClassName('firstPage')[0].offsetHeight;
  let dom = document.getElementById('name');
  const heighttt = dom.offsetHeight;
  let dom_num = dom.getBoundingClientRect().top;
  let dom_child = null;
  dom.onmousewheel = ((event)=>{
    // if(time != null){return;}
    // time = setTimeout(()=>{

      // console.log('even',event)

      dom_child = parseInt(document.getElementById('animation_dom').getBoundingClientRect().top);
      console.log('dom_child',heighttt,Height,dom_child,heighttt-dom_child,dom.offsetTop);

      //判断顶部是否达到条件
      if(heighttt-dom_child>=heighttt){
        document.getElementById('ani_change_dom').style.display = 'block';
      }
      else if(heighttt-dom_child<heighttt){
        document.getElementById('ani_change_dom').style.display = 'none';
      }

      //判断底部是否达到条件
      if(Height<=heighttt-dom_child+firstPageHeight){
        document.getElementById('ani_change_dom').style.display = 'none';
      }
      clearTimeout(time);
      time = null;
    // },50);
  })
}

function createdAnfont() {
  let TDom = document.getElementsByClassName('firstPage')[0];
  let copyDom = getVNode(TDom);
  let parent = document.getElementById('name_content')
  parent.appendChild(render(copyDom))
}
function domInput(obj,inDomName){
  let doms = document.getElementsByClassName(inDomName);
  console.log('dom',doms);
  for(let element of doms){
    element.value = obj.a;
  }
}

function reflectTest(obj,inDomName,outDomName){
  domInput(obj,inDomName);

  let aP = new Proxy(obj,{
    // get(target,key,value,receiver){}
    set(target,key,value,receiver){
      console.log('set',key,receiver);
      return Reflect.set(target,key,value,receiver);
    },
    get(target,name,receiver){
      console.log('get',name,receiver);
      return Reflect.get(target,name,receiver);
    }
  });
  let p1 = {b:1,set bValue(value){
      return this.b = value;
    }};
  // Object.setPrototypeOf(p1,aP);
  // Reflect.setPrototypeOf(aP,p1);
  // Reflect.set(aP,'b',1);
  Reflect.set(p1,'bValue',11,aP)
  // aP.a = 11;
  // console.log('ap',aP.a,p.b,Reflect.has(aP,'1'));
  console.log('b',p1.b,aP.b);
}

onMounted(()=>{
  let p = {a:1};
  // reflectTest(p,'input_text','text_apsn');
  // add_listen_scroll();
  createdAnfont();
})
</script>

<style scoped lang="less">
#name{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  --width-w:50px;
  --height-h:50px;
  #name_content{
    min-height: 100%;
    width: 100%;
    position: relative;
  }
  .top_div{
    height: 800px;
    width: 100%;
    background-color: #c3c3c3;
  }
  .move_div{
    //height: 100%;
    background-color: #04a2db;
  }
}
#name::-webkit-scrollbar {
  //display:none;
  width: 3px;
  background-color: whitesmoke;
}
#name::-webkit-scrollbar-thumb {
  //display:none;
  width: 3px;
  background-color: rgba(96, 39, 119, 1);
}

//#ani_change_dom{
//  position: absolute;
//  top: 55%;
//  left: 55%;
//  width: 50px;
//  height: 50px;
//  background-color: #008d9d;
//  border-radius: 50%;
//  display:none;
//  z-index:2;
//}

</style>

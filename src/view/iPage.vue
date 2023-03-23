<template>
  <div id="name">
    <div class="firstPage">
      <div class="nath two">
        <a href="/">TDom</a>
      </div>
      <div class="num">321</div>
      <input class="input_text" type="text">
      <span class="text_apsn"></span>
    </div>
  </div>

</template>

<script>
import {render, getVNode} from '../js/jsFun.js'

export default {
  name: "iPage",
  data() {
    return {}
  },
  mounted() {
    this.createdAnfont();

    let p = {a:1};
    this.reflectTest(p,'input_text','text_apsn');
  },
  methods: {
    createdAnfont() {
      let TDom = document.getElementsByClassName('firstPage')[0]
      let copyDom = getVNode(TDom);
      let parent = document.getElementById('name')
      parent.appendChild(render(copyDom))
    },
    domInput(obj,inDomName){
      let doms = document.getElementsByClassName(inDomName);
      console.log('dom',doms);
      for(let element of doms){
        element.value = obj.a;
      }
    },
    reflectTest(obj,inDomName,outDomName){ 
      this.domInput(obj,inDomName);
      // let doms = document.getElementsByClassName(inDomName);
      // console.log('dom',doms);
      // for(let element of doms){
      //   element.value = obj.a;
      // }

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
    },
  }
}
</script>

<style scoped>

</style>

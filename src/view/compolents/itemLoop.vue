<template>
  <div class="loopDiv" id="loopDiv">
  </div>
</template>

<script>
export default {
  name: "itemLoop",
  props:{
    settings:{
      default:{}
    },
    data(){
      return{
        timmer:null,//定时器
        nowDomId:'insid1',//当前dom id
      }
    },
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      //初始化样式
      let loopDiv = document.getElementById('loopDiv');
      let data = this.settings.style;
      loopDiv.style.height=data.height||'300px';
      loopDiv.style.width=data.width||'100%';
      loopDiv.style.border=data.border||'1px solid black';

    //  初始化数据
      let loopData = this.settings.data;
      this.isLoop(loopData,this.nowDomId);
      let insid1 = document.getElementById(this.nowDomId);
      //判断是否滚动 (未滚动则不设置鼠标进入事件监听)
      if(loopDiv.offsetHeight<=insid1.offsetHeight){
        this.loopStart(loopData);
        this.addListListener(this.settings.isHoverStop);
      }
    },
    //添加鼠标监听器
    addListListener(is){
      if(is){
        let _this = this;
        this.$nextTick(()=> {
          let loopDiv = document.getElementById('loopDiv');
          loopDiv.addEventListener('mouseenter',function () {
            console.log('鼠标移入');
            clearTimeout(_this.timmer);
            _this.timmer = null;
          });
          loopDiv.addEventListener('mouseleave',function () {
            console.log('鼠标移出');
            _this.loopStart(_this.settings.data,_this.nowDomId);
          });
        });
      }
    },
    // 添加元素
    isLoop(loopData,domId){
      let _this = this;
      let insid1 = document.createElement('div');
      insid1.setAttribute('id',domId);
      loopData.forEach(item=>{
        let itemDiv = document.createElement("div");
        itemDiv.setAttribute('class','loopItem');
        itemDiv.addEventListener('click',function (){
          _this.$emit('clickData',item);
        })
        itemDiv.innerHTML=item.name+item.type+item.num;
        itemDiv.setAttribute('style','height:50px;width:100%;background-color:#c3c3c3;border-top:1px solid white');
        insid1.appendChild(itemDiv);
      });
      document.getElementById('loopDiv').appendChild(insid1);
    },
    // 开始滚动
    loopStart(loopData,id='insid2'){
      let parents = document.getElementById('loopDiv');
      let _this = this;
      console.log(parents.children.length)
      if(parents.children.length<2){
        this.isLoop(loopData,id);
      }
      let insid1 = parents.firstChild;
      let insid2 = parents.lastChild;
      clearInterval(_this.timmer);
      _this.timmer = null;
      _this.timmer = setInterval(function (){
        insid1.style.marginTop = (insid1.style.marginTop.split('px')[0] - 5)+'px';
        if(insid2.offsetTop < 0 ){
          insid1.remove();
          id=='insid2'?_this.nowDomId = 'insid1':_this.nowDomId = 'insid2'
          _this.loopStart(loopData,_this.nowDomId);
          return;
        }
        console.log('top',insid1.offsetTop ,insid2.offsetTop )
      },this.settings.step||50 );
    },
  },
  beforeUnmount() {
    clearInterval(this.timmer);
    this.timmer = null;
  },
}
</script>

<style scoped lang="less">
#insid1,#insid2{
  width: 100%;
  height: auto;
}
.loopDiv{
  overflow-y: hidden;
  position: relative;
}
</style>

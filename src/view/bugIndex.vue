<template>
<div class="head">
  <el-input v-model="URL" readonly></el-input>
  <el-button @click="getBiliData" type="success">点击抓取</el-button>
</div>
  <div class="list" v-loading="isLoading">
    <div class="bItem" :class="{'first':index==0,'second':index==1,'third':index==2}" v-for="(item,index) in biliList" :key="index">
      <div class="num">{{ index+1 }}.</div>
      <div>
        <div class="item-item">
          <span class="label">标题 : </span>
          <a class="content" @click="openIt(item.href)">{{item.name}}</a>
        </div>
        <div class="item-item">
          <span class="label">UP主 : </span>
          <a class="content" @click="openIt(item.upSpace)">{{item.upName}}</a>
        </div>
        <div class="item-item">
          <span class="label">播放量 : </span>
          <span class="content">{{item.userLook}}</span>
        </div>
        <div class="item-item">
          <span class="label">弹幕量 : </span>
          <span class="content">{{item.userTalk}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getBili} from '../api/index'
export default {
  name: "bugIndex",
  data(){
    return{
      URL:'https://www.bilibili.com/v/popular/rank/all',
      biliList:[],
      isLoading:false
    }
  },
  mounted() {
    // this.getBiliData()
  },
  methods:{
    //跳转
    openIt(url){
      // window.open(url);
      let a = document.createElement('a');
      a.setAttribute('target','_blank');
      a.setAttribute('href','https://'+url);
      a.click();
      a.remove();
    },
    getBiliData(){
      let _this = this;
      this.isLoading = true;
      getBili({URL:this.URL}).then(res => {
        if(res.code == 200){
          setTimeout(function (){
            _this.biliList = res.data;
            _this.isLoading = false;
            _this.$forceUpdate();
            _this.$notify.success(res.msg);
          },1000);
          return;
        }else {
          this.$notify.error(res.msg);
        }
      });
    },
  }
}
</script>

<style scoped lang="less">
.head{
  display: flex;
  .el-input{
    width: 350px;
    margin-right: 16px;
  }
}
.list{
  height: calc(100% - 50px);
  overflow-y: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .bItem{
    border: 1px solid #dadada;
    margin-top: 20px;
    align-items: center;
    display: flex;
    width: calc(48% - 40px);
    padding: 20px;
    margin-right: calc(2% - 2px);
    border-radius: 10px;
    .num{
      width: 40px;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
    }
    a:hover{
      color: #008d9d;
      cursor: pointer;
    }
  }
  .first{
    border-color: gold;
  }
  .second{
    border-color: silver;
  }
  .third{
    border-color: rgba(184,115,51);
  }
  .bItem:nth-child(1){
    margin-top: 0;
  }
  .bItem:nth-child(2){
    margin-top: 0;
  }

  .item-item{
    display: flex;
    .label{
      width: 70px;
    }
    .content{
      flex: 1;
    }
  }


}
@media only screen and (max-width: 1000px){
  .list .bItem{
    width: 100%;
    margin-top: 20px !important;
    margin-left: 0 !important;
  }
}
.list::-webkit-scrollbar {
  width: 8px;
  border: 1px solid #c3c3c3;
}
.list::-webkit-scrollbar-thumb {
  background-color: #c3c3c3;
}
</style>

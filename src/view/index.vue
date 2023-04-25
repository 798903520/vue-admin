<template>
  <div class="indexBack">
    <div class="left">
      <div class="top"></div>
      <div class="menuList">
        <menu-list></menu-list>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <headTop></headTop>
      </div>
      <div class="content-all">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuList from "../components/menu.vue"
import headTop from "../components/nav.vue"
export default {
  name: "index",
  components:{
    menuList:menuList,
    headTop:headTop
  }
}
</script>

<style scoped lang="less">
.indexBack{
  height: 100%;
  width: 100%;
  display: flex;
  .left{
    width: 200px;
    //border-right: 1px solid #4e4e4e;
    display: flex;
    height:100%;
    flex-direction: column;
    .top{
      height: 60px;
      background-color: aliceblue;
    }
    .menuList{
      height: calc(100% - 60px);
      width: 100%;
    }
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    .top{
      height: 60px;
      background-color: aliceblue;
      width: 100%;
    }
    .content-all{
      width: calc(100% - 40px);
      flex: 1;
      padding: 20px;
      overflow: auto;
      .content{
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        box-shadow: 0 0 10px 10px rgba(0,0,0,0.03);
        padding: 20px;
      }
    }
  }
}
</style>

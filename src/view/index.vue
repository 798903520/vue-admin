<template>
  <div class="indexBack">
    <div class="left">
      <div class="top">

        <el-popconfirm title="将去往商城页面" icon-color="#4e4e4e" @confirm="jump()" confirm-button-text="好的" cancel-button-text="不用了">
          <template #reference>
            <span >
          dom<br>me
        </span>
          </template>  
        </el-popconfirm>
      </div>
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

<!-- <script>
import menuList from "../components/menu.vue"
import headTop from "../components/nav.vue"
export default {
  name: "index",
  components: {
    menuList: menuList,
    headTop: headTop
  },
}
</script> -->
<script setup>
import menuList from "../components/menu.vue"
import headTop from "../components/nav.vue"
import { useRouter } from 'vue-router';

const router = useRouter();
function jump(){
  router.push('/shop');
}
</script>

<style scoped lang="less">
@font-face {
  font-family: logo_ttf;
  src: url('../assets/ttf/logo.ttf');
}

.indexBack {
  height: 100%;
  width: 100%;
  display: flex;

  .left {
    width: 200px;
    //border-right: 1px solid #4e4e4e;
    display: flex;
    height: 100%;
    flex-direction: column;

    .top {
      width: 100%;
      height: 60px;
      justify-content: center;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      span{
        user-select: none;
      text-align: right;
      line-height: 25px;
      font-family: logo_ttf;
      font-size: 40px;
      line-height: 25px;
      font-weight: bold;
      display: inline-block;
      background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
      -webkit-background-clip: text;
      color: transparent;
      }
    }

    .menuList {
      height: calc(100% - 60px);
      width: 100%;
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;

    .top {
      height: 60px;
      width: 100%;
    }

    .content-all {
      width: calc(100% - 40px);
      flex: 1;
      padding: 20px;
      overflow: auto;

      .content {
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.03);
        padding: 20px;
      }
    }
  }
}</style>

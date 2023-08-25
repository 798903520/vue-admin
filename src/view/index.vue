<template>
  <div class="indexBack">
    <div :class="isOpen?'left':'leftSmall'">
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
        <div class="toLeft">
          <span class="toLeftBtn" :class="isOpen?'close':'open'" :title="isOpen?'收起':'展开'" @click="changeLeft()">{{ isOpen?'&#9664;':'&#9654;' }}</span>
        </div>
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
import {ref} from "vue";

const router = useRouter();
function jump(){
  router.push('/shopIndex');
}

const isOpen = ref(true);
function changeLeft(){
  isOpen.value = !isOpen.value
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

  .leftSmall{
    width: 100px;
    animation: 0.5s animi2;
  }
  .left{
    width: 200px;
    animation: 0.5s animi;
  }
  @keyframes animi{
    0%{width: 100px}
    100%{width: 200px}
  }
  @keyframes animi2{
    0%{width: 200px}
    100%{width: 100px}
  }
  .left,.leftSmall {
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
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
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
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      display: flex;
      .toLeft{
        width: 60px;
        //border-right: 1px solid rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        .toLeftBtn{
          user-select: none;
          background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
          -webkit-background-clip: text;
          color: transparent;
          cursor: pointer;
          width: 30px;
          height: 30px;
          font-size: 30px;
          display: inline-block;
        }
        .close{
          animation: 0.5s changes;
        }
        .open{
          animation: 0.5s changes1;
        }
        @keyframes changes{
          0%{font-size: 0px;height: 0px;}
          50%{font-size: 25px;height: 25px;}
          100%{font-size: 30px;height: 30px;}
        }
        @keyframes changes1{
          0%{font-size: 0px;height: 0px;}
          50%{font-size: 25px;height: 25px;}
          100%{font-size: 30px;height: 30px;}
        }
      }
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

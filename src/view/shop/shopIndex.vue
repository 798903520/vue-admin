<template>
  <div class="shop_bg">
    <div class="header">
      <div class="head_content">
        <div class="left_btn">
          <span @click="jumpLog()">{{ userName }}</span>
          <span>免费注册</span>
          <span>手机逛网站</span>
        </div>
        <div class="right_btn">
          <span>我的</span>
          <span>购物车</span>
          <span>收藏夹</span>
          <span>商品分类</span>
          <span>联系客服</span>
        </div>
      </div>
    </div>

    <div class="search_div">
      <div class="all_width">
        <div class="logo">dom<br>me</div>
        <div class="search_input">
          <el-input v-model="searchKey" placeholder="Pick a date">
            <template #suffix>
              <el-icon class="el-input__icon" @click="clickSearch()">
                <img src="../../assets/img/icon.png" alt="">
              </el-icon>
            </template>
          </el-input>
        </div>
        <div class="QRcode">
          <img src="../../assets/img/qrcode.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 获取用户名字
let userName = ref("");
function getUserName() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  userName.value = userData == null ? "Hi,请登录" : userData.userName;
}
onMounted(() => {
  getUserName();
});

// 跳转登录
function jumpLog() {
  if (userName == 'Hi,请登录') {
    router.push({
      name: 'loginIt',
      params: {
        backUrl: 'shop'
      }
    });
  }
}

// 输入框
let searchKey = ref('');
function clickSearch(){
  console.log('123123123');
}
</script>

<style lang="less" scoped>
.shop_bg {
  background-color: #eae8eb;
  min-height: 100vh;

  .all_width {
    display: flex;
    padding: 10px 0;
    align-items: center;
  }

  .QRcode>img {
    height: 80px;
    width: 80px;
  }

  .QRcode {
    margin: 0 80px;
  }

  .search_input {
    flex: 1;
  }

  @font-face {
    font-family: logo_ttf;
    src: url('../../assets/ttf/logo.ttf');
  }

  .logo {
    text-align: right;
    line-height: 25px;
    margin: 0 80px;
    font-family: logo_ttf;
    font-size: 40px;
    font-weight: bold;
    display: inline-block;
    background: linear-gradient(45deg, rgb(251, 14, 255), rgb(0, 187, 255));
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  }
}


.header {
  height: 36px;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  font-size: 12px;
  font-weight: lighter;

  .head_content {
    height: 36px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left_btn>span {
      cursor: pointer;
      display: inline-block;
      margin-right: 20px;
      line-height: 36px;
      height: 36px;
      background: linear-gradient(to right, rgba(251, 14, 255, 0.807), rgba(0, 187, 255, 0.796)) no-repeat;
      background-size: 0% 3px;
      background-position: 0% 100%;
      animation: dom1 0.5s;
    }

    .right_btn>span {
      cursor: pointer;
      display: inline-block;
      margin-left: 20px;
      line-height: 36px;
      height: 36px;
      background: linear-gradient(to right, rgb(251, 14, 255), rgb(0, 187, 255)) no-repeat;
      background-size: 0% 3px;
      background-position: 0% 100%;
      animation: dom1 0.5s;
    }

    span:hover {
      color: rgb(75, 75, 75);
      font-weight: bold;
      padding: 0 10px;
      background-size: 100% 3px;
      animation: dom 0.5s;
    }

    @keyframes dom {
      0% {
        background-size: 0% 3px;
        padding: 0;
      }

      100% {
        background-size: 100% 3px;
        padding: 0 10px;
      }
    }

    @keyframes dom1 {
      0% {
        background-size: 100% 3px;
        background-position: 100% 100%;
        padding: 0 10px;
      }

      100% {
        background-size: 0% 3px;
        background-position: 100% 100%;
        padding: 0;
      }
    }
  }
}</style>
<style>
  .search_input .el-input__wrapper{
    height: 40px;
    border-radius: 20px;
    padding-right: 3px;
  }
  .search_input .el-input__wrapper:hover{
    box-shadow: 0 0 0 2px linear-gradient(to right, rgb(251, 14, 255), rgb(0, 187, 255)) inset !important;
  }
  .search_input .el-input__inner{
    padding-left: 20px;
  }
  .search_input .el-input__icon{
    padding: 0;
    margin: 0;
    background-color: unset;
    width: 100%;
  }
  .search_input img{
    background-color: unset;
    width: 20px;
    height: 20px;
  }
  .search_input .el-input__suffix-inner{
    background-color: aqua;
    border-radius: 30px;
    height: 90%;
    width: 80px;
    margin: auto 0;
    background-image: linear-gradient(to right, rgb(251, 14, 255), rgb(0, 187, 255));
  }
</style>
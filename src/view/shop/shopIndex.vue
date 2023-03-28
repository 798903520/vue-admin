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
    <!-- 搜索 -->
    <div class="search_div">
      <div class="all_width all_width_1">
        <div class="logo">dom<br>me</div>
        <div class="search_input">
          <el-input v-model="searchKey" placeholder="搜你想搜">
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
    <!-- 内容 -->
    <div class="index_content all_width">
      <!-- 顶部内容 -->
      <div class="contitle">
        <div class="left_type">
          <span class="leftTitle">分类</span>
          <span class="goodsType" v-for="item in typeData" :key="item.type">
          <div v-for="(i,index) in item.children_type" :key="i"><span v-if="index!=0"><strong>&nbsp;/&nbsp;</strong></span><a>{{ i }}</a></div>
        </span>
        </div>
        <div class="right_con">
          <div class="content_title"></div>
          <div class="content_loop_mine">
            <div class="left_loop"></div>
            <div class="right_mine"></div>
          </div>
        </div>
      </div>
      <div class="gess_goods"></div>
    </div>
  </div>
</template>

<script setup>
// 引入
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import http from '../../providers/http'

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
  if (userName.value == 'Hi,请登录') {
    router.push({
      name: 'loginIt',
      params: {
        backUrl: 'shop'
      }
    });
  } else {
    console.log('userName', userName.value);
  }
}

// 搜索框
let searchKey = ref('');
function clickSearch() {
  console.log('123123123');
}

// 获取分类数据
let typeData = ref([]);
function getTypeData(){
  let daa = {
        pageSize: 10,
        pageNum: 1,
        typeName: '',
      };
  http.get('table/get_p_t_List',daa).then(res => {
    if(res.code == 200||res.code == 304){
      for(let item of res.data){
        if(item.children_type){
          item.children_type = item.children_type.split(',');
        }else{
          item.children_type = '无'
        }
      }
      typeData.value = res.data;
    }else{
      console.log('error request: ',res);
    }
  })
}
onMounted(() => {
  getTypeData();
});



</script>

<style lang="less" scoped>
.index_content {
  padding: 25px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  height: auto;
  min-height: 600px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02);
  .contitle{
    display: flex;
  }
  .left_type .leftTitle{
    font-size: 18px;
    font-weight: bold;
  }
  .left_type{
    border-radius: 10px;
    padding: 20px;
    background-color: #f7f9fa;
    width: 20%;
    display: flex;
    flex-direction: column;
  }
  .goodsType{
    font-size: 14px;
    margin-top: 25px;
    font-weight: 100;
    color: #666 ;
    display: flex;
  }
}

.shop_bg {
  background-color: #eae8eb;
  min-height: 100vh;
  font-family: 'SimSun';

  .all_width_1 {
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
    background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
    -webkit-background-clip: text;
    color: transparent;
    // text-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    animation: up_done 0.5s alternate infinite;
    // animation-timing-function: ease-out;
  }

  @keyframes up_done {
    0% {
      margin-top: 0;
      text-shadow: 10px 0px 10px rgba(0, 0, 0, 0.15);
    }

    100% {
      margin-top: -15px;
      text-shadow: 10px -20px 15px rgba(0, 0, 0, 0.08);
    }
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
}
</style>
<style>
.search_input .el-input__wrapper {
  height: 40px;
  border-radius: 20px;
  padding-right: 3px;
}

.search_input .el-input__wrapper:hover {
  box-shadow: 0 0 0 2px linear-gradient(to right, rgb(251, 14, 255), rgb(0, 187, 255)) inset !important;
}

.search_input .el-input__inner {
  padding-left: 20px;
}

.search_input .el-input__icon {
  padding: 0;
  margin: 0;
  background-color: unset;
  width: 100%;
}

.search_input img {
  background-color: unset;
  width: 20px;
  height: 20px;
}

.search_input .el-input__suffix-inner {
  background-color: aqua;
  border-radius: 30px;
  height: 90%;
  width: 80px;
  margin: auto 0;
  background-image: linear-gradient(to right, rgb(251, 14, 255), rgb(0, 187, 255));
}</style>
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

    <router-view></router-view>
  </div>
</template>

<script setup>
// 引入
import { Swiper, SwiperSlide } from 'swiper/vue'
// 组件
import { getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import 'swiper/css'

import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import http from '../../providers/http'

const baseUrl = import.meta.env.VITE_APP_BASE_API;

const router = useRouter();
const route = useRoute();

const modules = ref([Navigation, Autoplay])


let userName = ref("");
let userImg = ref('');
/**
  * 获取用户名字
  */
function getUserName() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  userName.value = userData == null ? "Hi,请登录" : userData.userName;
  userImg.value = userData == null ? import.meta.env.VITE_APP_BASE_API + '/public/img/1675755927056.png' : import.meta.env.VITE_APP_BASE_API + userData.imgPath
}
onMounted(() => {
  getUserName();
});

/**
  * 跳转登录
  */
let { ctx: that } = getCurrentInstance();
function jumpLog(type = null) {
  if (userName.value == 'Hi,请登录') {
    router.push({
      path: '/loginIt',
      query: {
        backUrl: 'shop'
      }
    });
  } else if(type == null){
    sessionStorage.removeItem('MyToken');
    sessionStorage.removeItem('userData');
    ElNotification({
      type: 'success',
      message: '成功退出!'
    });
    userName.value = 'Hi,请登录';
    that.$forceUpdate();
  }else{
    router.push({
      path: '/index',
    });
  }
}

let searchKey = ref('');
/**
  * 搜索框
  */
function clickSearch() {
  console.log('123123123');
}


let typeData = ref([]);
/**
  * 获取分类数据
  */
function getTypeData() {
  let daa = {
    pageSize: 10,
    pageNum: 1,
    typeName: '',
  };
  http.get('table/get_p_t_List', daa).then(res => {
    if (res.code == 200 || res.code == 304) {
      for (let item of res.data) {
        if (item.children_type) {
          item.children_type = item.children_type.split(',');
        } else {
          item.children_type = '无'
        }
      }
      typeData.value = res.data;
    } else {
      console.log('error request: ', res);
    }
  })
}
onMounted(() => {
  getTypeData();
});

/**
  * title数据
  */
const titleData = ref([
  '地猫', '不划算', '地猫超市', '非法拍卖', '骑猪旅行', '偶尔特卖', '没有家', '好像直播'
]);

/**
  * 订单数据
  */
const orderDataType = ref([
  '购物车', '待收货', '待发货', '待付款', '待评价'
]);
/**
  * 模拟获取的数据
  */
const data_tuype = ref([
  23, 1, 0, 0, 3
]);


/**
  * 点击分类
  */
function jumpTypeGoods(type) {
  console.log('type', type);
}


/**
  * 轮播
  */

/**
  * 获取推广数据
  */
const yourLove = ref([]);
onMounted(() => {
  getIndexList();
})
function getIndexList() {
  http.get('/table/get_index_list').then(res => {
    console.log('res', res);
    if (res.code == 200) {
      yourLove.value = res.data;
    }
  });
}


/**
  * 打开新页面
  */
 function jumpDetail(id){
  window.open('/detail/'+id,'_blank');
 }
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

  .contitle {
    display: flex;
  }

  .left_type .leftTitle {
    font-size: 18px;
    font-weight: bold;
  }

  .left_type {
    border-radius: 10px;
    padding: 20px;
    background-color: #f7f9fa;
    width: 20%;
    display: flex;
    flex-direction: column;
  }

  .goodsType {
    font-size: 14px;
    font-weight: 100;
    color: #666;
    display: flex;
  }

  .type_child {
    margin-top: 25px;
  }

  .goodsType a:hover {
    cursor: pointer;
    background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
    -webkit-background-clip: text;
    color: transparent;
  }

  .goodsType .children_type {
    margin-top: 25px;
  }

  .right_con {
    margin-left: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .content_title {
      width: 100%;
      display: flex;
      background-color: #f7f9fa;
      border-radius: 10px;
      padding: 15px 35px;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;
      margin-bottom: 15px;
    }

    .content_loop_mine {
      flex: 1;
      max-height: 350px;
      display: flex;
    }

    .right_mine {
      flex: 1;
      margin-left: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;

      .head {
        margin-top: 20px;
      }

      .name_hi {
        font-weight: bold;
      }

      .head img {
        width: 60px;
        height: 60px;
        background-color: whitesmoke;
        border-radius: 30px;
      }

      .user_do img {
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }

      .user_do>div {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .user_do {
        display: flex;
        font-size: 13px;
        justify-content: space-between;
      }

      .notice {
        text-align: left;
        font-size: 13px;
      }

      .notice span {
        display: inline-block;
        color: white;
        padding: 2px 4px;
        border-radius: 4px;
        background-image: linear-gradient(to right, rgb(253, 161, 255), rgb(0, 187, 255));
      }

      .btn {
        display: flex;
        justify-content: space-between;
      }

      .btn span {
        display: block;
        height: 40px;
        line-height: 40px;
        width: 80px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }

      .btn .btn_2 {
        background-image: linear-gradient(to right, rgb(253, 161, 255), rgb(0, 187, 255));
      }

      .btn .btn_1 {
        background-image: linear-gradient(to right, rgb(251, 14, 255), #72d9ff);
      }

      .btn .btn_3 {
        color: #a000a5;
        border: 1px solid #e91bf0;
      }

      .my_goods_list {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .order_type {
        display: flex;
        flex-direction: column;
      }

      .order_type:hover {
        cursor: pointer;
        background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
        -webkit-background-clip: text;
        color: transparent;
      }

      .order_type .num {
        font-size: 16px;
        font-weight: bold;
        background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
        -webkit-background-clip: text;
        color: transparent;
      }

      .order_type .type {
        font-size: 13px;
      }
    }

    .left_loop {
      max-width: 65%;
      width: 590px;
      overflow: hidden;
      background-color: #f7f9fa;
      height: 100%;
      border-radius: 15px;

      img {
        width: auto;
        height: 100%;
      }

      .swiper {
        height: 100%;
      }

      .swiper-wrapper {
        height: 100%;
      }
    }

    .line {
      display: inline-block;
      width: 2px;
      height: 15px;
      background-color: #e0e4eb;
    }

    .font_size {
      font-weight: bold;
    }

    .color_change {
      background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
      -webkit-background-clip: text;
      color: transparent;
    }

    .color_change1 {
      background: linear-gradient(45deg, rgb(0, 187, 255), rgb(7, 202, 0));
      -webkit-background-clip: text;
      color: transparent;
    }
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
    user-select: none;
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
      text-shadow: 10px 0px 0px rgba(0, 0, 0, 0.15);
    }

    100% {
      margin-top: -15px;
      text-shadow: 15px 0px 5px rgba(0, 0, 0, 0.08);
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

.gess_goods {
  margin-top: 45px;
  width: 100%;

  .gess_title {
    font-size: 25px;
    font-weight: bold;

    span {
      display: inline-block;
      font-size: 12px;
      color: white;
      padding: 2px 4px;
      border-radius: 4px;
      background-image: linear-gradient(to right, rgb(253, 161, 255), rgb(0, 187, 255));
    }
  }

  .goods_items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
.good_one:hover{
  box-shadow: inset 0px 0px 1px 1px #89adff;
}
    .good_one {
      background-color: #f7f9fa;
      width: calc(32% - 22px);
      height: auto;
      margin-right: 2%;
      display: flex;
      margin-top: 20px;
      padding: 11px;
      border-radius: 11px;

      img {
        width: 150px;
        height: 150px;
        border-radius: 11px;
      }

      .spice {
        background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
        -webkit-background-clip: text;
        color: transparent;
      }
    }
    .goods_title{
      font-size: 17px;
    }
    .good_one:hover .goods_title{
      background: linear-gradient(45deg, rgb(251, 0, 255), rgb(0, 187, 255));
        -webkit-background-clip: text;
        color: transparent;
    }

    .good_one:nth-child(3n) {
      margin-right: 0;
    }

    .right_con {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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

<template>
<div class="nav1">
  div
  <img class="m_convex" :src="url+name.imgPath" title="点击上传头像" alt="无">
  <span>{{name.userName}}</span>
</div>
</template>

<script>
export default {
  name: "nav1",
}
</script>

<script setup>
import {ref,onMounted} from 'vue'
import http from '../providers/http.js'

const name = JSON.parse(sessionStorage.getItem('userData'));
const url = import.meta.env.VITE_APP_BASE_API;

const weatherData = ref({});
/**
  * 请求接口管理 https://yikeapi.com/account/index
  * 文档 https://www.tianqiapi.com/index/doc?version=week
  */
function getWeather(){
  http.Lget('https://v0.yiketianqi.com/free/week?unescape=1&appid=84789812&appsecret=gXzrmFI2&vue=1&cityid=101040100').then(res =>{
    weatherData.value = res;
  });
}
onMounted(() => {
  // getWeather()
})
</script>

<style scoped lang="less">
.nav1{
  height: 100%;
  width: calc(100% - 20px);
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  img{
    height: 50px;
    width: 50px;
    margin-right: 20px ;
    border-radius: 50%;
  }
}
</style>

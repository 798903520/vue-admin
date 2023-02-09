<template>
<div class="nav">
  <img :src="url+name.imgPath" title="点击上传头像" alt="无">
  <span>{{name.userName}}</span>
</div>
</template>

<script>
export default {
  name: "nav",
}
</script>
<script setup>
const name = JSON.parse(sessionStorage.getItem('userData'));
const url = import.meta.env.VITE_APP_BASE_API;
</script>

<style scoped lang="less">
.nav{
  height: 100%;
  width: calc(100% - 20px);
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 20px;
  img{
    height: 50px;
    width: 50px;
    margin-right: 20px ;
    border-radius: 50%;
    border: 1px solid black;
  }
}
</style>

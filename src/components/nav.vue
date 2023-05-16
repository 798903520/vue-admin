<template>
<div class="nav1">
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
const name = JSON.parse(sessionStorage.getItem('userData'));
const url = import.meta.env.VITE_APP_BASE_API;
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

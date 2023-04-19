<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<script setup>
// 调整窗口大小时刷新页面
  window.onresize = function(){
    location.reload();
  }
</script>

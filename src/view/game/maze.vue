<template>
  <span class="tt">width_num: {{maze.yOne_lineNum}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height_num:{{maze.xOne_lineNum}}</span>
  <div class="maze_page">
    <canvas id="maze" :width="1000" :height="750"></canvas>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Maze} from "../../js/maze.js";

const maze = ref({});
onMounted(()=>{
  maze.value = new Maze('maze',15);
})

</script>

<style scoped lang="less">
.maze_page{
  height: 100%;
  width: 100%;
  overflow: auto;
}
.tt{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
}
</style>

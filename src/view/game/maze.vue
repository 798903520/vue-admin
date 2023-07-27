<template>
  width_num: {{maze.yOne_lineNum}}-height_num:{{maze.xOne_lineNum}}
  <div class="maze_page">
    <canvas id="maze" :width="800" :height="600"></canvas>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Maze} from "../../js/maze.js";

const maze = ref({});
onMounted(()=>{
  maze.value = new Maze('maze');
  console.log('maze.value',maze.value)
})

</script>

<style scoped lang="less">
.maze_page{
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>

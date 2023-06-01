<template>

</template>

<script setup>
import tetrisBlock from "../../js/tetris";


function getTData (x) {
  let num = x;
  let itemData = [];
  function returndata (num){
    itemData = [];
    for(let i = 0;i<num;i++){
      itemData.push(new tetrisBlock());
    }
    return itemData;
  }
  return  returndata(num);
}
const funkuai = getTData(10);
console.log('funkuai',funkuai)
</script>

<style scoped lang="less">

</style>

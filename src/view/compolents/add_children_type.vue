<template>
  <div class="children">
    <el-input class="check_input" v-model="add_children" clearable @keyup.enter="add_to_children()" placeholder="输入子项以新增">
      <template #append>
        <el-button @click="add_to_children()">+</el-button>
      </template>
    </el-input>
    <div class="children_item">
      <span class="is_add_children" v-for="item in children_group" :key="item">
        {{ item }}
        <span class="delete_it" @click="delete_children(item)">&#10005;</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import http from '../../providers/http';
import { ElNotification } from 'element-plus'
import { ref, watch, computed, defineEmits } from 'vue';
const add_children = ref('');
const children_group = ref([]);

let props = defineProps(['fatherData']);
const emit = defineEmits(['getSunData']);

function add_to_children() {
  if (add_children.value.length == 0) {
    ElNotification({
      title: '提示',
      message: '请输入需要添加的子类型',
      type: 'error',
    })
    return;
  }
  props.fatherData == null ? props.fatherData = '' : '';
  let arr = props.fatherData.split(',') || [];
  if (arr.includes(add_children.value)) {
    ElNotification({
      title: '提示',
      message: '已存在同名类型,请重新添加',
      type: 'error',
    })
    return;
  }
  if (props.fatherData.length == 0) {
    // 直接add_children传递给父组件
    emit('getSunData', add_children.value);
  } else {
    // 处理后data传递给父组件
    let data = `${props.fatherData},${add_children.value}`;
    emit('getSunData', data);
  }
  add_children.value = '';
}
// 删除子类型
function delete_children(item) {
  console.log('item', item);
  let arr = props.fatherData.split(',');
  let num = arr.indexOf(item);
  arr.splice(num, 1);
  // 返回dta给父组件
  let dta = arr.join(',');
  emit('getSunData', dta);
}
// 监听传递的prop
watch(() => props.fatherData, (newV, oldV) => {
  let is = newV == null || newV.length == 0;
  children_group.value = is ? [] : newV.split(',');
});
</script>

<style lang="less" scoped>
.children {
  flex: 1;
}

.is_add_children {
  display: inline-block;
  background-color: aliceblue;
  border: 1px solid rgb(206, 206, 206);
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 2px;
  min-width: 50px;
  padding: 0 10px;
  margin-top: 10px;
  margin-right: 10px;
  position: relative;

  .delete_it {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    height: 17px;
    width: 17px;
    line-height: 17px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgb(163, 163, 163);
    transform: translate(50%, -50%);
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
  }
}

.is_add_children:hover {
  .delete_it {
    display: block;
  }
}

.children_item {
  display: flex;
  flex-wrap: wrap;
  height: auto;
}

.check_input {
  width: 100%;
}</style>
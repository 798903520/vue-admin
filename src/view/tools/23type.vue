<template>
  <div class="type23">
    <div class="leftDrag">
      <div class="componentItem" :class="{ 'chooseItem': dropData.key == item.key }"
        @dragstart="dragItem(item.key, index)" v-for="(item, index) in tagInfo" draggable="true">
        {{ item.name }}
        <span class="delete" v-if="dropData.key == item.key" @click="deleteNowCom">&#10005;</span>
      </div>
    </div>
    <div class="rightContent" ondragover="event.preventDefault()" @drop="getData()">
      <component :class="tagInfo[dropData.index]?tagInfo[dropData.index].key:-1" :key="tagInfo[dropData.index]?tagInfo[dropData.index].key:-1" :is="tagInfo[dropData.index]?tagInfo[dropData.index].component:'null'">
        <div class="text">拖到此处以使用</div>
      </component>
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { ref, onMounted } from 'vue';

// 子组件
import Factory from './23Type/1factory.vue'
import singleExample from './23Type/2singleExample.vue'
import adapters from './23Type/3adapters.vue'
import decorators from './23Type/4decorators.vue'
import agents from './23Type/5agents.vue'
import appearance from './23Type/6appearance.vue'
import observers from './23Type/7observers.vue'
import status from './23Type/8status.vue'
import iterators from './23Type/9Iterators.vue'
import bridge from './23Type/10bridge.vue'
import portfolio from './23Type/11portfolio.vue'
import prototype from './23Type/12prototype.vue'
import strategies from './23Type/13strategies.vue'
import enjoyment from './23Type/14enjoyment.vue'
import template from './23Type/15template.vue'
import responsibility from './23Type/16responsibility.vue'
import orders from './23Type/17orders.vue'
import memorandum from './23Type/18memorandum.vue'
import intermediaries from './23Type/19intermediaries.vue'
import interpreter from './23Type/20interpreter.vue'
import interviewer from './23Type/21interviewer.vue'

import empty from './23Type/empty.vue'


// 组件数据
const tagInfo = [
  {
    name: '工厂模式',
    key: 'Factory',
    component: Factory
  },
  {
    name: '单例模式',
    key: 'singleExample',
    component: singleExample
  },
  {
    name: '适配器模式',
    key: 'adapters',
    component: adapters
  },
  {
    name: '装饰者模式',
    key: 'decorators',
    component: decorators
  },
  {
    name: '代理模式',
    key: 'agents',
    component: agents
  },
  {
    name: '外观模式',
    key: 'empty',
    component: empty
  },
  {
    name: '观察者模式',
    key: 'observers',
    component: observers
  },
  {
    name: '状态模式',
    key: 'status',
    component: status
  },
  {
    name: '迭代器模式',
    key: 'iterators',
    component: iterators
  },
  {
    name: '桥接模式',
    key: 'bridge',
    component: bridge
  },
  {
    name: '组合模式',
    key: 'portfolio',
    component: portfolio
  },
  {
    name: '原型模式',
    key: 'prototype',
    component: prototype
  },
  {
    name: '策略模式',
    key: 'strategies',
    component: strategies
  },
  {
    name: '享元模式',
    key: 'enjoyment',
    component: enjoyment
  },
  {
    name: '模板方法模式',
    key: 'template',
    component: template
  },
  {
    name: '职责链模式',
    key: 'responsibility',
    component: responsibility
  },
  {
    name: '命令模式',
    key: 'orders',
    component: orders
  },
  {
    name: '备忘录模式',
    key: 'memorandum',
    component: memorandum
  },
  {
    name: '中介者模式',
    key: 'intermediaries',
    component: intermediaries
  },
  {
    name: '解释器模式',
    key: 'interpreter',
    component: interpreter
  },
  {
    name: '访问者模式',
    key: 'interviewer',
    component: interviewer
  },
]
//  当前拖动的组件
const dragData = ref({ key: null, index: -1 });
// 放下的组件
const dropData = ref({ key: null, index: -1 });

/**
  * 拖动组件
  */
function dragItem(key, index) {
  if (key == dropData.value.key) {
    ElNotification({
      title: '提醒',
      message: '请勿重复选择',
      type: 'error',
    })
    return;
  }
  dragData.value.key = key;
  dragData.value.index = index;
}
/**
  * 得到数据
  */
function getData() {
  dropData.value.key = dragData.value.key;
  dropData.value.index = dragData.value.index;
}

/**
  * 删除组件
  */
function deleteNowCom() {
  dropData.value = { key: null, index: -1 };
}



</script>

<style lang="less" scoped>
.type23 {
  height: 100%;
  width: 100%;
  display: flex;

  .leftDrag::-webkit-scrollbar {
    width: 4px;
    border: 1px solid #c3c3c3;
  }

  .leftDrag::-webkit-scrollbar-thumb {
    background-color: #c3c3c3;
  }

  .leftDrag {
    box-sizing: border-box;
    width: 150px;
    height: 100%;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    // border: 1px solid rgba(0, 0, 0,0.05);
    margin-right: 15px;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .componentItem {
      border: 1px solid rgba(0, 0, 0, 0.1);
      // box-shadow: 0 0 5px 5px rgba(0, 0, 0,0.05);
      color: rgba(0, 0, 0, 0.8);
      height: auto;
      padding: 10px;
      text-align: center;
      border-radius: 4px;
      background-color: white;
      position: relative;
      margin-bottom: 15px;
    }

    .componentItem:hover {
      border: 1px dashed #005fb8;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
      color: #005fb8;
    }

    .chooseItem {
      // border: 1px solid #005fb8;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
      background-color: white;
      color: #005fb8;

      .delete {
        position: absolute;
        width: 15px;
        height: 15px;
        display: block;
        top: 0;
        right: 0;
        border-radius: 15px;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        padding: 2px;
        text-align: center;
        line-height: 15px;
        cursor: pointer;
      }
    }
  }

  .rightContent {
    color: rgba(0, 0, 0, 0.8);
    flex: 1;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    position: relative;

    .text {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }

  .rightContent:-moz-drag-over {
    border: 1px solid black;
  }
}</style>
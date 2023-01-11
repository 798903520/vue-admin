<template>
      <el-menu
          class="el-menu-vertical-demo menu"
          router
          :unique-opened="true"
      >
        <template v-for="(item) in router" :key="item.name">
          <el-menu-item :router="item.path" :index="item.path" v-if="!item.children">{{item.name}}</el-menu-item>
          <el-sub-menu v-if="item.children" :index="item.path">
            <template #title>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(ite) in item.children" :key="ite.path" :index="ite.path">{{ite.name}}</el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
</template>

<script>
// import { useRouter, useRoute } from "vue-router"
export default {
  name: "menu",
  data(){
    return{
    }
  },
  methods:{
    itemClick(data){
      this.$router.push(data);
    },
  },

}
</script>

<!--setup可直接引入数据-->
<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const router = route.matched[0].children;

</script>

<style scoped lang="less">
.menu{
  height: 100%;
  width: calc(100% - 1px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

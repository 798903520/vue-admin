<template>
  <el-dropdown class="dpd" @command="clickDRP">
    <span class="el-dropdown-link">
      当前表 : {{ now_table }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="city">city</el-dropdown-item>
        <el-dropdown-item command="product_type" divided>product_type</el-dropdown-item>
        <el-dropdown-item command="product_business" divided>product_business</el-dropdown-item>
        <el-dropdown-item command="product" divided>product</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <city :now_table="now_table"></city>
</template>

<script>
// 引入接口API
import { getCityList, getOneData ,add ,edit } from "../../api";
export default {
  name:"home",
  data() {
    return {
      now_table:'city',
      query: {
        pageSize: 10,
        pageNum: 1,
        city: '',
      },
      cityList: {},
      title: "新增",
      type: "",
      editData: {
        city_id:'',
        city:'',
        country_id:'',
        last_update:''
      },
      dialogVisible: false,
    };
  },
  methods: {
    //  切换表格
    clickDRP(event){
      this.now_table = event;
    },

  },
  mounted() {
  },
};
</script>
<script setup>
  import city from './city.vue';
</script>

<style lang="less" scoped>

</style>

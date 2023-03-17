<template>
  <el-dropdown class="dpd" @command="clickDRP" trigger="click">
    <span class="el-dropdown-link">
      {{ table_name(now_table) }} 表格
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="city">城市</el-dropdown-item>
        <el-dropdown-item command="product_type" divided>商品类型</el-dropdown-item>
        <el-dropdown-item command="product_business" divided>商家</el-dropdown-item>
        <el-dropdown-item command="product" divided>商品</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <city v-if="now_table == 'city'"></city>
  <product_type v-if="now_table == 'product_type'"></product_type>
  <product_business v-if="now_table == 'product_business'"></product_business>
  <product v-if="now_table == 'product'"></product>
</template>

<script>
// 引入接口API
export default {
  name:"home",
  data() {
    return {
      now_table:'product_type',
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
    // 展示
    table_name(value){
      if(value == 'city'){
        return '城市';
      }else if(value == 'product_type'){
        return '商品类型';
      }else if(value == 'product_business'){
        return '商家';
      }else if(value == 'product'){
        return '商品';
      }
    },

  },
  mounted() {
  },
};
</script>
<script setup>
  import city from './city.vue';
  import product_type from './product_type.vue';
  import product_business from './product_business.vue';
  import product from './product.vue';
</script>

<style lang="less" scoped>

</style>

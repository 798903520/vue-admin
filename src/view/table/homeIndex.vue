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

    // 新增或编辑
    addOrEditOne(){
      if(this.type == 'add'){
        add(this.editData).then(res => {
          if(res.code == 200){
            this.$notify.success('新增成功');
          }else{
            this.$notify.error(res.msg);
          }
          this.searchList();
          this.dialogBeforeClose();
        });
      }
      else{
        edit(this.editData).then(res => {
          if(res.code == 200){
            this.$notify.success('编辑成功');
          }else{
            this.$notify.error(res.msg);
          }
          this.searchList();
          this.dialogBeforeClose();
        });
      }
    },
    // 关闭弹窗
    dialogBeforeClose() {
      this.dialogVisible = false;
    },
    // 打开弹窗
    addORedit(type) {
      this.type = type;
      console.log(type);
      if (this.type != "add") {
        getOneData({ id: this.type }).then((res) => {
          if (res.code == 200) {
            this.editData = res.data;
          }
        });
      }else{
        this.editData = {
          city_id:'',
          city:'',
          country_id:'',
          last_update:''
        }
      }
      this.dialogVisible = true;
    },
    // 查询
    searchList() {
      this.query.pageNum = "1";
      this.getList();
    },
    // 分页查询方法
    sizeChange(val) {
      this.query.pageSize = val;
      this.query.pageNum = "1";
      this.getList();
    },
    currChange(val) {
      this.query.pageNum = val;
      this.getList();
    },
    // 获取列表数据
    getList() {
      getCityList(this.query).then((res) => {
        if (res.code == '200') {
          this.cityList = res;
          this.$notify.success(res.msg);
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<script setup>
  import city from './city.vue';
</script>

<style lang="less" scoped>

</style>

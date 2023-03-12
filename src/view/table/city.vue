<template>
  <div class="home">
    <div class="headder">
      <el-input
          clearable
          class="search"
          v-model="query.city"
          placeholder="输入城市名字"
      ></el-input>
      <el-button size="large" type="primary" @click="searchList">搜索</el-button>
      <el-button size="large" type="primary" @click="addORedit('add')" plain>新增</el-button>
    </div>
    <div class="tables">
      <el-table :data="cityList.data" border style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="70px">
        </el-table-column>
        <el-table-column prop="city_id" align="center" label="城市id" width="120px">
        </el-table-column>
        <el-table-column prop="city" align="center" label="城市名称"> </el-table-column>
        <el-table-column prop="country_id" align="center" label="国家id" width="120px">
        </el-table-column>
        <el-table-column prop="last_update" align="center" label="最后更新时间">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
              <el-button text type="primary" @click="addORedit(scope.row.city_id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currChange"
          :page-sizes="[25, 50, 100]"
          :current-page.sync="(Number(query.pageNum))"
          layout=" sizes, prev, pager, next, jumper,total"
          :total="Number(cityList.total)"
      >
      </el-pagination>
    </div>
    <el-dialog
        :title="title"
        v-model="dialogVisible"
        width="500px"
        :before-close="dialogBeforeClose"
    >
      <div class="dialogBody">
        <div class="item">
          <span class="leftLabel"> 城市id </span>
          <el-input v-model="editData.city_id" placeholder="输入国家名称" :disabled='type=="add"?false:true'></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 城市名称 </span>
          <el-input
              v-model="editData.city"
              placeholder="输入国家名称"
          ></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 国家id </span>
          <el-input v-model="editData.country_id" placeholder="输入国家名称" :disabled='type=="add"?false:true'></el-input>
        </div>

        <div class="item">
          <span class="leftLabel"> 更新时间 </span>
          <!-- <el-input v-model="editData.last_update" placeholder="输入国家名称" :disabled='type=="add"?false:true'></el-input> -->
          <el-date-picker :editable="false" v-model="editData.last_update" :disabled='type=="add"?false:true' value-format='yyyy-MM-DD HH:mm:ss' type="datetime" placeholder="date"></el-date-picker>
        </div>
      </div>
      <div class="footer" slot="footer">
        <el-button size="large" @click="dialogVisible = false">取 消</el-button>
        <el-button size="large" type="primary" @click='addOrEditOne()'
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCityList, getOneData ,add ,edit } from "../../api";
export default {
  name: 'VueAdminCity',
  data() {
    return {
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

  mounted() {
    this.getList();
  },

  methods: {
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
          this.$forceUpdate();
          this.$notify.success(res.msg);
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
  },
};
</script>
<script setup>
  const props = defineProps({
    now_table:String
})
</script>

<style lang="scss" scoped>

</style>
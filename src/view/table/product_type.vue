<template>
  <div class="home">
    <div class="headder">
      <el-input clearable class="search" v-model="query.type" placeholder="输入类型"></el-input>
      <el-button size="large" type="primary" @click="searchList">搜索</el-button>
      <el-button size="large" type="primary" @click="addORedit('add')" plain>新增</el-button>
    </div>
    <div class="tables">
      <el-table :data="typeList.data" border style="width: 100%"
      @selection-change="handleSelecChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" align="center" label="序号" width="70px">
        </el-table-column>
        <el-table-column prop="typeId" label="id" width="120px">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120px">
        </el-table-column>
        <el-table-column prop="typeName" label="类型名称"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button text type="primary" @click="addORedit(scope.row.typeId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="sizeChange" @current-change="currChange" :page-sizes="[25, 50, 100]"
        :current-page.sync="(Number(query.pageNum))" layout=" sizes, prev, pager, next, jumper,total"
        :total="Number(typeList.total)">
      </el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="title" v-model="dialogVisible" width="600px" :before-close="dialogBeforeClose">
      <div class="dialogBody">
        <div class="item">
          <span class="leftLabel"> 类型 </span>
          <el-input v-model="editData.type" placeholder="输入国家类型"></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 类型名称 </span>
          <el-input v-model="editData.typeName" placeholder="输入类型名称"></el-input>
        </div>
      </div>
      <div class="footer" slot="footer">
        <el-button size="large" @click="dialogVisible = false">取 消</el-button>
        <el-button size="large" type="primary" @click='addOrEditOne()'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
  now_table: String
})
</script>
<script>
import { get_p_t_List, get_p_t_Data, add_PT, edit_PT } from "../../api";
export default {
  name: 'VueAdminProductType',

  data() {
    return {
      query: {
        pageSize: 10,
        pageNum: 1,
        typeName: '',
      },
      typeList: {},
      title: "新增",
      type: "",
      editData: {
        type: '',
        typeName: '',
      },
      dialogVisible: false,
    };
  },

  mounted() {
    this.searchList();
  },

  methods: {
    // 新增或编辑
    addOrEditOne() {
      if (this.type == 'add') {
        add_PT(this.editData).then(res => {
          if (res.code == 200) {
            this.$notify.success('新增成功');
          } else {
            this.$notify.error(res.msg);
          }
          this.searchList();
          this.dialogBeforeClose();
        });
      }
      else {
        edit_PT(this.editData).then(res => {
          if (res.code == 200) {
            this.$notify.success('编辑成功');
          } else {
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
      if (this.type != "add") {
        get_p_t_Data({ typeId: type }).then((res) => {
          if (res.code == 200) {
            this.editData = res.data;
          }
        });
      } else {
        this.editData = {
          type: '',
          typeName: '',
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
      get_p_t_List(this.query).then((res) => {
        if (res.code == '200') {
          this.typeList = res;
          this.$forceUpdate();
          this.$notify.success(res.msg);
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
    handleSelecChange(value){
    },
  },
};
</script>

<style lang="less" scoped></style>
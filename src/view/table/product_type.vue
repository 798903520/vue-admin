<template>
  <div class="home">
    <div class="headder">
      <el-input clearable class="search" v-model="query.type" placeholder="输入类型"></el-input>
      <el-button size="large" type="primary" @click="searchList">搜索</el-button>
      <el-button size="large" type="primary" @click="addORedit('add')" plain>新增</el-button>
      <el-button size="large" type="primary" @click="deleteMoreAndOne()" plain>批量删除</el-button>
    </div>
    <div class="tables">
      <el-table :data="typeList.data" border style="width: 100%" @select="handleSelecChange"
        @select-all="handleSelecChange">
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
            <el-button text type="primary" @click="deleteMoreAndOne(scope.row.typeId)">删除</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { get_p_t_List, get_p_t_Data, add_PT, edit_PT, delete_p_t } from "../../api";
export default {
  name: 'VueAdminProductType',

  data() {
    return {
      query: {
        pageSize: 10,
        pageNum: 1,
        typeName: '',
      },
      ids: '',
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
          this.$notify.success('更新成功');
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
    // 获取选择的id合集
    handleSelecChange(value) {
      this.ids = '';
      value.map((item, index) => {
        this.ids += item.typeId;
        (index == value.length - 1) ? '' : this.ids += ',';
      })
    },
    // 删除
    deleteMoreAndOne(id='-1') {
      id == -1?'':this.ids = id;
      if(this.ids.length==0){
        this.$notify.error('请选择至少一条数据');
        return;
      }
      ElMessageBox.confirm('此操作不可逆,请确认', '删除确认', {
        // if you want to disable its autofocus
        // autofocus: false,
        distinguishCancelAndClose: true,
        confirmButtonText: '确认删除',
        cancelButtonText: '取消删除',
      }).then(() => {
        delete_p_t({ ids: this.ids }).then((res) => {
          if (res.code == 200) {
            this.searchList();
          }
          this.$notify.success(res.msg);
        });
      }).catch(() => {
        this.$notify.info('取消操作');
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
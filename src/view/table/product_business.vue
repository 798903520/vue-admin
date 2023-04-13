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
        <el-table-column prop="p_b_id" align="center" label="商家id" width="120px">
        </el-table-column>
        <el-table-column prop="type" align="center" label="子类型标识" width="120px">
        </el-table-column>
        <el-table-column prop="name" align="center" label="商家名称"> </el-table-column>
        <el-table-column prop="fans" align="center" label="收藏粉丝"> </el-table-column>
        <el-table-column prop="content" align="center" label="商家说明"> </el-table-column>
        <el-table-column prop="createTime" align="center" label="入驻时间"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-button text type="primary" @click="addORedit(scope.row.p_b_id)">编辑</el-button>
            <el-button text type="primary" @click="deleteMoreAndOne(scope.row.p_b_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @size-change="sizeChange" @current-change="currChange" :page-sizes="[25, 50, 100]"
        :current-page.sync="(Number(query.pageNum))" layout=" sizes, prev, pager, next, jumper,total"
        :total="Number(typeList.total)">
      </el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="title" v-if="dialogVisible" v-model="dialogVisible" width="600px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="dialogBeforeClose">
      <div class="dialogBody">
        <div class="item">
          <span class="leftLabel"> 展示头像 </span>
          <upload_img @imgPath="givePath" :imgPath="editData.headImgPath"/>
        </div>
        <div class="item">
          <span class="leftLabel"> 子类型标识 </span>
          <el-input v-model="editData.type" placeholder="选择类型"></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 商家名称 </span>
          <el-input v-model="editData.name" placeholder="选择类型"></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 商家说明 </span>
          <el-input type="textarea" v-model="editData.content" placeholder="选择类型"></el-input>
        </div>
        <div class="item">
          <span class="leftLabel"> 收藏粉丝 </span>
          <el-input v-model="editData.fans" placeholder="收藏粉丝"></el-input>
        </div>
        <!-- <div class="item">
          <span class="leftLabel"> 入住时间 </span>
          <el-input v-model="editData.type" placeholder="选择类型"></el-input>
        </div> -->
        <!-- <div class="item">
          <span class="leftLabel"> 子类型 </span>
          <div class="children">
            <el-input class="check_input" v-model="add_children" @keyup.enter="add_to_children()" placeholder="输入新增类型名称">
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
        </div> -->
      </div>
      <div class="footer" slot="footer">
        <el-button size="large" @click="dialogVisible = false">取 消</el-button>
        <el-button size="large" type="primary" @click='addOrEditOne()'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import upload_img from '../compolents/upload_image.vue'
const props = defineProps({
  now_table: String
})
</script>
<script>
import { isEmpty } from '../../js/jsFun.js';
import http from '../../providers/http';
import { ElMessage, ElMessageBox } from 'element-plus';
import { get_p_t_List, get_p_t_Data, add_PT, edit_PT, delete_p_t } from "../../api";
export default {
  name: 'VueAdminProductType',

  data() {
    return {
      baseUrl:import.meta.env.VITE_APP_BASE_API,
      query: {
        pageSize: 10,
        pageNum: 1,
        typeName: '',
      },
      ids: '',
      typeList: {},
      title: "新增",
      type: "",
      dialogVisible: false,
      add_children:'',
      editData:{
        p_b_id: '',
        type: '',
        name: '',
        fans:'',
        content:'',
        createTime:'',
        headImgPath:'',
        
      }
    };
  },

  mounted() {
    this.searchList();
  },
computed:{
  // children_group(){
  //   let is = this.editData.children_type == null||this.editData.children_type.length == 0;
  //   return is?[]:this.editData.children_type.split(',');
  // },
},
  methods: {
    // 
    givePath(data){
      this.editData.headImgPath = data;
    },
    // 删除子类型
    delete_children(item){
      let arr = this.editData.children_type.split(',');
      let num = arr.indexOf(item);
      arr.splice(num,1);
      this.editData.children_type = arr.join(',');
    },
    // 新增子类型
    add_to_children(){
      let _this = this;
      if(this.add_children.length == 0){
        this.$notify.error('请输入需要添加的子类型');
        return;
      }
      _this.editData.children_type == null?_this.editData.children_type='':'';
      let arr = _this.editData.children_type.split(',')||[];
      if(arr.includes(_this.add_children)){
        this.$notify.error('已存在同名类型,请重新添加');
        return;
      }
      this.editData.children_type.length == 0?
      this.editData.children_type = this.add_children:
      this.editData.children_type = `${this.editData.children_type},${this.add_children}`;
      this.add_children = '';
    },
    // 新增或编辑
    addOrEditOne() {
      if(this.editData.type.length==0){
        this.$notify.error('类型不能为空');
        return;
      }
      if (this.type == 'add') {
        http.post('/table/add_PB',this.editData).then(res => {
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
        http.post('/table/edit_PB',this.editData).then(res => {
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
    async addORedit(type) {
      this.type = type;
      let _this = this;
      if (this.type != "add") {
        await http.get('/table/get_p_b_Data',{ p_b_id: type }).then((res) => {
          if (res.code == 200) {
            _this.editData = res.data;
          }
        });
      } else {
        _this.editData = {
          p_b_id: '',
        type: '',
        name: '',
        fans:'',
        content:'',
        createTime:'',
        headImgPath:'',
        fans:'',
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
      http.get('/table/get_p_b_List',this.query).then((res) => {
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
    deleteMoreAndOne(id = '-1') {
      id == -1 ? '' : this.ids = id;
      if (this.ids.length == 0) {
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
            console.log('err', res);
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


<style lang="less" scoped>
  .dialogBody{
    .headImg{
      width: 60px;
      height: 60px;
    }
    .children{
      flex: 1;
    }
    .is_add_children{
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
      .delete_it{
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
        transform: translate(50%,-50%);
        font-size: 12px;
        cursor: pointer;
        font-weight: bold;
      }
    }
    .is_add_children:hover{
      .delete_it{
        display: block;
      }
    }
    .children_item{
      display: flex;
      flex-wrap: wrap;
      height: auto;
    }
    .check_input{
      width: 250px;
    }
  }
</style>
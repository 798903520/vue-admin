<template>
  <!-- ;列表 -->
  <el-dialog width="80%" v-model="isOpen" :before-close="closeIt" :close-on-click-modal="false"
    :close-on-press-escape="false" center>
    <template #header>商家 : {{ title }} 商品列表</template>
    <div class="goods_body">
      <el-form :inline="true">
        <el-form-item label="搜索商品名字">
          <el-input v-model="query.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(props.b_id.p_b_id)">搜索</el-button>
          <el-button @click="new_goods()">新增商品</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="goods_list.data">
        <el-table-column label="id" prop="product_id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="规格" prop="size"></el-table-column>
        <el-table-column label="颜色" prop="color"></el-table-column>
        <el-table-column label="介绍" prop="content"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="图片" prop="imgPaths"></el-table-column>
        <el-table-column width="200" label="创建时间" prop="create_product_time"></el-table-column>
        <el-table-column width="200" label="操作" >
          
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" slot="footer">
      <el-button size="large" @click="closeIt">取 消</el-button>
      <el-button size="large" type="primary" @click=''>确 定</el-button>
    </div>
  </el-dialog>

  <!-- 新增&编辑 -->
  <el-dialog width="500px" v-model="addOne" v-if="addOne" :before-close="closeOne" :close-on-click-modal="false"
    :close-on-press-escape="false" center>
    <template #header>新增商品</template>
    <div class="dialogBody">
      <div class="item">
        <span class="leftLabel"> 商品名称 </span>
        <el-input v-model="addData.name"></el-input>
      </div>
      <div class="item">
        <span class="leftLabel"> 商品规格 </span>
        <!-- <el-input v-model="addData.size"></el-input> -->
        <addChildrenType :fatherData="addData.size" @getSunData="getSunData_size" /> 
      </div>
      <div class="item">
        <span class="leftLabel"> 商品颜色 </span>
        <addChildrenType :fatherData="addData.color" @getSunData="getSunData_color" /> 
      </div>
      <div class="item">
        <span class="leftLabel"> 商品介绍 </span>
        <el-input v-model="addData.content"></el-input>
      </div>
      <div class="item">
        <span class="leftLabel"> 商品价格 </span>
        <addChildrenType :fatherData="addData.price" @getSunData="getSunData_price" />
        <!-- <el-input v-model="addData.price"></el-input> -->
      </div>
      <div class="item">
        <span class="leftLabel"> 商品图片 </span>
        <!-- <el-input v-model="addData.imgPaths"></el-input> -->
        <uploadImage :imgPath="addData.imgPaths" @imgPath="givePath"/>
      </div>
    </div>
    <div class="footer" slot="footer">
      <el-button size="large" @click="closeOne">取 消</el-button>
      <el-button size="large" type="primary" @click='addOrEditOne()'>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import http from '../../providers/http';
import { ElNotification } from 'element-plus'
import { ref, watch, computed, defineEmits } from 'vue';
import addChildrenType from '../compolents/add_children_type.vue';
import uploadImage from '../compolents/upload_image.vue';

let props = defineProps(['isOpen', 'b_id']);

// 获取到的商品数据
const goods_list = ref({});
// 请求数据
const query = ref({
  name: '',
  p_b_id: null,
});
function getData(id) {
  console.log('id', id, query.value);

  query.value.p_b_id = id;
  http.get('/table/get_p_List', query.value).then(res => {
    if (res.code == 200) {
      goods_list.value = res;
    } else {
      ElNotification({
        title: '提示',
        message: res.msg,
        type: 'error',
      })
    }
  });
}

const title = ref('');


// 监听传递的prop
watch(() => props.b_id, (newV, oldV) => {
  getData(newV.p_b_id);
  addData.value.p_b_id = newV.p_b_id;
  addData.value.type = newV.type;
  title.value = newV.name;
});

const ctx = defineEmits(['close']);
function closeIt() {
  ctx('close');
}

// 弹窗开关
const addOne = ref(false);
function new_goods() {
  addOne.value = true;
}
function closeOne() {
  addOne.value = false;
}
function addOrEditOne(){
  console.log('addData',addData);
  http.post('/table/add_P',addData.value).then(res => {
    if(res.code == 200){
      getData(addData.value.p_b_id);
    }
  })
}

// 默认数据
const addData = ref({size:'',color:'',price:'',p_b_id:''});
function getSunData_size (data){
  addData.value.size = data;
}
function getSunData_color (data){
  addData.value.color = data;
}
function getSunData_price (data){
  addData.value.price = data;
}
function givePath (data){
  addData.value.imgPaths = data;
}

</script>

<style lang="less" scoped>
.footer {
  margin-top: 20px;
}
</style>
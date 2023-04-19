<template>
<div class="headBtn">
  <div class="left">
    <div><el-button @click="addOne('A')">新增评论</el-button></div>
    <div class="item_list">
      <div v-for="item in blog_list" :key="item.id" class="blogItem">
        <div class="head_name_time">
          <img :src="baseUrl+head.imgPath" alt="">
          <div class="name_time">
            <span class="name">{{item.name}}</span>
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="image">
          <el-image style="height: 150px;width: 150px" fit="cover" :preview-src-list="[baseUrl+item.imgPath]" :src="baseUrl+item.imgPath"></el-image>
        </div>
      </div>
    </div>
  </div>
  <itemLoop class="rightContent" :settings="loopData" @clickData="logit">
  </itemLoop>
</div>
  <el-dialog
    v-model="addDia"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :show-close="false"
    width="900px"
  >
    <div class="video">
      <div class="getPhotoArea">
        <video id="getPhoto" autoplay></video>
        <canvas id="drowIt" width="400" height="300"></canvas>
      </div>
      <div class="doBtn">
        <el-button v-if="!this.nowStream" @click="openIt()">打开摄像头</el-button>
        <el-button v-if="this.nowStream" @click="closeVideo()">关闭摄像头</el-button>
        <el-button id="shoot" @click="shoot()">拍照</el-button>
<!--        <el-button>预览</el-button>-->
      </div>
    </div>
    <template #footer>
        <el-button @click="addImg('T')">确定</el-button>
        <el-button @click="addImg('F')">取消</el-button>
    </template>
  </el-dialog>
<!--  新增-->
  <el-dialog
      v-model="addDia2"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="50%"
      title="新增评论"
  >
    <div class="dayly">
      <div class="data">
        <div class="label">名字:</div>
        <el-input maxlength="200" show-word-limit v-model="name"></el-input>
      </div>
      <div class="data">
        <div class="label" style="align-self: self-start">内容:</div>
        <el-input v-model="content" maxlength="200" show-word-limit type="textarea"></el-input>
      </div>
      <div class="data">
        <div class="label" style="align-self: self-start">图片:</div>
        <div class="image">
          <div class="select" v-if="blobFile">
            <span class="elx" @click="blobFile = null">x</span>
            <img :src="blobFile" alt="">
          </div>
          <div class="select" v-if="!blobFile">
            <el-button size="small" @click="selectImg">选择图片</el-button>
            <el-button size="small" @click="addImg">拍摄图片</el-button>
            <span class="span"><img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iI2QzZDNkMyIgY2xhc3M9ImJpIGJpLXBsdXMtY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJpY29uLXBsdXMtY2lyY2xlLTI5Ij48cGF0aCBkPSJNOCAxNUE3IDcgMCAxIDEgOCAxYTcgNyAwIDAgMSAwIDE0em0wIDFBOCA4IDAgMSAwIDggMGE4IDggMCAwIDAgMCAxNnoiPjwvcGF0aD48cGF0aCBkPSJNOCA0YS41LjUgMCAwIDEgLjUuNXYzaDNhLjUuNSAwIDAgMSAwIDFoLTN2M2EuNS41IDAgMCAxLTEgMHYtM2gtM2EuNS41IDAgMCAxIDAtMWgzdi0zQS41LjUgMCAwIDEgOCA0eiI+PC9wYXRoPjwvc3ZnPg==" alt=""></span>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-button @click="addOne('T')">确定</el-button>
      <el-button @click="addOne('F')">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {toBase64} from '../../js/jsFun.js'
import {addBlog,getBlog} from "../../api"
import itemLoop from "../compolents/itemLoop.vue";
export default {
  name: "blog",
  components:{
    itemLoop,
  },
  data(){
    return {
      baseUrl:import.meta.env.VITE_APP_BASE_API,
      blog_list:[],

      pageNum: '1',
      pageSize:'10',

      addDia:false,
      addDia2:false,
    //  存储流
      nowStream:null,
      name:'',
      content:'',
      // 选择的图片
      blobFile:null,
    }
  },
  created() {
    this.getBlogData();
  },
  methods:{
    getBlogData(){
      let Data = {
        pageSize:this.pageSize,
        pageNum: this.pageNum
      }
      getBlog(Data).then(res => {
        if(res.code == 200){
          this.blog_list = res.data;
          this.$forceUpdate();
        }
      });
    },
    //log
    logit(data){
      console.log('123',data);
    },
    //弹窗按钮
    addOne(data){
      switch (data){
        case 'A':
          this.name = '';
          this.content = '';
          this.blobFile = null;
          break;
        case 'T':
          //确定新增
            this.sureNew();
          break;
        case 'F':
          break;
      }
      this.addDia2 = !this.addDia2;
    },
    sureNew(){
      if(this.name.length==0){
        this.$notify.error('姓名不能为空');
        return;
      }
      if(this.content.length==0){
        this.$notify.error('内容不能为空');
        return;
      }
      if(this.blobFile==null){
        this.$notify.error('图片不能为空');
        return;
      }
      let formData = new FormData();
      formData.append('name',this.name);
      formData.append('content',this.content);
      formData.append('blobFile',this.blobFile);
      addBlog(formData).then(res => {
        console.log(res)
        if(res.code == 200){
          this.$notify.success('新增成功');
          this.getBlogData();
        }
      });
    },
    selectImg(){
      let _this = this;
      let input=document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('multiple', 'multiple');
      input.accept="image/*";
      input.addEventListener('change',(e)=>{
        toBase64(input.files[0]).then(res => {
          _this.blobFile = res;
          console.log(1,res)
        }).catch(res => {
          console.log('err',res)
        })
        input.remove();
      });
      input.click();
    },
    addImg(data){
      switch (data){
        case 'A':
          this.closeVideo();
          break;
        case 'T':
          this.closeVideo();
          break;
        case 'F':
          this.closeVideo();
          break;
      }
      this.addDia = !this.addDia;
    },
  //  关闭摄像头
    closeVideo(){
      this.nowStream && this.nowStream.stop();
      this.nowStream = null;
    },
  //  打开摄像头
    openIt(){
      let _this = this;
      let videoDom = document.getElementById('getPhoto');
      let constraints = {
        video:{
          width:400,height:300
        },
        auto:true
      };
      navigator.mediaDevices.getUserMedia(constraints)
          .then(function(stream) {
            /* 成功获取媒体流 stream */
            videoDom.srcObject = stream;
            _this.nowStream = stream.getTracks()[0];
            videoDom.play();
          })
          .catch(function(err) {
            /* 处理error */
            _this.$notify.error('video err: '+err);
          });
    },
    shoot(){
      let _this = this;
      let canvas = document.getElementById('drowIt')  // canvas元素
      let context = canvas.getContext('2d')
      let videoDom = document.getElementById('getPhoto');
      context.drawImage(videoDom, 0, 0);
      canvas.toBlob(blob => {		// 将canvas转换为blob
        toBase64(blob).then((data)=>{
          _this.blobFile = data;
        });
      })
    },
  }
}
</script>
<script setup>
const head = JSON.parse(sessionStorage.getItem('userData'));
var loopData = {
  style:{
    height:"100%",
    width:'300px',
    border:'1px solid black',
  },
  step:500,//时长
  isHoverStop:true,//鼠标放入暂停
  data:[
    {
      name:'z',
      type:'c',
      num:'1'
    },
    {
      name:'z',
      type:'c',
      num:'2'
    },
    {
      name:'z',
      type:'c',
      num:'3'
    },
    {
      name:'z',
      type:'c',
      num:'4'
    },
    {
      name:'z',
      type:'c',
      num:'5'
    },
    {
      name:'z',
      type:'c',
      num:'6'
    },
    {
      name:'z',
      type:'c',
      num:'7'
    },
    {
      name:'z',
      type:'c',
      num:'8'
    },
    {
      name:'z',
      type:'c',
      num:'9'
    },
    {
      name:'z',
      type:'c',
      num:'10'
    },
    {
      name:'z',
      type:'c',
      num:'11'
    },
    {
      name:'z',
      type:'c',
      num:'12'
    },
    {
      name:'z',
      type:'c',
      num:'13'
    },
    {
      name:'z',
      type:'c',
      num:'14'
    },
    {
      name:'z',
      type:'c',
      num:'15'
    },
    {
      name:'z',
      type:'c',
      num:'16'
    },
    {
      name:'z',
      type:'c',
      num:'17'
    },
    {
      name:'z',
      type:'c',
      num:'18'
    },
  ]
};
</script>

<style scoped lang="less">
.headBtn{
  height: 100%;
  display: flex;
  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    .item_list::-webkit-scrollbar {
      width: 6px;
      border: 1px solid #c3c3c3;
    }
    .item_list::-webkit-scrollbar-thumb {
      background-color: #c3c3c3;
    }
    .item_list{
      margin-top: 20px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 20px;
      margin-right: 20px;
      .blogItem:nth-child(2n-1){
        margin-right:calc(2% - 4px) ;
      }
      .blogItem:nth-child(1){
        margin-top: 0;
      }
      .blogItem:nth-child(2){
        margin-top: 0;
      }
      .blogItem{
        width: 49% ;
        margin-top: calc(2% - 4px);
        box-shadow: 0 0 3px 3px rgba(0,0,0,0.06);
        border-radius: 6px;
        height: auto ;
        .head_name_time{
          height: 70px;
          width: 100%;
          display: flex;
          align-items: center;
          img{
            height: 52px;
            width: 52px;
            margin: 8px;
            border-radius: 50%;
            box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.1);
          }
          .name_time{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 13px;
            color: #989898;
            height: 50%;
            border-radius: 6px;
            padding: 10px;
            box-shadow: 1px 1px 2px 2px rgba(0,0,0,0.1);
            .name{
              font-size: 16px;
              color: #4e4e4e;
            }
          }
        }
        .content{
          padding-left: 18px ;
          color: #5d5d5d;
          margin: 20px 0;
        }
        .image{
          text-align: center;
          .el-image{
            border:1px solid #008d9d;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.video{
  .getPhotoArea{
    width: 100%;
    height:400px ;
    #getPhoto{
      height: 300px;
      width: auto;
      background-color: #000000;
      margin-right: 20px;
    }
  }
}
.dayly{
  .data{
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 20px;
    align-items: center;
    .label{
      width: 60px;
      text-align: right;
      padding-right: 20px;
    }
    .el-input{
      flex: 1;
    }
    .el-textarea{
      flex: 1;
    }
    .image{
      flex: 1;
      display: flex;
    }
    .select{
      margin-right: 10px;
      height: 100px;
      width: 100px;
      border: 1px dashed #d3d3d3;
      border-radius: 4px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      font-size: 20px;
      color: #d3d3d3;
      position: relative;
      .el-button{
        margin: 0;
        display: none;
      }
      img{
        height: 100%;
        width: 100%;
        border-radius: 4px;
      }
      .elx{
        display: none;
      }
    }
    .select:hover .elx{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      height: 20px;
      width: 20px;
      background-color: #adadad;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;
    }
    .select:hover{
      border: 1px dashed #01c6de;
    }
    .select:hover .el-button{
      display: block;
      animation: look 0.5s;
    }
    @keyframes look{
      0%{
        opacity: 0;
      }
      100%{
        opacity: 1;
      }
    }
    .select:hover .span{
      display: none;
    }
  }
}
@media only screen and (max-width: 1400px){
  .blogItem{
    width: 100% !important;
    margin-top: 20px;
  }
  .blogItem:nth-child(2n-1){
    margin-right: 0 !important;
  }
  .blogItem:nth-child(2){
    margin-top: 20px !important;
  }
}
</style>

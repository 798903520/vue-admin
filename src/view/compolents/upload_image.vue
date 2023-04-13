<template>
  <div class="image">
    <div class="select" v-if="blobFile">
      <span class="elx" @click="clearData">x</span>
      <img :src="baseUrl + blobFile" alt="">
    </div>
    <div class="select" v-if="!blobFile">
      <el-button size="small" @click="selectImg">选择图片</el-button>
      <span class="span"><img
          src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iI2QzZDNkMyIgY2xhc3M9ImJpIGJpLXBsdXMtY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJpY29uLXBsdXMtY2lyY2xlLTI5Ij48cGF0aCBkPSJNOCAxNUE3IDcgMCAxIDEgOCAxYTcgNyAwIDAgMSAwIDE0em0wIDFBOCA4IDAgMSAwIDggMGE4IDggMCAwIDAgMCAxNnoiPjwvcGF0aD48cGF0aCBkPSJNOCA0YS41LjUgMCAwIDEgLjUuNXYzaDNhLjUuNSAwIDAgMSAwIDFoLTN2M2EuNS41IDAgMCAxLTEgMHYtM2gtM2EuNS41IDAgMCAxIDAtMWgzdi0zQS41LjUgMCAwIDEgOCA0eiI+PC9wYXRoPjwvc3ZnPg=="
          alt=""></span>
    </div>
  </div>
</template>

<script setup>
import { ref,nextTick } from 'vue';
import http from '../../providers/http';
import { toBase64 } from '../../js/jsFun';
import { ElNotification } from 'element-plus'


let props = defineProps(['imgPath']);
let emits = defineEmits(['imgPath']);
// 选择的图片
let baseUrl = import.meta.env.VITE_APP_BASE_API;
let blobFile = ref('');
blobFile.value = props.imgPath;
console.log('props.imgPath',props);
function selectImg() {
  let input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('multiple', 'multiple');
  input.accept = "image/*";
  input.addEventListener('change', (e) => {
    toBase64(input.files[0]).then(res => {
      let formData = new FormData();
      formData.append('blobFile', res);
      http.post('/upload/uploadImg', formData).then(res => {
        if (res.code == 200) {
          blobFile.value = res.data;
          emits('imgPath',blobFile.value);
        } else {
          ElNotification({
            type: 'error',
            message: '图片上传出错,请联系管理员!'
          });
        }
      });
    }).catch(res => {
      console.log('err', res)
    })
    input.remove();
  });
  input.click();
};

function clearData(){
  blobFile.value = '';
  emits('imgPath',blobFile.value);
}
</script>

<style lang="less" scoped>
.image {
  flex: 1;
  display: flex;
}

.select {
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
  background-color: #f5f5f5;

  .el-button {
    margin: 0;
    display: none;
  }

  img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }

  .elx {
    display: none;
  }
}

.select:hover .elx {
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

.select:hover {
  border: 1px dashed #01c6de;
}

.select:hover .el-button {
  display: block;
  animation: look 0.5s;
}

@keyframes look {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.select:hover .span {
  display: none;
}</style>
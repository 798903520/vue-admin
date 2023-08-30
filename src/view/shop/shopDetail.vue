<template>
  <div class="detail_content">
    <div class="top">
      <div class="left_name">
        <img :src="baseUrl+goodsData.imgPaths" alt="" class="left_icon">
        <a href="">{{goodsData.p_b_id}}</a>
      </div>
      <div class="right_contact">
        <div class="btn">
          <svg t="1693365483298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4339" width="200" height="200"><path d="M632.832 69.632H391.168C189.44 69.632 25.6 233.472 25.6 435.2v6.656c0 194.048 152.064 353.28 343.552 365.056v95.744c0 19.456 10.752 36.864 28.16 45.568 7.168 3.584 15.36 5.632 23.04 5.632 10.752 0 21.504-3.584 30.208-9.728l184.832-136.192c200.192-1.536 363.008-164.864 363.008-365.568v-6.656c0-201.728-163.84-366.08-365.568-366.08z m263.168 372.736c0 145.408-118.272 263.168-263.168 263.168h-13.824c-10.752 0-21.504 3.584-30.208 9.728l-117.248 86.016v-45.056c0-28.16-23.04-51.2-51.2-51.2h-29.184c-145.408 0-263.168-118.272-263.168-263.168v-6.144c0-145.408 118.272-263.168 263.168-263.168h241.152c145.408 0 263.168 118.272 263.168 263.168v6.656z" fill="#707070" p-id="4340"></path><path d="M332.288 438.784m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" fill="#707070" p-id="4341"></path><path d="M512 438.784m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" fill="#707070" p-id="4342"></path><path d="M691.712 438.784m-51.2 0a51.2 51.2 0 1 0 102.4 0 51.2 51.2 0 1 0-102.4 0Z" fill="#5670f1" p-id="4343"></path></svg>
          <span>联系客服</span>
        </div>
        <div class="btn">
          <svg t="1693365594520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7413" width="200" height="200"><path d="M958.4 361.6c-5.6-18.4-47.2-119.2-56-139.2-0.8-0.8-0.8-1.6-1.6-3.2l-5.6-10.4c-26.4-53.6-61.6-126.4-149.6-116.8H264.8c-92-10.4-131.2 75.2-154.4 126.4l-0.8 2.4c-0.8 1.6-1.6 3.2-2.4 5.6-4 12.8-38.4 122.4-44 140.8-14.4 53.6-4 108.8 31.2 154.4 0 2.4-0.8 4.8-0.8 7.2v256.8c0 89.6 72.8 162.4 162.4 162.4h513.6c89.6 0 162.4-72.8 162.4-162.4V538.4l0.8-0.8c35.2-48.8 45.6-115.2 25.6-176zM156 392.8c3.2-12 26.4-86.4 41.6-134.4 26.4-57.6 38.4-72.8 57.6-70.4 2.4 0 4 0.8 6.4 0.8h488.8c2.4 0 4 0 6.4-0.8 16.8-2.4 25.6 5.6 53.6 63.2l4.8 9.6c23.2 56.8 48.8 120.8 52 130.4 10.4 32 5.6 65.6-12.8 90.4-17.6 24-44.8 36.8-76.8 36.8-18.4 0-44.8-19.2-65.6-34.4-5.6-4-10.4-8-16-11.2-17.6-12.8-41.6-11.2-58.4 2.4-24.8 20.8-65.6 44-104 43.2-40-0.8-80.8-22.4-105.6-43.2-8.8-7.2-20-11.2-30.4-11.2-9.6 0-19.2 3.2-27.2 8.8-4.8 3.2-10.4 7.2-16 11.2-20.8 15.2-47.2 34.4-65.6 34.4-46.4 0-92-21.6-117.6-54.4-16.8-22.4-22.4-46.4-15.2-71.2z m613.6 458.4H256c-36.8 0-66.4-29.6-66.4-66.4V594.4c30.4 12.8 64.8 20 98.4 20 43.2 0 79.2-21.6 108.8-43.2 31.2 20 79.2 42.4 135.2 43.2h2.4c55.2 0 103.2-23.2 133.6-43.2 29.6 20.8 65.6 43.2 108.8 43.2 20 0 40-3.2 58.4-8.8v180c0 36-29.6 65.6-65.6 65.6z" p-id="7414" fill="#707070"></path></svg>
          <span>进入店铺</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left_imglist">
        <div class="img_out">
          <img id="goods_img" :src="baseUrl+goodsData.imgPaths" alt="">
          <span class="move"></span>
          <div class="fangda">
            <img :src="baseUrl+goodsData.imgPaths" alt="">
          </div>
        </div>
        <div class="list"></div>
      </div>
      <div class="right_details">
        <span class="good_name">{{goodsData.name}}</span>
        <span class="good_content">{{goodsData.content}}</span>
      </div>
    </div>
    <div id="webgl">
    </div>
  </div>


</template>


<script setup>
import * as THREE from '../../../public/js/three.module.js';
// import {OBJLoader} from '../../../public/js/OBJLoader.js';
// import {MTLLoader} from '../../../public/js/MTLLoader.js';
import { nextTick, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toBase64 } from '../../js/jsFun';
import imgdata from './home-list-blue-position.png'
import http from '../../providers/http';



const baseUrl = import.meta.env.VITE_APP_BASE_API;


async function draw() {
  // 初始化一个场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( '#b5b7b7' );
  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(50, 50, 50);

  // let objLoader = new OBJLoader();
  // let mtlLoader  = new MTLLoader();

  // mtlLoader.load('/3D/Blank.mtl', function(materials) {
  // // 返回一个包含材质的对象MaterialCreator
  // //obj的模型会和MaterialCreator包含的材质对应起来
  // objLoader.setMaterials(materials);
  // objLoader.load('/3D/Blank.obj', function(obj) {
  //   obj.scale.set(10, 10, 10); //放大obj组对象
  //   scene.add(obj);//返回的组对象插入场景中
  // })
  // })

  //纹理贴图加载器TextureLoader
  const texLoader = new THREE.TextureLoader();
  texLoader.crossOrigin = 'anonymous'
  let dd = await http.get('/upload/getImg?img='+goodsData.value.imgPaths);
  const texture = texLoader.load('data:image/png;base64,'+dd);
  //创建一个材质对象Material
  const material = new THREE.MeshLambertMaterial({
    // color: 0xff0000,//0xff0000设置材质颜色为红色
    transparent: true,//开启透明
    // opacity: 1,//设置透明度
    // wireframe:true,
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(200, 200, 200);
  scene.add(mesh);

  const xyz = new THREE.AxesHelper(250);
  scene.add(xyz);

  //点光源：两个参数分别表示光源颜色和光照强度
  // 参数1：0xffffff是纯白光,表示光源颜色
  // 参数2：1.0,表示光照强度，可以根据需要调整
  const pointLight = new THREE.AmbientLight(0xffffff, 1.0);
  pointLight.position.set(400, 400, 400);//点光源放在x轴上
  scene.add(pointLight); //点光源添加到场景中




  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera();
  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(260, 260, 260);
  //相机观察目标指向Threejs 3D空间中某个位置
  camera.lookAt(0, 0, 0); //坐标原点

  // 定义相机输出画布的尺寸(单位:像素px)
  const width = 800; //宽度
  const height = 500; //高度




  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();
  // 定义threejs输出画布的尺寸(单位:像素px)
  const width1 = 800; //宽度
  const height1 = 500; //高度
  renderer.setSize(width1, height1); //设置three.js渲染区域的尺寸(像素px)
  let data = 0;
  function anu() {
    requestAnimationFrame(anu);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    // mesh.rotation. += 0.01;
    renderer.render(scene, camera); //执行渲染操作
  }
  anu();
  nextTick(() => {
    document.getElementById('webgl').appendChild(renderer.domElement);
  });
}

/**
  * 获取商品数据
  */
onMounted(() => {
  getGoodsData();
});
const router = useRouter();
const goods_id = router.currentRoute.value.params.id;
const goodsData = ref({});
function getGoodsData() {
  http.get('/table/get_p_Data?product_id=' + goods_id).then(res => {
    if (res.code == 200) {
      goodsData.value = res.data;
      goodsData.value.imgPaths = goodsData.value.imgPaths.split(',');
      // draw();
      listen_mouse();
    } else {
      console.log('error: ', res.msg);
    }
  });
}


//绑定 dom事件
function listen_mouse(){
  let img_dom = document.getElementById('goods_img');
  let rate = (800/350).toFixed(1);

  //移入
  img_dom.addEventListener('mouseenter',(e)=>{
    let ddom = document.getElementsByClassName('img_out')[0];
    ddom.style.setProperty('--move-width','200px');
    ddom.style.setProperty('--move-height','200px');
    ddom.style.setProperty('--show-fangda','block');
  });
  //移出
  img_dom.addEventListener('mouseleave',(e)=>{
    let ddom = document.getElementsByClassName('img_out')[0];
    ddom.style.setProperty('--move-width','0px');
    ddom.style.setProperty('--move-height','0px');
    ddom.style.setProperty('--show-fangda','none');
  });
  //在图片内移动
  img_dom.addEventListener('mousemove',(e)=>{
    let ddom = document.getElementsByClassName('img_out')[0];
    if(e.offsetX>=100&&e.offsetX<=350){
      ddom.style.setProperty('--move-left',(e.offsetX-100)+'px');
      ddom.style.setProperty('--fangda-left',-((e.offsetX-100)*rate)+'px');
    }
    if(e.offsetY>=100&&e.offsetY<=350){
      ddom.style.setProperty('--move-top',(e.offsetY-100)+'px');
      ddom.style.setProperty('--fangda-top',-((e.offsetY-100)*rate)+'px');
    }
  });
}
</script>

<style lang="less" scoped>
.detail_content{
  width: 1200px;
  height: auto;
  margin: 20px auto;
  .top{
    height: 68px;
    padding: 12px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 50px;
    .left_name{
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      a{
        color: black;
      }
    }
    .left_icon{
      height: 68px;
      width: 68px;
      background-color: rgba(76, 130, 232, 0.8);
      border-radius: 40px;
      margin-right: 12px;
    }


    .right_contact{
      display: flex;
      height: 100%;
      align-items: center;

      .btn{
        display: flex;
        font-size: 13px;
        padding: 8px 12px;
        border-radius: 40px;
        border: 1px solid #c0c0c0;
        align-items: center;
        margin-right: 12px;
      }
      svg{
        height: 20px;
        width: 20px;
        margin-right: 8px;
      }
    }
  }




  .content{
    width: 100%;
    height: auto;
    display: flex;
    margin-top: 20px;
    background-color: white;
    border-radius: 40px;
    .left_imglist{
      width: auto;
      height: auto;
      .img_out{
        width: 450px;
        height: 450px;
        margin: 16px;
        border-radius: 20px;
        background-color: whitesmoke;
        position: relative;
      }
      img{
        width: 450px;
        height: 450px;
        user-select:none ;
        -webkit-user-drag: none;
        margin: 0 auto;
      }
        --move-width:0px;
        --move-height:0px;
        --move-left:0px;
        --move-top:0px;
      --show-fangda:none;

      --fangda-top:0;
      --fangda-left:0;
      .move{
        user-select: none;
        display: block;
        pointer-events: none;
        width: var(--move-width);
        height: var(--move-height);
        position: absolute;
        left: var(--move-left);
        top: var(--move-top);
        background-size: 6px 6px;
        background-image: radial-gradient(#000 25%, transparent 0);
      }

      .fangda{
        width: 450px;
        display: var(--show-fangda);
        height: 450px;
        overflow: hidden;
        position: absolute;
        left: 460px;
        top: 0;
        background-color: #f5f5f5;
        img{
          height: 1000px;
          width: 1000px;
          top: var(--fangda-top);
          left:var(--fangda-left) ;
          position: absolute;
        }
      }
      .list{

      }
    }
    .right_details{
      flex: 1;
      padding: 16px;
      .good_name,.good_content{
        font-size: 22px;
        font-weight: bold;

      }
    }
  }
}
</style>

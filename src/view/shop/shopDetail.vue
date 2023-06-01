<template>
  <div id="webgl"></div>
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
      draw();
    } else {
      console.log('error: ', res.msg);
    }
  });
}
</script>

<style lang="less" scoped></style>
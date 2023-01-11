<template>
  <div class="login">
  <div class="content">
    <div class="background"></div>
    <el-input class="input1" v-model="login.name" placeholder="输入用户名"></el-input>
    <el-input class="input2" type="password" show-password v-model="login.psw" placeholder="输入密码"></el-input>
    <el-button @click="login1" type="primary">点击登录</el-button>
  </div>
  </div>
</template>

<script>
import {login} from "../api/index.js"
export default {
  data(){
    return{
      login:{
        psw:"zhangc",
        name:"zhangc"
      }
    }
  },
  //进入组件
  activated() {
  },
  created(){
  },
  methods: {
    // 登录
    login1(){
      login(this.login).then(res => {
        if(res.code == 200){
          sessionStorage.setItem('MyToken',res.token);
          this.$notify.success(res.msg);
          this.$router.push('/');
        }else{
          this.$notify.error(res.msg);
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
  .login{
    height: 100%;
    width: 100%;
    position: relative;
    background-image: url('../assets/img/Snipaste.png');
    background-position: center;
    background-size: cover;
    .content{
      min-width: 300px;
      min-height: 250px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .background{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        border-radius: 20px;
        backdrop-filter:blur(10px);
        animation: background1 1s ;
      }
      @keyframes background1 {
        0%{
          opacity: 0;
        }
        100%{
          opacity: 1;
        }
      }
      .el-input{
        margin: 10px 0;
        width: 200px;
        z-index: 1;
      }
      .input1{
        animation: input1 333ms;
      }
      @keyframes input1 {
        0%{
          margin-left: 60px;
          opacity: 0;
        }
        100%{
          margin-left: 0px;
          opacity: 1;
        }
      }
      .input2{
        animation: input2 666ms;
      }
      @keyframes input2 {
        0%{
          margin-left: 30px;
          opacity: 0;
        }
        100%{
          margin-left: 0px;
          opacity: 1;
        }
      }
      .el-button{
        width: 200px;
        margin: 10px 0;
        z-index: 1;
        animation: btn 999ms;
      }
      @keyframes btn {
        0%{
          margin-left: 90px;
          opacity: 0;
        }
        100%{
          margin-left: 0px;
          opacity: 1;
        }
      }
    }
  }
</style>

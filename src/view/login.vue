<template>
  <div class="login">
    <div class="boll01"></div>
    <div class="boll02"></div>
    <div class="boll03"></div>
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
  data() {
    return {
      login: {
        psw: "zhangc",
        name: "zhangc"
      },
      backUrl: ''
    }
  },
  //进入组件
  activated() {
  },
  created() {
  },
  mounted() {
    this.backUrl = this.$route.query.backUrl;
  },
  methods: {
    // 登录
    login1() {
      login(this.login).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem('MyToken', res.token);
          sessionStorage.setItem('userData', JSON.stringify({
            userName: res.data.userName,
            imgPath: res.data.imgPath,
            permission: res.data.permission
          }));
          this.$notify.success(res.msg);
          if (res.data.permission == 'root') {
            this.$router.push('/index');
          } else {
            this.$router.push(this.backUrl);
          }
        } else {
          this.$notify.error(res.msg);
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  position: relative;
  //background-color: whitesmoke;
  background-image: linear-gradient(220deg, #ffffff 0%, #fab2b2 50%, #6767da 50%, #000000 100%);

  .boll01 {
    height: 25vh;
    width: 25vh;
    background-color: #e92fef;
    border-radius: 13vh;
    position: absolute;
    top: 55%;
    left: 40%;
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
    animation: move1 4s ease-in-out alternate infinite;
    animation-delay: 1s;
  }

@keyframes move1 {
  0% {
    top: 55%
  }

  100% {
    top: 50%
  }
}

  .boll02 {
    height: 20vh;
    width: 20vh;
    background-color: #03d5b6;
    border-radius: 10vh;
    position: absolute;
    top: 35%;
    left: 35%;
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
    animation: move2 4s ease-in-out alternate infinite;
    animation-delay: 2s;
  }
  @keyframes move2 {
    0% {
      top: 35%
    }

    100% {
      top: 30%
    }
  }

  .boll03 {
    height: 22vh;
    width: 22vh;
    background-color: #ff9c98;
    border-radius: 11vh;
    position: absolute;
    top: 30%;
    left: 50%;
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);
    animation: move3 4s ease-in-out alternate infinite;
    animation-delay: 3s;
  }
  @keyframes move3 {
    0% {
      top: 30%
    }

    100% {
      top: 25%
    }
  }

  .content {
    min-width: 300px;
    min-height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 30px 5px rgba(0, 0, 0, 0.1);

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      animation: background1 1s;
    }

    @keyframes background1 {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .el-input {
      margin: 10px 0;
      width: 200px;
      z-index: 1;
    }

    .input1 {
      animation: input1 333ms;
    }

    @keyframes input1 {
      0% {
        margin-left: 60px;
        opacity: 0;
      }
      100% {
        margin-left: 0px;
        opacity: 1;
      }
    }

    .input2 {
      animation: input2 666ms;
    }

    @keyframes input2 {
      0% {
        margin-left: 30px;
        opacity: 0;
      }
      100% {
        margin-left: 0px;
        opacity: 1;
      }
    }

    .el-button {
      width: 200px;
      margin: 10px 0;
      z-index: 1;
      animation: btn 999ms;
    }

    @keyframes btn {
      0% {
        margin-left: 90px;
        opacity: 0;
      }
      100% {
        margin-left: 0px;
        opacity: 1;
      }
    }
  }
}
</style>

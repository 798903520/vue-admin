<template>
  <div class="singleExample">
    <baseType :wordCode="leftWord" />
  </div>
</template>

<script setup>
import baseType from './1typeTemplate.vue'

const leftWord = 
`class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
 }
 LoginForm.getInstance = (function () {
     let instance
     return function () {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
     }
 })()

let obj1 = LoginForm.getInstance()
obj1.show()

// let obj2 = LoginForm.getInstance()
// obj2.hide()

console.log(obj1 === obj2)`;

</script>

<style lang="less" scoped>
.singleExample{
  width: 100%;
  height: 100%;
}

</style>
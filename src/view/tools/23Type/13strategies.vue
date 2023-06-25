<template>
  <div class="strategies">
    <baseType :wordCode="leftWord" />
  </div>
</template>

<script setup>
import baseType from './1typeTemplate.vue'

const leftWord = 
`
// <html>
// <head>
//     <title>策略模式-校验表单</title>
//     <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
// </head>
// <body>
//     <form id = "registerForm" method="post" action="http://xxxx.com/api/register">
//         用户名：<input type="text" name="userName">
//         密码：<input type="text" name="password">
//         手机号码：<input type="text" name="phoneNumber">
//         <button type="submit">提交</button>
//     </form>
//         // 策略对象
//         const strategies = {
//           isNoEmpty: function (value, errorMsg) {
//             if (value === '') {
//               return errorMsg;
//             }
//           },
//           isNoSpace: function (value, errorMsg) {
//             if (value.trim() === '') {
//               return errorMsg;
//             }
//           },
//           minLength: function (value, length, errorMsg) {
//             if (value.trim().length < length) {
//               return errorMsg;
//             }
//           },
//           maxLength: function (value, length, errorMsg) {
//             if (value.length > length) {
//               return errorMsg;
//             }
//           },
//           isMobile: function (value, errorMsg) {
//             if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
//               return errorMsg;
//             }                
//           }
//         }
        
//         // 验证类
//         class Validator {
//           constructor() {
//             this.cache = []
//           }
//           add(dom, rules) {
//             for(let i = 0, rule; rule = rules[i++];) {
//               let strategyAry = rule.strategy.split(':')
//               let errorMsg = rule.errorMsg
//               this.cache.push(() => {
//                 let strategy = strategyAry.shift()
//                 strategyAry.unshift(dom.value)
//                 strategyAry.push(errorMsg)
//                 return strategies[strategy].apply(dom, strategyAry)
//               })
//             }
//           }
//           start() {
//             for(let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
//               let errorMsg = validatorFunc()
//               if (errorMsg) {
//                 return errorMsg
//               }
//             }
//           }
//         }

//         // 调用代码
//         let registerForm = document.getElementById('registerForm')

//         let validataFunc = function() {
//           let validator = new Validator()
//           validator.add(registerForm.userName, [{
//             strategy: 'isNoEmpty',
//             errorMsg: '用户名不可为空'
//           }, {
//             strategy: 'isNoSpace',
//             errorMsg: '不允许以空白字符命名'
//           }, {
//             strategy: 'minLength:2',
//             errorMsg: '用户名长度不能小于2位'
//           }])
//           validator.add(registerForm.password, [ {
//             strategy: 'minLength:6',
//             errorMsg: '密码长度不能小于6位'
//           }])
//           validator.add(registerForm.phoneNumber, [{
//             strategy: 'isMobile',
//             errorMsg: '请输入正确的手机号码格式'
//           }])
//           return validator.start()
//         }

//         registerForm.onsubmit = function() {
//           let errorMsg = validataFunc()
//           if (errorMsg) {
//             alert(errorMsg)
//             return false
//           }
//         }
// </body>
// </html>
`;

</script>

<style lang="less" scoped>
.strategies{
  width: 100%;
  height: 100%;
}

</style>
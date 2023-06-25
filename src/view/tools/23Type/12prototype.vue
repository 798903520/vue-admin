<template>
  <div class="prototype">
    <baseType :wordCode="leftWord" />
  </div>
</template>

<script setup>
import baseType from './1typeTemplate.vue'

const leftWord = 
`class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
class Student extends Person {
  constructor(name) {
    super(name)
  }
  sayHello() {
    console.log('Hello， My name is ' +this.name)
  }
}

let student = new Student("xiaoming")
student.sayHello()`;

</script>

<style lang="less" scoped>
.prototype{
  width: 100%;
  height: 100%;
}

</style>
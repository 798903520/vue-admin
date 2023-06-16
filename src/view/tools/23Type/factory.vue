<template>
  <div class="factoryAll">
    <baseType :wordCode="leftWord" />
  </div>
</template>

<script setup>
import baseType from './1typeTemplate.vue'

const leftWord = `
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log('init')
        return 'init';
    }
    fun() {
        console.log('fun')
        return 'fun'
    }
}

class Factory {
    create(name) {
        return new Product(name)
    }
}

// use
let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()
`;

</script>

<style lang="less" scoped>
.factoryAll{
  width: 100%;
  height: 100%;
}

</style>
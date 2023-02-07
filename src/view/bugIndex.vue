<template>

</template>

<script>
import {getBili} from '../api/index'
export default {
  name: "bugIndex",
  mounted() {
    this.getBiliData()
  },
  methods:{
    getBiliData(){
      getBili({bug:'1'}).then(res => {
        console.log(res)
      })
    },
  }
}
</script>

<style scoped>

</style>

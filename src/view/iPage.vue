<template>
  <div id="name">
    <div class="firstPage">
      <div class="nath two">
        <a href="/">TDom</a>
      </div>
      <div class="num">321</div>
    </div>
  </div>

</template>

<script>
import {render, getVNode} from '../js/jsFun.js'

export default {
  name: "iPage",
  data() {
    return {}
  },
  mounted() {
    this.createdAnfont();
  },
  methods: {
    createdAnfont() {
      let TDom = document.getElementsByClassName('firstPage')[0]
      let copyDom = getVNode(TDom);
      let parent = document.getElementById('name')
      parent.appendChild(render(copyDom))
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="div_404">
    <span>404&nbsp;not&nbsp;found&nbsp;!</span>
  </div>
</template>

<script>
export default {
  name: 'VueAdmin404',

  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.div_404{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 10vw;
  font-weight: bold;
  //letter-spacing: -1vw;
  filter: contrast(100);
  color: white;
  background-color: black;
  span{
    filter: blur(8px);
  }
}

</style>

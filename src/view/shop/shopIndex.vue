<template>
  <div class="shop_bg">
    <div class="header">
      <div class="head_content">
        <div class="left_btn">
          <span>请登录</span>
          <span>免费注册</span>
          <span>手机逛网站</span>
        </div>
        <div class="right_btn">
          <span>我的</span>
          <span>购物车</span>
          <span>收藏夹</span>
          <span>商品分类</span>
          <span>联系客服</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueAdminShopIndex',

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
.shop_bg{
  background-color: #eae8eb;
  min-height: 100vh;
}
  .header{
    height: 36px;
    width: 100%;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    font-weight: lighter;
    .head_content{
      height: 36px;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    justify-content: space-between;
    .left_btn > span{
      margin-right: 20px;
    }
    .right_btn > span{
      margin-left: 20px;
    }
    span:hover{
      color: #FF4400;
      cursor: pointer;
    }
    }
  }

</style>
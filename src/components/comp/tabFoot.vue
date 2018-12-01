<template>
  <mt-tabbar fixed class="tabbar">
    <router-link to="/index" active-class="active">
      <mt-tab-item id="home">
        <i slot="icon" class="icon icon-index"></i>
        <!--首页-->
      </mt-tab-item>
    </router-link>
    <router-link to="/classify/0/0" active-class="active">
      <mt-tab-item id="classify">
        <i slot="icon" class="icon icon-classify"></i>
        <!--分类-->
      </mt-tab-item>
    </router-link>
    <router-link to="/shopCar" active-class="active">
      <mt-tab-item id="shop">
        <i slot="icon" class="icon icon-shop-car"></i>
        <!--购物车-->
      </mt-tab-item>
    </router-link>
    <router-link to="/my" active-class="active" >
      <mt-tab-item id="my">
        <i slot="icon" class="icon icon-my"></i>
        <!--我的-->
      </mt-tab-item>
    </router-link>
  </mt-tabbar>
</template>
<style lang="less" scoped>
  .tabbar{
    justify-content: space-around;
    padding: .1rem 0;
    height: .6rem;
  }
  .mint-tab-item{
    padding-bottom:.05rem!important;
    padding-top: 0rem!important;
  }
</style>


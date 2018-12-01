<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>购物积分
      <div class="assets-icon shop-integral-icon">
        <i class="icon icon-x-integral-white"></i>
      </div>
    </div>
    <div class="assets-container">
      <div class="assets-head shop-integral-head">
        <div class="assets-head-center">
          <p class="assets-integral-txt">总购物积分</p>
          <h1 class="assets-integral-num">{{total}}</h1>
        </div>
        <div class="assets-others">
          <p>累计使用：<span>{{haveUse}}</span></p>
        </div>
      </div>
      <div class="assets-conversion-container">
        <h1 class="assets-conversion-title">购物记录 <router-link to="/shopIntegralIncome"><span>收入记录 >></span></router-link></h1>
        <p class="assets-conversion-month" v-for="(hi, index) in shopIntegralMonth" :key="index" @click="goDetail(hi.times)">
          <span>{{hi.times}}</span>
          <span>共<b>{{hi.total_money}}</b><i class="icon icon-right"></i></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "shop-integral",
    data () {
      return {
        shopIntegralMonth: [],
        total: '',
        haveUse: ''
      }
    },
    methods: {
      goDetail (m) {
        this.$router.push({path:'/integralDetailList/'+ m +'/1'})
      }
    },
    created () {
      this.total = this.$route.params.num;
      api.shopIntegral()
        .then(res => {
          if (res.code === 200) {
            this.haveUse = res.total
            this.shopIntegralMonth = res.data;
          } else {
            Toast(res.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/assets";
</style>

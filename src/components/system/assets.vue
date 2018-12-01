<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>资产
      <div class="assets-icon">
        <i class="icon icon-x-integral-white">
        </i><i class="icon icon-y-integral-white"></i>
      </div>
    </div>
    <div class="assets-container">
      <div class="assets-head">
        <div class="assets-head-center">
          <p class="assets-integral-txt">总资产</p>
          <h1 class="assets-integral-num">{{available}}</h1>
        </div>
        <div class="assets-others">
          <router-link to=""><div>
            <p>已转化</p>
            <h3>{{haveConversionIntegralTotal}}</h3>
          </div></router-link>
          <router-link :to="{path:'useable/'+usable+''}"><div>
            <p>可用积分</p>
            <h3>{{usable}}</h3>
          </div></router-link>
          <router-link :to="{path:'shopIntegral/'+shop+''}"><div>
            <p>购物积分</p>
            <h3>{{shop}}</h3>
          </div></router-link>
        </div>
      </div>
      <div class="assets-conversion-container">
        <h1 class="assets-conversion-title">转化记录</h1>
        <p class="assets-conversion-month" v-for="(hi, index) in haveConversionIntegralMonth" :key="index" @click="goDetail(hi.times)">
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
    name: "assets",
    data () {
      return {
        available: '',
        shop: '',
        usable: '',
        haveConversionIntegralTotal: '',
        haveConversionIntegralMonth: [],
        page: 1,
      };
    },
    methods: {
      goDetail (m) {
        this.$router.push({path:'/integralDetailList/'+ m +'/0'})
      }
    },
    created () {
      api.availableIntegral()
        .then(res => {
          if (res.code === 200) {
            this.available = res.data.consumption_points
            this.shop = res.data.shop_points
            this.usable =  res.data.ready_points
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err)
        })
      api.haveConversionIntegral(this.page)
        .then(res => {
          if (res.code === 200) {
            this.haveConversionIntegralTotal = res.total
            this.haveConversionIntegralMonth = res.data
          } else {
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/assets";
</style>

<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>可用积分
      <div class="assets-icon shop-integral-icon">
        <i class="icon icon-y-integral-white"></i>
      </div>
    </div>
    <div class="assets-container">
      <div class="assets-head shop-integral-head">
        <div class="assets-head-center">
          <p class="assets-integral-txt">总可用积分</p>
          <h1 class="assets-integral-num">{{total}} <button @click="withdraw">提现</button></h1>
        </div>
        <div class="assets-others">
          <p>累计使用：<span>{{haveUse}}</span></p>
        </div>
      </div>
      <div class="assets-conversion-container">
        <div class="assets-record" @click="goDetail(0)">
          <p><i class="icon icon-consumeRecord"></i><span>消费记录</span></p><i class="icon icon-right"></i>
        </div>
        <router-link to="/withdrawRecord">
          <div class="assets-record">
            <p><i class="icon icon-withdrawRecord"></i><span>提现记录</span></p><i class="icon icon-right"></i>
          </div>
        </router-link>
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
        total: '',
        haveUse: ''
      }
    },
    methods: {
      goDetail (m) {
        this.$router.push({path:'/integralDetailList/'+ m +'/2'})
      },
      withdraw () {
        this.$router.push('/withdraw')
      }
    },
    created () {
      this.total = this.$route.params.num;
      api.useAbleIntegral(1)
        .then(res => {
          if (res.code === 200){
            this.haveUse = res.total
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

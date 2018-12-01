<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>购物积分收入记录
    </div>
    <div class="hc-container">
      <div class="hc-list" v-for="(hc, index) in siiList" :key="index">
        <p class="hc-time"><span>{{hc.mark}}</span><span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span></span><span> +{{hc.money}}</span></p>
      </div>
      <div class="container-no-data" v-if="isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">您还没有此项列表数据</p>
      </div>
      <p class="add-more" v-if="isMore" @click="addM">点击加载更多</p>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "shop-integral-income",
    data () {
      return {
        page: 1,
        siiList: [],
        isMore: false,
        isNo: false,
      }
    },
    methods: {
      addM () {

      }
    },
    created () {
      api.shopIntegralIncome(this.page)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.isNo = true;
              this.isMore = false;
            } else if (res.data.length < 9) {
              this.isNo = false;
              this.isMore = false;
              this.siiList = res.data;
            } else {
              this.isNo = false;
              this.isMore = true;
              this.siiList = res.data;
            }
          } else {
            Toast(res.msg)
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/haveConversion";
</style>

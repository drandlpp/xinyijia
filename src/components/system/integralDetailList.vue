<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{title}}
    </div>
    <div class="hc-container">
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===0">
        <p class="hc-time"><span>{{hc.mark}}</span><span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span></span><span> +{{hc.money}}</span></p>
      </div>
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===1">
        <p class="hc-time"><span>{{hc.subject}}</span> <span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num hc-num-sp"><span class="hc-order-sn">订单编号：<i>{{hc.order_sn}}</i></span><span class="hc-order-num">- <i>{{hc.total_point}}</i></span></p>
      </div>
      <div class="hc-list" v-for="(hc, index) in hcList" :key="index" v-if="type===2">
        <p class="hc-aaa"><span>订单编号：</span><span>{{hc.order_sn}}</span></p>
        <p class="hc-time"><span class="hc-sub">{{hc.subject}}</span> <span class="hc-time-txt">{{hc.created_at}}</span></p>
        <p class="hc-num"><span class="hc-order-sn">消费数值：</span><span class="hc-order-num">- <i>{{hc.total_point}}</i></span></p>
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
    name: "have-conversion",
    data () {
      return {
        params: this.$route.params.m,
        year: (this.$route.params.m).split('-')[0],
        month: (this.$route.params.m).split('-')[1],
        hcList: [],
        title:'',
        type: parseInt(this.$route.params.t),
        isNo: false,
        isMore: false,
        page: 1,
      }
    },
    methods: {
      addM () {
        this.page += 1;
        api.useAbleIntegral(this.page)
          .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.isMore = false;
              Toast('没有哦更多了');
            } else {
              for (var i in res.data){
                this.list.push((res.data[i]));
              }
            }
          } else {
            Toast(res.msg)
          }
        })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created () {
      let tId = parseInt(this.$route.params.t)
      switch (tId) {
        case 0:
          this.title = ''+(this.$route.params.m).split('-')[0]+'年'+(this.$route.params.m).split('-')[1]+'月转化列表'
          api.haveConversionIntegralDay(this.params)
            .then(res => {
                if (res.code === 200) {
                  if (res.data.length === 0) {
                    this.isNo = true;
                  } else {
                    this.isNo = false;
                    this.hcList = res.data;
                  }
                } else {
                  Toast(res.msg)
                }
            })
            .catch(err => {
              console.log(err)
            })
          break;
        case 1:
          this.title = ''+(this.$route.params.m).split('-')[0]+'年'+(this.$route.params.m).split('-')[1]+'月购物积分消费列表'
          api.shopIntegralDay(this.params)
            .then(res => {
              // this.hcList = res.data;
              if (res.code === 200) {
                if (res.data.length === 0) {
                  this.isNo = true;
                } else {
                  this.isNo = false;
                  this.hcList = res.data;
                }
              } else {
                Toast(res.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
          break;
        case 2:
          this.title = '可用积分消费记录';
          api.useAbleIntegral(1)
            .then(res => {
              // this.hcList = res.data;
              if (res.code === 200) {
                if (res.data.length === 0) {
                  this.isNo = true;
                  this.isMore = false;
                } else if (res.data.length < 9) {
                  this.isNo = false;
                  this.isMore = false;
                  this.hcList = res.data;
                } else {
                  this.isNo = false;
                  this.isMore = true;
                  this.hcList = res.data;
                }
              } else {
                Toast(res.msg)
              }
            })
            .catch(err => {
              console.log(err)
            });
          break;
      }
      /**/
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/haveConversion";
</style>

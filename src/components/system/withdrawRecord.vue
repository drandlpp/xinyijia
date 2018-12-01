<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>提现记录
    </div>
    <div class="wdr-container">
      <div class="wdr-center">
        <ul v-if="!isNo">
          <li v-for="(wl, index) in list" :key="index">
            <div class="wdr-card-img">
              <img :src="imgUrl+wl.bank_card.logo.bank_logo" alt="">
            </div>
            <div class="wdr-info">
              <p class="wdr-info-card"><span class="wic-name">{{wl.bank_card.bank}}（<i>{{wl.bank_card.card}}</i>）</span><span class="wic-num"><b>-{{wl.money}}</b></span></p>
              <p class="wdr-info-cost">
                <span class="wic-cost">手续费：{{wl.handling_fee}} 积分</span>
                <span class="wic-status">
                  <i class="wic-pass" v-if="wl.status === 1">已到账</i>
                  <i class="wic-wait" v-if="wl.status === 0">待审核</i>
                  <i class="wic-reject" v-if="wl.status === 2">已驳回</i>
                </span>
              </p>
              <p class="wdr-time">{{wl.created_at}}</p>
              <p></p>
              <p></p>
            </div>
          </li>
        </ul>
        <div class="container-no-data" v-if="isNo">
          <img src="../../assets/images/no_data.png" alt="">
          <p class="no-data-txt2">您还没有此项列表数据</p>
        </div>
        <p class="add-more" v-if="isMore" @click="addWic">点击加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "withdraw-record",
    data () {
      return{
        list: [],
        imgUrl: imgUrl,
        isNo: false,
        page: 1,
        isMore: false
      }
    },
    methods: {
      addWic () {
        this.page += 1;
        api.withdrawRecord(this.page)
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
      api.withdrawRecord(this.page)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.isNo = true;
              this.isMore = false;
            } else if (res.data.length < 9) {
              this.isNo = false;
              this.isMore = false;
              this.list = res.data;
            } else {
              this.isNo = false;
              this.isMore = true;
              this.list = res.data;
            }
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
  @import "../../assets/less/withdraw";
</style>

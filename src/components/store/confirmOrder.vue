<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>
      确认订单
    </div>
    <router-link to="/addressManage/1">
      <div class="confirm-order-container">
        <div class="co-address"><i class="icon icon-confirm-address"></i></div>
        <div class="co-info">
          <p class="co-info-receiver">收货人：{{coReceiver}} <span>{{coTel}}</span></p>
          <p class="co-info-receiver-address">收货地址：{{coAds}}</p>
        </div>
        <div class="co-chose"><i class="icon icon-right"></i></div>
      </div>
    </router-link>
    <div class="confirm-order-goods">
      <p class="co-goods-name">{{goodsInfo.goods.storeName}}</p>
      <div class="co-goods-center">
        <div class="co-goods-img"><img :src="imgUrl+goodsInfo.goods.default_img" alt=""></div>
        <div class="co-goods-info">
          <p class="co-goods-info-name">{{goodsInfo.goods.name}}</p>
          <p class="co-goods-info-style">{{goodsInfo.t1}}；{{goodsInfo.t2}}</p>
          <div class="co-goods-integral-money" v-if="goodsInfo.goods.type == 2">
            <!--<p><i class="icon icon-x-integral"></i><span>{{goodsInfo.integralX}}</span><b>+</b><u>¥</u><span>{{goodsInfo.money}}</span></p>-->
            <p><u>¥</u><span>{{goodsInfo.money}}</span><b>+</b><i class="icon icon-y-integral"></i><span>{{goodsInfo.integralY}}</span></p>
            <p><i>¥</i>{{finalMarket}}</p>
          </div>
          <div class="co-goods-integral" v-if="goodsInfo.goods.type == 1">
            <!--<p><i class="icon icon-x-integral"></i><span>{{goodsInfo.integralX}}</span></p>-->
            <p><i class="icon icon-y-integral"></i><span>{{goodsInfo.integralY}}</span></p>
            <p><i>¥</i>{{finalMoney}}</p>
          </div>
          <div class="co-goods-price-total">
            <p><span v-if="goodsInfo.goods.type == 3">¥ {{goodsInfo.money}}</span></p>
            <p class="co-goods-total">X <span>{{goodsInfo.num}}</span></p>
          </div>
        </div>
      </div>
      <div class="co-other">
        <div class="co-other-list"><span>购买数量</span><span>{{goodsInfo.num}}</span></div>
        <div class="co-other-list" v-if="goodsInfo.goods.type == 1"><span>运费</span><span>¥ {{goodsInfo.freight}}</span></div>
        <div class="co-other-list"><span>买家留言：</span><input type="text" placeholder="（选填）填写您的留言" v-model="buyerMsg"></div>
      </div>
      <div class="co-final-price">
        <div class="co-final-price-txt">
          <p>共计 1 件商品 小计 </p>
        </div>
        <div class="co-final-price-center">
          <p class="co-spec" v-if="goodsInfo.goods.type == 3">¥ {{finalMoney}}</p>
          <div class="co-goods-integral-money" v-if="goodsInfo.goods.type == 2">
            <!--<p><i class="icon icon-x-integral"></i><span>{{finalIntegralX}}</span><b>+</b><u>¥</u><span>{{finalMoney}}</span></p>-->
            <p><i class="icon icon-y-integral"></i><span>{{finalIntegralY}}</span><b>+</b><u>¥</u><span>{{finalMoney}}</span></p>
            <p><i>¥</i>{{finalMarket}}</p>
          </div>
          <div class="co-goods-integral" v-if="goodsInfo.goods.type == 1">
            <!--<p><i class="icon icon-x-integral"></i><span>{{finalIntegralX}}</span></p>-->
            <p><i class="icon icon-y-integral"></i><span>{{finalIntegralY}}</span></p>
            <p><i>¥</i>{{finalMoney}}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="confirm-order-clear" @click="confirmOrder">提交订单</button>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import {imgUrl} from '@/assets/js/api.js'
  let token = localStorage.getItem('token')
  import { MessageBox } from 'mint-ui'
  export default {
    name: "confirm-order",
    data () {
      return{
        coReceiver: '',
        coTel: '',
        coAds: '',
        AdsId: '',
        goodsInfo: [],
        finalIntegralX: 0,
        finalIntegralY: 0,
        finalMoney: 0,
        finalMarket: 0,
        buyerMsg: '',
        imgUrl: imgUrl,
      }
    },
    methods : {
      confirmOrder() {
        var applyOrder = {
          address_id: this.AdsId,
          list: {
            goods_id: this.goodsInfo.goods.id,
            num: this.goodsInfo.num,
            spec_id: this.goodsInfo.tId,
          },
          color: this.goodsInfo.t2,
          remark: this.buyerMsg,
          type: this.goodsInfo.goods.type,
          ix: this.finalIntegralX,
          iy: this.finalIntegralY,
          mo: this.finalMoney
        };
        localStorage.setItem('applyOrder', JSON.stringify(applyOrder));
        this.$router.push('/apply/0')
      }
    },
    created () {
      let cad = JSON.parse(localStorage.getItem('confirmAddress'));
      if (cad) {
        this.coReceiver = cad.name;
        this.coTel = cad.phone;
        this.coAds = cad.province + cad.city + cad.area + cad.detail;
        this.AdsId = cad.id;
      } else {
        api.getDefaultAddress()
          .then(res => {
            if (res.code === 500) {
              MessageBox({
                title: '提示',
                message: '您还没有地址，是否去添加？',
                showCancelButton: true
              })
                .then(res => {
                  if (res == 'confirm') {
                    this.$router.push('/addAddress/2');
                  } else {
                    window.history.go(-1);
                  }
                })
            } else if (res.code === 200) {
              if (res.data.length === 0) {
                MessageBox({
                  title: '提示',
                  message: '您还没有地址，是否去添加？',
                  showCancelButton: true
                })
                  .then(res => {
                    if (res == 'confirm') {
                      this.$router.push('/addAddress/2');
                    } else {
                      window.history.go(-1);
                    }
                  })
              } else {
                this.coReceiver = res.data.name;
                this.coTel = res.data.phone;
                this.coAds = res.data.province + res.data.city + res.data.area + res.data.detail;
                this.AdsId = res.data.id;
              }
            }
          })
          .catch(err => {
            console.log(err)
          });
      }

      this.goodsInfo = JSON.parse(localStorage.getItem('final'));
      this.finalIntegralX = parseFloat(parseFloat(this.goodsInfo.integralX) * parseFloat(this.goodsInfo.num)).toFixed(2);
      this.finalIntegralY = parseFloat(parseFloat(this.goodsInfo.integralY) * parseFloat(this.goodsInfo.num)).toFixed(2);
      this.finalMarket = parseFloat(parseFloat(this.goodsInfo.market) * parseFloat(this.goodsInfo.num)).toFixed(2);
      this.finalMoney = parseFloat(parseFloat(this.goodsInfo.money) * parseFloat(this.goodsInfo.num)).toFixed(2);
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/confirmOrder";
</style>

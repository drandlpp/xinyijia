<template>
    <div class="wrapper">
      <div class="detail-container">
        <div class="detail-swipe-container" :style="{'height': nowHeight + 'px'}">
          <p class="detail-back-car">
            <span class="detail-back" @click="detailBack"><i class="icon icon-detail-back"></i></span>
            <span class="detail-car"><router-link to="/shopCar"><i class="icon icon-detail-car"></i></router-link></span>
          </p>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(sp, index) in goodsInfo.main_img" :key="index"><img :src="imgUrl+sp" alt="" class="swiper-image"></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="detail-name-price">
        <p class="detail-goods-name">{{goodsInfo.name}}</p>
        <div class="detail-goods-price" v-if="goodsInfo.type == 3">
          <p><i></i><span>¥</span>{{money}}</p>
          <!--<p class="ac"><i>市场价：</i><s>¥</s><s>{{market}}</s></p>-->
        </div>
        <div class="detail-goods-integral" v-if="goodsInfo.type == 1">
          <p><i class="icon icon-y-integral"></i><span style="color: #ff3b30;font-size: .35rem">{{integralX}}</span></p>
          <p class="detail-goods-price" style="color: #c3c3c3"><span style="color: #c3c3c3;font-size: .32rem">¥</span><s class="ss">{{money}}</s></p>
        </div>
        <div class="detail-goods-integral-and-money" v-if="goodsInfo.type == 2">
          <p class="aa1">市场价：<span>¥<i>{{market}}</i></span></p>
          <p class="aa">会员价：<b>¥</b><span>{{money}}</span><b>+</b><i class="icon icon-y-integral"></i><span>{{integralX}}</span></p>
          <!--<p><i class="icon icon-y-integral"></i><span>{{integralY}}</span><b>+</b><u>¥</u>{{money}}</p>-->
        </div>
      </div>
      <div class="detail-goods-detail">
        <p class="detail-title"><span></span>商品详情</p>
        <div class="detail-img">
          <img :src="imgUrl+dimg" alt="" v-for="(dimg, index) in goodsInfo.detail_img" :key="index">
        </div>
      </div>
      <div class="detail-clear">
        <div class="detail-clear-store">
          <i class="icon icon-detail-service"></i><p>店铺</p>
        </div>
        <div class="detail-clear-service"><a href="tel:0377—63186665"><i class="icon icon-detail-store"></i><p>客服</p></a></div>
        <div class="detail-clear-join-car" @click="joinBuy(0)">加入购物车</div>
        <div class="detail-clear-buy-now" @click="joinBuy(1)">立即购买</div>
      </div>
      <mt-popup v-model="popupVisible" class="detail-pop" position="bottom">
        <div class="detail-pop-center">
          <div class="pop-head">
            <div class="detail-small-img">
              <img :src="imgUrl + goodsInfo.default_img" alt="">
            </div>
            <div class="pop-detail-txt">
              <p class="pop-price" v-if="goodsInfo.type == 3"><span>¥</span>{{money}}</p>
              <div class="pop-integral" v-if="goodsInfo.type == 1">
                <!--<p><i class="icon icon-x-integral"></i><span>{{integralX}}</span></p>-->
                <p class="bb"><i>¥</i>{{money}}</p>
                <p><i class="icon icon-y-integral"></i><span>{{integralY}}</span></p>
              </div>
              <div class="pop-integral-money" v-if="goodsInfo.type == 2">
                <!--<p><i class="icon icon-x-integral"></i><span>{{integralX}}</span><b>+</b><u>¥</u><span>{{money}}</span></p>-->
                <p class="bb"><i>¥</i>{{market}}</p>
                <p><i class="icon icon-y-integral"></i><span>{{integralY}}</span><b>+</b><u>¥</u><span>{{money}}</span></p>
              </div>
              <p class="pop-inventory">库存 {{inventory}} 件</p>
            </div>
          </div>
          <div class="pop-style">
            <div class="pop-style-type2">
              <p class="style-head">{{goodsInfo.spec_name1}}</p>
              <div class="style-type-center">
                <span @click="choseStyle(0, index, st1)" :class="{'style-on':st1Idex===index}" v-for="(st1, index) in style1" :key="index">{{st1.size}}</span>
              </div>
            </div>
            <div class="pop-style-type1">
              <p class="style-head">{{goodsInfo.spec_name2}}</p>
              <div class="style-type-center">
                <span @click="choseStyle(1, index, st2)" :class="{'style-on':st2Idex===index}" v-for="(st2, index) in style2" :key="index">{{st2}}</span>
              </div>
            </div>
          </div>
          <div class="pop-total">
            <p class="total-title">购买数量</p>
            <div class="pop-total-center">
              <button class="cti-sub cti" @click="subAdd(0)">-</button>
              <input type="number" class="cti-number" readonly="" :value="value">
              <button class="cti-add cti" @click="subAdd(1)">+</button>
            </div>
          </div>
          <button class="pop-confirm" @click="detailConfirm">确定</button>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import {swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Toast } from 'mint-ui';
  import api from "@/assets/js/api";
  import { imgUrl } from '../../assets/js/api.js'
  let token = localStorage.getItem('token')
  export default {
    name: "detail",
    components: {
      swiper,
      swiperSlide,
    },
    data () {
      return {
        swiperOption: {
          autoplay: true,
          loop: true,
          delay: 1000,
          // effect : 'fade',
          pagination: {
            el: '.swiper-pagination',
          },
        },
        nowHeight: 0,
        popupVisible: false,
        choseWay: 0,
        value: 1, // 购买数量
        inventory: 0, // 库存
        style1: [], // 样式1--颜色
        st1Idex:0,
        style2: [],
        st2Idex: 0,
        goodsId: this.$route.params.id,
        mainImg: [],
        goodsInfo:[],
        imgUrl: imgUrl,
        integralX:0,
        integralY:0,
        money:0,
        styleID: 0,
        storeID: 0,
        choseS1: '',
        choseS2: '',
        market: '',
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted() {
      this.swiper.slideTo(1, 1000, true);
    },
    methods: {
      // 返回
      detailBack () {
        window.history.go(-1);
      },

      joinBuy(idx){
        this.popupVisible = true;
        this.choseWay = idx;
      },
      // 商品加减
      subAdd (idx) {
        switch (idx) {
          // 商品减少
          case 0:
            console.log( this.value)
            if (this.value === 1) {
              this.value = 1;
              return false;
            } else {
              this.value--;
              // this.$emit('input', {res: this.value, other: '--'})
            }
            break;
          // 商品增加
          case 1:
            if (this.value < this.inventory) {
              this.value++;
              // this.$emit('input', {res: this.value, other: '++'})
            } else {
              Toast({
                message: '已达到最大购买数量',
                position: 'bottom',
                duration: 2000
              })
            }
            break;
        };
      },
      detailConfirm () {
        this.popupVisible = false;
        // console.log(this.choseS1)
        // console.log(this.choseS2)

        switch (this.choseWay) {
          // 加入购物车
          case 0:
            let form = this.$qs.stringify({
              token: token,
              product_id: this.goodsInfo.id,
              spec_id: this.styleID,
              specification: this.choseS2,
              num: this.value,
              shop_id: this.storeId
            });
            api.addShopCar(form)
              .then(res => {
                if (res.code === 200) {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 2000
                  })
                } else {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 2000
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })

            break;
          // 立即购买
          case 1:
            let final = {
              t1: this.choseS1,
              t2: this.choseS2,
              tId: this.styleID,
              integralX: this.integralX,
              integralY: this.integralY,
              market: this.market,
              money: this.money,
              num: this.value,
              freight: this.goodsInfo.shipping_money,
              goods: {
                name: this.goodsInfo.name,
                storeName: this.goodsInfo.store.name,
                default_img: this.goodsInfo.default_img,
                type: this.goodsInfo.type,
                id: this.goodsInfo.id
              }
            };
            localStorage.setItem('final', JSON.stringify(final));
            this.$router.push('/confirmOrder')
            break;
        };
      },
      choseStyle (idx, eleIndex, ele) {
        switch (idx) {
          case 0:
            // console.log(ele)
            this.st1Idex = eleIndex;
            this.choseS1 = ele.size;
            this.integralX = ele.points;
            this.integralY = ele.points;
            this.style2 = ele.value;
            this.market = ele.market;
            this.money =  ele.ready;
            this.inventory = ele.stock;
            this.styleID = ele.id;
            this.st2Idex = 0;
            this.choseS2 = ele.value[0];
            // console.log(this.choseS2)
            break;
          case 1:

            this.choseS2 = ele;
            this.st2Idex = eleIndex;
            // console.log(this.choseS2)
            // console.log( this.integralX, this.integralY,this.money)
            break;
          default:
            return false;
        }
      }
    },
    created () {
      localStorage.removeItem('confirmAddress');
      api.getGoodsDetail(this.goodsId)
        .then(res => {
          if (res.code === 200) {
            this.goodsInfo = res.data;
            this.style1 = this.goodsInfo.specs;
            this.choseS1 = this.goodsInfo.specs[0].size;
            this.style2 = this.goodsInfo.specs[0].value;
            this.choseS2 = this.goodsInfo.specs[0].value[0] ;
            this.inventory = this.goodsInfo.specs[0].stock;
            this.integralX = this.goodsInfo.specs[0].points;
            this.integralY = this.goodsInfo.specs[0].points;
            this.market = this.goodsInfo.specs[0].market;
            this.money =  this.goodsInfo.specs[0].ready;
            this.styleID = this.goodsInfo.specs[0].id;
            this.storeId = this.goodsInfo.store.id;
            // console.log( this.style1,this.style2)
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.nowHeight = window.screen.availWidth;
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/detail.less";
</style>

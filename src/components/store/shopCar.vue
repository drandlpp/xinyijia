<template>
    <div class="wrapper">
      <div class="shop-car-container" v-if="!isNo">
        <div class="shop-car-header"></div>
        <div class="shop-car-list-container">
          <div class="sc-store" v-for="(store, index) in  carList" :key="index">
            <p class="sc-store-name">{{store.shop_name}}<span class="fr">店铺</span></p>
            <div class="sc-goods-container">
              <div class="sc-goods-list" v-for="(goods, idx) in store.child" :key="idx">
                <div class="sc-goods-check">
                  <input type="radio" :id="carId+goods.product_id" name="shopCar" @click="getGoods(goods)">
                  <label :for="carId+goods.product_id"></label>
                </div>
                <div class="sc-goods-img"><img :src="imgUrl+goods.products.default_img" alt=""></div>
                <div class="sc-goods-detail">
                  <p class="sc-goods-name">{{goods.products.name}}</p>
                  <div class="sc-goods-type-del">
                    <div class="sc-goods-type">
                      <p><span>{{goods.products.spec_name1}}：</span>{{goods.spec.size}}</p>
                      <p><span>{{goods.products.spec_name2}}：</span>{{goods.specification}}</p>
                    </div>
                    <div class="sc-goods-del">
                      <button @click="deleteCar(goods, idx, store, index)">删除</button>
                    </div>
                  </div>
                  <div class="sc-goods-price sc-goods-integral-and-money" v-if="goods.products.type == 2">
                    <!--<p class="scg-integral-money scg-x"><i class="icon icon-x-integral"></i><span>{{goods.spec.points}}</span><b>+</b><u>¥</u><span>{{goods.spec.ready}}</span></p>-->
                    <p class="scg-integral-money scg-k"><u>¥</u><span style="color:#ff3b30;font-size: .3rem">{{goods.spec.ready}}</span><b>+</b><i class="icon icon-y-integral"></i><span style="color:#ff3b30;font-size: .3rem">{{goods.spec.points}}</span></p>
                    <h3 style="color: #c3c3c3;font-size: .23rem">￥ <i>{{goods.spec.market}}</i></h3>
                  </div>
                  <div class="sc-goods-price sc-goods-integral" v-if="goods.products.type == 1">
                    <div class="scg-integral">
                      <!--<p><i class="icon icon-x-integral"></i><span>{{goods.spec.points}}</span></p>-->
                      <p><i class="icon icon-y-integral"></i><span style="font-size: .3rem">{{goods.spec.points}}</span></p>
                      <p style="color: #c3c3c3">￥ <s>{{goods.spec.ready}}</s></p>
                    </div>
                  </div>
                  <div class="sc-goods-price-total">
                    <div class="sc-goods-price-money"><span v-if="goods.products.type == 3">¥ <i>{{goods.spec.ready}}</i></span></div>
                    <div class="sc-goods-total">
                      <button @click="addSub(goods, true)">-</button>
                      <input type="text" readonly disabled :value="goods.num">
                      <button @click="addSub(goods,false)">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shop-car-clear">
          <div class="sc-total-money">合计:</div>
          <div class="sc-total-integral">
            <p v-if="type == 3" style="line-height: .8rem;font-size: .32rem;color: #ff3b30"><i>¥</i>{{totalCash}}</p>
            <div class="sc-t-integral" v-if="type == 1">
              <!--<p><i class="icon icon-x-integral"></i><span>{{totalConsumeIntegral}}</span></p>-->
              <p><i class="icon icon-y-integral"></i><span style="color: #ff3b30;font-size: .25rem">{{totalUseIntegral}}</span></p>
              <p style="color: #c3c3c3">￥ <s>{{totalCash}}</s></p>
            </div>
            <div class="sc-t-integral-and-money" v-if="type == 2">
              <!--<p><i class="icon icon-x-integral"></i><span>{{totalConsumeIntegral}}</span><b>+</b><u>¥</u><span>{{totalCash}}</span></p>-->
              <p><u>¥</u><span style="color:#ff3b30;">{{totalCash}}</span><b>+</b><i class="icon icon-y-integral"></i><span style="color:#ff3b30;">{{totalUseIntegral}}</span></p>
              <h3 style="font-size: .23rem;line-height: normal;color: #c3c3c3">￥ <i>{{totalMarket}}</i></h3>
            </div>
          </div>
          <div class="sc-clear-button">
            <button @click="goClear()">结算</button>
          </div>
        </div>
      </div>
      <div class="container-no-data" v-if="isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt1">购物车竟然是空的</p>
        <p class="no-data-txt2">再忙，也要记得买点什么犒赏自己~</p>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui';
  let token = localStorage.getItem('token')
  export default {
    name: "shop-car",
    components: {
      tabFoot,

    },
    data () {
      return {
        page: 1,
        isNo: false,
        carList: [],
        carId: 'car',
        imgUrl: imgUrl,
        num: 0,
        type: 0,

        totalUseIntegral: 0,
        totalConsumeIntegral: 0,
        totalCash: 0,
        totalMarket: 0,
        currentId: '',
        checkGoods: []

      }
    },
    methods: {
      getGoods (ele) {
        this.currentId = ele.id;
        this.totalUseIntegral = parseFloat(parseFloat(ele.num) * parseFloat(ele.spec.points)).toFixed(2);
        this.totalConsumeIntegral = parseFloat(parseFloat(ele.num) * parseFloat(ele.spec.points)).toFixed(2);
        this.totalCash = parseFloat(parseFloat(ele.num) * parseFloat(ele.spec.ready)).toFixed(2);
        this.totalMarket = parseFloat(parseFloat(ele.num) * parseFloat(ele.spec.market)).toFixed(2);
        this.type = ele.products.type;
      },
      /*
      * 商品加减
      * */
      addSub (item, bool) {
        if (bool) {
          item.num--;
          if (item.num <= 1) {
            item.num = 1;
          }
        } else {
          item.num++;
        };
        this.goodsCheck();
      },
      /*
      * 商品选中
      * */
      goodsCheck () {
        let store = this.carList;
        store.forEach(storeItem => {
          let goods = storeItem.child;
          goods.forEach(goodsItem => {
            if (goodsItem.id === this.currentId) {
              this.totalUseIntegral = parseFloat(parseFloat(goodsItem.num) * parseFloat(goodsItem.spec.points)).toFixed(2);
              this.totalConsumeIntegral = parseFloat(parseFloat(goodsItem.num) * parseFloat(goodsItem.spec.points)).toFixed(2);
              this.totalCash = parseFloat(parseFloat(goodsItem.num) * parseFloat(goodsItem.spec.ready)).toFixed(2);
              this.totalMarket = parseFloat(parseFloat(goodsItem.num) * parseFloat(goodsItem.spec.market)).toFixed(2);
            }
          })
        })
      },
      /*
      * 删除购物车商品
      * */
      deleteCar (e, idx, store, idxs) {
        console.log(e)
        MessageBox({
          title: '提示',
          message: '确认删除此商品?',
          showCancelButton: true
        })
          .then(ret => {
            if (ret == 'confirm') {
              let delForm = this.$qs.stringify({
                product_id: e.product_id,
                token: token
              })
              api.shopCarDelete(delForm)
                .then(res => {
                  /*store.child.splice(idx, 1);
                  if (store.child.length === 0) {
                    this.carList.splice(idxs, 1)
                  }
                  if (this.carList.length === 0) {
                    this.isNo = true
                  }*/

                  if (res.code === 200) {
                    Toast(res.msg);
                    store.child.splice(idx, 1)
                    setTimeout(() => {
                      window.location.reload();
                    },1500);
                  };

                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              return false
            }
          })
      },
      /*
      * 去结算
      * */
      goClear () {
        // console.log(this.totalUseIntegral)
        // console.log(this.totalConsumeIntegral)
        // console.log(!this.currentId)
        if (!this.currentId) {
          Toast('您还为选中任何产品！！！');
          return false;
        } else {
          let store = this.carList;
          store.forEach(storeItem => {
            let goods = storeItem.child;
            goods.forEach(goodsItem => {
              if (goodsItem.id === this.currentId) {
                console.log(goodsItem)
                let final = {
                  t1: goodsItem.specification,
                  t2: goodsItem.spec.size,
                  tId: goodsItem.spec.id,
                  integralX: this.totalConsumeIntegral,
                  integralY: this.totalUseIntegral,
                  market: goodsItem.spec.market,
                  money: this.totalCash,
                  num: goodsItem.num,
                  freight: goodsItem.products.shipping_money,
                  goods: {
                    name: goodsItem.products.name,
                    storeName: goodsItem.shop_name,
                    default_img: goodsItem.products.default_img,
                    type: goodsItem.products.type,
                    id:  goodsItem.products.id
                  }
                };
                localStorage.setItem('final', JSON.stringify(final));
              }
            });
          });
          this.$router.push('/confirmOrder')
        }
      }

    },
    created () {
      localStorage.removeItem('confirmAddress');
      api.getCarList(this.page)
        .then(res => {
          if (res.data.length === 0) {
            this.isNo = true;
          } else {
            this.carList = res.data;
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/shopCar";
</style>

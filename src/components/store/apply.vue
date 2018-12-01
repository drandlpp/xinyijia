<template>
    <div class="wrapper">
      <div class="moduleHead">
        <a @click="goBackUp"></a>确认付款
      </div>
      <div class="apply-container">
        <!--<div class="apply-price" v-if="showModel">
          <h1 v-if="order.type == 3">¥<span>{{order.mo}}</span></h1>
          <div class="apply-integral" v-if="order.type == 2">
            <p><i class="icon icon-x-integral"></i><span>{{order.ix}}</span><b>+</b><u>¥</u><span>{{order.mo}}</span></p>
            <p><i class="icon icon-y-integral"></i><span>{{order.iy}}</span><b>+</b><u>¥</u><span>{{order.mo}}</span></p>
          </div>
          <div class="apply-integral-money" v-if="order.type == 1">
            <p><i class="icon icon-x-integral"></i><span>{{order.ix}}</span></p>
            <p><i class="icon icon-y-integral"></i><span>{{order.iy}}</span></p>
          </div>
        </div>
        <div class="apply-price" v-if="!showModel">
          <h1 v-if="applyClass===0">¥<span>{{order.mo}}</span></h1>
          <div class="apply-integral">
            <p v-if="applyClass===3"><i class="icon icon-x-integral"></i><span>{{order.ix}}</span><b>+</b><u>¥</u><span>{{order.mo}}</span></p>
            <p v-if="applyClass===4"><i class="icon icon-y-integral"></i><span>{{order.iy}}</span><b>+</b><u>¥</u><span>{{order.mo}}</span></p>
          </div>
          <div class="apply-integral-money">
            <p v-if="applyClass===1"><i class="icon icon-x-integral"></i><span>{{order.ix}}</span></p>
            <p v-if="applyClass===2"><i class="icon icon-y-integral"></i><span>{{order.iy}}</span></p>
          </div>
        </div>-->
        <div class="apply-way">
          <p class="apply-title">支付方式：</p>
          <div @click="choseApply(0)" :class="{'apply-way-on': 0===applyClass}" v-if="order.type !== 1">
            <i class="icon icon-pay-weChat"></i><span>微信支付</span>
          </div>
          <div @click="choseApply(1)" :class="{'apply-way-on': 1===applyClass}" v-if="order.type == 1">
            <i class="icon icon-pay-integral-x"></i><span>购物积分</span>
          </div>
          <div @click="choseApply(2)" :class="{'apply-way-on': 2===applyClass}" v-if="order.type == 1">
            <i class="icon icon-pay-integral-y"></i><span>可用积分</span>
          </div>
          <div @click="choseApply(3)" :class="{'apply-way-on': 3===applyClass}" v-if="order.type == 2">
            <i class="icon icon-pay-integral-x-weChat"></i><span>购物积分 + 微信支付</span>
          </div>
          <div @click="choseApply(4)" :class="{'apply-way-on': 4===applyClass}" v-if="order.type == 2">
            <i class="icon icon-pay-integral-y-weChat"></i><span>可用积分 + 微信支付</span>
          </div>
        </div>
      </div>
      <button class="apply-go" @click="applyGo">提交订单</button>
      <pay @hidden="hiddenShow"  @password="passwordGro" :password="applyPsd" v-show="payPop"></pay>

    </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  import pay from '../comp/pay.vue'
  let token = localStorage.getItem('token')
  export default {
    name: "apply",
    data () {
      return {
        applyClass: -1,
        showModel: true,
        order: [],
        payWay: '',
        applyPsd: '',
        payPop: false,
        orderSN:'',
        way: this.$route.params.way,
        integralUse: '',
        integralShop: '',
        finalIntegralUse: '',
        finalIntegralShop: ''
      }
    },
    components: {
      pay
    },
    methods : {
      goBackUp() {
        MessageBox({
          title: '提示',
          message: '您确认放弃支付吗？',
          showCancelButton: true
        })
          .then(res => {
            if (res == 'confirm') {
              window.history.go(-1)
            } else {
              return false
            }
          })
      },
      choseApply(idx) {
       /* console.log(parseFloat(this.finalIntegralShop) > parseFloat(this.integralShop))
        console.log(parseFloat(this.finalIntegralUse) > parseFloat(this.integralUse))
        console.log(this.finalIntegralShop > this.integralShop)
        console.log(this.finalIntegralUse > this.integralUse)
        console.log(this.finalIntegralShop)
        console.log(this.integralShop)
        console.log(this.finalIntegralUse)
        console.log(this.integralUse)

        console.log(parseFloat(this.finalIntegralShop))
        console.log(parseFloat(this.integralShop))
        console.log(parseFloat(this.finalIntegralUse))
        console.log(parseFloat(this.integralUse))*/
        this.showModel = false;
        this.applyClass = idx;
        switch (idx) {
          case 0:
            this.payWay = 'wx';
            break;
          case 1:
            if (parseFloat(this.finalIntegralShop) > parseFloat(this.integralShop)) {
              Toast('购物积分不足，请选择其他购物方式！！！');
              this.applyClass = -1;
              this.payWay = '';
            } else {
              this.payWay = 'shop_points';
            };
            break;
          case 2:
            if (parseFloat(this.finalIntegralUse) > parseFloat(this.integralUse)) {
              Toast('可用积分积分不足，请选择其他购物方式！！！');
              this.applyClass = -1;
              this.payWay = '';
            } else {
              this.payWay = 'ready_points';
            };
            break;
          case 3:
            if (parseFloat(this.finalIntegralShop) > parseFloat(this.integralShop)) {
              Toast('购物积分不足，请选择其他购物方式！！！');
              this.applyClass = -1;
              this.payWay = '';
            } else {
              this.payWay = 'shop_points';
            };
            this.payWay = 'wx_shop_points';
            break;
          case 4:
            if (parseFloat(this.finalIntegralUse) > parseFloat(this.integralUse)) {
              Toast('可用积分积分不足，请选择其他购物方式！！！');
              this.applyClass = -1;
              this.payWay = '';
            } else {
              this.payWay = 'ready_points';
            };
            this.payWay = 'wx_ready_points';
            break;
          default:
            return false;
        }
      },
      hiddenShow () {
        let that = this;
        that.payPop = false
      },
      applyGo () {
       if (!this.payWay) {
         Toast('请选择支付方式！！！');
         return false;
       } else {
         if (this.way == 1) {
           let form1 = this.$qs.stringify({
             token: token,
             pay_channel: this.payWay,
             order_id: this.order.orderId
           });
           api.payAgain(form1)
             .then(res => {
               if (res.code === 200) {
                 this.orderSN = res.data;
                 switch (this.applyClass) {
                   case 0:
                   case 3:
                   case 4:
                   case 1:
                   case 2:
                     window.location.href = 'http://www.xinyijiamall.com/api/OrderPay?order_sn='+ res.data +'';
                     break;
                   default:
                     return false;
                 }
               } else {
                 Toast(res.msg)
               };
             })
         };
         if (this.way == 0) {
           let form = this.$qs.stringify({
             token: token,
             address_id: this.order.address_id,
             list: {
               product_id: this.order.list.goods_id,
               spec_id: this.order.list.spec_id,
               num: this.order.list.num,
             },
             spec1:  this.order.color,
             pay_channel: this.payWay,
             remark: this.order.remark
           });
           api.createdOrder(form)
             .then(res => {
               if (res.code === 200) {
                 this.orderSN = res.data;
                 switch (this.applyClass) {
                   case 0:
                   case 3:
                   case 4:
                   case 1:
                   case 2:
                     window.location.href = 'http://www.xinyijiamall.com/api/OrderPay?order_sn='+ res.data +'';
                     break;
                   default:
                     return false;
                 }
               } else {
                 Toast(res.msg);
               };
             })
             .catch(err => {
               console.log(err)
             })
         }
       };
      },
      passwordGro (e) {
        this.applyPsd = e
        let psw = this.applyPsd.toString().replace(/,/g, '')
        if ( this.applyPsd.length === 6) {
          api.orderPay({sn:this.orderSN,psd:psw})
            .then(res => {
              if (res.code === 200) {
                Toast(res.msg);
                setTimeout(() => {
                  window.history.go(-2)
                },3000);
              } else {
                Toast(res.msg);
                return false;
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    created () {
      this.order = JSON.parse(localStorage.getItem('applyOrder'));
      this.finalIntegralUse = parseFloat( parseFloat(this.order.ix)).toFixed(2);
      this.finalIntegralShop = parseFloat( parseFloat(this.order.iy)).toFixed(2);
      // this.finalIntegralUse = parseFloat( parseFloat(this.order.ix).toFixed(2) *  parseFloat(this.order.list.num).toFixed(2)).toFixed(2)
      // this.finalIntegralShop = parseFloat( parseFloat(this.order.iy).toFixed(2) *  parseFloat(this.order.list.num).toFixed(2)).toFixed(2)
      api.availableIntegral()
        .then(res => {
          this.integralUse = res.data.ready_points;
          this.integralShop = res.data.shop_points;
        })
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/apply";
</style>

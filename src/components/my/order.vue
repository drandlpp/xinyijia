<template>
    <div class="wrapper">
      <div class="moduleHead">
        <a href="javascript:window.history.go(-1)"></a>商城订单
      </div>
      <div class="my-order-title">
        <p v-for="(title, $index) in orderTitle" :key="$index" :class="{'tabOn':idx == $index}" @click="changeTab($index)">{{title}}</p>
      </div>
      <div class="my-order-container">
        <div class="each-order-list-container" v-for="(order,index) in orderList" :key="index" v-if="!noData">
          <p class="shopName">{{order.store.name}}</p>
          <div class="each-order-list">
            <div class="eol-img fl">
              <img :src="imgUrl+order.product.default_img" alt="">
            </div>
            <div class="eol-info fl">
              <p class="eol-nam">&nbsp;{{order.product.name}}</p>
              <p class="eol-type" style="width: 4.2rem;height: .3rem;overflow: hidden">{{order.spec1}}，{{order.spec.size}}</p>
              <div class="co-goods-integral-money" v-if="order.product_type == 2">
                <!--<p><i class="icon icon-x-integral"></i><span>{{order.spec.points}}</span><b>+</b><u>¥</u><span>{{order.spec.ready}}</span></p>-->
                <p><i class="icon icon-y-integral"></i><span>{{order.spec.points}}</span><b>+</b><u>¥</u><span>{{order.spec.ready}}</span></p>
                <p><i>¥</i>{{order.spec.market}}</p>
              </div>
              <div class="co-goods-integral" v-if="order.product_type == 1">
                <!--<p><i class="icon icon-x-integral"></i><span>{{order.spec.points}}</span></p>-->
                <p><i class="icon icon-y-integral"></i><span>{{order.spec.points}}</span></p>
                <p><i>¥</i>{{order.spec.ready}}</p>
              </div>
              <div class="co-goods-price-total" v-if="order.product_type == 3">
                <p><span >¥ {{order.spec.ready}}</span></p>
              </div>
            </div>
            <span class="eol-totle">X {{order.total_num}}</span>
          </div>
          <div class="myOrderInfo">
            <p  v-if="idx!==4"><span>订单编号：</span>{{order.sn}}</p>
            <p v-if="idx===4"><span>退款编号：</span>{{order.refund_sn}}</p>
            <p><span>下单时间：</span>{{order.created_at}}</p>
            <p v-if="idx===1 || idx===2 || idx===3">
              <span>支付合计：
                <i v-if="order.pay_order.pay_channel == 2">可用积分 {{order.total_points}}</i>
                <i v-if="order.pay_order.pay_channel == 1">¥ {{order.total_ready}}</i>
                <i v-if="order.pay_order.pay_channel == 3">购物积分 {{order.total_points}}</i>
                <i v-if="order.pay_order.pay_channel == 4">可用积分 {{order.total_points}} + ¥ {{order.total_ready}}</i>
                <i v-if="order.pay_order.pay_channel == 5">购物积分 {{order.total_points}} + ¥ {{order.total_ready}}</i>
              </span>
            </p>
            <p v-if="idx===4"><span>退款合计：
                <i v-if="order.pay_order.pay_channel == 2">可用积分 {{order.refund_points}}</i>
                <i v-if="order.pay_order.pay_channel == 1">¥ {{order.refund_ready}}</i>
                <i v-if="order.pay_order.pay_channel == 3">购物积分 {{order.refund_points}}</i>
                <i v-if="order.pay_order.pay_channel == 4">可用积分 {{order.refund_points}} + ¥ {{order.refund_ready}}</i>
                <i v-if="order.pay_order.pay_channel == 5">购物积分 {{order.refund_points}} + ¥ {{order.refund_ready}}</i>
            </span></p>
            <p v-if="idx===2 || idx===3"><span>快递单号：<input :id="order.tracking_num" :value="order.tracking_num" readonly></span></p>
            <!--<p><span>运　　费：0</span></p>-->
          </div>
          <div class="myOrder_receive"  v-if="idx!==4">
            <div class="or_left fl"></div>
            <div class="or_right fl">
              <p><span>收货人：{{order.address.name}}</span> <span class="fr" style="color: black">{{order.address.phone}}</span></p>
              <p><span>收货地址：{{order.address.province}} {{order.address.city}} {{order.address.area}} {{order.address.detail}}</span></p>
            </div>
          </div>
          <p class="applyTui" v-if="idx!==4">
            <span class="fr" @click="cancelOrder(order, index)" v-if="idx===0">取消订单</span>
            <span class="fr" @click="orderApply(order)" v-if="idx===0">去支付</span>
            <span class="fr" @click="confirmReceipt(order)" v-if="idx===2">确认收货</span>
            <span class="fr" @click="applyReturnGoods(order)" v-if="idx===1 || idx===2">申请退款</span>
          </p>
          <div v-if="idx===4" class="refundStatus">
            <p><span>退款状态：</span>{{order.refund_status}}</p>
            <p><span>退款原因：</span>{{order.refund_reason}}</p>
          </div>
        </div>
      </div>
      <div class="container-no-data" v-if="noData">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">暂时还没有数据</p>
      </div>
    </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "order",
    data () {
      return {
        orderTitle: ['待付款', '待发货', '已发货', '已完成', '退款'],
        isTab: true,
        idx: 0,
        orderList: [],
        way: 'orderAll',
        noData: false,
        isRefund: false,
        imgUrl: imgUrl
      }
    },
    methods: {
      /*
   * tab 切换 changeTab()
   * 取消订单 cancelOrder()
   * 去支付 orderApply()
   * 确认收货 confirmReceipt()
   * 申请退款 applyReturnGoods()
   * 查看退货详情 applyReturnGoodsDetail()
   * 一键复制 copyTxt()
   * */
      changeTab (_idx) {
        this.idx = _idx;
        this.orderList = [];
        switch (_idx) {
          case 0:
            this.way = '1';
            this.getOrderDatas(this.way, 1);
            break;
          case 1:
            this.way = '2';
            this.getOrderDatas(this.way, 1);
            break;
          case 2:
            this.way = '3';
            this.getOrderDatas(this.way, 1);
            break;
          case 3:
            this.way = '4';
            this.getOrderDatas(this.way, 1);
            break;
          case 4:
            this.way = '5';
            this.getRefund(1);
            break;
          default:
            return false;
        }
      },
      // 取消订单
      cancelOrder (e, idx) {
        var cancelId = e.id
        MessageBox({
          title: '提示',
          message: '确认取消订单？',
          showCancelButton: true
        })
          .then(ret => {
            if (ret == 'confirm') {
              let cancel = this.$qs.stringify({
                token: token,
                order_id: cancelId
              })
              api.orderCancel(cancel)
                .then(res => {
                  if (res.code === 200) {
                    Toast(res.msg)
                    this.orderList.splice(idx, 1);
                    if (this.orderList.length === 0) {
                      this.noData = true;
                    }
                  }
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              return false;
            }
          })
      },
      // 去支付
      orderApply (e) {
        let f = {
          orderId: e.id,
          type: e.product_type
        }
        this.$router.push({
          path: '/apply/' + 1
        });
        localStorage.setItem('applyOrder', JSON.stringify(f))
      },
      // 确认收货
      confirmReceipt (e) {
        MessageBox({
          title: '提示',
          message: '确认收货后，商家会收到货款，确定收货？',
          showCancelButton: true
        })
          .then(ret => {
            if (ret == 'confirm') {
              var cfOrder = e.id;
              let f3 = this.$qs.stringify({
                token: token,
                order_id: cfOrder
              });
              api.receiveOrder(f3)
                .then(res => {
                  if (res.code === 200) {
                    Toast(res.msg)
                    setTimeout(() => {
                      window.location.reload()
                    },1500)
                  };

                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              return false;
            }
          })
      },
      // 申请退款
      applyReturnGoods (e) {
        localStorage.setItem('applyRefundGoods', JSON.stringify(e))
        this.$router.push({
          path: '/applyRefund'
        })
      },
      // 获取对应数据
      /*
      * 参数一： 对应接口,[orderAll,waitpay,waitreceive,completed,refund]
      * 参数二：页数
      * */
      getOrderDatas (way, page) {
        api.getOrderData({
          page: page,
          stu: way
        })
          .then(res => {
            let noGoods = res.data == '' || res.data == undefined || res.data == null
            if (noGoods) {
              this.noData = true;
            } else {
              this.noData = false;
              this.orderList = res.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      getRefund (x) {
        api.getOrderRefund(x)
          .then(res => {
            let noGoods = res.data == '' || res.data == undefined || res.data == null;
            if (noGoods) {
              this.noData = true;
            } else {
              this.noData = false;
              this.orderList = res.data
            }
          })
      }
    },
    created () {
      localStorage.removeItem('confirmAddress');
      this.getOrderDatas(1,1)
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/order";
</style>

<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>申请退款
    </div>
    <div class="argContainer">
      <div class="co-goods-center">
        <div class="co-goods-img"><img :src="imgUrl+AG.product.default_img" alt=""></div>
        <div class="co-goods-info">
          <p class="co-goods-info-name">{{AG.product.name}}</p>
          <p class="co-goods-info-style">{{AG.spec1}}；{{AG.spec.size}}</p>
          <div class="co-goods-integral-money" v-if="AG.product.type == 2">
            <p><i class="icon icon-x-integral"></i><span>{{AG.spec.points}}</span><b>+</b><u>¥</u><span>{{AG.spec.ready}}</span></p>
            <p><i class="icon icon-y-integral"></i><span>{{AG.spec.points}}</span><b>+</b><u>¥</u><span>{{AG.spec.ready}}</span></p>
          </div>
          <div class="co-goods-integral" v-if="AG.product.type == 1">
            <p><i class="icon icon-x-integral"></i><span>{{AG.spec.points}}</span></p>
            <p><i class="icon icon-y-integral"></i><span>{{AG.spec.points}}</span></p>
          </div>
          <div class="co-goods-price-total">
            <p><span v-if="AG.product.type == 3">¥ {{AG.spec.ready}}</span></p>
            <p class="co-goods-total">X <span>{{AG.total_num}}</span></p>
          </div>
        </div>
      </div>
      <!--服务类型-->
      <div class="argServiceType argDiv" @click="choseReason(0)">
        <span class="argDivTitle">服务类型</span>{{serviceTypeTxt}}
      </div>
      <!--退款原因-->
      <div class="argReason argDiv" @click="choseReason(1)">
        <span class="argDivTitle">退款原因</span>{{refundReasonTxt}}
      </div>
      <!--退款金额-->
      <div class="argMoney argDiv">
        <span class="argDivTitle">退款金额</span>
        <span style="color:#4f98f5;" v-if="AG.pay_order.pay_channel == 4">可用积分{{AG.total_points}} + ¥ {{AG.total_ready}}</span>
        <span style="color:#4f98f5;" v-if="AG.pay_order.pay_channel == 5">购物积分{{AG.total_points}} + ¥ {{AG.total_ready}}</span>
        <span style="color:#4f98f5;" v-if="AG.pay_order.pay_channel == 2">可用积分{{AG.total_points}}</span>
        <span style="color:#4f98f5;" v-if="AG.pay_order.pay_channel == 3">购物积分{{AG.total_points}} </span>
        <span style="color:#4f98f5;" v-if="AG.pay_order.pay_channel == 1"> ¥ {{AG.total_ready}}</span>
      </div>
      <p class="argAction"><span>*</span>退款金额=实际购买商品单价*数量</p>
      <!--运费-->
      <div class="argFreight argDiv">
        <span class="argDivTitle">运费</span>0元
      </div>
      <p class="argAction"><span>*</span>非商品质量、错发、漏发、卖家可拒绝退运费</p>
      <div class="argReasonDis argDiv">
        <input type="text" placeholder="退货说明 最多200字（选填）"  v-on:input="getTxtNum()" v-model="txtText" v-on:focus="Foucs(0)" v-on:blur="Foucs(1)">
      </div>
      <p class="argAction" v-if="txtArea">您还可以输入 <span>{{txtNum}}</span> 字</p>
      <div class="argUpImg">
        <span class="argDivTitle">上传凭证</span>
        <div class="uiBox">
          <div class="choseImg" >
            <img :src="imgs" alt="" v-if="isUp">
            <img src="../../assets/images/upp.jpg" alt="" v-if="!isUp">
            <input type="file"  ref="inputer"  accept="image/*" @change = 'addImg'>
          </div>
          <!--<div class="haveImg"></div>-->
        </div>
      </div>
      <div class="argBtn" :class="{'argBtnC': !isRef}" @click="applyRefund">{{AGBtnTxt}}</div>
    </div>
    <mt-popup v-model="applyReason" position="bottom" class="mint-popup">
      <div class="reasonList">
        <p v-for="(sTxt, index) in serviceType" :key="index" v-if="isServiceType" @click="reasonTxt(0, sTxt)">{{sTxt.txt}}</p>
        <p v-for="(rTxt, index) in refundReason" :key="index" v-if="isRefundReason" @click="reasonTxt(1, rTxt)">{{rTxt.txt}}</p>
        <p class="reason-cancel" @click="applyReason = false">取消</p>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import EXIF from '@/assets/js/exif.js';
  let token = localStorage.getItem('token')
  export default {
    data () {
      return {
        AG: [],
        imgUrl: imgUrl,
        applyReason: false,
        serviceType: [
          {
            txt: '未收到货，需要退款',
            txtId: 0
          },
          {
            txt: '已收到货，不退货只退款',
            txtId: 1
          },
          {
            txt: '已收到货，需退货退款',
            txtId: 2
          }
        ],
        refundReason: [
          {
            txt: '缺货',
            txtId: 0
          },
          {
            txt: '未按约定时间发货',
            txtId: 1
          },
          {
            txt: '收到假货',
            txtId: 2
          },
          {
            txt: '收到的商品描述不符',
            txtId: 3
          },
          {
            txt: '商品有质量问题',
            txtId: 4
          },
          {
            txt: '商品错发/漏发',
            txtId: 5
          },
          {
            txt: '收到的商品破损',
            txtId: 6
          },
          {
            txt: '其他',
            txtId: 7
          }
        ],
        serviceTypeTxt: '请选择服务类型',
        refundReasonTxt: '请选择退款原因',
        isServiceType: false,
        isRefundReason: false,
        txtArea: false,
        txtNum: 200,
        txtText: '',
        imgs: '',
        isUp: false,
        upImgSrc: '',
        AGBtnTxt: '提交申请',
        isRef: true
      }
    },
    methods: {
      choseReason (idx) {
        this.applyReason = true
        switch (idx) {
          case 0:
            this.isServiceType = true
            this.isRefundReason = false
            break;
          case 1:
            this.isServiceType = false
            this.isRefundReason = true
            break;
        }
      },
      reasonTxt (idx, txt) {
        switch (idx) {
          case 0:
            this.serviceTypeTxt = txt.txt
            break;
          case 1:
            this.refundReasonTxt = txt.txt
            break;
        }
        this.applyReason = false
      },
      getTxtNum () {
        this.txtNum = 200 - (this.txtText.length)
      },
      Foucs (idx) {
        switch (idx) {
          case 0:
            this.txtArea = true;
            break;
          case 1:
            this.txtArea = false;
            break;
        }
      },
      // 上传图片
      addImg (event) {
        let that=this;
        let inputDOM = this.$refs.inputer;
        // console.log(inputDOM)
        // 通过DOM取文件数据
        for(let i in inputDOM.files){
          this.file= inputDOM.files[i];
          this.imgPreview(this.file);
          EXIF.getData(this.file, function() {
            that.Orientation = EXIF.getTag(this, 'Orientation');
          });
        }
        },
      imgPreview (file) {   //base64 格式
      this.imgType = 1;
      this.img_loading = true;
      let self = this;
      let imgContent = {};
      imgContent.name = file.name;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let IMG = new Image();
          IMG.src = this.result;
          self.imgs = IMG.src;
          self.isUp = true;
          IMG.onload = function () {
            let w = this.naturalWidth,
              h = this.naturalHeight,
              resizeW = 0,
              resizeH = 0;
            //压缩设置
            let maxSize = {
              width: 1280,      //图片最大宽度
              height: 1280,     //图片最大高度
              level: 0.5      //图片保存质量
            };
            //计算缩放比例
            if (w > maxSize.width || h > maxSize.height) {
              let multiple = Math.max(w / maxSize.width, h / maxSize.height);
              resizeW = w / multiple;
              resizeH = h / multiple;
            } else {
              resizeW = w;
              resizeH = h;
            }
            let canvas = document.createElement("canvas"),
              cxt = canvas.getContext('2d');
            //根据拍摄的角度进行图片旋转调整
            if (self.Orientation == 3) {
              canvas.width = resizeW;
              canvas.height = resizeH;
              cxt.rotate(Math.PI);
              cxt.drawImage(IMG, 0, 0, -resizeW, -resizeH)
            } else if (self.Orientation == 8) {
              canvas.width = resizeH;
              canvas.height = resizeW;
              cxt.rotate(Math.PI * 3 / 2);
              cxt.drawImage(IMG, 0, 0, -resizeW, resizeH)
            } else if (self.Orientation == 6) {
              canvas.width = resizeH;
              canvas.height = resizeW;
              cxt.rotate(Math.PI / 2);
              cxt.drawImage(IMG, 0, 0, resizeW, -resizeH)
            } else {
              canvas.width = resizeW;
              canvas.height = resizeH;
              cxt.drawImage(IMG, 0, 0, resizeW, resizeH)
            }
            //base64,最终输出的压缩文件
            self.base64 = canvas.toDataURL('image/jpeg', maxSize.level);
            self.upImgSrc = self.base64;
          }
        };
      }
    },
      applyRefund () {
        if (this.serviceTypeTxt == '请选择服务类型') {
          Toast({
            message: '请选择服务类型',
            position: 'bottom',
            duration: 2000
          })
          return false
        }
        if (this.refundReasonTxt == '请选择退款原因') {
          Toast({
            message: '请选择退款原因',
            position: 'bottom',
            duration: 2000
          })
          return false
        }
        if (this.imgs == '') {
          Toast({
            message: '请选择一张图片',
            position: 'bottom',
            duration: 2000
          })
          return false
        };
        if (this.isRef) {
          this.isRef = false;
          this.AGBtnTxt = '正在上传，请稍等......';
          let form = this.$qs.stringify({
            token: token,
            order_id: this.AG.id,
            refund_reason: this.refundReasonTxt,
            refund_desc: this.txtText,
            file: this.imgs
          });
          api.refund(form)
            .then(res => {
              if (res.code === 200) {
                Toast({
                  message: res.msg,
                  position: 'bottom',
                  duration: 2000
                });
                setTimeout(() => {
                  window.history.go(-1)
                },2000);

              } else {
                Toast({
                  message: res.msg,
                  position: 'bottom',
                  duration: 2000
                });
                this.isRef = true;
                this.AGBtnTxt = '提交申请';
              }
            })
            .catch(err => {
              console.log(err)
              this.isRef = true;
              this.AGBtnTxt = '提交申请';
            })
        }
      }
    },
    created () {
      this.AG = JSON.parse(localStorage.getItem('applyRefundGoods'))
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/applyRefund.less";
  @import "../../assets/less/confirmOrder.less";
</style>

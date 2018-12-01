<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>代理费分期
    </div>
    <div class="borrowing-container">
      <div class="borrowing-head">
        <h1 class="borrowing-head-title">代理费分期金额</h1>
        <div class="borrowing-head-chose">
          <p><input type="radio" id="v1" name="borrow-num" value="1" v-model="borrowInfo.money"><label for="v1">30000</label></p>
          <!--<p><input type="radio" id="v2" name="borrow-num" value="2" v-model="borrowInfo.money"><label for="v2">60000</label></p>-->
          <!--<p><input type="radio" id="v3" name="borrow-num" value="3" v-model="borrowInfo.money"><label for="v3">90000</label></p>-->
        </div>
      </div>
      <div class="borrowing-info">
        <h1 class="borrowing-head-title">个人信息</h1>
        <div class="borrowing-info-center">
          <!--<router-link to="/bankManage/1">
            <div class="borrowing-info-list">
              <span class="borrowing-info-title">银行账户</span>
              <input type="text" placeholder="请选择到账账户" readonly disabled v-model="bankAccount">
            </div>
          </router-link>-->
          <div class="borrowing-info-list">
            <span class="borrowing-info-title">真实姓名</span>
            <input type="text" placeholder="请输入真实姓名" v-model="borrowInfo.realName">
          </div>
          <div class="borrowing-info-list">
            <span class="borrowing-info-title">身份证号</span>
            <input type="text" placeholder="请输入身份证号" v-model="borrowInfo.idNum">
          </div>
          <div class="borrowing-info-list">
            <span class="borrowing-info-title">预留电话</span>
            <input type="number" placeholder="请输入银行预留电话" v-model="borrowInfo.tel">
          </div>
          <div class="borrowing-info-pto">
            <p>手持身份证半身照</p>
            <div class="bit-center">
              <img :src="borrowInfo.imgs" alt="" v-if="borrowInfo.isUp">
              <img src="../../assets/images/upp.jpg" alt="" v-if="!borrowInfo.isUp">
              <input type="file"  ref="inputer"  accept="image/*" @change = 'addImg'>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="borrowing-agreement">
      <input type="checkbox" id="agreement" v-model="borrowInfo.agree" @click="ag">
      <label for="agreement">我已经阅读并同意 </label><span @click="readAgreement(0)">《用户分期协议》</span>
    </div>
    <div class="borrowing-btn" @click="borrowMoney" :class="{'borrowing-btn-c': !isC}">{{btnTxt}}</div>
    <div class="agreement-container" :style="aClass">
      <div class="agreement-center">
        <h4>新E家商城代理费分期付款协议</h4>
        <h1>特别提醒：在用户（以下简称“您”或“付款人”）确认同意《代理费分期付款协议》（以下简称“本协议”或“本业务”）之前，应事先
          了解本协议条款的全部内容，仔细阅读本协议。一旦您签署本协议或使用本业务 ，即视为您已充分阅读并理解本协议所有条款的含义及
          相应法律后果，同意以书面形式签订本协议，并同意受本协议约束。
        </h1>
        <h5>一、声明与承诺 </h5>
        <p>（一）在接受本协议之前，请您仔细阅读本协议的全部内容。如果您不同意本协议的任意内容，或者无法准确理解本公司对条款的解释，请不要进行后续操作。</p>
        <p>（二）您同意，如本公司需要对本协议进行变更或修改的，须提前予以公布，公告期限届满后即时生效；若您在本协议内容公告变更生效后继续保留代理资格，表示您
          已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容；若您不同意变更后的协议内容，您应在变更生效前停止使用。</p>
        <p>（三）如您为无民事行为能力人或为限制民事行为能力人，例如您未满18周岁，则您应在监护人监护、指导下阅读本协议和使用本服务。若您非自然人，
          则您确认，在您取得代理资格时，您为在中国大陆地区合法设立并开展经营活动或其他业务的法人或其他组织，且您订立并履行本协议不受您所属、所居住或开展
          经营活动或其他业务的国家或地区法律法规的排斥。不具备前述条件的，您应立即终止签署本协议。 </p>
        <h5>第一条业务简介</h5>
        <p>1.代理费分期付款业务是南阳新E家商城为符合条件的新E家会员推广代理提供的代理费分期服务。也就是说新E家商城会员在获得代理资格需要支付30000元代理费，
          如果会员代理现有资金不够全额支付代理费时，可以申请分期付款的方式获得代理资格权限，提前获得90000资产包，然后会员可以按照分期付款协议分期支付代理费用。</p>
        <p>2.本业务仅限新E家商城会员账号状态正常、账号内数字资产正常、符合新E家商城代理费分期付款授信规则的新E家会员本人申请。</p>
        <h5>第二条代理费分期金额</h5>
        <p>1.您所申请的代理费分期金额以本协议签署的金额为准。</p>
        <h5>第三条费用计收规则</h5>
        <p>1）技术服务费：在您申请本业务时，新E家商城将向您收取系统技术服务费，服务费按照代理费金额的3%收取。利息：您选择分期付款时，
          新E家商城按分期付款的实际天数向您计收利息，分期付款实际利率（0.06%/天） 、应分期付款日以经您确认的协议时间为准。已经签署协议
          执行利率固定不变，不受人民银行基准利率调整的影响。</p>
        <h5>第四条第四条分期还款基本信息</h5>
        <p>
          <i>还款金额：首期还款：3690</i>
          <i>11期还款：3040</i>
          <i>还款期限： 12期</i>
          <i>还款方式：等额本金</i>
          <i>还款日:签订协议日起，次月当日（15：00之前）</i>
        </p>

        <h5>第五条还款方式</h5>
        <p>用户使用本业务发生的欠款，应在“还款日期”之前将应还款额，通过转账或其他支付渠道直接偿还。</p>
        <h5>第六条用户授权</h5>
        <p>1.用户理解并同意，如用户未按期履行还款义务产生个人逾期行为，新E家商城均有权冻结您在新
          E家商城里会员账号，包含账号相关数字资产。用户同意不会因此追究新E家商城承担任何法律责任。</p>
        <p>2.用户理解并同意，新E家商城有权通过短信、电话、社交账号等途径对用户进行服务与还款等事项的提醒和通知。</p>
        <h5>第七条法律适用</h5>
        <p>本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生之争议，
          均应依照中华人民共和国法律予以处理，并由被告住所地人民法院管辖。</p>

        <h5>第八条生效</h5>
        <p>本协议为电子档文本，客户点“同意”后生效。</p>
        <button @click="readAgreement(1)">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import EXIF from '@/assets/js/exif.js';
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "borrowing",
    data () {
      return {
        borrowInfo: {
          money: '1',
          imgs: '',
          isUp: false,
          realName: '',
          idNum: '',
          tel: '',
          agree: false,
          agreeNum: '0',
          upImgSrc: ''
        },
        bankAccount:'',
        bankId: '',
        aClass: '',
        an:'top:0rem;transition-duration: .8s;',
        an0:'top:100%;transition-duration: .8s;',
        btnTxt: '申请分期',
        isC: true,

        num:0,  //上传图片数量
        base64:'' ,  //压缩后的图片
        imgData:[],   //图片
        data:{base64:''},
        imgType:2,     //图片上传的状态  0：图片已经成功上传  1表示图片在上传中 2表示图片还没上传,
        img_loading:false,
        Orientation:''  ,    //图片的拍摄角度
        z_tel: /^1(3|4|5|6|7|8|9)\d{9}$/

      }
    },
    methods: {
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
            self.borrowInfo.imgs = IMG.src
            self.borrowInfo.isUp = true
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
              self.borrowInfo.upImgSrc = self.base64
            }
          };
        }
      },
      borrowMoney () {
        let t = this;
        if (!t.borrowInfo.money) {
          Toast('请选择贷款金额！！！');
          return false;
        };
        if (!t.borrowInfo.realName) {
          Toast('请填写真实姓名！！！');
          return false;
        };
        if (!t.borrowInfo.idNum) {
          Toast('请填写身份证账号！！！');
          return false;
        };
        /*if (!t.bankAccount) {
          Toast('请选择银行卡号！！！');
          return false;
        };*/
        if (!t.borrowInfo.tel) {
          Toast('请填写预留手机号！！！');
          return false;
        };
        if (t.z_tel.test(t.borrowInfo.tel) === false) {
          Toast('您的电话号码格式有误!');
          return false;
        };
        if (!t.borrowInfo.isUp) {
          Toast('请上传手持身份证半身照！！！');
          return false;
        };
        if (!t.borrowInfo.agree) {
          Toast('请认真阅读并同意协议！！！');
          return false;
        };
        if (this.isC) {
          this.isC = false;
          this.btnTxt = '正在提交中，请稍等...';
          let form = this.$qs.stringify({
            token: token,
            // bank_id: t.bankId,
            id_number: t.borrowInfo.idNum,
            apply_level: t.borrowInfo.money,
            name: t.borrowInfo.realName,
            phone: t.borrowInfo.tel,
            id_photo: t.borrowInfo.upImgSrc,
            agree_to_agreement: t.borrowInfo.agreeNum
          });
          api.borrowIt(form)
            .then(res => {
              if (res.code === 200) {
                Toast({
                  message: '分期成功，请等待审核！',
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.back(-1);
                },2300)
              } else {
                Toast(res.msg);
                this.isC = true;
                this.btnTxt = '申请分期';
              }
            })
            .catch(err => {
              Toast(err)
              console.log(err)
            })
        } else {
          Toast('正在提交中，请稍等...')
        }


      },
      readAgreement (idx) {
        switch (idx) {
          case 0:
            this.aClass = this.an;
            break;
          case 1:
            this.aClass = this.an0;
            break;
          default:
            return false;
        };
      },
      ag () {
        if (this.borrowInfo.agree) {
          this.borrowInfo.agreeNum = '0'
        } else {
          this.borrowInfo.agreeNum = '1'
        };
      }
    },
    created () {
      let borrow = JSON.parse(localStorage.getItem('borrow'));
      let borrowLeave = JSON.parse(localStorage.getItem('borrowLeave'));
      if (borrow) {
        this.bankAccount = borrow.card + '  ' + '（' + borrow.account + '）' ;
        this.bankId = borrow.id;
      };
      if (borrowLeave) {
        this.borrowInfo = borrowLeave;
      };
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/borrowing";
</style>

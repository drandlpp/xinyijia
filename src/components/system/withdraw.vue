<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>提现
    </div>
    <div class="wd-container">
      <router-link to="/bankManage/0">
        <div class="wd-chose-card" >
          <div class="wd-c-img"><img :src="imgUrl + defaultCard.img" :alt="defaultCard.name"></div>
          <div class="wd-c-info">
            <p class="c-name">{{defaultCard.name}}</p>
            <p class="c-num">{{defaultCard.num}}</p>
          </div>
          <div class="wd-c-back"><i class="icon icon-right"></i></div>
        </div>
      </router-link>
      <div class="wd-center">
        <p class="wd-count">提现金额（手续费1%<i style="color: #ff3b30">[暂不收取]</i>，剩余次数<span>{{withdrawCount}}</span>次）</p>
        <div class="wd-num">
          <span>¥</span>
          <input type="number" placeholder="0" v-model="withdrawNum">
        </div>
        <p class="wd-balance">余额<span>{{balance}}</span>积分</p>
      </div>
      <button class="wd-btn" @click='withdraw'>预计24小时到账，确认提现</button>
    </div>
    <pay @hidden="hiddenShow" @password="passwordGro" :password="applyPsd" v-show="payPop"></pay>
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
    name: "withdraw",
    data () {
      return {
        withdrawCount: 0,
        withdrawNum: '',
        balance: '3000.00',
        imgUrl: imgUrl,
        defaultCard: {
          img: '',
          name: '',
          num: '',
          id: ''
        },
        applyPsd: '123456',
        payPop: false,
      };
    },
    components: {
      pay
    },
    methods: {

      withdraw () {
        if (this.withdrawCount == 0) {
          Toast('暂无提现次数！');
          return false;
        };
        if (!this.withdrawNum) {
          Toast('提现金额不能为空！');
          return false;
        };
        if (parseInt(this.withdrawNum) > parseInt(this.balance)) {
          Toast('提现金额不能大于余额！');
          return false;
        };
        if (parseInt(this.withdrawNum)%100 !== 0) {
          Toast('提现金额须为100的整倍数！');
          return false;
        };
        this.payPop = true;
      },
      hiddenShow () {
        let that = this;
        that.payPop = false
      },
      passwordGro (e) {
        this.applyPsd = e
        let psw = this.applyPsd.toString().replace(/,/g, '')
        if ( this.applyPsd.length === 6) {
           let form = this.$qs.stringify({
           token: token,
           money: this.withdrawNum,
           payment_password: psw,
           bank_id: this.defaultCard.id,
           mark: ''
         });
         api.withdrawApply(form)
           .then(res => {
             if (res.code === 200) {
               Toast({
                 message: res.msg,
                 position: 'center',
                 duration: 2000
               })
               setTimeout(() => {
                 window.history.go(-1)
               },2500)
             } else {
               Toast({
                 message: res.msg,
                 position: 'center',
                 duration: 2000
               })
             }
           })
           .catch(err => {
             console.log(err)
           })
        }
      }
    },
    created () {
      // 获得用户默认银行卡
      let defCard = JSON.parse(localStorage.getItem('defCard'));
      if (defCard) {
        this.defaultCard.img = defCard.logo.bank_logo;
        this.defaultCard.name = defCard.bank;
        this.defaultCard.num = defCard.card;
        this.defaultCard.id = defCard.id;
      } else {
        api.getDefaultCard()
          .then(res => {
            if (res.code === 200) {
              if (res.data.length === 0) {
                MessageBox({
                  title: '提示',
                  message: '您还没有银行卡，是否去添加？',
                  showCancelButton: true
                })
                  .then(res => {
                    if (res == 'confirm') {
                      this.$router.push('/bankManage/0');
                    } else {
                      window.history.go(-1);
                    }
                  })
              } else {
                this.defaultCard.img = res.data.logo.bank_logo;
                this.defaultCard.name = res.data.bank;
                this.defaultCard.num = res.data.card;
                this.defaultCard.id = res.data.id;
              }
            };
          })
          .catch(err => {
            console.log(err)
          });
      };
      // 获得用户可用积分、提现次数
      api.availableIntegral()
        .then(res => {
          if (res.code === 200) {
            this.balance = res.data.ready_points;
            this.withdrawCount = res.data.available_withdrawals
          } else {
            Toast(res.msg);
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

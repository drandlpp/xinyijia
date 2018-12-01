<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>添加银行卡
    </div>
    <div class="abc-container">
      <div class="abc-list"><span class="abc-title">持卡人</span><input type="text" placeholder="请输入持卡人姓名" v-model="bank.name"></div>
      <div class="abc-list"><span class="abc-title">手机号</span><input type="number" placeholder="请输入预留手机号" v-model="bank.tel"></div>
      <div class="abc-list"><span class="abc-title">身份证号</span><input type="text" placeholder="请输入个人身份信息" v-model="bank.idNum"></div>
      <div class="abc-list"><span class="abc-title">银行卡号</span><input type="number" placeholder="请输入银行卡号" v-model="bank.bankNum"></div>
      <div class="abc-list" @click="getCardPops()"><span class="abc-title">开户行</span><input type="text" placeholder="请选择开户行" readonly disabled v-model="bank.bank"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPops()"><span class="abc-title">开户省份</span><input type="text" placeholder="请选择开户省份" readonly disabled v-model="bank.province"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPops()"><span class="abc-title">开户城市</span><input type="text" placeholder="请选择开户城市" readonly disabled v-model="bank.city"><i class="icon icon-right"></i></div>
      <div class="abc-list" @click="getCardPops()"><span class="abc-title">开户支行</span><input type="text" placeholder="请选择开户支行" readonly disabled v-model="bank.area"><i class="icon icon-right"></i></div>
    </div>
    <button class="abc-btn" @click="addBankCard()">确认添加</button>
    <bank @hidden="hiddenShow" v-show="bankPop"></bank>
  </div>
</template>

<script>
  import bank from '../comp/bank.vue'
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "add-bank-card",
    data () {
      return {
        cardPop: false,
        bankPop: false,
        bankString: [],
        bank:{
          name: '',
          tel: '',
          idNum: '',
          bankNum: '',
          bank: '',
          province: '',
          city: '',
          area: '',
          code: ''
        }
      }
    },
    components: {
      bank
    },
    methods: {
      getCardPops () {
        this.bankPop = true
      },
      hiddenShow (e) {
        if (e === 0) {

        } else {
          this.bankString = e.abc.split(' ');
          this.bank.code = e.code;
          this.bank.bank =  this.bankString[0];
          this.bank.province =  this.bankString[1];
          this.bank.city =  this.bankString[2];
          this.bank.area =  this.bankString[3];
        }
        this.bankPop = false
      },
      addBankCard () {
        if (!this.bank.name) {
          Toast("持卡人姓名不能为空！");
          return false;
        };
        if (!this.bank.tel) {
          Toast("手机号不能为空！");
          return false;
        };
        if (!this.bank.idNum) {
          Toast("请输入身份证号码！");
          return false;
        };
        if (!this.bank.bankNum) {
          Toast("请输入银行卡号！");
          return false;
        };
        if (!this.bank.bank) {
          Toast("请选择开户行！");
          return false;
        };
        if (!this.bank.province) {
          Toast("请选择开户省份！");
          return false;
        };
        if (!this.bank.city) {
          Toast("请选择开户城市！");
          return false;
        };
        if (!this.bank.area) {
          Toast("请选择开户支行！");
          return false;
        };
        let form = this.$qs.stringify({
          token: token,
          bank:this.bank.bank,
          account: this.bank.name,
          id_number: this.bank.idNum,
          phone: this.bank.tel,
          card: this.bank.bankNum,
          bank_code_name: this.bank.area,
          bank_code: this.bank.code
        });
        api.addBank(form)
          .then(res => {
            if (res.code === 200) {
              Toast({
                message: '添加成功',
                position: 'center',
                duration: 2000
              })
              setTimeout(() => {
                window.history.go(-1)
              },2500)
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err)
          })

      }
    },
    created () {
      api.getBankInfo()
        .then(res => {
          if (res.code === 200) {
            this.bankInfo=res.data;
          }
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/addBankCard";
</style>

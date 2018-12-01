<template>
    <div class="wrapper">
      <div class="abc-bank-container">
        <div class="abc-bank-cancel" @click="cancelAbc"></div>
        <div class="abc-card-info">
          <div class="abc-chose-card">
            <p class="c-title">
              <span v-for="(bc, index) in bankChoseTitle" :key="index" :class="{'chose-on':index===choseIndex}" @click="titleOn(index)">{{bc}}</span>
            </p>
            <div class="bank-info-container">
              <div class="bank-info-center" :style="anName">
                <div class="bi-bank">
                  <p v-for="(bi, index) in bankInfo" :key="index" @click="nextInfo(0, bi, index)" :class="{'ci-on':index===allCk}">{{bi.bank_name}}</p>
                </div>
                <div class="bi-pro">
                  <p v-for="(bp, index) in bankPro" :key="index" @click="nextInfo(1, bp, index)" :class="{'ci-on':index===proCk}">{{bp.province}}</p>
                </div>
                <div class="bi-city">
                  <p v-for="(bc, index) in bankCity" :key="index" @click="nextInfo(2, bc, index)" :class="{'ci-on':index===cityCk}">{{bc.area}}</p>
                </div>
                <div class="bi-dis">
                  <p v-for="(bd, index) in bankDis" :key="index" @click="nextInfo(3, bd, index)" :class="{'ci-on':index===disCk}">{{bd.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "bank",
    data () {
      return {
        bankChoseTitle:['开户行','开户省份','开户城市','开户支行'],
        choseIndex:0,
        bankInfo: [],
        allCk: -1,
        choseBank: '',
        bankPro: [],
        proCk: -1,
        choseBankPro: '',
        bankCity: [],
        cityCk: -1,
        choseBankCity: '',
        bankDis: [],
        disCk: -1,
        choseBankDis: '',
        anName:'',
        an0:'transform: translateX(0rem);transition-duration: .5s;',
        an1:'transform: translateX(-3rem);transition-duration: .5s;',
        an2:'transform: translateX(-6rem);transition-duration: .5s;',
        finalAbc:[],
        code: ''
      };
    },
    methods: {
      titleOn (idx) {
        switch (idx) {
          case 0:
            this.anName = this.an0;
            break;
          case 1:
            if (this.bankCity.length === 0) {
              alert("请选择开户行");
              return false
            };
            this.anName = this.an1;
            break;
          case 2:
            if (this.bankDis.length === 0) {
              alert("请选择开户省份");
              return false
            };
            this.anName = this.an2;
            break;
          case 3:
            if (this.bankDis.length === 0) {
              alert("请选择开户城市");
              return false
            };
            break;
        }
        this.choseIndex = idx
      },
      nextInfo (idx, ele, index) {
        switch (idx) {
          case 0:
            this.choseBank = ele.bank_name;
            this.allCk = index;

            this.bankPro = [];
            this.proCk = -1;
            this.choseBankPro = '';

            this.bankCity = [];
            this.cityCk = -1;
            this.choseBankCity = '';

            this.bankDis = [];
            this.choseBankDis = '';

            api.getBankInfoPro(this.choseBank)
              .then(res => {
                if (res.code === 200) {
                  this.bankPro = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });
            this.choseIndex = 1;
            break;
          case 1:
            this.choseBankPro = ele.province;
            this.proCk = index;
            this.anName = this.an1;

            this.bankCity = [];
            this.cityCk = -1;
            this.choseBankCity = '';

            this.bankDis = [];
            this.choseBankDis = '';
            api.getBankInfoCity({bank:this.choseBank, pro:this.choseBankPro})
              .then(res => {
                if (res.code === 200) {
                  this.bankCity = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });

            this.choseIndex = 2;
            break;
          case 2:
            this.choseBankCity = ele.area;
            this.cityCk = index;
            this.anName = this.an2;

            this.bankDis = [];
            this.choseBankDis = '';
            api.getBankInfoDis({bank:this.choseBank, pro:this.choseBankPro, dis:this.choseBankCity})
              .then(res => {
                if (res.code === 200) {
                  this.bankDis = res.data
                }
              })
              .catch(err => {
                console.log(err)
              });

            this.choseIndex = 3;
            break;
          case 3:
            this.finalAbc = {
              abc: this.choseBank +' '+ this.choseBankPro +' '+ this.choseBankCity +' '+ ele.name,
              code: ele.code,
            };
            this.$emit('hidden',this.finalAbc);
            break;
        }
      },
      cancelAbc () {
        this.$emit('hidden', 0);
        this.bankPro = [];
        this.bankCity = [];
        this.bankDis = [];
        this.anName = this.an0;
        this.choseIndex = 0;
        this.allCk = -1;
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
  @import "../../assets/less/bank";
</style>

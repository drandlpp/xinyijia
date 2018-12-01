<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>修改{{txt}}密码
    </div>
    <div class="mp-container">
      <div class="mp-list"><span class="mp-title">原密码</span><input type="password" placeholder="请输入原密码" v-model="op"  @blur="verifyCode"></div>
      <div class="mp-list"><span class="mp-title">新密码</span><input type="password" placeholder="请输入新密码" v-model="np"></div>
      <div class="mp-list"><span class="mp-title">确认密码</span><input type="password" placeholder="请重复新密码" v-model="cp"></div>
    </div>
    <button class="mp-btn" @click="cpModify">确认修改</button>
  </div>
</template>
<style scoped lang="less">
  .mp-container{
    margin: 1rem auto;
    width: 94%;
    height: auto;
    background: white;
    padding: .2rem 3%;
    .mp-list{
      width: 100%;
      height: .85rem;
      border-bottom: 1px #e2e2e2 solid;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .mp-title{
        display: block;
        width: 22%;
        text-indent: .5em;
        font-size: .26rem;
      }
      input{
        border: none;
        background: none;
        font-size: .24rem;
        width: 75%;
      }
    }
  }
  .mp-btn{
    display: block;
    width: 5.4rem;
    margin: 0 auto;
    height: .785rem;
    border-radius: .15rem;
    font-size: .3rem;
    color: white;
    background: #60adff;
  }
</style>
<script>
  let token = localStorage.getItem('token')
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "modify-password",
    data () {
      return {
        way: parseInt(this.$route.params.way),
        txt: '',
        op: '',
        np: '',
        cp: '',
        isD: true
      };
    },
    methods: {
      verifyCode () {
        let form = this.$qs.stringify({
          token: token,
          password: this.op
        });
        if (this.way === 0) {
          api.verifyLoginPsd(form)
            .then(res => {
              if (res.code === 200) {
                this.isD = false;
              }
            });
        };
        if (this.way === 1) {
          api.verifyPayPsd(form)
            .then(res => {
              if (res.code === 200) {
                this.isD = false;
              }
            });
        };
      },
      cpModify () {
        let way = parseInt(this.$route.params.way);
        if (this.isD) {
          Toast('您的原密码不对，请重新输入');
          return false;
        };
        if (!this.np) {
          Toast('新密码不能为空！');
          return false;
        };
        if (this.np !== this.cp) {
          Toast('两次密码不一致，请重新核对！！！');
          return false;
        };
        let MP = this.$qs.stringify({
          token: token,
          password: this.np,
          password_confirmation: this.cp
        });
        if (way === 0) {
          api.resetLogin(MP)
            .then(res => {
              if (res.code === 200) {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.back(-1)
                },2300)
              } else {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
              };
            });
        };
        if (way === 1) {
         if (!/^\d{6}$/.test(this.np)) {
           Toast('支付密码只能是6位数字!');
           return false;
         };
          if (/^(\d)\1+$/.test(this.np)) {
            Toast('支付密码不能为6位相同数字!');
            return false;
          };
          api.resetPay(MP)
            .then(res => {
              if (res.code === 200) {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.back(-1)
                },2300)
              } else {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
              };
            });
        };
      }
    },
    created () {
      let way = parseInt(this.$route.params.way);
      if (way === 0) {
        this.txt = '登录';
      };
      if (way === 1) {
        this.txt = '支付';
      }
    }
  }
</script>

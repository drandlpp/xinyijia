<template>
  <div class="wrapper">
    <div class="login-container" :style="{'height': height + 'px'}">
      <div class="register-center">
        <div class="register-list">
          <span class="register-title">推荐码</span>
          <input type="text" class="register-input" v-model="recommendCode">
        </div>
        <!--<div class="register-list">
          <span class="register-title">会员等级</span>
          <div class="register-deg">
            <p>
              <input type="radio" name="deg" id="number" v-model="memberDeg" value="1">
              <label for="number">总代</label>
            </p>
            <p>
              <input type="radio" name="deg" id="agency" v-model="memberDeg" value="2">
              <label for="agency">代理</label>
            </p>
          </div>
        </div>-->
        <div class="register-list">
          <span class="register-title">手机号</span>
          <input type="number" placeholder="请输入您的手机号" class="register-input" v-model="registerTel">
        </div>
        <div class="register-list register-list-code">
          <span class="register-title">验证码</span>
          <input type="number" placeholder="验证码" class="register-input" v-model="verificationCode">
          <button class="register-get-code" :class="{'haveSend': isSend}" @click="getVerificationCode">{{verificationCodeTxt}}</button>
        </div>
        <div class="register-list">
          <span class="register-title">真实姓名</span>
          <input type="text" placeholder="请输入您的真实姓名" class="register-input" v-model="realName">
        </div>
        <div class="register-list">
          <span class="register-title">登录密码</span>
          <input type="password" placeholder="设置登录密码" class="register-input" v-model="password">
        </div>
        <div class="register-list">
          <span class="register-title">确认密码</span>
          <input type="password" placeholder="再次输入登录密码" class="register-input" v-model="confirmPassword">
        </div>
        <div class="register-list">
          <span class="register-title">支付密码</span>
          <input type="password" placeholder="输入6位数字密码" class="register-input" v-model="applyPassword">
        </div>
        <button class="register-btn" @click="register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import api from '../../assets/js/api.js'
  export default {
    name: "register",
    data () {
      return {
        height: 0,
        recommendCode: '',
        // memberDeg: '',
        registerTel: '',
        verificationCode: '',
        realName: '',
        password: '',
        confirmPassword: '',
        applyPassword: '',
        z_tel: /^1(3|4|5|6|7|8|9)\d{9}$/,
        isSend: false,
        verificationCodeTxt:'获取验证码',
      }
    },
    methods: {
      ctimer (time) {
        var t = time
        var that = this
        if (t > 0) {
          this.isSend = true
          this.verificationCodeTxt = t + 's后重发'
          t--
          setTimeout(function () {
            that.ctimer(t)
          }, 1000)
        } else {
          this.isSend = false
          this.verificationCodeTxt = '获取验证码'
        }
      },
      getVerificationCode () {
        if (!this.registerTel) {
          Toast('请填写电话号码!')
          return false
        };
        if (this.z_tel.test(this.registerTel) === false) {
          Toast('您的电话号码格式有误!');
          return false
        };
        if (this.isSend) {
          Toast('请稍后点击！');
          return false;
        } else {
          let pho = this.$qs.stringify({
            phone: this.registerTel
          })
          api.getSMSVerification(pho)
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                Toast({
                  message: res.msg,
                  position: 'bottom',
                  duration: 2000
                });
                this.ctimer(60);
              } else {
                Toast({
                  message: res.msg,
                  position: 'bottom',
                  duration: 2000
                });
              }
            })
            .catch(err => {
              Toast({
                message: '网络延时，请稍后重试',
                position: 'bottom',
                duration: 2000
              });
            })
        };
      },
      register () {
        if (!this.registerTel) {
          Toast('请填写电话号码!');
          return false;
        };
        if (this.z_tel.test(this.registerTel) === false) {
          Toast('您的电话号码格式有误!');
          return false;
        };
        if (!this.verificationCode) {
          Toast('请填写验证码!');
          return false;
        };
        if (!this.realName) {
          Toast('请填写您的真实姓名!');
          return false;
        };
        if (!this.password) {
          Toast('请填写登录密码!');
          return false;
        };
        if (this.password.length < 6 || this.password.length > 16) {
          Toast('请输入6-16位密码');
          return false;
        };
        if (this.password !== this.confirmPassword) {
          Toast('两次密码不一致，请重新核对！！！');
          return false;
        };
        if (!/^\d{6}$/.test(this.applyPassword)){
          Toast('支付密码只能是6位数字!');
          return false;
        };
        if (/^(\d)\1+$/.test(this.applyPassword)) {
          Toast('支付密码不能为6位相同数字!');
          return false;
        };
        if (!this.applyPassword) {
          Toast('请填写支付密码!');
          return false;
        } else if (this.applyPassword.length != 6) {
          Toast('支付密码只能是6位数字');
          return false;
        };
        let form = this.$qs.stringify({
          phone: this.registerTel,
          recommend_phone: this.recommendCode,
          realname: this.realName,
          password: this.password,
          payment_password:this.applyPassword,
          code: this.verificationCode
          // account_type: this.memberDeg
        });
        api.register(form)
          .then(res => {
            if (res.code === 200) {
              Toast({
                message: res.msg,
                position: 'bottom',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push('/login')
              },2300);
            } else {
              Toast({
                message: res.msg,
                position: 'bottom',
                duration: 2000
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    created () {
      this.height = document.documentElement.clientHeight;
      // console.log(document.documentElement.clientHeight)
      // console.log(this.height)
      let url = window.location.href.substring()
      // let url = 'http://wap.xinyijiamall.com/#/register?phone=15236058819&account_type=3'
      if (url.indexOf('?') == -1) {
        this.recommendCode = ''
      } else {
        let a1 = url.split('?');
        let a2 = a1[1].split('&');
        let a3 = a2[0].split('=');
        this.recommendCode = a3[1]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/login";
</style>

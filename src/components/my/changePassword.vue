<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{title}}
    </div>
    <div class="cp-container">
      <div class="cp-tel"><input type="number" placeholder="请输入您的手机号" v-model="tel"></div>
      <div class="cp-reg"><input type="number" placeholder="请输入验证码" v-model="VCode"><span :class="{'send-on': send}" @click="getVerificationCode">{{verificationCodeTxt}}</span></div>
      <div class="cp-tel"v-if="id == 0"><input type="password" placeholder="设置新密码" v-model="newPsd"></div>
      <div class="cp-tel" v-if="id != 0"><input type="password" placeholder="设置新密码（6位数字）" v-model="newPsd"></div>
      <div class="cp-tel"><input type="password" placeholder="请再次输入新密码" v-model="psdOnce"></div>
      <p class="cp-btn" @click="changeBtn">确认修改</p>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "change-login-password",
    data () {
      return {
        title: '',
        id: this.$route.params.id,
        send: false,
        verificationCodeTxt:'获取验证码',
        tel: '',
        VCode: '',
        newPsd: '',
        psdOnce: '',
        z_tel: /^1(3|4|5|6|7|8|9)\d{9}$/,
      };
    },
    methods: {
      ctimer (time) {
        var t = time
        var that = this
        if (t > 0) {
          this.send = true
          this.verificationCodeTxt = t + 's后重发'
          t--
          setTimeout(function () {
            that.ctimer(t)
          }, 1000)
        } else {
          this.send = false
          this.verificationCodeTxt = '获取验证码'
        }
      },
      getVerificationCode () {
        if (!this.tel) {
          Toast('请填写电话号码!')
          return false
        };
        if (this.z_tel.test(this.tel) === false) {
          Toast('您的电话号码格式有误!');
          return false
        };
        if (this.send) {
          Toast('请稍后点击！');
          return false;
        } else {
          let pho = this.$qs.stringify({
            phone: this.tel
          })
          api.getSMSVerification(pho)
            .then(res => {
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
      changeBtn () {
        if (!this.tel) {
          Toast('请填写电话号码!');
          return false;
        };
        if (this.z_tel.test(this.tel) === false) {
          Toast('您的电话号码格式有误!');
          return false;
        };
        if (!this.VCode) {
          Toast('请填写验证码!');
          return false;
        };
        if (!this.newPsd) {
          Toast('请填写新密码!');
          return false;
        };
        if (!this.psdOnce) {
          Toast('请填写确认密码!');
          return false;
        };
        if (this.id == 1) {
          if (!/^\d{6}$/.test(this.newPsd)){
            Toast('支付密码只能是6位数字!');
            return false;
          };
          if (/^(\d)\1+$/.test(this.newPsd)) {
            Toast('支付密码不能为6位相同数字!');
            return false;
          };
        };
        if (this.newPsd !== this.psdOnce) {
          Toast('两次密码填写不一致!');
          return false;
        };
        let pto = this.$qs.stringify({
          phone:this.tel,
          code: this.VCode
        });
        api.checkSMS(pto)
          .then(e => {
            if (e.code === 200) {
              let resetPsd = this.$qs.stringify({
                password: this.newPsd,
                password_confirmation: this.psdOnce,
                phone: this.tel
              });
              api.forgetLoginPsd(resetPsd)
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
                  }
                })
                .catch(err => {
                  Toast(err);
                })
             /* if (this.id == 0) {

              };
              if (this.id == 1) {
                api.resetPay(resetPsd)
                  .then(res => {
                    console.log(res)
                  })
                  .catch(err => {
                    Toast(err);
                  })
              };*/
            }
          })
          .catch(e => {
            Toast(e)
          })
      }
    },
    created () {
      if (this.id == 0) {
        this.title = '修改登录密码';
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/changePassword";
</style>

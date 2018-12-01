<template>
  <div class="wrapper">
    <div class="login-container" :style="{'height': height + 'px'}">
      <div class="login-center">
        <h1 class="login-title">新易家</h1>
        <div class="login-form">
          <div class="login-list"><span>账号</span><input type="number" placeholder="请输入您的账号" v-model="account"></div>
          <div class="login-list"><span>密码</span><input type="password" placeholder="请输入您的密码" v-model="password"></div>
          <button class="login-btn" @click="login">登录</button>
        </div>
        <p class="login-register">
          <router-link to="/changePassword/0">
            <span>忘记密码？</span>
          </router-link>
          <router-link to="/register">
            <span>没有账号？立即注册</span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import api from '@/assets/js/api.js'
  export default {
    name: "login",
    data () {
      return {
        height: 0,
        account: '',
        password: '',
        userInfo: [],
        token: ''
      }
    },
    methods: {
      login () {
        if (!this.account) {
          Toast('账号不能为空！');
          return false;
        };
        if (!this.password) {
          Toast('密码不能为空！');
          return false;
        }
        api.login({
          account:this.account,
          password:this.password
        })
          .then(res => {
            if (res.code === 200) {
              Toast('登录成功！');
              // this.$router.push('/index');
              localStorage.setItem('token', res.data.token)
              // localStorage.setItem('userInfo', JSON.stringify(res.data.userinfo))
              window.location.href = '/index'
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
      // this.height = window.screen.height;
      this.height = document.documentElement.clientHeight;
      // console.log(window.screen.height)
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/login";
</style>

<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>设置
    </div>
    <div class="ser-container">
      <div class="set-center">
        <p class="set-title">个人信息</p>
        <p class="set-list"><span>登录账号</span><span>{{userTel}}</span></p>
        <p class="set-list"><span>会员身份</span><span>{{idDeg}}</span></p>
        <p class="set-list"><span>真实姓名</span><span>{{username}}</span></p>
      </div>
      <div class="set-center">
        <p class="set-title">安全设置</p>
        <router-link to="/bankManage/1"><p class="set-list"><span>银行卡管理</span><i class="icon icon-right"></i></p></router-link>
        <router-link to="/modifyPassword/0"><p class="set-list"><span>修改登录密码</span><i class="icon icon-right"></i></p></router-link>
        <router-link to="/modifyPassword/1"><p class="set-list"><span>修改支付密码</span><i class="icon icon-right"></i></p></router-link>
      </div>
      <button class="set-quit-login" @click="quitLogin">退出登录</button>
    </div>
  </div>
</template>

<script>
  let token = localStorage.getItem('token')
  import api from '@/assets/js/api.js'
  export default {
    name: "set",
    data () {
      return {
        idDeg: '',
        username: '',
        userTel: ''
      }
    },
    methods: {
      quitLogin () {
        localStorage.clear();
        this.$router.push('login');
      }
    },
    created () {
      if (!token) {
        window.location.href = '/#/login'
      } else {
        api.getUserInfo()
          .then(res => {
            this.userInfo = res.data;
            this.username = this.userInfo.realname;
            this.userTel = this.userInfo.phone;
            switch (parseInt(this.userInfo.account_type)) {
              case 1:
                this.idDeg = '会员';
                break;
              case 2:
                this.idDeg = '代理';
                break;
              case 3:
                this.idDeg = '总代';
                break;
              case 4:
                this.idDeg = '总监';
                break;
              case 5:
                this.idDeg = '联创';
                break;
              case 6:
                this.idDeg = '合伙人';
                break;
              case 7:
                this.idDeg = '股东';
                break;
            }
          })
        // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/set";
</style>

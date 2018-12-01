<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>关于我们
    </div>
    <div class="ab-container">
      <div class="ab-logo">
        <img src="../../assets/images/cLogo.png" alt="">
      </div>
      <p class="ab-introduce">{{txt}}</p>
      <div class="ab-copyright">
        <p> 版权信息:  wap.xinyijiamall.com All rights reserved.<br>豫ICP备18038220号 新易家公司</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  export default {
    name: "about-us",
    data () {
      return {
        txt: ''
      }
    },
    created () {
      api.aboutUs()
        .then(res => {
          this.txt = res.data
        })
    }
  }
</script>

<style scoped lang="less">
  .ab-container{
    width: 100%;
    height: auto;
    margin: 1rem 0;
    overflow: hidden;
    .ab-logo{
      width: 100%;
      /*height: 1rem;*/
      /*background: red;*/
      margin: 0.4rem auto 0.5rem;
      img{
        width: 40%;
        margin: 0 auto;
        display: block;
      }
    }
    .ab-introduce{
      font-size: .26rem;
      text-indent: 2em;
      padding: 0 .3rem;
      line-height: .5rem;
      letter-spacing: 2px;
    }
    .ab-copyright{
      position: fixed;
      bottom: .3rem;
      width: 100%;
      left: 0;
      p{
        text-align: center;
        font-size: .2rem;
        color: #999999;
        line-height: .4rem;
      }
    }
  }
</style>

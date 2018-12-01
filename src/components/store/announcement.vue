<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>系统公告
    </div>
    <div class="announcement">
      <p v-for="(an, index) in announcementList" :key="index">{{an}}</p>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  export default {
    name: "announcement",
    data () {
      return {
        announcementList: []
      }
    },
    created () {
      api.announcements()
        .then(res => {
          console.log(res)
          this.announcementList = res.data;
        })
    }
  }
</script>

<style scoped lang="less">
  .announcement{
    width: 100%;
    height: auto;
    margin: 1rem auto;
    p{
      font-size: .24rem;
      width: 90%;
      border-radius: .2rem;
      margin: .1rem auto;
      padding: .2rem;
      background: white;
    }
  }
</style>

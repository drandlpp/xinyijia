<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>我的团队
    </div>
    <div class="team-container">
      <div class="team-center">
        <div class="team-list" v-for="(tl, index) in teamList" :key="index">
          <p class="team-name-tel"><span class="t-name">{{tl.realname}}</span><span class="t-tel">{{tl.phone}}</span></p>
          <div class="team-deg">
            <p class="t-id">身份：
              <span v-if="tl.account_type == 1">会员</span>
              <span v-if="tl.account_type == 2">代理</span>
              <span v-if="tl.account_type == 3">总代</span>
              <span v-if="tl.account_type == 4">总监</span>
              <span v-if="tl.account_type == 5">联创</span>
              <span v-if="tl.account_type == 6">合伙人</span>
              <span v-if="tl.account_type == 7">股东</span>
            </p>
            <!--<p class="t-deg">
              <span v-if="tl.level == 1" style="color: purple">VIP1</span>
              <span v-if="tl.level == 2" style="color: #801051">VIP2</span>
              <span v-if="tl.level == 3" style="color: #803f0c">VIP3</span>
            </p>-->
          </div>
        </div>
        <p class="add-more" @click="teamAddMore" v-if="isMore">点击加载更多</p>
      </div>
      <div class="container-no-data" v-if="isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">您还没有团队，快去招募你的团队吧~</p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "teams",
    data () {
      return {
        isNo: false,
        teamList: [],
        page: 1,
        isMore: false
      }
    },
    methods: {
      teamAddMore () {
        this.page += 1;
        api.getTeams( this.page)
          .then(res => {
            if (res.data.length !== 0) {
              for (var i in res.data) {
                this.teamList.push((res.data)[i]);
              }
            } else {
                this.isMore = false;
            }
          })
      }
    },
    created () {
      api.getTeams(1)
        .then(res => {
          // console.log(res.data.length)
         if (res.code === 200) {
           if (res.data.length >= 10) {
             this.teamList = res.data;
             this.isMore = true
           } else if ((res.data.length === 0)) {
             this.isMore = false;
             this.isNo = true;
           } else if (res.data.length < 10) {
             this.teamList = res.data;
             this.isMore = false;
           }
         }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/earnings";
</style>

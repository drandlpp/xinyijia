<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>我的收益
    </div>
    <div class="earn-team-container">
      <div class="earn-team-head">
        <span :class="{'et-on': isET}" @click="etTab(0)">冻结中</span><span :class="{'et-on': !isET}" @click="etTab(1)">已解冻</span>
      </div>
      <div class="earn-team-center">
        <!--<div class="earn-team1"></div>-->
        <div class="earn-team-list" v-for="(ef, index) in eFrozen" :key="index" v-if="isET">
          <p><span class="et-name">{{ef.mark}}</span><span class="et-num">{{ef.money}}</span></p>
          <p><span class="et-day">冻结天数：<i>{{ef.countdown}}</i> 天</span><span class="et-time">冻结日期：{{ef.created_at}}</span></p>
        </div>
        <div class="earn-team-list" v-for="(el, index) in eList" :key="index" v-if="!isET">
          <p><span class="et-name">{{el.mark}}</span><span class="et-num">+{{el.money}}</span></p>
          <p><span class="et-day">已解冻</span><span class="et-time">解冻日期：{{el.conversion_at}}</span></p>
        </div>
        <p class="add-more" v-if="isMore" @click="eAddMore">点击加载更多</p>
        <div class="container-no-data" v-if="isNo">
          <img src="../../assets/images/no_data.png" alt="">
          <p class="no-data-txt2">您还没有此项列表数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/api.js'
import { Toast } from 'mint-ui'
export default {
  name: "earnings",
  data () {
    return {
      isET: true,
      eFrozen: [],
      eList: [],
      page: 1,
      page0: 1,
      isMore: true,
      isNo: false
    }
  },
  methods: {
    etTab (idx) {
      // this.isMore = true;
      this.page = 1;
      switch (idx) {
        case 0:
          this.isET = true;
         /* if (this.eFrozen.length === 0) {
            this.isMore = false;
          } else {
            this.isMore = true;
          }*/
         this.getF(this.page);
          break;
        case 1:
          this.isET = false;
         /* if (this.eList.length === 0) {
            this.isMore = false;
          } else {
            this.isMore = true;
          }*/
          this.getE(this.page);
          break;
        default:
          return false;
      };
    },
    eAddMore () {
      this.page += 1;
      if (this.isET) {
        api.getEarningsFrozen(this.page)
          .then(res => {
            if (res.data.length !== 0) {
              for (var i in res.data) {
                this.eFrozen.push((res.data)[i])
              }
            } else {
              Toast({
                message: '没有更多了！',
                position: 'bottom',
                duration: 1000
              });
              this.page = this.page -1;
              this.isMore = false;
            }
          })
          .catch(err => {
            console.log(err)
          });
      } else {
        api.getEarnings(this.page)
          .then(res => {
            if (res.data.length !== 0) {
              for (var i in res.data) {
                this.eList.push((res.data)[i])
              }
            } else {
              Toast({
                message: '没有更多了！',
                position: 'bottom',
                duration: 1000
              });
              this.page0 = this.page -1;
              this.isMore = false;
            }
          })
          .catch(err => {
            console.log(err)
          });
      }
    },
    getF (p) {
      api.getEarningsFrozen(p)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length !== 0) {
              this.eFrozen = res.data;
              this.isNo = false;
              this.isMore = true;
            } else {
              this.isNo = true;
              this.isMore = false;
            }
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
    getE () {
      api.getEarnings(1)
        .then(res => {
          if (res.code === 200) {
            if (res.data.length !== 0) {
              this.eList = res.data;
              this.isNo = false;
              this.isMore = true;
            } else {
              this.isNo = true;
              this.isMore = false;
            }
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  },
  created () {
   this.getF(this.page)
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/earnings";
</style>

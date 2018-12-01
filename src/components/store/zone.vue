<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a> {{zo.title}}
    </div>
    <div class="cd-container ">
        <ul v-if="!zo.isNo">
          <li v-for="(zl, index) in zo.zoneList" :key="index">
            <router-link :to="/detail/+zl.id">
              <div class="cd-goods-img">
                <img :src="zo.imgUrl + zl.default_img" alt="">
              </div>
              <p class="cd-goods-name">{{zl.name}}</p>
              <div class="goods-price"  v-if="zl.type == 1">
                <!--<p><i class="icon icon-x-integral"></i><span>{{zl.spec.points}}</span></p>-->
                <p><i class="icon icon-y-integral"></i><span style="color: #ff3b30;font-size: .3rem">{{zl.spec.points}}</span></p>
                <p style="color: #c3c3c3"><s>¥{{zl.spec.ready}}</s></p>
              </div>
              <div class="goods-price-integral" v-if="zl.type == 2">
                <!--<div>
                  <p class="spec"><i class="icon icon-x-integral"></i><span>{{zl.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{zl.spec.ready}}</p>
                </div>
                <div>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{zl.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{zl.spec.ready}}</p>
                </div>-->
                <p class="goods-price-rmb" style="color: #c3c3c3"><u>市场价：</u><b><span>¥</span>{{zl.spec.market}}</b></p>
                <!--<div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                  </div>-->
                <h3>会员价：<span>现金 + 积分</span></h3>
                <div>
                  <p><span class="price-rmb">¥</span>{{zl.spec.ready}}</p>
                  <u>+</u>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{zl.spec.points}}</span></p>
                </div>
              </div>
              <div class="goods-price-rmb" v-if="zl.type == 3">
                ¥ <span>{{zl.spec.ready}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      <div class="container-no-data" v-if="zo.isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">暂无此专区产品~</p>
      </div>
      <p class="add-more" style="margin-top: .15rem" v-if="zo.isMore" @click="zAdd">点击加载更多</p>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  import cache from '@/assets/js/catch.js'
  export default {
    name: "zone",
    data () {
      return {
        zo: {
          id: parseInt(this.$route.params.id),
          title: '',
          page: 1,
          zoneList: [],
          imgUrl: imgUrl,
          isNo: false,
          isMore: true,
        },
        cache: cache,
        comeId: parseInt(this.$route.params.id),
      };
    },
    methods: {
      zAdd () {
        this.zo.page += 1;
        api.getZone({
          page: this.zo.page,
          type: this.zo.id
        })
          .then(res => {
            if (res.data.length === 0) {
              this.zo.isMore = false;
              Toast('到底了......');
              this.page = this.zo.page - 1;
            } else {
              for (var i in res.data) {
                this.zo.zoneList.push((res.data)[i]);
              };
            };
          });
      },
    },
    beforeDestroy () {
      let currentData = this.zo;
      let d =parseInt((new Date().getTime())/1000);
      this.cache.setCache('leaveZo', {cd:currentData,lt:d})
    },
    created () {
      let cacheData = this.cache.getCache('leaveZo');
      if (cacheData) {
        let c =parseInt((new Date().getTime())/1000);
        let proTime = c - cacheData.lt;
        let cacheId = cacheData.cd.id;
        if (proTime >= 3600 || this.comeId !== cacheId) {
          switch (this.zo.id) {
            case 1:
              this.zo.title = '资产兑换专区';
              break;
            case 2:
              this.zo.title = '会员专区';
              break;
            case 3:
              this.zo.title = '298专区';
              break;
          };
          api.getZone({
            page: this.zo.page,
            type: this.zo.id
          })
            .then(res => {
              if (res.code === 200) {
                if (res.data.length === 0) {
                  this.zo.isNo = true;
                  this.zo.isMore = false;
                } else if (res.data.length >= 10) {
                  this.zo.isMore = true;
                  this.zo.isNo = false;
                } else {
                  this.zo.isMore = false;
                  this.zo.isNo = false;
                };
                this.zo.zoneList = res.data;
              }
            })
        } else {
          this.zo = cacheData.cd;
        }
      } else {
      switch (this.zo.id) {
        case 1:
          this.zo.title = '资产兑换专区';
          break;
        case 2:
          this.zo.title = '会员专区';
          break;
        case 3:
          this.zo.title = '298专区';
          break;
      };
      api.getZone({
        page: this.zo.page,
        type: this.zo.id
      })
        .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.zo.isNo = true;
              this.zo.isMore = false;
            } else if (res.data.length >= 10) {
              this.zo.isMore = true;
              this.zo.isNo = false;
            } else {
              this.zo.isMore = false;
              this.zo.isNo = false;
            };
            this.zo.zoneList = res.data;
          }
        })
      }

      /*switch (this.zo.id) {
        case 1:
          this.zo.title = '资产兑换专区';
          break;
        case 2:
          this.zo.title = '会员专区';
          break;
        case 3:
          this.zo.title = '298专区';
          break;
      };
      api.getZone({
        page: this.zo.page,
        type: this.zo.id
      })
        .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.zo.isNo = true;
              this.zo.isMore = false;
            } else if (res.data.length >= 10) {
              this.zo.isMore = true;
              this.zo.isNo = false;
            } else {
              this.zo.isMore = false;
              this.zo.isNo = false;
            };
            this.zo.zoneList = res.data;
          }
        })*/
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classifyDetail";
</style>

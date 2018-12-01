<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{bdz.band.name}}
    </div>
    <div class="bz-container">
      <div class="bz-head">
        <div class="bz-img">
          <img :src="bdz.imgUrl + bdz.band.logo" :alt="bdz.band.name">
        </div>
        <div class="bz-info">
          <p class="bz-name">{{bdz.band.name}}</p>
          <p class="bz-des">{{bdz.band.desc}}</p>
        </div>
      </div>
      <div class="bz-center">
        <ul v-if="!bdz.isNo" class="bz-goods-container">
          <li class="bz-goods" v-for="(bz, index) in bdz.bzList" :key="index">
            <router-link :to="/detail/+bz.id">
              <div class="goods-img-box">
                <img :src="bdz.imgUrl + bz.default_img" :alt="bz.name">
              </div>
              <p class="bz-goods-name">{{bz.name}}</p>
              <div class="goods-price"  v-if="bz.type == 1">
                <div>
                  <p><i class="icon icon-x-integral"></i><span style="color:#ff3b30;">{{bz.spec.points}}</span></p>
                  <p class="mm" style="color: #c3c3c3"><i>¥</i><s>{{bz.spec.ready}}</s></p>
                </div>
              </div>
              <div class="goods-price-integral" v-if="bz.type == 2">
                <!--<div>
                  <p class="spec"><i class="icon icon-x-integral"></i><span>{{bz.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
                </div>
                <div>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{bz.spec.points}}</span></p>
                  <u>+</u>
                  <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
                </div>-->
                <p class="goods-price-rmb" style="color: #c3c3c3"><u>市场价：</u><b><span>¥</span>{{bz.spec.market}}</b></p>
                <!--<div>
                    <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                    <u>+</u>
                    <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                  </div>-->
                <h3>会员价：<span>现金 + 积分</span></h3>
                <div>
                  <p><span class="price-rmb">¥</span>{{bz.spec.ready}}</p>
                  <u>+</u>
                  <p class="spec"><i class="icon icon-y-integral"></i><span>{{bz.spec.points}}</span></p>
                </div>
              </div>
              <div class="goods-price-rmb-box" v-if="bz.type == 3">
                <div class="goods-price-rmb">
                  ¥ <span>{{bz.spec.ready}}</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <p class="add-more" v-if="bdz.addM" @click="bzAdd" style="margin-top: .15rem">点击加载更多</p>
        <div class="container-no-data" v-if="bdz.isNo">
          <img src="../../assets/images/no_data.png" alt="">
          <p class="no-data-txt2">此店铺还没有上传商品，请浏览其他店铺 ~</p>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  import cache from '@/assets/js/catch.js'
    export default {
      name: "band-zone",
      data () {
        return {
          bdz: {
            id: parseInt(this.$route.params.id),
            page: 1,
            band: [],
            addM: false,
            bzList: [],
            isNo: false,
            imgUrl: imgUrl
          },
          cache: cache,
          comeId: parseInt(this.$route.params.id)
        };
      },
      methods: {
        bzAdd () {
          this.bdz.page += 1;
          api.bandZone({
            page: this.bdz.page,
            id: this.bdz.id
          })
            .then(res => {
              if (res.data.goods.length === 0) {
                this.bdz.addM = false;
                Toast('到底了......');
                this.bdz.page = this.bdz.page - 1;
              } else {
                for (var i in res.data.goods) {
                  this.bdz.bzList.push((res.data.goods)[i]);
                };
              };
            });
        }
      },
      beforeDestroy () {
        let cacheData  = this.bdz;
        let d = parseInt((new Date().getTime())/1000);
        this.cache.setCache('leaveBdz',{cd: cacheData,lt: d});
      },
      created () {
        let bdzData = this.cache.getCache('leaveBdz');
        if (bdzData) {
          let c =parseInt((new Date().getTime())/1000);
          let proTime = c - bdzData.lt;
          let cacheId = bdzData.cd.id;
          if (proTime >= 3600 || this.comeId !== cacheId) {
            api.bandZone({
              page: this.bdz.page,
              id: this.bdz.id
            })
              .then(res => {
                if (res.data.goods.length === 0) {
                  this.bdz.isNo = true;
                  this.bdz.addM = false;
                } else if (res.data.goods.length >= 10) {
                  this.bdz.addM = true;
                  this.bdz.isNo = false;
                } else {
                  this.bdz.addM = false;
                  this.bdz.isNo = false;
                };
                this.bdz.band = res.data.brand;
                this.bdz.bzList = res.data.goods;
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.bdz = bdzData.cd
          }
        } else {
          api.bandZone({
            page: this.bdz.page,
            id: this.bdz.id
          })
            .then(res => {
              if (res.data.goods.length === 0) {
                this.bdz.isNo = true;
                this.bdz.addM = false;
              } else if (res.data.goods.length >= 10) {
                this.bdz.addM = true;
                this.bdz.isNo = false;
              } else {
                this.bdz.addM = false;
                this.bdz.isNo = false;
              };
              this.bdz.band = res.data.brand;
              this.bdz.bzList = res.data.goods;
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../assets/less/band";
</style>

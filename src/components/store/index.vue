<template>
    <div class="wrapper">
      <div class="search-container" :style="{'background':this.searchBG?'#ffffff':'rgba(231, 227, 227, .4)'}">
        <router-link to="/search">
          <span class="search-input" :style="{'background':this.searchBG?'#efeff4':'#efeff48f'}">
          <i class="icon icon-search"></i><u>输入关键字</u></span>
        </router-link><span class="search-button fr">搜索</span>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="">
        <swiper-slide v-for="(sp, index) in swipeBox" :key="index"><img :src="imgUrl+sp.pic" alt="" class="swiper-image"></swiper-slide>
       <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="index-classify">
        <ul>
          <li v-for="(cl, index) in claList" :key="index">
						<router-link :to="/classify/ + cl.id + '/' + index">
							<img :src="imgUrl+cl.logo" alt="">
							<span>{{cl.name}}</span>
						</router-link>
					</li>
          <li><router-link to="/classify/0/0"><img src="../../assets/images/all.png" alt=""><span>全部</span></router-link></li>
        </ul>
      </div>
      <div class="index-ad">
        <div class="ad-logo"></div>
        <div class="marquee_box">
          <ul class="marquee_list" :style="{ 'top': -num + 'rem'}" :class="{'marquee_top':num}">
            <li v-for="(item, index) in marqueeList" :key="index">{{item}}</li>
          </ul>
        </div>
        <!--<div class="ad-more">更多 >></div>-->
        <div class="ad-more"><router-link to="/announcement">更多 >></router-link></div>
      </div>
      <div class="floor-container">
        <div class="each-floor">
          <div class="floor-title ft1">
            <p>298专区</p>
            <span><router-link to="/zone/3">更多 >></router-link></span>
          </div>
          <div class="ft1-container">
            <ul>
              <li v-for="(mz, index) in moneyZone" :key="index">
                <router-link :to="/detail/+mz.id">
									<div class="ft1-container-div">
										<img :src="imgUrl+mz.default_img" alt="">
									</div>
									<p class="ft1-goods-name">{{mz.name}}</p>
                </router-link>
              </li>
            </ul>
						<div class="goods-banner-container">
							<p class="goods-banner-title">
								<span class="banner-txt fl">品牌街</span>
								<span class="banner-more fr"><router-link to="/band">更多 >></router-link></span>
							</p>
							<ul class="goods-banner-list">
								<li v-for="(bd, index) in bandList" :key="index">
									<router-link  :to="/bandZone/+bd.id">
										<div class="goods-img-box"><img :src="imgUrl+bd.logo" :alt="bd.name"></div>
										<p>{{bd.name}}</p>
									</router-link>
								</li>
							</ul>
						</div>
          </div>
        </div>
					<!--  中间的广告 -->
				<div class="ft1-ad" v-if="ft1_ad">
					<a :href="[ft1_ad.href]">
						<img :src="imgUrl+ft1_ad.pic" alt="">
					</a>
				</div>
        <div class="each-floor">
          <div class="floor-title ft3">
            <p>会员专区</p>
            <span><router-link to="/zone/2">更多 >></router-link></span>
          </div>
          <div class="ft2-container">
            <ul class="ft2-container-ul">
              <li v-for="(imz, index) in integralMoneyZone" :key="index">
                <router-link :to="/detail/+imz.id">
                  <div class="goods-img-box">
                    <img :src="imgUrl+imz.default_img" alt="">
                  </div>
                  <p class="goods-name">{{imz.name}}</p>
                  <p class="goods-price-rmb"><u>市场价：</u><b><span>¥</span>{{imz.spec.market}}</b></p>
                  <div class="goods-price-integral">
                    <!--<div>
                      <p class="spec"><i class="icon icon-x-integral"></i><span>{{imz.spec.points}}</span></p>
                      <u>+</u>
                      <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                    </div>-->
                    <h3>会员价：<span>现金 + 积分</span></h3>
                    <div>
                      <p><span class="price-rmb">¥</span>{{imz.spec.ready}}</p>
                      <u>+</u>
                      <p class="spec"><i class="icon icon-y-integral"></i><span>{{imz.spec.points}}</span></p>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
            
          </div>
        </div>
        <div class="each-floor">
          <div class="floor-title ft2">
            <p>资产兑换专区</p>
            <span><router-link to="/zone/1">更多 >></router-link></span>
          </div>
          <div class="ft3-container">
            <ul class="ft2-container-ul">
              <li v-for="(iz, index) in integralZone" :key="index">
                <router-link :to="/detail/+iz.id">
                  <div class="goods-img-box">
                    <img :src="imgUrl+iz.default_img" alt="">
                  </div>
                  <p class="goods-name">{{iz.name}}</p>
                  <div class="goods-price">
                    <!--<p><i class="icon icon-x-integral"></i><span>{{iz.spec.points}}</span></p>-->
                    <p><i class="icon icon-y-integral"></i><span>{{iz.spec.points}}</span></p>
                    <p class="goods-price-rmb"><b><span>¥</span><s>{{iz.spec.ready}}</s></b></p>
                  </div>

                </router-link>
              </li>
            </ul>

          </div>
        </div>
        <p style="text-align: center;color: #4e4c50;font-size: .2rem" onclick="window.location.href='http://www.miitbeian.gov.cn'"></p>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import {swiper, swiperSlide } from 'vue-awesome-swiper'
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  export default {
    name: "index",
    components: {
      tabFoot,
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          autoplay:true,
          loop: true,
          delay: 1000,
          // effect : 'fade',
          pagination: {
            el: '.swiper-pagination',
          },
        },
        num: 0,
        marqueeList: [
          '热烈庆祝新易家商城上线',
          '前一百位会员可享受购物优惠',
          '新易家，开启您的购物之旅'
        ],
        swipeBox: [],
        imgUrl:imgUrl,
        moneyZone: [],
        integralZone: [],
        integralMoneyZone: [],
        bandList: [],
        claList:[],
        searchBG:false,
				ft1_ad:[]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.swiper.slideTo(1, 1000, true);
      window.addEventListener('scroll',this.handleScroll);
    },
    beforeDestroy () {
      window.removeEventListener('scroll',this.handleScroll)
    },
    methods: {
      showMarquee:function (num) {
        this.marqueeList.push(this.marqueeList[0]);
        var max = this.marqueeList.length-1;
        var that = this;
        var marqueetimer =  setInterval(function(){
          num++;
          if(num>=max ){
            num=0;
          }
          that.num=num*0.286;
        }, 3000);
      },
      handleScroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = document.querySelector('.search-container').offsetTop
        if (scrollTop > offsetTop) {
          this.searchBG = false;
        } else {
          this.searchBG = true;
        }

      }

    },
    created () {
      localStorage.removeItem('confirmAddress');
      this.showMarquee(this.num)
      api.swipe()
        .then(res => {
          this.swipeBox = res.data;
        });
      api.getZone({
        page: 1,
        type: 1
      })
        .then(res => {
          for (var i in res.data) {
            if (i <= 5) {
              this.integralZone.push(res.data[i])
            }
          }
        });
      api.getZone({
        page: 1,
        type: 2
      })
        .then(res => {
          for (var i in res.data) {
            if (i <= 5) {
              this.integralMoneyZone.push(res.data[i])
            }
          }
        });
				api.getAd()
				.then(res=>{
					if(res.code==200){
					console.log(this.ft1_ad);
					this.ft1_ad = res.data[0];
					}
				});
				
      api.getZone({
        page: 1,
        type: 3
      })
        .then(res => {
          for (var i in res.data) {
            if (i <= 5) {
              this.moneyZone.push(res.data[i])
            }
          }
        });
      api.getBand()
        .then(res => {
          for (var i in res.data) {
            if (i <= 2) {
              this.bandList.push(res.data[i])
            }
          };
        })
      api.getClassify(0)
        .then(res => {
					console.log(res);
          for (var i in res.data) {
						console.log(i);
            if (i <= 3) {
              this.claList.push(res.data[i])
							console.log(this.claList);
            }
          }
        });
      api.announcements()
        .then(res => {
          // console.log(res)
          this.marqueeList = res.data;
          // console.log(this.marqueeList)
        });
      api.getFloor()
        .then(res => {
          // console.log(res)
        });
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index.less";
</style>

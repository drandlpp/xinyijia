<template>
  <div class="wrapper">
    <div class="search">
      <header>
        <a class="" href="javascript:history.go(-1);"></a>
        <div class="search-input">
          <div class="inputBox">
            <label class="icon icon-search searchIcon" for="search"></label>
            <input type="text" id='search' v-model="key_words" placeholder='搜索商品' />
          </div>
        </div>
        <button class="search-button" @click="search">确定</button>
      </header>
      <div class="content">
        <div class="cont-box hot-search" v-show="isHot">
          <p>热门搜索</p>
          <div class="search-hot">
            <input type="button" @click="hotA" v-model="hot1">
            <input type="button" @click="hotB" v-model="hot2">
            <input type="button" @click="hotC" v-model="hot3">
          </div>
        </div>
        <div class="search-list">
          <ul v-if="!isNull">
            <li v-for="(item,index) in searchList" :key="index">
              <router-link :to="{path: '/detail/'+item.id}" class="search-box">
                <div class="search-img">
                  <img :src="imgUrl + item.default_img" alt="">
                </div>
                <div class="search-desc">
                  <p class="search-title">{{item.name}}</p>
                  <div class="co-goods-integral-money" v-if="item.type == 2">
                    <!--<p><i class="icon icon-x-integral"></i><span>{{item.spec.points}}</span><b>+</b><u>¥</u><span>{{item.spec.ready}}</span></p>-->
                    <p>会员价：<i class="icon icon-y-integral"></i><span>{{item.spec.points}}</span><b>+</b><u>¥</u><span>{{item.spec.ready}}</span></p>
                    <p>市场价：<i>￥<span>{{item.spec.market}}</span></i></p>
                  </div>
                  <div class="co-goods-integral" v-if="item.type == 1">
                    <p><i class="icon icon-x-integral"></i><span>{{item.spec.points}}</span></p>
                    <p><i class="icon icon-y-integral"></i><span>{{item.spec.points}}</span></p>
                  </div>
                  <div class="co-goods-price-total">
                    <p><span v-if="item.type == 3">¥ {{order.spec.ready}}</span></p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="container-no-data" v-if="isNull">
            <img src="../../assets/images/no_data.png" alt="">
            <p class="no-data-txt2">未搜到相关产品</p>
          </div>
          <p class="add-more" style="padding-top:.2rem" v-if="isMore" @click="sAdd">点击加载更多</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import '../../assets/less/search.less';
</style>

<script>
  import { imgUrl } from '../../assets/js/api.js'
  import api from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        isHot: true,
        isNull: false,
        hot1: '男鞋',
        hot2: '羽绒服',
        hot3: '棉袄',
        value: '',
        key_words: '',
        imgUrl: imgUrl,
        searchList: [],
        isMore: false,
        page: 1
      };
    },
    computed: {

    },
    methods: {
      search () {
        if (!this.key_words) {
          Toast('请输入关键词！！！');
          return false
        } else {
          api.search({
            page: this.page,
            key: this.key_words
          })
         .then((res) => {
           this.isHot = false;
           if (res.data.length == 0) {
             this.isNull = true
           } else {
             this.isNull = false;
             this.isMore = true;
             this.searchList = res.data
           }
         })
        }

      },
      hotA () {
        this.key_words = this.hot1
        this.search()
      },
      hotB () {
        this.key_words = this.hot2
        this.search()
      },
      hotC () {
        this.key_words = this.hot3
        this.search()
      },
      sAdd () {
        this.page += 1;
        api.search({
          page: this.page,
          key: this.key_words
        })
          .then(res => {
            if (res.data.length === 0) {
              Toast('到底了....');
              this.isMore = false;
              return false;
            } else {
              for (var i in res.data) {
                this.searchList.push((res.data)[i]);
              }
            }
          })
      }
    }
  }
</script>

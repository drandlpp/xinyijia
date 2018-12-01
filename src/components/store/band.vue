<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>品牌街
    </div>
    <div class="band-container">
      <div class="band-list" v-for="(band, index) in bandList" :key="index" >
        <router-link :to="/bandZone/+band.id">
          <div class="band-center">
            <div class="band-img">
              <img :src="imgUrl+band.logo" alt="">
            </div>
            <div class="band-info">
              <p class="band-name">{{band.name}}</p>
              <p class="band-describe">{{band.desc}}</p>
            </div>
          </div>
        </router-link>
      </div>
      <p class="add-more" v-if="adM" @click="addMore">点击加载更多</p>
    </div>
  </div>
</template>

<script>
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import { Toast } from 'mint-ui'
  export default {
    name: "band",
    data () {
      return {
        bandList: [],
        imgUrl: imgUrl,
        page: 1,
        adM: false
      };
    },
    methods: {
      addMore () {
        this.page += 1;
        api.bandList(this.page)
          .then(res => {
            if (res.data.length === 0) {
              this.adM = false;
              Toast('到底了.....');
            } else {
              for (var i in res.data) {
                this.bandList.push((res.data)[i]);
              };
            };
          });
      }
    },
    created () {
      api.bandList(this.page)
        .then(res => {
          if (res.code ===200) {
            if (res.data.length >= 10) {
              this.adM = true;
            } else {
              this.adM = false;
            };
            this.bandList = res.data;
          }

        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/band";
</style>

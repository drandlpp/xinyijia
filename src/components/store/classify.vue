
<template>
    <div class="wrapper">
      <div class="search-container">
        <router-link to="/search"><span class="search-input"><i class="icon icon-search"></i><u>输入关键字</u></span></router-link><span class="search-button fr">搜索</span>
      </div>
      <div class="classify-tab-container">
        <div class="tab-head">
          <ul :style="{'width': cls.width + 'rem'}">
            <li v-for="(tn, index) in cls.tabName" :key="index" :class="{'tab-on':index === cls.tabIdx}" @click="tabChange(tn,index)"><span>{{tn.name}}</span></li>
          </ul>
        </div>
        <div class="tab-container">
          <p class="tab-container-title">{{cls.tabTxt}}专区</p>
          <div class="tab-container-center">
            <ul>
              <li v-for="(dd, index) in cls.classifyDetail" :key="index">
                <router-link :to="/classifyDetail/+dd.name+'/'+dd.id">
                  <img :src="cls.imgUrl+dd.img" :alt="dd.name">
                  <p class="fr">{{dd.name}}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <tabFoot></tabFoot>
    </div>
</template>

<script>
  import tabFoot from '../comp/tabFoot.vue'
  import api from '../../assets/js/api.js'
  import { imgUrl } from '../../assets/js/api.js'
  import cache from '@/assets/js/catch.js'
  export default {
    name: "classify",
    components: {
      tabFoot
    },
    data() {
      return {
        cls: {
          imgUrl: imgUrl,
          tabName: [],
          width: 0,
          tabIdx: 0,
          tabTxt: '',
          firstId: '',
          classifyDetail: [],
          id: parseInt(this.$route.params.id),
          idx: parseInt(this.$route.params.idx)
        },
        cache: cache,
        comeId: parseInt(this.$route.params.id)
      }
    },
    methods: {
      tabChange (ele, idx) {
        this.cls.tabIdx = idx;
        this.cls.tabTxt = ele.name;
        this.getClassifyDetail(ele.id)
      },
      getClassifyDetail (id) {
        api.getClassify(id)
          .then(res => {
            if (res.code === 200) {
              this.cls.classifyDetail = res.data;
            }
        })
      }
    },
    beforeDestroy () {
      let currentData = this.cls;
      let d =parseInt((new Date().getTime())/1000);
      this.cache.setCache('leaveClassify', {cd:currentData,lt:d})
    },
    created() {
      let cacheData = this.cache.getCache('leaveClassify');
      if (cacheData) {
        let c =parseInt((new Date().getTime())/1000);
        let proTime = c - cacheData.lt;
        let cacheId = cacheData.cd.id;
        if (proTime >= 3600 || this.comeId !== cacheId) {
          api.getClassify(0)
            .then(res => {
              if (res.data.length < 6) {
                this.cls.width = 6.4
              } else {
                this.cls.width = (res.data.length) * 1.2;
              }
              this.cls.tabName = res.data;
              this.cls.tabTxt = this.cls.tabName[this.cls.idx].name;
              this.cls.tabIdx = this.cls.idx;
              this.cls.firstId = this.cls.id;
              if (this.cls.id === 0) {
                this.getClassifyDetail(this.cls.tabName[0].id)
              } else {
                this.getClassifyDetail(this.cls.firstId)
              };
            });
        } else {
          this.cls = cacheData.cd;
        }
      } else {
        api.getClassify(0)
          .then(res => {
            if (res.data.length < 6) {
              this.cls.width = 6.4
            } else {
              this.cls.width = (res.data.length) * 1.2;
            }
            this.cls.tabName = res.data;
            this.cls.tabTxt = this.cls.tabName[this.cls.idx].name;
            this.cls.tabIdx = this.cls.idx;
            this.cls.firstId = this.cls.id;
            if (this.cls.id === 0) {
              this.getClassifyDetail(this.cls.tabName[0].id)
            } else {
              this.getClassifyDetail(this.cls.firstId)
            };
          });
      }
      localStorage.removeItem('confirmAddress');
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/classify.less";
</style>

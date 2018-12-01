<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>收货地址管理
    </div>
    <div class="ads-container">
      <div class="ads-center" v-if="isNo">
        <div class="ads-list" v-for="(ad, index) in  adsList" :key="index" @click="choseAddressInfo(ad)">
          <p class="ads-user-name"><span class="fl">{{ad.name}}</span><span class="fr">{{ad.phone}}</span></p>
          <p class="ads-user-ads">{{ad.province}} {{ad.city}} {{ad.area}} {{ad.detail}}</p>
          <div class="ads-do" v-if="way == 0">
            <div class="ads-default">
              <input type="radio" :id="id+ad.id" name="setDef" :checked="ad.is_default" @click="setDefAds(ad.id)">
              <label :for="id+ad.id">设为默认地址</label>
            </div>
            <div class="ads-do-what">
              <span @click="compile(ad)">编辑</span>
              <span @click="delAddress(ad.id, index)">删除</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="container-no-data" v-if="!isNo">
        <img src="../../assets/images/no_data.png" alt="">
        <p class="no-data-txt2">还没有收货地址，赶快去添加吧~</p>
      </div>
    </div>
    <router-link to="/addAddress/0"><div class="ads-btn">新增收货地址</div></router-link>
  </div>
</template>

<script>
import api from '@/assets/js/api.js'
let token = localStorage.getItem('token')
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
export default {
  name: "address-manage",
  data () {
    return {
      isNo: true,
      adsList: [],
      id:'ads-radio',
      way: parseInt(this.$route.params.way)
    }
  },
  methods: {
    setDefAds (id) {
      let set = this.$qs.stringify({
        token: token,
        id: id
      });
      api.setDefAddress(set)
        .then(res => {
         if (res.code === 200) {
           Toast({
             message: res.msg,
             position: 'bottom',
             duration: 1000
           });
         } else {
           Toast({
             message: res.msg,
             position: 'bottom',
             duration: 1000
           });
         }
        })
        .catch(err => {
          console.log(err)
        })
    },
    delAddress (id, idx) {
      MessageBox({
        title: '提示',
        message: '您确认要删除此地址？',
        showCancelButton: true
      })
        .then(res => {
          let del = this.$qs.stringify({
            token: token,
            address_id: id
          });
          if (res == 'confirm') {
            api.deleteAddress(del)
              .then(res => {
                if (res.code === 200){
                  Toast({
                    message: res.msg,
                    position: 'bottom',
                    duration: 1000
                  });
                  this.adsList.splice(idx, 1)
                  if (this.adsList.length === 0) {
                    this.isNo = false;
                  }
                };
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            return false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    compile (ele) {
      localStorage.setItem('address', JSON.stringify(ele))
      this.$router.push('/addAddress/1');
    },
    choseAddressInfo (ele) {
      if (this.way === 1) {
        localStorage.setItem('confirmAddress',JSON.stringify(ele));
        window.history.go(-1);
      };
    }
  },
  created () {
    api.getAddress()
      .then(res => {
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.isNo = false;
          } else {
            this.adsList = res.data;
            this.isNo = true;
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
  @import "../../assets/less/address";
</style>

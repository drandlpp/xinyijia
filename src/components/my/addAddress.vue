<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>{{title}}
    </div>
    <div class="ads-add-container">
      <div class="ads-add-center">
        <div class="ads-add-list"><span class="ads-add-title">姓名</span><input type="text" placeholder="请输入收货人姓名" v-model="adsName"></div>
        <div class="ads-add-list"><span class="ads-add-title">手机号</span><input type="number" placeholder="请输入收货手机号码" v-model="adsTel"></div>
        <div class="ads-add-list" @click="getAdsPop"><span class="ads-add-title">省市县</span><input type="text" placeholder="请选择收货地址" readonly v-model="addressArea"></div>
        <div class="ads-add-list"><span class="ads-add-title">详细地址</span><input type="text" placeholder="请输入详细地址" v-model="adsAds"></div>
        <div class="ads-add-list"><span class="ads-add-title">邮编</span><input type="number" placeholder="请输入邮编" v-model="adsCode"></div>
      </div>
    </div>
    <div class="ads-add-btn" @click="addAds">{{btnTxt}}</div>
    <cityPop @hidden="hiddenShow" v-show="cityPop_up"></cityPop>
  </div>
</template>

<script>
  import cityPop from '../comp/city.vue'
  import api from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "add-address",
    data () {
      return {
        title: '新增收货地址',
        btnTxt: '确认增加',
        cityPop_up: false,
        adsName: '',
        adsTel: '',
        addressArea: [],
        adsAds: '',
        adsCode: '',
        z_tel: /^1(3|4|5|6|7|8|9)\d{9}$/,
        way: this.$route.params.id,
        adsId: ''
      }
    },
    components: {
      cityPop
    },
    methods: {
      hiddenShow (e) {
        this.addressArea = e[0]
        this.cityPop_up = false
      },
      getAdsPop () {
        this.cityPop_up = true
      },
      addAds () {
        /*
        * 添加收货地址提交事件  添加完成 执行 go(-1)
        * */
        if (!this.adsName) {
          Toast('请填写收货人！');
          return false
        }
        if (!this.adsTel) {
          Toast('请填写收货电话！');
          return false
        }
        if (this.z_tel.test(this.adsTel) === false) {
          Toast('您的电话号码格式错误！');
          return false
        }
        if (!this.addressArea) {
          Toast('请选择收货地址！');
          return false
        }
        if (!this.adsAds) {
          Toast('请填写详细地址！');
          return false
        }
        if (!this.adsCode) {
          Toast('请填写邮编！');
          return false
        }
        let id = parseInt(this.way);
        switch (id){
          case 0:
          case 2:
            let form = this.$qs.stringify({
              name: this.adsName,
              phone: this.adsTel,
              postcode: this.adsCode,
              detail: this.adsAds,
              token: token,
              province: this.addressArea.split(' ')[0],
              city: this.addressArea.split(' ')[1],
              area: this.addressArea.split(' ')[2],
              is_default: 1
            });
            api.addAddress(form)
              .then(res => {
                Toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.back(-1)
                },2300)
              })
              .catch(error => {
                console.log(error)
                Toast('网络延时，请稍后重试')
              })
            break;
          case 1:
            let form1 = this.$qs.stringify({
              id: this.adsId,
              name: this.adsName,
              phone: this.adsTel,
              postcode: this.adsCode,
              detail: this.adsAds,
              token: token,
              province: this.addressArea.split(' ')[0],
              city: this.addressArea.split(' ')[1],
              area: this.addressArea.split(' ')[2],
              is_default: 1
            });
            api.editAddress(form1)
              .then(res => {
                if (res.code === 200) {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 2000
                  });
                  setTimeout(() => {
                    this.$router.back(-1)
                  },2300)
                } else {
                  Toast({
                    message: res.msg,
                    position: 'middle',
                    duration: 2000
                  });
                }
              })
              .catch(error => {
                console.log(error)
                Toast('网络延时，请稍后重试')
              })
            break;
          default:
            return false;
        };

      },
    },
    created () {
      let id = parseInt(this.way);
      switch (id) {
        case 0:
          break;
        case 1:
          this.title = '编辑收货地址';
          this.btnTxt = '确认编辑';
          let compile = JSON.parse(localStorage.getItem('address'));
          this.adsName = compile.name;
          this.adsTel = compile.phone;
          this.addressArea = compile.province +' '+ compile.city +' '+ compile.area;
          this.adsAds = compile.detail;
          this.adsCode = compile.postcode;
          this.adsId = compile.id
          break;
        default:
          return false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/address";
</style>

<template>
  <div class="wrapper">
    <div class="area-container">
      <div class="area-cancel" @click="cancelAds"></div>
      <div class="area-box">
        <p class="a_title">所在地区</p>
        <p class="a_chose">
          <span :class="{'area_on':cls}" @click="choseAddress(0)">{{choseProvince}}</span>
          <span :class="{'area_on':cls1}" @click="choseAddress(1)">{{choseCity}}</span>
          <span :class="{'area_on':cls2}" @click="choseAddress(2)">{{choseDistrict}}</span>
        </p>
        <div class="area_center">
          <div class="area_con" :style="an">
            <div class="area_province">
              <p v-for="(province,$index) in province" :key="$index" @click="getCity(province,$index)" :class="{'act':provinceIdx === $index}">{{province.name}}</p>
            </div>
            <div class="area_city">
              <p v-for="(city,$index) in city" :key="$index"  @click="getDistrict(city,$index)" :class="{'act':cityIdx === $index}">{{city.name}}</p>
            </div>
            <div class="area_district">
              <p v-for="(district,$index) in district" :key="$index" @click="getAds(district,$index)" :class="{'act':districtIdx === $index}">{{district.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/api.js'
export default {
  data () {
    return {
      // 初始化省份
      province: [],
      // 初始化城市
      city: [],
      // 初始化县区
      district: [],
      // 初始化选择按钮
      choseProvince: '请选择',
      choseCity: '请选择',
      choseDistrict: '请选择',
      // 初始化各项index值
      index_p: 0,
      index_c: 0,
      index_d: 0,
      // 初始化对应的class
      cls: true,
      cls1: false,
      cls2: false,
      // 初始化选择的地方
      address: '',
      addressArr: [],

      provinceIdx: -1,
      cityIdx: -1,
      districtIdx: -1,
      finalAddress: [],
      an:'',
      an0:'transform: translateX(0rem);transition-duration: .5s;',
      an1:'transform: translateX(-3.23rem);transition-duration: .5s;',
    }
  },
  methods: {
    // 请求省份
    getProvince () {
      api.getAddressPCA(1)
        .then((value) => {
         this.province = value.data
      }, (error) => {
        console.log(error)
      })
    },
    getCity (pro,idx) {
      this.provinceIdx = idx;
      this.index_p = pro.id;
      this.cityIdx = -1;
      this.districtIdx = -1;
      this.choseProvince = pro.name;
      this.choseCity = '请选择';
      this.choseDistrict = '请选择';
      this.cls = false;
      this.cls1 = true;
      this.cls2 = false;
      this.district = [];
      // this.$http.get(url + 'city/'+pro.id+'')
      api.getAddressPCA(pro.id)
      .then((value) => {
        this.city = value.data;
      }, (error) => {
        console.log(error)
      })
    },
    getDistrict (city,idx) {
      this.cityIdx = idx;
      this.index_c = city.id;
      this.districtIdx = -1;
      this.choseCity = city.name;
      this.choseDistrict = '请选择';
      this.cls = false;
      this.cls1 = false;
      this.cls2 = true;
      // this.$http.get(url + 'city/'+city.id+'')
      api.getAddressPCA(city.id)
        .then((value) => {
        this.district = value.data;
      }, (error) => {
        console.log(error)
      })
      this.an = this.an1;
    },
    // 进行最后一步选择后，将address addressArr 值返回
    getAds (dis,idx) {
      this.finalAddress = []
      this.districtIdx = idx
      this.index_d = dis.id
      this.choseDistrict = dis.name
      this.address = this.choseProvince+' '+this.choseCity+' '+this.choseDistrict
      this.addressArr = [this.index_p, this.index_c, this.index_d]
      this.finalAddress.push(this.address,this.addressArr)
      // this.$emit('hidden',this.finalAddress,this.index_p,this.index_c,this.index_d)
      this.$emit('hidden',this.finalAddress,this.addressArr)
    },
    choseAddress (idx) {
      switch (idx) {
        case 0:
          this.cls = true;
          this.cls1 = false;
          this.cls2 = false;
          this.an = this.an0;
          break
        case 1:
          this.cls = false;
          this.cls1 = true;
          this.cls2 = false;
          this.an = this.an0;
          break
        case 2:
          if (this.choseDistrict != '请选择') {
            this.an = this.an1;
            this.cls = false
            this.cls1 = false
            this.cls2 = true
          }
          break
      }
    },
    cancelAds () {
      this.$emit('hidden',this.finalAddress);
      this.provinceIdx = -1;
      this.cityIdx = -1;
      this.districtIdx = -1;
      this.city = [];
      this.district = [];
      this.choseProvince = '请选择';
      this.choseCity = '请选择';
      this.choseDistrict = '请选择';
      this.an = this.an0;
      this.cls = true;
      this.cls1 = false;
      this.cls2 = false;
    }
  },
  mounted () {
    this.getProvince()
  }
}
</script>

<style scoped lang="less">
  @import "../../assets/less/city.less";
</style>

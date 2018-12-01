<template>
  <div class="wrapper">
    <div class="moduleHead">
      <a href="javascript:window.history.go(-1)"></a>升级
    </div>
    <div class="up-container">
      <div class="up-head">
        <div class="up-now-grade">
          <h4>当前级别：</h4>
          <p>{{idDeg}}</p>
        </div>
        <div  class="up-grade-icon">
          <img src="../../assets/images/up1.png" alt="">
        </div>
        <div class="up-next-grade">
          <h4>下一级别：</h4>
          <p>{{upDeg}}</p>
        </div>
      </div>
      <div class="up-team" v-if="upgradeType == 2">
        <div class="u-t-n">
          <h3>团队人数</h3>
          <p>{{teamInfo.team}}<span>人</span></p>
        </div>
        <p class="u-t-l"></p>
        <div class="u-t-z">
          <h3>直推人数</h3>
          <p>{{teamInfo.directDrive}}<span>人</span></p>
        </div>
      </div>
      <div class="up-team" v-if="upgradeType == 3 || upgradeType == 4">
        <div>
          <h3>旗下区域代理（区代）</h3>
          <p>{{teamInfo.regionalAgency}}<span>人</span></p>
        </div>
      </div>
      <div class="up-team" v-if="upgradeType == 5">
        <div>
          <h3>旗下总代</h3>
          <p>{{teamInfo.agent}}<span>人</span></p>
        </div>
      </div>
      <div class="up-condition">
        <p class="u-c-t"><span>*</span>升级条件：</p>
        <p class="u-c-c" v-if="upgradeType == 2">此次升级，团队人数需要达到 <span>60</span>人，直推人数需要达到 <span>10</span>人</p>
        <p class="u-c-c" v-if="upgradeType == 3">此次升级，旗下人数需要区域代理（区代）达到 <span>3</span>人</p>
        <p class="u-c-c" v-if="upgradeType == 4">此次升级，旗下人数需要区域代理（区代）达到 <span>5</span>人</p>
        <p class="u-c-c" v-if="upgradeType == 5">此次升级，旗下人数需要总代达到 <span>5</span>人</p>
      </div>
      <div class="up-btn" @click="upgrade">确认升级</div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  let token = localStorage.getItem('token')
  export default {
    name: "upgrade",
    data () {
      return {
        upgradeType: '',
        userInfo: [],
        idDeg: '',
        upDeg: '',
        teamInfo: {
          agent: '', // 总代人数
          team: '', // 团队人数
          directDrive: '', // 直推人数
          regionalAgency: '', // 区域代理人数
        }
      };
    },
    methods: {
      upgrade () {
        api.upgradeWeather(this.upgradeType)
          .then(res => {
            console.log(res)
          })

        /*let form = this.$qs.stringify({
          token: token,
          apply_type: this.upgradeType
        });
        api.applyUpgrade(form)
          .then(res => {
            if (res.code === 200) {
              Toast({
                message: '您的申请已提交，请等待审核....',
                position: 'middle',
                duration: 2000
              });
              setTimeout(() => {
                this.$router.back(-1)
              },2300)
            };
          })
          .catch(err => {
            console.log(err)
          })*/
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      switch (parseInt(this.userInfo.account_type)) {
        case 1:
          this.idDeg = '代理';
          this.upDeg = '区代';
          this.upgradeType = '2';
          break;
        case 2:
          this.idDeg = '区代';
          this.upDeg = '总代';
          this.upgradeType = '3';
          break;
        case 3:
          this.idDeg = '总代';
          this.upDeg = '联创';
          this.upgradeType = '4';
          break;
        case 4:
          this.idDeg = '联创';
          this.upDeg = '合伙人';
          this.upgradeType = '5';
          break;
        case 5:
          this.idDeg = '合伙人';
          break;
      };
      api.upgradeQualification(this.upgradeType)
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.teamInfo.agent = res.data.agent;
            this.teamInfo.team = res.data.team;
            this.teamInfo.directDrive = res.data.recommend;
            this.teamInfo.regionalAgency = res.data.area;
          };
        })
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/upgrade";
</style>

<template>
  <div class="wrapper">
    <div class="moduleHead moduleHeadWhite">
      <a href="javascript:window.history.go(-1)"></a>银行卡管理
      <div class="addCard"><router-link to="/addBanKCard"><span>+</span></router-link></div>
    </div>
    <div class="bm-container" :style="{'height': hig + 'px'}">
      <div class="bm-list-center">
        <ul v-if="!nod">
          <li v-for="(card, index) in cardList" :key="index" :class="cardClass+card.logo.id" @click="backWay(card)">
            <div class="car-center">
              <div class="card-top">
                <div class="card-img">
                  <img :src="imgUrl+card.logo.bank_logo" alt="">
                </div>
                <div class="card-name-info">
                  <p class="card-name">{{card.logo.bank_name}}</p>
                  <p class="card-type">持卡人：{{card.account}}</p>
                </div>
                <div class="card-delete" @click="deleteCard(card.id, index)" v-if="way == 1">
                  <span>删除</span>
                </div>
              </div>
              <p class="card-num">{{card.card}}</p>
            </div>
          </li>
        </ul>
        <div class="container-no-data" v-if="nod">
          <img src="../../assets/images/no_data.png" alt="">
          <p class="no-data-txt2">还没有银行卡，快点击右上角加号添加吧~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/assets/js/api.js'
  import { imgUrl } from '@/assets/js/api.js'
  import { Toast } from 'mint-ui'
  let token = localStorage.getItem('token')
  export default {
    name: "add-bank-card",
    data () {
      return{
        cardList: [],
        imgUrl: imgUrl,
        cardClass: 'card-bg',
        way: this.$route.params.id,
        nod: false,
        hig: 0
      }
    },
    methods: {
      deleteCard (id, idx){
        let form = this.$qs.stringify({
          token: token,
          bank_id: id
        });
        api.delCard (form)
          .then(res => {
            if (res.code === 200) {
              Toast("删除成功");
              this.cardList.splice(idx, 1);
              if ( this.cardList.length === 0) {
                this.nod = true;
              };
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      backWay (ele) {
        let way = parseInt(this.way);
        switch (way) {
          case 0:
            // 提现申请选择
            localStorage.setItem('defCard', JSON.stringify(ele));
            window.history.go(-1);
            break;
          case 1:
            // 借款申请
            localStorage.setItem('borrow', JSON.stringify(ele));
            window.history.go(-1);
            break;
          default:
            return false;
        }
      }
    },
    created () {
      this.hig = document.documentElement.clientHeight;
      // console.log(this._h)
      api.getBankCard()
        .then(res => {
          if (res.code === 200) {
            if (res.data.length === 0) {
              this.nod = true;
            } else {
              this.cardList = res.data;
              this.nod = false;
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
  @import "../../assets/less/addBankCard";
</style>

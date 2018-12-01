import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/store/index'
import classify from '@/components/store/classify'
import shopCar from '@/components/store/shopCar'
import my from '@/components/my/my'
import set from '@/components/my/set'
import detail from '@/components/store/detail'
import confirmOrder from '@/components/store/confirmOrder'
import apply from '@/components/store/apply'
import login from '@/components/login/login'
import register from '@/components/register/register'
import assets from '@/components/system/assets'
import integralDetailList from '@/components/system/integralDetailList'
import shopIntegral from '@/components/system/shopIntegral'
import useable from '@/components/system/useable'
import withdraw from '@/components/system/withdraw'
import withdrawRecord from '@/components/system/withdrawRecord'
import bankManage from '@/components/my/bankManage'
import addBankCard from '@/components/my/addBankCard'
import addressManage from '@/components/my/addressManage'
import addAddress from '@/components/my/addAddress'
import earnings from '@/components/system/earnings'
import teams from '@/components/my/teams'
import order from '@/components/my/order'
import upgrade from '@/components/my/upgrade'
import borrowing from '@/components/my/borrowing'
import changePassword from '@/components/my/changePassword'
import classifyDetail from '@/components/store/classifyDetail'
import zone from '@/components/store/zone'
import shopIntegralIncome from '@/components/system/shopIntegralIncome'
import search from '@/components/store/search'
import applyRefund from '@/components/my/applyRefund'
import modifyPassword from '@/components/my/modifyPassword'
import band from '@/components/store/band'
import bandZone from '@/components/store/bandZone'
import announcement from '@/components/store/announcement'
import aboutUs from '@/components/my/aboutUs'
import storeDetail from '@/components/store/storeDetail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'index',
      meta: { requiresAuth: true },
      component: index
    },
    {
      path: '/login', // 登录
      name: 'login',
      component: login
    },
    {
      path: '/register', // 注册
      name: 'register',
      component: register
    },
    {
      path: '/classify/:id/:idx', // 分类
      name: 'classify',
      component: classify
    },
    {
      path: '/classifyDetail/:name/:id', // 分类详情
      name: 'classifyDetail',
      component: classifyDetail
    },
    {
      path: '/zone/:id', // 专区
      name: 'zone',
      component: zone
    },
    {
      path: '/band', // 品牌列表
      name: 'band',
      component: band
    },
    {
      path: '/bandZone/:id', // 品牌详情
      name: 'bandZone',
      component: bandZone
    },
    {
      path:'/storeDetail/:id', // 店铺详情
      name: 'storeDetail',
      component: storeDetail
    },
    {
      path: '/search', // 搜索
      name: 'search',
      component: search
    },
    {
      path: '/shopCar', // 购物车
      name: 'shopCar',
      component: shopCar
    },
    {
      path: '/my', // 我的
      name: 'my',
      component: my
    },
    {
      path: '/detail/:id', // 商品详情
      name: 'detail',
      component: detail
    },
    {
      path: '/confirmOrder', // 确认订单
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/apply/:way', // 支付方式选择
      name: 'apply',
      component: apply
    },
    {
      path: '/set', // 设置
      name: 'set',
      component: set
    },
    {
      path: '/assets', // 资产
      name: 'assets',
      component: assets
    },
    {
      path: '/integralDetailList/:m/:t', // 每月转化列表
      name: 'integralDetailList',
      component: integralDetailList
    },
    {
      path: '/shopIntegral/:num', // 购物积分
      name: 'shopIntegral',
      component: shopIntegral
    },
    {
      path: '/shopIntegralIncome', // 购物积分收入记录
      name: 'shopIntegralIncome',
      component: shopIntegralIncome
    },
    {
      path: '/useable/:num', // 可用积分
      name: 'useable',
      component: useable
    },
    {
      path: '/withdraw', // 提现
      name: 'withdraw',
      component: withdraw
    },
    {
      path: '/withdrawRecord', // 提现记录
      name: 'withdrawRecord',
      component: withdrawRecord
    },
    {
      path: '/bankManage/:id', // 银行卡管理
      name: 'bankManage',
      component: bankManage
    },
    {
      path: '/addBankCard', // 添加银行卡
      name: 'addBankCard',
      component: addBankCard
    },
    {
      path: '/addressManage/:way', // 地址管理
      name: 'addressManage',
      component: addressManage
    },
    {
      path: '/addAddress/:id', // 添加收货地址
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/earnings', // 我的收益
      name: 'earnings',
      component: earnings
    },
    {
      path: '/teams', // 我的团队
      name: 'teams',
      component: teams
    },
    {
      path: '/order', // 我的订单
      name: 'order',
      component: order
    },
    {
      path: '/applyRefund', // 申请退货
      name: 'applyRefund',
      component: applyRefund
    },
    {
      path: '/upgrade', // 升级
      name: 'upgrade',
      component: upgrade
    },
    {
      path: '/borrowing', // 借贷
      name: 'borrowing',
      component: borrowing
    },
    {
      path: '/changePassword/:id', // 修改登录密码
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/modifyPassword/:way', // 修改密码
      name: 'modifyPassword',
      component: modifyPassword
    },
    {
      path: '/announcement', // 系统公告
      name: 'announcement',
      component: announcement
    },
    {
      path: '/aboutUs', // 关于我们
      name: 'aboutUs',
      component: aboutUs
    }
  ]
})

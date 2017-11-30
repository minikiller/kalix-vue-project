import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/demo/Hello'
import Test from 'views/demo/test'
import Show from 'views/demo/highcharts/show'
import VueShow from 'views/demo/highcharts/vue-chart.vue'
import Login from '@/components/login/login'
import Cache from 'common/cache'
import Home from '@/components/home/home'
// import QrcodeLogin from 'views/demo/qrcodelogin'
import SealapplyFrom from 'views/oa/sealapplyfrom/sealapplyfrom'
// 二维码登录
import ComQrcode from 'views/qrcode/comQrcode'
import StrQrcode from 'views/qrcode/strQrcode'
import QrcodeLogin from 'views/qrcode/qrcodeLogin'
import recruitForm from 'views/art/recruit/recruitForm'
import recruitResult from 'views/art/recruit/recruitResult'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Hello
    },
    {
      path: '/qrcode/comqrcode',
      name: 'comqrcode',
      component: ComQrcode
    },
    {
      path: '/qrcode/strqrcode',
      name: 'strqrcode',
      component: StrQrcode
    },
    {
      path: '/qrcode/login/:key',
      name: 'qrcodelogin',
      component: QrcodeLogin
    },
    {
      path: '/art/recruitform',
      name: 'recruitform',
      component: recruitForm
    },
    {
      path: '/art/result/:key',
      name: 'recruitResult',
      component: recruitResult
    },
    {
      path: '/demo/sealapplyfrom',
      name: 'sealapplyfrom',
      component: SealapplyFrom
    },
    {
      path: '/demo/login',
      name: 'demologin',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/show',
      name: 'show',
      component: Show
    },
    {
      path: '/vueshow',
      name: 'VueShow',
      component: VueShow
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/:app', name: 'header', component: Home},
        {path: '/:app/:fun', name: 'navigater', component: Home}
      ]
    },
    {path: '/404', name: '404', component: require('@/views/errorPage/404')},
    {path: '*', redirect: '/404', hidden: true}
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('router is to ', to)
  if (!to.path.search(/\/qrcode\//i)) {
    // 进入二维码页面
    next()
    return
  }
  if (Cache.get('id') === null && to.name !== 'login' && to.name !== 'qrcode' && to.name !== 'qrcodelogin') {
    next({path: '/login'})
  }
  next()
})

export default router

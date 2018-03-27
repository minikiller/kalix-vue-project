import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Cache from 'common/cache'
import Home from '@/components/home/home'
// import QrcodeLogin from 'views/demo/qrcodelogin'
// 二维码登录
import candidateForm from 'views/art/candidate/candidateForm'
import recruitForm from 'views/art/recruit/recruitForm'
import recruitResult from 'views/art/recruit/recruitResult'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/art/recruitform',
      name: 'recruitform',
      component: recruitForm
    },
    {
      path: '/art/candidateform',
      name: 'candidateform',
      component: candidateForm
    },
    {
      path: '/art/result/:key',
      name: 'recruitResult',
      component: recruitResult
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

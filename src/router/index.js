import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/demo/Hello'
import Qrcode from 'views/demo/qrcode'
import Test from 'views/demo/test'
import Show from 'views/demo/highcharts/show'
import VueShow from 'views/demo/highcharts/vue-chart.vue'
import Login from '@/components/login/login'
import Cache from 'common/cache'
import Home from '@/components/home/home'

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
      path: '/demo/qrcode',
      name: 'qrcode',
      component: Qrcode
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
  console.log('router is to ', to.name)
  if (Cache.get('id') === null && to.name !== 'login' && to.name !== 'qrcode') {
    next({path: '/login'})
  }
  next()
})

export default router

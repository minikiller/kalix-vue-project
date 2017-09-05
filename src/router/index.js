import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/demo/Hello'
import Test from 'views/demo/test'
import Show from 'views/demo/highcharts/show'
import Login from '@/components/login/login'
import Cache from 'common/cache'
import Home from '@/components/home/home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/demo',
      name: 'hello',
      component: Hello
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
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/:app', name: 'header', component: Home},
        {path: '/:app/:fun', name: 'navigater', component: Home}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (Cache.get('id') === null && to.name !== 'login') {
    next({path: '/login'})
  }
  next()
})

export default router

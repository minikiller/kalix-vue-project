import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/demo/Hello'
import Login from '@/components/login/login'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('id') === null && to.name !== 'login') {
    next({path: '/login'})
  }
  next()
})

export default router

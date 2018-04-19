import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import user from '@/components/user'
import start_end from '@/components/start-end'
import plan_route from '@/components/plan-route'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/start-end',
      name: 'start-end',
      component: start_end
    },
    {
      path: '/plan-route',
      name: 'plan-route',
      component: plan_route
    }
  ]
})

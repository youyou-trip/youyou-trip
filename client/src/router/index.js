import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import user_path from '@/components/user-path'
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
      path: '/user-path',
      name: 'user-path',
      component: user_path
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

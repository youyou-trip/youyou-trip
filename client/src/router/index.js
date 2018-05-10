import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import user_path from '@/components/user-path'
import sight_route from '@/components/sight-route'
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
      path: '/sight-route',
      name: 'sight-route',
      component: sight_route
    },
    {
      path: '/plan-route',
      name: 'plan-route',
      component: plan_route
    }
  ]
})

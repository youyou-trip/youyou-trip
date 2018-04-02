import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import startEnd from '@/components/start_end'
import cityRoute from '@/components/city_route'
import sightRoute from '@/components/sight_route'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/start-end',
      name: 'start-end',
      component: startEnd
    },
    {
      path: '/city-route',
      name: 'city-route',
      component: cityRoute
    },
    {
      path: '/sight-route',
      name: 'sight-route',
      component: sightRoute
    }
  ]
})

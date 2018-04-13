import Vue from 'vue'
import Vuex from 'vuex/dist/vuex.js'
import START_END from './modules/start-end'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    START_END
  }
})
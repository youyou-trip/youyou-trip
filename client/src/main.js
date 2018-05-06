// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router'
import store from './store'
import iView from 'iview';
import fetch from './util/fetch';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.prototype.$fetch = fetch
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routes,
  store,
  components: { App },
  template: '<App/>'
})
